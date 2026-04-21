import { r as generateCategoricalChart, t as formatAxisMap } from "./generateCategoricalChart-CMocnl4v.js";
import { A as Area } from "./Area-DLulRWBB.js";
import { X as XAxis, Y as YAxis } from "./YAxis-DZFqdayo.js";
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
