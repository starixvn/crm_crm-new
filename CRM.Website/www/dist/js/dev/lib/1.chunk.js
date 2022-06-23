(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./www/sources/css/pages/chat-type-mapping/index.scss":
/*!************************************************************!*\
  !*** ./www/sources/css/pages/chat-type-mapping/index.scss ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./www/sources/js/components/Loading.jsx":
/*!***********************************************!*\
  !*** ./www/sources/js/components/Loading.jsx ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




class Loading extends react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"] {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "renderChildCircle", () => {
      const numOfChildCircle = 12;
      const childs = [];

      for (let i = 1; i <= numOfChildCircle; i++) {
        childs.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          key: `loading-${i}`,
          className: `sk-circle${i} sk-circle`
        }));
      }

      return childs;
    });
  }

  render() {
    const {
      width,
      height
    } = this.props;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "sk-fading-circle",
      style: {
        width: width,
        height: height
      }
    }, this.renderChildCircle());
  }

}

_defineProperty(Loading, "propTypes", {
  width: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
  height: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number
});

_defineProperty(Loading, "defaultProps", {
  width: 18,
  height: 18
});

/* harmony default export */ __webpack_exports__["default"] = (Loading);

/***/ }),

/***/ "./www/sources/js/pages/chat-type-mapping/actions/dataHandlerActions.js":
/*!******************************************************************************!*\
  !*** ./www/sources/js/pages/chat-type-mapping/actions/dataHandlerActions.js ***!
  \******************************************************************************/
/*! exports provided: setSettings, getSettings, setGridParams, setGridData, getGridData, setUpateActivePopup, updateActiveStatus, setRecipientData, getRecipientByRecipientType, setGroupHeadlineData, getGroupHeadlineByRecipient, exportExcelMapping, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setSettings", function() { return setSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getSettings", function() { return getSettings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setGridParams", function() { return setGridParams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setGridData", function() { return setGridData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getGridData", function() { return getGridData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setUpateActivePopup", function() { return setUpateActivePopup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateActiveStatus", function() { return updateActiveStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setRecipientData", function() { return setRecipientData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRecipientByRecipientType", function() { return getRecipientByRecipientType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setGroupHeadlineData", function() { return setGroupHeadlineData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getGroupHeadlineByRecipient", function() { return getGroupHeadlineByRecipient; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exportExcelMapping", function() { return exportExcelMapping; });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./www/sources/js/pages/chat-type-mapping/actions/types.js");
/* harmony import */ var _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/common/site */ "./www/sources/js/common/site.js");
/* harmony import */ var _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/common/dataService */ "./www/sources/js/common/dataService.js");


 // Settings

const setSettings = data => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["default"].SETTING_DATA,
    data: data
  };
};
const getSettings = () => async dispatch => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('ChatTypeMapping/GetSettings');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_2__["default"].getDataAsync(url).then(response => {
    dispatch(setSettings(response.data));
  }).catch(_jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].handleAxiosError);
}; // Grid

const setGridParams = value => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["default"].GRID_PARAMS,
    data: value
  };
};
const setGridData = data => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["default"].GRID_DATA,
    data: data
  };
};
const getGridData = params => async dispatch => {
  _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].blockUI();
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('ChatTypeMapping/GetChatTypeMapping');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_2__["default"].postDataAsync(url, params).then(response => {
    dispatch(setGridData(response.data));
  }).catch(_jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].handleAxiosError).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].unblockUI());
}; // Update Active Status

const setUpateActiveResult = data => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["default"].ACTIVE_RESULT_DATA,
    data: data
  };
};

const setUpateActivePopup = data => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["default"].ACTIVE_POPUP_DATA,
    data: data
  };
};
const updateActiveStatus = params => async dispatch => {
  _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].blockUI();
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_2__["default"].postDataAsync(_jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('ChatTypeMapping/UpdateActiveStatus'), params).then(response => {
    dispatch(setUpateActiveResult(response.data));
  }).catch(_jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].handleAxiosError).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].unblockUI());
}; // Get Recipient by Recipient Type

const setRecipientData = data => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["default"].RECIPIENT_DATA,
    data: data
  };
};
const getRecipientByRecipientType = recipientTypeId => async dispatch => {
  if (recipientTypeId > 0) {
    const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('ChatTypeMapping/GetRecipientByType');
    await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_2__["default"].getDataAsync(url, {
      recipientTypeId: recipientTypeId
    }).then(response => {
      dispatch(setRecipientData(response.data));
    }).catch(_jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].handleAxiosError);
  }

  return dispatch => {
    dispatch(setRecipientData([]));
  };
}; // Get Group Headline by Recipients

const setGroupHeadlineData = data => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["default"].GROUP_HEADLINE_DATA,
    data: data
  };
};
const getGroupHeadlineByRecipient = recipientIds => async dispatch => {
  if (recipientIds) {
    const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('ChatTypeMapping/GetGroupHeadlineByRecipient');
    await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_2__["default"].getDataAsync(url, {
      recipientIds: recipientIds
    }).then(response => {
      dispatch(setGroupHeadlineData(response.data));
    }).catch(_jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].handleAxiosError);
  } else {
    dispatch(setGroupHeadlineData([]));
  }
};
const exportExcelMapping = params => async dispatch => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('ChatTypeMapping/ExportExcel');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_2__["default"].getFileAsync(url, params).then(response => {
    const fileName = response.headers['content-disposition'].split('filename=')[1].split("\"")[1];
    _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].downloadFile(response.data, fileName);
  });
};
const actions = {
  getSettings,
  getGridData,
  setGridParams,
  setUpateActivePopup,
  updateActiveStatus,
  getRecipientByRecipientType,
  getGroupHeadlineByRecipient,
  exportExcelMapping
};
/* harmony default export */ __webpack_exports__["default"] = (actions);

/***/ }),

/***/ "./www/sources/js/pages/chat-type-mapping/actions/index.js":
/*!*****************************************************************!*\
  !*** ./www/sources/js/pages/chat-type-mapping/actions/index.js ***!
  \*****************************************************************/
/*! exports provided: ActionCreators */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ActionCreators", function() { return ActionCreators; });
/* harmony import */ var _dataHandlerActions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dataHandlerActions */ "./www/sources/js/pages/chat-type-mapping/actions/dataHandlerActions.js");
/* harmony import */ var _popupHandlerActions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./popupHandlerActions */ "./www/sources/js/pages/chat-type-mapping/actions/popupHandlerActions.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const ActionCreators = _objectSpread(_objectSpread({}, _dataHandlerActions__WEBPACK_IMPORTED_MODULE_0__["default"]), _popupHandlerActions__WEBPACK_IMPORTED_MODULE_1__["default"]);

/***/ }),

/***/ "./www/sources/js/pages/chat-type-mapping/actions/popupHandlerActions.js":
/*!*******************************************************************************!*\
  !*** ./www/sources/js/pages/chat-type-mapping/actions/popupHandlerActions.js ***!
  \*******************************************************************************/
/*! exports provided: setInsertPersonalMappingResult, openInsertPersonalMappingPopup, closeInsertPersonalMappingPopup, insertPersonalMapping, setUpdatePersonalMappingResult, openUpdatePersonalMappingPopup, closeUpdatePersonalMappingPopup, updatePersonalMapping, setGroupMappingResult, openUpdateGroupMappingPopup, closeUpdateGroupMappingPopup, verifyLetstalkInGroup, updateGroupMapping, getLetstalkDisplayName, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setInsertPersonalMappingResult", function() { return setInsertPersonalMappingResult; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "openInsertPersonalMappingPopup", function() { return openInsertPersonalMappingPopup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "closeInsertPersonalMappingPopup", function() { return closeInsertPersonalMappingPopup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "insertPersonalMapping", function() { return insertPersonalMapping; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setUpdatePersonalMappingResult", function() { return setUpdatePersonalMappingResult; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "openUpdatePersonalMappingPopup", function() { return openUpdatePersonalMappingPopup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "closeUpdatePersonalMappingPopup", function() { return closeUpdatePersonalMappingPopup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updatePersonalMapping", function() { return updatePersonalMapping; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setGroupMappingResult", function() { return setGroupMappingResult; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "openUpdateGroupMappingPopup", function() { return openUpdateGroupMappingPopup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "closeUpdateGroupMappingPopup", function() { return closeUpdateGroupMappingPopup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "verifyLetstalkInGroup", function() { return verifyLetstalkInGroup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateGroupMapping", function() { return updateGroupMapping; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLetstalkDisplayName", function() { return getLetstalkDisplayName; });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./www/sources/js/pages/chat-type-mapping/actions/types.js");
/* harmony import */ var _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/common/site */ "./www/sources/js/common/site.js");
/* harmony import */ var _dataHandlerActions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dataHandlerActions */ "./www/sources/js/pages/chat-type-mapping/actions/dataHandlerActions.js");
/* harmony import */ var _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/common/dataService */ "./www/sources/js/common/dataService.js");



 // Insert Personal Mapping Popup

const setInsertPersonalMappingPopup = isShow => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["default"].PERSONAL_MAPPING_INSERT_POPUP_DATA,
    data: {
      isShow: isShow
    }
  };
};

const setInsertPersonalMappingResult = data => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["default"].PERSONAL_MAPPING_INSERT_RESULT,
    data: data
  };
};
const openInsertPersonalMappingPopup = () => {
  return dispatch => {
    dispatch(setInsertPersonalMappingPopup(true));
  };
};
const closeInsertPersonalMappingPopup = () => {
  return dispatch => {
    dispatch(setInsertPersonalMappingPopup(false));
    dispatch(setInsertPersonalMappingResult(null));
    dispatch(Object(_dataHandlerActions__WEBPACK_IMPORTED_MODULE_2__["setRecipientData"])([]));
    dispatch(Object(_dataHandlerActions__WEBPACK_IMPORTED_MODULE_2__["setGroupHeadlineData"])([]));
  };
};
const insertPersonalMapping = params => async dispatch => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('ChatTypeMapping/InsertPersonalMapping');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_3__["default"].postDataAsync(url, params).then(response => {
    dispatch(setInsertPersonalMappingResult(response.data));
  }).catch(_jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].handleAxiosError);
}; // Update Personal Mapping

const setUpdatePersonalMappingData = (isShow, data) => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["default"].PERSONAL_MAPPING_UPDATE_POPUP_DATA,
    data: {
      isShow: isShow,
      data: data
    }
  };
};

const setUpdatePersonalMappingResult = data => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["default"].PERSONAL_MAPPING_UPDATE_RESULT,
    data: data
  };
};
const openUpdatePersonalMappingPopup = data => {
  return dispatch => {
    dispatch(setUpdatePersonalMappingData(true, data));
  };
};
const closeUpdatePersonalMappingPopup = () => {
  return dispatch => {
    dispatch(setUpdatePersonalMappingData(false, null));
    dispatch(setUpdatePersonalMappingResult(null));
    dispatch(Object(_dataHandlerActions__WEBPACK_IMPORTED_MODULE_2__["setRecipientData"])([]));
    dispatch(Object(_dataHandlerActions__WEBPACK_IMPORTED_MODULE_2__["setGroupHeadlineData"])([]));
  };
};
const updatePersonalMapping = params => async dispatch => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl(`ChatTypeMapping/UpdatePersonalMapping`);
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_3__["default"].postDataAsync(url, params).then(response => {
    dispatch(setUpdatePersonalMappingResult(response.data));
  }).catch(_jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].handleAxiosError);
}; // Update Group Mapping

const setUpdateGroupMappingData = (isShow, data) => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["default"].GROUP_MAPPING_POPUP_DATA,
    data: {
      isShow: isShow,
      data: data
    }
  };
};

const setLetstalkVerifationData = data => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["default"].GROUP_MAPPING_LETSTALK_VERIFICATION_DATA,
    data: data !== null ? data : {
      isBotRemoved: false,
      recipients: []
    }
  };
};

const setGroupMappingResult = data => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["default"].GROUP_MAPPING_UPDATE_RESULT,
    data: data
  };
};
const openUpdateGroupMappingPopup = data => {
  return dispatch => {
    dispatch(setUpdateGroupMappingData(true, data));
  };
};
const closeUpdateGroupMappingPopup = () => {
  return dispatch => {
    dispatch(setUpdateGroupMappingData(false, null));
    dispatch(setGroupMappingResult(null));
    dispatch(setLetstalkVerifationData({
      isBotRemoved: false,
      recipients: []
    }));
    dispatch(Object(_dataHandlerActions__WEBPACK_IMPORTED_MODULE_2__["setRecipientData"])([]));
    dispatch(Object(_dataHandlerActions__WEBPACK_IMPORTED_MODULE_2__["setGroupHeadlineData"])([]));
  };
};
const verifyLetstalkInGroup = params => async dispatch => {
  if (params.botId > 0 && params.groupConversationId !== '' && params.recipients.length > 0) {
    const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('ChatTypeMapping/VerifyLetstalkInGroup');
    await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_3__["default"].postDataAsync(url, params).then(response => {
      dispatch(setLetstalkVerifationData(response.data));
    }).catch(_jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].handleAxiosError);
  } else {
    dispatch(setLetstalkVerifationData({
      isBotRemoved: false,
      recipients: []
    }));
  }
};
const updateGroupMapping = params => async dispatch => {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('ChatTypeMapping/UpdateGroupMapping');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_3__["default"].postDataAsync(url, params).then(response => {
    dispatch(setGroupMappingResult(response.data));
  }).catch(_jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].handleAxiosError);
};

const setLetstalkDisplayName = name => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__["default"].LETSTALK_DISPLAY_NAME,
    data: name
  };
};

const getLetstalkDisplayName = (botId, letstalkId) => async dispatch => {
  if (botId && letstalkId) {
    const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].resolveClientUrl('ChatTypeMapping/GetLetstalkDisplayName');
    const params = {
      botId: botId,
      letstalkId: letstalkId
    };
    await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_3__["default"].getDataAsync(url, params).then(response => {
      dispatch(setLetstalkDisplayName(response.data));
    }).catch(_jsroot_common_site__WEBPACK_IMPORTED_MODULE_1__["default"].handleAxiosError);
  } else {
    dispatch(setLetstalkDisplayName(''));
  }
};
const actions = {
  openInsertPersonalMappingPopup,
  closeInsertPersonalMappingPopup,
  insertPersonalMapping,
  setInsertPersonalMappingResult,
  openUpdatePersonalMappingPopup,
  updatePersonalMapping,
  setUpdatePersonalMappingResult,
  closeUpdatePersonalMappingPopup,
  openUpdateGroupMappingPopup,
  closeUpdateGroupMappingPopup,
  updateGroupMapping,
  setGroupMappingResult,
  verifyLetstalkInGroup,
  getLetstalkDisplayName
};
/* harmony default export */ __webpack_exports__["default"] = (actions);

/***/ }),

/***/ "./www/sources/js/pages/chat-type-mapping/actions/types.js":
/*!*****************************************************************!*\
  !*** ./www/sources/js/pages/chat-type-mapping/actions/types.js ***!
  \*****************************************************************/
/*! exports provided: SETTING_DATA, GRID_PARAMS, GRID_DATA, PERSONAL_MAPPING_INSERT_POPUP_DATA, PERSONAL_MAPPING_INSERT_RESULT, PERSONAL_MAPPING_UPDATE_POPUP_DATA, PERSONAL_MAPPING_UPDATE_RESULT, GROUP_MAPPING_POPUP_DATA, GROUP_MAPPING_UPDATE_RESULT, RECIPIENT_DATA, GROUP_HEADLINE_DATA, ACTIVE_RESULT_DATA, ACTIVE_POPUP_DATA, GROUP_MAPPING_LETSTALK_VERIFICATION_DATA, LETSTALK_DISPLAY_NAME, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SETTING_DATA", function() { return SETTING_DATA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GRID_PARAMS", function() { return GRID_PARAMS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GRID_DATA", function() { return GRID_DATA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PERSONAL_MAPPING_INSERT_POPUP_DATA", function() { return PERSONAL_MAPPING_INSERT_POPUP_DATA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PERSONAL_MAPPING_INSERT_RESULT", function() { return PERSONAL_MAPPING_INSERT_RESULT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PERSONAL_MAPPING_UPDATE_POPUP_DATA", function() { return PERSONAL_MAPPING_UPDATE_POPUP_DATA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PERSONAL_MAPPING_UPDATE_RESULT", function() { return PERSONAL_MAPPING_UPDATE_RESULT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GROUP_MAPPING_POPUP_DATA", function() { return GROUP_MAPPING_POPUP_DATA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GROUP_MAPPING_UPDATE_RESULT", function() { return GROUP_MAPPING_UPDATE_RESULT; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RECIPIENT_DATA", function() { return RECIPIENT_DATA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GROUP_HEADLINE_DATA", function() { return GROUP_HEADLINE_DATA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACTIVE_RESULT_DATA", function() { return ACTIVE_RESULT_DATA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACTIVE_POPUP_DATA", function() { return ACTIVE_POPUP_DATA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GROUP_MAPPING_LETSTALK_VERIFICATION_DATA", function() { return GROUP_MAPPING_LETSTALK_VERIFICATION_DATA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LETSTALK_DISPLAY_NAME", function() { return LETSTALK_DISPLAY_NAME; });
const SETTING_DATA = 'SETTING_DATA';
const GRID_PARAMS = 'GRID_PARAMS';
const GRID_DATA = 'GRID_DATA';
const PERSONAL_MAPPING_INSERT_POPUP_DATA = 'PERSONAL_MAPPING_INSERT_POPUP_DATA';
const PERSONAL_MAPPING_INSERT_RESULT = 'PERSONAL_MAPPING_INSERT_RESULT';
const PERSONAL_MAPPING_UPDATE_POPUP_DATA = 'PERSONAL_MAPPING_UPDATE_POPUP_DATA';
const PERSONAL_MAPPING_UPDATE_RESULT = 'PERSONAL_MAPPING_UPDATE_RESULT';
const GROUP_MAPPING_POPUP_DATA = 'GROUP_MAPPING_POPUP_DATA';
const GROUP_MAPPING_UPDATE_RESULT = 'GROUP_MAPPING_UPDATE_RESULT';
const RECIPIENT_DATA = 'RECIPIENT_DATA';
const GROUP_HEADLINE_DATA = 'GROUP_HEADLINE_DATA';
const ACTIVE_RESULT_DATA = 'ACTIVE_RESULT_DATA';
const ACTIVE_POPUP_DATA = 'ACTIVE_POPUP_DATA';
const GROUP_MAPPING_LETSTALK_VERIFICATION_DATA = 'GROUP_MAPPING_LETSTALK_VERIFICATION_DATA';
const LETSTALK_DISPLAY_NAME = 'LETSTALK_DISPLAY_NAME';
const types = {
  SETTING_DATA,
  GRID_PARAMS,
  GRID_DATA,
  PERSONAL_MAPPING_INSERT_POPUP_DATA,
  PERSONAL_MAPPING_INSERT_RESULT,
  PERSONAL_MAPPING_UPDATE_POPUP_DATA,
  PERSONAL_MAPPING_UPDATE_RESULT,
  GROUP_MAPPING_POPUP_DATA,
  GROUP_MAPPING_UPDATE_RESULT,
  RECIPIENT_DATA,
  GROUP_HEADLINE_DATA,
  ACTIVE_RESULT_DATA,
  ACTIVE_POPUP_DATA,
  GROUP_MAPPING_LETSTALK_VERIFICATION_DATA,
  LETSTALK_DISPLAY_NAME
};
/* harmony default export */ __webpack_exports__["default"] = (types);

/***/ }),

/***/ "./www/sources/js/pages/chat-type-mapping/components/AppContainer.jsx":
/*!****************************************************************************!*\
  !*** ./www/sources/js/pages/chat-type-mapping/components/AppContainer.jsx ***!
  \****************************************************************************/
/*! exports provided: AppContainer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppContainer", function() { return AppContainer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Filter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Filter */ "./www/sources/js/pages/chat-type-mapping/components/Filter.jsx");
/* harmony import */ var _DataGrid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./DataGrid */ "./www/sources/js/pages/chat-type-mapping/components/DataGrid.jsx");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _jsroot_common_store__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/common/store */ "./www/sources/js/common/store.js");
/* harmony import */ var _reducers_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../reducers/index */ "./www/sources/js/pages/chat-type-mapping/reducers/index.js");
/* harmony import */ var _cssroot_pages_chat_type_mapping_index_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @cssroot/pages/chat-type-mapping/index.scss */ "./www/sources/css/pages/chat-type-mapping/index.scss");
/* harmony import */ var _cssroot_pages_chat_type_mapping_index_scss__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_cssroot_pages_chat_type_mapping_index_scss__WEBPACK_IMPORTED_MODULE_6__);







const store = _jsroot_common_store__WEBPACK_IMPORTED_MODULE_4__["default"].createStore(_reducers_index__WEBPACK_IMPORTED_MODULE_5__["default"], {
  gridData: {
    data: null,
    totalItems: 0
  },
  updateActiveStatusResult: null,
  insertPersonalMappingData: {
    isShow: false
  },
  insertPersonalMappingResult: null,
  updatePersonalMappingData: {
    isShow: false,
    data: null
  },
  updatePersonalMappingResult: null,
  updateGroupMappingData: {
    isShow: false,
    data: null
  },
  updateGroupMappingResult: null,
  recipients: [],
  groupHeadline: [],
  letstalkVerification: {
    isBotRemoved: false,
    recipients: []
  }
});
class AppContainer extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);
    this.isHost = document.getElementById('is-host') ? document.getElementById('is-host').checked : false;
  }

  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_3__["Provider"], {
      store: store
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Filter__WEBPACK_IMPORTED_MODULE_1__["default"], {
      isHost: this.isHost
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DataGrid__WEBPACK_IMPORTED_MODULE_2__["default"], {
      isHost: this.isHost
    }));
  }

}
/* harmony default export */ __webpack_exports__["default"] = (AppContainer);

/***/ }),

/***/ "./www/sources/js/pages/chat-type-mapping/components/DataGrid.jsx":
/*!************************************************************************!*\
  !*** ./www/sources/js/pages/chat-type-mapping/components/DataGrid.jsx ***!
  \************************************************************************/
