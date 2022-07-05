(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[19],{

/***/ "./www/sources/css/pages/report/issue-statistics/index.scss":
/*!******************************************************************!*\
  !*** ./www/sources/css/pages/report/issue-statistics/index.scss ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./www/sources/js/pages/report/issue-statistics/actions.js":
/*!*****************************************************************!*\
  !*** ./www/sources/js/pages/report/issue-statistics/actions.js ***!
  \*****************************************************************/
/*! exports provided: ActionCreators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionCreators", function() { return ActionCreators; });
/* harmony import */ var _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/common/dataService */ "./www/sources/js/common/dataService.js");
/* harmony import */ var _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/common/site */ "./www/sources/js/common/site.js");
/* harmony import */ var _issueStatisticsSlice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./issueStatisticsSlice */ "./www/sources/js/pages/report/issue-statistics/issueStatisticsSlice.js");




const getAllSettings = () => async dispatch => {
  _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].blockUI();
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('IssueStatistics/GetAllSettings');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__["default"].getDataAsync(url).then(response => {
    dispatch(Object(_issueStatisticsSlice__WEBPACK_IMPORTED_MODULE_2__["setAllSettings"])(response.data));
  }).catch(_jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].handleAxiosError).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].unblockUI());
};

const getGridData = params => async dispatch => {
  _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].blockUI();
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('IssueStatistics/GetIssuesStatistics');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__["default"].postDataAsync(url, params).then(response => {
    dispatch(Object(_issueStatisticsSlice__WEBPACK_IMPORTED_MODULE_2__["setGridData"])(response.data));
  }).catch(_jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].handleAxiosError).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].unblockUI());
};

const exportExcel = params => async () => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('IssueStatistics/ExportExcel');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__["default"].getFileAsync(url, params).then(response => {
    const fileName = response.headers['content-disposition'].split('filename=')[1].split(";")[0];
    _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].downloadFile(response.data, fileName);
  });
};

const ActionCreators = {
  setGridParams: _issueStatisticsSlice__WEBPACK_IMPORTED_MODULE_2__["setGridParams"],
  getAllSettings,
  setAllSettings: _issueStatisticsSlice__WEBPACK_IMPORTED_MODULE_2__["setAllSettings"],
  getGridData,
  setGridData: _issueStatisticsSlice__WEBPACK_IMPORTED_MODULE_2__["setGridData"],
  setChartData: _issueStatisticsSlice__WEBPACK_IMPORTED_MODULE_2__["setChartData"],
  exportExcel,
  resetState: _issueStatisticsSlice__WEBPACK_IMPORTED_MODULE_2__["resetState"]
};

/***/ }),

/***/ "./www/sources/js/pages/report/issue-statistics/components/AppContainer.jsx":
/*!**********************************************************************************!*\
  !*** ./www/sources/js/pages/report/issue-statistics/components/AppContainer.jsx ***!
  \**********************************************************************************/
/*! exports provided: AppContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppContainer", function() { return AppContainer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/report/issue-statistics/actions.js");
/* harmony import */ var _Filter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Filter */ "./www/sources/js/pages/report/issue-statistics/components/Filter.jsx");
/* harmony import */ var _DataGrid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DataGrid */ "./www/sources/js/pages/report/issue-statistics/components/DataGrid.jsx");
/* harmony import */ var _Chart__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Chart */ "./www/sources/js/pages/report/issue-statistics/components/Chart.jsx");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








class AppContainer extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "handleCloseChartDialog", () => {
      this.props.setChartData({
        show: false,
        data: null
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
      settings,
      chart
    } = this.props;

    if (settings === null || !settings) {
      return null;
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Filter__WEBPACK_IMPORTED_MODULE_4__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DataGrid__WEBPACK_IMPORTED_MODULE_5__["default"], null), chart.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Chart__WEBPACK_IMPORTED_MODULE_6__["default"], {
      chartInfo: chart.chartInfo,
      onClose: this.handleCloseChartDialog
    }));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    settings,
    chart
  } = state;
  return {
    settings,
    chart
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(AppContainer));

/***/ }),

