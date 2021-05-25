import { babel } from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import typescript from "@rollup/plugin-typescript";
import copy from "rollup-plugin-copy";
import copyAndWatch from "./rollup-copy-and-watch";
import watchAssets from "rollup-plugin-watch-assets";
const copyConfig = {
  targets: [
    { src: "node_modules/@webcomponents", dest: "dist/node_modules" },
    { src: "src/asset/fonts/", dest: "dist/asset/fonts" },
    { src: "src/index.html", dest: "dist" },
    { src: "src/icons", dest: "dist" },
  ],
};

export default {
  input: "./src/components.ts",
  output: {
    dir: "dist",
    format: "es",
  },
  watch: {
    include: "src/**/*",
  },
  onwarn(warning) {
    if (warning.code !== "THIS_IS_UNDEFINED") {
      console.error(`(!) ${warning.message}`);
    }
  },
  preserveEntrySignatures: true,
  plugins: [
    babel({ babelHelpers: "bundled" }),
    copy(copyConfig),
    typescript(),
    commonjs(),
    resolve(),
    watchAssets({ assets: ["src/index.html"] }),
    replace({ "Reflect.decorate": "undefined" }),
  ],
};
