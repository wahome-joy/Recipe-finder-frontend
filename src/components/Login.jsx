import React, { useState } from 'react';
import axios from 'axios';

function Login ({setIsLoggedIn}){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    // Prepare the data to send
    const data = { email, password };

    try {
      const response = await axios.post('http://127.0.0.1:5376/api/user/login', data);
      setMessage(response.data.message);  // Success message from backend
      console.log(response.data.user.username);
      
      localStorage.setItem('token', response.data.access_token);  // Store the access token
      localStorage.setItem('username', response.data.user.username)
      setIsLoggedIn(true)
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.error);  // Error message from backend
      } else {
        setMessage('An error occurred. Please try again.');
      }
    }
  };

  // Styles object for the component
  const styles = {
    loginContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f4f4f9',
    },
    loginForm: {
      backgroundColor: '#fff',
      padding: '30px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '400px',
      textAlign: 'center',
    },
    h2: {
      fontSize: '24px',
      color: '#333',
      marginBottom: '20px',
    },
    inputGroup: {
      marginBottom: '15px',
      textAlign: 'left',
    },
    label: {
      fontSize: '14px',
      color: '#555',
      marginBottom: '5px',
      display: 'block',
    },
    input: {
      width: '100%',
      padding: '10px',
      fontSize: '14px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      backgroundColor: '#fafafa',
      transition: 'border-color 0.3s ease',
    },
    inputFocus: {
      borderColor: '#007bff',
      outline: 'none',
    },
    btn: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#007bff',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    btnHover: {
      backgroundColor: '#0056b3',
    },
    message: {
      color: '#e74c3c',
      fontSize: '14px',
      marginTop: '10px',
    },
  };

  return (
    <div style={styles.loginContainer}>
      <div style={styles.loginForm}>
        <h2 style={styles.h2}>Login</h2>
        {message && <p style={styles.message}>{message}</p>}
        <form onSubmit={handleLogin}>
          <div style={styles.inputGroup}>
            <label htmlFor="email" style={styles.label}>Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
              onFocus={(e) => e.target.style.borderColor = styles.inputFocus.borderColor}
              onBlur={(e) => e.target.style.borderColor = '#ccc'}
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
              onFocus={(e) => e.target.style.borderColor = styles.inputFocus.borderColor}
              onBlur={(e) => e.target.style.borderColor = '#ccc'}
            />
          </div>
          <button
            type="submit"
            style={styles.btn}
            onMouseEnter={(e) => e.target.style.backgroundColor = styles.btnHover.backgroundColor}
            onMouseLeave={(e) => e.target.style.backgroundColor = styles.btn.backgroundColor}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;