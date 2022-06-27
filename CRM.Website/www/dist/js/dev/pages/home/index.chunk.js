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
/******/ 	// object to store loaded CSS chunks
/******/ 	var installedCssChunks = {
/******/ 		"js/dev/pages/home/index": 0
/******/ 	}
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"js/dev/pages/home/index": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "js/dev/lib/" + ({"common":"common"}[chunkId]||chunkId) + ".chunk.js"
/******/ 	}
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
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// mini-css-extract-plugin CSS loading
/******/ 		var cssChunks = {"0":1,"1":1,"2":1,"3":1,"4":1,"5":1,"6":1,"7":1,"8":1,"9":1,"10":1,"11":1,"12":1};
/******/ 		if(installedCssChunks[chunkId]) promises.push(installedCssChunks[chunkId]);
/******/ 		else if(installedCssChunks[chunkId] !== 0 && cssChunks[chunkId]) {
/******/ 			promises.push(installedCssChunks[chunkId] = new Promise(function(resolve, reject) {
/******/ 				var href = "js/dev/lib/" + ({"common":"common"}[chunkId]||chunkId) + ".chunk.css";
/******/ 				var fullhref = __webpack_require__.p + href;
/******/ 				var existingLinkTags = document.getElementsByTagName("link");
/******/ 				for(var i = 0; i < existingLinkTags.length; i++) {
/******/ 					var tag = existingLinkTags[i];
/******/ 					var dataHref = tag.getAttribute("data-href") || tag.getAttribute("href");
/******/ 					if(tag.rel === "stylesheet" && (dataHref === href || dataHref === fullhref)) return resolve();
/******/ 				}
/******/ 				var existingStyleTags = document.getElementsByTagName("style");
/******/ 				for(var i = 0; i < existingStyleTags.length; i++) {
/******/ 					var tag = existingStyleTags[i];
/******/ 					var dataHref = tag.getAttribute("data-href");
/******/ 					if(dataHref === href || dataHref === fullhref) return resolve();
/******/ 				}
/******/ 				var linkTag = document.createElement("link");
/******/ 				linkTag.rel = "stylesheet";
/******/ 				linkTag.type = "text/css";
/******/ 				linkTag.onload = resolve;
/******/ 				linkTag.onerror = function(event) {
/******/ 					var request = event && event.target && event.target.src || fullhref;
/******/ 					var err = new Error("Loading CSS chunk " + chunkId + " failed.\n(" + request + ")");
/******/ 					err.request = request;
/******/ 					delete installedCssChunks[chunkId]
/******/ 					linkTag.parentNode.removeChild(linkTag)
/******/ 					reject(err);
/******/ 				};
/******/ 				linkTag.href = fullhref;
/******/ 				var head = document.getElementsByTagName("head")[0];
/******/ 				head.appendChild(linkTag);
/******/ 			}).then(function() {
/******/ 				installedCssChunks[chunkId] = 0;
/******/ 			}));
/******/ 		}
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
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
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
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
/******/ 	deferredModules.push([0,"vendor"]);
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

/***/ "./www/sources/js/common/dateTimeService.js":
/*!**************************************************!*\
  !*** ./www/sources/js/common/dateTimeService.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DateTimeService; });
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);

const ShortDateFormat = 'MMM DD, YYYY';
const ShortDateTimeFormat = 'MMM DD, YYYY hh:mm A';
const LongDateTimeFormat = 'MMM DD, YYYY hh:mm:ss A';
const StartTimeRemarkPrefix = 'YYYYMMDD/hh:mmA';
class DateTimeService {
  static startOfDay(date) {
    return moment__WEBPACK_IMPORTED_MODULE_0___default()(date).startOf('day');
  }

  static endOfDay(date) {
    return moment__WEBPACK_IMPORTED_MODULE_0___default()(date).endOf('day');
  }

  static firstDayOfWeek(date) {
    return moment__WEBPACK_IMPORTED_MODULE_0___default()(date).startOf('week');
  }

  static lastDayOfWeek(date) {
    return moment__WEBPACK_IMPORTED_MODULE_0___default()(date).endOf('week');
  }

  static firstDayOfMonth(date) {
    return moment__WEBPACK_IMPORTED_MODULE_0___default()(date).startOf('month');
  }

  static lastDayOfMonth(date) {
    return moment__WEBPACK_IMPORTED_MODULE_0___default()(date).endOf('month');
  }

  static toClientDateTime(date) {
    const ClientTimezone = document.getElementById('clientTimezone').value;
    date = moment__WEBPACK_IMPORTED_MODULE_0___default()(date, LongDateTimeFormat);
    return moment__WEBPACK_IMPORTED_MODULE_0___default.a.utc(date).utcOffset(ClientTimezone);
  }

  static toServerDateTime(date) {
    date = moment__WEBPACK_IMPORTED_MODULE_0___default()(date, LongDateTimeFormat);
    return moment__WEBPACK_IMPORTED_MODULE_0___default()(date).utc().utcOffset(ClientTimezone);
  }

  static toShortDateFormat(date) {
    return moment__WEBPACK_IMPORTED_MODULE_0___default()(date).format(ShortDateFormat);
  }

  static toShortDateTimeFormat(date) {
    return moment__WEBPACK_IMPORTED_MODULE_0___default()(date).format(ShortDateTimeFormat);
  }

  static toLongDateTimeFormat(date) {
    return moment__WEBPACK_IMPORTED_MODULE_0___default()(date).format(LongDateTimeFormat);
  }

  static toStartTimePrefix(date) {
    return moment__WEBPACK_IMPORTED_MODULE_0___default()(date).format(StartTimeRemarkPrefix);
  }

  static toDiffDays(date1, date2) {
    return moment__WEBPACK_IMPORTED_MODULE_0___default()(date1).diff(moment__WEBPACK_IMPORTED_MODULE_0___default()(date2), 'days');
  }

  static firstMonthOfYear(date) {
    return moment__WEBPACK_IMPORTED_MODULE_0___default()(date).startOf('year');
  }

  static endMonthOfYear(date) {
    return moment__WEBPACK_IMPORTED_MODULE_0___default()(date).endOf('year');
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


const _rootUrl = document.getElementById('RootUrl') ? document.getElementById('RootUrl').value : '/';

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

/***/ "./www/sources/js/components/AutoComplete.jsx":
/*!****************************************************!*\
  !*** ./www/sources/js/components/AutoComplete.jsx ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AutoComplete; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




class AutoComplete extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "selectOption", item => {
      const displayField = this.props.displayField;
      this.setState({
        showOptionList: false,
        searchValue: displayField.length > 0 ? item[displayField] : item
      });
      this.props.onChange && this.props.onChange(item);
    });

    _defineProperty(this, "handleClickOutside", event => {
      if (this.state.showOptionList && this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
        this.setState({
          showOptionList: false
        });
      }
    });

    _defineProperty(this, "handleChange", event => {
      const value = event.target.value;
      this.setState({
        searchValue: value,
        selectedItem: -1
      }, () => {
        this.props.onInputChange(value.trim());
        this.props.onChange && this.props.onChange(value.trim());
      });
    });

    _defineProperty(this, "handleSetSelectedItem", index => {
      this.setState({
        selectedItem: index
      });
    });

    _defineProperty(this, "handleKeyDown", event => {
      if (!this.state.showOptionList) {
        return;
      }

      switch (event.keyCode) {
        case 27: //Event.KEY_ESC

        case 9: //EVENT.KEY_TAB

        case 13:
          //EVENT.KEY_ENTER
          this.setState({
            selectedItem: -1,
            showOptionList: false
          });
          break;

        case 38:
          //EVENT.KEY_UP
          this.moveUp();
          break;

        case 40:
          //EVENT.KEY_DOWN
          this.moveDown();
          break;

        default:
          return;
      }
    });

    _defineProperty(this, "moveUp", () => {
      const {
        selectedItem
      } = this.state;

      if (selectedItem === -1) {
        return;
      }

      if (selectedItem === 0) {
        this.setState({
          selectedItem: -1
        });
      } else {
        const {
          displayField,
          options
        } = this.props;
        const index = selectedItem - 1;
        const value = displayField.length > 0 ? options[index][displayField] : options[index];
        this.setState({
          selectedItem: index,
          searchValue: value
        });
        this.props.onChange && this.props.onChange(value);
      }
    });

    _defineProperty(this, "moveDown", () => {
      const {
        selectedItem
      } = this.state;
      const {
        displayField,
        options
      } = this.props;

      if (selectedItem === options.length - 1) {
        return;
      }

      const index = selectedItem + 1;
      const value = displayField.length > 0 ? options[index][displayField] : options[index];
      this.setState({
        selectedItem: index,
        searchValue: value
      });
      this.props.onChange && this.props.onChange(value);
    });

    this.wrapperRef = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
    this.state = {
      showOptionList: false,
      searchValue: props.value,
      placeholder: props.placeholder,
      selectedItem: -1
    };
  }

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside);
  }

  componentDidUpdate(prevProps) {
    if (this.props.options !== prevProps.options && this.props.options.length > 0) {
      this.setState({
        showOptionList: true
      });
    }

    if (this.props.value !== prevProps.value) {
      this.setState({
        searchValue: this.props.value
      });
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  }

  render() {
    const {
      showOptionList,
      searchValue,
      placeholder
    } = this.state;
    const {
      options,
      displayField,
      isInvalid
    } = this.props;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "autocomplete-container",
      ref: this.wrapperRef
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Control, {
      type: "text",
      size: "sm",
      autoComplete: "off",
      className: "shadow-none",
      isInvalid: isInvalid,
      value: searchValue,
      placeholder: placeholder,
      onChange: this.handleChange,
      onKeyDown: this.handleKeyDown
    }), showOptionList && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "autocomplete-items-container"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "autocomplete-items"
    }, options.map((item, index) => {
      const reg = new RegExp(`(${searchValue})`, 'gi');
      const selected = this.state.selectedItem === index ? 'selected' : '';
      const displayValue = (displayField.length > 0 ? item[displayField] : item).replace(reg, "<span class='text-matched'>$1</span>");
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        key: index,
        className: `autocomplete-item ${selected}`,
        dangerouslySetInnerHTML: {
          __html: displayValue
        },
        onClick: () => this.selectOption(item),
        onMouseOver: () => this.handleSetSelectedItem(index)
      });
    }))));
  }

}

_defineProperty(AutoComplete, "propTypes", {
  value: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  placeholder: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  options: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string), prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object)]),
  displayField: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  onInputChange: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func
});

_defineProperty(AutoComplete, "defaultProps", {
  value: '',
  placeholder: '',
  options: [],
  displayField: '',
  isInvalid: false
});

/***/ }),

/***/ "./www/sources/js/components/DraggableModalDialog.jsx":
/*!************************************************************!*\
  !*** ./www/sources/js/components/DraggableModalDialog.jsx ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var react_draggable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-draggable */ "./node_modules/react-draggable/build/cjs/cjs.js");
/* harmony import */ var react_draggable__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_draggable__WEBPACK_IMPORTED_MODULE_2__);




class DraggableModalDialog extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_draggable__WEBPACK_IMPORTED_MODULE_2___default.a, {
      handle: ".modal-header",
      grid: [10, 10]
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["ModalDialog"], this.props));
  }

}

/* harmony default export */ __webpack_exports__["default"] = (DraggableModalDialog);

/***/ }),

/***/ "./www/sources/js/components/FormikErrorMessage.jsx":
/*!**********************************************************!*\
  !*** ./www/sources/js/components/FormikErrorMessage.jsx ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_3__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






class FormikErrorMessage extends react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "validateFormikField", (touched, errors, fieldName) => !(touched[fieldName] && errors[fieldName]));
  }

  render() {
    const {
      errors,
      touched,
      fieldNames
    } = this.props;
    return !Object(lodash__WEBPACK_IMPORTED_MODULE_3__["isEmpty"])(errors) && !Object(lodash__WEBPACK_IMPORTED_MODULE_3__["isEmpty"])(touched) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Alert"], {
      variant: "danger"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
      className: "list-message-error"
    }, fieldNames.map(field => {
      const isValid = this.validateFormikField(touched, errors, field);
      return !isValid && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
        key: field
      }, errors[field]);
    })));
  }

}

_defineProperty(FormikErrorMessage, "propTypes", {
  errors: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
  fieldNames: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string),
  touched: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object
});

_defineProperty(FormikErrorMessage, "defaultProps", {
  touched: {},
  errors: {},
  fieldNames: []
});

/* harmony default export */ __webpack_exports__["default"] = (FormikErrorMessage);

