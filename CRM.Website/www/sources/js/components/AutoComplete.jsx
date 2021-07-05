import React, { Component, Fragment } from 'react';
import LangHelper from '@jsroot/common/langHelper';

export default class AutoComplete extends Component {
    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef();
        this.state = {
            options: this.props.options,
            display: 'none'
        }
    }
    componentDidMount() {
        document.addEventListener('click', this.clickHandler);
    }

    componentDidUpdate(prevProps) {
        if(this.props.options != prevProps.options) {
            this.setState({
                options: this.props.options,
                display: 'block'
            });
        }
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.clickHandler);
    }

    selectOption = item => {
        this.setState({
            display: 'none'
        });
        this.props.onSelect(item)
    }

    clickHandler = (event) => {
        const { target } = event
        if (!this.wrapperRef.current.contains(target)) {
            this.setState({
                display: 'none'
            });
        }
    }

    render() {
        const {options, display} = this.state;
        const {top, left} = this.props;
        const autoCompleteStyle = {
            top: top,
            left: left,
            display: display
        }
        console.log(this.state);
        return( 
            <div className="autocomplete-w1" style={autoCompleteStyle} ref={this.wrapperRef}>
                <div className="autocomplete">
                    { options.map((item, index)=> {
                        return (
                            <div onClick={() => this.selectOption(item)} title={item} key={index}>{item}</div>
                        )
                    }) }
                </div>
            </div>
        );
    }
    
}