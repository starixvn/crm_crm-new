(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[16],{

/***/ "./www/sources/css/pages/admin-tool/setting-relation/index.scss":
/*!**********************************************************************!*\
  !*** ./www/sources/css/pages/admin-tool/setting-relation/index.scss ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./www/sources/js/pages/admin-tool/setting-relation/actions.js":
/*!*********************************************************************!*\
  !*** ./www/sources/js/pages/admin-tool/setting-relation/actions.js ***!
  \*********************************************************************/
/*! exports provided: ActionCreators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionCreators", function() { return ActionCreators; });
/* harmony import */ var _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/common/site */ "./www/sources/js/common/site.js");
/* harmony import */ var _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/common/dataService */ "./www/sources/js/common/dataService.js");
/* harmony import */ var _settingRelationSlice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./settingRelationSlice */ "./www/sources/js/pages/admin-tool/setting-relation/settingRelationSlice.js");




const getMainSettings = () => async dispatch => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl('SettingRelation/GetMainSettings');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__["default"].getDataAsync(url).then(response => {
    dispatch(Object(_settingRelationSlice__WEBPACK_IMPORTED_MODULE_2__["setMainSettings"])(response.data));
  });
};

const getSettingTypes = params => async dispatch => {
  _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].blockUI();
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl('SettingRelation/GetSettingByType');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__["default"].postDataAsync(url, params).then(response => {
    dispatch(Object(_settingRelationSlice__WEBPACK_IMPORTED_MODULE_2__["setSettingTypes"])(response.data));
  }).catch(_jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].handleAxiosError).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].unblockUI());
};

const getMainSettingRelation = params => async dispatch => {
  _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].blockUI();
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl('SettingRelation/GetMainSettingRelation');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__["default"].postDataAsync(url, params).then(response => {
    dispatch(Object(_settingRelationSlice__WEBPACK_IMPORTED_MODULE_2__["setMainSettingRelation"])(response.data));
  }).catch(_jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].handleAxiosError).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].unblockUI());
};

const updateRelation = params => async dispatch => {
  _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].blockUI();
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl('SettingRelation/Update');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__["default"].postDataAsync(url, params).then(response => {
    dispatch(Object(_settingRelationSlice__WEBPACK_IMPORTED_MODULE_2__["setUpdateResult"])(response.data));
  }).catch(_jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].handleAxiosError).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].unblockUI());
};

const ActionCreators = {
  resetState: _settingRelationSlice__WEBPACK_IMPORTED_MODULE_2__["resetState"],
  getMainSettings,
  setMainSettings: _settingRelationSlice__WEBPACK_IMPORTED_MODULE_2__["setMainSettings"],
  setGridParams: _settingRelationSlice__WEBPACK_IMPORTED_MODULE_2__["setGridParams"],
  getSettingTypes,
  setSettingTypes: _settingRelationSlice__WEBPACK_IMPORTED_MODULE_2__["setSettingTypes"],
  getMainSettingRelation,
  setMainSettingRelation: _settingRelationSlice__WEBPACK_IMPORTED_MODULE_2__["setMainSettingRelation"],
  updateRelation,
  setUpdateResult: _settingRelationSlice__WEBPACK_IMPORTED_MODULE_2__["setUpdateResult"],
  setOpenUpdatePopup: _settingRelationSlice__WEBPACK_IMPORTED_MODULE_2__["setOpenUpdatePopup"]
};

/***/ }),

/***/ "./www/sources/js/pages/admin-tool/setting-relation/components/AppContainer.jsx":
/*!**************************************************************************************!*\
  !*** ./www/sources/js/pages/admin-tool/setting-relation/components/AppContainer.jsx ***!
  \**************************************************************************************/
/*! exports provided: AppContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppContainer", function() { return AppContainer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/admin-tool/setting-relation/actions.js");
/* harmony import */ var _Filter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Filter */ "./www/sources/js/pages/admin-tool/setting-relation/components/Filter.jsx");
/* harmony import */ var _DataGrid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./DataGrid */ "./www/sources/js/pages/admin-tool/setting-relation/components/DataGrid.jsx");
/* harmony import */ var _Update__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Update */ "./www/sources/js/pages/admin-tool/setting-relation/components/Update.jsx");
/* harmony import */ var _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/common/constants */ "./www/sources/js/common/constants.js");
/* harmony import */ var _jsroot_common_shareScripts__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jsroot/common/shareScripts */ "./www/sources/js/common/shareScripts.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }










class AppContainer extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleCloseUpdatePopup", () => {
      this.props.setOpenUpdatePopup({
        show: false,
        title: '',
        parentId: null
      });
      this.props.setMainSettingRelation(null);
    });

    this.state = {
      policy: null
    };
  }

  componentDidMount() {
    this.props.getMainSettings();
    Object(_jsroot_common_shareScripts__WEBPACK_IMPORTED_MODULE_8__["getPermission"])(_jsroot_common_constants__WEBPACK_IMPORTED_MODULE_7__["FunctionKey"].SettingRelationManagement).then(response => {
      this.setState({
        policy: response
      });
    });
  }

  componentWillUnmount() {
    this.props.resetState();
  }

  render() {
    const {
      mainSettings,
      updatePopup,
      gridParams
    } = this.props;

    if (!mainSettings || mainSettings === null || !this.state.policy) {
      return null;
    }

    const isHost = this.state.policy === _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_7__["Policy"].Host;
    const subSettingOptions = mainSettings.filter(x => x.settingName !== gridParams.settingName);
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Filter__WEBPACK_IMPORTED_MODULE_4__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DataGrid__WEBPACK_IMPORTED_MODULE_5__["default"], {
      isHost: isHost
    }), updatePopup.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Update__WEBPACK_IMPORTED_MODULE_6__["default"], {
      subSettingOptions: subSettingOptions,
      onClose: this.handleCloseUpdatePopup
    }));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    mainSettings,
    updatePopup,
    gridParams
  } = state;
  return {
    mainSettings,
    updatePopup,
    gridParams
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(AppContainer));

/***/ }),

/***/ "./www/sources/js/pages/admin-tool/setting-relation/components/DataGrid.jsx":
/*!**********************************************************************************!*\
  !*** ./www/sources/js/pages/admin-tool/setting-relation/components/DataGrid.jsx ***!
  \**********************************************************************************/
/*! exports provided: DataGrid, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataGrid", function() { return DataGrid; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/admin-tool/setting-relation/actions.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/components/react-grid/index */ "./www/sources/js/components/react-grid/index.jsx");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







class DataGrid extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "buildHeader", isHost => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderRow"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 45
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Setting')), isHost && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 10
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Relation')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 12
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('SettingId')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 12
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Order')));
    });

    _defineProperty(this, "buildBody", isHost => {
      const {
        settingType
      } = this.props;

      if (settingType.length > 0) {
        return settingType.map(item => this.renderRow(item, isHost));
      }

      return [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Row"], {
        className: "no-data"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: "text-center",
        colSpan: 4
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('ThereIsNoData')))];
    });

    _defineProperty(this, "renderRow", (item, isHost) => {
      const rows = [];
      rows.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Row"], {
        key: `parent-${item.settingId}`,
        className: "parent-level-0"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: "complaints-text",
        onClick: event => this.handleToggleRow(event, item.settingId)
      }, item.childSettings.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: `expand-icon fa pr-2 ${!this.state.toggleRow.includes(item.settingId) ? 'fa-caret-down' : 'fa-caret-right'}`
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, item.settingValue)), isHost && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: "text-center"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "fa fa-plus-circle icon-excel",
        "aria-hidden": "true",
        onClick: event => this.handleOpenUpdate(event, item.settingId, item.settingValue)
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: "text-right"
      }, item.settingId), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: "text-right"
      }, item.displayOrder)));

      if (item.childSettings.length > 0) {
        rows.push(item.childSettings.map(sub => this.renderSubSetting(item.settingId, sub)));
      }

      return rows;
    });

    _defineProperty(this, "renderSubSetting", (parentId, sub) => {
      const {
        toggleRow
      } = this.state;
      const rows = [];

      if (!toggleRow.includes(parentId)) {
        rows.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Row"], {
          key: `child-${sub.settingId}`,
          className: "child-setting"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
          className: "pl-4"
        }, sub.settingValue), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
          className: "text-right"
        }, sub.settingId), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
          className: "text-right"
        }, sub.displayOrder)));
        return rows;
      } else {
        return null;
      }
    });

    _defineProperty(this, "handleToggleRow", (event, settingId) => {
      event.stopPropagation();
      const {
        toggleRow
      } = this.state;
      const index = toggleRow.indexOf(settingId);

      if (index >= 0) {
        toggleRow.splice(index, 1);
      } else {
        toggleRow.push(settingId);
      }

      this.setState({
        toggleRow
      });
    });

    _defineProperty(this, "handleOpenUpdate", (event, value, name) => {
      event.preventDefault();
      const title = `${_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('AddSubSettingTitle')}`;
      const params = {
        settingName: this.props.mainSettings.slice(1)[0].settingName,
        parentId: parseInt(value, 10),
        parentName: name
      };
      this.props.setOpenUpdatePopup({
        show: true,
        title: title,
        parentId: params.parentId,
        parentName: params.parentName
      });
      this.props.getMainSettingRelation(params);
    });

    this.state = {
      toggleRow: []
    };
  }

  render() {
    const {
      settingType,
      gridParams,
      isHost
    } = this.props;

    if (!settingType || settingType === null) {
      return null;
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "table-title d-flex justify-content-between align-items-center"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, `${_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('SettingRelationTitle')} ${gridParams.settingName}`)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Table"], {
      width: 700,
      autoWidth: false,
      header: this.buildHeader(isHost),
      body: this.buildBody(isHost),
      onSort: this.onSort,
      containerPadding: 0,
      adjustedHeight: 10
    }));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_3__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    settingType,
    gridParams,
    mainSettings
  } = state;
  return {
    settingType,
    gridParams,
    mainSettings
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(DataGrid));

