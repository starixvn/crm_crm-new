(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[26],{

/***/ "./www/sources/css/pages/feedback/deleted-feedback/index.scss":
/*!********************************************************************!*\
  !*** ./www/sources/css/pages/feedback/deleted-feedback/index.scss ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./www/sources/js/pages/feedback/deleted-feedback/actions.js":
/*!*******************************************************************!*\
  !*** ./www/sources/js/pages/feedback/deleted-feedback/actions.js ***!
  \*******************************************************************/
/*! exports provided: ActionCreators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionCreators", function() { return ActionCreators; });
/* harmony import */ var _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/common/dataService */ "./www/sources/js/common/dataService.js");
/* harmony import */ var _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/common/site */ "./www/sources/js/common/site.js");
/* harmony import */ var _deletedFeedbackSlice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./deletedFeedbackSlice */ "./www/sources/js/pages/feedback/deleted-feedback/deletedFeedbackSlice.js");




const getAllSettings = () => async dispatch => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('DeletedFeedback/GetAllSettings');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__["default"].getDataAsync(url).then(response => {
    dispatch(Object(_deletedFeedbackSlice__WEBPACK_IMPORTED_MODULE_2__["setAllSettings"])(response.data));
  });
};

const getDeletedFeedback = params => async dispatch => {
  _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].blockUI();
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('DeletedFeedback/GetDeletedFeedback');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__["default"].postDataAsync(url, params).then(response => {
    dispatch(Object(_deletedFeedbackSlice__WEBPACK_IMPORTED_MODULE_2__["setDeletedFeedback"])(response.data));
  }).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].unblockUI());
};

const exportExcel = params => async () => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('DeletedFeedback/ExportExcel');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__["default"].getFileAsync(url, params).then(response => {
    const fileName = response.headers['content-disposition'].split('filename=')[1].split(";")[0];
    _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].downloadFile(response.data, fileName);
  });
};

const ActionCreators = {
  setGridParams: _deletedFeedbackSlice__WEBPACK_IMPORTED_MODULE_2__["setGridParams"],
  getAllSettings,
  getDeletedFeedback,
  exportExcel,
  setEditFeedbackDialog: _deletedFeedbackSlice__WEBPACK_IMPORTED_MODULE_2__["setEditFeedbackDialog"],
  setViewRelatedCustomerDialog: _deletedFeedbackSlice__WEBPACK_IMPORTED_MODULE_2__["setViewRelatedCustomerDialog"],
  resetState: _deletedFeedbackSlice__WEBPACK_IMPORTED_MODULE_2__["resetState"]
};

/***/ }),

/***/ "./www/sources/js/pages/feedback/deleted-feedback/components/AppContainer.jsx":
/*!************************************************************************************!*\
  !*** ./www/sources/js/pages/feedback/deleted-feedback/components/AppContainer.jsx ***!
  \************************************************************************************/
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
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/feedback/deleted-feedback/actions.js");
/* harmony import */ var _jsroot_components_SweetModalDialog__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/components/SweetModalDialog */ "./www/sources/js/components/SweetModalDialog.jsx");
/* harmony import */ var _edit_customer_feedback_AppContainer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../edit-customer-feedback/AppContainer */ "./www/sources/js/pages/feedback/edit-customer-feedback/AppContainer.jsx");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var _Filter__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Filter */ "./www/sources/js/pages/feedback/deleted-feedback/components/Filter.jsx");
/* harmony import */ var _DataGrid__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./DataGrid */ "./www/sources/js/pages/feedback/deleted-feedback/components/DataGrid.jsx");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }












class AppContainer extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "handleCloseEditFeedbackDialog", isSuccessful => {
      this.props.setEditFeedbackDialog({
        show: false
      });

      if (isSuccessful) {
        this.props.getDeletedFeedback(this.props.gridParams);
      }
    });

    _defineProperty(this, "handleCloseViewRelatedCustomerDialog", () => {
      this.props.setViewRelatedCustomerDialog({
        show: false
      });
    });
  }

  componentDidMount() {
    this.props.getAllSettings();
  }

  componentWillUnmount() {
    this.props.resetState();
  }

  render() {
    const {
      editFeedbackDialog,
      viewRelatedCustomerDialog
    } = this.props;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Filter__WEBPACK_IMPORTED_MODULE_9__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DataGrid__WEBPACK_IMPORTED_MODULE_10__["default"], null), viewRelatedCustomerDialog.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_SweetModalDialog__WEBPACK_IMPORTED_MODULE_6__["default"], {
      size: "lg",
      title: _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('RelatedCustomer'),
      contents: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, viewRelatedCustomerDialog.relatedCustomers),
      buttons: [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], {
        variant: "primary",
        size: "sm",
        onClick: this.handleCloseViewRelatedCustomerDialog
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('Close'))],
      onClose: this.handleCloseViewRelatedCustomerDialog
    }), editFeedbackDialog.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_edit_customer_feedback_AppContainer__WEBPACK_IMPORTED_MODULE_7__["default"], {
      feedbackId: editFeedbackDialog.feedbackId,
      onClose: this.handleCloseEditFeedbackDialog
    }));
  }

}

