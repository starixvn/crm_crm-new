import React, { Component } from "react";
import HelloComponent from './HelloComponent';

export default class ContactComponent extends Component {
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
                <HelloComponent></HelloComponent>
                <h1>Test Contact!!!</h1>
            </div>
        );
    }
}