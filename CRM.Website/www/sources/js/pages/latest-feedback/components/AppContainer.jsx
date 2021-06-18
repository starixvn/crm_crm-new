import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import Filter from './Filter';
import PropTypes from 'prop-types';
import DataGrid from './DataGrid';

export class AppContainer extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        isHost: PropTypes.bool.isRequired,
        getLatestFeedback: PropTypes.func
    };

    static defaultProps = {
        isHost: false,
        getLatestFeedback: function () {
            //nothing
        }
    };

    componentDidMount() {
        this.props.getLatestFeedback(this.props.gridParams);
    }

    render() {
        return (
            <Fragment>
                <Filter isHost={this.props.isHost} />
                <DataGrid isHost={this.props.isHost} />
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const {
        gridParams
    } = state;
    return {
        gridParams
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);