import React, { Fragment, PureComponent } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import LangHelper from '@jsroot/common/langHelper';

export default class VerifyCustomer extends PureComponent {
    renderClassNameCustomer = item => {
        const isInActive = !item.isSiteActive && item.isLicensee;
        if (isInActive && item.custId !== 0) {
            return 'inactive';
        }
        else{
            if (item.custId === 0){
                return 'invalid';
            }
            return item.custId > 0 ? 'customer' : 'guest';
        }
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
                        <Col sm="2" md="2" className="inActiveShow">
                            {LangHelper.getResource('InactiveSite')}
                        </Col>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="pt-2 pb-2">
                    <Form.Label column sm="3" md="3" />
                    <Col sm="9" md="9">
                        <div className="customersList d-flex flex-wrap">
                            {
                                listOfCustomers.map((item, index) => {
                                    return (
                                        <div key={`${index}-${item.custId}`} className={`txt-${this.renderClassNameCustomer(item)}`}>
                                            <div onClick={() => this.props.onClick(item.custId)} className="pr-2 fa fa-times"/>
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