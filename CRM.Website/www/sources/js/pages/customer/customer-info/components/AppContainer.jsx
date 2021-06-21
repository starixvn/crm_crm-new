import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Filter from './Filter';
import PropTypes from 'prop-types';
import DataGrid from './DataGrid';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';

export class AppContainer extends Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        isHost: PropTypes.bool.isRequired,
        getCustomerInfo: PropTypes.func
    };

    static defaultProps = {
        isHost: true,
        getCustomerInfo: function() {
            //nothing
        }
    };

    render() {
        return (
            <div className="col-md-3">
                <Filter isHost={this.props.isHost}/>
                <DataGrid isHost={this.props.isHost}/>
            </div>
        )
    }
};
const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const {
        gridParams,
        getCustomerInfo
    } = state;
    return {
        gridParams,
        getCustomerInfo
      
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);