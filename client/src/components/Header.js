import { useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';
import { useNavigate, NavLink } from 'react-router-dom';
import { UserContext } from './UserContext';
// import { StoreContext } from "./StoreContext";

// Icons from react-icons
import { BsCartDash } from 'react-icons/bs';
import { BsCartCheckFill } from 'react-icons/bs';
import { FaRegUser } from 'react-icons/fa';

const Header = () => {
  const { isLoading, isAuthenticated, error, user, loginWithRedirect, logout } =
    useAuth0();
  const { userCartCounter, setUserCartCounter } = useContext(UserContext);

  const navigate = useNavigate();

  // Navigate to the specified page
  const handleNavigateToPage = (navigateToPage) => {
    if (navigateToPage === 'logout') {
      // Reset all
      setUserCartCounter(0);
      navigate('/');
    } else if (navigateToPage === 'cart' && userCartCounter > 0) {
      navigate(`/${navigateToPage}`);
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <Wrapper>
        <NaviLink to='/'>
          <h1>Pizza Ez Order</h1>
        </NaviLink>
        <LoginAndCartSection>
          {isAuthenticated && (
            <ProfileSection onClick={() => handleNavigateToPage('profile')}>
              <span>
                Hello {user.nickname ? user.nickname : user.givenName}{' '}
              </span>
              <FaRegUser size={40} />
            </ProfileSection>
          )}
          {isAuthenticated ? (
            <LogoutSection
              onClick={() => {
                logout();
                handleNavigateToPage('logout');
              }}
            >
              Logout
            </LogoutSection>
          ) : (
            <LoginSection onClick={() => loginWithRedirect()}>
              Login
            </LoginSection>
          )}
          <Cart
            onClick={() => {
              handleNavigateToPage('cart');
            }}
          >
            <BsCartDash size={25} />
            <Counter>{userCartCounter}</Counter>
          </Cart>
        </LoginAndCartSection>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-primary);
  height: 100px;
  padding: 0 10px 0 20px;
`;

const NaviLink = styled(NavLink)`
  cursor: pointer;
  text-decoration: none;
`;

const LoginAndCartSection = styled.div`
  width: 25%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-end;
  align-items: center;
`;

const ProfileSection = styled.button`
  color: white;
  background-color: var(--color-primary);
  border: none;
  padding-top: 10px;
  margin: 0 20px;
  cursor: pointer;
  transition: ease-in-out 200ms;
  span {
    font-size: 12px;
  }
  display: flex;
  flex-direction: row;
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
  position: relative;
`;

const Counter = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  top: -3px;
  right: -2px;
  background-color: white;
  color: var(--color-primary);
  justify-content: center;
  align-items: center;
  display: flex;
  border-radius: 50%;
  font-weight: bold;
  font-size: 15px;
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
`;
const LogoutSection = styled.button`
  font-family: var(--font-heading);
  font-size: 20px;
  border: 2px solid white;
  border-radius: 10px;
  padding: 8px 10px;
  color: white;
  margin: 0 20px;
  align-items: center;
  text-align: center;
  background-color: var(--color-primary);
  cursor: pointer;
`;
export default Header;
