import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import Filter from './Filter';
import PropTypes from 'prop-types';
import DataGrid from './DataGrid';
import QuickUpdateFeedback from './QuickUpdateFeedback';
import UpdateFeedback from './UpdateFeedback';

export class AppContainer extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        isHost: PropTypes.bool.isRequired,
        getLatestFeedback: PropTypes.func,
        getTops: PropTypes.func,
        editNoInquiriesPopup: PropTypes.shape({ show: PropTypes.bool }).isRequired,
        updateFeedbackPopup: PropTypes.shape({ show: PropTypes.bool }).isRequired,
    };

    static defaultProps = {
        isHost: false,
        editNoInquiriesPopup: { show: false },
        updateFeedbackPopup: { show: false },
        getLatestFeedback: function () {
            //nothing
        },
        getTops: function () {
            //nothing
        },
        getAllSettings: function () {
            //nothing
        }
    };

    componentDidMount() {
        this.props.getTops();
        this.props.getLatestFeedback(this.props.gridParams);
        this.props.getAllSettings();
    };

    handleCloseEditPopup = () => {
        this.props.setEditNoInquiriesPopup({ show: false });
        this.props.setEditNoInquiriesResult(null);
    };

    handleEditSuccess = () => {
        this.handleCloseEditPopup();
        this.props.getLatestFeedback(this.props.gridParams);
    };

    handleCloseUpdateFeedbackPopup = () => {
        this.props.setUpdateFeedbackPopup({ show: false });
        this.props.setUpdateFeedbackResult(null);
    };

    handleUpdateFeedbackSuccess = () => {
        this.handleCloseUpdateFeedbackPopup();
        this.props.getLatestFeedback(this.props.gridParams);
    };

    render() {
        return (
            <Fragment>
                <Filter isHost={this.props.isHost} />
                <DataGrid isHost={this.props.isHost} />
                {
                    this.props.editNoInquiriesPopup.show &&
                    <QuickUpdateFeedback
                        onClose={this.handleCloseEditPopup}
                        onSuccess={this.handleEditSuccess}
                    />
                }
                {
                    this.props.updateFeedbackPopup.show &&
                    <UpdateFeedback
                        onClose={this.handleCloseUpdateFeedbackPopup}
                        onSuccess={this.handleUpdateFeedbackSuccess}
                    />
                }
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { gridParams, editNoInquiriesPopup, updateFeedbackPopup } = state;
    return { gridParams, editNoInquiriesPopup, updateFeedbackPopup };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);