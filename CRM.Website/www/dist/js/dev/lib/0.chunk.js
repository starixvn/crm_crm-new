(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./www/sources/css/pages/notification-template/index.scss":
/*!****************************************************************!*\
  !*** ./www/sources/css/pages/notification-template/index.scss ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

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
      const minWidthContainer = 1485;
      const calWidth = document.body.clientWidth < minWidthContainer ? minWidthContainer : document.body.clientWidth;

      if (showingLeftPanel !== null) {
        this.setState({
          maxWidth
        });
        window.localStorage.removeItem('isShowingLeftPanel');
      } else {
        const maxWidthCal = shouldUseMaxWidth ? maxWidth : calWidth - this.diffWidth;

        if (this.state.maxWidth !== maxWidthCal) {
          this.setState({
            maxWidth: maxWidthCal
          });
        }
      }
    });

    _defineProperty(this, "_calculateWidth", () => {
      const isFullWidthClient = this.props.width === clientWidth;
      const leftRowContainer = document.getElementById('left-row-container');
      const leftContainerWidth = window.customerInfo !== null && leftRowContainer !== null ? leftRowContainer.width + _constants__WEBPACK_IMPORTED_MODULE_4__["DEFAULT_PADDING"] : _constants__WEBPACK_IMPORTED_MODULE_4__["DEFAULT_PADDING"];
      const widthRemain = isFullWidthClient ? leftContainerWidth : 0;
      return widthRemain;
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
      autoWidth,
      containerPadding
    } = this.props;

    const widthRemain = this._calculateWidth();

    let sumOfColumnWidth = autoWidth ? this.state.maxWidth : width;
    sumOfColumnWidth = sumOfColumnWidth - containerPadding - _constants__WEBPACK_IMPORTED_MODULE_4__["SCROLLBAR_WIDTH"] - _constants__WEBPACK_IMPORTED_MODULE_4__["DEFAULT_PADDING"] - widthRemain;
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

    const widthRemain = this._calculateWidth();

    const maxWidthRemain = shouldUseMaxWidth ? 0 : widthRemain;
    const maxWidth = this.state.maxWidth - containerPadding - maxWidthRemain;
    const actualWidth = width - containerPadding - widthRemain;
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
  containerPadding: 30,
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
/*! exports provided: SCROLLBAR_WIDTH, GUTTER, DEFAULT_COLUMN_WIDTH, DEFAULT_PADDING */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SCROLLBAR_WIDTH", function() { return SCROLLBAR_WIDTH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GUTTER", function() { return GUTTER; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_COLUMN_WIDTH", function() { return DEFAULT_COLUMN_WIDTH; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_PADDING", function() { return DEFAULT_PADDING; });
const SCROLLBAR_WIDTH = 19;
const GUTTER = 15;
const DEFAULT_COLUMN_WIDTH = 100;
const DEFAULT_PADDING = 31;

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









/***/ }),

/***/ "./www/sources/js/pages/notification-template/actions.js":
/*!***************************************************************!*\
  !*** ./www/sources/js/pages/notification-template/actions.js ***!
  \***************************************************************/
/*! exports provided: ActionCreators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionCreators", function() { return ActionCreators; });
/* harmony import */ var _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/common/site */ "./www/sources/js/common/site.js");
/* harmony import */ var _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/common/dataService */ "./www/sources/js/common/dataService.js");
/* harmony import */ var _notificationTemplateSlice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./notificationTemplateSlice */ "./www/sources/js/pages/notification-template/notificationTemplateSlice.js");




const getNotificationTypes = () => async dispatch => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl('Common/GetNotificationTypes');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__["default"].getDataAsync(url).then(response => {
    dispatch(Object(_notificationTemplateSlice__WEBPACK_IMPORTED_MODULE_2__["setNotificationTypes"])(response.data));
  });
};

const getLanguages = () => async dispatch => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl('NotificationTemplate/GetLanguages');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__["default"].getDataAsync(url).then(response => {
    dispatch(Object(_notificationTemplateSlice__WEBPACK_IMPORTED_MODULE_2__["setLanguages"])(response.data));
  });
};

const getGridData = params => async dispatch => {
  _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].blockUI();
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl('NotificationTemplate/GetNotificationTemplate');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__["default"].postDataAsync(url, params).then(response => {
    dispatch(Object(_notificationTemplateSlice__WEBPACK_IMPORTED_MODULE_2__["setGridData"])(response.data));
  }).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].unblockUI());
};

const getTemplateById = (templateId, callback) => async dispatch => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl(`NotificationTemplate/GetById/${templateId}`);
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__["default"].getDataAsync(url).then(response => {
    dispatch(Object(_notificationTemplateSlice__WEBPACK_IMPORTED_MODULE_2__["setSelectedTemplate"])(response.data));

    if (typeof callback === 'function') {
      callback();
    }
  });
};

const createTemplate = data => async dispatch => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl('NotificationTemplate/Create');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__["default"].postDataAsync(url, data).then(response => {
    dispatch(Object(_notificationTemplateSlice__WEBPACK_IMPORTED_MODULE_2__["setCreateTemplateResult"])(response.data));
  });
};