/***/ }),

/***/ "./www/sources/js/components/SelectWithSearch.jsx":
/*!********************************************************!*\
  !*** ./www/sources/js/components/SelectWithSearch.jsx ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SelectWithSearch; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





class SelectWithSearch extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "toggleSelect", () => {
      if (this.state.selectFormStatus === 'open') {
        this.setState({
          selectFormStatus: ''
        });
      } else {
        this.setState({
          selectFormStatus: 'open'
        });
      }
    });

    _defineProperty(this, "selectItem", item => {
      this.setState({
        selectFormStatus: '',
        selectedItem: {
          id: item.id,
          name: item.name
        }
      });
      this.props.OnChangeValue(item);
    });

    _defineProperty(this, "handleChangeSearchInput", event => {
      const value = event.target.value;
      const options = this.props.options.map(item => {
        const childSites = item.childSites.filter(site => site.name.toLowerCase().includes(value.toLowerCase()));
        return {
          name: item.name,
          id: item.id,
          childSites
        };
      });
      this.setState({
        options,
        filter: value
      });
    });

    _defineProperty(this, "clearSearchBox", () => {
      this.setState({
        filter: '',
        options: this.props.options
      });
    });

    _defineProperty(this, "refreshViewValue", () => {
      const item = {
        id: 0,
        name: this.state.isSelectOption ? '-- Select --' : 'N/A'
      };
      this.setState({
        selectFormStatus: '',
        selectedItem: item
      });
      this.props.OnChangeValue(item);
    });

    _defineProperty(this, "toggleCollapseExpanse", () => {
      this.setState({
        collapsedAll: !this.state.collapsedAll
      });
    });

    _defineProperty(this, "clickHandler", event => {
      if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
        this.setState({
          selectFormStatus: ''
        });
      }
    });

    this.wrapperRef = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createRef();
    this.state = {
      selectFormStatus: '',
      selectedItem: {
        id: this.props.value,
        name: this.props.name || 'N/A'
      },
      options: this.props.options,
      filter: '',
      isHideNA: this.props.isHideNA,
      isSelectOption: this.props.isSelectOption,
      collapsedAll: true
    };
  }

  componentDidMount() {
    document.addEventListener('click', this.clickHandler);
  }

  componentDidUpdate(prevProps) {
    if (this.props.name !== prevProps.name) {
      this.setState({
        selectedItem: {
          id: this.props.value,
          name: this.props.name
        }
      });
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.clickHandler);
  }

  render() {
    const {
      options
    } = this.state;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: 'dropdown selectwithsearchtree ' + this.state.selectFormStatus,
      ref: this.wrapperRef
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      type: "button",
      className: "btn",
      onClick: this.toggleSelect
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "pull-left"
    }, this.state.selectedItem.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "fa fa-caret-down pull-right"
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
      className: "dropdown-menu"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Control, {
      type: "text",
      size: "sm",
      className: "filter shadow-none",
      name: "filter",
      placeholder: _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('Search'),
      onChange: this.handleChangeSearchInput,
      value: this.state.filter
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "searchclear fa fa-times",
      onClick: this.clearSearchBox
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      className: "toolbar"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "input-group input-group-sm"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", null, "\xA0"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "input-group-btn"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      onClick: this.toggleCollapseExpanse,
      className: this.state.collapsedAll ? 'fa fa-upload' : 'fa fa-download'
    })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      className: "divider"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "tree"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", null, !this.state.isHideNA && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      onClick: this.refreshViewValue
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "group-text"
    }, "N/A"))), this.state.isSelectOption && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      onClick: this.refreshViewValue
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "-- Select --"))), options.map((item, index) => {
      if (item.childSites.length === 0) {
        return null;
      }

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
        className: "parent",
        key: index
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "group-text"
      }, item.name)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
        className: "list-unstyled"
      }, this.state.collapsedAll && item.childSites.map((item1, index1) => {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
          key: index1
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
          onClick: () => this.selectItem(item1)
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, item1.name)));
      })));
    }))))));
  }

}

_defineProperty(SelectWithSearch, "propTypes", {
  isSelectOption: prop_types__WEBPACK_IMPORTED_MODULE_2___default.a.bool
});

_defineProperty(SelectWithSearch, "defaultProps", {
  isSelectOption: false
});

/***/ }),

/***/ "./www/sources/js/components/SweetModalDialog.jsx":
/*!********************************************************!*\
  !*** ./www/sources/js/components/SweetModalDialog.jsx ***!
  \********************************************************/
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
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






class SweetModalDialog extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      size,
      title,
      contents,
      buttons,
      backdropClassName,
      className
    } = this.props;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"], {
      show: true,
      backdrop: "static",
      dialogAs: _DraggableModalDialog__WEBPACK_IMPORTED_MODULE_3__["default"],
      backdropClassName: backdropClassName,
      className: className,
      keyboard: false,
      size: size,
      centered: true,
      onHide: this.props.onClose
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Header, {
      closeButton: true
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Title, {
      as: "div"
    }, title)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Body, null, contents), buttons && buttons.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Modal"].Footer, null, buttons.map((btnItem, index) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], {
      key: index
    }, btnItem))));
  }

}

_defineProperty(SweetModalDialog, "propTypes", {
  backdropClassName: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  buttons: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.element),
  className: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  contents: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.element.isRequired,
  onClose: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func.isRequired,
  size: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOf(['sm', 'lg', 'xl', 'md']),
  title: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired
});

_defineProperty(SweetModalDialog, "defaultProps", {
  backdropClassName: 'sweet-alert-modal-backdrop',
  className: 'sweet-alert-modal',
  buttons: [],
  size: 'sm',
  title: '',
  contents: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Fragment"], null),
  onClose: function () {// nothing
  }
});

/* harmony default export */ __webpack_exports__["default"] = (SweetModalDialog);

/***/ }),

/***/ "./www/sources/js/components/WithNavigation.jsx":
/*!******************************************************!*\
  !*** ./www/sources/js/components/WithNavigation.jsx ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/index.js");
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }




const WithNavigation = Component => props => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Component, _extends({}, props, {
  navigate: Object(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["useNavigate"])(),
  location: Object(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["useLocation"])()
}));

/* harmony default export */ __webpack_exports__["default"] = (WithNavigation);

/***/ }),

/***/ "./www/sources/js/components/layout-container/common.functions.js":
/*!************************************************************************!*\
  !*** ./www/sources/js/components/layout-container/common.functions.js ***!
  \************************************************************************/
/*! exports provided: renderSystemOption, validateFormik, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderSystemOption", function() { return renderSystemOption; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "validateFormik", function() { return validateFormik; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");


const renderSystemOption = item => {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
    key: item.id,
    value: item.id
  }, item.name);
};
const validateFormik = values => {
  const errors = {};

  if (!values.languageId) {
    errors.languageId = _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('LanguagesRequired');
  }

  return errors;
};
const functions = {
  renderSystemOption,
  validateFormik
};
/* harmony default export */ __webpack_exports__["default"] = (functions);

/***/ }),

/***/ "./www/sources/js/components/layout-container/components/BreadcrumbTime.jsx":
/*!**********************************************************************************!*\
  !*** ./www/sources/js/components/layout-container/components/BreadcrumbTime.jsx ***!
  \**********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BreadcrumbTime; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/common/dateTimeService */ "./www/sources/js/common/dateTimeService.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! moment */ "./node_modules/moment/moment.js");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");




class BreadcrumbTime extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);
    this.state = {
      time: moment__WEBPACK_IMPORTED_MODULE_2___default()(new Date()).format('hh:mm:ss A MMM DD, YYYY')
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      const currentTime = new Date(_jsroot_common_dateTimeService__WEBPACK_IMPORTED_MODULE_1__["default"].toClientDateTime(new Date()));
      const currentTimeFormat = moment__WEBPACK_IMPORTED_MODULE_2___default()(currentTime).format('hh:mm:ss A MMM DD, YYYY');
      this.setState({
        time: currentTimeFormat
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      sm: "3",
      md: "3"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "pull-right timezone"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "fa fa-clock-o fa-lg pr-2",
      "aria-hidden": "true"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      id: "span-timezoneContainer"
    }, this.state.time + _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('Gmt8'))));
  }

}

/***/ }),

/***/ "./www/sources/js/components/layout-container/components/DataGrid.jsx":
/*!****************************************************************************!*\
  !*** ./www/sources/js/components/layout-container/components/DataGrid.jsx ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DataGrid; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var formik__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! formik */ "./node_modules/formik/dist/formik.esm.js");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var _common_functions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common.functions */ "./www/sources/js/components/layout-container/common.functions.js");
/* harmony import */ var _jsroot_components_FormikErrorMessage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/components/FormikErrorMessage */ "./www/sources/js/components/FormikErrorMessage.jsx");
/* harmony import */ var _jsroot_components_multiple_select_index__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/components/multiple-select/index */ "./www/sources/js/components/multiple-select/index.jsx");
/* harmony import */ var _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @jsroot/common/constants */ "./www/sources/js/common/constants.js");
/* harmony import */ var _jsroot_components_SelectWithSearch__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @jsroot/components/SelectWithSearch */ "./www/sources/js/components/SelectWithSearch.jsx");
/* harmony import */ var _jsroot_common_site__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @jsroot/common/site */ "./www/sources/js/common/site.js");
/* harmony import */ var _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @jsroot/common/dataService */ "./www/sources/js/common/dataService.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/lib/index.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react_toastify__WEBPACK_IMPORTED_MODULE_11__);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }













class DataGrid extends react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "renderForm", ({
      errors,
      values,
      handleChange,
      touched,
      handleSubmit,
      isSubmitting,
      setFieldValue
    }) => {
      const {
        customerInfo,
        settings
      } = this.props;
      const isShowInactiveMsg = settings.sitesLicenseeInactive.filter(x => x.id === customerInfo.siteId).length > 0;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"], {
        className: "left-form-customer",
        id: "left-form-container",
        noValidate: true,
        onSubmit: handleSubmit
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_FormikErrorMessage__WEBPACK_IMPORTED_MODULE_5__["default"], {
        touched: touched,
        errors: errors,
        fieldNames: Object.keys(values)
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Group, {
        className: "mrb0"
      }, values.uplineInfo.map((value, index) => {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Row"], {
          className: "item",
          key: index
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
          md: "3",
          className: "text-left"
        }, value.role.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
          md: "5",
          className: "text-left"
        }, value.username === 'Unassigned' ? value.username : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          className: "upline-username",
          onClick: () => this.handleSearchUplineInfo(value.username)
        }, value.username)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
          md: "4",
          className: "status text-right"
        }, value.status !== '' ? value.status : ''));
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Group, {
        className: "row item current"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
        md: "3",
        className: "text-left"
      }, values.role.name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
        md: "5",
        className: "text-left"
      }, values.username), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
        md: "4",
        className: "status text-right"
      }, values.status)), (values.role.id === _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_7__["RoleIds"].Member || values.role.id === _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_7__["RoleIds"].CRMMember) && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Group, {
        className: "row item"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Label, {
        column: true,
        md: "3",
        htmlFor: "name"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('Danger')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
        md: "9"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Row"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
        md: "3"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('DangerOriginal')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
        md: "4"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('DangerNonLive')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
        md: "5"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('DangerOtherSports'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Row"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
        md: "3"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'lv' + values.originalDangerLevel
      }, values.originalDangerLevel !== 0 ? `${_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('Lv1')} ${values.originalDangerLevel}` : _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('None'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
        md: "4"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'lv' + values.abtDangerLevel
      }, values.abtDangerLevel !== 0 ? `${_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('Lv1')} ${values.abtDangerLevel}` : _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('None'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
        md: "5"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: 'lv' + values.otherSportsDangerLevel
      }, values.otherSportsDangerLevel !== 0 ? `${_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('Lv1')} ${values.otherSportsDangerLevel}` : _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('None')))))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Group, {
        className: "row item no-border-bg"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Label, {
        column: true,
        md: "3",
        htmlFor: "name"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('Site')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
        md: "9"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_SelectWithSearch__WEBPACK_IMPORTED_MODULE_8__["default"], {
        className: "basic-single",
        onChange: handleChange,
        options: settings.sites,
        value: values.siteId,
        name: values.site.name,
        isHideNA: false,
        OnChangeValue: this.handleChangeSite
      }))), isShowInactiveMsg && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Group, {
        className: "row item no-border-bg inactive-site"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Label, {
        column: true,
        md: "3"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
        md: "9"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('CannotCreateInactiveSite'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Group, {
        className: "row item no-border-bg"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Label, {
        column: true,
        md: "3",
        htmlFor: "name"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('Country')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
        md: "9"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Control, {
        as: "select",
        size: "sm",
        className: "shadow-none",
        id: "countryId",
        name: "countryId",
        value: values.countryId,
        onChange: handleChange
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("option", {
        value: "0"
      }, "N/A"), settings.countries.map(_common_functions__WEBPACK_IMPORTED_MODULE_4__["renderSystemOption"])))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Group, {
        className: "row item no-border-bg"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Label, {
        column: true,
        md: "3",
        htmlFor: "name"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('FirstName')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
        md: "9"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Control, {
        type: "text",
        size: "sm",
        className: "shadow-none",
        onChange: handleChange,
        name: "firstName",
        value: values.firstName,
        autoComplete: "off"
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Group, {
        className: "row item no-border-bg"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Label, {
        column: true,
        md: "3",
        htmlFor: "lastName"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('LastName')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
        md: "9"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Control, {
        type: "text",
        size: "sm",
        className: "shadow-none",
        onChange: handleChange,
        name: "lastName",
        value: values.lastName,
        autoComplete: "off"
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Group, {
        className: "row item no-border-bg"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Label, {
        column: true,
        md: "3",
        htmlFor: "nickname"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('Nickname')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
        md: "9"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Label, {
        size: "sm",
        className: ""
      }, values.nickname))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Group, {
        className: "row item no-border-bg"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Label, {
        column: true,
        md: "3",
        htmlFor: "name"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('Language')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
        md: "9",
        className: "form-control-wrapper"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_multiple_select_index__WEBPACK_IMPORTED_MODULE_6__["default"], {
        isInvalid: touched.languageId && errors.languageId,
        dataSource: this.state.languages,
        keyField: "languageId",
        valueField: "name",
        statusField: "checked",
        isNAOption: true,
        isAllTextShown: true,
        onChange: (currentItem, selectedItemsKey) => {
          setFieldValue('languageId', selectedItemsKey);
        }
      }))), this.renderCommunicationTool(values, handleChange, isSubmitting), this.renderDetail(isShowInactiveMsg));
    });

    _defineProperty(this, "renderCommunicationTool", (values, handleChange, isSubmitting) => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Row"], {
        className: "item title text-left"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('CommunicationTool')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Group, {
        className: "row item no-border-bg"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Label, {
        column: true,
        md: "3",
        htmlFor: "phoneCountryCode"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('Phone1')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
        md: "9"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Control, {
        type: "text",
        size: "sm",
        className: "shadow-none textbox code-country",
        onChange: handleChange,
        name: "phoneCountryCode",
        value: values.phoneCountryCode,
        autoComplete: "off"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Control, {
        type: "text",
        size: "sm",
        className: "shadow-none textbox code-area",
        onChange: handleChange,
        name: "phoneAreaCode",
        value: values.phoneAreaCode,
        autoComplete: "off"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Control, {
        type: "text",
        size: "sm",
        className: "shadow-none textbox phone",
        onChange: handleChange,
        name: "phone",
        value: values.phone,
        autoComplete: "off"
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Group, {
        className: "row item no-border-bg"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Label, {
        column: true,
        md: "3",
        htmlFor: "phoneCountryCode"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('Phone2')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
        md: "9"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Control, {
        type: "text",
        size: "sm",
        className: "shadow-none textbox code-country",
        onChange: handleChange,
        name: "phone2CountryCode",
        value: values.phone2CountryCode,
        autoComplete: "off"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Control, {
        type: "text",
        size: "sm",
        className: "shadow-none textbox code-area",
        onChange: handleChange,
        name: "phone2AreaCode",
        value: values.phone2AreaCode,
        autoComplete: "off"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Control, {
        type: "text",
        size: "sm",
        className: "shadow-none textbox phone",
        onChange: handleChange,
        name: "phone2",
        value: values.phone2,
        autoComplete: "off"
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Group, {
        className: "row item no-border-bg"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Label, {
        column: true,
        md: "3",
        htmlFor: "phoneCountryCode"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('Phone3')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
        md: "9"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Control, {
        type: "text",
        size: "sm",
        className: "shadow-none textbox code-country",
        onChange: handleChange,
        name: "phone3CountryCode",
        value: values.phone3CountryCode,
        autoComplete: "off"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Control, {
        type: "text",
        size: "sm",
        className: "shadow-none textbox code-area",
        onChange: handleChange,
        name: "phone3AreaCode",
        value: values.phone3AreaCode,
        autoComplete: "off"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Control, {
        type: "text",
        size: "sm",
        className: "shadow-none textbox phone",
        onChange: handleChange,
        name: "phone3",
        value: values.phone3,
        autoComplete: "off"
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Group, {
        className: "row item no-border-bg"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Label, {
        column: true,
        md: "3",
        htmlFor: "mobile"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('Mobile')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
        md: "9"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Control, {
        type: "text",
        size: "sm",
        className: "shadow-none textbox code-country",
        onChange: handleChange,
        name: "mobilePhoneCountryCode",
        value: values.mobilePhoneCountryCode,
        autoComplete: "off"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Control, {
        type: "text",
        size: "sm",
        className: "shadow-none textbox code-area",
        onChange: handleChange,
        name: "mobilePhoneAreaCode",
        value: values.mobilePhoneAreaCode,
        autoComplete: "off"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Control, {
        type: "text",
        size: "sm",
        className: "shadow-none textbox phone",
        onChange: handleChange,
        name: "mobilePhone",
        value: values.mobilePhone,
        autoComplete: "off"
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Group, {
        className: "row item no-border-bg"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Label, {
        column: true,
        md: "3",
        htmlFor: "email"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('Email')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
        md: "9"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Control, {
        type: "text",
        size: "sm",
        className: "shadow-none",
        onChange: handleChange,
        name: "email",
        value: values.email,
        autoComplete: "off"
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Group, {
        className: "row item no-border-bg"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Label, {
        column: true,
        md: "3",
        htmlFor: "msn"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('Telegram')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
        md: "9"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Control, {
        type: "text",
        size: "sm",
        className: "shadow-none",
        onChange: handleChange,
        name: "msn",
        value: values.msn,
        autoComplete: "off"
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Group, {
        className: "row item no-border-bg"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Label, {
        column: true,
        md: "3",
        htmlFor: "skype"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('Skype')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
        md: "9"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Control, {
        type: "text",
        size: "sm",
        className: "shadow-none",
        onChange: handleChange,
        name: "skype",
        value: values.skype,
        autoComplete: "off"
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Group, {
        className: "row item no-border-bg"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Label, {
        column: true,
        md: "3",
        htmlFor: "name"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('PIC1')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
        md: "9"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Control, {
        type: "text",
        size: "sm",
        className: "shadow-none textbox pic-name",
        onChange: handleChange,
        name: "pic1Name",
        value: values.pic1Name,
        autoComplete: "off"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Control, {
        type: "text",
        size: "sm",
        className: "shadow-none textbox phone",
        onChange: handleChange,
        name: "pic1",
        value: values.pic1,
        autoComplete: "off"
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Group, {
        className: "row item no-border-bg"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Label, {
        column: true,
        md: "3",
        htmlFor: "name"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('PIC2')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
        md: "9"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Control, {
        type: "text",
        size: "sm",
        className: "shadow-none textbox pic-name",
        onChange: handleChange,
        name: "pic2Name",
        value: values.pic2Name,
        autoComplete: "off"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Control, {
        type: "text",
        size: "sm",
        className: "shadow-none textbox phone",
        onChange: handleChange,
        name: "pic2",
        value: values.pic2,
        autoComplete: "off"
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Group, {
        className: "row item no-border-bg"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Label, {
        column: true,
        md: "3",
        htmlFor: "name"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('PIC3')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
        md: "9"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Control, {
        type: "text",
        size: "sm",
        className: "shadow-none textbox pic-name",
        onChange: handleChange,
        name: "pic3Name",
        value: values.pic3Name,
        autoComplete: "off"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Control, {
        type: "text",
        size: "sm",
        className: "shadow-none textbox phone",
        onChange: handleChange,
        name: "pic3",
        value: values.pic3,
        autoComplete: "off"
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Group, {
        className: "row item no-border-bg"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Label, {
        column: true,
        md: "3",
        htmlFor: "name"
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('PIC4')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
        md: "9"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Control, {
        type: "text",
        size: "sm",
        className: "shadow-none textbox pic-name",
        onChange: handleChange,
        name: "pic4Name",
        value: values.pic4Name,
        autoComplete: "off"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Control, {
        type: "text",
        size: "sm",
        className: "shadow-none textbox phone",
        onChange: handleChange,
        name: "pic4",
        value: values.pic4,
        autoComplete: "off"
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Group, {
        className: "row item no-border-bg"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
        md: "3"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
        md: "9"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Button"], {
        className: "mr-4 mt-1",
        variant: "primary",
        size: "sm",
        type: "submit",
        disabled: isSubmitting
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('Update')))));
    });

    _defineProperty(this, "renderDetail", isShowInactiveMsg => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Row"], {
        className: "item title text-left btn-detail",
        onClick: () => this.setState(prevState => ({
          isShowDetail: !prevState.isShowDetail
        }))
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('Detail')), this.state.isShowDetail && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_1__["Form"].Group, {
        className: "row item no-border-bg"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
        className: "list-unstyled list-menu pull-left"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "fa fa-angle-right",
        "aria-hidden": "true"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: _jsroot_common_site__WEBPACK_IMPORTED_MODULE_9__["default"].resolveClientUrl('CustomerInfoDetail')
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('CRMInfo'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "fa fa-angle-right",
        "aria-hidden": "true"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: _jsroot_common_site__WEBPACK_IMPORTED_MODULE_9__["default"].resolveClientUrl('LatestFeedback')
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('LatestFeedback')))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
        className: "list-unstyled list-menu pull-left"
      }, !isShowInactiveMsg && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "fa fa-angle-right",
        "aria-hidden": "true"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: _jsroot_common_site__WEBPACK_IMPORTED_MODULE_9__["default"].resolveClientUrl('AddFeedback')
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('AddFeedback'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
        className: "fa fa-angle-right",
        "aria-hidden": "true"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: _jsroot_common_site__WEBPACK_IMPORTED_MODULE_9__["default"].resolveClientUrl('ManageFeedback')
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('ManageFeedback'))))));
    });

    _defineProperty(this, "handleChangeSite", item => {
      this.setState({
        siteId: item.id
      });
    });

    _defineProperty(this, "handleSubmit", async (values, {
      setSubmitting
    }) => {
      const data = {
        custId: values.custId,
        site: this.state.siteId || values.siteId,
        countryId: values.countryId,
        provinceId: this.props.customerInfo.provinceId,
        firstName: values.firstName,
        lastName: values.lastName,
        language: values.languageId,
        phone: values.phone,
        phoneCountryCode: values.phoneCountryCode,
        phoneAreaCode: values.phoneAreaCode,
        phone2CountryCode: values.phone2CountryCode,
        phone2AreaCode: values.phone2AreaCode,
        phone2: values.phone2,
        phone3CountryCode: values.phone3CountryCode,
        phone3AreaCode: values.phone3AreaCode,
        phone3: values.phone3,
        mobilePhoneCountryCode: values.mobilePhoneCountryCode,
        mobilePhoneAreaCode: values.mobilePhoneAreaCode,
        mobilePhone: values.mobilePhone,
        email: values.email,
        msn: values.msn,
        skype: values.skype,
        pic1Name: values.pic1Name,
        pic1: values.pic1,
        pic2Name: values.pic2Name,
        pic2: values.pic2,
        pic3Name: values.pic3Name,
        pic3: values.pic3,
        pic4Name: values.pic4Name,
        pic4: values.pic4
      };
      setSubmitting(true);
      _jsroot_common_site__WEBPACK_IMPORTED_MODULE_9__["default"].blockUI();
      const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_9__["default"].resolveClientUrl('CustomerInfo/EditCustomerInfo');
      await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_10__["default"].postDataAsync(url, data).then(response => {
        if (response.data.isSuccessful) {
          this.props.handleCloseEditCustomerInfoPopup();
          this.props.getCustomerInfo();
          react_toastify__WEBPACK_IMPORTED_MODULE_11__["toast"].success(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource('UpdateCRMInfoSuccessful'));
        } else {
          react_toastify__WEBPACK_IMPORTED_MODULE_11__["toast"].error(_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_3__["default"].getResource(response.data.message));
          this.props.handleCloseEditCustomerInfoPopup();
          setSubmitting(false);
        }
      }).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_9__["default"].unblockUI());
    });

    _defineProperty(this, "handleSearchUplineInfo", username => {
      const params = _objectSpread(_objectSpread({}, this.props.gridParams), {}, {
        username
      });

      this.props.setUserName(username);
      this.props.setGridParams(params);
      this.props.getCustomerInfo();
    });

    this.state = {
      languages: [],
      siteId: null,
      isShowDetail: true
    };
  }

  componentDidMount() {
    const data = this.props.customerInfo;
    const languages = this.props.settings.languages.map(x => {
      return {
        languageId: x.languageId,
        name: x.name,
        checked: data !== null ? data.languages.some(y => y === x.languageId) : false
      };
    });
    this.setState({
      languages
    });
  }

  render() {
    if (!this.props.customerInfo) {
      return null;
    }

    const customerInfo = this.props.customerInfo;
    const initialValues = {
      custId: customerInfo.custId,
      username: customerInfo.username || '',
      siteId: customerInfo.siteId || 0,
      site: customerInfo.siteSetting || '',
      countryId: customerInfo.countryId || 0,
      firstName: customerInfo.firstName || '',
      lastName: customerInfo.lastName || '',
      nickname: customerInfo.nickname || '',
      languageId: customerInfo.languages.map(x => x).toString(),
      phoneInfo: customerInfo.phoneInfo,
      phoneCountryCode: customerInfo.phoneCountryCode,
      phoneAreaCode: customerInfo.phoneAreaCode,
      phone: customerInfo.phone,
      phone2CountryCode: customerInfo.phone2CountryCode,
      phone2AreaCode: customerInfo.phone2AreaCode,
      phone2: customerInfo.phone2,
      phone3CountryCode: customerInfo.phone3CountryCode,
      phone3AreaCode: customerInfo.phone3AreaCode,
      phone3: customerInfo.phone3,
      mobilePhoneCountryCode: customerInfo.mobilePhoneCountryCode,
      mobilePhoneAreaCode: customerInfo.mobilePhoneAreaCode,
      mobilePhone: customerInfo.mobilePhone,
      email: customerInfo.email,
      telegram: customerInfo.telegram,
      msn: customerInfo.msn,
      skype: customerInfo.skype,
      pic1Name: customerInfo.pic1Name,
      pic1: customerInfo.pic1,
      pic2Name: customerInfo.pic2Name,
      pic2: customerInfo.pic2,
      pic3Name: customerInfo.pic3Name,
      pic3: customerInfo.pic3,
      pic4Name: customerInfo.pic4Name,
      pic4: customerInfo.pic4,
      pics: customerInfo.personalInfoContacts,
      role: customerInfo.role,
      uplineInfo: customerInfo.uplineInfo,
      status: customerInfo.status,
      originalDangerLevel: customerInfo.originalDangerLevel,
      abtDangerLevel: customerInfo.abtDangerLevel,
      otherSportsDangerLevel: customerInfo.otherSportsDangerLevel
    };
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(formik__WEBPACK_IMPORTED_MODULE_2__["Formik"], {
      enableReinitialize: true,
      innerRef: p => this.formik = p,
      initialValues: initialValues,
      validate: values => Object(_common_functions__WEBPACK_IMPORTED_MODULE_4__["validateFormik"])(values),
      onSubmit: this.handleSubmit
    }, this.renderForm);
  }

}

_defineProperty(DataGrid, "defaultProps", {
  customerInfo: null,
  editCustomerInfoResult: {},
  getSettings: {}
});

/***/ }),

/***/ "./www/sources/js/components/layout-container/components/Filter.jsx":
/*!**************************************************************************!*\
  !*** ./www/sources/js/components/layout-container/components/Filter.jsx ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var react_bootstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-bootstrap */ "./node_modules/react-bootstrap/esm/index.js");
/* harmony import */ var _jsroot_components_AutoComplete__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/components/AutoComplete */ "./www/sources/js/components/AutoComplete.jsx");
/* harmony import */ var _jsroot_components_SweetModalDialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @jsroot/components/SweetModalDialog */ "./www/sources/js/components/SweetModalDialog.jsx");
/* harmony import */ var _jsroot_common_site__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/common/site */ "./www/sources/js/common/site.js");
/* harmony import */ var _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/common/constants */ "./www/sources/js/common/constants.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/lib/index.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_toastify__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _BreadcrumbTime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./BreadcrumbTime */ "./www/sources/js/components/layout-container/components/BreadcrumbTime.jsx");
/* harmony import */ var _WithNavigation__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../WithNavigation */ "./www/sources/js/components/WithNavigation.jsx");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }












class Filter extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "handleSubmit", event => {
      event.preventDefault();

      if (this.props.username === '' || this.props.username === null) {
        react_toastify__WEBPACK_IMPORTED_MODULE_7__["toast"].error(`${_jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('PleaseInputUsername')}`);
        return;
      }

      this.props.getDataGrid();
    });

    _defineProperty(this, "renderRightContainer", () => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "right-container"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        sm: "9",
        md: "9",
        id: "divSubMenu"
      }, this.renderSubmenu()), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_BreadcrumbTime__WEBPACK_IMPORTED_MODULE_8__["default"], null));
    });

    _defineProperty(this, "getUrlPath", url => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_5__["default"].resolveClientUrl(url.slice(1)).toLowerCase());

    _defineProperty(this, "renderSubmenu", () => {
      const pathname = window.location.pathname;
      const menus = this.handleConcatMenu(this.props.menus);
      const currentMenu = menus.filter(menu => this.getUrlPath(menu.url) === pathname.toLowerCase())[0];
      const isLefDetailMenu = _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_6__["DetailMenu"].filter(x => this.getUrlPath(x.url) === pathname.toLowerCase()).length > 0;

      if (isLefDetailMenu) {
        return this.renderDetailBreadcrumbsMenu(pathname);
      } else {
        if (!currentMenu) {
          return this.renderBreadcrumbsMenu([], pathname);
        } else if (pathname === '/') {
          return null;
        } else {
          const breadcrumbsMenu = this.getBreadcrumbsMenu(currentMenu, menus);
          return this.renderBreadcrumbsMenu(breadcrumbsMenu, pathname);
        }
      }
    });

    _defineProperty(this, "renderDetailBreadcrumbsMenu", pathname => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
        className: "breadcrumbsMenu sub-menu list-inline list-unstyled"
      }, this.renderIconHome(), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", null, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource(pathname.substring(1)))));
    });

    _defineProperty(this, "getBreadcrumbsMenu", (currentMenu, menus) => {
      let breadcrumbsMenu = [];

      if (currentMenu.parentId > 0) {
        const parentNames = this.recursiveFindParentName(menus, currentMenu.parentId);
        breadcrumbsMenu = [...breadcrumbsMenu, ...parentNames, currentMenu.name];
      } else {
        breadcrumbsMenu = [...breadcrumbsMenu, currentMenu.name];
      }

      return breadcrumbsMenu;
    });

    _defineProperty(this, "renderIconHome", () => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "fa fa-home icon-home fa-lg",
      onClick: this.handleMenuDashboardClick
    })));

    _defineProperty(this, "renderBreadcrumbsMenu", (breadcrumbsMenu, pathname) => {
      const isHome = breadcrumbsMenu.length > 0 && breadcrumbsMenu[0].toLowerCase() === 'home' || _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_6__["SubMainMenu"].filter(x => this.getUrlPath(x.url) === pathname.toLowerCase()).length > 0;
      return isHome ? this.props.customerInfo !== null && this.renderHomeSubMenu(pathname) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
        className: "breadcrumbsMenu sub-menu list-inline list-unstyled"
      }, this.renderIconHome(pathname), breadcrumbsMenu.map((item, key) => {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
          key: key
        }, item);
      }));
    });

    _defineProperty(this, "isActiveTab", (pathname, index) => pathname.toLowerCase() === this.getUrlPath(_jsroot_common_constants__WEBPACK_IMPORTED_MODULE_6__["SubMainMenu"][index].url));

    _defineProperty(this, "renderHomeSubMenu", pathname => {
      return this.props.isHost ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
        className: "breadcrumbsMenu sub-main-menu list-inline list-unstyled"
      }, this.renderIconHome(), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
        id: "li-main",
        className: this.isActiveTab(pathname, 0) ? 'active' : ''
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: _jsroot_common_site__WEBPACK_IMPORTED_MODULE_5__["default"].resolveClientUrl('Dashboard')
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('Main'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
        id: "li-main",
        className: this.isActiveTab(pathname, 1) ? 'active' : ''
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: _jsroot_common_site__WEBPACK_IMPORTED_MODULE_5__["default"].resolveClientUrl('CustomerInfoDetail')
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('Detail'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
        id: "li-communication-log",
        className: this.isActiveTab(pathname, 2) ? 'active' : ''
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: _jsroot_common_site__WEBPACK_IMPORTED_MODULE_5__["default"].resolveClientUrl('CommunicationLog')
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('CommunicationLog'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
        id: "li-special-remark",
        className: this.isActiveTab(pathname, 3) ? 'active' : ''
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: _jsroot_common_site__WEBPACK_IMPORTED_MODULE_5__["default"].resolveClientUrl('Remark')
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('SpecialRemark'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
        id: "li-redemption",
        className: this.isActiveTab(pathname, 4) ? 'active' : ''
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: _jsroot_common_site__WEBPACK_IMPORTED_MODULE_5__["default"].resolveClientUrl('Redemption')
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('Redemption'))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
        id: "li-activity-log",
        className: this.isActiveTab(pathname, 5) ? 'active' : ''
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: _jsroot_common_site__WEBPACK_IMPORTED_MODULE_5__["default"].resolveClientUrl('ActionLog')
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('ActivityLog')))) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
        className: "breadcrumbsMenu sub-main-menu list-inline list-unstyled"
      }, this.renderIconHome(), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
        id: "li-main",
        className: "active"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
        href: _jsroot_common_site__WEBPACK_IMPORTED_MODULE_5__["default"].resolveClientUrl('Dashboard')
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('Main'))));
    });

    _defineProperty(this, "handleMenuDashboardClick", event => {
      event.preventDefault();
      this.props.navigate('/Dashboard', {
        state: {
          id: this.props.customerInfo.custId
        }
      });
    });

    _defineProperty(this, "handleConcatMenu", menus => {
      let menusArr = [];
      menus.forEach(menu => {
        menusArr.push(menu);

        if (Array.isArray(menu.subMenus) && menu.subMenus.length > 0) {
          const subMenus = this.handleConcatMenu(menu.subMenus);
          menusArr = [...menusArr, ...subMenus];
        }
      });
      return menusArr;
    });

    _defineProperty(this, "recursiveFindParentName", (menus, parentId) => {
      let parentNames = [];
      const index = menus.findIndex(menu => menu.id === parentId);
      const menu = menus[index];
      parentNames.push(menu.name);

      if (index >= 0 && menu.parentId > 0) {
        const parent = this.recursiveFindParentName(menus, menu.parentId);
        parentNames = [...parentNames, parent[0]];
      }

      return parentNames;
    });
  }

  render() {
    if (!this.props.menus || this.props.menus.length === 0) {
      return null;
    }

    const {
      username,
      customerSuggestions,
      isGuest,
      handleChange,
      showEmptyCustomerInfoPopup,
      debounceUserNameInputChange,
      handleChangeSuggestion,
      handleCloseEmptyCustomerInfoPopup,
      showEmptyConfirmPopup,
      handleGetCustomerIsGuest,
      handleCloseEmptyConfirm
    } = this.props;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "row-search"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"], {
      id: "left-container",
      onSubmit: this.handleSubmit
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Group, {
      as: react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Row"]
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
      sm: "9",
      md: "9",
      className: "text-search"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_AutoComplete__WEBPACK_IMPORTED_MODULE_3__["default"], {
      value: username,
      options: customerSuggestions,
      placeholder: "Phone or Username or Nickname",
      onChange: value => handleChangeSuggestion(value),
      onInputChange: searchText => debounceUserNameInputChange(searchText)
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      type: "button",
      className: "btn-search",
      onClick: this.handleSubmit
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
      sm: "3",
      md: "3"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Form"].Check, {
      className: "checked-guest",
      type: "checkbox",
      name: "isGuest",
      label: _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('Guest'),
      checked: isGuest,
      onChange: handleChange
    })))), this.renderRightContainer(), showEmptyCustomerInfoPopup && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_SweetModalDialog__WEBPACK_IMPORTED_MODULE_4__["default"], {
      size: "lg",
      title: _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('Confirmation'),
      contents: _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('EmptyData'),
      buttons: [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
        variant: "primary",
        size: "sm",
        onClick: handleCloseEmptyCustomerInfoPopup
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('OK'))],
      onClose: handleCloseEmptyCustomerInfoPopup
    }), showEmptyConfirmPopup && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_SweetModalDialog__WEBPACK_IMPORTED_MODULE_4__["default"], {
      size: "lg",
      title: _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('Confirmation'),
      contents: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('ConfirmCustomerSearchGuest')),
      buttons: [/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
        size: "sm",
        variant: "primary",
        onClick: handleGetCustomerIsGuest
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('OK')), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_bootstrap__WEBPACK_IMPORTED_MODULE_2__["Button"], {
        size: "sm",
        variant: "primary",
        onClick: handleCloseEmptyConfirm
      }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_1__["default"].getResource('Cancel'))],
      onClose: handleCloseEmptyConfirm
    }));
  }

}

const FunctionBarWithNavigation = Object(_WithNavigation__WEBPACK_IMPORTED_MODULE_9__["default"])(Filter);
/* harmony default export */ __webpack_exports__["default"] = (FunctionBarWithNavigation);

/***/ }),

/***/ "./www/sources/js/components/layout-container/components/Header.jsx":
/*!**************************************************************************!*\
  !*** ./www/sources/js/components/layout-container/components/Header.jsx ***!
  \**************************************************************************/
/*! exports provided: Header, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Header", function() { return Header; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/index.js");
/* harmony import */ var _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/common/langHelper */ "./www/sources/js/common/langHelper.js");
/* harmony import */ var _jsroot_common_site__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/common/site */ "./www/sources/js/common/site.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





class Header extends react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "isIgnoreMenu", item => !(item.subMenus.length === 0 && (item.url.includes('n/a') || item.url.length === 0)));

    _defineProperty(this, "handleLogout", () => {
      window.localStorage.clear();
      window.location = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_3__["default"].resolveClientUrl('Auth/SignOut');
    });

    _defineProperty(this, "renderListMenu", (item, index) => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
        key: index + item.id,
        className: "menu-item"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "menu-title"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
        to: item.url !== '' ? _jsroot_common_site__WEBPACK_IMPORTED_MODULE_3__["default"].resolveClientUrl(item.url.slice(1)) : '',
        state: this.props.custId,
        className: "title"
      }, item.name), item.subMenus.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "fa fa-caret-down icon"
      })), item.subMenus.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "menu-sub"
      }, item.subMenus.map((element, key) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        key: key,
        className: "layer-first"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
        to: _jsroot_common_site__WEBPACK_IMPORTED_MODULE_3__["default"].resolveClientUrl(element.url.slice(1)),
        className: "title"
      }, element.name), element.subMenus.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
        className: "fa fa-caret-right icon pr-3 pt-1 float-right"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "layer-second"
      }, element.subMenus.map((ele, num) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Link"], {
        to: _jsroot_common_site__WEBPACK_IMPORTED_MODULE_3__["default"].resolveClientUrl(ele.url.slice(1)),
        className: "layer-first",
        key: num
      }, ele.name))))))));
    });
  }

  render() {
    const {
      menus,
      handleCollapseExpandLayout
    } = this.props;

    if (!menus || menus.length <= 0) {
      return null;
    }

    console.log(_jsroot_common_site__WEBPACK_IMPORTED_MODULE_3__["default"].resolveClientUrl('Auth/SignOut'));
    const currentUsername = document.getElementById('currentUsername').value;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "header"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "left-header"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      src: _jsroot_common_site__WEBPACK_IMPORTED_MODULE_3__["default"].resolveClientUrl('www/dist/css/images/icon/logo-crm.png'),
      onClick: () => window.location = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_3__["default"].resolveClientUrl('Dashboard')
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "icon-bar"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: "fa fa-bars",
      "aria-hidden": "true",
      onClick: handleCollapseExpandLayout
    }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "right-header"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", null, menus.map((item, key) => this.isIgnoreMenu(item) && this.renderListMenu(item, key))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "item-end float-right"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "fa fa-user fa-lg"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "welcome"
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getResource('Welcome'), " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "username"
    }, currentUsername)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
      src: _jsroot_common_site__WEBPACK_IMPORTED_MODULE_3__["default"].resolveClientUrl('css/images/icon/icon-logout.png')
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
      className: "sign-out",
      onClick: () => this.handleLogout()
    }, _jsroot_common_langHelper__WEBPACK_IMPORTED_MODULE_2__["default"].getResource('SignOut')))));
  }

}
/* harmony default export */ __webpack_exports__["default"] = (Header);

