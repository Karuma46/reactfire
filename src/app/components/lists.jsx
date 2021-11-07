import {Link} from 'react-router-dom'
import Api from 'app/firebase/api'
import { useContext, useEffect, useState } from 'react'
import { ListContext } from 'app/context/ListsContext'

const Lists = () => {
  const {lists, setLists} = useContext(ListContext)
  const [newList, setNewList] = useState({name: ''})

  const handleInput = (e) => {
    setNewList({name: e.target.value})
  }

  const getLists = () => {
    Api.get('lists')
    .then(res => {
      setLists(res.docs.map(doc => ({...doc.data(), id: doc.id})));
      
    })
    .catch(e => {
      console.log(e.message)
    })
  }

  const postNewList = (e) => {
    e.preventDefault()
    Api.post('lists', {...newList})
    .then(res => {
      console.log(res);
      setNewList({name: ''})
      getLists()
    })
    .catch(e => {
      console.log(e.message)
    })
  }

  useEffect(() => {
    getLists()
  },[])

  return(
    <>
      <ul>
        {
          lists.map(list=>(
            <Link to={`/list/${list.id}`} key={list.id}>
              <li>{list.name}</li>
            </Link>
          ))
        }
      </ul>

      <div>
        <form onSubmit={postNewList}>
          <input type="text" value={newList.name} onChange={handleInput} />
          <button>Add List</button>
        </form>
      </div>
    </>
  )
}

export default Lists