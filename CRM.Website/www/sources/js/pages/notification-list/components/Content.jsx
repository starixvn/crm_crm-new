import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import LangHelper from '@jsroot/common/langHelper';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import Site from '@jsroot/common/site';

export default class Content extends Component {
    getReferenceText = data =>{
        let reference = '';
        const referenceIdList = data.referenceIdList ? data.referenceIdList?.replaceAll(',', ', ') : '';
        switch(data.dataSource) {
            case 'DBMSG.bodb_Message.dbo.Msg':
                reference = `(Msg: ${referenceIdList})`;
            break;
            case 'DBCRM.bodb_CRM.dbo.crmAnnouncement':
                reference = `(Ann: ${referenceIdList})`;
            break;
            default:
                reference = referenceIdList.length > 0 && `(Log: ${referenceIdList})`;
        }

        return reference;
    }

    handlePreviewImage = (event, fileName) => {
        event.preventDefault();
        const id = this.props.data.referenceIdList;
        const url = Site.resolveClientUrl(`www/dist/images/announcement/${id}/${fileName}`);
        window.open(url);
    }

    render() {
        const { data, onClose } = this.props;
        const messageIdDisplay = this.getReferenceText(data);
        const fileNames = !data.fileName ? '' : data.fileName.split(',');
        return (
            <Modal show backdrop='static' keyboard={false} size='lg' centered
                onHide={onClose} className='notification-list-modal'
                dialogAs={DraggableModalDialog}
            >
                <Modal.Header closeButton>
                    <Modal.Title as='div'>
                    {`${LangHelper.getResource('NotificationID')}: ${data.notificationId} `}
                        {messageIdDisplay}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>{`${LangHelper.getResource('DisplayName')}: ${data.displayName}`}</div>
                    <div className={`border p-2 mt-2 mb-3 ${data.dataSource === 'DBCRM.bodb_CRM.dbo.crmAnnouncement' ? 'ann-content' : 'notification-content'}`} dangerouslySetInnerHTML={{ __html: data.content }} />
                    <div className={fileNames.length > 0 ? 'content-border pb-2' : ''}>
                        {
                            fileNames.length > 0 && fileNames.map((image, key) =>(
                                <div key={key} className='d-flex image-section'>
                                    <span className='fa fa-file-image-o mr-2  pt-1'/>
                                        <span className="mr-2 text-color " onClick={event => this.handlePreviewImage(event, image)}>
                                            {image}
                                        </span>
                                </div>
                            ))
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onClose} variant='primary' size='sm'>{LangHelper.getResource('Close')}</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}