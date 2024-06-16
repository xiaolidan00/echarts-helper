import { RightPanel } from './components/RightPanel/RightPanel';
import { ChartList } from './components/ChartList/ChartList';
import { useRef, useState } from 'react';
import { FormItemValue } from './components/FormList/config';
import { ChartContent } from './components/ChartContent/ChartContent';
import * as baseChart from './config/baseChart';
import { cloneDeep } from 'lodash-es';
import { uuid } from './utils/uuid';
interface CfgMap {
  [n: string]: number;
}
function App() {
  const [chartOptions, setChartOptions] = useState<string[]>([]);
  const [chartSeries, setChartSeries] = useState<string[]>([]);
  const [optionsConfig, setOptionsConfig] = useState<FormItemValue>({});
  const [seriesConfig, setSeriesConfig] = useState<FormItemValue>([]);
  const chartRef = useRef<{ createChart: () => void }>(null);
  const onChangeList = (type: string, v: string[]) => {
    if (type === 'series') {
      //删除系列，对应删除系列值
      if (seriesConfig.length > v.length) {
        const map: CfgMap = {};
        seriesConfig.forEach((a) => {
          map[a.id] = 1;
        });
        const cfg = seriesConfig.filter((a) => map[a.id]);
        setSeriesConfig(cfg);
      }
      setChartSeries(v);
    } else {
      //删除基础配置，对应删除属性值
      if (v.length < Object.keys(optionsConfig).length) {
        const map: CfgMap = {};
        v.forEach((a) => {
          map[a] = 1;
        });
        const cfg = optionsConfig;
        for (const k in cfg) {
          if (!map[k]) {
            delete cfg[k];
          }
        }
        setOptionsConfig(cfg);
      }

      setChartOptions(v);
    }
    renderChart();
  };
  const onChangeConfig = ({ type, v }: { type: string; v: FormItemValue }) => {
    if (type === 'series') {
      setSeriesConfig(v);
    } else {
      setOptionsConfig(v);
    }
    console.log(type, v);
    renderChart();
  };

  const baseChartKeys = Object.keys(baseChart);
  const onBaseChart = (c: string) => {
    const item = c as keyof typeof baseChart;

    const op = cloneDeep(baseChart[item]);
    const ops: string[] = [];
    const opCfg: FormItemValue = {};
    for (const k in op) {
      if (k !== 'series') {
        if (k === 'visualMap') {
          ops.push('visualMap-continuous');
        } else {
          ops.push(k);
        }

        opCfg[k] = op[k as keyof typeof op];
        if (opCfg[k].data && Array.isArray(opCfg[k].data) && typeof opCfg[k].data[0] === 'string') {
          opCfg[k].data.map((it: string) => ({ value: it }));
        }
      }
    }
    setChartOptions(ops);
    setOptionsConfig(opCfg);
    const s: string[] = [];
    op.series.forEach((it) => {
      it.id = uuid();
      s.push('series-' + it.type);
      if (typeof it.data[0] === 'number') {
        (it.data as Array<any>).forEach((a, i: number) => {
          it.data[i] = { value: a };
        });
      }
      if (typeof it.data[0] === 'object' && Array.isArray(it.data[0].value)) {
        it.data.forEach((a) => {
          a.value = (a.value as Array<number>).join(',');
        });
      }
    });
    setChartSeries(s);
    setSeriesConfig(op.series);
  };
  const renderChart = () => {
    setTimeout(() => {
      if (chartRef.current?.createChart) chartRef.current.createChart();
    }, 100);
  };
  return (
    <>
      <div className="baseChart">
        {baseChartKeys.map((it) => (
          <span onClick={() => onBaseChart(it)} key={it}>
            {it}
          </span>
        ))}
      </div>
      <ChartList chartOptions={chartOptions} chartSeries={chartSeries} onChange={onChangeList}></ChartList>
      <ChartContent onRef={chartRef} optionsConfig={optionsConfig} seriesConfig={seriesConfig}></ChartContent>
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
