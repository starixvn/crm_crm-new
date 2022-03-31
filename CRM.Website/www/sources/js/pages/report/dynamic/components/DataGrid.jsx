import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';

export class DataGrid extends Component {
    componentDidMount() {
        this.props.getDynamicReport({
            reportType: 1,
            fromDate: 'Mar 01, 2021',
            toDate: 'Feb 28, 2022',
            productId: 0,
            subProductId: 0,
            statusId: 0,
            roleId: 0,
            mainCategoryId: 0,
            handler: null,
            siteId: 0,
            responseId: 0,
            communicationId: 0,
            subCategoryId: 0,
            reviewer: null,
            subject: null,
            userRole: 2,
            pageIndex: 0,
            pageSize: 50
        });
    }

    render() {
        return (
            <div>DataGrid</div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { dynamicReport } = state;
    return { dynamicReport };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);