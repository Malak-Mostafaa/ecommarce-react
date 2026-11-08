import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function ResetPassword() {
  const navigate = useNavigate()

  const [user, setUser] = useState({
    email: '',
    newPassword: ''
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

    try {
      setLoading(true)

      await axios.put(
        'https://ecommerce.routemisr.com/api/v1/auth/resetPassword',
        user
      )

      alert('Password reset successfully!')

      localStorage.removeItem('token')
      navigate('/login')

    } catch (err) {
      setError(
        err.response?.data?.message ||
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

          <h2 className="mb-4">Reset Password</h2>

          {error && (
            <div className="alert alert-danger">{error}</div>
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

            <label className="mb-2">New Password:</label>
            <input
              type="password"
              name="newPassword"
              className="form-control mb-3"
              value={user.newPassword}
              onChange={handleChange}
              minLength="6"
              required
            />

            <button
              type="submit"
              className="btn btn-success"
              disabled={loading}
            >
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>

          </form>

        </div>
      </div>
    </div>
  )
}

export default ResetPassword