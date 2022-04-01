import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import Filter from './Filter';
import DataGrid from './DataGrid';
import FeedbackDetails from '../../deleted-feedback-statistic/components/FeedbackDetails';

export class AppContainer extends Component {
    static propTypes = {
        viewCommunicationDialog: PropTypes.shape({ show: PropTypes.bool }).isRequired
    };

    static defaultProps = {
        viewCommunicationDialog: { show: false }
    };

    handleCloseViewCommunication = () => {
        this.props.setViewCommunicationDialog({ show: false });
    }

    render() {
        const { viewCommunicationDialog } = this.props;
        return (
            <div>
                <Filter />
                <DataGrid />
                {
                    viewCommunicationDialog.show &&
                    <FeedbackDetails
                        title='CommunicationLogDetail'
                        feedbackId={viewCommunicationDialog.feedbackId}
                        onClose={this.handleCloseViewCommunication}
                    />
                }
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { viewCommunicationDialog } = state;
    return { viewCommunicationDialog };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);