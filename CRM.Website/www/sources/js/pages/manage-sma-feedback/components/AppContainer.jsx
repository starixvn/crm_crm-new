import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { ActionCreators } from "../actions";
import { bindActionCreators } from "redux";
import LangHelper from "@jsroot/common/langHelper";
import { Policy, FunctionKey } from "@jsroot/common/constants";
import { getPermission } from "@jsroot/common/shareScripts";
import Filter from "./Filter";
import DataGrid from "./DataGrid";
import EditSmaFeedback from "./EditSmaFeedback";

export class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      policy: null,
    };
  }

  componentDidMount() {
    getPermission(FunctionKey.ManageSMAFeedback).then((response) => {
      this.setState({ policy: response });
    });
    document.title = LangHelper.getResource("ManageSMAFeedback");
  }

  componentWillUnmount() {
    this.props.resetState();
  }

  handleCloseDialog = (isSuccessful) => {
    this.props.setEditSmaFeedbackDialog({ show: false });
    if (isSuccessful) {
      this.props.getGridData(this.props.gridParams);
    }
  };

  render() {
    if (!this.state.policy) {
      return null;
    }
    const isHost = this.state.policy === Policy.Host;
    const { editSmaFeedbackDialog } = this.props;

    return (
      <Fragment>
        <Filter />
        <DataGrid isHost={isHost} />
        {editSmaFeedbackDialog.show && (
          <EditSmaFeedback
            data={editSmaFeedbackDialog}
            onClose={this.handleCloseDialog}
          />
        )}
      </Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = (state) => {
  const { gridParams, editSmaFeedbackDialog } = state;
  return { gridParams, editSmaFeedbackDialog };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