const editTemplate = data => async dispatch => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl('NotificationTemplate/Edit');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__["default"].postDataAsync(url, data).then(response => {
    dispatch(Object(_notificationTemplateSlice__WEBPACK_IMPORTED_MODULE_2__["setEditTemplateResult"])(response.data));
  });
};

const deleteTemplate = params => async () => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl(`NotificationTemplate/Delete`);
  return await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__["default"].postDataAsync(url, params).then(response => response);
};

const ActionCreators = {
  setNotificationTypes: _notificationTemplateSlice__WEBPACK_IMPORTED_MODULE_2__["setNotificationTypes"],
  setLanguages: _notificationTemplateSlice__WEBPACK_IMPORTED_MODULE_2__["setLanguages"],
  setGridParams: _notificationTemplateSlice__WEBPACK_IMPORTED_MODULE_2__["setGridParams"],
  setGridData: _notificationTemplateSlice__WEBPACK_IMPORTED_MODULE_2__["setGridData"],
  setSelectedTemplate: _notificationTemplateSlice__WEBPACK_IMPORTED_MODULE_2__["setSelectedTemplate"],
  setCreateTemplatePopup: _notificationTemplateSlice__WEBPACK_IMPORTED_MODULE_2__["setCreateTemplatePopup"],
  setCreateTemplateResult: _notificationTemplateSlice__WEBPACK_IMPORTED_MODULE_2__["setCreateTemplateResult"],
  setEditTemplatePopup: _notificationTemplateSlice__WEBPACK_IMPORTED_MODULE_2__["setEditTemplatePopup"],
  setEditTemplateResult: _notificationTemplateSlice__WEBPACK_IMPORTED_MODULE_2__["setEditTemplateResult"],
  setDeleteTemplatePopup: _notificationTemplateSlice__WEBPACK_IMPORTED_MODULE_2__["setDeleteTemplatePopup"],
  setContentDetailPopup: _notificationTemplateSlice__WEBPACK_IMPORTED_MODULE_2__["setContentDetailPopup"],
  getNotificationTypes,
  getLanguages,
  getGridData,
  getTemplateById,
  createTemplate,
  editTemplate,
  deleteTemplate
};

/***/ }),

/***/ "./www/sources/js/pages/notification-template/common.functions.js":
/*!************************************************************************!*\
  !*** ./www/sources/js/pages/notification-template/common.functions.js ***!
  \************************************************************************/
/*! exports provided: renderNotificationTypeOption, validateFormik */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderNotificationTypeOption", function() { return renderNotificationTypeOption; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateFormik", function() { return validateFormik; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");


const renderNotificationTypeOption = item => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
    key: item.notificationTypeId,
    value: item.notificationTypeId
  }, item.notificationTypeName);
};
const validateFormik = (values, languages = []) => {
  const errors = {};

  if (!values.notificationTypeId) {
    errors.notificationTypeId = _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('NotificationTypeRequired');
  }

  if (!values.notificationTemplateName || values.notificationTemplateName.trim().length === 0) {
    errors.notificationTemplateName = _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('TemplateNameRequired');
  } else {
    if (values.notificationTemplateName.trim().length > 1000) {
      errors.notificationTemplateName = _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].formatString(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('FieldMaxLength'), _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('TemplateName'), 1000);
    }
  }

  if (!values.title || values.title.trim().length === 0) {
    errors.title = _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('TitleRequired');
  } else {
    if (values.title.trim().length > 2000) {
      errors.title = _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].formatString(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('FieldMaxLength'), _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('Title'), 2000);
    }
  }

  languages.map(item => {
    if (!values['language_' + item.settingId] || values['language_' + item.settingId].trim().length === 0) {
      errors['language_' + item.settingId] = _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].formatString(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('FieldRequired'), `${_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('Content')} (${item.settingValue})`);
    }
  });
  return errors;
};

/***/ }),

/***/ "./www/sources/js/pages/notification-template/components/AppContainer.jsx":
/*!********************************************************************************!*\
  !*** ./www/sources/js/pages/notification-template/components/AppContainer.jsx ***!
  \********************************************************************************/
/*! exports provided: AppContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppContainer", function() { return AppContainer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/lib/index.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_toastify__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/notification-template/actions.js");
/* harmony import */ var _Filter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Filter */ "./www/sources/js/pages/notification-template/components/Filter.jsx");
/* harmony import */ var _DataGrid__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./DataGrid */ "./www/sources/js/pages/notification-template/components/DataGrid.jsx");
/* harmony import */ var _NewNotificationTemplate__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./NewNotificationTemplate */ "./www/sources/js/pages/notification-template/components/NewNotificationTemplate.jsx");
/* harmony import */ var _EditNotificationTemplate__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./EditNotificationTemplate */ "./www/sources/js/pages/notification-template/components/EditNotificationTemplate.jsx");
/* harmony import */ var _ContentDetailModalDialog__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./ContentDetailModalDialog */ "./www/sources/js/pages/notification-template/components/ContentDetailModalDialog.jsx");
/* harmony import */ var _jsroot_components_SweetModalDialog__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @jsroot/components/SweetModalDialog */ "./www/sources/js/components/SweetModalDialog.jsx");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }















class AppContainer extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleCloseCreatePopup", () => {
      this.props.setCreateTemplatePopup({
        show: false
      });
      this.props.setCreateTemplateResult(null);
    });

    _defineProperty(this, "handleCreateSuccess", () => {
      this.handleCloseCreatePopup();
      this.props.getGridData(this.props.gridParams);
    });

    _defineProperty(this, "handleCloseEditPopup", () => {
      this.props.setEditTemplatePopup({
        show: false
      });
      this.props.setSelectedTemplate(null);
      this.props.setEditTemplateResult(null);
    });

    _defineProperty(this, "handleEditSuccess", () => {
      this.handleCloseEditPopup();
      this.props.getGridData(this.props.gridParams);
    });

    _defineProperty(this, "handleCloseViewContentPopup", () => {
      this.props.setContentDetailPopup({
        show: false
      });
      this.props.setSelectedTemplate(null);
    });

    _defineProperty(this, "handleCloseDeletePopup", () => {
      this.props.setDeleteTemplatePopup({
        show: false
      });
    });

    _defineProperty(this, "handleDelete", () => {
      const {
        templateId,
        name
      } = this.props.deleteTemplatePopup;
      const params = {
        notificationTemplateId: templateId,
        notificationTemplateName: name
      };
      this.props.deleteTemplate(params).then(response => {
        const data = response.data;
        this.handleCloseDeletePopup();
        this.props.getGridData(this.props.gridParams);

        if (data.isSuccessful) {
          react_toastify__WEBPACK_IMPORTED_MODULE_3__["toast"].success(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_13__["default"].getResource('DeleteNotificationTemplateSuccessfully'));
        } else {
          react_toastify__WEBPACK_IMPORTED_MODULE_3__["toast"].error(data.message);
        }
      });
    });
  }

  componentDidMount() {
    this.props.getNotificationTypes();
    this.props.getLanguages();
  }

  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Filter__WEBPACK_IMPORTED_MODULE_7__["default"], {
      isHost: this.props.isHost
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DataGrid__WEBPACK_IMPORTED_MODULE_8__["default"], {
      isHost: this.props.isHost
    }), this.props.createTemplatePopup.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_NewNotificationTemplate__WEBPACK_IMPORTED_MODULE_9__["default"], {
      onClose: this.handleCloseCreatePopup,
      onSuccess: this.handleCreateSuccess
    }), this.props.editTemplatePopup.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_EditNotificationTemplate__WEBPACK_IMPORTED_MODULE_10__["default"], {
      onClose: this.handleCloseEditPopup,
      onSuccess: this.handleEditSuccess
    }), this.props.deleteTemplatePopup.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_SweetModalDialog__WEBPACK_IMPORTED_MODULE_12__["default"], {
      title: _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_13__["default"].getResource('Confirmation'),
      contents: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "Are you sure you want to delete ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, this.props.deleteTemplatePopup.name), "?"),
      buttons: [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
        variant: "primary",
        size: "sm",
        onClick: this.handleDelete
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_13__["default"].getResource('OK')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
        variant: "primary",
        size: "sm",
        onClick: this.handleCloseDeletePopup
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_13__["default"].getResource('Cancel'))],
      onClose: this.handleCloseDeletePopup
    }), this.props.contentDetailPopup.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ContentDetailModalDialog__WEBPACK_IMPORTED_MODULE_11__["default"], {
      onClose: this.handleCloseViewContentPopup
    }));
  }

}

_defineProperty(AppContainer, "propTypes", {
  contentDetailPopup: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.shape({
    show: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool
  }).isRequired,
  createTemplatePopup: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.shape({
    show: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool
  }).isRequired,
  deleteTemplatePopup: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.shape({
    show: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool
  }).isRequired,
  editTemplatePopup: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.shape({
    show: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool
  }).isRequired,
  getLanguages: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,
  getNotificationTypes: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.func,
  isHost: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool.isRequired
});

_defineProperty(AppContainer, "defaultProps", {
  contentDetailPopup: {
    show: false
  },
  createTemplatePopup: {
    show: false
  },
  deleteTemplatePopup: {
    show: false
  },
  editTemplatePopup: {
    show: false
  },
  getLanguages: function () {// nothing
  },
  getNotificationTypes: function () {// nothing
  },
  isHost: false
});

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_5__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_6__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    gridParams,
    createTemplatePopup,
    editTemplatePopup,
    deleteTemplatePopup,
    deleteTemplateResult,
    contentDetailPopup
  } = state;
  return {
    gridParams,
    createTemplatePopup,
    editTemplatePopup,
    deleteTemplatePopup,
    deleteTemplateResult,
    contentDetailPopup
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["connect"])(mapStateToProps, mapDispatchToProps)(AppContainer));

/***/ }),

/***/ "./www/sources/js/pages/notification-template/components/ContentDetailModalDialog.jsx":
/*!********************************************************************************************!*\
  !*** ./www/sources/js/pages/notification-template/components/ContentDetailModalDialog.jsx ***!
  \********************************************************************************************/
/*! exports provided: ContentDetailModalDialog, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContentDetailModalDialog", function() { return ContentDetailModalDialog; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var _jsroot_components_SweetModalDialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/components/SweetModalDialog */ "./www/sources/js/components/SweetModalDialog.jsx");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");






const ContentDetailModalDialog = props => {
  const template = props.template;
  const buttons = [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], {
    variant: "primary",
    size: "sm",
    onClick: props.onClose
  }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Close'))];
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_SweetModalDialog__WEBPACK_IMPORTED_MODULE_4__["default"], {
    size: "lg",
    backdropClassName: "notification-template-content-modal-backdrop",
    className: "notification-template-content-modal",
    title: template.title,
    contents: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, template.contents.map(item => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], {
        key: item.languageId
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "font-weight-bold"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Content'), " (", item.language, ")"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "border p-2 mt-2 mb-3 content"
      }, item.content));
    })),
    buttons: buttons,
    onClose: props.onClose
  });
};
ContentDetailModalDialog.propTypes = {
  template: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    notificationTemplateId: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
    notificationTypeId: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
    notificationTemplateName: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
    title: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
    contents: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object)
  }).isRequired
};
ContentDetailModalDialog.defaultProps = {
  template: {
    notificationTemplateId: 0,
    notificationTypeId: 0,
    notificationTemplateName: '',
    title: '',
    contents: []
  }
};

const mapStateToProps = state => {
  const {
    selectedTemplate
  } = state;
  return {
    template: selectedTemplate
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps)(ContentDetailModalDialog));

/***/ }),

/***/ "./www/sources/js/pages/notification-template/components/DataGrid.jsx":
/*!****************************************************************************!*\
  !*** ./www/sources/js/pages/notification-template/components/DataGrid.jsx ***!
  \****************************************************************************/
/*! exports provided: DataGrid, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataGrid", function() { return DataGrid; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/notification-template/actions.js");
/* harmony import */ var _jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/components/react-grid/index */ "./www/sources/js/components/react-grid/index.jsx");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/common/constants */ "./www/sources/js/common/constants.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








class DataGrid extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "onPaging", (pageIndex, pageSize) => {
      const params = _objectSpread({}, this.props.gridParams);

      params['pageIndex'] = pageIndex;
      params['pageSize'] = pageSize;
      this.props.setGridParams(params);
      this.props.getGridData(params);
    });

    _defineProperty(this, "handleEdit", id => {
      this.props.getTemplateById(id, () => this.props.setEditTemplatePopup({
        show: true
      }));
    });

    _defineProperty(this, "handleViewContent", id => {
      this.props.getTemplateById(id, () => this.props.setContentDetailPopup({
        show: true
      }));
    });

    _defineProperty(this, "handleDelete", (id, name) => {
      this.props.setDeleteTemplatePopup({
        show: true,
        templateId: id,
        name: name
      });
    });

    _defineProperty(this, "buildGridHeader", isHost => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderRow"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 5
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('SymbolNo')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 30
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('NotificationType')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 30
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('TemplateName')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 80
      }, `${_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Title')}/${_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Content')}`), isHost && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["HeaderCell"], {
        colWidth: 10
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Action')));
    });

    _defineProperty(this, "buildGridBody", isHost => {
      const {
        pageIndex,
        pageSize
      } = this.props.gridParams;
      this.startIndex = (pageIndex - 1) * pageSize + 1;

      if (this.props.gridData.data.length > 0) {
        return this.props.gridData.data.map((item, index) => this.renderRow(item, index, isHost));
      }

      return [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Row"], {
        key: `body${1}`,
        className: "no-data"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
        colSpan: "5"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('ThereIsNoData')))];
    });

    _defineProperty(this, "renderRow", (item, index, isHost) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Row"], {
      key: item.notificationTemplateId
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
      className: "text-center"
    }, index + this.startIndex), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], null, item.notificationTypeName), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], null, item.notificationTemplateName), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      href: "#",
      onClick: () => this.handleViewContent(item.notificationTemplateId)
    }, item.title)), isHost && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Cell"], {
      className: "text-center"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "rounded-circle fa fa-pencil icon-edit",
      onClick: () => this.handleEdit(item.notificationTemplateId)
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "rounded-circle fa fa-trash icon-delete",
      onClick: () => this.handleDelete(item.notificationTemplateId, item.notificationTemplateName)
    }))));
  }

  render() {
    if (!this.props.gridData || !this.props.gridData.data) {
      return null;
    }

    const {
      isHost
    } = this.props;
    const {
      totalItems
    } = this.props.gridData;
    const {
      pageIndex,
      pageSize
    } = this.props.gridParams;
    const pagingOption = {
      PageIndex: pageIndex,
      PageSize: pageSize,
      TotalItem: totalItems,
      PageList: _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_6__["PAGING_SIZES"]
    };
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "table-title"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('NotificationTemplate')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_4__["Table"], {
      minWidth: 720,
      maxWidth: document.getElementById('app-container').clientWidth,
      autoWidth: true,
      header: this.buildGridHeader(isHost),
      body: this.buildGridBody(isHost),
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
    gridParams,
    gridData
  } = state;
  return {
    gridParams,
    gridData
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(DataGrid));

/***/ }),

/***/ "./www/sources/js/pages/notification-template/components/EditNotificationTemplate.jsx":
/*!********************************************************************************************!*\
  !*** ./www/sources/js/pages/notification-template/components/EditNotificationTemplate.jsx ***!
  \********************************************************************************************/
/*! exports provided: EditNotificationTemplate, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditNotificationTemplate", function() { return EditNotificationTemplate; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/notification-template/actions.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! formik */ "./node_modules/formik/dist/formik.esm.js");
/* harmony import */ var _jsroot_components_DraggableModalDialog__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/components/DraggableModalDialog */ "./www/sources/js/components/DraggableModalDialog.jsx");
/* harmony import */ var _jsroot_components_FormikErrorMessage__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jsroot/components/FormikErrorMessage */ "./www/sources/js/components/FormikErrorMessage.jsx");
/* harmony import */ var _jsroot_components_ResponseMessage__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @jsroot/components/ResponseMessage */ "./www/sources/js/components/ResponseMessage.jsx");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var _common_functions__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../common.functions */ "./www/sources/js/pages/notification-template/common.functions.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }













class EditNotificationTemplate extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "renderForm", ({
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
      }), this.props.editTemplateResult && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_ResponseMessage__WEBPACK_IMPORTED_MODULE_9__["default"], {
        isSuccessful: this.props.editTemplateResult.isSuccessful,
        message: this.props.editTemplateResult.message || _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_10__["default"].getResource('EditNotificationTemplateSuccessfully')
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Form"].Label, {
        column: true,
        sm: "4",
        md: "3",
        className: "required",
        htmlFor: "notificationTypeId"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_10__["default"].getResource('NotificationType')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Col"], {
        sm: "8",
        md: "9"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Form"].Control, {
        as: "select",
        size: "sm",
        className: "shadow-none",
        name: "notificationTypeId",
        id: "notificationTypeId",
        isInvalid: touched.notificationTypeId && errors.notificationTypeId,
        onChange: handleChange,
        value: values.notificationTypeId
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        value: "",
        disabled: true,
        hidden: true
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_10__["default"].getResource('PleaseSelect')), this.props.notificationTypes.map(_common_functions__WEBPACK_IMPORTED_MODULE_11__["renderNotificationTypeOption"])))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Form"].Label, {
        column: true,
        sm: "4",
        md: "3",
        className: "required",
        htmlFor: "notificationTemplateName"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_10__["default"].getResource('TemplateName')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Col"], {
        sm: "8",
        md: "9"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Form"].Control, {
        type: "text",
        size: "sm",
        value: values.notificationTemplateName,
        className: "shadow-none",
        autoComplete: "off",
        name: "notificationTemplateName",
        id: "notificationTemplateName",
        isInvalid: touched.notificationTemplateName && errors.notificationTemplateName,
        onChange: handleChange
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Form"].Label, {
        column: true,
        sm: "4",
        md: "3",
        className: "required",
        htmlFor: "title"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_10__["default"].getResource('Title')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Col"], {
        sm: "8",
        md: "9"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Form"].Control, {
        type: "text",
        size: "sm",
        value: values.title,
        className: "shadow-none",
        autoComplete: "off",
        name: "title",
        id: "title",
        isInvalid: touched.title && errors.title,
        onChange: handleChange
      }))), this.props.languages !== null && this.props.languages.map(item => {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Form"].Group, {
          key: `language${item.settingId}`,
          as: react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Row"]
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Form"].Label, {
          column: true,
          sm: "4",
          md: "3",
          className: "required",
          htmlFor: 'language_' + item.settingId
        }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_10__["default"].getResource('Content'), " (", item.settingValue, ")"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Col"], {
          sm: "8",
          md: "9"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Form"].Control, {
          as: "textarea",
          value: values['language_' + item.settingId],
          className: "shadow-none form-control",
          name: 'language_' + item.settingId,
          id: 'language_' + item.settingId,
          rows: "4",
          isInvalid: touched['language_' + item.settingId] && errors['language_' + item.settingId],
          onChange: handleChange
        })));
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Modal"].Footer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Button"], {
        type: "submit",
        variant: "primary",
        size: "sm",
        disabled: isSubmitting
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_10__["default"].getResource('Save')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Button"], {
        type: "submit",
        variant: "primary",
        size: "sm",
        onClick: this.props.onClose
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_10__["default"].getResource('Cancel'))));
    });

    _defineProperty(this, "handleSubmit", (values, {
      setSubmitting
    }) => {
      setSubmitting(true);
      const template = {
        notificationTemplateId: values.notificationTemplateId,
        notificationTypeId: values.notificationTypeId,
        notificationTemplateName: values.notificationTemplateName,
        title: values.title,
        contents: []
      };
      this.props.languages !== null && this.props.languages.map(item => {
        template.contents.push({
          languageId: item.settingId,
          content: values['language_' + item.settingId]
        });
      });
      this.props.editTemplate(template).then(() => {
        if (this.props.editTemplateResult.isSuccessful) {
          setTimeout(() => {
            this.props.onSuccess();
          }, 3000);
        } else {
          setSubmitting(false);
        }
      });
    });
  }

  render() {
    const template = this.props.template;
    const initialValues = {
      notificationTemplateId: template.notificationTemplateId,
      notificationTypeId: template.notificationTypeId,
      notificationTemplateName: template.notificationTemplateName,
      title: template.title
    };
    this.props.languages !== null && this.props.languages.map(item => {
      initialValues['language_' + item.settingId] = '';
      const index = template.contents.findIndex(x => x.languageId === item.settingId);

      if (index >= 0) {
        initialValues['language_' + item.settingId] = template.contents[index].content;
      }
    });
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Modal"], {
      show: true,
      className: "notification-template-modal",
      dialogAs: _jsroot_components_DraggableModalDialog__WEBPACK_IMPORTED_MODULE_7__["default"],
      onHide: this.props.onClose,
      backdrop: "static",
      keyboard: false,
      size: "lg",
      centered: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Modal"].Header, {
      closeButton: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Modal"].Title, {
      as: "div"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_10__["default"].getResource('EditNotificationTemplate'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_6__["Formik"], {
      validate: values => Object(_common_functions__WEBPACK_IMPORTED_MODULE_11__["validateFormik"])(values, this.props.languages),
      onSubmit: this.handleSubmit,
      initialValues: initialValues
    }, this.renderForm));
  }

}

_defineProperty(EditNotificationTemplate, "propTypes", {
  languages: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object),
  notificationTypes: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object),
  template: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    notificationTemplateId: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
    notificationTypeId: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
    notificationTemplateName: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
    title: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
    contents: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object)
  }).isRequired
});

_defineProperty(EditNotificationTemplate, "defaultProps", {
  languages: [],
  notificationTypes: [],
  template: {
    notificationTemplateId: 0,
    notificationTypeId: 0,
    notificationTemplateName: '',
    title: '',
    contents: []
  }
});

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_3__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_4__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    editTemplateResult,
    selectedTemplate,
    notificationTypes,
    languages
  } = state;
  return {
    editTemplateResult,
    template: selectedTemplate,
    notificationTypes,
    languages
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(EditNotificationTemplate));

/***/ }),

/***/ "./www/sources/js/pages/notification-template/components/Filter.jsx":
/*!**************************************************************************!*\
  !*** ./www/sources/js/pages/notification-template/components/Filter.jsx ***!
  \**************************************************************************/
/*! exports provided: Filter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Filter", function() { return Filter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/notification-template/actions.js");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var _common_functions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../common.functions */ "./www/sources/js/pages/notification-template/common.functions.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









class Filter extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleNotificationTypeChange", event => {
      this.setState({
        notificationTypeId: event.target.value
      });
    });

    _defineProperty(this, "handleTemplateNameChange", event => {
      this.setState({
        notificationTemplateName: event.target.value
      });
    });

    _defineProperty(this, "getParams", () => {
      return {
        notificationTypeId: parseInt(this.state.notificationTypeId, 10),
        notificationTemplateName: this.state.notificationTemplateName,
        pageIndex: 1,
        pageSize: 100
      };
    });

    _defineProperty(this, "handleSubmit", event => {
      event.preventDefault();
      const params = this.getParams();
      this.props.setGridParams(params);
      this.props.getGridData(params);
    });

    _defineProperty(this, "handleOpenCreatePopup", () => this.props.setCreateTemplatePopup({
      show: true
    }));

    this.state = {
      notificationTypeId: '',
      notificationTemplateName: ''
    };
  }

  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"], {
      className: "form-filter",
      onSubmit: this.handleSubmit
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Row, {
      bsPrefix: "form-row"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
      htmlFor: "filterNotificationTypeId"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('NotificationType')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
      as: "select",
      size: "sm",
      className: "shadow-none",
      id: "filterNotificationTypeId",
      value: this.state.notificationTypeId,
      onChange: this.handleNotificationTypeChange
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
      value: ""
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('All')), this.props.notificationTypes.map(_common_functions__WEBPACK_IMPORTED_MODULE_7__["renderNotificationTypeOption"]))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
      htmlFor: "filterNotificationTemplateName"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('TemplateName')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
      type: "text",
      size: "sm",
      className: "shadow-none",
      id: "filterNotificationTemplateName",
      autoComplete: "off",
      value: this.state.notificationTemplateName,
      onChange: this.handleTemplateNameChange
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], {
      className: "mr-4",
      variant: "primary",
      size: "sm",
      onClick: this.handleSubmit
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Submit')), this.props.isHost && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], {
      variant: "primary",
      size: "sm",
      onClick: this.handleOpenCreatePopup
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Insert')))));
  }

}

_defineProperty(Filter, "propTypes", {
  notificationTypes: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object)
});

_defineProperty(Filter, "defaultProps", {
  notificationTypes: []
});

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_3__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_5__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    notificationTypes
  } = state;
  return {
    notificationTypes
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(Filter));

/***/ }),

/***/ "./www/sources/js/pages/notification-template/components/NewNotificationTemplate.jsx":
/*!*******************************************************************************************!*\
  !*** ./www/sources/js/pages/notification-template/components/NewNotificationTemplate.jsx ***!
  \*******************************************************************************************/
/*! exports provided: NewNotificationTemplate, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewNotificationTemplate", function() { return NewNotificationTemplate; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/notification-template/actions.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! formik */ "./node_modules/formik/dist/formik.esm.js");
/* harmony import */ var _jsroot_components_DraggableModalDialog__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/components/DraggableModalDialog */ "./www/sources/js/components/DraggableModalDialog.jsx");
/* harmony import */ var _jsroot_components_FormikErrorMessage__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jsroot/components/FormikErrorMessage */ "./www/sources/js/components/FormikErrorMessage.jsx");
/* harmony import */ var _jsroot_components_ResponseMessage__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @jsroot/components/ResponseMessage */ "./www/sources/js/components/ResponseMessage.jsx");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var _common_functions__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../common.functions */ "./www/sources/js/pages/notification-template/common.functions.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }













class NewNotificationTemplate extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "renderForm", ({
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
      }), this.props.createTemplateResult && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_ResponseMessage__WEBPACK_IMPORTED_MODULE_9__["default"], {
        isSuccessful: this.props.createTemplateResult.isSuccessful,
        message: this.props.createTemplateResult.message || _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_10__["default"].getResource('InsertNotificationTemplateSuccessfully')
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Form"].Label, {
        column: true,
        sm: "4",
        md: "3",
        className: "required",
        htmlFor: "notificationTypeId"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_10__["default"].getResource('NotificationType')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Col"], {
        sm: "8",
        md: "9"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Form"].Control, {
        as: "select",
        size: "sm",
        className: "shadow-none",
        isInvalid: touched.notificationTypeId && errors.notificationTypeId,
        name: "notificationTypeId",
        id: "notificationTypeId",
        value: values.notificationTypeId,
        onChange: handleChange
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        value: "",
        hidden: true,
        disabled: true
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_10__["default"].getResource('PleaseSelect')), this.props.notificationTypes.map(_common_functions__WEBPACK_IMPORTED_MODULE_11__["renderNotificationTypeOption"])))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Form"].Label, {
        column: true,
        sm: "4",
        md: "3",
        className: "required",
        htmlFor: "notificationTemplateName"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_10__["default"].getResource('TemplateName')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Col"], {
        sm: "8",
        md: "9"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Form"].Control, {
        type: "text",
        size: "sm",
        value: values.notificationTemplateName,
        name: "notificationTemplateName",
        id: "notificationTemplateName",
        className: "shadow-none",
        autoComplete: "off",
        isInvalid: touched.notificationTemplateName && errors.notificationTemplateName,
        onChange: handleChange
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Form"].Label, {
        column: true,
        sm: "4",
        md: "3",
        className: "required",
        htmlFor: "title"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_10__["default"].getResource('Title')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Col"], {
        sm: "8",
        md: "9"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Form"].Control, {
        type: "text",
        size: "sm",
        value: values.title,
        name: "title",
        id: "title",
        className: "shadow-none",
        autoComplete: "off",
        isInvalid: touched.title && errors.title,
        onChange: handleChange
      }))), this.props.languages !== null && this.props.languages.map(item => {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Form"].Group, {
          key: `language${item.settingId}`,
          as: react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Row"]
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Form"].Label, {
          column: true,
          sm: "4",
          md: "3",
          className: "required",
          htmlFor: 'language_' + item.settingId
        }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_10__["default"].getResource('Content'), " (", item.settingValue, ")"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Col"], {
          sm: "8",
          md: "9"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Form"].Control, {
          as: "textarea",
          className: "shadow-none form-control",
          value: values['language_' + item.settingId],
          name: 'language_' + item.settingId,
          id: 'language_' + item.settingId,
          rows: "4",
          isInvalid: touched['language_' + item.settingId] && errors['language_' + item.settingId],
          onChange: handleChange
        })));
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Modal"].Footer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Button"], {
        type: "submit",
        variant: "primary",
        size: "sm",
        disabled: isSubmitting
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_10__["default"].getResource('Save')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Button"], {
        type: "submit",
        variant: "primary",
        size: "sm",
        onClick: this.props.onClose
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_10__["default"].getResource('Cancel'))));
    });

    _defineProperty(this, "handleSubmit", (values, {
      setSubmitting
    }) => {
      setSubmitting(true);
      const template = {
        notificationTypeId: values.notificationTypeId,
        notificationTemplateName: values.notificationTemplateName,
        title: values.title,
        contents: []
      };
      this.props.languages !== null && this.props.languages.map(item => {
        template.contents.push({
          languageId: item.settingId,
          content: values['language_' + item.settingId]
        });
      });
      this.props.createTemplate(template).then(() => {
        if (this.props.createTemplateResult.isSuccessful) {
          setTimeout(() => {
            this.props.onSuccess();
          }, 3000);
        } else {
          setSubmitting(false);
        }
      });
    });
  }

  render() {
    const initialValues = {
      notificationTypeId: '',
      notificationTemplateName: '',
      title: ''
    };
    this.props.languages !== null && this.props.languages.map(item => {
      initialValues['language_' + item.settingId] = '';
    });
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Modal"], {
      show: true,
      className: "notification-template-modal",
      dialogAs: _jsroot_components_DraggableModalDialog__WEBPACK_IMPORTED_MODULE_7__["default"],
      backdrop: "static",
      keyboard: false,
      size: "lg",
      centered: true,
      onHide: this.props.onClose
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Modal"].Header, {
      closeButton: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_5__["Modal"].Title, {
      as: "div"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_10__["default"].getResource('InsertNotificationTemplate'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_6__["Formik"], {
      initialValues: initialValues,
      validate: values => Object(_common_functions__WEBPACK_IMPORTED_MODULE_11__["validateFormik"])(values, this.props.languages),
      onSubmit: this.handleSubmit
    }, this.renderForm));
  }

}

