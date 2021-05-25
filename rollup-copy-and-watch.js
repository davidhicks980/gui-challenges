import fs from "fs";

export default function copyAndWatch(fileIn, fileOut) {
  return {
    name: "copy-and-watch",
    async buildStart() {
      this.addWatchFile(fileIn);
    },
    async generateBundle() {
      this.emitFile({
        type: "asset",
        fileName: "src/index.html",
        source: fs.readFileSync(fileIn),
      });
    },
  };
}
