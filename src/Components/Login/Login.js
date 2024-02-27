import React, { useState, useEffect } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';

const Login = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem('auth-token')) {
      navigate('/');
    }
  }, [navigate]);

  const login = async (e) => {
    e.preventDefault();

    // Basic client-side validation
    if (!email || !password) {
      alert('Please enter both email and password');
      return;
    }

    //Check with API endpoint for authentication
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const json = await res.json();

      if (res.ok) {
        sessionStorage.setItem('auth-token', json.authtoken);
        sessionStorage.setItem('email', email);

        navigate('/'); // Redirect to the home directory
        window.location.reload();
      } else {
        alert(json.error || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred during login. Please try again.');
    }
  };

  return (
    <div className="container" style={{ marginTop: '5%' }}>
      <div className="signup-grid">
        <div className="signup-text">
          <h1>Login</h1>
        </div>
        <div className="signup-text1">
          Are you a new member?{' '}
          <span>
            <Link to="/signup" style={{ color: '#2190FF' }}>
              Sign Up Here
            </Link>
          </span>
        </div>
        <br />
        <br />
        <div className="signup-form">
          <form onSubmit={login}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                required
                className="form-control"
                placeholder="Enter your email"
                aria-describedby="helpId"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                required
                className="form-control"
                placeholder="Enter your password"
                aria-describedby="helpId"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="btn-group">
              <button type="submit" className="btn btn-primary mb-2 mr-1 waves-effect waves-light">
                Login
              </button>
            </div>
          </form>
        </div>
        <div className="signup-text1" style={{ textAlign: 'left' }}>
          Forgot password?
        </div>
      </div>
    </div>
  );
};

export default Login;
