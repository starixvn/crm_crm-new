import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import PropTypes from 'prop-types';
import CreateForm from './CreateForm';

export class AppContainer extends Component {
    static propTypes = {
        getAllSettings: PropTypes.func
    };

    static defaultProps = {
        getAllSettings: function () {
            // nothing
        }
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getAllSettings();
    }

    render() {
        if (this.props.settings === null) {
            return null;
        }
        return (
            <CreateForm isHost={this.props.isHost} />
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { settings } = state;
    return {
        settings
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);