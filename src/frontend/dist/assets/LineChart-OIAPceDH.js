import { r as generateCategoricalChart, t as formatAxisMap } from "./generateCategoricalChart-CynI4SrN.js";
import { L as Line } from "./Line-BR9WKa1M.js";
import { X as XAxis, Y as YAxis } from "./YAxis-BIFnknc_.js";
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
