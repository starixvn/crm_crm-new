import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import CreateForm from './CreateForm';

export class AppContainer extends Component {
    static propTypes = {
        getSettings: PropTypes.func
    };

    static defaultProps = {
        getSettings: function () {
            // nothing
        }
    };

    componentDidMount() {
        this.props.getSettings();
    }

    render() {
        const { settings } = this.props;
        if (settings === null) {
            return null;
        }

        return <CreateForm />;
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { settings } = state;
    return { settings };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);