import { LitElement, css, html } from "lit";
import { customElement, property, state, query } from "lit/decorators.js";
import { Variable } from "./Variable";

/**
 * @component  PlotSlider produces a range input that emits a
 * @fires PlotSlider#shift

 * @param {PlotParameters} params - this parametes generates the plot element including range inputs and toggles.
 *@param {string} element - the element to append the plot to. Will default to
 */
@customElement("pk-range")
export class PkRange extends LitElement {
  /**Declarations */

  @property({ type: Object })
  variable: Variable = {
    units: "na",
    symbol: "na",
    min: 1,
    max: 5,
    value: 1,
    range: [1, 5],
    name: "",
  };

  @query("#valueLabel")
  valueLabel!: HTMLDivElement;
  private min: number = 1;
  private max: number = 5;
  @state()
  private stepArray: number[] = [1];
  private symbol: string = "symbol";
  @state()
  private value: number = 0;
  private name: string = "slider";
  @state()
  private hasRange: boolean = false;
  @state()
  private step: number = 0;
  constructor() {
    super();
  }

  static get styles() {
    return css`
      input[type="range"]::-moz-range-thumb {
        border: none;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        background-color: white;
        border-radius: 50%;
        box-shadow: 2px 0px 10px -3px rgba(63, 63, 63, 0.4);
        border-style: solid;
        border-width: 1px;
        border-color: gray;
      }

      input[type="range"]:-moz-focusring {
        outline: 1px solid white;
        outline-offset: -1px;
      }

      input[type="range"] {
        border-style: solid;
        border-color: rgb(150, 150, 150);
        border-width: 1px;
        border-radius: 3px;
        height: 7px;
        -webkit-appearance: none;
        box-shadow: 1px 1px 4px 1px inset rgba(63, 63, 63, 0.1);
        width: 97%;
        position: relative;
        outline: none;
      }

      input[type="range"]:hover {
        border-style: solid;
        border-bottom-width: 1px;
      }

      input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 20px;
        height: 20px;
        background-image: linear-gradient(#f6f6f6, #e9e9e9);
        border-radius: 50%;
        border: 1px solid gray;
        box-shadow: 0 1px 1px 0 rgba(63, 63, 63, 0.5);
      }
      input[type="range"]:active::-webkit-slider-thumb {
        background-image: linear-gradient(#dfdfdf, #e9e9e9);
      }

      input[type="range"]:hover::-webkit-slider-thumb {
        box-shadow: 0 0 0 3px var(--pk-primary--lightest-transparent);
        cursor: pointer;
      }
      input[type="range"]:active::-webkit-slider-thumb {
        box-shadow: 0 0 0 5px var(--pk-primary--lightest-transparent);
        cursor: pointer;
      }

      input[type="range"]::-ms-track {
        height: 20px;
      }

      input[type="range"]::-ms-thumb {
        height: 20px;
      }

      /**Slider Containers*/
      .range-container {
        display: grid;
        grid-template-columns: 80% 20%;
        place-self: center;
        width: 100%;
        align-items: center;
      }

      .range-container:focus-within {
        outline: 2px dashed rgba(0, 0, 0, 0.7);
        cursor: pointer;
      }
      .range-container .value-label {
        grid-column-start: 2;
        grid-column-end: 3;
        font-family: "IBM Plex Sans", "Roboto", Arial, Helvetica, sans-serif;
      }

      .range-container .name-label {
        grid-column-start: 1;
        grid-column-end: 2;
        margin-left: 0.1em;
        font: var(--pk-slider-name-font);
        text-transform: capitalize;
        color: rgb(50, 50, 80);
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .range-container .slider-container {
        grid-column-start: 1;
        grid-column-end: 3;
        margin-top: 0.1em;
        padding-bottom: 0.5em;
        margin-bottom: 0.25em;
      }
      .slider {
        background-image: linear-gradient(
          to right,
          var(--pk-primary--light) 0,
          var(--pk-primary) 100%,
          white 100%
        );
        background-repeat: no-repeat;
        /*CSS transitions*/
        transition-property: none !important;
        /*CSS transforms*/
        transform: none !important;
        /*CSS animations*/
        animation: none !important;
      }
      /**Responsive*/
    `;
  }
  connectedCallback() {
    super.connectedCallback();
    this.value = this.variable.value || 0;
    this.min = this.variable.min || 0;
    this.max = this.variable.max || 0;
    this.symbol = this.variable.symbol || "na";
    this.name = this.variable.name || "na";
    this.step = typeof this.variable.step === "number" ? this.variable.step : 0;
    if (this.variable.range) {
      this.hasRange = true;
      this.stepArray = this.variable.range;
    }

    this.requestUpdate();
  }

  private sliderStep(step: number, max: number): number {
    if (step > 0) {
      return step;
    } else {
      if (max > 10) {
        step = 1;
        return 1;
      } else {
        step = max / 20;
        return step;
      }
    }
  }
  handleEvent(e: Event) {
    const target = e.target as HTMLInputElement;
    const output = this.hasRange
      ? this.stepArray[parseFloat(target.value) - 1]
      : target.value;
    target.style.backgroundSize = `${
      ((parseFloat(target.value) - this.min) / (this.max - this.min)) * 100
    }%, 10%`;
    this.valueLabel.innerText = output.toString();
    this.dispatchEvent(
      new CustomEvent("shift", {
        detail: {
          symbol: this.symbol,
          value: output,
        },
      })
    );
  }

  render() {
    return html`
      <div class="range-container">
        <div class="name-label" id="nameLabel">
          ${this.name} <span>(${this.symbol.replace("_", "")})</span>
        </div>
        <label for="${this.name}RangeInput" class="value-label" id="valueLabel">
          ${this.hasRange ? this.stepArray[this.value - 1] : this.value}
        </label>
        <div class="slider-container">
          <input
            @input="${this.handleEvent}"
            type="range"
            min="${this.min}"
            max="${this.max}"
            step="${this.sliderStep(this.step, this.max)}"
            value="${this.value}"
            class="slider"
            style="background-size:${`${
              ((this.value - this.min) / (this.max - this.min)) * 100
            }%, 10%`}"
            id="${this.name}RangeInput"
          />
        </div>
      </div>
    `;
  }
}
