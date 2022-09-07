export const CHANGE_COUNTRY = "CHANGE_COUNTRY";
export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_CART = "REMOVE_CART";

export const StoreReducer = (state: any, action: any) => {
  switch (action.type) {
    case CHANGE_COUNTRY:
      return { ...state, country: action.payload };
    case ADD_TO_CART:
      let cart = [...state.cart];
      const itemExist = cart.find(
        (item: any) => item.product.id === action.payload.id
      );
      if (itemExist) {
        cart = [...state.cart].map((item: any) => {
          if (item.product.id === action.payload.id) {
            return { ...item, qty: item.qty + 1 };
          }
          return { ...item };
        });
      } else {
        cart.push({ product: { ...action.payload }, qty: 1 });
      }
      return { ...state, cart: cart };
    case REMOVE_CART:
      return { ...state, cart: [] };
    default:
      return state;
  }
};
