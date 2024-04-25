import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import { Form } from 'react-bootstrap';
import LangHelper from '@jsroot/common/langHelper';
import { Policy, FunctionKey } from '@jsroot/common/constants';
import { ParamsCustomerInfo, ParamsSubmit } from '../common.functions';
import { toast } from 'react-toastify';
import { getPermission } from '@jsroot/common/shareScripts';
import DateTimeService from '@jsroot/common/dateTimeService';
import Site from '@jsroot/common/site';

export class AccountantPIC extends Component {
    constructor(props) {
        super(props);
        const currentClientTime = new Date(DateTimeService.toLongDateTimeFormat(DateTimeService.toClientDateTime(new Date())));
        this.state = {
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
        getPermission(FunctionKey.HeadlineInfo, true).then(response => {
            this.setState({ updateHeadlineInfoPolicy: response });
        });
        const params = ParamsCustomerInfo(this.props.customerInfo);
        this.setState(params);
        document.title = LangHelper.getResource('CRMSystem');
    }

    async componentDidUpdate(nextProps, nextState) {
        if (JSON.stringify(nextProps.customerInfo).toString() !== JSON.stringify(this.props.customerInfo).toString()) {
            const params = ParamsCustomerInfo(this.props.customerInfo);
            this.setState(params);
        }
    }

    handleSubmitAccountPIC = () => {
        const values = this.state;
        const { customerInfo } = this.props;
        const params = ParamsSubmit(customerInfo.custId, values);
        this.props.editCustomerInfoDetail(params).then(async () => {
            if (this.props.editCustomerInfoDetailResult.isSuccessful) {
                window.dispatchEvent(new Event('getCurrentCustomer'));
                await this.props.getCustomerById({ customerId: this.props.customerId });
                toast.success(LangHelper.getResource('UpdateAccountantPicSuccessful'));
            } else {
                toast.error(LangHelper.getResource(this.props.editCustomerInfoDetailResult.message));
            }
        });
    };

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

    render() {
        const { allSettings, customerInfo, isShowAccountantPIC } = this.props;
        const values = this.state;
        const updatePolicy = this.state.updateHeadlineInfoPolicy;
        const canEditHeadline = updatePolicy === Policy.Host;
        if (!allSettings || !customerInfo) {
            return null;
        }
        return (
            <>
                {
                    (updatePolicy === Policy.Read || canEditHeadline) &&
                    <Form className='group-account acc-second'>
                        <div className='group-title group-tab'>
                                <div className="group-title-tab" onClick={() => { this.props.setShowAccountantPIC(!this.props.isShowAccountantPIC); }}>
                                <span className='icon-dropdown' />
                                {LangHelper.getResource('AccountantPIC')}
                            </div>
                            {
                                canEditHeadline &&
                                <img onClick={this.handleSubmitAccountPIC} src={Site.resolveClientUrl('www/dist/css/images/icon/icon-save.svg')} />
                            }
                        </div>
                        {
                            isShowAccountantPIC &&
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
                }
            </>);
    }    
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const {
        allSettings,
        customerInfo,
        editCustomerInfoDetailResult,
        editCustomerInfoDetail,
        isShowAccountantPIC,
        setShowAccountantPIC } = state;
    return {
        allSettings,
        customerInfo,
        editCustomerInfoDetailResult,
        editCustomerInfoDetail,
        isShowAccountantPIC,
        setShowAccountantPIC
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountantPIC);