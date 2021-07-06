import React, { PureComponent } from 'react';
import { CKEditor } from 'ckeditor4-react';
import { TOOLBAR, EXTRA_TOOLBAR } from '@jsroot/common/constants';
import moment from 'moment';
import PropTypes from 'prop-types';

export default class CkEditor extends PureComponent {
    static propTypes = {
        data: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        onChange: PropTypes.func
    };

    static defaultProps = {
        data: '',
        username: '',
        onChange: function () {
            // nothing
        }
    };
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            username: ''
        };
    }

    handleChange = evt => {
        const data = evt.editor.getData();
        this.setState({ data });
        this.props.onChange(data);
    }

    onBeforeLoad = () => {
        const data = this.props.data;
        this.setState({ data });
    }

    htmlToElements = () => {
        return (
            <div dangerouslySetInnerHTML={{ __html: this.state.data }} />
        );
    }

    onLoadPlugin = CKEDITOR => {
        let editText = '';
        const { username, currentDate } = this.props;
        if (this.state.data === "") {
            editText = "&nbsp;";
        }
        const textTemplate =
            '<div>\
            <div style="background-color: #FFFFD0; padding-left: 10px; border-left: 1px solid #CCCCCC;">\
                <div style="font-size: 9px; color:red">by <span style="color: #105289; font-weight: bold; font-size: 11px;">{0}</span> on {1}</div>\
                <div style="border-top: 1px solid #CCCCCC; padding: 5px 0pt 0pt;">{2}</div>\
            </div>\
        </div>\
        <br>';

        const html = this.stringFormat(textTemplate, [username, moment(currentDate).format("MM/DD/YYYY, hh:mm:ss A"), editText]);
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

    stringFormat = function (strValue, paramArr) {
        if (!strValue) {
            return "";
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
        const removePlugins = 'magicline, elementspath';
        const initData = this.htmlToElements();
        return (
            <CKEditor
                initData={initData}
                onChange={this.handleChange}
                config={{
                    removeButtons: '',
                    colorButton_enableMore: true,
                    extraPlugins: EXTRA_TOOLBAR,
                    toolbar: TOOLBAR,
                    allowedContent: true,
                    removePlugins: removePlugins,
                    language: 'en'
                }}
                onBeforeLoad={this.onBeforeLoad}
                onNamespaceLoaded={this.onLoadPlugin}
            />
        );
    }
}