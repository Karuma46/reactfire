import { useState, useEffect } from "react";
import { collection, getDocs } from "@firebase/firestore";
import { db } from "../firebase";
import Addtask from "./components/addtask";
import Task from "./components/task";

const Todos = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const query = await getDocs(collection(db, "tasks"));
        query.forEach((doc) => {
          let list = [...tasks];
          list.push({ ...doc.data() });
          setTasks(list);
        });
      } catch (e) {
        console.log(e.message);
      }
    };

    getTasks();
  }, []);

  return (
    <>
      <div>
        <div className="tasks">
          {tasks.map((task) => (
            <Task task={task} />
          ))}
        </div>
        <Addtask />
      </div>
    </>
  );
};

export default Todos;
