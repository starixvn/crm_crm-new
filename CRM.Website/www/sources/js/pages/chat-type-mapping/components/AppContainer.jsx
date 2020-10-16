import React, { Component } from 'react';
import Filter from './Filter';
import DataGrid from './DataGrid';
import Layout from '../../../components/Layout';

export class AppContainer extends Component {
    constructor(props) {
        super(props);

        this.isHost = document.getElementById('is-host').checked;
    }

    render() {
        return (
            <Layout>
                <Filter isHost={this.isHost} />
                <DataGrid isHost={this.isHost} />
            </Layout>
        );
    }
}

export default AppContainer;