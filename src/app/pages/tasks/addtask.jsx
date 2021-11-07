import { useState } from "react";
import {useParams } from 'react-router-dom';
import {doc} from '@firebase/firestore';
import {db} from "app/firebase/config"
import Api from "app/firebase/api";

const Addtask = ({getTasks}) => {
  const {id} = useParams();
  const [task, setTask] = useState({
    name: '',
    is_done: false,
    deadline: '',
  });

  const handleTask = (e) => {
    setTask({...task, name: e.target.value});
  };

  const handleDateTime = (e) => {
    setTask({...task, deadline: e.target.value})
  }

  const sendTask = (e) => {
    e.preventDefault();
    Api.post('tasks', {...task, listid : doc(db, 'lists', id)})
    .then(() => {
      setTask({name: '', is_done: false, deadline: ''});
      getTasks()
    })
  
  };

  return (
    <>
      <form onSubmit={sendTask}>
        <input type="text" onChange={handleTask} value={task.name} />
        <input type="datetime-local" onChange={handleDateTime} value={task.deadline} />
        <button>Add Task</button>
      </form>
    </>
  );
};

export default Addtask;
