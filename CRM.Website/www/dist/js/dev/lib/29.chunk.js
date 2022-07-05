(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[29],{

/***/ "./www/sources/css/pages/report/deleted-feedback-statistic/index.scss":
/*!****************************************************************************!*\
  !*** ./www/sources/css/pages/report/deleted-feedback-statistic/index.scss ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./www/sources/js/pages/report/deleted-feedback-statistic/actions.js":
/*!***************************************************************************!*\
  !*** ./www/sources/js/pages/report/deleted-feedback-statistic/actions.js ***!
  \***************************************************************************/
/*! exports provided: ActionCreators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionCreators", function() { return ActionCreators; });
/* harmony import */ var _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/common/dataService */ "./www/sources/js/common/dataService.js");
/* harmony import */ var _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/common/site */ "./www/sources/js/common/site.js");
/* harmony import */ var _deletedFeedbackStatisticSlice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./deletedFeedbackStatisticSlice */ "./www/sources/js/pages/report/deleted-feedback-statistic/deletedFeedbackStatisticSlice.js");




const getDeletedFeedbackStatistic = params => async dispatch => {
  _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].blockUI();
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('DeletedFeedbackStatistics/GetDeletedFeedbackStatistics');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__["default"].postDataAsync(url, params).then(response => {
    dispatch(Object(_deletedFeedbackStatisticSlice__WEBPACK_IMPORTED_MODULE_2__["setGridData"])(response.data));
  }).catch(_jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].handleAxiosError).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].unblockUI());
};

const exportExcel = params => async () => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('DeletedFeedbackStatistics/ExportExcel');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__["default"].getFileAsync(url, params).then(response => {
    const fileName = response.headers['content-disposition'].split('filename=')[1].split(";")[0];
    _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].downloadFile(response.data, fileName);
  });
};

const ActionCreators = {
  setGridParams: _deletedFeedbackStatisticSlice__WEBPACK_IMPORTED_MODULE_2__["setGridParams"],
  getDeletedFeedbackStatistic,
  setGridData: _deletedFeedbackStatisticSlice__WEBPACK_IMPORTED_MODULE_2__["setGridData"],
  exportExcel,
  setEditFeedbackDialog: _deletedFeedbackStatisticSlice__WEBPACK_IMPORTED_MODULE_2__["setEditFeedbackDialog"],
  setViewRelatedCustomerDialog: _deletedFeedbackStatisticSlice__WEBPACK_IMPORTED_MODULE_2__["setViewRelatedCustomerDialog"],
  resetState: _deletedFeedbackStatisticSlice__WEBPACK_IMPORTED_MODULE_2__["resetState"]
};

/***/ }),

/***/ "./www/sources/js/pages/report/deleted-feedback-statistic/components/AppContainer.jsx":
/*!********************************************************************************************!*\
  !*** ./www/sources/js/pages/report/deleted-feedback-statistic/components/AppContainer.jsx ***!
  \********************************************************************************************/
/*! exports provided: AppContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppContainer", function() { return AppContainer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/report/deleted-feedback-statistic/actions.js");
/* harmony import */ var _jsroot_components_SweetModalDialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/components/SweetModalDialog */ "./www/sources/js/components/SweetModalDialog.jsx");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var _FeedbackDetails__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./FeedbackDetails */ "./www/sources/js/pages/report/deleted-feedback-statistic/components/FeedbackDetails.jsx");
/* harmony import */ var _Filter__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Filter */ "./www/sources/js/pages/report/deleted-feedback-statistic/components/Filter.jsx");
/* harmony import */ var _DataGrid__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./DataGrid */ "./www/sources/js/pages/report/deleted-feedback-statistic/components/DataGrid.jsx");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }











class AppContainer extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "handleCloseEditFeedbackDialog", isSuccessful => {
      this.props.setEditFeedbackDialog({
        show: false
      });

