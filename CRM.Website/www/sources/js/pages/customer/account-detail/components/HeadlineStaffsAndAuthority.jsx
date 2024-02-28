import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import { Form, Button } from 'react-bootstrap';
import LangHelper from '@jsroot/common/langHelper';
import { Table, HeaderRow, HeaderCell, Cell, Row } from '@jsroot/components/react-grid/index';
import DataService from '@jsroot/common/dataService';
import Site from '@jsroot/common/site';
import { getPermission } from '@jsroot/common/shareScripts';
import { FunctionKey, Policy } from '@jsroot/common/constants';
import MultipleSelect from '@jsroot/components/multiple-select/index';
import { ValidateHeadlineStaffAndAuthority, ParamsSubmit } from '../common.functions';
import { toast } from 'react-toastify';
import ConfirmPopup from '@jsroot/components/ConfirmPopup';

export class HeadlineStaffsAndAuthority extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headlineStaffsAndAuthority: null,
            headlineInfoPolicy: null,
            originalStaffAndAuthority: null,
            showConfirmDelete: {
                show: false,
                name: '', 
                indexStaff: -1
            },
            showConfirmClear: {
                show: false,
                name: '',
                indexStaff: -1
            }
        };
    }

    async componentDidMount() {
        await this.props.getHeadlineStaffsAndAuthority({ headlineID: this.props.customerInfo.custId });
        await this.props.getStaffAndAuthority();
        await this.props.getSettingPicRole();
        const headlineStaffsAndAuthority = this.getHeadlineStaffsAndAuthorityInfo(this.props.headlineStaffsAndAuthority);
        this.setState({ headlineStaffsAndAuthority: headlineStaffsAndAuthority });
        getPermission(FunctionKey.HeadlineInfo, true).then(response => {
            this.setState({ headlineInfoPolicy: response });
        });
    }

    componentDidUpdate() {
        if (this.props.activeTab != null) {
            const { activeTab, headlineStaffsAndAuthority } = this.props;
            const initialValues = this.getHeadlineStaffsAndAuthorityInfo(headlineStaffsAndAuthority);
            if (!this.state.headlineStaffsAndAuthority || !initialValues) {
                return null;
            }
            if (activeTab.nextTab === 'headlineCommunicationInfo' || activeTab.nextTab === 'companyService') {
                if (JSON.stringify(this.state.headlineStaffsAndAuthority).toString() === JSON.stringify(initialValues).toString() ||
                    this.state.headlineInfoPolicy !== Policy.Host) {
                    this.props.setShowConfirmUnSaved(false);
                    this.props.setActiveTab({
                        currentTab: activeTab.nextTab,
                        nextTab: null
                    });
                } else {
                    this.props.setShowConfirmUnSaved(true);
                }
            }
        }
    }

    getHeadlineStaffsAndAuthorityInfo = value => {
        let headlineStaffsAndAuthority = [];
        value.map(staff => {
            let communicationTools = [];
            value.map(com => {
                if (staff.picName === com.picName) {
                    communicationTools.push({
                        rowID: com.rowID,
                        picCommunicationID: com.picCommunicationID,
                        picCommunicationName: com.picCommunicationName,
                        picCommunicationValue: com.picCommunicationValue,
                        authorityID: com.authorityID,
                        authority: com.authority,
                        remark: com.remark,
                        isErrorPicCommunication: false,
                        isErrorPicAuthorityID: false
                    });
                }
            });
            if (headlineStaffsAndAuthority.findIndex(x => x.picName === staff.picName) === -1) {
                headlineStaffsAndAuthority.push({                    
                    picID: staff.picID,
                    picName: staff.picName,
                    picRoleID: staff.picRoleID,
                    picRoleName: staff.picRoleName,
                    communicationTools: communicationTools,
                    isSyncFromPicTable: staff.isSyncFromPicTable,
                    isErrorPicName: false,
                    isErrorPicRoleID: false,
                    isEdit: false
                });
            }
        });
        return headlineStaffsAndAuthority;
    }  

    handleSubmit = async indexStaff => {
        const errors = this.validateHeadlineStaffAndAuthority(indexStaff);
        if (errors === null) {
            await this.checkCustomerExistsOnCRM();
        }
    }

    checkCustomerExistsOnCRM = async () => {
        Site.blockUI();
        const url = Site.resolveClientUrl('AccountDetail/CheckCustomerExistsOnCRM');
        await DataService.postDataAsync(url, { customerId: this.props.customerInfo?.custId }).then(async response => {
            if (response.data === 1) {
                await this.editHeadlineStaffAndAuthority();
            } else {
                await this.updateNewCrmCustomer();
            }
        }).then(() => Site.unblockUI()).catch(Site.handleAxiosError);
    }

    updateNewCrmCustomer = async () => {
        const params = ParamsSubmit(this.props.customerInfo.custId, this.props.customerInfo);
        this.props.editCustomerInfoDetail(params).then(async () => {
            if (this.props.editCustomerInfoDetailResult.isSuccessful) {
                await this.editHeadlineStaffAndAuthority();
            }
        });
    }

    editHeadlineStaffAndAuthority = async () => {
        let headlineStaffsAndAuthority = [];
        this.state.headlineStaffsAndAuthority.map(staff => {
            staff.communicationTools.map(staffCom => {
                headlineStaffsAndAuthority.push({
                    rowID: staffCom.rowID,
                    headlineID: this.props.customerInfo.custId,
                    picID: staff.picID === null ? 0 : staff.picID,
                    picName: staff.picName,
                    picRoleID: staff.picRoleID,
                    picCommunicationID: staffCom.picCommunicationID,
                    picCommunicationValue: staffCom.picCommunicationValue,
                    authorityID: staffCom.authorityID,
                    remark: staffCom.remark,
                    isSyncFromPicTable: staff.isSyncFromPicTable ? 1 : 0
                });
            });
        });
        const params = {
            headlineID: this.props.customerInfo.custId,
            headlineStaffsAndAuthority: headlineStaffsAndAuthority
        };

        Site.blockUI();
        const url = Site.resolveClientUrl('AccountDetail/EditHeadlineStaffsAndAuthority');
        await DataService.postDataAsync(url, params).then(async response => {
            if (response.data.isSuccessful) {
                toast.success(LangHelper.getResource('UpdateHeadlineAndAuthoritySuccessfully'));
                await this.props.getHeadlineStaffsAndAuthority({ headlineID: this.props.customerInfo.custId });
                const headlineStaffsAndAuthority = this.getHeadlineStaffsAndAuthorityInfo(this.props.headlineStaffsAndAuthority);
                this.setState({ headlineStaffsAndAuthority: headlineStaffsAndAuthority });
            } else {
                toast.errors(response.data.message);
            }
        }).then(() => Site.unblockUI()).catch(Site.handleAxiosError);
    }

    validateHeadlineStaffAndAuthority = indexStaff => {
        const { errors, headlineStaffsAndAuthority } = ValidateHeadlineStaffAndAuthority(this.state.headlineStaffsAndAuthority, indexStaff);
        this.setState({
            headlineStaffsAndAuthority: headlineStaffsAndAuthority
        });
        this.props.setErrors(Object.keys(errors).length === 0 ? null : errors);
        return Object.keys(errors).length === 0 ? null : errors;
    }

    handleShowConfirmDelete = (name, indexStaff) => {
        this.setState({
            showConfirmDelete: {
                show: true,
                name: name,
                indexStaff: indexStaff
            },
        })
    }

    handleShowConfirmClear = (name, indexStaff) => {
        this.setState({
            showConfirmClear: {
                show: true,
                name: name,
                indexStaff: indexStaff
            },
        })
    }

    render() {
        const { headlineStaffsAndAuthority, headlineInfoPolicy, showConfirmDelete, showConfirmClear } = this.state;
        const { settingStaffAndAuthority, settingPicRole } = this.props;

        if (!settingStaffAndAuthority || !headlineStaffsAndAuthority || !settingPicRole || !headlineInfoPolicy) {
            return null;
        }

        return (
            <>
                {
                    headlineInfoPolicy === Policy.Host &&
                    <Button className='btn-add' type="submit" variant="primary" size="sm" onClick={this.handleAddNewRow}>
                        {LangHelper.getResource('Add')}
                    </Button>
                }
                <div className={`${headlineStaffsAndAuthority.length < 3 && 'table-inTab'} headline-staff-authority`}>
                    <Table
                        width={document.getElementById('right-row-container').clientWidth - 60}
                        autoWidth={false}
                        header={this.buildHeader()}
                        body={this.buildBody()}
                        isPaging={false}
                        containerPadding={0}
                        adjustedHeight={10}
                    />
                </div>
                {
                    showConfirmDelete.show &&
                    <ConfirmPopup
                        title={'Delete Headline Staffs and Authority'}
                        className='delete-confirm-modal'
                        content={
                            <div>Are you sure you want to delete the <span className="bold">{showConfirmDelete.name}</span>?</div>
                        }
                        size='lg'
                        onSubmit={() => this.handleDelete(showConfirmDelete.indexStaff)}
                        onClose={() => {
                            this.setState({
                                showConfirmDelete: {
                                    show: false,
                                    name: '',
                                    indexStaff: -1
                                },
                            })
                        } }
                    />
                }
                {
                    showConfirmClear.show &&
                    <ConfirmPopup
                        title={'Clear Headline Staffs and Authority'}
                        className='clear-confirm-modal'
                        content={
                            <div>Are you sure you want to clear authority and remark of <span className="bold">{showConfirmClear.name}</span>?</div>
                        }
                        size='lg'
                        onSubmit={() => this.handleClear(showConfirmClear.indexStaff)}
                        onClose={() => {
                            this.setState({
                                showConfirmClear: {
                                    show: false,
                                    name: '',
                                    indexStaff: -1
                                },
                            })
                        }}
                    />
                }
            </>
        );
    }

    handleAddNewRow = () => {
        let { headlineStaffsAndAuthority } = this.state;
        headlineStaffsAndAuthority.push({
            picID: 0,
            picName: null,
            picRoleID: 0,
            picRoleName: null,
            communicationTools: [{
                rowID: -1,
                picCommunicationID: 0,
                picCommunicationName: null,
                picCommunicationValue: null,
                authorityID: '',
                authority: '',
                remark: null,
                isErrorPicCommunication: false,
                isErrorPicAuthorityID: false
            }],
            isSyncFromPicTable: false,
            isErrorPicName: false,
            isErrorPicRoleID: false,
            isEdit: true
        });
        this.setState({ headlineStaffsAndAuthority: headlineStaffsAndAuthority });
    };

    handleAddTool = (indexStaff) => {
        const errors = this.validateHeadlineStaffAndAuthority(indexStaff);
        if (errors === null) {
            let { headlineStaffsAndAuthority } = this.state;
            headlineStaffsAndAuthority[indexStaff].communicationTools.push({
                rowID: -1,
                picCommunicationID: 0,
                picCommunicationName: null,
                picCommunicationValue: null,
                authorityID: '',
                authority: '',
                remark: ''
            });
            this.setState({ headlineStaffsAndAuthority: headlineStaffsAndAuthority });
        }
    };

    handleDeleteTool = (indexCom, indexStaff) => {
        const data = [...this.state.headlineStaffsAndAuthority];
        data[indexStaff].communicationTools.splice(indexCom, 1);
        this.setState({ headlineStaffsAndAuthority: data });
    };

    buildHeader = () => {
        const { headlineInfoPolicy } = this.state;
        return (
            <HeaderRow>
                <HeaderCell colWidth={200}>{LangHelper.getResource('Name')}</HeaderCell>
                <HeaderCell colWidth={120}>{LangHelper.getResource('Role')}</HeaderCell>
                <HeaderCell colWidth={170} colspan={2}>{LangHelper.getResource('CommunicationTool')}</HeaderCell>
                <HeaderCell colWidth={220} className="display-colSpan"></HeaderCell>
                <HeaderCell colWidth={210}>{LangHelper.getResource('Authority')}</HeaderCell>
                <HeaderCell colWidth={400}>{LangHelper.getResource('Remark')}</HeaderCell>
                {
                    headlineInfoPolicy === Policy.Host &&
                    <HeaderCell colWidth={80}>{LangHelper.getResource('Action')}</HeaderCell>
                }
            </HeaderRow>
        );
    };

    buildBody = () => {
        const { headlineStaffsAndAuthority } = this.state;

        if (headlineStaffsAndAuthority.length > 0) {
            return [
                <Fragment key={'body'}>
                    {headlineStaffsAndAuthority.map((item, indexStaff) => {
                        if (item.isEdit) {
                            return this.renderEditRow(item, indexStaff)
                        } else {
                            return this.renderRow(item, indexStaff)
                        }
                    })}
                </Fragment>
            ];
        }

        return [
            <Row key='body-NoData' className="no-data" >
                <Cell className='text-center' colSpan={7}>{LangHelper.getResource('ThereIsNoData')}</Cell>
            </Row>
        ];
    };   

    handleChangeValue = (name, value, staffIndex) => {
        const { headlineStaffsAndAuthority } = this.state;
        headlineStaffsAndAuthority[staffIndex][name] = value;
        this.setState({ headlineStaffsAndAuthority: headlineStaffsAndAuthority });
    }

    handleChangeRole = (value, staffIndex) => {
        const { headlineStaffsAndAuthority } = this.state;
        const comTool = this.props.settingPicRole.find(x => x.settingId === value);
        headlineStaffsAndAuthority[staffIndex].picRoleID = value;
        headlineStaffsAndAuthority[staffIndex].picRoleName = comTool.settingValue;
        this.setState({ headlineStaffsAndAuthority: headlineStaffsAndAuthority });
    }

    handleChangeCommunicationID = (value, indexPicCommunicationTool, staffIndex) => {
        const { headlineStaffsAndAuthority } = this.state;
        const comTool = this.props.settingCommunicationTool.find(x => x.settingId === value);
        headlineStaffsAndAuthority[staffIndex].communicationTools[indexPicCommunicationTool].picCommunicationID = value;
        headlineStaffsAndAuthority[staffIndex].communicationTools[indexPicCommunicationTool].picCommunicationName = comTool.settingValue;
        this.setState({ headlineStaffsAndAuthority: headlineStaffsAndAuthority });
    }

    handleChangeAuthorityID = (value, indexPicCommunicationTool, indexStaff) => {
        const { headlineStaffsAndAuthority } = this.state;
        const authorityTool = this.props.settingStaffAndAuthority.find(x => value.includes(x.settingId.toString()));
        headlineStaffsAndAuthority[indexStaff].communicationTools[indexPicCommunicationTool].authorityID = value;
        headlineStaffsAndAuthority[indexStaff].communicationTools[indexPicCommunicationTool].authority = authorityTool ? authorityTool.settingValue : '';
        this.setState({ headlineStaffsAndAuthority: headlineStaffsAndAuthority });
    }

    handleChangeCommunicationValue = (name, value, indexPicCommunicationTool, staffIndex) => {
        const { headlineStaffsAndAuthority } = this.state;
        headlineStaffsAndAuthority[staffIndex].communicationTools[indexPicCommunicationTool][name] = value;
        this.setState({ headlineStaffsAndAuthority: headlineStaffsAndAuthority });
    }

    renderOptions = (name, item) => <option key={item} value={item}>{name}</option>;

    renderEditRow = (staff, indexStaff) => {
        const { settingStaffAndAuthority, settingPicRole, settingCommunicationTool } = this.props;
        const authorityFirstSelected = settingStaffAndAuthority.map(item => {
            return {
                authorityId: item.settingId,
                name: item.settingValue,
                checked: staff.communicationTools[0].authorityID?.includes(item.settingId.toString())
            };
        });
        return (
            <>
                <Row key={`${staff.communicationTools[0].rowID + indexStaff}`} className='row-add'>
                    {
                        staff.isSyncFromPicTable &&
                        <>
                            <Cell rowSpan={staff.communicationTools.length}>{staff.picName}</Cell>
                            <Cell rowSpan={staff.communicationTools.length} className='text-center'>{staff.picRoleName}</Cell>
                            <Cell>{staff.communicationTools[0].picCommunicationName}</Cell>
                            <Cell>{staff.communicationTools[0].picCommunicationValue}</Cell>
                        </>
                    }
                    {
                        !staff.isSyncFromPicTable &&
                        <>
                            <Cell rowSpan={staff.communicationTools.length}>
                                <Form.Control type="text" name="" className={staff.communicationTools[0].isErrorPicCommunication && 'invalid'} onChange={event => {
                                    this.handleChangeValue('picName', event.target.value, indexStaff);
                                }}
                                    value={staff.picName} autoComplete="off" />
                            </Cell>
                            <Cell rowSpan={staff.communicationTools.length}>
                                <Form.Control as="select" className={staff.isErrorPicRoleID && 'invalid'} size="sm" value={staff.picRoleID}
                                    onChange={event => {
                                        this.handleChangeRole(parseInt(event.target.value, 0), indexStaff);
                                    }}>
                                    <option value={0} disabled hidden>{LangHelper.getResource('PleaseSelect')}</option>
                                    {settingPicRole.map(item => this.renderOptions(item.settingValue, item.settingId))}
                                </Form.Control>
                            </Cell>
                            <Cell>
                                <div className='col-add'>
                                    <Form.Control as="select" className={staff.communicationTools[0].isErrorPicCommunication && 'invalid'} size="sm"
                                        value={staff.communicationTools[0].picCommunicationID}
                                        onChange={event => {
                                            this.handleChangeCommunicationID(parseInt(event.target.value, 10), 0, indexStaff);
                                        }}>
                                        <option value={0} disabled hidden>{LangHelper.getResource('PleaseSelect')}</option>
                                        {settingCommunicationTool.map(item => this.renderOptions(item.settingValue, item.settingId))}
                                    </Form.Control>
                                    {
                                        staff.communicationTools.length > 1 &&
                                        <div className='icon icon-delete' onClick={() => { this.handleDeleteTool(0, indexStaff) }}></div>
                                    }
                                    {
                                        staff.communicationTools.length === 1 &&
                                        <div className='icon icon-plus' onClick={() => { this.handleAddTool(indexStaff) }}></div>
                                    }
                                </div>
                            </Cell>
                            <Cell>
                                <Form.Control type="text" name="" className={staff.communicationTools[0].isErrorPicCommunication && 'invalid'} onChange={event => {
                                    this.handleChangeCommunicationValue('picCommunicationValue', event.target.value, 0, indexStaff);
                                }}
                                    value={staff.communicationTools[0].picCommunicationValue} autoComplete="off" />
                            </Cell>
                        </>
                    }
                    <Cell className="col-authority">
                        <MultipleSelect
                            dataSource={authorityFirstSelected}
                            keyField='authorityId'
                            valueField='name'
                            hasSearchBox
                            isAllTextShown
                            isInvalid={staff.communicationTools[0].isErrorPicAuthorityID}
                            isNAOption
                            onChange={(currentItem, selectedItemsKey) => {
                                this.handleChangeAuthorityID(selectedItemsKey, 0, indexStaff);
                            }}
                        />
                    </Cell>
                    <Cell>
                        <Form.Control type="text" name="" onChange={event => {
                            this.handleChangeCommunicationValue('remark', event.target.value, 0, indexStaff);
                        }} value={staff.communicationTools[0].remark} autoComplete="off"/>
                    </Cell>
                    <Cell rowSpan={staff.communicationTools.length}>
                        <div className='row-icon'>
                            <div className='icon icon-save' title='Save' onClick={() => { this.handleSubmit(indexStaff); }}></div>
                            <div className='icon icon-cancel' title='Cancel' onClick={() => this.handleCancel(indexStaff)}></div>
                        </div>
                    </Cell>
                </Row>
                {
                    staff.communicationTools.map((value, indexCom) => {
                        const authoritySelected = settingStaffAndAuthority.map(item => {
                            return {
                                authorityId: item.settingId,
                                name: item.settingValue,
                                checked: value.authorityID?.includes(item.settingId.toString())
                            };
                        });
                        if (indexCom !== 0) {
                            return (
                                <Row key={`${value.rowID + indexCom}`} class="row-add">
                                    {
                                        staff.isSyncFromPicTable &&
                                        <>
                                            <Cell>{value.picCommunicationName}</Cell>
                                            <Cell>{value.picCommunicationValue}</Cell>
                                        </>
                                    }
                                    {
                                        !staff.isSyncFromPicTable &&
                                        <>
                                            <Cell>
                                                <div className='col-add'>
                                                    <Form.Control as="select" size="sm"
                                                        value={value.picCommunicationID}
                                                        className={value.isErrorPicCommunication && 'invalid'}
                                                        onChange={event => {
                                                            this.handleChangeCommunicationID(parseInt(event.target.value, 10), indexCom, indexStaff);
                                                        }}>
                                                        <option value={0} disabled hidden>{LangHelper.getResource('PleaseSelect')}</option>
                                                        {settingCommunicationTool.map(item => this.renderOptions(item.settingValue, item.settingId))}
                                                    </Form.Control>
                                                    <div className='icon icon-delete' onClick={() => { this.handleDeleteTool(indexCom, indexStaff) }}></div>
                                                    {
                                                        staff.communicationTools.length === (indexCom + 1) &&
                                                        <div className='icon icon-plus' onClick={() => { this.handleAddTool(indexStaff) }}></div>
                                                    }
                                                </div>
                                            </Cell>
                                            <Cell>
                                                <Form.Control type="text" name="" className={value.isErrorPicCommunication && 'invalid'} onChange={event => {
                                                    this.handleChangeCommunicationValue('picCommunicationValue', event.target.value, indexCom, indexStaff);
                                                }}
                                                    value={value.picCommunicationValue} autoComplete="off" />
                                            </Cell>
                                        </>
                                    }
                                    <Cell className="col-authority">
                                        <MultipleSelect
                                            dataSource={authoritySelected}
                                            keyField='authorityId'
                                            valueField='name'
                                            isAllTextShown
                                            hasSearchBox
                                            isNAOption
                                            isInvalid={value.isErrorPicAuthorityID}
                                            onChange={(currentItem, selectedItemsKey) => {
                                                this.handleChangeAuthorityID(selectedItemsKey, indexCom, indexStaff);
                                            }}
                                        />
                                    </Cell>
                                    <Cell>
                                        <Form.Control type="text" name="" onChange={event => {
                                            this.handleChangeCommunicationValue('remark', event.target.value, indexCom, indexStaff);
                                        }} value={value.remark} autoComplete="off" />
                                    </Cell>
                                </Row>
                            );
                        }
                    })
                }
            </>
        );
    }

    getOriginalStaffAndAuthority = value => {
        return {
            picID: value.picID,
            picName: value.picName,
            picRoleID: value.picRoleID,
            picRoleName: value.picRoleName,
            communicationTools: value.communicationTools.map(com => {
                return{
                    rowID: com.rowID,
                    picCommunicationID: com.picCommunicationID,
                    picCommunicationName: com.picCommunicationName,
                    picCommunicationValue: com.picCommunicationValue,
                    authorityID: com.authorityID,
                    authority: com.authority,
                    remark: com.remark,
                    isErrorPicCommunication: false,
                    isErrorPicAuthorityID: false
                };
            }),
            isSyncFromPicTable: value.isSyncFromPicTable,
            isErrorPicName: false,
            isErrorPicRoleID: false,
            isEdit: false
        };
    }

    handleClear = (indexStaff) => {
        const { headlineStaffsAndAuthority } = this.state;
        const originalStaffAndAuthority = this.getOriginalStaffAndAuthority(headlineStaffsAndAuthority[indexStaff]);
        headlineStaffsAndAuthority[indexStaff].communicationTools.map(item => {
            item.remark = '';
            item.authority = '';
            item.authorityID = '';
        });
        headlineStaffsAndAuthority[indexStaff].isEdit = true;
        this.setState({
            headlineStaffsAndAuthority: headlineStaffsAndAuthority,
            originalStaffAndAuthority: originalStaffAndAuthority,
            showConfirmClear: {
                show: false,
                name: '',
                indexStaff: -1
            }
        });
    }

    handleEdit = (indexStaff) => {
        const { headlineStaffsAndAuthority } = this.state;
        if (headlineStaffsAndAuthority.findIndex(x => x.isEdit) === -1) {
            const originalStaffAndAuthority = this.getOriginalStaffAndAuthority(headlineStaffsAndAuthority[indexStaff]);
            headlineStaffsAndAuthority[indexStaff].isEdit = true;
            this.setState({
                headlineStaffsAndAuthority: headlineStaffsAndAuthority,
                originalStaffAndAuthority: originalStaffAndAuthority
            });
        }
    }

    handleCancel = (indexStaff) => {
        const { headlineStaffsAndAuthority, originalStaffAndAuthority } = this.state;
        if (originalStaffAndAuthority) {
            originalStaffAndAuthority.isEdit = false;
            headlineStaffsAndAuthority[indexStaff] = originalStaffAndAuthority;
            this.setState({ headlineStaffsAndAuthority: headlineStaffsAndAuthority });
        } else {
            const data = [...this.state.headlineStaffsAndAuthority];
            data.splice(indexStaff, 1);
            this.setState({headlineStaffsAndAuthority: data});
        }
        this.props.setErrors(null);
    }

    handleDelete = async indexStaff => {
        const data = [...this.state.headlineStaffsAndAuthority];
        data.splice(indexStaff, 1);
        await this.setState({
            headlineStaffsAndAuthority: data,
            showConfirmDelete: {
                show: false,
                name: '',
                indexStaff: -1
            }});
        await this.checkCustomerExistsOnCRM();
    }

    renderRow = (item, indexStaff) => {
        const { settingStaffAndAuthority } = this.props;
        return (
            <>
                <Row key={item.rowID} className='row-staff-authority'>
                    <Cell rowSpan={item.communicationTools.length}>{item.picName}</Cell>
                    <Cell rowSpan={item.communicationTools.length} className='text-center'>{item.picRoleName}</Cell>
                    <Cell>{item.communicationTools[0].picCommunicationName}</Cell>
                    <Cell>{item.communicationTools[0].picCommunicationValue}</Cell>
                    <Cell>
                        {
                            settingStaffAndAuthority.map(setting => {
                                if (item.communicationTools[0].authority?.includes(setting.settingValue)) {
                                    return <p className="authority-name" key={`${item.rowID}-${setting.settingValue}`}>{setting.settingValue}</p>;
                                }
                            })
                        }
                    </Cell>
                    <Cell>{item.communicationTools[0].remark}</Cell>
                    {
                        this.state.headlineInfoPolicy === Policy.Host && 
                        <Cell rowSpan={item.communicationTools.length}>
                            <div className='row-icon'>
                                <div className='icon icon-edit' title='Edit staff authority' onClick={() => this.handleEdit(indexStaff)}></div>
                                {
                                    item.isSyncFromPicTable &&
                                    <div className='icon icon-clear' title='Clear staff authority' onClick={() => this.handleShowConfirmClear(item.picName, indexStaff)}></div>
                                }
                                {
                                    !item.isSyncFromPicTable &&
                                    <div className='icon icon-delete' title='Delete staff authority' onClick={() => this.handleShowConfirmDelete(item.picName, indexStaff)}></div>
                                }
                            </div>
                        </Cell>
                    }
                </Row>
                {
                    item.communicationTools.map((value, index) => {
                        if (index !== 0) {
                            return (
                                <Row key={`${item.rowID}-${item.picID}-${item.picName}-${value.picCommunicationID}`} className='row-staff-authority row-child'>
                                    <Cell>{value.picCommunicationName}</Cell>
                                    <Cell>{value.picCommunicationValue}</Cell>
                                    <Cell>
                                        {
                                            settingStaffAndAuthority.map(setting => {
                                                if (value.authority?.includes(setting.settingValue)) {
                                                    return <p className="authority-name" key={`${item.rowID}-${setting.settingValue}`}>{setting.settingValue}</p>;
                                                }
                                            })
                                        }
                                    </Cell>
                                    <Cell>{value.remark}</Cell>
                                </Row>
                            );
                        }
                    })
                }
            </>
        );
    };
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { allSettings,
        customerInfo,
        headlineStaffsAndAuthority,
        getHeadlineStaffsAndAuthority,
        getStaffAndAuthority,
        settingStaffAndAuthority,
        getSettingPicRole,
        settingPicRole,
        settingCommunicationTool,
        setActiveTab,
        activeTab,
        setShowConfirmUnSaved
    } = state;
    return {
        allSettings,
        customerInfo,
        headlineStaffsAndAuthority,
        getHeadlineStaffsAndAuthority,
        getStaffAndAuthority,
        settingStaffAndAuthority,
        getSettingPicRole,
        settingPicRole,
        settingCommunicationTool,
        setActiveTab,
        activeTab,
        setShowConfirmUnSaved
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeadlineStaffsAndAuthority);