(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[5],{

/***/ "./www/sources/css/pages/admin-tool/setting-management/index.scss":
/*!************************************************************************!*\
  !*** ./www/sources/css/pages/admin-tool/setting-management/index.scss ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./www/sources/js/pages/admin-tool/setting-management/actions.js":
/*!***********************************************************************!*\
  !*** ./www/sources/js/pages/admin-tool/setting-management/actions.js ***!
  \***********************************************************************/
/*! exports provided: ActionCreators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionCreators", function() { return ActionCreators; });
/* harmony import */ var _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/common/site */ "./www/sources/js/common/site.js");
/* harmony import */ var _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/common/dataService */ "./www/sources/js/common/dataService.js");
/* harmony import */ var _settingManagementSlice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./settingManagementSlice */ "./www/sources/js/pages/admin-tool/setting-management/settingManagementSlice.js");




const getMainSettings = () => async dispatch => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl('SettingManagement/GetMainSettings');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__["default"].getDataAsync(url).then(response => {
    dispatch(Object(_settingManagementSlice__WEBPACK_IMPORTED_MODULE_2__["setMainSettings"])(response.data));
  });
};

const getParentSettings = () => async dispatch => {
  _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].blockUI();
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl('SettingManagement/GetParentSettings');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__["default"].getDataAsync(url).then(response => {
    dispatch(Object(_settingManagementSlice__WEBPACK_IMPORTED_MODULE_2__["setParentSettings"])(response.data));
  }).catch(_jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].handleAxiosError).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].unblockUI());
};

const getLicensees = () => async dispatch => {
  _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].blockUI();
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl('SettingManagement/GetLicensees');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__["default"].getDataAsync(url).then(response => {
    dispatch(Object(_settingManagementSlice__WEBPACK_IMPORTED_MODULE_2__["setLicensees"])(response.data));
  }).catch(_jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].handleAxiosError).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].unblockUI());
};

const getLicenseeManager = username => async dispatch => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl('SettingManagement/GetLicenseeManager');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__["default"].postDataAsync(url, username).then(response => {
    const options = response.data.map(item => {
      return {
        value: item.username,
        label: item.username
      };
    });
    dispatch(Object(_settingManagementSlice__WEBPACK_IMPORTED_MODULE_2__["setLicenseeManager"])(options));
  }).catch(_jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].handleAxiosError);
};

const getLicenseesMapping = params => async dispatch => {
  _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].blockUI();
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl('SettingManagement/GetLicenseesMapping');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__["default"].postDataAsync(url, params).then(response => {
    dispatch(Object(_settingManagementSlice__WEBPACK_IMPORTED_MODULE_2__["setLicenseeMapping"])(response.data));
  }).catch(_jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].handleAxiosError).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].unblockUI());
};

const getSettingTypes = params => async dispatch => {
  _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].blockUI();
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl('SettingManagement/GetSettingByType');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__["default"].postDataAsync(url, params).then(response => {
    dispatch(Object(_settingManagementSlice__WEBPACK_IMPORTED_MODULE_2__["setSettingTypes"])(response.data));
  }).catch(_jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].handleAxiosError).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].unblockUI());
};

const editStatusSetting = params => async () => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl('SettingManagement/EditStatusSetting');
  return await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__["default"].postDataAsync(url, params).then(response => response.data).catch(_jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].handleAxiosError);
};

const insertNewSetting = params => async dispatch => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl('SettingManagement/InsertNewSetting');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__["default"].postDataAsync(url, params).then(response => {
    dispatch(Object(_settingManagementSlice__WEBPACK_IMPORTED_MODULE_2__["setInsertNewSettingResult"])(response.data));
  }).catch(_jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].handleAxiosError);
};

const editNewSetting = params => async dispatch => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl('SettingManagement/EditNewSetting');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__["default"].postDataAsync(url, params).then(response => {
    dispatch(Object(_settingManagementSlice__WEBPACK_IMPORTED_MODULE_2__["setEditNewSettingResult"])(response.data));
  }).catch(_jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].handleAxiosError);
};

const editLicenseeMapping = params => async () => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl('SettingManagement/EditLicenseeMapping');
  return await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__["default"].postDataAsync(url, params).then(response => response.data).catch(_jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].handleAxiosError);
};

const ActionCreators = {
  resetState: _settingManagementSlice__WEBPACK_IMPORTED_MODULE_2__["resetState"],
  getMainSettings,
  setMainSettings: _settingManagementSlice__WEBPACK_IMPORTED_MODULE_2__["setMainSettings"],
  getParentSettings,
  setParentSettings: _settingManagementSlice__WEBPACK_IMPORTED_MODULE_2__["setParentSettings"],
  getLicensees,
  setLicensees: _settingManagementSlice__WEBPACK_IMPORTED_MODULE_2__["setLicensees"],
  getLicenseesMapping,
  setLicenseeMapping: _settingManagementSlice__WEBPACK_IMPORTED_MODULE_2__["setLicenseeMapping"],
  getLicenseeManager,
  setLicenseeManager: _settingManagementSlice__WEBPACK_IMPORTED_MODULE_2__["setLicenseeManager"],
  setGridParams: _settingManagementSlice__WEBPACK_IMPORTED_MODULE_2__["setGridParams"],
  getSettingTypes,
  setSettingTypes: _settingManagementSlice__WEBPACK_IMPORTED_MODULE_2__["setSettingTypes"],
  setEditStatusPopup: _settingManagementSlice__WEBPACK_IMPORTED_MODULE_2__["setEditStatusPopup"],
  editStatusSetting,
  setOpenInsertNewSettingPopup: _settingManagementSlice__WEBPACK_IMPORTED_MODULE_2__["setOpenInsertNewSettingPopup"],
  setOpenLicenseeMappingPopup: _settingManagementSlice__WEBPACK_IMPORTED_MODULE_2__["setOpenLicenseeMappingPopup"],
  insertNewSetting,
  setInsertNewSettingResult: _settingManagementSlice__WEBPACK_IMPORTED_MODULE_2__["setInsertNewSettingResult"],
  setOpenEdiPopup: _settingManagementSlice__WEBPACK_IMPORTED_MODULE_2__["setOpenEdiPopup"],
  editNewSetting,
  setEditNewSettingResult: _settingManagementSlice__WEBPACK_IMPORTED_MODULE_2__["setEditNewSettingResult"],
  editLicenseeMapping,
  setConfirmCancelPopup: _settingManagementSlice__WEBPACK_IMPORTED_MODULE_2__["setConfirmCancelPopup"]
};

/***/ }),

/***/ "./www/sources/js/pages/admin-tool/setting-management/components/AppContainer.jsx":
/*!****************************************************************************************!*\
  !*** ./www/sources/js/pages/admin-tool/setting-management/components/AppContainer.jsx ***!
  \****************************************************************************************/
/*! exports provided: AppContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppContainer", function() { return AppContainer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/admin-tool/setting-management/actions.js");
/* harmony import */ var _jsroot_components_SweetModalDialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/components/SweetModalDialog */ "./www/sources/js/components/SweetModalDialog.jsx");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/lib/index.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_toastify__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var _Filter__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Filter */ "./www/sources/js/pages/admin-tool/setting-management/components/Filter.jsx");
/* harmony import */ var _DataGrid__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./DataGrid */ "./www/sources/js/pages/admin-tool/setting-management/components/DataGrid.jsx");
/* harmony import */ var _NewSettingValue__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./NewSettingValue */ "./www/sources/js/pages/admin-tool/setting-management/components/NewSettingValue.jsx");
/* harmony import */ var _Edit__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./Edit */ "./www/sources/js/pages/admin-tool/setting-management/components/Edit.jsx");
/* harmony import */ var _LicenseeMapping__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./LicenseeMapping */ "./www/sources/js/pages/admin-tool/setting-management/components/LicenseeMapping.jsx");
/* harmony import */ var _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @jsroot/common/constants */ "./www/sources/js/common/constants.js");
/* harmony import */ var _jsroot_common_shareScripts__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @jsroot/common/shareScripts */ "./www/sources/js/common/shareScripts.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
















class AppContainer extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleCloseInsertNewSetting", () => {
      this.props.setOpenInsertNewSettingPopup({
        show: false,
        settingName: ''
      });
    });

    _defineProperty(this, "handleSuccessInsertNewSetting", () => {
      this.handleCloseInsertNewSetting();
      this.handleGetSettingType();
      this.props.setInsertNewSettingResult(null);
    });

    _defineProperty(this, "handleGetSettingType", () => {
      this.props.getSettingTypes(this.props.gridParams);
    });

    _defineProperty(this, "handleCloseEdit", () => {
      this.props.setOpenEdiPopup({
        show: false,
        data: null
      });
    });

    _defineProperty(this, "handleSuccessEdit", () => {
      this.handleCloseEdit();
      this.handleGetSettingType();
      this.props.setEditNewSettingResult(null);
    });

    _defineProperty(this, "handleCloseLicenseeMapping", () => {
      this.props.setOpenLicenseeMappingPopup({
        show: false
      });
    });

    _defineProperty(this, "handleSuccessUpdateLicenseeMapping", () => {
      this.props.setEditLicenseeMappingResult(null);
    });

    _defineProperty(this, "handleCloseConfirmLicenseeMapping", () => {
      this.props.setConfirmCancelPopup({
        show: false,
        setting: '',
        settingId: 0
      });
    });

    _defineProperty(this, "handleEditStatus", () => {
      const {
        settingId,
        isActive
      } = this.props.editStatusPopup;
      this.props.editStatusSetting({
        settingId,
        isActive
      }).then(data => {
        this.handleCloseEditStatusPopup();

        if (data.isSuccessful) {
          this.handleGetSettingType();

          if (isActive) {
            react_toastify__WEBPACK_IMPORTED_MODULE_5__["toast"].success(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('ActiveStatusSettingSuccess'));
          } else {
            react_toastify__WEBPACK_IMPORTED_MODULE_5__["toast"].success(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('DeActiveStatusSettingSuccess'));
          }
        } else {
          react_toastify__WEBPACK_IMPORTED_MODULE_5__["toast"].error(data.message);
        }
      });
    });

    _defineProperty(this, "handleCloseEditStatusPopup", () => {
      this.props.setEditStatusPopup({
        show: false
      });
    });

    this.state = {
      policy: null
    };
  }

  componentDidMount() {
    this.props.getMainSettings();
    Object(_jsroot_common_shareScripts__WEBPACK_IMPORTED_MODULE_14__["getPermission"])(_jsroot_common_constants__WEBPACK_IMPORTED_MODULE_13__["FunctionKey"].SettingManagement).then(response => {
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
      gridParams,
      editStatusPopup,
      insertNewSettingPopup,
      licenseeMappingPopup,
      editPopup
    } = this.props;

    if (!mainSettings || mainSettings === null || !this.state.policy) {
      return null;
    }

    const isHost = this.state.policy === _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_13__["Policy"].Host;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Filter__WEBPACK_IMPORTED_MODULE_8__["default"], {
      isHost: isHost
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DataGrid__WEBPACK_IMPORTED_MODULE_9__["default"], {
      isHost: isHost
    }), insertNewSettingPopup.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_NewSettingValue__WEBPACK_IMPORTED_MODULE_10__["default"], {
      settingName: insertNewSettingPopup.settingName,
      onClose: this.handleCloseInsertNewSetting,
      onSuccess: this.handleSuccessInsertNewSetting
    }), editPopup.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Edit__WEBPACK_IMPORTED_MODULE_11__["default"], {
      onClose: this.handleCloseEdit,
      onSuccess: this.handleSuccessEdit
    }), licenseeMappingPopup.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_LicenseeMapping__WEBPACK_IMPORTED_MODULE_12__["default"], {
      onSuccess: this.handleSuccessUpdateLicenseeMapping,
      onClose: this.handleCloseLicenseeMapping,
      oncloseConfirm: this.handleCloseConfirmLicenseeMapping
    }), editStatusPopup.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_SweetModalDialog__WEBPACK_IMPORTED_MODULE_4__["default"], {
      size: "lg",
      title: _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Confirmation'),
      contents: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "Are you sure you want to ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, this.props.editStatusPopup.isActive ? 'activate' : 'deactivate'), " Setting ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, `${gridParams.settingName} ${this.props.editStatusPopup.settingValue}`), "?"),
      buttons: [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Button"], {
        onClick: this.handleEditStatus,
        variant: "primary",
        size: "sm"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('OK')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Button"], {
        onClick: this.handleCloseEditStatusPopup,
        variant: "primary",
        size: "sm"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Cancel'))],
      onClose: this.handleCloseEditStatusPopup
    }));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    mainSettings,
    gridParams,
    editStatusPopup,
    insertNewSettingPopup,
    insertNewValuePopup,
    licenseeMappingPopup,
    editPopup
  } = state;
  return {
    mainSettings,
    gridParams,
    editStatusPopup,
    insertNewSettingPopup,
    insertNewValuePopup,
    licenseeMappingPopup,
    editPopup
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(AppContainer));

