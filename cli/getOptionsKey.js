import options from './options.js';
import fs from 'node:fs';
function getOptionKeys() {
  const keys = Object.keys(options)
    .sort((a, b) => a.charCodeAt(0) - b.charCodeAt(0))
    .filter((a) => !['dataZoom', 'visualMap'].includes(a));

  fs.writeFileSync('../src/components/ChartList/optionsKeys.ts', `export default ${JSON.stringify(keys)}`);
}
getOptionKeys();
