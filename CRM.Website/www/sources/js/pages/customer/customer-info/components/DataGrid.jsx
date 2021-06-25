import React, { PureComponent, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { Formik } from 'formik';
import LangHelper from '@jsroot/common/langHelper';
import { renderSystemOption } from '../common.functions';
import FormikErrorMessage from '@jsroot/components/FormikErrorMessage';
import MultipleSelect from '../../../../components/multiple-select/index';
import { RoleIds } from '@jsroot/common/constants';

export class DataGrid extends PureComponent {

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
        isSubmitting,
        setFieldValue
    }) => {
        return (
            <Form className="form-customer"  noValidate onSubmit={handleSubmit}>
                <FormikErrorMessage touched={touched} errors={errors} fieldNames={Object.keys(values)} />
                <Form.Group className="mrb0">
                    {values.uplineInfo.map((value, index) => {
                        return (
                            <Row className="item" key={index}>
                                <Col md="3" className="text-left">
                                    {value.role.name}
                                </Col>
                                <Col md="5" className="text-left">
                                    { (value.userName === "Unassigned") ? 
                                    ( value.userName ) 
                                    : (<a href="#" onClick={() => this.handleSearchUplineInfo( value.userName )}>{value.userName}</a>)}
                                </Col>
                                <Col md="4" className="status text-right">
                                    {value.status != '' ? value.status : ' '}
                                </Col>
                            </Row>
                        )
                    })}
                </Form.Group>
                <Form.Group className="row item current">
                    <Col md="3" className="text-left">
                        {values.role.name}
                    </Col>
                    <Col md="5" className="text-left">
                        {values.userName}
                    </Col>
                    <Col md="4" className="status text-right">
                        {values.status}
                    </Col>
                </Form.Group>
                { (values.role.id == RoleIds.Member || values.role.id == RoleIds.CRMMember) ? (
                    <Form.Group className="row item">
                        <Form.Label column md="3" htmlFor="name" >
                                {LangHelper.getResource('Danger')}
                        </Form.Label>
                        <Col md="9">
                            <Row>
                                <Col md="3">
                                    {LangHelper.getResource('DangerOriginal')}
                                </Col>
                                <Col md="4">
                                    {LangHelper.getResource('DangerNonLive')}
                                </Col>
                                <Col md="5">
                                    {LangHelper.getResource('DangerOtherSports')}
                                </Col>
                            </Row>

                            <Row>
                                <Col md="3" >
                                    <span className={'lv' + values.originalDangerLevel}>{values.originalDangerLevel != 0 ? LangHelper.getResource('Lv1') + ' ' + values.originalDangerLevel : LangHelper.getResource('None')}</span>
                                </Col>
                                <Col md="4">
                                    <span className={'lv' + values.abtDangerLevel}>{values.abtDangerLevel != 0 ? LangHelper.getResource('Lv1')  + ' ' + values.abtDangerLevel : LangHelper.getResource('None')}</span>
                                </Col>
                                <Col md="5">
                                    <span className={'lv' + values.otherSportsDangerLevel}>{values.otherSportsDangerLevel != 0 ? LangHelper.getResource('Lv1')  + ' ' + values.otherSportsDangerLevel : LangHelper.getResource('None')}</span>
                                </Col>
                            </Row>
                        </Col>
                    </Form.Group>) 
                : (null)}

                <Form.Group className="row item no-border-bg">
                    <Form.Label column md="3" htmlFor="name" >
                        {LangHelper.getResource('CustomerSite')}
                    </Form.Label>
                    <Col md="9">
                    <Form.Control as="select" size="sm" className="shadow-none" id="siteId"
                            name="siteId"
                            value={values.siteId}
                            onChange={handleChange}
                        >
                            <option value="0" >N/A</option>
                            {this.props.settings.sites.map(renderSystemOption)}
                        </Form.Control>
                    </Col>
                </Form.Group>

                <Form.Group className="row item no-border-bg">
                    <Form.Label column md="3" htmlFor="name" >
                        {LangHelper.getResource('CustomerCountry')}
                    </Form.Label>
                    <Col md="9">
                    <Form.Control as="select" size="sm" className="shadow-none" id="countryId"
                            name="countryId"
                            value={values.countryId}
                            onChange={handleChange}
                        >
                            <option value="0" >N/A</option>
                            {this.props.settings.countries.map(renderSystemOption)}
                        </Form.Control>
                    </Col>
                </Form.Group>

                <Form.Group className="row item no-border-bg">
                    <Form.Label column md="3" htmlFor="name" >
                        {LangHelper.getResource('CustomerFirstName')}
                    </Form.Label>
                    <Col md="9">
                        <Form.Control type="text" size="sm" className=""
                            onChange={handleChange} name="firstName" value={values.firstName} autoComplete="off"
                        />
                    </Col>
                </Form.Group>
                <Form.Group className="row item no-border-bg">
                    <Form.Label column md="3" htmlFor="lastName" >
                        {LangHelper.getResource('CustomerLastName')}
                    </Form.Label>
                    <Col md="9">
                        <Form.Control type="text" size="sm" className=""
                            onChange={handleChange} name="lastName" value={values.lastName} autoComplete="off"
                        />
                    </Col>
                </Form.Group>
                <Form.Group className="row item no-border-bg">
                    <Form.Label column md="3" htmlFor="nickName" >
                        {LangHelper.getResource('CustomerNickName')}
                    </Form.Label>
                    <Col md="9">
                        <Form.Label size="sm" className="">
                            {values.nickName} 
                        </Form.Label>
                    </Col>
                </Form.Group>
                <Form.Group className="row item no-border-bg">
                    <Form.Label column md="3" htmlFor="name" >
                        {LangHelper.getResource('CustomerLanguage')}
                    </Form.Label>
                    <Col md="9" className="form-control-wrapper">
                    <MultipleSelect
                        isInvalid={touched.languageId && errors.languageId}
                        dataSource={this.props.settings.languages}
                        keyField='settingId'
                        valueField='settingName'
                        statusField='checked'
                        isAllTextShown
                        onChange={(currentItem, selectedItemsKey) => {
                            setFieldValue('languageId', selectedItemsKey);
                        }}
                    />
                    </Col>
                </Form.Group>

                <Row className="item title text-left">{LangHelper.getResource('CommunicationTool')}</Row>

                <Form.Group className="row item no-border-bg">
                    <Form.Label column md="3" htmlFor="phoneCountryCode" >
                        {LangHelper.getResource('CustomerPhone1')}
                    </Form.Label>
                    <Col md="9">
                        <Form.Control type="text" size="sm" className="textbox code-country"
                            onChange={handleChange} name="phoneCountryCode" value={values.phoneCountryCode} autoComplete="off"
                        />
                        <Form.Control type="text" size="sm" className="textbox code-area"
                            onChange={handleChange} name="phoneAreaCode" value={values.phoneAreaCode} autoComplete="off"
                        />
                        <Form.Control type="text" size="sm" className="textbox phone"
                            onChange={handleChange} name= "phone" value={values.phone} autoComplete="off"
                        />
                    </Col>
                </Form.Group>

                <Form.Group className="row item no-border-bg">
                    <Form.Label column md="3" htmlFor="phoneCountryCode" >
                        {LangHelper.getResource('CustomerPhone2')}
                    </Form.Label>
                    <Col md="9">
                        <Form.Control type="text" size="sm" className="textbox code-country"
                            onChange={handleChange} name="phone2CountryCode" value={values.phone2CountryCode} autoComplete="off"
                        />
                        <Form.Control type="text" size="sm" className="textbox code-area"
                            onChange={handleChange} name="phone2AreaCode" value={values.phone2AreaCode} autoComplete="off"
                        />
                        <Form.Control type="text" size="sm" className="textbox phone"
                            onChange={handleChange} name= "phone2" value={values.phone2} autoComplete="off"
                        />
                    </Col>
                </Form.Group>

                <Form.Group className="row item no-border-bg">
                    <Form.Label column md="3" htmlFor="phoneCountryCode" >
                        {LangHelper.getResource('CustomerPhone3')}
                    </Form.Label>
                    <Col md="9">
                        <Form.Control type="text" size="sm" className="textbox code-country"
                            onChange={handleChange} name="phone3CountryCode" value={values.phone3CountryCode} autoComplete="off"
                        />
                        <Form.Control type="text" size="sm" className="textbox code-area"
                            onChange={handleChange} name="phone3AreaCode" value={values.phone3AreaCode} autoComplete="off"
                        />
                        <Form.Control type="text" size="sm" className="textbox phone"
                            onChange={handleChange} name= "phone3" value={values.phone3} autoComplete="off"
                        />
                    </Col>
                </Form.Group>

                <Form.Group className="row item no-border-bg">
                    <Form.Label column md="3" htmlFor="mobile" >
                        {LangHelper.getResource('CustomerMobile')}
                    </Form.Label>
                    <Col md="9">
                        <Form.Control type="text" size="sm" className="textbox code-country"
                            onChange={handleChange} name="mobilePhoneCountryCode" value={values.mobilePhoneCountryCode} autoComplete="off"
                        />
                        <Form.Control type="text" size="sm" className="textbox code-area"
                            onChange={handleChange} name="mobilePhoneAreaCode" value={values.mobilePhoneAreaCode} autoComplete="off"
                        />
                        <Form.Control type="text" size="sm" className="textbox phone"
                            onChange={handleChange} name="mobilePhone" value={values.mobilePhone} autoComplete="off"
                        />
                    </Col>
                </Form.Group>

                <Form.Group className="row item no-border-bg">
                    <Form.Label column md="3" htmlFor="email" >
                        {LangHelper.getResource('CustomerEmail')}
                    </Form.Label>
                    <Col md="9">
                        <Form.Control type="text" size="sm" className=""
                            onChange={handleChange} name="email" value={values.email} autoComplete="off"
                        />
                    </Col>
                </Form.Group>

                <Form.Group className="row item no-border-bg">
                    <Form.Label column md="3" htmlFor="msn" >
                        {LangHelper.getResource('Telegram')}
                    </Form.Label>
                    <Col md="9">
                        <Form.Control type="text" size="sm" className=""
                            onChange={handleChange} name="msn" value={values.msn} autoComplete="off"
                        />
                    </Col>
                </Form.Group>

                <Form.Group className="row item no-border-bg">
                    <Form.Label column md="3" htmlFor="skype" >
                        {LangHelper.getResource('Skype')}
                    </Form.Label>
                    <Col md="9">
                        <Form.Control type="text" size="sm" className=""
                            onChange={handleChange} name="skype" value={values.skype} autoComplete="off"
                        />
                    </Col>
                </Form.Group>

                <Form.Group className="row item no-border-bg">
                    <Form.Label column md="3" htmlFor="name" >
                        {LangHelper.getResource('PIC1')}
                    </Form.Label>
                    <Col md="9">
                        <Form.Control type="text" size="sm" className="textbox pic-name"
                            onChange={handleChange} name="pic1Name" value={values.pic1Name} autoComplete="off"
                        />
                        <Form.Control type="text" size="sm" className="textbox phone"
                            onChange={handleChange} name="pic1" value={values.pic1} autoComplete="off"
                        />
                    </Col>
                </Form.Group>

                <Form.Group className="row item no-border-bg">
                    <Form.Label column md="3" htmlFor="name" >
                        {LangHelper.getResource('PIC2')}
                    </Form.Label>
                    <Col md="9">
                        <Form.Control type="text" size="sm" className="textbox pic-name"
                            onChange={handleChange} name="pic2Name" value={values.pic2Name} autoComplete="off"
                        />
                        <Form.Control type="text" size="sm" className="textbox phone"
                            onChange={handleChange} name="pic2" value={values.pic2} autoComplete="off"
                        />
                    </Col>
                </Form.Group>

                <Form.Group className="row item no-border-bg">
                    <Form.Label column md="3" htmlFor="name" >
                        {LangHelper.getResource('PIC3')}
                    </Form.Label>
                    <Col md="9">
                        <Form.Control type="text" size="sm" className="textbox pic-name"
                            onChange={handleChange} name="pic3Name" value={values.pic3Name} autoComplete="off"
                        />
                        <Form.Control type="text" size="sm" className="textbox phone"
                            onChange={handleChange} name="pic3" value={values.pic3} autoComplete="off"
                        />
                    </Col>
                </Form.Group>

                <Form.Group className="row item no-border-bg">
                    <Form.Label column md="3" htmlFor="name" >
                        {LangHelper.getResource('PIC4')}
                    </Form.Label>
                    <Col md="9">
                        <Form.Control type="text" size="sm" className="textbox pic-name"
                            onChange={handleChange} name="pic4Name" value={values.pic4Name} autoComplete="off"
                        />
                        <Form.Control type="text" size="sm" className="textbox phone"
                            onChange={handleChange} name="pic4" value={values.pic4} autoComplete="off"
                        />
                    </Col>
                </Form.Group>

                <Form.Group className="row item no-border-bg">
                    <Col md="3"></Col>
                    <Col md="9">
                        <Button className="mr-4" variant="primary" size="sm" type="submit" disabled={isSubmitting}
                            >
                                {LangHelper.getResource('Submit')}
                        </Button>
                    </Col>
                </Form.Group>

            </Form>
        );
    
    }

    handleSubmit = (values, { setSubmitting }) => {
        const data = {
            site: values.siteId,
            countryId: values.countryId,
            provinceID: this.props.gridData.data.provinceID,
            firstName: values.firstName,
            lastName: values.lastName,
            language: values.languageId,
            phone: values.phone,
            phoneCountryCode: values.phoneCountryCode,
            phoneAreaCode: values.phoneAreaCode,
            phone2CountryCode: values.phone2CountryCode,
            phone2AreaCode: values.phone2AreaCode,
            phone2: values.phone2,
            phone3CountryCode: values.phone3CountryCode,
            phone3AreaCode: values.phone3AreaCode,
            phone3: values.phone3,
            mobilePhoneCountryCode: values.mobilePhoneCountryCode,
            mobilePhoneAreaCode: values.mobilePhoneAreaCode,
            mobilePhone: values.mobilePhone,
            email: values.email,
            msn: values.msn,
            skype: values.skype,
            pic1Name: values.pic1Name,
            pic1: values.pic1,
            pic2Name: values.pic2Name,
            pic2: values.pic2,
            pic3Name: values.pic3Name,
            pic3: values.pic3,
            pic4Name: values.pic4Name,
            pic4: values.pic4,
            custId: this.props.gridData.data.id,

        };

        setSubmitting(true);
        this.props.editCustomerInfo(data).then(() => {
            if (this.props.editCustomerInfoResult.isSuccessful) {
                setTimeout(() => {
                    this.props.onSuccess();
                    this.props.setEditCustomerInfoPopup({ show : true });
                    setSubmitting(false);
                }, 3000);
            } else {
                setSubmitting(false);
            }
        });

    }

    handleSearchUplineInfo = userName => {
        const params = {
            ...this.props.gridParams,
            UserName: userName
        }
        this.props.setGridParams(params);
        this.props.getCustomerInfo(params);
    };

    render() {
        if (!this.props.gridData || !this.props.gridData.data) {
            return null;
        }
        var customerInfo =  this.props.gridData.data;
        
        const initialValues = {
            userName: customerInfo.userName || '',
            siteId: customerInfo.siteID || 0,
            countryId: customerInfo.countryID || 0,
            firstName: customerInfo.firstName || '',
            lastName: customerInfo.lastName || '',
            nickName: customerInfo.nickName || '', 
            languageId: customerInfo.languageID || 0,
            phoneInfo: customerInfo.phoneInfo || '',
            phoneCountryCode: customerInfo.phoneCountryCode || '',
            phoneAreaCode: customerInfo.phoneAreaCode || '',
            phone: customerInfo.phone || '',
            phone2CountryCode: customerInfo.phone2CountryCode || '',
            phone2AreaCode: customerInfo.phone2AreaCode || '',
            phone2: customerInfo.phone2 || '',
            phone3CountryCode: customerInfo.phone3CountryCode || '',
            phone3AreaCode: customerInfo.phone3AreaCode || '',
            phone3: customerInfo.phone3 || '',
            phoneCountryCode: customerInfo.phoneCountryCode || '',
            phoneAreaCode: customerInfo.phoneAreaCode || '',
            phone: customerInfo.phone || '',
            mobilePhoneCountryCode: customerInfo.mobilePhoneCountryCode || '',
            mobilePhoneAreaCode: customerInfo.mobilePhoneAreaCode || '',
            mobilePhone: customerInfo.mobilePhone || '',
            email: customerInfo.email || '',
            telegram: customerInfo.telegram || '',
            msn: customerInfo.msn || '',
            skype: customerInfo.skype || '',
            pic1Name: customerInfo.pic1Name || '',
            pic1: customerInfo.pic1 || '',
            pic2Name: customerInfo.pic2Name || '',
            pic2: customerInfo.pic2 || '',
            pic3Name: customerInfo.pic3Name || '',
            pic3: customerInfo.pic3 || '',
            pic4Name: customerInfo.pic4Name || '',
            pic4: customerInfo.pic4 || '',
            pics: customerInfo.personalInfoContacts || '',
            role: customerInfo.role,
            uplineInfo: customerInfo.uplineInfo,
            status: customerInfo.status,
            originalDangerLevel: customerInfo.originalDangerLevel,
            abtDangerLevel: customerInfo.abtDangerLevel,
            otherSportsDangerLevel: customerInfo.otherSportsDangerLevel,
            
        };

        const { isHost } = this.props;
        return (
            <Fragment>
                <Formik
                    enableReinitialize // enable re render when change initValue
                    innerRef={p => (this.formik = p)}
                    initialValues={initialValues}
                    onSubmit={this.handleSubmit}
                >
                    {this.renderForm}
                </Formik>

            </Fragment>
            
        );
    }
}



const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { 
        gridParams, 
        gridData, 
        settings, 
        editCustomerInfo,
        editCustomerInfoResult,
        editCustomerInfoPopup
    } = state;
    return {
        gridParams,
        gridData,
        settings,
        editCustomerInfo,
        editCustomerInfoResult,
        editCustomerInfoPopup
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);
