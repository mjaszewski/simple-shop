import cartReducer, {
  addProduct,
  updateQuantityProduct,
  removeProduct,
  removeAllProducts,
  clearCart,
  selectCartProducts,
  selectNumberOfProducts,
  CartState,
  selectCartProductsTotalValue,
} from '../cartSlice'
import { RootState, setupStore } from '../../../store'
import { fakeStoreApi } from '../../../services/fakeStore'

describe('Cart slice', () => {
  it('should handle addToCart', () => {
    const initialState = undefined
    const state = cartReducer(initialState, addProduct('1'))
    expect(state).toEqual({
      products: { 1: 1 },
    })
  })
  it('should handle updateQuantityProduct', () => {
    const initialState = undefined
    const state = cartReducer(
      initialState,
      updateQuantityProduct({ id: '1', quantity: 2 })
    )
    expect(state).toEqual({
      products: { 1: 2 },
    })
  })
  it('should handle removeProduct', () => {
    const initialState = {
      products: { 1: 2 },
    }
    const state = cartReducer(initialState, removeProduct('1'))
    expect(state).toEqual({
      products: { 1: 1 },
    })
  })
  it('should handle removeAllProducts', () => {
    const initialState = {
      products: { 1: 2 },
    }
    const state = cartReducer(initialState, removeAllProducts('1'))
    expect(state).toEqual({
      products: {},
    })
  })
  it('should handle clearCart', () => {
    const initialState = {
      products: { 1: 2, 2: 1 },
    }
    const state = cartReducer(initialState, clearCart())
    expect(state).toEqual({
      products: {},
    })
  })
  it('should return number of products', () => {
    const initialState: CartState = {
      products: { 1: 2, 2: 1 },
    }
    const numberOfProducts = selectNumberOfProducts({
      cart: initialState,
    } as RootState)
    expect(numberOfProducts).toBe(3)
  })

  it('should return cart products', () => {
    const initialState: CartState = {
      products: { 1: 2, 2: 1 },
    }
    const products = selectCartProducts({ cart: initialState } as RootState)
    expect(products).toEqual(initialState.products)
  })

  it('should return total value', async () => {
    const initialState: CartState = {
      products: { 1: 2, 2: 1 },
    }
    const store = setupStore()
    await store.dispatch(fakeStoreApi.endpoints.getProducts.initiate())
    const totalValue = selectCartProductsTotalValue({
      ...store.getState() as RootState,
      cart: initialState,
    } as RootState)

    expect(totalValue).toBe('242.20')
  })
})
