import React, { Component } from 'react';
import Filter from './Filter';
import DataGrid from './DataGrid';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions/index';
import '@cssroot/pages/chat-type-mapping/index.scss';

export class AppContainer extends Component {
    constructor(props) {
        super(props);
        this.isHost = document.getElementById('is-host') ? document.getElementById('is-host').checked : false;
    }

    // componentWillUnmount(){
    //     this.props.resetState();
    // }

    render() {
        return (
            <div>
                <Filter isHost={this.isHost} />
                <DataGrid isHost={this.isHost} />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => null;

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
