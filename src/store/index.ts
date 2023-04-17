import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import type { PreloadedState } from '@reduxjs/toolkit'
import { fakeStoreApi } from '../services/fakeStore'
import cartReducer from '../pages/Cart/cartSlice'
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage'

const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['products'],
}

const cartPersistConfig = {
  key: 'cart',
  storage,
}

const rootReducer = combineReducers({
  cart: persistReducer(cartPersistConfig, cartReducer),
  [fakeStoreApi.reducerPath]: fakeStoreApi.reducer,
})

const persistedReducer = persistReducer(rootPersistConfig, rootReducer)

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(fakeStoreApi.middleware),
    preloadedState,
  })
}

export const store = setupStore()
setupListeners(store.dispatch)
export const persistor = persistStore(store)

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
