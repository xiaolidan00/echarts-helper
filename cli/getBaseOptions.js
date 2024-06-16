import axios from 'axios';
import fs from 'node:fs';
const optionsUrl = `https://echarts.apache.org/zh/documents/option-parts/option.js?2191a12b13`;

function getEchartsDoc() {
  axios.get(optionsUrl).then(async ({ data }) => {
    fs.writeFileSync('./options.js', data.toString().replace('window.__EC_DOC_option =', 'export default '));
    console.log('options ok');
  });
}
getEchartsDoc();
