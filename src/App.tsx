import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { FormList, type FormItemConfig, type FormItemValue } from './components/FormList/FormList';
import { ChartList } from './components/ChartList/ChartList';

function App() {
  const [value, setValue] = useState({});
  const [formConfig, setFormConfig] = useState<Array<FormItemConfig>>([]);
  useEffect(() => {
    axios.get('/form/title.json').then(({ data }) => {
      setFormConfig(data as FormItemConfig[]);
    });
  }, []);
  const onChangeValue = (v: FormItemValue) => {
    setValue(v);
    console.log(v);
  };

  return (
    <>
      <ChartList></ChartList>
      <div className="chartContent"></div>
      <div className="rightPanel">
        <FormList
          title="title"
          parent="title"
          parentCode="title"
          config={formConfig}
          value={value}
          onChange={onChangeValue}
        ></FormList>
      </div>
    </>
  );
}

export default App;
