import { r as generateCategoricalChart, t as formatAxisMap } from "./generateCategoricalChart-DqaYj3d4.js";
import { A as Area } from "./Area-DxIQSTEa.js";
import { X as XAxis, Y as YAxis } from "./YAxis-CeTwCnik.js";
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
