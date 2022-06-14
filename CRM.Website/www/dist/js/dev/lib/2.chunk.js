(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ "./www/sources/js/pages/home/TestComponent.js":
/*!****************************************************!*\
  !*** ./www/sources/js/pages/home/TestComponent.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TestComponent; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _HelloComponent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HelloComponent */ "./www/sources/js/pages/home/HelloComponent.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



class TestComponent extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
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
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_HelloComponent__WEBPACK_IMPORTED_MODULE_1__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, "Test Contact!!!"));
  }

}

/***/ })

}]);
//# sourceMappingURL=2.chunk.js.map