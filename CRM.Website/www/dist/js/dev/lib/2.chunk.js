(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ "./www/sources/css/pages/notification-list/index.scss":
/*!************************************************************!*\
  !*** ./www/sources/css/pages/notification-list/index.scss ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./www/sources/js/pages/notification-list/actions/dataHandlerActions.js":
/*!******************************************************************************!*\
  !*** ./www/sources/js/pages/notification-list/actions/dataHandlerActions.js ***!
  \******************************************************************************/
/*! exports provided: setGridParams, setGridData, getGridData, setContentPopup, setViewDetailPopup, setResendOptions, setInvalidParams, setSettings, getSettings, setViewDetail, editNotificationList, validateResend, setValidateResend, setConfirmPopup, getHeadlineOptions, getRecipientOptions, setHeadlineOptions, setRecipientOptions, setAutoRefresh, setIsRefresh, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setGridParams", function() { return setGridParams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setGridData", function() { return setGridData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getGridData", function() { return getGridData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setContentPopup", function() { return setContentPopup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setViewDetailPopup", function() { return setViewDetailPopup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setResendOptions", function() { return setResendOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setInvalidParams", function() { return setInvalidParams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSettings", function() { return setSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSettings", function() { return getSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setViewDetail", function() { return setViewDetail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "editNotificationList", function() { return editNotificationList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateResend", function() { return validateResend; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setValidateResend", function() { return setValidateResend; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setConfirmPopup", function() { return setConfirmPopup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getHeadlineOptions", function() { return getHeadlineOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRecipientOptions", function() { return getRecipientOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setHeadlineOptions", function() { return setHeadlineOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setRecipientOptions", function() { return setRecipientOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setAutoRefresh", function() { return setAutoRefresh; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setIsRefresh", function() { return setIsRefresh; });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./www/sources/js/pages/notification-list/actions/types.js");
/* harmony import */ var _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/common/site */ "./www/sources/js/common/site.js");
/* harmony import */ var _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/common/dataService */ "./www/sources/js/common/dataService.js");


 // Grid

const setGridParams = data => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["default"].GRID_PARAMS,
    data
  };
};
const setGridData = data => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["default"].GRID_DATA,
    data
  };
};
const getGridData = (params, callback) => async dispatch => {
  _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].blockUI();

  if (params.messageId !== '' || params.notificationIdLower !== '') {
    params.fromDate = null;
    params.toDate = null;
  }

  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('NotificationList/GetGridData');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_2__["default"].postDataAsync(url, params).then(response => {
    if (!response) {
      return;
    }

    if (typeof callback === 'function') {
      if (response.data || response.data.data) {
        callback(response.data.data);
      }
    }

    dispatch(setGridData(response.data));
  }).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].unblockUI());
};
const setContentPopup = data => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["default"].CONTENT_POPUP_DATA,
    data
  };
};
const setViewDetailPopup = data => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["default"].VIEW_DETAIL_POPUP_DATA,
    data
  };
};
const setResendOptions = data => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["default"].RESEND_OPTIONS_DATA,
    data
  };
};
const setInvalidParams = data => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["default"].INVALID_PARAMS_DATA,
    data
  };
};
const setSettings = data => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["default"].SETTINGS_DATA,
    data
  };
};
const getSettings = () => async dispatch => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('NotificationList/GetSettings');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_2__["default"].getDataAsync(url).then(response => {
    dispatch(setSettings(response.data));
  }).catch(_jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].handleAxiosError);
};
const setViewDetail = data => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["default"].VIEW_DETAIL_DATA,
    data
  };
};
const editNotificationList = params => async dispatch => {
  _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].blockUI();
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('NotificationList/EditNotificationList');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_2__["default"].postDataAsync(url, params).then(response => {
    dispatch(setViewDetail(response.data));
  }).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].unblockUI());
};
const validateResend = params => async dispatch => {
  _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].blockUI();
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('NotificationList/ValidateNotificationList');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_2__["default"].postDataAsync(url, params).then(response => {
    dispatch(setValidateResend({
      show: true,
      result: response.data
    }));
  }).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].unblockUI());
};
const setValidateResend = data => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["default"].VALIDATE_RESEND_DATA,
    data
  };
};
const setConfirmPopup = data => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["default"].CONFIRM_POPUP_DATA,
    data
  };
};
const getHeadlineOptions = searchText => async dispatch => {
  const params = {
    username: searchText,
    limit: 10,
    excludeNotAssignedGroup: true
  };
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('Common/GetHeadlines');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_2__["default"].postDataAsync(url, params).then(response => {
    const options = response.data.map(item => {
      return {
        value: item.name,
        label: item.name
      };
    });
    dispatch(setHeadlineOptions(options));
  });
};
const getRecipientOptions = searchText => async dispatch => {
  const params = {
    recipientName: searchText,
    limit: 10
  };
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('Common/GetRecipients');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_2__["default"].postDataAsync(url, params).then(response => {
    const options = response.data.map(item => {
      return {
        value: item.name,
        label: item.name
      };
    });
    dispatch(setRecipientOptions(options));
  });
};
const setHeadlineOptions = data => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["default"].HEADLINE_OPTIONS_DATA,
    data
  };
};
const setRecipientOptions = data => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["default"].RECIPIENT_OPTIONS_DATA,
    data
  };
};
const setAutoRefresh = data => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["default"].AUTO_REFRESH_DATA,
    data
  };
};
const setIsRefresh = data => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["default"].IS_REFRESH_DATA,
    data
  };
};
const actions = {
  setGridParams,
  setGridData,
  getGridData,
  setContentPopup,
  setResendOptions,
  setViewDetailPopup,
  setInvalidParams,
  setSettings,
  getSettings,
  editNotificationList,
  setViewDetail,
  validateResend,
  setValidateResend,
  setConfirmPopup,
  getHeadlineOptions,
  setHeadlineOptions,
  getRecipientOptions,
  setRecipientOptions,
  setAutoRefresh,
  setIsRefresh
};
/* harmony default export */ __webpack_exports__["default"] = (actions);

/***/ }),

/***/ "./www/sources/js/pages/notification-list/actions/index.js":
/*!*****************************************************************!*\
  !*** ./www/sources/js/pages/notification-list/actions/index.js ***!
  \*****************************************************************/
/*! exports provided: ActionCreators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionCreators", function() { return ActionCreators; });
/* harmony import */ var _dataHandlerActions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dataHandlerActions */ "./www/sources/js/pages/notification-list/actions/dataHandlerActions.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


const ActionCreators = _objectSpread({}, _dataHandlerActions__WEBPACK_IMPORTED_MODULE_0__["default"]);

/***/ }),

/***/ "./www/sources/js/pages/notification-list/actions/types.js":
/*!*****************************************************************!*\
  !*** ./www/sources/js/pages/notification-list/actions/types.js ***!
  \*****************************************************************/
/*! exports provided: NOTIFICATIONTYPE_DATA, GRID_PARAMS, GRID_DATA, CONTENT_POPUP_DATA, RESEND_OPTIONS_DATA, VIEW_DETAIL_POPUP_DATA, INVALID_PARAMS_DATA, SETTINGS_DATA, VIEW_DETAIL_DATA, MESSAGE_RESULT_DATA, VALIDATE_RESEND_DATA, CONFIRM_POPUP_DATA, HEADLINE_OPTIONS_DATA, RECIPIENT_OPTIONS_DATA, AUTO_REFRESH_DATA, IS_REFRESH_DATA, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NOTIFICATIONTYPE_DATA", function() { return NOTIFICATIONTYPE_DATA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GRID_PARAMS", function() { return GRID_PARAMS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GRID_DATA", function() { return GRID_DATA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CONTENT_POPUP_DATA", function() { return CONTENT_POPUP_DATA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RESEND_OPTIONS_DATA", function() { return RESEND_OPTIONS_DATA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VIEW_DETAIL_POPUP_DATA", function() { return VIEW_DETAIL_POPUP_DATA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "INVALID_PARAMS_DATA", function() { return INVALID_PARAMS_DATA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SETTINGS_DATA", function() { return SETTINGS_DATA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VIEW_DETAIL_DATA", function() { return VIEW_DETAIL_DATA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MESSAGE_RESULT_DATA", function() { return MESSAGE_RESULT_DATA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VALIDATE_RESEND_DATA", function() { return VALIDATE_RESEND_DATA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CONFIRM_POPUP_DATA", function() { return CONFIRM_POPUP_DATA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HEADLINE_OPTIONS_DATA", function() { return HEADLINE_OPTIONS_DATA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RECIPIENT_OPTIONS_DATA", function() { return RECIPIENT_OPTIONS_DATA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AUTO_REFRESH_DATA", function() { return AUTO_REFRESH_DATA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IS_REFRESH_DATA", function() { return IS_REFRESH_DATA; });
const NOTIFICATIONTYPE_DATA = 'NOTIFICATIONTYPE_DATA';
const GRID_PARAMS = 'GRID_PARAMS';
const GRID_DATA = 'GRID_DATA';
const CONTENT_POPUP_DATA = 'CONTENT_POPUP_DATA';
const RESEND_OPTIONS_DATA = 'RESEND_OPTIONS_DATA';
const VIEW_DETAIL_POPUP_DATA = 'VIEW_DETAIL_POPUP_DATA';
const INVALID_PARAMS_DATA = 'INVALID_PARAMS_DATA';
const SETTINGS_DATA = 'SETTINGS_DATA';
const VIEW_DETAIL_DATA = 'VIEW_DETAIL_DATA';
const MESSAGE_RESULT_DATA = 'MESSAGE_RESULT_DATA';
const VALIDATE_RESEND_DATA = 'VALIDATE_RESEND_DATA';
const CONFIRM_POPUP_DATA = 'CONFIRM_POPUP_DATA';
const HEADLINE_OPTIONS_DATA = 'HEADLINE_OPTIONS_DATA';
const RECIPIENT_OPTIONS_DATA = 'RECIPIENT_OPTIONS_DATA';
const AUTO_REFRESH_DATA = 'AUTO_REFRESH_DATA';
const IS_REFRESH_DATA = 'IS_REFRESH_DATA';
const types = {
  NOTIFICATIONTYPE_DATA,
  GRID_PARAMS,
  GRID_DATA,
  CONTENT_POPUP_DATA,
  RESEND_OPTIONS_DATA,
  VIEW_DETAIL_POPUP_DATA,
  INVALID_PARAMS_DATA,
  SETTINGS_DATA,
  VIEW_DETAIL_DATA,
  MESSAGE_RESULT_DATA,
  VALIDATE_RESEND_DATA,
  CONFIRM_POPUP_DATA,
  HEADLINE_OPTIONS_DATA,
  RECIPIENT_OPTIONS_DATA,
  AUTO_REFRESH_DATA,
  IS_REFRESH_DATA
};
/* harmony default export */ __webpack_exports__["default"] = (types);

/***/ }),

/***/ "./www/sources/js/pages/notification-list/components/AppContainer.jsx":
/*!****************************************************************************!*\
  !*** ./www/sources/js/pages/notification-list/components/AppContainer.jsx ***!
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
/* harmony import */ var _actions_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions/index */ "./www/sources/js/pages/notification-list/actions/index.js");
/* harmony import */ var _Filter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Filter */ "./www/sources/js/pages/notification-list/components/Filter.jsx");
/* harmony import */ var _DataGrid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DataGrid */ "./www/sources/js/pages/notification-list/components/DataGrid.jsx");
/* harmony import */ var _Content__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Content */ "./www/sources/js/pages/notification-list/components/Content.jsx");
/* harmony import */ var _ViewDetail__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ViewDetail */ "./www/sources/js/pages/notification-list/components/ViewDetail.jsx");
/* harmony import */ var _ValidateResend__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ValidateResend */ "./www/sources/js/pages/notification-list/components/ValidateResend.jsx");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var _jsroot_components_ConfirmPopup__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @jsroot/components/ConfirmPopup */ "./www/sources/js/components/ConfirmPopup.jsx");
/* harmony import */ var _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @jsroot/common/constants */ "./www/sources/js/common/constants.js");
/* harmony import */ var _jsroot_common_shareScripts__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @jsroot/common/shareScripts */ "./www/sources/js/common/shareScripts.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }














class AppContainer extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "closeConfirmPopup", () => this.props.setConfirmPopup({
      show: false
    }));

    _defineProperty(this, "handleCloseContent", () => {
      this.props.setContentPopup({
        show: false
      });
      this.props.setIsRefresh(true);
    });

    _defineProperty(this, "handleCloseViewDetail", () => {
      this.props.setViewDetailPopup({
        show: false
      });
      this.props.setIsRefresh(true);
    });

    this.state = {
      policy: null
    };
  }

  componentDidMount() {
    Object(_jsroot_common_shareScripts__WEBPACK_IMPORTED_MODULE_12__["getPermission"])(_jsroot_common_constants__WEBPACK_IMPORTED_MODULE_11__["FunctionKey"].NotificationList).then(response => {
      this.setState({
        policy: response
      });
    });
  }

  componentWillUnmount() {
    this.props.setGridData(null);
    this.props.setSettings(null);
  }

  render() {
    if (!this.state.policy) {
      return null;
    }

    const isHost = this.state.policy === _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_11__["Policy"].Host;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Filter__WEBPACK_IMPORTED_MODULE_4__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DataGrid__WEBPACK_IMPORTED_MODULE_5__["default"], {
      isHost: isHost
    }), this.props.contentPopup.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Content__WEBPACK_IMPORTED_MODULE_6__["default"], {
      onClose: () => this.handleCloseContent(),
      data: this.props.contentPopup.data
    }), this.props.viewDetailPopup.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ViewDetail__WEBPACK_IMPORTED_MODULE_7__["default"], {
      onClose: () => this.handleCloseViewDetail(),
      data: this.props.viewDetailPopup.data
    }), this.props.validateResendResult.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ValidateResend__WEBPACK_IMPORTED_MODULE_8__["default"], null), this.props.confirmPopup.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_ConfirmPopup__WEBPACK_IMPORTED_MODULE_10__["default"], {
      size: "lg",
      title: _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('Confirmation'),
      content: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('ThereAreSomeChangesConfirmMessage')),
      onSubmit: () => {
        this.closeConfirmPopup();
        this.props.confirmPopup.onOk();
      },
      onClose: () => this.closeConfirmPopup()
    }));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions_index__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    contentPopup,
    viewDetailPopup,
    validateResendResult,
    confirmPopup,
    autoRefresh
  } = state;
  return {
    contentPopup,
    viewDetailPopup,
    validateResendResult,
    confirmPopup,
    autoRefresh
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(AppContainer));

/***/ }),

/***/ "./www/sources/js/pages/notification-list/components/AutoRefresh.jsx":
/*!***************************************************************************!*\
  !*** ./www/sources/js/pages/notification-list/components/AutoRefresh.jsx ***!
  \***************************************************************************/
/*! exports provided: AutoRefresh, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AutoRefresh", function() { return AutoRefresh; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions/index */ "./www/sources/js/pages/notification-list/actions/index.js");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../functions */ "./www/sources/js/pages/notification-list/functions.js");
/* harmony import */ var _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/common/constants */ "./www/sources/js/common/constants.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








