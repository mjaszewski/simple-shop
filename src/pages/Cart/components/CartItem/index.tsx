import { MouseEvent, ChangeEvent, FC, useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import Box from '@mui/material/Box'
import RemoveIcon from '@mui/icons-material/Remove'
import Avatar from '@mui/material/Avatar'
import TextField, { TextFieldProps } from '@mui/material/TextField'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import { formatPrice } from '../../../../helpers/formatPrice'
import { Product } from '../../../../types'

const StyledImage = styled('img')(() => ({
  width: '100%',
  height: '100%',
}))

const StyledTextField = styled(TextField)<TextFieldProps>(() => ({
  input: {
    textAlign: 'center',
  },
}))

type CartProps = {
  quantity: number
  addProduct: (id: Product['id']) => void
  removeProduct: (id: Product['id']) => void
  removeAllProducts: (id: Product['id']) => void
  updateQuantityProduct: (id: Product['id'], productQuantity: number) => void
}

const Cart: FC<Product & CartProps> = ({
  id,
  image,
  title,
  price,
  quantity,
  addProduct,
  removeProduct,
  removeAllProducts,
  updateQuantityProduct,
}) => {
  const [productQuantity, setProductQuantity] = useState(quantity)

  useEffect(() => {
    setProductQuantity(quantity)
  }, [quantity])

  const handleChangeQuantity = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    if (value) {
      setProductQuantity(value)
    } else {
      setProductQuantity(productQuantity)
    }
  }

  const handleBlurQuantity = () => {
    updateQuantityProduct(id, productQuantity)
  }

  const handleOnClick = (e: MouseEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    target.select()
  }

  return (
    <TableRow
      key={id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar sx={{ display: { xs: 'none', md: 'block' } }}>
            <StyledImage src={image} />
          </Avatar>
          <Box sx={{ ml: { xs: 'none', md: 1 } }}>{title}</Box>
        </Box>
      </TableCell>
      <TableCell
        sx={{ display: { xs: 'none', md: 'table-cell' } }}
        align="center"
      >
        {formatPrice(price)}$
      </TableCell>
      <TableCell align="center">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: { xs: 'column', md: 'row' },
          }}
        >
          <IconButton aria-label="add" onClick={() => addProduct(id)}>
            <AddIcon />
          </IconButton>
          <StyledTextField
            sx={{ maxWidth: '90px' }}
            type="number"
            label="Quantity"
            variant="outlined"
            size="small"
            value={productQuantity}
            onClick={handleOnClick}
            onChange={handleChangeQuantity}
            onBlur={handleBlurQuantity}
          />
          <IconButton
            aria-label="remove"
            disabled={quantity === 1}
            onClick={() => removeProduct(id)}
          >
            <RemoveIcon />
          </IconButton>
        </Box>
      </TableCell>
      <TableCell align="center">{formatPrice(price * quantity)}$</TableCell>
      <TableCell align="right">
        <IconButton aria-label="removeAll" onClick={() => removeAllProducts(id)}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}

export default Cart
