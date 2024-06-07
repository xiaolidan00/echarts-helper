import { InputNumber, Input, ColorPicker, Select, Checkbox } from 'antd';
import { FC, memo, useEffect, useState } from 'react';
import { FormInputProps1 } from './config';
import styles from './FormList.module.scss';
const compMap = {
  number: InputNumber,
  text: Input,
  color: ColorPicker,
  select: Select,
  boolean: Checkbox
};

export const FormItem = memo(
  (
    props: FormInputProps1 & {
      onChange: (code: string, value: any) => void;
    }
  ) => {
    const [propVal, setPropVal] = useState(props.value);

    const InputEl: any | FC = compMap[props.inputType];

    const changeValue = (ev: any) => {
      const code = props.code;
      let v;
      if (props.inputType === 'color') {
        v = ev.toRgbString();
      } else if (props.inputType === 'text') {
        (v = code), ev.target.value;
      } else if (props.inputType === 'boolean') {
        v = ev.target.checked;
      } else {
        v = ev;
      }
      setPropVal(v);
      props.onChange(code, v);
    };
    useEffect(() => {
      setPropVal(props.value);
      return () => {};
    }, [props.value]);
    let attrs = {};
    if (props.inputType === 'number') {
      attrs = { value: propVal, min: props.min, step: props.step, max: props.max };
    } else if (props.inputType === 'boolean') {
      attrs = { checked: propVal };
    } else if (props.inputType === 'select') {
      attrs = { value: propVal, options: props.options.map((it) => ({ label: it, value: it })) };
    } else {
      attrs = { value: propVal };
    }
    // console.log('refresh', props.code);

    return (
      <div className={styles.formItem}>
        {props.label ? <span className={styles.formLabel}>{props.label}</span> : ''}
        <span className={styles.formInput}>
          <InputEl {...attrs} onChange={changeValue} size="small" />
        </span>
      </div>
    );
  }
);
