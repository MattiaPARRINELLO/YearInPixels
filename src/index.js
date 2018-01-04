import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.scss';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import lscache from 'lscache';

lscache.setBucket('year_in_pixel');

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
