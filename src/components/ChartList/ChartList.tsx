import { type DragEvent } from 'react';
import styles from './ChartList.module.scss';
import optionsKeys from './optionsKeys';

import { CloseOutlined } from '@ant-design/icons';

export const ChartList = (props: {
  chartOptions: string[];
  chartSeries: string[];
  onChange: (type: string, v: string[]) => void;
}) => {
  let dragItem: HTMLElement;
  const onDragStart = (ev: DragEvent) => {
    dragItem = ev.target as HTMLElement;
  };
  const onDragOver = (ev: DragEvent) => {
    ev.preventDefault();
  };
  const onDragItem = (ev: DragEvent, type: string) => {
    ev.preventDefault();
    console.log(ev, type);
    const item = dragItem.dataset.item as string;
    if (type === 'series') {
      if (item.indexOf('series') === -1) return;

      const v = props.chartSeries;
      v.push(item);
      props.onChange(type, [...v]);
    } else {
      if (item.indexOf('series') > -1 || props.chartOptions.includes(item)) return;
      const v = props.chartOptions;
      v.push(item);
      props.onChange(type, [...v]);
    }
  };
  const onDelItem = (type: string, idx: number) => {
    if (type === 'series') {
      const v = props.chartSeries;
      v.splice(idx, 1);
      props.onChange(type, [...v]);
    } else {
      const v = props.chartOptions;
      v.splice(idx, 1);
      props.onChange(type, [...v]);
    }
  };

  return (
    <div className={styles.chartList}>
      <div className={styles.chartOptions}>
        {optionsKeys.map((it) => (
          <span draggable data-item={it} onDragStart={onDragStart} className={styles.optionItem} key={it}>
            {it}
          </span>
        ))}
      </div>
      <div className={styles.chartSelect}>
        <div className={styles.title}>配置项</div>
        <div className={styles.dragBox} onDrop={(ev) => onDragItem(ev, 'options')} onDragOver={onDragOver}>
          {props.chartOptions.map((it, idx) => (
            <span data-item={it} className={styles.optionItem} key={'op-' + it + idx}>
              {it} <CloseOutlined onClick={() => onDelItem('options', idx)} className={styles.deleteIcon} />
            </span>
          ))}
        </div>
        <div className={styles.title}>系列</div>
        <div className={styles.dragBox} onDrop={(ev) => onDragItem(ev, 'series')} onDragOver={onDragOver}>
          {props.chartSeries.map((it, idx) => (
            <span data-item={it} className={styles.optionItem} key={'s-' + it + idx}>
              {it} <CloseOutlined onClick={() => onDelItem('series', idx)} className={styles.deleteIcon} />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
