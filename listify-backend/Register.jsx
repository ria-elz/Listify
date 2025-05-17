import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../api/auth';
import { toast } from 'react-toastify';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await registerUser(formData);
      localStorage.setItem('token', data.token);
      toast.success('Registered successfully!');
      navigate('/');
    } catch (err) {
      const msg = err.response?.data?.msg || 'Registration failed';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
       {/* Header */}
      <header className="flex justify-between items-center px-7 py-4"> 
        <div className="flex items-center gap-0">
          <img src="/icons/logo.png" alt="Listify logo" className="w-10 h-10" />
          <span 
            className="text-2xl font-extrabold uppercase flex items-center" 
            style={{ 
              color: '#000000', 
              fontFamily: 'sans-serif', 
              letterSpacing: '-0.5px' 
            }}
          >
            Listify
          </span>
        </div>
        <div className="flex items-center gap-8">
          <Link
            to="/about"
            className="text-black hover:text-gray-600 transition flex items-center"
            style={{ fontFamily: 'sans-serif', fontSize: '15px' }}
          >
            About us
          </Link>
          <Link
            to="/contact"
            className="text-black hover:text-gray-600 transition flex items-center"
            style={{ fontFamily: 'sans-serif', fontSize: '15px' }}
          >
            Contacts
          </Link>
        </div>
      </header>
      <div className="w-full border-t border-gray-200 mb-8 -mt-4"></div>

      {/* Main Register Section */}
      <div className="flex-1 flex items-center justify-center relative">
        {/* Background Design */}
        <div className="absolute inset-0 -z-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 320"
            className="w-full h-full"
            preserveAspectRatio="none"
          >
            <path
              fill="#f3f4f6"
              d="M0,256L48,240C96,224,192,192,288,160C384,128,480,96,576,74.7C672,53,768,43,864,69.3C960,96,1056,160,1152,192C1248,224,1344,224,1392,224L1440,224L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            ></path>
          </svg>
        </div>

        {/* Register Box */}
        <div
          className="w-full max-w-xl bg-white shadow-lg rounded-3xl p-10"
          style={{
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
            borderRadius: '20px',
          }}
        >
          <h2
            className="text-center text-xl font-bold mb-4 max-w-md mx-auto"
            style={{ color: '#007aff', fontFamily: 'sans-serif' }}
          >
            Register
          </h2>
          <p
            className="text-center text-gray-600 mb-6 max-w-md mx-auto"
            style={{ fontFamily: 'sans-serif', fontSize: '14px' }}
          >
            Create your account to continue
          </p>

          {/* Social Login */}
          <div className="flex justify-center gap-4 mb-6 max-w-md mx-auto">
            {/* Facebook Logo */}
            <svg
              width="32"
              height="32"
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="cursor-pointer hover:opacity-80"
            >
              <path
                fill="#1877F2"
                d="M15 8a7 7 0 00-7-7 7 7 0 00-1.094 13.915v-4.892H5.13V8h1.777V6.458c0-1.754 1.045-2.724 2.644-2.724.766 0 1.567.137 1.567.137v1.723h-.883c-.87 0-1.14.54-1.14 1.093V8h1.941l-.31 2.023H9.094v4.892A7.001 7.001 0 0015 8z"
              />
              <path
                fill="#ffffff"
                d="M10.725 10.023L11.035 8H9.094V6.687c0-.553.27-1.093 1.14-1.093h.883V3.87s-.801-.137-1.567-.137c-1.6 0-2.644.97-2.644 2.724V8H5.13v2.023h1.777v4.892a7.037 7.037 0 002.188 0v-4.892h1.63z"
              />
            </svg>

            {/* Google Logo */}
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="cursor-pointer hover:opacity-80"
            >
              <path d="M30.0014 16.3109C30.0014 15.1598 29.9061 14.3198 29.6998 13.4487H16.2871V18.6442H24.1601C24.0014 19.9354 23.1442 21.8798 21.2394 23.1864L21.2127 23.3604L25.4536 26.58L25.7474 26.6087C28.4458 24.1665 30.0014 20.5731 30.0014 16.3109Z" fill="#4285F4" />
              <path d="M16.2863 29.9998C20.1434 29.9998 23.3814 28.7553 25.7466 26.6086L21.2386 23.1863C20.0323 24.0108 18.4132 24.5863 16.2863 24.5863C12.5086 24.5863 9.30225 22.1441 8.15929 18.7686L7.99176 18.7825L3.58208 22.127L3.52441 22.2841C5.87359 26.8574 10.699 29.9998 16.2863 29.9998Z" fill="#34A853" />
              <path d="M8.15964 18.769C7.85806 17.8979 7.68352 16.9645 7.68352 16.0001C7.68352 15.0356 7.85806 14.1023 8.14377 13.2312L8.13578 13.0456L3.67083 9.64746L3.52475 9.71556C2.55654 11.6134 2.00098 13.7445 2.00098 16.0001C2.00098 18.2556 2.55654 20.3867 3.52475 22.2845L8.15964 18.769Z" fill="#FBBC05" />
              <path d="M16.2864 7.4133C18.9689 7.4133 20.7784 8.54885 21.8102 9.4978L25.8419 5.64C23.3658 3.38445 20.1435 2 16.2864 2C10.699 2 5.8736 5.1422 3.52441 9.71549L8.14345 13.2311C9.30229 9.85555 12.5086 7.4133 16.2864 7.4133Z" fill="#EB4335" />
            </svg>

            {/* Apple Logo */}
            <svg
              fill="#000000"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 512 512"
              className="cursor-pointer hover:opacity-80"
            >
              <path
                d="M248.644,123.476c-5.45-29.71,8.598-60.285,25.516-80.89
                c18.645-22.735,50.642-40.17,77.986-42.086c4.619,31.149-8.093,61.498-24.826,82.965
                C309.37,106.527,278.508,124.411,248.644,123.476z M409.034,231.131c8.461-23.606,25.223-44.845,51.227-59.175
                c-26.278-32.792-63.173-51.83-97.99-51.83c-46.065,0-65.542,21.947-97.538,21.947c-32.96,0-57.965-21.947-97.866-21.947
                c-39.127,0-80.776,23.848-107.19,64.577c-9.712,15.055-16.291,33.758-19.879,54.59c-9.956,58.439,4.916,134.557,49.279,202.144
                c21.57,32.796,50.321,69.737,87.881,70.059c33.459,0.327,42.951-21.392,88.246-21.616c45.362-0.258,53.959,21.841,87.372,21.522
                c37.571-0.317,67.906-41.199,89.476-73.991c15.359-23.532,21.167-35.418,33.11-62.023
                C414.435,352.487,389.459,285.571,409.034,231.131z"
              />
            </svg>
          </div>
          <div className="h-8"></div>
          {/* Register Form */}
          <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
            {/* Name Input */}
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-4/5 px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none mx-auto block"
              style={{
                fontFamily: 'sans-serif',
                fontSize: '14px',
                backgroundColor: '#ffffff',
                border: 'none',
                borderBottom: '1px solid #e0e0e0',
                borderRadius: 0,
                boxShadow: 'none',
              }}
              required
            />

            {/* Email Input */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-4/5 px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none mx-auto block"
              style={{
                fontFamily: 'sans-serif',
                fontSize: '14px',
                backgroundColor: '#ffffff',
                border: 'none',
                borderBottom: '1px solid #e0e0e0',
                borderRadius: 0,
                boxShadow: 'none',
              }}
              required
            />

            {/* Password Input */}
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-4/5 px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none mx-auto block"
              style={{
                fontFamily: 'sans-serif',
                fontSize: '14px',
                backgroundColor: '#ffffff',
                border: 'none',
                borderBottom: '1px solid #e0e0e0',
                borderRadius: 0,
                boxShadow: 'none',
              }}
              required
            />

            <div className="h-8"></div>
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="py-3 rounded-lg"
                style={{
                  width: '125px',
                  height: '45px',
                  backgroundColor: '#ffffff',
                  color: '#000000',
                  fontFamily: 'sans-serif',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #e0e0e0',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  boxSizing: 'border-box',
                  margin: '0',
                  padding: '20px 2',
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'scale(1.02)';
                  e.target.style.boxShadow = '0px 6px 20px rgba(0, 0, 0, 0.15)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'scale(1)';
                  e.target.style.boxShadow = '0px 4px 20px rgba(0, 0, 0, 0.1)';
                }}
              >
                {loading ? 'Signing up...' : 'Register'}
              </button>
            </div>
          </form>

          {/* Login Link */}
          <p className="text-center text-sm mt-6 text-gray-600 max-w-md mx-auto">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 font-medium hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;