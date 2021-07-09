import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { CKEditor } from 'ckeditor4-react';
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
        username: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
            this.setState({ data: this.props.data });
        }
    }

    onEditorChange = event => {
        const data = event.editor.getData();
        this.setState({ data });
        this.props.onChange(data);
    };

    elementsToHtml = () => <div dangerouslySetInnerHTML={{ __html: this.state.data }} />;

    onLoadPlugin = CKEDITOR => {
        let editText = '';
        let textTemplateEditBlock = EDIT_BLOCK_TEMPLATE;
        const { username, currentDate, colorEditBlock } = this.props;
        if (this.state.data === '') {
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
    };

    render() {
        const initData = this.elementsToHtml();
        const { className, ...rest } = this.props;
        return (
            <div className={className}>
                <CKEditor
                    {...rest}
                    initData={initData}
                    onChange={this.onEditorChange}
                    config={{
                        removeButtons: '',
                        colorButton_enableMore: true,
                        extraPlugins: EXTRA_TOOLBAR,
                        toolbar: TOOLBAR,
                        allowedContent: true,
                        removePlugins: REMOVE_PLUGINS,
                        language: 'en'
                    }}
                    onNamespaceLoaded={this.onLoadPlugin}
                />
            </div>
        );
    }
}