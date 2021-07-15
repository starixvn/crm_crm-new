import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import LangHelper from '@jsroot/common/langHelper';

export default class SelectWithSearch extends Component {
    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef();
        this.state = {
            selectFormStatus: '',
            selectedItem: {
                id: this.props.value,
                name: this.props.name || "N/A"
            },
            options: this.props.options,
            filter: '',
            isHideNA: this.props.isHideNA,
            collapsedAll: true
        }
    }

    componentDidMount() {
        document.addEventListener('click', this.clickHandler);
    }

    componentDidUpdate(prevProps) {
        if (this.props.name != prevProps.name) {
            this.setState({
                selectedItem: {
                    id: this.props.value,
                    name: this.props.name
                },
            })
        }
    }

    componentWillUnmount() {
        // important
        document.removeEventListener('click', this.clickHandler);
    }

    toggleSelect = () => {
        if (this.state.selectFormStatus === "open") {
            this.setState({
                selectFormStatus: ""
            });
        } else {
            this.setState({
                selectFormStatus: "open"
            });
        }
    }

    selectItem = item => {
        this.setState({
            selectFormStatus: '',
            selectedItem: {
                id: item.id,
                name: item.name
            }
        });
        this.props.OnChangeValue(item);
    }

    handleChangeSearchInput = event => {
        const value = event.target.value;
        const options = this.props.options;

        var result = options.map(function (item) {
            var sites = item.childSites.filter(function (site) {
                return site.name.toLowerCase().includes(value.toLowerCase())
            });
            return { name: item.name, id: item.id, childSites: sites }
        });
        this.setState({
            options: result,
            filter: value
        });
    }

    clearSearchBox = () => {
        this.setState({
            filter: '',
            options: this.props.options
        });
    }

    refreshViewValue = () => {
        var item = {
            id: 0,
            name: "N/A"
        }
        this.setState({
            selectFormStatus: '',
            selectedItem: item
        });
        this.props.OnChangeValue(item);
    }

    toggleCollapseExpanse = () => {
        this.setState({
            collapsedAll: !this.state.collapsedAll
        })
    }

    clickHandler = event => {
        const { target } = event
        if (this.wrapperRef && !this.wrapperRef.current.contains(target)) {
            this.setState({
                selectFormStatus: ''
            });
        }
    }

    render() {
        const { options } = this.state

        return (
            <div className={'dropdown selectwithsearchtree ' + this.state.selectFormStatus} ref={this.wrapperRef}>
                <button type="button" className="btn" onClick={this.toggleSelect}>
                    <span className="pull-left">{this.state.selectedItem.name}</span><span className="fa fa-caret-down pull-right" />
                </button>
                <ul className="dropdown-menu" >
                    <li>
                        <div>
                            <Form.Control type="text" size="sm" className="filter shadow-none" name="filter"
                                placeholder={LangHelper.getResource('Search')}
                                onChange={this.handleChangeSearchInput}
                                value={this.state.filter} />
                            <span className="searchclear fa fa-times" onClick={() => this.clearSearchBox()}></span>
                        </div>
                    </li>
                    <li className="toolbar">
                        <div className="input-group input-group-sm">
                            <a>
                                &nbsp;
                            </a><span className="input-group-btn" >
                                <span onClick={() => this.toggleCollapseExpanse()}
                                    className={this.state.collapsedAll ? "fa fa-upload" : "fa fa-download"}></span>
                            </span>
                        </div>
                    </li>
                    <li className="divider"></li>
                    <li>
                        <div className="tree">
                            <ul>
                                {!this.state.isHideNA ?
                                    <li>
                                        <a onClick={this.refreshViewValue}>
                                            <span className="group-text">N/A</span>
                                        </a>
                                    </li>
                                    : null}

                                {options.map((item, index) => {
                                    if (item.childSites.length > 0)
                                        return (
                                            <li className="parent" key={index}>
                                                <a>
                                                    <span className="group-text">{item.name}</span>
                                                </a>
                                                <ul className="list-unstyled">
                                                    {this.state.collapsedAll &&
                                                        item.childSites.map((item1, index1) => {
                                                            return (
                                                                <li key={index1}>
                                                                    <a onClick={() => this.selectItem(item1)}>
                                                                        <span>{item1.name}</span>
                                                                    </a>
                                                                </li>
                                                            )
                                                        })
                                                    }
                                                </ul>
                                            </li>
                                        )
                                })}
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        )
    }
}