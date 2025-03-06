import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import LangHelper from '@jsroot/common/langHelper';
import { Policy, FunctionKey } from '@jsroot/common/constants';
import { getPermission } from '@jsroot/common/shareScripts';

export class AppContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            policy: null
        };
    }

    render() {
        // if(!this.state.policy){
        //     return null;
        // }
        const isHost = this.state.policy === Policy.Host;

        return (
            <Fragment>
                {/* <Filter/>
                <DataGrid isHost={isHost}/> */}
                hihihihihihihihi
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { gridParams } = state;
    return { gridParams };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);