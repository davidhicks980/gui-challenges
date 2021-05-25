import { css, CSSResultArray, html, LitElement, TemplateResult } from "lit";
import { property } from "lit/decorators.js";

export class QuestionContent extends LitElement {
  @property({ type: String, reflect: true })
  validationMessage: string = "";
  dirty: boolean = false;

  /** Emits the current validity message via the custom 'changedValidity' event emitter. Access using the @validity decorator on the component.
   * @param  {Object} validation - an object containing the validation message for the component
   * @memberof QuestionContent
   */
  emitValidity(validation: { message: string; valid: boolean }): void {
    this.dispatchEvent(
      new CustomEvent("validity", {
        detail: validation,
        composed: true,
      })
    );
  }

  /**
   * All answers should be ingested first. While ingested, data validation is conducted on the client side, and both values and feedback are provided to the quiz-host component.
   * @param {string[]} answer - the user's current answer. This is set oninput rather than onsubmission.
   * @memberof QuestionContent
   */
  emitValue(value: CustomEvent<string>): void {
    this.dispatchEvent(
      new CustomEvent("submission", {
        detail: value.detail.split(","),
        composed: true,
      })
    );
  }
  firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    //bad code
    setTimeout(() => (this.validationMessage = ""), 100);
  }
  container(answerTemplate: TemplateResult) {
    return html`
      <section role="form" class="template">
        ${answerTemplate}
        ${this.dirty && this.validationMessage.length > 0
          ? html`<div aria-live="polite" class="template__errors">
              ${this.validationMessage}
            </div>`
          : ""}
      </section>
    `;
  }

  constructor() {
    super();

    this.shadowRoot.addEventListener("ModelChanged", this.emitValue);
    this.shadowRoot.addEventListener(
      "ValidityChanged",
      (event: CustomEvent<{ valid: boolean; message: string }>) => {
        this.emitValidity(event.detail);
        this.validationMessage = event.detail.message;
      }
    );
    this.shadowRoot.addEventListener("click", (e) => {
      this.dirty = true;
      this.shadowRoot.removeEventListener("focusin", () => "");
    });
  }
  regex = {
    number: {
      string: "[\\s\\d\\.$*-^]{1,100}",
      expression: /^([\s\d$^*-])+$/g,
    },
    floatingPoint: {
      length: (number: string) => ({
        string: `[\\d$*-^]{1,100}.\\b[\\d]{${number}}$`,
        expression: new RegExp(`[\\d$*-^]{1,100}.\\b[\\d]{${number}}$`),
      }),
    },

    character: {
      string: "[\\w\\d\\s\\.*^%,?]{1,100}",
      expression: /^([\s\d\w$^,&])+$/g,
    },
  };
  static get styles(): CSSResultArray {
    return [
      css`
        :host([disabled]) {
          pointer-events: none;
        }
        :host([disabled]) * {
          filter: grayscale(50%);
        }

        .template {
          margin-left: 7%;
        }
        .template__errors {
          color: white;
          border-radius: 3px;
          font-size: 11pt;
          width: 20rem;
          align-items: center;
          box-sizing: border-box;
          color: var(--pk-warning);
          display: flex;
          margin-top: 5px;
          font-family: "IBM Plex Sans", "Roboto", Arial, Helvetica, sans-serif;
          font-weight: 500;
        }
        .template__errors::before {
          content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 22 22' width='1em' fill='rgba(254, 100, 104)' height='1em'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 11c-.55 0-1-.45-1-1V8c0-.55.45-1 1-1s1 .45 1 1v4c0 .55-.45 1-1 1zm1 4h-2v-2h2v2z'/%3E%3C/svg%3E");
          transform: scaleX(0.99);
          margin-right: 8px;
          margin-top: 3px;
        }
      `,
    ];
  }
}
