import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import LangHelper from '@jsroot/common/langHelper';
import DateTimeService from '@jsroot/common/dateTimeService';
import Site from '@jsroot/common/site';
import WithNavigation from '@jsroot/components/WithNavigation';
export class LastRemarkDataGrid extends Component {
    async componentDidMount() {
        const param = { custId: this.props.custId };
        await this.props.getLastRemark(param);
    }

    async componentDidUpdate(prevProps, prevState) {
        if (this.props.custId !== prevProps.custId) {
            await this.props.getLastRemark({ custId: this.props.custId });
        }
    }

    buildHeader = () => {
        return (
            <HeaderRow>
                <HeaderCell colWidth={5}>{LangHelper.getResource('ID')}</HeaderCell>
                <HeaderCell colWidth={15}>{LangHelper.getResource('RemarkTitle')}</HeaderCell>
                <HeaderCell colWidth={45}>{LangHelper.getResource('RemarkContent')}</HeaderCell>
                <HeaderCell colWidth={8}>{LangHelper.getResource('CreatedDateGM8')}</HeaderCell>
                <HeaderCell colWidth={8}>{LangHelper.getResource('Creator')}</HeaderCell>
                <HeaderCell colWidth={10}>{LangHelper.getResource('LoggedOn')}</HeaderCell>
            </HeaderRow>
        );
    };

    buildBody = () => {
        if (this.props.lastRemark.length > 0) {
            return this.props.lastRemark.map((item, index) => this.renderRow(item, index));
        }

        return [<Row key='new-remark-body' className="no-data" ><Cell colSpan={6}>{LangHelper.getResource('ThereIsNoData')}</Cell></Row>];
    };

    renderRow = (item, index) => {
        const userNameFormat = `${item.isGroupHeadLine ? item.userName + ' (Headline)' : item.userName}`;
        return (
            <Row key={index}>
                <Cell className='text-center'>{item.remarkID}</Cell>
                <Cell>{item.remarkName}</Cell>
                <Cell className='remark-content'
                    dangerouslySetInnerHTML={{ __html: item.remark }}
                />
                <Cell className='text-center'>{DateTimeService.toLongDateTimeFormat(item.createdDate)}</Cell>
                <Cell>{item.creator}</Cell>
                <Cell>{userNameFormat}</Cell>
            </Row>
        );
    };

    handleViewNewRemark = event => {
        event.preventDefault();
        this.props.navigate(Site.resolveClientUrl('Remark'),
            { state: this.props.currentCustomer }
        );
    };

    render() {
        const { lastRemark } = this.props;
        if (!lastRemark) {
            return null;
        }
        return (
            <div className="table-last-remarks mb-3">
                <div className='table-title-v2 d-flex justify-content-between align-items-center'>
                    <span>{LangHelper.getResource('LastRemark')}</span>
                    <u onClick={this.handleViewNewRemark}>{LangHelper.getResource('ViewAllRemarks')}</u>
                </div>
                <Table
                    minWidth={960}
                    width={document.getElementById('right-row-container').clientWidth}
                    autoWidth
                    header={this.buildHeader()}
                    body={this.buildBody()}
                    adjustedHeight={10}
                />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const {
        lastRemark
    } = state;
    return {
        lastRemark
    };
};

const FunctionBarWithNavigation = WithNavigation(LastRemarkDataGrid);
export default connect(mapStateToProps, mapDispatchToProps)(FunctionBarWithNavigation);