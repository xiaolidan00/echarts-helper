import fs from 'node:fs';
import options from './options.js';
const labelKey = {
  show: '显示',
  color: '颜色',
  formatter: '格式化',
  borderType: '边框类型',
  borderColor: '边框颜色',
  borderWidth: '边框粗细',
  backgroundColor: '背景颜色',
  borderRadius: '圆角',
  center: '中心位置',
  padding: '内边距',
  fontSize: '字体大小',
  fontFamily: '字体系列',
  fontWeight: '字体粗细',
  fontStyle: '字体样式',
  lineHeight: '行高',
  width: '宽度',
  height: '高度',
  symbol: '形状',
  symbolSize: '形状大小',
  symbolOffset: '形状偏移',
  shadowBlur: '阴影大小',
  shadowColor: '阴影颜色',
  shadowOffsetX: ''
};
async function transformEchartsItem(name, cfg) {
  let data;
  try {
    data = await import(`./echarts/${name}.js`).then((res) => res.default);
  } catch (error) {
    data = cfg;
  }
  const list = [];
  for (let k in data) {
    if (k.indexOf('.<') > 1) continue;
    const item = data[k];
    const c = item.uiControl;
    const key = k.substring(k.lastIndexOf('.') + 1);
    const set = { inputType: 'text', label: key };
    if (c) {
      if (c.type === 'enum') {
        set.inputType = 'select';
        set.options = c.options.split(',');
        set.options.default = c.default;
      } else if (c.type === 'number') {
        set.inputType = 'number';
        if (c.min !== undefined) {
          set.min = Number(c.min);
        }
        if (c.max !== undefined) {
          set.max = Number(c.max);
        }
        if (c.step !== undefined) {
          set.step = Number(c.step);
        }
      } else if (c.type === 'color') {
        set.inputType = 'color';
      } else if (c.type === 'boolean') {
        set.inputType = 'boolean';
      }
      if (c.default !== 'null' && c.default !== 'undefined' && c.default !== undefined) {
        set.default = c.type === 'number' ? Number(c.default) : c.type === 'boolean' ? Boolean(c.default) : c.default;
      }
    }
    list.push({
      code: k,
      ...set
    });
  }
  const formList = getChildForm(list);
  fs.writeFileSync(`../public/form/${name}.json`, JSON.stringify(formList));
  console.log(name + ' ok');
}
function getChildForm(formList) {
  const list = [];
  const listMap = {};
  formList.forEach((item) => {
    const c = item.nextCode || item.code;
    if (c.indexOf('.') > 1) {
      const k = c.substring(0, c.indexOf('.'));
      const l = {
        ...item,
        nextCode: c.substring(c.indexOf('.') + 1)
      };
      if (listMap[k]) {
        listMap[k].push(l);
      } else {
        listMap[k] = [l];
      }
    } else {
      list.push(item);
    }
  });
  if (Object.keys(listMap).length) {
    for (const k in listMap) {
      list.push({
        inputType: 'children',
        isArr: k === 'data',
        title: k,
        config: getChildForm(listMap[k])
      });
    }
  }
  return list;
}
async function getFroms() {
  for (let k in options) {
    await transformEchartsItem(k, options[k]);
  }
}
getFroms();