class AutoRefresh extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "componentDidMount", () => {
      this.countDownFunc();
      document.addEventListener('mousedown', this.handleClickOutside);
    });

    _defineProperty(this, "componentDidUpdate", prevProps => {
      if (prevProps.autoRefresh.value !== this.props.autoRefresh.value) {
        this.props.setAutoRefresh(_objectSpread(_objectSpread({}, this.props.autoRefresh), {}, {
          countDown: this.props.autoRefresh.value
        }));
      }

      if (this.props.autoRefresh.countDown === 0 && this.props.isRefresh && this.props.autoRefresh.value > 0) {
        this.props.setAutoRefresh(_objectSpread(_objectSpread({}, this.props.autoRefresh), {}, {
          countDown: this.props.autoRefresh.value
        }));

        const params = _objectSpread(_objectSpread({}, this.props.gridParams), {}, {
          pageIndex: 1
        });

        this.props.setGridParams(params);
        this.props.getGridData(params, data => _functions__WEBPACK_IMPORTED_MODULE_5__["default"].handleNewResendOptions(data, this.props.setResendOptions));
      }
    });

    _defineProperty(this, "componentWillUnmount", () => {
      clearInterval(this.countDownFunc);
      document.removeEventListener('mousedown', this.handleClickOutside);
    });

    _defineProperty(this, "handleClickOutside", event => {
      if (this.autoRefresh && !this.autoRefresh.current.contains(event.target) && this.state.isOpenDropdown) {
        this.setState({
          isOpenDropdown: false
        });
      }
    });

    _defineProperty(this, "countDownFunc", () => setInterval(() => {
      if (this.props.isRefresh) {
        this.props.setAutoRefresh(_objectSpread(_objectSpread({}, this.props.autoRefresh), {}, {
          countDown: this.props.autoRefresh.countDown - 1
        }));
      }
    }, 1000));

    _defineProperty(this, "handleAutoRefreshChange", value => {
      this.setState({
        isOpenDropdown: false
      });
      this.props.setIsRefresh(value !== 0);
      this.props.setAutoRefresh(_objectSpread(_objectSpread({}, this.props.autoRefresh), {}, {
        value: value
      }));
    });

    _defineProperty(this, "handleRefresh", () => {
      const params = _objectSpread(_objectSpread({}, this.props.gridParams), {}, {
        pageIndex: 1
      });

      this.props.setGridParams(params);
      this.props.getGridData(params, data => _functions__WEBPACK_IMPORTED_MODULE_5__["default"].handleNewResendOptions(data, this.props.setResendOptions));
      this.props.setAutoRefresh(_objectSpread(_objectSpread({}, this.props.autoRefresh), {}, {
        countDown: this.props.autoRefresh.value
      }));
    });

    _defineProperty(this, "toggleAutoFreshDropdown", () => this.setState({
      isOpenDropdown: !this.state.isOpenDropdown
    }));

    this.state = {
      isOpenDropdown: false
    };
    this.autoRefresh = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
  }

  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "d-flex align-items-center",
      ref: this.autoRefresh
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "auto-refresh"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "d-flex justify-content-between align-items-center auto-refresh-value",
      onClick: () => this.toggleAutoFreshDropdown()
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, this.props.autoRefresh.value !== 0 ? this.props.autoRefresh.countDown : _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].getResource('NotRefresh')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: `fa fa-caret-${this.state.isOpenDropdown ? 'up' : 'down'}`
    })), this.state.isOpenDropdown && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
      className: "auto-refresh-dropdown"
    }, _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_6__["AUTO_REFRESH_TIMES"].map(time => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      key: time,
      value: time,
      onClick: () => this.handleAutoRefreshChange(time)
    }, time)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      onClick: () => this.handleAutoRefreshChange(0),
      value: 0
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].getResource('NotRefresh')))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "fa fa-refresh link-click",
      onClick: () => this.handleRefresh()
    }));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions_index__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    gridParams,
    autoRefresh,
    isRefresh
  } = state;
  return {
    gridParams,
    autoRefresh,
    isRefresh
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(AutoRefresh));

/***/ }),

/***/ "./www/sources/js/pages/notification-list/components/Content.jsx":
/*!***********************************************************************!*\
  !*** ./www/sources/js/pages/notification-list/components/Content.jsx ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Content; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var _jsroot_components_DraggableModalDialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/components/DraggableModalDialog */ "./www/sources/js/components/DraggableModalDialog.jsx");




class Content extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      data,
      onClose
    } = this.props;
    const LogIdDisplay = `(${_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getResource('LogID')}: ${data.referenceId})`;
    const messageIdDisplay = `(${_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getResource('MessageID')}: ${data.referenceId})`;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"], {
      show: true,
      backdrop: "static",
      keyboard: false,
      size: "lg",
      centered: true,
      onHide: onClose,
      dialogAs: _jsroot_components_DraggableModalDialog__WEBPACK_IMPORTED_MODULE_3__["default"]
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Header, {
      closeButton: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Title, {
      as: "div"
    }, `${_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getResource('NotificationID')}: ${data.notificationId} `, data.dataSource === 'MessageId' ? messageIdDisplay : data.referenceId > 0 && LogIdDisplay)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Body, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, `${_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getResource('LetstalkName')}: ${data.letstalkName}`), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "border p-2 mt-2 mb-3 notification-content"
    }, data.content)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Footer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
      onClick: onClose,
      variant: "primary",
      size: "sm"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getResource('Close'))));
  }

}

/***/ }),

/***/ "./www/sources/js/pages/notification-list/components/DataGrid.jsx":
/*!************************************************************************!*\
  !*** ./www/sources/js/pages/notification-list/components/DataGrid.jsx ***!
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
/* harmony import */ var _actions_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions/index */ "./www/sources/js/pages/notification-list/actions/index.js");
/* harmony import */ var _jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/components/react-grid/index */ "./www/sources/js/components/react-grid/index.jsx");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../functions */ "./www/sources/js/pages/notification-list/functions.js");
/* harmony import */ var _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jsroot/common/constants */ "./www/sources/js/common/constants.js");
/* harmony import */ var _AutoRefresh__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./AutoRefresh */ "./www/sources/js/pages/notification-list/components/AutoRefresh.jsx");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }











class DataGrid extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "onPaging", (pageIndex, pageSize) => {
      const params = _objectSpread({}, this.props.gridParams);

