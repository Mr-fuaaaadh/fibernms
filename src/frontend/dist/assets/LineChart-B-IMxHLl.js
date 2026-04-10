import { r as generateCategoricalChart, t as formatAxisMap } from "./generateCategoricalChart-DaWA7quf.js";
import { L as Line } from "./Line-BL_hd6tF.js";
import { X as XAxis, Y as YAxis } from "./YAxis-eOBncTvm.js";
var LineChart = generateCategoricalChart({
  chartName: "LineChart",
  GraphicalChild: Line,
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
  LineChart as L
};
