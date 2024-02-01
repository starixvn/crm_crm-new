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

export class HeadlineStaffsAndAuthority extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headlineStaffsAndAuthority: null,
            headlineInfoPolicy: null
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
                if (JSON.stringify(this.state.headlineStaffsAndAuthority).toString() === JSON.stringify(initialValues).toString()) {
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
                if (staff.picID === com.picID) {
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
            if (headlineStaffsAndAuthority.findIndex(x => x.picID === staff.picID) === -1) {
                headlineStaffsAndAuthority.push({                    
                    picID: staff.picID,
                    picName: staff.picName,
                    picRoleID: staff.picRoleID,
                    picRoleName: staff.picRoleName,
                    communicationTools: communicationTools,
                    isSyncFromPicTable: staff.isSyncFromPicTable,
                    isErrorPicName: false,
                    isErrorPicRoleID: false
                });
            }
        });
        return headlineStaffsAndAuthority;
    }  

    handleSubmit = async () => {
        const errors = this.validateHeadlineStaffAndAuthority();
        if (errors === null) {
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
                    picID: staff.picID,
                    picName: staff.picName,
                    picRoleID: staff.picRoleID,
                    picCommunicationID: staffCom.picCommunicationID,
                    picCommunicationValue: staffCom.picCommunicationValue,
                    authorityID: staffCom.authorityID,
                    authority: staffCom.authority,
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

    validateHeadlineStaffAndAuthority = () => {
        const { errors, headlineStaffsAndAuthority } = ValidateHeadlineStaffAndAuthority(this.state.headlineStaffsAndAuthority);
        this.setState({
            headlineStaffsAndAuthority: headlineStaffsAndAuthority
        });
        this.props.setErrors(Object.keys(errors).length === 0 ? null : errors);
        return Object.keys(errors).length === 0 ? null : errors;
    }

    render() {
        const { headlineStaffsAndAuthority, headlineInfoPolicy } = this.state;
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
                <div className={`${headlineStaffsAndAuthority.length < 3 && 'table-inTab'}`}>
                    <Table
                        width={1495}
                        autoWidth={false}
                        header={this.buildHeader()}
                        body={this.buildBody()}
                        isPaging={false}
                        containerPadding={0}
                        adjustedHeight={10}
                    />
                </div>
                {
                    headlineInfoPolicy === Policy.Host &&
                    <div className='group-btn'>
                        <Button type="submit" className='btn-save' onClick={() => { this.handleSubmit(); }}>
                            {LangHelper.getResource('Save')}
                        </Button>
                    </div>
                }
            </>
        );
    }

    handleAddNewRow = () => {
        const errors = this.validateHeadlineStaffAndAuthority();
        if (errors === null) {
            let { headlineStaffsAndAuthority } = this.state;
            headlineStaffsAndAuthority.push({
                picID: null,
                picName: null,
                picRoleID: 0,
                picRoleName: null,
                communicationTools: [{
                    rowID: -1,
                    picCommunicationID: 0,
                    picCommunicationName: null,
                    picCommunicationValue: null,
                    authorityID: '',
                    authority: null,
                    remark: null
                }],
                isSyncFromPicTable: false
            });
            this.setState({ headlineStaffsAndAuthority: headlineStaffsAndAuthority });
        }
    };

    handleAddTool = (indexStaff) => {
        const errors = this.validateHeadlineStaffAndAuthority();
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
                <HeaderCell colWidth={270} className="display-colSpan"></HeaderCell>
                <HeaderCell colWidth={160}>{LangHelper.getResource('Authority')}</HeaderCell>
                <HeaderCell colWidth={460}>{LangHelper.getResource('Remark')}</HeaderCell>
                {
                    headlineInfoPolicy === Policy.Host &&
                    <HeaderCell colWidth={120}>{LangHelper.getResource('Action')}</HeaderCell>
                }
            </HeaderRow>
        );
    };

    buildBody = () => {
        const { headlineStaffsAndAuthority, headlineInfoPolicy } = this.state;

        if (headlineStaffsAndAuthority.length > 0) {
            return [
                <Fragment key={'body'}>
                    {headlineStaffsAndAuthority.map((item, indexStaff) => {
                        if (headlineInfoPolicy === Policy.Host) {
                            return this.renderEditRow(item, indexStaff)
                        } else {
                            return this.renderRow(item)
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
                            {
                                staff.isSyncFromPicTable &&
                                <div className='icon icon-clear' onClick={() => this.handleClear(indexStaff)}></div>
                            }
                            {
                                !staff.isSyncFromPicTable &&
                                <div className='icon icon-delete' onClick={() => this.handleDelete(indexStaff)}></div>
                            }
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

    handleClear = (indexStaff) => {
        const { headlineStaffsAndAuthority } = this.state;
        headlineStaffsAndAuthority[indexStaff].communicationTools.map(item => {
            item.remark = '';
            item.authority = '';
            item.authorityID = '';
        });
        this.setState({ headlineStaffsAndAuthority: headlineStaffsAndAuthority });
    }

    handleDelete = (indexStaff) => {
        const data = [...this.state.headlineStaffsAndAuthority];
        data.splice(indexStaff, 1);
        this.setState({ headlineStaffsAndAuthority: data });
    }

    renderRow = (item) => {
        return (
            <>
                <Row key={item.rowID} className='row-staff-authority'>
                    <Cell rowSpan={item.communicationTools.length}>{item.picName}</Cell>
                    <Cell rowSpan={item.communicationTools.length} className='text-center'>{item.picRoleName}</Cell>
                    <Cell>{item.communicationTools[0].picCommunicationName}</Cell>
                    <Cell>{item.communicationTools[0].picCommunicationValue}</Cell>
                    <Cell>{item.communicationTools[0].authority}</Cell>
                    <Cell>{item.communicationTools[0].remark}</Cell>
                </Row>
                {
                    item.communicationTools.map((value, index) => {
                        if (index !== 0) {
                            return (
                                <Row key={`${item.rowID}-${item.picID}-${item.picName}-${value.picCommunicationID}`} className='row-staff-authority row-child'>
                                    <Cell>{value.picCommunicationName}</Cell>
                                    <Cell>{value.picCommunicationValue}</Cell>
                                    <Cell>{value.authority}</Cell>
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