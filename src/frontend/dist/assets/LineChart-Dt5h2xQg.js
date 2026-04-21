import { r as generateCategoricalChart, t as formatAxisMap } from "./generateCategoricalChart-C5i7De_H.js";
import { L as Line } from "./Line-CNPHBPnT.js";
import { X as XAxis, Y as YAxis } from "./YAxis-Dl760pcE.js";
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
