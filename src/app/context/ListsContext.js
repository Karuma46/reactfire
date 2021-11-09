import { createContext, useState } from "react";
import Api from "app/firebase/api";

export const ListContext = createContext();

export const ListProvider = ({children}) => {
  var lists = UseListProvider()
  return(
    <ListContext.Provider value={lists}>
      {children}
    </ListContext.Provider>
  )
}

const UseListProvider = () => {
  const [lists, setLists] = useState([])
  const getLists = () => {
    Api.get('lists')
    .then(res => {
      setLists(res.docs.map(doc => ({...doc.data(), id: doc.id})));    
    })
    .catch(e => {
      console.log(e.message)
    })
  }
  
  return {lists, setLists, getLists};
}