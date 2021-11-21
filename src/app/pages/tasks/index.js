import { doc } from "@firebase/firestore";
import { db } from "app/firebase/config";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import Api from "app/firebase/api";
import Addtask from "./addtask";
import Task from "./task";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import ListOptions from "./listOptions";

const List = () => {
  const [tasks, setTasks] = useState([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const getTasks = useCallback(() => {
    setLoading(true);
    var docRef = doc(db, "lists", id);
    Api.query("tasks", ["listid", "==", docRef])
      .then((res) => {
        setTasks(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setLoading(false);
        console.log('run');
      })
      .catch((e) => {
        console.log(e.message);
        setLoading("failed");
      });
  }, [id]);

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  return (
    <>
      <div>
        <ListOptions />
        <div className="tasks mt-4 mb-4">
          {loading === true ? (
            <SkeletonTheme baseColor="#181820" highlightColor="#272732">
              <Skeleton count={2} height={70} borderRadius={20} />
            </SkeletonTheme>
          ) : loading === "failed" ? (
            <div className="text-center">
              <span onClick={() => getTasks()}>
                <i className="bi-arrow-clockwise"></i>
                <p>Reload</p>
              </span>
            </div>
          ) : (
            tasks.map((task) => (
              <Task key={task.id} task={task} getTasks={getTasks} />
            ))
          )}
        </div>
        <Addtask getTasks={getTasks} />
      </div>
    </>
  );
};

export default List;
