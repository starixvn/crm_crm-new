import React from 'react';
import OptionAll from '../OptionAll';
import Option from '../Option';
import Translation from '../translation';
import { shallow } from 'enzyme';

describe('OptionAll', () => {
    it('should have correct snapshots', () => {
        // Action
        const optionAll = shallow(<OptionAll />);

        // Assert
        expect(optionAll).toMatchSnapshot();
    });

    it('changeHandler should run correctly', () => {
        // Arrange
        const checked = true;
        const props = {
            onChange: jest.fn()
        };

        const optionAll = shallow(<OptionAll {...props} />);

        // Action
        optionAll.instance().changeHandler({ checked });

        // Assert
        expect(props.onChange).toHaveBeenCalledWith(checked);
    });

    it('render should return correct components', () => {
        // Arrange
        const props = {
            id: 'id',
            checked: true
        };

        const changeHandler = jest.fn();
        const optionAll = shallow(<OptionAll {...props} />);
        optionAll.instance().changeHandler = changeHandler;
        
        // Action
        var result = shallow(optionAll.instance().render());

        // Assert
        expect(result.props().className).toBe('multiple-select-options multiple-select-option-all');
        expect(result.find(Option).props().id).toBe('id-optionItemAll');
        expect(result.find(Option).props().itemData).toEqual({
            key: 'All',
            value: Translation['en-US'].All,
            checked: props.checked
        });
        expect(result.find(Option).props().onChange).toEqual(changeHandler);
    });
});