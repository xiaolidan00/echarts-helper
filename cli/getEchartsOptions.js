import axios from "axios";
import fs from "node:fs";
import options from "./options.js";
const optionsUrl = `https://echarts.apache.org/zh/documents/option-parts/option.js?f4de63e7b4`;

//window.__EC_DOC_option_title = {
function getEchartsDoc() {
  axios
    .get(optionsUrl)
    .then(async ({ data }) => {
      fs.writeFileSync(
        "./options.js",
        data.toString().replace("window.__EC_DOC_option =", "export default ")
      );
      console.log("options ok");
    })
    .catch((err) => {});
}
//getEchartsDoc();
const failItems = [];
async function getItem(k) {
  const n = k.replace("-", "_");
  try {
    const data = await axios
      .get(
        `https://echarts.apache.org/zh/documents/option-parts/option.${k}.js?f4de63e7b4`,
        { timeout: 10000 }
      )
      .then(({ data }) =>
        data
          .toString()
          .replace(`window.__EC_DOC_option_${n} = `, "export default ")
      );
    fs.writeFileSync(`./echarts/${k}.js`, data);
    console.log(k + " ok");
  } catch (error) {
    failItems.push(k);
    console.log(k + " fail");
  }
}

async function getEchartItems() {
  for (let k in options) {
    await getItem(k);
  }
  console.log(failItems);
}
// getEchartItems();

async function getFailItems() {
  const f = ["series-scatter", "series-tree", "series-custom"];
  for (let i = 0; i < f.length; i++) {
    await getItem(f[i]);
  }
}
getFailItems();
