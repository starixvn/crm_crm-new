import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { ActionCreators } from '../actions';
import { Table, HeaderRow, HeaderCell, Row, Cell } from '@jsroot/components/react-grid/index';
import LangHelper from '@jsroot/common/langHelper';
import { PAGING_SIZES } from '@jsroot/common/constants';
import { Rating } from '../../../../common/constants';

export class RatingDataGrid extends Component {
    constructor(props) {
        super(props);
        this.styleCLick = 'link-click cursor-pointer';
        this.styleDisableCLick = 'disable-click';
        this.state = {
            shouldResetScrollPosition: true,
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.ratingGridData !== nextProps.ratingGridData) {
            nextState.shouldResetScrollPosition = true;
        }
        return true;
    }

    buildHeader = (ratingGridData) => {
        const header = [];
        ratingGridData.columnNames.forEach((item, index) => {
            const colWidth = index === 0 ? 200 : 100;
            header.push(
                <HeaderCell className="sticky-header" colWidth={colWidth}>
                    {item}
                </HeaderCell>
            );
        });

        return <HeaderRow>{header}</HeaderRow>;
    };

    buildBody = (ratingGridData) => {
        const rows = [];
        if (ratingGridData.records && ratingGridData.records.length > 0) {
            rows.push(
                ratingGridData.records.map((item, index) => this.renderRatingRow(item, index))
            );
            return rows;
        }
        return [
            <Row className="no-data">
                <Cell className="text-center" colSpan={ratingGridData.columnNames.length}>
                    {LangHelper.getResource('ThereIsNoData')}
                </Cell>
            </Row>,
        ];
    };

    getFeedbackDate = (item) => {
        const { gridParams } = this.props;
        return gridParams.type === 12 ? item.columnData.name : '';
    };

    displayRatingPercentage = (item, numOfRating) => {
        const { gridParams } = this.props;
        const total = item.excellent + item.good + item.neutral + item.poor + item.veryPoor + item.naRating

        if (gridParams.type !== 13 || numOfRating === 0 || total === 0) {
            return '';
        }

        const percentage = Math.round((numOfRating / total) * 100);

        return ' (' + percentage + '%)';
    }

    renderRatingRow = (item, index) => {
        const cells = [];
        cells.push(
            <Cell key={`category-${index}`} className="first-column">
                {item.columnData.name}
            </Cell>
        );
        cells.push(
            <Cell key={`excellent-${index}`} className='text-center' >
                <span className={`${item.excellent > 0 ? this.styleCLick : this.styleDisableCLick} text-center`}
                    onClick={() =>
                        this.handleShowDetails(
                            Rating.Excellent,
                            item.columnData.id,
                            this.getFeedbackDate(item)
                        )}>
                    {item.excellent}
                </span>
                <span>{this.displayRatingPercentage(item, item.excellent)}</span>
            </Cell>
        );
        cells.push(
            <Cell key={`good-${index}`} className='text-center' >
                <span className={`${item.good > 0 ? this.styleCLick : this.styleDisableCLick} text-center`}
                    onClick={() =>
                        this.handleShowDetails(
                            Rating.Good,
                            item.columnData.id,
                            this.getFeedbackDate(item)
                        )}>
                    {item.good}
                </span>
                <span>{this.displayRatingPercentage(item, item.good)}</span>
            </Cell>
        );
        cells.push(
            <Cell key={`neutral-${index}`} className='text-center' >
                <span className={`${item.neutral > 0 ? this.styleCLick : this.styleDisableCLick} text-center`}
                    onClick={() =>
                        this.handleShowDetails(
                            Rating.Neutral,
                            item.columnData.id,
                            this.getFeedbackDate(item)
                        )}>
                    {item.neutral}
                </span>
                <span>{this.displayRatingPercentage(item, item.neutral)}</span>
            </Cell>
        );
        cells.push(
            <Cell key={`poor-${index}`} className='text-center' >
                <span className={`${item.poor > 0 ? this.styleCLick : this.styleDisableCLick} text-center`}
                    onClick={() =>
                        this.handleShowDetails(
                            Rating.Poor,
                            item.columnData.id,
                            this.getFeedbackDate(item)
                        )}>
                    {item.poor}
                </span>
                <span>{this.displayRatingPercentage(item, item.poor)}</span>
            </Cell>
        );
        cells.push(
            <Cell key={`verypoor-${index}`} className='text-center' >
                <span className={`${item.veryPoor > 0 ? this.styleCLick : this.styleDisableCLick} text-center`}
                    onClick={() =>
                        this.handleShowDetails(
                            Rating.VeryPoor,
                            item.columnData.id,
                            this.getFeedbackDate(item)
                        )}>
                    {item.veryPoor}
                </span>
                <span>{this.displayRatingPercentage(item, item.veryPoor)}</span>
            </Cell>
        );
        cells.push(
            <Cell key={`naRating-${index}`} className='text-center' >
                <span className={`${item.naRating > 0 ? this.styleCLick : this.styleDisableCLick} text-center`}
                    onClick={() =>
                        this.handleShowDetails(
                            Rating.NA,
                            item.columnData.id,
                            this.getFeedbackDate(item)
                        )}>
                    {item.naRating}
                </span>
                <span>{this.displayRatingPercentage(item, item.naRating)}</span>
            </Cell>
        );

        return <Row key={`row-${index}`}>{cells}</Row>;
    };

