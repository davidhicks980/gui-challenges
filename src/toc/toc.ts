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

import { querySelectorAll } from '@github/query-selector';
import { css, html, LitElement } from 'lit';
import { property, customElement, query, queryAll } from 'lit/decorators.js';
import '@material/mwc-icon-button';
import { IconController } from '../icons/icon.controller';
/**
 * Element that renders table of contents.
 * @extends {BaseStateElement}
 * @final
 */
@customElement('hicks-toc')
export class TableOfContents extends LitElement {
  @query('.is-active')
  activeLink: HTMLAnchorElement;
  @queryAll('.is-active')
  links: NodeListOf<HTMLAnchorElement>;
  @query('h1[id]')
  contentTitle: HTMLHeadingElement;
  activeClass: string;
  borderClass: string;
  tocVisibleClass: string;
  tocHTML!: any;
  @property({ type: Object }) articleContent!: HTMLElement | null;
  @property({ type: Boolean, reflect: true }) opened = true;
  headings!: HTMLHeadingElement[];
  observer!: IntersectionObserver;
  previousOffset: number = 0;
  activeHeadings: Set<string>;
  icons: IconController;
  constructor() {
    super();
    this.scrollSpy = this.scrollSpy.bind(this);
    this.activeClass = 'is-active';
    this.borderClass = 'is-bordered';
    this.icons = new IconController(this, 'openBook');
  }

  toggle() {
    this.opened = !this.opened;
    this.icons.name = this.opened ? 'close' : 'openBook';
  }

  close() {
    this.opened = false;
  }
  open() {
    this.opened = true;
  }
  connectedCallback() {
    // This sets initial global state before subscribing to the store.
    // If we didn't do this then `this.opened` would always be set to false
    // because onStateChanged runs synchronously after we call
    // super.connectedCallback();

    super.connectedCallback();
    this.opened = true;
  }
  firstUpdated(changedProperties) {
    super.firstUpdated(changedProperties);
    this.articleContent = this.closest('main');

    if (!this.articleContent) {
      console.warn(`Article container not found.`);
    }
    this.headings = querySelectorAll(this.articleContent, 'h2[id], h3[id]');
    this.previousOffset = this.articleContent.getBoundingClientRect().top;
    this.observer = new IntersectionObserver(this.scrollSpy, {
      rootMargin: '0px 0px -40% 0px',
    });

    this.headings.forEach((heading: HTMLHeadingElement, i) => {
      heading.dataset.tocIndex = i.toString();
      this.observer.observe(heading);
    });
    window.addEventListener(
      'hashchange',
      (e) => {
        const removeLinks = () =>
          this.links.forEach((link) => link.classList.remove('is-active'));
        setTimeout(() => {
          removeLinks();
          this._selectLink(window.location.hash.slice(1)).activate();
        }, 30);
      },
      { passive: true }
    );
  }
  makeLinks = (headings: HTMLHeadingElement[]) => {
    return headings?.map(
      (heading: HTMLHeadingElement) =>
        html`<li class="list__item">
          <a
            data-toc-index="${heading.dataset.tocIndex}"
            class="list__item__link"
            style="--list-item-padding: ${`${
              Number(heading.tagName[1]) - 1
            }em`}"
            href="#${heading.id}"
            >${heading.innerText}</a
          >
        </li>`
    );
  };

  scrollDirFrom = (previousOffset: number) => {
    const currentOffset = this.articleContent.getBoundingClientRect().top;
    const sign = Math.sign(currentOffset - previousOffset);
    this.previousOffset = currentOffset;
    return sign;
  };

  scrollSpy(headings: IntersectionObserverEntry[]) {
    const lastIndex = this.activeLink?.dataset?.tocIndex;
    if (lastIndex === undefined) {
      this.activeHeadings = new Set(
        headings.map((heading) => heading.target.id).values()
      );
      this._selectActiveHeader(headings);
      return;
    }
    const { isIntersecting, target } = headings[0];
    const index = parseInt(lastIndex);
    const isScrollingDown = this.scrollDirFrom(this.previousOffset) < 0;
    const triggerHeader = this._selectLink(target.id);
    const triggerIndex = parseInt((target as HTMLElement).dataset.tocIndex);
    if (isIntersecting === false) {
      return this._selectClosestVisibleHeader(target);
    } else {
      this.activeHeadings.add(target.id);
    }
    if (triggerHeader) {
      const isSectionLarger = triggerIndex > index;
      this.activeLink.classList.remove('is-active');
      if (isScrollingDown) {
        if (isSectionLarger) {
          triggerHeader.activate();
        }
      } else if (!isSectionLarger) {
        triggerHeader.activate();
      }
    }
  }

  private _selectClosestVisibleHeader(target: Element) {
    this.activeHeadings.delete(target.id);

    if (this.activeHeadings.size > 0) {
      this.links.forEach((el) => el.classList.remove('is-active'));
      const selector = this.activeHeadings.values().next().value;
      this._selectLink(selector)?.activate();
      return true;
    }
    return false;
  }

  private _selectLink(selector: string) {
    const link = this.shadowRoot.querySelector(`a[href="#${selector}"]`);
    return {
      activate: () => {
        link != null ? link.classList.add('is-active') : null;
      },
      deactivate: () => {
        link != null ? link.classList.remove('is-active') : null;
      },
    };
  }
  private _selectActiveHeader(headings: IntersectionObserverEntry[]) {
    const midPoint = headings[0].rootBounds.height / 2;
    let min = Number.MAX_SAFE_INTEGER;
    let max = Number.MIN_VALUE;
    let larger = false;
    let bounds = headings.reduce((acc, curr) => {
      let { boundingClientRect: bounds, isIntersecting, target } = curr;
      if (isIntersecting) {
        let y = Math.floor(bounds.y);
        larger = y > midPoint;
        min = y < min ? y : min;
        max = y > max ? y : max;
        acc.set(y, target.id);
      }
      return acc;
    }, new Map());
    const selector = larger ? bounds.get(min) : bounds.get(max);
    const queryRes = this._selectLink(selector);
    queryRes.activate();
  }
  render() {
    const headerLink = this.contentTitle?.innerText.toLowerCase().trim();
    return html`
      <section class="toc__container">
        <div class="toc__head">
          <mwc-icon-button @click="${this.toggle}"
            >${this.icons.icon('--gr-8', '--blue3')}</mwc-icon-button
          >

          <div class="toc__label">
            <span>In this article</span>
          </div>
        </div>

        <div class="toc__content">
          <h2 class="toc__header">
            <a href="#${headerLink}" class="toc__header__link"
              >${this.contentTitle}</a
            >
          </h2>
          <div>
            <ul class="list">
              ${this.makeLinks(this.headings)}
            </ul>
          </div>
        </div>
      </section>
    `;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.observer.disconnect();
  }

  static get styles() {
    return css`
      :host([opened]) .toc__head {
        display: flex;
        flex-direction: row;
      }
      :host([opened]) .toc__container {
        background-color: white;

        padding: 24px 0;
        top: 63px;
        z-index: 100;
        width: 200px;
        position: sticky;
      }

      .toc__border {
        margin-left: -24px;
        padding-left: 21px;
      }
      .toc__content {
        height: calc(100% - 24px);
        overflow-y: auto;
        padding: 0 24px;
      }
      .toc__content__link-icon {
        vertical-align: middle;
      }
      .toc__header {
        margin-bottom: 12px;
        margin-top: 12px;
      }
      .toc__header__link {
        font-size: 1.4rem;
        font-weight: 500;
        appearance: none;
      }

      .toc__header__link:hover {
        color: var(--orange-8);
      }
      .toc__label {
        font-size: 1.4rem;
      }

      .toc__head {
        display: flex;
        flex-direction: row;
        align-items: center;
      }
      .list {
        --list-item-padding: 0%;
        margin-left: 30px;
        padding: 0;
        list-style-type: none;
        margin-block: 0px;
        padding-inline: 0px;
        border-left: 3px solid var(--blue4);
        display: grid;
      }

      .list__item {
        list-style-type: none;
        margin: 0.5rem 0px;
      }
      .list__item__link {
        font-size: 0.8rem;
        margin-left: var(--list-item-padding);
        color: gray;
        text-decoration: none;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .list__item__link.is-active {
        color: var(--blue9);
        font-weight: 500;
      }

      .list__item.is-bordered {
        border: 2px dotted blue;
      }
    `;
  }
}
