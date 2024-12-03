import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import LangHelper from '@jsroot/common/langHelper';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {Col, Form, Row, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Site from '@jsroot/common/site';

const portal = document.createElement("div");
document.body.appendChild(portal);

export class FileUpload extends Component {

    handleFileEvent = e => {
        const chosenFiles = Array.prototype.slice.call(e.target.files);
        this.handleUploadFiles(chosenFiles);
    };

    isFileNotExist = (file, uploaded) => {
        return uploaded.findIndex(item => item.name === file.name) === -1;
    };

    handleUploadFiles = files => {
        const uploaded = [...this.props.uploadedFiles];
        files.some((file, key) => {
            if (this.isFileNotExist(file, uploaded)) {
                uploaded.push(file);
            }
        });
        this.props.setStateUploadFile(uploaded);
    };

    onDragEnd = result => {
        if (!result.destination) {
            return;
        }
        const { source, destination } = result;
        const { uploadedFiles } = this.props;
        const reorderedFiles = this.reorder(uploadedFiles, source.index, destination.index);
        console.log('reorderedFiles', reorderedFiles);
        this.props.setStateUploadFile(reorderedFiles);
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

    handleRemoveFile = (event, fileName) => {
        event.stopPropagation();
        const { uploadedFiles, setStateUploadFile } = this.props;

        const fileToRemove = uploadedFiles.find(file => file.name === fileName);
        if (fileToRemove) {
            const filteredFiles = uploadedFiles.filter(file => file.name !== fileToRemove.name);
            setStateUploadFile(filteredFiles, fileName);
        }
    };

    renderListPortalFile = (provided, snapshot, item) =>{
        const usePortal = snapshot.isDragging;

        const child = (
            <Form.Group ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
            >
                {
                    (item.name || item) &&
                    <div className='list-file-image'>
                        <img src={Site.resolveClientUrl('www/dist/css/images/icon/icon-file-image.png')} />
                        <span className="mr-2 text-color" onClick={event => this.handlePreviewImage(event, item)}>
                            {item.name || item}
                        </span>
                        <span className="rounded-circle icon-delete" onClick={event => this.handleRemoveFile(event, item.name)} >
                            <img src={Site.resolveClientUrl('www/dist/css/images/icon/icon-delete.png')} />
                        </span>
                    </div>
                }
          </Form.Group>
        );

        if (!usePortal) {
          return child;
        }

        return ReactDOM.createPortal(child, portal);
    };

    render() {
        const uploadedFiles = [...this.props.uploadedFiles];

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
                            uploadedFiles.length > 0 ?
                                <span className='count-file pr-5 pl-5'>{uploadedFiles.length} files</span>
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
                </div>
            </div>
        )
    }
}