import { r as generateCategoricalChart, t as formatAxisMap } from "./generateCategoricalChart-6j4ezovi.js";
import { A as Area } from "./Area-DPr-GbTi.js";
import { X as XAxis, Y as YAxis } from "./YAxis-CB9lTxAu.js";
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
