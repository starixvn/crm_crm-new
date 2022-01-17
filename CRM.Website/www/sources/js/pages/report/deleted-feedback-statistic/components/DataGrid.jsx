import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { OverlayTrigger, Tooltip, Collapse } from 'react-bootstrap';
import { ActionCreators } from '../actions';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import LangHelper from '@jsroot/common/langHelper';
import DateTimeService from '@jsroot/common/dateTimeService';
import { MaximumDisplayRelatedCustomer } from '@jsroot/common/constants';

export class DataGrid extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCollapse: false
        };
    }

    buildHeader = () => {
        return (
            <HeaderRow>
                <HeaderCell colWidth={15}>{LangHelper.getResource('Date')}</HeaderCell>
                <HeaderCell colWidth={12}>{LangHelper.getResource('Handler')}</HeaderCell>
                <HeaderCell colWidth={12}>{LangHelper.getResource('DeletedBy')}</HeaderCell>
                <HeaderCell colWidth={35}>{LangHelper.getResource('Feedback')}</HeaderCell>
                <HeaderCell colWidth={30}>{LangHelper.getResource('Category')}</HeaderCell>
                <HeaderCell colWidth={20}>{LangHelper.getResource('Customer')}</HeaderCell>
                <HeaderCell colWidth={20}>{LangHelper.getResource('RelatedCustomer')}</HeaderCell>
            </HeaderRow>
        );
    };

    buildBody = () => {
        const { gridData } = this.props;
        const rows = [];
        if (gridData.data.length > 0) {
            rows.push(gridData.data.map((item, index) => this.renderCollapseRow(item, index)));
            rows.push(this.renderFooter(gridData.data));
            return rows;
        }
        return [
            <Row key={`body${1}`} className="no-data" >
                <Cell className='text-center' colSpan={7}>{LangHelper.getResource('ThereIsNoData')}</Cell>
            </Row>
        ];
    };

    handleGroupCategory = filterCategory => {
        const groupCategory = filterCategory.reduce( (accumulator, currentValue) => {
            const itemExist = accumulator.find(item => currentValue.settingId === item.settingId);
            if(itemExist){
                itemExist.subSettingId = [...itemExist.subSettingId, currentValue.subSettingId];
            }else{
                accumulator.push({settingId: currentValue.settingId, subSettingId: [currentValue.subSettingId]});
            }
            return accumulator;
        },[]);
        return groupCategory;
    };

    renderCategory = item => {
        const { mainCategories } = this.props.gridData;
        const filterCategories = item.settings.filter(element => element.settingType === 'Category');
        const groupCategories = this.handleGroupCategory(filterCategories);

        return groupCategories.map((group,key) => {
            const filterMainCategory = mainCategories.find(element => element.settingId === group.settingId);
            return (
                <>
                    <div key={key} className="font-weight-bold">{filterMainCategory.settingValue}</div>
                    {
                        group.subSettingId.map((subId,index) => {
                            const filterSubCategory = filterMainCategory.childSettings.find(element => element.subCategoryId === subId);
                            return(
                                <div key={index} className="font-italic ml-3">{filterSubCategory.name}</div>
                            );
                        })
                    }
                </>
            );
        });
    };

    renderRelatedCustomer = item => {
        const totalItems = item.length;
        if(totalItems > MaximumDisplayRelatedCustomer){
            return(
                <a href="#" onClick={() => this.handleOpenViewRelatedCustomerDialog(item.join(', '))}>{totalItems} customers</a>
            );
        } else{
            return item.join(', ');
        }
    };

    handleOpenViewRelatedCustomerDialog = relatedCustomers => {
        this.props.setViewRelatedCustomerDialog({ show: true, relatedCustomers });
    };

    handleCollapseExpend = () => {
        this.setState(prevState => ({
            isCollapse: !prevState.isCollapse
        }));
    };

    renderCollapseRow = (item, index) => {
        const rows = [];
        rows.push(
            <Row key={`parent ${index}`} className='parent-level-0'>
                <Cell colSpan='7' onClick={this.handleCollapseExpend}>
                    <span className={`expand-icon fa pr-2 ${!this.state.isCollapse ? 'fa-caret-down' : 'fa-caret-right'}`} />
                    <span className='text-handler font-weight-bold'>{item.handler} ({item.deletedFeedbacks.length})</span>
                </Cell>
            </Row>
        );
        if(item.deletedFeedbacks.length > 0){
            rows.push(item.deletedFeedbacks.map((item, index) => this.renderRow(item, index)));
        }
        return rows;
    }

    renderRow = (item, index) => {
        return (
            <Collapse in={!this.state.isCollapse}>
                <Row key={`child ${index}`} className={`child ${index}`}>
                    <Cell>{DateTimeService.toShortDateFormat(item.createDate)}</Cell>
                    <Cell>{item.handler}</Cell>
                    <Cell>{item.deletor}</Cell>
                    <Cell>
                        <div onClick={() => this.handleEditFeedback(item.feedbackId)}>
                            <strong className='link-click'>{item.subject}</strong>
                        </div>
                    </Cell>
                    <Cell>{this.renderCategory(item)}</Cell>
                    <Cell>{item.customer}</Cell>
                    <Cell>{this.renderRelatedCustomer(item.relatedCustomer.split(','))}</Cell>
                </Row>
            </Collapse>
        );
    };

    renderFooter = data => {
        const totalGrands = data.reduce((accumulator, currentValue) => accumulator + currentValue.deletedFeedbacks.length, 0);
        return (
                <Row key='footer' className='footer-container font-weight-bold'>
                    <Cell colSpan='7'>Grand Total ({totalGrands})</Cell>
                </Row>
        );
    };

    handleExportExcel = () => {
        const { gridParams } = this.props;
        this.props.exportExcel(gridParams);
    };

    handleEditFeedback = id => {
        this.props.setEditFeedbackDialog({ show: true, feedbackId: id });
    };

    renderExportExcelText = () => {
        return (
            <OverlayTrigger
                placement="auto"
                overlay={
                    <Tooltip>
                        <span>Export to Excel</span>
                    </Tooltip>
                }
            >
                <span className="fa fa-file-excel-o icon-excel" onClick={this.handleExportExcel} />
            </OverlayTrigger>
        );
    };

    render() {
        const {gridData} = this.props;
        if(!gridData || !gridData.data){
            return null;
        }

        return (
            <>
                <div className='table-title d-flex justify-content-between align-items-center'>
                    <span>Deleted Feedback Statistics</span>
                    {
                        gridData.data.length > 0 && this.renderExportExcelText()
                    }
                </div>
                <Table
                    width={1200}
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
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { gridParams, gridData } = state;
    return { gridParams, gridData };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);
