import { FC, useState } from 'react'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { selectProductsObject } from '../Products/productsSlice'
import {
  addProduct,
  removeAllProducts,
  removeProduct,
  selectCartProducts,
  selectCartProductsTotalValue,
  updateQuantityProduct,
  clearCart,
} from './cartSlice'
import { useGetProductsQuery } from '../../services/fakeStore'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import CartItem from './components/CartItem'
import WithLoading from '../../components/WithLoading'
import { Product } from '../../types'
import useDocumentTitle from '../../hooks/useDocumentTitle'

enum CheckoutState {
  READY,
  PROCEEDED,
}

const Cart: FC = () => {
  useDocumentTitle('Cart')
  const [cartState, setCartState] = useState(CheckoutState.READY)
  const dispatch = useAppDispatch()
  const { error, isLoading } = useGetProductsQuery()
  const products = useAppSelector(selectProductsObject)
  const cartProducts = useAppSelector(selectCartProducts)
  const totalValue = useAppSelector(selectCartProductsTotalValue)

  if (
    Object.entries(cartProducts).length === 0 ||
    cartState === CheckoutState.PROCEEDED
  ) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography variant="h3">
          {cartState === CheckoutState.PROCEEDED
            ? 'Checkout successful'
            : 'Cart is empty'}
        </Typography>
      </Box>
    )
  }

  const handleAddProduct = (id: Product['id']) => {
    dispatch(addProduct(id))
  }

  const handleRemoveProduct = (id: Product['id']) => {
    dispatch(removeProduct(id))
  }

  const handleRemoveAllProducts = (id: Product['id']) => {
    dispatch(removeAllProducts(id))
  }

  const handleUpdateQuantityProduct = (id: Product['id'], quantity: number) => {
    dispatch(updateQuantityProduct({ id, quantity }))
  }

  const handleCheckout = () => {
    setCartState(CheckoutState.PROCEEDED)
    dispatch(clearCart())
  }

  return (
    <WithLoading isLoading={isLoading} error={error}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">Product</TableCell>
              <TableCell
                sx={{ display: { xs: 'none', md: 'table-cell' } }}
                align="center"
              >
                Price
              </TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="center">Total</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(cartProducts).map(([id, quantity]) => (
              <CartItem
                key={id}
                id={id}
                image={products[id]?.image}
                title={products[id]?.title}
                price={products[id]?.price}
                quantity={quantity}
                addProduct={handleAddProduct}
                removeProduct={handleRemoveProduct}
                removeAllProducts={handleRemoveAllProducts}
                updateQuantityProduct={handleUpdateQuantityProduct}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ mt: 2, textAlign: 'right' }}>
        <Box sx={{ mt: 2 }}>
          <Typography variant="h5">Total: {totalValue}$</Typography>
        </Box>
        <Box sx={{ mt: 1 }}>
          <Button aria-label='checkout' variant="contained" color="success" onClick={handleCheckout}>
            Proceed to checkout
          </Button>
        </Box>
      </Box>
    </WithLoading>
  )
}

export default Cart
