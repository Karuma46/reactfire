import {BrowserRouter as Router, Route} from "react-router-dom"
import "./App.scss";
import Todos from "app/components/todo";
import Lists from "app/components/lists";
import { ListProvider } from "app/context/ListsContext";

function App() {
  return (
    <div className="App">
      <header>
        <h1>React x Firebase</h1>
        <h3>To do App</h3>
      </header>
      <Router>
        <div id="content">
          <ListProvider>
            <div id="lists">
              <Lists/>
            </div>
            <div id="tasks">
              <Route path="/list/:id/" render={() => (
                <Todos />
              )} />
            </div>
          </ListProvider>
        </div>
      </Router>
    </div>
  );
}

export default App;
