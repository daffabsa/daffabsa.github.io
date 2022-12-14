! function (t, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define("vue2-flip-countdown", [], e) : "object" == typeof exports ? exports["vue2-flip-countdown"] = e() : t["vue2-flip-countdown"] = e()
}("undefined" != typeof self ? self : this, function () {
    return function (t) {
        function e(i) {
            if (n[i]) return n[i].exports;
            var a = n[i] = {
                i: i,
                l: !1,
                exports: {}
            };
            return t[i].call(a.exports, a, a.exports, e), a.l = !0, a.exports
        }
        var n = {};
        return e.m = t, e.c = n, e.d = function (t, n, i) {
            e.o(t, n) || Object.defineProperty(t, n, {
                configurable: !1,
                enumerable: !0,
                get: i
            })
        }, e.n = function (t) {
            var n = t && t.__esModule ? function () {
                return t.default
            } : function () {
                return t
            };
            return e.d(n, "a", n), n
        }, e.o = function (t, e) {
            return Object.prototype.hasOwnProperty.call(t, e)
        }, e.p = "", e(e.s = 1)
    }([function (t, e, n) {
        "use strict";
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var i = n(7);
        e.default = {
            name: "flipCountdown",
            props: {
                deadline: {
                    type: String
                },
                stop: {
                    type: Boolean
                },
                showDays: {
                    type: Boolean,
                    required: !1,
                    default: !0
                },
                showHours: {
                    type: Boolean,
                    required: !1,
                    default: !0
                },
                showMinutes: {
                    type: Boolean,
                    required: !1,
                    default: !0
                },
                showSeconds: {
                    type: Boolean,
                    required: !1,
                    default: !0
                },
                labels: {
                    type: Object,
                    required: !1,
                    default: function () {
                        return {
                            days: "",
                            hours: "",
                            minutes: "",
                            seconds: ""
                        }
                    }
                },
                countdownSize: {
                    type: String,
                    required: !1
                },
                labelSize: {
                    type: String,
                    required: !1
                }
            },
            data: function () {
                var t = i();
                return {
                    now: Math.trunc((new Date).getTime() / 1e3),
                    date: null,
                    interval: null,
                    diff: 0,
                    show: !1,
                    timeData: [{
                        current: 0,
                        previous: 0,
                        label: this.labels.days,
                        elementId: "flip-card-days-" + t,
                        show: this.showDays
                    }, {
                        current: 0,
                        previous: 0,
                        label: this.labels.hours,
                        elementId: "flip-card-hours-" + t,
                        show: this.showHours
                    }, {
                        current: 0,
                        previous: 0,
                        label: this.labels.minutes,
                        elementId: "flip-card-minutes-" + t,
                        show: this.showMinutes
                    }, {
                        current: 0,
                        previous: 0,
                        label: this.labels.seconds,
                        elementId: "flip-card-seconds-" + t,
                        show: this.showSeconds
                    }]
                }
            },
            created: function () {
                var t = this;
                if (!this.deadline) throw new Error("Missing props 'deadline'");
                var e = this.deadline;
                if (this.date = Math.trunc(Date.parse(e.replace(/-/g, "/")) / 1e3), !this.date) throw new Error("Invalid props value, correct the 'deadline'");
                this.interval = setInterval(function () {
                    t.now = Math.trunc((new Date).getTime() / 1e3)
                }, 1e3)
            },
            mounted: function () {
                0 !== this.diff && (this.show = !0)
            },
            computed: {
                seconds: function () {
                    return Math.trunc(this.diff) % 60
                },
                minutes: function () {
                    return Math.trunc(this.diff / 60) % 60
                },
                hours: function () {
                    return (Math.trunc(this.diff / 60 / 60) % 24) + 8
                },
                days: function () {
                    return Math.trunc(this.diff / 60 / 60 / 24)
                }
            },
            watch: {
                deadline: function (t, e) {
                    var n = this.deadline;
                    if (this.date = Math.trunc(Date.parse(n.replace(/-/g, "/")) / 1e3), !this.date) throw new Error("Invalid props value, correct the 'deadline'")
                },
                now: function (t) {
                    this.diff = this.now, this.diff <= 0 || this.stop ? (this.diff = 0, this.updateTime(3, 0)) : this.updateAllCards()
                },
                diff: function (t) {
                    0 === t && (this.$emit("timeElapsed"), this.updateAllCards())
                }
            },
            filters: {
                twoDigits: function (t) {
                    return t.toString().length <= 1 ? "0" + t.toString() : t.toString()
                }
            },
            methods: {
                updateAllCards: function () {
                    this.updateTime(0, this.days), this.updateTime(1, this.hours), this.updateTime(2, this.minutes), this.updateTime(3, this.seconds)
                },
                updateTime: function (t, e) {
                    if (!(t >= this.timeData.length || void 0 === e)) {
                        window.requestAnimationFrame && (this.frame = requestAnimationFrame(this.updateTime.bind(this)));
                        var n = this.timeData[t],
                            i = e < 0 ? 0 : e,
                            a = document.querySelector("#" + n.elementId);
                        if (i !== n.current && (n.previous = n.current, n.current = i, a && (a.classList.remove("flip"), a.offsetWidth, a.classList.add("flip")), 0 === t)) {
                            var r = a.querySelectorAll("span b");
                            if (r) {
                                var o = !0,
                                    d = !1,
                                    s = void 0;
                                try {
                                    for (var c, f = r[Symbol.iterator](); !(o = (c = f.next()).done); o = !0) {
                                        var l = c.value,
                                            u = l.classList[0];
                                        if (e / 1e3 >= 1) {
                                            if (!u.includes("-4digits")) {
                                                var p = u + "-4digits";
                                                l.classList.add(p), l.classList.remove(u)
                                            }
                                        } else if (u.includes("-4digits")) {
                                            var v = u.replace("-4digits", "");
                                            l.classList.add(v), l.classList.remove(u)
                                        }
                                    }
                                } catch (t) {
                                    d = !0, s = t
                                } finally {
                                    try {
                                        !o && f.return && f.return()
                                    } finally {
                                        if (d) throw s
                                    }
                                }
                            }
                        }
                    }
                }
            },
            beforeDestroy: function () {
                window.cancelAnimationFrame && cancelAnimationFrame(this.frame)
            },
            destroyed: function () {
                clearInterval(this.interval)
            }
        }
    }, function (t, e, n) {
        "use strict";

        function i(t) {
            n(2)
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        });
        var a = n(0),
            r = n.n(a);
        for (var o in a) "default" !== o && function (t) {
            n.d(e, t, function () {
                return a[t]
            })
        }(o);
        var d = n(10),
            s = n(11),
            c = i,
            f = Object(s.a)(r.a, d.a, d.b, !1, c, "data-v-cff81de8", null);
        e.default = f.exports
    }, function (t, e, n) {
        var i = n(3);
        "string" == typeof i && (i = [
            [t.i, i, ""]
        ]), i.locals && (t.exports = i.locals);
        var a = n(5).default;
        a("49966720", i, !0, {})
    }, function (t, e, n) {
        e = t.exports = n(4)(!1), e.push([t.i, "\n.flip-clock[data-v-cff81de8] {\n  text-align: center;\n  perspective: 600px;\n  margin: 0 auto;\n}\n.flip-clock *[data-v-cff81de8],\n.flip-clock *[data-v-cff81de8]:before,\n.flip-clock *[data-v-cff81de8]:after {\n  box-sizing: border-box;\n}\n.flip-clock__piece[data-v-cff81de8] {\n  display: inline-block;\n  margin: 0 0.2vw;\n}\n@media (min-width: 1000px) {\n.flip-clock__piece[data-v-cff81de8] {\n    margin: 0 5px;\n}\n}\n.flip-clock__slot[data-v-cff81de8] {\n  font-size: 1rem;\n  line-height: 1.5;\n  display: block;\n}\n.flip-card[data-v-cff81de8] {\n  display: block;\n  position: relative;\n  padding-bottom: 0.72em;\n  font-size: 2.25rem;\n  line-height: 0.95;\n}\n@media (min-width: 1000px) {\n.flip-clock__slot[data-v-cff81de8] {\n    font-size: 1.2rem;\n}\n.flip-card[data-v-cff81de8] {\n    font-size: 1.9rem;\n}\n}\n.flip-card__top[data-v-cff81de8],\n.flip-card__bottom[data-v-cff81de8],\n.flip-card__back-bottom[data-v-cff81de8],\n.flip-card__back[data-v-cff81de8]::before,\n.flip-card__back[data-v-cff81de8]::after {\n  display: block;\n  color: #011A3D;\n  background: rgba(215, 215, 215, 1);\n  padding: 0.23em 0.15em 0.4em;\n  border-radius: 0.15em 0.15em 0 0;\n  backface-visibility: hidden;\n  -webkit-backface-visibility: hidden;\n  transform-style: preserve-3d;\n  width: 2.1em;\n  height: 0.72em;\n}\n.flip-card__top-4digits[data-v-cff81de8],\n.flip-card__bottom-4digits[data-v-cff81de8],\n.flip-card__back-bottom-4digits[data-v-cff81de8],\n.flip-card__back-4digits[data-v-cff81de8]::before,\n.flip-card__back-4digits[data-v-cff81de8]::after {\n  display: block;\n  color: #011A3D;\n  background: rgba(215, 215, 215, 1);\n  padding: 0.23em 0.15em 0.4em;\n  border-radius: 0.15em 0.15em 0 0;\n  backface-visibility: hidden;\n  -webkit-backface-visibility: hidden;\n  transform-style: preserve-3d;\n  width: 2.65em;\n  height: 0.72em;\n}\n.flip-card__bottom[data-v-cff81de8],\n.flip-card__back-bottom[data-v-cff81de8],\n.flip-card__bottom-4digits[data-v-cff81de8],\n.flip-card__back-bottom-4digits[data-v-cff81de8] {\n  color: #011A3D;\n  position: absolute;\n  top: 50%;\n  left: 0;\n  border-top: solid 1px rgba(215, 215, 215, 1);\n  background: white;\n  border-radius: 0 0 0.15em 0.15em;\n  pointer-events: none;\n  overflow: hidden;\n  z-index: 2;\n}\n.flip-card__back-bottom[data-v-cff81de8],\n.flip-card__back-bottom-4digits[data-v-cff81de8] {\n  z-index: 1;\n}\n.flip-card__bottom[data-v-cff81de8]::after,\n.flip-card__back-bottom[data-v-cff81de8]::after,\n.flip-card__bottom-4digits[data-v-cff81de8]::after,\n.flip-card__back-bottom-4digits[data-v-cff81de8]::after {\n  display: block;\n  margin-top: -0.72em;\n}\n.flip-card__back[data-v-cff81de8]::before,\n.flip-card__bottom[data-v-cff81de8]::after,\n.flip-card__back-bottom[data-v-cff81de8]::after,\n.flip-card__back-4digits[data-v-cff81de8]::before,\n.flip-card__bottom-4digits[data-v-cff81de8]::after,\n.flip-card__back-bottom-4digits[data-v-cff81de8]::after {\n  content: attr(data-value);\n}\n.flip-card__back[data-v-cff81de8],\n.flip-card__back-4digits[data-v-cff81de8] {\n  position: absolute;\n  top: 0;\n  height: 100%;\n  left: 0%;\n  pointer-events: none;\n}\n.flip-card__back[data-v-cff81de8]::before,\n.flip-card__back-4digits[data-v-cff81de8]::before {\n  position: relative;\n  overflow: hidden;\n  z-index: -1;\n}\n.flip .flip-card__back[data-v-cff81de8]::before,\n.flip .flip-card__back-4digits[data-v-cff81de8]::before {\n  z-index: 1;\n  animation: flipTop-data-v-cff81de8 0.3s cubic-bezier(0.37, 0.01, 0.94, 0.35);\n  animation-fill-mode: both;\n  transform-origin: center bottom;\n}\n.flip .flip-card__bottom[data-v-cff81de8],\n.flip .flip-card__bottom-4digits[data-v-cff81de8] {\n  transform-origin: center top;\n  animation-fill-mode: both;\n  animation: flipBottom-data-v-cff81de8 0.6s cubic-bezier(0.15, 0.45, 0.28, 1);\n}\n@keyframes flipTop-data-v-cff81de8 {\n0% {\n    transform: rotateX(0deg);\n    z-index: 2;\n}\n0%,\n  99% {\n    opacity: 1;\n}\n100% {\n    transform: rotateX(-90deg);\n    opacity: 0;\n}\n}\n@keyframes flipBottom-data-v-cff81de8 {\n0%,\n  50% {\n    z-index: -1;\n    transform: rotateX(90deg);\n    opacity: 0;\n}\n51% {\n    opacity: 1;\n}\n100% {\n    opacity: 1;\n    transform: rotateX(0deg);\n    z-index: 5;\n}\n}\n", ""])
    }, function (t, e, n) {
        "use strict";

        function i(t, e) {
            var n = t[1] || "",
                i = t[3];
            if (!i) return n;
            if (e && "function" == typeof btoa) {
                var r = a(i);
                return [n].concat(i.sources.map(function (t) {
                    return "/*# sourceURL=".concat(i.sourceRoot).concat(t, " */")
                })).concat([r]).join("\n")
            }
            return [n].join("\n")
        }

        function a(t) {
            return "/*# ".concat("sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(t))))), " */")
        }
        t.exports = function (t) {
            var e = [];
            return e.toString = function () {
                return this.map(function (e) {
                    var n = i(e, t);
                    return e[2] ? "@media ".concat(e[2], "{").concat(n, "}") : n
                }).join("")
            }, e.i = function (t, n) {
                "string" == typeof t && (t = [
                    [null, t, ""]
                ]);
                for (var i = {}, a = 0; a < this.length; a++) {
                    var r = this[a][0];
                    null != r && (i[r] = !0)
                }
                for (var o = 0; o < t.length; o++) {
                    var d = t[o];
                    null != d[0] && i[d[0]] || (n && !d[2] ? d[2] = n : n && (d[2] = "(".concat(d[2], ") and (").concat(n, ")")), e.push(d))
                }
            }, e
        }
    }, function (t, e, n) {
        "use strict";

        function i(t, e, n, i) {
            h = n, b = i || {};
            var r = Object(c.a)(t, e);
            return a(r),
                function (e) {
                    for (var n = [], i = 0; i < r.length; i++) {
                        var o = r[i],
                            d = l[o.id];
                        d.refs--, n.push(d)
                    }
                    e ? (r = Object(c.a)(t, e), a(r)) : r = [];
                    for (var i = 0; i < n.length; i++) {
                        var d = n[i];
                        if (0 === d.refs) {
                            for (var s = 0; s < d.parts.length; s++) d.parts[s]();
                            delete l[d.id]
                        }
                    }
                }
        }

        function a(t) {
            for (var e = 0; e < t.length; e++) {
                var n = t[e],
                    i = l[n.id];
                if (i) {
                    i.refs++;
                    for (var a = 0; a < i.parts.length; a++) i.parts[a](n.parts[a]);
                    for (; a < n.parts.length; a++) i.parts.push(o(n.parts[a]));
                    i.parts.length > n.parts.length && (i.parts.length = n.parts.length)
                } else {
                    for (var r = [], a = 0; a < n.parts.length; a++) r.push(o(n.parts[a]));
                    l[n.id] = {
                        id: n.id,
                        refs: 1,
                        parts: r
                    }
                }
            }
        }

        function r() {
            var t = document.createElement("style");
            return t.type = "text/css", u.appendChild(t), t
        }

        function o(t) {
            var e, n, i = document.querySelector("style[" + _ + '~="' + t.id + '"]');
            if (i) {
                if (h) return m;
                i.parentNode.removeChild(i)
            }
            if (g) {
                var a = v++;
                i = p || (p = r()), e = d.bind(null, i, a, !1), n = d.bind(null, i, a, !0)
            } else i = r(), e = s.bind(null, i), n = function () {
                i.parentNode.removeChild(i)
            };
            return e(t),
                function (i) {
                    if (i) {
                        if (i.css === t.css && i.media === t.media && i.sourceMap === t.sourceMap) return;
                        e(t = i)
                    } else n()
                }
        }

        function d(t, e, n, i) {
            var a = n ? "" : i.css;
            if (t.styleSheet) t.styleSheet.cssText = y(e, a);
            else {
                var r = document.createTextNode(a),
                    o = t.childNodes;
                o[e] && t.removeChild(o[e]), o.length ? t.insertBefore(r, o[e]) : t.appendChild(r)
            }
        }

        function s(t, e) {
            var n = e.css,
                i = e.media,
                a = e.sourceMap;
            if (i && t.setAttribute("media", i), b.ssrId && t.setAttribute(_, e.id), a && (n += "\n/*# sourceURL=" + a.sources[0] + " */", n += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(a)))) + " */"), t.styleSheet) t.styleSheet.cssText = n;
            else {
                for (; t.firstChild;) t.removeChild(t.firstChild);
                t.appendChild(document.createTextNode(n))
            }
        }
        Object.defineProperty(e, "__esModule", {
            value: !0
        }), e.default = i;
        var c = n(6),
            f = "undefined" != typeof document;
        if ("undefined" != typeof DEBUG && DEBUG && !f) throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");
        var l = {},
            u = f && (document.head || document.getElementsByTagName("head")[0]),
            p = null,
            v = 0,
            h = !1,
            m = function () { },
            b = null,
            _ = "data-vue-ssr-id",
            g = "undefined" != typeof navigator && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase()),
            y = function () {
                var t = [];
                return function (e, n) {
                    return t[e] = n, t.filter(Boolean).join("\n")
                }
            }()
    }, function (t, e, n) {
        "use strict";

        function i(t, e) {
            for (var n = [], i = {}, a = 0; a < e.length; a++) {
                var r = e[a],
                    o = r[0],
                    d = r[1],
                    s = r[2],
                    c = r[3],
                    f = {
                        id: t + ":" + a,
                        css: d,
                        media: s,
                        sourceMap: c
                    };
                i[o] ? i[o].parts.push(f) : n.push(i[o] = {
                    id: o,
                    parts: [f]
                })
            }
            return n
        }
        e.a = i
    }, function (t, e, n) {
        function i(t, e, n) {
            var i = e && n || 0;
            "string" == typeof t && (e = "binary" === t ? new Array(16) : null, t = null), t = t || {};
            var o = t.random || (t.rng || a)();
            if (o[6] = 15 & o[6] | 64, o[8] = 63 & o[8] | 128, e)
                for (var d = 0; d < 16; ++d) e[i + d] = o[d];
            return e || r(o)
        }
        var a = n(8),
            r = n(9);
        t.exports = i
    }, function (t, e) {
        var n = "undefined" != typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || "undefined" != typeof msCrypto && "function" == typeof window.msCrypto.getRandomValues && msCrypto.getRandomValues.bind(msCrypto);
        if (n) {
            var i = new Uint8Array(16);
            t.exports = function () {
                return n(i), i
            }
        } else {
            var a = new Array(16);
            t.exports = function () {
                for (var t, e = 0; e < 16; e++) 0 == (3 & e) && (t = 4294967296 * Math.random()), a[e] = t >>> ((3 & e) << 3) & 255;
                return a
            }
        }
    }, function (t, e) {
        function n(t, e) {
            var n = e || 0,
                a = i;
            return [a[t[n++]], a[t[n++]], a[t[n++]], a[t[n++]], "-", a[t[n++]], a[t[n++]], "-", a[t[n++]], a[t[n++]], "-", a[t[n++]], a[t[n++]], "-", a[t[n++]], a[t[n++]], a[t[n++]], a[t[n++]], a[t[n++]], a[t[n++]]].join("")
        }
        for (var i = [], a = 0; a < 256; ++a) i[a] = (a + 256).toString(16).substr(1);
        t.exports = n
    }, function (t, e, n) {
        "use strict";
        n.d(e, "a", function () {
            return i
        }), n.d(e, "b", function () {
            return a
        });
        var i = function () {
            var t = this,
                e = t.$createElement,
                n = t._self._c || e;
            return n("div", {
                staticClass: "container flip-clock"
            }, [t._l(t.timeData, function (e, index) {
                return [index == 0 || index == 1 ? n("span") : n("i", { staticClass: "fas fa-ellipsis-v", style: 'color: white; padding: 0px 2px;' }), n("span", {
                    directives: [{
                        name: "show",
                        rawName: "v-show",
                        value: e.show,
                        expression: "data.show"
                    }],
                    key: e.elementId,
                    staticClass: "flip-clock__piece",
                    attrs: {
                        id: e.elementId
                    }
                }, [n("span", {
                    staticClass: "flip-clock__card flip-card",
                    style: t.countdownSize ? "font-size:" + t.countdownSize : ""
                }, [n("b", {
                    staticClass: "flip-card__top"
                }, [t._v(t._s(t._f("twoDigits")(e.current)))]), t._v(" "), n("b", {
                    staticClass: "flip-card__bottom",
                    attrs: {
                        "data-value": t._f("twoDigits")(e.current)
                    }
                }), t._v(" "), n("b", {
                    staticClass: "flip-card__back",
                    attrs: {
                        "data-value": t._f("twoDigits")(e.previous)
                    }
                }), t._v(" "), n("b", {
                    staticClass: "flip-card__back-bottom",
                    attrs: {
                        "data-value": t._f("twoDigits")(e.previous)
                    }
                })]), t._v(" "), n("span", {
                    staticClass: "flip-clock__slot",
                    style: t.labelSize ? "font-size:" + t.labelSize : ""
                }, [t._v(t._s(e.label))])]),]
            })], 2)
        },
            a = []
    }, function (t, e, n) {
        "use strict";

        function i(t, e, n, i, a, r, o, d) {
            t = t || {};
            var s = typeof t.default;
            "object" !== s && "function" !== s || (t = t.default);
            var c = "function" == typeof t ? t.options : t;
            e && (c.render = e, c.staticRenderFns = n, c._compiled = !0), i && (c.functional = !0), r && (c._scopeId = r);
            var f;
            if (o ? (f = function (t) {
                t = t || this.$vnode && this.$vnode.ssrContext || this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext, t || "undefined" == typeof __VUE_SSR_CONTEXT__ || (t = __VUE_SSR_CONTEXT__), a && a.call(this, t), t && t._registeredComponents && t._registeredComponents.add(o)
            }, c._ssrRegister = f) : a && (f = d ? function () {
                a.call(this, this.$root.$options.shadowRoot)
            } : a), f)
                if (c.functional) {
                    c._injectStyles = f;
                    var l = c.render;
                    c.render = function (t, e) {
                        return f.call(e), l(t, e)
                    }
                } else {
                    var u = c.beforeCreate;
                    c.beforeCreate = u ? [].concat(u, f) : [f]
                } return {
                    exports: t,
                    options: c
                }
        }
        e.a = i
    }])
});