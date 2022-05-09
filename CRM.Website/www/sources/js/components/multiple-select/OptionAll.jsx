import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Option from './Option';
import { DEFAULT_CHECKED} from './constants';

export default class OptionAll extends Component {
    static propTypes = {
        onChange: PropTypes.func,
        id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
        checked: PropTypes.bool,
        textOptions: PropTypes.object,
        isAllToggle: PropTypes.bool,
        onAllToggle: PropTypes.func
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
        this.state = {
            isAllExpand: true
        };
    }

    changeHandler = ({ checked }) => {
        this.props.onChange && this.props.onChange(checked);
    };

    toggleAll = () => {
        const { onAllToggle } = this.props;
        this.setState(prevState => ({
            isAllExpand: !prevState.isAllExpand
        }));
        if (onAllToggle) {
            onAllToggle();
        }
    };

    render() {
        const { id, checked, isAllToggle } = this.props;
        this.itemData.checked = checked;

        return (
            <ul className="multiple-select-options multiple-select-option-all">
                <Option
                    id={`${id}-optionItemAll`}
                    itemData={this.itemData}
                    onChange={this.changeHandler}
                />
                {
                    isAllToggle && <li className={`icon-toggle-all ${this.state.isAllExpand ? 'expand-all' : 'collapse-all'}`} onClick={this.toggleAll}/>
                }
            </ul>
        );
    }
}