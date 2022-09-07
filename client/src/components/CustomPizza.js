import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, NavLink, useParams } from 'react-router-dom';
import { StoreContext } from './StoreContext';
import { UserContext } from './UserContext';
import styled from 'styled-components';

const CustomPizza = () => {
  const { isAuthenticated, error, user } = useAuth0();
  const { store, setStore, pizzas, setPizzas, loading, setLoading } =
    useContext(StoreContext);
  const { customPizza, setCustomPizza, userCartCounter, setUserCartCounter } =
    useContext(UserContext);
  const [toppings, setToppings] = useState();
  const [checkedState, setCheckedState] = useState([]);
  const [selected, setSelected] = useState();
  const [totalPrice, setTotalPrice] = useState(0);

  // Format the price like $0.00
  const formatPrice = (price) => `$${price.toFixed(2)}`;
  // Save the current pizza _id params in the constant _id
  const _id = useParams()._id;

  // Get the current pizza
  useEffect(() => {
    let isMounted = true;
    const getCustomPizza = async () => {
      const response = await fetch(`/api/pizza/${_id}`);
      const custom = await response.json();
      const data = await custom.data;
      const status = await custom.status;
      if (isMounted) {
        setCustomPizza(data);
        setTotalPrice(Number(data.price));
        setLoading(true);
      }
    };
    getCustomPizza();
    return () => {
      isMounted = false;
    };
  }, []);

  // Get the toppings
  useEffect(() => {
    let isMounted = true;
    const getToppings = async () => {
      const response = await fetch(`/api/toppings`);
      const toppingsData = await response.json();
      const data = await toppingsData.data;
      const status = await toppingsData.status;
      if (isMounted) {
        setToppings(data);
        setSelected(data);
        setLoading(true);
      }
    };
    getToppings();
    return () => {
      isMounted = false;
    };
  }, []);

  // The following will add the custom pizza to the cart
  const handleSubmit = (e) => {
    e.preventDefault();
    let customedPizza = customPizza;
    let customizedTotalPrice = 0;
    selected.forEach((item) => {
      if (item.isSelected === true) {
        customedPizza.toppings.push(item);
        customizedTotalPrice += parseInt(item.price);
      }
    });

    customedPizza.email = user.email;
    customedPizza.price = Number(customedPizza.price) + customizedTotalPrice;

    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customedPizza),
    };
    fetch('/api/cart', options)
      .then((res) => res.json())
      .then((data) => {
        setUserCartCounter(userCartCounter + 1);
      })
      .catch((err) => console.log(err));
  };

  const handleToppings = (index) => {
    let result;
    const staging = selected.map((item, i) => {
      if (index === i) {
        item.isSelected = !item.isSelected;
        setTotalPrice(totalPrice + Number(item.price));
      }
      return item;
    });
    setSelected([...staging]);
  };

  return (
    <Wrapper>
      <h4>Customize Your Pizza</h4>
      {loading && customPizza && (
        <Container>
          <ImageSection>
            <img src={customPizza.imageUrl} alt='Pizza' />
            <p key={customPizza.name}>
              {customPizza.name} Dough - Price:{' '}
              {formatPrice(parseInt(customPizza.price))}
            </p>
          </ImageSection>
          <FormSection onSubmit={(e) => handleSubmit(e)}>
            <ToppingSection>
              {toppings &&
                toppings.map((topping, index) => {
                  return (
                    <InputSection>
                      <input
                        type='checkbox'
                        id={`checkbox-${topping._id}`}
                        name={topping.name}
                        value={topping.name}
                        checked={checkedState[index]}
                        onChange={() => handleToppings(index)}
                      />
                      <label htmlFor={`checkbox-${topping._id}`}>
                        {topping.name}
                      </label>
                      <span>
                        {' '}
                        Price: {formatPrice(parseInt(topping.price))}
                      </span>
                    </InputSection>
                  );
                })}
            </ToppingSection>
            <TotalSection>
              Total: {formatPrice(parseInt(totalPrice))}
            </TotalSection>
            <Button type='submit' value='submit'>
              Add To Cart
            </Button>
          </FormSection>
        </Container>
      )}
    </Wrapper>
  );
  <div>CustomPizza</div>;
};
const Wrapper = styled.div`
  width: 100vw;
  h4 {
    text-align: center;
    font-size: x-large;
    font-family: var(--font-heading);
    margin: 40px 0 10px;
  }
`;
const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 90%;
  height: 420px;
  gap: 10px;
  margin: 0px 50px 10px;
`;
const ImageSection = styled.div`
  width: 40%;
  height: 100%;

  font-size: 18px;
  font-weight: bold;
  img {
    width: 100%;
    height: 90%;
  }
`;
const InputSection = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 21px;
  font-family: var(--font-heading);
  gap: 20px;
  label,
  span {
    width: 140px;
  }
`;
const TotalSection = styled.div`
  width: 320px;
  height: 25px;
  font-size: 24px;
  justify-content: right;
  display: flex;
  font-weight: bold;
  margin: 0 0 10px;
`;
const PriceSection = styled.div``;
const ListItem = styled.div``;

const FormSection = styled.form`
  width: 75%;
  height: 100%;
`;
const ToppingSection = styled.div`
  width: 100%;
  height: 80%;
`;
const Button = styled.button`
  border-radius: 10%;
  font-size: 24px;
  width: 320px;
  cursor: pointer;
  border-radius: 10px;
  height: 50px;
  color: white;
  background-color: var(--color-primary);
  border: none;
  margin: 0 20px;
`;

export default CustomPizza;
