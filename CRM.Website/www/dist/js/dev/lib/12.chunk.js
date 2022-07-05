(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[12],{

/***/ "./www/sources/css/pages/report/log-statistics/index.scss":
/*!****************************************************************!*\
  !*** ./www/sources/css/pages/report/log-statistics/index.scss ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./www/sources/js/pages/report/log-statistics/actions.js":
/*!***************************************************************!*\
  !*** ./www/sources/js/pages/report/log-statistics/actions.js ***!
  \***************************************************************/
/*! exports provided: ActionCreators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionCreators", function() { return ActionCreators; });
/* harmony import */ var _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/common/dataService */ "./www/sources/js/common/dataService.js");
/* harmony import */ var _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/common/site */ "./www/sources/js/common/site.js");
/* harmony import */ var _logStatisticsSlice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./logStatisticsSlice */ "./www/sources/js/pages/report/log-statistics/logStatisticsSlice.js");




const getAllSettings = () => async dispatch => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('LogStatistics/GetAllSettings');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__["default"].getDataAsync(url).then(response => {
    dispatch(Object(_logStatisticsSlice__WEBPACK_IMPORTED_MODULE_2__["setAllSettings"])(response.data));
  }).catch(_jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].handleAxiosError);
};

const getMainReport = params => async dispatch => {
  _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].blockUI();
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('LogStatistics/GetMainReport');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__["default"].postDataAsync(url, params).then(response => {
    dispatch(Object(_logStatisticsSlice__WEBPACK_IMPORTED_MODULE_2__["setMainReport"])(response.data));
  }).catch(_jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].handleAxiosError).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].unblockUI());
};

const getReportDetails = params => async dispatch => {
  _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].blockUI();
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('LogStatistics/GetReportDetails');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__["default"].postDataAsync(url, params).then(response => {
    dispatch(Object(_logStatisticsSlice__WEBPACK_IMPORTED_MODULE_2__["setReportDetails"])(response.data));
  }).catch(_jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].handleAxiosError).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].unblockUI());
};

const exportExcel = params => async () => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('LogStatistics/ExportExcel');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__["default"].getFileAsync(url, params).then(response => {
    const fileName = response.headers['content-disposition'].split('filename=')[1].split(";")[0];
    _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].downloadFile(response.data, fileName);
  });
};

const exportExcelDetails = params => async () => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('LogStatistics/ExportExcelDetails');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__["default"].getFileAsync(url, params).then(response => {
    const fileName = response.headers['content-disposition'].split('filename=')[1].split(";")[0];
    _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].downloadFile(response.data, fileName);
  });
};

const ActionCreators = {
  getAllSettings,
  setGridParams: _logStatisticsSlice__WEBPACK_IMPORTED_MODULE_2__["setGridParams"],
  setAllSettings: _logStatisticsSlice__WEBPACK_IMPORTED_MODULE_2__["setAllSettings"],
  setGridParamDetails: _logStatisticsSlice__WEBPACK_IMPORTED_MODULE_2__["setGridParamDetails"],
  getMainReport,
  setMainReport: _logStatisticsSlice__WEBPACK_IMPORTED_MODULE_2__["setMainReport"],
  getReportDetails,
  setReportDetails: _logStatisticsSlice__WEBPACK_IMPORTED_MODULE_2__["setReportDetails"],
  setDetailsDataGrid: _logStatisticsSlice__WEBPACK_IMPORTED_MODULE_2__["setDetailsDataGrid"],
  setChartData: _logStatisticsSlice__WEBPACK_IMPORTED_MODULE_2__["setChartData"],
  exportExcel,
  exportExcelDetails,
  resetState: _logStatisticsSlice__WEBPACK_IMPORTED_MODULE_2__["resetState"]
};

/***/ }),

/***/ "./www/sources/js/pages/report/log-statistics/components/AppContainer.jsx":
/*!********************************************************************************!*\
  !*** ./www/sources/js/pages/report/log-statistics/components/AppContainer.jsx ***!
  \********************************************************************************/
/*! exports provided: AppContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppContainer", function() { return AppContainer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/report/log-statistics/actions.js");
/* harmony import */ var _Filter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Filter */ "./www/sources/js/pages/report/log-statistics/components/Filter.jsx");
/* harmony import */ var _DataGrid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DataGrid */ "./www/sources/js/pages/report/log-statistics/components/DataGrid.jsx");
/* harmony import */ var _Detail__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Detail */ "./www/sources/js/pages/report/log-statistics/components/Detail.jsx");
/* harmony import */ var _Chart__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Chart */ "./www/sources/js/pages/report/log-statistics/components/Chart.jsx");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









class AppContainer extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "handleCloseChartDialog", () => {
      this.props.setChartData({
        show: false,
        title: '',
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
      details,
      chart
    } = this.props;

    if (settings === null || !settings) {
      return null;
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Filter__WEBPACK_IMPORTED_MODULE_4__["default"], null), details.show ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Detail__WEBPACK_IMPORTED_MODULE_6__["default"], null) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DataGrid__WEBPACK_IMPORTED_MODULE_5__["default"], null), chart.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Chart__WEBPACK_IMPORTED_MODULE_7__["default"], {
      chart: chart,
      onClose: this.handleCloseChartDialog
    }));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    settings,
    details,
    chart
  } = state;
  return {
    settings,
    details,
    chart
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(AppContainer));

/***/ }),

/***/ "./www/sources/js/pages/report/log-statistics/components/Chart.jsx":
/*!*************************************************************************!*\
  !*** ./www/sources/js/pages/report/log-statistics/components/Chart.jsx ***!
  \*************************************************************************/
