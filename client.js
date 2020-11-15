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
  var c = {};
  function i(e) {
    for (var r, o = /\+/g, n = /([^&=]+)=?([^&]*)/g, p = function(e) {
      return decodeURIComponent(e.replace(o, " "))
    }, a = {}; r = n.exec(e); )
      a[p(r[1])] = p(r[2]);
    return a
  }
  function e(e) {
    var r = [];
    for (var o in e)
      e.hasOwnProperty(o) && e[o] && r.push(encodeURIComponent(o) + "=" + encodeURIComponent(e[o]));
    return r.join("&")
  }
  c.deparam = i,
  c.param = e;
  var d = {}
    , j = window.matchMedia("(PrefersColorScheme: dark)").matches ? "GitHubDark" : "GithubLight";
  d.preferredTheme = j;
  var k = "PreferredColorScheme";
  d.preferredThemeId = k;
  var f = i(location.search.substr(1))
    , l = f.beaudar;
  if (l) {
    delete f.beaudar;
    var g = e(f);
    g.length && (g = "?" + g),
    history.replaceState(void 0, document.title, location.pathname + g + location.hash)
  }
  var b = document.currentScript;
  void 0 === b && (b = document.querySelector("script[src^=\"https://gissues.gitee.io/client.js\"],script[src^=\"http://localhost:4000/client.js\"]"));
  for (var a = {}, h = 0; h < b.attributes.length; h++) {
    var m = b.attributes.item(h);
    a[m.name.replace(/^data-/, "")] = m.value
  }
  a.theme === k && (a.theme = j);
  var n = document.querySelector("link[rel='canonical']");
  a.url = n ? n.href : location.origin + location.pathname + location.search,
  a.origin = location.origin,
  a.pathname = location.pathname.length < 2 ? "index" : location.pathname.substr(1).replace(/\.\w+$/, ""),
  a.title = document.title;
  var o = document.querySelector("meta[name='description']");
  a.description = o ? o.content : "";
  var p = document.querySelector("meta[property='og:title'],meta[name='og:title']");
  a["og:title"] = p ? p.content : "",
  a.token = l,
  document.head.insertAdjacentHTML("afterbegin", "<style>\n .beaudar {\n position: relative;\n box-sizing: border-box;\n width: 100%;\n max-width: 760px;\n margin-left: auto;\n margin-right: auto;\n }\n .beaudar-frame {\n position: absolute;\n left: 0;\n right: 0;\n width: 1px;\n min-width: 100%;\n max-width: 100%;\n height: 100%;\n border: 0;\n }\n  </style>");
  var q = b.src.match(/^https:\/\/gissues\.gitee\.io|http:\/\/localhost:\d+/)[0]
    , r = q + "/beaudar.html";
  b.insertAdjacentHTML("afterend", "<div class=\"beaudar\">\n <iframe class=\"beaudar-frame\" title=\"Comments\" scrolling=\"no\" src=\"" + r + "?" + e(a) + "\"></iframe>\n  </div>");
  var s = b.nextElementSibling;
  b.parentElement.removeChild(b),
  addEventListener("message", function(r) {
    if (r.origin === q) {
      var a = r.data;
      a && "resize" === a.type && a.height && (s.style.height = a.height + "px")
    }
  });
  c.__esModule = true;
  d.__esModule = true;
  return {
    "D53L": {},
    "ieWq": c,
    "N98m": d
  };
});
