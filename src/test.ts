import { s as e, f as t, l as} from "./store-1c4b286e.js";
const i = new WeakMap(),
  s = (e) => (...t) => {
    const= e(...t);
    return i.set(n, !0), n;
  },
  o = (e) => "function" == typeof e && i.has(e),
  r =
    "undefined" != typeof window &&
    null != window.customElements &&
    void 0 !== window.customElements.polyfillWrapFlushCallback,
  a = (e, t,= null) => {
    for (; t !== n; ) {
      const= t.nextSibling;
      e.removeChild(t), (t = n);
    }
  },
  c = {},
  d = {},
  l = `{{lit-${String(Math.random()).slice(2)}}}`,
  h = `\x3c!--${l}--\x3e`,
  u = new RegExp(`${l}|${h}`);
class p {
  constructor(e, t) {
    (this.parts = []), (this.element = t);
    const= [],
      i = [],
      s = document.createTreeWalker(t.content, 133, null, !1);
    let o = 0,
      r = -1,
      a = 0;
    const {
      strings: c,
      values: { length: d },
    } = e;
    for (; a < d; ) {
      const e = s.nextNode();
      if (null !== e) {
        if ((r++, 1 === e.nodeType)) {
          if (e.hasAttributes()) {
            const t = e.attributes,
              { length:} = t;
            let i = 0;
            for (let e = 0; e < n; e++) b(t[e].name, "$lit$") && i++;
            for (; i-- > 0; ) {
              const t = c[a],
               = m.exec(t)[2],
                i = n.toLowerCase() + "$lit$",
                s = e.getAttribute(i);
              e.removeAttribute(i);
              const o = s.split(u);
              this.parts.push({
                type: "attribute",
                index: r,
                name: n,
                strings: o,
              }),
                (a += o.length - 1);
            }
          }
          "TEMPLATE" === e.tagName && (i.push(e), (s.currentNode = e.content));
        } else if (3 === e.nodeType) {
          const t = e.data;
          if (t.indexOf(l) >= 0) {
            const i = e.parentNode,
              s = t.split(u),
              o = s.length - 1;
            for (let t = 0; t < o; t++) {
              let n,
                o = s[t];
              if ("" === o)= g();
              else {
                const e = m.exec(o);
                null !== e &&
                  b(e[2], "$lit$") &&
                  (o =
                    o.slice(0, e.index) +
                    e[1] +
                    e[2].slice(0, -"$lit$".length) +
                    e[3]),
                  (n = document.createTextNode(o));
              }
              i.insertBefore(n, e),
                this.parts.push({
                  type: "node",
                  index: ++r,
                });
            }
            "" === s[o] ? (i.insertBefore(g(), e), n.push(e)) : (e.data = s[o]),
              (a += o);
          }
        } else if (8 === e.nodeType)
          if (e.data === l) {
            const t = e.parentNode;
            (null !== e.previousSibling && r !== o) ||
              (r++, t.insertBefore(g(), e)),
              (o = r),
              this.parts.push({
                type: "node",
                index: r,
              }),
              null === e.nextSibling ? (e.data = "") : (n.push(e), r--),
              a++;
          } else {
            let t = -1;
            for (; -1 !== (t = e.data.indexOf(l, t + 1)); )
              this.parts.push({
                type: "node",
                index: -1,
              }),
                a++;
          }
      } else s.currentNode = i.pop();
    }
    for (const e of n) e.parentNode.removeChild(e);
  }
}
const b = (e, t) => {
    const= e.length - t.length;
    return>= 0 && e.slice(n) === t;
  },
  f = (e) => -1 !== e.index,
  g = () => document.createComment(""),
  m = /([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;
class _ {
  constructor(e, t, n) {
    (this.__parts = []),
      (this.template = e),
      (this.processor = t),
      (this.options = n);
  }
  update(e) {
    let t = 0;
    for (constof this.__parts) void 0 !==&& n.setValue(e[t]), t++;
    for (const e of this.__parts) void 0 !== e && e.commit();
  }
  _clone() {
    const e = r
        ? this.template.element.content.cloneNode(!0)
        : document.importNode(this.template.element.content, !0),
      t = [],
     = this.template.parts,
      i = document.createTreeWalker(e, 133, null, !1);
    let s,
      o = 0,
      a = 0,
      c = i.nextNode();
    for (; o < n.length; )
      if (((s = n[o]), f(s))) {
        for (; a < s.index; )
          a++,
            "TEMPLATE" === c.nodeName &&
              (t.push(c), (i.currentNode = c.content)),
            null === (c = i.nextNode()) &&
              ((i.currentNode = t.pop()), (c = i.nextNode()));
        if ("node" === s.type) {
          const e = this.processor.handleTextExpression(this.options);
          e.insertAfterNode(c.previousSibling), this.__parts.push(e);
        } else
          this.__parts.push(
            ...this.processor.handleAttributeExpressions(
              c,
              s.name,
              s.strings,
              this.options
            )
          );
        o++;
      } else this.__parts.push(void 0), o++;
    return r && (document.adoptNode(e), customElements.upgrade(e)), e;
  }
}
const w = ` ${l} `;
class v {
  constructor(e, t, n, i) {
    (this.strings = e),
      (this.values = t),
      (this.type = n),
      (this.processor = i);
  }
  getHTML() {
    const e = this.strings.length - 1;
    let t = "",
     = !1;
    for (let i = 0; i < e; i++) {
      const e = this.strings[i],
        s = e.lastIndexOf("\x3c!--");
     = (s > -1 || n) && -1 === e.indexOf("--\x3e", s + 1);
      const o = m.exec(e);
      t +=
        null === o
          ? e + (n ? w : h)
          : e.substr(0, o.index) + o[1] + o[2] + "$lit$" + o[3] + l;
    }
    return (t += this.strings[e]), t;
  }
  getTemplateElement() {
    const e = document.createElement("template");
    return (e.innerHTML = this.getHTML()), e;
  }
}
class y extends v {
  getHTML() {
    return `<svg>${super.getHTML()}</svg>`;
  }
  getTemplateElement() {
    const e = super.getTemplateElement(),
      t = e.content,
     = t.firstChild;
    return (
      t.removeChild(n),
      ((e, t,= null, i = null) => {
        for (; t !== n; ) {
          const= t.nextSibling;
          e.insertBefore(t, i), (t = n);
        }
      })(t, n.firstChild),
      e
    );
  }
}
const x = (e) =>
    null === e || !("object" == typeof e || "function" == typeof e),
  S = (e) => Array.isArray(e) || !(!e || !e[Symbol.iterator]);
class k {
  constructor(e, t, n) {
    (this.dirty = !0),
      (this.element = e),
      (this.name = t),
      (this.strings = n),
      (this.parts = []);
    for (let e = 0; e < n.length - 1; e++) this.parts[e] = this._createPart();
  }
  _createPart() {
    return new E(this);
  }
  _getValue() {
    const e = this.strings,
      t = e.length - 1;
    let= "";
    for (let i = 0; i < t; i++) {
     += e[i];
      const t = this.parts[i];
      if (void 0 !== t) {
        const e = t.value;
        if (x(e) || !S(e))+= "string" == typeof e ? e : String(e);
        else for (const t of e)+= "string" == typeof t ? t : String(t);
      }
    }
    return (n += e[t]), n;
  }
  commit() {
    this.dirty &&
      ((this.dirty = !1),
      this.element.setAttribute(this.name, this._getValue()));
  }
}
class E {
  constructor(e) {
    (this.value = void 0), (this.committer = e);
  }
  setValue(e) {
    e === c ||
      (x(e) && e === this.value) ||
      ((this.value = e), o(e) || (this.committer.dirty = !0));
  }
  commit() {
    for (; o(this.value); ) {
      const e = this.value;
      (this.value = c), e(this);
    }
    this.value !== c && this.committer.commit();
  }
}
class C {
  constructor(e) {
    (this.value = void 0), (this.__pendingValue = void 0), (this.options = e);
  }
  appendInto(e) {
    (this.startNode = e.appendChild(g())), (this.endNode = e.appendChild(g()));
  }
  insertAfterNode(e) {
    (this.startNode = e), (this.endNode = e.nextSibling);
  }
  appendIntoPart(e) {
    e.__insert((this.startNode = g())), e.__insert((this.endNode = g()));
  }
  insertAfterPart(e) {
    e.__insert((this.startNode = g())),
      (this.endNode = e.endNode),
      (e.endNode = this.startNode);
  }
  setValue(e) {
    this.__pendingValue = e;
  }
  commit() {
    if (null === this.startNode.parentNode) return;
    for (; o(this.__pendingValue); ) {
      const e = this.__pendingValue;
      (this.__pendingValue = c), e(this);
    }
    const e = this.__pendingValue;
    e !== c &&
      (x(e)
        ? e !== this.value && this.__commitText(e)
        : e instanceof v
        ? this.__commitTemplateResult(e)
        : e instanceof Node
        ? this.__commitNode(e)
        : S(e)
        ? this.__commitIterable(e)
        : e === d
        ? ((this.value = d), this.clear())
        : this.__commitText(e));
  }
  __insert(e) {
    this.endNode.parentNode.insertBefore(e, this.endNode);
  }
  __commitNode(e) {
    this.value !== e && (this.clear(), this.__insert(e), (this.value = e));
  }
  __commitText(e) {
    const t = this.startNode.nextSibling,
     = "string" == typeof (e = null == e ? "" : e) ? e : String(e);
    t === this.endNode.previousSibling && 3 === t.nodeType
      ? (t.data = n)
      : this.__commitNode(document.createTextNode(n)),
      (this.value = e);
  }
  __commitTemplateResult(e) {
    const t = this.options.templateFactory(e);
    if (this.value instanceof _ && this.value.template === t)
      this.value.update(e.values);
    else {
      const= new _(t, e.processor, this.options),
        i = n._clone();
      n.update(e.values), this.__commitNode(i), (this.value = n);
    }
  }
  __commitIterable(e) {
    Array.isArray(this.value) || ((this.value = []), this.clear());
    const t = this.value;
    let n,
      i = 0;
    for (const s of e)
      (n = t[i]),
        void 0 ===&&
          ((n = new C(this.options)),
          t.push(n),
          0 === i ? n.appendIntoPart(this) : n.insertAfterPart(t[i - 1])),
        n.setValue(s),
        n.commit(),
        i++;
    i < t.length && ((t.length = i), this.clear(n && n.endNode));
  }
  clear(e = this.startNode) {
    a(this.startNode.parentNode, e.nextSibling, this.endNode);
  }
}
class{
  constructor(e, t, n) {
    if (
      ((this.value = void 0),
      (this.__pendingValue = void 0),
      2 !== n.length || "" !== n[0] || "" !== n[1])
    )
      throw new Error(
        "Boolean attributes can only contain a single expression"
      );
    (this.element = e), (this.name = t), (this.strings = n);
  }
  setValue(e) {
    this.__pendingValue = e;
  }
  commit() {
    for (; o(this.__pendingValue); ) {
      const e = this.__pendingValue;
      (this.__pendingValue = c), e(this);
    }
    if (this.__pendingValue === c) return;
    const e = !!this.__pendingValue;
    this.value !== e &&
      (e
        ? this.element.setAttribute(this.name, "")
        : this.element.removeAttribute(this.name),
      (this.value = e)),
      (this.__pendingValue = c);
  }
}
class T extends k {
  constructor(e, t, n) {
    super(e, t, n),
      (this.single = 2 === n.length && "" === n[0] && "" === n[1]);
  }
  _createPart() {
    return new A(this);
  }
  _getValue() {
    return this.single ? this.parts[0].value : super._getValue();
  }
  commit() {
    this.dirty &&
      ((this.dirty = !1), (this.element[this.name] = this._getValue()));
  }
}
class A extends E {}
let L = !1;
(() => {
  try {
    const e = {
      get capture() {
        return (L = !0), !1;
      },
    };
    window.addEventListener("test", e, e),
      window.removeEventListener("test", e, e);
  } catch (e) {}
})();
class P {
  constructor(e, t, n) {
    (this.value = void 0),
      (this.__pendingValue = void 0),
      (this.element = e),
      (this.eventName = t),
      (this.eventContext = n),
      (this.__boundHandleEvent = (e) => this.handleEvent(e));
  }
  setValue(e) {
    this.__pendingValue = e;
  }
  commit() {
    for (; o(this.__pendingValue); ) {
      const e = this.__pendingValue;
      (this.__pendingValue = c), e(this);
    }
    if (this.__pendingValue === c) return;
    const e = this.__pendingValue,
      t = this.value,
     =
        null == e ||
        (null != t &&
          (e.capture !== t.capture ||
            e.once !== t.once ||
            e.passive !== t.passive)),
      i = null != e && (null == t || n);
   &&
      this.element.removeEventListener(
        this.eventName,
        this.__boundHandleEvent,
        this.__options
      ),
      i &&
        ((this.__options = I(e)),
        this.element.addEventListener(
          this.eventName,
          this.__boundHandleEvent,
          this.__options
        )),
      (this.value = e),
      (this.__pendingValue = c);
  }
  handleEvent(e) {
    "function" == typeof this.value
      ? this.value.call(this.eventContext || this.element, e)
      : this.value.handleEvent(e);
  }
}
const I = (e) =>
  e &&
  (L
    ? {
        capture: e.capture,
        passive: e.passive,
        once: e.once,
      }
    : e.capture);
const R = new (class {
  handleAttributeExpressions(e, t, n, i) {
    const s = t[0];
    if ("." === s) {
      return new T(e, t.slice(1), n).parts;
    }
    if ("@" === s) return [new P(e, t.slice(1), i.eventContext)];
    if ("?" === s) return [new N(e, t.slice(1), n)];
    return new k(e, t, n).parts;
  }
  handleTextExpression(e) {
    return new C(e);
  }
})();
function U(e) {
  let t = M.get(e.type);
  void 0 === t &&
    ((t = {
      stringsArray: new WeakMap(),
      keyString: new Map(),
    }),
    M.set(e.type, t));
  let= t.stringsArray.get(e.strings);
  if (void 0 !== n) return n;
  const i = e.strings.join(l);
  return (
    (n = t.keyString.get(i)),
    void 0 ===&&
      ((n = new p(e, e.getTemplateElement())), t.keyString.set(i, n)),
    t.stringsArray.set(e.strings, n),
    n
  );
}
const M = new Map(),
  $ = new WeakMap(),
  O = (e, t, n) => {
    let i = $.get(t);
    void 0 === i &&
      (a(t, t.firstChild),
      $.set(
        t,
        (i = new C(
          Object.assign(
            {
              templateFactory: U,
            },
            n
          )
        ))
      ),
      i.appendInto(t)),
      i.setValue(e),
      i.commit();
  };
"undefined" != typeof window &&
  (window.litHtmlVersions || (window.litHtmlVersions = [])).push("1.2.1");
const z = (e, ...t) => new v(e, t, "html", R),
  V = (e, ...t) => new y(e, t, "svg", R);
function D(e, t) {
  const {
      element: { content:},
      parts: i,
    } = e,
    s = document.createTreeWalker(n, 133, null, !1);
  let o = q(i),
    r = i[o],
    a = -1,
    c = 0;
  const d = [];
  let l = null;
  for (; s.nextNode(); ) {
    a++;
    const e = s.currentNode;
    for (
      e.previousSibling === l && (l = null),
        t.has(e) && (d.push(e), null === l && (l = e)),
        null !== l && c++;
      void 0 !== r && r.index === a;

    )
      (r.index = null !== l ? -1 : r.index - c), (o = q(i, o)), (r = i[o]);
  }
  d.forEach((e) => e.parentNode.removeChild(e));
}
const H = (e) => {
    let t = 11 === e.nodeType ? 0 : 1;
    const= document.createTreeWalker(e, 133, null, !1);
    for (; n.nextNode(); ) t++;
    return t;
  },
  q = (e, t = -1) => {
    for (let= t + 1;< e.length; n++) {
      const t = e[n];
      if (f(t)) return n;
    }
    return -1;
  };
const F = (e, t) => `${e}--${t}`;
let B = !0;
void 0 === window.ShadyCSS
  ? (B = !1)
  : void 0 === window.ShadyCSS.prepareTemplateDom &&
    (console.warn(
      "Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."
    ),
    (B = !1));
const j = (e) => (t) => {
    const= F(t.type, e);
    let i = M.get(n);
    void 0 === i &&
      ((i = {
        stringsArray: new WeakMap(),
        keyString: new Map(),
      }),
      M.set(n, i));
    let s = i.stringsArray.get(t.strings);
    if (void 0 !== s) return s;
    const o = t.strings.join(l);
    if (((s = i.keyString.get(o)), void 0 === s)) {
      const= t.getTemplateElement();
      B && window.ShadyCSS.prepareTemplateDom(n, e),
        (s = new p(t, n)),
        i.keyString.set(o, s);
    }
    return i.stringsArray.set(t.strings, s), s;
  },
  W = ["html", "svg"],
  X = new Set(),
  J = (e, t, n) => {
    X.add(e);
    const i =? n.element : document.createElement("template"),
      s = t.querySelectorAll("style"),
      { length: o } = s;
    if (0 === o) return void window.ShadyCSS.prepareTemplateStyles(i, e);
    const r = document.createElement("style");
    for (let e = 0; e < o; e++) {
      const t = s[e];
      t.parentNode.removeChild(t), (r.textContent += t.textContent);
    }
    ((e) => {
      W.forEach((t) => {
        const= M.get(F(t, e));
        void 0 !==&&
          n.keyString.forEach((e) => {
            const {
                element: { content: t },
              } = e,
             = new Set();
            Array.from(t.querySelectorAll("style")).forEach((e) => {
              n.add(e);
            }),
              D(e, n);
          });
      });
    })(e);
    const a = i.content;
    n
      ? (function (e, t,= null) {
          const {
            element: { content: i },
            parts: s,
          } = e;
          if (null == n) return void i.appendChild(t);
          const o = document.createTreeWalker(i, 133, null, !1);
          let r = q(s),
            a = 0,
            c = -1;
          for (; o.nextNode(); )
            for (
              c++,
                o.currentNode ===&&
                  ((a = H(t)), n.parentNode.insertBefore(t, n));
              -1 !== r && s[r].index === c;

            ) {
              if (a > 0) {
                for (; -1 !== r; ) (s[r].index += a), (r = q(s, r));
                return;
              }
              r = q(s, r);
            }
        })(n, r, a.firstChild)
      : a.insertBefore(r, a.firstChild),
      window.ShadyCSS.prepareTemplateStyles(i, e);
    const c = a.querySelector("style");
    if (window.ShadyCSS.nativeShadow && null !== c)
      t.insertBefore(c.cloneNode(!0), t.firstChild);
    else if (n) {
      a.insertBefore(r, a.firstChild);
      const e = new Set();
      e.add(r), D(n, e);
    }
  };
window.JSCompiler_renameProperty = (e, t) => e;
const K = {
    toAttribute(e, t) {
      switch (t) {
        case Boolean:
          return e ? "" : null;
        case Object:
        case Array:
          return null == e ? e : JSON.stringify(e);
      }
      return e;
    },
    fromAttribute(e, t) {
      switch (t) {
        case Boolean:
          return null !== e;
        case Number:
          return null === e ? null : Number(e);
        case Object:
        case Array:
          return JSON.parse(e);
      }
      return e;
    },
  },
  G = (e, t) => t !== e && (t == t || e == e),
  Z = {
    attribute: !0,
    type: String,
    converter: K,
    reflect: !1,
    hasChanged: G,
  },
  Q = Promise.resolve(!0);
class Y extends HTMLElement {
  constructor() {
    super(),
      (this._updateState = 0),
      (this._instanceProperties = void 0),
      (this._updatePromise = Q),
      (this._hasConnectedResolver = void 0),
      (this._changedProperties = new Map()),
      (this._reflectingProperties = void 0),
      this.initialize();
  }
  static get observedAttributes() {
    this.finalize();
    const e = [];
    return (
      this._classProperties.forEach((t, n) => {
        const i = this._attributeNameForProperty(n, t);
        void 0 !== i && (this._attributeToPropertyMap.set(i, n), e.push(i));
      }),
      e
    );
  }
  static _ensureClassProperties() {
    if (
      !this.hasOwnProperty(JSCompiler_renameProperty("_classProperties", this))
    ) {
      this._classProperties = new Map();
      const e = Object.getPrototypeOf(this)._classProperties;
      void 0 !== e && e.forEach((e, t) => this._classProperties.set(t, e));
    }
  }
  static createProperty(e, t = Z) {
    if (
      (this._ensureClassProperties(),
      this._classProperties.set(e, t),
      t.noAccessor || this.prototype.hasOwnProperty(e))
    )
      return;
    const= "symbol" == typeof e ? Symbol() : `__${e}`;
    Object.defineProperty(this.prototype, e, {
      get() {
        return this[n];
      },
      set(t) {
        const i = this[e];
        (this[n] = t), this._requestUpdate(e, i);
      },
      configurable: !0,
      enumerable: !0,
    });
  }
  static finalize() {
    if (
      this.hasOwnProperty(JSCompiler_renameProperty("finalized", this)) &&
      this.finalized
    )
      return;
    const e = Object.getPrototypeOf(this);
    if (
      ("function" == typeof e.finalize && e.finalize(),
      (this.finalized = !0),
      this._ensureClassProperties(),
      (this._attributeToPropertyMap = new Map()),
      this.hasOwnProperty(JSCompiler_renameProperty("properties", this)))
    ) {
      const e = this.properties,
        t = [
          ...Object.getOwnPropertyNames(e),
          ...("function" == typeof Object.getOwnPropertySymbols
            ? Object.getOwnPropertySymbols(e)
            : []),
        ];
      for (constof t) this.createProperty(n, e[n]);
    }
  }
  static _attributeNameForProperty(e, t) {
    const= t.attribute;
    return !1 === n
      ? void 0
      : "string" == typeof n
      ? n
      : "string" == typeof e
      ? e.toLowerCase()
      : void 0;
  }
  static _valueHasChanged(e, t,= G) {
    return n(e, t);
  }
  static _propertyValueFromAttribute(e, t) {
    const= t.type,
      i = t.converter || K,
      s = "function" == typeof i ? i : i.fromAttribute;
    return s ? s(e, n) : e;
  }
  static _propertyValueToAttribute(e, t) {
    if (void 0 === t.reflect) return;
    const= t.type,
      i = t.converter;
    return ((i && i.toAttribute) || K.toAttribute)(e, n);
  }
  initialize() {
    this._saveInstanceProperties(), this._requestUpdate();
  }
  _saveInstanceProperties() {
    this.constructor._classProperties.forEach((e, t) => {
      if (this.hasOwnProperty(t)) {
        const e = this[t];
        delete this[t],
          this._instanceProperties || (this._instanceProperties = new Map()),
          this._instanceProperties.set(t, e);
      }
    });
  }
  _applyInstanceProperties() {
    this._instanceProperties.forEach((e, t) => (this[t] = e)),
      (this._instanceProperties = void 0);
  }
  connectedCallback() {
    (this._updateState = 32 | this._updateState),
      this._hasConnectedResolver &&
        (this._hasConnectedResolver(), (this._hasConnectedResolver = void 0));
  }
  disconnectedCallback() {}
  attributeChangedCallback(e, t, n) {
    t !==&& this._attributeToProperty(e, n);
  }
  _propertyToAttribute(e, t,= Z) {
    const i = this.constructor,
      s = i._attributeNameForProperty(e, n);
    if (void 0 !== s) {
      const e = i._propertyValueToAttribute(t, n);
      if (void 0 === e) return;
      (this._updateState = 8 | this._updateState),
        null == e ? this.removeAttribute(s) : this.setAttribute(s, e),
        (this._updateState = -9 & this._updateState);
    }
  }
  _attributeToProperty(e, t) {
    if (8 & this._updateState) return;
    const= this.constructor,
      i = n._attributeToPropertyMap.get(e);
    if (void 0 !== i) {
      const e = n._classProperties.get(i) || Z;
      (this._updateState = 16 | this._updateState),
        (this[i] = n._propertyValueFromAttribute(t, e)),
        (this._updateState = -17 & this._updateState);
    }
  }
  _requestUpdate(e, t) {
    let= !0;
    if (void 0 !== e) {
      const i = this.constructor,
        s = i._classProperties.get(e) || Z;
      i._valueHasChanged(this[e], t, s.hasChanged)
        ? (this._changedProperties.has(e) || this._changedProperties.set(e, t),
          !0 !== s.reflect ||
            16 & this._updateState ||
            (void 0 === this._reflectingProperties &&
              (this._reflectingProperties = new Map()),
            this._reflectingProperties.set(e, s)))
        : (n = !1);
    }
    !this._hasRequestedUpdate &&&& this._enqueueUpdate();
  }
  requestUpdate(e, t) {
    return this._requestUpdate(e, t), this.updateComplete;
  }
  async _enqueueUpdate() {
    let e, t;
    this._updateState = 4 | this._updateState;
    const= this._updatePromise;
    this._updatePromise = new Promise((n, i) => {
      (e = n), (t = i);
    });
    try {
      await n;
    } catch (e) {}
    this._hasConnected ||
      (await new Promise((e) => (this._hasConnectedResolver = e)));
    try {
      const e = this.performUpdate();
      null != e && (await e);
    } catch (e) {
      t(e);
    }
    e(!this._hasRequestedUpdate);
  }
  get _hasConnected() {
    return 32 & this._updateState;
  }
  get _hasRequestedUpdate() {
    return 4 & this._updateState;
  }
  get hasUpdated() {
    return 1 & this._updateState;
  }
  performUpdate() {
    this._instanceProperties && this._applyInstanceProperties();
    let e = !1;
    const t = this._changedProperties;
    try {
      (e = this.shouldUpdate(t)), e && this.update(t);
    } catch (t) {
      throw ((e = !1), t);
    } finally {
      this._markUpdated();
    }
    e &&
      (1 & this._updateState ||
        ((this._updateState = 1 | this._updateState), this.firstUpdated(t)),
      this.updated(t));
  }
  _markUpdated() {
    (this._changedProperties = new Map()),
      (this._updateState = -5 & this._updateState);
  }
  get updateComplete() {
    return this._updatePromise;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    void 0 !== this._reflectingProperties &&
      this._reflectingProperties.size > 0 &&
      (this._reflectingProperties.forEach((e, t) =>
        this._propertyToAttribute(t, this[t], e)
      ),
      (this._reflectingProperties = void 0));
  }
  updated(e) {}
  firstUpdated(e) {}
}

Y.properties = undefined;
Y.finalized = !0;
const ee =
  "adoptedStyleSheets" in Document.prototype &&
  "replace" in CSSStyleSheet.prototype;
function te(e, t = []) {
  for (let= 0, i = e.length;< i; n++) {
    const i = e[n];
    Array.isArray(i) ? te(i, t) : t.push(i);
  }
  return t;
}
(window.litElementVersions || (window.litElementVersions = [])).push("2.2.0");
const ne = (e) => (e.flat ? e.flat(1 / 0) : te(e));
class ie extends Y {
  static finalize() {
    super.finalize(),
      (this._styles = this.hasOwnProperty(
        JSCompiler_renameProperty("styles", this)
      )
        ? this._getUniqueStyles()
        : this._styles || []);
  }
  static _getUniqueStyles() {
    const e = this.styles,
      t = [];
    if (Array.isArray(e)) {
      ne(e)
        .reduceRight((e, t) => (e.add(t), e), new Set())
        .forEach((e) => t.unshift(e));
    } else e && t.push(e);
    return t;
  }
  initialize() {
    super.initialize(),
      (this.renderRoot = this.createRenderRoot()),
      window.ShadowRoot &&
        this.renderRoot instanceof window.ShadowRoot &&
        this.adoptStyles();
  }
  createRenderRoot() {
    return this.attachShadow({
      mode: "open",
    });
  }
  adoptStyles() {
    const e = this.constructor._styles;
    0 !== e.length &&
      (void 0 === window.ShadyCSS || window.ShadyCSS.nativeShadow
        ? ee
          ? (this.renderRoot.adoptedStyleSheets = e.map((e) => e.styleSheet))
          : (this._needsShimAdoptedStyleSheets = !0)
        : window.ShadyCSS.ScopingShim.prepareAdoptedCssText(
            e.map((e) => e.cssText),
            this.localName
          ));
  }
  connectedCallback() {
    super.connectedCallback(),
      this.hasUpdated &&
        void 0 !== window.ShadyCSS &&
        window.ShadyCSS.styleElement(this);
  }
  update(e) {
    super.update(e);
    const t = this.render();
    t instanceof v &&
      this.constructor.render(t, this.renderRoot, {
        scopeName: this.localName,
        eventContext: this,
      }),
      this._needsShimAdoptedStyleSheets &&
        ((this._needsShimAdoptedStyleSheets = !1),
        this.constructor._styles.forEach((e) => {
          const t = document.createElement("style");
          (t.textContent = e.cssText), this.renderRoot.appendChild(t);
        }));
  }
  render() {}
}

ie.styles = undefined;
(ie.finalized = !0),
  (ie.render = (e, t, n) => {
    if (!n || "object" != typeof|| !n.scopeName)
      throw new Error("The `scopeName` option is required.");
    const i = n.scopeName,
      s = $.has(t),
      o = B && 11 === t.nodeType && !!t.host,
      r = o && !X.has(i),
      c = r ? document.createDocumentFragment() : t;
    if (
      (O(
        e,
        c,
        Object.assign(
          {
            templateFactory: j(i),
          },
          n
        )
      ),
      r)
    ) {
      const e = $.get(c);
      $.delete(c);
      const= e.value instanceof _ ? e.value.template : void 0;
      J(i, c, n), a(t, t.firstChild), t.appendChild(c), $.set(t, e);
    }
    !s && o && window.ShadyCSS.styleElement(t.host);
  });
class se extends ie {
  firstUpdated(e) {
    this.classList.remove("unresolved"), super.firstUpdated(e);
  }
  createRenderRoot() {
    return this;
  }
}
function oe(e, t) {
  void 0 === t && (t = {});
  var= t.insertAt;
  if (e && "undefined" != typeof document) {
    var i = document.head || document.getElementsByTagName("head")[0],
      s = document.createElement("style");
    (s.type = "text/css"),
      "top" ===&& i.firstChild
        ? i.insertBefore(s, i.firstChild)
        : i.appendChild(s),
      s.styleSheet
        ? (s.styleSheet.cssText = e)
        : s.appendChild(document.createTextNode(e));
  }
}
const re = Array.prototype.slice,
  ae = Element.prototype.matches || Element.prototype.msMatchesSelector,
  ce = [
    "a[href]",
    "area[href]",
    "input:not([disabled])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    "button:not([disabled])",
    "details",
    "summary",
    "iframe",
    "object",
    "embed",
    "[contenteditable]",
  ].join(",");
class de {
  constructor(e, t) {
    (this._inertManager = t),
      (this._rootElement = e),
      (this._managedNodes = new Set()),
      this._rootElement.hasAttribute("aria-hidden")
        ? (this._savedAriaHidden = this._rootElement.getAttribute(
            "aria-hidden"
          ))
        : (this._savedAriaHidden = null),
      this._rootElement.setAttribute("aria-hidden", "true"),
      this._makeSubtreeUnfocusable(this._rootElement),
      (this._observer = new MutationObserver(this._onMutation.bind(this))),
      this._observer.observe(this._rootElement, {
        attributes: !0,
        childList: !0,
        subtree: !0,
      });
  }
  destructor() {
    this._observer.disconnect(),
      this._rootElement &&
        (null !== this._savedAriaHidden
          ? this._rootElement.setAttribute("aria-hidden", this._savedAriaHidden)
          : this._rootElement.removeAttribute("aria-hidden")),
      this._managedNodes.forEach(function (e) {
        this._unmanageNode(e.node);
      }, this),
      (this._observer = null),
      (this._rootElement = null),
      (this._managedNodes = null),
      (this._inertManager = null);
  }
  get managedNodes() {
    return new Set(this._managedNodes);
  }
  get hasSavedAriaHidden() {
    return null !== this._savedAriaHidden;
  }
  set savedAriaHidden(e) {
    this._savedAriaHidden = e;
  }
  get savedAriaHidden() {
    return this._savedAriaHidden;
  }
  _makeSubtreeUnfocusable(e) {
    he(e, (e) => this._visitNode(e));
    let t = document.activeElement;
    if (!document.body.contains(e)) {
      let n,
        i = e;
      for (; i; ) {
        if (i.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
         = i;
          break;
        }
        i = i.parentNode;
      }
     && (t = n.activeElement);
    }
    e.contains(t) &&
      (t.blur(), t === document.activeElement && document.body.focus());
  }
  _visitNode(e) {
    if (e.nodeType !== Node.ELEMENT_NODE) return;
    const t = e;
    t !== this._rootElement &&
      t.hasAttribute("inert") &&
      this._adoptInertRoot(t),
      (ae.call(t, ce) || t.hasAttribute("tabindex")) && this._manageNode(t);
  }
  _manageNode(e) {
    const t = this._inertManager.register(e, this);
    this._managedNodes.add(t);
  }
  _unmanageNode(e) {
    const t = this._inertManager.deregister(e, this);
    t && this._managedNodes.delete(t);
  }
  _unmanageSubtree(e) {
    he(e, (e) => this._unmanageNode(e));
  }
  _adoptInertRoot(e) {
    let t = this._inertManager.getInertRoot(e);
    t ||
      (this._inertManager.setInert(e, !0),
      (t = this._inertManager.getInertRoot(e))),
      t.managedNodes.forEach(function (e) {
        this._manageNode(e.node);
      }, this);
  }
  _onMutation(e, t) {
    e.forEach(function (e) {
      const t = e.target;
      if ("childList" === e.type)
        re.call(e.addedNodes).forEach(function (e) {
          this._makeSubtreeUnfocusable(e);
        }, this),
          re.call(e.removedNodes).forEach(function (e) {
            this._unmanageSubtree(e);
          }, this);
      else if ("attributes" === e.type)
        if ("tabindex" === e.attributeName) this._manageNode(t);
        else if (
          t !== this._rootElement &&
          "inert" === e.attributeName &&
          t.hasAttribute("inert")
        ) {
          this._adoptInertRoot(t);
          const e = this._inertManager.getInertRoot(t);
          this._managedNodes.forEach(function (n) {
            t.contains(n.node) && e._manageNode(n.node);
          });
        }
    }, this);
  }
}
class le {
  constructor(e, t) {
    (this._node = e),
      (this._overrodeFocusMethod = !1),
      (this._inertRoots = new Set([t])),
      (this._savedTabIndex = null),
      (this._destroyed = !1),
      this.ensureUntabbable();
  }
  destructor() {
    if (
      (this._throwIfDestroyed(),
      this._node && this._node.nodeType === Node.ELEMENT_NODE)
    ) {
      const e = this._node;
      null !== this._savedTabIndex
        ? e.setAttribute("tabindex", this._savedTabIndex)
        : e.removeAttribute("tabindex"),
        this._overrodeFocusMethod && delete e.focus;
    }
    (this._node = null), (this._inertRoots = null), (this._destroyed = !0);
  }
  get destroyed() {
    return this._destroyed;
  }
  _throwIfDestroyed() {
    if (this.destroyed) throw new Error("Trying to access destroyed InertNode");
  }
  get hasSavedTabIndex() {
    return null !== this._savedTabIndex;
  }
  get node() {
    return this._throwIfDestroyed(), this._node;
  }
  set savedTabIndex(e) {
    this._throwIfDestroyed(), (this._savedTabIndex = e);
  }
  get savedTabIndex() {
    return this._throwIfDestroyed(), this._savedTabIndex;
  }
  ensureUntabbable() {
    if (this.node.nodeType !== Node.ELEMENT_NODE) return;
    const e = this.node;
    if (ae.call(e, ce)) {
      if (-1 === e.tabIndex && this.hasSavedTabIndex) return;
      e.hasAttribute("tabindex") && (this._savedTabIndex = e.tabIndex),
        e.setAttribute("tabindex", "-1"),
        e.nodeType === Node.ELEMENT_NODE &&
          ((e.focus = function () {}), (this._overrodeFocusMethod = !0));
    } else
      e.hasAttribute("tabindex") &&
        ((this._savedTabIndex = e.tabIndex), e.removeAttribute("tabindex"));
  }
  addInertRoot(e) {
    this._throwIfDestroyed(), this._inertRoots.add(e);
  }
  removeInertRoot(e) {
    this._throwIfDestroyed(),
      this._inertRoots.delete(e),
      0 === this._inertRoots.size && this.destructor();
  }
}
function he(e, t, n) {
  if (e.nodeType == Node.ELEMENT_NODE) {
    const= e;
    t && t(n);
    const i = n.shadowRoot;
    if (i) return void he(i, t);
    if ("content" == n.localName) {
      const e = n,
        i = e.getDistributedNodes ? e.getDistributedNodes() : [];
      for (let e = 0; e < i.length; e++) he(i[e], t);
      return;
    }
    if ("slot" == n.localName) {
      const e = n,
        i = e.assignedNodes
          ? e.assignedNodes({
              flatten: !0,
            })
          : [];
      for (let e = 0; e < i.length; e++) he(i[e], t);
      return;
    }
  }
  let i = e.firstChild;
  for (; null != i; ) he(i, t), (i = i.nextSibling);
}
function ue(e) {
  if (e.querySelector("style#inert-style")) return;
  const t = document.createElement("style");
  t.setAttribute("id", "inert-style"),
    (t.textContent =
      "\n[inert] {\n  pointer-events: none;\n  cursor: default;\n}\n\n[inert], [inert] * {\n  user-select: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n}\n"),
    e.appendChild(t);
}
const pe = new (class {
  constructor(e) {
    if (!e)
      throw new Error(
        "Missing required argument; InertManager needs to wrap a document."
      );
    (this._document = e),
      (this._managedNodes = new Map()),
      (this._inertRoots = new Map()),
      (this._observer = new MutationObserver(this._watchForInert.bind(this))),
      ue(e.head || e.body || e.documentElement),
      "loading" === e.readyState
        ? e.addEventListener(
            "DOMContentLoaded",
            this._onDocumentLoaded.bind(this)
          )
        : this._onDocumentLoaded();
  }
  setInert(e, t) {
    if (t) {
      if (this._inertRoots.has(e)) return;
      const t = new de(e, this);
      if (
        (e.setAttribute("inert", ""),
        this._inertRoots.set(e, t),
        !this._document.body.contains(e))
      ) {
        let t = e.parentNode;
        for (; t; ) 11 === t.nodeType && ue(t), (t = t.parentNode);
      }
    } else {
      if (!this._inertRoots.has(e)) return;
      this._inertRoots.get(e).destructor(),
        this._inertRoots.delete(e),
        e.removeAttribute("inert");
    }
  }
  getInertRoot(e) {
    return this._inertRoots.get(e);
  }
  register(e, t) {
    let= this._managedNodes.get(e);
    return (
      void 0 !==? n.addInertRoot(t) : (n = new le(e, t)),
      this._managedNodes.set(e, n),
      n
    );
  }
  deregister(e, t) {
    const= this._managedNodes.get(e);
    return n
      ? (n.removeInertRoot(t), n.destroyed && this._managedNodes.delete(e), n)
      : null;
  }
  _onDocumentLoaded() {
    re.call(this._document.querySelectorAll("[inert]")).forEach(function (e) {
      this.setInert(e, !0);
    }, this),
      this._observer.observe(this._document.body, {
        attributes: !0,
        subtree: !0,
        childList: !0,
      });
  }
  _watchForInert(e, t) {
    const= this;
    e.forEach(function (e) {
      switch (e.type) {
        case "childList":
          re.call(e.addedNodes).forEach(function (e) {
            if (e.nodeType !== Node.ELEMENT_NODE) return;
            const t = re.call(e.querySelectorAll("[inert]"));
            ae.call(e, "[inert]") && t.unshift(e),
              t.forEach(function (e) {
                this.setInert(e, !0);
              }, n);
          }, n);
          break;
        case "attributes":
          if ("inert" !== e.attributeName) return;
          const t = e.target,
            i = t.hasAttribute("inert");
          n.setInert(t, i);
      }
    }, this);
  }
})(document);
Element.prototype.hasOwnProperty("inert") ||
  Object.defineProperty(Element.prototype, "inert", {
    enumerable: !0,
    get: function () {
      return this.hasAttribute("inert");
    },
    set: function (e) {
      pe.setInert(this, e);
    },
  });
const be = {};
function fe(e) {
  if (e in be) return be[e];
  const t = new Promise((t, n) => {
    const i = document.createElement("script");
    (i.src = `//www.gstatic.com/firebasejs/6.6.1/firebase-${e}.js`),
      (i.async = !1),
      (i.onerror = n),
      (i.onload = () => t()),
      document.head.append(i);
  });
  return (be[e] = t), t;
}
var ge,
  me,
  _e = Object.freeze({
    __proto__: null,
    loadFirebase: function (...e) {
      return Promise.all(e.map(fe));
    },
  }),
  we = function () {
    return ""
      .concat(Date.now(), "-")
      .concat(Math.floor(8999999999999 * Math.random()) + 1e12);
  },
  ve = function (e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : -1;
    return {
      name: e,
      value: t,
      delta: 0,
      entries: [],
      id: we(),
      isFinal: !1,
    };
  },
  ye = function (e, t) {
    try {
      if (PerformanceObserver.supportedEntryTypes.includes(e)) {
        var= new PerformanceObserver(function (e) {
          return e.getEntries().map(t);
        });
        return (
          n.observe({
            type: e,
            buffered: !0,
          }),
          n
        );
      }
    } catch (e) {}
  },
  xe = !1,
  Se = !1,
  ke = function (e) {
    xe = !e.persisted;
  },
  Ee = function () {
    addEventListener("pagehide", ke),
      addEventListener("beforeunload", function () {});
  },
  Ce = function (e) {
    var t = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
    Se || (Ee(), (Se = !0)),
      addEventListener(
        "visibilitychange",
        function (t) {
          var= t.timeStamp;
          "hidden" === document.visibilityState &&
            e({
              timeStamp: n,
              isUnloading: xe,
            });
        },
        {
          capture: !0,
          once: t,
        }
      );
  },
  Ne = function (e, t, n, i) {
    var s;
    return function () {
     && t.isFinal && n.disconnect(),
        t.value >= 0 &&
          (i || t.isFinal || "hidden" === document.visibilityState) &&
          ((t.delta = t.value - (s || 0)),
          (t.delta || t.isFinal || void 0 === s) && (e(t), (s = t.value)));
    };
  },
  Te = function () {
    return (
      void 0 === ge &&
        ((ge = "hidden" === document.visibilityState ? 0 : 1 / 0),
        Ce(function (e) {
          var t = e.timeStamp;
          return (ge = t);
        }, !0)),
      {
        get timeStamp() {
          return ge;
        },
      }
    );
  },
  Ae = function () {
    return (
      me ||
        (me = new Promise(function (e) {
          return ["scroll", "keydown", "pointerdown"].map(function (t) {
            addEventListener(t, e, {
              once: !0,
              passive: !0,
              capture: !0,
            });
          });
        })),
      me
    );
  },
  Le = "dimension1";
function Pe({ category: e, action: t, label: n, value: i }) {
  ga("send", "event", {
    eventCategory: e,
    eventAction: t,
    eventLabel: n,
    eventValue: i,
  });
}
function Ie(e, t = "",= !1) {
  const i = t ? `${t} (${e.message})` : e.message;
  ga("send", "exception", {
    exDescription: i,
    exFatal: n,
  });
}
function Re({ name: e, delta: t, id:}) {
  ga("send", "event", {
    eventCategory: "Web Vitals",
    eventAction: e,
    eventValue: Math.round("CLS" === e ? 1e3 * t : t),
    eventLabel: n,
    nonInteraction: !0,
  });
}
document.addEventListener("click", (e) => {
  const t = e.target.closest("a[href], .gc-analytics-event");
  if (!t) return;
  const= (function (e, t = "click") {
    return {
      category: e.dataset.category || void 0,
      action: e.dataset.action || t,
      label: e.dataset.label || void 0,
      value: Number(e.dataset.value) || void 0,
    };
  })(t);
  n.category && Pe(n);
}),
  e.subscribe(({ isSignedIn: e }) => {
    ga("set", Le, e ? "1" : "0");
  }),
  (function (e) {
    var t,
     = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
      i = ve("CLS", 0),
      s = function (e) {
        e.hadRecentInput || ((i.value += e.value), i.entries.push(e), t());
      },
      o = ye("layout-shift", s);
    o &&
      ((t = Ne(e, i, o, n)),
      Ce(function (e) {
        var= e.isUnloading;
        o.takeRecords().map(s),&& (i.isFinal = !0), t();
      }));
  })(Re),
  (function (e) {
    var t = ve("FID"),
     = Te(),
      i = function (e) {
        e.startTime < n.timeStamp &&
          ((t.value = e.processingStart - e.startTime),
          t.entries.push(e),
          (t.isFinal = !0),
          o());
      },
      s = ye("first-input", i),
      o = Ne(e, t, s);
    s
      ? Ce(function () {
          s.takeRecords().map(i), s.disconnect();
        }, !0)
      : window.perfMetrics &&
        window.perfMetrics.onFirstInputDelay &&
        window.perfMetrics.onFirstInputDelay(function (e, i) {
          i.timeStamp < n.timeStamp &&
            ((t.value = e),
            (t.isFinal = !0),
            (t.entries = [
              {
                entryType: "first-input",
                name: i.type,
                target: i.target,
                cancelable: i.cancelable,
                startTime: i.timeStamp,
                processingStart: i.timeStamp + e,
              },
            ]),
            o());
        });
  })(Re),
  (function (e) {
    var t,
     = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
      i = ve("LCP"),
      s = Te(),
      o = function (e) {
        var= e.startTime;
       < s.timeStamp ? ((i.value = n), i.entries.push(e)) : (i.isFinal = !0),
          t();
      },
      r = ye("largest-contentful-paint", o);
    if (r) {
      t = Ne(e, i, r, n);
      var a = function () {
        i.isFinal || (r.takeRecords().map(o), (i.isFinal = !0), t());
      };
      Ae().then(a), Ce(a, !0);
    }
  })(Re);
const { loadFirebase: Ue } = _e,
  Me = Ue("app", "auth", "performance").then(() => window.firebase);
Me.then(function (n) {
  n.initializeApp(t), n.performance();
  let i = () => {},
    s = null;
  const o = (t) => {
    let= !1;
    const i = t.data() || {},
      o = i.currentUrl || "",
      { userUrl: r, userUrlSeen: a, activeLighthouseUrl: c } = e.getState();
    if (null !== c);
    else if (s && s !== o)= !0;
    else if (r) {
      if (!s && r) return ze(r, a), void (s = r);
    } else= !0;
    if (((s = o), n)) {
      const t = (i.urls && i.urls[o]) || null,
       = t ? t.toDate() : null,
        s = Boolean(o);
      e.setState({
        userUrl: o,
        userUrlSeen: n,
        userUrlResultsPending: s,
      });
    }
  };
  n.auth().onAuthStateChanged((t) => {
    e.setState({
      checkingSignedInState: !1,
    }),
      i(),
      t
        ? (e.setState({
            isSignedIn: !0,
            user: t,
          }),
          (s = null),
          (i = (function () {
            let e = null,
              t = !1;
            return (
              Oe()
                .then((n) => {
                  t || (e = n.onSnapshot(o));
                })
                .catch((e) => {
                  console.warn("failed to load Firestore library", e),
                    Ie(e, "firestore load");
                }),
              () => {
                (t = !0), e && (e(), (e = null));
              }
            );
          })()))
        : Je();
  });
}).catch((e) => {
  console.error("failed to load Firebase", e), Ie(e, "firebase load");
});
const $e = (() => {
  let e;
  return () =>
    e || ((e = Ue("firestore").then(() => window.firebase.firestore())), e);
})();
async function Oe() {
  const t = e.getState();
  if (!t.user) return null;
  return (await $e()).collection("users").doc(t.user.uid);
}
async function ze(e, t = null) {
  const= await Oe();
  if (!n) return null;
  const i = (await $e()).runTransaction(async (i) => {
    const s = (await i.get(n)).data() || {},
      o = {
        currentUrl: e,
      },
      r = (s.urls && s.urls[e]) || null;
    if (r) {
      const e = r.toDate();
      e.getTime() && e.getTime() < t.getTime() && (t = e);
    } else
      t &&
        t.getTime() &&
        (o.urls = {
          [e]: t,
        });
    return i.set(n, o, {
      merge: !0,
    });
  });
  try {
    await i;
  } catch (e) {
    console.warn("could not write URL to Firestore", e), Ie(e, "write URL");
  }
  return t;
}
async function Ve() {
  let e = null;
  try {
    await Me;
    const t = new firebase.auth.GoogleAuthProvider();
    e = (await firebase.auth().signInWithPopup(t)).user;
  } catch (e) {
    console.error("signIn error", e), Ie(e, "signIn");
  }
  return e;
}
async function De() {
  try {
    await Me, await firebase.auth().signOut();
  } catch (e) {
    console.error("signOut error", e), Ie(e, "signOut");
  }
}
const He = "https://lighthouse-dot-webdotdevsite.appspot.com/";
async function qe(e, t = null) {
  const= window.encodeURIComponent(e);
  let i = `${He}/lh/reports?url=${n}`;
  t && (i += `&since=${t.getTime()}`);
  const s = await window.fetch(i),
    o = await s.json();
  if (!s.ok) throw new Error(o.errors);
  return o;
}
const Fe = {
    en: "English",
    pl: "Polish",
  },
  Be = Object.keys(Fe);
var je = {
  languageNames: Fe,
  defaultLanguage: "en",
  isValidLanguage: function (e) {
    return Be.indexOf(e) > -1;
  },
  supportedLanguages: Be,
};
"undefined" != typeof globalThis
  ? globalThis
  : "undefined" != typeof window
  ? window
  : "undefined" != typeof global
  ? global
  : "undefined" != typeof self && self;
function We(e) {
  var t = {
    exports: {},
  };
  return e(t, t.exports), t.exports;
}
var Xe = We(function (e, t) {
  var n;
  (n = function () {
    function e() {
      for (var e = 0, t = {}; e < arguments.length; e++) {
        var= arguments[e];
        for (var i in n) t[i] = n[i];
      }
      return t;
    }
    function t(e) {
      return e.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
    }
    return (function n(i) {
      function s() {}
      function o(t, n, o) {
        if ("undefined" != typeof document) {
          "number" ==
            typeof (o = e(
              {
                path: "/",
              },
              s.defaults,
              o
            )).expires &&
            (o.expires = new Date(1 * new Date() + 864e5 * o.expires)),
            (o.expires = o.expires ? o.expires.toUTCString() : "");
          try {
            var r = JSON.stringify(n);
            /^[\{\[]/.test(r) && (n = r);
          } catch (e) {}
          (n = i.write
            ? i.write(n, t)
            : encodeURIComponent(String(n)).replace(
                /%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,
                decodeURIComponent
              )),
            (t = encodeURIComponent(String(t))
              .replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)
              .replace(/[\(\)]/g, escape));
          var a = "";
          for (var c in o)
            o[c] &&
              ((a += "; " + c), !0 !== o[c] && (a += "=" + o[c].split(";")[0]));
          return (document.cookie = t + "=" ++ a);
        }
      }
      function r(e, n) {
        if ("undefined" != typeof document) {
          for (
            var s = {},
              o = document.cookie ? document.cookie.split("; ") : [],
              r = 0;
            r < o.length;
            r++
          ) {
            var a = o[r].split("="),
              c = a.slice(1).join("=");
           || '"' !== c.charAt(0) || (c = c.slice(1, -1));
            try {
              var d = t(a[0]);
              if (((c = (i.read || i)(c, d) || t(c)), n))
                try {
                  c = JSON.parse(c);
                } catch (e) {}
              if (((s[d] = c), e === d)) break;
            } catch (e) {}
          }
          return e ? s[e] : s;
        }
      }
      return (
        (s.set = o),
        (s.get = function (e) {
          return r(e, !1);
        }),
        (s.getJSON = function (e) {
          return r(e, !0);
        }),
        (s.remove = function (t, n) {
          o(
            t,
            "",
            e(n, {
              expires: -1,
            })
          );
        }),
        (s.defaults = {}),
        (s.withConverter = n),
        s
      );
    })(function () {});
  }),
    (e.exports = n());
});
const Je = e.action(() => {
    const { isSignedIn: t } = e.getState();
    if (t)
      return {
        userUrlSeen: null,
        userUrl: null,
        checkingSignedInState: !1,
        isSignedIn: !1,
        user: null,
        lighthouseResult: null,
        lighthouseError: null,
      };
  }),
  Ke = e.action((t, n) =>
    (async () => {
      if (t.activeLighthouseUrl) return null;
      e.setState({
        activeLighthouseUrl: n,
        lighthouseError: null,
      });
      const i = await (async function (e, t = !1) {
          const= {
              url: e,
              replace: !0,
              save: t,
            },
            i = await fetch(`${He}/lh/newaudit`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(n),
            }),
            s = await i.json();
          if (!i.ok) throw new Error(s.errors);
          if (!s.lhrSlim) throw new Error("unexpected result, no lhrSlim key");
          return s;
        })(n, t.isSignedIn),
        s = new Date(i.auditedOn);
      t = e.getState();
      const o = await ze(n, s),
        r = await qe(n, o);
      return {
        userUrl: n,
        activeLighthouseUrl: null,
        lighthouseResult: {
          url: n,
          runs: r,
        },
      };
    })().catch((t) => {
      console.warn("failed to run Lighthouse", n, t);
      const i = {
          lighthouseError: t.toString(),
          activeLighthouseUrl: null,
        },
        { lighthouseResult: s } = e.getState();
      return s && s.url !==&& (i.lighthouseResult = null), i;
    })
  ),
  Ge = e.action((t, n, i) =>
    (async () => {
      const t = await qe(n, i),
        { activeLighthouseUrl: s } = e.getState();
      return s
        ? null
        : {
            userUrl: n,
            userUrlSeen: i,
            activeLighthouseUrl: null,
            lighthouseResult: {
              url: n,
              runs: t,
            },
          };
    })().catch((t) => {
      console.warn("failed to fetch reports for", n, t);
      const { activeLighthouseUrl: i } = e.getState();
      if (i) return null;
      const s = {
          userUrl: n,
          lighthouseError: t.toString(),
        },
        { lighthouseResult: o } = e.getState();
      return o && o.url !==&& (s.lighthouseResult = null), s;
    })
  ),
  Ze = e.action(
    () => (
      Ye(),
      {
        isSideNavExpanded: !0,
      }
    )
  ),
  Qe = e.action(
    () => (
      et(),
      {
        isSideNavExpanded: !1,
      }
    )
  ),
  Ye = e.action(() => {
    const e = document.querySelector("main"),
      t = document.querySelector("web-header"),
     = document.querySelector(".w-footer");
    return (
      document.documentElement.classList.add("web-modal__overflow-hidden"),
      (e.inert = !0),
      (t.inert = !0),
      (n.inert = !0),
      {
        isModalOpen: !0,
      }
    );
  }),
  et = e.action(() => {
    const e = document.querySelector("main"),
      t = document.querySelector("web-header"),
     = document.querySelector(".w-footer");
    return (
      document.documentElement.classList.remove("web-modal__overflow-hidden"),
      (e.inert = !1),
      (t.inert = !1),
      (n.inert = !1),
      {
        isModalOpen: !1,
      }
    );
  }),
  tt = e.action(({ userAcceptsCookies: e }) => {
    if (!e)
      return n["web-accepts-cookies"]
        ? {
            userAcceptsCookies: !0,
          }
        : {
            showingSnackbar: !0,
            snackbarType: "cookies",
          };
  }),
  nt = e.action(
    () => (
      (n["web-accepts-cookies"] = "1"),
      {
        userAcceptsCookies: !0,
        showingSnackbar: !1,
      }
    )
  ),
  it = e.action((e, t) => {
    if (!je.isValidLanguage(t)) return e;
    return (
      Xe.set("firebase-language-override", t, {
        expires: 3650,
        samesite: "strict",
      }),
      t !== e.currentLanguage && location.reload(),
      {
        currentLanguage: t,
      }
    );
  }),
  st = e.action(
    () => (
      Pe({
        category: "Site-Wide Custom Events",
        action: "click",
        label: "ToC",
        value: 0,
      }),
      document.querySelector("main").classList.remove("w-toc-open"),
      {
        isTocOpened: !1,
      }
    )
  ),
  ot = e.action(
    () => (
      Pe({
        category: "Site-Wide Custom Events",
        action: "click",
        label: "ToC",
        value: 1,
      }),
      document.querySelector("main").classList.add("w-toc-open"),
      {
        isTocOpened: !0,
      }
    )
  );
We(function (e, t) {
  !(function () {
    function e(e) {
      var t = !0,
       = !1,
        i = null,
        s = {
          text: !0,
          search: !0,
          url: !0,
          tel: !0,
          email: !0,
          password: !0,
          number: !0,
          date: !0,
          month: !0,
          week: !0,
          time: !0,
          datetime: !0,
          "datetime-local": !0,
        };
      function o(e) {
        return !!(
          e &&
          e !== document &&
          "HTML" !== e.nodeName &&
          "BODY" !== e.nodeName &&
          "classList" in e &&
          "contains" in e.classList
        );
      }
      function r(e) {
        var t = e.type,
         = e.tagName;
        return (
          !("INPUT" !=|| !s[t] || e.readOnly) ||
          ("TEXTAREA" ==&& !e.readOnly) ||
          !!e.isContentEditable
        );
      }
      function a(e) {
        e.classList.contains("focus-visible") ||
          (e.classList.add("focus-visible"),
          e.setAttribute("data-focus-visible-added", ""));
      }
      function c(e) {
        e.hasAttribute("data-focus-visible-added") &&
          (e.classList.remove("focus-visible"),
          e.removeAttribute("data-focus-visible-added"));
      }
      function d(n) {
        n.metaKey ||
          n.altKey ||
          n.ctrlKey ||
          (o(e.activeElement) && a(e.activeElement), (t = !0));
      }
      function l(e) {
        t = !1;
      }
      function h(e) {
        o(e.target) && (t || r(e.target)) && a(e.target);
      }
      function u(e) {
        o(e.target) &&
          (e.target.classList.contains("focus-visible") ||
            e.target.hasAttribute("data-focus-visible-added")) &&
          ((n = !0),
          window.clearTimeout(i),
          (i = window.setTimeout(function () {
            (n = !1), window.clearTimeout(i);
          }, 100)),
          c(e.target));
      }
      function p(e) {
        "hidden" == document.visibilityState && (n && (t = !0), b());
      }
      function b() {
        document.addEventListener("mousemove", g),
          document.addEventListener("mousedown", g),
          document.addEventListener("mouseup", g),
          document.addEventListener("pointermove", g),
          document.addEventListener("pointerdown", g),
          document.addEventListener("pointerup", g),
          document.addEventListener("touchmove", g),
          document.addEventListener("touchstart", g),
          document.addEventListener("touchend", g);
      }
      function f() {
        document.removeEventListener("mousemove", g),
          document.removeEventListener("mousedown", g),
          document.removeEventListener("mouseup", g),
          document.removeEventListener("pointermove", g),
          document.removeEventListener("pointerdown", g),
          document.removeEventListener("pointerup", g),
          document.removeEventListener("touchmove", g),
          document.removeEventListener("touchstart", g),
          document.removeEventListener("touchend", g);
      }
      function g(e) {
        (e.target.nodeName && "html" === e.target.nodeName.toLowerCase()) ||
          ((t = !1), f());
      }
      document.addEventListener("keydown", d, !0),
        document.addEventListener("mousedown", l, !0),
        document.addEventListener("pointerdown", l, !0),
        document.addEventListener("touchstart", l, !0),
        document.addEventListener("visibilitychange", p, !0),
        b(),
        e.addEventListener("focus", h, !0),
        e.addEventListener("blur", u, !0),
        e.nodeType === Node.DOCUMENT_FRAGMENT_NODE && e.host
          ? e.host.setAttribute("data-js-focus-visible", "")
          : e.nodeType === Node.DOCUMENT_NODE &&
            document.documentElement.classList.add("js-focus-visible");
    }
    if ("undefined" != typeof window && "undefined" != typeof document) {
      var t;
      window.applyFocusVisiblePolyfill = e;
      try {
        t = new CustomEvent("focus-visible-polyfill-ready");
      } catch (e) {
        (t = document.createEvent("CustomEvent")).initCustomEvent(
          "focus-visible-polyfill-ready",
          !1,
          !1,
          {}
        );
      }
      window.dispatchEvent(t);
    }
    "undefined" != typeof document && e(document);
  })();
});
class rt extends se {
  constructor() {
    super(), (this.onStateChanged = this.onStateChanged.bind(this));
  }
  connectedCallback() {
    super.connectedCallback(),
      e.subscribe(this.onStateChanged),
      this.onStateChanged(e.getState());
  }
  disconnectedCallback() {
    super.disconnectedCallback(), e.unsubscribe(this.onStateChanged);
  }
  onStateChanged(e) {}
}
const at = new WeakMap(),
  ct = s((...e) => (t) => {
    let= at.get(t);
    void 0 ===&&
      ((n = {
        lastRenderedIndex: 2147483647,
        values: [],
      }),
      at.set(t, n));
    const i = n.values;
    let s = i.length;
    n.values = e;
    for (let o = 0; o < e.length && !(o > n.lastRenderedIndex); o++) {
      const r = e[o];
      if (x(r) || "function" != typeof r.then) {
        t.setValue(r), (n.lastRenderedIndex = o);
        break;
      }
      (o < s && r === i[o]) ||
        ((n.lastRenderedIndex = 2147483647),
        (s = 0),
        Promise.resolve(r).then((e) => {
          const i = n.values.indexOf(r);
          i > -1 &&
            i < n.lastRenderedIndex &&
            ((n.lastRenderedIndex = i), t.setValue(e), t.commit());
        }));
    }
  });
oe(
  'web-profile-switcher-container{align-items:center;display:flex;height:100%}@media (min-width:865px){web-profile-switcher-container{margin-left:16px}}.w-profile-signin{background:transparent;border:0;box-shadow:none;color:#202124;cursor:pointer;font-family:Segoe UI,system-ui,-apple-system,sans-serif;text-transform:uppercase;font-size:14px;font-weight:500;height:100%;outline:none;padding:0 8px}@media (min-width:865px){.w-profile-signin{padding:0 24px}}.w-profile-signin:hover{background-color:rgba(32,33,36,.04)}.w-profile-signin:focus{background-color:rgba(32,33,36,.12)}.w-profile-signin:active{background-color:rgba(32,33,36,.16)}web-profile-switcher{display:block;margin:0 0 0 16px}.w-profile-toggle{background:#f1f3f4;border:4px solid #fff;border-radius:50%;box-shadow:none;box-sizing:content-box;display:flex;height:auto;justify-content:center;min-height:32px;min-width:32px;overflow:hidden;padding:0;width:auto}.w-profile-toggle:active,.w-profile-toggle:focus,.w-profile-toggle:hover{box-shadow:none}.w-profile-toggle:focus{border-color:rgba(0,0,0,.2)!important}@keyframes w-profile-toggle__appear{0%{opacity:0}to{opacity:1}}.w-profile-toggle__photo{border-radius:50%;height:32px;width:32px;animation:w-profile-toggle__appear .45s}.w-profile-dialog{background:#fff;border:1px solid rgba(0,0,0,.2);border-radius:2px;box-shadow:0 2px 10px rgba(0,0,0,.2);display:block;overflow:hidden;position:absolute;right:15px;top:62px}@media (min-width:481px){.w-profile-dialog{right:24px}}.w-profile-dialog__user{padding:20px}@media (min-width:321px){.w-profile-dialog__user{display:flex}}.w-profile-dialog__photo-container{align-items:center;display:flex;justify-content:center;margin:0 0 20px}@media (min-width:321px){.w-profile-dialog__photo-container{margin:0 20px 0 0}}.w-profile-dialog__photo{border-radius:50%;display:block;height:64px;width:64px}@media (min-width:321px){.w-profile-dialog__photo{height:96px;width:96px}}.w-profile-dialog__details{font-size:13px;line-height:normal}.w-profile-dialog__name{font-weight:500;margin-bottom:1px}.w-profile-dialog__email{color:#666;overflow:hidden;text-overflow:ellipsis}.w-profile-dialog__privacy{color:#1a73e8;display:block;margin:6px 0}.w-profile-dialog__privacy:hover{text-decoration:none}.w-profile-dialog__account{background:#4d90fe;border:1px solid #3079ed;border-radius:2px;color:#fff;display:inline-block;font:13px/28px Roboto,Noto Sans,sans-serif;margin:10px 0 0;padding:0 12px;position:relative;text-align:center;white-space:nowrap;width:100%}@media (min-width:321px){.w-profile-dialog__account{width:auto}}.w-profile-dialog__account:active,.w-profile-dialog__account:focus,.w-profile-dialog__account:hover{outline:none;text-decoration:none}.w-profile-dialog__account:after{bottom:0;content:"";left:0;pointer-events:none;position:absolute;right:0;top:0;transition:background-color .2s,border .2s;z-index:1}.w-profile-dialog__account:hover:after{background-color:hsla(0,0%,100%,.08)}.w-profile-dialog__account:focus:after{background-color:hsla(0,0%,100%,.12)}.w-profile-dialog__account:active:after{background-color:hsla(0,0%,100%,.24)}.w-profile-dialog__controls{background:#f5f5f5;border-top:1px solid rgba(0,0,0,.2);display:block;padding:10px 20px}@media (min-width:321px){.w-profile-dialog__controls{align-items:center;display:flex;justify-content:space-between}}.w-profile-dialog__button{background:#f8f8f8;border:1px solid #c6c6c6;border-radius:2px;box-shadow:none;color:#666;display:block;font:13px/28px Roboto,Noto Sans,sans-serif;height:auto;margin:0;padding:0 12px;position:relative;text-align:center;text-transform:none;width:100%}@media (min-width:321px){.w-profile-dialog__button{width:auto}}.w-profile-dialog__button:not(:last-of-type){margin-bottom:8px}@media (min-width:321px){.w-profile-dialog__button:not(:last-of-type){margin:0}}.w-profile-dialog__button:focus{background:#f8f8f8;outline:none;text-decoration:none}.w-profile-dialog__button:after{bottom:0;content:"";left:0;pointer-events:none;position:absolute;right:0;top:0;transition:background-color .2s,border .2s;z-index:1}.w-profile-dialog__button:hover:after{background-color:rgba(0,0,0,.04)}.w-profile-dialog__button:focus:after{background-color:rgba(0,0,0,.08)}.w-profile-dialog__button:active:after{background-color:rgba(0,0,0,.1)}'
);
const dt = document.createDocumentFragment();
customElements.define(
  "web-profile-switcher",
  class extends se {
    static get properties() {
      return {
        expanded: {
          type: Boolean,
        },
        user: {
          type: Object,
        },
        photoPromise: {
          type: Promise,
        },
      };
    }
    constructor() {
      super(), (this.user = null);
    }
    render() {
      return z`
      <button
        class="w-profile-toggle"
        .disabled=${!this.user}
        @click="${() => (this.expanded = !this.expanded)}"
      >
        ${ct(this.photoPromise)}
      </button>
      ${this.expanded && this.user ? this.expandedTemplate : ""}
    `;
    }
    firstUpdated() {
      this.addEventListener("keyup", (e) => {
        "Escape" === e.key && this.expanded && (this.expanded = !1);
      }),
        document.addEventListener("click", (e) => {
          this.expanded && !this.contains(e.target) && (this.expanded = !1);
        });
    }
    shouldUpdate(e) {
      return (
        !e.has("user") ||
        ((this.expanded = !1),
        this.user
          ? ((this.photoPromise = new Promise((e) => {
              const t = new Image();
              (t.src = this.user.photoURL),
                (t.className = "w-profile-toggle__photo"),
                (t.onload = () => e(t)),
                (t.onerror = () => e(dt));
            })),
            !0)
          : ((this.photoPromise = null), !0))
      );
    }
    get expandedTemplate() {
      return z`
      <div class="w-profile-dialog">
        <div class="w-profile-dialog__user">
          <div class="w-profile-dialog__photo-container">
            <img
              class="w-profile-dialog__photo"
              alt=""
              src="${this.user.photoURL}"
            />
          </div>
          <div class="w-profile-dialog__details">
            <div class="w-profile-dialog__name">
              ${this.user.displayName}
            </div>
            <div class="w-profile-dialog__email">
              ${this.user.email}
            </div>
            <a
              class="w-profile-dialog__privacy"
              href="https://myaccount.google.com/privacypolicy"
              target="_blank"
            >
              Privacy
            </a>
            <a
              class="w-profile-dialog__account"
              href="https://myaccount.google.com"
              target="_blank"
            >
              Google Account
            </a>
          </div>
        </div>
        <div class="w-profile-dialog__controls">
          <button class="w-profile-dialog__button" @click="${Ve}">
            Change accounts
          </button>
          <button class="w-profile-dialog__button" @click="${De}">
            Sign out
          </button>
        </div>
      </div>
    `;
    }
  }
);
customElements.define(
  "web-profile-switcher-container",
  class extends rt {
    static get properties() {
      return {
        checkingSignedInState: {
          type: Boolean,
        },
        isSignedIn: {
          type: Boolean,
        },
        user: {
          type: Object,
        },
      };
    }
    render() {
      return this.isSignedIn
        ? z`
        <web-profile-switcher .user="${this.user}"></web-profile-switcher>
      `
        : z`
      <button
        class="w-profile-signin"
        .disabled=${this.checkingSignedInState}
        @click="${Ve}"
      >
        Sign in
      </button>
    `;
    }
    onStateChanged({ checkingSignedInState: e, isSignedIn: t, user:}) {
      (this.checkingSignedInState = e), (this.isSignedIn = t), (this.user = n);
    }
  }
);
class lt extends HTMLElement {
  constructor() {
    super(), (this.onStateChanged = this.onStateChanged.bind(this));
  }
  connectedCallback() {
    (this.hamburgerBtn = this.querySelector(".web-header__hamburger-btn")),
      this.hamburgerBtn.classList.remove("unresolved"),
      this.hamburgerBtn.addEventListener("click", Ze),
      e.subscribe(this.onStateChanged);
  }
  disconnectedCallback() {
    this.hamburgerBtn.removeEventListener("click", Ze),
      e.unsubscribe(this.onStateChanged);
  }
  onStateChanged({ isSearchExpanded: e, currentUrl: t }) {
    this.classList.toggle("web-header--has-expanded-search", e),
      (t = ((t = t.replace(/"/g, '\\"')).match(/^\/\w+\//) || [""])[0]);
    const= this.querySelector("[active]"),
      i = this.querySelector(`[href="${t}"]`);
   !== i &&
      (n && (n.removeAttribute("active"), n.removeAttribute("aria-current")),
      i &&
        (i.setAttribute("active", ""), i.setAttribute("aria-current", "page")));
  }
  manageFocus() {
    this.hamburgerBtn.focus();
  }
}
customElements.define("web-header", lt);
customElements.define(
  "web-language-select",
  class extends rt {
    static get properties() {
      return {
        current: {
          type: String,
        },
      };
    }
    onStateChanged({ currentLanguage: e }) {
      this.current = e;
    }
    onChange(e) {
      it(e.target.value);
    }
    renderOption(e) {
      let t = je.languageNames[e];
      return t
        ? ((t = t.toUpperCase()),
          this.current === e
            ? z`
          <option value="${e}" selected>
            ${t} (${e})
          </option>
        `
            : z`
          <option value="${e}">
            ${t} (${e})
          </option>
        `)
        : "";
    }
    render() {
      const e = je.supportedLanguages;
      return z`
      <div class="w-display-flex">
        <label class="w-visually-hidden" for="preferred-language">
          Choose language
        </label>
        <select id="preferred-language" @change=${this.onChange}>
          ${e.map((e) => this.renderOption(e))}
        </select>
      </div>
    `;
    }
  }
);
oe(
  'body.web-side-nav--expanded,web-side-nav{overflow:hidden}web-side-nav{position:fixed;left:0;top:0;width:100%;height:100%;pointer-events:none;z-index:300}web-side-nav.unresolved *{display:none!important}web-side-nav:before{content:"";display:block;position:absolute;left:0;top:0;width:100%;height:100%;background:rgba(0,0,0,.4);opacity:0;will-change:opacity;transition:opacity .2s cubic-bezier(.4,0,.2,1)}web-side-nav[expanded]{pointer-events:auto;visibility:visible}web-side-nav[expanded]:before{opacity:1}.web-side-nav__container{position:relative;width:90%;max-width:268px;background:#fff;height:100%;box-shadow:2px 0 12px rgba(0,0,0,.4);transform:translateX(-110%);display:flex;flex-direction:column;will-change:transform}web-side-nav[expanded] .web-side-nav__container{transform:none}web-side-nav[animatable] .web-side-nav__container,web-side-nav[expanded][animatable] .web-side-nav__container{transition:transform .2s cubic-bezier(.4,0,.2,1)}.web-side-nav__header{align-items:center;display:flex;padding:16px;border-bottom:1px solid #dadce0}.web-side-nav__logo{height:30px;width:125px}.web-side-nav__hide{height:2.75rem;margin:0 10px 0 -6px;width:2.75rem}.web-side-nav__hide:before{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;font:normal normal normal 24px/1 Material Icons;font-feature-settings:"liga";text-rendering:optimizeSpeed;text-transform:none;word-wrap:normal;content:"close"}.web-side-nav__content{flex:1;list-style:none;padding:0;margin:0;overflow-x:hidden;overflow-y:auto;-webkit-overflow-scrolling:touch}.web-side-nav__link{border-bottom:1px solid #dadce0;color:#5f6368;font-size:14px;font-weight:500;padding:16px 24px}.web-side-nav__link[active]{-webkit-box-shadow:0 -2px 0 #3740ff inset;box-shadow:inset 0 -2px 0 #3740ff}.web-side-nav__link:active,.web-side-nav__link:focus,.web-side-nav__link:hover{text-decoration:none;outline:0}.web-side-nav__link:hover{background-color:rgba(32,33,36,.04)}.web-side-nav__link:focus{background-color:rgba(32,33,36,.12)}.web-side-nav__link:active{background-color:rgba(32,33,36,.16)}.web-side-nav__link[data-active]{color:#3740ff}'
);
customElements.define(
  "web-side-nav",
  class extends LitElement {
    static get properties() {
      return {
        logo: {
          type: String,
        },
        animatable: {
          type: Boolean,
          reflect: !0,
        },
        expanded: {
          type: Boolean,
          reflect: !0,
        },
      };
    }
    constructor() {
      super(),
        (this.inert = !0),
        (this.logo = ""),
        (this.animatable = !1),
        (this.expanded_ = !1),
        (this.startX_ = 0),
        (this.currentX_ = 0),
        (this.touchingSideNav_ = !1),
        (this.prerenderedChildren_ = null),
        (this.onCloseSideNav = this.onCloseSideNav.bind(this)),
        (this.onTouchStart = this.onTouchStart.bind(this)),
        (this.onTouchMove = this.onTouchMove.bind(this)),
        (this.onTouchEnd = this.onTouchEnd.bind(this)),
        (this.onTransitionEnd = this.onTransitionEnd.bind(this)),
        (this.drag = this.drag.bind(this)),
        (this.onStateChanged = this.onStateChanged.bind(this)),
        (this.onKeyUp = this.onKeyUp.bind(this));
    }
    render() {
      if (!this.prerenderedChildren_) {
        this.prerenderedChildren_ = [];
        for (const e of this.children) this.prerenderedChildren_.push(e);
      }
      return z`
      <nav @click="${this.onBlockClicks}" class="web-side-nav__container">
        <div class="web-side-nav__header">
          <button
            @click="${this.onCloseSideNav}"
            data-icon="close"
            class="w-button--icon w-button--round web-side-nav__hide"
            aria-label="Close"
          >
            <span class="w-tooltip">Close</span>
          </button>
          ${
            this.logo &&
            z`
            <a
              href="/"
              class="gc-analytics-event"
              data-category="Site-Wide Custom Events"
              data-label="Site logo"
            >
              <img
                class="web-side-nav__logo"
                src="${this.logo}"
                alt="web.dev"
              />
            </a>
          `
          }
        </div>
        ${this.prerenderedChildren_}
      </nav>
    `;
    }
    connectedCallback() {
      super.connectedCallback(),
        (this.tabIndex = -1),
        e.subscribe(this.onStateChanged);
    }
    firstUpdated() {
      (this.sideNavContainerEl = this.querySelector(
        ".web-side-nav__container"
      )),
        this.addEventListeners(),
        this.onStateChanged(),
        this.classList.remove("unresolved");
    }
    addEventListeners() {
      this.addEventListener("click", this.onCloseSideNav),
        this.addEventListener("touchstart", this.onTouchStart, {
          passive: !0,
        }),
        this.addEventListener("touchmove", this.onTouchMove, {
          passive: !0,
        }),
        this.addEventListener("touchend", this.onTouchEnd);
    }
    onStateChanged(
      { currentUrl: t } = {
        currentUrl: null,
      }
    ) {
      const { isSideNavExpanded:n} = e.getState();
      if (n !== this.expanded && ((this.expanded = n), t)) {
        t = ((t = t.replace(/"/g, '\\"')).match(/^\/\w+\//) || [""])[0];
        const e = this.querySelector("[active]"),
         n= this.querySelector(`[href="${t}"]`);
        if (e === n) return;
        e && (e.removeAttribute("active"), e.removeAttribute("aria-current")),
         n &&
            (n.setAttribute("active", ""),
            n.setAttribute("aria-current", "page"));
      }
    }
    onTouchStart(e) {
      this.expanded &&
        ((this.startX_ = e.touches[0].pageX),
        (this.currentX_ = this.startX_),
        (this.touchingSideNav_ = !0),
        requestAnimationFrame(this.drag));
    }
    onTouchMove(e) {
      this.touchingSideNav_ && (this.currentX_ = e.touches[0].pageX);
    }
    onTouchEnd() {
      if (!this.touchingSideNav_) return;
      this.touchingSideNav_ = !1;
      const e = Math.min(0, this.currentX_ - this.startX_);
      (this.sideNavContainerEl.style.transform = ""),
        e < 0 && this.onCloseSideNav();
    }
    drag() {
      if (!this.touchingSideNav_) return;
      requestAnimationFrame(this.drag);
      const e = Math.min(0, this.currentX_ - this.startX_);
      this.sideNavContainerEl.style.transform = `translateX(${e}px)`;
    }
    onBlockClicks(e) {
      e.target.closest("a") || e.stopPropagation();
    }
    onTransitionEnd() {
      if (((this.animatable = !1), this.expanded_)) this.focus();
      else {
        document.querySelector("web-header").manageFocus();
      }
      this.inert = !this.expanded_;
    }
    onCloseSideNav() {
      Qe();
    }
    onKeyUp(e) {
      "Escape" === e.key &&
        (Qe(), document.removeEventListener("keyup", this.onKeyUp));
    }
    set expanded(e) {
      if (this.expanded_ === e) return;
      const t = this.expanded_;
      (this.expanded_ = e),
        (this.animatable = !0),
        this.expanded_ && document.addEventListener("keyup", this.onKeyUp),
        this.addEventListener("transitionend", this.onTransitionEnd, {
          once: !0,
        }),
        this.requestUpdate("expanded", t);
    }
    get expanded() {
      return this.expanded_;
    }
    disconnectedCallback() {
      super.disconnectedCallback(), e.unsubscribe(this.onStateChanged);
    }
  }
);
oe(
  "web-snackbar{align-items:center;display:flex;visibility:hidden}web-snackbar .web-snackbar__surface{align-items:center;background-color:#202124;display:flex;justify-content:flex-start;opacity:0;transform:scale(.8);width:100vw}@media (min-width:481px){web-snackbar .web-snackbar__surface{border-radius:3px;box-shadow:0 3px 5px -1px rgba(0,0,0,.2),0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12);min-width:344px}}@media (min-width:865px){web-snackbar .web-snackbar__surface{max-width:400px}}web-snackbar .web-snackbar__label{color:hsla(0,0%,100%,.87);font-size:.875rem;padding:14px 16px}web-snackbar .web-snackbar__actions{margin-left:0;margin-right:8px;display:flex;align-items:center}web-snackbar .web-snackbar__action{font-size:.875rem;color:#3fc4ff;height:auto}web-snackbar .web-snackbar__action:active,web-snackbar .web-snackbar__action:focus,web-snackbar .web-snackbar__action:hover{box-shadow:none}web-snackbar .web-snackbar__action:hover{background:rgba(63,196,255,.08)}web-snackbar .web-snackbar__action:focus{background:rgba(63,196,255,.12)}web-snackbar .web-snackbar__action:active{background:rgba(63,196,255,.16)}web-snackbar .web-snackbar__action+.web-snackbar__action{margin-left:8px}web-snackbar[open]{visibility:visible}web-snackbar[open] .web-snackbar__surface{transform:scale(1);opacity:1;pointer-events:auto}web-snackbar[open][animatable] .web-snackbar__surface{transition:opacity .15s cubic-bezier(0,0,.2,1),transform .15s cubic-bezier(0,0,.2,1)}web-snackbar[animatable]{visibility:visible}web-snackbar[animatable] .web-snackbar__surface{transition:opacity 75ms cubic-bezier(.4,0,1,1),transform 75ms cubic-bezier(0,0,.2,1)}web-snackbar[stacked] .web-snackbar__surface{flex-direction:column;align-items:flex-start}web-snackbar[stacked] .web-snackbar__actions{align-self:flex-end;margin-bottom:8px}"
);
customElements.define(
  "web-snackbar",
  class extends se {
    static get properties() {
      return {
        animatable: {
          type: Boolean,
          reflect: !0,
        },
        stacked: {
          type: Boolean,
          reflect: !0,
        },
        type: {
          type: String,
        },
        action: {
          type: Object,
        },
      };
    }
    constructor() {
      super(), (this.action = null), (this.type = null);
    }
    get open() {
      return this.hasAttribute("open");
    }
    set open(e) {
      let t;
      e
        ? (this.setAttribute("open", ""), (t = 150))
        : (this.removeAttribute("open"), (t = 75)),
        (this.animatable = !0),
        setTimeout(() => (this.animatable = !1), t);
    }
    get cookiesTemplate() {
      return z`
      <div class="web-snackbar__label" role="status">
        We serve cookies on this site to analyze traffic, remember your
        preferences, and optimize your experience.
      </div>
      <div class="web-snackbar__actions">
        <a
          href="https://policies.google.com/technologies/cookies"
          class="w-button web-snackbar__action"
          >More details</a
        >
        <button @click=${this.action} class="w-button web-snackbar__action">
          OK
        </button>
      </div>
    `;
    }
    render() {
      let e;
      switch (this.type) {
        case "cookies":
          e = this.cookiesTemplate;
      }
      return z`
      <div class="web-snackbar__surface">
        ${e}
      </div>
    `;
    }
  }
);
oe(
  "web-snackbar-container{bottom:0;display:block;left:0;margin:0;pointer-events:none;position:fixed;right:0;z-index:300}@media (min-width:481px){web-snackbar-container{margin:8px}}"
);
customElements.define(
  "web-snackbar-container",
  class extends se {
    static get properties() {
      return {
        open: {
          type: Boolean,
        },
        type: {
          type: String,
        },
      };
    }
    constructor() {
      super(),
        (this.onBeforeInstallPrompt = this.onBeforeInstallPrompt.bind(this)),
        (this.onStateChanged = this.onStateChanged.bind(this));
    }
    connectedCallback() {
      super.connectedCallback(),
        tt(),
        e.subscribe(this.onStateChanged),
        this.onStateChanged(),
        window.addEventListener(
          "beforeinstallprompt",
          this.onBeforeInstallPrompt
        );
    }
    disconnectedCallback() {
      super.disconnectedCallback(),
        e.unsubscribe(this.onStateChanged),
        window.removeEventListener(
          "beforeinstallprompt",
          this.onBeforeInstallPrompt
        );
    }
    onBeforeInstallPrompt(e) {
      this.acceptedCookies || e.preventDefault();
    }
    onStateChanged() {
      const t = e.getState();
      (this.open = t.showingSnackbar),
        (this.type = t.snackbarType),
        (this.acceptedCookies = t.userAcceptsCookies);
    }
    render() {
      let e, t;
      switch (this.type) {
        case "cookies":
          (e = nt), (t = !0);
      }
      return z`
      <web-snackbar
        .type=${this.type}
        .open=${this.open}
        .stacked=${t}
        .action="${e}"
      ></web-snackbar>
    `;
    }
  }
);
const ht = new WeakMap(),
  ut = s((e) => (t) => {
    if (!(t instanceof C))
      throw new Error("unsafeHTML can only be used in text bindings");
    const= ht.get(t);
    if (void 0 !==&& x(e) && e === n.value && t.value === n.fragment) return;
    const i = document.createElement("template");
    i.innerHTML = e;
    const s = document.importNode(i.content, !0);
    t.setValue(s),
      ht.set(t, {
        value: e,
        fragment: s,
      });
  }),
  pt = (e, t) => {
    if (!e) throw new TypeError("func is a required argument.");
    if (!t) throw new TypeError("wait is a required argument.");
    let n;
    return function (...i) {
     && clearTimeout(n),
        (n = setTimeout(() => {
          e(...i);
        }, t));
    };
  };
let bt;
function ft() {
  return (
    (bt =
      bt ||
      (async function () {
        const { default: e } = await import(
            "./algoliasearch-lite.esm.browser-25e885c6.js"
          ),
          t = "webdev",
         = e("2JPAZHQ6K7", "01ca870a3f1cad9984ed72419a12577c");
        return n.initIndex(t);
      })()),
    bt
  );
}
oe(
  "web-search{--web-search-animation-time:0;align-items:center;display:flex;height:100%;justify-content:flex-end;min-width:50%}@media (min-width:865px){web-search{--web-search-animation-time:200ms;justify-content:flex-start}}web-search .web-search__close-btn{display:none;margin-left:8px;text-overflow:clip}web-search .web-search__close-btn,web-search .web-search__open-btn{border-radius:0;border:none;box-shadow:none;color:#5f6368;cursor:pointer;padding:0 8px;transition:none;background:transparent}@media (min-width:865px){web-search .web-search__close-btn,web-search .web-search__open-btn{display:none}}web-search .web-search__close-btn:focus,web-search .web-search__close-btn:hover,web-search .web-search__open-btn:focus,web-search .web-search__open-btn:hover{background:transparent}web-search .web-search__close-btn.focus-visible,web-search .web-search__open-btn.focus-visible{box-shadow:inset 0 0 0 1px #3fc4ff;outline:none}web-search .web-search__input-wrapper{align-items:center;background:#fff;color:#5f6368;display:none;height:100%;width:100%}@media (min-width:865px){web-search .web-search__input-wrapper{display:flex;max-width:calc(200% - 32px);min-width:calc(200% - 32px);transform:translateX(calc(50% - 184px));transition:var(--web-search-animation-time) transform;width:calc(200% - 32px)}}web-search .web-search__input-wrapper .web-search__search-icon{left:8px;position:absolute}web-search .web-search__close-icon,web-search .web-search__search-icon{fill:#80868b}web-search .web-search__input{background:#f1f3f4;border:none;padding:8px 8px 8px 40px;width:100%;font:inherit;font-size:16px;line-height:20px;border-top-left-radius:2px;border-top-right-radius:2px}web-search .web-search__input:focus{outline:none;box-shadow:0 2px 0 0 #3fc4ff}web-search .web-search-popout{background:#fff;border-top:1px solid #ddd;box-shadow:0 1px 2px 0 rgba(60,64,67,.3),0 2px 6px 2px rgba(60,64,67,.15);left:0;padding:16px 0;position:absolute;top:55px;width:calc(100% - 45px)}@media (min-width:865px){web-search .web-search-popout{left:32px;width:calc(100% - 32px)}}web-search .web-search-popout__heading{color:#5f6368;font-size:12px;padding:0 24px}web-search .web-search-popout__list{list-style:none;max-height:50vh;overflow:scroll}web-search .web-search-popout__link{color:#202124;display:block;padding:8px 24px}web-search .web-search-popout__link--active,web-search .web-search-popout__link:hover{background:#e8eaed}web-search[expanded] .web-search__open-btn{display:none}web-search[expanded] .web-search__input-wrapper{display:flex}@media (min-width:865px){web-search[expanded] .web-search__input-wrapper{transform:translate(calc(-50% + 16px))}}web-search[expanded] .web-search__close-btn{display:inline-flex;align-items:center}@media (min-width:865px){web-search[expanded] .web-search__close-btn{display:none}}"
);
customElements.define(
  "web-search",
  class extends se {
    static get properties() {
      return {
        expanded: {
          type: Boolean,
          reflect: !0,
        },
        hits: {
          type: Object,
        },
        showHits: {
          type: Boolean,
        },
        cursor: {
          type: Number,
        },
      };
    }
    constructor() {
      super(),
        (this.hits = []),
        (this.showHits = !1),
        (this.cursor = -1),
        (this.query = ""),
        this.timeout,
        (this.expanded = !1),
        (this.onResize = pt(this.onResize.bind(this), 200)),
        (this.search = pt(this.search.bind(this), 200));
    }
    connectedCallback() {
      super.connectedCallback(),
        window.addEventListener("resize", this.onResize),
        this.onResize();
    }
    disconnectedCallback() {
      super.disconnectedCallback(),
        window.removeEventListener("resize", this.onResize);
    }
    render() {
      return z`
      <button
        class="web-search__open-btn"
        @click="${this.onOpenSearch}"
        aria-label="Open search"
      >
        <svg
          class="web-search__search-icon"
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          width="24"
          aria-hidden="true"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path
            d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
          />
        </svg>
      </button>
      <div
        class="web-search__input-wrapper"
        role="combobox"
        aria-expanded="${this.expanded}"
        aria-controls="web-search__input"
        aria-owns="web-search-popout__list"
        aria-haspopup="listbox"
      >
        <svg
          class="web-search__search-icon"
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          width="24"
          aria-hidden="true"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path
            d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
          />
        </svg>
        <input
          id="web-search__input"
          class="web-search__input"
          type="text"
          role="searchbox"
          autocomplete="off"
          aria-autocomplete="list"
          aria-controls="web-search-popout__list"
          aria-label="All articles"
          placeholder="Search"
          @keydown="${this.onKeyDown}"
          @input="${this.onInput}"
          @focusin="${this.onFocusIn}"
          @focusout="${this.onFocusOut}"
        />
      </div>
      <button
        @click="${this.onCloseSearch}"
        class="web-search__close-btn"
        aria-label="Close search"
      >
        <svg
          class="web-search__close-icon"
          xmlns="http://www.w3.org/2000/svg"
          height="24"
          width="24"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path
            d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"
          />
        </svg>
      </button>
      ${this.hitsTemplate}
    `;
    }
    get hitsTemplate() {
      if (!this.showHits)
        return z`
        <div
          id="web-search-popout__list"
          role="listbox"
          aria-hidden="true"
        ></div>
      `;
      if (!this.hits.length) {
        if (!this.query) return "";
        const e = "web.dev " + this.query.trim(),
          t = "https://google.com/search?q=" + window.encodeURIComponent(e);
        return z`
        <div class="web-search-popout">
          <div class="web-search-popout__heading">
            There are no suggestions for your query&mdash;try
            <a
              data-category="web.dev"
              data-label="search, open Google"
              data-action="click"
              target="_blank"
              tabindex="-1"
              href=${t}
            >
              Google search
            </a>
          </div>
        </div>
      `;
      }
      return z`
      <div class="web-search-popout">
        <div class="web-search-popout__heading">Pages</div>
        <ul
          id="web-search-popout__list"
          class="web-search-popout__list"
          role="listbox"
        >
          ${this.itemsTemplate}
        </ul>
      </div>
    `;
    }
    get itemsTemplate() {
      return this.hits.map((e, t) => {
        if (!e._highlightResult.title || !e._highlightResult.title.value)
          return z``;
        let= e._highlightResult.title.value;
        return (
          (n = ((e, t) => {
            const= new RegExp(`&lt;${t}&gt;`, "g"),
              i = new RegExp(`&lt;/${t}&gt;`, "g");
            return e.replace(n, `<${t}>`).replace(i, `</${t}>`);
          })(n.replace(/</g, "&lt;").replace(/>/g, "&gt;"), "strong")),
          (n = n.replace(/`/g, "")),
          z`
        <li class="web-search-popout__item">
          <a
            id="web-search-popout__link--${t}"
            class="web-search-popout__link ${
              t === this.cursor ? "web-search-popout__link--active" : ""
            }"
            aria-selected="${t === this.cursor}"
            tabindex="-1"
            href="${e.url}"
            >${ut(n)}</a
          >
        </li>
      `
        );
      });
    }
    firstUpdated() {
      this.inputEl = this.renderRoot.querySelector(".web-search__input");
    }
    updated(e) {
      e.has("cursor") &&
        (-1 !== this.cursor
          ? this.inputEl.setAttribute(
              "aria-activedescendant",
              `web-search-popout__link--${this.cursor}`
            )
          : this.inputEl.removeAttribute("aria-activedescendant"));
    }
    onResize() {
      const e = getComputedStyle(this).getPropertyValue(
        "--web-search-animation-time"
      );
      this.animationTime = parseInt(e, 10);
    }
    onKeyDown(e) {
      switch (e.key) {
        case "Home":
          return e.preventDefault(), void this.firstHit();
        case "End":
          return e.preventDefault(), void this.lastHit();
        case "Up":
        case "ArrowUp":
          return e.preventDefault(), void this.prevHit();
        case "Down":
        case "ArrowDown":
          return e.preventDefault(), void this.nextHit();
        case "Enter":
          const t = this.hits[this.cursor];
          return void (t && this.navigateToHit(t));
        case "Esc":
        case "Escape":
          return void document.activeElement.blur();
      }
    }
    onInput(e) {
      this.search(e.target.value);
    }
    async search(e) {
      if (((this.query = e), "" !== e))
        try {
          const t = await ft(),
            { hits:} = await t.search(e, {
              hitsPerPage: 10,
              attributesToHighlight: ["title"],
              attributesToRetrieve: ["url"],
              highlightPreTag: "<strong>",
              highlightPostTag: "</strong>",
            });
          this.query === e && (this.hits = n);
        } catch (e) {
          console.error(e), console.error(e.debugData), Ie(e, "search");
        }
      else this.hits = [];
    }
    firstHit() {
      (this.cursor = 0), this.scrollHitIntoView();
    }
    lastHit() {
      (this.cursor = this.hits.length - 1), this.scrollHitIntoView();
    }
    nextHit() {
      (this.cursor = (this.cursor + 1) % this.hits.length),
        this.scrollHitIntoView();
    }
    prevHit() {
      -1 === this.cursor
        ? (this.cursor = this.hits.length - 1)
        : (this.cursor =
            (this.cursor - 1 + this.hits.length) % this.hits.length),
        this.scrollHitIntoView();
    }
    scrollHitIntoView() {
      this.requestUpdate().then(() => {
        this.renderRoot
          .querySelector(".web-search-popout__link--active")
          .scrollIntoView();
      });
    }
    navigateToHit({ url: e }) {
      window.location.href = e;
    }
    clear() {
      (this.inputEl.value = ""), (this.query = "");
    }
    onOpenSearch() {
      (this.expanded = !0),
        e.setState({
          isSearchExpanded: !0,
        }),
        this.requestUpdate().then(() => {
          this.inputEl.focus();
        });
    }
    onCloseSearch() {
      this.expanded = !1;
    }
    onFocusIn() {
      ft().catch((e) => {
        console.error("failed to load Algolia", e), Ie(e, "algolia load");
      }),
        (this.expanded = !0),
        window.addEventListener(
          "scroll",
          () => {
            document.activeElement.blur();
          },
          {
            passive: !0,
            once: !0,
          }
        ),
        (this.timeout = setTimeout(() => {
          e.setState({
            isSearchExpanded: !0,
          }),
            (this.showHits = !0);
        }, this.animationTime));
    }
    onFocusOut(t) {
      const j= t.relatedTarget;
    j && this.contains(n) && n.click(),
        clearTimeout(this.timeout),
        e.setState({
          isSearchExpanded: !1,
        }),
        (this.expanded = !1),
        (this.showHits = !1),
        (this.hits = []),
        (this.cursor = -1),
        this.clear();
    }
  }
);
export {
  se as B,
  He as L,
  rt as a,
  Ye as b,
  st as c,
  et as d,
  Ie as e,
  V as f,
  Ge as g,
  z as h,
  Ke as i,
  Ve as j,
  pt as k,
  ot as o,
  O as r,
  oe as s,
  Pe as t,
};
