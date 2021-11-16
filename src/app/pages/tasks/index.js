import {doc} from "@firebase/firestore";
import { db } from "app/firebase/config";
import { useState, useEffect, useContext } from "react";
import {useParams, useHistory} from "react-router-dom";
import Api from "app/firebase/api"
import Addtask from "./addtask";
import Task from "./task";
import { ListContext } from 'app/context/ListsContext'
import Skeleton, {SkeletonTheme} from "react-loading-skeleton"

const List = () => {
  const [tasks, setTasks] = useState([]);
  const [list, setList] = useState({})
  const [listEditMode, setListEditMode] = useState(false)
  const {id} = useParams();
  const history = useHistory();
  const {getLists} = useContext(ListContext)
  const [loading, setLoading] = useState(true)

  const getTasks = async () => {
    setLoading(true)
    var docRef = doc(db, 'lists', id)
    Api.query('tasks', ['listid', '==', docRef])
    .then(res => {
      setTasks(res.docs.map(doc => ({...doc.data(), id:doc.id})));
      setLoading(false)
    })
    .catch(e => {
      console.log(e.message)
      setLoading(false)
    })
  };

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

  const getList = () => {
    Api.get('lists', id)
    .then(res => {
      setList({...res.data(), id:res.id})
    })
  }

  useEffect(() => {
    getTasks();
    getList();
  }, [id]);

  return (
    <>
      <div>
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
        </div>
        <div className="tasks mt-4 mb-4">
        {
          loading ? (
            <SkeletonTheme baseColor="#181820" highlightColor="#272732">
              <Skeleton count={2} height={70} borderRadius={20} />
            </SkeletonTheme>
          ) : (
            tasks.map((task) => (
              <Task key={task.id} task={task} getTasks={getTasks} />
            ))
          )
        }
        </div>
        <Addtask getTasks={getTasks} />
      </div>
    </>
  );
};

export default List;
