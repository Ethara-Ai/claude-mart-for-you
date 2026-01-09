import { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

const defaultUser = {
  name: '',
  email: '',
  phone: '',
  address: {
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  },
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : defaultUser;
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const updateUser = (updates) => {
    setUser(prev => ({ ...prev, ...updates }));
  };

  const updateAddress = (addressUpdates) => {
    setUser(prev => ({
      ...prev,
      address: { ...prev.address, ...addressUpdates },
    }));
  };

  const resetUser = () => {
    setUser(defaultUser);
  };

  const isProfileComplete = () => {
    return (
      user.name &&
      user.email &&
      user.phone &&
      user.address.street &&
      user.address.city &&
      user.address.state &&
      user.address.zipCode &&
      user.address.country
    );
  };

  const value = {
    user,
    updateUser,
    updateAddress,
    resetUser,
    isEditing,
    setIsEditing,
    isProfileComplete,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