/*! exports provided: Chart, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Chart", function() { return Chart; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jsroot_common_colorColumnChart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/common/colorColumnChart */ "./www/sources/js/common/colorColumnChart.js");
/* harmony import */ var recharts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! recharts */ "./node_modules/recharts/es6/index.js");
/* harmony import */ var _jsroot_common_shareScripts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/common/shareScripts */ "./www/sources/js/common/shareScripts.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var _jsroot_components_DraggableModalDialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/components/DraggableModalDialog */ "./www/sources/js/components/DraggableModalDialog.jsx");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







class Chart extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "onCloseChart", () => {
      this.props.setChartData({
        show: false,
        title: '',
        data: ''
      });
    });

    _defineProperty(this, "getLabels", reports => {
      const labels = [];
      reports.mainCategories.forEach(report => {
        const index = labels.findIndex(label => label === report.name);

        if (index === -1) {
          labels.push(report.name);
        }
      });
      return labels;
    });

    _defineProperty(this, "renderChart", report => {
      const labels = this.getLabels(report);
      const data = report.communicationColumns.map((item, index) => {
        const obj = {
          name: item.name
        };
        report.mainCategories.map(category => {
          const listOfCommunicationSum = [];
          const communicationColumnCount = report.communicationColumns.length;
          const listOfCommunicationCount = category.listOfCommunicationCount;

          for (let i = 0; i < communicationColumnCount; i++) {
            listOfCommunicationSum[i] = 0;

            for (let j = i; j < listOfCommunicationCount.length; j = j + communicationColumnCount) {
              listOfCommunicationSum[i] += listOfCommunicationCount[j];
            }
          }

          obj[category.name] = listOfCommunicationSum[index] === 0 ? null : listOfCommunicationSum[index];
        });
        return obj;
      });
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Body, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(recharts__WEBPACK_IMPORTED_MODULE_2__["ResponsiveContainer"], {
        width: "100%",
        height: 800
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(recharts__WEBPACK_IMPORTED_MODULE_2__["BarChart"], {
        width: 993,
        data: data,
        margin: {
          top: 30,
          right: 30,
          left: 30,
          bottom: 20
        },
        barCategoryGap: 0,
        barGap: 0
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(recharts__WEBPACK_IMPORTED_MODULE_2__["CartesianGrid"], {
        strokeDasharray: "3 3"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(recharts__WEBPACK_IMPORTED_MODULE_2__["XAxis"], {
        dataKey: "name"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(recharts__WEBPACK_IMPORTED_MODULE_2__["YAxis"], {
        label: {
          value: 'Feedback(s)',
          position: 'top',
          dy: -10
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(recharts__WEBPACK_IMPORTED_MODULE_2__["Legend"], {
        wrapperStyle: {
          bottom: 5,
          left: 90,
          width: 993
        }
      }), labels.map((label, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(recharts__WEBPACK_IMPORTED_MODULE_2__["Bar"], {
        dataKey: label,
        key: index,
        label: {
          position: 'top'
        },
        fill: _jsroot_common_colorColumnChart__WEBPACK_IMPORTED_MODULE_1__["default"][index % 20]
      }))))));
    });
  }

  render() {
    const {
      title,
      data
    } = this.props.chart;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"], {
      show: true,
      className: "chart-modal-dialog",
      dialogAs: _jsroot_components_DraggableModalDialog__WEBPACK_IMPORTED_MODULE_5__["default"],
      backdrop: "static",
      keyboard: false,
      size: "xl",
      centered: true,
      onHide: () => this.props.onClose(false)
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Header, {
      closeButton: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Title, {
      as: "div"
    }, title)), this.renderChart(data));
  }

}
/* harmony default export */ __webpack_exports__["default"] = (Chart);

/***/ }),

/***/ "./www/sources/js/pages/report/log-statistics/components/ChildRow.jsx":
/*!****************************************************************************!*\
  !*** ./www/sources/js/pages/report/log-statistics/components/ChildRow.jsx ***!
  \****************************************************************************/
/*! exports provided: ChildRow, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChildRow", function() { return ChildRow; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/components/react-grid/index */ "./www/sources/js/components/react-grid/index.jsx");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



class ChildRow extends react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"] {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "renderChildRows", () => {
      const {
        isParent,
        currentRow,
        communicationColumns
      } = this.props;
      const cells = [];
      const listOfCommunicationSum = [];
      let grandTotal = 0;
      const communicationColumnCount = communicationColumns.length;
      const listOfCommunicationCount = currentRow.listOfCommunicationCount;

      for (let i = 0; i < communicationColumnCount; i++) {
        listOfCommunicationSum[i] = 0;

        for (let j = i; j < listOfCommunicationCount.length; j = j + communicationColumnCount) {
          listOfCommunicationSum[i] += listOfCommunicationCount[j];
        }

        grandTotal += listOfCommunicationSum[i];
        cells.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
          className: `text-center ${isParent ? 'parent-level-0' : 'child'}`
        }, listOfCommunicationSum[i]));
      }

      cells.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
        className: "text-center total-background"
      }, grandTotal));
      return cells;
    });
  }

  render() {
    return this.renderChildRows();
  }

}
/* harmony default export */ __webpack_exports__["default"] = (ChildRow);

/***/ }),

/***/ "./www/sources/js/pages/report/log-statistics/components/DataGrid.jsx":
/*!****************************************************************************!*\
  !*** ./www/sources/js/pages/report/log-statistics/components/DataGrid.jsx ***!
  \****************************************************************************/
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
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/report/log-statistics/actions.js");
/* harmony import */ var _jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/components/react-grid/index */ "./www/sources/js/components/react-grid/index.jsx");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/common/dateTimeService */ "./www/sources/js/common/dateTimeService.js");
/* harmony import */ var _ChildRow__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./ChildRow */ "./www/sources/js/pages/report/log-statistics/components/ChildRow.jsx");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }










class DataGrid extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "buildHeader", ibcReport => {
      const headers = [];
      headers.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderRow"], {
        key: "group-header"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        className: "sticky-header",
        rowSpan: 2,
        colWidth: 30
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('ComplaintsEnquiries')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colSpan: ibcReport.communicationColumns.length + 1
      }, ibcReport.productColumns.length === 1 ? ibcReport.productColumns[0].name : _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('AllProducts'))));
      const cellHeaderCommunication = this.renderHeaderCellsCommunications(ibcReport.communicationColumns);
      const headerRowsCommunication = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderRow"], {
        key: "header-communication"
      }, cellHeaderCommunication);
      headers.push(headerRowsCommunication);
      return headers;
    });

    _defineProperty(this, "renderHeaderCellsCommunications", communicationColumns => {
      const headerCells = [];
      communicationColumns.map(item => {
        headerCells.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
          colWidth: 12
        }, item.name));
      });
      headerCells.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 12
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Total')));
      return headerCells;
    });

    _defineProperty(this, "buildBody", (data, tableName) => {
      const rows = [];

      if (data.mainCategories.length > 0) {
        rows.push(data.mainCategories.map(item => this.renderMainCategoryRows(item, data.communicationColumns, tableName)));
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

    _defineProperty(this, "getToggleRows", tableName => tableName === 'mbc' ? this.state.toggleRowDaily : this.state.toggleRowLicensee);

    _defineProperty(this, "handleToggleRow", (id, tableName) => {
      const toggleName = this.getToggleRows(tableName);
      const index = toggleName.indexOf(id);

      if (index >= 0) {
        toggleName.splice(index, 1);
      } else {
        toggleName.push(id);
      }

      this.setState({
        toggleName
      });
    });

    _defineProperty(this, "renderMainCategoryRows", (item, communicationColumns, tableName) => {
      const rows = [];
      const cells = [];
      const toggles = this.getToggleRows(tableName);
      cells.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
        className: "complaints-text"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: `expand-icon fa pr-2 ${!toggles.includes(item.id) ? 'fa-caret-down' : 'fa-caret-right'}`
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, item.name)));
      cells.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ChildRow__WEBPACK_IMPORTED_MODULE_8__["default"], {
        isParent: true,
        currentRow: item,
        communicationColumns: communicationColumns
      }));
      rows.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Row"], {
        key: `parent-${item.id}`,
        className: "parent-level-0",
        onClick: () => this.handleToggleRow(item.id, tableName)
      }, cells));

      if (item.subCategories.length > 0) {
        rows.push(item.subCategories.map(sub => this.renderSubCategoryRows(item.id, sub, communicationColumns, tableName)));
      }

      return rows;
    });

    _defineProperty(this, "renderSubCategoryRows", (parentId, sub, communicationColumns, tableName) => {
      const toggle = this.getToggleRows(tableName);

      if (!toggle.includes(parentId)) {
        const cells = [];
        cells.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
          className: "child"
        }, sub.name));
        cells.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ChildRow__WEBPACK_IMPORTED_MODULE_8__["default"], {
          currentRow: sub,
          communicationColumns: communicationColumns
        }));
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Row"], {
          key: `child-${sub.id}`
        }, cells);
      } else {
        return null;
      }
    });

    _defineProperty(this, "renderFooter", data => {
      const cells = [];
      const grandTotal = {
        listOfCommunicationCount: data.grandTotalOfCommunicationCount,
        listOfCommunicationSumByProduct: data.grandTotalOfCommunicationSumByProduct
      };
      cells.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], null, "Grand Total"));
      cells.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ChildRow__WEBPACK_IMPORTED_MODULE_8__["default"], {
        currentRow: grandTotal,
        communicationColumns: data.communicationColumns
      }));
      return [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Row"], {
        key: "footer",
        className: "footer-container font-weight-bold"
      }, cells)];
    });

    _defineProperty(this, "getTitle", tableName => {
      const {
        gridParams
      } = this.props;
      const fromDateFormat = _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_7__["default"].toShortDateFormat(gridParams.fromDate);
      const toFormat = _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_7__["default"].toShortDateFormat(gridParams.toDate);
      const title = tableName === 'mbc' ? `MBC Daily Log Statistics | ${fromDateFormat} - ${toFormat}` : `Licensee Daily Log Statistics | ${fromDateFormat} - ${toFormat}`;
      return title;
    });

    _defineProperty(this, "getTitleDetail", tableName => {
      const {
        gridParams
      } = this.props;
      const fromDateFormat = _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_7__["default"].toShortDateFormat(gridParams.fromDate);
      const toFormat = _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_7__["default"].toShortDateFormat(gridParams.toDate);
      const title = tableName === 'mbc' ? `MBC Daily Customer Complaints/Enquiries From ${fromDateFormat} To ${toFormat}` : `Licensee Daily Customer Complaints/Enquiries From ${fromDateFormat} To ${toFormat}`;
      return title;
    });

    _defineProperty(this, "handleShowDetails", tableName => {
      const siteType = tableName === 'mbc' ? 0 : 1;
      const title = this.getTitleDetail(tableName);

      const params = _objectSpread(_objectSpread({}, this.props.gridParams), {}, {
        siteType: siteType,
        pageIndex: 1,
        pageSize: 100
      });

      this.props.setDetailsDataGrid({
        show: true,
        title: title
      });
      this.props.setGridParamDetails(params);
      this.props.getReportDetails(params);
    });

    _defineProperty(this, "handleExportExcel", tableName => {
      const siteType = tableName === 'mbc' ? 0 : 1;

      const params = _objectSpread(_objectSpread({}, this.props.gridParams), {
        siteType: siteType
      });

      this.props.exportExcel(params);
    });

    _defineProperty(this, "handleViewChart", tableName => {
      const data = tableName === 'mbc' ? this.props.mainReports.ibcReport : this.props.mainReports.licenseeReport;
      const title = this.getTitle(tableName);
      this.props.setChartData({
        show: true,
        title: title,
        data: data
      });
    });

    _defineProperty(this, "handleCollapseExpandLicensee", () => {
      const {
        toggleRowLicensee,
        isCollapseLicensee
      } = this.state;

      if (!isCollapseLicensee) {
        this.props.mainReports.ibcReport.mainCategories.forEach(main => {
          if (toggleRowLicensee.indexOf(main) < 0) {
            toggleRowLicensee.push(main.id);
          }
        });
        this.setState(prevState => ({
          toggleRowLicensee,
          isCollapseLicensee: !prevState.isCollapseLicensee
        }));
      } else {
        this.setState(prevState => ({
          toggleRowLicensee: [],
          isCollapseLicensee: !prevState.isCollapseLicensee
        }));
      }
    });

    _defineProperty(this, "handleCollapseExpandDaily", () => {
      const {
        toggleRowDaily,
        isCollapseDaily
      } = this.state;

      if (!isCollapseDaily) {
        this.props.mainReports.ibcReport.mainCategories.forEach(main => {
          if (toggleRowDaily.indexOf(main) < 0) {
            toggleRowDaily.push(main.id);
          }
        });
        this.setState(prevState => ({
          toggleRowDaily,
          isCollapseDaily: !prevState.isCollapseDaily
        }));
      } else {
        this.setState(prevState => ({
          toggleRowDaily: [],
          isCollapseDaily: !prevState.isCollapseDaily
        }));
      }
    });

    _defineProperty(this, "renderCustomButtonLicensee", () => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["OverlayTrigger"], {
        placement: "auto",
        overlay: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Tooltip"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "View Chart"))
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "pl-3 fa fa-bar-chart icon",
        onClick: () => this.handleViewChart('licensee')
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["OverlayTrigger"], {
        placement: "auto",
        overlay: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Tooltip"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Show Details"))
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "pl-3 fa fa-info-circle icon fa-lg",
        onClick: () => this.handleShowDetails('licensee')
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["OverlayTrigger"], {
        placement: "auto",
        overlay: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Tooltip"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Collapse/Expand"))
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "pl-3 fa fa-expand icon",
        onClick: this.handleCollapseExpandLicensee
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["OverlayTrigger"], {
        placement: "auto",
        overlay: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Tooltip"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Export to Excel"))
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "pl-3 fa fa-file-excel-o icon-excel",
        onClick: () => this.handleExportExcel('licensee')
      })));
    });

    _defineProperty(this, "renderCustomButtonDailyLog", () => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["OverlayTrigger"], {
        overlay: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Tooltip"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "View Chart")),
        placement: "auto"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "fa fa-bar-chart icon pl-3",
        onClick: () => this.handleViewChart('mbc')
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["OverlayTrigger"], {
        overlay: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Tooltip"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Show Details")),
        placement: "auto"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "fa fa-info-circle icon pl-3 fa-lg",
        onClick: () => this.handleShowDetails('mbc')
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["OverlayTrigger"], {
        overlay: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Tooltip"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Collapse/Expand")),
        placement: "auto"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "fa fa-expand icon pl-3",
        onClick: this.handleCollapseExpandDaily
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["OverlayTrigger"], {
        overlay: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Tooltip"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Export to Excel")),
        placement: "auto"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "fa fa-file-excel-o icon-excel pl-3",
        onClick: () => this.handleExportExcel('mbc')
      })));
    });

    _defineProperty(this, "renderTitle", (gridData, fromDateFormat, toFormat) => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "table-title d-flex justify-content-between align-items-center"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, `MBC Daily Log Statistics | ${fromDateFormat}-${toFormat}`), gridData.length > 0 && this.renderCustomButtonDailyLog());
    });

    _defineProperty(this, "renderTitleLicensee", (licenseeReport, fromDateFormat, toFormat) => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "table-title d-flex justify-content-between align-items-center"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, `Licensee Daily Log Statistics | ${fromDateFormat}-${toFormat}`), licenseeReport.length > 0 && this.renderCustomButtonLicensee());
    });

    _defineProperty(this, "renderDailyLogStatistic", (fromDateFormat, toFormat) => {
      const {
        ibcReport
      } = this.props.mainReports;
      const defaultWidth = 400;
      const totalWidth = defaultWidth + ibcReport.communicationColumns.length * 115;
      const maxWidth = this.getMaxWidth(totalWidth);
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "table-mbc"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Table"], {
        maxWidth: maxWidth,
        shouldUseMaxWidth: true,
        width: totalWidth,
        autoWidth: false,
        title: this.renderTitle(ibcReport.mainCategories, fromDateFormat, toFormat),
        header: this.buildHeader(ibcReport),
        body: this.buildBody(ibcReport, 'mbc'),
        footer: this.renderFooter(ibcReport),
        isFixColumn: true,
        containerPadding: 0,
        adjustedHeight: 10,
        shouldResetScrollPosition: this.state.shouldResetScrollPosition
      }));
    });

    _defineProperty(this, "getMaxWidth", totalWidth => document.getElementById('app-container').clientWidth < totalWidth ? document.getElementById('app-container').clientWidth : totalWidth);

    _defineProperty(this, "renderLicenseeDailyStatistic", (fromDateFormat, toFormat) => {
      const {
        licenseeReport
      } = this.props.mainReports;
      const defaultWidth = 400;
      const totalWidth = defaultWidth + licenseeReport.communicationColumns.length * 115;
      const maxWidth = this.getMaxWidth(totalWidth);
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "table-licensee"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Table"], {
        maxWidth: maxWidth,
        shouldUseMaxWidth: true,
        width: totalWidth,
        autoWidth: false,
        title: this.renderTitleLicensee(licenseeReport.mainCategories, fromDateFormat, toFormat),
        header: this.buildHeader(licenseeReport),
        body: this.buildBody(licenseeReport, 'licensee'),
        footer: this.renderFooter(licenseeReport),
        isFixColumn: true,
        containerPadding: 0,
        adjustedHeight: 10,
        shouldResetScrollPosition: this.state.shouldResetScrollPosition
      }));
    });

    this.state = {
      shouldResetScrollPosition: true,
      toggleRowDaily: [],
      toggleRowLicensee: [],
      isCollapseDaily: false,
      isCollapseLicensee: false,
      widthTotalColumns: 0
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.mainReports !== nextProps.mainReports) {
      nextState.shouldResetScrollPosition = true;
      nextState.toggleRowDaily = [];
    }

    if (this.state.toggleRowDaily.length > 0 || this.state.toggleRowLicensee.length > 0) {
      nextState.shouldResetScrollPosition = false;
    }

    return true;
  }

  render() {
    const {
      mainReports,
      gridParams
    } = this.props;

    if (mainReports === null) {
      return null;
    }

    const fromDateFormat = _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_7__["default"].toShortDateFormat(gridParams.fromDate);
    const toFormat = _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_7__["default"].toShortDateFormat(gridParams.toDate);
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, this.renderDailyLogStatistic(fromDateFormat, toFormat), this.renderLicenseeDailyStatistic(fromDateFormat, toFormat));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_4__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    gridParams,
    mainReports
  } = state;
  return {
    gridParams,
    mainReports
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(DataGrid));

/***/ }),

/***/ "./www/sources/js/pages/report/log-statistics/components/Detail.jsx":
/*!**************************************************************************!*\
  !*** ./www/sources/js/pages/report/log-statistics/components/Detail.jsx ***!
  \**************************************************************************/
/*! exports provided: Detail, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Detail", function() { return Detail; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/report/log-statistics/actions.js");
/* harmony import */ var _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/common/dateTimeService */ "./www/sources/js/common/dateTimeService.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var _jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/components/react-grid/index */ "./www/sources/js/components/react-grid/index.jsx");
/* harmony import */ var _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jsroot/common/constants */ "./www/sources/js/common/constants.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }










class Detail extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "buildHeader", () => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["HeaderRow"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["HeaderCell"], {
        colWidth: 12
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('Date')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["HeaderCell"], {
        colWidth: 10
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('StartTime')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["HeaderCell"], {
        colWidth: 10
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('EndTime')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["HeaderCell"], {
        colWidth: 10
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('Duration')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["HeaderCell"], {
        colWidth: 15
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('Customer')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["HeaderCell"], {
        colWidth: 12
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('Site')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["HeaderCell"], {
        colWidth: 15
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('TypeOfContact')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["HeaderCell"], {
        colWidth: 10
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('EXT')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["HeaderCell"], {
        colWidth: 10
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('Role')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["HeaderCell"], {
        colWidth: 20
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('ContactInfo')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["HeaderCell"], {
        colWidth: 20
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('Product')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["HeaderCell"], {
        colWidth: 20
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('SubProduct')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["HeaderCell"], {
        colWidth: 12
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('Country')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["HeaderCell"], {
        colWidth: 20
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('Category')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["HeaderCell"], {
        colWidth: 20
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('SubCategory')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["HeaderCell"], {
        colWidth: 30
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('ComplaintsEnquiries')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["HeaderCell"], {
        colWidth: 30
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('Solution')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["HeaderCell"], {
        colWidth: 10
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('NoOfInquiries')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["HeaderCell"], {
        colWidth: 10
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('Status')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["HeaderCell"], {
        colWidth: 10
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('Language')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["HeaderCell"], {
        colWidth: 10
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('Response')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["HeaderCell"], {
        colWidth: 12
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('HandleBy')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["HeaderCell"], {
        colWidth: 12
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('CreationTime')));
    });

    _defineProperty(this, "buildBody", () => {
      const {
        reportDetails
      } = this.props;

      if (reportDetails.report.length > 0) {
        return reportDetails.report.map((item, index) => this.renderRow(item, index));
      }

      return [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["Row"], {
        key: "body-nodata",
        className: "no-data"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["Cell"], {
        className: "text-center",
        colSpan: 15
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('ThereIsNoData')))];
    });

    _defineProperty(this, "getActiveSettingsName", (settings, settingId, isValueProperty, isMainCategory) => {
      const filterSettingActive = isMainCategory ? settings.filter(x => x.isActive && x.mainCategoryID === settingId) : settings.filter(x => x.isActive && x.id === settingId);
      const settingDistinct = filterSettingActive.map(item => isValueProperty ? item.value : item.name).filter((value, index, self) => self.indexOf(value) === index);
      const nameSetting = settingDistinct.length > 0 ? settingDistinct[0] : 'N/A';
      return nameSetting === 'N/A.' ? 'N/A' : nameSetting;
    });

    _defineProperty(this, "getSubCategoryValue", (mainCategoryId, subCategoryId, mainCategories) => {
      const mainCategoriesFilter = mainCategories.filter(x => x.mainCategoryID === mainCategoryId);

      if (mainCategoriesFilter.length > 0) {
        const subCategory = mainCategoriesFilter[0].childSettings.filter(x => x.subCategoryId === subCategoryId)[0].name;
        return subCategory;
      } else {
        return 'N/A';
      }
    });

    _defineProperty(this, "renderRow", (item, index) => {
      const {
        mainCategories,
        communicationTools,
        products,
        subProducts,
        extensions
      } = this.props.reportDetails;
      const mainCategoryValue = this.getActiveSettingsName(mainCategories, parseInt(item.categoryID, 10), false, true);
      const communicationValue = this.getActiveSettingsName(communicationTools, parseInt(item.communicationID, 10));
      const productValue = this.getActiveSettingsName(products, parseInt(item.productID, 10), true);
      const subProductValue = this.getActiveSettingsName(subProducts, parseInt(item.subProductID, 10), true);
      const stationValue = this.getActiveSettingsName(extensions, parseInt(item.stationID, 10), true);
      const subCategoryValue = this.getSubCategoryValue(parseInt(item.categoryID, 10), parseInt(item.subCategoryID, 10), mainCategories);
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["Row"], {
        key: `${item.feedbackId}-${index}`
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["Cell"], {
        className: "text-center"
      }, _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_5__["default"].toShortDateFormat(item.feedbackDate)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["Cell"], {
        className: "text-center"
      }, item.startTime), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["Cell"], {
        className: "text-center"
      }, item.endTime), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["Cell"], {
        className: "text-center"
      }, item.durationTime), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["Cell"], {
        className: "text-center"
      }, item.userName), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["Cell"], {
        className: "text-center"
      }, item.siteName), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["Cell"], {
        className: "text-center"
      }, communicationValue), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["Cell"], {
        className: "text-center"
      }, stationValue), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["Cell"], {
        className: "text-center"
      }, item.role), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["Cell"], {
        className: "break-word",
        dangerouslySetInnerHTML: {
          __html: item.contact
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["Cell"], {
        className: "text-center"
      }, productValue), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["Cell"], {
        className: "text-center"
      }, subProductValue), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["Cell"], {
        className: "text-center"
      }, item.countryName), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["Cell"], {
        className: "text-center"
      }, mainCategoryValue), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["Cell"], {
        className: "text-center"
      }, subCategoryValue), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["Cell"], {
        className: "break-word",
        dangerouslySetInnerHTML: {
          __html: item.remarkText
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["Cell"], {
        className: "break-word",
        dangerouslySetInnerHTML: {
          __html: item.solution
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["Cell"], {
        className: "text-center"
      }, item.noInquiries), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["Cell"], {
        className: "text-center"
      }, item.status), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["Cell"], {
        className: "text-center"
      }, item.language), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["Cell"], {
        className: "text-center"
      }, item.response), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["Cell"], {
        className: "text-center"
      }, item.creatorName), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["Cell"], {
        className: "text-center"
      }, item.createDate));
    });

    _defineProperty(this, "handleExportExcel", () => {
      const params = this.props.gridParamDetails;
      this.props.exportExcelDetails(params);
    });

    _defineProperty(this, "handleGoBack", () => {
      this.props.setDetailsDataGrid({
        show: false,
        title: ''
      });
    });

    _defineProperty(this, "onPaging", (pageIndex, pageSize) => {
      const params = _objectSpread({}, this.props.gridParamDetails);

      params['pageIndex'] = pageIndex;
      params['pageSize'] = pageSize;
      this.props.getReportDetails(params);
      this.props.setGridParamDetails(params);
    });
  }

  render() {
    const {
      details,
      gridParamDetails,
      reportDetails
    } = this.props;

    if (reportDetails === null || !reportDetails) {
      return null;
    }

    const pagingOption = {
      PageIndex: gridParamDetails.pageIndex,
      PageSize: gridParamDetails.pageSize,
      TotalItem: reportDetails.totalRows,
      PageList: _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_8__["PAGING_SIZES"]
    };
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "details"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "table-title d-flex justify-content-between align-items-center"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, details.title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["OverlayTrigger"], {
      overlay: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Tooltip"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Go Back")),
      placement: "auto"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "fa fa-arrow-circle-left icon pl-3 fa-lg",
      onClick: () => this.handleGoBack()
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["OverlayTrigger"], {
      overlay: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Tooltip"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Export to Excel")),
      placement: "auto"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "fa fa-file-excel-o icon-excel pl-3",
      onClick: this.handleExportExcel
    })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["Table"], {
      maxWidth: 3355,
      shouldUseMaxWidth: true,
      autoWidth: false,
      isFixColumn: true,
      isPaging: true,
      pageOption: pagingOption,
      onPaging: this.onPaging,
      header: this.buildHeader(),
      body: this.buildBody(),
      containerPadding: 10,
      shouldResetScrollPosition: false
    }));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_4__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    gridParamDetails,
    reportDetails,
    details
  } = state;
  return {
    gridParamDetails,
    reportDetails,
    details
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(Detail));

/***/ }),

/***/ "./www/sources/js/pages/report/log-statistics/components/Filter.jsx":
/*!**************************************************************************!*\
  !*** ./www/sources/js/pages/report/log-statistics/components/Filter.jsx ***!
  \**************************************************************************/
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
/* harmony import */ var _jsroot_components_multiple_select_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/components/multiple-select/index */ "./www/sources/js/components/multiple-select/index.jsx");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/report/log-statistics/actions.js");
/* harmony import */ var _jsroot_components_date_picker_index__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/components/date-picker/index */ "./www/sources/js/components/date-picker/index.jsx");
/* harmony import */ var _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/common/dateTimeService */ "./www/sources/js/common/dateTimeService.js");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/lib/index.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_toastify__WEBPACK_IMPORTED_MODULE_10__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }












class Filter extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleChangeToDate", toDate => {
      this.setState({
        toDate
      });
    });

    _defineProperty(this, "handleChangeFromDate", fromDate => {
      const currentClientTime = window.currentClientTime;
      const currentTime = new Date(_jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_7__["default"].toShortDateTimeFormat(new Date(currentClientTime)));
      const fromDateTime = new Date(fromDate.getTime());
      fromDateTime.setMonth(fromDate.getMonth() + 3);
      fromDateTime.setDate(fromDate.getDate() - 1);
      this.maxToDate = fromDateTime < currentTime ? fromDateTime : currentTime;
      this.minToDate = fromDate;
      this.setState({
        toDate: this.maxToDate,
        fromDate
      });
    });

    _defineProperty(this, "handleChangeDropdown", (name, selectedKey) => {
      this.setState(_objectSpread(_objectSpread({}, this.state), {}, {
        [name]: selectedKey
      }));
    });

    _defineProperty(this, "handleSettingOptions", settings => {
      const {
        products,
        mainCategories,
        communicationTools
      } = settings;
      const productIdFilters = [];
      const mainCategoryIdFilters = [];
      const communicationIdFilters = [];
      const productOptions = products.map(item => {
        productIdFilters.push(item.id);
        return {
          id: item.id,
          value: item.value,
          checked: true
        };
      });
      const mainCategoryOptions = mainCategories.map(item => {
        mainCategoryIdFilters.push(item.mainCategoryID);
        return {
          id: item.mainCategoryID,
          value: item.name,
          checked: true
        };
      });
      const communicationToolOptions = communicationTools.map(item => {
        communicationIdFilters.push(item.id);
        return {
          id: item.id,
          value: item.name,
          checked: true
        };
      });
      const productIdFiltersJoin = productIdFilters.join(',');
      const mainCategoryIdFiltersJoin = mainCategoryIdFilters.join(',');
      const communicationIdFiltersJoin = communicationIdFilters.join(',');
      this.setState({
        productOptions,
        mainCategoryOptions,
        communicationToolOptions,
        productIds: productIdFiltersJoin,
        mainCategoryIds: mainCategoryIdFiltersJoin,
        communicationIds: communicationIdFiltersJoin
      });
    });

    _defineProperty(this, "handleSubmit", () => {
      const {
        fromDate,
        toDate,
        productIds,
        mainCategoryIds,
        communicationIds
      } = this.state;

      if (productIds === '') {
        react_toastify__WEBPACK_IMPORTED_MODULE_10__["toast"].error(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].formatString(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('FieldRequired'), _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('Product')));
        return;
      }

      if (mainCategoryIds === '') {
        react_toastify__WEBPACK_IMPORTED_MODULE_10__["toast"].error(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].formatString(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('FieldRequired'), _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('MainCategory')));
        return;
      }

      if (communicationIds === '') {
        react_toastify__WEBPACK_IMPORTED_MODULE_10__["toast"].error(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].formatString(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('FieldRequired'), _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('Communication')));
        return;
      }

      const params = {
        fromDate: _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_7__["default"].toShortDateFormat(fromDate),
        toDate: _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_7__["default"].toShortDateFormat(toDate),
        productId: productIds,
        mainCategoryId: mainCategoryIds,
        communicationId: communicationIds
      };
      this.props.setDetailsDataGrid({
        show: false
      });
      this.props.setGridParams(params);
      this.props.getMainReport(params);
    });

    const _currentClientTime = window.currentClientTime;
    this.currentDate = new Date(_jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_7__["default"].toShortDateTimeFormat(new Date(_currentClientTime)));
    const firstDayOfWeek = moment__WEBPACK_IMPORTED_MODULE_9___default()(this.currentDate).startOf('week');
    const firstDayOfWeekFormat = new Date(_jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_7__["default"].toShortDateTimeFormat(new Date(firstDayOfWeek)));
    this.maxFromDate = this.currentDate;
    this.maxToDate = this.currentDate;
    this.minToDate = firstDayOfWeekFormat;
    this.state = {
      fromDate: firstDayOfWeekFormat,
      toDate: this.currentDate,
      productOptions: [],
      mainCategoryOptions: [],
      communicationToolOptions: [],
      productIds: '',
      mainCategoryIds: '',
      communicationIds: ''
    };
  }

  componentDidMount() {
    this.handleSettingOptions(this.props.settings);
  }

  render() {
    const {
      fromDate,
      toDate,
      productOptions,
      mainCategoryOptions,
      communicationToolOptions
    } = this.state;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"], {
      className: "form-filter",
      onSubmit: this.handleSubmit
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Row, {
      bsPrefix: "form-row"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, {
      className: "form-width"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
      htmlFor: "productIds"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('Product')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "form-control-wrapper"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_multiple_select_index__WEBPACK_IMPORTED_MODULE_4__["default"], {
      valueField: "value",
      dataSource: productOptions,
      keyField: "id",
      onChange: (currentItem, selectedItemsKey) => {
        this.handleChangeDropdown('productIds', selectedItemsKey);
      },
      maxDisplayItemCount: 0,
      hasSearchBox: true,
      isNAOption: true
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
      htmlFor: "fromDate"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('FromDate')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "react-datepicker-wrapper-container"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_date_picker_index__WEBPACK_IMPORTED_MODULE_6__["default"], {
      maxDate: new Date(this.maxFromDate),
      selected: fromDate,
      peekNextMonth: true,
      useShortMonthInDropdown: true,
      showMonthDropdown: true,
      showYearDropdown: true,
      dropdownMode: "select",
      onChange: value => this.handleChangeFromDate(value)
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
      className: "label-width"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('ToDate')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "react-datepicker-wrapper-container"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_date_picker_index__WEBPACK_IMPORTED_MODULE_6__["default"], {
      maxDate: new Date(this.maxToDate),
      minDate: new Date(this.minToDate),
      peekNextMonth: true,
      useShortMonthInDropdown: true,
      showMonthDropdown: true,
      showYearDropdown: true,
      dropdownMode: "select",
      selected: toDate,
      onChange: value => this.handleChangeToDate(value)
    })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Row, {
      bsPrefix: "form-row"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, {
      className: "form-width"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
      htmlFor: "mainCategoryIds"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('MainCategory')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "form-control-wrapper mainCategory-width"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_multiple_select_index__WEBPACK_IMPORTED_MODULE_4__["default"], {
      valueField: "value",
      dataSource: mainCategoryOptions,
      keyField: "id",
      maxDisplayItemCount: 0,
      onChange: (currentItem, selectedItemsKey) => {
        this.handleChangeDropdown('mainCategoryIds', selectedItemsKey);
      },
      hasSearchBox: true,
      isNAOption: true
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
      className: "label-width",
      htmlFor: "communicationId"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('CommunicationType')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "form-control-wrapper"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_multiple_select_index__WEBPACK_IMPORTED_MODULE_4__["default"], {
      valueField: "value",
      dataSource: communicationToolOptions,
      keyField: "id",
      maxDisplayItemCount: 0,
      onChange: (currentItem, selectedItemsKey) => {
        this.handleChangeDropdown('communicationIds', selectedItemsKey);
      },
      hasSearchBox: true,
      isNAOption: true
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, {
      className: "submit"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], {
      variant: "primary",
      size: "sm",
      onClick: this.handleSubmit
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('Submit')))));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_5__["ActionCreators"], dispatch);

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

/***/ "./www/sources/js/pages/report/log-statistics/index.js":
/*!*************************************************************!*\
  !*** ./www/sources/js/pages/report/log-statistics/index.js ***!
  \*************************************************************/
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
/* harmony import */ var _jsroot_components_layout_container_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/components/layout-container/index */ "./www/sources/js/components/layout-container/index.js");
/* harmony import */ var _logStatisticsSlice__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./logStatisticsSlice */ "./www/sources/js/pages/report/log-statistics/logStatisticsSlice.js");
/* harmony import */ var _components_AppContainer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/AppContainer */ "./www/sources/js/pages/report/log-statistics/components/AppContainer.jsx");
/* harmony import */ var _cssroot_pages_report_log_statistics_index_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @cssroot/pages/report/log-statistics/index.scss */ "./www/sources/css/pages/report/log-statistics/index.scss");
/* harmony import */ var _cssroot_pages_report_log_statistics_index_scss__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_cssroot_pages_report_log_statistics_index_scss__WEBPACK_IMPORTED_MODULE_7__);







