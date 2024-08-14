import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface UserContextType {
  role: 'student' | 'faculty' | 'examDept';
  name: string;
  id: string; // studentId, facultyId, or examDeptId
  setRole: (role: 'student' | 'faculty' | 'examDept') => void;
  setName: (name: string) => void;
  setId: (id: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<'student' | 'faculty' | 'examDept'>('student');
  const [name, setName] = useState<string>('');
  const [id, setId] = useState<string>('');

  useEffect(() => {
    // Retrieve role, name, and id from localStorage
    const userRole = localStorage.getItem('userRole') as 'student' | 'faculty' | 'examDept';
    const userName = localStorage.getItem('userName') || '';
    const userId = localStorage.getItem('userId') || '';

    if (userRole) {
      setRole(userRole);
    }
    setName(userName);
    if (userId) {
      setId(userId);
    } else {
      console.log('userId not found in localStorage');
    }
  }, []);

  return (
    <UserContext.Provider value={{ role, name, id, setRole, setName, setId }}>
      {children}
    </UserContext.Provider>
  );
};
