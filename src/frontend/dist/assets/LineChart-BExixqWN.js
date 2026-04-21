import { r as generateCategoricalChart, t as formatAxisMap } from "./generateCategoricalChart-DqaYj3d4.js";
import { L as Line } from "./Line-DuF5Xoc5.js";
import { X as XAxis, Y as YAxis } from "./YAxis-CeTwCnik.js";
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
