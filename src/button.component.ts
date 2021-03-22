import { css, customElement, LitElement, property } from "lit-element";
import { html, TemplateResult } from "lit-html";

@customElement("hicks-hamburger")
export class HicksHamburger extends LitElement {
  constructor() {
    super();
  }

  @property({ type: Number }) radius: number = 0;
  @property({ type: Boolean, reflect: true, attribute: true })
  toggled: boolean = true;
  render() {
    return html`
      <div class="outer-container">
        <span class="container" data-toggled="${this.toggled}"
          ><slot name="link"></slot
        ></span>
      </div>
    `;
  }
  static get styles() {
    return css`
      .container[data-toggled="true"]:hover,
      .hamburger:hover {
        opacity: 0.7;
      }
      .container[data-toggled="true"],
      .container[data-toggled="true"]:after,
      .container[data-toggled="true"]:before {
        background-color: #fff;
      }
      .outer-container {
        position: relative;
        display: inline-block;
        width: 40px;
        height: 24px;
      }
      .container {
        top: 50%;
        display: block;
        margin-top: -2px;
      }
      .container,
      .container:after,
      .container:before {
        position: absolute;
        width: 40px;
        height: 4px;
        transition-timing-function: ease;
        transition-duration: 0.15s;
        transition-property: transform;
        border-radius: 4px;
        background-color: #fff;
      }
      .container:after,
      .container:before {
        display: block;
        content: "";
      }
      .container:before {
        top: -10px;
      }
      .container:after {
        bottom: -10px;
      }
      .outer-container {
        position: relative;
        display: inline-block;
        width: 40px;
        height: 24px;
      }

      .container:hover {
        opacity: 0.7;
      }
      .container::before {
        top: -10px;
      }
      .container::after {
        bottom: -10px;
      }
      .container[data-toggled="true"]::after {
        transform: translate3d(-8px, 0, 0) rotate(45deg) scaleX(0.7);
        display: block;
        content: "";
        background-color: white;
      }
      .container[data-toggled="true"]::before {
        transform: translate3d(-8px, 0, 0) rotate(-45deg) scaleX(0.7);
        display: block;
        content: "";
        background-color: white;
      }
    `;
  }
}
