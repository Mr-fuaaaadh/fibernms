import { r as generateCategoricalChart, t as formatAxisMap } from "./generateCategoricalChart-Dbg3OBa5.js";
import { A as Area } from "./Area-CZTIX3pH.js";
import { X as XAxis, Y as YAxis } from "./YAxis-O4q-6Bm5.js";
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
