import adcodeAll from 'province-city-china/dist/level.min.json';
import adcodeMap from './adcodeMap.json';
import { useEffect, useState } from 'react';
import styles from './AdcodeSelect.module.scss';
import { EnvironmentOutlined } from '@ant-design/icons';

type AdcodeType = { c: string; n?: string; p?: string; d?: AdcodeType[] };
const adcodeList: AdcodeType[] = adcodeAll as AdcodeType[];
export const AdcodeSelect = (props: { value: string; onChange: (v: string) => void }) => {
  const [val, setVal] = useState(props.value);
  const [pro, setPro] = useState('');
  const [city, setCity] = useState('');
  const [dist, setDist] = useState('');
  const [isShow, setIsShow] = useState(false);
  const [cityList, setCityList] = useState<AdcodeType[]>([]);
  const [distList, setDistList] = useState<AdcodeType[]>([]);
  const [activeTab, setActiveTab] = useState(1);
  const onSelectItem = (type: string, it: AdcodeType) => {
    const adcode = it.c;
    if (it.c !== '100000') {
      const list = it.d || [];
      if (type === 'pro') {
        setPro(adcode);
        setCity('');
        setDist('');
        setCityList(list);
      } else if (type === 'city') {
        setCity(adcode);
        setDist('');
        setDistList(list);
      } else {
        setDist(adcode);
      }
    }
    setVal(adcode);
    props.onChange(adcode);
  };
  const loadDist = () => {
    setActiveTab(3);
  };
  const loadCity = () => {
    setActiveTab(2);
    setDist('');
  };
  const resetPro = () => {
    setActiveTab(1);
    setCity('');
    setDist('');
  };
  useEffect(() => {
    if (val !== props.value) setVal(props.value);
  }, [props.value]);
  return (
    <div className={styles.AdcodeSelect}>
      <div onClick={() => setIsShow(true)}>
        <EnvironmentOutlined />
        <span className={styles.adcodeResult}>{adcodeMap[val] || '全国'}</span>
      </div>

      <div className={styles.selectBox} style={{ display: isShow ? '' : 'none' }} onMouseLeave={() => setIsShow(false)}>
        <div className={styles.adcodeTab}>
          <span onClick={resetPro}>{adcodeMap[pro] || '省份'}</span>
          {pro && cityList.length ? <span onClick={loadCity}>{adcodeMap[city] || '城市'}</span> : ''}
          {city && distList.length ? <span onClick={loadDist}>{adcodeMap[dist] || '区域'}</span> : ''}
        </div>
        <div className={styles.adcodeList} style={{ display: activeTab === 1 ? '' : 'none' }}>
          <span onClick={() => onSelectItem('pro', { c: '100000' })} className={val === '100000' ? styles.active : ''}>
            全国
          </span>
          {adcodeList.map((it) => (
            <span key={it.c} onClick={() => onSelectItem('pro', it)} className={pro === it.c ? styles.active : ''}>
              {it.n}
            </span>
          ))}
        </div>

        <div className={styles.adcodeList} style={{ display: activeTab === 2 ? '' : 'none' }}>
          {cityList.map((it) => (
            <span key={it.c} onClick={() => onSelectItem('city', it)} className={city === it.c ? styles.active : ''}>
              {it.n}
            </span>
          ))}
        </div>

        <div className={styles.adcodeList} style={{ display: activeTab === 3 ? '' : 'none' }}>
          {distList.map((it) => (
            <span key={it.c} onClick={() => onSelectItem('dist', it)} className={dist === it.c ? styles.active : ''}>
              {it.n}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
