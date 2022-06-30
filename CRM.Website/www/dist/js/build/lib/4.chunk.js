(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ "./www/sources/css/pages/admin-tool/communication-setting/index.scss":
/*!***************************************************************************!*\
  !*** ./www/sources/css/pages/admin-tool/communication-setting/index.scss ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./www/sources/js/pages/admin-tool/communication-setting/actions.js":
/*!**************************************************************************!*\
  !*** ./www/sources/js/pages/admin-tool/communication-setting/actions.js ***!
  \**************************************************************************/
/*! exports provided: ActionCreators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionCreators", function() { return ActionCreators; });
/* harmony import */ var _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/common/dataService */ "./www/sources/js/common/dataService.js");
/* harmony import */ var _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/common/site */ "./www/sources/js/common/site.js");
/* harmony import */ var _communicationsettingSlice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./communicationsettingSlice */ "./www/sources/js/pages/admin-tool/communication-setting/communicationsettingSlice.js");




const getAllSettings = () => async dispatch => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('CommunicationSetting/GetAllSettings');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__["default"].getDataAsync(url).then(response => {
    dispatch(Object(_communicationsettingSlice__WEBPACK_IMPORTED_MODULE_2__["setAllSettings"])(response.data));
  });
};

const getGridCommunicationSetting = params => async dispatch => {
  _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].blockUI();
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('CommunicationSetting/GetCommunicationToolSetting');
  _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__["default"].postDataAsync(url, params).then(response => {
    dispatch(Object(_communicationsettingSlice__WEBPACK_IMPORTED_MODULE_2__["setGridCommunicationSetting"])(response.data));
  }).catch(_jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].handleAxiosError).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].unblockUI());
};

const getCommunicationById = (communicaitonId, callback) => async dispatch => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl(`CommunicationSetting/GetById/${communicaitonId}`);
  _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__["default"].getDataAsync(url).then(response => {
    dispatch(Object(_communicationsettingSlice__WEBPACK_IMPORTED_MODULE_2__["setSelectCommunicationId"])(response.data));

    if (typeof callback === 'function') {
      callback();
    }
  });
};

const createCommunication = data => async dispatch => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('CommunicationSetting/Create');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__["default"].postDataAsync(url, data).then(response => {
    dispatch(Object(_communicationsettingSlice__WEBPACK_IMPORTED_MODULE_2__["setCreateCommunicationResult"])(response.data));
  });
};

const editCommunication = data => async dispatch => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('CommunicationSetting/Edit');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__["default"].postDataAsync(url, data).then(response => {
    dispatch(Object(_communicationsettingSlice__WEBPACK_IMPORTED_MODULE_2__["setEditCommunicationResult"])(response.data));
  });
};

const deleteCommunication = id => async () => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl(`CommunicationSetting/Delete/${id}`);
  return await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__["default"].postDataAsync(url).then(response => response.data);
};

const verifyUsername = data => async () => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('CustomerSetting/VerifyUsername');
  return await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__["default"].postDataAsync(url, data).then(response => response.data);
};

const ActionCreators = {
  resetState: _communicationsettingSlice__WEBPACK_IMPORTED_MODULE_2__["resetState"],
  setAllSettings: _communicationsettingSlice__WEBPACK_IMPORTED_MODULE_2__["setAllSettings"],
  setGridParamsCommunication: _communicationsettingSlice__WEBPACK_IMPORTED_MODULE_2__["setGridParamsCommunication"],
  setGridCommunicationSetting: _communicationsettingSlice__WEBPACK_IMPORTED_MODULE_2__["setGridCommunicationSetting"],
  setSelectCommunicationId: _communicationsettingSlice__WEBPACK_IMPORTED_MODULE_2__["setSelectCommunicationId"],
  setCreateCommunicationPopup: _communicationsettingSlice__WEBPACK_IMPORTED_MODULE_2__["setCreateCommunicationPopup"],
  setCreateCommunicationResult: _communicationsettingSlice__WEBPACK_IMPORTED_MODULE_2__["setCreateCommunicationResult"],
  setEditCommunicationPopup: _communicationsettingSlice__WEBPACK_IMPORTED_MODULE_2__["setEditCommunicationPopup"],
  setEditCommunicationResult: _communicationsettingSlice__WEBPACK_IMPORTED_MODULE_2__["setEditCommunicationResult"],
  setDeleteCommunicationPopup: _communicationsettingSlice__WEBPACK_IMPORTED_MODULE_2__["setDeleteCommunicationPopup"],
  setDeleteCommunicationResult: _communicationsettingSlice__WEBPACK_IMPORTED_MODULE_2__["setDeleteCommunicationResult"],
  getAllSettings,
  getGridCommunicationSetting,
  getCommunicationById,
  createCommunication,
  editCommunication,
  deleteCommunication,
  verifyUsername
};

/***/ }),

/***/ "./www/sources/js/pages/admin-tool/communication-setting/communicationsettingSlice.js":
/*!********************************************************************************************!*\
  !*** ./www/sources/js/pages/admin-tool/communication-setting/communicationsettingSlice.js ***!
  \********************************************************************************************/
/*! exports provided: resetState, setAllSettings, setGridParamsCommunication, setGridCommunicationSetting, setSelectCommunicationId, setCreateCommunicationPopup, setCreateCommunicationResult, setEditCommunicationPopup, setEditCommunicationResult, setDeleteCommunicationPopup, setDeleteCommunicationResult, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetState", function() { return resetState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setAllSettings", function() { return setAllSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setGridParamsCommunication", function() { return setGridParamsCommunication; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setGridCommunicationSetting", function() { return setGridCommunicationSetting; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSelectCommunicationId", function() { return setSelectCommunicationId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setCreateCommunicationPopup", function() { return setCreateCommunicationPopup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setCreateCommunicationResult", function() { return setCreateCommunicationResult; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setEditCommunicationPopup", function() { return setEditCommunicationPopup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setEditCommunicationResult", function() { return setEditCommunicationResult; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setDeleteCommunicationPopup", function() { return setDeleteCommunicationPopup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setDeleteCommunicationResult", function() { return setDeleteCommunicationResult; });
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @reduxjs/toolkit */ "./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");

const initialState = {
  settings: {
    communicationTools: [],
    mainCategories: [],
    subCategories: []
  },
  gridParamsCommunication: {
    username: '',
    categoryIds: '',
    subCategoryIds: '',
    isDisableCategorySubCategory: '',
    pageIndex: 1,
    pageSize: 50
  },
  gridDataCommunication: null,
  selectCommunication: null,
  createCommunicationPopup: {
    show: false
  },
  createCommunicationResult: null,
  editCommunicationPopup: {
    show: false
  },
  editCommunicationResult: null,
  deleteCommunicationPopup: {
    show: false
  },
  deleteCommunicationResult: null
};
const communicationSettingSlice = Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__["createSlice"])({
  name: 'communicationsetting',
  initialState: initialState,
  reducers: {
    resetState: () => initialState,
    setAllSettings: (state, action) => {
      state.settings = action.payload;
    },
    setGridParamsCommunication: (state, action) => {
      state.gridParamsCommunication = action.payload;
    },
    setGridCommunicationSetting: (state, action) => {
      state.gridDataCommunication = action.payload;
    },
    setSelectCommunicationId: (state, action) => {
      state.selectCommunication = action.payload;
    },
    setCreateCommunicationPopup: (state, action) => {
      state.createCommunicationPopup = action.payload;
    },
    setCreateCommunicationResult: (state, action) => {
      state.createCommunicationResult = action.payload;
    },
    setEditCommunicationPopup: (state, action) => {
      state.editCommunicationPopup = action.payload;
    },
    setEditCommunicationResult: (state, action) => {
      state.editCommunicationResult = action.payload;
    },
    setDeleteCommunicationPopup: (state, action) => {
      state.deleteCommunicationPopup = action.payload;
    },
    setDeleteCommunicationResult: (state, action) => {
      state.deleteCommunicationResult = action.payload;
    }
  }
});
const {
  actions,
  reducer
} = communicationSettingSlice;
const {
  resetState,
  setAllSettings,
  setGridParamsCommunication,
  setGridCommunicationSetting,
  setSelectCommunicationId,
  setCreateCommunicationPopup,
  setCreateCommunicationResult,
  setEditCommunicationPopup,
  setEditCommunicationResult,
  setDeleteCommunicationPopup,
  setDeleteCommunicationResult
} = actions;
/* harmony default export */ __webpack_exports__["default"] = (reducer);

