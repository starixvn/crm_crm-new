(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[13],{

/***/ "./www/sources/css/pages/admin-tool/feedback-subject/index.scss":
/*!**********************************************************************!*\
  !*** ./www/sources/css/pages/admin-tool/feedback-subject/index.scss ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./www/sources/js/pages/admin-tool/feedback-subject/actions.js":
/*!*********************************************************************!*\
  !*** ./www/sources/js/pages/admin-tool/feedback-subject/actions.js ***!
  \*********************************************************************/
/*! exports provided: ActionCreators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionCreators", function() { return ActionCreators; });
/* harmony import */ var _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/common/dataService */ "./www/sources/js/common/dataService.js");
/* harmony import */ var _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/common/site */ "./www/sources/js/common/site.js");
/* harmony import */ var _feedbackSubjectSlide__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./feedbackSubjectSlide */ "./www/sources/js/pages/admin-tool/feedback-subject/feedbackSubjectSlide.js");




const getFeedBackSubject = params => async dispatch => {
  _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].blockUI();
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('FeedbackSubjectManagement/GetFeedbackSubject');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__["default"].postDataAsync(url, params).then(response => {
    dispatch(Object(_feedbackSubjectSlide__WEBPACK_IMPORTED_MODULE_2__["setFeedBackSubject"])(response.data));
  }).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].unblockUI());
};

const getAllActiveFeedbackSubject = () => async dispatch => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('FeedbackSubjectManagement/GetAllActiveFeedbackSubject');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__["default"].getDataAsync(url).then(response => {
    dispatch(Object(_feedbackSubjectSlide__WEBPACK_IMPORTED_MODULE_2__["setAllActiveFeedbackSubject"])(response.data));
  });
};

const createFeedbackSubject = data => async dispatch => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('FeedbackSubjectManagement/CreateFeedbackSubject');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__["default"].postDataAsync(url, data).then(response => {
    dispatch(Object(_feedbackSubjectSlide__WEBPACK_IMPORTED_MODULE_2__["setCreateFeedbackSubjectResult"])(response.data));
  });
};

const editStatusFeedbackSubject = data => async dispatch => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('FeedbackSubjectManagement/EditStatusFeedbackSubject');
  return await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__["default"].postDataAsync(url, data).then(response => response);
};

const editFeedbackSubject = data => async dispatch => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('FeedbackSubjectManagement/EditFeedbackSubject');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_0__["default"].postDataAsync(url, data).then(response => {
    dispatch(Object(_feedbackSubjectSlide__WEBPACK_IMPORTED_MODULE_2__["setEditFeedbackSubjectResult"])(response.data));
  });
};

const ActionCreators = {
  resetState: _feedbackSubjectSlide__WEBPACK_IMPORTED_MODULE_2__["resetState"],
  setFeedBackSubject: _feedbackSubjectSlide__WEBPACK_IMPORTED_MODULE_2__["setFeedBackSubject"],
  setGridParams: _feedbackSubjectSlide__WEBPACK_IMPORTED_MODULE_2__["setGridParams"],
  setSelectFeedbackSubjectId: _feedbackSubjectSlide__WEBPACK_IMPORTED_MODULE_2__["setSelectFeedbackSubjectId"],
  setCreateFeedbackSubjectPopup: _feedbackSubjectSlide__WEBPACK_IMPORTED_MODULE_2__["setCreateFeedbackSubjectPopup"],
  setCreateFeedbackSubjectResult: _feedbackSubjectSlide__WEBPACK_IMPORTED_MODULE_2__["setCreateFeedbackSubjectResult"],
  setEditStatusFeedbackSubjectPopup: _feedbackSubjectSlide__WEBPACK_IMPORTED_MODULE_2__["setEditStatusFeedbackSubjectPopup"],
  setEditFeedbackSubjectPopup: _feedbackSubjectSlide__WEBPACK_IMPORTED_MODULE_2__["setEditFeedbackSubjectPopup"],
  setEditFeedbackSubjectResult: _feedbackSubjectSlide__WEBPACK_IMPORTED_MODULE_2__["setEditFeedbackSubjectResult"],
  getFeedBackSubject,
  getAllActiveFeedbackSubject,
  createFeedbackSubject,
  editStatusFeedbackSubject,
  editFeedbackSubject
};

/***/ }),

