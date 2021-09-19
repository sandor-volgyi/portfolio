import { Switch, Router, Route } from "react-router-dom";
import { createBrowserHistory } from "history";

import Header from './components/Header';
import './App.scss';

export const history = createBrowserHistory({ forceRefresh: true });

function App() {
  return (
    <Router history={history}>
      <div className="app">
        <Header isLoggedIn={false} />
        <div className="main-page">
            <Switch>
              <Route exact path="/">
                <h2> FRONTPAGE</h2>
              </Route>
              <Route path="/messagewall">
                <h2> MESSAGEWALL</h2>
              </Route>
              <Route path="/settings">
                 <h2> SETTINGS</h2>
              </Route>
              <Route path="/login">
                <h2> LOGIN</h2>
              </Route>
            </Switch>
          </div>
      </div>
    </Router>
  );
}

export default App;
