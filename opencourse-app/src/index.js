import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import './index.css';
import Routes from './App.js';

ReactDOM.render(
    <Router>
        <div className="App">
            <Routes />
        </div>
    </Router>,
    document.getElementById('root')
);

