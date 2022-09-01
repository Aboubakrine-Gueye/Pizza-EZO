import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
// import { UserContext } from './UserContext';
import { StoreContext } from './StoreContext';

// Icons
import { BsCartDash } from 'react-icons/bs';
import { BsCartCheckFill } from 'react-icons/bs';
import { FaRegUser } from 'react-icons/fa';

const Header = () => {
  // const { isLoggedIn, setIsLoggedIn, setCurrentUser } = useContext(UserContext);
  // const {cart, dispatch} = useContext(StoreContext)
  const { store, setStore } = useContext(StoreContext);
  const [loading, setloading] = useState(false);

  const navigate = useNavigate();

  const handleClick = (routename) => {
    navigate(`/${routename}`);
  };

  // Create a function to handle click of logout button
  // const handleClickLogOut = () => {
  //   setCurrentUser(null);
  //   setIsLoggedIn(false);
  // dispatch({type: 'clear-cart'})
  // };

  useEffect(() => {
    fetch('/api/stores')
      .then((res) => res.json())
      .then((data) => {
        console.log(data.data);
        setStore(data.data);
        setloading(true);
      })
      .catch((err) => console.log(err));
  }, []);

  // useEffect(() => {
  //   const getStores = async () => {
  //     const stores = await fetch('/api/stores');
  //     setStore(stores);
  //   };

  //   getStores(); // Calls getStores
  //   console.log('STORES = ', store);

  //   return () => {
  //     // gets called when the component unmounts
  //     console.log('Unmount UseEffect getStores');
  //   };
  // }, []);

  if (!store) {
    console.log('EMPTY stores');
    return <div>Loading ...</div>;
  } else {
    console.log('STORES LOADED');
    console.log('STORE====> ', Array.isArray(store));
  }

  return (
    <>
      <Wrapper>
        <Section>
          <ImagePoster>
            <img src='/images/pizzas/pizzaoven.jpg' alt='Pizza-Oven' />
          </ImagePoster>
          {/* <NavigationLink to='{`/stores/${stores._id`}'> */}
          {loading && (
            <NavigationLink>
              {store.map((location) => {
                return (
                  <NaviLink to={`/stores/${location._id}`}>
                    <Store>
                      <Image src={location.imageUrl} alt='pizza-store' />
                      <h4>{location.storeName}</h4>
                      <span>{location.storeAddress}</span>
                      <span>{location.storeCity}, Quebec</span>
                      <span>{location.storePhone}</span>
                    </Store>
                  </NaviLink>
                );
              })}
            </NavigationLink>
          )}
        </Section>
      </Wrapper>
    </>
  );
};

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
  /* height: calc(100vh -100px); */
`;

const NaviLink = styled(NavLink)`
  width: 30%;
`;

const NavigationLink = styled.div`
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

  // Test
  /* position: absolute;
  top: 50%;
   */

  /* height: calc(100vh -200px); */
`;
const Store = styled.div`
  /* width: 35%; */
  width: 95%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  /* height: calc(100vh -100px); */
`;
const Image = styled.img`
  width: 100%;
  height: 120px;
`;
export default Header;
