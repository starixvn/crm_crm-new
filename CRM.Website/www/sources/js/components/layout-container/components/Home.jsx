import React, { Component, Suspense, lazy } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";
const LoadApp = lazy(() => import('./App'));

export default class Home extends Component {
    render() {
        return (
            <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>

        <hr />
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
            <Route exact path="/">
            </Route>
            <Route path="/about" element={<LoadApp />}>
            </Route>
            <Route path="/dashboard" element={<LoadApp />}>
            </Route>
            </Routes>
        </Suspense>
      </div>
    </Router>
        // <Suspense fallback={<div>Loading...</div>}>
        //     <LoadApp />
        // </Suspense> 
        )
        
    }
}