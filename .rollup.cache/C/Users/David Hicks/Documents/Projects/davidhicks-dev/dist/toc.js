/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { __decorate } from "tslib";
import { query, querySelectorAll } from "@github/query-selector";
import { html, property } from "lit-element";
import { BaseStateElement } from "./state";
/**
 * Element that renders table of contents.
 * @extends {BaseStateElement}
 * @final
 */
export class TableOfContents extends BaseStateElement {
    constructor() {
        super();
        this.linkList = [];
        this.scrollSpy = this.scrollSpy.bind(this);
        this.tocActiveClass = "w-toc__active";
        this.tocBorderClass = "w-toc__border";
        this.tocVisibleClass = "w-toc__visible";
    }
    open() {
        var _a;
        (_a = !this.classList.contains("w-toc__open")) !== null && _a !== void 0 ? _a : this.classList.add("w-toc__open");
    }
    close() {
        var _a;
        (_a = !this.classList.contains("w-toc__open")) !== null && _a !== void 0 ? _a : this.classList.remove("w-toc__open");
    }
    connectedCallback() {
        // This sets initial global state before subscribing to the store.
        // If we didn't do this then `this.opened` would always be set to false
        // because onStateChanged runs synchronously after we call
        // super.connectedCallback();
        if (this.hasAttribute("opened")) {
            this.open();
        }
        super.connectedCallback();
        this.articleContent = this.closest("main");
        if (!this.articleContent) {
            console.warn(`Article container not found.`);
            return;
        }
        this.headings = querySelectorAll(this.articleContent, "h1[id], h2[id], h3[id]");
        this.observer = new IntersectionObserver(this.scrollSpy, {
            rootMargin: "0px 0px -80% 0px",
        });
        this.headings.forEach((heading) => {
            this.linkList.push(this.makeLinks(heading));
            this.observer.observe(heading);
        });
    }
    makeLinks(heading) {
        return html `<li>
      <a class="w-toc__link" href="#${heading.id}">${heading.innerText}</a>
    </li>`;
    }
    render() {
        return html `
      <div class="w-toc__label">
        <span>In this article</span>
        <button
          class="w-button w-button--secondary w-button--icon"
          aria-label="Close Table of Contents"
          @click="${() => this.close()}"
        >
          x
        </button>
      </div>
      <div class="w-toc__content">
        <h2 class="w-toc__header">
          <a href="#first-input-delay-(fid)" class="w-toc__header--link"
            >First Input Delay (FID)</a
          >
        </h2>
        <div class="w-toc__list">
          <ul>
            ${this.linkList}
          </ul>
        </div>
      </div>
    `;
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.close();
        this.observer.disconnect();
    }
    onStateChanged(isOpened) {
        this.opened = isOpened;
    }
    scrollSpy(headings) {
        var _a, _b;
        const links = new Map([...querySelectorAll(document, "a", HTMLAnchorElement)].map((l) => [
            l.getAttribute("href"),
            l,
        ]));
        for (const heading of headings) {
            const href = `#${heading.target.getAttribute("id")}`;
            const link = links.get(href);
            if (link) {
                if (heading.intersectionRatio > 0) {
                    link.classList.add(this.tocVisibleClass);
                    this.previouslyActiveHeading = heading.target.getAttribute("id");
                }
                else {
                    link.classList.remove(this.tocVisibleClass);
                }
            }
            const firstVisibleLink = this.querySelector(`.${this.tocVisibleClass}`);
            links.forEach((link) => {
                var _a;
                link.classList.remove(this.tocActiveClass, this.tocVisibleClass);
                (_a = link.parentElement) === null || _a === void 0 ? void 0 : _a.classList.remove(this.tocBorderClass);
            });
            if (firstVisibleLink) {
                firstVisibleLink.classList.add(this.tocActiveClass);
                (_a = firstVisibleLink.parentElement) === null || _a === void 0 ? void 0 : _a.classList.add(this.tocBorderClass);
            }
            if (!firstVisibleLink && this.previouslyActiveHeading) {
                const last = query(document, `a[href="#${this.previouslyActiveHeading}"]`);
                last === null || last === void 0 ? void 0 : last.classList.add(this.tocActiveClass);
                (_b = last === null || last === void 0 ? void 0 : last.parentElement) === null || _b === void 0 ? void 0 : _b.classList.add(this.tocBorderClass);
            }
        }
    }
}
__decorate([
    property({ type: Object })
], TableOfContents.prototype, "articleContent", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], TableOfContents.prototype, "opened", void 0);
customElements.define("hicks-toc", TableOfContents);
//# sourceMappingURL=toc.js.map