import React, { Component, Fragment } from 'react';
import DataGrid from './DataGrid';
import Filter from './Filter';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import RemovePicAssignment from './RemovePicAssignment';
import AssignPic from './AssignPic';
import DefaultPic from './DefaultPic';
import { Policy, FunctionKey } from '@jsroot/common/constants';
import { getPermission } from '@jsroot/common/shareScripts';
import LangHelper from '@jsroot/common/langHelper';

export class AppContainer extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            policy: null,
            policyPicManagement: null
        };
    }
    componentDidMount(){
        getPermission(FunctionKey.PICAssignment).then(response => {
            this.setState({policy: response});
        });
        getPermission(FunctionKey.PICManagement).then(response => {
            this.setState({policyPicManagement: response});
        });
        document.title = LangHelper.getResource('PICAssignment');
    }

    componentWillUnmount(){
        this.props.resetState();
    }

    render() {
        const { policy, policyPicManagement } = this.state;
        if(!policy || !policyPicManagement) {
            return null;
        }
        const isHost = policy === Policy.Host;
        const isReadPicManagement = policyPicManagement > Policy.Read;

        return (
            <Fragment>
                <Filter isHost={isHost}/>
                <DataGrid isHost={isHost} isReadPicManagement={isReadPicManagement}/>
                {
                    this.props.removePicAssignmentPopup.show &&
                    <RemovePicAssignment
                        onClose={() => this.props.setRemovePicAssignmentPopup({ show: false })}
                    />
                }
                {
                    this.props.assignPicPopup.show &&
                    <AssignPic data={this.props.assignPicPopup.data} />
                }
                {
                    this.props.defaultPicPopup.show &&
                    <DefaultPic />
                }
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const {
        removePicAssignmentPopup,
        assignPicPopup,
        defaultPicPopup
    } = state;

    return {
        removePicAssignmentPopup,
        assignPicPopup,
        defaultPicPopup
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);