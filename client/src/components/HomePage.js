import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
// import { UserContext } from './UserContext';
import { StoreContext } from './StoreContext';

// Icons
import { BsCartDash } from 'react-icons/bs';
import { BsCartCheckFill } from 'react-icons/bs';
import { FaRegUser } from 'react-icons/fa';

const Header = () => {
  const { isLoading, isAuthenticated, error, user, loginWithRedirect, logout } =
    useAuth0();
  const { store, setStore, loading, setLoading } = useContext(StoreContext);

  const navigate = useNavigate();

  if (!store) {
    return <div>Loading ...</div>;
  }

  return (
    <>
      <Wrapper>
        <Section>
          <ImagePoster>
            <img src='/images/pizzas/pizzaoven.jpg' alt='Pizza-Oven' />
          </ImagePoster>
          {loading && (
            <StoreLink>
              {store.map((location, index) => {
                return (
                  <NaviLink key={location._id} to={`/stores/${location._id}`}>
                    <Store>
                      <Image
                        key={location.imageUrl}
                        src={location.imageUrl}
                        alt='pizza-store'
                      />
                      <h4 key={location.storeName}>{location.storeName}</h4>
                      <span key={location.storeAddress}>
                        {location.storeAddress}
                      </span>
                      <span key={location.storeCity}>
                        {location.storeCity}, Quebec
                      </span>
                      <span key={location.storePhone}>
                        {location.storePhone}
                      </span>
                    </Store>
                  </NaviLink>
                );
              })}
            </StoreLink>
          )}
        </Section>
      </Wrapper>
    </>
  );
};

// Export the component to be used in App

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 600px;
  width: 100vw;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 800px;
  width: 100vw;
`;
const ImagePoster = styled.div`
  width: 100vw;
  height: 540px;
  img {
    width: 100%;
    height: 540px;
  }
  position: relative;
`;

const NaviLink = styled(NavLink)`
  width: 30%;
  cursor: pointer;
  text-decoration: none;
`;

const StoreLink = styled.div`
  width: 100vw;
  display: flex;
  height: 200px;
  flex-direction: row;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: center;
  /* gap: 20px; */
  margin: 0 20px 0 20px;
`;
const Store = styled.div`
  /* width: 35%; */
  width: 95%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  h4,
  span {
    font-family: var(--font-heading);
    font-size: 20px;
    text-decoration: none;
    color: #222;
  }
`;
const Image = styled.img`
  width: 100%;
  height: 80px;
`;
export default Header;
