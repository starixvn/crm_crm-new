(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[27],{

/***/ "./www/sources/css/pages/feedback/latest-feedback.scss":
/*!*************************************************************!*\
  !*** ./www/sources/css/pages/feedback/latest-feedback.scss ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./www/sources/js/pages/feedback/latest-feedback/actions.js":
/*!******************************************************************!*\
  !*** ./www/sources/js/pages/feedback/latest-feedback/actions.js ***!
  \******************************************************************/
/*! exports provided: ActionCreators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionCreators", function() { return ActionCreators; });
/* harmony import */ var _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/common/dataService */ "./www/sources/js/common/dataService.js");
/* harmony import */ var _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/common/site */ "./www/sources/js/common/site.js");
/* harmony import */ var _latestFeedbackSlide__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./latestFeedbackSlide */ "./www/sources/js/pages/feedback/latest-feedback/latestFeedbackSlide.js");




const getLatestFeedback = params => async dispatch => {
  _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].blockUI();
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('LatestFeedback/GetLatestFeedback');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__["default"].postDataAsync(url, params).then(response => {
    dispatch(Object(_latestFeedbackSlide__WEBPACK_IMPORTED_MODULE_2__["setLatestFeedback"])(response.data));
  }).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].unblockUI());
};

const exportExcel = params => async () => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('LatestFeedback/ExportExcel');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__["default"].getFileAsync(url, params).then(response => {
    const fileName = response.headers['content-disposition'].split('filename=')[1].split(";")[0];
    _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].downloadFile(response.data, fileName);
  });
};

const ActionCreators = {
  setLatestFeedback: _latestFeedbackSlide__WEBPACK_IMPORTED_MODULE_2__["setLatestFeedback"],
  setGridParams: _latestFeedbackSlide__WEBPACK_IMPORTED_MODULE_2__["setGridParams"],
  setViewRelatedCustomerDialog: _latestFeedbackSlide__WEBPACK_IMPORTED_MODULE_2__["setViewRelatedCustomerDialog"],
  setEditFeedbackDialog: _latestFeedbackSlide__WEBPACK_IMPORTED_MODULE_2__["setEditFeedbackDialog"],
  getLatestFeedback,
  exportExcel,
  setEditNoOfInquiryDialog: _latestFeedbackSlide__WEBPACK_IMPORTED_MODULE_2__["setEditNoOfInquiryDialog"],
  resetState: _latestFeedbackSlide__WEBPACK_IMPORTED_MODULE_2__["resetState"]
};

/***/ }),

