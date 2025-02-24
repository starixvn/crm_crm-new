import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { ActionCreators } from '../actions';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import LangHelper from '@jsroot/common/langHelper';
import Tooltip from 'react-bootstrap/Tooltip';
import DateTimeService from '@jsroot/common/dateTimeService';
import { MaximumDisplayRelatedCustomer } from '@jsroot/common/constants';

export class DataGrid extends Component {
    handleExportExcel = () => {
        const { gridParams } = this.props;
        if(!gridParams.custId){
            this.props.exportExcel(gridParams);
        }else{
            this.props.searchByCustExportExcel(gridParams);
        }
    };

    buildHeader = () => {
        return (
            <HeaderRow>
                <HeaderCell colWidth={7}>{LangHelper.getResource('RunningNo')}</HeaderCell>
                {
                    this.props.isHost &&
                    <HeaderCell colWidth={5}>{LangHelper.getResource('Update')}</HeaderCell>
                }
                <HeaderCell colWidth={20}>{LangHelper.getResource('Feedback')}</HeaderCell>
                <HeaderCell colWidth={20}>{LangHelper.getResource('Category')}</HeaderCell>
                <HeaderCell colWidth={5}>{LangHelper.getResource('Status')}</HeaderCell>
                <HeaderCell colWidth={15}>{LangHelper.getResource('RelatedCustomer')}</HeaderCell>
            </HeaderRow>
        );
    };

    buildBody = () => {
        const { isHost, gridData } = this.props;
        if (gridData.data.length > 0) {
            return gridData.data.map((item, index) => this.renderRow(item, index, isHost));
        }
        return [
            <Row key={`body${1}`} className="no-data" >
                <Cell className='text-center' colSpan={isHost ? 6 : 5}>{LangHelper.getResource('ThereIsNoData')}</Cell>
            </Row>
        ];
    };

    handleEditNoOfInquiry = id => {
        this.props.setEditNoOfInquiryDialog({ show: true, feedbackId: id });
    };

    handleEditFeedback = id => {
        this.props.setEditFeedbackDialog({ show: true, feedbackId: id });
    };

    renderCategoryColumn = item => {
        const { mainCategories } = this.props.gridData;
        const settings = item.settings;

        const mainCategoryIds = [];
        for (let i = 0; i < settings.length; i++) {
            if ((settings[i].settingType === 'Category') && mainCategoryIds.indexOf(settings[i].settingId) < 0) {
                mainCategoryIds.push(settings[i].settingId);
            }
        }

        const categories = [];
        for (let i = 0; i < mainCategoryIds.length; i++) {
            const subCategoryIds = [];
            for (let j = 0; j < settings.length; j++) {
                if ((settings[j].settingType === 'Category') && settings[j].settingId === mainCategoryIds[i]) {
                    subCategoryIds.push(settings[j].subSettingId);
                }
            }

            categories.push({
                mainCategoryId: mainCategoryIds[i],
                subCategoryIds: subCategoryIds
            });
        }

        let result = '';
        for (let i = 0; i < categories.length; i++) {
            result += `<div class="font-weight-bold">${this.getMainCategoryName(categories[i].mainCategoryId, mainCategories)}</div>`;
            const subCategoryIds = categories[i].subCategoryIds;
            for (let j = 0; j < subCategoryIds.length; j++) {
                result += `<div class="font-italic ml-3">
                        ${this.getSubCategoryName(categories[i].mainCategoryId, subCategoryIds[j], mainCategories)}
                    </div>`;
            }
        }

        return result;
    };

    getMainCategoryName = (mainCategoryId, mainCategories) => {
        for (let i = 0; i < mainCategories.length; i++) {
            if (mainCategories[i].settingId === mainCategoryId) {
                return mainCategories[i].settingValue;
            }
        }

        return 'N/A';
    };

    getSubCategoryName = (mainCategoryId, subCategoryId, mainCategories) => {
        let mainCategory = null;
        for (let i = 0; i < mainCategories.length; i++) {
            if (mainCategories[i].settingId === mainCategoryId) {
                mainCategory = mainCategories[i];
                break;
            }
        }

        if (mainCategory) {
            for (let j = 0; j < mainCategory.childSettings.length; j++) {
                if (mainCategory.childSettings[j].subCategoryId === subCategoryId) {
                    return mainCategory.childSettings[j].name;
                }
            }
        }

        return '';
    };

