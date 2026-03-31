import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Play, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-orange-600/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-red-600/20 blur-[120px] rounded-full"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-6"
            >
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
              <span className="text-orange-500 text-xs font-bold uppercase tracking-widest">Admissions Open 2026</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">
              Unlock Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Potential</span> With Gupta Classes
            </h1>
            
            <p className="text-gray-400 text-lg md:text-xl mb-8 max-w-lg leading-relaxed">
              Meerut's most trusted coaching institute for Banking, SSC, CAT, and competitive exams. Join the league of successful candidates.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <Link 
                to="/courses" 
                className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-xl font-bold flex items-center space-x-2 transition-all shadow-xl shadow-orange-600/20 group"
              >
                <span>Explore Courses</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="bg-white/5 hover:bg-white/10 text-white border border-white/10 px-8 py-4 rounded-xl font-bold flex items-center space-x-2 transition-all backdrop-blur-sm">
                <Play size={20} className="text-orange-500" />
                <span>Watch Demo</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {[
                { label: 'Success Rate', value: '92%' },
                { label: 'Expert Faculty', value: '25+' },
                { label: 'Selections', value: '5000+' },
              ].map((stat, i) => (
                <motion.div 
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + (i * 0.1) }}
                >
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-gray-500 text-xs uppercase tracking-widest font-semibold">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-orange-600/10">
              <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop" 
                alt="Students Studying" 
                className="w-full h-auto object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl">
                <div className="flex items-center space-x-4">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map((i) => (
                      <img 
                        key={i}
                        src={`https://picsum.photos/seed/student${i}/100/100`} 
                        alt="Student" 
                        className="w-10 h-10 rounded-full border-2 border-black"
                        referrerPolicy="no-referrer"
                      />
                    ))}
                  </div>
                  <div>
                    <div className="text-white text-sm font-bold">Join 10k+ Students</div>
                    <div className="flex items-center text-orange-500 text-xs">
                      <CheckCircle size={12} className="mr-1" />
                      <span>Verified Success Stories</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-orange-600 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-red-600 rounded-full blur-3xl opacity-30"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
