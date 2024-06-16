import { InputNumber, Input, Select, Checkbox } from 'antd';
import { FC, memo, useEffect, useState } from 'react';
import { FormInputProps1 } from './config';
import styles from './FormList.module.scss';
import { EchartsColor } from '../EchartsColor/EchartsColor';
import { SymbolPicker } from '../SymbolPicker/SymbolPicker';
import { AdcodeSelect } from '../AdcodeSelect/AdcodeSelect';
const compMap = {
  number: InputNumber,
  text: Input,
  color: EchartsColor,
  select: Select,
  boolean: Checkbox,
  symbol: SymbolPicker,
  adcode: AdcodeSelect
};

export const FormItem = memo(
  (
    props: FormInputProps1 & {
      onChange: (code: string, value: any) => void;
    }
  ) => {
    //临时值
    const [propVal, setPropVal] = useState(props.value);
    //动态输入组件
    const InputEl: any | FC = compMap[props.inputType];

    const changeValue = (ev: any) => {
      const code = props.code;
      let v;
      //文本输入类型
      if (props.inputType === 'text') {
        v = ev.target.value;
        //勾选框
      } else if (props.inputType === 'boolean') {
        v = ev.target.checked;
      } else {
        v = ev;
      }
      setPropVal(v);
      props.onChange(code, v);
    };
    //监听值更新
    useEffect(() => {
      setPropVal(props.value);
      return () => {};
    }, [props.value]);

    //不同输入类型的属性
    let attrs = {};
    if (props.inputType === 'number') {
      //数值输入
      attrs = { value: propVal, min: props.min, step: props.step, max: props.max };
    } else if (props.inputType === 'boolean') {
      //勾选框
      attrs = { checked: propVal === true };
    } else if (props.inputType === 'select') {
      //下拉框
      attrs = { value: propVal, options: props.options.map((it) => ({ label: it, value: it })) };
    } else {
      attrs = { value: propVal };
    }

    return (
      <div className={styles.formItem}>
        {/* 显示文本 */}
        {props.label ? <span className={styles.formLabel}>{props.label}</span> : ''}
        <span className={styles.formInput}>
          <InputEl {...attrs} onChange={changeValue} size="small" />
        </span>
      </div>
    );
  }
);
