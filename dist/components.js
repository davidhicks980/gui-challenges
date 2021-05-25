/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function __decorate(decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if (typeof Reflect === "object" && typeof undefined === "function") r = undefined(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
}
function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}
function __awaiter(thisArg, _arguments, P, generator) {
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
}

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$3 = window.ShadowRoot && (void 0 === window.ShadyCSS || window.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype,
      e$3 = Symbol();

class s$4 {
  constructor(t, s) {
    if (s !== e$3) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t;
  }

  get styleSheet() {
    return t$3 && void 0 === this.t && (this.t = new CSSStyleSheet(), this.t.replaceSync(this.cssText)), this.t;
  }

  toString() {
    return this.cssText;
  }

}

const n$5 = new Map(),
      o$5 = t => {
  let o = n$5.get(t);
  return void 0 === o && n$5.set(t, o = new s$4(t, e$3)), o;
},
      r$3 = t => o$5("string" == typeof t ? t : t + ""),
      i$5 = (t, ...e) => {
  const n = 1 === t.length ? t[0] : e.reduce((e, n, o) => e + (t => {
    if (t instanceof s$4) return t.cssText;
    if ("number" == typeof t) return t;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + t[o + 1], t[0]);
  return o$5(n);
},
      S$1 = (e, s) => {
  t$3 ? e.adoptedStyleSheets = s.map(t => t instanceof CSSStyleSheet ? t : t.styleSheet) : s.forEach(t => {
    const s = document.createElement("style");
    s.textContent = t.cssText, e.appendChild(s);
  });
},
      u$1 = t$3 ? t => t : t => t instanceof CSSStyleSheet ? (t => {
  let e = "";

  for (const s of t.cssRules) e += s.cssText;

  return r$3(e);
})(t) : t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

var s$3, e$2, h$2, r$2;

const o$4 = {
  toAttribute(t, i) {
    switch (i) {
      case Boolean:
        t = t ? "" : null;
        break;

      case Object:
      case Array:
        t = null == t ? t : JSON.stringify(t);
    }

    return t;
  },

  fromAttribute(t, i) {
    let s = t;

    switch (i) {
      case Boolean:
        s = null !== t;
        break;

      case Number:
        s = null === t ? null : Number(t);
        break;

      case Object:
      case Array:
        try {
          s = JSON.parse(t);
        } catch (t) {
          s = null;
        }

    }

    return s;
  }

},
      n$4 = (t, i) => i !== t && (i == i || t == t),
      l$2 = {
  attribute: !0,
  type: String,
  converter: o$4,
  reflect: !1,
  hasChanged: n$4
};

class a$2 extends HTMLElement {
  constructor() {
    super(), this.Πi = new Map(), this.Πo = void 0, this.Πl = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this.Πh = null, this.u();
  }

  static addInitializer(t) {
    var i;
    null !== (i = this.v) && void 0 !== i || (this.v = []), this.v.push(t);
  }

  static get observedAttributes() {
    this.finalize();
    const t = [];
    return this.elementProperties.forEach((i, s) => {
      const e = this.Πp(s, i);
      void 0 !== e && (this.Πm.set(e, s), t.push(e));
    }), t;
  }

  static createProperty(t, i = l$2) {
    if (i.state && (i.attribute = !1), this.finalize(), this.elementProperties.set(t, i), !i.noAccessor && !this.prototype.hasOwnProperty(t)) {
      const s = "symbol" == typeof t ? Symbol() : "__" + t,
            e = this.getPropertyDescriptor(t, s, i);
      void 0 !== e && Object.defineProperty(this.prototype, t, e);
    }
  }

  static getPropertyDescriptor(t, i, s) {
    return {
      get() {
        return this[i];
      },

      set(e) {
        const h = this[t];
        this[i] = e, this.requestUpdate(t, h, s);
      },

      configurable: !0,
      enumerable: !0
    };
  }

  static getPropertyOptions(t) {
    return this.elementProperties.get(t) || l$2;
  }

  static finalize() {
    if (this.hasOwnProperty("finalized")) return !1;
    this.finalized = !0;
    const t = Object.getPrototypeOf(this);

    if (t.finalize(), this.elementProperties = new Map(t.elementProperties), this.Πm = new Map(), this.hasOwnProperty("properties")) {
      const t = this.properties,
            i = [...Object.getOwnPropertyNames(t), ...Object.getOwnPropertySymbols(t)];

      for (const s of i) this.createProperty(s, t[s]);
    }

    return this.elementStyles = this.finalizeStyles(this.styles), !0;
  }

  static finalizeStyles(i) {
    const s = [];

    if (Array.isArray(i)) {
      const e = new Set(i.flat(1 / 0).reverse());

      for (const i of e) s.unshift(u$1(i));
    } else void 0 !== i && s.push(u$1(i));

    return s;
  }

  static Πp(t, i) {
    const s = i.attribute;
    return !1 === s ? void 0 : "string" == typeof s ? s : "string" == typeof t ? t.toLowerCase() : void 0;
  }

  u() {
    var t;
    this.Πg = new Promise(t => this.enableUpdating = t), this.L = new Map(), this.Π_(), this.requestUpdate(), null === (t = this.constructor.v) || void 0 === t || t.forEach(t => t(this));
  }

  addController(t) {
    var i, s;
    (null !== (i = this.ΠU) && void 0 !== i ? i : this.ΠU = []).push(t), void 0 !== this.renderRoot && this.isConnected && (null === (s = t.hostConnected) || void 0 === s || s.call(t));
  }

  removeController(t) {
    var i;
    null === (i = this.ΠU) || void 0 === i || i.splice(this.ΠU.indexOf(t) >>> 0, 1);
  }

  Π_() {
    this.constructor.elementProperties.forEach((t, i) => {
      this.hasOwnProperty(i) && (this.Πi.set(i, this[i]), delete this[i]);
    });
  }

  createRenderRoot() {
    var t;
    const s = null !== (t = this.shadowRoot) && void 0 !== t ? t : this.attachShadow(this.constructor.shadowRootOptions);
    return S$1(s, this.constructor.elementStyles), s;
  }

  connectedCallback() {
    var t;
    void 0 === this.renderRoot && (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), null === (t = this.ΠU) || void 0 === t || t.forEach(t => {
      var i;
      return null === (i = t.hostConnected) || void 0 === i ? void 0 : i.call(t);
    }), this.Πl && (this.Πl(), this.Πo = this.Πl = void 0);
  }

  enableUpdating(t) {}

  disconnectedCallback() {
    var t;
    null === (t = this.ΠU) || void 0 === t || t.forEach(t => {
      var i;
      return null === (i = t.hostDisconnected) || void 0 === i ? void 0 : i.call(t);
    }), this.Πo = new Promise(t => this.Πl = t);
  }

  attributeChangedCallback(t, i, s) {
    this.K(t, s);
  }

  Πj(t, i, s = l$2) {
    var e, h;
    const r = this.constructor.Πp(t, s);

    if (void 0 !== r && !0 === s.reflect) {
      const n = (null !== (h = null === (e = s.converter) || void 0 === e ? void 0 : e.toAttribute) && void 0 !== h ? h : o$4.toAttribute)(i, s.type);
      this.Πh = t, null == n ? this.removeAttribute(r) : this.setAttribute(r, n), this.Πh = null;
    }
  }

  K(t, i) {
    var s, e, h;
    const r = this.constructor,
          n = r.Πm.get(t);

    if (void 0 !== n && this.Πh !== n) {
      const t = r.getPropertyOptions(n),
            l = t.converter,
            a = null !== (h = null !== (e = null === (s = l) || void 0 === s ? void 0 : s.fromAttribute) && void 0 !== e ? e : "function" == typeof l ? l : null) && void 0 !== h ? h : o$4.fromAttribute;
      this.Πh = n, this[n] = a(i, t.type), this.Πh = null;
    }
  }

  requestUpdate(t, i, s) {
    let e = !0;
    void 0 !== t && (((s = s || this.constructor.getPropertyOptions(t)).hasChanged || n$4)(this[t], i) ? (this.L.has(t) || this.L.set(t, i), !0 === s.reflect && this.Πh !== t && (void 0 === this.Πk && (this.Πk = new Map()), this.Πk.set(t, s))) : e = !1), !this.isUpdatePending && e && (this.Πg = this.Πq());
  }

  async Πq() {
    this.isUpdatePending = !0;

    try {
      for (await this.Πg; this.Πo;) await this.Πo;
    } catch (t) {
      Promise.reject(t);
    }

    const t = this.performUpdate();
    return null != t && (await t), !this.isUpdatePending;
  }

  performUpdate() {
    var t;
    if (!this.isUpdatePending) return;
    this.hasUpdated, this.Πi && (this.Πi.forEach((t, i) => this[i] = t), this.Πi = void 0);
    let i = !1;
    const s = this.L;

    try {
      i = this.shouldUpdate(s), i ? (this.willUpdate(s), null === (t = this.ΠU) || void 0 === t || t.forEach(t => {
        var i;
        return null === (i = t.hostUpdate) || void 0 === i ? void 0 : i.call(t);
      }), this.update(s)) : this.Π$();
    } catch (t) {
      throw i = !1, this.Π$(), t;
    }

    i && this.E(s);
  }

  willUpdate(t) {}

  E(t) {
    var i;
    null === (i = this.ΠU) || void 0 === i || i.forEach(t => {
      var i;
      return null === (i = t.hostUpdated) || void 0 === i ? void 0 : i.call(t);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }

  Π$() {
    this.L = new Map(), this.isUpdatePending = !1;
  }

  get updateComplete() {
    return this.getUpdateComplete();
  }

  getUpdateComplete() {
    return this.Πg;
  }

  shouldUpdate(t) {
    return !0;
  }

  update(t) {
    void 0 !== this.Πk && (this.Πk.forEach((t, i) => this.Πj(i, this[i], t)), this.Πk = void 0), this.Π$();
  }

  updated(t) {}

  firstUpdated(t) {}

}

a$2.finalized = !0, a$2.elementProperties = new Map(), a$2.elementStyles = [], a$2.shadowRootOptions = {
  mode: "open"
}, null === (e$2 = (s$3 = globalThis).reactiveElementPlatformSupport) || void 0 === e$2 || e$2.call(s$3, {
  ReactiveElement: a$2
}), (null !== (h$2 = (r$2 = globalThis).reactiveElementVersions) && void 0 !== h$2 ? h$2 : r$2.reactiveElementVersions = []).push("1.0.0-rc.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t$2, i$4, s$2, e$1;

const o$3 = globalThis.trustedTypes,
      l$1 = o$3 ? o$3.createPolicy("lit-html", {
  createHTML: t => t
}) : void 0,
      n$3 = `lit$${(Math.random() + "").slice(9)}$`,
      h$1 = "?" + n$3,
      r$1 = `<${h$1}>`,
      u = document,
      c = (t = "") => u.createComment(t),
      d = t => null === t || "object" != typeof t && "function" != typeof t,
      v = Array.isArray,
      a$1 = t => {
  var i;
  return v(t) || "function" == typeof (null === (i = t) || void 0 === i ? void 0 : i[Symbol.iterator]);
},
      f = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
      _ = /-->/g,
      m = />/g,
      p = />|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,
      $ = /'/g,
      g = /"/g,
      y = /^(?:script|style|textarea)$/i,
      b = t => (i, ...s) => ({
  _$litType$: t,
  strings: i,
  values: s
}),
      T = b(1),
      w = Symbol.for("lit-noChange"),
      A = Symbol.for("lit-nothing"),
      P = new WeakMap(),
      V = (t, i, s) => {
  var e, o;
  const l = null !== (e = null == s ? void 0 : s.renderBefore) && void 0 !== e ? e : i;
  let n = l._$litPart$;

  if (void 0 === n) {
    const t = null !== (o = null == s ? void 0 : s.renderBefore) && void 0 !== o ? o : null;
    l._$litPart$ = n = new C(i.insertBefore(c(), t), t, void 0, s);
  }

  return n.I(t), n;
},
      E = u.createTreeWalker(u, 129, null, !1),
      M = (t, i) => {
  const s = t.length - 1,
        e = [];
  let o,
      h = 2 === i ? "<svg>" : "",
      u = f;

  for (let i = 0; i < s; i++) {
    const s = t[i];
    let l,
        c,
        d = -1,
        v = 0;

    for (; v < s.length && (u.lastIndex = v, c = u.exec(s), null !== c);) v = u.lastIndex, u === f ? "!--" === c[1] ? u = _ : void 0 !== c[1] ? u = m : void 0 !== c[2] ? (y.test(c[2]) && (o = RegExp("</" + c[2], "g")), u = p) : void 0 !== c[3] && (u = p) : u === p ? ">" === c[0] ? (u = null != o ? o : f, d = -1) : void 0 === c[1] ? d = -2 : (d = u.lastIndex - c[2].length, l = c[1], u = void 0 === c[3] ? p : '"' === c[3] ? g : $) : u === g || u === $ ? u = p : u === _ || u === m ? u = f : (u = p, o = void 0);

    const a = u === p && t[i + 1].startsWith("/>") ? " " : "";
    h += u === f ? s + r$1 : d >= 0 ? (e.push(l), s.slice(0, d) + "$lit$" + s.slice(d) + n$3 + a) : s + n$3 + (-2 === d ? (e.push(void 0), i) : a);
  }

  const c = h + (t[s] || "<?>") + (2 === i ? "</svg>" : "");
  return [void 0 !== l$1 ? l$1.createHTML(c) : c, e];
};

class N {
  constructor({
    strings: t,
    _$litType$: i
  }, s) {
    let e;
    this.parts = [];
    let l = 0,
        r = 0;
    const u = t.length - 1,
          d = this.parts,
          [v, a] = M(t, i);

    if (this.el = N.createElement(v, s), E.currentNode = this.el.content, 2 === i) {
      const t = this.el.content,
            i = t.firstChild;
      i.remove(), t.append(...i.childNodes);
    }

    for (; null !== (e = E.nextNode()) && d.length < u;) {
      if (1 === e.nodeType) {
        if (e.hasAttributes()) {
          const t = [];

          for (const i of e.getAttributeNames()) if (i.endsWith("$lit$") || i.startsWith(n$3)) {
            const s = a[r++];

            if (t.push(i), void 0 !== s) {
              const t = e.getAttribute(s.toLowerCase() + "$lit$").split(n$3),
                    i = /([.?@])?(.*)/.exec(s);
              d.push({
                type: 1,
                index: l,
                name: i[2],
                strings: t,
                ctor: "." === i[1] ? I : "?" === i[1] ? L : "@" === i[1] ? R : H
              });
            } else d.push({
              type: 6,
              index: l
            });
          }

          for (const i of t) e.removeAttribute(i);
        }

        if (y.test(e.tagName)) {
          const t = e.textContent.split(n$3),
                i = t.length - 1;

          if (i > 0) {
            e.textContent = o$3 ? o$3.emptyScript : "";

            for (let s = 0; s < i; s++) e.append(t[s], c()), E.nextNode(), d.push({
              type: 2,
              index: ++l
            });

            e.append(t[i], c());
          }
        }
      } else if (8 === e.nodeType) if (e.data === h$1) d.push({
        type: 2,
        index: l
      });else {
        let t = -1;

        for (; -1 !== (t = e.data.indexOf(n$3, t + 1));) d.push({
          type: 7,
          index: l
        }), t += n$3.length - 1;
      }

      l++;
    }
  }

  static createElement(t, i) {
    const s = u.createElement("template");
    return s.innerHTML = t, s;
  }

}

function S(t, i, s = t, e) {
  var o, l, n, h;
  if (i === w) return i;
  let r = void 0 !== e ? null === (o = s.Σi) || void 0 === o ? void 0 : o[e] : s.Σo;
  const u = d(i) ? void 0 : i._$litDirective$;
  return (null == r ? void 0 : r.constructor) !== u && (null === (l = null == r ? void 0 : r.O) || void 0 === l || l.call(r, !1), void 0 === u ? r = void 0 : (r = new u(t), r.T(t, s, e)), void 0 !== e ? (null !== (n = (h = s).Σi) && void 0 !== n ? n : h.Σi = [])[e] = r : s.Σo = r), void 0 !== r && (i = S(t, r.S(t, i.values), r, e)), i;
}

class k {
  constructor(t, i) {
    this.l = [], this.N = void 0, this.D = t, this.M = i;
  }

  u(t) {
    var i;
    const {
      el: {
        content: s
      },
      parts: e
    } = this.D,
          o = (null !== (i = null == t ? void 0 : t.creationScope) && void 0 !== i ? i : u).importNode(s, !0);
    E.currentNode = o;
    let l = E.nextNode(),
        n = 0,
        h = 0,
        r = e[0];

    for (; void 0 !== r;) {
      if (n === r.index) {
        let i;
        2 === r.type ? i = new C(l, l.nextSibling, this, t) : 1 === r.type ? i = new r.ctor(l, r.name, r.strings, this, t) : 6 === r.type && (i = new z(l, this, t)), this.l.push(i), r = e[++h];
      }

      n !== (null == r ? void 0 : r.index) && (l = E.nextNode(), n++);
    }

    return o;
  }

  v(t) {
    let i = 0;

    for (const s of this.l) void 0 !== s && (void 0 !== s.strings ? (s.I(t, s, i), i += s.strings.length - 2) : s.I(t[i])), i++;
  }

}

class C {
  constructor(t, i, s, e) {
    this.type = 2, this.N = void 0, this.A = t, this.B = i, this.M = s, this.options = e;
  }

  setConnected(t) {
    var i;
    null === (i = this.P) || void 0 === i || i.call(this, t);
  }

  get parentNode() {
    return this.A.parentNode;
  }

  get startNode() {
    return this.A;
  }

  get endNode() {
    return this.B;
  }

  I(t, i = this) {
    t = S(this, t, i), d(t) ? t === A || null == t || "" === t ? (this.H !== A && this.R(), this.H = A) : t !== this.H && t !== w && this.m(t) : void 0 !== t._$litType$ ? this._(t) : void 0 !== t.nodeType ? this.$(t) : a$1(t) ? this.g(t) : this.m(t);
  }

  k(t, i = this.B) {
    return this.A.parentNode.insertBefore(t, i);
  }

  $(t) {
    this.H !== t && (this.R(), this.H = this.k(t));
  }

  m(t) {
    const i = this.A.nextSibling;
    null !== i && 3 === i.nodeType && (null === this.B ? null === i.nextSibling : i === this.B.previousSibling) ? i.data = t : this.$(u.createTextNode(t)), this.H = t;
  }

  _(t) {
    var i;
    const {
      values: s,
      _$litType$: e
    } = t,
          o = "number" == typeof e ? this.C(t) : (void 0 === e.el && (e.el = N.createElement(e.h, this.options)), e);
    if ((null === (i = this.H) || void 0 === i ? void 0 : i.D) === o) this.H.v(s);else {
      const t = new k(o, this),
            i = t.u(this.options);
      t.v(s), this.$(i), this.H = t;
    }
  }

  C(t) {
    let i = P.get(t.strings);
    return void 0 === i && P.set(t.strings, i = new N(t)), i;
  }

  g(t) {
    v(this.H) || (this.H = [], this.R());
    const i = this.H;
    let s,
        e = 0;

    for (const o of t) e === i.length ? i.push(s = new C(this.k(c()), this.k(c()), this, this.options)) : s = i[e], s.I(o), e++;

    e < i.length && (this.R(s && s.B.nextSibling, e), i.length = e);
  }

  R(t = this.A.nextSibling, i) {
    var s;

    for (null === (s = this.P) || void 0 === s || s.call(this, !1, !0, i); t && t !== this.B;) {
      const i = t.nextSibling;
      t.remove(), t = i;
    }
  }

}

class H {
  constructor(t, i, s, e, o) {
    this.type = 1, this.H = A, this.N = void 0, this.V = void 0, this.element = t, this.name = i, this.M = e, this.options = o, s.length > 2 || "" !== s[0] || "" !== s[1] ? (this.H = Array(s.length - 1).fill(A), this.strings = s) : this.H = A;
  }

  get tagName() {
    return this.element.tagName;
  }

  I(t, i = this, s, e) {
    const o = this.strings;
    let l = !1;
    if (void 0 === o) t = S(this, t, i, 0), l = !d(t) || t !== this.H && t !== w, l && (this.H = t);else {
      const e = t;
      let n, h;

      for (t = o[0], n = 0; n < o.length - 1; n++) h = S(this, e[s + n], i, n), h === w && (h = this.H[n]), l || (l = !d(h) || h !== this.H[n]), h === A ? t = A : t !== A && (t += (null != h ? h : "") + o[n + 1]), this.H[n] = h;
    }
    l && !e && this.W(t);
  }

  W(t) {
    t === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, null != t ? t : "");
  }

}

class I extends H {
  constructor() {
    super(...arguments), this.type = 3;
  }

  W(t) {
    this.element[this.name] = t === A ? void 0 : t;
  }

}

class L extends H {
  constructor() {
    super(...arguments), this.type = 4;
  }

  W(t) {
    t && t !== A ? this.element.setAttribute(this.name, "") : this.element.removeAttribute(this.name);
  }

}

class R extends H {
  constructor() {
    super(...arguments), this.type = 5;
  }

  I(t, i = this) {
    var s;
    if ((t = null !== (s = S(this, t, i, 0)) && void 0 !== s ? s : A) === w) return;
    const e = this.H,
          o = t === A && e !== A || t.capture !== e.capture || t.once !== e.once || t.passive !== e.passive,
          l = t !== A && (e === A || o);
    o && this.element.removeEventListener(this.name, this, e), l && this.element.addEventListener(this.name, this, t), this.H = t;
  }

  handleEvent(t) {
    var i, s;
    "function" == typeof this.H ? this.H.call(null !== (s = null === (i = this.options) || void 0 === i ? void 0 : i.host) && void 0 !== s ? s : this.element, t) : this.H.handleEvent(t);
  }

}

class z {
  constructor(t, i, s) {
    this.element = t, this.type = 6, this.N = void 0, this.V = void 0, this.M = i, this.options = s;
  }

  I(t) {
    S(this, t);
  }

}
null === (i$4 = (t$2 = globalThis).litHtmlPlatformSupport) || void 0 === i$4 || i$4.call(t$2, N, C), (null !== (s$2 = (e$1 = globalThis).litHtmlVersions) && void 0 !== s$2 ? s$2 : e$1.litHtmlVersions = []).push("2.0.0-rc.3");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

var i$3, l, o$2, s$1, n$2, a;
(null !== (i$3 = (a = globalThis).litElementVersions) && void 0 !== i$3 ? i$3 : a.litElementVersions = []).push("3.0.0-rc.2");

class h extends a$2 {
  constructor() {
    super(...arguments), this.renderOptions = {
      host: this
    }, this.Φt = void 0;
  }

  createRenderRoot() {
    var t, e;
    const r = super.createRenderRoot();
    return null !== (t = (e = this.renderOptions).renderBefore) && void 0 !== t || (e.renderBefore = r.firstChild), r;
  }

  update(t) {
    const r = this.render();
    super.update(t), this.Φt = V(r, this.renderRoot, this.renderOptions);
  }

  connectedCallback() {
    var t;
    super.connectedCallback(), null === (t = this.Φt) || void 0 === t || t.setConnected(!0);
  }

  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), null === (t = this.Φt) || void 0 === t || t.setConnected(!1);
  }

  render() {
    return w;
  }

}

h.finalized = !0, h._$litElement$ = !0, null === (o$2 = (l = globalThis).litElementHydrateSupport) || void 0 === o$2 || o$2.call(l, {
  LitElement: h
}), null === (n$2 = (s$1 = globalThis).litElementPlatformSupport) || void 0 === n$2 || n$2.call(s$1, {
  LitElement: h
});

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const n$1 = n => e => "function" == typeof e ? ((n, e) => (window.customElements.define(n, e), e))(n, e) : ((n, e) => {
  const {
    kind: t,
    elements: i
  } = e;
  return {
    kind: t,
    elements: i,

    finisher(e) {
      window.customElements.define(n, e);
    }

  };
})(n, e);

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const i$2 = (i, e) => "method" === e.kind && e.descriptor && !("value" in e.descriptor) ? { ...e,

  finisher(n) {
    n.createProperty(e.key, i);
  }

} : {
  kind: "field",
  key: Symbol(),
  placement: "own",
  descriptor: {},
  originalKey: e.key,

  initializer() {
    "function" == typeof e.initializer && (this[e.key] = e.initializer.call(this));
  },

  finisher(n) {
    n.createProperty(e.key, i);
  }

};

function e(e) {
  return (n, t) => void 0 !== t ? ((i, e, n) => {
    e.constructor.createProperty(n, i);
  })(e, n, t) : i$2(e, n);
}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

function r(r) {
  return e({ ...r,
    state: !0,
    attribute: !1
  });
}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const o$1 = ({
  finisher: e,
  descriptor: t
}) => (o, n) => {
  var r;

  if (void 0 === n) {
    const n = null !== (r = o.originalKey) && void 0 !== r ? r : o.key,
          i = null != t ? {
      kind: "method",
      placement: "prototype",
      key: n,
      descriptor: t(o.key)
    } : { ...o,
      key: n
    };
    return null != e && (i.finisher = function (t) {
      e(t, n);
    }), i;
  }

  {
    const r = o.constructor;
    void 0 !== t && Object.defineProperty(o, n, t(n)), null == e || e(r, n);
  }
};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

const t$1 = Element.prototype,
      n = t$1.msMatchesSelector || t$1.webkitMatchesSelector;

function o(t = "", o = !1, r = "") {
  return o$1({
    descriptor: e => ({
      get() {
        var e, l;
        const i = "slot" + (t ? `[name=${t}]` : ":not([name])");
        let a = null === (l = null === (e = this.renderRoot) || void 0 === e ? void 0 : e.querySelector(i)) || void 0 === l ? void 0 : l.assignedNodes({
          flatten: o
        });
        return a && r && (a = a.filter(e => e.nodeType === Node.ELEMENT_NODE && (e.matches ? e.matches(r) : n.call(e, r)))), a;
      },

      enumerable: !0,
      configurable: !0
    })
  });
}

const testFile = {
    section: "Home",
    subcontent: [
        {
            section: "Projects",
            content: T `<p class="body-1">
        Take a look at some of the projects I've been working on over the past
        few months
      </p> `,
            subcontent: [
                { section: "Section 1-1", subcontent: [], content: T `About my ` },
            ],
        },
        {
            section: "Interests",
            content: T ``,
            subcontent: [{ section: "Section 1-1", subcontent: [], content: T `` }],
        },
        {
            section: "Resume",
            content: T ``,
            subcontent: [{ section: "Section 1-1", subcontent: [], content: T `` }],
        },
    ],
};
const linkIcon = () => T `<svg
  xmlns="http://www.w3.org/2000/svg"
  height="24px"
  viewBox="0 0 24 24"
  width="24px"
  fill="gray"
>
  <path d="M0 0h24v24H0V0z" fill="none" />
  <path
    d="M17 7h-4v2h4c1.65 0 3 1.35 3 3s-1.35 3-3 3h-4v2h4c2.76 0 5-2.24 5-5s-2.24-5-5-5zm-6 8H7c-1.65 0-3-1.35-3-3s1.35-3 3-3h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-2zm-3-4h8v2H8z"
  />
</svg>`;
const tags = (content, link, level) => {
    let innerContent = T `${content}${link}`;
    let id = content + level;
    const vals = {
        h1: () => T `<h1 id="${id}">${innerContent}</h1>`,
        h2: () => T `<h2 id="${id}">${innerContent}</h2>`,
        h3: () => T `<h3 id="${id}">${innerContent}</h3>`,
        h4: () => T `<h4 id="${id}">${innerContent}</h4>`,
        h5: () => T `<h5 id="${id}">${innerContent}</h5>`,
        h6: () => T `<h6 id="${id}">${innerContent}</h6>`,
    };
    return vals["h" + level];
};
let ContentComponent = class ContentComponent extends h {
    constructor() {
        super(...arguments);
        this.file = "";
        this.section = "home";
        this.content = [];
    }
    createRenderRoot() {
        // Disable shadow DOM.
        // Instead templates will be rendered in the light DOM.
        return this;
    }
    parseFile(file, level = 1) {
        if (typeof level != "number" || level < 1 || level > 7)
            return ["[err: too many headers]"];
        ///////////////////////////////////
        const { section, subcontent, content } = file;
        ////////////////////
        if (section) {
            let link = T `<a
        href="#${section.toLowerCase().replace(" ", "_")}"
        class="toc__content__link-icon"
        >${linkIcon()}</a
      >`;
            this.content.push(tags(section, link, level)());
        }
        if (content)
            this.content.push(content);
        if (!Array.isArray(file.subcontent || !file.subcontent.length))
            return;
        else
            subcontent.forEach((item) => {
                this.parseFile(item, level + 1);
            });
        return this.content;
    }
    connectedCallback() {
        super.connectedCallback();
    }
    render() {
        return T `<div>${this.parseFile(testFile)}</div>`;
    }
};
__decorate([
    e(),
    __metadata("design:type", String)
], ContentComponent.prototype, "file", void 0);
__decorate([
    e({ type: String }),
    __metadata("design:type", String)
], ContentComponent.prototype, "section", void 0);
ContentComponent = __decorate([
    n$1("content-component")
], ContentComponent);

class QueryError extends Error {
  constructor(message) {
    super(message);
    this.name = 'QueryError';
    this.framesToPop = 1;
  }

}
function query(context, selectors, type) {
  const klass = type || HTMLElement;
  const el = context.querySelector(selectors);

  if (el instanceof klass) {
    return el;
  }

  throw new QueryError(`Element not found: <${klass.name}> ${selectors}`);
}
function querySelectorAll(context, selectors, type) {
  const klass = type || HTMLElement;
  const els = [];

  for (const el of context.querySelectorAll(selectors)) {
    if (el instanceof klass) {
      els.push(el);
    }
  }

  return els;
}

/* eslint-disable require-jsdoc */
class BaseElement extends h {
    /**
     * @param {PropertyValues} changedProperties
     */
    firstUpdated(changedProperties) {
        this.classList.remove("unresolved");
        super.firstUpdated(changedProperties);
    }
    createRenderRoot() {
        // Disable shadow DOM.
        // Instead templates will be rendered in the light DOM.
        return this;
    }
}

/**
 * Base element which subscribes to global state.
 *
 * @extends {BaseElement}
 */
class BaseStateElement extends BaseElement {
    constructor() {
        super();
        this.onStateChanged = this.onStateChanged.bind(this);
    }
    connectedCallback() {
        super.connectedCallback();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
    }
    /**
     * This method will be called whenever unistore state changes,
     * you can overwrite the method to hook into the event and deconstruct the state.
     *
     * @param {!Object<string, *>} state
     */
    // @ts-ignore-start
    onStateChanged(state) { } // eslint-disable-line no-unused-vars
}

/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Element that renders table of contents.
 * @extends {BaseStateElement}
 * @final
 */
let TableOfContents = class TableOfContents extends BaseStateElement {
    constructor() {
        super();
        this.linkList = [];
        this.makeLinks = (headings) => headings === null || headings === void 0 ? void 0 : headings.map((heading) => T `<li>
        <a class="toc__link" href="#${heading.id}">${heading.innerText}</a>
      </li>`);
        this.scrollSpy = this.scrollSpy.bind(this);
        this.tocActiveClass = "is-active";
        this.tocBorderClass = "is-bordered";
        this.tocVisibleClass = "is-visible";
    }
    open() {
        var _a;
        (_a = !this.classList.contains("is-open")) !== null && _a !== void 0 ? _a : this.classList.add("is-open");
    }
    close() {
        var _a;
        (_a = !this.classList.contains("is-open")) !== null && _a !== void 0 ? _a : this.classList.remove("is-open");
    }
    connectedCallback() {
        // This sets initial global state before subscribing to the store.
        // If we didn't do this then `this.opened` would always be set to false
        // because onStateChanged runs synchronously after we call
        // super.connectedCallback();
        if (this.hasAttribute("opened")) {
            this.open();
        }
        super.connectedCallback();
        setTimeout(() => this.requestUpdate(), 200);
    }
    firstUpdated(changedProperties) {
        super.firstUpdated(changedProperties);
        this.articleContent = this.closest("main");
        if (!this.articleContent) {
            console.warn(`Article container not found.`);
            return;
        }
        this.headings = querySelectorAll(this.articleContent, "h1[id], h2[id], h3[id]");
        this.observer = new IntersectionObserver(this.scrollSpy, {
            rootMargin: "0px 0px -80% 0px",
        });
        this.headings.forEach((heading) => {
            this.observer.observe(heading);
        });
    }
    render() {
        return T `
      <section class="toc">
        <div class="toc__label">
          <span>In this article</span>
          <button
            class="w-button w-button--secondary w-button--icon"
            aria-label="Close Table of Contents"
            @click="${() => this.close()}"
          >
            x
          </button>
        </div>
        <div class="toc__content">
          <h2 class="toc__header">
            <a href="#first-input-delay-(fid)" class="toc__header__link"
              >First Input Delay (FID)</a
            >
          </h2>
          <div class="toc__list">
            <ul>
              ${this.makeLinks(this.headings)}
            </ul>
          </div>
        </div>
      </section>
    `;
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.close();
        this.observer.disconnect();
    }
    onStateChanged(isOpened) {
        this.opened = isOpened;
    }
    scrollSpy(headings) {
        var _a, _b;
        const links = new Map([...querySelectorAll(document, "a", HTMLAnchorElement)].map((l) => [
            l.getAttribute("href"),
            l,
        ]));
        for (const heading of headings) {
            const href = `#${heading.target.getAttribute("id")}`;
            const link = links.get(href);
            if (link) {
                if (heading.intersectionRatio > 0) {
                    link.classList.add(this.tocVisibleClass);
                    this.previouslyActiveHeading = heading.target.getAttribute("id");
                }
                else {
                    link.classList.remove(this.tocVisibleClass);
                }
            }
            const firstVisibleLink = this.querySelector(`.${this.tocVisibleClass}`);
            links.forEach((link) => {
                var _a;
                link.classList.remove(this.tocActiveClass, this.tocVisibleClass);
                (_a = link.parentElement) === null || _a === void 0 ? void 0 : _a.classList.remove(this.tocBorderClass);
            });
            if (firstVisibleLink) {
                firstVisibleLink.classList.add(this.tocActiveClass);
                (_a = firstVisibleLink.parentElement) === null || _a === void 0 ? void 0 : _a.classList.add(this.tocBorderClass);
            }
            if (!firstVisibleLink && this.previouslyActiveHeading) {
                const last = query(document, `a[href="#${this.previouslyActiveHeading}"]`);
                last === null || last === void 0 ? void 0 : last.classList.add(this.tocActiveClass);
                (_b = last === null || last === void 0 ? void 0 : last.parentElement) === null || _b === void 0 ? void 0 : _b.classList.add(this.tocBorderClass);
            }
        }
    }
};
__decorate([
    e({ type: Object }),
    __metadata("design:type", HTMLElement)
], TableOfContents.prototype, "articleContent", void 0);
__decorate([
    e({ type: Boolean, reflect: true }),
    __metadata("design:type", Boolean)
], TableOfContents.prototype, "opened", void 0);
TableOfContents = __decorate([
    n$1("hicks-toc"),
    __metadata("design:paramtypes", [])
], TableOfContents);

const loaded = (function () {
    if (document.readyState === "complete") {
        return Promise.resolve();
    }
    else {
        return new Promise((resolve) => {
            window.addEventListener("load", resolve);
        });
    }
})();
class TypingEffectElement extends HTMLElement {
    connectedCallback() {
        return __awaiter(this, void 0, void 0, function* () {
            yield loaded;
            if (this.content)
                yield typeLines(this.lines, this.content, this.characterDelay, this.lineDelay);
            if (this.cursor)
                this.cursor.hidden = true;
            this.dispatchEvent(new CustomEvent("typing:complete", {
                bubbles: true,
                cancelable: true,
            }));
        });
    }
    get content() {
        return this.querySelector('[data-target="typing-effect.content"]');
    }
    get cursor() {
        return this.querySelector('[data-target="typing-effect.cursor"]');
    }
    get lines() {
        const linesAttr = this.getAttribute("data-lines");
        try {
            return linesAttr ? JSON.parse(linesAttr) : [];
        }
        catch (_a) {
            return [];
        }
    }
    get characterDelay() {
        return (Math.max(Math.min(0, Math.floor(Number(this.getAttribute("data-character-delay"))), 2147483647)) || 40);
    }
    set characterDelay(value) {
        if (value > 2147483647 || value < 0) {
            throw new DOMException("Value is negative or greater than the allowed amount");
        }
        this.setAttribute("data-character-delay", String(value));
    }
    get lineDelay() {
        return (Math.max(Math.min(0, Math.floor(Number(this.getAttribute("data-line-delay"))), 2147483647)) || 40);
    }
    set lineDelay(value) {
        if (value > 2147483647 || value < 0) {
            throw new DOMException("Value is negative or greater than the allowed amount");
        }
        this.setAttribute("data-line-delay", String(value));
    }
}
if (!window.customElements.get("typing-effect")) {
    window.TypingEffectElement = TypingEffectElement;
    window.customElements.define("typing-effect", TypingEffectElement);
}
function typeLines(lines, contentElement, characterDelay, lineDelay) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
            for (const character of lines[lineIndex].split("")) {
                yield wait(150);
                contentElement.innerHTML += character;
            }
            yield wait(lineDelay);
            if (lineIndex < lines.length - 1)
                contentElement.append(document.createElement("br"));
        }
    });
}
function wait(ms) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    });
}