_defineProperty(NewNotificationTemplate, "propTypes", {
  languages: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object),
  notificationTypes: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object)
});

_defineProperty(NewNotificationTemplate, "defaultProps", {
  languages: [],
  notificationTypes: []
});

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_3__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_4__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    notificationTypes,
    languages,
    createTemplateResult
  } = state;
  return {
    notificationTypes,
    languages,
    createTemplateResult
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(NewNotificationTemplate));

/***/ }),

/***/ "./www/sources/js/pages/notification-template/index.js":
/*!*************************************************************!*\
  !*** ./www/sources/js/pages/notification-template/index.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return index; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @reduxjs/toolkit */ "./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");
/* harmony import */ var _notificationTemplateSlice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./notificationTemplateSlice */ "./www/sources/js/pages/notification-template/notificationTemplateSlice.js");
/* harmony import */ var _components_AppContainer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/AppContainer */ "./www/sources/js/pages/notification-template/components/AppContainer.jsx");
/* harmony import */ var _cssroot_pages_notification_template_index_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @cssroot/pages/notification-template/index.scss */ "./www/sources/css/pages/notification-template/index.scss");
/* harmony import */ var _cssroot_pages_notification_template_index_scss__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_cssroot_pages_notification_template_index_scss__WEBPACK_IMPORTED_MODULE_5__);





const store = Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__["configureStore"])({
  reducer: _notificationTemplateSlice__WEBPACK_IMPORTED_MODULE_3__["default"]
});

const isHost = true;
class index extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_1__["Provider"], {
      store: store
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_AppContainer__WEBPACK_IMPORTED_MODULE_4__["default"], {
      isHost: isHost
    }));
  }

}

/***/ }),

/***/ "./www/sources/js/pages/notification-template/notificationTemplateSlice.js":
/*!*********************************************************************************!*\
  !*** ./www/sources/js/pages/notification-template/notificationTemplateSlice.js ***!
  \*********************************************************************************/
/*! exports provided: setNotificationTypes, setLanguages, setGridParams, setGridData, setSelectedTemplate, setCreateTemplatePopup, setCreateTemplateResult, setEditTemplatePopup, setEditTemplateResult, setDeleteTemplatePopup, setContentDetailPopup, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setNotificationTypes", function() { return setNotificationTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setLanguages", function() { return setLanguages; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setGridParams", function() { return setGridParams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setGridData", function() { return setGridData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSelectedTemplate", function() { return setSelectedTemplate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setCreateTemplatePopup", function() { return setCreateTemplatePopup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setCreateTemplateResult", function() { return setCreateTemplateResult; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setEditTemplatePopup", function() { return setEditTemplatePopup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setEditTemplateResult", function() { return setEditTemplateResult; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setDeleteTemplatePopup", function() { return setDeleteTemplatePopup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setContentDetailPopup", function() { return setContentDetailPopup; });
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @reduxjs/toolkit */ "./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");

const notificationTemplateSlice = Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__["createSlice"])({
  name: 'notificationTemplate',
  initialState: {
    notificationTypes: [],
    languages: [],
    gridParams: {
      notificationTypeId: '',
      notificationTemplateName: '',
      pageIndex: 1,
      pageSize: 100
    },
    gridData: null,
    selectedTemplate: null,
    createTemplatePopup: {
      show: false
    },
    createTemplateResult: null,
    editTemplatePopup: {
      show: false
    },
    editTemplateResult: null,
    deleteTemplatePopup: {
      show: false
    },
    contentDetailPopup: {
      show: false
    }
  },
  reducers: {
    setNotificationTypes: (state, action) => {
      state.notificationTypes = action.payload;
    },
    setLanguages: (state, action) => {
      state.languages = action.payload;
    },
    setGridParams: (state, action) => {
      state.gridParams = action.payload;
    },
    setGridData: (state, action) => {
      state.gridData = action.payload;
    },
    setSelectedTemplate: (state, action) => {
      state.selectedTemplate = action.payload;
    },
    setCreateTemplatePopup: (state, action) => {
      state.createTemplatePopup = action.payload;
    },
    setCreateTemplateResult: (state, action) => {
      state.createTemplateResult = action.payload;
    },
    setEditTemplatePopup: (state, action) => {
      state.editTemplatePopup = action.payload;
    },
    setEditTemplateResult: (state, action) => {
      state.editTemplateResult = action.payload;
    },
    setDeleteTemplatePopup: (state, action) => {
      state.deleteTemplatePopup = action.payload;
    },
    setContentDetailPopup: (state, action) => {
      state.contentDetailPopup = action.payload;
    }
  }
});
const {
  actions,
  reducer
} = notificationTemplateSlice;
const {
  setNotificationTypes,
  setLanguages,
  setGridParams,
  setGridData,
  setSelectedTemplate,
  setCreateTemplatePopup,
  setCreateTemplateResult,
  setEditTemplatePopup,
  setEditTemplateResult,
  setDeleteTemplatePopup,
  setContentDetailPopup
} = actions;
/* harmony default export */ __webpack_exports__["default"] = (reducer);

/***/ })

}]);
//# sourceMappingURL=0.chunk.js.map