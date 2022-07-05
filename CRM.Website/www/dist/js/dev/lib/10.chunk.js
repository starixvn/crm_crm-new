(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[10],{

/***/ "./www/sources/css/pages/pic-and-headline/changes-log/index.scss":
/*!***********************************************************************!*\
  !*** ./www/sources/css/pages/pic-and-headline/changes-log/index.scss ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./www/sources/js/pages/pic-and-headline/changes-log/actions.js":
/*!**********************************************************************!*\
  !*** ./www/sources/js/pages/pic-and-headline/changes-log/actions.js ***!
  \**********************************************************************/
/*! exports provided: ActionCreators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionCreators", function() { return ActionCreators; });
/* harmony import */ var _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/common/site */ "./www/sources/js/common/site.js");
/* harmony import */ var _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/common/dataService */ "./www/sources/js/common/dataService.js");
/* harmony import */ var _changesLogSlice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./changesLogSlice */ "./www/sources/js/pages/pic-and-headline/changes-log/changesLogSlice.js");




const getHeadlineDAReport = params => async dispatch => {
  _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].blockUI();
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl('ChangesLog/GetHeadlineDAReportAsync');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__["default"].postDataAsync(url, params).then(response => {
    dispatch(Object(_changesLogSlice__WEBPACK_IMPORTED_MODULE_2__["setHeadlineDA"])(response.data));
  }).catch(_jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].handleAxiosError).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].unblockUI());
};

const getPicReport = params => async dispatch => {
  _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].blockUI();
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl('ChangesLog/GetPicReportAsync');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__["default"].postDataAsync(url, params).then(response => {
    dispatch(Object(_changesLogSlice__WEBPACK_IMPORTED_MODULE_2__["setPicReport"])(response.data));
  }).catch(_jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].handleAxiosError).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].unblockUI());
};

const getActionTypes = () => async () => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl('ChangesLog/GetActionTypesAsync');
  return await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__["default"].getDataAsync(url).then(response => response.data);
};

const ActionCreators = {
  resetState: _changesLogSlice__WEBPACK_IMPORTED_MODULE_2__["resetState"],
  setGridParams: _changesLogSlice__WEBPACK_IMPORTED_MODULE_2__["setGridParams"],
  setGridParamsPic: _changesLogSlice__WEBPACK_IMPORTED_MODULE_2__["setGridParamsPic"],
  setHeadlineDA: _changesLogSlice__WEBPACK_IMPORTED_MODULE_2__["setHeadlineDA"],
  setPicReport: _changesLogSlice__WEBPACK_IMPORTED_MODULE_2__["setPicReport"],
  setActionType: _changesLogSlice__WEBPACK_IMPORTED_MODULE_2__["setActionType"],
  getHeadlineDAReport,
  getPicReport,
  getActionTypes
};

/***/ }),

/***/ "./www/sources/js/pages/pic-and-headline/changes-log/changesLogSlice.js":
/*!******************************************************************************!*\
  !*** ./www/sources/js/pages/pic-and-headline/changes-log/changesLogSlice.js ***!
  \******************************************************************************/
/*! exports provided: resetState, setGridParams, setGridParamsPic, setHeadlineDA, setPicReport, setActionType, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetState", function() { return resetState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setGridParams", function() { return setGridParams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setGridParamsPic", function() { return setGridParamsPic; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setHeadlineDA", function() { return setHeadlineDA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setPicReport", function() { return setPicReport; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setActionType", function() { return setActionType; });
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @reduxjs/toolkit */ "./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");

const initialState = {
  gridParams: {
    userName: null,
    editBy: null,
    actionTypeIds: '',
    fromDate: null,
    toDate: null,
    pageIndex: 1,
    pageSize: 100
  },
  gridParamsPic: {
    picName: null,
    editBy: null,
    fromDate: null,
    toDate: null,
    pageIndex: 1,
    pageSize: 100
  },
  headlineDA: null,
  picReport: null,
  actionType: null
};
const picManagementSlice = Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__["createSlice"])({
  name: 'ChangesLog',
  initialState: initialState,
  reducers: {
    resetState: () => initialState,
    setGridParams: (state, action) => {
      state.gridParams = action.payload;
    },
    setGridParamsPic: (state, action) => {
      state.gridParamsPic = action.payload;
    },
    setHeadlineDA: (state, action) => {
      state.headlineDA = action.payload;
    },
    setPicReport: (state, action) => {
      state.picReport = action.payload;
    },
    setActionType: (state, action) => {
      state.actionType = action.payload;
    }
  }
});
const {
  actions,
  reducer
} = picManagementSlice;
const {
  resetState,
  setGridParams,
  setGridParamsPic,
  setHeadlineDA,
  setPicReport,
  setActionType
} = actions;
/* harmony default export */ __webpack_exports__["default"] = (reducer);

/***/ }),

/***/ "./www/sources/js/pages/pic-and-headline/changes-log/components/AppContainer.jsx":
/*!***************************************************************************************!*\
  !*** ./www/sources/js/pages/pic-and-headline/changes-log/components/AppContainer.jsx ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AppContainer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Filter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Filter */ "./www/sources/js/pages/pic-and-headline/changes-log/components/Filter.jsx");
/* harmony import */ var _DataGrid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DataGrid */ "./www/sources/js/pages/pic-and-headline/changes-log/components/DataGrid.jsx");
/* harmony import */ var _PicFilter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./PicFilter */ "./www/sources/js/pages/pic-and-headline/changes-log/components/PicFilter.jsx");
/* harmony import */ var _PicDataGrid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./PicDataGrid */ "./www/sources/js/pages/pic-and-headline/changes-log/components/PicDataGrid.jsx");





class AppContainer extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  render() {
    return this.props.tab === 1 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Filter__WEBPACK_IMPORTED_MODULE_1__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DataGrid__WEBPACK_IMPORTED_MODULE_2__["default"], null)) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_PicFilter__WEBPACK_IMPORTED_MODULE_3__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_PicDataGrid__WEBPACK_IMPORTED_MODULE_4__["default"], null));
  }

}

/***/ }),

/***/ "./www/sources/js/pages/pic-and-headline/changes-log/components/DataGrid.jsx":
/*!***********************************************************************************!*\
  !*** ./www/sources/js/pages/pic-and-headline/changes-log/components/DataGrid.jsx ***!
  \***********************************************************************************/
/*! exports provided: DataGrid, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataGrid", function() { return DataGrid; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/pic-and-headline/changes-log/actions.js");
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
        colWidth: 5
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('SymbolNo')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 7
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('LogID')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 15
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('LogDate')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 12
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('EditBy')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 17
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('HeadlineDA')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 25
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Action')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 60
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Detail')));
    });

    _defineProperty(this, "buildBody", () => {
      const {
        headlineDA,
        gridParams
      } = this.props;
      const {
        pageIndex,
        pageSize
      } = gridParams;
      this.startIndex = (pageIndex - 1) * pageSize + 1;

      if (headlineDA.logInfo.length > 0) {
        return headlineDA.logInfo.map((item, index) => this.renderRow(item, index));
      }

      return [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Row"], {
        key: `body${1}`,
        className: "no-data"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: "text-center",
        colSpan: 7
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('ThereIsNoData')))];
    });

    _defineProperty(this, "renderRow", (item, index) => {
      const detailValue = this.renderDetailsValue(item);
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Row"], {
        key: index
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: "text-center"
      }, index + this.startIndex), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: "text-center"
      }, item.logId), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: "text-center",
        style: {
          whiteSpace: 'pre-line'
        },
        dangerouslySetInnerHTML: {
          __html: item.logTime
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], null, item.editBy), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], null, item.directAccount), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], null, item.action), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], null, detailValue));
    });

    _defineProperty(this, "renderDetailsValue", item => {
      let detailValue = '';
      const isDetailPicAndGroupHl = item.actionId === _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_6__["LogActions"].RemoveDirectAccountFromPic || item.actionId === _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_6__["LogActions"].AssignDirectAccountToPic || item.actionId === _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_6__["LogActions"].RemoveDefaultPicForAGroupHeadline;

      if (isDetailPicAndGroupHl) {
        detailValue = this.getDetailValuePicAndGroupHl(item, false);
      } else {
        detailValue = this.renderDetailsValuePicAndGroupHlBoth(item);
      }

      return detailValue;
    });

    _defineProperty(this, "renderDetailsValuePicAndGroupHlBoth", item => {
      let detailValue = '';

      switch (item.actionId) {
        case _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_6__["LogActions"].UpdateThePicOfAHeadline:
          detailValue = this.getDetailValueGroupHeadlineAndPicBoth(item, false);
          break;

        case _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_6__["LogActions"].UpdateDefaultPicForAGroupHeadline:
          detailValue = this.getDetailValuePicBoth(item);
          break;

        case _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_6__["LogActions"].AddCustomerToCreditTermGroup:
        case _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_6__["LogActions"].RemoveCustomerFromCreditTermGroup:
        case _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_6__["LogActions"].AddTheGeneralInformationForSuperFromExistingSuper:
          detailValue = this.getDetailValuePicAndGroupHl(item, true);
          break;

        case _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_6__["LogActions"].UpdateCreditTerm:
          detailValue = this.getDetailValueGroupHeadlineAndPicBoth(item, true);
          break;

        case _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_6__["LogActions"].SetCustomerToCreditTermGroup:
          detailValue = this.renderHtmlDetailValue(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('IsGroupHeadline'), null, '', true);
          break;
      }

      return detailValue;
    });

    _defineProperty(this, "getDetailValuePicAndGroupHl", (item, isGroupHl) => {
      const picsValue = this.getStringPics(item.newDAInfo.pics);
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "container-detail border-bottom-0 min-height-38px"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "detail-child-col col-title-detail"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "p-2"
      }, isGroupHl ? _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('GroupHeadline') : _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('PIC'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "detail-child-col border-right-0"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "p-2 pl-5"
      }, isGroupHl ? item.newDAInfo.groupHeadline : picsValue)));
    });

    _defineProperty(this, "getDetailValueGroupHeadlineAndPicBoth", (item, isGroupHeadline) => {
      const oldGroupHeadlineString = this.getStringValue(item.oldDAInfo.groupHeadline);
      const newGroupHeadlineString = this.getStringValue(item.newDAInfo.groupHeadline);
      const groupHeadlineValue = this.changeValueToHtmlString(oldGroupHeadlineString, newGroupHeadlineString);
      const oldPicString = this.getStringPics(item.oldDAInfo.pics);
      const newPicString = this.getStringPics(item.newDAInfo.pics);
      const picsValue = this.changeValueToHtmlString(oldPicString, newPicString);
      const oldIsGroupHeadline = this.convertBoolToDecision(item.oldDAInfo.isGroupHeadline);
      const newIsGroupHeadline = this.convertBoolToDecision(item.newDAInfo.isGroupHeadline);
      const isGroupHeadlineValue = this.changeValueToHtmlString(oldIsGroupHeadline, newIsGroupHeadline);
      const isBackGroundChangeGroupHl = oldIsGroupHeadline !== newIsGroupHeadline;
      const isBackGroundChangePic = oldPicString !== newPicString;
      const backGroundChangeGroupHl = isBackGroundChangeGroupHl ? _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_6__["BackGroundChange"] : '';
      const backGroundChangePic = isBackGroundChangePic ? _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_6__["BackGroundChange"] : '';
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "container-detail border-bottom-none min-height-38px"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "detail-child-col col-title-detail"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "p-2"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('GroupHeadline'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: `detail-child-col col-value-detail ${oldGroupHeadlineString !== newGroupHeadlineString ? _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_6__["BackGroundChange"] : ''}`
      }, groupHeadlineValue), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "detail-child-col col-title-detail"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "p-2"
      }, isGroupHeadline ? _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('IsGroupHeadline') : _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('PIC'))), isGroupHeadline ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: `detail-child-col col-value-detail ${backGroundChangeGroupHl}`
      }, isGroupHeadlineValue) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: `detail-child-col col-value-detail ${backGroundChangePic}`
      }, picsValue));
    });

    _defineProperty(this, "getDetailValuePicBoth", item => {
      const oldPicString = this.getStringPics(item.oldDAInfo.pics);
      const newPicString = this.getStringPics(item.newDAInfo.pics);
      const picsValue = this.changeValueToHtmlString(oldPicString, newPicString);
      const backgroundChange = oldPicString !== newPicString ? _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_6__["BackGroundChange"] : '';
      return this.renderHtmlDetailValue(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('PIC'), picsValue, backgroundChange, false);
    });

    _defineProperty(this, "renderHtmlDetailValue", (name, value, backgroundChange, isGroupHeadline) => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "container-detail border-bottom-none min-height-38px"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "detail-child-col col-title-detail"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "p-2"
      }, name)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: `detail-child-col ${!isGroupHeadline ? backgroundChange : 'p-2 pl-5'}`
      }, !isGroupHeadline ? value : 'Yes'));
    });

    _defineProperty(this, "convertBoolToDecision", value => {
      if (value === true) {
        return 'Yes';
      } else if (value === false) {
        return 'No';
      } else {
        return '-';
      }
    });

    _defineProperty(this, "changeValueToHtmlString", (oldValue, newValue) => {
      const isChange = newValue !== oldValue;
      return isChange ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "new-value"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "p-2 pl-5"
      }, newValue)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "old-value"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "p-2 pl-5"
      }, oldValue))) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "p-2 pl-5"
      }, newValue);
    });

    _defineProperty(this, "getStringValue", value => value ? value : '-');

    _defineProperty(this, "getStringPics", pics => {
      if (pics && pics.length > 0) {
        return pics.map(pic => `${pic.picName} (${pic.roleName})`).join(', ');
      }

      return '-';
    });

    _defineProperty(this, "onPaging", (pageIndex, pageSize) => {
      const params = _objectSpread({}, this.props.gridParams);

      params['pageSize'] = pageSize;
      params['pageIndex'] = pageIndex;
      this.props.setGridParams(params);
      this.props.getHeadlineDAReport(params);
    });
  }

  render() {
    const {
      headlineDA
    } = this.props;

    if (!headlineDA || !headlineDA.logInfo) {
      return null;
    }

    const {
      pageIndex,
      pageSize
    } = this.props.gridParams;
    const pagingOption = {
      PageIndex: pageIndex,
      PageSize: pageSize,
      TotalItem: headlineDA.totals,
      PageList: _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_6__["PAGING_SIZES"]
    };
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "table-title d-flex justify-content-between align-items-center"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('ChangesLog'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Table"], {
      width: 1400,
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

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_3__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    headlineDA,
    gridParams
  } = state;
  return {
    headlineDA,
    gridParams
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(DataGrid));

/***/ }),

/***/ "./www/sources/js/pages/pic-and-headline/changes-log/components/Filter.jsx":
/*!*********************************************************************************!*\
  !*** ./www/sources/js/pages/pic-and-headline/changes-log/components/Filter.jsx ***!
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
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/pic-and-headline/changes-log/actions.js");
/* harmony import */ var _jsroot_components_date_picker_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/components/date-picker/index */ "./www/sources/js/components/date-picker/index.jsx");
/* harmony import */ var _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/common/dateTimeService */ "./www/sources/js/common/dateTimeService.js");
/* harmony import */ var _jsroot_components_multiple_select_index__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/components/multiple-select/index */ "./www/sources/js/components/multiple-select/index.jsx");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/lib/index.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_toastify__WEBPACK_IMPORTED_MODULE_10__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }












class Filter extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleActionTypes", actionType => {
      const actionTypeId = [];
      const actionTypeOptions = actionType.map(item => {
        actionTypeId.push(item.actionTypeID);
        return {
          id: item.actionTypeID,
          name: item.actionTypeName,
          checked: true
        };
      });
      const actionTypeIds = actionTypeId.join(',');
      this.setState({
        actionTypeOptions,
        actionTypeIds
      });
    });

    _defineProperty(this, "handleChangeToDate", toDate => {
      this.setState({
        toDate
      });
    });

    _defineProperty(this, "handleChangeFromDate", fromDate => {
      const currentTime = new Date(_jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__["default"].toShortDateTimeFormat(new Date(window.currentClientTime)));
      const maxDate = new Date(fromDate.getTime());
      maxDate.setMonth(fromDate.getMonth() + 1);
      this.maxToDate = maxDate < currentTime ? maxDate : currentTime;
      this.minToDate = fromDate;
      this.setState({
        toDate: maxDate < currentTime ? maxDate : currentTime,
        fromDate: fromDate
      });
    });

    _defineProperty(this, "handleChange", evt => {
      this.setState(_objectSpread(_objectSpread({}, this.state), {}, {
        [evt.target.name]: evt.target.value
      }));
    });

    _defineProperty(this, "handleSubmit", () => {
      const {
        headlineDA,
        fromDate,
        toDate,
        editBy,
        actionTypeIds
      } = this.state;

      if (actionTypeIds === '') {
        react_toastify__WEBPACK_IMPORTED_MODULE_10__["toast"].error(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].formatString(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('FieldRequired'), _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('ActionType')));
        return;
      }

      const params = {
        userName: headlineDA !== '' ? headlineDA : null,
        editBy: editBy !== '' ? editBy : null,
        actionTypeIds: actionTypeIds,
        fromDate: _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__["default"].toShortDateFormat(fromDate),
        toDate: _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__["default"].toShortDateFormat(toDate),
        pageIndex: 1,
        pageSize: this.props.gridParams.pageSize
      };
      this.props.setGridParams(params);
      this.props.getHeadlineDAReport(params);
    });

    const currentClientTime = window.currentClientTime;
    const currentDate = new Date(_jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__["default"].toShortDateTimeFormat(new Date(currentClientTime)));

    const _fromDate = new Date(_jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__["default"].toShortDateTimeFormat(new Date(currentClientTime)));

    _fromDate.setDate(_fromDate.getDate() - 1);

    this.maxFromDate = currentDate;
    this.maxToDate = currentDate;
    this.minToDate = _fromDate;
    this.state = {
      headlineDA: '',
      editBy: '',
      fromDate: _fromDate,
      toDate: currentDate,
      actionTypeIds: '',
      actionTypeOptions: []
    };
  }

  componentDidMount() {
    this.props.getActionTypes().then(data => {
      this.handleActionTypes(data);
    });
  }

  render() {
    const {
      headlineDA,
      fromDate,
      toDate,
      editBy,
      actionTypeOptions
    } = this.state;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"], {
      className: "form-filter",
      onSubmit: this.handleSubmit
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Row, {
      bsPrefix: "form-row"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
      htmlFor: "headlineDA"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('HeadlineDA')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Control, {
      type: "text",
      size: "sm",
      className: "shadow-none",
      autoComplete: "off",
      value: headlineDA,
      name: "headlineDA",
      id: "headlineDA",
      onChange: this.handleChange
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
      htmlFor: "fromDate"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('FromDate')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "react-datepicker-wrapper-container"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_date_picker_index__WEBPACK_IMPORTED_MODULE_5__["default"], {
      maxDate: new Date(this.maxFromDate),
      minDate: new Date('1/1/2011'),
      selected: fromDate,
      peekNextMonth: true,
      showMonthDropdown: true,
      showYearDropdown: true,
      dropdownMode: "select",
      onChange: value => this.handleChangeFromDate(value)
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, null, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('ToDate')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "react-datepicker-wrapper-container"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_date_picker_index__WEBPACK_IMPORTED_MODULE_5__["default"], {
      maxDate: new Date(this.maxToDate),
      minDate: new Date(this.minToDate),
      peekNextMonth: true,
      showMonthDropdown: true,
      showYearDropdown: true,
      dropdownMode: "select",
      selected: toDate,
      onChange: value => this.handleChangeToDate(value)
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, {
      className: "form-group-actionType"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, null, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('ActionType')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "ml-3"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_multiple_select_index__WEBPACK_IMPORTED_MODULE_7__["default"], {
      dataSource: actionTypeOptions,
      hasSearchBox: true,
      keyField: "id",
      valueField: "name",
      isAllTextShown: true,
      statusField: "checked",
      onChange: (currentItem, selectedItemsKey) => this.setState({
        actionTypeIds: selectedItemsKey
      })
    })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Row, {
      bsPrefix: "form-row"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
      htmlFor: "editBy"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('EditBy')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Control, {
      type: "text",
      size: "sm",
      value: editBy,
      name: "editBy",
      id: "editBy",
      className: "shadow-none",
      autoComplete: "off",
      onChange: this.handleChange
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, {
      className: "submit"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], {
      variant: "primary",
      size: "sm",
      onClick: this.handleSubmit
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('Submit')))));
  }

}

_defineProperty(Filter, "propTypes", {
  getActionTypes: prop_types__WEBPACK_IMPORTED_MODULE_9___default.a.func
});

_defineProperty(Filter, "defaultProps", {
  getActionTypes: function () {// nothing
  }
});

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_4__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    gridParams,
    actionType
  } = state;
  return {
    gridParams,
    actionType
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(Filter));

/***/ }),

