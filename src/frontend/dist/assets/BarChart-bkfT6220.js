import { r as generateCategoricalChart, B as Bar, t as formatAxisMap } from "./generateCategoricalChart-Dbg3OBa5.js";
import { X as XAxis, Y as YAxis } from "./YAxis-O4q-6Bm5.js";
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
