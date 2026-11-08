import axios from 'axios'

async function addToCart(productId) {
  const token = localStorage.getItem('token')

  if (!token) {
    alert('Please login first')
    return
  }

  try {
    await axios.post(
      'https://ecommerce.routemisr.com/api/v1/cart',
      {
        productId: productId
      },
      {
        headers: {
          token: token
        }
      }
    )

    alert('Product added to cart successfully!')

  } catch (error) {
    alert(
      error.response?.data?.message ||
      'Something went wrong'
    )
  }
}

export default addToCart