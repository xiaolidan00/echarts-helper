import { type DragEvent } from 'react';
import styles from './ChartList.module.scss';
import optionsKeys from './optionsKeys';
import { useImmer } from 'use-immer';
import { CloseOutlined } from '@ant-design/icons';
export const ChartList = () => {
  const [selectItems, updateSelectItems] = useImmer<string[]>([]);
  const [selectOptionsItems, updateOptionsItems] = useImmer<string[]>([]);
  const [selectSeriesItems, updateSeriesItems] = useImmer<string[]>([]);
  const onSelectItem = (it: string) => {
    // const items = selectItems;
    // if (!items.includes(it)) {
    //   updateSelectItems((a) => {
    //     a.push(it);
    //   });
    // } else {
    //   updateSelectItems((a) => {
    //     const i = a.findIndex((b: string) => b === it);
    //     a.splice(i, 1);
    //   });
    // }
  };
  let dragItem: HTMLElement;
  const onDrag = (ev: DragEvent) => {
    dragItem = ev.target as HTMLElement;
  };

  const onDragItem = (type: string) => {
    const item = dragItem.dataset.item;
    if (type === 'series') {
      if (item && (item.indexOf('series') === -1 || selectSeriesItems.includes(item))) return;
      updateSeriesItems((a) => {
        a.push(item);
      });
    } else {
      if (item && (item.indexOf('series') > -1 || selectOptionsItems.includes(item))) return;
      updateOptionsItems((a) => {
        a.push(item);
      });
    }
  };
  const onDelItem = (type: string, it: string) => {
    if (type === 'series') {
      const idx = selectSeriesItems.findIndex((i) => i === it);
      updateSeriesItems((a) => {
        a.splice(idx, 1);
      });
    } else {
      const idx = selectOptionsItems.findIndex((i) => i === it);
      updateOptionsItems((a) => {
        a.splice(idx, 1);
      });
    }
  };
  return (
    <div className={styles.chartList}>
      <div className={styles.chartOptions}>
        {optionsKeys.map((it) => (
          <span
            onClick={() => onSelectItem(it)}
            draggable
            data-item={it}
            onDrag={onDrag}
            className={`${selectItems.includes(it) ? styles.active : ''} ${styles.optionItem}`}
            key={it}
          >
            {it}
          </span>
        ))}
      </div>
      <div className={styles.chartSelect}>
        <div className={styles.title}>配置项</div>
        <div className={styles.dragBox} onDragEnter={() => onDragItem('options')}>
          {selectOptionsItems.map((it) => (
            <span
              data-item={it}
              onClick={() => onDelItem('options', it)}
              className={styles.optionItem}
              key={'op-' + it}
            >
              {it} <CloseOutlined className={styles.deleteIcon} />
            </span>
          ))}
        </div>
        <div className={styles.title}>系列</div>
        <div className={styles.dragBox} onDragEnter={() => onDragItem('series')}>
          {selectSeriesItems.map((it) => (
            <span data-item={it} className={styles.optionItem} key={'s-' + it}>
              {it} <CloseOutlined onClick={() => onDelItem('series', it)} className={styles.deleteIcon} />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
