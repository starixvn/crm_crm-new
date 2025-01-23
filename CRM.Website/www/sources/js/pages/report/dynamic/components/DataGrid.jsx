import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import LangHelper from '@jsroot/common/langHelper';
import DateTimeService from '@jsroot/common/dateTimeService';
import { MEDIUM_PAGING_SIZES } from '@jsroot/common/constants';

export class DataGrid extends Component {

    constructor(props){
        super(props);

        this.state = {
            shouldResetScrollPosition: true,
            toggles: [],
            isExpand: false
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.dynamicReports !== nextProps.dynamicReports) {
            nextState.shouldResetScrollPosition = true;
            nextState.toggles = [];
            nextState.isExpand = false;
        }
        if (this.state.toggles.length > 0) {
            nextState.shouldResetScrollPosition = false;
        }
        return true;
    }

    buildHeader = () => {
        return (
            <HeaderRow>
                <HeaderCell colWidth={10}>#</HeaderCell>
                <HeaderCell colWidth={16}>{LangHelper.getResource('RunningNo')}</HeaderCell>
                <HeaderCell colWidth={25}>{LangHelper.getResource('FeedbackDate')}</HeaderCell>
                <HeaderCell colWidth={45}>{LangHelper.getResource('MainCategoryAndSubCategory')}</HeaderCell>
                <HeaderCell colWidth={41}>{LangHelper.getResource('Subject')}</HeaderCell>
                <HeaderCell colWidth={20}>{LangHelper.getResource('Status')}</HeaderCell>
                <HeaderCell colWidth={15}>{LangHelper.getResource('Duration')}</HeaderCell>
                <HeaderCell colWidth={20}>{LangHelper.getResource('Username')}</HeaderCell>
                <HeaderCell colWidth={20}>{LangHelper.getResource('Handler')}</HeaderCell>
                <HeaderCell colWidth={20}>{LangHelper.getResource('Reviewer')}</HeaderCell>
            </HeaderRow>
        );
    };

    buildBody = () => {
        const { dynamicReports, gridParams } = this.props;
        const { pageIndex, pageSize } = gridParams;
        const keyToggle = pageSize * (pageIndex -1);


        if (dynamicReports.data.childReports.length > 0) {
            return dynamicReports.data.childReports.map((item, index) => this.renderGroupRow(item, index, keyToggle));
        }
        return [
            <Row key={`body${1}`} className="no-data" >
                <Cell className="text-center" colSpan={10}>{LangHelper.getResource('ThereIsNoData')}</Cell>
            </Row>
        ];
    };

    renderGroupRow = (group,index, keyToggle) => {
        const keyToggleRow = keyToggle + index + 1;
        return (
            <React.Fragment key={keyToggleRow}>
                <Row>
                    <Cell colSpan={10} className="group-collapse-expand" onClick={() => this.handleToggleEach(keyToggleRow)}>
                        <span className={`pr-2 fa ${this.state.toggles.includes(keyToggleRow) ? 'fa-caret-right' : 'fa-caret-down'}`}/>
                        <span>{keyToggleRow}</span>
                    </Cell>
                </Row>
                {
                    group.childReports.map((item, index) => this.renderRow(item, index, keyToggleRow, keyToggle))
                }
            </React.Fragment>
        );
    };

    renderRow = (item, index, keyToggleRow, keyToggle) => {
        if (this.state.toggles.includes(keyToggleRow)) {
            return null;
        }
        const colorRow = item.status ? item.status.toLowerCase().replace(/\s/g, '') : '';
        return (
            <Row key={index} className={colorRow}>
                <Cell>{keyToggle + index + 1}</Cell>
                <Cell className='link-click' onClick={() => this.handleViewCommunication(item.feedbackId)}>{item.feedbackId}</Cell>
                <Cell className="text-center">{DateTimeService.toShortDateTimeFormat(item.feedbackDate)}</Cell>
                <Cell>{this.renderCategoryColumn(item.feedbackId)}</Cell>
                <Cell>{item.subject}</Cell>
                <Cell className="text-center">{item.status}</Cell>
                <Cell className="text-center">{item.duration.replace(/\s+/g, '')}</Cell>
                <Cell>{item.userName}</Cell>
                <Cell>{item.handledBy}</Cell>
                <Cell>{item.reviewedBy}</Cell>
            </Row>
        );
    };

    handleViewCommunication = feedbackId => {
        this.props.setViewCommunicationDialog({ show: true, feedbackId: feedbackId });
    };

    handleToggleEach = key => {
        const { toggles } = this.state;
        const index = toggles.indexOf(key);
        if (index >= 0) {
            toggles.splice(index, 1);
        } else {
            toggles.push(key);
        }
        this.setState({ toggles });
    };

    checkIsExpand = isExpand => {
        if(isExpand){
            return false;
        }
        return true;
    };

    handleToggleAll = () => {
        const { isExpand } = this.state;
        const { gridParams } = this.props;
        const { pageIndex, pageSize } = gridParams;
        const keyToggle = pageSize * (pageIndex -1);
        const allItem = [];
        if (isExpand) {
            this.setState({ toggles: [], isExpand: this.checkIsExpand(isExpand) });
        } else {
            for(let i = 0; i < this.props.dynamicReports.data.childReports.length; i++) {
                allItem.push(keyToggle + i + 1);
            }
            this.setState({ toggles: allItem, isExpand: this.checkIsExpand(isExpand)});
        }
    };

