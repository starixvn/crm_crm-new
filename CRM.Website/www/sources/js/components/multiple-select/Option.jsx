import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Option extends Component {
    static propTypes = {
        itemData: PropTypes.object.isRequired,
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        onChange: PropTypes.func,
        isAllExpand: PropTypes.bool
    };

    constructor(props) {
        super(props);

        this.state = {
            isExpandedSubData: true,
            isExpandedSubItem: true
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.isAllExpand !== prevProps.isAllExpand) {
            this.setState({
                isExpandedSubItem: this.props.isAllExpand
            });
        }
    };

    onChange = event => {
        event.stopPropagation();

        const { itemData, onChange } = this.props;

        const newItemData = {
            key: itemData.key,
            value: itemData.value,
            checked: !itemData.checked
        };
        onChange && onChange(newItemData);
    };

    onChangeSubItem = subItem => {
        const { itemData, onChangeSub } = this.props;

        const newSubItem = {
            key: subItem.key,
            value: subItem.value,
            checked: !subItem.checked
        };
        onChangeSub && onChangeSub(itemData, newSubItem);
    };

    onClickExpandIcon = () => {
        this.setState(prevState => ({
            isExpandedSubData: !prevState.isExpandedSubData
        }));
    };

    toggleItem = () => {
        this.setState(prevState => ({
            isExpandedSubItem: !prevState.isExpandedSubItem
        }));
    };

    renderSubData = subDataList => {
        return (
            <ul className='sub-data'>
                {
                    this.state.isExpandedSubData &&
                    subDataList.map((item, key) => <li key={`sub-${key}`}>{item}</li>)
                }
            </ul>
        );
    };

    renderSubItem = subItemList => {
        return (
            this.state.isExpandedSubItem && <div className='sub-select'>
                {
                    subItemList.map((item, key) => (
                        <div key={key} className='sub-select-item'>
                            <input
                                id={item.key}
                                type="checkbox"
                                className="option-checkbox"
                                checked={item.checked}
                                onChange={() => this.onChangeSubItem(item)}
                            />
                            <label className="sub-select-item-label" htmlFor={item.key}>{item.value}</label>
                        </div>
                    ))
                }
            </div>
        );
    };

    render() {
        const { itemData, id } = this.props;
        const isHasSubData = itemData.subData && itemData.subData.length > 0;
        const isHasSubItem = itemData.subItem && itemData.subItem.length > 0;
        return (
            <div>
                <li className={`${isHasSubItem ? 'toggle-select-item' : ''} multiple-select-item`}>
                    {
                        isHasSubItem &&
                        <span className={`caret-item fa ${this.state.isExpandedSubItem ? 'fa-caret-down' : 'fa-caret-right'}`} onClick={this.toggleItem}/>
                    }
                    <input
                        id={id}
                        type="checkbox"
                        className="option-checkbox"
                        checked={itemData.checked}
                        onChange={this.onChange}
                    />
                    <label className="option-label" htmlFor={id}>
                        {itemData.value}
                    </label>
                    {
                        isHasSubData &&
                        <span className={`expand-icon fa ${this.state.isExpandedSubData ? 'fa-caret-down' : 'fa-caret-right'}`} onClick={this.onClickExpandIcon} />
                    }
                    {
                        isHasSubData &&
                        this.renderSubData(itemData.subData)
                    }
                </li>
                {
                    isHasSubItem &&
                    this.renderSubItem(itemData.subItem)
                }
            </div>
        );
    }
}