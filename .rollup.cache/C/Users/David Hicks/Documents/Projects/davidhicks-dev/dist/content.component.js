import { __decorate, __metadata } from "tslib";
import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
const testFile = {
    section: "Home",
    subcontent: [
        {
            section: "_projects",
            content: html `<p class="body-1">
        Take a look at some of the projects I've been working on over the past
        few months
      </p> `,
            subcontent: [
                { section: "Section 1-1", subcontent: [], content: html `About my ` },
            ],
        },
        {
            section: "_interests",
            content: html ``,
            subcontent: [{ section: "Section 1-1", subcontent: [], content: html `` }],
        },
        {
            section: "_resume",
            content: html ``,
            subcontent: [{ section: "Section 1-1", subcontent: [], content: html `` }],
        },
    ],
};
const tags = (content, link, level) => {
    let innerContent = html `${content}${link}`;
    let id = content + level;
    const vals = {
        h1: () => html `<h1 id="${id}">${innerContent}</h1>`,
        h2: () => html `<h2 id="${id}">${innerContent}</h2>`,
        h3: () => html `<h3 id="${id}">${innerContent}</h3>`,
        h4: () => html `<h4 id="${id}">${innerContent}</h4>`,
        h5: () => html `<h5 id="${id}">${innerContent}</h5>`,
        h6: () => html `<h6 id="${id}">${innerContent}</h6>`,
    };
    return vals["h" + level];
};
let ContentComponent = class ContentComponent extends LitElement {
    constructor() {
        super(...arguments);
        this.file = "";
        this.section = "home";
        this.content = [];
    }
    createRenderRoot() {
        // Disable shadow DOM.
        // Instead templates will be rendered in the light DOM.
        return this;
    }
    parseFile(file, level = 1) {
        if (typeof level != "number" || level < 1 || level > 7)
            return ["[err: too many headers]"];
        ///////////////////////////////////
        const { section, subcontent, content } = file;
        ////////////////////
        if (section) {
            let link = html `<a
        href="#${section.toLowerCase().replace(" ", "_")}"
      ></a>`;
            this.content.push(tags(section, link, level)());
        }
        if (content)
            this.content.push(content);
        if (!Array.isArray(file.subcontent || !file.subcontent.length))
            return;
        else
            subcontent.forEach((item) => {
                this.parseFile(item, level + 1);
            });
        return this.content;
    }
    connectedCallback() {
        super.connectedCallback();
    }
    render() {
        return html `<div>${this.parseFile(testFile)}</div>`;
    }
};
__decorate([
    property(),
    __metadata("design:type", String)
], ContentComponent.prototype, "file", void 0);
__decorate([
    property({ type: String }),
    __metadata("design:type", String)
], ContentComponent.prototype, "section", void 0);
ContentComponent = __decorate([
    customElement("content-component")
], ContentComponent);
export { ContentComponent };
//# sourceMappingURL=content.component.js.map