    renderFooter = (ratingGridData) => {
        if (!ratingGridData.records || ratingGridData.records.length === 0) {
            return null;
        }

        const cells = [];
        cells.push(<Cell className="first-column font-weight-bold">Grand Total</Cell>);

        const totals = {
            excellent: 0,
            good: 0,
            neutral: 0,
            poor: 0,
            veryPoor: 0,
            naRating: 0,
        };

        ratingGridData.records.forEach((record) => {
            totals.excellent += record.excellent;
            totals.good += record.good;
            totals.neutral += record.neutral;
            totals.poor += record.poor;
            totals.veryPoor += record.veryPoor;
            totals.naRating += record.naRating;
        });

        cells.push(
            <Cell className="text-center">
                <span className={`${totals.excellent > 0 ? this.styleCLick : this.styleDisableCLick}`}
                    onClick={() => this.handleShowDetails(Rating.Excellent)}>
                    {totals.excellent}
                </span>
                <span>{this.displayRatingPercentage(totals, totals.excellent)}</span>
            </Cell>
        );

        cells.push(
            <Cell className="text-center">
                <span className={`${totals.good > 0 ? this.styleCLick : this.styleDisableCLick}`}
                    onClick={() => this.handleShowDetails(Rating.Good)}>
                    {totals.good}
                </span>
                <span>{this.displayRatingPercentage(totals, totals.good)}</span>
            </Cell>
        );

        cells.push(
            <Cell className="text-center">
                <span className={`${totals.neutral > 0 ? this.styleCLick : this.styleDisableCLick}`}
                    onClick={() => this.handleShowDetails(Rating.Neutral)}>
                    {totals.neutral}
                </span>
                <span>{this.displayRatingPercentage(totals, totals.neutral)}</span>
            </Cell>
        );

        cells.push(
            <Cell className="text-center">
                <span className={`${totals.poor > 0 ? this.styleCLick : this.styleDisableCLick}`}
                    onClick={() => this.handleShowDetails(Rating.Poor)}>
                    {totals.poor}
                </span>
                <span>{this.displayRatingPercentage(totals, totals.poor)}</span>
            </Cell>
        );

        cells.push(
            <Cell className="text-center">
                <span className={`${totals.veryPoor > 0 ? this.styleCLick : this.styleDisableCLick}`}
                    onClick={() => this.handleShowDetails(Rating.VeryPoor)}>
                    {totals.veryPoor}
                </span>
                <span>{this.displayRatingPercentage(totals, totals.veryPoor)}</span>
            </Cell>
        );

        cells.push(
            <Cell className="text-center">
                <span className={`${totals.naRating > 0 ? this.styleCLick : this.styleDisableCLick}`}
                    onClick={() => this.handleShowDetails(Rating.NA)}>
                    {totals.naRating}
                </span>
                <span>{this.displayRatingPercentage(totals, totals.naRating)}</span>
            </Cell>
        );

        return <Row className="footer-container font-weight-bold">{cells}</Row>;
    };

