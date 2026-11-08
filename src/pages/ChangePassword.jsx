import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function ChangePassword() {
  const navigate = useNavigate()

  const [user, setUser] = useState({
    currentPassword: '',
    password: '',
    rePassword: ''
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

    const token = localStorage.getItem('token')

    if (!token) {
      setError('Please login first')
      return
    }

    try {
      setLoading(true)

      await axios.put(
        'https://ecommerce.routemisr.com/api/v1/users/changeMyPassword',
        user,
        {
          headers: {
            token: token
          }
        }
      )

      alert('Password changed successfully!')

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

          <h2 className="mb-4">Change Password</h2>

          {error && (
            <div className="alert alert-danger">{error}</div>
          )}

          <form onSubmit={handleSubmit}>

            <label className="mb-2">Current Password:</label>
            <input
              type="password"
              name="currentPassword"
              className="form-control mb-3"
              value={user.currentPassword}
              onChange={handleChange}
              required
            />

            <label className="mb-2">New Password:</label>
            <input
              type="password"
              name="password"
              className="form-control mb-3"
              value={user.password}
              onChange={handleChange}
              minLength="6"
              required
            />

            <label className="mb-2">Confirm New Password:</label>
            <input
              type="password"
              name="rePassword"
              className="form-control mb-3"
              value={user.rePassword}
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              className="btn btn-success"
              disabled={loading}
            >
              {loading ? 'Changing...' : 'Change Password'}
            </button>

          </form>

        </div>
      </div>
    </div>
  )
}

export default ChangePassword