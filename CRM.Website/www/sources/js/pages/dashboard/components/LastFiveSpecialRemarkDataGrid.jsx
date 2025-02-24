import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import { Row, Cell } from '@jsroot/components/react-grid/index';
import { Table } from 'react-bootstrap';
import LangHelper from '@jsroot/common/langHelper';

export class LastFiveSpecialRemarkDataGrid extends Component {
    componentDidMount() {
        this.props.getLastFiveSpecialRemarks({ customerId: this.props.id });
    }

    componentDidUpdate(prevProps) {
        if (this.props.id !== prevProps.id) {
            this.props.getLastFiveSpecialRemarks({ customerId: this.props.id });
        }
    }

    buildBody = () => {
        const { lastFiveSpecialRemarks } = this.props;

        if (lastFiveSpecialRemarks.length > 0) {
            return lastFiveSpecialRemarks.map((item, index) => this.renderRow(item, index));
        }
        return [
            <Row key='body-grid-remark' className="no-data" >
                <Cell className='text-center' colSpan={1}>
                    {LangHelper.getResource('ThereIsNoData')}
                </Cell>
            </Row>
        ];
    };

    renderRow = (item, index) => {
        return (
            <Row key={index}>
                <Cell>
                    <div dangerouslySetInnerHTML={{ __html: `${index + 1}. ${item}` }}></div>
                </Cell>
            </Row>
        );
    };

    render() {
        const { lastFiveSpecialRemarks } = this.props;
        if (!lastFiveSpecialRemarks) {
            return null;
        }

        return (
            <div className="table-last-five-remarks">
                <div className='table-title-v2 d-flex justify-content-between align-items-center'>
                    <span>{LangHelper.getResource('LastFiveSpecialRemark')}</span>
                </div>
                <Table>
                    <tbody>
                        {this.buildBody()}
                    </tbody>
                </Table>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { lastFiveSpecialRemarks } = state;
    return { lastFiveSpecialRemarks };
};

export default connect(mapStateToProps, mapDispatchToProps)(LastFiveSpecialRemarkDataGrid);