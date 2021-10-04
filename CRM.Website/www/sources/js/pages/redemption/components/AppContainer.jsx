import React, { Component } from 'react';
import Filter from './Filter';

export class AppContainer extends Component {
    render() {
        return (
            <div className="col-md-10">
                <Filter />
            </div>
        )
    }
}

export default AppContainer;
