(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[18],{

/***/ "./www/sources/css/pages/report/dynamic/index.scss":
/*!*********************************************************!*\
  !*** ./www/sources/css/pages/report/dynamic/index.scss ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./www/sources/js/pages/report/dynamic/actions.js":
/*!********************************************************!*\
  !*** ./www/sources/js/pages/report/dynamic/actions.js ***!
  \********************************************************/
/*! exports provided: ActionCreators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionCreators", function() { return ActionCreators; });
/* harmony import */ var _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/common/dataService */ "./www/sources/js/common/dataService.js");
/* harmony import */ var _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/common/site */ "./www/sources/js/common/site.js");
/* harmony import */ var _dynamicReportSlice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dynamicReportSlice */ "./www/sources/js/pages/report/dynamic/dynamicReportSlice.js");




const getDynamicReports = params => async dispatch => {
  _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].blockUI();
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('DynamicReport/GetDynamicReports');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__["default"].postDataAsync(url, params).then(response => {
    dispatch(Object(_dynamicReportSlice__WEBPACK_IMPORTED_MODULE_2__["setDynamicReports"])(response.data));
  }).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].unblockUI());
};

const getAllSettings = () => async dispatch => {
  _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].blockUI();
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('DynamicReport/GetAllSettings');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__["default"].getDataAsync(url).then(response => {
    dispatch(Object(_dynamicReportSlice__WEBPACK_IMPORTED_MODULE_2__["setAllSettings"])(response.data));
  }).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].unblockUI());
};

const exportExcel = params => async () => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('DynamicReport/ExportExcel');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__["default"].getFileAsync(url, params).then(response => {
    const fileName = response.headers['content-disposition'].split('filename=')[1].split(";")[0];
    _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].downloadFile(response.data, fileName);
  });
};

const ActionCreators = {
  getDynamicReports,
  getAllSettings,
  setGridParams: _dynamicReportSlice__WEBPACK_IMPORTED_MODULE_2__["setGridParams"],
  setViewCommunicationDialog: _dynamicReportSlice__WEBPACK_IMPORTED_MODULE_2__["setViewCommunicationDialog"],
  exportExcel,
  setViewChartDialog: _dynamicReportSlice__WEBPACK_IMPORTED_MODULE_2__["setViewChartDialog"],
  resetState: _dynamicReportSlice__WEBPACK_IMPORTED_MODULE_2__["resetState"]
};

/***/ }),

/***/ "./www/sources/js/pages/report/dynamic/components/AppContainer.jsx":
/*!*************************************************************************!*\
  !*** ./www/sources/js/pages/report/dynamic/components/AppContainer.jsx ***!
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
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/report/dynamic/actions.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _Filter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Filter */ "./www/sources/js/pages/report/dynamic/components/Filter.jsx");
/* harmony import */ var _DataGrid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./DataGrid */ "./www/sources/js/pages/report/dynamic/components/DataGrid.jsx");
/* harmony import */ var _deleted_feedback_statistic_components_FeedbackDetails__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../deleted-feedback-statistic/components/FeedbackDetails */ "./www/sources/js/pages/report/deleted-feedback-statistic/components/FeedbackDetails.jsx");
/* harmony import */ var _Chart__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Chart */ "./www/sources/js/pages/report/dynamic/components/Chart.jsx");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }










class AppContainer extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "handleCloseViewCommunication", () => {
      this.props.setViewCommunicationDialog({
        show: false
      });
    });

    _defineProperty(this, "handleCloseViewChart", () => {
      this.props.setViewChartDialog({
        show: false
      });
    });
  }

  componentWillUnmount() {
    this.props.resetState();
  }

  render() {
    const {
      viewCommunicationDialog,
      viewChartDialog
    } = this.props;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Filter__WEBPACK_IMPORTED_MODULE_5__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DataGrid__WEBPACK_IMPORTED_MODULE_6__["default"], null), viewCommunicationDialog.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_deleted_feedback_statistic_components_FeedbackDetails__WEBPACK_IMPORTED_MODULE_7__["default"], {
      title: "CommunicationLogDetail",
      feedbackId: viewCommunicationDialog.feedbackId,
      onClose: this.handleCloseViewCommunication
    }), viewChartDialog.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Chart__WEBPACK_IMPORTED_MODULE_8__["default"], {
      onClose: this.handleCloseViewChart,
      chartInfo: viewChartDialog.chartInfo
    }));
  }

}

_defineProperty(AppContainer, "propTypes", {
  viewCommunicationDialog: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    show: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
    chartInfo: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object
  }).isRequired,
  viewChartDialog: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    show: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
    chartInfo: {}
  }).isRequired
});

