import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App gameID="tic-tac-toe" />, document.getElementById('root'));
registerServiceWorker();
