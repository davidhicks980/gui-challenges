import { LitElement, html, css, nothing } from 'lit';
import {
  customElement,
  property,
  query,
  queryAssignedNodes,
  queryAsync,
  state,
} from 'lit/decorators.js';
import { IconController } from './icons/icon.controller';
import { isFilledArray } from './util/func';
import '@material/mwc-icon-button';
import { flip } from '@lit-labs/motion';

@customElement('hicks-nav')
export class NavComponent extends LitElement {
  @queryAssignedNodes('', true, 'hicks-nav-item')
  navItems: NodeListOf<NavItemComponent>;
  @query('ul')
  navList: HTMLUListElement;
  @property({ type: String, reflect: true })
  primary = '--blue4';
  @property()
  secondary = '--blue8';
  @property({ type: Boolean, reflect: true })
  opened = true;
  icons = new IconController(this, 'close');
  @property({ type: Boolean, reflect: true })
  transitioning = false;
  constructor() {
    super();
  }
  firstUpdated(_changedProperties) {}
  handleSlotChange(e) {
    if (isFilledArray(this.navItems)) {
      this.navItems.forEach((item: NavItemComponent) => {
        if (item.hasAttribute('primary') && item.hasAttribute('secondary')) {
          item.primary = this.primary || '';
          item.secondary = this.secondary || '';
        }
      });
    }
  }
  handleNavigate(e) {
    this.navItems.forEach((item) => (item.selected = false));
    (e.target as NavItemComponent).selected = true;
  }
  handleClick(e) {
    this.opened = !this.opened;
    this.icons.name = this.opened ? 'close' : 'menu';
    this.navItems.forEach((item) => (item.full = this.opened));
    let event = new CustomEvent(this.opened ? 'opened' : 'closed');
    this.dispatchEvent(event);
  }

  changeStyle(complete: boolean) {
    this.navList.style.backgroundColor =
      complete && !this.opened
        ? 'var(--gr-8)'
        : !this.opened
        ? 'var(--gr-8'
        : 'transparent';
  }
  render() {
    return html` <ul
      class="navigation"
      role="navigation"
      aria-labelledby="top-navigation"
    >
      <div class="navigation__header-wrapper">
        <h2 ${flip()} id="top-navigation" class="navigation__header">
          <slot name="header"></slot>
        </h2>

        <div
          ${flip({
            animationOptions: {
              easing: 'cubic-bezier(0.57, 0.04, 0.35, 0.88)',
              duration: 500,
            },
            onComplete: () => {
              {
                this.changeStyle(true);
                this.classList.remove('transitioning');
              }
            },
            onStart: () => {
              this.classList.add('transitioning');
              this.changeStyle(false);
            },
          })}
          class="navigation__icon"
        >
          <mwc-icon-button
            @click="${this.handleClick}"
            class="navigation__button"
          >
            ${this.icons.icon(this.primary, this.secondary)}
          </mwc-icon-button>
        </div>
      </div>

      <slot
        @navigate="${this.handleNavigate}"
        @slotchange="${this.handleSlotChange}"
      ></slot>
    </ul>`;
  }
  static get styles() {
    return css`
      :host {
        --background-color: rgba(80, 80, 80, 1);
        --sidenav-width: 250px;
        --sidenav: 200px;
      }
      :host .navigation {
        transition-duration: 0.5s;
        transition-property: transform;
        --sidenav-width: 3.5rem;
      }
      :host([opened]) .navigation {
        --sidenav-width: 200px;
      }
      .navigation {
        list-style-type: none;
        margin-block: 0px;
        padding-inline: 0px;
        list-style-type: none;
        border: 1px dotted var(--gr-5);
        padding-inline: 0px;
        background-color: var(--background-color);
        box-shadow: inner 0px 0px 4px 1px black;
        height: 100%;
        width: var(--sidenav-width);
        position: relative;
      }

      .navigation__header {
        font-family: var(--header-font);
        font-size: 62;
        font-weight: 600;
        opacity: 0;
        margin-block: 0px;
        display: none;
        transform: opacity 0.5s ease;
      }
      :host(.transitioning) .navigation__header {
        margin: 0 -1rem;
      }
      :host([opened]) .navigation__header {
        opacity: 1;
        color: white;
        z-index: 1;
        display: inline;
        margin: 0 1rem;
      }

      :host .navigation__header-wrapper {
        display: flex;
        flex-direction: row;
        height: 3.25rem;
        align-items: center;
        flex-wrap: nowrap;
        justify-content: center;
      }
      :host([opened]) .navigation__header-wrapper {
        display: flex;
        flex-direction: row;
        height: 3.25rem;
        align-items: center;
        flex-wrap: nowrap;
        justify-content: space-between;
      }

      .navigation__icon {
        margin: 0 1rem;
        color: white;
        position: relative;
      }

      :host([opened]) .navigation::before {
        transform: scaleX(1);
        transition: transform 0.5s cubic-bezier(0.57, 0.04, 0.35, 0.88);
        opacity: 1;
        width: var(--sidenav-small);
      }
      :host .navigation::before {
        --sidenav-small: 200px;
        content: '';
        width: var(--sidenav-small);
        left: 0px;
        bottom: 0px;
        height: 100%;
        position: absolute;
        background-color: var(--background-color);
        transform: scaleX(0.2);
        transform-origin: left;
        transition: transform 0.5s cubic-bezier(0.57, 0.04, 0.35, 0.88);
      }
    `;
  }
}

@customElement('hicks-nav-item')
export class NavItemComponent extends LitElement {
  @queryAssignedNodes('', true)
  slot;
  private iconControl = new IconController(this, 'blue');
  @state()
  slotValue: string = '';

  @state()
  linkName: string = '';
  @state()
  iconName: string = '';
  @property({ reflect: true })
  link = '';
  @property({ reflect: true })
  icon = '';
  @property({ reflect: true })
  primary = '';
  @property({ reflect: true })
  secondary = '';
  @property({ type: Boolean, reflect: true })
  selected = false;
  @property({ type: Boolean, reflect: true })
  full: boolean = true;

  constructor() {
    super();
  }
  slotChangedCallback(e) {
    this.slotValue = isFilledArray(this.slot) ? this.slot[0].wholeText : '';
    this.requestUpdate();
  }

  updated(changedProperties) {
    if (
      changedProperties.has('link') ||
      changedProperties.has('icon') ||
      changedProperties.has('slotValue')
    ) {
      console.log(changedProperties);
      this.handleElementNomenclature();
    }
  }
  handleElementNomenclature() {
    let altVal = this.slotValue.toLowerCase().trim();
    this.iconControl.name = this.icon.length > 0 ? this.icon : altVal;
    this.linkName = this.link.length > 0 ? this.link : altVal;
  }

  emitNavigation() {
    this.dispatchEvent(new CustomEvent('navigate', { bubbles: true }));
  }

  render() {
    return html`
      <li class="item">
        <a
          @click="${this.emitNavigation}"
          class="item__link"
          href="#${this.linkName}"
        >
          <span class="item__link__layout">
            <span class="item__link__icon">
              ${this.iconControl.icon(this.primary, this.secondary)}</span
            >

            <span class="item__link__text"
              ><slot @slotchange="${this.slotChangedCallback}"> </slot
            ></span>
          </span>
        </a>
      </li>
    `;
  }
  static get styles() {
    return css`
      :host([full]) .item__link__layout {
        display: flex;
        flex-direction: row;
        column-gap: 0.5rem;
        align-items: center;
        overflow: hidden;
        flex-wrap: nowrap;
      }
      :host([full]) .item {
        display: absolute;
        width: 250px;
      }
      :host([full]) .item__link__text {
        color: rgba(255, 255, 255, 1);
        color: white;
        transition: color 0.5s ease;
      }
      .item {
        transition: transform 0.5s ease;
        width: 50px;
        overflow: hidden;
        white-space: nowrap;
        left: 0px;
      }
      .item__link__text {
        transition: color 0.5s ease;
        color: rgba(255, 255, 255, 0);
      }
      :host([selected]) .item__link__layout {
        font-weight: 600;
        color: var(--gray-1);
      }
      :host([selected]) .item__link__layout:hover {
        font-weight: 600;
      }
      .item__link {
        height: fit-content;
        width: 100%;
        color: var(--gray-1);
        text-decoration: none;
        display: flex;
        padding: 0.75rem 0;
        position: sticky;
        left: 0px;
      }
      .item__link:hover {
        height: fit-content;
        width: 100%;
        color: var(--gray-3);
        text-decoration: none;
        display: block;
      }
      .item__link__icon {
        padding: 0rem 1rem;
      }

      .item:active {
        color: black;
      }

      .item:hover {
        background-color: rgba(0, 0, 0, 0.1);
      }
    `;
  }
}
