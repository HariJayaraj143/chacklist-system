import React, {useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async e => {
    e.preventDefault()

    setLoading(true)
    setError('')

    try {
      const response = await axios.post('/api/auth/login', {email, password})

      // Save the token to localStorage or cookies
      localStorage.setItem('token', response.data.token)

      // Redirect to dashboard or home page
      navigate('/dashboard')
    } catch (err) {
      setError(
        err.response?.data?.message || 'An error occurred. Please try again.',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='login-container'>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>

        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>

        {error && <p className='error-message'>{error}</p>}

        <button type='submit' disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>

      <p>
        Don't have an account? <a href='/register'>Register here</a>.
      </p>
    </div>
  )
}

export default Login
