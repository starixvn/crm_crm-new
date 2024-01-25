import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import LangHelper from '@jsroot/common/langHelper';
import { Form, Button } from 'react-bootstrap';
import { HeadlinePicID, AccountingPicID, Letstalk, Telegram } from '@jsroot/common/constants';
import MultipleSelect from '@jsroot/components/multiple-select/index';
import SearchableDropdown from '@jsroot/components/SearchableDropdown';
import DataService from '@jsroot/common/dataService';
import Site from '@jsroot/common/site';
import ConfirmPopup from '@jsroot/components/ConfirmPopup';
import { toast } from 'react-toastify';

export class HeadlineCommunicationInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headlineCommunicationInfo: null,
            confirmSave: {
                show: false,
                data: []
            }
        };
    }

    componentDidUpdate() {
        const { activeTab, customerInfo } = this.props;
        const initialValues = this.getHeadlineCommunicationInfo(customerInfo);
        if (!this.state.headlineCommunicationInfo || !initialValues) {
            return null;
        }
        if (activeTab.nextTab === 'headlineStaffsAndAuthority' || activeTab.nextTab === 'companyService') {
            if (JSON.stringify(this.state.headlineCommunicationInfo).toString() === JSON.stringify(initialValues).toString()) {
                this.props.setShowConfirmUnSaved(false);
                this.props.setActiveTab({
                    currentTab: activeTab.nextTab,
                    nextTab: null
                });
            } else {
                this.props.setShowConfirmUnSaved(true);
            }
        }
    }

    async componentDidMount() {
        await this.props.getHeadlinePicRoles(HeadlinePicID);
        await this.props.getAccountingPicRoles(AccountingPicID);
        const headlineCommunicationInfo = this.getHeadlineCommunicationInfo(this.props.customerInfo);
        this.setState({ headlineCommunicationInfo: headlineCommunicationInfo });
        this.props.setShowConfirmUnSaved(false);
    }

    getHeadlineCommunicationInfo = customerInfo => {
        let headlineCommunicationInfo = [];
        customerInfo.headlineStaffInfoPics.map(pic => {
            let languages = [];
            let communicationTools = [];
            customerInfo.headlineStaffInfoLanguages.map(language => {
                if (language.picID === pic.picID) {
                    languages.push(language.picLanguageID);
                }
            });
            customerInfo.headlineStaffInfoCommunications.map(communication => {
                if (communication.picID === pic.picID) {
                    communicationTools.push({
                        type: communication.picCommunicationId,
                        value: communication.picCommunicationValue,
                        isError: false
                    });
                }
            });
            headlineCommunicationInfo.push({
                country: pic.picCountryID,
                language: languages.join(","),
                picCommunicationTools: communicationTools,
                picId: pic.picID,
                picName: pic.picName,
                picType: pic.picTypeID,
                role: pic.picRoleID,
                isNameError: false,
                isRoleError: false
            });
        });
        return headlineCommunicationInfo;
    }   

    renderOptions = (name, item) => <option key={item} value={item}>{name}</option>;

    handleChangeValue = (name, value, indexPic) => {
        let { headlineCommunicationInfo } = this.state;
        headlineCommunicationInfo[indexPic][name] = value;
        this.setState({ headlineCommunicationInfo: headlineCommunicationInfo });
        this.validateCommunicationInfo();
    }

    handleChangeCommunicationValue = (name, typeName, value, indexPic, indexPicCommunicationTool) => {
        let { headlineCommunicationInfo } = this.state;
        headlineCommunicationInfo[indexPic][name][indexPicCommunicationTool][typeName] = value;
        this.setState({ headlineCommunicationInfo: headlineCommunicationInfo });
        this.validateCommunicationInfo();
    }

    deleteCommunicationTool = (value, type, indexPic) => {
        const data = [...this.state.headlineCommunicationInfo];
        const index = data[indexPic].picCommunicationTools.findIndex(comTool => comTool.value === value && comTool.type === type);
        data[indexPic].picCommunicationTools.splice(index, 1);
        this.setState({ headlineCommunicationInfo: data });
    }

    handleSubmit = async () => {
        const errors = this.validateCommunicationInfo();
        if (errors === null) {
            let validResult = await this.validateEditPic();
            if (validResult.findIndex(x => x !== '') === -1) {
                this.setState({
                    confirmSave: {
                        show: false,
                        data: []
                    }
                });
                await this.editHeadlineCommunicationPic();
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

    editHeadlineCommunicationPic = async () => {
        let { headlineCommunicationInfo } = this.state;
        const params = headlineCommunicationInfo.map(pic => {
            return {
                country: pic.country,
                language: pic.language,
                picId: pic.picId,
                picName: pic.picName,
                picType: pic.picType,
                role: pic.role,
                picCommunicationTools: pic.picCommunicationTools.map(com => { return { type: com.type, value: com.value }; }),
                remark: ''
            };
        });
        Site.blockUI();
        const url = Site.resolveClientUrl('AccountDetail/EditPic');
        await DataService.postDataAsync(url, params).then(response => {
            if (response.data.findIndex(x => !x.isSuccessful) === -1) {
                toast.success(LangHelper.getResource('UpdateHeadlineCommunicationInfoSuccessful'));
            } else {
                toast.errors(response.data.find(x => !x.isSuccessful)[0].message);
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
        const errors = {};
        let { headlineCommunicationInfo } = this.state;

        this.state.headlineCommunicationInfo.map((pic,indexPic) => {
            if (!pic.picName || pic.picName.trim().length === 0) {
                errors.picName = LangHelper.getResource('NameRequired');
                headlineCommunicationInfo[indexPic].isNameError = true;
            } else {
                headlineCommunicationInfo[indexPic].isNameError = false;
            }

            if (!pic.role) {
                errors.role = LangHelper.getResource('RoleRequired');
                headlineCommunicationInfo[indexPic].isRoleError = true;
            } else {
                headlineCommunicationInfo[indexPic].isRoleError = false;
            }

            pic.picCommunicationTools.map((compic,indexCompic) => {
                if (!compic.type || !compic.value) {
                    errors.communication = LangHelper.getResource('CommunicationRequired');
                    headlineCommunicationInfo[indexPic].picCommunicationTools[indexCompic].isError = true;
                } else {
                    headlineCommunicationInfo[indexPic].picCommunicationTools[indexCompic].isError = false;
                }
            });
        });
        this.setState({
            headlineCommunicationInfo: headlineCommunicationInfo
        });
        this.props.setErrors(Object.keys(errors).length === 0 ? null : errors);
        return Object.keys(errors).length === 0 ? null : errors;
    }

    addNewCommunicationTool = indexPic => {
        const error = this.validateCommunicationInfo();
        if (!error) {
            let { headlineCommunicationInfo } = this.state;
            headlineCommunicationInfo[indexPic].picCommunicationTools.push({
                type: '',
                value: '',
                isError: false
            });
            this.setState({ headlineCommunicationInfo: headlineCommunicationInfo });
        }
    }

    handleChangeCountryValue = (item, indexPic) => {
        let { headlineCommunicationInfo } = this.state;
        headlineCommunicationInfo[indexPic].country = item.id;
        this.setState({ headlineCommunicationInfo: headlineCommunicationInfo });
    }

    getWidth = (picCommunicationTool, settingCommunicationTool) => (8 * settingCommunicationTool.find(x => x.settingId === picCommunicationTool.type).settingValue.length) + 15;

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
            <div className='group-item'>
                <Form.Group>
                    <Form.Label className="required">
                        {LangHelper.getResource('Name')}
                    </Form.Label>
                    <Form.Control className={pic.isNameError && 'invalid' } type="text" name="name" value={pic.picName} autoComplete="off" onChange={event => {
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
                            onChange={(currentItem, selectedItemsKey) => {
                                this.handleChangeValue('country', selectedItemsKey, indexPic);
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
                        {LangHelper.getResource('Language')}
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
                                        width: `${picCommunicationTool.type !== '' ? this.getWidth(picCommunicationTool, settingCommunicationTool) : 115}px` }}
                                        value={picCommunicationTool.type} onChange={event => {
                                        this.handleChangeCommunicationValue('picCommunicationTools', 'type', parseInt(event.target.value, 10), indexPic, indexPicCommunicationTool);
                                    }}>
                                    <option value="" disabled hidden>{LangHelper.getResource('PleaseSelect')}</option>
                                    {settingCommunicationTool.map(item => this.renderOptions(item.settingValue, item.settingId))}
                                </Form.Control>
                                <div className='field-icon comm-tool'>
                                    <Form.Control type="text" className={picCommunicationTool.isError && 'invalid'}
                                        value={picCommunicationTool.value} autoComplete="off" onChange={event => {
                                        this.handleChangeCommunicationValue('picCommunicationTools', 'value', event.target.value, indexPic, indexPicCommunicationTool);
                                    }} />
                                    {
                                        pic.picCommunicationTools.length > 1 && 
                                        <div onClick={() => { this.deleteCommunicationTool(picCommunicationTool.value, picCommunicationTool.type, indexPic); }}
                                            className='icon icon-delete'>
                                        </div>
                                    }
                                    {
                                        indexPicCommunicationTool === ( pic.picCommunicationTools.length - 1) &&
                                        <div onClick={() => { this.addNewCommunicationTool(indexPic); }}
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

    render() {
        let { headlinePicRoles, accountingPicRoles, settingCommunicationTool, customerInfo } = this.props;
        let { headlineCommunicationInfo } = this.state;
        if (!headlinePicRoles || !accountingPicRoles || !settingCommunicationTool || !headlineCommunicationInfo || !customerInfo) {
            return null;
        }
        return (
            <>
                <div className='custom-scrollbar'>
                    {headlineCommunicationInfo.map((item, index) => this.renderInfo(item, index))}
                </div>
                {
                    <div className='group-btn comm-info-btn'>
                        <Button type="submit" className='btn-save' onClick={() => { this.handleSubmit(); }}>
                            {LangHelper.getResource('Save')}
                        </Button>
                    </div>
                }
                {
                    headlineCommunicationInfo.length === 0 &&
                    <div className='no-data'>{LangHelper.getResource('ThereIsNoData')}</div>
                }
                {
                    this.state.confirmSave.show &&
                    <ConfirmPopup
                        className='confirm-headline-modal'
                        title={LangHelper.getResource('ConfirmHeadlineCommunicationInfo')}
                        content={
                            <>
                                <div className="confirm-headline">{LangHelper.getResource('ConfirmContentHeadlineCommunicationInfo')}</div>
                                {
                                    this.state.confirmSave.data.map((item, index) => {
                                        if (item !== '') {
                                            return (<>
                                                <div>
                                                    <span>{`${headlineCommunicationInfo[index].picName}: `}</span>
                                                    {
                                                        headlineCommunicationInfo[index].picCommunicationTools.map((comPic, indexPic) => {
                                                            let indexCom = settingCommunicationTool.findIndex(x => x.settingId === comPic.type &&
                                                                (x.settingValue === Letstalk || x.settingValue === Telegram));
                                                            if (indexCom !== -1) {
                                                                return (
                                                                    <>
                                                                        {indexPic !== 0 && <span>{', '}</span>}
                                                                        <span className="bold">{comPic.value}</span>
                                                                        <span>{` (${settingCommunicationTool[indexCom].settingValue})`}</span>
                                                                    </>
                                                                );
                                                            }
                                                        })
                                                    }
                                                </div>
                                            </>);
                                        }
                                    })
                                }
                            </>
                        }
                        size='lg'
                        onSubmit={this.handleSubmitEditConfirm}
                        onClose={this.handleCloseEditConfirm}
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
        setShowConfirmUnSaved } = state;
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
        setShowConfirmUnSaved
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeadlineCommunicationInfo);