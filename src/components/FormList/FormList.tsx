import { InputNumber, Input, ColorPicker, Select, Checkbox } from 'antd';
import { CaretRightOutlined, CaretDownOutlined, DeleteOutlined } from '@ant-design/icons';
import styles from './FormList.module.scss';
import { useMemo, useState, memo } from 'react';
import { getFlatObj, setFlatObj } from '../../utils/flatObj';
const compMap = {
  number: InputNumber,
  text: Input,
  color: ColorPicker,
  select: Select,
  boolean: Checkbox
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

export const FormItem = memo(
  (
    props: FormItemConfig & {
      value: unknown;
      parent: string;
      onChange: (code: string, value: any) => void;
    }
  ) => {
    const InputEl = compMap[props.inputType] || Input;
    const formName = useMemo(() => {
      const c = props.code;
      return c.substring(c.lastIndexOf('.') + 1);
    }, [props.code]);
    const formCode = useMemo(() => props.parent + '.' + props.code, [props.parent, props.code]);
    const changeValue = (ev: any) => {
      const code = formCode;
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
        <span className={styles.formLabel}>{formName}</span>
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
        const key = props.parent + '.' + item.code;
        const val = getFlatObj(props.value, key) || item.default;
        list.push(<FormItem {...item} parent={props.parent} value={val} key={key} onChange={onChangeItem} />);
      }
    }
    if (Object.keys(listMap).length) {
      for (const k in listMap) {
        list.push(
          <FormList
            isNextCode={true}
            title={k}
            value={props.value}
            key={k}
            config={listMap[k]}
            parentCode={props.parentCode + '.' + k}
            onChange={props.onChange}
            parent={props.title}
          />
        );
      }
    }
    const isItem = useMemo(() => getFlatObj(props.value, props.parentCode), [props.value, props.parentCode]);

    const onChangeTitle = () => {
      if (isItem) {
        const v = props.value;
        const code = props.parentCode;
        setFlatObj(v, code, undefined);
        props.onChange(v);
      }
    };
    console.log(props.parentCode);
    return (
      <div className={styles.formList}>
        <div className={styles.formTitle}>
          <span onClick={changeShow}>
            {isShow ? <CaretDownOutlined /> : <CaretRightOutlined />} {props.title}
          </span>
          {isItem && props.isNextCode ? (
            <span className={styles.formTitleRight} onClick={onChangeTitle}>
              <DeleteOutlined />
            </span>
          ) : (
            ''
          )}
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
