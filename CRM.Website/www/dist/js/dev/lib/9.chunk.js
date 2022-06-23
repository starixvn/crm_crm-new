(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[9],{

/***/ "./www/sources/css/pages/pic-and-headline/management/index.scss":
/*!**********************************************************************!*\
  !*** ./www/sources/css/pages/pic-and-headline/management/index.scss ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./www/sources/js/pages/pic-and-headline/management/actions.js":
/*!*********************************************************************!*\
  !*** ./www/sources/js/pages/pic-and-headline/management/actions.js ***!
  \*********************************************************************/
/*! exports provided: ActionCreators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionCreators", function() { return ActionCreators; });
/* harmony import */ var _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/common/site */ "./www/sources/js/common/site.js");
/* harmony import */ var _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/common/dataService */ "./www/sources/js/common/dataService.js");
/* harmony import */ var _picManagementSlice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./picManagementSlice */ "./www/sources/js/pages/pic-and-headline/management/picManagementSlice.js");




const getAllSetting = () => async dispatch => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl('PicManagement/GetAllSetting');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__["default"].postDataAsync(url).then(response => {
    if (!response || !response.data) {
      return;
    }

    dispatch(Object(_picManagementSlice__WEBPACK_IMPORTED_MODULE_2__["setSetting"])(response.data));
  });
};

const getRolesByPic = id => async () => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl(`PicManagement/GetRolesByPic/${id}`);
  return await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__["default"].getDataAsync(url, id).then(response => response.data);
};

const getGridData = params => async dispatch => {
  _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].blockUI();
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl('PicManagement/GetReport');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__["default"].postDataAsync(url, params).then(response => {
    dispatch(Object(_picManagementSlice__WEBPACK_IMPORTED_MODULE_2__["setGridData"])(response.data));
  }).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].unblockUI());
};

const exportExcel = params => async dispatch => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl('PicManagement/ExportExcel');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__["default"].getFileAsync(url, params).then(response => {
    const fileName = response.headers['content-disposition'].split('filename=')[1].split("\"")[1];
    _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].downloadFile(response.data, fileName);
  });
};

const changeActiveStatus = params => async dispatch => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl('PicManagement/ChangePicState');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__["default"].postDataAsync(url, params).then(response => {
    dispatch(Object(_picManagementSlice__WEBPACK_IMPORTED_MODULE_2__["setActiveResult"])(response.data));
  });
};

const createPic = params => async dispatch => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl('PicManagement/CreatePic');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__["default"].postDataAsync(url, params).then(response => {
    dispatch(Object(_picManagementSlice__WEBPACK_IMPORTED_MODULE_2__["setCreatePicResult"])(response.data));
  });
};

const editPic = params => async dispatch => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl('PicManagement/EditPic');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__["default"].postDataAsync(url, params).then(response => {
    dispatch(Object(_picManagementSlice__WEBPACK_IMPORTED_MODULE_2__["setEditPicResult"])(response.data));
  });
};

const validateEditPic = params => async dispatch => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl('PicManagement/ValidateEditPic');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__["default"].postDataAsync(url, params).then(response => {
    dispatch(Object(_picManagementSlice__WEBPACK_IMPORTED_MODULE_2__["setValidateEditPicResult"])(response.data));
  });
};

const ActionCreators = {
  resetState: _picManagementSlice__WEBPACK_IMPORTED_MODULE_2__["resetState"],
  setSetting: _picManagementSlice__WEBPACK_IMPORTED_MODULE_2__["setSetting"],
  getRolesByPic,
  setGridParams: _picManagementSlice__WEBPACK_IMPORTED_MODULE_2__["setGridParams"],
  setGridData: _picManagementSlice__WEBPACK_IMPORTED_MODULE_2__["setGridData"],
  setSelectedPic: _picManagementSlice__WEBPACK_IMPORTED_MODULE_2__["setSelectedPic"],
  setCreatePicPopup: _picManagementSlice__WEBPACK_IMPORTED_MODULE_2__["setCreatePicPopup"],
  setCreatePicResult: _picManagementSlice__WEBPACK_IMPORTED_MODULE_2__["setCreatePicResult"],
  setEditPicPopup: _picManagementSlice__WEBPACK_IMPORTED_MODULE_2__["setEditPicPopup"],
  setEditPicResult: _picManagementSlice__WEBPACK_IMPORTED_MODULE_2__["setEditPicResult"],
  setActiveResult: _picManagementSlice__WEBPACK_IMPORTED_MODULE_2__["setActiveResult"],
  setConfirmPopup: _picManagementSlice__WEBPACK_IMPORTED_MODULE_2__["setConfirmPopup"],
  setValidateEditPicResult: _picManagementSlice__WEBPACK_IMPORTED_MODULE_2__["setValidateEditPicResult"],
  getAllSetting,
  getGridData,
  exportExcel,
  changeActiveStatus,
  createPic,
  editPic,
  validateEditPic
};

/***/ }),

/***/ "./www/sources/js/pages/pic-and-headline/management/common.functions.js":
/*!******************************************************************************!*\
  !*** ./www/sources/js/pages/pic-and-headline/management/common.functions.js ***!
  \******************************************************************************/
/*! exports provided: renderOption, validateFormik, getTemplateCommunicationTool */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderOption", function() { return renderOption; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateFormik", function() { return validateFormik; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTemplateCommunicationTool", function() { return getTemplateCommunicationTool; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");


const renderOption = (item, key, label) => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
    key: item[key],
    value: item[key]
  }, item[label]);
};
const validateFormik = values => {
  const errors = {};

  if (!values.picName || values.picName.trim().length === 0) {
    errors.picName = _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('NameRequired');
  }

  if (!values.roleId) {
    errors.roleId = _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('RoleRequired');
  }

  let validCommunication = false;

  for (let key in values) {
    if (key.includes('communication') && values[key]) {
      validCommunication = true;

      if (!values[key].type || !values[key].value) {
        errors[key] = _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('CommunicationMustHaveValue');
      }
    }
  }

  if (!validCommunication) {
    errors.communication = _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('CommunicationRequired');
  }

  return errors;
};
const getTemplateCommunicationTool = () => {
  return {
    type: '',
    value: '',
    unique: new Date().getTime()
  };
};

/***/ }),

/***/ "./www/sources/js/pages/pic-and-headline/management/components/AppContainer.jsx":
/*!**************************************************************************************!*\
  !*** ./www/sources/js/pages/pic-and-headline/management/components/AppContainer.jsx ***!
  \**************************************************************************************/
/*! exports provided: AppContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppContainer", function() { return AppContainer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/pic-and-headline/management/actions.js");
/* harmony import */ var _EditPicManagement__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./EditPicManagement */ "./www/sources/js/pages/pic-and-headline/management/components/EditPicManagement.jsx");
/* harmony import */ var _NewPicManagement__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./NewPicManagement */ "./www/sources/js/pages/pic-and-headline/management/components/NewPicManagement.jsx");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/lib/index.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_toastify__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _jsroot_components_ConfirmPopup__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jsroot/components/ConfirmPopup */ "./www/sources/js/components/ConfirmPopup.jsx");
/* harmony import */ var _DataGrid__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./DataGrid */ "./www/sources/js/pages/pic-and-headline/management/components/DataGrid.jsx");
/* harmony import */ var _Filter__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./Filter */ "./www/sources/js/pages/pic-and-headline/management/components/Filter.jsx");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }













class AppContainer extends react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "changeActiveStatus", () => {
      const {
        picId,
        checked
      } = this.props.confirmPopup;
      this.props.changeActiveStatus({
        picId,
        IsActive: checked
      }).then(() => {
        this.closeConfirmActive();
        const {
          activeResult
        } = this.props;

        if (activeResult.isSuccessful) {
          const message = checked ? 'ActivePICSuccess' : 'DeactivatePICSuccess';
          react_toastify__WEBPACK_IMPORTED_MODULE_7__["toast"].success(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_11__["default"].getResource(message));
          this.props.getGridData(this.props.gridParams);
        } else {
          react_toastify__WEBPACK_IMPORTED_MODULE_7__["toast"].error(activeResult.message);
        }
      });
    });

    _defineProperty(this, "closeConfirmActive", () => {
      this.props.setConfirmPopup({
        show: false,
        username: '',
        picId: null,
        checked: false
      });
    });
  }

  componentWillUnmount() {
    this.props.resetState();
  }

  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Filter__WEBPACK_IMPORTED_MODULE_10__["default"], {
      isHost: this.props.isHost
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DataGrid__WEBPACK_IMPORTED_MODULE_9__["default"], {
      isHost: this.props.isHost
    }), this.props.createPicPopup.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_NewPicManagement__WEBPACK_IMPORTED_MODULE_6__["default"], null), this.props.editPicPopup.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_EditPicManagement__WEBPACK_IMPORTED_MODULE_5__["default"], null), this.props.confirmPopup.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_ConfirmPopup__WEBPACK_IMPORTED_MODULE_8__["default"], {
      size: "lg",
      title: _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_11__["default"].getResource('ChangePICState'),
      content: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "Are you sure you want to ", this.props.confirmPopup.checked ? 'active' : 'deactivate', ` PIC ${this.props.confirmPopup.username}? `, this.props.confirmPopup.checked ? '' : _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_11__["default"].formatString('The PIC assignment shall be removed, and the Recipient {0} shall be removed from Chat Type Mapping if it exists.', this.props.confirmPopup.username)),
      onSubmit: this.changeActiveStatus,
      onClose: this.closeConfirmActive
    }));
  }

}

_defineProperty(AppContainer, "propTypes", {
  createPicPopup: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    show: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool
  }).isRequired,
  editPicPopup: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    show: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool
  }).isRequired,
  isHost: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool.isRequired
});

_defineProperty(AppContainer, "defaultProps", {
  createPicPopup: {
    show: false
  },
  editPicPopup: {
    show: false
  },
  confirmPopup: {
    show: false
  },
  isHost: false
});

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_3__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_4__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    gridParams,
    createPicPopup,
    editPicPopup,
    confirmPopup,
    activeResult
  } = state;
  return {
    gridParams,
    createPicPopup,
    editPicPopup,
    confirmPopup,
    activeResult
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(AppContainer));

/***/ }),

/***/ "./www/sources/js/pages/pic-and-headline/management/components/DataGrid.jsx":
/*!**********************************************************************************!*\
  !*** ./www/sources/js/pages/pic-and-headline/management/components/DataGrid.jsx ***!
  \**********************************************************************************/
/*! exports provided: DataGrid, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataGrid", function() { return DataGrid; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/pic-and-headline/management/actions.js");
/* harmony import */ var _jsroot_components_react_grid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/components/react-grid */ "./www/sources/js/components/react-grid/index.jsx");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/common/constants */ "./www/sources/js/common/constants.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









class DataGrid extends react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "onPaging", (pageIndex, pageSize) => {
      const params = _objectSpread({}, this.props.gridParams);

      params['pageIndex'] = pageIndex;
      params['pageSize'] = pageSize;
      this.props.setGridParams(params);
      this.props.getGridData(params);
    });

    _defineProperty(this, "handleExportExcel", () => {
      const {
        gridParams
      } = this.props;
      this.props.exportExcel(gridParams);
    });

    _defineProperty(this, "handleEdit", item => {
      this.props.setSelectedPic(item);
      this.props.setEditPicPopup({
        show: true
      });
    });

    _defineProperty(this, "handleActiveStatus", (username, picId, checked) => {
      if (!this.props.isHost) {
        return;
      }

      this.props.setConfirmPopup({
        show: true,
        username,
        picId,
        checked
      });
    });

    _defineProperty(this, "buildHeader", isHost => {
      const {
        communicationTools
      } = this.props.setting;
      return [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid__WEBPACK_IMPORTED_MODULE_4__["HeaderRow"], {
        key: 'header1'
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 10,
        rowSpan: 2
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('SymbolNo')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 20,
        rowSpan: 2
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('PicType')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 20,
        rowSpan: 2
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Name')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 15,
        rowSpan: 2
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Role')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 20,
        rowSpan: 2
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Language')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 20,
        rowSpan: 2
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Country')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 25,
        rowSpan: 2
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('GroupHeadline')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 50,
        colSpan: communicationTools.length
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('CommunicationTool')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 25,
        rowSpan: 2
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Remark')), isHost && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 10,
        rowSpan: 2
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Edit')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 10,
        rowSpan: 2
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Active'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid__WEBPACK_IMPORTED_MODULE_4__["HeaderRow"], {
        key: 'header2'
      }, this.renderHeaderCommunicationTools(communicationTools))];
    });

    _defineProperty(this, "buildBody", isHost => {
      const {
        pageIndex,
        pageSize
      } = this.props.gridParams;
      const startIndex = (pageIndex - 1) * pageSize + 1;

      if (this.props.gridData.dataList.length > 0) {
        return this.props.gridData.dataList.map((item, index) => this.renderRow(item, index + startIndex, isHost));
      }

      const {
        communicationTools
      } = this.props.setting;
      const countColumn = (isHost ? 9 : 8) + communicationTools.length;
      return [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid__WEBPACK_IMPORTED_MODULE_4__["Row"], {
        key: `body${1}`,
        className: "no-data"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: "text-center",
        colSpan: countColumn
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('ThereIsNoData')))];
    });

    _defineProperty(this, "renderRow", (item, index, isHost) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid__WEBPACK_IMPORTED_MODULE_4__["Row"], {
      key: item.picId
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
      className: "text-center"
    }, index), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid__WEBPACK_IMPORTED_MODULE_4__["Cell"], null, item.picTypeName), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid__WEBPACK_IMPORTED_MODULE_4__["Cell"], null, item.username), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
      className: "text-center"
    }, item.roleName), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid__WEBPACK_IMPORTED_MODULE_4__["Cell"], null, item.languages.map(language => language.settingValue).join(', ')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid__WEBPACK_IMPORTED_MODULE_4__["Cell"], null, item.countryName), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid__WEBPACK_IMPORTED_MODULE_4__["Cell"], null, item.groupHeadline), this.renderBodyCommunicationTools(item.communicationTools), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
      className: "td-remark"
    }, item.remark), isHost && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
      className: "text-center"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "rounded-circle fa fa-pencil icon-edit",
      onClick: () => this.handleEdit(item)
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
      className: "text-center"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Form"].Control, {
      className: "checkbox-cell-style",
      id: `active-pic-${item.picId}`,
      type: "checkbox",
      checked: item.isActive,
      disabled: !isHost,
      onChange: e => this.handleActiveStatus(item.username, item.picId, e.target.checked)
    }))));

    _defineProperty(this, "renderHeaderCommunicationTools", communicationTools => {
      const header = [];
      communicationTools.forEach(item => {
        header.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
          colWidth: 20,
          key: item.settingId
        }, item.settingValue));
      });
      return header;
    });

    _defineProperty(this, "renderBodyCommunicationTools", communicationTools => {
      const communicationToolsProps = this.props.setting.communicationTools;
      const data = [];
      communicationToolsProps.forEach(item => {
        const tool = communicationTools.find(c => c.settingId === item.settingId);
        const value = tool ? tool.value : '';
        data.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
          key: item.settingId
        }, value));
      });
      return data;
    });
  }

  render() {
    if (!this.props.gridData || !this.props.gridData.dataList) {
      return null;
    }

    const {
      isHost
    } = this.props;
    const {
      total
    } = this.props.gridData;
    const {
      pageIndex,
      pageSize
    } = this.props.gridParams;
    const pagingOption = {
      PageIndex: pageIndex,
      PageSize: pageSize,
      TotalItem: total,
      PageList: _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_7__["PAGING_SIZES"]
    };
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "table-title d-flex justify-content-between align-items-center"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('PICManagement')), this.props.gridData.dataList.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "tool-box"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "fa fa-file-excel-o btn-export-excel icon-excel",
      onClick: this.handleExportExcel
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid__WEBPACK_IMPORTED_MODULE_4__["Table"], {
      maxWidth: 2300,
      shouldUseMaxWidth: true,
      width: document.getElementById('right-row-container').clientWidth,
      autoWidth: false,
      header: this.buildHeader(isHost),
      body: this.buildBody(isHost),
      isPaging: true,
      pageOption: pagingOption,
      onPaging: this.onPaging,
      containerPadding: 0,
      adjustedHeight: 10
    }));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    setting,
    gridParams,
    gridData
  } = state;
  return {
    setting,
    gridParams,
    gridData
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(DataGrid));

/***/ }),

/***/ "./www/sources/js/pages/pic-and-headline/management/components/EditPicManagement.jsx":
/*!*******************************************************************************************!*\
  !*** ./www/sources/js/pages/pic-and-headline/management/components/EditPicManagement.jsx ***!
  \*******************************************************************************************/
/*! exports provided: EditPicManagement, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditPicManagement", function() { return EditPicManagement; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/pic-and-headline/management/actions.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! formik */ "./node_modules/formik/dist/formik.esm.js");
/* harmony import */ var _jsroot_components_DraggableModalDialog__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/components/DraggableModalDialog */ "./www/sources/js/components/DraggableModalDialog.jsx");
/* harmony import */ var _jsroot_components_FormikErrorMessage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/components/FormikErrorMessage */ "./www/sources/js/components/FormikErrorMessage.jsx");
/* harmony import */ var _jsroot_components_ResponseMessage__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jsroot/components/ResponseMessage */ "./www/sources/js/components/ResponseMessage.jsx");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var _jsroot_components_multiple_select_index__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @jsroot/components/multiple-select/index */ "./www/sources/js/components/multiple-select/index.jsx");
/* harmony import */ var _jsroot_components_ConfirmPopup__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @jsroot/components/ConfirmPopup */ "./www/sources/js/components/ConfirmPopup.jsx");
/* harmony import */ var _common_functions__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../common.functions */ "./www/sources/js/pages/pic-and-headline/management/common.functions.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }














class EditPicManagement extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleRolesOption", picTpe => {
      this.props.getRolesByPic(picTpe).then(data => {
        this.setState({
          roles: data
        });
      });
    });

    _defineProperty(this, "handleChangePicType", (event, setFieldValue) => {
      const value = event.target.value;
      setFieldValue('picType', value);
      setFieldValue('roleId', '');
      this.handleRolesOption(value);
    });

    _defineProperty(this, "handleConfirmCancelPopup", event => {
      const {
        values
      } = this.formik;

      if (event) {
        event.preventDefault();
      }

      const initialValues = this.getInitValue();

      if (Object.entries(values).toString() === Object.entries(initialValues).toString()) {
        this.handleClosePopup();
      } else {
        this.setState({
          showConfirmClose: true
        });
      }
    });

    _defineProperty(this, "handleCloseConfirm", () => {
      this.setState({
        showConfirmClose: false
      });
    });

    _defineProperty(this, "handleClosePopup", () => {
      this.props.setEditPicPopup({
        show: false
      });

      if (this.props.editPicResult) {
        this.props.setEditPicResult(null);
      }
    });

    _defineProperty(this, "handleAddRowCommunication", () => {
      const {
        communicationTools
      } = this.state;
      const temp = Object(_common_functions__WEBPACK_IMPORTED_MODULE_12__["getTemplateCommunicationTool"])();
      this.formik.values[`communication-${temp.unique}`] = {
        type: temp.type,
        value: temp.value
      };
      this.setState({
        communicationTools: [...communicationTools, temp]
      });
    });

    _defineProperty(this, "handleRemoveRowCommunication", unique => {
      const data = [...this.state.communicationTools];
      const index = data.findIndex(c => c.unique === unique);
      data.splice(index, 1);
      this.setState({
        communicationTools: data
      });

      if (this.formik.values[`communication-${unique}`]) {
        delete this.formik.values[`communication-${unique}`];
      }
    });

    _defineProperty(this, "handleConfirmSavePopup", () => {
      const {
        values
      } = this.formik;
      const template = this.getTemplateEdit(values);
      this.props.validateEditPic({
        picId: template.picId,
        picCommunicationTools: template.picCommunicationTools
      }).then(() => {
        if (this.props.validateEditPicResult) {
          this.setState({
            confirmSave: {
              show: true,
              message: this.props.validateEditPicResult
            }
          }, () => {
            this.props.setValidateEditPicResult(null);
          });
        } else {
          this.formik.handleSubmit();
        }
      });
    });

    _defineProperty(this, "handleSubmitEditConfirm", () => {
      this.handleCloseEditConfirm();
      this.formik.handleSubmit();
    });

    _defineProperty(this, "handleCloseEditConfirm", () => {
      this.setState({
        confirmSave: {
          show: false,
          message: ''
        }
      });
    });

    _defineProperty(this, "handleSubmit", (values, {
      setSubmitting
    }) => {
      setSubmitting(true);
      const template = this.getTemplateEdit(values);
      this.props.editPic(template).then(() => {
        if (this.props.editPicResult.isSuccessful) {
          setTimeout(() => {
            this.handleClosePopup();
            this.props.getGridData(this.props.gridParams);
            this.props.setEditPicResult(null);
          }, 3000);
        } else {
          setSubmitting(false);
        }
      });
    });

    _defineProperty(this, "getTemplateEdit", values => {
      const picCommunicationTools = [];

      for (const key in values) {
        if (key.includes('communication') && values[key]) {
          const index = picCommunicationTools.findIndex(item => +item.type === +values[key].type);

          if (index >= 0) {
            const newValue = picCommunicationTools[index].value.concat(', ', values[key].value);
            picCommunicationTools[index].value = newValue;
          } else {
            picCommunicationTools.push(_objectSpread({}, values[key]));
          }
        }
      }

      return {
        picType: values.picType,
        picId: values.picId,
        picName: values.picName,
        role: values.roleId,
        language: values.languageIds,
        country: values.countryId,
        remark: values.remark,
        picCommunicationTools
      };
    });

    _defineProperty(this, "renderCommunicationTool", ({
      values,
      errors,
      touched,
      handleChange
    }) => {
      const {
        communicationTools
      } = this.state;
      return communicationTools.map((item, index) => {
        const isInvalidFirstRowCommunicationTools = index === 0 && touched.communication && errors.communication;
        const isInvalidCommunicationTools = touched[`communication-${item.unique}`] && errors[`communication-${item.unique}`] || isInvalidFirstRowCommunicationTools;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
          as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"],
          key: item.unique
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
          sm: "4",
          md: "3",
          className: "select-communication"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
          as: "select",
          size: "sm",
          className: "shadow-none",
          isInvalid: isInvalidCommunicationTools,
          value: values[`communication-${item.unique}`].type,
          name: `communication-${item.unique}.type`,
          id: `communication-${item.unique}.type`,
          onChange: handleChange
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
          value: "",
          disabled: true,
          hidden: true
        }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('PleaseSelect')), this.props.setting.communicationTools.map(com => Object(_common_functions__WEBPACK_IMPORTED_MODULE_12__["renderOption"])(com, 'settingId', 'settingValue'))), index === 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          className: "required"
        }, "*")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
          sm: "8",
          md: "9"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
          sm: "11",
          md: "11"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
          type: "text",
          size: "sm",
          name: `communication-${item.unique}.value`,
          id: `communication-${item.unique}.value`,
          value: values[`communication-${item.unique}`].value,
          className: "shadow-none",
          autoComplete: "off",
          isInvalid: isInvalidCommunicationTools,
          onChange: handleChange,
          placeholder: _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('SeparatedByComma')
        })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
          sm: "1",
          md: "1",
          className: "tool-action"
        }, index > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          onClick: () => this.handleRemoveRowCommunication(item.unique),
          className: "fa fa-times mr-2"
        }), index === communicationTools.length - 1 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          onClick: () => this.handleAddRowCommunication(),
          className: "fa fa-plus"
        })))));
      });
    });

    _defineProperty(this, "renderForm", ({
      values,
      errors,
      touched,
      handleChange,
      handleSubmit,
      setFieldValue,
      isSubmitting
    }) => {
      const {
        picTypeList,
        countries
      } = this.props.setting;
      const {
        languages
      } = this.state;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"], {
        noValidate: true,
        onSubmit: handleSubmit
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Body, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_FormikErrorMessage__WEBPACK_IMPORTED_MODULE_7__["default"], {
        touched: touched,
        errors: errors,
        fieldNames: Object.keys(values)
      }), this.props.editPicResult && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_ResponseMessage__WEBPACK_IMPORTED_MODULE_8__["default"], {
        isSuccessful: this.props.editPicResult.isSuccessful,
        message: this.props.editPicResult.message || _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('EditPICSuccess')
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        className: "required",
        column: true,
        md: "3",
        sm: "4",
        htmlFor: "picType"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('PicType')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        md: "9",
        sm: "8"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        as: "select",
        size: "sm",
        className: "shadow-none",
        isInvalid: touched.picType && errors.picType,
        value: values.picType,
        name: "picType",
        id: "picType",
        onChange: e => this.handleChangePicType(e, setFieldValue)
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        value: "",
        disabled: true,
        hidden: true
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('PleaseSelect')), picTypeList.map(item => Object(_common_functions__WEBPACK_IMPORTED_MODULE_12__["renderOption"])(item, 'settingId', 'settingValue'))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        md: "3",
        column: true,
        sm: "4",
        htmlFor: "picName",
        className: "required"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('Name')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        md: "9",
        sm: "8"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        type: "text",
        size: "sm",
        name: "picName",
        id: "picName",
        isInvalid: touched.picName && errors.picName,
        className: "shadow-none",
        autoComplete: "off",
        value: values.picName,
        onChange: handleChange
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        className: "required",
        column: true,
        sm: "4",
        md: "3",
        htmlFor: "roleId"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('Role')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "8",
        md: "9"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        as: "select",
        className: "shadow-none",
        size: "sm",
        isInvalid: touched.roleId && errors.roleId,
        name: "roleId",
        id: "roleId",
        value: values.roleId,
        onChange: handleChange
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        disabled: true,
        hidden: true,
        value: ""
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('PleaseSelect')), this.state.roles.map(item => Object(_common_functions__WEBPACK_IMPORTED_MODULE_12__["renderOption"])(item, 'settingId', 'settingValue'))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        htmlFor: "languageIds",
        column: true,
        sm: "4",
        md: "3"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('Language')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "8",
        md: "9"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_multiple_select_index__WEBPACK_IMPORTED_MODULE_10__["default"], {
        id: "languageIds",
        name: "languageIds",
        keyField: "settingId",
        isAllTextShown: true,
        valueField: "settingValue",
        statusField: "checked",
        dataSource: languages,
        onChange: (currentItem, selectedItemsKey) => {
          handleChange('languageIds')(selectedItemsKey);
        }
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        htmlFor: "countryId",
        column: true,
        sm: "4",
        md: "3"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('Country')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "8",
        md: "9"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        as: "select",
        className: "shadow-none",
        size: "sm",
        name: "countryId",
        id: "countryId",
        isInvalid: touched.countryId && errors.countryId,
        value: values.countryId,
        onChange: handleChange
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        value: 0,
        hidden: true,
        disabled: true
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('PleaseSelect')), countries.map(item => Object(_common_functions__WEBPACK_IMPORTED_MODULE_12__["renderOption"])(item, 'id', 'name'))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        htmlFor: "remark",
        column: true,
        sm: "4",
        md: "3"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('Remark')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "8",
        md: "9"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        as: "textarea",
        className: "shadow-none form-control",
        name: "remark",
        id: "remark",
        rows: "4",
        value: values.remark,
        onChange: handleChange
      }))), this.renderCommunicationTool({
        values,
        errors,
        touched,
        handleChange
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Footer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], {
        size: "sm",
        variant: "primary",
        disabled: isSubmitting,
        onClick: this.handleConfirmSavePopup
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('Save')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], {
        size: "sm",
        variant: "primary",
        onClick: this.handleConfirmCancelPopup
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('Cancel'))));
    });

    _defineProperty(this, "getInitValue", () => {
      const {
        selectedPic
      } = this.props;
      const tempCommunication = {};
      selectedPic.communicationTools.forEach((item, index) => {
        tempCommunication[`communication-${index}`] = {
          type: item.settingId,
          value: item.value
        };
      });
      return _objectSpread({
        picType: selectedPic.picType,
        picId: selectedPic.picId,
        picName: selectedPic.username,
        roleId: selectedPic.roleId,
        languageIds: selectedPic.languages.map(item => item.settingId).join(','),
        countryId: selectedPic.countryId,
        communication: null,
        remark: selectedPic.remark
      }, tempCommunication);
    });

    this.formik = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
    let _communicationTools = [];

    if (this.props.selectedPic.communicationTools.length > 0) {
      _communicationTools = this.props.selectedPic.communicationTools.map((item, index) => ({
        type: item.settingId,
        value: item.value,
        unique: index
      }));
    }

    const _languages = this.props.setting.languages.map(item => {
      const index = this.props.selectedPic.languages.findIndex(language => language.settingId === item.settingId);

      if (index >= 0) {
        return _objectSpread(_objectSpread({}, item), {}, {
          checked: true
        });
      }

      return item;
    });

    this.props.selectedPic.languages.forEach(item => {
      const index = _languages.findIndex(language => language.settingId === item.settingId);

      if (index < 0) {
        _languages.push(_objectSpread(_objectSpread({}, item), {}, {
          checked: true
        }));
      }
    });
    this.state = {
      communicationTools: _communicationTools,
      languages: _languages,
      roles: [],
      showConfirmClose: false,
      confirmSave: {
        show: false,
        message: ''
      }
    };
  }

  componentDidMount() {
    this.handleRolesOption(this.props.selectedPic.picType);
  }

  render() {
    const initialValues = this.getInitValue();
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"], {
      show: true,
      className: "pic-management-modal",
      dialogAs: _jsroot_components_DraggableModalDialog__WEBPACK_IMPORTED_MODULE_6__["default"],
      backdrop: "static",
      keyboard: false,
      centered: true,
      size: "lg",
      onHide: this.handleConfirmCancelPopup
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Header, {
      closeButton: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Title, {
      as: "div"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('EditPIC'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_5__["Formik"], {
      initialValues: initialValues,
      innerRef: p => this.formik = p,
      validate: _common_functions__WEBPACK_IMPORTED_MODULE_12__["validateFormik"],
      onSubmit: this.handleSubmit
    }, this.renderForm), this.state.showConfirmClose && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_ConfirmPopup__WEBPACK_IMPORTED_MODULE_11__["default"], {
      title: _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('Confirmation'),
      content: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('ConfirmDirtyMessage')),
      size: "lg",
      onSubmit: this.handleClosePopup,
      onClose: this.handleCloseConfirm
    }), this.state.confirmSave.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_ConfirmPopup__WEBPACK_IMPORTED_MODULE_11__["default"], {
      title: _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('Confirmation'),
      content: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, this.state.confirmSave.message),
      size: "lg",
      onSubmit: this.handleSubmitEditConfirm,
      onClose: this.handleCloseEditConfirm
    }));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    setting,
    gridParams,
    selectedPic,
    editPicResult,
    validateEditPicResult
  } = state;
  return {
    setting,
    gridParams,
    selectedPic,
    editPicResult,
    validateEditPicResult
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(EditPicManagement));

