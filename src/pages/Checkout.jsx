import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Checkout() {
  const navigate = useNavigate()

  const [details, setDetails] = useState('')
  const [phone, setPhone] = useState('')
  const [city, setCity] = useState('')
  const [loading, setLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('cash')
  const [error, setError] = useState('')

  async function handleCheckout(e) {
    e.preventDefault()

    const token = localStorage.getItem('token')

    if (!token) {
      alert('Please login first')
      navigate('/login')
      return
    }

    setLoading(true)
    setError('')

    try {
      // Get cart information
      const cartResponse = await axios.get(
        'https://ecommerce.routemisr.com/api/v1/cart',
        {
          headers: {
            token: token
          }
        }
      )

      const cartId = cartResponse.data.cartId

      if (!cartId || cartResponse.data.numOfCartItems === 0) {
        setError('Your cart is empty')
        return
      }

      const shippingAddress = {
        details: details,
        phone: phone,
        city: city
      }

      if (paymentMethod === 'cash') {

        // Cash on Delivery
        await axios.post(
          `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
          {
            shippingAddress: shippingAddress
          },
          {
            headers: {
              token: token
            }
          }
        )

        alert('Order placed successfully! 🎉')
        navigate('/orders')

      } else {

        // Online Payment
        const response = await axios.post(
          `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
          {
            shippingAddress: shippingAddress
          },
          {
            headers: {
              token: token
            },
            params: {
              url: window.location.origin
            }
          }
        )

        const paymentUrl = response.data.session?.url

        if (paymentUrl) {
          window.location.assign(paymentUrl)
        } else {
          setError('Payment link was not returned. Please try again.')
        }
      }

    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Checkout failed. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container my-5">

      <h2 className="text-center text-success mb-4">
        Checkout 🛍️
      </h2>

      <div className="row justify-content-center">
        <div className="col-md-6">

          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}

          <form onSubmit={handleCheckout}>

            <div className="mb-3">
              <label className="form-label">
                Address Details
              </label>

              <input
                type="text"
                className="form-control"
                placeholder="Street, building, apartment"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                Phone Number
              </label>

              <input
                type="tel"
                className="form-control"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label">
                City
              </label>

              <input
                type="text"
                className="form-control"
                placeholder="Enter your city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>

            <h5 className="mb-3">Choose Payment Method</h5>

            <div className="border rounded p-3 mb-3">

              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="radio"
                  name="paymentMethod"
                  id="cash"
                  value="cash"
                  checked={paymentMethod === 'cash'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />

                <label
                  className="form-check-label"
                  htmlFor="cash"
                >
                  💵 Cash on Delivery
                </label>
              </div>

              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="paymentMethod"
                  id="online"
                  value="online"
                  checked={paymentMethod === 'online'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />

                <label
                  className="form-check-label"
                  htmlFor="online"
                >
                  💳 Pay Online
                </label>
              </div>

            </div>

            <button
              type="submit"
              className="btn btn-success w-100"
              disabled={loading}
            >
              {loading
                ? 'Processing...'
                : paymentMethod === 'cash'
                  ? 'Place Order (Cash)'
                  : 'Proceed to Online Payment'
              }
            </button>

          </form>

        </div>
      </div>
    </div>
  )
}

export default Checkout