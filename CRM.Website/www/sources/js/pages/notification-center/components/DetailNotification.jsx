import React, { Component } from 'react';
import LangHelper from '@jsroot/common/langHelper';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import { Button, Modal } from 'react-bootstrap';
import CommonNotification from './CommonNotification';

export default class DetailNotification extends Component {
    render() {
        return (
            <Modal show className="notification-center-action" dialogAs={DraggableModalDialog}
                backdrop="static" keyboard={false} size="lg" centered
                onHide={this.props.onClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title as="div">{LangHelper.getResource('NotificationDetail')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        <CommonNotification
                            actionParam={this.props.actionParam}
                            isEdit={false}
                            navigate={null}
                        />
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" variant="primary" className='btn-close' size="sm" onClick={this.props.onClose}>
                        {LangHelper.getResource('Close')}
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}