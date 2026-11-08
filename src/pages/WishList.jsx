import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import addToCart from '../utils/addToCart'

function Wishlist() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const token = localStorage.getItem('token')

  async function getWishlist() {
    if (!token) {
      setError('Please login first')
      setLoading(false)
      return
    }

    try {
      const response = await axios.get(
        'https://ecommerce.routemisr.com/api/v1/wishlist',
        {
          headers: {
            token: token
          }
        }
      )

      setProducts(response.data.data)
    } catch (error) {
      setError(error.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  async function removeFromWishlist(productId) {
    try {
      await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        {
          headers: {
            token: token
          }
        }
      )

      setProducts(products.filter((product) => product._id !== productId))

      alert('Product removed from wishlist!')

    } catch (error) {
      alert(error.response?.data?.message || 'Could not remove product')
    }
  }

  useEffect(() => {
    getWishlist()
  }, [])

  if (loading) {
    return <h3 className="text-center my-5">Loading...</h3>
  }

  if (error) {
    return <h3 className="text-center my-5">{error}</h3>
  }

  return (
    <div className="container my-5">

      <h2 className="mb-4">My Wishlist ❤️</h2>

      {products.length === 0 ? (
        <div className="text-center">
          <h4>Your wishlist is empty</h4>

          <Link to="/products" className="btn btn-success mt-3">
            Shop Now
          </Link>
        </div>
      ) : (
        <div className="row g-4">

          {products.map((product) => (
            <div className="col-md-3" key={product._id}>

              <div className="card h-100">

                <Link to={`/products/${product._id}`}>
                  <img
                    src={product.imageCover}
                    alt={product.title}
                    className="card-img-top"
                  />
                </Link>

                <div className="card-body d-flex flex-column">

                  <h6>{product.title}</h6>

                  <p className="text-success">
                    {product.price} EGP
                  </p>

                  <button
                    className="btn btn-success mt-auto"
                    onClick={() => addToCart(product._id)}
                  >
                    Add to Cart
                  </button>

                  <button
                    className="btn btn-outline-danger mt-2"
                    onClick={() => removeFromWishlist(product._id)}
                  >
                    Remove ❤️
                  </button>

                </div>

              </div>
            </div>
          ))}

        </div>
      )}

    </div>
  )
}

export default Wishlist