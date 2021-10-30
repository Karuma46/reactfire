import Api from '../firebase/api'

const Task = ({ task, getTasks }) => {

  const deleteTask = () => {
    Api.delete('tasks', task.id)
    .then(() =>{
      getTasks()
    })
  }
  
  const markDone = () => {
    Api.update('tasks', task.id, {is_done: true})
    .then(() => {
      getTasks()
    })
  }

  return (
    <>
      <div className="task">
        {task.name}
        <span>
        </span>
          &nbsp;{ task.is_done ? 'd' : 'n'  }
        <span>
          <button onClick={deleteTask}>Delete</button>
        </span>
        &nbsp;
        <span>
          <button onClick={markDone}>Done</button>
        </span>
      </div>
    </>
  );
};

export default Task;
