import { query } from "@github/query-selector";
import { ContentComponent } from "./content/content.component";
import { TableOfContents } from "./toc/toc";
import "./typing-effect-element";
import { NavComponent, NavItemComponent } from "./nav.component";
import {
  FASTDesignSystemProvider,
  FASTRadioGroup,
  FASTRadio,
} from "@microsoft/fast-components";
ContentComponent;
TableOfContents;
NavItemComponent;
NavComponent;
/*
c
let plot = document.querySelector("plot-engine");
query(document, ".plots__radio-selector", HTMLFieldSetElement).addEventListener(
  "input",
  (e) => {
    plot["plotType"] = (
      query(
        document,
        "[name=active-plot]:checked",
        HTMLInputElement
      ) as HTMLInputElement
    ).value;
  }
);
*/
