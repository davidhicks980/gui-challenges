import "./sidenav.component";
import { HicksSidenav } from "./sidenav.component";
import "./menu.component";
import "./button.component";

import { HicksHamburger } from "./button.component";

let hamtoggled;
const page = {
  getElem: function (selector: string) {
    const elem = document.querySelector(selector);
    return {
      elem,
      listen: (cb: (e: Event) => any) => {
        elem
          ? elem.addEventListener("click", cb)
          : console.error("[ERROR] Element does not exist");
        return elem as Node;
      },
    };
  },
};
const sidenav = page.getElem("hicks-sidenav").elem as HicksSidenav;
const hamburger = page.getElem("hicks-hamburger").elem as HicksHamburger;

page.getElem("#sidenav-button").listen((e) => {
  sidenav.open();
});

sidenav.addEventListener("toggled", (event: CustomEvent) => {
  hamburger.setAttribute("toggled", event.detail);
});