      params.pageIndex = pageIndex;
      params.pageSize = pageSize;
      this.getGridData(params);
    });

    _defineProperty(this, "getGridData", params => {
      this.props.setGridParams(params);
      this.props.getGridData(_objectSpread({}, params), data => _functions__WEBPACK_IMPORTED_MODULE_7__["default"].handleNewResendOptions(data, this.props.setResendOptions));
    });

    _defineProperty(this, "buildNotificationListHeader", isHost => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderRow"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
      colWidth: 5
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('SymbolNo')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
      colWidth: 15
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('NotificationID')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('ReferenceId'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
      colWidth: 23
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Sender'), "/", _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('NotificationType')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
      colWidth: 12
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('SendDateTimeGMTA8')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
      colWidth: 16
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('LetstalkName')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
      colWidth: 26
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('GroupHeadline')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
      colWidth: 19
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Recipient')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
      colWidth: 20
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Title'), "/", _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Content')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
      colWidth: 12
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Status')), isHost && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
      colWidth: 10
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Action')), isHost && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
      colWidth: 10
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      type: "button",
      value: _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Resend'),
      disabled: this.props.resendOptions.isDisabledResend,
      onClick: this.resendNotificationAll
    }), this.props.resendOptions.isHaveResendAll && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Form"].Control, {
      className: "checkbox-cell-style margin-top-10",
      type: "checkbox",
      onChange: this.handleChangeResendAllCheckbox,
      checked: this.props.resendOptions.isCheckedAll
    }))));

    _defineProperty(this, "buildNotificationListBody", isHost => {
      const {
        pageIndex,
        pageSize
      } = this.props.gridParams;
      this.startIndex = (pageIndex - 1) * pageSize + 1;

      if (this.props.notificationListGridData.data.length > 0) {
        return this.props.notificationListGridData.data.map((item, index) => this.renderRow(item, index, isHost));
      }

      return [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Row"], {
        key: `body${1}`,
        className: "no-data"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        colSpan: isHost ? 11 : 9
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('ThereIsNoData')))];
    });

    _defineProperty(this, "openContentPopup", item => {
      this.props.setContentPopup({
        show: true,
        data: item
      });
      this.setIsRefresh(false);
    });

    _defineProperty(this, "openViewDetailPopup", item => {
      this.props.setViewDetailPopup({
        show: true,
        data: item
      });
      this.setIsRefresh(false);
    });

    _defineProperty(this, "setIsRefresh", isRefresh => {
      this.setNotShouldResetScrollPosition();
      this.props.setIsRefresh(isRefresh);
    });

    _defineProperty(this, "setNotShouldResetScrollPosition", () => this.props.setResendOptions(_objectSpread(_objectSpread({}, this.props.resendOptions), {}, {
      shouldResetScrollPosition: false
    })));

    _defineProperty(this, "isError", status => status.toLowerCase() === _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Error').toLowerCase());

    _defineProperty(this, "isResolved", status => status.toLowerCase() === _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Resolved').toLowerCase());

    _defineProperty(this, "isDuplicated", status => status.toLowerCase() === _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Duplicated').toLowerCase());

    _defineProperty(this, "validateResend", notificationId => {
      this.setIsRefresh(false);
      this.props.validateResend({
        notificationIds: notificationId,
        isSingle: true
      });
    });

    _defineProperty(this, "renderRow", (item, index, isHost) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Row"], {
      key: index
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
      className: "text-center"
    }, index + this.startIndex), this.renderReferenceId(item), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, item.sender), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, item.notificationTypeName)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
      className: "text-center"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, item.sendDateString), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, item.sendTimeString)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], null, item.letstalkName), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
      className: "text-center"
    }, _functions__WEBPACK_IMPORTED_MODULE_7__["default"].getHeadlines(item.headlines)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], null, _functions__WEBPACK_IMPORTED_MODULE_7__["default"].getRecipients(item.recipients)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
      className: "link-click",
      onClick: () => this.openContentPopup(item)
    }, item.title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
      className: `text-center status-font ${item.status.toLowerCase()}-color`
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource(item.status)), isHost && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
      className: "text-center"
    }, (this.isError(item.status) || this.isResolved(item.status)) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      onClick: () => this.openViewDetailPopup(item),
      className: "action-style link-click"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('ViewDetail')), this.isError(item.status) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      onClick: () => this.validateResend(item.notificationId),
      className: "action-style link-click"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Resend'))), isHost && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
      className: "text-center"
    }, this.isError(item.status) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Form"].Control, {
      className: "checkbox-cell-style",
      id: `resend-${item.notificationId}-${item.messageId}`,
      type: "checkbox",
      checked: this.props.resendOptions.dataList[index] && this.props.resendOptions.dataList[index].isResent,
      onChange: () => this.handleChangeResendCheckbox(index)
    }))));

    _defineProperty(this, "renderReferenceId", item => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: "text-center"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, item.notificationId), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, item.dataSource === 'MessageId' ? `(Msg: ${item.referenceId})` : item.referenceId > 0 && `(Log: ${item.referenceId})`), this.isDuplicated(item.status) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, `(Related ID: ${item.relatedNotificationIds})`));
    });

    _defineProperty(this, "handleChangeResendCheckbox", index => {
      const dataList = [...this.props.resendOptions.dataList];
      dataList[index].isResent = !this.props.resendOptions.dataList[index].isResent;
      const isDisabledResend = dataList.filter(item => this.isError(item.status) && item.isResent).length <= 0;
      const notCheckedDataList = dataList.filter(item => this.isError(item.status) && !item.isResent);
      this.setIsRefresh(isDisabledResend);
      this.props.setResendOptions({
        isCheckedAll: notCheckedDataList.length <= 0,
        isDisabledResend,
        isHaveResendAll: this.props.resendOptions.isHaveResendAll,
        shouldResetScrollPosition: false,
        dataList
      });
    });

    _defineProperty(this, "handleChangeResendAllCheckbox", () => {
      const checked = !this.props.resendOptions.isCheckedAll;
      const dataList = [...this.props.resendOptions.dataList];
      dataList.forEach(item => item.isResent = checked);
      this.setIsRefresh(!checked);
      this.props.setResendOptions({
        isCheckedAll: checked,
        isDisabledResend: !checked,
        isHaveResendAll: this.props.resendOptions.isHaveResendAll,
        shouldResetScrollPosition: false,
        dataList
      });
    });

    _defineProperty(this, "resendNotificationAll", () => {
      const resendList = this.props.resendOptions.dataList.filter(item => this.isError(item.status) && item.isResent);
      this.props.validateResend({
        notificationIds: resendList.map(item => item.notificationId).join(','),
        isSingle: false
      });
    });
  }

  render() {
    if (!this.props.notificationListGridData || !this.props.notificationListGridData.data) {
      return null;
    }

    const {
      totalItems
    } = this.props.notificationListGridData;
    const {
      pageIndex,
      pageSize
    } = this.props.gridParams;
    const {
      isHost
    } = this.props;
    const pagingOption = {
      PageIndex: pageIndex,
      PageSize: pageSize,
      TotalItem: totalItems,
      PageList: _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_8__["PAGING_SIZES"]
    };
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "d-flex table-title justify-content-between align-items-center"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('NotificationList')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_AutoRefresh__WEBPACK_IMPORTED_MODULE_9__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Table"], {
      minWidth: 960,
      maxWidth: document.getElementById('right-row-container').clientWidth,
      autoWidth: true,
      header: this.buildNotificationListHeader(isHost),
      body: this.buildNotificationListBody(isHost),
      isPaging: true,
      pageOption: pagingOption,
      onPaging: this.onPaging,
      shouldResetScrollPosition: this.props.resendOptions.shouldResetScrollPosition
    }));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions_index__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    gridParams,
    notificationListGridData,
    resendOptions,
    isRefresh
  } = state;
  return {
    gridParams,
    notificationListGridData,
    resendOptions,
    isRefresh
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(DataGrid));

/***/ }),

/***/ "./www/sources/js/pages/notification-list/components/Filter.jsx":
/*!**********************************************************************!*\
  !*** ./www/sources/js/pages/notification-list/components/Filter.jsx ***!
  \**********************************************************************/
/*! exports provided: Filter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Filter", function() { return Filter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var _actions_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../actions/index */ "./www/sources/js/pages/notification-list/actions/index.js");
/* harmony import */ var _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/common/dateTimeService */ "./www/sources/js/common/dateTimeService.js");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var _jsroot_components_date_picker_index__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/components/date-picker/index */ "./www/sources/js/components/date-picker/index.jsx");
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../functions */ "./www/sources/js/pages/notification-list/functions.js");
/* harmony import */ var _jsroot_components_CustomReactSelect__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @jsroot/components/CustomReactSelect */ "./www/sources/js/components/CustomReactSelect.jsx");
/* harmony import */ var _jsroot_components_multiple_select_index__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @jsroot/components/multiple-select/index */ "./www/sources/js/components/multiple-select/index.jsx");
/* harmony import */ var _jsroot_common_site__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @jsroot/common/site */ "./www/sources/js/common/site.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/lib/index.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(react_toastify__WEBPACK_IMPORTED_MODULE_12__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }














class Filter extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleFilterChange", (name, value) => this.setState(prevState => ({
      filter: _objectSpread(_objectSpread({}, prevState.filter), {}, {
        [name]: value
      })
    })));

    _defineProperty(this, "handleFilterChangeProps", (name, value) => {
      this.setNotShouldResetScrollPosition();
      this.props.setGridParams(_objectSpread(_objectSpread({}, this.props.gridParams), {}, {
        [name]: value
      }));
    });

    _defineProperty(this, "handleNotificationTypeChange", (currentItem, selectedItemsKey) => {
      this.handleFilterChange('notificationTypes', selectedItemsKey);
      this.handleFilterChangeProps('notificationTypeIds', selectedItemsKey);
    });

    _defineProperty(this, "handleFromDateChange", value => {
      let maxToDate = new Date(value);
      maxToDate.setMonth(maxToDate.getMonth() + 1);
      this.setState({
        minToDate: value
      });
      this.handleFilterChange('fromDate', value);
      this.handleFilterChangeProps('fromDate', _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_5__["default"].startOfDay(value));

      if (maxToDate - this.state.maxDate > 0) {
        maxToDate = this.state.maxDate;
      }

      if (this.state.filter.toDate - maxToDate > 0) {
        this.handleToDateChange(maxToDate);
      } else if (this.state.filter.toDate - value < 0) {
        this.handleToDateChange(value);
      }

      this.setState({
        maxToDate
      });
    });

    _defineProperty(this, "handleToDateChange", value => {
      this.handleFilterChange('toDate', value);
      this.handleFilterChangeProps('toDate', _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_5__["default"].startOfDay(value));
    });

    _defineProperty(this, "handleHeadlineChange", value => {
      this.handleFilterChange('headline', value);
      this.handleFilterChangeProps('headline', value ? value.value : '');
    });

    _defineProperty(this, "handleRecipientChange", value => {
      this.handleFilterChange('recipient', value);
      this.handleFilterChangeProps('recipientName', value ? value.value : '');
    });

    _defineProperty(this, "handleStatusChange", (currentItem, selectedItemsKey) => {
      this.handleFilterChange('statuses', selectedItemsKey);
      this.handleFilterChangeProps('status', selectedItemsKey);
    });

    _defineProperty(this, "handleChangeFilterControl", e => {
      if (e.target.validity.valid) {
        this.handleFilterChange(e.target.name, e.target.value);
        this.handleFilterChangeProps(e.target.name, e.target.value);
      }
    });

    _defineProperty(this, "handleChange", e => {
      this.handleFilterChange(e.target.name, e.target.value);
      this.handleFilterChangeProps(e.target.name, e.target.value);
    });

    _defineProperty(this, "getParams", () => {
      return {
        notificationTypeIds: this.state.filter.notificationTypes,
        fromDate: _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_5__["default"].toLongDateTimeFormat(_jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_5__["default"].startOfDay(this.state.filter.fromDate)),
        toDate: _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_5__["default"].toLongDateTimeFormat(_jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_5__["default"].endOfDay(this.state.filter.toDate)),
        headline: this.state.filter.headline ? this.state.filter.headline.value : '',
        recipientName: this.state.filter.recipient ? this.state.filter.recipient.value : '',
        messageId: this.state.filter.messageId,
        notificationIdLower: this.state.filter.notificationIdLower,
        notificationIdUpper: this.state.filter.notificationIdUpper,
        content: this.state.filter.content,
        status: this.state.filter.statuses,
        pageIndex: this.props.gridParams.pageIndex,
        pageSize: this.props.gridParams.pageSize
      };
    });

    _defineProperty(this, "setNotShouldResetScrollPosition", () => this.props.setResendOptions(_objectSpread({
      shouldResetScrollPosition: false
    }, this.props.resendOptions)));

    _defineProperty(this, "submitHandler", e => {
      e.preventDefault();
      this.props.setInvalidParams({});
      const params = this.getParams();
      params.pageIndex = 1;

      if (this.isValidateParams(params)) {
        this.props.setGridParams(params);
        this.props.getGridData(_objectSpread({}, params), data => Object(_functions__WEBPACK_IMPORTED_MODULE_8__["handleNewResendOptions"])(data, this.props.setResendOptions));
        this.props.setAutoRefresh(_objectSpread(_objectSpread({}, this.props.autoRefresh), {}, {
          isSubmit: true,
          countDown: this.props.autoRefresh.value
        }));
      }
    });

    _defineProperty(this, "isDisabledDateParam", () => this.state.filter.messageId !== '' || this.state.filter.notificationIdLower !== '' || this.state.filter.notificationIdUpper !== '');

    _defineProperty(this, "isValidateParams", params => {
      if (params.notificationTypeIds === '') {
        react_toastify__WEBPACK_IMPORTED_MODULE_12__["toast"].error(`${_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('PleaseChoose')} a ${_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('NotificationType')}`);
        return false;
      }

      if (params.notificationIdLower !== '' && params.notificationIdUpper === '') {
        this.props.setInvalidParams({
          isInvalidNotificationIdUpper: true
        });
        react_toastify__WEBPACK_IMPORTED_MODULE_12__["toast"].error(`${_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('NotificationIDMustHaveBoth')}`);
        return false;
      }

      if (params.notificationIdUpper !== '' && params.notificationIdLower === '') {
        this.props.setInvalidParams({
          isInvalidNotificationIdLower: true
        });
        react_toastify__WEBPACK_IMPORTED_MODULE_12__["toast"].error(`${_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('NotificationIDMustHaveBoth')}`);
        return false;
      }

      if (parseInt(params.notificationIdLower, 10) > parseInt(params.notificationIdUpper, 10)) {
        react_toastify__WEBPACK_IMPORTED_MODULE_12__["toast"].error(`${_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('NotificationIDFromNotGreaterThanTo')}`);
        return false;
      }

      if (params.status === '') {
        react_toastify__WEBPACK_IMPORTED_MODULE_12__["toast"].error(`${_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('PleaseChoose')} a ${_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Status')}`);
        return false;
      }

      return true;
    });

    _defineProperty(this, "debounceHandleHeadlineInputChange", _jsroot_common_site__WEBPACK_IMPORTED_MODULE_11__["default"].debounce(searchText => {
      if (searchText.length >= 2) {
        this.props.getHeadlineOptions(searchText);
      } else {
        this.props.setHeadlineOptions([]);
      }
    }));

    _defineProperty(this, "debounceHandleRecipientInputChange", _jsroot_common_site__WEBPACK_IMPORTED_MODULE_11__["default"].debounce(searchText => {
      if (searchText.length >= 2) {
        this.props.getRecipientOptions(searchText);
      } else {
        this.props.setRecipientOptions([]);
      }
    }));

    const now = new Date(_jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_5__["default"].toShortDateFormat(_jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_5__["default"].toClientDateTime(new Date())));
    this.state = {
      filter: {
        notificationTypes: '',
        statuses: '',
        fromDate: now,
        toDate: now,
        headline: null,
        recipient: null,
        notificationIdLower: '',
        notificationIdUpper: '',
        messageId: '',
        content: ''
      },
      maxDate: now,
      minToDate: now,
      maxToDate: now,
      notificationTypeOptions: [],
      statusOptions: []
    };
  }

  componentDidMount() {
    this.props.getSettings().then(() => {
      // notification type
      const notificationTypeIds = [];
      const notificationTypeOptions = this.props.settings.notificationTypes.map(x => {
        notificationTypeIds.push(x.notificationTypeId);
        return {
          id: x.notificationTypeId,
          name: x.notificationTypeName,
          checked: true
        };
      }); // status

      const statusOptions = this.props.settings.statuses.map(x => {
        return {
          id: x,
          name: _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource(x),
          checked: true
        };
      });
      this.setState(prevState => ({
        notificationTypeOptions,
        statusOptions,
        filter: _objectSpread(_objectSpread({}, prevState.filter), {}, {
          notificationTypes: notificationTypeIds.toString(),
          statuses: this.props.settings.statuses.toString()
        })
      }));
    });
  }

  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"], {
      className: "form-filter",
      onSubmit: e => this.submitHandler(e)
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Row, {
      bsPrefix: "form-row"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, null, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('NotificationType')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "form-control-wrapper"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_multiple_select_index__WEBPACK_IMPORTED_MODULE_10__["default"], {
      id: "notification-type",
      dataSource: this.state.notificationTypeOptions,
      keyField: "id",
      valueField: "name",
      statusField: "checked",
      isSubmited: false,
      isAllTextShown: true,
      onChange: (currentItem, selectedItemsKey) => this.handleNotificationTypeChange(currentItem, selectedItemsKey)
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, null, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('From')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "react-datepicker-wrapper-container form-control-wrapper"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_date_picker_index__WEBPACK_IMPORTED_MODULE_7__["default"], {
      disabled: this.isDisabledDateParam(),
      dropdownMode: "select",
      showMonthDropdown: true,
      showYearDropdown: true,
      maxDate: this.state.maxDate,
      selected: this.state.filter.fromDate,
      onChange: value => this.handleFromDateChange(value)
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, null, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('To')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "react-datepicker-wrapper-container form-control-wrapper"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_date_picker_index__WEBPACK_IMPORTED_MODULE_7__["default"], {
      disabled: this.isDisabledDateParam(),
      dropdownMode: "select",
      showMonthDropdown: true,
      showYearDropdown: true,
      minDate: this.state.minToDate,
      maxDate: this.state.maxToDate,
      selected: this.state.filter.toDate,
      onChange: value => this.handleToDateChange(value)
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, null, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('GroupHeadline')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "form-control-wrapper"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_CustomReactSelect__WEBPACK_IMPORTED_MODULE_9__["default"], {
      placeholder: " ",
      isClearable: true,
      noOptionsMessage: () => 'No results found',
      onChange: value => this.handleHeadlineChange(value),
      options: this.props.headlineOptions,
      onInputChange: searchText => this.debounceHandleHeadlineInputChange(searchText),
      value: this.state.filter.headline
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, null, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Recipient')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "form-control-wrapper"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_CustomReactSelect__WEBPACK_IMPORTED_MODULE_9__["default"], {
      placeholder: " ",
      isClearable: true,
      noOptionsMessage: () => 'No results found',
      onChange: value => this.handleRecipientChange(value),
      options: this.props.recipientOptions,
      onInputChange: searchText => this.debounceHandleRecipientInputChange(searchText),
      value: this.state.filter.recipient
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, null, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('MessageID')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Control, {
      as: "input",
      type: "text",
      pattern: "[0-9]*",
      size: "sm",
      className: "shadow-none",
      name: "messageId",
      value: this.state.filter.messageId,
      onChange: e => this.handleChangeFilterControl(e)
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, null, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('NotificationID')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "form-control-wrapper d-flex align-items-center notification-id-container"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Control, {
      className: `shadow-none ${this.props.invalidParams.isInvalidNotificationIdLower ? 'invalid-input' : 'valid-input'} notification-id-input`,
      as: "input",
      type: "text",
      pattern: "[0-9]*",
      size: "sm",
      name: "notificationIdLower",
      value: this.state.filter.notificationIdLower,
      onChange: e => this.handleChangeFilterControl(e)
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "notification-concate text-center"
    }, "-"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Control, {
      className: `shadow-none ${this.props.invalidParams.isInvalidNotificationIdUpper ? 'invalid-input' : 'valid-input'} notification-id-input`,
      as: "input",
      type: "text",
      pattern: "[0-9]*",
      size: "sm",
      name: "notificationIdUpper",
      value: this.state.filter.notificationIdUpper,
      onChange: e => this.handleChangeFilterControl(e)
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, null, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Content')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Control, {
      as: "input",
      type: "text",
      size: "sm",
      className: "shadow-none",
      name: "content",
      value: this.state.filter.content,
      autoComplete: "off",
      onChange: e => this.handleChange(e)
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, null, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Status')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "form-control-wrapper"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_multiple_select_index__WEBPACK_IMPORTED_MODULE_10__["default"], {
      dataSource: this.state.statusOptions,
      keyField: "id",
      valueField: "name",
      statusField: "checked",
      isSubmited: false,
      isAllTextShown: true,
      onChange: (currentItem, selectedItemsKey) => this.handleStatusChange(currentItem, selectedItemsKey)
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], {
      variant: "primary",
      size: "sm",
      type: "submit"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Submit')))));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions_index__WEBPACK_IMPORTED_MODULE_4__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    gridParams,
    invalidParams,
    settings,
    headlineOptions,
    recipientOptions,
    autoRefresh,
    resendOptions
  } = state;
  return {
    gridParams,
    invalidParams,
    settings,
    headlineOptions,
    recipientOptions,
    autoRefresh,
    resendOptions
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(Filter));

/***/ }),

/***/ "./www/sources/js/pages/notification-list/components/ValidateResend.jsx":
/*!******************************************************************************!*\
  !*** ./www/sources/js/pages/notification-list/components/ValidateResend.jsx ***!
  \******************************************************************************/
/*! exports provided: ValidateResend, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ValidateResend", function() { return ValidateResend; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../actions/index */ "./www/sources/js/pages/notification-list/actions/index.js");
/* harmony import */ var _jsroot_components_DraggableModalDialog__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/components/DraggableModalDialog */ "./www/sources/js/components/DraggableModalDialog.jsx");
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../functions */ "./www/sources/js/pages/notification-list/functions.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









class ValidateResend extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "onClose", () => {
      if (this.props.resendOptions.dataList.filter(item => _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getResource('Error') === item.status && item.isResent).length <= 0) {
        this.props.setIsRefresh(true);
      }

      this.props.setValidateResend({
        show: false
      });
    });

    _defineProperty(this, "resendNotifications", notificationIds => {
      this.onClose();
      _functions__WEBPACK_IMPORTED_MODULE_7__["default"].resendNotifications({
        notificationIds
      }, this.callBackSuccess);
    });

    _defineProperty(this, "callBackSuccess", () => {
      this.props.setIsRefresh(true);
      this.props.getGridData(this.props.gridParams, data => _functions__WEBPACK_IMPORTED_MODULE_7__["default"].handleNewResendOptions(data, this.props.setResendOptions));
      this.props.setAutoRefresh(_objectSpread(_objectSpread({}, this.props.autoRefresh), {}, {
        countDown: this.props.autoRefresh.value
      }));
    });

    _defineProperty(this, "renderBody", (isSingle, isAllValidate, isAllInActive, resendIdsString, inActiveNotificationIdsString) => {
      if (isSingle) {
        if (isAllValidate) {
          return _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].formatString(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getResource('ConfirmResendNotification'), '', resendIdsString);
        } else {
          return _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].formatString(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getResource('TheRecipientOfNotificationIdHasBeenInactive'), '', '', inActiveNotificationIdsString);
        }
      } else {
        if (isAllInActive) {
          return _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].formatString(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getResource('TheRecipientOfNotificationIdHasBeenInactive'), '', 's', inActiveNotificationIdsString);
        } else {
          if (isAllValidate) {
            return _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].formatString(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getResource('ComfirmResendNotification'), 's', resendIdsString);
          } else {
            return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].formatString(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getResource('TheRecipientOfNotificationIdHasBeenInactive'), '1. ', 's', inActiveNotificationIdsString)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].formatString(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getResource('TheSelectedNotificationsAreAbleToResend'), resendIdsString)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getResource('ConfirmResendListAndIgnoreNotification')));
          }
        }
      }
    });
  }

  render() {
    const {
      inActiveNotificationIds,
      isSingle,
      resendIds
    } = this.props.validateResendResult.result;
    const inActiveNotificationIdsString = inActiveNotificationIds.join(', ');
    const resendIdsString = resendIds.join(', ');
    const isAllValidate = inActiveNotificationIds.length <= 0;
    const isAllInActive = resendIds.length === 0;
    const hasOnlyOkButton = isSingle && inActiveNotificationIds.length > 0 || !isSingle && isAllInActive;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"], {
      show: true,
      backdrop: "static",
      keyboard: false,
      size: "md",
      centered: true,
      onHide: () => this.onClose(),
      dialogAs: _jsroot_components_DraggableModalDialog__WEBPACK_IMPORTED_MODULE_6__["default"]
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Header, {
      closeButton: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Title, {
      as: "div"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getResource('Confirmation'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Body, null, this.renderBody(isSingle, isAllValidate, isAllInActive, resendIdsString, inActiveNotificationIdsString)), hasOnlyOkButton ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Footer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
      onClick: () => this.onClose(),
      variant: "primary",
      size: "sm"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getResource('OK'))) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Footer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
      variant: "primary",
      size: "sm",
      onClick: () => this.resendNotifications(resendIds.toString())
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getResource('OK')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
      onClick: () => this.onClose(),
      variant: "primary",
      size: "sm"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getResource('Cancel'))));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_4__["bindActionCreators"])(_actions_index__WEBPACK_IMPORTED_MODULE_5__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    validateResendResult,
    gridParams,
    resendOptions,
    autoRefresh
  } = state;
  return {
    validateResendResult,
    gridParams,
    resendOptions,
    autoRefresh
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, mapDispatchToProps)(ValidateResend));

