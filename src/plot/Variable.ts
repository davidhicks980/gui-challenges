export interface Variable {
  name?: string;
  units: string;
  symbol: string;
  min: number;
  max: number;
  value: number;
  range?: number[];
  step?: number;
}
