import React from 'react';
import { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { StoreContext } from './StoreContext';
import styled from 'styled-components';

const StoreMenu = () => {
  const { store, setStore } = useContext(StoreContext);
  const id = useParams()._id;
  const promises = [];
  console.log('in StoreMenu Store = ', store);
  console.log('Params = ', id);
  let test;
  useEffect(() => {
    const stock = store.filter((item) => item._id === id)[0].stock;
    console.log('STOCK = ', stock);
    stock.forEach((item) => {
      if (item._id !== '222' && item._id !== '333') {
        promises.push(
          fetch(`/api/pizza/${item._id}`)
            .then((res) => res.json())
            .then((data) => data.data)
        );
      }
    });
    Promise.all(promises).then((data) => {
      console.log('Promise all data = ', data);
    });
  });

  return (
    <Wrapper>
      <Container>
        <Left>
          <Image src='/images/pizzas/pizzaoven.jpg' alt='Pizza' />
          <Infos>
            <h6>Margherita</h6>
            <span>$15.99</span>
          </Infos>
          <Operation>
            <h6>Cart</h6>
            <Selection>
              <h6>Add</h6>
              <Button>+</Button>
              <h6>Remove</h6>
              <Button>-</Button>
            </Selection>
          </Operation>
        </Left>
        <Right>Right</Right>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: calc(100vh - 200px);
  border: 5px solid red;
`;

const Container = styled.div`
  display: flex;
  width: 50%;
  height: 50%;
  flex-direction: row;
  border: 5px solid blue;
`;
const Left = styled.div`
  width: 70%;
  height: 100%;
  border: 5px solid yellow;
  display: flex;
  flex-direction: column;
`;
const Right = styled.div`
  width: 30%;
  height: 100%;
  border: 5px solid green;
`;
const Operation = styled.div`
  display: flex;
  flex-direction: row;
`;
const Button = styled.button`
  height: 20px;
  width: 25px;
  background-colour: var(--color-primary);
  color: ;
`;
const Image = styled.img`
  width
`;
const Infos = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: center;
  gap: 20px;
  margin: 10px 0px 10px 0px;
`;
const Selection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;
// const  = styled.div`
// `;
export default StoreMenu;