const _icons = {
    projects: (primary, secondary) => T `<svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 0 24 24"
    width="24px"
    fill="#000000"
  >
    <style>
      .primary {
        fill: var(${primary});
      }

      .secondary {
        fill: var(${secondary});
      }
    </style>
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path
      class="primary"
      d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"
    />
  </svg>`,
    interests: (primary, secondary) => T `<svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 0 24 24"
    width="24px"
    fill="#000000"
  >
    <style>
      .primary {
        fill: var(${primary});
      }
      .secondary {
        fill: var(${secondary});
      }
    </style>
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path
      class="secondary"
      d="M19.47 9.16c-1.1-2.87-3.8-4.95-7.01-5.14l2 4.71 5.01.43zm-7.93-5.14c-3.22.18-5.92 2.27-7.02 5.15l5.02-.43 2-4.72zm-7.31 6.12C4.08 10.74 4 11.36 4 12c0 2.48 1.14 4.7 2.91 6.17l1.11-4.75-3.79-3.28zm15.54-.01l-3.79 3.28 1.1 4.76C18.86 16.7 20 14.48 20 12c0-.64-.09-1.27-.23-1.87zM7.84 18.82c1.21.74 2.63 1.18 4.15 1.18 1.53 0 2.95-.44 4.17-1.18L12 16.31l-4.16 2.51z"
    />
    <path
      class="primary"
      d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm7.48 7.16l-5.01-.43-2-4.71c3.21.19 5.91 2.27 7.01 5.14zM12 8.06l1.09 2.56 2.78.24-2.11 1.83.63 2.73L12 13.98l-2.39 1.44.63-2.72-2.11-1.83 2.78-.24L12 8.06zm-.46-4.04l-2 4.72-5.02.43c1.1-2.88 3.8-4.97 7.02-5.15zM4 12c0-.64.08-1.26.23-1.86l3.79 3.28-1.11 4.75C5.14 16.7 4 14.48 4 12zm7.99 8c-1.52 0-2.94-.44-4.15-1.18L12 16.31l4.16 2.51c-1.22.74-2.64 1.18-4.17 1.18zm5.1-1.83l-1.1-4.76 3.79-3.28c.13.6.22 1.23.22 1.87 0 2.48-1.14 4.7-2.91 6.17z"
    />
  </svg>`,
    resume: (primary, secondary) => T `<svg
    xmlns="http://www.w3.org/2000/svg"
    enable-background="new 0 0 24 24"
    height="24px"
    viewBox="0 0 24 24"
    width="24px"
    class="primary"
  >
    <style>
      .primary {
        fill: var(${primary});
      }
      .secondary {
        fill: var(${secondary});
      }
    </style>
    <g>
      <rect fill="none" height="24" width="24" y="0" />
      <path
        d="M5,5v14h14V5H5z M14,17H7v-2h7V17z M17,13H7v-2h10V13z M17,9H7V7h10V9z"
        class="secondary"
      />
      <path
        class="primary"
        d="M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M19,19H5V5h14V19z M17,13H7v-2h10 V13z M17,9H7V7h10V9z M14,17H7v-2h7V17z"
      />
    </g>
  </svg>`,
    home: (primary, secondary) => T `<svg
    xmlns="http://www.w3.org/2000/svg"
    enable-background="new 0 0 24 24"
    height="24px"
    viewBox="0 0 24 24"
    width="24px"
    fill="primary"
  >
    <style>
      .primary {
        fill: var(${primary});
      }
      .secondary {
        fill: var(${secondary});
      }
    </style>
    <rect fill="none" height="24" width="24" />
    <polygon
      class="secondary"
      points="18,19 13,19 13,15 11,15 11,19 6,19 6,10.1 12,5.52 18,10.1"
    />
    <path
      class="primary"
      d="M12,3L6,7.58V6H4v3.11L1,11.4l1.21,1.59L4,11.62V21h16v-9.38l1.79,1.36L23,11.4L12,3z M18,19h-5v-4h-2v4H6v-8.9l6-4.58 l6,4.58V19z M10,1c0,1.66-1.34,3-3,3C6.45,4,6,4.45,6,5H4c0-1.66,1.34-3,3-3c0.55,0,1-0.45,1-1H10z"
    />
  </svg>`,
};
const icons = () => {
    const icons = _icons;
    const keys = Object.keys(icons);
    return (name, primary = "blue", secondary = "lightblue") => keys.includes(name) ? icons[name](primary, secondary) : T ``;
};
const iconFactory = icons();

