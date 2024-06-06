import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import styles from './ScrollTabs.module.scss';
import { useEffect, useMemo, useRef, useState } from 'react';
export interface TabsItem {
  label: string;
  value: string | number;
}
export const ScrollTabs = (props: {
  tabs: TabsItem[];
  active: string | number;
  onChange: (v: number | string) => void;
  itemWidth: number;
}) => {
  const tabRef = useRef(null);
  const [x, setX] = useState(0);
  const [pageNum, setPageNum] = useState<number>(4);
  const handleSlide = (type: string) => {
    if (!tabRef.current) return;
    const tabWidth = (tabRef.current as HTMLElement).offsetWidth;
    const n = Math.floor(tabWidth / props.itemWidth);
    setPageNum(n);
    const total = props.tabs.length;
    const pageWidth = props.itemWidth * n;
    const maxMove = Math.ceil(total / 4) * pageWidth - tabWidth;
    if (type === 'prev' && x === 0) return;
    if (type === 'next' && (x >= maxMove || total === 4)) return;
    if (type === 'prev') {
      setX(x - pageWidth);
    } else {
      setX(x + pageWidth);
    }
  };
  useEffect(() => {
    if (props.tabs.length < 5) {
      setX(0);
    } else {
      const currentIndex = props.tabs.findIndex((it) => it.value === props.active);

      setX(props.itemWidth * pageNum * Math.floor(currentIndex / pageNum));
    }
  }, [props.tabs.length]);
  const itemStyle = useMemo(() => ({ width: props.itemWidth + 'px' }), [props.itemWidth]);
  return (
    <div className={styles.scrollTabs}>
      <LeftOutlined onClick={() => handleSlide('prev')} />
      <div className={styles.tabContainer} ref={tabRef}>
        <ul style={{ transform: `translateX(-${x}px)` }}>
          {props.tabs.map((it) => (
            <li
              style={itemStyle}
              key={it.value}
              onClick={() => props.onChange(it.value)}
              className={props.active === it.value ? styles.active : ''}
            >
              {it.label}
            </li>
          ))}
        </ul>
      </div>
      <RightOutlined onClick={() => handleSlide('next')} />
    </div>
  );
};
