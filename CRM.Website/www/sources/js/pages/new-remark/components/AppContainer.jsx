import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import Filter from './Filter';

export class AppContainer extends Component {
    componentDidMount(){
        this.props.getRemarksTitle();
    }
    render() {
        const {remarkTitle} = this.props;
        if(remarkTitle === null || !remarkTitle){
            return null;
        }
        return (
            <Filter />
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { remarkTitle } = state;
    return { remarkTitle };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
