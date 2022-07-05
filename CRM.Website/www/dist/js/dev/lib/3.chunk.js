(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

/***/ "./www/sources/css/pages/pic-and-headline/pic-assignment/index.scss":
/*!**************************************************************************!*\
  !*** ./www/sources/css/pages/pic-and-headline/pic-assignment/index.scss ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./www/sources/js/pages/pic-and-headline/pic-assignment/actions.js":
/*!*************************************************************************!*\
  !*** ./www/sources/js/pages/pic-and-headline/pic-assignment/actions.js ***!
  \*************************************************************************/
/*! exports provided: ActionCreators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionCreators", function() { return ActionCreators; });
/* harmony import */ var _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/common/site */ "./www/sources/js/common/site.js");
/* harmony import */ var _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/common/dataService */ "./www/sources/js/common/dataService.js");
/* harmony import */ var _picAssignmentSlice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./picAssignmentSlice */ "./www/sources/js/pages/pic-and-headline/pic-assignment/picAssignmentSlice.js");




const getSettings = () => async dispatch => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl('PicAssignment/AllSetting');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__["default"].postDataAsync(url).then(response => {
    if (!response || !response.data) {
      return;
    }

    dispatch(Object(_picAssignmentSlice__WEBPACK_IMPORTED_MODULE_2__["setSettings"])(response.data));
  });
};

const getGridData = (params, callback) => async dispatch => {
  _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].blockUI();
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl('PicAssignment/GetAllPICAssignment');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__["default"].postDataAsync(url, params).then(response => {
    if (typeof callback === 'function') {
      callback(response.data.data);
    }

    dispatch(Object(_picAssignmentSlice__WEBPACK_IMPORTED_MODULE_2__["setGridData"])(response.data));
  }).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].unblockUI());
};

const validateAssignPic = params => async dispatch => {
  _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].blockUI();
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl('PicAssignment/ValidateAssignPic');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__["default"].postDataAsync(url, params).then(response => {
    dispatch(Object(_picAssignmentSlice__WEBPACK_IMPORTED_MODULE_2__["setValidateAssignPicResult"])(response.data));
  }).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].unblockUI());
};

const ActionCreators = {
  resetState: _picAssignmentSlice__WEBPACK_IMPORTED_MODULE_2__["resetState"],
  setGridParams: _picAssignmentSlice__WEBPACK_IMPORTED_MODULE_2__["setGridParams"],
  setGridData: _picAssignmentSlice__WEBPACK_IMPORTED_MODULE_2__["setGridData"],
  setSettings: _picAssignmentSlice__WEBPACK_IMPORTED_MODULE_2__["setSettings"],
  setRemoveOptions: _picAssignmentSlice__WEBPACK_IMPORTED_MODULE_2__["setRemoveOptions"],
  setRemovePicAssignmentPopup: _picAssignmentSlice__WEBPACK_IMPORTED_MODULE_2__["setRemovePicAssignmentPopup"],
  setAssignPicPopup: _picAssignmentSlice__WEBPACK_IMPORTED_MODULE_2__["setAssignPicPopup"],
  setAssignPicResult: _picAssignmentSlice__WEBPACK_IMPORTED_MODULE_2__["setAssignPicResult"],
  setValidateAssignPicResult: _picAssignmentSlice__WEBPACK_IMPORTED_MODULE_2__["setValidateAssignPicResult"],
  setAssignPicFilter: _picAssignmentSlice__WEBPACK_IMPORTED_MODULE_2__["setAssignPicFilter"],
  setConfirmAssignedDirectAccountPopup: _picAssignmentSlice__WEBPACK_IMPORTED_MODULE_2__["setConfirmAssignedDirectAccountPopup"],
  setDefaultPicPopup: _picAssignmentSlice__WEBPACK_IMPORTED_MODULE_2__["setDefaultPicPopup"],
  getSettings,
  getGridData,
  validateAssignPic
};

/***/ }),

/***/ "./www/sources/js/pages/pic-and-headline/pic-assignment/common.functions.js":
/*!**********************************************************************************!*\
  !*** ./www/sources/js/pages/pic-and-headline/pic-assignment/common.functions.js ***!
  \**********************************************************************************/
/*! exports provided: handleNewRemoveOptions, assignPic, removePicAssignment, removeDefaultPic, setDefaultPic, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "handleNewRemoveOptions", function() { return handleNewRemoveOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assignPic", function() { return assignPic; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removePicAssignment", function() { return removePicAssignment; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeDefaultPic", function() { return removeDefaultPic; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setDefaultPic", function() { return setDefaultPic; });
/* harmony import */ var _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/common/site */ "./www/sources/js/common/site.js");
/* harmony import */ var _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/common/dataService */ "./www/sources/js/common/dataService.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/lib/index.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_toastify__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");




const handleNewRemoveOptions = (data, done) => {
  const removeList = data.filter(item => item.picList && item.picList.length > 0);
  const dataList = data.map(item => {
    return {
      picList: item.picList,
      headlineID: item.headlineID,
      headlineName: item.headlineName,
      custId: item.directAccountID,
      custName: item.directAccount,
      isRemoved: false
    };
  });
  done({
    isCheckedAll: false,
    isDisabledRemove: true,
    isHadAll: removeList.length > 0,
    shouldResetScrollPosition: true,
    dataList
  });
};
const assignPic = async (params, done) => {
  _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].blockUI();
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl('PicAssignment/AssignPIC');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__["default"].postDataAsync(url, params).then(response => {
    done(response.data);
  }).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].unblockUI());
};
const removePicAssignment = async (params, message, done) => {
  _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].blockUI();
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl('PicAssignment/RemoveAssignment');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__["default"].postDataAsync(url, params).then(response => {
    if (response.data.isSuccessful) {
      done();
      react_toastify__WEBPACK_IMPORTED_MODULE_2__["toast"].success(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].formatString(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('RemoveAssignmentSuccessfully'), message));
    } else {
      react_toastify__WEBPACK_IMPORTED_MODULE_2__["toast"].error(response.data.message);
    }
  }).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].unblockUI());
};
const removeDefaultPic = async (params, done) => {
  _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].blockUI();
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl('PicAssignment/RemoveDefaultPIC');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__["default"].postDataAsync(url, params).then(response => {
    done(response.data);
  }).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].unblockUI());
};
const setDefaultPic = async (params, done) => {
  _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].blockUI();
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl('PicAssignment/SetDefaultPIC');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__["default"].postDataAsync(url, params).then(response => {
    done(response.data);
  }).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].unblockUI());
};

const exportExcel = async params => {
  _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].blockUI();
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl('PicAssignment/ExportExcelReport');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__["default"].getFileAsync(url, params).then(response => {
    let fileName = response.headers['content-disposition'].split('filename=')[1];
    fileName = fileName.split("\"")[1];
    _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].downloadFile(response.data, fileName);
  }).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].unblockUI());
};

const functions = {
  handleNewRemoveOptions,
  assignPic,
  removePicAssignment,
  removeDefaultPic,
  setDefaultPic,
  exportExcel
};
/* harmony default export */ __webpack_exports__["default"] = (functions);

/***/ }),

/***/ "./www/sources/js/pages/pic-and-headline/pic-assignment/components/AppContainer.jsx":
/*!******************************************************************************************!*\
  !*** ./www/sources/js/pages/pic-and-headline/pic-assignment/components/AppContainer.jsx ***!
  \******************************************************************************************/
/*! exports provided: AppContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppContainer", function() { return AppContainer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _DataGrid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DataGrid */ "./www/sources/js/pages/pic-and-headline/pic-assignment/components/DataGrid.jsx");
/* harmony import */ var _Filter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Filter */ "./www/sources/js/pages/pic-and-headline/pic-assignment/components/Filter.jsx");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/pic-and-headline/pic-assignment/actions.js");
/* harmony import */ var _RemovePicAssignment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./RemovePicAssignment */ "./www/sources/js/pages/pic-and-headline/pic-assignment/components/RemovePicAssignment.jsx");
/* harmony import */ var _AssignPic__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./AssignPic */ "./www/sources/js/pages/pic-and-headline/pic-assignment/components/AssignPic.jsx");
/* harmony import */ var _DefaultPic__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./DefaultPic */ "./www/sources/js/pages/pic-and-headline/pic-assignment/components/DefaultPic.jsx");
/* harmony import */ var _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @jsroot/common/constants */ "./www/sources/js/common/constants.js");
/* harmony import */ var _jsroot_common_shareScripts__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @jsroot/common/shareScripts */ "./www/sources/js/common/shareScripts.js");











class AppContainer extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);
    this.state = {
      policy: null,
      policyPicManagement: null
    };
  }

  componentDidMount() {
    Object(_jsroot_common_shareScripts__WEBPACK_IMPORTED_MODULE_10__["getPermission"])(_jsroot_common_constants__WEBPACK_IMPORTED_MODULE_9__["FunctionKey"].PICAssignment).then(response => {
      this.setState({
        policy: response
      });
    });
    Object(_jsroot_common_shareScripts__WEBPACK_IMPORTED_MODULE_10__["getPermission"])(_jsroot_common_constants__WEBPACK_IMPORTED_MODULE_9__["FunctionKey"].PICManagement).then(response => {
      this.setState({
        policyPicManagement: response
      });
    });
  }

  componentWillUnmount() {
    this.props.resetState();
  }

  render() {
    const {
      policy,
      policyPicManagement
    } = this.state;

    if (!policy || !policyPicManagement) {
      return null;
    }

    const isHost = policy === _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_9__["Policy"].Host;
    const isReadPicManagement = policyPicManagement > _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_9__["Policy"].Read;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Filter__WEBPACK_IMPORTED_MODULE_2__["default"], {
      isHost: isHost
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DataGrid__WEBPACK_IMPORTED_MODULE_1__["default"], {
      isHost: isHost,
      isReadPicManagement: isReadPicManagement
    }), this.props.removePicAssignmentPopup.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_RemovePicAssignment__WEBPACK_IMPORTED_MODULE_6__["default"], {
      onClose: () => this.props.setRemovePicAssignmentPopup({
        show: false
      })
    }), this.props.assignPicPopup.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_AssignPic__WEBPACK_IMPORTED_MODULE_7__["default"], {
      data: this.props.assignPicPopup.data
    }), this.props.defaultPicPopup.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DefaultPic__WEBPACK_IMPORTED_MODULE_8__["default"], null));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_4__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_5__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    removePicAssignmentPopup,
    assignPicPopup,
    defaultPicPopup
  } = state;
  return {
    removePicAssignmentPopup,
    assignPicPopup,
    defaultPicPopup
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, mapDispatchToProps)(AppContainer));

/***/ }),

/***/ "./www/sources/js/pages/pic-and-headline/pic-assignment/components/AssignPic.jsx":
/*!***************************************************************************************!*\
  !*** ./www/sources/js/pages/pic-and-headline/pic-assignment/components/AssignPic.jsx ***!
  \***************************************************************************************/
/*! exports provided: AssignPic, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AssignPic", function() { return AssignPic; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var _jsroot_components_DraggableModalDialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/components/DraggableModalDialog */ "./www/sources/js/components/DraggableModalDialog.jsx");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/pic-and-headline/pic-assignment/actions.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var _jsroot_components_ResponseMessage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/components/ResponseMessage */ "./www/sources/js/components/ResponseMessage.jsx");
/* harmony import */ var _common_functions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../common.functions */ "./www/sources/js/pages/pic-and-headline/pic-assignment/common.functions.js");
/* harmony import */ var _ConfirmAssignedDirectAccount__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./ConfirmAssignedDirectAccount */ "./www/sources/js/pages/pic-and-headline/pic-assignment/components/ConfirmAssignedDirectAccount.jsx");
/* harmony import */ var _jsroot_components_ConfirmPopup__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @jsroot/components/ConfirmPopup */ "./www/sources/js/components/ConfirmPopup.jsx");
/* harmony import */ var _jsroot_components_CustomReactSelect__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @jsroot/components/CustomReactSelect */ "./www/sources/js/components/CustomReactSelect.jsx");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }













class AssignPic extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "componentDidMount", () => {
      const headlineOptions = this.props.settings.headlineList.map(item => {
        return {
          value: item.id,
          label: item.name
        };
      });
      const picOptions = this.props.settings.picList.map(item => {
        return {
          value: item.picId,
          label: `${item.username} (${item.roleName})`
        };
      });
      this.setState({
        headlineOptions,
        picOptions
      });
      this.props.setAssignPicResult({
        show: false
      });

      if (this.props.data && this.props.data.headlineId) {
        const {
          headlineId,
          accountNames
        } = this.props.data;
        const headline = headlineOptions.filter(item => item.value === headlineId)[0];
        const assignPicFilter = {
          headline,
          pics: [],
          directAccount: accountNames.map(item => this.handleIsValidItem(item, true)),
          isSelectedAll: false
        };
        this.props.setAssignPicFilter(assignPicFilter);
        this.setState({
          oldAssignPicFilter: assignPicFilter
        });
      }
    });

    _defineProperty(this, "handleHeadlineChange", value => this.props.setAssignPicFilter(_objectSpread(_objectSpread({}, this.props.assignPicFilter), {}, {
      headline: value
    })));

    _defineProperty(this, "handlePicChange", value => this.props.setAssignPicFilter(_objectSpread(_objectSpread({}, this.props.assignPicFilter), {}, {
      pics: value
    })));

    _defineProperty(this, "renderRelatedCustomerItem", (item, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      key: index,
      className: this.getRelatedCustomerItemClassName(item.isValid)
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, item.username), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "fa fa-close",
      onClick: () => this.handleRemoveDirectAccount(index)
    })));

    _defineProperty(this, "getRelatedCustomerItemClassName", isValid => {
      let className = 'related-customer-item';

      if (!isValid) {
        className += ' invalid';
      }

      if (this.props.assignPicFilter.isSelectedAll) {
        className += ' selected';
      }

      return className;
    });

    _defineProperty(this, "handleRemoveDirectAccount", index => {
      const directAccount = [...this.props.assignPicFilter.directAccount];
      directAccount.splice(index, 1);
      this.props.setAssignPicFilter(_objectSpread(_objectSpread({}, this.props.assignPicFilter), {}, {
        directAccount
      }));
    });

    _defineProperty(this, "handleKeyDownRelatedCustomerInput", event => {
      if (event.keyCode !== 8) {
        this.props.setAssignPicFilter(_objectSpread(_objectSpread({}, this.props.assignPicFilter), {}, {
          isSelectedAll: false
        }));
      }

      if (event.ctrlKey && event.keyCode === 65 && this.inputRef.value === '') {
        this.props.setAssignPicFilter(_objectSpread(_objectSpread({}, this.props.assignPicFilter), {}, {
          isSelectedAll: true
        }));
      } else {
        this.switchKeyCode(event);
      }
    });

    _defineProperty(this, "switchKeyCode", event => {
      switch (event.keyCode) {
        case 8:
          this.handleBackSpaceKeyCode();
          break;

        case 32:
        case 188:
        case 13:
          event.preventDefault();
          this.handleAddCustomerKeyCode();
          break;

        default:
          break;
      }
    });

    _defineProperty(this, "handleBackSpaceKeyCode", () => {
      if (this.inputRef.value === '') {
        if (this.props.assignPicFilter.isSelectedAll) {
          this.props.setAssignPicFilter(_objectSpread(_objectSpread({}, this.props.assignPicFilter), {}, {
            directAccount: [],
            isSelectedAll: false
          }));
        } else {
          const directAccount = [...this.props.assignPicFilter.directAccount];
          directAccount.pop();
          this.props.setAssignPicFilter(_objectSpread(_objectSpread({}, this.props.assignPicFilter), {}, {
            directAccount
          }));
        }
      }
    });

    _defineProperty(this, "handleAddCustomerKeyCode", () => {
      const username = this.inputRef.value;
      this.inputRef.value = '';

      if (this.props.assignPicFilter.directAccount.length < this.state.maxUsername) {
        if (username.trim() && !username.includes(',')) {
          const directAccount = [...this.props.assignPicFilter.directAccount];
          directAccount.push({
            username,
            isValid: true
          });
          this.props.setAssignPicFilter(_objectSpread(_objectSpread({}, this.props.assignPicFilter), {}, {
            directAccount
          }));
        }
      } else {
        this.setOverMaxUnernameWhenAssignPic();
      }
    });

    _defineProperty(this, "handleKeyUpRelatedCustomerInput", event => {
      const addKeyCode = [13, 32, 188];

      if (addKeyCode.includes(event.keyCode)) {
        this.inputRef.value = '';
      }
    });

    _defineProperty(this, "handlePasteRelatedCustomerInput", event => {
      const newDirectAccount = event.clipboardData.getData('text/plain').replace(/ /g, ',').replace(/\r\n/g, ',').replace(/\n/g, ',').replace(/\t/g, ',').split(',').filter(item => item !== '');
      setTimeout(() => this.inputRef.value = '', 10);

      if (this.props.assignPicFilter.directAccount.length + newDirectAccount.length <= this.state.maxUsername) {
        const directAccount = [...this.props.assignPicFilter.directAccount, ...newDirectAccount.map(item => this.handleIsValidItem(item, true))];
        this.props.setAssignPicFilter(_objectSpread(_objectSpread({}, this.props.assignPicFilter), {}, {
          directAccount
        }));
      } else {
        this.setOverMaxUnernameWhenAssignPic();
      }
    });

    _defineProperty(this, "handleIsValidItem", (username, isValid) => {
      return {
        isValid,
        username
      };
    });

    _defineProperty(this, "setOverMaxUnernameWhenAssignPic", () => this.props.setAssignPicResult({
      show: true,
      isSuccessful: false,
      message: _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].formatString(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('OverMaxUnernameWhenAssignPic'), this.state.maxUsername)
    }));

    _defineProperty(this, "handleBlurRelatedCustomerInput", () => {
      const directAccount = [...this.props.assignPicFilter.directAccount];

      if (directAccount.length < this.state.maxUsername) {
        if (this.inputRef.value.trim() !== '') {
          directAccount.push({
            isValid: true,
            username: this.inputRef.value
          });
          this.props.setAssignPicFilter(_objectSpread(_objectSpread({}, this.props.assignPicFilter), {}, {
            isSelectedAll: false,
            directAccount
          }));
        } else {
          this.props.setAssignPicFilter(_objectSpread(_objectSpread({}, this.props.assignPicFilter), {}, {
            isSelectedAll: false
          }));
        }
      } else {
        this.setOverMaxUnernameWhenAssignPic();
        this.props.setAssignPicFilter(_objectSpread(_objectSpread({}, this.props.assignPicFilter), {}, {
          isSelectedAll: false
        }));
      }

      this.inputRef.value = '';
    });

    _defineProperty(this, "validateForm", () => {
      const errMsg = [];

      if (!this.props.assignPicFilter.headline) {
        errMsg.push(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('GroupHeadlineRequired'));
      }

      if (!this.props.assignPicFilter.pics || this.props.assignPicFilter.pics.length === 0) {
        errMsg.push(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('PICRequired'));
      }

      if (this.props.assignPicFilter.directAccount.length === 0) {
        errMsg.push(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('DirectAccountRequired'));
      }

      if (errMsg.length > 0) {
        this.setState({
          validate: {
            show: true,
            errMsg
          }
        });
        return false;
      }

      return true;
    });

    _defineProperty(this, "handleSubmit", () => {
      this.setState({
        validate: {
          show: false
        }
      });
      this.props.setAssignPicPopup(_objectSpread(_objectSpread({}, this.props.assignPicPopup), {}, {
        isSubmitting: true
      }));
      this.props.setAssignPicResult({
        show: false
      });

      if (this.validateForm()) {
        this.props.validateAssignPic({
          headlineId: this.props.assignPicFilter.headline.value,
          picIds: this.props.assignPicFilter.pics.map(item => item.value).toString(),
          directAccountIds: this.props.assignPicFilter.directAccount.map(item => item.username).toString()
        }).then(this.handleAssignPic);
      } else {
        this.props.setAssignPicPopup(_objectSpread(_objectSpread({}, this.props.assignPicPopup), {}, {
          isSubmitting: false
        }));
      }
    });

    _defineProperty(this, "handleAssignPic", () => {
      const {
        isSuccessful,
        errorAccounts,
        assignedDirectAccounts
      } = this.props.validateAssignPicResult;

      if (isSuccessful && assignedDirectAccounts && assignedDirectAccounts.length === 0) {
        _common_functions__WEBPACK_IMPORTED_MODULE_8__["default"].assignPic({
          headlineId: this.props.assignPicFilter.headline.value,
          picIds: this.props.assignPicFilter.pics.map(item => item.value).toString(),
          isKeepAssign: true,
          directAccountIds: this.props.assignPicFilter.directAccount.map(item => item.username).toString()
        }, this.callbackAssignPic);
      }

      if (isSuccessful && assignedDirectAccounts && assignedDirectAccounts.length > 0) {
        this.props.setConfirmAssignedDirectAccountPopup({
          show: true,
          data: assignedDirectAccounts
        });
      }

      if (!isSuccessful && assignedDirectAccounts && assignedDirectAccounts.length === 0) {
        this.handleNotSuccessfulAndEmptyAssignDirectAccounts(errorAccounts);
      }
    });

    _defineProperty(this, "handleNotSuccessfulAndEmptyAssignDirectAccounts", errorAccounts => {
      const messages = [];
      let invalidAccounts = [];

      if (errorAccounts.invalidUsername) {
        invalidAccounts = invalidAccounts.concat(errorAccounts.invalidUsername.split(',').map(item => item.trim()));
        messages.push(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].formatString(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('InvalidUsernames'), errorAccounts.invalidUsername));
      }

      if (errorAccounts.notDirectAccount) {
        invalidAccounts = invalidAccounts.concat(errorAccounts.notDirectAccount.split(',').map(item => item.trim()));
        messages.push(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].formatString(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('TheseAccountsAreNotDirectAccounts'), errorAccounts.notDirectAccount));
      }

      if (errorAccounts.noBelongHeadlineAccount) {
        invalidAccounts = invalidAccounts.concat(errorAccounts.noBelongHeadlineAccount.split(',').map(item => item.trim()));
        messages.push(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].formatString(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('TheseDirectAccountsDoNotBelongToGroupHeadline'), errorAccounts.noBelongHeadlineAccount));
      }

      if (invalidAccounts.length > 0) {
        const directAccount = this.props.assignPicFilter.directAccount.map(item => this.handleIsValidItem(item.username, !invalidAccounts.includes(item.username)));
        this.props.setAssignPicFilter(_objectSpread(_objectSpread({}, this.props.assignPicFilter), {}, {
          directAccount
        }));
      }

      this.props.setAssignPicPopup(_objectSpread(_objectSpread({}, this.props.assignPicPopup), {}, {
        isSubmitting: false
      }));
      this.props.setAssignPicResult({
        show: true,
        isSuccessful: false,
        messages
      });
    });

    _defineProperty(this, "callbackAssignPic", data => {
      const {
        isSuccessful,
        message
      } = data;
      this.props.setAssignPicResult({
        isSuccessful,
        message: isSuccessful ? _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('AssignPICSuccessfully') : message,
        show: true
      });

      if (data.isSuccessful) {
        setTimeout(this.refreshGrid, 2000);
      } else {
        this.props.setAssignPicPopup(_objectSpread(_objectSpread({}, this.props.assignPicPopup), {}, {
          isSubmitting: false
        }));
      }
    });

    _defineProperty(this, "refreshGrid", () => {
      this.props.setAssignPicPopup({
        show: false
      });
      this.props.setAssignPicFilter({
        headline: null,
        pics: [],
        directAccount: [],
        isSelectedAll: false
      });
      this.props.getGridData(this.props.gridParams, data => _common_functions__WEBPACK_IMPORTED_MODULE_8__["default"].handleNewRemoveOptions(data, this.props.setRemoveOptions));
    });

    _defineProperty(this, "handleCancel", () => {
      if (this.isFilterNotChange()) {
        this.onClose();
      } else {
        this.setState({
          isShowConfirmPopup: true
        });
      }
    });

    _defineProperty(this, "isFilterNotChange", () => {
      const assignPicFilter = _objectSpread({}, this.props.assignPicFilter);

      const oldAssignPicFilter = _objectSpread({}, this.state.oldAssignPicFilter);

      if (!assignPicFilter.pics) {
        return true;
      }

      return this.isEqualDirectAccountArray(assignPicFilter.directAccount, oldAssignPicFilter.directAccount) && assignPicFilter.headline === oldAssignPicFilter.headline && assignPicFilter.pics.length === 0;
    });

    _defineProperty(this, "isEqualDirectAccountArray", (firstArray, secondArray) => {
      if (firstArray.length !== secondArray.length) {
        return false;
      }

      for (let index = 0; index < firstArray.length; index++) {
        if (firstArray[index].username !== secondArray[index].username) {
          return false;
        }
      }

      return true;
    });

    _defineProperty(this, "onClose", () => {
      this.props.setAssignPicPopup({
        show: false
      });
      this.props.setAssignPicFilter({
        headline: null,
        pics: [],
        directAccount: [],
        isSelectedAll: false
      });
    });

    _defineProperty(this, "closeAll", () => {
      this.closeConfirmPopup();
      this.onClose();
    });

    _defineProperty(this, "closeConfirmPopup", () => this.setState({
      isShowConfirmPopup: false
    }));

    this.state = {
      maxUsername: 10000,
      headlineOptions: [],
      picOptions: [],
      isShowConfirmPopup: false,
      oldAssignPicFilter: {
        headline: null,
        pics: [],
        directAccount: []
      },
      validate: {
        show: false,
        errMsg: []
      }
    };
  }

  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"], {
      show: true,
      backdrop: "static",
      keyboard: false,
      centered: true,
      onHide: () => this.handleCancel(),
      dialogAs: _jsroot_components_DraggableModalDialog__WEBPACK_IMPORTED_MODULE_2__["default"]
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Header, {
      closeButton: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Title, {
      as: "div"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('AssignPIC'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Form"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Body, null, this.state.validate.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Alert"], {
      variant: "danger"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
      className: "list-message-error"
    }, this.state.validate.errMsg.map((message, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      key: index
    }, message)))), this.props.assignPicResult.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_ResponseMessage__WEBPACK_IMPORTED_MODULE_7__["default"], {
      isSuccessful: this.props.assignPicResult.isSuccessful,
      message: this.props.assignPicResult.message,
      messages: this.props.assignPicResult.messages
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Form"].Group, {
      as: react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Row"]
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Form"].Label, {
      column: true,
      sm: "4",
      md: "3",
      className: "required"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('GroupHeadline')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Col"], {
      sm: "8",
      md: "9"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_CustomReactSelect__WEBPACK_IMPORTED_MODULE_11__["default"], {
      isClearable: true,
      onChange: value => this.handleHeadlineChange(value),
      options: this.state.headlineOptions,
      value: this.props.assignPicFilter.headline,
      placeholder: _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('PleaseSelect')
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Form"].Group, {
      as: react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Row"]
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Form"].Label, {
      column: true,
      sm: "4",
      md: "3",
      className: "required"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('PIC')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Col"], {
      sm: "8",
      md: "9"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_CustomReactSelect__WEBPACK_IMPORTED_MODULE_11__["default"], {
      isMulti: true,
      isClearable: true,
      onChange: value => this.handlePicChange(value),
      options: this.state.picOptions,
      value: this.props.assignPicFilter.pics,
      placeholder: _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('PleaseSelect')
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Form"].Group, {
      as: react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Row"]
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Form"].Label, {
      column: true,
      sm: "4",
      md: "3",
      className: "required"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('DirectAccount')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Col"], {
      sm: "8",
      md: "9"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "col-xs-12 related-customer-container",
      onClick: () => this.inputRef.focus()
    }, this.props.assignPicFilter.directAccount.map(this.renderRelatedCustomerItem), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      ref: input => this.inputRef = input,
      type: "text",
      onKeyDown: e => this.handleKeyDownRelatedCustomerInput(e),
      onKeyUp: e => this.handleKeyUpRelatedCustomerInput(e),
      onPaste: e => this.handlePasteRelatedCustomerInput(e),
      onBlur: () => this.handleBlurRelatedCustomerInput()
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "col-xs-12"
    }, "Maximum usernames: ", this.state.maxUsername - this.props.assignPicFilter.directAccount.length)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Footer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Button"], {
      variant: "primary",
      size: "sm",
      disabled: this.props.assignPicPopup.isSubmitting,
      onClick: () => this.handleSubmit()
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('Save')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Button"], {
      variant: "primary",
      size: "sm",
      onClick: () => this.handleCancel()
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('Cancel'))))), this.props.confirmAssignedDirectAccountPopup.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ConfirmAssignedDirectAccount__WEBPACK_IMPORTED_MODULE_9__["default"], {
      data: this.props.confirmAssignedDirectAccountPopup.data,
      closeAssignPicPopup: () => this.onClose()
    }), this.state.isShowConfirmPopup && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_ConfirmPopup__WEBPACK_IMPORTED_MODULE_10__["default"], {
      size: "lg",
      title: _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('Confirmation'),
      content: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('ThereAreSomeChangesConfirmMessage')),
      onSubmit: () => this.closeAll(),
      onClose: () => this.closeConfirmPopup()
    }));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_4__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_5__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    settings,
    assignPicResult,
    validateAssignPicResult,
    gridParams,
    assignPicFilter,
    confirmAssignedDirectAccountPopup,
    assignPicPopup
  } = state;
  return {
    settings,
    assignPicResult,
    validateAssignPicResult,
    gridParams,
    assignPicFilter,
    confirmAssignedDirectAccountPopup,
    assignPicPopup
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, mapDispatchToProps)(AssignPic));

/***/ }),

/***/ "./www/sources/js/pages/pic-and-headline/pic-assignment/components/ConfirmAssignedDirectAccount.jsx":
/*!**********************************************************************************************************!*\
  !*** ./www/sources/js/pages/pic-and-headline/pic-assignment/components/ConfirmAssignedDirectAccount.jsx ***!
  \**********************************************************************************************************/
/*! exports provided: ConfirmAssignedDirectAccount, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfirmAssignedDirectAccount", function() { return ConfirmAssignedDirectAccount; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var _jsroot_components_DraggableModalDialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/components/DraggableModalDialog */ "./www/sources/js/components/DraggableModalDialog.jsx");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/pic-and-headline/pic-assignment/actions.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var _jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/components/react-grid/index */ "./www/sources/js/components/react-grid/index.jsx");
/* harmony import */ var _common_functions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../common.functions */ "./www/sources/js/pages/pic-and-headline/pic-assignment/common.functions.js");
/* harmony import */ var _components_SweetModalDialog__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../components/SweetModalDialog */ "./www/sources/js/components/SweetModalDialog.jsx");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }











class ConfirmAssignedDirectAccount extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "buildHeader", () => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["HeaderRow"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["HeaderCell"], {
      colWidth: 30
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('PIC')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["HeaderCell"], {
      colWidth: 70
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('DirectAccount'))));

    _defineProperty(this, "buildBody", () => this.props.confirmAssignedDirectAccountPopup.data.map((item, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["Row"], {
      key: index
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["Cell"], null, `${item.picName} (${item.role})`), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["Cell"], null, this.renderDirectAccount(item.directAccount)))));

    _defineProperty(this, "renderDirectAccount", data => {
      const directAccount = data.split(',');

      if (directAccount.length > 20) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
          className: "link-color cursor-pointer",
          onClick: () => this.openDirectAccountPopup(directAccount)
        }, directAccount.length, " custommers");
      }

      return data;
    });

    _defineProperty(this, "openDirectAccountPopup", directAccount => this.setState({
      directAccountPopup: {
        show: true,
        data: directAccount
      }
    }));

    _defineProperty(this, "closeDirectAccountPopup", () => this.setState({
      directAccountPopup: {
        show: false
      }
    }));

    _defineProperty(this, "onClose", () => {
      this.props.setConfirmAssignedDirectAccountPopup({
        show: false
      });
      this.props.setAssignPicPopup(_objectSpread(_objectSpread({}, this.props.assignPicPopup), {}, {
        isSubmitting: false
      }));
    });

    _defineProperty(this, "assignPic", isKeepAssign => {
      this.props.setConfirmAssignedDirectAccountPopup({
        show: false
      });
      _common_functions__WEBPACK_IMPORTED_MODULE_8__["default"].assignPic({
        headlineId: this.props.assignPicFilter.headline.value,
        picIds: this.props.assignPicFilter.pics.map(item => item.value).toString(),
        isKeepAssign,
        directAccountIds: this.props.assignPicFilter.directAccount.map(item => item.username).toString()
      }, this.callbackAssignPic);
    });

    _defineProperty(this, "callbackAssignPic", data => {
      const {
        isSuccessful,
        message
      } = data;
      this.props.setAssignPicResult({
        show: true,
        isSuccessful,
        message: isSuccessful ? _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('AssignPICSuccessfully') : message
      });

      if (data.isSuccessful) {
        setTimeout(this.refreshGrid, 2000);
      } else {
        this.props.setAssignPicPopup(_objectSpread(_objectSpread({}, this.props.assignPicPopup), {}, {
          isSubmitting: false
        }));
      }
    });

    _defineProperty(this, "refreshGrid", () => {
      this.props.setAssignPicPopup({
        show: false
      });
      this.props.getGridData(this.props.gridParams, data => _common_functions__WEBPACK_IMPORTED_MODULE_8__["default"].handleNewRemoveOptions(data, this.props.setRemoveOptions));
      this.props.setAssignPicFilter({
        headline: null,
        pics: [],
        directAccount: [],
        isSelectedAll: false
      });
    });

    this.state = {
      isSubmitting: false,
      directAccountPopup: {
        show: false
      }
    };
  }

  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"], {
      show: true,
      backdrop: "static",
      keyboard: false,
      size: "lg",
      centered: true,
      onHide: () => this.onClose(),
      dialogAs: _jsroot_components_DraggableModalDialog__WEBPACK_IMPORTED_MODULE_2__["default"]
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Header, {
      closeButton: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Title, {
      as: "div"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('ListOfAssignedDirectAccounts'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Body, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["Table"], {
      maxWidth: 772,
      header: this.buildHeader(),
      body: this.buildBody(),
      containerPadding: 0
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Footer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Button"], {
      variant: "primary",
      size: "sm",
      disabled: this.state.isSubmitting,
      onClick: () => this.assignPic(false)
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('RemoveAndAssign')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Button"], {
      variant: "primary",
      size: "sm",
      disabled: this.state.isSubmitting,
      onClick: () => this.assignPic(true)
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('KeepAssign')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Button"], {
      variant: "primary",
      size: "sm",
      onClick: () => this.onClose()
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('Cancel')))), this.state.directAccountPopup.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_SweetModalDialog__WEBPACK_IMPORTED_MODULE_9__["default"], {
      onClose: this.closeDirectAccountPopup,
      contents: this.state.directAccountPopup.data,
      buttons: [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Button"], {
        variant: "primary",
        size: "sm",
        onClick: this.closeDirectAccountPopup
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('Close'))],
      title: _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('DirectAccount')
    }));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_4__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_5__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    confirmAssignedDirectAccountPopup,
    gridParams,
    assignPicFilter,
    assignPicPopup
  } = state;
  return {
    confirmAssignedDirectAccountPopup,
    gridParams,
    assignPicFilter,
    assignPicPopup
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, mapDispatchToProps)(ConfirmAssignedDirectAccount));

/***/ }),

/***/ "./www/sources/js/pages/pic-and-headline/pic-assignment/components/DataGrid.jsx":
/*!**************************************************************************************!*\
  !*** ./www/sources/js/pages/pic-and-headline/pic-assignment/components/DataGrid.jsx ***!
  \**************************************************************************************/
/*! exports provided: DataGrid, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataGrid", function() { return DataGrid; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/pic-and-headline/pic-assignment/actions.js");
/* harmony import */ var _jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/components/react-grid/index */ "./www/sources/js/components/react-grid/index.jsx");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/common/constants */ "./www/sources/js/common/constants.js");
/* harmony import */ var _common_functions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../common.functions */ "./www/sources/js/pages/pic-and-headline/pic-assignment/common.functions.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }










class DataGrid extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "onPaging", (pageIndex, pageSize) => {
      const params = _objectSpread({}, this.props.gridParams);

      params.pageIndex = pageIndex;
      params.pageSize = pageSize;
      this.props.setGridParams(params);
      this.props.getGridData(params, data => _common_functions__WEBPACK_IMPORTED_MODULE_7__["default"].handleNewRemoveOptions(data, this.props.setRemoveOptions));
    });

    _defineProperty(this, "buildPicManagementHeader", (isHost, isRenderCommunication, uniqueCommunication) => {
      return [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderRow"], {
        key: "header1"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 50,
        rowSpan: this.rowSpanHeader(isRenderCommunication)
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('TextNo')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 100,
        rowSpan: this.rowSpanHeader(isRenderCommunication)
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('GroupHeadline')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 100,
        rowSpan: this.rowSpanHeader(isRenderCommunication)
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('HeadlineType')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 130,
        rowSpan: this.rowSpanHeader(isRenderCommunication)
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('DefaultPIC')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 135,
        rowSpan: this.rowSpanHeader(isRenderCommunication)
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('PIC')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 100,
        rowSpan: this.rowSpanHeader(isRenderCommunication)
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('DirectAccount')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 100,
        rowSpan: this.rowSpanHeader(isRenderCommunication)
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Status')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 130,
        rowSpan: this.rowSpanHeader(isRenderCommunication)
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Site')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 100,
        rowSpan: this.rowSpanHeader(isRenderCommunication)
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Currency')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 100,
        rowSpan: this.rowSpanHeader(isRenderCommunication)
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Position')), isHost && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 80,
        rowSpan: isRenderCommunication ? 2 : 0
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "d-flex justify-content-center"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        className: "d-block mx-auto",
        type: "button",
        value: _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Remove'),
        disabled: this.props.removeOptions.isDisabledRemove,
        onClick: () => this.handleOpenRemovePopup()
      })), this.props.removeOptions.isHadAll && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        className: "d-block cursor-pointer mx-auto margin-top-5px",
        type: "checkbox",
        checked: this.props.removeOptions.isCheckedAll,
        onChange: () => this.handleChangeRemoveCheckboxAll()
      })), isRenderCommunication && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colSpan: uniqueCommunication.length + 1
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('CommunicationTool'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderRow"], {
        key: "header2"
      }, isRenderCommunication && this.renderHeaderCommunicationTools(uniqueCommunication))];
    });

    _defineProperty(this, "rowSpanHeader", isRenderCommunication => isRenderCommunication ? 2 : 0);

    _defineProperty(this, "renderHeaderCommunicationTools", uniqueCommunication => {
      const header = [];
      header.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        key: "PICName",
        colWidth: 100
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('PICName')));
      uniqueCommunication.forEach((item, index) => {
        const maxLengthComm = this.findLongestWordLength(item.settingValue);
        const calWidthCommByPixel = this.measureText(maxLengthComm);
        header.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
          className: "header-comm",
          colWidth: calWidthCommByPixel > 100 ? calWidthCommByPixel + 50 : 100,
          key: `comm-header-${item.settingValue}-${index}`
        }, item.settingValue));
      });
      return header;
    });

    _defineProperty(this, "findLongestWordLength", str => {
      const arr = str.split(' ');
      let strArr = '';

      for (let i = 0; i < arr.length; i++) {
        if (strArr.length < arr[i].length) {
          strArr = arr[i];
        }
      }

      return strArr;
    });

    _defineProperty(this, "buildPicManagementBody", (isHost, isRenderCommunication) => {
      const {
        pageIndex,
        pageSize
      } = this.props.gridParams;
      this.startIndex = (pageIndex - 1) * pageSize + 1;

      if (this.props.picAssignmentGridData.data.length > 0) {
        {
          return this.buildPicManagementBodyHasData(isHost, isRenderCommunication);
        }
      }

      return [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Row"], {
        key: `body${1}`,
        className: "no-data"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: "text-center",
        colSpan: isHost ? 11 : 10
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('ThereIsNoData')))];
    });

    _defineProperty(this, "buildPicManagementBodyHasData", (isHost, isRenderCommunication) => {
      const body = [];
      let mergeHeadline = 0;
      let mergePIC = 0;
      let countComm = 0;
      let rowIndex = 0;

      for (let index = 0; index < this.props.picAssignmentGridData.data.length; index++) {
        rowIndex++;
        let row;
        const assignment = this.props.picAssignmentGridData.data[index];
        let comm = [];
        const communicationTools = this.props.picAssignmentGridData.communicationTools;
        const picForMappingSplit = this.picForMappingItem(assignment);
        const uniquePicMapping = picForMappingSplit.filter((v, i, a) => a.findIndex(t => t === v) === i);
        comm = communicationTools.filter(item => uniquePicMapping.indexOf(item.picId.toString()) > -1);

        if (mergeHeadline === 0) {
          mergeHeadline = this.props.picAssignmentGridData.data.filter(x => x.headlineID === assignment.headlineID).length;
          const pics = this.props.picAssignmentGridData.data.filter(item => item.headlineID === assignment.headlineID && item.picForMapping === assignment.picForMapping);
          mergePIC = pics.length;
          countComm = 0;
          row = this.renderRowMergeHeadline(index, rowIndex, pics, assignment, comm, mergeHeadline, mergePIC);
        } else if (mergePIC === 0) {
          const pics = this.props.picAssignmentGridData.data.filter(item => item.headlineID === assignment.headlineID && item.picForMapping === assignment.picForMapping);
          mergePIC = pics.length;
          row = this.renderRowMerPic(index, rowIndex, pics, assignment, comm, countComm, mergePIC);
        } else {
          row = this.renderRowCommunication(index, rowIndex, assignment, countComm, comm);
        }

        body.push(row);
        countComm++;
        mergeHeadline--;
        mergePIC--;

        if (mergeHeadline === 0 && countComm < comm.length && isRenderCommunication) {
          const remainRowComm = comm.length - countComm;

          for (let indexExtra = 0; indexExtra < remainRowComm; indexExtra++) {
            row = this.renderRowCommEmpty(isHost, rowIndex, comm[countComm]);
            body.push(row);
            countComm++;
          }
        }
      }

      return body;
    });

    _defineProperty(this, "picForMappingItem", assignment => {
      const picForMappingSplit = [];
      const headline = this.props.picAssignmentGridData.data.filter(x => x.headlineID === assignment.headlineID);
      headline.map(item => {
        if (item.picForMapping) {
          const splitPic = item.picForMapping.split(',');
          splitPic.map(item1 => {
            picForMappingSplit.push(item1);
          });
        }
      });
      return picForMappingSplit;
    });

    _defineProperty(this, "renderRowMergeHeadline", (index, rowIndex, pics, assignment, comm, mergeHeadline, mergePIC) => {
      const isHost = this.props.isHost;
      const isRenderCommunication = this.isHostCommunication();
      const accounts = pics.map(pic => pic.directAccount);
      const picCell = this.renderPic(assignment.picList, assignment.headlineID, accounts, isHost);

      if (comm.length > mergeHeadline && isRenderCommunication) {
        const countExtraComm = comm.length - mergeHeadline;
        const mergeHeadlineExtraComm = mergeHeadline + countExtraComm;
        return this.renderRow(index, rowIndex, assignment, mergeHeadlineExtraComm, mergePIC, picCell, comm[0]);
      } else {
        return this.renderRow(index, rowIndex, assignment, mergeHeadline, mergePIC, picCell, comm[0]);
      }
    });

    _defineProperty(this, "renderRowMerPic", (index, rowIndex, pics, assignment, comm, countComm, mergePIC) => {
      const isHost = this.props.isHost;
      const isRenderCommunication = this.isHostCommunication();
      const accounts = pics.map(pic => pic.directAccount);
      const picCell = this.renderPic(assignment.picList, assignment.headlineID, accounts, isHost);

      if (countComm < comm.length && isRenderCommunication) {
        const commRenderPicMerge = comm[countComm];
        return this.renderRow(index, rowIndex, assignment, 0, mergePIC, picCell, commRenderPicMerge);
      } else {
        return this.renderRow(index, rowIndex, assignment, 0, mergePIC, picCell, 0);
      }
    });

    _defineProperty(this, "renderRowCommunication", (index, rowIndex, assignment, countComm, comm) => {
      const isRenderCommunication = this.isHostCommunication();

      if (countComm < comm.length && isRenderCommunication) {
        const commRender = comm[countComm];
        return this.renderRow(index, rowIndex, assignment, 0, 0, 0, commRender);
      } else {
        return this.renderRow(index, rowIndex, assignment, 0, 0, 0, 0);
      }
    });

    _defineProperty(this, "isHostCommunication", () => {
      const isReadPicManagement = this.props.isReadPicManagement;
      const communicationTools = this.props.picAssignmentGridData.communicationTools;
      return isReadPicManagement && communicationTools.length > 0;
    });

    _defineProperty(this, "renderRowCommEmpty", (isHost, index, comm) => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Row"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], null), isHost && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], null), comm ? this.renderCommunicationToolsValue(comm) : this.renderCommunicationToolsNullValue());
    });

    _defineProperty(this, "renderRow", (index, rowIndex, item, mergeHeadline, mergePIC, picCell, comm) => {
      const listComm = this.props.picAssignmentGridData.listComm;
      const isHost = this.props.isHost;
      const isRenderCommunication = this.isHostCommunication();
      const defaultPicList = item.defaultPicList ? item.defaultPicList.map(pic => {
        return {
          value: pic.picId,
          label: `${pic.picName} (${pic.role})`
        };
      }) : [];
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Row"], {
        key: rowIndex
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: "text-center"
      }, rowIndex), this.renderMergeHeadlineCells(mergeHeadline, item, defaultPicList, isHost), mergePIC > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: item.picList ? '' : 'text-center',
        rowSpan: mergePIC
      }, picCell), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: `${item.status.toLowerCase()}-color`
      }, item.directAccount), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: `${item.status.toLowerCase()}-color`
      }, item.status), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: `${item.status.toLowerCase()}-color`
      }, item.site), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: `${item.status.toLowerCase()}-color`
      }, item.currency), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: `${item.status.toLowerCase()}-color`
      }, item.position), isHost && this.renderIsHost(item, index), comm ? isRenderCommunication && this.renderCommunicationToolsValue(comm) : isRenderCommunication && this.renderCommunicationToolsNullValue(listComm));
    });

    _defineProperty(this, "renderCommunicationToolsNullValue", listComm => {
      const bodyCommunicationNullValue = [];

      for (let indexComm = 0; indexComm < listComm.length + 1; indexComm++) {
        bodyCommunicationNullValue.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
          key: `comm-${indexComm}`
        }));
      }

      return bodyCommunicationNullValue;
    });

    _defineProperty(this, "renderCommunicationToolsValue", comm => {
      const listComm = this.props.picAssignmentGridData.listComm;
      const bodyCommunication = [];
      bodyCommunication.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        key: "picName"
      }, comm.picName));

      for (let indexCommRender = 0; indexCommRender < listComm.length; indexCommRender++) {
        const renderValueComm = comm.listComm.filter(item => item.communicationTool.toString() === listComm[indexCommRender].settingValue);
        bodyCommunication.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
          key: indexCommRender,
          className: "text-center"
        }, renderValueComm.length > 0 ? renderValueComm[0].communicationValue : renderValueComm));
      }

      return bodyCommunication;
    });

    _defineProperty(this, "renderMergeHeadlineCells", (mergeHeadline, item, defaultPicList, isHost) => {
      if (mergeHeadline > 0) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["OverlayTrigger"], {
          placement: "top",
          overlay: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_8__["Tooltip"], null, `${_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('GroupHeadline')}: ${item.headlineName}`)
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
          className: "text-center",
          rowSpan: mergeHeadline
        }, item.headlineName)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
          className: "text-center",
          rowSpan: mergeHeadline
        }, item.headlineType), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
          className: defaultPicList.length > 0 ? '' : 'text-center',
          rowSpan: mergeHeadline
        }, this.renderDefaultPic({
          id: item.headlineID,
          name: item.headlineName
        }, defaultPicList, isHost)));
      }

      return null;
    });

    _defineProperty(this, "renderIsHost", (item, index) => {
      const checked = this.props.removeOptions.dataList && this.props.removeOptions.dataList[index] && this.props.removeOptions.dataList[index].isRemoved;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        className: `${item.status.toLowerCase()}-color text-center`
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "checkbox",
        className: "cursor-pointer",
        checked: item.picList && item.picList.length > 0 && checked,
        disabled: !item.picList || item.picList.length === 0,
        onChange: () => this.handleChangeRemoveCheckbox(index)
      }));
    });

    _defineProperty(this, "handleOpenAssignPicPopup", (headlineId, accountNames) => this.props.setAssignPicPopup({
      show: true,
      data: {
        headlineId,
        accountNames
      }
    }));

    _defineProperty(this, "renderPic", (pics, headlineId, accountNames, isHost) => {
      if (pics === null || pics.length === 0) {
        if (isHost) {
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
            className: "plus-icon",
            onClick: () => this.handleOpenAssignPicPopup(headlineId, accountNames)
          }, "+");
        }

        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "-");
      }

      return pics.map(item => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
        key: item.picId,
        className: "pic-name"
      }, `${item.picName} (${item.role})`));
    });

    _defineProperty(this, "renderDefaultPic", (headline, pics, isHost) => {
      if (pics.length > 0) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "cursor-pointer link-color",
          onClick: () => this.handleOpenDefaultPicPopup(headline, pics, isHost)
        }, pics.map(item => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", {
          key: item.value,
          className: "pic-name default-pic-class"
        }, item.label)));
      }

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "plus-icon",
        onClick: () => this.handleOpenDefaultPicPopup(headline, pics, isHost)
      }, "+");
    });

    _defineProperty(this, "handleChangeRemoveCheckboxAll", () => {
      const checked = !this.props.removeOptions.isCheckedAll;
      const dataList = this.props.removeOptions.dataList.map(item => {
        return _objectSpread({}, item);
      });
      dataList.forEach(item => {
        if (item.picList && item.picList.length > 0) {
          item.isRemoved = checked;
        }
      });
      this.props.setRemoveOptions({
        isCheckedAll: checked,
        isDisabledRemove: !checked,
        isHadAll: this.props.removeOptions.isHadAll,
        shouldResetScrollPosition: false,
        dataList
      });
    });

    _defineProperty(this, "handleChangeRemoveCheckbox", index => {
      const dataList = this.props.removeOptions.dataList.map(item => {
        return _objectSpread({}, item);
      });
      dataList[index].isRemoved = !this.props.removeOptions.dataList[index].isRemoved;
      const removeList = dataList.filter(item => item.picList && item.picList.length > 0 && item.isRemoved);
      const notCheckedDataList = dataList.filter(item => item.picList && item.picList.length > 0 && !item.isRemoved);
      this.props.setRemoveOptions({
        isCheckedAll: notCheckedDataList.length <= 0,
        isDisabledRemove: removeList.length <= 0,
        isHadAll: this.props.removeOptions.isHadAll,
        shouldResetScrollPosition: false,
        dataList
      });
    });

    _defineProperty(this, "handleOpenRemovePopup", () => this.props.setRemovePicAssignmentPopup({
      show: true
    }));

    _defineProperty(this, "measureText", (str, fontSize = 13) => {
      const widths1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const widths2 = [0.2796875, 0.2765625, 0.3546875, 0.5546875, 0.5546875, 0.8890625, 0.665625, 0.190625, 0.3328125, 0.3328125, 0.3890625, 0.5828125, 0.2765625];
      const widths3 = [0.3328125, 0.2765625, 0.3015625, 0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.5546875];
      const widths4 = [0.2765625, 0.2765625, 0.584375, 0.5828125, 0.584375, 0.5546875, 1.0140625, 0.665625, 0.665625, 0.721875, 0.721875, 0.665625, 0.609375, 0.7765625];
      const widths5 = [0.721875, 0.2765625, 0.5, 0.665625, 0.5546875, 0.8328125, 0.721875, 0.7765625, 0.665625, 0.7765625, 0.721875, 0.665625, 0.609375, 0.721875, 0.665625];
      const widths6 = [0.94375, 0.665625, 0.665625, 0.609375, 0.2765625, 0.3546875, 0.2765625, 0.4765625, 0.5546875, 0.3328125, 0.5546875, 0.5546875, 0.5, 0.5546875, 0.5546875];
      const widths7 = [0.2765625, 0.5546875, 0.5546875, 0.221875, 0.240625, 0.5, 0.221875, 0.8328125, 0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.3328125];
      const widths8 = [0.5, 0.2765625, 0.5546875, 0.5, 0.721875, 0.5, 0.5, 0.5, 0.3546875, 0.259375, 0.353125, 0.5890625];
      const widths = widths1.concat(widths2).concat(widths3).concat(widths4).concat(widths5).concat(widths6).concat(widths7).concat(widths8);
      const avg = 0.5279276315789471;
      return str.split('').map(c => c.charCodeAt(0) < widths.length ? widths[c.charCodeAt(0)] : avg).reduce((cur, acc) => acc + cur) * fontSize;
    });

    _defineProperty(this, "handleOpenDefaultPicPopup", (headline, pics, isHost) => isHost && this.props.setDefaultPicPopup({
      show: true,
      headline,
      pics
    }));

    _defineProperty(this, "renderTitle", (isRenderCommunication, totalUnassignedDirectAccount) => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: `table-title d-flex justify-content-between ${!isRenderCommunication ? 'header-pic-max-width' : ''}`
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('PICAssignment')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].formatString(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('ThereAreUnassignedDirectAccounts'), totalUnassignedDirectAccount), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "fa fa-file-excel-o ml-3 icon-excel",
        onClick: () => _common_functions__WEBPACK_IMPORTED_MODULE_7__["default"].exportExcel(this.props.gridParams)
      })));
    });
  }

  render() {
    if (!this.props.picAssignmentGridData || !this.props.picAssignmentGridData.data) {
      return null;
    }

    const {
      totalItems,
      totalUnassignedDirectAccount,
      listComm
    } = this.props.picAssignmentGridData;
    const uniqueCommunication = listComm;
    const {
      pageIndex,
      pageSize
    } = this.props.gridParams;
    const isHost = this.props.isHost;
    const isRenderCommunication = this.isHostCommunication();
    const pagingOption = {
      PageIndex: pageIndex,
      PageSize: pageSize,
      TotalItem: totalItems,
      PageList: _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_6__["PAGING_SIZES"]
    };
    let totalWidthComm = 0;
    uniqueCommunication.forEach(item => {
      const maxLengthComm = this.findLongestWordLength(item.settingValue);
      const calWidthCommByPixel = this.measureText(maxLengthComm);

      if (calWidthCommByPixel > 100) {
        totalWidthComm += calWidthCommByPixel + 50;
      } else {
        totalWidthComm += 100;
      }
    });
    const totalAssignmentWidth = 1225;
    const calMaxWidth = totalAssignmentWidth + totalWidthComm;
    const title = this.renderTitle(isRenderCommunication, totalUnassignedDirectAccount);
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "pic-assignment-container"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Table"], {
      maxWidth: isRenderCommunication ? calMaxWidth : 1350,
      shouldUseMaxWidth: true,
      width: isRenderCommunication ? document.getElementById('app-container').clientWidth : 1350,
      autoWidth: false,
      title: title,
      isFixColumn: true,
      header: this.buildPicManagementHeader(isHost, isRenderCommunication, uniqueCommunication),
      body: this.buildPicManagementBody(isHost, isRenderCommunication),
      isPaging: true,
      pageOption: pagingOption,
      onPaging: this.onPaging,
      containerPadding: 0,
      shouldResetScrollPosition: this.props.removeOptions.shouldResetScrollPosition
    }));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    picAssignmentGridData,
    gridParams,
    removeOptions
  } = state;
  return {
    picAssignmentGridData,
    gridParams,
    removeOptions
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(DataGrid));

/***/ }),

/***/ "./www/sources/js/pages/pic-and-headline/pic-assignment/components/DefaultPic.jsx":
/*!****************************************************************************************!*\
  !*** ./www/sources/js/pages/pic-and-headline/pic-assignment/components/DefaultPic.jsx ***!
  \****************************************************************************************/
/*! exports provided: DefaultPic, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DefaultPic", function() { return DefaultPic; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var _jsroot_components_DraggableModalDialog__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/components/DraggableModalDialog */ "./www/sources/js/components/DraggableModalDialog.jsx");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/pic-and-headline/pic-assignment/actions.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var _common_functions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../common.functions */ "./www/sources/js/pages/pic-and-headline/pic-assignment/common.functions.js");
/* harmony import */ var _jsroot_components_ConfirmPopup__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jsroot/components/ConfirmPopup */ "./www/sources/js/components/ConfirmPopup.jsx");
/* harmony import */ var _jsroot_components_CustomReactSelect__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @jsroot/components/CustomReactSelect */ "./www/sources/js/components/CustomReactSelect.jsx");
/* harmony import */ var _jsroot_components_ResponseMessage__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @jsroot/components/ResponseMessage */ "./www/sources/js/components/ResponseMessage.jsx");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }












class DefaultPic extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "componentDidMount", () => {
      const picOptions = this.props.settings.picList.map(item => {
        return {
          value: item.picId,
          label: `${item.username} (${item.roleName})`
        };
      });
      this.setState({
        picOptions
      });

