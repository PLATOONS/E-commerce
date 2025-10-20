// components/SignUpForm.tsx
'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const SignUpForm: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    acceptTerms: false
  });
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('Sending registration request:', formData);
      
      // field
      const requestBody = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName
      };

      console.log('Request body:', requestBody);
      
      const response = await fetch('http://localhost:8000/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      console.log('Response status:', response.status);
      
      const responseText = await response.text();
      console.log('Response text:', responseText);
      
      let data = responseText;

      if (!response.ok) {
        // Try to get error 
        const errorMessage = `Registration failed with status ${response.status}`;
        throw new Error(errorMessage);
      }

    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err.message || 'Error during registration');
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

  return (
    <div className="signup-container">
      {/* Left side with background image */}
      <div className="signup-left">
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
      <div className="signup-form-section">
        <div className="signup-form">
          <div className="form-header">
            <h1>Sign Up</h1>
            <p className="login-link">
              Already have an account? <Link href="/login">Sign in</Link>
            </p>
          </div>

          {error && (
            <div className="error-message">
              <strong>Registration Error:</strong> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="form-content">
            <div className="form-input">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-input">
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-input">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-input">
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-input">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
              />
              <small style={{color: '#6C7275', fontSize: '12px', marginTop: '4px'}}>
                Use a strong password with uppercase, lowercase, numbers, and special characters
              </small>
            </div>

            <div className="terms-checkbox">
              <input
                type="checkbox"
                id="acceptTerms"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
                required
              />
              <label htmlFor="acceptTerms">
                I agree with Privacy Policy and Terms of Use
              </label>
            </div>

            <button 
              type="submit" 
              className="signup-button"
              disabled={loading || !formData.acceptTerms}
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;