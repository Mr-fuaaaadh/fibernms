import { r as generateCategoricalChart, t as formatAxisMap } from "./generateCategoricalChart-DaWA7quf.js";
import { A as Area } from "./Area-D55lDCka.js";
import { X as XAxis, Y as YAxis } from "./YAxis-eOBncTvm.js";
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
