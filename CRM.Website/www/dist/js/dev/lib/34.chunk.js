(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[34],{

/***/ "./www/sources/js/pages/feedback/add-feedback/add-customer-feedback/actions.js":
/*!*************************************************************************************!*\
  !*** ./www/sources/js/pages/feedback/add-feedback/add-customer-feedback/actions.js ***!
  \*************************************************************************************/
/*! exports provided: ActionCreators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionCreators", function() { return ActionCreators; });
/* harmony import */ var _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/common/site */ "./www/sources/js/common/site.js");
/* harmony import */ var _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/common/dataService */ "./www/sources/js/common/dataService.js");
/* harmony import */ var _addCustomerFeedbackSlice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./addCustomerFeedbackSlice */ "./www/sources/js/pages/feedback/add-feedback/add-customer-feedback/addCustomerFeedbackSlice.js");




const getAllSettings = () => async dispatch => {
  _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].blockUI();
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl('AddCustomerFeedback/AllSetting');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__["default"].getDataAsync(url).then(response => {
    dispatch(Object(_addCustomerFeedbackSlice__WEBPACK_IMPORTED_MODULE_2__["setAllSettings"])(response.data));
  }).catch(_jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].handleAxiosError).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].unblockUI());
};

const getBalanceUpday = () => async dispatch => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl('Feedback/GetBalanceUpday');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__["default"].getDataAsync(url).then(response => {
    dispatch(Object(_addCustomerFeedbackSlice__WEBPACK_IMPORTED_MODULE_2__["setBalanceUpday"])(response.data));
  });
};

const getCustomerDetail = param => async dispatch => {
  _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].blockUI();
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl('CustomerInfoDetail/GetCustomerById');
  return await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__["default"].postDataAsync(url, param).then(response => {
    dispatch(Object(_addCustomerFeedbackSlice__WEBPACK_IMPORTED_MODULE_2__["setCustomerDetail"])(response.data));
  }).catch(_jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].handleAxiosError).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].unblockUI());
};

const getFeedbackSubjectTemplates = subject => async dispatch => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl('Common/GetFeedbackSubjectTemplate');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__["default"].getDataAsync(url, {
    subject
  }).then(response => {
    dispatch(Object(_addCustomerFeedbackSlice__WEBPACK_IMPORTED_MODULE_2__["setFeedbackSubjectTemplates"])(response.data));
  });
};

const addFeedback = params => async dispatch => {
  _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].blockUI();
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl('AddCustomerFeedback/Create');
  return await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__["default"].postDataAsync(url, params).then(response => {
    dispatch(Object(_addCustomerFeedbackSlice__WEBPACK_IMPORTED_MODULE_2__["setAddFeedback"])(response.data));
  }).catch(_jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].handleAxiosError).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].unblockUI());
};

const verifyUserName = data => async () => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl('CustomerSetting/VerifyUsername');
  return await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__["default"].postDataAsync(url, data).then(response => response.data);
};

const getTicketInfoByRef = Refno => async () => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl('Feedback/GetTicketInfoByRefNo');
  return await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__["default"].getDataAsync(url, Refno).then(response => response.data);
};

const ActionCreators = {
  setAllSettings: _addCustomerFeedbackSlice__WEBPACK_IMPORTED_MODULE_2__["setAllSettings"],
  getAllSettings,
  getBalanceUpday,
  setBalanceUpday: _addCustomerFeedbackSlice__WEBPACK_IMPORTED_MODULE_2__["setBalanceUpday"],
  getCustomerDetail,
  setCustomerDetail: _addCustomerFeedbackSlice__WEBPACK_IMPORTED_MODULE_2__["setCustomerDetail"],
  getFeedbackSubjectTemplates,
  setFeedbackSubjectTemplates: _addCustomerFeedbackSlice__WEBPACK_IMPORTED_MODULE_2__["setFeedbackSubjectTemplates"],
  addFeedback,
  setAddFeedback: _addCustomerFeedbackSlice__WEBPACK_IMPORTED_MODULE_2__["setAddFeedback"],
  verifyUserName,
  setConfirmCreateGuestDialog: _addCustomerFeedbackSlice__WEBPACK_IMPORTED_MODULE_2__["setConfirmCreateGuestDialog"],
  getTicketInfoByRef,
  resetState: _addCustomerFeedbackSlice__WEBPACK_IMPORTED_MODULE_2__["resetState"]
};

/***/ }),

/***/ "./www/sources/js/pages/feedback/add-feedback/add-customer-feedback/addCustomerFeedbackSlice.js":
/*!******************************************************************************************************!*\
  !*** ./www/sources/js/pages/feedback/add-feedback/add-customer-feedback/addCustomerFeedbackSlice.js ***!
  \******************************************************************************************************/
/*! exports provided: setAllSettings, setBalanceUpday, setCustomerDetail, setFeedbackSubjectTemplates, setAddFeedback, setConfirmCreateGuestDialog, resetState, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setAllSettings", function() { return setAllSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setBalanceUpday", function() { return setBalanceUpday; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setCustomerDetail", function() { return setCustomerDetail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setFeedbackSubjectTemplates", function() { return setFeedbackSubjectTemplates; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setAddFeedback", function() { return setAddFeedback; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setConfirmCreateGuestDialog", function() { return setConfirmCreateGuestDialog; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetState", function() { return resetState; });
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @reduxjs/toolkit */ "./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");