_defineProperty(AppContainer, "defaultProps", {
  viewCommunicationDialog: {
    show: false
  },
  viewChartDialog: {
    show: false,
    chartInfo: {}
  }
});

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_4__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    viewCommunicationDialog,
    viewChartDialog
  } = state;
  return {
    viewCommunicationDialog,
    viewChartDialog
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(AppContainer));

/***/ }),

/***/ "./www/sources/js/pages/report/dynamic/components/Chart.jsx":
/*!******************************************************************!*\
  !*** ./www/sources/js/pages/report/dynamic/components/Chart.jsx ***!
  \******************************************************************/
/*! exports provided: Chart, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Chart", function() { return Chart; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jsroot_components_DraggableModalDialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/components/DraggableModalDialog */ "./www/sources/js/components/DraggableModalDialog.jsx");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var _jsroot_common_shareScripts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/common/shareScripts */ "./www/sources/js/common/shareScripts.js");
/* harmony import */ var recharts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! recharts */ "./node_modules/recharts/es6/index.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






class Chart extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "getDataChart", data => {
      const dataChart = [];
      data.childReports.map(item => {
        dataChart.push({
          name: item.shortName,
          [item.shortName]: item.totalChildReports
        });
      });
      return dataChart;
    });

    _defineProperty(this, "getLabelChart", data => {
      const labelChart = [];
      data.childReports.map(item => {
        labelChart.push(item.shortName);
      });
      return labelChart;
    });
  }

  render() {
    const {
      chartInfo
    } = this.props;
    const data = this.getDataChart(chartInfo);
    const labels = this.getLabelChart(chartInfo);
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"], {
      show: true,
      dialogAs: _jsroot_components_DraggableModalDialog__WEBPACK_IMPORTED_MODULE_1__["default"],
      onHide: this.props.onClose,
      backdrop: "static",
      keyboard: false,
      size: "xl"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Header, {
      closeButton: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Title, {
      as: "div"
    }, chartInfo.name)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Body, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(recharts__WEBPACK_IMPORTED_MODULE_4__["ResponsiveContainer"], {
      width: "100%",
      height: 700
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(recharts__WEBPACK_IMPORTED_MODULE_4__["BarChart"], {
      width: 1100,
      data: data,
      margin: {
        top: 30,
        right: 30,
        left: 30,
        bottom: 20
      },
      barCategoryGap: 0,
      barGap: 0
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(recharts__WEBPACK_IMPORTED_MODULE_4__["CartesianGrid"], {
      strokeDasharray: "3 3"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(recharts__WEBPACK_IMPORTED_MODULE_4__["XAxis"], {
      label: {
        value: chartInfo.shortName,
        dy: 5
      },
      tick: false
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(recharts__WEBPACK_IMPORTED_MODULE_4__["YAxis"], {
      label: {
        value: 'Log(s)',
        position: 'top',
        dy: -10
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(recharts__WEBPACK_IMPORTED_MODULE_4__["Legend"], {
      wrapperStyle: {
        bottom: 5,
        left: 87,
        width: 998
      }
    }), labels.map((label, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(recharts__WEBPACK_IMPORTED_MODULE_4__["Bar"], {
      dataKey: label,
      key: index,
      label: {
        position: 'top'
      },
      fill: Object(_jsroot_common_shareScripts__WEBPACK_IMPORTED_MODULE_3__["getBackGroundColor"])(index),
      maxBarSize: 20
    }))))));
  }

}
/* harmony default export */ __webpack_exports__["default"] = (Chart);

/***/ }),

/***/ "./www/sources/js/pages/report/dynamic/components/DataGrid.jsx":
/*!*********************************************************************!*\
  !*** ./www/sources/js/pages/report/dynamic/components/DataGrid.jsx ***!
  \*********************************************************************/
/*! exports provided: DataGrid, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataGrid", function() { return DataGrid; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/report/dynamic/actions.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var _jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/components/react-grid/index */ "./www/sources/js/components/react-grid/index.jsx");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/common/dateTimeService */ "./www/sources/js/common/dateTimeService.js");
/* harmony import */ var _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jsroot/common/constants */ "./www/sources/js/common/constants.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }










class DataGrid extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "buildHeader", () => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderRow"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 10
      }, "#"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 20
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('RunningNo')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 22
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('FeedbackDate')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 45
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('MainCategoryAndSubCategory')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 41
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Subject')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 20
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Status')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 15
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Duration')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 20
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Username')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 20
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Handler')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 20
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Reviewer')));
    });

    _defineProperty(this, "buildBody", () => {
      const {
        dynamicReports,
        gridParams
      } = this.props;
      const {
        pageIndex,
        pageSize
      } = gridParams;
      const keyToggle = pageSize * (pageIndex - 1);

      if (dynamicReports.data.childReports.length > 0) {
        return dynamicReports.data.childReports.map((item, index) => this.renderGroupRow(item, index, keyToggle));
      }

      return [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Row"], {
        key: `body${1}`,
        className: "no-data"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
        className: "text-center",
        colSpan: 10
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('ThereIsNoData')))];
    });

    _defineProperty(this, "renderGroupRow", (group, index, keyToggle) => {
      const keyToggleRow = keyToggle + index + 1;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Row"], {
        key: keyToggleRow
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
        colSpan: 10,
        className: "group-collapse-expand",
        onClick: () => this.handleToggleEach(keyToggleRow)
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: `pr-2 fa ${this.state.toggles.includes(keyToggleRow) ? 'fa-caret-right' : 'fa-caret-down'}`
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, keyToggleRow))), group.childReports.map((item, index) => this.renderRow(item, index, keyToggleRow, keyToggle)));
    });

    _defineProperty(this, "renderRow", (item, index, keyToggleRow, keyToggle) => {
      if (this.state.toggles.includes(keyToggleRow)) {
        return null;
      }

      const colorRow = item.status ? item.status.toLowerCase() : '';
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Row"], {
        key: index,
        className: colorRow
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], null, keyToggle + index + 1), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
        className: "link-click",
        onClick: () => this.handleViewCommunication(item.feedbackId)
      }, item.feedbackId), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
        className: "text-center"
      }, _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_7__["default"].toShortDateTimeFormat(item.feedbackDate)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], null, this.renderCategoryColumn(item)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], null, item.subject), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
        className: "text-center"
      }, item.status), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
        className: "text-center"
      }, item.duration.replace(/\s+/g, '')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], null, item.userName), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], null, item.handler), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], null, item.reviewer));
    });

    _defineProperty(this, "handleViewCommunication", feedbackId => {
      this.props.setViewCommunicationDialog({
        show: true,
        feedbackId: feedbackId
      });
    });

    _defineProperty(this, "handleToggleEach", key => {
      const {
        toggles
      } = this.state;
      const index = toggles.indexOf(key);

      if (index >= 0) {
        toggles.splice(index, 1);
      } else {
        toggles.push(key);
      }

      this.setState({
        toggles
      });
    });

    _defineProperty(this, "checkIsExpand", isExpand => {
      if (isExpand) {
        return false;
      }

      return true;
    });

    _defineProperty(this, "handleToggleAll", () => {
      const {
        isExpand
      } = this.state;
      const {
        gridParams
      } = this.props;
      const {
        pageIndex,
        pageSize
      } = gridParams;
      const keyToggle = pageSize * (pageIndex - 1);
      const allItem = [];

      if (isExpand) {
        this.setState({
          toggles: [],
          isExpand: this.checkIsExpand(isExpand)
        });
      } else {
        for (let i = 0; i < this.props.dynamicReports.data.childReports.length; i++) {
          allItem.push(keyToggle + i + 1);
        }

        this.setState({
          toggles: allItem,
          isExpand: this.checkIsExpand(isExpand)
        });
      }
    });

    _defineProperty(this, "handleGroupCategory", filterCategory => {
      const groupCategory = filterCategory.reduce((accumulator, currentValue) => {
        const itemExist = accumulator.find(item => currentValue.mainCategoryId === item.mainCategoryId);

        if (itemExist) {
          itemExist.subCategoryId = [...itemExist.subCategoryId, currentValue.subCategoryId];
        } else {
          accumulator.push({
            mainCategoryId: currentValue.mainCategoryId,
            subCategoryId: [currentValue.subCategoryId]
          });
        }

        return accumulator;
      }, []);
      return groupCategory;
    });

    _defineProperty(this, "renderCategoryColumn", item => {
      const {
        mainCategories
      } = this.props.dynamicReports;
      const groupCategory = this.handleGroupCategory(item.dynamicSettings);
      return groupCategory.map((value, key) => {
        const filterMainCategory = mainCategories.find(element => element.settingId === value.mainCategoryId);
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          key: key,
          className: "font-weight-bold"
        }, filterMainCategory.settingValue), value.subCategoryId.map((subId, index) => {
          const filterSubCategory = filterMainCategory.childSettings.find(element => element.subCategoryId === subId);
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            key: index,
            className: "font-italic ml-3"
          }, filterSubCategory ? filterSubCategory.name : 'N/A');
        }));
      });
    });

    _defineProperty(this, "renderToolBox", () => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["OverlayTrigger"], {
        placement: "auto",
        overlay: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Tooltip"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "View Chart"))
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "fa fa-bar-chart pl-3 icon",
        onClick: this.handleViewChart
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["OverlayTrigger"], {
        placement: "auto",
        overlay: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Tooltip"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Collapse/Expand"))
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: `${this.state.isExpand ? 'fa fa-compress' : 'fa fa-expand'} pl-3 icon`,
        onClick: this.handleToggleAll
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["OverlayTrigger"], {
        placement: "auto",
        overlay: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Tooltip"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Export to Excel"))
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "fa fa-file-excel-o pl-3 icon-excel",
        onClick: this.handleExportExcel
      })));
    });

    _defineProperty(this, "renderGenerateTitle", () => {
      const {
        reportType,
        fromDate,
        toDate
      } = this.props.gridParams;
      const {
        dynamicReports
      } = this.props;
      let reportTitle = '';

      switch (reportType) {
        case 1:
          reportTitle = 'Daily Communication Logs';
          break;

        case 2:
          reportTitle = 'Weekly Communication Logs';
          break;

        case 3:
          reportTitle = 'Monthly Communication Logs';
          break;

        case 4:
          reportTitle = 'Yearly Communication Logs';
          break;

        default:
          break;
      }

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, `${reportTitle} From ${fromDate} To ${toDate} [${dynamicReports.data.totalChildReports}]`);
    });

    _defineProperty(this, "handleExportExcel", () => {
      const params = this.props.gridParams;
      this.props.exportExcel(params);
    });

    _defineProperty(this, "handleViewChart", () => {
      const data = this.props.dynamicReports.data;
      this.props.setViewChartDialog({
        show: true,
        chartInfo: data.chartInfo
      });
    });

    _defineProperty(this, "onPaging", (pageIndex, pageSize) => {
      const params = _objectSpread({}, this.props.gridParams);

      params['pageSize'] = pageSize;
      params['pageIndex'] = pageIndex;
      this.setState({
        toggles: [],
        isExpand: true
      });
      this.props.setGridParams(params);
      this.props.getDynamicReports(_objectSpread(_objectSpread({}, params), {}, {
        pageIndex: params.pageIndex - 1
      }));
    });

    this.state = {
      shouldResetScrollPosition: true,
      toggles: [],
      isExpand: false
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.dynamicReports !== nextProps.dynamicReports) {
      nextState.shouldResetScrollPosition = true;
      nextState.toggles = [];
      nextState.isExpand = false;
    }

    if (this.state.toggles.length > 0) {
      nextState.shouldResetScrollPosition = false;
    }

    return true;
  }

  render() {
    const {
      dynamicReports,
      gridParams
    } = this.props;

    if (!dynamicReports || !dynamicReports.data) {
      return null;
    }

    const {
      pageIndex,
      pageSize
    } = gridParams;
    const pagingOption = {
      PageIndex: pageIndex,
      PageSize: pageSize,
      TotalItem: dynamicReports.data.totalChildReports,
      PageList: _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_8__["PAGING_SIZES"]
    };
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "table-title d-flex justify-content-between align-items-center"
    }, this.renderGenerateTitle(), dynamicReports.data.childReports.length > 0 && this.renderToolBox()), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Table"], {
      width: 1200,
      autoWidth: false,
      header: this.buildHeader(),
      body: this.buildBody(),
      containerPadding: 0,
      adjustedHeight: 10,
      isPaging: true,
      pageOption: pagingOption,
      onPaging: this.onPaging,
      shouldResetScrollPosition: this.state.shouldResetScrollPosition
    }));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_3__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    dynamicReports,
    gridParams
  } = state;
  return {
    dynamicReports,
    gridParams
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(DataGrid));

