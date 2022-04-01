import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Col, Form, Row, Modal } from 'react-bootstrap';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import LangHelper from '@jsroot/common/langHelper';
import DateTimeService from '@jsroot/common/dateTimeService';
import DataService from '@jsroot/common/dataService';
import Site from '@jsroot/common/site';
import MultipleSelect from '@jsroot/components/multiple-select/index';
import DatePicker from '@jsroot/components/date-picker/index';
import SelectWithSearch from '@jsroot/components/SelectWithSearch';


export default class FeedbackDetails extends Component {
    static propTypes = {
        onClose: PropTypes.func.isRequired
    };

    static defaultProps = {
        onClose: function () {
            // nothing
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            communication: null,
            communicationToolOptions: [],
            mainCategoryOptions: [],
            subCategoryOptions: [],
            productOptions: [],
            subProductOptions: [],
            betTypeOptions: [],
            sitesOptions: [],
            settings: null
        };
    }

    async componentDidMount() {
        const id = this.props.feedbackId;
        const url = Site.resolveClientUrl(`MultipleLogs/GetLogSettingByFeedbackId/${id}`);
        await DataService.getDataAsync(url).then(response => {
            const data = response.data;
            const settings = this.getSettings(data.communicationLog, data.settings);
            const extensionOptions = data.settings.extensions.map(item => {
                return {
                    id: item.id,
                    value: item.value,
                    checked: settings.extensionIds.includes(item.id)
                };
            });
            const sitesOptions = data.settings.sites;
            const communicationToolOptions = data.settings.communicationTools.map(item => {
                return {
                    id: item.id,
                    name: item.name,
                    checked: settings.communicationToolIds.includes(item.id)
                };
            });
            const mainCategoryOptions = data.settings.mainCategories.map(item => {
                return {
                    mainCategoryID: item.mainCategoryID,
                    name: item.name,
                    checked: settings.mainCategoryIds.includes(item.mainCategoryID)
                };
            });
            const subCategories = data.settings.subCategories.filter(item => settings.mainCategoryIds.includes(item.mainCategoryID));
            const subCategoryOptions = subCategories.map(item => {
                return {
                    subCategoryId: item.subCategoryId,
                    name: item.name,
                    checked: settings.subCategoryIds.includes(item.subCategoryId)
                };
            });

            const productOptions = data.settings.products.map(item => {
                return {
                    id: item.id,
                    value: item.value,
                    checked: settings.productIds.includes(item.id)
                };
            });
            const subProducts = data.settings.subProducts.filter(item => settings.productIds.includes(item.parentId) && item.parentId !== 0);
            const subProductOptions = subProducts.map(sub => {
                return {
                    id: sub.id,
                    value: sub.value,
                    checked: settings.productIds.includes(sub.id)
                };
            });
            const bettypes = data.settings.bettypes.filter(item => settings.subProductIds.includes(item.parentId) && item.parentId !== 0);
            const betTypeOptions = bettypes.map(item => {
                return {
                    id: item.id,
                    value: item.value,
                    checked: settings.betTypeIds.includes(item.id)
                };
            });

            this.setState({
                communication: this.getSelectedData(data.communicationLog, settings),
                settings: data.settings,
                hasReviewFeedbackPermission: data.hasReviewFeedbackPermission,
                extensionOptions,
                productOptions,
                subProductOptions,
                betTypeOptions,
                communicationToolOptions,
                mainCategoryOptions,
                subCategoryOptions,
                sitesOptions
            });
        });
    }

