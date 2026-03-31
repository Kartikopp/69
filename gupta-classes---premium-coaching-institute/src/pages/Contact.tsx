import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { db, collection, addDoc, serverTimestamp, handleFirestoreError, OperationType } from '../firebase';
import { toast } from 'sonner';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact: React.FC = () => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      await addDoc(collection(db, 'contactMessages'), {
        ...data,
        createdAt: serverTimestamp(),
      });
      toast.success('Message sent successfully! We will get back to you soon.');
      reset();
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'contactMessages');
      toast.error('Failed to send message. Please try again.');
    }
  };

  return (
    <div className="pt-32 pb-24 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-extrabold mb-6"
          >
            Get in <span className="text-orange-500">Touch</span>
          </motion.h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Have questions? We're here to help. Reach out to us via the form or our contact details.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/5 border border-white/10 p-8 rounded-3xl"
            >
              <h3 className="text-2xl font-bold mb-8">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-600/10 rounded-xl flex items-center justify-center text-orange-500 shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <div className="text-white font-bold mb-1">Our Location</div>
                    <p className="text-gray-400 text-sm">123, Civil Lines, Near Commissioner Office, Meerut, UP - 250001</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-600/10 rounded-xl flex items-center justify-center text-orange-500 shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <div className="text-white font-bold mb-1">Phone Number</div>
                    <p className="text-gray-400 text-sm">+91 98765 43210</p>
                    <p className="text-gray-400 text-sm">+91 121 2345678</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-orange-600/10 rounded-xl flex items-center justify-center text-orange-500 shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <div className="text-white font-bold mb-1">Email Address</div>
                    <p className="text-gray-400 text-sm">info@guptaclasses.com</p>
                    <p className="text-gray-400 text-sm">support@guptaclasses.com</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-orange-600 to-red-600 p-8 rounded-3xl text-white"
            >
              <h4 className="text-xl font-bold mb-4 flex items-center space-x-2">
                <MessageSquare size={24} />
                <span>Chat with us</span>
              </h4>
              <p className="text-white/80 text-sm mb-6">
                Need instant help? Connect with our counselors on WhatsApp for quick guidance.
              </p>
              <a 
                href="https://wa.me/919876543210" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-white text-orange-600 px-6 py-3 rounded-xl font-bold text-sm hover:bg-gray-100 transition-all"
              >
                Open WhatsApp
              </a>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 bg-white/5 border border-white/10 p-8 md:p-12 rounded-[3rem]"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400 ml-1">Full Name</label>
                  <input 
                    {...register('name')}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-orange-500 transition-colors"
                    placeholder="Enter your name"
                  />
                  {errors.name && <p className="text-red-500 text-xs ml-1">{errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400 ml-1">Email Address</label>
                  <input 
                    {...register('email')}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-orange-500 transition-colors"
                    placeholder="Enter your email"
                  />
                  {errors.email && <p className="text-red-500 text-xs ml-1">{errors.email.message}</p>}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400 ml-1">Subject</label>
                <input 
                  {...register('subject')}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-orange-500 transition-colors"
                  placeholder="What is this regarding?"
                />
                {errors.subject && <p className="text-red-500 text-xs ml-1">{errors.subject.message}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400 ml-1">Message</label>
                <textarea 
                  {...register('message')}
                  rows={5}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-orange-500 transition-colors resize-none"
                  placeholder="Type your message here..."
                ></textarea>
                {errors.message && <p className="text-red-500 text-xs ml-1">{errors.message.message}</p>}
              </div>
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white py-5 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-orange-600/20 flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send size={20} />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>

        {/* Map Section */}
        <div className="mt-24 rounded-[3rem] overflow-hidden border border-white/10 h-[400px] relative">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3491.564416174154!2d77.70588667626244!3d28.98921867547285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390c644400000001%3A0x6d9f7830b050c6d9!2sCivil%20Lines%2C%20Meerut%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1711872000000!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
