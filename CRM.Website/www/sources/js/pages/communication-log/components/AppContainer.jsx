import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import Filter from './Filter';
import DataGrid from './DataGrid';

export class AppContainer extends Component {

    render() {
        return (
            <div className="col-md-10">
                <Filter/>
                <DataGrid/>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { gridData } = state;
    return { gridData };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
