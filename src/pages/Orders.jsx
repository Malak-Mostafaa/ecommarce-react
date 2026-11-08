import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function getOrders() {
      const userId = localStorage.getItem('userId')

      if (!userId) {
        setError('User ID not found. Please logout and login again.')
        setLoading(false)
        return
      }

      try {
        const response = await axios.get(
          `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
        )

        setOrders(response.data)

      } catch (err) {
        setError(
          err.response?.data?.message ||
          'Could not load your orders'
        )
      } finally {
        setLoading(false)
      }
    }

    getOrders()
  }, [])

  if (loading) {
    return <h3 className="text-center my-5">Loading orders...</h3>
  }

  if (error) {
    return (
      <div className="container my-5 text-center">
        <h4 className="text-danger">{error}</h4>
        <Link to="/login" className="btn btn-success mt-3">
          Login
        </Link>
      </div>
    )
  }

  return (
    <div className="container my-5">

      <h2 className="text-success mb-4">My Orders 📦</h2>

      {orders.length === 0 ? (
        <div className="text-center">
          <h4>No orders found</h4>
          <Link to="/products" className="btn btn-success mt-3">
            Shop Now
          </Link>
        </div>
      ) : (
        orders.map((order) => (
          <div className="card mb-4 shadow-sm" key={order._id}>

            <div className="card-body">

              <h5>Order #{order.id}</h5>

              <p>
                <strong>Date:</strong>{' '}
                {new Date(order.createdAt).toLocaleDateString()}
              </p>

              <p>
                <strong>Total Price:</strong>{' '}
                {order.totalOrderPrice} EGP
              </p>

              <p>
                <strong>Payment Method:</strong>{' '}
                {order.paymentMethodType}
              </p>

              <p>
                <strong>Payment Status:</strong>{' '}
                {order.isPaid ? 'Paid' : 'Not Paid'}
              </p>

              <p>
                <strong>Delivery Status:</strong>{' '}
                {order.isDelivered ? 'Delivered' : 'Not Delivered'}
              </p>

              <p>
                <strong>Shipping Address:</strong>{' '}
                {order.shippingAddress?.details},{' '}
                {order.shippingAddress?.city}
              </p>

              <hr />

              <h6>Products:</h6>

              {order.cartItems?.map((item, index) => (
                <div
                  className="d-flex align-items-center gap-3 border-bottom py-3"
                  key={index}
                >
                  <img
                    src={item.product?.imageCover}
                    alt={item.product?.title || 'Product'}
                    style={{
                      width: '80px',
                      height: '80px',
                      objectFit: 'contain'
                    }}
                  />

                  <div>
                    <h6>{item.product?.title}</h6>
                    <p className="mb-1">Price: {item.price} EGP</p>
                    <p className="mb-0">Quantity: {item.count}</p>
                  </div>
                </div>
              ))}

            </div>
          </div>
        ))
      )}

    </div>
  )
}

export default Orders