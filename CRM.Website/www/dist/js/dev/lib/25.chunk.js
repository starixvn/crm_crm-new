(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[25],{

/***/ "./www/sources/css/pages/customer/customer-info-detail/index.scss":
/*!************************************************************************!*\
  !*** ./www/sources/css/pages/customer/customer-info-detail/index.scss ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./www/sources/js/pages/customer/customer-info-detail/actions.js":
/*!***********************************************************************!*\
  !*** ./www/sources/js/pages/customer/customer-info-detail/actions.js ***!
  \***********************************************************************/
/*! exports provided: ActionCreators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionCreators", function() { return ActionCreators; });
/* harmony import */ var _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/common/dataService */ "./www/sources/js/common/dataService.js");
/* harmony import */ var _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/common/site */ "./www/sources/js/common/site.js");
/* harmony import */ var _customerInfoDetailSlice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./customerInfoDetailSlice */ "./www/sources/js/pages/customer/customer-info-detail/customerInfoDetailSlice.js");




const getCustomerById = params => async dispatch => {
  _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].blockUI();
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('CustomerInfoDetail/GetCustomerById');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__["default"].postDataAsync(url, params).then(response => {
    dispatch(Object(_customerInfoDetailSlice__WEBPACK_IMPORTED_MODULE_2__["setCustomerById"])(response.data));
  }).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].unblockUI());
};

const getAllSettings = () => async dispatch => {
  _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].blockUI();
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('CustomerInfoDetail/GetAllSettings');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__["default"].getDataAsync(url).then(response => {
    dispatch(Object(_customerInfoDetailSlice__WEBPACK_IMPORTED_MODULE_2__["setAllSettings"])(response.data));
  }).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].unblockUI());
};

const editCustomerInfoDetail = params => async dispatch => {
  _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].blockUI();
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('CustomerInfoDetail/EditCustomerInfoDetail');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__["default"].postDataAsync(url, params).then(response => {
    dispatch(Object(_customerInfoDetailSlice__WEBPACK_IMPORTED_MODULE_2__["setEditCustomerInfoDetail"])(response.data));
  }).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].unblockUI());
};

const ActionCreators = {
  resetState: _customerInfoDetailSlice__WEBPACK_IMPORTED_MODULE_2__["resetState"],
  getCustomerById,
  getAllSettings,
  editCustomerInfoDetail,
  setEditCustomerInfoDetailDialog: _customerInfoDetailSlice__WEBPACK_IMPORTED_MODULE_2__["setEditCustomerInfoDetailDialog"]
};

/***/ }),

/***/ "./www/sources/js/pages/customer/customer-info-detail/common.functions.js":
/*!********************************************************************************!*\
  !*** ./www/sources/js/pages/customer/customer-info-detail/common.functions.js ***!
  \********************************************************************************/
/*! exports provided: ParamsCustomerInfo, ParamsSubmit */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ParamsCustomerInfo", function() { return ParamsCustomerInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ParamsSubmit", function() { return ParamsSubmit; });
/* harmony import */ var _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/common/dateTimeService */ "./www/sources/js/common/dateTimeService.js");

