import React, { Component } from 'react';
import { Collapse } from 'react-bootstrap';

export default class Panel extends Component {
    static defaultProps = {
        defaultOpened: false
    }

    constructor(props) {
        super(props);

        this.state = {
            isOpen: props.defaultOpened
        };
    }

    toggle = () => this.setState(prevState => ({ isOpen: !prevState.isOpen }))

    set = isOpen => this.setState({ isOpen: isOpen });

    render() {
        return (
            <div className="nap-panel">
                <div className="panel-header" onClick={this.toggle}>
                    {!this.state.isOpen && this.props.children[0]}
                    <Collapse in={this.state.isOpen} timeout={500} dimension="height" mountOnEnter unmountOnExit>
                        {this.props.children[1]}
                    </Collapse>
                    <span className={`icon-right fa ${this.state.isOpen ? 'fa-angle-down' : 'fa-angle-right'}`} />
                </div>
            </div>
        );
    }
}

export function PanelHeader(props) {
    return (
        props.children
    );
}