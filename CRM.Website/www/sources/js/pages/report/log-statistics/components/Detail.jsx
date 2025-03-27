import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import LangHelper from '@jsroot/common/langHelper';
import { ActionCreators } from '../actions';
import DateTimeService from '@jsroot/common/dateTimeService';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import { PAGING_SIZES, Policy, FunctionKey } from '@jsroot/common/constants';
import { getPermission } from '@jsroot/common/shareScripts';
export class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headlineInfoPolicy: null
        };
    }

    async componentDidMount() {
        getPermission(FunctionKey.HeadlineInfo, true).then(response => {
            this.setState({ headlineInfoPolicy: response });
        });
    }

    buildHeader = () => {
        return (
            <HeaderRow>
                <HeaderCell colWidth={12}>{LangHelper.getResource('Date')}</HeaderCell>
                <HeaderCell colWidth={10}>{LangHelper.getResource('StartTime')}</HeaderCell>
                <HeaderCell colWidth={10}>{LangHelper.getResource('EndTime')}</HeaderCell>
                <HeaderCell colWidth={10}>{LangHelper.getResource('Duration')}</HeaderCell>
                <HeaderCell colWidth={16}>{LangHelper.getResource('FirstResponseTime')}</HeaderCell>
                <HeaderCell colWidth={16}>{LangHelper.getResource('DurationResponseTime')}</HeaderCell>
                <HeaderCell colWidth={18}>{LangHelper.getResource('Customer')}</HeaderCell>
                <HeaderCell colWidth={12}>{LangHelper.getResource('Site')}</HeaderCell>
                <HeaderCell colWidth={15}>{LangHelper.getResource('TypeOfContact')}</HeaderCell>
                <HeaderCell colWidth={10}>{LangHelper.getResource('EXT')}</HeaderCell>
                <HeaderCell colWidth={10}>{LangHelper.getResource('Role')}</HeaderCell>
                <HeaderCell colWidth={20}>{LangHelper.getResource('ContactInfo')}</HeaderCell>
                <HeaderCell colWidth={20}>{LangHelper.getResource('Product')}</HeaderCell>
                <HeaderCell colWidth={20}>{LangHelper.getResource('SubProduct')}</HeaderCell>
                <HeaderCell colWidth={12}>{LangHelper.getResource('Country')}</HeaderCell>
                <HeaderCell colWidth={20}>{LangHelper.getResource('Category')}</HeaderCell>
                <HeaderCell colWidth={20}>{LangHelper.getResource('SubCategory')}</HeaderCell>
                <HeaderCell colWidth={30}>{LangHelper.getResource('ComplaintsEnquiries')}</HeaderCell>
                <HeaderCell colWidth={30}>{LangHelper.getResource('Solution')}</HeaderCell>
                <HeaderCell colWidth={10}>{LangHelper.getResource('NoOfInquiries')}</HeaderCell>
                <HeaderCell colWidth={10}>{LangHelper.getResource('Rating')}</HeaderCell>
                <HeaderCell colWidth={10}>{LangHelper.getResource('Status')}</HeaderCell>
                <HeaderCell colWidth={10}>{LangHelper.getResource('Language')}</HeaderCell>
                <HeaderCell colWidth={10}>{LangHelper.getResource('Response')}</HeaderCell>
                <HeaderCell colWidth={12}>{LangHelper.getResource('HandleBy')}</HeaderCell>
                <HeaderCell colWidth={12}>{LangHelper.getResource('CreationTime')}</HeaderCell>
            </HeaderRow>
        );
    };

    buildBody = () => {
        const { reportDetails } = this.props;
        if (reportDetails.report.length > 0) {
            return reportDetails.report.map((item, index) => this.renderRow(item, index));
        }
        return [
            <Row key='body-nodata' className="no-data" >
                <Cell className='text-center' colSpan={15}>{LangHelper.getResource('ThereIsNoData')}</Cell>
            </Row>
        ];
    };

    getActiveSettingsName = (settings, settingId, isValueProperty, isMainCategory) =>{
        const filterSettingActive = isMainCategory ?
                                    settings.filter(x=> x.isActive && x.mainCategoryID === settingId) :
                                    settings.filter(x=> x.isActive && x.id === settingId);
        const settingDistinct = filterSettingActive.map(item => isValueProperty ? item.value : item.name).filter((value, index, self) => self.indexOf(value) === index);
        const nameSetting = settingDistinct.length > 0 ? settingDistinct[0] : 'N/A';
        return nameSetting === 'N/A.' ? 'N/A' : nameSetting;
    };

    getSubCategoryValue = (mainCategoryId, subCategoryId, mainCategories) =>{
        const mainCategoriesFilter = mainCategories.filter(x=> x.mainCategoryID === mainCategoryId);
        if(mainCategoriesFilter.length > 0){
            const subCategory = mainCategoriesFilter[0].childSettings.filter(x=> x.subCategoryId === subCategoryId)[0]?.name;
            return subCategory;
        }else{
            return 'N/A';
        }
    };

    renderRow = (item, index) =>{
        const {mainCategories, communicationTools, products, subProducts, extensions} = this.props.reportDetails;
        const mainCategoryValue = this.getActiveSettingsName(mainCategories, parseInt(item.categoryID, 10), false, true);
        const communicationValue = this.getActiveSettingsName(communicationTools, parseInt(item.communicationID, 10));
        const productValue = this.getActiveSettingsName(products, parseInt(item.productID, 10), true);
        const subProductValue = this.getActiveSettingsName(subProducts, parseInt(item.subProductID, 10), true);
        const stationValue = this.getActiveSettingsName(extensions, parseInt(item.stationID, 10), true);
        const subCategoryValue = this.getSubCategoryValue(parseInt(item.categoryID, 10), parseInt(item.subCategoryID, 10), mainCategories);

        return (
            <Row key={`${item.feedbackId}-${index}`}>
                <Cell className='text-center'>{DateTimeService.toShortDateFormat(item.feedbackDate)}</Cell>
                <Cell className='text-center'>{item.startTime}</Cell>
                <Cell className='text-center'>{item.endTime}</Cell>
                <Cell className='text-center'>{item.durationTime}</Cell>
                <Cell className='text-center'>{item.firstResponseFormatTime}</Cell>
                <Cell className='text-center'>{item.durationFirstTime}</Cell>
                <Cell className='text-center'>{item.userName}</Cell>
                <Cell className='text-center'>{item.siteName}</Cell>
                <Cell className='text-center'>{communicationValue}</Cell>
                <Cell className='text-center'>{stationValue}</Cell>
                <Cell className='text-center'>{item.role}</Cell>
                {
                    !item.isNewFeedback && 
                    <Cell className='break-word' dangerouslySetInnerHTML={{ __html: item.contact }} />
                }
                {
                    item.isNewFeedback && item.isHeadline && this.state.headlineInfoPolicy >= Policy.Read &&
                        <Cell className='break-word' dangerouslySetInnerHTML={{ __html: item.newContact }} /> 
                }
                {
                    item.isNewFeedback && item.isHeadline && this.state.headlineInfoPolicy < Policy.Read &&
                    <Cell className='break-word' />
                }
                {
                    item.isNewFeedback && !item.isHeadline &&
                    <Cell className='break-word' dangerouslySetInnerHTML={{ __html: item.newContact }} />
                }
                <Cell className='text-center'>{productValue}</Cell>
                <Cell className='text-center'>{subProductValue}</Cell>
                <Cell className='text-center'>{item.countryName}</Cell>
                <Cell className='text-center'>{mainCategoryValue}</Cell>
                <Cell className='text-center'>{subCategoryValue}</Cell>
                <Cell className='break-word' dangerouslySetInnerHTML={{ __html: item.remarkText }} />
                <Cell className='break-word' dangerouslySetInnerHTML={{ __html: item.solution }} />
                <Cell className='text-center'>{item.noInquiries}</Cell>
                <Cell className='text-center'>{item.rating}</Cell>
                <Cell className='text-center'>{item.status}</Cell>
                <Cell className='text-center'>{item.language}</Cell>
                <Cell className='text-center'>{item.response}</Cell>
                <Cell className='text-center'>{item.creatorName}</Cell>
                <Cell className='text-center'>{DateTimeService.toLongDateTimeFormat(item.createDate)}</Cell>
            </Row>
        );
    };

    handleExportExcel = () =>{
        const params = this.props.gridParamDetails;
        this.props.exportExcelDetails(params);
    };

    handleGoBack = () =>{
        this.props.setDetailsDataGrid({show: false, title: ''});
        this.props.setReportDetails(null);
    };

    onPaging = (pageIndex, pageSize) => {
        const params = { ...this.props.gridParamDetails };
        params['pageIndex'] = pageIndex;
        params['pageSize'] = pageSize;
        this.props.getReportDetails(params);
        this.props.setGridParamDetails(params);
    };

    render() {
        const { details, gridParamDetails, reportDetails } = this.props;
        if (reportDetails === null || !reportDetails) {
            return null;
        }
        const pagingOption = {
            PageIndex: gridParamDetails.pageIndex,
            PageSize: gridParamDetails.pageSize,
            TotalItem: reportDetails.totalRows,
            PageList: PAGING_SIZES
        };

        return (
                <div className='details'>
                    <div className='table-title d-flex justify-content-between align-items-center'>
                    <span>{details.title}</span>
                    <div>
                        <OverlayTrigger
                            overlay={
                                <Tooltip><span>Go Back</span></Tooltip>
                            }
                            placement="auto"
                        >
                            <span className="fa fa-arrow-circle-left icon pl-3 fa-lg" onClick={() => this.handleGoBack()} />
                        </OverlayTrigger>
                        <OverlayTrigger
                            overlay={
                                <Tooltip><span>Export to Excel</span></Tooltip>
                            }
                            placement="auto"
                        >
                            <span className="fa fa-file-excel-o icon-excel pl-3" onClick={this.handleExportExcel} />
                        </OverlayTrigger>
                    </div>
                </div>
                <Table
                    maxWidth={3355}
                    shouldUseMaxWidth
                    autoWidth={false}
                    isFixColumn
                    isPaging
                    pageOption={pagingOption}
                    onPaging={this.onPaging}
                    header={this.buildHeader()}
                    body={this.buildBody()}
                    containerPadding={10}
                    shouldResetScrollPosition={false}
                />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { gridParamDetails, reportDetails, details } = state;
    return { gridParamDetails, reportDetails, details };
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);