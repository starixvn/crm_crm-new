import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import HeadlineStaffsAndAuthority from './HeadlineStaffsAndAuthority';
import HeadlineCommunicationInfo from './HeadlineCommunicationInfo';
import CompanyService from './CompanyService';
import { Button, Form, Alert } from 'react-bootstrap';
import LangHelper from '@jsroot/common/langHelper';
import SelectWithSearch from '@jsroot/components/SelectWithSearch';
import SearchableDropdown from '@jsroot/components/SearchableDropdown';
import { Policy, FunctionKey, FieldErrorHeadlineCommunicationInfo } from '@jsroot/common/constants';
import { ParamsCustomerInfo, ParamsSubmit } from '../common.functions';
import { toast } from 'react-toastify';
import MultipleSelect from '@jsroot/components/multiple-select/index';
import DatePicker from '@jsroot/components/date-picker/index';
import { changeSiteSetting, hasHostPermissionOnCurrentCustomer, getPermission } from '@jsroot/common/shareScripts';
import DateTimeService from '@jsroot/common/dateTimeService';
import Site from '@jsroot/common/site';

export class AppContainer extends Component {
    constructor(props) {
        super(props);
        const currentClientTime = new Date(DateTimeService.toLongDateTimeFormat(DateTimeService.toClientDateTime(new Date())));
        this.state = {
            updateHeadlineInfoPolicy: null,
            activeTab: 'headlineCommunicationInfo',
            isSubmitting: false,
            titleId: 0,
            firstName: '',
            lastName: '',
            maxDate: new Date(DateTimeService.toShortDateFormat(currentClientTime)),
            birthDay: '',
            passport: '',
            refCode2: '',
            languages: [],
            siteId: 0,
            refCode1: '',
            licenseeTypeId: 0,
            isVip: false,
            isIgnored: false,
            phoneCountryCode: '',
            phoneAreaCode: '',
            phone: '',
            phone2CountryCode: '',
            phone2AreaCode: '',
            phone2: '',
            phone3CountryCode: '',
            phone3AreaCode: '',
            phone3: '',
            checker: '',
            introducedBy: '',
            faxCountryCode: '',
            faxAreaCode: '',
            faxNumber: '',
            mobileCountryCode: '',
            mobileAreaCode: '',
            mobilePhoneNumber: '',
            pic1Name: '',
            pic1PhoneNumber: '',
            pic2Name: '',
            pic2PhoneNumber: '',
            pic3Name: '',
            pic3PhoneNumber: '',
            pic4Name: '',
            pic4PhoneNumber: '',
            skype: '',
            email: '',
            telegram: '',
            weChat: '',
            whatsApp: '',
            line: '',
            letstalk: '',
            qq: '',
            zalo: '',
            homeAddressLine1: '',
            homeAddressLine2: '',
            homeAddressLine3: '',
            homeAddressCity: '',
            homeAddressCountryId: 0,
            homeAddressState: '',
            homeAddressPostCode: '',
            bankInfoHolderName: '',
            bankInfoName: '',
            bankInfoAccNo: '',
            bankInfoSwiftCode: '',
            bankAddressLine1: '',
            bankAddressLine2: '',
            bankAddressLine3: '',
            bankAddressCity: '',
            bankAddressCountryId: 0,
            bankAddressState: '',
            bankAddressPostCode: ''
        };
      }

    async componentDidMount() {
        await this.props.getAllSettings();
        await this.props.getCustomerById({ customerId: this.props.id });
        getPermission(FunctionKey.UpdateHeadlineInfo, true).then(response => {
            this.setState({ updateHeadlineInfoPolicy: response });
        });
        const { customerInfo } = this.props;
        const params = ParamsCustomerInfo(customerInfo);
        this.setState(params);
        document.title = LangHelper.getResource('CRMSystem');
    }

    handleSubmit = () => {
        const values = this.state;
        const { customerInfo } = this.props;
        const params = ParamsSubmit(customerInfo.custId, values);
        this.props.editCustomerInfoDetail(params).then(() => {
            if (this.props.editCustomerInfoDetailResult.isSuccessful) {
                toast.success(LangHelper.getResource('EditCustomerInfoSuccessfully'));
            } 
        });
    };

    handleTabClick = (tabName) => {
        this.setState({ activeTab: tabName });
    };

    handleChangeCountry = item => {
        this.setState({
            homeAddressCountryId: item.id
        });
    };

    handleChangeValue = (name, value) => {
        this.setState({
            [name]: value
        });
    };

    renderOptions = (name, item) => <option key={item} value={item}>{name}</option>;

    handleChangeCheck = event => {
        const name = event.target.name;
        this.setState({
            [name]: event.target.checked
        });
    };

    handleChange = event => {
        const name = event.target.name;
        this.setState({
            [name]: event.target.type === 'select-one' ? parseInt(event.target.value, 10) : event.target.value
        });
    };    

    renderErrors = errors => {
        return (
            <>
                {
                    errors &&
                    <Alert variant='danger'>
                        <ul className='list-message-error'>
                            {
                                FieldErrorHeadlineCommunicationInfo.map(field => {
                                    if (errors[field]) {
                                        return <li key={errors[field]}>{errors[field]}</li>;
                                    }
                                })
                            }
                        </ul>
                    </Alert>
                }
            </>
        );
    }

    renderAccountInfo = (values, hasHostOnCurrentCustomer) => {
        const { customerInfo, allSettings } = this.props;
        const languageSelected = allSettings.languages.map(item => {
            return {
                languageId: item.languageId,
                name: item.name,
                checked: values.languages?.includes(item.languageId)
            };
        });
        const siteOptions = changeSiteSetting(this.props.allSettings.sites, 'childSites', 'childSites');

        return (
            <Form className='group-account'>
                <div className='group-title'>
                    Account Info
                    {
                        hasHostOnCurrentCustomer &&
                        <img onClick={this.handleSubmit} src={Site.resolveClientUrl('www/dist/css/images/icon/icon-save.svg')} />
                    }
                </div>
                <div className='group-content'>
                    <Form.Group>
                        <Form.Label htmlFor="title" >
                            {LangHelper.getResource('Title')}
                        </Form.Label>
                        <Form.Control as="select" size="sm" className="shadow-none" value={values.titleId}
                            name="titleId" id="titleId" onChange={this.handleChange}
                        >
                            <option value="0"></option>
                            {this.props.allSettings.titles.map(item => this.renderOptions(item.value, item.id))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="firstName" >
                            {LangHelper.getResource('FirstName')}
                        </Form.Label>
                        <Form.Control type="text" name="firstName" id="firstName" autoComplete="off"
                            onChange={this.handleChange} value={values.firstName} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="lastName" >
                            {LangHelper.getResource('LastName')}
                        </Form.Label>
                        <Form.Control type="text" value={values.lastName}
                            name="lastName" id="lastName" autoComplete="off" onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="birthDay" >
                            {LangHelper.getResource('Birthday')}
                        </Form.Label>
                        <div className='react-datepicker-wrapper-container'>
                            <DatePicker
                                dropdownMode="select"
                                showMonthDropdown
                                useShortMonthInDropdown
                                showYearDropdown
                                selected={values.birthDay}
                                maxDate={values.maxDate}
                                onChange={value => this.handleChangeValue('birthDay', value)}
                            />
                        </div>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="passPortNo" >
                            {LangHelper.getResource('PassportNo')}
                        </Form.Label>
                        <Form.Control type="text" value={values.passport}
                            name="passport" id="passport" autoComplete="off" onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="refCodes" >
                            {LangHelper.getResource('RefCode')}
                        </Form.Label>
                        <Form.Control type="text" value={values.refCode2}
                            id="refCode2" autoComplete="off" name="refCode2" onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="languages" >
                            {LangHelper.getResource('Languages')}
                        </Form.Label>
                        <MultipleSelect
                            dataSource={languageSelected}
                            keyField='languageId'
                            valueField='name'
                            isAllTextShown
                            isNAOption
                            onChange={(currentItem, selectedItemsKey) => {
                                this.handleChangeValue('languages', selectedItemsKey);
                            }}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="site" >
                            {LangHelper.getResource('Site')}
                        </Form.Label>
                        <SelectWithSearch
                            className='basic-single'
                            options={siteOptions}
                            value={customerInfo.siteId}
                            name={customerInfo.siteSetting.name}
                            isHideNA={false}
                            OnChangeValue={item => this.handleChangeValue('siteId', item.id)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="secretCode" >
                            {LangHelper.getResource('SecretCode')}
                        </Form.Label>
                        <Form.Control type="text" value={values.refCode1}
                            name="refCode1" id="refCode1" autoComplete="off" onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="country" >
                            {LangHelper.getResource('Country')}
                        </Form.Label>
                        <SearchableDropdown
                            className='basic-single'
                            onChange={this.handleChange}
                            options={allSettings.countries.slice(1)}
                            value={values.homeAddressCountryId}
                            name="homeAddressCountryId"
                            isHideNA={false}
                            OnChangeValue={this.handleChangeCountry}
                        />
                    </Form.Group>
                </div>

            </Form>
        );
    }

    renderAccountPIC = (values, canEditHeadline) => {
        return (
            <Form className='group-account'>
                <div className='group-title'>
                    Accountant PIC
                    {
                        canEditHeadline &&
                        <img onClick={this.handleSubmit} src={Site.resolveClientUrl('www/dist/css/images/icon/icon-save.svg')} />
                    }
                </div>
                <div className='group-content'>
                    <Form.Group>
                        <Form.Label htmlFor="checker" >
                            {LangHelper.getResource('Checker')}
                        </Form.Label>
                        <Form.Control type="text" size="sm" className="shadow-none" value={values.checker} disabled
                            name="checker" id="checker" autoComplete="off" onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="introducedBy" >
                            {LangHelper.getResource('Introduced by')}
                        </Form.Label>
                        <Form.Control type="text" size="sm" className="shadow-none" value={values.introducedBy} disabled={!canEditHeadline}
                            name="introducedBy" id="introducedBy" autoComplete="off" onChange={this.handleChange} />
                    </Form.Group>
                    <Form.Check type="checkbox"
                        label={LangHelper.getResource('VIP')}
                        checked={values.isVip}
                        name='isVip' id="isVip"
                        disabled={!canEditHeadline}
                        onChange={event => this.handleChangeCheck(event)}
                    />
                    <Form.Check type="checkbox"
                        label={LangHelper.getResource('Ignore')}
                        checked={values.isIgnored}
                        name='isIgnored' id="isIgnored"
                        disabled={!canEditHeadline}
                        onChange={event => this.handleChangeCheck(event)}
                    />
                </div>
            </Form>
        );
    }



    renderHeadlineAccount = () => {
        const { allSettings, customerInfo, errors } = this.props;
        const values = this.state;
        const updatePolicy = this.state.updateHeadlineInfoPolicy;
        const canEditHeadline = updatePolicy === Policy.Host;
        if (!allSettings || !customerInfo) {
            return null;
        }
        const hasHostLicensee = document.getElementById('hasHostLicenseePermission').checked;
        const hasHostCredit = document.getElementById('hasHostCreditPermission').checked;
        const hasHostOnCurrentCustomer = hasHostPermissionOnCurrentCustomer(hasHostCredit, hasHostLicensee, customerInfo.customerType);
        return (
            <>
                {
                    this.renderErrors(errors)
                }
                {
                    this.renderAccountInfo(values, hasHostOnCurrentCustomer)
                }
                {
                    (customerInfo.isGroupHeadLine && (updatePolicy === Policy.Read || canEditHeadline)) &&
                    this.renderAccountPIC(values, canEditHeadline)
                }
                <div className='headline-info'>
                    <div className="tab-title">
                        <div className={`tab-child ${values.activeTab === 'headlineCommunicationInfo' ? 'active' : ''}`}
                            onClick={() => this.handleTabClick('headlineCommunicationInfo')}>
                            Headline Communication info
                        </div>
                        <div className={`tab-child ${values.activeTab === 'headlineStaffsAndAuthority' ? 'active' : ''}`}
                            onClick={() => this.handleTabClick('headlineStaffsAndAuthority')}>
                            Headline Staffs And Authority
                        </div>
                        <div className={`tab-child ${values.activeTab === 'companyService' ? 'active' : ''}`}
                            onClick={() => this.handleTabClick('companyService')}>
                            Company Service
                        </div>
                    </div>
                    <div className='tab-content'>
                        <div>
                            {
                                values.activeTab === 'headlineCommunicationInfo' &&
                                <HeadlineCommunicationInfo />
                            }
                            {
                                values.activeTab === 'headlineStaffsAndAuthority' &&
                                <HeadlineStaffsAndAuthority />
                            }
                            {
                                values.activeTab === 'companyService' &&
                                <CompanyService />
                            }
                        </div>
                    </div>
                </div>
            </>);
    }

    render() {
        const { allSettings, customerInfo } = this.props;
        if (!allSettings || !customerInfo) {
            return null;
        }
        return (
            <>
                {
                    !customerInfo.isGroupHeadLine &&
                    <p>other account</p>
                }
                {
                    customerInfo.isGroupHeadLine &&
                    this.renderHeadlineAccount()
                }
            </>
        );
    }    
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { allSettings, customerInfo, errors, editCustomerInfoDetailResult } = state;
    return { allSettings, customerInfo, errors, editCustomerInfoDetailResult };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
