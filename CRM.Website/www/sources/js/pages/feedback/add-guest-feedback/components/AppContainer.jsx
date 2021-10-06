import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import PropTypes from 'prop-types';
import CreateForm from './CreateForm';

export class AppContainer extends Component {
    static propTypes = {
        getAllSettings: PropTypes.func,
        getBalanceUpday: PropTypes.func
    };

    static defaultProps = {
        getAllSettings: function () {
            // nothing
        },
        getBalanceUpday: function () {
            // nothing
        }
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getAllSettings();
        this.props.getBalanceUpday();
    }

    render() {
        if (this.props.settings === null || this.props.balanceUpday === null) {
            return null;
        }
        return (
            <CreateForm />
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { settings, balanceUpday } = state;
    return {
        settings, balanceUpday
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);