/***/ "./www/sources/js/pages/feedback/latest-feedback/components/AppContainer.jsx":
/*!***********************************************************************************!*\
  !*** ./www/sources/js/pages/feedback/latest-feedback/components/AppContainer.jsx ***!
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
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/feedback/latest-feedback/actions.js");
/* harmony import */ var _Filter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Filter */ "./www/sources/js/pages/feedback/latest-feedback/components/Filter.jsx");
/* harmony import */ var _DataGrid__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./DataGrid */ "./www/sources/js/pages/feedback/latest-feedback/components/DataGrid.jsx");
/* harmony import */ var _edit_no_of_inquiry_AppContainer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../edit-no-of-inquiry/AppContainer */ "./www/sources/js/pages/feedback/edit-no-of-inquiry/AppContainer.jsx");
/* harmony import */ var _edit_customer_feedback_AppContainer__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../edit-customer-feedback/AppContainer */ "./www/sources/js/pages/feedback/edit-customer-feedback/AppContainer.jsx");
/* harmony import */ var _jsroot_components_SweetModalDialog__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @jsroot/components/SweetModalDialog */ "./www/sources/js/components/SweetModalDialog.jsx");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @jsroot/common/constants */ "./www/sources/js/common/constants.js");
/* harmony import */ var _jsroot_common_shareScripts__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @jsroot/common/shareScripts */ "./www/sources/js/common/shareScripts.js");
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
        this.props.getLatestFeedback(this.props.gridParams);
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
    this.props.getLatestFeedback(this.props.gridParams);
    Object(_jsroot_common_shareScripts__WEBPACK_IMPORTED_MODULE_13__["getPermission"])(_jsroot_common_constants__WEBPACK_IMPORTED_MODULE_12__["FunctionKey"].CreateUpdateFeedbackAndCustomerInfo).then(response => {
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

    const isHost = this.state.policy === _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_12__["Policy"].Host;
    const {
      viewRelatedCustomerDialog,
      editNoOfInquiryDialog,
      editFeedbackDialog
    } = this.props;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Filter__WEBPACK_IMPORTED_MODULE_6__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DataGrid__WEBPACK_IMPORTED_MODULE_7__["default"], {
      isHost: isHost
    }), viewRelatedCustomerDialog.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_SweetModalDialog__WEBPACK_IMPORTED_MODULE_10__["default"], {
      size: "lg",
      title: _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_11__["default"].getResource('RelatedCustomer'),
      contents: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, viewRelatedCustomerDialog.relatedCustomers),
      buttons: [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], {
        variant: "primary",
        size: "sm",
        onClick: this.handleCloseViewRelatedCustomerDialog
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_11__["default"].getResource('Close'))],
      onClose: this.handleCloseViewRelatedCustomerDialog
    }), editNoOfInquiryDialog.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_edit_no_of_inquiry_AppContainer__WEBPACK_IMPORTED_MODULE_8__["default"], {
      feedbackId: editNoOfInquiryDialog.feedbackId,
      onClose: this.handleCloseEditNoInquiryDialog
    }), editFeedbackDialog.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_edit_customer_feedback_AppContainer__WEBPACK_IMPORTED_MODULE_9__["default"], {
      feedbackId: editFeedbackDialog.feedbackId,
      onClose: this.handleCloseEditFeedbackDialog
    }));
  }

}

_defineProperty(AppContainer, "propTypes", {
  getLatestFeedback: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  editNoOfInquiryDialog: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    show: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool
  }).isRequired,
  editFeedbackDialog: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    show: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool
  }).isRequired
});

_defineProperty(AppContainer, "defaultProps", {
  viewRelatedCustomerDialog: {
    show: false
  },
  editNoOfInquiryDialog: {
    show: false
  },
  editFeedbackDialog: {
    show: false
  },
  getLatestFeedback: function () {// nothing
  }
});

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_3__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_5__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    gridParams,
    viewRelatedCustomerDialog,
    editNoOfInquiryDialog,
    editFeedbackDialog
  } = state;
  return {
    gridParams,
    viewRelatedCustomerDialog,
    editNoOfInquiryDialog,
    editFeedbackDialog
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(AppContainer));

/***/ }),

/***/ "./www/sources/js/pages/feedback/latest-feedback/components/DataGrid.jsx":
/*!*******************************************************************************!*\
  !*** ./www/sources/js/pages/feedback/latest-feedback/components/DataGrid.jsx ***!
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
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/feedback/latest-feedback/actions.js");
/* harmony import */ var _jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/components/react-grid/index */ "./www/sources/js/components/react-grid/index.jsx");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var react_bootstrap_Tooltip__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-bootstrap/Tooltip */ "./node_modules/react-bootstrap/esm/Tooltip.js");
/* harmony import */ var _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jsroot/common/dateTimeService */ "./www/sources/js/common/dateTimeService.js");
/* harmony import */ var _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @jsroot/common/constants */ "./www/sources/js/common/constants.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }











class DataGrid extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "handleExportExcel", () => {
      const {
        gridParams
      } = this.props;
      this.props.exportExcel(gridParams);
    });

    _defineProperty(this, "buildHeader", () => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderRow"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 7
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('RunningNo.')), this.props.isHost && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 5
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Update')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 20
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Feedback')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 20
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Category')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 5
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Status')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 15
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('RelatedCustomer')));
    });

    _defineProperty(this, "buildBody", () => {
      const {
        isHost,
        gridData
      } = this.props;

      if (gridData.data.length > 0) {
        return gridData.data.map((item, index) => this.renderRow(item, index, isHost));
      }

      return [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Row"], {
        key: `body${1}`,
        className: "no-data"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
        className: "text-center",
        colSpan: isHost ? 6 : 5
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('ThereIsNoData')))];
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

    _defineProperty(this, "renderCategoryColumn", item => {
      const {
        mainCategories
      } = this.props.gridData;
      const settings = item.settings;
      const mainCategoryIds = [];

      for (let i = 0; i < settings.length; i++) {
        if (settings[i].settingType === 'Category' && mainCategoryIds.indexOf(settings[i].settingId) < 0) {
          mainCategoryIds.push(settings[i].settingId);
        }
      }

      const categories = [];

      for (let i = 0; i < mainCategoryIds.length; i++) {
        const subCategoryIds = [];

        for (let j = 0; j < settings.length; j++) {
          if (settings[j].settingType === 'Category' && settings[j].settingId === mainCategoryIds[i]) {
            subCategoryIds.push(settings[j].subSettingId);
          }
        }

        categories.push({
          mainCategoryId: mainCategoryIds[i],
          subCategoryIds: subCategoryIds
        });
      }

      let result = '';

      for (let i = 0; i < categories.length; i++) {
        result += `<div class="font-weight-bold">${this.getMainCategoryName(categories[i].mainCategoryId, mainCategories)}</div>`;
        const subCategoryIds = categories[i].subCategoryIds;

        for (let j = 0; j < subCategoryIds.length; j++) {
          result += `<div class="font-italic ml-3">
                        ${this.getSubCategoryName(categories[i].mainCategoryId, subCategoryIds[j], mainCategories)}
                    </div>`;
        }
      }

      return result;
    });

    _defineProperty(this, "getMainCategoryName", (mainCategoryId, mainCategories) => {
      for (let i = 0; i < mainCategories.length; i++) {
        if (mainCategories[i].settingId === mainCategoryId) {
          return mainCategories[i].settingValue;
        }
      }

      return 'N/A';
    });

    _defineProperty(this, "getSubCategoryName", (mainCategoryId, subCategoryId, mainCategories) => {
      let mainCategory = null;

      for (let i = 0; i < mainCategories.length; i++) {
        if (mainCategories[i].settingId === mainCategoryId) {
          mainCategory = mainCategories[i];
          break;
        }
      }

      if (mainCategory) {
        for (let j = 0; j < mainCategory.childSettings.length; j++) {
          if (mainCategory.childSettings[j].subCategoryId === subCategoryId) {
            return mainCategory.childSettings[j].name;
          }
        }
      }

      return '';
    });

    _defineProperty(this, "handleOpenViewRelatedCustomerDialog", relatedCustomers => {
      this.props.setViewRelatedCustomerDialog({
        show: true,
        relatedCustomers
      });
    });

    _defineProperty(this, "renderRelatedCustomerColumn", relatedCustomers => {
      let html = '';
      const totalItems = relatedCustomers.length;

      if (totalItems > _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_9__["MaximumDisplayRelatedCustomer"]) {
        html = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
          href: "#",
          onClick: () => this.handleOpenViewRelatedCustomerDialog(relatedCustomers.join(', '))
        }, totalItems, " customers");
      } else {
        html = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, relatedCustomers.join(', '));
      }

      return html;
    });

    _defineProperty(this, "renderRow", (item, index, isHost) => {
      const status = item.status ? item.status.toLowerCase() : '',
            cssClass = status !== 'pending' && status !== 'closed' ? '' : status;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Row"], {
        key: index,
        className: cssClass
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
        className: "text-center"
      }, item.feedbackId), isHost && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
        className: "text-center"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "rounded-circle fa fa-pencil icon-edit",
        onClick: () => this.handleEditNoOfInquiry(item.feedbackId)
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], null, this.tooltipFeedback(item), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "feedback-info"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "Feedback date ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, " ", _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_8__["default"].toShortDateTimeFormat(item.feedbackDate))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "By", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, " ", item.creatorName, " "), "on ", _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_8__["default"].toShortDateTimeFormat(item.createDate)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "Solving Duration: ", item.durationTime), item.reviewerName && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "Reviewed by ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, " ", item.reviewerName, " "), " on ", _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_8__["default"].toShortDateTimeFormat(item.solveDate)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        dangerouslySetInnerHTML: {
          __html: this.renderCategoryColumn(item)
        }
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
        className: "text-center"
      }, item.status ? item.status : 'N/A'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], null, this.renderRelatedCustomerColumn(item.relatedCustomer.split(','))));
    });

    _defineProperty(this, "renderExportExcelText", () => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap_OverlayTrigger__WEBPACK_IMPORTED_MODULE_3__["default"], {
        placement: "auto",
        overlay: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap_Tooltip__WEBPACK_IMPORTED_MODULE_7__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Export to Excel"))
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "fa fa-file-excel-o icon-excel",
        onClick: this.handleExportExcel
      }));
    });

    _defineProperty(this, "tooltipFeedback", item => {
      const descriptionText = !item.description ? '' : `Description: <br>${item.description}<br>`,
            solutionText = !item.solution ? '' : `Solution: <br>${item.solution}<br>`,
            lastCharacterSlit = descriptionText.substring(578, 580),
            isEscapseWord = '<br />'.includes(lastCharacterSlit),
            subLength = isEscapseWord ? 592 : 580;
      const lastCharacterSlitSolution = solutionText.substring(578, 580),
            isEscapseWordSolution = '<br />'.includes(lastCharacterSlitSolution),
            subLengthSolution = isEscapseWordSolution ? 592 : 580;
      const tooltipDescription = descriptionText.length > subLength ? descriptionText.substring(0, subLength) + ' ... <br><br>' : descriptionText;
      const tooltipSolution = solutionText.length > subLengthSolution ? solutionText.substring(0, subLengthSolution) + ' ... <br><br>' : solutionText;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap_OverlayTrigger__WEBPACK_IMPORTED_MODULE_3__["default"], {
        placement: "bottom",
        overlay: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap_Tooltip__WEBPACK_IMPORTED_MODULE_7__["default"], {
          className: "tooltipFeedback"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          dangerouslySetInnerHTML: {
            __html: tooltipDescription + tooltipSolution
          }
        }))
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "pb-1",
        onClick: () => this.handleEditFeedback(item.feedbackId)
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "rounded-circle fa fa-pencil-square-o"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", {
        className: "link-click"
      }, " ", item.subject)));
    });
  }

  render() {
    const {
      gridParams,
      gridData
    } = this.props;

    if (!gridData || !gridData.data) {
      return null;
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "table-title d-flex justify-content-between align-items-center"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Top ", gridParams.top, " Feedback"), gridData.data.length > 0 && this.renderExportExcelText()), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Table"], {
      width: 1200,
      autoWidth: false,
      header: this.buildHeader(),
      body: this.buildBody(),
      containerPadding: 0,
      adjustedHeight: 10
    }));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_4__["ActionCreators"], dispatch);

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

