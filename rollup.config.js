import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';

const copyConfig = {
  targets: [
    { src: "node_modules/@webcomponents", dest: "dist/node_modules" },
    { src: "src/index.html", dest: "dist/" },
    { src: "src/asset/fonts/", dest: "dist/asset/fonts" },
    { src: "src/home.css", dest: "dist/" },
  ],
};
export default {
  input: "./src/components.ts",
  output: {
    file: "./dist/hicks.bundled.js",
    format: "es",
    //sourceMap: true,
    inlineDynamicImports: true,
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
    replace({ "Reflect.decorate": "undefined" }),
  ],
};
