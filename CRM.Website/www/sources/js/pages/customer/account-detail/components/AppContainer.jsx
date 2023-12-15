import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import HeadlineStaffsAndAuthority from './HeadlineStaffsAndAuthority';
import HeadlineCommunicationInfo from './HeadlineCommunicationInfo';
import CompanyService from './CompanyService';

export class AppContainer extends Component {   
    render() {       
        return (
            <div>
                <p>Account Info</p>
                <p>Accountant PIC</p>
                <HeadlineCommunicationInfo />
                <HeadlineStaffsAndAuthority />
                <CompanyService />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

export default connect(null, mapDispatchToProps)(AppContainer);