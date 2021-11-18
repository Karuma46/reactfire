import { createContext, useState } from "react";
import Api from "app/firebase/api";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  var auth = UseAuthProvider()
  return(
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  )
}

const UseAuthProvider = () => {
  const [user, setUser] = useState([])
  const [loggedIn, setLoggedIn] = useState(false)
  return {user, setUser, loggedIn, setLoggedIn};
}