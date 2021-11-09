import {Link} from 'react-router-dom'
import Api from 'app/firebase/api'
import { useContext, useEffect, useState } from 'react'
import { ListContext } from 'app/context/ListsContext'

const Lists = () => {
  const {lists, getLists} = useContext(ListContext)
  const [newList, setNewList] = useState({name: ''})
  const [addListInput, setAddListInput] = useState(false)

  const handleInput = (e) => {
    setNewList({name: e.target.value})
  }

  const postNewList = (e) => {
    e.preventDefault()
    Api.post('lists', {...newList})
    .then(res => {
      console.log(res);
      setNewList({name: ''})
      setAddListInput(false)
      getLists()
    })
    .catch(e => {
      console.log(e.message)
    })
  }

  const toggleAddListInput = () => {
    setNewList('')
    setAddListInput(!addListInput);
  }

  useEffect(() => {
    getLists()
  },[])

  return(
    <>
      <span>
        <i className="bi-ui-checks"></i>
        <Link to="/lists">&nbsp; Lists</Link>
      </span>
      <ul>
        {
          lists.map(list=>(
            <Link to={`/lists/${list.id}`} key={list.id}>
              <li> <i className="bi-square-fill"> &nbsp; </i> {list.name}</li>
            </Link>
          ))
        }
        {
          addListInput ? (
            <li id="addListInput">
              <div>
                <form onSubmit={postNewList}>
                  <div className="inputGroup d-flex justify-content-between align-items-center">
                    <input type="text" value={newList.name} onChange={handleInput} placeholder="List Name" />
                    <div className="inputActions"> 
                      <span onClick={postNewList}>
                        <i className="bi-check"></i>
                      </span>
                      <span onClick={toggleAddListInput}>
                        <i className="bi-x"></i>
                      </span>
                    </div>
                  </div>
                </form>
              </div>
            </li>
          ): (
            ''
          )
        }

        <li id="addListBtn" onClick={toggleAddListInput}>
          <i className="bi-plus-circle"></i> &nbsp;
          Add New List
        </li>
      </ul>

     
    </>
  )
}

export default Lists