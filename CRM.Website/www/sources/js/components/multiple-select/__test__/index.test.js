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
                    checked: true
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
                    checked: true
                }
            ]
        };

        const index = shallow(<Index {...props} />);
        index.instance().setState(state);
        index.instance()._callBackToParent = jest.fn();

        // Action
        index.instance().onChangeHandler(item);

        // Assert
        expect(index.instance()._callBackToParent).toHaveBeenCalledWith({
            [keyField]: item.key,
            [valueField]: item.value,
            [statusField]: item.checked
        });
        expect(index.instance().state.dataSource).toEqual([
            {
                key: 1,
                checked: false
            }
        ]);
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
                    checked: true
                }
            ]
        };

        const checked = false;
        const index = shallow(<Index {...props} />);
        index.instance().setState(state);
        index.instance()._callBackToParent = jest.fn();

        // Action
        index.instance().checkAllHandler(checked);

        // Assert
        expect(index.instance().state.dataSource).toEqual([{
            checked: checked
        }]);
        expect(index.instance()._callBackToParent).toHaveBeenCalledWith(null);
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
                        [VALUE_NAME]: 'value have length greater than 1'
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
                    [VALUE_NAME]: 'value have length greater than 1'
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
                        [VALUE_NAME]: 'value have length greater than 1'
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
                    [VALUE_NAME]: 'value have length greater than 1'
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

    it('_getSelectedItemKey should return expected', () => {
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
                    key
                },
                {
                    checked: false,
                    key
                },
                {
                    checked: true,
                    key: key2
                }
            ]
        };

        const expected = [key, key2].join(',');
        const index = shallow(<Index {...props} />);
        index.instance().setState(state);

        // Action
        const result = index.instance()._getSelectedItemKey();

        // Assert
        expect(result).toEqual(expected);
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
                textOptions: {}
            };

            const id = 1;
            const checkAllHandler = jest.fn();
            const expected = <OptionAll id={id} checked={true} textOptions={props.textOptions} onChange={checkAllHandler} />;
            const index = shallow(<Index {...props} />);
            index.instance().id = id;
            index.instance().checkAllHandler = checkAllHandler;

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
                maxDisplayItemCount: 10
            };

            const id = 1;
            const _renderSearchBox = jest.fn();
            const _renderOptionAll = jest.fn();
            const onChangeHandler = jest.fn();
            const onToggle = jest.fn();
            const state = {
                dataSource: []
            };

            // Action
            const index = shallow(<Index {...props} />);
            index.instance().id = id;
            index.instance().onToggle = onToggle;
            index.instance()._renderSearchBox = _renderSearchBox;
            index.instance()._renderOptionAll = _renderOptionAll;
            index.instance().onChangeHandler = onChangeHandler;
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
