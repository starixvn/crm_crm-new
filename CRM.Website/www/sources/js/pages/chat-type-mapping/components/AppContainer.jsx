import React, { Component, Fragment } from 'react';
import Filter from './Filter';
import DataGrid from './DataGrid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions/index';
import { Policy, FunctionKey } from '@jsroot/common/constants';
import { getPermission } from '@jsroot/common/shareScripts';
import LangHelper from '@jsroot/common/langHelper';

export class AppContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            policy: null
        };
    }

    componentDidMount(){
        getPermission(FunctionKey.ChatTypeMapping).then(response => {
            this.setState({policy: response});
        });
        document.title = LangHelper.getResource('ChatTypeMapping');
    }

    componentWillUnmount(){
        this.props.setGridData(null);
        this.props.setSettings(null);
        document.getElementsByTagName('html')[0].style.overflow = null;
    }

    render() {
        if(!this.state.policy){
            return null;
        }
        const isHost = this.state.policy === Policy.Host;
        return (
            <Fragment>
                <Filter isHost={isHost} />
                <DataGrid isHost={isHost} />
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => state;

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
