(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./www/sources/js/pages/home/App.js":
/*!******************************************!*\
  !*** ./www/sources/js/pages/home/App.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return App; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _HelloComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HelloComponent */ "./www/sources/js/pages/home/HelloComponent.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



class App extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "state", {
      counter: 0
    });

    _defineProperty(this, "handleClick", () => {
      this.setState(prevState => {
        return {
          counter: prevState.counter + 1
        };
      });
    });
  }

  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "App"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_HelloComponent__WEBPACK_IMPORTED_MODULE_1__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, "I'm configuring setting up Webpack!!!"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, `The count now is: ${this.state.counter}`), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      onClick: this.handleClick
    }, "Click me"));
  }

}

/***/ })

}]);
//# sourceMappingURL=0.chunk.js.map