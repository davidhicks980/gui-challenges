import { __decorate } from "tslib";
import { css, customElement, LitElement } from "lit-element";
import { html } from "lit-html";
let HicksMenuItem = class HicksMenuItem extends LitElement {
    constructor() {
        super();
        this.name = "";
        this.index = 0;
        this.lineHeight = "150px";
    }
    render() {
        return html `<li class="menu-item">
      <a class="menu-item__link" href="#${this.name}">${this.name}</a>
    </li>`;
    }
    static get styles() {
        return css `
      :root {
        --menu-line-height: 150px;
      }
      @keyframes SlideInFromLeft {
        0% {
          transform: translateX(-200px);
        }
        100% {
          transform: translateX(0px);
        }
      }
      li.menu-item {
        list-style: none;
        width: 100%;
        line-height: 100px;
      }

      a.menu-item__link {
        border-bottom: 1px solid #dadce0;
        color: #5f6368;
        font-size: 14px;
        font-weight: 500;
        vertical-align: middle;
        line-height: inherit;
      }
      a:hover {
      }
      .menu-item {
        text-transform: capitalize;
        height: 100%;
        width: 100%;
        display: list-item;
      }
      .menu-item:hover {
      }
    `;
    }
};
HicksMenuItem = __decorate([
    customElement("hicks-menu-item")
], HicksMenuItem);
export { HicksMenuItem };
//# sourceMappingURL=menu-item.component.js.map