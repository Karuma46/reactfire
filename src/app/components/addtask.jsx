import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";

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
    addDoc(collection(db, "tasks"), { ...task })
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
