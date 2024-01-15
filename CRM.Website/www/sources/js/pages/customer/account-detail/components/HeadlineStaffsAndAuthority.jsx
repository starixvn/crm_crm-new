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
            showAddTool: false
        };
    }

    async componentDidMount() {
        await this.props.getHeadlineStaffsAndAuthority({ headlineID: this.props.customerInfo.custId });
        await this.props.getStaffAndAuthority();
        this.getHeadlineStaffsAndAuthorityInfo(this.props.headlineStaffsAndAuthority);
    }

    getHeadlineStaffsAndAuthorityInfo = value => {
        let headlineStaffsAndAuthority = [];
        value.map(staff => {
            let communicationTools = [];
            value.map(com => {
                if (staff.picID === com.picID) {
                    communicationTools.push({
                        picCommuniationID: com.picCommuniationID,
                        picCommuniationName: com.picCommuniationName,
                        picCommunicationValue: com.picCommunicationValue,
                        authorityID: com.authorityID,
                        authority: com.authority,
                        remark: com.remark,
                        isSyncFromPicTable: com.isSyncFromPicTable,
                        createdDate: com.createdDate
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
                    communicationTools: communicationTools
                });
            }
        });
        this.setState({ headlineStaffsAndAuthority: headlineStaffsAndAuthority });
    }  

    render() {
        const { headlineStaffsAndAuthority } = this.state;
        const { settingStaffAndAuthority } = this.props;

        if (!settingStaffAndAuthority || !headlineStaffsAndAuthority) {
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
            </>
        );
    }

    handleAddStaffAuthor = () => {
        this.setState({ showAddStaffAuthor: true });
    };

    handleAddTool = () => {
        this.setState({ showAddTool: true });
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
                    {headlineStaffsAndAuthority.map(item => this.renderRow(item))}
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

    addNewRow = () => {
        const { showAddTool } = this.state;
        return(
            <>
                <Row className='row-add'>
                    <Cell rowSpan={2}>
                        <Form.Control type="text"  name="" value={null} autoComplete="off"/>
                    </Cell>
                    <Cell rowSpan={2}>
                        <Form.Control type="text"  name="" value={null} autoComplete="off"/>
                    </Cell>
                    <Cell>
                        <div className='col-add'>
                            <Form.Control className='select-item' type="text"  name="" value={null} autoComplete="off"/>
                            {
                                showAddTool && 
                                <div className='icon icon-delete'></div>
                            }
                            {
                                !showAddTool && 
                                <div className='icon icon-plus' onClick={this.handleAddTool}></div>
                            }
                        </div>
                    </Cell>
                    <Cell>
                        <Form.Control type="text"  name="" value={null} autoComplete="off"/>
                    </Cell>
                    <Cell>
                        <Form.Control type="text"  name="" value={null} autoComplete="off"/>
                    </Cell>
                    <Cell>
                        <Form.Control type="text"  name="" value={null} autoComplete="off"/>
                    </Cell>
                    <Cell rowSpan={2}>
                        <div className='row-icon'>
                            <div className='icon icon-save'></div>
                            <div className='icon icon-cancel'></div>
                        </div>
                    </Cell>
                </Row>
                { showAddTool  && this.addTool()}
            </>
        );
    }

    addTool = () => {
        return(
            <Row class="row-add">
                <Cell>
                <div className='col-add'>
                    <Form.Control className='select-item' type="text"  name="" value={null} autoComplete="off"/>
                    <div className='icon icon-delete'></div>
                    <div className='icon icon-plus' onClick={this.handleAddTool}></div>
                </div>
                </Cell>
                <Cell>
                    <Form.Control type="text"  name="" value={null} autoComplete="off"/>
                </Cell>
                <Cell>
                    <Form.Control type="text"  name="" value={null} autoComplete="off"/>
                </Cell>
                <Cell>
                    <Form.Control type="text"  name="" value={null} autoComplete="off"/>
                </Cell>
            </Row>
        );
    }

    renderRow = (item) => {
        return (
            <>
                <Row key={item.id} className='row-staff-authority'>
                    <Cell rowSpan={3}>{item.picName}</Cell>
                    <Cell rowSpan={3} className='text-center'>{item.picRoleName}</Cell>

                    <Cell>{item.offer}</Cell>
                    <Cell>{item.offer}</Cell>
                    <Cell>{item.offer}</Cell>
                    <Cell>{item.offer}</Cell>

                    <Cell rowSpan={3}>
                        <div className='row-icon'>
                            <div className='icon icon-edit'></div>
                            <div className='icon icon-clear'></div>
                        </div>
                    </Cell>
                </Row>
                <Row className='row-staff-authority row-child'>
                    <Cell>{item.offer}</Cell>
                    <Cell>{item.offer}</Cell>
                    <Cell>{item.offer}</Cell>
                    <Cell>{item.offer}</Cell>
                </Row>
                <Row className='row-staff-authority row-child'>
                    <Cell>{item.offer}</Cell>
                    <Cell>{item.offer}</Cell>
                    <Cell>{item.offer}</Cell>
                    <Cell>{item.offer}</Cell>
                </Row>
            </>
        );
    };
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { allSettings, customerInfo, headlineStaffsAndAuthority, getHeadlineStaffsAndAuthority, getStaffAndAuthority, settingStaffAndAuthority } = state;
    return { allSettings, customerInfo, headlineStaffsAndAuthority, getHeadlineStaffsAndAuthority, getStaffAndAuthority, settingStaffAndAuthority };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeadlineStaffsAndAuthority);