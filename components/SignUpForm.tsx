// components/SignUpForm.tsx
'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Char from '@/public/Images/Char.svg'
import Eye from '@/public/Images/eye.svg'

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
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('Sending registration request:', formData);
      
      const requestBody = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName
      };

      console.log('Request body:', requestBody);
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      console.log('Response status:', response.status);
      
      const responseText = await response.text();
      console.log('Response text:', responseText);

      if (!response.ok) {
        // Try to parse error message from response
        let errorMessage = `Registration failed with status ${response.status}`;
        try {
          const errorData = JSON.parse(responseText);
          errorMessage = errorData.message || errorMessage;
        } catch {
          // If response is not JSON, use the text
          errorMessage = responseText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      // Redirect to home page on successful registration
      router.push('/');

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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="signup-container">
      {/* Left side with background image */}
      <div className="signup-left">
        <div className="logo-container">
          <Link href="/" className="logo">3legant.</Link>
        </div>
        <div className="background-image">
          <Image
            src={Char}
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

            <div className="form-input password-input-container">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                className="password-input"
              />
              <span 
                className="eye-icon"
                onClick={togglePasswordVisibility}
              >
                <Image 
                  src={Eye}
                  alt={showPassword ? "Hide password" : "Show password"}
                  width={20}
                  height={20}
                />
              </span>
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