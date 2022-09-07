import React from 'react';
import ReactDOM from 'react-dom';
import { UserProvider } from './components/UserContext';
import { StoreProvider } from './components/StoreContext';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './components/App';

// Auth0 component and environment variables

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

const rootElement = document.getElementById('root');
ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
    >
      <StoreProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </StoreProvider>
    </Auth0Provider>
    ,
  </React.StrictMode>,
  rootElement
);
