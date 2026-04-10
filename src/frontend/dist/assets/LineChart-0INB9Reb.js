import { r as generateCategoricalChart, t as formatAxisMap } from "./generateCategoricalChart-B-dNyQaS.js";
import { L as Line, X as XAxis, Y as YAxis } from "./YAxis-Bd4LICyo.js";
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