/***/ "./www/sources/js/pages/admin-tool/feedback-subject/components/AppContainer.jsx":
/*!**************************************************************************************!*\
  !*** ./www/sources/js/pages/admin-tool/feedback-subject/components/AppContainer.jsx ***!
  \**************************************************************************************/
/*! exports provided: AppContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppContainer", function() { return AppContainer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/admin-tool/feedback-subject/actions.js");
/* harmony import */ var _Filter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Filter */ "./www/sources/js/pages/admin-tool/feedback-subject/components/Filter.jsx");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _DataGrid__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./DataGrid */ "./www/sources/js/pages/admin-tool/feedback-subject/components/DataGrid.jsx");
/* harmony import */ var _NewFeedbackSubject__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./NewFeedbackSubject */ "./www/sources/js/pages/admin-tool/feedback-subject/components/NewFeedbackSubject.jsx");
/* harmony import */ var _EditFeedbackSubject__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./EditFeedbackSubject */ "./www/sources/js/pages/admin-tool/feedback-subject/components/EditFeedbackSubject.jsx");
/* harmony import */ var _jsroot_components_SweetModalDialog__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @jsroot/components/SweetModalDialog */ "./www/sources/js/components/SweetModalDialog.jsx");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/lib/index.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(react_toastify__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @jsroot/common/constants */ "./www/sources/js/common/constants.js");
/* harmony import */ var _jsroot_common_shareScripts__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @jsroot/common/shareScripts */ "./www/sources/js/common/shareScripts.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
















class AppContainer extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleCloseCreatePopup", () => {
      this.props.setCreateFeedbackSubjectPopup({
        show: false
      });
      this.props.setCreateFeedbackSubjectResult(null);
    });

    _defineProperty(this, "handleCreateSuccess", () => {
      this.handleCloseCreatePopup();
      this.props.getFeedBackSubject(this.props.gridParams);
      this.props.getAllActiveFeedbackSubject();
    });

    _defineProperty(this, "handleCloseEditStatusPopup", () => {
      this.props.setEditStatusFeedbackSubjectPopup({
        show: false
      });
    });

    _defineProperty(this, "handleCloseEditPopup", () => {
      this.props.setEditFeedbackSubjectPopup({
        show: false
      });
      this.props.setEditFeedbackSubjectResult(null);
      this.props.setSelectFeedbackSubjectId(null);
    });

    _defineProperty(this, "handleEditSuccess", () => {
      this.handleCloseEditPopup();
      this.props.getFeedBackSubject(this.props.gridParams);
      this.props.getAllActiveFeedbackSubject();
    });

    _defineProperty(this, "handleEditStatus", () => {
      const data = {
        templateId: this.props.editStatusFeedbackSubjectPopup.id,
        isActive: !this.props.editStatusFeedbackSubjectPopup.isActive
      };
      this.props.editStatusFeedbackSubject(data).then(response => {
        this.props.getFeedBackSubject(this.props.gridParams);
        this.handleCloseEditStatusPopup();

        if (response.data.isSuccessful) {
          if (data.isActive === true) {
            react_toastify__WEBPACK_IMPORTED_MODULE_12__["toast"].success(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_10__["default"].getResource('ActiveFeedBackSubjectTemplateSuccessfully'));
          } else {
            react_toastify__WEBPACK_IMPORTED_MODULE_12__["toast"].success(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_10__["default"].getResource('DeActiveFeedBackSubjectTemplateSuccessfully'));
          }
        } else {
          react_toastify__WEBPACK_IMPORTED_MODULE_12__["toast"].error(response.data.message);
        }
      });
    });

    this.state = {
      policy: null
    };
  }

  componentDidMount() {
    this.props.getAllActiveFeedbackSubject();
    Object(_jsroot_common_shareScripts__WEBPACK_IMPORTED_MODULE_14__["getPermission"])(_jsroot_common_constants__WEBPACK_IMPORTED_MODULE_13__["FunctionKey"].FeedbackSubject).then(response => {
      this.setState({
        policy: response
      });
    });
  }

  componentWillUnmount() {
    this.props.resetState();
  }

  render() {
    if (!this.state.policy) {
      return null;
    }

    const isHost = this.state.policy === _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_13__["Policy"].Host;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Filter__WEBPACK_IMPORTED_MODULE_4__["default"], {
      isHost: isHost
    }), this.props.createFeedbackSubjectPopup.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_NewFeedbackSubject__WEBPACK_IMPORTED_MODULE_7__["default"], {
      onClose: this.handleCloseCreatePopup,
      onSuccess: this.handleCreateSuccess
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DataGrid__WEBPACK_IMPORTED_MODULE_6__["default"], {
      isHost: isHost
    }), this.props.editFeedbackSubjectPopup.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_EditFeedbackSubject__WEBPACK_IMPORTED_MODULE_8__["default"], {
      onClose: this.handleCloseEditPopup,
      onSuccess: this.handleEditSuccess
    }), this.props.editStatusFeedbackSubjectPopup.show && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_SweetModalDialog__WEBPACK_IMPORTED_MODULE_9__["default"], {
      size: "lg",
      title: _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_10__["default"].getResource('Confirmation'),
      contents: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "Are you sure you want to ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, this.props.editStatusFeedbackSubjectPopup.isActive ? 'deactivate' : 'activate'), " Feedback Subject Template ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("strong", null, '' + this.props.editStatusFeedbackSubjectPopup.id), "?"),
      buttons: [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__["Button"], {
        variant: "primary",
        size: "sm",
        onClick: this.handleEditStatus
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_10__["default"].getResource('OK')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_11__["Button"], {
        variant: "primary",
        size: "sm",
        onClick: this.handleCloseEditStatusPopup
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_10__["default"].getResource('Cancel'))],
      onClose: this.handleCloseEditStatusPopup
    }));
  }

}

_defineProperty(AppContainer, "propTypes", {
  createFeedbackSubjectPopup: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.shape({
    show: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.bool
  }).isRequired,
  editStatusFeedbackSubjectPopup: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.shape({
    show: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.bool
  }).isRequired,
  editFeedbackSubjectPopup: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.shape({
    show: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.bool
  }).isRequired,
  getFeedBackSubject: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.func,
  getAllActiveFeedbackSubject: prop_types__WEBPACK_IMPORTED_MODULE_5___default.a.func
});

_defineProperty(AppContainer, "defaultProps", {
  createFeedbackSubjectPopup: {
    show: false
  },
  editStatusFeedbackSubjectPopup: {
    show: false
  },
  editFeedbackSubjectPopup: {
    show: false
  },
  getFeedBackSubject: function () {//nothing
  },
  getAllActiveFeedbackSubject: function () {//nothing
  }
});

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    gridParams,
    createFeedbackSubjectPopup,
    editStatusFeedbackSubjectPopup,
    editFeedbackSubjectPopup
  } = state;
  return {
    gridParams,
    createFeedbackSubjectPopup,
    editStatusFeedbackSubjectPopup,
    editFeedbackSubjectPopup
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(AppContainer));

/***/ }),

/***/ "./www/sources/js/pages/admin-tool/feedback-subject/components/DataGrid.jsx":
/*!**********************************************************************************!*\
  !*** ./www/sources/js/pages/admin-tool/feedback-subject/components/DataGrid.jsx ***!
  \**********************************************************************************/
/*! exports provided: DataGrid, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataGrid", function() { return DataGrid; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/common/constants */ "./www/sources/js/common/constants.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/admin-tool/feedback-subject/actions.js");
/* harmony import */ var _jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/components/react-grid/index */ "./www/sources/js/components/react-grid/index.jsx");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








class DataGrid extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "onPaging", (pageIndex, pageSize) => {
      const params = _objectSpread({}, this.props.gridParams);

      params['pageSize'] = pageSize;
      params['pageIndex'] = pageIndex;
      this.props.setGridParams(params);
      this.props.getFeedBackSubject(params);
    });

    _defineProperty(this, "handleEdit", (id, subject) => {
      this.props.setSelectFeedbackSubjectId({
        templateId: id,
        subject: subject
      });
      this.props.setEditFeedbackSubjectPopup({
        show: true,
        templateId: id,
        subject: subject
      });
    });

    _defineProperty(this, "handleEditStatus", (id, isActive) => {
      this.props.setEditStatusFeedbackSubjectPopup({
        show: true,
        id: id,
        isActive: isActive
      });
    });

    _defineProperty(this, "buildHeader", isHost => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderRow"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 5
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('TemplateId')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 30
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('FeedbackSubjectTemplateContent')), isHost && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 5
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Edit')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 5
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Active')));
    });

    _defineProperty(this, "buildBody", isHost => {
      if (this.props.gridData.data.length > 0) {
        return this.props.gridData.data.map((item, index) => this.renderRow(item, index, isHost));
      }

      return [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Row"], {
        key: `body${1}`,
        className: "no-data"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
        className: "text-center",
        colSpan: isHost ? 4 : 3
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('ThereIsNoData')))];
    });

    _defineProperty(this, "renderRow", (item, index, isHost) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Row"], {
      key: index
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
      className: "text-center"
    }, item.templateID), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, item.subject)), isHost && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
      className: "text-center"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "rounded-circle fa fa-pencil icon-edit",
      onClick: () => this.handleEdit(item.templateID, item.subject)
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
      className: "text-center"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      type: "checkbox",
      checked: item.isActive,
      disabled: !isHost,
      onChange: () => this.handleEditStatus(item.templateID, item.isActive)
    }))));
  }

  render() {
    if (!this.props.gridData || !this.props.gridData.data) {
      return null;
    }

    const {
      totalItems
    } = this.props.gridData;
    const {
      pageIndex,
      pageSize
    } = this.props.gridParams;
    const {
      isHost
    } = this.props;
    const pagingOption = {
      PageIndex: pageIndex,
      PageSize: pageSize,
      TotalItem: totalItems,
      PageList: _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_1__["PAGING_SIZES"]
    };
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Table"], {
      width: 920,
      autoWidth: false,
      header: this.buildHeader(isHost),
      body: this.buildBody(isHost),
      isPaging: true,
      pageOption: pagingOption,
      onPaging: this.onPaging,
      containerPadding: 0,
      adjustedHeight: 10
    });
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_3__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_4__["ActionCreators"], dispatch);

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

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(DataGrid));

/***/ }),

/***/ "./www/sources/js/pages/admin-tool/feedback-subject/components/EditFeedbackSubject.jsx":
/*!*********************************************************************************************!*\
  !*** ./www/sources/js/pages/admin-tool/feedback-subject/components/EditFeedbackSubject.jsx ***!
  \*********************************************************************************************/
/*! exports provided: EditFeedbackSubject, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditFeedbackSubject", function() { return EditFeedbackSubject; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jsroot_components_SweetModalDialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/components/SweetModalDialog */ "./www/sources/js/components/SweetModalDialog.jsx");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/admin-tool/feedback-subject/actions.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! formik */ "./node_modules/formik/dist/formik.esm.js");
/* harmony import */ var _jsroot_components_DraggableModalDialog__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jsroot/components/DraggableModalDialog */ "./www/sources/js/components/DraggableModalDialog.jsx");
/* harmony import */ var _jsroot_components_FormikErrorMessage__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @jsroot/components/FormikErrorMessage */ "./www/sources/js/components/FormikErrorMessage.jsx");
/* harmony import */ var _jsroot_components_ResponseMessage__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @jsroot/components/ResponseMessage */ "./www/sources/js/components/ResponseMessage.jsx");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }













class EditFeedbackSubject extends react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "validateFormik", values => {
      const errors = {};

      if (!values.subject.trim().length) {
        errors.subject = _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_11__["default"].getResource('FeedbackSubjectContentRequired');
      }

      return errors;
    });

    _defineProperty(this, "renderForm", ({
      errors,
      values,
      handleChange,
      touched,
      handleSubmit,
      isSubmitting
    }) => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Form"], {
        noValidate: true,
        onSubmit: handleSubmit
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Body, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_FormikErrorMessage__WEBPACK_IMPORTED_MODULE_9__["default"], {
        touched: touched,
        errors: errors,
        fieldNames: Object.keys(values)
      }), this.props.editFeedbackSubjectResult && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_ResponseMessage__WEBPACK_IMPORTED_MODULE_10__["default"], {
        isSuccessful: this.props.editFeedbackSubjectResult.isSuccessful,
        message: this.props.editFeedbackSubjectResult.message || _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_11__["default"].getResource('EditFeedbackSubjectTemplateSuccessfully')
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Form"].Label, {
        column: true,
        sm: "4",
        md: "3"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_11__["default"].getResource('TemplateId')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Form"].Label, {
        column: true,
        sm: "8",
        md: "9"
      }, values.templateId)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Form"].Label, {
        className: "required",
        column: true,
        sm: "4",
        md: "3",
        htmlFor: "feedbackSubjectContent"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_11__["default"].getResource('TemplateContent')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Col"], {
        md: "9",
        sm: "8"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Form"].Control, {
        size: "sm",
        type: "text",
        value: values.subject,
        id: "subject",
        name: "subject",
        onChange: handleChange,
        isInvalid: touched.subject && errors.subject,
        className: "shadow-none",
        autoComplete: "off"
      })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Footer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Button"], {
        size: "sm",
        type: "submit",
        variant: "primary",
        disabled: isSubmitting
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_11__["default"].getResource('Save')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Button"], {
        size: "sm",
        type: "button",
        variant: "primary",
        onClick: this.handleConfirmCancelPopup
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_11__["default"].getResource('Cancel'))));
    });

    _defineProperty(this, "handleSubmit", (values, {
      setSubmitting
    }) => {
      setSubmitting(true);
      const data = {
        templateId: values.templateId,
        subject: values.subject
      };
      this.props.editFeedbackSubject(data).then(() => {
        if (this.props.editFeedbackSubjectResult.isSuccessful) {
          setTimeout(() => {
            this.props.onSuccess();
          }, 3000);
        } else {
          setSubmitting(false);
        }
      });
    });

    _defineProperty(this, "handleConfirmCancelPopup", event => {
      const {
        values
      } = this.formik;
      const {
        feedback
      } = this.props;

      if (event) {
        event.preventDefault();
      }

      const initialValues = {
        subject: feedback.subject,
        templateId: feedback.templateId
      };

      if (Object.entries(values).toString() === Object.entries(initialValues).toString()) {
        this.props.onClose();
      } else {
        this.setState({
          showConfirmClose: true
        });
      }
    });

    _defineProperty(this, "handleCloseConfirm", () => {
      this.setState({
        showConfirmClose: false
      });
    });

    this.formik = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
    this.state = {
      showConfirmClose: false
    };
  }

  render() {
    const feedback = this.props.feedback;
    const initialValues = {
      subject: feedback.subject,
      templateId: feedback.templateId
    };
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"], {
      show: true,
      className: "feedback-subject-modal",
      dialogAs: _jsroot_components_DraggableModalDialog__WEBPACK_IMPORTED_MODULE_8__["default"],
      backdrop: "static",
      keyboard: false,
      size: "lg",
      centered: true,
      onHide: this.handleConfirmCancelPopup
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Header, {
      closeButton: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Modal"].Title, {
      as: "div"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_11__["default"].getResource('EditFeedbackSubjectTemplate'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_7__["Formik"], {
      innerRef: p => this.formik = p,
      initialValues: initialValues,
      validate: this.validateFormik,
      onSubmit: this.handleSubmit
    }, this.renderForm), this.state.showConfirmClose && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_SweetModalDialog__WEBPACK_IMPORTED_MODULE_1__["default"], {
      size: "lg",
      title: _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_11__["default"].getResource('Confirmation'),
      contents: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_11__["default"].getResource('ConfirmDirtyMessage')),
      buttons: [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Button"], {
        size: "sm",
        variant: "primary",
        onClick: this.props.onClose
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_11__["default"].getResource('OK')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_6__["Button"], {
        size: "sm",
        variant: "primary",
        onClick: this.handleCloseConfirm
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_11__["default"].getResource('Cancel'))],
      onClose: this.handleCloseConfirm
    }));
  }

}

_defineProperty(EditFeedbackSubject, "propTypes", {
  feedback: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.shape({
    templateId: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.number,
    subject: prop_types__WEBPACK_IMPORTED_MODULE_3___default.a.string
  }).isRequired
});

_defineProperty(EditFeedbackSubject, "defaultProps", {
  feedback: {
    templateId: 0,
    subject: '',
    isActive: true
  }
});

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_4__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_5__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    selectFeedbackSubject,
    editFeedbackSubjectResult
  } = state;
  return {
    feedback: selectFeedbackSubject,
    editFeedbackSubjectResult
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps)(EditFeedbackSubject));

/***/ }),

/***/ "./www/sources/js/pages/admin-tool/feedback-subject/components/Filter.jsx":
/*!********************************************************************************!*\
  !*** ./www/sources/js/pages/admin-tool/feedback-subject/components/Filter.jsx ***!
  \********************************************************************************/
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
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/admin-tool/feedback-subject/actions.js");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var _jsroot_components_AutoComplete__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/components/AutoComplete */ "./www/sources/js/components/AutoComplete.jsx");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








