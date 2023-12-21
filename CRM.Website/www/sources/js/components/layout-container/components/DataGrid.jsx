import React, { PureComponent } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Formik } from 'formik';
import LangHelper from '@jsroot/common/langHelper';
import FormikErrorMessage from '@jsroot/components/FormikErrorMessage';
import MultipleSelect from '@jsroot/components/multiple-select/index';
import { changeSiteSetting, checkHostPermissionOnCurrentCustomer } from '@jsroot/common/shareScripts';
import SelectWithSearch from '@jsroot/components/SelectWithSearch';
import SearchableDropdown from '@jsroot/components/SearchableDropdown';
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
            isShowDetail: true,
            countryId: null,
            isHostOnCurrentCustomer: false
        };
    }

    componentDidMount() {
        this.handleCheckLanguage();
        const leftContainer = document.getElementById('left-row-container');

        leftContainer.addEventListener("keydown", this.handleKeyDownFunc, false);
        checkHostPermissionOnCurrentCustomer().then(response => {
            this.setState({
                isHostOnCurrentCustomer: response
            });
        });
    }

    componentDidUpdate(prevProps) {
        if (JSON.stringify(prevProps.customerInfo) !== JSON.stringify(this.props.customerInfo)) {
            this.handleCheckLanguage();
            checkHostPermissionOnCurrentCustomer().then(response => {
                this.setState({
                    isHostOnCurrentCustomer: response
                });
            });
        }
        if (prevProps.customerInfo?.custId !== this.props.customerInfo?.custId) {
            this.setState({ siteId: null });
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
        const hasHostLicensee = document.getElementById('hasHostLicenseePermission').checked;
        const hasHostCredit = document.getElementById('hasHostCreditPermission').checked;
        const hasHostOnCurrentCustomer = hasHostPermissionOnCurrentCustomer(hasHostCredit, hasHostLicensee, this.props.customerInfo.customerType);
        return (
            <Form className="left-form-customer" id="left-form-container" noValidate onSubmit={handleSubmit}>
                <FormikErrorMessage touched={touched} errors={errors} fieldNames={Object.keys(values)} />
                <Form.Group className="mrb0">
                    {
                        values.uplineInfo.map((value, index) => {
                            return (
                                <Row className="item " key={index}>
                                    <Col className="text-left">
                                        {value.roleName}
                                    </Col>
                                    <Col className="text-left">
                                        {
                                            value.username === 'Unassigned'
                                                ? value.username
                                                : <span className='upline-username' onClick={() => this.props.handleSearchUplineInfo(value.username)}>{value.username}</span>
                                        }
                                    </Col>
                                    <Col className="status text-right">
                                        {value.status !== '' ? value.status : ''}
                                    </Col>
                                </Row>
                            );
                        })
                    }
                </Form.Group>
                <Form.Group className="row item current ">
                    <Col className="text-left">
                        {values.roleName}
                    </Col>
                    <Col className="text-left">
                        {values.username}
                    </Col>
                    <Col className="status text-right group-icon-acc">
                        <div className='show-icon'>
                            {
                                values.isGroupHeadLine &&
                                <img src={Site.resolveClientUrl('www/dist/css/images/icon/icon-acc-boss.png')} title='Headline Account' alt='icon acc boss' />
                            }
                            {
                                values.isVIP &&
                                <img src={Site.resolveClientUrl('www/dist/css/images/icon/icon-vip.png')} alt='icon vip'/>
                            }
                        </div>
                        {values.status}
                    </Col>
                </Form.Group>
                <Form.Group className="row item field-info">
                    <Form.Label column htmlFor="name" >
                        {LangHelper.getResource('Site')}
                    </Form.Label>
                    <Col >
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
                    <Form.Group className="row item inactive-site field-info">
                        <Form.Label column />
                        <Col >
                            {LangHelper.getResource('CannotCreateInactiveSite')}
                        </Col>
                    </Form.Group>
                }
                <Form.Group className="row item field-info country-select">
                    <Form.Label column htmlFor="name" >
                        {LangHelper.getResource('Country')}
                    </Form.Label>
                    <Col>
                        <SearchableDropdown
                            className='basic-single'
                            onChange={handleChange}
                            options={settings.countries}
                            value={values.countryId}
                            name="countryId"
                            isHideNA={false}
                            OnChangeValue={this.handleChangeCountry}
                        />
                    </Col>
                </Form.Group>

                <Form.Group className="row item field-info">
                    <Form.Label column htmlFor="name" >
                        {LangHelper.getResource('FirstName')}
                    </Form.Label>
                    <Col>
                        <Form.Control type="text" size="sm" className="shadow-none"
                            onChange={handleChange} name="firstName" value={values.firstName} autoComplete="off"
                        />
                    </Col>
                </Form.Group>
                <Form.Group className="row item field-info">
                    <Form.Label column htmlFor="lastName" >
                        {LangHelper.getResource('LastName')}
                    </Form.Label>
                    <Col>
                        <Form.Control type="text" size="sm" className="shadow-none"
                            onChange={handleChange} name="lastName" value={values.lastName} autoComplete="off"
                        />
                    </Col>
                </Form.Group>
                <Form.Group className="row item field-info">
                    <Form.Label column htmlFor="nickname" >
                        {LangHelper.getResource('Nickname')}
                    </Form.Label>
                    <Col>
                        <Form.Label size="sm" className="">
                            {values.nickname}
                        </Form.Label>
                    </Col>
                </Form.Group>
                <Form.Group className="row item field-info">
                    <Form.Label column htmlFor="name" >
                        {LangHelper.getResource('Language')}
                    </Form.Label>
                    <Col className="form-control-wrapper form-control-language">
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
                <Form.Group className="row item btn-submit">
                    <Col />
                    <Col>
                        {
                            hasHostOnCurrentCustomer &&
                            <Button variant="primary" size="sm" type="submit" disabled={isSubmitting}>
                                <UnderlineButton.updateButton />
                            </Button>
                        }
                    </Col>
                </Form.Group>
                {
                    values.isGroupHeadLine && this.renderAccountHeadlineInfo(values)
                }
                {
                    !values.isGroupHeadLine && this.renderOtherAccountInfo(values.otherAccountCommunicationInfos)
                }
                {
                    this.renderDetail(isShowInactiveMsg)
                }
            </Form>
        );
    };

    renderOtherAccountInfo = values => {
        if (values.length === 0) {
            return null;
        }
        return (
            <div className='form-account-info'>
                <div className='custom-scrollbar'>
                    <div className='account-item'>
                        {
                            values.map(value => {
                                return <>
                                    <Form.Group>
                                        <Form.Label >
                                            {value.communiationName}
                                        </Form.Label>
                                        <Col>
                                            {value.communicationValue}
                                        </Col>
                                    </Form.Group>
                                </>
                            })
                        }
                    </div>
                </div>
            </div>
        );
    };

    renderAccountHeadlineInfo = values => {
        if (values.headlineStaffInfoPics.length === 0) {
            return null;
        }
        return (
            <div className='form-account-info'>
                <div className='custom-scrollbar'>
                    {
                        values.headlineStaffInfoPics.map(pic => {
                            return (
                                <div className='account-item' key={pic.picID}>
                                    <Form.Group>
                                        <Form.Label htmlFor="name" >
                                            {LangHelper.getResource('Name')}
                                        </Form.Label>
                                        <Col className='field-name'>
                                            {pic.picName}
                                        </Col>
                                    </Form.Group>
                                    {
                                        values.headlineStaffInfoCommunications.map(value => {
                                            if (value.picID === pic.picID) {
                                                return <>
                                                    <Form.Group>
                                                        <Form.Label >
                                                            {value.picCommunicationName}
                                                        </Form.Label>
                                                        <Col>
                                                            {value.picCommunicationValue}
                                                        </Col>
                                                    </Form.Group>
                                                </>
                                            }
                                        })
                                    }
                                </div>
                            );
                        })
                    }
                </div>
            </div>

        );
    };

    renderDetail = isShowInactiveMsg => {
        const hasCreateFeedbackPermission = document.getElementById('hasCreateFeedbackPermission').checked;
        const hasReadFeedbackPermission = document.getElementById('hasReadFeedbackPermission').checked;
        const hasReadSitePermission = document.getElementById('hasReadSitePermission').checked;
        const hasHostPicManagementPermission = document.getElementById('hasHostPicManagementPermission').checked;

        return (
            <div className="group-detail-link">
                <Row className="title text-left btn-detail"
                    onClick={() => this.setState(prevState => ({ isShowDetail: !prevState.isShowDetail }))}
                >
                    {LangHelper.getResource('Detail')}
                    <i class="fa fa-caret-down" aria-hidden="true" />
                </Row>
                {
                    this.state.isShowDetail &&
                    <div className='detail-link-content'>
                        <Form.Group className="row form-row-detail">
                            <ul className='list-unstyled list-menu pull-left'>
                                {
                                    !isShowInactiveMsg && hasCreateFeedbackPermission &&
                                    <li>
                                        <a onClick={() => this.props.handleNavigate('AddFeedback')}>{LangHelper.getResource('AddFeedback')}</a>
                                    </li>
                                }
                                {
                                    hasReadFeedbackPermission &&
                                    <li>
                                        <a onClick={() => this.props.handleNavigate('ManageFeedback')}>{LangHelper.getResource('ManageFeedback')}</a>
                                    </li>
                                }
                            </ul>
                                
                            <ul className='list-unstyled list-menu pull-left list-menu-right'>
                                {
                                    hasReadFeedbackPermission &&
                                    <li>
                                        <a onClick={() => this.props.handleNavigate('LatestFeedback')}>{LangHelper.getResource('LatestFeedback')}</a>
                                    </li>
                                }
                                <li>
                                    <a onClick={() => this.props.handleNavigate('Communication')}>{LangHelper.getResource('CommunicationLog')}</a>
                                </li>
                            </ul>
                        </Form.Group>
                        <Form.Group className="row form-row-detail">
                            <ul className='list-unstyled list-menu pull-left'>
                                <li>
                                    <a onClick={() => this.props.handleNavigate('Dashboard')}>{LangHelper.getResource('Main')}</a>
                                </li>
                                <li>
                                    <a onClick={() => this.props.handleNavigate('Remark')}>{LangHelper.getResource('Remark')}</a>
                                </li>
                                {
                                    hasHostPicManagementPermission && 
                                    <li>
                                        <a onClick={() => this.props.handleNavigate('PicManagement')}>{LangHelper.getResource('PicManagement')}</a>
                                    </li>
                                }
                            </ul>
                            <ul className='list-unstyled list-menu pull-left list-menu-right'>
                                <li>
                                    <a onClick={() => this.props.handleNavigate('AccountDetail')}>{LangHelper.getResource('AccountDetail')}</a>
                                </li>
                                <li>
                                    <a onClick={() => this.props.handleNavigate('ActionLog')}>{LangHelper.getResource('ActivityLog')}</a>
                                </li>
                                {
                                    hasReadCustomerInfo &&
                                    <li>
                                        <a onClick={() => this.props.handleNavigate('Detail')}>{LangHelper.getResource('CRMInfo')}</a>
                                    </li>
                                }
                            </ul>
                        </Form.Group>
                    </div>
                }
            </div>
        );
    };

    handleChangeSite = item => {
        this.setState({
            siteId: item.id
        });
    };

    handleChangeCountry = item => {
        this.setState({
            countryId: item.id
        });
    };

    handleSubmit = async (values, { setSubmitting }) => {
        const data = {
            custId: values.custId,
            site: this.state.siteId === null ? values.siteId : this.state.siteId,
            countryId: this.state.countryId === null ? values.countryId : this.state.countryId,
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

    renderEmptyData = () => {
        return (<div className="left-form-customer" id="left-form-container">
            <Form.Group className="mrb0">
                <Row className="item  no-data">
                    {
                        LangHelper.getResource('EmptyData')
                    }
                </Row>
            </Form.Group>
        </div>);
    };

    render() {
        if (!this.props.customerInfo) {
            return this.renderEmptyData();
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
            isGroupHeadLine: customerInfo.isGroupHeadLine,
            headlineStaffInfoPics: customerInfo.headlineStaffInfoPics,
            headlineStaffInfoLanguages: customerInfo.headlineStaffInfoLanguages,
            headlineStaffInfoCommunications: customerInfo.headlineStaffInfoCommunications,
            otherAccountCommunicationInfos: customerInfo.otherAccountCommunicationInfos,
            isVIP: customerInfo.isVIP
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