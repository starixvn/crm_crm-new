import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import { Form, Button } from 'react-bootstrap';
import LangHelper from '@jsroot/common/langHelper';
import { Table, HeaderRow, HeaderCell, Cell, Row } from '@jsroot/components/react-grid/index';
import Site from '@jsroot/common/site';

export class HeadlineStaffsAndAuthority extends Component {

    state = {
        showAddRow: false 
    };

    render() {
        return (
            <>
                <Button className='btn-add' type="submit" variant="primary" size="sm" onClick={this.handleClickAdd}>
                    {LangHelper.getResource('Add')}
                </Button>
                <Table
                    width={1500}
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

    handleClickAdd = () => {
        this.setState({ showAddRow: true });
    };

    buildHeader = () => {
        return (
            <HeaderRow>
                <HeaderCell colWidth={5}>{LangHelper.getResource('Name')}</HeaderCell>
                <HeaderCell colWidth={3}>{LangHelper.getResource('Role')}</HeaderCell>
                <HeaderCell colspan={2} colWidth={6}>{LangHelper.getResource('CommunicationTool')}</HeaderCell>
                <HeaderCell colWidth={4}>{LangHelper.getResource('Authority')}</HeaderCell>
                <HeaderCell colWidth={8}>{LangHelper.getResource('Remark')}</HeaderCell>
                <HeaderCell colWidth={4}>{LangHelper.getResource('Action')}</HeaderCell>
            </HeaderRow>
        );
    };

    buildBody = () => {
        const { showAddRow } = this.state;
        const data = [
            {
              id: 1,
              name: 'PIC01',
              role: 'Boss',
              offer: 'Letstalk',
              CommTool: 'Tool 1'
            },
            {
              id: 2,
              name: 'PIC01',
              role: 'Boss',
              offer: 'Letstalk',
              CommTool: '+66 222 333 444'
            },
            {
              id: 3,
              name: 'Settlement Issue',
              role: 'PIC',
              offer: 'Phone',
              CommTool: 'All Staff have authority to request'
            }
          ];

        if (data.length > 0) {
            return [
                <Fragment key={'body'}>
                    {data.map(item => this.renderRow(item))}
                    {showAddRow  && this.addNewRow()}
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
        return(
            <Row className='row-add'>
                <Cell>
                    <Form.Control type="text"  name="" value={null} autoComplete="off"/>
                </Cell>
                <Cell>
                    <Form.Control type="text"  name="" value={null} autoComplete="off"/>
                </Cell>
                <Cell>
                    <Form.Control type="text"  name="" value={null} autoComplete="off"/>
                    <span className="fa plus-icon" >+</span>
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
                <Cell>
                    <img src={Site.resolveClientUrl('www/dist/css/images/icon/icon-save.svg')} />
                </Cell>
            </Row>
        );
    }

    renderRow = (item) => {
        return (
            <>
                <Row key={item.id}>
                    <Cell rowSpan={3}>{item.name}</Cell>
                    <Cell rowSpan={3} className='text-center'>{item.role}</Cell>
                    <Cell>{item.offer}</Cell>
                    <Cell>{item.offer}</Cell>
                    <Cell>{item.offer}</Cell>
                    <Cell>{item.offer}</Cell>
                    <Cell rowSpan={3} className='text-center'>
                        <i class="fa fa-pencil" aria-hidden="true"></i>
                        <i class="fa fa-trash-o" aria-hidden="true"></i>
                    </Cell>
                </Row>
                <Row>
                    <Cell>{item.offer}</Cell>
                    <Cell>{item.offer}</Cell>
                    <Cell>{item.offer}</Cell>
                    <Cell>{item.offer}</Cell>
                </Row>
                <Row>
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
    const { allSettings, customerInfo, editCustomerInfoDetailResult } = state;
    return { allSettings, customerInfo, editCustomerInfoDetailResult };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeadlineStaffsAndAuthority);