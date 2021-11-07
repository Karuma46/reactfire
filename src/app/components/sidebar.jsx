import { Link } from 'react-router-dom'
import Lists from './lists'

const Sidebar = () => {
  return (
    <div id="sidebar" className="rb p-4 my-3">
      <div className="sidebarLink">
        <Link to="/dashboard">
          <span>
            <i className="bi-file-bar-graph-fill"></i>&nbsp;
            Dashboard
          </span>
        </Link>
      </div>

      <div className="sidebarLink">
        <Lists />
      </div>

      <div className="sidebarLink">
        <Link to="/archived/:id">
          <span>
            <i className="bi-archive-fill"></i>&nbsp;
            Archived Lists
          </span>
        </Link>
      </div>
    </div>
  )
}

export default Sidebar