import React from 'react';
import Option from '../Option';
import { shallow } from 'enzyme';

describe('Option', () => {
    it('should have correct snapshots', () => {
        // Arrange
        const props = {
            itemData: {
                subData: []
            }
        };

        // Action
        const option = shallow(<Option {...props} />);

        // Assert
        expect(option).toMatchSnapshot();
    });

    it('onChange should run correctly', () => {
        // Arrange
        const itemData = {
            key: 'key',
            value: 'value',
            checked: true,
            subData: []
        };

        const props = {
            itemData,
            onChange: jest.fn()
        };

        const event = { stopPropagation: jest.fn() };
        const option = shallow(<Option {...props} />);

        // Action
        option.instance().onChange(event);

        // Assert
        expect(props.onChange).toHaveBeenCalledWith({
            key: itemData.key,
            value: itemData.value,
            checked: !itemData.checked
        });
    });

    it('componentDidUpdate should setState exactly', () => {
        // Arrange
        const props = {
            itemData : {
                subData: []
            },
            isAllExpand: true
        };

        const prevProps = { isAllExpand: false };
        const option = shallow(<Option {...props} />);

        // Action
        option.instance().componentDidUpdate(prevProps);

        // Assert
        expect(option.state().isExpandedSubItem).toEqual(props.isAllExpand);
    });

    it('onChangeSubItem should call exactly props function', () => {
        // Arrange
        const props = {
            itemData : {
                subItem: [{ key: 1, value: '2223', checked: true }]
            },
            onChangeSub: jest.fn()
        };
        const subItem = { key: 1, value: '2223', checked: true };
        const newSubItem = { key: 1, value: '2223', checked: false };

        const option = shallow(<Option {...props} />);

        // Action
        option.instance().onChangeSubItem(subItem);

        // Assert
        expect(props.onChangeSub).toHaveBeenCalledWith(props.itemData, newSubItem);
    });

    it('onClickExpandIcon change state correctly', () => {
        // Arrange
        const props = {
            itemData : {
                subData: []
            },
            onChange: jest.fn()
        };

        const prevState = { isExpandedSubData: true };
        const option = shallow(<Option {...props} />);
        option.instance().setState(prevState);

        // Action
        option.instance().onClickExpandIcon();

        // Assert
        expect(option.instance().state.isExpandedSubData).toEqual(!prevState.isExpandedSubData);
    });

    it('toggleItem change state correctly', () => {
        // Arrange
        const props = {
            itemData : {
                subItem: []
            },
            onChange: jest.fn()
        };

        const prevState = { isExpandedSubItem: true };
        const option = shallow(<Option {...props} />);
        option.instance().setState(prevState);

        // Action
        option.instance().toggleItem();

        // Assert
        expect(option.state().isExpandedSubItem).toEqual(!prevState.isExpandedSubItem);
    });

    it('renderSubData should return expected', () => {
        // Arrange
        const props = {
            itemData : {
                subData: []
            }
        };

        const value = 'value';
        const subDataList = [value];
        const state = { isExpandedSubData: true };
        const expected = '<ul class="sub-data"><li>value</li></ul>';
        
        const option = shallow(<Option {...props} />);
        option.instance().setState(state);

        // Action
        const result = shallow(option.instance().renderSubData(subDataList));

        // Assert
        expect(result.find('ul').props().className).toBe('sub-data');
        expect(result.find('ul').html()).toBe(expected);
    });

    it('renderSubItem call exactly function', () => {
        // Arrange
        const props = {
            itemData : {
                subItem: [{ key: 1, value: '2223', checked: true }]
            }
        };

        const subItemList = [{ key: 1, value: '2223', checked: true }];
        const state = { isExpandedSubItem: true };

        const onChangeSubItem = jest.fn();
        
        const option = shallow(<Option {...props} />);
        option.instance().setState(state);
        option.instance().onChangeSubItem = onChangeSubItem;

        // Action
        const result = shallow(option.instance().renderSubItem(subItemList));
        result.find('input').simulate('change');

        // Assert
        expect(onChangeSubItem).toHaveBeenCalled();
    });

    describe('render', () => {
        it('should return regular components', () => {
            // Arrange
            const props = {
                id: 'id',
                itemData : {
                    subData: [],
                    checked: true,
                    value: 'value'
                }
            };

            const onChange = jest.fn();
            const option = shallow(<Option {...props} />);
            option.instance().onChange = onChange;

            // Action
            const result = shallow(option.instance().render());

            // Assert
            expect(result.find('li').props().className).toBe(' multiple-select-item');
            expect(result.find('input').props().id).toEqual(props.id);
            expect(result.find('input').props().className).toBe('option-checkbox');
            expect(result.find('input').props().checked).toEqual(props.itemData.checked);
            expect(result.find('input').props().onChange).toEqual(onChange);
            expect(result.find('label').props().className).toBe('option-label');
            expect(result.find('label').props().htmlFor).toBe(props.id);
            expect(result.find('label').html()).toContain(props.itemData.value);
        });
        
        it('should return span when having subData', () => {
            // Arrange
            const props = {
                itemData : {
                    subData: [
                        {}
                    ]
                }
            };

            const onClickExpandIcon = jest.fn();
            const renderSubData = jest.fn();
            const state = { isExpandedSubData: true };

            // Action
            const option = shallow(<Option {...props} />);
            option.instance().onClickExpandIcon = onClickExpandIcon;
            option.instance().renderSubData = renderSubData;
            option.instance().setState(state);

            // Assert
            expect(option.find('span').props().className).toBe('expand-icon fa fa-caret-down');
            expect(option.find('span').props().onClick).toEqual(onClickExpandIcon);
            expect(renderSubData).toHaveBeenCalledWith(props.itemData.subData);
        });

        it('should call exactly function when having subItem', () => {
            // Arrange
            const props = {
                itemData : {
                    subItem: [{ key: 1, value: '2223', checked: true }]
                }
            };

            const renderSubItem = jest.fn();

            // Action
            const option = shallow(<Option {...props} />);
            option.instance().renderSubItem = renderSubItem;
            option.instance().render();

            // Assert
            expect(renderSubItem).toHaveBeenCalledWith(props.itemData.subItem);
        });
    });
});