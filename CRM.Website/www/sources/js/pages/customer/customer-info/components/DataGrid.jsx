import React, { Component } from 'react';
import { PAGING_SIZES } from '@jsroot/common/constants';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { Formik } from 'formik';
import LangHelper from '@jsroot/common/langHelper';
import { renderSystemOption } from '../common.functions';


export class DataGrid extends Component {

    constructor(props) {
        super(props);
        this.formik = React.createRef();
        this.state = {
            languages: []
        };
    }

    componentDidMount() {
        this.props.getSettings();
    }

    componentDidUpdate(prevProps) {
        if(this.props.gridData !== prevProps.gridData)
        {
            console.log(this.props.gridData);
            const data = this.props.gridData.data;
            const languages = this.props.settings.languages.map(x => {
                return {
                    id: x.settingId,
                    name: x.settingName,
                    checked: data !== null ? (data.languages.some(y => y === x.settingId) ? true : false) : false  
                };
            });
            this.setState({
                languages
            });
        }
    }

    // eslint-disable-next-line react/sort-comp
    render() {
        const { isHost } = this.props;
        const arrLanguage = [{id:1, name: "English"}, {id: 2, name: "Japan"}, {id:3, name: "China"}];
        return (
            <Form className="form-filter" >
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
                        <Form.Control type="text" size="sm" className=""
                            onChange={this.handleChange} name="feedbackSubjectSearch" autoComplete="off"
                        />
                    </Col>
                </Form.Group>
                <Form.Group className="row item">
                    <Form.Label column md="3" htmlFor="name" >
                        {LangHelper.getResource('CustomerCountry')}
                    </Form.Label>
                    <Col md="9">
                        <Form.Control type="text" size="sm" className=""
                            onChange={this.handleChange} name="feedbackSubjectSearch" autoComplete="off"
                        />
                    </Col>
                </Form.Group>
                <Form.Group className="row item">
                    <Form.Label column md="3" htmlFor="name" >
                        {LangHelper.getResource('CustomerFirstName')}
                    </Form.Label>
                    <Col md="9">
                        <Form.Control type="text" size="sm" className=""
                            onChange={this.handleChange} name="feedbackSubjectSearch" autoComplete="off"
                        />
                    </Col>
                </Form.Group>
                <Form.Group className="row item">
                    <Form.Label column md="3" htmlFor="name" >
                        {LangHelper.getResource('CustomerLastName')}
                    </Form.Label>
                    <Col md="9">
                        <Form.Control type="text" size="sm" className=""
                            onChange={this.handleChange} name="feedbackSubjectSearch" autoComplete="off"
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

                <Form.Group className="row item">
                    <Form.Label column md="3" htmlFor="name" >
                        {LangHelper.getResource('CustomerPhone1')}
                    </Form.Label>
                    <Col md="9">
                        <Form.Control type="text" size="sm" className="textbox code-country"
                            onChange={this.handleChange} name="feedbackSubjectSearch" autoComplete="off"
                        />
                        <Form.Control type="text" size="sm" className="textbox code-area"
                            onChange={this.handleChange} name="feedbackSubjectSearch" autoComplete="off"
                        />
                        <Form.Control type="text" size="sm" className="textbox phone"
                            onChange={this.handleChange} name="feedbackSubjectSearch" autoComplete="off"
                        />
                    </Col>
                </Form.Group>

                <Form.Group className="row item">
                    <Form.Label column md="3" htmlFor="name" >
                        {LangHelper.getResource('CustomerPhone2')}
                    </Form.Label>
                    <Col md="9">
                        <Form.Control type="text" size="sm" className="textbox code-country"
                            onChange={this.handleChange} name="feedbackSubjectSearch" autoComplete="off"
                        />
                        <Form.Control type="text" size="sm" className="textbox code-area"
                            onChange={this.handleChange} name="feedbackSubjectSearch" autoComplete="off"
                        />
                        <Form.Control type="text" size="sm" className="textbox phone"
                            onChange={this.handleChange} name="feedbackSubjectSearch" autoComplete="off"
                        />
                    </Col>
                </Form.Group>

                <Form.Group className="row item">
                    <Form.Label column md="3" htmlFor="name" >
                        {LangHelper.getResource('CustomerPhone3')}
                    </Form.Label>
                    <Col md="9">
                        <Form.Control type="text" size="sm" className="textbox code-country"
                            onChange={this.handleChange} name="feedbackSubjectSearch" autoComplete="off"
                        />
                        <Form.Control type="text" size="sm" className="textbox code-area"
                            onChange={this.handleChange} name="feedbackSubjectSearch" autoComplete="off"
                        />
                        <Form.Control type="text" size="sm" className="textbox phone"
                            onChange={this.handleChange} name="feedbackSubjectSearch" autoComplete="off"
                        />
                    </Col>
                </Form.Group>

                <Form.Group className="row item">
                    <Form.Label column md="3" htmlFor="name" >
                        {LangHelper.getResource('CustomerMobile')}
                    </Form.Label>
                    <Col md="9">
                        <Form.Control type="text" size="sm" className="textbox code-country"
                            onChange={this.handleChange} name="feedbackSubjectSearch" autoComplete="off"
                        />
                        <Form.Control type="text" size="sm" className="textbox code-area"
                            onChange={this.handleChange} name="feedbackSubjectSearch" autoComplete="off"
                        />
                        <Form.Control type="text" size="sm" className="textbox phone"
                            onChange={this.handleChange} name="feedbackSubjectSearch" autoComplete="off"
                        />
                    </Col>
                </Form.Group>

                <Form.Group className="row item">
                    <Form.Label column md="3" htmlFor="name" >
                        {LangHelper.getResource('CustomerEmail')}
                    </Form.Label>
                    <Col md="9">
                        <Form.Control as="select" size="sm" className="shadow-none" id="systemId"
                            name="systemId"
                        >
                            {arrLanguage.map(renderSystemOption)}
                        </Form.Control>
                        </Col>
                </Form.Group>

                <Form.Group className="row item">
                    <Form.Label column md="3" htmlFor="name" >
                        {LangHelper.getResource('Telegram')}
                    </Form.Label>
                    <Col md="9">
                        <Form.Control as="select" size="sm" className="shadow-none" id="systemId"
                            name="systemId"
                        >
                            {arrLanguage.map(renderSystemOption)}
                        </Form.Control>
                        </Col>
                </Form.Group>

                <Form.Group className="row item">
                    <Form.Label column md="3" htmlFor="name" >
                        {LangHelper.getResource('CustomerSkype')}
                    </Form.Label>
                    <Col md="9">
                        <Form.Control as="select" size="sm" className="shadow-none" id="systemId"
                            name="systemId"
                        >
                            {arrLanguage.map(renderSystemOption)}
                        </Form.Control>
                        </Col>
                </Form.Group>

                <Form.Group className="row item">
                    <Form.Label column md="3" htmlFor="name" >
                        {LangHelper.getResource('PIC1')}
                    </Form.Label>
                    <Col md="9">
                        <Form.Control type="text" size="sm" className="textbox pic-name"
                            onChange={this.handleChange} name="feedbackSubjectSearch" autoComplete="off"
                        />
                        <Form.Control type="text" size="sm" className="textbox phone"
                            onChange={this.handleChange} name="feedbackSubjectSearch" autoComplete="off"
                        />
                    </Col>
                </Form.Group>

                <Form.Group className="row item">
                    <Form.Label column md="3" htmlFor="name" >
                        {LangHelper.getResource('PIC2')}
                    </Form.Label>
                    <Col md="9">
                        <Form.Control type="text" size="sm" className="textbox pic-name"
                            onChange={this.handleChange} name="feedbackSubjectSearch" autoComplete="off"
                        />
                        <Form.Control type="text" size="sm" className="textbox phone"
                            onChange={this.handleChange} name="feedbackSubjectSearch" autoComplete="off"
                        />
                    </Col>
                </Form.Group>

                <Form.Group className="row item">
                    <Form.Label column md="3" htmlFor="name" >
                        {LangHelper.getResource('PIC3')}
                    </Form.Label>
                    <Col md="9">
                        <Form.Control type="text" size="sm" className="textbox pic-name"
                            onChange={this.handleChange} name="feedbackSubjectSearch" autoComplete="off"
                        />
                        <Form.Control type="text" size="sm" className="textbox phone"
                            onChange={this.handleChange} name="feedbackSubjectSearch" autoComplete="off"
                        />
                    </Col>
                </Form.Group>

                <Form.Group className="row item">
                    <Form.Label column md="3" htmlFor="name" >
                        {LangHelper.getResource('PIC4')}
                    </Form.Label>
                    <Col md="9">
                        <Form.Control type="text" size="sm" className="textbox pic-name"
                            onChange={this.handleChange} name="feedbackSubjectSearch" autoComplete="off"
                        />
                        <Form.Control type="text" size="sm" className="textbox phone"
                            onChange={this.handleChange} name="feedbackSubjectSearch" autoComplete="off"
                        />
                    </Col>
                </Form.Group>

                <Form.Group className="row item">
                    <Col md="3" />
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
            languageId: customerInfo.languages.map(x => x).toString(),
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
                    validate={values => validateFormik(values)}
                    onSubmit={this.handleSubmit}
                >
                    {this.renderForm}
                </Formik>

            </Fragment>
            
        );
    }
}


export default DataGrid;
