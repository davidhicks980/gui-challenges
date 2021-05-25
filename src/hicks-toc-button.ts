import { html } from "lit";
import { property } from "lit/decorators.js";
import { BaseStateElement } from "./state";

/**
 * Element that renders table of contents open button.
 * @extends {BaseStateElement}
 * @final
 */
class TableOfContentsButton extends BaseStateElement {
  @property({ type: Boolean, reflect: true }) opened: boolean = true;
  static get properties() {
    return {
      opened: { type: Boolean, reflect: true },
    };
  }

  constructor() {
    super();
  }

  openTOC() {
    this.dispatchEvent(new Event("click"));
  }
  render() {
    return html`
      <button
        class="w-toc__button--open w-button w-button--secondary w-button--icon"
        data-icon="list_alt"
        aria-label="Open Table of Contents"
        @click="${this.openTOC}"
      ></button>
    `;
  }
}

customElements.define("hicks-toc-button", TableOfContentsButton);
