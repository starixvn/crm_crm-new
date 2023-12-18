import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';

export class CompanyService extends Component {
    render() {
        return (
            <div className='tab-child'>Company Service</div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { allSettings, customerInfo, editCustomerInfoDetailResult } = state;
    return { allSettings, customerInfo, editCustomerInfoDetailResult };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyService);