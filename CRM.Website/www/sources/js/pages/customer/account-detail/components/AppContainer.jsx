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
import { Policy, FunctionKey } from '@jsroot/common/constants';
import { ParamsCustomerInfo, ParamsSubmit } from '../common.functions';
import { toast } from 'react-toastify';
import MultipleSelect from '@jsroot/components/multiple-select/index';
import DatePicker from '@jsroot/components/date-picker/index';
import { changeSiteSetting, checkHostPermissionOnCurrentCustomer, getPermission } from '@jsroot/common/shareScripts';
import DateTimeService from '@jsroot/common/dateTimeService';
import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import ConfirmPopup from '@jsroot/components/ConfirmPopup';

export class AppContainer extends Component {
    constructor(props) {
        super(props);
        const currentClientTime = new Date(DateTimeService.toLongDateTimeFormat(DateTimeService.toClientDateTime(new Date())));
        this.state = {
            isShowAccountInfo: true,
            isShowAccountantPIC: true,
            isHostOnCurrentCustomer: false,
            updateHeadlineInfoPolicy: null,
            otherAccountCommunication: null,
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
        this.props.setActiveTab({
            currentTab: LangHelper.getResource('HeadlineCommunicationInfo'),
            nextTab: null
        });
        this.props.setErrors(null);
        await this.props.getAllSettings();
        await this.props.getSettingPicCommunicationTools();
        await this.props.getCustomerById({ customerId: this.props.id });
        getPermission(FunctionKey.HeadlineInfo, true).then(response => {
            this.setState({ updateHeadlineInfoPolicy: response });
        });
        checkHostPermissionOnCurrentCustomer().then(response => {
            this.setState({
                isHostOnCurrentCustomer: response
            });
        });

        const { customerInfo } = this.props;
        const params = ParamsCustomerInfo(customerInfo);
        this.setState(params);
        this.setState({
            otherAccountCommunication: customerInfo.otherAccountCommunicationInfos?.map(x => {
                return {
                    communicationID: x.communicationID,
                    communicationValue: x.communicationValue,
                    isError: false
                }
            })
        });
        document.title = LangHelper.getResource('CRMSystem');
    }

    handleShowAccountInfo = () => {
        this.setState({
            isShowAccountInfo: !this.state.isShowAccountInfo
        });
    };

    handleShowAccountantPIC = () => {
        this.setState({
            isShowAccountantPIC: !this.state.isShowAccountantPIC
        });
    };

    handleSubmitAccountInfo = () => {
        const values = this.state;
        const { customerInfo } = this.props;
        const params = ParamsSubmit(customerInfo.custId, values);
        this.props.editCustomerInfoDetail(params).then(() => {
            if (this.props.editCustomerInfoDetailResult.isSuccessful) {
                window.dispatchEvent(new Event('getCurrentCustomer'));
                toast.success(LangHelper.getResource('UpdateAccountInfoSuccessful'));
            } else {
                toast.error(LangHelper.getResource(this.props.editCustomerInfoDetailResult.message));
            }
        });
    };

    handleSubmitAccountPIC = () => {
        const values = this.state;
        const { customerInfo } = this.props;
        const params = ParamsSubmit(customerInfo.custId, values);
        this.props.editCustomerInfoDetail(params).then(() => {
            if (this.props.editCustomerInfoDetailResult.isSuccessful) {
                window.dispatchEvent(new Event('getCurrentCustomer'));
                toast.success(LangHelper.getResource('UpdateAccountPicSuccessful'));
            } else {
                toast.error(LangHelper.getResource(this.props.editCustomerInfoDetailResult.message));
            }
        });
    };

    handleTabClick = (tabName) => {
        this.props.setActiveTab({
            currentTab: this.props.activeTab.currentTab,
            nextTab: tabName
        })
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
                                Object.keys(errors).map((key) => {
                                    return <li key={errors[key]}>{errors[key]}</li>;
                                })
                            }
                        </ul>
                    </Alert>
                }
            </>
        );
    }

    renderAccountInfo = values => {
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
            <Form className={`group-account ${(this.state.updateHeadlineInfoPolicy >= Policy.Read || !this.props.customerInfo.isGroupHeadLine) && 'acc-info'}`}>
                <div className='group-title group-tab'>
                    <div className="group-title-tab" onClick={this.handleShowAccountInfo}>
                        {LangHelper.getResource('AccountInfo')}
                    </div>
                    {
                        values.isHostOnCurrentCustomer &&
                        <img onClick={this.handleSubmitAccountInfo} src={Site.resolveClientUrl('www/dist/css/images/icon/icon-save.svg')} />
                    }
                </div>
                {
                    values.isShowAccountInfo && 
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
                                {LangHelper.getResource('RefCodes')}
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
                        {
                            !customerInfo.isGroupHeadLine &&
                            <>
                                <Form.Group >
                                    <Form.Label htmlFor="licenseeType">
                                        {LangHelper.getResource('LicenseeType')}
                                    </Form.Label>
                                    <Form.Control as="select" size="sm" className="shadow-none"
                                        name="licenseeTypeId" id="licenseeTypeId" value={values.licenseeTypeId} onChange={this.handleChange}
                                    >
                                        <option value='' hidden disabled />
                                        {allSettings.licenseeTypes.map(item => this.renderOptions(item.name, item.id))}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Check type="checkbox"
                                    label={LangHelper.getResource('VIP')}
                                    checked={values.isVip}
                                    name='isVip' id="isVip"
                                    disabled={!values.isHostOnCurrentCustomer}
                                    onChange={event => this.handleChangeCheck(event)}
                                />
                                <Form.Check type="checkbox"
                                    label={LangHelper.getResource('Ignore')}
                                    checked={values.isIgnored}
                                    name='isIgnored' id="isIgnored"
                                    disabled={!values.isHostOnCurrentCustomer}
                                    onChange={event => this.handleChangeCheck(event)}
                                />
                            </>
                        }
                    </div>
                }
            </Form>
        );
    }

    renderAccountPIC = (values, canEditHeadline) => {
        return (
            <Form className='group-account'>
                <div className='group-title group-tab'>
                    <div className="group-title-tab" onClick={this.handleShowAccountantPIC}>
                        {LangHelper.getResource('AccountantPIC')}
                    </div>
                    {
                        canEditHeadline &&
                        <img onClick={this.handleSubmitAccountPIC} src={Site.resolveClientUrl('www/dist/css/images/icon/icon-save.svg')} />
                    }
                </div>
                {
                    values.isShowAccountantPIC && 
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
                }
            </Form>
        );
    }

    validateCommunicationInfo = () => {
        let errors = {};
        let { otherAccountCommunication } = this.state;

        this.state.otherAccountCommunication.map((pic, indexPic) => {
            if (!pic.communicationID || !pic.communicationValue) {
                errors.communication = LangHelper.getResource('CommunicationRequired');
                otherAccountCommunication[indexPic].isError = true;
            } else {
                otherAccountCommunication[indexPic].isError = false;
            }
        });
        this.setState({
            otherAccountCommunication: otherAccountCommunication
        });
        this.props.setErrors(Object.keys(errors).length === 0 ? null : errors);
        return Object.keys(errors).length === 0 ? null : errors;
    }

    handleChangeCommunication = (name, value, indexPicCommunicationTool) => {
        let { otherAccountCommunication } = this.state;
        otherAccountCommunication[indexPicCommunicationTool][name] = value;
        this.setState({ otherAccountCommunication: otherAccountCommunication });
        this.validateCommunicationInfo();
    }

    getWidth = (picCommunicationTool, settingCommunicationTool) =>
        (8 * settingCommunicationTool.find(x => x.settingId === picCommunicationTool.communicationID).settingValue.length) + 15;

    deleteCommunicationTool = (value, type) => {
        const data = [...this.state.otherAccountCommunication];
        const index = data.findIndex(comTool => comTool.communicationID === type && comTool.communicationValue === value);
        data.splice(index, 1);
        this.setState({ otherAccountCommunication: data });
    }

    addNewCommunicationTool = () => {
        let { otherAccountCommunication } = this.state;
        otherAccountCommunication.push({
            communicationID: '',
            value: '',
            isError: false
        });
        this.setState({ otherAccountCommunication: otherAccountCommunication });
    }

    handleSubmitOtherCommunicationInfo = async () => {
        const errors = this.validateCommunicationInfo();
        if (errors === null) {
            await this.checkCustomerExistsOnCRM();
        }
    }

    getPicCommunicationTools() {
        let { otherAccountCommunication } = this.state;
        let picCommunicationTools = [];
        otherAccountCommunication.map((picCom, indexCom) => {
            const index = otherAccountCommunication.findIndex(item => item.communicationID === picCom.communicationID);
            if (index >= 0 && index !== indexCom) {
                const newValue = otherAccountCommunication[index].communicationValue.concat(', ', picCom.communicationValue);
                picCommunicationTools[index].communicationValue = newValue;
            }
            else {
                const newPicCom = {
                    communicationID: picCom.communicationID,
                    communicationValue: picCom.communicationValue
                };
                picCommunicationTools.push({ ...newPicCom });
            }
        })
        return picCommunicationTools;
    }

    editOtherAccountCommunicationInfo = async () => {        
        const params = {
            custID: this.props.id,
            otherCommunicationTools: this.getPicCommunicationTools()
        };

        Site.blockUI();
        const url = Site.resolveClientUrl('AccountDetail/EditOtherAccCommunicationInfo');
        await DataService.postDataAsync(url, params).then(response => {
            if (response.data.isSuccessful) {
                window.dispatchEvent(new Event('getCurrentCustomer'));
                toast.success(LangHelper.getResource('UpdateCommunicationInfoSuccessful'));
            } else {
                toast.errors(response.data.find(x => !x.isSuccessful)[0].message);
            }
        }).then(() => Site.unblockUI()).catch(Site.handleAxiosError);
    }

    checkCustomerExistsOnCRM = async () => {
        const { customerInfo } = this.props;
        Site.blockUI();
        const url = Site.resolveClientUrl('AccountDetail/CheckCustomerExistsOnCRM');
        await DataService.postDataAsync(url, { customerId: customerInfo.custId }).then(async response => {
            if (response.data === 1) {
                await this.editOtherAccountCommunicationInfo();
            } else {
                await this.updateNewCrmCustomer();
            }
        }).then(() => Site.unblockUI()).catch(Site.handleAxiosError);
    }

    updateNewCrmCustomer = async () => {
        const values = this.state;
        const { customerInfo } = this.props;
        const params = ParamsSubmit(customerInfo.custId, values);
        this.props.editCustomerInfoDetail(params).then(async () => {
            if (this.props.editCustomerInfoDetailResult.isSuccessful) {
                await this.editOtherAccountCommunicationInfo();
            }
        });
    }

    renderOtherPIC = values => {
        return (
            <Form className='group-account'>                
                <div className='group-title'>
                    {LangHelper.getResource('CommunicationInfo')}
                    {
                        values.isHostOnCurrentCustomer &&
                        <img onClick={this.handleSubmitOtherCommunicationInfo} src={Site.resolveClientUrl('www/dist/css/images/icon/icon-save.svg')} />
                    }
                </div>
                <div className='add-comm-tool'>
                    {
                        values.isHostOnCurrentCustomer && 
                        <Button className='btn-add' variant="primary" size="sm" onClick={this.addNewCommunicationTool}>
                            {LangHelper.getResource('AddCommunicationTool')}
                        </Button>
                    }
                    <div className='group-content'>
                        {
                            values.otherAccountCommunication?.map((picCommunicationTool, indexPicCommunicationTool) => {
                                return <>
                                    <Form.Group className="other-communication-tool">
                                        <Form.Control as="select" size="sm" className="shadow-none custom-select-communicationTool" name="CommunicationID" id="CommunicationID"
                                            style={{
                                                width: `${picCommunicationTool.communicationID !== '' ? this.getWidth(picCommunicationTool, this.props.settingCommunicationTool) : 115}px`
                                            }}
                                            value={picCommunicationTool.communicationID} onChange={event => {
                                                this.handleChangeCommunication('communicationID', parseInt(event.target.value, 10), indexPicCommunicationTool);
                                            }}>
                                            <option value="" disabled hidden>{LangHelper.getResource('PleaseSelect')}</option>
                                            {this.props.settingCommunicationTool.map(item => this.renderOptions(item.settingValue, item.settingId))}
                                        </Form.Control>
                                        <div className='field-icon'>
                                            <textarea className={`${picCommunicationTool.isError && 'invalid-other-communication-tool'} textarea-communication-tool`}
                                                placeholder="Separated by ',' for multiple contact info" cdkTextareaAutosize
                                                value={picCommunicationTool.communicationValue} autoComplete="off" onChange={event => {
                                                    this.handleChangeCommunication('communicationValue', event.target.value, indexPicCommunicationTool);
                                                }} />
                                            {
                                                values.isHostOnCurrentCustomer &&
                                                <div onClick={() => { this.deleteCommunicationTool(picCommunicationTool.communicationValue, picCommunicationTool.communicationID); }}
                                                    className='icon icon-delete'>
                                                </div>
                                            }
                                        </div>
                                    </Form.Group>
                                </>
                            })
                        }
                        {
                            values.otherAccountCommunication?.length === 0 &&
                            <div className='no-data'>{LangHelper.getResource('ThereIsNoData')}</div>
                        }
                    </div>
                </div>
            </Form>
        );
    }

    renderHeadlineAccount = () => {
        const { allSettings, customerInfo, activeTab } = this.props;
        const values = this.state;
        const updatePolicy = this.state.updateHeadlineInfoPolicy;
        const canEditHeadline = updatePolicy === Policy.Host;
        if (!allSettings || !customerInfo) {
            return null;
        }       
        return (
            <>                
                {
                    this.renderAccountInfo(values)
                }
                {
                    (updatePolicy === Policy.Read || canEditHeadline) &&
                    this.renderAccountPIC(values, canEditHeadline)
                }
                {
                    updatePolicy >= Policy.Read &&
                    <div className='headline-info'>
                        <div className="tab-title">
                            <div className={`tab-child ${activeTab.currentTab === LangHelper.getResource('HeadlineCommunicationInfo') ? 'active' : ''}`}
                                onClick={() => this.handleTabClick(LangHelper.getResource('HeadlineCommunicationInfo'))}>
                                {LangHelper.getResource('HeadlineCommunicationInfo')}
                            </div>
                            <div className={`tab-child ${activeTab.currentTab === LangHelper.getResource('HeadlineStaffsAndAuthority') ? 'active' : ''}`}
                                    onClick={() => this.handleTabClick(LangHelper.getResource('HeadlineStaffsAndAuthority'))}>
                                {LangHelper.getResource('HeadlineStaffsAndAuthority')}
                            </div>
                            <div className={`tab-child ${activeTab.currentTab === LangHelper.getResource('CompanyService') ? 'active' : ''}`}
                                    onClick={() => this.handleTabClick(LangHelper.getResource('CompanyService'))}>
                                {LangHelper.getResource('CompanyService')}
                            </div>
                        </div>
                        <div className={`tab-content ${(!values.isShowAccountInfo && values.isShowAccountantPIC) ? 'acc-info-only-hidden' : ''} 
                                        ${(!values.isShowAccountInfo && !values.isShowAccountantPIC) ? 'acc-info-hidden' : ''} ${!values.isShowAccountantPIC ? 'acc-PIC-hidden' : ''}`}>
                            <div>
                                {
                                    activeTab.currentTab === LangHelper.getResource('HeadlineCommunicationInfo') &&
                                    <HeadlineCommunicationInfo />
                                }
                                {
                                    activeTab.currentTab === LangHelper.getResource('HeadlineStaffsAndAuthority') &&
                                    <HeadlineStaffsAndAuthority />
                                }
                                {
                                    activeTab.currentTab === LangHelper.getResource('CompanyService') &&
                                    <CompanyService />
                                }
                            </div>
                        </div>
                    </div>
                }
            </>);
    }

    renderOtherAccount = () => {
        const { allSettings, customerInfo } = this.props;
        const values = this.state;
        if (!allSettings || !customerInfo) {
            return null;
        }        
        return (
            <>
                {
                    this.renderAccountInfo(values)
                }
                {
                    this.renderOtherPIC(values)
                }
            </>);
    }

    handleClosePopup = () => {
        const { activeTab } = this.props;
        if (activeTab.nextTab != null) {
            this.props.setActiveTab({
                currentTab: activeTab.nextTab,
                nextTab: null
            });
        }
        this.props.setShowConfirmUnSaved(false);
        this.props.setErrors(null);
    };

    handleCloseConfirm = () => {
        this.props.setShowConfirmUnSaved(false);
        this.props.setActiveTab({
            currentTab: this.props.activeTab.currentTab,
            nextTab: null
        });
    };

    render() {
        const { allSettings, customerInfo, errors, activeTab, showConfirmUnSaved } = this.props;
        if (!allSettings || !customerInfo || !activeTab.currentTab) {
            return null;
        }
        return (
            <>
                {
                    this.renderErrors(errors)
                }
                {
                    !customerInfo.isGroupHeadLine &&
                    this.renderOtherAccount()
                }
                {
                    customerInfo.isGroupHeadLine &&
                    this.renderHeadlineAccount()
                }
                {
                    showConfirmUnSaved &&
                    <ConfirmPopup
                        title={LangHelper.getResource('Confirmation')}
                        content={
                            <div>{LangHelper.getResource('ConfirmDirtyMessage')}</div>
                        }
                        size='lg'
                        onSubmit={this.handleClosePopup}
                        onClose={this.handleCloseConfirm}
                    />
                }
            </>
        );
    }    
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const {
        allSettings,
        customerInfo,
        settingCommunicationTool,
        errors,
        editCustomerInfoDetailResult,
        setErrors,
        setActiveTab,
        activeTab,
        showConfirmUnSaved,
        editCustomerInfoDetail } = state;
    return {
        allSettings,
        customerInfo,
        settingCommunicationTool,
        errors,
        editCustomerInfoDetailResult,
        setErrors,
        setActiveTab,
        activeTab,
        showConfirmUnSaved,
        editCustomerInfoDetail
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer);
