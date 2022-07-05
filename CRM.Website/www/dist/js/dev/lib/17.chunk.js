(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[17],{

/***/ "./www/sources/css/pages/redemption/index.scss":
/*!*****************************************************!*\
  !*** ./www/sources/css/pages/redemption/index.scss ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./www/sources/js/pages/redemption/actions.js":
/*!****************************************************!*\
  !*** ./www/sources/js/pages/redemption/actions.js ***!
  \****************************************************/
/*! exports provided: ActionCreators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionCreators", function() { return ActionCreators; });
/* harmony import */ var _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/common/dataService */ "./www/sources/js/common/dataService.js");
/* harmony import */ var _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/common/site */ "./www/sources/js/common/site.js");
/* harmony import */ var _redemptionSlice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./redemptionSlice */ "./www/sources/js/pages/redemption/redemptionSlice.js");




const getLogsByCustomerId = params => async dispatch => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('Redemption/GetLogsByCustomerId');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__["default"].postDataAsync(url, params).then(response => {
    dispatch(Object(_redemptionSlice__WEBPACK_IMPORTED_MODULE_2__["setLogsByCustomerId"])(response.data));
  });
};

const getAllStatus = () => async dispatch => {
  _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].blockUI();
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl(`Redemption/GetAllStatus?isEdit=true`);
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__["default"].getDataAsync(url).then(response => {
    dispatch(Object(_redemptionSlice__WEBPACK_IMPORTED_MODULE_2__["setAllStatus"])(response.data));
  }).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].unblockUI());
};

const getLogById = params => async dispatch => {
  _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].blockUI();
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('Redemption/GetLogById');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__["default"].getDataAsync(url, params).then(response => {
    dispatch(Object(_redemptionSlice__WEBPACK_IMPORTED_MODULE_2__["setLogById"])(response.data));
  }).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].unblockUI());
};

const editRedemptionLog = params => async () => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('Redemption/EditRedemptionLog');
  return await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__["default"].postDataAsync(url, params).then(response => response);
};

const getSettings = () => async dispatch => {
  _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].blockUI();
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl(`Redemption/GetAllStatus?isEdit=false`);
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__["default"].getDataAsync(url).then(response => {
    dispatch(Object(_redemptionSlice__WEBPACK_IMPORTED_MODULE_2__["setSettings"])(response.data));
  }).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].unblockUI());
};

const createRedemptionLog = params => async () => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('Redemption/CreateRedemptionLog');
  return await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__["default"].postDataAsync(url, params).then(response => response);
};

const ActionCreators = {
  resetState: _redemptionSlice__WEBPACK_IMPORTED_MODULE_2__["resetState"],
  getLogsByCustomerId,
  setLogsByCustomerId: _redemptionSlice__WEBPACK_IMPORTED_MODULE_2__["setLogsByCustomerId"],
  getAllStatus,
  getLogById,
  setGridParams: _redemptionSlice__WEBPACK_IMPORTED_MODULE_2__["setGridParams"],
  setEditRedemptionDialog: _redemptionSlice__WEBPACK_IMPORTED_MODULE_2__["setEditRedemptionDialog"],
  editRedemptionLog,
  getSettings,
  setCreateRedemptionDialog: _redemptionSlice__WEBPACK_IMPORTED_MODULE_2__["setCreateRedemptionDialog"],
  createRedemptionLog
};

/***/ }),

/***/ "./www/sources/js/pages/redemption/components/AppContainer.jsx":
/*!*********************************************************************!*\
  !*** ./www/sources/js/pages/redemption/components/AppContainer.jsx ***!
  \*********************************************************************/
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
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/redemption/actions.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _DataGrid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DataGrid */ "./www/sources/js/pages/redemption/components/DataGrid.jsx");
/* harmony import */ var _Filter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Filter */ "./www/sources/js/pages/redemption/components/Filter.jsx");
/* harmony import */ var _EditRedemptionLog__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./EditRedemptionLog */ "./www/sources/js/pages/redemption/components/EditRedemptionLog.jsx");
/* harmony import */ var _CreateRedemptionLog__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./CreateRedemptionLog */ "./www/sources/js/pages/redemption/components/CreateRedemptionLog.jsx");
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @reduxjs/toolkit */ "./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");
/* harmony import */ var _redemptionSlice__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../redemptionSlice */ "./www/sources/js/pages/redemption/redemptionSlice.js");
/* harmony import */ var _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @jsroot/common/constants */ "./www/sources/js/common/constants.js");
/* harmony import */ var _jsroot_common_shareScripts__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @jsroot/common/shareScripts */ "./www/sources/js/common/shareScripts.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }















const store = Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_9__["configureStore"])({
  reducer: _redemptionSlice__WEBPACK_IMPORTED_MODULE_10__["default"]
});
class AppContainer extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleCloseEditRedemptionDialog", isSuccessful => {
      this.props.setEditRedemptionDialog({
        show: false
      });

      if (isSuccessful) {
        this.props.getLogsByCustomerId(this.props.gridParams);
      }
    });

    _defineProperty(this, "handleCloseCreateRedemptionDialog", isSuccessful => {
      this.props.setCreateRedemptionDialog({
        show: false
      });

      if (isSuccessful) {
        this.props.getLogsByCustomerId(this.props.gridParams);
      }
    });

    this.state = {
      createUpdateFeedbackPermission: null
    };
  }

  componentDidMount() {
    Object(_jsroot_common_shareScripts__WEBPACK_IMPORTED_MODULE_12__["getPermission"])(_jsroot_common_constants__WEBPACK_IMPORTED_MODULE_11__["FunctionKey"].CreateUpdateFeedbackAndCustomerInfo).then(response => {
      this.setState({
        createUpdateFeedbackPermission: response
      });
    });
  }

  componentWillUnmount() {
    this.props.resetState();
  }

  render() {
    if (!this.state.createUpdateFeedbackPermission) {
      return null;
    }

    const {
      editRedemptionDialog,
      createRedemptionDialog
    } = this.props;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_2__["Provider"], {
      store: store
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Filter__WEBPACK_IMPORTED_MODULE_6__["default"], {
      id: this.props.id
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DataGrid__WEBPACK_IMPORTED_MODULE_5__["default"], {
      createUpdateFeedbackPermission: this.state.createUpdateFeedbackPermission
    }), editRedemptionDialog.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_EditRedemptionLog__WEBPACK_IMPORTED_MODULE_7__["default"], {
      logId: editRedemptionDialog.logId,
      createUpdateFeedbackPermission: this.state.createUpdateFeedbackPermission,
      onClose: this.handleCloseEditRedemptionDialog
    }), createRedemptionDialog.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_CreateRedemptionLog__WEBPACK_IMPORTED_MODULE_8__["default"], {
      logId: createRedemptionDialog.logId,
      id: this.props.id,
      onClose: this.handleCloseCreateRedemptionDialog
    }));
  }

}

_defineProperty(AppContainer, "propTypes", {
  editRedemptionDialog: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    show: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool
  }).isRequired,
  createRedemptionDialog: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    show: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool
  }).isRequired
});

_defineProperty(AppContainer, "defaultProps", {
  editRedemptionDialog: {
    show: false
  },
  createRedemptionDialog: {
    show: false
  }
});

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_4__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    gridParams,
    editRedemptionDialog,
    createRedemptionDialog
  } = state;
  return {
    gridParams,
    editRedemptionDialog,
    createRedemptionDialog
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(AppContainer));

/***/ }),

/***/ "./www/sources/js/pages/redemption/components/CreateRedemptionLog.jsx":
/*!****************************************************************************!*\
  !*** ./www/sources/js/pages/redemption/components/CreateRedemptionLog.jsx ***!
  \****************************************************************************/
/*! exports provided: CreateRedemptionLog, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateRedemptionLog", function() { return CreateRedemptionLog; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/redemption/actions.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! formik */ "./node_modules/formik/dist/formik.esm.js");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var _jsroot_common_site__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/common/site */ "./www/sources/js/common/site.js");
/* harmony import */ var _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jsroot/common/dateTimeService */ "./www/sources/js/common/dateTimeService.js");
/* harmony import */ var _jsroot_components_DraggableModalDialog__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @jsroot/components/DraggableModalDialog */ "./www/sources/js/components/DraggableModalDialog.jsx");
/* harmony import */ var _jsroot_components_FormikErrorMessage__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @jsroot/components/FormikErrorMessage */ "./www/sources/js/components/FormikErrorMessage.jsx");
/* harmony import */ var _jsroot_components_ResponseMessage__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @jsroot/components/ResponseMessage */ "./www/sources/js/components/ResponseMessage.jsx");
/* harmony import */ var _common_functions__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../common.functions */ "./www/sources/js/pages/redemption/common.functions.js");
/* harmony import */ var _CreateEditForm__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./CreateEditForm */ "./www/sources/js/pages/redemption/components/CreateEditForm.jsx");
/* harmony import */ var _jsroot_components_ConfirmPopup__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @jsroot/components/ConfirmPopup */ "./www/sources/js/components/ConfirmPopup.jsx");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
















class CreateRedemptionLog extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "initFormikData", () => {
      const currentClientTime = window.currentClientTime;
      return {
        subject: '',
        claimTime: new Date(_jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_8__["default"].toShortDateTimeFormat(new Date(currentClientTime))),
        remark: '',
        statusId: this.props.settings.statuses[0].statusId,
        currencyId: 0,
        amount: 0,
        doneBy: ''
      };
    });

    _defineProperty(this, "handleSubmit", (values, {
      setSubmitting
    }) => {
      setSubmitting(true);
      _jsroot_common_site__WEBPACK_IMPORTED_MODULE_7__["default"].blockUI();
      const params = {
        customerId: this.props.id,
        subject: values.subject,
        remark: values.remark,
        claimTime: _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_8__["default"].toLongDateTimeFormat(_jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_8__["default"].toServerDateTime(values.claimTime)),
        amount: parseInt(values.amount, 10),
        doneBy: values.doneBy,
        statusId: parseInt(values.statusId, 10),
        currencyId: parseInt(values.currencyId, 10)
      };
      this.props.createRedemptionLog(params).then(response => {
        _jsroot_common_site__WEBPACK_IMPORTED_MODULE_7__["default"].unblockUI();
        this.setState({
          createRedemptionResult: response.data
        });

        if (response.data.isSuccessful) {
          setTimeout(() => {
            this.props.onClose(true);
          }, 3000);
        } else {
          setSubmitting(false);
        }
      });
    });

    _defineProperty(this, "isNewEqualOldId", () => {
      const initDataCreate = this.initFormikData();
      const {
        values
      } = this.formik;

      if (initDataCreate.currencyId !== parseInt(values.currencyId, 10) || initDataCreate.statusId !== parseInt(values.statusId, 10)) {
        return true;
      }

      return false;
    });

    _defineProperty(this, "isNewEqualOldValue", () => {
      const initDataCreate = this.initFormikData();
      const {
        values
      } = this.formik;

      if (initDataCreate.amount !== values.amount || initDataCreate.doneBy !== values.doneBy || initDataCreate.remark !== values.remark || initDataCreate.subject !== values.subject) {
        return true;
      }

      return false;
    });

    _defineProperty(this, "onCloseCreatePopup", () => {
      if (this.isNewEqualOldId() || this.isNewEqualOldValue()) {
        this.setState({
          isShowCreateConfirm: true
        });
      } else {
        this.props.onClose(false);
      }
    });

    _defineProperty(this, "closeCreateConfirm", () => {
      this.setState({
        isShowCreateConfirm: false
      });
    });

    _defineProperty(this, "renderForm", ({
      errors,
      values,
      handleChange,
      touched,
      setFieldValue,
      handleSubmit,
      isSubmitting
    }) => {
      const {
        createRedemptionResult
      } = this.state;
      const {
        settings
      } = this.props;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"], {
        noValidate: true,
        onSubmit: handleSubmit
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Body, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_FormikErrorMessage__WEBPACK_IMPORTED_MODULE_10__["default"], {
        touched: touched,
        errors: errors,
        fieldNames: Object.keys(values)
      }), createRedemptionResult && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_ResponseMessage__WEBPACK_IMPORTED_MODULE_11__["default"], {
        isSuccessful: createRedemptionResult.isSuccessful,
        message: createRedemptionResult.message || _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('CreateRedemptionLogSuccessfully')
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_CreateEditForm__WEBPACK_IMPORTED_MODULE_13__["default"], {
        statuses: settings,
        values,
        errors,
        touched,
        setFieldValue,
        handleChange
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Footer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], {
        type: "submit",
        variant: "primary",
        size: "sm",
        disabled: isSubmitting
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Save'))));
    });

    this.state = {
      createRedemptionResult: '',
      isShowCreateConfirm: false
    };
  }

  componentDidMount() {
    this.props.getSettings();
  }

  render() {
    const {
      settings
    } = this.props;

    if (settings === null) {
      return null;
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"], {
      className: "modal-edit-redemption",
      show: true,
      dialogAs: _jsroot_components_DraggableModalDialog__WEBPACK_IMPORTED_MODULE_9__["default"],
      backdrop: "static",
      keyboard: false,
      centered: true,
      size: "xl",
      onHide: this.onCloseCreatePopup
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Header, {
      closeButton: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Title, {
      as: "div"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('CreateRedemptionLog'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_5__["Formik"], {
      innerRef: el => this.formik = el,
      initialValues: this.initFormikData(),
      validate: values => Object(_common_functions__WEBPACK_IMPORTED_MODULE_12__["validateFormik"])(values),
      onSubmit: this.handleSubmit
    }, this.renderForm), this.state.isShowCreateConfirm && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_ConfirmPopup__WEBPACK_IMPORTED_MODULE_14__["default"], {
      size: "md",
      onClose: this.closeCreateConfirm,
      onSubmit: () => this.props.onClose(false),
      title: _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('ConfirmIgnoreChanges'),
      content: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].formatString(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('ThereAreSomeChangesOnInput'), 'redemption')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('ConfirmIgnoreTheseChanges')))
    })));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_3__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    settings
  } = state;
  return {
    settings
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(CreateRedemptionLog));

/***/ }),

/***/ "./www/sources/js/pages/redemption/components/DataGrid.jsx":
/*!*****************************************************************!*\
  !*** ./www/sources/js/pages/redemption/components/DataGrid.jsx ***!
  \*****************************************************************/
/*! exports provided: DataGrid, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataGrid", function() { return DataGrid; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/redemption/actions.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/components/react-grid/index */ "./www/sources/js/components/react-grid/index.jsx");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/common/dateTimeService */ "./www/sources/js/common/dateTimeService.js");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jsroot/common/constants */ "./www/sources/js/common/constants.js");
/* harmony import */ var _jsroot_common_shareScripts__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @jsroot/common/shareScripts */ "./www/sources/js/common/shareScripts.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }











class DataGrid extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "buildHeader", () => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderRow"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 50,
        sortOrder: "desc",
        sortBy: "Subject"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Subject')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 25,
        sortOrder: "desc",
        sortBy: "Time"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('ClaimedTime')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 20,
        sortOrder: "desc",
        sortBy: "Currency"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Currency')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 20,
        sortOrder: "desc",
        sortBy: "Amount"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Amount')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 25,
        sortOrder: "desc",
        sortBy: "DoneBy"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('DoneBy')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 20,
        sortOrder: "desc",
        sortBy: "Status"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Status')));
    });

    _defineProperty(this, "buildBody", () => {
      const {
        redemptionLogs
      } = this.props;

      if (redemptionLogs.length > 0) {
        return redemptionLogs.map((item, index) => this.renderRow(item, index));
      }

      return [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Row"], {
        key: `body${1}`,
        className: "no-data"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: "text-center",
        colSpan: 6
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('ThereIsNoData')))];
    });

    _defineProperty(this, "onSort", (sortBy, sortOrder) => {
      const {
        redemptionLogs
      } = this.props;
      const cloneGridData = [...redemptionLogs];
      const gridDataSortAsc = Object(_jsroot_common_shareScripts__WEBPACK_IMPORTED_MODULE_9__["handleSort"])(cloneGridData, sortBy, sortOrder);
      this.props.setLogsByCustomerId(gridDataSortAsc);
    });

    _defineProperty(this, "handleEditRedemptionLog", id => {
      this.props.setEditRedemptionDialog({
        show: true,
        logId: id
      });
    });

    _defineProperty(this, "handleCreateRedemptionLog", () => {
      this.props.setCreateRedemptionDialog({
        show: true
      });
    });

    _defineProperty(this, "renderRow", (item, index) => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Row"], {
        key: index
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: "text-left"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "link-click",
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

    this.sortDesc = true;
  }

  render() {
    const {
      redemptionLogs
    } = this.props;

    if (!redemptionLogs) {
      return null;
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "table-title d-flex justify-content-between align-items-center"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('CustomerRedemptionLogs'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Table"], {
      width: 1200,
      autoWidth: false,
      onSort: this.onSort,
      header: this.buildHeader(),
      body: this.buildBody(),
      containerPadding: 0,
      adjustedHeight: 10
    }), this.props.createUpdateFeedbackPermission === _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_8__["Policy"].Host && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Button"], {
      variant: "primary",
      size: "sm",
      className: "mt-3",
      onClick: () => this.handleCreateRedemptionLog()
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('InsertCase')));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_3__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    redemptionLogs
  } = state;
  return {
    redemptionLogs
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(DataGrid));

/***/ }),

/***/ "./www/sources/js/pages/redemption/components/Filter.jsx":
/*!***************************************************************!*\
  !*** ./www/sources/js/pages/redemption/components/Filter.jsx ***!
  \***************************************************************/
/*! exports provided: Filter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Filter", function() { return Filter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/redemption/actions.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/common/dateTimeService */ "./www/sources/js/common/dateTimeService.js");
/* harmony import */ var _jsroot_components_date_picker_index__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/components/date-picker/index */ "./www/sources/js/components/date-picker/index.jsx");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









class Filter extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleChangeToDate", toDate => {
      this.setState({
        toDate: toDate,
        maxFromDate: toDate
      });
    });

    _defineProperty(this, "handleChangeFromDate", fromDate => {
      this.setState({
        fromDate: fromDate,
        minToDate: fromDate
      });
    });

    _defineProperty(this, "handleChange", event => {
      const name = event.target.name;
      this.setState({
        [name]: event.target.type === 'select-one' ? parseInt(event.target.value, 10) : event.target.value
      });
    });

    _defineProperty(this, "handleSubmit", event => {
      event.preventDefault();
      const {
        statusId,
        fromDate,
        toDate
      } = this.state;
      const params = {
        customerId: this.props.id,
        fromDate: _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__["default"].toLongDateTimeFormat(fromDate),
        toDate: _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__["default"].toLongDateTimeFormat(toDate),
        statusId: statusId
      };
      this.props.getLogsByCustomerId(params);
    });

    const currentClientTime = window.currentClientTime;
    const date = new Date();
    const currentDate = new Date(_jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__["default"].toShortDateTimeFormat(new Date(currentClientTime)));

    const _fromDate = new Date(_jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__["default"].firstDayOfMonth(date));

    this.state = {
      fromDate: _fromDate,
      maxFromDate: currentDate,
      minFromDate: '',
      toDate: currentDate,
      maxToDate: '',
      minToDate: _fromDate,
      statusId: 0
    };
  }

  componentDidMount() {
    const {
      fromDate,
      toDate
    } = this.state;
    const params = {
      customerId: this.props.id,
      fromDate: _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__["default"].toLongDateTimeFormat(fromDate),
      toDate: _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__["default"].toLongDateTimeFormat(toDate),
      statusId: 0
    };
    this.props.setGridParams(params);
    this.props.getLogsByCustomerId(params);
    this.props.getAllStatus();
  }

  render() {
    const {
      allStatus
    } = this.props;

    if (!allStatus) {
      return null;
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"], {
      onSubmit: this.handleSubmit,
      className: "form-filter"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Row, {
      bsPrefix: "form-row"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
      htmlFor: "formDate",
      className: "col-auto col-form-label"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('FromDate')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "react-datepicker-wrapper-container"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_date_picker_index__WEBPACK_IMPORTED_MODULE_7__["default"], {
      dropdownMode: "select",
      showMonthDropdown: true,
      showYearDropdown: true,
      selected: this.state.fromDate,
      maxDate: this.state.maxFromDate,
      minDate: this.state.minFromDate,
      onChange: value => this.handleChangeFromDate(value)
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
      htmlFor: "toDate",
      className: "col-auto col-form-label"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('ToDate')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "react-datepicker-wrapper-container"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_date_picker_index__WEBPACK_IMPORTED_MODULE_7__["default"], {
      dropdownMode: "select",
      showMonthDropdown: true,
      showYearDropdown: true,
      selected: this.state.toDate,
      maxDate: this.state.maxToDate,
      minDate: this.state.minToDate,
      onChange: value => this.handleChangeToDate(value)
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
      htmlFor: "status",
      className: "col-auto col-form-label"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Status')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
      as: "select",
      size: "sm",
      className: "shadow-none",
      name: "statusId",
      onChange: this.handleChange
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
      value: "0"
    }, "All"), allStatus.statuses.map((value, key) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
      key: key,
      value: value.statusId
    }, value.name)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "form-group-button"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], {
      type: "submit",
      variant: "primary",
      size: "sm"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Submit')))));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_3__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    allStatus
  } = state;
  return {
    allStatus
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(Filter));

/***/ }),

/***/ "./www/sources/js/pages/redemption/index.js":
/*!**************************************************!*\
  !*** ./www/sources/js/pages/redemption/index.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @reduxjs/toolkit */ "./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");
/* harmony import */ var _redemptionSlice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./redemptionSlice */ "./www/sources/js/pages/redemption/redemptionSlice.js");
/* harmony import */ var _components_AppContainer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/AppContainer */ "./www/sources/js/pages/redemption/components/AppContainer.jsx");
/* harmony import */ var _jsroot_components_WithNavigation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/components/WithNavigation */ "./www/sources/js/components/WithNavigation.jsx");
/* harmony import */ var _cssroot_pages_redemption_index_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @cssroot/pages/redemption/index.scss */ "./www/sources/css/pages/redemption/index.scss");
/* harmony import */ var _cssroot_pages_redemption_index_scss__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_cssroot_pages_redemption_index_scss__WEBPACK_IMPORTED_MODULE_6__);






const store = Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__["configureStore"])({
  reducer: _redemptionSlice__WEBPACK_IMPORTED_MODULE_3__["default"]
});


class index extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  render() {
    const location = this.props.location;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_1__["Provider"], {
      store: store
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "redemption"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_AppContainer__WEBPACK_IMPORTED_MODULE_4__["default"], {
      id: !location.state ? null : location.state.toString()
    })));
  }

}

const FunctionBarWithNavigation = Object(_jsroot_components_WithNavigation__WEBPACK_IMPORTED_MODULE_5__["default"])(index);
/* harmony default export */ __webpack_exports__["default"] = (FunctionBarWithNavigation);

/***/ }),

/***/ "./www/sources/js/pages/redemption/redemptionSlice.js":
/*!************************************************************!*\
  !*** ./www/sources/js/pages/redemption/redemptionSlice.js ***!
  \************************************************************/
/*! exports provided: resetState, setLogsByCustomerId, setAllStatus, setLogById, setGridParams, setEditRedemptionDialog, setSettings, setCreateRedemptionDialog, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetState", function() { return resetState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setLogsByCustomerId", function() { return setLogsByCustomerId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setAllStatus", function() { return setAllStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setLogById", function() { return setLogById; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setGridParams", function() { return setGridParams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setEditRedemptionDialog", function() { return setEditRedemptionDialog; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSettings", function() { return setSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setCreateRedemptionDialog", function() { return setCreateRedemptionDialog; });
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @reduxjs/toolkit */ "./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");

const initialState = {
  redemptionLogs: null,
  allStatus: null,
  redemptionLog: null,
  gridParams: null,
  editRedemptionDialog: {
    show: false
  },
  settings: null,
  createRedemptionDialog: {
    show: false
  }
};
const redemptionSlice = Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__["createSlice"])({
  name: 'redemption',
  initialState: initialState,
  reducers: {
    resetState: () => initialState,
    setLogsByCustomerId: (state, action) => {
      state.redemptionLogs = action.payload;
    },
    setAllStatus: (state, action) => {
      state.allStatus = action.payload;
    },
    setLogById: (state, action) => {
      state.redemptionLog = action.payload;
    },
    setGridParams: (state, action) => {
      state.gridParams = action.payload;
    },
    setEditRedemptionDialog: (state, action) => {
      state.editRedemptionDialog = action.payload;
    },
    setSettings: (state, action) => {
      state.settings = action.payload;
    },
    setCreateRedemptionDialog: (state, action) => {
      state.createRedemptionDialog = action.payload;
    }
  }
});
const {
  actions,
  reducer
} = redemptionSlice;
const {
  resetState,
  setLogsByCustomerId,
  setAllStatus,
  setLogById,
  setGridParams,
  setEditRedemptionDialog,
  setSettings,
  setCreateRedemptionDialog
} = actions;
/* harmony default export */ __webpack_exports__["default"] = (reducer);

/***/ })

}]);
//# sourceMappingURL=17.chunk.js.map