    getSettings = (communicationLog, settings) => {
        const communicationLogSettings = communicationLog.settings;
        const siteInfos = [];

        settings.sites.forEach(site => {
            const siteFilter = site.childSites.filter(item => item.id === communicationLog.siteId);
            if (siteFilter.length > 0) {
                siteInfos.push(siteFilter[0]);
            }
        });

        const selectedExtensionIds = [],
            selectedProductIds = [],
            selectedBetTypeIds = [],
            selectedCommunicationToolIds = [],
            selectedMainCategoryIds = [],
            selectedSubProductIds = [],
            selectedSubCategoryIds = [];
        communicationLogSettings.forEach(x => {
            switch (x.settingType) {
                case 'Product':
                    if (x.settingId !== settings.productNA?.id) {
                        selectedProductIds.push(x.settingId);
                    }
                    if (x.subSettingId !== settings.subProductNA?.id) {
                        selectedSubProductIds.push(x.subSettingId);
                    }
                    if (x.subSettingIdLevel3 !== settings.bettypeNA?.id) {
                        selectedBetTypeIds.push(x.subSettingIdLevel3);
                    }
                    break;
                case 'Communication':
                    if (x.settingId !== settings.communicationToolNA?.id) {
                        selectedCommunicationToolIds.push(x.settingId);
                    }
                    break;
                case 'Station':
                    if (x.settingId !== settings.extensionNA?.id) {
                        selectedExtensionIds.push(x.settingId);
                    }
                    break;
                case 'Category':
                    selectedMainCategoryIds.push(x.settingId);
                    selectedSubCategoryIds.push(x.subSettingId);
                    break;
            }
        });

        return {
            extensionIds: selectedExtensionIds,
            mainCategoryIds: selectedMainCategoryIds,
            subCategoryIds: selectedSubCategoryIds,
            productIds: selectedProductIds,
            communicationToolIds: selectedCommunicationToolIds,
            subProductIds: selectedSubProductIds,
            betTypeIds: selectedBetTypeIds,
            siteInfos: siteInfos
        };
    };

    getSelectedData = (communicationLog, settings) => {
        const initSite = { id: 0, name: '' };
        return {
            username: communicationLog.userName,
            roleId: communicationLog.roleId,
            countryId: communicationLog.countryId,
            licenseeId: communicationLog.licenseeType,
            responseId: communicationLog.responseId,
            languageId: communicationLog.languageId,
            statusId: communicationLog.statusId,
            noInquiries: communicationLog.noInquiries,
            subject: communicationLog.subject,
            relatedCustomers: communicationLog.relatedCustomers,
            siteInfo: settings.siteInfos.length > 0 ? settings.siteInfos[0] : initSite,
            extensionIds: settings.extensionIds.join(','),
            communicationToolIds: settings.communicationToolIds.join(','),
            productIds: settings.productIds.join(','),
            subProductIds: settings.subProductIds.join(','),
            betTypeIds: settings.betTypeIds.join(','),
            mainCategoryIds: settings.mainCategoryIds.join(','),
            subCategoryIds: settings.subCategoryIds.join(','),
            autoGenerated: communicationLog.autoField,
            description: communicationLog.description,
            solution: communicationLog.solution,
            startTime: new Date(communicationLog.feedbackDate),
            endTime: new Date(communicationLog.resolutionDate),
            review: communicationLog.review,
            reviewer: communicationLog.reviewer,
            solveDate: DateTimeService.toShortDateTimeFormat(communicationLog.solveDate)
        };
    };

