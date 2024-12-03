import React, { Component } from 'react';
import LangHelper from '@jsroot/common/langHelper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions';
import { Col, Form, Tabs, Tab, Button, Collapse, Row } from 'react-bootstrap';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const portal = document.createElement("div");
document.body.appendChild(portal);

export class UploadFiles extends Component {

    handleFileEvent = e => {
        const chosenFiles = Array.prototype.slice.call(e.target.files);
        this.handleUploadFiles(chosenFiles);
    };

    isFileNotExist = (file, uploaded, languageKey) => {
        return uploaded.findIndex(item => 
            item.name === file.name && 
            item.key === languageKey
        ) === -1;
    };

    handleUploadFiles = files => {
        const uploaded = [...this.props.uploadedFiles];
        const { languageKey, isAllLanguages } = this.props;
        const keyFile = isAllLanguages ? 'All' : languageKey;
        files.some((file, key) => {
            if (this.isFileNotExist(file, uploaded, keyFile)) {
                file.key = keyFile;
                uploaded.push(file);
            }
        });
        this.props.setStateUploadFile(uploaded, keyFile);
    };

    onDragEnd = result => {
        if (!result.destination) {
            return;
        }
        // const { source, destination } = result;
        // const { uploadedFiles, languageKey, isAllLanguages } = this.props;
        // const filteredUploadedFiles = this.getFilterUploadFiles();
        // const reorderedFiles = this.reorder(filteredUploadedFiles, source.index, destination.index);
        // const otherFiles = uploadedFiles.filter(item => 
        //     isAllLanguages ? item.key !== 'All' : item.key !== languageKey
        // );
        // otherFiles.push(...reorderedFiles);

        // this.props.setStateUploadFile(otherFiles);
    };

    handlePreviewImage = (event, fileName) => {
        event.stopPropagation();
        const url = fileName.type === 'string' ?
                    Site.resolveClientUrl(`www/dist/images/announcement/${this.props.id}/${fileName.name}`) : 
                    URL.createObjectURL(fileName);
        window.open(url);
    };

    handleRemoveFile = (event, fileName) => {
        event.stopPropagation();
        const { uploadedFiles, languageKey, setStateUploadFile, isAllLanguages } = this.props;
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

    render() {
        const filterUploadFiles = [];

        return (
            <div className='group-upload-file'>
                <Form.Label>{LangHelper.getResource('FileAttachment')}</Form.Label>
                <div className="upload-file">
                    <span className='file-upload'>
                        <label htmlFor="file-btn" className="file-upload-label">
                            <span className='text-choose-file'>Choose Files</span>
                            <input id='file-btn' type='file' multiple onChange={e => this.handleFileEvent(e)} />
                        </label>
                        {
                            filterUploadFiles.length > 0 ?
                                <span className='count-file pr-5 pl-5'>{filterUploadFiles.length} files</span>
                            :   <span className='count-file pr-5 pl-5'>No files chosen</span>
                        }
                        <span>Limit: </span>
                        <span className='text-color'>10MB</span>
                        <span>, Max size: </span>
                        <span className='text-color'>2560*2560</span>
                    </span>
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
            </div>
        )
    }
}