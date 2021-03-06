(function() {
    var e = function(e, t) {
        return (new RegExp("(?:^|\\s)" + t + "(?:\\s|$)", "i")).test(e.className)
    },
    t = function(t, n) {
        e(t, n) || (t.className = (t.className + " " + n).replace(/^\s+|\s+$/g, ""))
    },
    n = function(t, n) {
        e(t, n) && (t.className = t.className.replace(new RegExp("(?:\\s|^)" + n + "(?:\\s|$)", "i"), " ").replace(/^\s+|\s+$/g, ""))
    },
    r = function(e) {
        var t = document.getElementsByTagName("head")[0] || document.documentElement,
        n = document.createElement("script"),
        r = !1;
        n.src = e,
        n.charset = "utf-8",
        n.onerror = n.onload = n.onreadystatechange = function() { ! r && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete") && (r = !0, t.removeChild(n))
        },
        t.insertBefore(n, t.firstChild)
    },
    i = function(e, t, n) {
        var r = t.split(/\s+/);
        for (var i = 0,
        s = r.length; i < s; i++) e.addEventListener(r[i], n, !1)
    },
    s = function(e, t, n) {
        if (window.NodeList && e instanceof NodeList || e.length > 0 && e[e.length - 1]) for (var r = 0,
        s = e.length; r < s; r++) i(e[r], t, n);
        else i(e, t, n)
    },
    o = function() {
        var e = !1,
        t, n;
        typeof arguments[0] == "boolean" && (e = Array.prototype.shift.call(arguments)),
        t = Array.prototype.shift.call(arguments),
        n = arguments;
        for (var r = 0,
        i = n.length,
        s; r < i; r++) {
            s = n[r];
            for (var u in s) e && typeof s[u] == "object" && null !== s[u] && !s[u].nodeType ? t[u] = o(!0, t[u], s[u]) : t[u] = s[u]
        }
        return t
    },
    u = function(e) {
        return e ? e.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;") : ""
    },
    a = {
        interval: 300,
        suggestNumber: 6,
        historyNumber: 6,
        historyInSuggestNumber: 2,
        callbackName: "suggest_so1",
        urlTemplate: "suggest.php?keyword="
    },
    f = function(e) {
        var t = e.elements.input;
        e.elements.wrap || (e.elements.wrap = t.parentNode);
        if (!e.elements.submit) {
            var n = t.form.elements;
            for (var r = 0,
            i = n.length; r < i; r++) if (n[r].type == "submit") {
                e.elements.submit = n[r];
                break
            }
        }
        o(this, a, e),
        suggestNumber = this.suggestNumber,
        this.init()
    };
    f.prototype = {
        _cache: {},
        filteredValue: null,
        filteringValue: null,
        urlPrefix: null,
        closed: !1,
        timer: null,
        disabled: !1,
        isFocus: !1,
        supportHistory: !!window.localStorage && !!window.JSON,
        suggestElements: {
            clearHistory: null,
            close: null
        },
        init: function() {
            var e = this;
            window[this.callbackName] = function(t) {
                e.callback(e, t)
            },
            this.urlPrefix = this.urlTemplate.replace(/%callbackName%/, encodeURIComponent(this.callbackName)),
            this.initDom(),
            this.bindEvents()
        },
        callback: function(e, t) {
            if (!t.q) return;
            e._cache[t.q] = t,
            e.filteredValue = e.filteringValue;
            var n = "",
            r = "";
            for (var i = 0,
            s = Math.min(t.s.length, e.suggestNumber); i < s; i++) e.filteredValue && t.s[i].indexOf(e.filteredValue) === 0 ? r = '<span class="match">' + u(e.filteredValue) + '</span><span class="hint">' + u(t.s[i].substr(e.filteredValue.length)) + "</span>": r = u(t.s[i]),
            n += '<div class="suggest-item" data-index="' + i + '" data-value="' + u(t.s[i]) + '"><div class="suggest-item-title">' + r + '</div><div class="suggest-item-add"></div></div>';
            n ? (e.suggestElements.content.innerHTML = n, e.bindEventsForDynamicDoms(), !e.closed && e.isFocus && e.show(!1)) : (e.suggestElements.content.innerHTML = "", e.hide())
        },
        initDom: function() {
            var e = document.createElement("div");
            e.className = "suggest-container",
            e.innerHTML = '<div class="suggest-content"></div><div class="suggest-toolbar"><div class="suggest-clearhistory">\u6e05\u9664\u5386\u53f2\u8bb0\u5f55</div><div class="fill-all"></div><div class="suggest-close">\u5173\u95ed</div></div>',
            this.elements.wrap.appendChild(e),
            this.suggestElements.container = e,
            this.suggestElements.content = e.firstChild,
            this.suggestElements.clearHistory = e.lastChild.firstChild,
            this.suggestElements.close = e.lastChild.lastChild
        },
        show: function(e) {
            e ? t(this.suggestElements.container, "suggest-history") : n(this.suggestElements.container, "suggest-history"),
            this.suggestElements.container.style.display = "block",
            this.closed = !1
        },
        hide: function() {
            this.suggestElements.container.style.display = "none",
            this.closed = !0
        },
        disable: function() {
            this.disabled = !0,
            clearTimeout(this.timer)
        },
        bindEvents: function() {
            var e = this;
            e.elements.submit.addEventListener("click",
            function(t) {
                if (!e.supportHistory) return;
                var n = e.elements.input.value.trim();
                n && e.addHistory(n)
            },
            !1),
            e.elements.input.addEventListener("focus",
            function(t) {
                e.scrollTop();
                if (e.disabled) return;
                e.isFocus = !0,
                e.checkInput(e)
            }),
            e.elements.input.addEventListener("blur",
            function(t) {
                e.isFocus = !1,
                clearTimeout(e.timer)
            }),
            e.elements.input.form.addEventListener("reset",
            function(t) {
                e.checkInput(e),
                e.elements.input.focus()
            }),
            e.suggestElements.clearHistory.addEventListener("click",
            function(t) {
                window.confirm("\u6e05\u9664\u5168\u90e8\u67e5\u8be2\u5386\u53f2\u8bb0\u5f55?") && (e.clearHistory(), e.suggestElements.content.innerHTML = "", e.hide())
            }),
            e.suggestElements.close.addEventListener("click",
            function(t) {
                clearTimeout(e.timer),
                e.hide(),
                e.disable()
            }),
            s(document.body, "click",
            function(t) {
                e.isFocus || (clearTimeout(e.timer), e.hide())
            })
        },
        bindEventsForDynamicDoms: function() {
            var e = this,
            r = document.getElementsByClassName("suggest-item"),
            i = document.getElementsByClassName("suggest-item-title"),
            o = document.getElementsByClassName("suggest-item-add");
            s(i, "touchstart mouseover",
            function(e) {
                t(this, "touched")
            }),
            s(i, "touchend mouseout",
            function(e) {
                n(this, "touched")
            }),
            s(r, "click",
            function(t) {
                e.elements.input.value = this.getAttribute("data-value"),
                e.elements.submit.click(),
                t.preventDefault(),
                t.stopPropagation()
            }),
            s(o, "touchstart mouseover",
            function(e) {
                t(this, "touched")
            }),
            s(o, "touchend mouseout",
            function(e) {
                n(this, "touched")
            }),
            s(o, "touchstart click",
            function(t) {
                e.elements.input.focus(),
                e.elements.input.value = t.target.parentNode.getAttribute("data-value"),
                e.scrollTop(),
                t.preventDefault(),
                t.stopPropagation()
            }),
            s(o, "mouseover touchmove mousedown touchend mouseout",
            function(e) {
                e.preventDefault(),
                e.stopPropagation()
            })
        },
        checkInput: function(e) {
            var r = e.elements.input,
            i = r.form,
            s = r.value.trim();
            e.timer = setTimeout(function() {
                e.checkInput(e)
            },
            e.interval);
            if (s === e.filteredValue) {
                e.closed && e.suggestElements.content.children.length > 0 && e.show(!s);
                return
            }
            if (s === e.filteringValue) return;
            s ? t(i, "has-keyword") : n(i, "has-keyword"),
            e.filteringValue = s;
            if (!s) {
                if (e.supportHistory) {
                    var o = e.getHistory(),
                    a = "",
                    f;
                    if (o && (f = o.length) > 0) {
                        for (var l = 0; l < f; l++) a += '<div class="suggest-item suggest-history" data-index="' + l + '" data-value="' + u(o[l][0]) + '"><div class="suggest-item-title">' + u(o[l][0]) + '</div><div class="suggest-item-add"></div></div>';
                        e.suggestElements.content.innerHTML = a,
                        e.bindEventsForDynamicDoms(),
                        !e.closed && e.isFocus && e.show(!0)
                    } else e.hide()
                }
                e.filteredValue = ""
            } else e.getSuggest(s)
        },
        getSuggest: function(e) {
            this._cache[e] ? this.callback(this, this._cache[e]) : r(this.urlPrefix + encodeURIComponent(e))
        },
        addHistory: function(e) {
            var t = this.getHistory();
            t.unshift([e, +(new Date)]);
            for (var n = t.length - 1; n > 0; n--) if (t[n][0] === e) {
                t.splice(n, 1);
                break
            }
            t = t.slice(0, this.historyNumber),
            localStorage.setItem("kw", JSON.stringify(t))
        },
        getHistory: function() {
            var e = localStorage.getItem("kw"),
            t;
            return null === e ? [] : (t = JSON.parse(e), t.slice(0, this.historyNumber))
        },
        clearHistory: function() {
            localStorage.removeItem("kw")
        },
        scrollTop: function() {
            var e = navigator.userAgent,
            t = this.elements.input.form.offsetTop - 2;
            /(iPhone\sOS)\s([\d_]+)/.test(e) ? /iPhone OS 6_0/.test(e) ? setTimeout(function() {
                window.scrollTo(0, t)
            },
            0) : window.scrollTo(0, t) : setTimeout(function() {
                window.scrollTo(0, t)
            },
            100)
        }
    },
    window.Suggest = f
})();