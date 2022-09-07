import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useContext, useState } from 'react';
import { UserContext } from './UserContext';
import { Link } from 'react-router-dom';

import UserOrder from './UserOrder';

import { BsTrash, BsCartX } from 'react-icons/bs';

const CartPage = () => {
  const { isAuthenticated, error, user } = useAuth0();
  const { userCart, setUserCart, userCartCounter, setUserCartCounter } =
    useContext(UserContext);
  const [totalPrice, setTotalPrice] = useState([]);
  // Format the price like $0.00
  const formatPrice = (price) => `$${price.toFixed(2)}`;
  let totalAmount = 0;
  const navigate = useNavigate();

  // Get the Cart Content for the current user session
  useEffect(() => {
    let isMounted = true;
    const getUserCart = async () => {
      const response = await fetch(`/api/cart/${user.email}`);
      const parsedResponse = await response.json();
      const data = await parsedResponse.data;
      const status = await parsedResponse.status;

      if (isMounted) {
        setUserCart(data);
        let price = [];
        data.forEach((element) =>
          price.push(Number(element.price) * element.cartQuantity)
        );
        setTotalPrice(price);
      }
    };
    if (isAuthenticated) {
      getUserCart();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  // Remove an pizza from the cart.
  const handleDeleteCartItem = (cart) => {
    const options = {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };

    fetch(`/api/cart/${cart.cartId}`, options)
      .then((res) => res.json())
      .then((data) => {
        setUserCartCounter(userCartCounter - cart.cartQuantity);
        if (userCartCounter < 1) {
          navigate('/');
        } else {
          window.location.reload();
        }
      })
      .catch((err) => alert(err));
  };

  // Following request an update of the cart from the database
  // for the actual user session using the pizza item _id and
  // the new input quantity
  const handleUpdateCartItem = (newCartQuantity, cart, index) => {
    const options = {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _id: cart._id,
        email: user.email,
        cartQuantity: newCartQuantity,
      }),
    };
    // The variation is equal to the manually new input value  of the cart quantity
    // for the current item pizza minus the previous value
    const variation = newCartQuantity - cart.cartQuantity;

    fetch('/api/cart', options)
      .then((res) => res.json())
      .then((data) => {
        setUserCartCounter(userCartCounter + variation);
        let newCart = userCart;
        newCart[index].cartQuantity = newCartQuantity;
        setUserCart(newCart);
        let price = totalPrice;
        price[index] = newCartQuantity * Number(cart.price);
        setTotalPrice(price);
        window.location.reload();
      })
      .catch((err) => alert(err));
  };

  return (
    <Center>
      <Wrapper>
        <Title> User Cart </Title>
        {userCart && userCartCounter > 0 ? (
          <ul>
            {userCart.map((cart, index) => {
              totalAmount += parseFloat(Number(cart.price) * cart.cartQuantity);
              return (
                <ItemRow>
                  <ProductName to={`/cart/${cart._id}`}>
                    {cart.name}
                  </ProductName>
                  <Pricing>
                    <Image key={cart.imageUrl} src={cart.imageUrl} />
                    <Text> {formatPrice(Number(cart.price))} </Text>
                    <Text>x</Text>
                    <AdjustAmount>
                      <QuantitySelect
                        type='number'
                        id='carQuantity'
                        name='cartQuantity'
                        defaultValue={cart.cartQuantity}
                        min='1'
                        max={cart.quantity}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleUpdateCartItem(e.target.value, cart, index);
                        }}
                      />
                      <DeleteButton
                        onClick={() => {
                          handleDeleteCartItem(cart);
                        }}
                      >
                        <BsTrash />
                      </DeleteButton>
                    </AdjustAmount>
                    <Text>{formatPrice(cart.price * cart.cartQuantity)}</Text>
                  </Pricing>
                </ItemRow>
              );
            })}
            <Total>Total: {formatPrice(totalAmount)}</Total>
          </ul>
        ) : (
          <FlexContainer>
            <EmptyCart />
            <h3>Your Cart is Empty!</h3>
            <h3>
              Please return to{' '}
              <Link to='/' style={{ color: 'inherit' }}>
                homePage
              </Link>{' '}
              to add to you cart
            </h3>
          </FlexContainer>
        )}
        {/* {userCartCounter > 0 && (
          <div>
            {isAuthenticated ? (
              <UserOrder />
            ) : (
              <Checkout>
                To continue to checkout, please <LogIn to={'/'}>log in</LogIn>
              </Checkout>
            )}
          </div>
        )} */}
      </Wrapper>
    </Center>
  );
};

const Center = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-bottom: 50px;
`;
const Wrapper = styled.div`
  display: flex;
  width: 70%;
  flex-direction: column;
  align-items: left;
  margin: 40px 0;
`;
const ItemRow = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 15px 0 0 0;
`;
const Image = styled.img`
  width: 50px;
  border-radius: 50%;
`;
const Checkout = styled.p`
  display: flex;
  padding: 10px 20px 10px 20px;
  font-size: 18px;
  border-radius: 5px;
  width: fit-content;
  margin: 20px;
  background-color: var(--color-secondary);
  color: white;
`;
const ProductName = styled(Link)`
  color: black;
  margin: 15px 20px 15px 15px;
  font-weight: 700;
  text-decoration: none;
  font-size: 18px;
  max-width: 50%;
  &:hover {
    color: var(--color-tertiary);
  }
`;
const LogIn = styled(Link)`
  text-decoration: none;
  font-weight: 900;
  margin-left: 10px;
  color: white;
  cursor: pointer;
  &:hover {
    color: var(--color-quarternary);
  }
  &:active {
    color: white;
  }
`;
const Pricing = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 45%;
  font-size: 18px;
`;
const AdjustAmount = styled.div`
  display: flex;
  align-items: center;
`;
const QuantitySelect = styled.input`
  font-size: 1rem;
  padding: 4px;
  text-align: center;
  border: 1px solid var(--color-tertiary);
  border-radius: 5px;
  margin-right: 10px;
`;
const Title = styled.h4`
  text-align: center;
  font-family: var(--font-heading);
  font-size: 36px;
  padding: 40px 0 15px 12px;
  width: 100%;
`;
const SubTitles = styled.h5`
  text-align: left;
  font-family: var(--font-heading);
  font-size: 24px;
  border-bottom: 1px solid var(--color-secondary);
  padding: 30px 0 10px;
  margin: 0 25px 0 15px;
`;

const ItemRowHead = styled.li`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 15px 0 0 0;
`;
const SubTitle = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  gap: 30px;
  sub1 {
    flex: 2;
  }
  sub2 {
    flex: 1;
    padding-left: 60px;
  }
`;

const Total = styled.div`
  font-family: var(--font-body);
  font-weight: 600;
  width: 100%;
  margin: 20px 0;
  padding-right: 20px;
  text-align: right;
  font-size: 24px;
`;
const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  background-color: #fff;
  border: none;
  cursor: pointer;
  color: #222;
  transition: ease-in-out 50ms;
  &:hover {
    transform: scale(1.1);
  }
`;
const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 30vh;
  width: 100%;
  gap: 30px;
`;
const EmptyCart = styled(BsCartX)`
  font-size: 60px;
`;
const Text = styled.div`
  font-size: 20px;
  margin: 20px 20px 20px 20px;
`;
export default CartPage;
