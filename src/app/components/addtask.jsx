import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";

const Addtask = () => {
  const [task, setTask] = useState({});

  const handleTask = (e) => {
    setTask({
      name: e.target.value,
      is_done: false,
    });
  };

  const sendTask = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "tasks"), { ...task });
      setTask({});
    } catch (e) {
      console.log(e.message);
    }
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
