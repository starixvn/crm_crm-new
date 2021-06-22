

import React, { Component } from 'react';
import CkEditor from '@jsroot/components/CkEditor';

class AppContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: ""
        };
    }
    handleChangeEditor = data =>{
        console.log(data);
    }

    render() {
        return (
            <div>
                <CkEditor data={this.state.data} handleChangeEditor={this.handleChangeEditor}/>
            </div>
        );
    }
}

export default AppContainer;