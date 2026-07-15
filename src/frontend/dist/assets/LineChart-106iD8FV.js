import { r as generateCategoricalChart, t as formatAxisMap } from "./generateCategoricalChart-Cd_4XozO.js";
import { L as Line } from "./Line-DFln6Xuk.js";
import { X as XAxis, Y as YAxis } from "./YAxis-DJ3E17W6.js";
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
