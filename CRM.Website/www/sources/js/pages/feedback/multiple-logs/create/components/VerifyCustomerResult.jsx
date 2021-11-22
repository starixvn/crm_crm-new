import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Col, Row } from 'react-bootstrap';
import { ActionCreators } from '../actions';
import LangHelper from '@jsroot/common/langHelper';

export class VerifyCustomerResult extends Component {
    static defaultProps = {
        verifyCustomerResults: [],
        relatedCustomerResults: []
    };

    handleOpenAddRelatedCustomerDialog = () => {
        const relatedCustomers = [];

        this.props.relatedCustomerResults.forEach(item => {
            item.relatedCustomers.forEach(child => {
                const index = relatedCustomers.map(x => x.username).indexOf(child.username);
                if (index === -1) {
                    const totalItems = relatedCustomers.length;
                    relatedCustomers.push({ index: totalItems + 1, username: child.username, isValid: true });
                }
            });
        });

        this.props.setAddRelatedCustomerDialog({
            show: true,
            isEdit: this.props.relatedCustomerResults.length > 0,
            relatedCustomers,
            relatedCustomerResults: [...this.props.relatedCustomerResults]
        });
    };

    renderCustomerItem = (customer, index) => {
        let className = '';
        const isInActive = !customer.isSiteActive && customer.isLicensee;
        if (isInActive && customer.custId !== 0) {
            className = 'inactive';
        } else{
            if (customer.custId === 0){
                className = 'invalid';
            } else{
                className = customer.custId > 0 ? 'customer' : 'guest';
            }
        }

        return (
            <div key={index} className="customer-item mr-2 mb-2">
                <span className="fa fa-times mr-2" onClick={() => this.props.removeCustomer(customer)} />
                <span className={className}>{customer.username}</span>
            </div>
        );
    };

    render() {
        const { verifyCustomerResults, relatedCustomerResults } = this.props;
        const showAddRelatedCustomer = verifyCustomerResults.filter(item => item.isHeadline || item.isDirectAccount).length > 0;

        return (
            <div>
                <Row className="color-guide">
                    <Col sm="2" md="2"><span className="customer mr-3" />{LangHelper.getResource('Customer')}</Col>
                    <Col sm="2" md="2"><span className="guest mr-3" />{LangHelper.getResource('Guest')}</Col>
                    <Col sm="2" md="2"><span className="invalid mr-3" />{LangHelper.getResource('Invalid')}</Col>
                    <Col sm="2" md="2"><span className="inactive mr-3" />{LangHelper.getResource('Invalid')}</Col>
                </Row>
                <Row className="mt-2 mb-2">
                    <Col>
                        <div className="verify-customer-result">
                            <div className="customer-items">
                                {verifyCustomerResults.map(this.renderCustomerItem)}
                            </div>
                            {
                                showAddRelatedCustomer &&
                                <div className="pt-2" onClick={this.handleOpenAddRelatedCustomerDialog}>
                                    <span className="add-related-customer">
                                        {LangHelper.getResource(relatedCustomerResults.length > 0 ? 'UpdateRelatedCustomers' : 'AddRelatedCustomers')}
                                    </span>
                                </div>
                            }
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const {
        verifyCustomerResults, relatedCustomerResults
    } = state;
    return {
        verifyCustomerResults, relatedCustomerResults
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyCustomerResult);