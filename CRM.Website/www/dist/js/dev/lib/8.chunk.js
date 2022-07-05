(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[8],{

/***/ "./www/sources/css/pages/feedback/manage-feedback/index.scss":
/*!*******************************************************************!*\
  !*** ./www/sources/css/pages/feedback/manage-feedback/index.scss ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./www/sources/js/pages/feedback/manage-feedback/actions.js":
/*!******************************************************************!*\
  !*** ./www/sources/js/pages/feedback/manage-feedback/actions.js ***!
  \******************************************************************/
/*! exports provided: ActionCreators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionCreators", function() { return ActionCreators; });
/* harmony import */ var _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/common/site */ "./www/sources/js/common/site.js");
/* harmony import */ var _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/common/dataService */ "./www/sources/js/common/dataService.js");
/* harmony import */ var _manageFeedbackSlice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./manageFeedbackSlice */ "./www/sources/js/pages/feedback/manage-feedback/manageFeedbackSlice.js");




const getAllSettings = () => async dispatch => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl('ManageFeedback/GetAllSettings');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__["default"].getDataAsync(url).then(response => {
    dispatch(Object(_manageFeedbackSlice__WEBPACK_IMPORTED_MODULE_2__["setAllSettings"])(response.data));
  }).catch(_jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].handleAxiosError);
};

const getGridFeedbacks = params => async dispatch => {
  _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].blockUI();
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl('ManageFeedback/SearchManageFeedback');
  _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__["default"].postDataAsync(url, params).then(response => {
    dispatch(Object(_manageFeedbackSlice__WEBPACK_IMPORTED_MODULE_2__["setGridFeedbacks"])(response.data));
  }).catch(_jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].handleAxiosError).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].unblockUI());
};

const exportExcel = params => async () => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl('ManageFeedback/ExportExcel');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__["default"].getFileAsync(url, params).then(response => {
    const fileName = response.headers['content-disposition'].split('filename=')[1].split(";")[0];
    _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].downloadFile(response.data, fileName);
  });
};

const ActionCreators = {
  setAllSettings: _manageFeedbackSlice__WEBPACK_IMPORTED_MODULE_2__["setAllSettings"],
  getAllSettings,
  setGridParams: _manageFeedbackSlice__WEBPACK_IMPORTED_MODULE_2__["setGridParams"],
  getGridFeedbacks,
  setGridFeedbacks: _manageFeedbackSlice__WEBPACK_IMPORTED_MODULE_2__["setGridFeedbacks"],
  exportExcel,
  setEditFeedbackDialog: _manageFeedbackSlice__WEBPACK_IMPORTED_MODULE_2__["setEditFeedbackDialog"],
  setEditNoOfInquiryDialog: _manageFeedbackSlice__WEBPACK_IMPORTED_MODULE_2__["setEditNoOfInquiryDialog"],
  setEditMultipleLogStatusDialog: _manageFeedbackSlice__WEBPACK_IMPORTED_MODULE_2__["setEditMultipleLogStatusDialog"],
  setEditMultipleLogDialog: _manageFeedbackSlice__WEBPACK_IMPORTED_MODULE_2__["setEditMultipleLogDialog"],
  setViewRelatedCustomerDialog: _manageFeedbackSlice__WEBPACK_IMPORTED_MODULE_2__["setViewRelatedCustomerDialog"],
  resetState: _manageFeedbackSlice__WEBPACK_IMPORTED_MODULE_2__["resetState"]
};

/***/ }),

/***/ "./www/sources/js/pages/feedback/manage-feedback/common.functions.js":
/*!***************************************************************************!*\
  !*** ./www/sources/js/pages/feedback/manage-feedback/common.functions.js ***!
  \***************************************************************************/
/*! exports provided: getInitFormik, getValidateFormik */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getInitFormik", function() { return getInitFormik; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getValidateFormik", function() { return getValidateFormik; });
/* harmony import */ var _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/common/dateTimeService */ "./www/sources/js/common/dateTimeService.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var _common_functions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common.functions */ "./www/sources/js/pages/feedback/common.functions.js");
/* harmony import */ var _jsroot_common_shareScripts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/common/shareScripts */ "./www/sources/js/common/shareScripts.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






const getInitFormik = (communicationLog, communicationSettings, usernames) => {
  const initSite = {
    id: 0,
    name: ''
  };
  return {
    usernames: usernames,
    siteInfo: communicationSettings.siteInfos.length > 0 ? communicationSettings.siteInfos[0] : initSite,
    extensionIds: communicationSettings.extensionIds.join(','),
    communicationToolIds: communicationSettings.communicationToolIds.join(','),
    productIds: communicationSettings.productIds.join(','),
    subProductIds: communicationSettings.subProductIds.join(','),
    betTypeIds: communicationSettings.betTypeIds.join(','),
    mainCategoryIds: communicationSettings.mainCategoryIds.join(','),
    subCategoryIds: communicationSettings.subCategoryIds.join(','),
    roleId: communicationLog.roleId,
    countryId: communicationLog.countryId,
    licenseeId: communicationLog.licenseeType,
    responseId: communicationLog.responseId,
    languageId: communicationLog.languageId,
    statusId: communicationLog.statusId,
    noInquiries: communicationLog.noInquiries > 0 ? communicationLog.noInquiries : '',
    subject: communicationLog.subject,
    autoGenerated: communicationLog.autoField,
    description: communicationLog.description,
    solution: communicationLog.solution,
    startTime: new Date(communicationLog.feedbackDate),
    endTime: new Date(communicationLog.resolutionDate),
    review: communicationLog.review,
    reviewer: communicationLog.reviewer,
    solveDate: _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_0__["default"].toShortDateTimeFormat(communicationLog.solveDate),
    isCheck: {
      checkAll: false,
      startTime: false,
      endTime: false,
      ext: false,
      response: false,
      communication: false,
      language: false,
      mainCategory: false,
      subCategory: false,
      product: false,
      subProduct: false,
      status: false,
      betType: false,
      role: false,
      site: false,
      country: false,
      licensee: false,
      inquiry: false,
      subject: false,
      autoGenerated: false,
      remark: false,
      description: false,
      solution: false,
      reviewed: communicationLog.isReviewed
    }
  };
};
const getValidateFormik = (values, settings) => {
  const errors = {};
  const categoriesParams = Object(_jsroot_common_shareScripts__WEBPACK_IMPORTED_MODULE_4__["getCategoryParams"])(values.mainCategoryIds.split(','), values.subCategoryIds.split(','), settings.subCategories);

  if (moment__WEBPACK_IMPORTED_MODULE_1___default()(values.startTime).isAfter(moment__WEBPACK_IMPORTED_MODULE_1___default()(values.endTime))) {
    errors.startTime = _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].formatString(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getResource('FieldLessThanOrEqualTo'), _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getResource('StartTime'), _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getResource('EndTime'));
  }

  if (values.isCheck.communication && values.communicationToolIds.length === 0) {
    errors.communicationToolIds = _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].formatString(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getResource('FieldRequired'), _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getResource('CommunicationTool'));
  }

  if (values.isCheck.language && parseInt(values.languageId, 10) === 0) {
    errors.languageId = _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].formatString(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getResource('FieldRequired'), _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getResource('Language'));
  }

  if (values.isCheck.mainCategory && categoriesParams.length === 0) {
    errors.mainCategoryIds = _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].formatString(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getResource('FieldRequired'), _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getResource('MainCategory'));
    errors.subCategoryIds = _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].formatString(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getResource('FieldRequired'), _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getResource('SubCategory'));
  }

  if (values.isCheck.mainCategory) {
    const {
      mainCategories,
      subCategories
    } = settings;
    Object(_common_functions__WEBPACK_IMPORTED_MODULE_3__["validateMainCategorySubCategory"])(errors, values.mainCategoryIds, values.subCategoryIds, mainCategories, subCategories);
  }

  const errorsMsg = validateDescriptionSolutionAndReview(values);

  const errorsMerge = _objectSpread(_objectSpread({}, errors), errorsMsg);

  return errorsMerge;
};

const validateDescriptionSolutionAndReview = values => {
  const errors = {};

  if (values.isCheck.subject && values.subject === '') {
    errors.subject = _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].formatString(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getResource('FieldRequired'), _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getResource('Subject'));
  }

  if (values.isCheck.description && values.description === '') {
    errors.description = _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].formatString(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getResource('FieldRequired'), _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getResource('Description'));
  }

  if (values.isCheck.solution && values.solution === '') {
    errors.solution = _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].formatString(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getResource('FieldRequired'), _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getResource('Solution'));
  }

  if (values.isCheck.reviewed && values.review === null) {
    errors.review = _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].formatString(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getResource('FieldRequired'), _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getResource('Review'));
  }

  return errors;
};

/***/ }),

/***/ "./www/sources/js/pages/feedback/manage-feedback/components/AppContainer.jsx":
/*!***********************************************************************************!*\
  !*** ./www/sources/js/pages/feedback/manage-feedback/components/AppContainer.jsx ***!
  \***********************************************************************************/
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
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/feedback/manage-feedback/actions.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var _jsroot_components_SweetModalDialog__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/components/SweetModalDialog */ "./www/sources/js/components/SweetModalDialog.jsx");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var _Filter__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Filter */ "./www/sources/js/pages/feedback/manage-feedback/components/Filter.jsx");
/* harmony import */ var _DataGrid__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./DataGrid */ "./www/sources/js/pages/feedback/manage-feedback/components/DataGrid.jsx");
/* harmony import */ var _edit_no_of_inquiry_AppContainer__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../edit-no-of-inquiry/AppContainer */ "./www/sources/js/pages/feedback/edit-no-of-inquiry/AppContainer.jsx");
/* harmony import */ var _edit_customer_feedback_AppContainer__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../edit-customer-feedback/AppContainer */ "./www/sources/js/pages/feedback/edit-customer-feedback/AppContainer.jsx");
/* harmony import */ var _EditMultipleReviewAndStatus__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./EditMultipleReviewAndStatus */ "./www/sources/js/pages/feedback/manage-feedback/components/EditMultipleReviewAndStatus.jsx");
/* harmony import */ var _EditMultipleLogs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./EditMultipleLogs */ "./www/sources/js/pages/feedback/manage-feedback/components/EditMultipleLogs.jsx");
/* harmony import */ var _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @jsroot/common/constants */ "./www/sources/js/common/constants.js");
/* harmony import */ var _jsroot_common_shareScripts__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @jsroot/common/shareScripts */ "./www/sources/js/common/shareScripts.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

















class AppContainer extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleCloseEditNoInquiryDialog", () => {
      this.props.setEditNoOfInquiryDialog({
        show: false
      });
    });

    _defineProperty(this, "handleCloseEditFeedbackDialog", isSuccessful => {
      this.props.setEditFeedbackDialog({
        show: false
      });

      if (isSuccessful) {
        this.props.getGridFeedbacks(this.props.gridParams);
      }
    });

    _defineProperty(this, "handleCloseMultipleEditStatusDialog", isSuccessful => {
      this.props.setEditMultipleLogStatusDialog({
        show: false
      });

      if (isSuccessful) {
        this.props.getGridFeedbacks(this.props.gridParams);
      }
    });

    _defineProperty(this, "handleCloseMultipleEditLog", isSuccessful => {
      this.props.setEditMultipleLogDialog({
        show: false
      });

      if (isSuccessful) {
        this.props.getGridFeedbacks(this.props.gridParams);
      }
    });

    _defineProperty(this, "handleCloseViewRelatedCustomerDialog", () => {
      this.props.setViewRelatedCustomerDialog({
        show: false
      });
    });

    this.state = {
      policy: null
    };
  }

  componentDidMount() {
    this.props.getAllSettings();
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
    const {
      editNoOfInquiryDialog,
      editFeedbackDialog,
      editMultipleLogStatusDialog,
      editMultipleLogDialog,
      viewRelatedCustomerDialog
    } = this.props;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Filter__WEBPACK_IMPORTED_MODULE_8__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DataGrid__WEBPACK_IMPORTED_MODULE_9__["default"], {
      isHost: isHost
    }), editNoOfInquiryDialog.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_edit_no_of_inquiry_AppContainer__WEBPACK_IMPORTED_MODULE_10__["default"], {
      feedbackId: editNoOfInquiryDialog.feedbackId,
      onClose: this.handleCloseEditNoInquiryDialog
    }), editFeedbackDialog.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_edit_customer_feedback_AppContainer__WEBPACK_IMPORTED_MODULE_11__["default"], {
      feedbackId: editFeedbackDialog.feedbackId,
      onClose: this.handleCloseEditFeedbackDialog
    }), editMultipleLogStatusDialog.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_EditMultipleReviewAndStatus__WEBPACK_IMPORTED_MODULE_12__["default"], {
      feedbackIds: editMultipleLogStatusDialog.feedbackIds,
      statuses: this.props.settings.statuses,
      onClose: this.handleCloseMultipleEditStatusDialog
    }), editMultipleLogDialog.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_EditMultipleLogs__WEBPACK_IMPORTED_MODULE_13__["default"], {
      feedbackArr: editMultipleLogDialog.feedbackArr,
      onClose: this.handleCloseMultipleEditLog
    }), viewRelatedCustomerDialog.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_SweetModalDialog__WEBPACK_IMPORTED_MODULE_6__["default"], {
      size: "lg",
      title: _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('RelatedCustomer'),
      contents: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, viewRelatedCustomerDialog.relatedCustomers),
      buttons: [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Button"], {
        variant: "primary",
        size: "sm",
        onClick: this.handleCloseViewRelatedCustomerDialog
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Close'))],
      onClose: this.handleCloseViewRelatedCustomerDialog
    }));
  }

}

_defineProperty(AppContainer, "propTypes", {
  getAllSettings: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func
});

_defineProperty(AppContainer, "defaultProps", {
  getAllSettings: function () {// nothing
  }
});

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_3__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_4__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    settings,
    editNoOfInquiryDialog,
    editFeedbackDialog,
    editMultipleLogStatusDialog,
    gridParams,
    editMultipleLogDialog,
    viewRelatedCustomerDialog
  } = state;
  return {
    settings,
    editNoOfInquiryDialog,
    editFeedbackDialog,
    editMultipleLogStatusDialog,
    gridParams,
    editMultipleLogDialog,
    viewRelatedCustomerDialog
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(AppContainer));

/***/ }),

/***/ "./www/sources/js/pages/feedback/manage-feedback/components/DataGrid.jsx":
/*!*******************************************************************************!*\
  !*** ./www/sources/js/pages/feedback/manage-feedback/components/DataGrid.jsx ***!
  \*******************************************************************************/
/*! exports provided: DataGrid, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataGrid", function() { return DataGrid; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var react_bootstrap_OverlayTrigger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-bootstrap/OverlayTrigger */ "./node_modules/react-bootstrap/esm/OverlayTrigger.js");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var react_bootstrap_Tooltip__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-bootstrap/Tooltip */ "./node_modules/react-bootstrap/esm/Tooltip.js");
/* harmony import */ var _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/common/dateTimeService */ "./www/sources/js/common/dateTimeService.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/feedback/manage-feedback/actions.js");
/* harmony import */ var _jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jsroot/components/react-grid/index */ "./www/sources/js/components/react-grid/index.jsx");
/* harmony import */ var _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @jsroot/common/constants */ "./www/sources/js/common/constants.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }











class DataGrid extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "buildHeader", isHost => {
      const isCheckAll = this.isCheckAll();
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_8__["HeaderRow"], null, isHost && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_8__["HeaderCell"], {
        colWidth: 10
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "checkbox",
        className: "cursor-pointer",
        checked: isCheckAll,
        onChange: this.handleChangeCheckBoxAll
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_8__["HeaderCell"], {
        colWidth: 10
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].getResource('Update')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_8__["HeaderCell"], {
        colWidth: 20
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].getResource('RunningNo')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_8__["HeaderCell"], {
        colWidth: 50
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].getResource('Feedback')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_8__["HeaderCell"], {
        colWidth: 25
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].getResource('Customer')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_8__["HeaderCell"], {
        colWidth: 50
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].getResource('Category')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_8__["HeaderCell"], {
        colWidth: 15
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].getResource('Status')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_8__["HeaderCell"], {
        colWidth: 25
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].getResource('RelatedCustomer')));
    });

    _defineProperty(this, "buildBody", isHost => {
      const {
        gridDataFeedbacks
      } = this.props;

      if (gridDataFeedbacks.data.length > 0) {
        return gridDataFeedbacks.data.map((item, index) => this.renderRow(item, index, isHost));
      }

      return [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_8__["Row"], {
        key: "body-nodata",
        className: "no-data"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_8__["Cell"], {
        className: "text-center",
        colSpan: 8
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].getResource('ThereIsNoData')))];
    });

    _defineProperty(this, "isCheckAll", () => {
      if (this.props.gridDataFeedbacks.data.length === 0) {
        return false;
      }

      return Array.from(this.state.checkedItems.values()).filter(x => x === true).length === this.props.gridDataFeedbacks.data.length;
    });

    _defineProperty(this, "handleGroupCategory", filterCategory => {
      const groupCategory = filterCategory.reduce((category, currentValue) => {
        const CategorySetting = category.find(item => currentValue.settingId === item.settingId);

        if (CategorySetting) {
          CategorySetting.subSettingId = [...CategorySetting.subSettingId, currentValue.subSettingId];
        } else {
          category.push({
            settingId: currentValue.settingId,
            subSettingId: [currentValue.subSettingId]
          });
        }

        return category;
      }, []);
      return groupCategory;
    });

    _defineProperty(this, "renderCategory", item => {
      const {
        mainCategories
      } = this.props.gridDataFeedbacks;
      const filterCategories = item.settings.filter(el => el.settingType === 'Category');
      const groupCategory = this.handleGroupCategory(filterCategories);
      return groupCategory.map((value, key) => {
        const filterMainCategory = mainCategories.find(el => el.settingId === value.settingId);
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          key: key,
          className: "font-weight-bold"
        }, filterMainCategory.settingValue), value.subSettingId.map((subId, index) => {
          const filterSubCategory = filterMainCategory.childSettings.find(el => el.subCategoryId === subId);
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            key: index,
            className: "font-italic ml-3 py-1"
          }, filterSubCategory.name);
        }));
      });
    });

    _defineProperty(this, "renderRelatedCustomer", item => {
      const totalItems = item.length;

      if (totalItems > _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_9__["MaximumDisplayRelatedCustomer"]) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
          href: "#",
          onClick: () => this.handleOpenViewRelatedCustomer(item.join(', '))
        }, totalItems, " customers");
      } else {
        return item.join(', ');
      }
    });

    _defineProperty(this, "handleOpenViewRelatedCustomer", relatedCustomers => {
      this.props.setViewRelatedCustomerDialog({
        show: true,
        relatedCustomers
      });
    });

    _defineProperty(this, "handleChangeCheckbox", event => {
      const item = event.target.name;
      const isChecked = event.target.checked;
      this.setState(prevState => ({
        checkedItems: prevState.checkedItems.set(parseInt(item, 10), isChecked)
      }));
    });

    _defineProperty(this, "handleChangeCheckBoxAll", event => {
      const isChecked = event.target.checked;
      const items = this.state.checkedItems;

      if (isChecked) {
        this.props.gridDataFeedbacks.data.forEach(element => {
          if (!items.get(element.feedbackId)) {
            items.set(element.feedbackId, true);
          }
        });
        this.setState({
          checkedItems: items
        });
      } else {
        const clearCheckedItems = new Map();
        this.setState({
          checkedItems: clearCheckedItems
        });
      }
    });

    _defineProperty(this, "renderRow", (item, index, isHost) => {
      const feedbackDateFormat = _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__["default"].toShortDateTimeFormat(item.feedbackDate);
      const createDateFormat = _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__["default"].toShortDateTimeFormat(item.createDate);
      const solveDateFormat = _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__["default"].toShortDateTimeFormat(item.solveDate);
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_8__["Row"], {
        key: `${item.feedbackId}-${index}`,
        className: `manage-feedback-row ${this.renderStatus(item.status)}`
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_8__["Cell"], {
        className: "text-center"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "checkbox",
        name: item.feedbackId,
        key: item.feedbackId,
        checked: this.state.checkedItems.get(item.feedbackId) || false,
        onChange: this.handleChangeCheckbox
      })), isHost && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_8__["Cell"], {
        className: "text-center"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "edit-feedback cursor-pointer pr-1 fa fa-pencil",
        onClick: () => this.handleEditNoOfInquiry(item.feedbackId)
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_8__["Cell"], {
        className: "text-center"
      }, item.feedbackId), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_8__["Cell"], null, this.tooltipFeedback(item), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "pl-3"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "py-1"
      }, "Feedback date ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, feedbackDateFormat)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "py-1"
      }, "By", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, " ", item.creatorName, " "), "on ", createDateFormat), item.reviewerName && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "info"
      }, "Reviewed by ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, " ", item.reviewerName, " "), " on ", solveDateFormat))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_8__["Cell"], null, item.username), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_8__["Cell"], null, this.renderCategory(item)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_8__["Cell"], {
        className: "text-center"
      }, item.status ? item.status : 'N/A'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_8__["Cell"], {
        className: "break-word"
      }, this.renderRelatedCustomer(item.relatedCustomer.split(','))));
    });

    _defineProperty(this, "renderStatus", status => {
      if (status === 'Pending') {
        return 'pending';
      }

      return status === 'Closed' ? 'closed' : '';
    });

    _defineProperty(this, "handleExportExcel", () => {
      const {
        gridParams
      } = this.props;
      this.props.exportExcel(gridParams);
    });

    _defineProperty(this, "handleEditNoOfInquiry", id => {
      this.props.setEditNoOfInquiryDialog({
        show: true,
        feedbackId: id
      });
    });

    _defineProperty(this, "handleEditFeedback", id => {
      this.props.setEditFeedbackDialog({
        show: true,
        feedbackId: id
      });
    });

    _defineProperty(this, "renderExportExcel", () => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap_OverlayTrigger__WEBPACK_IMPORTED_MODULE_3__["default"], {
        placement: "auto",
        overlay: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap_Tooltip__WEBPACK_IMPORTED_MODULE_5__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Export to Excel"))
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "fa fa-file-excel-o icon-excel cursor-pointer",
        onClick: this.handleExportExcel
      }));
    });

    _defineProperty(this, "tooltipFeedback", item => {
      const description = !item.description ? '' : `Description: <br>${item.description}<br>`,
            solution = !item.solution ? '' : `Solution: <br>${item.solution}<br>`,
            lastCharacterSlit = description.substring(578, 580),
            isEscapesWord = '<br />'.includes(lastCharacterSlit),
            subLength = isEscapesWord ? 592 : 580;
      const lastCharacterSlitSolution = solution.substring(578, 580),
            isEscapesWordSolution = '<br />'.includes(lastCharacterSlitSolution),
            subLengthSolution = isEscapesWordSolution ? 592 : 580;
      const tooltipDescription = description.length > subLength ? description.substring(0, subLength) + ' ... <br><br>' : description;
      const tooltipSolution = solution.length > subLengthSolution ? solution.substring(0, subLengthSolution) + ' ... <br><br>' : solution;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap_OverlayTrigger__WEBPACK_IMPORTED_MODULE_3__["default"], {
        placement: "bottom-start",
        overlay: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap_Tooltip__WEBPACK_IMPORTED_MODULE_5__["default"], {
          className: "tooltipManageFeedback"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          dangerouslySetInnerHTML: {
            __html: tooltipDescription + tooltipSolution
          }
        }))
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        onClick: () => this.handleEditFeedback(item.feedbackId)
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "pr-1 fa fa-pencil-square-o"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", {
        className: "link-click cursor-pointer"
      }, item.subject)));
    });

    _defineProperty(this, "onPaging", (pageIndex, pageSize) => {
      const params = _objectSpread({}, this.props.gridParams);

      params['pageIndex'] = pageIndex;
      params['pageSize'] = pageSize;
      this.props.getGridFeedbacks(params);
      this.props.setGridParams(params);
    });

    _defineProperty(this, "handleMultipleReviewAndStatus", () => {
      const feedbackSelected = [];

      for (const [key, value] of this.state.checkedItems.entries()) {
        if (value === true) {
          feedbackSelected.push(key);
        }
      }

      this.props.setEditMultipleLogStatusDialog({
        show: true,
        feedbackIds: feedbackSelected
      });
    });

    _defineProperty(this, "handleMultipleEdit", () => {
      const feedbackArr = [];

      for (const [key, value] of this.state.checkedItems.entries()) {
        if (value === true) {
          const feedbackInfo = this.props.gridDataFeedbacks.data.filter(x => x.feedbackId === key)[0];
          feedbackArr.push({
            feedbackId: feedbackInfo.feedbackId,
            username: feedbackInfo.username
          });
        }
      }

      this.props.setEditMultipleLogDialog({
        show: true,
        feedbackArr: feedbackArr
      });
    });

    _defineProperty(this, "renderTableTitle", gridDataFeedbacks => {
      const isClickableEditMultiple = Array.from(this.state.checkedItems.values()).includes(true);
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "table-title d-flex justify-content-between align-items-center"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "mx-1"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].getResource('Feedback')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "mx-1"
      }, "|"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: `mx-1 cursor-pointer multiple-edit ${isClickableEditMultiple ? '' : 'disabled-multiple-edit-status'}`,
        onClick: this.handleMultipleEdit
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "mx-1 fa fa-pencil-square-o cursor-pointer"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", {
        className: "link-click"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].getResource('MultipleEdit'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "mx-1"
      }, "|"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: `cursor-pointer multiple-edit ${isClickableEditMultiple ? '' : 'disabled-multiple-edit-status'}`,
        onClick: this.handleMultipleReviewAndStatus
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "mx-1 fa fa-pencil-square-o"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", {
        className: "link-click"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].getResource('MultipleReviewAndUpdateStatus')))), gridDataFeedbacks.data.length > 0 && this.renderExportExcel());
    });

    this.state = {
      checkedItems: new Map()
    };
  }

  render() {
    const {
      gridDataFeedbacks,
      isHost
    } = this.props;

    if (!gridDataFeedbacks || !gridDataFeedbacks.data) {
      return null;
    }

    const {
      pageIndex,
      pageSize
    } = this.props.gridParams;
    const pagingOption = {
      PageIndex: pageIndex,
      PageSize: pageSize,
      TotalItem: gridDataFeedbacks.totalItems,
      PageList: _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_9__["PAGING_SIZES"]
    };
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, this.renderTableTitle(gridDataFeedbacks), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_8__["Table"], {
      width: 1350,
      autoWidth: false,
      isPaging: true,
      pageOption: pagingOption,
      onPaging: this.onPaging,
      header: this.buildHeader(isHost),
      body: this.buildBody(isHost),
      containerPadding: 10,
      shouldResetScrollPosition: false
    }));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_7__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    gridParams,
    settings,
    gridDataFeedbacks
  } = state;
  return {
    gridParams,
    settings,
    gridDataFeedbacks
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(DataGrid));

/***/ }),

/***/ "./www/sources/js/pages/feedback/manage-feedback/components/EditMultipleLogs.jsx":
/*!***************************************************************************************!*\
  !*** ./www/sources/js/pages/feedback/manage-feedback/components/EditMultipleLogs.jsx ***!
  \***************************************************************************************/
/*! exports provided: EditMultipleLogs, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditMultipleLogs", function() { return EditMultipleLogs; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! formik */ "./node_modules/formik/dist/formik.esm.js");
/* harmony import */ var _jsroot_components_DraggableModalDialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/components/DraggableModalDialog */ "./www/sources/js/components/DraggableModalDialog.jsx");
/* harmony import */ var _jsroot_components_FormikErrorMessage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/components/FormikErrorMessage */ "./www/sources/js/components/FormikErrorMessage.jsx");
/* harmony import */ var _jsroot_components_ResponseMessage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/components/ResponseMessage */ "./www/sources/js/components/ResponseMessage.jsx");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jsroot/common/dateTimeService */ "./www/sources/js/common/dateTimeService.js");
/* harmony import */ var _jsroot_components_SweetModalDialog__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @jsroot/components/SweetModalDialog */ "./www/sources/js/components/SweetModalDialog.jsx");
/* harmony import */ var _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @jsroot/common/dataService */ "./www/sources/js/common/dataService.js");
/* harmony import */ var _jsroot_common_site__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @jsroot/common/site */ "./www/sources/js/common/site.js");
/* harmony import */ var _jsroot_components_multiple_select_index__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @jsroot/components/multiple-select/index */ "./www/sources/js/components/multiple-select/index.jsx");
/* harmony import */ var _jsroot_components_date_picker_index__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @jsroot/components/date-picker/index */ "./www/sources/js/components/date-picker/index.jsx");
/* harmony import */ var _jsroot_components_ckeditor_index__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @jsroot/components/ckeditor/index */ "./www/sources/js/components/ckeditor/index.jsx");
/* harmony import */ var _jsroot_components_AutoComplete__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @jsroot/components/AutoComplete */ "./www/sources/js/components/AutoComplete.jsx");
/* harmony import */ var _common_functions__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../common.functions */ "./www/sources/js/pages/feedback/common.functions.js");
/* harmony import */ var _jsroot_components_SelectWithSearch__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @jsroot/components/SelectWithSearch */ "./www/sources/js/components/SelectWithSearch.jsx");
/* harmony import */ var _common_functions_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../common.functions.js */ "./www/sources/js/pages/feedback/manage-feedback/common.functions.js");
/* harmony import */ var _jsroot_common_shareScripts__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @jsroot/common/shareScripts */ "./www/sources/js/common/shareScripts.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





















class EditMultipleLogs extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "getCommunicationSettings", (communicationLog, settings) => {
      const communicationLogSettings = communicationLog.settings;
      const siteInfos = [];
      settings.sites.forEach(site => {
        const siteFilter = site.childSites.filter(item => item.id === communicationLog.siteId);

        if (siteFilter.length > 0) {
          siteInfos.push(siteFilter[0]);
        }
      });
      const selectedExtensionIds = [],
            selectedProductIds = [],
            selectedSubProductIds = [],
            selectedBetTypeIds = [],
            selectedCommunicationToolIds = [],
            selectedMainCategoryIds = [],
            selectedSubCategoryIds = [];
      communicationLogSettings.forEach(x => {
        var _settings$productNA, _settings$subProductN, _settings$bettypeNA, _settings$communicati, _settings$extensionNA;

        switch (x.settingType) {
          case 'Product':
            if (x.settingId !== ((_settings$productNA = settings.productNA) === null || _settings$productNA === void 0 ? void 0 : _settings$productNA.id)) {
              selectedProductIds.push(x.settingId);
            }

            if (x.subSettingId !== ((_settings$subProductN = settings.subProductNA) === null || _settings$subProductN === void 0 ? void 0 : _settings$subProductN.id)) {
              selectedSubProductIds.push(x.subSettingId);
            }

            if (x.subSettingIdLevel3 !== ((_settings$bettypeNA = settings.bettypeNA) === null || _settings$bettypeNA === void 0 ? void 0 : _settings$bettypeNA.id)) {
              selectedBetTypeIds.push(x.subSettingIdLevel3);
            }

            break;

          case 'Category':
            selectedMainCategoryIds.push(x.settingId);
            selectedSubCategoryIds.push(x.subSettingId);
            break;

          case 'Communication':
            if (x.settingId !== ((_settings$communicati = settings.communicationToolNA) === null || _settings$communicati === void 0 ? void 0 : _settings$communicati.id)) {
              selectedCommunicationToolIds.push(x.settingId);
            }

            break;

          case 'Station':
            if (x.settingId !== ((_settings$extensionNA = settings.extensionNA) === null || _settings$extensionNA === void 0 ? void 0 : _settings$extensionNA.id)) {
              selectedExtensionIds.push(x.settingId);
            }

            break;
        }
      });
      return {
        extensionIds: selectedExtensionIds,
        communicationToolIds: selectedCommunicationToolIds,
        mainCategoryIds: selectedMainCategoryIds,
        subCategoryIds: selectedSubCategoryIds,
        productIds: selectedProductIds,
        subProductIds: selectedSubProductIds,
        betTypeIds: selectedBetTypeIds,
        siteInfos: siteInfos
      };
    });

    _defineProperty(this, "onChangeMainCategory", (setFieldValue, selectedCategories, selectedSubCategoryIds, subject) => {
      const settings = this.state.settings;
      const subjectChange = Object(_jsroot_common_shareScripts__WEBPACK_IMPORTED_MODULE_19__["getSubjectOnChangeCategories"])(selectedCategories ? selectedCategories.split(',') : [], subject, settings.mainCategories);
      setFieldValue('mainCategoryIds', selectedCategories);
      setFieldValue('subject', subjectChange);

      if (selectedCategories) {
        const subCategoryIds = selectedSubCategoryIds.length > 0 ? selectedSubCategoryIds.split(',') : [];
        const subCategoryOptions = Object(_jsroot_common_shareScripts__WEBPACK_IMPORTED_MODULE_19__["getSubCategories"])(selectedCategories.split(','), settings.subCategories, subCategoryIds, false);
        this.setState({
          subCategoryOptions
        });
      } else {
        this.setState({
          subCategoryOptions: []
        });
        setFieldValue('subCategoryIds', '');
      }
    });

    _defineProperty(this, "onChangeProduct", (setFieldValue, selectedProductIds, selectedSubProductIds) => {
      setFieldValue('productIds', selectedProductIds);

      if (selectedProductIds) {
        const subProductIds = selectedSubProductIds.length > 0 ? selectedSubProductIds.split(',') : [];
        const subProducts = Object(_jsroot_common_shareScripts__WEBPACK_IMPORTED_MODULE_19__["getSubProducts"])(selectedProductIds.split(','), this.state.settings.subProducts, subProductIds, false);
        this.setState({
          subProductOptions: subProducts
        });
      } else {
        this.setState({
          subProductOptions: [],
          betTypeOptions: []
        });
        setFieldValue('subProductIds', '');
        setFieldValue('betTypeIds', '');
      }
    });

    _defineProperty(this, "onChangeSubProduct", (setFieldValue, selectedSubProductIds, selectedBetTypeIds) => {
      setFieldValue('subProductIds', selectedSubProductIds);

      if (selectedSubProductIds) {
        const betTypeIds = selectedBetTypeIds.length > 0 ? selectedBetTypeIds.split(',') : [];
        const betTypes = Object(_jsroot_common_shareScripts__WEBPACK_IMPORTED_MODULE_19__["getBetTypes"])(selectedSubProductIds.split(','), this.state.settings.bettypes, betTypeIds, false);
        this.setState({
          betTypeOptions: betTypes
        });
      } else {
        this.setState({
          betTypeOptions: []
        });
        setFieldValue('betTypeIds', '');
      }
    });

    _defineProperty(this, "onGetFeedbackSubjectTemplates", _jsroot_common_site__WEBPACK_IMPORTED_MODULE_11__["default"].debounce(async searchText => {
      if (searchText.length >= 2) {
        const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_11__["default"].resolveClientUrl('Common/GetFeedbackSubjectTemplate');
        await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_10__["default"].getDataAsync(url, {
          searchText
        }).then(response => {
          this.setState({
            feedbackSubjectTemplates: response.data
          });
        });
      } else {
        this.setState({
          feedbackSubjectTemplates: []
        });
      }
    }));

    _defineProperty(this, "handleCheckAll", (checks, setFieldValue, event) => {
      for (const [key] of Object.entries(checks)) {
        setFieldValue(`isCheck.${key}`, event.target.checked);
      }
    });

    _defineProperty(this, "getExtensionParams", (selectedExtensionIds, extensionNA) => {
      let extensionIds = [];

      if (selectedExtensionIds.length > 0) {
        extensionIds = selectedExtensionIds.split(',');
      }

      if (extensionIds.length === 0 && extensionNA !== null && extensionNA.id !== undefined) {
        extensionIds.push(extensionNA.id);
      }

      return extensionIds.join(',');
    });

    _defineProperty(this, "renderAutoGenerated", (values, handleChange, setFieldValue) => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "panel-group border-bottom-0"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Row"],
        className: "panel-title justify-content-between"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Label, null, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('AutoGenerated')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        className: "ml-2",
        type: "checkbox",
        name: "isCheck.autoGenerated",
        onChange: event => {
          setFieldValue('isCheck.autoGenerated', event.target.checked);
          setFieldValue('isCheck.description', event.target.checked);
        },
        checked: values.isCheck.autoGenerated
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "panel-content"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Control, {
        as: "textarea",
        rows: 3,
        className: "shadow-none",
        name: "autoGenerated",
        disabled: !values.isCheck.autoGenerated,
        value: values.autoGenerated,
        onChange: handleChange
      })));
    });

    _defineProperty(this, "renderDescription", (values, touched, errors, setFieldValue) => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "panel-group border-bottom-0"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Row"],
        className: "panel-title justify-content-between"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Label, {
        className: "required"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Remark')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "checkbox",
        name: "isCheck.description",
        disabled: true,
        checked: values.isCheck.description
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "panel-content"
      }, !values.isCheck.autoGenerated && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        dangerouslySetInnerHTML: {
          __html: values.description
        }
      })), values.isCheck.autoGenerated && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_ckeditor_index__WEBPACK_IMPORTED_MODULE_14__["default"], {
        isInvalid: touched.description && errors.description,
        data: values.description,
        username: window.currentUsername,
        onChange: value => setFieldValue('description', value)
      })));
    });

    _defineProperty(this, "renderSolution", (values, touched, errors, setFieldValue) => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "panel-group border-bottom-0"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Row"],
        className: "panel-title justify-content-between",
        "aria-controls": "collapse-expand-solution"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Label, {
        className: "required"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Solution')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "checkbox",
        name: "isCheck.solution",
        onChange: event => setFieldValue('isCheck.solution', event.target.checked),
        checked: values.isCheck.solution
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "panel-content"
      }, !values.isCheck.solution && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        dangerouslySetInnerHTML: {
          __html: values.solution
        }
      }), values.isCheck.solution && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_ckeditor_index__WEBPACK_IMPORTED_MODULE_14__["default"], {
        isInvalid: touched.solution && errors.solution,
        data: values.solution,
        username: window.currentUsername,
        onChange: value => setFieldValue('solution', value)
      })));
    });

    _defineProperty(this, "renderReview", (values, touched, errors, setFieldValue) => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "panel-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Row"],
        className: `panel-title ${!values.isCheck.reviewed ? 'border-bottom-0' : ''}`
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Label, {
        className: values.reviewed ? 'required' : ''
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Review')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        className: "ml-2",
        type: "checkbox",
        onChange: event => setFieldValue('isCheck.reviewed', event.target.checked),
        checked: values.isCheck.reviewed
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "font-italic ml-2"
      }, values.reviewerName ? _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].formatString(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('ReviewerBy'), values.reviewerName, values.solveDate) : '')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Collapse"], {
        in: values.isCheck.reviewed
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "panel-content"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_ckeditor_index__WEBPACK_IMPORTED_MODULE_14__["default"], {
        isInvalid: touched.review && errors.review,
        data: values.review,
        username: window.currentUsername,
        onChange: value => setFieldValue('review', value)
      }))));
    });

    _defineProperty(this, "renderDropdownDetail", (errors, values, handleChange, touched, setFieldValue) => {
      const {
        settings,
        mainCategoryOptions,
        subCategoryOptions,
        productOptions,
        subProductOptions,
        betTypeOptions,
        sitesOptions
      } = this.state;
      const {
        statuses,
        roles
      } = settings;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Label, {
        column: true,
        sm: "2",
        md: "2",
        htmlFor: "mainCategoryIds",
        className: "required"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('MainCategory')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
        sm: "4",
        md: "4",
        className: "d-flex"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: `pr-2 ${this.isDisabledField(values.isCheck.mainCategory)}`
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_multiple_select_index__WEBPACK_IMPORTED_MODULE_12__["default"], {
        isInvalid: touched.mainCategoryIds && errors.mainCategoryIds,
        dataSource: mainCategoryOptions,
        keyField: "mainCategoryID",
        valueField: "name",
        hasAllOption: mainCategoryOptions.length > 0,
        isAllTextShown: mainCategoryOptions.length > 0,
        hasSearchBox: true,
        isNAOption: true,
        maxDisplayItemCount: 1,
        onChange: (currentItem, selectedItemsKey) => {
          this.onChangeMainCategory(setFieldValue, selectedItemsKey, values.subCategoryIds, values.subject);
        }
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "checkbox",
        name: "isCheck.mainCategory",
        onChange: event => {
          setFieldValue('isCheck.mainCategory', event.target.checked);
          setFieldValue('isCheck.subCategory', event.target.checked);
        },
        checked: values.isCheck.mainCategory
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Label, {
        column: true,
        sm: "2",
        md: "2",
        htmlFor: "subCategoryIds",
        className: "required"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('SubCate')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
        sm: "4",
        md: "4",
        className: "d-flex"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: `pr-2 ${this.isDisabledField(values.isCheck.subCategory)}`
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_multiple_select_index__WEBPACK_IMPORTED_MODULE_12__["default"], {
        isInvalid: touched.subCategoryIds && errors.subCategoryIds,
        dataSource: subCategoryOptions,
        keyField: "subCategoryId",
        valueField: "name",
        hasAllOption: subCategoryOptions.length > 0,
        isAllTextShown: subCategoryOptions.length > 0,
        hasSearchBox: true,
        isNAOption: true,
        maxDisplayItemCount: 1,
        onChange: (currentItem, selectedItemsKey) => {
          setFieldValue('subCategoryIds', selectedItemsKey);
        }
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "checkbox",
        disabled: true,
        name: "isCheck.subCategory",
        checked: values.isCheck.subCategory
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Label, {
        column: true,
        sm: "2",
        md: "2",
        htmlFor: "product"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Product')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
        sm: "4",
        md: "4",
        className: "d-flex"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: `pr-2 ${this.isDisabledField(values.isCheck.product)}`
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_multiple_select_index__WEBPACK_IMPORTED_MODULE_12__["default"], {
        dataSource: productOptions,
        keyField: "id",
        valueField: "value",
        hasAllOption: productOptions.length > 0,
        isAllTextShown: productOptions.length > 0,
        hasSearchBox: true,
        isNAOption: true,
        maxDisplayItemCount: 1,
        onChange: (currentItem, selectedItemsKey) => {
          this.onChangeProduct(setFieldValue, selectedItemsKey, values.subProductIds);
        }
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "checkbox",
        name: "isCheck.product",
        onChange: event => {
          setFieldValue('isCheck.product', event.target.checked);
          setFieldValue('isCheck.subProduct', event.target.checked);
          setFieldValue('isCheck.betType', event.target.checked);
        },
        checked: values.isCheck.product
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Label, {
        column: true,
        sm: "2",
        md: "2",
        htmlFor: "subProductIds"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('SubProduct')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
        sm: "4",
        md: "4",
        className: "d-flex"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: `pr-2 ${this.isDisabledField(values.isCheck.product)}`
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_multiple_select_index__WEBPACK_IMPORTED_MODULE_12__["default"], {
        dataSource: subProductOptions,
        keyField: "id",
        valueField: "value",
        hasAllOption: subProductOptions.length > 0,
        isAllTextShown: subProductOptions.length > 0,
        hasSearchBox: true,
        isNAOption: true,
        maxDisplayItemCount: 1,
        onChange: (currentItem, selectedItemsKey) => {
          this.onChangeSubProduct(setFieldValue, selectedItemsKey, values.betTypeIds);
        }
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "checkbox",
        name: "isCheck.subProduct",
        disabled: true,
        onChange: event => setFieldValue('isCheck.subProduct', event.target.checked),
        checked: values.isCheck.subProduct
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Label, {
        column: true,
        sm: "2",
        md: "2",
        htmlFor: "statusId"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Status')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
        sm: "4",
        md: "4",
        className: "d-flex"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Control, {
        as: "select",
        size: "sm",
        className: `shadow-none select-width-sm mr-2 ${this.isDisabledField(values.isCheck.status)}`,
        id: "statusId",
        name: "statusId",
        value: values.statusId,
        onChange: handleChange
      }, statuses.map(item => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        key: item.statusId,
        value: item.statusId
      }, item.name))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "checkbox",
        name: "isCheck.status",
        onChange: event => setFieldValue('isCheck.status', event.target.checked),
        checked: values.isCheck.status
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Label, {
        column: true,
        sm: "2",
        md: "2",
        htmlFor: "betTypeIds"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('BetType')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
        sm: "4",
        md: "4",
        className: "d-flex"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: `pr-2 ${this.isDisabledField(values.isCheck.product)}`
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_multiple_select_index__WEBPACK_IMPORTED_MODULE_12__["default"], {
        dataSource: betTypeOptions,
        keyField: "id",
        valueField: "value",
        hasAllOption: betTypeOptions.length > 0,
        isAllTextShown: betTypeOptions.length > 0,
        hasSearchBox: true,
        isNAOption: true,
        maxDisplayItemCount: 1,
        onChange: (currentItem, selectedItemsKey) => {
          setFieldValue('betTypeIds', selectedItemsKey);
        }
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "checkbox",
        name: "isCheck.betType",
        disabled: true,
        onChange: event => setFieldValue('isCheck.betType', event.target.checked),
        checked: values.isCheck.betType
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Label, {
        column: true,
        sm: "2",
        md: "2",
        htmlFor: "roleId"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Role')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
        sm: "4",
        md: "4",
        className: "d-flex"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Control, {
        as: "select",
        size: "sm",
        className: `shadow-none select-width-sm mr-2 ${this.isDisabledField(values.isCheck.role)}`,
        id: "roleId",
        name: "roleId",
        value: values.roleId,
        onChange: handleChange
      }, roles.map(item => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        key: item.id,
        value: item.id
      }, item.value))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "checkbox",
        name: "isCheck.role",
        onChange: event => setFieldValue('isCheck.role', event.target.checked),
        checked: values.isCheck.role
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Label, {
        column: true,
        sm: "2",
        md: "2",
        htmlFor: "siteInfo"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Site')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
        column: true,
        sm: "4",
        md: "4",
        className: "d-flex"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: `mr-2 select-width-sm ${this.isDisabledField(values.isCheck.site)}`
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_SelectWithSearch__WEBPACK_IMPORTED_MODULE_17__["default"], {
        className: "basic-single",
        options: sitesOptions,
        value: values.siteInfo.id,
        name: values.siteInfo.name,
        OnChangeValue: value => setFieldValue('siteInfo', value)
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "checkbox",
        name: "isCheck.site",
        onChange: event => setFieldValue('isCheck.site', event.target.checked),
        checked: values.isCheck.site
      }))));
    });

    _defineProperty(this, "renderSelectOptions", (values, handleChange, setFieldValue) => {
      const {
        countries,
        licenseeTypes
      } = this.state.settings;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Label, {
        column: true,
        sm: "2",
        md: "2",
        htmlFor: "countryId"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Country')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
        sm: "4",
        md: "4",
        className: "d-flex"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Control, {
        as: "select",
        size: "sm",
        className: `shadow-none select-width-sm mr-2 ${this.isDisabledField(values.isCheck.country)}`,
        id: "countryId",
        name: "countryId",
        value: values.countryId,
        onChange: handleChange
      }, countries.map(item => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        key: item.id,
        value: item.id
      }, item.name))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "checkbox",
        name: "isCheck.country",
        onChange: event => setFieldValue('isCheck.country', event.target.checked),
        checked: values.isCheck.country
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Label, {
        column: true,
        sm: "2",
        md: "2",
        htmlFor: "licenseeId"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('LicenseeType')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
        sm: "4",
        md: "4",
        className: "d-flex"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Control, {
        as: "select",
        size: "sm",
        className: `shadow-none select-width-sm mr-2 ${this.isDisabledField(values.isCheck.licensee)}`,
        id: "licenseeId",
        name: "licenseeId",
        value: values.licenseeId,
        onChange: handleChange
      }, licenseeTypes.map(item => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        key: item.id,
        value: item.id
      }, item.name))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "checkbox",
        name: "isCheck.licensee",
        onChange: event => setFieldValue('isCheck.licensee', event.target.checked),
        checked: values.isCheck.licensee
      }))));
    });

    _defineProperty(this, "isDisabledField", checked => {
      if (!checked) {
        return 'disabled-filed';
      }

      return '';
    });

    _defineProperty(this, "renderMultipleLogs", (errors, values, handleChange, touched, setFieldValue) => {
      const {
        settings,
        extensionOptions,
        communicationToolOptions,
        feedbackSubjectTemplates
      } = this.state;
      const {
        responses,
        languages
      } = settings;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "panel-group border-bottom-0"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "panel-content"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Label, {
        column: true,
        sm: "2",
        md: "2"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Listofcustomers')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
        sm: "8",
        md: "8"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Control, {
        type: "text",
        size: "sm",
        value: values.usernames,
        name: "usernames",
        id: "usernames",
        className: "shadow-none",
        autoComplete: "off",
        disabled: true,
        isInvalid: touched.usernames && errors.usernames,
        onChange: handleChange
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
        sm: "2",
        md: "2",
        className: "select-all-field"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Label, null, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('SelectAll')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        className: "ml-2",
        type: "checkbox",
        name: "isCheck.checkAll",
        onChange: event => this.handleCheckAll(values.isCheck, setFieldValue, event),
        checked: values.isCheck.checkAll
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Label, {
        column: true,
        sm: "2",
        md: "2",
        htmlFor: "startTime"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('StartTime')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
        sm: "4",
        md: "4",
        className: "d-flex"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: `react-datepicker-wrapper-container form-control-wrapper pr-2 ${this.isDisabledField(values.isCheck.startTime)}`
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_date_picker_index__WEBPACK_IMPORTED_MODULE_13__["default"], {
        timeInputLabel: "Time:",
        showTimeInput: true,
        selected: values.startTime,
        peekNextMonth: true,
        showMonthDropdown: true,
        showYearDropdown: true,
        dropdownMode: "select",
        onChange: value => setFieldValue('startTime', value)
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "checkbox",
        name: "isCheck.startTime",
        onChange: event => setFieldValue('isCheck.startTime', event.target.checked),
        checked: values.isCheck.startTime
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Label, {
        column: true,
        sm: "2",
        md: "2",
        htmlFor: "extensionIds"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Ext')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
        sm: "4",
        md: "4",
        className: "d-flex"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: `pr-2 ${this.isDisabledField(values.isCheck.ext)}`
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_multiple_select_index__WEBPACK_IMPORTED_MODULE_12__["default"], {
        hasAllOption: extensionOptions.length > 0,
        isAllTextShown: extensionOptions.length > 0,
        dataSource: extensionOptions,
        keyField: "id",
        valueField: "value",
        hasSearchBox: true,
        isNAOption: true,
        onChange: (currentItem, selectedItemsKey) => {
          setFieldValue('extensionIds', selectedItemsKey);
        }
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "checkbox",
        name: "isCheck.ext",
        onChange: event => setFieldValue('isCheck.ext', event.target.checked),
        checked: values.isCheck.ext
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Label, {
        column: true,
        sm: "2",
        md: "2",
        htmlFor: "endTime"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('EndTime')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
        sm: "4",
        md: "4",
        className: "d-flex"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: `react-datepicker-wrapper-container form-control-wrapper pr-2 ${this.isDisabledField(values.isCheck.endTime)}`
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_date_picker_index__WEBPACK_IMPORTED_MODULE_13__["default"], {
        timeInputLabel: "Time:",
        showTimeInput: true,
        selected: values.endTime,
        peekNextMonth: true,
        showMonthDropdown: true,
        showYearDropdown: true,
        dropdownMode: "select",
        onChange: value => setFieldValue('endTime', value)
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "checkbox",
        name: "isCheck.endTime",
        onChange: event => setFieldValue('isCheck.endTime', event.target.checked),
        checked: values.isCheck.endTime
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Label, {
        column: true,
        sm: "2",
        md: "2",
        htmlFor: "responseId"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Response')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
        sm: "4",
        md: "4",
        className: "d-flex"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Control, {
        as: "select",
        size: "sm",
        className: `shadow-none select-width-sm mr-2 ${this.isDisabledField(values.isCheck.response)}`,
        id: "responseId",
        name: "responseId",
        value: values.responseId,
        onChange: handleChange,
        disabled: !values.isCheck.response
      }, responses.map(item => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        key: item.id,
        value: item.id
      }, item.value))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "checkbox",
        name: "isCheck.response",
        onChange: event => setFieldValue('isCheck.response', event.target.checked),
        checked: values.isCheck.response
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Label, {
        column: true,
        sm: "2",
        md: "2",
        htmlFor: "communicationToolId",
        className: "required"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Communication')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
        sm: "4",
        md: "4",
        className: "d-flex"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: `pr-2 ${this.isDisabledField(values.isCheck.communication)}`
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_multiple_select_index__WEBPACK_IMPORTED_MODULE_12__["default"], {
        isInvalid: touched.communicationToolIds && errors.communicationToolIds,
        dataSource: communicationToolOptions,
        keyField: "id",
        valueField: "name",
        hasAllOption: communicationToolOptions.length > 0,
        isAllTextShown: communicationToolOptions.length > 0,
        hasSearchBox: true,
        isNAOption: true,
        onChange: (currentItem, selectedItemsKey) => {
          setFieldValue('communicationToolIds', selectedItemsKey);
        }
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "checkbox",
        name: "isCheck.communication",
        onChange: event => setFieldValue('isCheck.communication', event.target.checked),
        checked: values.isCheck.communication
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Label, {
        column: true,
        sm: "2",
        md: "2",
        htmlFor: "languageId",
        className: "required"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Language')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
        sm: "4",
        md: "4",
        className: "d-flex"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Control, {
        as: "select",
        size: "sm",
        className: `shadow-none shadow-none select-width-sm mr-2 ${this.isDisabledField(values.isCheck.language)}`,
        isInvalid: touched.languageId && errors.languageId,
        id: "languageId",
        name: "languageId",
        value: values.languageId,
        onChange: handleChange
      }, languages.map(item => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        key: item.languageId,
        value: item.languageId
      }, item.name))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "checkbox",
        name: "isCheck.language",
        onChange: event => setFieldValue('isCheck.language', event.target.checked),
        checked: values.isCheck.language
      }))), this.renderDropdownDetail(errors, values, handleChange, touched, setFieldValue), this.renderSelectOptions(values, handleChange, setFieldValue), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Label, {
        column: true,
        sm: "2",
        md: "2",
        htmlFor: "noInquiries"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('NoOfInquiries')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
        sm: "4",
        md: "4",
        className: "d-flex"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Control, {
        size: "sm",
        type: "number",
        min: 1,
        max: 3200,
        value: values.noInquiries,
        id: "noInquiries",
        name: "noInquiries",
        className: `shadow-none select-width-sm mr-2 ${this.isDisabledField(values.isCheck.inquiry)}`,
        autoComplete: "off",
        onInput: _common_functions__WEBPACK_IMPORTED_MODULE_16__["validateNoOfInquiry"],
        onChange: handleChange
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "checkbox",
        name: "isCheck.inquiry",
        onChange: event => setFieldValue('isCheck.inquiry', event.target.checked),
        checked: values.isCheck.inquiry
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Label, {
        column: true,
        sm: "2",
        md: "2",
        htmlFor: "subject",
        className: "required"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Subject')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
        sm: "8",
        md: "8",
        className: "d-flex"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: `${this.isDisabledField(values.isCheck.subject)} w-100`
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_AutoComplete__WEBPACK_IMPORTED_MODULE_15__["default"], {
        isInvalid: touched.subject && errors.subject,
        value: values.subject,
        options: feedbackSubjectTemplates,
        displayField: "subject",
        onChange: value => setFieldValue('subject', value),
        onInputChange: this.onGetFeedbackSubjectTemplates
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        className: "ml-2",
        type: "checkbox",
        name: "isCheck.subject",
        onChange: event => setFieldValue('isCheck.subject', event.target.checked),
        checked: values.isCheck.subject
      }))))), this.renderAutoGenerated(values, handleChange, setFieldValue), this.renderDescription(values, touched, errors, setFieldValue), this.renderSolution(values, touched, errors, setFieldValue), this.renderReview(values, touched, errors, setFieldValue));
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
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"], {
        noValidate: true,
        onSubmit: handleSubmit
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Body, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_FormikErrorMessage__WEBPACK_IMPORTED_MODULE_5__["default"], {
        touched: touched,
        errors: errors,
        fieldNames: Object.keys(values)
      }), this.state.editResult && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_ResponseMessage__WEBPACK_IMPORTED_MODULE_6__["default"], {
        isSuccessful: this.state.editResult.isSuccessful,
        message: this.state.editResult.message || _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('UpdateMultipleLogsSuccessfully')
      }), this.renderMultipleLogs(errors, values, handleChange, touched, setFieldValue)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Footer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
        size: "sm",
        type: "submit",
        variant: "primary",
        disabled: isSubmitting
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Save')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
        size: "sm",
        type: "button",
        variant: "primary",
        onClick: () => this.props.onClose(false)
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Cancel'))));
    });

    _defineProperty(this, "handleSubmit", (values, {
      setSubmitting
    }) => {
      setSubmitting(true);
      const params = {
        listFeedbackId: this.state.feedbackArr.map(x => x.feedbackId).join(' ,'),
        countryId: values.countryId,
        isUpdateCountryId: values.isCheck.country,
        siteId: values.siteInfo.id,
        isUpdateSiteId: values.isCheck.site,
        subject: values.subject,
        isUpdateSubject: values.isCheck.subject,
        languageId: parseInt(values.languageId, 10),
        isUpdateLanguageID: values.isCheck.language,
        feedbackDate: _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_8__["default"].toLongDateTimeFormat(_jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_8__["default"].toServerDateTime(values.startTime)),
        isUpdateFeedbackDate: values.isCheck.startTime,
        resolutionDate: _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_8__["default"].toLongDateTimeFormat(_jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_8__["default"].toServerDateTime(values.endTime)),
        isUpdateResolutionDate: values.isCheck.endTime,
        stationId: this.getExtensionParams(values.extensionIds, this.state.settings.extensionNA),
        isUpdateStationId: values.isCheck.ext,
        roleId: values.roleId,
        isUpdateRoleId: values.isCheck.role,
        responseId: values.responseId,
        isUpdateResponseId: values.isCheck.response,
        statusId: values.statusId,
        isUpdateStatusId: values.isCheck.status,
        description: values.description,
        isUpdateDescription: values.isCheck.description,
        solution: values.solution,
        isUpdateSolution: values.isCheck.solution,
        licenseeType: values.licenseeId,
        isUpdateLicenseeType: values.isCheck.licensee,
        isReviewed: values.isCheck.reviewed,
        review: values.review,
        isUpdateReview: values.isCheck.reviewed,
        autoField: values.autoGenerated,
        isUpdateAutoField: values.isCheck.autoGenerated,
        communicationId: values.communicationToolIds,
        isUpdateCommunicationId: values.isCheck.communication,
        products: Object(_jsroot_common_shareScripts__WEBPACK_IMPORTED_MODULE_19__["getProductParams"])(values.productIds.length > 0 ? values.productIds.split(',') : [], values.subProductIds.length > 0 ? values.subProductIds.split(',') : [], values.betTypeIds.length > 0 ? values.betTypeIds.split(',') : [], this.state.settings),
        isUpdateProduct: values.isCheck.product,
        categories: Object(_jsroot_common_shareScripts__WEBPACK_IMPORTED_MODULE_19__["getCategoryParams"])(values.mainCategoryIds.split(','), values.subCategoryIds.split(','), this.state.settings.subCategories),
        isUpdateCategory: values.isCheck.mainCategory,
        noInquiries: values.noInquiries === '' ? 0 : parseInt(values.noInquiries, 10),
        isUpdateNoInquiries: values.isCheck.inquiry,
        updateReviewedMode: this.reviewMode(values)
      };
      this.confirmEditMultipleLogs(params);
    });

    _defineProperty(this, "reviewMode", values => {
      if (!this.state.hasReviewFeedbackPermission) {
        return 0;
      } else {
        if (!values.isReviewed) {
          return 2;
        } else {
          return 1;
        }
      }
    });

    _defineProperty(this, "confirmEditMultipleLogs", params => {
      this.setState({
        confirmEditMultipleLogsDialog: {
          show: true,
          params
        }
      });
    });

    _defineProperty(this, "handleCloseConfirmEditMultipleLogsDialog", () => {
      this.setState({
        confirmEditMultipleLogsDialog: {
          show: false
        }
      });
      this.formik.setSubmitting(false);
    });

    _defineProperty(this, "handleConfirmEditMultipleLogs", () => {
      const {
        params
      } = this.state.confirmEditMultipleLogsDialog;
      this.setState({
        confirmEditMultipleLogsDialog: {
          show: false
        }
      });
      this.handleEditMultipleLogs(params);
    });

    _defineProperty(this, "handleEditMultipleLogs", async params => {
      _jsroot_common_site__WEBPACK_IMPORTED_MODULE_11__["default"].blockUI();
      const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_11__["default"].resolveClientUrl('MultipleLogs/EditMultipleLogs');
      await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_10__["default"].postDataAsync(url, params).then(response => {
        if (response.data.isSuccessful) {
          this.setState({
            editResult: response.data
          });
          setTimeout(() => {
            this.props.onClose(true);
          }, 3000);
        } else {
          this.formik.setSubmitting(false);
        }
      }).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_11__["default"].unblockUI());
    });

    _defineProperty(this, "initFormik", (communicationLog, settings) => {
      const communicationSettings = this.getCommunicationSettings(communicationLog, settings);
      const usernames = this.state.feedbackArr.map(x => x.username).join(' ,');
      const init = Object(_common_functions_js__WEBPACK_IMPORTED_MODULE_18__["getInitFormik"])(communicationLog, communicationSettings, usernames);
      return init;
    });

    this.state = {
      feedbackArr: props.feedbackArr,
      communication: null,
      communicationToolOptions: [],
      mainCategoryOptions: [],
      subCategoryOptions: [],
      productOptions: [],
      subProductOptions: [],
      betTypeOptions: [],
      sitesOptions: [],
      feedbackSubjectTemplates: [],
      confirmEditMultipleLogsDialog: {
        show: false
      },
      settings: null,
      hasReviewFeedbackPermission: false,
      editResult: null
    };
  }

  async componentDidMount() {
    const id = this.props.feedbackArr[0].feedbackId;
    const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_11__["default"].resolveClientUrl(`MultipleLogs/GetLogSettingByFeedbackId/${id}`);
    await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_10__["default"].getDataAsync(url).then(response => {
      const data = response.data;
      const communicationSettings = this.getCommunicationSettings(data.communicationLog, data.settings);
      const extensionOptions = data.settings.extensions.map(item => {
        return {
          id: item.id,
          value: item.value,
          checked: communicationSettings.extensionIds.includes(item.id)
        };
      });
      const sitesOptions = data.settings.sites;
      const communicationToolOptions = data.settings.communicationTools.map(item => {
        return {
          id: item.id,
          name: item.name,
          checked: communicationSettings.communicationToolIds.includes(item.id)
        };
      });
      const mainCategoryOptions = data.settings.mainCategories.map(item => {
        return {
          mainCategoryID: item.mainCategoryID,
          name: item.name,
          checked: communicationSettings.mainCategoryIds.includes(item.mainCategoryID)
        };
      });
      const subCategories = data.settings.subCategories.filter(item => communicationSettings.mainCategoryIds.includes(item.mainCategoryID));
      const subCategoryOptions = subCategories.map(item => {
        return {
          subCategoryId: item.subCategoryId,
          name: item.name,
          checked: communicationSettings.subCategoryIds.includes(item.subCategoryId)
        };
      });
      const productOptions = data.settings.products.map(item => {
        return {
          id: item.id,
          value: item.value,
          checked: communicationSettings.productIds.includes(item.id)
        };
      });
      const subProducts = data.settings.subProducts.filter(item => communicationSettings.productIds.includes(item.parentId) && item.parentId !== 0);
      const subProductOptions = subProducts.map(sub => {
        return {
          id: sub.id,
          value: sub.value,
          checked: communicationSettings.productIds.includes(sub.id)
        };
      });
      const bettypes = data.settings.bettypes.filter(item => communicationSettings.subProductIds.includes(item.parentId) && item.parentId !== 0);
      const betTypeOptions = bettypes.map(item => {
        return {
          id: item.id,
          value: item.value,
          checked: communicationSettings.betTypeIds.includes(item.id)
        };
      });
      this.setState({
        communication: this.initFormik(data.communicationLog, data.settings),
        settings: data.settings,
        hasReviewFeedbackPermission: data.hasReviewFeedbackPermission,
        extensionOptions,
        productOptions,
        subProductOptions,
        betTypeOptions,
        communicationToolOptions,
        mainCategoryOptions,
        subCategoryOptions,
        sitesOptions
      });
    });
  }

  render() {
    const {
      communication,
      settings,
      confirmEditMultipleLogsDialog
    } = this.state;

    if (communication === null || settings === null) {
      return null;
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"], {
      show: true,
      className: "edit-multiple-log",
      dialogAs: _jsroot_components_DraggableModalDialog__WEBPACK_IMPORTED_MODULE_4__["default"],
      backdrop: "static",
      keyboard: false,
      size: "xl",
      centered: true,
      onHide: () => this.props.onClose(false)
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Header, {
      closeButton: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Title, {
      as: "div"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('EditMultipleLogs'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_3__["Formik"], {
      innerRef: el => this.formik = el,
      initialValues: communication,
      validate: values => Object(_common_functions_js__WEBPACK_IMPORTED_MODULE_18__["getValidateFormik"])(values, settings),
      onSubmit: this.handleSubmit
    }, this.renderForm)), confirmEditMultipleLogsDialog.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_SweetModalDialog__WEBPACK_IMPORTED_MODULE_9__["default"], {
      size: "lg",
      title: _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('ConfirmMultipleUpdates'),
      contents: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('ConfirmEditMultipleLogsContent')),
      buttons: [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
        variant: "primary",
        size: "sm",
        onClick: this.handleConfirmEditMultipleLogs
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('OK')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
        variant: "primary",
        size: "sm",
        onClick: this.handleCloseConfirmEditMultipleLogsDialog
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Cancel'))],
      onClose: this.handleCloseConfirmEditMultipleLogsDialog
    }));
  }

}

_defineProperty(EditMultipleLogs, "propTypes", {
  feedbackArr: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array.isRequired,
  onClose: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
});

_defineProperty(EditMultipleLogs, "defaultProps", {
  feedbackArr: [],
  onClose: function () {// nothing
  }
});

/* harmony default export */ __webpack_exports__["default"] = (EditMultipleLogs);

/***/ }),

/***/ "./www/sources/js/pages/feedback/manage-feedback/components/EditMultipleReviewAndStatus.jsx":
/*!**************************************************************************************************!*\
  !*** ./www/sources/js/pages/feedback/manage-feedback/components/EditMultipleReviewAndStatus.jsx ***!
  \**************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EditMultipleReviewAndStatus; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! formik */ "./node_modules/formik/dist/formik.esm.js");
/* harmony import */ var _jsroot_components_ckeditor_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/components/ckeditor/index */ "./www/sources/js/components/ckeditor/index.jsx");
/* harmony import */ var _jsroot_components_DraggableModalDialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/components/DraggableModalDialog */ "./www/sources/js/components/DraggableModalDialog.jsx");
/* harmony import */ var _jsroot_components_ResponseMessage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/components/ResponseMessage */ "./www/sources/js/components/ResponseMessage.jsx");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var _jsroot_components_FormikErrorMessage__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jsroot/components/FormikErrorMessage */ "./www/sources/js/components/FormikErrorMessage.jsx");
/* harmony import */ var _jsroot_common_site__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @jsroot/common/site */ "./www/sources/js/common/site.js");
/* harmony import */ var _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @jsroot/common/dataService */ "./www/sources/js/common/dataService.js");
/* harmony import */ var _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @jsroot/common/dateTimeService */ "./www/sources/js/common/dateTimeService.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }













class EditMultipleReviewAndStatus extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleSubmit", async values => {
      this.setState({
        isSubmitting: true
      });
      const params = {
        listFeedbackId: this.props.feedbackIds.join(', '),
        statusId: parseInt(values.statusId, 10),
        reviewNote: values.review,
        isReviewed: this.state.isReviewed
      };
      const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_9__["default"].resolveClientUrl('MultipleLogs/EditMultipleLogStatuses');
      await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_10__["default"].postDataAsync(url, params).then(response => {
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

    _defineProperty(this, "handleChangeCheckBox", () => {
      this.setState(prevState => ({
        isReviewed: !prevState.isReviewed
      }));
    });

    _defineProperty(this, "validateFormik", values => {
      const errors = {};

      if (this.state.isReviewed && values.review === '') {
        errors.review = _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('ReviewRequired');
      }

      return errors;
    });

    _defineProperty(this, "renderForm", ({
      values,
      errors,
      touched,
      handleChange,
      handleSubmit,
      setFieldValue
    }) => {
      const {
        editResult,
        logInfo,
        isReviewed
      } = this.state;
      const dateFormat = _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_11__["default"].toShortDateTimeFormat(logInfo.solveDate);
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"], {
        noValidate: true,
        onSubmit: handleSubmit
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Body, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_FormikErrorMessage__WEBPACK_IMPORTED_MODULE_8__["default"], {
        touched: touched,
        errors: errors,
        fieldNames: Object.keys(values)
      }), editResult && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_ResponseMessage__WEBPACK_IMPORTED_MODULE_6__["default"], {
        isSuccessful: editResult.isSuccessful,
        message: editResult.message || _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('UpdateMultipleLogsSuccessfully')
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "panel-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "alert-box-warn"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Label, {
        className: "text",
        column: true,
        sm: "12",
        md: "12"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('MultipleReviewAndUpdateStatusText')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Row"],
        className: "pb-2"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Label, {
        column: true,
        sm: "2",
        md: "2",
        htmlFor: "status"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Status')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
        sm: "3",
        md: "3"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Control, {
        as: "select",
        size: "sm",
        column: true,
        sm: "3",
        md: "3",
        name: "statusId",
        id: "statusId",
        value: values.statusId,
        onChange: handleChange
      }, this.props.statuses.map(item => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        key: item.statusId,
        value: item.statusId
      }, item.name)))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Row"],
        className: "title"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Label, {
        className: "mr-2",
        column: true,
        sm: "1",
        md: "1"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Reviewed')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "checkbox",
        className: "cursor-pointer",
        checked: isReviewed,
        onChange: this.handleChangeCheckBox
      }), logInfo.isReviewed && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Label, {
        column: true,
        sm: "5",
        md: "5"
      }, `(Reviewed by ${logInfo.reviewer} on ${dateFormat})`)), isReviewed && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "text-editor"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_ckeditor_index__WEBPACK_IMPORTED_MODULE_4__["default"], {
        isInvalid: touched.review && errors.review,
        data: values.review,
        onChange: value => setFieldValue('review', value)
      })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Footer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
        size: "sm",
        type: "submit",
        variant: "primary",
        disabled: this.state.isSubmitting
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Save'))));
    });

    this.state = {
      feedbackIds: props.feedbackIds,
      logInfo: null,
      editResult: null,
      isReviewed: false,
      isSubmitting: false
    };
  }

  async componentDidMount() {
    const id = this.props.feedbackIds[0];
    const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_9__["default"].resolveClientUrl(`MultipleLogs/GetLogByFeedbackId/${id}`);
    await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_10__["default"].getDataAsync(url).then(response => {
      this.setState({
        logInfo: response.data,
        isReviewed: response.data.isReviewed
      });
    });
  }

  render() {
    if (this.state.logInfo === null) {
      return null;
    }

    const initialValues = {
      statusId: this.state.logInfo.statusId,
      review: this.state.logInfo.review
    };
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"], {
      show: true,
      className: "edit-multiple-review-status-modal-dialog",
      dialogAs: _jsroot_components_DraggableModalDialog__WEBPACK_IMPORTED_MODULE_5__["default"],
      backdrop: "static",
      keyboard: false,
      size: "lg",
      centered: true,
      onHide: () => this.props.onClose(false)
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Header, {
      closeButton: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Title, {
      as: "div"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('MultipleReviewAndUpdateStatus'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_3__["Formik"], {
      initialValues: initialValues,
      validate: this.validateFormik,
      onSubmit: this.handleSubmit
    }, this.renderForm));
  }

}

_defineProperty(EditMultipleReviewAndStatus, "propTypes", {
  onClose: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired
});

_defineProperty(EditMultipleReviewAndStatus, "defaultProps", {
  onClose: function () {// nothing
  }
});

/***/ }),

/***/ "./www/sources/js/pages/feedback/manage-feedback/components/Filter.jsx":
/*!*****************************************************************************!*\
  !*** ./www/sources/js/pages/feedback/manage-feedback/components/Filter.jsx ***!
  \*****************************************************************************/
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
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/feedback/manage-feedback/actions.js");
/* harmony import */ var _jsroot_components_date_picker_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/components/date-picker/index */ "./www/sources/js/components/date-picker/index.jsx");
/* harmony import */ var _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/common/dateTimeService */ "./www/sources/js/common/dateTimeService.js");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









class Filter extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleChangeFromDate", fromDate => {
      const currentTime = new Date(_jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__["default"].toShortDateTimeFormat(new Date(this.currentClientTime)));
      const maxDate = new Date(fromDate.getTime());
      maxDate.setMonth(fromDate.getMonth() + 12);
      maxDate.setDate(fromDate.getDate() - 1);
      this.minToDate = fromDate;
      this.maxToDate = maxDate < currentTime ? maxDate : currentTime;
      this.setState({
        fromDate: fromDate,
        toDate: maxDate < currentTime ? maxDate : currentTime
      });
    });

    _defineProperty(this, "handleChangeToDate", toDate => {
      this.setState({
        toDate
      });
    });

    _defineProperty(this, "handleChange", evt => {
      this.setState(_objectSpread(_objectSpread({}, this.state), {}, {
        [evt.target.name]: evt.target.type === 'select-one' ? parseInt(evt.target.value, 10) : evt.target.value
      }));
    });

    _defineProperty(this, "renderOptions", (name, item, key) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
      key: key,
      value: item
    }, name));

    _defineProperty(this, "handleSubmit", () => {
      const {
        mainCategoryId,
        runningNumber,
        fromDate,
        toDate,
        username,
        handler,
        subCategoryId,
        communicationId,
        reviewer,
        statusId,
        responseId,
        isReviewed,
        isGuest
      } = this.state;
      const params = {
        feedbackId: runningNumber !== '' ? runningNumber : null,
        userName: username,
        isGuest: isGuest === -1 ? null : isGuest,
        fromDate: _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__["default"].toShortDateFormat(fromDate),
        toDate: _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__["default"].toShortDateFormat(toDate),
        mainCategoryId: mainCategoryId === 0 ? '' : mainCategoryId,
        subCategoryId: subCategoryId === 0 ? '' : subCategoryId,
        communicationId: communicationId === 0 ? '' : communicationId,
        statusId: statusId === 0 ? '' : statusId,
        responseId: responseId === 0 ? '' : responseId,
        isReviewed: isReviewed,
        handledBy: handler,
        reviewer: reviewer,
        pageIndex: 1,
        pageSize: 100
      };
      this.props.setGridParams(params);
      this.props.getGridFeedbacks(params);
    });

    _defineProperty(this, "filterCategories", (mainCategories, subCategories) => {
      const mainCategoriesArr = [];
      mainCategories.map(value => {
        const subCategoriesFilter = subCategories.filter(item => item.mainCategoryID === value.mainCategoryID);
        subCategoriesFilter.unshift({
          name: 'All',
          subCategoryId: 0
        });
        mainCategoriesArr.push({
          mainCategoryID: value.mainCategoryID,
          name: value.name,
          subCate: subCategoriesFilter
        });
      });
      mainCategoriesArr.unshift({
        mainCategoryID: 0,
        name: 'All',
        subCate: [{
          name: 'All',
          subCategoryId: 0
        }]
      });
      return mainCategoriesArr;
    });

    _defineProperty(this, "filterSubCategories", (mainCategories, mainCategoryId) => mainCategories.filter(item => item.mainCategoryID === parseInt(mainCategoryId, 10)));

    this.currentClientTime = window.currentClientTime;
    const currentDate = new Date(_jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__["default"].toShortDateTimeFormat(new Date(this.currentClientTime)));

    const _fromDate = new Date(_jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__["default"].toShortDateTimeFormat(new Date(this.currentClientTime)));

    _fromDate.setDate(_fromDate.getDate() - 1);

    this.maxFromDate = currentDate;
    this.maxToDate = currentDate;
    this.minToDate = _fromDate;
    this.state = {
      runningNumber: '',
      fromDate: _fromDate,
      toDate: currentDate,
      username: '',
      handler: '',
      mainCategoryId: 0,
      subCategoryId: 0,
      communicationId: 0,
      reviewer: '',
      statusId: 0,
      responseId: 0,
      isReviewed: '',
      isGuest: -1
    };
  }

  render() {
    const {
      settings
    } = this.props;

    if (settings === null || this.initialValues === null) {
      return null;
    }

    const reviews = [{
      settingValue: 'All',
      settingId: ''
    }, {
      settingValue: 'Review',
      settingId: 1
    }, {
      settingValue: 'Not Reviewed',
      settingId: 0
    }];
    const {
      mainCategoryId,
      runningNumber,
      fromDate,
      toDate,
      username,
      handler,
      subCategoryId,
      communicationId,
      reviewer,
      statusId,
      responseId,
      isReviewed,
      isGuest
    } = this.state;
    const {
      customerTypes,
      responses,
      mainCategories,
      subCategories,
      communications,
      statuses
    } = this.props.settings;
    const responsesOptions = [{
      id: 0,
      value: 'All'
    }, ...responses];
    const statusesOptions = [{
      statusId: 0,
      name: 'All'
    }, ...statuses];
    const statuesFilterDelete = statusesOptions.filter(x => x.name !== 'Deleted');
    const communicationOptions = [{
      id: 0,
      name: 'All'
    }, ...communications];
    const mainCategoryOptions = this.filterCategories(mainCategories, subCategories);
    const subCategoryOptions = this.filterSubCategories(mainCategoryOptions, mainCategoryId);
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"], {
      className: "form-filter",
      onSubmit: this.handleSubmit
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Row, {
      bsPrefix: "form-row"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
      htmlFor: "runningNumber"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('RunningNumber')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Control, {
      type: "text",
      size: "sm",
      value: runningNumber,
      name: "runningNumber",
      id: "runningNumber",
      className: "shadow-none",
      autoComplete: "off",
      onChange: this.handleChange
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, {
      className: "sm-width"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
      htmlFor: "fromDate"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('FromDate')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "react-datepicker-wrapper-container"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_date_picker_index__WEBPACK_IMPORTED_MODULE_5__["default"], {
      dropdownMode: "select",
      showMonthDropdown: true,
      showYearDropdown: true,
      selected: fromDate,
      maxDate: new Date(this.maxFromDate),
      onChange: value => this.handleChangeFromDate(value)
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, {
      className: "sm-width"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, null, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('ToDate')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "react-datepicker-wrapper-container"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_date_picker_index__WEBPACK_IMPORTED_MODULE_5__["default"], {
      dropdownMode: "select",
      selected: toDate,
      showMonthDropdown: true,
      showYearDropdown: true,
      minDate: new Date(this.minToDate),
      maxDate: new Date(this.maxToDate),
      onChange: value => this.handleChangeToDate(value)
    })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Row, {
      bsPrefix: "form-row"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
      htmlFor: "username"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Username')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Control, {
      type: "text",
      size: "sm",
      value: username,
      name: "username",
      id: "username",
      className: "shadow-none username-width",
      autoComplete: "off",
      onChange: this.handleChange
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Control, {
      as: "select",
      size: "sm",
      name: "isGuest",
      id: "isGuest",
      className: "shadow-none response-width",
      value: isGuest,
      onChange: this.handleChange
    }, customerTypes.map((value, key) => this.renderOptions(value.settingValue, value.settingId, key)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, {
      className: "sm-width"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
      htmlFor: "isReviewed"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('IsReviewed')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Control, {
      as: "select",
      size: "sm",
      name: "isReviewed",
      id: "isReviewed",
      className: "select-options",
      value: isReviewed,
      onChange: this.handleChange
    }, reviews.map((value, key) => this.renderOptions(value.settingValue, value.settingId, key)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, {
      className: "sm-width"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
      htmlFor: "responseId"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('CustomerResponse')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Control, {
      as: "select",
      size: "sm",
      name: "responseId",
      id: "responseId",
      className: "select-options",
      value: responseId,
      onChange: this.handleChange
    }, responsesOptions.map((value, key) => this.renderOptions(value.value, value.id, key))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Row, {
      bsPrefix: "form-row"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
      htmlFor: "mainCategoryId"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('MainCategory')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Control, {
      as: "select",
      size: "sm",
      name: "mainCategoryId",
      id: "mainCategoryId",
      value: mainCategoryId,
      onChange: this.handleChange
    }, mainCategoryOptions.map((value, key) => this.renderOptions(value.name, value.mainCategoryID, key)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, {
      className: "subCategory-width"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
      htmlFor: "subCategoryId"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('SubCategory')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Control, {
      as: "select",
      size: "sm",
      name: "subCategoryId",
      value: subCategoryId,
      onChange: this.handleChange
    }, subCategoryOptions[0].subCate.map((value, key) => this.renderOptions(value.name, value.subCategoryId, key))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Row, {
      bsPrefix: "form-row"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
      htmlFor: "communicationId"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Communication')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Control, {
      as: "select",
      size: "sm",
      name: "communicationId",
      id: "communicationId",
      className: "select-options-sm mr-2",
      value: communicationId,
      onChange: this.handleChange
    }, communicationOptions.map((value, key) => this.renderOptions(value.name, value.id, key))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
      className: "label-status",
      htmlFor: "status"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Status')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Control, {
      as: "select",
      size: "sm",
      name: "statusId",
      id: "statusId",
      className: "select-options-sm",
      value: statusId,
      onChange: this.handleChange
    }, statuesFilterDelete.map((value, key) => this.renderOptions(value.name, value.statusId, key)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, {
      className: "sm-width"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
      htmlFor: "handler"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Handler')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Control, {
      type: "text",
      size: "sm",
      value: handler,
      name: "handler",
      autoComplete: "off",
      className: "shadow-none select-options",
      onChange: this.handleChange
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, {
      className: "sm-width"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
      htmlFor: "reviewer"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Reviewer')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Control, {
      type: "text",
      size: "sm",
      value: reviewer,
      name: "reviewer",
      autoComplete: "off",
      className: "shadow-none select-options",
      onChange: this.handleChange
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], {
      variant: "primary",
      size: "sm",
      onClick: this.handleSubmit
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Submit')))));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_4__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    settings
  } = state;
  return {
    settings
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(Filter));

/***/ }),

/***/ "./www/sources/js/pages/feedback/manage-feedback/index.js":
/*!****************************************************************!*\
  !*** ./www/sources/js/pages/feedback/manage-feedback/index.js ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return index; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @reduxjs/toolkit */ "./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");
/* harmony import */ var _manageFeedbackSlice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./manageFeedbackSlice */ "./www/sources/js/pages/feedback/manage-feedback/manageFeedbackSlice.js");
/* harmony import */ var _components_AppContainer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/AppContainer */ "./www/sources/js/pages/feedback/manage-feedback/components/AppContainer.jsx");
/* harmony import */ var _cssroot_pages_feedback_manage_feedback_index_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @cssroot/pages/feedback/manage-feedback/index.scss */ "./www/sources/css/pages/feedback/manage-feedback/index.scss");
/* harmony import */ var _cssroot_pages_feedback_manage_feedback_index_scss__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_cssroot_pages_feedback_manage_feedback_index_scss__WEBPACK_IMPORTED_MODULE_5__);





const store = Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__["configureStore"])({
  reducer: _manageFeedbackSlice__WEBPACK_IMPORTED_MODULE_3__["default"]
});

class index extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_1__["Provider"], {
      store: store
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "manage-feedback"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_AppContainer__WEBPACK_IMPORTED_MODULE_4__["default"], null)));
  }

}

/***/ }),

