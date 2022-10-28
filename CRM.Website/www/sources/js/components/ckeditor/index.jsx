import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {CKEditor} from 'ckeditor4-react';
import moment from 'moment';
import { TOOLBAR, EXTRA_TOOLBAR, REMOVE_PLUGINS, EDIT_BLOCK_TEMPLATE } from './constants';
import LangHelper from '@jsroot/common/langHelper';
import DateTimeService from '@jsroot/common/dateTimeService';

export default class CkEditor extends PureComponent {
    static propTypes = {
        colorEditBlock: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired
    };

    static defaultProps = {
        colorEditBlock: '',
        username: '',
        className: '',
        isInvalid: false
    };

    constructor(props) {
        super(props);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data && !this.editor.editor.focusManager.hasFocus) {
            this.editor.editor.setData(this.props.data);
        }
    }

    onEditorChange = event => {
        if(this.editor.editor.focusManager.hasFocus){
            const data = event.editor.getData();
            this.props.onChange(data);
        }
    };

    onLoadPlugin = CKEDITOR => {
        let editText = '';
        let textTemplateEditBlock = EDIT_BLOCK_TEMPLATE;
        const { username, colorEditBlock, data } = this.props;
        if (data === '') {
            editText = '&nbsp;';
        }

        if (colorEditBlock !== null) {
            textTemplateEditBlock = EDIT_BLOCK_TEMPLATE.replace('#105289', colorEditBlock);
        }

        CKEDITOR.plugins.add('editblock', {
            init: function (editor) {
                editor.addCommand('insertEditBlock', {
                    exec: function (editor) {
                        const currentDate = new Date(DateTimeService.toLongDateTimeFormat(DateTimeService.toClientDateTime(new Date())));
                        const html = LangHelper.formatString(textTemplateEditBlock,
                            username,
                            moment(currentDate).format('MM/DD/YYYY, hh:mm:ss A'),
                            editText);
                        editor.insertHtml(html);
                    }
                });
                editor.ui.addButton('EditBlock', {
                    label: 'Insert Edit Block',
                    command: 'insertEditBlock',
                    toolbar: 'insert'
                });
            }
        });

        CKEDITOR.addCss('body {margin: 0 !important;}');
    };


    render() {
        const { className, isInvalid, ...rest } = this.props;
        return (
            <div className={`ckeditor-container ${className} ${isInvalid ? 'is-invalid' : ''}`}>
                <CKEditor
                    {...rest}
                    initData={this.props.data}
                    onChange={this.onEditorChange}
                    config={{
                        removeButtons: '',
                        colorButton_enableMore: true,
                        extraPlugins: EXTRA_TOOLBAR,
                        toolbar: TOOLBAR,
                        allowedContent: true,
                        removePlugins: REMOVE_PLUGINS,
                        language: 'en',
                        enterMode: 2
                    }}
                    style={{body: 'margin: 0'}}
                    onLoaded={editor => this.editor = editor}
                    onNamespaceLoaded={this.onLoadPlugin}
                />
            </div>
        );
    }
}