/***/ "./www/sources/js/pages/pic-and-headline/changes-log/components/PicDataGrid.jsx":
/*!**************************************************************************************!*\
  !*** ./www/sources/js/pages/pic-and-headline/changes-log/components/PicDataGrid.jsx ***!
  \**************************************************************************************/
/*! exports provided: PicDataGrid, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PicDataGrid", function() { return PicDataGrid; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/pic-and-headline/changes-log/actions.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/components/react-grid/index */ "./www/sources/js/components/react-grid/index.jsx");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/common/constants */ "./www/sources/js/common/constants.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








class PicDataGrid extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "buildHeader", () => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderRow"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 5
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('SymbolNo')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 7
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('LogID')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 15
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('LogDate')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 10
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('EditBy')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 13
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('PicType')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 13
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('PIC')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 17
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Action')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 63
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Detail')));
    });

    _defineProperty(this, "buildBody", () => {
      const {
        picReport,
        gridParamsPic
      } = this.props;
      const {
        pageIndex,
        pageSize
      } = gridParamsPic;
      this.startIndex = (pageIndex - 1) * pageSize + 1;

      if (picReport.picInfo.length > 0) {
        return picReport.picInfo.map((item, index) => this.renderRow(item, index));
      }

      return [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Row"], {
        key: `body${1}`,
        className: "no-data"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: "text-center",
        colSpan: 8
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('ThereIsNoData')))];
    });

    _defineProperty(this, "renderRow", (item, index) => {
      const detailValuePic = this.renderDetailsValuePic(item);
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Row"], {
        key: index
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: "text-center"
      }, index + this.startIndex), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: "text-center"
      }, item.logId), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: "text-center",
        style: {
          whiteSpace: 'pre-line'
        },
        dangerouslySetInnerHTML: {
          __html: item.logTime
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], null, item.editBy), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], null, item.picTypeName), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], null, item.pic), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], null, item.action), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], null, detailValuePic));
    });

    _defineProperty(this, "renderDetailsValuePic", item => {
      let detailValue = '';

      switch (item.actionId) {
        case _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_6__["LogActions"].InsertNewPic:
          detailValue = this.getDetailValueInsertNewPic(item);
          break;

        case _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_6__["LogActions"].UpdatePic:
          detailValue = this.getDetailValueUpdatePic(item);
          break;

        case _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_6__["LogActions"].UpdatePicStatus:
          detailValue = this.getDetailValueUpdatePicStatus(item);
          break;
      }

      return detailValue;
    });

    _defineProperty(this, "getDetailValueInsertNewPic", item => {
      const languageValue = this.getStringJoinArray(item.newPicInfo.languages);
      const picTypes = this.getStringJoinArray(item.newPicInfo.picTypes);
      const countryValue = item.newPicInfo.country ? item.newPicInfo.country.name : '-';
      const newCommunicationTools = [];
      this.recursiveCommunicationTools(item.newPicInfo.communicationTools, newCommunicationTools);
      const newCommunicationToolValue = this.renderCommunicationTools(newCommunicationTools);
      const remarkValue = this.getStringValue(item.newPicInfo.remark);
      const picTypeName = _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('PicType');
      const communicationToolsName = _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('CommunicationTool');
      const name = _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('name');
      const roleName = _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Role');
      const languageName = _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Language');
      const countryName = _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('country');
      const isActiveName = _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('IsActive');
      const remarkName = _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('remark');
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "pic-container"
      }, this.renderHtmlDetail(picTypeName, picTypes, communicationToolsName, newCommunicationToolValue), this.renderHtmlDetail(name, item.newPicInfo.name, roleName, item.newPicInfo.role.name), this.renderHtmlDetail(languageName, languageValue, countryName, countryValue), this.renderHtmlDetail(isActiveName, 'Yes', remarkName, remarkValue));
    });

    _defineProperty(this, "getDetailValueUpdatePic", item => {
      const roleValue = this.changeValueToHtmlString(this.getStringObject(item.oldPicInfo.role), this.getStringObject(item.newPicInfo.role));
      const nameValue = this.changeValueToHtmlString(item.oldPicInfo.name, item.newPicInfo.name);
      const newPicType = this.getStringJoinArray(item.newPicInfo.picTypes);
      const oldPicType = this.getStringJoinArray(item.oldPicInfo.picTypes);
      const picTypeValue = this.changeValueToHtmlString(oldPicType, newPicType);
      const newLanguage = this.getStringJoinArray(item.newPicInfo.languages);
      const oldLanguage = this.getStringJoinArray(item.oldPicInfo.languages);
      const languageValue = this.changeValueToHtmlString(oldLanguage, newLanguage);
      const countryValue = this.changeValueToHtmlString(this.getStringObject(item.oldPicInfo.country), this.getStringObject(item.newPicInfo.country));
      const newCommunicationTool = [];
      this.recursiveCommunicationTools(item.newPicInfo.communicationTools, newCommunicationTool);
      const newCommunicationToolValue = this.renderCommunicationTools(newCommunicationTool);
      const newCommunicationString = newCommunicationTool.map(tool => this.getStringCommunicationTools(tool)).join('');
      const oldCommunicationTool = [];
      this.recursiveCommunicationTools(item.oldPicInfo.communicationTools, oldCommunicationTool);
      const oldCommunicationToolValue = this.renderCommunicationTools(oldCommunicationTool);
      const oldCommunicationString = oldCommunicationTool.map(tool => this.getStringCommunicationTools(tool)).join('');
      const communicationToolValue = this.changeValueToHtmlString(oldCommunicationToolValue, newCommunicationToolValue, newCommunicationString !== oldCommunicationString, true);
      const remarkValue = this.changeValueToHtmlString(this.getStringValue(item.oldPicInfo.remark), this.getStringValue(item.newPicInfo.remark));
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "pic-container"
      }, this.renderHtmlDetail(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('PicType'), picTypeValue, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('CommunicationTool'), communicationToolValue, oldPicType !== newPicType, oldCommunicationString !== newCommunicationString), this.renderHtmlDetail(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Name'), nameValue, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Role'), roleValue, item.oldPicInfo.name !== item.newPicInfo.name, this.getStringObject(item.oldPicInfo.role) !== this.getStringObject(item.newPicInfo.role)), this.renderHtmlDetail(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Language'), languageValue, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Country'), countryValue, oldLanguage !== newLanguage, this.getStringObject(item.oldPicInfo.country) !== this.getStringObject(item.newPicInfo.country)), this.renderHtmlDetail(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Remark'), remarkValue, null, null, item.oldPicInfo.remark !== item.newPicInfo.remark, false));
    });

    _defineProperty(this, "getDetailValueUpdatePicStatus", item => {
      const newDirectAccountJoin = this.getStringJoinArray(item.newPicInfo.directAccounts);
      const oldDirectAccountJoin = this.getStringJoinArray(item.oldPicInfo.directAccounts);
      const isChangeDirectAccount = newDirectAccountJoin !== oldDirectAccountJoin;
      const directAccountValue = this.changeValueToHtmlString(oldDirectAccountJoin, newDirectAccountJoin);
      const isActiveValue = this.changeValueToHtmlString(this.convertBoolToDecision(item.oldPicInfo.isActive), this.convertBoolToDecision(item.newPicInfo.isActive));
      const oldHeadlineJoin = this.getStringJoinArray(item.oldPicInfo.headlines);
      const newHeadlineJoin = this.getStringJoinArray(item.newPicInfo.headlines);
      const isChangeHeadline = oldHeadlineJoin !== newHeadlineJoin;
      const headlineValue = this.changeValueToHtmlString(oldHeadlineJoin, newHeadlineJoin);
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "pic-container"
      }, this.renderHtmlDetail(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('DirectAccount'), directAccountValue, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('IsActive'), isActiveValue, isChangeDirectAccount, item.oldPicInfo.isActive !== item.newPicInfo.isActive), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "container-detail"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "detail-child-col col-title-detail"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "p-1"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('DefaultPIC'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: `border-right-0 col-value-larger detail-child-col ${isChangeHeadline ? _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_6__["BackGroundChange"] : ''}`
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "p-1"
      }, headlineValue))));
    });

    _defineProperty(this, "changeValueToHtmlString", (oldValue, newValue, isChangeCommunication, isCommunication = false) => {
      const isChange = isCommunication ? isChangeCommunication : newValue !== oldValue;
      return isChange ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "new-value"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "pt-1 pb-1"
      }, newValue)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "old-value"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "pt-1 pb-1"
      }, oldValue))) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "pt-1 pb-1"
      }, newValue);
    });

    _defineProperty(this, "renderHtmlDetail", (title1, value1, title2, value2, isChange1 = false, isChange2 = false) => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "container-detail"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "detail-child-col col-title-detail"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "p-1"
      }, title1)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: `${value2 !== null ? 'detail-child-col' : ''} col-value-detail ${isChange1 ? _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_6__["BackGroundChange"] : ''}`
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "p-1"
      }, value1)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: `${title2 !== null ? 'detail-child-col col-title-detail' : ''}`
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "p-1"
      }, title2)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: `${value2 !== null ? 'detail-child-col col-value-detail' : ''} ${isChange2 ? _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_6__["BackGroundChange"] : ''}`
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "p-1"
      }, value2)));
    });

    _defineProperty(this, "recursiveCommunicationTools", (tools, newCommunicationTools) => {
      if (tools.length > 0) {
        const pivot = tools[0].name;
        const childTools = tools.filter(tool => tool.name === pivot);
        newCommunicationTools.push(childTools);
        const moreTools = tools.filter(tool => tool.name !== pivot);
        this.recursiveCommunicationTools(moreTools, newCommunicationTools);
      }
    });

    _defineProperty(this, "getStringCommunicationTools", tools => {
      if (tools.length > 0) {
        const name = tools[0].name;
        const value = tools.map(tool => tool.value).join(', ');
        return `${name}: ${value}`;
      }

      return '-';
    });

    _defineProperty(this, "renderCommunicationTools", communicationTools => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, communicationTools.map(tools => {
        if (tools.length > 0) {
          const name = tools[0].name;
          const valueJoin = tools.map(tool => tool.value).join(', ');
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, name, ": ", valueJoin);
        }

        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "'-'");
      }));
    });

    _defineProperty(this, "getStringObject", object => object && object.name ? object.name : '-');

    _defineProperty(this, "getStringValue", value => value ? value : '-');

    _defineProperty(this, "getStringJoinArray", array => array.length > 0 ? array.map(item => item.name).join(', ') : '-');

    _defineProperty(this, "convertBoolToDecision", value => {
      if (value === true) {
        return 'Yes';
      } else if (value === false) {
        return 'No';
      } else {
        return '-';
      }
    });

    _defineProperty(this, "onPaging", (pageIndex, pageSize) => {
      const params = _objectSpread({}, this.props.gridParamsPic);

      params['pageSize'] = pageSize;
      params['pageIndex'] = pageIndex;
      this.props.setGridParamsPic(params);
      this.props.getPicReport(params);
    });
  }

  render() {
    const {
      picReport
    } = this.props;

    if (!picReport || !picReport.picInfo) {
      return null;
    }

    const {
      pageIndex,
      pageSize
    } = this.props.gridParamsPic;
    const pagingOption = {
      PageIndex: pageIndex,
      PageSize: pageSize,
      TotalItem: picReport.totals,
      PageList: _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_6__["PAGING_SIZES"]
    };
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "table-title justify-content-between d-flex align-items-center"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('ChangesLog'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Table"], {
      header: this.buildHeader(),
      body: this.buildBody(),
      width: 1400,
      autoWidth: false,
      isPaging: true,
      adjustedHeight: 10,
      pageOption: pagingOption,
      containerPadding: 0,
      onPaging: this.onPaging
    }));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_3__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    picReport,
    gridParamsPic
  } = state;
  return {
    picReport,
    gridParamsPic
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(PicDataGrid));

