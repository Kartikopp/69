import React from 'react';
import { motion } from 'motion/react';
import { auth, googleProvider, signInWithPopup } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { LogIn, Github, Mail } from 'lucide-react';
import { toast } from 'sonner';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success('Logged in successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Failed to login. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-600/10 blur-[150px] rounded-full pointer-events-none"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/5 border border-white/10 p-10 rounded-[3rem] backdrop-blur-xl relative z-10"
      >
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-6">
            <span className="text-white font-bold text-3xl">G</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-500">Sign in to access your dashboard and courses.</p>
        </div>

        <div className="space-y-4">
          <button 
            onClick={handleGoogleLogin}
            className="w-full bg-white text-black py-4 rounded-2xl font-bold flex items-center justify-center space-x-3 hover:bg-gray-100 transition-all shadow-xl"
          >
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
            <span>Continue with Google</span>
          </button>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-zinc-900 px-4 text-gray-500 font-bold tracking-widest">Or continue with</span>
            </div>
          </div>

          <button 
            disabled
            className="w-full bg-white/5 border border-white/10 text-gray-400 py-4 rounded-2xl font-bold flex items-center justify-center space-x-3 cursor-not-allowed opacity-50"
          >
            <Mail size={20} />
            <span>Email & Password</span>
          </button>
        </div>

        <p className="mt-10 text-center text-gray-500 text-xs leading-relaxed">
          By continuing, you agree to Gupta Classes' <br />
          <a href="#" className="text-orange-500 hover:underline">Terms of Service</a> and <a href="#" className="text-orange-500 hover:underline">Privacy Policy</a>.
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
