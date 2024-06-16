import { CaretRightOutlined, CaretDownOutlined } from '@ant-design/icons';
import styles from './FormList.module.scss';
import { useState, memo, useEffect } from 'react';
import { getFlatObj, setFlatObj } from '../../utils/flatObj';

import type { FormInputProps, FormItemValue, FormItemConfig } from './config';
import { FormItem } from './FormItem';
import { FormArr } from './FormArr';

export const FormList = memo(
  (props: {
    title?: string; //标题
    isNextCode?: boolean; //是否子级
    config: Array<FormItemConfig>; //表单配置
    value: FormItemValue; //值的对象
    onChange: (val: FormItemValue) => void;
    parent?: string; //父级code
    isArr?: boolean; //是否数组
  }) => {
    const initVal = props.isArr ? [] : {};
    const [propVal, setPropVal] = useState<FormItemValue>(props.value || initVal);
    const [isShow, setIsShow] = useState(false);
    //监听值更新
    useEffect(() => {
      setPropVal(props.value);
      return () => {};
    }, [props.value]);
    //单个输入项更新，采用扁平属性设置`setFlatObj`
    const onChangeItem = (code: string, value: any) => {
      let v = propVal;
      const parentPrefix = props.parent ? props.parent + '.' : '';
      setFlatObj(v, parentPrefix + code, value);
      //isArr时转换为数组
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
    //展开配置和收起配置
    const changeShow = () => {
      setIsShow(!isShow);
    };
    //数组表单面板更新
    const onChangeArr = (code: string, value: FormItemValue) => {
      const v = propVal;
      setFlatObj(v, code, value);
      props.onChange(v);
    };
    //获取单个输入项
    const getFormItem = (item: FormInputProps, key: string) => {
      let val = getFlatObj(propVal, key);
      if (val === undefined) val = item.default;

      return <FormItem {...item} value={val} key={item.id} code={item.code} onChange={onChangeItem} />;
    };
    const list: any[] = [];
    const p = props.parent ? props.parent + '.' : '';
    for (let i = 0; i < props.config.length; i++) {
      const item = props.config[i];

      const key = p + item.code;

      if (item.inputType === 'arr') {
        //数组表单面板
        const val = getFlatObj(propVal, key);
        list.push(
          <FormArr
            title={item.title}
            value={val}
            key={item.id}
            code={key}
            config={item.config}
            onChange={onChangeArr}
          ></FormArr>
        );
      } else if (item.inputType === 'children') {
        //子级表单面板
        list.push(
          <FormList
            isNextCode={true}
            title={item.title}
            value={propVal}
            key={item.id}
            config={item.config as FormItemConfig[]}
            onChange={props.onChange}
            parent={props.parent}
          ></FormList>
        );
      } else if (item.inputType === 'multi') {
        //多个输入并列
        const cfg = item.config as FormInputProps[];
        const items: any[] = [];
        for (let j = 0; j < cfg.length; j++) {
          const it = cfg[j];
          const kk = p + it.code;
          items.push(getFormItem(it, kk));
        }
        list.push(<div key={item.id}>{items}</div>);
      } else {
        //单个输入项
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
