import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MAX_SELECTED_ITEM_FOR_DISPLAY } from './constants';


export default class MultipleSelectLabel extends Component {
    static propTypes = {
        textOptions: PropTypes.object,
        selectedItems: PropTypes.arrayOf(PropTypes.object).isRequired,
        maxDisplayItemCount: PropTypes.number
    };

    static defaultProps = {
        maxDisplayItemCount: MAX_SELECTED_ITEM_FOR_DISPLAY
    };

    constructor(props) {
        super(props);
    }

    get selectedItemsString() {
        const { selectedItems, maxDisplayItemCount, textOptions } = this.props;
        const selectedValues = selectedItems.map(item => item.value);

        let displayText = textOptions['SelectOptions'];
        const selectedItemCount = selectedValues.length;

        if (this.props.isAllTextShown && selectedItemCount === this.props.dataSourceSize) {
            displayText = textOptions['Texts'];
        } else if (selectedItemCount > maxDisplayItemCount) {
            displayText = textOptions['SelectedItemCount'].replace('#', selectedItemCount);
        } else if (selectedItemCount >= 1) {
            displayText = selectedValues.join(', ');
        } else if(!this.props.dataSourceSize){
            displayText = textOptions['NoData'];
        }

        return displayText;
    }

    render() {
        return (
            <button type='button' disabled = {this.props.isDisable} className='multiple-select-default multiple-select-label'
                onClick={this.props.onToggle}
            >
                <span className='text-display'>{this.selectedItemsString}</span>
                <b className='caret' />
            </button>
        );
    }
}