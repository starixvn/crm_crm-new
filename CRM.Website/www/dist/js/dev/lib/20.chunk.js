(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[20],{

/***/ "./www/sources/css/pages/report/redemption-statistics/index.scss":
/*!***********************************************************************!*\
  !*** ./www/sources/css/pages/report/redemption-statistics/index.scss ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./www/sources/js/pages/report/redemption-statistics/actions.js":
/*!**********************************************************************!*\
  !*** ./www/sources/js/pages/report/redemption-statistics/actions.js ***!
  \**********************************************************************/
/*! exports provided: ActionCreators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionCreators", function() { return ActionCreators; });
/* harmony import */ var _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/common/dataService */ "./www/sources/js/common/dataService.js");
/* harmony import */ var _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/common/site */ "./www/sources/js/common/site.js");
/* harmony import */ var _redemptionStatisticsSlice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./redemptionStatisticsSlice */ "./www/sources/js/pages/report/redemption-statistics/redemptionStatisticsSlice.js");




const getAllSettings = () => async dispatch => {
  _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].blockUI();
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('RedemptionStatistics/getAllSettings');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__["default"].getDataAsync(url).then(response => {
    dispatch(Object(_redemptionStatisticsSlice__WEBPACK_IMPORTED_MODULE_2__["setAllSettings"])(response.data));
  }).catch(_jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].handleAxiosError).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].unblockUI());
};

const getRedemptionSummary = params => async dispatch => {
  _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].blockUI();
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('RedemptionStatistics/GetRedemptionSummary');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__["default"].postDataAsync(url, params).then(response => {
    dispatch(Object(_redemptionStatisticsSlice__WEBPACK_IMPORTED_MODULE_2__["setRedemptionSummary"])(response.data));
  }).catch(_jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].handleAxiosError).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].unblockUI());
};

const getRedemptionDetails = params => async dispatch => {
  _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].blockUI();
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('RedemptionStatistics/GetRedemptionDetails');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__["default"].postDataAsync(url, params).then(response => {
    dispatch(Object(_redemptionStatisticsSlice__WEBPACK_IMPORTED_MODULE_2__["setRedemptionDetails"])(response.data));
  }).catch(_jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].handleAxiosError).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].unblockUI());
};

const exportExcel = params => async () => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('RedemptionStatistics/ExportExcel');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__["default"].getFileAsync(url, params).then(response => {
    const fileName = response.headers['content-disposition'].split('filename=')[1].split(";")[0];
    _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].downloadFile(response.data, fileName);
  });
};

const exportExcelDetails = params => async () => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('RedemptionStatistics/ExportExcelDetails');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__["default"].getFileAsync(url, params).then(response => {
    const fileName = response.headers['content-disposition'].split('filename=')[1].split(";")[0];
    _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].downloadFile(response.data, fileName);
  });
};

const ActionCreators = {
  resetState: _redemptionStatisticsSlice__WEBPACK_IMPORTED_MODULE_2__["resetState"],
  getAllSettings,
  setGridParams: _redemptionStatisticsSlice__WEBPACK_IMPORTED_MODULE_2__["setGridParams"],
  setGridParamDetails: _redemptionStatisticsSlice__WEBPACK_IMPORTED_MODULE_2__["setGridParamDetails"],
  getRedemptionSummary,
  setRedemptionSummary: _redemptionStatisticsSlice__WEBPACK_IMPORTED_MODULE_2__["setRedemptionSummary"],
  getRedemptionDetails,
  setRedemptionDetails: _redemptionStatisticsSlice__WEBPACK_IMPORTED_MODULE_2__["setRedemptionDetails"],
  setOpenDetails: _redemptionStatisticsSlice__WEBPACK_IMPORTED_MODULE_2__["setOpenDetails"],
  exportExcel,
  exportExcelDetails
};

/***/ }),

/***/ "./www/sources/js/pages/report/redemption-statistics/components/AppContainer.jsx":
/*!***************************************************************************************!*\
  !*** ./www/sources/js/pages/report/redemption-statistics/components/AppContainer.jsx ***!
  \***************************************************************************************/
/*! exports provided: AppContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppContainer", function() { return AppContainer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/report/redemption-statistics/actions.js");
/* harmony import */ var _Filter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Filter */ "./www/sources/js/pages/report/redemption-statistics/components/Filter.jsx");
/* harmony import */ var _DataGrid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DataGrid */ "./www/sources/js/pages/report/redemption-statistics/components/DataGrid.jsx");
/* harmony import */ var _Detail__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Detail */ "./www/sources/js/pages/report/redemption-statistics/components/Detail.jsx");







class AppContainer extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  componentDidMount() {
    this.props.getAllSettings();
  }

  componentWillUnmount() {
    this.props.resetState();
  }

  render() {
    const {
      settings,
      detailPopup
    } = this.props;

    if (settings === null || !settings) {
      return null;
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Filter__WEBPACK_IMPORTED_MODULE_4__["default"], null), detailPopup.show ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Detail__WEBPACK_IMPORTED_MODULE_6__["default"], null) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DataGrid__WEBPACK_IMPORTED_MODULE_5__["default"], null));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    settings,
    detailPopup
  } = state;
  return {
    settings,
    detailPopup
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(AppContainer));

/***/ }),

/***/ "./www/sources/js/pages/report/redemption-statistics/components/DataGrid.jsx":
/*!***********************************************************************************!*\
  !*** ./www/sources/js/pages/report/redemption-statistics/components/DataGrid.jsx ***!
  \***********************************************************************************/
/*! exports provided: DataGrid, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataGrid", function() { return DataGrid; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/report/redemption-statistics/actions.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/components/react-grid/index */ "./www/sources/js/components/react-grid/index.jsx");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/common/dateTimeService */ "./www/sources/js/common/dateTimeService.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









