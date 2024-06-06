import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import LangHelper from '@jsroot/common/langHelper';
import { Form, Button } from 'react-bootstrap';
import {
    HeadlinePicID,
    AccountingPicID,
    Policy,
    FunctionKey,
    MaxHeightBodyTableHeadlineAccountShowFull,
    MaxHeightBodyTableHeadlineAccountHideInfo,
    MaxHeightBodyTableHeadlineAccountHidePic,
    MaxHeightBodyTableHeadlineAccountHideFull
} from '@jsroot/common/constants';
import MultipleSelect from '@jsroot/components/multiple-select/index';
import SearchableDropdown from '@jsroot/components/SearchableDropdown';
import DataService from '@jsroot/common/dataService';
import Site from '@jsroot/common/site';
import ConfirmPopup from '@jsroot/components/ConfirmPopup';
import { toast } from 'react-toastify';
import { getPermission, checkHostPermissionPicAssign } from '@jsroot/common/shareScripts';
import { ParamsSubmit, ValidateHeadlineCommunicationInfo, getHeadlineCommunicationInfo } from '../common.functions';
import { Link } from 'react-router-dom';

export class HeadlineCommunicationInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headlineCommunicationInfo: null,
            isValidate: false,
            confirmSave: {
                show: false,
                data: []
            },
            confirmDelete: {
                show: false,
                picCommunicationTool: null,
                indexPic: 0
            },
            headlineInfoPolicy: null,
            picAssignmentPolicy: null
        };
    }

    async componentDidUpdate(nextProps, nextState) {
        if (nextProps.customerInfo?.custId !== this.props.customerInfo?.custId) {
            await this.props.getCustomerById({ customerId: this.props.customerInfo?.custId });
            const headlineCommunicationInfo = getHeadlineCommunicationInfo(this.props.customerInfo);
            this.setState({ headlineCommunicationInfo: headlineCommunicationInfo });
        }

        if (this.props.activeTab != null) {
            const { activeTab, customerInfo } = this.props;
            const initialValues = getHeadlineCommunicationInfo(customerInfo);
            if (!this.state.headlineCommunicationInfo || !initialValues) {
                return null;
            }
            this.handleComfirmChangeTab(activeTab, initialValues);
        }

        if (window.picID !== undefined) {
            this.handleAutoScroll();
        }

        if (document.querySelector("#tab-headline-communication-info") != null) {
            this.handleCustomDropdownTable();
        }
    }

    handleCustomDropdownTable() {
        const { isShowAccountInfo, isShowAccountantPIC } = this.props;
        document.querySelector("#tab-headline-communication-info").classList.remove("custom-dropdown");
        const heightBody = document.querySelector("#tab-headline-communication-info").offsetHeight;
        if ((isShowAccountInfo && isShowAccountantPIC && heightBody < MaxHeightBodyTableHeadlineAccountShowFull) ||
            (!isShowAccountInfo && isShowAccountantPIC && heightBody < MaxHeightBodyTableHeadlineAccountHideInfo) ||
            (isShowAccountInfo && !isShowAccountantPIC && heightBody < MaxHeightBodyTableHeadlineAccountHidePic) ||
            (!isShowAccountInfo && !isShowAccountantPIC && heightBody < MaxHeightBodyTableHeadlineAccountHideFull)) {
            document.querySelector("#tab-headline-communication-info").classList.add("custom-dropdown");
        }
    }

    handleComfirmChangeTab(activeTab, initialValues) {
        if (activeTab.nextTab && activeTab.nextTab !== LangHelper.getResource('HeadlineCommunicationInfo')) {
            if (JSON.stringify(this.state.headlineCommunicationInfo).toString() === JSON.stringify(initialValues).toString() ||
                this.state.headlineInfoPolicy !== Policy.Host) {
                this.props.setShowConfirmUnSaved(false);
                this.props.setActiveTab({
                    currentTab: activeTab.nextTab,
                    nextTab: null
                });
            }
            else {
                this.props.setShowConfirmUnSaved(true);
            }
        }
    }

    async componentDidMount() {
        await this.props.getHeadlinePicRoles(HeadlinePicID);
        await this.props.getAccountingPicRoles(AccountingPicID);
        const headlineCommunicationInfo = getHeadlineCommunicationInfo(this.props.customerInfo);
        this.setState({ headlineCommunicationInfo: headlineCommunicationInfo });
        this.props.setShowConfirmUnSaved(false);
        getPermission(FunctionKey.HeadlineInfo, true).then(response => {
            this.setState({ headlineInfoPolicy: response });
        });
        checkHostPermissionPicAssign().then(response => {
            this.setState({ picAssignmentPolicy: response });
        });
        window.addEventListener("autoScroll", this.handleAutoScroll);
    }

    componentWillUnmount() {
        window.removeEventListener("autoScroll", this.handleAutoScroll);
    }

    handleAutoScroll() {
        const topPic = document.querySelector(`#row-${window.picID}`).offsetTop - document.querySelector('#tab-headline-communication-info').offsetTop;
        document.querySelector("#tab-headline-communication-info").scrollTo(0, topPic);
        window.picID = undefined;
    }

    renderOptions = (name, item) => <option key={item} value={item}>{name}</option>;

    handleChangeValue = (name, value, indexPic) => {
        let { headlineCommunicationInfo, isValidate } = this.state;
        headlineCommunicationInfo[indexPic][name] = value;
        this.setState({ headlineCommunicationInfo: headlineCommunicationInfo });
        if (isValidate) {
            this.validateCommunicationInfo();
        }
    }

    handleChangeCommunicationValue = (name, typeName, value, indexPic, indexPicCommunicationTool) => {
        let { headlineCommunicationInfo, isValidate } = this.state;
        headlineCommunicationInfo[indexPic][name][indexPicCommunicationTool][typeName] = value;
        this.setState({ headlineCommunicationInfo: headlineCommunicationInfo });
        if (isValidate) {
            this.validateCommunicationInfo();
        }
    }

    deleteCommunicationTool = (picCommunicationTool, indexPic) => {
        const data = [...this.state.headlineCommunicationInfo];
        const index = data[indexPic].picCommunicationTools.findIndex(comTool => comTool.value === picCommunicationTool.value && comTool.type === picCommunicationTool.type);
        data[indexPic].picCommunicationTools.splice(index, 1);
        this.setState({
            headlineCommunicationInfo: data,
            confirmDelete: {
                show: false,
                picCommunicationTool: null,
                indexPic: 0
            }
        });
    }

    async checkCustomerExistsOnCRM() {
        this.setState({
            confirmSave: {
                show: false,
                data: []
            }
        });

        Site.blockUI();
        const url = Site.resolveClientUrl('AccountDetail/CheckCustomerExistsOnCRM');
        await DataService.postDataAsync(url, { customerId: this.props.customerInfo?.custId }).then(async response => {
            if (response.data === 1) {
                await this.editHeadlineCommunicationPic();
            } else {
                await this.updateNewCrmCustomer();
            }
        }).then(() => Site.unblockUI()).catch(Site.handleAxiosError);
    }

    handleSubmit = async () => {
        const errors = this.validateCommunicationInfo();
        this.setState({ isValidate: true });
        if (errors === null) {
            let validResult = await this.validateEditPic();
            if (validResult.length === 0) {
                this.checkCustomerExistsOnCRM();
            }
            else {
                this.setState({
                    confirmSave: {
                        show: true,
                        data: validResult
                    }
                });
            }
        }
    }

    updateNewCrmCustomer = async () => {
        const params = ParamsSubmit(this.props.customerInfo.custId, this.props.customerInfo);
        this.props.editCustomerInfoDetail(params).then(async () => {
            if (this.props.editCustomerInfoDetailResult.isSuccessful) {
                await this.editHeadlineCommunicationPic();
            }
        });
    }

    getPicChangeInformation() {
        let { headlineCommunicationInfo } = this.state;
        const originalHeadlineCommunicationInfo = getHeadlineCommunicationInfo(this.props.customerInfo);
        let headlineChangeCommunicationInfo = [];
        headlineCommunicationInfo.map((item, index) => {
            if (JSON.stringify(item).toString() !== JSON.stringify(originalHeadlineCommunicationInfo[index]).toString()) {
                headlineChangeCommunicationInfo.push(item);
            }
        })
        return headlineChangeCommunicationInfo;
    }

    getParamEdit() {
        const headlineChangeCommunicationInfo = this.getPicChangeInformation();
        const params = headlineChangeCommunicationInfo.map(pic => {
            let picCommunicationTools = [];
            pic.picCommunicationTools.map((picCom, indexCom) => {
                const index = pic.picCommunicationTools.findIndex(item => item.type === picCom.type);
                if (index >= 0 && index !== indexCom) {
                    const newValue = picCommunicationTools[index].value.concat(', ', picCom.value);
                    picCommunicationTools[index].value = newValue;
                } else {
                    picCommunicationTools.push({ ...picCom });
                }
            })

            return {
                country: pic.country,
                language: pic.language,
                picId: pic.picId,
                picName: pic.picName,
                picType: pic.picType,
                role: pic.role,
                picCommunicationTools: picCommunicationTools,
                remark: ''
            };
        });
        return params;
    }

    editHeadlineCommunicationPic = async () => {
        const params = this.getParamEdit();
        Site.blockUI();
        const url = Site.resolveClientUrl('AccountDetail/EditPic');
        await DataService.postDataAsync(url, params).then(async response => {
            if (response.data.findIndex(x => !x.isSuccessful) === -1) {
                window.dispatchEvent(new Event('getCurrentCustomer'));
                toast.success(LangHelper.getResource('UpdateHeadlineCommunicationInfoSuccessful'));
                await this.props.getCustomerById({ customerId: this.props.customerInfo.custId });
                const headlineCommunicationInfo = getHeadlineCommunicationInfo(this.props.customerInfo);
                this.setState({
                    headlineCommunicationInfo: headlineCommunicationInfo,
                    isValidate: false
                });
            } else {
                let { headlineCommunicationInfo } = this.state;
                response.data.map((item, index) => {
                    const indexError = headlineCommunicationInfo.findIndex(x => params[index].picId === x.picId);
                    headlineCommunicationInfo[indexError].isNameError = !item.isSuccessful;
                })
                this.setState({ headlineCommunicationInfo: headlineCommunicationInfo });
                toast.error(response.data.find(x => !x.isSuccessful).message);
            }
        }).then(() => Site.unblockUI()).catch(Site.handleAxiosError);
    }

    validateEditPic = async () => {
        let { headlineCommunicationInfo } = this.state;
        let validResult = null;
        const params = headlineCommunicationInfo.map(pic => {
            return {
                picId: pic.picId,
                picCommunicationTools: pic.picCommunicationTools.map(com => { return { type: com.type, value: com.value }; })
            };
        });
        Site.blockUI();
        const url = Site.resolveClientUrl('AccountDetail/ValidateEditPic');
        await DataService.postDataAsync(url, params).then(response => {
            validResult = response.data;
        }).then(() => Site.unblockUI()).catch(Site.handleAxiosError);
        return validResult;
    }

    validateCommunicationInfo = () => {
        let { errors, headlineCommunicationInfo } = ValidateHeadlineCommunicationInfo(this.state.headlineCommunicationInfo);
        this.setState({
            headlineCommunicationInfo: headlineCommunicationInfo
        });
        errors = Object.keys(errors).length === 0 ? null : errors;
        this.props.setErrors(errors);
        return errors;
    }

    addNewCommunicationTool = indexPic => {
        let { headlineCommunicationInfo } = this.state;
        headlineCommunicationInfo[indexPic].picCommunicationTools.push({
            type: '',
            value: '',
            isError: false,
            isNew: true
        });
        this.setState({ headlineCommunicationInfo: headlineCommunicationInfo });
    }

    handleChangeCountryValue = (item, indexPic) => {
        let { headlineCommunicationInfo } = this.state;
        headlineCommunicationInfo[indexPic].country = item.id;
        this.setState({ headlineCommunicationInfo: headlineCommunicationInfo });
    }

    getWidth = (picCommunicationTool, settingCommunicationTool) => (8 * settingCommunicationTool.find(x => x.settingId === picCommunicationTool.type).settingValue.length) + 24;

    handleConfirmDeleteCommunicationTool(picCommunicationTool, indexPicCommunicationTool) {
        if (picCommunicationTool.isNew) {
            this.deleteCommunicationTool(picCommunicationTool, indexPicCommunicationTool);
        }
        else {
            this.setState({
                confirmDelete: {
                    show: true,
                    picCommunicationTool: picCommunicationTool,
                    indexPic: indexPicCommunicationTool
                }
            });
        }
    }

    renderInfo = (pic, indexPic) => {
        let { allSettings, headlinePicRoles, accountingPicRoles, settingCommunicationTool } = this.props;
        const languageSelected = this.props.allSettings.languages.map(item => {
            return {
                languageId: item.languageId,
                name: item.name,
                checked: pic.language?.includes(item.languageId)
            };
        });
        return (
            <div id={`row-${pic.picId}`} className='group-item'>
                <Form.Group>
                    <Form.Label className="required">
                        {LangHelper.getResource('Name')}
                    </Form.Label>
                    <Form.Control className={pic.isNameError && 'invalid'} type="text" name="name" value={pic.picName} autoComplete="off" onChange={event => {
                        this.handleChangeValue('picName', event.target.value, indexPic);
                    }} />
                </Form.Group>
                <Form.Group>
                    <Form.Label className="required" >
                        {LangHelper.getResource('Role')}
                    </Form.Label>
                    {
                        pic.picType === HeadlinePicID &&
                        <Form.Control as="select" size="sm" className={pic.isRoleError ? 'invalid shadow-none' : 'shadow-none'} value={pic.role} name="picRoleID" id="picRoleID"
                            onChange={event => {
                                this.handleChangeValue('role', parseInt(event.target.value, 10), indexPic);
                            }}>
                            {headlinePicRoles.map(item => this.renderOptions(item.settingValue, item.settingId))}
                        </Form.Control>
                    }
                    {
                        pic.picType === AccountingPicID &&
                        <Form.Control as="select" size="sm" className={pic.isRoleError ? 'invalid shadow-none' : 'shadow-none'} value={pic.role} name="picRoleID" id="picRoleID"
                            onChange={(currentItem, selectedItemsKey) => {
                                this.handleChangeValue('country', selectedItemsKey, indexPic);
                            }}>
                            {accountingPicRoles.map(item => this.renderOptions(item.settingValue, item.settingId))}
                        </Form.Control>
                    }
                </Form.Group>
                <Form.Group>
                    <Form.Label >
                        {LangHelper.getResource('Languages')}
                    </Form.Label>
                    <MultipleSelect
                        dataSource={languageSelected}
                        keyField='languageId'
                        valueField='name'
                        isAllTextShown
                        isNAOption
                        onChange={(currentItem, selectedItemsKey) => {
                            this.handleChangeValue('language', selectedItemsKey, indexPic);
                        }}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>
                        {LangHelper.getResource('Country')}
                    </Form.Label>
                    <SearchableDropdown
                        className='basic-single'
                        onChange={this.handleChange}
                        options={allSettings.countries.slice(1)}
                        value={pic.country}
                        name="country"
                        isHideNA={false}
                        index={indexPic}
                        OnChangeValue={this.handleChangeCountryValue}
                    />
                </Form.Group>
                {
                    pic.picCommunicationTools.map((picCommunicationTool, indexPicCommunicationTool) => {
                        return <>
                            <Form.Group>
                                <Form.Control as="select" size="sm" className="shadow-none custom-select-communicationTool"
                                    style={{
                                        width: `${picCommunicationTool.type !== '' ? this.getWidth(picCommunicationTool, settingCommunicationTool) : 115}px`
                                    }}
                                    value={picCommunicationTool.type} onChange={event => {
                                        this.handleChangeCommunicationValue('picCommunicationTools', 'type', parseInt(event.target.value, 10), indexPic, indexPicCommunicationTool);
                                    }}>
                                    <option value="" disabled hidden>{LangHelper.getResource('PleaseSelect')}</option>
                                    {settingCommunicationTool.map(item => this.renderOptions(item.settingValue, item.settingId))}
                                </Form.Control>
                                <div className='field-icon comm-tool'>
                                    <textarea type="text" className={`textarea-communication-tool ${picCommunicationTool.isError && 'invalid'}`}
                                        placeholder={LangHelper.getResource('SeparatedByComma')}
                                        value={picCommunicationTool.value} autoComplete="off" onChange={event => {
                                            this.handleChangeCommunicationValue('picCommunicationTools', 'value', event.target.value, indexPic, indexPicCommunicationTool);
                                        }} />
                                    {
                                        this.state.headlineInfoPolicy === Policy.Host && pic.picCommunicationTools.length > 1 &&
                                        <div title='Delete communication tool'
                                            onClick={() => { this.handleConfirmDeleteCommunicationTool(picCommunicationTool, indexPic); }}
                                            className='icon icon-delete'>
                                        </div>
                                    }
                                    {
                                        this.state.headlineInfoPolicy === Policy.Host && indexPicCommunicationTool === (pic.picCommunicationTools.length - 1) &&
                                        <div title='Add communication tool' onClick={() => { this.addNewCommunicationTool(indexPic); }}
                                            className='icon icon-plus'>
                                        </div>
                                    }
                                </div>
                            </Form.Group>
                        </>
                    })
                }
            </div>
        );
    };

    handleSubmitEditConfirm = async () => {
        this.setState({
            confirmSave: {
                show: false,
                data: []
            }
        });
        await this.editHeadlineCommunicationPic();
    };

    handleCloseEditConfirm = () => {
        this.setState({ confirmSave: { show: false, data: [] } });
    };

    renderComfirmChatTypeMapping() {
        return <>
            <div className="confirm-headline">{LangHelper.getResource('ConfirmContentHeadlineCommunicationInfo')}</div>
            {
                this.state.confirmSave.data.map(item => {
                    return (<>
                        <div>
                            <span>{`${item[0].picInfo}: `}</span>
                            {
                                this.renderValueChatTypeMapping(item)
                            }
                        </div>
                    </>);
                })
            }
        </>
    }

    renderComfirmDeleteCommunicationTool() {
        const { settingCommunicationTool } = this.props;
        const communicationToolIndex = settingCommunicationTool.findIndex(x => x.settingId === this.state.confirmDelete.picCommunicationTool.type);
        return <>
            <div className="confirm-headline">Are you going to delete the <strong>{settingCommunicationTool[communicationToolIndex].settingValue}</strong> communication tool?</div>
        </>
    }

    renderValueChatTypeMapping(data) {
        let chatTypeMapping = [];
        data.map((comPic, indexPic) => {
            chatTypeMapping.push(<>
                {indexPic !== 0 && <span>{', '}</span>}
                <span className="bold">{comPic.communicationValue}</span>
                <span>{` (${comPic.communicationTool})`}</span>
            </>);
        })
        return chatTypeMapping;
    }

    render() {
        let { headlinePicRoles, accountingPicRoles, settingCommunicationTool, customerInfo } = this.props;
        let { headlineCommunicationInfo, headlineInfoPolicy, picAssignmentPolicy } = this.state;
        if (!headlinePicRoles || !accountingPicRoles || !settingCommunicationTool || !headlineCommunicationInfo || !customerInfo) {
            return null;
        }
        return (
            <>
                <div id="tab-headline-communication-info" className={`custom-scrollbar`}>
                    {headlineCommunicationInfo.map((item, index) => this.renderInfo(item, index))}
                </div>
                {
                    headlineInfoPolicy === Policy.Host && headlineCommunicationInfo.length > 0 &&
                    <div className='group-btn comm-info-btn'>
                        <Button type="submit" className='btn-save' onClick={this.handleSubmit}>
                            {LangHelper.getResource('Save')}
                        </Button>
                    </div>
                }
                {
                    headlineCommunicationInfo.length === 0 && picAssignmentPolicy &&
                    <div className="none-communication-tool">
                        <div>{LangHelper.getResource('NoCommunicationInfo')}</div>
                        <span>{LangHelper.getResource('AddHeadlineCommunicationToolNoneData')}</span>
                        <Link to='/PicOfHeadline' onClick={() => {
                            if (headlineCommunicationInfo.length === 0) {
                                window.assignPIC = {
                                    username: customerInfo.username
                                };
                            }
                        }} className="add-communication-tool">Assign PIC</Link>
                    </div>
                }
                {
                    headlineCommunicationInfo.length === 0 && !picAssignmentPolicy &&
                    <div className="group-content">
                        <div className='no-data'>{LangHelper.getResource('NoCommunicationInfo')}</div>
                    </div>
                }
                {
                    this.state.confirmSave.show &&
                    <ConfirmPopup
                        className='confirm-headline-modal'
                        title={LangHelper.getResource('ConfirmHeadlineCommunicationInfo')}
                        content={this.renderComfirmChatTypeMapping()}
                        size='lg'
                        onSubmit={this.handleSubmitEditConfirm}
                        onClose={this.handleCloseEditConfirm}
                    />
                }
                {
                    this.state.confirmDelete.show &&
                    <ConfirmPopup
                        className='confirm-headline-modal'
                        title={LangHelper.getResource('ConfirmDeleteCommunicationTool')}
                        content={this.renderComfirmDeleteCommunicationTool()}
                        size='lg'
                        onSubmit={() => { this.deleteCommunicationTool(this.state.confirmDelete.picCommunicationTool, this.state.confirmDelete.indexPic); }}
                        onClose={() => {
                            this.setState({
                                confirmDelete: {
                                    show: false,
                                    picCommunicationTool: null,
                                    indexPic: 0
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
        allSettings,
        customerInfo,
        errors,
        setErrors,
        getHeadlinePicRoles,
        getAccountingPicRoles,
        headlinePicRoles,
        accountingPicRoles,
        settingCommunicationTool,
        setActiveTab,
        activeTab,
        setShowConfirmUnSaved,
        editCustomerInfoDetail,
        isShowAccountInfo,
        isShowAccountantPIC
    } = state;
    return {
        allSettings,
        customerInfo,
        errors,
        setErrors,
        getHeadlinePicRoles,
        getAccountingPicRoles,
        headlinePicRoles,
        accountingPicRoles,
        settingCommunicationTool,
        setActiveTab,
        activeTab,
        setShowConfirmUnSaved,
        editCustomerInfoDetail,
        isShowAccountInfo,
        isShowAccountantPIC
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeadlineCommunicationInfo);