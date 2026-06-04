import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { Mail, Lock, User, Key, Eye, EyeOff, Target } from 'lucide-react';

export default function Auth() {
  const { login, signup } = useApp();
  const [authState, setAuthState] = useState('login'); // 'login', 'signup', 'forgot'
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let currentErrors = {};
    if (!email) currentErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) currentErrors.email = 'Invalid email address';
    
    if (authState !== 'forgot') {
      if (!password) currentErrors.password = 'Password is required';
      else if (password.length < 6) currentErrors.password = 'Password must be at least 6 characters';
    }

    if (authState === 'signup' && !name) {
      currentErrors.name = 'Full name is required';
    }

    setErrors(currentErrors);
    return Object.keys(currentErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (authState === 'login') {
      login(email, password);
    } else if (authState === 'signup') {
      signup(name, email, password);
    } else {
      // Forgot Password confirmation
      alert(`Password reset link dispatched to ${email}`);
      setAuthState('login');
    }
  };

  const handleGoogleLogin = () => {
    // Mock successful Google Login
    login('google.athlete@intelligence.ai', 'googleAuthToken123');
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-darkBg text-white px-4">
      {/* Background Grids */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-accentCyan/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-accentBlue/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-md z-10">
        {/* App Logo/Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center space-x-2">
            <Target className="w-8 h-8 text-accentBlue" />
            <span className="text-2xl font-bold tracking-wider">ATHLETE INTELLIGENCE</span>
          </div>
          <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest font-semibold">
            Train Smarter. Predict Faster.
          </p>
        </div>

        {/* Card Panel */}
        <motion.div
          layout
          className="glass-panel rounded-3xl p-8 border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative overflow-hidden"
        >
          {/* Top Decorative bar */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-accentBlue via-accentCyan to-accentNeon" />

          <AnimatePresence mode="wait">
            {authState === 'login' && (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-semibold mb-2">Welcome Back</h2>
                <p className="text-sm text-gray-400 mb-6">Access your performance logs and AI coach.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        placeholder="athlete@intelligence.ai"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 rounded-xl glass-input text-sm text-white"
                      />
                    </div>
                    {errors.email && <span className="text-xs text-red-400 mt-1 block font-medium">{errors.email}</span>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-11 pr-10 py-3 rounded-xl glass-input text-sm text-white"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3.5 text-gray-400 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {errors.password && <span className="text-xs text-red-400 mt-1 block font-medium">{errors.password}</span>}
                  </div>

                  <div className="flex items-center justify-between text-xs pt-1">
                    <label className="flex items-center space-x-2 cursor-pointer text-gray-300">
                      <input type="checkbox" className="rounded bg-white/5 border-white/10 text-accentBlue focus:ring-0 focus:ring-offset-0" />
                      <span>Remember Device</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setAuthState('forgot')}
                      className="text-accentBlue hover:underline font-medium"
                    >
                      Forgot Credentials?
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-accentBlue to-accentCyan text-black font-bold text-sm tracking-wider uppercase hover:opacity-90 transition duration-300 shadow-[0_0_20px_rgba(0,242,254,0.2)] mt-2"
                  >
                    Authenticate
                  </button>
                </form>
              </motion.div>
            )}

            {authState === 'signup' && (
              <motion.div
                key="signup"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-semibold mb-2">Create Profile</h2>
                <p className="text-sm text-gray-400 mb-6">Initialize your sports telemetry record.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 rounded-xl glass-input text-sm text-white"
                      />
                    </div>
                    {errors.name && <span className="text-xs text-red-400 mt-1 block font-medium">{errors.name}</span>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        placeholder="athlete@intelligence.ai"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 rounded-xl glass-input text-sm text-white"
                      />
                    </div>
                    {errors.email && <span className="text-xs text-red-400 mt-1 block font-medium">{errors.email}</span>}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Create Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-11 pr-10 py-3 rounded-xl glass-input text-sm text-white"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3.5 text-gray-400 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {errors.password && <span className="text-xs text-red-400 mt-1 block font-medium">{errors.password}</span>}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-accentBlue to-accentCyan text-black font-bold text-sm tracking-wider uppercase hover:opacity-90 transition duration-300 shadow-[0_0_20px_rgba(0,242,254,0.2)] mt-2"
                  >
                    Deploy Profile
                  </button>
                </form>
              </motion.div>
            )}

            {authState === 'forgot' && (
              <motion.div
                key="forgot"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-semibold mb-2">Reset Password</h2>
                <p className="text-sm text-gray-400 mb-6">Enter your registered email below to recover access.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Registered Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        placeholder="athlete@intelligence.ai"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 rounded-xl glass-input text-sm text-white"
                      />
                    </div>
                    {errors.email && <span className="text-xs text-red-400 mt-1 block font-medium">{errors.email}</span>}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-accentBlue to-accentCyan text-black font-bold text-sm tracking-wider uppercase hover:opacity-90 transition duration-300 mt-2"
                  >
                    Transmit Reset Link
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Social OAuth Divider */}
          {authState !== 'forgot' && (
            <div className="mt-6">
              <div className="relative flex items-center justify-center my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/5"></div>
                </div>
                <span className="relative px-3 bg-darkBg text-xs text-gray-500 uppercase tracking-widest font-semibold">
                  Or Secure Link
                </span>
              </div>

              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full py-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center space-x-2 text-sm text-gray-200 hover:bg-white/10 transition duration-300"
              >
                <svg className="w-4 h-4 text-white mr-1" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                </svg>
                <span>Continue with Google</span>
              </button>
            </div>
          )}

          {/* Toggle Login/Signup links */}
          <div className="text-center mt-6 text-xs text-gray-400">
            {authState === 'login' ? (
              <span>
                New athlete?{' '}
                <button onClick={() => setAuthState('signup')} className="text-accentBlue hover:underline font-semibold ml-1">
                  Create profile
                </button>
              </span>
            ) : (
              <span>
                Already registered?{' '}
                <button onClick={() => setAuthState('login')} className="text-accentBlue hover:underline font-semibold ml-1">
                  Sign in
                </button>
              </span>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
