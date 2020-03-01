import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './client/App';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './../src/client/assets/css/styles.css'


ReactDOM.render(<App />, document.getElementById('root'));
