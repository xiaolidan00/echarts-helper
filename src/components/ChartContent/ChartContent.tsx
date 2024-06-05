import * as echarts from 'echarts';
import type { ECharts } from 'echarts';
import { FormItemValue } from '../FormList/FormList';
import { useEffect, useRef } from 'react';
import { Button } from 'antd';
export const ChartContent = (props: { optionsConfig: FormItemValue; seriesConfig: FormItemValue }) => {
  const chartRef = useRef<HTMLDivElement>();
  let chart: ECharts;
  const createChart = () => {
    if (!chart) {
      chart = echarts.init(chartRef.current);
    }
    const options = { ...props.optionsConfig, series: props.seriesConfig };
    chart.setOption(options);
    chart.resize();
    console.log('options', options);
  };
  const onResize = () => {
    if (chart) {
      chart.resize();
    }
  };

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