    renderFeedbackDetails = () =>{
        const { communication, settings, communicationToolOptions, extensionOptions } = this.state;
        const { languages, countries } = settings;
        return (
            <div>
                <div className="panel-group border-bottom-0">
                    <Form.Group as={Row} className="panel-title title-username">
                            <Form.Label>{communication.username}</Form.Label>
                    </Form.Group>
                    <div className="panel-content">
                        <Form.Group as={Row}>
                            <Form.Label column sm="2" md="2" htmlFor="startTime">
                                {LangHelper.getResource('StartTime')}
                            </Form.Label>
                            <Col sm="4" md="4">
                                <div className='react-datepicker-wrapper-container form-control-wrapper'>
                                    <DatePicker timeInputLabel="Time:" showTimeInput
                                        readOnly selected={communication.startTime}
                                    />
                                </div>
                            </Col>
                            <Form.Label column sm="2" md="2" htmlFor="extensionIds">
                                {LangHelper.getResource('Ext')}
                            </Form.Label>
                            <Col sm="4" md="4">
                                <MultipleSelect
                                    hasAllOption={extensionOptions.length > 0}
                                    isAllTextShown={extensionOptions.length > 0}
                                    dataSource={extensionOptions}
                                    isDisable
                                    keyField='id' valueField='value'
                                    isNAOption
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="2" md="2" htmlFor="endTime">
                                {LangHelper.getResource('EndTime')}
                            </Form.Label>
                            <Col sm="4" md="4">
                                <div className='react-datepicker-wrapper-container form-control-wrapper'>
                                    <DatePicker timeInputLabel="Time:" showTimeInput
                                        readOnly selected={communication.endTime}
                                    />
                                </div>
                            </Col>
                            <Form.Label column sm="2" md="2" htmlFor="countryId">
                                {LangHelper.getResource('Country')}
                            </Form.Label>
                            <Col sm="4" md="4">
                                <Form.Control as="select" size="sm"
                                    id="countryId" name="countryId"
                                    value={communication.countryId}
                                    className='disabled-filed'
                                >
                                    {countries.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="2" md="2" htmlFor="communicationToolId">
                                {LangHelper.getResource('CommunicationTool')}
                            </Form.Label>
                            <Col sm="4" md="4">
                                <MultipleSelect
                                    dataSource={communicationToolOptions}
                                    keyField='id' valueField='name'
                                    isDisable
                                    hasAllOption={communicationToolOptions.length > 0}
                                    isAllTextShown={communicationToolOptions.length > 0}
                                    isNAOption
                                />
                            </Col>
                            <Form.Label column sm="2" md="2" htmlFor="languageId">
                                {LangHelper.getResource('Language')}
                            </Form.Label>
                            <Col sm="4" md="4">
                                <Form.Control as="select" size="sm" className='shadow-none disabled-filed'
                                    id="languageId" name="languageId"
                                    value={communication.languageId}
                                >
                                    {languages.map(item => <option key={item.languageId} value={item.languageId}>{item.name}</option>)}
                                </Form.Control>
                            </Col>
                        </Form.Group>
                        {this.renderDropdownDetail(communication)}
                        {this.renderSelectOptions(communication)}
                        <Form.Group as={Row}>
                            <Form.Label column sm="2" md="2" htmlFor="noInquiries">
                                {LangHelper.getResource('NoOfInquiries')}
                            </Form.Label>
                            <Col sm="4" md="4">
                                <Form.Control size="sm" type="number" min={1} max={3200}
                                    name="noInquiries" className ='disabled-filed'
                                    value={communication.noInquiries} id="noInquiries"
                                />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="2" md="2" htmlFor="relatedTo">
                                {LangHelper.getResource('RelatedTo')}
                            </Form.Label>
                            <Col sm={8} md={8}>
                                {
                                    communication.relatedCustomers.length > 0 ?
                                    <div className="customersList d-flex flex-wrap">
                                        {
                                            communication.relatedCustomers.map((item, index) => {
                                                return (
                                                    <div key={`${index}-${item.custId}`} className={`txt-${this.renderClassNameCustomer(item)}`}>
                                                        <div className="customer-name">{item.username}</div>
                                                    </div>);
                                            })
                                        }
                                    </div>
                                    :
                                    <Form.Control type="text" size="sm" value=''
                                        className="shadow-none disabled-filed" autoComplete="off"
                                    />
                                }
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row}>
                            <Form.Label column sm="2" md="2" htmlFor="subject">
                                {LangHelper.getResource('Subject')}
                            </Form.Label>
                            <Col sm="8" md="8">
                                <Form.Control type="text" size="sm" value={communication.subject}
                                    className="shadow-none disabled-filed" autoComplete="off"
                                />
                            </Col>
                        </Form.Group>
                    </div>
                </div>
                {this.renderRemark(communication)}
                {this.renderSolution(communication)}
                {this.renderReview(communication)}
            </div>
        );
    };

