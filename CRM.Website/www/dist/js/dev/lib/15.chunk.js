(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[15],{

/***/ "./www/sources/css/pages/report/feedback-statistic/index.scss":
/*!********************************************************************!*\
  !*** ./www/sources/css/pages/report/feedback-statistic/index.scss ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./www/sources/js/pages/report/feedback-statistic/actions.js":
/*!*******************************************************************!*\
  !*** ./www/sources/js/pages/report/feedback-statistic/actions.js ***!
  \*******************************************************************/
/*! exports provided: ActionCreators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionCreators", function() { return ActionCreators; });
/* harmony import */ var _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/common/dataService */ "./www/sources/js/common/dataService.js");
/* harmony import */ var _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/common/site */ "./www/sources/js/common/site.js");
/* harmony import */ var _feedbackStatisticSlice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./feedbackStatisticSlice */ "./www/sources/js/pages/report/feedback-statistic/feedbackStatisticSlice.js");




const getGridData = params => async dispatch => {
  _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].blockUI();
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('FeedbackStatistic/GetFeedbackStatistic');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__["default"].postDataAsync(url, params).then(response => {
    dispatch(Object(_feedbackStatisticSlice__WEBPACK_IMPORTED_MODULE_2__["setGridData"])(response.data));
  }).catch(_jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].handleAxiosError).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].unblockUI());
};

const getDetails = params => async dispatch => {
  _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].blockUI();
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('FeedbackStatistic/GetFeedbackStatisticDetails');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__["default"].postDataAsync(url, params).then(response => {
    dispatch(Object(_feedbackStatisticSlice__WEBPACK_IMPORTED_MODULE_2__["setDetailsDataGrid"])(response.data));
  }).catch(_jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].handleAxiosError).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].unblockUI());
};

const exportExcel = params => async () => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('FeedbackStatistic/ExportExcel');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__["default"].getFileAsync(url, params).then(response => {
    const fileName = response.headers['content-disposition'].split('filename=')[1].split(";")[0];
    _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].downloadFile(response.data, fileName);
  });
};

const exportExcelDetails = params => async () => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('FeedbackStatistic/ExportExcelDetails');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__["default"].getFileAsync(url, params).then(response => {
    const fileName = response.headers['content-disposition'].split('filename=')[1].split(";")[0];
    _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].downloadFile(response.data, fileName);
  });
};

const ActionCreators = {
  setGridParams: _feedbackStatisticSlice__WEBPACK_IMPORTED_MODULE_2__["setGridParams"],
  setGridData: _feedbackStatisticSlice__WEBPACK_IMPORTED_MODULE_2__["setGridData"],
  setGridParamDetails: _feedbackStatisticSlice__WEBPACK_IMPORTED_MODULE_2__["setGridParamDetails"],
  setDetailsDataGrid: _feedbackStatisticSlice__WEBPACK_IMPORTED_MODULE_2__["setDetailsDataGrid"],
  setOpenDetailPopup: _feedbackStatisticSlice__WEBPACK_IMPORTED_MODULE_2__["setOpenDetailPopup"],
  setOpenChartPopup: _feedbackStatisticSlice__WEBPACK_IMPORTED_MODULE_2__["setOpenChartPopup"],
  setViewRelatedCustomerDialog: _feedbackStatisticSlice__WEBPACK_IMPORTED_MODULE_2__["setViewRelatedCustomerDialog"],
  getGridData,
  getDetails,
  exportExcel,
  exportExcelDetails,
  resetState: _feedbackStatisticSlice__WEBPACK_IMPORTED_MODULE_2__["resetState"]
};

/***/ }),

/***/ "./www/sources/js/pages/report/feedback-statistic/components/AppContainer.jsx":
/*!************************************************************************************!*\
  !*** ./www/sources/js/pages/report/feedback-statistic/components/AppContainer.jsx ***!
  \************************************************************************************/
/*! exports provided: AppContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppContainer", function() { return AppContainer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/report/feedback-statistic/actions.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var _jsroot_components_SweetModalDialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/components/SweetModalDialog */ "./www/sources/js/components/SweetModalDialog.jsx");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var _Filter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Filter */ "./www/sources/js/pages/report/feedback-statistic/components/Filter.jsx");
/* harmony import */ var _DataGrid__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./DataGrid */ "./www/sources/js/pages/report/feedback-statistic/components/DataGrid.jsx");
/* harmony import */ var _Details__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./Details */ "./www/sources/js/pages/report/feedback-statistic/components/Details.jsx");
/* harmony import */ var _Chart__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Chart */ "./www/sources/js/pages/report/feedback-statistic/components/Chart.jsx");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }












class AppContainer extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "handleCloseDetailDialog", () => {
      this.props.setOpenDetailPopup({
        show: false
      });
    });

    _defineProperty(this, "handleCloseViewRelatedCustomerDialog", () => {
      this.props.setViewRelatedCustomerDialog({
        show: false
      });
    });

    _defineProperty(this, "handleCloseChartDialog", () => {
      this.props.setOpenChartPopup({
        show: false,
        chartInfo: null
      });
    });
  }

  componentWillUnmount() {
    this.props.resetState();
  }

  render() {
    const {
      detailPopup,
      viewRelatedCustomerDialog,
      chart
    } = this.props;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Filter__WEBPACK_IMPORTED_MODULE_7__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DataGrid__WEBPACK_IMPORTED_MODULE_8__["default"], null), detailPopup.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Details__WEBPACK_IMPORTED_MODULE_9__["default"], {
      onClose: this.handleCloseDetailDialog
    }), viewRelatedCustomerDialog.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_SweetModalDialog__WEBPACK_IMPORTED_MODULE_5__["default"], {
      size: "lg",
      title: _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('RelatedCustomer'),
      contents: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, viewRelatedCustomerDialog.relatedCustomers),
      buttons: [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], {
        variant: "primary",
        size: "sm",
        onClick: this.handleCloseViewRelatedCustomerDialog
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Close'))],
      onClose: this.handleCloseViewRelatedCustomerDialog
    }), chart.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Chart__WEBPACK_IMPORTED_MODULE_10__["default"], {
      chartInfo: chart.chartInfo,
      onClose: this.handleCloseChartDialog
    }));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    detailPopup,
    viewRelatedCustomerDialog,
    chart
  } = state;
  return {
    detailPopup,
    viewRelatedCustomerDialog,
    chart
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(AppContainer));

/***/ }),

/***/ "./www/sources/js/pages/report/feedback-statistic/components/Chart.jsx":
/*!*****************************************************************************!*\
  !*** ./www/sources/js/pages/report/feedback-statistic/components/Chart.jsx ***!
  \*****************************************************************************/
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






