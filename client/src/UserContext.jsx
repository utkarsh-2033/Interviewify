import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext({
  email: null,
  setEmail: () => {},
});

export const UserProvider = ({ children }) => {
  const [email, setEmail] = useState(() => {
    // Retrieve the email from local storage if it exists
    return localStorage.getItem("userEmail") || null;
  });

  useEffect(() => {
    // Save the email to local storage whenever it changes
    if (email) {
      localStorage.setItem("userEmail", email);
    } else {
      localStorage.removeItem("userEmail");
    }
  }, [email]);

  return (
    <UserContext.Provider value={{ email, setEmail }}>
      {children}
    </UserContext.Provider>
  );
};

export const useEmail = () => {
  return useContext(UserContext);
};

export default UserContext;