import { css, customElement, LitElement, property } from "lit-element";
import { html, TemplateResult } from "lit-html";
import "./menu-item.component";
@customElement("hicks-nav-menu")
export class HicksNavMenu extends LitElement {
  private _items = ["howdy"];

  @property({
    type: Array,

    attribute: true,
  })
  set items(navigation: []) {
    this._items = navigation;
  }
  get navigationItems(): TemplateResult[] {
    return this._items.map(
      (item: string, index: number) =>
        html`<hicks-menu-item
          .name="${item}"
          .index="${index}"
        ></hicks-menu-item>`
    );
  }
  constructor() {
    super();
  }

  render() {
    return html`<ul class="menu-items">
      ${this.navigationItems}
    </ul>`;
  }
  static get styles() {
    return css`
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
}
