import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Filter from './Filter';
import PropTypes from 'prop-types';
import DataGrid from './DataGrid';

export class AppContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="col-md-3">
                <Filter isHost={this.props.isHost}/>
                <DataGrid isHost={this.props.isHost}/>
            </div>
        )
    }
};


export default AppContainer;