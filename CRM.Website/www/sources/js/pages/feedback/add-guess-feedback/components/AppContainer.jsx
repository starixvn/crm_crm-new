

import React, { Component } from 'react';
import {CKEditor} from 'ckeditor4-react';

class AppContainer extends Component {
    
    
    // // Toolbar groups configuration.
    // config.toolbarGroups = [
    //     { name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
    //     { name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
    //     { name: 'editing', groups: [ 'find', 'selection', 'spellchecker' ] },
    //     { name: 'forms' },
    //     '/',
    //     { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
    //     { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
    //     { name: 'links' },
    //     { name: 'insert' },
    //     '/',
    //     { name: 'styles' },
    //     { name: 'colors' },
    //     { name: 'tools' },
    //     { name: 'others' },
    //     { name: 'about' }
    // ];
    render() {
        const  toolbar = [
            { name: 'document', items: [ 'Source'] },
            { name: 'clipboard', items: [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ] },
            { name: 'editing', items: [ 'Find', 'Replace', '-', 'SelectAll', '-', 'Scayt' ] },
            { name: 'forms', items: [ 'Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField' ] },
            '/',
            { name: 'basicstyles', items: [ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'CopyFormatting', 'RemoveFormat' ] },
            { name: 'paragraph', items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'] },
            { name: 'links', items: [ 'Link', 'Unlink' ] },
            { name: 'insert', items: [ 'Image', 'HorizontalRule'] },
            '/',
            { name: 'styles', items: [ 'Styles', 'Format', 'Font', 'FontSize' ] },
            { name: 'colors', items: [ 'TextColor', 'BGColor' ] },
            { name: 'tools', items: [ 'Maximize', 'ShowBlocks' ] }
        ];
        return (
            <div className="App">
                <h2>Using CKEditor 4 in React</h2>
                <CKEditor
                    data="<p>Hello from CKEditor 4!</p>"
                    config={{toolbar: toolbar}}
                />
            </div>
        );
    }
}

export default AppContainer;
