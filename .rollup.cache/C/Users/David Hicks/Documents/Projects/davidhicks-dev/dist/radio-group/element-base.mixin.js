import { __decorate, __metadata } from "tslib";
import "element-internals-polyfill";
import { LitElement } from "lit";
import { BehaviorSubject } from "rxjs";
import { property } from "lit/decorators.js";
import { debounceTime, filter, map, skipWhile, take, tap, } from "rxjs/operators";
var Constraint;
(function (Constraint) {
    Constraint["PATTERN"] = "patternMismatch";
    Constraint["LONG"] = "tooLong";
    Constraint["SHORT"] = "tooShort";
    Constraint["MAX"] = "rangeOverflow";
    Constraint["MIN"] = "rangeUnderflow";
    Constraint["TYPE"] = "typeMismatch";
    Constraint["VALID"] = "valid";
    Constraint["MISSING"] = "valueMissing";
    Constraint["BAD"] = "badInput";
    Constraint["STEP"] = "stepMismatch";
})(Constraint || (Constraint = {}));
const messages = {
    typeMismatch: `Please enter a valid value.`,
    badInput: {
        string: `Please enter a valid value.`,
        number: `Please enter a number.`,
        range: `Invalid input.`,
    },
    rangeUnderflow: ({ min }) => `Value must be greater than or equal to ${min}.`,
    rangeOverflow: ({ max }) => `Value must be less than or equal to ${max}.`,
    stepMismatch: `Invalid input.`,
    tooLong: (params) => `Please enter at most ${params.maxLength} character(s).You entered ${params.value.length}.`,
    tooShort: (params) => `Please enter at least ${params.minLength} character(s). You entered ${params.value.length}.`,
    patternMismatch: ({ title }) => `Invalid input. ${title}`,
    valueMissing: {
        default: `Please enter an answer.`,
        checkbox: `Please select at least one answer.`,
        select: `Please select an option.`,
        radio: `Please select an option.`,
    },
};
export class LitControl extends LitElement {
    /**
     * Tests the validity of the current entry.
     * @returns {*}  {boolean}
     * @memberof LitControl
     */
    constructor() {
        super();
        this.model = new BehaviorSubject("");
        this.modelObserver = this.model.asObservable();
        this.required = false;
        this.field = "default";
        this.checked = false;
        this.loaded = false;
        this._uiHandler = (val) => {
            throw new Error("Method not implemented. Define a function that updates the UI when a new modelValue is set ");
        };
        this._valueHandler = (value) => {
            this.model.next(value);
        };
        this._eventHandler = (event) => {
            this.model.next(event.target.value);
        };
        this._handleValidity = () => {
            let booleanField = false, selectionType = "default";
            if (this.field === "checkbox" || this.field === "radio") {
                booleanField = true;
                selectionType = this.field === "radio" ? "radio" : "checkbox";
            }
            else if (this.field === "select") {
                selectionType = "select";
            }
            const { fieldIsEmpty, entryIsString, entryTooShort, entryTooLong, entryIsNumber, entryTooSmall, entryTooLarge, } = this.getValidityFunctions(booleanField);
            //If the field is labeled as required and does not have an entry, mark as invalid
            if (this.required && fieldIsEmpty()) {
                return this.setInternalValidity(Constraint.MISSING, false, selectionType);
            }
            else if (booleanField)
                return true;
            if (entryIsString()) {
                if (entryTooShort())
                    return this.setInternalValidity(Constraint.SHORT, { minlength: this.minLength, val: this._value }, false);
                if (entryTooLong())
                    return this.setInternalValidity(Constraint.LONG, { maxlength: this.maxLength, val: this._value }, false);
            }
            if (entryIsNumber()) {
                if (entryTooSmall())
                    return this.setInternalValidity(Constraint.MIN, { min: this.min, val: this._value }, false);
                if (entryTooLarge())
                    return this.setInternalValidity(Constraint.MAX, { max: this.max, val: this._value }, false);
            }
            if (this.patternNotMatched())
                return this.setInternalValidity(Constraint.PATTERN, {
                    title: this.title
                        ? this.title
                        : "Your answer does not match the desired format.",
                }, false);
            this.internals_.setValidity({ valid: true });
            return true;
        };
        this.setInternalValidity = (type, messageParameters, messageProperty) => {
            let validity = {};
            validity[type] = true;
            const message = messageParameters
                ? messageProperty
                    ? messages[type][messageProperty](messageParameters)
                    : messages[type](messageParameters)
                : messageProperty
                    ? messages[type][messageProperty]
                    : messages[type];
            this.internals_.setValidity(validity, message);
            return false;
        };
        this._modelHandler = (value) => {
            if (typeof value === "string") {
                this.internals_.setFormValue(value);
                this._value = value;
                return value;
            }
        };
        this.internals_ = this.attachInternals();
        this.modelObserver
            .pipe(filter((val) => val.length > 0), take(1))
            .subscribe(() => {
            this.classList.add("dirty");
        });
    }
    getValidityFunctions(booleanField) {
        const fieldIsEmpty = () => (booleanField && !this.checked) || (!booleanField && this._value == "");
        const entryIsString = () => typeof this._value === "string";
        const entryTooShort = () => this.minLength && this._value.length < this.minLength;
        const entryTooLong = () => this.maxLength && this._value.length > this.minLength;
        const entryIsNumber = () => typeof this._value === "number";
        const entryTooSmall = () => this.min && this._value < this.min;
        const entryTooLarge = () => this.max && this._value > this.max;
        return {
            fieldIsEmpty,
            entryIsString,
            entryTooShort,
            entryTooLong,
            entryIsNumber,
            entryTooSmall,
            entryTooLarge,
        };
    }
    patternNotMatched() {
        let expression = new RegExp(this.pattern);
        const patternNotMatched = !expression.test(this._value);
        return patternNotMatched;
    }
    connectedCallback() {
        super.connectedCallback();
        this._listenToInput();
        this.setAttribute("tabindex", "0");
        this.loaded = true;
    }
    _listenToInput() {
        this.modelObserver
            .pipe(skipWhile(() => this.loaded === false), debounceTime(50), map(this.handlers.model), tap(this.handlers.validity))
            .subscribe((val) => this._emitChangedModel(val));
    }
    disconnectedCallback() {
        this.model.complete();
        super.disconnectedCallback();
    }
    processFormValue(input) {
        return input;
    }
    _emitChangedModel(newValue) {
        this.dispatchEvent(new CustomEvent("ModelChanged", {
            detail: newValue,
            bubbles: true,
        }));
        this.dispatchEvent(new CustomEvent("ValidityChanged", {
            detail: { valid: this.validity.valid, message: this.validationMessage },
            bubbles: true,
        }));
    }
    // Mostly boilerplate--add common form control
    // properties and methods. Many are simply wired
    // through to the ElementInternals object.
    get form() {
        return this.internals_.form;
    }
    get name() {
        return this.getAttribute("name");
    }
    get validity() {
        return this.internals_.validity;
    }
    get validationMessage() {
        return this.internals_.validationMessage;
    }
    get willValidate() {
        return this.internals_.willValidate;
    }
    /**Functions to handle value and validity changes*/
    get handlers() {
        const ui = this._uiHandler;
        const value = this._valueHandler;
        const event = this._eventHandler;
        const validity = this._handleValidity;
        const model = this._modelHandler;
        return {
            ui,
            value,
            event,
            validity,
            model,
        };
    }
    setHandler(type, method) {
        this["_" + type + "Handler"] = method;
    }
    set value(value) {
        if (this.loaded) {
            if (Array.isArray(value))
                value = value.join(",");
            this.handlers.value(value);
            this.handlers.ui(value);
            this.requestUpdate("value");
        }
        else {
            setTimeout(() => {
                this.value = value;
            }, 50);
        }
    }
    get value() {
        return this._value;
    }
    checkValidity() {
        return this.internals_.checkValidity();
    }
}
LitControl.formAssociated = true;
__decorate([
    property({ type: Boolean, reflect: true }),
    __metadata("design:type", Boolean)
], LitControl.prototype, "required", void 0);
__decorate([
    property({ type: String, reflect: true }),
    __metadata("design:type", String)
], LitControl.prototype, "pattern", void 0);
__decorate([
    property({ type: Number, reflect: true }),
    __metadata("design:type", Number)
], LitControl.prototype, "max", void 0);
__decorate([
    property({ type: Number, reflect: true }),
    __metadata("design:type", Number)
], LitControl.prototype, "min", void 0);
__decorate([
    property({ type: Number, reflect: true }),
    __metadata("design:type", Number)
], LitControl.prototype, "maxLength", void 0);
__decorate([
    property({ type: Number, reflect: true }),
    __metadata("design:type", Number)
], LitControl.prototype, "minLength", void 0);
__decorate([
    property({ type: String, reflect: true }),
    __metadata("design:type", String)
], LitControl.prototype, "field", void 0);
__decorate([
    property({ type: Boolean, reflect: true }),
    __metadata("design:type", Boolean)
], LitControl.prototype, "checked", void 0);
__decorate([
    property({ type: String, reflect: true }),
    __metadata("design:type", String)
], LitControl.prototype, "type", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], LitControl.prototype, "value", null);
//# sourceMappingURL=element-base.mixin.js.map