import { useState, useEffect } from "react";
import Api from "./firebase/api"
import Addtask from "./components/addtask";
import Task from "./components/task";

const Todos = () => {
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    Api.get('tasks')
    .then(res => {
      setTasks(res.docs.map(doc => ({...doc.data(), id:doc.id})))
    })
    .catch(e => {
      console.log(e.message)
    })
  };
  useEffect(() => {
    getTasks();
  }, []);

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
