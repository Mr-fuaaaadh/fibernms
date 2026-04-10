import { r as generateCategoricalChart, t as formatAxisMap } from "./generateCategoricalChart-C5KGvJvM.js";
import { L as Line, X as XAxis, Y as YAxis } from "./YAxis-CPwdNa_W.js";
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
