import React, { Fragment, PureComponent } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import LangHelper from '@jsroot/common/langHelper';

export default class VerifyCustomer extends PureComponent {
    renderClassNameCustomer = id => {
        if (id === 0) {
            return 'invalid';
        }
        return id > 0 ? 'customer' : 'guest';
    };

    render() {
        const { listOfCustomers } = this.props;
        return listOfCustomers && listOfCustomers.length > 0 ?
            <Fragment>
                <Form.Group as={Row} className="pt-2 pb-2">
                    <Form.Label column sm="3" md="3" />
                    <Col sm="9" md="9" className="d-flex">
                        <Col sm="2" md="2" className="customerShow">
                            {LangHelper.getResource('Customer')}
                        </Col>
                        <Col sm="2" md="2" className="guestShow">
                            {LangHelper.getResource('Guest')}
                        </Col>
                        <Col sm="2" md="2" className="invalidShow">
                            {LangHelper.getResource('Invalid')}
                        </Col>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="pt-2 pb-2">
                    <Form.Label column sm="3" md="3" />
                    <Col sm="9" md="9">
                        <div className="d-flex flex-wrap customersList">
                            {
                                listOfCustomers.map((item, index) => {
                                    return (
                                        <div className={`txt-${this.renderClassNameCustomer(item.custId)}`} key={index}>
                                            <div className="fa fa-times pr-2" onClick={() => this.props.onClick(item.custId)} />
                                            <div className="customer-name">{item.val}</div>
                                        </div>);
                                })
                            }
                        </div>
                    </Col>
                </Form.Group>
            </Fragment>
            : null;
    }
}