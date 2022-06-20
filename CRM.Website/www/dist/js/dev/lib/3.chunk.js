(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

/***/ "./www/sources/css/pages/notification-type/index.scss":
/*!************************************************************!*\
  !*** ./www/sources/css/pages/notification-type/index.scss ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./www/sources/js/pages/notification-type/actions.js":
/*!***********************************************************!*\
  !*** ./www/sources/js/pages/notification-type/actions.js ***!
  \***********************************************************/
/*! exports provided: getSettings, deleteNotificationType, editNotificationType, getNotificationTypeGridData, createNotificationType, ActionCreators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSettings", function() { return getSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteNotificationType", function() { return deleteNotificationType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "editNotificationType", function() { return editNotificationType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNotificationTypeGridData", function() { return getNotificationTypeGridData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createNotificationType", function() { return createNotificationType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionCreators", function() { return ActionCreators; });
/* harmony import */ var _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/common/site */ "./www/sources/js/common/site.js");
/* harmony import */ var _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/common/dataService */ "./www/sources/js/common/dataService.js");
/* harmony import */ var _notificationTypeSlice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./notificationTypeSlice */ "./www/sources/js/pages/notification-type/notificationTypeSlice.js");



const getSettings = () => async dispatch => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl('NotificationType/GetSettings');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__["default"].getDataAsync(url).then(response => {
    dispatch(Object(_notificationTypeSlice__WEBPACK_IMPORTED_MODULE_2__["setSettings"])(response.data));
  }).catch(_jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].handleAxiosError);
};
const deleteNotificationType = data => async dispatch => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl(`NotificationType/Delete`);
  return await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__["default"].postDataAsync(url, data).then(response => response.data);
};
const editNotificationType = data => async dispatch => {
  _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].blockUI();
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl('NotificationType/Edit');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__["default"].postDataAsync(url, data).then(response => {
    dispatch(Object(_notificationTypeSlice__WEBPACK_IMPORTED_MODULE_2__["setEditNotificationTypeResult"])(response.data));
  }).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].unblockUI());
};
const getNotificationTypeGridData = params => async dispatch => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl('NotificationType/GetNotificationType');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__["default"].postDataAsync(url, params).then(response => {
    dispatch(Object(_notificationTypeSlice__WEBPACK_IMPORTED_MODULE_2__["setNotificationTypeGridData"])(response.data));
  });
};
const createNotificationType = data => async dispatch => {
  _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].blockUI();
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl('NotificationType/Create');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__["default"].postDataAsync(url, data).then(response => {
    dispatch(Object(_notificationTypeSlice__WEBPACK_IMPORTED_MODULE_2__["setCreateNotificationTypeResult"])(response.data));
  }).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].unblockUI());
};
const ActionCreators = {
  resetState: _notificationTypeSlice__WEBPACK_IMPORTED_MODULE_2__["resetState"],
  setNotificationTypeGridParams: _notificationTypeSlice__WEBPACK_IMPORTED_MODULE_2__["setNotificationTypeGridParams"],
  getNotificationTypeGridData,
  setNotificationTypeGridData: _notificationTypeSlice__WEBPACK_IMPORTED_MODULE_2__["setNotificationTypeGridData"],
  setSettings: _notificationTypeSlice__WEBPACK_IMPORTED_MODULE_2__["setSettings"],
  setCreateNotificationTypePopup: _notificationTypeSlice__WEBPACK_IMPORTED_MODULE_2__["setCreateNotificationTypePopup"],
  setCreateNotificationTypeResult: _notificationTypeSlice__WEBPACK_IMPORTED_MODULE_2__["setCreateNotificationTypeResult"],
  createNotificationType,
  setEditNotificationTypePopup: _notificationTypeSlice__WEBPACK_IMPORTED_MODULE_2__["setEditNotificationTypePopup"],
  setEditNotificationTypeResult: _notificationTypeSlice__WEBPACK_IMPORTED_MODULE_2__["setEditNotificationTypeResult"],
  editNotificationType,
  setDeleteNotificationTypePopup: _notificationTypeSlice__WEBPACK_IMPORTED_MODULE_2__["setDeleteNotificationTypePopup"],
  deleteNotificationType,
  getSettings
};

/***/ }),

/***/ "./www/sources/js/pages/notification-type/common.functions.js":
/*!********************************************************************!*\
  !*** ./www/sources/js/pages/notification-type/common.functions.js ***!
  \********************************************************************/
