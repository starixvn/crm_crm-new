(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common"],{

/***/ "./www/sources/js/common/createReducer.js":
/*!************************************************!*\
  !*** ./www/sources/js/common/createReducer.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const createReducer = (initialState, handlers) => {
  return (state = initialState, action) => {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  };
};

/* harmony default export */ __webpack_exports__["default"] = (createReducer);

/***/ }),

/***/ "./www/sources/js/common/store.js":
/*!****************************************!*\
  !*** ./www/sources/js/common/store.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Store; });
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-thunk */ "./node_modules/redux-thunk/es/index.js");


class Store {
  static createStore(reducer, initialState) {
    const enhancer = Object(redux__WEBPACK_IMPORTED_MODULE_0__["compose"])(Object(redux__WEBPACK_IMPORTED_MODULE_0__["applyMiddleware"])(redux_thunk__WEBPACK_IMPORTED_MODULE_1__["default"]));
    return Object(redux__WEBPACK_IMPORTED_MODULE_0__["createStore"])(reducer, initialState, enhancer);
  }

}

/***/ }),

/***/ "./www/sources/js/components/ConfirmPopup.jsx":
/*!****************************************************!*\
  !*** ./www/sources/js/components/ConfirmPopup.jsx ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var _DraggableModalDialog__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DraggableModalDialog */ "./www/sources/js/components/DraggableModalDialog.jsx");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }







class ConfirmPopup extends react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"] {
  render() {
    const {
      size,
      title,
      content,
      requestResponse
    } = this.props;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"], {
      show: true,
      backdrop: "static",
      dialogAs: _DraggableModalDialog__WEBPACK_IMPORTED_MODULE_3__["default"],
      className: "confirmation-modal",
      keyboard: false,
      size: size,
      centered: true,
      onHide: this.props.onClose
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Header, {
      closeButton: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Title, {
      as: "div"
    }, title)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Body, null, requestResponse && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Alert"], {
      variant: requestResponse.isSuccessful ? 'success' : 'danger',
      className: "d-flex"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: `fa ${requestResponse.isSuccessful ? 'fa-check' : 'fa-exclamation-triangle'}`
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "ml-2"
    }, requestResponse.message)), content), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Footer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
      variant: "primary",
      size: "sm",
      onClick: this.props.onSubmit,
      disabled: requestResponse && requestResponse.isSuccessful
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].getResource('OK')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
      variant: "primary",
      size: "sm",
      onClick: this.props.onClose
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].getResource('Cancel'))));
  }

}

_defineProperty(ConfirmPopup, "propTypes", {
  size: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOf(['sm', 'lg', 'xl', 'md']),
  title: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  content: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.element]),
  requestResponse: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    isSuccessful: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
    message: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string
  }),
  onSubmit: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  onClose: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func
});

_defineProperty(ConfirmPopup, "defaultProps", {
  size: 'sm',
  title: '',
  content: '',
  requestResponse: null
});

/* harmony default export */ __webpack_exports__["default"] = (ConfirmPopup);

/***/ }),

/***/ "./www/sources/js/components/CustomReactSelect.jsx":
/*!*********************************************************!*\
  !*** ./www/sources/js/components/CustomReactSelect.jsx ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CustomReactSelect; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_select__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-select */ "./node_modules/react-select/dist/react-select.browser.esm.js");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
const _excluded = ["components", "styles", "placeholder"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }




class CustomReactSelect extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  render() {
    const _this$props = this.props,
          {
      components,
      styles,
      placeholder
    } = _this$props,
          rest = _objectWithoutProperties(_this$props, _excluded);

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_select__WEBPACK_IMPORTED_MODULE_1__["default"], _extends({
      className: "react-select-container",
      classNamePrefix: "react-select",
      placeholder: placeholder || _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getResource('PleaseSelect')
    }, rest, {
      components: _objectSpread({
        IndicatorSeparator: () => null
      }, components),
      styles: _objectSpread({
        control: base => _objectSpread(_objectSpread({}, base), {}, {
          borderRadius: 0,
          minHeight: 'unset',
          boxShadow: 'none'
        }),
        input: base => _objectSpread(_objectSpread({}, base), {}, {
          lineHeight: 1
        }),
        multiValue: base => _objectSpread(_objectSpread({}, base), {}, {
          margin: '0 4px 0 0'
        })
      }, styles)
    }));
  }

}

/***/ }),

/***/ "./www/sources/js/components/ResponseMessage.jsx":
/*!*******************************************************!*\
  !*** ./www/sources/js/components/ResponseMessage.jsx ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





class ResponseMessage extends react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"] {
  render() {
    const {
      isSuccessful,
      message,
      messages
    } = this.props;
    const variant = isSuccessful ? 'success' : 'danger';
    const className = `fa ${isSuccessful ? 'fa-check' : 'fa-exclamation-triangle'}`;
    return message ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Alert"], {
      variant: variant,
      className: "d-flex"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "d-inline"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: className
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "ml-2 d-inline"
    }, message)) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Alert"], {
      variant: variant,
      className: "d-flex flex-column"
    }, messages.map((item, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "d-flex",
      key: index
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "d-inline"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: className
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "ml-2 d-inline"
    }, item))));
  }

}

_defineProperty(ResponseMessage, "propTypes", {
  isSuccessful: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  message: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  messages: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.array
});

_defineProperty(ResponseMessage, "defaultProps", {
  isSuccessful: false,
  message: '',
  messages: []
});

/* harmony default export */ __webpack_exports__["default"] = (ResponseMessage);

/***/ }),

/***/ "./www/sources/js/components/date-picker/CustomInput.jsx":
/*!***************************************************************!*\
  !*** ./www/sources/js/components/date-picker/CustomInput.jsx ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return CustomInput; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");


class CustomInput extends react__WEBPACK_IMPORTED_MODULE_0___default.a.PureComponent {
  render() {
    const {
      disabled,
      onClick,
      value,
      isInvalid
    } = this.props;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Control, {
      as: "input",
      className: "shadow-none",
      isInvalid: isInvalid,
      readOnly: true,
      disabled: disabled,
      onClick: onClick,
      value: value
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "date-picker-icon fa fa-calendar",
      onClick: onClick
    }));
  }

}

/***/ }),

/***/ "./www/sources/js/components/date-picker/index.jsx":
/*!*********************************************************!*\
  !*** ./www/sources/js/components/date-picker/index.jsx ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DatePickerField; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_datepicker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-datepicker */ "./node_modules/react-datepicker/dist/react-datepicker.min.js");
/* harmony import */ var react_datepicker__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_datepicker__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _CustomInput__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./CustomInput */ "./www/sources/js/components/date-picker/CustomInput.jsx");
/* harmony import */ var _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/common/dateTimeService */ "./www/sources/js/common/dateTimeService.js");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
const _excluded = ["className", "selected", "isInvalid"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






class DatePickerField extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleTimeNow", () => {
      this.setState({
        selected: new Date(_jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_3__["default"].toLongDateTimeFormat(_jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_3__["default"].toClientDateTime(new Date())))
      });
    });

    this.state = {
      selected: this.props.selected
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selected !== this.props.selected) {
      this.setState({
        selected: this.props.selected
      });
    }
  }

  render() {
    const _this$props = this.props,
          {
      className,
      selected,
      isInvalid
    } = _this$props,
          rest = _objectWithoutProperties(_this$props, _excluded);

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_datepicker__WEBPACK_IMPORTED_MODULE_1___default.a, _extends({
      className: `datetime-picker ${className}`,
      dateFormat: this.props.showTimeInput ? 'MMM dd, yyyy hh:mm aa' : 'MMM dd, yyyy',
      customInput: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_CustomInput__WEBPACK_IMPORTED_MODULE_2__["default"], {
        isInvalid: isInvalid
      }),
      selected: this.state.selected
    }, rest), this.props.showTimeInput && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "react-datepicker__input-time-container btn-now",
      type: "button",
      onClick: this.handleTimeNow
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_4__["default"].getResource('Now')));
  }

}

_defineProperty(DatePickerField, "defaultProps", {
  isInvalid: false
});

/***/ }),

/***/ "./www/sources/js/components/react-grid/components/Cell.jsx":
/*!******************************************************************!*\
  !*** ./www/sources/js/components/react-grid/components/Cell.jsx ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


const Cell = props => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", props, props.children);

/* harmony default export */ __webpack_exports__["default"] = (Cell);

/***/ }),

/***/ "./www/sources/js/components/react-grid/components/HeaderCell.jsx":
/*!************************************************************************!*\
  !*** ./www/sources/js/components/react-grid/components/HeaderCell.jsx ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return HeaderCell; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
const _excluded = ["colWidth", "sortBy", "sortOrder", "onSort", "children"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



class HeaderCell extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "onClick", () => {
      if (!this.props.sortBy) {
        return;
      }

      const {
        onSort
      } = this.props;
      const sortOrder = this.props.sortOrder;
      const newSortOrder = !sortOrder || sortOrder === 'desc' ? 'asc' : 'desc';
      onSort && onSort(this.props.sortBy, newSortOrder);
    });
  }

  render() {
    const _this$props = this.props,
          {
      colWidth,
      sortBy,
      sortOrder,
      onSort,
      children
    } = _this$props,
          rest = _objectWithoutProperties(_this$props, _excluded);

    let sortableHeader = null;

    if (sortBy) {
      const upArrow = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        style: {
          display: 'block',
          color: `${sortOrder === 'asc' ? '#111' : '#777'}`
        },
        className: 'asc'
      });
      const downArrow = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        style: {
          display: 'block',
          marginTop: '2px',
          color: `${sortOrder === 'desc' ? '#111' : '#777'}`
        },
        className: 'desc'
      });
      sortableHeader = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", _extends({}, rest, {
        className: 'sortable sorting',
        style: {
          position: 'relative',
          backgroundClip: 'padding-box'
        },
        onClick: this.onClick
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        style: {
          width: '90%'
        }
      }, children), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        style: {
          float: 'right',
          position: 'absolute',
          top: '40%',
          right: '2px'
        }
      }, upArrow, downArrow));
    }

    return sortableHeader || /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("th", rest, children);
  }

}

_defineProperty(HeaderCell, "propTypes", {
  sortOrder: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  sortBy: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  onSort: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func
});

_defineProperty(HeaderCell, "defaultProps", {
  sortOrder: null,
  sortBy: null,
  onSort: null
});

/***/ }),

/***/ "./www/sources/js/components/react-grid/components/HeaderRow.jsx":
/*!***********************************************************************!*\
  !*** ./www/sources/js/components/react-grid/components/HeaderRow.jsx ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return HeaderRow; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
const _excluded = ["onSort", "sortBy", "sortOrder"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



class HeaderRow extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);
  }

  _renderChildren() {
    const {
      onSort,
      children,
      sortBy,
      sortOrder
    } = this.props;
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.Children.map(children, child => child && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.cloneElement(child, {
      onSort: onSort,
      sortOrder: sortBy === child.props.sortBy ? sortOrder : null
    }));
  }

  render() {
    const _this$props = this.props,
          {
      onSort,
      sortBy,
      sortOrder
    } = _this$props,
          rest = _objectWithoutProperties(_this$props, _excluded);

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", rest, this._renderChildren());
  }

}

_defineProperty(HeaderRow, "propTypes", {
  onSort: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func
});

_defineProperty(HeaderRow, "defaultProps", {
  onSort: null
});

/***/ }),

/***/ "./www/sources/js/components/react-grid/components/Pager.jsx":
/*!*******************************************************************!*\
  !*** ./www/sources/js/components/react-grid/components/Pager.jsx ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Pager; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



class Pager extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "onKeyUpHandle", (e, totalPage) => {
      const code = e.keyCode ? e.keyCode : e.which;

      if (code === 13) {
        const value = parseInt(this.state.inputValue, 10);

        if (value > 0 && value <= totalPage) {
          this.goToPage(value, this.props.pageOption.PageSize);
        }
      }
    });

    _defineProperty(this, "onInputChangeHandler", event => {
      const pattern = /^\d*$/;
      const regex = new RegExp(pattern);
      const {
        value
      } = event.target;
      const isValidNumber = regex.test(value); // NOSONAR

      if (isValidNumber) {
        this._updateState(value);
      }
    });

    this.state = {
      inputValue: props.pageOption.PageIndex
    };
  }

  componentDidUpdate(prevProps) {
    const pageIndex = this.props.pageOption.PageIndex;

    if (pageIndex !== prevProps.pageOption.PageIndex) {
      this._updateState(pageIndex);
    }
  }

  goToPage(index, pageSize) {
    this.props.onPaging && this.props.onPaging(index, pageSize);
  }

  onClickHandle(isDisable, handleFunc) {
    if (!isDisable) {
      handleFunc();
    }
  }

  _updateState(inputValue) {
    this.setState({
      inputValue
    });
  }

  _renderPageSizeSelection(isDisable, pageSize) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("select", {
      className: "pagesize-select",
      disabled: isDisable,
      value: pageSize,
      onChange: event => this.goToPage(1, Number(event.target.value))
    }, this._renderPageSizeOption(this.props.pageOption.PageList));
  }

  _renderPageSizeOption(pageList) {
    return pageList.map((item, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
      key: `pagesize${index}`,
      value: item
    }, item));
  }

  _renderPageIcon(iconClass, isDisable, onClickFunc) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      className: `fa ${iconClass} ${isDisable ? 'disable' : ''}`,
      onClick: () => this.onClickHandle(isDisable, onClickFunc)
    });
  }

  _renderPageInput(index, totalPage) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "page-input"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Page "), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      type: "text",
      className: "page-form",
      value: index,
      maxLength: "4",
      size: "2",
      onChange: this.onInputChangeHandler,
      onKeyUp: event => this.onKeyUpHandle(event, totalPage)
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, ` of ${totalPage}`, " "));
  }

  _renderPageLabel(index, totalPage) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "page-input"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Page ", `${index} of ${totalPage} `));
  }

  _renderPageInfo(index, pageSize, totalItem) {
    const viewFrom = (index - 1) * pageSize + 1;
    const viewTo = index * pageSize;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "page-info"
    }, `Display ${viewFrom} to ${viewTo > totalItem ? totalItem : viewTo} of ${totalItem} item(s)`);
  }

  render() {
    const {
      isShowPagingInfo,
      isAllowInputPageIndex,
      pageOption,
      minWidth,
      maxWidth
    } = this.props;
    const {
      PageIndex,
      PageSize,
      TotalItem
    } = pageOption;
    const {
      inputValue
    } = this.state;
    const isShow = TotalItem > 0;
    const isDisable = isNaN(parseInt(inputValue, 10));
    const totalPage = Math.ceil(TotalItem / PageSize);
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "page-container",
      style: {
        minWidth,
        maxWidth,
        display: `${isShow ? 'block' : 'none'}`
      }
    }, "Page size ", this._renderPageSizeSelection(isDisable, PageSize), this._renderPageIcon('fa-angle-double-left', PageIndex === 1, () => this.goToPage(1, PageSize)), this._renderPageIcon('fa-angle-left', isDisable || PageIndex <= 1 || PageIndex > totalPage, () => this.goToPage(PageIndex - 1, PageSize)), isAllowInputPageIndex ? this._renderPageInput(inputValue, totalPage) : this._renderPageLabel(PageIndex, totalPage), this._renderPageIcon('fa-angle-right', isDisable || PageIndex >= totalPage || PageIndex < 1, () => this.goToPage(PageIndex + 1, PageSize)), this._renderPageIcon('fa-angle-double-right', PageIndex === totalPage, () => this.goToPage(totalPage, PageSize)), isShowPagingInfo && this._renderPageInfo(PageIndex, PageSize, TotalItem));
  }

}

_defineProperty(Pager, "propTypes", {
  pageOption: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    PageIndex: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
    PageSize: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
    PageList: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number),
    TotalItem: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number
  }),
  onPaging: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  isShowPagingInfo: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  isAllowInputPageIndex: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool
});

_defineProperty(Pager, "defaultProps", {
  pageOption: {
    PageIndex: 1,
    PageSize: 50,
    PageList: [50, 100, 200],
    TotalItem: 0
  },
  isShowPagingInfo: true,
  isAllowInputPageIndex: true
});

/***/ }),

/***/ "./www/sources/js/components/react-grid/components/Row.jsx":
/*!*****************************************************************!*\
  !*** ./www/sources/js/components/react-grid/components/Row.jsx ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);


const Row = props => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", props, props.children);

/* harmony default export */ __webpack_exports__["default"] = (Row);

/***/ }),

/***/ "./www/sources/js/components/react-grid/components/RowLayout.jsx":
/*!***********************************************************************!*\
  !*** ./www/sources/js/components/react-grid/components/RowLayout.jsx ***!
  \***********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




class RowLayout extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);
  }

  _getRowLayout() {
    const {
      columnLayout
    } = this.props;
    return columnLayout.map((cellWidth, index) => {
      const width = isNaN(cellWidth) ? cellWidth : `${cellWidth}px`;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("td", {
        key: `cellLayout${index}`,
        style: {
          width: width
        }
      });
    });
  }

  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tr", {
      className: "first-row"
    }, this._getRowLayout());
  }

}

_defineProperty(RowLayout, "propTypes", {
  columnLayout: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string])).isRequired
});

/* harmony default export */ __webpack_exports__["default"] = (RowLayout);

/***/ }),

/***/ "./www/sources/js/components/react-grid/components/Table.jsx":
/*!*******************************************************************!*\
  !*** ./www/sources/js/components/react-grid/components/Table.jsx ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _RowLayout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./RowLayout */ "./www/sources/js/components/react-grid/components/RowLayout.jsx");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _tableSection__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tableSection */ "./www/sources/js/components/react-grid/components/tableSection.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../constants */ "./www/sources/js/components/react-grid/constants.js");
/* harmony import */ var _Pager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Pager */ "./www/sources/js/components/react-grid/components/Pager.jsx");
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../functions */ "./www/sources/js/components/react-grid/functions.js");
/* harmony import */ var _jsroot_common_site__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/common/site */ "./www/sources/js/common/site.js");
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









const clientWidth = document.body.clientWidth;

