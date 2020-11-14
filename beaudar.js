parcelRequire = function(e) {
  var r = "function" == typeof parcelRequire && parcelRequire
   , n = "function" == typeof require && require
   , i = {};
  function u(e, u) {
    if (e in i)
      return i[e];
    var t = "function" == typeof parcelRequire && parcelRequire;
    if (!u && t)
      return t(e, !0);
    if (r)
      return r(e, !0);
    if (n && "string" == typeof e)
      return n(e);
    var o = new Error("Cannot find module '" + e + "'");
    throw o.code = "MODULE_NOT_FOUND",
    o
  }
  return u.register = function(e, r) {
    i[e] = r
  }
  ,
  i = e(u),
  u.modules = i,
  u
}(function(require) {
  var i = {};
  function ba() {
    var r = E(location.search.substr(1))
     , e = null
     , i = null;
    if ("issue-term"in r) {
      if (void 0 !== (e = r["issue-term"])) {
        if ("" === e)
          throw new Error("\u6307\u5B9A\u7684 issue-term \u4E0D\u80FD\u4E3A\u7A7A");
        if (-1 !== ["title", "url", "pathname", "og:title"].indexOf(e)) {
          if (!r[e])
            throw new Error("\u627E\u4E0D\u5230 \"" + e + "\" \u8FD9\u4E2A issue \u7684\u4FE1\u606F");
          e = r[e]
        }
      }
    } else {
      if (!("issue-number"in r))
        throw new Error("\"issue-term\" \u6216 \"issue-number\" \u662F\u5FC5\u987B\u9879");
      if ((i = +r["issue-number"]).toString(10) !== r["issue-number"])
        throw new Error("issue-number \u65E0\u6548\uFF0C" + r["issue-number"])
    }
    if (!("repo"in r))
      throw new Error("\u4ED3\u5E93 \"repo\" \u662F\u5FC5\u987B\u9879");
    if (!("origin"in r))
      throw new Error("\u6765\u6E90 \"origin\" \u662F\u5FC5\u987B\u9879");
    var t = ca.exec(r.repo);
    if (null === t)
      throw new Error("\u65E0\u6548\u7684\u4ED3\u5E93 repo: \"" + r.repo + "\"");
    return r.token && (c.value = r.token),
    {
      owner: t[1],
      repo: t[2],
      branch: r.branch || "main",
      issueTerm: e,
      issueNumber: i,
      origin: r.origin,
      url: r.url,
      title: r.title,
      description: r.description,
      label: r.label,
      theme: r.theme || "GithubLight",
      loading: r.loading || "true"
    }
  }
  var p = {};
  function E(e) {
    for (var r, o = /\+/g, n = /([^&=]+)=?([^&]*)/g, p = function(e) {
      return decodeURIComponent(e.replace(o, " "))
    }, a = {}; r = n.exec(e); )
      a[p(r[1])] = p(r[2]);
    return a
  }
  function F(e) {
    var r = [];
    for (var o in e)
      e.hasOwnProperty(o) && e[o] && r.push(encodeURIComponent(o) + "=" + encodeURIComponent(e[o]));
    return r.join("&")
  }
  p.deparam = E,
  p.param = F;
  var ca = /^([\w-_]+)\/([\w-_.]+)$/i;
  var k = {};
  var s = "https://gissues.gitee.io";
  var da;
  function ea(e) {
    da = e,
    addEventListener("resize", d),
    addEventListener("load", d)
  }
  var fa = -1;
  function ga() {
    var e = document.body.scrollHeight;
    if (e !== fa) {
      fa = e;
      var $ = {
        type: "resize",
        height: e
      };
      parent.postMessage($, da)
    }
  }
  var ha = 0;
  function d() {
    var e = Date.now();
    e - ha > 50 && (ha = e,
    setTimeout(ga, 50))
  }
  var x = function() {
    function e() {
      this.beaudarArticle = "\n <article class=\"timeline-comment\">\n <a class=\"avatar\" href=\"https://gissues.gitee.io\" target=\"_blank\">\n <img height=\"44\" width=\"44\" src=\"logo.png\">\n </a>\n <div class=\"comment\">\n <header class=\"comment-header\">\n  <span class=\"comment-meta\">\n <strong class=\"comment-author\">Beaudar</strong> \u7CFB\u7EDF\u6D88\u606F\n  </span>\n </header>\n <article id=\"beaudarMsg\" class=\"markdown-body\">\n </article>\n </div>\n </article>\n",
      null === document.querySelector(".timeline") ? (this.isTimelineNull = !0,
      this.element = document.createElement("main"),
      this.element.classList.add("timeline"),
      this.element.innerHTML = this.beaudarArticle) : (this.isTimelineNull = !1,
      this.element = document.querySelector(".timeline"),
      null === document.querySelector("#beaudarMsg") && this.element.lastElementChild.insertAdjacentHTML("beforebegin", this.beaudarArticle))
    }
    return e.prototype.createMsgElement = function(e, t, n) {
      var r = document.querySelector(".beaudarLoading")
       , a = "";
      r && r.remove(),
      n && (a = "<button id=\"reload-button\" type=\"button\" class=\"btn btn-primary\" >\u5237\u65B0</button>"),
      this.element.querySelector("#beaudarMsg").insertAdjacentHTML("beforeend", "\n <h3>" + e + "</h3>\n " + t + "\n <p> \u83B7\u53D6\u5E2E\u52A9\uFF1A<a href=\"https://gissues.gitee.io\" target=\"_blank\">\u5173\u4E8E Gissues \u7684 </a></p>\n " + a),
      this.isTimelineNull ? document.body.appendChild(this.element) : this.element.lastElementChild.remove();
      var l = this.element.querySelector("#reload-button");
      l && (l.onclick = function() {
        window.location.reload(!0)
      }
      ),
      d()
    }
    ,
    e
  }();
  var ia = k && k.__awaiter || function(e, r, t, n) {
    return new (t || (t = Promise))(function(o, a) {
      function $(e) {
        try {
          u(n.next(e))
        } catch (r) {
          a(r)
        }
      }
      function i(e) {
        try {
          u(n.throw(e))
        } catch (r) {
          a(r)
        }
      }
      function u(e) {
        var r;
        e.done ? o(e.value) : (r = e.value,
        r instanceof t ? r : new t(function(e) {
          e(r)
        }
        )).then($, i)
      }
      u((n = n.apply(e, r || [])).next())
    }
    )
  }
   , ja = k && k.__generator || function(e, r) {
    var t, n, o, a, $ = {
      label: 0,
      sent: function() {
        if (1 & o[0])
          throw o[1];
        return o[1]
      },
      trys: [],
      ops: []
    };
    return a = {
      next: i(0),
      throw: i(1),
      return: i(2)
    },
    "function" == typeof Symbol && (a[Symbol.iterator] = function() {
      return this
    }
    ),
    a;
    function i(a) {
      return function(i) {
        return function(a) {
          if (t)
            throw new TypeError("Generator is already executing.");
          for (; $; )
            try {
              if (t = 1,
              n && (o = 2 & a[0] ? n.return : a[0] ? n.throw || ((o = n.return) && o.call(n),
              0) : n.next) && !(o = o.call(n, a[1])).done)
                return o;
              switch (n = 0,
              o && (a = [2 & a[0], o.value]),
              a[0]) {
              case 0:
              case 1:
                o = a;
                break;
              case 4:
                return $.label++,
                {
                  value: a[1],
                  done: !1
                };
              case 5:
                $.label++,
                n = a[1],
                a = [0];
                continue;
              case 7:
                a = $.ops.pop(),
                $.trys.pop();
                continue;
              default:
                if (!(o = (o = $.trys).length > 0 && o[o.length - 1]) && (6 === a[0] || 2 === a[0])) {
                  $ = 0;
                  continue
                }
                if (3 === a[0] && (!o || a[1] > o[0] && a[1] < o[3])) {
                  $.label = a[1];
                  break
                }
                if (6 === a[0] && $.label < o[1]) {
                  $.label = o[1],
                  o = a;
                  break
                }
                if (o && $.label < o[2]) {
                  $.label = o[2],
                  $.ops.push(a);
                  break
                }
                o[2] && $.ops.pop(),
                $.trys.pop();
                continue;
              }
              a = r.call(e, $)
            } catch (i) {
              a = [6, i],
              n = 0
            } finally {
              t = o = 0
            }
          if (5 & a[0])
            throw a[1];
          return {
            value: a[0] ? a[1] : void 0,
            done: !0
          }
        }([a, i])
      }
    }
  }
   , c = {
    value: null
  };
  function r(e) {
    return s + "/authorize?" + F({
      redirect_uri: e
    })
  }
  function G() {
    return ia(this, void 0, Promise, function() {
      var e, r, t;
      return ja(this, function(n) {
        switch (n.label) {
        case 0:
          return c.value ? [2, c.value] : (e = s + "/token",
          [4, fetch(e, {
            method: "POST",
            mode: "cors",
            credentials: "include"
          }).catch(function(e) {
            throw new x().createMsgElement("token \u8BF7\u6C42\u5931\u8D25", "\u7F51\u7EDC\u65AD\u5F00\u6216\u7F51\u7EDC\u4E0D\u7A33\u5B9A\uFF0C\u68C0\u67E5\u7F51\u7EDC\u8FDE\u63A5\u6B63\u5E38\u540E\uFF0C\u70B9\u51FB\u201C\u5237\u65B0\u201D\u91CD\u8BD5\u3002", !0),
            new Error("token \u8BF7\u6C42\u5931\u8D25\uFF0C" + e)
          })]);
        case 1:
          return (r = n.sent()).ok ? [4, r.json()] : [3, 3];
        case 2:
          return t = n.sent(),
          c.value = t,
          [2, t];
        case 3:
          return [2, null];
        }
      })
    })
  }
  k.token = c,
  k.getLoginUrl = r,
  k.loadToken = G;
  var b = ba();
  var a = {};
  function ka(e) {
    return e = e.replace(/\s/g, ""),
    decodeURIComponent(escape(atob(e)))
  }
  var la = a && a.__awaiter || function(n, e, r, t) {
    return new (r || (r = Promise))(function($, o) {
      function a(n) {
        try {
          i(t.next(n))
        } catch (e) {
          o(e)
        }
      }
      function s(n) {
        try {
          i(t.throw(n))
        } catch (e) {
          o(e)
        }
      }
      function i(n) {
        var e;
        n.done ? $(n.value) : (e = n.value,
        e instanceof r ? e : new r(function(n) {
          n(e)
        }
        )).then(a, s)
      }
      i((t = t.apply(n, e || [])).next())
    }
    )
  }
   , ma = a && a.__generator || function(n, e) {
    var r, t, $, o, a = {
      label: 0,
      sent: function() {
        if (1 & $[0])
          throw $[1];
        return $[1]
      },
      trys: [],
      ops: []
    };
    return o = {
      next: s(0),
      throw: s(1),
      return: s(2)
    },
    "function" == typeof Symbol && (o[Symbol.iterator] = function() {
      return this
    }
    ),
    o;
    function s(o) {
      return function(s) {
        return function(o) {
          if (r)
            throw new TypeError("Generator is already executing.");
          for (; a; )
            try {
              if (r = 1,
              t && ($ = 2 & o[0] ? t.return : o[0] ? t.throw || (($ = t.return) && $.call(t),
              0) : t.next) && !($ = $.call(t, o[1])).done)
                return $;
              switch (t = 0,
              $ && (o = [2 & o[0], $.value]),
              o[0]) {
              case 0:
              case 1:
                $ = o;
                break;
              case 4:
                return a.label++,
                {
                  value: o[1],
                  done: !1
                };
              case 5:
                a.label++,
                t = o[1],
                o = [0];
                continue;
              case 7:
                o = a.ops.pop(),
                a.trys.pop();
                continue;
              default:
                if (!($ = ($ = a.trys).length > 0 && $[$.length - 1]) && (6 === o[0] || 2 === o[0])) {
                  a = 0;
                  continue
                }
                if (3 === o[0] && (!$ || o[1] > $[0] && o[1] < $[3])) {
                  a.label = o[1];
                  break
                }
                if (6 === o[0] && a.label < $[1]) {
                  a.label = $[1],
                  $ = o;
                  break
                }
                if ($ && a.label < $[2]) {
                  a.label = $[2],
                  a.ops.push(o);
                  break
                }
                $[2] && a.ops.pop(),
                a.trys.pop();
                continue;
              }
              o = e.call(n, a)
            } catch (s) {
              o = [6, s],
              t = 0
            } finally {
              r = $ = 0
            }
          if (5 & o[0])
            throw o[1];
          return {
            value: o[0] ? o[1] : void 0,
            done: !0
          }
        }([o, s])
      }
    }
  }
   , H = "https://gitee.com/api/v5/"
   , I = "application/json"
   , na = "text/html"
   , m = "application/vnd.github.squirrel-girl-preview"
   , q = 25;
  a.PAGE_SIZE = q;
  var g, h, t, v = ["+1", "-1", "laugh", "hooray", "confused", "heart", "rocket", "eyes"];
  function J(n) {
    g = n.owner,
    h = n.repo,
    t = n.branch
  }
  function j(n, e) {
    (e = e || {}).mode = "cors",
    e.cache = "no-cache";
    var r = new Request(H + n,e);
    return r.headers.set("Accept", m),
    /^search\//.test(n) || null === c.value || r.headers.set("Authorization", "token " + c.value),
    r
  }
  a.reactionTypes = v,
  a.setRepoContext = J;
  var K = {
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
  function oa(n) {
    var e = n.headers.get("X-RateLimit-Limit")
     , r = n.headers.get("X-RateLimit-Remaining")
     , t = n.headers.get("X-RateLimit-Reset")
     , $ = /\/search\//.test(n.url)
     , o = $ ? K.search : K.standard;
    if (o.limit = +e,
    o.remaining = +r,
    o.reset = +t,
    403 === n.status && 0 === o.remaining) {
      var a = new Date(0);
      a.setUTCSeconds(o.reset);
      var s = Math.round((a.getTime() - new Date().getTime()) / 1e3 / 60)
       , i = $ ? "search API" : "non-search APIs";
      console.warn("\u8D85\u51FA\u4E86 " + i + " \u7684\u901F\u7387\u9650\u5236 " + i + "\uFF0C\u5728 " + s + " \u5206\u949F\u540E\u91CD\u7F6E")
    }
  }
  function pa(n) {
    var e = n.headers.get("link");
    if (null === e)
      return 0;
    var r = /\?page=([2-9][0-9]*)>; rel="next"/.exec(e);
    return null === r ? 0 : +r[1]
  }
  function f(n) {
    return fetch(n).then(function(e) {
      return 401 === e.status && (c.value = null),
      403 === e.status && e.json().then(function(n) {
        "Resource not accessible by integration" === n.message && window.dispatchEvent(new CustomEvent("not-installed"))
      }),
      oa(e),
      "GET" === n.method && -1 !== [401, 403].indexOf(e.status) && n.headers.has("Authorization") ? (n.headers.delete("Authorization"),
      f(n)) : e
    })
  }
  function L(n, e) {
    void 0 === e && (e = !1);
    var r = j("repos/" + g + "/" + h + "/contents/" + n + "?ref=" + t);
    return e && r.headers.set("accept", na),
    f(r).then(function(r) {
      if (404 === r.status)
        throw new x().createMsgElement("\u7F3A\u5C11 \"" + n + "\" \u914D\u7F6E", "<p>\u5728\u5B58\u50A8\u5E93 \"" + g + "/" + h + "\" \u4E2D\uFF0C\"" + t + "\" \u5206\u652F\u4E0B\u627E\u4E0D\u5230 \"" + n + "\"\u3002</p>"),
        new Error("\u5728\u5B58\u50A8\u5E93 \"" + g + "/" + h + "\" \u4E2D\uFF0C\"" + t + "\" \u5206\u652F\u4E0B\u627E\u4E0D\u5230 \"" + n + "\"");
      if (void 0 === r || !r.ok)
        throw new Error(n + " \u63D0\u53D6\u5931\u8D25");
      return e ? r.text() : r.json()
    }).then(function(n) {
      if (e)
        return n;
      var r = n.content
       , t = ka(r);
      return JSON.parse(t)
    })
  }
  function M(n) {
    var e = "\"" + n +  "/" + h;
    return f(j("search/issues?q=" + encodeURIComponent(e) + "&repo="+ encodeURIComponent(h) +"&author="+ g.split("/")[0] +"&page=1&per_page=1&order=asc")).then(function(n) {
      if (void 0 === n || !n.ok)
        throw new Error("\u641C\u7D22 Issues \u5931\u8D25\u3002");
      return n.json()
    }).then(function(r) {
      if (0 === r.total_count)
        return null;
      r.total_count > 1 && console.warn("\u5339\u914D\u5230\u591A\u4E2A\u95EE\u9898 \"" + e + "\""),
      n = n.toLowerCase();
      for (var t = 0, $ = r.items; t < $.length; t++) {
        var o = $[t];
        if (-1 !== o.title.toLowerCase().indexOf(n))
          return o
      }
      return console.warn("Issue \u641C\u7D22\u7ED3\u679C\u4E2D\u6CA1\u6709\u4E0E \"" + n + "\" \u6807\u9898\u5339\u914D\u7684\u8BC4\u8BBA\u5F53\u524D\u4F7F\u7528\u7B2C\u4E00\u4E2A\u5339\u914D\u9879"),
      r.items[0]
    })
  }
  function N(n) {
    return f(j("repos/" + g + "/" + h + "/issues/" + n)).then(function(n) {
      if (void 0 === n || !n.ok)
        throw new Error("\u901A\u8FC7 Issue \u7F16\u53F7\u63D0\u53D6\u8BC4\u8BBA\u65F6\u51FA\u9519");
      return n.json()
    })
  }
  function qa(n, e) {
    var r = j("repos/" + g + "/" + h + "/issues/" + n + "/comments?page=" + e + "&per_page=" + q)
     , t = I + "," + m;
    return r.headers.set("Accept", t),
    r
  }
  function w(n, e) {
    return f(qa(n, e)).then(function(n) {
      if (void 0 === n || !n.ok)
        throw new Error("\u63D0\u53D6\u8BC4\u8BBA\u65F6\u51FA\u9519\u3002");
      return n.json()
    })
  }
  function O() {
    return null === c.value ? Promise.resolve(null) : f(j("user")).then(function(n) {
      return n.ok ? n.json() : null
    })
  }
  function P(n, e, r, t, $) {
    var o = s + "/repos/" + g + "/" + h + "/issues" + ($ ? "?label=" + encodeURIComponent($) : "")
     , a = new Request(o,{
      method: "POST",
      body: JSON.stringify({
        title: n,
        body: "# " + r + "\n\n" + t + "\n\n[" + e + "](" + e + ")"
      })
    });
    return a.headers.set("Accept", m),
    a.headers.set("Authorization", "token " + c.value),
    fetch(a).then(function(n) {
      if (void 0 === n || !n.ok)
        throw new Error("\u521B\u5EFA\u8BC4\u8BBA issue \u65F6\u51FA\u9519");
      return n.json()
    })
  }
  function Q(n, e) {
    var r = j("repos/" + g + "/" + h + "/issues/" + n + "/comments", {
      method: "POST",
      body: JSON.stringify({
        body: e
      })
    })
     , t = I + "," + m;
    return r.headers.set("Accept", t),
    f(r).then(function(n) {
      if (void 0 === n || !n.ok)
        throw new Error("\u53D1\u5E03\u8BC4\u8BBA\u65F6\u51FA\u9519");
      return n.json()
    })
  }
  function R(n, e) {
    return la(this, void 0, void 0, function() {
      var r, t, $, o, a, s;
      return ma(this, function(i) {
        switch (i.label) {
        case 0:
          return n = n.replace(H, ""),
          r = JSON.stringify({
            content: e
          }),
          (t = j(n, {
            method: "POST",
            body: r
          })).headers.set("Accept", m),
          [4, f(t)];
        case 1:
          return ($ = i.sent()).ok ? [4, $.json()] : [3, 3];
        case 2:
          return a = i.sent(),
          [3, 4];
        case 3:
          a = null,
          i.label = 4;
        case 4:
          if (o = a,
          201 === $.status)
            return [2, {
              reaction: o,
              deleted: !1
            }];
          if (200 !== $.status)
            throw new Error("\u9884\u671F\u7684\u201C 201 \u54CD\u5E94\u5DF2\u521B\u5EFA\u201D\u6216\u201C 200 \u54CD\u5E94\u5DF2\u5B58\u5728\u201D");
          return (s = j("reactions/" + o.id, {
            method: "DELETE"
          })).headers.set("Accept", m),
          [4, f(s)];
        case 5:
          return i.sent(),
          [2, {
            reaction: o,
            deleted: !0
          }];
        }
      })
    })
  }
  function S(n) {
    return f(j("markdown", {
      method: "POST",
      body: JSON.stringify({
        text: n,
        mode: "gfm",
        context: g + "/" + h
      })
    })).then(function(n) {
      return n.text()
    })
  }
  a.readRelNext = pa,
  a.loadJsonFile = L,
  a.loadIssueByTerm = M,
  a.loadIssueByNumber = N,
  a.loadCommentsPage = w,
  a.loadUser = O,
  a.createIssue = P,
  a.postComment = Q,
  a.toggleReaction = R,
  a.renderMarkdown = S;
  var n = [1e3, "\u79D2", 6e4, "\u5206\u949F", 36e5, "\u4E2A\u5C0F\u65F6", 864e5, "\u5929", 6048e5, "\u5468", 23328e5, "\u4E2A\u6708"]
   , ra = {
    month: "short",
    day: "numeric",
    year: "numeric"
  };
  function sa(r, $) {
    var e = r - $.getTime();
    if (e < 5e3)
      return " \u521A\u521A";
    for (var t = 0; t + 2 < n.length && 1.1 * e > n[t + 2]; )
      t += 2;
    var o = n[t]
     , a = n[t + 1]
     , h = Math.round(e / o);
    return h > 3 && t === n.length - 2 ? "\u4E8E " + $.toLocaleDateString(void 0, ra) : 1 === h ? "\u4E8E 1 " + a + "\u524D" : "\u4E8E " + h + " " + a + "\u524D"
  }
  var e = {};
  var ta = e && e.__awaiter || function(e, t, n, r) {
    return new (n || (n = Promise))(function(a, o) {
      function i(e) {
        try {
          c(r.next(e))
        } catch (t) {
          o(t)
        }
      }
      function s(e) {
        try {
          c(r.throw(e))
        } catch (t) {
          o(t)
        }
      }
      function c(e) {
        var t;
        e.done ? a(e.value) : (t = e.value,
        t instanceof n ? t : new n(function(e) {
          e(t)
        }
        )).then(i, s)
      }
      c((r = r.apply(e, t || [])).next())
    }
    )
  }
   , ua = e && e.__generator || function(e, t) {
    var n, r, a, o, i = {
      label: 0,
      sent: function() {
        if (1 & a[0])
          throw a[1];
        return a[1]
      },
      trys: [],
      ops: []
    };
    return o = {
      next: s(0),
      throw: s(1),
      return: s(2)
    },
    "function" == typeof Symbol && (o[Symbol.iterator] = function() {
      return this
    }
    ),
    o;
    function s(o) {
      return function(s) {
        return function(o) {
          if (n)
            throw new TypeError("Generator is already executing.");
          for (; i; )
            try {
              if (n = 1,
              r && (a = 2 & o[0] ? r.return : o[0] ? r.throw || ((a = r.return) && a.call(r),
              0) : r.next) && !(a = a.call(r, o[1])).done)
                return a;
              switch (r = 0,
              a && (o = [2 & o[0], a.value]),
              o[0]) {
              case 0:
              case 1:
                a = o;
                break;
              case 4:
                return i.label++,
                {
                  value: o[1],
                  done: !1
                };
              case 5:
                i.label++,
                r = o[1],
                o = [0];
                continue;
              case 7:
                o = i.ops.pop(),
                i.trys.pop();
                continue;
              default:
                if (!(a = (a = i.trys).length > 0 && a[a.length - 1]) && (6 === o[0] || 2 === o[0])) {
                  i = 0;
                  continue
                }
                if (3 === o[0] && (!a || o[1] > a[0] && o[1] < a[3])) {
                  i.label = o[1];
                  break
                }
                if (6 === o[0] && i.label < a[1]) {
                  i.label = a[1],
                  a = o;
                  break
                }
                if (a && i.label < a[2]) {
                  i.label = a[2],
                  i.ops.push(o);
                  break
                }
                a[2] && i.ops.pop(),
                i.trys.pop();
                continue;
              }
              o = t.call(e, i)
            } catch (s) {
              o = [6, s],
              r = 0
            } finally {
              n = a = 0
            }
          if (5 & o[0])
            throw o[1];
          return {
            value: o[0] ? o[1] : void 0,
            done: !0
          }
        }([o, s])
      }
    }
  }
   , u = {
    "+1": "\u8D5E\u540C",
    "-1": "\u4E0D\u8D5E\u540C",
    laugh: "\u7B11\u8138",
    hooray: "\u6492\u82B1",
    confused: "\u7591\u95EE",
    heart: "\u559C\u6B22",
    rocket: "\u706B\u7BAD",
    eyes: "\u77A9\u76EE"
  };
  e.reactionNames = u;
  var T = {
    "+1": "\uD83D\uDC4D",
    "-1": "\uD83D\uDC4E",
    laugh: "\uFE0F\uD83D\uDE04",
    hooray: "\uFE0F\uD83C\uDF89",
    confused: "\uD83D\uDE13",
    heart: "\u2764\uFE0F",
    rocket: "\uD83D\uDE80",
    eyes: "\uD83D\uDC40"
  };
  function A(e, t, n, r) {
    return "\n <button\n reaction\n type=\"submit\"\n action=\"javascript:\"\n formaction=\"" + e + "\"\n class=\"btn BtnGroup-item btn-outline reaction-button\"\n value=\"" + t + "\"\n aria-label=\"Toggle " + u[t] + " reaction\"\n reaction-count=\"" + r + "\"\n " + (n ? "disabled" : "") + ">\n " + T[t] + "\n </button>"
  }
  function U(e) {
    var t = this;
    addEventListener("click", function(n) {
      return ta(t, void 0, void 0, function() {
        var t, r, a, o, i, s, c, f, l, $, u;
        return ua(this, function(p) {
          switch (p.label) {
          case 0:
            return (t = n.target instanceof HTMLElement && n.target.closest("button")) && t.hasAttribute("reaction") ? (n.preventDefault(),
            e ? (t.disabled = !0,
            (r = t.closest("details")) && (r.open = !1),
            a = t.formAction,
            o = t.value,
            [4, R(a, o)]) : [2]) : [2];
          case 1:
            for (i = p.sent().deleted,
            s = "button[reaction][formaction=\"" + a + "\"][value=\"" + o + "\"],[reaction-count][reaction-url=\"" + a + "\"]",
            c = Array.from(document.querySelectorAll(s)),
            f = i ? -1 : 1,
            l = 0,
            $ = c; l < $.length; l++)
              (u = $[l]).setAttribute("reaction-count", (parseInt(u.getAttribute("reaction-count"), 10) + f).toString());
            return t.disabled = !1,
            d(),
            [2];
          }
        })
      })
    }, !0)
  }
  function B(e, t) {
    var n = function(t) {
      return A(e, t, !1, 0) + "<span class=\"reaction-name\" aria-hidden=\"true\">" + u[t] + "</span>"
    };
    return "\n <details class=\"details-overlay details-popover reactions-popover\">\n <summary " + ("center" === t ? "tabindex=\"-1\"" : "") + ">" + V + "</summary>\n <div class=\"Popover\" style=\"" + ("center" === t ? "left: 50%;transform: translateX(-50%)" : "right:6px") + "\">\n <form class=\"Popover-message " + ("center" === t ? "" : "Popover-message--top-right") + " box-shadow-large\" action=\"javascript:\">\n  <span class=\"reaction-name\">\u9009\u62E9\u4F60\u7684\u8868\u60C5\u7B26\u53F7</span>\n  <div class=\"BtnGroup\">\n " + v.slice(0, 4).map(n).join("") + "\n  </div>\n  <div class=\"BtnGroup\">\n " + v.slice(4).map(n).join("") + "\n  </div>\n </form>\n </div>\n </details>"
  }
  function C(e) {
    return "\n <details class=\"details-overlay details-popover reactions-popover\">\n <summary aria-label=\"Reactions Menu\">" + V + "</summary>\n <div class=\"Popover\" style=\"" + ("center" === e ? "left: 50%;transform: translateX(-50%)" : "right:6px") + "\">\n <div class=\"Popover-message " + ("center" === e ? "" : "Popover-message--top-right") + " box-shadow-large\" style=\"padding: 16px\">\n  <span><a href=\"" + r(b.url) + "\" target=\"_top\">\u767B\u5F55</a> \u540E\u4F60\u53EF\u4EE5\u6DFB\u52A0\u8868\u60C5\u7B26\u53F7</span>\n </div>\n </div>\n </details>"
  }
  e.reactionEmoji = T,
  e.getReactionHtml = A,
  e.enableReactions = U,
  e.getReactionsMenuHtml = B,
  e.getSignInToReactMenuHtml = C;
  var V = "<svg class=\"octicon\" style=\"margin-right:3px\" viewBox=\"0 0 7 16\" version=\"1.1\" width=\"7\" height=\"16\" aria-hidden=\"true\"><path fill-rule=\"evenodd\" d=\"M4 4H3v3H0v1h3v3h1V8h3V7H4V4z\"></path></svg><svg class=\"octicon\" viewBox=\"0 0 16 16\" version=\"1.1\" width=\"16\" height=\"16\" aria-hidden=\"true\"><path fill-rule=\"evenodd\" d=\"M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm4.81 12.81a6.72 6.72 0 0 1-2.17 1.45c-.83.36-1.72.53-2.64.53-.92 0-1.81-.17-2.64-.53-.81-.34-1.55-.83-2.17-1.45a6.773 6.773 0 0 1-1.45-2.17A6.59 6.59 0 0 1 1.21 8c0-.92.17-1.81.53-2.64.34-.81.83-1.55 1.45-2.17.62-.62 1.36-1.11 2.17-1.45A6.59 6.59 0 0 1 8 1.21c.92 0 1.81.17 2.64.53.81.34 1.55.83 2.17 1.45.62.62 1.11 1.36 1.45 2.17.36.83.53 1.72.53 2.64 0 .92-.17 1.81-.53 2.64-.34.81-.83 1.55-1.45 2.17zM4 6.8v-.59c0-.66.53-1.19 1.2-1.19h.59c.66 0 1.19.53 1.19 1.19v.59c0 .67-.53 1.2-1.19 1.2H5.2C4.53 8 4 7.47 4 6.8zm5 0v-.59c0-.66.53-1.19 1.2-1.19h.59c.66 0 1.19.53 1.19 1.19v.59c0 .67-.53 1.2-1.19 1.2h-.59C9.53 8 9 7.47 9 6.8zm4 3.2c-.72 1.88-2.91 3-5 3s-4.28-1.13-5-3c-.14-.39.23-1 .66-1h8.59c.41 0 .89.61.75 1z\"></path></svg>";
  var va = "?v=3&s=88"
   , wa = {
    COLLABORATOR: "\u5408\u4F5C\u8005",
    CONTRIBUTOR: "\u8D21\u732E\u8005",
    MEMBER: "\u6210\u5458",
    OWNER: "\u4F5C\u8005",
    FIRST_TIME_CONTRIBUTOR: "\u521D\u671F\u8D21\u732E\u8005",
    FIRST_TIMER: "\u6C99\u53D1",
    NONE: ""
  }
   , xa = function() {
    function e(e, t, r) {
      this.comment = e,
      this.currentUser = t;
      var n = e.user
       , a = e.html_url
       , o = e.created_at
       , s = e.body_html
       , i = e.author_association
       , c = e.reactions;
      this.element = document.createElement("article"),
      this.element.classList.add("timeline-comment"),
      n.login === t && this.element.classList.add("current-user");
      var l = wa[i]
       , m = v.reduce(function(e, t) {
        return e + c[t]
      }, 0)
       , $ = ""
       , u = "";
      r || (t ? ($ = B(e.reactions.url, "right"),
      u = B(e.reactions.url, "center")) : ($ = C("right"),
      u = C("center"))),
      this.element.innerHTML = "\n <a class=\"avatar\" href=\"" + n.html_url + "\" target=\"_blank\">\n  <img alt=\"@" + n.login + "\" height=\"44\" width=\"44\"\n src=\"" + n.avatar_url + va + "\">\n </a>\n <div class=\"comment\">\n  <header class=\"comment-header\">\n <span class=\"comment-meta\">\n <a class=\"text-link comment-author\" href=\"" + n.html_url + "\" target=\"_blank\"><strong>" + n.login + "</strong></a>\n \u8BC4\u8BBA<a class=\"text-link\" href=\"" + a + "\" target=\"_blank\">" + sa(Date.now(), new Date(o)) + "</a>\n </span>\n <div class=\"comment-actions\">\n " + (l ? "<span class=\"author-association-badge\">" + l + "</span>" : "") + "\n " + $ + "\n </div>\n  </header>\n  <div class=\"markdown-body markdown-body-scrollable\">\n " + s + "\n  </div>\n  <div class=\"comment-footer\" reaction-count=\"" + m + "\" reaction-url=\"" + c.url + "\">\n <form class=\"reaction-list BtnGroup\" action=\"javascript:\">\n " + v.map(function(e) {
        return A(c.url, e, !t || r, c[e])
      }).join("") + "\n </form>\n " + u + "\n  </div>\n </div>";
      var d = this.element.querySelector(".markdown-body")
       , p = d.querySelector(".email-hidden-toggle a");
      if (p) {
        var h = d.querySelector(".email-hidden-reply");
        p.onclick = function(e) {
          e.preventDefault(),
          h.classList.toggle("expanded")
        }
      }
      W(d)
    }
    return e.prototype.setCurrentUser = function(e) {
      this.currentUser !== e && (this.currentUser = e,
      this.comment.user.login === this.currentUser ? this.element.classList.add("current-user") : this.element.classList.remove("current-user"))
    }
    ,
    e
  }();
  function W(e) {
    Array.from(e.querySelectorAll(":not(.email-hidden-toggle) > a")).forEach(function(e) {
      e.target = "_blank",
      e.rel = "noopener noreferrer"
    }),
    Array.from(e.querySelectorAll("img")).forEach(function(e) {
      e.onload = d,
      e.title = e.alt,
      e.src = e.getAttribute("data-canonical-src");
      var t = e.parentElement;
      "A" === t.nodeName && (t.href = e.getAttribute("data-canonical-src"))
    }),
    Array.from(e.querySelectorAll("a.commit-tease-sha")).forEach(function(e) {
      return e.href = "https://github.com" + e.pathname
    })
  }
  var ya = function() {
    function e(e, t) {
      this.user = e,
      this.issue = t,
      this.timeline = [],
      this.count = 0,
      this.element = document.createElement("main"),
      this.element.classList.add("timeline"),
      this.element.innerHTML = "\n <h1 class=\"timeline-header\">\n  <a class=\"text-link\" target=\"_blank\"></a>\n </h1>",
      this.countAnchor = this.element.firstElementChild.firstElementChild,
      this.marker = document.createComment("marker"),
      this.element.appendChild(this.marker),
      this.setIssue(this.issue),
      this.renderCount()
    }
    return e.prototype.setUser = function(e) {
      this.user = e;
      for (var t = e ? e.login : null, n = 0; n < this.timeline.length; n++)
        this.timeline[n].setCurrentUser(t);
      d()
    }
    ,
    e.prototype.setIssue = function(e) {
      this.issue = e,
      e ? (this.count = e.comments,
      this.countAnchor.href = e.html_url,
      this.renderCount()) : this.countAnchor.removeAttribute("href")
    }
    ,
    e.prototype.insertComment = function(e, t) {
      var n = new xa(e,this.user ? this.user.login : null,this.issue.locked)
       , i = this.timeline.findIndex(function(t) {
        return t.comment.id >= e.id
      });
      if (-1 === i)
        this.timeline.push(n),
        this.element.insertBefore(n.element, this.marker);
      else {
        var s = this.timeline[i]
         , r = s.comment.id === e.id;
        this.element.insertBefore(n.element, s.element),
        this.timeline.splice(i, r ? 1 : 0, n),
        r && s.element.remove()
      }
      t && (this.count++,
      this.renderCount()),
      d()
    }
    ,
    e.prototype.insertPageLoader = function(e, t, n) {
      var i = this.timeline.find(function(t) {
        return t.comment.id >= e.id
      }).element;
      i.insertAdjacentHTML("afterend", "\n <div class=\"page-loader\">\n  <div class=\"zigzag\"></div>\n  <button type=\"button\" class=\"btn btn-outline btn-large\">\n " + t + " \u6761\u8BC4\u8BBA\u88AB\u6536\u8D77<br/>\n <span>\u5C55\u5F00...</span>\n  </button>\n </div>\n ");
      var s = i.nextElementSibling
       , r = s.lastElementChild
       , o = r.lastElementChild;
      return r.onclick = n,
      {
        setBusy: function() {
          o.textContent = "\u52A0\u8F7D\u4E2D...",
          r.disabled = !0
        },
        remove: function() {
          r.onclick = null,
          s.remove()
        }
      }
    }
    ,
    e.prototype.renderCount = function() {
      this.countAnchor.textContent = this.count >= 1 ? this.count + " \u6761\u8BC4\u8BBA" : "\u8FD8\u6CA1\u6709\u8BC4\u8BBA"
    }
    ,
    e
  }();
  var l = {};
  var X;
  function Y() {
    return X || (X = L("Gissues.json").then(function(r) {
      return Array.isArray(r.origins) || (r.origins = []),
      r
    }, function() {
      return {
        origins: [b.origin]
      }
    })),
    X
  }
  var Z = l && l.__assign || function() {
    return (Z = Object.assign || function(t) {
      for (var e, n = 1, a = arguments.length; n < a; n++)
        for (var r in e = arguments[n])
          Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
      return t
    }
    ).apply(this, arguments)
  }
   , za = l && l.__awaiter || function(t, e, n, a) {
    return new (n || (n = Promise))(function(r, i) {
      function s(t) {
        try {
          l(a.next(t))
        } catch (e) {
          i(e)
        }
      }
      function o(t) {
        try {
          l(a.throw(t))
        } catch (e) {
          i(e)
        }
      }
      function l(t) {
        var e;
        t.done ? r(t.value) : (e = t.value,
        e instanceof n ? e : new n(function(t) {
          t(e)
        }
        )).then(s, o)
      }
      l((a = a.apply(t, e || [])).next())
    }
    )
  }
   , Aa = l && l.__generator || function(t, e) {
    var n, a, r, i, s = {
      label: 0,
      sent: function() {
        if (1 & r[0])
          throw r[1];
        return r[1]
      },
      trys: [],
      ops: []
    };
    return i = {
      next: o(0),
      throw: o(1),
      return: o(2)
    },
    "function" == typeof Symbol && (i[Symbol.iterator] = function() {
      return this
    }
    ),
    i;
    function o(i) {
      return function(o) {
        return function(i) {
          if (n)
            throw new TypeError("Generator is already executing.");
          for (; s; )
            try {
              if (n = 1,
              a && (r = 2 & i[0] ? a.return : i[0] ? a.throw || ((r = a.return) && r.call(a),
              0) : a.next) && !(r = r.call(a, i[1])).done)
                return r;
              switch (a = 0,
              r && (i = [2 & i[0], r.value]),
              i[0]) {
              case 0:
              case 1:
                r = i;
                break;
              case 4:
                return s.label++,
                {
                  value: i[1],
                  done: !1
                };
              case 5:
                s.label++,
                a = i[1],
                i = [0];
                continue;
              case 7:
                i = s.ops.pop(),
                s.trys.pop();
                continue;
              default:
                if (!(r = (r = s.trys).length > 0 && r[r.length - 1]) && (6 === i[0] || 2 === i[0])) {
                  s = 0;
                  continue
                }
                if (3 === i[0] && (!r || i[1] > r[0] && i[1] < r[3])) {
                  s.label = i[1];
                  break
                }
                if (6 === i[0] && s.label < r[1]) {
                  s.label = r[1],
                  r = i;
                  break
                }
                if (r && s.label < r[2]) {
                  s.label = r[2],
                  s.ops.push(i);
                  break
                }
                r[2] && s.ops.pop(),
                s.trys.pop();
                continue;
              }
              i = e.call(t, s)
            } catch (o) {
              i = [6, o],
              a = 0
            } finally {
              n = r = 0
            }
          if (5 & i[0])
            throw i[1];
          return {
            value: i[0] ? i[1] : void 0,
            done: !0
          }
        }([i, o])
      }
    }
  }
   , Ba = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 14 16\" version=\"1.1\"><path fill=\"rgb(179,179,179)\" fill-rule=\"evenodd\" d=\"M8 10.5L9 14H5l1-3.5L5.25 9h3.5L8 10.5zM10 6H4L2 7h10l-2-1zM9 2L7 3 5 2 4 5h6L9 2zm4.03 7.75L10 9l1 2-2 3h3.22c.45 0 .86-.31.97-.75l.56-2.28c.14-.53-.19-1.08-.72-1.22zM4 9l-3.03.75c-.53.14-.86.69-.72 1.22l.56 2.28c.11.44.52.75.97.75H5l-2-3 1-2z\"></path></svg>"
   , Ca = "data:image/svg+xml;base64," + btoa(Ba)
   , D = "\u6CA1\u6709\u53EF\u9884\u89C8\u7684\u5185\u5BB9"
   , _ = function() {
    function t(t, e) {
      var n = this;
      this.user = t,
      this.submit = e,
      this.submitting = !1,
      this.renderTimeout = 0,
      this.handleInput = function() {
        Y();
        var t = n.textarea.value
         , e = /^\s*$/.test(t);
        n.submitButton.disabled = e,
        n.textarea.scrollHeight < 450 && n.textarea.offsetHeight < n.textarea.scrollHeight && (n.textarea.style.height = n.textarea.scrollHeight + "px",
        d()),
        clearTimeout(n.renderTimeout),
        e ? n.preview.textContent = D : (n.preview.textContent = "\u52A0\u8F7D\u9884\u89C8\u4E2D...",
        n.renderTimeout = setTimeout(function() {
          return S(t).then(function(t) {
            return n.preview.innerHTML = t
          }).then(function() {
            return W(n.preview)
          }).then(d)
        }, 500))
      }
      ,
      this.handleSubmit = function(t) {
        return za(n, void 0, void 0, function() {
          return Aa(this, function(e) {
            switch (e.label) {
            case 0:
              return t.preventDefault(),
              this.submitting ? [2] : (this.submitting = !0,
              this.textarea.disabled = !0,
              this.submitButton.disabled = !0,
              [4, this.submit(this.textarea.value).catch(function() {
                return 0
              })]);
            case 1:
              return e.sent(),
              this.submitting = !1,
              this.textarea.disabled = !this.user,
              this.textarea.value = "",
              this.submitButton.disabled = !1,
              this.handleClick(Z(Z({}, t), {
                target: this.form.querySelector(".tabnav-tab.tab-write")
              })),
              this.preview.textContent = D,
              [2];
            }
          })
        })
      }
      ,
      this.handleClick = function(t) {
        var e = t.target;
        if (e instanceof HTMLButtonElement && e.classList.contains("tabnav-tab") && "true" !== e.getAttribute("aria-selected")) {
          n.form.querySelector(".tabnav-tab[aria-selected=\"true\"]").setAttribute("aria-selected", "false"),
          e.setAttribute("aria-selected", "true");
          var a = e.classList.contains("tab-preview");
          n.textarea.style.display = a ? "none" : "",
          n.preview.style.display = a ? "" : "none",
          d()
        }
      }
      ,
      this.handleKeyDown = function(t) {
        var e = t.which
         , a = t.ctrlKey;
        13 === e && a && !n.submitButton.disabled && n.form.dispatchEvent(new CustomEvent("submit"))
      }
      ,
      this.element = document.createElement("article"),
      this.element.classList.add("timeline-comment"),
      this.element.innerHTML = "\n <a class=\"avatar\" target=\"_blank\">\n  <img height=\"44\" width=\"44\">\n </a>\n <form class=\"comment\" accept-charset=\"UTF-8\" action=\"javascript:\">\n  <header class=\"new-comment-header tabnav\">\n <nav class=\"tabnav-tabs\" role=\"tablist\">\n <button type=\"button\" class=\"tabnav-tab tab-write\"\n role=\"tab\" aria-selected=\"true\">\n \u7F16\u8F91\n </button>\n <button type=\"button\" class=\"tabnav-tab tab-preview\"\n role=\"tab\">\n \u9884\u89C8\n </button>\n </nav>\n  </header>\n  <div class=\"comment-body\">\n <textarea class=\"form-control\" placeholder=\"Leave a comment\" aria-label=\"comment\"></textarea>\n <div class=\"markdown-body\" style=\"display: none\">\n " + D + "\n </div>\n  </div>\n  <footer class=\"new-comment-footer\">\n <a class=\"text-link markdown-info\" target=\"_blank\"\n  href=\"https://guides.github.com/features/mastering-markdown/\">\n <svg class=\"octicon v-align-bottom\" viewBox=\"0 0 16 16\" version=\"1.1\"\n width=\"16\" height=\"16\" aria-hidden=\"true\">\n <path fill-rule=\"evenodd\" d=\"M14.85 3H1.15C.52 3 0 3.52 0 4.15v7.69C0 12.48.52 13 1.15\n 13h13.69c.64 0 1.15-.52 1.15-1.15v-7.7C16 3.52 15.48 3 14.85 3zM9 11H7V8L5.5 9.92 4\n 8v3H2V5h2l1.5 2L7 5h2v6zm2.99.5L9.5 8H11V5h2v3h1.5l-2.51 3.5z\">\n </path>\n </svg>\n \u652F\u6301 Markdown \u7F16\u8F91\n </a>\n <button class=\"btn btn-primary\" type=\"submit\">\u53D1\u8868\u8BC4\u8BBA</button>\n <a class=\"btn btn-primary\" href=\"" + r(b.url) + "\" target=\"_top\">\u767B\u5F55</a>\n  </footer>\n </form>",
      this.avatarAnchor = this.element.firstElementChild,
      this.avatar = this.avatarAnchor.firstElementChild,
      this.form = this.avatarAnchor.nextElementSibling,
      this.textarea = this.form.firstElementChild.nextElementSibling.firstElementChild,
      this.preview = this.form.firstElementChild.nextElementSibling.lastElementChild,
      this.signInAnchor = this.form.lastElementChild.lastElementChild,
      this.submitButton = this.signInAnchor.previousElementSibling,
      this.setUser(t),
      this.submitButton.disabled = !0,
      this.textarea.addEventListener("input", this.handleInput),
      this.form.addEventListener("submit", this.handleSubmit),
      this.form.addEventListener("click", this.handleClick),
      this.form.addEventListener("keydown", this.handleKeyDown),
      Da(this.textarea)
    }
    return t.prototype.setUser = function(t) {
      this.user = t,
      this.submitButton.hidden = !t,
      this.signInAnchor.hidden = !!t,
      t ? (this.avatarAnchor.href = t.html_url,
      this.avatar.alt = "@" + t.login,
      this.avatar.src = t.avatar_url + "?v=3&s=88",
      this.textarea.disabled = !1,
      this.textarea.placeholder = "\u53D1\u8868\u8BC4\u8BBA") : (this.avatarAnchor.removeAttribute("href"),
      this.avatar.alt = "@anonymous",
      this.avatar.src = Ca,
      this.textarea.disabled = !0,
      this.textarea.placeholder = "\u767B\u5F55\u540E\u8BC4\u8BBA")
    }
    ,
    t.prototype.clear = function() {
      this.textarea.value = ""
    }
    ,
    t
  }();
  function Da(t) {
    var e = function t() {
      removeEventListener("mousemove", d),
      removeEventListener("mouseup", t)
    };
    t.addEventListener("mousedown", function() {
      addEventListener("mousemove", d),
      addEventListener("mouseup", e)
    })
  }
  l.NewCommentComponent = _;
  var o = {};
  function $(e, t) {
    return new Promise(function(s) {
      var a = document.createElement("link");
      a.rel = "stylesheet",
      a.setAttribute("crossorigin", "anonymous"),
      a.onload = s,
      a.href = "/themes/" + e + "/style.css",
      document.head.appendChild(a),
      addEventListener("message", function(e) {
        sessionStorage.setItem("beaudar-set-theme", e.data.theme),
        e.origin === t && "set-theme" === e.data.type && (a.href = "/themes/" + e.data.theme + "/style.css")
      })
    }
    )
  }
  var Ea = o && o.__awaiter || function(e, t, n, r) {
    return new (n || (n = Promise))(function(a, o) {
      function i(e) {
        try {
          s(r.next(e))
        } catch (t) {
          o(t)
        }
      }
      function c(e) {
        try {
          s(r.throw(e))
        } catch (t) {
          o(t)
        }
      }
      function s(e) {
        var t;
        e.done ? a(e.value) : (t = e.value,
        t instanceof n ? t : new n(function(e) {
          e(t)
        }
        )).then(i, c)
      }
      s((r = r.apply(e, t || [])).next())
    }
    )
  }
   , Fa = o && o.__generator || function(e, t) {
    var n, r, a, o, i = {
      label: 0,
      sent: function() {
        if (1 & a[0])
          throw a[1];
        return a[1]
      },
      trys: [],
      ops: []
    };
    return o = {
      next: c(0),
      throw: c(1),
      return: c(2)
    },
    "function" == typeof Symbol && (o[Symbol.iterator] = function() {
      return this
    }
    ),
    o;
    function c(o) {
      return function(c) {
        return function(o) {
          if (n)
            throw new TypeError("Generator is already executing.");
          for (; i; )
            try {
              if (n = 1,
              r && (a = 2 & o[0] ? r.return : o[0] ? r.throw || ((a = r.return) && a.call(r),
              0) : r.next) && !(a = a.call(r, o[1])).done)
                return a;
              switch (r = 0,
              a && (o = [2 & o[0], a.value]),
              o[0]) {
              case 0:
              case 1:
                a = o;
                break;
              case 4:
                return i.label++,
                {
                  value: o[1],
                  done: !1
                };
              case 5:
                i.label++,
                r = o[1],
                o = [0];
                continue;
              case 7:
                o = i.ops.pop(),
                i.trys.pop();
                continue;
              default:
                if (!(a = (a = i.trys).length > 0 && a[a.length - 1]) && (6 === o[0] || 2 === o[0])) {
                  i = 0;
                  continue
                }
                if (3 === o[0] && (!a || o[1] > a[0] && o[1] < a[3])) {
                  i.label = o[1];
                  break
                }
                if (6 === o[0] && i.label < a[1]) {
                  i.label = a[1],
                  a = o;
                  break
                }
                if (a && i.label < a[2]) {
                  i.label = a[2],
                  i.ops.push(o);
                  break
                }
                a[2] && i.ops.pop(),
                i.trys.pop();
                continue;
              }
              o = t.call(e, i)
            } catch (c) {
              o = [6, c],
              r = 0
            } finally {
              n = a = 0
            }
          if (5 & o[0])
            throw o[1];
          return {
            value: o[0] ? o[1] : void 0,
            done: !0
          }
        }([o, c])
      }
    }
  }
  ;
  function aa(e) {
    return Ea(this, void 0, Promise, function() {
      var t, n, r, a, o;
      return Fa(this, function(i) {
        return t = document.createElement("div"),
        n = $(e.theme, e.origin),
        r = !1,
        sessionStorage.getItem("beaudar-set-theme") && (n = $(sessionStorage.getItem("beaudar-set-theme"), e.origin)),
        (-1 !== window.navigator.userAgent.indexOf("MSIE") || "ActiveXObject"in window) && (a = document.createElement("div"),
        r = !0,
        a.classList.add("ie-container", "markdown-body"),
        a.innerHTML = "\n <h3>\u6211\u8EAB\u5904 IE \u7684\u82B1\u6D77\u4E2D......</h3>\n <p>&emsp;&emsp;\u4ECE\u524D\uFF0C\u6709\u7247\u82B1\u7530\u3002\n <br/>&emsp;&emsp;\u90A3\u91CC\u5F88\u7A7A\u65F7\uFF0C\u5F88\u5BC2\u9759\u3002\n <br/>&emsp;&emsp;\u5FAE\u98CE\u5439\u8FC7\u8138\u988A\uFF0C\n <br/>&emsp;&emsp;\u6709\u4E00\u4E1D\u4E1D\u7518\u751C\u7684\u6C14\u606F\u3002\n <br/>&emsp;&emsp;\u773A\u671B\u8FDC\u5904\uFF0C\n <br/>&emsp;&emsp;\u7EF5\u5EF6\u7684\u82B1\u6D77\u4EFF\u4F5B\u5728\u6307\u5F15\u7740\u6211\u4EEC\uFF0C\n <br/>&emsp;&emsp;\u900F\u8FC7\u5B83\uFF0C\n <br/>&emsp;&emsp;\u6211\u4EEC\u7406\u89E3\u4E86\u8FD9\u4E94\u5F69\u6591\u6593\u7684\u4E16\u754C\u3002\n </p>\n <a href='https://browsehappy.com' target='_blank'>\n \u4E0B\u8F7D\u65B0\u4E00\u4EE3\u6D4F\u89C8\u5668\u540E\u518D\u6B21\u8BBF\u95EE\u672C\u9875\u9762\u3002\n </a>",
        t.appendChild(a)),
        JSON.parse(e.loading) && ((o = document.createElement("div")).classList.add("beaudarLoading"),
        o.innerHTML = "\n <a href=\"https://gissues.gitee.io\" target=\"_blank\">\n  <img width=\"50px\" height=\"50px\" src=\"https://gissues.gitee.io/logo.png\" title=\"Gissues\">\n </a>",
        t.appendChild(o)),
        n.then(function() {
          document.body.appendChild(t),
          d()
        }),
        [2, {
          loadingElement: t,
          IS_IE: r
        }]
      })
    })
  }
  o.beaudarLoadingStatus = aa;
  var y = i && i.__awaiter || function(e, t, r, n) {
    return new (r || (r = Promise))(function(o, a) {
      function u(e) {
        try {
          i(n.next(e))
        } catch (t) {
          a(t)
        }
      }
      function $(e) {
        try {
          i(n.throw(e))
        } catch (t) {
          a(t)
        }
      }
      function i(e) {
        var t;
        e.done ? o(e.value) : (t = e.value,
        t instanceof r ? t : new r(function(e) {
          e(t)
        }
        )).then(u, $)
      }
      i((n = n.apply(e, t || [])).next())
    }
    )
  }
   , z = i && i.__generator || function(e, t) {
    var r, n, o, a, u = {
      label: 0,
      sent: function() {
        if (1 & o[0])
          throw o[1];
        return o[1]
      },
      trys: [],
      ops: []
    };
    return a = {
      next: $(0),
      throw: $(1),
      return: $(2)
    },
    "function" == typeof Symbol && (a[Symbol.iterator] = function() {
      return this
    }
    ),
    a;
    function $(a) {
      return function($) {
        return function(a) {
          if (r)
            throw new TypeError("Generator is already executing.");
          for (; u; )
            try {
              if (r = 1,
              n && (o = 2 & a[0] ? n.return : a[0] ? n.throw || ((o = n.return) && o.call(n),
              0) : n.next) && !(o = o.call(n, a[1])).done)
                return o;
              switch (n = 0,
              o && (a = [2 & a[0], o.value]),
              a[0]) {
              case 0:
              case 1:
                o = a;
                break;
              case 4:
                return u.label++,
                {
                  value: a[1],
                  done: !1
                };
              case 5:
                u.label++,
                n = a[1],
                a = [0];
                continue;
              case 7:
                a = u.ops.pop(),
                u.trys.pop();
                continue;
              default:
                if (!(o = (o = u.trys).length > 0 && o[o.length - 1]) && (6 === a[0] || 2 === a[0])) {
                  u = 0;
                  continue
                }
                if (3 === a[0] && (!o || a[1] > o[0] && a[1] < o[3])) {
                  u.label = a[1];
                  break
                }
                if (6 === a[0] && u.label < o[1]) {
                  u.label = o[1],
                  o = a;
                  break
                }
                if (o && u.label < o[2]) {
                  u.label = o[2],
                  u.ops.push(a);
                  break
                }
                o[2] && u.ops.pop(),
                u.trys.pop();
                continue;
              }
              a = t.call(e, u)
            } catch ($) {
              a = [6, $],
              n = 0
            } finally {
              r = o = 0
            }
          if (5 & a[0])
            throw a[1];
          return {
            value: a[0] ? a[1] : void 0,
            done: !0
          }
        }([a, $])
      }
    }
  }
  ;
  function Ga() {
    return null !== b.issueNumber ? N(b.issueNumber) : M(b.issueTerm)
  }
  function Ha() {
    return y(this, void 0, void 0, function() {
      var e, t, r, n, o, a, u, $, i = this;
      return z(this, function(s) {
        switch (s.label) {
        case 0:
          return ea(b.origin),
          [4, aa(b)];
        case 1:
          if ((e = s.sent()).IS_IE)
            throw new Error("\u672C\u9879\u76EE\u653E\u5F03\u517C\u5BB9 IE\u3002");
          return [4, G()];
        case 2:
          s.sent(),
          s.label = 3;
        case 3:
          return s.trys.push([3, 5, , 6]),
          [4, Promise.all([Ga(), O()])];
        case 4:
          return $ = s.sent(),
          t = $[0],
          r = $[1],
          [3, 6];
        case 5:
          throw n = s.sent(),
          new x().createMsgElement("api.github.com \u8BF7\u6C42\u5931\u8D25", "<p>\u53EF\u70B9\u51FB\u201C\u5237\u65B0\u201D\uFF0C\u5C1D\u8BD5\u89E3\u51B3\u6B64\u95EE\u9898\u3002</p>", !0),
          new Error("api.github.com \u8BF7\u6C42\u5931\u8D25\u3002" + n);
        case 6:
          return o = new ya(r,t),
          document.body.appendChild(o.element),
          e.loadingElement.remove(),
          t && t.comments > 0 && Ia(t, o),
          d(),
          t && t.locked ? [2] : (U(!!r),
          a = function(e) {
            return y(i, void 0, void 0, function() {
              var r, n, a, $, i;
              return z(this, function(s) {
                switch (s.label) {
                case 0:
                  return [4, Y()];
                case 1:
                  return r = s.sent().origins,
                  n = b.origin,
                  a = b.owner,
                  $ = b.repo,
                  -1 === r.indexOf(n) ? [3, 5] : t ? [3, 3] : [4, P(b.issueTerm, b.url, b.title, b.description || "", b.label)];
                case 2:
                  t = s.sent(),
                  o.setIssue(t),
                  s.label = 3;
                case 3:
                  return [4, Q(t.number, e)];
                case 4:
                  return i = s.sent(),
                  o.insertComment(i, !0),
                  u.clear(),
                  [3, 6];
                case 5:
                  throw new x().createMsgElement("\u9519\u8BEF: <code>" + n + "</code> \u8BC4\u8BBA\u4E0D\u5141\u8BB8\u53D1\u5E03\u5230\u4ED3\u5E93 <code>" + a + "/" + $ + "</code>", "\n <p>&emsp;&emsp;\u8BF7\u786E\u8BA4 <code>" + a + "/" + $ + "</code> \u662F\u672C\u7AD9\u70B9\u8BC4\u8BBA\u7684\u6B63\u786E\u4ED3\u5E93\u3002\u5982\u679C\u60A8\u62E5\u6709\u6B64\u4ED3\u5E93\uFF0C\n <a href=\"https://gissues.gitee.io/" + a + "/" + $ + "/Gissues.json\" target=\"_blank\">\n  <strong>\u6DFB\u52A0\u6216\u66F4\u65B0 Gissues.json</strong>\n </a>\n \u6DFB\u52A0 <code>" + n + "</code> \u5230\u6765\u6E90\u5217\u8868\u3002</p>\n <p>\u9700\u8981\u914D\u7F6E\uFF1A</p>\n <pre><code>" + JSON.stringify({
                    origins: [n]
                  }, null, 2) + "</code></pre>\n "),
                  new Error("\u8BC4\u8BBA\u53D1\u5E03\u88AB\u7981\u6B62\uFF0C<code>" + n + "</code> \u8BC4\u8BBA\u4E0D\u5141\u8BB8\u53D1\u5E03\u5230\u4ED3\u5E93 <code>" + a + "/" + $ + "</code>\u3002");
                case 6:
                  return [2];
                }
              })
            })
          }
          ,
          u = new _(r,a),
          o.element.appendChild(u.element),
          [2]);
        }
      })
    })
  }
  function Ia(e, t) {
    return y(this, void 0, void 0, function() {
      var r, n, o, a, u, $, i, s, p, c, l = this;
      return z(this, function(m) {
        switch (m.label) {
        case 0:
          return r = function(e) {
            for (var r = 0, n = e; r < n.length; r++) {
              var o = n[r];
              t.insertComment(o, !1)
            }
          }
          ,
          n = Math.ceil(e.comments / q),
          o = [w(e.number, 1)],
          n > 1 && o.push(w(e.number, n)),
          n > 2 && e.comments % q < 3 && o.push(w(e.number, n - 1)),
          [4, Promise.all(o)];
        case 1:
          for (a = m.sent(),
          u = 0,
          $ = a; u < $.length; u++)
            i = $[u],
            r(i);
          return s = n - o.length,
          p = 2,
          (c = function(n) {
            if (0 !== s)
              var o = n.pop()
               , a = t.insertPageLoader(o, s * q, function() {
                return y(l, void 0, void 0, function() {
                  var t;
                  return z(this, function(n) {
                    switch (n.label) {
                    case 0:
                      return a.setBusy(),
                      [4, w(e.number, p)];
                    case 1:
                      return t = n.sent(),
                      a.remove(),
                      r(t),
                      s--,
                      p++,
                      c(t),
                      [2];
                    }
                  })
                })
              })
          }
          )(a[0]),
          [2];
        }
      })
    })
  }
  J(b),
  Ha(),
  addEventListener("not-installed", function e() {
    removeEventListener("not-installed", e),
    document.querySelector(".timeline").insertAdjacentHTML("afterbegin", "\n <div class=\"flash flash-error\">\n \u9519\u8BEF: Gissues \u6CA1\u6709\u5B89\u88C5\u5728 <code>" + b.owner + "/" + b.repo + "</code>\u3002\n \u5982\u679C\u4F60\u62E5\u6709\u8FD9\u4ED3\u5E93\uFF0C\n <a href=\"https://gitee.com/oauth/applications/6089\" target=\"_blank\"><strong>\u5B89\u88C5 app</strong></a>\u3002\n </div>"),
    d()
  });
  if (typeof exports === "object" && typeof module !== "undefined") {
    module.exports = i
  } else if (typeof define === "function" && define.amd) {
    define(function() {
      return i
    })
  }
  p.__esModule = true;
  return {
    "ieWq": p,
    "tujX": i
  };
});
