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
                <Form.Group as={Row} className="pt-3 pb-3">
                    <Form.Label column sm="3" md="3" />
                    <Col sm="9" md="9" className="d-flex">
                        <div className="pl-2 mr-5 customerShow">
                            {LangHelper.getResource('Customer')}
                        </div>
                        <div className="pl-2 mr-5 guestShow">
                            {LangHelper.getResource('Guest')}
                        </div>
                        <div className="pl-2 mr-5 invalidShow">
                            {LangHelper.getResource('Invalid')}
                        </div>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="pt-3 pb-3">
                    <Form.Label column sm="3" md="3" />
                    <Col sm="9" md="9">
                        <div className="d-flex flex-wrap customersList">
                            {
                                listOfCustomers.map((item, index) => {
                                    return (
                                        <div className={`m-2 px-2 txt-${this.renderClassNameCustomer(item.custId)}`} key={index}>
                                            <div className="fa fa-times  pr-2" onClick={() => this.props.onClick(item.custId)} />
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