/***/ }),

/***/ "./www/sources/js/pages/admin-tool/setting-relation/components/Filter.jsx":
/*!********************************************************************************!*\
  !*** ./www/sources/js/pages/admin-tool/setting-relation/components/Filter.jsx ***!
  \********************************************************************************/
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
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/admin-tool/setting-relation/actions.js");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







class Filter extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleSubmit", () => {
      const {
        settingName
      } = this.state;
      const params = {
        settingName
      };
      this.props.setGridParams(params);
      this.props.getSettingTypes(params);
    });

    this.state = {
      settingName: this.props.mainSettings[0].settingName
    };
  }

  componentDidMount() {
    this.handleSubmit();
  }

  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"], {
      className: "form-filter",
      onSubmit: this.handleSubmit
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Row, {
      bsPrefix: "form-row"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, {
      style: {
        width: 210
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Control, {
      as: "select",
      size: "sm",
      style: {
        width: 210
      },
      name: "settingName",
      id: "settingName",
      value: this.state.settingName,
      onChange: evt => this.setState({
        settingName: evt.target.value
      })
    }, this.props.mainSettings.map((value, key) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
      key: key,
      value: value.settingName
    }, value.settingName)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], {
      variant: "primary",
      size: "sm",
      onClick: this.handleSubmit
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Search')))));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_4__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    mainSettings
  } = state;
  return {
    mainSettings
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(Filter));

/***/ }),

/***/ "./www/sources/js/pages/admin-tool/setting-relation/components/Update.jsx":
/*!********************************************************************************!*\
  !*** ./www/sources/js/pages/admin-tool/setting-relation/components/Update.jsx ***!
  \********************************************************************************/
/*! exports provided: Update, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Update", function() { return Update; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/admin-tool/setting-relation/actions.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var _jsroot_components_DraggableModalDialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/components/DraggableModalDialog */ "./www/sources/js/components/DraggableModalDialog.jsx");
/* harmony import */ var _jsroot_components_ResponseMessage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/components/ResponseMessage */ "./www/sources/js/components/ResponseMessage.jsx");
/* harmony import */ var _jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/components/react-grid/index */ "./www/sources/js/components/react-grid/index.jsx");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }










class Update extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleSetState", mainSettingRelation => {
      const settingRelation = [...mainSettingRelation];
      this.setState({
        settingRelation
      });
    });

    _defineProperty(this, "buildHeader", () => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["HeaderRow"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["HeaderCell"], {
        colWidth: 50
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('Setting')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["HeaderCell"], {
        colWidth: 10
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('IsSub')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["HeaderCell"], {
        colWidth: 10
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('Order')));
    });

    _defineProperty(this, "buildBody", () => {
      if (this.state.settingRelation.length > 0) {
        return this.state.settingRelation.map((item, index) => this.renderRow(item, index));
      }

      return [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["Row"], {
        className: "no-data"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["Cell"], {
        className: "text-center",
        colSpan: 3
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('ThereIsNoData')))];
    });

    _defineProperty(this, "renderRow", (item, index) => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["Row"], {
        key: `setting-relation-update-${index}`
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["Cell"], null, item.value), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["Cell"], {
        className: "text-center"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        className: "checkbox-cell-style",
        id: "relation-checkbox",
        type: "checkbox",
        checked: item.isChild,
        onChange: e => this.onChangeCheckBox(item.value, e.target.checked)
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["Cell"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        type: "number",
        size: "sm",
        disabled: "disabled",
        className: "shadow-none",
        value: item.displayOrder,
        onChange: e => this.onChangeDisplay(item.value, e.target.value)
      })));
    });

    _defineProperty(this, "renderForm", () => {
      const {
        subSettingOptions,
        updateResult,
        updatePopup
      } = this.props;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"], {
        noValidate: true,
        onSubmit: this.handleSubmit
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Body, null, updateResult && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_ResponseMessage__WEBPACK_IMPORTED_MODULE_6__["default"], {
        isSuccessful: updateResult.isSuccessful,
        message: updateResult.message || _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('UpdateSettingRelationSuccessful')
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        className: "form-group row"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "12",
        md: "12"
      }, updatePopup.title, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "bold"
      }, this.props.updatePopup.parentName))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "filter-relation"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        className: "label-subSetting",
        column: true,
        sm: "3",
        md: "3",
        htmlFor: "subSetting"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('SubSetting')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "5",
        md: "5"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        as: "select",
        size: "sm",
        style: {
          width: 200
        },
        name: "subSettingName",
        id: "subSettingName",
        value: this.state.subSettingName,
        onChange: this.onChangeSubSetting
      }, subSettingOptions.map((value, key) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        key: key,
        value: value.settingName
      }, value.settingName)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "4",
        md: "4"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], {
        variant: "primary",
        size: "sm",
        onClick: this.handleSearch
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('Search')))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["Table"], {
        width: 630,
        autoWidth: false,
        header: this.buildHeader(),
        body: this.buildBody(),
        containerPadding: 0,
        adjustedHeight: 10,
        shouldResetScrollPosition: this.state.shouldResetScrollPosition
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Footer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], {
        type: "submit",
        variant: "primary",
        size: "sm",
        onClick: this.handleSubmit,
        disabled: this.state.isSubmitting
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('Update'))));
    });

    _defineProperty(this, "onChangeSubSetting", event => {
      this.setState({
        subSettingName: event.target.value
      }, () => {
        this.handleSearch();
      });
    });

    _defineProperty(this, "handleSubmit", event => {
      event.preventDefault();
      const {
        subSettingName,
        settingRelation
      } = this.state;
      const {
        updatePopup,
        updateRelation,
        onClose,
        getSettingTypes,
        gridParams,
        setUpdateResult
      } = this.props;
      const params = {
        parentId: parseInt(updatePopup.parentId, 10),
        settingName: subSettingName,
        subSettings: settingRelation
      };
      updateRelation(params).then(() => {
        if (this.props.updateResult.isSuccessful) {
          setTimeout(() => {
            onClose();
            getSettingTypes(gridParams);
            setUpdateResult(null);
          }, 3000);
        } else {
          this.setState({
            isSubmitting: true
          });
        }
      });
    });

    _defineProperty(this, "handleSearch", () => {
      const params = {
        settingName: this.state.subSettingName,
        parentId: parseInt(this.props.updatePopup.parentId, 10)
      };
      this.props.getMainSettingRelation(params);
      this.setState({
        shouldResetScrollPosition: true
      });
    });

    _defineProperty(this, "onChangeDisplay", (value, displayOrder) => {
      const settingRelationFilter = this.state.settingRelation.map(setting => {
        return {
          id: setting.id,
          value: setting.value,
          isChild: setting.isChild,
          displayOrder: setting.value === value ? displayOrder : setting.displayOrder
        };
      });
      this.setState({
        settingRelation: settingRelationFilter,
        shouldResetScrollPosition: false
      });
    });

    _defineProperty(this, "onChangeCheckBox", (value, checked) => {
      const settingRelationFilter = this.state.settingRelation.map(setting => {
        return {
          id: setting.id,
          value: setting.value,
          isChild: setting.value === value ? checked : setting.isChild,
          displayOrder: setting.displayOrder
        };
      });
      this.setState({
        settingRelation: settingRelationFilter,
        shouldResetScrollPosition: false
      });
    });

    this.state = {
      shouldResetScrollPosition: true,
      subSettingName: this.props.subSettingOptions[0].settingName,
      isSubmitting: false,
      settingRelation: []
    };
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.mainSettingRelation) !== JSON.stringify(this.props.mainSettingRelation)) {
      this.handleSetState(this.props.mainSettingRelation);
    }
  }

  render() {
    const {
      subSettingOptions
    } = this.props;

    if (this.state.settingRelation.length === 0 || subSettingOptions.length === 0) {
      return null;
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"], {
      show: true,
      className: "update-setting-relation",
      dialogAs: _jsroot_components_DraggableModalDialog__WEBPACK_IMPORTED_MODULE_5__["default"],
      backdrop: "static",
      keyboard: false,
      centered: true,
      onHide: this.props.onClose
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Header, {
      closeButton: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Title, {
      as: "div"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('SettingRelationManagement'))), this.renderForm());
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    mainSettings,
    updateResult,
    updatePopup,
    mainSettingRelation,
    gridParams
  } = state;
  return {
    mainSettings,
    updateResult,
    updatePopup,
    mainSettingRelation,
    gridParams
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(Update));

