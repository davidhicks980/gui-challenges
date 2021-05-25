import { __decorate } from "tslib";
import { css, html } from "lit";
import { McControl } from "./hicks-radio-group.component";
import { customElement } from "lit/decorators.js";
let KsRadioGroup = class KsRadioGroup extends McControl {
    constructor() {
        super(...arguments);
        this.answerTemplate = (choices) => choices.map((choice) => html `
          <label class="focus-label choice-container">
            <div class="radio-container">
              <input
                @input="${() => this.updateModel(choice.name)}"
                tabindex="0"
                name="radiogroup"
                id="${choice.name}"
                class="radio-control"
                type="radio"
                value="${choice.name}"
              />
              <div class="glow"></div>
            </div>

            ${choice.label}
          </label>
        `);
    }
    updateModel(name) {
        this.handlers.value(name);
    }
    firstUpdated() {
        this.setHandler("ui", (val) => {
            this.shadowRoot.getElementById(val).checked = true;
        });
    }
    static get styles() {
        return [
            super.styles,
            css `
        :host([disabled]) {
          filter: grayscale(50%);
        }

        .radio-container {
          width: 1.2em;
          height: 1.2em;
          position: relative;
          display: inline-block;
          min-width: 1.2em;
          min-height: 1.2em;
        }
        input[type="radio"] {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 0.16em solid var(--blue-6);
          outline: none;
          appearance: none;
          box-sizing: content-box;
          margin: -0.16em;
          box-shadow: 0 0 0 0px rgba(0, 0, 0, 0.08);
          will-change: box-shadow;
        }
        input[type="radio"]:hover:not(:checked) {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          outline: none;
          box-shadow: 0 0 0 0.5em rgba(0, 0, 0, 0.05);
          transition: box-shadow 0.25s ease;
          appearance: none;
        }
        input[type="radio"]:hover:not(:checked):active {
          box-shadow: 0 0 0 0.5em var(--blue-4);
        }
        input[type="radio"]:hover:checked {
          box-shadow: 0 0 0 0.4em var(--blue-4);
          filter: brightness(1.05);
        }
        input[type="radio"]:checked {
          box-shadow: 0 0 0 0.4em var(--blue-4);
        }
        input[type="radio"]:focus:not(:checked) {
          box-shadow: 0 0 0 0.5em rgb(0, 0, 0, 0.08);
        }
        input[type="radio"]:active {
          box-shadow: 0 0 0 0.8em var(--blue-4);
          background-color: var(--blue-4);
          transition: box-shadow background-color 0.25s ease;
        }
        input[type="radio"]:after {
          display: block;
          content: " ";
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background-color: var(--blue-6);
          transform-origin: center center;
          transform: scale(0);
          will-change: transform;
          transition: transform 0.5s ease-in;
        }
        input[type="radio"]:checked::after {
          transform: scale(0.5);
          transition: transform 0.25s cubic-bezier(0.255, 0.255, 0.56, 2);
        }
        input[type="radio"]:checked:active::after {
          transform: scale(0.4);
          transition: transform 0.5s cubic-bezier(0.255, 0.255, 0.56, 2);
        }
      `,
        ];
    }
};
KsRadioGroup = __decorate([
    customElement("radio-group")
], KsRadioGroup);
export { KsRadioGroup };
//# sourceMappingURL=radio-group.js.map