    handleOpenViewRelatedCustomerDialog = relatedCustomers => {
        this.props.setViewRelatedCustomerDialog({ show: true, relatedCustomers });
    };

    renderRelatedCustomerColumn = relatedCustomers => {
        let html = '';
        const totalItems = relatedCustomers.length;
        if (totalItems > MaximumDisplayRelatedCustomer) {
            html = (<a onClick={() => this.handleOpenViewRelatedCustomerDialog(relatedCustomers.join(', '))}>
                {totalItems} customers
            </a>);
        } else {
            html = <span>{relatedCustomers.join(', ')}</span>;
        }

        return html;
    };

    renderRow = (item, index, isHost) => {
        const status = item.status ? item.status.toLowerCase() : '',
            cssClass = (status !== 'pending' && status !== 'closed') ? '' : status;
        return (
            <Row key={index} className={cssClass}>
                <Cell className='text-center'>{item.feedbackId}</Cell>
                {
                    isHost &&
                    <Cell className="text-center">
                        <span className="edit-feedback cursor-pointer pr-1 fa fa-pencil"
                            onClick={() => this.handleEditNoOfInquiry(item.feedbackId)}
                        />
                    </Cell>
                }
                <Cell>
                    {this.tooltipFeedback(item)}
                    <div className="feedback-info">
                        <div>Feedback date <strong> {DateTimeService.toShortDateTimeFormat(item.feedbackDate)}</strong></div>
                        <div>By<strong> {item.creatorName} </strong>on {DateTimeService.toShortDateTimeFormat(item.createDate)}</div>
                        <div>Solving Duration: {item.durationTime}</div>
                        {
                            item.reviewerName &&
                            <div>
                                Reviewed by <strong> {item.reviewerName} </strong> on {DateTimeService.toShortDateTimeFormat(item.solveDate)}
                            </div>
                        }
                    </div>
                </Cell>
                <Cell>
                    <div dangerouslySetInnerHTML={{ __html: this.renderCategoryColumn(item) }} />
                </Cell>
                <Cell className='text-center'>{item.status ? item.status : 'N/A'}</Cell>
                <Cell>{this.renderRelatedCustomerColumn(item.relatedCustomer.split(','))}</Cell>
            </Row>
        );
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

    tooltipFeedback = item => {
        const descriptionText = !item.description ? '' : `Description: <br>${item.description}<br>`,
            solutionText = !item.solution ? '' : `Solution: <br>${item.solution}<br>`,
            lastCharacterSlit = descriptionText.substring(578, 580),
            isEscapseWord = '<br />'.includes(lastCharacterSlit),
            subLength = isEscapseWord ? 592 : 580;

        const lastCharacterSlitSolution = solutionText.substring(578, 580),
            isEscapseWordSolution = '<br />'.includes(lastCharacterSlitSolution),
            subLengthSolution = isEscapseWordSolution ? 592 : 580;

        const tooltipDescription = descriptionText.length > subLength
            ? descriptionText.substring(0, subLength) + ' ... <br><br>' : descriptionText;
        const tooltipSolution = solutionText.length > subLengthSolution
            ? solutionText.substring(0, subLengthSolution) + ' ... <br><br>' : solutionText;

        return (
            <OverlayTrigger
                placement="auto"
                overlay={
                    <Tooltip className="tooltipFeedback">
                        <div dangerouslySetInnerHTML={{ __html: tooltipDescription + tooltipSolution }} />
                    </Tooltip>
                }
            >
                <div className='link-click cursor-pointer pb-1' onClick={() => this.handleEditFeedback(item.feedbackId)}>
                    <span className="pr-1 fa fa-pencil-square-o" />
                    <strong className='link-click'> {item.subject}</strong>
                </div>
            </OverlayTrigger>
        );
    };

    render() {
        const { gridParams, gridData } = this.props;
        if (!gridData || !gridData.data) {
            return null;
        }

        return (
            <Fragment>
                <div className='table-title-v2 d-flex justify-content-between align-items-center'>
                    {
                        !gridParams.username ?
                        <span>Top {gridParams.top} Feedback</span> :
                        <span>Top {gridParams.top} Feedback From {this.props.gridParams.username}</span>
                    }
                    {
                        gridData.data.length > 0 && this.renderExportExcelText()
                    }
                </div>
                <Table
                    width={1250}
                    autoWidth={false}
                    header={this.buildHeader()}
                    body={this.buildBody()}
                    containerPadding={0}
                    // adjustedHeight={10}
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