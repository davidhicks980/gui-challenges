import { __decorate, __metadata } from "tslib";
import "element-internals-polyfill";
import { css, html } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { LitControl } from "./element-base.mixin";
import { ARROW_KEYS } from "./keys.constants";
let HicksRadioGroup = class HicksRadioGroup extends LitControl {
    constructor() {
        super();
        /**Whether to allow the user to use keyboard navigation mixin. Set to false in case the user is using a built-in form control */
        this.keyboardNavigation = false;
        this.label = "Select the best answer(s)";
        this.currentNode = 0;
        this.type = "multiselect";
    }
    firstUpdated(_changedProperties) {
        super.firstUpdated(_changedProperties);
        this.model.next(this.currentNode);
    }
    handleMultiSelect(e) {
        const childNodes = this.radioSlot.assignedNodes({ flatten: true });
        this.selectNodes = childNodes;
        console.log(this.selectNodes);
    }
    arrowKeyHandler(toProceeding) {
        let ref = this.selectNodes[this.currentNode];
        let next = ref.nextElementSibling;
        let prev = ref.previousElementSibling;
        const typeguard = (input) => input;
        if (toProceeding ? next : prev) {
            typeguard(next).select();
            ref.checked = false;
            this.currentNode++;
        }
        else if (toProceeding ? prev : next) {
            typeguard(prev).select();
            ref.checked = false;
            this.currentNode--;
        }
        this.model.next(this.selectNodes[this.currentNode].value);
        return;
    }
    handleSelection(e) { }
    handleKeydown(e) {
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
        return html `<fieldset
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
        return css `
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
};
__decorate([
    query("slot[name=radio]"),
    __metadata("design:type", HTMLInputElement)
], HicksRadioGroup.prototype, "radioSlot", void 0);
__decorate([
    query("fieldset"),
    __metadata("design:type", HTMLFieldSetElement)
], HicksRadioGroup.prototype, "fieldset", void 0);
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Boolean)
], HicksRadioGroup.prototype, "keyboardNavigation", void 0);
__decorate([
    property({ type: String, reflect: true }),
    __metadata("design:type", Object)
], HicksRadioGroup.prototype, "label", void 0);
HicksRadioGroup = __decorate([
    customElement("hicks-radio-group"),
    __metadata("design:paramtypes", [])
], HicksRadioGroup);
export { HicksRadioGroup };
//# sourceMappingURL=hicks-radio-group.component.js.map