class Filter extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "getParams", () => {
      return {
        Subject: this.state.feedbackSubjectSearch,
        pageIndex: 1,
        pageSize: this.props.gridParams.pageSize
      };
    });

    _defineProperty(this, "handleSubmit", event => {
      event.preventDefault();
      const params = this.getParams();
      this.props.setGridParams(params);
      this.props.getFeedBackSubject(params);
    });

    _defineProperty(this, "handleOpenCreatePopup", () => {
      this.props.setCreateFeedbackSubjectPopup({
        show: true
      });
    });

    _defineProperty(this, "handleChange", value => {
      this.setState({
        feedbackSubjectSearch: value
      });
    });

    _defineProperty(this, "handleInputChange", searchText => {
      let suggestions = [];
      const value = this.props.allActiveFeedbackSubject.map(item => item.subject);

      if (searchText.length > 0) {
        suggestions = value.filter(item => item.substr(0, searchText.length).toLowerCase() === searchText.toLowerCase()).sort();
      }

      this.setState({
        feedbackSubjectSuggestions: suggestions
      });
    });

    this.state = {
      feedbackSubjectSearch: '',
      feedbackSubjectSuggestions: []
    };
  }

  render() {
    const {
      isHost,
      allActiveFeedbackSubject
    } = this.props;

    if (!allActiveFeedbackSubject) {
      return null;
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"], {
      className: "form-filter",
      id: "filter-form-subject",
      onSubmit: this.handleSubmit
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Row, {
      bsPrefix: "form-row"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_AutoComplete__WEBPACK_IMPORTED_MODULE_6__["default"], {
      options: this.state.feedbackSubjectSuggestions,
      onChange: value => this.handleChange(value),
      onInputChange: search => this.handleInputChange(search)
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], {
      className: "mr-4",
      variant: "primary",
      size: "sm",
      onClick: this.handleSubmit
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Search')), isHost && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], {
      variant: "primary",
      size: "sm",
      onClick: this.handleOpenCreatePopup
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('FeedbackSubjectInsert'))));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_4__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    gridParams,
    gridData,
    allActiveFeedbackSubject
  } = state;
  return {
    gridParams,
    gridData,
    allActiveFeedbackSubject
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(Filter));

/***/ }),

/***/ "./www/sources/js/pages/admin-tool/feedback-subject/components/NewFeedbackSubject.jsx":
/*!********************************************************************************************!*\
  !*** ./www/sources/js/pages/admin-tool/feedback-subject/components/NewFeedbackSubject.jsx ***!
  \********************************************************************************************/
/*! exports provided: NewFeedbackSubject, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewFeedbackSubject", function() { return NewFeedbackSubject; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions */ "./www/sources/js/pages/admin-tool/feedback-subject/actions.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! formik */ "./node_modules/formik/dist/formik.esm.js");
/* harmony import */ var _jsroot_components_SweetModalDialog__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/components/SweetModalDialog */ "./www/sources/js/components/SweetModalDialog.jsx");
/* harmony import */ var _jsroot_components_DraggableModalDialog__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/components/DraggableModalDialog */ "./www/sources/js/components/DraggableModalDialog.jsx");
/* harmony import */ var _jsroot_components_FormikErrorMessage__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jsroot/components/FormikErrorMessage */ "./www/sources/js/components/FormikErrorMessage.jsx");
/* harmony import */ var _jsroot_components_ResponseMessage__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @jsroot/components/ResponseMessage */ "./www/sources/js/components/ResponseMessage.jsx");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }












class NewFeedbackSubject extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "validateFormik", values => {
      const errors = {};

      if (!values.subject.trim().length) {
        errors.subject = _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_10__["default"].getResource('FeedbackSubjectContentRequired');
      }

