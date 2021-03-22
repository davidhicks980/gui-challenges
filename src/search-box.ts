import { css, html, LitElement } from "lit-element";

customElements.define(
  "web-side-nav",
  class extends LitElement {
    inert: boolean;
    logo: string;
    animatable: boolean;
    expanded_: boolean;
    startX_: number;
    currentX_: number;
    touchingSideNav_: boolean;
    tabIndex: number = 1;
    sideNavContainerEl: any;
    classList: any;

    static get properties() {
      return {
        logo: {
          type: String,
        },
        animatable: {
          type: Boolean,
          reflect: true,
        },
        expanded: {
          type: Boolean,
          reflect: true,
        },
      };
    }
    static get styles() {
      return css`
        body.web-side-nav--expanded,
        web-side-nav {
          overflow: hidden;
        }
        web-side-nav {
          position: fixed;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 300;
        }
        web-side-nav.unresolved * {
          display: none !important;
        }
        web-side-nav:before {
          content: "";
          display: block;
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.4);
          opacity: 0;
          will-change: opacity;
          transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        web-side-nav[expanded] {
          pointer-events: auto;
          visibility: visible;
        }
        web-side-nav[expanded]:before {
          opacity: 1;
        }
        .web-side-nav__container {
          position: relative;
          width: 90%;
          max-width: 268px;
          background: #fff;
          height: 100%;
          box-shadow: 2px 0 12px rgba(0, 0, 0, 0.4);
          transform: translateX(-110%);
          display: flex;
          flex-direction: column;
          will-change: transform;
        }
        web-side-nav[expanded] .web-side-nav__container {
          transform: none;
        }
        web-side-nav[animatable] .web-side-nav__container,
        web-side-nav[expanded][animatable] .web-side-nav__container {
          transition: ;
        }
        .web-side-nav__header {
          align-items: center;
          display: flex;
          padding: 16px;
          border-bottom: 1px solid #dadce0;
        }
        .web-side-nav__logo {
          height: 30px;
          width: 125px;
        }
        .web-side-nav__hide {
          height: 2.75rem;
          margin: 0 10px 0 -6px;
          width: 2.75rem;
        }
        .web-side-nav__hide:before {
          -moz-osx-font-smoothing: grayscale;
          -webkit-font-smoothing: antialiased;
          font: normal normal normal 24px/1 Material Icons;
          font-feature-settings: "liga";
          text-rendering: optimizeSpeed;
          text-transform: none;
          word-wrap: normal;
          content: "close";
        }
        .web-side-nav__content {
          flex: 1;
          list-style: none;
          padding: 0;
          margin: 0;
          overflow-x: hidden;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }
        .web-side-nav__link {
          border-bottom: 1px solid #dadce0;
          color: #5f6368;
          font-size: 14px;
          font-weight: 500;
          padding: 16px 24px;
        }
        .web-side-nav__link[active] {
          -webkit-box-shadow: 0 -2px 0 #3740ff inset;
          box-shadow: inset 0 -2px 0 #3740ff;
        }
        .web-side-nav__link:active,
        .web-side-nav__link:focus,
        .web-side-nav__link:hover {
          text-decoration: none;
          outline: 0;
        }
        .web-side-nav__link:hover {
          background-color: rgba(32, 33, 36, 0.04);
        }
        .web-side-nav__link:focus {
          background-color: rgba(32, 33, 36, 0.12);
        }
        .web-side-nav__link:active {
          background-color: rgba(32, 33, 36, 0.16);
        }
        .web-side-nav__link[data-active] {
          color: #3740ff;
        }
      `;
    }

    constructor() {
      super();
      this.inert = true;
      this.logo = "";
      this.animatable = false;
      this.expanded_ = false;
      this.startX_ = 0;
      this.currentX_ = 0;
      this.touchingSideNav_ = false;
      this.onCloseSideNav = this.onCloseSideNav.bind(this);
      this.onTouchStart = this.onTouchStart.bind(this);
      this.onTouchMove = this.onTouchMove.bind(this);
      this.onTouchEnd = this.onTouchEnd.bind(this);
      this.onTransitionEnd = this.onTransitionEnd.bind(this);
      this.drag = this.drag.bind(this);
      this.onStateChanged = this.onStateChanged.bind(this);
      this.onKeyUp = this.onKeyUp.bind(this);
    }
    render() {
      return html`
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
            ${this.logo &&
            html`
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
            `}
          </div>
          <slot name="content"></slot>
        </nav>
      `;
    }
    connectedCallback() {
      super.connectedCallback();
      this.tabIndex = -1;
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
          passive: true,
        }),
        this.addEventListener("touchmove", this.onTouchMove, {
          passive: true,
        }),
        this.addEventListener("touchend", this.onTouchEnd);
    }

    onStateChanged(
      { currentUrl: currentUrl } = {
        currentUrl: null,
      }
    ) {
      const { isSideNavExpanded } = this.getState();
      if (
        isSideNavExpanded !== this.expanded &&
        ((this.expanded = isSideNavExpanded), currentUrl)
      ) {
        currentUrl = ((currentUrl = currentUrl.replace(/"/g, '\\"')).match(
          /^\/\w+\//
        ) || [""])[0];
        const e = this.querySelector("[active]"),
          n = this.querySelector(`[href="${currentUrl}"]`);
        if (e === n) return;
        e && (e.removeAttribute("active"), e.removeAttribute("aria-current")),
          n &&
            (n.setAttribute("active", ""),
            n.setAttribute("aria-current", "page"));
      }
    }
    getState(): { isSideNavExpanded: any } {
      return {
        isSideNavExpanded: true,
      };
    }
    onTouchStart(e) {
      this.expanded &&
        ((this.startX_ = e.touches[0].pageX),
        (this.currentX_ = this.startX_),
        (this.touchingSideNav_ = true),
        requestAnimationFrame(this.drag));
    }
    onTouchMove(e) {
      this.touchingSideNav_ && (this.currentX_ = e.touches[0].pageX);
    }
    onTouchEnd() {
      if (!this.touchingSideNav_) return;
      this.touchingSideNav_ = false;
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
      if (((this.animatable = false), this.expanded_)) this.focus();

      this.inert = !this.expanded_;
    }
    onCloseSideNav() {
      return null;
    }
    onKeyUp(e: Event) {
      "Escape" === e.key && document.removeEventListener("keyup", this.onKeyUp);
    }
    set expanded(e) {
      if (this.expanded_ === e) return;
      const t = this.expanded_;
      (this.expanded_ = e),
        (this.animatable = true),
        this.expanded_ && document.addEventListener("keyup", this.onKeyUp),
        this.addEventListener("transitionend", this.onTransitionEnd, {
          once: true,
        }),
        this.requestUpdate("expanded", t);
    }
    get expanded() {
      return this.expanded_;
    }
    disconnectedCallback() {
      super.disconnectedCallback();
    }
  }
);
