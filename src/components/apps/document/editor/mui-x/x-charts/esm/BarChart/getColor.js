export default function getColor(series, xAxis, yAxis) {
  const verticalLayout = series.layout === 'vertical';
  const bandColorScale = verticalLayout ? xAxis.colorScale : yAxis.colorScale;
  const valueColorScale = verticalLayout ? yAxis.colorScale : xAxis.colorScale;
  const bandValues = verticalLayout ? xAxis.data : yAxis.data;
  if (valueColorScale) {
    return dataIndex => {
      const value = series.data[dataIndex];
      const color = value === null ? series.color : valueColorScale(value);
      if (color === null) {
        return series.color;
      }
      return color;
    };
  }
  if (bandColorScale) {
    return dataIndex => {
      const value = bandValues[dataIndex];
      const color = value === null ? series.color : bandColorScale(value);
      if (color === null) {
        return series.color;
      }
      return color;
    };
  }
  return () => series.color;
}