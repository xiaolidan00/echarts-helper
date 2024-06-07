import { InputNumber, Input, ColorPicker, Select, Checkbox } from 'antd';
import { FC, memo } from 'react';
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
    const InputEl: any | FC = compMap[props.inputType];

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
    let attrs = {};
    if (props.inputType === 'number') {
      attrs = { value: props.value, min: props.min, step: props.step, max: props.max };
    } else if (props.inputType === 'boolean') {
      attrs = { checked: props.value };
    } else if (props.inputType === 'select') {
      attrs = { value: props.value, options: props.options.map((it) => ({ label: it, value: it })) };
    } else {
      attrs = { value: props.value };
    }

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
