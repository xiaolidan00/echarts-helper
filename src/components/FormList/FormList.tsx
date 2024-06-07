import { CaretRightOutlined, CaretDownOutlined } from '@ant-design/icons';
import styles from './FormList.module.scss';
import { useState, memo, useEffect, useMemo } from 'react';
import { getFlatObj, setFlatObj } from '../../utils/flatObj';

import type { FormInputProps, FormItemValue, FormItemConfig } from './config';
import { FormItem } from './FormItem';
import { FormArr } from './FormArr';

export const FormList = memo(
  (props: {
    title?: string;
    isNextCode?: boolean;
    config: Array<FormItemConfig>;
    value: FormItemValue;
    onChange: (val: FormItemValue) => void;
    parent?: string;
    isArr?: boolean;
  }) => {
    const parentPrefix = props.parent ? props.parent + '.' : '';
    const initVal = props.isArr ? [] : {};
    const [propVal, setPropVal] = useState<FormItemValue>(props.value || initVal);
    const [isShow, setIsShow] = useState(false);
    useEffect(() => {
      setPropVal(props.value);
      return () => {};
    }, [props.value]);
    const onChangeItem = (code: string, value: any) => {
      let v = propVal;

      setFlatObj(v, parentPrefix + code, value);
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
    const getFormItem = (item: FormInputProps, key: string) => {
      let val = getFlatObj(propVal, key);
      if (val === undefined) val = item.default;

      return <FormItem {...item} value={val} key={key} code={item.code} onChange={onChangeItem} />;
    };
    const list: any[] = [];

    for (let i = 0; i < props.config.length; i++) {
      const item = props.config[i];
      const key = parentPrefix + item.code;

      if (item.inputType === 'arr') {
        const val = getFlatObj(propVal, key);
        list.push(
          <FormArr
            title={item.title}
            value={val}
            key={key}
            code={key}
            config={item.config}
            onChange={onChangeArr}
          ></FormArr>
        );
      } else if (item.inputType === 'children') {
        list.push(
          <FormList
            isNextCode={true}
            title={item.title}
            value={propVal}
            key={key}
            config={item.config as FormItemConfig[]}
            onChange={props.onChange}
            parent={props.parent}
          ></FormList>
        );
      } else if (item.inputType === 'multi') {
        const cfg = item.config as FormInputProps[];
        const items: any[] = [];
        for (let j = 0; j < cfg.length; j++) {
          const it = cfg[j];
          const kk = parentPrefix + it.code;
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