/*! exports provided: renderSystemOption, validateFormik, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderSystemOption", function() { return renderSystemOption; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateFormik", function() { return validateFormik; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");


const renderSystemOption = item => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
    key: item.id,
    value: item.id
  }, item.name);
};
const validateFormik = values => {
  const errors = {};

  if (!values.notificationTypeName || values.notificationTypeName.trim().length === 0) {
    errors.notificationTypeName = _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('NotificationTypeNameRequired');
  } else {
    if (values.notificationTypeName.trim().length > 500) {
      errors.notificationTypeName = _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].formatString(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('FieldMaxLength'), _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('NotificationTypeName'), 500);
    }
  }

  if (!values.recipientTypeIds) {
    errors.recipientTypeIds = _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('RecipientTypeRequired');
  }

  if (!values.chatTypeIds) {
    errors.chatTypeIds = _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('ChatTypeRequired');
  }

  if (!values.systemId) {
    errors.systemId = _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('SystemRequired');
  }

  return errors;
};
const functions = {
  renderSystemOption,
  validateFormik
};
/* harmony default export */ __webpack_exports__["default"] = (functions);

/***/ }),

/***/ "./www/sources/js/pages/notification-type/components/AppContainer.jsx":
/*!****************************************************************************!*\
  !*** ./www/sources/js/pages/notification-type/components/AppContainer.jsx ***!
  \****************************************************************************/
/*! exports provided: AppContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppContainer", function() { return AppContainer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/notification-type/actions.js");
/* harmony import */ var _Filter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Filter */ "./www/sources/js/pages/notification-type/components/Filter.jsx");
/* harmony import */ var _DataGrid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DataGrid */ "./www/sources/js/pages/notification-type/components/DataGrid.jsx");
/* harmony import */ var _NewNotificationType__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./NewNotificationType */ "./www/sources/js/pages/notification-type/components/NewNotificationType.jsx");
/* harmony import */ var _EditNotificationType__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./EditNotificationType */ "./www/sources/js/pages/notification-type/components/EditNotificationType.jsx");
/* harmony import */ var _jsroot_components_ConfirmPopup__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jsroot/components/ConfirmPopup */ "./www/sources/js/components/ConfirmPopup.jsx");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/lib/index.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_toastify__WEBPACK_IMPORTED_MODULE_10__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }












class AppContainer extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "handleCloseCreatePopup", () => {
      this.props.setCreateNotificationTypePopup({
        show: false
      });
      this.props.setCreateNotificationTypeResult(null);
    });

    _defineProperty(this, "handleCloseEditPopup", () => {
      this.props.setEditNotificationTypePopup({
        show: false
      });
      this.props.setEditNotificationTypeResult(null);
    });

    _defineProperty(this, "handleCreateSuccess", () => {
      this.handleCloseCreatePopup();
      this.props.getNotificationTypeGridData(this.props.notificationTypeGridParams);
    });

    _defineProperty(this, "handleEditSuccess", () => {
      this.handleCloseEditPopup();
      this.props.getNotificationTypeGridData(this.props.notificationTypeGridParams);
    });

    _defineProperty(this, "handleCloseDeletePopup", () => {
      this.props.setDeleteNotificationTypePopup({
        show: false
      });
    });

    _defineProperty(this, "handleDelete", () => {
      const {
        notificationTypeId,
        name
      } = this.props.deleteNotificationTypePopup;
      const params = {
        notificationTypeId: notificationTypeId,
        notificationTypeName: name
      };
      this.props.deleteNotificationType(params).then(data => {
        this.handleCloseDeletePopup();
        this.props.getNotificationTypeGridData(this.props.notificationTypeGridParams);

        if (data.isSuccessful) {
          react_toastify__WEBPACK_IMPORTED_MODULE_10__["toast"].success(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('DeleteNotificationTypeSuccessfully'));
        } else {
          react_toastify__WEBPACK_IMPORTED_MODULE_10__["toast"].error(data.message);
        }
      });
    });
  }

  componentWillUnmount() {
    this.props.resetState();
  }

  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Filter__WEBPACK_IMPORTED_MODULE_4__["default"], {
      isHost: this.props.isHost
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DataGrid__WEBPACK_IMPORTED_MODULE_5__["default"], {
      isHost: this.props.isHost
    }), this.props.createNotificationTypePopup.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_NewNotificationType__WEBPACK_IMPORTED_MODULE_6__["default"], {
      onClose: this.handleCloseCreatePopup,
      onSuccess: this.handleCreateSuccess
    }), this.props.editNotificationTypePopup.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_EditNotificationType__WEBPACK_IMPORTED_MODULE_7__["default"], {
      onClose: this.handleCloseEditPopup,
      onSuccess: this.handleEditSuccess
    }), this.props.deleteNotificationTypePopup.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_ConfirmPopup__WEBPACK_IMPORTED_MODULE_8__["default"], {
      title: _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('Confirmation'),
      content: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "Are you sure you want to delete ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, this.props.deleteNotificationTypePopup.name), "?"),
      onSubmit: this.handleDelete,
      onClose: this.handleCloseDeletePopup
    }));
  }

}

_defineProperty(AppContainer, "defaultProps", {
  createNotificationTypePopup: {
    show: false
  },
  editNotificationTypePopup: {
    show: false
  },
  deleteNotificationTypePopup: {
    show: false
  },
  isHost: false
});

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    notificationTypeGridParams,
    createNotificationTypePopup,
    editNotificationTypePopup,
    deleteNotificationTypePopup
  } = state;
  return {
    notificationTypeGridParams,
    createNotificationTypePopup,
    editNotificationTypePopup,
    deleteNotificationTypePopup
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(AppContainer));

/***/ }),

/***/ "./www/sources/js/pages/notification-type/components/DataGrid.jsx":
/*!************************************************************************!*\
  !*** ./www/sources/js/pages/notification-type/components/DataGrid.jsx ***!
  \************************************************************************/
/*! exports provided: DataGrid, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataGrid", function() { return DataGrid; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var _jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/components/react-grid/index */ "./www/sources/js/components/react-grid/index.jsx");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/notification-type/actions.js");
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
      this.props.setNotificationTypeGridParams(params);
      this.props.getNotificationTypeGridData(params);
    });

    _defineProperty(this, "handleEdit", item => {
      this.props.setEditNotificationTypePopup({
        show: true,
        data: item
      });
    });

    _defineProperty(this, "handleDelete", (id, name) => {
      this.props.setDeleteNotificationTypePopup({
        show: true,
        notificationTypeId: id,
        name: name
      });
    });

    _defineProperty(this, "buildNotificationTypeHeader", isHost => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderRow"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 5
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('SymbolNo')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 20
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('NotificationType')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 20
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('RecipientType')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 20
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('ChatType')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 20
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('System')), isHost && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 10
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('Action')));
    });

    _defineProperty(this, "buildNotificationTypeBody", isHost => {
      const {
        pageIndex,
        pageSize
      } = this.props.notificationTypeGridParams;
      this.startIndex = (pageIndex - 1) * pageSize + 1;

      if (this.props.notificationTypeGridData.data.length > 0) {
        return this.props.notificationTypeGridData.data.map((item, index) => this.renderRow(item, index, isHost));
      }

      return [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Row"], {
        key: `body${1}`,
        className: "no-data"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        colSpan: isHost ? 6 : 5
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('ThereIsNoData')))];
    });

    _defineProperty(this, "renderRow", (item, index, isHost) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Row"], {
      key: item.notificationTypeId
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
      className: "text-center"
    }, index + this.startIndex), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], null, item.notificationTypeName), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], null, item.recipientTypes.map(x => x.recipientTypeName).join(', ')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], null, item.chatTypes.map(x => x.chatTypeName).join(', ')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], null, item.systemName), isHost && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
      className: "text-center"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "rounded-circle fa fa-pencil icon-edit",
      onClick: () => this.handleEdit(item)
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "rounded-circle fa fa-trash icon-delete",
      onClick: () => this.handleDelete(item.notificationTypeId, item.notificationTypeName)
    }))));
  }

  render() {
    if (!this.props.notificationTypeGridData || !this.props.notificationTypeGridData.data) {
      return null;
    }

    const {
      totalItems
    } = this.props.notificationTypeGridData;
    const {
      pageIndex,
      pageSize
    } = this.props.notificationTypeGridParams;
    const {
      isHost
    } = this.props;
    const pagingOption = {
      PageIndex: pageIndex,
      PageSize: pageSize,
      TotalItem: totalItems,
      PageList: _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_6__["PAGING_SIZES"]
    };
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "table-title"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('NotificationType')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Table"], {
      minWidth: 960,
      maxWidth: document.getElementById('app-container').clientWidth,
      autoWidth: true,
      header: this.buildNotificationTypeHeader(isHost),
      body: this.buildNotificationTypeBody(isHost),
      isPaging: true,
      pageOption: pagingOption,
      onPaging: this.onPaging,
      containerPadding: 0,
      adjustedHeight: 10
    }));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_5__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    notificationTypeGridParams,
    notificationTypeGridData
  } = state;
  return {
    notificationTypeGridParams,
    notificationTypeGridData
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(DataGrid));

/***/ }),

/***/ "./www/sources/js/pages/notification-type/components/EditNotificationType.jsx":
/*!************************************************************************************!*\
  !*** ./www/sources/js/pages/notification-type/components/EditNotificationType.jsx ***!
  \************************************************************************************/