/***/ }),

/***/ "./www/sources/js/pages/admin-tool/communication-setting/components/AppContainer.jsx":
/*!*******************************************************************************************!*\
  !*** ./www/sources/js/pages/admin-tool/communication-setting/components/AppContainer.jsx ***!
  \*******************************************************************************************/
/*! exports provided: AppContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppContainer", function() { return AppContainer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/lib/index.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_toastify__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/admin-tool/communication-setting/actions.js");
/* harmony import */ var _Filter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Filter */ "./www/sources/js/pages/admin-tool/communication-setting/components/Filter.jsx");
/* harmony import */ var _DataGrid__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./DataGrid */ "./www/sources/js/pages/admin-tool/communication-setting/components/DataGrid.jsx");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _NewCommunitionSetting__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./NewCommunitionSetting */ "./www/sources/js/pages/admin-tool/communication-setting/components/NewCommunitionSetting.jsx");
/* harmony import */ var _EditCommunitionSetting__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./EditCommunitionSetting */ "./www/sources/js/pages/admin-tool/communication-setting/components/EditCommunitionSetting.jsx");
/* harmony import */ var _jsroot_components_SweetModalDialog__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @jsroot/components/SweetModalDialog */ "./www/sources/js/components/SweetModalDialog.jsx");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }














class AppContainer extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleCloseCreatePopup", isSuccessful => {
      this.props.setCreateCommunicationPopup({
        show: false
      });
      this.props.setCreateCommunicationResult(null);

      if (isSuccessful) {
        this.props.getGridCommunicationSetting(this.props.gridParamsCommunication);
      }
    });

    _defineProperty(this, "handleCreateSuccess", () => {
      this.handleCloseCreatePopup();
      this.props.getGridCommunicationSetting(this.props.gridParamsCommunication);
    });

    _defineProperty(this, "handleCloseEditPopup", () => {
      this.props.setEditCommunicationPopup({
        show: false
      });
      this.props.setSelectCommunicationId(null);
      this.props.setEditCommunicationResult(null);
    });

    _defineProperty(this, "handleEditSuccess", () => {
      this.handleCloseEditPopup();
      this.props.getGridCommunicationSetting(this.props.gridParamsCommunication);
    });

    _defineProperty(this, "handleCloseDeletePopup", () => {
      this.props.setDeleteCommunicationPopup({
        show: false
      });
    });

    _defineProperty(this, "handleDelete", () => {
      this.props.deleteCommunication(this.props.deleteCommunicationPopup.id).then(data => {
        if (data.isSuccessful) {
          react_toastify__WEBPACK_IMPORTED_MODULE_3__["toast"].success(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_12__["default"].getResource('DeleteCommunicationSuccessfully'));
        } else {
          react_toastify__WEBPACK_IMPORTED_MODULE_3__["toast"].error(data.message);
        }

        this.handleCloseDeletePopup();
        this.props.getGridCommunicationSetting(this.props.gridParamsCommunication);
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
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Filter__WEBPACK_IMPORTED_MODULE_6__["default"], {
      isHost: this.props.isHost
    }), this.props.createCommunicationPopup.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_NewCommunitionSetting__WEBPACK_IMPORTED_MODULE_9__["default"], {
      onClose: this.handleCloseCreatePopup,
      onSuccess: this.handleCreateSuccess
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DataGrid__WEBPACK_IMPORTED_MODULE_7__["default"], {
      isHost: this.props.isHost
    }), this.props.editCommunicationPopup.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_EditCommunitionSetting__WEBPACK_IMPORTED_MODULE_10__["default"], {
      onClose: this.handleCloseEditPopup,
      onSuccess: this.handleEditSuccess
    }), this.props.deleteCommunicationPopup.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_SweetModalDialog__WEBPACK_IMPORTED_MODULE_11__["default"], {
      size: "md",
      title: _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_12__["default"].getResource('Confirmation'),
      contents: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "Are you sure you want to delete ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, 'No.' + this.props.deleteCommunicationPopup.index), "?"),
      buttons: [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
        variant: "primary",
        size: "sm",
        onClick: this.handleDelete
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_12__["default"].getResource('OK')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
        variant: "primary",
        size: "sm",
        onClick: this.handleCloseDeletePopup
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_12__["default"].getResource('Cancel'))],
      onClose: this.handleCloseDeletePopup
    }));
  }

}

_defineProperty(AppContainer, "propTypes", {
  createCommunicationPopup: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.shape({
    show: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.bool
  }).isRequired,
  deleteCommunicationPopup: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.shape({
    show: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.bool
  }).isRequired,
  editCommunicationPopup: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.shape({
    show: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.bool
  }).isRequired,
  getAllSettings: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.func,
  isHost: prop_types__WEBPACK_IMPORTED_MODULE_8___default.a.bool.isRequired
});

_defineProperty(AppContainer, "defaultProps", {
  createCommunicationPopup: {
    show: false
  },
  deleteCommunicationPopup: {
    show: false
  },
  editCommunicationPopup: {
    show: false
  },
  getAllSettings: function () {// nothing
  },
  isHost: false
});

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_4__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_5__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    gridDataCommunication,
    gridParamsCommunication,
    createCommunicationPopup,
    editCommunicationPopup,
    deleteCommunicationPopup,
    deleteCommunicationResult
  } = state;
  return {
    gridDataCommunication,
    gridParamsCommunication,
    createCommunicationPopup,
    editCommunicationPopup,
    deleteCommunicationPopup,
    deleteCommunicationResult
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(AppContainer));

/***/ }),

/***/ "./www/sources/js/pages/admin-tool/communication-setting/components/DataGrid.jsx":
/*!***************************************************************************************!*\
  !*** ./www/sources/js/pages/admin-tool/communication-setting/components/DataGrid.jsx ***!
  \***************************************************************************************/
/*! exports provided: DataGrid, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataGrid", function() { return DataGrid; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap_OverlayTrigger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-bootstrap/OverlayTrigger */ "./node_modules/react-bootstrap/esm/OverlayTrigger.js");
/* harmony import */ var react_bootstrap_Tooltip__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-bootstrap/Tooltip */ "./node_modules/react-bootstrap/esm/Tooltip.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/admin-tool/communication-setting/actions.js");
/* harmony import */ var _jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/components/react-grid/index */ "./www/sources/js/components/react-grid/index.jsx");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









class DataGrid extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "onPagingCommunication", (pageIndex, pageSize) => {
      const params = _objectSpread({}, this.props.gridParamsCommunication);

