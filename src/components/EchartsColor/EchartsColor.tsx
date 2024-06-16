import { ColorPicker, Select } from 'antd';
import { Color, LinearGradientObject, RadialGradientObject } from 'echarts';
import { useEffect, useState } from 'react';
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
  const [isLock, setIsLock] = useState(false);
  const onResult = () => {
    if (isLock) return;
    setIsLock(true);
    setTimeout(() => {
      let v;
      if (activeTab === 0) {
        v = color1;
      } else {
        v = {
          ...grdMap[grdType],
          colorStops: [
            {
              offset: 0,
              color: color1 // 0% 处的颜色
            },
            {
              offset: 1,
              color: color2 // 100% 处的颜色
            }
          ],
          global: false // 缺省为 false
        };
      }
      props.onChange(v);
      setTimeout(() => {
        setIsLock(false);
      }, 100);
    }, 100);
  };
  const onChangeColor1 = (ev) => {
    if (ev.toRgbString() !== color1) {
      setColor1(ev.toRgbString());
      onResult();
    }
  };
  const onChangeColor2 = (ev) => {
    if (ev.toRgbString() !== color2) {
      console.log('color2', ev.toRgbString());
      setColor2(ev.toRgbString());
      onResult();
    }
  };
  const onChangeTab = async () => {
    setActiveTab(activeTab === 1 ? 0 : 1);

    onResult();
  };

  const onChangeGrd = (v: string) => {
    setGrdType(v);
    onResult();
  };
  useEffect(() => {
    if (isLock) return;
    console.log('parse', props.value);
    if (props.value === undefined) {
      setColor1('');
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
