import { createSlice, nanoid } from "@reduxjs/toolkit"

const initialslice = {
    cart:[]
}

const slice = createSlice({
    name: 'cart',
    initialState: initialslice,
    reducers: {
        addProduct(state, action) {
            const data = {
                id:nanoid,
                cart:action.payload
            }
            state.cart.push(data)
        },
        deleteProduct(state,action){
            const delProduct = state.cart.filter(item => item.id !== action.payload)
            state.cart = delProduct
        }
    }
})

export const { addProduct,deleteProduct } = slice.actions;