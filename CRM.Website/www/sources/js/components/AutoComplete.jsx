import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

export default class AutoComplete extends Component {
    static propTypes = {
        value: PropTypes.string,
        placeholder: PropTypes.string,
        options: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.arrayOf(PropTypes.object)]),
        displayField: PropTypes.string,
        onChange: PropTypes.func,
        onInputChange: PropTypes.func
    };

    static defaultProps = {
        value: '',
        placeholder: '',
        options: [],
        displayField: '',
        isInvalid: false
    };

    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef();

        this.state = {
            showOptionList: false,
            searchValue: props.value,
            placeholder: props.placeholder,
            selectedItem: -1
        };
    }

    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside);
    }

    componentDidUpdate(prevProps) {
        if (this.props.options !== prevProps.options && this.props.options.length > 0) {
            this.setState({
                showOptionList: true
            });
        }

        if (this.props.value !== prevProps.value) {
            this.setState({
                searchValue: this.props.value
            });
        }
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
    }

    selectOption = item => {
        const displayField = this.props.displayField;
        this.setState({
            showOptionList: false,
            searchValue: displayField.length > 0 ? item[displayField] : item
        });

        this.props.onChange && this.props.onChange(item);
    };

    handleClickOutside = event => {
        if (this.state.showOptionList && this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            this.setState({
                showOptionList: false
            });
        }
    };

    handleChange = event => {
        const value = event.target.value;
        this.setState({
            searchValue: value,
            selectedItem: -1
        }, () => {
            this.props.onInputChange(value.trim());
            this.props.onChange && this.props.onChange(value.trim());
        });
    };

    handleSetSelectedItem = index => {
        this.setState({
            selectedItem: index
        });
    };

    handleKeyDown = event => {
        if (!this.state.showOptionList) {
            return;
        }

        switch (event.keyCode) {
            case 27: //Event.KEY_ESC
            case 9: //EVENT.KEY_TAB
            case 13: //EVENT.KEY_ENTER
                this.setState({
                    selectedItem: -1,
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
    };

    moveUp = () => {
        const { selectedItem } = this.state;

        if (selectedItem === -1) {
            return;
        }

        if (selectedItem === 0) {
            this.setState({ selectedItem: -1 });
        } else {
            const { displayField, options } = this.props;
            const index = selectedItem - 1;
            const value = displayField.length > 0 ? options[index][displayField] : options[index];
            this.setState({
                selectedItem: index,
                searchValue: value
            });
            this.props.onChange && this.props.onChange(value);
        }
    };

    moveDown = () => {
        const { selectedItem } = this.state;
        const { displayField, options } = this.props;

        if (selectedItem === options.length - 1) {
            return;
        }

        const index = selectedItem + 1;
        const value = displayField.length > 0 ? options[index][displayField] : options[index];
        this.setState({
            selectedItem: index,
            searchValue: value
        });
        this.props.onChange && this.props.onChange(value);
    };

    render() {
        const { showOptionList, searchValue, placeholder } = this.state;
        const { options, displayField, isInvalid } = this.props;
        return (
            <div className="autocomplete-container" ref={this.wrapperRef}>
                <Form.Control type="text" size="sm" autoComplete="off"
                    className="shadow-none" isInvalid={isInvalid}
                    value={searchValue}
                    placeholder ={placeholder}
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown}
                />
                {
                    showOptionList &&
                    <div className="autocomplete-items-container">
                        <div className="autocomplete-items">
                            {
                                options.map((item, index) => {
                                    const reg = new RegExp(`(${searchValue})`, 'gi');
                                    const selected = this.state.selectedItem === index ? 'selected' : '';
                                    const displayValue = (displayField.length > 0 ? item[displayField] : item)
                                        .replace(reg, "<span class='text-matched'>$1</span>");

                                    return (
                                        <div key={index} className={`autocomplete-item ${selected}`}
                                            dangerouslySetInnerHTML={{ __html: displayValue }}
                                            onClick={() => this.selectOption(item)}
                                            onMouseOver={() => this.handleSetSelectedItem(index)}
                                        />
                                    );
                                })
                            }
                        </div>
                    </div>
                }
            </div>
        );
    }
}