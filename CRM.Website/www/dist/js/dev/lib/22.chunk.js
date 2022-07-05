(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[22],{

/***/ "./www/sources/css/pages/report/summary/index.scss":
/*!*********************************************************!*\
  !*** ./www/sources/css/pages/report/summary/index.scss ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./www/sources/js/pages/report/summary/actions.js":
/*!********************************************************!*\
  !*** ./www/sources/js/pages/report/summary/actions.js ***!
  \********************************************************/
/*! exports provided: ActionCreators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionCreators", function() { return ActionCreators; });
/* harmony import */ var _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/common/site */ "./www/sources/js/common/site.js");
/* harmony import */ var _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/common/dataService */ "./www/sources/js/common/dataService.js");
/* harmony import */ var _summaryReportSlice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./summaryReportSlice */ "./www/sources/js/pages/report/summary/summaryReportSlice.js");




const getAllSetting = () => async dispatch => {
  _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].blockUI();
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl('SummaryReport/GetAllSettings');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__["default"].postDataAsync(url).then(response => {
    dispatch(Object(_summaryReportSlice__WEBPACK_IMPORTED_MODULE_2__["setAllSetting"])(response.data));
  }).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].unblockUI());
};

const getGridData = params => async dispatch => {
  _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].blockUI();
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl('SummaryReport/GetSummaryReport');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__["default"].postDataAsync(url, params).then(response => {
    dispatch(Object(_summaryReportSlice__WEBPACK_IMPORTED_MODULE_2__["setGridData"])(response.data));
  }).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].unblockUI());
};

const exportExcel = params => async () => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl('SummaryReport/ExportSummaryReport');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__["default"].getFileAsync(url, params).then(response => {
    const fileName = response.headers['content-disposition'].split('filename=')[1].split(";")[0];
    _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].downloadFile(response.data, fileName);
  });
};

const ActionCreators = {
  resetState: _summaryReportSlice__WEBPACK_IMPORTED_MODULE_2__["resetState"],
  setAllSetting: _summaryReportSlice__WEBPACK_IMPORTED_MODULE_2__["setAllSetting"],
  setGridParams: _summaryReportSlice__WEBPACK_IMPORTED_MODULE_2__["setGridParams"],
  setGridData: _summaryReportSlice__WEBPACK_IMPORTED_MODULE_2__["setGridData"],
  setChartPopup: _summaryReportSlice__WEBPACK_IMPORTED_MODULE_2__["setChartPopup"],
  getAllSetting,
  getGridData,
  exportExcel
};

/***/ }),

/***/ "./www/sources/js/pages/report/summary/components/AppContainer.jsx":
/*!*************************************************************************!*\
  !*** ./www/sources/js/pages/report/summary/components/AppContainer.jsx ***!
  \*************************************************************************/
/*! exports provided: AppContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppContainer", function() { return AppContainer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/report/summary/actions.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _Filter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Filter */ "./www/sources/js/pages/report/summary/components/Filter.jsx");
/* harmony import */ var _DataGrid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./DataGrid */ "./www/sources/js/pages/report/summary/components/DataGrid.jsx");
/* harmony import */ var _Chart__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Chart */ "./www/sources/js/pages/report/summary/components/Chart.jsx");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









class AppContainer extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  componentDidMount() {
    this.props.getAllSetting();
  }

  componentWillUnmount() {
    this.props.resetState();
  }

  render() {
    const {
      allSettingData,
      gridData,
      contentChartPopup
    } = this.props;

    if (allSettingData === null || !allSettingData) {
      return null;
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Filter__WEBPACK_IMPORTED_MODULE_5__["default"], null), gridData === null || gridData === undefined ? null : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DataGrid__WEBPACK_IMPORTED_MODULE_6__["default"], null), contentChartPopup.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Chart__WEBPACK_IMPORTED_MODULE_7__["default"], null));
  }

}

_defineProperty(AppContainer, "propTypes", {
  contentChartPopup: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.shape({
    show: prop_types__WEBPACK_IMPORTED_MODULE_4___default.a.bool
  }).isRequired
});

_defineProperty(AppContainer, "defaultProps", {
  contentChartPopup: {
    show: false
  }
});

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    allSettingData,
    gridData,
    contentChartPopup
  } = state;
  return {
    allSettingData,
    gridData,
    contentChartPopup
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(AppContainer));

/***/ }),

/***/ "./www/sources/js/pages/report/summary/components/Chart.jsx":
/*!******************************************************************!*\
  !*** ./www/sources/js/pages/report/summary/components/Chart.jsx ***!
  \******************************************************************/
/*! exports provided: Chart, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Chart", function() { return Chart; });
/* harmony import */ var _jsroot_common_colorColumnChart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/common/colorColumnChart */ "./www/sources/js/common/colorColumnChart.js");
/* harmony import */ var _jsroot_components_DraggableModalDialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/components/DraggableModalDialog */ "./www/sources/js/components/DraggableModalDialog.jsx");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var recharts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! recharts */ "./node_modules/recharts/es6/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/report/summary/actions.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









class Chart extends react__WEBPACK_IMPORTED_MODULE_2__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "addCategorySummary", (categorySummary, obj, month) => {
      categorySummary.summaries.map(report => {
        if (report.month === month && report.amount !== 0) {
          if (obj[categorySummary.name]) {
            obj[categorySummary.name] += report.amount;
          } else {
            obj[categorySummary.name] = report.amount;
          }
        }
      });
      return obj;
    });

    _defineProperty(this, "convertDataChart", (months, categorySummaries) => {
      const data = months.map(month => {
        const obj = {
          name: month
        };
        categorySummaries.map(categorySummary => {
          this.addCategorySummary(categorySummary, obj, month);
        });
        return obj;
      });
      return data;
    });

    _defineProperty(this, "getLabels", reports => {
      const labels = [];
      reports.forEach(report => {
        const index = labels.findIndex(label => label === report.name);

        if (index === -1) {
          labels.push(report.name);
        }
      });
      return labels;
    });

    _defineProperty(this, "onCloseChart", () => {
      this.props.setChartPopup({
        show: false
      });
    });
  }

  render() {
    const {
      categorySummaries,
      months,
      reportTitle
    } = this.props.gridData;
    const data = this.convertDataChart(months, categorySummaries);
    const labels = this.getLabels(categorySummaries);
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Modal"], {
      show: true,
      className: "chart-modal-dialog",
      dialogAs: _jsroot_components_DraggableModalDialog__WEBPACK_IMPORTED_MODULE_1__["default"],
      backdrop: "static",
      keyboard: false,
      size: "xl",
      onHide: this.onCloseChart
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Modal"].Header, {
      closeButton: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Modal"].Title, {
      as: "div"
    }, reportTitle)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Modal"].Body, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(recharts__WEBPACK_IMPORTED_MODULE_5__["BarChart"], {
      width: 1100,
      height: 750,
      data: data,
      margin: {
        top: 30,
        right: 30,
        left: 30,
        bottom: 30 + labels.length / 6 * 35
      },
      padding: {
        bottom: 100
      },
      barCategoryGap: 2,
      barGap: 2
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(recharts__WEBPACK_IMPORTED_MODULE_5__["CartesianGrid"], {
      strokeDasharray: "3 3"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(recharts__WEBPACK_IMPORTED_MODULE_5__["XAxis"], {
      dataKey: "name"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(recharts__WEBPACK_IMPORTED_MODULE_5__["YAxis"], {
      label: {
        value: 'Feedback(s)',
        position: 'top',
        dy: -10
      },
      domain: [0, 'dataMax'],
      allowDecimals: false
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(recharts__WEBPACK_IMPORTED_MODULE_5__["Legend"], {
      wrapperStyle: {
        bottom: 5,
        left: 90,
        width: 993
      }
    }), labels.map((label, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(recharts__WEBPACK_IMPORTED_MODULE_5__["Bar"], {
      dataKey: label,
      key: index,
      label: {
        position: 'top'
      },
      fill: _jsroot_common_colorColumnChart__WEBPACK_IMPORTED_MODULE_0__["default"][index % 20]
    })))));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_6__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_7__["ActionCreators"], dispatch);

const mapStateToProp = state => {
  const {
    gridData
  } = state;
  return {
    gridData
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["connect"])(mapStateToProp, mapDispatchToProps)(Chart));

/***/ }),

/***/ "./www/sources/js/pages/report/summary/components/DataGrid.jsx":
/*!*********************************************************************!*\
  !*** ./www/sources/js/pages/report/summary/components/DataGrid.jsx ***!
  \*********************************************************************/
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
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/report/summary/actions.js");
/* harmony import */ var _jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/components/react-grid/index */ "./www/sources/js/components/react-grid/index.jsx");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








