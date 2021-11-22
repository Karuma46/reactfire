import { createContext, useState, useEffect, useContext } from "react";
import Api from "app/firebase/api";
import { AuthContext } from "./authContext";
import {db} from "app/firebase/config";
import {doc} from "@firebase/firestore";

export const ListContext = createContext();

export const ListProvider = ({ children }) => {
  var lists = UseListProvider();
  return <ListContext.Provider value={lists}>{children}</ListContext.Provider>;
};

const UseListProvider = () => {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  let {profile} = useContext(AuthContext)

  const getLists = () => {
    setLoading(true);
    let userRef = doc(db, "users", profile.id);
    Api.query("lists", ['userId', '==', userRef])
    .then((res) => {
      setLists(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoading(false);
    })
    .catch((e) => {
      console.log(e.message);
      setLoading(false);
    });
  };

  useEffect(() => {
    if(profile.id){
      getLists();
    }
  }, [profile]);

  return { lists, setLists, getLists, loading };
};
