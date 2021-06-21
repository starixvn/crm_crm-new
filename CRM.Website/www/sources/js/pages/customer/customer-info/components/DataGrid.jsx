import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { Formik } from 'formik';
import LangHelper from '@jsroot/common/langHelper';
import { renderSystemOption } from '../common.functions';
import FormikErrorMessage from '@jsroot/components/FormikErrorMessage';


export class DataGrid extends Component {

    constructor(props) {
        super(props);
        this.formik = React.createRef();
    }

    renderForm = ({
        errors,
        values,
        handleChange,
        touched,
        handleSubmit,
        isSubmitting
    }) => {
        console.log(values);
        const arrLanguage = [{id:1, name: "English"}, {id: 2, name: "Japan"}, {id:3, name: "China"}];
        const status = values.status ? 'Active' : 'Lock';
        return (
            <Form className="form-filter"  noValidate onSubmit={handleSubmit}>
                <FormikErrorMessage touched={touched} errors={errors} fieldNames={Object.keys(values)} />
                <Form.Group className="row item">
                    {values.uplineInfo.map((value, index) => {
                        return (
                            <Fragment key={index}>
                                <Col md="3">
                                    {value.role.name}
                                </Col>
                                <Col md="5">
                                    {value.userName}
                                </Col>
                            </Fragment>
                        )
                    })}
                </Form.Group>
                <Form.Group className="row item">
                    <Col md="3">
                        {values.role.name}
                    </Col>
                    <Col md="5">
                        {values.userName}
                    </Col>
                    <Col md="4">
                        {status}
                    </Col>

                </Form.Group>
                <Form.Group className="row item">
                    <Form.Label column md="3" htmlFor="name" >
                            {LangHelper.getResource('CustomerSite')}
                    </Form.Label>
                    <Col md="9">
                        <Form.Control type="text" size="sm" className=""
                            onChange={handleChange} name="feedbackSubjectSearch" autoComplete="off"
                        />
                    </Col>
                </Form.Group>
                <Form.Group className="row item">
                    <Form.Label column md="3" htmlFor="name" >
                        {LangHelper.getResource('CustomerCountry')}
                    </Form.Label>
                    <Col md="9">
                        <Form.Control type="text" size="sm" className=""
                            onChange={handleChange} name="feedbackSubjectSearch" autoComplete="off"
                        />
                    </Col>
                </Form.Group>
                <Form.Group className="row item">
                    <Form.Label column md="3" htmlFor="name" >
                        {LangHelper.getResource('CustomerFirstName')}
                    </Form.Label>
                    <Col md="9">
                        <Form.Control type="text" size="sm" className=""
                            onChange={this.handleChange} name="firstName" value={values.firstName} autoComplete="off"
                        />
                    </Col>
                </Form.Group>
                <Form.Group className="row item">
                    <Form.Label column md="3" htmlFor="lastName" >
                        {LangHelper.getResource('CustomerLastName')}
                    </Form.Label>
                    <Col md="9">
                        <Form.Control type="text" size="sm" className=""
                            onChange={this.handleChange} name="lastName" value={values.lastName} autoComplete="off"
                        />
                    </Col>
                </Form.Group>
                <Form.Group className="row item">
                    <Form.Label column md="3" htmlFor="name" >
                        {LangHelper.getResource('CustomerLanguage')}
                    </Form.Label>
                    <Col md="9">
                        <Form.Control as="select" size="sm" className="shadow-none" id="systemId"
                            name="systemId"
                        >
                            {arrLanguage.map(renderSystemOption)}
                        </Form.Control>
                    </Col>
                </Form.Group>

                <div>{LangHelper.getResource('CommunicationTool')}</div>

                {values.phoneInfo.map((value, index) => {
                    const number = index !== 0 ? index + 1 : '';
                    const phone = 'phone' + number;
                    return(
                        <Form.Group className="row item" key={index}>
                            <Form.Label column md="3" htmlFor="name" >
                                {LangHelper.getResource('CustomerPhone' + (index + 1))}
                            </Form.Label>
                            <Col md="9">
                                <Form.Control type="text" size="sm" className="textbox code-country"
                                    onChange={handleChange} name={phone + 'CountryCode'} value={value.countryCode} autoComplete="off"
                                />
                                <Form.Control type="text" size="sm" className="textbox code-area"
                                    onChange={handleChange} name={phone + 'AreaCode'} value={value.areaCode} autoComplete="off"
                                />
                                <Form.Control type="text" size="sm" className="textbox phone"
                                    onChange={handleChange} name= {phone} value={value.phoneNumber} autoComplete="off"
                                />
                            </Col>
                        </Form.Group>
                    )
                })}

                <Form.Group className="row item">
                    <Form.Label column md="3" htmlFor="mobile" >
                        {LangHelper.getResource('CustomerMobile')}
                    </Form.Label>
                    <Col md="9">
                        <Form.Control type="text" size="sm" className="textbox code-country"
                            onChange={this.handleChange} name="MobilePhoneCountryCode" value={values.mobile.countryCode} autoComplete="off"
                        />
                        <Form.Control type="text" size="sm" className="textbox code-area"
                            onChange={this.handleChange} name="MobilePhoneAreaCode" value={values.mobile.areaCode} autoComplete="off"
                        />
                        <Form.Control type="text" size="sm" className="textbox phone"
                            onChange={this.handleChange} name="MobilePhone" value={values.mobile.phoneNumber} autoComplete="off"
                        />
                    </Col>
                </Form.Group>

                <Form.Group className="row item">
                    <Form.Label column md="3" htmlFor="email" >
                        {LangHelper.getResource('CustomerEmail')}
                    </Form.Label>
                    <Col md="9">
                        <Form.Control type="text" size="sm" className=""
                            onChange={this.handleChange} name="email" value={values.email} autoComplete="off"
                        />
                    </Col>
                </Form.Group>

                <Form.Group className="row item">
                    <Form.Label column md="3" htmlFor="msn" >
                        {LangHelper.getResource('Telegram')}
                    </Form.Label>
                    <Col md="9">
                        <Form.Control type="text" size="sm" className=""
                            onChange={this.handleChange} name="msn" value={values.skype} autoComplete="off"
                        />
                    </Col>
                </Form.Group>

                <Form.Group className="row item">
                    <Form.Label column md="3" htmlFor="skype" >
                        {LangHelper.getResource('CustomerSkype')}
                    </Form.Label>
                    <Col md="9">
                        <Form.Control type="text" size="sm" className=""
                            onChange={this.handleChange} name="skype" value={values.skype} autoComplete="off"
                        />
                    </Col>
                </Form.Group>
                {values.pics.map((value, index) => {
                    const label = 'pic' + (index + 1);
                    const phoneName = label + 'name';
                    return(
                        <Form.Group className="row item" key={index}>
                            <Form.Label column md="3" htmlFor="name" >
                                {LangHelper.getResource(label.toUpperCase())}
                            </Form.Label>
                            <Col md="9">
                                <Form.Control type="text" size="sm" className="textbox pic-name"
                                    onChange={this.handleChange} name={phoneName} value={value.name} autoComplete="off"
                                />
                                <Form.Control type="text" size="sm" className="textbox phone"
                                    onChange={this.handleChange} name={label} value={value.phone} autoComplete="off"
                                />
                            </Col>
                        </Form.Group>
                    )
                })}

                <Form.Group className="row item">
                    <Col md="3"></Col>
                    <Col md="9">
                        <Button className="mr-4" variant="primary" size="sm"
                                onClick={this.handleSubmit}
                            >
                                {LangHelper.getResource('Submit')}
                        </Button>
                    </Col>
                </Form.Group>

            </Form>
        );
    
    }

    handleSubmit = () => {
        
    }

    handleChange = () => {

    }




    render() {
        if (!this.props.gridData || !this.props.gridData.data) {
            return null;
        }
        const customerInfo =  this.props.gridData.data;
        const initialValues = {
            userName: customerInfo.userName,
            siteId: customerInfo.siteID,
            countryId: customerInfo.countryID,
            firstName: customerInfo.firstName,
            lastName: customerInfo.lastName,
            languageId: customerInfo.languageID,
            phoneInfo: customerInfo.phoneInfo,
            mobile: customerInfo.mobile,
            email: customerInfo.email,
            telegram: customerInfo.telegram,
            skype: customerInfo.msn,
            pics: customerInfo.personalInfoContacts,
            role: customerInfo.role,
            uplineInfo: customerInfo.uplineInfo,
            status: customerInfo.status
        };

        const { isHost } = this.props;
        return (
            <Formik
                innerRef={p => (this.formik = p)}
                initialValues={initialValues}
                onSubmit={this.handleSubmit}
            >
                {this.renderForm}
            </Formik>
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
