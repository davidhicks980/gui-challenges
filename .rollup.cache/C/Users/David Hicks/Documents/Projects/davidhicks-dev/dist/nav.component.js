import { __decorate, __metadata } from "tslib";
import { LitElement, html, css } from "lit";
import { customElement, property, queryAssignedNodes, state, } from "lit/decorators.js";
import { IconController } from "./icons/icon.controller";
import { isFilledArray } from "./util/func";
import { styleMap } from "lit/directives/style-map.js";
let NavComponent = class NavComponent extends LitElement {
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
        return html ` <ul
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
    queryAssignedNodes("", true, "hicks-nav-item"),
    __metadata("design:type", Object)
], NavComponent.prototype, "navItems", void 0);
__decorate([
    property({ type: String, reflect: true }),
    __metadata("design:type", Object)
], NavComponent.prototype, "primary", void 0);
__decorate([
    property(),
    __metadata("design:type", Object)
], NavComponent.prototype, "secondary", void 0);
NavComponent = __decorate([
    customElement("hicks-nav"),
    __metadata("design:paramtypes", [])
], NavComponent);
export { NavComponent };
let NavItemComponent = class NavItemComponent extends LitElement {
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
        return html `<li class="navigation__item">
      <a
        @click="${this.emitNavigation}"
        class="navigation__item__link"
        style="${styleMap(styles)}"
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
        return css `
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
    queryAssignedNodes("", true),
    __metadata("design:type", Object)
], NavItemComponent.prototype, "slot", void 0);
__decorate([
    state(),
    __metadata("design:type", String)
], NavItemComponent.prototype, "slotValue", void 0);
__decorate([
    state(),
    __metadata("design:type", String)
], NavItemComponent.prototype, "linkName", void 0);
__decorate([
    state(),
    __metadata("design:type", String)
], NavItemComponent.prototype, "iconName", void 0);
__decorate([
    property({ reflect: true }),
    __metadata("design:type", Object)
], NavItemComponent.prototype, "link", void 0);
__decorate([
    property({ reflect: true }),
    __metadata("design:type", Object)
], NavItemComponent.prototype, "icon", void 0);
__decorate([
    property({ reflect: true }),
    __metadata("design:type", Object)
], NavItemComponent.prototype, "primary", void 0);
__decorate([
    property({ reflect: true }),
    __metadata("design:type", Object)
], NavItemComponent.prototype, "secondary", void 0);
__decorate([
    property({ type: Boolean, reflect: true }),
    __metadata("design:type", Object)
], NavItemComponent.prototype, "selected", void 0);
NavItemComponent = __decorate([
    customElement("hicks-nav-item"),
    __metadata("design:paramtypes", [])
], NavItemComponent);
export { NavItemComponent };
//# sourceMappingURL=nav.component.js.map