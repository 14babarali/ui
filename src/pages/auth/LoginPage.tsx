// src/pages/auth/loginPage.tsx
import React from 'react';
import { Images } from '../../assets';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Define validation schema
const loginSchema = z.object({
  email: z.string()
    .min(1, "Email is required")
    .email("Invalid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  rememberMe: z.boolean().optional()
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      rememberMe: false
    }
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        credentials: 'include' // To allow cookies (JWT in cookies)
      });
  
      const result = await response.json();
  
      if (response.ok) {
        console.log('Login successful:', result);
        // Redirect to dashboard or home page
        window.location.href = '/dashboard'; // example
      } else {
        console.error('Login failed:', result.message);
        alert(result.message);
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Something went wrong, please try again.');
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Section - Illustration (unchanged) */}
      <div className="relative w-full md:w-1/2 bg-gray-900 flex items-center justify-center">
        <img
          src={Images.loginimg}
          alt="Medical AI Illustration"
          className="object-cover w-full h-full"
        />
        <div className="absolute top-4 left-4 flex items-center space-x-4">
          <img
            src={Images.logo}
            alt="MED-AI Logo"
            className="h-10"
          />
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome Back</h2>
          <p className="text-gray-600 mb-6">Discover a better way of spending with Med Ai.</p>
          
          <button
  className="w-full bg-white border border-gray-300 text-gray-900 py-2 px-4 rounded-md mb-4 flex items-center justify-center hover:bg-gray-100"
  onClick={() => window.location.href = 'http://localhost:5000/api/auth/google'}
>
  <img
    src="https://www.google.com/favicon.ico"
    alt="Google Logo"
    className="h-5 mr-2"
  />
  Log in with Google
</button>

          
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or</span>
            </div>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Enter your Email"
                className={`w-full p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                {...register("email")}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>
            
            <div>
              <input
                type="password"
                placeholder="Password"
                className={`w-full p-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                {...register("password")}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  {...register("rememberMe")}
                />
                Remember Me
              </label>
              <a href="#" className="text-blue-500 hover:underline">Forget Password?</a>
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              Log in
            </button>
          </form>
          
          <p className="text-center text-sm text-gray-600 mt-4">
            Not a member yet?
            <Link to="/signup" className="text-blue-500 hover:underline">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;