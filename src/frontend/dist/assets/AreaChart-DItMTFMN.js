import { r as generateCategoricalChart, t as formatAxisMap } from "./generateCategoricalChart-CynI4SrN.js";
import { A as Area } from "./Area-D9Xpx8hZ.js";
import { X as XAxis, Y as YAxis } from "./YAxis-BIFnknc_.js";
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
