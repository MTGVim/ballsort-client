import { createContext, useContext, useState } from 'react';
import { UserDto } from '../types';

interface User extends UserDto {}

interface IAppContext {
  user: User | undefined;
  setUser: (user: User | undefined) => void;
}

const AppContext = createContext<IAppContext | Record<string, never>>({});

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User>();
  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};

export default function useAppContext() {
  return useContext(AppContext);
}