class Table extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "_getWidthByCells", (headerRows, columnsWidth, currentNextCellIndexByRow, cells, currentRowIndex) => {
      for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];

        if (cell) {
          this._handleWidthOneCell(headerRows, columnsWidth, currentNextCellIndexByRow, cell, currentRowIndex);
        }
      }
    });

    _defineProperty(this, "_handleWidthOneCell", (headerRows, columnsWidth, currentNextCellIndexByRow, cell, currentRowIndex) => {
      const cellProps = cell.props;
      const colspan = Number(cellProps.colSpan);

      if (colspan && colspan > 1) {
        const nextRowIndex = currentRowIndex + 1;

        if (currentNextCellIndexByRow[nextRowIndex] === undefined) {
          currentNextCellIndexByRow[nextRowIndex] = 0;
        }

        const fromNextCellIndex = currentNextCellIndexByRow[nextRowIndex];
        const toNextCellIndex = fromNextCellIndex + colspan - 1;
        const nextCells = headerRows[nextRowIndex].props.children;

        const nextColspanCells = this._getNextColspanCells(nextCells, fromNextCellIndex, toNextCellIndex);

        currentNextCellIndexByRow[nextRowIndex] += nextColspanCells.length;

        this._getWidthByCells(headerRows, columnsWidth, currentNextCellIndexByRow, nextColspanCells, nextRowIndex);
      } else {
        const cellWidth = cellProps.colWidth ? cellProps.colWidth : _constants__WEBPACK_IMPORTED_MODULE_4__["DEFAULT_COLUMN_WIDTH"];
        columnsWidth.push(cellWidth);
      }
    });

    _defineProperty(this, "_handleResize", event => {
      event && event.preventDefault();

      if (this.bodyWrapper && this.props.autoHeight) {
        const bodyHeight = this._calculateBodyHeight();

        if (this.state.contentHeight !== bodyHeight) {
          this.setState({
            contentHeight: bodyHeight
          });
        }
      }

      const {
        maxWidth,
        shouldUseMaxWidth
      } = this.props;
      const showingLeftPanel = window.localStorage.getItem('isShowingLeftPanel');
      const rightRowContainer = document.getElementById('right-row-container').clientWidth;
      const clientWidth = document.body.clientWidth;
      const calWidth = clientWidth < _constants__WEBPACK_IMPORTED_MODULE_4__["MIN_WIDTH_CONTAINER"] ? _constants__WEBPACK_IMPORTED_MODULE_4__["MIN_WIDTH_CONTAINER"] : clientWidth;

      if (showingLeftPanel !== null) {
        this.setState({
          maxWidth: shouldUseMaxWidth ? maxWidth : rightRowContainer
        });
        window.localStorage.removeItem('isShowingLeftPanel');
      } else {
        const currentSearchCustId = document.getElementById('currentCustId').value;
        let maxWidthCal = 0;

        if (!currentSearchCustId) {
          maxWidthCal = shouldUseMaxWidth ? maxWidth : calWidth - this.diffWidth;
        } else {
          maxWidthCal = shouldUseMaxWidth ? maxWidth : rightRowContainer;
        }

        if (this.state.maxWidth !== maxWidthCal) {
          this.setState({
            maxWidth: maxWidthCal
          });
        }
      }
    });

    _defineProperty(this, "renderFixColumn", fixProps => {
      const {
        header,
        body,
        footer,
        sectionProps,
        headerSectionProps,
        maxWidth,
        rowLayout,
        isPaging,
        pageOption,
        onPaging
      } = fixProps;
      let maxHeightContainer = 0;

      if (this.headerWrapper !== null) {
        maxHeightContainer = this.headerWrapper.offsetHeight + this.state.contentHeight;
      }

      const increaseMaxWidth = maxWidth + 1;
      const maxWidthCal = maxWidth + _constants__WEBPACK_IMPORTED_MODULE_4__["SCROLLBAR_WIDTH"] + 1;

      const footerSectionProps = _objectSpread(_objectSpread({}, sectionProps), {}, {
        maxWidth: maxWidthCal
      });

      const fixHeaderSectionProps = _objectSpread(_objectSpread({}, headerSectionProps), {}, {
        maxWidth: increaseMaxWidth
      });

      const fixSectionProps = _objectSpread(_objectSpread({}, sectionProps), {}, {
        maxWidth: increaseMaxWidth
      });

      const {
        Header,
        Body,
        Footer
      } = this;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "fix-table-container",
        style: {
          maxWidth: maxWidthCal
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        style: {
          maxWidth: maxWidthCal
        }
      }, this.props.title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "fix-table",
        style: {
          maxWidth: maxWidthCal,
          maxHeight: maxHeightContainer
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Header, fixHeaderSectionProps, rowLayout, header), body && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Body, fixSectionProps, rowLayout, body), footer && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Footer, fixSectionProps, rowLayout, footer)), isPaging && pageOption && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Pager__WEBPACK_IMPORTED_MODULE_5__["default"], _extends({
        pageOption: pageOption,
        onPaging: onPaging
      }, footerSectionProps)));
    });

    this.headerWrapper = null;
    this.bodyWrapper = null;
    this.footerWrapper = null;
    const headerContainerProps = {
      className: 'header-content',
      isHeader: true,
      getRef: element => this.headerWrapper = element
    };
    this.Header = Object(_tableSection__WEBPACK_IMPORTED_MODULE_3__["default"])(headerContainerProps);
    const bodyContainerProps = {
      className: 'body-content',
      getRef: element => this.bodyWrapper = element
    };
    this.Body = Object(_tableSection__WEBPACK_IMPORTED_MODULE_3__["default"])(bodyContainerProps);
    const footerContainerProps = {
      className: 'footer-content',
      getRef: element => this.footerWrapper = element
    };
    this.Footer = Object(_tableSection__WEBPACK_IMPORTED_MODULE_3__["default"])(footerContainerProps);
    const {
      maxWidth: _maxWidth,
      bodyHeight: _bodyHeight,
      adjustedHeight
    } = this.props;
    const maxWidthValue = _maxWidth || clientWidth;
    this.diffWidth = clientWidth - maxWidthValue;
    this.adjustedHeight = adjustedHeight;
    this.debounceResizing = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_7__["default"].debounce(this._handleResize);
    this.state = {
      maxWidth: maxWidthValue,
      contentHeight: _bodyHeight,
      columnsWidth: this._getColumnsWidth(props.header)
    };
  }

  componentDidMount() {
    this._handleResize();

    window.addEventListener('resize', this.debounceResizing);
  }

  componentDidUpdate(prevProps) {
    if (this.props.maxWidth !== prevProps.maxWidth) {
      const maxWidthValue = this.props.maxWidth || clientWidth;
      this.diffWidth = clientWidth - maxWidthValue;
      this.setState({
        maxWidth: maxWidthValue
      });
    }

    if (this.props.header !== prevProps.header || this.props.maxWidth !== prevProps.maxWidth) {
      this.setState({
        columnsWidth: this._getColumnsWidth(this.props.header)
      });
    }

    if (this.props.shouldResetScrollPosition && prevProps.body !== this.props.body) {
      _functions__WEBPACK_IMPORTED_MODULE_6__["default"].scrollToTop(this.bodyWrapper, 200);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.debounceResizing);
  }

  get columnWidthSum() {
    const columnsWidth = this.state.columnsWidth;
    return !columnsWidth || !columnsWidth.length || columnsWidth.find(x => typeof x !== 'number') ? null : columnsWidth.reduce((prev, current) => prev + current, 0);
  }

  _getNextColspanCells(cells, fromCellIndex, toCellIndex) {
    const colspanCells = [];
    let toCellInternalIndex = toCellIndex;

    for (let i = fromCellIndex; i <= toCellInternalIndex; i++) {
      const cell = cells[i];
      const hasNext = i < cells.length;

      if (!(!cell && hasNext)) {
        if (cell.props.colSpan) {
          toCellInternalIndex -= 1;
        }

        colspanCells.push(cell);
      } else {
        toCellInternalIndex += 1;
      }
    }

    return colspanCells;
  }

  _getColumnsWidth(headerRows) {
    const headerIsArray = Array.isArray(headerRows);

    if (headerIsArray && headerRows.length === 0) {
      return null;
    }

    const columnsWidth = [];
    const currentNextCellIndexByRow = {};
    const currentRowIndex = 0;
    const cellList = headerIsArray ? headerRows[currentRowIndex].props.children : headerRows.props.children;

    this._getWidthByCells(headerRows, columnsWidth, currentNextCellIndexByRow, cellList, currentRowIndex);

    return columnsWidth;
  }

  _calculateBodyHeight() {
    const windowHeight = window.innerHeight;
    const footerHeight = this.footerWrapper ? this.footerWrapper.offsetHeight : 0;
    const tableContentHeight = windowHeight - (this.bodyWrapper.offsetTop + footerHeight + 70) - this.adjustedHeight;
    return tableContentHeight;
  }

  _getUpdatedColumnLayout() {
    const {
      width,
      shouldUseMaxWidth,
      autoWidth,
      containerPadding
    } = this.props;
    let sumOfColumnWidth = autoWidth || shouldUseMaxWidth ? this.state.maxWidth : width;
    sumOfColumnWidth = sumOfColumnWidth - containerPadding - _constants__WEBPACK_IMPORTED_MODULE_4__["SCROLLBAR_WIDTH"] - 1;
    const newColumnsWidth = this.columnWidthSum && this.state.columnsWidth.map(cellWidth => sumOfColumnWidth / this.columnWidthSum * cellWidth);
    return newColumnsWidth;
  }

  render() {
    const {
      width,
      autoWidth,
      minWidth,
      header,
      body,
      footer,
      isPaging,
      pageOption,
      onPaging,
      containerPadding,
      shouldUseMaxWidth,
      isFixColumn
    } = this.props;
    const maxWidth = this.state.maxWidth - containerPadding;
    const actualWidth = width - containerPadding;
    const newColumnLayout = this.columnWidthSum && this.columnWidthSum !== actualWidth ? this._getUpdatedColumnLayout() : this.state.columnsWidth;

    if (!newColumnLayout) {
      return null;
    }

    const sectionProps = {
      width: actualWidth,
      autoWidth,
      minWidth,
      maxWidth,
      shouldUseMaxWidth
    };
    const headerSectionProps = {
      onSort: this.props.onSort,
      width: actualWidth,
      autoWidth,
      minWidth,
      maxWidth,
      shouldUseMaxWidth
    };
    const rowLayout = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_RowLayout__WEBPACK_IMPORTED_MODULE_1__["default"], {
      columnLayout: newColumnLayout
    });
    const {
      Header,
      Body,
      Footer
    } = this;
    const fixProps = {
      header,
      body,
      footer,
      sectionProps,
      headerSectionProps,
      maxWidth,
      width,
      rowLayout,
      isPaging,
      pageOption,
      onPaging
    };
    return isFixColumn ? this.renderFixColumn(_objectSpread({}, fixProps)) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "table-container",
      style: {
        maxWidth
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Header, headerSectionProps, rowLayout, header), body && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Body, _extends({}, sectionProps, {
      maxHeight: this.state.contentHeight
    }), rowLayout, body), footer && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Footer, sectionProps, rowLayout, footer)), isPaging && pageOption && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Pager__WEBPACK_IMPORTED_MODULE_5__["default"], _extends({
      pageOption: pageOption,
      onPaging: onPaging
    }, sectionProps)));
  }

}

