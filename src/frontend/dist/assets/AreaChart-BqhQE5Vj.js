import { r as generateCategoricalChart, t as formatAxisMap } from "./generateCategoricalChart-C5i7De_H.js";
import { A as Area } from "./Area-Dta_5yTT.js";
import { X as XAxis, Y as YAxis } from "./YAxis-Dl760pcE.js";
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
