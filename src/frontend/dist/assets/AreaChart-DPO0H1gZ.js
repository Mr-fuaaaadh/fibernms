import { r as generateCategoricalChart, t as formatAxisMap } from "./generateCategoricalChart-Cd_4XozO.js";
import { A as Area } from "./Area-DNBHw7q3.js";
import { X as XAxis, Y as YAxis } from "./YAxis-DJ3E17W6.js";
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
