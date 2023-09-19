import React, { Component } from 'react';
import Remark from './Remark';

export class AppContainer extends Component {
    render() {
        return (
            <Remark id={this.props.id} customerType={this.props.customerType} />
        );
    }
}

export default AppContainer;