      params['pageIndex'] = pageIndex;
      params['pageSize'] = pageSize;
      this.props.setGridParamsCommunication(params);
      this.props.getGridCommunicationSetting(params);
    });

    _defineProperty(this, "decodeCatagory", category => {
      const parseCatagory = document.createElement('textarea');
      parseCatagory.innerHTML = category;
      return parseCatagory.value;
    });

    _defineProperty(this, "renderCategoryColumn", (index, category) => {
      const categoryParse = this.decodeCatagory(category);
      const maxItems = 15;
      const categories = categoryParse ? categoryParse.split(',') : [];

      if (categories.length > maxItems) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap_OverlayTrigger__WEBPACK_IMPORTED_MODULE_1__["default"], {
          placement: "auto",
          overlay: this.renderTooltipCategory(index, categoryParse)
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, categories.splice(0, maxItems).join(', ') + '...'));
      }

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, categories.join(', '));
    });

    _defineProperty(this, "buildHeaderCommunication", isHost => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_6__["HeaderRow"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_6__["HeaderCell"], {
        colWidth: 5
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('SymbolNo')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_6__["HeaderCell"], {
        colWidth: 15
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Customer')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_6__["HeaderCell"], {
        colWidth: 10
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Position')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_6__["HeaderCell"], {
        colWidth: 30
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Category')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_6__["HeaderCell"], {
        colWidth: 30
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Sub-Category')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_6__["HeaderCell"], {
        colWidth: 30
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('CommunicationTool')), isHost && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_6__["HeaderCell"], {
        colWidth: 10
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Edit')));
    });

    _defineProperty(this, "buildBodyCommunication", isHost => {
      const {
        pageIndex,
        pageSize
      } = this.props.gridParamsCommunication;
      this.startIndex = (pageIndex - 1) * pageSize + 1;

      if (this.props.gridDataCommunication.data.length > 0) {
        return this.props.gridDataCommunication.data.map((item, index) => this.renderRowCommunication(item, index, isHost));
      }

      return [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_6__["Row"], {
        key: `body${1}`,
        className: "no-data"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_6__["Cell"], {
        className: "text-center",
        colSpan: "7"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('ThereIsNoData')))];
    });

    _defineProperty(this, "handleEdit", id => {
      this.props.getCommunicationById(id, () => this.props.setEditCommunicationPopup({
        show: true
      }));
    });

    _defineProperty(this, "handleDelete", (id, index) => {
      this.props.setDeleteCommunicationPopup({
        show: true,
        id: id,
        index: index
      });
    });

    _defineProperty(this, "renderTooltipCategory", (index, fullCategory) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap_Tooltip__WEBPACK_IMPORTED_MODULE_2__["default"], {
      className: "tooltipCatagory",
      id: `tooltip${index}`
    }, fullCategory));

    _defineProperty(this, "renderRowCommunication", (item, index, isHost) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_6__["Row"], {
      key: index
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_6__["Cell"], {
      className: "text-center"
    }, index + this.startIndex), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_6__["Cell"], {
      className: "text-left"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, item.username)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_6__["Cell"], {
      className: "text-center"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, item.role)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_6__["Cell"], {
      className: "text-left"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, this.renderCategoryColumn(index, item.category))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_6__["Cell"], {
      className: "text-left"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, this.renderCategoryColumn(index, item.subCategory))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_6__["Cell"], {
      className: "text-left"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, item.commTool)), isHost && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_6__["Cell"], {
      className: "text-center"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "rounded-circle fa fa-pencil icon-edit",
      onClick: () => this.handleEdit(item.defaultCommId)
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "rounded-circle fa fa-trash icon-delete",
      onClick: () => this.handleDelete(item.defaultCommId, index + this.startIndex)
    }))));
  }

  render() {
    if (!this.props.gridDataCommunication || !this.props.gridDataCommunication.data) {
      return null;
    }

    const {
      totalItems
    } = this.props.gridDataCommunication;
    const {
      pageIndex,
      pageSize
    } = this.props.gridParamsCommunication;
    const {
      isHost
    } = this.props;
    const pagingOption = {
      PageIndex: pageIndex,
      PageSize: pageSize,
      TotalItem: totalItems,
      PageList: [50, 100, 200, 500]
    };
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "table-title"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('DefaultCommunicationSetting')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_6__["Table"], {
      minWidth: 960,
      maxWidth: document.getElementById('app-container').clientWidth,
      autoWidth: true,
      header: this.buildHeaderCommunication(isHost),
      body: this.buildBodyCommunication(isHost),
      isPaging: true,
      pageOption: pagingOption,
      onPaging: this.onPagingCommunication,
      adjustedHeight: 10
    }));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_4__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_5__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    gridParamsCommunication,
    gridDataCommunication
  } = state;
  return {
    gridParamsCommunication,
    gridDataCommunication
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, mapDispatchToProps)(DataGrid));

/***/ }),

/***/ "./www/sources/js/pages/admin-tool/communication-setting/components/EditCommunitionSetting.jsx":
/*!*****************************************************************************************************!*\
  !*** ./www/sources/js/pages/admin-tool/communication-setting/components/EditCommunitionSetting.jsx ***!
  \*****************************************************************************************************/
/*! exports provided: EditCommunitionSetting, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditCommunitionSetting", function() { return EditCommunitionSetting; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../functions */ "./www/sources/js/pages/admin-tool/communication-setting/functions.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/admin-tool/communication-setting/actions.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! formik */ "./node_modules/formik/dist/formik.esm.js");
/* harmony import */ var _jsroot_components_DraggableModalDialog__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/components/DraggableModalDialog */ "./www/sources/js/components/DraggableModalDialog.jsx");
/* harmony import */ var _jsroot_components_FormikErrorMessage__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jsroot/components/FormikErrorMessage */ "./www/sources/js/components/FormikErrorMessage.jsx");
/* harmony import */ var _jsroot_components_ResponseMessage__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @jsroot/components/ResponseMessage */ "./www/sources/js/components/ResponseMessage.jsx");
/* harmony import */ var _jsroot_components_multiple_select_index__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @jsroot/components/multiple-select/index */ "./www/sources/js/components/multiple-select/index.jsx");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @jsroot/common/constants */ "./www/sources/js/common/constants.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }














class EditCommunitionSetting extends react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "isCheckCatagories", (selectedData, id) => {
      if (selectedData === '0') {
        return true;
      }

