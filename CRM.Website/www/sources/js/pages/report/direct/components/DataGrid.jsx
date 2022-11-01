import React, { Component, Fragment } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import LangHelper from '@jsroot/common/langHelper';
import { PAGING_SIZES } from '@jsroot/common/constants';

export class DataGrid extends Component {
    constructor(props) {
        super(props);
    }

    buildHeader = () => {
        return (
            <HeaderRow>
                <HeaderCell colWidth={30}>{LangHelper.getResource('RowNum')}</HeaderCell>
                <HeaderCell colWidth={80}>{LangHelper.getResource('GroupHeadline')}</HeaderCell>
                <HeaderCell colWidth={70}>{LangHelper.getResource('Username')}</HeaderCell>
                <HeaderCell colWidth={55}>{LangHelper.getResource('Status')}</HeaderCell>
                <HeaderCell colWidth={70}>{LangHelper.getResource('Site')}</HeaderCell>
                <HeaderCell colWidth={60}>{LangHelper.getResource('Currency')}</HeaderCell>
                <HeaderCell colWidth={60}>{LangHelper.getResource('Position')}</HeaderCell>
                <HeaderCell colWidth={80}>{LangHelper.getResource('IntroduceBy')}</HeaderCell>
                <HeaderCell colWidth={80}>{LangHelper.getResource('Languages')}</HeaderCell>
                <HeaderCell colWidth={60}>{LangHelper.getResource('Country')}</HeaderCell>
                <HeaderCell colWidth={60}>{LangHelper.getResource('Checker')}</HeaderCell>
                <HeaderCell colWidth={50}>{LangHelper.getResource('VIP')}</HeaderCell>
                <HeaderCell colWidth={100}>{LangHelper.getResource('FirstName')}</HeaderCell>
                <HeaderCell colWidth={100}>{LangHelper.getResource('LastName')}</HeaderCell>
                <HeaderCell colWidth={70}>{LangHelper.getResource('Phone1')}</HeaderCell>
                <HeaderCell colWidth={70}>{LangHelper.getResource('Phone2')}</HeaderCell>
                <HeaderCell colWidth={70}>{LangHelper.getResource('Phone3')}</HeaderCell>
                <HeaderCell colWidth={120}>{LangHelper.getResource('PIC1')}</HeaderCell>
                <HeaderCell colWidth={120}>{LangHelper.getResource('PIC2')}</HeaderCell>
                <HeaderCell colWidth={120}>{LangHelper.getResource('PIC3')}</HeaderCell>
                <HeaderCell colWidth={120}>{LangHelper.getResource('PIC4')}</HeaderCell>
                <HeaderCell colWidth={60}>{LangHelper.getResource('Mobile')}</HeaderCell>
                <HeaderCell colWidth={70}>{LangHelper.getResource('Email')}</HeaderCell>
                <HeaderCell colWidth={70}>{LangHelper.getResource('Skype')}</HeaderCell>
                <HeaderCell colWidth={70}>{LangHelper.getResource('Telegram')}</HeaderCell>
                <HeaderCell colWidth={70}>{LangHelper.getResource('WhatsApp')}</HeaderCell>
                <HeaderCell colWidth={70}>{LangHelper.getResource('Line')}</HeaderCell>
                <HeaderCell colWidth={70}>{LangHelper.getResource('WeChat')}</HeaderCell>
                <HeaderCell colWidth={70}>{LangHelper.getResource('Letstalk')}</HeaderCell>
                <HeaderCell colWidth={70}>{LangHelper.getResource('Zalo')}</HeaderCell>
                <HeaderCell colWidth={70}>{LangHelper.getResource('QQ')}</HeaderCell>
            </HeaderRow>
        );
    };

    buildBody = customerList => {
        if (customerList.length > 0) {
            return customerList.map((item, index) => this.renderRows(item, index));
        }
        return [
            <Row key='body-NoData' className="no-data" >
                <Cell className='text-center' colSpan={31}>{LangHelper.getResource('ThereIsNoData')}</Cell>
            </Row>
        ];
    };

