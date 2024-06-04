import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.scss';
import { type ThemeConfig, theme, ConfigProvider } from 'antd';
const config: ThemeConfig = {
  algorithm: theme.darkAlgorithm
};
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ConfigProvider theme={config}>
      <App />
    </ConfigProvider>
  </React.StrictMode>
);
