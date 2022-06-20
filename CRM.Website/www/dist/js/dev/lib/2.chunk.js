(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ "./www/sources/css/pages/notification-template/index.scss":
/*!****************************************************************!*\
  !*** ./www/sources/css/pages/notification-template/index.scss ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./www/sources/js/pages/notification-template/actions.js":
/*!***************************************************************!*\
  !*** ./www/sources/js/pages/notification-template/actions.js ***!
  \***************************************************************/
/*! exports provided: ActionCreators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionCreators", function() { return ActionCreators; });
/* harmony import */ var _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/common/site */ "./www/sources/js/common/site.js");
/* harmony import */ var _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/common/dataService */ "./www/sources/js/common/dataService.js");
/* harmony import */ var _notificationTemplateSlice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./notificationTemplateSlice */ "./www/sources/js/pages/notification-template/notificationTemplateSlice.js");




const getNotificationTypes = () => async dispatch => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl('Common/GetNotificationTypes');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__["default"].getDataAsync(url).then(response => {
    dispatch(Object(_notificationTemplateSlice__WEBPACK_IMPORTED_MODULE_2__["setNotificationTypes"])(response.data));
  });
};

const getLanguages = () => async dispatch => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl('NotificationTemplate/GetLanguages');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__["default"].getDataAsync(url).then(response => {
    dispatch(Object(_notificationTemplateSlice__WEBPACK_IMPORTED_MODULE_2__["setLanguages"])(response.data));
  });
};

const getGridData = params => async dispatch => {
  _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].blockUI();
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl('NotificationTemplate/GetNotificationTemplate');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__["default"].postDataAsync(url, params).then(response => {
    dispatch(Object(_notificationTemplateSlice__WEBPACK_IMPORTED_MODULE_2__["setGridData"])(response.data));
  }).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].unblockUI());
};

const getTemplateById = (templateId, callback) => async dispatch => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl(`NotificationTemplate/GetById/${templateId}`);
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__["default"].getDataAsync(url).then(response => {
    dispatch(Object(_notificationTemplateSlice__WEBPACK_IMPORTED_MODULE_2__["setSelectedTemplate"])(response.data));

    if (typeof callback === 'function') {
      callback();
    }
  });
};

const createTemplate = data => async dispatch => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl('NotificationTemplate/Create');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__["default"].postDataAsync(url, data).then(response => {
    dispatch(Object(_notificationTemplateSlice__WEBPACK_IMPORTED_MODULE_2__["setCreateTemplateResult"])(response.data));
  });
};

const editTemplate = data => async dispatch => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl('NotificationTemplate/Edit');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__["default"].postDataAsync(url, data).then(response => {
    dispatch(Object(_notificationTemplateSlice__WEBPACK_IMPORTED_MODULE_2__["setEditTemplateResult"])(response.data));
  });
};

const deleteTemplate = params => async () => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl(`NotificationTemplate/Delete`);
  return await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__["default"].postDataAsync(url, params).then(response => response);
};

const ActionCreators = {
  resetState: _notificationTemplateSlice__WEBPACK_IMPORTED_MODULE_2__["resetState"],
  setNotificationTypes: _notificationTemplateSlice__WEBPACK_IMPORTED_MODULE_2__["setNotificationTypes"],
  setLanguages: _notificationTemplateSlice__WEBPACK_IMPORTED_MODULE_2__["setLanguages"],
  setGridParams: _notificationTemplateSlice__WEBPACK_IMPORTED_MODULE_2__["setGridParams"],
  setGridData: _notificationTemplateSlice__WEBPACK_IMPORTED_MODULE_2__["setGridData"],
  setSelectedTemplate: _notificationTemplateSlice__WEBPACK_IMPORTED_MODULE_2__["setSelectedTemplate"],
  setCreateTemplatePopup: _notificationTemplateSlice__WEBPACK_IMPORTED_MODULE_2__["setCreateTemplatePopup"],
  setCreateTemplateResult: _notificationTemplateSlice__WEBPACK_IMPORTED_MODULE_2__["setCreateTemplateResult"],
  setEditTemplatePopup: _notificationTemplateSlice__WEBPACK_IMPORTED_MODULE_2__["setEditTemplatePopup"],
  setEditTemplateResult: _notificationTemplateSlice__WEBPACK_IMPORTED_MODULE_2__["setEditTemplateResult"],
  setDeleteTemplatePopup: _notificationTemplateSlice__WEBPACK_IMPORTED_MODULE_2__["setDeleteTemplatePopup"],
  setContentDetailPopup: _notificationTemplateSlice__WEBPACK_IMPORTED_MODULE_2__["setContentDetailPopup"],
  getNotificationTypes,
  getLanguages,
  getGridData,
  getTemplateById,
  createTemplate,
  editTemplate,
  deleteTemplate
};

/***/ }),

/***/ "./www/sources/js/pages/notification-template/common.functions.js":
/*!************************************************************************!*\
  !*** ./www/sources/js/pages/notification-template/common.functions.js ***!
  \************************************************************************/
/*! exports provided: renderNotificationTypeOption, validateFormik */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderNotificationTypeOption", function() { return renderNotificationTypeOption; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateFormik", function() { return validateFormik; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");


const renderNotificationTypeOption = item => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
    key: item.notificationTypeId,
    value: item.notificationTypeId
  }, item.notificationTypeName);
};
const validateFormik = (values, languages = []) => {
  const errors = {};

  if (!values.notificationTypeId) {
    errors.notificationTypeId = _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('NotificationTypeRequired');
  }

  if (!values.notificationTemplateName || values.notificationTemplateName.trim().length === 0) {
    errors.notificationTemplateName = _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('TemplateNameRequired');
  } else {
    if (values.notificationTemplateName.trim().length > 1000) {
      errors.notificationTemplateName = _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].formatString(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('FieldMaxLength'), _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('TemplateName'), 1000);
    }
  }

  if (!values.title || values.title.trim().length === 0) {
    errors.title = _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('TitleRequired');
  } else {
    if (values.title.trim().length > 2000) {
      errors.title = _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].formatString(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('FieldMaxLength'), _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('Title'), 2000);
    }
  }

  languages.map(item => {
    if (!values['language_' + item.settingId] || values['language_' + item.settingId].trim().length === 0) {
      errors['language_' + item.settingId] = _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].formatString(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('FieldRequired'), `${_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('Content')} (${item.settingValue})`);
    }
  });
  return errors;
};

/***/ }),

/***/ "./www/sources/js/pages/notification-template/components/AppContainer.jsx":
/*!********************************************************************************!*\
  !*** ./www/sources/js/pages/notification-template/components/AppContainer.jsx ***!
  \********************************************************************************/
/*! exports provided: AppContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppContainer", function() { return AppContainer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/lib/index.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_toastify__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/notification-template/actions.js");
/* harmony import */ var _Filter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Filter */ "./www/sources/js/pages/notification-template/components/Filter.jsx");
/* harmony import */ var _DataGrid__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./DataGrid */ "./www/sources/js/pages/notification-template/components/DataGrid.jsx");
/* harmony import */ var _NewNotificationTemplate__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./NewNotificationTemplate */ "./www/sources/js/pages/notification-template/components/NewNotificationTemplate.jsx");
/* harmony import */ var _EditNotificationTemplate__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./EditNotificationTemplate */ "./www/sources/js/pages/notification-template/components/EditNotificationTemplate.jsx");
/* harmony import */ var _ContentDetailModalDialog__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./ContentDetailModalDialog */ "./www/sources/js/pages/notification-template/components/ContentDetailModalDialog.jsx");
/* harmony import */ var _jsroot_components_SweetModalDialog__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @jsroot/components/SweetModalDialog */ "./www/sources/js/components/SweetModalDialog.jsx");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }















class AppContainer extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "handleCloseCreatePopup", () => {
      this.props.setCreateTemplatePopup({
        show: false
      });
      this.props.setCreateTemplateResult(null);
    });

    _defineProperty(this, "handleCreateSuccess", () => {
      this.handleCloseCreatePopup();
      this.props.getGridData(this.props.gridParams);
    });

    _defineProperty(this, "handleCloseEditPopup", () => {
      this.props.setEditTemplatePopup({
        show: false
      });
      this.props.setSelectedTemplate(null);
      this.props.setEditTemplateResult(null);
    });

    _defineProperty(this, "handleEditSuccess", () => {
      this.handleCloseEditPopup();
      this.props.getGridData(this.props.gridParams);
    });

    _defineProperty(this, "handleCloseViewContentPopup", () => {
      this.props.setContentDetailPopup({
        show: false
      });
      this.props.setSelectedTemplate(null);
    });

    _defineProperty(this, "handleCloseDeletePopup", () => {
      this.props.setDeleteTemplatePopup({
        show: false
      });
    });

    _defineProperty(this, "handleDelete", () => {
      const {
        templateId,
        name
      } = this.props.deleteTemplatePopup;
      const params = {
        notificationTemplateId: templateId,
        notificationTemplateName: name
      };
      this.props.deleteTemplate(params).then(response => {
        const data = response.data;
        this.handleCloseDeletePopup();
        this.props.getGridData(this.props.gridParams);

        if (data.isSuccessful) {
          react_toastify__WEBPACK_IMPORTED_MODULE_3__["toast"].success(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_13__["default"].getResource('DeleteNotificationTemplateSuccessfully'));
        } else {
          react_toastify__WEBPACK_IMPORTED_MODULE_3__["toast"].error(data.message);
        }
      });
    });
  }

  componentDidMount() {
    this.props.getNotificationTypes();
    this.props.getLanguages();
  }

  componentWillUnmount() {
    this.props.resetState();
  }

  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Filter__WEBPACK_IMPORTED_MODULE_7__["default"], {
      isHost: this.props.isHost
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DataGrid__WEBPACK_IMPORTED_MODULE_8__["default"], {
      isHost: this.props.isHost
    }), this.props.createTemplatePopup.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_NewNotificationTemplate__WEBPACK_IMPORTED_MODULE_9__["default"], {
      onClose: this.handleCloseCreatePopup,
      onSuccess: this.handleCreateSuccess
    }), this.props.editTemplatePopup.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_EditNotificationTemplate__WEBPACK_IMPORTED_MODULE_10__["default"], {
      onClose: this.handleCloseEditPopup,
      onSuccess: this.handleEditSuccess
    }), this.props.deleteTemplatePopup.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_SweetModalDialog__WEBPACK_IMPORTED_MODULE_12__["default"], {
      title: _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_13__["default"].getResource('Confirmation'),
      contents: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "Are you sure you want to delete ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, this.props.deleteTemplatePopup.name), "?"),
      buttons: [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
        variant: "primary",
        size: "sm",
        onClick: this.handleDelete
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_13__["default"].getResource('OK')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
        variant: "primary",
        size: "sm",
        onClick: this.handleCloseDeletePopup
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_13__["default"].getResource('Cancel'))],
      onClose: this.handleCloseDeletePopup
    }), this.props.contentDetailPopup.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ContentDetailModalDialog__WEBPACK_IMPORTED_MODULE_11__["default"], {
      onClose: this.handleCloseViewContentPopup
    }));
  }

}

_defineProperty(AppContainer, "propTypes", {
  contentDetailPopup: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.shape({
    show: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool
  }).isRequired,
  createTemplatePopup: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.shape({
    show: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool
  }).isRequired,
  deleteTemplatePopup: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.shape({
    show: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool
  }).isRequired,
  editTemplatePopup: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.shape({
    show: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool
  }).isRequired,
  getLanguages: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,
  getNotificationTypes: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,
  isHost: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool.isRequired
});

_defineProperty(AppContainer, "defaultProps", {
  contentDetailPopup: {
    show: false
  },
  createTemplatePopup: {
    show: false
  },
  deleteTemplatePopup: {
    show: false
  },
  editTemplatePopup: {
    show: false
  },
  getLanguages: function () {// nothing
  },
  getNotificationTypes: function () {// nothing
  },
  isHost: false
});

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_5__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_6__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    gridParams,
    createTemplatePopup,
    editTemplatePopup,
    deleteTemplatePopup,
    deleteTemplateResult,
    contentDetailPopup
  } = state;
  return {
    gridParams,
    createTemplatePopup,
    editTemplatePopup,
    deleteTemplatePopup,
    deleteTemplateResult,
    contentDetailPopup
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["connect"])(mapStateToProps, mapDispatchToProps)(AppContainer));

/***/ }),

/***/ "./www/sources/js/pages/notification-template/components/ContentDetailModalDialog.jsx":
/*!********************************************************************************************!*\
  !*** ./www/sources/js/pages/notification-template/components/ContentDetailModalDialog.jsx ***!
  \********************************************************************************************/
/*! exports provided: ContentDetailModalDialog, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContentDetailModalDialog", function() { return ContentDetailModalDialog; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var _jsroot_components_SweetModalDialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/components/SweetModalDialog */ "./www/sources/js/components/SweetModalDialog.jsx");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");






const ContentDetailModalDialog = props => {
  const template = props.template;
  const buttons = [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], {
    variant: "primary",
    size: "sm",
    onClick: props.onClose
  }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Close'))];
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_SweetModalDialog__WEBPACK_IMPORTED_MODULE_4__["default"], {
    size: "lg",
    backdropClassName: "notification-template-content-modal-backdrop",
    className: "notification-template-content-modal",
    title: template.title,
    contents: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, template.contents.map(item => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], {
        key: item.languageId
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "font-weight-bold"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Content'), " (", item.language, ")"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "border p-2 mt-2 mb-3 content"
      }, item.content));
    })),
    buttons: buttons,
    onClose: props.onClose
  });
};
ContentDetailModalDialog.propTypes = {
  template: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    notificationTemplateId: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
    notificationTypeId: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
    notificationTemplateName: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
    title: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
    contents: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object)
  }).isRequired
};
ContentDetailModalDialog.defaultProps = {
  template: {
    notificationTemplateId: 0,
    notificationTypeId: 0,
    notificationTemplateName: '',
    title: '',
    contents: []
  }
};

const mapStateToProps = state => {
  const {
    selectedTemplate
  } = state;
  return {
    template: selectedTemplate
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps)(ContentDetailModalDialog));

/***/ }),

/***/ "./www/sources/js/pages/notification-template/components/DataGrid.jsx":
/*!****************************************************************************!*\
  !*** ./www/sources/js/pages/notification-template/components/DataGrid.jsx ***!
  \****************************************************************************/
/*! exports provided: DataGrid, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataGrid", function() { return DataGrid; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/notification-template/actions.js");
/* harmony import */ var _jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/components/react-grid/index */ "./www/sources/js/components/react-grid/index.jsx");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/common/constants */ "./www/sources/js/common/constants.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








class DataGrid extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "onPaging", (pageIndex, pageSize) => {
      const params = _objectSpread({}, this.props.gridParams);

      params['pageIndex'] = pageIndex;
      params['pageSize'] = pageSize;
      this.props.setGridParams(params);
      this.props.getGridData(params);
    });

    _defineProperty(this, "handleEdit", id => {
      this.props.getTemplateById(id, () => this.props.setEditTemplatePopup({
        show: true
      }));
    });

    _defineProperty(this, "handleViewContent", id => {
      this.props.getTemplateById(id, () => this.props.setContentDetailPopup({
        show: true
      }));
    });

    _defineProperty(this, "handleDelete", (id, name) => {
      this.props.setDeleteTemplatePopup({
        show: true,
        templateId: id,
        name: name
      });
    });

    _defineProperty(this, "buildGridHeader", isHost => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderRow"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 5
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('SymbolNo')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 30
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('NotificationType')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 30
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('TemplateName')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 80
      }, `${_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Title')}/${_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Content')}`), isHost && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 10
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Action')));
    });

    _defineProperty(this, "buildGridBody", isHost => {
      const {
        pageIndex,
        pageSize
      } = this.props.gridParams;
      this.startIndex = (pageIndex - 1) * pageSize + 1;

      if (this.props.gridData.data.length > 0) {
        return this.props.gridData.data.map((item, index) => this.renderRow(item, index, isHost));
      }

      return [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Row"], {
        key: `body${1}`,
        className: "no-data"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        colSpan: "5"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('ThereIsNoData')))];
    });

    _defineProperty(this, "renderRow", (item, index, isHost) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Row"], {
      key: item.notificationTemplateId
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
      className: "text-center"
    }, index + this.startIndex), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], null, item.notificationTypeName), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], null, item.notificationTemplateName), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      href: "#",
      onClick: () => this.handleViewContent(item.notificationTemplateId)
    }, item.title)), isHost && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
      className: "text-center"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "rounded-circle fa fa-pencil icon-edit",
      onClick: () => this.handleEdit(item.notificationTemplateId)
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "rounded-circle fa fa-trash icon-delete",
      onClick: () => this.handleDelete(item.notificationTemplateId, item.notificationTemplateName)
    }))));
  }

  render() {
    if (!this.props.gridData || !this.props.gridData.data) {
      return null;
    }

    const {
      isHost
    } = this.props;
    const {
      totalItems
    } = this.props.gridData;
    const {
      pageIndex,
      pageSize
    } = this.props.gridParams;
    const pagingOption = {
      PageIndex: pageIndex,
      PageSize: pageSize,
      TotalItem: totalItems,
      PageList: _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_6__["PAGING_SIZES"]
    };
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "table-title"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('NotificationTemplate')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Table"], {
      minWidth: 720,
      maxWidth: document.getElementById('app-container').clientWidth,
      autoWidth: true,
      header: this.buildGridHeader(isHost),
      body: this.buildGridBody(isHost),
      isPaging: true,
      pageOption: pagingOption,
      onPaging: this.onPaging,
      containerPadding: 0,
      adjustedHeight: 10
    }));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    gridParams,
    gridData
  } = state;
  return {
    gridParams,
    gridData
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(DataGrid));

/***/ }),

/***/ "./www/sources/js/pages/notification-template/components/EditNotificationTemplate.jsx":
/*!********************************************************************************************!*\
  !*** ./www/sources/js/pages/notification-template/components/EditNotificationTemplate.jsx ***!
  \********************************************************************************************/
/*! exports provided: EditNotificationTemplate, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditNotificationTemplate", function() { return EditNotificationTemplate; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/notification-template/actions.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! formik */ "./node_modules/formik/dist/formik.esm.js");
/* harmony import */ var _jsroot_components_DraggableModalDialog__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/components/DraggableModalDialog */ "./www/sources/js/components/DraggableModalDialog.jsx");
/* harmony import */ var _jsroot_components_FormikErrorMessage__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jsroot/components/FormikErrorMessage */ "./www/sources/js/components/FormikErrorMessage.jsx");
/* harmony import */ var _jsroot_components_ResponseMessage__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @jsroot/components/ResponseMessage */ "./www/sources/js/components/ResponseMessage.jsx");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var _common_functions__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../common.functions */ "./www/sources/js/pages/notification-template/common.functions.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }













class EditNotificationTemplate extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "renderForm", ({
      values,
      errors,
      touched,
      handleChange,
      handleSubmit,
      setFieldValue,
      isSubmitting
    }) => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Form"], {
        noValidate: true,
        onSubmit: handleSubmit
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Modal"].Body, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_FormikErrorMessage__WEBPACK_IMPORTED_MODULE_8__["default"], {
        touched: touched,
        errors: errors,
        fieldNames: Object.keys(values)
      }), this.props.editTemplateResult && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_ResponseMessage__WEBPACK_IMPORTED_MODULE_9__["default"], {
        isSuccessful: this.props.editTemplateResult.isSuccessful,
        message: this.props.editTemplateResult.message || _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_10__["default"].getResource('EditNotificationTemplateSuccessfully')
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Form"].Label, {
        column: true,
        sm: "4",
        md: "3",
        className: "required",
        htmlFor: "notificationTypeId"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_10__["default"].getResource('NotificationType')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Col"], {
        sm: "8",
        md: "9"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Form"].Control, {
        as: "select",
        size: "sm",
        className: "shadow-none",
        name: "notificationTypeId",
        id: "notificationTypeId",
        isInvalid: touched.notificationTypeId && errors.notificationTypeId,
        onChange: handleChange,
        value: values.notificationTypeId
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        value: "",
        disabled: true,
        hidden: true
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_10__["default"].getResource('PleaseSelect')), this.props.notificationTypes.map(_common_functions__WEBPACK_IMPORTED_MODULE_11__["renderNotificationTypeOption"])))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Form"].Label, {
        column: true,
        sm: "4",
        md: "3",
        className: "required",
        htmlFor: "notificationTemplateName"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_10__["default"].getResource('TemplateName')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Col"], {
        sm: "8",
        md: "9"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Form"].Control, {
        type: "text",
        size: "sm",
        value: values.notificationTemplateName,
        className: "shadow-none",
        autoComplete: "off",
        name: "notificationTemplateName",
        id: "notificationTemplateName",
        isInvalid: touched.notificationTemplateName && errors.notificationTemplateName,
        onChange: handleChange
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Form"].Label, {
        column: true,
        sm: "4",
        md: "3",
        className: "required",
        htmlFor: "title"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_10__["default"].getResource('Title')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Col"], {
        sm: "8",
        md: "9"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Form"].Control, {
        type: "text",
        size: "sm",
        value: values.title,
        className: "shadow-none",
        autoComplete: "off",
        name: "title",
        id: "title",
        isInvalid: touched.title && errors.title,
        onChange: handleChange
      }))), this.props.languages !== null && this.props.languages.map(item => {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Form"].Group, {
          key: `language${item.settingId}`,
          as: react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Row"]
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Form"].Label, {
          column: true,
          sm: "4",
          md: "3",
          className: "required",
          htmlFor: 'language_' + item.settingId
        }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_10__["default"].getResource('Content'), " (", item.settingValue, ")"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Col"], {
          sm: "8",
          md: "9"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Form"].Control, {
          as: "textarea",
          value: values['language_' + item.settingId],
          className: "shadow-none form-control",
          name: 'language_' + item.settingId,
          id: 'language_' + item.settingId,
          rows: "4",
          isInvalid: touched['language_' + item.settingId] && errors['language_' + item.settingId],
          onChange: handleChange
        })));
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Modal"].Footer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Button"], {
        type: "submit",
        variant: "primary",
        size: "sm",
        disabled: isSubmitting
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_10__["default"].getResource('Save')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Button"], {
        type: "submit",
        variant: "primary",
        size: "sm",
        onClick: this.props.onClose
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_10__["default"].getResource('Cancel'))));
    });

    _defineProperty(this, "handleSubmit", (values, {
      setSubmitting
    }) => {
      setSubmitting(true);
      const template = {
        notificationTemplateId: values.notificationTemplateId,
        notificationTypeId: values.notificationTypeId,
        notificationTemplateName: values.notificationTemplateName,
        title: values.title,
        contents: []
      };
      this.props.languages !== null && this.props.languages.map(item => {
        template.contents.push({
          languageId: item.settingId,
          content: values['language_' + item.settingId]
        });
      });
      this.props.editTemplate(template).then(() => {
        if (this.props.editTemplateResult.isSuccessful) {
          setTimeout(() => {
            this.props.onSuccess();
          }, 3000);
        } else {
          setSubmitting(false);
        }
      });
    });
  }

  render() {
    const template = this.props.template;
    const initialValues = {
      notificationTemplateId: template.notificationTemplateId,
      notificationTypeId: template.notificationTypeId,
      notificationTemplateName: template.notificationTemplateName,
      title: template.title
    };
    this.props.languages !== null && this.props.languages.map(item => {
      initialValues['language_' + item.settingId] = '';
      const index = template.contents.findIndex(x => x.languageId === item.settingId);

      if (index >= 0) {
        initialValues['language_' + item.settingId] = template.contents[index].content;
      }
    });
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Modal"], {
      show: true,
      className: "notification-template-modal",
      dialogAs: _jsroot_components_DraggableModalDialog__WEBPACK_IMPORTED_MODULE_7__["default"],
      onHide: this.props.onClose,
      backdrop: "static",
      keyboard: false,
      size: "lg",
      centered: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Modal"].Header, {
      closeButton: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Modal"].Title, {
      as: "div"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_10__["default"].getResource('EditNotificationTemplate'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_6__["Formik"], {
      validate: values => Object(_common_functions__WEBPACK_IMPORTED_MODULE_11__["validateFormik"])(values, this.props.languages),
      onSubmit: this.handleSubmit,
      initialValues: initialValues
    }, this.renderForm));
  }

}

_defineProperty(EditNotificationTemplate, "propTypes", {
  languages: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object),
  notificationTypes: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object),
  template: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    notificationTemplateId: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
    notificationTypeId: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
    notificationTemplateName: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
    title: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
    contents: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object)
  }).isRequired
});

_defineProperty(EditNotificationTemplate, "defaultProps", {
  languages: [],
  notificationTypes: [],
  template: {
    notificationTemplateId: 0,
    notificationTypeId: 0,
    notificationTemplateName: '',
    title: '',
    contents: []
  }
});

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_3__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_4__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    editTemplateResult,
    selectedTemplate,
    notificationTypes,
    languages
  } = state;
  return {
    editTemplateResult,
    template: selectedTemplate,
    notificationTypes,
    languages
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(EditNotificationTemplate));

/***/ }),

/***/ "./www/sources/js/pages/notification-template/components/Filter.jsx":
/*!**************************************************************************!*\
  !*** ./www/sources/js/pages/notification-template/components/Filter.jsx ***!
  \**************************************************************************/
/*! exports provided: Filter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Filter", function() { return Filter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/notification-template/actions.js");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var _common_functions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../common.functions */ "./www/sources/js/pages/notification-template/common.functions.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









class Filter extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleNotificationTypeChange", event => {
      this.setState({
        notificationTypeId: event.target.value
      });
    });

    _defineProperty(this, "handleTemplateNameChange", event => {
      this.setState({
        notificationTemplateName: event.target.value
      });
    });

    _defineProperty(this, "getParams", () => {
      return {
        notificationTypeId: parseInt(this.state.notificationTypeId, 10),
        notificationTemplateName: this.state.notificationTemplateName,
        pageIndex: 1,
        pageSize: 100
      };
    });

    _defineProperty(this, "handleSubmit", event => {
      event.preventDefault();
      const params = this.getParams();
      this.props.setGridParams(params);
      this.props.getGridData(params);
    });

    _defineProperty(this, "handleOpenCreatePopup", () => this.props.setCreateTemplatePopup({
      show: true
    }));

    this.state = {
      notificationTypeId: '',
      notificationTemplateName: ''
    };
  }

  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"], {
      className: "form-filter",
      onSubmit: this.handleSubmit
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Row, {
      bsPrefix: "form-row"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
      htmlFor: "filterNotificationTypeId"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('NotificationType')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
      as: "select",
      size: "sm",
      className: "shadow-none",
      id: "filterNotificationTypeId",
      value: this.state.notificationTypeId,
      onChange: this.handleNotificationTypeChange
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
      value: ""
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('All')), this.props.notificationTypes.map(_common_functions__WEBPACK_IMPORTED_MODULE_7__["renderNotificationTypeOption"]))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
      htmlFor: "filterNotificationTemplateName"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('TemplateName')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
      type: "text",
      size: "sm",
      className: "shadow-none",
      id: "filterNotificationTemplateName",
      autoComplete: "off",
      value: this.state.notificationTemplateName,
      onChange: this.handleTemplateNameChange
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], {
      className: "mr-4",
      variant: "primary",
      size: "sm",
      onClick: this.handleSubmit
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Submit')), this.props.isHost && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], {
      variant: "primary",
      size: "sm",
      onClick: this.handleOpenCreatePopup
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Insert')))));
  }

}

_defineProperty(Filter, "propTypes", {
  notificationTypes: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object)
});

_defineProperty(Filter, "defaultProps", {
  notificationTypes: []
});

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_3__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_5__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    notificationTypes
  } = state;
  return {
    notificationTypes
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(Filter));

/***/ }),

/***/ "./www/sources/js/pages/notification-template/components/NewNotificationTemplate.jsx":
/*!*******************************************************************************************!*\
  !*** ./www/sources/js/pages/notification-template/components/NewNotificationTemplate.jsx ***!
  \*******************************************************************************************/
/*! exports provided: NewNotificationTemplate, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewNotificationTemplate", function() { return NewNotificationTemplate; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/notification-template/actions.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! formik */ "./node_modules/formik/dist/formik.esm.js");
/* harmony import */ var _jsroot_components_DraggableModalDialog__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/components/DraggableModalDialog */ "./www/sources/js/components/DraggableModalDialog.jsx");
/* harmony import */ var _jsroot_components_FormikErrorMessage__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jsroot/components/FormikErrorMessage */ "./www/sources/js/components/FormikErrorMessage.jsx");
/* harmony import */ var _jsroot_components_ResponseMessage__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @jsroot/components/ResponseMessage */ "./www/sources/js/components/ResponseMessage.jsx");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var _common_functions__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../common.functions */ "./www/sources/js/pages/notification-template/common.functions.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }













class NewNotificationTemplate extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "renderForm", ({
      values,
      errors,
      touched,
      handleChange,
      handleSubmit,
      setFieldValue,
      isSubmitting
    }) => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Form"], {
        noValidate: true,
        onSubmit: handleSubmit
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Modal"].Body, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_FormikErrorMessage__WEBPACK_IMPORTED_MODULE_8__["default"], {
        touched: touched,
        errors: errors,
        fieldNames: Object.keys(values)
      }), this.props.createTemplateResult && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_ResponseMessage__WEBPACK_IMPORTED_MODULE_9__["default"], {
        isSuccessful: this.props.createTemplateResult.isSuccessful,
        message: this.props.createTemplateResult.message || _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_10__["default"].getResource('InsertNotificationTemplateSuccessfully')
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Form"].Label, {
        column: true,
        sm: "4",
        md: "3",
        className: "required",
        htmlFor: "notificationTypeId"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_10__["default"].getResource('NotificationType')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Col"], {
        sm: "8",
        md: "9"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Form"].Control, {
        as: "select",
        size: "sm",
        className: "shadow-none",
        isInvalid: touched.notificationTypeId && errors.notificationTypeId,
        name: "notificationTypeId",
        id: "notificationTypeId",
        value: values.notificationTypeId,
        onChange: handleChange
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        value: "",
        hidden: true,
        disabled: true
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_10__["default"].getResource('PleaseSelect')), this.props.notificationTypes.map(_common_functions__WEBPACK_IMPORTED_MODULE_11__["renderNotificationTypeOption"])))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Form"].Label, {
        column: true,
        sm: "4",
        md: "3",
        className: "required",
        htmlFor: "notificationTemplateName"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_10__["default"].getResource('TemplateName')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Col"], {
        sm: "8",
        md: "9"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Form"].Control, {
        type: "text",
        size: "sm",
        value: values.notificationTemplateName,
        name: "notificationTemplateName",
        id: "notificationTemplateName",
        className: "shadow-none",
        autoComplete: "off",
        isInvalid: touched.notificationTemplateName && errors.notificationTemplateName,
        onChange: handleChange
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Form"].Label, {
        column: true,
        sm: "4",
        md: "3",
        className: "required",
        htmlFor: "title"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_10__["default"].getResource('Title')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Col"], {
        sm: "8",
        md: "9"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Form"].Control, {
        type: "text",
        size: "sm",
        value: values.title,
        name: "title",
        id: "title",
        className: "shadow-none",
        autoComplete: "off",
        isInvalid: touched.title && errors.title,
        onChange: handleChange
      }))), this.props.languages !== null && this.props.languages.map(item => {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Form"].Group, {
          key: `language${item.settingId}`,
          as: react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Row"]
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Form"].Label, {
          column: true,
          sm: "4",
          md: "3",
          className: "required",
          htmlFor: 'language_' + item.settingId
        }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_10__["default"].getResource('Content'), " (", item.settingValue, ")"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Col"], {
          sm: "8",
          md: "9"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Form"].Control, {
          as: "textarea",
          className: "shadow-none form-control",
          value: values['language_' + item.settingId],
          name: 'language_' + item.settingId,
          id: 'language_' + item.settingId,
          rows: "4",
          isInvalid: touched['language_' + item.settingId] && errors['language_' + item.settingId],
          onChange: handleChange
        })));
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Modal"].Footer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Button"], {
        type: "submit",
        variant: "primary",
        size: "sm",
        disabled: isSubmitting
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_10__["default"].getResource('Save')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Button"], {
        type: "submit",
        variant: "primary",
        size: "sm",
        onClick: this.props.onClose
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_10__["default"].getResource('Cancel'))));
    });

    _defineProperty(this, "handleSubmit", (values, {
      setSubmitting
    }) => {
      setSubmitting(true);
      const template = {
        notificationTypeId: values.notificationTypeId,
        notificationTemplateName: values.notificationTemplateName,
        title: values.title,
        contents: []
      };
      this.props.languages !== null && this.props.languages.map(item => {
        template.contents.push({
          languageId: item.settingId,
          content: values['language_' + item.settingId]
        });
      });
      this.props.createTemplate(template).then(() => {
        if (this.props.createTemplateResult.isSuccessful) {
          setTimeout(() => {
            this.props.onSuccess();
          }, 3000);
        } else {
          setSubmitting(false);
        }
      });
    });
  }

  render() {
    const initialValues = {
      notificationTypeId: '',
      notificationTemplateName: '',
      title: ''
    };
    this.props.languages !== null && this.props.languages.map(item => {
      initialValues['language_' + item.settingId] = '';
    });
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Modal"], {
      show: true,
      className: "notification-template-modal",
      dialogAs: _jsroot_components_DraggableModalDialog__WEBPACK_IMPORTED_MODULE_7__["default"],
      backdrop: "static",
      keyboard: false,
      size: "lg",
      centered: true,
      onHide: this.props.onClose
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Modal"].Header, {
      closeButton: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Modal"].Title, {
      as: "div"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_10__["default"].getResource('InsertNotificationTemplate'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_6__["Formik"], {
      initialValues: initialValues,
      validate: values => Object(_common_functions__WEBPACK_IMPORTED_MODULE_11__["validateFormik"])(values, this.props.languages),
      onSubmit: this.handleSubmit
    }, this.renderForm));
  }

}

_defineProperty(NewNotificationTemplate, "propTypes", {
  languages: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object),
  notificationTypes: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object)
});

_defineProperty(NewNotificationTemplate, "defaultProps", {
  languages: [],
  notificationTypes: []
});

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_3__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_4__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    notificationTypes,
    languages,
    createTemplateResult
  } = state;
  return {
    notificationTypes,
    languages,
    createTemplateResult
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(NewNotificationTemplate));

/***/ }),

/***/ "./www/sources/js/pages/notification-template/index.js":
/*!*************************************************************!*\
  !*** ./www/sources/js/pages/notification-template/index.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return index; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @reduxjs/toolkit */ "./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");
/* harmony import */ var _notificationTemplateSlice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./notificationTemplateSlice */ "./www/sources/js/pages/notification-template/notificationTemplateSlice.js");
/* harmony import */ var _components_AppContainer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/AppContainer */ "./www/sources/js/pages/notification-template/components/AppContainer.jsx");
/* harmony import */ var _cssroot_pages_notification_template_index_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @cssroot/pages/notification-template/index.scss */ "./www/sources/css/pages/notification-template/index.scss");
/* harmony import */ var _cssroot_pages_notification_template_index_scss__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_cssroot_pages_notification_template_index_scss__WEBPACK_IMPORTED_MODULE_5__);





const store = Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__["configureStore"])({
  reducer: _notificationTemplateSlice__WEBPACK_IMPORTED_MODULE_3__["default"]
});

const isHost = true;
class index extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_1__["Provider"], {
      store: store
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_AppContainer__WEBPACK_IMPORTED_MODULE_4__["default"], {
      isHost: isHost
    }));
  }

}

/***/ }),

/***/ "./www/sources/js/pages/notification-template/notificationTemplateSlice.js":
/*!*********************************************************************************!*\
  !*** ./www/sources/js/pages/notification-template/notificationTemplateSlice.js ***!
  \*********************************************************************************/
/*! exports provided: resetState, setNotificationTypes, setLanguages, setGridParams, setGridData, setSelectedTemplate, setCreateTemplatePopup, setCreateTemplateResult, setEditTemplatePopup, setEditTemplateResult, setDeleteTemplatePopup, setContentDetailPopup, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetState", function() { return resetState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setNotificationTypes", function() { return setNotificationTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setLanguages", function() { return setLanguages; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setGridParams", function() { return setGridParams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setGridData", function() { return setGridData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSelectedTemplate", function() { return setSelectedTemplate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setCreateTemplatePopup", function() { return setCreateTemplatePopup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setCreateTemplateResult", function() { return setCreateTemplateResult; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setEditTemplatePopup", function() { return setEditTemplatePopup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setEditTemplateResult", function() { return setEditTemplateResult; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setDeleteTemplatePopup", function() { return setDeleteTemplatePopup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setContentDetailPopup", function() { return setContentDetailPopup; });
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @reduxjs/toolkit */ "./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");

const initialState = {
  notificationTypes: [],
  languages: [],
  gridParams: {
    notificationTypeId: '',
    notificationTemplateName: '',
    pageIndex: 1,
    pageSize: 100
  },
  gridData: null,
  selectedTemplate: null,
  createTemplatePopup: {
    show: false
  },
  createTemplateResult: null,
  editTemplatePopup: {
    show: false
  },
  editTemplateResult: null,
  deleteTemplatePopup: {
    show: false
  },
  contentDetailPopup: {
    show: false
  }
};
const notificationTemplateSlice = Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__["createSlice"])({
  name: 'notificationTemplate',
  initialState: initialState,
  reducers: {
    resetState: () => initialState,
    setNotificationTypes: (state, action) => {
      state.notificationTypes = action.payload;
    },
    setLanguages: (state, action) => {
      state.languages = action.payload;
    },
    setGridParams: (state, action) => {
      state.gridParams = action.payload;
    },
    setGridData: (state, action) => {
      state.gridData = action.payload;
    },
    setSelectedTemplate: (state, action) => {
      state.selectedTemplate = action.payload;
    },
    setCreateTemplatePopup: (state, action) => {
      state.createTemplatePopup = action.payload;
    },
    setCreateTemplateResult: (state, action) => {
      state.createTemplateResult = action.payload;
    },
    setEditTemplatePopup: (state, action) => {
      state.editTemplatePopup = action.payload;
    },
    setEditTemplateResult: (state, action) => {
      state.editTemplateResult = action.payload;
    },
    setDeleteTemplatePopup: (state, action) => {
      state.deleteTemplatePopup = action.payload;
    },
    setContentDetailPopup: (state, action) => {
      state.contentDetailPopup = action.payload;
    }
  }
});
const {
  actions,
  reducer
} = notificationTemplateSlice;
const {
  resetState,
  setNotificationTypes,
  setLanguages,
  setGridParams,
  setGridData,
  setSelectedTemplate,
  setCreateTemplatePopup,
  setCreateTemplateResult,
  setEditTemplatePopup,
  setEditTemplateResult,
  setDeleteTemplatePopup,
  setContentDetailPopup
} = actions;
/* harmony default export */ __webpack_exports__["default"] = (reducer);

/***/ })

}]);
//# sourceMappingURL=2.chunk.js.map