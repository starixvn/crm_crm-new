import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

export default class AutoComplete extends Component {
    static propTypes = {
        value: PropTypes.string,
        options: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.arrayOf(PropTypes.object)]),
        diplayField: PropTypes.string,
        onChange: PropTypes.func,
        onInputChange: PropTypes.func
    };

    static defaultProps = {
        value: '',
        options: [],
        diplayField: '',
        isInvalid: false
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

        if (this.props.value != prevProps.value) {
            this.setState({
                searchValue: this.props.value
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
            this.props.onInputChange(value.trim());
            this.props.onChange(value.trim());
        });
    }

    handleSetSelectedItem = index => {
        this.setState({
            selectedItem: index
        });
    }

    handleKeyDown = event => {
        if (!this.state.showOptionList) return;
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
    }

    moveUp = () => {
        const { selectedItem } = this.state;

        if (selectedItem === -1) return;
        if (selectedItem === 0) {
            this.setState({ selectedItem: -1 });
        } else {
            const { diplayField, options } = this.props;
            const index = selectedItem - 1
            const value = diplayField.length > 0 ? options[index][diplayField] : options[index];
            this.setState({
                selectedItem: index,
                searchValue: value
            });
            this.props.onChange(value);
        }
    }

    moveDown = () => {
        const { selectedItem } = this.state;
        const { diplayField, options } = this.props;

        if (selectedItem === options.length - 1) return;

        const index = selectedItem + 1
        const value = diplayField.length > 0 ? options[index][diplayField] : options[index];
        this.setState({
            selectedItem: index,
            searchValue: value
        });
        this.props.onChange(value);
    }

    render() {
        const { showOptionList, searchValue } = this.state;
        const { options, diplayField, isInvalid } = this.props;
        return (
            <div className="autocomplete-container" ref={this.wrapperRef}>
                <Form.Control type="text" size="sm" autoComplete="off"
                    className="shadow-none" isInvalid={isInvalid}
                    value={searchValue}
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown}
                />
                {
                    showOptionList &&
                    <div className="autocomplete-items-container">
                        <div className="autocomplete-items">
                            {
                                options.map((item, index) => {
                                    const reg = new RegExp('(' + searchValue + ')', 'gi');
                                    const selected = this.state.selectedItem === index ? 'selected' : ''
                                    const displayValue = (diplayField.length > 0 ? item[diplayField] : item)
                                        .replace(reg, "<span class='text-matched'>$1</span>");

                                    return (
                                        <div className={`autocomplete-item ${selected}`} onClick={() => this.selectOption(item)} key={index}
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