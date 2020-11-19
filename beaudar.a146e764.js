// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"deparam.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deparam = deparam;
exports.param = param;

function deparam(query) {
  var match;
  var plus = /\+/g;
  var search = /([^&=]+)=?([^&]*)/g;

  var decode = function decode(s) {
    return decodeURIComponent(s.replace(plus, ' '));
  };

  var params = {};

  while (match = search.exec(query)) {
    params[decode(match[1])] = decode(match[2]);
  }

  return params;
}

function param(obj) {
  var parts = [];

  for (var name in obj) {
    if (obj.hasOwnProperty(name) && obj[name]) {
      parts.push(encodeURIComponent(name) + "=" + encodeURIComponent(obj[name]));
    }
  }

  return parts.join('&');
}
},{}],"repo-regex.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = /^([\w-_]+)\/([\w-_.]+)$/i;
exports.default = _default;
},{}],"beaudar-api.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GISSUES_API = void 0;
var GISSUES_API = 'https://oauth.applinzi.com';
exports.GISSUES_API = GISSUES_API;
},{}],"measure.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.startMeasuring = startMeasuring;
exports.scheduleMeasure = scheduleMeasure;
var hostOrigin;

function startMeasuring(origin) {
  hostOrigin = origin;
  addEventListener('resize', scheduleMeasure);
  addEventListener('load', scheduleMeasure);
}

var lastHeight = -1;

function measure() {
  var height = document.body.scrollHeight;

  if (height === lastHeight) {
    return;
  }

  lastHeight = height;
  var message = {
    type: 'resize',
    height: height
  };
  parent.postMessage(message, hostOrigin);
}

var lastMeasure = 0;

function scheduleMeasure() {
  var now = Date.now();

  if (now - lastMeasure > 50) {
    lastMeasure = now;
    setTimeout(measure, 50);
  }
}
},{}],"new-error-element.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NewErrorElement = void 0;

var _measure = require("./measure");

var NewErrorElement = function () {
  function NewErrorElement() {
    this.beaudarArticle = "\n  <article class=\"timeline-comment\">\n    <a class=\"avatar\" href=\"https://gitee.com/yakeing\" target=\"_blank\">\n      <img height=\"44\" width=\"44\" src=\"https://gitee.com/gissues/Readme/raw/main/logo/logo_50x50.png\">\n    </a>\n    <div class=\"comment\">\n      <header class=\"comment-header\">\n        <span class=\"comment-meta\">\n          <strong class=\"comment-author\">Gissues</strong> \u7CFB\u7EDF\u6D88\u606F\n        </span>\n      </header>\n      <article id=\"beaudarMsg\" class=\"markdown-body\">\n      </article>\n    </div>\n  </article>\n";

    if (document.querySelector('.timeline') === null) {
      this.isTimelineNull = true;
      this.element = document.createElement('main');
      this.element.classList.add('timeline');
      this.element.innerHTML = this.beaudarArticle;
    } else {
      this.isTimelineNull = false;
      this.element = document.querySelector('.timeline');

      if (document.querySelector('#beaudarMsg') === null) {
        this.element.lastElementChild.insertAdjacentHTML('beforebegin', this.beaudarArticle);
      }
    }
  }

  NewErrorElement.prototype.createMsgElement = function (header, body, reload) {
    var beaudarLoading = document.querySelector('.beaudarLoading');
    var reloadButtonStr = '';
    if (beaudarLoading) beaudarLoading.remove();

    if (reload) {
      reloadButtonStr = '<button id="reload-button" type="button" class="btn btn-primary" >刷新</button>';
    }

    this.element.querySelector('#beaudarMsg').insertAdjacentHTML('beforeend', "\n    <h3>" + header + "</h3>\n    " + body + "\n    <p> \u83B7\u53D6\u5E2E\u52A9\uFF1A<a href=\"https://gitee.com/gissues\" target=\"_blank\">\u5173\u4E8E Gissues</a></p>\n    " + reloadButtonStr);

    if (this.isTimelineNull) {
      document.body.appendChild(this.element);
    } else {
      this.element.lastElementChild.remove();
    }

    var reloadButton = this.element.querySelector('#reload-button');

    if (reloadButton) {
      reloadButton.onclick = function () {
        window.location.href = "https://oauth.applinzi.com/Gissues/test.php";
      };
    }

    (0, _measure.scheduleMeasure)();
  };

  return NewErrorElement;
}();

exports.NewErrorElement = NewErrorElement;
},{"./measure":"measure.ts"}],"oauth.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLoginUrl = getLoginUrl;
exports.loadToken = loadToken;
exports.token = void 0;

var _beaudarApi = require("./beaudar-api");

var _deparam = require("./deparam");

var _newErrorElement = require("./new-error-element");

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = void 0 && (void 0).__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

var token = {
  value: null
};
exports.token = token;

function getLoginUrl(state) {
  return _beaudarApi.GISSUES_API + "/Gissues/authorize.php?" + (0, _deparam.param)({
    state: state
  });
}

function loadToken() {
  return __awaiter(this, void 0, Promise, function () {
    var url, response, t;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          if (token.value) {
            return [2, token.value];
          }

          url = _beaudarApi.GISSUES_API + "/Gissues/token.php";
          return [4, fetch(url, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include'
          }).catch(function (err) {
            var errorElement = new _newErrorElement.NewErrorElement();
            errorElement.createMsgElement("token \u8BF7\u6C42\u5931\u8D25", "\u7F51\u7EDC\u65AD\u5F00\u6216\u7F51\u7EDC\u4E0D\u7A33\u5B9A\uFF0C\u68C0\u67E5\u7F51\u7EDC\u8FDE\u63A5\u6B63\u5E38\u540E\uFF0C\u70B9\u51FB\u201C\u5237\u65B0\u201D\u91CD\u8BD5\u3002", true);
            throw new Error("token \u8BF7\u6C42\u5931\u8D25\uFF0C" + err);
          })];

        case 1:
          response = _a.sent();
          if (!response.ok) return [3, 3];
          return [4, response.json()];

        case 2:
          t = _a.sent();
          token.value = t;
          return [2, t];

        case 3:
          return [2, null];
      }
    });
  });
}
},{"./beaudar-api":"beaudar-api.ts","./deparam":"deparam.ts","./new-error-element":"new-error-element.ts"}],"page-attributes.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pageAttributes = void 0;

var _deparam = require("./deparam");

var _repoRegex = _interopRequireDefault(require("./repo-regex"));

var _oauth = require("./oauth");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function readPageAttributes() {
  var params = (0, _deparam.deparam)(location.search.substr(1));
  var issueTerm = null;
  var issueNumber = null;

  if ('issue-term' in params) {
    issueTerm = params['issue-term'];

    if (issueTerm !== undefined) {
      if (issueTerm === '') {
        throw new Error('指定的 issue-term 不能为空');
      }

      if (['title', 'url', 'pathname', 'og:title'].indexOf(issueTerm) !== -1) {
        if (!params[issueTerm]) {
          throw new Error("\u627E\u4E0D\u5230 \"" + issueTerm + "\" \u8FD9\u4E2A issue \u7684\u4FE1\u606F");
        }

        issueTerm = params[issueTerm];
      }
    }
  } else if ('issue-number' in params) {
    issueNumber = params['issue-number'];

    if (issueNumber.slice(0, 6) !== issueNumber) {
      throw new Error("issue-number \u65E0\u6548\uFF0C" + issueNumber + " \u5FC5\u987B\u662F6\u4E2A\u5B57\u7B26\u4E32");
    }
  } else {
    throw new Error('"issue-term" 或 "issue-number" 是必须项');
  }

  if (!('repo' in params)) {
    throw new Error('仓库 "repo" 是必须项');
  }

  if (!('origin' in params)) {
    throw new Error('来源 "origin" 是必须项');
  }

  var matches = _repoRegex.default.exec(params.repo);

  if (matches === null) {
    throw new Error("\u65E0\u6548\u7684\u4ED3\u5E93 repo: \"" + params.repo + "\"");
  }

  if (params.token) {
    _oauth.token.value = params.token;
  }

  return {
    owner: matches[1],
    repo: matches[2],
    branch: params.branch || 'master',
    issueTerm: issueTerm,
    issueNumber: issueNumber,
    origin: params.origin,
    url: params.url,
    title: params.title,
    description: params.description,
    label: params.label,
    author: params.author,
    theme: params.theme || 'github-light',
    loading: params.loading || 'true'
  };
}

