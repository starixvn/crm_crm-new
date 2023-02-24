import React, { PureComponent, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {Col, Form, Row } from 'react-bootstrap';
import Site from '@jsroot/common/site';

const portal = document.createElement("div");
document.body.appendChild(portal);

export default class UploadFile extends PureComponent {
    handleUploadFiles = files => {
        const uploaded = [...this.props.uploadedFiles];
        files.some(file => {
            const isNotExist = uploaded.findIndex((f) => (f.name || f) === file.name) === -1;
            if (isNotExist) {
                uploaded.push(file);
            }
        });
        this.props.setStateUploadFile(uploaded);
    }

    handleFileEvent = e => {
        e.preventDefault();
        const chosenFiles = Array.prototype.slice.call(e.target.files);
        this.handleUploadFiles(chosenFiles, null);
    }

    handleRemoveFile = (event, fileName) => {
        event.stopPropagation();
        const filterFiler = this.props.uploadedFiles.filter(x => (x.name || x) !== fileName);
        this.props.setStateUploadFile(filterFiler, fileName);
    }

    onDragEnd = result =>{
        if (!result.destination) {
            return;
          }
      
        const uploadedFiles = this.reorder(
            this.props.uploadedFiles,
            result.source.index,
            result.destination.index
        );
    
        this.props.setStateUploadFile(uploadedFiles);
    }

    reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        return result;
    };

    handlePreviewImage = (event, fileName) => {
        event.stopPropagation();
        const url = typeof fileName === 'string' ? 
                    Site.resolveClientUrl(`www/dist/images/announcement/${this.props.id}/${fileName}`) : 
                    URL.createObjectURL(fileName);
        window.open(url);
    }
    
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
                        <span className='fa fa-file-image-o mr-2'/>
                        <span className="mr-2 text-color" onClick={event => this.handlePreviewImage(event, item)}>
                            {item.name || item}
                        </span>
                        <span className="rounded-circle fa fa-trash icon-delete" onClick={event => this.handleRemoveFile(event, (item.name || item))} />
                    </Col>
                }
          </Form.Group>
        );
      
        if (!usePortal) {
          return child;
        }
      
        return ReactDOM.createPortal(child, portal);
    }

    render() {
        const { uploadedFiles } = this.props;
        return (
        <Fragment>
            <Form.Group as={Row} controlId="formFileMultiple">
                    <Form.Label column sm="2" md="2" />
                    <Col >
                        <span className='file-upload'>
                            <label htmlFor="file-btn" className="file-upload-label">
                            <span>Choose Files</span>
                                <input id='file-btn' type='file' ref={this.props.imageInputRef} multiple onChange={this.handleFileEvent} />
                            </label>
                            {
                                uploadedFiles.length > 0 ?
                                    <span className='count-file pr-5'>{uploadedFiles.length} files</span>
                                :   <span className='count-file pr-5'>No files chosen</span>
                            }
                            <span>(</span>
                            <span className='text-color'>limit: 10MB</span>
                            <span>, max size: </span>
                            <span className='text-color'>2560*2560</span>
                            <span>)</span>
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
        </Fragment>
        );
    }
}