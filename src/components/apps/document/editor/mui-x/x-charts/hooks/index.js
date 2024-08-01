"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  unstable_useSeries: true,
  unstable_usePieSeries: true,
  unstable_useLineSeries: true,
  unstable_useBarSeries: true,
  unstable_useScatterSeries: true
};
Object.defineProperty(exports, "unstable_useBarSeries", {
  enumerable: true,
  get: function () {
    return _useSeries.useBarSeries;
  }
});
Object.defineProperty(exports, "unstable_useLineSeries", {
  enumerable: true,
  get: function () {
    return _useSeries.useLineSeries;
  }
});
Object.defineProperty(exports, "unstable_usePieSeries", {
  enumerable: true,
  get: function () {
    return _useSeries.usePieSeries;
  }
});
Object.defineProperty(exports, "unstable_useScatterSeries", {
  enumerable: true,
  get: function () {
    return _useSeries.useScatterSeries;
  }
});
Object.defineProperty(exports, "unstable_useSeries", {
  enumerable: true,
  get: function () {
    return _useSeries.useSeries;
  }
});
var _useDrawingArea = require("./useDrawingArea");
Object.keys(_useDrawingArea).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _useDrawingArea[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useDrawingArea[key];
    }
  });
});
var _useChartId = require("./useChartId");
Object.keys(_useChartId).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _useChartId[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useChartId[key];
    }
  });
});
var _useScale = require("./useScale");
Object.keys(_useScale).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _useScale[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useScale[key];
    }
  });
});
var _useSvgRef = require("./useSvgRef");
Object.keys(_useSvgRef).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _useSvgRef[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _useSvgRef[key];
    }
  });
});
var _useSeries = require("./useSeries");