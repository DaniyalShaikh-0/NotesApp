import React, {useState, useContext} from 'react';
// export const [message, setMessage] = React.useState('Hello');
const UserContext = React.createContext();

export const UserInfoProvider = ({children}) => {
  return (
    <UserContext.Provider value={useState({})}>{children}</UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
