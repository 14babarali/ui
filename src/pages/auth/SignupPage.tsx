import React from 'react';
import { Images } from '../../assets';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-toastify';
import axios from 'axios';

// Validation Schema
const signupSchema = z.object({
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  email: z.string()
    .min(1, "Email is required")
    .email("Invalid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  terms: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions" }),
  }),
});

type SignupFormData = z.infer<typeof signupSchema>;

const SignupPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const onSubmit = async (data: SignupFormData) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post('http://localhost:8080/api/auth/register', {
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (response.status === 201 || response.status === 200) {
        toast.success("Signup successful! Redirecting to login...");
        setTimeout(() => navigate('/login'), 1500);
      } else {
        toast.error(response.data.message || "Signup failed. Please try again.");
      }
    } catch (error: any) {
      console.error("Signup failed:", error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Signup failed. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Section - Illustration */}
      <div className="relative w-full md:w-1/2 bg-gray-100 flex items-center justify-center">
        <img src={Images.singupimg} alt="MedAiProcedure Illustration" className="object-cover w-full h-full" />
        <div className="absolute top-4 left-4 flex items-center space-x-4">
          <img src={Images.logo} alt="MED-AI Logo" className="h-10" />
        </div>
      </div>

      {/* Right Section - Signup Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Create An Account</h2>
          <p className="text-gray-600 mb-6">Discover a better way of spending with Media.</p>

          <button className="w-full bg-white border border-gray-300 text-gray-900 py-2 px-4 rounded-md mb-4 flex items-center justify-center hover:bg-gray-100">
            <img src="https://www.google.com/favicon.ico" alt="Google Logo" className="h-5 mr-2" />
            Sign up with Google
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
                type="text"
                placeholder="Type your name"
                className={`w-full p-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                {...register("name")}
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
            </div>

            <div>
              <input
                type="email"
                placeholder="Enter your Email"
                className={`w-full p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                {...register("email")}
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                className={`w-full p-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                {...register("password")}
              />
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                className={`mr-2 ${errors.terms ? 'border-red-500' : ''}`}
                {...register("terms")}
              />
              <label htmlFor="terms" className="text-sm">
                I agree with Terms and Privacy
              </label>
            </div>
            {errors.terms && <p className="text-sm text-red-600">{errors.terms.message}</p>}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Signing up...' : 'Sign up'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-4">
            Have an account? <Link to="/login" className="text-blue-500 hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
