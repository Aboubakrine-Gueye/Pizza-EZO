import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import GlobalStyles from './GlobalStyles';
import styled from 'styled-components';
import Header from './Header';
import Footer from './Footer';
import HomePage from './HomePage';
import StoreMenu from './StoreMenu';
import Profile from './Profile';
import CartPage from './CartPage';
import CartItem from './CartItem';
import OrderCheckOut from './OrderCheckOut';
import CustomPizza from './CustomPizza';

const App = () => {
  return (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route exact path='/stores/:_id' element={<StoreMenu />} />
          <Route exact path='/custom/:_id' element={<CustomPizza />} />
          <Route exact path='/profile' element={<Profile />} />
          <Route exact path='/cart' element={<CartPage />} />
          <Route exact path='/cart/:_id' element={<CartItem />} />
          {/*  <Route exact path='/order' element={<OrderCheckOut />} /> */}
        </Routes>
        {/* </Main> */}
      </BrowserRouter>
      {/* <Footer /> */}
    </>
  );
};

// const Main = styled.div`
//   background: var(--color-desert-sand);
//   display: flex;
//   flex-direction: column;
//   height: calc(100vh - 200px);
// `;

export default App;
