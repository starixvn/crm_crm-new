import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import LangHelper from '@jsroot/common/langHelper';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';

export default class Content extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { data, onClose } = this.props;
        const LogIdDisplay = `(${LangHelper.getResource('LogID')}: ${data.referenceIdList})`;
        const messageIdDisplay = `(${LangHelper.getResource('MessageID')}: ${data.referenceIdList})`;
        return (
            <Modal show backdrop='static' keyboard={false} size='lg' centered
                onHide={onClose} className='notification-list-modal'
                dialogAs={DraggableModalDialog}
            >
                <Modal.Header closeButton>
                    <Modal.Title as='div'>
                    {`${LangHelper.getResource('NotificationID')}: ${data.notificationId} `}
                        {data.dataSource === 'DBMSG.bodb_Message.dbo.Msg' ? messageIdDisplay : data.referenceIdList > 0 && LogIdDisplay}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>{`${LangHelper.getResource('LetstalkName')}: ${data.letstalkName}`}</div>
                    <div className='border p-2 mt-2 mb-3 notification-content' dangerouslySetInnerHTML={{ __html: data.content }} />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={onClose} variant='primary' size='sm'>{LangHelper.getResource('Close')}</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}