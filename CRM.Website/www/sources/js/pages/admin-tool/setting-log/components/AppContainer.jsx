import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import Filter from './Filter';

export class AppContainer extends Component {
    static propTypes = {
        getActionLogs: PropTypes.func
    };

    static defaultProps = {
        getActionLogs: function () {
            // nothing
        }
    };

    componentDidMount() {
        this.props.getActionLogs();
    }

    render() {
        if(this.props.actionLogs === null || !this.props.actionLogs){
            return null;
        }
        return (
                <Fragment>
                     <Filter />
                </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { actionLogs } = state;
    return { actionLogs };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
