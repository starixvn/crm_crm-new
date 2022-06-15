(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./www/sources/css/pages/remark/index.scss":
/*!*************************************************!*\
  !*** ./www/sources/css/pages/remark/index.scss ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./www/sources/js/components/ckeditor/constants.js":
/*!*********************************************************!*\
  !*** ./www/sources/js/components/ckeditor/constants.js ***!
  \*********************************************************/
/*! exports provided: TOOLBAR, REMOVE_PLUGINS, EXTRA_TOOLBAR, EDIT_BLOCK_TEMPLATE */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TOOLBAR", function() { return TOOLBAR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "REMOVE_PLUGINS", function() { return REMOVE_PLUGINS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EXTRA_TOOLBAR", function() { return EXTRA_TOOLBAR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EDIT_BLOCK_TEMPLATE", function() { return EDIT_BLOCK_TEMPLATE; });
const TOOLBAR = [{
  name: 'document',
  items: ['Source']
}, {
  name: 'colors',
  items: ['TextColor', 'BGColor']
}, {
  name: 'basic styles',
  items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat']
}, {
  name: 'paragraph',
  items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock']
}, {
  name: 'links',
  items: ['Link', 'Unlink']
}, {
  name: 'styles',
  items: ['Format', 'Font', 'FontSize']
}, {
  name: 'insert',
  items: ['Image', 'HorizontalRule']
}, {
  name: 'clipboard',
  items: ['Cut', 'Copy', 'Paste', '-', 'Undo', 'Redo']
}, {
  name: 'editblock',
  items: ['EditBlock']
}];
const REMOVE_PLUGINS = 'magicline, elementspath, image';
const EXTRA_TOOLBAR = "justify, font, colorbutton, colordialog, image2,uploadimage, editblock";
const EDIT_BLOCK_TEMPLATE = `<div>
    <div style="background-color: #FFFFD0; padding-left: 10px; border-left: 1px solid #CCCCCC;">
        <div style="font-size: 9px; color:#105289">by <span style="color: #105289; font-weight: bold; font-size: 11px;">{0}</span> on {1}</div>
        <div style="border-top: 1px solid #CCCCCC; padding: 5px 0pt 0pt;">{2}</div>
    </div>
    </div>
<br>`;

/***/ }),

/***/ "./www/sources/js/components/ckeditor/index.jsx":
/*!******************************************************!*\
  !*** ./www/sources/js/components/ckeditor/index.jsx ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CkEditor; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var ckeditor4_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ckeditor4-react */ "./node_modules/ckeditor4-react/dist/index.esm.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./constants */ "./www/sources/js/components/ckeditor/constants.js");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/common/dateTimeService */ "./www/sources/js/common/dateTimeService.js");
