import { LitElement, html, css } from "lit";
import {
  customElement,
  property,
  queryAssignedNodes,
  state,
} from "lit/decorators.js";
import { IconController } from "./icons/icon.controller";
import { isFilledArray } from "./util/func";
import { styleMap } from "lit/directives/style-map.js";

@customElement("hicks-nav")
export class NavComponent extends LitElement {
  @queryAssignedNodes("", true, "hicks-nav-item")
  navItems: NodeListOf<NavItemComponent>;
  @property({ type: String, reflect: true })
  primary = "--blue4";
  @property()
  secondary = "--blue8";

  constructor() {
    super();
  }
  handleSlotChange(e) {
    if (isFilledArray(this.navItems)) {
      this.navItems.forEach((item: NavItemComponent) => {
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
    (e.target as NavItemComponent).selected = true;
  }
  render() {
    return html` <ul
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
}

@customElement("hicks-nav-item")
export class NavItemComponent extends LitElement {
  @queryAssignedNodes("", true)
  slot;
  private iconControl = new IconController(this, "blue");
  @state()
  slotValue: string = "";

  @state()
  linkName: string = "";
  @state()
  iconName: string = "";
  @property({ reflect: true })
  link = "";
  @property({ reflect: true })
  icon = "";
  @property({ reflect: true })
  primary = "";
  @property({ reflect: true })
  secondary = "";
  @property({ type: Boolean, reflect: true })
  selected = false;

  constructor() {
    super();
  }
  slotChangedCallback(e) {
    this.slotValue = isFilledArray(this.slot) ? this.slot[0].wholeText : "";
    this.requestUpdate();
  }

  updated(changedProperties) {
    if (
      changedProperties.has("link") ||
      changedProperties.has("icon") ||
      changedProperties.has("slotValue")
    ) {
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

    return html`<li class="navigation__item">
      <a
        @click="${this.emitNavigation}"
        class="navigation__item__link"
        style="${styleMap(styles)}"
        href="#${this.linkName}"
        >
        <span class="item__link__layer">${this.iconControl.icon(
          this.primary,
          this.secondary
        )}<slot
          @slotchange="${this.slotChangedCallback}"
        ></span>
   
        </slot>
      </a>
    </li> `;
  }
  static get styles() {
    return css`
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
}