_defineProperty(Table, "propTypes", {
  onSort: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,
  width: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number, prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.string]),
  maxWidth: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number,
  minWidth: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number,
  autoWidth: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool,
  bodyHeight: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number,
  autoHeight: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool,
  title: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object, prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object)]),
  header: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object, prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object)]).isRequired,
  body: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object),
  footer: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object),
  isFixColumn: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool,
  isPaging: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool,
  onPaging: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,
  pageOption: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.object,
  adjustedHeight: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number,
  containerPadding: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.number,
  shouldResetScrollPosition: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool,
  shouldUseMaxWidth: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool
});

_defineProperty(Table, "defaultProps", {
  onSort: null,
  width: clientWidth,
  maxWidth: clientWidth,
  autoWidth: true,
  isFixColumn: false,
  isPaging: false,
  adjustedHeight: 0,
  bodyHeight: 0,
  autoHeight: true,
  containerPadding: 31,
  shouldResetScrollPosition: true,
  shouldUseMaxWidth: false
});

/* harmony default export */ __webpack_exports__["default"] = (Table);

/***/ }),

/***/ "./www/sources/js/components/react-grid/components/tableSection.js":
/*!*************************************************************************!*\
  !*** ./www/sources/js/components/react-grid/components/tableSection.js ***!
  \*************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants */ "./www/sources/js/components/react-grid/constants.js");
const _excluded = ["onSort", "tableClass", "width", "autoWidth", "maxWidth", "minWidth", "maxHeight"],
      _excluded2 = ["isHeader", "getRef"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





const createTableSection = (extendedContainerProps, extendedTableProps) => {
  var _class;

  return _class = class TableSection extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
    constructor(props) {
      super(props);

      _defineProperty(this, "onSort", (sortBy, sortOrder) => {
        const onSort = this.props.onSort;
        this.setState({
          sortBy: sortBy,
          sortOrder: sortOrder
        }, () => {
          onSort && onSort(sortBy, sortOrder);
        });
      });

      this.state = {
        sortBy: null,
        sortOrder: null
      };
    }

    get containerWidth() {
      const {
        autoWidth,
        maxWidth,
        width,
        shouldUseMaxWidth
      } = this.props;
      return shouldUseMaxWidth || autoWidth ? maxWidth : width;
    }

    get containerStyle() {
      const {
        minWidth,
        maxHeight
      } = this.props;
      return _objectSpread(_objectSpread({}, this.props.style), {}, {
        width: this.containerWidth,
        minWidth,
        maxHeight
      });
    }

    get tableStyle() {
      const {
        minWidth,
        autoWidth,
        maxWidth,
        shouldUseMaxWidth
      } = this.props;
      const maxWidthTable = minWidth ? Math.max(this.containerWidth, minWidth) : this.containerWidth;
      const tableWidth = shouldUseMaxWidth ? maxWidthTable : maxWidthTable - _constants__WEBPACK_IMPORTED_MODULE_2__["SCROLLBAR_WIDTH"];
      return {
        width: tableWidth
      };
    }

    _renderHeaderChildren() {
      const children = this.props.children;
      const {
        sortBy,
        sortOrder
      } = this.state; // register onSort event

      return react__WEBPACK_IMPORTED_MODULE_0___default.a.Children.map(children, child => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.cloneElement(child, {
        onSort: this.onSort,
        sortBy,
        sortOrder
      }));
    }

    render() {
      const _this$props = this.props,
            {
        onSort,
        tableClass,
        width,
        autoWidth,
        maxWidth,
        minWidth,
        maxHeight
      } = _this$props,
            rest = _objectWithoutProperties(_this$props, _excluded);

      const {
        isHeader,
        getRef
      } = extendedContainerProps,
            restContainerProps = _objectWithoutProperties(extendedContainerProps, _excluded2);

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", _extends({}, rest, {
        style: this.containerStyle,
        ref: getRef
      }, restContainerProps), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "table-wrapper"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("table", _extends({
        style: this.tableStyle,
        className: tableClass
      }, extendedTableProps), isHeader ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("thead", null, this._renderHeaderChildren()) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("tbody", null, this.props.children))));
    }

  }, _defineProperty(_class, "propTypes", {
    onSort: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
    tableClass: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
    width: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string]).isRequired,
    maxWidth: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number.isRequired,
    minWidth: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
    autoWidth: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
    maxHeight: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
    headerContainerProps: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
    shouldUseMaxWidth: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool
  }), _defineProperty(_class, "defaultProps", {
    onSort: null,
    tableClass: "table",
    autoWidth: true,
    shouldUseMaxWidth: false
  }), _class;
};

/* harmony default export */ __webpack_exports__["default"] = (createTableSection);

/***/ }),

/***/ "./www/sources/js/components/react-grid/constants.js":
/*!***********************************************************!*\
  !*** ./www/sources/js/components/react-grid/constants.js ***!
  \***********************************************************/
/*! exports provided: SCROLLBAR_WIDTH, GUTTER, DEFAULT_COLUMN_WIDTH, DEFAULT_PADDING, MIN_WIDTH_CONTAINER */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SCROLLBAR_WIDTH", function() { return SCROLLBAR_WIDTH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GUTTER", function() { return GUTTER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_COLUMN_WIDTH", function() { return DEFAULT_COLUMN_WIDTH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_PADDING", function() { return DEFAULT_PADDING; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MIN_WIDTH_CONTAINER", function() { return MIN_WIDTH_CONTAINER; });
const SCROLLBAR_WIDTH = 19;
const GUTTER = 15;
const DEFAULT_COLUMN_WIDTH = 100;
const DEFAULT_PADDING = 31;
const MIN_WIDTH_CONTAINER = 1485;

/***/ }),

/***/ "./www/sources/js/components/react-grid/functions.js":
/*!***********************************************************!*\
  !*** ./www/sources/js/components/react-grid/functions.js ***!
  \***********************************************************/
/*! exports provided: scrollToTop, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scrollToTop", function() { return scrollToTop; });
const scrollToTop = (element, scrollDuration) => {
  const scrollStep = -element.scrollTop / (scrollDuration / 15);
  requestAnimationFrame(() => {
    let scrollInterval = null;
    scrollInterval = setInterval(() => {
      if (element.scrollTop !== 0) {
        element.scrollTop += scrollStep;
      } else {
        clearInterval(scrollInterval);
      }
    }, 15);
  });
};
const functions = {
  scrollToTop
};
/* harmony default export */ __webpack_exports__["default"] = (functions);

/***/ }),

/***/ "./www/sources/js/components/react-grid/index.jsx":
/*!********************************************************!*\
  !*** ./www/sources/js/components/react-grid/index.jsx ***!
  \********************************************************/
/*! exports provided: Table, HeaderRow, Row, HeaderCell, Cell, Pager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_Table__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/Table */ "./www/sources/js/components/react-grid/components/Table.jsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Table", function() { return _components_Table__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _components_HeaderRow__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/HeaderRow */ "./www/sources/js/components/react-grid/components/HeaderRow.jsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HeaderRow", function() { return _components_HeaderRow__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _components_Row__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/Row */ "./www/sources/js/components/react-grid/components/Row.jsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Row", function() { return _components_Row__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _components_HeaderCell__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/HeaderCell */ "./www/sources/js/components/react-grid/components/HeaderCell.jsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HeaderCell", function() { return _components_HeaderCell__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _components_Cell__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/Cell */ "./www/sources/js/components/react-grid/components/Cell.jsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Cell", function() { return _components_Cell__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _components_Pager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/Pager */ "./www/sources/js/components/react-grid/components/Pager.jsx");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Pager", function() { return _components_Pager__WEBPACK_IMPORTED_MODULE_5__["default"]; });









/***/ })

}]);
//# sourceMappingURL=common.chunk.js.map