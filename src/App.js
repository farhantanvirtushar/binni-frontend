/* eslint-disable */
import Home from "./pages/Home";

import Admin from "./pages/Admin/Admin";
import AdminLogin from "./pages/Admin/AdminLogin";
import dotenv from "dotenv";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import WebFont from "webfontloader";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/admin/login">
          <AdminLogin />
        </Route>{" "}
        <Route path="/admin">
          <Admin />
        </Route>{" "}
        <Route path="/">
          <Home />
        </Route>{" "}
      </Switch>{" "}
    </Router>
  );
}

export default App;
