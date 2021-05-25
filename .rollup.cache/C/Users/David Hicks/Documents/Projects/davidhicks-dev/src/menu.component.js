import { __decorate } from "tslib";
import { css, customElement, LitElement, property } from "lit-element";
import { html } from "lit-html";
import "./menu-item.component";
let HicksNavMenu = class HicksNavMenu extends LitElement {
    constructor() {
        super();
        this._items = ["howdy"];
    }
    set items(navigation) {
        this._items = navigation;
    }
    get navigationItems() {
        return this._items.map((item, index) => html `<hicks-menu-item
          .name="${item}"
          .index="${index}"
        ></hicks-menu-item>`);
    }
    render() {
        return html `<ul class="menu-items">
      ${this.navigationItems}
    </ul>`;
    }
    static get styles() {
        return css `
      @keyframes SlideInFromLeft {
        0% {
          transform: translateX(-200px);
        }
        100% {
          transform: translateX(0px);
        }
      }

      ul.menu-items {
        width: 100%;
        background: none;
        text-transform: capitalize;
        padding-inline-start: 0px;
        grid-auto-rows: 50px;
        display: grid;
      }
    `;
    }
};
__decorate([
    property({
        type: Array,
        attribute: true,
    })
], HicksNavMenu.prototype, "items", null);
HicksNavMenu = __decorate([
    customElement("hicks-nav-menu")
], HicksNavMenu);
export { HicksNavMenu };
//# sourceMappingURL=menu.component.js.map