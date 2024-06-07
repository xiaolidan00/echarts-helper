import { CaretRightOutlined, CaretDownOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { ScrollTabs, type TabsItem } from '../ScrollTabs/ScrollTabs';
import { useEffect, useMemo, useState } from 'react';
import { FormItemConfig1, FormItemValue } from './config';
import styles from './FormList.module.scss';
import { FormList } from './FormList';
import { Empty } from 'antd';
export const FormArr = (props: {
  title: string;
  config: Array<FormItemConfig1>;
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

            <FormList value={currentVal} config={newconfig} onChange={onChangeVal}></FormList>
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