    renderClassNameCustomer = item => {
        let className = '';
        const isInActive = !item.isSiteActive && item.isLicensee;
        if (isInActive && item.custId !== 0) {
            className = 'inactive';
        } else{
            if (item.custId === 0){
                className = 'invalid';
            } else{
                className = item.custId > 0 ? 'customer' : 'guest';
            }
        }
        return className;
    };

    renderDropdownDetail = communication => {
        const { settings, mainCategoryOptions, subCategoryOptions, productOptions, subProductOptions, betTypeOptions, sitesOptions } = this.state;
        const { statuses, roles } = settings;
        return (
            <div>
                <Form.Group as={Row}>
                    <Form.Label column sm="2" md="2" htmlFor="mainCategoryIds">
                        {LangHelper.getResource('MainCategory')}
                    </Form.Label>
                    <Col sm="4" md="4">
                            <MultipleSelect
                                isDisable
                                dataSource={mainCategoryOptions}
                                keyField='mainCategoryID' valueField='name'
                                hasAllOption={mainCategoryOptions.length > 0}
                                isAllTextShown={mainCategoryOptions.length > 0}
                                isNAOption
                            />
                    </Col>
                    <Form.Label column sm="2" md="2" htmlFor="subCategoryIds">
                        {LangHelper.getResource('SubCate')}
                    </Form.Label>
                    <Col sm="4" md="4">
                        <MultipleSelect
                            isDisable
                            dataSource={subCategoryOptions}
                            keyField='subCategoryId' valueField='name'
                            hasAllOption={subCategoryOptions.length > 0}
                            isAllTextShown={subCategoryOptions.length > 0}
                            isNAOption
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm="2" md="2" htmlFor="product">
                        {LangHelper.getResource('Product')}
                    </Form.Label>
                    <Col sm="4" md="4">
                        <MultipleSelect
                            isDisable
                            dataSource={productOptions}
                            keyField='id' valueField='value'
                            hasAllOption={productOptions.length > 0}
                            isAllTextShown={productOptions.length > 0}
                            isNAOption
                        />
                    </Col>
                    <Form.Label column sm="2" md="2" htmlFor="subProductIds">
                        {LangHelper.getResource('SubProduct')}
                    </Form.Label>
                    <Col sm="4" md="4">
                        <MultipleSelect
                            isDisable
                            dataSource={subProductOptions}
                            keyField='id' valueField='value'
                            hasAllOption={subProductOptions.length > 0}
                            isAllTextShown={subProductOptions.length > 0}
                            isNAOption
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm="2" md="2" htmlFor="statusId">
                        {LangHelper.getResource('Status')}
                    </Form.Label>
                    <Col sm="4" md="4">
                        <Form.Control as="select" size="sm"
                            id="statusId" name="statusId"
                            className='disabled-filed'
                            value={communication.statusId}
                        >
                            {statuses.map(item => <option key={item.statusId} value={item.statusId}>{item.name}</option>)}
                        </Form.Control>
                    </Col>
                    <Form.Label column sm="2" md="2" htmlFor="betTypeIds">
                        {LangHelper.getResource('BetType')}
                    </Form.Label>
                    <Col sm="4" md="4">
                        <MultipleSelect
                            isDisable
                            dataSource={betTypeOptions}
                            keyField='id' valueField='value'
                            hasAllOption={betTypeOptions.length > 0}
                            isAllTextShown={betTypeOptions.length > 0}
                            isNAOption
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm="2" md="2" htmlFor="roleId">
                        {LangHelper.getResource('Role')}
                    </Form.Label>
                    <Col sm="4" md="4">
                        <Form.Control as="select" size="sm"
                            id='roleId' name='roleId'
                            className='disabled-filed'
                            value={communication.roleId}
                        >
                            {roles.map(item => <option key={item.id} value={item.id}>{item.value}</option>)}
                        </Form.Control>
                    </Col>
                    <Form.Label column sm="2" md="2" htmlFor="siteInfo" >
                        {LangHelper.getResource('Site')}
                    </Form.Label>
                    <Col column sm="4" md="4" >
                        <SelectWithSearch
                            options={sitesOptions}
                            value={communication.siteInfo.id}
                            name={communication.siteInfo.name}
                        />
                    </Col>
                </Form.Group>
            </div>
        );
    };