/***/ }),

/***/ "./www/sources/js/pages/admin-tool/setting-relation/index.js":
/*!*******************************************************************!*\
  !*** ./www/sources/js/pages/admin-tool/setting-relation/index.js ***!
  \*******************************************************************/
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
/* harmony import */ var _settingRelationSlice__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./settingRelationSlice */ "./www/sources/js/pages/admin-tool/setting-relation/settingRelationSlice.js");
/* harmony import */ var _components_AppContainer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/AppContainer */ "./www/sources/js/pages/admin-tool/setting-relation/components/AppContainer.jsx");
/* harmony import */ var _cssroot_pages_admin_tool_setting_relation_index_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @cssroot/pages/admin-tool/setting-relation/index.scss */ "./www/sources/css/pages/admin-tool/setting-relation/index.scss");
/* harmony import */ var _cssroot_pages_admin_tool_setting_relation_index_scss__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_cssroot_pages_admin_tool_setting_relation_index_scss__WEBPACK_IMPORTED_MODULE_6__);






const store = Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_3__["configureStore"])({
  reducer: _settingRelationSlice__WEBPACK_IMPORTED_MODULE_4__["default"]
});

class index extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_2__["Provider"], {
      store: store
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "setting-relation"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_AppContainer__WEBPACK_IMPORTED_MODULE_5__["default"], null)));
  }

}

/***/ }),

/***/ "./www/sources/js/pages/admin-tool/setting-relation/settingRelationSlice.js":
/*!**********************************************************************************!*\
  !*** ./www/sources/js/pages/admin-tool/setting-relation/settingRelationSlice.js ***!
  \**********************************************************************************/
/*! exports provided: setMainSettings, setGridParams, setSettingTypes, setMainSettingRelation, setUpdateResult, setOpenUpdatePopup, resetState, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setMainSettings", function() { return setMainSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setGridParams", function() { return setGridParams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSettingTypes", function() { return setSettingTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setMainSettingRelation", function() { return setMainSettingRelation; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setUpdateResult", function() { return setUpdateResult; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setOpenUpdatePopup", function() { return setOpenUpdatePopup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetState", function() { return resetState; });
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @reduxjs/toolkit */ "./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");

const initialState = {
  mainSettings: null,
  settingType: null,
  gridParams: {
    settingName: ''
  },
  gridDataSettingLogs: null,
  mainSettingRelation: [],
  updateResult: null,
  updatePopup: {
    show: false,
    title: '',
    parentId: null,
    parentName: ''
  }
};
const settingRelationSlice = Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__["createSlice"])({
  name: 'settingRelation',
  initialState: initialState,
  reducers: {
    resetState: () => initialState,
    setMainSettings: (state, action) => {
      state.mainSettings = action.payload;
    },
    setGridParams: (state, action) => {
      state.gridParams = action.payload;
    },
    setSettingTypes: (state, action) => {
      state.settingType = action.payload;
    },
    setMainSettingRelation: (state, action) => {
      state.mainSettingRelation = action.payload;
    },
    setUpdateResult: (state, action) => {
      state.updateResult = action.payload;
    },
    setOpenUpdatePopup: (state, action) => {
      state.updatePopup = action.payload;
    }
  }
});
const {
  actions,
  reducer
} = settingRelationSlice;
const {
  setMainSettings,
  setGridParams,
  setSettingTypes,
  setMainSettingRelation,
  setUpdateResult,
  setOpenUpdatePopup,
  resetState
} = actions;
/* harmony default export */ __webpack_exports__["default"] = (reducer);

/***/ })

}]);
//# sourceMappingURL=16.chunk.js.map