class DataGrid extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "buildHeader", () => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderRow"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 15
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Date')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 15
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Currency')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 15
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Amount')));
    });

    _defineProperty(this, "buildBody", () => {
      const {
        gridData
      } = this.props;
      const rows = [];

      if (gridData.data.length > 0) {
        gridData.data.forEach((item, index) => {
          rows.push(this.renderRow(item, index));
        });
        rows.push(this.renderRowTotal(gridData.totals));
        return rows;
      }

      return [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Row"], {
        className: "no-data"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: "text-center",
        colSpan: 3
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('ThereIsNoData')))];
    });

    _defineProperty(this, "renderRow", (item, index) => {
      const {
        gridParams
      } = this.props;
      const isReportByYear = gridParams.reportBy === '2';
      const monthName = moment__WEBPACK_IMPORTED_MODULE_6___default()(item.month, 'M').format('MMMM');
      const dateFormat = isReportByYear ? item.year : `${monthName} ${item.year}`;
      const titleYearDetail = _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('RedemptionStatisticsDetailTitle') + dateFormat;
      const titleCurrencyDetail = _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('RedemptionStatisticsDetailTitle') + item.currency;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Row"], {
        key: `redemption-${index}`
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: "text-center link-click",
        onClick: () => this.handleOpenDetail(0, item.year, item.month, titleYearDetail)
      }, dateFormat), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: "text-center link-click",
        onClick: () => this.handleOpenDetail(item.currencyId, 0, 0, titleCurrencyDetail)
      }, item.currency), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: "text-center"
      }, Number(item.amount).toFixed(2)));
    });

    _defineProperty(this, "renderRowTotal", totals => {
      const totalArr = Object.entries(totals);
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Row"], {
        key: "totals-1",
        className: "background-total"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: "text-center text-bold",
        rowSpan: totalArr.length
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Total')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: "text-center text-bold"
      }, totalArr[0][0]), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: "text-center text-bold"
      }, Number(totalArr[0][1]).toFixed(2))), totalArr.length > 1 && totalArr.slice(1).map((element, key) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Row"], {
        key: `amount-${key}`,
        className: "background-total"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: "text-center text-bold"
      }, element[0]), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: "text-center text-bold"
      }, Number(element[1]).toFixed(2)))));
    });

    _defineProperty(this, "handleExportExcel", () => {
      const {
        gridParams
      } = this.props;
      this.props.exportExcel(gridParams);
    });

    _defineProperty(this, "handleOpenDetail", (currency, year, month, title = '') => {
      const {
        subject,
        currencyId,
        statusId,
        reportBy,
        fromDate,
        toDate
      } = this.props.gridParams;
      let fromDateDetail = '';
      let toDateDetail = '';

      if (year !== 0 && month !== 0) {
        fromDateDetail = moment__WEBPACK_IMPORTED_MODULE_6___default()(new Date(year, month - 1, 1));
        toDateDetail = moment__WEBPACK_IMPORTED_MODULE_6___default()(new Date(year, month, 0));
      } else if (year !== 0 && month === 0) {
        fromDateDetail = new Date('Jan 01, ' + year);
        toDateDetail = new Date('Dec 31, ' + year);
      } else {
        fromDateDetail = fromDate;
        toDateDetail = toDate;
      }

      if (currency === 0) {
        currency = currencyId;
      }

      const paramDetail = {
        fromDate: _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_7__["default"].toShortDateFormat(fromDateDetail),
        toDate: _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_7__["default"].toShortDateFormat(toDateDetail),
        subject: subject,
        currencyId: currency,
        statusId: statusId,
        reportBy: reportBy,
        pageIndex: 1,
        pageSize: 100
      };
      this.props.setOpenDetails({
        show: true,
        title: title
      });
      this.props.setGridParamDetails(paramDetail);
      this.props.getRedemptionDetails(paramDetail);
    });
  }

  render() {
    const {
      gridData
    } = this.props;

    if (!gridData || !gridData.data) {
      return null;
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "table-title d-flex justify-content-between align-items-center"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, gridData.title), gridData.data.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "fa fa-file-excel-o btn-export-excel icon-excel",
      onClick: this.handleExportExcel
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Table"], {
      width: 900,
      autoWidth: false,
      header: this.buildHeader(),
      body: this.buildBody(),
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

/***/ "./www/sources/js/pages/report/redemption-statistics/components/Detail.jsx":
/*!*********************************************************************************!*\
  !*** ./www/sources/js/pages/report/redemption-statistics/components/Detail.jsx ***!
  \*********************************************************************************/
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
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/report/redemption-statistics/actions.js");
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
        colWidth: 13
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('ClaimedDate')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["HeaderCell"], {
        colWidth: 17
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('Customer')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["HeaderCell"], {
        colWidth: 35
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('Subject')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["HeaderCell"], {
        colWidth: 10
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('Currency')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["HeaderCell"], {
        colWidth: 13
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('Amount')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["HeaderCell"], {
        colWidth: 12
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('Status')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["HeaderCell"], {
        colWidth: 13
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('Done By')));
    });

    _defineProperty(this, "buildBody", () => {
      const {
        gridDataDetails
      } = this.props;

      if (gridDataDetails.totalRows > 0) {
        return gridDataDetails.details.map((item, index) => this.renderRow(item, index));
      }

      return [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["Row"], {
        className: "no-data"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["Cell"], {
        className: "text-center",
        colSpan: 7
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('ThereIsNoData')))];
    });

    _defineProperty(this, "renderRow", (item, index) => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["Row"], {
        key: `redemption-detail-${index}`
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["Cell"], {
        className: "text-center"
      }, _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_5__["default"].toShortDateFormat(item.claimTime)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["Cell"], null, item.userName), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["Cell"], null, item.subject), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["Cell"], {
        className: "text-center"
      }, item.currency), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["Cell"], {
        className: "text-center"
      }, Number(item.amount).toFixed(2)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["Cell"], {
        className: "text-center"
      }, item.status), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["Cell"], null, item.doneBy));
    });

    _defineProperty(this, "handleExportExcel", () => {
      const params = this.props.gridParamDetails;
      this.props.exportExcelDetails(params);
    });

    _defineProperty(this, "handleGoBack", () => {
      this.props.setOpenDetails({
        show: false,
        title: ''
      });
    });

    _defineProperty(this, "onPaging", (pageIndex, pageSize) => {
      const params = _objectSpread({}, this.props.gridParamDetails);

      params['pageIndex'] = pageIndex;
      params['pageSize'] = pageSize;
      this.props.getRedemptionDetails(params);
      this.props.setGridParamDetails(params);
    });
  }

  render() {
    const {
      detailPopup,
      gridParamDetails,
      gridDataDetails
    } = this.props;

    if (gridDataDetails === null || !gridDataDetails) {
      return null;
    }

    const pagingOption = {
      PageIndex: gridParamDetails.pageIndex,
      PageSize: gridParamDetails.pageSize,
      TotalItem: gridDataDetails.totalRows,
      PageList: _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_8__["PAGING_SIZES"]
    };
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "details"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "table-title title-detail d-flex justify-content-between align-items-center"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, detailPopup.title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["OverlayTrigger"], {
      overlay: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Tooltip"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Go Back")),
      placement: "auto"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "fa fa-arrow-circle-left icon pl-3 fa-lg",
      onClick: () => this.handleGoBack()
    })), gridDataDetails.totalRows > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["OverlayTrigger"], {
      overlay: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Tooltip"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Export to Excel")),
      placement: "auto"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "fa fa-file-excel-o icon-excel pl-3",
      onClick: this.handleExportExcel
    })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["Table"], {
      width: 980,
      autoWidth: false,
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
    gridDataDetails,
    detailPopup
  } = state;
  return {
    gridParamDetails,
    gridDataDetails,
    detailPopup
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(Detail));

