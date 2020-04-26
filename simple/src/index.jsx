import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import App from './App';
import './index.css';
import {message} from "antd";

message.config({
    top: 150,
    duration: 5
});

ReactDOM.render(<App/>, document.getElementById('root'));
