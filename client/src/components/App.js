import React from 'react';
import { useEffect } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import GlobalStyles from './GlobalStyles';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import OvenPicture from './OvenPicture';
import HomePage from './HomePage';
import Login from './Login';
import StoreMenu from './StoreMenu';
import Profile from './Profile';
import CartPage from './CartPage';
import OrderCheckOut from './OrderCheckOut';
import Custom from './Custom';

const App = () => {
  // useEffect(() => {
  //   fetch('/api')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log('DATA = ', data);
  //     });
  // }, []);
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <div>
          <h1>Hello World!</h1>
        </div>
        <Header />
        <Main>
          {' '}
          {/* <OvenPicture /> */}
          {/* <HomePage /> */}
          <Routes>
            <Route exact path='/' element={<HomePage />} />
            <Route exact path='/stores/:_id' element={<StoreMenu />} />
            {/* <Route exact path='/login' element={<Login />} />
            <Route exact path='/profile' element={<Profile />} />
            <Route exact path='/cart' element={<CartPage />} />
            <Route exact path='/order' element={<OrderCheckOut />} /> */}
          </Routes>
        </Main>
        <Footer />
      </BrowserRouter>
    </>
  );
};

const Main = styled.div`
  background: var(--color-desert-sand);
  display: flex;
  flex-direction: column;
  height: calc(100vh - 200px);
`;

export default App;
