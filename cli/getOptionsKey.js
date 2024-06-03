import options from './options.js';
import fs from 'node:fs';
function getOptionKeys() {
  const keys = Object.keys(options);

  fs.writeFileSync('./optionsKeys.js', `export default ${JSON.stringify(keys)}`);
}
getOptionKeys();
