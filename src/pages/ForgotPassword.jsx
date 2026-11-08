import { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

function ForgotPassword() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    try {
      setLoading(true)

      await axios.post(
        'https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',
        { email: email }
      )

      alert('Verification code sent to your email!')
      navigate('/verify-code')

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

          <h2 className="mb-4">Forgot Password</h2>

          <p>Enter your email to receive a verification code.</p>

          {error && (
            <div className="alert alert-danger">{error}</div>
          )}

          <form onSubmit={handleSubmit}>

            <label className="mb-2">Email:</label>

            <input
              type="email"
              className="form-control mb-3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button
              type="submit"
              className="btn btn-success"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Code'}
            </button>

          </form>

          <p className="mt-3">
            Remember your password? <Link to="/login">Login</Link>
          </p>

        </div>
      </div>
    </div>
  )
}

export default ForgotPassword