class Chart extends react__WEBPACK_IMPORTED_MODULE_1__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "getDataChart", chartInfo => {
      const data = [];
      chartInfo.feedbackCategories.forEach(feedback => {
        const objectData = {
          name: feedback.name
        };
        chartInfo.usernames.forEach((username, index) => {
          if (feedback.subTotal.resolves[index] > 0) {
            objectData[username.name] = feedback.subTotal.resolves[index];
          }
        });
        data.push(objectData);
      });
      return data;
    });

    _defineProperty(this, "getLabels", chartInfo => {
      const labels = [];
      chartInfo.usernames.forEach(item => {
        labels.push(item.name);
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
    }, chartInfo.title)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Body, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(recharts__WEBPACK_IMPORTED_MODULE_4__["ResponsiveContainer"], {
      width: "100%",
      height: data.length > 5 ? 790 : 830
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(recharts__WEBPACK_IMPORTED_MODULE_4__["BarChart"], {
      width: 1100,
      data: data,
      margin: {
        top: 30,
        right: 30,
        left: 30,
        bottom: data.length > 5 ? 250 : 30
      },
      barCategoryGap: 0,
      barGap: 0
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(recharts__WEBPACK_IMPORTED_MODULE_4__["XAxis"], {
      dataKey: "name",
      scaleToFit: "true",
      verticalAnchor: "start",
      interval: 0,
      angle: data.length > 5 ? -90 : 0,
      dy: data.length > 5 ? 120 : 0
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(recharts__WEBPACK_IMPORTED_MODULE_4__["YAxis"], {
      label: {
        position: 'top',
        dy: -10,
        value: 'Feedback(s)'
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(recharts__WEBPACK_IMPORTED_MODULE_4__["Legend"], {
      wrapperStyle: {
        bottom: 5,
        left: 75
      }
    }), labels.map((label, key) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(recharts__WEBPACK_IMPORTED_MODULE_4__["Bar"], {
      label: {
        position: 'top'
      },
      dataKey: label,
      key: key,
      maxBarSize: 20,
      fill: Object(_jsroot_common_shareScripts__WEBPACK_IMPORTED_MODULE_3__["getBackGroundColor"])(key)
    }))))));
  }

}

/***/ }),

/***/ "./www/sources/js/pages/report/feedback-statistic/components/DataGrid.jsx":
/*!********************************************************************************!*\
  !*** ./www/sources/js/pages/report/feedback-statistic/components/DataGrid.jsx ***!
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
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/report/feedback-statistic/actions.js");
/* harmony import */ var _jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/components/react-grid/index */ "./www/sources/js/components/react-grid/index.jsx");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/common/constants */ "./www/sources/js/common/constants.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









class DataGrid extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "buildHeader", gridData => {
      const header = [];
      header.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 45
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Subcategory')));
      gridData.usernames.forEach(item => {
        header.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
          colWidth: 15
        }, item.name));
      });
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderRow"], null, header);
    });

    _defineProperty(this, "buildBody", gridData => {
      const rows = [];

      if (gridData.feedbackCategories.length > 0) {
        rows.push(gridData.feedbackCategories.map((item, index) => this.renderMainCategoryRows(item, index)));
        return rows;
      }

      return [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Row"], {
        key: `body${1}`,
        className: "no-data"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
        className: "text-center"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('ThereIsNoData')))];
    });

    _defineProperty(this, "handleToggleRow", id => {
      const {
        toggleRow
      } = this.state;
      const index = toggleRow.indexOf(id);

      if (index >= 0) {
        toggleRow.splice(index, 1);
      } else {
        toggleRow.push(id);
      }

      this.setState({
        toggleRow
      });
    });

    _defineProperty(this, "renderMainCategoryRows", (item, index) => {
      const rows = [];
      const cells = [];
      const cellsSubTotal = [];
      const {
        toggleRow
      } = this.state;
      const usernames = this.props.gridData.usernames;
      cells.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
        className: "subcategory"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: `expand-icon fa pr-2 ${!toggleRow.includes(item.id) ? 'fa-caret-down' : 'fa-caret-right'}`
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, `${item.name} - ${item.feedbackSubcategories.length} item(s)`)));
      usernames.forEach(() => {
        cells.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
          className: "subcategory"
        }));
      });
      rows.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Row"], {
        key: `parent-${item.id}`,
        className: "parent-level-0",
        onClick: () => this.handleToggleRow(item.id)
      }, cells));

      if (item.feedbackSubcategories.length > 0) {
        rows.push(item.feedbackSubcategories.map(sub => this.renderSubCategoryRows(item.id, sub, usernames)));

        if (!toggleRow.includes(item.id)) {
          cellsSubTotal.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
            className: "child sub-total pl-4"
          }, `Sub Total (${item.subTotal.total})`));
          item.subTotal.resolves.forEach((count, index) => {
            cellsSubTotal.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
              key: `sub-total-count-${index}`,
              className: `child ${count > 0 ? this.styleCLick : this.styleDisableCLick} text-center`,
              onClick: () => this.handleShowDetails(usernames[index].id, item.id, 0)
            }, count));
          });
          rows.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Row"], {
            key: `sub-total-${index}`
          }, cellsSubTotal));
        }
      }

      return rows;
    });

    _defineProperty(this, "renderSubCategoryRows", (parentId, sub, usernames) => {
      const {
        toggleRow
      } = this.state;
      const rows = [];

      if (!toggleRow.includes(parentId)) {
        const cells = [];
        cells.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
          key: `sub-${sub.id}`,
          className: "child pl-4"
        }, `${sub.name} (${sub.total})`));
        sub.resolves.forEach((count, index) => {
          cells.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
            key: `count-${index}`,
            className: `child ${count > 0 ? this.styleCLick : this.styleDisableCLick} text-center`,
            onClick: () => this.handleShowDetails(usernames[index].id, parentId, sub.id)
          }, count));
        });
        rows.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Row"], {
          key: `child-${sub.id}`
        }, cells));
        return rows;
      } else {
        return null;
      }
    });

    _defineProperty(this, "renderFooter", gridData => {
      const cells = [];
      cells.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], null, "Grand Total"));
      gridData.grandTotals.forEach((item, index) => {
        cells.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
          className: `${item > 0 ? this.styleCLick : this.styleDisableCLick} text-center`,
          onClick: () => this.handleShowDetails(gridData.usernames[index].id, 0, 0)
        }, item));
      });
      return [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Row"], {
        key: "footer",
        className: "footer-container font-weight-bold"
      }, cells)];
    });

    _defineProperty(this, "handleShowDetails", (valueId = -1, mainCategoryId = 0, subCategoryId = 0) => {
      const params = _objectSpread(_objectSpread({}, this.props.gridParams), {}, {
        valueId: valueId,
        mainCategoryId: mainCategoryId,
        subCategoryId: subCategoryId
      });

      this.props.setOpenDetailPopup({
        show: true
      });
      this.props.getDetails(params);
      this.props.setGridParamDetails(params);
    });

    _defineProperty(this, "handleExportExcel", () => {
      this.props.exportExcel(this.props.gridParams);
    });

    _defineProperty(this, "handleViewChart", gridData => {
      this.props.setOpenChartPopup({
        show: true,
        chartInfo: gridData
      });
    });

    _defineProperty(this, "handleCollapseExpand", () => {
      const {
        toggleRow,
        isCollapse
      } = this.state;

      if (!isCollapse) {
        this.props.gridData.feedbackCategories.forEach(main => {
          if (toggleRow.indexOf(main) < 0) {
            toggleRow.push(main.id);
          }
        });
        this.setState(prevState => ({
          toggleRow,
          isCollapse: !prevState.isCollapse
        }));
      } else {
        this.setState(prevState => ({
          toggleRow: [],
          isCollapse: !prevState.isCollapse
        }));
      }
    });

    _defineProperty(this, "renderCustomButton", () => {
      const {
        gridData
      } = this.props;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, gridData.usernames.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["OverlayTrigger"], {
        overlay: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Tooltip"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "View Chart")),
        placement: "auto"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "fa fa-bar-chart icon pl-3 cursor-pointer",
        onClick: () => this.handleViewChart(gridData)
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["OverlayTrigger"], {
        overlay: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Tooltip"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Show Details")),
        placement: "auto"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "fa fa-info-circle icon pl-3 fa-lg cursor-pointer",
        onClick: () => this.handleShowDetails()
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["OverlayTrigger"], {
        overlay: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Tooltip"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Collapse/Expand")),
        placement: "auto"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "fa fa-expand icon pl-3 cursor-pointer",
        onClick: this.handleCollapseExpand
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["OverlayTrigger"], {
        overlay: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Tooltip"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Export to Excel")),
        placement: "auto"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "fa fa-file-excel-o icon-excel pl-3",
        onClick: () => this.handleExportExcel()
      })));
    });

    _defineProperty(this, "onPaging", (pageIndex, pageSize) => {
      const params = _objectSpread({}, this.props.gridParams);

      params['pageIndex'] = pageIndex;
      params['pageSize'] = pageSize;
      this.props.getGridData(params);
      this.props.setGridParams(params);
    });

    _defineProperty(this, "renderTitle", gridData => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "table-title d-flex justify-content-between align-items-center"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, gridData.title), gridData.feedbackCategories.length > 0 && this.renderCustomButton());
    });

    this.styleCLick = 'link-click cursor-pointer';
    this.styleDisableCLick = 'disable-click';
    this.state = {
      shouldResetScrollPosition: true,
      toggleRow: [],
      isCollapse: false
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.gridData !== nextProps.gridData) {
      nextState.shouldResetScrollPosition = true;
      nextState.toggleRow = [];
      nextState.isCollapse = false;
    }

    if (this.state.toggleRow.length > 0) {
      nextState.shouldResetScrollPosition = false;
    }

    return true;
  }

  render() {
    const {
      gridData,
      gridParams
    } = this.props;

    if (gridData === null) {
      return null;
    }

    const {
      pageIndex,
      pageSize
    } = gridParams;
    const pagingOption = {
      PageIndex: pageIndex,
      PageSize: pageSize,
      TotalItem: gridData.totalItems,
      PageList: _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_7__["PAGING_SIZES"]
    };
    const defaultWidth = 420;
    const totalWidth = defaultWidth + gridData.usernames.length * 155;
    const clientWidth = document.getElementById('right-row-container').clientWidth;
    const width = clientWidth < totalWidth ? clientWidth : totalWidth;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Table"], {
      maxWidth: totalWidth,
      shouldUseMaxWidth: true,
      width: width,
      autoWidth: false,
      header: this.buildHeader(gridData),
      body: this.buildBody(gridData),
      isFixColumn: true,
      title: this.renderTitle(gridData),
      isPaging: true,
      pageOption: pagingOption,
      onPaging: this.onPaging,
      footer: this.renderFooter(gridData),
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

/***/ "./www/sources/js/pages/report/feedback-statistic/components/Details.jsx":
/*!*******************************************************************************!*\
  !*** ./www/sources/js/pages/report/feedback-statistic/components/Details.jsx ***!
  \*******************************************************************************/
/*! exports provided: Details, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Details", function() { return Details; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var react_bootstrap_OverlayTrigger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-bootstrap/OverlayTrigger */ "./node_modules/react-bootstrap/esm/OverlayTrigger.js");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var react_bootstrap_Tooltip__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-bootstrap/Tooltip */ "./node_modules/react-bootstrap/esm/Tooltip.js");
/* harmony import */ var _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/common/dateTimeService */ "./www/sources/js/common/dateTimeService.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/report/feedback-statistic/actions.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var _jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @jsroot/components/react-grid/index */ "./www/sources/js/components/react-grid/index.jsx");
/* harmony import */ var _jsroot_components_DraggableModalDialog__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @jsroot/components/DraggableModalDialog */ "./www/sources/js/components/DraggableModalDialog.jsx");
/* harmony import */ var _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @jsroot/common/constants */ "./www/sources/js/common/constants.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }













class Details extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "buildHeader", () => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_9__["HeaderRow"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_9__["HeaderCell"], {
        colWidth: 50
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].getResource('Feedback')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_9__["HeaderCell"], {
        colWidth: 25
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].getResource('Customer')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_9__["HeaderCell"], {
        colWidth: 50
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].getResource('Category')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_9__["HeaderCell"], {
        colWidth: 15
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].getResource('Status')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_9__["HeaderCell"], {
        colWidth: 25
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].getResource('RelatedCustomer')));
    });

    _defineProperty(this, "buildBody", () => {
      const {
        details
      } = this.props;

      if (details.data.length > 0) {
        return details.data.map((item, index) => this.renderRow(item, index));
      }

      return [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_9__["Row"], {
        key: "body-nodata",
        className: "no-data"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_9__["Cell"], {
        className: "text-center",
        colSpan: 5
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].getResource('ThereIsNoData')))];
    });

    _defineProperty(this, "handleGroupCategory", settings => {
      const categories = settings.reduce((category, currentValue) => {
        const categorySetting = category.find(item => currentValue.settingId === item.settingId);

        if (categorySetting) {
          categorySetting.subSettingId = [...categorySetting.subSettingId, currentValue.subSettingId];
        } else {
          category.push({
            settingId: currentValue.settingId,
            subSettingId: [currentValue.subSettingId]
          });
        }

        return category;
      }, []);
      return categories;
    });

    _defineProperty(this, "renderMainCategory", item => {
      const {
        mainCategories
      } = this.props.details;
      const categories = this.handleGroupCategory(item.settings);
      return categories.map((value, key) => {
        const filterCategory = mainCategories.find(el => el.settingId === value.settingId);
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "font-weight-bold",
          key: key
        }, filterCategory.settingValue), value.subSettingId.map((subId, index) => {
          const filterSub = filterCategory.childSettings.find(el => el.subCategoryId === subId);
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            key: index,
            className: "ml-3 py-1 font-italic"
          }, filterSub.name);
        }));
      });
    });

    _defineProperty(this, "renderRelatedCustomer", item => {
      if (item.length > _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_11__["MaximumDisplayRelatedCustomer"]) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
          href: "#",
          onClick: () => this.handleOpenViewRelatedCustomer(item.join(', '))
        }, item.length, " customers");
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

    _defineProperty(this, "renderRow", (item, index) => {
      const feedbackDateFormat = _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__["default"].toShortDateTimeFormat(item.feedbackDate);
      const createDateFormatDate = _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__["default"].toShortDateTimeFormat(item.createDate);
      const solveDateFormatDate = _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__["default"].toShortDateTimeFormat(item.solveDate);
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_9__["Row"], {
        key: `${item.feedbackId}-${index}`,
        className: `manage-feedback-row ${this.renderStatus(item.status)}`
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_9__["Cell"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "pr-3"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, item.subject)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "pl-3"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "py-1"
      }, "Feedback date ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, feedbackDateFormat)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "py-1"
      }, "By", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, " ", item.creator, " "), "on ", createDateFormatDate), item.reviewerName && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "info"
      }, "Reviewed by ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, " ", item.reviewerName, " "), " on ", solveDateFormatDate))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_9__["Cell"], null, item.username), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_9__["Cell"], null, this.renderMainCategory(item)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_9__["Cell"], {
        className: "text-center"
      }, item.status ? item.status : 'N/A'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_9__["Cell"], {
        className: "break-word"
      }, item.relatedCustomer !== null ? this.renderRelatedCustomer(item.relatedCustomer.split(',')) : ''));
    });

    _defineProperty(this, "renderStatus", status => {
      if (status === 'Pending') {
        return 'pending';
      }

      return status === 'Closed' ? 'closed' : '';
    });

    _defineProperty(this, "handleExportExcel", () => {
      const {
        gridParamDetails
      } = this.props;
      this.props.exportExcelDetails(gridParamDetails);
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

    _defineProperty(this, "onPaging", (pageIndex, pageSize) => {
      const params = _objectSpread({}, this.props.gridParamDetails);

      params['pageIndex'] = pageIndex;
      params['pageSize'] = pageSize;
      this.props.getDetails(params);
      this.props.setGridParamDetails(params);
    });

    _defineProperty(this, "renderTableTitle", params => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "table-title d-flex justify-content-between align-items-center"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, `${_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].getResource('FeedbackDetailTitle')} from ${params.fromDate} to from ${params.toDate}`), this.props.details.data.length > 0 && this.renderExportExcel());
    });

    _defineProperty(this, "renderForm", () => {
      const {
        details
      } = this.props;

      if (!details || !details.data) {
        return null;
      }

      const {
        pageIndex,
        pageSize
      } = this.props.gridParamDetails;
      const pagingOption = {
        PageIndex: pageIndex,
        PageSize: pageSize,
        TotalItem: details.data.length,
        PageList: _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_11__["PAGING_SIZES"]
      };
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["Modal"].Body, null, this.renderTableTitle(this.props.gridParamDetails), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_9__["Table"], {
        width: 1150,
        autoWidth: false,
        isPaging: true,
        pageOption: pagingOption,
        onPaging: this.onPaging,
        header: this.buildHeader(),
        body: this.buildBody(),
        containerPadding: 10,
        shouldResetScrollPosition: false
      }));
    });
  }

  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["Modal"], {
      show: true,
      className: "feedback-detail",
      dialogAs: _jsroot_components_DraggableModalDialog__WEBPACK_IMPORTED_MODULE_10__["default"],
      backdrop: "static",
      keyboard: false,
      size: "xl",
      centered: true,
      "aria-label": "contained-modal-title-vcenter",
      onHide: this.props.onClose
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["Modal"].Header, {
      closeButton: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["Modal"].Title, {
      as: "div"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].getResource('FeedbackDetailTitle'))), this.renderForm()));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_7__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    gridParamDetails,
    details
  } = state;
  return {
    gridParamDetails,
    details
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(Details));

