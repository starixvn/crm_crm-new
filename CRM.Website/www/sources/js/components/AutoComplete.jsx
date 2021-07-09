import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class AutoComplete extends Component {
    static propTypes = {
        options: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.arrayOf(PropTypes.object)]),
        diplayField: PropTypes.string,
        onChange: PropTypes.func,
        onInputChange: PropTypes.func
    };

    static defaultProps = {
        options: [],
        diplayField: ''
    };

    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef();

        this.state = {
            showOptionList: false,
            searchValue: '',
            selectedItem: -1
        }
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside);
    }

    componentDidUpdate(prevProps) {
        if (this.props.options != prevProps.options && this.props.options.length > 0) {
            this.setState({
                showOptionList: true
            });
        }
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
    }

    selectOption = item => {
        const diplayField = this.props.diplayField;
        this.setState({
            showOptionList: false,
            searchValue: diplayField.length > 0 ? item[diplayField] : item
        });

        this.props.onChange && this.props.onChange(item);
    }

    handleClickOutside = event => {
        if (this.state.showOptionList && this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            this.setState({
                showOptionList: false
            });
        }
    }

    handleChange = event => {
        const value = event.target.value;
        this.setState({
            searchValue: value,
            selectedItem: -1
        }, () => {
            this.props.onInputChange(value);
        });
    }

    handleSetSelectedItem = index => {
        this.setState({
            selectedItem: index
        });
    }


    handleKeyUp = event => {
        if(!this.state.showOptionList) return;
        switch(event.keyCode) {
            case 27: //Event.KEY_ESC
                this.setState({
                    showOptionList: false
                });
                break;
            case 9: //EVENT.KEY_TAB
            case 13: //EVENT.KEY_ENTER
                this.setState({
                    showOptionList: false
                });
                break;
            case 38: //EVENT.KEY_UP
                this.moveUp();
                break;
            case 40: //EVENT.KEY_DOWN
                this.moveDown();
                break;
            default: 
                return;

        }
    }

    moveUp = () => {
        if(this.state.selectedItem === -1) return;
        if(this.state.selectedItem === 0) {
            this.setState({
                selectedItem: -1
            });
        } else {
            const index = this.state.selectedItem - 1
            const value = this.props.options[index];
            this.setState({
                selectedItem: index,
                searchValue: value
            });
        }
    }

    moveDown = () => {
        if(this.state.selectedItem === this.props.options.length - 1) return;
        const index = this.state.selectedItem + 1
        const value = this.props.options[index];
        this.setState({
            selectedItem: index,
            searchValue: value
        });
        
    }

    render() {
        const { showOptionList, searchValue } = this.state;
        const { options, diplayField } = this.props;
        return (
            <div className="autocomplete-container">
                <input autoComplete="off" type="text"
                    className="shadow-none form-control form-control-sm"
                    value={this.state.searchValue}
                    onChange={this.handleChange}
                    onKeyUp={this.handleKeyUp}
                />
                {
                    showOptionList &&
                    <div className="autocomplete-items-container" ref={this.wrapperRef}>
                        <div className="autocomplete-items">
                            {
                                options.map((item, index) => {
                                    const reg = new RegExp('(' + searchValue + ')', 'gi');
                                    const selected = this.state.selectedItem === index ? "selected" : ""
                                    const displayValue = (diplayField.length > 0 ? item[diplayField] : item)
                                        .replace(reg, "<span class='text-matched'>$1</span>");

                                    return (
                                        <div className={ "autocomplete-item " + selected } onClick={() => this.selectOption(item)} key={index}
                                            dangerouslySetInnerHTML={{ __html: displayValue }} onMouseOver={() => this.handleSetSelectedItem(index)}
                                        />
                                    )
                                })
                            }
                        </div>
                    </div>
                }
            </div>
        );
    }
}