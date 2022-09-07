import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";
import { ProductProps } from "../components/Product";
import allProducts from "../data/items.json";
import { StoreReducer } from "./Reducer";

type StoreProviderProps = {
  children: ReactNode;
};

type StoreContext = {
  state: any;
  dispatch: any;
};

const StoreContext = createContext({} as StoreContext);

export function useStoreContext() {
  return useContext(StoreContext);
}

const initialState = {
  products: allProducts,
  cart: [],
  country: "SGD",
};

export function StoreProvider({ children }: StoreProviderProps) {
  const [state, dispatch] = useReducer(StoreReducer, initialState, () => {
    const country = localStorage.getItem("country");
    const cart = localStorage.getItem("cart");
    return {
      ...initialState,
      country: country ? country : initialState.country,
      cart: cart ? JSON.parse(cart) : initialState.cart,
    };
  });

  useEffect(() => {
    localStorage.setItem("country", state.country);
  }, [state.country]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}
