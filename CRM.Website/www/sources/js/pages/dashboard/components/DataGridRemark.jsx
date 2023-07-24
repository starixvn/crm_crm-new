import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import { Row, Cell } from '@jsroot/components/react-grid/index';
import { Table } from 'react-bootstrap';
import LangHelper from '@jsroot/common/langHelper';

export class DataGridRemark extends Component {
    componentDidMount() {
        this.props.getCustomerRemarks({ customerId: this.props.id });
    }

    componentDidUpdate(prevProps) {
        if ( this.props.id !== prevProps.id ) {
            this.props.getCustomerRemarks({ customerId: this.props.id });
        }
    }

    buildBody = () => {
        const { customerRemarks } = this.props;

        if ( customerRemarks.length > 0) {
            return customerRemarks.map((item, index) => this.renderRow(item, index));
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
                    <div dangerouslySetInnerHTML={{ __html: `${index + 1}. ${item}`}}></div>
                </Cell>
            </Row>
        );
    };

    render() {
        const { customerRemarks } = this.props;
        if(!customerRemarks){
            return null;
        }

        return (
            <>
                <div className='table-title d-flex justify-content-between align-items-center'>
                    <span>{LangHelper.getResource('LastFiveSpecialRemark')}</span>
                </div>

                <Table>
                    <tbody>
                        { this.buildBody() }
                    </tbody>
                </Table>

            </>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { customerRemarks } = state;
    return { customerRemarks };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataGridRemark);
