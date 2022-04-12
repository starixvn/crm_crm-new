import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import Filter from './Filter';

export class AppContainer extends Component {

    render() {
        return (
            <Filter />
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { } = state;
    return { };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
