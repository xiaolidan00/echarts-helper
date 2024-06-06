import { InputNumber, Input, ColorPicker, Select, Checkbox, Empty } from 'antd';
import { CaretRightOutlined, CaretDownOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import styles from './FormList.module.scss';
import { useMemo, useState, memo, useEffect } from 'react';
import { getFlatObj, setFlatObj } from '../../utils/flatObj';
import { ScrollTabs, type TabsItem } from '../ScrollTabs/ScrollTabs';

const compMap = {
  number: InputNumber,
  text: Input,
  color: ColorPicker,
  select: Select,
  boolean: Checkbox,
  children: '',
  multi: ''
};
export interface FormItemConfig {
  inputType: keyof typeof compMap;
  code: string;
  label?: string;
  default?: number | string | boolean;
  step?: number;
  options?: Array<string>;
  min?: number;
  max?: number;
  nextCode?: string;
  title?: string;
  config?: Array<FormItemConfig>;
  isArr?: boolean;
}

export interface FormItemValue {
  [n: string | number]: any;
}

export const FormItem = memo(
  (
    props: FormItemConfig & {
      value: unknown;

      onChange: (code: string, value: any) => void;
    }
  ) => {
    const InputEl = compMap[props.inputType] || Input;

    const changeValue = (ev: any) => {
      const code = props.code;
      if (props.inputType === 'color') {
        props.onChange(code, ev.toRgbString());
      } else if (props.inputType === 'text') {
        props.onChange(code, ev.target.value);
      } else if (props.inputType === 'boolean') {
        props.onChange(code, ev.target.checked);
      } else {
        props.onChange(code, ev);
      }
    };

    return (
      <div className={styles.formItem}>
        <span className={styles.formLabel}>{props.label}</span>
        <span className={styles.formInput}>
          <InputEl
            style={{ width: '100%' }}
            value={props.value}
            min={props.min}
            max={props.max}
            step={props.step}
            onChange={changeValue}
            options={(props.options || []).map((it) => ({
              label: it,
              value: it
            }))}
            size="small"
          />
        </span>
      </div>
    );
  }
);
export const FormArr = (props: {
  title: string;
  config: Array<FormItemConfig>;
  value: FormItemValue;
  code: string;
  onChange: (code: string, val: FormItemValue) => void;
}) => {
  const [propVal, setPropVal] = useState(props.value || []);
  const [isShow, setIsShow] = useState(false);
  const [selectTab, setSelectTab] = useState(0);
  const [currentVal, setCurrentVal] = useState({});
  const changeShow = () => {
    setIsShow(!isShow);
  };
  const onChangeVal = (value: FormItemValue) => {
    const v = propVal;
    v[selectTab] = value;
    setPropVal(v);
    props.onChange(props.code, v);
  };
  const items: TabsItem[] = [];
  const newconfig = useMemo(() => props.config.map((it) => ({ ...it, code: it.nextCode })), [props.config]);

  for (let i = 0; i < propVal.length; i++) {
    const idx = i + 1 + '';
    items.push({
      value: i,
      label: props.title + idx
    });
  }
  const onChangeTab = (tab: string | number) => {
    setSelectTab(tab as number);
    setCurrentVal({ ...propVal[tab] });
  };
  const onAdd = () => {
    const v = propVal;
    v.push({});
    setPropVal(v);
    props.onChange(props.code, v);

    onChangeTab(v.length - 1);
  };
  const onDel = () => {
    const i = selectTab;
    const v = propVal;
    v.splice(i, 1);
    setPropVal(v);
    props.onChange(props.code, v);
    if (selectTab > v.length - 1) {
      onChangeTab(v.length - 1);
    }
  };
  useEffect(() => {
    setCurrentVal(propVal[selectTab]);
    return () => {};
  }, []);

  return (
    <div className={styles.formList}>
      <div className={styles.formTitle}>
        <span onClick={changeShow}>
          {isShow ? <CaretDownOutlined /> : <CaretRightOutlined />} {props.title}
        </span>

        <span className={styles.formTitleRight}>
          <PlusOutlined onClick={onAdd} /> <DeleteOutlined onClick={onDel} />
        </span>
      </div>
      {isShow ? (
        propVal.length ? (
          <div className={styles.formArr}>
            <ScrollTabs tabs={items} active={selectTab} onChange={onChangeTab} itemWidth={60}></ScrollTabs>

            <FormList
              parent=""
              parentCode=""
              value={currentVal}
              config={newconfig as FormItemConfig[]}
              onChange={onChangeVal}
            ></FormList>
          </div>
        ) : (
          <Empty />
        )
      ) : (
        ''
      )}
    </div>
  );
};

export const FormList = memo(
  (props: {
    title?: string;
    isNextCode?: boolean;
    config: Array<FormItemConfig>;
    value: FormItemValue;
    onChange: (val: FormItemValue) => void;
    parentCode?: string;
    parent?: string;
    isArr?: boolean;
  }) => {
    const initVal = props.isArr ? [] : {};
    const [propVal, setPropVal] = useState(props.value || initVal);
    const [isShow, setIsShow] = useState(false);
    useEffect(() => {
      setPropVal(props.value);
      return () => {};
    }, [props.value]);
    const onChangeItem = (code: string, value: any) => {
      let v = propVal;
      setFlatObj(v, (props.parent + '.' || '') + code, value);
      if (props.isArr && !Array.isArray(v)) {
        const keys = Object.keys(v).sort((a, b) => Number(a) - Number(b));
        const arr: FormItemValue = [];
        keys.forEach((it) => {
          arr[it] = v[it];
        });
        v = arr;
      }
      setPropVal(v);
      props.onChange(v);
    };
    const changeShow = () => {
      setIsShow(!isShow);
    };
    const onChangeArr = (code: string, value: FormItemValue) => {
      const v = propVal;
      setFlatObj(v, code, value);
      props.onChange(v);
    };
    const getFormItem = (item: FormItemConfig, key: string) => {
      const val = getFlatObj(propVal, key) || item.default;
      return <FormItem {...item} value={val} key={key} code={item.code} onChange={onChangeItem} />;
    };
    const list = [];

    for (let i = 0; i < props.config.length; i++) {
      const item = props.config[i];
      const key = (props.parent + '.' || '') + item.code;
      if (item.inputType === 'children') {
        if (item.isArr) {
          const val = getFlatObj(propVal, key);
          list.push(
            <FormArr
              title={item.title as string}
              value={val}
              key={item.title}
              code={key}
              config={item.config as Array<FormItemConfig>}
              onChange={onChangeArr}
            ></FormArr>
          );
        } else {
          list.push(
            <FormList
              isNextCode={true}
              title={item.title as string}
              value={propVal}
              key={item.title}
              config={item.config as Array<FormItemConfig>}
              parentCode={(props.parentCode || '') + '.' + item.title}
              onChange={props.onChange}
              parent={props.parent}
            />
          );
        }
      } else if (item.inputType === 'multi') {
        const cfg = item.config as FormItemConfig[];
        const items = [];
        for (let j = 0; j < cfg?.length; j++) {
          const it = cfg[j];
          const kk = (props.parent + '.' || '') + it.code;
          items.push(getFormItem(it, kk));
        }
        list.push(<div key={key}>{items}</div>);
      } else {
        list.push(getFormItem(item, key));
      }
    }

    return (
      <div className={styles.formList}>
        {props.title ? (
          <div className={styles.formTitle}>
            <span onClick={changeShow}>
              {isShow ? <CaretDownOutlined /> : <CaretRightOutlined />} {props.title}
            </span>
          </div>
        ) : (
          ''
        )}
        {isShow || !props.title ? <div className={props.isNextCode ? styles.formChild : ''}>{list}</div> : ''}
      </div>
    );
  }
);
