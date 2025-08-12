import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "../actions";
import DateTimeService from "@jsroot/common/dateTimeService";
import {
  Table,
  HeaderRow,
  HeaderCell,
  Row,
  Cell,
} from "@jsroot/components/react-grid/index";
import LangHelper from "@jsroot/common/langHelper";
import { PAGING_SIZES } from "@jsroot/common/constants";
import ExcelIcon from "@jsroot/components/ExcelIcon";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

export class DataGrid extends Component {
  constructor(props) {
    super(props);
  }

  getReviewStatusId = (reviewStatus) => {
    return this.props.reviewStatusSetting.find((x) => x.name === reviewStatus)
      ?.id;
  };

  handleEdit = (item) => {
    var reviewStatusId = this.getReviewStatusId(item.reviewStatus);
    this.props.setEditSmaFeedbackDialog({
      show: true,
      custID: item.custID,
      createdDate: item.createdDate,
      functionID: item.funcID,
      reviewStatusID: parseInt(reviewStatusId, 10),
      discussion: item.discussion,
      comment: item.comment,
    });
  };

  buildHeader = (isHost) => {
    return (
      <HeaderRow>
        <HeaderCell colWidth={19}>
          {LangHelper.getResource("CreatedDateGM8")}
        </HeaderCell>
        <HeaderCell colWidth={15}>
          {LangHelper.getResource("Username")}
        </HeaderCell>
        <HeaderCell colWidth={10}>{LangHelper.getResource("Level")}</HeaderCell>
        <HeaderCell colWidth={10}>{LangHelper.getResource("Site")}</HeaderCell>
        <HeaderCell colWidth={20}>
          {LangHelper.getResource("FunctionName")}
        </HeaderCell>
        <HeaderCell colWidth={12}>
          {LangHelper.getResource("ReviewStatus")}
        </HeaderCell>
        <HeaderCell colWidth={12}>
          {LangHelper.getResource("Rating")}
        </HeaderCell>
        <HeaderCell colWidth={30}>
          {LangHelper.getResource("Comment")}
        </HeaderCell>
        <HeaderCell colWidth={30}>
          {LangHelper.getResource("DiscussionSolution")}
        </HeaderCell>
        {isHost && (
          <HeaderCell colWidth={8}>
            {LangHelper.getResource("Action")}
          </HeaderCell>
        )}
      </HeaderRow>
    );
  };

  buildBody = (isHost) => {
    if (this.props.gridData?.data.length > 0) {
      return this.props.gridData.data.map((item, index) =>
        this.renderRow(item, index, isHost)
      );
    }
    return [
      <Row key={`body${1}`} className="no-data">
        <Cell className="text-center" colSpan={isHost ? 10 : 9}>
          {LangHelper.getResource("ThereIsNoData")}
        </Cell>
      </Row>,
    ];
  };

  renderRow = (item, index, isHost) => {
    return (
      <Row key={`row${index}`}>
        <Cell className="text-center">
          {item.createdDate &&
            DateTimeService.toLongDateTimeFormat(item.createdDate)}
        </Cell>
        <Cell>{item.username}</Cell>
        <Cell className="text-center">{item.level}</Cell>
        <Cell className="text-center">{item.site}</Cell>
        <Cell className="text-center">
          {item.funcName ? item.funcName : "N/A"}
        </Cell>
        <Cell className="text-center">{item.reviewStatus}</Cell>
        <Cell className="text-center">{item.rateInfo}</Cell>
        <Cell>{item.comment}</Cell>
        <Cell>{item.discussion}</Cell>
        {isHost && (
          <OverlayTrigger
            placement="bottom"
            overlay={
              <Tooltip>
                <span>{LangHelper.getResource("Edit")}</span>
              </Tooltip>
            }
          >
            <Cell className="text-center">
              <span
                className="rounded-circle fa fa-pencil icon-edit"
                onClick={() => this.handleEdit(item)}
              />
            </Cell>
          </OverlayTrigger>
        )}
      </Row>
    );
  };

  onPaging = (pageIndex, pageSize) => {
    const params = { ...this.props.gridParams };
    params.pageIndex = pageIndex;
    params.pageSize = pageSize;
    this.props.setGridParams(params);
    this.props.getGridData({ ...params });
  };

  handleExportExcel = () => {
    this.props.exportExcel(this.props.gridParams);
  };

  render() {
    if (!this.props.gridData || !this.props.gridData.data) {
      return null;
    }
    const { isHost } = this.props;
    const { pageIndex, pageSize } = this.props.gridParams;
    const { totalItems } = this.props.gridData;
    const pagingOption = {
      PageIndex: pageIndex,
      PageSize: pageSize,
      TotalItem: totalItems,
      PageList: PAGING_SIZES,
    };

    return (
      <Fragment>
        <div className="d-flex table-title-v2 justify-content-between align-items-center">
          <div>{LangHelper.getResource("ManageSMAFeedback")}</div>
          <div>
            {this.props.gridData?.data.length > 0 && (
              <ExcelIcon handleExportExcel={this.handleExportExcel} />
            )}
          </div>
        </div>
        <Table
          minWidth={960}
          maxWidth={document.getElementById("right-row-container").clientWidth}
          autoWidth
          header={this.buildHeader(isHost)}
          body={this.buildBody(isHost)}
          isPaging
          pageOption={pagingOption}
          onPaging={this.onPaging}
          adjustedHeight={10}
          shouldResetScrollPosition={false}
        />
      </Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = (state) => {
  const { gridParams, gridData, reviewStatusSetting } = state;
  return { gridParams, gridData, reviewStatusSetting };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);
