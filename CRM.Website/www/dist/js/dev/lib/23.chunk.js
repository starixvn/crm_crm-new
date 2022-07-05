(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[23],{

/***/ "./www/sources/css/pages/action-log/index.scss":
/*!*****************************************************!*\
  !*** ./www/sources/css/pages/action-log/index.scss ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./www/sources/js/pages/action-log/actionLogSlice.js":
/*!***********************************************************!*\
  !*** ./www/sources/js/pages/action-log/actionLogSlice.js ***!
  \***********************************************************/
/*! exports provided: resetState, setAllLogAction, setActivityLog, setGridParams, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetState", function() { return resetState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setAllLogAction", function() { return setAllLogAction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setActivityLog", function() { return setActivityLog; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setGridParams", function() { return setGridParams; });
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @reduxjs/toolkit */ "./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");

const initialState = {
  allLogActions: null,
  activityLogs: null,
  gridParams: {
    pageIndex: 1,
    pageSize: 100
  }
};
const actionLogSlice = Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__["createSlice"])({
  name: 'actionLog',
  initialState: initialState,
  reducers: {
    resetState: () => initialState,
    setAllLogAction: (state, action) => {
      state.allLogActions = action.payload;
    },
    setActivityLog: (state, action) => {
      state.activityLogs = action.payload;
    },
    setGridParams: (state, action) => {
      state.gridParams = action.payload;
    }
  }
});
const {
  actions,
  reducer
} = actionLogSlice;
const {
  resetState,
  setAllLogAction,
  setActivityLog,
  setGridParams
} = actions;
/* harmony default export */ __webpack_exports__["default"] = (reducer);

/***/ }),

/***/ "./www/sources/js/pages/action-log/actions.js":
/*!****************************************************!*\
  !*** ./www/sources/js/pages/action-log/actions.js ***!
  \****************************************************/
/*! exports provided: ActionCreators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionCreators", function() { return ActionCreators; });
/* harmony import */ var _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/common/dataService */ "./www/sources/js/common/dataService.js");
/* harmony import */ var _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/common/site */ "./www/sources/js/common/site.js");
/* harmony import */ var _actionLogSlice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actionLogSlice */ "./www/sources/js/pages/action-log/actionLogSlice.js");




const getAllLogAction = params => async dispatch => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl(`ActionLog/GetAllLogAction`);
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__["default"].getDataAsync(url, params).then(response => {
    dispatch(Object(_actionLogSlice__WEBPACK_IMPORTED_MODULE_2__["setAllLogAction"])(response.data));
  });
};

const getActivityLog = params => async dispatch => {
  _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].blockUI();
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('ActionLog/GetActivityLog');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__["default"].postDataAsync(url, params).then(response => {
    dispatch(Object(_actionLogSlice__WEBPACK_IMPORTED_MODULE_2__["setActivityLog"])(response.data));
  }).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].unblockUI());
};

const ActionCreators = {
  resetState: _actionLogSlice__WEBPACK_IMPORTED_MODULE_2__["resetState"],
  getAllLogAction,
  getActivityLog,
  setGridParams: _actionLogSlice__WEBPACK_IMPORTED_MODULE_2__["setGridParams"]
};

/***/ }),

/***/ "./www/sources/js/pages/action-log/components/AppContainer.jsx":
/*!*********************************************************************!*\
  !*** ./www/sources/js/pages/action-log/components/AppContainer.jsx ***!
  \*********************************************************************/
/*! exports provided: AppContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppContainer", function() { return AppContainer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Filter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Filter */ "./www/sources/js/pages/action-log/components/Filter.jsx");
/* harmony import */ var _DataGrid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DataGrid */ "./www/sources/js/pages/action-log/components/DataGrid.jsx");



class AppContainer extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Filter__WEBPACK_IMPORTED_MODULE_1__["default"], {
      id: this.props.id
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DataGrid__WEBPACK_IMPORTED_MODULE_2__["default"], null));
  }

}
/* harmony default export */ __webpack_exports__["default"] = (AppContainer);

/***/ }),

/***/ "./www/sources/js/pages/action-log/components/DataGrid.jsx":
/*!*****************************************************************!*\
  !*** ./www/sources/js/pages/action-log/components/DataGrid.jsx ***!
  \*****************************************************************/
/*! exports provided: DataGrid, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataGrid", function() { return DataGrid; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/action-log/actions.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/components/react-grid/index */ "./www/sources/js/components/react-grid/index.jsx");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/common/constants */ "./www/sources/js/common/constants.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