/***/ }),

/***/ "./www/sources/js/pages/pic-and-headline/changes-log/components/PicFilter.jsx":
/*!************************************************************************************!*\
  !*** ./www/sources/js/pages/pic-and-headline/changes-log/components/PicFilter.jsx ***!
  \************************************************************************************/
/*! exports provided: PicFilter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PicFilter", function() { return PicFilter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/pic-and-headline/changes-log/actions.js");
/* harmony import */ var _jsroot_components_date_picker_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/components/date-picker/index */ "./www/sources/js/components/date-picker/index.jsx");
/* harmony import */ var _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/common/dateTimeService */ "./www/sources/js/common/dateTimeService.js");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









class PicFilter extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleChangeFromDate", fromDate => {
      const currentClientTime = window.currentClientTime;
      const currentTime = new Date(_jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__["default"].toShortDateTimeFormat(new Date(currentClientTime)));
      const maxDate = new Date(fromDate.getTime());
      maxDate.setMonth(fromDate.getMonth() + 1);
      this.minToDate = fromDate;
      this.maxToDate = maxDate < currentTime ? maxDate : currentTime;
      this.setState({
        fromDate: fromDate,
        toDate: maxDate < currentTime ? maxDate : currentTime
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
        picName,
        fromDate,
        toDate,
        editBy
      } = this.state;
      const params = {
        picName: picName !== '' ? picName : null,
        editBy: editBy !== '' ? editBy : null,
        fromDate: _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__["default"].toShortDateFormat(fromDate),
        toDate: _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__["default"].toShortDateFormat(toDate),
        pageIndex: 1,
        pageSize: this.props.gridParamsPic.pageSize
      };
      this.props.setGridParamsPic(params);
      this.props.getPicReport(params);
    });

    const _currentClientTime = window.currentClientTime;
    const currentDate = new Date(_jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__["default"].toShortDateTimeFormat(new Date(_currentClientTime)));

    const _fromDate = new Date(_jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__["default"].toShortDateTimeFormat(new Date(_currentClientTime)));

    _fromDate.setDate(_fromDate.getDate() - 1);

    this.maxFromDate = currentDate;
    this.maxToDate = currentDate;
    this.minToDate = _fromDate;
    this.state = {
      picName: '',
      editBy: '',
      fromDate: _fromDate,
      toDate: currentDate
    };
  }

  render() {
    const {
      picName,
      fromDate,
      toDate,
      editBy
    } = this.state;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"], {
      className: "form-filter",
      onSubmit: this.handleSubmit
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Row, {
      bsPrefix: "form-row"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
      htmlFor: "picName"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('PIC')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Control, {
      type: "text",
      size: "sm",
      className: "shadow-none",
      autoComplete: "off",
      value: picName,
      name: "picName",
      id: "picName",
      onChange: this.handleChange
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
      htmlFor: "fromDate"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('FromDate')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "react-datepicker-wrapper-container"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_date_picker_index__WEBPACK_IMPORTED_MODULE_5__["default"], {
      selected: fromDate,
      peekNextMonth: true,
      showMonthDropdown: true,
      showYearDropdown: true,
      dropdownMode: "select",
      maxDate: new Date(this.maxFromDate),
      minDate: new Date('1/1/2011'),
      onChange: value => this.handleChangeFromDate(value)
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, null, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('ToDate')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "react-datepicker-wrapper-container"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_date_picker_index__WEBPACK_IMPORTED_MODULE_5__["default"], {
      peekNextMonth: true,
      showMonthDropdown: true,
      showYearDropdown: true,
      dropdownMode: "select",
      maxDate: new Date(this.maxToDate),
      minDate: new Date(this.minToDate),
      selected: toDate,
      onChange: value => this.handleChangeToDate(value)
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
      htmlFor: "editBy"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('EditBy')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Control, {
      size: "sm",
      type: "text",
      name: "editBy",
      id: "editBy",
      className: "shadow-none",
      autoComplete: "off",
      value: editBy,
      onChange: this.handleChange
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, {
      className: "submit"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], {
      size: "sm",
      variant: "primary",
      onClick: this.handleSubmit
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Submit')))));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_4__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    gridParamsPic,
    actionType
  } = state;
  return {
    gridParamsPic,
    actionType
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(PicFilter));

/***/ }),

/***/ "./www/sources/js/pages/pic-and-headline/changes-log/components/TabContainer.jsx":
/*!***************************************************************************************!*\
  !*** ./www/sources/js/pages/pic-and-headline/changes-log/components/TabContainer.jsx ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var _AppContainer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./AppContainer */ "./www/sources/js/pages/pic-and-headline/changes-log/components/AppContainer.jsx");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/pic-and-headline/changes-log/actions.js");








class TabContainer extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);
    this.state = {
      tab: 'headlineDA'
    };
  }

  componentWillUnmount() {
    this.props.resetState();
  }

  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Tabs"], {
      id: "controlled-tab",
      activeKey: this.state.tab,
      onSelect: k => this.setState({
        tab: k
      })
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Tab"], {
      eventKey: "headlineDA",
      title: _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('HeadlineDirectAccount')
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_AppContainer__WEBPACK_IMPORTED_MODULE_2__["default"], {
      tab: 1
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Tab"], {
      eventKey: "pic",
      title: "PIC"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_AppContainer__WEBPACK_IMPORTED_MODULE_2__["default"], {
      tab: 2
    })));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_5__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_6__["ActionCreators"], dispatch);

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["connect"])(null, mapDispatchToProps)(TabContainer));

