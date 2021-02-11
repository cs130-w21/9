import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import CourseList from './Components/CourseList.js'
import CoursePage from './Components/CoursePage.js'
import history from './history.js';

export default class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route path="/" exact component={CourseList} />
                    <Route path="/CoursePage" component={CoursePage} />
                </Switch>
            </Router>
        )
    }
}