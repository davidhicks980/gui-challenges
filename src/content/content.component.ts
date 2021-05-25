import { html, LitElement, TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
const testFile = {
  section: "Home",
  subcontent: [
    {
      section: "Projects",
      content: html`<p class="body-1">
        Take a look at some of the projects I've been working on over the past
        few months
      </p> `,
      subcontent: [
        { section: "Section 1-1", subcontent: [], content: html`About my ` },
      ],
    },
    {
      section: "Interests",
      content: html``,
      subcontent: [{ section: "Section 1-1", subcontent: [], content: html`` }],
    },
    {
      section: "Resume",
      content: html``,
      subcontent: [{ section: "Section 1-1", subcontent: [], content: html`` }],
    },
  ],
};

const linkIcon = () => html`<svg
  xmlns="http://www.w3.org/2000/svg"
  height="24px"
  viewBox="0 0 24 24"
  width="24px"
  fill="gray"
>
  <path d="M0 0h24v24H0V0z" fill="none" />
  <path
    d="M17 7h-4v2h4c1.65 0 3 1.35 3 3s-1.35 3-3 3h-4v2h4c2.76 0 5-2.24 5-5s-2.24-5-5-5zm-6 8H7c-1.65 0-3-1.35-3-3s1.35-3 3-3h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-2zm-3-4h8v2H8z"
  />
</svg>`;

const tags = (content, link, level: number) => {
  let innerContent = html`${content}${link}`;
  let id = content + level;
  const vals = {
    h1: () => html`<h1 id="${id}">${innerContent}</h1>`,
    h2: () => html`<h2 id="${id}">${innerContent}</h2>`,
    h3: () => html`<h3 id="${id}">${innerContent}</h3>`,
    h4: () => html`<h4 id="${id}">${innerContent}</h4>`,
    h5: () => html`<h5 id="${id}">${innerContent}</h5>`,
    h6: () => html`<h6 id="${id}">${innerContent}</h6>`,
  };
  return vals["h" + level];
};

@customElement("content-component")
export class ContentComponent extends LitElement {
  @property()
  file: string = "";

  createRenderRoot() {
    // Disable shadow DOM.
    // Instead templates will be rendered in the light DOM.
    return this;
  }
  @property({ type: String })
  section: string = "home";

  content = [] as string[];

  parseFile(
    file: { section: string; content: TemplateResult; subcontent: any[] },
    level = 1
  ) {
    if (typeof level != "number" || level < 1 || level > 7)
      return ["[err: too many headers]"];
    ///////////////////////////////////
    const { section, subcontent, content } = file;
    ////////////////////
    if (section) {
      let link = html`<a
        href="#${section.toLowerCase().replace(" ", "_")}"
        class="toc__content__link-icon"
        >${linkIcon()}</a
      >`;
      this.content.push(tags(section, link, level)());
    }
    if (content) this.content.push(content);
    if (!Array.isArray(file.subcontent || !file.subcontent.length)) return;
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
    return html`<div>${this.parseFile(testFile)}</div>`;
  }
}
