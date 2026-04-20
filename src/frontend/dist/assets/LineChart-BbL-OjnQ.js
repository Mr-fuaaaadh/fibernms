import { r as generateCategoricalChart, t as formatAxisMap } from "./generateCategoricalChart-CRjuZGyA.js";
import { L as Line } from "./Line-CEKbA_1B.js";
import { X as XAxis, Y as YAxis } from "./YAxis-kMclNaNP.js";
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