/***/ "./www/sources/js/pages/report/issue-statistics/components/Chart.jsx":
/*!***************************************************************************!*\
  !*** ./www/sources/js/pages/report/issue-statistics/components/Chart.jsx ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Chart; });
/* harmony import */ var _jsroot_components_DraggableModalDialog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/components/DraggableModalDialog */ "./www/sources/js/components/DraggableModalDialog.jsx");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var _jsroot_common_shareScripts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/common/shareScripts */ "./www/sources/js/common/shareScripts.js");
/* harmony import */ var recharts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! recharts */ "./node_modules/recharts/es6/index.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






class Chart extends react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "getDataChart", chartInfo => {
      const countries = [];
      chartInfo.total.childReports.forEach(item => {
        countries.push(item.countryInfo);
      });
      const data = [];
      chartInfo.childReports.forEach(dateReport => {
        dateReport.childReports.forEach(timeReport => {
          const objectData = {
            name: `${dateReport.shortName} - ${timeReport.shortName}`
          };
          const countryInfo = this.getCountries(timeReport, countries, objectData);
          data.push(countryInfo);
        });
      });
      return data;
    });

    _defineProperty(this, "getCountries", (timeReport, countries, objectData) => {
      const countryReport = timeReport.childReports;
      countryReport.forEach((country, index) => {
        if (country.numberOfIssues > 0) {
          objectData[countries[index].name] = country.numberOfIssues;
        }
      });
      return objectData;
    });

    _defineProperty(this, "getLabels", chartInfo => {
      const labels = [];
      chartInfo.total.childReports.forEach(item => {
        const index = labels.findIndex(label => label === item.countryInfo.name);

        if (index === -1) {
          labels.push(item.countryInfo.name);
        }
      });
      return labels;
    });
  }

  render() {
    const {
      chartInfo
    } = this.props;
    const data = this.getDataChart(chartInfo);
    const labels = this.getLabels(chartInfo);
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"], {
      show: true,
      dialogAs: _jsroot_components_DraggableModalDialog__WEBPACK_IMPORTED_MODULE_0__["default"],
      backdrop: "static",
      keyboard: false,
      size: "xl",
      onHide: this.props.onClose
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Header, {
      closeButton: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Title, {
      as: "div"
    }, chartInfo.name)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Body, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(recharts__WEBPACK_IMPORTED_MODULE_4__["ResponsiveContainer"], {
      width: "100%",
      height: data.length > 5 ? 800 : 700
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(recharts__WEBPACK_IMPORTED_MODULE_4__["BarChart"], {
      width: 1100,
      data: data,
      margin: {
        top: 30,
        right: 30,
        left: 30,
        bottom: data.length > 5 ? 200 : 30
      },
      barCategoryGap: data.length > 30 ? -20 : 0,
      barGap: 0
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(recharts__WEBPACK_IMPORTED_MODULE_4__["CartesianGrid"], {
      strokeDasharray: "3 3"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(recharts__WEBPACK_IMPORTED_MODULE_4__["YAxis"], {
      label: {
        value: 'Issue(s)',
        position: 'top',
        dy: -10
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(recharts__WEBPACK_IMPORTED_MODULE_4__["XAxis"], {
      dataKey: "name",
      padding: {
        left: 25
      },
      scaleToFit: "true",
      verticalAnchor: "start",
      interval: 0,
      angle: data.length > 5 ? -90 : 0,
      dy: data.length > 5 ? 120 : 0
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(recharts__WEBPACK_IMPORTED_MODULE_4__["Legend"], {
      wrapperStyle: {
        bottom: 5,
        left: 75
      }
    }), labels.map((label, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(recharts__WEBPACK_IMPORTED_MODULE_4__["Bar"], {
      dataKey: label,
      key: index,
      label: {
        position: 'top'
      },
      fill: Object(_jsroot_common_shareScripts__WEBPACK_IMPORTED_MODULE_3__["getBackGroundColor"])(index)
    }))))));
  }

}

/***/ }),

/***/ "./www/sources/js/pages/report/issue-statistics/components/DataGrid.jsx":
/*!******************************************************************************!*\
  !*** ./www/sources/js/pages/report/issue-statistics/components/DataGrid.jsx ***!
  \******************************************************************************/
/*! exports provided: DataGrid, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataGrid", function() { return DataGrid; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/report/issue-statistics/actions.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/components/react-grid/index */ "./www/sources/js/components/react-grid/index.jsx");
/* harmony import */ var _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/common/constants */ "./www/sources/js/common/constants.js");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








class DataGrid extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "buildHeader", countryArr => {
      const header = [];
      header.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 12
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Date')));
      header.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 12
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Time')));
      countryArr.map(item => {
        header.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
          colWidth: 10
        }, item.name));
      });
      header.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 10
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Total')));
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderRow"], null, header);
    });

    _defineProperty(this, "buildBody", (gridData, countryArr) => {
      if (gridData.childReports.length > 0) {
        return gridData.childReports.map((item, index) => this.renderRow(item, index, countryArr));
      }

      return [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Row"], {
        key: `body${1}`,
        className: "no-data"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: "text-center",
        colSpan: 7
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('ThereIsNoData')))];
    });

    _defineProperty(this, "getCountriesArray", data => {
      const countries = [];
      data.total.childReports.forEach(item => {
        countries.push(item.countryInfo);
      });
      return countries;
    });

    _defineProperty(this, "renderRow", (item, index, countryArr) => {
      const timeReport = item.childReports;
      const countries = timeReport[0].childReports;
      const total = item.total;
      const cells = [];
      const cellsTotal = [];
      cells.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: "text-center fix-first-column",
        rowSpan: item.childReports.length
      }, item.shortName));
      cells.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: "text-center fix-second-column"
      }, timeReport[0].shortName));
      cellsTotal.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: "fix-first-column"
      }, total.shortName));
      cellsTotal.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: "fix-second-column"
      }));
      countryArr.forEach((item, index) => {
        cells.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
          key: `${item.name}-${index}`,
          className: "text-center"
        }, countries[index].numberOfIssues > 0 ? countries[index].numberOfIssues : ''));
        cellsTotal.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
          className: "text-center"
        }, total.childReports[index].numberOfIssues));
      });
      cells.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: "text-center"
      }, timeReport[0].numberOfIssues));
      cellsTotal.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: "text-center"
      }, total.numberOfIssues));
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Row"], {
        key: index,
        className: "height-row"
      }, cells), item.childReports.length > 1 && item.childReports.slice(1).map((ele, key) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Row"], {
        key: `country-${key}`,
        className: "height-row"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: "text-center fix-second-column"
      }, ele.shortName), ele.childReports.map((child, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        key: `${child.name}-${index}`,
        className: "text-center"
      }, child.numberOfIssues > 0 ? child.numberOfIssues : '')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: "text-center"
      }, ele.numberOfIssues))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Row"], {
        className: "total-row height-row",
        key: `total-${index}`
      }, cellsTotal));
    });

    _defineProperty(this, "renderFooter", gridData => {
      if (gridData.total.numberOfIssues > 0) {
        const cells = [];
        cells.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
          className: "fix-first-column"
        }, "Grand Total"));
        cells.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
          className: "fix-second-column"
        }));
        gridData.total.childReports.forEach(item => {
          cells.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
            className: "text-center"
          }, item.numberOfIssues));
        });
        cells.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
          className: "text-center"
        }, gridData.total.numberOfIssues));
        return [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Row"], {
          key: "footer",
          className: "footer-container font-weight-bold"
        }, cells)];
      }

      return null;
    });

    _defineProperty(this, "handleExportExcel", () => {
      const {
        gridParams
      } = this.props;
      this.props.exportExcel(gridParams);
    });

    _defineProperty(this, "onPaging", (pageIndex, pageSize) => {
      const params = _objectSpread({}, this.props.gridParams);

      params['pageSize'] = pageSize;
      params['pageIndex'] = pageIndex;
      this.props.setGridParams(params);
      this.props.getGridData(params);
    });

    _defineProperty(this, "renderTitle", gridData => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "table-title d-flex justify-content-between align-items-center"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, gridData.name), gridData.childReports.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "tool-box"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "fa fa-bar-chart mr-3 btn-chart",
        onClick: () => this.props.setChartData({
          show: true,
          chartInfo: this.props.gridData
        })
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "fa fa-file-excel-o btn-export-excel icon-excel",
        onClick: this.handleExportExcel
      })));
    });

    _defineProperty(this, "isPagingCheck", () => this.props.gridParams.reportType === 1 ? true : false);
  }

  render() {
    const {
      gridData
    } = this.props;

    if (!gridData) {
      return null;
    }

    const {
      pageIndex,
      pageSize
    } = this.props.gridParams;
    const pagingOption = {
      PageIndex: pageIndex,
      PageSize: pageSize,
      TotalItem: gridData.totalChildReports,
      PageList: _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_5__["SMALL_PAGING_SIZES"]
    };
    const defaultWidth = 510;
    const countryArr = this.getCountriesArray(gridData);
    const countriesWidth = countryArr.length * 90;
    const totalWidth = defaultWidth + countriesWidth;
    const clientWidth = document.getElementById('right-row-container').clientWidth;
    const width = clientWidth < totalWidth ? clientWidth : totalWidth;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Table"], {
      maxWidth: totalWidth,
      shouldUseMaxWidth: true,
      width: width,
      autoWidth: false,
      title: this.renderTitle(gridData),
      header: this.buildHeader(countryArr),
      body: this.buildBody(gridData, countryArr),
      footer: this.renderFooter(gridData),
      isFixColumn: true,
      isPaging: this.isPagingCheck(),
      widthFixColumns: [147],
      isPaging: this.isPagingCheck(),
      pageOption: pagingOption,
      onPaging: this.onPaging,
      containerPadding: 0,
      adjustedHeight: 10
    }));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_3__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    gridData,
    gridParams
  } = state;
  return {
    gridData,
    gridParams
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(DataGrid));

/***/ }),

/***/ "./www/sources/js/pages/report/issue-statistics/components/Filter.jsx":
/*!****************************************************************************!*\
  !*** ./www/sources/js/pages/report/issue-statistics/components/Filter.jsx ***!
  \****************************************************************************/
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
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/report/issue-statistics/actions.js");
/* harmony import */ var _jsroot_components_date_picker_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/components/date-picker/index */ "./www/sources/js/components/date-picker/index.jsx");
/* harmony import */ var _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/common/dateTimeService */ "./www/sources/js/common/dateTimeService.js");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/lib/index.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_toastify__WEBPACK_IMPORTED_MODULE_8__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }










class Filter extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleChangeFromDate", fromDate => {
      let toDate = this.state.toDate;
      const endDateOfMonth = new Date(fromDate.getFullYear(), fromDate.getMonth() + 1, 0);
      const endDateOfMonthFormat = new Date(_jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__["default"].toShortDateTimeFormat(new Date(endDateOfMonth)));

      if (endDateOfMonth < this.state.toDate) {
        toDate = endDateOfMonthFormat;
      }

      if (this.state.toDate < fromDate) {
        toDate = fromDate;
      }

      this.setState({
        fromDate,
        toDate
      });
    });

    _defineProperty(this, "handleChangeToDate", toDate => {
      let fromDate = this.state.fromDate;
      const startDateOfMonth = new Date(toDate.getFullYear(), toDate.getMonth(), 1);
      const startDateOfMonthFormat = new Date(_jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__["default"].toShortDateTimeFormat(new Date(startDateOfMonth)));

      if (this.state.fromDate < startDateOfMonth) {
        fromDate = startDateOfMonthFormat;
      }

      if (toDate < this.state.fromDate) {
        fromDate = toDate;
      }

      this.setState({
        fromDate,
        toDate
      });
    });

    _defineProperty(this, "getToMonthDate", fromMonthDate => fromMonthDate.getFullYear() === new Date().getFullYear() ? this.currentDate : new Date(_jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__["default"].endMonthOfYear(fromMonthDate)));

    _defineProperty(this, "handleChangeMonthFromDate", fromMonthDate => {
      let toMonthDate = this.state.toMonthDate;
      const fromMonthGetYear = fromMonthDate.getFullYear();
      const toMonthGetYear = toMonthDate.getFullYear();

      if (fromMonthGetYear !== toMonthGetYear) {
        toMonthDate = this.getToMonthDate(fromMonthDate);
      }

      this.minMonthToDate = fromMonthDate;
      this.setState({
        fromMonthDate,
        toMonthDate
      });
    });

    _defineProperty(this, "handleChangeMonthToDate", toMonthDate => {
      let fromMonthDate = this.state.fromMonthDate;
      const firstMonthOfYear = new Date(_jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__["default"].firstMonthOfYear(toMonthDate));
      const fromMonthGetYear = fromMonthDate.getFullYear();
      const toMonthGetYear = toMonthDate.getFullYear();

      if (fromMonthGetYear !== toMonthGetYear) {
        fromMonthDate = firstMonthOfYear;
      }

      this.maxMonthFromDate = toMonthDate;
      this.setState({
        fromMonthDate,
        toMonthDate
      });
    });

    _defineProperty(this, "handleChange", evt => {
      this.setState(_objectSpread(_objectSpread({}, this.state), {}, {
        [evt.target.name]: parseInt(evt.target.value, 10)
      }));
    });

    _defineProperty(this, "handleChangeMainCategory", evt => {
      this.setState(_objectSpread(_objectSpread({}, this.state), {}, {
        [evt.target.name]: parseInt(evt.target.value, 10),
        subCategoryId: -1
      }));
    });

    _defineProperty(this, "renderOptions", (name, item, key) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
      key: key,
      value: item
    }, name));

    _defineProperty(this, "handleSubmit", () => {
      const {
        mainCategoryId,
        fromDate,
        toDate,
        subCategoryId,
        groupBy,
        fromMonthDate,
        toMonthDate
      } = this.state;

      if (mainCategoryId === -1) {
        react_toastify__WEBPACK_IMPORTED_MODULE_8__["toast"].error(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].formatString(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('FieldRequired'), _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('MainCategory')));
        return;
      }

      if (mainCategoryId !== 0 && subCategoryId === -1) {
        react_toastify__WEBPACK_IMPORTED_MODULE_8__["toast"].error(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].formatString(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('FieldRequired'), _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('SubCategory')));
        return;
      }

      const endDateOfMonth = new Date(toMonthDate.getFullYear(), toMonthDate.getMonth() + 1, 0);
      const endDateOfMonthFormat = _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__["default"].toShortDateFormat(new Date(endDateOfMonth));
      const params = {
        reportType: groupBy,
        fromDate: groupBy === 1 ? _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__["default"].toShortDateFormat(fromDate) : _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__["default"].toShortDateFormat(fromMonthDate),
        toDate: groupBy === 1 ? _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__["default"].toShortDateFormat(toDate) : endDateOfMonthFormat,
        mainCategoryId: mainCategoryId,
        subCategoryId: subCategoryId === -1 ? 0 : subCategoryId,
        isGetFullReport: groupBy !== 1,
        pageIndex: 1,
        pageSize: this.props.gridParams.pageSize
      };
      this.props.setGridParams(params);
      this.props.getGridData(params);
    });

    _defineProperty(this, "getMainCategoryOptions", (mainCategories, subCategories) => {
      const categoriesArr = [];
      const select = _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('PleaseSelect');
      mainCategories.map(value => {
        const subFilter = subCategories.filter(item => item.mainCategoryID === value.mainCategoryID);
        subFilter.unshift({
          name: 'All',
          subCategoryId: 0
        });
        subFilter.unshift({
          name: select,
          subCategoryId: -1
        });
        categoriesArr.push({
          mainCategoryID: value.mainCategoryID,
          name: value.name,
          subCate: subFilter
        });
      });
      categoriesArr.unshift({
        mainCategoryID: 0,
        name: 'All',
        subCate: [{
          name: 'All',
          subCategoryId: 0
        }]
      });
      categoriesArr.unshift({
        mainCategoryID: -1,
        name: select,
        subCate: [{
          name: select,
          subCategoryId: -1
        }]
      });
      return categoriesArr;
    });

    _defineProperty(this, "getSubCategoryOptions", (mainCategories, mainCategoryId) => mainCategories.filter(item => item.mainCategoryID === parseInt(mainCategoryId, 10)));

    _defineProperty(this, "handleToggleFilter", value => {
      this.setState({
        showFilter: value
      });
      window.dispatchEvent(new Event('resize'));
    });

    const currentClientTime = window.currentClientTime;
    this.currentDate = new Date(_jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__["default"].toShortDateTimeFormat(new Date(currentClientTime)));
    const firstDateFirstMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
    const firstDateOfMonthFormat = new Date(_jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__["default"].toShortDateTimeFormat(new Date(firstDateFirstMonth)));

    const _firstMonthOfYear = new Date(_jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__["default"].firstMonthOfYear(this.currentDate));

    const minDate = new Date('1/1/2011');
    this.maxFromDate = this.currentDate;
    this.maxToDate = this.currentDate;
    this.minFromDate = minDate;
    this.minToDate = minDate;
    this.minMonthFromDate = minDate;
    this.minMonthToDate = minDate;
    this.maxMonthFromDate = this.currentDate;
    this.maxMonthToDate = this.currentDate;
    this.state = {
      groupBy: 1,
      fromDate: firstDateOfMonthFormat,
      toDate: this.currentDate,
      fromMonthDate: _firstMonthOfYear,
      toMonthDate: this.currentDate,
      mainCategoryId: -1,
      subCategoryId: -1,
      showFilter: true
    };
  }

  render() {
    const {
      mainCategoryId,
      subCategoryId,
      fromDate,
      toDate,
      groupBy,
      fromMonthDate,
      toMonthDate,
      showFilter
    } = this.state;
    const {
      mainCategories,
      subCategories
    } = this.props.settings;
    const mainCategoryOptions = this.getMainCategoryOptions(mainCategories, subCategories);
    const subCategoryOptions = this.getSubCategoryOptions(mainCategoryOptions, mainCategoryId);
    const PeriodType = [{
      id: 1,
      name: 'Daily'
    }, {
      id: 3,
      name: 'Monthly'
    }];
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"], {
      className: "form-filter",
      onSubmit: this.handleSubmit
    }, showFilter && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Row, {
      bsPrefix: "form-row"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, {
      style: {
        width: '210px'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
      htmlFor: "groupBy"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('GroupBy')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Control, {
      as: "select",
      size: "sm",
      style: {
        width: '100px'
      },
      name: "groupBy",
      id: "groupBy",
      value: groupBy,
      onChange: this.handleChange
    }, PeriodType.map((value, key) => this.renderOptions(value.name, value.id, key)))), groupBy === 1 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, {
      className: "form-group-date-picker"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
      htmlFor: "fromDate"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('FromDate')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "react-datepicker-wrapper-container"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_date_picker_index__WEBPACK_IMPORTED_MODULE_5__["default"], {
      dropdownMode: "select",
      showMonthDropdown: true,
      showYearDropdown: true,
      peekNextMonth: true,
      selected: fromDate,
      minDate: new Date(this.minFromDate),
      maxDate: new Date(this.maxFromDate),
      onChange: value => this.handleChangeFromDate(value)
    }))), groupBy === 1 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, {
      className: "form-group-date-picker"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
      htmlFor: "fromDate"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('ToDate')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "react-datepicker-wrapper-container"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_date_picker_index__WEBPACK_IMPORTED_MODULE_5__["default"], {
      dropdownMode: "select",
      showMonthDropdown: true,
      showYearDropdown: true,
      selected: toDate,
      minDate: new Date(this.minToDate),
      maxDate: new Date(this.maxToDate),
      onChange: value => this.handleChangeToDate(value)
    }))), groupBy === 3 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, {
      className: "form-group-date-picker"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
      htmlFor: "fromMonth"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('FromMonth')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "react-datepicker-wrapper-container month-datepicker"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_date_picker_index__WEBPACK_IMPORTED_MODULE_5__["default"], {
      dateFormat: "MM/yyyy",
      showMonthYearPicker: true,
      selected: fromMonthDate,
      minDate: new Date(this.minMonthFromDate),
      maxDate: new Date(this.maxMonthFromDate),
      onChange: value => this.handleChangeMonthFromDate(value)
    }))), groupBy === 3 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, {
      className: "form-group-date-picker"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
      htmlFor: "toMonth"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('ToMonth')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "react-datepicker-wrapper-container month-datepicker"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_date_picker_index__WEBPACK_IMPORTED_MODULE_5__["default"], {
      dateFormat: "MM/yyyy",
      showMonthYearPicker: true,
      selected: toMonthDate,
      minDate: new Date(this.minMonthToDate),
      maxDate: new Date(this.maxMonthToDate),
      onChange: value => this.handleChangeMonthToDate(value)
    })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Row, {
      bsPrefix: "form-row"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, {
      className: "form-group-main-category"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
      htmlFor: "mainCategoryId"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('MainCategory')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Control, {
      as: "select",
      size: "sm",
      name: "mainCategoryId",
      id: "mainCategoryId",
      value: mainCategoryId,
      onChange: this.handleChangeMainCategory
    }, mainCategoryOptions.map((value, key) => this.renderOptions(value.name, value.mainCategoryID, key)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, {
      className: "form-group-sub-category"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
      htmlFor: "subCategoryId"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('SubCategory')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Control, {
      as: "select",
      size: "sm",
      name: "subCategoryId",
      value: subCategoryId,
      onChange: this.handleChange
    }, subCategoryOptions[0].subCate.map((value, key) => this.renderOptions(value.name, value.subCategoryId, key)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], {
      variant: "primary",
      size: "sm",
      onClick: this.handleSubmit
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Submit'))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "filter-collapse text-center"
    }, showFilter ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "fa fa-caret-up fa-sm",
      onClick: () => this.handleToggleFilter(false)
    }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "fa fa-caret-down fa-sm",
      onClick: () => this.handleToggleFilter(true)
    })));
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

/***/ "./www/sources/js/pages/report/issue-statistics/index.js":
/*!***************************************************************!*\
  !*** ./www/sources/js/pages/report/issue-statistics/index.js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return index; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @reduxjs/toolkit */ "./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");
/* harmony import */ var _issueStatisticsSlice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./issueStatisticsSlice */ "./www/sources/js/pages/report/issue-statistics/issueStatisticsSlice.js");
/* harmony import */ var _components_AppContainer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/AppContainer */ "./www/sources/js/pages/report/issue-statistics/components/AppContainer.jsx");
/* harmony import */ var _cssroot_pages_report_issue_statistics_index_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @cssroot/pages/report/issue-statistics/index.scss */ "./www/sources/css/pages/report/issue-statistics/index.scss");
/* harmony import */ var _cssroot_pages_report_issue_statistics_index_scss__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_cssroot_pages_report_issue_statistics_index_scss__WEBPACK_IMPORTED_MODULE_5__);





const store = Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__["configureStore"])({
  reducer: _issueStatisticsSlice__WEBPACK_IMPORTED_MODULE_3__["default"]
});

class index extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_1__["Provider"], {
      store: store
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "issue-statistics"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_AppContainer__WEBPACK_IMPORTED_MODULE_4__["default"], null)));
  }

}

/***/ }),

/***/ "./www/sources/js/pages/report/issue-statistics/issueStatisticsSlice.js":
/*!******************************************************************************!*\
  !*** ./www/sources/js/pages/report/issue-statistics/issueStatisticsSlice.js ***!
  \******************************************************************************/
/*! exports provided: setGridParams, setAllSettings, setGridData, setChartData, resetState, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setGridParams", function() { return setGridParams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setAllSettings", function() { return setAllSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setGridData", function() { return setGridData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setChartData", function() { return setChartData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetState", function() { return resetState; });
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @reduxjs/toolkit */ "./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");

const initialState = {
  settings: null,
  gridParams: {
    pageIndex: 1,
    pageSize: 7
  },
  gridData: null,
  chart: {
    show: false,
    data: null
  }
};
const issueStatisticsSlice = Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__["createSlice"])({
  name: 'issueStatistics',
  initialState: initialState,
  reducers: {
    resetState: () => initialState,
    setGridParams: (state, action) => {
      state.gridParams = action.payload;
    },
    setAllSettings: (state, action) => {
      state.settings = action.payload;
    },
    setGridData: (state, action) => {
      state.gridData = action.payload;
    },
    setChartData: (state, action) => {
      state.chart = action.payload;
    }
  }
});
const {
  actions,
  reducer
} = issueStatisticsSlice;
const {
  setGridParams,
  setAllSettings,
  setGridData,
  setChartData,
  resetState
} = actions;
/* harmony default export */ __webpack_exports__["default"] = (reducer);

/***/ })

}]);
//# sourceMappingURL=19.chunk.js.map