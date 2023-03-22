import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import LangHelper from '@jsroot/common/langHelper';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';

export default class Content extends Component {
    getReferenceText = data =>{
        let reference = '';
        switch(data.dataSource) {
            case 'DBMSG.bodb_Message.dbo.Msg':
                reference = `(MessageID: ${data.referenceId})`;
            break;
            case 'DBCRM.bodb_CRM.dbo.crmAnnouncement':
                reference = `(AnnId: ${data.referenceId})`;
            break;
            default:
                reference = data.referenceId > 0 && `(LogID: ${data.referenceId})`;
        }

        return reference;
    }
    render() {
        const { data, onClose } = this.props;
        const messageIdDisplay = this.getReferenceText(data);
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
                    <div>{`${LangHelper.getResource('LetstalkName')}: ${data.letstalkName}`}</div>
                    <div className={`border p-2 mt-2 mb-3 ${data.dataSource === 'AnnouncementId' ? 'ann-content' : 'notification-content'}`} dangerouslySetInnerHTML={{ __html: data.content }} />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onClose} variant='primary' size='sm'>{LangHelper.getResource('Close')}</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}