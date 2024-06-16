import axios from 'axios';
const geoMap: { [n: string | number]: number } = {};
export function getGeoJSON(adcode) {
  return new Promise((resolve) => {
    if (geoMap[adcode]) resolve(geoMap[adcode]);
    else
      axios
        .get(`https://geo.datav.aliyun.com/areas_v3/bound/${adcode}_full.json`)
        .then(({ data }) => {
          geoMap[adcode] = data;
          resolve(data);
        })
        .catch(() => {
          axios
            .get(`https://geo.datav.aliyun.com/areas_v3/bound/${adcode}.json`)
            .then(({ data }) => {
              geoMap[adcode] = data;
              resolve(data);
            })
            .catch(() => {
              resolve(null);
            });
        });
  });
}
