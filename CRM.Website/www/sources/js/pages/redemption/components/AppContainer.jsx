import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import DataGrid from './DataGrid';
import Filter from './Filter';
import EditRedemptionLog from './EditRedemptionLog';
import CreateRedemptionLog from './CreateRedemptionLog';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import redemption from '../redemptionSlice';
import { Policy, FunctionKey } from '@jsroot/common/constants';
import { getPermission } from '@jsroot/common/shareScripts';

const store = configureStore({
    reducer: redemption
});

export class AppContainer extends Component {
    static propTypes = {
        editRedemptionDialog: PropTypes.shape({ show: PropTypes.bool }).isRequired,
        createRedemptionDialog: PropTypes.shape({ show: PropTypes.bool }).isRequired
    };

    static defaultProps = {
        editRedemptionDialog: { show: false },
        createRedemptionDialog: { show: false }
    };

    constructor(props) {
        super(props);
        this.state = {
            createUpdateFeedbackPermission: null
        };
    }

    componentDidMount(){
        getPermission(FunctionKey.CreateUpdateFeedbackAndCustomerInfo).then(response => {
            this.setState({customerInfoPolicy: response});
        });
    }

    componentWillUnmount(){
        this.props.resetState();
     }

    handleCloseEditRedemptionDialog = isSuccessful => {
        this.props.setEditRedemptionDialog({ show: false });
        if (isSuccessful) {
            this.props.getLogsByCustomerId(this.props.gridParams);
        }
    };

    handleCloseCreateRedemptionDialog = isSuccessful => {
        this.props.setCreateRedemptionDialog({ show: false });
        if (isSuccessful) {
            this.props.getLogsByCustomerId(this.props.gridParams);
        }
    };

    render() {
        if(!this.state.createUpdateFeedbackPermission){
            return null;
        }

        const { editRedemptionDialog, createRedemptionDialog } = this.props;
        
        return (
            <Provider store={store}>
                <Filter id={this.props.id}/>
                <DataGrid createUpdateFeedbackPermission={this.state.createUpdateFeedbackPermission}/>
                {
                    editRedemptionDialog.show &&
                    <EditRedemptionLog logId={editRedemptionDialog.logId} createUpdateFeedbackPermission={this.state.createUpdateFeedbackPermission}
                        onClose={this.handleCloseEditRedemptionDialog}
                    />
                }
                {
                    createRedemptionDialog.show &&
                    <CreateRedemptionLog logId={createRedemptionDialog.logId}
                        id={this.props.id}
                        onClose={this.handleCloseCreateRedemptionDialog}
                    />
                }
            </Provider>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { gridParams, editRedemptionDialog, createRedemptionDialog } = state;
    return { gridParams, editRedemptionDialog, createRedemptionDialog };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
