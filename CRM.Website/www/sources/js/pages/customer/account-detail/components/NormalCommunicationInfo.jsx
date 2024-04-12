import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import { Button, Form } from 'react-bootstrap';
import LangHelper from '@jsroot/common/langHelper';
import { ParamsCustomerInfo, ParamsSubmit, ValidateNormalCommunicationInfo } from '../common.functions';
import { toast } from 'react-toastify';
import { checkHostPermissionOnCurrentCustomer } from '@jsroot/common/shareScripts';
import ConfirmPopup from '@jsroot/components/ConfirmPopup';
import DateTimeService from '@jsroot/common/dateTimeService';
import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';

export class NormalCommunicationInfo extends Component {
    constructor(props) {
        super(props);
        const currentClientTime = new Date(DateTimeService.toLongDateTimeFormat(DateTimeService.toClientDateTime(new Date())));
        this.state = {
            confirmDelete: {
                show: false,
                communicationValue: null,
                communicationID: null
            },
            isValidate: false,
            isShowAccountInfo: true,
            isShowAccountantPIC: true,
            isHostOnCurrentCustomer: false,
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
        checkHostPermissionOnCurrentCustomer().then(response => {
            this.setState({
                isHostOnCurrentCustomer: response
            });
        });
        await this.props.getCustomerById({ customerId: this.props.customerInfo.custId });
        const params = ParamsCustomerInfo(this.props.customerInfo);
        this.setState(params);
        this.setState({
            otherAccountCommunication: this.props.customerInfo.otherAccountCommunicationInfos?.map(x => {
                return {
                    communicationID: x.communicationID,
                    communicationValue: x.communicationValue,
                    isError: false,
                    isNew: false
                }
            })
        });
        document.title = LangHelper.getResource('CRMSystem');
    }

    renderOptions = (name, item) => <option key={item} value={item}>{name}</option>;

    validateCommunicationInfo = () => {
        const { errors, otherAccountCommunication } = ValidateNormalCommunicationInfo(this.state.otherAccountCommunication);
        this.setState({
            otherAccountCommunication: otherAccountCommunication
        });
        this.props.setErrors(Object.keys(errors).length === 0 ? null : errors);
        return Object.keys(errors).length === 0 ? null : errors;
    }

    handleChangeCommunication = (name, value, indexPicCommunicationTool) => {
        let { otherAccountCommunication, isValidate } = this.state;
        otherAccountCommunication[indexPicCommunicationTool][name] = value;
        this.setState({ otherAccountCommunication: otherAccountCommunication });
        if (isValidate) {
            this.validateCommunicationInfo();
        }
    }

    getWidth = (picCommunicationTool, settingCommunicationTool) => (8 * settingCommunicationTool.find(x => x.settingId === picCommunicationTool.communicationID).settingValue.length) + 24;
    deleteCommunicationTool = (value, type) => {
        const data = [...this.state.otherAccountCommunication];
        const index = data.findIndex(comTool => comTool.communicationID === type && comTool.communicationValue === value);
        data.splice(index, 1);
        this.setState({
            otherAccountCommunication: data,
            confirmDelete: {
                show: false,
                communicationValue: null,
                communicationID: null
            }
        });
    }

    handleConfirmDeleteCommunicationTool(picCommunicationTool, indexPicCommunicationTool) {
        if (picCommunicationTool.isNew) {
            this.deleteCommunicationTool(picCommunicationTool.communicationValue, picCommunicationTool.communicationID);
        }
        else {
            this.setState({
                confirmDelete: {
                    show: true,
                    communicationValue: picCommunicationTool.communicationValue,
                    communicationID: picCommunicationTool.communicationID
                }
            });
        }
    }

    addNewCommunicationTool = () => {
        let { otherAccountCommunication } = this.state;
        otherAccountCommunication.push({
            communicationID: '',
            communicationValue: '',
            isError: false,
            isNew: true
        });
        this.setState({ otherAccountCommunication: otherAccountCommunication });
    }

    handleSubmitOtherCommunicationInfo = async () => {
        const errors = this.validateCommunicationInfo();
        this.setState({ isValidate: true });
        if (errors === null) {
            await this.checkCustomerExistsOnCRM();
        }
    }

    getPicCommunicationTools() {
        let { otherAccountCommunication } = this.state;
        let picCommunicationTools = [];
        otherAccountCommunication.map((picCom, indexCom) => {
            const index = picCommunicationTools.findIndex(item => item.communicationID === picCom.communicationID);
            if (index >= 0 && index !== indexCom) {
                const newValue = picCommunicationTools[index].communicationValue.concat(', ', picCom.communicationValue);
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
            custID: this.props.customerInfo.custId,
            otherCommunicationTools: this.getPicCommunicationTools()
        };

        Site.blockUI();
        const url = Site.resolveClientUrl('AccountDetail/EditOtherAccCommunicationInfo');
        await DataService.postDataAsync(url, params).then(async response => {
            if (response.data.isSuccessful) {
                this.setState({ isValidate: false });
                window.dispatchEvent(new Event('getCurrentCustomer'));
                toast.success(LangHelper.getResource('UpdateCommunicationInfoSuccessful'));
                await this.props.getCustomerById({ customerId: this.props.customerInfo.custId });
                this.setState({
                    otherAccountCommunication: this.props.customerInfo.otherAccountCommunicationInfos?.map(x => {
                        return {
                            communicationID: x.communicationID,
                            communicationValue: x.communicationValue,
                            isError: false,
                            isNew: false
                        }
                    })
                });
            } else {
                toast.error(response.data.message);
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

    renderComfirmDeleteCommunicationTool() {
        const { settingCommunicationTool } = this.props;
        const communicationToolIndex = settingCommunicationTool.findIndex(x => x.settingId === this.state.confirmDelete.communicationID);
        return <>
            <div className="confirm-headline">Are you going to delete the <strong>{settingCommunicationTool[communicationToolIndex].settingValue}</strong> communication tool?</div>
        </>
    }

    render() {
        const { customerInfo } = this.props;
        const values = this.state;
        if (!customerInfo) {
            return null;
        }
        return (
            <>
                <Form className='group-account other-pic'>
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
                                                    placeholder={LangHelper.getResource('SeparatedByComma')} cdkTextareaAutosize
                                                    value={picCommunicationTool.communicationValue} autoComplete="off" onChange={event => {
                                                        this.handleChangeCommunication('communicationValue', event.target.value, indexPicCommunicationTool);
                                                    }} />
                                                {
                                                    values.isHostOnCurrentCustomer &&
                                                    <div onClick={() => { this.handleConfirmDeleteCommunicationTool(picCommunicationTool, indexPicCommunicationTool); }}
                                                        className='icon icon-delete' title={LangHelper.getResource('DeleteCommunicationTool')}>
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
                {
                    values.confirmDelete.show &&
                    <ConfirmPopup
                        className='confirm-headline-modal'
                        title={LangHelper.getResource('ConfirmDeleteCommunicationTool')}
                        content={this.renderComfirmDeleteCommunicationTool()}
                        size='lg'
                        onSubmit={() => { this.deleteCommunicationTool(values.confirmDelete.communicationValue, values.confirmDelete.communicationID); }}
                        onClose={() => {
                            this.setState({
                                confirmDelete: {
                                    show: false,
                                    communicationValue: null,
                                    communicationID: null
                                }
                            });
                        }}
                    />
                }
            </>
        );
    }    
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const {
        customerInfo,
        settingCommunicationTool,
        editCustomerInfoDetailResult,
        setErrors,
        editCustomerInfoDetail } = state;
    return {
        customerInfo,
        settingCommunicationTool,
        editCustomerInfoDetailResult,
        setErrors,
        editCustomerInfoDetail
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NormalCommunicationInfo);
