import { __decorate, __metadata } from "tslib";
import { html } from "lit";
import { property } from "lit/decorators.js";
import { BaseStateElement } from "./state";
/**
 * Element that renders table of contents open button.
 * @extends {BaseStateElement}
 * @final
 */
class TableOfContentsButton extends BaseStateElement {
    constructor() {
        super();
        this.opened = true;
    }
    static get properties() {
        return {
            opened: { type: Boolean, reflect: true },
        };
    }
    openTOC() {
        this.dispatchEvent(new Event("click"));
    }
    render() {
        return html `
      <button
        class="w-toc__button--open w-button w-button--secondary w-button--icon"
        data-icon="list_alt"
        aria-label="Open Table of Contents"
        @click="${this.openTOC}"
      ></button>
    `;
    }
}
__decorate([
    property({ type: Boolean, reflect: true }),
    __metadata("design:type", Boolean)
], TableOfContentsButton.prototype, "opened", void 0);
customElements.define("hicks-toc-button", TableOfContentsButton);
//# sourceMappingURL=hicks-toc-button.js.map