import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import WithNavigation from '@jsroot/components/WithNavigation';
import CommonNotification from './CommonNotification';

export class ActionNotification extends Component {
    render() {
        return (
            <Form noValidate>
                <CommonNotification 
                    actionParam={this.props.actionParam}
                    isEdit={true}
                    navigate={this.props.navigate}
                />
            </Form>
        );
    }
};

const ActionNotificationNavigation = WithNavigation(ActionNotification);

export default ActionNotificationNavigation;