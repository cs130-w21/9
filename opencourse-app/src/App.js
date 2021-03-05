import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import CourseList from "./Components/CourseList.js";
import CoursePage from "./Components/CoursePage.js";
import history from "./history.js";
import CreateAndEdit from "./Components/CreateAndEdit.js";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { shadows } from "@material-ui/system";
import Login from "./login";

export default class Routes extends Component {
  render() {
    return (
      <>
        <AppBar
          position="static"
          style={{
            background:
              "linear-gradient(0deg, rgba(34,193,195,1) 0%, rgba(253,187,45,1) 100%)",
          }}
        >
          <Toolbar>
            <Typography style={{ margin: 5, color: "black" }} variant="h2">
              <a
                style={{
                  textDecoration: "none",
                  textEmphasisColor: "black",
                  textDecorationColor: "black",
                  color: "black",
                }}
                href={"/"}
              >
                OpenCourse
              </a>
            </Typography>
          </Toolbar>
        </AppBar>
        <Router history={history}>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/CoursePage" component={CoursePage} />
            <Route path="/createEdit" component={CreateAndEdit} />
          </Switch>
        </Router>
      </>
    );
  }
}
