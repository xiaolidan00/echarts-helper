import { PlusOutlined } from '@ant-design/icons';
import { Select, Upload } from 'antd';
import { useEffect, useState } from 'react';
import type { GetProp, UploadProps } from 'antd';
import styles from './SymbolPicker.module.scss';
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (img: FileType) => {
  return new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.readAsDataURL(img);
  });
};

const symbolOptions = ['none', 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'image'];
export const SymbolPicker = (props: { value: string; onChange: (v: string) => void }) => {
  const [val, setVal] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');

  const onChangeVal = (v: string) => {
    setVal(v);
    if (v !== 'image') {
      props.onChange(v);
    }
  };
  const uploadImage: UploadProps['beforeUpload'] = (file: FileType) => {
    getBase64(file).then((url) => {
      setImageUrl(url);
      props.onChange('image://' + url);
    });
  };
  useEffect(() => {
    if (props.value) {
      if (props.value.indexOf('image://') === 0) {
        if (props.value !== 'image') {
          setVal('image');
        }
        const url = props.value.substring(8);
        if (url !== imageUrl) {
          setImageUrl(url);
        }
      } else {
        if (props.value !== val) {
          setVal(props.value);
        }
      }
    }
  }, [props.value]);
  return (
    <div className={styles.SymbolPicker}>
      <Select
        value={val}
        options={symbolOptions.map((it) => ({ label: it, value: it }))}
        onChange={onChangeVal}
      ></Select>
      <div className={styles.picBox} style={{ display: val === 'image' ? '' : 'none' }}>
        <Upload
          name="avatar"
          listType="picture-card"
          showUploadList={false}
          accept=".png,.jpg,.gif"
          beforeUpload={uploadImage}
        >
          {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : <PlusOutlined />}
        </Upload>
      </div>
    </div>
  );
};