/***/ }),

/***/ "./www/sources/js/pages/notification-list/components/ViewDetail.jsx":
/*!**************************************************************************!*\
  !*** ./www/sources/js/pages/notification-list/components/ViewDetail.jsx ***!
  \**************************************************************************/
/*! exports provided: ViewDetail, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ViewDetail", function() { return ViewDetail; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var _jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/components/react-grid/index */ "./www/sources/js/components/react-grid/index.jsx");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions_index__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../actions/index */ "./www/sources/js/pages/notification-list/actions/index.js");
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../functions */ "./www/sources/js/pages/notification-list/functions.js");
/* harmony import */ var _jsroot_components_DraggableModalDialog__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jsroot/components/DraggableModalDialog */ "./www/sources/js/components/DraggableModalDialog.jsx");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }










class ViewDetail extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "componentDidMount", () => this.setState({
      remark: this.props.data.resolvedRemark ? this.props.data.resolvedRemark : '',
      oldRemark: this.props.data.resolvedRemark ? this.props.data.resolvedRemark : '',
      modalWidth: document.getElementById('view-detail-modal-body').clientWidth
    }));

    _defineProperty(this, "buildHeader", () => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_3__["HeaderRow"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_3__["HeaderCell"], {
      colWidth: 0.2 * this.state.modalWidth
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getResource('LetstalkName')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_3__["HeaderCell"], {
      colWidth: 0.2 * this.state.modalWidth
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getResource('GroupHeadline')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_3__["HeaderCell"], {
      colWidth: 0.2 * this.state.modalWidth
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getResource('Recipient')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_3__["HeaderCell"], {
      colWidth: 0.4 * this.state.modalWidth
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getResource('Reason'))));

    _defineProperty(this, "buildBody", data => [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_3__["Row"], {
      key: data.notificationId
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_3__["Cell"], null, data.letstalkName), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_3__["Cell"], null, _functions__WEBPACK_IMPORTED_MODULE_7__["default"].getHeadlines(data.headlines)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_3__["Cell"], null, _functions__WEBPACK_IMPORTED_MODULE_7__["default"].getRecipients(data.recipients)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_3__["Cell"], {
      className: "error-color"
    }, data.reason))]);

    _defineProperty(this, "editNotificationList", notificationId => this.setState({
      isResolved: true
    }, () => this.props.editNotificationList({
      notificationId,
      remark: this.state.remark
    })));

    _defineProperty(this, "handleChange", e => {
      this.setState({
        [e.target.name]: e.target.value
      });
    });

    _defineProperty(this, "onClose", close => {
      if (this.state.isResolved) {
        this.props.setViewDetail({
          resolvedBy: ''
        });
        close();
        this.props.getGridData(this.props.gridParams, data => _functions__WEBPACK_IMPORTED_MODULE_7__["default"].handleNewResendOptions(data, this.props.setResendOptions));
        this.props.setAutoRefresh(_objectSpread(_objectSpread({}, this.props.autoRefresh), {}, {
          countDown: this.props.autoRefresh.value
        }));
      } else {
        if (this.state.remark !== this.state.oldRemark) {
          this.props.setConfirmPopup({
            show: true,
            onOk: close
          });
        } else {
          close();
        }
      }
    });

    this.state = {
      isResolved: false,
      modalWidth: 0
    };
  }

  render() {
    const {
      data,
      onClose
    } = this.props;
    const isResolved = this.state.isResolved || data.status === _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getResource('Resolved');
    const resolvedBy = this.props.viewDetail.resolvedBy || data.resolvedBy;
    const title = isResolved ? _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getResource('ResolvedNotification') : _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getResource('ErrorNotification');
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"], {
      show: true,
      backdrop: "static",
      keyboard: false,
      size: "lg",
      centered: true,
      onHide: () => this.onClose(onClose),
      dialogAs: _jsroot_components_DraggableModalDialog__WEBPACK_IMPORTED_MODULE_8__["default"]
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Header, {
      closeButton: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Title, {
      as: "div"
    }, title)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Body, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      id: "view-detail-modal-body"
    }, `${_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getResource('NotificationID')}: `, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("b", null, data.notificationId)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, `${_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getResource('NotificationTemplate')}: `, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("b", null, data.title)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, `${_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getResource('SentAt')}: `, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("b", null, `${data.sendDateString} ${data.sendTimeString}`)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "error-occured-message error-resolved-row"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getResource('ErrorOccuredWhileSendingTheNotificationToTheFollowingRecipient')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_3__["Table"], {
      width: this.state.modalWidth - 1,
      autoWidth: false,
      header: this.buildHeader(),
      body: this.buildBody(data),
      containerPadding: 0
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "error-resolved-row"
    }, `${_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getResource('Remark')}: `, isResolved && this.state.remark), !isResolved && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("textarea", {
      className: "view-detail-remark",
      rows: "3",
      onChange: e => this.handleChange(e),
      name: "remark",
      value: this.state.remark
    })), isResolved && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, `${_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getResource('ResolvedBy')}: ${resolvedBy}`)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Footer, null, !isResolved && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
      onClick: () => this.editNotificationList(data.notificationId),
      variant: "primary",
      size: "sm"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getResource('Resolve')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
      onClick: () => this.onClose(onClose),
      variant: "primary",
      size: "sm"
    }, isResolved ? _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getResource('Close') : _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getResource('Cancel'))));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_5__["bindActionCreators"])(_actions_index__WEBPACK_IMPORTED_MODULE_6__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    viewDetail,
    gridParams,
    autoRefresh
  } = state;
  return {
    viewDetail,
    gridParams,
    autoRefresh
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["connect"])(mapStateToProps, mapDispatchToProps)(ViewDetail));

