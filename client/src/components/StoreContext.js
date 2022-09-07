import { useState, useContext, createContext, useEffect } from 'react';

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [store, setStore] = useState({});
  const [menu, setMenu] = useState();
  const [pizzas, setPizzas] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const getStores = async () => {
      const response = await fetch('/api/stores');
      const stores = await response.json();
      const data = await stores.data;
      const status = await stores.status;
      if (isMounted) {
        setStore(data);
        setLoading(true);
      }
    };

    getStores();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <StoreContext.Provider
      value={{
        store,
        setStore,
        menu,
        setMenu,
        pizzas,
        setPizzas,
        loading,
        setLoading,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
