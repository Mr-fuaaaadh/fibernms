import { r as generateCategoricalChart, t as formatAxisMap } from "./generateCategoricalChart-YlFgKX6A.js";
import { L as Line } from "./Line-C9HtKurI.js";
import { X as XAxis, Y as YAxis } from "./YAxis-DrrMaTBu.js";
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