/***/ }),

/***/ "./www/sources/js/components/layout-container/components/Layout.jsx":
/*!**************************************************************************!*\
  !*** ./www/sources/js/components/layout-container/components/Layout.jsx ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Filter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Filter */ "./www/sources/js/components/layout-container/components/Filter.jsx");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-toastify */ "./node_modules/react-toastify/lib/index.js");
/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_toastify__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Header__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Header */ "./www/sources/js/components/layout-container/components/Header.jsx");
/* harmony import */ var _DataGrid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./DataGrid */ "./www/sources/js/components/layout-container/components/DataGrid.jsx");
/* harmony import */ var _jsroot_common_site__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @jsroot/common/site */ "./www/sources/js/common/site.js");
/* harmony import */ var _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/common/dataService */ "./www/sources/js/common/dataService.js");
/* harmony import */ var _WithNavigation__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../WithNavigation */ "./www/sources/js/components/WithNavigation.jsx");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }










class Layout extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "getInitInfo", async () => {
      await this.getSetting();
      await this.getSessionData();
    });

    _defineProperty(this, "getAntiForgeryToken", async () => {
      _jsroot_common_site__WEBPACK_IMPORTED_MODULE_5__["default"].blockUI();
      const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_5__["default"].resolveClientUrl('Antiforgery/GenerateAntiForgeryTokens');
      await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_6__["default"].getDataAsync(url).then(response => {
        document.getElementById('xsrfToken').value = response.data.requestToken;
      }).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_5__["default"].unblockUI());
    });

    _defineProperty(this, "getSetting", async () => {
      _jsroot_common_site__WEBPACK_IMPORTED_MODULE_5__["default"].blockUI();
      const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_5__["default"].resolveClientUrl('CustomerInfo/GetSettings');
      await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_6__["default"].getDataAsync(url).then(response => {
        this.setState({
          settings: response.data
        });
      }).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_5__["default"].unblockUI());
    });

    _defineProperty(this, "getSessionData", async () => {
      _jsroot_common_site__WEBPACK_IMPORTED_MODULE_5__["default"].blockUI();
      const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_5__["default"].resolveClientUrl('Home/GetSessionData');
      await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_6__["default"].getDataAsync(url).then(response => {
        if (response || response !== null) {
          const data = response.data;
          this.setDataToElementId(data);
          this.setState(state => ({
            sessionData: _objectSpread(_objectSpread({}, state.sessionData), {}, {
              currentUsername: data.currentUsername,
              currentClientTime: data.currentClientTime,
              clientTimezone: data.clientTimezone,
              serverTimezone: data.clientTimezone,
              hasCreateFeedbackPermission: data.hasCreateFeedbackPermission
            })
          }));
          this.setCurrentCustomer(data.currentCustomer);
          this.initDataMenu(data.menus);
        }
      }).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_5__["default"].unblockUI());
    });

    _defineProperty(this, "setDataToElementId", data => {
      var _data$currentCustomer;

      document.getElementById('currentUsername').value = data.currentUsername;
      document.getElementById('currentCustId').value = (_data$currentCustomer = data.currentCustomer) === null || _data$currentCustomer === void 0 ? void 0 : _data$currentCustomer.custId;
      document.getElementById('currentClientTime').value = data.currentClientTime;
      document.getElementById('clientTimezone').value = data.clientTimezone;
      document.getElementById('serverTimezone').value = data.serverTimezone;
      document.getElementById('hasCreateFeedbackPermission').value = data.hasCreateFeedbackPermission;
    });

    _defineProperty(this, "setCurrentCustomer", currentCustomer => {
      if (currentCustomer !== undefined && currentCustomer !== null) {
        this.setState({
          username: currentCustomer.name,
          isGuest: currentCustomer.isGuest
        }, () => {
          this.getCustomerInfo();
        });
      }
    });

    _defineProperty(this, "initDataMenu", menus => {
      const presentMenus = menus.filter(item => item.parentName === '');
      presentMenus.sort((firstItem, secondItem) => firstItem.displayOrder - secondItem.displayOrder);
      presentMenus.forEach(item => item.subMenus = this.getSubMenus(item, menus));
      presentMenus.forEach(item => item.subMenus.forEach(element => element.subMenus = this.getSubMenus(element, menus)));
      this.setState({
        menus: presentMenus
      });
    });

    _defineProperty(this, "getSubMenus", (menuItem, menus) => {
      const subMenus = menus.filter(item => item.parentName !== '' && item.parentId === menuItem.id);
      subMenus.sort((firstItem, secondItem) => firstItem.displayOrder - secondItem.displayOrder);
      return subMenus;
    });

    _defineProperty(this, "handleChange", event => {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
      this.setState({
        [name]: value
      });
    });

    _defineProperty(this, "handleGetCustomerIsGuest", () => {
      this.setState({
        isGuest: true
      });
      this.handleCloseEmptyConfirm();
      const params = this.getParams();
      this.getDataGrid(params);
    });

    _defineProperty(this, "getParams", () => {
      return {
        username: this.state.username,
        isGuest: this.state.isGuest
      };
    });

    _defineProperty(this, "setGridParams", gridParams => {
      this.setState({
        gridParams
      });
    });

    _defineProperty(this, "setUserName", username => {
      this.setState({
        username
      });
    });

    _defineProperty(this, "handleCloseEmptyConfirm", () => {
      this.setState({
        showEmptyConfirmPopup: false
      });
    });

    _defineProperty(this, "handleCloseEmptyCustomerInfoPopup", () => {
      this.setState({
        showEmptyCustomerInfoPopup: false
      });
    });

    _defineProperty(this, "handleChangeSuggestion", value => {
      this.setState({
        username: value
      });
    });

    _defineProperty(this, "debounceUserNameInputChange", _jsroot_common_site__WEBPACK_IMPORTED_MODULE_5__["default"].debounce(searchText => {
      this.setState({
        username: searchText
      }, async () => {
        if (searchText.length >= 2) {
          const params = this.getParams();
          const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_5__["default"].resolveClientUrl('CustomerInfo/GetCustomerAutoSuggestion');
          await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_6__["default"].postDataAsync(url, params, this.state.antiToken).then(response => {
            this.setState({
              customerSuggestions: response.data
            });
          });
        } else {
          this.setState({
            customerSuggestions: []
          });
        }
      });
    }));

    _defineProperty(this, "handleCloseEditCustomerInfoPopup", () => {
      this.setState({
        editCustomerInfoPopup: {
          show: false
        }
      });
    });

    _defineProperty(this, "getDataGrid", async () => {
      await this.getCustomerInfo();
      await this.getSetting();
    });

    _defineProperty(this, "getCustomerInfo", async () => {
      const params = this.getParams();
      this.setState({
        gridParams: params
      });
      this.handleSetStorage(true);
      _jsroot_common_site__WEBPACK_IMPORTED_MODULE_5__["default"].blockUI();
      const url = _jsroot_common_site__WEBPACK_IMPORTED_MODULE_5__["default"].resolveClientUrl('CustomerInfo/GetCustomerInfo');
      await _jsroot_common_dataService__WEBPACK_IMPORTED_MODULE_6__["default"].postDataAsync(url, params, this.state.antiToken).then(response => {
        if (response.data !== null) {
          document.getElementById('currentCustId').value = response.data.custId;
          this.setState({
            customerInfo: response.data
          }, () => {
            this.props.navigate('/Dashboard', {
              state: response.data.custId
            });
          });
        } else if (response.data === null && !this.state.isGuest) {
          this.setState({
            showEmptyConfirmPopup: true
          });
        } else if (response.data === null) {
          this.setState({
            showEmptyCustomerInfoPopup: true
          });
        }
      }).then(() => _jsroot_common_site__WEBPACK_IMPORTED_MODULE_5__["default"].unblockUI());
    });

    _defineProperty(this, "handleCollapseExpandLayout", event => {
      event.preventDefault();

      if (!this.state.customerInfo) {
        return;
      }

      this.setState(prevState => ({
        isShowingLeftPanel: !prevState.isShowingLeftPanel
      }), () => {
        this.handleSetStorage(this.state.isShowingLeftPanel);
        window.dispatchEvent(new Event('resize'));
      });
    });

    _defineProperty(this, "handleSetStorage", isShowLeft => {
      window.localStorage.setItem('isShowingLeftPanel', isShowLeft);
      window.localStorage.setItem('isKeepLeftPanel', isShowLeft);
    });

    _defineProperty(this, "renderLeftRightContent", customerInfo => {
      const {
        settings,
        gridParams
      } = this.state;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "d-flex"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        id: customerInfo !== null ? 'left-row-container' : 'left-row-hidden'
      }, customerInfo !== null && settings !== null && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DataGrid__WEBPACK_IMPORTED_MODULE_4__["default"], {
        customerInfo: customerInfo,
        settings: settings,
        gridParams: gridParams,
        setGridParams: this.setGridParams,
        setUserName: this.setUserName,
        getCustomerInfo: this.getCustomerInfo,
        handleCloseEditCustomerInfoPopup: this.handleCloseEditCustomerInfoPopup
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        id: "right-row-container",
        style: {
          width: customerInfo !== null ? '78%' : '100%'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        id: "child-app-container"
      }, this.props.children)));
    });

    _defineProperty(this, "renderFullWidthContent", () => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        id: "left-row-container",
        style: {
          width: 0
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        id: "right-row-container",
        style: {
          width: '100%'
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        id: "child-app-container"
      }, this.props.children)));
    });

    this.state = {
      menus: [],
      username: null,
      isGuest: false,
      customerInfo: null,
      settings: null,
      gridParams: {
        username: null,
        isGuest: false
      },
      sessionData: {
        currentUsername: '',
        currentClientTime: new Date(),
        clientTimezone: 0,
        serverTimezone: 0,
        hasCreateFeedbackPermission: false
      },
      showEmptyConfirmPopup: false,
      showEmptyCustomerInfoPopup: false,
      customerSuggestions: [],
      editCustomerInfoPopup: {
        show: false
      },
      isShowingLeftPanel: true
    };
  }

  async componentDidMount() {
    this.getInitInfo();
    const storage = window.localStorage;
    const isShowingLeftPanel = storage.getItem('isShowingLeftPanel');
    const isKeepLeftPanel = storage.getItem('isKeepLeftPanel');

    if (isKeepLeftPanel !== null) {
      this.setState({
        isShowingLeftPanel: JSON.parse(isKeepLeftPanel)
      });
    }

    if (isShowingLeftPanel !== null) {
      storage.removeItem('isShowingLeftPanel');
    }

    this.getAntiForgeryToken();
  }

  render() {
    const {
      customerInfo,
      isGuest,
      customerSuggestions,
      showEmptyConfirmPopup,
      username,
      showEmptyCustomerInfoPopup,
      menus,
      isShowingLeftPanel
    } = this.state;

    if (menus.length <= 0) {
      return null;
    }

    const hasCreateFeedbackPermission = this.state.sessionData.hasCreateFeedbackPermission;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "fix-header-menu"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Header__WEBPACK_IMPORTED_MODULE_3__["default"], {
      menus: menus,
      custId: customerInfo === null || customerInfo === void 0 ? void 0 : customerInfo.custId,
      handleCollapseExpandLayout: this.handleCollapseExpandLayout
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Filter__WEBPACK_IMPORTED_MODULE_1__["default"], {
      isHost: hasCreateFeedbackPermission,
      getDataGrid: this.getDataGrid,
      isGuest: isGuest,
      username: username,
      menus: menus,
      customerInfo: customerInfo,
      customerSuggestions: customerSuggestions,
      handleChange: this.handleChange,
      handleChangeSuggestion: this.handleChangeSuggestion,
      showEmptyCustomerInfoPopup: showEmptyCustomerInfoPopup,
      handleCloseEmptyCustomerInfoPopup: this.handleCloseEmptyCustomerInfoPopup,
      showEmptyConfirmPopup: showEmptyConfirmPopup,
      handleGetCustomerIsGuest: this.handleGetCustomerIsGuest,
      handleCloseEmptyConfirm: this.handleCloseEmptyConfirm,
      debounceUserNameInputChange: this.debounceUserNameInputChange
    })), !showEmptyCustomerInfoPopup && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "row-content"
    }, isShowingLeftPanel && customerInfo !== null ? this.renderLeftRightContent(customerInfo) : this.renderFullWidthContent()), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_toastify__WEBPACK_IMPORTED_MODULE_2__["ToastContainer"], {
      limit: 1,
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      transition: react_toastify__WEBPACK_IMPORTED_MODULE_2__["Slide"],
      closeOnClick: false,
      pauseOnHover: true,
      draggable: false
    }));
  }

}

