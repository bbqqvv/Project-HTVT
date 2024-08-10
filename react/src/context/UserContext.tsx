// src/context/UserContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface UserContextType {
  role: 'student' | 'faculty' | 'examDept';
  name: string;
  setRole: (role: 'student' | 'faculty' | 'examDept') => void;
  setName: (name: string) => void;
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

  useEffect(() => {
    // Lấy vai trò và tên người dùng từ localStorage
    const userRole = localStorage.getItem('userRole') as 'student' | 'faculty' | 'examDept';
    const userName = localStorage.getItem('userName') || '';

    if (userRole) {
      setRole(userRole);
    }
    setName(userName);
  }, []);

  return (
    <UserContext.Provider value={{ role, name, setRole, setName }}>
      {children}
    </UserContext.Provider>
  );
};
