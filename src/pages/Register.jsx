import { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

function Register() {
  const navigate = useNavigate()

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    rePassword: '',
    phone: ''
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

    if (user.password !== user.rePassword) {
      setError('Passwords do not match')
      return
    }

    try {
      setLoading(true)

      await axios.post(
        'https://ecommerce.routemisr.com/api/v1/auth/signup',
        user
      )

      alert('Account created successfully!')
      navigate('/login')

    } catch (err) {
      console.log('Register Error:', err.response?.data)

      const apiError = err.response?.data

      setError(
        apiError?.errors?.msg ||
        apiError?.message ||
        'Something went wrong'
      )

    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-7">

          <h2 className="mb-4">Register Now</h2>

          {error && (
            <div className="alert alert-danger">{error}</div>
          )}

          <form onSubmit={handleSubmit}>

            <label className="mb-2">Name:</label>
            <input
              type="text"
              name="name"
              className="form-control mb-3"
              value={user.name}
              onChange={handleChange}
              required
            />

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
              minLength="6"
              required
            />

            <label className="mb-2">Confirm Password:</label>
            <input
              type="password"
              name="rePassword"
              className="form-control mb-3"
              value={user.rePassword}
              onChange={handleChange}
              required
            />

            <label className="mb-2">Phone:</label>
            <input
              type="tel"
              name="phone"
              className="form-control mb-3"
              value={user.phone}
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              className="btn btn-success"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Register'}
            </button>

          </form>

          <p className="mt-3">
            Already have an account? <Link to="/login">Login</Link>
          </p>

        </div>
      </div>
    </div>
  )
}

export default Register