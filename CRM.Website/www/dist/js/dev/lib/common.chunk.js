(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common"],{

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

/***/ })

}]);
//# sourceMappingURL=common.chunk.js.map