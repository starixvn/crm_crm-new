import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import Filter from './Filter';
import DataGrid from './DataGrid';

export class AppContainer extends Component {

    render() {
        return (
            <div>
                <Filter />
                <DataGrid />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { customerReport } = state;
    return { customerReport };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);