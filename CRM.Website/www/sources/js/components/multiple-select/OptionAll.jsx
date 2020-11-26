import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Option from './Option';
import { DEFAULT_CHECKED} from './constants';

export default class OptionAll extends Component {
    static propTypes = {
        onChange: PropTypes.func,
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        checked: PropTypes.bool,
        textOptions: PropTypes.object
    };

    static defaultProps = {
        checked: DEFAULT_CHECKED
    };

    constructor(props) {
        super(props);

        this.itemData = {
            key: 'All',
            value: this.props.textOptions['Texts']
        };
    }

    changeHandler = ({ checked }) => {
        this.props.onChange && this.props.onChange(checked);
    };

    render() {
        const { id, checked } = this.props;
        this.itemData.checked = checked;

        return (
            <ul className="multiple-select-options multiple-select-option-all">
                <Option
                    id={`${id}-optionItemAll`}
                    itemData={this.itemData}
                    onChange={this.changeHandler}
                />
            </ul>
        );
    }
}