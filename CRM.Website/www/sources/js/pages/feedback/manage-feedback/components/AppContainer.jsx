import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'react-bootstrap';
import { ActionCreators } from '../actions';
import LangHelper from '@jsroot/common/langHelper';
import Filter from './Filter';
import DataGrid from './DataGrid';

export class AppContainer extends Component {
    static propTypes = {
        getAllSettings: PropTypes.func
    };

    static defaultProps = {
        getAllSettings: function () {
            // nothing
        }
    };
    
    componentDidMount() {
        this.props.getAllSettings();
    }

    render() {
        const { isHost } = this.props;
        return (
            <Fragment>
                <Filter />
                <DataGrid isHost={isHost}/>
            </Fragment>
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
