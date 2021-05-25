import { query } from "@github/query-selector";
import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { LitControl } from "./element-base.mixin";

@customElement("hicks-radio")
export class HicksRadio extends LitControl {
  @property({ type: Boolean, reflect: true, attribute: true })
  checked: boolean = false;

  constructor() {
    super();
    this.type = "radio";
    this.addEventListener("click", (e) => {
      this.checked = true;
    });
  }
  select() {
    this.checked = true;
  }
  emit() {
    this.dispatchEvent(new Event("input", { bubbles: false }));
  }
  render() {
    return html` <label class="radio circle">
      <span class="big"> <span class="small"></span> </span>
    </label>`;
  }
  static get styles() {
    return css`
      div {
        padding: 1.25em 0;
      }

      label {
        display: inline-block;
        margin-right: 0.625em;
      }

      span.big {
        border-radius: 50%;
        display: inline-block;
        height: 0.8em;

        padding: 3.33em;
        position: relative;
        top: 0.2em;
        width: 0.8em;
      }
      span.small {
        border-radius: 50% 50% 50% 50%;
        display: block;
        height: 100%;
        transition: background-color transform 0.4s ease 0s;
        width: 100%;
        transform: scale(0);
      }

      :host([checked]) > label {
        color: #269b0a;
        span.small {
          background-color: rgba(255, 64, 64, 0.8);
          opacity: 1;
        }
      }

      .circle .big {
        cursor: pointer;
        height: 1em;
        width: 1em;
        padding: 0.3215em;
        border: 2px solid #269b0a;
      }

      :host([checked]) label span.small {
        background-color: #269b0a;
        transform: scale(1);
        transition: background-color transform 0.4s ease 0s;
      }
    `;
  }
}
