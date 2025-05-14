import { configureStore } from "@reduxjs/toolkit"
import { addProduct } from "./slice"

export const store = configureStore ({
    reducer:{
        addProduct:addProduct
    }
})