import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import GuGuDan from './App';
import WordRelay from './WordRelay';
import * as serviceWorker from './serviceWorker';
// default로 export한 애들은 그냥 import WordRelay from './WordRelay';
// default로 export 안 한 애들은 import { WordRelay } from './WordRelay';

ReactDOM.render(
  <React.StrictMode>
    <WordRelay />
  </React.StrictMode>,
  document.getElementById('root')
);
serviceWorker.unregister();