/***/ "./www/sources/js/pages/feedback/latest-feedback/components/Filter.jsx":
/*!*****************************************************************************!*\
  !*** ./www/sources/js/pages/feedback/latest-feedback/components/Filter.jsx ***!
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
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/feedback/latest-feedback/actions.js");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







class Filter extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "getParams", top => {
      return {
        top
      };
    });

    _defineProperty(this, "handleTopChange", event => {
      this.setState({
        top: parseInt(event.target.value, 10)
      });
      const params = this.getParams(parseInt(event.target.value, 10));
      this.props.setGridParams(params);
      this.props.getLatestFeedback(params);
    });

    _defineProperty(this, "renderOptions", (item, key) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
      key: key,
      value: item
    }, item));

    this.state = {
      top: 10
    };
  }

  render() {
    const tops = [10, 20, 30, 40, 50];
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"], {
      className: "form-filter"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Row, {
      bsPrefix: "form-row"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
      className: "col-auto col-form-label"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Top')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Control, {
      as: "select",
      size: "sm",
      className: "shadow-none",
      value: this.state.top,
      onChange: this.handleTopChange
    }, tops.map(this.renderOptions)))));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_4__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    gridParams
  } = state;
  return {
    gridParams
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(Filter));

/***/ }),

/***/ "./www/sources/js/pages/feedback/latest-feedback/index.js":
/*!****************************************************************!*\
  !*** ./www/sources/js/pages/feedback/latest-feedback/index.js ***!
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
/* harmony import */ var _latestFeedbackSlide__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./latestFeedbackSlide */ "./www/sources/js/pages/feedback/latest-feedback/latestFeedbackSlide.js");
/* harmony import */ var _components_AppContainer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/AppContainer */ "./www/sources/js/pages/feedback/latest-feedback/components/AppContainer.jsx");
/* harmony import */ var _cssroot_pages_feedback_latest_feedback_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @cssroot/pages/feedback/latest-feedback.scss */ "./www/sources/css/pages/feedback/latest-feedback.scss");
/* harmony import */ var _cssroot_pages_feedback_latest_feedback_scss__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_cssroot_pages_feedback_latest_feedback_scss__WEBPACK_IMPORTED_MODULE_5__);





