import { r as generateCategoricalChart, t as formatAxisMap } from "./generateCategoricalChart-B-dNyQaS.js";
import { A as Area } from "./BarChart-Bb80d4Qn.js";
import { X as XAxis, Y as YAxis } from "./YAxis-Bd4LICyo.js";
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