const _excluded = ["className", "isInvalid"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








class CkEditor extends react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "onEditorChange", event => {
      if (this.editor.editor.focusManager.hasFocus) {
        const data = event.editor.getData();
        this.props.onChange(data);
      }
    });

    _defineProperty(this, "onLoadPlugin", CKEDITOR => {
      let editText = '';
      let textTemplateEditBlock = _constants__WEBPACK_IMPORTED_MODULE_4__["EDIT_BLOCK_TEMPLATE"];
      const {
        username,
        colorEditBlock,
        data
      } = this.props;

      if (data === '') {
        editText = '&nbsp;';
      }

      if (colorEditBlock !== null) {
        textTemplateEditBlock = _constants__WEBPACK_IMPORTED_MODULE_4__["EDIT_BLOCK_TEMPLATE"].replace('#105289', colorEditBlock);
      }

      CKEDITOR.plugins.add('editblock', {
        init: function (editor) {
          editor.addCommand('insertEditBlock', {
            exec: function (editor) {
              const currentDate = new Date(_jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__["default"].toLongDateTimeFormat(_jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__["default"].toClientDateTime(new Date())));
              const html = _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].formatString(textTemplateEditBlock, username, moment__WEBPACK_IMPORTED_MODULE_3___default()(currentDate).format('MM/DD/YYYY, hh:mm:ss A'), editText);
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
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data && !this.editor.editor.focusManager.hasFocus) {
      this.editor.editor.setData(this.props.data);
    }
  }

  render() {
    const _this$props = this.props,
          {
      className,
      isInvalid
    } = _this$props,
          rest = _objectWithoutProperties(_this$props, _excluded);

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: `ckeditor-container ${className} ${isInvalid ? 'is-invalid' : ''}`
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ckeditor4_react__WEBPACK_IMPORTED_MODULE_2__["CKEditor"], _extends({}, rest, {
      initData: this.props.data,
      onChange: this.onEditorChange,
      config: {
        removeButtons: '',
        colorButton_enableMore: true,
        extraPlugins: _constants__WEBPACK_IMPORTED_MODULE_4__["EXTRA_TOOLBAR"],
        toolbar: _constants__WEBPACK_IMPORTED_MODULE_4__["TOOLBAR"],
        allowedContent: true,
        removePlugins: _constants__WEBPACK_IMPORTED_MODULE_4__["REMOVE_PLUGINS"],
        language: 'en'
      },
      onLoaded: editor => this.editor = editor,
      onNamespaceLoaded: this.onLoadPlugin
    })));
  }

}

_defineProperty(CkEditor, "propTypes", {
  colorEditBlock: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,
  username: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired
});

_defineProperty(CkEditor, "defaultProps", {
  colorEditBlock: '',
  username: '',
  className: '',
  isInvalid: false
});

/***/ }),

/***/ "./www/sources/js/pages/remark/actions.js":
/*!************************************************!*\
  !*** ./www/sources/js/pages/remark/actions.js ***!
  \************************************************/
/*! exports provided: ActionCreators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionCreators", function() { return ActionCreators; });
/* harmony import */ var _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/common/dataService */ "./www/sources/js/common/dataService.js");
/* harmony import */ var _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/common/site */ "./www/sources/js/common/site.js");
/* harmony import */ var _remarkSlice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./remarkSlice */ "./www/sources/js/pages/remark/remarkSlice.js");




const getRemarks = params => async dispatch => {
  _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].blockUI();
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('Remark/GetRemarks');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__["default"].postDataAsync(url, params).then(response => {
    dispatch(Object(_remarkSlice__WEBPACK_IMPORTED_MODULE_2__["setRemarks"])(response.data));
  }).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].unblockUI());
};

const editRemarks = params => async () => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('Remark/EditRemarks');
  return await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__["default"].postDataAsync(url, params).then(response => response);
};

const ActionCreators = {
  getRemarks,
  editRemarks
};

/***/ }),

/***/ "./www/sources/js/pages/remark/components/AppContainer.jsx":
/*!*****************************************************************!*\
  !*** ./www/sources/js/pages/remark/components/AppContainer.jsx ***!
  \*****************************************************************/
/*! exports provided: AppContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppContainer", function() { return AppContainer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Remark__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Remark */ "./www/sources/js/pages/remark/components/Remark.jsx");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @reduxjs/toolkit */ "./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");
/* harmony import */ var _remarkSlice__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../remarkSlice */ "./www/sources/js/pages/remark/remarkSlice.js");
/* harmony import */ var _cssroot_pages_remark_index_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @cssroot/pages/remark/index.scss */ "./www/sources/css/pages/remark/index.scss");
/* harmony import */ var _cssroot_pages_remark_index_scss__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_cssroot_pages_remark_index_scss__WEBPACK_IMPORTED_MODULE_5__);






const store = Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_3__["configureStore"])({
  reducer: _remarkSlice__WEBPACK_IMPORTED_MODULE_4__["default"]
});
class AppContainer extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_2__["Provider"], {
      store: store
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Remark__WEBPACK_IMPORTED_MODULE_1__["default"], {
      id: this.props.id
    }));
  }

}
/* harmony default export */ __webpack_exports__["default"] = (AppContainer);

/***/ }),

/***/ "./www/sources/js/pages/remark/components/Remark.jsx":
/*!***********************************************************!*\
  !*** ./www/sources/js/pages/remark/components/Remark.jsx ***!
  \***********************************************************/
/*! exports provided: Remark, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Remark", function() { return Remark; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/remark/actions.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var _jsroot_components_ckeditor_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/components/ckeditor/index */ "./www/sources/js/components/ckeditor/index.jsx");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var _jsroot_components_ResponseMessage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/components/ResponseMessage */ "./www/sources/js/components/ResponseMessage.jsx");
/* harmony import */ var _jsroot_common_site__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jsroot/common/site */ "./www/sources/js/common/site.js");
/* harmony import */ var _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @jsroot/common/constants */ "./www/sources/js/common/constants.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }











class Remark extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleChange", (value, key, name, dataRemark) => {
      const newDataRemark = [...dataRemark];
      newDataRemark[key] = value;
      this.setState({
        [name]: newDataRemark
      });
    });

    _defineProperty(this, "handleCollapseExpand", (section = '') => {
      this.setState(prevState => ({
        collapse: _objectSpread(_objectSpread({}, prevState.collapse), {}, {
          [section]: !prevState.collapse[section]
        })
      }));
    });

    _defineProperty(this, "removeSpecialRemarkItem", index => {
      this.setState(prevState => ({
        specialRemarks: [...prevState.specialRemarks.filter((item, i) => i !== index)],
        dataSpecialRemarks: [...prevState.dataSpecialRemarks.filter((item, i) => i !== index)]
      }));
    });

    _defineProperty(this, "removeNormalRemarkItem", index => {
      this.setState(prevState => ({
        normalRemarks: [...prevState.normalRemarks.filter((item, i) => i !== index)],
        dataNormalRemarks: [...prevState.dataNormalRemarks.filter((item, i) => i !== index)]
      }));
    });

    _defineProperty(this, "addSpecialRemarkItem", item => {
      const {
        dataSpecialRemarks
      } = this.state;

      if (dataSpecialRemarks[dataSpecialRemarks.length - 1] !== '') {
        this.setState(prevState => ({
          specialRemarks: [...prevState.specialRemarks, item]
        }));
      }
    });

    _defineProperty(this, "addNormalRemarkItem", item => {
      const {
        dataNormalRemarks
      } = this.state;

      if (dataNormalRemarks[dataNormalRemarks.length - 1] !== '') {
        this.setState(prevState => ({
          normalRemarks: [...prevState.normalRemarks, item]
        }));
      }
    });

    _defineProperty(this, "handleSubmit", () => {
      this.setState({
        isSubmitting: true
      });
      const id = this.props.id;
      const params = {
        customerId: id,
        specialRemarks: this.state.dataSpecialRemarks,
        normalRemarks: this.state.dataNormalRemarks
      };
      _jsroot_common_site__WEBPACK_IMPORTED_MODULE_8__["default"].blockUI();
      this.props.editRemarks(params).then(response => {
        _jsroot_common_site__WEBPACK_IMPORTED_MODULE_8__["default"].unblockUI();
        this.setState({
          editRemarkResult: response.data
        });

        if (response.data.isSuccessful) {
          setTimeout(async () => {
            this.setState({
              editRemarkResult: null
            });
            await this.props.getRemarks({
              customerId: id
            });
            this.setState({
              isSubmitting: false,
              specialRemarks: [...this.props.gridData.specialRemarks, ''],
              normalRemarks: [...this.props.gridData.normalRemarks, '']
            });
          }, 3000);
        } else {
          this.setState({
            isSubmitting: false
          });
        }
      });
    });

    this.state = {
      collapse: {
        specialRemark: false,
        normalRemark: false
      },
      isSubmitting: false,
      editRemarkResult: null,
      specialRemarks: [],
      dataSpecialRemarks: [],
      normalRemarks: [],
      dataNormalRemarks: []
    };
  }

  async componentDidMount() {
    await this.props.getRemarks({
      customerId: this.props.id
    });
    const {
      gridData
    } = this.props;
    this.setState({
      specialRemarks: [...gridData.specialRemarks, ''],
      dataSpecialRemarks: [...gridData.specialRemarks, ''],
      normalRemarks: [...gridData.normalRemarks, ''],
      dataNormalRemarks: [...gridData.normalRemarks, '']
    });
  }

  render() {
    const {
      collapse,
      specialRemarks,
      dataSpecialRemarks,
      normalRemarks,
      dataNormalRemarks,
      editRemarkResult
    } = this.state;
    const canEditRemark = window.customerInfoPolicy === _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_9__["Policy"].Host;

    if (this.props.gridData === null) {
      return null;
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, editRemarkResult && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_ResponseMessage__WEBPACK_IMPORTED_MODULE_7__["default"], {
      isSuccessful: editRemarkResult.isSuccessful,
      message: editRemarkResult.message || _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('UpdateRemarkSuccessfully')
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "panel-group mb-3"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
      as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"],
      className: "panel-title",
      "aria-expanded": !collapse.specialRemark,
      "aria-controls": "collapse-expand-specialRemark",
      onClick: () => this.handleCollapseExpand('specialRemark')
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
      className: "required"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('SpecialRemark'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Collapse"], {
      in: !collapse.specialRemark
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "panel-content",
      id: "collapse-expand-specialRemark"
    }, specialRemarks.map((item, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "generate-remark",
      key: `${item}-${index}`
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: index + 1 === specialRemarks.length ? 'opacity' : ''
    }, index + 1, "."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_ckeditor_index__WEBPACK_IMPORTED_MODULE_5__["default"], {
      data: dataSpecialRemarks[index],
      username: window.currentUsername,
      onChange: value => this.handleChange(value, index, 'dataSpecialRemarks', dataSpecialRemarks)
    }), canEditRemark && (index + 1 === specialRemarks.length ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "plus-icon fa fa-plus",
      onClick: () => this.addSpecialRemarkItem(index + item)
    }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "cross-icon fa fa-times",
      onClick: () => this.removeSpecialRemarkItem(index)
    }))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "panel-group"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
      as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"],
      className: "panel-title",
      "aria-expanded": !collapse.normalRemark,
      "aria-controls": "collapse-expand-normalRemark",
      onClick: () => this.handleCollapseExpand('normalRemark')
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
      className: "required"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Remark'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Collapse"], {
      in: !collapse.normalRemark
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "panel-content",
      id: "collapse-expand-normalRemark"
    }, normalRemarks.map((item, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "generate-remark",
      key: `${item}-${index}`
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: index + 1 === normalRemarks.length ? 'opacity' : ''
    }, index + 1, "."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_ckeditor_index__WEBPACK_IMPORTED_MODULE_5__["default"], {
      data: dataNormalRemarks[index],
      username: window.currentUsername,
      onChange: value => this.handleChange(value, index, 'dataNormalRemarks', dataNormalRemarks)
    }), canEditRemark && (index + 1 === normalRemarks.length ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "plus-icon fa fa-plus",
      onClick: () => this.addNormalRemarkItem(index + item)
    }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "cross-icon fa fa-times",
      onClick: () => this.removeNormalRemarkItem(index)
    }))))))), canEditRemark && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], {
      type: "submit",
      className: "mt-3",
      variant: "primary",
      size: "sm",
      onClick: this.handleSubmit,
      disabled: this.state.isSubmitting
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Save')));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_3__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    gridData
  } = state;
  return {
    gridData
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(Remark));

/***/ }),

/***/ "./www/sources/js/pages/remark/remarkSlice.js":
/*!****************************************************!*\
  !*** ./www/sources/js/pages/remark/remarkSlice.js ***!
  \****************************************************/
/*! exports provided: setRemarks, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setRemarks", function() { return setRemarks; });
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @reduxjs/toolkit */ "./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");

const remarkSlice = Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__["createSlice"])({
  name: 'remark',
  initialState: {
    gridData: null
  },
  reducers: {
    setRemarks: (state, action) => {
      state.gridData = action.payload;
    }
  }
});
const {
  actions,
  reducer
} = remarkSlice;
const {
  setRemarks
} = actions;
/* harmony default export */ __webpack_exports__["default"] = (reducer);

/***/ })

}]);
//# sourceMappingURL=1.chunk.js.map