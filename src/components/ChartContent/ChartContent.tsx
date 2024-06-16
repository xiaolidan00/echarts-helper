import * as echarts from 'echarts';
import type { ECharts } from 'echarts';
import type { FormItemValue } from '../FormList/config';
import { useEffect, useImperativeHandle, useRef, type Ref } from 'react';
import { Button } from 'antd';
import { getGeoJSON } from '../../utils/geo';

export const ChartContent = (props: {
  onRef: Ref<{ createChart: () => void }>;
  optionsConfig: FormItemValue; //echarts基础配置
  seriesConfig: FormItemValue; //echarts系列配置
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const chart = useRef<ECharts | null>(null);
  const isLock = useRef<boolean>(false);
  const createChart = () => {
    //不含系列不渲染
    if (props.seriesConfig.length === 0) return;
    //节流
    if (isLock.current) return;
    isLock.current = true;
    setTimeout(async () => {
      if (chart.current === null) {
        //实例化echarts
        chart.current = echarts.init(chartRef.current);
      }
      //清空图表
      chart.current.clear();
      // chart.current.showLoading();
      const options: any = { ...props.optionsConfig, series: props.seriesConfig };
      //配置项处理
      if (options['visualMap-continuous']) {
        options.visualMap = { ...options['visualMap-continuous'], type: 'continuous' };
        delete options['visualMap-continuous'];
      }
      if (options['visualMap-piecewise']) {
        options.visualMap = { ...options['visualMap-piecewise'], type: 'piecewise' };
        delete options['visualMap-piecewise'];
      }
      if (options['dataZoom-inside']) {
        options.dataZoom = { ...options['dataZoom-inside'], type: 'inside' };
        delete options['dataZoom-inside'];
      }
      if (options['dataZoom-slider']) {
        options.dataZoom = { ...options['dataZoom-slider'], type: 'slider' };
        delete options['dataZoom-slider'];
      }
      //地图注册行政区
      const mapSeries = options.series.find((it) => it.type === 'map');
      if (mapSeries) {
        const geojson = await getGeoJSON(mapSeries.map || '100000');
        echarts.registerMap(mapSeries.map, geojson as object);
      }
      // chart.current.hideLoading();
      //设置图表配置
      //通过JSON.parse的reviver函数转换值
      chart.current.setOption(
        JSON.parse(JSON.stringify(options), (key, value) => {
          if (value && typeof value === 'string') {
            //字符串转数组
            if (['center', 'position', 'radius', 'value', 'data'].includes(key) && value.indexOf(','))
              return value.split(',');

            //字符串转函数
            if (key === 'formatter' && value.indexOf('function') === 0) return new Function(value);
            //字符串转布尔
            if (value === 'true') return true;
            if (value === 'false') return false;
          }
          return value;
        })
      );

      console.log('options', chart.current.getOption());
      isLock.current = false;
    }, 500);
  };
  const onResize = () => {
    if (chart.current) {
      chart.current.resize();
    }
  };
  //向外暴露方法
  useImperativeHandle(props.onRef, () => ({
    createChart
  }));
  //跟随窗口调整大小
  useEffect(() => {
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
      if (chart.current) chart.current.dispose();
    };
  }, []);
  return (
    <div className="chartContent">
      <div className="chartBox" ref={chartRef}></div>
      <Button style={{ position: 'absolute', top: '0px' }} onClick={createChart} type="primary">
        生成图表
      </Button>
    </div>
  );
};
