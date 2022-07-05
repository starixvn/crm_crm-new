import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Option from './Option';

export default class MultipleSelectOptionList extends Component {
    static propTypes = {
        dataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        onChange: PropTypes.func,
        isAllExpand: PropTypes.bool,
        isCheckedNA:  PropTypes.bool
    };

    constructor(props) {
        super(props);
    }

    isUnCheckAllSubItem = item =>{
        let countFalse = 0;
        item.subItem.map(subItem => {
            if(!subItem.checked){
                countFalse++;
            }
        });
        if(countFalse === item.subItem.length){
            return true;
        }
        return false;
    };

    isUnCheckAll = dataSource => {
        let countFalse = 0;
        let countNA = 0;
        let indexNa = 0;
        dataSource.map((item, index) => {
            if(!item.checked && this.isUnCheckAllSubItem(item)){
                countFalse++;
            }
            if(item.value === 'N/A'){
                countNA++;
                indexNa = index;
            }
        });
        if(countFalse === dataSource.length && countNA > 0 ){
            dataSource[indexNa].checked = true;
        }
    };

    _renderOptionList() {
        const { dataSource, onChange, onChangeSub, id, isAllExpand, isCheckedNA } = this.props;
        if (!dataSource || !dataSource.length) {
            return <span>No information</span>;
        }

        isCheckedNA && this.isUnCheckAll(dataSource);

        const optionList = dataSource.map((item, index) => {
            return item.visible && (
                <Option
                    id={`${id}-optionItem-${index}`}
                    key={`${id}optionItem${index}`}
                    itemData={item}
                    onChange={onChange}
                    onChangeSub={onChangeSub}
                    isAllExpand={isAllExpand}
                />
            );
        });

        return optionList;
    }

    _calculateMinHeightOptionList = maxLengthOfSubData => {
        let minHeight = 0;
        if (maxLengthOfSubData && maxLengthOfSubData > 0 && maxLengthOfSubData < 5) {
            minHeight = maxLengthOfSubData * 40;
        }

        if (maxLengthOfSubData > 5) {
            minHeight = 150;
        }

        return minHeight;
    };

    render() {
        const dataSource = this.props.dataSource;
        const maxLengthOfSubData = dataSource.length > 0 ? Math.max(...dataSource.filter(item => item.subData !== null).map(i => i.subData.length)) : 0;
        const minHeight = this._calculateMinHeightOptionList(maxLengthOfSubData);
        return (
            <ul className="multiple-select-options" style={{ minHeight: minHeight }}>
                {this._renderOptionList()}
            </ul>
        );
    }
}