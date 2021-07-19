import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { Formik } from 'formik';
import LangHelper from '@jsroot/common/langHelper';
import { renderSystemOption, validateFormik } from '../common.functions';
import FormikErrorMessage from '@jsroot/components/FormikErrorMessage';
import MultipleSelect from '../../../../components/multiple-select/index';
import { RoleIds } from '@jsroot/common/constants';
import SelectWithSearch from '@jsroot/components/SelectWithSearch';

export class DataGrid extends Component {
    static defaultProps = {
        gridData: [],
        settings: {
            sites: [],
            countries: [],
            languages: []
        },
        editCustomerInfoResult: {},
        getSettings: {}
    };
    constructor(props) {
        super(props);
        this.state = {
            languages: [],
            siteId: null
        };
    }

    componentDidMount() {
        this.props.getSettings();
    }

    componentDidUpdate(prevProps) {
        if (this.props.gridData !== prevProps.gridData) {
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

    renderForm = ({
        errors,
        values,
        handleChange,
        touched,
        handleSubmit,
        isSubmitting,
        setFieldValue,
    }) => {
        return (
            <Form className="form-customer" noValidate onSubmit={handleSubmit}>
                <FormikErrorMessage touched={touched} errors={errors} fieldNames={Object.keys(values)} />
                <Form.Group className="mrb0">
                    {values.uplineInfo.map((value, index) => {
                        return (
                            <Row className="item" key={index}>
                                <Col md="3" className="text-left">
                                    {value.role.name}
                                </Col>
                                <Col md="5" className="text-left">
                                    {
                                        value.username === 'Unassigned' ?
                                            value.username
                                            : <a href="#" onClick={() => this.handleSearchUplineInfo(value.username)}>{value.username}</a>
                                    }
                                </Col>
                                <Col md="4" className="status text-right">
                                    {value.status !== '' ? value.status : ' '}
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
                        {values.username}
                    </Col>
                    <Col md="4" className="status text-right">
                        {values.status}
                    </Col>
                </Form.Group>
                { (values.role.id === RoleIds.Member || values.role.id === RoleIds.CRMMember) ? (
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
                                    <span className={'lv' + values.originalDangerLevel}>{values.originalDangerLevel !== 0 ? LangHelper.getResource('Lv1') + ' ' + values.originalDangerLevel : LangHelper.getResource('None')}</span>
                                </Col>
                                <Col md="4">
                                    <span className={'lv' + values.abtDangerLevel}>{values.abtDangerLevel !== 0 ? LangHelper.getResource('Lv1') + ' ' + values.abtDangerLevel : LangHelper.getResource('None')}</span>
                                </Col>
                                <Col md="5">
                                    <span className={'lv' + values.otherSportsDangerLevel}>{values.otherSportsDangerLevel !== 0 ? LangHelper.getResource('Lv1') + ' ' + values.otherSportsDangerLevel : LangHelper.getResource('None')}</span>
                                </Col>
                            </Row>
                        </Col>
                    </Form.Group>)
                    : (null)}

                <Form.Group className="row item no-border-bg">
                    <Form.Label column md="3" htmlFor="name" >
                        {LangHelper.getResource('Site')}
                    </Form.Label>
                    <Col md="9">
                        <SelectWithSearch
                            className='basic-single'
                            onChange={handleChange}
                            options={this.props.settings.sites}
                            value={values.siteId}
                            name={values.site.name}
                            isHideNA={false}
                            OnChangeValue={this.handleChangeSite}
                        />
                    </Col>
                </Form.Group>
                <Form.Group className="row item no-border-bg">
                    <Form.Label column md="3" htmlFor="name" >
                        {LangHelper.getResource('Country')}
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
                        {LangHelper.getResource('FirstName')}
                    </Form.Label>
                    <Col md="9">
                        <Form.Control type="text" size="sm" className="shadow-none"
                            onChange={handleChange} name="firstName" value={values.firstName} autoComplete="off"
                        />
                    </Col>
                </Form.Group>
                <Form.Group className="row item no-border-bg">
                    <Form.Label column md="3" htmlFor="lastName" >
                        {LangHelper.getResource('LastName')}
                    </Form.Label>
                    <Col md="9">
                        <Form.Control type="text" size="sm" className="shadow-none"
                            onChange={handleChange} name="lastName" value={values.lastName} autoComplete="off"
                        />
                    </Col>
                </Form.Group>
                <Form.Group className="row item no-border-bg">
                    <Form.Label column md="3" htmlFor="nickname" >
                        {LangHelper.getResource('Nickname')}
                    </Form.Label>
                    <Col md="9">
                        <Form.Label size="sm" className="">
                            {values.nickname}
                        </Form.Label>
                    </Col>
                </Form.Group>
                <Form.Group className="row item no-border-bg">
                    <Form.Label column md="3" htmlFor="name" >
                        {LangHelper.getResource('Language')}
                    </Form.Label>
                    <Col md="9" className="form-control-wrapper">
                        <MultipleSelect
                            isInvalid={touched.languageId && errors.languageId}
                            dataSource={this.state.languages}
                            keyField='id'
                            valueField='name'
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
                        {LangHelper.getResource('Phone1')}
                    </Form.Label>
                    <Col md="9">
                        <Form.Control type="text" size="sm" className="shadow-none textbox code-country"
                            onChange={handleChange} name="phoneCountryCode" value={values.phoneCountryCode} autoComplete="off"
                        />
                        <Form.Control type="text" size="sm" className="shadow-none textbox code-area"
                            onChange={handleChange} name="phoneAreaCode" value={values.phoneAreaCode} autoComplete="off"
                        />
                        <Form.Control type="text" size="sm" className="shadow-none textbox phone"
                            onChange={handleChange} name="phone" value={values.phone} autoComplete="off"
                        />
                    </Col>
                </Form.Group>

                <Form.Group className="row item no-border-bg">
                    <Form.Label column md="3" htmlFor="phoneCountryCode" >
                        {LangHelper.getResource('Phone2')}
                    </Form.Label>
                    <Col md="9">
                        <Form.Control type="text" size="sm" className="shadow-none textbox code-country"
                            onChange={handleChange} name="phone2CountryCode" value={values.phone2CountryCode} autoComplete="off"
                        />
                        <Form.Control type="text" size="sm" className="shadow-none textbox code-area"
                            onChange={handleChange} name="phone2AreaCode" value={values.phone2AreaCode} autoComplete="off"
                        />
                        <Form.Control type="text" size="sm" className="shadow-none textbox phone"
                            onChange={handleChange} name="phone2" value={values.phone2} autoComplete="off"
                        />
                    </Col>
                </Form.Group>

                <Form.Group className="row item no-border-bg">
                    <Form.Label column md="3" htmlFor="phoneCountryCode" >
                        {LangHelper.getResource('Phone3')}
                    </Form.Label>
                    <Col md="9">
                        <Form.Control type="text" size="sm" className="shadow-none textbox code-country"
                            onChange={handleChange} name="phone3CountryCode" value={values.phone3CountryCode} autoComplete="off"
                        />
                        <Form.Control type="text" size="sm" className="shadow-none textbox code-area"
                            onChange={handleChange} name="phone3AreaCode" value={values.phone3AreaCode} autoComplete="off"
                        />
                        <Form.Control type="text" size="sm" className="shadow-none textbox phone"
                            onChange={handleChange} name="phone3" value={values.phone3} autoComplete="off"
                        />
                    </Col>
                </Form.Group>

                <Form.Group className="row item no-border-bg">
                    <Form.Label column md="3" htmlFor="mobile" >
                        {LangHelper.getResource('Mobile')}
                    </Form.Label>
                    <Col md="9">
                        <Form.Control type="text" size="sm" className="shadow-none textbox code-country"
                            onChange={handleChange} name="mobilePhoneCountryCode" value={values.mobilePhoneCountryCode} autoComplete="off"
                        />
                        <Form.Control type="text" size="sm" className="shadow-none textbox code-area"
                            onChange={handleChange} name="mobilePhoneAreaCode" value={values.mobilePhoneAreaCode} autoComplete="off"
                        />
                        <Form.Control type="text" size="sm" className="shadow-none textbox phone"
                            onChange={handleChange} name="mobilePhone" value={values.mobilePhone} autoComplete="off"
                        />
                    </Col>
                </Form.Group>

                <Form.Group className="row item no-border-bg">
                    <Form.Label column md="3" htmlFor="email">
                        {LangHelper.getResource('Email')}
                    </Form.Label>
                    <Col md="9">
                        <Form.Control type="text" size="sm" className="shadow-none"
                            onChange={handleChange} name="email" value={values.email} autoComplete="off"
                        />
                    </Col>
                </Form.Group>

                <Form.Group className="row item no-border-bg">
                    <Form.Label column md="3" htmlFor="msn" >
                        {LangHelper.getResource('Telegram')}
                    </Form.Label>
                    <Col md="9">
                        <Form.Control type="text" size="sm" className="shadow-none"
                            onChange={handleChange} name="msn" value={values.msn} autoComplete="off"
                        />
                    </Col>
                </Form.Group>

                <Form.Group className="row item no-border-bg">
                    <Form.Label column md="3" htmlFor="skype" >
                        {LangHelper.getResource('Skype')}
                    </Form.Label>
                    <Col md="9">
                        <Form.Control type="text" size="sm" className="shadow-none"
                            onChange={handleChange} name="skype" value={values.skype} autoComplete="off"
                        />
                    </Col>
                </Form.Group>

                <Form.Group className="row item no-border-bg">
                    <Form.Label column md="3" htmlFor="name" >
                        {LangHelper.getResource('PIC1')}
                    </Form.Label>
                    <Col md="9">
                        <Form.Control type="text" size="sm" className="shadow-none textbox pic-name"
                            onChange={handleChange} name="pic1Name" value={values.pic1Name} autoComplete="off"
                        />
                        <Form.Control type="text" size="sm" className="shadow-none textbox phone"
                            onChange={handleChange} name="pic1" value={values.pic1} autoComplete="off"
                        />
                    </Col>
                </Form.Group>

                <Form.Group className="row item no-border-bg">
                    <Form.Label column md="3" htmlFor="name" >
                        {LangHelper.getResource('PIC2')}
                    </Form.Label>
                    <Col md="9">
                        <Form.Control type="text" size="sm" className="shadow-none textbox pic-name"
                            onChange={handleChange} name="pic2Name" value={values.pic2Name} autoComplete="off"
                        />
                        <Form.Control type="text" size="sm" className="shadow-none textbox phone"
                            onChange={handleChange} name="pic2" value={values.pic2} autoComplete="off"
                        />
                    </Col>
                </Form.Group>

                <Form.Group className="row item no-border-bg">
                    <Form.Label column md="3" htmlFor="name" >
                        {LangHelper.getResource('PIC3')}
                    </Form.Label>
                    <Col md="9">
                        <Form.Control type="text" size="sm" className="shadow-none textbox pic-name"
                            onChange={handleChange} name="pic3Name" value={values.pic3Name} autoComplete="off"
                        />
                        <Form.Control type="text" size="sm" className="shadow-none textbox phone"
                            onChange={handleChange} name="pic3" value={values.pic3} autoComplete="off"
                        />
                    </Col>
                </Form.Group>

                <Form.Group className="row item no-border-bg">
                    <Form.Label column md="3" htmlFor="name" >
                        {LangHelper.getResource('PIC4')}
                    </Form.Label>
                    <Col md="9">
                        <Form.Control type="text" size="sm" className="shadow-none textbox pic-name"
                            onChange={handleChange} name="pic4Name" value={values.pic4Name} autoComplete="off"
                        />
                        <Form.Control type="text" size="sm" className="shadow-none textbox phone"
                            onChange={handleChange} name="pic4" value={values.pic4} autoComplete="off"
                        />
                    </Col>
                </Form.Group>

                <Form.Group className="row item no-border-bg">
                    <Col md="3"></Col>
                    <Col md="9">
                        <Button className="mr-4" variant="primary" size="sm" type="submit" disabled={isSubmitting}
                        >
                            {LangHelper.getResource('Update')}
                        </Button>
                    </Col>
                </Form.Group>

            </Form>
        );
    }

    handleChangeSite = (item) => {
        this.setState({
            siteId: item.id
        });
    }

    handleSubmit = (values, { setSubmitting }) => {
        const data = {
            custId: values.custId,
            site: this.state.siteId || values.siteId,
            countryId: values.countryId,
            provinceId: this.props.gridData.data.provinceId,
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
            pic4: values.pic4
        };

        setSubmitting(true);
        this.props.editCustomerInfo(data).then(() => {
            if (this.props.editCustomerInfoResult.isSuccessful) {
                setTimeout(() => {
                    this.props.onSuccess();
                    this.props.setEditCustomerInfoPopup({ show: true });
                    setSubmitting(false);
                }, 3000);
            } else {
                setSubmitting(false);
            }
        });
    }

    handleSearchUplineInfo = username => {
        const params = {
            ...this.props.gridParams,
            username
        };
        this.props.setGridParams(params);
        this.props.getCustomerInfo(params);
    };

    render() {
        if (!this.props.gridData || !this.props.gridData.data) {
            return null;
        }

        let customerInfo = this.props.gridData.data;
        const initialValues = {
            custId: customerInfo.custId,
            username: customerInfo.username || '',
            siteId: customerInfo.siteId || 0,
            site: customerInfo.siteSetting || '',
            countryId: customerInfo.countryId || 0,
            firstName: customerInfo.firstName || '',
            lastName: customerInfo.lastName || '',
            nickname: customerInfo.nickname || '',
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

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const {
        gridParams,
        gridData,
        settings,
        editCustomerInfoResult,
        editCustomerInfoPopup,
        getSettings
    } = state;
    return {
        gridParams,
        gridData,
        settings,
        editCustomerInfoResult,
        editCustomerInfoPopup,
        getSettings
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DataGrid);