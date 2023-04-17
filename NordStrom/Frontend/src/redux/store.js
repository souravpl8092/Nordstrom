import { authReducer } from "./auth/reducer";
import { CartsReducer } from "./CartPage/reducer";
import { productReducer } from "./product/reducer";
import thunk from "redux-thunk";
import {
  legacy_createStore,
  applyMiddleware,
  combineReducers,
  compose
} from "redux";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  cartPage: CartsReducer
});

export const store = legacy_createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
