import { r as generateCategoricalChart, t as formatAxisMap } from "./generateCategoricalChart-YlFgKX6A.js";
import { A as Area } from "./Area-ClUT1A8g.js";
import { X as XAxis, Y as YAxis } from "./YAxis-DrrMaTBu.js";
var AreaChart = generateCategoricalChart({
  chartName: "AreaChart",
  GraphicalChild: Area,
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
  AreaChart as A
};
