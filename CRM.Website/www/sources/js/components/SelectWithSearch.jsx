import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { getSiteLabel } from '@jsroot/common/shareScripts';
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
                name: this.props.name || (this.props.value === 0 ? 'N/A' : this.getLabel(this.props.options, this.props.value))
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
                    name: this.props.name || (this.props.value === 0 ? 'N/A' : this.getLabel(this.props.options, this.props.value))
                }
            });
        }
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.clickHandler);
    }

    getLabel = (sites, siteId) => {
        const label = this.getLabelRecursive(sites, siteId);
        return label !== undefined ? label : '';
    }

    getLabelRecursive = (sites, siteId) => {
        for (const site of sites) {
            if (site.id === siteId) {
                return site.name;
            }

            if (site.childSites != null && site.childSites.length > 0) {
                const label = this.getLabelRecursive(site.childSites, siteId);
                if (label !== undefined) {
                    return label;
                }
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
        this.props.OnChangeValue(item);
    };

    handleChangeSearchInput = event => {
        const value = event.target.value;

        const options = this.props.options.map(item => {
            const layer2 = item.childSites.filter(site => site.name.toLowerCase().includes(value.toLowerCase()));

            if (layer2.length === 0) {
                const newLayer2 = item.childSites;

                if (newLayer2 && newLayer2.length > 0) {
                    const child = newLayer2.map(element => {
                        if (element.childSites && element.childSites.length > 0) {
                            const layer3 = element.childSites.filter(site => site.name.toLowerCase().includes(value.toLowerCase()));
                            return { name: element.name, id: element.id, childSites: layer3 };
                        } else return { name: element.name, id: element.id, childSites: [] };
                    });
                    return { name: item.name, id: item.id, childSites: child.filter(item => item.childSites.length > 0) };
                } else {
                    return { name: item.name, id: item.id, childSites: [] };
                }
            } else return { name: item.name, id: item.id, childSites: layer2 };
        });

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
        const siteLabel = getSiteLabel(options, this.state.selectedItem.id);

        return (
            <div className={'dropdown selectwithsearchtree ' + this.state.selectFormStatus} ref={this.wrapperRef}>
                <button type="button" className="btn" onClick={this.toggleSelect}>
                    <span className="pull-left">{`${this.state.selectedItem.name} ${siteLabel && `(${siteLabel})`}`}</span><span className="fa fa-caret-down pull-right" />
                </button>
                <ul className="dropdown-menu" style={{"width": `${this.props.maxWidth}`}}>
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
                    <li className="toolbar">
                        <div className="input-group input-group-sm">
                            <a>&nbsp;</a>
                            <span className="input-group-btn" >
                                <span onClick={this.toggleCollapseExpanse}
                                    className={this.state.collapsedAll ? 'fa fa-upload' : 'fa fa-download'}></span>
                            </span>
                        </div>
                    </li>
                    <li className="divider"></li>
                    <li>
                        <div className="tree">
                            <ul>
                                {
                                    !this.state.isHideNA &&
                                    <li>
                                        <a onClick={this.refreshViewValue}>
                                            <span className="group-text">N/A</span>
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
                                        if (item.childSites.length === 0) {
                                            return null;
                                        }

                                        return (
                                            <li className="parent" key={item.name + index}>
                                                <a>
                                                    <span className="group-text">{item.name}</span>
                                                </a>
                                                <ul className="list-unstyled">
                                                    {
                                                        this.state.collapsedAll &&
                                                        item.childSites.map((item1, index1) => {
                                                            return (
                                                                <li className={`${!item1.childSites && 'list-parent'}`} key={index1 + item1.name}>
                                                                    <a className={`${!item1.childSites && 'list-child'}`} onClick={() => !item1.childSites && this.selectItem(item1)}>
                                                                        <span>{item1.name}</span>
                                                                    </a>
                                                                    {
                                                                        item1.childSites && item1.childSites.length > 0 &&
                                                                        (
                                                                            <ul className="list-unstyled">
                                                                                {
                                                                                    item1.childSites.map((item2, index2) => {
                                                                                        return (
                                                                                            <li className='list-parent' key={index2 + item2.name}>
                                                                                                <a className='list-child' onClick={() => this.selectItem(item2)}>
                                                                                                    <span>{item2.name}</span>
                                                                                                </a>
                                                                                            </li>
                                                                                        )
                                                                                    })
                                                                                }
                                                                            </ul>
                                                                        )
                                                                    }
                                                                </li>
                                                            );
                                                        })
                                                    }
                                                </ul>
                                            </li>
                                        );
                                    })}
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
}