import { createContext, useState, useEffect } from "react";
import Api from "app/firebase/api";

export const ListContext = createContext();

export const ListProvider = ({ children }) => {
  var lists = UseListProvider();
  return <ListContext.Provider value={lists}>{children}</ListContext.Provider>;
};

const UseListProvider = () => {
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);

  const getLists = () => {
    setLoading(true);
    Api.get("lists")
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
    getLists();
  }, []);

  return { lists, setLists, getLists, loading };
};