      return selectedData.includes(id) ? true : false;
    });

    _defineProperty(this, "mainCategoriesChangeEdit", (currentItem, selectedItemsKey, setFieldValue) => {
      setFieldValue('mainCategoryTypesEdit', selectedItemsKey);

      if (selectedItemsKey) {
        const selectedSub = this.state.selectedSubCategoryIdsEdit.length > 1 ? this.state.selectedSubCategoryIdsEdit.split(',') : this.state.selectedSubCategoryIdsEdit;
        const selectedMain = selectedItemsKey.split(',');
        const findSubByMain = this.props.settings.subCategories.filter(item => selectedMain.includes(item.mainCategoryID.toString()));
        const resetSelectedSub = selectedSub.length === 0 ? [] : selectedSub.filter(selected => findSubByMain.some(sub => sub.subCategoryId.toString() === selected));
        const resetSelectedSubJoin = resetSelectedSub.length > 1 ? resetSelectedSub.join(',') : resetSelectedSub;
        this.setState({
          selectedSubCategoryIdsEdit: resetSelectedSubJoin
        }, () => {
          const isCheckDefault = false;
          const setSubCatagories = Object(_functions__WEBPACK_IMPORTED_MODULE_2__["getSubCategories"])(isCheckDefault, findSubByMain, this.state.selectedSubCategoryIdsEdit);
          this.setState({
            subCategoryOptionsEdit: setSubCatagories
          });
        });
      } else {
        setFieldValue('subCategoryTypesEdit', '');
        this.setState({
          subCategoryOptionsEdit: [],
          selectedSubCategoryIdsEdit: []
        });
      }
    });

    _defineProperty(this, "validateEditCommunication", values => {
      const errors = {};

      if (!values.mainCategoryTypesEdit) {
        errors.mainCategoryTypesEdit = _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_11__["default"].getResource('CategoryRequired');
      }

      if (!values.subCategoryTypesEdit) {
        errors.subCategoryTypesEdit = _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_11__["default"].getResource('SubCategoryRequired');
      }

      if (!values.comunicationToolTypesEdit) {
        errors.comunicationToolTypesEdit = _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_11__["default"].getResource('CommunicationToolRequired');
      }

      return errors;
    });

    _defineProperty(this, "handleSubmit", (values, {
      setSubmitting
    }) => {
      setSubmitting(true);
      const countCatagories = values.mainCategoryTypesEdit.split(',').length;
      const countSubCatagories = values.subCategoryTypesEdit.split(',').length;

      if (countCatagories === this.props.settings.mainCategories.length) {
        values.mainCategoryTypesEdit = '0';
      }

      if (countSubCatagories === this.state.subCategoryOptionsEdit.length) {
        values.subCategoryTypesEdit = '0';
      }

      const data = {
        DefaultCommId: values.defaultCommId,
        CategoryIds: values.mainCategoryTypesEdit,
        SubCategoryIds: values.subCategoryTypesEdit,
        CommunicationIds: values.comunicationToolTypesEdit
      };
      this.props.editCommunication(data).then(() => {
        if (this.props.editCommunicationResult.isSuccessful) {
          setTimeout(() => {
            this.props.onSuccess();
          }, 3000);
        } else {
          setSubmitting(false);
        }
      });
    });

    _defineProperty(this, "renderFormEditCommunication", ({
      values,
      errors,
      touched,
      handleChange,
      handleSubmit,
      setFieldValue,
      isSubmitting
    }) => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Form"], {
        noValidate: true,
        onSubmit: handleSubmit
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Modal"].Body, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_FormikErrorMessage__WEBPACK_IMPORTED_MODULE_8__["default"], {
        touched: touched,
        errors: errors,
        fieldNames: Object.keys(values)
      }), this.props.editCommunicationResult && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_ResponseMessage__WEBPACK_IMPORTED_MODULE_9__["default"], {
        isSuccessful: this.props.editCommunicationResult.isSuccessful,
        message: this.props.editCommunicationResult.message || _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_11__["default"].getResource('UpdateCommunicationSettingSuccessfully')
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Form"].Label, {
        column: true,
        sm: "2",
        md: "2",
        htmlFor: "customerNameInput"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_11__["default"].getResource('Customer')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Col"], {
        sm: "3 mt-2",
        md: "3 mt-2"
      }, values.username)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Form"].Label, {
        column: true,
        sm: "2",
        md: "2",
        className: "required",
        htmlFor: "mainCategoryID"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_11__["default"].getResource('Category')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Col"], {
        sm: "4",
        md: "4"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_multiple_select_index__WEBPACK_IMPORTED_MODULE_10__["default"], {
        isInvalid: touched.mainCategoryTypesEdit && errors.mainCategoryTypesEdit,
        dataSource: this.state.mainCategoryOptionsEdit,
        keyField: "mainCategoryID",
        valueField: "name",
        textOptions: _objectSpread(_objectSpread({}, _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_12__["MULTI_SELECT_TEXT_OPTIONS"]), {}, {
          Texts: 'Any'
        }),
        isAllTextShown: this.state.mainCategoryOptionsEdit.length > 0,
        hasSearchBox: true,
        onChange: (currentItem, selectedItemsKey) => {
          this.mainCategoriesChangeEdit(currentItem, selectedItemsKey, setFieldValue);
        }
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Col"], {
        sm: "2",
        md: "2"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Form"].Label, {
        className: "required sub-category-left col-form-label",
        htmlFor: "subCategoryId"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_11__["default"].getResource('SubCategory'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Col"], {
        sm: "4",
        md: "4"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_multiple_select_index__WEBPACK_IMPORTED_MODULE_10__["default"], {
        isInvalid: touched.subCategoryTypesEdit && errors.subCategoryTypesEdit,
        dataSource: this.state.subCategoryOptionsEdit,
        keyField: "subCategoryId",
        valueField: "name",
        textOptions: _objectSpread(_objectSpread({}, _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_12__["MULTI_SELECT_TEXT_OPTIONS"]), {}, {
          Texts: 'Any'
        }),
        isAllTextShown: this.state.subCategoryOptionsEdit.length > 0,
        hasAllOption: this.state.subCategoryOptionsEdit.length > 0,
        hasSearchBox: true,
        isDisable: this.state.subCategoryOptionsEdit.length === 0,
        onChange: (currentItem, selectedItemsKey) => {
          handleChange('subCategoryTypesEdit')(selectedItemsKey);
          this.setState({
            selectedSubCategoryIdsEdit: selectedItemsKey
          });
        }
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Form"].Label, {
        column: true,
        sm: "2",
        md: "2",
        className: "required",
        htmlFor: "CommunicationTool"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_11__["default"].getResource('CommunicationTool')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Col"], {
        sm: "4",
        md: "4"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_multiple_select_index__WEBPACK_IMPORTED_MODULE_10__["default"], {
        isInvalid: touched.comunicationToolTypesEdit && errors.comunicationToolTypesEdit,
        dataSource: this.state.communicationToolOptionsEdit,
        keyField: "id",
        valueField: "name",
        textOptions: _objectSpread(_objectSpread({}, _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_12__["MULTI_SELECT_TEXT_OPTIONS"]), {}, {
          Texts: 'Any'
        }),
        isSummited: false,
        hasSearchBox: true,
        onChange: (currentItem, selectedItemsKey) => {
          handleChange('comunicationToolTypesEdit')(selectedItemsKey);
        }
      })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Modal"].Footer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Button"], {
        size: "sm",
        variant: "primary",
        type: "submit",
        disabled: isSubmitting
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_11__["default"].getResource('Update')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Button"], {
        size: "sm",
        variant: "primary",
        type: "submit",
        onClick: this.props.onClose
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_11__["default"].getResource('Cancel'))));
    });

    this.state = {
      mainCategoryOptionsEdit: [],
      subCategoryOptionsEdit: [],
      communicationToolOptionsEdit: [],
      selectedSubCategoryIdsEdit: []
    };
  }

  componentDidMount() {
    const selectedData = this.props.selectCommunication;
    const selectedCatagoryId = [];
    const mainCategoryOptionsEdit = this.props.settings.mainCategories.map(main => {
      selectedCatagoryId.push(main.mainCategoryID);
      return {
        mainCategoryID: main.mainCategoryID,
        name: main.name,
        checked: this.isCheckCatagories(selectedData.category, main.mainCategoryID)
      };
    });
    const selectedCatagory = selectedData.category === '0' ? selectedCatagoryId.join(',') : selectedData.category;
    const findSubByMain = this.props.settings.subCategories.filter(item => selectedCatagory.includes(item.mainCategoryID.toString()));
    const setSubCatagories = selectedData.subCategory === '0' ? Object(_functions__WEBPACK_IMPORTED_MODULE_2__["getSubCategories"])(true, findSubByMain, []) : Object(_functions__WEBPACK_IMPORTED_MODULE_2__["getSubCategories"])(false, findSubByMain, selectedData.subCategory);
    const selectedSubCatagories = [];
    setSubCatagories.forEach(sub => {
      selectedSubCatagories.push(sub.subCategoryId);
    });
    const communicationToolOptionsEdit = this.props.settings.communicationTools.map(tool => {
      return {
        id: tool.id,
        name: tool.name,
        checked: selectedData.commTool.includes(tool.id) ? true : false
      };
    });
    const hasCheckedCatalogy = mainCategoryOptionsEdit.findIndex(item => item.checked === true) !== -1;
    this.setState({
      mainCategoryOptionsEdit: mainCategoryOptionsEdit,
      subCategoryOptionsEdit: hasCheckedCatalogy ? setSubCatagories : [],
      communicationToolOptionsEdit: communicationToolOptionsEdit,
      selectedSubCategoryIdsEdit: selectedData.subCategory === '0' ? selectedSubCatagories.join(',') : selectedData.subCategory
    });
  }

  render() {
    const Communication = this.props.selectCommunication;
    const initialValuesEditForm = {
      username: Communication.username,
      mainCategoryTypesEdit: Communication.category,
      subCategoryTypesEdit: Communication.subCategory,
      comunicationToolTypesEdit: Communication.commTool,
      defaultCommId: Communication.defaultCommId
    };
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Modal"], {
      show: true,
      className: "communication-setting-modal",
      dialogAs: _jsroot_components_DraggableModalDialog__WEBPACK_IMPORTED_MODULE_7__["default"],
      backdrop: "static",
      keyboard: false,
      size: "xl",
      centered: true,
      onHide: this.props.onClose
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Modal"].Header, {
      closeButton: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Modal"].Title, {
      as: "div"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_11__["default"].getResource('UpdateSetting'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_6__["Formik"], {
      initialValues: initialValuesEditForm,
      validate: this.validateEditCommunication,
      onSubmit: this.handleSubmit
    }, this.renderFormEditCommunication));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_3__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_4__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    settings,
    editCommunicationResult,
    selectCommunication
  } = state;
  return {
    settings,
    editCommunicationResult,
    selectCommunication
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(EditCommunitionSetting));