      return errors;
    });

    _defineProperty(this, "renderForm", ({
      values,
      handleChange,
      touched,
      handleSubmit,
      isSubmitting,
      errors
    }) => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"], {
        noValidate: true,
        onSubmit: handleSubmit
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Body, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_FormikErrorMessage__WEBPACK_IMPORTED_MODULE_8__["default"], {
        touched: touched,
        errors: errors,
        fieldNames: Object.keys(values)
      }), this.props.createFeedbackSubjectResult && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_ResponseMessage__WEBPACK_IMPORTED_MODULE_9__["default"], {
        isSuccessful: this.props.createFeedbackSubjectResult.isSuccessful,
        message: this.props.createFeedbackSubjectResult.message || _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_10__["default"].getResource('InsertFeedbackSubjectTemplateSuccessfully')
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "4",
        md: "4",
        className: "required",
        htmlFor: "subject"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_10__["default"].getResource('InsertFeedbackSubjectTemplate')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "8",
        md: "8"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        type: "text",
        size: "sm",
        value: values.subject,
        name: "subject",
        id: "subject",
        isInvalid: touched.subject && errors.subject,
        className: "shadow-none",
        autoComplete: "off",
        onChange: handleChange
      })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Footer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], {
        type: "submit",
        variant: "primary",
        size: "sm",
        disabled: isSubmitting
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_10__["default"].getResource('Save')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], {
        type: "button",
        variant: "primary",
        size: "sm",
        onClick: this.handleConfirmCancelPopup
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_10__["default"].getResource('Cancel'))));
    });

    _defineProperty(this, "handleConfirmCancelPopup", event => {
      const {
        values
      } = this.formik;

      if (event) {
        event.preventDefault();
      }

      const initialValues = {
        subject: ''
      };

      if (Object.entries(values).toString() === Object.entries(initialValues).toString()) {
        this.props.onClose();
      } else {
        this.setState({
          showConfirmClose: true
        });
      }
    });

    _defineProperty(this, "handleCloseConfirm", () => {
      this.setState({
        showConfirmClose: false
      });
    });

    _defineProperty(this, "handleSubmit", (values, {
      setSubmitting
    }) => {
      setSubmitting(true);
      const data = {
        subject: values.subject
      };
      this.props.createFeedbackSubject(data).then(() => {
        if (this.props.createFeedbackSubjectResult.isSuccessful) {
          setTimeout(() => {
            this.props.onSuccess();
          }, 3000);
        } else {
          setSubmitting(false);
        }
      });
    });

    this.formik = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
    this.state = {
      showConfirmClose: false
    };
  }

  render() {
    const initialValues = {
      subject: ''
    };
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"], {
      show: true,
      className: "feedback-subject-modal",
      dialogAs: _jsroot_components_DraggableModalDialog__WEBPACK_IMPORTED_MODULE_7__["default"],
      backdrop: "static",
      keyboard: false,
      size: "lg",
      centered: true,
      onHide: this.handleConfirmCancelPopup
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Header, {
      closeButton: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Title, {
      as: "div"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_10__["default"].getResource('FeedbackSubjectInsert'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_5__["Formik"], {
      innerRef: p => this.formik = p,
      initialValues: initialValues,
      onSubmit: this.handleSubmit,
      validate: this.validateFormik
    }, this.renderForm), this.state.showConfirmClose && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_SweetModalDialog__WEBPACK_IMPORTED_MODULE_6__["default"], {
      size: "lg",
      title: _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_10__["default"].getResource('Confirmation'),
      contents: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_10__["default"].getResource('ConfirmDirtyMessage')),
      buttons: [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], {
        variant: "primary",
        size: "sm",
        onClick: this.props.onClose
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_10__["default"].getResource('OK')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], {
        variant: "primary",
        size: "sm",
        onClick: this.handleCloseConfirm
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_10__["default"].getResource('Cancel'))],
      onClose: this.handleCloseConfirm
    }));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    createFeedbackSubjectResult
  } = state;
  return {
    createFeedbackSubjectResult
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(NewFeedbackSubject));

/***/ }),

/***/ "./www/sources/js/pages/admin-tool/feedback-subject/feedbackSubjectSlide.js":
/*!**********************************************************************************!*\
  !*** ./www/sources/js/pages/admin-tool/feedback-subject/feedbackSubjectSlide.js ***!
  \**********************************************************************************/
/*! exports provided: resetState, setGridParams, setFeedBackSubject, setAllActiveFeedbackSubject, setSelectFeedbackSubjectId, setCreateFeedbackSubjectPopup, setCreateFeedbackSubjectResult, setEditStatusFeedbackSubjectPopup, setEditFeedbackSubjectPopup, setEditFeedbackSubjectResult, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resetState", function() { return resetState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setGridParams", function() { return setGridParams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setFeedBackSubject", function() { return setFeedBackSubject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setAllActiveFeedbackSubject", function() { return setAllActiveFeedbackSubject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSelectFeedbackSubjectId", function() { return setSelectFeedbackSubjectId; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setCreateFeedbackSubjectPopup", function() { return setCreateFeedbackSubjectPopup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setCreateFeedbackSubjectResult", function() { return setCreateFeedbackSubjectResult; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setEditStatusFeedbackSubjectPopup", function() { return setEditStatusFeedbackSubjectPopup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setEditFeedbackSubjectPopup", function() { return setEditFeedbackSubjectPopup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setEditFeedbackSubjectResult", function() { return setEditFeedbackSubjectResult; });
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @reduxjs/toolkit */ "./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");

