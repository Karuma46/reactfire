import { createContext, useState, useEffect } from "react";
import {getAuth, onAuthStateChanged} from '@firebase/auth';

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
  const auth = getAuth()
  const profile = auth.currentUser
  const [user, setUser] = useState([])
  const [loggedIn, setLoggedIn] = useState(false)
  
  useEffect(() => {
    if(profile !== null){
      setLoggedIn(true)
    }
    console.log(profile)
  },[])
  
  return {user, setUser, loggedIn, setLoggedIn};
}