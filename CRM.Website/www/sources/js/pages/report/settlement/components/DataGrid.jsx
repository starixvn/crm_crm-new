import LangHelper from '@jsroot/common/langHelper';
import { Cell, HeaderCell, HeaderRow, Row, Table } from '@jsroot/components/react-grid/index';
import React, { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';

export class DataGrid extends PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        const { gridData, gridParams } = this.props;
        if (!gridData || !gridData.childReports) {
            return null;
        }
        return (
            <p>this is datagrid</p>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { gridParams, gridData } = state;
    return {
        gridParams,
        gridData
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);