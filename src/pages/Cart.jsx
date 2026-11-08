import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Cart() {
  const [cart, setCart] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const token = localStorage.getItem('token')

  async function getCart() {
    if (!token) {
      setError('Please login first')
      setLoading(false)
      return
    }

    try {
      const response = await axios.get(
        'https://ecommerce.routemisr.com/api/v1/cart',
        {
          headers: { token: token }
        }
      )

      setCart(response.data.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  async function removeProduct(id) {
    try {
      await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          headers: { token: token }
        }
      )

      getCart()
    } catch (err) {
      alert(err.response?.data?.message || 'Could not remove product')
    }
  }

  async function updateQuantity(id, count) {
    if (count < 1) return

    try {
      await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        { count: count },
        {
          headers: { token: token }
        }
      )

      getCart()
    } catch (err) {
      alert(err.response?.data?.message || 'Could not update quantity')
    }
  }

  async function clearCart() {
    try {
      await axios.delete(
        'https://ecommerce.routemisr.com/api/v1/cart',
        {
          headers: { token: token }
        }
      )

      getCart()
    } catch (err) {
      alert(err.response?.data?.message || 'Could not clear cart')
    }
  }

  useEffect(() => {
    getCart()
  }, [])

  if (loading) {
    return <h3 className="text-center my-5">Loading...</h3>
  }

  if (error) {
    return <h3 className="text-center my-5">{error}</h3>
  }

  return (
    <div className="container my-5">

      <h2 className="mb-4">Shopping Cart 🛒</h2>

      {cart?.products?.length > 0 ? (
        <>
          <h5 className="mb-3">
            Total Price: {cart.totalCartPrice} EGP
          </h5>

          <button
            className="btn btn-danger mb-4"
            onClick={clearCart}
          >
            Clear Cart
          </button>

          {cart.products.map((item) => (
            <div
              className="row align-items-center border-bottom py-3"
              key={item._id}
            >

              <div className="col-md-2">
                <img
                  src={item.product.imageCover}
                  alt={item.product.title}
                  className="w-100"
                />
              </div>

              <div className="col-md-6">
                <h5>{item.product.title}</h5>
                <p className="text-success">
                  {item.price} EGP
                </p>

                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={() => removeProduct(item.product._id)}
                >
                  Remove
                </button>
              </div>

              <div className="col-md-4 d-flex align-items-center gap-3">

                <button
                  className="btn btn-outline-success"
                  onClick={() =>
                    updateQuantity(item.product._id, item.count - 1)
                  }
                  disabled={item.count <= 1}
                >
                  -
                </button>

                <span>{item.count}</span>

                <button
                  className="btn btn-outline-success"
                  onClick={() =>
                    updateQuantity(item.product._id, item.count + 1)
                  }
                >
                  +
                </button>

              </div>

            </div>
          ))}

          <Link to="/checkout" className="btn btn-success mt-4">
            Checkout
          </Link>
        </>
      ) : (
        <div className="text-center">
          <h4>Your cart is empty</h4>
          <Link to="/products" className="btn btn-success mt-3">
            Shop Now
          </Link>
        </div>
      )}

    </div>
  )
}

export default Cart