import React from "react";
import ReactDOM from "react-dom/client";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { history } from "./utils/history";
import App from './App'
// 引入antd样式文件
import 'antd/dist/antd.min.css';
// 引入scss文件
import './index.scss'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <HistoryRouter history={history}>
    <App />
  </HistoryRouter>
)