      if (this.props.defaultPicPopup.pics) {
        this.setState({
          pics: this.props.defaultPicPopup.pics,
          oldPics: this.props.defaultPicPopup.pics
        });
      }
    });

    _defineProperty(this, "handlePicChange", pics => this.setState({
      pics
    }));

    _defineProperty(this, "handleCancel", () => {
      if (this.isEqualPicArray(this.state.pics, this.state.oldPics)) {
        this.props.setDefaultPicPopup({
          show: false
        });
      }

      this.toggleConfirmPopup();
    });

    _defineProperty(this, "isEqualPicArray", (firstArray, secondArray) => {
      if (!firstArray) {
        return secondArray.length === 0;
      }

      if (firstArray.length !== secondArray.length) {
        return false;
      }

      for (let index = 0; index < firstArray.length; index++) {
        if (firstArray[index].value !== secondArray[index].value) {
          return false;
        }
      }

      return true;
    });

    _defineProperty(this, "toggleConfirmPopup", () => this.setState({
      isShowConfirmPopup: !this.state.isShowConfirmPopup
    }));

    _defineProperty(this, "handleRemoveDefaultPic", headlineId => {
      this.setState({
        isSubmitting: true
      });
      _common_functions__WEBPACK_IMPORTED_MODULE_7__["default"].removeDefaultPic({
        headlineId
      }, data => this.callback(data, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('RemoveDefaultPICSuccessfully')));
    });

    _defineProperty(this, "callback", (data, defaultMessage) => {
      const {
        isSuccessful,
        message
      } = data;
      this.setState({
        responseMesssage: {
          isSuccessful,
          message: message ? message : defaultMessage,
          show: true
        }
      });

      if (data.isSuccessful) {
        setTimeout(this.refreshGrid, 2000);
      } else {
        this.setState({
          isSubmitting: false
        });
      }
    });

    _defineProperty(this, "refreshGrid", () => {
      this.props.setDefaultPicPopup({
        show: false
      });
      this.props.getGridData(this.props.gridParams, data => _common_functions__WEBPACK_IMPORTED_MODULE_7__["default"].handleNewRemoveOptions(data, this.props.setRemoveOptions));
    });

    _defineProperty(this, "handleSubmitSetDefaultPIC", headlineId => {
      this.setState({
        isSubmitting: true
      });

      if (!this.state.pics) {
        this.setState({
          isSubmitting: false,
          responseMesssage: {
            show: true,
            isSuccessful: false,
            message: _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('DefaultPICRequired')
          }
        });
      } else {
        if (this.state.pics.length === 0) {
          this.setState({
            isSubmitting: false,
            responseMesssage: {
              show: true,
              isSuccessful: false,
              message: _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('DefaultPICRequired')
            }
          });
        } else {
          const params = {
            headlineId,
            defaultPicIDs: this.state.pics.map(item => item.value).toString()
          };
          _common_functions__WEBPACK_IMPORTED_MODULE_7__["default"].setDefaultPic(params, data => this.callback(data, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('SetDefaultPICSuccessfully')));
        }
      }
    });

    _defineProperty(this, "closeAll", () => {
      this.props.setDefaultPicPopup({
        show: false
      });
      this.toggleConfirmPopup();
    });

    this.state = {
      picOptions: [],
      pics: [],
      oldPics: [],
      isShowConfirmPopup: false,
      isSubmitting: false,
      responseMesssage: {
        show: false
      }
    };
  }

  render() {
    const {
      headline,
      pics
    } = this.props.defaultPicPopup;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"], {
      show: true,
      backdrop: "static",
      keyboard: false,
      centered: true,
      onHide: () => this.handleCancel(),
      dialogAs: _jsroot_components_DraggableModalDialog__WEBPACK_IMPORTED_MODULE_2__["default"]
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Header, {
      closeButton: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Title, {
      as: "div"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource(pics && pics.length > 0 ? 'UpdateDefaultPIC' : 'SetDefaultPIC'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Form"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Body, null, this.state.responseMesssage.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_ResponseMessage__WEBPACK_IMPORTED_MODULE_10__["default"], {
      isSuccessful: this.state.responseMesssage.isSuccessful,
      message: this.state.responseMesssage.message
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Form"].Group, {
      as: react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Row"]
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Form"].Label, {
      column: true,
      sm: "4",
      md: "3",
      className: "required"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('GroupHeadline')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Form"].Label, {
      column: true,
      sm: "8",
      md: "9"
    }, headline.name)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Form"].Group, {
      as: react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Row"]
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Form"].Label, {
      column: true,
      sm: "4",
      md: "3",
      className: "required"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('DefaultPIC')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Col"], {
      sm: "8",
      md: "9"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_CustomReactSelect__WEBPACK_IMPORTED_MODULE_9__["default"], {
      isMulti: true,
      onChange: value => this.handlePicChange(value),
      options: this.state.picOptions,
      value: this.state.pics,
      placeholder: _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('PleaseSelect')
    })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Footer, null, this.props.defaultPicPopup.pics && this.props.defaultPicPopup.pics.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Button"], {
      variant: "primary",
      size: "sm",
      disabled: this.state.isSubmitting,
      onClick: () => this.handleRemoveDefaultPic(headline.id)
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('Remove')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Button"], {
      variant: "primary",
      size: "sm",
      disabled: this.state.isSubmitting,
      onClick: () => this.handleSubmitSetDefaultPIC(headline.id)
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('Save')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Button"], {
      variant: "primary",
      size: "sm",
      onClick: () => this.handleCancel()
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('Cancel'))))), this.state.isShowConfirmPopup && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_ConfirmPopup__WEBPACK_IMPORTED_MODULE_8__["default"], {
      size: "lg",
      title: _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('Confirmation'),
      content: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('ThereAreSomeChangesConfirmMessage')),
      onSubmit: () => this.closeAll(),
      onClose: () => this.toggleConfirmPopup()
    }));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_4__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_5__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    settings,
    defaultPicPopup,
    gridParams
  } = state;
  return {
    settings,
    defaultPicPopup,
    gridParams
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_3__["connect"])(mapStateToProps, mapDispatchToProps)(DefaultPic));

/***/ }),

/***/ "./www/sources/js/pages/pic-and-headline/pic-assignment/components/Filter.jsx":
/*!************************************************************************************!*\
  !*** ./www/sources/js/pages/pic-and-headline/pic-assignment/components/Filter.jsx ***!
  \************************************************************************************/
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
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/pic-and-headline/pic-assignment/actions.js");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var _jsroot_components_multiple_select_index__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/components/multiple-select/index */ "./www/sources/js/components/multiple-select/index.jsx");
/* harmony import */ var _common_functions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../common.functions */ "./www/sources/js/pages/pic-and-headline/pic-assignment/common.functions.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/lib/index.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_toastify__WEBPACK_IMPORTED_MODULE_8__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }










class Filter extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "componentDidMount", () => {
      this.props.getSettings().then(() => {
        const siteIds = [];
        const siteOptions = this.props.settings.siteList.map(x => {
          siteIds.push(x.site);
          return {
            id: x.site,
            name: x.site,
            checked: true
          };
        });
        const currencyIds = [];
        const currencyOptions = this.props.settings.currencyList.map(x => {
          currencyIds.push(x.id);
          return {
            id: x.id,
            name: x.name,
            checked: true
          };
        });
        const statusOptions = this.props.settings.statusList.map(x => {
          return {
            id: x,
            name: x,
            checked: true
          };
        });
        const positionIds = [];
        const positionOptions = this.props.settings.positionList.map(x => {
          positionIds.push(x.settingId);
          return {
            id: x.settingId,
            name: x.settingValue,
            checked: true
          };
        });
        this.setState(prevState => ({
          siteOptions,
          currencyOptions,
          statusOptions,
          positionOptions,
          filter: _objectSpread(_objectSpread({}, prevState.filter), {}, {
            site: siteIds.toString(),
            currency: currencyIds.toString(),
            status: this.props.settings.statusList.toString(),
            position: positionIds.toString()
          })
        }));
      });
    });

    _defineProperty(this, "handleFilterChange", (name, value) => this.setState(prevState => ({
      filter: _objectSpread(_objectSpread({}, prevState.filter), {}, {
        [name]: value
      })
    })));

    _defineProperty(this, "handleChange", event => {
      event.persist();
      this.setState(prevState => ({
        filter: _objectSpread(_objectSpread({}, prevState.filter), {}, {
          [event.target.name]: event.target.value
        })
      }));
    });

    _defineProperty(this, "handleCheckBoxChange", event => {
      event.persist();
      this.setState(prevState => ({
        filter: _objectSpread(_objectSpread({}, prevState.filter), {}, {
          [event.target.name]: event.target.checked
        })
      }));
    });

    _defineProperty(this, "handleSiteChange", (currentItem, selectedItemsKey) => this.handleFilterChange('site', selectedItemsKey));

    _defineProperty(this, "handleCurrencyChange", (currentItem, selectedItemsKey) => this.handleFilterChange('currency', selectedItemsKey));

    _defineProperty(this, "handleStatusChange", (currentItem, selectedItemsKey) => this.handleFilterChange('status', selectedItemsKey));

    _defineProperty(this, "handlePositionChange", (currentItem, selectedItemsKey) => this.handleFilterChange('position', selectedItemsKey));

    _defineProperty(this, "renderHeadlineTypeOption", item => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
      key: item.id,
      value: item.id
    }, item.name));

    _defineProperty(this, "getParams", () => {
      const {
        pageIndex,
        pageSize
      } = this.props.gridParams;
      return _objectSpread(_objectSpread({}, this.state.filter), {}, {
        pageIndex,
        pageSize
      });
    });

    _defineProperty(this, "handleSubmit", () => {
      const params = this.getParams();

      if (!this.state.filter.site) {
        react_toastify__WEBPACK_IMPORTED_MODULE_8__["toast"].error(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('PleaseChooseSite'));
        return;
      }

      if (!this.state.filter.currency) {
        react_toastify__WEBPACK_IMPORTED_MODULE_8__["toast"].error(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('PleaseChooseCurrency'));
        return;
      }

      if (!this.state.filter.status) {
        react_toastify__WEBPACK_IMPORTED_MODULE_8__["toast"].error(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('PleaseChooseStatus'));
        return;
      }

      if (!this.state.filter.position) {
        react_toastify__WEBPACK_IMPORTED_MODULE_8__["toast"].error(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('PleaseChoosePosition'));
        return;
      }

      params.pageIndex = 1;
      this.props.setGridParams(params);
      this.props.getGridData(params, data => _common_functions__WEBPACK_IMPORTED_MODULE_7__["default"].handleNewRemoveOptions(data, this.props.setRemoveOptions));
    });

    _defineProperty(this, "handleOpenAssignPicPopup", () => this.props.setAssignPicPopup({
      show: true
    }));

    _defineProperty(this, "handleToggleFilter", value => {
      this.setState({
        showFilter: value
      });
      window.dispatchEvent(new Event('resize'));
    });

    this.state = {
      filter: {
        site: '1',
        currency: '1',
        status: '1',
        headlineType: 2,
        groupHeadline: '',
        picName: '',
        directAccount: '',
        position: '1',
        excludeAssignedAcc: false,
        excludeIgnoredAcc: true,
        excludeIsTest: true
      },
      siteOptions: [],
      currencyOptions: [],
      statusOptions: [],
      positionOptions: [],
      showFilter: true
    };
  }

  render() {
    const {
      isHost
    } = this.props;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"], {
      className: "form-filter",
      onSubmit: this.handleSubmit
    }, this.state.showFilter && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Row, {
      bsPrefix: "form-row"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, null, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Site')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "form-control-wrapper"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_multiple_select_index__WEBPACK_IMPORTED_MODULE_6__["default"], {
      dataSource: this.state.siteOptions,
      keyField: "id",
      valueField: "name",
      statusField: "checked",
      isSummited: false,
      isAllTextShown: true,
      onChange: (currentItem, selectedItemsKey) => this.handleSiteChange(currentItem, selectedItemsKey)
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, null, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Currency')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "form-control-wrapper"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_multiple_select_index__WEBPACK_IMPORTED_MODULE_6__["default"], {
      dataSource: this.state.currencyOptions,
      keyField: "id",
      valueField: "name",
      statusField: "checked",
      isSummited: false,
      isAllTextShown: true,
      onChange: (currentItem, selectedItemsKey) => this.handleCurrencyChange(currentItem, selectedItemsKey)
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, null, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Status')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "form-control-wrapper"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_multiple_select_index__WEBPACK_IMPORTED_MODULE_6__["default"], {
      dataSource: this.state.statusOptions,
      keyField: "id",
      valueField: "name",
      statusField: "checked",
      isSummited: false,
      isAllTextShown: true,
      onChange: (currentItem, selectedItemsKey) => this.handleStatusChange(currentItem, selectedItemsKey)
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, null, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('HeadlineType')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Control, {
      as: "select",
      size: "sm",
      className: "shadow-none",
      name: "headlineType",
      value: this.state.filter.headlineType,
      onChange: this.handleChange
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
      value: 2
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('All')), this.props.settings && this.props.settings.headlineTypeList && this.props.settings.headlineTypeList.map(this.renderHeadlineTypeOption)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Row, {
      bsPrefix: "form-row"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, null, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('GroupHeadline')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Control, {
      as: "input",
      size: "sm",
      className: "shadow-none",
      name: "groupHeadline",
      value: this.state.filter.groupHeadline,
      onChange: this.handleChange
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, null, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('PIC')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Control, {
      as: "input",
      size: "sm",
      className: "shadow-none",
      name: "picName",
      value: this.state.filter.picName,
      onChange: this.handleChange
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, null, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('DirectAccount')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Control, {
      as: "input",
      size: "sm",
      className: "shadow-none",
      name: "directAccount",
      value: this.state.filter.directAccount,
      onChange: this.handleChange
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, null, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Position')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "form-control-wrapper"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_multiple_select_index__WEBPACK_IMPORTED_MODULE_6__["default"], {
      dataSource: this.state.positionOptions,
      keyField: "id",
      valueField: "name",
      statusField: "checked",
      isSummited: false,
      isAllTextShown: true,
      onChange: (currentItem, selectedItemsKey) => this.handlePositionChange(currentItem, selectedItemsKey)
    })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Row, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "filter-checkbox"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      type: "checkbox",
      className: "shadow-none",
      name: "excludeAssignedAcc",
      checked: this.state.filter.excludeAssignedAcc,
      onChange: this.handleCheckBoxChange
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "filter-checkbox-text"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('OnlyShowUnassignedDirectAccounts')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      type: "checkbox",
      className: "shadow-none",
      name: "excludeIgnoredAcc",
      checked: this.state.filter.excludeIgnoredAcc,
      onChange: this.handleCheckBoxChange
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "filter-checkbox-text"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('ExcludeIgnoredAccounts')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      type: "checkbox",
      className: "shadow-none",
      name: "excludeIsTest",
      checked: this.state.filter.excludeIsTest,
      onChange: this.handleCheckBoxChange
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "filter-checkbox-text"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('ExcludeTestAccounts')))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Row, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "button-row"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], {
      className: "mr-4",
      variant: "primary",
      size: "sm",
      onClick: this.handleSubmit
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Submit')), isHost && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], {
      className: "mr-2",
      variant: "primary",
      size: "sm",
      onClick: this.handleOpenAssignPicPopup
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('AssignPIC'))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "filter-collapse text-center"
    }, this.state.showFilter ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "fa fa-caret-up fa-sm",
      onClick: () => this.handleToggleFilter(false)
    }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "fa fa-caret-down fa-sm",
      onClick: () => this.handleToggleFilter(true)
    })));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_4__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    settings,
    gridParams
  } = state;
  return {
    settings,
    gridParams
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(Filter));

/***/ }),

/***/ "./www/sources/js/pages/pic-and-headline/pic-assignment/components/RemovePicAssignment.jsx":
/*!*************************************************************************************************!*\
  !*** ./www/sources/js/pages/pic-and-headline/pic-assignment/components/RemovePicAssignment.jsx ***!
  \*************************************************************************************************/
/*! exports provided: RemovePicAssignment, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RemovePicAssignment", function() { return RemovePicAssignment; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var _jsroot_components_DraggableModalDialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/components/DraggableModalDialog */ "./www/sources/js/components/DraggableModalDialog.jsx");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/pic-and-headline/pic-assignment/actions.js");
/* harmony import */ var _jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/components/react-grid/index */ "./www/sources/js/components/react-grid/index.jsx");
/* harmony import */ var _jsroot_components_ConfirmPopup__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jsroot/components/ConfirmPopup */ "./www/sources/js/components/ConfirmPopup.jsx");
/* harmony import */ var _common_functions__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../common.functions */ "./www/sources/js/pages/pic-and-headline/pic-assignment/common.functions.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }











class RemovePicAssignment extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "componentDidMount", () => {
      const dataList = this.props.removeOptions.dataList.filter(item => item.isRemoved);
      const picNames = [];
      const picIds = [];

      for (let index = 0; index < dataList.length; index++) {
        const rowItem = dataList[index];

        if (rowItem.picList && rowItem.picList.length > 0) {
          this.pushPics(rowItem, picNames, picIds);
        }
      }

      const checkedAllList = picNames.map(() => true);
      const matrix = dataList.map((row, rowNumber) => {
        const picIdsRow = dataList[rowNumber].picList.map(item => item.picId);
        return checkedAllList.map((item, colNumber) => {
          if (picIdsRow.includes(picIds[colNumber])) {
            return true;
          }

          return null;
        });
      });
      this.setState({
        picIds,
        picNames,
        checkedAllList: [...checkedAllList],
        matrix,
        dataList
      });
    });

    _defineProperty(this, "pushPics", (item, picNames, picIds) => {
      for (let picIndex = 0; picIndex < item.picList.length; picIndex++) {
        const name = item.picList[picIndex].picName;

        if (!picNames.includes(name)) {
          picNames.push(name);
          picIds.push(item.picList[picIndex].picId);
        }
      }
    });

    _defineProperty(this, "buildHeader", () => {
      let cells = [{
        key: 'TextNo',
        rowSpan: 2,
        colWidth: 50,
        value: _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getResource('TextNo')
      }, {
        key: 'GroupHeadline',
        rowSpan: 2,
        colWidth: 120,
        value: _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getResource('GroupHeadline')
      }, {
        key: 'DirectAccount',
        rowSpan: 2,
        colWidth: 120,
        value: _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getResource('DirectAccount')
      }];
      const picCells = this.state.picNames.map(item => {
        return {
          key: item,
          rowSpan: 1,
          colWidth: 80,
          value: item
        };
      });

      if (this.state.picNames.length > 0) {
        cells = [...cells, ...picCells];
      }

      return [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["HeaderRow"], {
        key: 0
      }, cells.map(item => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["HeaderCell"], {
        key: item.key,
        rowSpan: item.rowSpan,
        colWidth: item.colWidth
      }, item.value))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["HeaderRow"], {
        key: 1
      }, picCells.map((item, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["HeaderCell"], {
        key: item.key,
        rowSpan: item.rowSpan,
        colWidth: item.colWidth
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        type: "checkbox",
        checked: this.state.checkedAllList[index],
        onChange: () => this.handleChangeCheckAll(index)
      }))))];
    });

    _defineProperty(this, "buildBody", () => {
      const picColNumer = this.state.picNames.length;
      const defaultColNumber = 3;
      const dataList = this.props.removeOptions.dataList.filter(item => item.isRemoved);

      if (dataList.length > 0) {
        const body = [];
        let mergeHeadline = 0;

        for (let index = 0; index < dataList.length; index++) {
          const rowData = dataList[index];
          let row;

          if (mergeHeadline === 0) {
            mergeHeadline = dataList.filter(item => item.headlineID === rowData.headlineID).length;
            row = this.renderRow(index, rowData, mergeHeadline);
          } else {
            row = this.renderRow(index, rowData);
          }

          body.push(row);
          mergeHeadline--;
        }

        return body;
      }

      return [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["Row"], {
        key: `body${1}`,
        className: "no-data"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["Cell"], {
        colSpan: defaultColNumber + picColNumer
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getResource('ThereIsNoData')))];
    });

    _defineProperty(this, "renderRow", (index, row, mergeHeadline) => {
      let cells = [{
        value: index + 1
      }, {
        value: row.custName
      }];

      if (mergeHeadline) {
        cells.splice(1, 0, {
          value: row.headlineName
        });
      }

      const picNames = row.picList.map(item => item.picName);
      const picCells = this.state.picNames.map((item, picIndex) => {
        if (picNames.includes(item)) {
          return {
            value: {
              rowNumber: index,
              colNumber: picIndex
            }
          };
        }

        return {
          value: ''
        };
      });
      cells = [...cells, ...picCells];
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["Row"], {
        key: index
      }, cells.map((cell, cellIndex) => this.renderCell(cell, cellIndex, mergeHeadline)));
    });

    _defineProperty(this, "renderCell", (cell, index, mergeHeadline) => {
      if (mergeHeadline && index === 1) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["OverlayTrigger"], {
          key: index,
          placement: "top",
          overlay: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Tooltip"], null, `${_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getResource('GroupHeadline')}: ${cell.value}`)
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["Cell"], {
          rowSpan: mergeHeadline
        }, cell.value));
      }

      if (typeof cell.value === 'object') {
        const {
          rowNumber,
          colNumber
        } = cell.value;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["Cell"], {
          key: index,
          className: "text-center"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
          type: "checkbox",
          className: "cursor-pointer",
          checked: this.state.matrix[rowNumber][colNumber],
          onChange: () => this.handleChange(rowNumber, colNumber)
        }));
      }

      let className = '';

      if (index === 0) {
        className += 'text-center';
      }

      if (cell.value === '') {
        className += 'null-cell-color';
      }

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["Cell"], {
        key: index,
        className: className
      }, cell.value);
    });

    _defineProperty(this, "handleChange", (rowNumber, colNumber) => {
      const matrix = [...this.state.matrix];
      matrix[rowNumber][colNumber] = !matrix[rowNumber][colNumber];
      const checkedAllList = [...this.state.checkedAllList];
      checkedAllList[colNumber] = this.isCheckedAll(colNumber);
      this.setState({
        matrix,
        checkedAllList
      });
    });

    _defineProperty(this, "handleChangeCheckAll", colNumber => {
      const isChecked = !this.state.checkedAllList[colNumber];
      const checkedAllList = [...this.state.checkedAllList];
      checkedAllList[colNumber] = isChecked;
      const matrix = [...this.state.matrix];

      for (let rowNumber = 0; rowNumber < this.state.matrix.length; rowNumber++) {
        if (matrix[rowNumber][colNumber] !== null) {
          matrix[rowNumber][colNumber] = isChecked;
        }
      }

      this.setState({
        checkedAllList,
        matrix
      });
    });

    _defineProperty(this, "isCheckedAll", colNumber => {
      for (let index = 0; index < this.state.matrix.length; index++) {
        if (!this.state.matrix[index][colNumber]) {
          return false;
        }
      }

      return true;
    });

    _defineProperty(this, "toggleConfirmRemovePopup", () => this.setState({
      isShowConfirmRemovePopup: !this.state.isShowConfirmRemovePopup
    }));

    _defineProperty(this, "handleSubmitRemoveAssignment", () => {
      this.toggleConfirmRemovePopup();
      this.props.onClose();
      const isCheckedPics = this.state.picNames.filter((item, index) => this.isChecked(index));
      const removeAssignments = [];

      for (let rowNumber = 0; rowNumber < this.state.matrix.length; rowNumber++) {
        const rowData = this.state.dataList[rowNumber];

        for (let colNumber = 0; colNumber < this.state.picIds.length; colNumber++) {
          if (this.state.matrix[rowNumber][colNumber]) {
            removeAssignments.push({
              headlineId: rowData.headlineID,
              custId: rowData.custId,
              picId: this.state.picIds[colNumber]
            });
          }
        }
      }

      _common_functions__WEBPACK_IMPORTED_MODULE_9__["default"].removePicAssignment(removeAssignments, isCheckedPics.toString(), this.refreshGrid);
    });

    _defineProperty(this, "refreshGrid", () => this.props.getGridData(this.props.gridParams, data => _common_functions__WEBPACK_IMPORTED_MODULE_9__["default"].handleNewRemoveOptions(data, this.props.setRemoveOptions)));

    _defineProperty(this, "isChecked", colNumber => {
      for (let index = 0; index < this.state.matrix.length; index++) {
        if (this.state.matrix[index][colNumber]) {
          return true;
        }
      }

      return false;
    });

    _defineProperty(this, "isNotHadChecked", () => {
      for (let rowNumber = 0; rowNumber < this.state.matrix.length; rowNumber++) {
        for (let colNumber = 0; colNumber < this.state.picIds.length; colNumber++) {
          if (this.state.matrix[rowNumber][colNumber]) {
            return false;
          }
        }
      }

      return true;
    });

    this.state = {
      picIds: [],
      picNames: [],
      checkedAllList: [],
      matrix: [],
      isShowConfirmRemovePopup: false,
      dataList: []
    };
  }

  render() {
    const maxWidth = this.state.picNames.length * 80 + 500;
    const {
      onClose
    } = this.props;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"], {
      show: true,
      backdrop: "static",
      keyboard: false,
      size: "lg",
      centered: true,
      onHide: () => onClose(),
      dialogAs: _jsroot_components_DraggableModalDialog__WEBPACK_IMPORTED_MODULE_3__["default"]
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Header, {
      closeButton: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Title, {
      as: "div"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getResource('RemovePICAssignment'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Body, {
      className: "remove-pic-body"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_7__["Table"], {
      maxWidth: maxWidth,
      bodyHeight: 500,
      autoWidth: true,
      autoHeight: false,
      header: this.buildHeader(),
      body: this.buildBody(),
      containerPadding: 0,
      shouldResetScrollPosition: false
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Modal"].Footer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
      onClick: () => this.toggleConfirmRemovePopup(),
      variant: "primary",
      size: "sm",
      disabled: this.isNotHadChecked()
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getResource('Remove')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
      onClick: () => onClose(),
      variant: "primary",
      size: "sm"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getResource('Close')))), this.state.isShowConfirmRemovePopup && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_ConfirmPopup__WEBPACK_IMPORTED_MODULE_8__["default"], {
      onSubmit: () => this.handleSubmitRemoveAssignment(),
      onClose: () => this.toggleConfirmRemovePopup(),
      title: _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getResource('Confirmation'),
      content: _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getResource('ConfirmRemoveDirectAccounts')
    }));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_5__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_6__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    removeOptions,
    gridParams
  } = state;
  return {
    removeOptions,
    gridParams
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["connect"])(mapStateToProps, mapDispatchToProps)(RemovePicAssignment));

/***/ }),

/***/ "./www/sources/js/pages/pic-and-headline/pic-assignment/index.js":
/*!***********************************************************************!*\
  !*** ./www/sources/js/pages/pic-and-headline/pic-assignment/index.js ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return index; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @reduxjs/toolkit */ "./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");
/* harmony import */ var _picAssignmentSlice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./picAssignmentSlice */ "./www/sources/js/pages/pic-and-headline/pic-assignment/picAssignmentSlice.js");
/* harmony import */ var _components_AppContainer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/AppContainer */ "./www/sources/js/pages/pic-and-headline/pic-assignment/components/AppContainer.jsx");
/* harmony import */ var _cssroot_pages_pic_and_headline_pic_assignment_index_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @cssroot/pages/pic-and-headline/pic-assignment/index.scss */ "./www/sources/css/pages/pic-and-headline/pic-assignment/index.scss");
/* harmony import */ var _cssroot_pages_pic_and_headline_pic_assignment_index_scss__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_cssroot_pages_pic_and_headline_pic_assignment_index_scss__WEBPACK_IMPORTED_MODULE_5__);






const store = Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__["configureStore"])({
  reducer: _picAssignmentSlice__WEBPACK_IMPORTED_MODULE_3__["default"]
});
class index extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_1__["Provider"], {
      store: store
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "pic-assignment"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_AppContainer__WEBPACK_IMPORTED_MODULE_4__["default"], null)));
  }

}

/***/ }),

/***/ "./www/sources/js/pages/pic-and-headline/pic-assignment/picAssignmentSlice.js":
/*!************************************************************************************!*\
  !*** ./www/sources/js/pages/pic-and-headline/pic-assignment/picAssignmentSlice.js ***!
  \************************************************************************************/
/*! exports provided: resetState, setGridParams, setGridData, setSettings, setRemoveOptions, setRemovePicAssignmentPopup, setAssignPicPopup, setAssignPicResult, setAssignPicFilter, setValidateAssignPicResult, setConfirmAssignedDirectAccountPopup, setDefaultPicPopup, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetState", function() { return resetState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setGridParams", function() { return setGridParams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setGridData", function() { return setGridData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSettings", function() { return setSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setRemoveOptions", function() { return setRemoveOptions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setRemovePicAssignmentPopup", function() { return setRemovePicAssignmentPopup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setAssignPicPopup", function() { return setAssignPicPopup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setAssignPicResult", function() { return setAssignPicResult; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setAssignPicFilter", function() { return setAssignPicFilter; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setValidateAssignPicResult", function() { return setValidateAssignPicResult; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setConfirmAssignedDirectAccountPopup", function() { return setConfirmAssignedDirectAccountPopup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setDefaultPicPopup", function() { return setDefaultPicPopup; });
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @reduxjs/toolkit */ "./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");
/* harmony import */ var _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/common/constants */ "./www/sources/js/common/constants.js");


const initialState = {
  gridParams: {
    pageIndex: 1,
    pageSize: _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_1__["DefaultPageSize"]
  },
  picAssignmentGridData: {},
  setting: {},
  removeOptions: {
    isCheckedAll: false,
    isDisabledRemove: true,
    isHadAll: false,
    shouldResetScrollPosition: true,
    dataList: []
  },
  removePicAssignmentPopup: {
    show: false
  },
  assignPicPopup: {
    show: false
  },
  assignPicResult: {
    show: false
  },
  assignPicFilter: {
    headline: null,
    pics: [],
    directAccount: [],
    isSelectedAll: false
  },
  validateAssignPicResult: {},
  confirmAssignedDirectAccountPopup: {
    show: false
  },
  defaultPicPopup: {
    show: false
  }
};
const picAssignmentSlice = Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__["createSlice"])({
  name: 'picAssignment',
  initialState: initialState,
  reducers: {
    resetState: () => initialState,
    setGridParams: (state, action) => {
      state.gridParams = action.payload;
    },
    setGridData: (state, action) => {
      state.picAssignmentGridData = action.payload;
    },
    setSettings: (state, action) => {
      state.settings = action.payload;
    },
    setRemoveOptions: (state, action) => {
      state.removeOptions = action.payload;
    },
    setRemovePicAssignmentPopup: (state, action) => {
      state.removePicAssignmentPopup = action.payload;
    },
    setAssignPicPopup: (state, action) => {
      state.assignPicPopup = action.payload;
    },
    setAssignPicResult: (state, action) => {
      state.assignPicResult = action.payload;
    },
    setAssignPicFilter: (state, action) => {
      state.assignPicFilter = action.payload;
    },
    setValidateAssignPicResult: (state, action) => {
      state.validateAssignPicResult = action.payload;
    },
    setConfirmAssignedDirectAccountPopup: (state, action) => {
      state.confirmAssignedDirectAccountPopup = action.payload;
    },
    setDefaultPicPopup: (state, action) => {
      state.defaultPicPopup = action.payload;
    }
  }
});
const {
  actions,
  reducer
} = picAssignmentSlice;
const {
  resetState,
  setGridParams,
  setGridData,
  setSettings,
  setRemoveOptions,
  setRemovePicAssignmentPopup,
  setAssignPicPopup,
  setAssignPicResult,
  setAssignPicFilter,
  setValidateAssignPicResult,
  setConfirmAssignedDirectAccountPopup,
  setDefaultPicPopup
} = actions;
/* harmony default export */ __webpack_exports__["default"] = (reducer);

/***/ })

}]);
//# sourceMappingURL=3.chunk.js.map