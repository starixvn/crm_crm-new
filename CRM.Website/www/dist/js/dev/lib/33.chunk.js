(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[33],{

/***/ "./www/sources/css/pages/communication-log/index.scss":
/*!************************************************************!*\
  !*** ./www/sources/css/pages/communication-log/index.scss ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./www/sources/js/pages/communication-log/components/AppContainer.jsx":
/*!****************************************************************************!*\
  !*** ./www/sources/js/pages/communication-log/components/AppContainer.jsx ***!
  \****************************************************************************/
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
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/communication-log/actions.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _Filter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Filter */ "./www/sources/js/pages/communication-log/components/Filter.jsx");
/* harmony import */ var _DataGrid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./DataGrid */ "./www/sources/js/pages/communication-log/components/DataGrid.jsx");
/* harmony import */ var _feedback_edit_no_of_inquiry_AppContainer__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../feedback/edit-no-of-inquiry/AppContainer */ "./www/sources/js/pages/feedback/edit-no-of-inquiry/AppContainer.jsx");
/* harmony import */ var _EditCommunicationLog__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./EditCommunicationLog */ "./www/sources/js/pages/communication-log/components/EditCommunicationLog.jsx");
/* harmony import */ var _CreateCommunicationLog__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./CreateCommunicationLog */ "./www/sources/js/pages/communication-log/components/CreateCommunicationLog.jsx");
/* harmony import */ var _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @jsroot/common/constants */ "./www/sources/js/common/constants.js");
/* harmony import */ var _jsroot_common_shareScripts__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @jsroot/common/shareScripts */ "./www/sources/js/common/shareScripts.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }













class AppContainer extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleCloseEditNoInquiryDialog", () => {
      this.props.setEditNoOfInquiryDialog({
        show: false
      });
    });

    _defineProperty(this, "handleCloseEditCommunicationDialog", isSuccessful => {
      this.props.setEditCommunicationDialog({
        show: false
      });

      if (isSuccessful) {
        this.props.getLogsByCustomerId(this.props.gridParams);
      }
    });

    _defineProperty(this, "handleCloseCreateCommunicationDiaLog", isSuccessful => {
      this.props.setCreateCommunicationDialog({
        show: false
      });

      if (isSuccessful) {
        this.props.setGridParams(_objectSpread(_objectSpread({}, this.props.gridParams), {}, {
          pageIndex: 1,
          pageSize: 100
        }));
        this.props.getLogsByCustomerId(this.props.gridParams);
      }
    });

    this.state = {
      customerInfoPolicy: null,
      createUpdateFeedbackPermission: null
    };
  }

  componentDidMount() {
    Object(_jsroot_common_shareScripts__WEBPACK_IMPORTED_MODULE_11__["getPermission"])(_jsroot_common_constants__WEBPACK_IMPORTED_MODULE_10__["FunctionKey"].CreateUpdateFeedbackAndCustomerInfo).then(response => {
      this.setState({
        customerInfoPolicy: response
      });
    });
    Object(_jsroot_common_shareScripts__WEBPACK_IMPORTED_MODULE_11__["getPermission"])(_jsroot_common_constants__WEBPACK_IMPORTED_MODULE_10__["FunctionKey"].CreateUpdateFeedbackAndCustomerInfo).then(response => {
      this.setState({
        createUpdateFeedbackPermission: response
      });
    });
  }

  componentWillUnmount() {
    this.props.resetState();
  }

  render() {
    const {
      editNoOfInquiryDialog,
      editCommunicationDialog,
      createCommunicationDialog
    } = this.props;
    const {
      customerInfoPolicy,
      createUpdateFeedbackPermission
    } = this.state;

    if (!customerInfoPolicy || !createUpdateFeedbackPermission) {
      return null;
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Filter__WEBPACK_IMPORTED_MODULE_5__["default"], {
      id: this.props.id
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DataGrid__WEBPACK_IMPORTED_MODULE_6__["default"], {
      customerInfoPolicy: customerInfoPolicy,
      createUpdateFeedbackPermission: createUpdateFeedbackPermission
    }), editNoOfInquiryDialog.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_feedback_edit_no_of_inquiry_AppContainer__WEBPACK_IMPORTED_MODULE_7__["default"], {
      feedbackId: editNoOfInquiryDialog.feedbackId,
      onClose: this.handleCloseEditNoInquiryDialog
    }), editCommunicationDialog.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_EditCommunicationLog__WEBPACK_IMPORTED_MODULE_8__["default"], {
      feedbackId: editCommunicationDialog.feedbackId,
      createUpdateFeedbackPermission: createUpdateFeedbackPermission,
      onClose: this.handleCloseEditCommunicationDialog
    }), createCommunicationDialog.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_CreateCommunicationLog__WEBPACK_IMPORTED_MODULE_9__["default"], {
      id: this.props.id,
      onClose: this.handleCloseCreateCommunicationDiaLog
    }));
  }

}

_defineProperty(AppContainer, "propTypes", {
  editNoOfInquiryDialog: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    show: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool
  }).isRequired,
  editCommunicationDialog: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    show: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool
  }).isRequired,
  createCommunicationDialog: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.shape({
    show: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool
  }).isRequired
});

_defineProperty(AppContainer, "defaultProps", {
  editNoOfInquiryDialog: {
    show: false
  },
  editCommunicationDialog: {
    show: false
  },
  createCommunicationDialog: {
    show: false
  }
});

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_4__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    gridParams,
    editNoOfInquiryDialog,
    editCommunicationDialog,
    createCommunicationDialog
  } = state;
  return {
    gridParams,
    editNoOfInquiryDialog,
    editCommunicationDialog,
    createCommunicationDialog
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(AppContainer));

/***/ }),

/***/ "./www/sources/js/pages/communication-log/components/DataGrid.jsx":
/*!************************************************************************!*\
  !*** ./www/sources/js/pages/communication-log/components/DataGrid.jsx ***!
  \************************************************************************/
/*! exports provided: DataGrid, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataGrid", function() { return DataGrid; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/communication-log/actions.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var _jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/components/react-grid/index */ "./www/sources/js/components/react-grid/index.jsx");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/common/dateTimeService */ "./www/sources/js/common/dateTimeService.js");
/* harmony import */ var _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jsroot/common/constants */ "./www/sources/js/common/constants.js");
/* harmony import */ var _jsroot_common_shareScripts__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @jsroot/common/shareScripts */ "./www/sources/js/common/shareScripts.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }











class DataGrid extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "buildHeader", () => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderRow"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 20,
        sortOrder: "desc",
        sortBy: "runningNo"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('RunningNo')), window.createUpdateFeedbackPermission === _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_8__["Policy"].Host && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 15
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Update')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 25,
        sortOrder: "desc",
        sortBy: "Time"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('FeedbackDate')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 55,
        sortOrder: "desc",
        sortBy: "Category"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Category')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 40,
        sortOrder: "desc",
        sortBy: "Subject"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Subject')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 20,
        sortOrder: "desc",
        sortBy: "Status"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Status')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 20,
        sortOrder: "desc",
        sortBy: "Duration"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Duration')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 20,
        sortOrder: "desc",
        sortBy: "Handler"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Handler')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 20,
        sortOrder: "desc",
        sortBy: "Reviewer"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Reviewer')));
    });

    _defineProperty(this, "buildBody", () => {
      const {
        gridData,
        gridParams
      } = this.props;
      const {
        pageIndex,
        pageSize
      } = gridParams;
      const skip = pageSize * (pageIndex - 1);
      const data = gridData.data.slice(skip, pageSize * pageIndex);

      if (data.length > 0) {
        return data.map((item, index) => this.renderRow(item, index));
      }

      return [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Row"], {
        key: `body${1}`,
        className: "no-data"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
        className: "text-center",
        colSpan: window.createUpdateFeedbackPermission === _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_8__["Policy"].Host ? 9 : 8
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('ThereIsNoData')))];
    });

    _defineProperty(this, "onSort", (sortBy, sortOrder) => {
      const {
        gridData
      } = this.props;
      const cloneGridData = [...gridData.data];
      const gridDataSortAsc = Object(_jsroot_common_shareScripts__WEBPACK_IMPORTED_MODULE_9__["handleSort"])(cloneGridData, sortBy, sortOrder);
      this.props.setLogsByCustomerId({
        data: gridDataSortAsc,
        mainCategories: gridData.mainCategories
      });
    });

    _defineProperty(this, "handleGroupCategory", category => {
      const groupCategory = category.reduce((accumulator, currentValue) => {
        const itemExist = accumulator.find(item => currentValue.mainCategoryId === item.mainCategoryId);

        if (itemExist) {
          itemExist.subCategoryId = [...itemExist.subCategoryId, currentValue.subCategoryId];
        } else {
          accumulator.push({
            mainCategoryId: currentValue.mainCategoryId,
            subCategoryId: [currentValue.subCategoryId]
          });
        }

        return accumulator;
      }, []);
      return groupCategory;
    });

    _defineProperty(this, "handleEditNoOfInquiry", id => {
      this.props.setEditNoOfInquiryDialog({
        show: true,
        feedbackId: id
      });
    });

    _defineProperty(this, "handleEditCommunicationLog", id => {
      this.props.setEditCommunicationDialog({
        show: true,
        feedbackId: id
      });
    });

    _defineProperty(this, "handleCreate", () => {
      this.props.setCreateCommunicationDialog({
        show: true
      });
    });

    _defineProperty(this, "renderCategoryColumn", item => {
      const {
        mainCategories
      } = this.props.gridData;
      const groupCategory = this.handleGroupCategory(item.communicationSettings);
      return groupCategory.map((value, key) => {
        const filterMainCategory = mainCategories.find(element => element.settingId === value.mainCategoryId);
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], {
          key: key
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "font-weight-bold"
        }, filterMainCategory.settingValue), value.subCategoryId.map((subId, index) => {
          const filterSubCategory = filterMainCategory.childSettings.find(element => element.subCategoryId === subId);
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
            key: index,
            className: "font-italic ml-3"
          }, filterSubCategory.name);
        }));
      });
    });

    _defineProperty(this, "renderRow", (item, index) => {
      const cssStatus = item.status ? item.status.toLowerCase() : '',
            cssClass = cssStatus !== 'pending' && cssStatus !== 'closed' ? '' : cssStatus;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Row"], {
        key: index,
        className: cssClass
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
        className: "text-center"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "link-click",
        onClick: () => this.handleEditCommunicationLog(item.feedbackId)
      }, item.feedbackId)), window.createUpdateFeedbackPermission === _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_8__["Policy"].Host && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
        className: "text-center"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "rounded-circle fa fa-pencil icon-edit",
        onClick: () => this.handleEditNoOfInquiry(item.feedbackId)
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
        className: "text-center"
      }, _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_7__["default"].toShortDateTimeFormat(item.feedbackDate)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], null, this.renderCategoryColumn(item)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], null, item.subject), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
        className: "text-center"
      }, item.status), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
        className: "text-center"
      }, item.duration.replace(/\s+/g, '')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
        className: "text-center"
      }, item.handler), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
        className: "text-center"
      }, item.reviewer));
    });

    _defineProperty(this, "onPaging", (pageIndex, pageSize) => {
      this.props.setGridParams(_objectSpread(_objectSpread({}, this.props.gridParams), {}, {
        pageIndex: pageIndex,
        pageSize: pageSize
      }));
    });

    this.sortDesc = true;
  }

  render() {
    const {
      gridData,
      gridParams
    } = this.props;

    if (!gridData) {
      return null;
    }

    const {
      pageIndex,
      pageSize
    } = gridParams;
    const pagingOption = {
      PageIndex: pageIndex,
      PageSize: pageSize,
      TotalItem: gridData.data.length,
      PageList: _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_8__["PAGING_SIZES"]
    };
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "table-title d-flex justify-content-between align-items-center"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('CustomerCommunicationLogs'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Table"], {
      width: 1400,
      autoWidth: false,
      header: this.buildHeader(),
      body: this.buildBody(),
      isPaging: true,
      onSort: this.onSort,
      pageOption: pagingOption,
      onPaging: this.onPaging,
      containerPadding: 0,
      adjustedHeight: 10
    }), window.customerInfoPolicy === _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_8__["Policy"].Host && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], {
      variant: "primary",
      size: "sm",
      className: "mt-3",
      onClick: this.handleCreate
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('InsertCase')));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_3__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"], dispatch);

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

/***/ "./www/sources/js/pages/communication-log/components/Filter.jsx":
/*!**********************************************************************!*\
  !*** ./www/sources/js/pages/communication-log/components/Filter.jsx ***!
  \**********************************************************************/
/*! exports provided: Filter, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Filter", function() { return Filter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/communication-log/actions.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var _jsroot_components_date_picker_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/components/date-picker/index */ "./www/sources/js/components/date-picker/index.jsx");
/* harmony import */ var _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/common/dateTimeService */ "./www/sources/js/common/dateTimeService.js");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









class Filter extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleChange", event => {
      const name = event.target.name;
      this.setState({
        [name]: event.target.type === 'select-one' ? parseInt(event.target.value, 10) : event.target.value
      });
    });

    _defineProperty(this, "handleChangeToDate", toDate => {
      this.setState({
        toDate: toDate,
        maxFromDate: toDate
      });
    });

    _defineProperty(this, "handleChangeFromDate", fromDate => {
      this.setState({
        fromDate: fromDate,
        minToDate: fromDate
      });
    });

    _defineProperty(this, "handleSubmit", event => {
      event.preventDefault();
      const {
        statusId,
        handler,
        fromDate,
        toDate
      } = this.state;
      const params = {
        customerId: this.props.id,
        pageIndex: 1,
        pageSize: 100,
        statusId: statusId,
        handler: handler,
        fromDate: _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__["default"].toLongDateTimeFormat(fromDate),
        toDate: _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__["default"].toLongDateTimeFormat(toDate)
      };
      this.props.setGridParams(params);
      this.props.getLogsByCustomerId(params);
    });

    _defineProperty(this, "renderOptions", (name, item, key) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
      key: key,
      value: item
    }, name));

    const currentClientTime = window.currentClientTime;
    const currentDate = new Date(_jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__["default"].toShortDateTimeFormat(new Date(currentClientTime)));
    const date = new Date();

    const _fromDate = new Date(_jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__["default"].firstDayOfMonth(date));

    this.state = {
      fromDate: _fromDate,
      toDate: currentDate,
      maxFromDate: currentDate,
      maxToDate: currentDate,
      minFromDate: '',
      minToDate: _fromDate,
      statusId: 0,
      handler: ''
    };
  }

  componentDidMount() {
    const {
      fromDate,
      toDate
    } = this.state;
    const params = {
      customerId: this.props.id,
      pageIndex: 1,
      pageSize: 100,
      fromDate: _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__["default"].toLongDateTimeFormat(fromDate),
      handler: '',
      statusId: 0,
      toDate: _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_6__["default"].toLongDateTimeFormat(toDate)
    };
    this.props.getLogsByCustomerId(params);
    this.props.setGridParams(params);
    this.props.getStatusForFilter();
  }

  render() {
    const {
      statusFilter
    } = this.props;

    if (!statusFilter) {
      return null;
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"], {
      onSubmit: this.handleSubmit,
      className: "form-filter"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Row, {
      bsPrefix: "form-row"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
      className: "col-auto col-form-label"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Handler')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
      as: "input",
      size: "sm",
      value: this.state.handler,
      name: "handler",
      id: "handler",
      className: "shadow-none",
      autoComplete: "off",
      onChange: this.handleChange
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
      className: "col-auto col-form-label"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('FromDate')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "react-datepicker-wrapper-container"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_date_picker_index__WEBPACK_IMPORTED_MODULE_5__["default"], {
      dropdownMode: "select",
      showMonthDropdown: true,
      showYearDropdown: true,
      maxDate: this.state.maxFromDate,
      minDate: this.state.minFromDate,
      selected: this.state.fromDate,
      onChange: value => this.handleChangeFromDate(value)
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
      className: "col-auto col-form-label"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('ToDate')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "react-datepicker-wrapper-container"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_date_picker_index__WEBPACK_IMPORTED_MODULE_5__["default"], {
      dropdownMode: "select",
      showMonthDropdown: true,
      showYearDropdown: true,
      maxDate: this.state.maxToDate,
      minDate: this.state.minToDate,
      selected: this.state.toDate,
      onChange: value => this.handleChangeToDate(value)
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
      className: "col-auto col-form-label"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Status')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
      as: "select",
      size: "sm",
      className: "shadow-none",
      name: "statusId",
      onChange: this.handleChange
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
      value: "0"
    }, "All"), statusFilter.map((value, key) => this.renderOptions(value.name, value.statusId, key)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "form-group-button"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], {
      type: "submit",
      variant: "primary",
      size: "sm"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_7__["default"].getResource('Submit')))));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_3__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_2__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    gridParams,
    statusFilter
  } = state;
  return {
    gridParams,
    statusFilter
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(Filter));

