import React, { PureComponent } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Formik } from 'formik';
import LangHelper from '@jsroot/common/langHelper';
import { renderSystemOption, validateFormik } from '../common.functions';
import FormikErrorMessage from '@jsroot/components/FormikErrorMessage';
import MultipleSelect from '@jsroot/components/multiple-select/index';
import { RoleIds } from '@jsroot/common/constants';
import SelectWithSearch from '@jsroot/components/SelectWithSearch';
import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import { toast } from 'react-toastify';

export default class DataGrid extends PureComponent {
    static defaultProps = {
        customerInfo: null,
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
        const data = this.props.customerInfo;
        const languages = this.props.settings.languages.map(x => {
            return {
                languageId: x.languageId,
                name: x.name,
                checked: data !== null ? data.languages.some(y => y === x.languageId) : false
            };
        });

        this.setState({
            languages
        });
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
        const {customerInfo, settings} = this.props;
        const isShowInactiveMsg = settings.sitesLicenseeInactive.filter(x=> x.id === customerInfo.siteId).length > 0;

        return (
            <Form className="left-form-customer" id="left-form-container" noValidate onSubmit={handleSubmit}>
                <FormikErrorMessage touched={touched} errors={errors} fieldNames={Object.keys(values)} />
                <Form.Group className="mrb0">
                    {
                        values.uplineInfo.map((value, index) => {
                            return (
                                <Row className="item" key={index}>
                                    <Col md="3" className="text-left">
                                        {value.role.name}
                                    </Col>
                                    <Col md="5" className="text-left">
                                        {
                                            value.username === 'Unassigned'
                                                ? value.username
                                                : <a href="#" onClick={() => this.handleSearchUplineInfo(value.username)}>{value.username}</a>
                                        }
                                    </Col>
                                    <Col md="4" className="status text-right">
                                        {value.status !== '' ? value.status : ''}
                                    </Col>
                                </Row>
                            );
                        })
                    }
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
                {
                    (values.role.id === RoleIds.Member || values.role.id === RoleIds.CRMMember) &&
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
                                    <span className={'lv' + values.originalDangerLevel}>
                                        {
                                            values.originalDangerLevel !== 0
                                                ? `${LangHelper.getResource('Lv1')} ${values.originalDangerLevel}`
                                                : LangHelper.getResource('None')
                                        }
                                    </span>
                                </Col>
                                <Col md="4">
                                    <span className={'lv' + values.abtDangerLevel}>
                                        {
                                            values.abtDangerLevel !== 0
                                                ? `${LangHelper.getResource('Lv1')} ${values.abtDangerLevel}`
                                                : LangHelper.getResource('None')
                                        }
                                    </span>
                                </Col>
                                <Col md="5">
                                    <span className={'lv' + values.otherSportsDangerLevel}>
                                        {
                                            values.otherSportsDangerLevel !== 0
                                                ? `${LangHelper.getResource('Lv1')} ${values.otherSportsDangerLevel}`
                                                : LangHelper.getResource('None')
                                        }
                                    </span>
                                </Col>
                            </Row>
                        </Col>
                    </Form.Group>
                }

                <Form.Group className="row item no-border-bg">
                    <Form.Label column md="3" htmlFor="name" >
                        {LangHelper.getResource('Site')}
                    </Form.Label>
                    <Col md="9">
                        <SelectWithSearch
                            className='basic-single'
                            onChange={handleChange}
                            options={settings.sites}
                            value={values.siteId}
                            name={values.site.name}
                            isHideNA={false}
                            OnChangeValue={this.handleChangeSite}
                        />
                    </Col>
                </Form.Group>
                {
                    isShowInactiveMsg &&
                    <Form.Group className="row item no-border-bg inactive-site">
                        <Form.Label column md="3" />
                        <Col md="9">
                            {LangHelper.getResource('CannotCreateInactiveSite')}
                        </Col>
                    </Form.Group>
                }
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
                            <option value="0">N/A</option>
                            {settings.countries.map(renderSystemOption)}
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
                            keyField='languageId'
                            valueField='name'
                            statusField='checked'
                            isNAOption
                            isAllTextShown
                            onChange={(currentItem, selectedItemsKey) => {
                                setFieldValue('languageId', selectedItemsKey);
                            }}
                        />
                    </Col>
                </Form.Group>

                { this.renderCommunicationTool(values, handleChange, isSubmitting) }
            </Form>
        );
    };

