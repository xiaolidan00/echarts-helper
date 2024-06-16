import { FormList } from '../FormList/FormList';

import { useEffect, useState } from 'react';

import type { FormChildConfig, FormItemConfig, FormItemValue } from '../FormList/config';
import { Empty } from 'antd';
import { uuid } from '../../utils/uuid';
interface configMap {
  [n: string]: Array<FormItemConfig>;
}
interface FormConfig {
  title: string;
  config: Array<FormItemConfig>;
}

const configMap: configMap = {};
function getConfigJSON(name: string) {
  return new Promise<Array<FormItemConfig>>((resolve) => {
    //缓存配置
    if (configMap[name]) resolve(configMap[name]);
    else {
      //获取echarts的表单配置
      import(`./echartsForm/${name}.js`)
        .then(({ default: data }) => {
          if (typeof data === 'object') {
            configMap[name] = data as Array<FormItemConfig>;
          } else {
            configMap[name] = [{ inputType: 'text', code: name, label: name, id: name }];
          }
          resolve(configMap[name]);
        })
        .catch(() => {
          //如果没有配置就生成默认配置
          configMap[name] = [{ inputType: 'text', code: name, label: name, id: name }];
          resolve(configMap[name]);
        });
    }
  });
}

export const RightPanel = (props: {
  chartOptions: string[]; //echarts的普通配置属性
  chartSeries: string[]; //echarts的系列配置属性
  optionsConfig: FormItemValue; //echarts的普通配置属性的值
  seriesConfig: FormItemValue; //echarts的系列配置属性值
  onChange: (ev: { type: string; v: FormItemValue }) => void;
}) => {
  const [baseOpList, setBaseOpList] = useState<FormItemConfig[]>([]);
  const [optionsList, setOptionsList] = useState<FormConfig[]>([]);

  const [seriesList, setSeriesList] = useState<FormConfig[]>([]);
  //更新获取表单配置面板
  const updatePanel = async () => {
    //基础配置
    {
      const list: FormConfig[] = [];
      const baseList: FormItemConfig[] = [];
      for (let i = 0; i < props.chartOptions.length; i++) {
        const item = props.chartOptions[i];
        const set = await getConfigJSON(item);

        if (set.length === 1) {
          baseList.push(set[0]);
        } else {
          list.push({ title: item, config: set, code: item } as FormChildConfig);
        }
      }
      setBaseOpList(baseList);
      setOptionsList(list);
    }
    //系列配置
    {
      const s = props.seriesConfig;

      const list: FormConfig[] = [];
      for (let i = 0; i < props.chartSeries.length; i++) {
        const item = props.chartSeries[i];
        const set = await getConfigJSON(item);
        list.push({ title: item, config: set, code: item } as FormChildConfig);

        if (s[i] === undefined) {
          //不存在系列则添加系列
          const type = item.substring(item.indexOf('-') + 1);
          s[i] = { type, data: [], id: uuid() };
        }
      }
      onChangeSeries(s);
      setSeriesList(list);
    }
  };
  const onChangeSeries = (v: FormItemValue) => {
    props.onChange({ type: 'series', v });
  };
  const onChangeValue = (v: FormItemValue) => {
    props.onChange({ type: 'options', v });
  };
  //监听配置属性，则更新面板
  useEffect(() => {
    updatePanel();
    return () => {};
  }, [props.chartOptions, props.chartSeries]);
  return (
    <div className="rightPanel">
      {/* 基础配置面板 */}
      {props.chartOptions.length === 0 && props.chartSeries.length === 0 ? (
        <Empty description="请选择echarts配置"></Empty>
      ) : (
        ''
      )}
      <FormList config={baseOpList} value={props.optionsConfig} onChange={onChangeValue}></FormList>
      {optionsList.map((it) => (
        <FormList
          title={it.title}
          parent={it.title}
          config={it.config}
          value={props.optionsConfig}
          key={it.title}
          onChange={onChangeValue}
        ></FormList>
      ))}
      {/* 系列配置面板 */}
      {seriesList.map((it, i) => (
        <FormList
          title={i + 1 + '.' + it.title}
          parent={i + ''}
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
