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

import { query, querySelectorAll } from "@github/query-selector";
import { html } from "lit";
import { BaseStateElement } from "../state";
import { property, customElement } from "lit/decorators.js";

/**
 * Element that renders table of contents.
 * @extends {BaseStateElement}
 * @final
 */
@customElement("hicks-toc")
export class TableOfContents extends BaseStateElement {
  tocActiveClass: string;
  tocBorderClass: string;
  tocVisibleClass: string;
  tocHTML!: any;
  @property({ type: Object }) articleContent!: HTMLElement | null;
  @property({ type: Boolean, reflect: true }) opened!: boolean | true;

  headings!: HTMLHeadingElement[];
  observer!: IntersectionObserver;
  previouslyActiveHeading: any;
  linkList = [] as any;

  constructor() {
    super();
    this.scrollSpy = this.scrollSpy.bind(this);
    this.tocActiveClass = "is-active";
    this.tocBorderClass = "is-bordered";
    this.tocVisibleClass = "is-visible";
  }

  open() {
    !this.classList.contains("is-open") ?? this.classList.add("is-open");
  }

  close() {
    !this.classList.contains("is-open") ?? this.classList.remove("is-open");
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
    setTimeout(() => this.requestUpdate(), 200);
  }
  firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);
    this.articleContent = this.closest("main");

    if (!this.articleContent) {
      console.warn(`Article container not found.`);
      return;
    }
    this.headings = querySelectorAll(
      this.articleContent,
      "h1[id], h2[id], h3[id]"
    );
    this.observer = new IntersectionObserver(this.scrollSpy, {
      rootMargin: "0px 0px -80% 0px",
    });
    this.headings.forEach((heading: HTMLHeadingElement) => {
      this.observer.observe(heading);
    });
  }
  makeLinks = (headings: HTMLHeadingElement[]) =>
    headings?.map(
      (heading) => html`<li>
        <a class="toc__link" href="#${heading.id}">${heading.innerText}</a>
      </li>`
    );

  render() {
    return html`
      <section class="toc">
        <div class="toc__label">
          <span>In this article</span>
          <button
            class="w-button w-button--secondary w-button--icon"
            aria-label="Close Table of Contents"
            @click="${() => this.close()}"
          >
            x
          </button>
        </div>
        <div class="toc__content">
          <h2 class="toc__header">
            <a href="#first-input-delay-(fid)" class="toc__header__link"
              >First Input Delay (FID)</a
            >
          </h2>
          <div class="toc__list">
            <ul>
              ${this.makeLinks(this.headings)}
            </ul>
          </div>
        </div>
      </section>
    `;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.close();
    this.observer.disconnect();
  }

  onStateChanged(isOpened: boolean) {
    this.opened = isOpened;
  }

  scrollSpy(headings: IntersectionObserverEntry[]) {
    const links = new Map(
      [...querySelectorAll(document, "a", HTMLAnchorElement)].map((l) => [
        l.getAttribute("href"),
        l,
      ])
    );

    for (const heading of headings) {
      const href = `#${heading.target.getAttribute("id")}`;
      const link = links.get(href);

      if (link) {
        if (heading.intersectionRatio > 0) {
          link.classList.add(this.tocVisibleClass);
          this.previouslyActiveHeading = heading.target.getAttribute("id");
        } else {
          link.classList.remove(this.tocVisibleClass);
        }
      }

      const firstVisibleLink = this.querySelector(`.${this.tocVisibleClass}`);

      links.forEach((link: HTMLAnchorElement) => {
        link.classList.remove(this.tocActiveClass, this.tocVisibleClass);
        link.parentElement?.classList.remove(this.tocBorderClass);
      });

      if (firstVisibleLink) {
        firstVisibleLink.classList.add(this.tocActiveClass);
        firstVisibleLink.parentElement?.classList.add(this.tocBorderClass);
      }

      if (!firstVisibleLink && this.previouslyActiveHeading) {
        const last = query(
          document,
          `a[href="#${this.previouslyActiveHeading}"]`
        );
        last?.classList.add(this.tocActiveClass);
        last?.parentElement?.classList.add(this.tocBorderClass);
      }
    }
  }
}
