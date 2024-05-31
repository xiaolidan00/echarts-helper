import { InputNumber, Input, ColorPicker, Select, Switch } from 'antd';
import { CaretRightOutlined, CaretDownOutlined } from '@ant-design/icons';
import styles from './FormList.module.scss';
import { useMemo, useState } from 'react';
import { getFlatObj, setFlatObj } from '../../utils/flatObj';
const compMap = {
  number: InputNumber,
  text: Input,
  color: ColorPicker,
  select: Select,
  boolean: Switch
};
export interface FormItemConfig {
  inputType: keyof typeof compMap;
  code: string;
  default?: number | string | boolean;
  step?: number;
  options?: Array<string>;
  min?: number;
  max?: number;
  nextCode?: string;
}
export interface FormItemValue {
  [n: string | number]: any;
}

export const FormItem = (
  props: FormItemConfig & {
    value: unknown;
    onChange: (code: string, value: any) => void;
  }
) => {
  const InputEl = compMap[props.inputType] || Input;
  const formName = useMemo(() => {
    const c = props.code;
    return c.substring(c.lastIndexOf('.') + 1);
  }, [props.code]);
  const changeValue = (ev: any) => {
    if (props.inputType === 'color') {
      props.onChange(props.code, ev.toRgbString());
    } else {
      props.onChange(props.code, ev);
    }
  };
  return (
    <div className={styles.formItem}>
      <span className={styles.formLabel}>{formName}</span>
      <span className={styles.formInput}>
        <InputEl
          style={{ width: '100%' }}
          defaultValue={props.value || props.default}
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
};
export const FormList = (props: {
  title?: string;
  isNextCode?: boolean;
  config: Array<FormItemConfig>;
  value: FormItemValue;
  onChange: (val: FormItemValue) => void;
}) => {
  const [isShow, setIsShow] = useState(false);
  const onChangeItem = (code: string, value: any) => {
    const v = props.value;
    setFlatObj(v, code, value);
    props.onChange(v);
  };
  const changeShow = () => {
    setIsShow(!isShow);
  };
  const list = [];
  const listMap: { [n: string]: Array<FormItemConfig> } = {};
  for (let i = 0; i < props.config.length; i++) {
    const item = props.config[i];
    const c = props.isNextCode && item.nextCode ? item.nextCode : item.code;
    if (c.indexOf('.') > 1) {
      const k = c.substring(0, c.indexOf('.'));
      listMap[k] = (listMap[k] || []).concat({
        ...item,
        nextCode: c.substring(c.indexOf('.') + 1)
      });
    } else {
      list.push(<FormItem {...item} value={getFlatObj(props.value, c)} onChange={onChangeItem} />);
    }
  }
  if (Object.keys(listMap).length) {
    for (let k in listMap) {
      list.push(
        <FormList isNextCode={true} title={k} value={props.value} config={listMap[k]} onChange={props.onChange} />
      );
    }
  }

  return (
    <div className={styles.formList}>
      {props.title ? (
        <div onClick={changeShow} className={styles.formTitle}>
          {isShow ? <CaretDownOutlined /> : <CaretRightOutlined />} {props.title}
        </div>
      ) : (
        ''
      )}
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
};