/*! exports provided: DataGrid, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataGrid", function() { return DataGrid; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/lib/index.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_toastify__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _actions_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../actions/index */ "./www/sources/js/pages/chat-type-mapping/actions/index.js");
/* harmony import */ var _jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/components/react-grid/index */ "./www/sources/js/components/react-grid/index.jsx");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/common/constants */ "./www/sources/js/common/constants.js");
/* harmony import */ var _jsroot_common_site__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jsroot/common/site */ "./www/sources/js/common/site.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var _jsroot_components_ConfirmPopup__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @jsroot/components/ConfirmPopup */ "./www/sources/js/components/ConfirmPopup.jsx");
/* harmony import */ var _EditGroupMappingPopup__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./EditGroupMappingPopup */ "./www/sources/js/pages/chat-type-mapping/components/EditGroupMappingPopup.jsx");
/* harmony import */ var _EditPersonalMappingPopup__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./EditPersonalMappingPopup */ "./www/sources/js/pages/chat-type-mapping/components/EditPersonalMappingPopup.jsx");
/* harmony import */ var react_bootstrap_OverlayTrigger__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! react-bootstrap/OverlayTrigger */ "./node_modules/react-bootstrap/esm/OverlayTrigger.js");
/* harmony import */ var react_bootstrap_Tooltip__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! react-bootstrap/Tooltip */ "./node_modules/react-bootstrap/esm/Tooltip.js");
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

    _defineProperty(this, "onChangeActiveStaus", (conversationGroupId, isChecked) => {
      this.props.setUpateActivePopup({
        isShowPopup: true,
        conversationGroupId,
        isChecked
      });
    });

    _defineProperty(this, "updateActiveStatus", () => {
      const params = {
        conversationGroupId: this.props.updateActiveStatusPopup.conversationGroupId,
        isActive: this.props.updateActiveStatusPopup.isChecked
      };
      this.props.updateActiveStatus(params).then(() => {
        this.onCloseConfirmPopupChangeActiveStaus();

        if (this.props.updateActiveStatusResult) {
          react_toastify__WEBPACK_IMPORTED_MODULE_3__["toast"].success(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('UpdateChatTypeMappingSuccessfully'));
          this.props.getGridData(this.props.gridParams);
        } else {
          react_toastify__WEBPACK_IMPORTED_MODULE_3__["toast"].error(this.props.updateActiveStatusResult.message);
        }
      });
    });

    _defineProperty(this, "onCloseConfirmPopupChangeActiveStaus", () => {
      this.props.setUpateActivePopup({
        isShowPopup: false
      });
    });

    _defineProperty(this, "renderRecipients", (recipient, key) => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        key: key,
        className: "recipient-item",
        title: `${recipient.recipientName} (${recipient.roleName})`
      }, `${recipient.recipientName} (${recipient.roleName})`);
    });

    _defineProperty(this, "handleEdit", chatMapping => {
      if (parseInt(chatMapping.chatTypeId, 10) === _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_7__["ChatTypeMapping"].Personal) {
        this.props.openUpdatePersonalMappingPopup(chatMapping);
      } else {
        this.props.openUpdateGroupMappingPopup(chatMapping);
      }
    });

    _defineProperty(this, "copyGroupIdToClipboard", conversationId => {
      const input = document.createElement('input');
      input.value = conversationId;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      input.remove();
      _jsroot_common_site__WEBPACK_IMPORTED_MODULE_8__["default"].displayCopiedToClipboard();
    });

    _defineProperty(this, "buildHeader", isHost => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderRow"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 10
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('SymbolNo')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 15
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('ChatType')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 20
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('BotName')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 25
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('LetstalkName')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 20
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('RecipientType')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 20
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('GroupHeadline')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 20
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Recipient')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 15
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('LetstalkID')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 12
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Language')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 20
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('MappingStatus')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 10
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Active')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 15
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Remark')), isHost && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["HeaderCell"], {
        colWidth: 10
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Action')));
    });

    _defineProperty(this, "buildChatTypeMappingBody", isHost => {
      const {
        pageIndex,
        pageSize
      } = this.props.gridParams;
      this.startIndex = (pageIndex - 1) * pageSize + 1;

      if (this.props.gridData.data.length > 0) {
        return this.props.gridData.data.map((item, index) => this.renderRow(item, index, isHost));
      }

      return [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Row"], {
        key: `body${1}`,
        className: "no-data"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
        colSpan: isHost ? 13 : 12
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('ThereIsNoData')))];
    });

    _defineProperty(this, "renderIsActiveCol", (isHost, item) => {
      if (isHost) {
        const isPersonalCheckDisabled = item.chatTypeId === _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_7__["ChatTypeMapping"].Personal && (item.conversationId === '' || !item.recipients.length || !item.headlines.length);
        const isGroupCheckDisabled = item.chatTypeId === _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_7__["ChatTypeMapping"].Group && item.mappingStatusId === _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_7__["MappingStatus"].NotMapped;
        const isDisabled = isGroupCheckDisabled || isPersonalCheckDisabled;
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
          className: "text-center"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_9__["Form"].Control, {
          className: "checkbox-cell-style",
          id: `active-chk-${item.conversationGroupId}`,
          type: "checkbox",
          checked: item.isActive,
          onChange: e => this.onChangeActiveStaus(item.conversationGroupId, e.target.checked),
          disabled: isDisabled
        }));
      }

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
        className: "text-center"
      }, item.isActive ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "fa fa-check badge-green"
      }) : '');
    });

    _defineProperty(this, "renderEditIcon", (isBotRemovedStatus, chatMapping) => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
        className: "text-center"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: isBotRemovedStatus ? 'cursor-not-allowed' : ''
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: `fa fa-pencil icon-edit ${isBotRemovedStatus ? 'pointer-event-none' : ''}`,
        onClick: () => this.handleEdit(chatMapping)
      })));
    });

    _defineProperty(this, "renderRow", (item, index, isHost) => {
      const isBotRemovedStatus = item.chatTypeId === _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_7__["ChatTypeMapping"].Group && item.mappingStatusId === _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_7__["MappingStatus"].BotRemoved;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Row"], {
        key: index
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
        className: "text-center"
      }, index + this.startIndex), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], null, item.chatType), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], null, item.botName), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], null, item.conversationGroupName), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], null, item.recipients.length > 0 ? item.recipients[0].recipientTypeName : ''), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], null, item.headlines.length > 0 ? item.headlines.map(h => h.headlineName).join(', ') : ''), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
        className: "recipient-merge-cell"
      }, item.recipients.length > 0 && item.recipients.map(this.renderRecipients)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
        className: item.chatTypeId === _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_7__["ChatTypeMapping"].Personal ? '' : 'text-center'
      }, item.chatTypeId === _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_7__["ChatTypeMapping"].Personal ? item.conversationId : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "icon-copy fa fa-copy",
        onClick: () => this.copyGroupIdToClipboard(item.conversationId),
        title: item.conversationId
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], null, item.language), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], {
        className: "text-center"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: _jsroot_common_site__WEBPACK_IMPORTED_MODULE_8__["default"].mappingStatusClass(item.mappingStatusId)
      }, item.chatTypeId === _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_7__["ChatTypeMapping"].Group ? item.mappingStatus : '')), this.renderIsActiveCol(isHost, item), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Cell"], null, item.remark), isHost && this.renderEditIcon(isBotRemovedStatus, item));
    });

    _defineProperty(this, "renderConfirmMessage", () => {
      const isChecked = this.props.updateActiveStatusPopup.isChecked;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "The Personal/Group shall be ", !isChecked ? 'not ' : '', " received notification", !isChecked ? ' anymore' : '', ". Are you sure you want to ", isChecked ? 'activate' : 'deactivate', " it?");
    });

    _defineProperty(this, "handleExportExcelMapping", () => {
      const {
        gridParams
      } = this.props;
      this.props.exportExcelMapping(gridParams);
    });

    _defineProperty(this, "renderExportExcelText", () => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap_OverlayTrigger__WEBPACK_IMPORTED_MODULE_13__["default"], {
        placement: "auto",
        overlay: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap_Tooltip__WEBPACK_IMPORTED_MODULE_14__["default"], {
          className: "tooltipExport"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "Export to Excel"))
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "fa fa-file-excel-o icon-excel",
        onClick: this.handleExportExcelMapping
      }));
    });
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
    const pagingOptions = {
      PageIndex: pageIndex,
      PageSize: pageSize,
      TotalItem: totalItems,
      PageList: _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_7__["PAGING_SIZES"]
    };
    const confirmMsg = this.renderConfirmMessage();
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "table-title d-flex justify-content-between align-items-center"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('ChatTypeMapping')), this.props.gridData.data.length > 0 && this.renderExportExcelText()), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_react_grid_index__WEBPACK_IMPORTED_MODULE_5__["Table"], {
      isPaging: true,
      minWidth: 960,
      header: this.buildHeader(isHost),
      body: this.buildChatTypeMappingBody(isHost),
      autoWidth: true,
      maxWidth: document.getElementById('app-container').clientWidth,
      onPaging: this.onPaging,
      containerPadding: 0,
      shouldResetScrollPosition: false,
      pageOption: pagingOptions
    }), this.props.updateActiveStatusPopup.isShowPopup && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_ConfirmPopup__WEBPACK_IMPORTED_MODULE_10__["default"], {
      size: "lg",
      title: _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_6__["default"].getResource('Confirmation'),
      content: confirmMsg,
      onSubmit: this.updateActiveStatus,
      onClose: this.onCloseConfirmPopupChangeActiveStaus
    }), this.props.updatePersonalMappingData.isShow && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_EditPersonalMappingPopup__WEBPACK_IMPORTED_MODULE_12__["default"], null), this.props.updateGroupMappingData.isShow && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_EditGroupMappingPopup__WEBPACK_IMPORTED_MODULE_11__["default"], null));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions_index__WEBPACK_IMPORTED_MODULE_4__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    gridParams,
    gridData,
    updateActiveStatusPopup,
    updateActiveStatusResult,
    updatePersonalMappingData,
    updateGroupMappingData,
    exportExcelMapping
  } = state;
  return {
    gridParams,
    gridData,
    updateActiveStatusPopup,
    updateActiveStatusResult,
    updatePersonalMappingData,
    updateGroupMappingData,
    exportExcelMapping
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(DataGrid));

/***/ }),

/***/ "./www/sources/js/pages/chat-type-mapping/components/EditGroupMappingPopup.jsx":
/*!*************************************************************************************!*\
  !*** ./www/sources/js/pages/chat-type-mapping/components/EditGroupMappingPopup.jsx ***!
  \*************************************************************************************/
/*! exports provided: EditGroupMappingPopup, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditGroupMappingPopup", function() { return EditGroupMappingPopup; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions/index */ "./www/sources/js/pages/chat-type-mapping/actions/index.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var _components_multiple_select_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../components/multiple-select/index */ "./www/sources/js/components/multiple-select/index.jsx");
/* harmony import */ var _jsroot_components_ResponseMessage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/components/ResponseMessage */ "./www/sources/js/components/ResponseMessage.jsx");
/* harmony import */ var _jsroot_components_DraggableModalDialog__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/components/DraggableModalDialog */ "./www/sources/js/components/DraggableModalDialog.jsx");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var _jsroot_common_site__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @jsroot/common/site */ "./www/sources/js/common/site.js");
/* harmony import */ var _jsroot_components_ConfirmPopup__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @jsroot/components/ConfirmPopup */ "./www/sources/js/components/ConfirmPopup.jsx");
/* harmony import */ var _jsroot_components_Loading__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @jsroot/components/Loading */ "./www/sources/js/components/Loading.jsx");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }













const AccountingPIC = 'Accounting PIC';
class EditGroupMappingPopup extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleChange", (fieldName, fieldValue) => {
      this.setState(prevState => ({
        form: _objectSpread(_objectSpread({}, prevState.form), {
          [fieldName]: fieldValue
        })
      }));
    });

    _defineProperty(this, "handleRecipientTypeChange", e => {
      const index = e.nativeEvent.target.selectedIndex;
      const label = e.nativeEvent.target[index].text;
      this.handleChange('recipientTypeId', e.target.value);
      this.handleChange('recipientName', label);
      this.handleChange('recipientIds', '');
      this.handleChange('groupHeadlines', '');
      this.props.getGroupHeadlineByRecipient('');
      this.verifyLetstalk([]);
      this.props.getRecipientByRecipientType(e.target.value);

      if (label !== AccountingPIC) {
        this.handleChange('isTest', false);
      }
    });

    _defineProperty(this, "handleRecipientChange", (currentItem, selectedItemsKey) => {
      this.handleChange('recipientIds', selectedItemsKey);
      this.handleChange('groupHeadlines', '');
      this.verifyLetstalk(selectedItemsKey.split(','));
      this.props.getGroupHeadlineByRecipient(selectedItemsKey);
    });

    _defineProperty(this, "verifyLetstalk", recipientIds => {
      this.setState({
        isLoading: true
      });
      const selectedOptions = this.state.settings.recipientOptions.filter(r => recipientIds.some(id => parseInt(id, 10) === r.id));
      const params = {
        botId: this.state.form.bot.id,
        groupConversationId: this.state.form.conversationId,
        recipients: selectedOptions.map(item => {
          return {
            recipientId: item.id,
            recipientName: item.name,
            letstalks: !item.letstalkIds ? [] : item.letstalkIds.split(',').map(l => {
              return {
                letstalkId: l
              };
            })
          };
        })
      };
      this.props.verifyLetstalkInGroup(params).then(() => {
        this.setState({
          isLoading: false
        });
      });
    });

    _defineProperty(this, "handleGroupHeadlineChange", (currentItem, selectedItemsKey) => {
      this.handleChange('groupHeadlines', selectedItemsKey);
    });

    _defineProperty(this, "renderEditGroupMappingOptions", (item, key) => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        key: `${key}-${item.id}`,
        value: item.id
      }, item.name);
    });

    _defineProperty(this, "renderLetstalkIdVerification", (item, key) => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "letstalk-group-mapping",
        key: key
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "recipient-name common-letstalk-display",
        title: item.recipientName
      }, item.recipientName), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "letstalk-wrapper"
      }, item.letstalks.length > 0 && item.letstalks.map((v, k) => {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          key: k,
          className: "letstalk-name common-letstalk-display",
          title: v.letstalkId
        }, v.letstalkId, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          className: v.isGroupMember ? 'fa fa-check icon' : ''
        }));
      })));
    });

    _defineProperty(this, "isValidParams", () => {
      const data = this.state.form;
      const errMsg = [];
      let isValid = true;

      if (!data.recipientTypeId) {
        isValid = false;
        errMsg.push(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('RecipientTypeRequired'));
      }

      if (!data.recipientIds) {
        isValid = false;
        errMsg.push(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('RecipientRequired'));
      }

      if (!data.languageId) {
        isValid = false;
        errMsg.push(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('LanguageRequired'));
      }

      if (!data.groupHeadlines && data.recipientName !== AccountingPIC) {
        isValid = false;
        errMsg.push(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('GroupHeadlineRequired'));
      }

      if (this.state.isBotRemoved) {
        isValid = false;
        errMsg.push(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('TheBotRemoved'));
      }

      this.setState({
        isSubmitting: isValid,
        validate: {
          isShow: !isValid,
          errMsgs: errMsg
        }
      });
      return isValid;
    });

    _defineProperty(this, "isDirtyForm", () => JSON.stringify(this.initUpdateGroupMappingState) !== JSON.stringify(this.state.form));

    _defineProperty(this, "onClosePopup", () => {
      if (this.isDirtyForm()) {
        this.setState({
          isShowConfirmDirtyForm: true
        });
      } else {
        this.props.closeUpdateGroupMappingPopup();
      }
    });

    _defineProperty(this, "closeConfirmDirtyForm", () => {
      this.setState({
        isShowConfirmDirtyForm: false
      });
    });

    _defineProperty(this, "getParams", () => {
      const isTest = this.state.form.isTest ? 1 : 0;
      return {
        conversationGroupId: this.conversationGroupId,
        botId: this.state.form.bot.id,
        name: this.state.form.name,
        recipientTypeId: this.state.form.recipientTypeId,
        letstalkId: this.state.form.conversationId,
        groupHeadlineIds: this.state.form.recipientName === AccountingPIC ? '' : this.state.form.groupHeadlines,
        recipientIds: this.state.form.recipientIds,
        languageId: this.state.form.languageId,
        remark: this.state.form.remark,
        isTest: this.state.form.recipientName !== AccountingPIC ? null : isTest
      };
    });

    _defineProperty(this, "handleSubmitForm", e => {
      this.setState({
        isSubmitting: true
      });
      this.props.setGroupMappingResult(null);
      e.preventDefault();

      if (this.isValidParams()) {
        const params = this.getParams();
        this.props.updateGroupMapping(params).then(() => {
          if (this.props.updateGroupMappingResult.isSuccessful) {
            setTimeout(() => {
              this.props.closeUpdateGroupMappingPopup();
              this.props.getGridData(this.props.gridParams);
            }, 3000);
          } else {
            this.setState({
              isSubmitting: false
            });
          }
        });
      }
    });

    _defineProperty(this, "renderForm", isHiddenIsTest => {
      const groupHeadlinesOption = this.state.form.recipientName === AccountingPIC ? this.state.groupHeadlineDefault : this.state.settings.headlineOptions;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"], {
        onSubmit: this.handleSubmitForm
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Body, null, this.state.validate.isShow && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Alert"], {
        variant: "danger"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
        className: "list-message-error"
      }, this.state.validate.errMsgs.map((msg, key) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
        key: key
      }, msg)))), this.props.updateGroupMappingResult && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_ResponseMessage__WEBPACK_IMPORTED_MODULE_6__["default"], {
        isSuccessful: this.props.updateGroupMappingResult.isSuccessful,
        message: this.props.updateGroupMappingResult.message || _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('UpdateGroupMappingSuccess')
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "3",
        md: "2"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('BotName')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "9",
        md: "10"
      }, this.state.form.bot.name)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "3",
        md: "2"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('LetstalkName')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "9",
        md: "10"
      }, this.state.form.name)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        md: "2",
        sm: "3"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('ChatType')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        md: "10",
        sm: "9"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('Group'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "3",
        className: "required",
        md: "2"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('RecipientType')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "9",
        md: "10"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        as: "select",
        size: "sm",
        className: "shadow-none",
        name: "recipientTypeId",
        value: this.state.form.recipientTypeId,
        onChange: e => this.handleRecipientTypeChange(e)
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        value: "",
        disabled: true,
        hidden: true
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('PleaseSelect')), this.props.settings.recipientTypes.map(this.renderEditGroupMappingOptions)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "3",
        md: "2",
        className: "required"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('Recipient')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "9",
        md: "10"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_multiple_select_index__WEBPACK_IMPORTED_MODULE_5__["default"], {
        width: '100%',
        name: "headlineIds",
        dataSource: this.state.settings.recipientOptions,
        keyField: "id",
        valueField: "name",
        statusField: "checked",
        isSummited: false,
        onChange: this.handleRecipientChange,
        hasSearchBox: true
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "3",
        md: "2"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('LetstalkID')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "9",
        md: "10",
        className: "mrg-top-3"
      }, this.state.isLoading && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_Loading__WEBPACK_IMPORTED_MODULE_11__["default"], null), this.props.letstalkVerification.recipients.length > 0 && !this.state.isLoading && this.props.letstalkVerification.recipients.map(this.renderLetstalkIdVerification))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "3",
        md: "2",
        className: "required"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('GroupHeadline')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "9",
        md: "10",
        className: `${this.state.form.recipientName === AccountingPIC ? 'disabled-select' : ''}`
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_multiple_select_index__WEBPACK_IMPORTED_MODULE_5__["default"], {
        valueField: "name",
        statusField: "checked",
        isSummited: false,
        onChange: this.handleGroupHeadlineChange,
        hasSearchBox: true,
        width: '100%',
        name: "headlineIds",
        dataSource: groupHeadlinesOption,
        keyField: "id",
        isDisable: this.state.form.recipientName === AccountingPIC
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "3",
        md: "2"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('MappingStatus')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "9",
        md: "10",
        className: _jsroot_common_site__WEBPACK_IMPORTED_MODULE_9__["default"].mappingStatusClass(this.state.form.mappingStatus.id)
      }, this.state.form.mappingStatus.name)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "3",
        md: "2",
        className: "required"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('Language')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "9",
        md: "10"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        as: "select",
        size: "sm",
        className: "shadow-none",
        name: "languageId",
        value: this.state.form.languageId,
        onChange: e => this.handleChange('languageId', e.target.value)
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        value: "",
        disabled: true,
        hidden: true
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('PleaseSelect')), this.props.settings.languages.map(this.renderEditGroupMappingOptions)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "3",
        md: "2",
        htmlFor: "groupEditRemark"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('Remark')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "9",
        md: "10"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        as: "textarea",
        className: "shadow-none",
        size: "sm",
        name: "remark",
        rows: 5,
        value: this.state.form.remark,
        onChange: e => this.handleChange('remark', e.target.value)
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        md: "2",
        sm: "3"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "9",
        md: "10",
        name: "checkbox-isTest"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        controlId: "isTest-edit-group",
        className: isHiddenIsTest
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Check, {
        type: "checkbox",
        label: _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('IsTest'),
        onChange: event => this.handleChange('isTest', event.target.checked),
        checked: this.state.form.isTest
      }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Footer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], {
        type: "submit",
        variant: "primary",
        size: "sm",
        disabled: this.state.isSubmitting && this.state.isBotRemoved,
        id: "edit-group-mapping-submit"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('Submit')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], {
        type: "button",
        variant: "primary",
        size: "sm",
        onClick: this.onClosePopup
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('Cancel'))));
    });

    this.state = {
      form: {
        bot: {
          id: this.props.updateGroupMappingData.data.botId,
          name: this.props.updateGroupMappingData.data.botName
        },
        name: this.props.updateGroupMappingData.data.conversationGroupName,
        conversationId: this.props.updateGroupMappingData.data.conversationId,
        recipientTypeId: this.props.updateGroupMappingData.data.recipients.length > 0 ? this.props.updateGroupMappingData.data.recipients[0].recipientTypeId : '',
        recipientIds: this.props.updateGroupMappingData.data.recipients.map(r => r.recipientId).toString(),
        recipientName: this.props.updateGroupMappingData.data.recipients.length > 0 ? this.props.updateGroupMappingData.data.recipients[0].recipientTypeName : '',
        groupHeadlines: this.props.updateGroupMappingData.data.headlines.map(v => v.headlineId).toString(),
        mappingStatus: {
          id: this.props.updateGroupMappingData.data.mappingStatusId,
          name: this.props.updateGroupMappingData.data.mappingStatus
        },
        languageId: this.props.updateGroupMappingData.data.languageId || '',
        remark: this.props.updateGroupMappingData.data.remark || '',
        isTest: this.props.updateGroupMappingData.data.isTest === 1 ? true : false
      },
      groupHeadlineDefault: [{
        id: '',
        name: _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('AllGroupHeadlineAndNotAssignedGroup'),
        checked: true
      }],
      isSubmitting: false,
      settings: {
        displayLetstalkIds: [],
        recipientOptions: [],
        headlineOptions: []
      },
      validate: {
        isShow: false,
        errMsgs: []
      },
      isShowConfirmDirtyForm: false,
      isBotRemoved: false,
      isLoading: false
    };
    this.conversationGroupId = this.props.updateGroupMappingData.data.conversationGroupId;
    this.initUpdateGroupMappingState = null;
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.updateGroupMappingData.data !== null) {
      const selectedRecipientIds = prevState.form.recipientIds.split(',');
      const recipientOptions = nextProps.recipients;
      nextProps.recipients.map(item => {
        item['checked'] = selectedRecipientIds.some(v => parseInt(v, 10) === item.id);
      });
      const headlineIds = prevState.form.groupHeadlines.split(',');
      const headlineOptions = nextProps.groupHeadline;
      headlineOptions.map(headline => {
        const checkedId = headlineIds.some(v => parseInt(v, 10) === headline.id);
        headline['checked'] = checkedId;
      });
      const state = {
        settings: {
          recipientOptions: recipientOptions,
          headlineOptions: headlineOptions
        },
        isBotRemoved: nextProps.letstalkVerification.isBotRemoved
      };
      return state;
    }

    return null;
  }

  componentDidMount() {
    this.initUpdateGroupMappingState = Object.assign({}, this.state.form);
    const initData = this.props.updateGroupMappingData.data;
    const recipientTypeId = initData.recipients.length > 0 ? initData.recipients[0].recipientTypeId : '';
    const selectedRecipientIds = initData.recipients.map(r => r.recipientId).toString();

    if (recipientTypeId) {
      this.props.getRecipientByRecipientType(recipientTypeId).then(() => {
        this.props.getGroupHeadlineByRecipient(selectedRecipientIds);
        this.verifyLetstalk(selectedRecipientIds.split(','));
      });
    }
  }

  render() {
    const isHiddenIsTest = this.state.form.recipientName !== AccountingPIC ? 'hidden-isTest' : '';
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"], {
      show: true,
      className: "chat-type-mapping-modal update-group-mapping",
      dialogAs: _jsroot_components_DraggableModalDialog__WEBPACK_IMPORTED_MODULE_7__["default"],
      backdrop: "static",
      keyboard: false,
      size: "lg",
      centered: true,
      onHide: this.onClosePopup
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Header, {
      closeButton: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Title, {
      as: "div"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('EditGroupMapping'))), this.renderForm(isHiddenIsTest)), this.state.isShowConfirmDirtyForm && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_ConfirmPopup__WEBPACK_IMPORTED_MODULE_10__["default"], {
      size: "lg",
      title: _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('Confirmation'),
      content: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('ConfirmDirtyMessage')),
      onSubmit: this.props.closeUpdateGroupMappingPopup,
      onClose: this.closeConfirmDirtyForm
    }));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions_index__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    settings,
    recipients,
    gridParams,
    groupHeadline,
    updateGroupMappingData,
    updateGroupMappingResult,
    letstalkVerification
  } = state;
  return {
    settings,
    recipients,
    groupHeadline,
    gridParams,
    updateGroupMappingData,
    updateGroupMappingResult,
    letstalkVerification
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(EditGroupMappingPopup));

/***/ }),

/***/ "./www/sources/js/pages/chat-type-mapping/components/EditPersonalMappingPopup.jsx":
/*!****************************************************************************************!*\
  !*** ./www/sources/js/pages/chat-type-mapping/components/EditPersonalMappingPopup.jsx ***!
  \****************************************************************************************/
/*! exports provided: EditPersonalMappingPopup, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EditPersonalMappingPopup", function() { return EditPersonalMappingPopup; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions/index */ "./www/sources/js/pages/chat-type-mapping/actions/index.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var _components_multiple_select_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../components/multiple-select/index */ "./www/sources/js/components/multiple-select/index.jsx");
/* harmony import */ var _jsroot_components_ResponseMessage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/components/ResponseMessage */ "./www/sources/js/components/ResponseMessage.jsx");
/* harmony import */ var _jsroot_components_DraggableModalDialog__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/components/DraggableModalDialog */ "./www/sources/js/components/DraggableModalDialog.jsx");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var _jsroot_components_CustomReactSelect__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @jsroot/components/CustomReactSelect */ "./www/sources/js/components/CustomReactSelect.jsx");
/* harmony import */ var _jsroot_components_ConfirmPopup__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @jsroot/components/ConfirmPopup */ "./www/sources/js/components/ConfirmPopup.jsx");
/* harmony import */ var _jsroot_components_Loading__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @jsroot/components/Loading */ "./www/sources/js/components/Loading.jsx");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }













const AccountingPIC = 'Accounting PIC';
class EditPersonalMappingPopup extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleChange", (fieldName, fieldValue) => {
      this.setState(prevState => ({
        form: _objectSpread(_objectSpread({}, prevState.form), {
          [fieldName]: fieldValue
        })
      }));
    });

    _defineProperty(this, "handleGroupHeadlineChange", (currentItem, selectedItemsKey) => {
      this.handleChange('groupHeadlines', selectedItemsKey);
    });

    _defineProperty(this, "handleRecipientTypeChange", e => {
      const index = e.nativeEvent.target.selectedIndex;
      const label = e.nativeEvent.target[index].text;
      this.handleChange('recipientType', e.target.value);
      this.handleChange('recipientName', label);
      this.handleChange('recipient', {
        value: ''
      });
      this.handleChange('groupHeadlines', '');
      this.handleChange('conversationId', '');
      this.handleChange('name', '');
      this.props.getRecipientByRecipientType(e.target.value);

      if (label !== AccountingPIC) {
        this.handleChange('isTest', false);
      }
    });

    _defineProperty(this, "handleRecipientChange", option => {
      this.handleChange('recipient', option || '');
      this.handleChange('groupHeadlines', '');
      this.handleChange('conversationId', '');
      this.handleChange('name', '');
      this.setState({
        settings: {
          letstalkIds: option ? option.letstalkIds : []
        }
      });
      const optionValue = option ? option.value : '';
      this.props.getGroupHeadlineByRecipient(optionValue);
    });

    _defineProperty(this, "handleLetstalkIdSelect", e => {
      this.setState({
        isLoading: true
      });
      this.handleChange('conversationId', e.target.value);
      this.props.getLetstalkDisplayName(this.state.form.botId, e.target.value).then(() => {
        this.handleChange('name', this.props.letstalkName);
        this.setState({
          isLoading: false
        });
      });
    });

    _defineProperty(this, "renderEditPersonalSelectOptions", (item, key) => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        key: `${key}-${item.name}`,
        value: item.id
      }, item.name);
    });

    _defineProperty(this, "renderLetstalkIdsRadioButton", () => {
      let result = null;

      if (this.state.settings.letstalkIds) {
        const letstalkList = this.state.settings.letstalkIds.split(',');
        result = letstalkList.map((letstalkId, key) => {
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Check, {
            key: key,
            inline: true,
            label: letstalkId,
            name: "conversationId",
            type: "radio",
            id: `letstalkId-${key}`,
            value: letstalkId,
            onChange: this.handleLetstalkIdSelect,
            checked: this.state.form.conversationId === letstalkId
          });
        });
      }

      return result;
    });

    _defineProperty(this, "isValidParams", () => {
      const validateData = this.state.form;
      const errMsg = [];
      let isValid = true;

      if (!validateData.botId) {
        isValid = false;
        errMsg.push(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('BotRequired'));
      }

      if (!validateData.recipientType) {
        isValid = false;
        errMsg.push(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('RecipientTypeRequired'));
      }

      if (!validateData.recipient) {
        isValid = false;
        errMsg.push(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('RecipientRequired'));
      }

      if (!validateData.conversationId) {
        isValid = false;
        errMsg.push(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('LetstalkIdRequired'));
      }

      if (!validateData.groupHeadlines && validateData.recipientName !== AccountingPIC) {
        isValid = false;
        errMsg.push(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('GroupHeadlineRequired'));
      }

      if (!validateData.languageId) {
        isValid = false;
        errMsg.push(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('LanguageRequired'));
      }

      this.setState({
        isSubmitting: isValid,
        validate: {
          isShow: !isValid,
          errMsgs: errMsg
        }
      });
      return isValid;
    });

    _defineProperty(this, "isDirtyForm", () => JSON.stringify(this.initEditPersonalMappingState) !== JSON.stringify(this.state.form));

    _defineProperty(this, "onCloseEditPersonalPopup", () => {
      if (this.isDirtyForm()) {
        this.setState({
          isShowConfirmDirtyForm: true
        });
      } else {
        this.props.closeUpdatePersonalMappingPopup();
      }
    });

    _defineProperty(this, "closeConfirmDirtyForm", () => {
      this.setState({
        isShowConfirmDirtyForm: false
      });
    });

    _defineProperty(this, "getParams", () => {
      const isTest = this.state.form.isTest ? 1 : 0;
      return {
        conversationGroupId: this.conversationGroupId,
        botId: this.state.form.botId,
        recipientTypeId: this.state.form.recipientType,
        letstalkId: this.state.form.conversationId,
        groupHeadlineIds: this.state.form.recipientName === AccountingPIC ? '' : this.state.form.groupHeadlines,
        recipientIds: this.state.form.recipient.value,
        languageId: this.state.form.languageId,
        remark: this.state.form.remark,
        isTest: this.state.form.recipientName !== AccountingPIC ? null : isTest
      };
    });

    _defineProperty(this, "handleEditPersonalSubmitForm", e => {
      this.props.setUpdatePersonalMappingResult(null);
      this.setState({
        isSubmitting: true
      });
      e.preventDefault();

      if (this.isValidParams()) {
        const params = this.getParams();
        this.props.updatePersonalMapping(params).then(() => {
          if (this.props.updatePersonalMappingResult.isSuccessful) {
            setTimeout(() => {
              this.props.closeUpdatePersonalMappingPopup();
              this.props.getGridData(this.props.gridParams);
            }, 3000);
          } else {
            this.setState({
              isSubmitting: false
            });
          }
        });
      }
    });

    _defineProperty(this, "renderForm", () => {
      const groupHeadlinesOption = this.state.form.recipientName === AccountingPIC ? this.state.groupHeadlineDefault : this.state.settings.headlineOptions;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"], {
        onSubmit: this.handleEditPersonalSubmitForm
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Body, null, this.state.validate.isShow && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Alert"], {
        variant: "danger"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
        className: "list-message-error"
      }, this.state.validate.errMsgs.map((msg, key) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
        key: key
      }, msg)))), this.props.updatePersonalMappingResult && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_ResponseMessage__WEBPACK_IMPORTED_MODULE_6__["default"], {
        isSuccessful: this.props.updatePersonalMappingResult.isSuccessful,
        message: this.props.updatePersonalMappingResult.message || _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('UpdatePersonalMappingSuccess')
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "3",
        md: "2",
        className: "required"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('BotName')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "9",
        md: "10"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        as: "select",
        size: "sm",
        className: "shadow-none",
        name: "botId",
        onChange: e => this.handleChange('botId', e.target.value),
        value: this.state.form.botId
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        value: "",
        disabled: true,
        hidden: true
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('PleaseSelect')), this.props.settings.bots.map(this.renderEditPersonalSelectOptions)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "3",
        md: "2"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('LetstalkName')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "9",
        md: "10"
      }, this.state.isLoading && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_Loading__WEBPACK_IMPORTED_MODULE_11__["default"], null), !this.state.isLoading && this.state.form.name)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "3",
        md: "2",
        name: "edit-personal"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('ChatType')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        sm: "9",
        md: "10",
        column: true
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('Personal'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        md: "2",
        className: "required",
        sm: "3"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('RecipientType')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "9",
        md: "10"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        as: "select",
        size: "sm",
        className: "shadow-none",
        name: "recipientTypeId",
        onChange: e => this.handleRecipientTypeChange(e),
        value: this.state.form.recipientType
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        value: "",
        disabled: true,
        hidden: true
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('PleaseSelect')), this.props.settings.recipientTypes.map(this.renderEditPersonalSelectOptions)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "3",
        md: "2",
        className: "required"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('Recipient')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "9",
        md: "10"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_CustomReactSelect__WEBPACK_IMPORTED_MODULE_9__["default"], {
        className: "basic-single",
        name: "recipient",
        onChange: this.handleRecipientChange,
        options: this.state.settings.recipientOptions,
        value: this.state.form.recipient,
        isSearchable: true,
        isClearable: true
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "3",
        md: "2",
        className: "required"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('LetstalkID')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "9",
        md: "10"
      }, this.renderLetstalkIdsRadioButton(this.selectedLetstalkIds))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "3",
        md: "2",
        className: "required"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('GroupHeadline')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "9",
        md: "10",
        className: `${this.state.form.recipientName === AccountingPIC ? 'disabled-select' : ''}`
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_multiple_select_index__WEBPACK_IMPORTED_MODULE_5__["default"], {
        width: '100%',
        name: "headlineIds",
        keyField: "id",
        valueField: "name",
        statusField: "checked",
        dataSource: groupHeadlinesOption,
        onChange: this.handleGroupHeadlineChange,
        isSummited: false,
        hasSearchBox: true,
        isDisable: this.state.form.recipientName === AccountingPIC
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "3",
        md: "2",
        className: "required",
        name: "insert-personal-language-label"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('Language')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "9",
        md: "10"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        size: "sm",
        className: "shadow-none",
        as: "select",
        name: "languageId",
        onChange: e => this.handleChange('languageId', e.target.value),
        value: this.state.form.languageId
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        value: "",
        disabled: true,
        hidden: true
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('PleaseSelect')), this.props.settings.languages.map(this.renderEditPersonalSelectOptions)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "3",
        md: "2"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('Remark')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "9",
        md: "10",
        name: "personal-edit"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        as: "textarea",
        size: "sm",
        className: "shadow-none",
        name: "remark",
        value: this.state.form.remark,
        rows: 5,
        onChange: e => this.handleChange('remark', e.target.value)
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        md: "2",
        sm: "3"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "9",
        md: "10",
        name: "checkbox-isTest"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        className: this.state.form.recipientName !== AccountingPIC ? 'hidden-isTest' : '',
        controlId: "isTest-edit-personal"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Check, {
        type: "checkbox",
        label: _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('IsTest'),
        onChange: event => this.handleChange('isTest', event.target.checked),
        checked: this.state.form.isTest
      }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Footer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], {
        type: "submit",
        variant: "primary",
        size: "sm",
        disabled: this.state.isSubmitting,
        id: "edit-personal-mapping-submit-btn"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('Submit')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], {
        type: "button",
        variant: "primary",
        size: "sm",
        onClick: this.onCloseEditPersonalPopup
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('Cancel'))));
    });

    this.state = {
      form: {
        botId: this.props.updatePersonalMappingData.data.botId,
        name: this.props.updatePersonalMappingData.data.conversationGroupName,
        conversationId: this.props.updatePersonalMappingData.data.conversationId,
        recipientType: this.props.updatePersonalMappingData.data.recipients.length > 0 ? this.props.updatePersonalMappingData.data.recipients[0].recipientTypeId : '',
        recipientName: this.props.updatePersonalMappingData.data.recipients.length > 0 ? this.props.updatePersonalMappingData.data.recipients[0].recipientTypeName : '',
        groupHeadlines: this.props.updatePersonalMappingData.data.headlines.map(v => v.headlineId).toString(),
        recipient: {
          value: this.props.updatePersonalMappingData.data.recipients.length > 0 ? this.props.updatePersonalMappingData.data.recipients[0].recipientId : '',
          label: this.props.updatePersonalMappingData.data.recipients.length > 0 ? this.props.updatePersonalMappingData.data.recipients[0].recipientName : ''
        },
        letstalkId: this.props.updatePersonalMappingData.data.conversationId,
        languageId: this.props.updatePersonalMappingData.data.languageId,
        remark: this.props.updatePersonalMappingData.data.remark,
        isTest: this.props.updatePersonalMappingData.data.isTest === 1 ? true : false
      },
      groupHeadlineDefault: [{
        id: '',
        name: _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('AllGroupHeadlineAndNotAssignedGroup'),
        checked: true
      }],
      isSubmitting: false,
      settings: {
        letstalkIds: '',
        recipientOptions: [],
        headlineOptions: []
      },
      validate: {
        isShow: false,
        errMsgs: []
      },
      isShowConfirmDirtyForm: false,
      isLoading: false
    };
    this.conversationGroupId = this.props.updatePersonalMappingData.data.conversationGroupId;
    this.initEditPersonalMappingState = null;
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.updatePersonalMappingData.data !== null) {
      const recipientId = prevState.form.recipient.value;
      const headlineIds = prevState.form.groupHeadlines.split(',');
      let letstalkIds = '';

      if (nextProps.recipients.length > 0) {
        const selectRecipient = nextProps.recipients.filter(r => r.id === recipientId);
        letstalkIds = selectRecipient.length > 0 ? selectRecipient[0].letstalkIds : '';
      }

      const recipientOptions = nextProps.recipients.map(item => {
        return {
          value: item.id,
          label: item.name,
          letstalkIds: item.letstalkIds
        };
      });
      const headlineOptions = nextProps.groupHeadline;
      headlineOptions.map(headline => {
        const checkedId = headlineIds.some(v => parseInt(v, 10) === headline.id);
        headline['checked'] = checkedId;
      });
      const state = {
        settings: {
          letstalkIds: letstalkIds,
          recipientOptions: recipientOptions,
          headlineOptions: headlineOptions
        }
      };
      return state;
    }

    return null;
  }

  componentDidMount() {
    this.initEditPersonalMappingState = Object.assign({}, this.state.form);
    const initData = this.props.updatePersonalMappingData.data;
    const recipientTypeId = initData.recipients.length > 0 ? initData.recipients[0].recipientTypeId : '';
    const selectedRecipientId = initData.recipients.length > 0 ? initData.recipients[0].recipientId : '';
    this.props.getRecipientByRecipientType(recipientTypeId);
    this.props.getGroupHeadlineByRecipient(selectedRecipientId);
  }

  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"], {
      show: true,
      className: "chat-type-mapping-modal edit-personal-mapping",
      dialogAs: _jsroot_components_DraggableModalDialog__WEBPACK_IMPORTED_MODULE_7__["default"],
      backdrop: "static",
      keyboard: false,
      size: "lg",
      centered: true,
      onHide: this.props.closeUpdatePersonalMappingPopup
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Header, {
      closeButton: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Title, {
      as: "div"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('EditPersonalMapping'))), this.renderForm()), this.state.isShowConfirmDirtyForm && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_ConfirmPopup__WEBPACK_IMPORTED_MODULE_10__["default"], {
      size: "lg",
      title: _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('Confirmation'),
      content: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('ConfirmDirtyMessage')),
      onSubmit: this.props.closeUpdatePersonalMappingPopup,
      onClose: this.closeConfirmDirtyForm
    }));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions_index__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    settings,
    recipients,
    groupHeadline,
    gridParams,
    updatePersonalMappingData,
    updatePersonalMappingResult,
    letstalkName
  } = state;
  return {
    settings,
    recipients,
    groupHeadline,
    gridParams,
    letstalkName,
    updatePersonalMappingData,
    updatePersonalMappingResult
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(EditPersonalMappingPopup));

