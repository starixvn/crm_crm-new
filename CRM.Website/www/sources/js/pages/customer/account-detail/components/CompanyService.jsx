import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import { ActionCreators } from '../actions';
import { bindActionCreators } from 'redux';
import { Form, Button } from 'react-bootstrap';
import LangHelper from '@jsroot/common/langHelper';
import { Table, HeaderRow, HeaderCell, Cell, Row } from '@jsroot/components/react-grid/index';
import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import AutoComplete from '@jsroot/components/AutoComplete';
import { toast } from 'react-toastify';
import { getPermission } from '@jsroot/common/shareScripts';
import { Policy, FunctionKey } from '@jsroot/common/constants';
import { ParamsSubmit } from '../common.functions';

export class CompanyService extends Component {    
    constructor(props) {
        super(props);
        this.state = {
            companyService: null,
            chatTypeMapping: null,
            headlineInfoPolicy: null
        };
    }
    async componentDidMount() {
        await this.getHeadlineCompanyService();
        getPermission(FunctionKey.HeadlineInfo, true).then(response => {
            this.setState({ headlineInfoPolicy: response });
        });
    }

    async getHeadlineCompanyService () {
        await this.props.getHeadlineCompanyService({ headlineID: this.props.customerInfo?.custId });
        this.setState({
            companyService: this.props.headlineCompanyService.item1.map(item => {
                return {
                    headlineID: item.headlineID,
                    companyServiceID: item.companyServiceID,
                    companyServiceName: item.companyServiceName,
                    isOffered: item.isOffered,
                    communicationID: item.communicationID,
                    communiationName: item.communiationName,
                    communicationValue: item.communicationValue,
                    isError: false,
                    isSuggest: false
                }
            }),
            chatTypeMapping: this.props.headlineCompanyService.item2
        });
    }

