import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';

export class AppContainer extends Component {
    
    componentDidMount() {
        this.props.getLogsByCustomerId({
            customerId: 1754,
            fromDate: 'Sep 01, 2021',
            handler: '',
            statusId: 0,
            toDate: 'Sep 14, 2021'
        });
    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { gridData } = state;
    return { gridData };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