const store = Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_3__["configureStore"])({
  reducer: _logStatisticsSlice__WEBPACK_IMPORTED_MODULE_5__["default"]
});

class index extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_2__["Provider"], {
      store: store
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "log-statistics"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_AppContainer__WEBPACK_IMPORTED_MODULE_6__["default"], null)));
  }

}

/***/ }),

/***/ "./www/sources/js/pages/report/log-statistics/logStatisticsSlice.js":
/*!**************************************************************************!*\
  !*** ./www/sources/js/pages/report/log-statistics/logStatisticsSlice.js ***!
  \**************************************************************************/
/*! exports provided: setGridParams, setGridParamDetails, setAllSettings, setMainReport, setReportDetails, setDetailsDataGrid, setChartData, resetState, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setGridParams", function() { return setGridParams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setGridParamDetails", function() { return setGridParamDetails; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setAllSettings", function() { return setAllSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setMainReport", function() { return setMainReport; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setReportDetails", function() { return setReportDetails; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setDetailsDataGrid", function() { return setDetailsDataGrid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setChartData", function() { return setChartData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetState", function() { return resetState; });
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @reduxjs/toolkit */ "./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");

const initialState = {
  settings: null,
  gridParams: null,
  gridParamDetails: {
    pageIndex: 1,
    pageSize: 100
  },
  mainReports: null,
  reportDetails: null,
  details: {
    show: false,
    title: ''
  },
  chart: {
    show: false,
    title: '',
    data: null
  }
};
const logStatisticsSlice = Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__["createSlice"])({
  name: 'logStatistics',
  initialState: initialState,
  reducers: {
    resetState: () => initialState,
    setGridParams: (state, action) => {
      state.gridParams = action.payload;
    },
    setAllSettings: (state, action) => {
      state.settings = action.payload;
    },
    setMainReport: (state, action) => {
      state.mainReports = action.payload;
    },
    setGridParamDetails: (state, action) => {
      state.gridParamDetails = action.payload;
    },
    setReportDetails: (state, action) => {
      state.reportDetails = action.payload;
    },
    setDetailsDataGrid: (state, action) => {
      state.details = action.payload;
    },
    setChartData: (state, action) => {
      state.chart = action.payload;
    }
  }
});
const {
  actions,
  reducer
} = logStatisticsSlice;
const {
  setGridParams,
  setGridParamDetails,
  setAllSettings,
  setMainReport,
  setReportDetails,
  setDetailsDataGrid,
  setChartData,
  resetState
} = actions;
/* harmony default export */ __webpack_exports__["default"] = (reducer);

/***/ })

}]);
//# sourceMappingURL=12.chunk.js.map