      if (isSuccessful) {
        this.props.getDeletedFeedbackStatistic(this.props.gridParams);
      }
    });

    _defineProperty(this, "handleCloseViewRelatedCustomerDialog", () => {
      this.props.setViewRelatedCustomerDialog({
        show: false
      });
    });
  }

  componentWillUnmount() {
    this.props.resetState();
  }

  render() {
    const {
      editFeedbackDialog,
      viewRelatedCustomerDialog
    } = this.props;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Filter__WEBPACK_IMPORTED_MODULE_8__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DataGrid__WEBPACK_IMPORTED_MODULE_9__["default"], null), viewRelatedCustomerDialog.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_SweetModalDialog__WEBPACK_IMPORTED_MODULE_5__["default"], {
      size: "lg",
      title: _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('RelatedCustomer'),
      contents: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, viewRelatedCustomerDialog.relatedCustomers),
      buttons: [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], {
        variant: "primary",
        size: "sm",
        onClick: this.handleCloseViewRelatedCustomerDialog
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Close'))],
      onClose: this.handleCloseViewRelatedCustomerDialog
    }), editFeedbackDialog.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_FeedbackDetails__WEBPACK_IMPORTED_MODULE_7__["default"], {
      title: "FeedbackDetail",
      feedbackId: editFeedbackDialog.feedbackId,
      onClose: this.handleCloseEditFeedbackDialog
    }));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_4__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    editFeedbackDialog,
    viewRelatedCustomerDialog,
    gridParams
  } = state;
  return {
    editFeedbackDialog,
    viewRelatedCustomerDialog,
    gridParams
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(AppContainer));

/***/ }),

/***/ "./www/sources/js/pages/report/deleted-feedback-statistic/components/DataGrid.jsx":
/*!****************************************************************************************!*\
  !*** ./www/sources/js/pages/report/deleted-feedback-statistic/components/DataGrid.jsx ***!
  \****************************************************************************************/
/*! exports provided: DataGrid, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataGrid", function() { return DataGrid; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/report/deleted-feedback-statistic/actions.js");
/* harmony import */ var _jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/components/react-grid/index */ "./www/sources/js/components/react-grid/index.jsx");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/common/dateTimeService */ "./www/sources/js/common/dateTimeService.js");
/* harmony import */ var _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jsroot/common/constants */ "./www/sources/js/common/constants.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }










class DataGrid extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "buildHeader", () => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderRow"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 15
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Date')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 12
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Handler')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 20
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('DeletedBy')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 35
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Feedback')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 30
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Category')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 20
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Customer')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 20
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('RelatedCustomer')));
    });

    _defineProperty(this, "buildBody", () => {
      const {
        gridData
      } = this.props;
      const rows = [];

      if (gridData.data.length > 0) {
        rows.push(gridData.data.map((item, index) => this.renderCollapseRow(item, index)));
        return rows;
      }

      return [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Row"], {
        key: `body${1}`,
        className: "no-data"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
        className: "text-center",
        colSpan: 7
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('ThereIsNoData')))];
    });

    _defineProperty(this, "handleGroupCategory", filterCategory => {
      const groupCategory = filterCategory.reduce((accumulator, current) => {
        const itemExist = accumulator.find(item => current.settingId === item.settingId);

        if (itemExist) {
          itemExist.subSettingId = [...itemExist.subSettingId, current.subSettingId];
        } else {
          accumulator.push({
            settingId: current.settingId,
            subSettingId: [current.subSettingId]
          });
        }

        return accumulator;
      }, []);
      return groupCategory;
    });

    _defineProperty(this, "renderCategory", item => {
      const {
        mainCategories
      } = this.props.gridData;
      const filterCategories = item.settings.filter(element => element.settingType === 'Category');
      const groupCategories = this.handleGroupCategory(filterCategories);
      return groupCategories.map((group, key) => {
        const filterMainCategory = mainCategories.find(element => element.settingId === group.settingId);
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          key: key,
          className: "font-weight-bold"
        }, filterMainCategory.settingValue), group.subSettingId.map((subId, index) => {
          const filterSubCategory = filterMainCategory.childSettings.find(element => element.subCategoryId === subId);
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            key: index,
            className: "font-italic ml-3"
          }, filterSubCategory.name);
        }));
      });
    });

    _defineProperty(this, "renderRelatedCustomer", item => {
      const totalItems = item.length;

      if (totalItems > _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_8__["MaximumDisplayRelatedCustomer"]) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
          href: "#",
          onClick: () => this.handleOpenViewRelatedCustomerDialog(item.join(', '))
        }, totalItems, " customers");
      } else {
        return item.join(', ');
      }
    });

    _defineProperty(this, "handleOpenViewRelatedCustomerDialog", relatedCustomers => {
      this.props.setViewRelatedCustomerDialog({
        show: true,
        relatedCustomers
      });
    });

    _defineProperty(this, "handleCollapseExpend", (event, handler) => {
      event.preventDefault();
      const toggleHandler = this.state.toggleHandler;
      const index = toggleHandler.indexOf(handler);

      if (index >= 0) {
        toggleHandler.splice(index, 1);
      } else {
        toggleHandler.push(handler);
      }

      this.setState({
        toggleHandler
      });
    });

    _defineProperty(this, "renderCollapseRow", (item, index) => {
      const rows = [];
      rows.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Row"], {
        key: `parent ${index}`,
        className: "parent-level-0"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
        colSpan: "7",
        onClick: event => this.handleCollapseExpend(event, item.handler)
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: `expand-icon fa pr-2 ${!this.state.isCollapse ? 'fa-caret-down' : 'fa-caret-right'}`
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "text-handler font-weight-bold"
      }, item.handler, " (", item.deletedFeedbacks.length, ")"))));

      if (item.deletedFeedbacks.length > 0) {
        rows.push(item.deletedFeedbacks.map((item, index) => this.renderRow(item.handler, item, index)));
      }

      return rows;
    });

    _defineProperty(this, "renderRow", (handler, item, index) => {
      if (!this.state.toggleHandler.includes(handler)) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Row"], {
          key: `child ${index}`,
          className: `child ${index}`
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], null, _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_7__["default"].toShortDateFormat(item.createDate)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
          className: "word-break"
        }, item.handler), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], null, item.deletor), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          onClick: () => this.handleEditDeletedFeedback(item.feedbackId)
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", {
          className: "link-click"
        }, item.subject))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], null, this.renderCategory(item)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], null, item.customer), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], null, this.renderRelatedCustomer(item.relatedCustomer.split(','))));
      } else {
        return null;
      }
    });

    _defineProperty(this, "renderFooter", data => {
      if (data.length > 0) {
        const totalGrands = data.reduce((accumulator, currentValue) => accumulator + currentValue.deletedFeedbacks.length, 0);
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Row"], {
          key: "footer",
          className: "footer-container font-weight-bold border-bottom-0"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
          colSpan: "7"
        }, "Grand Total (", totalGrands, ")"));
      } else {
        return null;
      }
    });

    _defineProperty(this, "handleEditDeletedFeedback", id => {
      this.props.setEditFeedbackDialog({
        show: true,
        feedbackId: id
      });
    });

    _defineProperty(this, "handleExportExcel", () => {
      this.props.exportExcel(this.props.gridParams);
    });

    _defineProperty(this, "renderExportExcel", () => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["OverlayTrigger"], {
        overlay: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Tooltip"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Export to Excel")),
        placement: "auto"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "fa fa-file-excel-o icon-excel",
        onClick: this.handleExportExcel
      }));
    });

    this.state = {
      toggleHandler: []
    };
  }

  render() {
    const {
      gridData
    } = this.props;

    if (!gridData || !gridData.data) {
      return null;
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "table-title d-flex justify-content-between align-items-center"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Deleted Feedback Statistics"), gridData.data.length > 0 && this.renderExportExcel()), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Table"], {
      width: 1250,
      autoWidth: false,
      header: this.buildHeader(),
      body: this.buildBody(),
      footer: this.renderFooter(gridData.data),
      isPaging: false,
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

/***/ "./www/sources/js/pages/report/deleted-feedback-statistic/components/Filter.jsx":
/*!**************************************************************************************!*\
  !*** ./www/sources/js/pages/report/deleted-feedback-statistic/components/Filter.jsx ***!
  \**************************************************************************************/
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
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/report/deleted-feedback-statistic/actions.js");
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
      const currentClientTime = window.currentClientTime;
      const currentTime = new Date(_jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__["default"].toShortDateTimeFormat(new Date(currentClientTime)));
      const maxDate = new Date(fromDate.getTime());
      maxDate.setMonth(fromDate.getMonth() + 12);
      maxDate.setDate(fromDate.getDate() - 1);
      this.minToDate = fromDate;
      this.maxToDate = maxDate < currentTime ? maxDate : currentTime;
      let toDate = fromDate > this.state.toDate ? fromDate : this.state.toDate;
      const isOver1Year = _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__["default"].toDiffDays(currentTime, fromDate) > 365;

      if (isOver1Year) {
        toDate = this.maxToDate;
      }

      this.setState({
        fromDate,
        toDate
      });
    });

    _defineProperty(this, "handleChangeToDate", toDate => {
      this.setState({
        toDate
      });
    });

    _defineProperty(this, "handleChange", evt => {
      this.setState(_objectSpread(_objectSpread({}, this.state), {}, {
        [evt.target.name]: evt.target.value
      }));
    });

    _defineProperty(this, "handleSubmit", () => {
      const {
        handler,
        fromDate,
        toDate,
        deletedBy
      } = this.state;
      const params = {
        handler: handler !== '' ? handler : null,
        deletedBy: deletedBy !== '' ? deletedBy : null,
        fromDate: _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__["default"].toShortDateFormat(fromDate),
        toDate: _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__["default"].toShortDateFormat(toDate)
      };
      this.props.setGridParams(params);
      this.props.getDeletedFeedbackStatistic(params);
    });

    const _currentClientTime = window.currentClientTime;
    this.currentDate = new Date(_jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__["default"].toShortDateTimeFormat(new Date(_currentClientTime)));
    const currentDate = this.currentDate;
    const firstDayLastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    const firstDateFirstMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const firstDateOfMonthFormat = new Date(_jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__["default"].toShortDateTimeFormat(new Date(firstDayLastMonth)));

    const _toDate = firstDateFirstMonth.setDate(firstDateFirstMonth.getDate() - 1);

    this.maxFromDate = currentDate;
    this.maxToDate = currentDate;
    this.minToDate = firstDateOfMonthFormat;
    this.state = {
      handler: '',
      deletedBy: '',
      fromDate: firstDateOfMonthFormat,
      toDate: _toDate,
      actionId: 0
    };
  }

  render() {
    const {
      handler,
      fromDate,
      toDate,
      deletedBy
    } = this.state;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"], {
      className: "form-filter",
      onSubmit: this.handleSubmit
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Row, {
      bsPrefix: "form-row"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
      htmlFor: "handler"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Handler')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Control, {
      type: "text",
      size: "sm",
      className: "shadow-none",
      autoComplete: "off",
      value: handler,
      name: "handler",
      id: "handler",
      onChange: this.handleChange
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
      htmlFor: "fromDate"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('FromDate')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "react-datepicker-wrapper-container"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_date_picker_index__WEBPACK_IMPORTED_MODULE_5__["default"], {
      maxDate: new Date(this.maxFromDate),
      selected: fromDate,
      peekNextMonth: true,
      showYearDropdown: true,
      showMonthDropdown: true,
      dropdownMode: "select",
      onChange: value => this.handleChangeFromDate(value)
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, null, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('ToDate')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "react-datepicker-wrapper-container"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_date_picker_index__WEBPACK_IMPORTED_MODULE_5__["default"], {
      minDate: new Date(this.minToDate),
      maxDate: new Date(this.maxToDate),
      showYearDropdown: true,
      peekNextMonth: true,
      showMonthDropdown: true,
      dropdownMode: "select",
      selected: toDate,
      onChange: value => this.handleChangeToDate(value)
    })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Row, {
      bsPrefix: "form-row"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
      htmlFor: "deletedBy"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('DeletedBy')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Control, {
      type: "text",
      size: "sm",
      value: deletedBy,
      name: "deletedBy",
      id: "deletedBy",
      className: "shadow-none",
      autoComplete: "off",
      onChange: this.handleChange
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], {
      variant: "primary",
      size: "sm",
      onClick: this.handleSubmit
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Submit')))));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_4__["ActionCreators"], dispatch);

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(null, mapDispatchToProps)(Filter));

/***/ }),

/***/ "./www/sources/js/pages/report/deleted-feedback-statistic/deletedFeedbackStatisticSlice.js":
/*!*************************************************************************************************!*\
  !*** ./www/sources/js/pages/report/deleted-feedback-statistic/deletedFeedbackStatisticSlice.js ***!
  \*************************************************************************************************/
/*! exports provided: setGridParams, setGridData, setEditFeedbackDialog, setViewRelatedCustomerDialog, resetState, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setGridParams", function() { return setGridParams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setGridData", function() { return setGridData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setEditFeedbackDialog", function() { return setEditFeedbackDialog; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setViewRelatedCustomerDialog", function() { return setViewRelatedCustomerDialog; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetState", function() { return resetState; });
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @reduxjs/toolkit */ "./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");

