import { all, call } from "redux-saga/effects";
import { cartSagas } from "./cart/cart.sagas";
import { shopSaga } from "./shop/shop.saga";
import { userSagas } from "./user/user.sagas";

export function* rootSaga(){
    yield all([call(shopSaga),call(userSagas),call(cartSagas)]);
}