/*! exports provided: EditNotificationType, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditNotificationType", function() { return EditNotificationType; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/notification-type/actions.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! formik */ "./node_modules/formik/dist/formik.esm.js");
/* harmony import */ var _common_functions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../common.functions */ "./www/sources/js/pages/notification-type/common.functions.js");
/* harmony import */ var _jsroot_components_FormikErrorMessage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/components/FormikErrorMessage */ "./www/sources/js/components/FormikErrorMessage.jsx");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var _components_multiple_select_index__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../components/multiple-select/index */ "./www/sources/js/components/multiple-select/index.jsx");
/* harmony import */ var _jsroot_components_ResponseMessage__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @jsroot/components/ResponseMessage */ "./www/sources/js/components/ResponseMessage.jsx");
/* harmony import */ var _jsroot_components_DraggableModalDialog__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @jsroot/components/DraggableModalDialog */ "./www/sources/js/components/DraggableModalDialog.jsx");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }













class EditNotificationType extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "renderForm", ({
      values,
      errors,
      touched,
      handleChange,
      handleSubmit,
      isSubmitting,
      setFieldValue
    }) => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"], {
        noValidate: true,
        onSubmit: handleSubmit
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Body, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_FormikErrorMessage__WEBPACK_IMPORTED_MODULE_7__["default"], {
        touched: touched,
        errors: errors,
        fieldNames: Object.keys(values)
      }), this.props.editNotificationTypeResult && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_ResponseMessage__WEBPACK_IMPORTED_MODULE_10__["default"], {
        isSuccessful: this.props.editNotificationTypeResult.isSuccessful,
        message: this.props.editNotificationTypeResult.message || _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('EditNotificationTypeSuccessfully')
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "4",
        md: "3",
        htmlFor: "name",
        className: "required"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('NotificationTypeName')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "8",
        md: "9"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        type: "text",
        size: "sm",
        value: values.notificationTypeName,
        name: "notificationTypeName",
        id: "name",
        className: "shadow-none",
        autoComplete: "off",
        isInvalid: touched.notificationTypeName && errors.notificationTypeName,
        onChange: handleChange
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "4",
        md: "3",
        className: "required"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('RecipientType')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "8",
        md: "9"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_multiple_select_index__WEBPACK_IMPORTED_MODULE_9__["default"], {
        isInvalid: touched.recipientTypeIds && errors.recipientTypeIds,
        dataSource: this.state.recipientTypesOptions,
        keyField: "id",
        valueField: "name",
        statusField: "checked",
        isAllTextShown: true,
        onChange: (currentItem, selectedItemsKey) => {
          setFieldValue('recipientTypeIds', selectedItemsKey);
        }
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "4",
        md: "3",
        className: "required"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('ChatType')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "8",
        md: "9"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_multiple_select_index__WEBPACK_IMPORTED_MODULE_9__["default"], {
        isInvalid: touched.chatTypeIds && errors.chatTypeIds,
        dataSource: this.state.chatTypesOptions,
        valueField: "name",
        statusField: "checked",
        keyField: "id",
        isAllTextShown: true,
        onChange: (currentItem, selectedItemsKey) => {
          setFieldValue('chatTypeIds', selectedItemsKey);
        }
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "4",
        md: "3",
        htmlFor: "systemId",
        className: "required"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('System')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "8",
        md: "9"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        as: "select",
        size: "sm",
        className: "shadow-none",
        id: "systemId",
        isInvalid: touched.system && errors.system,
        name: "systemId",
        onChange: handleChange,
        value: values.systemId
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        value: "",
        disabled: true,
        hidden: true
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('PleaseSelect')), this.props.settings.systems.map(_common_functions__WEBPACK_IMPORTED_MODULE_6__["renderSystemOption"]))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Footer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], {
        type: "submit",
        variant: "primary",
        size: "sm",
        disabled: isSubmitting
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('Save')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], {
        type: "submit",
        variant: "primary",
        size: "sm",
        onClick: this.props.onClose
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('Cancel'))));
    });

    _defineProperty(this, "handleSubmit", (values, {
      setSubmitting
    }) => {
      const notificationType = {
        notificationTypeId: values.notificationTypeId,
        notificationTypeName: values.notificationTypeName,
        chatTypeIds: values.chatTypeIds,
        recipientTypeIds: values.recipientTypeIds,
        systemId: values.systemId
      };
      setSubmitting(true);
      this.props.editNotificationType(notificationType).then(() => {
        if (this.props.editNotificationTypeResult.isSuccessful) {
          setTimeout(() => {
            this.props.onSuccess();
          }, 3000);
        } else {
          setSubmitting(false);
        }
      });
    });

    this.state = {
      recipientTypesOptions: [],
      chatTypesOptions: []
    };
  }

  componentDidMount() {
    const data = this.props.editNotificationTypePopup.data;
    const recipientTypesOptions = this.props.settings.recipientTypes.map(x => {
      return {
        id: x.id,
        name: x.name,
        checked: data.recipientTypes.some(y => y.recipientTypeId === x.id) ? true : false
      };
    });
    const chatTypesOptions = this.props.settings.chatTypes.map(x => {
      return {
        id: x.id,
        name: x.name,
        checked: data.chatTypes.some(y => y.chatTypeId === x.id) ? true : false
      };
    });
    this.setState({
      recipientTypesOptions,
      chatTypesOptions
    });
  }

  render() {
    const notificationType = this.props.editNotificationTypePopup.data;
    const initialValues = {
      notificationTypeId: notificationType.notificationTypeId,
      notificationTypeName: notificationType.notificationTypeName,
      recipientTypeIds: notificationType.recipientTypes.map(x => x.recipientTypeId).toString(),
      chatTypeIds: notificationType.chatTypes.map(x => x.chatTypeId).toString(),
      systemId: notificationType.systemId
    };
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"], {
      show: true,
      className: "new-notification-type",
      dialogAs: _jsroot_components_DraggableModalDialog__WEBPACK_IMPORTED_MODULE_11__["default"],
      backdrop: "static",
      keyboard: false,
      size: "lg",
      centered: true,
      onHide: this.props.onClose
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Header, {
      closeButton: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Title, {
      as: "div"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('EditNotificationType'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_5__["Formik"], {
      initialValues: initialValues,
      validate: values => Object(_common_functions__WEBPACK_IMPORTED_MODULE_6__["validateFormik"])(values),
      onSubmit: this.handleSubmit
    }, this.renderForm));
  }

}

