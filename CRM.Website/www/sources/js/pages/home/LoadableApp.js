import React, { Component, Suspense, lazy } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";
const LoadApp = lazy(() => import('./App'));
const ContactComponentPromise  = lazy(() => import('./ContactComponent'));
const TestComponentPromise  = lazy(() => import('./TestComponent'));

export default class LoadableApp extends Component {
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
            <Route exact path="/" element={<TestComponentPromise />}>
            </Route>
            <Route path="/about" element={<ContactComponentPromise />}>
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
