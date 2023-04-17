import { createSelector, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { Product } from '../../types'
import { selectProductsResult } from '../Products/productsSlice'
import { arrayToObjectId } from '../../helpers/arrayToObjectId'
import { formatPrice } from '../../helpers/formatPrice'

export interface CartState {
  products: {
    [key: number | string]: number
  }
}

const initialState: CartState = {
  products: {},
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product['id']>) => {
      if (state.products[action.payload]) {
        state.products[action.payload]++
      } else {
        state.products[action.payload] = 1
      }
    },
    updateQuantityProduct: (
      state,
      action: PayloadAction<{ id: Product['id']; quantity: number }>
    ) => {
      state.products[action.payload.id] = action.payload.quantity
    },
    removeProduct: (state, action: PayloadAction<Product['id']>) => {
      state.products[action.payload]--
    },
    removeAllProducts: (state, action: PayloadAction<Product['id']>) => {
      delete state.products[action.payload]
    },
    clearCart: (state) => {
      state.products = initialState.products
    },
  },
})

export const {
  addProduct,
  updateQuantityProduct,
  removeProduct,
  removeAllProducts,
  clearCart,
} = cartSlice.actions

export default cartSlice.reducer

export const selectNumberOfProducts = createSelector(
  (state: RootState) => state.cart.products,
  (products) => {
    let count = 0
    Object.values(products).forEach((value) => (count = count + value))

    return count
  }
)

export const selectCartProducts = createSelector(
  (state: RootState) => state.cart.products,
  (products) => products
)

export const selectCartProductsTotalValue = createSelector(
  (state: RootState) => state.cart.products,
  selectProductsResult,
  (cartProducts, productsResult) => {
    const products = productsResult?.data ?? []
    const objectProducts = arrayToObjectId(products)

    const totalPrice = Object.keys(cartProducts).reduce(
      (accumulator: number, currentValue: string) => {
        const productPrice = objectProducts[currentValue]?.price || 0

        return productPrice * cartProducts[currentValue] + accumulator
      },
      0
    )

    return formatPrice(totalPrice)
  }
)