_defineProperty(EditNotificationType, "defaultProps", {
  editNotificationTypePopup: {
    data: {
      recipientTypes: [],
      chatTypes: []
    }
  },
  settings: {
    recipientTypes: [],
    chatTypes: [],
    systems: []
  },
  editNotificationTypeResult: {},
  getSettings: {}
});

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    editNotificationTypeResult,
    editNotificationTypePopup,
    settings,
    getSettings
  } = state;
  return {
    editNotificationTypeResult,
    editNotificationTypePopup,
    settings,
    getSettings
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(EditNotificationType));

/***/ }),

/***/ "./www/sources/js/pages/notification-type/components/Filter.jsx":
/*!**********************************************************************!*\
  !*** ./www/sources/js/pages/notification-type/components/Filter.jsx ***!
  \**********************************************************************/
/*! exports provided: Filter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Filter", function() { return Filter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/notification-type/actions.js");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var _components_multiple_select_index__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../components/multiple-select/index */ "./www/sources/js/components/multiple-select/index.jsx");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/lib/index.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_toastify__WEBPACK_IMPORTED_MODULE_7__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









class Filter extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "componentDidMount", () => {
      this.props.getSettings().then(() => {
        // recipient type
        const recipientTypeIds = [];
        const recipientTypesOptions = this.props.settings.recipientTypes.map(x => {
          recipientTypeIds.push(x.id);
          return {
            id: x.id,
            name: x.name,
            checked: true
          };
        }); // chat type

        const chatTypeIds = [];
        const chatTypesOptions = this.props.settings.chatTypes.map(x => {
          chatTypeIds.push(x.id);
          return {
            id: x.id,
            name: x.name,
            checked: true
          };
        }); // system

        const systemIds = [];
        const systemsOptions = this.props.settings.systems.map(x => {
          systemIds.push(x.id);
          return {
            id: x.id,
            name: x.name,
            checked: true
          };
        });
        this.setState({
          recipientTypesOptions,
          chatTypesOptions,
          systemsOptions,
          filter: {
            recipientTypes: recipientTypeIds.toString(),
            chatTypes: chatTypeIds.toString(),
            systems: systemIds.toString()
          }
        });
      });
    });

    _defineProperty(this, "recipientNotificationTypeChange", (currentItem, selectedItemsKey) => this.handleFilterChange('recipientTypes', selectedItemsKey));

    _defineProperty(this, "chatNotificationTypeChange", (currentItem, selectedItemsKey) => this.handleFilterChange('chatTypes', selectedItemsKey));

    _defineProperty(this, "systemChange", (currentItem, selectedItemsKey) => this.handleFilterChange('systems', selectedItemsKey));

    _defineProperty(this, "handleNotificationTypeChange", event => {
      this.setState({
        notificationTypeName: event.target.value
      });
    });

    _defineProperty(this, "handleFilterChange", (name, value) => {
      this.setState(prevState => ({
        filter: _objectSpread(_objectSpread({}, prevState.filter), {
          [name]: value
        })
      }));
    });

    _defineProperty(this, "getParams", () => {
      return {
        notificationTypeName: this.state.notificationTypeName,
        chatTypeIds: this.state.filter.chatTypes,
        recipientTypeIds: this.state.filter.recipientTypes,
        systemId: this.state.filter.systems,
        pageIndex: 1,
        pageSize: 100
      };
    });

    _defineProperty(this, "submitHandler", e => {
      e.preventDefault();
      const params = this.getParams();
      const error = [];

      if (params.recipientTypeIds === '') {
        error.push(`${_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('RecipientType')}`);
      }

      if (params.chatTypeIds === '') {
        error.push(`${_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('ChatType')}`);
      }

      if (params.systemId === '') {
        error.push(`${_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('System')}`);
      }

      if (error.length > 0) {
        react_toastify__WEBPACK_IMPORTED_MODULE_7__["toast"].error(`${_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('PleaseChoose')} ${error.join(', ').toString()}`);
      } else {
        this.props.setNotificationTypeGridParams(params);
        this.props.getNotificationTypeGridData(params);
      }
    });

    _defineProperty(this, "handleOpenCreatePopup", () => this.props.setCreateNotificationTypePopup({
      show: true
    }));

    this.state = {
      filter: {
        notificationTypeName: '',
        recipientTypes: '',
        chatTypes: '',
        systems: ''
      },
      recipientTypesOptions: [],
      chatTypesOptions: [],
      systemsOptions: []
    };
  }

  render() {
    const {
      isHost
    } = this.props;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"], {
      className: "form-filter",
      onSubmit: this.submitHandler
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Row, {
      bsPrefix: "form-row"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Label, {
      htmlFor: "notificationTypeName"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('NotificationType')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Control, {
      type: "text",
      size: "sm",
      className: "shadow-none",
      autoComplete: "off",
      id: "notificationTypeName",
      value: this.state.notificationTypeName,
      onChange: this.handleNotificationTypeChange
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Label, null, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('RecipientType')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "form-control-wrapper"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_multiple_select_index__WEBPACK_IMPORTED_MODULE_6__["default"], {
      dataSource: this.state.recipientTypesOptions,
      keyField: "id",
      valueField: "name",
      statusField: "checked",
      isAllTextShown: true,
      onChange: this.recipientNotificationTypeChange
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Label, null, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('ChatType')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "form-control-wrapper"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_multiple_select_index__WEBPACK_IMPORTED_MODULE_6__["default"], {
      dataSource: this.state.chatTypesOptions,
      keyField: "id",
      valueField: "name",
      statusField: "checked",
      isAllTextShown: true,
      onChange: this.chatNotificationTypeChange
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Label, null, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('System')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "form-control-wrapper"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_multiple_select_index__WEBPACK_IMPORTED_MODULE_6__["default"], {
      dataSource: this.state.systemsOptions,
      keyField: "id",
      valueField: "name",
      statusField: "checked",
      isAllTextShown: true,
      onChange: this.systemChange
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
      className: "mr-4",
      variant: "primary",
      size: "sm",
      onClick: this.submitHandler
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Submit')), isHost && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
      variant: "primary",
      size: "sm",
      onClick: this.handleOpenCreatePopup
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Insert')))));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_3__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_4__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    notificationTypeGridParams,
    settings,
    getSettings
  } = state;
  return {
    notificationTypeGridParams,
    settings,
    getSettings
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(Filter));

/***/ }),

/***/ "./www/sources/js/pages/notification-type/components/NewNotificationType.jsx":
/*!***********************************************************************************!*\
  !*** ./www/sources/js/pages/notification-type/components/NewNotificationType.jsx ***!
  \***********************************************************************************/
/*! exports provided: NewNotificationType, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewNotificationType", function() { return NewNotificationType; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/notification-type/actions.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! formik */ "./node_modules/formik/dist/formik.esm.js");
/* harmony import */ var _jsroot_components_FormikErrorMessage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/components/FormikErrorMessage */ "./www/sources/js/components/FormikErrorMessage.jsx");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var _components_multiple_select_index__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../components/multiple-select/index */ "./www/sources/js/components/multiple-select/index.jsx");
/* harmony import */ var _jsroot_components_ResponseMessage__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @jsroot/components/ResponseMessage */ "./www/sources/js/components/ResponseMessage.jsx");
/* harmony import */ var _jsroot_components_DraggableModalDialog__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @jsroot/components/DraggableModalDialog */ "./www/sources/js/components/DraggableModalDialog.jsx");
/* harmony import */ var _common_functions__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../common.functions */ "./www/sources/js/pages/notification-type/common.functions.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }













class NewNotificationType extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "renderForm", ({
      values,
      errors,
      touched,
      handleChange,
      handleSubmit,
      isSubmitting,
      setFieldValue
    }) => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"], {
        noValidate: true,
        onSubmit: handleSubmit
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Body, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_FormikErrorMessage__WEBPACK_IMPORTED_MODULE_6__["default"], {
        touched: touched,
        errors: errors,
        fieldNames: Object.keys(values)
      }), this.props.createNotificationTypeResult && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_ResponseMessage__WEBPACK_IMPORTED_MODULE_9__["default"], {
        isSuccessful: this.props.createNotificationTypeResult.isSuccessful,
        message: this.props.createNotificationTypeResult.message || _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('InsertNotificationTypeSuccessfully')
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "4",
        md: "3",
        htmlFor: "name",
        className: "required"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('NotificationTypeName')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "8",
        md: "9"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        type: "text",
        size: "sm",
        value: values.notificationTypeName,
        name: "notificationTypeName",
        id: "name",
        className: "shadow-none",
        autoComplete: "off",
        onChange: handleChange,
        isInvalid: touched.notificationTypeName && errors.notificationTypeName
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "4",
        md: "3",
        className: "required"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('RecipientType')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "8",
        md: "9"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_multiple_select_index__WEBPACK_IMPORTED_MODULE_8__["default"], {
        isInvalid: touched.recipientTypeIds && errors.recipientTypeIds,
        dataSource: this.props.settings.recipientTypes,
        keyField: "id",
        statusField: "checked",
        valueField: "name",
        isAllTextShown: true,
        onChange: (currentItem, selectedItemsKey) => {
          setFieldValue('recipientTypeIds', selectedItemsKey);
        }
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "4",
        md: "3",
        className: "required"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('ChatType')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "8",
        md: "9"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_multiple_select_index__WEBPACK_IMPORTED_MODULE_8__["default"], {
        isInvalid: touched.chatTypeIds && errors.chatTypeIds,
        dataSource: this.props.settings.chatTypes,
        keyField: "id",
        statusField: "checked",
        valueField: "name",
        isAllTextShown: true,
        onChange: (currentItem, selectedItemsKey) => {
          setFieldValue('chatTypeIds', selectedItemsKey);
        }
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "4",
        md: "3",
        value: values.systemId,
        className: "required"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('System')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "8",
        md: "9"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        as: "select",
        size: "sm",
        className: "shadow-none",
        isInvalid: touched.systemId && errors.systemId,
        name: "systemId",
        onChange: handleChange,
        value: values.systemId
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        value: "",
        hidden: true
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('PleaseSelect')), this.props.settings.systems.map(_common_functions__WEBPACK_IMPORTED_MODULE_11__["renderSystemOption"]))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Footer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], {
        type: "submit",
        variant: "primary",
        size: "sm",
        disabled: isSubmitting
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Save')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], {
        type: "submit",
        variant: "primary",
        size: "sm",
        onClick: this.props.onClose
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Cancel'))));
    });

    _defineProperty(this, "handleSubmit", (values, {
      setSubmitting
    }) => {
      const notificationType = {
        notificationTypeName: values.notificationTypeName,
        chatTypeIds: values.chatTypeIds,
        recipientTypeIds: values.recipientTypeIds,
        systemId: values.systemId
      };
      setSubmitting(true);
      this.props.createNotificationType(notificationType).then(() => {
        if (this.props.createNotificationTypeResult.isSuccessful) {
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
      notificationTypeName: '',
      recipientTypeIds: '',
      chatTypeIds: '',
      systemId: ''
    };
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"], {
      show: true,
      className: "new-notification-type",
      dialogAs: _jsroot_components_DraggableModalDialog__WEBPACK_IMPORTED_MODULE_10__["default"],
      backdrop: "static",
      keyboard: false,
      size: "lg",
      centered: true,
      onHide: this.props.onClose
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Header, {
      closeButton: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Title, {
      as: "div"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('InsertNotificationType'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_5__["Formik"], {
      onSubmit: this.handleSubmit,
      initialValues: initialValues,
      validate: values => Object(_common_functions__WEBPACK_IMPORTED_MODULE_11__["validateFormik"])(values)
    }, this.renderForm));
  }

}

_defineProperty(NewNotificationType, "defaultProps", {
  createNotificationTypeResult: {},
  settings: {
    recipientTypes: [],
    chatTypes: [],
    systems: []
  },
  getSettings: {}
});

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    createNotificationTypeResult,
    settings,
    getSettings
  } = state;
  return {
    createNotificationTypeResult,
    settings,
    getSettings
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(NewNotificationType));

/***/ }),

/***/ "./www/sources/js/pages/notification-type/index.js":
/*!*********************************************************!*\
  !*** ./www/sources/js/pages/notification-type/index.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @reduxjs/toolkit */ "./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");
/* harmony import */ var _components_AppContainer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/AppContainer */ "./www/sources/js/pages/notification-type/components/AppContainer.jsx");
/* harmony import */ var _notificationTypeSlice__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./notificationTypeSlice */ "./www/sources/js/pages/notification-type/notificationTypeSlice.js");
/* harmony import */ var _jsroot_components_WithNavigation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/components/WithNavigation */ "./www/sources/js/components/WithNavigation.jsx");
/* harmony import */ var _cssroot_pages_notification_type_index_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @cssroot/pages/notification-type/index.scss */ "./www/sources/css/pages/notification-type/index.scss");
/* harmony import */ var _cssroot_pages_notification_type_index_scss__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_cssroot_pages_notification_type_index_scss__WEBPACK_IMPORTED_MODULE_6__);







const store = Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__["configureStore"])({
  reducer: _notificationTypeSlice__WEBPACK_IMPORTED_MODULE_4__["default"]
});
const isHost = true;

class index extends react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"] {
  render() {
    const location = this.props.location;
    console.log(location.state.id);
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_1__["Provider"], {
      store: store
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_AppContainer__WEBPACK_IMPORTED_MODULE_3__["default"], {
      isHost: isHost
    }));
  }

}

const FunctionBarWithNavigation = Object(_jsroot_components_WithNavigation__WEBPACK_IMPORTED_MODULE_5__["default"])(index);
/* harmony default export */ __webpack_exports__["default"] = (FunctionBarWithNavigation);

/***/ }),

/***/ "./www/sources/js/pages/notification-type/notificationTypeSlice.js":
/*!*************************************************************************!*\
  !*** ./www/sources/js/pages/notification-type/notificationTypeSlice.js ***!
  \*************************************************************************/
/*! exports provided: resetState, setNotificationTypeGridParams, setNotificationTypeGridData, setSettings, setCreateNotificationTypePopup, setCreateNotificationTypeResult, setEditNotificationTypePopup, setEditNotificationTypeResult, setDeleteNotificationTypePopup, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetState", function() { return resetState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setNotificationTypeGridParams", function() { return setNotificationTypeGridParams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setNotificationTypeGridData", function() { return setNotificationTypeGridData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSettings", function() { return setSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setCreateNotificationTypePopup", function() { return setCreateNotificationTypePopup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setCreateNotificationTypeResult", function() { return setCreateNotificationTypeResult; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setEditNotificationTypePopup", function() { return setEditNotificationTypePopup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setEditNotificationTypeResult", function() { return setEditNotificationTypeResult; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setDeleteNotificationTypePopup", function() { return setDeleteNotificationTypePopup; });
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @reduxjs/toolkit */ "./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");

const initialState = {
  notificationTypeGridParams: {
    pageIndex: 1,
    pageSize: 100
  },
  createNotificationTypePopup: {
    show: false
  },
  createNotificationTypeResult: null,
  editNotificationTypePopup: {
    show: false
  },
  editNotificationTypeResult: null,
  deleteNotificationTypePopup: {
    show: false
  },
  notificationTypeGridData: null,
  settings: {
    ChatTypes: [],
    RecipientTypes: [],
    Systems: []
  }
};
const notificationTypeSlice = Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__["createSlice"])({
  name: 'notificationType',
  initialState: initialState,
  reducers: {
    resetState: () => initialState,
    setNotificationTypeGridParams: (state, action) => {
      state.notificationTypeGridParams = action.payload;
    },
    setNotificationTypeGridData: (state, action) => {
      state.notificationTypeGridData = action.payload;
    },
    setSettings: (state, action) => {
      state.settings = action.payload;
    },
    setCreateNotificationTypePopup: (state, action) => {
      state.createNotificationTypePopup = action.payload;
    },
    setCreateNotificationTypeResult: (state, action) => {
      state.createNotificationTypeResult = action.payload;
    },
    setEditNotificationTypePopup: (state, action) => {
      state.editNotificationTypePopup = action.payload;
    },
    setEditNotificationTypeResult: (state, action) => {
      state.editNotificationTypeResult = action.payload;
    },
    setDeleteNotificationTypePopup: (state, action) => {
      state.deleteNotificationTypePopup = action.payload;
    }
  }
});
const {
  actions,
  reducer
} = notificationTypeSlice;
const {
  resetState,
  setNotificationTypeGridParams,
  setNotificationTypeGridData,
  setSettings,
  setCreateNotificationTypePopup,
  setCreateNotificationTypeResult,
  setEditNotificationTypePopup,
  setEditNotificationTypeResult,
  setDeleteNotificationTypePopup
} = actions;
/* harmony default export */ __webpack_exports__["default"] = (reducer);

/***/ })

}]);
//# sourceMappingURL=3.chunk.js.map