/***/ }),

/***/ "./www/sources/js/pages/admin-tool/setting-management/components/DataGrid.jsx":
/*!************************************************************************************!*\
  !*** ./www/sources/js/pages/admin-tool/setting-management/components/DataGrid.jsx ***!
  \************************************************************************************/
/*! exports provided: DataGrid, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataGrid", function() { return DataGrid; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/admin-tool/setting-management/actions.js");
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
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Setting')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 13
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('SettingId')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 13
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Order')), isHost && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 13
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Edit')), isHost && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 13
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Active')));
    });

    _defineProperty(this, "renderRow", (item, index, isHost) => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Row"], {
        key: `setting-management-${index}`
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], null, item.settingValue), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: "text-right"
      }, item.settingId), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: "text-right"
      }, item.displayOrder), isHost && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: "text-center"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "rounded-circle fa fa-pencil icon-edit",
        "aria-hidden": "true",
        onClick: event => this.handleOpenEdit(event, item)
      })), isHost && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: "text-center"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "checkbox",
        checked: item.isActive,
        disabled: !this.props.isHost,
        onChange: () => this.handleEditStatus(item.settingId, item.settingValue, !item.isActive)
      })));
    });

    _defineProperty(this, "buildBody", isHost => {
      const {
        settingType
      } = this.props;

      if (settingType.length > 0) {
        return settingType.map((item, index) => this.renderRow(item, index, isHost));
      }

      return [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Row"], {
        className: "no-data"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: "text-center",
        colSpan: isHost ? 5 : 3
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('ThereIsNoData')))];
    });

    _defineProperty(this, "handleEditStatus", (settingId, settingValue, isActive) => {
      this.props.setEditStatusPopup({
        show: true,
        settingId,
        settingValue,
        isActive
      });
    });

    _defineProperty(this, "handleOpenEdit", (event, item) => {
      event.preventDefault();
      this.props.setOpenEdiPopup({
        show: true,
        data: item
      });
    });
  }

  render() {
    const {
      settingType,
      gridParams,
      isHost
    } = this.props;

    if (!settingType) {
      return null;
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "justify-content-between align-items-center table-title d-flex"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, `${_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('SettingManagementTitle')} ${gridParams.settingName}`)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Table"], {
      header: this.buildHeader(isHost),
      body: this.buildBody(isHost),
      width: 700,
      autoWidth: false,
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

/***/ "./www/sources/js/pages/admin-tool/setting-management/components/Edit.jsx":
/*!********************************************************************************!*\
  !*** ./www/sources/js/pages/admin-tool/setting-management/components/Edit.jsx ***!
  \********************************************************************************/
/*! exports provided: Edit, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Edit", function() { return Edit; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/admin-tool/setting-management/actions.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! formik */ "./node_modules/formik/dist/formik.esm.js");
/* harmony import */ var _jsroot_components_DraggableModalDialog__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/components/DraggableModalDialog */ "./www/sources/js/components/DraggableModalDialog.jsx");
/* harmony import */ var _jsroot_components_FormikErrorMessage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/components/FormikErrorMessage */ "./www/sources/js/components/FormikErrorMessage.jsx");
/* harmony import */ var _jsroot_components_ResponseMessage__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jsroot/components/ResponseMessage */ "./www/sources/js/components/ResponseMessage.jsx");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }











class Edit extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "validateFormik", values => {
      const errors = {};

      if (values.settingValue === '') {
        errors.settingValue = _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].formatString(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('FieldRequired'), _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('SettingValue'));
      }

      if (values.settingName === '') {
        errors.settingName = _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].formatString(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('FieldRequired'), _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('SettingName'));
      }

      return errors;
    });

    _defineProperty(this, "handleSubmit", (values, {
      setSubmitting
    }) => {
      const params = {
        settingId: values.settingId,
        settingName: values.settingName,
        settingValue: values.settingValue,
        displayOrder: values.displayOrder === '' ? 0 : values.displayOrder
      };
      setSubmitting(true);
      this.props.editNewSetting(params).then(() => {
        if (this.props.editNewSettingResult.isSuccessful) {
          setTimeout(() => {
            this.props.onSuccess();
          }, 3000);
        } else {
          setSubmitting(false);
        }
      });
    });

    _defineProperty(this, "renderForm", ({
      values,
      errors,
      touched,
      handleChange,
      handleSubmit,
      isSubmitting
    }) => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"], {
        noValidate: true,
        onSubmit: handleSubmit
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Body, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_FormikErrorMessage__WEBPACK_IMPORTED_MODULE_7__["default"], {
        touched: touched,
        errors: errors,
        fieldNames: Object.keys(values)
      }), this.props.editNewSettingResult && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_ResponseMessage__WEBPACK_IMPORTED_MODULE_8__["default"], {
        isSuccessful: this.props.editNewSettingResult.isSuccessful,
        message: this.props.editNewSettingResult.message || _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('InsertNewSettingSuccess')
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "4",
        md: "3",
        htmlFor: "settingName"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('SettingName')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "8",
        md: "9"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        type: "text",
        size: "sm",
        value: values.settingName,
        name: "settingName",
        id: "settingName",
        disabled: true,
        className: "shadow-none",
        autoComplete: "off"
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        md: "3",
        sm: "4",
        htmlFor: "settingValue",
        className: "required"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('SettingValue')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "8",
        md: "9"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        type: "text",
        size: "sm",
        value: values.settingValue,
        name: "settingValue",
        id: "settingValue",
        className: "shadow-none",
        autoComplete: "off",
        isInvalid: touched.settingValue && errors.settingValue,
        onChange: handleChange
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "4",
        md: "3",
        htmlFor: "displayOrder"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('DisplayOrder')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "8",
        md: "9"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        type: "number",
        name: "displayOrder",
        id: "displayOrder",
        className: "shadow-none form-control",
        value: values.displayOrder,
        onChange: handleChange
      })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Footer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], {
        variant: "primary",
        type: "submit",
        size: "sm",
        disabled: isSubmitting
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('Save')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], {
        size: "sm",
        variant: "primary",
        onClick: this.props.onClose
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('Cancel'))));
    });
  }

  render() {
    const {
      editPopup
    } = this.props;

    if (!editPopup || editPopup.data === null) {
      return null;
    }

    const initialValues = {
      settingId: editPopup.data.settingId,
      settingName: editPopup.data.settingName,
      settingValue: editPopup.data.settingValue,
      displayOrder: editPopup.data.displayOrder
    };
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"], {
      className: "setting-modal",
      show: true,
      dialogAs: _jsroot_components_DraggableModalDialog__WEBPACK_IMPORTED_MODULE_6__["default"],
      backdrop: "static",
      keyboard: false,
      centered: true,
      size: "lg",
      onHide: this.props.onClose
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Header, {
      closeButton: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Title, {
      as: "div"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('EditSettingValue'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_5__["Formik"], {
      validate: this.validateFormik,
      initialValues: initialValues,
      onSubmit: this.handleSubmit
    }, this.renderForm));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    editPopup,
    editNewSettingResult
  } = state;
  return {
    editPopup,
    editNewSettingResult
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(Edit));

/***/ }),

/***/ "./www/sources/js/pages/admin-tool/setting-management/components/Filter.jsx":
/*!**********************************************************************************!*\
  !*** ./www/sources/js/pages/admin-tool/setting-management/components/Filter.jsx ***!
  \**********************************************************************************/
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
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/admin-tool/setting-management/actions.js");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







class Filter extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleChangeSettingName", event => {
      event.preventDefault();
      const settingName = event.target.value;
      this.setState({
        settingName
      });
      this.props.setGridParams({
        settingName
      });
    });

    _defineProperty(this, "handleSubmit", () => {
      const {
        settingName
      } = this.state;
      this.props.getSettingTypes({
        settingName
      });
      this.props.setGridParams({
        settingName
      });
    });

    _defineProperty(this, "handleInsertNewSetting", settingName => {
      this.props.setOpenInsertNewSettingPopup({
        show: true,
        settingName: settingName
      });
    });

    _defineProperty(this, "handleLicenseeMapping", () => {
      this.props.getLicenseesMapping({
        setting: ''
      }).then(() => {
        this.props.setOpenLicenseeMappingPopup({
          show: true
        });
      });
    });

    this.state = {
      settingName: this.props.mainSettings[0].settingName
    };
  }

  componentDidMount() {
    this.handleSubmit();
  }

  render() {
    const {
      settingName
    } = this.state;
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
      value: settingName,
      onChange: this.handleChangeSettingName
    }, this.props.mainSettings.map((value, key) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
      key: key,
      value: value.settingName
    }, value.settingName)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, {
      style: {
        width: 700
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], {
      variant: "primary",
      size: "sm",
      className: "mr-3",
      onClick: this.handleSubmit
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Search')), this.props.isHost && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], {
      variant: "primary",
      size: "sm",
      className: "mr-3",
      onClick: () => this.handleInsertNewSetting('')
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('InsertNewSetting')), this.props.isHost && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], {
      variant: "primary",
      className: "mr-3",
      onClick: () => this.handleInsertNewSetting(this.props.gridParams.settingName)
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('InsertSettingValue') + settingName), this.props.isHost && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], {
      variant: "primary",
      onClick: this.handleLicenseeMapping
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('LicenseeMapping')))));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_4__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    mainSettings,
    gridParams
  } = state;
  return {
    mainSettings,
    gridParams
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(Filter));

/***/ }),

/***/ "./www/sources/js/pages/admin-tool/setting-management/components/LicenseeMapping.jsx":
/*!*******************************************************************************************!*\
  !*** ./www/sources/js/pages/admin-tool/setting-management/components/LicenseeMapping.jsx ***!
  \*******************************************************************************************/
/*! exports provided: LicenseeMapping, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LicenseeMapping", function() { return LicenseeMapping; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/admin-tool/setting-management/actions.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var _jsroot_components_DraggableModalDialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/components/DraggableModalDialog */ "./www/sources/js/components/DraggableModalDialog.jsx");
/* harmony import */ var _jsroot_components_ResponseMessage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/components/ResponseMessage */ "./www/sources/js/components/ResponseMessage.jsx");
/* harmony import */ var _jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/components/react-grid/index */ "./www/sources/js/components/react-grid/index.jsx");
/* harmony import */ var _LicenseeRow__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./LicenseeRow */ "./www/sources/js/pages/admin-tool/setting-management/components/LicenseeRow.jsx");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var _jsroot_common_site__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @jsroot/common/site */ "./www/sources/js/common/site.js");
/* harmony import */ var _jsroot_components_SweetModalDialog__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @jsroot/components/SweetModalDialog */ "./www/sources/js/components/SweetModalDialog.jsx");
/* harmony import */ var _jsroot_components_FormikErrorMessage__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @jsroot/components/FormikErrorMessage */ "./www/sources/js/components/FormikErrorMessage.jsx");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }














class LicenseeMapping extends react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "buildHeader", () => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["HeaderRow"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["HeaderCell"], {
        colWidth: 50
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('Setting')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["HeaderCell"], {
        colWidth: 30
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('SourceMapping')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["HeaderCell"], {
        colWidth: 30
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('LicenseeManager')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["HeaderCell"], {
        colWidth: 20
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('SettingId')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["HeaderCell"], {
        colWidth: 15
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('Edit')));
    });

    _defineProperty(this, "buildBody", () => {
      const {
        licenseesMapping
      } = this.props;

      if (licenseesMapping.length > 0) {
        return licenseesMapping.map((item, index) => this.renderRow(item, index));
      }

      return [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["Row"], {
        className: "no-data"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["Cell"], {
        className: "text-center",
        colSpan: 5
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('ThereIsNoData')))];
    });

    _defineProperty(this, "renderRow", (item, index) => {
      const {
        licensees,
        licenseesManager
      } = this.props;
      const licenseesOption = licensees.map(item => {
        return {
          value: item,
          label: item
        };
      });
      const sourceMappingDefault = licenseesOption.filter(x => x.value === item.settingSource);
      const isChangeableValue = this.state.isEdit && this.state.settingId === item.settingId;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_LicenseeRow__WEBPACK_IMPORTED_MODULE_8__["default"], {
        item: item,
        index: index,
        sourceMappingDefault: sourceMappingDefault,
        licenseesOption: licenseesOption,
        licenseesManagerOption: licenseesManager,
        handleEdit: this.handleEdit,
        isChangeableValue: isChangeableValue,
        isEdit: this.state.isEdit,
        handleSave: this.handleSave,
        handleCancel: this.handleCancel,
        debounceHandleLicenseeManagerChange: this.debounceHandleLicenseeManagerChange,
        handleDelete: this.handleDelete
      });
    });

    _defineProperty(this, "handleEdit", settingId => {
      this.setState(prevState => ({
        settingId,
        isEdit: !prevState.isEdit
      }));
    });

    _defineProperty(this, "handleSave", (settingId, settingSource, licenseeManager) => {
      const params = {
        settingId,
        sourceMapping: settingSource,
        licenseeManager
      };

      if (settingSource === '' || licenseeManager === null || licenseeManager === '') {
        this.handelValidateUpdate(params);
      } else {
        this.setState({
          errors: {},
          touched: {}
        });
        this.props.editLicenseeMapping(params).then(data => {
          this.setState({
            editLicenseeMappingResult: data
          });

          if (data.isSuccessful) {
            this.handleSuccess();
            setTimeout(() => {
              this.setState({
                editLicenseeMappingResult: null
              });
            }, 3000);
          }
        });
      }
    });

    _defineProperty(this, "handelValidateUpdate", params => {
      const errors = {};
      const touched = {};

      if (params.sourceMapping === '') {
        touched.sourceMapping = true;
        errors.sourceMapping = _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].formatString(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('FieldRequired'), _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('SettingSource'));
      }

      if (params.licenseeManager === null || params.licenseeManager === '') {
        touched.licenseeManager = true;
        errors.licenseeManager = _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].formatString(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('FieldRequired'), _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('LicenseeManager'));
      }

      this.setState({
        errors,
        touched
      });
    });

    _defineProperty(this, "handleDelete", (setting, settingId) => {
      this.props.setConfirmCancelPopup({
        show: true,
        setting,
        settingId
      });
    });

    _defineProperty(this, "handleCancel", () => {
      this.setState(prevState => ({
        settingId: '',
        isEdit: !prevState.isEdit,
        errors: {},
        touched: {}
      }));
    });

    _defineProperty(this, "handleCancelSetting", settingId => {
      const params = {
        settingId,
        sourceMapping: '',
        licenseeManager: ''
      };
      this.props.editLicenseeMapping(params).then(data => {
        this.setState({
          cancelLicenseeMappingResult: data
        });
        this.props.oncloseConfirm();

        if (data.isSuccessful) {
          this.handleSuccess();
          setTimeout(() => {
            this.setState({
              cancelLicenseeMappingResult: null
            });
          }, 3000);
        }
      });
    });

    _defineProperty(this, "handleSuccess", () => {
      this.setState({
        settingId: '',
        isEdit: false
      });
      this.handleSearch();
    });

    _defineProperty(this, "debounceHandleLicenseeManagerChange", _jsroot_common_site__WEBPACK_IMPORTED_MODULE_10__["default"].debounce(searchText => {
      if (searchText.length >= 2) {
        this.props.getLicenseeManager({
          username: searchText
        });
      } else {
        this.props.setLicenseeManager([]);
      }
    }));

    _defineProperty(this, "renderForm", () => {
      const {
        editLicenseeMappingResult,
        cancelLicenseeMappingResult
      } = this.state;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Body, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_FormikErrorMessage__WEBPACK_IMPORTED_MODULE_12__["default"], {
        errors: this.state.errors,
        touched: this.state.touched,
        fieldNames: Object.keys({
          sourceMapping: '',
          licenseeManager: ''
        })
      }), editLicenseeMappingResult && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_ResponseMessage__WEBPACK_IMPORTED_MODULE_6__["default"], {
        isSuccessful: editLicenseeMappingResult.isSuccessful,
        message: editLicenseeMappingResult.message || _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('UpdateLicenseeMappingSuccessful')
      }), cancelLicenseeMappingResult && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_ResponseMessage__WEBPACK_IMPORTED_MODULE_6__["default"], {
        isSuccessful: cancelLicenseeMappingResult.isSuccessful,
        message: cancelLicenseeMappingResult.message || _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('UpdateLicenseeMappingSuccessful')
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"], {
        className: "form-filter"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Row, {
        bsPrefix: "form-row"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, null, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('Setting')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        type: "text",
        size: "sm",
        value: this.state.setting,
        style: {
          width: 150
        },
        name: "setting",
        id: "setting",
        className: "shadow-none mr-4",
        autoComplete: "off",
        onChange: event => this.setState({
          setting: event.target.value
        })
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], {
        variant: "primary",
        size: "sm",
        onClick: this.handleSearch
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('Search'))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["Table"], {
        width: 800,
        autoWidth: false,
        header: this.buildHeader(),
        body: this.buildBody(),
        containerPadding: 0,
        adjustedHeight: 10,
        shouldResetScrollPosition: false
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Footer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], {
        type: "submit",
        variant: "primary",
        size: "sm",
        onClick: this.props.onClose
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('Cancel'))));
    });

    _defineProperty(this, "handleSearch", () => {
      const params = {
        setting: this.state.setting
      };
      this.props.getLicenseesMapping(params);
    });

    this.state = {
      setting: '',
      settingId: '',
      isEdit: false,
      isSubmitting: false,
      editLicenseeMappingResult: null,
      cancelLicenseeMappingResult: null,
      errors: {},
      touched: {}
    };
  }

  componentDidMount() {
    if (this.props.licensees === null) {
      this.props.getLicensees();
    }
  }

  render() {
    const {
      licensees,
      licenseesMapping,
      confirmCancelPopup,
      oncloseConfirm
    } = this.props;

    if (!licensees || !licenseesMapping) {
      return null;
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"], {
      show: true,
      className: "licensee-mapping",
      dialogAs: _jsroot_components_DraggableModalDialog__WEBPACK_IMPORTED_MODULE_5__["default"],
      backdrop: "static",
      keyboard: false,
      centered: true,
      size: "lg",
      onHide: this.props.onClose
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Header, {
      closeButton: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Title, {
      as: "div"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('LicenseeMapping'))), this.renderForm(), confirmCancelPopup.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_SweetModalDialog__WEBPACK_IMPORTED_MODULE_11__["default"], {
      size: "md",
      className: "cancel-modal-dialog",
      title: _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('Confirmation'),
      contents: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "Are you sure you want to remove Source Mapping and Licensee Manager of ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, confirmCancelPopup.setting), "?"),
      buttons: [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], {
        onClick: () => this.handleCancelSetting(confirmCancelPopup.settingId),
        variant: "primary",
        size: "sm"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('OK')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], {
        onClick: oncloseConfirm,
        variant: "primary",
        size: "sm"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('Cancel'))],
      onClose: oncloseConfirm
    }));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    licensees,
    licenseesMapping,
    licenseesManager,
    confirmCancelPopup
  } = state;
  return {
    licensees,
    licenseesMapping,
    licenseesManager,
    confirmCancelPopup
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(LicenseeMapping));

/***/ }),

/***/ "./www/sources/js/pages/admin-tool/setting-management/components/LicenseeRow.jsx":
/*!***************************************************************************************!*\
  !*** ./www/sources/js/pages/admin-tool/setting-management/components/LicenseeRow.jsx ***!
  \***************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LicenseeRow; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/components/react-grid/index */ "./www/sources/js/components/react-grid/index.jsx");
/* harmony import */ var _jsroot_components_CustomReactSelect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/components/CustomReactSelect */ "./www/sources/js/components/CustomReactSelect.jsx");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





class LicenseeRow extends react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleChangeSelect", (value, name) => {
      if (value !== null) {
        this.setState({
          [name]: value.value
        });
      } else {
        this.setState({
          [name]: ''
        });
      }
    });

    _defineProperty(this, "onCancel", () => {
      this.setState({
        licenseeManager: this.props.item.licenseeManager
      });
      this.props.handleCancel();
    });

    _defineProperty(this, "onSave", settingId => {
      const {
        settingSource,
        licenseeManager
      } = this.state;
      this.props.handleSave(settingId, settingSource, licenseeManager);
    });

    this.state = {
      settingSource: this.props.item.settingSource,
      licenseeManager: this.props.item.licenseeManager
    };
  }

  componentDidUpdate(prevProps) {
    const {
      settingSource,
      licenseeManager
    } = this.props.item;

    if (settingSource !== prevProps.item.settingSource || licenseeManager !== prevProps.item.licenseeManager) {
      this.setState({
        settingSource: settingSource,
        licenseeManager: licenseeManager
      });
    }
  }

  render() {
    const {
      item,
      index,
      sourceMappingDefault,
      licenseesOption,
      handleDelete,
      licenseesManagerOption,
      handleEdit,
      debounceHandleLicenseeManagerChange,
      isChangeableValue,
      isEdit
    } = this.props;
    const licenseeManagerDefault = [{
      value: item.licenseeManager,
      label: item.licenseeManager
    }];
    const {
      settingSource,
      licenseeManager
    } = this.state;
    const isDisableClass = isEdit ? 'disabled-btn' : 'rounded-circle';
    const isEditClass = isEdit ? 'action-icon' : '';
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_1__["Row"], {
      key: `setting-relation-update-${index}`
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_1__["Cell"], null, item.setting), isChangeableValue ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_1__["Cell"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_CustomReactSelect__WEBPACK_IMPORTED_MODULE_2__["default"], {
      placeholder: _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('PleaseSelect'),
      isClearable: true,
      isSearchable: true,
      isFocused: true,
      isSelected: true,
      defaultValue: sourceMappingDefault,
      noOptionsMessage: () => 'No results found',
      onChange: value => this.handleChangeSelect(value, 'settingSource'),
      options: licenseesOption
    })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_1__["Cell"], null, settingSource), isChangeableValue ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_1__["Cell"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_CustomReactSelect__WEBPACK_IMPORTED_MODULE_2__["default"], {
      placeholder: _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('PleaseSelect'),
      isClearable: true,
      isSearchable: true,
      isFocused: true,
      isSelected: true,
      defaultValue: licenseeManagerDefault,
      noOptionsMessage: () => 'No results found',
      onChange: value => this.handleChangeSelect(value, 'licenseeManager'),
      onInputChange: searchText => debounceHandleLicenseeManagerChange(searchText),
      options: licenseesManagerOption
    })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_1__["Cell"], null, licenseeManager), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_1__["Cell"], null, item.settingId), isChangeableValue ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
      className: "text-center"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "rounded-circle fa fa-floppy-o icon-edit",
      onClick: () => this.onSave(item.settingId)
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "rounded-circle fa fa-times icon-delete",
      onClick: () => this.onCancel()
    })) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_1__["Cell"], {
      className: `text-center ${isEditClass}`
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: `fa fa-pencil icon-edit ${isDisableClass}`,
      onClick: () => handleEdit(item.settingId)
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: `fa fa-trash icon-delete ${isDisableClass}`,
      onClick: () => handleDelete(item.setting, item.settingId)
    })));
  }

}

/***/ }),

/***/ "./www/sources/js/pages/admin-tool/setting-management/components/NewSettingValue.jsx":
/*!*******************************************************************************************!*\
  !*** ./www/sources/js/pages/admin-tool/setting-management/components/NewSettingValue.jsx ***!
  \*******************************************************************************************/
/*! exports provided: NewSettingValue, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewSettingValue", function() { return NewSettingValue; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/admin-tool/setting-management/actions.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! formik */ "./node_modules/formik/dist/formik.esm.js");
/* harmony import */ var _jsroot_components_DraggableModalDialog__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/components/DraggableModalDialog */ "./www/sources/js/components/DraggableModalDialog.jsx");
/* harmony import */ var _jsroot_components_FormikErrorMessage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/components/FormikErrorMessage */ "./www/sources/js/components/FormikErrorMessage.jsx");
/* harmony import */ var _jsroot_components_ResponseMessage__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jsroot/components/ResponseMessage */ "./www/sources/js/components/ResponseMessage.jsx");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }











class NewSettingValue extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "handleSubmit", (values, {
      setSubmitting
    }) => {
      setSubmitting(true);
      const params = {
        settingName: values.settingName,
        settingValue: values.settingValue,
        displayOrder: values.displayOrder === '' ? 0 : values.displayOrder,
        parentId: this.props.settingName !== '' ? 0 : parseInt(values.parentId, 10)
      };
      this.props.insertNewSetting(params).then(() => {
        if (this.props.insertNewSettingResult.isSuccessful) {
          setTimeout(() => {
            this.props.onSuccess();
          }, 3000);
        } else {
          setSubmitting(false);
        }
      });
    });

    _defineProperty(this, "validateFormik", values => {
      const errors = {};

      if (values.settingName === '') {
        errors.settingName = _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].formatString(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('FieldRequired'), _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('SettingName'));
      }

      if (values.settingValue === '') {
        errors.settingValue = _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].formatString(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('FieldRequired'), _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('SettingValue'));
      }

      return errors;
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
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"], {
        noValidate: true,
        onSubmit: handleSubmit
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Body, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_FormikErrorMessage__WEBPACK_IMPORTED_MODULE_7__["default"], {
        touched: touched,
        errors: errors,
        fieldNames: Object.keys(values)
      }), this.props.insertNewSettingResult && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_ResponseMessage__WEBPACK_IMPORTED_MODULE_8__["default"], {
        isSuccessful: this.props.insertNewSettingResult.isSuccessful,
        message: this.props.insertNewSettingResult.message || _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('InsertNewSettingSuccess')
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "4",
        md: "3",
        className: "required",
        htmlFor: "settingName"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('SettingName')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "8",
        md: "9"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        type: "text",
        size: "sm",
        value: values.settingName,
        name: "settingName",
        id: "settingName",
        disabled: this.props.settingName !== '',
        className: "shadow-none",
        autoComplete: "off",
        isInvalid: touched.settingName && errors.settingName,
        onChange: handleChange
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "4",
        md: "3",
        className: "required",
        htmlFor: "settingValue"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('SettingValue')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "8",
        md: "9"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        type: "text",
        size: "sm",
        value: values.settingValue,
        name: "settingValue",
        id: "settingValue",
        className: "shadow-none",
        autoComplete: "off",
        isInvalid: touched.settingValue && errors.settingValue,
        onChange: handleChange
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "4",
        md: "3",
        htmlFor: "parentId"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('Parent')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "8",
        md: "9"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        as: "select",
        size: "sm",
        className: "shadow-none",
        name: "picType",
        id: "picType",
        onChange: event => setFieldValue('parentId', event.target.value),
        value: values.parentId
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        value: "0"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('NotApply')), this.props.parents.map((item, key) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        key: key,
        value: item.settingId
      }, `${item.settingName} - ${item.settingValue}`))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "4",
        md: "3",
        htmlFor: "displayOrder"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('DisplayOrder')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "8",
        md: "9"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        type: "number",
        value: values.displayOrder,
        name: "displayOrder",
        id: "displayOrder",
        className: "shadow-none form-control",
        onChange: handleChange
      })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Footer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], {
        type: "submit",
        size: "sm",
        variant: "primary",
        disabled: isSubmitting
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('Save')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], {
        size: "sm",
        variant: "primary",
        onClick: this.props.onClose
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('Cancel'))));
    });
  }

  componentDidMount() {
    this.props.getParentSettings();
  }

  render() {
    const {
      parents,
      settingName
    } = this.props;

    if (parents === null || !parents) {
      return null;
    }

    const initialValues = {
      settingName: settingName,
      settingValue: '',
      parentId: 0,
      displayOrder: ''
    };
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"], {
      className: "setting-modal",
      dialogAs: _jsroot_components_DraggableModalDialog__WEBPACK_IMPORTED_MODULE_6__["default"],
      backdrop: "static",
      keyboard: false,
      show: true,
      centered: true,
      size: "lg",
      onHide: this.props.onClose
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Header, {
      closeButton: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Title, {
      as: "div"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_9__["default"].getResource('InsertNewSetting'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_5__["Formik"], {
      onSubmit: this.handleSubmit,
      validate: this.validateFormik,
      initialValues: initialValues
    }, this.renderForm));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    parents,
    insertNewSettingResult
  } = state;
  return {
    parents,
    insertNewSettingResult
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(NewSettingValue));

/***/ }),

/***/ "./www/sources/js/pages/admin-tool/setting-management/index.js":
/*!*********************************************************************!*\
  !*** ./www/sources/js/pages/admin-tool/setting-management/index.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return index; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @reduxjs/toolkit */ "./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");
/* harmony import */ var _settingManagementSlice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./settingManagementSlice */ "./www/sources/js/pages/admin-tool/setting-management/settingManagementSlice.js");
/* harmony import */ var _components_AppContainer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/AppContainer */ "./www/sources/js/pages/admin-tool/setting-management/components/AppContainer.jsx");
/* harmony import */ var _cssroot_pages_admin_tool_setting_management_index_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @cssroot/pages/admin-tool/setting-management/index.scss */ "./www/sources/css/pages/admin-tool/setting-management/index.scss");
/* harmony import */ var _cssroot_pages_admin_tool_setting_management_index_scss__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_cssroot_pages_admin_tool_setting_management_index_scss__WEBPACK_IMPORTED_MODULE_5__);





const store = Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__["configureStore"])({
  reducer: _settingManagementSlice__WEBPACK_IMPORTED_MODULE_3__["default"]
});

class index extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_1__["Provider"], {
      store: store
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "setting-management"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_AppContainer__WEBPACK_IMPORTED_MODULE_4__["default"], null)));
  }

}

/***/ }),

/***/ "./www/sources/js/pages/admin-tool/setting-management/settingManagementSlice.js":
/*!**************************************************************************************!*\
  !*** ./www/sources/js/pages/admin-tool/setting-management/settingManagementSlice.js ***!
  \**************************************************************************************/
/*! exports provided: resetState, setMainSettings, setParentSettings, setSettingTypes, setLicensees, setLicenseeMapping, setLicenseeManager, setGridParams, setEditStatusPopup, setOpenInsertNewSettingPopup, setOpenLicenseeMappingPopup, setInsertNewSettingResult, setOpenEdiPopup, setEditNewSettingResult, setConfirmCancelPopup, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetState", function() { return resetState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setMainSettings", function() { return setMainSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setParentSettings", function() { return setParentSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSettingTypes", function() { return setSettingTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setLicensees", function() { return setLicensees; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setLicenseeMapping", function() { return setLicenseeMapping; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setLicenseeManager", function() { return setLicenseeManager; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setGridParams", function() { return setGridParams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setEditStatusPopup", function() { return setEditStatusPopup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setOpenInsertNewSettingPopup", function() { return setOpenInsertNewSettingPopup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setOpenLicenseeMappingPopup", function() { return setOpenLicenseeMappingPopup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setInsertNewSettingResult", function() { return setInsertNewSettingResult; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setOpenEdiPopup", function() { return setOpenEdiPopup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setEditNewSettingResult", function() { return setEditNewSettingResult; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setConfirmCancelPopup", function() { return setConfirmCancelPopup; });
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @reduxjs/toolkit */ "./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");

const initialState = {
  mainSettings: null,
  parents: null,
  settingType: null,
  licensees: null,
  licenseesMapping: null,
  licenseesManager: [],
  gridParams: {
    settingName: ''
  },
  editStatusPopup: {
    show: false
  },
  insertNewSettingPopup: {
    show: false,
    settingName: ''
  },
  licenseeMappingPopup: {
    show: false
  },
  insertNewSettingResult: null,
  editPopup: {
    show: false,
    data: null
  },
  editNewSettingResult: null,
  confirmCancelPopup: {
    show: false,
    setting: '',
    settingId: 0
  }
};
const settingManagementSlice = Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__["createSlice"])({
  name: 'settingManagement',
  initialState: initialState,
  reducers: {
    resetState: () => initialState,
    setMainSettings: (state, action) => {
      state.mainSettings = action.payload;
    },
    setParentSettings: (state, action) => {
      state.parents = action.payload;
    },
    setSettingTypes: (state, action) => {
      state.settingType = action.payload;
    },
    setLicensees: (state, action) => {
      state.licensees = action.payload;
    },
    setLicenseeMapping: (state, action) => {
      state.licenseesMapping = action.payload;
    },
    setLicenseeManager: (state, action) => {
      state.licenseesManager = action.payload;
    },
    setGridParams: (state, action) => {
      state.gridParams = action.payload;
    },
    setEditStatusPopup: (state, action) => {
      state.editStatusPopup = action.payload;
    },
    setOpenInsertNewSettingPopup: (state, action) => {
      state.insertNewSettingPopup = action.payload;
    },
    setOpenLicenseeMappingPopup: (state, action) => {
      state.licenseeMappingPopup = action.payload;
    },
    setInsertNewSettingResult: (state, action) => {
      state.insertNewSettingResult = action.payload;
    },
    setOpenEdiPopup: (state, action) => {
      state.editPopup = action.payload;
    },
    setEditNewSettingResult: (state, action) => {
      state.editNewSettingResult = action.payload;
    },
    setConfirmCancelPopup: (state, action) => {
      state.confirmCancelPopup = action.payload;
    }
  }
});
const {
  actions,
  reducer
} = settingManagementSlice;
const {
  resetState,
  setMainSettings,
  setParentSettings,
  setSettingTypes,
  setLicensees,
  setLicenseeMapping,
  setLicenseeManager,
  setGridParams,
  setEditStatusPopup,
  setOpenInsertNewSettingPopup,
  setOpenLicenseeMappingPopup,
  setInsertNewSettingResult,
  setOpenEdiPopup,
  setEditNewSettingResult,
  setConfirmCancelPopup
} = actions;
/* harmony default export */ __webpack_exports__["default"] = (reducer);

/***/ })

}]);
//# sourceMappingURL=5.chunk.js.map