var pageAttributes = readPageAttributes();
exports.pageAttributes = pageAttributes;
},{"./deparam":"deparam.ts","./repo-regex":"repo-regex.ts","./oauth":"oauth.ts"}],"encoding.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decodeBase64UTF8 = decodeBase64UTF8;

function decodeBase64UTF8(encoded) {
  encoded = encoded.replace(/\s/g, '');
  return decodeURIComponent(escape(atob(encoded)));
}
},{}],"github.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setRepoContext = setRepoContext;
exports.readRelNext = readRelNext;
exports.loadJsonFile = loadJsonFile;
exports.loadIssueByTerm = loadIssueByTerm;
exports.loadIssueByNumber = loadIssueByNumber;
exports.loadCommentsPage = loadCommentsPage;
exports.loadUser = loadUser;
exports.createIssue = createIssue;
exports.postComment = postComment;
exports.toggleReaction = toggleReaction;
exports.renderMarkdown = renderMarkdown;
exports.reactionTypes = exports.PAGE_SIZE = void 0;

var _oauth = require("./oauth");

var _encoding = require("./encoding");

var _beaudarApi = require("./beaudar-api");

var _newErrorElement = require("./new-error-element");

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = void 0 && (void 0).__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

var GITEE_API = 'https://gitee.com/api/v5/';
var GITEE_ENCODING__JSON = 'application/json';
var GITEE_ENCODING__HTML = 'text/html';
var GITEE_ENCODING__REACTIONS_PREVIEW = 'application/vnd.github.squirrel-girl-preview';
var PAGE_SIZE = 25;
exports.PAGE_SIZE = PAGE_SIZE;
var reactionTypes = ['+1', '-1', 'laugh', 'hooray', 'confused', 'heart', 'rocket', 'eyes'];
exports.reactionTypes = reactionTypes;
var author;
var owner;
var repo;
var label;
var branch;

function setRepoContext(context) {
  author = context.author;
  owner = context.owner;
  repo = context.repo;
  label = context.label;
  branch = context.branch;
}

function githubRequest(relativeUrl, init) {
  init = init || {};
  init.mode = 'cors';
  init.cache = 'no-cache';
  init.referrerPolicy = 'origin';
  var request = new Request(GITEE_API + relativeUrl, init);
  request.headers.set('Accept', GITEE_ENCODING__REACTIONS_PREVIEW);

  if (!/^search\//.test(relativeUrl) && _oauth.token.value !== null) {
    request.headers.set('Authorization', "token " + _oauth.token.value);
  }

  return request;
}

var rateLimit = {
  standard: {
    limit: Number.MAX_VALUE,
    remaining: Number.MAX_VALUE,
    reset: 0
  },
  search: {
    limit: Number.MAX_VALUE,
    remaining: Number.MAX_VALUE,
    reset: 0
  }
};

function processRateLimit(response) {
  var limit = response.headers.get('X-RateLimit-Limit');
  var remaining = response.headers.get('X-RateLimit-Remaining');
  var reset = response.headers.get('X-RateLimit-Reset');
  var isSearch = /\/search\//.test(response.url);
  var rate = isSearch ? rateLimit.search : rateLimit.standard;
  rate.limit = +limit;
  rate.remaining = +remaining;
  rate.reset = +reset;

  if (response.status === 403 && rate.remaining === 0) {
    var resetDate = new Date(0);
    resetDate.setUTCSeconds(rate.reset);
    var mins = Math.round((resetDate.getTime() - new Date().getTime()) / 1000 / 60);
    var apiType = isSearch ? 'search API' : 'non-search APIs';
    console.warn("\u8D85\u51FA\u4E86 " + apiType + " \u7684\u901F\u7387\u9650\u5236 " + apiType + "\uFF0C\u5728 " + mins + " \u5206\u949F\u540E\u91CD\u7F6E");
  }
}

function readRelNext(response) {
  var link = response.headers.get('link');

  if (link === null) {
    return 0;
  }

  var match = /\?page=([2-9][0-9]*)>; rel="next"/.exec(link);

  if (match === null) {
    return 0;
  }

  return +match[1];
}

function githubFetch(request) {
  return fetch(request).then(function (response) {
    if (response.status === 401) {
      _oauth.token.value = null;
    }

    if (response.status === 403) {
      response.json().then(function (data) {
        if (data.message === 'Resource not accessible by integration') {
          window.dispatchEvent(new CustomEvent('not-installed'));
        }
      });
    }

    processRateLimit(response);

    if (request.method === 'GET' && [401, 403].indexOf(response.status) !== -1 && request.headers.has('Authorization')) {
      request.headers.delete('Authorization');
      return githubFetch(request);
    }

    return response;
  });
}

function loadJsonFile(path, html) {
  if (html === void 0) {
    html = false;
  }

  var request = githubRequest("repos/" + owner + "/" + repo + "/contents/" + path + "?ref=" + branch);

  if (html) {
    request.headers.set('accept', GITEE_ENCODING__HTML);
  }

  return githubFetch(request).then(function (response) {
    if (response.status === 404) {
      var errorElement = new _newErrorElement.NewErrorElement();
      errorElement.createMsgElement("\u7F3A\u5C11 \"" + path + "\" \u914D\u7F6E", "<p>\u5728\u5B58\u50A8\u5E93 \"" + owner + "/" + repo + "\" \u4E2D\uFF0C\"" + branch + "\" \u5206\u652F\u4E0B\u627E\u4E0D\u5230 \"" + path + "\"\u3002</p>");
      throw new Error("\u5728\u5B58\u50A8\u5E93 \"" + owner + "/" + repo + "\" \u4E2D\uFF0C\"" + branch + "\" \u5206\u652F\u4E0B\u627E\u4E0D\u5230 \"" + path + "\"");
    }

    if (response === undefined || !response.ok) {
      throw new Error(path + " \u63D0\u53D6\u5931\u8D25");
    }

    return html ? response.text() : response.json();
  }).then(function (file) {
    if (html) {
      return file;
    }

    var content = file.content;
    var decoded = (0, _encoding.decodeBase64UTF8)(content);
    return JSON.parse(decoded);
  });
}

function loadIssueByTerm(term) {
  var request = githubRequest("search/issues?q=" + encodeURIComponent(term) + "&repo=" + owner + "%2F" + repo + "&author=" + author + "&label=" + label + "&sort=updated_at&order=asc");
  return githubFetch(request).then(function (response) {
    if (response === undefined || !response.ok) {
      throw new Error('搜索 Issues 失败。');
    }

    return response.json();
  }).then(function (results) {
    if (results.total_count === 0) {
      return null;
    }

    if (results.total_count > 1) {
      console.warn("\u5339\u914D\u5230\u591A\u4E2A\u95EE\u9898 \"" + q + "\"");
    }

    term = term.toLowerCase();

    for (var _i = 0, _a = results.items; _i < _a.length; _i++) {
      var result = _a[_i];

      if (result.title.toLowerCase().indexOf(term) !== -1) {
        return result;
      }
    }

    console.warn("Issue \u641C\u7D22\u7ED3\u679C\u4E2D\u6CA1\u6709\u4E0E \"" + term + "\" \u6807\u9898\u5339\u914D\u7684\u8BC4\u8BBA\u5F53\u524D\u4F7F\u7528\u7B2C\u4E00\u4E2A\u5339\u914D\u9879");
    return results.items[0];
  });
}

function loadIssueByNumber(issueNumber) {
  var request = githubRequest("repos/" + owner + "/" + repo + "/issues/" + issueNumber);
  return githubFetch(request).then(function (response) {
    if (response === undefined || !response.ok) {
      throw new Error("\u901A\u8FC7 Issue \u7F16\u53F7\u63D0\u53D6\u8BC4\u8BBA\u65F6\u51FA\u9519");
    }

    return response.json();
  });
}

function commentsRequest(issueNumber, page) {
  var url = "repos/" + owner + "/" + repo + "/issues/" + issueNumber + "/comments?page=" + page + "&per_page=" + PAGE_SIZE;
  var request = githubRequest(url);
  var accept = GITEE_ENCODING__JSON + "," + GITEE_ENCODING__REACTIONS_PREVIEW;
  request.headers.set('Accept', accept);
  return request;
}

function loadCommentsPage(issueNumber, page) {
  var request = commentsRequest(issueNumber, page);
  return githubFetch(request).then(function (response) {
    if (response === undefined || !response.ok) {
      throw new Error("\u63D0\u53D6\u8BC4\u8BBA\u65F6\u51FA\u9519\u3002");
    }

    return response.json();
  });
}

function loadUser() {
  if (_oauth.token.value === null) {
    return Promise.resolve(null);
  }

  return githubFetch(githubRequest('user')).then(function (response) {
    if (response.ok) {
      return response.json();
    }

    return null;
  });
}

function createIssue(issueTerm, documentUrl, title, description, label) {
  var url = _beaudarApi.GISSUES_API + "/repos/" + owner + "/" + repo + "/issues" + (label ? "?label=" + encodeURIComponent(label) : '');
  var request = new Request(url, {
    method: 'POST',
    body: JSON.stringify({
      title: issueTerm,
      body: "# " + title + "\n\n" + description + "\n\n[" + documentUrl + "](" + documentUrl + ")"
    })
  });
  request.headers.set('Accept', GITEE_ENCODING__REACTIONS_PREVIEW);
  request.headers.set('Authorization', "token " + _oauth.token.value);
  return fetch(request).then(function (response) {
    if (response === undefined || !response.ok) {
      throw new Error("\u521B\u5EFA\u8BC4\u8BBA issue \u65F6\u51FA\u9519");
    }

    return response.json();
  });
}

function postComment(issueNumber, markdown) {
  var url = "repos/" + owner + "/" + repo + "/issues/" + issueNumber + "/comments";
  var body = JSON.stringify({
    body: markdown
  });
  var request = githubRequest(url, {
    method: 'POST',
    body: body
  });
  var accept = GITEE_ENCODING__JSON + "," + GITEE_ENCODING__REACTIONS_PREVIEW;
  request.headers.set('Accept', accept);
  return githubFetch(request).then(function (response) {
    if (response === undefined || !response.ok) {
      throw new Error("\u53D1\u5E03\u8BC4\u8BBA\u65F6\u51FA\u9519");
    }

    return response.json();
  });
}

function toggleReaction(url, content) {
  return __awaiter(this, void 0, void 0, function () {
    var body, postRequest, response, reaction, _a, deleteRequest;

    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          url = url.replace(GITEE_API, '');
          body = JSON.stringify({
            content: content
          });
          postRequest = githubRequest(url, {
            method: 'POST',
            body: body
          });
          postRequest.headers.set('Accept', GITEE_ENCODING__REACTIONS_PREVIEW);
          return [4, githubFetch(postRequest)];

        case 1:
          response = _b.sent();
          if (!response.ok) return [3, 3];
          return [4, response.json()];

        case 2:
          _a = _b.sent();
          return [3, 4];

        case 3:
          _a = null;
          _b.label = 4;

        case 4:
          reaction = _a;

          if (response.status === 201) {
            return [2, {
              reaction: reaction,
              deleted: false
            }];
          }

          if (response.status !== 200) {
            throw new Error('预期的“ 201 响应已创建”或“ 200 响应已存在”');
          }

          deleteRequest = githubRequest("reactions/" + reaction.id, {
            method: 'DELETE'
          });
          deleteRequest.headers.set('Accept', GITEE_ENCODING__REACTIONS_PREVIEW);
          return [4, githubFetch(deleteRequest)];

        case 5:
          _b.sent();

          return [2, {
            reaction: reaction,
            deleted: true
          }];
      }
    });
  });
}

function renderMarkdown(text) {
  var body = JSON.stringify({
    text: text,
    mode: 'gfm',
    context: owner + "/" + repo
  });
  return githubFetch(githubRequest('markdown', {
    method: 'POST',
    body: body
  })).then(function (response) {
    return response.text();
  });
}
},{"./oauth":"oauth.ts","./encoding":"encoding.ts","./beaudar-api":"beaudar-api.ts","./new-error-element":"new-error-element.ts"}],"time-ago.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timeAgo = timeAgo;
var thresholds = [1000, '秒', 1000 * 60, '分钟', 1000 * 60 * 60, '个小时', 1000 * 60 * 60 * 24, '天', 1000 * 60 * 60 * 24 * 7, '周', 1000 * 60 * 60 * 24 * 27, '个月'];
var formatOptions = {
  month: 'short',
  day: 'numeric',
  year: 'numeric'
};

function timeAgo(current, value) {
  var elapsed = current - value.getTime();

  if (elapsed < 5000) {
    return ' 刚刚';
  }

  var i = 0;

  while (i + 2 < thresholds.length && elapsed * 1.1 > thresholds[i + 2]) {
    i += 2;
  }

  var divisor = thresholds[i];
  var text = thresholds[i + 1];
  var units = Math.round(elapsed / divisor);

  if (units > 3 && i === thresholds.length - 2) {
    return "\u4E8E " + value.toLocaleDateString(undefined, formatOptions);
  }

  return units === 1 ? "\u4E8E 1 " + text + "\u524D" : "\u4E8E " + units + " " + text + "\u524D";
}
},{}],"reactions.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getReactionHtml = getReactionHtml;
exports.enableReactions = enableReactions;
exports.getReactionsMenuHtml = getReactionsMenuHtml;
exports.getSignInToReactMenuHtml = getSignInToReactMenuHtml;
exports.reactionEmoji = exports.reactionNames = void 0;

var _github = require("./github");

var _oauth = require("./oauth");

var _pageAttributes = require("./page-attributes");

var _measure = require("./measure");

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = void 0 && (void 0).__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

var reactionNames = {
  '+1': '赞同',
  '-1': '不赞同',
  'laugh': '笑脸',
  'hooray': '撒花',
  'confused': '疑问',
  'heart': '喜欢',
  'rocket': '火箭',
  'eyes': '瞩目'
};
exports.reactionNames = reactionNames;
var reactionEmoji = {
  '+1': '👍',
  '-1': '👎',
  'laugh': '️😄',
  'hooray': '️🎉',
  'confused': '😓',
  'heart': '❤️',
  'rocket': '🚀',
  'eyes': '👀'
};
exports.reactionEmoji = reactionEmoji;

