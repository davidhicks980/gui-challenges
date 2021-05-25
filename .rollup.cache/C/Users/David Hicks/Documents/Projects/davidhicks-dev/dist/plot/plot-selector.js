import { __decorate, __metadata } from "tslib";
import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
let HicksRadio = class HicksRadio extends LitElement {
    constructor() {
        super(...arguments);
        this.foo = "foo";
        this.slot = "radio";
        this.value = "testValue";
        this.checked = false;
    }
    emit() {
        this.dispatchEvent(new Event("input", { bubbles: false }));
    }
    render() {
        return html `<label slot="radio"
      ><input name="radiogroup" @input="${this.emit}" type="radio"
    /></label>`;
    }
};
__decorate([
    property(),
    __metadata("design:type", Object)
], HicksRadio.prototype, "foo", void 0);
__decorate([
    property({ type: String, reflect: true }),
    __metadata("design:type", Object)
], HicksRadio.prototype, "slot", void 0);
__decorate([
    property({ type: String, reflect: true }),
    __metadata("design:type", Object)
], HicksRadio.prototype, "value", void 0);
__decorate([
    property({ type: Boolean }),
    __metadata("design:type", Boolean)
], HicksRadio.prototype, "checked", void 0);
HicksRadio = __decorate([
    customElement("hicks-radio")
], HicksRadio);
export { HicksRadio };
//# sourceMappingURL=plot-selector.js.map