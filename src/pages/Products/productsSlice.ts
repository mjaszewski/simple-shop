import { createSelector } from '@reduxjs/toolkit'
import { fakeStoreApi } from '../../services/fakeStore'
import { Product } from '../../types'
import { arrayToObjectId } from '../../helpers/arrayToObjectId'

export const selectProductsResult = fakeStoreApi.endpoints.getProducts.select()

export const selectProductsObject = createSelector(
  selectProductsResult,
  (productsResult) => {
    const products = productsResult?.data ?? []
    const productsObject: Record<string, Product> = {}
    products.forEach(
      (product: Product) => (productsObject[product.id] = product)
    )

    return arrayToObjectId(products)
  }
)
