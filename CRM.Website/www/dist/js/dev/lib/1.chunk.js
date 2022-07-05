(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./www/sources/css/pages/informHeadline/index.scss":
/*!*********************************************************!*\
  !*** ./www/sources/css/pages/informHeadline/index.scss ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./www/sources/js/pages/informheadline/actions.js":
/*!********************************************************!*\
  !*** ./www/sources/js/pages/informheadline/actions.js ***!
  \********************************************************/
/*! exports provided: ActionCreators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionCreators", function() { return ActionCreators; });
/* harmony import */ var _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/common/dataService */ "./www/sources/js/common/dataService.js");
/* harmony import */ var _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/common/site */ "./www/sources/js/common/site.js");
/* harmony import */ var _informHeadlineSlice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./informHeadlineSlice */ "./www/sources/js/pages/informheadline/informHeadlineSlice.js");




const getInforms = () => async dispatch => {
  _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].blockUI();
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('InformHeadline/GetInforms');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__["default"].getDataAsync(url).then(response => {
    dispatch(Object(_informHeadlineSlice__WEBPACK_IMPORTED_MODULE_2__["setInforms"])(response.data));
  }).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].unblockUI());
};

const exportInforms = () => async () => {
  _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].blockUI();
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('InformHeadline/ExportInforms');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__["default"].getFileAsync(url).then(response => {
    const fileName = response.headers['content-disposition'].split('filename=')[1].split(";")[0];
    _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].downloadFile(response.data, fileName);
  }).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].unblockUI());
};

const getTitleDetail = params => async dispatch => {
  _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].blockUI();
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('InformHeadline/GetTitleDetail');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__["default"].getDataAsync(url, params).then(response => {
    dispatch(Object(_informHeadlineSlice__WEBPACK_IMPORTED_MODULE_2__["setTitleDetail"])(response.data));
  }).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].unblockUI());
};

const getContactInformSettings = () => async () => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('InformHeadline/GetContactInformSettings');
  return await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__["default"].getDataAsync(url).then(response => response);
};

const getContactInforms = params => async dispatch => {
  _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].blockUI();
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('InformHeadline/GetContactInforms');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__["default"].postDataAsync(url, params).then(response => {
    dispatch(Object(_informHeadlineSlice__WEBPACK_IMPORTED_MODULE_2__["setContactInforms"])(response.data));
  }).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].unblockUI());
};

const editContactInforms = params => async dispatch => {
  _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].blockUI();
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('InformHeadline/EditContactInforms');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__["default"].postDataAsync(url, params).then(response => {
    dispatch(Object(_informHeadlineSlice__WEBPACK_IMPORTED_MODULE_2__["setResultEditContactInforms"])(response.data));
  }).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].unblockUI());
};

const getAllSettings = () => async dispatch => {
  _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].blockUI();
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('InformHeadline/GetAllSettings');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__["default"].getDataAsync(url).then(response => {
    dispatch(Object(_informHeadlineSlice__WEBPACK_IMPORTED_MODULE_2__["setAllSettings"])(response.data));
  }).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].unblockUI());
};

const getEditInforms = params => async dispatch => {
  _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].blockUI();
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('InformHeadline/GetEditInforms');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__["default"].postDataAsync(url, params).then(response => {
    dispatch(Object(_informHeadlineSlice__WEBPACK_IMPORTED_MODULE_2__["setEditInforms"])(response.data));
  }).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].unblockUI());
};

const editInforms = params => async dispatch => {
  _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].blockUI();
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('InformHeadline/EditInforms');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__["default"].postDataAsync(url, params).then(response => {
    dispatch(Object(_informHeadlineSlice__WEBPACK_IMPORTED_MODULE_2__["setResultEditInforms"])(response.data));
  }).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].unblockUI());
};

const exportContactInforms = params => async () => {
  _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].blockUI();
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('InformHeadline/ExportContactInforms');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__["default"].getFileAsync(url, params).then(response => {
    const fileName = response.headers['content-disposition'].split('filename=')[1].split(";")[0];
    _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].downloadFile(response.data, fileName);
  }).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].unblockUI());
};

const exportEditInforms = params => async () => {
  _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].blockUI();
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('InformHeadline/ExportEditInforms');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__["default"].getFileAsync(url, params).then(response => {
    const fileName = response.headers['content-disposition'].split('filename=')[1].split(";")[0];
    _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].downloadFile(response.data, fileName);
  }).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].unblockUI());
};

const getRemovedAccountLogs = params => async dispatch => {
  _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].blockUI();
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('InformHeadline/GetRemovedAccountLogs');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__["default"].postDataAsync(url, params).then(response => {
    dispatch(Object(_informHeadlineSlice__WEBPACK_IMPORTED_MODULE_2__["setRemovedAccountLogs"])(response.data));
  }).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].unblockUI());
};

const getRemovedAccountLogDetails = params => async dispatch => {
  _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].blockUI();
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('InformHeadline/GetRemovedAccountLogDetails');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__["default"].postDataAsync(url, params).then(response => {
    dispatch(Object(_informHeadlineSlice__WEBPACK_IMPORTED_MODULE_2__["setRemovedAccountLogDetails"])(response.data));
  }).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].unblockUI());
};

const getNewInforms = params => async dispatch => {
  _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].blockUI();
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('InformHeadline/GetNewInforms');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__["default"].postDataAsync(url, params).then(response => {
    dispatch(Object(_informHeadlineSlice__WEBPACK_IMPORTED_MODULE_2__["setNewInforms"])(response.data));
  }).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].unblockUI());
};

const insertInforms = params => async dispatch => {
  _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].blockUI();
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('InformHeadline/InsertInforms');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__["default"].postDataAsync(url, params).then(response => {
    dispatch(Object(_informHeadlineSlice__WEBPACK_IMPORTED_MODULE_2__["setResultInsertInforms"])(response.data));
  }).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].unblockUI());
};

const editInformStatus = params => async () => {
  _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].blockUI();
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('InformHeadline/EditInformStatus');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__["default"].postDataAsync(url, params).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].unblockUI());
};

const exportNewInforms = params => async () => {
  _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].blockUI();
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('InformHeadline/ExportNewInforms');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__["default"].getFileAsync(url, params).then(response => {
    const fileName = response.headers['content-disposition'].split('filename=')[1].split(";")[0];
    _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].downloadFile(response.data, fileName);
  }).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].unblockUI());
};

const ActionCreators = {
  resetState: _informHeadlineSlice__WEBPACK_IMPORTED_MODULE_2__["resetState"],
  getInforms,
  exportInforms,
  getTitleDetail,
  getContactInformSettings,
  getContactInforms,
  setContactInforms: _informHeadlineSlice__WEBPACK_IMPORTED_MODULE_2__["setContactInforms"],
  setEditContactInformDialog: _informHeadlineSlice__WEBPACK_IMPORTED_MODULE_2__["setEditContactInformDialog"],
  editContactInforms,
  setGridParams: _informHeadlineSlice__WEBPACK_IMPORTED_MODULE_2__["setGridParams"],
  getAllSettings,
  getEditInforms,
  setEditInforms: _informHeadlineSlice__WEBPACK_IMPORTED_MODULE_2__["setEditInforms"],
  setEditInformDialog: _informHeadlineSlice__WEBPACK_IMPORTED_MODULE_2__["setEditInformDialog"],
  editInforms,
  setResultEditContactInforms: _informHeadlineSlice__WEBPACK_IMPORTED_MODULE_2__["setResultEditContactInforms"],
  setResultEditInforms: _informHeadlineSlice__WEBPACK_IMPORTED_MODULE_2__["setResultEditInforms"],
  exportContactInforms,
  exportEditInforms,
  getRemovedAccountLogs,
  getRemovedAccountLogDetails,
  setRemovedLogDialog: _informHeadlineSlice__WEBPACK_IMPORTED_MODULE_2__["setRemovedLogDialog"],
  setRemovedLogDetailDialog: _informHeadlineSlice__WEBPACK_IMPORTED_MODULE_2__["setRemovedLogDetailDialog"],
  setGridParamRemovedLogs: _informHeadlineSlice__WEBPACK_IMPORTED_MODULE_2__["setGridParamRemovedLogs"],
  setGridParamRemovedLogDetails: _informHeadlineSlice__WEBPACK_IMPORTED_MODULE_2__["setGridParamRemovedLogDetails"],
  getNewInforms,
  setNewInforms: _informHeadlineSlice__WEBPACK_IMPORTED_MODULE_2__["setNewInforms"],
  setNewInformDialog: _informHeadlineSlice__WEBPACK_IMPORTED_MODULE_2__["setNewInformDialog"],
  insertInforms,
  editInformStatus,
  exportNewInforms,
  setEditedInforms: _informHeadlineSlice__WEBPACK_IMPORTED_MODULE_2__["setEditedInforms"],
  setFilterData: _informHeadlineSlice__WEBPACK_IMPORTED_MODULE_2__["setFilterData"]
};

/***/ }),

/***/ "./www/sources/js/pages/informheadline/common.functions.js":
/*!*****************************************************************!*\
  !*** ./www/sources/js/pages/informheadline/common.functions.js ***!
  \*****************************************************************/
/*! exports provided: renderButtonSave, renderButtonClose, remarkEncode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderButtonSave", function() { return renderButtonSave; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderButtonClose", function() { return renderButtonClose; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "remarkEncode", function() { return remarkEncode; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




const renderButtonSave = (isClosed, hasHostPermission, handleSubmit) => {
  const isShow = !isClosed && hasHostPermission;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    variant: "primary",
    size: "sm",
    className: "mt-3",
    type: "submit",
    style: {
      display: isShow ? 'block' : 'none'
    },
    onClick: handleSubmit
  }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getResource('Save'));
};
const renderButtonClose = onClose => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
    variant: "primary",
    size: "sm",
    onClick: onClose
  }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getResource('Close'));
};

const htmlEncode = value => {
  const item = value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return item;
};

const remarkEncode = value => {
  const dataEdit = value.map(item => {
    if (item.remark) {
      return _objectSpread(_objectSpread({}, item), {}, {
        remark: htmlEncode(item.remark)
      });
    }

    return item;
  });
  return dataEdit;
};

/***/ }),

/***/ "./www/sources/js/pages/informheadline/components/AppContainer.jsx":
/*!*************************************************************************!*\
  !*** ./www/sources/js/pages/informheadline/components/AppContainer.jsx ***!
  \*************************************************************************/
/*! exports provided: AppContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppContainer", function() { return AppContainer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/informheadline/actions.js");
/* harmony import */ var _DataGrid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DataGrid */ "./www/sources/js/pages/informheadline/components/DataGrid.jsx");
/* harmony import */ var _EditContactInforms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./EditContactInforms */ "./www/sources/js/pages/informheadline/components/EditContactInforms.jsx");
/* harmony import */ var _EditInforms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./EditInforms */ "./www/sources/js/pages/informheadline/components/EditInforms.jsx");
/* harmony import */ var _RemovedAccountLogs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./RemovedAccountLogs */ "./www/sources/js/pages/informheadline/components/RemovedAccountLogs.jsx");
/* harmony import */ var _RemovedAccountLogDetails__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./RemovedAccountLogDetails */ "./www/sources/js/pages/informheadline/components/RemovedAccountLogDetails.jsx");
/* harmony import */ var _NewInforms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./NewInforms */ "./www/sources/js/pages/informheadline/components/NewInforms.jsx");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }












class AppContainer extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "handleCloseEditContactInformDialog", () => {
      this.props.setGridParams({
        pageIndex: 1,
        pageSize: 100
      });
      this.props.setContactInforms(null);
      this.props.setEditedInforms([]);
      this.props.resultEditContactInforms && this.props.getInforms();
      this.props.setResultEditContactInforms(null);
      this.props.setEditContactInformDialog({
        show: false
      });
    });

    _defineProperty(this, "handleCloseEditInformDialog", () => {
      this.props.setGridParams({
        pageIndex: 1,
        pageSize: 100
      });
      this.props.setEditInforms(null);
      this.props.setEditedInforms([]);
      this.props.resultEditInforms && this.props.getInforms();
      this.props.setResultEditInforms(null);
      this.props.setEditInformDialog({
        show: false
      });
      this.props.setFilterData({
        values: {},
        errors: {}
      });
    });

    _defineProperty(this, "handleCloseRemovedLogDialog", () => {
      this.props.setRemovedLogDialog({
        show: false
      });
    });

    _defineProperty(this, "handleCloseRemovedLogDetailDialog", () => {
      this.props.setRemovedLogDetailDialog({
        show: false
      });
    });

    _defineProperty(this, "handleCloseNewInformDialog", () => {
      this.props.setGridParams({
        pageIndex: 1,
        pageSize: 100
      });
      this.props.setNewInforms(null);
      this.props.setEditedInforms([]);
      this.props.setNewInformDialog({
        show: false
      });
      this.props.setFilterData({
        values: {},
        errors: {}
      });
    });
  }

  async componentDidMount() {
    await this.props.getInforms();
    await this.props.getAllSettings();
  }

  render() {
    const {
      editContactInformDialog,
      editInformDialog,
      removedLogDialog,
      removedLogDetailDialog,
      newInformDialog,
      allSettings
    } = this.props;

    if (!allSettings) {
      return null;
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DataGrid__WEBPACK_IMPORTED_MODULE_5__["default"], null), editContactInformDialog.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_EditContactInforms__WEBPACK_IMPORTED_MODULE_6__["default"], {
      titleId: editContactInformDialog.titleId,
      status: editContactInformDialog.status,
      onClose: this.handleCloseEditContactInformDialog
    }), editInformDialog.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_EditInforms__WEBPACK_IMPORTED_MODULE_7__["default"], {
      titleId: editInformDialog.titleId,
      onClose: this.handleCloseEditInformDialog
    }), removedLogDialog.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_RemovedAccountLogs__WEBPACK_IMPORTED_MODULE_8__["default"], {
      onClose: this.handleCloseRemovedLogDialog
    }), removedLogDetailDialog.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_RemovedAccountLogDetails__WEBPACK_IMPORTED_MODULE_9__["default"], {
      onClose: this.handleCloseRemovedLogDetailDialog
    }), newInformDialog.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_NewInforms__WEBPACK_IMPORTED_MODULE_10__["default"], {
      onClose: this.handleCloseNewInformDialog
    }));
  }

}

_defineProperty(AppContainer, "propTypes", {
  getInforms: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  editContactInformDialog: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    show: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool
  }).isRequired,
  editInformDialog: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    show: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool
  }).isRequired,
  removedLogDialog: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    show: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool
  }).isRequired,
  removedLogDetailDialog: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    show: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool
  }).isRequired,
  newInformDialog: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    show: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool
  }).isRequired
});

_defineProperty(AppContainer, "defaultProps", {
  getInforms: function () {// nothing
  },
  editContactInformDialog: {
    show: false
  },
  editInformDialog: {
    show: false
  },
  removedLogDialog: {
    show: false
  },
  removedLogDetailDialog: {
    show: false
  },
  newInformDialog: {
    show: false
  }
});

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_3__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_4__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    editContactInformDialog,
    editInformDialog,
    removedLogDialog,
    removedLogDetailDialog,
    newInformDialog,
    resultEditContactInforms,
    resultEditInforms,
    allSettings
  } = state;
  return {
    editContactInformDialog,
    editInformDialog,
    removedLogDialog,
    removedLogDetailDialog,
    newInformDialog,
    resultEditContactInforms,
    resultEditInforms,
    allSettings
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(AppContainer));

/***/ }),

/***/ "./www/sources/js/pages/informheadline/components/DataGrid.jsx":
/*!*********************************************************************!*\
  !*** ./www/sources/js/pages/informheadline/components/DataGrid.jsx ***!
  \*********************************************************************/
/*! exports provided: DataGrid, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataGrid", function() { return DataGrid; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/informheadline/actions.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var _jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/components/react-grid/index */ "./www/sources/js/components/react-grid/index.jsx");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/common/constants */ "./www/sources/js/common/constants.js");
/* harmony import */ var _jsroot_components_ExcelIcon__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jsroot/components/ExcelIcon */ "./www/sources/js/components/ExcelIcon.jsx");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }










class DataGrid extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "buildHeader", () => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderRow"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 10
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Edit')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 45
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Title')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 20
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('CreatedDate')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 20
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('NoDirectAccounts')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 20
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Status')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 20
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Done')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 20
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('RequestToCallBack')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 20
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('NoNeedToCall')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 20
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('NoReply')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 20
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('UnContactable')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 20
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('InternalAccount')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 20
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('NeverTouch')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 20
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('KeptForReference')));
    });

    _defineProperty(this, "buildBody", () => {
      const {
        informs
      } = this.props;

      if (informs.length > 0) {
        return informs.map((item, index) => this.renderRow(item, index));
      }

      return [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Row"], {
        key: `body${1}`,
        className: "no-data"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
        className: "text-center",
        colSpan: 13
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('ThereIsNoData')))];
    });

    _defineProperty(this, "handleEditContact", (titleId, status) => {
      this.props.setEditContactInformDialog({
        show: true,
        titleId,
        status
      });
    });

    _defineProperty(this, "handleEdit", titleId => {
      this.props.setEditInformDialog({
        show: true,
        titleId
      });
    });

    _defineProperty(this, "handleRemovedAccountLogs", titleId => {
      const params = {
        titleId,
        pageIndex: 1,
        pageSize: 100
      };
      this.props.setGridParamRemovedLogs(params);
      this.props.getRemovedAccountLogs(params);
      this.props.setRemovedLogDialog({
        show: true
      });
    });

    _defineProperty(this, "handleCloseCase", titleId => {
      this.props.editInformStatus({
        titleId,
        statusType: true
      });
      this.props.getInforms();
    });

    _defineProperty(this, "handleOpenCase", titleId => {
      this.props.editInformStatus({
        titleId,
        statusType: false
      });
      this.props.getInforms();
    });

    _defineProperty(this, "handleOption", (titleId, status) => {
      const customOption = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.forwardRef(({
        onClick
      }, ref) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        ref: ref,
        onClick: event => onClick(event),
        className: "cursor-pointer fa fa-list"
      }));
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Dropdown"], {
        drop: "down"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Dropdown"].Toggle, {
        as: customOption,
        id: "dropdown-basic"
      }), status === 'Open' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Dropdown"].Menu, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Dropdown"].Item, {
        onClick: () => this.handleEdit(titleId)
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "fa fa-pencil-square-o icon icon-default"
      }), _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('EditNumberOfAccounts')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Dropdown"].Item, {
        onClick: () => this.handleRemovedAccountLogs(titleId)
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "fa fa-list-alt icon icon-default"
      }), _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('RemovedEditedAccountsLogs')), this.props.searchPolicy === _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_7__["Policy"].Host && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Dropdown"].Item, {
        onClick: () => this.handleCloseCase(titleId)
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "fa fa-times icon icon-closed"
      }), _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('CloseCase'))), status === 'Closed' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Dropdown"].Menu, null, this.props.searchPolicy === _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_7__["Policy"].Host && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Dropdown"].Item, {
        onClick: () => this.handleOpenCase(titleId)
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "fa fa-folder-open icon icon-open"
      }), _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('OpenCase')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Dropdown"].Item, {
        onClick: () => this.handleRemovedAccountLogs(titleId)
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "fa fa-list-alt icon icon-default"
      }), _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('RemovedEditedAccountsLogs'))));
    });

    _defineProperty(this, "handleNewInforms", () => {
      this.props.setNewInformDialog({
        show: true
      });
    });

    _defineProperty(this, "renderRow", (item, index) => {
      const cssClass = item.status ? item.status.toLowerCase() : '';
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Row"], {
        key: index,
        className: cssClass
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
        className: "text-center option"
      }, this.handleOption(item.titleId, item.status)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], null, this.props.contactPolicy !== _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_7__["Policy"].None ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "link-click",
        onClick: () => this.handleEditContact(item.titleId, item.status)
      }, item.title) : item.title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], null, item.clientCreatedDate), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
        className: "text-center"
      }, item.total), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
        className: "text-center"
      }, item.status), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
        className: "text-center"
      }, item.done), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
        className: "text-center"
      }, item.requestToCallBack), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
        className: "text-center"
      }, item.noNeedToCall), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
        className: "text-center"
      }, item.noReply), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
        className: "text-center"
      }, item.uncontactable), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
        className: "text-center"
      }, item.internalAccount), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
        className: "text-center"
      }, item.neverTouch), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
        className: "text-center"
      }, item.keptForReference));
    });

    _defineProperty(this, "renderTitle", informs => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "table-title d-flex justify-content-between align-items-center"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Inform Headlines Cases"), informs.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_ExcelIcon__WEBPACK_IMPORTED_MODULE_8__["default"], {
        handleExportExcel: this.props.exportInforms
      }));
    });
  }

  render() {
    const {
      informs
    } = this.props;

    if (!informs) {
      return null;
    }

    if (this.props.searchPolicy !== _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_7__["Policy"].None || this.props.contactPolicy !== _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_7__["Policy"].None) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Table"], {
        maxWidth: 1600,
        shouldUseMaxWidth: true,
        width: 1600,
        autoWidth: false,
        isFixColumn: true,
        title: this.renderTitle(informs),
        header: this.buildHeader(),
        body: this.buildBody(),
        containerPadding: 0,
        adjustedHeight: 10
      }), this.props.searchPolicy === _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_7__["Policy"].Host && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], {
        variant: "primary",
        size: "sm",
        className: "mt-3",
        onClick: this.handleNewInforms
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('NewCase')));
    } else {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "text-center text-danger"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('NoPermission'));
    }
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    informs
  } = state;
  return {
    informs
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(DataGrid));

/***/ }),

/***/ "./www/sources/js/pages/informheadline/components/DataGridEdit.jsx":
/*!*************************************************************************!*\
  !*** ./www/sources/js/pages/informheadline/components/DataGridEdit.jsx ***!
  \*************************************************************************/
/*! exports provided: DataGridEdit, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataGridEdit", function() { return DataGridEdit; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/informheadline/actions.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var _jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/components/react-grid/index */ "./www/sources/js/components/react-grid/index.jsx");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/common/constants */ "./www/sources/js/common/constants.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









class DataGridEdit extends react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"] {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "buildHeader", () => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderRow"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 15
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('DirectAccount')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 15
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Status')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 15
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('UpdatedTime')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 60
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Remark')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 15
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Handler')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 15
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Extension')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 15
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('ProductStatus')));
    });

    _defineProperty(this, "buildBody", () => {
      const {
        informSettings,
        informData,
        gridParams,
        editedInforms
      } = this.props;
      const {
        pageIndex,
        pageSize
      } = gridParams;
      const skip = pageSize * (pageIndex - 1);
      const result = informData && informData.map(element => editedInforms.find(item => item.headlineId === element.headlineId) || element);
      const data = result.slice(skip, pageSize * pageIndex);
      const productStatuses = [...informSettings.productStatuses];
      productStatuses.unshift({
        statusId: 0,
        name: 'N/A'
      });

      if (data.length > 0) {
        return data.map((item, index) => this.renderRow(item, index, productStatuses, informSettings));
      }

      return [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Row"], {
        key: `body${1}`,
        className: "no-data"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
        className: "text-center",
        colSpan: 7
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('ThereIsNoData')))];
    });

    _defineProperty(this, "renderOptions", (name, id, key) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
      key: key,
      value: id
    }, name));

    _defineProperty(this, "renderRow", (item, index, productStatuses, informSettings) => {
      const isClosed = this.props.status === 'Closed' ? true : false;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Row"], {
        key: index,
        className: item.groupId > 0 ? 'free-grid-headline' : 'free-grid-direct'
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], null, item.username), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
        className: "text-center"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        as: "select",
        size: "sm",
        className: "shadow-none",
        name: "informHeadlineStatusId",
        defaultValue: item.informHeadlineStatusId,
        key: item.informHeadlineStatusId,
        disabled: isClosed || !this.props.hasHostPermission,
        onChange: event => this.handleChangeDataGrid(event, item.headlineId)
      }, informSettings.statuses.map((value, key) => this.renderOptions(value.settingValue, value.settingId, key)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], null, item.clientUpdatedTime), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
        className: "text-center"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        as: "textarea",
        size: "sm",
        className: "shadow-none",
        name: "remark",
        defaultValue: item.remark,
        key: item.remark,
        rows: 2,
        disabled: !isClosed && this.props.hasHostPermission === true ? false : true,
        onBlur: event => this.handleChangeDataGrid(event, item.headlineId)
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], null, item.handler), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
        className: "text-center"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        as: "select",
        size: "sm",
        className: "shadow-none",
        name: "extension",
        defaultValue: item.extension,
        key: item.extension,
        disabled: isClosed || !this.props.hasHostPermission,
        onChange: event => this.handleChangeDataGrid(event, item.headlineId)
      }, informSettings.stations.map((value, key) => this.renderOptions(value.name, value.stationId, key)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
        className: "text-center"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        as: "select",
        size: "sm",
        className: "shadow-none",
        name: "productStatus",
        disabled: isClosed || !this.props.hasHostPermission,
        defaultValue: item.productStatus,
        key: item.productStatus,
        onChange: event => this.handleChangeDataGrid(event, item.headlineId)
      }, productStatuses.map((value, key) => this.renderOptions(value.name, value.statusId, key)))));
    });

    _defineProperty(this, "handleChangeDataGrid", (event, headlineId) => {
      const name = event.target.name;
      const value = event.target.type === 'select-one' ? parseInt(event.target.value, 10) : event.target.value;

      const item = _objectSpread(_objectSpread({}, this.props.informData.find(element => element.headlineId === headlineId)), {}, {
        [name]: value
      });

      const newEdited = this.props.editedInforms;
      const element = newEdited.find(value => value.headlineId === item.headlineId);

      if (element) {
        const replaceElement = _objectSpread(_objectSpread({}, element), {}, {
          [name]: value
        });

        const replaceGridData = newEdited.map(item => {
          if (item.headlineId === replaceElement.headlineId) {
            return replaceElement;
          }

          return item;
        });
        this.props.setEditedInforms(replaceGridData);
      } else {
        this.props.setEditedInforms([...newEdited, item]);
      }
    });

    _defineProperty(this, "onPaging", (pageIndex, pageSize) => {
      this.props.setGridParams({
        pageIndex: pageIndex,
        pageSize: pageSize
      });
    });
  }

  render() {
    const {
      gridParams,
      totalItem
    } = this.props;
    const {
      pageIndex,
      pageSize
    } = gridParams;
    const pagingOption = {
      PageIndex: pageIndex,
      PageSize: pageSize,
      TotalItem: totalItem,
      PageList: _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_7__["PAGING_SIZES"]
    };
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Table"], {
      width: 1170,
      autoWidth: false,
      autoHeight: false,
      bodyHeight: 450,
      header: this.buildHeader(),
      body: this.buildBody(),
      isPaging: true,
      pageOption: pagingOption,
      onPaging: this.onPaging,
      containerPadding: 0,
      adjustedHeight: 10,
      shouldResetScrollPosition: false
    });
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    gridParams,
    editedInforms
  } = state;
  return {
    gridParams,
    editedInforms
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(DataGridEdit));

/***/ }),

/***/ "./www/sources/js/pages/informheadline/components/EditContactInforms.jsx":
/*!*******************************************************************************!*\
  !*** ./www/sources/js/pages/informheadline/components/EditContactInforms.jsx ***!
  \*******************************************************************************/
/*! exports provided: EditContactInforms, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditContactInforms", function() { return EditContactInforms; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/informheadline/actions.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _jsroot_components_DraggableModalDialog__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/components/DraggableModalDialog */ "./www/sources/js/components/DraggableModalDialog.jsx");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var _jsroot_components_ResponseMessage__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jsroot/components/ResponseMessage */ "./www/sources/js/components/ResponseMessage.jsx");
/* harmony import */ var _common_functions__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../common.functions */ "./www/sources/js/pages/informheadline/common.functions.js");
/* harmony import */ var _DataGridEdit__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./DataGridEdit */ "./www/sources/js/pages/informheadline/components/DataGridEdit.jsx");
/* harmony import */ var _FilterContactInforms__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./FilterContactInforms */ "./www/sources/js/pages/informheadline/components/FilterContactInforms.jsx");
/* harmony import */ var _jsroot_common_site__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @jsroot/common/site */ "./www/sources/js/common/site.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }














class EditContactInforms extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "setAlert", () => {
      this.setState({
        saveResult: this.props.resultEditContactInforms
      });
      setTimeout(() => {
        this.setState({
          saveResult: null
        });
      }, 3000);
    });

    _defineProperty(this, "handleSubmit", () => {
      const {
        editedInforms,
        titleDetail
      } = this.props;
      const editedContactInforms = Object(_common_functions__WEBPACK_IMPORTED_MODULE_9__["remarkEncode"])(editedInforms);

      if (editedContactInforms.length > 0) {
        this.props.editContactInforms({
          titleId: titleDetail.titleId,
          informs: editedContactInforms
        }).then(() => {
          this.setAlert();
        });
      }
    });

    _defineProperty(this, "renderForm", () => {
      const {
        contactInforms
      } = this.props;
      const {
        selectedStatuses,
        contactInformSettings
      } = this.state;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Body, null, this.state.saveResult && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_ResponseMessage__WEBPACK_IMPORTED_MODULE_8__["default"], {
        isSuccessful: this.state.saveResult.isSuccessful,
        message: this.state.saveResult.message || _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('SaveInformHeadlinesSuccessfully')
      }), selectedStatuses && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_FilterContactInforms__WEBPACK_IMPORTED_MODULE_11__["default"], {
        selectedStatuses: selectedStatuses,
        contactInformSettings: contactInformSettings
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DataGridEdit__WEBPACK_IMPORTED_MODULE_10__["default"], {
        status: this.props.status,
        informData: contactInforms,
        informSettings: contactInformSettings,
        totalItem: contactInforms.length,
        setAlert: this.setAlert,
        handleSubmit: this.handleSubmit
      }));
    });

    this.state = {
      saveResult: null,
      selectedStatuses: '',
      contactInformSettings: null
    };
  }

  componentDidMount() {
    _jsroot_common_site__WEBPACK_IMPORTED_MODULE_12__["default"].blockUI();
    this.props.getContactInformSettings().then(response => {
      _jsroot_common_site__WEBPACK_IMPORTED_MODULE_12__["default"].unblockUI();

      if (response !== undefined && response.data !== null) {
        this.props.getTitleDetail({
          titleId: this.props.titleId
        });
        const selectedStatuses = response.data.filterStatuses.map(item => item.settingId).join();
        const params = {
          titleId: this.props.titleId,
          username: '',
          statusId: selectedStatuses
        };
        this.setState({
          selectedStatuses: selectedStatuses,
          contactInformSettings: response.data
        });
        this.props.getContactInforms(params);
      }
    });
  }

  render() {
    const {
      titleDetail,
      contactInforms,
      status
    } = this.props;
    const isClosed = status === 'Closed' ? true : false;

    if (!titleDetail || !this.state.contactInformSettings || !contactInforms) {
      return null;
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"], {
      show: true,
      className: "edit-inform-modal-dialog modal-edit",
      dialogAs: _jsroot_components_DraggableModalDialog__WEBPACK_IMPORTED_MODULE_6__["default"],
      backdrop: "static",
      keyboard: false,
      size: "xl",
      onHide: this.props.onClose
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Header, {
      closeButton: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Title, {
      as: "div"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('UpdateInformHeadlines'))), this.renderForm(), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Footer, null, Object(_common_functions__WEBPACK_IMPORTED_MODULE_9__["renderButtonSave"])(isClosed, window.hasHostPermission, this.handleSubmit)));
  }

}

_defineProperty(EditContactInforms, "propTypes", {
  titleId: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.number.isRequired
});

_defineProperty(EditContactInforms, "defaultProps", {
  titleId: 0
});

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    titleDetail,
    contactInforms,
    editedInforms,
    resultEditContactInforms
  } = state;
  return {
    titleDetail,
    contactInforms,
    editedInforms,
    resultEditContactInforms
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(EditContactInforms));

/***/ }),

/***/ "./www/sources/js/pages/informheadline/components/EditInforms.jsx":
/*!************************************************************************!*\
  !*** ./www/sources/js/pages/informheadline/components/EditInforms.jsx ***!
  \************************************************************************/
/*! exports provided: EditInforms, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditInforms", function() { return EditInforms; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/informheadline/actions.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _jsroot_components_DraggableModalDialog__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/components/DraggableModalDialog */ "./www/sources/js/components/DraggableModalDialog.jsx");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var _jsroot_components_ResponseMessage__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jsroot/components/ResponseMessage */ "./www/sources/js/components/ResponseMessage.jsx");
/* harmony import */ var _common_functions__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../common.functions */ "./www/sources/js/pages/informheadline/common.functions.js");
/* harmony import */ var _DataGridEdit__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./DataGridEdit */ "./www/sources/js/pages/informheadline/components/DataGridEdit.jsx");
/* harmony import */ var _FilterEditInforms__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./FilterEditInforms */ "./www/sources/js/pages/informheadline/components/FilterEditInforms.jsx");
/* harmony import */ var _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @jsroot/common/constants */ "./www/sources/js/common/constants.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }














class EditInforms extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "getIncludeInSetting", (detail, setting) => {
      const includes = [];
      setting.map(item => {
        if (detail.split(',').includes(item.id.toString())) {
          includes.push(item.id);
        }
      });
      return includes.join(',');
    });

    _defineProperty(this, "setAlert", () => {
      this.setState({
        saveResult: this.props.resultEditInforms
      });
      setTimeout(() => {
        this.setState({
          saveResult: null
        });
      }, 3000);
    });

    _defineProperty(this, "handleSubmit", () => {
      const {
        dataEditInforms,
        editedInforms
      } = this.props;
      const replaceDataEdit = dataEditInforms.map(element => editedInforms.find(item => item.headlineId === element.headlineId) || element);
      const editedData = Object(_common_functions__WEBPACK_IMPORTED_MODULE_9__["remarkEncode"])(replaceDataEdit);

      if (this.props.filterData.errors.title === 'err') {
        this.saveEdit.current.handleValidate();
      } else {
        this.props.editInforms(_objectSpread(_objectSpread({}, this.props.filterData.values), {}, {
          informs: editedData
        })).then(() => {
          this.setAlert();
        });
      }
    });

    this.state = {
      saveResult: null,
      includeCurrencies: null,
      includeSites: null
    };
    this.saveEdit = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
  }

  async componentDidMount() {
    await this.props.getTitleDetail({
      titleId: this.props.titleId
    });
    const {
      titleDetail,
      allSettings
    } = this.props;
    const includeCurrencies = this.getIncludeInSetting(titleDetail.currencies, allSettings.currencies);
    const includeSites = this.getIncludeInSetting(titleDetail.sites, allSettings.sites[0].childSites);
    const params = {
      titleId: this.props.titleId,
      typeAccount: titleDetail.typeAccount,
      currencies: includeCurrencies,
      levels: titleDetail.positions,
      sites: includeSites,
      isVip: titleDetail.isVip,
      excludeIgnoredAccounts: titleDetail.excludeIgnoredAccounts
    };
    this.setState({
      includeCurrencies: includeCurrencies,
      includeSites: includeSites
    });
    this.props.setFilterData(_objectSpread(_objectSpread({}, this.props.filterData), {}, {
      values: _objectSpread(_objectSpread({}, params), {}, {
        title: titleDetail.title,
        changeFilter: false
      })
    }));
    await this.props.getEditInforms(params);
  }

  render() {
    const {
      titleDetail,
      allSettings,
      dataEditInforms,
      exportEditInforms
    } = this.props;

    if (!titleDetail || !allSettings || !dataEditInforms) {
      return null;
    }

    const isHostPermission = this.props.searchPolicy === _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_12__["Policy"].Host;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"], {
      show: true,
      className: "modal-edit edit-feedback-modal-dialog",
      dialogAs: _jsroot_components_DraggableModalDialog__WEBPACK_IMPORTED_MODULE_6__["default"],
      backdrop: "static",
      keyboard: false,
      size: "xl",
      onHide: this.props.onClose
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Header, {
      closeButton: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Title, {
      as: "div"
    }, `${_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('UpdateInformHeadlines')} - ${_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('EditNumberOfAccounts')}`)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Body, null, this.state.saveResult && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_ResponseMessage__WEBPACK_IMPORTED_MODULE_8__["default"], {
      isSuccessful: this.state.saveResult.isSuccessful,
      message: this.state.saveResult.message || _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('SaveInformHeadlinesSuccessfully')
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_FilterEditInforms__WEBPACK_IMPORTED_MODULE_11__["default"], {
      ref: this.saveEdit,
      detail: titleDetail,
      includeCurrencies: this.state.includeCurrencies,
      includeSites: this.state.includeSites,
      informData: dataEditInforms,
      exportExcel: exportEditInforms,
      isNewInform: false
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DataGridEdit__WEBPACK_IMPORTED_MODULE_10__["default"], {
      hasHostPermission: hasHostPermission,
      informData: dataEditInforms,
      informSettings: allSettings,
      totalItem: dataEditInforms.length,
      setAlert: this.setAlert,
      handleSubmit: this.handleSubmit
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Footer, null, Object(_common_functions__WEBPACK_IMPORTED_MODULE_9__["renderButtonSave"])(false, isHostPermission, this.handleSubmit)));
  }

}

_defineProperty(EditInforms, "propTypes", {
  titleDetail: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.shape({
    title: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.string.isRequired,
    currencies: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.string.isRequired,
    sites: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.string.isRequired,
    typeAccount: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.number.isRequired,
    positions: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.string.isRequired,
    isVip: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.number.isRequired,
    excludeIgnoredAccounts: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.bool.isRequired
  }),
  allSettings: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.shape({
    currencies: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.object).isRequired,
    sites: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.shape({
      childSites: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.array.isRequired
    }))
  })
});

_defineProperty(EditInforms, "defaultProps", {
  titleDetail: {
    title: '',
    currencies: '',
    sites: '',
    typeAccount: 1,
    positions: '',
    isVip: 1,
    excludeIgnoredAccounts: true
  },
  allSettings: {
    currencies: [],
    sites: [{
      childSites: []
    }]
  }
});

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    titleDetail,
    allSettings,
    dataEditInforms,
    resultEditInforms,
    editedInforms,
    filterData
  } = state;
  return {
    titleDetail,
    allSettings,
    dataEditInforms,
    resultEditInforms,
    editedInforms,
    filterData
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(EditInforms));

/***/ }),

/***/ "./www/sources/js/pages/informheadline/components/FilterContactInforms.jsx":
/*!*********************************************************************************!*\
  !*** ./www/sources/js/pages/informheadline/components/FilterContactInforms.jsx ***!
  \*********************************************************************************/
/*! exports provided: FilterContactInforms, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FilterContactInforms", function() { return FilterContactInforms; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/informheadline/actions.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var _jsroot_components_multiple_select_index__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/components/multiple-select/index */ "./www/sources/js/components/multiple-select/index.jsx");
/* harmony import */ var _jsroot_components_ExcelIcon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/components/ExcelIcon */ "./www/sources/js/components/ExcelIcon.jsx");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









class FilterContactInforms extends react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleChangeFilter", event => {
      const name = event.target.name;
      this.setState({
        [name]: event.target.value
      });
    });

    _defineProperty(this, "handleChangeStatus", selectedItemsKey => {
      this.setState({
        selectedStatusId: selectedItemsKey
      });
    });

    _defineProperty(this, "contactParams", () => {
      const params = {
        titleId: this.props.titleDetail.titleId,
        username: this.state.username,
        statusId: this.state.selectedStatusId
      };
      return params;
    });

    _defineProperty(this, "handleSearch", event => {
      event.preventDefault();
      const contactParams = this.contactParams();
      this.props.setGridParams({
        pageIndex: 1,
        pageSize: this.props.gridParams.pageSize
      });
      this.props.setEditedInforms([]);
      this.props.getContactInforms(contactParams);
    });

    _defineProperty(this, "handleExportExcel", () => {
      const contactParams = this.contactParams();
      this.props.exportContactInforms(contactParams);
    });

    this.state = {
      username: '',
      selectedStatusId: this.props.selectedStatuses
    };
  }

  render() {
    const {
      titleDetail,
      contactInforms,
      contactInformSettings
    } = this.props;

    if (!contactInformSettings) {
      return null;
    }

    const filterStatuses = contactInformSettings.filterStatuses.map(item => {
      return {
        settingId: item.settingId,
        settingValue: item.settingValue,
        checked: this.state.selectedStatusId.split(',').includes(item.settingId.toString())
      };
    });
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "table-title d-flex justify-content-between align-items-center"
    }, titleDetail.title, contactInforms.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_ExcelIcon__WEBPACK_IMPORTED_MODULE_7__["default"], {
      handleExportExcel: this.handleExportExcel
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"], {
      onSubmit: this.handleSearch,
      className: "form-filter"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
      as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
      className: "col-form-label",
      style: {
        paddingLeft: '10px'
      }
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Username')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
      sm: "2",
      md: "2"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
      type: "input",
      size: "sm",
      className: "shadow-none",
      autoComplete: "off",
      name: "username",
      value: this.state.username,
      onChange: event => this.handleChangeFilter(event),
      onKeyPress: event => event.key === 'Enter' && this.handleSearch(event)
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
      className: "col-form-label",
      style: {
        paddingLeft: '10px'
      }
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Status')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
      sm: "2",
      md: "2"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_multiple_select_index__WEBPACK_IMPORTED_MODULE_6__["default"], {
      dataSource: filterStatuses,
      keyField: "settingId",
      valueField: "settingValue",
      hasAllOption: filterStatuses.length > 0,
      isAllTextShown: filterStatuses.length > 0,
      hasSearchBox: true,
      isNAOption: true,
      maxDisplayItemCount: 1,
      onChange: (currentItem, selectedItemsKey) => {
        this.handleChangeStatus(selectedItemsKey);
      }
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], {
      variant: "primary",
      size: "sm",
      onClick: this.handleSearch
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Search'))))));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    titleDetail,
    contactInforms,
    gridParams
  } = state;
  return {
    titleDetail,
    contactInforms,
    gridParams
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(FilterContactInforms));

/***/ }),

/***/ "./www/sources/js/pages/informheadline/components/FilterEditInforms.jsx":
/*!******************************************************************************!*\
  !*** ./www/sources/js/pages/informheadline/components/FilterEditInforms.jsx ***!
  \******************************************************************************/
/*! exports provided: FilterEditInforms, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FilterEditInforms", function() { return FilterEditInforms; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/informheadline/actions.js");
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! formik */ "./node_modules/formik/dist/formik.esm.js");
/* harmony import */ var _jsroot_components_FormikErrorMessage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/components/FormikErrorMessage */ "./www/sources/js/components/FormikErrorMessage.jsx");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var _jsroot_components_multiple_select_index__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jsroot/components/multiple-select/index */ "./www/sources/js/components/multiple-select/index.jsx");
/* harmony import */ var _jsroot_components_ExcelIcon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @jsroot/components/ExcelIcon */ "./www/sources/js/components/ExcelIcon.jsx");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }











class FilterEditInforms extends react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "renderFilterForm", ({
      values,
      errors,
      touched,
      handleSubmit,
      handleChange,
      setFieldValue
    }) => {
      const {
        detail,
        allSettings,
        informData
      } = this.props;
      const allPositions = [{
        id: 4,
        name: 'Super'
      }, {
        id: 3,
        name: 'Master'
      }, {
        id: 2,
        name: 'Agent'
      }, {
        id: 1,
        name: 'Member'
      }, {
        id: 0,
        name: 'Guest'
      }];
      const allIsVip = [{
        id: 2,
        name: 'All'
      }, {
        id: 1,
        name: 'Yes'
      }, {
        id: 0,
        name: 'No'
      }];
      const filterCurrencies = allSettings.currencies.map(item => {
        return {
          id: item.id,
          name: item.name,
          checked: values.currencies.split(',').includes(item.id.toString())
        };
      });
      const filterLevels = allPositions.map(item => {
        return {
          id: item.id,
          name: item.name,
          checked: values.levels.split(',').includes(item.id.toString())
        };
      });
      const filterSites = allSettings.sites[0].childSites.map(item => {
        return {
          id: item.id,
          name: item.name,
          checked: values.sites.split(',').includes(item.id.toString())
        };
      });
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Form"], {
        noValidate: true,
        onSubmit: handleSubmit,
        className: "form-filter"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_FormikErrorMessage__WEBPACK_IMPORTED_MODULE_5__["default"], {
        touched: touched,
        errors: errors,
        fieldNames: Object.keys(values)
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Col"], {
        sm: "12",
        md: "12",
        className: "group-input-excel"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Form"].Control, {
        type: "text",
        size: "sm",
        className: "shadow-none input-excel",
        autoComplete: "off",
        name: "title",
        placeholder: "Title",
        isInvalid: touched.title && errors.title,
        defaultValue: detail.title,
        onChange: event => {
          setFieldValue('title', event.target.value);
        }
      }), informData && informData.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_ExcelIcon__WEBPACK_IMPORTED_MODULE_9__["default"], {
        handleExportExcel: () => this.handleExportExcel(values)
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Form"].Label, {
        className: "col-form-label",
        style: {
          paddingLeft: '15px'
        }
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Currency')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Col"], {
        sm: "2",
        md: "2"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_multiple_select_index__WEBPACK_IMPORTED_MODULE_8__["default"], {
        isInvalid: touched.currencies && errors.currencies,
        dataSource: filterCurrencies,
        keyField: "id",
        valueField: "name",
        maxDisplayItemCount: 3,
        hasAllOption: filterCurrencies.length > 0,
        isAllTextShown: filterCurrencies.length > 0,
        hasSearchBox: true,
        onChange: (currentItem, selectedItemsKey) => {
          setFieldValue('currencies', selectedItemsKey);
        }
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Form"].Label, {
        className: "col-form-label",
        style: {
          paddingLeft: '15px'
        }
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Position')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Col"], {
        sm: "2",
        md: "2"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_multiple_select_index__WEBPACK_IMPORTED_MODULE_8__["default"], {
        isInvalid: touched.levels && errors.levels,
        dataSource: filterLevels,
        keyField: "id",
        valueField: "name",
        hasAllOption: filterLevels.length > 0,
        isAllTextShown: filterLevels.length > 0,
        hasSearchBox: true,
        maxDisplayItemCount: 2,
        onChange: (currentItem, selectedItemsKey) => {
          setFieldValue('levels', selectedItemsKey);
        }
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Form"].Label, {
        className: "col-form-label",
        style: {
          paddingLeft: '15px'
        }
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Site')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Col"], {
        sm: "2",
        md: "2"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_multiple_select_index__WEBPACK_IMPORTED_MODULE_8__["default"], {
        isInvalid: touched.sites && errors.sites,
        dataSource: filterSites,
        keyField: "id",
        valueField: "name",
        hasAllOption: filterSites.length > 0,
        isAllTextShown: filterSites.length > 0,
        maxDisplayItemCount: 1,
        hasSearchBox: true,
        onChange: (currentItem, selectedItemsKey) => {
          setFieldValue('sites', selectedItemsKey);
        }
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Form"].Label, {
        className: "col-form-label",
        style: {
          paddingLeft: '15px'
        }
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('VIP')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Col"], {
        sm: "1",
        md: "1"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Form"].Control, {
        as: "select",
        size: "sm",
        className: "shadow-none",
        name: "isVip",
        defaultValue: detail.isVip,
        key: detail.isVip,
        onChange: handleChange
      }, allIsVip.map((value, key) => this.renderOptions(value.name, value.id, key)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Col"], {
        sm: "1",
        md: "1"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Button"], {
        variant: "primary",
        size: "sm",
        style: {
          width: '65px'
        },
        type: "submit",
        onClick: () => setFieldValue('submit', false)
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Search')))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Row"],
        style: {
          alignItems: 'center'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Form"].Label, {
        className: "col-form-label",
        style: {
          paddingLeft: '15px'
        }
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('DirectAccount')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Form"].Check, {
        type: "checkbox",
        className: "check-btn",
        checked: values.isHeadline,
        onChange: event => setFieldValue('isHeadline', event.target.checked)
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Form"].Label, {
        className: "col-form-label",
        style: {
          paddingLeft: '2px'
        }
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Headline')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Form"].Check, {
        type: "checkbox",
        className: "check-btn",
        checked: values.isNoGroup,
        onChange: event => setFieldValue('isNoGroup', event.target.checked)
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Form"].Label, {
        className: "col-form-label",
        style: {
          paddingLeft: '2px'
        }
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('WithoutAnyGroup')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Form"].Check, {
        type: "checkbox",
        className: "check-btn",
        checked: values.excludeIgnoredAccounts,
        onChange: event => setFieldValue('excludeIgnoredAccounts', event.target.checked)
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Form"].Label, {
        className: "col-form-label",
        style: {
          paddingLeft: '2px'
        }
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('ExcludeIgnoredAccounts'))));
    });

    _defineProperty(this, "renderOptions", (name, id, key) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
      key: key,
      value: id
    }, name));

    _defineProperty(this, "initFormData", (includeCurrencies, includeSites) => {
      const {
        title,
        positions,
        isVip,
        excludeIgnoredAccounts,
        typeAccount
      } = this.props.detail;
      return {
        title: title,
        currencies: includeCurrencies,
        levels: positions,
        sites: includeSites,
        isVip: isVip,
        typeAccount: typeAccount,
        isHeadline: typeAccount === 1 || typeAccount === 3,
        isNoGroup: typeAccount === 2 || typeAccount === 3,
        excludeIgnoredAccounts: excludeIgnoredAccounts
      };
    });

    _defineProperty(this, "initNewFormData", () => {
      return {
        title: '',
        currencies: '',
        levels: '',
        sites: '',
        isVip: 2,
        typeAccount: 3,
        isHeadline: true,
        isNoGroup: true,
        excludeIgnoredAccounts: true
      };
    });

    _defineProperty(this, "validateFormik", values => {
      const errors = this.getErrorValidate(values);
      this.getTypeAccount(values);
      this.setState({
        isSave: false
      });

      if (this.props.isNewInform) {
        this.props.setFilterData(_objectSpread(_objectSpread({}, this.props.filterData), {}, {
          values: _objectSpread({}, values),
          errors: values.title === '' ? {
            title: 'err'
          } : errors
        }));
      } else {
        this.props.setFilterData(_objectSpread(_objectSpread({}, this.props.filterData), {}, {
          values: _objectSpread(_objectSpread({}, values), {}, {
            titleId: this.props.detail.titleId,
            changeFilter: this.getChangeFilter(values)
          }),
          errors: values.title === '' ? {
            title: 'err'
          } : errors
        }));
      }

      return errors;
    });

    _defineProperty(this, "getErrorValidate", values => {
      const errors = {};

      if (this.state.isSave && values.title === '') {
        errors.title = _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].formatString(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('FieldRequired'), _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Title'));
      }

      if (values.currencies === '') {
        errors.currencies = _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].formatString(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('FieldRequired'), _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Currency'));
      }

      if (values.levels === '') {
        errors.levels = _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].formatString(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('FieldRequired'), _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Position'));
      }

      if (values.sites === '') {
        errors.sites = _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].formatString(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('FieldRequired'), _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Site'));
      }

      if (!values.isHeadline && !values.isNoGroup) {
        errors.isHeadline = _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].formatString(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('FieldRequired'), _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('DirectAccount'));
      }

      return errors;
    });

    _defineProperty(this, "getTypeAccount", values => {
      let accountType = 0;

      if (values.isHeadline) {
        accountType = accountType + 1;
      }

      if (values.isNoGroup) {
        accountType = accountType + 2;
      }

      values.typeAccount = accountType;
    });

    _defineProperty(this, "getChangeFilter", values => {
      const initData = this.initData;
      return values.currencies !== initData.currencies || values.levels !== initData.levels || values.sites !== initData.sites || this.changeFilter(values);
    });

    _defineProperty(this, "changeFilter", values => {
      const data = this.initData;
      return parseInt(values.isVip, 10) !== data.isVip || values.typeAccount !== data.typeAccount || values.excludeIgnoredAccounts !== data.excludeIgnoredAccounts;
    });

    _defineProperty(this, "filterParams", values => {
      const params = {
        typeAccount: values.typeAccount,
        currencies: values.currencies,
        levels: values.levels,
        sites: values.sites,
        isVip: parseInt(values.isVip, 10),
        excludeIgnoredAccounts: values.excludeIgnoredAccounts
      };
      return params;
    });

    _defineProperty(this, "handleExportExcel", values => {
      const filterParams = this.filterParams(values);
      this.props.exportExcel(_objectSpread(_objectSpread({}, filterParams), {}, {
        titleId: this.props.detail.titleId,
        title: values.title
      }));
    });

    _defineProperty(this, "handleSearchEdit", (values, {
      setSubmitting
    }) => {
      setSubmitting(true);
      this.getTypeAccount(values);

      const params = _objectSpread(_objectSpread({}, this.filterParams(values)), {}, {
        titleId: this.props.detail.titleId
      });

      this.props.setGridParams({
        pageIndex: 1,
        pageSize: this.props.gridParams.pageSize
      });
      this.props.setFilterData(_objectSpread(_objectSpread({}, this.props.filterData), {}, {
        values: _objectSpread(_objectSpread({}, params), {}, {
          title: values.title,
          changeFilter: this.getChangeFilter(values)
        })
      }));
      this.props.setEditedInforms([]);
      this.props.getEditInforms(params);
    });

    _defineProperty(this, "handleSearchNew", (values, {
      setSubmitting
    }) => {
      setSubmitting(true);
      this.getTypeAccount(values);

      const params = _objectSpread({}, this.filterParams(values));

      this.props.setGridParams({
        pageIndex: 1,
        pageSize: this.props.gridParams.pageSize
      });
      this.props.setFilterData(_objectSpread(_objectSpread({}, this.props.filterData), {}, {
        values: _objectSpread(_objectSpread({}, params), {}, {
          title: values.title
        })
      }));
      this.props.setEditedInforms([]);
      this.props.getNewInforms(params);
    });

    _defineProperty(this, "handleValidate", () => {
      this.setState({
        isSave: true
      }, this.formik.handleSubmit);
    });

    this.initData = props.isNewInform ? this.initNewFormData() : this.initFormData(props.includeCurrencies, props.includeSites);
    this.state = {
      isSave: false
    };
  }

  componentDidMount() {
    this.props.isNewInform && this.props.setFilterData({
      errors: {
        title: 'err'
      }
    });
  }

  render() {
    const {
      isNewInform
    } = this.props;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_4__["Formik"], {
      innerRef: el => this.formik = el,
      initialValues: this.initData,
      validate: this.validateFormik,
      onSubmit: isNewInform ? this.handleSearchNew : this.handleSearchEdit
    }, this.renderFilterForm));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    allSettings,
    filterData,
    gridParams
  } = state;
  return {
    allSettings,
    filterData,
    gridParams
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true
})(FilterEditInforms));

/***/ }),

/***/ "./www/sources/js/pages/informheadline/components/NewInforms.jsx":
/*!***********************************************************************!*\
  !*** ./www/sources/js/pages/informheadline/components/NewInforms.jsx ***!
  \***********************************************************************/
/*! exports provided: NewInforms, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewInforms", function() { return NewInforms; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/informheadline/actions.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var _jsroot_components_DraggableModalDialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/components/DraggableModalDialog */ "./www/sources/js/components/DraggableModalDialog.jsx");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var _common_functions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../common.functions */ "./www/sources/js/pages/informheadline/common.functions.js");
/* harmony import */ var _DataGridEdit__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./DataGridEdit */ "./www/sources/js/pages/informheadline/components/DataGridEdit.jsx");
/* harmony import */ var _jsroot_components_ResponseMessage__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @jsroot/components/ResponseMessage */ "./www/sources/js/components/ResponseMessage.jsx");
/* harmony import */ var _FilterEditInforms__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./FilterEditInforms */ "./www/sources/js/pages/informheadline/components/FilterEditInforms.jsx");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }












class NewInforms extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "setAlert", () => {
      this.setState({
        saveResult: this.props.resultInsertInforms
      });
      setTimeout(() => {
        this.setState({
          saveResult: null
        });
        this.props.setNewInformDialog({
          show: false
        });
        this.props.getInforms();
      }, 3000);
    });

    _defineProperty(this, "handleSubmit", async () => {
      const {
        editedInforms
      } = this.props;
      const newData = Object(_common_functions__WEBPACK_IMPORTED_MODULE_7__["remarkEncode"])(editedInforms);

      if (this.props.filterData.errors.title === 'err') {
        this.saveNew.current.handleValidate();
      } else {
        await this.props.insertInforms(_objectSpread(_objectSpread({}, this.props.filterData.values), {}, {
          informs: newData
        }));
        this.setAlert();
      }
    });

    this.state = {
      saveResult: null
    };
    this.saveNew = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
  }

  render() {
    const {
      allSettings,
      newInforms,
      exportNewInforms,
      hasHostPermission
    } = this.props;

    if (!allSettings) {
      return null;
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"], {
      show: true,
      className: "new-inform-modal-dialog modal-edit",
      dialogAs: _jsroot_components_DraggableModalDialog__WEBPACK_IMPORTED_MODULE_5__["default"],
      backdrop: "static",
      keyboard: false,
      size: "xl",
      onHide: this.props.onClose
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Header, {
      closeButton: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Title, {
      as: "div"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('NewInformHeadlines'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Body, null, this.state.saveResult && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_ResponseMessage__WEBPACK_IMPORTED_MODULE_9__["default"], {
      isSuccessful: this.state.saveResult.isSuccessful,
      message: this.state.saveResult.message || _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('AddNewCaseSuccessfully')
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_FilterEditInforms__WEBPACK_IMPORTED_MODULE_10__["default"], {
      ref: this.saveNew,
      detail: "",
      informData: newInforms,
      exportExcel: exportNewInforms,
      isNewInform: true
    }), newInforms && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DataGridEdit__WEBPACK_IMPORTED_MODULE_8__["default"], {
      hasHostPermission: hasHostPermission,
      informData: newInforms,
      informSettings: allSettings,
      totalItem: newInforms.length,
      setAlert: this.setAlert,
      handleSubmit: this.handleSubmit
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Footer, null, Object(_common_functions__WEBPACK_IMPORTED_MODULE_7__["renderButtonSave"])(false, true, this.handleSubmit)));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    allSettings,
    newInforms,
    editedInforms,
    filterData,
    resultInsertInforms
  } = state;
  return {
    allSettings,
    newInforms,
    editedInforms,
    filterData,
    resultInsertInforms
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(NewInforms));

/***/ }),

/***/ "./www/sources/js/pages/informheadline/components/RemovedAccountLogDetails.jsx":
/*!*************************************************************************************!*\
  !*** ./www/sources/js/pages/informheadline/components/RemovedAccountLogDetails.jsx ***!
  \*************************************************************************************/
/*! exports provided: RemovedAccountLogDetails, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RemovedAccountLogDetails", function() { return RemovedAccountLogDetails; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/informheadline/actions.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var _jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/components/react-grid/index */ "./www/sources/js/components/react-grid/index.jsx");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/common/constants */ "./www/sources/js/common/constants.js");
/* harmony import */ var _common_functions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../common.functions */ "./www/sources/js/pages/informheadline/common.functions.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }










class RemovedAccountLogDetails extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "buildHeader", () => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderRow"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 15
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('DirectAccount')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 15
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Status')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 12
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('UpdatedTime')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 35
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Remark')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 15
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Handler')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 12
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Extension')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 12
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('ProductStatus')));
    });

    _defineProperty(this, "buildBody", () => {
      const {
        removedAccountLogDetails
      } = this.props;

      if (removedAccountLogDetails.item.length > 0) {
        return removedAccountLogDetails.item.map((item, index) => this.renderRow(item, index));
      }

      return [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Row"], {
        key: `body${1}`,
        className: "no-data"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
        className: "text-center",
        colSpan: 7
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('ThereIsNoData')))];
    });

    _defineProperty(this, "renderRow", (item, index) => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Row"], {
        key: index
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
        className: "text-center"
      }, item.directAccount), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
        className: "text-center"
      }, item.status), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
        className: "text-center"
      }, item.clientUpdatedTime), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], null, item.remark), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
        className: "text-center"
      }, item.handler), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
        className: "text-center"
      }, item.extension), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
        className: "text-center"
      }, item.productStatus));
    });

    _defineProperty(this, "onPaging", (pageIndex, pageSize) => {
      const params = _objectSpread({}, this.props.gridParamRemovedLogDetails);

      params['pageSize'] = pageSize;
      params['pageIndex'] = pageIndex;
      this.props.setGridParamRemovedLogDetails(params);
      this.props.getRemovedAccountLogDetails(params);
    });
  }

  render() {
    const {
      removedAccountLogDetails
    } = this.props;

    if (!removedAccountLogDetails || !removedAccountLogDetails.item) {
      return null;
    }

    const {
      pageIndex,
      pageSize
    } = this.props.gridParamRemovedLogDetails;
    const pagingOption = {
      PageIndex: pageIndex,
      PageSize: pageSize,
      TotalItem: removedAccountLogDetails.totalItems,
      PageList: _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_7__["PAGING_SIZES"]
    };
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"], {
      show: true,
      backdrop: "static",
      keyboard: false,
      size: "xl",
      onHide: this.props.onClose,
      className: "modal-removeDetail"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Header, {
      closeButton: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Title, {
      as: "div"
    }, `${_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('InformHeadlines')} - ${_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('RemovedEditedAccountsLogs')}`)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Body, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Table"], {
      width: 1050,
      autoWidth: false,
      header: this.buildHeader(),
      body: this.buildBody(),
      isPaging: true,
      pageOption: pagingOption,
      onPaging: this.onPaging,
      containerPadding: 0,
      adjustedHeight: 10
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Footer, null, Object(_common_functions__WEBPACK_IMPORTED_MODULE_8__["renderButtonClose"])(this.props.onClose)));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    removedAccountLogDetails,
    gridParamRemovedLogDetails
  } = state;
  return {
    removedAccountLogDetails,
    gridParamRemovedLogDetails
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(RemovedAccountLogDetails));

/***/ }),

/***/ "./www/sources/js/pages/informheadline/components/RemovedAccountLogs.jsx":
/*!*******************************************************************************!*\
  !*** ./www/sources/js/pages/informheadline/components/RemovedAccountLogs.jsx ***!
  \*******************************************************************************/
/*! exports provided: RemovedAccountLogs, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RemovedAccountLogs", function() { return RemovedAccountLogs; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/informheadline/actions.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var _jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/components/react-grid/index */ "./www/sources/js/components/react-grid/index.jsx");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/common/constants */ "./www/sources/js/common/constants.js");
/* harmony import */ var _common_functions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../common.functions */ "./www/sources/js/pages/informheadline/common.functions.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }










class RemovedAccountLogs extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "handleRemovedAccountLogDetails", logId => {
      const params = {
        logId: logId,
        pageIndex: 1,
        pageSize: 100
      };
      this.props.setGridParamRemovedLogDetails(params);
      this.props.getRemovedAccountLogDetails(params);
      this.props.setRemovedLogDetailDialog({
        show: true
      });
    });

    _defineProperty(this, "buildHeader", () => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderRow"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 15
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Date')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 15
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('EditedBy')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 15
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('NumberOfRemovedEditedAccounts')));
    });

    _defineProperty(this, "buildBody", () => {
      const {
        removedAccountLogs
      } = this.props;

      if (removedAccountLogs.item.length > 0) {
        return removedAccountLogs.item.map((item, index) => this.renderRow(item, index));
      }

      return [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Row"], {
        key: `body${1}`,
        className: "no-data"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
        className: "text-center",
        colSpan: 3
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('ThereIsNoData')))];
    });

    _defineProperty(this, "renderRow", (item, index) => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Row"], {
        key: index
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
        className: "text-center"
      }, item.clientLogDate), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
        className: "text-center"
      }, item.username), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
        className: "text-center"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "number-remove",
        onClick: () => this.handleRemovedAccountLogDetails(item.logId)
      }, item.totals)));
    });

    _defineProperty(this, "onPaging", (pageIndex, pageSize) => {
      const params = _objectSpread({}, this.props.gridParamRemovedLogs);

      params['pageSize'] = pageSize;
      params['pageIndex'] = pageIndex;
      this.props.setGridParamRemovedLogs(params);
      this.props.getRemovedAccountLogs(params);
    });
  }

  render() {
    const {
      removedAccountLogs
    } = this.props;

    if (!removedAccountLogs || !removedAccountLogs.item) {
      return null;
    }

    const {
      pageIndex,
      pageSize
    } = this.props.gridParamRemovedLogs;
    const pagingOption = {
      PageIndex: pageIndex,
      PageSize: pageSize,
      TotalItem: removedAccountLogs.totalItems,
      PageList: _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_7__["PAGING_SIZES"]
    };
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"], {
      show: true,
      size: "lg",
      backdrop: "static",
      keyboard: false,
      onHide: this.props.onClose,
      className: "modal-remove"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Header, {
      closeButton: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Title, {
      as: "div"
    }, `${_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('InformHeadlines')} - ${_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('RemovedEditedAccountsLogs')}`)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Body, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Table"], {
      width: 570,
      autoWidth: false,
      isPaging: true,
      pageOption: pagingOption,
      onPaging: this.onPaging,
      header: this.buildHeader(),
      body: this.buildBody(),
      containerPadding: 0,
      adjustedHeight: 10
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Footer, null, Object(_common_functions__WEBPACK_IMPORTED_MODULE_8__["renderButtonClose"])(this.props.onClose)));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    removedAccountLogs,
    gridParamRemovedLogs
  } = state;
  return {
    removedAccountLogs,
    gridParamRemovedLogs
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(RemovedAccountLogs));

/***/ }),

/***/ "./www/sources/js/pages/informheadline/index.js":
/*!******************************************************!*\
  !*** ./www/sources/js/pages/informheadline/index.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return index; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @reduxjs/toolkit */ "./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");
/* harmony import */ var _informHeadlineSlice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./informHeadlineSlice */ "./www/sources/js/pages/informheadline/informHeadlineSlice.js");
/* harmony import */ var _components_AppContainer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/AppContainer */ "./www/sources/js/pages/informheadline/components/AppContainer.jsx");
/* harmony import */ var _cssroot_pages_informHeadline_index_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @cssroot/pages/informHeadline/index.scss */ "./www/sources/css/pages/informHeadline/index.scss");
/* harmony import */ var _cssroot_pages_informHeadline_index_scss__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_cssroot_pages_informHeadline_index_scss__WEBPACK_IMPORTED_MODULE_5__);





const store = Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__["configureStore"])({
  reducer: _informHeadlineSlice__WEBPACK_IMPORTED_MODULE_3__["default"]
});

class index extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_1__["Provider"], {
      store: store
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "inform-headline"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_AppContainer__WEBPACK_IMPORTED_MODULE_4__["default"], null)));
  }

}

/***/ }),

/***/ "./www/sources/js/pages/informheadline/informHeadlineSlice.js":
/*!********************************************************************!*\
  !*** ./www/sources/js/pages/informheadline/informHeadlineSlice.js ***!
  \********************************************************************/
/*! exports provided: resetState, setInforms, setTitleDetail, setContactInforms, setEditContactInformDialog, setGridParams, setAllSettings, setEditInforms, setEditInformDialog, setResultEditContactInforms, setResultEditInforms, setRemovedAccountLogs, setRemovedAccountLogDetails, setRemovedLogDialog, setRemovedLogDetailDialog, setGridParamRemovedLogs, setGridParamRemovedLogDetails, setNewInforms, setNewInformDialog, setResultInsertInforms, setEditedInforms, setFilterData, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetState", function() { return resetState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setInforms", function() { return setInforms; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setTitleDetail", function() { return setTitleDetail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setContactInforms", function() { return setContactInforms; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setEditContactInformDialog", function() { return setEditContactInformDialog; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setGridParams", function() { return setGridParams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setAllSettings", function() { return setAllSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setEditInforms", function() { return setEditInforms; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setEditInformDialog", function() { return setEditInformDialog; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setResultEditContactInforms", function() { return setResultEditContactInforms; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setResultEditInforms", function() { return setResultEditInforms; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setRemovedAccountLogs", function() { return setRemovedAccountLogs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setRemovedAccountLogDetails", function() { return setRemovedAccountLogDetails; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setRemovedLogDialog", function() { return setRemovedLogDialog; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setRemovedLogDetailDialog", function() { return setRemovedLogDetailDialog; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setGridParamRemovedLogs", function() { return setGridParamRemovedLogs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setGridParamRemovedLogDetails", function() { return setGridParamRemovedLogDetails; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setNewInforms", function() { return setNewInforms; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setNewInformDialog", function() { return setNewInformDialog; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setResultInsertInforms", function() { return setResultInsertInforms; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setEditedInforms", function() { return setEditedInforms; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setFilterData", function() { return setFilterData; });
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @reduxjs/toolkit */ "./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");

const initialState = {
  informs: null,
  titleDetail: null,
  contactInforms: null,
  editContactInformDialog: {
    show: false
  },
  allSettings: null,
  dataEditInforms: null,
  editInformDialog: {
    show: false
  },
  resultEditContactInforms: null,
  resultEditInforms: null,
  removedAccountLogs: null,
  removedAccountLogDetails: null,
  removedLogDialog: {
    show: false
  },
  removedLogDetailDialog: {
    show: false
  },
  newInforms: null,
  newInformDialog: {
    show: false
  },
  resultInsertInforms: null,
  editedInforms: [],
  filterData: {
    values: {},
    errors: {}
  },
  gridParams: {
    pageIndex: 1,
    pageSize: 100
  },
  gridParamRemovedLogs: {
    pageIndex: 1,
    pageSize: 100
  },
  gridRemovedLogDetails: {
    pageIndex: 1,
    pageSize: 100
  }
};
const informHeadlineSlice = Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__["createSlice"])({
  name: 'informHeadline',
  initialState: initialState,
  reducers: {
    resetState: () => initialState,
    setInforms: (state, action) => {
      state.informs = action.payload;
    },
    setTitleDetail: (state, action) => {
      state.titleDetail = action.payload;
    },
    setContactInforms: (state, action) => {
      state.contactInforms = action.payload;
    },
    setEditContactInformDialog: (state, action) => {
      state.editContactInformDialog = action.payload;
    },
    setGridParams: (state, action) => {
      state.gridParams = action.payload;
    },
    setAllSettings: (state, action) => {
      state.allSettings = action.payload;
    },
    setEditInforms: (state, action) => {
      state.dataEditInforms = action.payload;
    },
    setEditInformDialog: (state, action) => {
      state.editInformDialog = action.payload;
    },
    setResultEditContactInforms: (state, action) => {
      state.resultEditContactInforms = action.payload;
    },
    setResultEditInforms: (state, action) => {
      state.resultEditInforms = action.payload;
    },
    setRemovedAccountLogs: (state, action) => {
      state.removedAccountLogs = action.payload;
    },
    setRemovedAccountLogDetails: (state, action) => {
      state.removedAccountLogDetails = action.payload;
    },
    setRemovedLogDialog: (state, action) => {
      state.removedLogDialog = action.payload;
    },
    setRemovedLogDetailDialog: (state, action) => {
      state.removedLogDetailDialog = action.payload;
    },
    setGridParamRemovedLogs: (state, action) => {
      state.gridParamRemovedLogs = action.payload;
    },
    setGridParamRemovedLogDetails: (state, action) => {
      state.gridParamRemovedLogDetails = action.payload;
    },
    setNewInforms: (state, action) => {
      state.newInforms = action.payload;
    },
    setNewInformDialog: (state, action) => {
      state.newInformDialog = action.payload;
    },
    setResultInsertInforms: (state, action) => {
      state.resultInsertInforms = action.payload;
    },
    setEditedInforms: (state, action) => {
      state.editedInforms = action.payload;
    },
    setFilterData: (state, action) => {
      state.filterData = action.payload;
    }
  }
});
const {
  actions,
  reducer
} = informHeadlineSlice;
const {
  resetState,
  setInforms,
  setTitleDetail,
  setContactInforms,
  setEditContactInformDialog,
  setGridParams,
  setAllSettings,
  setEditInforms,
  setEditInformDialog,
  setResultEditContactInforms,
  setResultEditInforms,
  setRemovedAccountLogs,
  setRemovedAccountLogDetails,
  setRemovedLogDialog,
  setRemovedLogDetailDialog,
  setGridParamRemovedLogs,
  setGridParamRemovedLogDetails,
  setNewInforms,
  setNewInformDialog,
  setResultInsertInforms,
  setEditedInforms,
  setFilterData
} = actions;
/* harmony default export */ __webpack_exports__["default"] = (reducer);

/***/ })

}]);
//# sourceMappingURL=1.chunk.js.map