import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";

import Album from './Components/Album.js'
import CourseAlbum from './Components/CoursePage.js'
import history from './history.js';

export default class Routes extends Component {
    render() {
        return (
                <Router history={history}>
                <Switch>
                <Route path="/" exact component={Album} />
                <Route path="/CoursePage" component={CourseAlbum} />
                </Switch>
                </Router>
                )
    }
}