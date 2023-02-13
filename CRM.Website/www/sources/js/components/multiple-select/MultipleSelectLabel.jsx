import React, { Component } from 'react';
import PropTypes, { element } from 'prop-types';
import { MAX_SELECTED_ITEM_FOR_DISPLAY } from './constants';

export default class MultipleSelectLabel extends Component {
    static propTypes = {
        textOptions: PropTypes.object,
        selectedItems: PropTypes.arrayOf(PropTypes.object).isRequired,
        maxDisplayItemCount: PropTypes.number,
        isNAOption: PropTypes.bool
    };

    static defaultProps = {
        maxDisplayItemCount: MAX_SELECTED_ITEM_FOR_DISPLAY,
        isNAOption: false
    };

    constructor(props) {
        super(props);
    }

    handleSelectedItem = selectedItems => {
        const selected = [];
        selectedItems.forEach(item => {
            if (item.subItem.length > 0) {
                item.subItem.forEach(element => {
                    if (element.childList && element.childList.length > 0) {
                        element.childList.forEach(data => {
                            if (data.checked) {
                                selected.push(data.value);
                            }
                        })
                    } else {
                        if (element.checked) {
                            selected.push(element.value);
                        }
                    }
                });
            } else {
                selected.push(item.value);
            }
        });
        return selected;
    };

    get selectedItemsString() {
        const { isAllTextShown, selectedItems, maxDisplayItemCount, textOptions, dataSourceSize, isNAOption } = this.props;
        const selectedValues = this.handleSelectedItem(selectedItems);
        let displayText = textOptions['SelectOptions'];
        const selectedItemCount = selectedValues.length;
        const isOnlyNA = selectedValues.filter(x=> x === textOptions['NA']).length > 0;

        if (!isOnlyNA && isAllTextShown && selectedItemCount === dataSourceSize) {
            displayText = textOptions['Texts'];
        } else if (selectedItemCount > maxDisplayItemCount) {
            displayText = textOptions['SelectedItemCount'].replace('#', selectedItemCount);
        } else if (selectedItemCount >= 1) {
            displayText = selectedValues.join(', ');
        } else if (!dataSourceSize && !isNAOption) {
            displayText = textOptions['NoData'];
        } else if ((isNAOption && selectedItemCount === 0) || isOnlyNA ) {
            displayText = textOptions['NA'];
        }

        return displayText;
    }

    render() {
        return (
            <button type='button' disabled={this.props.isDisable} className='multiple-select-default multiple-select-label'
                onClick={this.props.onToggle}
            >
                <span className='text-display'>{this.selectedItemsString}</span>
                <b className='caret' />
            </button>
        );
    }
}