import {BrowserRouter as Router, Route} from "react-router-dom"
import "./App.scss";
import Sidebar from "app/components/sidebar";
import { ListProvider } from "app/context/ListsContext";
import Header from "app/components/header";
import Dashboard from "app/pages/dashboard";
import List from "app/pages/tasks";

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <div id="content">
          <ListProvider>
            <Sidebar/>
            <div id="tasks">
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/lists/:id/" component={List} />
            </div>
          </ListProvider>
        </div>
      </Router>
    </div>
  );
}

export default App;
