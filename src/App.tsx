import { RightPanel } from './components/RightPanel/RightPanel';
import { ChartList } from './components/ChartList/ChartList';
import { useEffect, useState } from 'react';
import { FormItemValue } from './components/FormList/FormList';
import { ChartContent } from './components/ChartContent/ChartContent';
let isFirst = true;
function App() {
  const [chartOptions, setChartOptions] = useState<string[]>([]);
  const [chartSeries, setChartSeries] = useState<string[]>([]);
  const [optionsConfig, setOptionsConfig] = useState<FormItemValue>({});
  const [seriesConfig, setSeriesConfig] = useState<FormItemValue>([]);
  const onChangeList = (type: string, v: string[]) => {
    if (type === 'series') {
      const map = {};
      v.forEach((a) => {
        map[a] = 1;
      });
      const cfg = seriesConfig;
      for (let k in cfg) {
        if (!map[k]) {
          delete cfg[k];
        }
      }
      setSeriesConfig(cfg);
      setChartSeries(v);
    } else {
      const map = {};
      v.forEach((a) => {
        map[a] = 1;
      });
      const cfg = optionsConfig;
      for (let k in cfg) {
        if (!map[k]) {
          delete cfg[k];
        }
      }
      setOptionsConfig(cfg);
      setChartOptions(v);
    }
    saveCfg();
  };
  const onChangeConfig = ({ type, v }: { type: string; v: FormItemValue }) => {
    if (type == 'series') {
      setSeriesConfig(v);
    } else {
      setOptionsConfig(v);
    }
    saveCfg();
  };
  const saveCfg = () => {
    if (isFirst) return;
    window.localStorage.setItem(
      'chartConfig',
      JSON.stringify({
        optionsConfig,
        seriesConfig,
        chartOptions,
        chartSeries
      })
    );
  };
  useEffect(() => {
    if (window.localStorage.getItem('chartConfig')) {
      const cfg = JSON.parse(window.localStorage.getItem('chartConfig') as string);
      setOptionsConfig(cfg.optionsConfig);
      setSeriesConfig(cfg.seriesConfig);
      setChartOptions(cfg.chartOptions);
      setChartSeries(cfg.chartSeries);
    }
    isFirst = false;
    return () => {};
  }, []);
  return (
    <>
      <ChartList chartOptions={chartOptions} chartSeries={chartSeries} onChange={onChangeList}></ChartList>
      <ChartContent optionsConfig={optionsConfig} seriesConfig={seriesConfig}></ChartContent>
      <RightPanel
        chartOptions={chartOptions}
        chartSeries={chartSeries}
        optionsConfig={optionsConfig}
        seriesConfig={seriesConfig}
        onChange={onChangeConfig}
      ></RightPanel>
    </>
  );
}

export default App;
