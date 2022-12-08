import React, { Component } from 'react';
import LangHelper from '@jsroot/common/langHelper';
import { Button, Modal } from 'react-bootstrap';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import Site from '@jsroot/common/site';

export default class Content extends Component {
    constructor(props) {
        super(props);
    }

    handlePreviewImage = (event, fileName) => {
        event.preventDefault();
        const url = Site.resolveClientUrl(`www/dist/css/images/announcement/${fileName}`);
        window.open(url);
    }

    render() {
        const { data, onClose } = this.props;
        return (
            <Modal show backdrop='static' keyboard={false} size='lg' centered
                onHide={onClose} className='announcement-content-modal'
                dialogAs={DraggableModalDialog}
            >
                <Modal.Header closeButton>
                    <Modal.Title as='div'>{`${LangHelper.getResource('AnnouncementID')}: ${data.announcementId}`}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>{`${LangHelper.getResource('NotificationTemplate')}: ${data.notificationTemplate}`}</div>
                    <div>{`${LangHelper.getResource('Title')}: ${data.title}`}</div>
                    <div className='border p-2 mt-2 mb-3 announcement-content'>{data.content}</div>
                    <div className='d-flex'>
                        <span className='fa fa-file-image-o mr-2  pt-1'/>
                        <span className="mr-2 text-color " onClick={event => this.handlePreviewImage(event, data.imageSource)}>
                            {data.imageSource}
                        </span>
                    </div>
                    <div>{`${LangHelper.getResource('GroupHeadline')}: ${data.groupHeadline}`}</div>
                    <div>{`${LangHelper.getResource('SendDateTimeGMTA8')}: ${data.sendDateString} ${data.sendTimeString} `}</div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onClose} variant='primary' size='sm'>{LangHelper.getResource('Close')}</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}