import React from 'react';
import PropTypes from 'prop-types';

const ProfileDetails = ({ email, name, phone, password }) => {
  return (
    <div className="profile-card">
      <h3>User Profile</h3>
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
    // Fetch user details from wherever you store them (session, context, API, etc.)
    const user = {
      email: 'user@example.com',
      name: 'John Doe',
      phone: '123-456-7890',
      password: '********',
    };
  
    return (
      <div className="profile-card-container">
        <h2>User Profile</h2>
        <ProfileDetails {...user} />
      </div>
    );
  };
  
export default ProfileCard;
