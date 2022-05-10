import React from 'react';
import OptionAll from '../OptionAll';
import Option from '../Option';
import { shallow } from 'enzyme';

describe('OptionAll', () => {
    it('should have correct snapshots', () => {
        // Arrange
        const props = {
            textOptions: {
                Texts: 'Texts'
            }
        };

        // Action
        const optionAll = shallow(<OptionAll {...props} />);

        // Assert
        expect(optionAll).toMatchSnapshot();
    });

    it('toggleAll should call exactly props function', () => {
        // Arrange
        const props = {
            textOptions: {
                Texts: 'Texts'
            },
            onAllToggle: jest.fn()
        };
        const prevState = { isAllExpand: true };

        // Action
        const optionAll = shallow(<OptionAll {...props} />);
        optionAll.instance().setState(prevState);

        optionAll.instance().toggleAll();

        // Assert
        expect(optionAll.state().isAllExpand).toBe(false);
        expect(props.onAllToggle).toHaveBeenCalled();
    });

    it('changeHandler should run correctly', () => {
        // Arrange
        const checked = true;
        const props = {
            textOptions: {
                Texts: 'Texts'
            },
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
            checked: true,
            textOptions: {
                Texts: 'Texts'
            }
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
            value: props.textOptions.Texts,
            checked: props.checked
        });
        expect(result.find(Option).props().onChange).toEqual(changeHandler);
    });

    it('render should return correct components li when isAllExpand true', () => {
        // Arrange
        const props = {
            id: 'id',
            checked: true,
            textOptions: {
                Texts: 'Texts'
            },
            isAllToggle: true
        };

        const toggleAll = jest.fn();
        const optionAll = shallow(<OptionAll {...props} />);
        optionAll.instance().toggleAll = toggleAll;
        optionAll.instance().setState({
            isAllExpand: true
        });
        
        // Action
        var result = shallow(optionAll.instance().render());
        result.find('li').simulate('click');

        // Assert
        expect(result.find('li').props().className).toEqual('icon-toggle-all expand-all');
        expect(toggleAll).toHaveBeenCalled();
    });

    it('render should return correct components li when isAllExpand false', () => {
        // Arrange
        const props = {
            id: 'id',
            checked: true,
            textOptions: {
                Texts: 'Texts'
            },
            isAllToggle: true
        };

        const toggleAll = jest.fn();
        const optionAll = shallow(<OptionAll {...props} />);
        optionAll.instance().toggleAll = toggleAll;
        optionAll.instance().setState({
            isAllExpand: false
        });
        
        // Action
        var result = shallow(optionAll.instance().render());
        result.find('li').simulate('click');

        // Assert
        expect(result.find('li').props().className).toEqual('icon-toggle-all collapse-all');
        expect(toggleAll).toHaveBeenCalled();
    });
});