/***/ }),

/***/ "./www/sources/js/pages/pic-and-headline/management/components/Filter.jsx":
/*!********************************************************************************!*\
  !*** ./www/sources/js/pages/pic-and-headline/management/components/Filter.jsx ***!
  \********************************************************************************/
/*! exports provided: Filter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Filter", function() { return Filter; });
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var _jsroot_components_multiple_select_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/components/multiple-select/index */ "./www/sources/js/components/multiple-select/index.jsx");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/lib/index.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_toastify__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/pic-and-headline/management/actions.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }










class Filter extends react__WEBPACK_IMPORTED_MODULE_1__["PureComponent"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleOpenCreatePopup", () => {
      this.props.setCreatePicPopup({
        show: true
      });
    });

    _defineProperty(this, "handleChangeFilter", (name, value) => {
      this.setState(prevState => ({
        filter: _objectSpread(_objectSpread({}, prevState.filter), {}, {
          [name]: value
        })
      }));
    });

    _defineProperty(this, "getParams", () => {
      const {
        filter
      } = this.state;
      return {
        username: filter.username,
        headlineName: filter.headlineName,
        role: filter.role,
        pageIndex: 1,
        pageSize: this.props.gridParams.pageSize
      };
    });

    _defineProperty(this, "submitHandler", event => {
      event.preventDefault();

      if (!this.state.filter.role) {
        react_toastify__WEBPACK_IMPORTED_MODULE_7__["toast"].error(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getResource('PleaseChooseRole'));
        return;
      }

      const params = this.getParams();
      this.props.setGridParams(params);
      this.props.getGridData(params);
    });

    this.state = {
      filter: {
        username: '',
        headlineName: '',
        role: ''
      },
      settingRoles: []
    };
  }

  componentDidMount() {
    this.props.getAllSetting().then(() => {
      const {
        roleListWithInActive
      } = this.props.setting;
      const selectedRole = [];
      const role = roleListWithInActive.map(r => {
        selectedRole.push(r.settingId);
        return _objectSpread(_objectSpread({}, r), {}, {
          checked: true
        });
      });
      this.setState(prevState => ({
        filter: _objectSpread(_objectSpread({}, prevState.filter), {}, {
          role: selectedRole.toString()
        }),
        settingRoles: role
      }));
    });
  }

  render() {
    const {
      filter,
      settingRoles
    } = this.state;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"], {
      className: "form-filter",
      onSubmit: this.submitHandler
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Row, {
      bsPrefix: "form-row"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, {
      className: "field-name"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
      htmlFor: "NamePIC"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getResource('Name')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Control, {
      type: "text",
      size: "sm",
      className: "shadow-none",
      id: "NamePIC",
      autoComplete: "off",
      value: filter.username,
      onChange: event => this.handleChangeFilter('username', event.target.value)
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
      htmlFor: "GroupHeadline"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getResource('GroupHeadline')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Control, {
      type: "text",
      size: "sm",
      className: "shadow-none",
      id: "GroupHeadline",
      autoComplete: "off",
      value: filter.headlineName,
      onChange: event => this.handleChangeFilter('headlineName', event.target.value)
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
      htmlFor: "roleIds"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getResource('Role')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "form-control-wrapper role-width"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_jsroot_components_multiple_select_index__WEBPACK_IMPORTED_MODULE_4__["default"], {
      id: "roleIds",
      name: "roleIds",
      dataSource: settingRoles,
      initialValue: filter.role,
      keyField: "settingId",
      isSummited: false,
      isAllTextShown: true,
      valueField: "settingValue",
      statusField: "checked",
      onChange: (currentItem, selectedItem) => this.handleChangeFilter('role', selectedItem)
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], {
      variant: "primary",
      size: "sm",
      className: "mr-4",
      onClick: this.submitHandler,
      type: "submit"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getResource('Submit')), this.props.isHost && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], {
      variant: "primary",
      size: "sm",
      onClick: this.handleOpenCreatePopup
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getResource('Insert')))));
  }

}