/***/ }),

/***/ "./www/sources/js/pages/chat-type-mapping/components/Filter.jsx":
/*!**********************************************************************!*\
  !*** ./www/sources/js/pages/chat-type-mapping/components/Filter.jsx ***!
  \**********************************************************************/
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
/* harmony import */ var _actions_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../actions/index */ "./www/sources/js/pages/chat-type-mapping/actions/index.js");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var _components_multiple_select_index__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../components/multiple-select/index */ "./www/sources/js/components/multiple-select/index.jsx");
/* harmony import */ var _InsertPersonalMappingPopup__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./InsertPersonalMappingPopup */ "./www/sources/js/pages/chat-type-mapping/components/InsertPersonalMappingPopup.jsx");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/lib/index.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_toastify__WEBPACK_IMPORTED_MODULE_8__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }










class Filter extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "onChange", (fieldName, fieldValue) => {
      this.setState(prevState => ({
        filter: _objectSpread(_objectSpread({}, prevState.filter), {
          [fieldName]: fieldValue
        })
      }));
    });

    _defineProperty(this, "getParams", () => {
      return {
        chatType: this.state.filter.chatType,
        botId: this.state.filter.botId,
        name: this.state.filter.name,
        groupHeadline: this.state.filter.groupHeadline,
        recipientIds: this.state.filter.recipient,
        letstalkId: this.state.filter.letstalkID,
        mappingStatuses: this.state.filter.mappingStatuses,
        languageId: this.state.filter.languageId,
        isActive: this.state.filter.active,
        pageIndex: 1,
        pageSize: 100
      };
    });

    _defineProperty(this, "isValidParams", () => this.state.filter.mappingStatuses !== '');

    _defineProperty(this, "submitHandler", e => {
      e.preventDefault();

      if (this.isValidParams()) {
        const params = this.getParams();
        this.props.setGridParams(params);
        this.props.getGridData(params);
      } else {
        react_toastify__WEBPACK_IMPORTED_MODULE_8__["toast"].error(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('PleaseChooseMappingStatus'));
      }
    });

    _defineProperty(this, "renderOptions", (item, key) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
      key: key,
      value: item.id
    }, item.name));

    this.state = {
      filter: {
        chatType: '',
        name: '',
        groupHeadline: '',
        recipient: '',
        letstalkID: '',
        mappingStatuses: '',
        languageId: '',
        botId: '',
        active: ''
      },
      settings: {
        chatTypes: [],
        mappingStatuses: [],
        languages: [],
        bots: []
      }
    };
  }

  componentDidMount() {
    this.props.getSettings().then(() => {
      const mappingStatuses = this.props.settings.mappingStatuses;
      const selectedMappingStatuses = [];
      mappingStatuses.map(v => {
        v['checked'] = true;
        selectedMappingStatuses.push(v['id']);
      });
      const settings = {
        chatTypes: this.props.settings.chatTypes,
        mappingStatuses: mappingStatuses,
        languages: this.props.settings.languages,
        bots: this.props.settings.bots
      };
      this.setState(prevState => ({
        filter: _objectSpread(_objectSpread({}, prevState.filter), {
          mappingStatuses: selectedMappingStatuses.toString()
        }),
        settings: settings
      }), () => this.props.setGridParams(this.getParams()));
    });
  }

  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"], {
      className: "form-filter",
      onSubmit: this.submitHandler
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Row, {
      className: "form-row"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
      className: "col-auto col-form-label"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('ChatType')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Control, {
      as: "select",
      size: "sm",
      className: "shadow-none",
      value: this.state.filter.chatType,
      onChange: e => this.onChange('chatType', e.target.value)
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
      value: ""
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('All')), this.state.settings.chatTypes.map(this.renderOptions))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
      className: "col-auto col-form-label"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('LetstalkName')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Control, {
      type: "text",
      size: "sm",
      className: "shadow-none",
      value: this.state.filter.name,
      onChange: e => this.onChange('name', e.target.value)
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
      className: "col-auto col-form-label"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('GroupHeadline')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Control, {
      type: "text",
      size: "sm",
      className: "shadow-none",
      value: this.state.filter.groupHeadline,
      onChange: e => this.onChange('groupHeadline', e.target.value)
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
      className: "col-auto col-form-label"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Recipient')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Control, {
      type: "text",
      size: "sm",
      className: "shadow-none",
      value: this.state.filter.recipient,
      onChange: e => this.onChange('recipient', e.target.value)
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
      className: "col-auto col-form-label"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('LetstalkID')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Control, {
      type: "text",
      size: "sm",
      className: "shadow-none",
      value: this.state.filter.letstalkID,
      onChange: e => this.onChange('letstalkID', e.target.value)
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
      className: "col-auto col-form-label"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('MappingStatus')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "form-control-wrapper"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_multiple_select_index__WEBPACK_IMPORTED_MODULE_6__["default"], {
      initialValue: this.state.filter.mappingStatuses,
      dataSource: this.state.settings.mappingStatuses,
      keyField: "id",
      valueField: "name",
      statusField: "checked",
      isSummited: false,
      isAllTextShown: true,
      onChange: (currentItem, selectedItem) => this.onChange('mappingStatuses', selectedItem)
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
      className: "col-auto col-form-label"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Language')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Control, {
      as: "select",
      size: "sm",
      className: "shadow-none",
      value: this.state.filter.languageId,
      onChange: e => this.onChange('languageId', e.target.value)
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
      value: ""
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('All')), this.state.settings.languages.map(this.renderOptions))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
      className: "col-auto col-form-label"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Active')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Control, {
      as: "select",
      size: "sm",
      className: "shadow-none",
      value: this.state.filter.active,
      onChange: e => this.onChange('active', e.target.value)
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
      value: ""
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('All')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
      value: "true"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Yes')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
      value: "false"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('No')))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Label, {
      className: "col-auto col-form-label"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('BotName')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Control, {
      as: "select",
      size: "sm",
      className: "shadow-none",
      value: this.state.filter.botId,
      onChange: e => this.onChange('botId', e.target.value)
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
      value: ""
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('All')), this.state.settings.bots.map(this.renderOptions))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Form"].Group, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "col-auto pd-0"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], {
      className: "mr-2",
      variant: "primary",
      size: "sm",
      type: "submit"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('Submit'))), this.props.isHost && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "col-auto"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_3__["Button"], {
      className: "mr-2",
      variant: "primary",
      size: "sm",
      type: "button",
      onClick: this.props.openInsertPersonalMappingPopup
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_5__["default"].getResource('InsertPersonalMappingBtn')))))), this.props.insertPersonalMappingData.isShow && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_InsertPersonalMappingPopup__WEBPACK_IMPORTED_MODULE_7__["default"], {
      onClose: this.props.closePersonalMappingPopup
    }));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions_index__WEBPACK_IMPORTED_MODULE_4__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    settings,
    insertPersonalMappingData,
    insertPersonalMappingResult
  } = state;
  return {
    settings,
    insertPersonalMappingData,
    insertPersonalMappingResult
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(Filter));

