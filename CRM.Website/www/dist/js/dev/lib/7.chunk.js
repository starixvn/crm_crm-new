(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[7],{

/***/ "./www/sources/css/pages/dashboard/index.scss":
/*!****************************************************!*\
  !*** ./www/sources/css/pages/dashboard/index.scss ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./www/sources/js/pages/dashboard/actions.js":
/*!***************************************************!*\
  !*** ./www/sources/js/pages/dashboard/actions.js ***!
  \***************************************************/
/*! exports provided: ActionCreators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionCreators", function() { return ActionCreators; });
/* harmony import */ var _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/common/dataService */ "./www/sources/js/common/dataService.js");
/* harmony import */ var _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/common/site */ "./www/sources/js/common/site.js");
/* harmony import */ var _dashboardSlice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dashboardSlice */ "./www/sources/js/pages/dashboard/dashboardSlice.js");




const getCustomerRemarks = params => async dispatch => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl(`Dashboard/GetCustomerRemarks`);
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__["default"].getDataAsync(url, params).then(response => {
    dispatch(Object(_dashboardSlice__WEBPACK_IMPORTED_MODULE_2__["setCustomerRemarks"])(response.data));
  });
};

const getRedemptionLogs = params => async dispatch => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl(`Dashboard/GetRedemptionLogs`);
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__["default"].getDataAsync(url, params).then(response => {
    dispatch(Object(_dashboardSlice__WEBPACK_IMPORTED_MODULE_2__["setRedemptionLogs"])(response.data));
  });
};

const getCommunicationLogs = params => async dispatch => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('Dashboard/GetCommunicationLogs');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__["default"].getDataAsync(url, params).then(response => {
    dispatch(Object(_dashboardSlice__WEBPACK_IMPORTED_MODULE_2__["setCommunicationLogs"])(response.data));
  });
};

const getCustomerInfoVerify = params => async dispatch => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('Dashboard/GetCustomerInfoVerify');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__["default"].getDataAsync(url, params).then(response => {
    dispatch(Object(_dashboardSlice__WEBPACK_IMPORTED_MODULE_2__["setCustomerInfoVerify"])(response.data));
  });
};

const editCustomerVerify = params => async () => {
  _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].blockUI();
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('Dashboard/EditCustomerVerify');
  return await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__["default"].postDataAsync(url, params).then(response => response);
};

const ActionCreators = {
  getCustomerRemarks,
  getRedemptionLogs,
  setEditRedemptionDialog: _dashboardSlice__WEBPACK_IMPORTED_MODULE_2__["setEditRedemptionDialog"],
  getCommunicationLogs,
  setNoOfInquiryDialog: _dashboardSlice__WEBPACK_IMPORTED_MODULE_2__["setNoOfInquiryDialog"],
  setEditCommunicationDialog: _dashboardSlice__WEBPACK_IMPORTED_MODULE_2__["setEditCommunicationDialog"],
  setCreateCommunicationDialog: _dashboardSlice__WEBPACK_IMPORTED_MODULE_2__["setCreateCommunicationDialog"],
  getCustomerInfoVerify,
  setEditCustomerVerifyDialog: _dashboardSlice__WEBPACK_IMPORTED_MODULE_2__["setEditCustomerVerifyDialog"],
  editCustomerVerify,
  resetState: _dashboardSlice__WEBPACK_IMPORTED_MODULE_2__["resetState"]
};

/***/ }),

/***/ "./www/sources/js/pages/dashboard/components/AppContainer.jsx":
/*!********************************************************************!*\
  !*** ./www/sources/js/pages/dashboard/components/AppContainer.jsx ***!
  \********************************************************************/
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
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/dashboard/actions.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _DataGridRemark__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DataGridRemark */ "./www/sources/js/pages/dashboard/components/DataGridRemark.jsx");
/* harmony import */ var _DataGridRedemption__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./DataGridRedemption */ "./www/sources/js/pages/dashboard/components/DataGridRedemption.jsx");
/* harmony import */ var _redemption_components_EditRedemptionLog__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../redemption/components/EditRedemptionLog */ "./www/sources/js/pages/redemption/components/EditRedemptionLog.jsx");
/* harmony import */ var _DataGridCommunication__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./DataGridCommunication */ "./www/sources/js/pages/dashboard/components/DataGridCommunication.jsx");
/* harmony import */ var _feedback_edit_no_of_inquiry_AppContainer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../feedback/edit-no-of-inquiry/AppContainer */ "./www/sources/js/pages/feedback/edit-no-of-inquiry/AppContainer.jsx");
/* harmony import */ var _communication_log_components_EditCommunicationLog__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../communication-log/components/EditCommunicationLog */ "./www/sources/js/pages/communication-log/components/EditCommunicationLog.jsx");
/* harmony import */ var _communication_log_components_CreateCommunicationLog__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../communication-log/components/CreateCommunicationLog */ "./www/sources/js/pages/communication-log/components/CreateCommunicationLog.jsx");
/* harmony import */ var _CustomerInfoVerify__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./CustomerInfoVerify */ "./www/sources/js/pages/dashboard/components/CustomerInfoVerify.jsx");
/* harmony import */ var _EditCustomerInfoVerify__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./EditCustomerInfoVerify */ "./www/sources/js/pages/dashboard/components/EditCustomerInfoVerify.jsx");
/* harmony import */ var _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @jsroot/common/constants */ "./www/sources/js/common/constants.js");
/* harmony import */ var _jsroot_common_shareScripts__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @jsroot/common/shareScripts */ "./www/sources/js/common/shareScripts.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

















class AppContainer extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleCloseEditRedemptionDialog", isSuccessful => {
      this.props.setEditRedemptionDialog({
        show: false
      });

      if (isSuccessful) {
        this.props.getRedemptionLogs({
          customerId: this.props.custId
        });
      }
    });

    _defineProperty(this, "handleCloseNoInquiryDialog", () => {
      this.props.setNoOfInquiryDialog({
        show: false
      });
    });

    _defineProperty(this, "handleCloseEditCommunicationDialog", isSuccessful => {
      this.props.setEditCommunicationDialog({
        show: false
      });

      if (isSuccessful) {
        this.props.getCommunicationLogs({
          customerId: this.props.custId
        });
      }
    });

    _defineProperty(this, "handleCloseCreateCmnDiaLog", isSuccessful => {
      this.props.setCreateCommunicationDialog({
        show: false
      });

      if (isSuccessful) {
        this.props.getCommunicationLogs({
          customerId: this.props.custId
        });
      }
    });

    _defineProperty(this, "handleCloseEditCustomerVerify", isSuccessful => {
      this.props.setEditCustomerVerifyDialog({
        show: false
      });

      if (isSuccessful) {
        this.props.getCustomerInfoVerify({
          customerId: this.props.custId
        });
      }
    });

    this.state = {
      policy: null
    };
  }

  componentDidMount() {
    Object(_jsroot_common_shareScripts__WEBPACK_IMPORTED_MODULE_15__["getPermission"])(_jsroot_common_constants__WEBPACK_IMPORTED_MODULE_14__["FunctionKey"].CreateUpdateFeedbackAndCustomerInfo).then(response => {
      this.setState({
        policy: response
      });
    });
  }

  componentWillUnmount() {
    this.props.resetState();
  }

  render() {
    if (!this.state.policy) {
      return null;
    }

    const isHost = this.state.policy === _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_14__["Policy"].Host;

    if (!this.props.custId) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "alert-boxer"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "fa fa-exclamation-triangle pr-2",
        "aria-hidden": "true"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Please search customer first!"));
    }

    const {
      editRedemptionDialog,
      noOfInquiryDialog,
      editCommunicationDialog,
      createCommunicationDialog,
      editCustomerVerifyDialog,
      custId
    } = this.props;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "d-flex justify-content-between"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "dataGrid-remark"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DataGridRemark__WEBPACK_IMPORTED_MODULE_5__["default"], {
      id: custId
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "information"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_CustomerInfoVerify__WEBPACK_IMPORTED_MODULE_12__["default"], {
      id: custId
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DataGridRedemption__WEBPACK_IMPORTED_MODULE_6__["default"], {
      id: custId
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DataGridCommunication__WEBPACK_IMPORTED_MODULE_8__["default"], {
      id: custId,
      isHost: isHost
    }), editRedemptionDialog.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_redemption_components_EditRedemptionLog__WEBPACK_IMPORTED_MODULE_7__["default"], {
      logId: editRedemptionDialog.redemptionId,
      onClose: this.handleCloseEditRedemptionDialog
    }), noOfInquiryDialog.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_feedback_edit_no_of_inquiry_AppContainer__WEBPACK_IMPORTED_MODULE_9__["default"], {
      feedbackId: noOfInquiryDialog.feedbackId,
      onClose: this.handleCloseNoInquiryDialog
    }), editCommunicationDialog.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_communication_log_components_EditCommunicationLog__WEBPACK_IMPORTED_MODULE_10__["default"], {
      feedbackId: editCommunicationDialog.id,
      onClose: this.handleCloseEditCommunicationDialog
    }), createCommunicationDialog.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_communication_log_components_CreateCommunicationLog__WEBPACK_IMPORTED_MODULE_11__["default"], {
      id: custId,
      onClose: this.handleCloseCreateCmnDiaLog,
      options: createCommunicationDialog.options
    }), editCustomerVerifyDialog.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_EditCustomerInfoVerify__WEBPACK_IMPORTED_MODULE_13__["default"], {
      isHost: this.state.isHost,
      id: custId,
      onClose: this.handleCloseEditCustomerVerify
    }));
  }

}

_defineProperty(AppContainer, "propTypes", {
  editRedemptionDialog: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    show: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool
  }).isRequired,
  noOfInquiryDialog: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    show: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool
  }).isRequired,
  editCommunicationDialog: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    show: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool
  }).isRequired,
  createCommunicationDialog: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    show: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool
  }).isRequired,
  editCustomerVerifyDialog: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    show: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool
  }).isRequired
});

_defineProperty(AppContainer, "defaultProps", {
  editRedemptionDialog: {
    show: false
  },
  noOfInquiryDialog: {
    show: false
  },
  editCommunicationDialog: {
    show: false
  },
  createCommunicationDialog: {
    show: false
  },
  editCustomerVerifyDialog: {
    show: false
  }
});

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_4__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    editRedemptionDialog,
    noOfInquiryDialog,
    editCommunicationDialog,
    createCommunicationDialog,
    editCustomerVerifyDialog
  } = state;
  return {
    editRedemptionDialog,
    noOfInquiryDialog,
    editCommunicationDialog,
    createCommunicationDialog,
    editCustomerVerifyDialog
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(AppContainer));

/***/ }),

/***/ "./www/sources/js/pages/dashboard/components/CustomerInfoVerify.jsx":
/*!**************************************************************************!*\
  !*** ./www/sources/js/pages/dashboard/components/CustomerInfoVerify.jsx ***!
  \**************************************************************************/
/*! exports provided: CustomerInfoVerify, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CustomerInfoVerify", function() { return CustomerInfoVerify; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/dashboard/actions.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







class CustomerInfoVerify extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleEditCustomerVerifyDialog", () => {
      this.props.setEditCustomerVerifyDialog({
        show: true
      });
    });

    this.state = {
      energy: 0,
      numberVerified: 0
    };
  }

  componentDidMount() {
    this.props.getCustomerInfoVerify({
      customerId: this.props.id
    });
  }

  componentDidUpdate(prevProps) {
    const {
      customerInfoVerify
    } = this.props;
    const listVerify = [];
    let countVerified = 0;

    if (customerInfoVerify !== prevProps.customerInfoVerify) {
      listVerify.push(customerInfoVerify.isVerifyEmail);
      listVerify.push(customerInfoVerify.isVerifyPassport);
      listVerify.push(customerInfoVerify.isVerifyBirthday);
      listVerify.push(customerInfoVerify.isVerifySecretCode);
      listVerify.forEach(item => {
        if (item === true) {
          ++countVerified;
        }
      });
      this.setState({
        numberVerified: countVerified,
        energy: Math.round(25 * countVerified)
      });
    }
  }

  render() {
    const {
      customerInfoVerify
    } = this.props;
    const {
      energy,
      numberVerified
    } = this.state;

    if (!customerInfoVerify) {
      return null;
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "customer-verify"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "process"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "percent-process"
    }, energy, "%"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["ProgressBar"], {
      now: energy
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "info-text"
    }, numberVerified, "/4 Information Verified"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], {
      variant: "primary",
      size: "sm",
      onClick: () => this.handleEditCustomerVerifyDialog()
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Verify')));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_3__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    customerInfoVerify
  } = state;
  return {
    customerInfoVerify
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(CustomerInfoVerify));

/***/ }),

/***/ "./www/sources/js/pages/dashboard/components/DataGridCommunication.jsx":
/*!*****************************************************************************!*\
  !*** ./www/sources/js/pages/dashboard/components/DataGridCommunication.jsx ***!
  \*****************************************************************************/
/*! exports provided: DataGridCommunication, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataGridCommunication", function() { return DataGridCommunication; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/dashboard/actions.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/components/react-grid/index */ "./www/sources/js/components/react-grid/index.jsx");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/common/dataService */ "./www/sources/js/common/dataService.js");
/* harmony import */ var _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jsroot/common/dateTimeService */ "./www/sources/js/common/dateTimeService.js");
/* harmony import */ var _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @jsroot/common/constants */ "./www/sources/js/common/constants.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }











class DataGridCommunication extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "buildHeader", () => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderRow"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 18
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('RunningNo')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 15
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Update')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 18
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('FeedbackDate')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 50
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Category')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 30
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Subject')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 15
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Status')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 15
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Duration')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 15
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Handler')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 15
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Reviewer')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 15
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Duplicate')));
    });

    _defineProperty(this, "buildBody", () => {
      const {
        communicationLogs,
        isHost
      } = this.props;

      if (communicationLogs.data.length > 0) {
        return communicationLogs.data.map((item, index) => this.renderRow(item, index));
      }

      return [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Row"], {
        key: `body${1}`,
        className: "no-data"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: "text-center",
        colSpan: isHost === _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_9__["Policy"].Host ? 10 : 9
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('ThereIsNoData')))];
    });

    _defineProperty(this, "handleShowEditCommunication", id => {
      this.props.setEditCommunicationDialog({
        show: true,
        id: id
      });
    });

    _defineProperty(this, "handleShowNoOfInquiry", id => {
      this.props.setNoOfInquiryDialog({
        show: true,
        feedbackId: id
      });
    });

    _defineProperty(this, "handleShowCreateCommunication", async id => {
      await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_7__["default"].getDataAsync(`CommunicationLog/GetLogByFeedbackId/${id}`).then(response => {
        const options = this.getOptions(response.data);
        this.props.setCreateCommunicationDialog({
          show: true,
          options: options
        });
      });
    });

    _defineProperty(this, "getOptions", data => {
      const createLogSettings = this.getCreateLogSettings(data.log);
      const relatedCustomers = data.log.relatedCustomers.map(customer => {
        return {
          isSiteActive: customer.isSiteActive,
          isLicensee: customer.isLicensee,
          custId: customer.custId,
          val: customer.username
        };
      });
      const extensionOptions = data.settings.extensions.map(item => {
        return {
          id: item.id,
          value: item.value,
          checked: createLogSettings.extensionIds.includes(item.id)
        };
      });
      const communicationToolOptions = data.settings.communicationTools.map(item => {
        return {
          id: item.id,
          name: item.name,
          checked: createLogSettings.communicationToolIds.includes(item.id)
        };
      });
      const mainCategoryOptions = data.settings.mainCategories.map(item => {
        return {
          mainCategoryID: item.mainCategoryID,
          name: item.name,
          checked: createLogSettings.mainCategoryIds.includes(item.mainCategoryID)
        };
      });
      const subCategories = data.settings.subCategories.filter(item => createLogSettings.mainCategoryIds.includes(item.mainCategoryID));
      const subCategoryOptions = subCategories.map(item => {
        return {
          subCategoryId: item.subCategoryId,
          name: item.name,
          checked: createLogSettings.subCategoryIds.includes(item.subCategoryId)
        };
      });
      const productOptions = data.settings.products.map(item => {
        return {
          id: item.id,
          value: item.value,
          checked: createLogSettings.productIds.includes(item.id)
        };
      });
      const subProducts = data.settings.subProducts.filter(item => createLogSettings.productIds.includes(item.parentId) && item.parentId !== 0);
      const subProductOptions = subProducts.map(item => {
        return {
          id: item.id,
          value: item.value,
          checked: createLogSettings.subProductIds.includes(item.id)
        };
      });
      const bettypes = data.settings.bettypes.filter(item => createLogSettings.subProductIds.includes(item.parentId) && item.parentId !== 0);
      const betTypeOptions = bettypes.map(item => {
        return {
          id: item.id,
          value: item.value,
          checked: createLogSettings.betTypeIds.includes(item.id)
        };
      });
      return {
        extensionOptions,
        communicationToolOptions,
        mainCategoryOptions,
        subCategoryOptions,
        productOptions,
        subProductOptions,
        betTypeOptions,
        relatedCustomers,
        statusId: data.log.statusId,
        roleId: data.log.roleId,
        siteId: data.log.siteId,
        siteName: data.log.siteSetting.name,
        responseId: data.log.responseId,
        licenseeTypeId: data.log.licenseeType,
        countryId: data.log.countryId,
        noInquiries: data.log.noInquiries,
        languageId: data.log.languageId,
        subject: data.log.subject,
        autoGenerated: data.log.autoField,
        remark: data.log.description,
        solution: data.log.solution,
        solveDate: _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_8__["default"].toShortDateTimeFormat(data.log.solveDate),
        isReviewed: data.log.isReviewed,
        review: data.log.review,
        reviewer: data.log.reviewer,
        settings: data.settings,
        extensionIds: createLogSettings.extensionIds.join(','),
        communicationToolIds: createLogSettings.communicationToolIds.join(','),
        mainCategoryIds: createLogSettings.mainCategoryIds.join(','),
        subCategoryIds: createLogSettings.subCategoryIds.join(','),
        productIds: createLogSettings.productIds.join(','),
        subProductIds: createLogSettings.subProductIds.join(','),
        betTypeIds: createLogSettings.betTypeIds.join(',')
      };
    });

    _defineProperty(this, "getCreateLogSettings", log => {
      const createLogSettings = log.settings;
      const extensions = createLogSettings.filter(item => item.settingType === 'Station');
      const communicationTools = createLogSettings.filter(item => item.settingType === 'Communication');
      const categories = createLogSettings.filter(item => item.settingType === 'Category');
      const products = createLogSettings.filter(item => item.settingType === 'Product');
      return {
        extensionIds: extensions.map(x => x.settingId),
        communicationToolIds: communicationTools.map(x => x.settingId),
        mainCategoryIds: categories.map(x => x.settingId),
        subCategoryIds: categories.map(x => x.subSettingId),
        productIds: products.map(x => x.settingId),
        subProductIds: products.map(x => x.subSettingId),
        betTypeIds: products.map(x => x.subSettingIdLevel3)
      };
    });

    _defineProperty(this, "handleGroupCategory", data => {
      return data.reduce((accumulator, currentValue) => {
        const itemExist = accumulator.find(item => currentValue.settingId === item.settingId);

        if (itemExist) {
          itemExist.subSettingId = [...itemExist.subSettingId, currentValue.subSettingId];
        } else {
          accumulator.push({
            settingId: currentValue.settingId,
            subSettingId: [currentValue.subSettingId]
          });
        }

        return accumulator;
      }, []);
    });

    _defineProperty(this, "renderCategory", item => {
      const {
        mainCategories
      } = this.props.communicationLogs;
      const groupCategory = this.handleGroupCategory(item.settings);
      return groupCategory.map((value, key) => {
        const filterMainCategory = mainCategories.find(element => element.settingId === value.settingId);
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], {
          key: key
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "font-weight-bold"
        }, filterMainCategory.settingValue), value.subSettingId.map((elementId, index) => {
          const filterSubCategory = filterMainCategory.childSettings.find(element => element.subCategoryId === elementId);
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            key: index,
            className: "ml-3 font-italic"
          }, filterSubCategory === null || filterSubCategory === void 0 ? void 0 : filterSubCategory.name);
        }));
      });
    });

    _defineProperty(this, "renderRow", (item, index) => {
      const cssStatus = item.status ? item.status.toLowerCase() : '';
      const cssColor = cssStatus !== 'closed' && cssStatus !== 'pending' ? '' : cssStatus;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Row"], {
        key: index,
        className: cssColor
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: "text-left"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "link-detail",
        onClick: () => this.handleShowEditCommunication(item.feedbackId)
      }, item.feedbackId)), this.props.isHost ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: "text-center"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "fa fa-pencil rounded-circle icon-edit",
        onClick: () => this.handleShowNoOfInquiry(item.feedbackId)
      })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: "text-center"
      }, _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_8__["default"].toShortDateTimeFormat(item.feedbackDate)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], null, this.renderCategory(item)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], null, item.subject), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: "text-center"
      }, item.status), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: "text-center"
      }, item.duration.replace(/\s+/g, '')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: "text-left"
      }, item.handler), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: "text-left"
      }, item.reviewer), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: "text-center"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Button"], {
        variant: "primary",
        size: "sm",
        onClick: () => this.handleShowCreateCommunication(item.feedbackId)
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Duplicate'))));
    });
  }

  componentDidMount() {
    this.props.getCommunicationLogs({
      customerId: this.props.id
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      this.props.getCommunicationLogs({
        customerId: this.props.id
      });
    }
  }

  render() {
    const {
      communicationLogs
    } = this.props;

    if (!communicationLogs) {
      return null;
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "communication-log-grid"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "d-flex table-title align-items-center justify-content-between mt-3"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('LastTenCommunicationLog'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Table"], {
      width: 1200,
      autoWidth: false,
      header: this.buildHeader(),
      body: this.buildBody(),
      containerPadding: 0,
      adjustedHeight: 10
    }));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_3__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    communicationLogs
  } = state;
  return {
    communicationLogs
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(DataGridCommunication));

/***/ }),

/***/ "./www/sources/js/pages/dashboard/components/DataGridRedemption.jsx":
/*!**************************************************************************!*\
  !*** ./www/sources/js/pages/dashboard/components/DataGridRedemption.jsx ***!
  \**************************************************************************/
/*! exports provided: DataGridRedemption, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataGridRedemption", function() { return DataGridRedemption; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/dashboard/actions.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/components/react-grid/index */ "./www/sources/js/components/react-grid/index.jsx");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/common/dateTimeService */ "./www/sources/js/common/dateTimeService.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








class DataGridRedemption extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "buildHeader", () => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderRow"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 60
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Subject')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 20
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('ClaimedTime')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 20
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Currency')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 20
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Amount')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 25
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('DoneBy')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 20
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Status')));
    });

    _defineProperty(this, "buildBody", () => {
      const {
        redemptions
      } = this.props;

      if (redemptions.length > 0) {
        return redemptions.map((item, index) => this.renderRow(item, index));
      }

      return [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Row"], {
        key: `body${1}`,
        className: "no-data"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: "text-center",
        colSpan: 6
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('ThereIsNoData')))];
    });

    _defineProperty(this, "handleEditRedemptionLog", id => {
      this.props.setEditRedemptionDialog({
        show: true,
        redemptionId: id
      });
    });

    _defineProperty(this, "renderRow", (item, index) => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Row"], {
        key: index
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: "text-left"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "link-detail",
        onClick: () => this.handleEditRedemptionLog(item.id)
      }, item.subject)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: "text-center"
      }, _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__["default"].toShortDateFormat(item.claimTime)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: "text-center"
      }, item.currency), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: "text-right"
      }, `${item.amount}.00`), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: "text-left"
      }, item.doneBy), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: "text-center"
      }, item.status));
    });
  }

  componentDidMount() {
    this.props.getRedemptionLogs({
      customerId: this.props.id
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      this.props.getRedemptionLogs({
        customerId: this.props.id
      });
    }
  }

  render() {
    const {
      redemptions
    } = this.props;

    if (!redemptions) {
      return null;
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "redemption-grid"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "table-title d-flex align-items-center justify-content-between"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('LastFiveRedemptionLog'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Table"], {
      width: 980,
      autoWidth: false,
      containerPadding: 0,
      adjustedHeight: 10,
      header: this.buildHeader(),
      body: this.buildBody()
    }));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_3__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    redemptions
  } = state;
  return {
    redemptions
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(DataGridRedemption));

/***/ }),

/***/ "./www/sources/js/pages/dashboard/components/DataGridRemark.jsx":
/*!**********************************************************************!*\
  !*** ./www/sources/js/pages/dashboard/components/DataGridRemark.jsx ***!
  \**********************************************************************/
/*! exports provided: DataGridRemark, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataGridRemark", function() { return DataGridRemark; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/dashboard/actions.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/components/react-grid/index */ "./www/sources/js/components/react-grid/index.jsx");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








class DataGridRemark extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "buildBody", () => {
      const {
        customerRemarks
      } = this.props;

      if (customerRemarks.length > 0) {
        return customerRemarks.map((item, index) => this.renderRow(item, index));
      }

      return [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Row"], {
        key: `body${1}`,
        className: "no-data"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: "text-center",
        colSpan: 1
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('ThereIsNoData')))];
    });

    _defineProperty(this, "renderRow", (item, index) => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Row"], {
        key: index
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        dangerouslySetInnerHTML: {
          __html: index + 1 + ". " + item
        }
      })));
    });
  }

  componentDidMount() {
    this.props.getCustomerRemarks({
      customerId: this.props.id
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      this.props.getCustomerRemarks({
        customerId: this.props.id
      });
    }
  }

  render() {
    const {
      customerRemarks
    } = this.props;

    if (!customerRemarks) {
      return null;
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "table-title d-flex justify-content-between align-items-center"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('LastFiveSpecialRemark'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Table"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", null, this.buildBody())));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_3__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    customerRemarks
  } = state;
  return {
    customerRemarks
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(DataGridRemark));

/***/ }),

/***/ "./www/sources/js/pages/dashboard/components/EditCustomerInfoVerify.jsx":
/*!******************************************************************************!*\
  !*** ./www/sources/js/pages/dashboard/components/EditCustomerInfoVerify.jsx ***!
  \******************************************************************************/
