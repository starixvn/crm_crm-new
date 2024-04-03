import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import HeadlineStaffsAndAuthority from './HeadlineStaffsAndAuthority';
import HeadlineCommunicationInfo from './HeadlineCommunicationInfo';
import CompanyService from './CompanyService';
import AccountantPIC from './AccountantPIC';
import AccountInfo from './AccountInfo';
import NormalCommunicationInfo from './NormalCommunicationInfo';
import { Alert } from 'react-bootstrap';
import LangHelper from '@jsroot/common/langHelper';
import { Policy, FunctionKey } from '@jsroot/common/constants';
import { ParamsCustomerInfo } from '../common.functions';
import { getPermission } from '@jsroot/common/shareScripts';
import DateTimeService from '@jsroot/common/dateTimeService';
import ConfirmPopup from '@jsroot/components/ConfirmPopup';

export class AppContainer extends Component {
    constructor(props) {
        super(props);
        const currentClientTime = new Date(DateTimeService.toLongDateTimeFormat(DateTimeService.toClientDateTime(new Date())));
        this.state = {
            isShowAccountInfo: true,
            isShowAccountantPIC: true,
            updateHeadlineInfoPolicy: null,
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

        const { customerInfo } = this.props;
        const params = ParamsCustomerInfo(customerInfo);
        this.setState(params);
        document.title = LangHelper.getResource('CRMSystem');
    }

    handleTabClick = (tabName) => {
        this.props.setActiveTab({
            currentTab: this.props.activeTab.currentTab,
            nextTab: tabName
        })
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
                <AccountInfo/>
                {
                    (updatePolicy === Policy.Read || canEditHeadline) &&
                    <AccountantPIC/>
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
        if (!allSettings || !customerInfo) {
            return null;
        }        
        return (
            <>
                <AccountInfo/>
                <NormalCommunicationInfo />
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
