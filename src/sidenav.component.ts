import { css, customElement, LitElement, property, query } from "lit-element";
import { html, nothing, TemplateResult } from "lit-html";
import "./menu-item.component";
@customElement("hicks-sidenav")
export class HicksSidenav extends LitElement {
  @query(".sidenav-navigation__container")
  sidenav!: HTMLElement;

  private _open = true;
  private _opening: boolean = false;

  @property({ type: Boolean })
  get opened() {
    return this._open;
  }
  constructor() {
    super();
  }
  firstUpdated() {
    const clickHandler = this.createHandler().click;
    const hashHandler = this.createHandler().hash;
    document.addEventListener("click", clickHandler);
    document.addEventListener("hashchange", hashHandler);
  }
  close(setHash = true) {
    this._open = false;
    document.location.hash = "";
    this.requestUpdate("opened");
    this.dispatchEvent(new CustomEvent("toggled", { detail: false }));
  }
  open(setHash = true) {
    if (!this.opened) {
      this._opening = true;
      setTimeout(() => {
        this.sidenav.focus();
        this._open = true;
        this._opening = false;
        document.location.hash = "sidenav-navigation__container";
        this.requestUpdate("opened");
        this.dispatchEvent(new CustomEvent("toggled", { detail: true }));
      });
    }
  }
  createHandler() {
    return {
      hash: (e: Event) => {
        document.location.hash.includes("sidenav-navigation__container")
          ? this.open(false)
          : this.close(false);
      },
      click: (e: Event) => {
        if (this.sidenav) {
          const targetedElement = e.composedPath()[0] as Node;
          if (!this.sidenav.contains(targetedElement)) {
            this.close();
            console.log(
              this.sidenav.contains(targetedElement),
              targetedElement
            );
          }
        }
      },
    };
  }

  render() {
    return html`
      <div class="sidenav__container">
        <aside
          @keyup="${(e: any) => {
            if (e.code === "Escape") this.close(true);
          }}"
          tabindex="0"
          class="sidenav-navigation__container"
          data-open=${this.opened}
        >
          <nav aria-labelledby="subnavigation">
            <slot
              id="subnavigation"
              name="subnavigation"
              class="sidenav-navigation__content"
            >
            </slot>
          </nav>
        </aside>

        <span class="sidenav-close__link-container">
          ${this.opened
            ? html`<a
                tabindex="0"
                class="sidenav-close__link"
                href="#"
                aria-label="Close side navigation"
                @click=${() => this.close()}
              >
              </a>`
            : nothing}</span
        >
      </div>
    `;
  }
  static get styles() {
    return css`
      ///////////////////
      @keyframes SlideInFromLeft {
        0% {
          transform: translateX(-200px);
        }
        100% {
          transform: translateX(0px);
        }
      }
      menu-item {
        list-style: none;
      }

      .sidenav-navigation__container {
        --easeOutExpo: cubic-bezier(0.16, 1, 0.3, 1);
        --duration: 0.6s;
        height: 100%;
        width: 100%;
        transform: translateX(-0px);
        display: block;
        animation: var(--duration) var(--easeOutExpo) SlideInFromLeft;

        animation-iteration-count: 1;
      }
      @media (prefers-reduced-motion: reduce) {
        :root {
          --duration: 1ms;
        }
      }
      @media (max-width: 540px) {
        .sidenav-navigation__container {
          position: absolute;
          top: 0;

          width: 70vw;
          overflow: hidden auto;
          overscroll-behavior: contain;

          visibility: hidden; /* not keyboard accessible when closed */
          transform: translateX(-110vw);
          will-change: transform;
          transition: transform var(--duration) var(--easeOutExpo),
            visibility 0s linear var(--duration);
          //prettier-ignore
        }
        .sidenav-navigation__container[data-open="true"] {
          visibility: visible;
          transform: translateX(0);
          transition: transform var(--duration) var(--easeOutExpo);
          background: white;
        }
        .sidenav-close__link-container {
          display: inline-block;
          width: 100%;
          height: 100%;
          grid-column: 2;
        }
        .sidenav-close__link {
          display: block;
          height: 100%;
        }
        .sidenav__container {
          grid-template-columns: 70vw 30vw;
          grid-template-rows: 100vh;

          display: grid;
          position: fixed;
        }
      }
    `;
  }
}
