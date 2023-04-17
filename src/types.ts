export type Product = {
  id: number | string
  title: string
  category?: string
  description?: string
  price: number
  image: string
  rating?: {
    rate: number
    count: number
  }
}
