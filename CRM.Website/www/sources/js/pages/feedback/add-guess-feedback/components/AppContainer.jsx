

import React, { Component } from 'react';
import {CKEditor} from 'ckeditor4-react';

class AppContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: ''
        };
    }

    onEditorChange( evt ) {
		this.setState( {
			data: evt.editor.getData()
		} );
	}

    onBeforeLoad = (CKEditor) =>{
        CKEditor.config.removeButtons = 'Underline,Subscript,Superscript';

        console.log(CKEditor);
	}

    render() {
        const  toolbar = [
            { name: 'document', items: [ 'Source'] },
            { name: 'colors', items: [ 'TextColor', 'BGColor' ] },
            { name: 'basic styles', items: [ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat' ] },
            { name: 'paragraph', items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'] },
            { name: 'links', items: [ 'Link', 'Unlink' ] },
            { name: 'insert', items: [ 'Image', 'HorizontalRule'] },
            { name: 'clipboard', items: [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ] },
            { name: 'tools', items: [ 'Maximize', 'ShowBlocks' ] }
        ];
        
        return (
            <div className="App">
                <h2>Using CKEditor 4 in React</h2>
                <CKEditor
                    data={this.state.data}
                    onChange={this.onEditorChange}
                    config={{
                        extraPlugins: "justify,font,colorbutton,image2",
                        toolbar: toolbar
                    }}
                    onBeforeLoad={ CKEditor => {
                        this.onBeforeLoad(CKEditor);
                    }
                }
                />
            </div>
        );
    }
}

export default AppContainer;
