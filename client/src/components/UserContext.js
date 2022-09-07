import { useEffect, useState, createContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [customPizza, setCustomPizza] = useState();
  const [userInfo, setUserInfo] = useState({});
  const [userCart, setUserCart] = useState();
  const [userCartCounter, setUserCartCounter] = useState(0);
  const { isAuthenticated, user } = useAuth0();

  useEffect(() => {
    let isMounted = true;

    const getUserCart = async () => {
      const response = await fetch(`/api/cart/${user.email}`);
      const parsedResponse = await response.json();
      const data = await parsedResponse.data;
      const status = await parsedResponse.status;

      if (isMounted) {
        if (status === 200) {
          const totalCartQty = data.reduce(
            (sum, cart, i) => sum + cart.cartQuantity,
            0
          );
          setUserCartCounter(totalCartQty);
          setUserCart(data);
        }
      }
    };
    if (isAuthenticated) {
      getUserCart();
    }
    return () => {
      isMounted = false;
    };
  }, [isAuthenticated]);

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        customPizza,
        setCustomPizza,
        userInfo,
        setUserInfo,
        userCart,
        setUserCart,
        userCartCounter,
        setUserCartCounter,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