/***/ }),

/***/ "./www/sources/js/pages/communication-log/index.js":
/*!*********************************************************!*\
  !*** ./www/sources/js/pages/communication-log/index.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @reduxjs/toolkit */ "./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");
/* harmony import */ var _communicationLogSlice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./communicationLogSlice */ "./www/sources/js/pages/communication-log/communicationLogSlice.js");
/* harmony import */ var _components_AppContainer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/AppContainer */ "./www/sources/js/pages/communication-log/components/AppContainer.jsx");
/* harmony import */ var _jsroot_components_WithNavigation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/components/WithNavigation */ "./www/sources/js/components/WithNavigation.jsx");
/* harmony import */ var _cssroot_pages_communication_log_index_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @cssroot/pages/communication-log/index.scss */ "./www/sources/css/pages/communication-log/index.scss");
/* harmony import */ var _cssroot_pages_communication_log_index_scss__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_cssroot_pages_communication_log_index_scss__WEBPACK_IMPORTED_MODULE_6__);






const store = Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__["configureStore"])({
  reducer: _communicationLogSlice__WEBPACK_IMPORTED_MODULE_3__["default"]
});


class index extends react__WEBPACK_IMPORTED_MODULE_0___default.a.PureComponent {
  render() {
    const location = this.props.location;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_1__["Provider"], {
      store: store
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "communication-log"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_AppContainer__WEBPACK_IMPORTED_MODULE_4__["default"], {
      id: !location.state ? null : location.state.toString()
    })));
  }

}

const FunctionBarWithNavigation = Object(_jsroot_components_WithNavigation__WEBPACK_IMPORTED_MODULE_5__["default"])(index);
/* harmony default export */ __webpack_exports__["default"] = (FunctionBarWithNavigation);

/***/ })

}]);
//# sourceMappingURL=33.chunk.js.map