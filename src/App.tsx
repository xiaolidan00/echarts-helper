import { RightPanel } from './components/RightPanel/RightPanel';
import { ChartList } from './components/ChartList/ChartList';
import { useState } from 'react';
import { FormItemValue } from './components/FormList/FormList';

function App() {
  const [chartOptions, setChartOptions] = useState<string[]>([]);
  const [chartSeries, setChartSeries] = useState<string[]>([]);
  const [optionsConfig, setOptionsConfig] = useState<FormItemValue>({});
  const [seriesConfig, setSeriesConfig] = useState<FormItemValue>({});
  const onChangeList = (type: string, v: string[]) => {
    if (type === 'series') {
      setChartSeries(v);
    } else {
      setChartOptions(v);
    }
  };
  const onChangeConfig = ({ type, v }: { type: string; v: FormItemValue }) => {
    if (type == 'series') {
      setSeriesConfig(v);
    } else {
      setOptionsConfig(v);
    }
  };
  return (
    <>
      <ChartList chartOptions={chartOptions} chartSeries={chartSeries} onChange={onChangeList}></ChartList>
      <div className="chartContent"></div>
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
