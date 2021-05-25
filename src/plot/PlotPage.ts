import { Variable } from "./Variable";

export enum Graph {
  MultipleBolus = "MULTIPLE_BOLUS",
  SingleBolus = "SINGLE_BOLUS",
}

export interface PlotParameters {
  variables: Variable[];
  equation: string;
  equationTemplate: string;
  graphType: Graph;
  bottomBound: number;
  topBound: number;
  axis: string[];
  independentVariable: string;
  range: number;
  multipleDose: boolean;
  units: string;
  isGraph: boolean;
  id: string;
  index: number;
  header: string;
  title: string;
}

export type PlotPage = PlotParameters;