/***/ }),

/***/ "./www/sources/js/pages/report/dynamic/components/Filter.jsx":
/*!*******************************************************************!*\
  !*** ./www/sources/js/pages/report/dynamic/components/Filter.jsx ***!
  \*******************************************************************/
/*! exports provided: Filter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Filter", function() { return Filter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/report/dynamic/actions.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var _jsroot_components_date_picker_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/components/date-picker/index */ "./www/sources/js/components/date-picker/index.jsx");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/common/dateTimeService */ "./www/sources/js/common/dateTimeService.js");
/* harmony import */ var _jsroot_components_SelectWithSearch__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jsroot/components/SelectWithSearch */ "./www/sources/js/components/SelectWithSearch.jsx");
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }










class Filter extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleUpdateFromDate", fromDate => {
      const maxDate = new Date(fromDate.getTime());
      maxDate.setMonth(fromDate.getMonth() + 12);
      maxDate.setDate(fromDate.getDate() - 1);
      this.minToDate = fromDate;
      this.maxToDate = maxDate < this.currentDate ? maxDate : this.currentDate;
      this.setState({
        fromDate: fromDate,
        toDate: maxDate < this.currentDate ? maxDate : this.currentDate
      });
    });

    _defineProperty(this, "handleUpdateToDate", toDate => {
      this.setState({
        toDate: toDate
      });
    });

    _defineProperty(this, "handleUpdateFromWeek", fromDate => {
      const firstDayOfWeek = fromDate.getDate() - fromDate.getDay();
      fromDate.setDate(firstDayOfWeek);
      let maxDate = new Date(fromDate.getTime());
      maxDate.setMonth(fromDate.getMonth() + 12);
      maxDate.setDate(fromDate.getDate() - 1);
      const maxDateEndWeek = new Date(maxDate.getFullYear(), maxDate.getMonth(), 1);
      maxDateEndWeek.setDate(maxDate.getDate() - maxDate.getDay() + 6);
      maxDate = maxDateEndWeek;
      this.minToDate = fromDate;
      this.maxToDate = maxDate < this.currentDate ? maxDate : this.currentDate;
      this.setState({
        fromDate: fromDate,
        toDate: this.maxToDate
      });
    });

    _defineProperty(this, "handleUpdateToWeek", toDate => {
      const firstDayOfWeek = toDate.getDate() - toDate.getDay();
      const lastDayOfWeek = firstDayOfWeek + 6;
      toDate.setDate(lastDayOfWeek);
      this.setState({
        toDate: toDate
      });
    });

    _defineProperty(this, "handleUpdateFromMonth", firstDateMonth => {
      const maxDate = new Date(firstDateMonth.getTime());
      maxDate.setMonth(firstDateMonth.getMonth() + 12);
      maxDate.setDate(firstDateMonth.getDate() - 1);
      const currentToDate = this.state.toDate;
      this.minToDate = firstDateMonth;
      this.maxToDate = maxDate < this.currentDate ? maxDate : this.currentDate;
      this.setState({
        fromDate: firstDateMonth,
        toDate: new Date(currentToDate.setFullYear(firstDateMonth.getFullYear()))
      });
    });

    _defineProperty(this, "handleUpdateToMonth", lastDateMonth => {
      this.setState({
        toDate: new Date(lastDateMonth.getFullYear(), lastDateMonth.getMonth() + 1, 0)
      });
    });

    _defineProperty(this, "handleUpdateFromYear", firstDateYear => {
      this.minToDate = firstDateYear;
      this.maxToDate = firstDateYear;
      this.setState({
        fromDate: firstDateYear,
        toDate: new Date(firstDateYear.getFullYear(), 11, 31)
      });
    });

    _defineProperty(this, "handleHighlightDates", () => {
      const highlightDates = [];

      for (let i = 0; i < 7; i++) {
        const date = new Date(this.state.fromDate);
        date.setDate(date.getDate() + i);
        highlightDates[i] = date;
      }

      return highlightDates;
    });

    _defineProperty(this, "renderFilterDate", () => {
      let resFromDate = {},
          resToDate = {};
      let dateFormat = '';

      switch (this.state.reportType) {
        case 1:
          dateFormat = 'MMM dd, yyyy';
          resFromDate = {
            onChange: this.handleUpdateFromDate
          };
          resToDate = {
            onChange: this.handleUpdateToDate
          };
          break;

        case 2:
          const propsDate = {
            showWeekNumbers: true
          };
          dateFormat = this.getWeekYear() + ' (MMM dd, yyyy)';
          resFromDate = _objectSpread(_objectSpread({}, propsDate), {}, {
            onChange: this.handleUpdateFromWeek,
            highlightDates: this.handleHighlightDates()
          });
          resToDate = _objectSpread(_objectSpread({}, propsDate), {}, {
            onChange: this.handleUpdateToWeek
          });
          break;

        case 3:
          const propsMonth = {
            showMonthYearPicker: true,
            showFullMonthYearPicker: true,
            showTwoColumnMonthYearPicker: true
          };
          dateFormat = 'MMM yyyy';
          resFromDate = _objectSpread(_objectSpread({}, propsMonth), {}, {
            onChange: this.handleUpdateFromMonth
          });
          resToDate = _objectSpread(_objectSpread({}, propsMonth), {}, {
            onChange: this.handleUpdateToMonth
          });
          break;

        case 4:
          const propsYear = {
            showYearPicker: true
          };
          dateFormat = 'yyyy';
          resFromDate = _objectSpread(_objectSpread({}, propsYear), {}, {
            onChange: this.handleUpdateFromYear
          });
          resToDate = _objectSpread({}, propsYear);
          break;

        default:
          break;
      }

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "group-field"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        htmlFor: "fromDate",
        className: "col-form-label"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('FromDate')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "react-datepicker-wrapper-container form-control-wrapper select-field"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_date_picker_index__WEBPACK_IMPORTED_MODULE_5__["default"], _extends({
        dropdownMode: "select",
        showMonthDropdown: true,
        showYearDropdown: true,
        selected: this.state.fromDate,
        dateFormat: dateFormat,
        maxDate: new Date(this.maxFromDate)
      }, resFromDate)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "group-field"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        htmlFor: "toDate",
        className: "col-form-label"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('ToDate')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "react-datepicker-wrapper-container form-control-wrapper select-field"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_date_picker_index__WEBPACK_IMPORTED_MODULE_5__["default"], _extends({
        selected: this.state.toDate,
        dateFormat: dateFormat,
        weekNumber: true,
        minDate: new Date(this.minToDate),
        maxDate: new Date(this.maxToDate),
        showMonthDropdown: true,
        dropdownMode: "select",
        showYearDropdown: true
      }, resToDate)))));
    });

    _defineProperty(this, "renderItems", (name, value, key) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
      key: key,
      value: value
    }, name));

    _defineProperty(this, "handleChangeReportType", event => {
      const value = parseInt(event.target.value, 10);
      this.setState({
        reportType: value
      });
      const currentClientTime = window.currentClientTime;
      const currentDate = new Date(_jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_7__["default"].toShortDateTimeFormat(new Date(currentClientTime)));

      switch (value) {
        case 1:
          this.setState({
            fromDate: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
            toDate: currentDate
          });
          break;

        case 2:
          const firstDayOfWeek = currentDate.getDate() - currentDate.getDay();
          const lastDayOfWeek = firstDayOfWeek + 6;
          this.setState({
            fromDate: currentDate.setDate(firstDayOfWeek),
            toDate: currentDate.setDate(lastDayOfWeek)
          });
          break;

        case 3:
          this.setState({
            fromDate: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1),
            toDate: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
          });
          break;

        case 4:
          this.setState({
            fromDate: new Date(currentDate.getFullYear(), 0, 1),
            toDate: currentDate
          });
          break;

        default:
          break;
      }
    });

    _defineProperty(this, "handleChange", event => {
      const name = event.target.name;
      this.setState({
        [name]: event.target.type === 'select-one' ? parseInt(event.target.value, 10) : event.target.value
      });
    });

    _defineProperty(this, "handleChangeSite", site => {
      this.setState({
        siteId: site.id
      });
    });

    _defineProperty(this, "filterSubCategoryOptions", (subCategories, mainCategoryId) => {
      if (mainCategoryId === 0) {
        return [];
      }

      const subCategoryOptions = subCategories.filter(item => item.mainCategoryID === mainCategoryId);
      return subCategoryOptions;
    });

    _defineProperty(this, "filterSubProductOptions", (subProducts, productId) => {
      if (productId === 0) {
        return [];
      }

      const subProductOptions = subProducts.filter(item => item.parentId === productId);
      return subProductOptions;
    });

    _defineProperty(this, "handleToggleFilter", () => {
      this.setState(previousState => ({
        showFilter: !previousState.showFilter
      }));
    });

    _defineProperty(this, "handleSubmit", event => {
      event.preventDefault();
      const {
        reportType,
        fromDate,
        toDate,
        productId,
        subProductId,
        statusId,
        roleId,
        mainCategoryId,
        handler,
        siteId,
        responseId,
        communicationId,
        subCategoryId,
        reviewer,
        subject,
        extensionId
      } = this.state;
      const params = {
        reportType: reportType,
        fromDate: _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_7__["default"].toShortDateFormat(fromDate),
        toDate: _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_7__["default"].toShortDateFormat(toDate),
        productId: productId,
        subProductId: subProductId,
        statusId: statusId,
        roleId: roleId,
        mainCategoryId: mainCategoryId,
        handler: handler,
        siteId: siteId,
        responseId: responseId,
        communicationId: communicationId,
        extensionId: extensionId,
        subCategoryId: subCategoryId,
        reviewer: reviewer,
        subject: subject,
        pageIndex: 0,
        pageSize: this.props.gridParams.pageSize
      };
      this.props.getDynamicReports(params);
      this.props.setGridParams(_objectSpread(_objectSpread({}, params), {}, {
        pageIndex: params.pageIndex + 1
      }));
    });

    const _currentClientTime = window.currentClientTime;

    const _currentDate = new Date(_jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_7__["default"].toShortDateTimeFormat(new Date(_currentClientTime)));

    const firstDateCurrentMonth = new Date(_currentDate.getFullYear(), _currentDate.getMonth(), 1);
    const _toDate = _currentDate;
    this.maxFromDate = _currentDate;
    this.maxToDate = _currentDate;
    this.minToDate = firstDateCurrentMonth;
    this.currentDate = _currentDate;
    this.state = {
      fromDate: firstDateCurrentMonth,
      toDate: _toDate,
      mainCategoryId: 0,
      subCategoryId: 0,
      reportType: 1,
      statusId: 0,
      siteId: 0,
      roleId: 0,
      communicationToolId: 0,
      handler: null,
      productId: 0,
      subProductId: 0,
      responseId: 0,
      extensionId: 0,
      reviewer: null,
      subject: null,
      showFilter: true
    };
  }

  componentDidMount() {
    this.props.getAllSettings();
  }

  getWeekYear() {
    const date = new Date(this.state.fromDate);
    let oneJan = new Date(date.getFullYear(), 0, 1);
    let numberOfDays = Math.floor((date - oneJan) / (24 * 60 * 60 * 1000)) - 7;
    let result = Math.ceil((date.getDay() + 1 + numberOfDays) / 7);

    if (result === 0) {
      oneJan = new Date(date.getFullYear() - 1, 0, 1);
      numberOfDays = Math.floor((date - oneJan) / (24 * 60 * 60 * 1000)) - 7;
      result = Math.ceil((date.getDay() + 1 + numberOfDays) / 7);
    }

    return result;
  }

  render() {
    const {
      allSettings
    } = this.props;
    const {
      showFilter
    } = this.state;

    if (allSettings === null) {
      return null;
    }

    const subCategoryOptions = this.filterSubCategoryOptions(allSettings.subCategories, this.state.mainCategoryId);
    const subProductOptions = this.filterSubProductOptions(allSettings.subProducts, this.state.productId);
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"], {
      className: "form-filter",
      onSubmit: this.handleSubmit
    }, showFilter && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
      as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "group-field"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
      htmlFor: "groupBy",
      className: "col-form-label"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('GroupBy')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
      as: "select",
      size: "sm",
      className: "shadow-none select-field",
      name: "reportType",
      onChange: this.handleChangeReportType
    }, allSettings.periodTypes.map((item, key) => this.renderItems(item.name, item.id, key)))), this.renderFilterDate(), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "group-field-tool"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
      htmlFor: "status",
      className: "col-form-label label-tool"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Status')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
      as: "select",
      size: "sm",
      className: "shadow-none select-field",
      name: "statusId",
      onChange: this.handleChange
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
      value: 0
    }, "All"), allSettings.statuses.map((item, key) => this.renderItems(item.name, item.statusId, key))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
      as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "group-field"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
      htmlFor: "response",
      className: "col-form-label"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Response')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
      as: "select",
      size: "sm",
      className: "shadow-none select-field",
      name: "responseId",
      onChange: this.handleChange
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
      value: 0
    }, "All"), allSettings.responses.map((item, key) => this.renderItems(item.value, item.id, key)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "group-field"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
      htmlFor: "product",
      className: "col-form-label"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Product')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
      as: "select",
      size: "sm",
      className: "shadow-none select-field",
      name: "productId",
      onChange: this.handleChange
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
      value: 0
    }, "All"), allSettings.products.map((item, key) => this.renderItems(item.value, item.id, key)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "group-field"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
      htmlFor: "sub-product",
      className: "col-form-label"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('SubProduct')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
      as: "select",
      size: "sm",
      className: "shadow-none select-field",
      name: "subProductId",
      onChange: this.handleChange
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
      value: 0
    }, "All"), subProductOptions.map((item, key) => this.renderItems(item.value, item.id, key)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "group-field-tool"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
      htmlFor: "site",
      className: "col-form-label label-tool"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Site')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "select-field"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_SelectWithSearch__WEBPACK_IMPORTED_MODULE_8__["default"], {
      className: "basic-single",
      OnChangeValue: this.handleChangeSite,
      options: allSettings.sites
    })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
      as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "group-field"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
      htmlFor: "handler",
      className: "col-form-label"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Handler')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
      type: "text",
      size: "sm",
      className: "shadow-none select-field",
      autoComplete: "off",
      name: "handler",
      onChange: this.handleChange
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "group-field"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
      htmlFor: "reviewer",
      className: "col-form-label"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Reviewer')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
      type: "text",
      size: "sm",
      className: "shadow-none select-field",
      autoComplete: "off",
      name: "reviewer",
      onChange: this.handleChange
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "group-field"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
      htmlFor: "role",
      className: "col-form-label"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Role')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
      as: "select",
      size: "sm",
      className: "shadow-none select-field",
      name: "roleId",
      onChange: this.handleChange
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
      value: 0
    }, "All"), allSettings.roles.map((item, key) => this.renderItems(item.value, item.id, key)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "group-field-tool"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
      htmlFor: "communicationTool",
      className: "col-form-label label-tool"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('CommunicationTool')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
      as: "select",
      size: "sm",
      className: "shadow-none select-field",
      name: "communicationToolId",
      onChange: this.handleChange
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
      value: 0
    }, "All"), allSettings.communicationTools.map((item, key) => this.renderItems(item.name, item.id, key))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
      as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "group-field"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
      htmlFor: "extension",
      className: "col-form-label"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Extension')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
      as: "select",
      size: "sm",
      className: "shadow-none select-field",
      name: "extensionId",
      onChange: this.handleChange
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
      value: 0
    }, "All"), allSettings.extensions.map((item, key) => this.renderItems(item.value, item.id, key)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "group-field-mainCate"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
      htmlFor: "main-category",
      className: "col-form-label"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('MainCategory')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
      as: "select",
      size: "sm",
      className: "shadow-none select-field",
      name: "mainCategoryId",
      onChange: this.handleChange
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
      value: 0
    }, "All"), allSettings.mainCategories.map((item, key) => this.renderItems(item.name, item.mainCategoryID, key)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "group-field-tool"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
      htmlFor: "sub-category",
      className: "col-form-label"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('SubCategory')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
      as: "select",
      size: "sm",
      className: "shadow-none select-field",
      name: "subCategoryId",
      onChange: this.handleChange
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
      value: 0
    }, "All"), subCategoryOptions.map((item, key) => this.renderItems(item.name, item.subCategoryId, key))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
      as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "group-field-subject"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
      htmlFor: "subject",
      className: "col-form-label"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Subject')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
      type: "text",
      size: "sm",
      className: "shadow-none select-field",
      autoComplete: "off",
      name: "subject",
      onChange: this.handleChange
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], {
      type: "submit",
      className: "btn btn-primary btn-sm"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Submit'))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "toggle-filter"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: `${showFilter ? 'fa fa-caret-up' : 'fa fa-caret-down'} icon`,
      onClick: this.handleToggleFilter
    })));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_3__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    allSettings,
    gridParams
  } = state;
  return {
    allSettings,
    gridParams
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(Filter));

