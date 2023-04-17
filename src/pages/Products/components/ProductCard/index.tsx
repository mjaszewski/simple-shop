import { FC } from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Typography from '@mui/material/Typography'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

import Rating from '@mui/material/Rating'
import { Product } from '../../../../types'
import { addProduct } from '../../../Cart/cartSlice'
import { useAppDispatch } from '../../../../store/hooks'
import { formatPrice } from '../../../../helpers/formatPrice'

export const ProductCard: FC<Product> = ({
  id,
  title,
  category,
  description,
  price,
  image,
  rating,
}: Product) => {
  const dispatch = useAppDispatch()

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column' }}>
      <CardHeader title={title} subheader={category} />
      <CardMedia component="img" height="194" image={image} alt="Paella dish" />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions sx={{ flexDirection: 'column', mt: 'auto' }} disableSpacing>
        <Box
          sx={{
            mt: 1,
            mb: 3,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {rating && (
            <Box sx={{ display: 'flex', alignItems: 'end' }}>
              <Rating
                name="read-only"
                defaultValue={rating.rate}
                precision={0.5}
                readOnly
              />
              <Typography
                align="right"
                variant="caption"
                color="text.secondary"
              >
                {rating.count}
              </Typography>
            </Box>
          )}
          <Typography align="right" variant="h6" color="text.primary">
            {formatPrice(price)}$
          </Typography>
        </Box>
        <Button
          variant="outlined"
          startIcon={<AddShoppingCartIcon />}
          onClick={() => dispatch(addProduct(id))}
        >
          Add to cart
        </Button>
      </CardActions>
    </Card>
  )
}

export default ProductCard