const initialState = {
  gridData: null,
  gridParams: {
    Subject: null,
    pageIndex: 1,
    pageSize: 100
  },
  allActiveFeedbackSubject: null,
  selectFeedbackSubject: null,
  createFeedbackSubjectPopup: {
    show: false
  },
  createFeedbackSubjectResult: '',
  editStatusFeedbackSubjectPopup: {
    show: false
  },
  editFeedbackSubjectPopup: {
    show: false
  },
  editFeedbackSubjectResult: ''
};
const feedbackSubjectSlice = Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__["createSlice"])({
  name: 'feedbackSubject',
  initialState: initialState,
  reducers: {
    resetState: () => initialState,
    setGridParams: (state, action) => {
      state.gridParams = action.payload;
    },
    setFeedBackSubject: (state, action) => {
      state.gridData = action.payload;
    },
    setAllActiveFeedbackSubject: (state, action) => {
      state.allActiveFeedbackSubject = action.payload;
    },
    setSelectFeedbackSubjectId: (state, action) => {
      state.selectFeedbackSubject = action.payload;
    },
    setCreateFeedbackSubjectPopup: (state, action) => {
      state.createFeedbackSubjectPopup = action.payload;
    },
    setCreateFeedbackSubjectResult: (state, action) => {
      state.createFeedbackSubjectResult = action.payload;
    },
    setEditStatusFeedbackSubjectPopup: (state, action) => {
      state.editStatusFeedbackSubjectPopup = action.payload;
    },
    setEditFeedbackSubjectPopup: (state, action) => {
      state.editFeedbackSubjectPopup = action.payload;
    },
    setEditFeedbackSubjectResult: (state, action) => {
      state.editFeedbackSubjectResult = action.payload;
    }
  }
});
const {
  actions,
  reducer
} = feedbackSubjectSlice;
const {
  resetState,
  setGridParams,
  setFeedBackSubject,
  setAllActiveFeedbackSubject,
  setSelectFeedbackSubjectId,
  setCreateFeedbackSubjectPopup,
  setCreateFeedbackSubjectResult,
  setEditStatusFeedbackSubjectPopup,
  setEditFeedbackSubjectPopup,
  setEditFeedbackSubjectResult
} = actions;
/* harmony default export */ __webpack_exports__["default"] = (reducer);

/***/ }),

/***/ "./www/sources/js/pages/admin-tool/feedback-subject/index.js":
/*!*******************************************************************!*\
  !*** ./www/sources/js/pages/admin-tool/feedback-subject/index.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return index; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @reduxjs/toolkit */ "./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");
/* harmony import */ var _feedbackSubjectSlide__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./feedbackSubjectSlide */ "./www/sources/js/pages/admin-tool/feedback-subject/feedbackSubjectSlide.js");
/* harmony import */ var _components_AppContainer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/AppContainer */ "./www/sources/js/pages/admin-tool/feedback-subject/components/AppContainer.jsx");
/* harmony import */ var _cssroot_pages_admin_tool_feedback_subject_index_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @cssroot/pages/admin-tool/feedback-subject/index.scss */ "./www/sources/css/pages/admin-tool/feedback-subject/index.scss");
/* harmony import */ var _cssroot_pages_admin_tool_feedback_subject_index_scss__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_cssroot_pages_admin_tool_feedback_subject_index_scss__WEBPACK_IMPORTED_MODULE_5__);





const store = Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_2__["configureStore"])({
  reducer: _feedbackSubjectSlide__WEBPACK_IMPORTED_MODULE_3__["default"]
});

class index extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_1__["Provider"], {
      store: store
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "feedback-subject"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_AppContainer__WEBPACK_IMPORTED_MODULE_4__["default"], null)));
  }

}

/***/ })

}]);
//# sourceMappingURL=13.chunk.js.map