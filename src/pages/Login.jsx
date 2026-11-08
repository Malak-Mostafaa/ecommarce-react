import { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

function Login() {
  const navigate = useNavigate()

  const [user, setUser] = useState({
    email: '',
    password: ''
  })

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/auth/signin',
        user
      )

      const token = response.data.token

      // Decode token to get user ID
      const decoded = jwtDecode(token)

      // Print field names only, not token values
      console.log('JWT fields:', Object.keys(decoded))

      const userId =
        decoded.id ||
        decoded._id ||
        decoded.userId ||
        decoded.user?.id ||
        decoded.user?._id

      localStorage.setItem('token', token)

      if (userId) {
        localStorage.setItem('userId', userId)
      } else {
        localStorage.removeItem('userId')
        console.warn('User ID was not found in JWT')
      }

      window.dispatchEvent(new Event('authChange'))

      alert('Login successful!')
      navigate('/products')

    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        'Login failed. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-7">

          <h2 className="mb-4">Login Now</h2>

          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <label className="mb-2">Email:</label>

            <input
              type="email"
              name="email"
              className="form-control mb-3"
              value={user.email}
              onChange={handleChange}
              required
            />

            <label className="mb-2">Password:</label>

            <input
              type="password"
              name="password"
              className="form-control mb-3"
              value={user.password}
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              className="btn btn-success"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>

          </form>

          <p className="mt-3">
            Don't have an account?{' '}
            <Link to="/register">Register</Link>
          </p>

          <p>
            <Link to="/forgot-password">
              Forgot Password?
            </Link>
          </p>

        </div>
      </div>
    </div>
  )
}

export default Login