_defineProperty(Filter, "propTypes", {
  setting: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.shape({
    roleListWithInActive: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.array
  }).isRequired,
  gridParams: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object.isRequired,
  getAllSetting: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,
  setGridParams: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,
  getGridData: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,
  isHost: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool.isRequired
});

_defineProperty(Filter, "defaultProps", {
  setting: {
    roleListWithInActive: []
  },
  gridParams: {},
  getAllSetting: function () {// nothing
  },
  setGridParams: function () {//nothing
  },
  getGridData: function () {// nothing
  },
  isHost: false
});

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_6__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_8__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    setting,
    gridParams
  } = state;
  return {
    setting,
    gridParams
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_5__["connect"])(mapStateToProps, mapDispatchToProps)(Filter));

/***/ }),

/***/ "./www/sources/js/pages/pic-and-headline/management/components/NewPicManagement.jsx":
/*!******************************************************************************************!*\
  !*** ./www/sources/js/pages/pic-and-headline/management/components/NewPicManagement.jsx ***!
  \******************************************************************************************/
/*! exports provided: NewPicManagement, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewPicManagement", function() { return NewPicManagement; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/pic-and-headline/management/actions.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! formik */ "./node_modules/formik/dist/formik.esm.js");
/* harmony import */ var _jsroot_components_DraggableModalDialog__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/components/DraggableModalDialog */ "./www/sources/js/components/DraggableModalDialog.jsx");
/* harmony import */ var _jsroot_components_FormikErrorMessage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/components/FormikErrorMessage */ "./www/sources/js/components/FormikErrorMessage.jsx");
/* harmony import */ var _jsroot_components_ResponseMessage__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jsroot/components/ResponseMessage */ "./www/sources/js/components/ResponseMessage.jsx");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var _jsroot_components_multiple_select_index__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @jsroot/components/multiple-select/index */ "./www/sources/js/components/multiple-select/index.jsx");
/* harmony import */ var _jsroot_components_ConfirmPopup__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @jsroot/components/ConfirmPopup */ "./www/sources/js/components/ConfirmPopup.jsx");
/* harmony import */ var _common_functions__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../common.functions */ "./www/sources/js/pages/pic-and-headline/management/common.functions.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }














class NewPicManagement extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleRolesOption", picTpe => {
      this.props.getRolesByPic(picTpe).then(data => {
        this.setState({
          roles: data
        });
      });
    });

    _defineProperty(this, "handleChangePicType", (event, setFieldValue) => {
      const value = event.target.value;
      setFieldValue('picType', value);
      this.handleRolesOption(value);
    });

    _defineProperty(this, "handleConfirmCancelPopup", event => {
      const {
        values
      } = this.formik;

      if (event) {
        event.preventDefault();
      }

      const initialValues = {
        picName: '',
        roleId: '',
        languageIds: '',
        countryId: 0,
        communication: null,
        remark: ''
      };

      if (Object.entries(values).toString() === Object.entries(initialValues).toString()) {
        this.handleClosePopup();
      } else {
        this.setState({
          showConfirmClose: true
        });
      }
    });

    _defineProperty(this, "handleCloseConfirm", () => {
      this.setState({
        showConfirmClose: false
      });
    });

    _defineProperty(this, "handleClosePopup", () => {
      this.props.setCreatePicPopup({
        show: false
      });

      if (this.props.createPicResult) {
        this.props.setCreatePicResult(null);
      }
    });

    _defineProperty(this, "handleAddRowCommunication", () => {
      const data = [...this.state.communicationTools, Object(_common_functions__WEBPACK_IMPORTED_MODULE_12__["getTemplateCommunicationTool"])()];
      this.setState({
        communicationTools: data
      });
    });

    _defineProperty(this, "handleRemoveRowCommunication", unique => {
      const data = [...this.state.communicationTools];
      const index = data.findIndex(c => c.unique === unique);
      data.splice(index, 1);
      this.setState({
        communicationTools: data
      });
    });

    _defineProperty(this, "handleSubmit", (values, {
      setSubmitting
    }) => {
      setSubmitting(true);
      const template = this.getTemplateCreate(values);
      this.props.createPic(template).then(() => {
        if (this.props.createPicResult.isSuccessful) {
          setTimeout(() => {
            this.handleClosePopup();
            this.props.getGridData(this.props.gridParams);
            this.props.setCreatePicResult(null);
          }, 3000);
        } else {
          setSubmitting(false);
        }
      });
    });

    _defineProperty(this, "getTemplateCreate", values => {
      const picCommunicationTools = [];

      for (const key in values) {
        if (key.includes('communication') && values[key]) {
          const index = picCommunicationTools.findIndex(item => item.type === values[key].type);

          if (index >= 0) {
            const newValue = picCommunicationTools[index].value.concat(',', values[key].value);
            picCommunicationTools[index].value = newValue;
          } else {
            picCommunicationTools.push(values[key]);
          }
        }
      }

      return {
        picName: values.picName,
        picType: values.picType,
        role: values.roleId,
        language: values.languageIds,
        country: values.countryId,
        remark: values.remark,
        picCommunicationTools
      };
    });

    _defineProperty(this, "renderCommunicationTool", ({
      values,
      errors,
      touched,
      handleChange
    }) => {
      const {
        communicationTools
      } = this.state;
      return communicationTools.map((item, index) => {
        const isInvalidFirstRow = index === 0 && touched.communication && errors.communication;
        const isInvalid = touched[`communication-${item.unique}`] && errors[`communication-${item.unique}`] || isInvalidFirstRow;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
          as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"],
          key: item.unique
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
          sm: "4",
          md: "3",
          className: "select-communication"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
          as: "select",
          size: "sm",
          className: "shadow-none",
          isInvalid: isInvalid,
          name: `communication-${item.unique}.type`,
          id: `communication-${item.unique}.type`,
          onChange: handleChange,
          value: values[`communication-${item.unique}.type`],
          defaultValue: ""
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
          value: "",
          disabled: true,
          hidden: true
        }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('PleaseSelect')), this.props.setting.communicationTools.map(com => Object(_common_functions__WEBPACK_IMPORTED_MODULE_12__["renderOption"])(com, 'settingId', 'settingValue'))), index === 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          className: "required"
        }, "*")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
          sm: "8",
          md: "9"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
          sm: "11",
          md: "11"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
          type: "text",
          size: "sm",
          value: values[`communication-${item.unique}.value`],
          name: `communication-${item.unique}.value`,
          id: `communication-${item.unique}.value`,
          className: "shadow-none",
          autoComplete: "off",
          isInvalid: isInvalid,
          onChange: handleChange,
          placeholder: _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('SeparatedByComma')
        })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
          sm: "1",
          md: "1",
          className: "tool-action"
        }, index > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          className: "fa fa-times mr-2",
          onClick: () => this.handleRemoveRowCommunication(item.unique)
        }), index === communicationTools.length - 1 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          className: "fa fa-plus",
          onClick: () => this.handleAddRowCommunication()
        })))));
      });
    });

    _defineProperty(this, "renderForm", ({
      values,
      errors,
      touched,
      handleChange,
      handleSubmit,
      setFieldValue,
      isSubmitting
    }) => {
      const {
        picTypeList,
        countries,
        languages
      } = this.props.setting;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"], {
        noValidate: true,
        onSubmit: handleSubmit
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Body, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_FormikErrorMessage__WEBPACK_IMPORTED_MODULE_7__["default"], {
        touched: touched,
        errors: errors,
        fieldNames: Object.keys(values)
      }), this.props.createPicResult && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_ResponseMessage__WEBPACK_IMPORTED_MODULE_8__["default"], {
        isSuccessful: this.props.createPicResult.isSuccessful,
        message: this.props.createPicResult.message || _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('InsertPICSuccess')
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "4",
        md: "3",
        className: "required",
        htmlFor: "picType"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('PicType')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "8",
        md: "9"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        as: "select",
        size: "sm",
        className: "shadow-none",
        isInvalid: touched.picType && errors.picType,
        name: "picType",
        id: "picType",
        onChange: e => this.handleChangePicType(e, setFieldValue),
        value: values.picType
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        value: "",
        disabled: true,
        hidden: true
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('PleaseSelect')), picTypeList.map(item => Object(_common_functions__WEBPACK_IMPORTED_MODULE_12__["renderOption"])(item, 'settingId', 'settingValue'))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "4",
        md: "3",
        className: "required",
        htmlFor: "picName"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('Name')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "8",
        md: "9"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        type: "text",
        size: "sm",
        value: values.picName,
        name: "picName",
        id: "picName",
        className: "shadow-none",
        autoComplete: "off",
        isInvalid: touched.picName && errors.picName,
        onChange: handleChange
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "4",
        md: "3",
        className: "required",
        htmlFor: "roleId"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('Role')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "8",
        md: "9"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        as: "select",
        size: "sm",
        className: "shadow-none",
        isInvalid: touched.roleId && errors.roleId,
        name: "roleId",
        id: "roleId",
        onChange: handleChange,
        value: values.roleId
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        value: "",
        disabled: true,
        hidden: true
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('PleaseSelect')), this.state.roles.map(item => Object(_common_functions__WEBPACK_IMPORTED_MODULE_12__["renderOption"])(item, 'settingId', 'settingValue'))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "4",
        md: "3",
        htmlFor: "languageIds"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('Language')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "8",
        md: "9"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_multiple_select_index__WEBPACK_IMPORTED_MODULE_10__["default"], {
        id: "languageIds",
        name: "languageIds",
        dataSource: languages,
        keyField: "settingId",
        isAllTextShown: true,
        valueField: "settingValue",
        statusField: "checked",
        onChange: (currentItem, selectedItemsKey) => {
          handleChange('languageIds')(selectedItemsKey);
        }
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "4",
        md: "3",
        htmlFor: "countryId"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('Country')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "8",
        md: "9"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        as: "select",
        size: "sm",
        className: "shadow-none",
        isInvalid: touched.countryId && errors.countryId,
        name: "countryId",
        id: "countryId",
        onChange: handleChange,
        value: values.countryId
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        value: 0,
        disabled: true,
        hidden: true
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('PleaseSelect')), countries.map(item => Object(_common_functions__WEBPACK_IMPORTED_MODULE_12__["renderOption"])(item, 'id', 'name'))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "4",
        md: "3",
        htmlFor: "remark"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('Remark')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "8",
        md: "9"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        as: "textarea",
        name: "remark",
        id: "remark",
        rows: "4",
        className: "shadow-none form-control",
        onChange: handleChange
      }))), this.renderCommunicationTool({
        values,
        errors,
        touched,
        handleChange
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Footer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], {
        type: "submit",
        variant: "primary",
        size: "sm",
        disabled: isSubmitting
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('Save')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], {
        variant: "primary",
        size: "sm",
        onClick: this.handleConfirmCancelPopup
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('Cancel'))));
    });

    this.formik = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
    this.state = {
      communicationTools: [{
        type: '',
        value: '',
        unique: new Date().getTime()
      }],
      roles: [],
      showConfirmClose: false
    };
  }

  componentDidMount() {
    this.handleRolesOption(this.props.setting.picTypeList[0].settingId);
  }

  render() {
    const initialValues = {
      picName: '',
      roleId: '',
      picType: this.props.setting.picTypeList[0].settingId,
      languageIds: '',
      countryId: 0,
      communication: null,
      remark: ''
    };

    if (this.props.setting === null || !this.props.setting) {
      return null;
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"], {
      show: true,
      className: "pic-management-modal",
      dialogAs: _jsroot_components_DraggableModalDialog__WEBPACK_IMPORTED_MODULE_6__["default"],
      backdrop: "static",
      keyboard: false,
      centered: true,
      size: "lg",
      onHide: this.handleConfirmCancelPopup
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Header, {
      closeButton: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Title, {
      as: "div"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('InsertPIC'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_5__["Formik"], {
      innerRef: p => this.formik = p,
      initialValues: initialValues,
      validate: _common_functions__WEBPACK_IMPORTED_MODULE_12__["validateFormik"],
      onSubmit: this.handleSubmit
    }, this.renderForm), this.state.showConfirmClose && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_ConfirmPopup__WEBPACK_IMPORTED_MODULE_11__["default"], {
      size: "lg",
      title: _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('Confirmation'),
      content: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('ConfirmDirtyMessage')),
      onSubmit: this.handleClosePopup,
      onClose: this.handleCloseConfirm
    }));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    setting,
    gridParams,
    createPicResult
  } = state;
  return {
    setting,
    gridParams,
    createPicResult
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(NewPicManagement));

/***/ }),

/***/ "./www/sources/js/pages/pic-and-headline/management/index.js":
/*!*******************************************************************!*\
  !*** ./www/sources/js/pages/pic-and-headline/management/index.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return index; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @reduxjs/toolkit */ "./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");
/* harmony import */ var _picManagementSlice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./picManagementSlice */ "./www/sources/js/pages/pic-and-headline/management/picManagementSlice.js");
/* harmony import */ var _components_AppContainer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/AppContainer */ "./www/sources/js/pages/pic-and-headline/management/components/AppContainer.jsx");
/* harmony import */ var _cssroot_pages_pic_and_headline_management_index_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @cssroot/pages/pic-and-headline/management/index.scss */ "./www/sources/css/pages/pic-and-headline/management/index.scss");
/* harmony import */ var _cssroot_pages_pic_and_headline_management_index_scss__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_cssroot_pages_pic_and_headline_management_index_scss__WEBPACK_IMPORTED_MODULE_5__);





const store = Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__["configureStore"])({
  reducer: _picManagementSlice__WEBPACK_IMPORTED_MODULE_3__["default"]
});

const isHost = true;
class index extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_1__["Provider"], {
      store: store
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "pic-management"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_AppContainer__WEBPACK_IMPORTED_MODULE_4__["default"], {
      isHost: isHost
    })));
  }

}

/***/ }),

/***/ "./www/sources/js/pages/pic-and-headline/management/picManagementSlice.js":
/*!********************************************************************************!*\
  !*** ./www/sources/js/pages/pic-and-headline/management/picManagementSlice.js ***!
  \********************************************************************************/
/*! exports provided: resetState, setSetting, setGridParams, setGridData, setSelectedPic, setCreatePicPopup, setCreatePicResult, setEditPicPopup, setEditPicResult, setActiveResult, setConfirmPopup, setValidateEditPicResult, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetState", function() { return resetState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSetting", function() { return setSetting; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setGridParams", function() { return setGridParams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setGridData", function() { return setGridData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSelectedPic", function() { return setSelectedPic; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setCreatePicPopup", function() { return setCreatePicPopup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setCreatePicResult", function() { return setCreatePicResult; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setEditPicPopup", function() { return setEditPicPopup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setEditPicResult", function() { return setEditPicResult; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setActiveResult", function() { return setActiveResult; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setConfirmPopup", function() { return setConfirmPopup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setValidateEditPicResult", function() { return setValidateEditPicResult; });
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @reduxjs/toolkit */ "./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");

const initialState = {
  setting: {
    roleListWithInActive: [],
    roleList: [],
    communicationTools: [],
    languages: [],
    countries: []
  },
  gridParams: {
    username: '',
    headlineName: '',
    role: '',
    pageIndex: 1,
    pageSize: 100
  },
  gridData: null,
  selectedPic: null,
  createPicPopup: {
    show: false
  },
  createPicResult: null,
  editPicPopup: {
    show: false
  },
  editPicResult: null,
  activeResult: null,
  confirmPopup: {
    show: false,
    username: '',
    picId: null,
    checked: false
  },
  validateEditPicResult: ''
};
const picManagementSlice = Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__["createSlice"])({
  name: 'PICManagement',
  initialState: initialState,
  reducers: {
    resetState: () => initialState,
    setSetting: (state, action) => {
      state.setting = action.payload;
    },
    setGridParams: (state, action) => {
      state.gridParams = action.payload;
    },
    setGridData: (state, action) => {
      state.gridData = action.payload;
    },
    setSelectedPic: (state, action) => {
      state.selectedPic = action.payload;
    },
    setCreatePicPopup: (state, action) => {
      state.createPicPopup = action.payload;
    },
    setCreatePicResult: (state, action) => {
      state.createPicResult = action.payload;
    },
    setEditPicPopup: (state, action) => {
      state.editPicPopup = action.payload;
    },
    setEditPicResult: (state, action) => {
      state.editPicResult = action.payload;
    },
    setActiveResult: (state, action) => {
      state.activeResult = action.payload;
    },
    setConfirmPopup: (state, action) => {
      state.confirmPopup = action.payload;
    },
    setValidateEditPicResult: (state, action) => {
      state.validateEditPicResult = action.payload;
    }
  }
});
const {
  actions,
  reducer
} = picManagementSlice;
const {
  resetState,
  setSetting,
  setGridParams,
  setGridData,
  setSelectedPic,
  setCreatePicPopup,
  setCreatePicResult,
  setEditPicPopup,
  setEditPicResult,
  setActiveResult,
  setConfirmPopup,
  setValidateEditPicResult
} = actions;
/* harmony default export */ __webpack_exports__["default"] = (reducer);

/***/ })

}]);
//# sourceMappingURL=9.chunk.js.map