_defineProperty(AppContainer, "propTypes", {
  getAllSettings: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  getDeletedFeedback: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  editFeedbackDialog: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    show: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool
  }).isRequired
});

_defineProperty(AppContainer, "defaultProps", {
  getAllSettings: function () {// nothing
  },
  getDeletedFeedback: function () {// nothing
  },
  editFeedbackDialog: {
    show: false
  },
  viewRelatedCustomerDialog: {
    show: false
  }
});

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_3__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_5__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    settings,
    gridParams,
    editFeedbackDialog,
    viewRelatedCustomerDialog
  } = state;
  return {
    settings,
    gridParams,
    editFeedbackDialog,
    viewRelatedCustomerDialog
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(AppContainer));

/***/ }),

/***/ "./www/sources/js/pages/feedback/deleted-feedback/components/DataGrid.jsx":
/*!********************************************************************************!*\
  !*** ./www/sources/js/pages/feedback/deleted-feedback/components/DataGrid.jsx ***!
  \********************************************************************************/
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
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/feedback/deleted-feedback/actions.js");
/* harmony import */ var _jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/components/react-grid/index */ "./www/sources/js/components/react-grid/index.jsx");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var react_bootstrap_Tooltip__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-bootstrap/Tooltip */ "./node_modules/react-bootstrap/esm/Tooltip.js");
/* harmony import */ var _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jsroot/common/dateTimeService */ "./www/sources/js/common/dateTimeService.js");
/* harmony import */ var _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @jsroot/common/constants */ "./www/sources/js/common/constants.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }











class DataGrid extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "buildHeader", () => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderRow"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 45
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Feedback')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 20
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Customer')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 35
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Category')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 10
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Status')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 20
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('RelatedCustomer')));
    });

    _defineProperty(this, "buildBody", () => {
      const {
        gridData
      } = this.props;

      if (gridData.data.length > 0) {
        return gridData.data.map((item, index) => this.renderRow(item, index));
      }

      return [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Row"], {
        key: `body${1}`,
        className: "no-data"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
        className: "text-center",
        colSpan: 5
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('ThereIsNoData')))];
    });

    _defineProperty(this, "handleGroupCategory", filterCategory => {
      const groupCategory = filterCategory.reduce((accumulator, currentValue) => {
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
      return groupCategory;
    });

    _defineProperty(this, "renderCategoryColumn", item => {
      const {
        mainCategories
      } = this.props.gridData;
      const filterCategory = item.settings.filter(element => element.settingType === 'Category');
      const groupCategory = this.handleGroupCategory(filterCategory);
      return groupCategory.map((value, key) => {
        const filterMainCategory = mainCategories.find(element => element.settingId === value.settingId);
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          key: key,
          className: "font-weight-bold"
        }, filterMainCategory.settingValue), value.subSettingId.map((subId, index) => {
          const filterSubCategory = filterMainCategory.childSettings.find(element => element.subCategoryId === subId);
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            key: index,
            className: "font-italic ml-3"
          }, filterSubCategory.name);
        }));
      });
    });

    _defineProperty(this, "handleOpenViewRelatedCustomerDialog", relatedCustomers => {
      this.props.setViewRelatedCustomerDialog({
        show: true,
        relatedCustomers
      });
    });

    _defineProperty(this, "renderRelatedCustomerColumn", item => {
      const totalItems = item.length;

      if (totalItems > _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_9__["MaximumDisplayRelatedCustomer"]) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
          href: "#",
          onClick: () => this.handleOpenViewRelatedCustomerDialog(item.join(', '))
        }, totalItems, " customers");
      } else {
        return item.join(', ');
      }
    });

    _defineProperty(this, "renderRow", (item, index) => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Row"], {
        key: index,
        className: "deleted"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        onClick: () => this.handleEditFeedback(item.feedbackId)
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "rounded-circle fa fa-pencil-square-o"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", {
        className: "link-click"
      }, item.subject)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "feedback-info"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "info"
      }, "Feedback date ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, " ", _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_8__["default"].toShortDateTimeFormat(item.feedbackDate))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "info"
      }, "By", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, " ", item.creatorName, " "), "on ", _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_8__["default"].toShortDateTimeFormat(item.createDate)), item.reviewerName && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "info"
      }, "Reviewed by ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, " ", item.reviewerName, " "), " on ", _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_8__["default"].toShortDateTimeFormat(item.solveDate)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], null, item.username), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], null, this.renderCategoryColumn(item)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
        className: "text-center"
      }, item.status ? item.status : 'N/A'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], null, this.renderRelatedCustomerColumn(item.relatedCustomer.split(','))));
    });

    _defineProperty(this, "handleExportExcel", () => {
      const {
        gridParams
      } = this.props;
      this.props.exportExcel(gridParams);
    });

    _defineProperty(this, "handleEditFeedback", id => {
      this.props.setEditFeedbackDialog({
        show: true,
        feedbackId: id
      });
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

    _defineProperty(this, "onPaging", (pageIndex, pageSize) => {
      const params = _objectSpread({}, this.props.gridParams);

      params['pageSize'] = pageSize;
      params['pageIndex'] = pageIndex;
      this.props.setGridParams(params);
      this.props.getDeletedFeedback(params);
    });
  }

  render() {
    const {
      gridData
    } = this.props;

    if (!gridData || !gridData.data) {
      return null;
    }

    const {
      pageIndex,
      pageSize
    } = this.props.gridParams;
    const pagingOption = {
      PageIndex: pageIndex,
      PageSize: pageSize,
      TotalItem: gridData.totalItems,
      PageList: _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_9__["PAGING_SIZES"]
    };
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "table-title d-flex justify-content-between align-items-center ha"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Deleted Feedback"), gridData.data.length > 0 && this.renderExportExcelText()), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Table"], {
      width: 1200,
      autoWidth: false,
      header: this.buildHeader(),
      body: this.buildBody(),
      isPaging: true,
      pageOption: pagingOption,
      onPaging: this.onPaging,
      containerPadding: 0,
      adjustedHeight: 10
    }));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_4__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    gridParams,
    settings,
    gridData
  } = state;
  return {
    gridParams,
    settings,
    gridData
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(DataGrid));

/***/ }),

/***/ "./www/sources/js/pages/feedback/deleted-feedback/components/Filter.jsx":
/*!******************************************************************************!*\
  !*** ./www/sources/js/pages/feedback/deleted-feedback/components/Filter.jsx ***!
  \******************************************************************************/
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
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/feedback/deleted-feedback/actions.js");
/* harmony import */ var _jsroot_components_date_picker_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/components/date-picker/index */ "./www/sources/js/components/date-picker/index.jsx");
/* harmony import */ var _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/common/dateTimeService */ "./www/sources/js/common/dateTimeService.js");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









