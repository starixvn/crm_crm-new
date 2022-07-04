import React, { Component } from 'react';
import Filter from './Filter';
import DataGrid from './DataGrid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions/index';
import { Policy, FunctionKey } from '@jsroot/common/constants';
import { getPermission } from '@jsroot/common/shareScripts';

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
    }

    componentWillUnmount(){
        this.props.setGridData(null);
        this.props.setSettings(null);
    }
    
    render() {
        if(!this.state.policy){
            return null;
        }
        const isHost = this.state.policy === Policy.Host;
        return (
            <div>
                <Filter isHost={isHost} />
                <DataGrid isHost={isHost} />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => state;

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
