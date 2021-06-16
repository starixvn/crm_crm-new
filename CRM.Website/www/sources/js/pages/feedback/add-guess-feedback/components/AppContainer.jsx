/* eslint-disable react/no-danger */


import React, { Component } from 'react';
import RichTextEditor from '@jsroot/components/RichTextEditor';
export class AppContainer extends Component {
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