import React, { PureComponent, Fragment } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {Col, Form, Row } from 'react-bootstrap';
import Site from '@jsroot/common/site';

const portal = document.createElement("div");
document.body.appendChild(portal);

class UploadFile extends PureComponent {
    handleUploadFiles = files => {
        const uploaded = [...this.props.uploadedFiles];
        files.some(file => {
            const isNotExist = uploaded.findIndex((f) => f.name === file.name) === -1;
            if (isNotExist) {
                uploaded.push(file);
            }
        });
        this.props.setStateUploadFile(uploaded);
        this.props.imageInputRef.current.value = null;
    }

    handleFileEvent = e => {
        e.preventDefault();
        const chosenFiles = Array.prototype.slice.call(e.target.files);
        this.handleUploadFiles(chosenFiles);
    }

    handleRemoveFile = (event, fileName) => {
        event.stopPropagation();
        const filterFiler = this.props.uploadedFiles.filter(x => x.name !== fileName);
        this.props.setStateUploadFile(filterFiler);
        this.props.imageInputRef.current.value = null;
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
        const urlSrc = typeof fileName === 'string' ? Site.resolveClientUrl(`www/dist/css/images/announcement/${fileName}`) : URL.createObjectURL(fileName);
        window.open(urlSrc);
    }
    
    renderListPortalFile = (provided, snapshot, item) =>{
        const usePortal = snapshot.isDragging;

        const child = (
            <Form.Group as={Row} ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
            >
                <Form.Label column sm="2" md="2" />
                <Col sm="10" md="10" className='list-file-image'>
                    <span className='fa fa-file-image-o mr-2'/>
                    <span className="mr-2 text-color" onClick={event => this.handlePreviewImage(event, item)}>
                        {item.name || item}
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

    render() {
        return (
        <Fragment>
            <Form.Group as={Row} controlId="formFileMultiple">
                    <Form.Label column sm="2" md="2" />
                    <Col >
                        <span className="fa fa-upload mr-2 mt-2" />
                        <span className="btn-file">
                            <span>Browse and attach image (limit: </span>
                            <span className='text-color'>10MB</span>
                            <span>, max size: </span>
                            <span className='text-color'>2560*2560)</span>
                            <input ref={this.props.imageInputRef} type="file" multiple onChange={this.handleFileEvent} />
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
                            this.props.uploadedFiles.map((item, index) => (
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

export const UploadFileForwardingRef = React.forwardRef((props, ref) => 
    <UploadFile {...props} imageInputRef={ref}/>
);