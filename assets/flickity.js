!(function (t, e) {
  "function" == typeof define && define.amd
    ? define("jquery-bridget/jquery-bridget", ["jquery"], function (i) {
        return e(t, i);
      })
    : "object" == typeof module && module.exports
    ? (module.exports = e(t, require("jquery")))
    : (t.jQueryBridget = e(t, t.jQuery));
})(window, function (t, e) {
  "use strict";
  var i = Array.prototype.slice,
    n = t.console,
    s =
      void 0 === n
        ? function () {}
        : function (t) {
            n.error(t);
          };
  function o(n, o, a) {
    (a = a || e || t.jQuery) &&
      (o.prototype.option ||
        (o.prototype.option = function (t) {
          a.isPlainObject(t) && (this.options = a.extend(!0, this.options, t));
        }),
      (a.fn[n] = function (t) {
        return "string" == typeof t
          ? (function (t, e, i) {
              var o,
                r = "$()." + n + '("' + e + '")';
              return (
                t.each(function (t, l) {
                  var h = a.data(l, n);
                  if (h) {
                    var c = h[e];
                    if (c && "_" != e.charAt(0)) {
                      var d = c.apply(h, i);
                      o = void 0 === o ? d : o;
                    } else s(r + " is not a valid method");
                  } else s(n + " not initialized. Cannot call methods, i.e. " + r);
                }),
                void 0 !== o ? o : t
              );
            })(this, t, i.call(arguments, 1))
          : ((function (t, e) {
              t.each(function (t, i) {
                var s = a.data(i, n);
                s
                  ? (s.option(e), s._init())
                  : ((s = new o(i, e)), a.data(i, n, s));
              });
            })(this, t),
            this);
      }),
      r(a));
  }
  function r(t) {
    !t || (t && t.bridget) || (t.bridget = o);
  }
  return r(e || t.jQuery), o;
}),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define("ev-emitter/ev-emitter", e)
      : "object" == typeof module && module.exports
      ? (module.exports = e())
      : (t.EvEmitter = e());
  })("undefined" != typeof window ? window : this, function () {
    function t() {}
    var e = t.prototype;
    return (
      (e.on = function (t, e) {
        if (t && e) {
          var i = (this._events = this._events || {}),
            n = (i[t] = i[t] || []);
          return -1 == n.indexOf(e) && n.push(e), this;
        }
      }),
      (e.once = function (t, e) {
        if (t && e) {
          this.on(t, e);
          var i = (this._onceEvents = this._onceEvents || {});
          return ((i[t] = i[t] || {})[e] = !0), this;
        }
      }),
      (e.off = function (t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
          var n = i.indexOf(e);
          return -1 != n && i.splice(n, 1), this;
        }
      }),
      (e.emitEvent = function (t, e) {
        var i = this._events && this._events[t];
        if (i && i.length) {
          (i = i.slice(0)), (e = e || []);
          for (
            var n = this._onceEvents && this._onceEvents[t], s = 0;
            s < i.length;
            s++
          ) {
            var o = i[s];
            n && n[o] && (this.off(t, o), delete n[o]), o.apply(this, e);
          }
          return this;
        }
      }),
      (e.allOff = function () {
        delete this._events, delete this._onceEvents;
      }),
      t
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define("get-size/get-size", e)
      : "object" == typeof module && module.exports
      ? (module.exports = e())
      : (t.getSize = e());
  })(window, function () {
    "use strict";
    function t(t) {
      var e = parseFloat(t);
      return -1 == t.indexOf("%") && !isNaN(e) && e;
    }
    var e =
        "undefined" == typeof console
          ? function () {}
          : function (t) {
              console.error(t);
            },
      i = [
        "paddingLeft",
        "paddingRight",
        "paddingTop",
        "paddingBottom",
        "marginLeft",
        "marginRight",
        "marginTop",
        "marginBottom",
        "borderLeftWidth",
        "borderRightWidth",
        "borderTopWidth",
        "borderBottomWidth",
      ],
      n = i.length;
    function s(t) {
      var i = getComputedStyle(t);
      return (
        i ||
          e(
            "Style returned " +
              i +
              ". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1"
          ),
        i
      );
    }
    var o,
      r = !1;
    function a() {
      if (!r) {
        r = !0;
        var e = document.createElement("div");
        (e.style.width = "200px"),
          (e.style.padding = "1px 2px 3px 4px"),
          (e.style.borderStyle = "solid"),
          (e.style.borderWidth = "1px 2px 3px 4px"),
          (e.style.boxSizing = "border-box");
        var i = document.body || document.documentElement;
        i.appendChild(e);
        var n = s(e);
        (o = 200 == Math.round(t(n.width))),
          (l.isBoxSizeOuter = o),
          i.removeChild(e);
      }
    }
    function l(e) {
      if (
        (a(),
        "string" == typeof e && (e = document.querySelector(e)),
        e && "object" == typeof e && e.nodeType)
      ) {
        var r = s(e);
        if ("none" == r.display)
          return (function () {
            for (
              var t = {
                  width: 0,
                  height: 0,
                  innerWidth: 0,
                  innerHeight: 0,
                  outerWidth: 0,
                  outerHeight: 0,
                },
                e = 0;
              e < n;
              e++
            )
              t[i[e]] = 0;
            return t;
          })();
        var l = {};
        (l.width = e.offsetWidth), (l.height = e.offsetHeight);
        for (
          var h = (l.isBorderBox = "border-box" == r.boxSizing), c = 0;
          c < n;
          c++
        ) {
          var d = i[c],
            u = r[d],
            f = parseFloat(u);
          l[d] = isNaN(f) ? 0 : f;
        }
        var p = l.paddingLeft + l.paddingRight,
          g = l.paddingTop + l.paddingBottom,
          v = l.marginLeft + l.marginRight,
          m = l.marginTop + l.marginBottom,
          y = l.borderLeftWidth + l.borderRightWidth,
          b = l.borderTopWidth + l.borderBottomWidth,
          E = h && o,
          S = t(r.width);
        !1 !== S && (l.width = S + (E ? 0 : p + y));
        var C = t(r.height);
        return (
          !1 !== C && (l.height = C + (E ? 0 : g + b)),
          (l.innerWidth = l.width - (p + y)),
          (l.innerHeight = l.height - (g + b)),
          (l.outerWidth = l.width + v),
          (l.outerHeight = l.height + m),
          l
        );
      }
    }
    return l;
  }),
  (function (t, e) {
    "use strict";
    "function" == typeof define && define.amd
      ? define("desandro-matches-selector/matches-selector", e)
      : "object" == typeof module && module.exports
      ? (module.exports = e())
      : (t.matchesSelector = e());
  })(window, function () {
    "use strict";
    var t = (function () {
      var t = window.Element.prototype;
      if (t.matches) return "matches";
      if (t.matchesSelector) return "matchesSelector";
      for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
        var n = e[i] + "MatchesSelector";
        if (t[n]) return n;
      }
    })();
    return function (e, i) {
      return e[t](i);
    };
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          "fizzy-ui-utils/utils",
          ["desandro-matches-selector/matches-selector"],
          function (i) {
            return e(t, i);
          }
        )
      : "object" == typeof module && module.exports
      ? (module.exports = e(t, require("desandro-matches-selector")))
      : (t.fizzyUIUtils = e(t, t.matchesSelector));
  })(window, function (t, e) {
    var i = {
        extend: function (t, e) {
          for (var i in e) t[i] = e[i];
          return t;
        },
        modulo: function (t, e) {
          return ((t % e) + e) % e;
        },
      },
      n = Array.prototype.slice;
    (i.makeArray = function (t) {
      return Array.isArray(t)
        ? t
        : null == t
        ? []
        : "object" == typeof t && "number" == typeof t.length
        ? n.call(t)
        : [t];
    }),
      (i.removeFrom = function (t, e) {
        var i = t.indexOf(e);
        -1 != i && t.splice(i, 1);
      }),
      (i.getParent = function (t, i) {
        for (; t.parentNode && t != document.body; )
          if (((t = t.parentNode), e(t, i))) return t;
      }),
      (i.getQueryElement = function (t) {
        return "string" == typeof t ? document.querySelector(t) : t;
      }),
      (i.handleEvent = function (t) {
        var e = "on" + t.type;
        this[e] && this[e](t);
      }),
      (i.filterFindElements = function (t, n) {
        t = i.makeArray(t);
        var s = [];
        return (
          t.forEach(function (t) {
            if (t instanceof HTMLElement)
              if (n) {
                e(t, n) && s.push(t);
                for (var i = t.querySelectorAll(n), o = 0; o < i.length; o++)
                  s.push(i[o]);
              } else s.push(t);
          }),
          s
        );
      }),
      (i.debounceMethod = function (t, e, i) {
        i = i || 100;
        var n = t.prototype[e],
          s = e + "Timeout";
        t.prototype[e] = function () {
          var t = this[s];
          clearTimeout(t);
          var e = arguments,
            o = this;
          this[s] = setTimeout(function () {
            n.apply(o, e), delete o[s];
          }, i);
        };
      }),
      (i.docReady = function (t) {
        var e = document.readyState;
        "complete" == e || "interactive" == e
          ? setTimeout(t)
          : document.addEventListener("DOMContentLoaded", t);
      }),
      (i.toDashed = function (t) {
        return t
          .replace(/(.)([A-Z])/g, function (t, e, i) {
            return e + "-" + i;
          })
          .toLowerCase();
      });
    var s = t.console;
    return (
      (i.htmlInit = function (e, n) {
        i.docReady(function () {
          var o = i.toDashed(n),
            r = "data-" + o,
            a = document.querySelectorAll("[" + r + "]"),
            l = document.querySelectorAll(".js-" + o),
            h = i.makeArray(a).concat(i.makeArray(l)),
            c = r + "-options",
            d = t.jQuery;
          h.forEach(function (t) {
            var i,
              o = t.getAttribute(r) || t.getAttribute(c);
            try {
              i = o && JSON.parse(o);
            } catch (o) {
              return void (
                s &&
                s.error("Error parsing " + r + " on " + t.className + ": " + o)
              );
            }
            var a = new e(t, i);
            d && d.data(t, n, a);
          });
        });
      }),
      i
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define("flickity/js/cell", ["get-size/get-size"], function (i) {
          return e(t, i);
        })
      : "object" == typeof module && module.exports
      ? (module.exports = e(t, require("get-size")))
      : ((t.Flickity = t.Flickity || {}), (t.Flickity.Cell = e(t, t.getSize)));
  })(window, function (t, e) {
    function i(t, e) {
      (this.element = t), (this.parent = e), this.create();
    }
    var n = i.prototype;
    return (
      (n.create = function () {
        (this.element.style.position = "absolute"),
          this.element.setAttribute("aria-hidden", "true"),
          (this.x = 0),
          (this.shift = 0);
      }),
      (n.destroy = function () {
        this.unselect(), (this.element.style.position = "");
        var t = this.parent.originSide;
        (this.element.style[t] = ""),
          this.element.removeAttribute("aria-hidden");
      }),
      (n.getSize = function () {
        this.size = e(this.element);
      }),
      (n.setPosition = function (t) {
        (this.x = t), this.updateTarget(), this.renderPosition(t);
      }),
      (n.updateTarget = n.setDefaultTarget =
        function () {
          var t =
            "left" == this.parent.originSide ? "marginLeft" : "marginRight";
          this.target =
            this.x + this.size[t] + this.size.width * this.parent.cellAlign;
        }),
      (n.renderPosition = function (t) {
        var e = this.parent.originSide;
        this.element.style[e] = this.parent.getPositionValue(t);
      }),
      (n.select = function () {
        this.element.classList.add("is-selected"),
          this.element.removeAttribute("aria-hidden");
      }),
      (n.unselect = function () {
        this.element.classList.remove("is-selected"),
          this.element.setAttribute("aria-hidden", "true");
      }),
      (n.wrapShift = function (t) {
        (this.shift = t),
          this.renderPosition(this.x + this.parent.slideableWidth * t);
      }),
      (n.remove = function () {
        this.element.parentNode.removeChild(this.element);
      }),
      i
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define("flickity/js/slide", e)
      : "object" == typeof module && module.exports
      ? (module.exports = e())
      : ((t.Flickity = t.Flickity || {}), (t.Flickity.Slide = e()));
  })(window, function () {
    "use strict";
    function t(t) {
      (this.parent = t),
        (this.isOriginLeft = "left" == t.originSide),
        (this.cells = []),
        (this.outerWidth = 0),
        (this.height = 0);
    }
    var e = t.prototype;
    return (
      (e.addCell = function (t) {
        if (
          (this.cells.push(t),
          (this.outerWidth += t.size.outerWidth),
          (this.height = Math.max(t.size.outerHeight, this.height)),
          1 == this.cells.length)
        ) {
          this.x = t.x;
          var e = this.isOriginLeft ? "marginLeft" : "marginRight";
          this.firstMargin = t.size[e];
        }
      }),
      (e.updateTarget = function () {
        var t = this.isOriginLeft ? "marginRight" : "marginLeft",
          e = this.getLastCell(),
          i = e ? e.size[t] : 0,
          n = this.outerWidth - (this.firstMargin + i);
        this.target = this.x + this.firstMargin + n * this.parent.cellAlign;
      }),
      (e.getLastCell = function () {
        return this.cells[this.cells.length - 1];
      }),
      (e.select = function () {
        this.cells.forEach(function (t) {
          t.select();
        });
      }),
      (e.unselect = function () {
        this.cells.forEach(function (t) {
          t.unselect();
        });
      }),
      (e.getCellElements = function () {
        return this.cells.map(function (t) {
          return t.element;
        });
      }),
      t
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define("flickity/js/animate", ["fizzy-ui-utils/utils"], function (i) {
          return e(t, i);
        })
      : "object" == typeof module && module.exports
      ? (module.exports = e(t, require("fizzy-ui-utils")))
      : ((t.Flickity = t.Flickity || {}),
        (t.Flickity.animatePrototype = e(t, t.fizzyUIUtils)));
  })(window, function (t, e) {
    var i = {
      startAnimation: function () {
        this.isAnimating ||
          ((this.isAnimating = !0), (this.restingFrames = 0), this.animate());
      },
      animate: function () {
        this.applyDragForce(), this.applySelectedAttraction();
        var t = this.x;
        if (
          (this.integratePhysics(),
          this.positionSlider(),
          this.settle(t),
          this.isAnimating)
        ) {
          var e = this;
          requestAnimationFrame(function () {
            e.animate();
          });
        }
      },
      positionSlider: function () {
        var t = this.x;
        this.options.wrapAround &&
          this.cells.length > 1 &&
          ((t = e.modulo(t, this.slideableWidth)),
          (t -= this.slideableWidth),
          this.shiftWrapCells(t)),
          this.setTranslateX(t, this.isAnimating),
          this.dispatchScrollEvent();
      },
      setTranslateX: function (t, e) {
        (t += this.cursorPosition), (t = this.options.rightToLeft ? -t : t);
        var i = this.getPositionValue(t);
        this.slider.style.transform = e
          ? "translate3d(" + i + ",0,0)"
          : "translateX(" + i + ")";
      },
      dispatchScrollEvent: function () {
        var t = this.slides[0];
        if (t) {
          var e = -this.x - t.target,
            i = e / this.slidesWidth;
          this.dispatchEvent("scroll", null, [i, e]);
        }
      },
      positionSliderAtSelected: function () {
        this.cells.length &&
          ((this.x = -this.selectedSlide.target),
          (this.velocity = 0),
          this.positionSlider());
      },
      getPositionValue: function (t) {
        return this.options.percentPosition
          ? 0.01 * Math.round((t / this.size.innerWidth) * 1e4) + "%"
          : Math.round(t) + "px";
      },
      settle: function (t) {
        !this.isPointerDown &&
          Math.round(100 * this.x) == Math.round(100 * t) &&
          this.restingFrames++,
          this.restingFrames > 2 &&
            ((this.isAnimating = !1),
            delete this.isFreeScrolling,
            this.positionSlider(),
            this.dispatchEvent("settle", null, [this.selectedIndex]));
      },
      shiftWrapCells: function (t) {
        var e = this.cursorPosition + t;
        this._shiftCells(this.beforeShiftCells, e, -1);
        var i =
          this.size.innerWidth -
          (t + this.slideableWidth + this.cursorPosition);
        this._shiftCells(this.afterShiftCells, i, 1);
      },
      _shiftCells: function (t, e, i) {
        for (var n = 0; n < t.length; n++) {
          var s = t[n],
            o = e > 0 ? i : 0;
          s.wrapShift(o), (e -= s.size.outerWidth);
        }
      },
      _unshiftCells: function (t) {
        if (t && t.length) for (var e = 0; e < t.length; e++) t[e].wrapShift(0);
      },
      integratePhysics: function () {
        (this.x += this.velocity), (this.velocity *= this.getFrictionFactor());
      },
      applyForce: function (t) {
        this.velocity += t;
      },
      getFrictionFactor: function () {
        return (
          1 -
          this.options[this.isFreeScrolling ? "freeScrollFriction" : "friction"]
        );
      },
      getRestingPosition: function () {
        return this.x + this.velocity / (1 - this.getFrictionFactor());
      },
      applyDragForce: function () {
        if (this.isDraggable && this.isPointerDown) {
          var t = this.dragX - this.x - this.velocity;
          this.applyForce(t);
        }
      },
      applySelectedAttraction: function () {
        if (
          !(this.isDraggable && this.isPointerDown) &&
          !this.isFreeScrolling &&
          this.slides.length
        ) {
          var t =
            (-1 * this.selectedSlide.target - this.x) *
            this.options.selectedAttraction;
          this.applyForce(t);
        }
      },
    };
    return i;
  }),
  (function (t, e) {
    if ("function" == typeof define && define.amd)
      define("flickity/js/flickity", [
        "ev-emitter/ev-emitter",
        "get-size/get-size",
        "fizzy-ui-utils/utils",
        "./cell",
        "./slide",
        "./animate",
      ], function (i, n, s, o, r, a) {
        return e(t, i, n, s, o, r, a);
      });
    else if ("object" == typeof module && module.exports)
      module.exports = e(
        t,
        require("ev-emitter"),
        require("get-size"),
        require("fizzy-ui-utils"),
        require("./cell"),
        require("./slide"),
        require("./animate")
      );
    else {
      var i = t.Flickity;
      t.Flickity = e(
        t,
        t.EvEmitter,
        t.getSize,
        t.fizzyUIUtils,
        i.Cell,
        i.Slide,
        i.animatePrototype
      );
    }
  })(window, function (t, e, i, n, s, o, r) {
    var a = t.jQuery,
      l = t.getComputedStyle,
      h = t.console;
    function c(t, e) {
      for (t = n.makeArray(t); t.length; ) e.appendChild(t.shift());
    }
    var d = 0,
      u = {};
    function f(t, e) {
      var i = n.getQueryElement(t);
      if (i) {
        if (((this.element = i), this.element.flickityGUID)) {
          var s = u[this.element.flickityGUID];
          return s && s.option(e), s;
        }
        a && (this.$element = a(this.element)),
          (this.options = n.extend({}, this.constructor.defaults)),
          this.option(e),
          this._create();
      } else h && h.error("Bad element for Flickity: " + (i || t));
    }
    (f.defaults = {
      accessibility: !0,
      cellAlign: "center",
      freeScrollFriction: 0.075,
      friction: 0.28,
      namespaceJQueryEvents: !0,
      percentPosition: !0,
      resize: !0,
      selectedAttraction: 0.025,
      setGallerySize: !0,
    }),
      (f.createMethods = []);
    var p = f.prototype;
    n.extend(p, e.prototype),
      (p._create = function () {
        var e = (this.guid = ++d);
        for (var i in ((this.element.flickityGUID = e),
        (u[e] = this),
        (this.selectedIndex = 0),
        (this.restingFrames = 0),
        (this.x = 0),
        (this.velocity = 0),
        (this.originSide = this.options.rightToLeft ? "right" : "left"),
        (this.viewport = document.createElement("div")),
        (this.viewport.className = "flickity-viewport"),
        this._createSlider(),
        (this.options.resize || this.options.watchCSS) &&
          t.addEventListener("resize", this),
        this.options.on)) {
          var n = this.options.on[i];
          this.on(i, n);
        }
        f.createMethods.forEach(function (t) {
          this[t]();
        }, this),
          this.options.watchCSS ? this.watchCSS() : this.activate();
      }),
      (p.option = function (t) {
        n.extend(this.options, t);
      }),
      (p.activate = function () {
        this.isActive ||
          ((this.isActive = !0),
          this.element.classList.add("flickity-enabled"),
          this.options.rightToLeft &&
            this.element.classList.add("flickity-rtl"),
          this.getSize(),
          c(this._filterFindCellElements(this.element.children), this.slider),
          this.viewport.appendChild(this.slider),
          this.element.appendChild(this.viewport),
          this.reloadCells(),
          this.options.accessibility &&
            ((this.element.tabIndex = 0),
            this.element.addEventListener("keydown", this)),
          this.emitEvent("activate"),
          this.selectInitialIndex(),
          (this.isInitActivated = !0),
          this.dispatchEvent("ready"));
      }),
      (p._createSlider = function () {
        var t = document.createElement("div");
        (t.className = "flickity-slider"),
          (t.style[this.originSide] = 0),
          (this.slider = t);
      }),
      (p._filterFindCellElements = function (t) {
        return n.filterFindElements(t, this.options.cellSelector);
      }),
      (p.reloadCells = function () {
        (this.cells = this._makeCells(this.slider.children)),
          this.positionCells(),
          this._getWrapShiftCells(),
          this.setGallerySize();
      }),
      (p._makeCells = function (t) {
        return this._filterFindCellElements(t).map(function (t) {
          return new s(t, this);
        }, this);
      }),
      (p.getLastCell = function () {
        return this.cells[this.cells.length - 1];
      }),
      (p.getLastSlide = function () {
        return this.slides[this.slides.length - 1];
      }),
      (p.positionCells = function () {
        this._sizeCells(this.cells), this._positionCells(0);
      }),
      (p._positionCells = function (t) {
        (t = t || 0), (this.maxCellHeight = (t && this.maxCellHeight) || 0);
        var e = 0;
        if (t > 0) {
          var i = this.cells[t - 1];
          e = i.x + i.size.outerWidth;
        }
        for (var n = this.cells.length, s = t; s < n; s++) {
          var o = this.cells[s];
          o.setPosition(e),
            (e += o.size.outerWidth),
            (this.maxCellHeight = Math.max(
              o.size.outerHeight,
              this.maxCellHeight
            ));
        }
        (this.slideableWidth = e),
          this.updateSlides(),
          this._containSlides(),
          (this.slidesWidth = n
            ? this.getLastSlide().target - this.slides[0].target
            : 0);
      }),
      (p._sizeCells = function (t) {
        t.forEach(function (t) {
          t.getSize();
        });
      }),
      (p.updateSlides = function () {
        if (((this.slides = []), this.cells.length)) {
          var t = new o(this);
          this.slides.push(t);
          var e = "left" == this.originSide ? "marginRight" : "marginLeft",
            i = this._getCanCellFit();
          this.cells.forEach(function (n, s) {
            if (t.cells.length) {
              var r =
                t.outerWidth - t.firstMargin + (n.size.outerWidth - n.size[e]);
              i.call(this, s, r)
                ? t.addCell(n)
                : (t.updateTarget(),
                  (t = new o(this)),
                  this.slides.push(t),
                  t.addCell(n));
            } else t.addCell(n);
          }, this),
            t.updateTarget(),
            this.updateSelectedSlide();
        }
      }),
      (p._getCanCellFit = function () {
        var t = this.options.groupCells;
        if (!t)
          return function () {
            return !1;
          };
        if ("number" == typeof t) {
          var e = parseInt(t, 10);
          return function (t) {
            return t % e != 0;
          };
        }
        var i = "string" == typeof t && t.match(/^(\d+)%$/),
          n = i ? parseInt(i[1], 10) / 100 : 1;
        return function (t, e) {
          return e <= (this.size.innerWidth + 1) * n;
        };
      }),
      (p._init = p.reposition =
        function () {
          this.positionCells(), this.positionSliderAtSelected();
        }),
      (p.getSize = function () {
        (this.size = i(this.element)),
          this.setCellAlign(),
          (this.cursorPosition = this.size.innerWidth * this.cellAlign);
      });
    var g = {
      center: { left: 0.5, right: 0.5 },
      left: { left: 0, right: 1 },
      right: { right: 0, left: 1 },
    };
    return (
      (p.setCellAlign = function () {
        var t = g[this.options.cellAlign];
        this.cellAlign = t ? t[this.originSide] : this.options.cellAlign;
      }),
      (p.setGallerySize = function () {
        if (this.options.setGallerySize) {
          var t =
            this.options.adaptiveHeight && this.selectedSlide
              ? this.selectedSlide.height
              : this.maxCellHeight;
          this.viewport.style.height = t + "px";
        }
      }),
      (p._getWrapShiftCells = function () {
        if (this.options.wrapAround) {
          this._unshiftCells(this.beforeShiftCells),
            this._unshiftCells(this.afterShiftCells);
          var t = this.cursorPosition,
            e = this.cells.length - 1;
          (this.beforeShiftCells = this._getGapCells(t, e, -1)),
            (t = this.size.innerWidth - this.cursorPosition),
            (this.afterShiftCells = this._getGapCells(t, 0, 1));
        }
      }),
      (p._getGapCells = function (t, e, i) {
        for (var n = []; t > 0; ) {
          var s = this.cells[e];
          if (!s) break;
          n.push(s), (e += i), (t -= s.size.outerWidth);
        }
        return n;
      }),
      (p._containSlides = function () {
        if (
          this.options.contain &&
          !this.options.wrapAround &&
          this.cells.length
        ) {
          var t = this.options.rightToLeft,
            e = t ? "marginRight" : "marginLeft",
            i = t ? "marginLeft" : "marginRight",
            n = this.slideableWidth - this.getLastCell().size[i],
            s = n < this.size.innerWidth,
            o = this.cursorPosition + this.cells[0].size[e],
            r = n - this.size.innerWidth * (1 - this.cellAlign);
          this.slides.forEach(function (t) {
            s
              ? (t.target = n * this.cellAlign)
              : ((t.target = Math.max(t.target, o)),
                (t.target = Math.min(t.target, r)));
          }, this);
        }
      }),
      (p.dispatchEvent = function (t, e, i) {
        var n = e ? [e].concat(i) : i;
        if ((this.emitEvent(t, n), a && this.$element)) {
          var s = (t += this.options.namespaceJQueryEvents ? ".flickity" : "");
          if (e) {
            var o = new a.Event(e);
            (o.type = t), (s = o);
          }
          this.$element.trigger(s, i);
        }
      }),
      (p.select = function (t, e, i) {
        if (
          this.isActive &&
          ((t = parseInt(t, 10)),
          this._wrapSelect(t),
          (this.options.wrapAround || e) &&
            (t = n.modulo(t, this.slides.length)),
          this.slides[t])
        ) {
          var s = this.selectedIndex;
          (this.selectedIndex = t),
            this.updateSelectedSlide(),
            i ? this.positionSliderAtSelected() : this.startAnimation(),
            this.options.adaptiveHeight && this.setGallerySize(),
            this.dispatchEvent("select", null, [t]),
            t != s && this.dispatchEvent("change", null, [t]),
            this.dispatchEvent("cellSelect");
        }
      }),
      (p._wrapSelect = function (t) {
        var e = this.slides.length;
        if (!(this.options.wrapAround && e > 1)) return t;
        var i = n.modulo(t, e),
          s = Math.abs(i - this.selectedIndex),
          o = Math.abs(i + e - this.selectedIndex),
          r = Math.abs(i - e - this.selectedIndex);
        !this.isDragSelect && o < s
          ? (t += e)
          : !this.isDragSelect && r < s && (t -= e),
          t < 0
            ? (this.x -= this.slideableWidth)
            : t >= e && (this.x += this.slideableWidth);
      }),
      (p.previous = function (t, e) {
        this.select(this.selectedIndex - 1, t, e);
      }),
      (p.next = function (t, e) {
        this.select(this.selectedIndex + 1, t, e);
      }),
      (p.updateSelectedSlide = function () {
        var t = this.slides[this.selectedIndex];
        t &&
          (this.unselectSelectedSlide(),
          (this.selectedSlide = t),
          t.select(),
          (this.selectedCells = t.cells),
          (this.selectedElements = t.getCellElements()),
          (this.selectedCell = t.cells[0]),
          (this.selectedElement = this.selectedElements[0]));
      }),
      (p.unselectSelectedSlide = function () {
        this.selectedSlide && this.selectedSlide.unselect();
      }),
      (p.selectInitialIndex = function () {
        var t = this.options.initialIndex;
        if (this.isInitActivated) this.select(this.selectedIndex, !1, !0);
        else {
          if (t && "string" == typeof t)
            if (this.queryCell(t)) return void this.selectCell(t, !1, !0);
          var e = 0;
          t && this.slides[t] && (e = t), this.select(e, !1, !0);
        }
      }),
      (p.selectCell = function (t, e, i) {
        var n = this.queryCell(t);
        if (n) {
          var s = this.getCellSlideIndex(n);
          this.select(s, e, i);
        }
      }),
      (p.getCellSlideIndex = function (t) {
        for (var e = 0; e < this.slides.length; e++) {
          if (-1 != this.slides[e].cells.indexOf(t)) return e;
        }
      }),
      (p.getCell = function (t) {
        for (var e = 0; e < this.cells.length; e++) {
          var i = this.cells[e];
          if (i.element == t) return i;
        }
      }),
      (p.getCells = function (t) {
        t = n.makeArray(t);
        var e = [];
        return (
          t.forEach(function (t) {
            var i = this.getCell(t);
            i && e.push(i);
          }, this),
          e
        );
      }),
      (p.getCellElements = function () {
        return this.cells.map(function (t) {
          return t.element;
        });
      }),
      (p.getParentCell = function (t) {
        var e = this.getCell(t);
        return (
          e || ((t = n.getParent(t, ".flickity-slider > *")), this.getCell(t))
        );
      }),
      (p.getAdjacentCellElements = function (t, e) {
        if (!t) return this.selectedSlide.getCellElements();
        e = void 0 === e ? this.selectedIndex : e;
        var i = this.slides.length;
        if (1 + 2 * t >= i) return this.getCellElements();
        for (var s = [], o = e - t; o <= e + t; o++) {
          var r = this.options.wrapAround ? n.modulo(o, i) : o,
            a = this.slides[r];
          a && (s = s.concat(a.getCellElements()));
        }
        return s;
      }),
      (p.queryCell = function (t) {
        if ("number" == typeof t) return this.cells[t];
        if ("string" == typeof t) {
          if (t.match(/^[#.]?[\d\/]/)) return;
          t = this.element.querySelector(t);
        }
        return this.getCell(t);
      }),
      (p.uiChange = function () {
        this.emitEvent("uiChange");
      }),
      (p.childUIPointerDown = function (t) {
        "touchstart" != t.type && t.preventDefault(), this.focus();
      }),
      (p.onresize = function () {
        this.watchCSS(), this.resize();
      }),
      n.debounceMethod(f, "onresize", 150),
      (p.resize = function () {
        if (this.isActive) {
          this.getSize(),
            this.options.wrapAround &&
              (this.x = n.modulo(this.x, this.slideableWidth)),
            this.positionCells(),
            this._getWrapShiftCells(),
            this.setGallerySize(),
            this.emitEvent("resize");
          var t = this.selectedElements && this.selectedElements[0];
          this.selectCell(t, !1, !0);
        }
      }),
      (p.watchCSS = function () {
        this.options.watchCSS &&
          (-1 != l(this.element, ":after").content.indexOf("flickity")
            ? this.activate()
            : this.deactivate());
      }),
      (p.onkeydown = function (t) {
        var e =
          document.activeElement && document.activeElement != this.element;
        if (this.options.accessibility && !e) {
          var i = f.keyboardHandlers[t.keyCode];
          i && i.call(this);
        }
      }),
      (f.keyboardHandlers = {
        37: function () {
          var t = this.options.rightToLeft ? "next" : "previous";
          this.uiChange(), this[t]();
        },
        39: function () {
          var t = this.options.rightToLeft ? "previous" : "next";
          this.uiChange(), this[t]();
        },
      }),
      (p.focus = function () {
        var e = t.pageYOffset;
        this.element.focus({ preventScroll: !0 }),
          t.pageYOffset != e && t.scrollTo(t.pageXOffset, e);
      }),
      (p.deactivate = function () {
        this.isActive &&
          (this.element.classList.remove("flickity-enabled"),
          this.element.classList.remove("flickity-rtl"),
          this.unselectSelectedSlide(),
          this.cells.forEach(function (t) {
            t.destroy();
          }),
          this.element.removeChild(this.viewport),
          c(this.slider.children, this.element),
          this.options.accessibility &&
            (this.element.removeAttribute("tabIndex"),
            this.element.removeEventListener("keydown", this)),
          (this.isActive = !1),
          this.emitEvent("deactivate"));
      }),
      (p.destroy = function () {
        this.deactivate(),
          t.removeEventListener("resize", this),
          this.allOff(),
          this.emitEvent("destroy"),
          a && this.$element && a.removeData(this.element, "flickity"),
          delete this.element.flickityGUID,
          delete u[this.guid];
      }),
      n.extend(p, r),
      (f.data = function (t) {
        var e = (t = n.getQueryElement(t)) && t.flickityGUID;
        return e && u[e];
      }),
      n.htmlInit(f, "flickity"),
      a && a.bridget && a.bridget("flickity", f),
      (f.setJQuery = function (t) {
        a = t;
      }),
      (f.Cell = s),
      (f.Slide = o),
      f
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          "unipointer/unipointer",
          ["ev-emitter/ev-emitter"],
          function (i) {
            return e(t, i);
          }
        )
      : "object" == typeof module && module.exports
      ? (module.exports = e(t, require("ev-emitter")))
      : (t.Unipointer = e(t, t.EvEmitter));
  })(window, function (t, e) {
    function i() {}
    var n = (i.prototype = Object.create(e.prototype));
    (n.bindStartEvent = function (t) {
      this._bindStartEvent(t, !0);
    }),
      (n.unbindStartEvent = function (t) {
        this._bindStartEvent(t, !1);
      }),
      (n._bindStartEvent = function (e, i) {
        var n = (i = void 0 === i || i)
            ? "addEventListener"
            : "removeEventListener",
          s = "mousedown";
        t.PointerEvent
          ? (s = "pointerdown")
          : "ontouchstart" in t && (s = "touchstart"),
          e[n](s, this);
      }),
      (n.handleEvent = function (t) {
        var e = "on" + t.type;
        this[e] && this[e](t);
      }),
      (n.getTouch = function (t) {
        for (var e = 0; e < t.length; e++) {
          var i = t[e];
          if (i.identifier == this.pointerIdentifier) return i;
        }
      }),
      (n.onmousedown = function (t) {
        var e = t.button;
        (e && 0 !== e && 1 !== e) || this._pointerDown(t, t);
      }),
      (n.ontouchstart = function (t) {
        this._pointerDown(t, t.changedTouches[0]);
      }),
      (n.onpointerdown = function (t) {
        this._pointerDown(t, t);
      }),
      (n._pointerDown = function (t, e) {
        t.button ||
          this.isPointerDown ||
          ((this.isPointerDown = !0),
          (this.pointerIdentifier =
            void 0 !== e.pointerId ? e.pointerId : e.identifier),
          this.pointerDown(t, e));
      }),
      (n.pointerDown = function (t, e) {
        this._bindPostStartEvents(t), this.emitEvent("pointerDown", [t, e]);
      });
    var s = {
      mousedown: ["mousemove", "mouseup"],
      touchstart: ["touchmove", "touchend", "touchcancel"],
      pointerdown: ["pointermove", "pointerup", "pointercancel"],
    };
    return (
      (n._bindPostStartEvents = function (e) {
        if (e) {
          var i = s[e.type];
          i.forEach(function (e) {
            t.addEventListener(e, this);
          }, this),
            (this._boundPointerEvents = i);
        }
      }),
      (n._unbindPostStartEvents = function () {
        this._boundPointerEvents &&
          (this._boundPointerEvents.forEach(function (e) {
            t.removeEventListener(e, this);
          }, this),
          delete this._boundPointerEvents);
      }),
      (n.onmousemove = function (t) {
        this._pointerMove(t, t);
      }),
      (n.onpointermove = function (t) {
        t.pointerId == this.pointerIdentifier && this._pointerMove(t, t);
      }),
      (n.ontouchmove = function (t) {
        var e = this.getTouch(t.changedTouches);
        e && this._pointerMove(t, e);
      }),
      (n._pointerMove = function (t, e) {
        this.pointerMove(t, e);
      }),
      (n.pointerMove = function (t, e) {
        this.emitEvent("pointerMove", [t, e]);
      }),
      (n.onmouseup = function (t) {
        this._pointerUp(t, t);
      }),
      (n.onpointerup = function (t) {
        t.pointerId == this.pointerIdentifier && this._pointerUp(t, t);
      }),
      (n.ontouchend = function (t) {
        var e = this.getTouch(t.changedTouches);
        e && this._pointerUp(t, e);
      }),
      (n._pointerUp = function (t, e) {
        this._pointerDone(), this.pointerUp(t, e);
      }),
      (n.pointerUp = function (t, e) {
        this.emitEvent("pointerUp", [t, e]);
      }),
      (n._pointerDone = function () {
        this._pointerReset(), this._unbindPostStartEvents(), this.pointerDone();
      }),
      (n._pointerReset = function () {
        (this.isPointerDown = !1), delete this.pointerIdentifier;
      }),
      (n.pointerDone = function () {}),
      (n.onpointercancel = function (t) {
        t.pointerId == this.pointerIdentifier && this._pointerCancel(t, t);
      }),
      (n.ontouchcancel = function (t) {
        var e = this.getTouch(t.changedTouches);
        e && this._pointerCancel(t, e);
      }),
      (n._pointerCancel = function (t, e) {
        this._pointerDone(), this.pointerCancel(t, e);
      }),
      (n.pointerCancel = function (t, e) {
        this.emitEvent("pointerCancel", [t, e]);
      }),
      (i.getPointerPoint = function (t) {
        return { x: t.pageX, y: t.pageY };
      }),
      i
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          "unidragger/unidragger",
          ["unipointer/unipointer"],
          function (i) {
            return e(t, i);
          }
        )
      : "object" == typeof module && module.exports
      ? (module.exports = e(t, require("unipointer")))
      : (t.Unidragger = e(t, t.Unipointer));
  })(window, function (t, e) {
    function i() {}
    var n = (i.prototype = Object.create(e.prototype));
    (n.bindHandles = function () {
      this._bindHandles(!0);
    }),
      (n.unbindHandles = function () {
        this._bindHandles(!1);
      }),
      (n._bindHandles = function (e) {
        for (
          var i = (e = void 0 === e || e)
              ? "addEventListener"
              : "removeEventListener",
            n = e ? this._touchActionValue : "",
            s = 0;
          s < this.handles.length;
          s++
        ) {
          var o = this.handles[s];
          this._bindStartEvent(o, e),
            o[i]("click", this),
            t.PointerEvent && (o.style.touchAction = n);
        }
      }),
      (n._touchActionValue = "none"),
      (n.pointerDown = function (t, e) {
        this.okayPointerDown(t) &&
          ((this.pointerDownPointer = { pageX: e.pageX, pageY: e.pageY }),
          t.preventDefault(),
          this.pointerDownBlur(),
          this._bindPostStartEvents(t),
          this.emitEvent("pointerDown", [t, e]));
      });
    var s = { TEXTAREA: !0, INPUT: !0, SELECT: !0, OPTION: !0 },
      o = {
        radio: !0,
        checkbox: !0,
        button: !0,
        submit: !0,
        image: !0,
        file: !0,
      };
    return (
      (n.okayPointerDown = function (t) {
        var e = s[t.target.nodeName],
          i = o[t.target.type],
          n = !e || i;
        return n || this._pointerReset(), n;
      }),
      (n.pointerDownBlur = function () {
        var t = document.activeElement;
        t && t.blur && t != document.body && t.blur();
      }),
      (n.pointerMove = function (t, e) {
        var i = this._dragPointerMove(t, e);
        this.emitEvent("pointerMove", [t, e, i]), this._dragMove(t, e, i);
      }),
      (n._dragPointerMove = function (t, e) {
        var i = {
          x: e.pageX - this.pointerDownPointer.pageX,
          y: e.pageY - this.pointerDownPointer.pageY,
        };
        return (
          !this.isDragging && this.hasDragStarted(i) && this._dragStart(t, e), i
        );
      }),
      (n.hasDragStarted = function (t) {
        return Math.abs(t.x) > 3 || Math.abs(t.y) > 3;
      }),
      (n.pointerUp = function (t, e) {
        this.emitEvent("pointerUp", [t, e]), this._dragPointerUp(t, e);
      }),
      (n._dragPointerUp = function (t, e) {
        this.isDragging ? this._dragEnd(t, e) : this._staticClick(t, e);
      }),
      (n._dragStart = function (t, e) {
        (this.isDragging = !0),
          (this.isPreventingClicks = !0),
          this.dragStart(t, e);
      }),
      (n.dragStart = function (t, e) {
        this.emitEvent("dragStart", [t, e]);
      }),
      (n._dragMove = function (t, e, i) {
        this.isDragging && this.dragMove(t, e, i);
      }),
      (n.dragMove = function (t, e, i) {
        t.preventDefault(), this.emitEvent("dragMove", [t, e, i]);
      }),
      (n._dragEnd = function (t, e) {
        (this.isDragging = !1),
          setTimeout(
            function () {
              delete this.isPreventingClicks;
            }.bind(this)
          ),
          this.dragEnd(t, e);
      }),
      (n.dragEnd = function (t, e) {
        this.emitEvent("dragEnd", [t, e]);
      }),
      (n.onclick = function (t) {
        this.isPreventingClicks && t.preventDefault();
      }),
      (n._staticClick = function (t, e) {
        (this.isIgnoringMouseUp && "mouseup" == t.type) ||
          (this.staticClick(t, e),
          "mouseup" != t.type &&
            ((this.isIgnoringMouseUp = !0),
            setTimeout(
              function () {
                delete this.isIgnoringMouseUp;
              }.bind(this),
              400
            )));
      }),
      (n.staticClick = function (t, e) {
        this.emitEvent("staticClick", [t, e]);
      }),
      (i.getPointerPoint = e.getPointerPoint),
      i
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          "flickity/js/drag",
          ["./flickity", "unidragger/unidragger", "fizzy-ui-utils/utils"],
          function (i, n, s) {
            return e(t, i, n, s);
          }
        )
      : "object" == typeof module && module.exports
      ? (module.exports = e(
          t,
          require("./flickity"),
          require("unidragger"),
          require("fizzy-ui-utils")
        ))
      : (t.Flickity = e(t, t.Flickity, t.Unidragger, t.fizzyUIUtils));
  })(window, function (t, e, i, n) {
    n.extend(e.defaults, { draggable: ">1", dragThreshold: 3 }),
      e.createMethods.push("_createDrag");
    var s = e.prototype;
    n.extend(s, i.prototype), (s._touchActionValue = "pan-y");
    var o = "createTouch" in document,
      r = !1;
    (s._createDrag = function () {
      this.on("activate", this.onActivateDrag),
        this.on("uiChange", this._uiChangeDrag),
        this.on("deactivate", this.onDeactivateDrag),
        this.on("cellChange", this.updateDraggable),
        o && !r && (t.addEventListener("touchmove", function () {}), (r = !0));
    }),
      (s.onActivateDrag = function () {
        (this.handles = [this.viewport]),
          this.bindHandles(),
          this.updateDraggable();
      }),
      (s.onDeactivateDrag = function () {
        this.unbindHandles(), this.element.classList.remove("is-draggable");
      }),
      (s.updateDraggable = function () {
        ">1" == this.options.draggable
          ? (this.isDraggable = this.slides.length > 1)
          : (this.isDraggable = this.options.draggable),
          this.isDraggable
            ? this.element.classList.add("is-draggable")
            : this.element.classList.remove("is-draggable");
      }),
      (s.bindDrag = function () {
        (this.options.draggable = !0), this.updateDraggable();
      }),
      (s.unbindDrag = function () {
        (this.options.draggable = !1), this.updateDraggable();
      }),
      (s._uiChangeDrag = function () {
        delete this.isFreeScrolling;
      }),
      (s.pointerDown = function (e, i) {
        this.isDraggable
          ? this.okayPointerDown(e) &&
            (this._pointerDownPreventDefault(e),
            this.pointerDownFocus(e),
            document.activeElement != this.element && this.pointerDownBlur(),
            (this.dragX = this.x),
            this.viewport.classList.add("is-pointer-down"),
            (this.pointerDownScroll = l()),
            t.addEventListener("scroll", this),
            this._pointerDownDefault(e, i))
          : this._pointerDownDefault(e, i);
      }),
      (s._pointerDownDefault = function (t, e) {
        (this.pointerDownPointer = { pageX: e.pageX, pageY: e.pageY }),
          this._bindPostStartEvents(t),
          this.dispatchEvent("pointerDown", t, [e]);
      });
    var a = { INPUT: !0, TEXTAREA: !0, SELECT: !0 };
    function l() {
      return { x: t.pageXOffset, y: t.pageYOffset };
    }
    return (
      (s.pointerDownFocus = function (t) {
        a[t.target.nodeName] || this.focus();
      }),
      (s._pointerDownPreventDefault = function (t) {
        var e = "touchstart" == t.type,
          i = "touch" == t.pointerType,
          n = a[t.target.nodeName];
        e || i || n || t.preventDefault();
      }),
      (s.hasDragStarted = function (t) {
        return Math.abs(t.x) > this.options.dragThreshold;
      }),
      (s.pointerUp = function (t, e) {
        delete this.isTouchScrolling,
          this.viewport.classList.remove("is-pointer-down"),
          this.dispatchEvent("pointerUp", t, [e]),
          this._dragPointerUp(t, e);
      }),
      (s.pointerDone = function () {
        t.removeEventListener("scroll", this), delete this.pointerDownScroll;
      }),
      (s.dragStart = function (e, i) {
        this.isDraggable &&
          ((this.dragStartPosition = this.x),
          this.startAnimation(),
          t.removeEventListener("scroll", this),
          this.dispatchEvent("dragStart", e, [i]));
      }),
      (s.pointerMove = function (t, e) {
        var i = this._dragPointerMove(t, e);
        this.dispatchEvent("pointerMove", t, [e, i]), this._dragMove(t, e, i);
      }),
      (s.dragMove = function (t, e, i) {
        if (this.isDraggable) {
          t.preventDefault(), (this.previousDragX = this.dragX);
          var n = this.options.rightToLeft ? -1 : 1;
          this.options.wrapAround && (i.x %= this.slideableWidth);
          var s = this.dragStartPosition + i.x * n;
          if (!this.options.wrapAround && this.slides.length) {
            var o = Math.max(-this.slides[0].target, this.dragStartPosition);
            s = s > o ? 0.5 * (s + o) : s;
            var r = Math.min(
              -this.getLastSlide().target,
              this.dragStartPosition
            );
            s = s < r ? 0.5 * (s + r) : s;
          }
          (this.dragX = s),
            (this.dragMoveTime = new Date()),
            this.dispatchEvent("dragMove", t, [e, i]);
        }
      }),
      (s.dragEnd = function (t, e) {
        if (this.isDraggable) {
          this.options.freeScroll && (this.isFreeScrolling = !0);
          var i = this.dragEndRestingSelect();
          if (this.options.freeScroll && !this.options.wrapAround) {
            var n = this.getRestingPosition();
            this.isFreeScrolling =
              -n > this.slides[0].target && -n < this.getLastSlide().target;
          } else
            this.options.freeScroll ||
              i != this.selectedIndex ||
              (i += this.dragEndBoostSelect());
          delete this.previousDragX,
            (this.isDragSelect = this.options.wrapAround),
            this.select(i),
            delete this.isDragSelect,
            this.dispatchEvent("dragEnd", t, [e]);
        }
      }),
      (s.dragEndRestingSelect = function () {
        var t = this.getRestingPosition(),
          e = Math.abs(this.getSlideDistance(-t, this.selectedIndex)),
          i = this._getClosestResting(t, e, 1),
          n = this._getClosestResting(t, e, -1);
        return i.distance < n.distance ? i.index : n.index;
      }),
      (s._getClosestResting = function (t, e, i) {
        for (
          var n = this.selectedIndex,
            s = 1 / 0,
            o =
              this.options.contain && !this.options.wrapAround
                ? function (t, e) {
                    return t <= e;
                  }
                : function (t, e) {
                    return t < e;
                  };
          o(e, s) &&
          ((n += i), (s = e), null !== (e = this.getSlideDistance(-t, n)));

        )
          e = Math.abs(e);
        return { distance: s, index: n - i };
      }),
      (s.getSlideDistance = function (t, e) {
        var i = this.slides.length,
          s = this.options.wrapAround && i > 1,
          o = s ? n.modulo(e, i) : e,
          r = this.slides[o];
        if (!r) return null;
        var a = s ? this.slideableWidth * Math.floor(e / i) : 0;
        return t - (r.target + a);
      }),
      (s.dragEndBoostSelect = function () {
        if (
          void 0 === this.previousDragX ||
          !this.dragMoveTime ||
          new Date() - this.dragMoveTime > 100
        )
          return 0;
        var t = this.getSlideDistance(-this.dragX, this.selectedIndex),
          e = this.previousDragX - this.dragX;
        return t > 0 && e > 0 ? 1 : t < 0 && e < 0 ? -1 : 0;
      }),
      (s.staticClick = function (t, e) {
        var i = this.getParentCell(t.target),
          n = i && i.element,
          s = i && this.cells.indexOf(i);
        this.dispatchEvent("staticClick", t, [e, n, s]);
      }),
      (s.onscroll = function () {
        var t = l(),
          e = this.pointerDownScroll.x - t.x,
          i = this.pointerDownScroll.y - t.y;
        (Math.abs(e) > 3 || Math.abs(i) > 3) && this._pointerDone();
      }),
      e
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          "flickity/js/prev-next-button",
          ["./flickity", "unipointer/unipointer", "fizzy-ui-utils/utils"],
          function (i, n, s) {
            return e(t, i, n, s);
          }
        )
      : "object" == typeof module && module.exports
      ? (module.exports = e(
          t,
          require("./flickity"),
          require("unipointer"),
          require("fizzy-ui-utils")
        ))
      : e(t, t.Flickity, t.Unipointer, t.fizzyUIUtils);
  })(window, function (t, e, i, n) {
    "use strict";
    var s = "http://www.w3.org/2000/svg";
    function o(t, e) {
      (this.direction = t), (this.parent = e), this._create();
    }
    (o.prototype = Object.create(i.prototype)),
      (o.prototype._create = function () {
        (this.isEnabled = !0), (this.isPrevious = -1 == this.direction);
        var t = this.parent.options.rightToLeft ? 1 : -1;
        this.isLeft = this.direction == t;
        var e = (this.element = document.createElement("button"));
        (e.className = "flickity-button flickity-prev-next-button"),
          (e.className += this.isPrevious ? " previous" : " next"),
          e.setAttribute("type", "button"),
          this.disable(),
          e.setAttribute("aria-label", this.isPrevious ? "Previous" : "Next");
        var i = this.createSVG();
        e.appendChild(i),
          this.parent.on("select", this.update.bind(this)),
          this.on(
            "pointerDown",
            this.parent.childUIPointerDown.bind(this.parent)
          );
      }),
      (o.prototype.activate = function () {
        this.bindStartEvent(this.element),
          this.element.addEventListener("click", this),
          this.parent.element.appendChild(this.element);
      }),
      (o.prototype.deactivate = function () {
        this.parent.element.removeChild(this.element),
          this.unbindStartEvent(this.element),
          this.element.removeEventListener("click", this);
      }),
      (o.prototype.createSVG = function () {
        var t = document.createElementNS(s, "svg");
        t.setAttribute("class", "flickity-button-icon"),
          t.setAttribute("viewBox", "0 0 100 100");
        var e = document.createElementNS(s, "path"),
          i = (function (t) {
            if ("string" == typeof t) return t;
            return (
              "M " +
              t.x0 +
              ",50 L " +
              t.x1 +
              "," +
              (t.y1 + 50) +
              " L " +
              t.x2 +
              "," +
              (t.y2 + 50) +
              " L " +
              t.x3 +
              ",50  L " +
              t.x2 +
              "," +
              (50 - t.y2) +
              " L " +
              t.x1 +
              "," +
              (50 - t.y1) +
              " Z"
            );
          })(this.parent.options.arrowShape);
        return (
          e.setAttribute("d", i),
          e.setAttribute("class", "arrow"),
          this.isLeft ||
            e.setAttribute("transform", "translate(100, 100) rotate(180) "),
          t.appendChild(e),
          t
        );
      }),
      (o.prototype.handleEvent = n.handleEvent),
      (o.prototype.onclick = function () {
        if (this.isEnabled) {
          this.parent.uiChange();
          var t = this.isPrevious ? "previous" : "next";
          this.parent[t]();
        }
      }),
      (o.prototype.enable = function () {
        this.isEnabled || ((this.element.disabled = !1), (this.isEnabled = !0));
      }),
      (o.prototype.disable = function () {
        this.isEnabled && ((this.element.disabled = !0), (this.isEnabled = !1));
      }),
      (o.prototype.update = function () {
        var t = this.parent.slides;
        if (this.parent.options.wrapAround && t.length > 1) this.enable();
        else {
          var e = t.length ? t.length - 1 : 0,
            i = this.isPrevious ? 0 : e;
          this[this.parent.selectedIndex == i ? "disable" : "enable"]();
        }
      }),
      (o.prototype.destroy = function () {
        this.deactivate(), this.allOff();
      }),
      n.extend(e.defaults, {
        prevNextButtons: !0,
        arrowShape: { x0: 10, x1: 60, y1: 50, x2: 70, y2: 40, x3: 30 },
      }),
      e.createMethods.push("_createPrevNextButtons");
    var r = e.prototype;
    return (
      (r._createPrevNextButtons = function () {
        this.options.prevNextButtons &&
          ((this.prevButton = new o(-1, this)),
          (this.nextButton = new o(1, this)),
          this.on("activate", this.activatePrevNextButtons));
      }),
      (r.activatePrevNextButtons = function () {
        this.prevButton.activate(),
          this.nextButton.activate(),
          this.on("deactivate", this.deactivatePrevNextButtons);
      }),
      (r.deactivatePrevNextButtons = function () {
        this.prevButton.deactivate(),
          this.nextButton.deactivate(),
          this.off("deactivate", this.deactivatePrevNextButtons);
      }),
      (e.PrevNextButton = o),
      e
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          "flickity/js/page-dots",
          ["./flickity", "unipointer/unipointer", "fizzy-ui-utils/utils"],
          function (i, n, s) {
            return e(t, i, n, s);
          }
        )
      : "object" == typeof module && module.exports
      ? (module.exports = e(
          t,
          require("./flickity"),
          require("unipointer"),
          require("fizzy-ui-utils")
        ))
      : e(t, t.Flickity, t.Unipointer, t.fizzyUIUtils);
  })(window, function (t, e, i, n) {
    function s(t) {
      (this.parent = t), this._create();
    }
    (s.prototype = Object.create(i.prototype)),
      (s.prototype._create = function () {
        (this.holder = document.createElement("ol")),
          (this.holder.className = "flickity-page-dots"),
          (this.dots = []),
          (this.handleClick = this.onClick.bind(this)),
          this.on(
            "pointerDown",
            this.parent.childUIPointerDown.bind(this.parent)
          );
      }),
      (s.prototype.activate = function () {
        this.setDots(),
          this.holder.addEventListener("click", this.handleClick),
          this.bindStartEvent(this.holder),
          this.parent.element.appendChild(this.holder);
      }),
      (s.prototype.deactivate = function () {
        this.holder.removeEventListener("click", this.handleClick),
          this.unbindStartEvent(this.holder),
          this.parent.element.removeChild(this.holder);
      }),
      (s.prototype.setDots = function () {
        var t = this.parent.slides.length - this.dots.length;
        t > 0 ? this.addDots(t) : t < 0 && this.removeDots(-t);
      }),
      (s.prototype.addDots = function (t) {
        for (
          var e = document.createDocumentFragment(),
            i = [],
            n = this.dots.length,
            s = n + t,
            o = n;
          o < s;
          o++
        ) {
          var r = document.createElement("li");
          (r.className = "dot"),
            r.setAttribute("aria-label", "Page dot " + (o + 1)),
            e.appendChild(r),
            i.push(r);
        }
        this.holder.appendChild(e), (this.dots = this.dots.concat(i));
      }),
      (s.prototype.removeDots = function (t) {
        this.dots.splice(this.dots.length - t, t).forEach(function (t) {
          this.holder.removeChild(t);
        }, this);
      }),
      (s.prototype.updateSelected = function () {
        this.selectedDot &&
          ((this.selectedDot.className = "dot"),
          this.selectedDot.removeAttribute("aria-current")),
          this.dots.length &&
            ((this.selectedDot = this.dots[this.parent.selectedIndex]),
            (this.selectedDot.className = "dot is-selected"),
            this.selectedDot.setAttribute("aria-current", "step"));
      }),
      (s.prototype.onTap = s.prototype.onClick =
        function (t) {
          var e = t.target;
          if ("LI" == e.nodeName) {
            this.parent.uiChange();
            var i = this.dots.indexOf(e);
            this.parent.select(i);
          }
        }),
      (s.prototype.destroy = function () {
        this.deactivate(), this.allOff();
      }),
      (e.PageDots = s),
      n.extend(e.defaults, { pageDots: !0 }),
      e.createMethods.push("_createPageDots");
    var o = e.prototype;
    return (
      (o._createPageDots = function () {
        this.options.pageDots &&
          ((this.pageDots = new s(this)),
          this.on("activate", this.activatePageDots),
          this.on("select", this.updateSelectedPageDots),
          this.on("cellChange", this.updatePageDots),
          this.on("resize", this.updatePageDots),
          this.on("deactivate", this.deactivatePageDots));
      }),
      (o.activatePageDots = function () {
        this.pageDots.activate();
      }),
      (o.updateSelectedPageDots = function () {
        this.pageDots.updateSelected();
      }),
      (o.updatePageDots = function () {
        this.pageDots.setDots();
      }),
      (o.deactivatePageDots = function () {
        this.pageDots.deactivate();
      }),
      (e.PageDots = s),
      e
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          "flickity/js/player",
          ["ev-emitter/ev-emitter", "fizzy-ui-utils/utils", "./flickity"],
          function (t, i, n) {
            return e(t, i, n);
          }
        )
      : "object" == typeof module && module.exports
      ? (module.exports = e(
          require("ev-emitter"),
          require("fizzy-ui-utils"),
          require("./flickity")
        ))
      : e(t.EvEmitter, t.fizzyUIUtils, t.Flickity);
  })(window, function (t, e, i) {
    function n(t) {
      (this.parent = t),
        (this.state = "stopped"),
        (this.onVisibilityChange = this.visibilityChange.bind(this)),
        (this.onVisibilityPlay = this.visibilityPlay.bind(this));
    }
    (n.prototype = Object.create(t.prototype)),
      (n.prototype.play = function () {
        "playing" != this.state &&
          (document.hidden
            ? document.addEventListener(
                "visibilitychange",
                this.onVisibilityPlay
              )
            : ((this.state = "playing"),
              document.addEventListener(
                "visibilitychange",
                this.onVisibilityChange
              ),
              this.tick()));
      }),
      (n.prototype.tick = function () {
        if ("playing" == this.state) {
          var t = this.parent.options.autoPlay;
          t = "number" == typeof t ? t : 3e3;
          var e = this;
          this.clear(),
            (this.timeout = setTimeout(function () {
              e.parent.next(!0), e.tick();
            }, t));
        }
      }),
      (n.prototype.stop = function () {
        (this.state = "stopped"),
          this.clear(),
          document.removeEventListener(
            "visibilitychange",
            this.onVisibilityChange
          );
      }),
      (n.prototype.clear = function () {
        clearTimeout(this.timeout);
      }),
      (n.prototype.pause = function () {
        "playing" == this.state && ((this.state = "paused"), this.clear());
      }),
      (n.prototype.unpause = function () {
        "paused" == this.state && this.play();
      }),
      (n.prototype.visibilityChange = function () {
        this[document.hidden ? "pause" : "unpause"]();
      }),
      (n.prototype.visibilityPlay = function () {
        this.play(),
          document.removeEventListener(
            "visibilitychange",
            this.onVisibilityPlay
          );
      }),
      e.extend(i.defaults, { pauseAutoPlayOnHover: !0 }),
      i.createMethods.push("_createPlayer");
    var s = i.prototype;
    return (
      (s._createPlayer = function () {
        (this.player = new n(this)),
          this.on("activate", this.activatePlayer),
          this.on("uiChange", this.stopPlayer),
          this.on("pointerDown", this.stopPlayer),
          this.on("deactivate", this.deactivatePlayer);
      }),
      (s.activatePlayer = function () {
        this.options.autoPlay &&
          (this.player.play(),
          this.element.addEventListener("mouseenter", this));
      }),
      (s.playPlayer = function () {
        this.player.play();
      }),
      (s.stopPlayer = function () {
        this.player.stop();
      }),
      (s.pausePlayer = function () {
        this.player.pause();
      }),
      (s.unpausePlayer = function () {
        this.player.unpause();
      }),
      (s.deactivatePlayer = function () {
        this.player.stop(),
          this.element.removeEventListener("mouseenter", this);
      }),
      (s.onmouseenter = function () {
        this.options.pauseAutoPlayOnHover &&
          (this.player.pause(),
          this.element.addEventListener("mouseleave", this));
      }),
      (s.onmouseleave = function () {
        this.player.unpause(),
          this.element.removeEventListener("mouseleave", this);
      }),
      (i.Player = n),
      i
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          "flickity/js/add-remove-cell",
          ["./flickity", "fizzy-ui-utils/utils"],
          function (i, n) {
            return e(t, i, n);
          }
        )
      : "object" == typeof module && module.exports
      ? (module.exports = e(
          t,
          require("./flickity"),
          require("fizzy-ui-utils")
        ))
      : e(t, t.Flickity, t.fizzyUIUtils);
  })(window, function (t, e, i) {
    var n = e.prototype;
    return (
      (n.insert = function (t, e) {
        var i = this._makeCells(t);
        if (i && i.length) {
          var n = this.cells.length;
          e = void 0 === e ? n : e;
          var s = (function (t) {
              var e = document.createDocumentFragment();
              return (
                t.forEach(function (t) {
                  e.appendChild(t.element);
                }),
                e
              );
            })(i),
            o = e == n;
          if (o) this.slider.appendChild(s);
          else {
            var r = this.cells[e].element;
            this.slider.insertBefore(s, r);
          }
          if (0 === e) this.cells = i.concat(this.cells);
          else if (o) this.cells = this.cells.concat(i);
          else {
            var a = this.cells.splice(e, n - e);
            this.cells = this.cells.concat(i).concat(a);
          }
          this._sizeCells(i), this.cellChange(e, !0);
        }
      }),
      (n.append = function (t) {
        this.insert(t, this.cells.length);
      }),
      (n.prepend = function (t) {
        this.insert(t, 0);
      }),
      (n.remove = function (t) {
        var e = this.getCells(t);
        if (e && e.length) {
          var n = this.cells.length - 1;
          e.forEach(function (t) {
            t.remove();
            var e = this.cells.indexOf(t);
            (n = Math.min(e, n)), i.removeFrom(this.cells, t);
          }, this),
            this.cellChange(n, !0);
        }
      }),
      (n.cellSizeChange = function (t) {
        var e = this.getCell(t);
        if (e) {
          e.getSize();
          var i = this.cells.indexOf(e);
          this.cellChange(i);
        }
      }),
      (n.cellChange = function (t, e) {
        var i = this.selectedElement;
        this._positionCells(t),
          this._getWrapShiftCells(),
          this.setGallerySize();
        var n = this.getCell(i);
        n && (this.selectedIndex = this.getCellSlideIndex(n)),
          (this.selectedIndex = Math.min(
            this.slides.length - 1,
            this.selectedIndex
          )),
          this.emitEvent("cellChange", [t]),
          this.select(this.selectedIndex),
          e && this.positionSliderAtSelected();
      }),
      e
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          "flickity/js/lazyload",
          ["./flickity", "fizzy-ui-utils/utils"],
          function (i, n) {
            return e(t, i, n);
          }
        )
      : "object" == typeof module && module.exports
      ? (module.exports = e(
          t,
          require("./flickity"),
          require("fizzy-ui-utils")
        ))
      : e(t, t.Flickity, t.fizzyUIUtils);
  })(window, function (t, e, i) {
    "use strict";
    e.createMethods.push("_createLazyload");
    var n = e.prototype;
    function s(t, e) {
      (this.img = t), (this.flickity = e), this.load();
    }
    return (
      (n._createLazyload = function () {
        this.on("select", this.lazyLoad);
      }),
      (n.lazyLoad = function () {
        var t = this.options.lazyLoad;
        if (t) {
          var e = "number" == typeof t ? t : 0,
            n = this.getAdjacentCellElements(e),
            o = [];
          n.forEach(function (t) {
            var e = (function (t) {
              if ("IMG" == t.nodeName) {
                var e = t.getAttribute("data-flickity-lazyload"),
                  n = t.getAttribute("data-flickity-lazyload-src"),
                  s = t.getAttribute("data-flickity-lazyload-srcset");
                if (e || n || s) return [t];
              }
              var o = t.querySelectorAll(
                "img[data-flickity-lazyload], img[data-flickity-lazyload-src], img[data-flickity-lazyload-srcset]"
              );
              return i.makeArray(o);
            })(t);
            o = o.concat(e);
          }),
            o.forEach(function (t) {
              new s(t, this);
            }, this);
        }
      }),
      (s.prototype.handleEvent = i.handleEvent),
      (s.prototype.load = function () {
        this.img.addEventListener("load", this),
          this.img.addEventListener("error", this);
        var t =
            this.img.getAttribute("data-flickity-lazyload") ||
            this.img.getAttribute("data-flickity-lazyload-src"),
          e = this.img.getAttribute("data-flickity-lazyload-srcset");
        (this.img.src = t),
          e && this.img.setAttribute("srcset", e),
          this.img.removeAttribute("data-flickity-lazyload"),
          this.img.removeAttribute("data-flickity-lazyload-src"),
          this.img.removeAttribute("data-flickity-lazyload-srcset");
      }),
      (s.prototype.onload = function (t) {
        this.complete(t, "flickity-lazyloaded");
      }),
      (s.prototype.onerror = function (t) {
        this.complete(t, "flickity-lazyerror");
      }),
      (s.prototype.complete = function (t, e) {
        this.img.removeEventListener("load", this),
          this.img.removeEventListener("error", this);
        var i = this.flickity.getParentCell(this.img),
          n = i && i.element;
        this.flickity.cellSizeChange(n),
          this.img.classList.add(e),
          this.flickity.dispatchEvent("lazyLoad", t, n);
      }),
      (e.LazyLoader = s),
      e
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          "flickity/js/index",
          [
            "./flickity",
            "./drag",
            "./prev-next-button",
            "./page-dots",
            "./player",
            "./add-remove-cell",
            "./lazyload",
          ],
          e
        )
      : "object" == typeof module &&
        module.exports &&
        (module.exports = e(
          require("./flickity"),
          require("./drag"),
          require("./prev-next-button"),
          require("./page-dots"),
          require("./player"),
          require("./add-remove-cell"),
          require("./lazyload")
        ));
  })(window, function (t) {
    return t;
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          "flickity-as-nav-for/as-nav-for",
          ["flickity/js/index", "fizzy-ui-utils/utils"],
          e
        )
      : "object" == typeof module && module.exports
      ? (module.exports = e(require("flickity"), require("fizzy-ui-utils")))
      : (t.Flickity = e(t.Flickity, t.fizzyUIUtils));
  })(window, function (t, e) {
    t.createMethods.push("_createAsNavFor");
    var i = t.prototype;
    return (
      (i._createAsNavFor = function () {
        this.on("activate", this.activateAsNavFor),
          this.on("deactivate", this.deactivateAsNavFor),
          this.on("destroy", this.destroyAsNavFor);
        var t = this.options.asNavFor;
        if (t) {
          var e = this;
          setTimeout(function () {
            e.setNavCompanion(t);
          });
        }
      }),
      (i.setNavCompanion = function (i) {
        i = e.getQueryElement(i);
        var n = t.data(i);
        if (n && n != this) {
          this.navCompanion = n;
          var s = this;
          (this.onNavCompanionSelect = function () {
            s.navCompanionSelect();
          }),
            n.on("select", this.onNavCompanionSelect),
            this.on("staticClick", this.onNavStaticClick),
            this.navCompanionSelect(!0);
        }
      }),
      (i.navCompanionSelect = function (t) {
        var e = this.navCompanion && this.navCompanion.selectedCells;
        if (e) {
          var i = e[0],
            n = this.navCompanion.cells.indexOf(i),
            s = n + e.length - 1,
            o = Math.floor(
              (function (t, e, i) {
                return (e - t) * i + t;
              })(n, s, this.navCompanion.cellAlign)
            );
          if (
            (this.selectCell(o, !1, t),
            this.removeNavSelectedElements(),
            !(o >= this.cells.length))
          ) {
            var r = this.cells.slice(n, s + 1);
            (this.navSelectedElements = r.map(function (t) {
              return t.element;
            })),
              this.changeNavSelectedClass("add");
          }
        }
      }),
      (i.changeNavSelectedClass = function (t) {
        this.navSelectedElements.forEach(function (e) {
          e.classList[t]("is-nav-selected");
        });
      }),
      (i.activateAsNavFor = function () {
        this.navCompanionSelect(!0);
      }),
      (i.removeNavSelectedElements = function () {
        this.navSelectedElements &&
          (this.changeNavSelectedClass("remove"),
          delete this.navSelectedElements);
      }),
      (i.onNavStaticClick = function (t, e, i, n) {
        "number" == typeof n && this.navCompanion.selectCell(n);
      }),
      (i.deactivateAsNavFor = function () {
        this.removeNavSelectedElements();
      }),
      (i.destroyAsNavFor = function () {
        this.navCompanion &&
          (this.navCompanion.off("select", this.onNavCompanionSelect),
          this.off("staticClick", this.onNavStaticClick),
          delete this.navCompanion);
      }),
      t
    );
  }),
  (function (t, e) {
    "use strict";
    "function" == typeof define && define.amd
      ? define(
          "imagesloaded/imagesloaded",
          ["ev-emitter/ev-emitter"],
          function (i) {
            return e(t, i);
          }
        )
      : "object" == typeof module && module.exports
      ? (module.exports = e(t, require("ev-emitter")))
      : (t.imagesLoaded = e(t, t.EvEmitter));
  })("undefined" != typeof window ? window : this, function (t, e) {
    var i = t.jQuery,
      n = t.console;
    function s(t, e) {
      for (var i in e) t[i] = e[i];
      return t;
    }
    var o = Array.prototype.slice;
    function r(t) {
      return Array.isArray(t)
        ? t
        : "object" == typeof t && "number" == typeof t.length
        ? o.call(t)
        : [t];
    }
    function a(t, e, o) {
      if (!(this instanceof a)) return new a(t, e, o);
      var l = t;
      "string" == typeof t && (l = document.querySelectorAll(t)),
        l
          ? ((this.elements = r(l)),
            (this.options = s({}, this.options)),
            "function" == typeof e ? (o = e) : s(this.options, e),
            o && this.on("always", o),
            this.getImages(),
            i && (this.jqDeferred = new i.Deferred()),
            setTimeout(this.check.bind(this)))
          : n.error("Bad element for imagesLoaded " + (l || t));
    }
    (a.prototype = Object.create(e.prototype)),
      (a.prototype.options = {}),
      (a.prototype.getImages = function () {
        (this.images = []), this.elements.forEach(this.addElementImages, this);
      }),
      (a.prototype.addElementImages = function (t) {
        "IMG" == t.nodeName && this.addImage(t),
          !0 === this.options.background && this.addElementBackgroundImages(t);
        var e = t.nodeType;
        if (e && l[e]) {
          for (var i = t.querySelectorAll("img"), n = 0; n < i.length; n++) {
            var s = i[n];
            this.addImage(s);
          }
          if ("string" == typeof this.options.background) {
            var o = t.querySelectorAll(this.options.background);
            for (n = 0; n < o.length; n++) {
              var r = o[n];
              this.addElementBackgroundImages(r);
            }
          }
        }
      });
    var l = { 1: !0, 9: !0, 11: !0 };
    function h(t) {
      this.img = t;
    }
    function c(t, e) {
      (this.url = t), (this.element = e), (this.img = new Image());
    }
    return (
      (a.prototype.addElementBackgroundImages = function (t) {
        var e = getComputedStyle(t);
        if (e)
          for (
            var i = /url\((['"])?(.*?)\1\)/gi, n = i.exec(e.backgroundImage);
            null !== n;

          ) {
            var s = n && n[2];
            s && this.addBackground(s, t), (n = i.exec(e.backgroundImage));
          }
      }),
      (a.prototype.addImage = function (t) {
        var e = new h(t);
        this.images.push(e);
      }),
      (a.prototype.addBackground = function (t, e) {
        var i = new c(t, e);
        this.images.push(i);
      }),
      (a.prototype.check = function () {
        var t = this;
        function e(e, i, n) {
          setTimeout(function () {
            t.progress(e, i, n);
          });
        }
        (this.progressedCount = 0),
          (this.hasAnyBroken = !1),
          this.images.length
            ? this.images.forEach(function (t) {
                t.once("progress", e), t.check();
              })
            : this.complete();
      }),
      (a.prototype.progress = function (t, e, i) {
        this.progressedCount++,
          (this.hasAnyBroken = this.hasAnyBroken || !t.isLoaded),
          this.emitEvent("progress", [this, t, e]),
          this.jqDeferred &&
            this.jqDeferred.notify &&
            this.jqDeferred.notify(this, t),
          this.progressedCount == this.images.length && this.complete(),
          this.options.debug && n && n.log("progress: " + i, t, e);
      }),
      (a.prototype.complete = function () {
        var t = this.hasAnyBroken ? "fail" : "done";
        if (
          ((this.isComplete = !0),
          this.emitEvent(t, [this]),
          this.emitEvent("always", [this]),
          this.jqDeferred)
        ) {
          var e = this.hasAnyBroken ? "reject" : "resolve";
          this.jqDeferred[e](this);
        }
      }),
      (h.prototype = Object.create(e.prototype)),
      (h.prototype.check = function () {
        this.getIsImageComplete()
          ? this.confirm(0 !== this.img.naturalWidth, "naturalWidth")
          : ((this.proxyImage = new Image()),
            this.proxyImage.addEventListener("load", this),
            this.proxyImage.addEventListener("error", this),
            this.img.addEventListener("load", this),
            this.img.addEventListener("error", this),
            (this.proxyImage.src = this.img.src));
      }),
      (h.prototype.getIsImageComplete = function () {
        return this.img.complete && this.img.naturalWidth;
      }),
      (h.prototype.confirm = function (t, e) {
        (this.isLoaded = t), this.emitEvent("progress", [this, this.img, e]);
      }),
      (h.prototype.handleEvent = function (t) {
        var e = "on" + t.type;
        this[e] && this[e](t);
      }),
      (h.prototype.onload = function () {
        this.confirm(!0, "onload"), this.unbindEvents();
      }),
      (h.prototype.onerror = function () {
        this.confirm(!1, "onerror"), this.unbindEvents();
      }),
      (h.prototype.unbindEvents = function () {
        this.proxyImage.removeEventListener("load", this),
          this.proxyImage.removeEventListener("error", this),
          this.img.removeEventListener("load", this),
          this.img.removeEventListener("error", this);
      }),
      (c.prototype = Object.create(h.prototype)),
      (c.prototype.check = function () {
        this.img.addEventListener("load", this),
          this.img.addEventListener("error", this),
          (this.img.src = this.url),
          this.getIsImageComplete() &&
            (this.confirm(0 !== this.img.naturalWidth, "naturalWidth"),
            this.unbindEvents());
      }),
      (c.prototype.unbindEvents = function () {
        this.img.removeEventListener("load", this),
          this.img.removeEventListener("error", this);
      }),
      (c.prototype.confirm = function (t, e) {
        (this.isLoaded = t),
          this.emitEvent("progress", [this, this.element, e]);
      }),
      (a.makeJQueryPlugin = function (e) {
        (e = e || t.jQuery) &&
          ((i = e).fn.imagesLoaded = function (t, e) {
            return new a(this, t, e).jqDeferred.promise(i(this));
          });
      }),
      a.makeJQueryPlugin(),
      a
    );
  }),
  (function (t, e) {
    "function" == typeof define && define.amd
      ? define(
          ["flickity/js/index", "imagesloaded/imagesloaded"],
          function (i, n) {
            return e(t, i, n);
          }
        )
      : "object" == typeof module && module.exports
      ? (module.exports = e(t, require("flickity"), require("imagesloaded")))
      : (t.Flickity = e(t, t.Flickity, t.imagesLoaded));
  })(window, function (t, e, i) {
    "use strict";
    e.createMethods.push("_createImagesLoaded");
    var n = e.prototype;
    return (
      (n._createImagesLoaded = function () {
        this.on("activate", this.imagesLoaded);
      }),
      (n.imagesLoaded = function () {
        if (this.options.imagesLoaded) {
          var t = this;
          i(this.slider).on("progress", function (e, i) {
            var n = t.getParentCell(i.img);
            t.cellSizeChange(n && n.element),
              t.options.freeScroll || t.positionSliderAtSelected();
          });
        }
      }),
      e
    );
  });
!(function (e, t) {
  "function" == typeof define && define.amd
    ? define(["flickity/js/index", "fizzy-ui-utils/utils"], t)
    : "object" == typeof module && module.exports
    ? (module.exports = t(require("flickity"), require("fizzy-ui-utils")))
    : t(e.Flickity, e.fizzyUIUtils);
})(this, function (e, t) {
  var i = e.Slide,
    s = i.prototype.updateTarget;
  (i.prototype.updateTarget = function () {
    if ((s.apply(this, arguments), this.parent.options.fade)) {
      var e = this.target - this.x,
        t = this.cells[0].x;
      this.cells.forEach(function (i) {
        var s = i.x - t - e;
        i.renderPosition(s);
      });
    }
  }),
    (i.prototype.setOpacity = function (e) {
      this.cells.forEach(function (t) {
        t.element.style.opacity = e;
      });
    });
  var a = e.prototype;
  e.createMethods.push("_createFade"),
    (a._createFade = function () {
      (this.fadeIndex = this.selectedIndex),
        (this.prevSelectedIndex = this.selectedIndex),
        this.on("select", this.onSelectFade),
        this.on("dragEnd", this.onDragEndFade),
        this.on("settle", this.onSettleFade),
        this.on("activate", this.onActivateFade),
        this.on("deactivate", this.onDeactivateFade);
    });
  var n = a.updateSlides;
  (a.updateSlides = function () {
    n.apply(this, arguments),
      this.options.fade &&
        this.slides.forEach(function (e, t) {
          var i = t == this.selectedIndex ? 1 : 0;
          e.setOpacity(i);
        }, this);
  }),
    (a.onSelectFade = function () {
      (this.fadeIndex = Math.min(
        this.prevSelectedIndex,
        this.slides.length - 1
      )),
        (this.prevSelectedIndex = this.selectedIndex);
    }),
    (a.onSettleFade = function () {
      (delete this.didDragEnd, this.options.fade) &&
        (this.selectedSlide.setOpacity(1),
        this.slides[this.fadeIndex] &&
          this.fadeIndex != this.selectedIndex &&
          this.slides[this.fadeIndex].setOpacity(0));
    }),
    (a.onDragEndFade = function () {
      this.didDragEnd = !0;
    }),
    (a.onActivateFade = function () {
      this.options.fade && this.element.classList.add("is-fade");
    }),
    (a.onDeactivateFade = function () {
      this.options.fade &&
        (this.element.classList.remove("is-fade"),
        this.slides.forEach(function (e) {
          e.setOpacity("");
        }));
    });
  var d = a.positionSlider;
  a.positionSlider = function () {
    this.options.fade
      ? (this.fadeSlides(), this.dispatchScrollEvent())
      : d.apply(this, arguments);
  };
  var h = a.positionSliderAtSelected;
  (a.positionSliderAtSelected = function () {
    this.options.fade && this.setTranslateX(0), h.apply(this, arguments);
  }),
    (a.fadeSlides = function () {
      if (!(this.slides.length < 2)) {
        var e = this.getFadeIndexes(),
          t = this.slides[e.a],
          i = this.slides[e.b],
          s = this.wrapDifference(t.target, i.target),
          a = this.wrapDifference(t.target, -this.x);
        (a /= s), t.setOpacity(1 - a), i.setOpacity(a);
        var n = e.a;
        this.isDragging && (n = a > 0.5 ? e.a : e.b),
          null != this.fadeHideIndex &&
            this.fadeHideIndex != n &&
            this.fadeHideIndex != e.a &&
            this.fadeHideIndex != e.b &&
            this.slides[this.fadeHideIndex].setOpacity(0),
          (this.fadeHideIndex = n);
      }
    }),
    (a.getFadeIndexes = function () {
      return this.isDragging || this.didDragEnd
        ? this.options.wrapAround
          ? this.getFadeDragWrapIndexes()
          : this.getFadeDragLimitIndexes()
        : { a: this.fadeIndex, b: this.selectedIndex };
    }),
    (a.getFadeDragWrapIndexes = function () {
      var e = this.slides.map(function (e, t) {
          return this.getSlideDistance(-this.x, t);
        }, this),
        i = e.map(function (e) {
          return Math.abs(e);
        }),
        s = Math.min.apply(Math, i),
        a = i.indexOf(s),
        n = e[a],
        d = this.slides.length,
        h = n >= 0 ? 1 : -1;
      return { a: a, b: t.modulo(a + h, d) };
    }),
    (a.getFadeDragLimitIndexes = function () {
      for (var e = 0, t = 0; t < this.slides.length - 1; t++) {
        var i = this.slides[t];
        if (-this.x < i.target) break;
        e = t;
      }
      return { a: e, b: e + 1 };
    }),
    (a.wrapDifference = function (e, t) {
      var i = t - e;
      if (!this.options.wrapAround) return i;
      var s = i + this.slideableWidth,
        a = i - this.slideableWidth;
      return (
        Math.abs(s) < Math.abs(i) && (i = s),
        Math.abs(a) < Math.abs(i) && (i = a),
        i
      );
    });
  var o = a._getWrapShiftCells;
  a._getWrapShiftCells = function () {
    this.options.fade || o.apply(this, arguments);
  };
  var r = a.shiftWrapCells;
  return (
    (a.shiftWrapCells = function () {
      this.options.fade || r.apply(this, arguments);
    }),
    e
  );
});