/***/ }),

/***/ "./www/sources/js/pages/notification-list/functions.js":
/*!*************************************************************!*\
  !*** ./www/sources/js/pages/notification-list/functions.js ***!
  \*************************************************************/
/*! exports provided: handleNewResendOptions, getHeadlines, getRecipients, resendNotifications, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "handleNewResendOptions", function() { return handleNewResendOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getHeadlines", function() { return getHeadlines; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRecipients", function() { return getRecipients; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resendNotifications", function() { return resendNotifications; });
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/common/site */ "./www/sources/js/common/site.js");
/* harmony import */ var _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/common/dataService */ "./www/sources/js/common/dataService.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/lib/index.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_toastify__WEBPACK_IMPORTED_MODULE_4__);





const handleNewResendOptions = (data, done) => {
  const resendList = data.filter(item => item.status === _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getResource('Error'));
  const dataList = data.map(item => {
    return {
      notificationId: item.notificationId,
      status: item.status,
      isResent: false
    };
  });
  done({
    isCheckedAll: false,
    isDisabledResend: true,
    isHaveResendAll: resendList.length > 0,
    dataList
  });
};
const getHeadlines = headlines => {
  if (headlines && headlines.length > 0) {
    return headlines.map(headline => headline.headlineName).join(', ');
  }

  return '';
};
const getRecipients = recipients => {
  if (recipients && recipients.length > 0) {
    return recipients.map((recipient, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
      key: index
    }, `${recipient.recipientName} (${recipient.roleName})`));
  }

  return '';
};
const resendNotifications = async (params, callback) => {
  _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].blockUI();
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('NotificationList/ResendNotificationList');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_2__["default"].postDataAsync(url, params).then(response => {
    const {
      message,
      isSuccessful
    } = response.data;

    if (typeof callback === 'function') {
      callback();
    }

    if (isSuccessful) {
      react_toastify__WEBPACK_IMPORTED_MODULE_4__["toast"].success(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getResource('ResentSuccessfully'));
    } else {
      react_toastify__WEBPACK_IMPORTED_MODULE_4__["toast"].error(message);
    }
  }).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].unblockUI());
};
const functions = {
  handleNewResendOptions,
  getHeadlines,
  getRecipients,
  resendNotifications
};
/* harmony default export */ __webpack_exports__["default"] = (functions);

