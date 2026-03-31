import React from 'react';
import { motion } from 'motion/react';
import { Clock, IndianRupee, ArrowRight, Tag } from 'lucide-react';
import { Course } from '../types';

interface CourseCardProps {
  course: Course;
  onEnroll?: (id: string) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onEnroll }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden group hover:bg-white/10 transition-all flex flex-col h-full"
    >
      <div className="relative h-56 overflow-hidden">
        <img 
          src={course.imageUrl || `https://picsum.photos/seed/${course.title}/800/600`} 
          alt={course.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4 bg-orange-600 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
          {course.category}
        </div>
      </div>

      <div className="p-8 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-orange-500 transition-colors">
          {course.title}
        </h3>
        <p className="text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed">
          {course.description}
        </p>

        <div className="mt-auto space-y-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-gray-400">
              <Clock size={16} className="mr-2 text-orange-500" />
              <span>{course.duration || '6 Months'}</span>
            </div>
            <div className="flex items-center text-white font-bold text-lg">
              <IndianRupee size={18} className="text-orange-500" />
              <span>{course.price.toLocaleString()}</span>
            </div>
          </div>

          <button 
            onClick={() => onEnroll && course.id && onEnroll(course.id)}
            className="w-full bg-white/5 hover:bg-orange-600 text-white border border-white/10 hover:border-orange-600 py-4 rounded-2xl font-bold transition-all flex items-center justify-center space-x-2 group/btn"
          >
            <span>Enroll Now</span>
            <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;
