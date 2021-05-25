import { __decorate, __metadata } from "tslib";
import "./pk-range.component";
import "./pk-latex.component";
import { Chart, registerables, } from "chart.js/dist/chart.esm";
import { css, html, LitElement } from "lit";
import { plotOptions } from "./plot-options.config";
import { customElement, property, query, state } from "lit/decorators.js";
/**
 * Component that renders a plot to the DOM given a list of parameters (see PlotParameters interface)
 * @param {PlotParameters} params - this function generates the plot element including range inputs and toggles.
 *@param {string} element - the element to append the plot to. Will default to
 */
const plots = {
    multipledose: {
        id: "pk_mdmp_q2_mdplot",
        index: 2,
        title: "Multiple Dosing Regimen Plot",
        header: "Drug X is an antibiotic with a therapeutic range between 20 and 40 mg/L. It is administered as an IV bolus. The population average for clearance and volume are 6 L/h and 85 L, respectively. Using the slider bars, explore how changes in dose and dosing interval impact achieving concentrations within the therapeutic window while maintaining an average steady-state concentration of 30 mg/L.",
        variables: [
            {
                name: "Dose",
                units: "mg",
                symbol: "X_0",
                min: 500,
                max: 4500,
                value: 1000,
                step: 50,
            },
            {
                name: "Number of Doses",
                units: "#",
                symbol: "n",
                min: 4,
                max: 24,
                value: 4,
                step: 2,
            },
            {
                name: "Volume of Distribution",
                units: "L",
                symbol: "V_D",
                min: 50,
                max: 500,
                value: 250,
                step: 5,
            },
            {
                name: "Clearance",
                units: "mL/min",
                symbol: "Cl",
                min: 5,
                max: 50,
                value: 100,
                step: 5,
            },
            {
                name: "Dosing Interval",
                units: "hr",
                symbol: "tau",
                min: 1,
                max: 7,
                value: 4,
                step: 1,
                range: [null, 4, 8, 12, 18, 24, 36, 48],
            },
        ],
        equation: '`(v["X_0"]/v["V_D"])*(1-2.71^(-n*0.06*(v["Cl"]/v["V_D"])*v["tau"]))/(1-2.71^(-0.06*(v["Cl"]/v["V_D"])*v["tau"]))*(2.71^(-0.06*(v["Cl"]/v["V_D"])*x))`',
        equationTemplate: "",
        multipleDose: true,
        bottomBound: 20,
        topBound: 40,
        axis: ["time (hr)", "concentration (ug/L)"],
    },
    extravasation: {
        id: "pk_akct_q1_scplot",
        title: "Extravascular Administration",
        index: 1,
        header: "Move the slider bar to see the effects of clearance on the concentration-time profile. Concentration is related to time using the equation.",
        variables: [
            {
                name: "Dose",
                units: "mg",
                symbol: "X_0",
                min: 250,
                max: 1000,
                value: 500,
                step: 50,
            },
            {
                name: "Clearance",
                units: "mL/min",
                symbol: "Cl",
                min: 5,
                max: 50,
                value: 25,
                step: 5,
            },
            {
                name: "Volume of Distribution",
                units: "L",
                symbol: "V_D",
                min: 50,
                max: 500,
                value: 250,
                step: 10,
            },
            {
                name: "k<sub>a</sub>",
                units: "1/h",
                symbol: "k_a",
                min: 0.1,
                max: 1,
                value: 0.5,
                step: 0.05,
            },
        ],
        equation: '`(v["k_a"]*v["X_0"])/(v["V_D"]*v["k_a"]-(0.06*v["Cl"]/v["V_D"]))*(2.71^(-(0.06*v["Cl"]/v["V_D"])*x)-2.71^(-v["k_a"]*x))`',
        equationTemplate: "`C = `",
        axis: ["time (min)", "drug X(mg/L)"],
        multipleDose: false,
    },
};
let PlotEngine = class PlotEngine extends LitElement {
    constructor() {
        super();
        /**Declarations */
        this.params = plots.multipledose;
        this._plotType = "multipledose";
        this.loaded = {};
        /**Sets the highlight color of the plot */
        this.mainColor = getComputedStyle(document.documentElement).getPropertyValue("--indigo-7");
        this.highlightColor = getComputedStyle(document.documentElement).getPropertyValue("--indigo-9");
        this.tauValueArray = [null, 4, 8, 12, 18, 24, 36, 48];
        this.go = true;
        this.plottedEquation = "";
        this.latexEquation = "";
        this.range = 10;
        this.variableValues = {};
        this.scale = 40;
        this.latex = {
            interpolateVariables: (equation, variables) => {
                const calculate = new Function("variables", '"use strict";return (' + equation + ")");
                return calculate(variables);
            },
            update: () => {
                this.displayedEquation = this.latex
                    .interpolateVariables(this.params.equation
                    .replace(/v\["/g, "${variables.")
                    .replace(/"\]/g, ".toFixed(1)}"), this.variableValues)
                    .replace(/x/g, "time")
                    .replace(/2.71/g, "e")
                    .replace(/\*?-?\*?0.06\*?/g, "");
            },
        };
        this.multipleDosingWorker = (ev) => {
            const values = ev.data[0];
            const equation = ev.data[1];
            const tau = values["tau"], doses = values["n"], calculate = new Function("variables", "x", "n", '"use strict";return (' + equation + ")"), data = [];
            let i, stepCount, hour = 0;
            for (i = 0; i < doses; i++) {
                for (stepCount = 0; stepCount < tau; stepCount++) {
                    data.push({
                        x: hour++,
                        y: calculate(values, stepCount, i + 1),
                    });
                    if (hour === doses * tau) {
                        stepCount++;
                        for (stepCount; stepCount < doses * tau * 0.5; stepCount++) {
                            data.push({
                                x: hour++,
                                y: calculate(values, stepCount, i + 1),
                            });
                        }
                    }
                }
            }
            postMessage(data, null);
        };
        this.bolusDosingWorker = (ev) => {
            let i = 0;
            const data = [];
            const calculate = new Function("variables", "x", '"use strict"; return (' + ev.data[1] + ")");
            for (i; i < 40; i += 0.5) {
                data.push({
                    x: i++,
                    y: calculate(ev.data[0], i),
                });
            }
            postMessage(data, null);
        };
        this.createDebouncer = (method, delay) => {
            let timeout = false;
            return (params) => (e) => {
                if (!timeout) {
                    // Executes the func after delay time.
                    timeout = true;
                    setTimeout(() => {
                        method(params, e);
                        timeout = false;
                    }, delay);
                }
            };
        };
        this.updatePlot = (slider, e) => {
            this.variableValues[slider.symbol] = parseFloat(e.detail.value);
            this.latex.update();
            this.plotFunction(this.variableValues, this.plottedEquation, this.range);
        };
        this.eventDebouncer = this.createDebouncer(this.updatePlot, 30);
        Chart.register(...registerables);
    }
    get plotType() {
        return this._plotType;
    }
    set plotType(value) {
        this._plotType = value;
        this.params = plots[value];
        this._reset();
    }
    createWorker(fn) {
        const blob = new Blob(["self.onmessage = ", fn.toString()], {
            type: "text/javascript",
        });
        const url = URL.createObjectURL(blob);
        return new Worker(url);
    }
    logToggle(e) {
        this.chart.options.scales.y.type = e.target.checked
            ? "logarithmic"
            : "linear";
        this.chart.update();
    }
    fixToggle(e) {
        this.chart.options.scales.y.max = e.target.checked
            ? this.max()
            : null;
        this.chart.update();
    }
    max() {
        const data = this.chart.data.datasets[0].data;
        return data.reduce((max, p) => (p.y > max ? p.y : max), data[0].y);
    }
    _initPlotting(chart) {
        this._initVariables();
        this._initPlotUpdate(chart);
    }
    firstUpdated() {
        this.chart = this._initPlotCanvas(this.canvas, this.mainColor, this.highlightColor);
        this._initPlotting(this.chart);
    }
    /**
     * @description Sets variables using user-supplied or default values. This must be called prior to plotting any equations
     * @private
     * @memberof PlotEngine
     */
    _initVariables() {
        var _a, _b;
        if (((_a = this.params) === null || _a === void 0 ? void 0 : _a.equation) && Array.isArray((_b = this.params) === null || _b === void 0 ? void 0 : _b.variables)) {
            //Replaces user-interpolated variables and ASCII syntax with property accessor that utilize dot notations. Honestly, probably didn't need to replace anything here, but it works fine and may have a small performance benefit.
            this.plottedEquation = this.params.equation
                .replace(/v\[\"/g, "variables.")
                .replace(/\"]/g, "")
                .replace(/\^/g, "**")
                .replace(/\`/g, "");
            //The side of the X axis. Defaults to 100
            this.range = this.params.range ? this.params.range : 100;
            //Axis labels. Should be provided as ['x', 'y']
            this.labels = this.params.axis;
            //The independent variable. Defaults to x. This is only used in the interpolated equation, so it does not affect the graph itself
            this.independentVariable = this.params.independentVariable
                ? this.params.independentVariable
                : "x";
            //Initiate the variable values
            this.params.variables.forEach((v) => {
                this.variableValues[v.symbol] = v.value;
            });
            //Can now initiate graphing
            this.loaded = true;
        }
    }
    _initPlotCanvas(canvasElement, color, highlight) {
        return new Chart(canvasElement, plotOptions([{ x: 0, y: 0 }], canvasElement, color, highlight));
    }
    _initPlotUpdate(chart) {
        const updateChart = this.updateChart;
        this._initCoordinateFunction(updateChart, chart);
        this.latex.update();
        this.plotFunction(this.variableValues, this.plottedEquation, this.range);
    }
    _reset() {
        this.worker.terminate();
        this._initPlotting(this.chart);
    }
    _initCoordinateFunction(updateChart, chart) {
        if (window.Worker) {
            this.worker = this.params.multipleDose
                ? this.createWorker(this.multipleDosingWorker)
                : this.createWorker(this.bolusDosingWorker);
            this.worker.onmessage = function (ev) {
                updateChart(ev.data, chart);
            };
            this.plotFunction = (values, equation, range) => {
                if (this.go) {
                    this.worker.postMessage([values, equation, range]);
                }
            };
        }
        else {
            this.plotFunction = this.params.multipleDose
                ? this.nativeFunctions.multipleDose
                : this.nativeFunctions.bolus;
        }
    }
    updateChart(points, chart) {
        chart.data.datasets[0].data = points;
        chart.update();
    }
    get nativeFunctions() {
        return {
            /**Updates the bolus coordinates*/
            bolus: (values, equation, scale) => {
                return this.calculations.bolus(values, equation, scale);
            },
            multipleDose: (values, equation) => {
                return this.calculations.multipleDose(values, equation);
            },
        };
    }
    get calculations() {
        return {
            /**
             * Multiple dose coordinate calculation
             * @param {VariableSet} values - key value pairs representing variable values
             * @param {string} equation - a string representing an equation with interpolated variables
             * @returns {ScatterDataPoint[]} an array of coordinates
             */
            multipleDose: (values, equation) => {
                const tau = values["tau"], doses = values["n"], calculate = new Function("variables", "x", "n", '"use strict";return (' + equation + ")"), data = [];
                let i, stepCount, hour = 0;
                for (i = 0; i < doses; i++) {
                    for (stepCount = 0; stepCount < tau; stepCount++) {
                        data.push({
                            x: hour++,
                            y: calculate(values, stepCount, i + 1),
                        });
                        if (hour === doses * tau) {
                            stepCount++;
                            for (stepCount; stepCount < doses * tau * 0.5; stepCount++) {
                                data.push({
                                    x: hour++,
                                    y: calculate(values, stepCount, i + 1),
                                });
                            }
                        }
                    }
                }
                return data;
            },
            /**
             * Bolus dose coordinate calculation
             * @param {VariableSet} values - key value pairs representing variable values
             * @param {string} equation - a string representing an equation with interpolated variables
             * @param {number} scale - A number representing the size of the x-axis. Defaults to 40.
             * @returns {ScatterDataPoint[]} an array of coordinates
             */
            bolus: (values, equation, scale) => {
                let i = 0;
                const data = [];
                const calculate = new Function("variables", "x", '"use strict"; return (' + equation + ")");
                for (i; i < scale; i += 0.5) {
                    data.push({
                        x: i++,
                        y: calculate(values, i),
                    });
                }
                return data;
            },
        };
    }
    minMaxCalc(name, value, type) {
        if (name === "tau") {
            const comparator = type !== "none" ? Math[type] : 1;
            comparator !== 1
                ? this.tauValueArray[value]
                : comparator(this.tauValueArray);
        }
        else {
            return value;
        }
    }
    disconnectedCallback() {
        this.worker.terminate();
    }
    get parameters() {
        if (this.params.variables)
            return this.params.variables;
        else
            return [];
    }
    render() {
        return html `
      <div class="plot-container">
        <div class="chart-container">
          <canvas id="chart"></canvas>
        </div>

        <div class="slider-container">
          <div class="sliders">
            ${this.params.variables.map((v) => {
            return html `<pk-range
                .variable="${v}"
                @shift="${this.eventDebouncer(v)}"
              ></pk-range>`;
        })}
            <div class="toggle-container">
              <div id="toggle-log-div" class="toggle-div">
                log axis
                <label class="toggle-check">
                  <input
                    @click="${this.logToggle}"
                    id="log"
                    type="checkbox"
                    class="toggleInput"
                    data-unchecked
                  />
                  <span class="toggle-touch round"></span>
                </label>
              </div>
              <div id="toggle-axis-div" class="toggle-div">
                fix axis
                <label class="toggle-check">
                  <input
                    @click="${this.fixToggle}"
                    id="fix"
                    type="checkbox"
                    class="toggleInput"
                    data-unchecked
                  />
                  <span class="toggle-touch round"></span>
                </label>

                <!--End of wrapper div-->
              </div>
            </div>
          </div>
        </div>
        <div class="${this.lockSVG ? "equation-area lock" : "equation-area"}">
          <button
            @click="${() => {
            this.lockSVG = !this.lockSVG;
            this.requestUpdate();
        }}"
            class="lock-button"
            aria-details="locks an expanded equation in place"
            tabindex="0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="18"
              viewBox="0 0 24 24"
              width="18"
            >
              <path
                d=${this.lockSVG
            ? "M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM9 8V6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9z"
            : "M12 13c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6-5h-1V6c0-2.76-2.24-5-5-5-2.28 0-4.27 1.54-4.84 3.75-.14.54.18 1.08.72 1.22.53.14 1.08-.18 1.22-.72C9.44 3.93 10.63 3 12 3c1.65 0 3 1.35 3 3v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 11c0 .55-.45 1-1 1H7c-.55 0-1-.45-1-1v-8c0-.55.45-1 1-1h10c.55 0 1 .45 1 1v8z"}
              />
            </svg>
          </button>

          <pk-latex
            class="scale-equation"
            .equation="${this.displayedEquation}"
          ></pk-latex>
        </div>
      </div>
    `;
    }
    static get styles() {
        return css `
      /**Css for Toggles*/
      div.toggle-div {
        font-family: var(--title-font), Helvetica, sans-serif;
        color: rgb(133, 133, 133);
        text-align: left;
        font-size: 9pt;
        -webkit-text-stroke: #868686;
        line-height: 2.5em;
        width: fit-content;
        text-transform: capitalize;
      }
      div.toggle-div:hover {
        transition: 0.2s;
        color: black;
      }
      .toggle-div:focus-within {
        outline: 2px dashed black;
        outline-offset: 3px;
      }
      .toggle-check {
        position: relative;
        display: block;
        width: 2.8em;
        height: 1.4em;
        margin-left: 0.2em;
      }

      .toggle-check input {
        opacity: 0;
        width: 0;
        height: 0;
      }

      .toggle-touch {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        box-shadow: 1px 2px 4px inset rgba(63, 63, 63, 0.2);
        transition: all 0.4s;
      }

      .toggle-touch:before {
        position: absolute;
        content: "";
        transform: translateY(-0.1em);
        height: 1.4em;
        width: 1.4em;
        background-image: linear-gradient(#f6f6f6, #e9e9e9);
        -webkit-transition: 0.2s;
        transition: 0.2s;
        box-shadow: 0 1px 1px 0 rgba(63, 63, 63, 0.514);
        border: 1px solid gray;
        border-radius: 50%;
      }

      input[type="checkbox"]:checked + .toggle-touch {
        background-color: var(--body-font);
      }

      input[type="checkbox"]:checked + .toggle-touch:before {
        -webkit-transform: translateX(18px);
        -ms-transform: translateX(18px);
        transform: translateX(15px) translateY(-0.15em);
      }

      /* Rounded sliders */
      .toggle-touch.round {
        box-shadow: inset 0 0 0 1px gray,
          1px 2px 4px inset rgba(63, 63, 63, 0.2);

        border-radius: 10px;
      }

      .toggle-container {
        display: flex;
        border: 1px dotted #bbbbbb;
        border-radius: 5px;
        height: 3.5em;
        place-content: space-evenly;
        box-shadow: var(--pk-shadow--step-0);
      }
      /**
      Layout 
      */
      .plot-container {
        display: grid;
        grid-template-columns: minmax(5px, 100%) 250px;
        box-sizing: border-box;
        gap: 10px;
        margin: 10px;
      }
      .chart-container {
        font-family: Arial, Helvetica, sans-serif;
        grid-area: 1 / 1 / span 2 / 1;
        max-height: 100%;
        background: white;
        border-radius: 5px;
        padding: 30px 30px 10px 10px;
        position: relative;
        border: 1px solid #bbbbbb;
        box-shadow: var(--pk-shadow--step-1);
      }
      /**Slider Containers*/
      .slider-container {
        grid-area: 2 / 2 / 2 / 2;
        background: white;
        border: 1px solid #bbbbbb;
        border-radius: 5px;
        padding: 10px;
        display: flex;
        flex-direction: column;
        box-shadow: var(--pk-shadow--step-1);
      }

      .equation-area {
        grid-area: 1 / 2 / 2 / 2;
        background: white;
        padding: 0px;

        overflow: auto;
        transform: scale(1) translateX(0px) translateY(0px);
        border: 1px solid #bbbbbb;
        border-radius: 5px;
        display: block;
        box-shadow: var(--pk-shadow--step-1);
      }

      pk-latex {
        --input: normal 0.7em var(--body-font), serif;
      }
      .equation-area:hover {
        transform-origin: 100% 100%;
        transform: scale(1.8) translateX(-50px) translateY(20px);
        transition-delay: 1s;
        transition-duration: 0.3s;
        transition-timing-function: ease;
        transition-property: transform;
        border: 1px solid black;
        box-shadow: var(--pk-small-shadow);
      }

      .equation-area.lock {
        transform-origin: 100% 100%;
        transform: scale(1.8) translateX(-20px) translateY(20px);
        transition-delay: 1s;
        transition-duration: 0.3s;
        transition-timing-function: ease;
        transition-property: transform;
        box-shadow: var(--pk-small-shadow);
      }
      .lock-button {
        position: absolute;
        right: 0px;
        top: 5px;
        background: none;
        border: none;
        z-index: 1;
        outline: none;
      }
      .lock-button:hover {
        fill: var(--pk-primary);
      }
      @media all and (max-width: 600px) and (min-width: 0px) {
        pk-latex {
          --input: normal 0.9em "Space Mono", serif;
        }
        .equation-area:hover {
          transform-origin: none;
          transform: none;
        }
        .equation-area.lock {
          transform-origin: none;
          transform: none;
        }
        .lock-button {
          display: none;
        }
        .equation-area {
          grid-area: 1 / 1 / 1 / 1;
          transform: scale(1) translateX(0px) translateY(0px);
          border: 0px;
          border-radius: 5px;
          background: rgba(0, 0, 0, 0);
          outline: 0px;
        }
        .equation-area:hover {
          border: none;
        }
        .plot-container {
          display: grid;
          grid-template-rows: auto auto;
          grid-template-columns: 100%;
          gap: 10px;
          padding: 0;
          margin: 10px;
          min-width: 0px;
        }
        .slider-container {
          grid-area: 2 / 1 / 2 / 1;

          display: flex;
          flex-direction: column;
        }
        .slider-container .toggle-container {
          width: 100%;
          border: 1px dotted lightgray;
        }
        .toggle-container .toggle-div {
          line-height: 2em;
        }
        .slider-container .sliders {
          display: grid;
          grid-template-columns: 45% 45%;
          column-gap: 20px;
          row-gap: 0px;
        }

        .chart-container {
          grid-area: 1 / 1 / 1 / 1;
          width: 1fr;
          padding-top: 85px;
          margin: 0px;
          padding-bottom: 0px;
        }
      }
    `;
    }
};
__decorate([
    state(),
    __metadata("design:type", Object)
], PlotEngine.prototype, "params", void 0);
__decorate([
    property({ type: String, reflect: true }),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], PlotEngine.prototype, "plotType", null);
__decorate([
    property({ type: Object, reflect: false }),
    __metadata("design:type", Object)
], PlotEngine.prototype, "loaded", void 0);
__decorate([
    query("#chart"),
    __metadata("design:type", HTMLCanvasElement)
], PlotEngine.prototype, "canvas", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", String)
], PlotEngine.prototype, "mainColor", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", String)
], PlotEngine.prototype, "highlightColor", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", String)
], PlotEngine.prototype, "displayedEquation", void 0);
PlotEngine = __decorate([
    customElement("plot-engine"),
    __metadata("design:paramtypes", [])
], PlotEngine);
export { PlotEngine };
//# sourceMappingURL=plot.component.js.map