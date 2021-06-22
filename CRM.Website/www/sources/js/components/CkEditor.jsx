import React, { PureComponent } from 'react';
import { CKEditor } from 'ckeditor4-react';
import { TOOLBAR, EXTRA_TOOLBAR } from '@jsroot/common/constants';

export default class CkEditor extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: "",
            initData: ""
        };
    }

    // onEditorChange = evt => {
    //     const data = evt.editor.getData();
	// 	this.setState({data});
    //     this.props.handleChangeEditor(data);
	// }

    onBeforeLoad = CKEDITOR =>{
        const data = this.props.data;
        this.setState({data});
        CKEDITOR.plugins.add("editblock", {
            init: function (editor) {
              editor.addCommand("insertEditBlock", {
                exec: function (editor) {
                 let editText = '';
                 if(editor.getData() === "") {
                        editText = "&nbsp;";
                 }
                 editor.insertHtml(
                        '<div class="insert-block">' +
                        '<div class="by-text">by <span class="creator-text">crmTim </span>' +
                            'on 06/21/2021' +
                        '</div>' +
                        '<div class="block">&nbsp;</div>'+
                        '</div><br>' +
                        editText
                  );
                }
              });
              editor.ui.addButton("EditBlock", {
                label: "Insert Edit Block",
                command: "insertEditBlock",
                toolbar: "insert"
              });
              editor.addContentsCss(
                '.insert-block {' +
                    'background-color: #FFFFD0;' +
                    'padding-left: 10px;' +
                    'border-left: 1px solid #CCCCCC' +
                '}' +
                '.by-text {' +
                    'font-size: 9px;' +
                    'color: red;' +
                '}' +
                '.creator-text {' +
                    'color: #105289 !important;' +
                    'font-weight: bold;' +
                    'font-size: 11px;' +
                '}' +
                '.block {' +
                    'border-top: 1px solid #CCCCCC;' +
                    'padding: 5px 0pt 0pt;' +
                '}'
              );    
            }
        });
	}

    render() {
        const {data} = this.props;
        return (
                <CKEditor
                    initData={this.state.data}
                    // onChange={this.onEditorChange}
                    config={{
                        removeButtons: '',
                        extraPlugins: EXTRA_TOOLBAR,
                        toolbar: TOOLBAR,
                        allowedContent: true,
                        removePlugins: 'magicline, elementspath'
                    }}
                    onBeforeLoad={this.onBeforeLoad}
                />
        );
    }
}