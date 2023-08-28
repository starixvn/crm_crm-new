import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {CKEditor} from 'ckeditor4-react';
import moment from 'moment';
import { TOOLBAR, EXTRA_TOOLBAR, REMOVE_PLUGINS, EDIT_BLOCK_TEMPLATE } from './constants';
import LangHelper from '@jsroot/common/langHelper';
import DateTimeService from '@jsroot/common/dateTimeService';
import Site from '@jsroot/common/site';

export default class CkEditor extends PureComponent {
    static propTypes = {
        colorEditBlock: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired
    };

    static defaultProps = {
        colorEditBlock: '',
        username: window.currentUsername,
        className: '',
        isInvalid: false,
        isRemoveToolbarForChatbot: false
    };

    componentDidMount(){
        const modal = document.getElementsByClassName("modal");
        if(modal && modal.length > 0 && modal[0].getAttribute('tabindex')){
            modal[0].removeAttribute('tabindex');
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data && (this.editor && !this.editor.editor.focusManager.hasFocus)) {
            this.editor.editor.setData(this.props.data);
        }
    }

    onEditorChange = event => {
        if(this.editor.editor.focusManager.hasFocus){
            const data = event.editor.getData();
            this.props.onChange(data);
        }
    };

    onKeyPress = event => {
        if(event.data.keyCode === 1114195){
            const keyDownEvent = new KeyboardEvent('keydown', {'key':'s', ctrlKey: true});
            document.dispatchEvent(keyDownEvent);
            event.cancel();
        }
    };

    onBeforeLoad = () =>{
        Site.blockUI();
    }

    onLoaded = editor => {
        this.editor = editor;
        editor.editor.on('instanceReady', function(ev) {
            Site.unblockUI();
        });
    }

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
                editor?.addCommand('insertEditBlock', {
                    exec: function (editor) {
                        const currentDate = new Date(DateTimeService.toLongDateTimeFormat(DateTimeService.toClientDateTime(new Date())));
                        const html = LangHelper.formatString(textTemplateEditBlock,
                            username,
                            moment(currentDate).format('MM/DD/YYYY, hh:mm:ss A'),
                            editText);
                        editor?.insertHtml(html);
                    }
                });
                editor?.ui?.addButton('EditBlock', {
                    label: 'Insert Edit Block',
                    command: 'insertEditBlock',
                    toolbar: 'insert'
                });
            }
        });

        CKEDITOR.addCss('body {margin: 2px !important;}');
    };


    render() {
        const { className, isInvalid, isRemoveToolbarForChatbot , ...rest } = this.props;
        const toolbar = isRemoveToolbarForChatbot ? TOOLBAR.filter(x => x.name !=='document' && x.name !== 'links') : TOOLBAR;
        const removePluginForChatBot = ', image2, editblock, format';
        const removePlugins = isRemoveToolbarForChatbot ? REMOVE_PLUGINS.concat(removePluginForChatBot) : REMOVE_PLUGINS;
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
                        toolbar: toolbar,
                        allowedContent: true,
                        removePlugins: removePlugins,
                        entities: false,
                        basicEntities: false,
                        language: 'en',
                        disableNativeSpellChecker: false,
                        scayt_autoStartup: true,
                        grayt_autoStartup: true,
                        scayt_sLang: 'en_US',
                        enterMode: 2
                    }}
                    style={{body: 'margin: 0'}}
                    onBeforeLoad={this.onBeforeLoad}
                    onLoaded={editor => this.onLoaded(editor)}
                    onNamespaceLoaded={this.onLoadPlugin}
                    onKey={this.onKeyPress}
                />
            </div>
        );
    }
}