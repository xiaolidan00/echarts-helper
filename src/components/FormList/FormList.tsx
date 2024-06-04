import { InputNumber, Input, ColorPicker, Select, Checkbox } from 'antd';
import { CaretRightOutlined, CaretDownOutlined, DeleteOutlined } from '@ant-design/icons';
import styles from './FormList.module.scss';
import { useMemo, useState, memo, useEffect } from 'react';
import { getFlatObj, setFlatObj } from '../../utils/flatObj';

const compMap = {
  number: InputNumber,
  text: Input,
  color: ColorPicker,
  select: Select,
  boolean: Checkbox,
  children: ''
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
}

export interface FormItemValue {
  [n: string | number]: any;
}

export const FormItem = memo(
  (
    props: FormItemConfig & {
      value: unknown;
      parent: string;
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
            defaultValue={props.value}
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
export const FormList = memo(
  (props: {
    title: string;
    isNextCode?: boolean;
    config: Array<FormItemConfig>;
    value: FormItemValue;
    onChange: (val: FormItemValue) => void;
    parentCode: string;
    parent: string;
    isArr?: boolean;
  }) => {
    const [isShow, setIsShow] = useState(false);
    const onChangeItem = (code: string, value: any) => {
      let v = props.value ? props.value : {};
      setFlatObj(v, (props.parent + '.' || '') + code, value);
      if (props.isArr && !Array.isArray(v)) {
        const keys = Object.keys(v).sort((a, b) => Number(a) - Number(b));
        const arr = [];
        keys.forEach((it) => {
          arr[it] = v[it];
        });
        v = arr;
      }
      props.onChange(v);
    };
    const changeShow = () => {
      setIsShow(!isShow);
    };
    const list = [];

    for (let i = 0; i < props.config.length; i++) {
      const item = props.config[i];

      if (item.inputType === 'children') {
        list.push(
          <FormList
            isNextCode={true}
            title={item.title as string}
            value={props.value}
            key={item.title}
            config={item.config as Array<FormItemConfig>}
            parentCode={props.parentCode + '.' + item.title}
            onChange={props.onChange}
            parent={props.parent}
          />
        );
      } else {
        const key = (props.parent + '.' || '') + item.code;
        const val = getFlatObj(props.value, key) || item.default;
        list.push(<FormItem {...item} parent={props.parent} value={val} key={key} onChange={onChangeItem} />);
      }
    }

    // const isItem = useMemo(() => getFlatObj(props.value, props.parentCode), [props.value, props.parentCode]);

    // const onChangeTitle = () => {
    //   if (isItem) {
    //     const v = cloneDeep(props.value);
    //     const code = props.parentCode;
    //     setFlatObj(v, code, undefined);
    //     props.onChange(v);
    //   }
    // };
    return (
      <div className={styles.formList}>
        <div className={styles.formTitle}>
          <span onClick={changeShow}>
            {isShow ? <CaretDownOutlined /> : <CaretRightOutlined />} {props.title}
          </span>
          {/* {isItem && props.isNextCode ? (
            <span className={styles.formTitleRight} onClick={onChangeTitle}>
              <DeleteOutlined />
            </span>
          ) : (
            ''
          )} */}
        </div>

        <div
          className={props.isNextCode ? styles.formChild : ''}
          style={{
            display: isShow ? '' : 'none'
          }}
        >
          {list}
        </div>
      </div>
    );
  }
);
