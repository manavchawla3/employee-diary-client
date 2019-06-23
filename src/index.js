import React from 'react';
import ReactDOM from 'react-dom';

import Root from './components/Root';

ReactDOM.render(<Root />, document.getElementById('root'));

// add these lines
if (module.hot && process.env.NODE_ENV !== 'production') {
  module.hot.accept();
}
