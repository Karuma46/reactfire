import {useEffect, useState, useContext} from 'react'
import {useHistory, useParams} from "react-router-dom";
import Api from "app/firebase/api"
import { ListContext } from 'app/context/ListsContext'

const ListOptions = () => {
  const [list, setList] = useState({})
  const [listEditMode, setListEditMode] = useState(false)
  const history = useHistory();
  const {id} = useParams();
  const {getLists} = useContext(ListContext)
  
  const deleteList = () => {
    Api.delete('lists', id)
    .then(() => {
      getLists()
      history.push('/dashboard')
    })
  }

  const updateList = () => {
    Api.update('lists', id, {name: list.name})
    .then(() => {
      getLists()
      setListEditMode(false)
    })
  }

  useEffect(() => {
    Api.get('lists', id)
    .then(res => {
      setList({...res.data(), id:res.id})
    })
  },[id])

  return(
    <div className="my-4 d-flex justify-content-between">
      {
        listEditMode ? (
          <div className="inputGroup d-flex justify-content-between align-items-center">
            <input type="text" value={list.name} onChange={(e) => setList({...list, name:e.target.value})} />
            <div className="inputActions"> 
              <span onClick={updateList}>
                <i className="bi-check"></i>
              </span>
              <span onClick={() => setListEditMode(false)}>
                <i className="bi-x"></i>
              </span>
            </div>
          </div>
        ): (
          <h2> {list.name} </h2>
        )
      }
      {
        list.name ? (
          <div className="">
            <span className="mx-2" onClick={() => setListEditMode(true)}>
              <i className="bi-pencil-fill"></i>
            </span>
            <span className="mx-2">
              <i className="bi-archive-fill"></i>
            </span>
            <span className="mx-2" onClick={deleteList}>
              <i className="bi-trash"></i>
            </span>
          </div>
        ) : (
          ''
        ) 
      }
      
    </div>
  )
}

export default ListOptions