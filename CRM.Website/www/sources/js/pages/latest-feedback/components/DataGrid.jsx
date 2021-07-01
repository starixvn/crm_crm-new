import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import LangHelper from '@jsroot/common/langHelper';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

export class DataGrid extends Component {
    constructor(props) {
        super(props);
    }

    handleExportExcel = () => {
        const { gridParams } = this.props;
        this.props.exportExcel(gridParams);
    };

    buildHeader = isHost => {
        return (
            <HeaderRow>
                <HeaderCell colWidth={7}>{LangHelper.getResource('Running No.')}</HeaderCell>
                <HeaderCell colWidth={5}>{LangHelper.getResource('Update')}</HeaderCell>
                <HeaderCell colWidth={20}>{LangHelper.getResource('Feedback')}</HeaderCell>
                <HeaderCell colWidth={20}>{LangHelper.getResource('Category')}</HeaderCell>
                <HeaderCell colWidth={5}>{LangHelper.getResource('Status')}</HeaderCell>
                <HeaderCell colWidth={15}>{LangHelper.getResource('Related Customer')}</HeaderCell>
            </HeaderRow>
        );
    };

    buildBody = isHost => {
        if (this.props.gridData.data.length > 0) {
            return this.props.gridData.data.map((item, index) => this.renderRow(item, index, isHost));
        }
        return [<Row key={`body${1}`} className="no-data" ><Cell className='text-center' colSpan={isHost ? 6 : 5}>{LangHelper.getResource('ThereIsNoData')}</Cell></Row>];
    };

    handleEdit = id => {
        this.props.getNoInquiriesByFeedbackId(id, () => this.props.setEditQuickUpdateFeedbackPopup({ show: true }));
    };

    handleUpdateFeedback = (item, mainCategories) => {
        this.props.setUpdateFeedbackPopup({ show: true, data: { item, mainCategories }});
    };

    renderCategoryColumn = (item) => {
        const { mainCategories } = this.props.gridData;
        var settings = item.settings;

        var mainCategoryIds = [];
        for (var i = 0; i < settings.length; i++) {
            if ((settings[i].settingType == "Category")
                && mainCategoryIds.indexOf(settings[i].settingIdLv1) < 0) {
                mainCategoryIds.push(settings[i].settingIdLv1);
            }
        }

        var categories = [];
        for (var i = 0; i < mainCategoryIds.length; i++) {
            var subCategoryIds = [];
            for (var j = 0; j < settings.length; j++) {
                if ((settings[j].settingType == "Category")
                    && settings[j].settingIdLv1 == mainCategoryIds[i]) {
                    subCategoryIds.push(settings[j].settingIdLv2);
                }
            }

            categories.push({
                mainCategoryId: mainCategoryIds[i],
                subCategoryIds: subCategoryIds
            })
        }

        var result = '';
        for (var i = 0; i < categories.length; i++) {
            var category = this.getMainCategoryName(categories[i].mainCategoryId, mainCategories);
            var subCategoryIds = categories[i].subCategoryIds;
            for (var j = 0; j < subCategoryIds.length; j++) {
                category += this.getSubCategoryName(categories[i].mainCategoryId, subCategoryIds[j], mainCategories);
            }

            result += category;
        }

        return result;
    };

    getMainCategoryName = function (mainCategoryId, mainCategories) {
        for (var i = 0; i < mainCategories.length; i++) {
            if (mainCategories[i].settingId == mainCategoryId) {
                return mainCategories[i].settingValue;
            }
        }

        return "N/A";
    }

    getSubCategoryName = function (mainCategoryId, subCategoryId, mainCategories) {
        var mainCategory = null;
        for (var i = 0; i < mainCategories.length; i++) {
            if (mainCategories[i].settingId == mainCategoryId) {
                mainCategory = mainCategories[i];
                break;
            }
        }

        if (mainCategory) {
            for (var j = 0; j < mainCategory.childSettings.length; j++) {
                if (mainCategory.childSettings[j].subCategoryId == subCategoryId) {
                    return mainCategory.childSettings[j].settingName;
                }
            }
        }

        return '';
    }

    renderRow = (item, index, isHost) => (
        <Row key={index} >
            <Cell className='text-center'>{item.feedbackId}</Cell>
            {
                isHost &&
                <Cell className="text-center">
                    <span className="rounded-circle fa fa-pencil icon-edit"
                        onClick={() => this.handleEdit(item.feedbackId)}
                    />
                </Cell>
            }
            {
                isHost &&
                <Cell onClick={() => this.handleUpdateFeedback(item)}>
                    {
                        this.tooltipFeedback(item)
                    }
                    <strong className='link-click'> {item.subject}
                    </strong>
                    <div>Feedback date <strong> {item.feedbackDateString} </strong></div>
                    <div>By <strong>  {item.creatorName} </strong> on {item.createDateString} </div>
                    <div>Solving Duration: {item.durationTime} </div>
                </Cell>
            }
            <Cell>
                <div>{this.renderCategoryColumn(item)}</div>
            </Cell>
            <Cell className='text-center'>{item.status ? item.status : 'N/A'}</Cell>
            <Cell>{item.relatedCustomer}</Cell>

        </Row>
    );

    renderExportExcelText = () => {
        return (
            <OverlayTrigger
                placement="auto"
                overlay={
                    <Tooltip className="tooltipExport">
                        <span> Export to Excel </span>
                    </Tooltip>
                }
            >
                {
                    <span className="fa fa-file-excel-o icon-excel" onClick={this.handleExportExcel} />
                }
            </OverlayTrigger>
        );
    };

    tooltipFeedback = (item) => {
        var desctiptionText = !item.description ? '' : "Description: <br>" + item.description + "<br>";
        var solutionText = !item.solution ? '' : "Solution: <br>" + item.solution + "<br>";

        var lastCharacterSlit = desctiptionText.substring(578, 580);
        var isEscapseWord = "<br />".includes(lastCharacterSlit);
        var subLength = isEscapseWord ? 592 : 580;

        var lastCharacterSlitSolution = solutionText.substring(578, 580);
        var isEscapseWordSolution = "<br />".includes(lastCharacterSlitSolution);
        var subLengthSolution = isEscapseWordSolution ? 592 : 580;

        var tooltipDescription = desctiptionText.length > subLength ? desctiptionText.substring(0, subLength) + " ... <br><br>" : desctiptionText;
        var tooltipSolution = solutionText.length > subLengthSolution ? solutionText.substring(0, subLengthSolution) + " ... <br><br>" : solutionText;

        return (
            <OverlayTrigger
                placement="auto"
                overlay={
                    <Tooltip className="tooltipFeedback">
                        <div
                            dangerouslySetInnerHTML={{ __html: tooltipDescription + tooltipSolution }}
                        />
                    </Tooltip>
                }
            >
                {
                    <span className="rounded-circle fa fa-pencil-square-o"
                        onClick={() => this.handleUpdateFeedback(item)}
                    />
                }
            </OverlayTrigger>
        );
    };

    render() {
        if (!this.props.gridData || !this.props.gridData.data) {
            return null;
        }
        const { isHost } = this.props;

        return (
            <Fragment>
                <div className='table-title d-flex justify-content-between align-items-center'>
                    <span>Top {this.props.gridParams.top} Feedback</span>
                    {
                        this.props.gridData.data.length > 0 && this.renderExportExcelText()
                    }
                </div>
                <Table
                    width={1200}
                    autoWidth={false}
                    header={this.buildHeader(isHost)}
                    body={this.buildBody(isHost)}
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