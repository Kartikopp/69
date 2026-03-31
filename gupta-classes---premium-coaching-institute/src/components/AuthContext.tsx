import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db, onAuthStateChanged, doc, getDoc, setDoc, User } from '../firebase';
import { Student } from '../types';

interface AuthContextType {
  user: User | null;
  student: Student | null;
  loading: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  student: null,
  loading: true,
  isAdmin: false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setStudent(docSnap.data() as Student);
        } else {
          // Create a new student record if it doesn't exist
          const newStudent: Student = {
            uid: user.uid,
            name: user.displayName || 'New Student',
            email: user.email || '',
            role: user.email === 'glitchxkartik@gmail.com' ? 'admin' : 'student',
            enrolledCourses: [],
          };
          await setDoc(docRef, newStudent);
          setStudent(newStudent);
        }
      } else {
        setStudent(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const isAdmin = student?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, student, loading, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};