class DataGrid extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "buildHeader", () => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderRow"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 15
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('LogTime')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 15
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('EditedBy')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 12
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Action')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 15
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('FieldName')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 25
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('OldValue')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 25
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('NewValue')));
    });

    _defineProperty(this, "buildBody", () => {
      const {
        activityLogs
      } = this.props;

      if (activityLogs.data.length > 0) {
        return activityLogs.data.map((item, index) => this.renderRow(item, index));
      }

      return [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Row"], {
        key: `body${1}`,
        className: "no-data"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: "text-center",
        colSpan: 6
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('ThereIsNoData')))];
    });

    _defineProperty(this, "renderRow", (item, index) => {
      const color = index % 2 === 0 ? 'grid-blue' : 'grid-white';
      const rowSpan = item.fieldNames.length > 0 ? item.fieldNames.length : null;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Row"], {
        key: index
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: `text-center ${color}`,
        rowSpan: rowSpan
      }, item.logDate), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: color,
        rowSpan: rowSpan
      }, item.username), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: color,
        rowSpan: rowSpan
      }, item.actionName), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: color
      }, item.fieldNames[0]), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: color,
        dangerouslySetInnerHTML: {
          __html: this.renderValue(item.fieldNames[0], item.oldValuesList[0])
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: color,
        dangerouslySetInnerHTML: {
          __html: this.renderValue(item.fieldNames[0], item.newValuesList[0])
        }
      })), item.fieldNames.length > 1 && item.fieldNames.slice(1).map((element, key) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Row"], {
        key: key
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: color
      }, item.fieldNames[key + 1]), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: color,
        dangerouslySetInnerHTML: {
          __html: this.renderValue(item.fieldNames[key + 1], item.oldValuesList[key + 1])
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: color,
        dangerouslySetInnerHTML: {
          __html: this.renderValue(item.fieldNames[key + 1], item.newValuesList[key + 1])
        }
      }))));
    });

    _defineProperty(this, "isEncode", fieldName => {
      return fieldName !== 'Remark' && fieldName !== 'Solution' && fieldName !== 'Review' && fieldName !== 'SpecialRemark';
    });

    _defineProperty(this, "replaceText", text => text ? text.replace('\\n', '<br />').replace('\\r', '<br />') : '');

    _defineProperty(this, "encodeHtml", value => {
      const item = value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
      return item;
    });

    _defineProperty(this, "renderValue", (fieldName, value) => {
      value = this.replaceText(value);

      if (this.isEncode(fieldName)) {
        value = this.encodeHtml(value);
      }

      return value;
    });

    _defineProperty(this, "onPaging", (pageIndex, pageSize) => {
      const params = _objectSpread({}, this.props.gridParams);

      params['pageSize'] = pageSize;
      params['pageIndex'] = pageIndex;
      this.props.setGridParams(params);
      this.props.getActivityLog(params);
    });
  }

  render() {
    const {
      activityLogs
    } = this.props;

    if (!activityLogs || !activityLogs.data) {
      return null;
    }

    const {
      pageIndex,
      pageSize
    } = this.props.gridParams;
    const pagingOption = {
      PageIndex: pageIndex,
      PageSize: pageSize,
      TotalItem: activityLogs.totalItems,
      PageList: _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_6__["PAGING_SIZES"]
    };
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "justify-content-between table-title d-flex align-items-center"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('CustomerActivityLogs'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Table"], {
      autoWidth: false,
      width: 1200,
      header: this.buildHeader(),
      body: this.buildBody(),
      isPaging: true,
      containerPadding: 0,
      adjustedHeight: 10,
      pageOption: pagingOption,
      onPaging: this.onPaging
    }));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_3__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    activityLogs,
    gridParams
  } = state;
  return {
    activityLogs,
    gridParams
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(DataGrid));

/***/ }),

/***/ "./www/sources/js/pages/action-log/components/Filter.jsx":
/*!***************************************************************!*\
  !*** ./www/sources/js/pages/action-log/components/Filter.jsx ***!
  \***************************************************************/
/*! exports provided: Filter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Filter", function() { return Filter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/action-log/actions.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var _jsroot_components_date_picker_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/components/date-picker/index */ "./www/sources/js/components/date-picker/index.jsx");
/* harmony import */ var _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/common/dateTimeService */ "./www/sources/js/common/dateTimeService.js");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









