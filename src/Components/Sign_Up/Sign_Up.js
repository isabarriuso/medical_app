import React, { useState } from 'react';
import './Sign_Up.css'
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../config';


const Sign_Up = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showerr, setShowerr] = useState('');
    const [role, setRole] = useState('');
 
    const navigate = useNavigate();
 
    const validateEmail = (email) => {
       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
       return emailRegex.test(email);
    };
 
    const validatePhone = (phone) => {
       const isValid = /^\d{10}$/.test(phone);
       return isValid;
    };
 
    const handleReset = () => {
       setName('');
       setEmail('');
       setPhone('');
       setPassword('');
       setRole('');
       setShowerr('');
    };
 
    const register = async (e) => {
       e.preventDefault();
 
       // Validation checks
       if (!validatePhone(phone)) {
          setShowerr('Phone must have 10 digits');
          return;
       }
 
       if (!validateEmail(email)) {
          setShowerr('Please enter a valid email address');
          return;
       }
 
       // API Call
       try {
          const response = await fetch(`${API_URL}/api/auth/register`, {
             method: 'POST',
             headers: {
                'Content-Type': 'application/json',
             },
             body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                phone: phone,
                role: role,
             }),
          });
 
          const json = await response.json();
 
          if (json.authtoken) {
             sessionStorage.setItem('auth-token', json.authtoken);
             sessionStorage.setItem('name', name);
             sessionStorage.setItem('phone', phone);
             sessionStorage.setItem('email', email);
             navigate('/');
             window.location.reload();
          } else {
             if (json.errors) {
                for (const error of json.errors) {
                   setShowerr(error.msg);
                }
             } else {
                setShowerr(json.error || 'Registration failed. Please check your details and try again.');
             }
          }
       } catch (error) {
          console.error('Error during registration:', error);
          setShowerr('An error occurred during registration. Please try again.');
       }
    };
 
    return (
       <div className="container" style={{ marginTop: '5%' }}>
          <div className="signup-grid">
             <div className="signup-text">
                <h1>Sign Up</h1>
             </div>
             <div className="signup-text1">
                Already a member? <span><Link to="/signup" style={{ color: '#2190FF' }}>Login</Link></span>
             </div>
             <br />
             <br />
             <div className="signup-form">
                <form method="POST" onSubmit={register}>
                   <div className="form-group">
                      <label htmlFor="role">Select Role</label>
                      <select value={role} onChange={(e) => setRole(e.target.value)} name="role" id="role" className="form-control">
                         <option value="patient">Patient</option>
                         <option value="doctor">Doctor</option>
                      </select>
                   </div>
                   <div className="form-group">
                      <label htmlFor="name">Name</label>
                      <input value={name} onChange={(e) => setName(e.target.value)} type="text" name="name" id="name" required className="form-control" placeholder="Enter your name" aria-describedby="helpId" />
                   </div>
                   <div className="form-group">
                      <label htmlFor="phone">Phone</label>
                      <input value={phone} onChange={(e) => setPhone(e.target.value)} type="tel" name="phone" id="phone" required className="form-control" placeholder="Enter your phone number" aria-describedby="helpId" />
                   </div>
                   <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="form-control" placeholder="Enter your email" aria-describedby="helpId" />
                   </div>
                   <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" name="password" id="password" required className="form-control" placeholder="Enter your password" aria-describedby="helpId" />
                      {showerr && <div className="err" style={{ color: 'red' }}>{JSON.stringify(showerr)}</div>}
                   </div>
                   <div className="btn-group">
                      <button type="submit" className="btn btn-primary mb-2 mr-1 waves-effect waves-light">Submit</button>
                      <button type="button" onClick={handleReset} className="btn btn-danger mb-2 waves-effect waves-light">Reset</button>
                   </div>
                </form>
             </div>
          </div>
       </div>
    );
 }
 
 export default Sign_Up;
 
