import {doc} from "@firebase/firestore";
import { db } from "app/firebase/config";
import { useState, useEffect } from "react";
import {useParams, Route} from "react-router-dom";
import Api from "../firebase/api"
import Addtask from "./addtask";
import Task from "./task";

const Todos = () => {
  const [tasks, setTasks] = useState([]);
  const {id} = useParams();

  const getTasks = async () => {
    var docRef = doc(db, 'lists', id)
    Api.query('tasks', ['listid', '==', docRef])
    .then(res => {
      setTasks(res.docs.map(doc => ({...doc.data(), id:doc.id})))
    })
    .catch(e => {
      console.log(e.message)
    })
  };
  useEffect(() => {
    getTasks();
  }, [id]);

  return (
    <>
      <div>
        <div className="tasks">
        {tasks.map((task) => (
          <Task key={task.id} task={task} getTasks={getTasks} />
          ))}
        </div>
        <Addtask getTasks={getTasks} />
      </div>
    </>
  );
};

export default Todos;
