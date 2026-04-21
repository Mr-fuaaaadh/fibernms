import { r as generateCategoricalChart, t as formatAxisMap } from "./generateCategoricalChart-6j4ezovi.js";
import { L as Line } from "./Line--pDwhLNZ.js";
import { X as XAxis, Y as YAxis } from "./YAxis-CB9lTxAu.js";
var LineChart = generateCategoricalChart({
  chartName: "LineChart",
  GraphicalChild: Line,
  axisComponents: [{
    axisType: "xAxis",
    AxisComp: XAxis
  }, {
    axisType: "yAxis",
    AxisComp: YAxis
  }],
  formatAxisMap
});
export {
  LineChart as L
};
