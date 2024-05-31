import fs from "node:fs";
import options from "./options.js";
async function transformEchartsItem(name, cfg) {
  let data;
  try {
    data = await import(`./echarts/${name}.js`).then((res) => res.default);
  } catch (error) {
    data = cfg;
  }
  const list = [];
  for (let k in data) {
    if (k.indexOf(".<") > 1) continue;
    const item = data[k];
    const c = item.uiControl;
    const set = { inputType: "text" };
    if (c) {
      if (c.type === "enum") {
        set.inputType = "select";
        set.options = c.options.split(",");
        set.options.default = c.default;
      } else if (c.type === "number") {
        set.inputType = "number";
        if (c.min !== undefined) {
          set.min = Number(c.min);
        }
        if (c.max !== undefined) {
          set.max = Number(c.max);
        }
        if (c.step !== undefined) {
          set.step = Number(c.step);
        }
      } else if (c.type === "color") {
        set.inputType = "color";
      } else if (c.type === "boolean") {
        set.inputType = "boolean";
      }
      if (
        c.default !== "null" &&
        c.default !== "undefined" &&
        c.default !== undefined
      ) {
        set.default =
          c.type === "number"
            ? Number(c.default)
            : c.type === "boolean"
            ? Boolean(c.default)
            : c.default;
      }
    }
    list.push({
      code: k,
      ...set,
    });
  }
  fs.writeFileSync(`./form/${name}.json`, JSON.stringify(list));
  console.log(name + " ok");
}
async function getFroms() {
  for (let k in options) {
    await transformEchartsItem(k, options[k]);
  }
}
getFroms();
