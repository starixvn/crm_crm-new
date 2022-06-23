import React, { Component, Fragment } from 'react';
import Filter from './Filter';
import DataGrid from './DataGrid';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';

export class AppContainer extends Component {
    componentWillUnmount(){
        this.props.resetState();
    }
    render() {
        return (
            <Fragment>
                <Filter />
                <DataGrid />
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);
export default connect(null, mapDispatchToProps)(AppContainer);