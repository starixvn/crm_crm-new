import React, { Component, Fragment } from 'react';

export default class AutoComplete extends Component {
    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef();
        this.state = {
            options: this.props.options,
            display: this.props.showPopup
        }
    }
    componentDidMount() {   
        document.addEventListener('click', this.clickHandler);
    }

    componentDidUpdate(prevProps) {
        if(this.props.options != prevProps.options) {
            this.setState({
                options: this.props.options,
                display: true
            });
        } 
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.clickHandler);
    }

    selectOption = item => {
        this.setState({
            display: false
        });
        this.props.onSelect(item)
    }

    clickHandler = event => {
        const { target } = event
        if (this.wrapperRef && !this.wrapperRef.current.contains(target)) {
            this.setState({
                display: false
            });
        }
    }

    render() {
        const {options, display} = this.state;
        const {top, left, value} = this.props;
        const autoCompleteStyle = {
            top: top,
            left: left,
            display: display ?  'block' : 'none'
        }
        return( 
            <div className="autocomplete-w1" style={autoCompleteStyle} ref={this.wrapperRef}>
                <div className="autocomplete">
                    { options.map((item, index)=> {
                        var reg = new RegExp('('+value+')', 'gi');
                        const displayValue = item.replace(reg, "<strong>$1</strong>")

                        return (
                            <div className="child" onClick={() => this.selectOption(item)} title={item} key={index}><div dangerouslySetInnerHTML={{ __html: displayValue }}  /></div>
                        )
                    }) }
                </div>
            </div>
        );
    }
}