class Filter extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleChangeToDate", date => {
      this.setState({
        toDate: date,
        maxFromDate: date
      });
    });

    _defineProperty(this, "handleChange", event => {
      const name = event.target.name;
      this.setState({
        [name]: event.target.type === 'select-one' ? parseInt(event.target.value, 10) : event.target.value
      });
    });

    _defineProperty(this, "handleChangeFromDate", date => {
      this.setState({
        fromDate: date,
        minToDate: date
      });
    });

    _defineProperty(this, "handleSubmit", event => {
      event.preventDefault();
      const {
        handler,
        fromDate,
        toDate
      } = this.state;
      const params = {
        actionId: 0,
        customerId: this.props.id,
        handler: handler,
        fromDate: _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__["default"].toLongDateTimeFormat(_jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__["default"].toServerDateTime(fromDate)),
        toDate: _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__["default"].toLongDateTimeFormat(_jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__["default"].toServerDateTime(toDate)),
        pageIndex: 1,
        pageSize: 100
      };
      this.props.setGridParams(params);
      this.props.getActivityLog(params);
    });

    _defineProperty(this, "renderOptions", (name, item, key) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
      key: key,
      value: item
    }, name));

    const _date = new Date();

    const currentClientTime = window.currentClientTime;
    const currentDate = new Date(_jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__["default"].toShortDateTimeFormat(new Date(currentClientTime)));

    const _fromDate = new Date(_jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__["default"].firstDayOfMonth(_date));

    this.state = {
      fromDate: _fromDate,
      minFromDate: '',
      maxFromDate: currentDate,
      toDate: currentDate,
      minToDate: _fromDate,
      maxToDate: currentDate,
      handler: ''
    };
  }

  componentDidMount() {
    this.props.getAllLogAction({
      actionType: 1
    });
  }

  componentWillUnmount() {
    this.props.resetState();
  }

  render() {
    const {
      allLogActions
    } = this.props;

    if (!allLogActions) {
      return null;
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"], {
      className: "form-filter",
      onSubmit: this.handleSubmit
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Row, {
      bsPrefix: "form-row"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
      className: "col-form-label col-auto"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Handler')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
      as: "input",
      size: "sm",
      value: this.state.handler,
      className: "shadow-none",
      name: "handler",
      id: "handler",
      autoComplete: "off",
      onChange: this.handleChange
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
      className: "col-form-label col-auto"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('FromDate')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "react-datepicker-wrapper-container"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_date_picker_index__WEBPACK_IMPORTED_MODULE_5__["default"], {
      dropdownMode: "select",
      showMonthDropdown: true,
      showYearDropdown: true,
      maxDate: this.state.maxFromDate,
      minDate: this.state.minFromDate,
      selected: this.state.fromDate,
      onChange: value => this.handleChangeFromDate(value)
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
      className: "col-form-label col-auto"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('ToDate')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "react-datepicker-wrapper-container"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_date_picker_index__WEBPACK_IMPORTED_MODULE_5__["default"], {
      dropdownMode: "select",
      showMonthDropdown: true,
      showYearDropdown: true,
      maxDate: this.state.maxToDate,
      minDate: this.state.minToDate,
      selected: this.state.toDate,
      onChange: value => this.handleChangeToDate(value)
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
      className: "col-form-label col-auto"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Action')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
      as: "select",
      size: "sm",
      className: "shadow-none",
      name: "actionLogId",
      onChange: this.handleChange
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
      value: "0"
    }, "All"), allLogActions.map((value, key) => this.renderOptions(value.name, value.id, key)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "form-group-button mb-3"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], {
      type: "submit",
      variant: "primary",
      size: "sm"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Submit')))));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_3__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    allLogActions
  } = state;
  return {
    allLogActions
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(Filter));

/***/ }),

/***/ "./www/sources/js/pages/action-log/index.js":
/*!**************************************************!*\
  !*** ./www/sources/js/pages/action-log/index.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @reduxjs/toolkit */ "./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");
/* harmony import */ var _actionLogSlice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actionLogSlice */ "./www/sources/js/pages/action-log/actionLogSlice.js");
/* harmony import */ var _components_AppContainer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/AppContainer */ "./www/sources/js/pages/action-log/components/AppContainer.jsx");
/* harmony import */ var _jsroot_components_WithNavigation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/components/WithNavigation */ "./www/sources/js/components/WithNavigation.jsx");
/* harmony import */ var _cssroot_pages_action_log_index_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @cssroot/pages/action-log/index.scss */ "./www/sources/css/pages/action-log/index.scss");
/* harmony import */ var _cssroot_pages_action_log_index_scss__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_cssroot_pages_action_log_index_scss__WEBPACK_IMPORTED_MODULE_6__);






const store = Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__["configureStore"])({
  reducer: _actionLogSlice__WEBPACK_IMPORTED_MODULE_3__["default"]
});


class index extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_1__["Provider"], {
      store: store
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "actionLog"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_AppContainer__WEBPACK_IMPORTED_MODULE_4__["default"], {
      id: !location.state ? null : location.state.toString()
    })));
  }

}

const FunctionBarWithNavigation = Object(_jsroot_components_WithNavigation__WEBPACK_IMPORTED_MODULE_5__["default"])(index);
/* harmony default export */ __webpack_exports__["default"] = (FunctionBarWithNavigation);

/***/ })

}]);
//# sourceMappingURL=23.chunk.js.map