const store = Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__["configureStore"])({
  reducer: _latestFeedbackSlide__WEBPACK_IMPORTED_MODULE_3__["default"]
});

class index extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_1__["Provider"], {
      store: store
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "latest-feedback"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_AppContainer__WEBPACK_IMPORTED_MODULE_4__["default"], null)));
  }

}

/***/ }),

/***/ "./www/sources/js/pages/feedback/latest-feedback/latestFeedbackSlide.js":
/*!******************************************************************************!*\
  !*** ./www/sources/js/pages/feedback/latest-feedback/latestFeedbackSlide.js ***!
  \******************************************************************************/
/*! exports provided: setGridParams, setLatestFeedback, setViewRelatedCustomerDialog, setEditFeedbackDialog, setEditNoOfInquiryDialog, resetState, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setGridParams", function() { return setGridParams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setLatestFeedback", function() { return setLatestFeedback; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setViewRelatedCustomerDialog", function() { return setViewRelatedCustomerDialog; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setEditFeedbackDialog", function() { return setEditFeedbackDialog; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setEditNoOfInquiryDialog", function() { return setEditNoOfInquiryDialog; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetState", function() { return resetState; });
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @reduxjs/toolkit */ "./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");

const initialState = {
  gridData: null,
  gridParams: {
    top: 10
  },
  viewRelatedCustomerDialog: {
    show: false
  },
  editFeedbackDialog: {
    show: false
  },
  editNoOfInquiryDialog: {
    show: false
  }
};
const latestFeedbackSlice = Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__["createSlice"])({
  name: 'latestFeedback',
  initialState: initialState,
  reducers: {
    resetState: () => initialState,
    setGridParams: (state, action) => {
      state.gridParams = action.payload;
    },
    setLatestFeedback: (state, action) => {
      state.gridData = action.payload;
    },
    setViewRelatedCustomerDialog: (state, action) => {
      state.viewRelatedCustomerDialog = action.payload;
    },
    setEditFeedbackDialog: (state, action) => {
      state.editFeedbackDialog = action.payload;
    },
    setEditNoOfInquiryDialog: (state, action) => {
      state.editNoOfInquiryDialog = action.payload;
    }
  }
});
const {
  actions,
  reducer
} = latestFeedbackSlice;
const {
  setGridParams,
  setLatestFeedback,
  setViewRelatedCustomerDialog,
  setEditFeedbackDialog,
  setEditNoOfInquiryDialog,
  resetState
} = actions;
/* harmony default export */ __webpack_exports__["default"] = (reducer);

/***/ })

}]);
//# sourceMappingURL=27.chunk.js.map