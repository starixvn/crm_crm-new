import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import LangHelper from '@jsroot/common/langHelper';

export default class SelectWithSearch extends Component {
    static propTypes = {
        isSelectOption: PropTypes.bool
    };
    static defaultProps = {
        isSelectOption: false
    };

    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef();
        this.state = {
            selectFormStatus: '',
            selectedItem: {
                id: this.props.value,
                name: this.props.value === 0 ? 'N/A' : this.getLabel(this.props.options, this.props.value)
            },
            options: this.props.options,
            filter: '',
            isHideNA: this.props.isHideNA,
            isSelectOption: this.props.isSelectOption,
            collapsedAll: true
        };
    }

    componentDidMount() {
        document.addEventListener('click', this.clickHandler);
    }

    componentDidUpdate(prevProps) {
        if (this.props.value !== prevProps.value) {
            this.setState({
                selectedItem: {
                    id: this.props.value,
                    name: this.props.value === 0 ? 'N/A' : this.getLabel(this.props.options, this.props.value)
                }
            });
        }
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.clickHandler);
    }

    getLabel = (countries, countryId) => {
        const label = this.getLabelRecursive(countries, countryId);
        return label !== undefined ? label : (this.props.name || '');
    }

    getLabelRecursive = (countries, countryId) => {
        for (const country of countries) {
            if (country.id === countryId) {
                return country.name;
            }
        }
    }

    toggleSelect = () => {
        if (this.state.selectFormStatus === 'open') {
            this.setState({
                selectFormStatus: ''
            });
        } else {
            this.setState({
                selectFormStatus: 'open'
            });
        }
    };

    selectItem = item => {
        this.setState({
            selectFormStatus: '',
            selectedItem: {
                id: item.id,
                name: item.name
            }
        });
        this.props.OnChangeValue(item, this.props.index);
    };

    handleChangeSearchInput = event => {
        const value = event.target.value;

        const options = this.props.options.filter(country => country.name.toLowerCase().includes(value.toLowerCase()));

        this.setState({
            options,
            filter: value
        });
    };

    clearSearchBox = () => {
        this.setState({
            filter: '',
            options: this.props.options
        });
    };

    refreshViewValue = () => {
        const item = {
            id: 0,
            name: this.state.isSelectOption ? '-- Select --' : 'N/A'
        };
        this.setState({
            selectFormStatus: '',
            selectedItem: item
        });
        this.props.OnChangeValue(item);
    };

    toggleCollapseExpanse = () => {
        this.setState({
            collapsedAll: !this.state.collapsedAll
        });
    };

    clickHandler = event => {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            this.setState({
                selectFormStatus: ''
            });
        }
    };

    render() {
        const { options } = this.state;

        return (
            <div className={'dropdown selectwithsearchtree ' + this.state.selectFormStatus} ref={this.wrapperRef}>
                <button type="button" className="btn" onClick={this.toggleSelect}>
                    <span className="pull-left">{`${this.state.selectedItem.name}`}</span><i className="fa fa-chevron-down pull-right" />
                </button>
                <ul className="dropdown-menu" style={{ "width": `${this.props.maxWidth}` }}>
                    <li>
                        <div>
                            <Form.Control type="text" size="sm" className="filter shadow-none" name="filter"
                                placeholder={LangHelper.getResource('Search')}
                                onChange={this.handleChangeSearchInput}
                                value={this.state.filter}
                            />
                            <span className="searchclear fa fa-times" onClick={this.clearSearchBox}></span>
                        </div>
                    </li>
                    <li>
                        <div className="tree">
                            <ul>
                                {
                                    !this.state.isHideNA &&
                                    <li>
                                        <a onClick={this.refreshViewValue}>
                                            <span>N/A</span>
                                        </a>
                                    </li>
                                }
                                {
                                    this.state.isSelectOption &&
                                    <li>
                                        <a onClick={this.refreshViewValue}>
                                            <span>-- Select --</span>
                                        </a>
                                    </li>
                                }
                                {
                                    options.map((item, index) => {
                                        return (
                                            <li className='list-parent' key={index + item.name}>
                                                <a className='list-child' onClick={() => this.selectItem(item)}>
                                                    <span>{item.name}</span>
                                                </a>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
}