/***/ }),

/***/ "./www/sources/js/pages/report/redemption-statistics/components/Filter.jsx":
/*!*********************************************************************************!*\
  !*** ./www/sources/js/pages/report/redemption-statistics/components/Filter.jsx ***!
  \*********************************************************************************/
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
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/report/redemption-statistics/actions.js");
/* harmony import */ var _jsroot_components_date_picker_index__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/components/date-picker/index */ "./www/sources/js/components/date-picker/index.jsx");
/* harmony import */ var _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/common/dateTimeService */ "./www/sources/js/common/dateTimeService.js");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/lib/index.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_toastify__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @jsroot/common/constants */ "./www/sources/js/common/constants.js");
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
      const currentTime = this.currentDate;
      const fromDateGetTime = new Date(fromDate.getTime());
      fromDateGetTime.setMonth(fromDate.getMonth() + 12);
      fromDateGetTime.setDate(fromDate.getDate() - 1);
      this.maxToDate = fromDateGetTime < currentTime ? fromDateGetTime : currentTime;
      this.minToDate = fromDate;
      let toDate = fromDate > this.state.toDate ? fromDate : this.state.toDate;
      const isOverOneYear = _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_7__["default"].toDiffDays(currentTime, fromDate) > 365;

      if (isOverOneYear) {
        toDate = this.maxToDate;
      }

      this.setState({
        fromDate,
        toDate
      });
    });

    _defineProperty(this, "handleChangeDropdown", (name, selectedItemsKey) => {
      this.setState(_objectSpread(_objectSpread({}, this.state), {}, {
        [name]: selectedItemsKey
      }));
    });

    _defineProperty(this, "handleChange", evt => {
      this.setState(_objectSpread(_objectSpread({}, this.state), {}, {
        [evt.target.name]: evt.target.value
      }));
    });

    _defineProperty(this, "handleSettingOptions", settings => {
      const {
        statuses,
        currencies
      } = settings;
      const statusIdFilters = [];
      const currencyIdFilters = [];
      const statusOptions = statuses.map(item => {
        statusIdFilters.push(item.statusId);
        return {
          id: item.statusId,
          value: item.name,
          checked: true
        };
      });
      const currencyOptions = currencies.map(item => {
        currencyIdFilters.push(item.id);
        return {
          id: item.id,
          value: item.name,
          checked: true
        };
      });
      const statusIdFiltersJoin = statusIdFilters.join(',');
      const currencyIdFiltersJoin = currencyIdFilters.join(',');
      this.setState({
        statusOptions,
        currencyOptions,
        statusIds: statusIdFiltersJoin,
        currencyIds: currencyIdFiltersJoin
      });
    });

    _defineProperty(this, "handleToggleFilter", value => {
      this.setState({
        showFilter: value
      });
      window.dispatchEvent(new Event('resize'));
    });

    _defineProperty(this, "handleSubmit", () => {
      const {
        fromDate,
        toDate,
        reportBy,
        statusIds,
        currencyIds,
        subject
      } = this.state;

      if (statusIds === '') {
        react_toastify__WEBPACK_IMPORTED_MODULE_9__["toast"].error(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].formatString(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('FieldRequired'), _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('Status')));
        return;
      }

      if (currencyIds === '') {
        react_toastify__WEBPACK_IMPORTED_MODULE_9__["toast"].error(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].formatString(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('FieldRequired'), _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('Currency')));
        return;
      }

      const params = {
        fromDate: _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_7__["default"].toShortDateFormat(fromDate),
        toDate: _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_7__["default"].toShortDateFormat(toDate),
        subject: subject,
        currencyId: currencyIds,
        statusId: statusIds,
        reportBy: reportBy
      };
      this.props.setOpenDetails({
        show: false
      });
      this.props.setGridParams(params);
      this.props.getRedemptionSummary(params);
    });

    const currentClientTime = window.currentClientTime;
    this.currentDate = new Date(_jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_7__["default"].toShortDateTimeFormat(new Date(currentClientTime)));
    const currentDate = this.currentDate;
    const firstDateFirstMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1);
    const firstDateOfMonthFormat = new Date(_jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_7__["default"].toShortDateTimeFormat(new Date(firstDateFirstMonth)));
    this.maxFromDate = currentDate;
    this.maxToDate = currentDate;
    this.state = {
      fromDate: firstDateOfMonthFormat,
      toDate: currentDate,
      statusOptions: [],
      currencyOptions: [],
      statusIds: '',
      currencyIds: '',
      reportBy: 1,
      subject: '',
      showFilter: true
    };
  }

  componentDidMount() {
    this.handleSettingOptions(this.props.settings);
  }

  render() {
    const {
      fromDate,
      toDate,
      statusOptions,
      currencyOptions,
      reportBy,
      subject,
      showFilter
    } = this.state;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"], {
      className: "form-filter",
      onSubmit: this.handleSubmit
    }, showFilter && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Row, {
      bsPrefix: "form-row"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
      htmlFor: "fromDate"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('FromDate')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "react-datepicker-wrapper-container"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_date_picker_index__WEBPACK_IMPORTED_MODULE_6__["default"], {
      peekNextMonth: true,
      showMonthDropdown: true,
      showYearDropdown: true,
      dropdownMode: "select",
      maxDate: new Date(this.maxFromDate),
      selected: fromDate,
      onChange: value => this.handleChangeFromDate(value)
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
      className: "label-width"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('ToDate')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "react-datepicker-wrapper-container"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_date_picker_index__WEBPACK_IMPORTED_MODULE_6__["default"], {
      minDate: fromDate,
      maxDate: new Date(this.maxToDate),
      selected: toDate,
      peekNextMonth: true,
      showMonthDropdown: true,
      showYearDropdown: true,
      dropdownMode: "select",
      onChange: value => this.handleChangeToDate(value)
    })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Row, {
      bsPrefix: "form-row"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
      htmlFor: "statusIds"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('Status')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "form-control-wrapper dropdown-width"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_multiple_select_index__WEBPACK_IMPORTED_MODULE_4__["default"], {
      valueField: "value",
      dataSource: statusOptions,
      keyField: "id",
      maxDisplayItemCount: 0,
      onChange: (currentItem, selectedItemsKey) => {
        this.handleChangeDropdown('statusIds', selectedItemsKey);
      },
      hasSearchBox: true,
      isNAOption: true
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
      htmlFor: "currencyIds"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('Currency')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "form-control-wrapper dropdown-width"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_multiple_select_index__WEBPACK_IMPORTED_MODULE_4__["default"], {
      valueField: "value",
      dataSource: currencyOptions,
      keyField: "id",
      maxDisplayItemCount: 0,
      onChange: (currentItem, selectedItemsKey) => {
        this.handleChangeDropdown('currencyIds', selectedItemsKey);
      },
      hasSearchBox: true,
      isNAOption: true
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
      htmlFor: "reportBy"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('ReportBy')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Control, {
      as: "select",
      size: "sm",
      name: "reportBy",
      id: "reportBy",
      value: reportBy,
      onChange: this.handleChange
    }, _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_10__["ReportBy"].map((value, key) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
      key: key,
      value: value.id
    }, value.name))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Row, {
      bsPrefix: "form-row"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, {
      style: {
        width: 533
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
      htmlFor: "subject"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('Subject')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Control, {
      type: "text",
      size: "sm",
      value: subject,
      name: "subject",
      id: "subject",
      className: "shadow-none subject-width",
      autoComplete: "off",
      onChange: this.handleChange
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, {
      className: "submit"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], {
      variant: "primary",
      size: "sm",
      onClick: this.handleSubmit
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('Submit'))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "text-center filter-collapse"
    }, showFilter ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "fa-sm fa fa-caret-up",
      onClick: () => this.handleToggleFilter(false)
    }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "fa-sm fa fa-caret-down",
      onClick: () => this.handleToggleFilter(true)
    })));
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

