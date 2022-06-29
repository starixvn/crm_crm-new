/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"js/dev/pages/auth/recheckin": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/www/dist/";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([2,"vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./www/sources/js/common/constants.js":
/*!********************************************!*\
  !*** ./www/sources/js/common/constants.js ***!
  \********************************************/
/*! exports provided: PAGING_SIZES, SMALL_PAGING_SIZES, DefaultPageSize, DateFormat, DateTimeFormat, TimeFormat, BackGroundChange, RoleIds, MappingStatus, ChatTypeMapping, MULTI_SELECT_TEXT_OPTIONS, AUTO_REFRESH_TIMES, MaximumDisplayRelatedCustomer, Policy, BorderStyle, LogActions, DefaultLanguages, FeedbackSelectionType, ReportBy, SubMainMenu, DetailMenu */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PAGING_SIZES", function() { return PAGING_SIZES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SMALL_PAGING_SIZES", function() { return SMALL_PAGING_SIZES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DefaultPageSize", function() { return DefaultPageSize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DateFormat", function() { return DateFormat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DateTimeFormat", function() { return DateTimeFormat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TimeFormat", function() { return TimeFormat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BackGroundChange", function() { return BackGroundChange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RoleIds", function() { return RoleIds; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MappingStatus", function() { return MappingStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChatTypeMapping", function() { return ChatTypeMapping; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MULTI_SELECT_TEXT_OPTIONS", function() { return MULTI_SELECT_TEXT_OPTIONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AUTO_REFRESH_TIMES", function() { return AUTO_REFRESH_TIMES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MaximumDisplayRelatedCustomer", function() { return MaximumDisplayRelatedCustomer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Policy", function() { return Policy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BorderStyle", function() { return BorderStyle; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LogActions", function() { return LogActions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DefaultLanguages", function() { return DefaultLanguages; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeedbackSelectionType", function() { return FeedbackSelectionType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ReportBy", function() { return ReportBy; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SubMainMenu", function() { return SubMainMenu; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DetailMenu", function() { return DetailMenu; });
/* harmony import */ var _langHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./langHelper */ "./www/sources/js/common/langHelper.js");

const PAGING_SIZES = [100, 200, 300, 400, 500, 1000];
const SMALL_PAGING_SIZES = [1, 5, 7, 10];
const DefaultPageSize = 100;
const DateFormat = 'MM/dd/yyyy';
const DateTimeFormat = 'MM/dd/yyyy hh:mm:ss a';
const TimeFormat = 'hh:mm:ss a';
const BackGroundChange = 'background-change';
const RoleIds = {
  'Member': 1,
  'CRMMember': 7000
};
const MappingStatus = {
  'BotRemoved': 0,
  'NotMapped': 1,
  'Mapped': 2
};
const ChatTypeMapping = {
  'Personal': 2,
  'Group': 1
};
const MULTI_SELECT_TEXT_OPTIONS = {
  Texts: _langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getResource('All'),
  SelectedItemCount: '# selected',
  SelectOptions: _langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getResource('PleaseSelect'),
  NoData: _langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getResource('NoData'),
  NA: _langHelper__WEBPACK_IMPORTED_MODULE_0__["default"].getResource('N/A')
};
const AUTO_REFRESH_TIMES = [90, 120, 150, 180];
const MaximumDisplayRelatedCustomer = 20;
const Policy = {
  None: 0,
  Read: 1,
  Host: 2
};
const BorderStyle = {
  bottom: 'border-bottom-0',
  top: 'border-top-0'
};
const LogActions = {
  InsertNewPic: 901,
  UpdatePic: 902,
  UpdatePicStatus: 903,
  RemoveDirectAccountFromPic: 904,
  AssignDirectAccountToPic: 905,
  UpdateThePicOfAHeadline: 906,
  UpdateDefaultPicForAGroupHeadline: 907,
  RemoveDefaultPicForAGroupHeadline: 908,
  AddCustomerToCreditTermGroup: 909,
  UpdateCreditTerm: 910,
  RemoveCustomerFromCreditTermGroup: 911,
  SetCustomerToCreditTermGroup: 912,
  AddTheGeneralInformationForSuperFromExistingSuper: 913
};
const DefaultLanguages = {
  NotApply: 0,
  English: 1200,
  Mandarin: 1201,
  Cantonese: 1202
};
const FeedbackSelectionType = [{
  name: 'By Creator',
  id: 1
}, {
  name: 'By Country',
  id: 2
}, {
  name: 'By Role',
  id: 3
}, {
  name: 'By Site',
  id: 4
}, {
  name: 'By Status',
  id: 5
}, {
  name: 'By Response',
  id: 6
}, {
  name: 'By Product',
  id: 7
}, {
  name: 'By Category',
  id: 8
}, {
  name: 'By Licensees',
  id: 9
}, {
  name: 'By CommunicationTool',
  id: 10
}];
const ReportBy = [{
  name: 'Month',
  id: 1
}, {
  name: 'Year',
  id: 2
}];
const SubMainMenu = [{
  id: 1,
  url: '/Dashboard'
}, {
  id: 2,
  url: '/CustomerInfoDetail'
}, {
  id: 3,
  url: '/CommunicationLog'
}, {
  id: 4,
  url: '/Remark'
}, {
  id: 5,
  url: '/Redemption'
}, {
  id: 6,
  url: '/ActionLog'
}];
const DetailMenu = [{
  id: 1,
  url: '/LatestFeedback'
}, {
  id: 2,
  url: '/AddFeedback'
}, {
  id: 3,
  url: '/ManageFeedback'
}];

/***/ }),

/***/ "./www/sources/js/common/dataService.js":
/*!**********************************************!*\
  !*** ./www/sources/js/common/dataService.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DataService; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _site__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./site */ "./www/sources/js/common/site.js");


class DataService {
  static async getDataAsync(url, params) {
    return await axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(url, {
      params: params,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then(response => response).catch(_site__WEBPACK_IMPORTED_MODULE_1__["default"].handleAxiosError);
  }

  static async postDataAsync(url, params) {
    const token = document.getElementById('xsrfToken').value;

    if (!token) {
      return;
    }

    return await axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(url, params, {
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'RequestVerificationToken': token
      }
    }).then(response => response).catch(_site__WEBPACK_IMPORTED_MODULE_1__["default"].handleAxiosError);
  }

  static async getFileAsync(url, params) {
    return await axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(url, params, {
      responseType: 'blob',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'RequestVerificationToken': _site__WEBPACK_IMPORTED_MODULE_1__["default"].getXsrfToken()
      }
    }).then(response => response).catch(_site__WEBPACK_IMPORTED_MODULE_1__["default"].handleAxiosError);
  }

}

/***/ }),

/***/ "./www/sources/js/common/langHelper.js":
/*!*********************************************!*\
  !*** ./www/sources/js/common/langHelper.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LangHelper; });
const DEFAULT_RESOURCE_NAME = '_language_en_US';
const langCode = window.PageLanguage || 'en-US';
const resourceName = `_language_${langCode.replace('-', '_')}`;
class LangHelper {
  static getResource(key) {
    var langHandler = window[resourceName];
    return langHandler && langHandler[key] || window[DEFAULT_RESOURCE_NAME] && window[DEFAULT_RESOURCE_NAME][key] || key;
  }

  static formatString(...args) {
    let text = args[0];

    for (let i = 1; i < args.length; i++) {
      let regEx = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
      text = text.replace(regEx, args[i]);
    }

    return text;
  }

}

/***/ }),

/***/ "./www/sources/js/common/site.js":
/*!***************************************!*\
  !*** ./www/sources/js/common/site.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Site; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./www/sources/js/common/constants.js");

const _rootUrl = "/";
console.log(_rootUrl);
let _xsrfToken = null;
class Site {
  static blockUI() {
    document.getElementById('loadingProcess').style.display = 'block';
  }

  static downloadFile(data, fileName) {
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(url);
  }

  static getXsrfToken() {
    if (!_xsrfToken && document.querySelector('input[name=__RequestVerificationToken]')) {
      _xsrfToken = document.querySelector('input[name=__RequestVerificationToken]').value;
    }

    return _xsrfToken;
  }

  static handleAxiosError(error) {
    if (error.response) {
      let url;

      switch (error.response.status) {
        case 401:
          url = 'auth/SignOut';
          break;

        case 404:
          url = 'error/PageNotFound';
          break;

        case 405:
          url = 'error/AccessDenied';
          break;

        case 500:
          url = 'error/InternalError';
          break;
      }

      window.location = _rootUrl + url;
    }
  }

  static resolveClientUrl(relativeUrl) {
    return _rootUrl + relativeUrl;
  }

  static unblockUI() {
    document.getElementById('loadingProcess').style.display = 'none';
  }

  static mappingStatusClass(mappingStatusId) {
    switch (mappingStatusId) {
      case _constants__WEBPACK_IMPORTED_MODULE_0__["MappingStatus"].BotRemoved:
        return 'badge-grey';

      case _constants__WEBPACK_IMPORTED_MODULE_0__["MappingStatus"].NotMapped:
        return 'badge-red';

      case _constants__WEBPACK_IMPORTED_MODULE_0__["MappingStatus"].Mapped:
        return 'badge-green';

      default:
        return '';
    }
  }

  static displayCopiedToClipboard() {
    const div = document.createElement('div');
    div.className = 'copied-confirm';
    div.innerHTML = `Coppied to clipboard!`;
    document.body.appendChild(div);
    setTimeout(() => {
      div.remove();
    }, 1000);
  }

  static debounce(func, wait) {
    let timeout;
    return function (...theArgs) {
      const context = this,
            args = theArgs;

      const later = () => {
        func.apply(context, args);
      };

      clearTimeout(timeout);
      timeout = setTimeout(later, wait || 500);
    };
  }

}

/***/ }),

/***/ "./www/sources/js/pages/auth/recheckin.js":
/*!************************************************!*\
  !*** ./www/sources/js/pages/auth/recheckin.js ***!
  \************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jsroot/common/site */ "./www/sources/js/common/site.js");
/* harmony import */ var _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/common/dataService */ "./www/sources/js/common/dataService.js");



const recheckin = async function () {
  const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_0__["default"].resolveClientUrl('Auth/CheckUserOnlineStatus');
  await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_1__["default"].postDataAsync(url).then(() => setTimeout(recheckin, 60000));
};

const isHost = document.getElementById('IsHost').checked;

if (isHost) {
  setTimeout(recheckin, 60000);
}

/***/ }),

/***/ 2:
/*!******************************************************!*\
  !*** multi ./www/sources/js/pages/auth/recheckin.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./www/sources/js/pages/auth/recheckin.js */"./www/sources/js/pages/auth/recheckin.js");


/***/ })

/******/ });
//# sourceMappingURL=recheckin.chunk.js.map