const initialState = {
  settings: null,
  balanceUpday: null,
  customerDetail: null,
  addFeedbackResult: null,
  feedbackSubjectTemplates: [],
  confirmCreateGuestDialog: {
    show: false
  }
};
const addGuestFeedbackSlice = Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__["createSlice"])({
  name: 'addCustomerFeedback',
  initialState: initialState,
  reducers: {
    resetState: () => initialState,
    setAllSettings: (state, action) => {
      state.settings = action.payload;
    },
    setBalanceUpday: (state, action) => {
      state.balanceUpday = action.payload;
    },
    setCustomerDetail: (state, action) => {
      state.customerDetail = action.payload;
    },
    setFeedbackSubjectTemplates: (state, action) => {
      state.feedbackSubjectTemplates = action.payload;
    },
    setAddFeedback: (state, action) => {
      state.addFeedbackResult = action.payload;
    },
    setConfirmCreateGuestDialog: (state, action) => {
      state.confirmCreateGuestDialog = action.payload;
    }
  }
});
const {
  actions,
  reducer
} = addGuestFeedbackSlice;
const {
  setAllSettings,
  setBalanceUpday,
  setCustomerDetail,
  setFeedbackSubjectTemplates,
  setAddFeedback,
  setConfirmCreateGuestDialog,
  resetState
} = actions;
/* harmony default export */ __webpack_exports__["default"] = (reducer);

/***/ }),

/***/ "./www/sources/js/pages/feedback/add-feedback/add-customer-feedback/components/AppContainer.jsx":
/*!******************************************************************************************************!*\
  !*** ./www/sources/js/pages/feedback/add-feedback/add-customer-feedback/components/AppContainer.jsx ***!
  \******************************************************************************************************/
/*! exports provided: AppContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppContainer", function() { return AppContainer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/feedback/add-feedback/add-customer-feedback/actions.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _CreateForm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../CreateForm */ "./www/sources/js/pages/feedback/add-feedback/CreateForm.jsx");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







class AppContainer extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getAllSettings();
    this.props.getBalanceUpday();
    this.props.getCustomerDetail({
      customerId: this.props.id
    });
  }

  componentWillUnmount() {
    this.props.resetState();
  }

  render() {
    const {
      settings,
      balanceUpday,
      customerDetail,
      feedbackSubjectTemplates,
      confirmCreateGuestDialog,
      addFeedbackResult,
      duplicateFeedbackResult
    } = this.props;

    if (settings === null || balanceUpday === null || customerDetail === null) {
      return null;
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_CreateForm__WEBPACK_IMPORTED_MODULE_5__["default"], {
      settings: settings,
      balanceUpday: balanceUpday,
      customerDetail: customerDetail,
      feedbackSubjectTemplates: feedbackSubjectTemplates,
      confirmCreateGuestDialog: confirmCreateGuestDialog,
      setConfirmCreateGuestDialog: this.props.setConfirmCreateGuestDialog,
      addFeedbackResult: addFeedbackResult,
      verifyUserName: this.props.verifyUserName,
      getTicketInfoByRef: this.props.getTicketInfoByRef,
      setAddFeedback: this.props.setAddFeedback,
      duplicateFeedbackResult: duplicateFeedbackResult,
      addFeedback: this.props.addFeedback
    });
  }

}

_defineProperty(AppContainer, "propTypes", {
  getAllSettings: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func,
  getBalanceUpday: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.func
});

_defineProperty(AppContainer, "defaultProps", {
  getAllSettings: function () {// nothing
  },
  getBalanceUpday: function () {// nothing
  },
  getCustomerDetail: function () {// nothing
  }
});

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    settings,
    balanceUpday,
    customerDetail,
    feedbackSubjectTemplates,
    confirmCreateGuestDialog,
    addFeedbackResult,
    duplicateFeedbackResult
  } = state;
  return {
    settings,
    balanceUpday,
    customerDetail,
    feedbackSubjectTemplates,
    confirmCreateGuestDialog,
    addFeedbackResult,
    duplicateFeedbackResult
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(AppContainer));

/***/ }),

/***/ "./www/sources/js/pages/feedback/add-feedback/add-customer-feedback/index.js":
/*!***********************************************************************************!*\
  !*** ./www/sources/js/pages/feedback/add-feedback/add-customer-feedback/index.js ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @reduxjs/toolkit */ "./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");
/* harmony import */ var _addCustomerFeedbackSlice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./addCustomerFeedbackSlice */ "./www/sources/js/pages/feedback/add-feedback/add-customer-feedback/addCustomerFeedbackSlice.js");
/* harmony import */ var _components_AppContainer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/AppContainer */ "./www/sources/js/pages/feedback/add-feedback/add-customer-feedback/components/AppContainer.jsx");
/* harmony import */ var _jsroot_components_WithNavigation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/components/WithNavigation */ "./www/sources/js/components/WithNavigation.jsx");
/* harmony import */ var _cssroot_pages_feedback_add_feedback_index_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @cssroot/pages/feedback/add-feedback/index.scss */ "./www/sources/css/pages/feedback/add-feedback/index.scss");
/* harmony import */ var _cssroot_pages_feedback_add_feedback_index_scss__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_cssroot_pages_feedback_add_feedback_index_scss__WEBPACK_IMPORTED_MODULE_6__);






const store = Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__["configureStore"])({
  reducer: _addCustomerFeedbackSlice__WEBPACK_IMPORTED_MODULE_3__["default"]
});


class index extends react__WEBPACK_IMPORTED_MODULE_0___default.a.PureComponent {
  render() {
    const location = this.props.location;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_1__["Provider"], {
      store: store
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "add-feedback"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_AppContainer__WEBPACK_IMPORTED_MODULE_4__["default"], {
      id: !location.state ? null : location.state.toString()
    })));
  }

}

const FunctionBarWithNavigation = Object(_jsroot_components_WithNavigation__WEBPACK_IMPORTED_MODULE_5__["default"])(index);
/* harmony default export */ __webpack_exports__["default"] = (FunctionBarWithNavigation);

/***/ })

}]);
//# sourceMappingURL=34.chunk.js.map