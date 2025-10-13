import React, { createContext, useContext, useReducer } from "react";

/*
    To make our shopping cart, we can just use react context + a useReducer() hook to handle the 
    more complex state logic: https://medium.com/zestgeek/mastering-reacts-usereducer-hook-a-comprehensive-guide-with-examples-e48c2f306566 
    Essentially, you create the following:
    1) A list of action types (CART_ACTIONS)
    2) a reducer function (cartReducer()) that takes the current state (what the cart looks like now) and the action (what operation to perform)
    3) The CartProvider component uses useReducer() to manage state and provide helper functions. 
       Basically, the CartProvider component makes everything available for us to work with in ShoppingCart.js component!
       (The helper files, like addToCart() create action objects sent to the reducer via dispatch()

    Then, App.js wraps everything in <CartProvider> so that any component can use const { addToCart, cartState } = useCart()
*/

//Cart actions
const CART_ACTIONS = {
  ADD_TO_CART: "ADD_TO_CART",
  UPDATE_QUANTITY: "UPDATE_QUANTITY",
  REMOVE_FROM_CART: "REMOVE_FROM_CART",
  CLEAR_CART: "CLEAR_CART",
};

//Cart reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_TO_CART:
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (existingItemIndex > -1) {
        // Item already exists, update quantity
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += action.payload.quantity;
        return {
          ...state,
          items: updatedItems,
        };
      } else {
        // New item, add to cart
        return {
          ...state,
          items: [...state.items, action.payload],
        };
      }

    case CART_ACTIONS.UPDATE_QUANTITY:
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: action.payload.quantity }
              : item
          )
          .filter((item) => item.quantity > 0), // Remove items with 0 quantity
      };

    case CART_ACTIONS.REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };

    case CART_ACTIONS.CLEAR_CART:
      return {
        ...state,
        items: [],
      };

    default:
      return state;
  }
};

//Initial cart state
const initialCartState = {
  items: [],
};

//Create cart context
const CartContext = createContext();

//Cart provider component
export const CartProvider = ({ children }) => {
  //This is the hook
  const [cartState, dispatch] = useReducer(cartReducer, initialCartState);

  const addToCart = (product, quantity = 1) => {
    dispatch({
      type: CART_ACTIONS.ADD_TO_CART,
      payload: {
        id: product.id,
        name: product.name,
        price: product.price || 59.99, // Default price if not provided. Again, this is something we'd want to grab from the backend!
        quantity: parseInt(quantity),
      },
    });
  };

  const updateQuantity = (productId, quantity) => {
    dispatch({
      type: CART_ACTIONS.UPDATE_QUANTITY,
      payload: {
        id: productId,
        quantity: parseInt(quantity),
      },
    });
  };

  const removeFromCart = (productId) => {
    dispatch({
      type: CART_ACTIONS.REMOVE_FROM_CART,
      payload: { id: productId },
    });
  };

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  };

  const getTotalItems = () => {
    return cartState.items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartState.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const value = {
    cartState,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotalItems,
    getTotalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

//Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export { CART_ACTIONS };
