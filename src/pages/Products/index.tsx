import { FC } from 'react'
import { useGetProductsQuery } from '../../services/fakeStore'
import ProductCard from './components/ProductCard'
import Grid from '@mui/material/Grid'
import WithLoading from '../../components/WithLoading'
import { Product } from '../../types'
import useDocumentTitle from '../../hooks/useDocumentTitle'

const Products: FC = () => {
  useDocumentTitle('Shop')
  const { data, error, isLoading } = useGetProductsQuery()

  return (
    <WithLoading isLoading={isLoading} error={error}>
      <Grid container spacing={2}>
        {data?.map((product: Product) => (
          <Grid item xs={12} md={4} key={product.id} sx={{ display: 'flex' }}>
            <ProductCard
              key={product.id}
              id={product.id}
              description={product.description}
              price={product.price}
              image={product.image}
              title={product.title}
              category={product.category}
              rating={product.rating}
            />
          </Grid>
        ))}
      </Grid>
    </WithLoading>
  )
}

export default Products
