import { configureStore } from "@reduxjs/toolkit";
import { ordersReducer } from "./ordersReducer";

let reducers = ({
    orders: ordersReducer
})

let store = configureStore({
    reducer: reducers,
})

export default store