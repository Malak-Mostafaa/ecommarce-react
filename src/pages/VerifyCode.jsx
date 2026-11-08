import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function VerifyCode() {
  const navigate = useNavigate()

  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    try {
      setLoading(true)

      await axios.post(
        'https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',
        {
          resetCode: code
        }
      )

      alert('Code verified successfully!')
      navigate('/reset-password')

    } catch (err) {
      setError(
        err.response?.data?.message ||
        'Invalid verification code'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-7">

          <h2 className="mb-4">Verify Code</h2>

          <p>Enter the verification code sent to your email.</p>

          {error && (
            <div className="alert alert-danger">{error}</div>
          )}

          <form onSubmit={handleSubmit}>

            <label className="mb-2">Verification Code:</label>

            <input
              type="text"
              className="form-control mb-3"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              maxLength="6"
              required
            />

            <button
              type="submit"
              className="btn btn-success"
              disabled={loading}
            >
              {loading ? 'Verifying...' : 'Verify Code'}
            </button>

          </form>

        </div>
      </div>
    </div>
  )
}

export default VerifyCode