const FunctionBarWithNavigation = Object(_WithNavigation__WEBPACK_IMPORTED_MODULE_7__["default"])(Layout);
/* harmony default export */ __webpack_exports__["default"] = (FunctionBarWithNavigation);

/***/ }),

/***/ "./www/sources/js/components/layout-container/index.js":
/*!*************************************************************!*\
  !*** ./www/sources/js/components/layout-container/index.js ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Index; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/Layout */ "./www/sources/js/components/layout-container/components/Layout.jsx");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/index.js");
/* harmony import */ var _jsroot_common_site__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jsroot/common/site */ "./www/sources/js/common/site.js");




const NotificationListComponent = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["lazy"])(() => Promise.all(/*! import() */[__webpack_require__.e("vendor"), __webpack_require__.e("common"), __webpack_require__.e(2)]).then(__webpack_require__.bind(null, /*! @jsroot/pages/notification-list/index */ "./www/sources/js/pages/notification-list/index.js")));
const NotificationTemplateComponent = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["lazy"])(() => Promise.all(/*! import() */[__webpack_require__.e("vendor"), __webpack_require__.e("common"), __webpack_require__.e(6)]).then(__webpack_require__.bind(null, /*! @jsroot/pages/notification-template/index */ "./www/sources/js/pages/notification-template/index.js")));
const ChatTypeMappingComponent = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["lazy"])(() => Promise.all(/*! import() */[__webpack_require__.e("vendor"), __webpack_require__.e("common"), __webpack_require__.e(1)]).then(__webpack_require__.bind(null, /*! @jsroot/pages/chat-type-mapping/index */ "./www/sources/js/pages/chat-type-mapping/index.js")));
const NotificationTypeComponent = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["lazy"])(() => Promise.all(/*! import() */[__webpack_require__.e("vendor"), __webpack_require__.e("common"), __webpack_require__.e(7)]).then(__webpack_require__.bind(null, /*! @jsroot/pages/notification-type/index */ "./www/sources/js/pages/notification-type/index.js")));
const ManagementComponent = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["lazy"])(() => Promise.all(/*! import() */[__webpack_require__.e("vendor"), __webpack_require__.e("common"), __webpack_require__.e(9)]).then(__webpack_require__.bind(null, /*! @jsroot/pages/pic-and-headline/management/index */ "./www/sources/js/pages/pic-and-headline/management/index.js")));
const PicAssignmentComponent = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["lazy"])(() => Promise.all(/*! import() */[__webpack_require__.e("vendor"), __webpack_require__.e("common"), __webpack_require__.e(3)]).then(__webpack_require__.bind(null, /*! @jsroot/pages/pic-and-headline/pic-assignment/index */ "./www/sources/js/pages/pic-and-headline/pic-assignment/index.js")));
const ChangesLogManagementComponent = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["lazy"])(() => Promise.all(/*! import() */[__webpack_require__.e("vendor"), __webpack_require__.e("common"), __webpack_require__.e(8)]).then(__webpack_require__.bind(null, /*! @jsroot/pages/pic-and-headline/changes-log/index */ "./www/sources/js/pages/pic-and-headline/changes-log/index.js")));
const CommunicationSettingComponent = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["lazy"])(() => Promise.all(/*! import() */[__webpack_require__.e("vendor"), __webpack_require__.e("common"), __webpack_require__.e(4)]).then(__webpack_require__.bind(null, /*! @jsroot/pages/admin-tool/communication-setting/index */ "./www/sources/js/pages/admin-tool/communication-setting/index.js")));
const FeedbackSubjectComponent = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["lazy"])(() => Promise.all(/*! import() */[__webpack_require__.e("vendor"), __webpack_require__.e("common"), __webpack_require__.e(10)]).then(__webpack_require__.bind(null, /*! @jsroot/pages/admin-tool/feedback-subject/index */ "./www/sources/js/pages/admin-tool/feedback-subject/index.js")));
const SettingLogComponent = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["lazy"])(() => Promise.all(/*! import() */[__webpack_require__.e("vendor"), __webpack_require__.e("common"), __webpack_require__.e(12)]).then(__webpack_require__.bind(null, /*! @jsroot/pages/admin-tool/setting-log/index */ "./www/sources/js/pages/admin-tool/setting-log/index.js")));
const SettingManagementComponent = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["lazy"])(() => Promise.all(/*! import() */[__webpack_require__.e("vendor"), __webpack_require__.e("common"), __webpack_require__.e(5)]).then(__webpack_require__.bind(null, /*! @jsroot/pages/admin-tool/setting-management/index */ "./www/sources/js/pages/admin-tool/setting-management/index.js")));
const SettingRelationComponent = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["lazy"])(() => Promise.all(/*! import() */[__webpack_require__.e("vendor"), __webpack_require__.e("common"), __webpack_require__.e(11)]).then(__webpack_require__.bind(null, /*! @jsroot/pages/admin-tool/setting-relation/index */ "./www/sources/js/pages/admin-tool/setting-relation/index.js")));
const DashboardComponent = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__["lazy"])(() => Promise.all(/*! import() */[__webpack_require__.e("vendor"), __webpack_require__.e("common"), __webpack_require__.e(0)]).then(__webpack_require__.bind(null, /*! @jsroot/pages/dashboard/index */ "./www/sources/js/pages/dashboard/index.js")));
class Index extends react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"] {
  render() {
    const _rootUrl = document.getElementById('RootUrl') ? document.getElementById('RootUrl').value : '/';

    console.log(_rootUrl);
    document.getElementById('RootUrl').value = _rootUrl;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["BrowserRouter"], {
      basename: _rootUrl
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Layout__WEBPACK_IMPORTED_MODULE_1__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["Suspense"], {
      fallback: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, "Loading...")
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Routes"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Route"], {
      path: "/"
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Route"], {
      path: "local2/NotificationList",
      element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(NotificationListComponent, null)
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Route"], {
      path: _jsroot_common_site__WEBPACK_IMPORTED_MODULE_3__["default"].resolveClientUrl("/NotificationTemplate"),
      element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(NotificationTemplateComponent, null)
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Route"], {
      path: _jsroot_common_site__WEBPACK_IMPORTED_MODULE_3__["default"].resolveClientUrl("/ChatTypeMapping"),
      element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ChatTypeMappingComponent, null)
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Route"], {
      path: _jsroot_common_site__WEBPACK_IMPORTED_MODULE_3__["default"].resolveClientUrl("/NotificationType"),
      element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(NotificationTypeComponent, null)
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Route"], {
      path: "/PicManagement",
      element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ManagementComponent, null)
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Route"], {
      path: "/PicOfHeadline",
      element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(PicAssignmentComponent, null)
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Route"], {
      path: "/ChangesLog",
      element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(ChangesLogManagementComponent, null)
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Route"], {
      path: "/CommunicationSetting"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Route"], {
      path: "Index",
      element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(CommunicationSettingComponent, null)
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Route"], {
      path: "/FeedbackSubjectManagement/Index",
      element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(FeedbackSubjectComponent, null)
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Route"], {
      path: "/ActionLog/SettingLog",
      element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(SettingLogComponent, null)
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Route"], {
      path: "/SettingManagement/Index",
      element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(SettingManagementComponent, null)
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Route"], {
      path: "/SettingRelation/Index",
      element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(SettingRelationComponent, null)
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__["Route"], {
      path: "/Dashboard",
      element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(DashboardComponent, null)
    })))));
  }

}