/***/ }),

/***/ "./www/sources/js/pages/admin-tool/communication-setting/components/Filter.jsx":
/*!*************************************************************************************!*\
  !*** ./www/sources/js/pages/admin-tool/communication-setting/components/Filter.jsx ***!
  \*************************************************************************************/
/*! exports provided: Filter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Filter", function() { return Filter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../functions */ "./www/sources/js/pages/admin-tool/communication-setting/functions.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/admin-tool/communication-setting/actions.js");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var _jsroot_components_multiple_select_index__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/components/multiple-select/index */ "./www/sources/js/components/multiple-select/index.jsx");
/* harmony import */ var _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jsroot/common/constants */ "./www/sources/js/common/constants.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }










class Filter extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "componentDidUpdate", prevProps => {
      if (prevProps.settings !== this.props.settings) {
        const mainCategoriesTypesId = [];
        const mainCategoryOptionsFilter = this.props.settings.mainCategories.map(main => {
          mainCategoriesTypesId.push(main.mainCategoryID);
          return {
            mainCategoryID: main.mainCategoryID,
            name: main.name,
            checked: true
          };
        });
        const subCategoryList = [];
        const subCategoriesTypesId = [];
        this.props.settings.subCategories.map(sub => {
          subCategoriesTypesId.push(sub.subCategoryId.toString());

          if (mainCategoriesTypesId.indexOf(sub.mainCategoryID) >= 0) {
            subCategoryList.push(sub);
          }
        });
        const isCheckDefault = true;
        const subCategoryOptionsFilter = Object(_functions__WEBPACK_IMPORTED_MODULE_1__["getSubCategories"])(isCheckDefault, subCategoryList, []);
        this.setState(prevState => ({
          mainCategoryOptionsFilter,
          subCategoryOptionsFilter,
          filter: _objectSpread(_objectSpread({}, prevState.filter), {}, {
            mainCategoriesTypes: mainCategoriesTypesId.toString(),
            subCategoriesTypes: subCategoriesTypesId.toString()
          })
        }), () => {
          const params = this.getParams();
          this.props.setGridParamsCommunication(params);
          this.props.getGridCommunicationSetting(params);
        });
      }
    });

    _defineProperty(this, "mainCategoriesChangeFilter", (currentItem, selectedItemsKey) => {
      this.setState(prevState => ({
        filter: _objectSpread(_objectSpread({}, prevState.filter), {}, {
          mainCategoriesTypes: selectedItemsKey
        })
      }), () => {
        if (selectedItemsKey) {
          const selectedSubCategoryIds = this.state.selectedSubCategoryIdsFilter;
          const selectedSub = selectedSubCategoryIds.length > 1 ? selectedSubCategoryIds.split(',') : selectedSubCategoryIds;
          const selectedMain = selectedItemsKey.split(',');
          const findSubByMain = this.props.settings.subCategories.filter(item => selectedMain.includes(item.mainCategoryID.toString()));
          const resetSelectedSub = selectedSub.length === 0 ? [] : selectedSub.filter(selected => findSubByMain.some(sub => sub.subCategoryId.toString() === selected));
          const resetSelectedSubJoin = resetSelectedSub.length > 1 ? resetSelectedSub.join(',') : resetSelectedSub;
          this.setState({
            selectedSubCategoryIdsFilter: resetSelectedSubJoin
          }, () => {
            const isCheckDefault = false;
            const setSubCatagories = Object(_functions__WEBPACK_IMPORTED_MODULE_1__["getSubCategories"])(isCheckDefault, findSubByMain, selectedSubCategoryIds);
            this.setState({
              subCategoryOptionsFilter: setSubCatagories
            });
          });
        } else {
          this.setState(prevState => ({
            subCategoryOptionsFilter: [],
            selectedSubCategoryIdsFilter: [],
            filter: _objectSpread(_objectSpread({}, prevState.filter), {}, {
              subCategoriesTypes: ''
            })
          }));
        }
      });
    });

    _defineProperty(this, "subCategoriesChangeFilter", (currentItem, selectedItemsKey) => {
      const countSubCatagoriesChange = selectedItemsKey.split(',').length;
      this.setState(prevState => ({
        selectedSubCategoryIdsFilter: selectedItemsKey,
        filter: _objectSpread(_objectSpread({}, prevState.filter), {}, {
          subCategoriesTypes: countSubCatagoriesChange === this.state.subCategoryOptionsFilter.length ? '0' : selectedItemsKey
        })
      }));
    });

    _defineProperty(this, "isDisableCatelogy", () => {
      this.setState(prevState => ({
        filter: _objectSpread(_objectSpread({}, prevState.filter), {}, {
          isDisableCategorySubCategory: !this.state.filter.isDisableCategorySubCategory
        })
      }));
    });

    _defineProperty(this, "handlecustomerNameChange", event => {
      const {
        filter
      } = this.state;
      this.setState({
        filter: _objectSpread(_objectSpread({}, filter), {}, {
          customerNameInput: event.target.value
        })
      });
    });

    _defineProperty(this, "getParams", () => {
      const isDisabled = this.state.filter.isDisableCategorySubCategory;
      let mainCategories = '';
      let subCategories = '';

      if (!isDisabled) {
        const countCatagories = this.state.filter.mainCategoriesTypes.split(',').length;
        const countSubCatagories = this.state.filter.subCategoriesTypes.split(',').length;
        mainCategories = this.props.settings.mainCategories.length === countCatagories ? '0' : this.state.filter.mainCategoriesTypes;
        subCategories = this.props.settings.subCategories.length === countSubCatagories ? '0' : this.state.filter.subCategoriesTypes;
      }

      return {
        username: this.state.filter.customerNameInput,
        categoryIds: mainCategories,
        subCategoryIds: subCategories,
        isDisableCategorySubCategory: isDisabled,
        pageIndex: 1,
        pageSize: this.props.gridParamsCommunication.pageSize
      };
    });

    _defineProperty(this, "searchHandler", e => {
      e.preventDefault();
      const params = this.getParams();
      this.props.setGridParamsCommunication(params);
      this.props.getGridCommunicationSetting(_objectSpread({}, params));
    });

    _defineProperty(this, "handleOpenCreatePopup", () => {
      this.props.setCreateCommunicationPopup({
        show: true
      });
    });

    this.state = {
      filter: {
        customerNameInput: '',
        mainCategoriesTypes: '',
        subCategoriesTypes: '',
        isDisableCategorySubCategory: true
      },
      selectedSubCategoryIdsFilter: [],
      mainCategoryOptionsFilter: [],
      subCategoryOptionsFilter: []
    };
  }

  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"], {
      className: "form-filter"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Row, {
      bsPrefix: "form-row"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Label, {
      className: "communication-setting",
      htmlFor: "customerInput"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Customer')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Control, {
      type: "text",
      size: "sm",
      className: "shadow-none",
      id: "customerInput",
      autoComplete: "off",
      value: this.state.filter.customerNameInput,
      onChange: this.handlecustomerNameChange
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Label, {
      className: "communication-setting"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Category')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "form-control-wrapper"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_multiple_select_index__WEBPACK_IMPORTED_MODULE_7__["default"], {
      dataSource: this.state.mainCategoryOptionsFilter,
      keyField: "mainCategoryID",
      maxDisplayItemCount: 1,
      textOptions: _objectSpread(_objectSpread({}, _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_8__["MULTI_SELECT_TEXT_OPTIONS"]), {}, {
        Texts: 'Any'
      }),
      valueField: "name",
      hasAllOption: this.state.mainCategoryOptionsFilter.length > 0,
      isAllTextShown: this.state.mainCategoryOptionsFilter.length > 0,
      hasSearchBox: true,
      isDisable: this.state.filter.isDisableCategorySubCategory,
      onChange: this.mainCategoriesChangeFilter
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Label, {
      className: "communication-setting"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('SubCategory')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "form-control-wrapper"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_multiple_select_index__WEBPACK_IMPORTED_MODULE_7__["default"], {
      dataSource: this.state.subCategoryOptionsFilter,
      keyField: "subCategoryId",
      valueField: "name",
      maxDisplayItemCount: 1,
      textOptions: _objectSpread(_objectSpread({}, _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_8__["MULTI_SELECT_TEXT_OPTIONS"]), {}, {
        Texts: 'Any'
      }),
      hasAllOption: this.state.subCategoryOptionsFilter.length > 0,
      isAllTextShown: this.state.subCategoryOptionsFilter.length > 0,
      hasSearchBox: true,
      isDisable: this.state.filter.isDisableCategorySubCategory || this.state.subCategoryOptionsFilter.length === 0,
      onChange: this.subCategoriesChangeFilter
    })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Row, {
      bsPrefix: "form-row"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Group, {
      controlId: "formBasicCheckbox"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Check, {
      className: "mr-5",
      type: "checkbox",
      label: _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('DisableCatSubCatfilters'),
      checked: this.state.filter.isDisableCategorySubCategory,
      onChange: this.isDisableCatelogy
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
      className: "mr-4",
      variant: "primary",
      size: "sm",
      disabled: !this.state.filter.isDisableCategorySubCategory && (this.state.filter.mainCategoriesTypes.length === 0 || this.state.filter.subCategoriesTypes.length === 0),
      onClick: this.searchHandler
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Search')), this.props.isHost && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
      variant: "primary",
      size: "sm",
      onClick: this.handleOpenCreatePopup
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Insert')))));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_4__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_5__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    settings,
    gridParamsCommunication
  } = state;
  return {
    settings,
    gridParamsCommunication
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, mapDispatchToProps)(Filter));

/***/ }),

/***/ "./www/sources/js/pages/admin-tool/communication-setting/components/NewCommunitionSetting.jsx":
/*!****************************************************************************************************!*\
  !*** ./www/sources/js/pages/admin-tool/communication-setting/components/NewCommunitionSetting.jsx ***!
  \****************************************************************************************************/
/*! exports provided: NewCommunitionSetting, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewCommunitionSetting", function() { return NewCommunitionSetting; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../functions */ "./www/sources/js/pages/admin-tool/communication-setting/functions.js");
/* harmony import */ var react_bootstrap_OverlayTrigger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-bootstrap/OverlayTrigger */ "./node_modules/react-bootstrap/esm/OverlayTrigger.js");
/* harmony import */ var react_bootstrap_Tooltip__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-bootstrap/Tooltip */ "./node_modules/react-bootstrap/esm/Tooltip.js");
/* harmony import */ var _ValidateCustomerResult__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ValidateCustomerResult */ "./www/sources/js/pages/admin-tool/communication-setting/components/ValidateCustomerResult.jsx");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/admin-tool/communication-setting/actions.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! formik */ "./node_modules/formik/dist/formik.esm.js");
/* harmony import */ var _jsroot_components_DraggableModalDialog__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @jsroot/components/DraggableModalDialog */ "./www/sources/js/components/DraggableModalDialog.jsx");
/* harmony import */ var _jsroot_components_FormikErrorMessage__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @jsroot/components/FormikErrorMessage */ "./www/sources/js/components/FormikErrorMessage.jsx");
/* harmony import */ var _jsroot_components_ResponseMessage__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @jsroot/components/ResponseMessage */ "./www/sources/js/components/ResponseMessage.jsx");
/* harmony import */ var _jsroot_components_multiple_select_index__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @jsroot/components/multiple-select/index */ "./www/sources/js/components/multiple-select/index.jsx");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @jsroot/common/constants */ "./www/sources/js/common/constants.js");
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

















class NewCommunitionSetting extends react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"] {
  constructor(_props) {
    super(_props);

    _defineProperty(this, "handleVerifyCustomer", (event, setFieldValue, value) => {
      event.preventDefault();
      const regex1 = new RegExp(/,\s+/g);
      const regex2 = new RegExp(/^,+|,+$/g);
      const regex3 = new RegExp(/,{2,}/g);
      const customersInput = value.trim().replace(regex1, ',') // NOSONAR
      .replace(regex2, '') // NOSONAR
      .replace(regex3, ','); // NOSONAR

      const isValidCustomer = customersInput.split(',').filter(value => value.length > 50).length === 0;

      if (isValidCustomer) {
        this.props.verifyUsername({
          Username: customersInput
        }).then(data => {
          let customers = [...this.state.listOfCustomer, ...data];
          customers = customers.filter((v, i, a) => a.findIndex(t => t.custId === v.custId && t.val === v.val) === i);
          this.setState({
            listOfCustomer: customers,
            listOfCustomerValid: customers.filter(item => item.custId !== 0)
          });
        });
        setFieldValue('isVerifiedCustomers', true);
      }

      setFieldValue('customerNameInput', '');
    });

    _defineProperty(this, "pasteCustomerHandler", (event, customers, setFieldValue) => {
      const customer = customers.trim();
      const items = (event.clipboardData || window.clipboardData).getData('text').replace(/ /g, ',').replace(/\r\n/g, ',').replace(/\n/g, ',').replace(/\t/g, ',').split(',').filter(item => item !== '');
      setTimeout(() => {
        const customersInput = (customer.length > 0 ? customer + ',' : '').concat(items.join(','));
        setFieldValue('customerNameInput', customersInput);
      }, 100);
    });

    _defineProperty(this, "mainCategoriesChangeNew", (currentItem, selectedItemsKey, setFieldValue) => {
      setFieldValue('mainCategoryTypesNew', selectedItemsKey);

      if (selectedItemsKey) {
        const selectedSub = this.state.selectedSubCategoryIdsNew.length > 1 ? this.state.selectedSubCategoryIdsNew.split(',') : this.state.selectedSubCategoryIdsNew;
        const selectedMain = selectedItemsKey.split(',');
        const findSubByMain = this.props.settings.subCategories.filter(item => selectedMain.includes(item.mainCategoryID.toString()));
        const resetSelectedSub = selectedSub.length === 0 ? [] : selectedSub.filter(selected => findSubByMain.some(sub => sub.subCategoryId.toString() === selected));
        const resetSelectedSubJoin = resetSelectedSub.length > 1 ? resetSelectedSub.join(',') : resetSelectedSub;
        this.setState({
          selectedSubCategoryIdsNew: resetSelectedSubJoin
        }, () => {
          const isCheckDefault = false;
          const setSubCatagories = Object(_functions__WEBPACK_IMPORTED_MODULE_1__["getSubCategories"])(isCheckDefault, findSubByMain, this.state.selectedSubCategoryIdsNew);
          this.setState({
            subCategoryOptionsNew: setSubCatagories
          });
        });
      } else {
        setFieldValue('subCategoryTypesNew', '');
        this.setState({
          subCategoryOptionsNew: [],
          selectedSubCategoryIdsNew: []
        });
      }
    });

    _defineProperty(this, "handleResetSubCatagory", () => {
      this.setState({
        selectedSubCategoryIdsNew: '',
        mainCategoryOptionsNew: this.state.mainCategoryOptionsNew.map(main => _objectSpread(_objectSpread({}, main), {}, {
          checked: false
        })),
        subCategoryOptionsNew: [],
        communicationToolOptionsNew: this.state.communicationToolOptionsNew.map(tool => _objectSpread(_objectSpread({}, tool), {}, {
          checked: false
        }))
      });
    });

    _defineProperty(this, "renderTooltipCustomers", props => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap_Tooltip__WEBPACK_IMPORTED_MODULE_3__["default"], _extends({
      id: "tooltip-customers"
    }, props), _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_14__["default"].getResource('MultipleCustomersTooltip')));

    _defineProperty(this, "deleteCustomer", id => {
      this.setState({
        listOfCustomer: this.state.listOfCustomer.filter(item => item.custId !== id),
        listOfCustomerValid: this.state.listOfCustomerValid.filter(item => item.custId !== id)
      });
    });

    _defineProperty(this, "handleCloseCreatePopup", () => {
      this.props.onClose(this.state.isSuccessful);
    });

    _defineProperty(this, "validateNewCommunication", values => {
      const errors = {};

      if (values.customerNameInput.length > 0 && !values.isVerifiedCustomers) {
        errors.isVerifiedCustomers = _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_14__["default"].getResource('VerifyListOfUsernameBeforeInsertSetting');
      }

      if (this.state.listOfCustomerValid.length === 0) {
        errors.customerNameInput = _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_14__["default"].getResource('ListofcustomersRequired');
      }

      if (!values.mainCategoryTypesNew) {
        errors.mainCategoryTypesNew = _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_14__["default"].getResource('CategoryRequired');
      }

      if (!values.subCategoryTypesNew) {
        errors.subCategoryTypesNew = _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_14__["default"].getResource('SubCategoryRequired');
      }

      if (!values.comunicationToolTypesNew) {
        errors.comunicationToolTypesNew = _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_14__["default"].getResource('CommunicationToolRequired');
      }

      return errors;
    });

    _defineProperty(this, "renderFormNewCommunication", ({
      values,
      errors,
      touched,
      handleChange,
      handleSubmit,
      setFieldValue,
      isSubmitting
    }) => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["Form"], {
        noValidate: true,
        onSubmit: handleSubmit
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["Modal"].Body, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_FormikErrorMessage__WEBPACK_IMPORTED_MODULE_11__["default"], {
        touched: touched,
        errors: errors,
        fieldNames: Object.keys(values)
      }), this.props.createCommunicationResult && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_ResponseMessage__WEBPACK_IMPORTED_MODULE_12__["default"], {
        isSuccessful: this.props.createCommunicationResult.isSuccessful,
        message: this.props.createCommunicationResult.message || _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_14__["default"].getResource('InsertCommunicationSettingSuccessfully')
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["Col"], {
        sm: "2",
        md: "2"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["Form"].Label, {
        className: "required",
        htmlFor: "customerNameInput"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_14__["default"].getResource('Listofcustomers'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap_OverlayTrigger__WEBPACK_IMPORTED_MODULE_2__["default"], {
        placement: "bottom-start",
        overlay: this.renderTooltipCustomers()
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "fa fa-question-circle-o"
      })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["Col"], {
        sm: "10",
        md: "10"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["Row"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["Col"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["Form"].Control, {
        type: "text",
        size: "sm",
        value: values.customerNameInput,
        name: "customerNameInput",
        id: "customerNameInput",
        onPaste: event => this.pasteCustomerHandler(event, values.customerNameInput, setFieldValue),
        isInvalid: touched.customerNameInput && errors.customerNameInput,
        className: "shadow-none",
        autoComplete: "off",
        onChange: handleChange
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["Col"], {
        sm: "2",
        md: "2"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["Button"], {
        disabled: values.customerNameInput.length === 0,
        name: "isVerifiedCustomers",
        id: "isVerifiedCustomers",
        type: "submit",
        variant: "primary",
        size: "sm",
        onClick: event => this.handleVerifyCustomer(event, setFieldValue, values.customerNameInput)
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_14__["default"].getResource('Verify')))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ValidateCustomerResult__WEBPACK_IMPORTED_MODULE_4__["default"], {
        listOfCustomers: this.state.listOfCustomer,
        onClick: this.deleteCustomer
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["Form"].Label, {
        column: true,
        sm: "2",
        md: "2",
        className: "required",
        htmlFor: "mainCategoryID"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_14__["default"].getResource('Category')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["Col"], {
        sm: "10",
        md: "4"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_multiple_select_index__WEBPACK_IMPORTED_MODULE_13__["default"], {
        isInvalid: touched.mainCategoryTypesNew && errors.mainCategoryTypesNew,
        dataSource: this.state.mainCategoryOptionsNew,
        keyField: "mainCategoryID",
        valueField: "name",
        textOptions: _objectSpread(_objectSpread({}, _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_15__["MULTI_SELECT_TEXT_OPTIONS"]), {}, {
          Texts: 'Any'
        }),
        isAllTextShown: this.state.mainCategoryOptionsNew.length > 0,
        hasSearchBox: true,
        maxDisplayItemCount: 1,
        onChange: (currentItem, selectedItemsKey) => {
          this.mainCategoriesChangeNew(currentItem, selectedItemsKey, setFieldValue);
        }
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["Col"], {
        sm: "2",
        md: "2"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["Form"].Label, {
        className: "sub-category-left required col-form-label",
        htmlFor: "subCategoryId"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_14__["default"].getResource('SubCategory'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["Col"], {
        sm: "10",
        md: "4"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_multiple_select_index__WEBPACK_IMPORTED_MODULE_13__["default"], {
        isInvalid: touched.subCategoryTypesNew && errors.subCategoryTypesNew,
        dataSource: this.state.subCategoryOptionsNew,
        keyField: "subCategoryId",
        valueField: "name",
        textOptions: _objectSpread(_objectSpread({}, _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_15__["MULTI_SELECT_TEXT_OPTIONS"]), {}, {
          Texts: 'Any'
        }),
        isAllTextShown: this.state.subCategoryOptionsNew.length > 0,
        hasAllOption: this.state.subCategoryOptionsNew.length > 0,
        hasSearchBox: true,
        isDisable: this.state.subCategoryOptionsNew.length === 0,
        maxDisplayItemCount: 1,
        onChange: (currentItem, selectedItemsKey) => {
          handleChange('subCategoryTypesNew')(selectedItemsKey);
          this.setState({
            selectedSubCategoryIdsNew: selectedItemsKey
          });
        }
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["Form"].Label, {
        column: true,
        sm: "2",
        md: "2",
        className: "required",
        htmlFor: "CommunicationTool"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_14__["default"].getResource('CommunicationTool')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["Col"], {
        sm: "10",
        md: "4"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_multiple_select_index__WEBPACK_IMPORTED_MODULE_13__["default"], {
        isInvalid: touched.comunicationToolTypesNew && errors.comunicationToolTypesNew,
        dataSource: this.state.communicationToolOptionsNew,
        keyField: "id",
        valueField: "name",
        hasSearchBox: true,
        onChange: (currentItem, selectedItemsKey) => {
          handleChange('comunicationToolTypesNew')(selectedItemsKey);
        }
      })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["Modal"].Footer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["Button"], {
        id: "saveandcontinue-button",
        type: "submit",
        variant: "primary",
        size: "sm",
        onClick: () => {
          setFieldValue('isSaveAndContinue', true);
        },
        disabled: isSubmitting
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_14__["default"].getResource('SaveAndContinue')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["Button"], {
        type: "submit",
        variant: "primary",
        size: "sm",
        disabled: isSubmitting
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_14__["default"].getResource('Save')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["Button"], {
        type: "submit",
        variant: "primary",
        size: "sm",
        onClick: this.handleCloseCreatePopup
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_14__["default"].getResource('Cancel'))));
    });

    _defineProperty(this, "handleSubmit", (values, {
      setSubmitting,
      resetForm
    }) => {
      setSubmitting(true);
      const countCatagories = values.mainCategoryTypesNew.split(',').length;
      const countSubCatagories = values.subCategoryTypesNew.split(',').length;

      if (countCatagories === this.props.settings.mainCategories.length) {
        values.mainCategoryTypesNew = '0';
      }

      if (countSubCatagories === this.state.subCategoryOptionsNew.length) {
        values.subCategoryTypesNew = '0';
      }

      const customers = this.state.listOfCustomerValid.map(item => {
        return {
          id: item.custId,
          name: item.val
        };
      });
      const data = {
        CategoryIds: values.mainCategoryTypesNew,
        SubCategoryIds: values.subCategoryTypesNew,
        CommunicationIds: values.comunicationToolTypesNew,
        Customers: customers
      };
      this.props.createCommunication(data).then(() => {
        if (this.props.createCommunicationResult.isSuccessful) {
          if (values.isSaveAndContinue) {
            values.customerNameInput = '';
            this.setState({
              listOfCustomerValid: '',
              listOfCustomer: '',
              isSuccessful: true
            });
            this.handleResetSubCatagory();
            resetForm({});
            setSubmitting(false);
            setTimeout(() => {
              this.props.setCreateCommunicationResult('');
            }, 3000);
          } else {
            this.setState({
              isSuccessful: false
            });
            setTimeout(() => {
              this.props.onSuccess();
            }, 3000);
          }
        } else {
          setSubmitting(false);
        }
      });
    });

    this.state = {
      mainCategoryOptionsNew: [],
      subCategoryOptionsNew: [],
      communicationToolOptionsNew: [],
      selectedSubCategoryIdsNew: [],
      listOfCustomerValid: [],
      listOfCustomer: [],
      isSuccessful: false
    };
  }

  componentDidMount() {
    this.setState({
      mainCategoryOptionsNew: this.props.settings.mainCategories,
      communicationToolOptionsNew: this.props.settings.communicationTools
    });
  }

  render() {
    const initialValuesNewForm = {
      customerNameInput: '',
      mainCategoryTypesNew: '',
      subCategoryTypesNew: '',
      comunicationToolTypesNew: '',
      isVerifiedCustomers: false,
      isSaveAndContinue: false
    };
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["Modal"], {
      show: true,
      className: "communication-setting-modal",
      dialogAs: _jsroot_components_DraggableModalDialog__WEBPACK_IMPORTED_MODULE_10__["default"],
      backdrop: "static",
      keyboard: false,
      size: "xl",
      centered: true,
      onHide: this.props.onClose
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["Modal"].Header, {
      closeButton: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["Modal"].Title, {
      as: "div"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_14__["default"].getResource('InsertNewSetting'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_9__["Formik"], {
      initialValues: initialValuesNewForm,
      validate: this.validateNewCommunication,
      onSubmit: this.handleSubmit
    }, this.renderFormNewCommunication));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_6__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_7__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    createCommunicationResult,
    settings
  } = state;
  return {
    createCommunicationResult,
    settings
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_5__["connect"])(mapStateToProps, mapDispatchToProps)(NewCommunitionSetting));

/***/ }),

/***/ "./www/sources/js/pages/admin-tool/communication-setting/components/ValidateCustomerResult.jsx":
/*!*****************************************************************************************************!*\
  !*** ./www/sources/js/pages/admin-tool/communication-setting/components/ValidateCustomerResult.jsx ***!
  \*****************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ValidateCustomerResult; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




class ValidateCustomerResult extends react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"] {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "renderClassNameCustomer", id => {
      if (id === 0) {
        return 'invalid';
      }

      return id > 0 ? 'customer' : 'guest';
    });
  }

  render() {
    const {
      listOfCustomers
    } = this.props;
    return listOfCustomers && listOfCustomers.length > 0 ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Group, {
      as: react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Row"]
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Label, {
      column: true,
      sm: "2",
      md: "2"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
      sm: "9",
      md: "9",
      className: "d-flex"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "pl-2 mr-5 customerShow"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getResource('Customer')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "pl-2 mr-5 guestShow"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getResource('Guest')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "pl-2 mr-5 invalidShow"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getResource('Invalid')))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Group, {
      as: react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Row"]
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Label, {
      column: true,
      sm: "2",
      md: "2"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
      sm: "10",
      md: "10"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "d-flex flex-wrap customersList"
    }, listOfCustomers.map((item, index) => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: `m-2 px-2 txt-${this.renderClassNameCustomer(item.custId)}`,
        key: index
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "fa fa-times  pr-2",
        onClick: () => this.props.onClick(item.custId)
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "customer-name"
      }, item.val));
    }))))) : null;
  }

}

/***/ }),

/***/ "./www/sources/js/pages/admin-tool/communication-setting/functions.js":
/*!****************************************************************************!*\
  !*** ./www/sources/js/pages/admin-tool/communication-setting/functions.js ***!
  \****************************************************************************/
/*! exports provided: getSubCategories */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSubCategories", function() { return getSubCategories; });
const getSubCategories = (isCheckDefault, subCategoryList, selectedSubCategoryIds) => {
  const selectedIdsDistinct = [];
  const distinctSub = [];
  subCategoryList.map(sub => {
    if (selectedIdsDistinct.indexOf(sub.subCategoryId) < 0) {
      selectedIdsDistinct.push(sub.subCategoryId);
      distinctSub.push(sub);
    }
  });
  const distinctSubCategories = distinctSub.map(sub => {
    return {
      name: sub.name,
      subCategoryId: sub.subCategoryId,
      checked: isCheckDefault ? true : selectedSubCategoryIds.indexOf(sub.subCategoryId.toString()) >= 0 ? true : false
    };
  });
  return distinctSubCategories;
};
const functions = {
  getSubCategories
};

/***/ }),

/***/ "./www/sources/js/pages/admin-tool/communication-setting/index.js":
/*!************************************************************************!*\
  !*** ./www/sources/js/pages/admin-tool/communication-setting/index.js ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return index; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @reduxjs/toolkit */ "./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");
/* harmony import */ var _communicationsettingSlice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./communicationsettingSlice */ "./www/sources/js/pages/admin-tool/communication-setting/communicationsettingSlice.js");
/* harmony import */ var _components_AppContainer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/AppContainer */ "./www/sources/js/pages/admin-tool/communication-setting/components/AppContainer.jsx");
/* harmony import */ var _cssroot_pages_admin_tool_communication_setting_index_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @cssroot/pages/admin-tool/communication-setting/index.scss */ "./www/sources/css/pages/admin-tool/communication-setting/index.scss");
/* harmony import */ var _cssroot_pages_admin_tool_communication_setting_index_scss__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_cssroot_pages_admin_tool_communication_setting_index_scss__WEBPACK_IMPORTED_MODULE_5__);





const store = Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__["configureStore"])({
  reducer: _communicationsettingSlice__WEBPACK_IMPORTED_MODULE_3__["default"]
});

const isHost = true;
class index extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_1__["Provider"], {
      store: store
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "communication-setting"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_AppContainer__WEBPACK_IMPORTED_MODULE_4__["default"], {
      isHost: isHost
    })));
  }

}

/***/ })

}]);
//# sourceMappingURL=4.chunk.js.map