import React, {PureComponent} from 'react';
import AppContainer from './components/AppContainer';
import '@cssroot/main.scss';

export default class Layout extends PureComponent {
    render() {
        return (
            <AppContainer children={this.props.children} />
        );
    }
}