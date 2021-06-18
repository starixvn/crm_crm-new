

import React, { Component } from 'react';
import {CKEditor} from 'ckeditor4-react';

class AppContainer extends Component {
    render() {
        const  toolbar = [
            { name: 'document', items: [ 'Source'] },
            { name: 'colors', items: [ 'TextColor', 'BGColor' ] },
            { name: 'basicstyles', items: [ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'CopyFormatting', 'RemoveFormat' ] },
            { name: 'paragraph', items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'] },
            { name: 'links', items: [ 'Link', 'Unlink' ] },
            { name: 'insert', items: [ 'Image', 'HorizontalRule'] },
            { name: 'clipboard', items: [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ] },
            // { name: 'styles', items: [ 'Styles', 'Format', 'Font', 'FontSize' ] },
            { name: 'tools', items: [ 'Maximize', 'ShowBlocks' ] }
        ];
        return (
            <div className="App">
                <h2>Using CKEditor 4 in React</h2>
                <CKEditor
                    data="<p>Hello from CKEditor 4!</p>"
                    config={{
                        extraPlugins: "justify,font,colorbutton,image2,subscript",
                        toolbar: toolbar
                    }}
                />
            </div>
        );
    }
}

export default AppContainer;
