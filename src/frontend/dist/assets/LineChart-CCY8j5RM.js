import { r as generateCategoricalChart, t as formatAxisMap } from "./generateCategoricalChart-Dbg3OBa5.js";
import { L as Line } from "./Line-4fHmBZVJ.js";
import { X as XAxis, Y as YAxis } from "./YAxis-O4q-6Bm5.js";
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