/***/ }),

/***/ "./www/sources/js/pages/chat-type-mapping/components/InsertPersonalMappingPopup.jsx":
/*!******************************************************************************************!*\
  !*** ./www/sources/js/pages/chat-type-mapping/components/InsertPersonalMappingPopup.jsx ***!
  \******************************************************************************************/
/*! exports provided: InsertPersonalMappingPopup, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InsertPersonalMappingPopup", function() { return InsertPersonalMappingPopup; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../actions/index */ "./www/sources/js/pages/chat-type-mapping/actions/index.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var _jsroot_components_multiple_select_index__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/components/multiple-select/index */ "./www/sources/js/components/multiple-select/index.jsx");
/* harmony import */ var _jsroot_components_ResponseMessage__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/components/ResponseMessage */ "./www/sources/js/components/ResponseMessage.jsx");
/* harmony import */ var _jsroot_components_DraggableModalDialog__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/components/DraggableModalDialog */ "./www/sources/js/components/DraggableModalDialog.jsx");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var _jsroot_components_CustomReactSelect__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @jsroot/components/CustomReactSelect */ "./www/sources/js/components/CustomReactSelect.jsx");
/* harmony import */ var _jsroot_components_ConfirmPopup__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @jsroot/components/ConfirmPopup */ "./www/sources/js/components/ConfirmPopup.jsx");
/* harmony import */ var _jsroot_components_Loading__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @jsroot/components/Loading */ "./www/sources/js/components/Loading.jsx");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }













const AccountingPIC = 'Accounting PIC';
class InsertPersonalMappingPopup extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleChange", (fieldName, fieldValue) => {
      this.setState(prevState => ({
        form: _objectSpread(_objectSpread({}, prevState.form), {
          [fieldName]: fieldValue
        })
      }));
    });

    _defineProperty(this, "handleBotChange", value => {
      this.setState({
        isLoading: true
      });
      this.handleChange('botId', value);
      this.props.getLetstalkDisplayName(value, this.state.form.letstalkId).then(() => {
        this.handleChange('displayName', this.props.letstalkName);
        this.setState({
          isLoading: false
        });
      });
    });

    _defineProperty(this, "handleGroupHeadlineChange", (currentItem, selectedItemsKey) => {
      this.handleChange('groupHeadlines', selectedItemsKey);
    });

    _defineProperty(this, "handleRecipientTypeChange", e => {
      const index = e.nativeEvent.target.selectedIndex;
      const label = e.nativeEvent.target[index].text;
      this.handleChange('recipientType', e.target.value);
      this.handleChange('recipientName', label);
      this.props.getRecipientByRecipientType(e.target.value);
      this.handleChange('letstalkId', '');
      this.handleChange('displayName', '');
      this.setState({
        letstalkIds: ''
      });
      this.handleChange('recipient', '');

      if (label !== AccountingPIC) {
        this.handleChange('isTest', false);
      }
    });

    _defineProperty(this, "handleRecipientChange", option => {
      this.handleChange('recipient', option || '');
      this.handleChange('letstalkId', '');
      this.handleChange('displayName', '');
      this.setState({
        letstalkIds: option ? option.letstalkIds : ''
      });
      const optionValue = option ? option.value : '';
      this.props.getGroupHeadlineByRecipient(optionValue);
    });

    _defineProperty(this, "handleLetstalkSelect", e => {
      this.setState({
        isLoading: true
      });
      this.handleChange('letstalkId', e.target.value);
      this.props.getLetstalkDisplayName(this.state.form.botId, e.target.value).then(() => {
        this.handleChange('displayName', this.props.letstalkName);
        this.setState({
          isLoading: false
        });
      });
    });

    _defineProperty(this, "renderOptions", (item, key) => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        key: `${key}-${item.id}`,
        value: item.id
      }, item.name);
    });

    _defineProperty(this, "renderLetstalkIds", () => {
      let result = null;

      if (this.state.letstalkIds) {
        const letstalkList = this.state.letstalkIds.split(',');
        result = letstalkList.map((letstalkId, key) => {
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Check, {
            key: key,
            inline: true,
            label: letstalkId,
            name: "letstalkId",
            type: "radio",
            id: `letstalkId-${key}`,
            value: letstalkId,
            checked: this.state.form.letstalkId === letstalkId,
            onChange: this.handleLetstalkSelect
          });
        });
      }

      return result;
    });

    _defineProperty(this, "isValidParams", () => {
      const data = this.state.form;
      const errMsg = [];
      let isValid = true;

      if (!data.botId) {
        isValid = false;
        errMsg.push(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('BotRequired'));
      }

      if (!data.recipientType) {
        isValid = false;
        errMsg.push(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('RecipientTypeRequired'));
      }

      if (!data.recipient) {
        isValid = false;
        errMsg.push(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('RecipientRequired'));
      }

      if (!data.letstalkId) {
        isValid = false;
        errMsg.push(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('LetstalkIdRequired'));
      }

      if (!data.groupHeadlines && data.recipientName !== AccountingPIC) {
        isValid = false;
        errMsg.push(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('GroupHeadlineRequired'));
      }

      if (!data.languageId) {
        isValid = false;
        errMsg.push(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('LanguageRequired'));
      }

      this.setState({
        isSubmitting: isValid,
        validate: {
          isShow: !isValid,
          errMsgs: errMsg
        }
      });
      return isValid;
    });

    _defineProperty(this, "getParams", () => {
      const isTest = this.state.form.isTest ? 1 : 0;
      return {
        botId: this.state.form.botId,
        recipientTypeId: this.state.form.recipientType,
        letstalkId: this.state.form.letstalkId,
        groupHeadlineIds: this.state.form.groupHeadlines,
        recipientIds: this.state.form.recipient.value,
        languageId: this.state.form.languageId,
        remark: this.state.form.remark,
        isTest: this.state.form.recipientName !== AccountingPIC ? null : isTest
      };
    });

    _defineProperty(this, "handleSubmit", e => {
      this.props.setInsertPersonalMappingResult(null);
      this.setState({
        isSubmitting: true
      });
      e.preventDefault();

      if (this.isValidParams()) {
        const params = this.getParams();
        this.props.insertPersonalMapping(params).then(() => {
          if (this.props.insertPersonalMappingResult.isSuccessful) {
            setTimeout(() => {
              this.props.closeInsertPersonalMappingPopup();
              this.props.getGridData(this.props.gridParams);
              this.props.setInsertPersonalMappingResult(null);
            }, 3000);
          } else {
            this.setState({
              isSubmitting: false
            });
          }
        });
      }
    });

    _defineProperty(this, "isDirtyForm", () => JSON.stringify(this.initState) !== JSON.stringify(this.state.form));

    _defineProperty(this, "onCloseInsertPopup", () => {
      if (this.isDirtyForm()) {
        this.setState({
          dirtyFormConfirmation: {
            isShow: true
          }
        });
      } else {
        this.props.closeInsertPersonalMappingPopup();
      }
    });

    _defineProperty(this, "closeConfirmDirtyForm", () => {
      this.setState({
        dirtyFormConfirmation: {
          isShow: false
        }
      });
    });

    _defineProperty(this, "renderForm", () => {
      const recipientOptions = this.props.recipients.map(item => {
        return {
          value: item.id,
          label: item.name,
          letstalkIds: item.letstalkIds
        };
      });
      const groupHeadlinesOption = this.state.form.recipientName === AccountingPIC ? this.state.groupHeadlineDefault : this.props.groupHeadline;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"], {
        onSubmit: this.handleSubmit
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Body, null, this.state.validate.isShow && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Alert"], {
        variant: "danger"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
        className: "list-message-error"
      }, this.state.validate.errMsgs.map((msg, key) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
        key: key
      }, msg)))), this.props.insertPersonalMappingResult && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_ResponseMessage__WEBPACK_IMPORTED_MODULE_6__["default"], {
        isSuccessful: this.props.insertPersonalMappingResult.isSuccessful,
        message: this.props.insertPersonalMappingResult.message || _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('InsertPersonalMappingSuccessfully')
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "3",
        md: "2",
        className: "required"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('BotName')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "9",
        md: "10"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        as: "select",
        size: "sm",
        className: "shadow-none",
        name: "botId",
        onChange: e => this.handleBotChange(e.target.value),
        value: this.state.form.botId
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        value: "",
        disabled: true,
        hidden: true
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('PleaseSelect')), this.props.settings.bots.map(this.renderOptions)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "3",
        md: "2"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('LetstalkName')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "9",
        md: "10"
      }, this.state.isLoading && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_Loading__WEBPACK_IMPORTED_MODULE_11__["default"], null), !this.state.isLoading && this.state.form.displayName)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "3",
        md: "2"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('ChatType')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "9",
        md: "10"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('Personal'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "3",
        md: "2",
        className: "required"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('RecipientType')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "9",
        md: "10"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        as: "select",
        size: "sm",
        className: "shadow-none",
        name: "recipientTypeId",
        onChange: e => this.handleRecipientTypeChange(e),
        value: this.state.form.recipientType
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        value: "",
        disabled: true,
        hidden: true
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('PleaseSelect')), this.props.settings.recipientTypes.map(this.renderOptions)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "3",
        md: "2",
        className: "required"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('Recipient')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "9",
        md: "10"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_CustomReactSelect__WEBPACK_IMPORTED_MODULE_9__["default"], {
        className: "basic-single",
        isSearchable: true,
        isClearable: true,
        name: "recipient",
        onChange: this.handleRecipientChange,
        options: recipientOptions,
        value: this.state.form.recipient
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "3",
        md: "2",
        className: "required"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('LetstalkID')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "9",
        md: "10"
      }, this.renderLetstalkIds(this.selectedLetstalkIds))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "3",
        md: "2",
        className: "required"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('GroupHeadline')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "9",
        md: "10",
        className: `${this.state.form.recipientName === AccountingPIC ? 'disabled-select' : ''}`
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_multiple_select_index__WEBPACK_IMPORTED_MODULE_5__["default"], {
        width: '100%',
        name: "headlineIds",
        dataSource: groupHeadlinesOption,
        keyField: "id",
        valueField: "name",
        statusField: "checked",
        isSummited: false,
        onChange: this.handleGroupHeadlineChange,
        hasSearchBox: true,
        isDisable: this.state.form.recipientName === AccountingPIC
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "3",
        md: "2",
        className: "required"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('Language')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "9",
        md: "10"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        as: "select",
        size: "sm",
        className: "shadow-none",
        name: "languageId",
        onChange: e => this.handleChange('languageId', e.target.value),
        value: this.state.form.languageId
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        value: "",
        disabled: true,
        hidden: true
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('PleaseSelect')), this.props.settings.languages.map(this.renderOptions)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "3",
        md: "2"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('Remark')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "9",
        md: "10",
        name: "insert-personal"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Control, {
        as: "textarea",
        size: "sm",
        className: "shadow-none",
        rows: 5,
        name: "remark",
        onChange: e => this.handleChange('remark', e.target.value),
        value: this.state.form.remark
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        as: react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Row"]
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Label, {
        column: true,
        sm: "3",
        md: "2"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Col"], {
        sm: "9",
        md: "10",
        name: "checkbox-isTest"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Group, {
        controlId: "isTest-insert",
        className: this.state.form.recipientName !== AccountingPIC ? 'hidden-isTest' : ''
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Form"].Check, {
        type: "checkbox",
        label: _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('IsTest'),
        checked: this.state.form.isTest,
        onChange: event => this.handleChange('isTest', event.target.checked)
      }))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Footer, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], {
        type: "submit",
        variant: "primary",
        size: "sm",
        disabled: this.state.isSubmitting
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('Submit')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Button"], {
        type: "button",
        variant: "primary",
        size: "sm",
        onClick: this.onCloseInsertPopup
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('Cancel'))));
    });

    this.state = {
      form: {
        botId: this.props.settings.bots ? this.props.settings.bots[0].id : '',
        displayName: '',
        recipientType: '',
        recipientName: '',
        groupHeadlines: '',
        recipient: '',
        letstalkId: '',
        languageId: '',
        remark: '',
        isTest: false
      },
      groupHeadlineDefault: [{
        id: '',
        name: _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('AllGroupHeadlineAndNotAssignedGroup'),
        checked: true
      }],
      isSubmitting: false,
      letstalkIds: '',
      validate: {
        isShow: false,
        errMsgs: []
      },
      isLoading: false,
      dirtyFormConfirmation: {
        isShow: false
      }
    };
    this.initState = null;
  }

  componentDidMount() {
    this.initState = Object.assign({}, this.state.form);
  }

  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"], {
      show: true,
      className: "chat-type-mapping-modal",
      dialogAs: _jsroot_components_DraggableModalDialog__WEBPACK_IMPORTED_MODULE_7__["default"],
      backdrop: "static",
      keyboard: false,
      size: "lg",
      centered: true,
      onHide: this.onCloseInsertPopup
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Header, {
      closeButton: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_4__["Modal"].Title, {
      as: "div"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('InsertPersonalMapping'))), this.renderForm()), this.state.dirtyFormConfirmation.isShow && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_ConfirmPopup__WEBPACK_IMPORTED_MODULE_10__["default"], {
      size: "lg",
      title: _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('Confirmation'),
      content: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_8__["default"].getResource('ConfirmDirtyMessage')),
      onSubmit: this.props.closeInsertPersonalMappingPopup,
      onClose: this.closeConfirmDirtyForm
    }));
  }

}