/*! exports provided: EditCustomerInfoVerify, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditCustomerInfoVerify", function() { return EditCustomerInfoVerify; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/dashboard/actions.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var _jsroot_components_DraggableModalDialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/components/DraggableModalDialog */ "./www/sources/js/components/DraggableModalDialog.jsx");
/* harmony import */ var _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/common/dateTimeService */ "./www/sources/js/common/dateTimeService.js");
/* harmony import */ var _jsroot_components_ResponseMessage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/components/ResponseMessage */ "./www/sources/js/components/ResponseMessage.jsx");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var _jsroot_common_site__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @jsroot/common/site */ "./www/sources/js/common/site.js");
/* harmony import */ var _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @jsroot/common/constants */ "./www/sources/js/common/constants.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }












class EditCustomerInfoVerify extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleChange", index => {
      const data = [...this.state.data];
      data[index].isChecked = !data[index].isChecked;
      this.setState({
        data: data
      });
    });

    _defineProperty(this, "handleSubmit", event => {
      event.preventDefault();
      const {
        data
      } = this.state;
      const params = {
        customerId: this.props.id,
        isVerifyEmail: data[0].isChecked,
        isVerifyPassport: data[1].isChecked,
        isVerifyBirthday: data[2].isChecked,
        isVerifySecretCode: data[3].isChecked
      };
      _jsroot_common_site__WEBPACK_IMPORTED_MODULE_9__["default"].blockUI();
      this.setState({
        isSubmitting: true
      });
      this.props.editCustomerVerify(params).then(response => {
        _jsroot_common_site__WEBPACK_IMPORTED_MODULE_9__["default"].unblockUI();
        this.setState({
          editResult: response.data
        });

        if (response.data.isSuccessful) {
          setTimeout(() => {
            this.props.onClose(true);
          }, 3000);
        } else {
          this.setState({
            isSubmitting: false
          });
        }
      });
    });

    this.state = {
      data: [],
      isSubmitting: false,
      editResult: null
    };
  }

  componentDidMount() {
    const info = this.props.customerInfoVerify;
    const data = [];
    data.push({
      name: 'Email',
      value: info.email,
      isChecked: info.isVerifyEmail
    });
    data.push({
      name: 'Passport Number',
      value: info.passport,
      isChecked: info.isVerifyPassport
    });
    data.push({
      name: 'BirthDay',
      value: _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__["default"].toShortDateFormat(info.birthDay),
      isChecked: info.isVerifyBirthday
    });
    data.push({
      name: 'Secret Code',
      value: info.secretCode,
      isChecked: info.isVerifySecretCode
    });
    this.setState({
      data: data
    });
  }

  render() {
    const {
      customerInfoVerify,
      isHost
    } = this.props;
    const {
      data,
      isSubmitting,
      editResult
    } = this.state;

    if (!customerInfoVerify || !data) {
      return null;
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"], {
      show: true,
      className: "customer-modal-dialog",
      dialogAs: _jsroot_components_DraggableModalDialog__WEBPACK_IMPORTED_MODULE_5__["default"],
      backdrop: "static",
      keyboard: false,
      size: "md",
      centered: true,
      onHide: this.props.onClose
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Header, {
      closeButton: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Title, {
      as: "div"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('VerifyCustomerInfo'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"], {
      onSubmit: this.handleSubmit
    }, editResult && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_ResponseMessage__WEBPACK_IMPORTED_MODULE_7__["default"], {
      isSuccessful: editResult.isSuccessful,
      message: editResult.message || _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('UpdateVerifyFlagSuccessfully')
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Body, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Table"], {
      bordered: true,
      hover: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", null, data.map((item, key) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
      key: key
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "check-customer"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      type: "checkbox",
      checked: item.isChecked,
      onChange: () => this.handleChange(key)
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "check-name"
    }, item.name))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
      className: item.name === 'Email' ? 'label-email' : ''
    }, item.value)))))), isHost && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Footer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], {
      size: "sm",
      variant: "primary",
      type: "submit",
      onClick: this.handleSubmit,
      disabled: isSubmitting
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('Save'))))));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_3__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    customerInfoVerify
  } = state;
  return {
    customerInfoVerify
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(EditCustomerInfoVerify));

/***/ }),

/***/ "./www/sources/js/pages/dashboard/dashboardSlice.js":
/*!**********************************************************!*\
  !*** ./www/sources/js/pages/dashboard/dashboardSlice.js ***!
  \**********************************************************/