function getReactionHtml(url, reaction, disabled, count) {
  return "\n  <button\n    reaction\n    type=\"submit\"\n    action=\"javascript:\"\n    formaction=\"" + url + "\"\n    class=\"btn BtnGroup-item btn-outline reaction-button\"\n    value=\"" + reaction + "\"\n    aria-label=\"Toggle " + reactionNames[reaction] + " reaction\"\n    reaction-count=\"" + count + "\"\n    " + (disabled ? 'disabled' : '') + ">\n    " + reactionEmoji[reaction] + "\n  </button>";
}

function enableReactions(authenticated) {
  var _this = this;

  var submitReaction = function submitReaction(event) {
    return __awaiter(_this, void 0, void 0, function () {
      var button, parentMenu, url, id, deleted, selector, elements, delta, _i, elements_1, element;

      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            button = event.target instanceof HTMLElement && event.target.closest('button');

            if (!button) {
              return [2];
            }

            if (!button.hasAttribute('reaction')) {
              return [2];
            }

            event.preventDefault();

            if (!authenticated) {
              return [2];
            }

            button.disabled = true;
            parentMenu = button.closest('details');

            if (parentMenu) {
              parentMenu.open = false;
            }

            url = button.formAction;
            id = button.value;
            return [4, (0, _github.toggleReaction)(url, id)];

          case 1:
            deleted = _a.sent().deleted;
            selector = "button[reaction][formaction=\"" + url + "\"][value=\"" + id + "\"],[reaction-count][reaction-url=\"" + url + "\"]";
            elements = Array.from(document.querySelectorAll(selector));
            delta = deleted ? -1 : 1;

            for (_i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
              element = elements_1[_i];
              element.setAttribute('reaction-count', (parseInt(element.getAttribute('reaction-count'), 10) + delta).toString());
            }

            button.disabled = false;
            (0, _measure.scheduleMeasure)();
            return [2];
        }
      });
    });
  };

  addEventListener('click', submitReaction, true);
}

function getReactionsMenuHtml(url, align) {
  var position = align === 'center' ? 'left: 50%;transform: translateX(-50%)' : 'right:6px';
  var alignmentClass = align === 'center' ? '' : 'Popover-message--top-right';

  var getButtonAndSpan = function getButtonAndSpan(id) {
    return getReactionHtml(url, id, false, 0) + ("<span class=\"reaction-name\" aria-hidden=\"true\">" + reactionNames[id] + "</span>");
  };

  return "\n  <details class=\"details-overlay details-popover reactions-popover\">\n    <summary " + (align === 'center' ? 'tabindex="-1"' : '') + ">" + addReactionSvgs + "</summary>\n    <div class=\"Popover\" style=\"" + position + "\">\n      <form class=\"Popover-message " + alignmentClass + " box-shadow-large\" action=\"javascript:\">\n        <span class=\"reaction-name\">\u9009\u62E9\u4F60\u7684\u8868\u60C5\u7B26\u53F7</span>\n        <div class=\"BtnGroup\">\n          " + _github.reactionTypes.slice(0, 4).map(getButtonAndSpan).join('') + "\n        </div>\n        <div class=\"BtnGroup\">\n          " + _github.reactionTypes.slice(4).map(getButtonAndSpan).join('') + "\n        </div>\n      </form>\n    </div>\n  </details>";
}

function getSignInToReactMenuHtml(align) {
  var position = align === 'center' ? 'left: 50%;transform: translateX(-50%)' : 'right:6px';
  var alignmentClass = align === 'center' ? '' : 'Popover-message--top-right';
  return "\n  <details class=\"details-overlay details-popover reactions-popover\">\n    <summary aria-label=\"Reactions Menu\">" + addReactionSvgs + "</summary>\n    <div class=\"Popover\" style=\"" + position + "\">\n      <div class=\"Popover-message " + alignmentClass + " box-shadow-large\" style=\"padding: 16px\">\n        <span><a href=\"" + (0, _oauth.getLoginUrl)(_pageAttributes.pageAttributes.url) + "\" target=\"_top\">\u767B\u5F55</a> \u540E\u4F60\u53EF\u4EE5\u6DFB\u52A0\u8868\u60C5\u7B26\u53F7</span>\n      </div>\n    </div>\n  </details>";
}

var addReactionSvgs = "<svg class=\"octicon\" style=\"margin-right:3px\" viewBox=\"0 0 7 16\" version=\"1.1\" width=\"7\" height=\"16\" aria-hidden=\"true\"><path fill-rule=\"evenodd\" d=\"M4 4H3v3H0v1h3v3h1V8h3V7H4V4z\"></path></svg><svg class=\"octicon\" viewBox=\"0 0 16 16\" version=\"1.1\" width=\"16\" height=\"16\" aria-hidden=\"true\"><path fill-rule=\"evenodd\" d=\"M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm4.81 12.81a6.72 6.72 0 0 1-2.17 1.45c-.83.36-1.72.53-2.64.53-.92 0-1.81-.17-2.64-.53-.81-.34-1.55-.83-2.17-1.45a6.773 6.773 0 0 1-1.45-2.17A6.59 6.59 0 0 1 1.21 8c0-.92.17-1.81.53-2.64.34-.81.83-1.55 1.45-2.17.62-.62 1.36-1.11 2.17-1.45A6.59 6.59 0 0 1 8 1.21c.92 0 1.81.17 2.64.53.81.34 1.55.83 2.17 1.45.62.62 1.11 1.36 1.45 2.17.36.83.53 1.72.53 2.64 0 .92-.17 1.81-.53 2.64-.34.81-.83 1.55-1.45 2.17zM4 6.8v-.59c0-.66.53-1.19 1.2-1.19h.59c.66 0 1.19.53 1.19 1.19v.59c0 .67-.53 1.2-1.19 1.2H5.2C4.53 8 4 7.47 4 6.8zm5 0v-.59c0-.66.53-1.19 1.2-1.19h.59c.66 0 1.19.53 1.19 1.19v.59c0 .67-.53 1.2-1.19 1.2h-.59C9.53 8 9 7.47 9 6.8zm4 3.2c-.72 1.88-2.91 3-5 3s-4.28-1.13-5-3c-.14-.39.23-1 .66-1h8.59c.41 0 .89.61.75 1z\"></path></svg>";
},{"./github":"github.ts","./oauth":"oauth.ts","./page-attributes":"page-attributes.ts","./measure":"measure.ts"}],"comment-component.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processRenderedMarkdown = processRenderedMarkdown;
exports.CommentComponent = void 0;

var _github = require("./github");

var _timeAgo = require("./time-ago");

var _measure = require("./measure");

var _reactions = require("./reactions");

var avatarArgs = '?v=3&s=88';
var displayAssociations = {
  COLLABORATOR: '合作者',
  CONTRIBUTOR: '贡献者',
  MEMBER: '成员',
  OWNER: '作者',
  FIRST_TIME_CONTRIBUTOR: '初期贡献者',
  FIRST_TIMER: '沙发',
  NONE: ''
};

var CommentComponent = function () {
  function CommentComponent(comment, currentUser, locked) {
    this.comment = comment;
    this.currentUser = currentUser;
    var user = comment.user,
        html_url = comment.html_url,
        created_at = comment.created_at,
        body_html = comment.body_html,
        author_association = comment.author_association,
        reactions = comment.reactions;
    this.element = document.createElement('article');
    this.element.classList.add('timeline-comment');

    if (user.login === currentUser) {
      this.element.classList.add('current-user');
    }

    var association = displayAssociations[author_association];

    var reactionCount = _github.reactionTypes.reduce(function (sum, id) {
      return sum + reactions[id];
    }, 0);

    var headerReactionsMenu = '';
    var footerReactionsMenu = '';

    if (!locked) {
      if (currentUser) {
        headerReactionsMenu = (0, _reactions.getReactionsMenuHtml)(comment.reactions.url, 'right');
        footerReactionsMenu = (0, _reactions.getReactionsMenuHtml)(comment.reactions.url, 'center');
      } else {
        headerReactionsMenu = (0, _reactions.getSignInToReactMenuHtml)('right');
        footerReactionsMenu = (0, _reactions.getSignInToReactMenuHtml)('center');
      }
    }

    this.element.innerHTML = "\n      <a class=\"avatar\" href=\"" + user.html_url + "\" target=\"_blank\">\n        <img alt=\"@" + user.login + "\" height=\"44\" width=\"44\"\n              src=\"" + user.avatar_url + avatarArgs + "\">\n      </a>\n      <div class=\"comment\">\n        <header class=\"comment-header\">\n          <span class=\"comment-meta\">\n            <a class=\"text-link comment-author\" href=\"" + user.html_url + "\" target=\"_blank\"><strong>" + user.login + "</strong></a>\n            \u8BC4\u8BBA<a class=\"text-link\" href=\"" + html_url + "\" target=\"_blank\">" + (0, _timeAgo.timeAgo)(Date.now(), new Date(created_at)) + "</a>\n          </span>\n          <div class=\"comment-actions\">\n            " + (association ? "<span class=\"author-association-badge\">" + association + "</span>" : '') + "\n            " + headerReactionsMenu + "\n          </div>\n        </header>\n        <div class=\"markdown-body markdown-body-scrollable\">\n          " + body_html + "\n        </div>\n        <div class=\"comment-footer\" reaction-count=\"" + reactionCount + "\" reaction-url=\"" + reactions.url + "\">\n          <form class=\"reaction-list BtnGroup\" action=\"javascript:\">\n            " + _github.reactionTypes.map(function (id) {
      return (0, _reactions.getReactionHtml)(reactions.url, id, !currentUser || locked, reactions[id]);
    }).join('') + "\n          </form>\n          " + footerReactionsMenu + "\n        </div>\n      </div>";
    var markdownBody = this.element.querySelector('.markdown-body');
    var emailToggle = markdownBody.querySelector('.email-hidden-toggle a');

    if (emailToggle) {
      var emailReply_1 = markdownBody.querySelector('.email-hidden-reply');

      emailToggle.onclick = function (event) {
        event.preventDefault();
        emailReply_1.classList.toggle('expanded');
      };
    }

    processRenderedMarkdown(markdownBody);
  }

  CommentComponent.prototype.setCurrentUser = function (currentUser) {
    if (this.currentUser === currentUser) {
      return;
    }

    this.currentUser = currentUser;

    if (this.comment.user.login === this.currentUser) {
      this.element.classList.add('current-user');
    } else {
      this.element.classList.remove('current-user');
    }
  };

  return CommentComponent;
}();

exports.CommentComponent = CommentComponent;

function processRenderedMarkdown(markdownBody) {
  Array.from(markdownBody.querySelectorAll(':not(.email-hidden-toggle) > a')).forEach(function (a) {
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
  });
  Array.from(markdownBody.querySelectorAll('img')).forEach(function (img) {
    img.onload = _measure.scheduleMeasure;
    img.title = img.alt;
    img.src = img.getAttribute('data-canonical-src');
    var parent = img.parentElement;

    if (parent.nodeName === 'A') {
      parent.href = img.getAttribute('data-canonical-src');
    }
  });
  Array.from(markdownBody.querySelectorAll('a.commit-tease-sha')).forEach(function (a) {
    return a.href = 'https://gitee.com' + a.pathname;
  });
}
},{"./github":"github.ts","./time-ago":"time-ago.ts","./measure":"measure.ts","./reactions":"reactions.ts"}],"timeline-component.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TimelineComponent = void 0;

var _commentComponent = require("./comment-component");

var _measure = require("./measure");

var TimelineComponent = function () {
  function TimelineComponent(user, issue) {
    this.user = user;
    this.issue = issue;
    this.timeline = [];
    this.count = 0;
    this.element = document.createElement('main');
    this.element.classList.add('timeline');
    this.element.innerHTML = "\n      <h1 class=\"timeline-header\">\n        <a class=\"text-link\" target=\"_blank\"></a>\n      </h1>";
    this.countAnchor = this.element.firstElementChild.firstElementChild;
    this.marker = document.createComment('marker');
    this.element.appendChild(this.marker);
    this.setIssue(this.issue);
    this.renderCount();
  }

  TimelineComponent.prototype.setUser = function (user) {
    this.user = user;
    var login = user ? user.login : null;

    for (var i = 0; i < this.timeline.length; i++) {
      this.timeline[i].setCurrentUser(login);
    }

    (0, _measure.scheduleMeasure)();
  };

  TimelineComponent.prototype.setIssue = function (issue) {
    this.issue = issue;

    if (issue) {
      this.count = issue.comments;
      this.countAnchor.href = issue.html_url;
      this.renderCount();
    } else {
      this.countAnchor.removeAttribute('href');
    }
  };

  TimelineComponent.prototype.insertComment = function (comment, incrementCount) {
    var component = new _commentComponent.CommentComponent(comment, this.user ? this.user.login : null, this.issue.locked);
    var index = this.timeline.findIndex(function (x) {
      return x.comment.id >= comment.id;
    });

    if (index === -1) {
      this.timeline.push(component);
      this.element.insertBefore(component.element, this.marker);
    } else {
      var next = this.timeline[index];
      var remove = next.comment.id === comment.id;
      this.element.insertBefore(component.element, next.element);
      this.timeline.splice(index, remove ? 1 : 0, component);

      if (remove) {
        next.element.remove();
      }
    }

    if (incrementCount) {
      this.count++;
      this.renderCount();
    }

    (0, _measure.scheduleMeasure)();
  };

  TimelineComponent.prototype.insertPageLoader = function (insertAfter, count, callback) {
    var insertAfterElement = this.timeline.find(function (x) {
      return x.comment.id >= insertAfter.id;
    }).element;
    insertAfterElement.insertAdjacentHTML('afterend', "\n      <div class=\"page-loader\">\n        <div class=\"zigzag\"></div>\n        <button type=\"button\" class=\"btn btn-outline btn-large\">\n          " + count + " \u6761\u8BC4\u8BBA\u88AB\u6536\u8D77<br/>\n          <span>\u5C55\u5F00...</span>\n        </button>\n      </div>\n    ");
    var element = insertAfterElement.nextElementSibling;
    var button = element.lastElementChild;
    var statusSpan = button.lastElementChild;
    button.onclick = callback;
    return {
      setBusy: function setBusy() {
        statusSpan.textContent = '加载中...';
        button.disabled = true;
      },
      remove: function remove() {
        button.onclick = null;
        element.remove();
      }
    };
  };

  TimelineComponent.prototype.renderCount = function () {
    this.countAnchor.textContent = "" + (this.count >= 1 ? this.count + " \u6761\u8BC4\u8BBA" : '还没有评论');
  };

  return TimelineComponent;
}();

exports.TimelineComponent = TimelineComponent;
},{"./comment-component":"comment-component.ts","./measure":"measure.ts"}],"repo-config.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRepoConfig = getRepoConfig;

var _github = require("./github");

var _pageAttributes = require("./page-attributes");

var promise;

function getRepoConfig() {
  if (!promise) {
    promise = (0, _github.loadJsonFile)('gissues.json').then(function (data) {
      if (!Array.isArray(data.origins)) {
        data.origins = [];
      }

      return data;
    }, function () {
      return {
        origins: [_pageAttributes.pageAttributes.origin]
      };
    });
  }

  return promise;
}
},{"./github":"github.ts","./page-attributes":"page-attributes.ts"}],"new-comment-component.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NewCommentComponent = void 0;

var _pageAttributes = require("./page-attributes");

var _github = require("./github");

var _measure = require("./measure");

var _commentComponent = require("./comment-component");

var _repoConfig = require("./repo-config");

var _oauth = require("./oauth");

var __assign = void 0 && (void 0).__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = void 0 && (void 0).__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

var anonymousAvatar = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 14 16\" version=\"1.1\"><path fill=\"rgb(179,179,179)\" fill-rule=\"evenodd\" d=\"M8 10.5L9 14H5l1-3.5L5.25 9h3.5L8 10.5zM10 6H4L2 7h10l-2-1zM9 2L7 3 5 2 4 5h6L9 2zm4.03 7.75L10 9l1 2-2 3h3.22c.45 0 .86-.31.97-.75l.56-2.28c.14-.53-.19-1.08-.72-1.22zM4 9l-3.03.75c-.53.14-.86.69-.72 1.22l.56 2.28c.11.44.52.75.97.75H5l-2-3 1-2z\"></path></svg>";
var anonymousAvatarUrl = "data:image/svg+xml;base64," + btoa(anonymousAvatar);
var nothingToPreview = '没有可预览的内容';

var NewCommentComponent = function () {
  function NewCommentComponent(user, submit) {
    var _this = this;

    this.user = user;
    this.submit = submit;
    this.submitting = false;
    this.renderTimeout = 0;

    this.handleInput = function () {
      (0, _repoConfig.getRepoConfig)();
      var text = _this.textarea.value;
      var isWhitespace = /^\s*$/.test(text);
      _this.submitButton.disabled = isWhitespace;

      if (_this.textarea.scrollHeight < 450 && _this.textarea.offsetHeight < _this.textarea.scrollHeight) {
        _this.textarea.style.height = _this.textarea.scrollHeight + "px";
        (0, _measure.scheduleMeasure)();
      }

      clearTimeout(_this.renderTimeout);

      if (isWhitespace) {
        _this.preview.textContent = nothingToPreview;
      } else {
        _this.preview.textContent = '加载预览中...';
        _this.renderTimeout = setTimeout(function () {
          return (0, _github.renderMarkdown)(text).then(function (html) {
            return _this.preview.innerHTML = html;
          }).then(function () {
            return (0, _commentComponent.processRenderedMarkdown)(_this.preview);
          }).then(_measure.scheduleMeasure);
        }, 500);
      }
    };

    this.handleSubmit = function (event) {
      return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              event.preventDefault();

              if (this.submitting) {
                return [2];
              }

              this.submitting = true;
              this.textarea.disabled = true;
              this.submitButton.disabled = true;
              return [4, this.submit(this.textarea.value).catch(function () {
                return 0;
              })];

            case 1:
              _a.sent();

              this.submitting = false;
              this.textarea.disabled = !this.user;
              this.textarea.value = '';
              this.submitButton.disabled = false;
              this.handleClick(__assign(__assign({}, event), {
                target: this.form.querySelector('.tabnav-tab.tab-write')
              }));
              this.preview.textContent = nothingToPreview;
              return [2];
          }
        });
      });
    };

    this.handleClick = function (_a) {
      var target = _a.target;

      if (!(target instanceof HTMLButtonElement) || !target.classList.contains('tabnav-tab')) {
        return;
      }

      if (target.getAttribute('aria-selected') === 'true') {
        return;
      }

      _this.form.querySelector('.tabnav-tab[aria-selected="true"]').setAttribute('aria-selected', 'false');

      target.setAttribute('aria-selected', 'true');
      var isPreview = target.classList.contains('tab-preview');
      _this.textarea.style.display = isPreview ? 'none' : '';
      _this.preview.style.display = isPreview ? '' : 'none';
      (0, _measure.scheduleMeasure)();
    };

    this.handleKeyDown = function (_a) {
      var which = _a.which,
          ctrlKey = _a.ctrlKey;

      if (which === 13 && ctrlKey && !_this.submitButton.disabled) {
        _this.form.dispatchEvent(new CustomEvent('submit'));
      }
    };

    this.element = document.createElement('article');
    this.element.classList.add('timeline-comment');
    this.element.innerHTML = "\n      <a class=\"avatar\" target=\"_blank\">\n        <img height=\"44\" width=\"44\">\n      </a>\n      <form class=\"comment\" accept-charset=\"UTF-8\" action=\"javascript:\">\n        <header class=\"new-comment-header tabnav\">\n          <nav class=\"tabnav-tabs\" role=\"tablist\">\n            <button type=\"button\" class=\"tabnav-tab tab-write\"\n                    role=\"tab\" aria-selected=\"true\">\n              \u7F16\u8F91\n            </button>\n            <button type=\"button\" class=\"tabnav-tab tab-preview\"\n                    role=\"tab\">\n              \u9884\u89C8\n            </button>\n          </nav>\n        </header>\n        <div class=\"comment-body\">\n          <textarea class=\"form-control\" placeholder=\"Leave a comment\" aria-label=\"comment\"></textarea>\n          <div class=\"markdown-body\" style=\"display: none\">\n            " + nothingToPreview + "\n          </div>\n        </div>\n        <footer class=\"new-comment-footer\">\n          <a class=\"text-link markdown-info\" target=\"_blank\"\n             href=\"https://guides.github.com/features/mastering-markdown/\">\n            <svg class=\"octicon v-align-bottom\" viewBox=\"0 0 16 16\" version=\"1.1\"\n              width=\"16\" height=\"16\" aria-hidden=\"true\">\n              <path fill-rule=\"evenodd\" d=\"M14.85 3H1.15C.52 3 0 3.52 0 4.15v7.69C0 12.48.52 13 1.15\n                13h13.69c.64 0 1.15-.52 1.15-1.15v-7.7C16 3.52 15.48 3 14.85 3zM9 11H7V8L5.5 9.92 4\n                8v3H2V5h2l1.5 2L7 5h2v6zm2.99.5L9.5 8H11V5h2v3h1.5l-2.51 3.5z\">\n              </path>\n            </svg>\n            \u652F\u6301 Markdown \u7F16\u8F91\n          </a>\n          <button class=\"btn btn-primary\" type=\"submit\">\u53D1\u8868\u8BC4\u8BBA</button>\n          <a class=\"btn btn-primary\" href=\"" + (0, _oauth.getLoginUrl)(_pageAttributes.pageAttributes.url) + "\" target=\"_top\">\u767B\u5F55</a>\n        </footer>\n      </form>";
    this.avatarAnchor = this.element.firstElementChild;
    this.avatar = this.avatarAnchor.firstElementChild;
    this.form = this.avatarAnchor.nextElementSibling;
    this.textarea = this.form.firstElementChild.nextElementSibling.firstElementChild;
    this.preview = this.form.firstElementChild.nextElementSibling.lastElementChild;
    this.signInAnchor = this.form.lastElementChild.lastElementChild;
    this.submitButton = this.signInAnchor.previousElementSibling;
    this.setUser(user);
    this.submitButton.disabled = true;
    this.textarea.addEventListener('input', this.handleInput);
    this.form.addEventListener('submit', this.handleSubmit);
    this.form.addEventListener('click', this.handleClick);
    this.form.addEventListener('keydown', this.handleKeyDown);
    handleTextAreaResize(this.textarea);
  }

  NewCommentComponent.prototype.setUser = function (user) {
    this.user = user;
    this.submitButton.hidden = !user;
    this.signInAnchor.hidden = !!user;

    if (user) {
      this.avatarAnchor.href = user.html_url;
      this.avatar.alt = '@' + user.login;
      this.avatar.src = user.avatar_url + '?v=3&s=88';
      this.textarea.disabled = false;
      this.textarea.placeholder = '发表评论';
    } else {
      this.avatarAnchor.removeAttribute('href');
      this.avatar.alt = '@anonymous';
      this.avatar.src = anonymousAvatarUrl;
      this.textarea.disabled = true;
      this.textarea.placeholder = '登录后评论';
    }
  };

  NewCommentComponent.prototype.clear = function () {
    this.textarea.value = '';
  };

  return NewCommentComponent;
}();

