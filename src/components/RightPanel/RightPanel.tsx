import { FormItemConfig, FormItemValue, FormList } from '../FormList/FormList';

import { useEffect, useState } from 'react';
import axios from 'axios';
interface configMap {
  [n: string]: Array<FormItemConfig>;
}
interface FormConfig {
  title: string;
  config: Array<FormItemConfig>;
}

const configMap: configMap = {};
function getConfigJSON(name: string) {
  return new Promise((resolve) => {
    if (configMap[name]) resolve(configMap[name]);
    else
      axios
        .get(`/form/${name}.json`)
        .then(({ data }) => {
          configMap[name] = data as Array<FormItemConfig>;

          resolve(data);
        })
        .catch(() => {
          configMap[name] = [{ inputType: 'text', code: name, label: name }];
          resolve(configMap[name]);
        });
  });
}

export const RightPanel = (props: {
  chartOptions: string[];
  chartSeries: string[];
  optionsConfig: FormItemValue;
  seriesConfig: FormItemValue;
  onChange: (ev: { type: string; v: FormItemValue }) => void;
}) => {
  const onChangeValue = (v: FormItemValue) => {
    props.onChange({ type: 'options', v });
    console.log(v);
  };
  const [optionsList, setOptionsList] = useState<FormConfig[]>([]);

  const [seriesList, setSeriesList] = useState<FormConfig[]>([]);

  const updatePanel = async () => {
    {
      const list: FormConfig[] = [];
      for (let i = 0; i < props.chartOptions.length; i++) {
        const item = props.chartOptions[i];
        const set = await getConfigJSON(item);
        list.push({ title: item, config: set } as FormItemConfig);
      }
      setOptionsList(list);
    }
    {
      const s = props.seriesConfig;
      const list: FormConfig[] = [];
      for (let i = 0; i < props.chartSeries.length; i++) {
        const item = props.chartSeries[i];
        const set = await getConfigJSON(item);
        list.push({ title: item, config: set } as FormItemConfig);
        if (!props.seriesConfig[i]) {
          const type = item.substring(item.indexOf('-') + 1);
          s[i] = { type, data: [] };
        }
      }
      onChangeSeries(s);
      setSeriesList(list);
    }
  };
  const onChangeSeries = (v: FormItemValue) => {
    props.onChange({ type: 'series', v });
    console.log(v);
  };
  useEffect(() => {
    updatePanel();

    return () => {};
  }, [props.chartOptions, props.chartSeries]);
  return (
    <div className="rightPanel">
      {optionsList.map((it) => (
        <FormList
          title={it.title}
          parent={it.title}
          parentCode={it.title}
          config={it.config}
          value={props.optionsConfig}
          key={it.title}
          onChange={onChangeValue}
        ></FormList>
      ))}
      {seriesList.map((it, i) => (
        <FormList
          title={i + 1 + '.' + it.title}
          parent={i + ''}
          parentCode={i + ''}
          config={it.config}
          isArr={true}
          value={props.seriesConfig}
          key={i + it.title}
          onChange={onChangeSeries}
        ></FormList>
      ))}
    </div>
  );
};
