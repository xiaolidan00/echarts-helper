export interface CheckBoxProps {
  inputType: 'boolean';
  default?: boolean;
}
export interface NumInputProps {
  inputType: 'number';
  step?: number;
  min?: number;
  max?: number;
  default?: number;
}

export interface SelectProps {
  inputType: 'select';
  options: Array<string>;
  default?: string;
}
export interface TextProps {
  inputType: 'text' | 'color';
  default?: string;
}
export interface FormChildConfig {
  inputType: 'children';
  title: string;
  code: string;
  config: Array<FormItemConfig>;
}

export interface FormArrConfig {
  inputType: 'arr';
  title: string;
  code: string;
  config: Array<FormItemConfig1>;
}
export interface MultiItems {
  inputType: 'multi';
  title?: string;
  code: string;
  config: Array<FormInputProps>;
}

export type KeyVal = {
  [n: string]: any;
};
export type FormItemValue = KeyVal;
export type FormInputProps = {
  code: string;
  nextCode?: string;
  label?: string;
  id: string;
} & (NumInputProps | SelectProps | TextProps | CheckBoxProps);

export interface CheckBoxProps1 {
  inputType: 'boolean';
  default?: boolean;
  value: boolean;
}
export interface NumInputProps1 {
  inputType: 'number';
  step?: number;
  min?: number;
  max?: number;
  default?: number;
  value: number;
}

export interface SelectProps1 {
  inputType: 'select';
  value: string;
  options: Array<string>;
  default?: string;
}
export interface TextProps1 {
  inputType: 'text' | 'color';
  value: string;
  default?: string;
}

export type FormInputProps1 = {
  code: string;
  label?: string;
} & (NumInputProps1 | SelectProps1 | TextProps1 | CheckBoxProps1);
export type FormItemConfig = { id: string } & (FormArrConfig | FormInputProps | MultiItems | FormChildConfig);

export type FormItemConfig1 = {
  nextCode: string;
} & FormItemConfig;
