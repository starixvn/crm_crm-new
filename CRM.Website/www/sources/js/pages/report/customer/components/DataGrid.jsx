import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import ExcelIcon from '@jsroot/components/ExcelIcon';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import LangHelper from '@jsroot/common/langHelper';
import DateTimeService from '@jsroot/common/dateTimeService';
import { PAGING_SIZES } from '@jsroot/common/constants';

export class DataGrid extends Component {

    buildHeader = () => {
        return (
            <HeaderRow>
                <HeaderCell colWidth={40}>{LangHelper.getResource('Headline')}</HeaderCell>
                <HeaderCell colWidth={40}>{LangHelper.getResource('Checker')}</HeaderCell>
                <HeaderCell colWidth={40}>{LangHelper.getResource('Position')}</HeaderCell>
                <HeaderCell colWidth={40}>{LangHelper.getResource('Status')}</HeaderCell>
                <HeaderCell colWidth={40}>{LangHelper.getResource('Username')}</HeaderCell>
                <HeaderCell colWidth={40}>{LangHelper.getResource('FirstName')}</HeaderCell>
                <HeaderCell colWidth={40}>{LangHelper.getResource('LastName')}</HeaderCell>
                <HeaderCell colWidth={40}>{LangHelper.getResource('Phone1')}</HeaderCell>
                <HeaderCell colWidth={40}>{LangHelper.getResource('Phone2')}</HeaderCell>
                <HeaderCell colWidth={40}>{LangHelper.getResource('Phone3')}</HeaderCell>
                <HeaderCell colWidth={40}>{LangHelper.getResource('Mobile')}</HeaderCell>
                <HeaderCell colWidth={40}>{LangHelper.getResource('Fax')}</HeaderCell>
                <HeaderCell colWidth={45}>{LangHelper.getResource('Email')}</HeaderCell>
                <HeaderCell colWidth={25}>{LangHelper.getResource('Skype')}</HeaderCell>
                <HeaderCell colWidth={25}>{LangHelper.getResource('Telegram')}</HeaderCell>
                <HeaderCell colWidth={25}>{LangHelper.getResource('WhatsApp')}</HeaderCell>
                <HeaderCell colWidth={25}>{LangHelper.getResource('Line')}</HeaderCell>
                <HeaderCell colWidth={25}>{LangHelper.getResource('WeChat')}</HeaderCell>
                <HeaderCell colWidth={25}>{LangHelper.getResource('Letstalk')}</HeaderCell>
                <HeaderCell colWidth={25}>{LangHelper.getResource('Zalo')}</HeaderCell>
                <HeaderCell colWidth={25}>{LangHelper.getResource('QQ')}</HeaderCell>
                <HeaderCell colWidth={45}>{LangHelper.getResource('Languages')}</HeaderCell>
                <HeaderCell colWidth={15}>{LangHelper.getResource('VIP')}</HeaderCell>
                <HeaderCell colWidth={40}>{LangHelper.getResource('PIC1')}</HeaderCell>
                <HeaderCell colWidth={40}>{LangHelper.getResource('PIC2')}</HeaderCell>
                <HeaderCell colWidth={40}>{LangHelper.getResource('PIC3')}</HeaderCell>
                <HeaderCell colWidth={40}>{LangHelper.getResource('PIC4')}</HeaderCell>
                <HeaderCell colWidth={30}>{LangHelper.getResource('Birthday')}</HeaderCell>
                <HeaderCell colWidth={40}>{LangHelper.getResource('Passport')}</HeaderCell>
                <HeaderCell colWidth={40}>{LangHelper.getResource('SiteName')}</HeaderCell>
                <HeaderCell colWidth={25}>{LangHelper.getResource('Country')}</HeaderCell>
            </HeaderRow>
        );
    };

    buildBody = () => {
        const { customerReport } = this.props;

        if (customerReport.customerList.length > 0) {
            return customerReport.customerList.map((item, index) => this.renderRow(item, index));
        }
        return [
            <Row key={`body${1}`} className="no-data" >
                <Cell className="text-center" colSpan={31}>{LangHelper.getResource('ThereIsNoData')}</Cell>
            </Row>
        ];
    };

    renderRow = (item, index) => {
        return (
            <Row key={index}>
                <Cell>{item.headline}</Cell>
                <Cell className='text-center'>{item.checker}</Cell>
                <Cell className='text-center'>{item.position}</Cell>
                <Cell className='text-center'>{item.status}</Cell>
                <Cell>{item.username}</Cell>
                <Cell>{item.firstName}</Cell>
                <Cell>{item.lastName}</Cell>
                <Cell>{item.phone1}</Cell>
                <Cell>{item.phone2}</Cell>
                <Cell>{item.phone3}</Cell>
                <Cell>{item.mobile}</Cell>
                <Cell>{item.fax}</Cell>
                <Cell>{item.email}</Cell>
                <Cell>{item.skype}</Cell>
                <Cell>{item.msn}</Cell>
                <Cell>{item.whatsApp}</Cell>
                <Cell>{item.line}</Cell>
                <Cell>{item.weChat}</Cell>
                <Cell>{item.yahoo}</Cell>
                <Cell>{item.bbm}</Cell>
                <Cell>{item.qq}</Cell>
                <Cell>{item.language}</Cell>
                <Cell className='text-center'>
                    {
                        item.isVIP && <i class="fa fa-check icon-check" aria-hidden="true"></i>
                    }
                </Cell>
                <Cell>{item.pic1}</Cell>
                <Cell>{item.pic2}</Cell>
                <Cell>{item.pic3}</Cell>
                <Cell>{item.pic4}</Cell>
                <Cell className='text-center'>{item.birthDay && DateTimeService.toShortDateFormat(item.birthDay)}</Cell>
                <Cell>{item.passport}</Cell>
                <Cell>{item.siteName}</Cell>
                <Cell>{item.countryName}</Cell>
            </Row>
        );
    };

    handleExportExcel = () => {
        const params = { ...this.props.gridParams };
        params['pageIndex'] = 0;
        params['pageSize'] = 0;
        this.props.exportExcel(params);
    };

    onPaging = (pageIndex, pageSize) => {
        const params = { ...this.props.gridParams };
        params['pageSize'] = pageSize;
        params['pageIndex'] = pageIndex;

        this.props.setGridParams(params);
        this.props.getCustomerReport(params);
    };

    render() {
        const { customerReport, gridParams } = this.props;
        if (!customerReport) {
            return null;
        }

        const { pageIndex, pageSize } = gridParams;
        const pagingOption = {
            PageIndex: pageIndex,
            PageSize: pageSize,
            TotalItem: customerReport.totalCustomer,
            PageList: PAGING_SIZES
        };

        return (
            <Fragment>
                <div className="table-title d-flex justify-content-between align-items-center">
                    <span>{LangHelper.getResource('CustomerReport')}</span>
                    {
                        customerReport && <ExcelIcon handleExportExcel={this.handleExportExcel}/>
                    }
                </div>
                <Table
                    maxWidth={3800}
                    shouldUseMaxWidth
                    autoWidth={false}
                    header={this.buildHeader()}
                    body={this.buildBody()}
                    containerPadding={0}
                    adjustedHeight={10}
                    pageOption={pagingOption}
                    isPaging
                    onPaging={this.onPaging}
                />
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { customerReport, gridParams } = state;
    return { customerReport, gridParams };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);