/***/ }),

/***/ "./www/sources/js/components/multiple-select/MultipleSelectLabel.jsx":
/*!***************************************************************************!*\
  !*** ./www/sources/js/components/multiple-select/MultipleSelectLabel.jsx ***!
  \***************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MultipleSelectLabel; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ "./www/sources/js/components/multiple-select/constants.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




class MultipleSelectLabel extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleSelectedItem", selectedItems => {
      const selected = [];
      selectedItems.forEach(item => {
        if (item.subItem.length > 0) {
          item.subItem.forEach(x => {
            if (x.checked) {
              selected.push(x.value);
            }
          });
        } else {
          selected.push(item.value);
        }
      });
      return selected;
    });
  }

  get selectedItemsString() {
    const {
      isAllTextShown,
      selectedItems,
      maxDisplayItemCount,
      textOptions,
      dataSourceSize,
      isNAOption
    } = this.props;
    const selectedValues = this.handleSelectedItem(selectedItems);
    let displayText = textOptions['SelectOptions'];
    const selectedItemCount = selectedValues.length;

    if (isAllTextShown && selectedItemCount === dataSourceSize) {
      displayText = textOptions['Texts'];
    } else if (selectedItemCount > maxDisplayItemCount) {
      displayText = textOptions['SelectedItemCount'].replace('#', selectedItemCount);
    } else if (selectedItemCount >= 1) {
      displayText = selectedValues.join(', ');
    } else if (!dataSourceSize && !isNAOption) {
      displayText = textOptions['NoData'];
    } else if (isNAOption && selectedItemCount === 0) {
      displayText = textOptions['NA'];
    }

    return displayText;
  }

  render() {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      type: "button",
      disabled: this.props.isDisable,
      className: "multiple-select-default multiple-select-label",
      onClick: this.props.onToggle
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: "text-display"
    }, this.selectedItemsString), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("b", {
      className: "caret"
    }));
  }

}

_defineProperty(MultipleSelectLabel, "propTypes", {
  textOptions: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
  selectedItems: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object).isRequired,
  maxDisplayItemCount: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
  isNAOption: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool
});

_defineProperty(MultipleSelectLabel, "defaultProps", {
  maxDisplayItemCount: _constants__WEBPACK_IMPORTED_MODULE_2__["MAX_SELECTED_ITEM_FOR_DISPLAY"],
  isNAOption: false
});

/***/ }),

/***/ "./www/sources/js/components/multiple-select/MultipleSelectOptionList.jsx":
/*!********************************************************************************!*\
  !*** ./www/sources/js/components/multiple-select/MultipleSelectOptionList.jsx ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MultipleSelectOptionList; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Option__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Option */ "./www/sources/js/components/multiple-select/Option.jsx");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




class MultipleSelectOptionList extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "_calculateMinHeightOptionList", maxLengthOfSubData => {
      let minHeight = 0;

      if (maxLengthOfSubData && maxLengthOfSubData > 0 && maxLengthOfSubData < 5) {
        minHeight = maxLengthOfSubData * 40;
      }

      if (maxLengthOfSubData > 5) {
        minHeight = 150;
      }

      return minHeight;
    });
  }

  _renderOptionList() {
    const {
      dataSource,
      onChange,
      onChangeSub,
      id,
      isAllExpand
    } = this.props;

    if (!dataSource || !dataSource.length) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, "No information");
    }

    const optionList = dataSource.map((item, index) => {
      return item.visible && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Option__WEBPACK_IMPORTED_MODULE_2__["default"], {
        id: `${id}-optionItem-${index}`,
        key: `${id}optionItem${index}`,
        itemData: item,
        onChange: onChange,
        onChangeSub: onChangeSub,
        isAllExpand: isAllExpand
      });
    });
    return optionList;
  }

  render() {
    const dataSource = this.props.dataSource;
    const maxLengthOfSubData = dataSource.length > 0 ? Math.max(...dataSource.filter(item => item.subData !== null).map(i => i.subData.length)) : 0;

    const minHeight = this._calculateMinHeightOptionList(maxLengthOfSubData);

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
      className: "multiple-select-options",
      style: {
        minHeight: minHeight
      }
    }, this._renderOptionList());
  }

}

_defineProperty(MultipleSelectOptionList, "propTypes", {
  dataSource: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object).isRequired,
  id: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string]).isRequired,
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  isAllExpand: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool
});

/***/ }),

/***/ "./www/sources/js/components/multiple-select/Option.jsx":
/*!**************************************************************!*\
  !*** ./www/sources/js/components/multiple-select/Option.jsx ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Option; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



class Option extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "onChange", event => {
      event.stopPropagation();
      const {
        itemData,
        onChange
      } = this.props;
      const newItemData = {
        key: itemData.key,
        value: itemData.value,
        checked: !itemData.checked
      };
      onChange && onChange(newItemData);
    });

    _defineProperty(this, "onChangeSubItem", subItem => {
      const {
        itemData,
        onChangeSub
      } = this.props;
      const newSubItem = {
        key: subItem.key,
        value: subItem.value,
        checked: !subItem.checked
      };
      onChangeSub && onChangeSub(itemData, newSubItem);
    });

    _defineProperty(this, "onClickExpandIcon", () => {
      this.setState(prevState => ({
        isExpandedSubData: !prevState.isExpandedSubData
      }));
    });

    _defineProperty(this, "toggleItem", () => {
      this.setState(prevState => ({
        isExpandedSubItem: !prevState.isExpandedSubItem
      }));
    });

    _defineProperty(this, "renderSubData", subDataList => {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
        className: "sub-data"
      }, this.state.isExpandedSubData && subDataList.map((item, key) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
        key: `sub-${key}`
      }, item)));
    });

    _defineProperty(this, "renderSubItem", subItemList => {
      return this.state.isExpandedSubItem && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "sub-select"
      }, subItemList.map((item, key) => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        key: key,
        className: "sub-select-item"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
        id: item.key,
        type: "checkbox",
        className: "option-checkbox",
        checked: item.checked,
        onChange: () => this.onChangeSubItem(item)
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
        className: "sub-select-item-label",
        htmlFor: item.key
      }, item.value))));
    });

    this.state = {
      isExpandedSubData: true,
      isExpandedSubItem: true
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.isAllExpand !== prevProps.isAllExpand) {
      this.setState({
        isExpandedSubItem: this.props.isAllExpand
      });
    }
  }

  render() {
    const {
      itemData,
      id
    } = this.props;
    const isHasSubData = itemData.subData && itemData.subData.length > 0;
    const isHasSubItem = itemData.subItem && itemData.subItem.length > 0;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      className: `${isHasSubItem ? 'toggle-select-item' : ''} multiple-select-item`
    }, isHasSubItem && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: `caret-item fa ${this.state.isExpandedSubItem ? 'fa-caret-down' : 'fa-caret-right'}`,
      onClick: this.toggleItem
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      id: id,
      type: "checkbox",
      className: "option-checkbox",
      checked: itemData.checked,
      onChange: this.onChange
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
      className: "option-label",
      htmlFor: id
    }, itemData.value), isHasSubData && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
      className: `expand-icon fa ${this.state.isExpandedSubData ? 'fa-caret-down' : 'fa-caret-right'}`,
      onClick: this.onClickExpandIcon
    }), isHasSubData && this.renderSubData(itemData.subData)), isHasSubItem && this.renderSubItem(itemData.subItem));
  }

}

_defineProperty(Option, "propTypes", {
  itemData: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object.isRequired,
  id: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string]).isRequired,
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  isAllExpand: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool
});

/***/ }),

/***/ "./www/sources/js/components/multiple-select/OptionAll.jsx":
/*!*****************************************************************!*\
  !*** ./www/sources/js/components/multiple-select/OptionAll.jsx ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return OptionAll; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Option__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Option */ "./www/sources/js/components/multiple-select/Option.jsx");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants */ "./www/sources/js/components/multiple-select/constants.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





class OptionAll extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "changeHandler", ({
      checked
    }) => {
      this.props.onChange && this.props.onChange(checked);
    });

    _defineProperty(this, "toggleAll", () => {
      const {
        onAllToggle
      } = this.props;
      this.setState(prevState => ({
        isAllExpand: !prevState.isAllExpand
      }));

      if (onAllToggle) {
        onAllToggle();
      }
    });

    this.itemData = {
      key: 'All',
      value: this.props.textOptions['Texts']
    };
    this.state = {
      isAllExpand: true
    };
  }

  render() {
    const {
      id,
      checked,
      isAllToggle
    } = this.props;
    this.itemData.checked = checked;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", {
      className: "multiple-select-options multiple-select-option-all"
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Option__WEBPACK_IMPORTED_MODULE_2__["default"], {
      id: `${id}-optionItemAll`,
      itemData: this.itemData,
      onChange: this.changeHandler
    }), isAllToggle && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      className: `icon-toggle-all ${this.state.isAllExpand ? 'expand-all' : 'collapse-all'}`,
      onClick: this.toggleAll
    }));
  }

}

_defineProperty(OptionAll, "propTypes", {
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  id: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.oneOfType([prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number, prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string]).isRequired,
  checked: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  textOptions: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
  isAllToggle: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  onAllToggle: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func
});

_defineProperty(OptionAll, "defaultProps", {
  checked: _constants__WEBPACK_IMPORTED_MODULE_3__["DEFAULT_CHECKED"]
});

/***/ }),

/***/ "./www/sources/js/components/multiple-select/constants.js":
/*!****************************************************************!*\
  !*** ./www/sources/js/components/multiple-select/constants.js ***!
  \****************************************************************/
/*! exports provided: KEY_NAME, VALUE_NAME, STATUS_NAME, MAX_SELECTED_ITEM_FOR_DISPLAY, DEFAULT_CHECKED */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "KEY_NAME", function() { return KEY_NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VALUE_NAME", function() { return VALUE_NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "STATUS_NAME", function() { return STATUS_NAME; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MAX_SELECTED_ITEM_FOR_DISPLAY", function() { return MAX_SELECTED_ITEM_FOR_DISPLAY; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DEFAULT_CHECKED", function() { return DEFAULT_CHECKED; });
const KEY_NAME = 'key';
const VALUE_NAME = 'value';
const STATUS_NAME = 'checked';
const MAX_SELECTED_ITEM_FOR_DISPLAY = 3;
const DEFAULT_CHECKED = false;

/***/ }),

