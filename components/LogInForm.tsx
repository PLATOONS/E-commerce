// components/LogInForm.tsx
'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const LogInForm: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('Sending login request:', formData);
      
      const response = await fetch('http://localhost:8000/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password
        })
      });

      console.log('Response status:', response.status);
      
      const responseText = await response.text();
      console.log('Response text:', responseText);
      
      let data = responseText;

      if (!response.ok) {
        throw new Error('Error: incorrect username, email or password');
      }

      // Save token to sessionStorage
      if (data) {
        sessionStorage.setItem('token', data);
        console.log('Token saved successfully');
        router.push('/');
      } else {
        throw new Error('No token received in response');
      }

    } catch (err: any) {
      console.error('login error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      {/* Left side with background image */}
      <div className="login-left">
        <div className="logo">
          <Link href="/">3legant.</Link>
        </div>
        <div className="background-image">
          <Image 
            src="/Images/test.svg" 
            alt="Decoration" 
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>

      {/* Right side with form */}
      <div className="login-form-section">
        <div className="login-form">
          <div className="form-header">
            <h1>Sign In</h1>
            <p className="signup-link">
              Don't have an account yet? <Link href="/signup">Sign Up</Link>
            </p>
          </div>

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="form-content">
            <div className="form-input">
              <input
                type="text"
                name="username"
                placeholder="Your username or email address"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-input password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="password-input"
              />
              <span 
                className={`eye-icon ${showPassword ? 'eye-icon-slash' : ''}`}
                onClick={togglePasswordVisibility}
              >
                 <Image 
            src={showPassword ? "/Images/eye.svg" : "/Images/eye.svg"} 
               alt={showPassword ? "Hide password" : "Show password"}
               width={20}
               height={20}
               />
              </span>
            </div>

            <div className="form-options">
              <div className="remember-me">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <label htmlFor="rememberMe">Remember me</label>
              </div>
              <Link href="/forgot-password" className="forgot-password">
                Forgot password?
              </Link>
            </div>

            <button 
              type="submit" 
              className="login-button"
              disabled={loading}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogInForm;