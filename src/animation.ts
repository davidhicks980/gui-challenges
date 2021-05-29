import { LitElement, html, css } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import anime from 'animejs';

@customElement('background-animation')
export class BackgroundAnimation extends LitElement {
  @query('.background-animation__sticky')
  container;
  @query('.polymorph')
  polymorph;
  constructor() {
    super();
  }
  connectedCallback() {
    super.connectedCallback();
  }
  firstUpdated(_changedProperties) {
    this.createAnimation();
  }
  createAnimation() {
    let ret = anime({
      targets: this.polymorph,
      d: [
        {
          value:
            'M720, 0 H0 V 300 c 144, 0, 216 -72, 360 -72 s 216, 72, 360, 72, 216 -72, 360 -72, 216, 72, 360, 72V0Z',
        },
        {
          value:
            'M720, 0 H0 V 300 c 144 0, 216 0, 360 0 s 216 0, 360 0, 216 0, 360 0, 216 0, 360 0 V0Z',
        },
      ],
      easing: 'linear',
      duration: 5000,
      loop: false,
      autoplay: false,
    });

    let cb = (entry: IntersectionObserverEntry[]) => {
      ret.seek((1 - (entry[0].intersectionRatio - 0.4)) * ret.duration);
    };

    let spacedArr = (len) => {
      let arr = [],
        i = 0;
      for (i; i < len; i++) {
        arr.push(i / 100);
      }
      return arr;
    };
    console.log(spacedArr(100));
    let options = {
      root: document,
      rootMargin: '0px',
      threshold: spacedArr(100),
    };
    let animationObserver = new IntersectionObserver(cb, options);
    animationObserver.observe(this.container);
  }
  createRenderRoot() {
    return this;
  }
  render() {
    return html`
      <!--Top blue portion-->

      <div
        style="display: flex;
  position: sticky;
      align-items: flex-end;
  top: -55vh; 
     background-image: linear-gradient(#2e3293 80%, #00000000 81%);
  height: 70vh;
  width: 100%"
        class="background-animation__sticky"
      >
        <div style="position: absolute"><slot name="header"></slot></div>

        <svg
          style="
  position: sticky;
  top: 0px;

  display: flex;
  align-items: center;
  justify-content: space-between;


"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 1440 330"
          class="dark-blue"
        >
          <defs>
            <style>
              .cls-1 {
                fill: url(#linear-gradient);
                filter: url(#shadow);
              }
            </style>
            <filter id="shadow" x="0" y="0" width="200%" height="200%">
              <feDropShadow
                dx="5"
                dy="5"
                stdDeviation="5"
                flood-color="#8b8b8b"
                flood-opacity="1"
              />
            </filter>
            <linearGradient
              id="linear-gradient"
              x1="720"
              y1="576"
              x2="720"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.08" stop-color="#0043aa" />
              <stop offset="0.39" stop-color="#0342a9" />
              <stop offset="0.6" stop-color="#0c3ea4" />
              <stop offset="0.78" stop-color="#1a399c" />
              <stop offset="0.93" stop-color="#2e3192" />
            </linearGradient>
          </defs>
          <g id="Layer_2" data-name="Layer 2">
            <g id="Layer_1-2" data-name="Layer 1">
              <!--If you are reading this: this was a pain to figure out (esp for someone who doesn't usually work with SVG). After the c character in the path, the formatting is as follows: x1 y1, x2 y2, x y. The c stands for 'curve'... I think. In this equation x y is the point, and x1y1 / x2y2 is the line representing the slope of the point. I wish we could just specify the slope, but alas not yet. David 05/29/2021 -->
              <path
                class="cls-1 polymorph"
                d="M720,0H0V300c144,0,216-72,360-72s216,72,360,72,216-72,360-72,216,72,360,72V0Z"
              />
            </g>
          </g>
        </svg>
      </div>
    `;
  }
}
