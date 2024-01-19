import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import { Form, Button } from 'react-bootstrap';
import LangHelper from '@jsroot/common/langHelper';
import { Table, HeaderRow, HeaderCell, Cell, Row } from '@jsroot/components/react-grid/index';
import Site from '@jsroot/common/site';

export class HeadlineStaffsAndAuthority extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headlineStaffsAndAuthority: null,
            item: {
                rowID: -1,
                picID: null,
                picName: null,
                picRoleID: 0,
                picRoleName: null,
                communicationTools: [{
                    picCommunicationID: 0,
                    picCommunicationName: null,
                    picCommunicationValue: null,
                    authorityID: 0,
                    authority: '',
                    remark: ''
                }],
                isSyncFromPicTable: false
            }
        };
    }

    async componentDidMount() {
        await this.props.getHeadlineStaffsAndAuthority({ headlineID: this.props.customerInfo.custId });
        await this.props.getStaffAndAuthority();
        await this.props.getSettingPicRole();
        this.getHeadlineStaffsAndAuthorityInfo(this.props.headlineStaffsAndAuthority);
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
        const { headlineStaffsAndAuthority } = this.state;
        const { settingStaffAndAuthority, settingPicRole } = this.props;

        if (!settingStaffAndAuthority || !headlineStaffsAndAuthority || !settingPicRole) {
            return null;
        }

        return (
            <>
                <Button className='btn-add' type="submit" variant="primary" size="sm" onClick={this.handleAddNewRow}>
                    {LangHelper.getResource('Add')}
                </Button>
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
            communicationTools: newHeadlineStaffsAndAuthority.communicationTools.map(com => {
                return {
                    picCommunicationID: 0,
                    picCommunicationName: null,
                    picCommunicationValue: null,
                    authorityID: 0,
                    authority: null,
                    remark: null
                }
            }),
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
            authorityID: 0,
            authority: '',
            remark: ''
        });
        this.setState({ newHeadlineStaffsAndAuthority: item });
    };

    buildHeader = () => {
        return (
            <HeaderRow>
                <HeaderCell colWidth={200}>{LangHelper.getResource('Name')}</HeaderCell>
                <HeaderCell colWidth={120}>{LangHelper.getResource('Role')}</HeaderCell>
                <HeaderCell colWidth={170} colspan={2}>{LangHelper.getResource('CommunicationTool')}</HeaderCell>
                <HeaderCell colWidth={270} className="display-colSpan"></HeaderCell>
                <HeaderCell colWidth={160}>{LangHelper.getResource('Authority')}</HeaderCell>
                <HeaderCell colWidth={460}>{LangHelper.getResource('Remark')}</HeaderCell>
                <HeaderCell colWidth={120}>{LangHelper.getResource('Action')}</HeaderCell>
            </HeaderRow>
        );
    };

    buildBody = () => {
        const { headlineStaffsAndAuthority } = this.state;
       
        if (headlineStaffsAndAuthority.length > 0) {
            return [
                <Fragment key={'body'}>
                    {headlineStaffsAndAuthority.map((item, indexStaff) => {
                        return this.renderRow(item, indexStaff)
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

    handleChangeValue = (name, value) => {
        let { item } = this.state;
        item[name] = value;
        this.setState({ newHeadlineStaffsAndAuthority: item });
    }

    handleChangeRole = (value) => {
        let { item } = this.state;
        const comTool = this.props.settingPicRole.find(x => x.settingId === value);
        item.picRoleID = value;
        item.picRoleName = comTool.settingValue;
        this.setState({ newHeadlineStaffsAndAuthority: item });
    }

    handleChangeCommunicationID = ( value, indexPicCommunicationTool) => {
        let { item } = this.state;
        const comTool = this.props.settingCommunicationTool.find(x => x.settingId === value);
        item.communicationTools[indexPicCommunicationTool].picCommunicationID = value;
        item.communicationTools[indexPicCommunicationTool].picCommunicationName = comTool.settingValue;
        this.setState({ newHeadlineStaffsAndAuthority: item });
    }

    handleChangeAuthorityID = (value, indexPicCommunicationTool) => {
        let { item } = this.state;
        const authorityTool = this.props.settingStaffAndAuthority.find(x => x.settingId === value);
        item.communicationTools[indexPicCommunicationTool].authorityID = value;
        item.communicationTools[indexPicCommunicationTool].authority = authorityTool.settingValue;
        this.setState({ newHeadlineStaffsAndAuthority: item });
    }

    handleChangeCommunicationValue = (name, value, indexPicCommunicationTool) => {
        let { item } = this.state;
        item.communicationTools[indexPicCommunicationTool][name] = value;
        this.setState({ newHeadlineStaffsAndAuthority: item });
    }

    renderOptions = (name, item) => <option key={item} value={item}>{name}</option>;

    renderEditRow = () => {
        const { item } = this.state;
        const { settingStaffAndAuthority, settingPicRole, settingCommunicationTool } = this.props;
        return (
            <>
                <Row className='row-add'>
                    <Cell rowSpan={item.communicationTools.length}>
                        <Form.Control type="text" onChange={event => {
                            this.handleChangeValue('picName', event.target.value);
                        }} value={item.picName} autoComplete="off"/>
                    </Cell>
                    <Cell rowSpan={item.communicationTools.length}>
                        <Form.Control as="select" size="sm" value={item.picRoleID}
                            onChange={event => {
                                this.handleChangeRole(parseInt(event.target.value, 0));
                            }}>
                            <option value={0} disabled hidden>{LangHelper.getResource('PleaseSelect')}</option>
                            {settingPicRole.map(item => this.renderOptions(item.settingValue, item.settingId))}
                        </Form.Control>
                    </Cell>
                    <Cell>
                        <div className='col-add'>
                            <Form.Control as="select" size="sm"
                                value={item.communicationTools[0].picCommunicationID}
                                onChange={event => {
                                    this.handleChangeCommunicationID(parseInt(event.target.value, 10), 0);
                                }}>
                                <option value={0} disabled hidden>{LangHelper.getResource('PleaseSelect')}</option>
                                {settingCommunicationTool.map(item => this.renderOptions(item.settingValue, item.settingId))}
                            </Form.Control>
                            {
                                item.communicationTools.length > 1 && 
                                <div className='icon icon-delete'></div>
                            }
                            {
                                item.communicationTools.length === 1 && 
                                <div className='icon icon-plus' onClick={event => { this.handleAddTool() }}></div>
                            }
                        </div>
                    </Cell>
                    <Cell>
                        <Form.Control type="text" name="" onChange={event => {
                            this.handleChangeCommunicationValue('picCommunicationValue',event.target.value, 0);
                            }}
                            value={item.communicationTools[0].picCommunicationValue} autoComplete="off" />
                    </Cell>
                    <Cell>
                        <Form.Control as="select" size="sm"
                            value={item.communicationTools[0].authorityID}
                            onChange={event => {
                                this.handleChangeAuthorityID(parseInt(event.target.value, 10), 0);
                            }}>
                            <option value={0} disabled hidden>{LangHelper.getResource('PleaseSelect')}</option>
                            {settingStaffAndAuthority.map(item => this.renderOptions(item.settingValue, item.settingId))}
                        </Form.Control>
                    </Cell>
                    <Cell>
                        <Form.Control type="text" name="" onChange={event => {
                            this.handleChangeCommunicationValue('remark', event.target.value, 0);
                        }} value={item.communicationTools[0].remark} autoComplete="off"/>
                    </Cell>
                    <Cell rowSpan={item.communicationTools.length}>
                        <div className='row-icon'>
                            <div className='icon icon-save' onClick={event => { this.handleSaveNewHeadlineStaffsAndAuthority(); }}></div>
                            <div className='icon icon-cancel' onClick={event => { this.handleCancelNewHeadlineStaffsAndAuthority(); }}></div>
                        </div>
                    </Cell>
                </Row>
                {
                    item.communicationTools.map((value, index) => {
                        if (index !== 0) {
                            return (
                                <Row key={`${item.rowID}`} class="row-add">
                                    <Cell>
                                        <div className='col-add'>
                                            <Form.Control as="select" size="sm"
                                                value={value.picCommunicationID}
                                                onChange={event => {
                                                    this.handleChangeCommunicationID(parseInt(event.target.value, 10), index);
                                                }}>
                                                <option value={0} disabled hidden>{LangHelper.getResource('PleaseSelect')}</option>
                                                {settingCommunicationTool.map(item => this.renderOptions(item.settingValue, item.settingId))}
                                            </Form.Control>
                                            <div className='icon icon-delete'></div>
                                            {
                                                item.communicationTools.length === (index + 1) &&
                                                <div className='icon icon-plus' onClick={event => { this.handleAddTool() }}></div>
                                            }
                                        </div>
                                    </Cell>
                                    <Cell>
                                        <Form.Control type="text" name="" onChange={event => {
                                            this.handleChangeCommunicationValue('picCommunicationValue', event.target.value, index);
                                        }}
                                            value={value.picCommunicationValue} autoComplete="off" />
                                    </Cell>
                                    <Cell>
                                        <Form.Control as="select" size="sm"
                                            value={value.authorityID}
                                            onChange={event => {
                                                this.handleChangeAuthorityID(parseInt(event.target.value, 10), index);
                                            }}>
                                            <option value={0} disabled hidden>{LangHelper.getResource('PleaseSelect')}</option>
                                            {settingStaffAndAuthority.map(item => this.renderOptions(item.settingValue, item.settingId))}
                                        </Form.Control>
                                    </Cell>
                                    <Cell>
                                        <Form.Control type="text" name="" onChange={event => {
                                            this.handleChangeCommunicationValue('remark', event.target.value, index);
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

    handleDelete = (indexStaff, rowID) => {
        const data = [...this.state.headlineStaffsAndAuthority];
        const index = data[indexStaff].findIndex(staff => staff.rowID === rowID);
        data[indexStaff].splice(index, 1);
        this.setState({ headlineStaffsAndAuthority: data });
    }

    renderRow = (item, indexStaff) => {
        return (
            <>
                <Row key={item.rowID} className='row-staff-authority'>
                    <Cell rowSpan={item.communicationTools.length}>{item.picName}</Cell>
                    <Cell rowSpan={item.communicationTools.length} className='text-center'>{item.picRoleName}</Cell>
                    <Cell>{item.communicationTools[0].picCommunicationName}</Cell>
                    <Cell>{item.communicationTools[0].picCommunicationValue}</Cell>
                    <Cell>{item.communicationTools[0].authority}</Cell>
                    <Cell>{item.communicationTools[0].remark}</Cell>
                    <Cell rowSpan={item.communicationTools.length}>
                        <div className='row-icon'>
                            {
                                item.isSyncFromPicTable &&
                                <div className='icon icon-clear' onClick={() => this.handleClear(indexStaff)}></div>
                            }
                            {
                                !item.isSyncFromPicTable &&
                                <div className='icon icon-delete' onClick={() => this.handleDelete(indexStaff, item.rowID)}></div>
                            }
                        </div>
                    </Cell>
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