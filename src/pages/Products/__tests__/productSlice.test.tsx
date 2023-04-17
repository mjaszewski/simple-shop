import { selectProductsObject } from '../productsSlice'
import { RootState, setupStore } from '../../../store'
import { fakeStoreApi } from '../../../services/fakeStore'
import { productsResponse } from '../../../test/stubs'

describe('Product slice', () => {
  it('Get products', async () => {
    const store = setupStore()
    await store.dispatch(fakeStoreApi.endpoints.getProducts.initiate())
    const products = selectProductsObject(store.getState() as RootState)
    expect(Object.values(products)).toEqual(productsResponse)
  })
})
