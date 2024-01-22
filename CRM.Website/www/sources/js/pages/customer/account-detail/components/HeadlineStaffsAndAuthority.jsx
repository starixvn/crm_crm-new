import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import { Form, Button } from 'react-bootstrap';
import LangHelper from '@jsroot/common/langHelper';
import { Table, HeaderRow, HeaderCell, Cell, Row } from '@jsroot/components/react-grid/index';
import Site from '@jsroot/common/site';
import { getPermission } from '@jsroot/common/shareScripts';
import { FunctionKey } from '@jsroot/common/constants';
import MultipleSelect from '@jsroot/components/multiple-select/index';

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
        this.getHeadlineStaffsAndAuthorityInfo(this.props.headlineStaffsAndAuthority);
        getPermission(FunctionKey.HeadlineInfo, true).then(response => {
            this.setState({ headlineInfoPolicy: response });
        });
    }

    getHeadlineStaffsAndAuthorityInfo = value => {
        let headlineStaffsAndAuthority = [];
        value.map(staff => {
            let communicationTools = [];
            value.map(com => {
                if (staff.picID === com.picID) {
                    communicationTools.push({
                        picCommunicationID: com.picCommunicationID,
                        picCommunicationName: com.picCommunicationName,
                        picCommunicationValue: com.picCommunicationValue,
                        authorityID: com.authorityID,
                        authority: com.authority,
                        remark: com.remark
                    });
                }
            });
            if (headlineStaffsAndAuthority.findIndex(x => x.picID === staff.picID) === -1) {
                headlineStaffsAndAuthority.push({
                    rowID: staff.rowID,
                    picID: staff.picID,
                    picName: staff.picName,
                    picRoleID: staff.picRoleID,
                    picRoleName: staff.picRoleName,
                    communicationTools: communicationTools,
                    isSyncFromPicTable: staff.isSyncFromPicTable
                });
            }
        });
        this.setState({ headlineStaffsAndAuthority: headlineStaffsAndAuthority });
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
                    headlineInfoPolicy === 2 &&
                    <Button className='btn-add' type="submit" variant="primary" size="sm" onClick={this.handleAddNewRow}>
                        {LangHelper.getResource('Add')}
                    </Button>
                }
                <Table
                    width={1504}
                    autoWidth={false}
                    header={this.buildHeader()}
                    body={this.buildBody()}
                    isPaging={false}
                    containerPadding={0}
                    adjustedHeight={10}
                />
                {
                    headlineInfoPolicy === 2 &&
                    <div className='group-btn'>
                        <Button type="submit" className='btn-save' >
                            {LangHelper.getResource('Save')}
                        </Button>
                    </div>
                }
            </>
        );
    }

    handleAddNewRow = () => {
        const { headlineStaffsAndAuthority } = this.state;
        headlineStaffsAndAuthority.push({
            rowID: -1,
            picID: null,
            picName: null,
            picRoleID: 0,
            picRoleName: null,
            communicationTools: [{
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
    };

    handleAddTool = () => {
        let { item } = this.state;
        item.communicationTools.push({
            picCommunicationID: 0,
            picCommunicationName: null,
            picCommunicationValue: null,
            authorityID: '',
            authority: '',
            remark: ''
        });
        this.setState({ newHeadlineStaffsAndAuthority: item });
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
                    headlineInfoPolicy === 2 &&
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
                        if (headlineInfoPolicy === 2) {
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
        const authorityTool = this.props.settingStaffAndAuthority.find(x => x.settingId === value);
        headlineStaffsAndAuthority[indexStaff].communicationTools[indexPicCommunicationTool].authorityID = value;
        headlineStaffsAndAuthority[indexStaff].communicationTools[indexPicCommunicationTool].authority = authorityTool.settingValue;
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
                authorityId: item.settingID,
                name: item.settingValue,
                checked: staff.communicationTools[0].authorityID.includes(item.settingId.toString())
            };
        });
        return (
            <>
                <Row className='row-add'>
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
                                <Form.Control type="text" onChange={event => {
                                    this.handleChangeValue('picName', event.target.value, indexStaff);
                                }} value={staff.picName} autoComplete="off" />
                            </Cell>
                            <Cell rowSpan={staff.communicationTools.length}>
                                <Form.Control as="select" size="sm" value={staff.picRoleID}
                                    onChange={event => {
                                        this.handleChangeRole(parseInt(event.target.value, 0), indexStaff);
                                    }}>
                                    <option value={0} disabled hidden>{LangHelper.getResource('PleaseSelect')}</option>
                                    {settingPicRole.map(item => this.renderOptions(item.settingValue, item.settingId))}
                                </Form.Control>
                            </Cell>
                            <Cell>
                                <div className='col-add'>
                                    <Form.Control as="select" size="sm"
                                        value={staff.communicationTools[0].picCommunicationID}
                                        onChange={event => {
                                            this.handleChangeCommunicationID(parseInt(event.target.value, 10), 0, indexStaff);
                                        }}>
                                        <option value={0} disabled hidden>{LangHelper.getResource('PleaseSelect')}</option>
                                        {settingCommunicationTool.map(item => this.renderOptions(item.settingValue, item.settingId))}
                                    </Form.Control>
                                    {
                                        staff.communicationTools.length > 1 &&
                                        <div className='icon icon-delete'></div>
                                    }
                                    {
                                        staff.communicationTools.length === 1 &&
                                        <div className='icon icon-plus' onClick={event => { this.handleAddTool() }}></div>
                                    }
                                </div>
                            </Cell>
                            <Cell>
                                <Form.Control type="text" name="" onChange={event => {
                                    this.handleChangeCommunicationValue('picCommunicationValue', event.target.value, 0, indexStaff);
                                }}
                                    value={staff.communicationTools[0].picCommunicationValue} autoComplete="off" />
                            </Cell>
                        </>
                    }
                    <Cell>
                        <MultipleSelect
                            dataSource={authorityFirstSelected}
                            keyField='authorityID'
                            valueField='name'
                            isAllTextShown
                            isNAOption
                            onChange={(currentItem, selectedItemsKey) => {
                                this.handleChangeAuthorityID(selectedItemsKey, index, indexStaff);
                            }}
                        />
                        {/*<Form.Control as="select" size="sm"*/}
                        {/*    value={staff.communicationTools[0].authorityID}*/}
                        {/*    onChange={event => {*/}
                        {/*        this.handleChangeAuthorityID(parseInt(event.target.value, 10), 0, indexStaff);*/}
                        {/*    }}>*/}
                        {/*    <option value={0} disabled hidden>{LangHelper.getResource('PleaseSelect')}</option>*/}
                        {/*    {settingStaffAndAuthority.map(item => this.renderOptions(item.settingValue, item.settingId))}*/}
                        {/*</Form.Control>*/}
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
                    staff.communicationTools.map((value, index) => {
                        const authoritySelected = settingStaffAndAuthority.map(item => {
                            return {
                                authorityId: item.settingID,
                                name: item.settingValue,
                                checked: value.authorityID.includes(item.settingId.toString())
                            };
                        });
                        if (index !== 0) {
                            return (
                                <Row key={`${staff.rowID}`} class="row-add">
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
                                                        onChange={event => {
                                                            this.handleChangeCommunicationID(parseInt(event.target.value, 10), index, indexStaff);
                                                        }}>
                                                        <option value={0} disabled hidden>{LangHelper.getResource('PleaseSelect')}</option>
                                                        {settingCommunicationTool.map(item => this.renderOptions(item.settingValue, item.settingId))}
                                                    </Form.Control>
                                                    <div className='icon icon-delete'></div>
                                                    {
                                                        staff.communicationTools.length === (index + 1) &&
                                                        <div className='icon icon-plus' onClick={event => { this.handleAddTool() }}></div>
                                                    }
                                                </div>
                                            </Cell>
                                            <Cell>
                                                <Form.Control type="text" name="" onChange={event => {
                                                    this.handleChangeCommunicationValue('picCommunicationValue', event.target.value, index, indexStaff);
                                                }}
                                                    value={value.picCommunicationValue} autoComplete="off" />
                                            </Cell>
                                        </>
                                    }
                                    <Cell>
                                        <MultipleSelect
                                            dataSource={authoritySelected}
                                            keyField='authorityID'
                                            valueField='name'
                                            isAllTextShown
                                            isNAOption
                                            onChange={(currentItem, selectedItemsKey) => {
                                                this.handleChangeAuthorityID(selectedItemsKey, index, indexStaff);
                                            }}
                                        />
                                        {/*<Form.Control as="select" size="sm"*/}
                                        {/*    value={value.authorityID}*/}
                                        {/*    onChange={event => {*/}
                                        {/*        this.handleChangeAuthorityID(parseInt(event.target.value, 10), index, indexStaff);*/}
                                        {/*    }}>*/}
                                        {/*    <option value={0} disabled hidden>{LangHelper.getResource('PleaseSelect')}</option>*/}
                                        {/*    {settingStaffAndAuthority.map(item => this.renderOptions(item.settingValue, item.settingId))}*/}
                                        {/*</Form.Control>*/}
                                    </Cell>
                                    <Cell>
                                        <Form.Control type="text" name="" onChange={event => {
                                            this.handleChangeCommunicationValue('remark', event.target.value, index, indexStaff);
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
            item.authorityID = 0;
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
                                <Row key={`${item.picID}-${value.picCommunicationName}`} className='row-staff-authority row-child'>
                                    <Cell>{value.picCommunicationName}</Cell>
                                    <Cell>{value.picCommunicationValue}</Cell>
                                    <Cell>{value.authorityID}</Cell>
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
        settingCommunicationTool
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
        settingCommunicationTool
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeadlineStaffsAndAuthority);