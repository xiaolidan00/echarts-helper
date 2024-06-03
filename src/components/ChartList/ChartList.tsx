import { useEffect, useRef, useState, type DragEvent } from 'react';
import styles from './ChartList.module.scss';
import optionsKeys from './optionsKeys';
import { useImmer } from 'use-immer';
import { CloseOutlined } from '@ant-design/icons';
import { onDragSort } from '../../utils/dagSort';
export const ChartList = () => {
  const seriesRef = useRef<HTMLDivElement>();
  const optionsRef = useRef<HTMLDivElement>();
  const [isLock, setIsLock] = useState(false);
  const [selectOptionsItems, updateOptionsItems] = useImmer<string[]>([]);
  const [selectSeriesItems, updateSeriesItems] = useImmer<string[]>([]);

  let dragItem: HTMLElement;
  const onDrag = (ev: DragEvent) => {
    dragItem = ev.target as HTMLElement;
  };
  const lock = {
    series: false
  };
  const onDragItem = (type: string) => {
    const item = dragItem.dataset.item;
    if (type === 'series') {
      if (isLock || !item) return;
      if (item.indexOf('series') === -1) return;

      setIsLock(true);
      updateSeriesItems((a) => {
        a.push(item);
      });
      setTimeout(() => {
        setIsLock(false);
      }, 1000);
    } else {
      if (item && (item.indexOf('series') > -1 || selectOptionsItems.includes(item))) return;
      updateOptionsItems((a) => {
        a.push(item);
      });
    }
  };
  const onDelItem = (type: string, idx: number) => {
    if (type === 'series') {
      updateSeriesItems((a) => {
        a.splice(idx, 1);
      });
    } else {
      updateOptionsItems((a) => {
        a.splice(idx, 1);
      });
    }
  };
  const dragSortOp = onDragSort({
    onEnd: ({ sourceIndex, targetIndex }) => {
      updateOptionsItems((data) => {
        const temp = data[sourceIndex];
        data[sourceIndex] = data[targetIndex];
        data[targetIndex] = temp;
      });
    }
  });
  const dragSortSeries = onDragSort({
    onEnd: ({ sourceIndex, targetIndex }) => {
      updateSeriesItems((data) => {
        const temp = data[sourceIndex];
        data[sourceIndex] = data[targetIndex];
        data[targetIndex] = temp;
      });
    }
  });
  useEffect(() => {
    dragSortOp.init(optionsRef.current as HTMLElement);
    dragSortSeries.init(seriesRef.current as HTMLElement);
    return () => {
      dragSortOp.destroy();
      dragSortSeries.destroy();
    };
  }, []);
  return (
    <div className={styles.chartList}>
      <div className={styles.chartOptions}>
        {optionsKeys.map((it) => (
          <span draggable data-item={it} onDrag={onDrag} className={styles.optionItem} key={it}>
            {it}
          </span>
        ))}
      </div>
      <div className={styles.chartSelect}>
        <div className={styles.title}>配置项</div>
        <div className={styles.dragBox} ref={optionsRef} onDragEnter={() => onDragItem('options')}>
          {selectOptionsItems.map((it, idx) => (
            <span
              data-item={it}
              onClick={() => onDelItem('options', idx)}
              className={styles.optionItem}
              key={'op-' + it + idx}
            >
              {it} <CloseOutlined className={styles.deleteIcon} />
            </span>
          ))}
        </div>
        <div className={styles.title}>系列</div>
        <div className={styles.dragBox} ref={seriesRef} onDragEnter={() => onDragItem('series')}>
          {selectSeriesItems.map((it, idx) => (
            <span data-item={it} className={styles.optionItem} key={'s-' + it + idx}>
              {it} <CloseOutlined onClick={() => onDelItem('series', idx)} className={styles.deleteIcon} />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