const initialState = {
  gridParams: null,
  gridData: null,
  editFeedbackDialog: {
    show: false
  },
  viewRelatedCustomerDialog: {
    show: false
  }
};
const deletedFeedbackStatisticSlice = Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__["createSlice"])({
  name: 'deletedFeedbackStatistic',
  initialState: initialState,
  reducers: {
    resetState: () => initialState,
    setGridParams: (state, action) => {
      state.gridParams = action.payload;
    },
    setGridData: (state, action) => {
      state.gridData = action.payload;
    },
    setEditFeedbackDialog: (state, action) => {
      state.editFeedbackDialog = action.payload;
    },
    setViewRelatedCustomerDialog: (state, action) => {
      state.viewRelatedCustomerDialog = action.payload;
    }
  }
});
const {
  actions,
  reducer
} = deletedFeedbackStatisticSlice;
const {
  setGridParams,
  setGridData,
  setEditFeedbackDialog,
  setViewRelatedCustomerDialog,
  resetState
} = actions;
/* harmony default export */ __webpack_exports__["default"] = (reducer);

/***/ }),

/***/ "./www/sources/js/pages/report/deleted-feedback-statistic/index.js":
/*!*************************************************************************!*\
  !*** ./www/sources/js/pages/report/deleted-feedback-statistic/index.js ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return index; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @reduxjs/toolkit */ "./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");
/* harmony import */ var _deletedFeedbackStatisticSlice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./deletedFeedbackStatisticSlice */ "./www/sources/js/pages/report/deleted-feedback-statistic/deletedFeedbackStatisticSlice.js");
/* harmony import */ var _components_AppContainer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/AppContainer */ "./www/sources/js/pages/report/deleted-feedback-statistic/components/AppContainer.jsx");
/* harmony import */ var _cssroot_pages_report_deleted_feedback_statistic_index_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @cssroot/pages/report/deleted-feedback-statistic/index.scss */ "./www/sources/css/pages/report/deleted-feedback-statistic/index.scss");
/* harmony import */ var _cssroot_pages_report_deleted_feedback_statistic_index_scss__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_cssroot_pages_report_deleted_feedback_statistic_index_scss__WEBPACK_IMPORTED_MODULE_5__);






const store = Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__["configureStore"])({
  reducer: _deletedFeedbackStatisticSlice__WEBPACK_IMPORTED_MODULE_3__["default"]
});
class index extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_1__["Provider"], {
      store: store
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "deleted-feedback-statistic"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_AppContainer__WEBPACK_IMPORTED_MODULE_4__["default"], null)));
  }

}

/***/ })

}]);
//# sourceMappingURL=29.chunk.js.map