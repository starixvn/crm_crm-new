import React, { PureComponent } from 'react';
import { CKEditor } from 'ckeditor4-react';
import { TOOLBAR, EXTRA_TOOLBAR, REMOVE_PLUGINS, TEXT_TEMPLATE } from '@jsroot/common/constants';
import moment from 'moment';
import PropTypes from 'prop-types';

export default class CkEditor extends PureComponent {
    static propTypes = {
        colorText: PropTypes.string.isRequired,
        data: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        readOnly: PropTypes.bool.isRequired,
        userName: PropTypes.string.isRequired
    };

    static defaultProps = {
        colorText: '',
        data: '',
        onChange: function () {
            // nothing
        },
        readOnly: false,
        userName: ''
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


    handleChange = evt => {
        const data = evt.editor.getData();
        this.setState({ data });
        this.props.onChange(data);
    }


    elementsToHtml = () => {
        return (
            <div dangerouslySetInnerHTML={{ __html: this.state.data }} />
        );
    }

    onLoadPlugin = CKEDITOR => {
        let editText = '';
        let textTemplateEditBlock = TEXT_TEMPLATE;
        const { userName, currentDate, colorText} = this.props;
        if (this.state.data === '') {
            editText = "&nbsp;";
        }
        
        if(colorText !== null) {
            textTemplateEditBlock = TEXT_TEMPLATE.replace("#105289", colorText);
        }
        const html = this.formatTemplateEditBlock(textTemplateEditBlock, [userName, moment(currentDate).format("MM/DD/YYYY, hh:mm:ss A"), editText]);
        CKEDITOR.plugins.add("editblock", {
            init: function (editor) {
                editor.addCommand("insertEditBlock", {
                    exec: function (editor) {
                        editor.insertHtml(html);
                    }
                });
                editor.ui.addButton("EditBlock", {
                    label: "Insert Edit Block",
                    command: "insertEditBlock",
                    toolbar: "insert"
                });
            }
        });
    }

    formatTemplateEditBlock = function (strValue, paramArr) {
        if (!strValue) {
            return '';
        }
        var len = paramArr.length;
        for (var i = 0; i < len; i++) {
            var paramInfo = paramArr[i];
            var formatIndex = '{' + i + '}';
            while (strValue.indexOf(formatIndex) !== -1) {
                strValue = strValue.replace(formatIndex, paramInfo);
            }
        }
        return strValue;
    };

    render() {
        const initData = this.elementsToHtml();
        const className = this.props.className;
        return (
            <div className={className}>
            <CKEditor
                initData={initData}
                onChange={this.handleChange}
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
                readOnly={this.props.readOnly}
            />
            </div>
        );
    }
}