/***/ "./www/sources/js/components/multiple-select/functions.js":
/*!****************************************************************!*\
  !*** ./www/sources/js/components/multiple-select/functions.js ***!
  \****************************************************************/
/*! exports provided: convertDataSourceToState, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "convertDataSourceToState", function() { return convertDataSourceToState; });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./www/sources/js/components/multiple-select/constants.js");

const convertDataSourceToState = ({
  keyField,
  valueField,
  statusField,
  dataSource
}) => {
  return dataSource.map(item => {
    return {
      [_constants__WEBPACK_IMPORTED_MODULE_0__["KEY_NAME"]]: item[keyField],
      [_constants__WEBPACK_IMPORTED_MODULE_0__["VALUE_NAME"]]: item[valueField],
      [_constants__WEBPACK_IMPORTED_MODULE_0__["STATUS_NAME"]]: item[statusField] ? item[statusField] : false,
      subData: item.subData ? item.subData : [],
      subItem: item.subItem ? item.subItem : [],
      visible: true
    };
  });
};
const functions = {
  convertDataSourceToState
};
/* harmony default export */ __webpack_exports__["default"] = (functions);

/***/ }),

/***/ "./www/sources/js/components/multiple-select/index.jsx":
/*!*************************************************************!*\
  !*** ./www/sources/js/components/multiple-select/index.jsx ***!
  \*************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MultipleSelect; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _MultipleSelectLabel__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MultipleSelectLabel */ "./www/sources/js/components/multiple-select/MultipleSelectLabel.jsx");
/* harmony import */ var _MultipleSelectOptionList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./MultipleSelectOptionList */ "./www/sources/js/components/multiple-select/MultipleSelectOptionList.jsx");
/* harmony import */ var _OptionAll__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./OptionAll */ "./www/sources/js/components/multiple-select/OptionAll.jsx");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./constants */ "./www/sources/js/components/multiple-select/constants.js");
/* harmony import */ var _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @jsroot/common/constants */ "./www/sources/js/common/constants.js");
/* harmony import */ var _functions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./functions */ "./www/sources/js/components/multiple-select/functions.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









let id = 1;
class MultipleSelect extends react__WEBPACK_IMPORTED_MODULE_0__["Component"] {
  constructor(props) {
    super(props);

    _defineProperty(this, "onChangeHandler", item => {
      const {
        keyField,
        valueField,
        statusField
      } = this.props;
      const selectedItem = {
        [keyField]: item.key,
        [valueField]: item.value,
        [statusField]: item.checked
      };
      const newDataSource = this.state.dataSource.slice(0);
      const itemToUpdate = newDataSource.find(x => x.key === item.key);
      itemToUpdate.checked = item.checked;

      if (itemToUpdate.subItem.length > 0) {
        itemToUpdate.subItem.map(x => x.checked = item.checked);
      }

      this._callBackToParent(selectedItem);

      this.setState({
        dataSource: newDataSource
      });
    });

    _defineProperty(this, "checkParentItem", item => {
      if (item.subItem.some(x => x.checked === false)) {
        item.checked = false;
      }

      if (item.subItem.every(x => x.checked === true)) {
        item.checked = true;
      }
    });

    _defineProperty(this, "onChangeSubHandler", (parentItem, subItem) => {
      const {
        keyField,
        valueField,
        statusField
      } = this.props;
      const selectedItem = {
        [keyField]: subItem.key,
        [valueField]: subItem.value,
        [statusField]: subItem.checked
      };
      const newDataSource = [...this.state.dataSource];
      const itemToUpdate = newDataSource.find(x => x.key === parentItem.key);
      const subItemToUpdate = itemToUpdate.subItem.find(x => x.key === subItem.key);
      subItemToUpdate.checked = subItem.checked;
      this.checkParentItem(itemToUpdate);

      this._callBackToParent(selectedItem);

      this.setState({
        dataSource: newDataSource
      });
    });

    _defineProperty(this, "onToggle", () => {
      if (!this.props.isDisable) {
        this.setState(prevState => {
          return {
            showOptionList: !prevState.showOptionList
          };
        }, () => {
          if (this.searchInputBox && this.state.showOptionList) {
            this.searchInputBox.focus();
          }
        });
      }
    });

    _defineProperty(this, "checkAllHandler", checked => {
      const dataSource = this.state.dataSource.slice(0);
      dataSource.forEach(item => {
        item.checked = checked;

        if (item.subItem.length > 0) {
          item.subItem.map(x => x.checked = checked);
        }
      });
      this.setState({
        dataSource: dataSource
      }, () => {
        this._callBackToParent(null);
      });
    });

    _defineProperty(this, "onChangeSearchText", value => {
      this.setState(() => {
        const dataSource = this.state.dataSource.slice(0);

        if (value.length > 1) {
          dataSource.forEach(item => item.visible = item[_constants__WEBPACK_IMPORTED_MODULE_5__["VALUE_NAME"]].toLowerCase().indexOf(value.toLowerCase()) !== -1);
        } else {
          dataSource.forEach(item => item.visible = true);
        }

        return {
          searchText: value,
          dataSource: dataSource
        };
      });
    });

    _defineProperty(this, "onClearSearch", e => {
      e.preventDefault();
      this.onChangeSearchText('');
    });

    _defineProperty(this, "onAllToggle", () => {
      this.setState(previousState => ({
        isAllExpand: !previousState.isAllExpand
      }));
    });

    _defineProperty(this, "_close", () => {
      this.setState({
        showOptionList: false
      });
    });

    _defineProperty(this, "_handleDocumentClick", event => {
      const clickOutside = this.wrapper && !this.wrapper.contains(event.target);

      if (clickOutside && this.state.showOptionList) {
        this._close();
      }
    });

    _defineProperty(this, "getLengthDataSource", () => {
      let count = 0;
      this.state.dataSource.forEach(item => {
        if (item.subItem.length > 0) {
          count += item.subItem.length;
        } else {
          count += 1;
        }
      });
      return count;
    });

    this.searchInputBox = null;
    this.state = {
      originalDataSource: null,
      searchText: '',
      showOptionList: false,
      dataSource: [],
      isAllExpand: true
    };

    if (!props.id) {
      id += 1;
    }

    this.id = `multiple-select-${props.id || id}`;
  }

  static getDerivedStateFromProps(props, state) {
    if (props.dataSource !== state.originalDataSource) {
      return {
        originalDataSource: props.dataSource,
        dataSource: _functions__WEBPACK_IMPORTED_MODULE_7__["default"].convertDataSourceToState(props)
      };
    }

    return null;
  }

  componentDidMount() {
    document.addEventListener('click', this._handleDocumentClick);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this._handleDocumentClick);
  }

  get selectedItems() {
    return this.state.dataSource.filter(item => item.subItem.length <= 0 ? item.checked : true);
  }

  _callBackToParent(selectedItem) {
    const selectedItemsKey = this._getSelectedItemKey();

    this.props.onChange && this.props.onChange(selectedItem, selectedItemsKey);
  }

  _getSelectedItemKey() {
    const selectedItemKey = [];
    const dataSource = this.state.dataSource;

    for (let i = 0; i < dataSource.length; i++) {
      const item = dataSource[i];

      if (item.subItem.length > 0) {
        item.subItem.forEach(x => {
          if (x.checked) {
            selectedItemKey.push(x.key);
          }
        });
      } else {
        if (item.checked) {
          selectedItemKey.push(item.key);
        }
      }
    }

    return selectedItemKey.join(',');
  }

  _renderOptionAll() {
    if (this.props.hasAllOption && this.props.dataSource.length > 0) {
      const checkedItemCount = this.state.dataSource.filter(x => x.checked).length;
      const checkedAll = checkedItemCount === this.state.dataSource.length;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_OptionAll__WEBPACK_IMPORTED_MODULE_4__["default"], {
        id: this.id,
        checked: checkedAll,
        textOptions: this.props.textOptions,
        isAllToggle: this.props.isAllToggle,
        onAllToggle: this.onAllToggle,
        onChange: this.checkAllHandler
      });
    }

    return null;
  }

  _renderSearchBox() {
    if (!this.props.hasSearchBox || this.props.dataSource.length === 0) {
      return null;
    }

    const clearButtonStyle = {
      position: 'absolute',
      right: '5px',
      width: '20px',
      height: '20px',
      border: 0,
      margin: '5px',
      backgroundColor: 'transparent',
      cursor: 'pointer'
    };
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      style: {
        width: '100%'
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      autoFocus: true,
      onChange: e => this.onChangeSearchText(e.target.value),
      ref: element => this.searchInputBox = element,
      value: this.state.searchText,
      type: "text",
      placeholder: "Search",
      style: {
        width: '100%',
        border: '1px solid #ccc',
        padding: '5px 10px',
        boxSizing: 'border-box'
      }
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("button", {
      onClick: this.onClearSearch,
      style: clearButtonStyle
    }, "X"));
  }

  render() {
    const {
      maxDisplayItemCount
    } = this.props;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: `multiple-select-container ${this.props.isInvalid ? 'invalid' : ''}`,
      id: this.id,
      ref: element => this.wrapper = element
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_MultipleSelectLabel__WEBPACK_IMPORTED_MODULE_2__["default"], {
      textOptions: this.props.textOptions,
      selectedItems: this.selectedItems,
      dataSourceSize: this.getLengthDataSource(),
      onToggle: this.onToggle,
      texts: this.props.texts,
      isAllTextShown: this.props.isAllTextShown,
      maxDisplayItemCount: maxDisplayItemCount,
      isDisable: this.props.isDisable,
      isNAOption: this.props.isNAOption
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "multiple-select-default multiple-select-options-container",
      style: {
        display: this.state.showOptionList ? 'block' : 'none'
      }
    }, this._renderSearchBox(), this._renderOptionAll(), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_MultipleSelectOptionList__WEBPACK_IMPORTED_MODULE_3__["default"], {
      id: this.id,
      dataSource: this.state.dataSource,
      onChange: this.onChangeHandler,
      onChangeSub: this.onChangeSubHandler,
      isAllExpand: this.state.isAllExpand
    })));
  }

}

_defineProperty(MultipleSelect, "propTypes", {
  dataSource: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.arrayOf(prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object).isRequired,
  hasAllOption: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  hasSearchBox: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  isAllTextShown: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  keyField: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  textOptions: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
  maxDisplayItemCount: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.number,
  onChange: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.func,
  statusField: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  texts: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.object,
  valueField: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string,
  isDisable: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  isNAOption: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool,
  isAllToggle: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.bool
});

_defineProperty(MultipleSelect, "defaultProps", {
  keyField: _constants__WEBPACK_IMPORTED_MODULE_5__["KEY_NAME"],
  valueField: _constants__WEBPACK_IMPORTED_MODULE_5__["VALUE_NAME"],
  statusField: _constants__WEBPACK_IMPORTED_MODULE_5__["STATUS_NAME"],
  hasAllOption: true,
  hasSearchBox: false,
  isDisable: false,
  textOptions: _jsroot_common_constants__WEBPACK_IMPORTED_MODULE_6__["MULTI_SELECT_TEXT_OPTIONS"],
  isNAOption: false,
  isAllToggle: false
});

/***/ }),

/***/ "./www/sources/js/pages/home/index.js":
/*!********************************************!*\
  !*** ./www/sources/js/pages/home/index.js ***!
  \********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jsroot_components_layout_container_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jsroot/components/layout-container/index */ "./www/sources/js/components/layout-container/index.js");



react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0__["StrictMode"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_jsroot_components_layout_container_index__WEBPACK_IMPORTED_MODULE_2__["default"], null)), document.getElementById('app-container'));

/***/ }),

/***/ 0:
/*!**************************************************!*\
  !*** multi ./www/sources/js/pages/home/index.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./www/sources/js/pages/home/index.js */"./www/sources/js/pages/home/index.js");


/***/ })

/******/ });
//# sourceMappingURL=index.chunk.js.map