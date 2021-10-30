import { useState } from "react";
import Api from "../firebase/api"

const Addtask = ({getTasks}) => {
  const [task, setTask] = useState({
    name: '',
    is_done: false
  });

  const handleTask = (e) => {
    setTask({
      name: e.target.value,
      is_done: false,
    });
  };

  const sendTask = (e) => {
    e.preventDefault();
    Api.post('tasks', task)
    .then(() => {
      setTask({name: '', is_done: false});
      getTasks()
    })
  
  };

  return (
    <>
      <form onSubmit={sendTask}>
        <input type="text" onChange={handleTask} value={task.name} />
        <button>Add Task</button>
      </form>
    </>
  );
};

export default Addtask;
