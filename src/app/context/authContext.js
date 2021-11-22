import { createContext, useState, useEffect } from "react";
import {getAuth, onAuthStateChanged, signOut} from '@firebase/auth';
import Api from 'app/firebase/api'

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
  const [profile, setProfile] = useState({})
  const [user, setUser] = useState({})
  const [loggedIn, setLoggedIn] = useState(null)

  const setCurrUser = (obj) => {
    setUser(obj);
    setLoggedIn(true);
    localStorage.setItem('user', JSON.stringify(obj))
  }

  const getProfile = (id) => {
    Api.query('users', ['uid', '==', id])
    .then(res => {
      setProfile({...res.docs[0].data(), id: res.docs[0].id})
    })
  }

  const signout = () => {
    signOut(auth)
    .then(() => {
      localStorage.removeItem('user');
      setProfile({});
    })
  }
  
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')));
    onAuthStateChanged(auth, (user) => {
      if(user){
        setLoggedIn(true);
        setUser(user);
        getProfile(user.uid);
      } else {
        setUser({});
        setLoggedIn(false);
        localStorage.removeItem('user');
      }
    })
  },[loggedIn, auth])
  
  return {user, setCurrUser, loggedIn, signout, profile};
}