class IconController {
    constructor(host, name) {
        this._iconName = "cottage";
        (this.host = host).addController(this);
        this._iconName = name;
    }
    hostConnected() {
        this.host.requestUpdate();
    }
    hostDisconnected() {
        // Clear the timer when the host is disconnected
    }
    set name(value) {
        this._iconName = value;
        this.host.requestUpdate();
    }
    get name() {
        return this._iconName;
    }
    icon(primary, secondary) {
        return iconFactory(this._iconName, primary, secondary);
    }
}

const isFilledArray = (arr) => Array.isArray(arr) && arr.length > 0;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t = {
  ATTRIBUTE: 1,
  CHILD: 2,
  PROPERTY: 3,
  BOOLEAN_ATTRIBUTE: 4,
  EVENT: 5,
  ELEMENT: 6
},
      i$1 = t => (...i) => ({
  _$litDirective$: t,
  values: i
});

class s {
  constructor(t) {}

  T(t, i, s) {
    this.Σdt = t, this.M = i, this.Σct = s;
  }

  S(t, i) {
    return this.update(t, i);
  }

  update(t, i) {
    return this.render(...i);
  }

}

/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

const i = i$1(class extends s {
  constructor(t$1) {
    var e;
    if (super(t$1), t$1.type !== t.ATTRIBUTE || "style" !== t$1.name || (null === (e = t$1.strings) || void 0 === e ? void 0 : e.length) > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }

  render(t) {
    return Object.keys(t).reduce((e, r) => {
      const s = t[r];
      return null == s ? e : e + `${r = r.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${s};`;
    }, "");
  }

  update(e, [r]) {
    const {
      style: s
    } = e.element;

    if (void 0 === this.St) {
      this.St = new Set();

      for (const t in r) this.St.add(t);

      return this.render(r);
    }

    this.St.forEach(t => {
      null == r[t] && (this.St.delete(t), t.includes("-") ? s.removeProperty(t) : s[t] = "");
    });

    for (const t in r) {
      const e = r[t];
      null != e && (this.St.add(t), t.includes("-") ? s.setProperty(t, e) : s[t] = e);
    }

    return w;
  }

});

let NavComponent = class NavComponent extends h {
    constructor() {
        super();
        this.primary = "--blue4";
        this.secondary = "--blue8";
    }
    handleSlotChange(e) {
        if (isFilledArray(this.navItems)) {
            this.navItems.forEach((item) => {
                if (item.hasAttribute("primary") && item.hasAttribute("secondary")) {
                    item.primary = this.primary || "";
                    item.secondary = this.secondary || "";
                }
            });
        }
    }
    handleNavigate(e) {
        console.log(this.navItems);
        this.navItems.forEach((item) => (item.selected = false));
        e.target.selected = true;
    }
    render() {
        return T ` <ul
      class="navigation"
      role="navigation"
      aria-labelledby="top-navigation"
    >
      <h2 id="top-navigation" class="navigation__header">
        <slot name="header"></slot>
      </h2>
      <slot
        @navigate="${this.handleNavigate}"
        @slotchange="${this.handleSlotChange}"
      ></slot>
    </ul>`;
    }
};
__decorate([
    o("", true, "hicks-nav-item"),
    __metadata("design:type", Object)
], NavComponent.prototype, "navItems", void 0);
__decorate([
    e({ type: String, reflect: true }),
    __metadata("design:type", Object)
], NavComponent.prototype, "primary", void 0);
__decorate([
    e(),
    __metadata("design:type", Object)
], NavComponent.prototype, "secondary", void 0);
NavComponent = __decorate([
    n$1("hicks-nav"),
    __metadata("design:paramtypes", [])
], NavComponent);
let NavItemComponent = class NavItemComponent extends h {
    constructor() {
        super();
        this.iconControl = new IconController(this, "blue");
        this.slotValue = "";
        this.linkName = "";
        this.iconName = "";
        this.link = "";
        this.icon = "";
        this.primary = "";
        this.secondary = "";
        this.selected = false;
    }
    slotChangedCallback(e) {
        this.slotValue = isFilledArray(this.slot) ? this.slot[0].wholeText : "";
        this.requestUpdate();
    }
    updated(changedProperties) {
        if (changedProperties.has("link") ||
            changedProperties.has("icon") ||
            changedProperties.has("slotValue")) {
            console.log(changedProperties);
            this.handleElementNomenclature();
        }
    }
    handleElementNomenclature() {
        let altVal = this.slotValue.toLowerCase().trim();
        this.iconControl.name = this.icon.length > 0 ? this.icon : altVal;
        this.linkName = this.link.length > 0 ? this.link : altVal;
    }
    emitNavigation() {
        this.dispatchEvent(new CustomEvent("navigate", { bubbles: true }));
    }
    render() {
        const styles = {
            color: this.selected ? "blue" : "gray",
        };
        return T `<li class="navigation__item">
      <a
        @click="${this.emitNavigation}"
        class="navigation__item__link"
        style="${i(styles)}"
        href="#${this.linkName}"
        >
        <span class="item__link__layer">${this.iconControl.icon(this.primary, this.secondary)}<slot
          @slotchange="${this.slotChangedCallback}"
        ></span>
   
        </slot>
      </a>
    </li> `;
    }
    static get styles() {
        return i$5 `
      .item__link__layout {
        display: flex;
        flex-direction: row;
        gap: 0.5em;
        column-gap: 0.5em;
      }
      .navigation__item__link {
        margin: 0.25rem;
        padding: 0.5rem 0 0.5rem 0.5rem;
        height: 1em;
        color: black;
      }
      .navigation__item__link:hover {
        text-decoration: underline !important;
      }

      .navigation__item:active {
        color: black;
      }
    `;
    }
};
__decorate([
    o("", true),
    __metadata("design:type", Object)
], NavItemComponent.prototype, "slot", void 0);
__decorate([
    r(),
    __metadata("design:type", String)
], NavItemComponent.prototype, "slotValue", void 0);
__decorate([
    r(),
    __metadata("design:type", String)
], NavItemComponent.prototype, "linkName", void 0);
__decorate([
    r(),
    __metadata("design:type", String)
], NavItemComponent.prototype, "iconName", void 0);
__decorate([
    e({ reflect: true }),
    __metadata("design:type", Object)
], NavItemComponent.prototype, "link", void 0);
__decorate([
    e({ reflect: true }),
    __metadata("design:type", Object)
], NavItemComponent.prototype, "icon", void 0);
__decorate([
    e({ reflect: true }),
    __metadata("design:type", Object)
], NavItemComponent.prototype, "primary", void 0);
__decorate([
    e({ reflect: true }),
    __metadata("design:type", Object)
], NavItemComponent.prototype, "secondary", void 0);
__decorate([
    e({ type: Boolean, reflect: true }),
    __metadata("design:type", Object)
], NavItemComponent.prototype, "selected", void 0);
NavItemComponent = __decorate([
    n$1("hicks-nav-item"),
    __metadata("design:paramtypes", [])
], NavItemComponent);
