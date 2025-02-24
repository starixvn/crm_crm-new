import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import LangHelper from '@jsroot/common/langHelper';
import { MaximumDisplayRelatedCustomer } from '@jsroot/common/constants';

export class RelatedCustomerGrid extends Component {
    static defaultProps = {
        relatedCustomerResults: []
    };

    constructor(props) {
        super(props);

        this.state = {
            pageIndex: 1,
            pageSize: 10
        };
    }

    onPaging = (pageIndex, pageSize) => {
        this.setState({ pageIndex, pageSize });
    };

    buildGridHeader = () => <HeaderRow>
        <HeaderCell colWidth={50}>{LangHelper.getResource('GroupHeadline')}</HeaderCell>
        <HeaderCell colWidth={50}>{LangHelper.getResource('Username')}</HeaderCell>
        <HeaderCell colWidth={100}>{LangHelper.getResource('RelatedCustomer')}</HeaderCell>
    </HeaderRow>;

    buildGridBody = () => {
        const { pageIndex, pageSize } = this.state;

        if (this.props.relatedCustomerResults.length > 0) {
            const rows = [];
            const totalItems = this.props.relatedCustomerResults.length,
                rowIndex = (pageIndex - 1) * pageSize;
            let lastRowIndex = rowIndex + pageSize;
            if (lastRowIndex > totalItems) {
                lastRowIndex = totalItems;
            }

            for (let i = rowIndex; i < lastRowIndex; i++) {
                const item = this.props.relatedCustomerResults[i];
                rows.push(this.renderRow(item));
            }

            return rows;
        }

        return [<Row key={`body${1}`} className="no-data"><Cell colSpan="3">{LangHelper.getResource('ThereIsNoData')}</Cell></Row>];
    };

    handleOpenViewRelatedCustomerDialog = relatedCustomers => {
        this.props.setViewRelatedCustomerDialog({ show: true, relatedCustomers });
    };

    renderRelatedCustomerColumn = customer => {
        let html = '';
        const totalItems = customer.relatedCustomers.length;
        if (totalItems > MaximumDisplayRelatedCustomer) {
            html = <a onClick={() => this.handleOpenViewRelatedCustomerDialog(customer.relatedCustomers)}>
                {totalItems} customers
            </a>;
        } else {
            html = <span>{customer.relatedCustomers.map(item => item.username).join(', ')}</span>;
        }

        return html;
    };

    renderRow = customer => <Row key={customer.headlineId}>
        <Cell>{customer.headlineId > 0 ? customer.headline : 'Not assign group'}</Cell>
        <Cell>{customer.username}</Cell>
        <Cell>{this.renderRelatedCustomerColumn(customer)}</Cell>
    </Row>;

    render() {
        const pagingOption = {
            PageIndex: this.state.pageIndex,
            PageSize: this.state.pageSize,
            TotalItem: this.props.relatedCustomerResults.length,
            PageList: [10, 20, 50]
        };

        return (
            <Fragment>
                <div className='table-title-v2'>List of related customers</div>
                <Table
                    width={772}
                    maxWidth={772}
                    autoWidth={false}
                    shouldUseMaxWidth
                    maxHeight={300}
                    header={this.buildGridHeader()}
                    body={this.buildGridBody()}
                    isPaging
                    pageOption={pagingOption}
                    onPaging={this.onPaging}
                    containerPadding={0}
                    adjustedHeight={10}
                />
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { relatedCustomerResults } = state;
    return { relatedCustomerResults };
};

export default connect(mapStateToProps, mapDispatchToProps)(RelatedCustomerGrid);