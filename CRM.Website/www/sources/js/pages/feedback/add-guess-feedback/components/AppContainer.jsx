/* eslint-disable react/no-danger */


import React, { Component } from 'react';
import CkEditor from '@jsroot/components/CkEditor';

class AppContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: ''
        };
    }
    handleChangeEditor = data =>{
       this.setState({data});
    }

    render() {
        return (
            <div className="editor-feedback">
                <CkEditor data={this.state.data} 
                    userName='tim'
                    data={this.state.data}
                    currentDate={new Date()}
                    handleChangeEditor={this.handleChangeEditor}
                />
                <div dangerouslySetInnerHTML={{ __html: this.state.data }} />
            </div>
        );
    }
}

export default AppContainer;