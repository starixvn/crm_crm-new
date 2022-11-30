import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { Formik } from 'formik';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import FormikErrorMessage from '@jsroot/components/FormikErrorMessage';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import LangHelper from '@jsroot/common/langHelper';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export class NewAnnouncement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uploadedFiles: []
        };
    }

    componentDidMount() {
        this.props.getLanguages();
        const param = {
            notificationTypeId: null,
            notificationTemplateName: '',
            PageSize: 0
        };
        this.props.getNotificationTemplates(param);
    }

    handleUploadFiles = files => {
        const uploaded = [...this.state.uploadedFiles];
        files.some(file => {
            const isValidWidthHeigh = this.validateWidthHeigh(file);
            const isValidFileType = this.validFileType(file);
            const isValidSize = this.validFileSize(file);
            const isNotExist = uploaded.findIndex((f) => f.name === file.name) === -1;
            if (isValidFileType && isValidWidthHeigh && isValidSize && isNotExist) {
                uploaded.push(file);
            }
        });
        this.setState({uploadedFiles: uploaded});
    }

    handleFileEvent = e => {
        e.preventDefault();
        const chosenFiles = Array.prototype.slice.call(e.target.files);
        this.handleUploadFiles(chosenFiles);
    }

    validateWidthHeigh = file =>{
        const url = URL.createObjectURL(file);
        const img = new Image();
        const maximumHeighWidth = 2560;
        img.src = url;
        const result = img.onload = function() {
            if(img.width > maximumHeighWidth || img.height > maximumHeighWidth){
                return false;
            }
            return true;
        }();
        return result;
    }

    validFileSize = file =>{
        const convertSize = Math.round(file.size / 1024).toFixed(2);
        const maximumSize10MB = 10000;
        if(convertSize > maximumSize10MB){
            return false;
        }
        return true;
    };

    validFileType = file =>{
        const fileTypes = [
            'image/apng',
            'image/bmp',
            'image/gif',
            'image/jpeg',
            'image/pjpeg',
            'image/png',
            'image/svg+xml',
            'image/tiff',
            'image/webp',
            'image/x-icon'
        ];
        return fileTypes.includes(file.type);
    }

    handleRemoveFile = (event, fileName) => {
        event.preventDefault();
        const filterFiler = this.state.uploadedFiles.filter(x => x.name !== fileName);
        this.setState({uploadedFiles: filterFiler});
    }

    onDragEnd = result =>{
        if (!result.destination) {
            return;
          }
      
        const uploadedFiles = this.reorder(
            this.state.uploadedFiles,
            result.source.index,
            result.destination.index
        );
    
        this.setState({
            uploadedFiles
        });
    }

    reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };

    renderListPortalFile = (provided, snapshot, item) =>{
        const usePortal = snapshot.isDragging;
        const portal = document.createElement("div");
        document.body.appendChild(portal);
        const child = (
            <Form.Group as={Row} ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
            >
                <Form.Label column sm="4" md="3" />
                <Col sm="8" md="9" className='list-file-image'>
                    <span className='fa fa-file-image-o mr-2' />
                    <span className="mr-2 text-color">
                        {item.name}
                    </span>
                    <span className="rounded-circle fa fa-trash icon-delete" onClick={event => this.handleRemoveFile(event, item.name)} />
                </Col>
          </Form.Group>
        );
      
        if (!usePortal) {
          return child;
        }
      
        return ReactDOM.createPortal(child, portal);
    }

    renderForm = ({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        setFieldValue,
        isSubmitting
    }) => {
        const {uploadedFiles} = this.state;
        return (
            <Form noValidate onSubmit={handleSubmit}>
                <Modal.Body>
                    <FormikErrorMessage touched={touched} errors={errors} fieldNames={Object.keys(values)} />
                    {
                        this.props.createAnnouncementResult &&
                        <ResponseMessage isSuccessful={this.props.createAnnouncementResult.isSuccessful}
                            message={this.props.createAnnouncementResult.message || LangHelper.getResource('InsertAnnouncementSuccessfully')}
                        />
                    }
                    <Form.Group as={Row}>
                        <Form.Label column sm="4" md="3" className="required" htmlFor="notificationTemplate">
                            {LangHelper.getResource('NotificationTemplate')}
                        </Form.Label>
                        <Col sm="8" md="9">
                            <Form.Control as="select" size="sm" className="shadow-none"
                                isInvalid={touched.notificationTemplate && errors.notificationTemplate}
                                name="notificationTemplate" id="notificationTemplate"
                                value={values.notificationTemplate}
                                onChange={handleChange}
                            >
                                <option value="" hidden disabled>{LangHelper.getResource('PleaseSelect')}</option>
                                {this.props.notificationTemplates.map((value, key) => <option key={key} value={value.notificationTemplateId}>{value.notificationTemplateName}</option>)}
                            </Form.Control>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm="4" md="3"
                            className="required" htmlFor="title"
                        >
                            {LangHelper.getResource('Title')}
                        </Form.Label>
                        <Col sm="8" md="9">
                            <Form.Control type="text" size="sm" value={values.title}
                                name="title" id="title"
                                className="shadow-none" autoComplete="off"
                                isInvalid={touched.title && errors.title}
                                onChange={handleChange}
                            />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formFileMultiple">
                        <Form.Label column sm="4" md="3"
                            className="required"
                        >
                            {LangHelper.getResource('File')}
                        </Form.Label>
                        <Col >
                            <span className="fa fa-upload mr-2 mt-2" />
                            <span className="btn-file">
                                <span>Browse and attach image (limit: </span>
                                <span className='text-color'>10MB</span>
                                <span>, max size: </span>
                                <span className='text-color'>2560*2560)</span>
                                <input type="file" multiple onChange={this.handleFileEvent} />
                            </span>
                        </Col>
                    </Form.Group>
                    <DragDropContext onDragEnd={this.onDragEnd}>
                        <Droppable droppableId="droppable-list-image">
                            {(droppableProvided, droppableSnapshot) => (
                                <div
                                    ref={droppableProvided.innerRef}
                                    {...droppableProvided.droppableProps}
                                >
                            {
                                uploadedFiles.map((item, index) => (
                                    <Draggable key={index} draggableId={`draggableId-${index}`} index={index}>
                                        {(draggableProvided, draggableSnapshot)  => (
                                            this.renderListPortalFile(draggableProvided, draggableSnapshot, item)
                                        )}
                                    </Draggable>
                                ))}
                                {droppableProvided.placeholder}
                            </div>
                        )}
                       </Droppable>
                     </DragDropContext>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" variant="primary" size="sm" disabled={isSubmitting}>{LangHelper.getResource('Save')}</Button>
                    <Button type="submit" variant="primary" size="sm" onClick={this.props.onClose}>{LangHelper.getResource('Cancel')}</Button>
                </Modal.Footer>
            </Form>
        );
    };

    handleSubmit = (values, { setSubmitting }) => {
        setSubmitting(true);
        const formData = new FormData();
        this.state.uploadedFiles.forEach(file => {
            formData.append('formFile', file);
        });
        
        this.props.createAnnouncement(formData).then(() => {
            if (this.props.createAnnouncementResult.isSuccessful) {
                setTimeout(() => {
                    this.props.onSuccess();
                }, 3000);
            } else {
                setSubmitting(false);
            }
        });
    };

    validateFormik = values => {
        
    }

    render() {
        const initialValues = {
            notificationTemplate: '',
            title: ''
        };

        const {languages, notificationTemplates} = this.props;
        if(!languages || !notificationTemplates) {
            return null;
        }

        return (
            <Modal show className="new-announcement-modal" dialogAs={DraggableModalDialog}
                backdrop="static" keyboard={false} size="lg" centered
                onHide={this.props.onClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title as="div">{LangHelper.getResource('InsertAnnouncement')}</Modal.Title>
                </Modal.Header>
                <Formik
                    initialValues={initialValues}
                    validate={values => this.validateFormik(values)}
                    onSubmit={this.handleSubmit}
                >
                    {this.renderForm}
                </Formik>
            </Modal>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(ActionCreators, dispatch);

const mapStateToProps = state => {
    const { languages, notificationTemplates, createAnnouncementResult } = state;
    return { languages, notificationTemplates, createAnnouncementResult };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewAnnouncement);