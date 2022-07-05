(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[14],{

/***/ "./www/sources/css/pages/feedback/multiple-logs/create.scss":
/*!******************************************************************!*\
  !*** ./www/sources/css/pages/feedback/multiple-logs/create.scss ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./www/sources/js/pages/feedback/multiple-logs/create/actions.js":
/*!***********************************************************************!*\
  !*** ./www/sources/js/pages/feedback/multiple-logs/create/actions.js ***!
  \***********************************************************************/
/*! exports provided: ActionCreators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionCreators", function() { return ActionCreators; });
/* harmony import */ var _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/common/site */ "./www/sources/js/common/site.js");
/* harmony import */ var _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/common/dataService */ "./www/sources/js/common/dataService.js");
/* harmony import */ var _createMultipleLogSlice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./createMultipleLogSlice */ "./www/sources/js/pages/feedback/multiple-logs/create/createMultipleLogSlice.js");




const getSettings = () => async dispatch => {
  _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].blockUI();
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl('MultipleLogs/GetSettings');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__["default"].getDataAsync(url).then(response => {
    dispatch(Object(_createMultipleLogSlice__WEBPACK_IMPORTED_MODULE_2__["setSettings"])(response.data));
  }).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].unblockUI());
};

const verifyCustomers = params => async () => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl('MultipleLogs/VerifyCustomer');
  return await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__["default"].postDataAsync(url, params).then(response => response);
};

const verifyRelatedCustomers = params => async () => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl('MultipleLogs/VerifyRelatedCustomer');
  return await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__["default"].postDataAsync(url, params).then(response => response);
};

const getFeedbackSubjectTemplates = subject => async dispatch => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl('Common/GetFeedbackSubjectTemplate');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__["default"].getDataAsync(url, {
    subject
  }).then(response => {
    dispatch(Object(_createMultipleLogSlice__WEBPACK_IMPORTED_MODULE_2__["setFeedbackSubjectTemplates"])(response.data));
  });
};

const checkNotExistCommunicationToolSetting = params => async () => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl('MultipleLogs/CheckNotExistCommunicationToolSetting');
  return await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__["default"].postDataAsync(url, params).then(response => response);
};

const createMultipleLogs = params => async () => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl('MultipleLogs/Create');
  return await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__["default"].postDataAsync(url, params).then(response => response);
};

const ActionCreators = {
  resetState: _createMultipleLogSlice__WEBPACK_IMPORTED_MODULE_2__["resetState"],
  setVerifyCustomerResults: _createMultipleLogSlice__WEBPACK_IMPORTED_MODULE_2__["setVerifyCustomerResults"],
  setReVerifyCustomerResults: _createMultipleLogSlice__WEBPACK_IMPORTED_MODULE_2__["setReVerifyCustomerResults"],
  setAddRelatedCustomerDialog: _createMultipleLogSlice__WEBPACK_IMPORTED_MODULE_2__["setAddRelatedCustomerDialog"],
  setRelatedCustomerResults: _createMultipleLogSlice__WEBPACK_IMPORTED_MODULE_2__["setRelatedCustomerResults"],
  setFeedbackSubjectTemplates: _createMultipleLogSlice__WEBPACK_IMPORTED_MODULE_2__["setFeedbackSubjectTemplates"],
  setViewRelatedCustomerDialog: _createMultipleLogSlice__WEBPACK_IMPORTED_MODULE_2__["setViewRelatedCustomerDialog"],
  setSettings: _createMultipleLogSlice__WEBPACK_IMPORTED_MODULE_2__["setSettings"],
  getSettings,
  verifyCustomers,
  verifyRelatedCustomers,
  removeCustomer: _createMultipleLogSlice__WEBPACK_IMPORTED_MODULE_2__["removeCustomer"],
  getFeedbackSubjectTemplates,
  checkNotExistCommunicationToolSetting,
  setConfirmCreateMultipleLogsDialog: _createMultipleLogSlice__WEBPACK_IMPORTED_MODULE_2__["setConfirmCreateMultipleLogsDialog"],
  createMultipleLogs
};

/***/ }),

/***/ "./www/sources/js/pages/feedback/multiple-logs/create/components/AddRelatedCustomerDialog.jsx":
/*!****************************************************************************************************!*\
  !*** ./www/sources/js/pages/feedback/multiple-logs/create/components/AddRelatedCustomerDialog.jsx ***!
  \****************************************************************************************************/
/*! exports provided: AddRelatedCustomerDialog, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AddRelatedCustomerDialog", function() { return AddRelatedCustomerDialog; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/feedback/multiple-logs/create/actions.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var _RelatedCustomerGrid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./RelatedCustomerGrid */ "./www/sources/js/pages/feedback/multiple-logs/create/components/RelatedCustomerGrid.jsx");
/* harmony import */ var _jsroot_components_DraggableModalDialog__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/components/DraggableModalDialog */ "./www/sources/js/components/DraggableModalDialog.jsx");
/* harmony import */ var _jsroot_common_site__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/common/site */ "./www/sources/js/common/site.js");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }










class AddRelatedCustomerDialog extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "renderRelatedCustomerItem", (customer, index) => {
      let className = 'related-customer-item';

      if (!customer.isValid) {
        className += ' invalid';
      }

      if (this.state.isSelectedAll) {
        className += ' selected';
      }

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        key: index,
        className: className
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, customer.username), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "fa fa-times ml-2",
        onClick: () => this.removeRelatedCustomerItem(customer)
      }));
    });

    _defineProperty(this, "addRelatedCustomerItem", username => {
      const MAX_CHARS = 30;
      const relatedCustomers = [...this.state.relatedCustomers];
      const totalItems = relatedCustomers.length;

      if (username !== undefined && username !== '' && totalItems < this.maximumRelatedCustomers) {
        username = username.length > MAX_CHARS ? username.substring(0, MAX_CHARS) + '...' : username;
        this.setState(prevState => {
          return {
            relatedCustomers: [...prevState.relatedCustomers, {
              index: totalItems + 1,
              username,
              isValid: true
            }]
          };
        });
      }

      setTimeout(() => this.inputRef.value = '', 10);
    });

    _defineProperty(this, "removeRelatedCustomerItem", customer => {
      const relatedCustomers = [...this.state.relatedCustomers];
      let errMsgs = [...this.state.errMsgs];
      const index = relatedCustomers.indexOf(customer);

      if (index > -1) {
        relatedCustomers.splice(index, 1);
      }

      if (relatedCustomers.length === 0) {
        errMsgs = [];
      }

      this.setState({
        relatedCustomers,
        errMsgs
      });
    });

    _defineProperty(this, "handleClearRelatedCustomerInput", () => {
      if (this.inputRef.value === '') {
        let {
          relatedCustomers,
          isSelectedAll,
          errMsgs
        } = this.state;

        if (isSelectedAll) {
          relatedCustomers = [];
          isSelectedAll = false;
        } else {
          relatedCustomers.pop();
        }

        if (relatedCustomers.length === 0) {
          errMsgs = [];
        }

        this.setState({
          relatedCustomers,
          isSelectedAll,
          errMsgs
        });
      }
    });

    _defineProperty(this, "handleKeyDownRelatedCustomer", event => {
      // ctrl + a
      if (event.ctrlKey && event.keyCode === 65 && this.inputRef.value === '') {
        this.setState({
          isSelectedAll: true
        });
        return;
      }

      switch (event.keyCode) {
        case 8:
          // backspace
          this.handleClearRelatedCustomerInput();
          break;

        case 13: // enter

        case 32: // space

        case 188:
          // semicolon
          event.preventDefault();
          this.inputRef.value = this.inputRef.value.replace(',', '');
          this.addRelatedCustomerItem(this.inputRef.value);
          break;

        default:
          break;
      }
    });

    _defineProperty(this, "handlePasteRelatedCustomer", event => {
      const items = (event.clipboardData || window.clipboardData).getData('text/plain').replace(/ /g, ',').replace(/\r\n/g, ',').replace(/\n/g, ',').replace(/\t/g, ',').split(',').filter(item => item !== '');
      const totalItems = this.state.relatedCustomers.length + items.length;
      const errMsgs = [];

      if (totalItems > this.maximumRelatedCustomers) {
        errMsgs.push(`You are not allowed to input over ${this.maximumRelatedCustomers} usernames. Please check it!`);
        setTimeout(() => this.inputRef.value = '', 10);
        this.setState({
          errMsgs
        });
        return;
      }

      items.forEach(item => {
        this.addRelatedCustomerItem(item);
      });
    });

    _defineProperty(this, "handleBlurRelatedCustomer", () => {
      this.setState({
        isSelectedAll: false
      });
      this.addRelatedCustomerItem(this.inputRef.value);
    });

    _defineProperty(this, "handleCloseAddRelatedCustomerDialog", () => {
      this.props.setRelatedCustomerResults([...this.props.addRelatedCustomerDialog.relatedCustomerResults]);
      this.props.setAddRelatedCustomerDialog({
        show: false
      });
    });

    _defineProperty(this, "getErrMsgs", (errMsgs, data) => {
      let invalidRelatedCustomers = data.filter(item => item.resultTypeId === 1);

      if (invalidRelatedCustomers.length > 0) {
        errMsgs.push('Invalid usernames: ' + invalidRelatedCustomers.map(x => x.username).join(', '));
      }

      invalidRelatedCustomers = data.filter(item => item.resultTypeId === 2 || item.resultTypeId === 3);

      if (invalidRelatedCustomers.length > 0) {
        errMsgs.push('The system does not support to add related customer for deposit and guest customer. Please check usernames: ' + invalidRelatedCustomers.map(x => x.username).join(', '));
      }

      invalidRelatedCustomers = data.filter(item => item.resultTypeId === 4);

      if (invalidRelatedCustomers.length > 0) {
        errMsgs.push('These usernames do not belong to any headline or direct accounts without group headline: ' + invalidRelatedCustomers.map(x => x.username).join(', '));
      }

      invalidRelatedCustomers = data.filter(item => item.resultTypeId === 5);

      if (invalidRelatedCustomers.length > 0) {
        errMsgs.push('You are not allowed to add related customers for itself. Please check usernames: ' + invalidRelatedCustomers.map(x => x.username).join(', '));
      }

      invalidRelatedCustomers = data.filter(item => item.resultTypeId === 6);

      if (invalidRelatedCustomers.length > 0) {
        errMsgs.push('The system does not support to add related customer for internal accounts. Please check usernames: ' + invalidRelatedCustomers.map(x => x.username).join(', '));
      }

      return errMsgs;
    });

    _defineProperty(this, "verifyRelatedCustomers", () => {
      const errMsgs = [];
      this.setState({
        verified: true
      });

      if (this.state.relatedCustomers.length === 0 && !this.props.addRelatedCustomerDialog.isEdit) {
        errMsgs.push(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].formatString(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('FieldRequired'), _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('Username')));
        this.setState({
          errMsgs
        });
        return;
      }

      const headlines = this.props.verifyCustomerResults.filter(item => item.isHeadline || item.isDirectAccount),
            headlineIds = headlines.map(x => x.custId).join(','),
            username = this.state.relatedCustomers.map(x => x.username).filter((value, index, self) => self.indexOf(value) === index).join(',');
      _jsroot_common_site__WEBPACK_IMPORTED_MODULE_7__["default"].blockUI();
      this.props.verifyRelatedCustomers({
        headlineIds,
        username
      }).then(response => {
        const relatedCustomers = [...this.state.relatedCustomers].map(item => {
          const index = response.data.findIndex(x => x.username.toLowerCase() === item.username.toLowerCase() && x.resultTypeId > 0);
          return _objectSpread(_objectSpread({}, item), {}, {
            isValid: index > -1 ? false : true
          });
        });
        let relatedCustomerResults = headlines.map(item => {
          return _objectSpread(_objectSpread({}, item), {}, {
            relatedCustomers: response.data.filter(x => x.headlineId === item.custId)
          });
        });
        errMsgs.push(this.getErrMsgs(errMsgs, response.data));

        if (errMsgs.length > 0) {
          relatedCustomerResults = [];
        }

        this.setState({
          relatedCustomers,
          errMsgs
        });
        this.props.setRelatedCustomerResults(relatedCustomerResults);
        _jsroot_common_site__WEBPACK_IMPORTED_MODULE_7__["default"].unblockUI();
      });
    });

    _defineProperty(this, "handleSubmit", () => {
      this.props.setAddRelatedCustomerDialog({
        show: false
      });
    });

    this.state = {
      verified: false,
      relatedCustomers: [...this.props.addRelatedCustomerDialog.relatedCustomers],
      isSelectedAll: false,
      errMsgs: []
    };
    this.maximumRelatedCustomers = 10000;
  }

  render() {
    const {
      relatedCustomers,
      errMsgs,
      verified
    } = this.state;
    const {
      addRelatedCustomerDialog,
      relatedCustomerResults
    } = this.props;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"], {
      show: true,
      className: "add-related-customer-modal-dialog",
      dialogAs: _jsroot_components_DraggableModalDialog__WEBPACK_IMPORTED_MODULE_6__["default"],
      backdrop: "static",
      keyboard: false,
      size: "lg",
      centered: true,
      onHide: this.handleCloseAddRelatedCustomerDialog
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Header, {
      closeButton: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Title, {
      as: "div"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource(addRelatedCustomerDialog.isEdit ? 'UpdateRelatedCustomers' : 'AddRelatedCustomers'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"], {
      noValidate: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Body, null, errMsgs.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Alert"], {
      variant: "danger"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
      className: "list-message-error"
    }, errMsgs.map((message, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      key: index
    }, message)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
      as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
      column: true,
      sm: "3",
      md: "3",
      className: addRelatedCustomerDialog.isEdit ? '' : 'required'
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('Username')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
      sm: "3",
      md: "9"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "related-customer-container",
      onClick: () => this.inputRef.focus()
    }, relatedCustomers.map(this.renderRelatedCustomerItem), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      ref: input => this.inputRef = input,
      type: "text",
      onKeyDown: this.handleKeyDownRelatedCustomer,
      onPaste: this.handlePasteRelatedCustomer,
      onBlur: this.handleBlurRelatedCustomer
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "maximum-related-customer"
    }, "Maximum usernames: ", this.maximumRelatedCustomers - relatedCustomers.length))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
      as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
      className: "text-right"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], {
      variant: "primary",
      size: "sm",
      onClick: this.verifyRelatedCustomers
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('Verify')))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
      as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_RelatedCustomerGrid__WEBPACK_IMPORTED_MODULE_5__["default"], null)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Footer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], {
      variant: "primary",
      size: "sm",
      onClick: this.handleSubmit,
      disabled: relatedCustomerResults.length === 0 || !verified
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('Save')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], {
      variant: "primary",
      size: "sm",
      onClick: this.handleCloseAddRelatedCustomerDialog
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('Cancel')))));
  }

}

_defineProperty(AddRelatedCustomerDialog, "defaultProps", {
  addRelatedCustomerDialog: {
    isEdit: false,
    relatedCustomers: []
  },
  relatedCustomerResults: []
});

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    verifyCustomerResults,
    addRelatedCustomerDialog,
    relatedCustomerResults
  } = state;
  return {
    verifyCustomerResults,
    addRelatedCustomerDialog,
    relatedCustomerResults
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(AddRelatedCustomerDialog));

/***/ }),

/***/ "./www/sources/js/pages/feedback/multiple-logs/create/components/AppContainer.jsx":
/*!****************************************************************************************!*\
  !*** ./www/sources/js/pages/feedback/multiple-logs/create/components/AppContainer.jsx ***!
  \****************************************************************************************/
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
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/feedback/multiple-logs/create/actions.js");
/* harmony import */ var _CreateForm__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./CreateForm */ "./www/sources/js/pages/feedback/multiple-logs/create/components/CreateForm.jsx");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







class AppContainer extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  componentDidMount() {
    this.props.getSettings();
  }

  componentWillUnmount() {
    this.props.resetState();
  }

  render() {
    const {
      settings
    } = this.props;

    if (settings === null) {
      return null;
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_CreateForm__WEBPACK_IMPORTED_MODULE_5__["default"], null);
  }

}

_defineProperty(AppContainer, "propTypes", {
  getSettings: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func
});

_defineProperty(AppContainer, "defaultProps", {
  getSettings: function () {// nothing
  }
});

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_3__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_4__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    settings
  } = state;
  return {
    settings
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(AppContainer));

/***/ }),

/***/ "./www/sources/js/pages/feedback/multiple-logs/create/components/CreateForm.jsx":
/*!**************************************************************************************!*\
  !*** ./www/sources/js/pages/feedback/multiple-logs/create/components/CreateForm.jsx ***!
  \**************************************************************************************/
/*! exports provided: CreateForm, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateForm", function() { return CreateForm; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! formik */ "./node_modules/formik/dist/formik.esm.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/feedback/multiple-logs/create/actions.js");
/* harmony import */ var _jsroot_components_date_picker_index__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/components/date-picker/index */ "./www/sources/js/components/date-picker/index.jsx");
/* harmony import */ var _jsroot_components_ckeditor_index__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jsroot/components/ckeditor/index */ "./www/sources/js/components/ckeditor/index.jsx");
/* harmony import */ var _VerifyCustomerResult__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./VerifyCustomerResult */ "./www/sources/js/pages/feedback/multiple-logs/create/components/VerifyCustomerResult.jsx");
/* harmony import */ var _jsroot_components_FormikErrorMessage__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @jsroot/components/FormikErrorMessage */ "./www/sources/js/components/FormikErrorMessage.jsx");
/* harmony import */ var _jsroot_components_multiple_select_index__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @jsroot/components/multiple-select/index */ "./www/sources/js/components/multiple-select/index.jsx");
/* harmony import */ var _jsroot_components_AutoComplete__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @jsroot/components/AutoComplete */ "./www/sources/js/components/AutoComplete.jsx");
/* harmony import */ var _jsroot_components_SweetModalDialog__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @jsroot/components/SweetModalDialog */ "./www/sources/js/components/SweetModalDialog.jsx");
/* harmony import */ var _jsroot_components_ResponseMessage__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @jsroot/components/ResponseMessage */ "./www/sources/js/components/ResponseMessage.jsx");
/* harmony import */ var _AddRelatedCustomerDialog__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./AddRelatedCustomerDialog */ "./www/sources/js/pages/feedback/multiple-logs/create/components/AddRelatedCustomerDialog.jsx");
/* harmony import */ var _jsroot_common_site__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @jsroot/common/site */ "./www/sources/js/common/site.js");
/* harmony import */ var _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @jsroot/common/dateTimeService */ "./www/sources/js/common/dateTimeService.js");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var _jsroot_common_shareScripts__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @jsroot/common/shareScripts */ "./www/sources/js/common/shareScripts.js");
/* harmony import */ var _common_functions__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../../../common.functions */ "./www/sources/js/pages/feedback/common.functions.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






















class CreateForm extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "initFormData", () => {
      const settings = this.props.settings;
      const currentClientTime = window.currentClientTime;
      const startTime = new Date(_jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_17__["default"].toShortDateTimeFormat(new Date(currentClientTime)));
      const endTime = new Date(_jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_17__["default"].toShortDateTimeFormat(new Date(currentClientTime)));
      endTime.setMinutes(endTime.getMinutes() + 1);
      return {
        customerNameInput: '',
        startTime,
        endTime,
        extensionIds: settings.extensions[0].id.toString(),
        languageId: settings.languages[0].languageId,
        countryId: settings.countries[0].id,
        communicationToolIds: '',
        mainCategoryIds: '',
        subCategoryIds: '',
        productIds: '',
        subProductIds: '',
        betTypeIds: '',
        statusId: settings.statuses[0].statusId,
        roleId: '',
        siteId: '',
        licenseeTypeId: '',
        responseId: settings.responses[0].id,
        noOfInquiries: '',
        subject: '',
        autoGenerated: Object(_jsroot_common_shareScripts__WEBPACK_IMPORTED_MODULE_19__["generateTimeAndToolPrefix"])(startTime, '') + ' \nSystem ID: ',
        remark: `<div><font color="#ff0000">This entry is created by Multiple Logs</font></div><br/>`,
        solution: '',
        isUseDefaultCommunicationTool: true,
        isUseDefaultLanguage: true,
        isUseDefaultCountry: true
      };
    });

    _defineProperty(this, "handleCollapseExpand", (section = '') => {
      this.setState(prevState => ({
        collapse: _objectSpread(_objectSpread({}, prevState.collapse), {}, {
          [section]: !prevState.collapse[section]
        })
      }));
    });

    _defineProperty(this, "matchTimeAndToolPrefix", (autoGeneratedText = '', isUseDefaultCommunicationTool = false) => {
      const communicationTools = [...this.props.settings.communicationTools];
      let result = '',
          match;

      if (isUseDefaultCommunicationTool) {
        communicationTools.unshift({
          name: ''
        });
      } else {
        communicationTools.unshift({
          name: 'N/A'
        });
      }

      for (let i = 0; i < communicationTools.length; i++) {
        const tool = communicationTools[i];
        match = autoGeneratedText.match(new RegExp(this.dateTimeAndToolPattern + tool.name));

        if (match !== null) {
          result = match[0];
          break;
        }
      }

      if (!isUseDefaultCommunicationTool && result === '') {
        match = autoGeneratedText.match(new RegExp(this.dateTimeAndToolPattern));

        if (match !== null) {
          result = match[0];
        }
      }

      return result;
    });

    _defineProperty(this, "updateTimeAndToolPrefix", () => {
      const formikValues = this.formik.values;
      const newTimeAndToolPrefix = Object(_jsroot_common_shareScripts__WEBPACK_IMPORTED_MODULE_19__["generateTimeAndToolPrefix"])(formikValues.startTime, formikValues.isUseDefaultCommunicationTool ? '' : this.state.latestCommunicationTool);
      const oldTimeAndToolPrefix = this.matchTimeAndToolPrefix(formikValues.autoGenerated, formikValues.isUseDefaultCommunicationTool);
      const autoGenerated = oldTimeAndToolPrefix !== '' ? formikValues.autoGenerated.replace(oldTimeAndToolPrefix, newTimeAndToolPrefix) : `${newTimeAndToolPrefix}\n${formikValues.autoGenerated}`;
      this.formik.setFieldValue('autoGenerated', autoGenerated);
    });

    _defineProperty(this, "handlePasteCustomer", (setFieldValue, event, customerNameInput) => {
      const customer = customerNameInput.trim();
      const items = (event.clipboardData || window.clipboardData).getData('text').replace(/\t/g, ',').replace(/ /g, ',').replace(/\r\n/g, ',').replace(/\n/g, ',').split(',').filter(item => item !== '');
      setTimeout(() => {
        const customerInput = (customer.length > 0 ? customer + ',' : '').concat(items.join(','));
        setFieldValue('customerNameInput', customerInput);
      }, 100);
    });

    _defineProperty(this, "verifyCustomers", (setFieldValue, customerNameInput) => {
      const username = customerNameInput.trim().replace(/,\s+/g, ',').replace(/^,+|,+$/g, '').replace(/,{2,}/g, ',');

      if (username === '') {
        return;
      }

      this.setState({
        createMultipleLogsResult: null
      });
      _jsroot_common_site__WEBPACK_IMPORTED_MODULE_16__["default"].blockUI();
      this.props.verifyCustomers({
        username
      }).then(response => {
        this.props.setVerifyCustomerResults(response.data);
        setFieldValue('customerNameInput', '');
        _jsroot_common_site__WEBPACK_IMPORTED_MODULE_16__["default"].unblockUI();
      });
    });

    _defineProperty(this, "reVerifyInactiveSiteAndConfirm", (username, params, setSubmitting, values) => {
      _jsroot_common_site__WEBPACK_IMPORTED_MODULE_16__["default"].blockUI();
      this.props.verifyCustomers({
        username
      }).then(response => {
        const inactiveCustomers = response.data.filter(customer => !customer.isSiteActive && customer.custId !== 0 && customer.isLicensee);
        this.setState({
          createMultipleLogsResult: null
        });
        this.props.setReVerifyCustomerResults(response.data);

        if (inactiveCustomers.length > 0) {
          const inactiveUserName = inactiveCustomers.map(x => x.username).join(',');
          const message = _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_18__["default"].getResource('ErrorMessageInactiveSiteRelate') + inactiveUserName;
          this.setState({
            createMultipleLogsResult: {
              isSuccessful: false,
              message
            }
          });
          setSubmitting(false);
        } else if (values.isUseDefaultCommunicationTool) {
          this.checkNotExistCommunicationToolSetting(params);
        } else {
          this.confirmCreateMultipleLogs(params, 'Are you sure you want to Add or Update the Feedback/Log?');
        }

        _jsroot_common_site__WEBPACK_IMPORTED_MODULE_16__["default"].unblockUI();
      });
    });

    _defineProperty(this, "handleChangeStartTime", (setFieldValue, startTime, endTime) => {
      setFieldValue('startTime', startTime);

      if (moment__WEBPACK_IMPORTED_MODULE_5___default()(startTime).isAfter(moment__WEBPACK_IMPORTED_MODULE_5___default()(endTime))) {
        endTime = new Date(_jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_17__["default"].toShortDateTimeFormat(new Date(startTime)));
        endTime.setMinutes(endTime.getMinutes() + 1);
        setFieldValue('endTime', endTime);
      }

      setTimeout(() => this.updateTimeAndToolPrefix(), 100);
    });

    _defineProperty(this, "handleChangeEndTime", (setFieldValue, startTime, endTime) => {
      setFieldValue('endTime', endTime);

      if (moment__WEBPACK_IMPORTED_MODULE_5___default()(startTime).isAfter(moment__WEBPACK_IMPORTED_MODULE_5___default()(endTime))) {
        startTime = new Date(_jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_17__["default"].toShortDateTimeFormat(new Date(endTime)));
        startTime.setMinutes(startTime.getMinutes() - 1);
        setFieldValue('startTime', startTime);
      }
    });

    _defineProperty(this, "handleChangeCommunicationTool", (setFieldValue, currentItem, selectedItemsKey) => {
      setFieldValue('communicationToolIds', selectedItemsKey);
      const communicationTools = this.props.settings.communicationTools;
      let latestCommunicationTool = '';

      if (currentItem !== null && selectedItemsKey !== '' && currentItem.checked) {
        latestCommunicationTool = currentItem.name;
      } else if (currentItem === null && selectedItemsKey !== '') {
        latestCommunicationTool = communicationTools[0].name;
      } else {
        if (selectedItemsKey !== '') {
          const communicationToolId = parseInt(selectedItemsKey.split(',')[0], 10);
          latestCommunicationTool = communicationTools.filter(x => x.id === communicationToolId)[0].name;
        }
      }

      this.setState({
        latestCommunicationTool
      }, () => {
        setTimeout(() => this.updateTimeAndToolPrefix(), 100);
      });
    });

    _defineProperty(this, "handleChangeCheckboxDefaultCommunicationTool", event => {
      const formikValues = this.formik.values;
      const lines = formikValues.autoGenerated.split('\n'),
            totalLines = lines.length;
      let lineIndex = 0,
          isValidFormat = false;

      for (lineIndex; lineIndex < totalLines; lineIndex++) {
        isValidFormat = lines[lineIndex].trim().match(new RegExp(this.dateTimeAndToolPattern)) !== null;

        if (isValidFormat) {
          break;
        }
      }

      if (isValidFormat && event.target.checked) {
        lines[lineIndex] = Object(_jsroot_common_shareScripts__WEBPACK_IMPORTED_MODULE_19__["generateTimeAndToolPrefix"])(formikValues.startTime, '');
      }

      this.formik.setFieldValue('isUseDefaultCommunicationTool', event.target.checked);
      this.formik.setFieldValue('autoGenerated', lines.join('\n'));
      setTimeout(() => this.updateTimeAndToolPrefix(), 100);
    });

    _defineProperty(this, "handleChangeMainCategory", (setFieldValue, selectedCategoryIds, selectedSubCategoryIds, subject) => {
      const tempSubject = Object(_jsroot_common_shareScripts__WEBPACK_IMPORTED_MODULE_19__["getSubjectOnChangeCategories"])(selectedCategoryIds ? selectedCategoryIds.split(',') : [], subject, this.props.settings.mainCategories);
      setFieldValue('mainCategoryIds', selectedCategoryIds);
      setFieldValue('subject', tempSubject);

      if (selectedCategoryIds) {
        const subCategoryIds = selectedSubCategoryIds.length > 0 ? selectedSubCategoryIds.split(',') : [];
        const subCategories = Object(_jsroot_common_shareScripts__WEBPACK_IMPORTED_MODULE_19__["getSubCategories"])(selectedCategoryIds.split(','), this.props.settings.subCategories, subCategoryIds, false);
        this.setState({
          subCategoryOptions: subCategories
        });
      } else {
        setFieldValue('subCategoryIds', '');
        this.setState({
          subCategoryOptions: []
        });
      }
    });

    _defineProperty(this, "handleChangeProduct", (setFieldValue, selectedProductIds, selectedSubProductIds) => {
      setFieldValue('productIds', selectedProductIds);

      if (selectedProductIds) {
        const subProductIds = selectedSubProductIds.length > 0 ? selectedSubProductIds.split(',') : [];
        const subProducts = Object(_jsroot_common_shareScripts__WEBPACK_IMPORTED_MODULE_19__["getSubProducts"])(selectedProductIds.split(','), this.props.settings.subProducts, subProductIds, false);
        this.setState({
          subProductOptions: subProducts
        });
      } else {
        setFieldValue('subProductIds', '');
        setFieldValue('betTypeIds', '');
        this.setState({
          subProductOptions: [],
          betTypeOptions: []
        });
      }
    });

    _defineProperty(this, "handleChangeSubProduct", (setFieldValue, selectedSubProductIds, selectedBetTypeIds) => {
      setFieldValue('subProductIds', selectedSubProductIds);

      if (selectedSubProductIds) {
        const betTypeIds = selectedBetTypeIds.length > 0 ? selectedBetTypeIds.split(',') : [];
        const betTypes = Object(_jsroot_common_shareScripts__WEBPACK_IMPORTED_MODULE_19__["getBetTypes"])(selectedSubProductIds.split(','), this.props.settings.bettypes, betTypeIds, false);
        this.setState({
          betTypeOptions: betTypes
        });
      } else {
        setFieldValue('betTypeIds', '');
        this.setState({
          betTypeOptions: []
        });
      }
    });

    _defineProperty(this, "handleGetFeedbackSubjectTemplates", _jsroot_common_site__WEBPACK_IMPORTED_MODULE_16__["default"].debounce(searchText => {
      if (searchText.length >= 2) {
        this.props.getFeedbackSubjectTemplates(searchText);
      } else {
        this.props.setFeedbackSubjectTemplates([]);
      }
    }));

    _defineProperty(this, "validateFormik", values => {
      const errors = {};
      const {
        mainCategories,
        subCategories
      } = this.props.settings;
      Object(_common_functions__WEBPACK_IMPORTED_MODULE_20__["validateMainCategorySubCategory"])(errors, values.mainCategoryIds, values.subCategoryIds, mainCategories, subCategories);

      if (this.props.verifyCustomerResults.filter(item => item.custId !== 0).length === 0) {
        errors.customerNameInput = _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_18__["default"].getResource('ListofcustomersRequired');
      }

      if (moment__WEBPACK_IMPORTED_MODULE_5___default()(values.startTime).isAfter(moment__WEBPACK_IMPORTED_MODULE_5___default()(values.endTime))) {
        errors.startTime = _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_18__["default"].formatString(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_18__["default"].getResource('FieldLessThanOrEqualTo'), _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_18__["default"].getResource('StartTime'), _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_18__["default"].getResource('EndTime'));
      }

      if (!values.isUseDefaultCommunicationTool && values.communicationToolIds.length === 0) {
        errors.communicationToolIds = _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_18__["default"].formatString(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_18__["default"].getResource('FieldRequired'), _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_18__["default"].getResource('CommunicationTool'));
      }

      if (!values.isUseDefaultLanguage && parseInt(values.languageId, 10) === 0) {
        errors.languageId = _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_18__["default"].formatString(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_18__["default"].getResource('FieldRequired'), _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_18__["default"].getResource('Language'));
      }

      if (values.subject === '') {
        errors.subject = _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_18__["default"].formatString(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_18__["default"].getResource('FieldRequired'), _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_18__["default"].getResource('Subject'));
      }

      if (values.remark === '') {
        errors.remark = _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_18__["default"].formatString(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_18__["default"].getResource('FieldRequired'), _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_18__["default"].getResource('Remark'));
      }

      if (values.solution === '') {
        errors.solution = _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_18__["default"].formatString(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_18__["default"].getResource('FieldRequired'), _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_18__["default"].getResource('Solution'));
      }

      return errors;
    });

    _defineProperty(this, "getExtensionParams", (selectedExtensionIds, extensionNA) => {
      let extensions = [];

      if (selectedExtensionIds.length > 0) {
        extensions = selectedExtensionIds.split(',');
      }

      if (extensions.length === 0 && extensionNA !== null && extensionNA.id !== undefined) {
        extensions.push(extensionNA.id);
      }

      return extensions.join(',');
    });

    _defineProperty(this, "splitAutoFieldWhenUseDefaultCommunicationTool", values => {
      const autoFields = ['', '', ''];

      if (!values.isUseDefaultCommunicationTool) {
        return autoFields;
      }

      const lines = values.autoGenerated.split('\n'),
            totalLines = lines.length;
      let lineIndex = 0,
          isValidFormat = false;

      for (lineIndex; lineIndex < totalLines; lineIndex++) {
        isValidFormat = lines[lineIndex].trim().match(new RegExp(this.dateTimeAndToolPattern)) !== null;

        if (isValidFormat) {
          break;
        }
      }

      if (isValidFormat) {
        if (lineIndex > 0) {
          autoFields[0] = lines.slice(0, lineIndex).join('\n') + '\n';
        }

        autoFields[1] = lines[lineIndex];

        if (lineIndex < totalLines - 1) {
          autoFields[2] = '\n' + lines.slice(lineIndex + 1).join('\n');
        }
      } else {
        autoFields[2] = values.autoGeneratedText;
      }

      return autoFields;
    });

    _defineProperty(this, "getCountryName", countryId => {
      const countries = this.props.settings.countries;
      const index = countries.findIndex(item => item.id === countryId);
      return countries[index].name;
    });

    _defineProperty(this, "getCustomers", () => {
      const customers = [];
      this.props.verifyCustomerResults.forEach(customer => {
        if (customer.custId !== 0) {
          customers.push({
            id: customer.custId,
            name: customer.username
          });
        }
      });
      return customers;
    });

    _defineProperty(this, "getRelatedCustomers", () => {
      const customers = [];
      this.props.relatedCustomerResults.forEach(item => {
        if (item.relatedCustomers.length > 0) {
          customers.push(...item.relatedCustomers);
        }
      });
      return customers;
    });

    _defineProperty(this, "confirmCreateMultipleLogs", (params, confirmMessage) => {
      this.props.setConfirmCreateMultipleLogsDialog({
        show: true,
        params,
        confirmMessage
      });
    });

    _defineProperty(this, "checkNotExistCommunicationToolSetting", params => {
      _jsroot_common_site__WEBPACK_IMPORTED_MODULE_16__["default"].blockUI();
      this.props.checkNotExistCommunicationToolSetting({
        customers: params.customers,
        mainCategoryIds: params.mainCategoryIds,
        subCategoryIds: params.subCategoryIds
      }).then(response => {
        _jsroot_common_site__WEBPACK_IMPORTED_MODULE_16__["default"].unblockUI();
        let confirmMessage = 'Are you sure you want to Add or Update the Feedback/Log?';

        if (response.data.length > 0) {
          confirmMessage = `The Default Communication Setting of customers does not match the selected Category / Sub-Category, here are the customers:
                    <strong> ${response.data.map(cust => `${cust.username}(${cust.role})`).join(', ')}</strong>
                    <br />Do you want to continue to create the Feedback/Logs?`;
        }

        this.confirmCreateMultipleLogs(params, confirmMessage);
      });
    });

    _defineProperty(this, "handleSubmit", (values, {
      setSubmitting
    }) => {
      setSubmitting(true);
      const usernames = this.props.verifyCustomerResults.map(x => x.username).join(',');
      const {
        extensionNA,
        subCategories
      } = this.props.settings;
      const autoFields = this.splitAutoFieldWhenUseDefaultCommunicationTool(values);
      const params = {
        customers: this.getCustomers(),
        startTime: _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_17__["default"].toLongDateTimeFormat(_jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_17__["default"].toServerDateTime(values.startTime)),
        endTime: _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_17__["default"].toLongDateTimeFormat(_jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_17__["default"].toServerDateTime(values.endTime)),
        communicationToolIds: values.isUseDefaultCommunicationTool ? '' : values.communicationToolIds,
        languageId: values.isUseDefaultLanguage ? 0 : values.languageId,
        countryName: values.isUseDefaultCountry ? '' : this.getCountryName(values.countryId),
        statusId: values.statusId,
        licenseeTypeId: values.licenseeTypeId,
        responseId: values.responseId,
        subject: values.subject,
        remark: values.remark,
        solution: values.solution,
        autoField: values.autoGenerated,
        autoField1: autoFields[0],
        autoField2: autoFields[1],
        autoField3: autoFields[2],
        extensionIds: this.getExtensionParams(values.extensionIds, extensionNA),
        products: Object(_jsroot_common_shareScripts__WEBPACK_IMPORTED_MODULE_19__["getProductParams"])(values.productIds.length > 0 ? values.productIds.split(',') : [], values.subProductIds.length > 0 ? values.subProductIds.split(',') : [], values.betTypeIds.length > 0 ? values.betTypeIds.split(',') : [], this.props.settings),
        categories: Object(_jsroot_common_shareScripts__WEBPACK_IMPORTED_MODULE_19__["getCategoryParams"])(values.mainCategoryIds.split(','), values.subCategoryIds.split(','), subCategories),
        noInquiries: values.noInquiries,
        mainCategoryIds: values.mainCategoryIds.split(',').map(item => parseInt(item, 10)).sort().join(','),
        subCategoryIds: values.subCategoryIds.split(',').map(item => parseInt(item, 10)).sort().join(','),
        isUseDefaultCommunicationTool: values.isUseDefaultCommunicationTool,
        relatedCustomers: this.getRelatedCustomers(),
        isManualMultiple: true
      };
      this.reVerifyInactiveSiteAndConfirm(usernames, params, setSubmitting, values);
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
        createMultipleLogsResult
      } = this.state;
      const {
        settings,
        verifyCustomerResults
      } = this.props;
      const {
        extensions,
        countries
      } = settings;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"], {
        noValidate: true,
        onSubmit: handleSubmit
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_FormikErrorMessage__WEBPACK_IMPORTED_MODULE_10__["default"], {
        touched: touched,
        errors: errors,
        fieldNames: Object.keys(values)
      }), createMultipleLogsResult && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_ResponseMessage__WEBPACK_IMPORTED_MODULE_14__["default"], {
        isSuccessful: createMultipleLogsResult.isSuccessful,
        message: createMultipleLogsResult.message || _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_18__["default"].getResource('CreateMultipleLogsSuccessfully')
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "panel-group border-bottom-0"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "panel-content"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
        column: true,
        sm: "2",
        md: "2",
        htmlFor: "customerNameInput",
        className: "required"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_18__["default"].getResource('Listofcustomers')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
        sm: "8",
        md: "8"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Control, {
        type: "text",
        size: "sm",
        name: "customerNameInput",
        className: "shadow-none",
        autoComplete: "off",
        value: values.customerNameInput,
        isInvalid: touched.customerNameInput && errors.customerNameInput,
        onPaste: event => this.handlePasteCustomer(setFieldValue, event, values.customerNameInput),
        onChange: handleChange
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
        sm: "1",
        md: "1"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], {
        type: "button",
        variant: "primary",
        size: "sm",
        className: "pull-right",
        disabled: values.customerNameInput.trim() === '',
        onClick: () => this.verifyCustomers(setFieldValue, values.customerNameInput)
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_18__["default"].getResource('Verify'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
        sm: "1",
        md: "1"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["OverlayTrigger"], {
        placement: "bottom-end",
        overlay: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Tooltip"], null, "Role, Site, Licensee Type shall be update automatically by system!")
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "fa fa-exclamation-circle"
      })))), verifyCustomerResults.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
        column: true,
        sm: "2",
        md: "2"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
        sm: "9",
        md: "9"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_VerifyCustomerResult__WEBPACK_IMPORTED_MODULE_9__["default"], null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
        column: true,
        sm: "2",
        md: "2"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_18__["default"].getResource('StartTime')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
        sm: "3",
        md: "3",
        className: "react-datepicker-wrapper-container form-control-wrapper"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_date_picker_index__WEBPACK_IMPORTED_MODULE_7__["default"], {
        isInvalid: touched.startTime && errors.startTime,
        selected: values.startTime,
        timeInputLabel: "Time:",
        dateFormat: "MMM dd, yyyy hh:mm aa",
        showTimeInput: true,
        peekNextMonth: true,
        showMonthDropdown: true,
        showYearDropdown: true,
        dropdownMode: "select",
        onChange: value => this.handleChangeStartTime(setFieldValue, value, values.endTime)
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
        sm: "1",
        md: "1"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
        column: true,
        sm: "2",
        md: "2"
      }, "Ext"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
        sm: "3",
        md: "3"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_multiple_select_index__WEBPACK_IMPORTED_MODULE_11__["default"], {
        dataSource: extensions,
        keyField: "id",
        valueField: "value",
        hasAllOption: extensions.length > 0,
        isAllTextShown: extensions.length > 0,
        hasSearchBox: true,
        isNAOption: true,
        onChange: (currentItem, selectedItemsKey) => {
          setFieldValue('extensionIds', selectedItemsKey);
        }
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
        column: true,
        sm: "2",
        md: "2"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_18__["default"].getResource('EndTime')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
        sm: "3",
        md: "3",
        className: "react-datepicker-wrapper-container form-control-wrapper"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_date_picker_index__WEBPACK_IMPORTED_MODULE_7__["default"], {
        selected: values.endTime,
        timeInputLabel: "Time:",
        dateFormat: "MMM dd, yyyy hh:mm aa",
        showTimeInput: true,
        peekNextMonth: true,
        showMonthDropdown: true,
        showYearDropdown: true,
        dropdownMode: "select",
        onChange: value => this.handleChangeEndTime(setFieldValue, values.startTime, value)
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
        sm: "1",
        md: "1"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
        column: true,
        sm: "2",
        md: "2"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_18__["default"].getResource('Country')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
        sm: "3",
        md: "3"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Control, {
        as: "select",
        size: "sm",
        className: "shadow-none",
        value: values.countryId,
        onChange: handleChange,
        disabled: values.isUseDefaultCountry
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        value: "",
        hidden: true,
        disabled: true
      }), countries.map(item => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        key: item.id,
        value: item.id
      }, item.name)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
        sm: "1",
        md: "1"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["OverlayTrigger"], {
        placement: "left-start",
        overlay: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Tooltip"], null, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_18__["default"].getResource('ApplyDefaultCountry'))
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Check, {
        type: "checkbox",
        checked: values.isUseDefaultCountry,
        onChange: event => setFieldValue('isUseDefaultCountry', event.target.checked)
      })))), this.renderCommunicationToolSection(values, touched, errors, setFieldValue, handleChange), this.renderProductSection(values, touched, errors, setFieldValue, handleChange))), this.renderCollapseSection(values, touched, errors, setFieldValue, handleChange), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Row"],
        className: "mt-3"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], {
        type: "submit",
        variant: "primary",
        size: "sm",
        disabled: isSubmitting
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_18__["default"].getResource('Save')))));
    });

    _defineProperty(this, "renderCommunicationToolSection", (values, touched, errors, setFieldValue, handleChange) => {
      const {
        subCategoryOptions
      } = this.state;
      const {
        settings
      } = this.props;
      const {
        communicationTools,
        languages,
        mainCategories
      } = settings;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
        column: true,
        sm: "2",
        md: "2",
        className: values.isUseDefaultCommunicationTool ? '' : 'required'
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_18__["default"].getResource('CommunicationTool')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
        sm: "3",
        md: "3"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_multiple_select_index__WEBPACK_IMPORTED_MODULE_11__["default"], {
        isInvalid: touched.communicationToolIds && errors.communicationToolIds,
        dataSource: communicationTools,
        keyField: "id",
        valueField: "name",
        hasAllOption: communicationTools.length > 0,
        isAllTextShown: communicationTools.length > 0,
        hasSearchBox: true,
        isDisable: values.isUseDefaultCommunicationTool,
        isNAOption: true,
        onChange: (currentItem, selectedItemsKey) => {
          this.handleChangeCommunicationTool(setFieldValue, currentItem, selectedItemsKey);
        }
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
        sm: "1",
        md: "1"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["OverlayTrigger"], {
        placement: "left-start",
        overlay: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Tooltip"], null, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_18__["default"].getResource('ApplyDefaultCommunicationTool'))
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Check, {
        type: "checkbox",
        checked: values.isUseDefaultCommunicationTool,
        onChange: this.handleChangeCheckboxDefaultCommunicationTool
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
        column: true,
        sm: "2",
        md: "2"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_18__["default"].getResource('Language')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
        sm: "3",
        md: "3"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Control, {
        as: "select",
        size: "sm",
        className: "shadow-none",
        value: values.languageId,
        onChange: handleChange,
        disabled: values.isUseDefaultLanguage
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        value: "",
        hidden: true,
        disabled: true
      }), languages.map(item => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        key: item.languageId,
        value: item.languageId
      }, item.name)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
        sm: "1",
        md: "1"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["OverlayTrigger"], {
        placement: "left-start",
        overlay: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Tooltip"], null, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_18__["default"].getResource('ApplyDefaultLanguage'))
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Check, {
        type: "checkbox",
        checked: values.isUseDefaultLanguage,
        onChange: event => setFieldValue('isUseDefaultLanguage', event.target.checked)
      })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
        column: true,
        sm: "2",
        md: "2",
        className: "required"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_18__["default"].getResource('Category')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
        sm: "3",
        md: "3"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_multiple_select_index__WEBPACK_IMPORTED_MODULE_11__["default"], {
        isInvalid: touched.mainCategoryIds && errors.mainCategoryIds,
        dataSource: mainCategories,
        keyField: "mainCategoryID",
        valueField: "name",
        hasAllOption: mainCategories.length > 0,
        isAllTextShown: mainCategories.length > 0,
        hasSearchBox: true,
        isNAOption: true,
        maxDisplayItemCount: 1,
        onChange: (currentItem, selectedItemsKey) => {
          this.handleChangeMainCategory(setFieldValue, selectedItemsKey, values.subCategoryIds, values.subject);
        }
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
        sm: "1",
        md: "1"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
        column: true,
        sm: "2",
        md: "2",
        className: "required"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_18__["default"].getResource('SubCategory')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
        sm: "3",
        md: "3"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_multiple_select_index__WEBPACK_IMPORTED_MODULE_11__["default"], {
        isInvalid: touched.subCategoryIds && errors.subCategoryIds,
        dataSource: subCategoryOptions,
        keyField: "subCategoryId",
        valueField: "name",
        hasAllOption: subCategoryOptions.length > 0,
        isAllTextShown: subCategoryOptions.length > 0,
        hasSearchBox: true,
        isNAOption: true,
        maxDisplayItemCount: 1,
        onChange: (currentItem, selectedItemsKey) => {
          setFieldValue('subCategoryIds', selectedItemsKey);
        }
      }))));
    });

    _defineProperty(this, "renderProductSection", (values, touched, errors, setFieldValue, handleChange) => {
      const {
        subProductOptions,
        betTypeOptions
      } = this.state;
      const {
        settings,
        feedbackSubjectTemplates
      } = this.props;
      const {
        products,
        statuses,
        responses
      } = settings;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
        column: true,
        sm: "2",
        md: "2"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_18__["default"].getResource('Product')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
        sm: "3",
        md: "3"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_multiple_select_index__WEBPACK_IMPORTED_MODULE_11__["default"], {
        dataSource: products,
        keyField: "id",
        valueField: "value",
        hasAllOption: products.length > 0,
        isAllTextShown: products.length > 0,
        hasSearchBox: true,
        isNAOption: true,
        maxDisplayItemCount: 1,
        onChange: (currentItem, selectedItemsKey) => {
          this.handleChangeProduct(setFieldValue, selectedItemsKey, values.subProductIds);
        }
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
        sm: "1",
        md: "1"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
        column: true,
        sm: "2",
        md: "2"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_18__["default"].getResource('SubProduct')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
        sm: "3",
        md: "3"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_multiple_select_index__WEBPACK_IMPORTED_MODULE_11__["default"], {
        dataSource: subProductOptions,
        keyField: "id",
        valueField: "value",
        hasAllOption: subProductOptions.length > 0,
        isAllTextShown: subProductOptions.length > 0,
        hasSearchBox: true,
        isNAOption: true,
        maxDisplayItemCount: 1,
        onChange: (currentItem, selectedItemsKey) => {
          this.handleChangeSubProduct(setFieldValue, selectedItemsKey, values.betTypeIds);
        }
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
        column: true,
        sm: "2",
        md: "2"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_18__["default"].getResource('Status')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
        sm: "3",
        md: "3"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Control, {
        as: "select",
        size: "sm",
        className: "shadow-none"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        value: "",
        hidden: true,
        disabled: true
      }), statuses.map(item => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        key: item.statusId,
        value: item.statusId
      }, item.name)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
        sm: "1",
        md: "1"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
        column: true,
        sm: "2",
        md: "2"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_18__["default"].getResource('BetType')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
        sm: "3",
        md: "3"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_multiple_select_index__WEBPACK_IMPORTED_MODULE_11__["default"], {
        dataSource: betTypeOptions,
        keyField: "id",
        valueField: "value",
        hasAllOption: betTypeOptions.length > 0,
        isAllTextShown: betTypeOptions.length > 0,
        hasSearchBox: true,
        isNAOption: true,
        maxDisplayItemCount: 1,
        onChange: (currentItem, selectedItemsKey) => {
          setFieldValue('betTypeIds', selectedItemsKey);
        }
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
        column: true,
        sm: "2",
        md: "2"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_18__["default"].getResource('Role')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
        sm: "3",
        md: "3"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Control, {
        as: "select",
        size: "sm",
        className: "shadow-none",
        disabled: true
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        value: ""
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_18__["default"].getResource('NotApply')))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
        sm: "1",
        md: "1"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
        column: true,
        sm: "2",
        md: "2"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_18__["default"].getResource('Site')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
        md: "3",
        sm: "3"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Control, {
        as: "select",
        size: "sm",
        disabled: true,
        className: "shadow-none"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        value: ""
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_18__["default"].getResource('NotApply'))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
        column: true,
        md: "2",
        sm: "2"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_18__["default"].getResource('Response')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
        sm: "3",
        md: "3"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Control, {
        as: "select",
        size: "sm",
        className: "shadow-none"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        value: "",
        hidden: true,
        disabled: true
      }), responses.map(item => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        key: item.id,
        value: item.id
      }, item.value)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
        sm: "1",
        md: "1"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
        column: true,
        sm: "2",
        md: "2"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_18__["default"].getResource('LicenseeType')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
        sm: "3",
        md: "3"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Control, {
        as: "select",
        disabled: true,
        size: "sm",
        className: "shadow-none"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        value: ""
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_18__["default"].getResource('NotApply'))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
        column: true,
        md: "2",
        sm: "2"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_18__["default"].getResource('NoOfInquiries')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
        sm: "3",
        md: "3"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Control, {
        type: "number",
        size: "sm",
        className: "shadow-none",
        name: "noOfInquiries",
        min: 1,
        max: 3200,
        value: values.noOfInquiries,
        onInput: _common_functions__WEBPACK_IMPORTED_MODULE_20__["validateNoOfInquiry"],
        onChange: handleChange
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
        column: true,
        sm: "2",
        md: "2",
        className: "required"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_18__["default"].getResource('Subject')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
        sm: "9",
        md: "9"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_AutoComplete__WEBPACK_IMPORTED_MODULE_12__["default"], {
        isInvalid: touched.subject && errors.subject,
        value: values.subject,
        options: feedbackSubjectTemplates,
        displayField: "subject",
        onChange: value => setFieldValue('subject', value),
        onInputChange: this.handleGetFeedbackSubjectTemplates
      }))));
    });

    _defineProperty(this, "renderCollapseSection", (values, touched, errors, setFieldValue, handleChange) => {
      const {
        collapse
      } = this.state;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "panel-group border-bottom-0"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Row"],
        className: "panel-title"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, null, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_18__["default"].getResource('AutoGenerated'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "panel-content"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Control, {
        as: "textarea",
        rows: 3,
        className: "shadow-none",
        name: "autoGenerated",
        value: values.autoGenerated,
        onChange: handleChange
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "panel-group border-bottom-0"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Row"],
        className: "panel-title border-bottom-0",
        onClick: () => this.handleCollapseExpand('remark'),
        "aria-controls": "collapse-expand-remark",
        "aria-expanded": !collapse.remark
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
        className: "required"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_18__["default"].getResource('Remark'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Collapse"], {
        in: !collapse.remark
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        id: "collapse-expand-remark",
        className: `panel-content ${collapse.remark ? 'border-bottom-0' : ''}`
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_ckeditor_index__WEBPACK_IMPORTED_MODULE_8__["default"], {
        isInvalid: touched.remark && errors.remark,
        data: values.remark,
        username: window.currentUsername,
        onChange: value => setFieldValue('remark', value)
      })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: `panel-group ${collapse.solution ? 'border-bottom-0' : ''}`
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Row"],
        className: "panel-title",
        onClick: () => this.handleCollapseExpand('solution'),
        "aria-controls": "collapse-expand-solution",
        "aria-expanded": !collapse.solution
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
        className: "required"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_18__["default"].getResource('Solution'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Collapse"], {
        in: !collapse.solution
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        id: "collapse-expand-solution",
        className: "panel-content"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_ckeditor_index__WEBPACK_IMPORTED_MODULE_8__["default"], {
        isInvalid: touched.solution && errors.solution,
        data: values.solution,
        username: window.currentUsername,
        onChange: value => setFieldValue('solution', value)
      })))));
    });

    _defineProperty(this, "handleCloseViewRelatedCustomerDialog", () => {
      this.props.setViewRelatedCustomerDialog({
        show: false
      });
    });

    _defineProperty(this, "handleCloseConfirmCreateMultipleLogsDialog", () => {
      this.props.setConfirmCreateMultipleLogsDialog({
        show: false
      });
      this.formik.setSubmitting(false);
    });

    _defineProperty(this, "handleCreateMultipleLogs", () => {
      _jsroot_common_site__WEBPACK_IMPORTED_MODULE_16__["default"].blockUI();
      const {
        params
      } = this.props.confirmCreateMultipleLogsDialog;
      this.props.createMultipleLogs(params).then(response => {
        _jsroot_common_site__WEBPACK_IMPORTED_MODULE_16__["default"].unblockUI();
        this.setState({
          createMultipleLogsResult: response.data
        });

        if (response.data.isSuccessful) {
          window.location = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_16__["default"].resolveClientUrl('ManageFeedback/Index');
        } else {
          this.formik.setSubmitting(false);
        }
      });
    });

    this.state = {
      latestCommunicationTool: 'N/A',
      collapse: {
        remark: false,
        solution: false
      },
      subCategoryOptions: [],
      subProductOptions: [],
      betTypeOptions: [],
      createMultipleLogsResult: null
    };
    this.dateTimeAndToolPattern = 'Date Time & Tool: \\d{8}\\/\\d{2}:\\d{2}\\D{2}\\/';
    this.formikValues = this.initFormData();
  }

  render() {
    const {
      addRelatedCustomerDialog,
      viewRelatedCustomerDialog,
      confirmCreateMultipleLogsDialog
    } = this.props;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_4__["Formik"], {
      innerRef: el => this.formik = el,
      initialValues: this.formikValues,
      validate: this.validateFormik,
      onSubmit: this.handleSubmit
    }, this.renderForm), addRelatedCustomerDialog.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_AddRelatedCustomerDialog__WEBPACK_IMPORTED_MODULE_15__["default"], null), viewRelatedCustomerDialog.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_SweetModalDialog__WEBPACK_IMPORTED_MODULE_13__["default"], {
      className: "view-related-customer-modal-dialog",
      size: "lg",
      title: _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_18__["default"].getResource('RelatedCustomer'),
      contents: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, viewRelatedCustomerDialog.relatedCustomers.map(item => item.username).join(', ')),
      buttons: [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], {
        variant: "primary",
        size: "sm",
        onClick: this.handleCloseViewRelatedCustomerDialog
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_18__["default"].getResource('Close'))],
      onClose: this.handleCloseViewRelatedCustomerDialog
    }), confirmCreateMultipleLogsDialog.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_SweetModalDialog__WEBPACK_IMPORTED_MODULE_13__["default"], {
      size: "lg",
      title: _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_18__["default"].getResource('Confirmation'),
      contents: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        dangerouslySetInnerHTML: {
          __html: confirmCreateMultipleLogsDialog.confirmMessage
        }
      }),
      buttons: [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], {
        variant: "primary",
        size: "sm",
        onClick: this.handleCreateMultipleLogs
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_18__["default"].getResource('OK')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], {
        variant: "primary",
        size: "sm",
        onClick: this.handleCloseConfirmCreateMultipleLogsDialog
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_18__["default"].getResource('Cancel'))],
      onClose: this.handleCloseConfirmCreateMultipleLogsDialog
    }));
  }

}

_defineProperty(CreateForm, "defaultProps", {
  verifyCustomerResults: [],
  relatedCustomerResults: [],
  addRelatedCustomerDialog: {
    show: false
  },
  viewRelatedCustomerDialog: {
    show: false
  },
  confirmCreateMultipleLogsDialog: {
    show: false
  }
});

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_6__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    settings,
    verifyCustomerResults,
    relatedCustomerResults,
    feedbackSubjectTemplates,
    addRelatedCustomerDialog,
    viewRelatedCustomerDialog,
    confirmCreateMultipleLogsDialog
  } = state;
  return {
    settings,
    verifyCustomerResults,
    relatedCustomerResults,
    feedbackSubjectTemplates,
    addRelatedCustomerDialog,
    viewRelatedCustomerDialog,
    confirmCreateMultipleLogsDialog
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(CreateForm));

/***/ }),

/***/ "./www/sources/js/pages/feedback/multiple-logs/create/components/RelatedCustomerGrid.jsx":
/*!***********************************************************************************************!*\
  !*** ./www/sources/js/pages/feedback/multiple-logs/create/components/RelatedCustomerGrid.jsx ***!
  \***********************************************************************************************/
/*! exports provided: RelatedCustomerGrid, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RelatedCustomerGrid", function() { return RelatedCustomerGrid; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/feedback/multiple-logs/create/actions.js");
/* harmony import */ var _jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/components/react-grid/index */ "./www/sources/js/components/react-grid/index.jsx");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/common/constants */ "./www/sources/js/common/constants.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








class RelatedCustomerGrid extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "onPaging", (pageIndex, pageSize) => {
      this.setState({
        pageIndex,
        pageSize
      });
    });

    _defineProperty(this, "buildGridHeader", () => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderRow"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
      colWidth: 50
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('GroupHeadline')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
      colWidth: 50
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Username')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
      colWidth: 100
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('RelatedCustomer'))));

    _defineProperty(this, "buildGridBody", () => {
      const {
        pageIndex,
        pageSize
      } = this.state;

      if (this.props.relatedCustomerResults.length > 0) {
        const rows = [];
        const totalItems = this.props.relatedCustomerResults.length,
              rowIndex = (pageIndex - 1) * pageSize;
        let lastRowIndex = rowIndex + pageSize;

        if (lastRowIndex > totalItems) {
          lastRowIndex = totalItems;
        }

        for (let i = rowIndex; i < lastRowIndex; i++) {
          const item = this.props.relatedCustomerResults[i];
          rows.push(this.renderRow(item));
        }

        return rows;
      }

      return [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Row"], {
        key: `body${1}`,
        className: "no-data"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        colSpan: "3"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('ThereIsNoData')))];
    });

    _defineProperty(this, "handleOpenViewRelatedCustomerDialog", relatedCustomers => {
      this.props.setViewRelatedCustomerDialog({
        show: true,
        relatedCustomers
      });
    });

    _defineProperty(this, "renderRelatedCustomerColumn", customer => {
      let html = '';
      const totalItems = customer.relatedCustomers.length;

      if (totalItems > _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_6__["MaximumDisplayRelatedCustomer"]) {
        html = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
          href: "#",
          onClick: () => this.handleOpenViewRelatedCustomerDialog(customer.relatedCustomers)
        }, totalItems, " customers");
      } else {
        html = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, customer.relatedCustomers.map(item => item.username).join(', '));
      }

      return html;
    });

    _defineProperty(this, "renderRow", customer => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Row"], {
      key: customer.headlineId
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], null, customer.headlineId > 0 ? customer.headline : 'Not assign group'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], null, customer.username), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], null, this.renderRelatedCustomerColumn(customer))));

    this.state = {
      pageIndex: 1,
      pageSize: 10
    };
  }

  render() {
    const pagingOption = {
      PageIndex: this.state.pageIndex,
      PageSize: this.state.pageSize,
      TotalItem: this.props.relatedCustomerResults.length,
      PageList: [10, 20, 50]
    };
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "table-title"
    }, "List of related customers"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Table"], {
      width: 772,
      maxWidth: 772,
      autoWidth: false,
      shouldUseMaxWidth: true,
      maxHeight: 300,
      header: this.buildGridHeader(),
      body: this.buildGridBody(),
      isPaging: true,
      pageOption: pagingOption,
      onPaging: this.onPaging,
      containerPadding: 0,
      adjustedHeight: 10
    }));
  }

}

_defineProperty(RelatedCustomerGrid, "defaultProps", {
  relatedCustomerResults: []
});

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    relatedCustomerResults
  } = state;
  return {
    relatedCustomerResults
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(RelatedCustomerGrid));

/***/ }),

/***/ "./www/sources/js/pages/feedback/multiple-logs/create/components/VerifyCustomerResult.jsx":
/*!************************************************************************************************!*\
  !*** ./www/sources/js/pages/feedback/multiple-logs/create/components/VerifyCustomerResult.jsx ***!
  \************************************************************************************************/
/*! exports provided: VerifyCustomerResult, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VerifyCustomerResult", function() { return VerifyCustomerResult; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/feedback/multiple-logs/create/actions.js");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







class VerifyCustomerResult extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "handleOpenAddRelatedCustomerDialog", () => {
      const relatedCustomers = [];
      this.props.relatedCustomerResults.forEach(item => {
        item.relatedCustomers.forEach(child => {
          const index = relatedCustomers.map(x => x.username).indexOf(child.username);

          if (index === -1) {
            const totalItems = relatedCustomers.length;
            relatedCustomers.push({
              index: totalItems + 1,
              username: child.username,
              isValid: true
            });
          }
        });
      });
      this.props.setAddRelatedCustomerDialog({
        show: true,
        isEdit: this.props.relatedCustomerResults.length > 0,
        relatedCustomers,
        relatedCustomerResults: [...this.props.relatedCustomerResults]
      });
    });

    _defineProperty(this, "renderCustomerItem", (customer, index) => {
      let className = '';
      const isInActive = !customer.isSiteActive && customer.isLicensee;

      if (isInActive && customer.custId !== 0) {
        className = 'inactive';
      } else {
        if (customer.custId === 0) {
          className = 'invalid';
        } else {
          className = customer.custId > 0 ? 'customer' : 'guest';
        }
      }

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        key: index,
        className: "customer-item mr-2 mb-2"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "fa fa-times mr-2",
        onClick: () => this.props.removeCustomer(customer)
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: className
      }, customer.username));
    });
  }

  render() {
    const {
      verifyCustomerResults,
      relatedCustomerResults
    } = this.props;
    const showAddRelatedCustomer = verifyCustomerResults.filter(item => item.isHeadline || item.isDirectAccount).length > 0;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Row"], {
      className: "color-guide"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
      sm: "2",
      md: "2"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "customer mr-3"
    }), _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Customer')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
      sm: "2",
      md: "2"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "guest mr-3"
    }), _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Guest')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
      sm: "2",
      md: "2"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "invalid mr-3"
    }), _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Invalid')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], {
      sm: "2",
      md: "2"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "inactive mr-3"
    }), _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Invalid'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Row"], {
      className: "mt-2 mb-2"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Col"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "verify-customer-result"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "customer-items"
    }, verifyCustomerResults.map(this.renderCustomerItem)), showAddRelatedCustomer && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "pt-2",
      onClick: this.handleOpenAddRelatedCustomerDialog
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "add-related-customer"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource(relatedCustomerResults.length > 0 ? 'UpdateRelatedCustomers' : 'AddRelatedCustomers')))))));
  }

}

_defineProperty(VerifyCustomerResult, "defaultProps", {
  verifyCustomerResults: [],
  relatedCustomerResults: []
});

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_4__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    verifyCustomerResults,
    relatedCustomerResults
  } = state;
  return {
    verifyCustomerResults,
    relatedCustomerResults
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(VerifyCustomerResult));

/***/ }),

/***/ "./www/sources/js/pages/feedback/multiple-logs/create/createMultipleLogSlice.js":
/*!**************************************************************************************!*\
  !*** ./www/sources/js/pages/feedback/multiple-logs/create/createMultipleLogSlice.js ***!
  \**************************************************************************************/
/*! exports provided: resetState, setSettings, setVerifyCustomerResults, setReVerifyCustomerResults, removeCustomer, setRelatedCustomerResults, setAddRelatedCustomerDialog, setViewRelatedCustomerDialog, setFeedbackSubjectTemplates, setConfirmCreateMultipleLogsDialog, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetState", function() { return resetState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSettings", function() { return setSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setVerifyCustomerResults", function() { return setVerifyCustomerResults; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setReVerifyCustomerResults", function() { return setReVerifyCustomerResults; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeCustomer", function() { return removeCustomer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setRelatedCustomerResults", function() { return setRelatedCustomerResults; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setAddRelatedCustomerDialog", function() { return setAddRelatedCustomerDialog; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setViewRelatedCustomerDialog", function() { return setViewRelatedCustomerDialog; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setFeedbackSubjectTemplates", function() { return setFeedbackSubjectTemplates; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setConfirmCreateMultipleLogsDialog", function() { return setConfirmCreateMultipleLogsDialog; });
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @reduxjs/toolkit */ "./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");

const initialState = {
  settings: null,
  verifyCustomerResults: [],
  relatedCustomerResults: [],
  feedbackSubjectTemplates: [],
  addRelatedCustomerDialog: {
    show: false
  },
  viewRelatedCustomerDialog: {
    show: false
  },
  confirmCreateMultipleLogsDialog: {
    show: false
  }
};
const createMultipleLogSlice = Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__["createSlice"])({
  name: 'createMultipleLogs',
  initialState: initialState,
  reducers: {
    resetState: () => initialState,
    setSettings: (state, action) => {
      state.settings = action.payload;
    },
    setVerifyCustomerResults: (state, action) => {
      const totalItems = action.payload.length;

      for (let i = 0; i < totalItems; i++) {
        const customer = action.payload[i];
        const index = state.verifyCustomerResults.findIndex(item => item.custId === customer.custId && item.username === customer.username);

        if (index < 0) {
          state.verifyCustomerResults.push(customer);
        }
      }
    },
    setReVerifyCustomerResults: (state, action) => {
      state.verifyCustomerResults = action.payload;
    },
    removeCustomer: (state, action) => {
      const customer = action.payload;

      if (customer.custId === 0) {
        state.verifyCustomerResults = state.verifyCustomerResults.filter(item => item.custId !== 0);
      } else {
        state.verifyCustomerResults = state.verifyCustomerResults.filter(item => item.custId !== customer.custId);
        state.relatedCustomerResults = state.relatedCustomerResults.filter(item => item.custId !== customer.custId);
      }
    },
    setAddRelatedCustomerDialog: (state, action) => {
      state.addRelatedCustomerDialog = action.payload;
    },
    setRelatedCustomerResults: (state, action) => {
      state.relatedCustomerResults = action.payload;
    },
    setViewRelatedCustomerDialog: (state, action) => {
      state.viewRelatedCustomerDialog = action.payload;
    },
    setFeedbackSubjectTemplates: (state, action) => {
      state.feedbackSubjectTemplates = action.payload;
    },
    setConfirmCreateMultipleLogsDialog: (state, action) => {
      state.confirmCreateMultipleLogsDialog = action.payload;
    }
  }
});
const {
  actions,
  reducer
} = createMultipleLogSlice;
const {
  resetState,
  setSettings,
  setVerifyCustomerResults,
  setReVerifyCustomerResults,
  removeCustomer,
  setRelatedCustomerResults,
  setAddRelatedCustomerDialog,
  setViewRelatedCustomerDialog,
  setFeedbackSubjectTemplates,
  setConfirmCreateMultipleLogsDialog
} = actions;
/* harmony default export */ __webpack_exports__["default"] = (reducer);

/***/ }),

/***/ "./www/sources/js/pages/feedback/multiple-logs/create/index.js":
/*!*********************************************************************!*\
  !*** ./www/sources/js/pages/feedback/multiple-logs/create/index.js ***!
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
/* harmony import */ var _createMultipleLogSlice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./createMultipleLogSlice */ "./www/sources/js/pages/feedback/multiple-logs/create/createMultipleLogSlice.js");
/* harmony import */ var _components_AppContainer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/AppContainer */ "./www/sources/js/pages/feedback/multiple-logs/create/components/AppContainer.jsx");
/* harmony import */ var _cssroot_pages_feedback_multiple_logs_create_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @cssroot/pages/feedback/multiple-logs/create.scss */ "./www/sources/css/pages/feedback/multiple-logs/create.scss");
/* harmony import */ var _cssroot_pages_feedback_multiple_logs_create_scss__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_cssroot_pages_feedback_multiple_logs_create_scss__WEBPACK_IMPORTED_MODULE_5__);





const store = Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__["configureStore"])({
  reducer: _createMultipleLogSlice__WEBPACK_IMPORTED_MODULE_3__["default"]
});

class index extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_1__["Provider"], {
      store: store
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "notification-template"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_AppContainer__WEBPACK_IMPORTED_MODULE_4__["default"], null)));
  }

}

/***/ })

}]);
//# sourceMappingURL=14.chunk.js.map