    componentDidUpdate() {
        if (this.props.activeTab != null) {
            const { activeTab, headlineCompanyService } = this.props;
            const initialValues = headlineCompanyService.item1.map(item => {
                return {
                    headlineID: item.headlineID,
                    companyServiceID: item.companyServiceID,
                    companyServiceName: item.companyServiceName,
                    isOffered: item.isOffered,
                    communicationID: item.communicationID,
                    communiationName: item.communiationName,
                    communicationValue: item.communicationValue,
                    isError: false,
                    isSuggest: false
                }
            });
            if (!this.state.companyService || !initialValues) {
                return null;
            }

            if (activeTab.nextTab === 'headlineCommunicationInfo' || activeTab.nextTab === 'headlineStaffsAndAuthority') {
                if (JSON.stringify(this.state.companyService).toString() === JSON.stringify(initialValues).toString()) {
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
    }

    validateCommunicationTool = () => {
        const errors = {};
        let { companyService } = this.state;

        this.state.companyService.map((service, index) => {
            if (service.isOffered && (service.communicationID === 0 || service.communicationValue === null)) {
                errors.communication = LangHelper.getResource('CommunicationRequired');
                companyService[index].isError = true;
            } else {
                companyService[index].isError = false;
            }
        });
        this.setState({
            companyService: companyService
        });
        this.props.setErrors(Object.keys(errors).length === 0 ? null : errors);
        return Object.keys(errors).length === 0 ? null : errors;
    }

    editHeadlineCompanyService = async () => {
        let { companyService } = this.state;
        const params = {
            headlineID: this.props.customerInfo.custId,
            headlineCompanyServices: companyService.map(service => {
                return {
                    companyServiceID: service.companyServiceID,
                    isOffered: service.isOffered,
                    communicationID: service.communicationID,
                    communicationValue: service.communicationValue
                };
            })
        }

        Site.blockUI();
        const url = Site.resolveClientUrl('AccountDetail/EditHeadlineCompanyService');
        await DataService.postDataAsync(url, params).then(async response =>  {
            if (response.data.isSuccessful) {
                await this.getHeadlineCompanyService();
                toast.success(LangHelper.getResource('UpdateHeadlineCompanyServiceSuccessful'));
            } else {
                toast.errors(response.data.message);
            }
        }).then(() => Site.unblockUI()).catch(Site.handleAxiosError);
    }

    handleSubmit = async () => {
        const errors = this.validateCommunicationTool();
        if (errors === null) {
            Site.blockUI();
            const url = Site.resolveClientUrl('AccountDetail/CheckCustomerExistsOnCRM');
            await DataService.postDataAsync(url, { customerId: this.props.customerInfo?.custId }).then(async response => {
                if (response.data === 1) {
                    await this.editHeadlineCompanyService();
                } else {
                    await this.updateNewCrmCustomer();
                }
            }).then(() => Site.unblockUI()).catch(Site.handleAxiosError);
        }
    }

    updateNewCrmCustomer = async () => {
        const params = ParamsSubmit(this.props.customerInfo.custId, this.props.customerInfo);
        this.props.editCustomerInfoDetail(params).then(async () => {
            if (this.props.editCustomerInfoDetailResult.isSuccessful) {
                await this.editHeadlineCompanyService();
            }
        });
    }

    buildHeader = () => {
        return (
            <HeaderRow>
                <HeaderCell colWidth={460}>{LangHelper.getResource('Name')}</HeaderCell>
                <HeaderCell colWidth={120}>{LangHelper.getResource('Offer')}</HeaderCell>
                <HeaderCell colspan={2} colWidth={120}>{LangHelper.getResource('CommunicationTool')}</HeaderCell>
                <HeaderCell className='display-colSpan' colWidth={300}></HeaderCell>
            </HeaderRow>
        );
    };

    buildBody = () => {
        const { companyService } = this.state;
        const { settingCommunicationTool } = this.props;
        if (companyService.length > 0) {
            return [
                <Fragment key={'body'}>
                    {companyService.map((item, indexService) => this.renderRow(item, indexService, settingCommunicationTool))}
                </Fragment>
            ];
        }

        return [
            <Row key='body-NoData' className="no-data" >
                <Cell className='text-center' colSpan={4}>{LangHelper.getResource('ThereIsNoData')}</Cell>
            </Row>
        ];
    };

    handleChangeValue = (name, value, indexService, isSuggest) => {
        let { companyService } = this.state;
        this.state.companyService.map((item, index) => {
            if (index != indexService) {
                companyService[index].isSuggest = false;
            }
        });
        companyService[indexService][name] = value;
        companyService[indexService].isSuggest = isSuggest;
        this.setState({ companyService: companyService });
    }

    handleCoppy = service => {
        let { companyService } = this.state;
        this.state.companyService.map((ser, indexSer) => {
            companyService[indexSer].isOffered = service.isOffered;
            companyService[indexSer].communicationID = service.communicationID;
            companyService[indexSer].communicationValue = service.communicationValue;
        })
        this.setState({ companyService: companyService });
    }

    renderOptions = (name, item) => <option key={item} value={item}>{name}</option>;

    debounceInputChange = (searchText, communicationID) => {
        let suggestions = [];
        this.state.chatTypeMapping.map(x => {
            if (x.communicationID === communicationID && x.communicationValue.includes(searchText)) {
                suggestions.push(x.communicationValue);
            }
        })
        return suggestions;
    }

    renderRow = (item, indexService, settingCommunicationTool) => {
        const communicationSuggestions = item.isSuggest ? this.debounceInputChange(item.communicationValue, item.communicationID) : [];
        return (
            <Row key={item.companyServiceID}>
                <Cell>{item.companyServiceName}
                    <img className='icon-copy' src={Site.resolveClientUrl('www/dist/css/images/icon/icon-copy.svg')} alt="icon copy"
                        onClick={event => {this.handleCoppy(item);}} />
                </Cell>
                <Cell>
                    <Form.Control as="select" size="sm" value={item.isOffered} name="isOffered" id="isOffered"
                        onChange={event => {
                            this.handleChangeValue('isOffered', event.target.value === "true", indexService, false);
                        }}>
                            <option value={true}>{LangHelper.getResource('Yes')}</option>
                            <option value={false}>{LangHelper.getResource('No')}</option>
                    </Form.Control>
                </Cell>
                <Cell>
                    <Form.Control as="select" size="sm" className={item.isError && 'invalid'}
                        value={item.communicationID} onChange={event => {
                            this.handleChangeValue('communicationID', parseInt(event.target.value, 10), indexService, false);
                        }}>
                            <option value={0} disabled hidden>{LangHelper.getResource('PleaseSelect')}</option>
                            {settingCommunicationTool.map(item => this.renderOptions(item.settingValue, item.settingId))}
                    </Form.Control>
                </Cell>
                <Cell>
                    <AutoComplete
                        isError={item.isError}
                        value={item.communicationValue}
                        options={communicationSuggestions}
                        placeholder=''
                        onChange={value => this.handleChangeValue('communicationValue', value, indexService, true)}
                        onInputChange={searchText => this.debounceInputChange(searchText, item.communicationID)}
                    />
                </Cell>
            </Row>
        );
    };

    render() {
        const { companyService, chatTypeMapping, headlineInfoPolicy } = this.state;
        if (!companyService && !chatTypeMapping) {
            return null;
        }
        return (
                <div className={`${companyService.length < 10 && 'table-inTab'} company-service`}>
                    <Table
                        width={1005}
                        autoWidth={false}
                        header={this.buildHeader()}
                        body={this.buildBody()}
                        isPaging={false}
                        containerPadding={0}
                        adjustedHeight={10}
                    />
                {
                    headlineInfoPolicy === Policy.Host &&
                    <div className='group-btn'>
                        <Button type="submit" className='btn-save' onClick={() => { this.handleSubmit(); }}>
                            {LangHelper.getResource('Save')}
                        </Button>
                    </div>
                }
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const {
        allSettings,
        customerInfo,
        getHeadlineCompanyService,
        settingCommunicationTool,
        headlineCompanyService,
        setActiveTab,
        activeTab,
        setShowConfirmUnSaved,
        editCustomerInfoDetail
    } = state;
    return {
        allSettings,
        customerInfo,
        getHeadlineCompanyService,
        settingCommunicationTool,
        headlineCompanyService,
        setActiveTab,
        activeTab,
        setShowConfirmUnSaved,
        editCustomerInfoDetail
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyService);