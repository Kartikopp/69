import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { db, collection, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp, onSnapshot, query, orderBy, handleFirestoreError, OperationType } from '../firebase';
import { Course, Result, Notification, ContactMessage } from '../types';
import { Plus, Edit2, Trash2, Bell, BookOpen, Trophy, Mail, Users, Save, X } from 'lucide-react';
import { toast } from 'sonner';

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'courses' | 'results' | 'notifications' | 'messages'>('courses');
  const [courses, setCourses] = useState<Course[]>([]);
  const [results, setResults] = useState<Result[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    const unsubCourses = onSnapshot(collection(db, 'courses'), (snap) => {
      setCourses(snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Course)));
    });
    const unsubResults = onSnapshot(collection(db, 'results'), (snap) => {
      setResults(snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Result)));
    });
    const unsubNotifs = onSnapshot(query(collection(db, 'notifications'), orderBy('createdAt', 'desc')), (snap) => {
      setNotifications(snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Notification)));
    });
    const unsubMessages = onSnapshot(query(collection(db, 'contactMessages'), orderBy('createdAt', 'desc')), (snap) => {
      setMessages(snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as ContactMessage)));
      setLoading(false);
    });

    return () => {
      unsubCourses();
      unsubResults();
      unsubNotifs();
      unsubMessages();
    };
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (activeTab === 'courses') {
        const data = { ...formData, price: Number(formData.price) };
        if (editingId) {
          await updateDoc(doc(db, 'courses', editingId), data);
          toast.success('Course updated successfully');
        } else {
          await addDoc(collection(db, 'courses'), data);
          toast.success('Course added successfully');
        }
      } else if (activeTab === 'results') {
        const data = { ...formData, year: Number(formData.year) };
        if (editingId) {
          await updateDoc(doc(db, 'results', editingId), data);
        } else {
          await addDoc(collection(db, 'results'), data);
        }
        toast.success('Result saved');
      } else if (activeTab === 'notifications') {
        const data = { ...formData, createdAt: serverTimestamp() };
        await addDoc(collection(db, 'notifications'), data);
        toast.success('Notification sent');
      }
      setIsModalOpen(false);
      setEditingId(null);
      setFormData({});
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Failed to save');
    }
  };

  const handleDelete = async (id: string, collectionName: string) => {
    if (!window.confirm('Are you sure you want to delete this?')) return;
    try {
      await deleteDoc(doc(db, collectionName, id));
      toast.success('Deleted successfully');
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  const openEdit = (item: any) => {
    setEditingId(item.id);
    setFormData(item);
    setIsModalOpen(true);
  };

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center"><div className="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin"></div></div>;

  return (
    <div className="pt-32 pb-24 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8">
          <h1 className="text-4xl font-bold">Admin <span className="text-orange-500">Dashboard</span></h1>
          <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
            {[
              { id: 'courses', icon: <BookOpen size={18} />, label: 'Courses' },
              { id: 'results', icon: <Trophy size={18} />, label: 'Results' },
              { id: 'notifications', icon: <Bell size={18} />, label: 'Notifs' },
              { id: 'messages', icon: <Mail size={18} />, label: 'Messages' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl text-sm font-bold transition-all ${
                  activeTab === tab.id ? 'bg-orange-600 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold capitalize">{activeTab} Management</h2>
            {activeTab !== 'messages' && (
              <button 
                onClick={() => { setEditingId(null); setFormData({}); setIsModalOpen(true); }}
                className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-xl font-bold flex items-center space-x-2 transition-all"
              >
                <Plus size={20} />
                <span>Add New</span>
              </button>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10 text-gray-500 text-sm uppercase tracking-widest font-bold">
                  <th className="pb-4 px-4">Details</th>
                  <th className="pb-4 px-4">Status/Info</th>
                  <th className="pb-4 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {activeTab === 'courses' && courses.map(course => (
                  <tr key={course.id} className="group hover:bg-white/5 transition-colors">
                    <td className="py-6 px-4">
                      <div className="font-bold text-white">{course.title}</div>
                      <div className="text-xs text-gray-500">{course.category}</div>
                    </td>
                    <td className="py-6 px-4">
                      <div className="text-orange-500 font-bold">₹{course.price}</div>
                      <div className="text-xs text-gray-500">{course.duration}</div>
                    </td>
                    <td className="py-6 px-4 text-right">
                      <div className="flex justify-end space-x-2">
                        <button onClick={() => openEdit(course)} className="p-2 text-gray-400 hover:text-white transition-colors"><Edit2 size={18} /></button>
                        <button onClick={() => handleDelete(course.id!, 'courses')} className="p-2 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {activeTab === 'results' && results.map(result => (
                  <tr key={result.id} className="group hover:bg-white/5 transition-colors">
                    <td className="py-6 px-4">
                      <div className="font-bold text-white">{result.studentName}</div>
                      <div className="text-xs text-gray-500">{result.exam}</div>
                    </td>
                    <td className="py-6 px-4">
                      <div className="text-white">Year: {result.year}</div>
                      <div className="text-xs text-orange-500">Rank: {result.rank || 'N/A'}</div>
                    </td>
                    <td className="py-6 px-4 text-right">
                      <div className="flex justify-end space-x-2">
                        <button onClick={() => openEdit(result)} className="p-2 text-gray-400 hover:text-white transition-colors"><Edit2 size={18} /></button>
                        <button onClick={() => handleDelete(result.id!, 'results')} className="p-2 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
                {activeTab === 'notifications' && notifications.map(notif => (
                  <tr key={notif.id} className="group hover:bg-white/5 transition-colors">
                    <td className="py-6 px-4">
                      <div className="font-bold text-white">{notif.title}</div>
                      <div className="text-xs text-gray-500 line-clamp-1">{notif.message}</div>
                    </td>
                    <td className="py-6 px-4">
                      <div className="text-xs text-gray-500 uppercase tracking-widest">{notif.type}</div>
                    </td>
                    <td className="py-6 px-4 text-right">
                      <button onClick={() => handleDelete(notif.id!, 'notifications')} className="p-2 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                    </td>
                  </tr>
                ))}
                {activeTab === 'messages' && messages.map(msg => (
                  <tr key={msg.id} className="group hover:bg-white/5 transition-colors">
                    <td className="py-6 px-4">
                      <div className="font-bold text-white">{msg.name}</div>
                      <div className="text-xs text-gray-500">{msg.email}</div>
                    </td>
                    <td className="py-6 px-4">
                      <div className="text-white text-sm">{msg.subject}</div>
                      <div className="text-xs text-gray-500 line-clamp-1">{msg.message}</div>
                    </td>
                    <td className="py-6 px-4 text-right">
                      <button onClick={() => handleDelete(msg.id!, 'contactMessages')} className="p-2 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={18} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-zinc-900 border border-white/10 p-8 rounded-[2.5rem] w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-bold">{editingId ? 'Edit' : 'Add'} {activeTab.slice(0, -1)}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-white"><X size={24} /></button>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              {activeTab === 'courses' && (
                <>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Title</label>
                    <input value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Category</label>
                      <select value={formData.category || 'Banking'} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-zinc-800 border border-white/10 rounded-xl p-4 text-white">
                        <option value="Banking">Banking</option>
                        <option value="SSC">SSC</option>
                        <option value="CAT">CAT</option>
                        <option value="Foundation">Foundation</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Price</label>
                      <input type="number" value={formData.price || ''} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Description</label>
                    <textarea value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white h-32 resize-none" required />
                  </div>
                </>
              )}

              {activeTab === 'results' && (
                <>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Student Name</label>
                    <input value={formData.studentName || ''} onChange={e => setFormData({...formData, studentName: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Exam</label>
                      <input value={formData.exam || ''} onChange={e => setFormData({...formData, exam: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Year</label>
                      <input type="number" value={formData.year || ''} onChange={e => setFormData({...formData, year: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white" required />
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'notifications' && (
                <>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Title</label>
                    <input value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Type</label>
                    <select value={formData.type || 'general'} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full bg-zinc-800 border border-white/10 rounded-xl p-4 text-white">
                      <option value="general">General</option>
                      <option value="exam">Exam Update</option>
                      <option value="result">Result Out</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Message</label>
                    <textarea value={formData.message || ''} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white h-32 resize-none" required />
                  </div>
                </>
              )}

              <button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-xl font-bold flex items-center justify-center space-x-2 transition-all">
                <Save size={20} />
                <span>Save Changes</span>
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Admin;
