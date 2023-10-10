import React, { Fragment, PureComponent } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Formik } from 'formik';
import LangHelper from '@jsroot/common/langHelper';
import FormikErrorMessage from '@jsroot/components/FormikErrorMessage';
import MultipleSelect from '@jsroot/components/multiple-select/index';
import { changeSiteSetting, hasHostPermissionOnCurrentCustomer } from '@jsroot/common/shareScripts';
import SelectWithSearch from '@jsroot/components/SelectWithSearch';
import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import { toast } from 'react-toastify';
import UnderlineButton from '@jsroot/common/underlineButton';
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
            siteId: null,
            isShowDetail: true
        };
    }

    componentDidMount() {
        this.handleCheckLanguage();
        const leftContainer = document.getElementById('left-row-container');
        leftContainer.addEventListener("keydown", this.handleKeyDownFunc, false);
    }

    componentDidUpdate(prevProps) {
        if (JSON.stringify(prevProps.customerInfo) !== JSON.stringify(this.props.customerInfo)) {
            this.handleCheckLanguage();
        }
    }

    componentWillUnmount() {
        const leftContainer = document.getElementById('left-row-container');
        if (leftContainer) {
            leftContainer.removeEventListener("keydown", this.handleKeyDownFunc, false);
        }
    }

    handleKeyDownFunc = event => {
        if (event.ctrlKey && event.key === 'u') {
            event.preventDefault();
            const { values, setSubmitting } = this.formik;
            this.handleSubmit(values, { setSubmitting });
        }
    }

    handleCheckLanguage = () => {
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
    };

    renderSystemOption = item => <option key={item.id} value={item.id} >{item.name}</option>;

    renderForm = ({
        errors,
        values,
        handleChange,
        touched,
        handleSubmit,
        isSubmitting,
        setFieldValue
    }) => {
        const { customerInfo, settings } = this.props;
        const isShowInactiveMsg = settings.sitesLicenseeInactive.filter(x => x.id === customerInfo.siteId).length > 0;
        const siteOptions = changeSiteSetting(settings.sites, 'childSites', 'childSites');
        return (
            <Form className="left-form-customer" id="left-form-container" noValidate onSubmit={handleSubmit}>
                <FormikErrorMessage touched={touched} errors={errors} fieldNames={Object.keys(values)} />
                <Form.Group className="mrb0">
                    {
                        values.uplineInfo.map((value, index) => {
                            return (
                                <Row className="item align-items-end" key={index}>
                                    <Col md="3" className="text-left pl-1">
                                        {value.roleName}
                                    </Col>
                                    <Col md="5" className="text-left">
                                        {
                                            value.username === 'Unassigned'
                                                ? value.username
                                                : <span className='upline-username' onClick={() => this.props.handleSearchUplineInfo(value.username)}>{value.username}</span>
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
                <Form.Group className="row item current align-items-end">
                    <Col md="3" className="text-left pl-1">
                        {values.roleName}
                    </Col>
                    <Col md="5" className="text-left">
                        {values.username}
                    </Col>
                    <Col md="4" className="status text-right">
                        {values.status}
                    </Col>
                </Form.Group>
                <Form.Group className="row item no-border-bg align-items-end">
                    <Form.Label column md="3" htmlFor="name" >
                        {LangHelper.getResource('Site')}
                    </Form.Label>
                    <Col md="9">
                        <SelectWithSearch
                            className='basic-single'
                            onChange={handleChange}
                            options={siteOptions}
                            value={values.siteId}
                            name={values.site.name}
                            isHideNA={false}
                            OnChangeValue={this.handleChangeSite}
                        />
                    </Col>
                </Form.Group>
                {
                    isShowInactiveMsg &&
                    <Form.Group className="row item no-border-bg inactive-site align-items-end">
                        <Form.Label column md="3" />
                        <Col md="9">
                            {LangHelper.getResource('CannotCreateInactiveSite')}
                        </Col>
                    </Form.Group>
                }
                <Form.Group className="row item no-border-bg align-items-end">
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
                            {settings.countries.map(this.renderSystemOption)}
                        </Form.Control>
                    </Col>
                </Form.Group>

                <Form.Group className="row item no-border-bg align-items-end">
                    <Form.Label column md="3" htmlFor="name" >
                        {LangHelper.getResource('FirstName')}
                    </Form.Label>
                    <Col md="9">
                        <Form.Control type="text" size="sm" className="shadow-none"
                            onChange={handleChange} name="firstName" value={values.firstName} autoComplete="off"
                        />
                    </Col>
                </Form.Group>
                <Form.Group className="row item no-border-bg align-items-end">
                    <Form.Label column md="3" htmlFor="lastName" >
                        {LangHelper.getResource('LastName')}
                    </Form.Label>
                    <Col md="9">
                        <Form.Control type="text" size="sm" className="shadow-none"
                            onChange={handleChange} name="lastName" value={values.lastName} autoComplete="off"
                        />
                    </Col>
                </Form.Group>
                <Form.Group className="row item no-border-bg align-items-end">
                    <Form.Label column md="3" htmlFor="nickname" >
                        {LangHelper.getResource('Nickname')}
                    </Form.Label>
                    <Col md="9">
                        <Form.Label size="sm" className="">
                            {values.nickname}
                        </Form.Label>
                    </Col>
                </Form.Group>
                <Form.Group className="row item no-border-bg align-items-end">
                    <Form.Label column md="3" htmlFor="name" >
                        {LangHelper.getResource('Language')}
                    </Form.Label>
                    <Col md="9" className="form-control-wrapper form-control-language">
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
                {
                    values.isGroupHeadLine &&
                    <Form.Group className="row item no-border-bg align-items-end">
                        <Form.Label column md="3" />
                        <Col md="9" className="form-control-wrapper">
                            <Form.Check className="checked-headline" type="checkbox" name="isGroupHeadLine"
                                label={LangHelper.getResource('Headline')} checked disabled
                            />
                        </Col>
                    </Form.Group>
                }
                {
                    this.renderCommunicationTool(values, handleChange, isSubmitting)
                }
                {
                    this.renderDetail(isShowInactiveMsg)
                }
            </Form>
        );
    };

    renderCommunicationTool = (values, handleChange, isSubmitting) => {
        const hasHostLicensee = document.getElementById('hasHostLicenseePermission').checked;
        const hasHostCredit = document.getElementById('hasHostCreditPermission').checked;
        const hasHostOnCurrentCustomer = hasHostPermissionOnCurrentCustomer(hasHostCredit, hasHostLicensee, this.props.customerInfo.customerType);
        return (
            <div className="hightlight-title">
                <Row className="item title text-left">{LangHelper.getResource('CommunicationTool')}</Row>
                <Form.Group className="row item no-border-bg align-items-end">
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

                <Form.Group className="row item no-border-bg align-items-end">
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

                <Form.Group className="row item no-border-bg align-items-end">
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

                <Form.Group className="row item no-border-bg align-items-end">
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

                <Form.Group className="row item no-border-bg align-items-end">
                    <Form.Label column md="3" htmlFor="email">
                        {LangHelper.getResource('Email')}
                    </Form.Label>
                    <Col md="9">
                        <Form.Control type="text" size="sm" className="shadow-none"
                            onChange={handleChange} name="email" value={values.email} autoComplete="off"
                        />
                    </Col>
                </Form.Group>

                <Form.Group className="row item no-border-bg align-items-end">
                    <Form.Label column md="3" htmlFor="msn" >
                        {LangHelper.getResource('Telegram')}
                    </Form.Label>
                    <Col md="9">
                        <Form.Control type="text" size="sm" className="shadow-none"
                            onChange={handleChange} name="msn" value={values.msn} autoComplete="off"
                        />
                    </Col>
                </Form.Group>

                <Form.Group className="row item no-border-bg align-items-end">
                    <Form.Label column md="3" htmlFor="skype" >
                        {LangHelper.getResource('Skype')}
                    </Form.Label>
                    <Col md="9">
                        <Form.Control type="text" size="sm" className="shadow-none"
                            onChange={handleChange} name="skype" value={values.skype} autoComplete="off"
                        />
                    </Col>
                </Form.Group>

                <Form.Group className="row item no-border-bg align-items-end">
                    <Form.Label column md="3" htmlFor="name" >
                        {LangHelper.getResource('PIC1')}
                    </Form.Label>
                    <Col md="9">
                        <Form.Control type="text" size="sm" className="shadow-none textbox pic-name"
                            onChange={handleChange} name="pic1Name" value={values.pic1Name} autoComplete="off"
                        />
                        <Form.Control type="text" size="sm" className="shadow-none textbox pic-width"
                            onChange={handleChange} name="pic1" value={values.pic1} autoComplete="off"
                        />
                    </Col>
                </Form.Group>

                <Form.Group className="row item no-border-bg align-items-end">
                    <Form.Label column md="3" htmlFor="name" >
                        {LangHelper.getResource('PIC2')}
                    </Form.Label>
                    <Col md="9">
                        <Form.Control type="text" size="sm" className="shadow-none textbox pic-name"
                            onChange={handleChange} name="pic2Name" value={values.pic2Name} autoComplete="off"
                        />
                        <Form.Control type="text" size="sm" className="shadow-none textbox pic-width"
                            onChange={handleChange} name="pic2" value={values.pic2} autoComplete="off"
                        />
                    </Col>
                </Form.Group>

                <Form.Group className="row item no-border-bg align-items-end">
                    <Form.Label column md="3" htmlFor="name" >
                        {LangHelper.getResource('PIC3')}
                    </Form.Label>
                    <Col md="9">
                        <Form.Control type="text" size="sm" className="shadow-none textbox pic-name"
                            onChange={handleChange} name="pic3Name" value={values.pic3Name} autoComplete="off"
                        />
                        <Form.Control type="text" size="sm" className="shadow-none textbox pic-width"
                            onChange={handleChange} name="pic3" value={values.pic3} autoComplete="off"
                        />
                    </Col>
                </Form.Group>

                <Form.Group className="row item no-border-bg align-items-end">
                    <Form.Label column md="3" htmlFor="name" >
                        {LangHelper.getResource('PIC4')}
                    </Form.Label>
                    <Col md="9">
                        <Form.Control type="text" size="sm" className="shadow-none textbox pic-name"
                            onChange={handleChange} name="pic4Name" value={values.pic4Name} autoComplete="off"
                        />
                        <Form.Control type="text" size="sm" className="shadow-none textbox pic-width"
                            onChange={handleChange} name="pic4" value={values.pic4} autoComplete="off"
                        />
                    </Col>
                </Form.Group>
                <Form.Group className="row item no-border-bg align-items-end">
                    <Col md="3" />
                    <Col md="9">
                        {
                            hasHostOnCurrentCustomer &&
                            <Button className="mr-4 mt-1" variant="primary" size="sm" type="submit" disabled={isSubmitting}>
                                <UnderlineButton.updateButton />
                            </Button>
                        }
                    </Col>
                </Form.Group>
            </div>
        );
    };

    renderDetail = isShowInactiveMsg => {
        const hasCreateFeedbackPermission = document.getElementById('hasCreateFeedbackPermission').checked;
        const hasReadFeedbackPermission = document.getElementById('hasReadFeedbackPermission').checked;
        const hasReadCustomerInfo = document.getElementById('hasReadCustomerInfo').checked;

        return (
            <div className="hightlight-title">
                <Row className="item title text-left btn-detail"
                    onClick={() => this.setState(prevState => ({ isShowDetail: !prevState.isShowDetail }))}
                >
                    {LangHelper.getResource('Detail')}
                </Row>
                {
                    this.state.isShowDetail &&
                    <Form.Group className="row item no-border-bg form-row-detail">
                        <ul className='list-unstyled list-menu pull-left'>
                            {
                                hasReadCustomerInfo &&
                                <li>
                                    <i className="fa fa-angle-right" aria-hidden="true" />
                                    <a onClick={() => this.props.handleNavigate('Detail')}>{LangHelper.getResource('CRMInfo')}</a>
                                </li>
                            }
                            {
                                !isShowInactiveMsg && hasCreateFeedbackPermission &&
                                <li>
                                    <i className="fa fa-angle-right" aria-hidden="true" />
                                    <a onClick={() => this.props.handleNavigate('AddFeedback')}>{LangHelper.getResource('AddFeedback')}</a>
                                </li>
                            }
                        </ul>
                        {
                            hasReadFeedbackPermission &&
                            <ul className='list-unstyled list-menu pull-left'>
                                <li>
                                    <i className="fa fa-angle-right" aria-hidden="true" />
                                    <a onClick={() => this.props.handleNavigate('LatestFeedback')}>{LangHelper.getResource('LatestFeedback')}</a>
                                </li>
                                <li>
                                    <i className="fa fa-angle-right" aria-hidden="true" />
                                    <a onClick={() => this.props.handleNavigate('ManageFeedback')}>{LangHelper.getResource('ManageFeedback')}</a>
                                </li>
                            </ul>
                        }
                    </Form.Group>
                }
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
            site: this.state.siteId === null ? values.siteId : this.state.siteId,
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
            msn: !values.msn ? '' : values.msn,
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
        await DataService.postDataAsync(url, data).then(response => {
            if (response.data.isSuccessful) {
                setSubmitting(false);
                this.props.handleCloseEditCustomerInfoPopup();
                this.props.getCustomerInfo();
                toast.success(LangHelper.getResource('UpdateCRMInfoSuccessful'));
            } else {
                toast.error(LangHelper.getResource(response.data.message));
                this.props.handleCloseEditCustomerInfoPopup();
                setSubmitting(false);
            }
        }).then(() => Site.unblockUI()).catch(Site.handleAxiosError);
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
            nickname: customerInfo.nickname,
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
            roleId: customerInfo.roleId,
            roleName: customerInfo.roleName,
            uplineInfo: customerInfo.uplineInfo,
            status: customerInfo.status,
            isGroupHeadLine: customerInfo.isGroupHeadLine
        };
        return (
            <Formik
                enableReinitialize
                innerRef={p => this.formik = p}
                initialValues={initialValues}
                onSubmit={this.handleSubmit}
            >
                {this.renderForm}
            </Formik>
        );
    }
}