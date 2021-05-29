import { html } from 'lit';
import { resume } from './resume';
import { close } from './close';
import { menu } from './menu';
import { openBook } from './menuBook';
const _icons = {
    projects: (primary, secondary) => html `<svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            width="1.5rem"
            height="1.5rem"
        >
            <style>
                .primary {
                    fill: var(${primary});
                }
            </style>
            <path
                class="primary"
                d="M160 389a20.91 20.91 0 01-13.82-5.2l-128-112a21 21 0 010-31.6l128-112a21 21 0 0127.66 31.61L63.89 256l109.94 96.19A21 21 0 01160 389zM352 389a21 21 0 01-13.84-36.81L448.11 256l-109.94-96.19a21 21 0 0127.66-31.61l128 112a21 21 0 010 31.6l-128 112A20.89 20.89 0 01352 389zM208 437a21 21 0 01-20.12-27l96-320a21 21 0 1140.23 12l-96 320A21 21 0 01208 437z"
            />
        </svg>`,
    interests: (primary, secondary) => html `<svg
        xmlns="http://www.w3.org/2000/svg"
        height="1.5rem"
        viewBox="0 0 512 512"
        width="1.5rem"
    >
        <style>
            .primary {
                fill: var(${primary});
            }
            .secondary {
                fill: var(${secondary});
            }
        </style>

        <path
            class="primary"
            d="M459.94 53.25a16.06 16.06 0 00-23.22-.56L424.35 65a8 8 0 000 11.31l11.34 11.32a8 8 0 0011.34 0l12.06-12c6.1-6.09 6.67-16.01.85-22.38zM399.34 90L218.82 270.2a9 9 0 00-2.31 3.93L208.16 299a3.91 3.91 0 004.86 4.86l24.85-8.35a9 9 0 003.93-2.31L422 112.66a9 9 0 000-12.66l-9.95-10a9 9 0 00-12.71 0z"
        />
        <path
            class="primary"
            d="M386.34 193.66L264.45 315.79A41.08 41.08 0 01247.58 326l-25.9 8.67a35.92 35.92 0 01-44.33-44.33l8.67-25.9a41.08 41.08 0 0110.19-16.87l122.13-121.91a8 8 0 00-5.65-13.66H104a56 56 0 00-56 56v240a56 56 0 0056 56h240a56 56 0 0056-56V199.31a8 8 0 00-13.66-5.65z"
        />
    </svg>`,
    close: close,
    resume: resume,
    menu: menu,
    openBook: openBook,
    home: (primary, secondary) => html `<svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.5rem"
            height="1.5rem"
            viewBox="0 0 512 512"
        >
            <style>
                .primary {
                    fill: var(${primary});
                }
                .secondary {
                    fill: var(${secondary});
                }
            </style>
            <title>Home</title>
            <path
                class="primary"
                d="M261.56 101.28a8 8 0 00-11.06 0L66.4 277.15a8 8 0 00-2.47 5.79L63.9 448a32 32 0 0032 32H192a16 16 0 0016-16V328a8 8 0 018-8h80a8 8 0 018 8v136a16 16 0 0016 16h96.06a32 32 0 0032-32V282.94a8 8 0 00-2.47-5.79z"
            />
            <path
                class="primary"
                d="M490.91 244.15l-74.8-71.56V64a16 16 0 00-16-16h-48a16 16 0 00-16 16v32l-57.92-55.38C272.77 35.14 264.71 32 256 32c-8.68 0-16.72 3.14-22.14 8.63l-212.7 203.5c-6.22 6-7 15.87-1.34 22.37A16 16 0 0043 267.56L250.5 69.28a8 8 0 0111.06 0l207.52 198.28a16 16 0 0022.59-.44c6.14-6.36 5.63-16.86-.76-22.97z"
            />
        </svg>`,
};
export const icons = () => {
    const icons = _icons;
    const keys = Object.keys(icons);
    return (name, primary = 'blue', secondary = 'lightblue') => keys.includes(name) ? icons[name](primary, secondary) : html ``;
};
export const iconFactory = icons();
//# sourceMappingURL=icons.js.map