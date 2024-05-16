import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import LangHelper from '@jsroot/common/langHelper';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {Col, Form, Row, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Site from '@jsroot/common/site';

const portal = document.createElement("div");
document.body.appendChild(portal);

export default class UploadFile extends Component {
    isFileNotExist = (file, uploaded, languageKey, isAllLanguages) => {
        return uploaded.findIndex(item => 
            item.name === file.name && 
            item.key === languageKey && 
            item.isAllLanguages === isAllLanguages
        ) === -1;
    };

    handleUploadFiles = files => {
        const uploaded = [...this.props.uploadedFiles];
        const { languageKey, isAllLanguages } = this.props;
        const keyFile = isAllLanguages ? 'All' : languageKey;
        files.some((file, key) => {
            if (this.isFileNotExist(file, uploaded, languageKey, isAllLanguages)) {
                file.key = keyFile;
                uploaded.push(file);
            }
        });
        this.props.setStateUploadFile(uploaded, keyFile);
    };

    handleFileEvent = e => {
        const chosenFiles = Array.prototype.slice.call(e.target.files);
        this.handleUploadFiles(chosenFiles);
    };

    handleRemoveFile = (event, fileName) => {
        event.stopPropagation();
        const { uploadedFiles, languageKey, setStateUploadFile, isAllLanguages } = this.props;

        if (isAllLanguages) {
            this.handleRemoveFileByKey(uploadedFiles, fileName, 'All', setStateUploadFile);
        } else {
            this.handleRemoveFileByKey(uploadedFiles, fileName, languageKey, setStateUploadFile);
        }
    };

    handleRemoveFileByKey = (uploadedFiles, fileName, key, setStateUploadFile) => {
        const fileToRemove = uploadedFiles.find(file => file.name === fileName && file.key === key);
        if (fileToRemove) {
            const filteredFiles = uploadedFiles.filter(file => file.name !== fileToRemove.name || file.key !== fileToRemove.key);
            setStateUploadFile(filteredFiles, key, fileName);
        }
    };

    getFilterUploadFiles = () => {
        const { uploadedFiles, languageKey, isAllLanguages } = this.props;
        if (!isAllLanguages) {
            return uploadedFiles.filter(item => item.key === languageKey);
        }
        return uploadedFiles.filter(item => item.key === 'All');
    };

    onDragEnd = result => {
        if (!result.destination) {
            return;
        }
        const { source, destination } = result;
        const { uploadedFiles, languageKey, isAllLanguages } = this.props;
        const filteredUploadedFiles = this.getFilterUploadFiles();
        const reorderedFiles = this.reorder(filteredUploadedFiles, source.index, destination.index);
        const otherFiles = uploadedFiles.filter(item => 
            isAllLanguages ? item.key !== 'All' : item.key !== languageKey
        );
        otherFiles.push(...reorderedFiles);

        this.props.setStateUploadFile(otherFiles);
    };

    reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };

    handlePreviewImage = (event, fileName) => {
        event.stopPropagation();
        const url = fileName.type === 'string' ?
                    Site.resolveClientUrl(`www/dist/images/announcement/${this.props.id}/${fileName.name}`) : 
                    URL.createObjectURL(fileName);
        window.open(url);
    };
   
    renderListPortalFile = (provided, snapshot, item) =>{
        const usePortal = snapshot.isDragging;

        const child = (
            <Form.Group as={Row} ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
            >
                <Form.Label column sm="2" md="2" />
                {
                    (item.name || item) &&
                    <Col sm="10" md="10" className='list-file-image'>
                        <img src={Site.resolveClientUrl('www/dist/css/images/icon/icon-file-image.png')} />
                        <span className="mr-2 text-color" onClick={event => this.handlePreviewImage(event, item)}>
                            {item.name || item}
                        </span>
                        <span className="rounded-circle icon-delete" onClick={event => this.handleRemoveFile(event, item.name)} >
                            <img src={Site.resolveClientUrl('www/dist/css/images/icon/icon-delete.png')} />
                        </span>
                    </Col>
                }
          </Form.Group>
        );

        if (!usePortal) {
          return child;
        }

        return ReactDOM.createPortal(child, portal);
    };

    renderMessageTooltip = () => {
        return `<div>
            <div>You can attach files in two ways: "All languages" or "Single language".</div>
            <div>- All languages: Attached files to be sent across all languages.</div>
            <div>- Single language: Attached files to be sent a specific language. You can navigate to each language and attach files accordingly.</div>
        </div>`;
    };

    render() {
        const { invalidContentMaxLength,  textInvalidContentMaxLength, languageKey } = this.props;
        const filterUploadFiles = this.getFilterUploadFiles();
        return (
        <Fragment>
            <div className='type-choose-file'>
                <div className='group-choose-file'>
                    <Form.Label>{LangHelper.getResource('FileAttachment')}</Form.Label>
                    <OverlayTrigger placement="auto" overlay={
                        <Tooltip id='tooltip-upload'>
                            <div dangerouslySetInnerHTML={{ __html: this.renderMessageTooltip()}} />
                        </Tooltip>}
                    >
                        <span className="fa fa-question-circle-o" />
                    </OverlayTrigger>
                </div>
                <div className='group-choose-file choose-file' onClick={() => this.props.handleCheckTypeLanguage()}>
                    <input
                        className={`custom ${this.props.isAllLanguages ? 'isActive' : ''}`}
                        type="radio"
                        name={`allLanguage_${languageKey}`}
                        value={this.props.isAllLanguages}
                        checked={this.props.isAllLanguages}
                    />
                    <Form.Label className={`${this.props.isAllLanguages ? 'isActive' : ''}`}>{LangHelper.getResource('AllLanguage')}</Form.Label>
                </div>
                <div className='group-choose-file choose-file' onClick={() => this.props.handleCheckTypeLanguage()}>
                    <input
                        className={`custom ${!this.props.isAllLanguages ? 'isActive' : ''}`}
                        type="radio"
                        name={`singleLanguage_${languageKey}`}
                        value={!this.props.isAllLanguages}
                        checked={!this.props.isAllLanguages}
                    />
                    <Form.Label className={`${!this.props.isAllLanguages ? 'isActive' : ''}`}>{LangHelper.getResource('SingleLanguage')}</Form.Label>
                </div>
            </div>
            <div className="group-upload-file">
                <Form.Group as={Row} controlId="formFileMultiple">
                    <Form.Label column sm="2" md="2" />
                    <Col className='mt-2'>
                        <span className='file-upload'>
                            <label htmlFor="file-btn" className="file-upload-label">
                            <span>Choose Files</span>
                                <input id='file-btn' type='file' multiple onChange={e => this.handleFileEvent(e)} />
                            </label>
                            {
                                filterUploadFiles.length > 0 ?
                                    <span className='count-file pr-5'>{filterUploadFiles.length} files</span>
                                :   <span className='count-file pr-5'>No files chosen</span>
                            }
                            <span>Limit: </span>
                            <span className='text-color'>10MB</span>
                            <span>, Max size: </span>
                            <span className='text-color'>2560*2560</span>
                            {
                                invalidContentMaxLength &&
                                <div span style={{float: 'right', color: 'red'}}>{textInvalidContentMaxLength}</div>
                            }
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
                            filterUploadFiles.map((item, index) => (
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
            </div>
        </Fragment>
        );
    };
}