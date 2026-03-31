import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useAuth } from '../components/AuthContext';
import { db, collection, getDocs, query, where, handleFirestoreError, OperationType, onSnapshot, orderBy } from '../firebase';
import { Course, Notification } from '../types';
import CourseCard from '../components/CourseCard';
import { BookOpen, Bell, Clock, Award, Download, ExternalLink } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { student } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!student) return;

    // Fetch enrolled courses
    const fetchEnrolled = async () => {
      if (!student.enrolledCourses || student.enrolledCourses.length === 0) {
        setEnrolledCourses([]);
        return;
      }
      try {
        const q = query(collection(db, 'courses'), where('__name__', 'in', student.enrolledCourses));
        const querySnapshot = await getDocs(q);
        setEnrolledCourses(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Course)));
      } catch (error) {
        console.error('Error fetching enrolled courses:', error);
      }
    };

    // Listen for notifications
    const q = query(collection(db, 'notifications'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setNotifications(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Notification)));
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'notifications');
    });

    fetchEnrolled();
    return () => unsubscribe();
  }, [student]);

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center"><div className="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div className="pt-32 pb-24 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl font-bold mb-2">Welcome back, <span className="text-orange-500">{student?.name}</span></h1>
            <p className="text-gray-500">Track your progress and stay updated with your courses.</p>
          </motion.div>
          
          <div className="flex space-x-4">
            <div className="bg-white/5 border border-white/10 px-6 py-4 rounded-2xl flex items-center space-x-4">
              <div className="w-12 h-12 bg-orange-600/10 rounded-xl flex items-center justify-center text-orange-500">
                <BookOpen size={24} />
              </div>
              <div>
                <div className="text-white font-bold text-xl">{student?.enrolledCourses?.length || 0}</div>
                <div className="text-gray-500 text-xs uppercase font-bold tracking-widest">Enrolled</div>
              </div>
            </div>
            <div className="bg-white/5 border border-white/10 px-6 py-4 rounded-2xl flex items-center space-x-4">
              <div className="w-12 h-12 bg-orange-600/10 rounded-xl flex items-center justify-center text-orange-500">
                <Award size={24} />
              </div>
              <div>
                <div className="text-white font-bold text-xl">0</div>
                <div className="text-gray-500 text-xs uppercase font-bold tracking-widest">Tests Done</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Enrolled Courses */}
            <section>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold flex items-center space-x-3">
                  <BookOpen className="text-orange-500" />
                  <span>My Courses</span>
                </h2>
              </div>
              
              {enrolledCourses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {enrolledCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              ) : (
                <div className="bg-white/5 border border-dashed border-white/20 p-12 rounded-[2.5rem] text-center">
                  <p className="text-gray-500 mb-6">You haven't enrolled in any courses yet.</p>
                  <a href="/courses" className="inline-block bg-orange-600 text-white px-8 py-3 rounded-xl font-bold">
                    Browse Courses
                  </a>
                </div>
              )}
            </section>

            {/* Study Material */}
            <section>
              <h2 className="text-2xl font-bold mb-8 flex items-center space-x-3">
                <Download className="text-orange-500" />
                <span>Recent Study Material</span>
              </h2>
              <div className="space-y-4">
                {[
                  { title: 'IBPS PO 2026 Quant Notes', type: 'PDF', size: '2.4 MB' },
                  { title: 'SSC CGL English Vocabulary List', type: 'PDF', size: '1.8 MB' },
                  { title: 'Current Affairs - March 2026', type: 'PDF', size: '4.2 MB' },
                ].map((item, i) => (
                  <motion.div 
                    key={item.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center justify-between hover:bg-white/10 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-gray-400 group-hover:text-orange-500 transition-colors">
                        <Download size={20} />
                      </div>
                      <div>
                        <div className="text-white font-bold text-sm">{item.title}</div>
                        <div className="text-gray-500 text-xs">{item.type} • {item.size}</div>
                      </div>
                    </div>
                    <ExternalLink size={16} className="text-gray-600 group-hover:text-white transition-colors" />
                  </motion.div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-12">
            {/* Notifications */}
            <section>
              <h2 className="text-2xl font-bold mb-8 flex items-center space-x-3">
                <Bell className="text-orange-500" />
                <span>Announcements</span>
              </h2>
              <div className="space-y-4">
                {notifications.length > 0 ? (
                  notifications.map((notif, i) => (
                    <motion.div 
                      key={notif.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-white/5 border border-white/10 p-6 rounded-3xl relative overflow-hidden group"
                    >
                      <div className={`absolute top-0 left-0 w-1 h-full ${
                        notif.type === 'exam' ? 'bg-red-500' : notif.type === 'result' ? 'bg-green-500' : 'bg-orange-500'
                      }`}></div>
                      <h3 className="text-white font-bold text-sm mb-2">{notif.title}</h3>
                      <p className="text-gray-500 text-xs leading-relaxed mb-4">{notif.message}</p>
                      <div className="flex items-center text-[10px] text-gray-600 font-bold uppercase tracking-widest">
                        <Clock size={10} className="mr-1" />
                        <span>{new Date(notif.createdAt?.toDate()).toLocaleDateString()}</span>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No new announcements.</p>
                )}
              </div>
            </section>

            {/* Quick Actions */}
            <section className="bg-gradient-to-br from-orange-600/20 to-red-600/20 border border-orange-600/20 p-8 rounded-[2.5rem]">
              <h3 className="text-xl font-bold mb-6">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-white/5 hover:bg-white/10 text-white text-sm font-bold py-3 rounded-xl transition-all border border-white/10">
                  Take Mock Test
                </button>
                <button className="w-full bg-white/5 hover:bg-white/10 text-white text-sm font-bold py-3 rounded-xl transition-all border border-white/10">
                  View Performance
                </button>
                <button className="w-full bg-white/5 hover:bg-white/10 text-white text-sm font-bold py-3 rounded-xl transition-all border border-white/10">
                  Contact Mentor
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
