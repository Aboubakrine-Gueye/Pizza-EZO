import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useContext, useEffect } from 'react';
import { useNavigate, NavLink, useParams } from 'react-router-dom';
import { StoreContext } from './StoreContext';
import { UserContext } from './UserContext';
import styled from 'styled-components';

const StoreMenu = () => {
  const { isAuthenticated, error, user, loginWithRedirect, logout } =
    useAuth0();
  const {
    store,
    setStore,
    menu,
    setMenu,
    pizzas,
    setPizzas,
    loading,
    setLoading,
  } = useContext(StoreContext);

  const { userCartCounter, setUserCartCounter } = useContext(UserContext);
  const id = useParams()._id;

  useEffect(() => {
    fetch(`/api/menu/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setMenu(data.data);
        setPizzas(data.data.stock);
        setLoading(true);
      });
  }, [loading]); // add loading in the dependencies for the refresh

  if (!loading) {
    return <div>Loading ...</div>;
  }

  const handleAddToCart = (e) => {
    const obj = e;
    obj.email = user.email;
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(obj),
    };
    fetch('/api/cart', options)
      .then((res) => res.json())
      .then((data) => {
        setUserCartCounter(userCartCounter + 1);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Wrapper>
      {menu && (
        <StoreInfos>
          <h4 key={menu.storeName}>{menu.storeName}</h4>
          <span key={menu.storeAddress}>{menu.storeAddress}</span>
          <span key={menu.storeCity}>{menu.storeCity}, Quebec</span>
          <span key={menu.storePhone}>{menu.storePhone}</span>
        </StoreInfos>
      )}

      {loading && pizzas ? (
        <StoreMenuDetails>
          {pizzas.map((pizza, index) => {
            return (
              <DetailSection>
                <Container>
                  <Image
                    key={pizza.imageUrl}
                    src={pizza.imageUrl}
                    alt='Pizza'
                  />
                  <ul>
                    <h6 key={pizza.name + index}>Ingredients</h6>
                    {pizza.toppings.map((topping) => {
                      return (
                        <li key={pizza._id + topping.name}>{topping.name}</li>
                      );
                    })}
                  </ul>
                </Container>
                <Infos>
                  <h6 key={pizza.name}>{pizza.name}</h6>
                  <span key={pizza.name + pizza.price}>${pizza.price}</span>
                  {pizza._id === '222' || pizza._id === '333' ? (
                    <NaviLink key={pizza._id} to={`/custom/${pizza._id}`}>
                      Custom Pizza
                    </NaviLink>
                  ) : (
                    <Button
                      key={pizza._id + pizza.name}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(pizza);
                      }}
                    >
                      Add To Cart
                    </Button>
                  )}
                </Infos>
              </DetailSection>
            );
          })}
        </StoreMenuDetails>
      ) : null}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: calc(100vh - 200px);
`;

const StoreInfos = styled.div`
  width: 100vw;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-family: var(--font-heading);
  font-size: 30px;
  gap: 20px;
`;

const StoreMenuDetails = styled.div`
  width: 100vw;
  height: calc(100vh - 200px);
  padding-left: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
`;

const DetailSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  height: 30%;
`;
const Container = styled.div`
  display: flex;
  width: 90%;
  height: 80%;
  flex-direction: row;
  gap: 10px;
  h6 {
    text-decoration: underline;
    text-align: center;
    margin-bottom: 2px;
  }
  li {
    font-size: 12px;
  }
`;

const Left = styled.div`sss
  width: 60%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const Ingredients = styled.div`
  width: 40%;
  height: 100%;
  padding: 10px 10px 10px 10px;
  h6 {
    text-decoration: underline;
    text-align: center;
    margin-bottom: 10px;
  }
  li {
    font-size: 12px;
  }
`;
const Operation = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0px 0px 0px 10px;
  gap: 10px;
`;

const NaviLink = styled(NavLink)`
  height: 25px;
  width: 120px;
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: 2px;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  font-size: 15px;
  font-weight: bold;
`;
const Button = styled.button`
  height: 25px;
  width: 120px;
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: 2px;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  font-size: 15px;
  font-weight: bold;
`;
const Selection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;
const Image = styled.img`
  width: 70%;
  height: 100%;
`;
const Infos = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  padding: 10px 30px 10px 0px;
  h6,
  span {
    font-family: var(--font-heading);
    font-size: 20px;
  }
`;

export default StoreMenu;
