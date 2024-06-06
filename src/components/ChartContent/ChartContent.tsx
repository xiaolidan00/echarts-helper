import * as echarts from 'echarts';
import type { ECharts } from 'echarts';
import { FormItemValue } from '../FormList/FormList';
import { useEffect, useImperativeHandle, useRef, type Ref } from 'react';
import { Button } from 'antd';
export const ChartContent = (props: {
  onRef: Ref<{ createChart: () => void }>;
  optionsConfig: FormItemValue;
  seriesConfig: FormItemValue;
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  let chart: ECharts;
  const createChart = () => {
    if (!chart) {
      chart = echarts.init(chartRef.current);
    }
    chart.clear();

    const options = { ...props.optionsConfig, series: props.seriesConfig };
    chart.setOption(
      JSON.parse(JSON.stringify(options), (key, value) => {
        if (
          ['value', 'position', 'center', 'data'].includes(key) &&
          value &&
          typeof value === 'string' &&
          value.indexOf(',')
        ) {
          return value.split(',');
        }
        return value;
      })
    );
    chart.resize();
    console.log('options', options);
  };
  const onResize = () => {
    if (chart) {
      chart.resize();
    }
  };
  useImperativeHandle(props.onRef, () => ({
    createChart
  }));
  // useEffect(() => {
  //   if (chart) {
  //     createChart();
  //   }
  // }, [props.seriesConfig, props.optionsConfig]);

  useEffect(() => {
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      if (chart) chart.dispose();
    };
  }, []);
  return (
    <div className="chartContent">
      <div className="chartBox" ref={chartRef}></div>
      <Button style={{ position: 'absolute', top: '0px' }} onClick={createChart}>
        生成图表
      </Button>
    </div>
  );
};
