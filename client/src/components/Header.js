import { useContext } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
// import { UserContext } from './UserContext';
// import { StoreContext } from "./StoreContext";

// Icons
import { BsCartDash } from 'react-icons/bs';
import { BsCartCheckFill } from 'react-icons/bs';
import { FaRegUser } from 'react-icons/fa';

// The Header is an element that will sit at the top of
// all pages, it is defined as a constant here and passed
// to App.
const Header = () => {
  // const { isLoggedIn, setIsLoggedIn, setCurrentUser } = useContext(UserContext);
  // const {cart, dispatch} = useContext(StoreContext)

  const navigate = useNavigate();

  // Function that navigates to the specified route (/profile) on click
  const handleClick = (routename) => {
    navigate(`/${routename}`);
  };

  // Create a function to handle click of logout button
  // const handleClickLogOut = () => {
  //   setCurrentUser(null);
  //   setIsLoggedIn(false);
  // dispatch({type: 'clear-cart'})
  // };

  return (
    <>
      <Wrapper>
        <h1>Pizza Ez Order</h1>
        <LoginAndCartSection>
          <LoginSection>Login</LoginSection>
          <Cart>
            <BsCartDash size={30} />
            <Counter>20</Counter>
          </Cart>
        </LoginAndCartSection>
      </Wrapper>
      {/* <ImagePoster>
        <img
          src='/images/pizzas/pizzaoven.jpg'
          alt='Pizza-Oven'
          layout='fill'
          objectFit='contain'
        />
      </ImagePoster>
      <StoresArea>
        <Store>
          Store1
        </Store>
        <Store>
          Store2
        </Store>
        <Store>
          Store3
        </Store>
      </StoresArea> */}
    </>
  );
};

// Export the component to be used in App

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-primary);
  height: 100px;
  padding: 0 10px 0 20px;
`;
const LogoAndSearch = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const LoginAndCartSection = styled.div`
  width: 25%;
  /* margin-right: 0px; */
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-end;
  align-items: center;
`;
const Logo = styled.img`
  width: 190px;
  margin-left: 30px;
`;
const Cart = styled.button`
  border-radius: 10px;
  width: 50px;
  height: 50px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-primary);
  border: none;
  margin: 0 20px;
  cursor: pointer;
  transition: ease-in-out 200ms;
  &:hover {
    transform: scale(1.2);
    color: var(--color-primary);
    background-color: white;
  }
  &:active {
    transform: scale(0.8);
  }
  position: relative;
`;

const Counter = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  top: -15px;
  right: -2px;
  background-color: white;
  color: var(--color-primary);
  justify-content: center;
  align-items: center;
  display: flex;
  border-radius: 50%;
  font-weight: bold;
  font-size: 18px;
`;

const LoginSection = styled.button`
  font-family: var(--font-heading);
  color: white;
  font-size: 20px;
  border: 2px solid white;
  border-radius: 10px;
  padding: 8px 10px;
  margin: 0 20px;
  align-items: center;
  text-align: center;
  background-color: var(--color-primary);
  cursor: pointer;
  transition: ease-in 300ms;
  &:hover {
    border-color: var(--color-secondary);
    color: var(--color-secondary);
    background-color: white;
    transform: scale(1.1);
  }
  &:active {
    border-color: var(--color-quarternary);
    color: var(--color-quarternary);
    transition: ease-in 100ms;
    transform: scale(0.8);
  }
`;
const LogOut = styled.button`
  font-family: var(--font-heading);
  font-size: 20px;
  border: 2px solid white;
  border-radius: 10px;
  padding: 8px 10px;
  color: white;
  margin: 0 20px;
  align-items: center;
  text-align: center;
  background-color: var(--color-secondary);
  cursor: pointer;
  transition: ease-in 300ms;
  &:hover {
    border-color: var(--color-secondary);
    color: var(--color-secondary);
    background-color: white;
    transform: scale(1.1);
  }
  &:active {
    border-color: var(--color-quarternary);
    color: var(--color-quarternary);
    transition: ease-in 100ms;
    transform: scale(0.98);
  }
`;
const ImagePoster = styled.div`
  width: 100vw;
  height: calc(100vh -100px);
`;
export default Header;
