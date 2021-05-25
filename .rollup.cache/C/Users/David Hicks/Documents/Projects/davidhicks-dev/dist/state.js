import { BaseElement } from './base-elem';
/**
 * Base element which subscribes to global state.
 *
 * @extends {BaseElement}
 */
export class BaseStateElement extends BaseElement {
    constructor() {
        super();
        this.onStateChanged = this.onStateChanged.bind(this);
    }
    connectedCallback() {
        super.connectedCallback();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
    }
    /**
     * This method will be called whenever unistore state changes,
     * you can overwrite the method to hook into the event and deconstruct the state.
     *
     * @param {!Object<string, *>} state
     */
    // @ts-ignore-start
    onStateChanged(state) { } // eslint-disable-line no-unused-vars
}
//# sourceMappingURL=state.js.map