    handleShowDetails = (rating = -1, creatorId = -1, feedbackDate) => {
        const params = {
            ...this.props.gridParams,
            valueId: rating,
            creatorId: creatorId,
            feedbackDateString: feedbackDate,
        };
        this.props.setOpenDetailPopup({ show: true });
        this.props.getDetails(params);
        this.props.setGridParamDetails(params);
    };

    handleExportExcel = () => {
        this.props.exportExcel(this.props.gridParams);
    };

    handleViewChart = (ratingGridData) => {
        this.props.setOpenChartPopup({ show: true, chartInfo: ratingGridData });
    };

    renderCustomButton = () => {
        const { ratingGridData } = this.props;
        return (
            <div>
                {ratingGridData.records && ratingGridData.records.length > 0 && (
                    <OverlayTrigger
                        overlay={
                            <Tooltip>
                                <span>View Chart</span>
                            </Tooltip>
                        }
                        placement="auto"
                    >
                        <span
                            className="fa fa-bar-chart icon pl-3 cursor-pointer"
                            onClick={() => this.handleViewChart(ratingGridData)}
                        />
                    </OverlayTrigger>
                )}
                <OverlayTrigger
                    overlay={
                        <Tooltip>
                            <span>Show Details</span>
                        </Tooltip>
                    }
                    placement="auto"
                >
                    <span
                        className="fa fa-info-circle icon pl-3 fa-lg cursor-pointer"
                        onClick={() => this.handleShowDetails()}
                    />
                </OverlayTrigger>
                <OverlayTrigger
                    overlay={
                        <Tooltip>
                            <span>Export to Excel</span>
                        </Tooltip>
                    }
                    placement="auto"
                >
                    <span
                        className="fa fa-file-excel-o icon-excel pl-3"
                        onClick={() => this.handleExportExcel()}
                    />
                </OverlayTrigger>
            </div>
        );
    };

    onPaging = (pageIndex, pageSize) => {
        const params = { ...this.props.gridParams };
        params['pageIndex'] = pageIndex;
        params['pageSize'] = pageSize;
        this.props.getGridData(params);
        this.props.setGridParams(params);
    };

    render() {
        const { ratingGridData, gridParams } = this.props;
        if (ratingGridData === null) {
            return null;
        }

        const { pageIndex, pageSize } = gridParams;
        const pagingOption = {
            PageIndex: pageIndex,
            PageSize: pageSize,
            TotalItem: ratingGridData.totalItems,
            PageList: PAGING_SIZES,
        };

        const defaultWidth = 800;
        const width =
            document.getElementById('right-row-container').clientWidth < defaultWidth
                ? document.getElementById('right-row-container').clientWidth
                : defaultWidth;

        return (
            <div style={{ maxWidth: width }}>
                <div className="table-title-v2 d-flex justify-content-between align-items-center">
                    <span>{ratingGridData.title}</span>
                    {
                        ratingGridData.records && ratingGridData.records.length > 0 &&
                        this.renderCustomButton()
                    }
                </div>
                <Table
                    maxWidth={defaultWidth}
                    autoWidth={false}
                    isFixColumn
                    width={width}
                    shouldUseMaxWidth
                    header={this.buildHeader(ratingGridData)}
                    body={this.buildBody(ratingGridData)}
                    isPaging
                    pageOption={pagingOption}
                    onPaging={this.onPaging}
                    footer={this.renderFooter(ratingGridData)}
                    containerPadding={0}
                    adjustedHeight={10}
                    shouldResetScrollPosition={this.state.shouldResetScrollPosition}
                />
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = (state) => {
    const { gridParams, ratingGridData } = state;
    return { gridParams, ratingGridData };
};

export default connect(mapStateToProps, mapDispatchToProps)(RatingDataGrid);