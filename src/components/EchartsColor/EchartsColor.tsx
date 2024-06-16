import { ColorPicker, Select, type ColorPickerProps } from 'antd';
import { Color, LinearGradientObject, RadialGradientObject } from 'echarts';
import { useEffect, useRef, useState } from 'react';
import styles from './EchartsColor.module.scss';

const grdOptions = [
  {
    label: '上',
    value: 'top'
  },
  {
    label: '下',
    value: 'bottom'
  },
  {
    label: '左',
    key: 'left'
  },
  {
    label: '右',
    value: 'right'
  },
  {
    label: '左上',
    value: 'leftTop'
  },
  {
    label: '右上',
    value: 'rightTop'
  },
  {
    label: '左下',
    value: 'leftBottom'
  },
  {
    label: '右下',
    value: 'rightBottom'
  },
  {
    label: '圆形',
    value: 'circle'
  }
];
const grdMap = {
  bottom: { type: 'linear', x: 0, y: 0, x2: 0, y2: 1 },
  top: { type: 'linear', x: 0, y: 1, x2: 0, y2: 0 },
  left: { type: 'linear', x: 1, y: 0, x2: 0, y2: 0 },
  right: { type: 'linear', x: 0, y: 0, x2: 1, y2: 0 },
  leftTop: { type: 'linear', x: 1, y: 1, x2: 0, y2: 0 },
  rightTop: { type: 'linear', x: 0, y: 1, x2: 1, y2: 0 },
  leftBottom: { type: 'linear', x: 1, y: 0, x2: 0, y2: 1 },
  rightBottom: { type: 'linear', x: 0, y: 0, x2: 1, y2: 1 },
  circle: { type: 'radial', x: 0.5, y: 0.5, r: 0.5 }
};
const grdD = {
  leftTop: 'left top',
  rightTop: 'right top',
  leftBottom: 'left bottom',
  rightBottom: 'right bottom'
};
type EchartsGrdType = LinearGradientObject | RadialGradientObject;
export const EchartsColor = (props: { value: Color; onChange: (v: Color) => void }) => {
  const [activeTab, setActiveTab] = useState<0 | 1>(0);
  const [grdType, setGrdType] = useState('bottom');

  const [color1, setColor1] = useState<string>('#FF0000');
  const [color2, setColor2] = useState('#FF0000');
  const isLock = useRef(false);
  const onResult = (p: { c1: string; c2: string; g: string; t: number }) => {
    if (isLock.current) return;
    isLock.current = true;
    setTimeout(() => {
      let v;
      if (p.t === 0) {
        v = p.c1;
      } else {
        v = {
          ...grdMap[p.g],
          colorStops: [
            {
              offset: 0,
              color: p.c1 // 0% 处的颜色
            },
            {
              offset: 1,
              color: p.c2 // 100% 处的颜色
            }
          ],
          global: false // 缺省为 false
        };
      }
      props.onChange(v);

      isLock.current = false;
    }, 100);
  };
  const onChangeColor1: ColorPickerProps['onChange'] = (ev) => {
    const v = ev.toRgbString();
    if (v !== color1) {
      setColor1(v);
      onResult({ c1: v, c2: color2, g: grdType, t: activeTab });
    }
  };
  const onChangeColor2: ColorPickerProps['onChange'] = (ev) => {
    const v = ev.toRgbString();
    if (v !== color2) {
      setColor2(v);
      onResult({ c1: color1, c2: v, g: grdType, t: activeTab });
    }
  };
  const onChangeTab = async () => {
    const v = activeTab === 1 ? 0 : 1;
    setActiveTab(v);

    onResult({ c1: color1, c2: color2, g: grdType, t: v });
  };

  const onChangeGrd = (v: string) => {
    setGrdType(v);
    onResult({ c1: color1, c2: color2, g: v, t: activeTab });
  };
  useEffect(() => {
    if (isLock) return;
    console.log('parse', props.value);
    if (!props.value) {
      setColor1('#FF0000');
    } else {
      if (typeof props.value === 'string') {
        if (activeTab !== 0) setActiveTab(0);
        if (color1 != props.value) setColor1(props.value);
      } else if (typeof props.value === 'object') {
        if (activeTab !== 1) setActiveTab(1);

        const v = props.value as EchartsGrdType;
        let g = 'bottom';
        if (v.type === 'radial') {
          g = 'circle';
        } else {
          for (const k in grdMap) {
            const a = grdMap[k];
            if (a.x === v.x && a.x2 === v.x2 && a.y === v.y && a.y2 === v.y2) {
              g = k;
              break;
            }
          }
        }
        if (g !== grdType) {
          setGrdType(g);
        }
        if (color1 !== v.colorStops[0].color) setColor1(v.colorStops[0].color);
        if (color2 !== v.colorStops[1].color) setColor2(v.colorStops[1].color);
      }
    }
    return () => {};
  }, [props.value]);
  let resultColor = color1;
  if (activeTab === 1) {
    if (grdType === 'circle') {
      resultColor = `radial-gradient(${color1}, ${color2})`;
    } else {
      resultColor = `linear-gradient(to ${grdD[grdType] || grdType}, ${color1}, ${color2})`;
    }
  }
  return (
    <div className={styles.EchartsColor}>
      <div className={styles.colorSpan}>
        <div style={{ background: resultColor }}></div>
      </div>
      <span onClick={onChangeTab} className={styles.colorGrd}>
        {activeTab === 1 ? '渐变' : '纯色'}
      </span>
      <ColorPicker value={color1} onChange={onChangeColor1}></ColorPicker>

      <ColorPicker
        style={{ display: activeTab === 1 ? '' : 'none' }}
        value={color2}
        onChange={onChangeColor2}
      ></ColorPicker>

      <Select
        style={{ display: activeTab === 1 ? '' : 'none', width: '72px' }}
        value={grdType}
        size="small"
        onChange={onChangeGrd}
        options={grdOptions}
      ></Select>
    </div>
  );
};
