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
            searchValue: ''
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
            searchValue: value
        }, () => {
            this.props.onInputChange(value);
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
                />
                {
                    showOptionList &&
                    <div className="autocomplete-items-container" ref={this.wrapperRef}>
                        <div className="autocomplete-items">
                            {
                                options.map((item, index) => {
                                    const reg = new RegExp('(' + searchValue + ')', 'gi');
                                    const displayValue = (diplayField.length > 0 ? item[diplayField] : item)
                                        .replace(reg, "<span class='text-matched'>$1</span>");

                                    return (
                                        <div className="autocomplete-item" onClick={() => this.selectOption(item)} key={index}
                                            dangerouslySetInnerHTML={{ __html: displayValue }}
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