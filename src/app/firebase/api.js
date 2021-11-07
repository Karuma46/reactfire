import {addDoc, collection, deleteDoc, doc, getDocs, updateDoc, query, where} from "@firebase/firestore"
import {db} from "./config"

class Api{
  get = (col) => {
    return getDocs(collection(db, col))
  }

  query = (col, params) => {
    return getDocs(query(collection(db, col), where(params[0], params[1], params[2])))
  }

  post = (col, obj) => {
    return addDoc(collection(db, col), {...obj})
  }

  update = (col, id, obj) =>{
    return updateDoc(doc(db, col, id), {...obj})
  }

  delete = (col, id) => {
    return deleteDoc(doc(db, col, id))
  }
}

export default new Api()