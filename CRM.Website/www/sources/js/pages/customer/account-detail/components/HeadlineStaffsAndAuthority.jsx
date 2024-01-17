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
            showAddStaffAuthor: false,
            newHeadlineStaffsAndAuthority: {
                rowID: -1,
                picID: null,
                picName: null,
                picRoleID: null,
                picRoleName: null,
                communicationTools: [{
                    picCommunicationID: null,
                    picCommunicationName: null,
                    picCommunicationValue: null,
                    authorityID: null,
                    authority: '',
                    remark: ''
                }],
                isSyncFromPicTable: 0
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
                    isSyncFromPicTable: staff.isSyncFromPicTable,
                    createdDate: staff.createdDate,
                    isEdit: false
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
                <Button className='btn-add' type="submit" variant="primary" size="sm" onClick={this.handleAddStaffAuthor}>
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

    handleAddStaffAuthor = () => {
        this.setState({ showAddStaffAuthor: true });
    };

    handleAddTool = () => {
        let { newHeadlineStaffsAndAuthority } = this.state;
        newHeadlineStaffsAndAuthority.communicationTools.push({
            picCommunicationID: null,
            picCommunicationName: null,
            picCommunicationValue: null,
            authorityID: null,
            authority: '',
            remark: ''
        });
        this.setState({ newHeadlineStaffsAndAuthority: newHeadlineStaffsAndAuthority });
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
        const { showAddStaffAuthor, headlineStaffsAndAuthority } = this.state;
       
        if (headlineStaffsAndAuthority.length > 0) {
            return [
                <Fragment key={'body'}>
                    {headlineStaffsAndAuthority.map((item, indexStaff) => this.renderRow(item, indexStaff))}
                    {showAddStaffAuthor  && this.addNewRow()}
                </Fragment>
            ];
        }

        return [
            <Row key='body-NoData' className="no-data" >
                <Cell className='text-center' colSpan={7}>{LangHelper.getResource('ThereIsNoData')}</Cell>
            </Row>
        ];
    };

    handleEdit = (indexStaff) => {
        const { headlineStaffsAndAuthority } = this.state;
        headlineStaffsAndAuthority[indexStaff].isEdit = true;
        this.setState({ headlineStaffsAndAuthority: headlineStaffsAndAuthority });
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

    handleChangeValue = (name, value) => {
        let { newHeadlineStaffsAndAuthority } = this.state;
        newHeadlineStaffsAndAuthority[name] = value;
        this.setState({ newHeadlineStaffsAndAuthority: newHeadlineStaffsAndAuthority });
    }

    handleChangeCommunicationID = ( value, indexPicCommunicationTool) => {
        let { newHeadlineStaffsAndAuthority } = this.state;
        const comTool = this.props.settingCommunicationTool.find(x => x.settingId === value);
        newHeadlineStaffsAndAuthority.communicationTools[indexPicCommunicationTool].picCommunicationID = value;
        newHeadlineStaffsAndAuthority.communicationTools[indexPicCommunicationTool].picCommunicationName = comTool.settingValue;
        this.setState({ newHeadlineStaffsAndAuthority: newHeadlineStaffsAndAuthority });
    }

    handleChangeAuthorityID = (value, indexPicCommunicationTool) => {
        let { newHeadlineStaffsAndAuthority } = this.state;
        const authorityTool = this.props.settingStaffAndAuthority.find(x => x.settingId === value);
        newHeadlineStaffsAndAuthority.communicationTools[indexPicCommunicationTool].authorityID = value;
        newHeadlineStaffsAndAuthority.communicationTools[indexPicCommunicationTool].authority = authorityTool.settingValue;
        this.setState({ newHeadlineStaffsAndAuthority: newHeadlineStaffsAndAuthority });
    }

    handleChangeCommunicationValue = (name, value, indexPicCommunicationTool) => {
        let { newHeadlineStaffsAndAuthority } = this.state;
        newHeadlineStaffsAndAuthority.communicationTools[indexPicCommunicationTool][name] = value;
        this.setState({ newHeadlineStaffsAndAuthority: newHeadlineStaffsAndAuthority });
    }

    handleSaveNewHeadlineStaffsAndAuthority = () => {
        let { newHeadlineStaffsAndAuthority, headlineStaffsAndAuthority } = this.state;
        headlineStaffsAndAuthority.push({
            rowID: newHeadlineStaffsAndAuthority.rowID,
            picID: newHeadlineStaffsAndAuthority.picID,
            picName: newHeadlineStaffsAndAuthority.picName,
            picRoleID: newHeadlineStaffsAndAuthority.picRoleID,
            picRoleName: newHeadlineStaffsAndAuthority.picRoleName,
            communicationTools: newHeadlineStaffsAndAuthority.communicationTools.map(com => {
                return {
                    picCommunicationID: com.picCommunicationID,
                    picCommunicationName: com.picCommunicationName,
                    picCommunicationValue: com.picCommunicationValue,
                    authorityID: com.authorityID,
                    authority: com.authority,
                    remark: com.remark
                }
            }),
            isSyncFromPicTable: newHeadlineStaffsAndAuthority.isSyncFromPicTable,
            createdDate: newHeadlineStaffsAndAuthority.createdDate,
            isEdit: false
        });
        this.setState({
            headlineStaffsAndAuthority: headlineStaffsAndAuthority,
            newHeadlineStaffsAndAuthority: {
                rowID: -1,
                picID: null,
                picName: null,
                picRoleID: null,
                picRoleName: null,
                communicationTools: [{
                    picCommunicationID: null,
                    picCommunicationName: null,
                    picCommunicationValue: null,
                    authorityID: null,
                    authority: '',
                    remark: ''
                }],
                isSyncFromPicTable: 0
            },
            showAddStaffAuthor: false
        });
    }

    handleCancelNewHeadlineStaffsAndAuthority = () => {
        this.setState({
            newHeadlineStaffsAndAuthority: {
                rowID: -1,
                picID: null,
                picName: null,
                picRoleID: null,
                picRoleName: null,
                communicationTools: [{
                    picCommunicationID: null,
                    picCommunicationName: null,
                    picCommunicationValue: null,
                    authorityID: null,
                    authority: '',
                    remark: ''
                }],
                isSyncFromPicTable: 0
            },
            showAddStaffAuthor: false
        }
        );
    }

    renderOptions = (name, item) => <option key={item} value={item}>{name}</option>;

    addNewRow = () => {
        const { newHeadlineStaffsAndAuthority } = this.state;
        const { settingStaffAndAuthority, settingPicRole, settingCommunicationTool } = this.props;
        return (
            <>
                <Row className='row-add'>
                    <Cell rowSpan={newHeadlineStaffsAndAuthority.communicationTools.length}>
                        <Form.Control type="text" onChange={event => {
                            this.handleChangeValue('picName', event.target.value);
                        }} value={newHeadlineStaffsAndAuthority.picName} autoComplete="off"/>
                    </Cell>
                    <Cell rowSpan={newHeadlineStaffsAndAuthority.communicationTools.length}>
                        <Form.Control as="select" size="sm" value={newHeadlineStaffsAndAuthority.picRoleID}
                            onChange={(currentItem, selectedItemsKey) => {
                                this.handleChangeValue('picRoleID', selectedItemsKey);
                            }}>
                            {settingPicRole.map(item => this.renderOptions(item.settingValue, item.settingId))}
                        </Form.Control>
                    </Cell>
                    <Cell>
                        <div className='col-add'>
                            <Form.Control as="select" size="sm"
                                value={newHeadlineStaffsAndAuthority.communicationTools[0].picCommunicationID}
                                onChange={event => {
                                    this.handleChangeCommunicationID(parseInt(event.target.value, 10), 0);
                                }}>
                                <option value={0} disabled hidden>{LangHelper.getResource('PleaseSelect')}</option>
                                {settingCommunicationTool.map(item => this.renderOptions(item.settingValue, item.settingId))}
                            </Form.Control>
                            {
                                newHeadlineStaffsAndAuthority.communicationTools.length > 1 && 
                                <div className='icon icon-delete'></div>
                            }
                            {
                                newHeadlineStaffsAndAuthority.communicationTools.length === 1 && 
                                <div className='icon icon-plus' onClick={event => { this.handleAddTool() }}></div>
                            }
                        </div>
                    </Cell>
                    <Cell>
                        <Form.Control type="text" name="" onChange={event => {
                            this.handleChangeCommunicationValue('picCommunicationName',event.target.value, 0);
                            }}
                            value={newHeadlineStaffsAndAuthority.communicationTools[0].picCommunicationName} autoComplete="off" />
                    </Cell>
                    <Cell>
                        <Form.Control as="select" size="sm"
                            value={newHeadlineStaffsAndAuthority.communicationTools[0].authorityID}
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
                        }} value={newHeadlineStaffsAndAuthority.communicationTools[0].remark} autoComplete="off"/>
                    </Cell>
                    <Cell rowSpan={newHeadlineStaffsAndAuthority.communicationTools.length}>
                        <div className='row-icon'>
                            <div className='icon icon-save' onClick={event => { this.handleSaveNewHeadlineStaffsAndAuthority(); }}></div>
                            <div className='icon icon-cancel' onClick={event => { this.handleCancelNewHeadlineStaffsAndAuthority(); }}></div>
                        </div>
                    </Cell>
                </Row>
                {
                    newHeadlineStaffsAndAuthority.communicationTools.map((value, index) => {
                        if (index !== 0) {
                            return (
                                <Row key={`${newHeadlineStaffsAndAuthority.rowID}`} class="row-add">
                                    <Cell>
                                        <div className='col-add'>
                                            <Form.Control className='select-item' type="text" name="" value={null} autoComplete="off" />
                                            <div className='icon icon-delete'></div>
                                            {
                                                newHeadlineStaffsAndAuthority.communicationTools.length === (index + 1) &&
                                                <div className='icon icon-plus' onClick={event => { this.handleAddTool() }}></div>
                                            }
                                        </div>
                                    </Cell>
                                    <Cell>
                                        <Form.Control type="text" name="" value={index} autoComplete="off" />
                                    </Cell>
                                    <Cell>
                                        <Form.Control type="text" name="" value={value.authority} autoComplete="off" />
                                    </Cell>
                                    <Cell>
                                        <Form.Control type="text" name="" value={value.remark} autoComplete="off" />
                                    </Cell>
                                </Row>
                            );
                        }
                    })
                }
            </>
        );
    }

    renderRow = (item, indexStaff) => {
        return (
            <>
                <Row key={item.rowID} className='row-staff-authority'>
                    <Cell rowSpan={item.communicationTools.length}>{item.picName}</Cell>
                    <Cell rowSpan={item.communicationTools.length} className='text-center'>{item.picRoleName}</Cell>
                    <Cell>{item.communicationTools[0].picCommunicationName}</Cell>
                    <Cell>{item.communicationTools[0].picCommunicationValue}</Cell>
                    {
                        !item.isEdit &&
                        <>
                            <Cell>{item.communicationTools[0].authority}</Cell>
                            <Cell>{item.communicationTools[0].remark}</Cell>
                        </>
                    }
                    {
                        item.isEdit && 
                        <>
                            <Cell>
                                <Form.Control type="text" name="" value={null} autoComplete="off" />
                            </Cell>
                            <Cell>
                                <Form.Control type="text" name="" value={null} autoComplete="off" />
                            </Cell>
                        </>
                    }
                    <Cell rowSpan={item.communicationTools.length}>
                        {
                            item.isEdit &&
                            <div className='row-icon'>
                                <div className='icon icon-save'></div>
                                <div className='icon icon-cancel'></div>
                            </div>
                        }
                        {
                            !item.isEdit &&
                            <div className='row-icon'>
                                <div className='icon icon-edit' onClick={() => this.handleEdit(indexStaff)}></div>
                                {
                                    item.isSyncFromPicTable &&
                                    <div className='icon icon-clear' onClick={() => this.handleClear(indexStaff)}></div>
                                }
                                {
                                    !item.isSyncFromPicTable &&
                                    <div className='icon icon-delete' onClick={() => this.handleDelete(indexStaff, item.rowID)}></div>
                                }
                            </div>
                        }
                    </Cell>
                </Row>
                {
                    item.communicationTools.map((value, index) => {
                        if (index !== 0) {
                            return (
                                <Row key={`${item.picID}-${value.picCommunicationName}`} className='row-staff-authority row-child'>
                                    <Cell>{value.picCommunicationName}</Cell>
                                    <Cell>{value.picCommunicationValue}</Cell>
                                    {
                                        !item.isEdit &&
                                        <>
                                            <Cell>{value.authority}</Cell>
                                            <Cell>{value.remark}</Cell>
                                        </>
                                    }
                                    {
                                        item.isEdit &&
                                        <>
                                            <Cell>
                                                <Form.Control type="text" name="" value={null} autoComplete="off" />
                                            </Cell>
                                            <Cell>
                                                <Form.Control type="text" name="" value={null} autoComplete="off" />
                                            </Cell>
                                        </>
                                    }
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