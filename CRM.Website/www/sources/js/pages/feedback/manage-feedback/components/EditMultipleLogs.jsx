import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button, Col, Form, Row, OverlayTrigger, Tooltip, Collapse } from 'react-bootstrap';
import { Formik } from 'formik';
import moment from 'moment';
import { ActionCreators } from '../actions';
import DatePicker from '@jsroot/components/date-picker/index';
import CkEditor from '@jsroot/components/ckeditor/index';
import FormikErrorMessage from '@jsroot/components/FormikErrorMessage';
import MultipleSelect from '@jsroot/components/multiple-select/index';
import AutoComplete from '@jsroot/components/AutoComplete';
import SweetModalDialog from '@jsroot/components/SweetModalDialog';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import Site from '@jsroot/common/site';
import DateTimeService from '@jsroot/common/dateTimeService';
import LangHelper from '@jsroot/common/langHelper';
import PropTypes from 'prop-types';
import DataService from '@jsroot/common/dataService';

import {
    getSubCategories, getSubProducts, getBetTypes, getSubjectOnChangeCategories,
    getProductParams, getCategoryParams, generateTimeAndToolPrefix
} from '@jsroot/common/shareScripts';

export class EditMultipleLogs extends Component {
    static propTypes = {
        feedbackArr: PropTypes.array.isRequired,
        onClose: PropTypes.func.isRequired
    };

    static defaultProps = {
        feedbackArr: [],
        onClose: function () {
            // nothing
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            feedbackArr: props.feedbackArr,
            collapse: {
                customerInfo: true,
                details: false,
                description: false,
                solution: false
            },
            communication :null,
            extensionOptions: [],
            communicationToolOptions: [],
            mainCategoryOptions: [],
            subCategoryOptions: [],
            productOptions: [],
            subProductOptions: [],
            betTypeOptions: [],
            relatedCustomers: [],
            feedbackSubjectTemplates: [],
            confirmEditMultipleLogsDialog: { show: false },
            settings: null,
            hasReviewFeedbackPermission: false,
            editResult: null
        };
    }

    async componentDidMount() {
        const id = this.props.feedbackArr[0].feedbackId;
        const url = Site.resolveClientUrl(`Feedback/GetLogSettingByFeedbackId/${id}`);
        await DataService.getDataAsync(url).then(response => {
            const data = response.data;
            const communicationSettings = this.getFeedbackSettings(data.communicationLogs, data.settings);
            const extensionOptions = data.settings.extensions.map(item => {
                return {
                    id: item.id,
                    value: item.value,
                    checked: communicationSettings.extensionIds.includes(item.id)
                };
            });
            const communicationToolOptions = data.settings.communicationTools.map(item => {
                return {
                    id: item.id,
                    name: item.name,
                    checked: communicationSettings.communicationToolIds.includes(item.id)
                };
            });
            const mainCategoryOptions = data.settings.mainCategories.map(item => {
                return {
                    mainCategoryID: item.mainCategoryID,
                    name: item.name,
                    checked: communicationSettings.mainCategoryIds.includes(item.mainCategoryID)
                };
            });
            const subCategories = data.settings.subCategories.filter(item => communicationSettings.mainCategoryIds.includes(item.mainCategoryID));
            const subCategoryOptions = subCategories.map(item => {
                return {
                    subCategoryId: item.subCategoryId,
                    name: item.name,
                    checked: communicationSettings.subCategoryIds.includes(item.subCategoryId)
                };
            });

            const productOptions = data.settings.products.map(item => {
                return {
                    id: item.id,
                    value: item.value,
                    checked: communicationSettings.productIds.includes(item.id)
                };
            });
            const subProducts = data.settings.subProducts.filter(item => communicationSettings.productIds.includes(item.parentId) && item.parentId !== 0);
            const subProductOptions = subProducts.map(item => {
                return {
                    id: item.id,
                    value: item.value,
                    checked: communicationSettings.productIds.includes(item.id)
                };
            });
            const bettypes = data.settings.bettypes.filter(item => communicationSettings.subProductIds.includes(item.parentId) && item.parentId !== 0);
            const betTypeOptions = bettypes.map(item => {
                return {
                    id: item.id,
                    value: item.value,
                    checked: communicationSettings.betTypeIds.includes(item.id)
                };
            });

            this.setState({
                communication: this.initFormik(data.communicationLogs, data.settings),
                settings: data.settings,
                hasReviewFeedbackPermission: data.hasReviewFeedbackPermission,
                extensionOptions,
                productOptions,
                subProductOptions,
                betTypeOptions,
                communicationToolOptions,
                mainCategoryOptions,
                subCategoryOptions
            });
        });
    }

    getCommunicationSettings = (communicationLog, settings) => {
        const communicationLogSettings = communicationLog.settings;
        const selectedExtensionIds = [],
            selectedProductIds = [],
            selectedSubProductIds = [],
            selectedBetTypeIds = [];
            selectedCommunicationToolIds = [],
            selectedMainCategoryIds = [],
            selectedSubCategoryIds = [],
            communicationLogSettings.forEach(x => {
            switch (x.settingType) {
                case 'Station':
                    if (x.settingId !== settings.extensionNA?.id) {
                        selectedExtensionIds.push(x.settingId);
                    }
                    break;
                case 'Communication':
                    if (x.settingId !== settings.communicationToolNA?.id) {
                        selectedCommunicationToolIds.push(x.settingId);
                    }
                    break;
                case 'Category':
                    selectedMainCategoryIds.push(x.settingId);
                    selectedSubCategoryIds.push(x.subSettingId);
                    break;
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
            }
        });

        return {
            extensionIds: selectedExtensionIds,
            communicationToolIds: selectedCommunicationToolIds,
            mainCategoryIds: selectedMainCategoryIds,
            subCategoryIds: selectedSubCategoryIds,
            productIds: selectedProductIds,
            subProductIds: selectedSubProductIds,
            betTypeIds: selectedBetTypeIds
        };
    };

    handleCloseConfirmEditMultipleLogsDialog = () => {
        this.setState({
            confirmEditMultipleLogsDialog: { show: false }
        });

        this.formik.setSubmitting(false);
    };

    initFormik = (communicationLog, settings) => {
        const communicationSettings = this.getCommunicationSettings(communicationLog, settings);

        return {
            extensionIds: communicationSettings.extensionIds.join(','),
            communicationToolIds: communicationSettings.communicationToolIds.join(','),
            productIds: communicationSettings.productIds.join(','),
            subProductIds: communicationSettings.subProductIds.join(','),
            betTypeIds: communicationSettings.betTypeIds.join(','),
            mainCategoryIds: communicationSettings.mainCategoryIds.join(','),
            subCategoryIds: communicationSettings.subCategoryIds.join(','),
            roleId: communicationLog.roleId,
            countryId: communicationLog.countryId,
            responseId: communicationLog.responseId,
            languageId: communicationLog.languageId,
            statusId: communicationLog.statusId,
            noInquiries: communicationLog.noInquiries > 0 ? communicationLog.noInquiries : '',
            subject: communicationLog.subject,
            autoGenerated: communicationLog.autoField,
            description: communicationLog.description,
            solution: communicationLog.solution,
            feedbackDate: new Date(communicationLog.feedbackDate),
            resolutionDate: new Date(communicationLog.resolutionDate),
            isReviewed: communicationLog.isReviewed,
            review: communicationLog.review,
            reviewer: communicationLog.reviewer,
            solveDate: DateTimeService.toShortDateTimeFormat(communicationLog.solveDate),
            isPreviewDescription: true,
            isPreviewSolution: true
        };
    };

    render() {
        const { communication, settings, confirmEditMultipleLogsDialog} = this.state;
        if (communication === null || settings === null) {
            return null;
        }

        return (
            <Fragment>
                <Modal show className="edit-multiple-log-modal-dialog" dialogAs={DraggableModalDialog}
                    backdrop="static" keyboard={false} size="xl" centered
                    onHide={this.props.onClose}
                >
                    <Modal.Header closeButton>
                        <Modal.Title as="div">{LangHelper.getResource('EditMultipleLogs')}</Modal.Title>
                    </Modal.Header>
                    <Formik
                        innerRef={el => this.formik = el}
                        initialValues={communication}
                        validate={this.validateFormik}
                        onSubmit={this.handleSubmit}
                    >
                        {this.renderForm}
                    </Formik>
                </Modal>
                {
                    confirmEditMultipleLogsDialog.show &&
                    <SweetModalDialog size="lg"
                        title={LangHelper.getResource('Confirmation')}
                        contents={<div>Are you sure you want to Add or Update the Feedback/Log?</div>}
                        buttons={[
                            <Button variant="primary" size="sm" onClick={this.handleConfirmEditFeedback}>
                                {LangHelper.getResource('OK')}
                            </Button>,
                            <Button variant="primary" size="sm" onClick={this.handleCloseConfirmEditMultipleLogsDialog}>
                                {LangHelper.getResource('Cancel')}
                            </Button>
                        ]}
                        onClose={this.handleCloseConfirmEditMultipleLogsDialog}
                    />
                }
            </Fragment>
        );
    }
}

export default EditMultipleLogs;
