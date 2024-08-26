import React, { Component } from 'react';
import Remark from './Remark';

export default class AppContainer extends Component {
    render() {
        return (
            <Remark id={this.props.id} customerType={this.props.customerType} />
        );
    }
}
