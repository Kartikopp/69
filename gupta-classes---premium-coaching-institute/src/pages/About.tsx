import React from 'react';
import { motion } from 'motion/react';
import { Target, Shield, Users, Award, BookOpen, Clock } from 'lucide-react';

const About: React.FC = () => {
  const achievements = [
    { year: '2010', title: 'Foundation', desc: 'Gupta Classes started with a vision to provide quality education.' },
    { year: '2015', title: '1000+ Selections', desc: 'Reached a milestone of 1000+ successful student selections.' },
    { year: '2020', title: 'Digital Expansion', desc: 'Launched online test series and digital learning tools.' },
    { year: '2025', title: 'Best Institute Award', desc: 'Recognized as the best coaching institute in Meerut region.' },
  ];

  const faculty = [
    { name: 'Dr. R.K. Gupta', role: 'Founder & Math Expert', image: 'https://picsum.photos/seed/faculty1/400/400' },
    { name: 'Mrs. S. Sharma', role: 'English Specialist', image: 'https://picsum.photos/seed/faculty2/400/400' },
    { name: 'Mr. V. Singh', role: 'Reasoning Guru', image: 'https://picsum.photos/seed/faculty3/400/400' },
    { name: 'Mr. A. Kumar', role: 'GA & Banking Expert', image: 'https://picsum.photos/seed/faculty4/400/400' },
  ];

  return (
    <div className="pt-32 pb-24 bg-black min-h-screen overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Intro Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h1 className="text-5xl font-extrabold mb-8">
              Empowering <span className="text-orange-500">Dreams</span> Since 2010
            </h1>
            <p className="text-gray-400 text-lg mb-6 leading-relaxed">
              Gupta Classes is a premier coaching institute in Meerut dedicated to providing top-notch education for competitive exams. Our mission is to bridge the gap between hard work and success.
            </p>
            <p className="text-gray-400 text-lg mb-10 leading-relaxed">
              With a team of highly experienced faculty members and a student-centric approach, we have consistently produced top rankers in Banking, SSC, and CAT exams.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-600/10 rounded-lg flex items-center justify-center text-orange-500">
                  <Shield size={20} />
                </div>
                <span className="text-white font-bold">Trusted Legacy</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-600/10 rounded-lg flex items-center justify-center text-orange-500">
                  <Target size={20} />
                </div>
                <span className="text-white font-bold">Focused Approach</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl shadow-orange-600/10">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop" 
                alt="Our Institute" 
                className="w-full h-auto"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-orange-600 rounded-full blur-[100px] opacity-30"></div>
          </motion.div>
        </div>

        {/* Timeline Section */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our <span className="text-orange-500">Journey</span></h2>
            <p className="text-gray-400">A timeline of our growth and achievements over the years.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((item, i) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 p-8 rounded-3xl relative group hover:bg-white/10 transition-all"
              >
                <div className="text-4xl font-black text-orange-600/20 absolute top-4 right-4 group-hover:text-orange-600/40 transition-colors">
                  {item.year}
                </div>
                <h3 className="text-xl font-bold mb-3 text-orange-500">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Faculty Section */}
        <div>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Meet Our <span className="text-orange-500">Faculty</span></h2>
            <p className="text-gray-400">Learn from the experts who have shaped thousands of careers.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {faculty.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative"
              >
                <div className="aspect-square rounded-[2.5rem] overflow-hidden border border-white/10 mb-6 relative">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <h3 className="text-xl font-bold text-white text-center">{member.name}</h3>
                <p className="text-orange-500 text-sm text-center font-semibold">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
