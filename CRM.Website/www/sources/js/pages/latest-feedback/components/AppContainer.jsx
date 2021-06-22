import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import Filter from './Filter';
import PropTypes from 'prop-types';
import DataGrid from './DataGrid';
import QuickUpdateFeedback from './QuickUpdateFeedback';

export class AppContainer extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        isHost: PropTypes.bool.isRequired,
        getLatestFeedback: PropTypes.func,
        getTops: PropTypes.func,
        editQuickUpdateFeedbackPopup: PropTypes.shape({ show: PropTypes.bool }).isRequired,
    };

    static defaultProps = {
        isHost: false,
        editQuickUpdateFeedbackPopup: { show: false },
        getLatestFeedback: function () {
            //nothing
        },
        getTops: function () {
            //nothing
        }
    };

    componentDidMount() {
        this.props.getTops();
        this.props.getLatestFeedback(this.props.gridParams);
    };

    handleCloseEditPopup = () => {
        this.props.setEditQuickUpdateFeedbackPopup({ show: false });
        this.props.setEditQuickUpdateFeedbackResult(null);
    };

    handleEditSuccess = () => {
        this.handleCloseEditPopup();
        this.props.getLatestFeedback(this.props.gridParams);
    };

    render() {
        return (
            <Fragment>
                <Filter isHost={this.props.isHost} />
                <DataGrid isHost={this.props.isHost} />
                {
                    this.props.editQuickUpdateFeedbackPopup.show &&
                    <QuickUpdateFeedback
                        onClose={this.handleCloseEditPopup}
                        onSuccess={this.handleEditSuccess}
                    />
                }
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { gridParams, editQuickUpdateFeedbackPopup } = state;
    return { gridParams, editQuickUpdateFeedbackPopup };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);