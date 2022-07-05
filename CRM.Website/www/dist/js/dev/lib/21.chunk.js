(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[21],{

/***/ "./www/sources/css/pages/report/settlement/index.scss":
/*!************************************************************!*\
  !*** ./www/sources/css/pages/report/settlement/index.scss ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./www/sources/js/pages/report/settlement/actions.js":
/*!***********************************************************!*\
  !*** ./www/sources/js/pages/report/settlement/actions.js ***!
  \***********************************************************/
/*! exports provided: ActionCreators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionCreators", function() { return ActionCreators; });
/* harmony import */ var _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/common/site */ "./www/sources/js/common/site.js");
/* harmony import */ var _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/common/dataService */ "./www/sources/js/common/dataService.js");
/* harmony import */ var _settlementReportSlice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./settlementReportSlice */ "./www/sources/js/pages/report/settlement/settlementReportSlice.js");




const getGridData = params => async dispatch => {
  _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].blockUI();
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl('Report/Settlement/GetSettlementReport');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__["default"].postDataAsync(url, params).then(response => {
    dispatch(Object(_settlementReportSlice__WEBPACK_IMPORTED_MODULE_2__["setGridData"])(response.data));
  }).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].unblockUI());
};

const exportExcel = params => async () => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl('Report/Settlement/ExportSettlementReport');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__["default"].getFileAsync(url, params).then(response => {
    const fileName = response.headers['content-disposition'].split('filename=')[1].split(";")[0];
    _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].downloadFile(response.data, fileName);
  });
};

const ActionCreators = {
  resetState: _settlementReportSlice__WEBPACK_IMPORTED_MODULE_2__["resetState"],
  setGridParams: _settlementReportSlice__WEBPACK_IMPORTED_MODULE_2__["setGridParams"],
  setGridData: _settlementReportSlice__WEBPACK_IMPORTED_MODULE_2__["setGridData"],
  setChartPopup: _settlementReportSlice__WEBPACK_IMPORTED_MODULE_2__["setChartPopup"],
  getGridData,
  exportExcel
};

/***/ }),

/***/ "./www/sources/js/pages/report/settlement/components/AppContainer.jsx":
/*!****************************************************************************!*\
  !*** ./www/sources/js/pages/report/settlement/components/AppContainer.jsx ***!
  \****************************************************************************/
/*! exports provided: AppContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppContainer", function() { return AppContainer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Chart__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Chart */ "./www/sources/js/pages/report/settlement/components/Chart.jsx");
/* harmony import */ var _DataGrid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DataGrid */ "./www/sources/js/pages/report/settlement/components/DataGrid.jsx");
/* harmony import */ var _Filter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Filter */ "./www/sources/js/pages/report/settlement/components/Filter.jsx");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/report/settlement/actions.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









class AppContainer extends react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"] {
  componentWillUnmount() {
    this.props.resetState();
  }

  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Filter__WEBPACK_IMPORTED_MODULE_5__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DataGrid__WEBPACK_IMPORTED_MODULE_4__["default"], null), this.props.contentChartPopup.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Chart__WEBPACK_IMPORTED_MODULE_3__["default"], null));
  }

}

_defineProperty(AppContainer, "propTypes", {
  contentChartPopup: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.shape({
    show: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool
  }).isRequired
});

_defineProperty(AppContainer, "defaultProps", {
  contentChartPopup: {
    show: false
  }
});

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_6__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_7__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    contentChartPopup
  } = state;
  return {
    contentChartPopup
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(AppContainer));

/***/ }),

/***/ "./www/sources/js/pages/report/settlement/components/Chart.jsx":
/*!*********************************************************************!*\
  !*** ./www/sources/js/pages/report/settlement/components/Chart.jsx ***!
  \*********************************************************************/
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
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/report/settlement/actions.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









class Chart extends react__WEBPACK_IMPORTED_MODULE_2__["PureComponent"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "convertDataChart", reports => {
      const data = reports.map(item => {
        const obj = {
          name: item.name
        };
        item.childReports.map(report => {
          if (obj[report.name]) {
            obj[report.name] += report.numberOfIssues;
          } else {
            obj[report.name] = report.numberOfIssues;
          }
        });
        return obj;
      });
      return data;
    });

    _defineProperty(this, "getLabels", reports => {
      const labels = [];
      reports.forEach(report => {
        report.childReports.forEach(item => {
          const index = labels.findIndex(label => label === item.name);

          if (index === -1) {
            labels.push(item.name);
          }
        });
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
      chartInfo
    } = this.props.gridData;
    const data = this.convertDataChart(chartInfo.childReports);
    const labels = this.getLabels(chartInfo.childReports);
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Modal"], {
      show: true,
      dialogAs: _jsroot_components_DraggableModalDialog__WEBPACK_IMPORTED_MODULE_1__["default"],
      backdrop: "static",
      keyboard: false,
      size: "xl",
      onHide: this.onCloseChart
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Modal"].Header, {
      closeButton: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Modal"].Title, {
      as: "div"
    }, chartInfo.name)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Modal"].Body, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(recharts__WEBPACK_IMPORTED_MODULE_5__["BarChart"], {
      width: 1000,
      height: 750,
      data: data,
      margin: {
        top: 30,
        right: 30,
        left: 30,
        bottom: 50
      },
      barCategoryGap: 2,
      barGap: 2
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(recharts__WEBPACK_IMPORTED_MODULE_5__["CartesianGrid"], {
      strokeDasharray: "3 3"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(recharts__WEBPACK_IMPORTED_MODULE_5__["XAxis"], {
      dataKey: "name"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(recharts__WEBPACK_IMPORTED_MODULE_5__["YAxis"], {
      label: {
        value: 'Issue(s)',
        position: 'top',
        dy: -10
      },
      domain: [0, 'dataMax'],
      allowDecimals: false
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(recharts__WEBPACK_IMPORTED_MODULE_5__["Legend"], {
      wrapperStyle: {
        bottom: 5,
        left: 75
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

const mapStateToProps = state => {
  const {
    gridData
  } = state;
  return {
    gridData
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["connect"])(mapStateToProps, mapDispatchToProps)(Chart));

/***/ }),

/***/ "./www/sources/js/pages/report/settlement/components/DataGrid.jsx":
/*!************************************************************************!*\
  !*** ./www/sources/js/pages/report/settlement/components/DataGrid.jsx ***!
  \************************************************************************/
/*! exports provided: DataGrid, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataGrid", function() { return DataGrid; });
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var _jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/components/react-grid/index */ "./www/sources/js/components/react-grid/index.jsx");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/report/settlement/actions.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







class DataGrid extends react__WEBPACK_IMPORTED_MODULE_2__["PureComponent"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "onPaging", (pageIndex, pageSize) => {
      const params = _objectSpread({}, this.props.gridParams);

      params['pageIndex'] = pageIndex;
      params['pageSize'] = pageSize;
      this.props.setGridParams(params);
      this.props.getGridData(params);
    });

    _defineProperty(this, "handleShowChart", () => {
      this.props.setChartPopup({
        show: true
      });
    });

    _defineProperty(this, "handleExportExcel", () => {
      const {
        gridParams
      } = this.props;
      this.props.exportExcel(gridParams);
    });

    _defineProperty(this, "buildHeader", () => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_1__["HeaderRow"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
        colWidth: 10
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getResource('Month')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
        colWidth: 15
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getResource('Country')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
        colWidth: 15
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getResource('Amount')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_1__["HeaderCell"], {
        colWidth: 15
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getResource('Total')));
    });

    _defineProperty(this, "buildBody", () => {
      const {
        childReports,
        total
      } = this.props.gridData;

      if (childReports.length > 0) {
        return [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2__["Fragment"], {
          key: 'body'
        }, childReports.map(item => this.renderRow(item)), this.renderLastRow(total))];
      }

      return [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_1__["Row"], {
        key: 'body',
        className: "no-data"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
        colSpan: "4"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getResource('ThereIsNoData')))];
    });

    _defineProperty(this, "renderRow", report => {
      return report.childReports.map((item, index) => {
        if (index === 0) {
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_1__["Row"], {
            key: item.id
          }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
            className: "text-center",
            rowSpan: report.childReports.length
          }, report.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_1__["Cell"], null, item.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
            className: "text-right"
          }, item.numberOfIssues), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
            className: "text-center",
            rowSpan: report.childReports.length
          }, report.numberOfIssues));
        } else {
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_1__["Row"], {
            key: item.name
          }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_1__["Cell"], null, item.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
            className: "text-right"
          }, item.numberOfIssues));
        }
      });
    });

    _defineProperty(this, "renderLastRow", total => {
      return total.childReports.map((item, index) => {
        if (index === 0) {
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_1__["Row"], {
            className: "last-row",
            key: item.id
          }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
            className: "text-center",
            rowSpan: total.totalChildReports
          }, total.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_1__["Cell"], null, item.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
            className: "text-right"
          }, item.numberOfIssues), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
            className: "text-center",
            rowSpan: total.totalChildReports
          }, total.numberOfIssues));
        } else {
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_1__["Row"], {
            className: "last-row",
            key: item.id
          }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_1__["Cell"], null, item.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
            className: "text-right"
          }, item.numberOfIssues));
        }
      });
    });
  }

  render() {
    const {
      gridData
    } = this.props;

    if (!gridData || !gridData.childReports) {
      return null;
    }

    const {
      totalChildReports
    } = gridData;
    const {
      pageIndex,
      pageSize
    } = this.props.gridParams;
    const pagingOption = {
      PageIndex: pageIndex,
      PageSize: pageSize,
      TotalItem: totalChildReports,
      PageList: [3, 6, 9, 12]
    };
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_2__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
      className: "table-title d-flex justify-content-between align-items-center"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", null, gridData.name), gridData.childReports.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", {
      className: "tool-box"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", {
      className: "fa fa-bar-chart mr-3 btn-chart",
      onClick: this.handleShowChart
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("span", {
      className: "fa fa-file-excel-o icon-excel",
      onClick: this.handleExportExcel
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_1__["Table"], {
      width: 700,
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

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_4__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_5__["ActionCreators"], dispatch);

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

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, mapDispatchToProps)(DataGrid));

/***/ }),

