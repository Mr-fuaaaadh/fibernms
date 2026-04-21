import { r as generateCategoricalChart, t as formatAxisMap } from "./generateCategoricalChart-CMocnl4v.js";
import { L as Line } from "./Line-DlMaYf3E.js";
import { X as XAxis, Y as YAxis } from "./YAxis-DZFqdayo.js";
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
