import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './app.jsx';
import registerServiceWorker from './registerServiceWorker.jsx';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
