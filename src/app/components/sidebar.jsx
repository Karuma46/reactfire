import { Link } from 'react-router-dom'
import Lists from './lists'


const Sidebar = () => {
  return (
    <div id="sidebar">
      <div className="sidebarLink">
        <Link to="/dashboard">
          <span>
            Dashboard
          </span>
        </Link>
      </div>

      <div className="sidebarLink">
        <Lists />
      </div>
    </div>
  )
}

export default Sidebar