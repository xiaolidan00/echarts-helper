//拖拽排序
export interface DragSortEvent {
  event: MouseEvent;
  sourceIndex?: number;
  sourceNode?: HTMLElement;
  target?: HTMLElement;
  targetIndex?: number;
  data?: any[];
}
export interface DragSortConfig {
  data?: any[];
  activeStyle?: {
    [n: string]: string;
  };
  activeClass?: string;
  onStart?: (e: DragSortEvent) => void;
  onChange?: (e: DragSortEvent) => void;
  onEnd?: (e: DragSortEvent) => void;
  onMove?: (e: MouseEvent) => void;
}

const defaultConfig = {
  data: [],
  activeStyle: {
    cursor: 'move'
  },
  activeClass: 'moving',
  onStart: (e: DragSortEvent) => {
    console.log(e);
  },
  onChange: (e: DragSortEvent) => {
    console.log(e);
  },
  onEnd: (e: DragSortEvent) => {
    console.log(e);
  },
  onMove: (e: MouseEvent) => {
    console.log(e);
  }
};

export function onDragSort(config: DragSortConfig = defaultConfig) {
  let container: HTMLElement;
  let children: HTMLElement[];
  let sourceNode: HTMLElement;
  let defatultStyle = {};
  const data = config.data ? [...config.data] : [];
  const setChildDraggable = () => {
    const cs = Array.from(container.children);
    for (let i = 0; i < cs.length; i++) {
      cs[i].setAttribute('draggable', 'true');
    }
    children = cs as HTMLElement[];
  };
  const setOneDraggable = () => {
    for (let i = 0; i < children.length; i++) {
      if (children[i] === sourceNode) {
        children[i].setAttribute('draggable', 'true');
      } else {
        children[i].setAttribute('draggable', 'false');
      }
    }
  };
  const swapData = (startIndex: number, targetIndex: number) => {
    if (config.data) {
      const temp = data[startIndex];
      data[startIndex] = data[targetIndex];
      data[targetIndex] = temp;
    }
  };
  const onDragOver = (e: MouseEvent) => {
    config.onMove && config.onMove(e);
  };
  const onDragEnd = (e: MouseEvent) => {
    for (const k in config.activeStyle) {
      sourceNode.style[k] = defatultStyle[k];
    }
    if (config.activeClass) {
      (e.target as HTMLElement).classList.remove(config.activeClass);
    }
    setChildDraggable();
    config.onEnd && config.onEnd({ event: e, data: config.data });
  };
  const onDragStart = (e: MouseEvent) => {
    setOneDraggable();
    sourceNode = e.target as HTMLElement;
    defatultStyle = {};
    for (const k in config.activeStyle) {
      defatultStyle[k] = sourceNode.style[k];
      sourceNode.style[k] = config.activeStyle[k];
    }
    if (config.activeClass) {
      sourceNode.classList.add(config.activeClass);
    }
    const sourceIndex = children.indexOf(sourceNode);
    config.onStart &&
      config.onStart({
        event: e,
        sourceIndex,
        sourceNode: sourceNode
      });
  };
  const onDragEnter = (e: MouseEvent) => {
    e.preventDefault(); // 清除默认事件
    let target = e.target as HTMLElement;
    if (target === sourceNode || target === container) {
      // 放置目标不是自身元素或者最外层容器时有效
      return;
    }
    while (target.parentNode !== container) {
      target = target.parentNode as HTMLElement;
    }

    const sourceIndex = children.indexOf(sourceNode); // 获取拖动元素的下标
    const targetIndex = children.indexOf(target); // 获取目标元素的下标
    if (sourceIndex > targetIndex) {
      // 向上拖动
      container.insertBefore(sourceNode, target); // 将拖动元素插入目标元素之前
    } else {
      // 向下拖动
      // 将拖动元素插入目标元素之后
      container.insertBefore(sourceNode, children[targetIndex + 1]);
    }
    swapData(targetIndex, sourceIndex);
    // console.log(config.data.map((it) => it.idx));
    config.onChange &&
      config.onChange({
        event: e,
        sourceIndex,
        sourceNode: sourceNode,
        target,
        targetIndex,
        data: data
      });
  };

  return {
    init(el: HTMLElement) {
      container = el;
      container.addEventListener('DOMSubtreeModified', setChildDraggable, false);
      setChildDraggable();
      container.addEventListener('dragstart', onDragStart);
      container.addEventListener('dragover', onDragOver);
      container.addEventListener('dragend', onDragEnd);
      container.addEventListener('dragenter', onDragEnter);
    },
    destroy() {
      container.removeEventListener('dragenter', onDragEnter);
      container.removeEventListener('dragover', onDragOver);
      container.removeEventListener('dragend', onDragEnd);
      container.removeEventListener('dragstart', onDragStart);
      container.removeEventListener('DOMSubtreeModified', setChildDraggable, false);
    }
  };
}
