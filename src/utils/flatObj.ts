/**
 * 给obj的扁平属性设置新值
 * @param obj 对象或数组
 * @param str 扁平属性，如{a:{b:[{c:1}]}}=>'a.b[0].c'
 * @param value 新值
 * @returns
 */
export function setFlatObj(
  obj: {
    [n: string | number]: any;
  },
  str: string,
  value: any
) {
  if (!obj) {
    obj = {};
  }
  const attrs = str.replace(/[\[\]]+/g, '.').split('.');
  let temp = obj;
  for (let i = 0; i < attrs.length; i++) {
    const n = attrs[i];
    if (n) {
      if (i === attrs.length - 1) {
        temp[n] = value;
      } else {
        if (!temp[n]) {
          //如果是空值则设置为空对象
          temp[n] = {};
        }
        temp = temp[n];
      }
    }
  }
  return obj;
}
/**
 * 获取扁平属性的值
 * @param obj 对象或数组
 * @param str 扁平属性，如{a:{b:[{c:1}]}}=>'a.b[0].c'
 * @returns
 */
export function getFlatObj(
  obj: {
    [n: string | number]: any;
  },
  str: string
) {
  if (!obj) {
    obj = {};
  }
  let temp = obj;
  const attrs = str.replace(/[\[\]]+/g, '.').split('.');
  for (let i = 0; i < attrs.length; i++) {
    const n = attrs[i];
    if (n) {
      if (i === attrs.length - 1) {
        return temp[n];
      } else {
        if (temp[n] === undefined) {
          return;
        }
        temp = temp[n];
      }
    }
  }
}
