import { createContext, useState } from "react";

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
  return {lists, setLists};
}