/*! exports provided: setCustomerRemarks, setRedemptionLogs, setEditRedemptionDialog, setCommunicationLogs, setNoOfInquiryDialog, setEditCommunicationDialog, setCreateCommunicationDialog, setCustomerInfoVerify, setEditCustomerVerifyDialog, resetState, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setCustomerRemarks", function() { return setCustomerRemarks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setRedemptionLogs", function() { return setRedemptionLogs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setEditRedemptionDialog", function() { return setEditRedemptionDialog; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setCommunicationLogs", function() { return setCommunicationLogs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setNoOfInquiryDialog", function() { return setNoOfInquiryDialog; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setEditCommunicationDialog", function() { return setEditCommunicationDialog; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setCreateCommunicationDialog", function() { return setCreateCommunicationDialog; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setCustomerInfoVerify", function() { return setCustomerInfoVerify; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setEditCustomerVerifyDialog", function() { return setEditCustomerVerifyDialog; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetState", function() { return resetState; });
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @reduxjs/toolkit */ "./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");

const initialState = {
  customerRemarks: null,
  redemptions: null,
  editRedemptionDialog: {
    show: false
  },
  communicationLogs: null,
  noOfInquiryDialog: {
    show: false
  },
  editCommunicationDialog: {
    show: false
  },
  createCommunicationDialog: {
    show: false
  },
  customerInfoVerify: null,
  editCustomerVerifyDialog: {
    show: false
  }
};
const dashboardSlice = Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__["createSlice"])({
  name: 'dashboard',
  initialState: initialState,
  reducers: {
    resetState: () => initialState,
    setCustomerRemarks: (state, action) => {
      state.customerRemarks = action.payload;
    },
    setRedemptionLogs: (state, action) => {
      state.redemptions = action.payload;
    },
    setEditRedemptionDialog: (state, action) => {
      state.editRedemptionDialog = action.payload;
    },
    setCommunicationLogs: (state, action) => {
      state.communicationLogs = action.payload;
    },
    setNoOfInquiryDialog: (state, action) => {
      state.noOfInquiryDialog = action.payload;
    },
    setEditCommunicationDialog: (state, action) => {
      state.editCommunicationDialog = action.payload;
    },
    setCreateCommunicationDialog: (state, action) => {
      state.createCommunicationDialog = action.payload;
    },
    setCustomerInfoVerify: (state, action) => {
      state.customerInfoVerify = action.payload;
    },
    setEditCustomerVerifyDialog: (state, action) => {
      state.editCustomerVerifyDialog = action.payload;
    }
  }
});
const {
  actions,
  reducer
} = dashboardSlice;
const {
  setCustomerRemarks,
  setRedemptionLogs,
  setEditRedemptionDialog,
  setCommunicationLogs,
  setNoOfInquiryDialog,
  setEditCommunicationDialog,
  setCreateCommunicationDialog,
  setCustomerInfoVerify,
  setEditCustomerVerifyDialog,
  resetState
} = actions;
/* harmony default export */ __webpack_exports__["default"] = (reducer);

/***/ }),

/***/ "./www/sources/js/pages/dashboard/index.js":
/*!*************************************************!*\
  !*** ./www/sources/js/pages/dashboard/index.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @reduxjs/toolkit */ "./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");
/* harmony import */ var _dashboardSlice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dashboardSlice */ "./www/sources/js/pages/dashboard/dashboardSlice.js");
/* harmony import */ var _components_AppContainer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/AppContainer */ "./www/sources/js/pages/dashboard/components/AppContainer.jsx");
/* harmony import */ var _jsroot_components_WithNavigation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/components/WithNavigation */ "./www/sources/js/components/WithNavigation.jsx");
/* harmony import */ var _cssroot_pages_dashboard_index_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @cssroot/pages/dashboard/index.scss */ "./www/sources/css/pages/dashboard/index.scss");
/* harmony import */ var _cssroot_pages_dashboard_index_scss__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_cssroot_pages_dashboard_index_scss__WEBPACK_IMPORTED_MODULE_6__);






const store = Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__["configureStore"])({
  reducer: _dashboardSlice__WEBPACK_IMPORTED_MODULE_3__["default"]
});


class index extends react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"] {
  render() {
    const location = this.props.location;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_1__["Provider"], {
      store: store
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "dashboard"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_AppContainer__WEBPACK_IMPORTED_MODULE_4__["default"], {
      custId: !location.state ? null : location.state.toString()
    })));
  }

}

const FunctionBarWithNavigation = Object(_jsroot_components_WithNavigation__WEBPACK_IMPORTED_MODULE_5__["default"])(index);
/* harmony default export */ __webpack_exports__["default"] = (FunctionBarWithNavigation);

/***/ })

}]);
//# sourceMappingURL=7.chunk.js.map