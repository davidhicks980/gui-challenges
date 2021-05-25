import { ReactiveController, ReactiveControllerHost } from "lit";
import { iconFactory } from "./icons";

export class IconController implements ReactiveController {
  host: ReactiveControllerHost;

  private _iconName = "cottage";
  constructor(host: ReactiveControllerHost, name: string) {
    (this.host = host).addController(this);
    this._iconName = name;
  }

  hostConnected() {
    this.host.requestUpdate();
  }
  hostDisconnected() {
    // Clear the timer when the host is disconnected
  }
  set name(value: string) {
    this._iconName = value;
    this.host.requestUpdate();
  }
  get name() {
    return this._iconName;
  }
  icon(primary: string, secondary: string) {
    return iconFactory(this._iconName, primary, secondary);
  }
}
