import React, { Component, Fragment } from 'react';
import LangHelper from '@jsroot/common/langHelper';

export default class SelectWithSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectFormStatus: '',
            selectedItem: {
                id: this.props.value,
                name: this.props.name || "N/A"
            },
            options: this.props.options,
            filter: '',
            isHideNA: this.props.isHideNA
        }
    }

    toggleSelect = () => {
        if(this.state.selectFormStatus === "open") {
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
       
        var result = options.map(function(item) {
            var sites =  item.childSites.filter(function(site) {
                return site.name.toLowerCase().includes(value.toLowerCase())
            });
            return {name: item.name, id: item.id, childSites: sites}
        });
        this.setState({
            options: result,
            filter: value
        });
    }

    clearSearchBox = (event) => {
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

    render() {
        const {options} = this.state
        return (
            <div className={'dropdown selectwithsearchtree ' + this.state.selectFormStatus }>
                <button type="button" className="btn" onClick={this.toggleSelect} >
                    <span className="pull-left">{this.state.selectedItem.name}</span> <span className="fa fa-caret-down pull-right">
                    </span>
                </button>
                <ul data-ng-if="items.length > 0" className="dropdown-menu" >
                    <li >
                        <div>
                            <input type="text" className="filter" name="filter" 
                            placeholder={LangHelper.getResource('Search')} 
                            onChange={this.handleChangeSearchInput} 
                            value={this.state.filter}/>
                            <span className="searchclear glyphicon fa fa-times"  onClick={this.clearSearchBox} ></span>
                        </div>
                    </li>
                    <li data-ng-if="_settings.hasToolbar" className="toolbar">
                        <div className="input-group input-group-sm">
                            <a data-ng-click="toggleCheckAll()">
                                &nbsp;
                            </a><span className="input-group-btn" >
                                <span data-ng-click="toggleCollapseExpanse();" title="{{_textSettings.CollapseExpanse}}"
                                    className="glyphicon fa fa-search" ></span>
                            </span>
                        </div>
                    </li>
                    <li className="divider"></li>
                    <li>
                        <div className="tree">
                            <ul>
                                { !this.state.isHideNA ? 
                                    <li>
                                    <a onClick={this.refreshViewValue} data-ng-click="checkNA();">
                                        <span className="group-text">N/A</span>
                                    </a>
                                    </li>
                                : null }
                                
                                { options.map((item, index) => {
                                    if(item.childSites.length > 0)
                                    return(
                                        <li key={index}>
                                            <a data-ng-attr-id="item-{{item1.id}}">
                                                <span className="group-text">{ item.name }</span>
                                            </a>
                                            <ul className="list-unstyled">
                                                { item.childSites.map((item1, index1) => {
                                                    return (
                                                        <li key={index1}>
                                                            <a onClick={() => this.selectItem(item1)}>
                                                                <span>{item1.name}</span>
                                                            </a>   
                                                        </li>
                                                    )
                                                })}
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