    renderSelectOptions = communication => {
        const {licenseeTypes, responses } = this.state.settings;
        return (
            <div>
                <Form.Group as={Row}>
                    <Form.Label column sm="2" md="2" htmlFor="licenseeId">
                        {LangHelper.getResource('LicenseeType')}
                    </Form.Label>
                    <Col sm="4" md="4">
                        <Form.Control as="select" size="sm"
                            id="licenseeId" name="licenseeId"
                            value={communication.licenseeId}
                            className='disabled-filed'
                        >
                            {licenseeTypes.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
                        </Form.Control>
                    </Col>
                    <Form.Label column sm="2" md="2" htmlFor="responseId">
                                {LangHelper.getResource('Response')}
                    </Form.Label>
                    <Col sm="4" md="4">
                        <Form.Control as="select" size="sm" className='shadow-none disabled-filed'
                            id="responseId" name="responseId"
                            value={communication.responseId}
                        >
                            {responses.map(item => <option key={item.id} value={item.id}>{item.value}</option>)}
                        </Form.Control>
                    </Col>
                </Form.Group>
            </div>
        );
    };

    renderRemark = communication => {
        return (
            <div className="panel-group border-bottom-0">
                <Form.Group as={Row} className="panel-title">
                    <Form.Label>{LangHelper.getResource('Remark')}</Form.Label>
                </Form.Group>
                <div className="panel-content">
                        <Fragment>
                            <div style={{ whiteSpace: 'pre-line' }}>{communication.autoGenerated}</div>
                            <br />
                            <div dangerouslySetInnerHTML={{ __html: communication.description }} />
                        </Fragment>
                </div>
            </div>
        );
    };

    renderSolution = communication => {
        return (
            <div className="panel-group border-bottom-0">
                <Form.Group as={Row} className="panel-title">
                    <Form.Label>{LangHelper.getResource('Solution')}</Form.Label>
                </Form.Group>
                <div className="panel-content">
                    {
                        <div dangerouslySetInnerHTML={{ __html: communication.solution }} />
                    }
                </div>
            </div>
        );
    };

    renderReview = communication => {
        return (
            <div className="panel-group">
                <Form.Group as={Row} className='panel-title border-bottom-0'>
                    <Form.Label>{LangHelper.getResource('Reviewed')}</Form.Label>
                    <input className="ml-2" type='checkbox'
                        checked={communication.isReviewed}
                        disabled
                    />
                    <span className="font-italic ml-2">
                        {communication.reviewerName ? LangHelper.formatString(LangHelper.getResource('ReviewerBy'), communication.reviewerName, communication.solveDate) : ''}
                    </span>
                </Form.Group>
            </div>
        );
    };

    renderForm = () =>{
        return (
            <Form >
                <Modal.Body>
                    {
                        this.renderFeedbackDetails()
                    }
                </Modal.Body >
            </Form>
        );
    };

    render() {
        const { communication, settings } = this.state;
        if (communication === null || settings === null) {
            return null;
        }

        return (
            <div>
                <Modal show className="feedback-detail" dialogAs={DraggableModalDialog}
                    backdrop="static" keyboard={false} size="xl" centered
                    onHide={() => this.props.onClose(false)}
                >
                    <Modal.Header closeButton>
                        <Modal.Title as="div">{LangHelper.getResource(this.props.title)}</Modal.Title>
                    </Modal.Header>
                    {this.renderForm()}
                </Modal>
            </div>
        );
    }
}