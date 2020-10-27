import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import ResponseCheck from './ResponseCheck-class';
import ResponseCheck from './ResponseCheck-hooks';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <ResponseCheck />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
