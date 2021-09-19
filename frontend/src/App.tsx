import { Switch, Router, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

import Header from "./components/Header";
import Button from "./components/Button";
import Login from "./pages/Login";
import "./App.scss";

export const history = createBrowserHistory({ forceRefresh: true });

function App() {
  const isUserLoggedIn = localStorage.getItem("token") != null;

  return (
    <Router history={history}>
      <div className="app">
        <Header isLoggedIn={isUserLoggedIn} />
        <div className="main-page">
          <Switch>
            <Route exact path="/">
              <h2>
                <Button type="submit" title="kattanj ide" />
              </h2>
            </Route>
            <Route path="/messagewall">
              <h2>MESSAGEWALL</h2>
            </Route>
            <Route path="/settings">
              <h2>SETTINGS</h2>
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <h2>REGISTER</h2>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
