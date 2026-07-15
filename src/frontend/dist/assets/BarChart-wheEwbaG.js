import { r as generateCategoricalChart, B as Bar, t as formatAxisMap } from "./generateCategoricalChart-Cd_4XozO.js";
import { X as XAxis, Y as YAxis } from "./YAxis-DJ3E17W6.js";
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