/***/ "./www/sources/js/pages/report/settlement/components/Filter.jsx":
/*!**********************************************************************!*\
  !*** ./www/sources/js/pages/report/settlement/components/Filter.jsx ***!
  \**********************************************************************/
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
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/report/settlement/actions.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







class Filter extends react__WEBPACK_IMPORTED_MODULE_1__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "submitHandler", event => {
      event.preventDefault();
      const {
        gridParams
      } = this.props;
      this.props.getGridData(_objectSpread(_objectSpread({}, gridParams), {}, {
        pageIndex: 1
      }));
      this.props.setGridParams(_objectSpread(_objectSpread({}, gridParams), {}, {
        pageIndex: 1
      }));
    });

    _defineProperty(this, "handleChangeYear", event => {
      const value = +event.target.value;
      const {
        gridParams
      } = this.props;
      this.props.setGridParams(_objectSpread(_objectSpread({}, gridParams), {}, {
        year: value
      }));
    });

    _defineProperty(this, "renderOptionsYear", () => {
      const minYear = 2011;
      const currentYear = new Date().getFullYear();
      const options = [];

      for (let i = minYear; i <= currentYear; i++) {
        options.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("option", {
          value: i,
          key: i
        }, i));
      }

      return options;
    });
  }

  render() {
    const {
      gridParams
    } = this.props;
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
      className: "shadow-none",
      value: gridParams.year,
      id: "year",
      onChange: this.handleChangeYear
    }, this.renderOptionsYear())), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
      variant: "primary",
      size: "sm",
      onClick: this.submitHandler
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getResource('Submit')))));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_4__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_5__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    gridParams
  } = state;
  return {
    gridParams
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, mapDispatchToProps)(Filter));

/***/ }),

/***/ "./www/sources/js/pages/report/settlement/index.js":
/*!*********************************************************!*\
  !*** ./www/sources/js/pages/report/settlement/index.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return index; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @reduxjs/toolkit */ "./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");
/* harmony import */ var _settlementReportSlice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./settlementReportSlice */ "./www/sources/js/pages/report/settlement/settlementReportSlice.js");
/* harmony import */ var _components_AppContainer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/AppContainer */ "./www/sources/js/pages/report/settlement/components/AppContainer.jsx");
/* harmony import */ var _cssroot_pages_report_settlement_index_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @cssroot/pages/report/settlement/index.scss */ "./www/sources/css/pages/report/settlement/index.scss");
/* harmony import */ var _cssroot_pages_report_settlement_index_scss__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_cssroot_pages_report_settlement_index_scss__WEBPACK_IMPORTED_MODULE_5__);






const store = Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__["configureStore"])({
  reducer: _settlementReportSlice__WEBPACK_IMPORTED_MODULE_3__["default"]
});
class index extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_1__["Provider"], {
      store: store
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "settlement"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_AppContainer__WEBPACK_IMPORTED_MODULE_4__["default"], null)));
  }

}

/***/ }),

/***/ "./www/sources/js/pages/report/settlement/settlementReportSlice.js":
/*!*************************************************************************!*\
  !*** ./www/sources/js/pages/report/settlement/settlementReportSlice.js ***!
  \*************************************************************************/
/*! exports provided: resetState, setGridParams, setGridData, setChartPopup, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetState", function() { return resetState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setGridParams", function() { return setGridParams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setGridData", function() { return setGridData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setChartPopup", function() { return setChartPopup; });
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @reduxjs/toolkit */ "./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");

const initialState = {
  gridParams: {
    year: new Date().getFullYear(),
    pageIndex: 1,
    pageSize: 12
  },
  gridData: null,
  contentChartPopup: {
    show: false
  }
};
const settlementReportSlice = Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__["createSlice"])({
  name: 'settlementReport',
  initialState: initialState,
  reducers: {
    resetState: () => initialState,
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
} = settlementReportSlice;
const {
  resetState,
  setGridParams,
  setGridData,
  setChartPopup
} = actions;
/* harmony default export */ __webpack_exports__["default"] = (reducer);

/***/ })

}]);
//# sourceMappingURL=21.chunk.js.map