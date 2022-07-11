import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import Filter from './Filter';
import DataGrid from './DataGrid';
import LangHelper from '@jsroot/common/langHelper';

export class AppContainer extends Component {

    componentDidMount() {
        this.props.getAllSettings();
        document.title = LangHelper.getResource('CustomerReport');
    }
    
    componentWillUnmount(){
        this.props.resetState();
    }

    render() {
        const { allSettings } = this.props;
        if (!allSettings) {
            return null;
        }
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
    const { allSettings } = state;
    return { allSettings };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);