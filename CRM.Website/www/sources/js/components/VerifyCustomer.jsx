import React, { Fragment, PureComponent } from 'react';
import { Form, Row, Col } from 'react-bootstrap';
import LangHelper from '@jsroot/common/langHelper';

export default class VerifyCustomer extends PureComponent {
    renderClassNameCustomer = item => {
        let className = '';
        const isInActive = !item.isSiteActive && item.isLicensee;
        if (isInActive && item.custId !== 0) {
            className = 'inactive';
        } else{
            if (item.custId === 0) {
                className = 'invalid';
            } else if (!item.isAuthorized) {
                className = 'unauthorized';
            } else {
                className = item.custId > 0 ? 'customer' : 'guest';
            }
        }
        return className;
    };

    sizeColumn = (isBigColumnSize, isSmallWidth) =>{
        if(isBigColumnSize){
            return 10;
        }
        return isSmallWidth ? 8 : 9;
    };

    render() {
        const { listOfCustomers, isBigColumnSize, isSmallWidth} = this.props;
        const labelSize = 2;
        const columnSize = isBigColumnSize ? 10 : 9;
        const size = this.sizeColumn(isBigColumnSize, isSmallWidth);
        return listOfCustomers && listOfCustomers.length > 0 ?
            <Fragment>
                <Form.Group as={Row} className="pt-2 pb-2">
                    <Form.Label column sm={labelSize} md={labelSize} />
                    <Col sm={columnSize} md={columnSize} className="d-flex">
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
                        <Col sm="4" md="4" className="unAuthorizedShow">
                            {LangHelper.getResource('UnauthorizedAccess')}
                        </Col>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="pt-2 pb-2">
                    <Form.Label column sm={labelSize} md={labelSize} />
                    <Col sm={size} md={size}>
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