class DataGrid extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "renderCustomButtonReport", () => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["OverlayTrigger"], {
        overlay: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Tooltip"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "View Chart")),
        placement: "auto"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "fa fa-bar-chart icon pl-3",
        onClick: this.handleShowChart
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["OverlayTrigger"], {
        overlay: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Tooltip"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Collapse/Expand")),
        placement: "auto"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "fa fa-expand icon pl-3",
        onClick: this.handleCollapseExpandReport
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["OverlayTrigger"], {
        overlay: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Tooltip"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Export to Excel")),
        placement: "auto"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "fa fa-file-excel-o icon-excel pl-3",
        onClick: () => this.handleExportExcel()
      })));
    });

    _defineProperty(this, "handleCollapseExpandReport", () => {
      const {
        toggleRowReport,
        isCollapseReport
      } = this.state;

      if (!isCollapseReport) {
        this.props.gridData.categorySummaries.forEach(main => {
          if (toggleRowReport.indexOf(main) < 0) {
            toggleRowReport.push(main.id);
          }
        });
        this.setState(prevState => ({
          toggleRowReport,
          isCollapseReport: !prevState.isCollapseReport
        }));
      } else {
        this.setState(prevState => ({
          toggleRowReport: [],
          isCollapseReport: !prevState.isCollapseReport
        }));
      }
    });

    _defineProperty(this, "handleExportExcel", () => {
      const params = _objectSpread({}, this.props.gridParams);

      this.props.exportExcel(params);
    });

    _defineProperty(this, "buildHeader", () => {
      const {
        months
      } = this.props.gridData;
      const headers = [];
      const cells = [];
      cells.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        key: "header",
        className: "sticky-header",
        colWidth: 60
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Categories')));
      months.map(item => {
        cells.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
          key: item,
          colWidth: 12
        }, item));
      });
      headers.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderRow"], {
        key: "group-header"
      }, cells));
      return headers;
    });

    _defineProperty(this, "renderFooter", () => {
      const {
        grandTotals
      } = this.props.gridData;
      const cells = [];

      if (grandTotals.length > 0) {
        cells.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
          key: "grandtotal"
        }, "Grand Total"));
        grandTotals.map(item => {
          cells.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
            className: "right",
            key: item.month + '-footer'
          }, item.amount));
        });
        return [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Row"], {
          key: "footer",
          className: "footer-container font-weight-bold"
        }, cells)];
      }

      return null;
    });

    _defineProperty(this, "buildBody", () => {
      const {
        categorySummaries
      } = this.props.gridData;
      const rows = [];

      if (categorySummaries.length > 0) {
        rows.push(categorySummaries.map(item => this.renderMainCategoryRows(item)));
        return rows;
      }

      return [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Row"], {
        key: `body${1}`,
        className: "no-data"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
        className: "text-center",
        colSpan: 15
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('ThereIsNoData')))];
    });

    _defineProperty(this, "renderSubCategoryRows", (parentId, sub) => {
      const toggle = this.state.toggleRowReport;

      if (!toggle.includes(parentId)) {
        const cells = [];
        cells.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
          key: sub.name,
          className: "child",
          style: {
            width: 280,
            'paddingLeft': 20
          }
        }, sub.name));
        sub.summaries.map(sumMonth => {
          cells.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
            key: sumMonth.month,
            className: "complaints-text right"
          }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, sumMonth.amount === 0 ? '' : sumMonth.amount)));
        });
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Row"], {
          key: `child-${sub.id}`
        }, cells);
      } else {
        return null;
      }
    });

    _defineProperty(this, "handleToggleRow", id => {
      const categories = this.state.toggleRowReport;
      const index = categories.indexOf(id);

      if (index >= 0) {
        categories.splice(index, 1);
      } else {
        categories.push(id);
      }

      this.setState({
        categories
      });
    });

    _defineProperty(this, "getMaxWidth", totalWidth => document.getElementById('app-container').clientWidth < totalWidth ? document.getElementById('app-container').clientWidth : totalWidth);

    _defineProperty(this, "handleShowChart", () => {
      this.props.setChartPopup({
        show: true
      });
    });

    _defineProperty(this, "renderMainCategoryRows", item => {
      const rows = [];
      const cells = [];
      const toggles = this.state.toggleRowReport;
      cells.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
        key: item.id + 'icon',
        className: "complaints-text"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: `expand-icon fa pr-2 ${!toggles.includes(item.id) ? 'fa-caret-down' : 'fa-caret-right'}`
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, item.name)));
      item.summaries.map(sumMonth => {
        cells.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
          key: sumMonth.month,
          className: "complaints-text right"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, sumMonth.amount === 0 ? '' : sumMonth.amount)));
      });
      rows.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Row"], {
        key: `parent-${item.id}`,
        className: "parent-level-0",
        onClick: () => this.handleToggleRow(item.id)
      }, cells));

      if (item.subCategories.length > 0) {
        rows.push(item.subCategories.map(sub => this.renderSubCategoryRows(item.id, sub)));
      }

      return rows;
    });

    this.state = {
      shouldResetScrollPosition: true,
      toggleRowReport: [],
      isCollapseReport: false
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.gridData !== nextProps.gridData) {
      nextState.shouldResetScrollPosition = true;
      nextState.toggleRowReport = [];
      nextState.isCollapseReport = false;
    }

    if (this.state.toggleRowReport.length > 0) {
      nextState.shouldResetScrollPosition = false;
    }

    return true;
  }

  render() {
    const {
      categorySummaries,
      grandTotals,
      months,
      reportTitle
    } = this.props.gridData;

    if (reportTitle === null || categorySummaries === null || grandTotals === null || months === null) {
      return null;
    }

    const defaultWidth = 400;
    const totalWidth = defaultWidth + months.length * 60;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "table"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      style: {
        width: totalWidth
      },
      className: "table-title d-flex justify-content-between align-items-center"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, reportTitle), categorySummaries.length > 0 && this.renderCustomButtonReport()), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Table"], {
      width: totalWidth,
      autoWidth: false,
      header: this.buildHeader(),
      body: this.buildBody(),
      footer: this.renderFooter(),
      isPaging: false,
      containerPadding: 0,
      adjustedHeight: 10,
      shouldResetScrollPosition: this.state.shouldResetScrollPosition
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

/***/ "./www/sources/js/pages/report/summary/components/Filter.jsx":
/*!*******************************************************************!*\
  !*** ./www/sources/js/pages/report/summary/components/Filter.jsx ***!
  \*******************************************************************/
/*! exports provided: Filter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Filter", function() { return Filter; });
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/report/summary/actions.js");
/* harmony import */ var _jsroot_components_multiple_select_index__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/components/multiple-select/index */ "./www/sources/js/components/multiple-select/index.jsx");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








class Filter extends react__WEBPACK_IMPORTED_MODULE_1__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleSettingOptions", allSettingData => {
      const {
        siteTypes,
        categories
      } = allSettingData;
      const categoryIdFilters = [];
      const categoryOptions = categories.map(item => {
        categoryIdFilters.push(item.mainCategoryID);
        return _objectSpread(_objectSpread({}, item), {}, {
          checked: true
        });
      });
      const siteOptions = siteTypes;
      const categoryIdFiltersJoin = categoryIdFilters.join(',');
      this.setState({
        categoryOptions,
        siteOptions,
        categories: categoryIdFiltersJoin
      });
    });

    _defineProperty(this, "submitHandler", event => {
      event.preventDefault();
      const {
        year,
        categories,
        siteType
      } = this.state;
      const params = {
        year,
        categories,
        siteType
      };
      this.props.setGridParams(_objectSpread({}, params));
      this.props.getGridData(_objectSpread({}, params));
    });

    this.state = {
      categoryOptions: [],
      siteOptions: [],
      year: new Date().getFullYear(),
      categories: '',
      siteType: 0
    };
  }

  componentDidMount() {
    this.handleSettingOptions(this.props.allSettingData);
  }

  render() {
    const {
      categoryOptions,
      siteOptions
    } = this.state;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"], {
      className: "form-filter",
      onSubmit: this.submitHandler
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Row, {
      bsPrefix: "form-row"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Label, {
      htmlFor: "year"
    }, "Year"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Control, {
      as: "select",
      size: "sm",
      className: "shadow-none form-control-year",
      id: "year",
      value: this.state.year,
      onChange: evt => this.setState({
        year: evt.target.value
      })
    }, this.props.allSettingData.yearRange.map(key => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("option", {
      key: key.value,
      value: key.value
    }, key.value)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Label, {
      className: "label-width",
      htmlFor: "site"
    }, "Site"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Control, {
      as: "select",
      size: "sm",
      className: "shadow-none ",
      id: "year",
      onChange: evt => this.setState({
        siteType: evt.target.value
      })
    }, siteOptions.map(item => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("option", {
      value: item.id,
      key: item.id
    }, item.name)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Group, {
      className: "form-width"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Label, {
      htmlFor: "categoryId"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getResource('Category')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "form-control-wrapper"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_jsroot_components_multiple_select_index__WEBPACK_IMPORTED_MODULE_6__["default"], {
      valueField: "name",
      dataSource: categoryOptions,
      keyField: "mainCategoryID",
      maxDisplayItemCount: 0,
      onChange: (currentItem, selectedItemsKey) => {
        this.setState({
          categories: selectedItemsKey
        });
      },
      hasSearchBox: true,
      isNAOption: true
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
      variant: "primary",
      size: "sm",
      onClick: this.submitHandler
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getResource('Submit')))));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_4__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_5__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    allSettingData
  } = state;
  return {
    allSettingData
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, mapDispatchToProps)(Filter));

/***/ }),

/***/ "./www/sources/js/pages/report/summary/index.js":
/*!******************************************************!*\
  !*** ./www/sources/js/pages/report/summary/index.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return index; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @reduxjs/toolkit */ "./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");
/* harmony import */ var _summaryReportSlice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./summaryReportSlice */ "./www/sources/js/pages/report/summary/summaryReportSlice.js");
/* harmony import */ var _components_AppContainer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/AppContainer */ "./www/sources/js/pages/report/summary/components/AppContainer.jsx");
/* harmony import */ var _cssroot_pages_report_summary_index_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @cssroot/pages/report/summary/index.scss */ "./www/sources/css/pages/report/summary/index.scss");
/* harmony import */ var _cssroot_pages_report_summary_index_scss__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_cssroot_pages_report_summary_index_scss__WEBPACK_IMPORTED_MODULE_5__);





const store = Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__["configureStore"])({
  reducer: _summaryReportSlice__WEBPACK_IMPORTED_MODULE_3__["default"]
});

class index extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_1__["Provider"], {
      store: store
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "summary"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_AppContainer__WEBPACK_IMPORTED_MODULE_4__["default"], null)));
  }

}

/***/ }),

/***/ "./www/sources/js/pages/report/summary/summaryReportSlice.js":
/*!*******************************************************************!*\
  !*** ./www/sources/js/pages/report/summary/summaryReportSlice.js ***!
  \*******************************************************************/
/*! exports provided: setAllSetting, setGridParams, setGridData, setChartPopup, resetState, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setAllSetting", function() { return setAllSetting; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setGridParams", function() { return setGridParams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setGridData", function() { return setGridData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setChartPopup", function() { return setChartPopup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetState", function() { return resetState; });
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @reduxjs/toolkit */ "./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");

const initialState = {
  allSettingData: null,
  gridParams: {
    year: new Date().getFullYear(),
    categories: '',
    siteType: 0
  },
  gridData: null,
  contentChartPopup: {
    show: false
  }
};
const summaryReportSlice = Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__["createSlice"])({
  name: 'summaryReport',
  initialState: initialState,
  reducers: {
    resetState: () => initialState,
    setAllSetting: (state, action) => {
      state.allSettingData = action.payload;
    },
    setGridParams: (state, action) => {
      state.gridParams = action.payload;
    },
    setGridData: (state, action) => {
      state.gridData = action.payload;
    },
    setChartPopup: (state, action) => {
      state.contentChartPopup = action.payload;
    }
  }
});
const {
  actions,
  reducer
} = summaryReportSlice;
const {
  setAllSetting,
  setGridParams,
  setGridData,
  setChartPopup,
  resetState
} = actions;
/* harmony default export */ __webpack_exports__["default"] = (reducer);

/***/ })

}]);
//# sourceMappingURL=22.chunk.js.map