import { useContext } from "react";
import {BrowserRouter as Router, Route, Redirect, Switch} from "react-router-dom"
import "./App.scss";
import Sidebar from "app/components/sidebar";
import { ListProvider } from "app/context/ListsContext";
import { AuthProvider, AuthContext } from "app/context/authContext";
import Header from "app/components/header";
import Dashboard from "app/pages/dashboard";
import List from "app/pages/tasks";
import Login from "app/pages/auth/login";
import Register from "app/pages/auth/register";


const Authed = () => {
  return(
    <> 
      <Header />
      <div id="content">
        <ListProvider>
          <Sidebar/>
          <div id="tasks">
            <Route exact path="/" component={Dashboard}/>
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/lists/:id/" component={List} />
          </div>
        </ListProvider>
      </div>
    </>
  )
}

function App() {
  let {loggedIn} = useContext(AuthContext)

  return (
    <div className="App">
      <Router>
          <Route exact path="/auth" render={() => <Redirect to="/auth/signin" />} />
          <Route exact path="/auth/signin" component={Login} />
          <Route exact path="/auth/signup" component={Register} />
          <Route exact path="/" component={Authed} />
          {loggedIn ? '' : <Redirect to="/auth" />}
      </Router>
    </div>
  );
}

export default App;