    renderCommunicationTool = (values, handleChange, isSubmitting) => {
        return (
            <div>
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

                <Form.Group className="row item no-border-bg pb-2">
                    <Col md="3" />
                    <Col md="9">
                        <Button className="mr-4 mt-1" variant="primary" size="sm" type="submit" disabled={isSubmitting}>
                            {LangHelper.getResource('Update')}
                        </Button>
                    </Col>
                </Form.Group>
            </div>
        );
    };

    handleChangeSite = item => {
        this.setState({
            siteId: item.id
        });
    };

    handleSubmit = async (values, { setSubmitting }) => {
        const data = {
            custId: values.custId,
            site: this.state.siteId || values.siteId,
            countryId: values.countryId,
            provinceId: this.props.customerInfo.provinceId,
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
        Site.blockUI();
        const url = Site.resolveClientUrl('CustomerInfo/EditCustomerInfo');
        await DataService.postDataAsync(url,data).then(response => {
            if (response.data.isSuccessful) {
                this.props.handleCloseEditCustomerInfoPopup();
                this.props.getCustomerInfo();
                toast.success(LangHelper.getResource('UpdateCRMInfoSuccessful'));
            } else {
                toast.error(LangHelper.getResource(response.data.message));
                this.props.handleCloseEditCustomerInfoPopup();
                setSubmitting(false);
            }
        }).then(() => Site.unblockUI());
    };

    handleSearchUplineInfo = username => {
        const params = {
            ...this.props.gridParams,
            username
        };
        this.props.setGridParams(params);
        this.props.getCustomerInfo();
    };

    render() {
        if (!this.props.customerInfo) {
            return null;
        }

        const customerInfo = this.props.customerInfo;
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
            phoneInfo: customerInfo.phoneInfo,
            phoneCountryCode: customerInfo.phoneCountryCode,
            phoneAreaCode: customerInfo.phoneAreaCode,
            phone: customerInfo.phone,
            phone2CountryCode: customerInfo.phone2CountryCode,
            phone2AreaCode: customerInfo.phone2AreaCode,
            phone2: customerInfo.phone2,
            phone3CountryCode: customerInfo.phone3CountryCode,
            phone3AreaCode: customerInfo.phone3AreaCode,
            phone3: customerInfo.phone3,
            mobilePhoneCountryCode: customerInfo.mobilePhoneCountryCode,
            mobilePhoneAreaCode: customerInfo.mobilePhoneAreaCode,
            mobilePhone: customerInfo.mobilePhone,
            email: customerInfo.email,
            telegram: customerInfo.telegram,
            msn: customerInfo.msn,
            skype: customerInfo.skype,
            pic1Name: customerInfo.pic1Name,
            pic1: customerInfo.pic1,
            pic2Name: customerInfo.pic2Name,
            pic2: customerInfo.pic2,
            pic3Name: customerInfo.pic3Name,
            pic3: customerInfo.pic3,
            pic4Name: customerInfo.pic4Name,
            pic4: customerInfo.pic4,
            pics: customerInfo.personalInfoContacts,
            role: customerInfo.role,
            uplineInfo: customerInfo.uplineInfo,
            status: customerInfo.status,
            originalDangerLevel: customerInfo.originalDangerLevel,
            abtDangerLevel: customerInfo.abtDangerLevel,
            otherSportsDangerLevel: customerInfo.otherSportsDangerLevel
        };
        return (
            <Formik
                enableReinitialize
                innerRef={p => this.formik = p}
                initialValues={initialValues}
                validate={values => validateFormik(values)}
                onSubmit={this.handleSubmit}
            >
                {this.renderForm}
            </Formik>
        );
    }
}