const ParamsCustomerInfo = customerInfo => {
  return {
    titleId: customerInfo.titleId,
    firstName: customerInfo.firstName,
    lastName: customerInfo.lastName,
    birthDay: customerInfo.birthday ? new Date(customerInfo.birthday) : '',
    passport: customerInfo.passport,
    refCode2: customerInfo.refCode2,
    languages: customerInfo.languages,
    siteId: customerInfo.siteId,
    refCode1: customerInfo.refCode1,
    licenseeTypeId: customerInfo.licenseeType,
    isVip: customerInfo.isVIP,
    isIgnored: customerInfo.ignored,
    phoneCountryCode: customerInfo.phoneCountryCode,
    phoneAreaCode: customerInfo.phoneAreaCode,
    phone: customerInfo.phone,
    phone2CountryCode: customerInfo.phone2CountryCode,
    phone2AreaCode: customerInfo.phone2AreaCode,
    phone2: customerInfo.phone2,
    phone3CountryCode: customerInfo.phone3CountryCode,
    phone3AreaCode: customerInfo.phone3AreaCode,
    phone3: customerInfo.phone3,
    checker: customerInfo.checker,
    introducedBy: customerInfo.introducedBy,
    faxCountryCode: customerInfo.faxCountryCode,
    faxAreaCode: customerInfo.faxAreaCode,
    faxNumber: customerInfo.fax,
    mobileCountryCode: customerInfo.mobilePhoneCountryCode,
    mobileAreaCode: customerInfo.mobilePhoneAreaCode,
    mobilePhoneNumber: customerInfo.mobilePhone,
    pic1Name: customerInfo.pic1Name,
    pic1PhoneNumber: customerInfo.pic1,
    pic2Name: customerInfo.pic2Name,
    pic2PhoneNumber: customerInfo.pic2,
    pic3Name: customerInfo.pic3Name,
    pic3PhoneNumber: customerInfo.pic3,
    pic4Name: customerInfo.pic4Name,
    pic4PhoneNumber: customerInfo.pic4,
    skype: customerInfo.skype,
    email: customerInfo.email,
    telegram: customerInfo.msn,
    weChat: customerInfo.weChat,
    whatsApp: customerInfo.whatsApp,
    line: customerInfo.line,
    letstalk: customerInfo.yahoo,
    qq: customerInfo.qq,
    zalo: customerInfo.bbm,
    homeAddressLine1: customerInfo.line1,
    homeAddressLine2: customerInfo.line2,
    homeAddressLine3: customerInfo.line3,
    homeAddressCity: customerInfo.city,
    homeAddressCountryId: customerInfo.countryId,
    homeAddressState: customerInfo.state,
    homeAddressPostCode: customerInfo.postCode,
    bankInfoHolderName: customerInfo.bankHolderName,
    bankInfoName: customerInfo.bankName,
    bankInfoAccNo: customerInfo.bankAccountNumber,
    bankInfoSwiftCode: customerInfo.bankSwiftCode,
    bankAddressLine1: customerInfo.bankAddressLine1,
    bankAddressLine2: customerInfo.bankAddressLine2,
    bankAddressLine3: customerInfo.bankAddressLine3,
    bankAddressCity: customerInfo.bankAddressCity,
    bankAddressCountryId: customerInfo.bankAddressCountryId,
    bankAddressState: customerInfo.bankAddressState,
    bankAddressPostCode: customerInfo.bankAddressPostCode
  };
};
const ParamsSubmit = (custId, values) => {
  return {
    customerId: custId,
    firstName: values.firstName,
    lastName: values.lastName,
    titleId: values.titleId,
    birthDay: values.birthDay ? _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_0__["default"].toShortDateFormat(values.birthDay) : '',
    languageId: values.languages.toString(),
    phone: values.phone,
    phoneCountryCode: values.phoneCountryCode,
    phoneAreaCode: values.phoneAreaCode,
    phone2: values.phone2,
    phone2CountryCode: values.phone2CountryCode,
    phone2AreaCode: values.phone2AreaCode,
    phone3: values.phone3,
    phone3CountryCode: values.phone3CountryCode,
    phone3AreaCode: values.phone3AreaCode,
    passport: values.passport,
    mobilePhone: values.mobilePhoneNumber,
    mobilePhoneCountryCode: values.mobileCountryCode,
    mobilePhoneAreaCode: values.mobileAreaCode,
    fax: values.faxNumber,
    faxCountryCode: values.faxCountryCode,
    faxAreaCode: values.faxAreaCode,
    email: values.email,
    skype: values.skype,
    msn: values.telegram,
    pic1: values.pic1PhoneNumber,
    pic2: values.pic2PhoneNumber,
    pic3: values.pic3PhoneNumber,
    pic4: values.pic4PhoneNumber,
    pic1Name: values.pic1Name,
    pic2Name: values.pic2Name,
    pic3Name: values.pic3Name,
    pic4Name: values.pic4Name,
    siteId: values.siteId,
    bettingCode: values.refCode1,
    refCode2: values.refCode2,
    line1: values.homeAddressLine1,
    line2: values.homeAddressLine2,
    line3: values.homeAddressLine3,
    city: values.homeAddressCity,
    countryId: values.homeAddressCountryId,
    postCode: values.homeAddressPostCode,
    state: values.homeAddressState,
    isVip: values.isVip,
    ignored: values.isIgnored,
    introducedBy: values.introducedBy,
    bankHolderName: values.bankInfoHolderName,
    bankName: values.bankInfoName,
    bankAccountNumber: values.bankInfoAccNo,
    bankSwiftCode: values.bankInfoSwiftCode,
    bankLine1: values.bankAddressLine1,
    bankLine2: values.bankAddressLine2,
    bankLine3: values.bankAddressLine3,
    bankCity: values.bankAddressCity,
    bankCode: values.bankAddressPostCode,
    bankState: values.bankAddressState,
    bankCountryId: values.bankAddressCountryId,
    licenseeType: values.licenseeTypeId,
    whatsApp: values.whatsApp,
    line: values.line,
    weChat: values.weChat,
    yahoo: values.letstalk,
    qq: values.qq,
    bbm: values.zalo
  };
};

/***/ }),

/***/ "./www/sources/js/pages/customer/customer-info-detail/components/AppContainer.jsx":
/*!****************************************************************************************!*\
  !*** ./www/sources/js/pages/customer/customer-info-detail/components/AppContainer.jsx ***!
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
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/customer/customer-info-detail/actions.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _jsroot_components_SweetModalDialog__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/components/SweetModalDialog */ "./www/sources/js/components/SweetModalDialog.jsx");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var _EditForm__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./EditForm */ "./www/sources/js/pages/customer/customer-info-detail/components/EditForm.jsx");
/* harmony import */ var _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @jsroot/common/constants */ "./www/sources/js/common/constants.js");
/* harmony import */ var _jsroot_common_shareScripts__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @jsroot/common/shareScripts */ "./www/sources/js/common/shareScripts.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }












class AppContainer extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleCloseEditDetailDialog", () => {
      this.props.setEditCustomerInfoDetailDialog({
        show: false
      });
    });

    this.state = {
      customerInfoPolicy: null,
      updateHeadlineInfoPolicy: null
    };
  }

  componentDidMount() {
    Object(_jsroot_common_shareScripts__WEBPACK_IMPORTED_MODULE_10__["getPermission"])(_jsroot_common_constants__WEBPACK_IMPORTED_MODULE_9__["FunctionKey"].CreateUpdateFeedbackAndCustomerInfo).then(response => {
      this.setState({
        customerInfoPolicy: response
      });
    });
    Object(_jsroot_common_shareScripts__WEBPACK_IMPORTED_MODULE_10__["getPermission"])(_jsroot_common_constants__WEBPACK_IMPORTED_MODULE_9__["FunctionKey"].Updateheadlineinfo).then(response => {
      this.setState({
        updateHeadlineInfoPolicy: response
      });
    });
  }

  componentWillUnmount() {
    this.props.resetState();
  }

  render() {
    const {
      customerInfoPolicy,
      updateHeadlineInfoPolicy
    } = this.state;

    if (!customerInfoPolicy || !updateHeadlineInfoPolicy) {
      return null;
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_EditForm__WEBPACK_IMPORTED_MODULE_8__["default"], {
      id: this.props.id,
      customerInfoPolicy: customerInfoPolicy,
      updateHeadlineInfoPolicy: updateHeadlineInfoPolicy
    }), this.props.editCustomerInfoDetailDialog.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_SweetModalDialog__WEBPACK_IMPORTED_MODULE_5__["default"], {
      size: "sm",
      title: _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Confirmation'),
      contents: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('EditCustomerInfoSuccessfully')),
      buttons: [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_7__["Button"], {
        variant: "primary",
        size: "sm",
        onClick: this.handleCloseEditDetailDialog
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('OK'))],
      onClose: this.handleCloseEditDetailDialog
    }));
  }

}

_defineProperty(AppContainer, "propTypes", {
  editCustomerInfoDetailDialog: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    show: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool
  }).isRequired,
  getCustomerById: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func
});

_defineProperty(AppContainer, "defaultProps", {
  editCustomerInfoDetailDialog: {
    show: false
  },
  getCustomerById: function () {//nothing
  }
});

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_4__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    editCustomerInfoDetailDialog
  } = state;
  return {
    editCustomerInfoDetailDialog
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(AppContainer));

/***/ }),

/***/ "./www/sources/js/pages/customer/customer-info-detail/components/EditForm.jsx":
/*!************************************************************************************!*\
  !*** ./www/sources/js/pages/customer/customer-info-detail/components/EditForm.jsx ***!
  \************************************************************************************/
/*! exports provided: EditForm, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditForm", function() { return EditForm; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/customer/customer-info-detail/actions.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var _jsroot_components_date_picker_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/components/date-picker/index */ "./www/sources/js/components/date-picker/index.jsx");
/* harmony import */ var _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/common/dateTimeService */ "./www/sources/js/common/dateTimeService.js");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var _components_multiple_select_index__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../components/multiple-select/index */ "./www/sources/js/components/multiple-select/index.jsx");
/* harmony import */ var _jsroot_components_SelectWithSearch__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @jsroot/components/SelectWithSearch */ "./www/sources/js/components/SelectWithSearch.jsx");
/* harmony import */ var _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @jsroot/common/constants */ "./www/sources/js/common/constants.js");
/* harmony import */ var _common_functions__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../common.functions */ "./www/sources/js/pages/customer/customer-info-detail/common.functions.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }













class EditForm extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleCollapseExpand", (section = '') => {
      this.setState(prevState => ({
        collapse: _objectSpread(_objectSpread({}, prevState.collapse), {}, {
          [section]: !prevState.collapse[section]
        })
      }));
    });

    _defineProperty(this, "handleChange", event => {
      const name = event.target.name;
      this.setState({
        [name]: event.target.type === 'select-one' ? parseInt(event.target.value, 10) : event.target.value
      });
    });

    _defineProperty(this, "handleChangeValue", (name, value) => {
      this.setState({
        [name]: value
      });
    });

    _defineProperty(this, "handleChangeCheck", event => {
      const name = event.target.name;
      this.setState({
        [name]: event.target.checked
      });
    });

    _defineProperty(this, "handleSubmit", event => {
      this.setState({
        isSubmitting: true
      });
      event.preventDefault();
      const values = this.state;
      const {
        customerInfo
      } = this.props;
      const params = Object(_common_functions__WEBPACK_IMPORTED_MODULE_11__["ParamsSubmit"])(customerInfo.custId, values);
      this.props.editCustomerInfoDetail(params).then(() => {
        if (this.props.editCustomerInfoDetailResult.isSuccessful) {
          this.props.setEditCustomerInfoDetailDialog({
            show: true
          });
          this.setState({
            isSubmitting: false
          });
        } else {
          this.setState({
            isSubmitting: false
          });
        }
      });
    });

    _defineProperty(this, "renderOptions", (name, item) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
      key: item,
      value: item
    }, name));

    _defineProperty(this, "renderCheckVipIgnore", (data, values) => {
      if (!data.isHeadline && (data.isSuper || data.isDirectAccount || data.isGuest)) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
          sm: "1",
          md: "1"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Check, {
          type: "checkbox",
          label: _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('VIP'),
          checked: values.isVip,
          name: "isVip",
          id: "isVip",
          onChange: event => this.handleChangeCheck(event)
        })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
          sm: "1",
          md: "1"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Check, {
          type: "checkbox",
          label: _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Ignore'),
          checked: values.isIgnored,
          name: "isIgnored",
          id: "isIgnored",
          onChange: event => this.handleChangeCheck(event)
        })));
      }

      return null;
    });

    _defineProperty(this, "renderPersonalInfo", values => {
      const {
        customerInfo
      } = this.props;
      const languageSelected = this.props.allSettings.languages.map(item => {
        return {
          languageId: item.languageId,
          name: item.name,
          checked: values.languages.includes(item.languageId)
        };
      });
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "panel-group border-bottom-0"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"],
        className: "panel-title",
        onClick: () => this.handleCollapseExpand('personalInfo'),
        "aria-controls": "collapse-expand-personalInfo",
        "aria-expanded": !this.state.collapse.personalInfo
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, null, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('PersonalInfo'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Collapse"], {
        in: !this.state.collapse.personalInfo
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "panel-content"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"],
        className: "pt-2"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "4",
        md: "4"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "4",
        md: "4",
        htmlFor: "title"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Title')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "8",
        md: "8"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        as: "select",
        size: "sm",
        className: "shadow-none",
        value: values.titleId,
        name: "titleId",
        id: "titleId",
        onChange: this.handleChange
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        value: "0"
      }), this.props.allSettings.titles.map(item => this.renderOptions(item.value, item.id)))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "4",
        md: "4"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "4",
        md: "4",
        htmlFor: "firstName"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('FirstName')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "8",
        md: "8"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        type: "text",
        size: "sm",
        className: "shadow-none",
        value: values.firstName,
        name: "firstName",
        id: "firstName",
        autoComplete: "off",
        onChange: this.handleChange
      })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "4",
        md: "4"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "4",
        md: "4",
        htmlFor: "lastName"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('LastName')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "8",
        md: "8"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        type: "text",
        size: "sm",
        className: "shadow-none",
        value: values.lastName,
        name: "lastName",
        id: "lastName",
        autoComplete: "off",
        onChange: this.handleChange
      }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "4",
        md: "4"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "4",
        md: "4",
        htmlFor: "birthDay"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Birthday')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "8",
        md: "8",
        className: "react-datepicker-wrapper-container form-control-wrapper"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_date_picker_index__WEBPACK_IMPORTED_MODULE_5__["default"], {
        dropdownMode: "select",
        showMonthDropdown: true,
        showYearDropdown: true,
        selected: values.birthDay,
        maxDate: values.maxDate,
        onChange: value => this.handleChangeValue('birthDay', value)
      })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "4",
        md: "4"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "4",
        md: "4",
        htmlFor: "passPortNo"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('PassportNo')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "8",
        md: "8"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        type: "text",
        size: "sm",
        className: "shadow-none",
        value: values.passport,
        name: "passport",
        id: "passport",
        autoComplete: "off",
        onChange: this.handleChange
      })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "4",
        md: "4"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "4",
        md: "4",
        htmlFor: "refCodes"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('RefCodes')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "8",
        md: "8"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        type: "text",
        size: "sm",
        className: "shadow-none",
        value: values.refCode2,
        id: "refCode2",
        autoComplete: "off",
        name: "refCode2",
        onChange: this.handleChange
      }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        md: "4",
        sm: "4"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        htmlFor: "languages",
        column: true,
        sm: "4",
        md: "4"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Languages')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        md: "8",
        sm: "8"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_multiple_select_index__WEBPACK_IMPORTED_MODULE_8__["default"], {
        dataSource: languageSelected,
        keyField: "languageId",
        valueField: "name",
        isAllTextShown: true,
        isNAOption: true,
        onChange: (currentItem, selectedItemsKey) => {
          this.handleChangeValue('languages', selectedItemsKey);
        }
      })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "4",
        md: "4"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "4",
        md: "4",
        htmlFor: "site"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Site')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "8",
        md: "8"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_SelectWithSearch__WEBPACK_IMPORTED_MODULE_9__["default"], {
        className: "basic-single",
        options: this.props.allSettings.sites,
        value: values.siteId,
        name: customerInfo.siteSetting.name,
        isHideNA: false,
        OnChangeValue: item => this.handleChangeValue('siteId', item.id)
      })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "4",
        md: "4"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "4",
        md: "4",
        htmlFor: "secretCode"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('SecretCode')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "8",
        md: "8"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        type: "text",
        size: "sm",
        className: "shadow-none",
        value: values.refCode1,
        name: "refCode1",
        id: "refCode1",
        autoComplete: "off",
        onChange: this.handleChange
      }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "4",
        md: "4"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "4",
        md: "4",
        htmlFor: "licenseeTypes"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('LicenseeType')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "8",
        md: "8"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        as: "select",
        size: "sm",
        className: "shadow-none",
        value: values.licenseeTypeId,
        id: "licenseeTypeId",
        name: "licenseeTypeId",
        onChange: this.handleChange
      }, this.props.allSettings.licenseeTypes.map(item => this.renderOptions(item.name, item.id)))))), this.renderCheckVipIgnore(customerInfo, values)))));
    });

    _defineProperty(this, "renderHeadlineInfo", (values, canEditHeadline) => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "panel-group border-bottom-0"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"],
        className: "panel-title",
        onClick: () => this.handleCollapseExpand('headlineInfo'),
        "aria-controls": "collapse-expand-headlineInfo",
        "aria-expanded": !this.state.collapse.headlineInfo
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        htmlFor: "headlineInfo"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('HeadlineInfo'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Collapse"], {
        in: !this.state.collapse.headlineInfo
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "panel-content"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"],
        className: "pt-2"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "4",
        md: "4"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "4",
        md: "4",
        htmlFor: "checker"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Checker')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "8",
        md: "8"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        type: "text",
        size: "sm",
        className: "shadow-none",
        value: values.checker,
        disabled: true,
        name: "checker",
        id: "checker",
        autoComplete: "off",
        onChange: this.handleChange
      })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "4",
        md: "4"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "4",
        md: "4",
        htmlFor: "introducedBy"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('IntroducedBy')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "8",
        md: "8"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        type: "text",
        size: "sm",
        className: "shadow-none",
        value: values.introducedBy,
        disabled: !canEditHeadline,
        name: "introducedBy",
        id: "introducedBy",
        autoComplete: "off",
        onChange: this.handleChange
      })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "1",
        md: "1"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Check, {
        type: "checkbox",
        label: _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('VIP'),
        checked: values.isVip,
        name: "isVip",
        id: "isVip",
        disabled: !canEditHeadline,
        onChange: event => this.handleChangeCheck(event)
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "1",
        md: "1"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Check, {
        type: "checkbox",
        label: _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Ignore'),
        checked: values.isIgnored,
        name: "isIgnored",
        id: "isIgnored",
        disabled: !canEditHeadline,
        onChange: event => this.handleChangeCheck(event)
      }))))));
    });

    _defineProperty(this, "renderCommunicationTool", values => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "4",
        md: "4"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "4",
        md: "4",
        htmlFor: "skype"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Skype')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "8",
        md: "8"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        type: "text",
        size: "sm",
        className: "shadow-none",
        value: values.skype,
        name: "skype",
        id: "skype",
        autoComplete: "off",
        onChange: this.handleChange
      })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "4",
        md: "4"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "4",
        md: "4",
        htmlFor: "email"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Email')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "8",
        md: "8"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        type: "text",
        size: "sm",
        className: "shadow-none",
        value: values.email,
        name: "email",
        id: "email",
        autoComplete: "off",
        onChange: this.handleChange
      })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "4",
        md: "4"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "4",
        md: "4",
        htmlFor: "telegram"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Telegram')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "8",
        md: "8"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        type: "text",
        size: "sm",
        className: "shadow-none",
        value: values.telegram,
        name: "telegram",
        id: "telegram",
        autoComplete: "off",
        onChange: this.handleChange
      }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "4",
        md: "4"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "4",
        md: "4",
        htmlFor: "weChats"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('WeChat')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "8",
        md: "8"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        type: "text",
        size: "sm",
        className: "shadow-none",
        value: values.weChat,
        name: "weChat",
        id: "weChat",
        autoComplete: "off",
        onChange: this.handleChange
      })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "4",
        md: "4"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "4",
        md: "4",
        htmlFor: "whatApp"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('WhatApp')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "8",
        md: "8"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        type: "text",
        size: "sm",
        className: "shadow-none",
        value: values.whatsApp,
        name: "whatsApp",
        id: "whatsApp",
        autoComplete: "off",
        onChange: this.handleChange
      })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "4",
        md: "4"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "4",
        md: "4",
        htmlFor: "line"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Line')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "8",
        md: "8"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        type: "text",
        size: "sm",
        className: "shadow-none",
        value: values.line,
        name: "line",
        id: "line",
        autoComplete: "off",
        onChange: this.handleChange
      }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "4",
        md: "4"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "4",
        md: "4",
        htmlFor: "letstalks"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Letstalk')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "8",
        md: "8"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        type: "text",
        size: "sm",
        className: "shadow-none",
        value: values.letstalk,
        name: "letstalk",
        id: "letstalk",
        autoComplete: "off",
        onChange: this.handleChange
      })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "4",
        md: "4"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "4",
        md: "4",
        htmlFor: "qq"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('QQ')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "8",
        md: "8"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        type: "text",
        size: "sm",
        className: "shadow-none",
        value: values.qq,
        name: "qq",
        id: "qq",
        autoComplete: "off",
        onChange: this.handleChange
      })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "4",
        md: "4"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "4",
        md: "4",
        htmlFor: "zalo"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Zalo')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "8",
        md: "8"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        type: "text",
        size: "sm",
        className: "shadow-none",
        value: values.zalo,
        name: "zalo",
        id: "zalo",
        autoComplete: "off",
        onChange: this.handleChange
      }))))));
    });

    _defineProperty(this, "renderCustomerInformation", values => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        md: "4",
        sm: "4"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "4",
        md: "4",
        htmlFor: "fax"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Fax')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        md: "8",
        sm: "8"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "d-flex"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "code-country"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        name: "faxCountryCode",
        id: "faxCountryCode",
        autoComplete: "off",
        value: values.faxCountryCode,
        type: "text",
        size: "sm",
        className: "shadow-none",
        onChange: this.handleChange
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "code-area"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        type: "text",
        size: "sm",
        className: "shadow-none",
        value: values.faxAreaCode,
        name: "faxAreaCode",
        id: "faxAreaCode",
        autoComplete: "off",
        onChange: this.handleChange
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "phone"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        type: "text",
        size: "sm",
        className: "shadow-none",
        value: values.faxNumber,
        name: "faxNumber",
        id: "faxNumber",
        autoComplete: "off",
        onChange: this.handleChange
      })))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "4",
        md: "4"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "4",
        md: "4",
        htmlFor: "mobiles"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Mobile')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "8",
        md: "8"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "d-flex"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "code-country"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        value: values.mobileCountryCode,
        size: "sm",
        className: "shadow-none",
        type: "text",
        name: "mobileCountryCode",
        id: "mobileCountryCode",
        autoComplete: "off",
        onChange: this.handleChange
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "code-area"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        type: "text",
        size: "sm",
        className: "shadow-none",
        value: values.mobileAreaCode,
        name: "mobileAreaCode",
        id: "mobileAreaCode",
        autoComplete: "off",
        onChange: this.handleChange
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "phone"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        type: "text",
        size: "sm",
        className: "shadow-none",
        onChange: this.handleChange,
        id: "mobilePhoneNumber",
        autoComplete: "off",
        name: "mobilePhoneNumber",
        value: values.mobilePhoneNumber
      })))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        md: "4",
        sm: "4"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        md: "4",
        column: true,
        sm: "4",
        htmlFor: "pic1"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('PIC1')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "8",
        md: "8"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "d-flex"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "picName"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        type: "text",
        size: "sm",
        className: "shadow-none",
        value: values.pic1Name,
        name: "pic1Name",
        id: "pic1Name",
        autoComplete: "off",
        onChange: this.handleChange
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "phone"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        type: "text",
        size: "sm",
        className: "shadow-none",
        value: values.pic1PhoneNumber,
        name: "pic1PhoneNumber",
        id: "pic1PhoneNumber",
        autoComplete: "off",
        onChange: this.handleChange
      }))))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "4",
        md: "4"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "4",
        md: "4",
        htmlFor: "pic2"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('PIC2')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "8",
        md: "8"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "d-flex"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "picName"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        type: "text",
        size: "sm",
        className: "shadow-none",
        value: values.pic2Name,
        name: "pic2Name",
        id: "pic2Name",
        autoComplete: "off",
        onChange: this.handleChange
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "phone"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        type: "text",
        size: "sm",
        className: "shadow-none",
        value: values.pic2PhoneNumber,
        name: "pic2PhoneNumber",
        id: "pic2PhoneNumber",
        autoComplete: "off",
        onChange: this.handleChange
      })))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "4",
        md: "4"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        sm: "4",
        md: "4",
        column: true,
        htmlFor: "pic3"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('PIC3')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "8",
        md: "8"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "d-flex"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "picName"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        type: "text",
        size: "sm",
        className: "shadow-none",
        value: values.pic3Name,
        name: "pic3Name",
        id: "pic3Name",
        autoComplete: "off",
        onChange: this.handleChange
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "phone"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        type: "text",
        size: "sm",
        className: "shadow-none",
        value: values.pic3PhoneNumber,
        name: "pic3PhoneNumber",
        autoComplete: "off",
        onChange: this.handleChange,
        id: "pic3PhoneNumber"
      })))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "4",
        md: "4"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        htmlFor: "pic4",
        sm: "4",
        md: "4",
        column: true
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('PIC4')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        md: "8",
        sm: "8"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "d-flex"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "picName"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        type: "text",
        size: "sm",
        className: "shadow-none",
        value: values.pic4Name,
        name: "pic4Name",
        id: "pic4Name",
        autoComplete: "off",
        onChange: this.handleChange
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "phone"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        type: "text",
        size: "sm",
        className: "shadow-none",
        value: values.pic4PhoneNumber,
        name: "pic4PhoneNumber",
        id: "pic4PhoneNumber",
        autoComplete: "off",
        onChange: this.handleChange
      }))))))));
    });

    _defineProperty(this, "renderCommunicationInfo", values => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "panel-group border-bottom-0"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"],
        className: "panel-title",
        onClick: () => this.handleCollapseExpand('communicationInfo'),
        "aria-controls": "collapse-expand-communicationInfo",
        "aria-expanded": !this.state.collapse.communicationInfo
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        htmlFor: "communicationInfo"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('CommunicationInfo'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Collapse"], {
        in: !this.state.collapse.communicationInfo
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "panel-content"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"],
        className: "pt-2"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "4",
        md: "4"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "4",
        md: "4",
        htmlFor: "phone1"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Phone1')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "8",
        md: "8"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "d-flex"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "code-country"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        className: "shadow-none",
        type: "text",
        size: "sm",
        value: values.phoneCountryCode,
        name: "phoneCountryCode",
        id: "phoneCountryCode",
        autoComplete: "off",
        onChange: this.handleChange
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "code-area"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        type: "text",
        size: "sm",
        className: "shadow-none",
        value: values.phoneAreaCode,
        name: "phoneAreaCode",
        id: "phoneAreaCode",
        autoComplete: "off",
        onChange: this.handleChange
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "phone"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        type: "text",
        size: "sm",
        className: "shadow-none",
        value: values.phone,
        name: "phone",
        onChange: this.handleChange,
        id: "phone",
        autoComplete: "off"
      })))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "4",
        md: "4"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "4",
        htmlFor: "phone2",
        md: "4"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Phone2')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "8",
        md: "8"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "d-flex"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "code-country"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        size: "sm",
        type: "text",
        className: "shadow-none",
        value: values.phone2CountryCode,
        name: "phone2CountryCode",
        id: "phone2CountryCode",
        autoComplete: "off",
        onChange: this.handleChange
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "code-area"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        type: "text",
        size: "sm",
        className: "shadow-none",
        value: values.phone2AreaCode,
        name: "phone2AreaCode",
        id: "phone2AreaCode",
        autoComplete: "off",
        onChange: this.handleChange
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "phone"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        type: "text",
        name: "phone2",
        id: "phone2",
        value: values.phone2,
        size: "sm",
        className: "shadow-none",
        autoComplete: "off",
        onChange: this.handleChange
      })))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        md: "4",
        sm: "4"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        md: "4",
        column: true,
        sm: "4",
        htmlFor: "phone3"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Phone3')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "8",
        md: "8"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "d-flex"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "code-country"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        className: "shadow-none",
        type: "text",
        size: "sm",
        value: values.phone3CountryCode,
        name: "phone3CountryCode",
        id: "phone3CountryCode",
        autoComplete: "off",
        onChange: this.handleChange
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "code-area"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        type: "text",
        size: "sm",
        className: "shadow-none",
        value: values.phone3AreaCode,
        name: "phone3AreaCode",
        id: "phone3AreaCode",
        autoComplete: "off",
        onChange: this.handleChange
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "phone"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        type: "text",
        size: "sm",
        className: "shadow-none",
        value: values.phone3,
        name: "phone3",
        id: "phone3",
        autoComplete: "off",
        onChange: this.handleChange
      }))))))), this.renderCustomerInformation(values), this.renderCommunicationTool(values))));
    });

    _defineProperty(this, "renderHomeAddress", values => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "panel-group border-bottom-0"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"],
        className: "panel-title",
        onClick: () => this.handleCollapseExpand('homeAddress'),
        "aria-controls": "collapse-expand-homeAddress",
        "aria-expanded": !this.state.collapse.homeAddress
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        htmlFor: "homeAddress"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('HomeAddress'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Collapse"], {
        in: !this.state.collapse.homeAddress
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "panel-content"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"],
        className: "pt-2"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "12",
        md: "12"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "2",
        md: "2",
        htmlFor: "line1"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Line1')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "10",
        md: "10"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        type: "text",
        size: "sm",
        className: "shadow-none",
        autoComplete: "off",
        onChange: this.handleChange,
        value: values.homeAddressLine1,
        id: "homeAddressLine1",
        name: "homeAddressLine1"
      }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        md: "12",
        sm: "12"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        sm: "2",
        column: true,
        md: "2",
        htmlFor: "line2"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Line2')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        md: "10",
        sm: "10"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        type: "text",
        size: "sm",
        className: "shadow-none",
        value: values.homeAddressLine2,
        name: "homeAddressLine2",
        id: "homeAddressLine2",
        autoComplete: "off",
        onChange: this.handleChange
      }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "12",
        md: "12"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        htmlFor: "line3",
        column: true,
        sm: "2",
        md: "2"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Line3')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        md: "10",
        sm: "10"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        size: "sm",
        className: "shadow-none",
        value: values.homeAddressLine3,
        name: "homeAddressLine3",
        type: "text",
        id: "homeAddressLine3",
        autoComplete: "off",
        onChange: this.handleChange
      }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        md: "6",
        sm: "6"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        sm: "4",
        column: true,
        md: "4",
        htmlFor: "city"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('City')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "8",
        md: "8"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        type: "text",
        size: "sm",
        className: "shadow-none",
        value: values.homeAddressCity,
        name: "homeAddressCity",
        id: "homeAddressCity",
        autoComplete: "off",
        onChange: this.handleChange
      })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "6",
        md: "6"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        sm: "4",
        md: "4",
        htmlFor: "state",
        column: true
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('State')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "8",
        md: "8"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        type: "text",
        value: values.homeAddressState,
        autoComplete: "off",
        onChange: this.handleChange,
        name: "homeAddressState",
        size: "sm",
        className: "shadow-none",
        id: "homeAddressState"
      }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "6",
        md: "6"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "4",
        md: "4",
        htmlFor: "country"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Country')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "8",
        md: "8"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        as: "select",
        size: "sm",
        className: "shadow-none",
        value: values.homeAddressCountryId,
        name: "homeAddressCountryId",
        id: "homeAddressCountryId",
        autoComplete: "off",
        onChange: this.handleChange
      }, this.props.allSettings.countries.map(item => this.renderOptions(item.name, item.id)))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "6",
        md: "6"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "4",
        md: "4",
        htmlFor: "postCode"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('PostCode')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "8",
        md: "8"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        type: "text",
        size: "sm",
        className: "shadow-none",
        value: values.homeAddressPostCode,
        name: "homeAddressPostCode",
        id: "homeAddressPostCode",
        autoComplete: "off",
        onChange: this.handleChange
      }))))))));
    });

    _defineProperty(this, "renderBankInfo", values => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "panel-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"],
        className: "panel-title",
        onClick: () => this.handleCollapseExpand('bankInfo'),
        "aria-controls": "collapse-expand-bankInfo",
        "aria-expanded": !this.state.collapse.bankInfo
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        htmlFor: "bankInfo"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('BankInfo'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Collapse"], {
        in: !this.state.collapse.bankInfo
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "panel-content"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"],
        className: "pt-2"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "6",
        md: "6"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "4",
        md: "4",
        htmlFor: "accName"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('AccName')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "8",
        md: "8"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        type: "text",
        size: "sm",
        className: "shadow-none",
        value: values.bankInfoHolderName,
        name: "bankInfoHolderName",
        id: "bankInfoHolderName",
        autoComplete: "off",
        onChange: this.handleChange
      })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        md: "6",
        sm: "6"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        sm: "4",
        md: "4",
        column: true,
        htmlFor: "bankName"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('BankName')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        md: "8",
        sm: "8"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        type: "text",
        size: "sm",
        className: "shadow-none",
        value: values.bankInfoName,
        name: "bankInfoName",
        id: "bankInfoName",
        autoComplete: "off",
        onChange: this.handleChange
      }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "6",
        md: "6"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        md: "4",
        column: true,
        sm: "4",
        htmlFor: "accountNo"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('AccountNo')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "8",
        md: "8"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        type: "text",
        size: "sm",
        className: "shadow-none",
        value: values.bankInfoAccNo,
        name: "bankInfoAccNo",
        id: "bankInfoAccNo",
        autoComplete: "off",
        onChange: this.handleChange
      })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "6",
        md: "6"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        md: "4",
        htmlFor: "iBanSwiftCode",
        column: true,
        sm: "4"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('IBanSwiftCode')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "8",
        md: "8"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        type: "text",
        size: "sm",
        className: "shadow-none",
        value: values.bankInfoSwiftCode,
        name: "bankInfoSwiftCode",
        id: "bankInfoSwiftCode",
        autoComplete: "off",
        onChange: this.handleChange
      }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "12",
        md: "12"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        md: "2",
        sm: "2",
        htmlFor: "bankLine1"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Line1')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "10",
        md: "10"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        type: "text",
        size: "sm",
        className: "shadow-none",
        value: values.bankAddressLine1,
        name: "bankAddressLine1",
        id: "bankAddressLine1",
        autoComplete: "off",
        onChange: this.handleChange
      }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "12",
        md: "12"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "2",
        md: "2",
        htmlFor: "bankLine2"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Line2')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        md: "10",
        sm: "10"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        type: "text",
        size: "sm",
        className: "shadow-none",
        value: values.bankAddressLine2,
        name: "bankAddressLine2",
        id: "bankAddressLine2",
        autoComplete: "off",
        onChange: this.handleChange
      }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        md: "12",
        sm: "12"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        htmlFor: "bankLine3",
        sm: "2",
        md: "2",
        column: true
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Line3')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "10",
        md: "10"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        type: "text",
        value: values.bankAddressLine3,
        name: "bankAddressLine3",
        id: "bankAddressLine3",
        size: "sm",
        className: "shadow-none",
        autoComplete: "off",
        onChange: this.handleChange
      }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        md: "6",
        sm: "6"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        htmlFor: "bankCity",
        column: true,
        md: "4",
        sm: "4"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('City')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "8",
        md: "8"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        type: "text",
        size: "sm",
        className: "shadow-none",
        value: values.bankAddressCity,
        name: "bankAddressCity",
        id: "bankAddressCity",
        autoComplete: "off",
        onChange: this.handleChange
      })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "6",
        md: "6"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "4",
        htmlFor: "bankState",
        md: "4"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('State')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        md: "8",
        sm: "8"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        type: "text",
        size: "sm",
        className: "shadow-none",
        value: values.bankAddressState,
        autoComplete: "off",
        onChange: this.handleChange,
        name: "bankAddressState",
        id: "bankAddressState"
      }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        md: "6",
        sm: "6"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        sm: "4",
        column: true,
        md: "4",
        htmlFor: "bankCountry"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Country')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        md: "8",
        sm: "8"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        as: "select",
        size: "sm",
        className: "shadow-none",
        value: values.bankAddressCountryId,
        name: "bankAddressCountryId",
        id: "bankAddressCountryId",
        autoComplete: "off",
        onChange: this.handleChange
      }, this.props.allSettings.countries.map(element => this.renderOptions(element.name, element.id)))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "6",
        md: "6"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        md: "4",
        sm: "4",
        htmlFor: "bankPostCode"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('PostCode')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "8",
        md: "8"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        type: "text",
        size: "sm",
        id: "bankAddressPostCode",
        className: "shadow-none",
        name: "bankAddressPostCode",
        value: values.bankAddressPostCode,
        autoComplete: "off",
        onChange: this.handleChange
      }))))))));
    });

    const currentClientTime = window.currentClientTime;
    this.state = {
      collapse: {
        personalInfo: false,
        communicationInfo: false,
        headlineInfo: false,
        homeAddress: false,
        bankInfo: false
      },
      isSubmitting: false,
      titleId: 0,
      firstName: '',
      lastName: '',
      maxDate: new Date(_jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__["default"].toShortDateFormat(new Date(currentClientTime))),
      birthDay: '',
      passport: '',
      refCode2: '',
      languages: [],
      siteId: 0,
      refCode1: '',
      licenseeTypeId: 0,
      isVip: false,
      isIgnored: false,
      phoneCountryCode: '',
      phoneAreaCode: '',
      phone: '',
      phone2CountryCode: '',
      phone2AreaCode: '',
      phone2: '',
      phone3CountryCode: '',
      phone3AreaCode: '',
      phone3: '',
      checker: '',
      introducedBy: '',
      faxCountryCode: '',
      faxAreaCode: '',
      faxNumber: '',
      mobileCountryCode: '',
      mobileAreaCode: '',
      mobilePhoneNumber: '',
      pic1Name: '',
      pic1PhoneNumber: '',
      pic2Name: '',
      pic2PhoneNumber: '',
      pic3Name: '',
      pic3PhoneNumber: '',
      pic4Name: '',
      pic4PhoneNumber: '',
      skype: '',
      email: '',
      telegram: '',
      weChat: '',
      whatsApp: '',
      line: '',
      letstalk: '',
      qq: '',
      zalo: '',
      homeAddressLine1: '',
      homeAddressLine2: '',
      homeAddressLine3: '',
      homeAddressCity: '',
      homeAddressCountryId: 0,
      homeAddressState: '',
      homeAddressPostCode: '',
      bankInfoHolderName: '',
      bankInfoName: '',
      bankInfoAccNo: '',
      bankInfoSwiftCode: '',
      bankAddressLine1: '',
      bankAddressLine2: '',
      bankAddressLine3: '',
      bankAddressCity: '',
      bankAddressCountryId: 0,
      bankAddressState: '',
      bankAddressPostCode: ''
    };
  }

  async componentDidMount() {
    await this.props.getAllSettings();
    await this.props.getCustomerById({
      customerId: this.props.id
    });
    const {
      customerInfo
    } = this.props;
    const params = Object(_common_functions__WEBPACK_IMPORTED_MODULE_11__["ParamsCustomerInfo"])(customerInfo);
    this.setState(params);
  }

  render() {
    const {
      allSettings,
      customerInfo,
      updateHeadlineInfoPolicy,
      customerInfoPolicy
    } = this.props;
    const values = this.state;
    const updatePolicy = updateHeadlineInfoPolicy;
    const customerPolicy = customerInfoPolicy;
    const canEditHeadline = updatePolicy === _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_10__["Policy"].Host;

    if (!allSettings || !customerInfo) {
      return null;
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"], {
      onSubmit: this.handleSubmit
    }, this.renderPersonalInfo(values), customerInfo.isHeadLine && (updatePolicy === _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_10__["Policy"].Read || canEditHeadline) && this.renderHeadlineInfo(values, canEditHeadline), this.renderCommunicationInfo(values), this.renderHomeAddress(values), this.renderBankInfo(values), customerPolicy === _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_10__["Policy"].Host && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], {
      type: "submit",
      variant: "primary",
      size: "sm",
      className: "mt-3",
      disabled: this.state.isSubmitting
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Save')));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_3__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    allSettings,
    customerInfo,
    editCustomerInfoDetailResult
  } = state;
  return {
    allSettings,
    customerInfo,
    editCustomerInfoDetailResult
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(EditForm));

/***/ }),

/***/ "./www/sources/js/pages/customer/customer-info-detail/customerInfoDetailSlice.js":
/*!***************************************************************************************!*\
  !*** ./www/sources/js/pages/customer/customer-info-detail/customerInfoDetailSlice.js ***!
  \***************************************************************************************/
/*! exports provided: resetState, setCustomerById, setAllSettings, setEditCustomerInfoDetail, setEditCustomerInfoDetailDialog, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetState", function() { return resetState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setCustomerById", function() { return setCustomerById; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setAllSettings", function() { return setAllSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setEditCustomerInfoDetail", function() { return setEditCustomerInfoDetail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setEditCustomerInfoDetailDialog", function() { return setEditCustomerInfoDetailDialog; });
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @reduxjs/toolkit */ "./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");

const initialState = {
  customerInfo: null,
  allSettings: null,
  editCustomerInfoDetailResult: '',
  editCustomerInfoDetailDialog: {
    show: false
  }
};
const customerInfoDetailSlice = Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__["createSlice"])({
  name: 'customerInfoDetail',
  initialState: initialState,
  reducers: {
    resetState: () => initialState,
    setCustomerById: (state, action) => {
      state.customerInfo = action.payload;
    },
    setAllSettings: (state, action) => {
      state.allSettings = action.payload;
    },
    setEditCustomerInfoDetail: (state, action) => {
      state.editCustomerInfoDetailResult = action.payload;
    },
    setEditCustomerInfoDetailDialog: (state, action) => {
      state.editCustomerInfoDetailDialog = action.payload;
    }
  }
});
const {
  actions,
  reducer
} = customerInfoDetailSlice;
const {
  resetState,
  setCustomerById,
  setAllSettings,
  setEditCustomerInfoDetail,
  setEditCustomerInfoDetailDialog
} = actions;
/* harmony default export */ __webpack_exports__["default"] = (reducer);

/***/ }),

/***/ "./www/sources/js/pages/customer/customer-info-detail/index.js":
/*!*********************************************************************!*\
  !*** ./www/sources/js/pages/customer/customer-info-detail/index.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @reduxjs/toolkit */ "./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");
/* harmony import */ var _customerInfoDetailSlice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./customerInfoDetailSlice */ "./www/sources/js/pages/customer/customer-info-detail/customerInfoDetailSlice.js");
/* harmony import */ var _components_AppContainer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/AppContainer */ "./www/sources/js/pages/customer/customer-info-detail/components/AppContainer.jsx");
/* harmony import */ var _jsroot_components_WithNavigation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/components/WithNavigation */ "./www/sources/js/components/WithNavigation.jsx");
/* harmony import */ var _cssroot_pages_customer_customer_info_detail_index_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @cssroot/pages/customer/customer-info-detail/index.scss */ "./www/sources/css/pages/customer/customer-info-detail/index.scss");
/* harmony import */ var _cssroot_pages_customer_customer_info_detail_index_scss__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_cssroot_pages_customer_customer_info_detail_index_scss__WEBPACK_IMPORTED_MODULE_6__);






const store = Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__["configureStore"])({
  reducer: _customerInfoDetailSlice__WEBPACK_IMPORTED_MODULE_3__["default"]
});


class index extends react__WEBPACK_IMPORTED_MODULE_0___default.a.PureComponent {
  render() {
    const location = this.props.location;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_1__["Provider"], {
      store: store
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "customer-info-detail"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_AppContainer__WEBPACK_IMPORTED_MODULE_4__["default"], {
      id: !location.state ? null : location.state.toString()
    })));
  }

}

const FunctionBarWithNavigation = Object(_jsroot_components_WithNavigation__WEBPACK_IMPORTED_MODULE_5__["default"])(index);
/* harmony default export */ __webpack_exports__["default"] = (FunctionBarWithNavigation);

/***/ })

}]);
//# sourceMappingURL=25.chunk.js.map