/***/ }),

/***/ "./www/sources/js/pages/report/dynamic/dynamicReportSlice.js":
/*!*******************************************************************!*\
  !*** ./www/sources/js/pages/report/dynamic/dynamicReportSlice.js ***!
  \*******************************************************************/
/*! exports provided: resetState, setDynamicReports, setAllSettings, setGridParams, setViewCommunicationDialog, setViewChartDialog, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetState", function() { return resetState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setDynamicReports", function() { return setDynamicReports; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setAllSettings", function() { return setAllSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setGridParams", function() { return setGridParams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setViewCommunicationDialog", function() { return setViewCommunicationDialog; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setViewChartDialog", function() { return setViewChartDialog; });
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @reduxjs/toolkit */ "./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");

const initialState = {
  dynamicReports: null,
  allSettings: null,
  gridParams: {
    pageIndex: 1,
    pageSize: 100
  },
  viewCommunicationDialog: {
    show: false
  },
  viewChartDialog: {
    show: false,
    chartInfo: {}
  }
};
const dynamicReportSlice = Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__["createSlice"])({
  name: 'dynamicReport',
  initialState: initialState,
  reducers: {
    resetState: () => initialState,
    setDynamicReports: (state, action) => {
      state.dynamicReports = action.payload;
    },
    setAllSettings: (state, action) => {
      state.allSettings = action.payload;
    },
    setGridParams: (state, action) => {
      state.gridParams = action.payload;
    },
    setViewCommunicationDialog: (state, action) => {
      state.viewCommunicationDialog = action.payload;
    },
    setViewChartDialog: (state, action) => {
      state.viewChartDialog = action.payload;
    }
  }
});
const {
  actions,
  reducer
} = dynamicReportSlice;
const {
  resetState,
  setDynamicReports,
  setAllSettings,
  setGridParams,
  setViewCommunicationDialog,
  setViewChartDialog
} = actions;
/* harmony default export */ __webpack_exports__["default"] = (reducer);

