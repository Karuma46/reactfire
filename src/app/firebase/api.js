import {addDoc, collection, deleteDoc, doc, getDocs, updateDoc} from "@firebase/firestore"
import {db} from "./config"

class Api{
  get = (params) => {
    return getDocs(collection(db, params))
  }

  post = (params, obj) => {
    return addDoc(collection(db, params), {...obj})
  }

  update = (params, id, obj) =>{
    return updateDoc(doc(db, params, id), {...obj})
  }

  delete = (params, id) => {
    return deleteDoc(doc(db, params, id))
  }
}

export default new Api()