/***/ "./www/sources/js/pages/report/redemption-statistics/index.js":
/*!********************************************************************!*\
  !*** ./www/sources/js/pages/report/redemption-statistics/index.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return index; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @reduxjs/toolkit */ "./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");
/* harmony import */ var _redemptionStatisticsSlice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./redemptionStatisticsSlice */ "./www/sources/js/pages/report/redemption-statistics/redemptionStatisticsSlice.js");
/* harmony import */ var _components_AppContainer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/AppContainer */ "./www/sources/js/pages/report/redemption-statistics/components/AppContainer.jsx");
/* harmony import */ var _cssroot_pages_report_redemption_statistics_index_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @cssroot/pages/report/redemption-statistics/index.scss */ "./www/sources/css/pages/report/redemption-statistics/index.scss");
/* harmony import */ var _cssroot_pages_report_redemption_statistics_index_scss__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_cssroot_pages_report_redemption_statistics_index_scss__WEBPACK_IMPORTED_MODULE_5__);





const store = Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__["configureStore"])({
  reducer: _redemptionStatisticsSlice__WEBPACK_IMPORTED_MODULE_3__["default"]
});

class index extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_1__["Provider"], {
      store: store
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "redemption-statistics"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_AppContainer__WEBPACK_IMPORTED_MODULE_4__["default"], null)));
  }

}

/***/ }),

/***/ "./www/sources/js/pages/report/redemption-statistics/redemptionStatisticsSlice.js":
/*!****************************************************************************************!*\
  !*** ./www/sources/js/pages/report/redemption-statistics/redemptionStatisticsSlice.js ***!
  \****************************************************************************************/
/*! exports provided: resetState, setGridParams, setGridParamDetails, setAllSettings, setRedemptionSummary, setRedemptionDetails, setOpenDetails, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetState", function() { return resetState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setGridParams", function() { return setGridParams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setGridParamDetails", function() { return setGridParamDetails; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setAllSettings", function() { return setAllSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setRedemptionSummary", function() { return setRedemptionSummary; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setRedemptionDetails", function() { return setRedemptionDetails; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setOpenDetails", function() { return setOpenDetails; });
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @reduxjs/toolkit */ "./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");

const initialState = {
  settings: null,
  gridParams: null,
  gridParamDetails: {
    pageIndex: 1,
    pageSize: 100
  },
  gridData: null,
  gridDataDetails: null,
  detailPopup: {
    show: false,
    title: ''
  }
};
const redemptionStatisticsSlice = Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__["createSlice"])({
  name: 'redemptionStatistics',
  initialState: initialState,
  reducers: {
    resetState: () => initialState,
    setGridParams: (state, action) => {
      state.gridParams = action.payload;
    },
    setAllSettings: (state, action) => {
      state.settings = action.payload;
    },
    setRedemptionSummary: (state, action) => {
      state.gridData = action.payload;
    },
    setGridParamDetails: (state, action) => {
      state.gridParamDetails = action.payload;
    },
    setRedemptionDetails: (state, action) => {
      state.gridDataDetails = action.payload;
    },
    setOpenDetails: (state, action) => {
      state.detailPopup = action.payload;
    }
  }
});
const {
  actions,
  reducer
} = redemptionStatisticsSlice;
const {
  resetState,
  setGridParams,
  setGridParamDetails,
  setAllSettings,
  setRedemptionSummary,
  setRedemptionDetails,
  setOpenDetails
} = actions;
/* harmony default export */ __webpack_exports__["default"] = (reducer);

/***/ })

}]);
//# sourceMappingURL=20.chunk.js.map