import { r as generateCategoricalChart, t as formatAxisMap } from "./generateCategoricalChart-C5KGvJvM.js";
import { A as Area } from "./BarChart-DHDwV7TA.js";
import { X as XAxis, Y as YAxis } from "./YAxis-CPwdNa_W.js";
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
