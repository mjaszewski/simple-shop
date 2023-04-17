import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import React, { PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import { setupStore } from '../store'
import type { AppStore, RootState } from '../store'
import type { PreloadedState } from '@reduxjs/toolkit'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import { theme } from '../theme'

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>
  store?: AppStore
}

export const renderWithProviders = (
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </BrowserRouter>
      </Provider>
    )
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

