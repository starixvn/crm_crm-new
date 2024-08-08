import React, { Component } from 'react';
import WithNavigation from '@jsroot/components/WithNavigation';
import CommonNotification from './CommonNotification';

export class ActionNotification extends Component {
    render() {
        return (
            <CommonNotification
                actionParam={this.props.actionParam}
                isEdit={true}
                navigate={this.props.navigate}
            />
        );
    }
};

const ActionNotificationNavigation = WithNavigation(ActionNotification);

export default ActionNotificationNavigation;