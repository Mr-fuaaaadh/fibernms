import { r as generateCategoricalChart, B as Bar, t as formatAxisMap } from "./generateCategoricalChart-YlFgKX6A.js";
import { X as XAxis, Y as YAxis } from "./YAxis-DrrMaTBu.js";
var BarChart = generateCategoricalChart({
  chartName: "BarChart",
  GraphicalChild: Bar,
  defaultTooltipEventType: "axis",
  validateTooltipEventTypes: ["axis", "item"],
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
  BarChart as B
};