exports.NewCommentComponent = NewCommentComponent;

function handleTextAreaResize(textarea) {
  var stopTracking = function stopTracking() {
    removeEventListener('mousemove', _measure.scheduleMeasure);
    removeEventListener('mouseup', stopTracking);
  };

  var track = function track() {
    addEventListener('mousemove', _measure.scheduleMeasure);
    addEventListener('mouseup', stopTracking);
  };

  textarea.addEventListener('mousedown', track);
}
},{"./page-attributes":"page-attributes.ts","./github":"github.ts","./measure":"measure.ts","./comment-component":"comment-component.ts","./repo-config":"repo-config.ts","./oauth":"oauth.ts"}],"theme.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadTheme = loadTheme;

function loadTheme(theme, origin) {
  return new Promise(function (resolve) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.setAttribute('crossorigin', 'anonymous');
    link.onload = resolve;
    link.href = "/stylesheets/themes/" + theme + "/gissues.css";
    document.head.appendChild(link);
    addEventListener('message', function (event) {
      sessionStorage.setItem('gissues-theme', event.data.theme);

      if (event.origin === origin && event.data.type === 'set-theme') {
        link.href = "/stylesheets/themes/" + event.data.theme + "/gissues.css";
      }
    });
  });
}
},{}],"beaudar-loading.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.beaudarLoadingStatus = beaudarLoadingStatus;

var _measure = require("./measure");

var _theme = require("./theme");

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = void 0 && (void 0).__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

function beaudarLoadingStatus(page) {
  return __awaiter(this, void 0, Promise, function () {
    var loadingElement, setTheme, IS_IE, ieContainer, beaudarLoading;
    return __generator(this, function (_a) {
      loadingElement = document.createElement('div');
      setTheme = (0, _theme.loadTheme)(page.theme, page.origin), IS_IE = false;

      if (sessionStorage.getItem('gissues-theme')) {
        setTheme = (0, _theme.loadTheme)(sessionStorage.getItem('gissues-theme'), page.origin);
      }

      if (window.navigator.userAgent.indexOf('MSIE') !== -1 || 'ActiveXObject' in window) {
        ieContainer = document.createElement('div');
        IS_IE = true;
        ieContainer.classList.add('ie-container', 'markdown-body');
        ieContainer.innerHTML = "\n    <h3>\u6211\u8EAB\u5904 IE \u7684\u82B1\u6D77\u4E2D......</h3>\n    <p>&emsp;&emsp;\u4ECE\u524D\uFF0C\u6709\u7247\u82B1\u7530\u3002\n    <br/>&emsp;&emsp;\u90A3\u91CC\u5F88\u7A7A\u65F7\uFF0C\u5F88\u5BC2\u9759\u3002\n    <br/>&emsp;&emsp;\u5FAE\u98CE\u5439\u8FC7\u8138\u988A\uFF0C\n    <br/>&emsp;&emsp;\u6709\u4E00\u4E1D\u4E1D\u7518\u751C\u7684\u6C14\u606F\u3002\n    <br/>&emsp;&emsp;\u773A\u671B\u8FDC\u5904\uFF0C\n    <br/>&emsp;&emsp;\u7EF5\u5EF6\u7684\u82B1\u6D77\u4EFF\u4F5B\u5728\u6307\u5F15\u7740\u6211\u4EEC\uFF0C\n    <br/>&emsp;&emsp;\u900F\u8FC7\u5B83\uFF0C\n    <br/>&emsp;&emsp;\u6211\u4EEC\u7406\u89E3\u4E86\u8FD9\u4E94\u5F69\u6591\u6593\u7684\u4E16\u754C\u3002\n    </p>\n    <a href='https://www.google.cn/chrome/' target='_blank'>\n    \u4F53\u9A8C\u65B0\u7248 Chrome \u7684\u66F4\u591A\u529F\u80FD\n    </a>";
        loadingElement.appendChild(ieContainer);
      }

      if (JSON.parse(page.loading)) {
        beaudarLoading = document.createElement('div');
        beaudarLoading.classList.add('beaudarLoading');
        beaudarLoading.innerHTML = "\n      <a href=\"https://gissues.gitee.io\" target=\"_blank\">\n        <img width=\"50px\" height=\"50px\" src=\"https://gitee.com/gissues/Readme/raw/main/logo/logo_50x50.png\" title=\"Gissues\">\n      </a>";
        loadingElement.appendChild(beaudarLoading);
      }

      setTheme.then(function () {
        document.body.appendChild(loadingElement);
        (0, _measure.scheduleMeasure)();
      });
      return [2, {
        loadingElement: loadingElement,
        IS_IE: IS_IE
      }];
    });
  });
}
},{"./measure":"measure.ts","./theme":"theme.ts"}],"beaudar.ts":[function(require,module,exports) {
"use strict";

var _pageAttributes = require("./page-attributes");

var _github = require("./github");

var _timelineComponent = require("./timeline-component");

var _newCommentComponent = require("./new-comment-component");

var _measure = require("./measure");

var _repoConfig = require("./repo-config");

var _oauth = require("./oauth");

var _reactions = require("./reactions");

var _newErrorElement = require("./new-error-element");

var _beaudarLoading = require("./beaudar-loading");

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = void 0 && (void 0).__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

(0, _github.setRepoContext)(_pageAttributes.pageAttributes);

function loadIssue() {
  if (_pageAttributes.pageAttributes.issueNumber !== null) {
    return (0, _github.loadIssueByNumber)(_pageAttributes.pageAttributes.issueNumber);
  }

  return (0, _github.loadIssueByTerm)(_pageAttributes.pageAttributes.issueTerm);
}

function bootstrap() {
  return __awaiter(this, void 0, void 0, function () {
    var loadingParam, issue, user, error_1, errorElement, timeline, submit, newCommentComponent;

    var _a;

    var _this = this;

    return __generator(this, function (_b) {
      switch (_b.label) {
        case 0:
          (0, _measure.startMeasuring)(_pageAttributes.pageAttributes.origin);
          return [4, (0, _beaudarLoading.beaudarLoadingStatus)(_pageAttributes.pageAttributes)];

        case 1:
          loadingParam = _b.sent();

          if (loadingParam.IS_IE) {
            throw new Error("\u672C\u9879\u76EE\u653E\u5F03\u517C\u5BB9 IE\u3002");
          }

          return [4, (0, _oauth.loadToken)()];

        case 2:
          _b.sent();

          _b.label = 3;

        case 3:
          _b.trys.push([3, 5,, 6]);

          return [4, Promise.all([loadIssue(), (0, _github.loadUser)()])];

        case 4:
          _a = _b.sent(), issue = _a[0], user = _a[1];
          return [3, 6];

        case 5:
          error_1 = _b.sent();
          errorElement = new _newErrorElement.NewErrorElement();
          errorElement.createMsgElement("gitee.com \u8BF7\u6C42\u5931\u8D25", "<p>\u53EF\u70B9\u51FB\u201C\u5237\u65B0\u201D\uFF0C\u5C1D\u8BD5\u89E3\u51B3\u6B64\u95EE\u9898\u3002</p>", true);
          throw new Error("gitee.com \u8BF7\u6C42\u5931\u8D25\u3002" + error_1);

        case 6:
          timeline = new _timelineComponent.TimelineComponent(user, issue);
          document.body.appendChild(timeline.element);
          loadingParam.loadingElement.remove();

          if (issue && issue.comments > 0) {
            renderComments(issue, timeline);
          }

          (0, _measure.scheduleMeasure)();

          if (issue && issue.locked) {
            return [2];
          }

          (0, _reactions.enableReactions)(!!user);

          submit = function submit(markdown) {
            return __awaiter(_this, void 0, void 0, function () {
              var origins, origin, owner, repo, label, comment, errorElement;
              return __generator(this, function (_a) {
                switch (_a.label) {
                  case 0:
                    return [4, (0, _repoConfig.getRepoConfig)()];

                  case 1:
                    origins = _a.sent().origins;
                    origin = _pageAttributes.pageAttributes.origin, owner = _pageAttributes.pageAttributes.owner, repo = _pageAttributes.pageAttributes.repo, label = _pageAttributes.pageAttributes.label;
                    if (!(origins.indexOf(origin) !== -1)) return [3, 5];
                    if (!!issue) return [3, 3];
                    return [4, (0, _github.createIssue)(_pageAttributes.pageAttributes.issueTerm, _pageAttributes.pageAttributes.url, _pageAttributes.pageAttributes.title, _pageAttributes.pageAttributes.description || '', _pageAttributes.pageAttributes.label)];

                  case 2:
                    issue = _a.sent();
                    timeline.setIssue(issue);
                    _a.label = 3;

                  case 3:
                    return [4, (0, _github.postComment)(issue.number, markdown)];

                  case 4:
                    comment = _a.sent();
                    timeline.insertComment(comment, true);
                    newCommentComponent.clear();
                    return [3, 6];

                  case 5:
                    errorElement = new _newErrorElement.NewErrorElement();
                    errorElement.createMsgElement("\u9519\u8BEF: <code>" + origin + "</code> \u8BC4\u8BBA\u4E0D\u5141\u8BB8\u53D1\u5E03\u5230\u4ED3\u5E93 <code>" + owner + "/" + repo + "</code>", "\n      <p>&emsp;&emsp;\u8BF7\u786E\u8BA4 <code>" + owner + "/" + repo + "</code> \u662F\u672C\u7AD9\u70B9\u8BC4\u8BBA\u7684\u6B63\u786E\u4ED3\u5E93\u3002\u5982\u679C\u60A8\u62E5\u6709\u6B64\u4ED3\u5E93\uFF0C\n      <a href=\"https://gitee.com/" + owner + "/" + repo + "/edit/" + label + "/gissues.json\" target=\"_blank\">\n        <strong>\u6DFB\u52A0\u6216\u66F4\u65B0 gissues.json</strong>\n      </a>\n      \u6DFB\u52A0 <code>" + origin + "</code> \u5230\u6765\u6E90\u5217\u8868\u3002</p>\n      <p>\u9700\u8981\u914D\u7F6E\uFF1A</p>\n      <pre><code>" + JSON.stringify({
                      origins: [origin]
                    }, null, 2) + "</code></pre>\n      ");
                    throw new Error("\u8BC4\u8BBA\u53D1\u5E03\u88AB\u7981\u6B62\uFF0C<code>" + origin + "</code> \u8BC4\u8BBA\u4E0D\u5141\u8BB8\u53D1\u5E03\u5230\u4ED3\u5E93 <code>" + owner + "/" + repo + "</code>\u3002");

                  case 6:
                    return [2];
                }
              });
            });
          };

          newCommentComponent = new _newCommentComponent.NewCommentComponent(user, submit);
          timeline.element.appendChild(newCommentComponent.element);
          return [2];
      }
    });
  });
}

bootstrap();
addEventListener('not-installed', function handleNotInstalled() {
  removeEventListener('not-installed', handleNotInstalled);
  document.querySelector('.timeline').insertAdjacentHTML('afterbegin', "\n  <div class=\"flash flash-error\">\n    \u9519\u8BEF: Gissues \u6CA1\u6709\u5B89\u88C5\u5728 <code>" + _pageAttributes.pageAttributes.owner + "/" + _pageAttributes.pageAttributes.repo + "</code>\u3002\n    \u5982\u679C\u4F60\u62E5\u6709\u8FD9\u4ED3\u5E93\uFF0C\n    <a href=\"https://gitee.com/oauth/applications/6089\" target=\"_blank\"><strong>\u5B89\u88C5 app</strong></a>\u3002\n  </div>");
  (0, _measure.scheduleMeasure)();
});

function renderComments(issue, timeline) {
  return __awaiter(this, void 0, void 0, function () {
    var renderPage, pageCount, pageLoads, pages, _i, pages_1, page_1, hiddenPageCount, nextHiddenPage, _renderLoader;

    var _this = this;

    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          renderPage = function renderPage(page) {
            for (var _i = 0, page_2 = page; _i < page_2.length; _i++) {
              var comment = page_2[_i];
              timeline.insertComment(comment, false);
            }
          };

          pageCount = Math.ceil(issue.comments / _github.PAGE_SIZE);
          pageLoads = [(0, _github.loadCommentsPage)(issue.number, 1)];

          if (pageCount > 1) {
            pageLoads.push((0, _github.loadCommentsPage)(issue.number, pageCount));
          }

          if (pageCount > 2 && issue.comments % _github.PAGE_SIZE < 3) {
            pageLoads.push((0, _github.loadCommentsPage)(issue.number, pageCount - 1));
          }

          return [4, Promise.all(pageLoads)];

        case 1:
          pages = _a.sent();

          for (_i = 0, pages_1 = pages; _i < pages_1.length; _i++) {
            page_1 = pages_1[_i];
            renderPage(page_1);
          }

          hiddenPageCount = pageCount - pageLoads.length;
          nextHiddenPage = 2;

          _renderLoader = function renderLoader(afterPage) {
            if (hiddenPageCount === 0) {
              return;
            }

            var load = function load() {
              return __awaiter(_this, void 0, void 0, function () {
                var page;
                return __generator(this, function (_a) {
                  switch (_a.label) {
                    case 0:
                      loader.setBusy();
                      return [4, (0, _github.loadCommentsPage)(issue.number, nextHiddenPage)];

                    case 1:
                      page = _a.sent();
                      loader.remove();
                      renderPage(page);
                      hiddenPageCount--;
                      nextHiddenPage++;

                      _renderLoader(page);

                      return [2];
                  }
                });
              });
            };

            var afterComment = afterPage.pop();
            var loader = timeline.insertPageLoader(afterComment, hiddenPageCount * _github.PAGE_SIZE, load);
          };

          _renderLoader(pages[0]);

          return [2];
      }
    });
  });
}
},{"./page-attributes":"page-attributes.ts","./github":"github.ts","./timeline-component":"timeline-component.ts","./new-comment-component":"new-comment-component.ts","./measure":"measure.ts","./repo-config":"repo-config.ts","./oauth":"oauth.ts","./reactions":"reactions.ts","./new-error-element":"new-error-element.ts","./beaudar-loading":"beaudar-loading.ts"}]},{},["beaudar.ts"], null)