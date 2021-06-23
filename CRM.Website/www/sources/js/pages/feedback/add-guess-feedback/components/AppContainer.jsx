import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
            settings: ''
   
    componentDidMount(){
        this.props.getAllSettings();
    render() {
        return (
           <div>
               hello
           </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators( ActionCreators, dispatch );

const mapStateToProps = state => {
    const { settings } = state;
    return {
        settings
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( AppContainer );