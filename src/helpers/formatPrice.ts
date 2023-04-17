export const formatPrice = (price: string | number) => {
  if (typeof price === 'string') {
    return parseFloat(price).toFixed(2)
  }

  return price?.toFixed(2)
}
