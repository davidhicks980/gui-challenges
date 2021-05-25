import { html, TemplateResult } from "lit";

const _icons = {
  code: (primary: string, secondary: string) => html`<svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 0 24 24"
    width="24px"
    fill="#000000"
  >
    <style>
      .primary {
        fill: var(${primary});
      }

      .secondary {
        fill: var(${secondary});
      }
    </style>
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path
      class="primary"
      d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"
    />
  </svg>`,
  interests: (primary: string, secondary: string) => html`<svg
    xmlns="http://www.w3.org/2000/svg"
    height="24px"
    viewBox="0 0 24 24"
    width="24px"
    fill="#000000"
  >
    <style>
      .primary {
        fill: var(${primary});
      }
      .secondary {
        fill: var(${secondary});
      }
    </style>
    <path d="M0 0h24v24H0V0z" fill="none" />
    <path
      class="secondary"
      d="M19.47 9.16c-1.1-2.87-3.8-4.95-7.01-5.14l2 4.71 5.01.43zm-7.93-5.14c-3.22.18-5.92 2.27-7.02 5.15l5.02-.43 2-4.72zm-7.31 6.12C4.08 10.74 4 11.36 4 12c0 2.48 1.14 4.7 2.91 6.17l1.11-4.75-3.79-3.28zm15.54-.01l-3.79 3.28 1.1 4.76C18.86 16.7 20 14.48 20 12c0-.64-.09-1.27-.23-1.87zM7.84 18.82c1.21.74 2.63 1.18 4.15 1.18 1.53 0 2.95-.44 4.17-1.18L12 16.31l-4.16 2.51z"
    />
    <path
      class="primary"
      d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm7.48 7.16l-5.01-.43-2-4.71c3.21.19 5.91 2.27 7.01 5.14zM12 8.06l1.09 2.56 2.78.24-2.11 1.83.63 2.73L12 13.98l-2.39 1.44.63-2.72-2.11-1.83 2.78-.24L12 8.06zm-.46-4.04l-2 4.72-5.02.43c1.1-2.88 3.8-4.97 7.02-5.15zM4 12c0-.64.08-1.26.23-1.86l3.79 3.28-1.11 4.75C5.14 16.7 4 14.48 4 12zm7.99 8c-1.52 0-2.94-.44-4.15-1.18L12 16.31l4.16 2.51c-1.22.74-2.64 1.18-4.17 1.18zm5.1-1.83l-1.1-4.76 3.79-3.28c.13.6.22 1.23.22 1.87 0 2.48-1.14 4.7-2.91 6.17z"
    />
  </svg>`,
  resume: (primary: string, secondary: string) => html`<svg
    xmlns="http://www.w3.org/2000/svg"
    enable-background="new 0 0 24 24"
    height="24px"
    viewBox="0 0 24 24"
    width="24px"
    class="primary"
  >
    <style>
      .primary {
        fill: var(${primary});
      }
      .secondary {
        fill: var(${secondary});
      }
    </style>
    <g>
      <rect fill="none" height="24" width="24" y="0" />
      <path
        d="M5,5v14h14V5H5z M14,17H7v-2h7V17z M17,13H7v-2h10V13z M17,9H7V7h10V9z"
        class="secondary"
      />
      <path
        class="primary"
        d="M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M19,19H5V5h14V19z M17,13H7v-2h10 V13z M17,9H7V7h10V9z M14,17H7v-2h7V17z"
      />
    </g>
  </svg>`,
  cottage: (primary: string, secondary: string) => html`<svg
    xmlns="http://www.w3.org/2000/svg"
    enable-background="new 0 0 24 24"
    height="24px"
    viewBox="0 0 24 24"
    width="24px"
    fill="primary"
  >
    <style>
      .primary {
        fill: var(${primary});
      }
      .secondary {
        fill: var(${secondary});
      }
    </style>
    <rect fill="none" height="24" width="24" />
    <polygon
      class="secondary"
      points="18,19 13,19 13,15 11,15 11,19 6,19 6,10.1 12,5.52 18,10.1"
    />
    <path
      class="primary"
      d="M12,3L6,7.58V6H4v3.11L1,11.4l1.21,1.59L4,11.62V21h16v-9.38l1.79,1.36L23,11.4L12,3z M18,19h-5v-4h-2v4H6v-8.9l6-4.58 l6,4.58V19z M10,1c0,1.66-1.34,3-3,3C6.45,4,6,4.45,6,5H4c0-1.66,1.34-3,3-3c0.55,0,1-0.45,1-1H10z"
    />
  </svg>`,
};

export const icons = () => {
  const icons = _icons;
  const keys = Object.keys(icons);
  return (name: string, primary = "blue", secondary = "lightblue") =>
    keys.includes(name) ? icons[name](primary, secondary) : html``;
};

export const iconFactory = icons();
