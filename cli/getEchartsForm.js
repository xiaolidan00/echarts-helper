import fs from 'node:fs';
import options from './options.js';
import cheerio from 'cheerio';
// const labelKey = {
//   show: '显示',
//   color: '颜色',
//   formatter: '格式化',
//   borderType: '边框类型',
//   borderColor: '边框颜色',
//   borderWidth: '边框粗细',
//   backgroundColor: '背景颜色',
//   borderRadius: '圆角',
//   center: '中心位置',
//   padding: '内边距',
//   fontSize: '字体大小',
//   fontFamily: '字体系列',
//   fontWeight: '字体粗细',
//   fontStyle: '字体样式',
//   lineHeight: '行高',
//   width: '宽度',
//   height: '高度',
//   symbol: '形状',
//   symbolSize: '形状大小',
//   symbolOffset: '形状偏移',
//   shadowBlur: '阴影大小',
//   shadowColor: '阴影颜色',
//   shadowOffsetX: ''
// };
//转换为form配置项
async function transformEchartsItem(name, cfg) {
  let data;
  try {
    data = await import(`./echarts/${name}.js`).then((res) => res.default);
  } catch (error) {
    if (cfg.uiControl) {
      data = { [name]: cfg };
    } else {
      return;
    }
  }
  const list = [];
  let rangeSet = [];
  for (let k in data) {
    if (k.indexOf('.<') > 1) continue;
    const item = data[k];
    const c = item.uiControl;
    const key = k.substring(k.lastIndexOf('.') + 1);
    const set = { inputType: 'text', label: key };
    if (key === 'symbol') {
      //形状选择
      set.inputType = 'symbol';
    } else if (key === 'map') {
      //adcode行政区选择
      set.inputType = 'adcode';
    } else if (key.indexOf('Color') >= 0) {
      //颜色选择
      set.inputType = 'color';
    } else if (['inRange', 'outOfRange'].includes(k)) {
      //特殊处理，visualMap视觉映射的颜色范围
      rangeSet.push({ c, k, key, item });
      continue;
    } else if (!c && item.desc.indexOf('：</p>\n<ul>') > -1) {
      //部分输入类型是可选的，解析desc字段
      const $ = cheerio.load(item.desc); //将字符串转为dom，类似jquery操作
      set.inputType = 'select';
      let ops = [];
      let df = '';
      //解析选项
      $('ul>li').each((i, a) => {
        const code = $(a).find('code.codespan')[0];
        const b = $(code).text().replace(/'/g, '');
        ops.push(b);
        const t = $(a).text();
        if (t.indexOf('默认') > -1) {
          //默认选项
          df = b;
        }
      });
      set.options = ops;
      if (df) {
        set.options.default = df;
      }
    } else if (c) {
      //有uiControl设置
      if (c.type === 'enum') {
        //枚举类型=>下拉框
        set.inputType = 'select';
        set.options = c.options.split(',');
        set.options.default = c.default;
      } else if (c.type === 'number') {
        //数值输入
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
        //颜色选择
        set.inputType = 'color';
      } else if (c.type === 'boolean') {
        //勾选框
        set.inputType = 'boolean';
      }
      //默认值
      if (c.default !== 'null' && c.default !== 'undefined' && c.default !== undefined) {
        set.default = c.type === 'number' ? Number(c.default) : c.type === 'boolean' ? Boolean(c.default) : c.default;
      }
    }
    list.push({
      id: name + '.' + k,
      code: k,
      ...set
    });
  }

  let formList = getChildForm(list, name);
  //特殊处理，visualMap.inRange，outOfRange视觉映射颜色范围
  if (rangeSet.length) {
    rangeSet.forEach((s) => {
      formList.push({
        inputType: 'children',
        title: s.key,
        code: s.k,
        id: name + '.' + s.k,
        config: [
          {
            id: name + '.' + s.k + '.color',
            code: s.k + '.color',
            inputType: 'text',
            label: 'color'
          }
        ]
      });
    });
  }
  fs.writeFileSync(`../src/components/RightPanel/echartsForm/${name}.ts`, 'export default ' + JSON.stringify(formList));
  console.log(name + ' ok');
}
function getChildForm(formList, name) {
  let list = [];
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
    list = list.filter((a) => !listMap[a.nextCode || a.code]);

    for (const k in listMap) {
      list.push({
        inputType: ['data', 'indicator'].includes(k) ? 'arr' : 'children',
        title: k,
        code: k,
        id: name + '.' + k,
        config: getChildForm(listMap[k], name + '.' + k)
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
// transformEchartsItem('tooltip');
