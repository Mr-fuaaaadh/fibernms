import { g as generateCategoricalChart, f as formatAxisMap } from "./generateCategoricalChart-D9AgGlB1.js";
import { L as Line, X as XAxis, Y as YAxis } from "./YAxis-UhX9As4M.js";
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
