import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import Filter from './Filter';
import PropTypes from 'prop-types';
import DataGrid from './DataGrid';
import SweetModalDialog from '@jsroot/components/SweetModalDialog';
import LangHelper from '@jsroot/common/langHelper';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

export class AppContainer extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        editLatestFeedbackPopup: PropTypes.shape({ show: PropTypes.bool }).isRequired,
        isHost: PropTypes.bool.isRequired,
        getLatestFeedback: PropTypes.func
    };

    static defaultProps = {
        isHost: false,
        editLatestFeedbackPopup: { show: false },
        getLatestFeedback: function() {
            //nothing
        }
    };

    componentDidMount() {
        this.props.getLatestFeedback(this.props.gridParams);
    }

    handleCloseEditPopup = () => {
        this.props.setEditLatestFeedbackPopup({ show: false });
        this.props.setEditLatestFeedbackResult(null);
        this.props.setSelectLatestFeedbackId(null);
    };

    handleEditSuccess = () => {
        this.handleCloseEditPopup();
        this.props.getLatestFeedback(this.props.gridParams);
    };

    render() {
        return (
            <Fragment>
                <DataGrid isHost={this.props.isHost}/>
                {
                    this.props.editLatestFeedbackPopup.show &&
                    <EditLatestFeedback
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
    const {
        gridParams,
        editLatestFeedbackPopup
    } = state;
    return {
        gridParams,
        editLatestFeedbackPopup
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);