/***/ }),

/***/ "./www/sources/js/pages/report/feedback-statistic/components/Filter.jsx":
/*!******************************************************************************!*\
  !*** ./www/sources/js/pages/report/feedback-statistic/components/Filter.jsx ***!
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
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/report/feedback-statistic/actions.js");
/* harmony import */ var _jsroot_components_date_picker_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/components/date-picker/index */ "./www/sources/js/components/date-picker/index.jsx");
/* harmony import */ var _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/common/dateTimeService */ "./www/sources/js/common/dateTimeService.js");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jsroot/common/constants */ "./www/sources/js/common/constants.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/lib/index.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_toastify__WEBPACK_IMPORTED_MODULE_9__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }











class Filter extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleChangeFromDate", fromDate => {
      const fromDateTime = new Date(fromDate.getTime());
      fromDateTime.setMonth(fromDate.getMonth() + 12);
      fromDateTime.setDate(fromDate.getDate() - 1);
      this.minToDate = fromDate;
      this.maxToDate = fromDateTime < this.currentDate ? fromDateTime : this.currentDate;
      this.setState({
        toDate: this.maxToDate,
        fromDate: fromDate
      });
    });

    _defineProperty(this, "handleChangeToDate", toDate => {
      this.setState({
        toDate
      });
    });

    _defineProperty(this, "handleChange", evt => {
      this.setState(_objectSpread(_objectSpread({}, this.state), {}, {
        [evt.target.name]: parseInt(evt.target.value, 10)
      }));
    });

    _defineProperty(this, "handleChangeFromDuration", evt => {
      this.setState({
        fromDuration: _objectSpread(_objectSpread({}, this.state.fromDuration), {}, {
          [evt.target.name]: evt.target.value
        })
      });
    });

    _defineProperty(this, "handleChangeToDuration", evt => {
      this.setState({
        toDuration: _objectSpread(_objectSpread({}, this.state.toDuration), {}, {
          [evt.target.name]: evt.target.value
        })
      });
    });

    _defineProperty(this, "handleSubmit", () => {
      const {
        selectionType,
        fromDuration,
        toDuration,
        fromDate,
        toDate
      } = this.state;
      const params = {
        type: selectionType,
        fromDuration: this.getDurationTimeString(fromDuration),
        toDuration: this.getDurationTimeString(toDuration),
        fromDate: _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__["default"].toShortDateFormat(fromDate),
        toDate: _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__["default"].toShortDateFormat(toDate),
        pageIndex: 1,
        pageSize: 100
      };

      if (this.validateDuration(fromDuration, toDuration)) {
        this.props.setGridParams(params);
        this.props.getGridData(params);
      }
    });

    _defineProperty(this, "getDurationTimeString", duration => {
      const stringDayHour = `${duration.day.length === 0 ? '0' : duration.day}:${duration.hour.length === 0 ? '0' : duration.hour}:`;
      const stringMinuteSecond = `${duration.minute.length === 0 ? '0' : duration.minute}:${duration.second.length === 0 ? '0' : duration.second}`;
      return stringDayHour + stringMinuteSecond;
    });

    _defineProperty(this, "validateDuration", (fromDuration, toDuration) => {
      const timeBegin = fromDuration.day * 86400 + fromDuration.hour * 3600 + fromDuration.minute * 60 + fromDuration.second;
      const timeEnd = toDuration.day * 86400 + toDuration.hour * 3600 + toDuration.minute * 60 + toDuration.second;
      const isInValid = timeBegin > timeEnd && timeBegin !== 0 && timeEnd !== 0;

      if (timeBegin !== 0 && timeEnd === 0 || isInValid) {
        react_toastify__WEBPACK_IMPORTED_MODULE_9__["toast"].error(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('InvalidDuration'));
        return false;
      }

      return true;
    });

    const currentClientTime = window.currentClientTime;
    this.currentDate = new Date(_jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__["default"].toShortDateTimeFormat(new Date(currentClientTime)));
    const currentDate = this.currentDate;

    const _fromDate = new Date(currentDate);

    const previousWeek = _fromDate.setDate(_fromDate.getDate() - 7);

    this.maxFromDate = currentDate;
    this.maxToDate = currentDate;
    this.state = {
      fromDuration: {
        day: '',
        hour: '',
        minute: '',
        second: ''
      },
      toDuration: {
        day: '',
        hour: '',
        minute: '',
        second: ''
      },
      fromDate: previousWeek,
      toDate: currentDate,
      selectionType: 1
    };
  }

  render() {
    const {
      fromDate,
      toDate,
      selectionType,
      fromDuration,
      toDuration
    } = this.state;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"], {
      className: "form-filter",
      onSubmit: this.handleSubmit
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Row, {
      bsPrefix: "form-row"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, {
      className: "small-width"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Control, {
      as: "select",
      size: "sm",
      className: "small-width",
      name: "selectionType",
      id: "selectionType",
      value: selectionType,
      onChange: this.handleChange
    }, _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_8__["FeedbackSelectionType"].map((value, key) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
      key: key,
      value: value.id
    }, value.name)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
      htmlFor: "fromDate"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('FromDate')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "react-datepicker-wrapper-container"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_date_picker_index__WEBPACK_IMPORTED_MODULE_5__["default"], {
      selected: fromDate,
      dropdownMode: "select",
      maxDate: new Date(this.maxFromDate),
      peekNextMonth: true,
      showYearDropdown: true,
      showMonthDropdown: true,
      onChange: value => this.handleChangeFromDate(value)
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, null, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('ToDate')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "react-datepicker-wrapper-container"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_date_picker_index__WEBPACK_IMPORTED_MODULE_5__["default"], {
      dropdownMode: "select",
      minDate: new Date(fromDate),
      maxDate: new Date(this.maxToDate),
      showYearDropdown: true,
      peekNextMonth: true,
      showMonthDropdown: true,
      selected: toDate,
      onChange: value => this.handleChangeToDate(value)
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, {
      className: "submit"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], {
      variant: "primary",
      size: "sm",
      onClick: this.handleSubmit
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Submit')))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Row, {
      bsPrefix: "form-row"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, {
      className: "width-90"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
      htmlFor: "day"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('FromDuration'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, {
      className: "width-320 duration"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Control, {
      type: "number",
      size: "sm",
      value: fromDuration.day,
      name: "day",
      id: "day",
      className: "shadow-none mr-1",
      autoComplete: "off",
      onChange: this.handleChangeFromDuration
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, null, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Day')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Control, {
      type: "number",
      size: "sm",
      value: fromDuration.hour,
      name: "hour",
      id: "hour",
      className: "shadow-none  mr-1",
      autoComplete: "off",
      onChange: this.handleChangeFromDuration
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, null, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Hour')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Control, {
      type: "number",
      size: "sm",
      value: fromDuration.minute,
      name: "minute",
      id: "minute",
      className: "shadow-none  mr-1",
      autoComplete: "off",
      onChange: this.handleChangeFromDuration
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, null, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Minute')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Control, {
      type: "number",
      size: "sm",
      value: fromDuration.second,
      name: "second",
      id: "second",
      className: "shadow-none  mr-1",
      autoComplete: "off",
      onChange: this.handleChangeFromDuration
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, null, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Second')))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Row, {
      bsPrefix: "form-row"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, {
      className: "width-90"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
      htmlFor: "day"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('ToDuration'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, {
      className: "width-320 duration"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Control, {
      type: "number",
      size: "sm",
      value: toDuration.day,
      name: "day",
      id: "day",
      className: "shadow-none mr-1",
      autoComplete: "off",
      onChange: this.handleChangeToDuration
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, null, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Day')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Control, {
      type: "number",
      size: "sm",
      value: toDuration.hour,
      name: "hour",
      id: "hour",
      className: "shadow-none  mr-1",
      autoComplete: "off",
      onChange: this.handleChangeToDuration
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, null, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Hour')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Control, {
      type: "number",
      size: "sm",
      value: toDuration.minute,
      name: "minute",
      id: "minute",
      className: "shadow-none  mr-1",
      autoComplete: "off",
      onChange: this.handleChangeToDuration
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, null, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Minute')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Control, {
      type: "number",
      size: "sm",
      value: toDuration.second,
      name: "second",
      id: "second",
      className: "shadow-none  mr-1",
      autoComplete: "off",
      onChange: this.handleChangeToDuration
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, null, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Second')))));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_4__["ActionCreators"], dispatch);

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(null, mapDispatchToProps)(Filter));

/***/ }),

/***/ "./www/sources/js/pages/report/feedback-statistic/feedbackStatisticSlice.js":
/*!**********************************************************************************!*\
  !*** ./www/sources/js/pages/report/feedback-statistic/feedbackStatisticSlice.js ***!
  \**********************************************************************************/
/*! exports provided: resetState, setGridParams, setGridData, setGridParamDetails, setDetailsDataGrid, setOpenDetailPopup, setOpenChartPopup, setViewRelatedCustomerDialog, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetState", function() { return resetState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setGridParams", function() { return setGridParams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setGridData", function() { return setGridData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setGridParamDetails", function() { return setGridParamDetails; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setDetailsDataGrid", function() { return setDetailsDataGrid; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setOpenDetailPopup", function() { return setOpenDetailPopup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setOpenChartPopup", function() { return setOpenChartPopup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setViewRelatedCustomerDialog", function() { return setViewRelatedCustomerDialog; });
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @reduxjs/toolkit */ "./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");

const initialState = {
  gridParams: null,
  gridParamDetails: {
    pageIndex: 1,
    pageSize: 100
  },
  gridData: null,
  details: null,
  detailPopup: {
    show: false
  },
  chart: {
    show: false,
    chartInfo: null
  },
  viewRelatedCustomerDialog: {
    show: false
  }
};
const feedbackStatisticSlice = Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__["createSlice"])({
  name: 'logStatistics',
  initialState: initialState,
  reducers: {
    resetState: () => initialState,
    setGridParams: (state, action) => {
      state.gridParams = action.payload;
    },
    setGridData: (state, action) => {
      state.gridData = action.payload;
    },
    setGridParamDetails: (state, action) => {
      state.gridParamDetails = action.payload;
    },
    setDetailsDataGrid: (state, action) => {
      state.details = action.payload;
    },
    setOpenDetailPopup: (state, action) => {
      state.detailPopup = action.payload;
    },
    setOpenChartPopup: (state, action) => {
      state.chart = action.payload;
    },
    setViewRelatedCustomerDialog: (state, action) => {
      state.viewRelatedCustomerDialog = action.payload;
    }
  }
});
const {
  actions,
  reducer
} = feedbackStatisticSlice;
const {
  resetState,
  setGridParams,
  setGridData,
  setGridParamDetails,
  setDetailsDataGrid,
  setOpenDetailPopup,
  setOpenChartPopup,
  setViewRelatedCustomerDialog
} = actions;
/* harmony default export */ __webpack_exports__["default"] = (reducer);

/***/ }),

/***/ "./www/sources/js/pages/report/feedback-statistic/index.js":
/*!*****************************************************************!*\
  !*** ./www/sources/js/pages/report/feedback-statistic/index.js ***!
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
/* harmony import */ var _feedbackStatisticSlice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./feedbackStatisticSlice */ "./www/sources/js/pages/report/feedback-statistic/feedbackStatisticSlice.js");
/* harmony import */ var _components_AppContainer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/AppContainer */ "./www/sources/js/pages/report/feedback-statistic/components/AppContainer.jsx");
/* harmony import */ var _cssroot_pages_report_feedback_statistic_index_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @cssroot/pages/report/feedback-statistic/index.scss */ "./www/sources/css/pages/report/feedback-statistic/index.scss");
/* harmony import */ var _cssroot_pages_report_feedback_statistic_index_scss__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_cssroot_pages_report_feedback_statistic_index_scss__WEBPACK_IMPORTED_MODULE_5__);






const store = Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__["configureStore"])({
  reducer: _feedbackStatisticSlice__WEBPACK_IMPORTED_MODULE_3__["default"]
});
class index extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_1__["Provider"], {
      store: store
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "feedback-statistic"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_AppContainer__WEBPACK_IMPORTED_MODULE_4__["default"], null)));
  }

}

/***/ })

}]);
//# sourceMappingURL=15.chunk.js.map