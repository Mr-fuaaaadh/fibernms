import { r as generateCategoricalChart, t as formatAxisMap } from "./generateCategoricalChart-CRjuZGyA.js";
import { A as Area } from "./Area-CuHgofk8.js";
import { X as XAxis, Y as YAxis } from "./YAxis-kMclNaNP.js";
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
