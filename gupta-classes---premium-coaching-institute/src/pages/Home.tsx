import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'motion/react';
import Hero from '../components/Hero';
import { BookOpen, Users, Trophy, Target, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Counter: React.FC<{ value: number; suffix?: string }> = ({ value, suffix = "" }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(count, value, { duration: 2, ease: "easeOut" });
    return controls.stop;
  }, [value]);

  useEffect(() => {
    return rounded.on("change", (latest) => setDisplayValue(latest));
  }, [rounded]);

  return <span>{displayValue}{suffix}</span>;
};

const Home: React.FC = () => {
  const features = [
    {
      icon: <BookOpen className="text-orange-500" size={32} />,
      title: "Quality Content",
      desc: "Updated study material based on the latest exam patterns."
    },
    {
      icon: <Users className="text-orange-500" size={32} />,
      title: "Expert Faculty",
      desc: "Learn from the best educators with years of experience."
    },
    {
      icon: <Trophy className="text-orange-500" size={32} />,
      title: "Proven Results",
      desc: "Consistent track record of top rankers in Banking & SSC."
    },
    {
      icon: <Target className="text-orange-500" size={32} />,
      title: "Personalized Focus",
      desc: "Small batch sizes to ensure individual attention to every student."
    }
  ];

  const categories = [
    { name: 'Banking', count: '12 Courses', image: 'https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?q=80&w=2070&auto=format&fit=crop' },
    { name: 'SSC', count: '8 Courses', image: 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?q=80&w=2069&auto=format&fit=crop' },
    { name: 'CAT', count: '5 Courses', image: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=2070&auto=format&fit=crop' },
    { name: 'Foundation', count: '4 Courses', image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop' },
  ];

  return (
    <div className="bg-black">
      <Hero />

      {/* Features Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Why Choose <span className="text-orange-500">Gupta Classes</span>?
            </motion.h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We provide a comprehensive learning ecosystem designed to help you crack the toughest competitive exams with confidence.
            </p>
          </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { label: 'Success Rate', value: 92, suffix: '%', icon: <Trophy className="text-orange-500" size={32} /> },
                { label: 'Expert Faculty', value: 25, suffix: '+', icon: <Users className="text-orange-500" size={32} /> },
                { label: 'Total Selections', value: 5000, suffix: '+', icon: <Target className="text-orange-500" size={32} /> },
                { label: 'Years Experience', value: 15, suffix: '+', icon: <BookOpen className="text-orange-500" size={32} /> },
              ].map((stat, i) => (
                <motion.div 
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] text-center"
                >
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-orange-500/10 rounded-2xl flex items-center justify-center">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-5xl font-black text-white mb-2">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-gray-500 uppercase tracking-widest font-bold text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-4xl font-bold mb-4">Our Top <span className="text-orange-500">Categories</span></h2>
              <p className="text-gray-400">Explore our specialized programs for various competitive exams.</p>
            </div>
            <Link to="/courses" className="text-orange-500 font-bold flex items-center space-x-2 hover:underline">
              <span>View All Courses</span>
              <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative h-80 rounded-3xl overflow-hidden group cursor-pointer"
              >
                <img 
                  src={cat.image} 
                  alt={cat.name} 
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-2xl font-bold text-white mb-1">{cat.name}</h3>
                  <p className="text-orange-500 text-sm font-semibold">{cat.count}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-[3rem] p-12 md:p-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl -mr-32 -mt-32 rounded-full"></div>
            <div className="relative z-10 text-center max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-8 leading-tight">
                Ready to Start Your Journey to Success?
              </h2>
              <p className="text-white/80 text-lg mb-10">
                Join thousands of students who have already achieved their dreams with Gupta Classes. Get started today!
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/login" className="bg-white text-orange-600 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all shadow-xl">
                  Register Now
                </Link>
                <Link to="/contact" className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all">
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
