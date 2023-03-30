import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { Formik } from 'formik';
import CkEditor from '@jsroot/components/ckeditor/index';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import LangHelper from '@jsroot/common/langHelper';
import UnderlineButton from '@jsroot/common/underlineButton';
import FormikErrorMessage from '@jsroot/components/FormikErrorMessage';
import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import DateTimeService from '@jsroot/common/dateTimeService';
import WithHotKey from '@jsroot/components/WithHotKey';

export default class EditMultipleReviewAndStatus extends Component {
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
            feedbackIds: props.feedbackIds,
            logInfo: null,
            editResult: null,
            isReviewed: false,
            isSubmitting: false
        };
    }

    async componentDidMount() {
        const id = this.props.feedbackIds[0];
        const url = Site.resolveClientUrl(`MultipleLogs/GetLogByFeedbackId/${id}`);
        await DataService.getDataAsync(url).then(response => {
            this.setState({ logInfo: response.data, isReviewed: response.data.isReviewed });
        }).catch(Site.handleAxiosError);
    }

    handleKeyDownFunc = event => {
        if (event.ctrlKey && event.key === 's') {
            event.preventDefault();
            this.formik.submitForm();
        }
    }

    handleSubmit = async values => {
        this.setState({ isSubmitting: true });
        const params = {
            listFeedbackId: this.props.feedbackIds.join(', '),
            statusId: parseInt(values.statusId, 10),
            reviewNote: values.review,
            isReviewed: this.state.isReviewed
        };

        const url = Site.resolveClientUrl('MultipleLogs/EditMultipleLogStatuses');
        await DataService.postDataAsync(url, params).then(response => {
            this.setState({ editResult: response.data });
            if (response.data.isSuccessful) {
                setTimeout(() => {
                    this.props.onClose(true);
                }, 3000);
            } else {
                this.setState({ isSubmitting: false });
            }
        }).catch(Site.handleAxiosError);
    };

    handleChangeCheckBox = () => {
        this.setState(prevState => ({
            isReviewed: !prevState.isReviewed
        }));
    };

    validateFormik = values => {
        const errors = {};
        if (this.state.isReviewed && !values.review) {
            errors.review = LangHelper.getResource('ReviewRequired');
        }

        return errors;
    };

    renderForm = ({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        setFieldValue
    }) => {
        const { editResult, logInfo, isReviewed } = this.state;
        const dateFormat = DateTimeService.toShortDateTimeFormat(logInfo.solveDate);
        return (
            <Form noValidate onSubmit={handleSubmit}>
                <Modal.Body>
                    <WithHotKey handleKeyDownFunc={this.handleKeyDownFunc} isDocumentHandle/>
                    <FormikErrorMessage isSubmitting={this.state.isSubmitting}touched={touched} errors={errors} fieldNames={Object.keys(values)} />
                    {
                        editResult &&
                        <ResponseMessage isSuccessful={editResult.isSuccessful}
                            message={editResult.message || LangHelper.getResource('UpdateMultipleLogsSuccessfully')}
                        />
                    }
                    <div className="panel-group">
                        <div className='alert-box-warn'>
                            <div className='text' column sm="12" md="12">
                                {LangHelper.getResource('MultipleReviewAndUpdateStatusText')}
                            </div>
                            <Form.Group as={Row}>
                                <Form.Label column sm="2" md="2" htmlFor="status">{LangHelper.getResource('Status')}</Form.Label>
                                <Col sm="3" md="3">
                                    <Form.Control as="select" size="sm"
                                        column sm="3" md="3"
                                        name="statusId" id="statusId"
                                        value={values.statusId}
                                        onChange={handleChange}
                                    >
                                        {
                                            this.props.statuses.map(item =>
                                            (<option key={item.statusId} value={item.statusId}>
                                                {item.name}
                                            </option>)
                                            )
                                        }

                                    </Form.Control>
                                </Col>
                            </Form.Group>
                        </div>
                        <Form.Group as={Row} className='title'>
                            <Form.Label className="mr-2" column sm="1" md="1">{LangHelper.getResource('Reviewed')}</Form.Label>
                            <input type='checkbox' className='cursor-pointer'
                                checked={isReviewed}
                                onChange={this.handleChangeCheckBox}
                            />
                            {
                                logInfo.isReviewed &&
                                <Form.Label column sm="5" md="5">{`(Reviewed by ${logInfo.reviewer} on ${dateFormat})`}</Form.Label>
                            }
                        </Form.Group>
                        {
                            isReviewed && <div className="text-editor">
                                <CkEditor isInvalid={touched.review && errors.review}
                                    data={values.review} username={window.currentUsername}
                                    onChange={value => setFieldValue('review', value)}
                                />
                            </div>
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button size="sm" type="submit" variant="primary" disabled={this.state.isSubmitting} id='submit'>
                        <UnderlineButton.saveButton />
                    </Button>
                </Modal.Footer>
            </Form>
        );
    };

    render() {
        if (this.state.logInfo === null) {
            return null;
        }

        const initialValues = {
            statusId: this.state.logInfo.statusId,
            review: this.state.logInfo.review
        };
        return (
            <Modal show className="edit-multiple-review-status-modal-dialog" dialogAs={DraggableModalDialog}
                backdrop="static" keyboard={false} size="lg" centered
                onHide={() => this.props.onClose(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title as="div">{LangHelper.getResource('MultipleReviewAndUpdateStatus')}</Modal.Title>
                </Modal.Header>
                <Formik
                    innerRef={el => this.formik = el}
                    initialValues={initialValues}
                    validate={this.validateFormik}
                    onSubmit={this.handleSubmit}
                >
                    {this.renderForm}
                </Formik>
            </Modal>
        );
    }
}