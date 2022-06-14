import React, { Component } from "react";
import HelloComponent from './HelloComponent';

export default class App extends Component {
    state = {
        counter: 0
    };

    handleClick = () => {
        this.setState(prevState => {
            return { counter: prevState.counter + 1 };
        });
    };
    render() {
        return (
            <div className="App">
                <HelloComponent />
                <h1>I'm configuring setting up Webpack!!!</h1>
                <p>{`The count now is: ${this.state.counter}`}</p>
                <button onClick={this.handleClick}>Click me</button>
            </div>
        );
    }
}