import { LitElement, PropertyValues } from "lit";

/* eslint-disable require-jsdoc */
export class BaseElement extends LitElement {
  /**
   * @param {PropertyValues} changedProperties
   */
  firstUpdated(changedProperties: PropertyValues) {
    this.classList.remove("unresolved");
    super.firstUpdated(changedProperties);
  }

  createRenderRoot() {
    // Disable shadow DOM.
    // Instead templates will be rendered in the light DOM.
    return this;
  }
}