    handleGroupCategory = (dynamicSettings, feedbackId) => {
        const filterCategory = dynamicSettings.filter(x=> x.feedbackId === feedbackId);
        const groupCategory = filterCategory.reduce((accumulator, currentValue) => {
            const itemExist = accumulator.find(item => currentValue.mainCategoryId === item.mainCategoryId);
            if(itemExist){
                itemExist.subCategoryId = [...itemExist.subCategoryId, currentValue.subCategoryId];
            }else{
                accumulator.push({mainCategoryId: currentValue.mainCategoryId, subCategoryId: [currentValue.subCategoryId]});
            }
            return accumulator;
        },[]);
        return groupCategory;
    };

    renderCategoryColumn = feedbackId => {
        const { mainCategories, data } = this.props.dynamicReports;
        const dynamicSettings = data.dynamicSettings;
        const groupCategory = this.handleGroupCategory(dynamicSettings, feedbackId);
        return groupCategory.map((value,key) => {
            const filterMainCategory = mainCategories.find(element => element.settingId === value.mainCategoryId);
            return (
                <React.Fragment key={`main-${key}`}>
                    <div className="font-weight-bold">{filterMainCategory.settingValue}</div>
                    {
                        value.subCategoryId.map((subId,index) => {
                            const filterSubCategory = filterMainCategory.childSettings.find(element => element.subCategoryId === subId);
                            return(
                                <div key={`sub-${index}`} className="font-italic ml-3">{filterSubCategory ? filterSubCategory.name : 'N/A'}</div>
                            );
                        })
                    }
                </React.Fragment>
            );
        });
    };

    renderToolBox = () => {
        return (
            <div>
                <OverlayTrigger
                    placement="auto"
                    overlay={
                        <Tooltip><span>View Chart</span></Tooltip>
                    }
                >
                    <span className="fa fa-bar-chart pl-3 icon" onClick={this.handleViewChart}/>
                </OverlayTrigger>
                <OverlayTrigger
                    placement="auto"
                    overlay={
                        <Tooltip><span>Collapse/Expand</span></Tooltip>
                    }
                >
                    <span className={`${this.state.isExpand ? 'fa fa-compress' : 'fa fa-expand'} pl-3 icon`} onClick={this.handleToggleAll}/>
                </OverlayTrigger>
                <OverlayTrigger
                    placement="auto"
                    overlay={
                        <Tooltip><span>Export to Excel</span></Tooltip>
                    }
                >
                    <span className="fa fa-file-excel-o pl-3 icon-excel" onClick={this.handleExportExcel}/>
                </OverlayTrigger>
            </div>
        );
    };

    renderGenerateTitle = () => {
        const { reportType, fromDate, toDate } = this.props.gridParams;
        const { dynamicReports } = this.props;
        let reportTitle = '';

        switch (reportType) {
            case 1:
                reportTitle = 'Daily Communication Logs';
                break;
            case 2:
                reportTitle = 'Weekly Communication Logs';
                break;
            case 3:
                reportTitle = 'Monthly Communication Logs';
                break;
            case 4:
                reportTitle = 'Yearly Communication Logs';
                break;
            default:
                break;
        }

        return <span>{`${reportTitle} From ${fromDate} To ${toDate} [${dynamicReports.data.totalChildReports}]`}</span>;
    };

    handleExportExcel = () => {
        const params = this.props.gridParams;
        this.props.exportExcel(params);
    };

    handleViewChart = async () => {
        this.props.setViewChartDialog({ show: true, chartInfo: this.props.dynamicReports.data.chartInfo });
    };

    onPaging = (pageIndex, pageSize) => {
        const params = { ...this.props.gridParams };
        params['pageSize'] = pageSize;
        params['pageIndex'] = pageIndex;

        this.setState({ toggles: [], isExpand: true });
        this.props.setGridParams(params);
        this.props.getDynamicReports({...params, pageIndex: params.pageIndex - 1});
    };

    render() {
        const { dynamicReports, gridParams } = this.props;
        if(!dynamicReports || !dynamicReports.data){
            return null;
        }

        const { pageIndex, pageSize } = gridParams;
        const pagingOption = {
            PageIndex: pageIndex,
            PageSize: pageSize,
            TotalItem: dynamicReports.data.totalChildReports,
            PageList: MEDIUM_PAGING_SIZES
        };
        return (
            <div>
                <div className="table-title-v2 d-flex justify-content-between align-items-center">
                    { this.renderGenerateTitle() }
                    { dynamicReports.data.childReports.length > 0 && this.renderToolBox() }
                </div>
                <Table
                    //width={1200}
                    autoWidth
                    header={this.buildHeader()}
                    body={this.buildBody()}
                    containerPadding={0}
                    adjustedHeight={10}
                    isPaging
                    pageOption={pagingOption}
                    onPaging={this.onPaging}
                    shouldResetScrollPosition={this.state.shouldResetScrollPosition}
                />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { dynamicReports, gridParams } = state;
    return { dynamicReports, gridParams };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);