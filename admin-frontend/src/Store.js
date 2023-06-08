import { createContext, useReducer } from "react";

export const Store = createContext();

const initialState = {
  fullBox: false,
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  cart: {
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : { location: {} },

    paymentMethod: localStorage.getItem("paymentMethod")
      ? localStorage.getItem("paymentMethod")
      : "",
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
  favorite: {
    favoriteItems: localStorage.getItem("favoriteItems")
      ? JSON.parse(localStorage.getItem("favoriteItems"))
      : [],
  },
  pos: {
    posItems: localStorage.getItem("posItems")
      ? JSON.parse(localStorage.getItem("posItems"))
      : [],
  },
  holding: {
    holdingItems: localStorage.getItem("holdingItems")
      ? JSON.parse(localStorage.getItem("holdingItems"))
      : [],
  },
  moveBackholding: {
    moveBackholdingItems: localStorage.getItem("moveBackholdingItems")
      ? JSON.parse(localStorage.getItem("moveBackholdingItems"))
      : [],
  },
};
function reducer(state, action) {
  switch (action.type) {
    case "SET_FULLBOX_ON":
      return { ...state, fullBox: true };
    case "SET_FULLBOX_OFF":
      return { ...state, fullBox: false };
    case "CART_ADD_ITEM":
      // add to cart
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    case "CART_REMOVE_ITEM": {
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case "CART_CLEAR":
      return { ...state, cart: { ...state.cart, cartItems: [] } };

    //
    //add to favorite
    case "FAV_ADD_ITEM":
      const favItem = action.payload;
      const favexistItem = state.favorite.favoriteItems.find(
        (item) => item._id === favItem._id
      );
      const favoriteItems = favexistItem
        ? state.favorite.favoriteItems.map((item) =>
            item._id === favexistItem._id ? favItem : item
          )
        : [...state.favorite.favoriteItems, favItem];
      localStorage.setItem("favoriteItems", JSON.stringify(favoriteItems));
      return { ...state, favorite: { ...state.favorite, favoriteItems } };
    case "FAV_REMOVE_ITEM": {
      const favoriteItems = state.favorite.favoriteItems.filter(
        (item) => item._id !== action.payload._id
      );
      localStorage.setItem("favoriteItems", JSON.stringify(favoriteItems));
      return { ...state, favorite: { ...state.favorite, favoriteItems } };
    }
    case "FAV_CLEAR":
      return { ...state, favorite: { ...state.favorite, favoriteItems: [] } };

    // holding part
    case "HOL_ADD_ITEM":
      const holItem = action.payload;
      console.log("holItem      cong-6666666666666666");
      const holdingItems = Object.values(holItem);

      holdingItems.forEach((item) => {
        console.log(item.name);
      });
      console.log(Object.values(holItem));
      // const holxistItem = state.favorite.favoriteItems.find(
      //   (item) => item._id === favItem._id
      // );
      // const holdingItems = [holItem];
      // const holdingItems = holdingItems
      // holdingItems = holdingItems.push[holItem];
      // const favoriteItems = favexistItem
      //   ? state.favorite.favoriteItems.map((item) =>
      //       item._id === favexistItem._id ? favItem : item
      //     )
      //   : [...state.favorite.favoriteItems, favItem];
      // localStorage.setItem("favoriteItems", JSON.stringify(favoriteItems));
      localStorage.setItem("holdingItems", JSON.stringify(holdingItems));
      localStorage.setItem(
        "moveBackholdingItems",
        JSON.stringify(holdingItems)
      );

      // return { ...state, favorite: { ...state.favorite, favoriteItems } };
      return { ...state, holding: { ...state.holding, holdingItems } };

    case "HOL_REMOVE_ITEM": {
      const theCurrentOne = JSON.parse(
        localStorage.getItem("moveBackholdingItems")
      );
      // const holdingItems = [];
      // const holdingItems = JSON.parse(localStorage.getItem("holdingItems"));
      localStorage.removeItem("holdingItems");
      localStorage.removeItem("posItems");
      // localStorage.removeItem(key);
      console.log("holItem      cong-88888888888888888 -1111");
      console.log(theCurrentOne);
      console.log("holItem      cong-88888888888888888 -2222");
      // console.log(holdingItems);
      return (
        {
          ...state,
          moveBackholding: {
            ...state.moveBackholding,
            moveBackholdingItems: theCurrentOne,
          },
        },
        { ...state, holding: { ...state.holding, holdingItems: [] } }
      );
    }
    case "HOL_CLEAR":
      // return { ...state, favorite: { ...state.favorite, favoriteItems: [] } };
      return { ...state, holding: { ...state.holding, holdingItems: [] } };

    //add to pos
    case "POS_ADD_ITEM":
      const posItem = action.payload;
      const posexistItem = state.pos.posItems.find(
        (item) => item._id === posItem._id
      );
      const posItems = posexistItem
        ? state.pos.posItems.map((item) =>
            item._id === posexistItem._id ? posItem : item
          )
        : [...state.pos.posItems, posItem];
      localStorage.setItem("posItems", JSON.stringify(posItems));
      return { ...state, pos: { ...state.pos, posItems } };

    case "POS_REMOVE_ITEM": {
      const posItems = state.pos.posItems.filter(
        (item) => item._id !== action.payload._id
      );
      localStorage.setItem("posItems", JSON.stringify(posItems));
      return { ...state, pos: { ...state.pos, posItems } };
    }

    case "POS_CLEAR":
      return { ...state, pos: { ...state.pos, posItems: [] } };

    // Sign in
    case "USER_SIGNIN":
      return { ...state, userInfo: action.payload };
    case "USER_SIGNOUT":
      return {
        ...state,
        userInfo: null,
        cart: {
          cartItems: [],
          shippingAddress: {},
          paymentMethod: "",
        },
      };
    case "SAVE_SHIPPING_ADDRESS":
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: action.payload,
        },
      };
    case "SAVE_SHIPPING_ADDRESS_POS":
      return {
        ...state,
        pos: {
          ...state.pos,
          shippingAddress: action.payload,
        },
      };
    case "SAVE_SHIPPING_ADDRESS_MAP_LOCATION":
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: {
            ...state.cart.shippingAddress,
            location: action.payload,
          },
        },
      };
    case "SAVE_PAYMENT_METHOD":
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload },
      };
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children} </Store.Provider>;
}
