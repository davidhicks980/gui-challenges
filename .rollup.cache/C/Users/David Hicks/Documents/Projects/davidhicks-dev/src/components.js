import "./sidenav.component";
import "./menu.component";
import "./button.component";
let hamtoggled;
const page = {
    getElem: function (selector) {
        const elem = document.querySelector(selector);
        return {
            elem,
            listen: (cb) => {
                elem
                    ? elem.addEventListener("click", cb)
                    : console.error("[ERROR] Element does not exist");
                return elem;
            },
        };
    },
};
const sidenav = page.getElem("hicks-sidenav").elem;
const hamburger = page.getElem("hicks-hamburger").elem;
page.getElem("#sidenav-button").listen((e) => {
    sidenav.open();
});
sidenav.addEventListener("toggled", (event) => {
    hamburger.setAttribute("toggled", event.detail);
});
//# sourceMappingURL=components.js.map