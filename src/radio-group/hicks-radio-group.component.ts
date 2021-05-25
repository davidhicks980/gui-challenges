import "element-internals-polyfill";
import { css, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { LitControl } from "./element-base.mixin";
import { ARROW_KEYS } from "./keys.constants";
import { querySelectorAll } from "@github/query-selector";

@customElement("hicks-radio-group")
export class HicksRadioGroup extends LitControl {
  @query("slot[name=radio]")
  radioSlot: HTMLInputElement;
  @query("fieldset")
  fieldset: HTMLFieldSetElement;
  /**Whether to allow the user to use keyboard navigation mixin. Set to false in case the user is using a built-in form control */
  @property({ type: Boolean })
  keyboardNavigation: boolean = false;
  @property({ type: String, reflect: true })
  label = "Select the best answer(s)";
  selectNodes: HTMLInputElement[];
  currentNode: number = 0;

  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    this.model.next(this.currentNode);
  }
  constructor() {
    super();
    this.type = "multiselect";
  }

  handleMultiSelect(e) {
    const childNodes = this.radioSlot.assignedNodes({ flatten: true });
    this.selectNodes = childNodes;
    console.log(this.selectNodes);
  }
  arrowKeyHandler(toProceeding: boolean) {
    let ref = this.selectNodes[this.currentNode];
    let next = ref.nextElementSibling;
    let prev = ref.previousElementSibling;
    const typeguard = (input) => input as HTMLInputElement;
    if (toProceeding ? next : prev) {
      typeguard(next).select();
      ref.checked = false;
      this.currentNode++;
    } else if (toProceeding ? prev : next) {
      typeguard(prev).select();
      ref.checked = false;
      this.currentNode--;
    }
    this.model.next(this.selectNodes[this.currentNode].value);
    return;
  }

  handleSelection(e) {}
  handleKeydown(e: KeyboardEvent) {
    if (ARROW_KEYS.includes(e.key))
      switch (e.key) {
        case "Down":
        case "ArrowDown":
        case "Right":
        case "ArrowRight":
          this.arrowKeyHandler(true);
          break;
        case "Up":
        case "ArrowUp":
        case "Left":
        case "ArrowLeft":
          this.arrowKeyHandler(false);
          break;
      }
  }
  render() {
    return html`<fieldset
      role="combobox"
      aria-label="list of answer choices"
      class="option-container"
      @input="${this.handleSelection}"
      @keydown="${this.handleKeydown}"
    >
      <legend><slot name="radio-group-legend">${this.label}</slot></legend>
      <div>
        <slot name="radio" @slotchange="${this.handleMultiSelect}"></slot>
      </div>
    </fieldset>`;
  }
  static get styles() {
    return css`
      :host {
        font-size: 12pt;
      }
      fieldset {
        display: flex;
        flex-direction: column;
        border-style: solid;
        border-width: 0;
      }
      label {
        width: 100%;
        display: flex;
        flex-direction: row;
        padding: 0.5em;
        gap: 0.7em;
        cursor: pointer;
      }
      .choice-container:focus-within {
        outline: 2px dashed rgba(0, 0, 0, 0.7);
        outline-offset: 0.25em;
      }

      legend {
        font-family: "IBM Plex Sans";
        text-transform: uppercase;
      }
    `;
  }
}