    renderRows = (item, index) => {
        return (
            <Row key={item.rowNum}>
                <Cell className='text-center height-row'>{item.rowNum}</Cell>
                <Cell className='text-center'>{item.headline ?? 'not assign group'}</Cell>
                <Cell className='text-center'>{item.username}</Cell>
                <Cell className='text-center'>{item.status}</Cell>
                <Cell className='text-center'>{item.site}</Cell>
                <Cell className='text-center'>{item.currency}</Cell>
                <Cell className='text-center'>{item.position}</Cell>
                <Cell className='text-center'>{item.introducedBy}</Cell>
                <Cell className='text-center'>{item.language_name}</Cell>
                <Cell className='text-center'>{item.countryName}</Cell>
                <Cell className='text-center'>{item.checker}</Cell>
                <Cell className='text-center'>{item.isVIP ? <i class="fa fa-check icon-check" aria-hidden="true"></i> : ''}</Cell>
                <Cell className='text-center'>{item.firstName}</Cell>
                <Cell className='text-center'>{item.lastName}</Cell>
                <Cell className='text-center'>{item.phone}</Cell>
                <Cell className='text-center'>{item.phone2}</Cell>
                <Cell className='text-center'>{item.phone3}</Cell>
                <Cell className='text-center'>{item.piC1}</Cell>
                <Cell className='text-center'>{item.piC2}</Cell>
                <Cell className='text-center'>{item.piC3}</Cell>
                <Cell className='text-center'>{item.piC4}</Cell>
                <Cell className='text-center'>{item.mobilePhone}</Cell>
                <Cell className='text-center'>{item.email}</Cell>
                <Cell className='text-center'>{item.skype}</Cell>
                <Cell className='text-center'>{item.msn}</Cell>
                <Cell className='text-center'>{item.whatsApp}</Cell>
                <Cell className='text-center'>{item.line}</Cell>
                <Cell className='text-center'>{item.weChat}</Cell>
                <Cell className='text-center'>{item.yahoo}</Cell>
                <Cell className='text-center'>{item.bbm}</Cell>
                <Cell className='text-center'>{item.qq}</Cell>
            </Row>
        );
    };

    onPagingDirect = (pageIndex, pageSize) => {
        const params = { ...this.props.gridParams };
        params['pageIndex'] = pageIndex;
        params['pageSize'] = pageSize;
        this.props.setGridParams(params);
        this.props.getGridData(params);
    };

    handleExportExcel = () => {
        const { totalCustomer } = this.props.gridData;
        const { excludeIgnoredAcc, username, headline } = this.props.gridParams;
        const params = { excludeIgnoredAcc, username, headline, pageSize: totalCustomer, pageIndex: 1 };
        this.props.exportExcel(params);
    };

    renderCustomButtonReport = () => {
        return (
            <div className='table-title'>
                <OverlayTrigger
                    overlay={
                        <Tooltip><span>Export to Excel</span></Tooltip>
                    }
                    placement="auto"
                >
                    <span className="fa fa-file-excel-o icon-excel pl-3" onClick={() => this.handleExportExcel()} />
                </OverlayTrigger>
            </div>
        );
    };

    render() {
        if (!this.props.gridData || !this.props.gridData.customerList) {
            return null;
        }
        const { totalCustomer, customerList } = this.props.gridData;
        const { pageIndex, pageSize } = this.props.gridParams;

        const pagingOption = {
            PageIndex: pageIndex,
            PageSize: pageSize,
            TotalItem: totalCustomer,
            PageList: PAGING_SIZES
        };

        return (
            <Fragment>
                {
                    customerList.length > 0 && this.renderCustomButtonReport()
                }
                <Table
                    maxWidth={4300}
                    shouldUseMaxWidth
                    width={document.getElementById('right-row-container').clientWidth}
                    autoWidth={false}
                    header={this.buildHeader()}
                    body={this.buildBody(customerList)}
                    isPaging
                    pageOption={pagingOption}
                    onPaging={this.onPagingDirect}
                    containerPadding={0}
                    adjustedHeight={10}
                />
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { gridParams, gridData } = state;
    return { gridParams, gridData };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);