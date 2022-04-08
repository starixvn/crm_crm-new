import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';

export class Filter extends Component {
    handleSubmit = () => {
        const params = {
            username: '',
            headline: '',
            vipTypeId: -1,
            languageIds: '12000,12001,12002,12003,12004,12005,12006,12008',
            siteIds: '6026,6027,6028,6029,6025,6343,6006,6344,6004,6474,6014,6037,6055,6599,6016,6401,6416,6411,6426,6200,6622,6655,6656,6657,6658,6463,6348,6531,6659',
            positionIds: '4,3,2,1,5',
            excludeIgnoredAccounts: true,
            pageIndex: 1,
            pageSize: 100
        };
        this.props.getCustomerReport(params);
    };

    render() {
        return (
            <div>Filter</div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { customerReport } = state;
    return { customerReport };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);