import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import LangHelper from '@jsroot/common/langHelper';
import { Form } from 'react-bootstrap';
import { HeadlinePicID, AccountingPicID } from '@jsroot/common/constants';
import MultipleSelect from '@jsroot/components/multiple-select/index';
import SearchableDropdown from '@jsroot/components/SearchableDropdown';

export class HeadlineCommunicationInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            headlineCommunicationInfo: null
        };
    }

    async componentDidMount() {
        await this.props.getPicCommunicationTools();
        await this.props.getHeadlinePicRoles(HeadlinePicID);
        await this.props.getAccountingPicRoles(AccountingPicID);
        this.getHeadlineCommunicationInfo(this.props.customerInfo);
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
                        value: communication.picCommunicationValue
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
                role: pic.picRoleID
            });
        });
        this.setState({ headlineCommunicationInfo: headlineCommunicationInfo });
    }

    render() {
        let { headlinePicRoles, accountingPicRoles, communicationTool } = this.props;
        let { headlineCommunicationInfo } = this.state;
        if (!headlinePicRoles || !accountingPicRoles || !communicationTool || !headlineCommunicationInfo) {
            return null;
        }
        return (
            <>
                {headlineCommunicationInfo.map((item, index) => this.renderInfo(item, index))}
            </>
        );
    }

    renderOptions = (name, item) => <option key={item} value={item}>{name}</option>;

    handleChangeValue = (name, value, indexPic) => {
        let { headlineCommunicationInfo } = this.state;
        headlineCommunicationInfo[indexPic][name] = value;
        this.setState({ headlineCommunicationInfo: headlineCommunicationInfo });
    }

    handleChangeCommunicationValue = (name, typeName, value, indexPic, indexPicCommunicationTool) => {
        let { headlineCommunicationInfo } = this.state;
        headlineCommunicationInfo[indexPic][name][indexPicCommunicationTool][typeName] = value;
        this.setState({ headlineCommunicationInfo: headlineCommunicationInfo });
    }

    deleteCommunicationTool = (value, indexPic) => {
        let { headlineCommunicationInfo } = this.state;
        let picCommunicationTools = headlineCommunicationInfo[indexPic].picCommunicationTools.filter(comTool => comTool.value !== value);
        headlineCommunicationInfo[indexPic].picCommunicationTools = picCommunicationTools;
        this.setState({ headlineCommunicationInfo: headlineCommunicationInfo });
    }

    addNewCommunicationTool = indexPic => {
        let { headlineCommunicationInfo } = this.state;
        headlineCommunicationInfo[indexPic].picCommunicationTools.push({
            type: 0,
            value: ''
        });
        this.setState({ headlineCommunicationInfo: headlineCommunicationInfo });
    }

    handleChangeCountryValue = (item, indexPic) => {
        let { headlineCommunicationInfo } = this.state;
        headlineCommunicationInfo[indexPic].country = item.id;
        this.setState({ headlineCommunicationInfo: headlineCommunicationInfo });
    }

    renderInfo = (pic, indexPic) => {        
        let { allSettings, headlinePicRoles, accountingPicRoles, communicationTool } = this.props;
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
                    <Form.Control type="text" name="name" value={pic.picName} autoComplete="off" onChange={event => {
                        this.handleChangeValue('picName', event.target.value, indexPic);
                    }} />
                </Form.Group>
                <Form.Group>
                    <Form.Label className="required" >
                        {LangHelper.getResource('Role')}
                    </Form.Label>
                    {
                        pic.picType === HeadlinePicID &&
                        <Form.Control as="select" size="sm" className="shadow-none" value={pic.role} name="picRoleID" id="picRoleID"
                            onChange={(currentItem, selectedItemsKey) => {
                                this.handleChangeValue('country', selectedItemsKey, indexPic);
                        }}>
                            {headlinePicRoles.map(item => this.renderOptions(item.settingValue, item.settingId))} 
                        </Form.Control>
                    }
                    {
                        pic.picType === AccountingPicID &&
                        <Form.Control as="select" size="sm" className="shadow-none" value={pic.role} name="picRoleID" id="picRoleID"
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
                                <Form.Control as="select" size="sm" className="shadow-none" value={picCommunicationTool.type} onChange={event => {
                                    this.handleChangeCommunicationValue('picCommunicationTools', 'type', parseInt(event.target.value, 10), indexPic, indexPicCommunicationTool);
                                }}>
                                    {communicationTool.map(item => this.renderOptions(item.settingValue, item.settingId))}
                                </Form.Control>
                                <div className='field-icon'>
                                    <Form.Control type="text" value={picCommunicationTool.value} autoComplete="off" onChange={event => {
                                        this.handleChangeCommunicationValue('picCommunicationTools', 'value', event.target.value, indexPic, indexPicCommunicationTool);
                                    }} />
                                    <div onClick={() => {this.deleteCommunicationTool(picCommunicationTool.value, indexPic);}}
                                        className='icon icon-delete'>
                                    </div>
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
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const {
        allSettings,
        customerInfo,
        getPicCommunicationTools,
        getHeadlinePicRoles,
        getAccountingPicRoles,
        headlinePicRoles,
        accountingPicRoles,
        communicationTool } = state;
    return {
        allSettings,
        customerInfo,
        getPicCommunicationTools,
        getHeadlinePicRoles,
        getAccountingPicRoles,
        headlinePicRoles,
        accountingPicRoles,
        communicationTool
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeadlineCommunicationInfo);