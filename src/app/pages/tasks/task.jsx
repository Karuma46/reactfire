import Api from '../../firebase/api'

const Task = ({ task, getTasks }) => {

  const deleteTask = () => {
    Api.delete('tasks', task.id)
    .then(() =>{
      getTasks()
    })
  }
  
  const toggleDone = () => {
    Api.update('tasks', task.id, {is_done: !task.is_done})
    .then(() => {
      getTasks()
    })
  }

  return (
    <>
      <div className="task rb d-flex align-items-center justify-content-start">
        <div onClick={toggleDone}>
          { task.is_done ? <i className="bi-check-square-fill"></i> : <i className="bi-square"></i>  }
        </div>
        <div className="taskName">
          {task.name}
        </div>
        <div>
          <span onClick={deleteTask}>
            <i className="bi-trash"></i>
          </span>
          &nbsp;
          <span>
            <i className="bi-pencil-square"></i>
          </span>
        </div>
      </div>
    </>
  );
};

export default Task;