/***/ "./www/sources/js/pages/feedback/manage-feedback/manageFeedbackSlice.js":
/*!******************************************************************************!*\
  !*** ./www/sources/js/pages/feedback/manage-feedback/manageFeedbackSlice.js ***!
  \******************************************************************************/
/*! exports provided: setAllSettings, setGridParams, setGridFeedbacks, setEditFeedbackDialog, setEditNoOfInquiryDialog, setEditMultipleLogStatusDialog, setEditMultipleLogDialog, setViewRelatedCustomerDialog, resetState, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setAllSettings", function() { return setAllSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setGridParams", function() { return setGridParams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setGridFeedbacks", function() { return setGridFeedbacks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setEditFeedbackDialog", function() { return setEditFeedbackDialog; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setEditNoOfInquiryDialog", function() { return setEditNoOfInquiryDialog; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setEditMultipleLogStatusDialog", function() { return setEditMultipleLogStatusDialog; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setEditMultipleLogDialog", function() { return setEditMultipleLogDialog; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setViewRelatedCustomerDialog", function() { return setViewRelatedCustomerDialog; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetState", function() { return resetState; });
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @reduxjs/toolkit */ "./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");

const initialState = {
  settings: null,
  gridParams: {
    pageIndex: 1,
    pageSize: 100
  },
  gridDataFeedbacks: null,
  editFeedbackDialog: {
    show: false
  },
  editNoOfInquiryDialog: {
    show: false
  },
  editMultipleLogStatusDialog: {
    show: false
  },
  editMultipleLogDialog: {
    show: false
  },
  viewRelatedCustomerDialog: {
    show: false
  }
};
const manageFeedbackSlice = Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__["createSlice"])({
  name: 'manageFeedback',
  initialState: initialState,
  reducers: {
    resetState: () => initialState,
    setAllSettings: (state, action) => {
      state.settings = action.payload;
    },
    setGridParams: (state, action) => {
      state.gridParams = action.payload;
    },
    setGridFeedbacks: (state, action) => {
      state.gridDataFeedbacks = action.payload;
    },
    setEditFeedbackDialog: (state, action) => {
      state.editFeedbackDialog = action.payload;
    },
    setEditNoOfInquiryDialog: (state, action) => {
      state.editNoOfInquiryDialog = action.payload;
    },
    setEditMultipleLogStatusDialog: (state, action) => {
      state.editMultipleLogStatusDialog = action.payload;
    },
    setEditMultipleLogDialog: (state, action) => {
      state.editMultipleLogDialog = action.payload;
    },
    setViewRelatedCustomerDialog: (state, action) => {
      state.viewRelatedCustomerDialog = action.payload;
    }
  }
});
const {
  actions,
  reducer
} = manageFeedbackSlice;
const {
  setAllSettings,
  setGridParams,
  setGridFeedbacks,
  setEditFeedbackDialog,
  setEditNoOfInquiryDialog,
  setEditMultipleLogStatusDialog,
  setEditMultipleLogDialog,
  setViewRelatedCustomerDialog,
  resetState
} = actions;
/* harmony default export */ __webpack_exports__["default"] = (reducer);

/***/ })

}]);
//# sourceMappingURL=8.chunk.js.map