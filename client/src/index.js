import React from 'react';
import ReactDOM from 'react-dom';
import { UserProvider } from './components/UserContext';
import { StoreProvider } from './components/StoreContext';

import App from './components/App';

const rootElement = document.getElementById('root');
ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
    {/* <UserProvider> */}

    {/* </UserProvider> */}
  </React.StrictMode>,
  rootElement
);
