import React, { Component } from 'react';
import {CKEditor} from 'ckeditor4-react';


export default class RichEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: ''
        };
    }

    // onEditorChange( evt ) {
	// 	this.setState( {
	// 		data: evt.editor.getData()
	// 	} );
	// }

    onBeforeLoad = CKEditor =>{
        // CKEditor.config.coreStyles_subscript = {
        //     element: 'h1',
        //     attributes: { 'class': 'Subscript' },
        //     overrides: 'sub'
        // };
        // CKEditor.config.coreStyles_superscript = {
        //     element: 'h1',
        //     attributes: { 'class': 'Superscript' },
        //     overrides: 'sup'
        // };

        console.log(CKEditor);
	}

    render() {
        const  toolbar = [
            { name: 'document', items: [ 'Source'] },
            { name: 'colors', items: [ 'TextColor', 'BGColor' ] },
            { name: 'basic styles', items: [ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat' ] },
            { name: 'paragraph', items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'] },
            { name: 'links', items: [ 'Link', 'Unlink' ] },
            { name: 'styles', items: ['Format', 'Font', 'FontSize' ] },
            { name: 'insert', items: [ 'Image2', 'HorizontalRule'] },
            { name: 'clipboard', items: [ 'Cut', 'Copy', 'Paste', '-', 'Undo', 'Redo' ] },
            { name: 'tools', items: [ 'Maximize'] }
        ];
        
        return (
            <div className="App">
                <CKEditor
                    data={this.state.data}
                    // onChange={this.onEditorChange}
                    config={{
                        removeButtons: '',
                        extraPlugins: "justify,font,colorbutton,image2",
                        toolbar: toolbar
                    }}
                    onBeforeLoad={ CKEditor => {
                        this.onBeforeLoad(CKEditor);
                    }}
                />
            </div>
        );
    }
}