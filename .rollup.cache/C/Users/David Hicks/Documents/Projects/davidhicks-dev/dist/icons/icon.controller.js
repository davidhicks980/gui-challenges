import { iconFactory } from "./icons";
export class IconController {
    constructor(host, name) {
        this._iconName = "cottage";
        (this.host = host).addController(this);
        this._iconName = name;
    }
    hostConnected() {
        this.host.requestUpdate();
    }
    hostDisconnected() {
        // Clear the timer when the host is disconnected
    }
    set name(value) {
        this._iconName = value;
        this.host.requestUpdate();
    }
    get name() {
        return this._iconName;
    }
    icon(primary, secondary) {
        return iconFactory(this._iconName, primary, secondary);
    }
}
//# sourceMappingURL=icon.controller.js.map