require("typescript-require");
const palx = require("palx");
const palette = palx("blue");
let sasspalette = Object.entries(palette)
    .filter(([key, value]) => Array.isArray(value))
    .map(([key, value]) => value.map((element, i) => {
    return `--${key}-${i}: ${element};`;
}))
    .flat()
    .join("  ");
console.log(sasspalette);
//# sourceMappingURL=get-colors.js.map