const mapDispatchToProps = dispatch => Object(redux__WEBPACK_IMPORTED_MODULE_2__["bindActionCreators"])(_actions_index__WEBPACK_IMPORTED_MODULE_3__["ActionCreators"], dispatch);

const mapStateToProps = state => {
  const {
    settings,
    recipients,
    groupHeadline,
    gridParams,
    insertPersonalMappingResult,
    letstalkName
  } = state;
  return {
    settings,
    recipients,
    groupHeadline,
    gridParams,
    insertPersonalMappingResult,
    letstalkName
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(InsertPersonalMappingPopup));

/***/ }),

/***/ "./www/sources/js/pages/chat-type-mapping/index.js":
/*!*********************************************************!*\
  !*** ./www/sources/js/pages/chat-type-mapping/index.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return index; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _jsroot_common_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/common/store */ "./www/sources/js/common/store.js");
/* harmony import */ var _components_AppContainer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/AppContainer */ "./www/sources/js/pages/chat-type-mapping/components/AppContainer.jsx");
/* harmony import */ var _reducers_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./reducers/index */ "./www/sources/js/pages/chat-type-mapping/reducers/index.js");
/* harmony import */ var _cssroot_pages_chat_type_mapping_index_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @cssroot/pages/chat-type-mapping/index.scss */ "./www/sources/css/pages/chat-type-mapping/index.scss");
/* harmony import */ var _cssroot_pages_chat_type_mapping_index_scss__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_cssroot_pages_chat_type_mapping_index_scss__WEBPACK_IMPORTED_MODULE_5__);






const store = _jsroot_common_store__WEBPACK_IMPORTED_MODULE_2__["default"].createStore(_reducers_index__WEBPACK_IMPORTED_MODULE_4__["default"], {
  gridData: {
    data: null,
    totalItems: 0
  },
  updateActiveStatusResult: null,
  insertPersonalMappingData: {
    isShow: false
  },
  insertPersonalMappingResult: null,
  updatePersonalMappingData: {
    isShow: false,
    data: null
  },
  updatePersonalMappingResult: null,
  updateGroupMappingData: {
    isShow: false,
    data: null
  },
  updateGroupMappingResult: null,
  recipients: [],
  groupHeadline: [],
  letstalkVerification: {
    isBotRemoved: false,
    recipients: []
  }
});
class index extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_1__["Provider"], {
      store: store
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_AppContainer__WEBPACK_IMPORTED_MODULE_3__["default"], null));
  }

}

/***/ }),

/***/ "./www/sources/js/pages/chat-type-mapping/reducers/dataHandlerReducer.js":
/*!*******************************************************************************!*\
  !*** ./www/sources/js/pages/chat-type-mapping/reducers/dataHandlerReducer.js ***!
  \*******************************************************************************/
/*! exports provided: settings, gridParams, gridData, updateActiveStatusPopup, updateActiveStatusResult, recipients, groupHeadline, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "settings", function() { return settings; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gridParams", function() { return gridParams; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "gridData", function() { return gridData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateActiveStatusPopup", function() { return updateActiveStatusPopup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateActiveStatusResult", function() { return updateActiveStatusResult; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recipients", function() { return recipients; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "groupHeadline", function() { return groupHeadline; });
/* harmony import */ var _jsroot_common_createReducer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/common/createReducer */ "./www/sources/js/common/createReducer.js");
/* harmony import */ var _actions_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../actions/types */ "./www/sources/js/pages/chat-type-mapping/actions/types.js");


const settings = Object(_jsroot_common_createReducer__WEBPACK_IMPORTED_MODULE_0__["default"])({}, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_1__["default"].SETTING_DATA](state, action) {
    return action.data;
  }

});
const gridParams = Object(_jsroot_common_createReducer__WEBPACK_IMPORTED_MODULE_0__["default"])({}, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_1__["default"].GRID_PARAMS](state, action) {
    return action.data;
  }

});
const gridData = Object(_jsroot_common_createReducer__WEBPACK_IMPORTED_MODULE_0__["default"])({}, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_1__["default"].GRID_DATA](state, action) {
    return action.data;
  }

});
const updateActiveStatusPopup = Object(_jsroot_common_createReducer__WEBPACK_IMPORTED_MODULE_0__["default"])({}, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_1__["default"].ACTIVE_POPUP_DATA](state, action) {
    return action.data;
  }

});
const updateActiveStatusResult = Object(_jsroot_common_createReducer__WEBPACK_IMPORTED_MODULE_0__["default"])({}, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_1__["default"].ACTIVE_RESULT_DATA](state, action) {
    return action.data;
  }

});
const recipients = Object(_jsroot_common_createReducer__WEBPACK_IMPORTED_MODULE_0__["default"])({}, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_1__["default"].RECIPIENT_DATA](state, action) {
    return action.data;
  }

});
const groupHeadline = Object(_jsroot_common_createReducer__WEBPACK_IMPORTED_MODULE_0__["default"])({}, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_1__["default"].GROUP_HEADLINE_DATA](state, action) {
    return action.data;
  }

});
const reducers = {
  settings,
  gridParams,
  gridData,
  updateActiveStatusPopup,
  updateActiveStatusResult,
  recipients,
  groupHeadline
};
/* harmony default export */ __webpack_exports__["default"] = (reducers);

/***/ }),

/***/ "./www/sources/js/pages/chat-type-mapping/reducers/index.js":
/*!******************************************************************!*\
  !*** ./www/sources/js/pages/chat-type-mapping/reducers/index.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _dataHandlerReducer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dataHandlerReducer */ "./www/sources/js/pages/chat-type-mapping/reducers/dataHandlerReducer.js");
/* harmony import */ var _popupHandlerReducers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./popupHandlerReducers */ "./www/sources/js/pages/chat-type-mapping/reducers/popupHandlerReducers.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




/* harmony default export */ __webpack_exports__["default"] = (Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])(_objectSpread(_objectSpread({}, _dataHandlerReducer__WEBPACK_IMPORTED_MODULE_1__["default"]), _popupHandlerReducers__WEBPACK_IMPORTED_MODULE_2__["default"])));

/***/ }),

/***/ "./www/sources/js/pages/chat-type-mapping/reducers/popupHandlerReducers.js":
/*!*********************************************************************************!*\
  !*** ./www/sources/js/pages/chat-type-mapping/reducers/popupHandlerReducers.js ***!
  \*********************************************************************************/
/*! exports provided: insertPersonalMappingData, insertPersonalMappingResult, updatePersonalMappingData, updatePersonalMappingResult, updateGroupMappingData, updateGroupMappingResult, letstalkVerification, letstalkName, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "insertPersonalMappingData", function() { return insertPersonalMappingData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "insertPersonalMappingResult", function() { return insertPersonalMappingResult; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updatePersonalMappingData", function() { return updatePersonalMappingData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updatePersonalMappingResult", function() { return updatePersonalMappingResult; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateGroupMappingData", function() { return updateGroupMappingData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateGroupMappingResult", function() { return updateGroupMappingResult; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "letstalkVerification", function() { return letstalkVerification; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "letstalkName", function() { return letstalkName; });
/* harmony import */ var _jsroot_common_createReducer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/common/createReducer */ "./www/sources/js/common/createReducer.js");
/* harmony import */ var _actions_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../actions/types */ "./www/sources/js/pages/chat-type-mapping/actions/types.js");


const insertPersonalMappingData = Object(_jsroot_common_createReducer__WEBPACK_IMPORTED_MODULE_0__["default"])({}, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_1__["default"].PERSONAL_MAPPING_INSERT_POPUP_DATA](state, action) {
    return action.data;
  }

});
const insertPersonalMappingResult = Object(_jsroot_common_createReducer__WEBPACK_IMPORTED_MODULE_0__["default"])({}, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_1__["default"].PERSONAL_MAPPING_INSERT_RESULT](state, action) {
    return action.data;
  }

});
const updatePersonalMappingData = Object(_jsroot_common_createReducer__WEBPACK_IMPORTED_MODULE_0__["default"])({}, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_1__["default"].PERSONAL_MAPPING_UPDATE_POPUP_DATA](state, action) {
    return action.data;
  }

});
const updatePersonalMappingResult = Object(_jsroot_common_createReducer__WEBPACK_IMPORTED_MODULE_0__["default"])({}, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_1__["default"].PERSONAL_MAPPING_UPDATE_RESULT](state, action) {
    return action.data;
  }

});
const updateGroupMappingData = Object(_jsroot_common_createReducer__WEBPACK_IMPORTED_MODULE_0__["default"])({}, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_1__["default"].GROUP_MAPPING_POPUP_DATA](state, action) {
    return action.data;
  }

});
const updateGroupMappingResult = Object(_jsroot_common_createReducer__WEBPACK_IMPORTED_MODULE_0__["default"])({}, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_1__["default"].GROUP_MAPPING_UPDATE_RESULT](state, action) {
    return action.data;
  }

});
const letstalkVerification = Object(_jsroot_common_createReducer__WEBPACK_IMPORTED_MODULE_0__["default"])({}, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_1__["default"].GROUP_MAPPING_LETSTALK_VERIFICATION_DATA](state, action) {
    return action.data;
  }

});
const letstalkName = Object(_jsroot_common_createReducer__WEBPACK_IMPORTED_MODULE_0__["default"])({}, {
  [_actions_types__WEBPACK_IMPORTED_MODULE_1__["default"].LETSTALK_DISPLAY_NAME](state, action) {
    return action.data;
  }

});
const reducers = {
  insertPersonalMappingData,
  insertPersonalMappingResult,
  updatePersonalMappingData,
  updatePersonalMappingResult,
  updateGroupMappingData,
  updateGroupMappingResult,
  letstalkVerification,
  letstalkName
};
/* harmony default export */ __webpack_exports__["default"] = (reducers);

/***/ })

}]);
//# sourceMappingURL=1.chunk.js.map