class Filter extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "componentDidUpdate", prevProps => {
      if (prevProps.settings !== this.props.settings) {
        this.setState({
          communicationId: this.props.settings.communications[0].id,
          responseId: this.props.settings.customerResponses[0].id
        });
      }
    });

    _defineProperty(this, "handleChangeFromDate", fromDate => {
      const currentClientTime = window.currentClientTime;
      const currentTime = new Date(_jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__["default"].toShortDateTimeFormat(new Date(currentClientTime)));
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
        toDate: toDate
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
        username,
        isGuest,
        fromDate,
        toDate,
        mainCategoryId,
        subCategoryId,
        communicationId,
        responseId,
        isReviewed
      } = this.state;
      const params = {
        username: username,
        isGuest: isGuest,
        fromDate: _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__["default"].toShortDateFormat(_jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__["default"].toServerDateTime(fromDate)),
        toDate: _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__["default"].toShortDateFormat(_jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__["default"].toServerDateTime(toDate)),
        mainCategoryId: mainCategoryId === 0 ? '' : mainCategoryId,
        subCategoryId: subCategoryId === 0 ? '' : subCategoryId,
        communicationId: communicationId,
        responseId: responseId,
        isReviewed: isReviewed,
        pageIndex: 1,
        pageSize: 100
      };
      this.props.setGridParams(params);
      this.props.getDeletedFeedback(params);
    });

    _defineProperty(this, "filterSubCategories", (subCate, mainCateId) => {
      if (mainCateId === 0) {
        const subCategory = [{
          name: 'All',
          subCategoryId: 0
        }];
        return subCategory;
      }

      const subCategories = subCate.filter(item => item.mainCategoryID === mainCateId);
      subCategories.unshift({
        name: 'All',
        subCategoryId: 0
      });
      return subCategories;
    });

    _defineProperty(this, "renderOptions", (name, item, key) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
      key: key,
      value: item
    }, name));

    _defineProperty(this, "renderForm", () => {
      const data = this.props.settings;
      const subCategories = this.filterSubCategories(data.subCategories, this.state.mainCategoryId);
      const reviews = [{
        settingValue: 'All',
        settingId: ''
      }, {
        settingValue: 'Review',
        settingId: 1
      }, {
        settingValue: 'Not Reviewd',
        settingId: 0
      }];
      const customerTypes = [{
        settingValue: 'All',
        settingId: ''
      }, {
        settingValue: 'Customer',
        settingId: 0
      }, {
        settingValue: 'Guest',
        settingId: 1
      }];
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"], {
        onSubmit: this.handleSubmit,
        className: "form-filter"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
        className: "filter-title col-form-label"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Username')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
        sm: "2",
        md: "2",
        className: "filter-col"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Control, {
        type: "text",
        size: "sm",
        className: "shadow-none",
        autoComplete: "off",
        name: "username",
        onChange: this.handleChange
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
        sm: "2",
        md: "2",
        className: "filter-col"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Control, {
        as: "select",
        size: "sm",
        className: "shadow-none",
        name: "isGuest",
        onChange: this.handleChange
      }, customerTypes.map((value, key) => this.renderOptions(value.settingValue, value.settingId, key)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
        className: "filter-title col-form-label"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('FromDate')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
        sm: "2",
        md: "2",
        className: "react-datepicker-wrapper-container form-control-wrapper filter-colDate"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_date_picker_index__WEBPACK_IMPORTED_MODULE_5__["default"], {
        dropdownMode: "select",
        showMonthDropdown: true,
        showYearDropdown: true,
        selected: this.state.fromDate,
        dateFormat: "MMM dd, yyyy",
        maxDate: new Date(this.maxFromDate),
        onChange: value => this.handleChangeFromDate(value)
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
        className: "filter-toDate col-form-label"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('ToDate')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
        sm: "2",
        md: "2",
        className: "react-datepicker-wrapper-container form-control-wrapper filter-colDate"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_date_picker_index__WEBPACK_IMPORTED_MODULE_5__["default"], {
        selected: this.state.toDate,
        dateFormat: "MMM dd, yyyy",
        minDate: new Date(this.minToDate),
        maxDate: new Date(this.maxToDate),
        showMonthDropdown: true,
        dropdownMode: "select",
        showYearDropdown: true,
        onChange: value => this.handleChangeToDate(value)
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
        className: "filter-title col-form-label"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('MainCategory')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
        sm: "4",
        md: "4",
        className: "filter-col"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Control, {
        as: "select",
        size: "sm",
        className: "shadow-none",
        name: "mainCategoryId",
        onChange: this.handleChange
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        value: "0"
      }, "All"), data.mainCategories.map((value, key) => this.renderOptions(value.name, value.mainCategoryID, key)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
        className: "filter-title col-form-label"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('SubCategory')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
        sm: "4",
        md: "4",
        className: "filter-col"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Control, {
        as: "select",
        size: "sm",
        className: "shadow-none",
        name: "subCategoryId",
        onChange: this.handleChange
      }, subCategories.map((value, key) => this.renderOptions(value.name, value.subCategoryId, key))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
        className: "filter-title col-form-label"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Communication')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
        sm: "1",
        md: "1",
        className: "filter-coll-all"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Control, {
        as: "select",
        size: "sm",
        className: "shadow-none",
        name: "communicationId",
        onChange: this.handleChange
      }, data.communications.map((value, key) => this.renderOptions(value.name, value.id, key)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
        className: "filter-customer-response col-form-label"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('CustomerResponse')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
        sm: "2",
        md: "2",
        className: "filter-res"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Control, {
        as: "select",
        size: "sm",
        className: "shadow-none",
        name: "responseId",
        onChange: this.handleChange
      }, data.customerResponses.map((value, key) => this.renderOptions(value.value, value.id, key)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
        className: "filter-title col-form-label"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Is Reviewed')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
        sm: "2",
        md: "2",
        className: "filter-col"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Control, {
        as: "select",
        size: "sm",
        className: "shadow-none",
        name: "isReviewed",
        onChange: this.handleChange
      }, reviews.map((value, key) => this.renderOptions(value.settingValue, value.settingId, key)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
        sm: "2",
        md: "2",
        className: "filter-col"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
        type: "submit",
        className: "btn btn-primary btn-sm"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Submit')))));
    });

    const _currentClientTime = window.currentClientTime;
    const currentDate = new Date(_jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__["default"].toShortDateTimeFormat(new Date(_currentClientTime)));

    const _fromDate = new Date(_jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__["default"].toShortDateTimeFormat(new Date(_currentClientTime)));

    _fromDate.setDate(_fromDate.getDate() - 1);

    const _toDate = currentDate;
    this.maxFromDate = currentDate;
    this.maxToDate = currentDate;
    this.minToDate = _fromDate;
    this.state = {
      username: '',
      isGuest: '',
      fromDate: _fromDate,
      toDate: _toDate,
      mainCategoryId: 0,
      subCategoryId: 0,
      communicationId: 0,
      responseId: 0,
      isReviewed: ''
    };
  }

  render() {
    const {
      settings
    } = this.props;

    if (settings === null) {
      return null;
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, this.renderForm());
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_4__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    gridParams,
    settings
  } = state;
  return {
    gridParams,
    settings
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(Filter));

/***/ }),

/***/ "./www/sources/js/pages/feedback/deleted-feedback/deletedFeedbackSlice.js":
/*!********************************************************************************!*\
  !*** ./www/sources/js/pages/feedback/deleted-feedback/deletedFeedbackSlice.js ***!
  \********************************************************************************/
/*! exports provided: setGridParams, setAllSettings, setDeletedFeedback, setEditFeedbackDialog, setViewRelatedCustomerDialog, resetState, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setGridParams", function() { return setGridParams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setAllSettings", function() { return setAllSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setDeletedFeedback", function() { return setDeletedFeedback; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setEditFeedbackDialog", function() { return setEditFeedbackDialog; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setViewRelatedCustomerDialog", function() { return setViewRelatedCustomerDialog; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetState", function() { return resetState; });
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @reduxjs/toolkit */ "./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");

const initialState = {
  gridParams: {
    pageIndex: 1,
    pageSize: 100
  },
  settings: null,
  gridData: null,
  editFeedbackDialog: {
    show: false
  },
  viewRelatedCustomerDialog: {
    show: false
  }
};
const deletedFeedbackSlice = Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__["createSlice"])({
  name: 'deletedFeedback',
  initialState: initialState,
  reducers: {
    resetState: () => initialState,
    setGridParams: (state, action) => {
      state.gridParams = action.payload;
    },
    setAllSettings: (state, action) => {
      state.settings = action.payload;
    },
    setDeletedFeedback: (state, action) => {
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
} = deletedFeedbackSlice;
const {
  setGridParams,
  setAllSettings,
  setDeletedFeedback,
  setEditFeedbackDialog,
  setViewRelatedCustomerDialog,
  resetState
} = actions;
/* harmony default export */ __webpack_exports__["default"] = (reducer);

/***/ }),

/***/ "./www/sources/js/pages/feedback/deleted-feedback/index.js":
/*!*****************************************************************!*\
  !*** ./www/sources/js/pages/feedback/deleted-feedback/index.js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return index; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @reduxjs/toolkit */ "./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");
/* harmony import */ var _deletedFeedbackSlice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./deletedFeedbackSlice */ "./www/sources/js/pages/feedback/deleted-feedback/deletedFeedbackSlice.js");
/* harmony import */ var _components_AppContainer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/AppContainer */ "./www/sources/js/pages/feedback/deleted-feedback/components/AppContainer.jsx");
/* harmony import */ var _cssroot_pages_feedback_deleted_feedback_index_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @cssroot/pages/feedback/deleted-feedback/index.scss */ "./www/sources/css/pages/feedback/deleted-feedback/index.scss");
/* harmony import */ var _cssroot_pages_feedback_deleted_feedback_index_scss__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_cssroot_pages_feedback_deleted_feedback_index_scss__WEBPACK_IMPORTED_MODULE_5__);





const store = Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__["configureStore"])({
  reducer: _deletedFeedbackSlice__WEBPACK_IMPORTED_MODULE_3__["default"]
});

class index extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_1__["Provider"], {
      store: store
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "deleted-feedback"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_AppContainer__WEBPACK_IMPORTED_MODULE_4__["default"], null)));
  }

}

/***/ })

}]);
//# sourceMappingURL=26.chunk.js.map