/***/ }),

/***/ "./www/sources/js/pages/pic-and-headline/changes-log/index.js":
/*!********************************************************************!*\
  !*** ./www/sources/js/pages/pic-and-headline/changes-log/index.js ***!
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
/* harmony import */ var _changesLogSlice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./changesLogSlice */ "./www/sources/js/pages/pic-and-headline/changes-log/changesLogSlice.js");
/* harmony import */ var _components_TabContainer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/TabContainer */ "./www/sources/js/pages/pic-and-headline/changes-log/components/TabContainer.jsx");
/* harmony import */ var _cssroot_pages_pic_and_headline_changes_log_index_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @cssroot/pages/pic-and-headline/changes-log/index.scss */ "./www/sources/css/pages/pic-and-headline/changes-log/index.scss");
/* harmony import */ var _cssroot_pages_pic_and_headline_changes_log_index_scss__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_cssroot_pages_pic_and_headline_changes_log_index_scss__WEBPACK_IMPORTED_MODULE_5__);






const store = Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__["configureStore"])({
  reducer: _changesLogSlice__WEBPACK_IMPORTED_MODULE_3__["default"]
});
class index extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_1__["Provider"], {
      store: store
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "change-logs"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_TabContainer__WEBPACK_IMPORTED_MODULE_4__["default"], null)));
  }

}

/***/ })

}]);
//# sourceMappingURL=10.chunk.js.map