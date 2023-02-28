import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MultipleSelectLabel from './MultipleSelectLabel';
import MultipleSelectOptionList from './MultipleSelectOptionList';
import OptionAll from './OptionAll';
import { KEY_NAME, VALUE_NAME, STATUS_NAME } from './constants';
import { MULTI_SELECT_TEXT_OPTIONS } from '@jsroot/common/constants';
import functions from './functions';

let id = 1;

export default class MultipleSelect extends Component {
    static propTypes = {
        dataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
        hasAllOption: PropTypes.bool,
        hasSearchBox: PropTypes.bool,
        isAllTextShown: PropTypes.bool,
        keyField: PropTypes.string,
        textOptions: PropTypes.object,
        maxDisplayItemCount: PropTypes.number,
        onChange: PropTypes.func,
        statusField: PropTypes.string,
        texts: PropTypes.object,
        valueField: PropTypes.string,
        isDisable: PropTypes.bool,
        isNAOption: PropTypes.bool,
        isAllToggle: PropTypes.bool,
        isCheckedNA: PropTypes.bool
    };

    static defaultProps = {
        keyField: KEY_NAME,
        valueField: VALUE_NAME,
        statusField: STATUS_NAME,
        hasAllOption: true,
        hasSearchBox: false,
        isDisable: false,
        textOptions: MULTI_SELECT_TEXT_OPTIONS,
        isNAOption: false,
        isAllToggle: false,
        isCheckedNA: false
    };

    constructor(props) {
        super(props);
        this.searchInputBox = null;

        this.state = {
            originalDataSource: null,
            searchText: '',
            showOptionList: false,
            dataSource: [],
            isAllExpand: true
        };

        if (!props.id) {
            id += 1;
        }

        this.id = `multiple-select-${props.id || id}`;
    }

    static getDerivedStateFromProps(props, state) {
        if (props.dataSource !== state.originalDataSource) {
            return {
                originalDataSource: props.dataSource,
                dataSource: functions.convertDataSourceToState(props)
            };
        }

        return null;
    }

    componentDidMount() {
        document.addEventListener('click', this._handleDocumentClick);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this._handleDocumentClick);
    }

    get selectedItems() {
        return this.state.dataSource.filter(item => item.subItem.length <= 0 ? item.checked : true);
    }

    getFieldItem = item => {
        const { keyField, valueField, statusField } = this.props;

        return {
            [keyField]: item.key,
            [valueField]: item.value,
            [statusField]: item.checked
        };
    };

    onChangeHandler = item => {
        const selectedItem = this.getFieldItem(item);

        const newDataSource = JSON.parse(JSON.stringify(this.state.dataSource));
        const itemToUpdate = newDataSource.find(x => x.key === item.key);
        itemToUpdate.checked = item.checked;

        if (itemToUpdate.subItem.length > 0) {
            itemToUpdate.subItem.map(element => {
                if (element.childList && element.childList.length > 0) {
                    element.childList.map(data => data.checked = item.checked);
                }
                return element.checked = item.checked;
            });
        }

        this._callBackToParent(selectedItem, newDataSource);

        this.setState({ dataSource: newDataSource });
    };

    checkParentItem = (item, subList) => {
        if (subList.some(x => x.checked === false)) {
            item.checked = false;
        }
        if (subList.every(x => x.checked === true)) {
            item.checked = true;
        }
    };

    onChangeSubHandler = (parentItem, subItem) => {
        const selectedItem = this.getFieldItem(subItem);

        const newDataSource = JSON.parse(JSON.stringify(this.state.dataSource));
        const itemToUpdate = newDataSource.find(x => x.key === parentItem.key);
        const subItemToUpdate = itemToUpdate.subItem.find(x => x.key === subItem.key);
        subItemToUpdate.checked = subItem.checked;

        if (subItemToUpdate.childList && subItemToUpdate.childList.length > 0) {
            subItemToUpdate.childList.map(x => x.checked = subItem.checked);
        }

        this.checkParentItem(itemToUpdate, itemToUpdate.subItem);
        this._callBackToParent(selectedItem, newDataSource);
        this.setState({ dataSource: newDataSource });
    };

    onChangeChildHandler = (parentItem, subItem, childItem) => {
        const selectedItem = this.getFieldItem(childItem);

        const newDataSource = JSON.parse(JSON.stringify(this.state.dataSource));
        const itemToUpdate = newDataSource.find(x => x.key === parentItem.key);
        const subItemToUpdate = itemToUpdate.subItem.find(x => x.key === subItem.key);

        const childItemToUpdate = subItemToUpdate.childList.find(x => x.key === childItem.key);
        childItemToUpdate.checked = childItem.checked;

        this.checkParentItem(subItemToUpdate, subItemToUpdate.childList);
        this.checkParentItem(itemToUpdate, itemToUpdate.subItem);
        this._callBackToParent(selectedItem, newDataSource);

        this.setState({ dataSource: newDataSource });
    };

    onToggle = () => {
        if (!this.props.isDisable) {
          this.setState(
            prevState => {
              return {
                showOptionList: !prevState.showOptionList
              };
            },
            () => {
              if (this.searchInputBox && this.state.showOptionList) {
                this.searchInputBox.focus();
              }
            }
          );
        }
    };

    checkAllHandler = checked => {
        const dataSource = this.state.dataSource.slice(0);
        dataSource.forEach(item => {
            item.checked = checked;

            if (item.subItem.length > 0) {
                item.subItem.map(element => {
                    if (element.childList && element.childList.length > 0) {
                        element.childList.map(data => data.checked = checked);
                    }
                    return element.checked = checked;
                });
            }
        });
        this.setState({
            dataSource: dataSource
        }, () => {
            this._callBackToParent(null, dataSource);
        });
    };

    onChangeSearchText = value => {
        this.setState(() => {
            const dataSource = this.state.dataSource.slice(0);

            if (value.length > 1) {
                dataSource.forEach(item => item.visible = !item[VALUE_NAME] ? false : item[VALUE_NAME].toLowerCase().indexOf(value.toLowerCase()) !== -1);
            } else {
                dataSource.forEach(item => item.visible = true);
            }
            return {
                searchText: value,
                dataSource: dataSource
            };
        });
    };

    onClearSearch = e => {
        e.preventDefault();
        this.onChangeSearchText('');
    };

    onAllToggle = () => {
        this.setState(previousState => ({
            isAllExpand: !previousState.isAllExpand
        }));
    };

    _callBackToParent(selectedItem, dataSource) {
        const selectedItemsKey = this._getSelectedItemKey(dataSource);
        this.props.onChange && this.props.onChange(selectedItem, selectedItemsKey);
    }

    _getSelectedItemKey(dataSource) {
        const selectedItemKey = [];

        for (let i = 0; i < dataSource.length; i++) {
            const item = dataSource[i];

            if (item.subItem.length > 0) {
                item.subItem.forEach(element => {
                    if (element.childList && element.childList.length > 0) {
                        element.childList.forEach(data => {
                            if (data.checked) {
                                selectedItemKey.push(data.key);
                            }
                        });
                    } else {
                        if (element.checked) {
                            selectedItemKey.push(element.key);
                        }
                    }
                });
            } else {
                if (item.checked) {
                    selectedItemKey.push(item.key);
                }
            }
        }

        return selectedItemKey.join(',');
    }

    _close = () => {
        this.setState({ showOptionList: false });
    };

    _handleDocumentClick = event => {
        const clickOutside = this.wrapper && !this.wrapper.contains(event.target);
        if (clickOutside && this.state.showOptionList) {
            this._close();
        }
    };

    _renderOptionAll() {
        if (this.props.hasAllOption && this.props.dataSource.length > 0) {
            const checkedItemCount = this.state.dataSource.filter(x => x.checked).length;
            const checkedAll = checkedItemCount === this.state.dataSource.length;
            return (
                <OptionAll id={this.id} checked={checkedAll} textOptions={this.props.textOptions}
                    isAllToggle={this.props.isAllToggle} onAllToggle={this.onAllToggle} onChange={this.checkAllHandler} />
            );
        }

        return null;
    }

    _renderSearchBox() {
        if (!this.props.hasSearchBox || this.props.dataSource.length === 0) {
            return null;
        }

        const clearButtonStyle = {
            position: 'absolute',
            right: '5px',
            width: '20px',
            height: '20px',
            border: 0,
            margin: '5px',
            backgroundColor: 'transparent',
            cursor: 'pointer'
        };

        return (<div style={{ width: '100%' }}>
            <input autoFocus onChange={e => this.onChangeSearchText(e.target.value)}
                ref={element => this.searchInputBox = element}
                value={this.state.searchText} type='text' placeholder='Search'
                style={{
                    width: '100%', border: '1px solid #ccc', padding: '5px 10px',
                    boxSizing: 'border-box'
                }}
            />
            <button onClick={this.onClearSearch} style={clearButtonStyle}>X</button>
        </div>);
    }

    getLengthDataSource = () => {
        let count = 0;
        this.state.dataSource.forEach(item => {
            if (item.subItem.length > 0) {
                count += item.subItem.length;
                item.subItem.forEach(element => {
                    if (element.childList && element.childList.length > 0) {
                        count += element.childList.length;
                    }
                })
            } else {
                count += 1;
            }
        });
        return count;
    };

    render() {
        const { maxDisplayItemCount } = this.props;

        return (
            <div className={`multiple-select-container ${this.props.isInvalid ? 'invalid' : ''}`}
                id={this.id} ref={element => this.wrapper = element}
            >
                <MultipleSelectLabel
                    textOptions={this.props.textOptions}
                    selectedItems={this.selectedItems}
                    dataSourceSize={this.getLengthDataSource()}
                    onToggle={this.onToggle}
                    texts={this.props.texts}
                    isAllTextShown={this.props.isAllTextShown}
                    maxDisplayItemCount={maxDisplayItemCount}
                    isDisable = {this.props.isDisable}
                    isNAOption = {this.props.isNAOption}
                />
                <div className='multiple-select-default multiple-select-options-container'
                    style={{ display: this.state.showOptionList ? 'block' : 'none' }}
                >
                    {this._renderSearchBox()}
                    {this._renderOptionAll()}
                    <MultipleSelectOptionList id={this.id}
                        dataSource={this.state.dataSource}
                        onChange={this.onChangeHandler}
                        onChangeSub={this.onChangeSubHandler}
                        onChangeChild={this.onChangeChildHandler}
                        isAllExpand={this.state.isAllExpand}
                        isCheckedNA={this.props.isCheckedNA}
                    />
                </div>
            </div>
        );
    }
}