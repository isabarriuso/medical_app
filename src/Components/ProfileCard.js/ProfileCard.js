import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { API_URL } from '../../config';
import './ProfileCard.css'
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const ProfileDetails = ({ email, name, phone, password }) => {
  return (
    <div className="profile-card">
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Phone:</strong> {phone}</p>
      <p><strong>Password:</strong> {password}</p>
    </div>
  );
};

ProfileDetails.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

const ProfileCard = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
      // Fetch user details from the API
      fetch(`${API_URL}/api/auth/user`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'email': sessionStorage.getItem('email'), // You may need to adjust the header based on your API
        },
      })
        .then(response => response.json())
        .then(data => {
          setUser(data); // Assuming the API response is an object with user details
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }, []); // Empty dependency array ensures that the effect runs once when the component mounts
  
  
    return (
      <div className="profile-container">
        <h1>User Profile</h1>
        <ProfileDetails {...user} />
        <div>
            <Link to="/edit-profile">
            <button className="edit-profile-button">Edit Profile</button>
            </Link>
        </div>
      </div>

    );
  };
  
export default ProfileCard;