/***/ }),

/***/ "./www/sources/js/pages/report/dynamic/index.js":
/*!******************************************************!*\
  !*** ./www/sources/js/pages/report/dynamic/index.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return index; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @reduxjs/toolkit */ "./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");
/* harmony import */ var _dynamicReportSlice__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./dynamicReportSlice */ "./www/sources/js/pages/report/dynamic/dynamicReportSlice.js");
/* harmony import */ var _jsroot_components_layout_container_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/components/layout-container/index */ "./www/sources/js/components/layout-container/index.js");
/* harmony import */ var _components_AppContainer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/AppContainer */ "./www/sources/js/pages/report/dynamic/components/AppContainer.jsx");
/* harmony import */ var _cssroot_pages_report_dynamic_index_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @cssroot/pages/report/dynamic/index.scss */ "./www/sources/css/pages/report/dynamic/index.scss");
/* harmony import */ var _cssroot_pages_report_dynamic_index_scss__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_cssroot_pages_report_dynamic_index_scss__WEBPACK_IMPORTED_MODULE_7__);







const store = Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_3__["configureStore"])({
  reducer: _dynamicReportSlice__WEBPACK_IMPORTED_MODULE_4__["default"]
});

class index extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_2__["Provider"], {
      store: store
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "dynamic"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_AppContainer__WEBPACK_IMPORTED_MODULE_6__["default"], null)));
  }

}

/***/ })

}]);
//# sourceMappingURL=18.chunk.js.map