/***/ }),

/***/ "./www/sources/js/pages/notification-list/index.js":
/*!*********************************************************!*\
  !*** ./www/sources/js/pages/notification-list/index.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return index; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _jsroot_common_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/common/store */ "./www/sources/js/common/store.js");
/* harmony import */ var _components_AppContainer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/AppContainer */ "./www/sources/js/pages/notification-list/components/AppContainer.jsx");
/* harmony import */ var _reducers_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./reducers/index */ "./www/sources/js/pages/notification-list/reducers/index.js");
/* harmony import */ var _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/common/constants */ "./www/sources/js/common/constants.js");
/* harmony import */ var _cssroot_pages_notification_list_index_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @cssroot/pages/notification-list/index.scss */ "./www/sources/css/pages/notification-list/index.scss");
/* harmony import */ var _cssroot_pages_notification_list_index_scss__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_cssroot_pages_notification_list_index_scss__WEBPACK_IMPORTED_MODULE_6__);







const store = _jsroot_common_store__WEBPACK_IMPORTED_MODULE_2__["default"].createStore(_reducers_index__WEBPACK_IMPORTED_MODULE_4__["default"], {
  gridParams: {
    pageIndex: 1,
    pageSize: 100
  },
  invalidParams: {},
  contentPopup: {
    show: false
  },
  viewDetailPopup: {
    show: false
  },
  resendOptions: {
    isCheckedAll: false,
    isDisabledResend: true,
    isHaveResendAll: false,
    shouldResetScrollPosition: true,
    dataList: []
  },
  settings: {
    notificationTypes: [],
    statuses: []
  },
  headlineOptions: [],
  recipientOptions: [],
  viewDetail: {
    resolvedBy: '',
    result: {
      code: 1,
      message: '',
      isSuccessful: false
    }
  },
  validateResendResult: {
    show: false,
    result: {
      isSingle: false,
      inActiveNotificationIds: [],
      resendIds: []
    }
  },
  confirmPopup: {
    show: false,
    onOk: null
  },
  autoRefresh: {
    value: _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_5__["AUTO_REFRESH_TIMES"][0],
    countDown: _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_5__["AUTO_REFRESH_TIMES"][0],
    isSubmit: false
  },
  isRefresh: true
});
class index extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_1__["Provider"], {
      store: store
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "notification-list"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_AppContainer__WEBPACK_IMPORTED_MODULE_3__["default"], null)));
  }

}

/***/ }),

/***/ "./www/sources/js/pages/notification-list/reducers/dataHandlerReducer.js":
/*!*******************************************************************************!*\
  !*** ./www/sources/js/pages/notification-list/reducers/dataHandlerReducer.js ***!
  \*******************************************************************************/
/*! exports provided: gridParams, notificationListGridData, contentPopup, resendOptions, viewDetailPopup, invalidParams, settings, viewDetail, validateResendResult, confirmPopup, headlineOptions, recipientOptions, autoRefresh, isRefresh, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gridParams", function() { return gridParams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "notificationListGridData", function() { return notificationListGridData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "contentPopup", function() { return contentPopup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resendOptions", function() { return resendOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "viewDetailPopup", function() { return viewDetailPopup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "invalidParams", function() { return invalidParams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "settings", function() { return settings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "viewDetail", function() { return viewDetail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateResendResult", function() { return validateResendResult; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "confirmPopup", function() { return confirmPopup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "headlineOptions", function() { return headlineOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recipientOptions", function() { return recipientOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "autoRefresh", function() { return autoRefresh; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isRefresh", function() { return isRefresh; });
/* harmony import */ var _jsroot_common_createReducer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/common/createReducer */ "./www/sources/js/common/createReducer.js");
/* harmony import */ var _actions_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../actions/types */ "./www/sources/js/pages/notification-list/actions/types.js");

 // Grid

const gridParams = Object(_jsroot_common_createReducer__WEBPACK_IMPORTED_MODULE_0__["default"])({}, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_1__["default"].GRID_PARAMS](state, action) {
    return action.data;
  }

});
const notificationListGridData = Object(_jsroot_common_createReducer__WEBPACK_IMPORTED_MODULE_0__["default"])({}, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_1__["default"].GRID_DATA](state, action) {
    return action.data;
  }

});
const contentPopup = Object(_jsroot_common_createReducer__WEBPACK_IMPORTED_MODULE_0__["default"])({}, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_1__["default"].CONTENT_POPUP_DATA](state, action) {
    return action.data;
  }

});
const resendOptions = Object(_jsroot_common_createReducer__WEBPACK_IMPORTED_MODULE_0__["default"])({}, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_1__["default"].RESEND_OPTIONS_DATA](state, action) {
    return action.data;
  }

});
const viewDetailPopup = Object(_jsroot_common_createReducer__WEBPACK_IMPORTED_MODULE_0__["default"])({}, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_1__["default"].VIEW_DETAIL_POPUP_DATA](state, action) {
    return action.data;
  }

});
const invalidParams = Object(_jsroot_common_createReducer__WEBPACK_IMPORTED_MODULE_0__["default"])({}, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_1__["default"].INVALID_PARAMS_DATA](state, action) {
    return action.data;
  }

});
const settings = Object(_jsroot_common_createReducer__WEBPACK_IMPORTED_MODULE_0__["default"])({}, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_1__["default"].SETTINGS_DATA](state, action) {
    return action.data;
  }

});
const viewDetail = Object(_jsroot_common_createReducer__WEBPACK_IMPORTED_MODULE_0__["default"])({}, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_1__["default"].VIEW_DETAIL_DATA](state, action) {
    return action.data;
  }

});
const validateResendResult = Object(_jsroot_common_createReducer__WEBPACK_IMPORTED_MODULE_0__["default"])({}, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_1__["default"].VALIDATE_RESEND_DATA](state, action) {
    return action.data;
  }

});
const confirmPopup = Object(_jsroot_common_createReducer__WEBPACK_IMPORTED_MODULE_0__["default"])({}, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_1__["default"].CONFIRM_POPUP_DATA](state, action) {
    return action.data;
  }

});
const headlineOptions = Object(_jsroot_common_createReducer__WEBPACK_IMPORTED_MODULE_0__["default"])({}, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_1__["default"].HEADLINE_OPTIONS_DATA](state, action) {
    return action.data;
  }

});
const recipientOptions = Object(_jsroot_common_createReducer__WEBPACK_IMPORTED_MODULE_0__["default"])({}, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_1__["default"].RECIPIENT_OPTIONS_DATA](state, action) {
    return action.data;
  }

});
const autoRefresh = Object(_jsroot_common_createReducer__WEBPACK_IMPORTED_MODULE_0__["default"])({}, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_1__["default"].AUTO_REFRESH_DATA](state, action) {
    return action.data;
  }

});
const isRefresh = Object(_jsroot_common_createReducer__WEBPACK_IMPORTED_MODULE_0__["default"])({}, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_1__["default"].IS_REFRESH_DATA](state, action) {
    return action.data;
  }

});
const reducers = {
  gridParams,
  notificationListGridData,
  contentPopup,
  viewDetailPopup,
  resendOptions,
  invalidParams,
  settings,
  viewDetail,
  validateResendResult,
  confirmPopup,
  headlineOptions,
  recipientOptions,
  autoRefresh,
  isRefresh
};
/* harmony default export */ __webpack_exports__["default"] = (reducers);

/***/ }),

/***/ "./www/sources/js/pages/notification-list/reducers/index.js":
/*!******************************************************************!*\
  !*** ./www/sources/js/pages/notification-list/reducers/index.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _dataHandlerReducer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dataHandlerReducer */ "./www/sources/js/pages/notification-list/reducers/dataHandlerReducer.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



/* harmony default export */ __webpack_exports__["default"] = (Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])(_objectSpread({}, _dataHandlerReducer__WEBPACK_IMPORTED_MODULE_1__["default"])));

/***/ })

}]);
//# sourceMappingURL=2.chunk.js.map