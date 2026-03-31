import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { collection, getDocs, db, handleFirestoreError, OperationType } from '../firebase';
import { Result } from '../types';
import { Trophy, Star, Award } from 'lucide-react';

const Results: React.FC = () => {
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'results'));
        const resultsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Result));
        setResults(resultsData);
      } catch (error) {
        handleFirestoreError(error, OperationType.LIST, 'results');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  return (
    <div className="pt-32 pb-24 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center justify-center w-20 h-20 bg-orange-600/10 rounded-full mb-6"
          >
            <Trophy className="text-orange-500" size={40} />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-extrabold mb-6"
          >
            Wall of <span className="text-orange-500">Fame</span>
          </motion.h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Celebrating the hard work and dedication of our students who achieved their dreams.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-3xl h-80 animate-pulse"></div>
            ))}
          </div>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {results.map((result, i) => (
              <motion.div
                key={result.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden group hover:bg-white/10 transition-all"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={result.imageUrl || `https://picsum.photos/seed/${result.studentName}/400/500`} 
                    alt={result.studentName} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center space-x-1 text-orange-500 mb-1">
                      <Star size={12} fill="currentColor" />
                      <Star size={12} fill="currentColor" />
                      <Star size={12} fill="currentColor" />
                      <Star size={12} fill="currentColor" />
                      <Star size={12} fill="currentColor" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{result.studentName}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-2 text-orange-500 mb-2">
                    <Award size={16} />
                    <span className="text-sm font-bold uppercase tracking-widest">{result.exam}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Year: {result.year}</span>
                    {result.rank && (
                      <span className="bg-white/10 text-white text-[10px] font-bold px-2 py-1 rounded-md">
                        Rank: {result.rank}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <p className="text-gray-500 text-xl">Our success stories are being updated. Check back soon!</p>
          </div>
        )}

        {/* Stats Section */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { label: 'Total Selections', value: '5,000+', icon: <Users className="text-orange-500" size={32} /> },
            { label: 'Top 100 Ranks', value: '120+', icon: <Trophy className="text-orange-500" size={32} /> },
            { label: 'Years of Excellence', value: '15+', icon: <Star className="text-orange-500" size={32} /> },
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
              <div className="text-5xl font-black text-white mb-2">{stat.value}</div>
              <div className="text-gray-500 uppercase tracking-widest font-bold text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Results;
import { Users } from 'lucide-react';
