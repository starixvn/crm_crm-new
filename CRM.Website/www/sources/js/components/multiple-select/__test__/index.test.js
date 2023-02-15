import React from 'react';
import Index from '../index';
import MultipleSelectLabel from '../MultipleSelectLabel';
import MultipleSelectOptionList from '../MultipleSelectOptionList';
import OptionAll from '../OptionAll';
import { shallow } from 'enzyme';
import functions from '../functions';
import { VALUE_NAME } from '../constants';

describe('index', () => {
    it('should have correct snapshots', () => {
        // Arrange
        const props = {
            dataSource: []
        };

        // Action
        const index = shallow(<Index {...props} />);

        // Assert
        expect(index).toMatchSnapshot();
    });

    describe('getDerivedStateFromProps', () => {
        it('should return data when state different from props', () => {
            // Arrange
            const props = {
                dataSource: []
            };
    
            const state = {
                originalDataSource: [
                    'value'
                ]
            };
    
            functions.convertDataSourceToState = jest.fn(() => []);
    
            // Action
            const result = Index.getDerivedStateFromProps(props, state);
    
            // Assert
            expect(result).toEqual({
                originalDataSource: props.dataSource,
                dataSource: functions.convertDataSourceToState(props)
            });
        });
        
        it('should return null when state equal to props', () => {
            // Arrange
            const props = {
                dataSource: []
            };
    
            const state = {
                originalDataSource: []
            };
    
            // Action
            const result = Index.getDerivedStateFromProps(props, state);
    
            // Assert
            expect(result).toBeNull;
        });
    });

    it('componentDidMount should run correctly', () => {
        // Arrange
        const _handleDocumentClick = jest.fn();
        const props = {
            dataSource: []
        };

        document.addEventListener = jest.fn();
        const index = shallow(<Index {...props} />);
        index.instance()._handleDocumentClick = _handleDocumentClick;

        // Action
        index.instance().componentDidMount();

        // Assert
        expect(document.addEventListener).toHaveBeenCalledWith('click', _handleDocumentClick);
    });

    it('componentWillUnmount should run correctly', () => {
        // Arrange
        const _handleDocumentClick = jest.fn();
        const props = {
            dataSource: []
        };

        document.removeEventListener = jest.fn();
        const index = shallow(<Index {...props} />);
        index.instance()._handleDocumentClick = _handleDocumentClick;

        // Action
        index.instance().componentWillUnmount();

        // Assert
        expect(document.removeEventListener).toHaveBeenCalledWith('click', _handleDocumentClick);
    });

    it('selectedItems should return expected', () => {
        // Arrange
        const props = {
            dataSource: []
        };

        const state = {
            dataSource: [
                {
                    checked: true,
                    subItem: [{ key: 1, value: '2223', checked: true }]
                }
            ]
        };

        const index = shallow(<Index {...props} />);
        index.instance().setState(state);

        // Action
        const result = index.instance().selectedItems;

        // Assert
        expect(result).toEqual(state.dataSource);
    });

    it('onChangeHandler should run correctly', () => {
        // Arrange
        const keyField = 'key';
        const valueField = 'value';
        const statusField = 'status';
        const props = {
            dataSource: [],
            keyField,
            valueField,
            statusField
        };

        const item = {
            key: 1,
            value: 'value',
            checked: false
        };

        const state = {
            dataSource: [
                {
                    key: 1,
                    checked: true,
                    subItem: [{ checked: false, key: 1, subItem: [{ checked: false, key: 1, value: "2223" }] }]
                }
            ]
        };

        const index = shallow(<Index {...props} />);
        index.instance().setState(state);
        index.instance()._callBackToParent = jest.fn();

        // Action
        index.instance().onChangeHandler(item);

        // Assert
        expect(index.instance()._callBackToParent).toHaveBeenCalled();
    });

    it('checkParentItem run correctly change item checked false', () => {
        // Arrange
        const props = {
            dataSource: []
        };
        var item = {
            checked: true,
            subItem: [{ key: 1, value: '2223', checked: false }]
        }
        var subItem = [{ checked: false, key: 1 }, { checked: true, key: 2 }];
        const index = shallow(<Index {...props} />);

        // Action
        index.instance().checkParentItem(item, subItem);
        expect(item.checked).toBe(false);
    });

    it('checkParentItem run correctly change item checked true', () => {
        // Arrange
        const props = {
            dataSource: []
        };
        var item = {
            checked: true,
            subItem: [{ key: 1, value: '2223', checked: true }]
        }
        var subItem = [{ checked: true, key: 1 }, { checked: true, key: 2 }];
        const index = shallow(<Index {...props} />);

        // Action
        index.instance().checkParentItem(item, subItem);

        // Assert
        expect(item.checked).toBe(true);
    });

    it('onChangeSubHandler should run correctly', () => {
        // Arrange
        const keyField = 'key';
        const valueField = 'value';
        const statusField = 'status';
        const props = {
            dataSource: [],
            keyField,
            valueField,
            statusField
        };

        const item = {
            key: 1,
            value: 'value',
            checked: false
        };

        const subItem = { key: 1, value: '2223', checked: true };

        const state = {
            dataSource: [
                {
                    key: 1,
                    checked: true,
                    subItem: [{ checked: true, key: 1, subItem: [{ checked: true, key: 1, value: "2223" }]}]
                }
            ]
        };

        const index = shallow(<Index {...props} />);
        index.instance().setState(state);
        index.instance()._callBackToParent = jest.fn();
        index.instance().checkParentItem = jest.fn();

        // Action
        index.instance().onChangeSubHandler(item, subItem);

        // Assert
        expect(index.instance().checkParentItem).toHaveBeenCalled();
        expect(index.instance()._callBackToParent).toHaveBeenCalled();
        expect(index.instance().state.dataSource).toEqual([{ checked: true, key: 1, subItem: [{ checked: true, key: 1, subItem: [{ checked: true, key: 1, value: "2223" }]}] }]);
    });

    it('onChangeChildHandler should run correctly', () => {
        // Arrange
        const keyField = 'key';
        const valueField = 'value';
        const statusField = 'status';

        const props = {
            dataSource: [],
            keyField,
            valueField,
            statusField
        };

        const item = {
            key: 1,
            value: 'value',
            checked: false
        };

        const subItem = { key: 1, value: '2223', checked: true };
        const childItem = { key: 1, checked: true };

        const state = {
            dataSource: [
                {
                    key: 1,
                    checked: true,
                    subItem: [{ checked: true, key: 1, childList: [{ checked: true, key: 1, value: "2223" }]}]
                }
            ]
        };

        const index = shallow(<Index {...props} />);
        index.instance().setState(state);
        index.instance()._callBackToParent = jest.fn();
        index.instance().checkParentItem = jest.fn();

        // Action
        index.instance().onChangeChildHandler(item, subItem, childItem);

        // Assert
        expect(index.instance().checkParentItem).toHaveBeenCalled();
        expect(index.instance()._callBackToParent).toHaveBeenCalled();
        expect(index.instance().state.dataSource).toEqual([{ checked: true, key: 1, subItem: [{ checked: true, key: 1, childList: [{ checked: true, key: 1, value: "2223" }]}] }]);
    });

    it('onAllToggle should set state exactly', () => {
        // Arrange
        const props = {
            dataSource: []
        };

        const index = shallow(<Index {...props} />);
        index.instance().setState({
            isAllExpand: true
        });

        // Action
        index.instance().onAllToggle();

        // Assert
        expect(index.state().isAllExpand).toBe(false);
    });

    it('onToggle should focus searchInputBox after state change', () => {
        // Arrange
        const props = {
            dataSource: []
        };

        const prevState = {
            showOptionList: false
        };

        const index = shallow(<Index {...props} />);
        index.instance().setState(prevState);
        const focus = jest.fn();
        index.instance().searchInputBox = { focus };

        // Action
        index.instance().onToggle();

        // Assert
        expect(index.instance().state.showOptionList).toBeTrue;
        expect(focus).toHaveBeenCalled();
    });

    it('checkAllHandler should run correctly', () => {
        // Arrange
        const props = {
            dataSource: []
        };

        const state = {
            dataSource: [
                {
                    checked: true,
                    subItem: [{ key: 1, value: '2223', checked: true }]
                }
            ]
        };

        const checked = true;
        const index = shallow(<Index {...props} />);
        index.instance().setState(state);
        index.instance()._callBackToParent = jest.fn();

        // Action
        index.instance().checkAllHandler(checked);

        // Assert
        expect(index.instance().state.dataSource).toEqual([{
            checked: checked,
            subItem: [{ key: 1, value: '2223', checked: true }]
        }]);
        expect(index.instance()._callBackToParent).toHaveBeenCalledWith(null, [{ checked: true, subItem: [{ checked: true, key: 1, value: "2223"}] }]);
    });

    describe('onChangeSearchText', () => {
        it('should change state correctly when value length greater than 1', () => {
            // Arrange
            const props = {
                dataSource: []
            };

            const state = {
                dataSource: [
                    {
                        visible: false,
                        [VALUE_NAME]: 'value have length greater than 1',
                        subItem: [{ key: 1, value: '2223', checked: true }]
                    }
                ]
            };

            const value = 'value';
            const index = shallow(<Index {...props} />);
            index.instance().setState(state);

            // Action
            index.instance().onChangeSearchText(value);

            // Assert
            expect(index.instance().state.dataSource).toEqual([
                {
                    visible: true,
                    [VALUE_NAME]: 'value have length greater than 1',
                    subItem: [{ key: 1, value: '2223', checked: true }]
                }
            ]);
        });
        
        it('should change state correctly when value length not greater than 1', () => {
            // Arrange
            const props = {
                dataSource: []
            };

            const state = {
                dataSource: [
                    {
                        visible: false,
                        [VALUE_NAME]: 'value have length greater than 1',
                        subItem: [{ key: 1, value: '2223', checked: true }]
                    }
                ]
            };

            const value = '';
            const index = shallow(<Index {...props} />);
            index.instance().setState(state);

            // Action
            index.instance().onChangeSearchText(value);

            // Assert
            expect(index.instance().state.dataSource).toEqual([
                {
                    visible: true,
                    [VALUE_NAME]: 'value have length greater than 1',
                    subItem: [{ key: 1, value: '2223', checked: true }]
                }
            ]);
        });
    });

    it('onClearSearch should run correctly', () => {
        // Arrange
        const props = {
            dataSource: []
        };

        const event = { preventDefault: jest.fn() };
        const index = shallow(<Index {...props} />);
        index.instance().onChangeSearchText = jest.fn();

        // Action
        index.instance().onClearSearch(event);

        // Assert
        expect(event.preventDefault).toHaveBeenCalled();
        expect(index.instance().onChangeSearchText).toHaveBeenCalledWith('');
    });

    it('_callBackToParent should run correctly', () => {
        // Arrange
        const props = {
            dataSource: [],
            onChange: jest.fn()
        };

        const expected = {};
        const selectedItem = 'selectedItem';
        const index = shallow(<Index {...props} />);
        index.instance()._getSelectedItemKey = jest.fn(() => expected);

        // Action
        index.instance()._callBackToParent(selectedItem);

        // Assert
        expect(props.onChange).toHaveBeenCalledWith(selectedItem, expected);
    });

    it('_getSelectedItemKey have subItem should return expected', () => {
        // Arrange
        const props = {
            dataSource: []
        };

        const key = 'key';
        const key2 = 'key2';
        const state = {
            dataSource: [
                {
                    checked: true,
                    key,
                    subItem: [{ key: 1, value: '2223', checked: true }]
                },
                {
                    checked: false,
                    key,
                    subItem: [{ key: 2, value: '2224', checked: true }]
                },
                {
                    checked: true,
                    key: key2,
                    subItem: [{ key: 3, value: '2225', checked: true }]
                }
            ]
        };

        const expected = [key, key2].join(',');
        const index = shallow(<Index {...props} />);
        index.instance().setState(state);

        // Action
        const result = index.instance()._getSelectedItemKey(state.dataSource);

        // Assert
        expect(result).toEqual("1,2,3");
    });

    it('_getSelectedItemKey no have subItem should return expected', () => {
        // Arrange
        const props = {
            dataSource: []
        };

        const key = 'key';
        const key2 = 'key2';
        const state = {
            dataSource: [
                {
                    checked: true,
                    key,
                    subItem: []
                },
                {
                    checked: false,
                    key,
                    subItem: []
                },
                {
                    checked: true,
                    key: key2,
                    subItem: []
                }
            ]
        };

        const expected = [key, key2].join(',');
        const index = shallow(<Index {...props} />);
        index.instance().setState(state);

        // Action
        const result = index.instance()._getSelectedItemKey(state.dataSource);

        // Assert
        expect(result).toEqual(expected);
    });

    it('getLengthDataSource should return correctly', () => {
        // Arrange
        const props = {
            dataSource: [{ subItem: [{ key: 2, value: '2224', checked: true }] }]
        };

        const index = shallow(<Index {...props} />);
        index.instance().setState({
            dataSource: [{ checked: true, subItem: [{ key: 2, value: '2224', checked: true }] }, { checked: true, subItem: [] }]
        });

        // Action
        const actual = index.instance().getLengthDataSource();

        // Assert
        expect(actual).toBe(2);
    });

    it('_close should change state correctly', () => {
        // Arrange
        const props = {
            dataSource: []
        };

        const state = { showOptionList: true };
        const index = shallow(<Index {...props} />);
        index.instance().setState(state);

        // Action
        index.instance()._close();

        // Assert
        expect(index.instance().state.showOptionList).toBeFalse;
    });

    describe('getFieldItem', () => {
        it('should return exactly result', () => {
            // Arrange
            const props = {
                dataSource: [],
                keyField: 'key',
                valueField: 'value',
                statusField: 'checked'
            };

            const item = {
                key: 1,
                value: 'test',
                checked: true
            };

            // Action
            const index = shallow(<Index {...props} />).instance();
            const result = index.getFieldItem(item);

            // Assert
            expect(result).toEqual(item);
        });
    });

    describe('_handleDocumentClick', () => {
        it('should call _close' , () => {
            // Arrange
            const props = {
                dataSource: []
            };

            const state = { showOptionList: true };
            const index = shallow(<Index {...props} />);
            index.instance().setState(state);
            index.instance().wrapper = { contains: jest.fn(() => false) };
            index.instance()._close = jest.fn();

            // Action
            index.instance()._handleDocumentClick({});

            // Assert
            expect(index.instance()._close).toHaveBeenCalled();
        });
        
        it('should not call _close when not having wrapper' , () => {
            // Arrange
            const props = {
                dataSource: []
            };

            const state = { showOptionList: true };
            const index = shallow(<Index {...props} />);
            index.instance().setState(state);
            index.instance().wrapper = null;
            index.instance()._close = jest.fn();

            // Action
            index.instance()._handleDocumentClick({});

            // Assert
            expect(index.instance()._close).toHaveBeenCalledTimes(0);
        });
        
        it('should not call _close when having wrapper contains event target' , () => {
            // Arrange
            const props = {
                dataSource: []
            };

            const state = { showOptionList: true };
            const index = shallow(<Index {...props} />);
            index.instance().setState(state);
            index.instance().wrapper = { contains: jest.fn(() => true) };
            index.instance()._close = jest.fn();

            // Action
            index.instance()._handleDocumentClick({});

            // Assert
            expect(index.instance()._close).toHaveBeenCalledTimes(0);
        });
        
        it('should not call _close when showOptionList false' , () => {
            // Arrange
            const props = {
                dataSource: []
            };

            const state = { showOptionList: false };
            const index = shallow(<Index {...props} />);
            index.instance().setState(state);
            index.instance().wrapper = { contains: jest.fn(() => false) };
            index.instance()._close = jest.fn();

            // Action
            index.instance()._handleDocumentClick({});

            // Assert
            expect(index.instance()._close).toHaveBeenCalledTimes(0);
        });
    });

    describe('_renderOptionAll', () => {
        it('should return null when hasAllOption false', () => {
            // Arrange
            const props = {
                dataSource: [
                    {
                        checked: true
                    }
                ],
                hasAllOption: false
            };

            const index = shallow(<Index {...props} />);

            // Action
            const result = index.instance()._renderOptionAll();

            // Assert
            expect(result).toBeNull;
        });
        
        it('should return null when dataSource empty', () => {
            // Arrange
            const props = {
                dataSource: [],
                hasAllOption: true
            };

            const index = shallow(<Index {...props} />);

            // Action
            const result = index.instance()._renderOptionAll();

            // Assert
            expect(result).toBeNull;
        });
        
        it('should return expected when dataSource not empty', () => {
            // Arrange
            const props = {
                dataSource: [
                    {
                        checked: true
                    }
                ],
                hasAllOption: true,
                textOptions: {},
                isAllToggle: false
            };

            const id = 1;
            const checkAllHandler = jest.fn();
            const onAllToggle = jest.fn();
            const expected = <OptionAll id={id} checked textOptions={props.textOptions} isAllToggle={props.isAllToggle} onAllToggle={onAllToggle} onChange={checkAllHandler} />;
            const index = shallow(<Index {...props} />);
            index.instance().id = id;
            index.instance().checkAllHandler = checkAllHandler;
            index.instance().onAllToggle = onAllToggle;

            // Action
            const result = index.instance()._renderOptionAll();

            // Assert
            expect(result).toEqual(expected);
        });
    });

    describe('_renderSearchBox', () => {
        it('should return null when hasSearchBox false', () => {
            // Arrange
            const props = {
                dataSource: [
                    {
                        checked: true
                    }
                ],
                hasSearchBox: false
            };

            const index = shallow(<Index {...props} />);

            // Action
            const result = index.instance()._renderSearchBox();

            // Assert
            expect(result).toBeNull;
        });
        
        it('should return null when dataSource empty', () => {
            // Arrange
            const props = {
                dataSource: [],
                hasSearchBox: true
            };

            const index = shallow(<Index {...props} />);

            // Action
            const result = index.instance()._renderSearchBox();

            // Assert
            expect(result).toBeNull;
        });
        
        it('should return expected when dataSource not empty and hasSearchBox true', () => {
            // Arrange
            const props = {
                dataSource: [
                    {
                        checked: true
                    }
                ],
                hasSearchBox: true
            };

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

            const state = {
                searchText: 'searchText'
            };

            const onClearSearch = jest.fn();
            const index = shallow(<Index {...props} />);
            index.instance().setState(state);
            index.instance().onClearSearch = onClearSearch;

            // Action
            const result = shallow(index.instance()._renderSearchBox());

            // Assert
            expect(result.find('div').props().style).toEqual({ width: '100%' });
            expect(result.find('input').props().autoFocus).toBeTrue;
            expect(result.find('input').props().value).toEqual(state.searchText);
            expect(result.find('input').props().type).toBe('text');
            expect(result.find('input').props().placeholder).toBe('Search');
            expect(result.find('input').props().style).toEqual({
                width: '100%', border: '1px solid #ccc', padding: '5px 10px',
                boxSizing: 'border-box'
            });
            expect(result.find('button').props().onClick).toEqual(onClearSearch);
            expect(result.find('button').props().style).toEqual(clearButtonStyle);
            expect(result.find('button').html()).toContain('X');
        });
        
        it('should return expected containing input onChange when dataSource not empty and hasSearchBox true', () => {
            // Arrange
            const props = {
                dataSource: [
                    {
                        checked: true
                    }
                ],
                hasSearchBox: true
            };

            const event = {
                target: {
                    value: 'value'
                }
            };
            const index = shallow(<Index {...props} />);
            index.instance().onChangeSearchText = jest.fn();
            const result = shallow(index.instance()._renderSearchBox());

            // Action
            result.find('input').simulate('change', event);

            // Assert
            expect(index.instance().onChangeSearchText).toHaveBeenCalledWith(event.target.value);
        });
    });

    describe('render', () => {
        it('should return regular component', () => {
            // Arrange
            const props = {
                dataSource: [],
                maxDisplayItemCount: 1,
                textOptions: {},
                texts: {},
                isAllTextShown: true,
            };

            const id = 1;
            const _renderSearchBox = jest.fn();
            const _renderOptionAll = jest.fn();
            const onChangeHandler = jest.fn();
            const onChangeSubHandler = jest.fn();
            const onToggle = jest.fn();
            const state = {
                dataSource: [],
                isAllExpand: true
            };

            // Action
            const index = shallow(<Index {...props} />);
            index.instance().id = id;
            index.instance().onToggle = onToggle;
            index.instance()._renderSearchBox = _renderSearchBox;
            index.instance()._renderOptionAll = _renderOptionAll;
            index.instance().onChangeHandler = onChangeHandler;
            index.instance().onChangeSubHandler = onChangeSubHandler;
            index.setState(state);

            // Assert
            expect(index.find('div').at(0).props().className).toBe('multiple-select-container ');
            expect(index.find('div').at(0).props().id).toEqual(id);
            expect(index.find(MultipleSelectLabel).props().textOptions).toEqual(props.textOptions);
            expect(index.find(MultipleSelectLabel).props().selectedItems).toEqual(state.dataSource);
            expect(index.find(MultipleSelectLabel).props().dataSourceSize).toEqual(0);
            expect(index.find(MultipleSelectLabel).props().onToggle).toEqual(onToggle);
            expect(index.find(MultipleSelectLabel).props().texts).toEqual(props.texts);
            expect(index.find(MultipleSelectLabel).props().isAllTextShown).toEqual(props.isAllTextShown);
            expect(index.find(MultipleSelectLabel).props().maxDisplayItemCount).toEqual(props.maxDisplayItemCount);
            expect(index.find('div').at(1).props().className).toBe('multiple-select-default multiple-select-options-container');
            expect(index.find('div').at(1).props().style).toEqual({ display: 'none' });
            expect(_renderSearchBox).toHaveBeenCalled();
            expect(_renderOptionAll).toHaveBeenCalled();
            expect(index.find(MultipleSelectOptionList).props().id).toEqual(id);
            expect(index.find(MultipleSelectOptionList).props().dataSource).toEqual(state.dataSource);
            expect(index.find(MultipleSelectOptionList).props().onChange).toEqual(onChangeHandler);
            expect(index.find(MultipleSelectOptionList).props().onChangeSub).toEqual(onChangeSubHandler);
            expect(index.find(MultipleSelectOptionList).props().isAllExpand).toEqual(state.isAllExpand);
        });

        it('should have first div with invalid className', () => {
            // Arrange
            const props = {
                dataSource: [],
                isInvalid: true
            };

            // Action
            const index = shallow(<Index {...props} />);

            // Assert
            expect(index.find('div').at(0).props().className).toBe('multiple-select-container invalid');
        });

        it('should have second div with style display block', () => {
            // Arrange
            const props = {
                dataSource: []
            };

            const state = { showOptionList: true };

            // Action
            const index = shallow(<Index {...props} />);
            index.instance().setState(state);

            // Assert
            expect(index.find('div').at(1).props().style).toEqual({ display: 'block' });
        });
    });
});
