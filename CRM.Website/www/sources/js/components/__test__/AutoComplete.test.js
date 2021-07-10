import React, { Fragment } from 'react';
import AutoComplete from '../AutoComplete';
import LangHelper from '@jsroot/common/langHelper';
import { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';

describe('AutoComplete', () => {
    beforeAll(() => {
        LangHelper.getResource = jest.fn((key) => key);
    });
    afterAll(() => {
        jest.clearAllMocks();
    });

    //Arrange
    const initialState = {
        showOptionList: false,
        searchValue: '',
        currentValue: '',
        selectedItem: -1
    }

    const props = {
        options: [],
        diplayField: '',
        onChange: jest.fn(),
        onInputChange: jest.fn()
    }

    it('should have correct snapshots', () => {
        //Act
        const container = shallow(<AutoComplete {...props} />);
        container.instance().setState(initialState);
        // Assert
        expect(container).toMatchSnapshot();
    });

    it('component has correct initialState', () =>{
        
        // Action
        const container = shallow(<AutoComplete {...props} />);

        // Assert
        expect(container.state()).toEqual(initialState);
    });

    describe('methods', () => {
        describe('componentDidMount', () => {
            it('componentDidMount should run correctly', () => {
                const handleClickOutside = jest.fn();
                document.addEventListener = jest.fn();
                const container = shallow(<AutoComplete {...props} />);
                container.instance().handleClickOutside = handleClickOutside;

                // Action
                container.instance().componentDidMount();

                // Assert
                expect(document.addEventListener).toHaveBeenCalledWith('click', handleClickOutside);
            });
        });

        describe('ComponentDidUpdate', () => {
            it('ComponentDidUpdate should run correctly', () => {
                //Arrange
                const expected = {
                    showOptionList: true
                }

                const newProps = {
                    options: ["test"],
                    display: true
                }
                const promise = Promise.resolve({});

                //Act
                const container = shallow(<AutoComplete {...props} />);
                container.setProps(newProps);
                //container.instance().ComponentDidUpdate();

                //Assert
                promise.then(() => {
                    expect(container.instance().state).toEqual(expected);
                });

            });
        });

        describe('componentWillUnmount', () => {
            it('componentWillUnmount should run correctly', () => {
                const handleClickOutside = jest.fn();
                document.removeEventListener = jest.fn();
                const container = shallow(<AutoComplete {...props} />);
                container.instance().handleClickOutside = handleClickOutside;

                // Action
                container.instance().componentWillUnmount();

                // Assert
                expect(document.removeEventListener).toHaveBeenCalledWith('click', handleClickOutside);
            });
        });

        describe('selectOption', () => {
            it('selectOption should run correctly', () => {
                const item = "value";
                const expected = {
                    showOptionList: false,
                    searchValue: 'value',
                    currentValue: '',
                    selectedItem: -1
                }
                const container = shallow(<AutoComplete {...props} />);

                // Action
                container.instance().selectOption(item);
                // Assert
                expect(container.state()).toEqual(expected);
                expect(props.onChange).toHaveBeenCalled();
            });
        });

        describe('handleClickOutside', () => {
            it('should state display not change when not has wrapperRef', () => {
                const event = {
                    target: {}
                };
                const expected = {
                    showOptionList: false,
                    searchValue: '',
                    currentValue: '',
                    selectedItem: -1
                }
                const container = shallow(<AutoComplete {...props} />);
                container.instance().wrapperRef = null;
                container.instance().componentDidMount();
                // Action
                container.instance().handleClickOutside(event);

                // Assert
                expect(container.state()).toEqual(expected);
            });

            it('should state display change', () => {
                const mockRef = {
                    event: {},
                    contains: jest.fn().mockReturnValue(false)
                };
                const expected = {
                    showOptionList: true,
                    searchValue: ""
                }
                const container = shallow(<AutoComplete {...props} />);
                container.instance().wrapperRef.current = mockRef;
                container.instance().setState(expected);
                // Action
                container.instance().handleClickOutside(mockRef.event);

                // Assert
                expect(container.instance().state.showOptionList).toBeFalse;
            });
        });

        describe('handleChange', () => {
            it('should call exacly methods', () => {
                //Arange
                const event = {target:{name:"searchValue", value:"test"}}
                const expected = {
                    showOptionList: false,
                    searchValue: 'test',
                    currentValue: 'test',
                    selectedItem: -1
                }

                const container = shallow(<AutoComplete {...props} />);

                //Act
                container.instance().handleChange(event);
                
                //Assert
                expect(container.instance().state).toEqual(expected);
                expect(props.onInputChange).toHaveBeenCalled();
                expect(props.onChange).toHaveBeenCalled();

            });
        });

        describe('handleSetSelectedItem', () => {
            it('should render correctly', () => {
                //Arrange
                const index = 3;
                const container = shallow(<AutoComplete {...props} />);

                //Act
                container.instance().handleSetSelectedItem(index);

                //Assert
                expect(container.instance().state.selectedItem).toEqual(index);
            });
        });

        describe('handleKeyDown', () => {
            it('should run exactly when press ESCAPE key', () => {
                //Arrange
                const event = {keyCode: 27};
                const state = {
                    showOptionList: true,
                    selectedItem: 0,
                    searchValue: 'test',
                    currentValue: 'test',
                }
                const expected = {
                    showOptionList: false,
                    selectedItem: -1,
                    searchValue: 'test',
                    currentValue: 'test',
                }
                const container = shallow(<AutoComplete {...props} />);
                container.instance().setState(state)

                //Act
                container.instance().handleKeyDown(event);

                //Assert
                expect(container.instance().state).toEqual(expected);
            });

            it('should run exactly when press Tab key', () => {
                //Arrange
                const event = {keyCode: 9};
                const state = {
                    showOptionList: true,
                    selectedItem: 0,
                    searchValue: 'test',
                    currentValue: 'test',
                }
               
                const container = shallow(<AutoComplete {...props} />);
                container.instance().setState(state)

                //Act
                container.instance().handleKeyDown(event);

                //Assert
                expect(container.instance().state.showOptionList).toBeFalse;
            });

            it('should run exactly when press Enter key', () => {
                //Arrange
                const event = {keyCode: 13};
               
                const container = shallow(<AutoComplete {...props} />);

                //Act
                container.instance().handleKeyDown(event);

                //Assert
                expect(container.instance().state.showOptionList).toBeFalse;
            });

            it('should run exactly when press Up key', () => {
                //Arrange
                const event = {keyCode: 38};
                const state = {
                    showOptionList: true
                } 
                const container = shallow(<AutoComplete />);
                container.instance().setState(state);
                container.instance().moveUp = jest.fn();

                //Act
                container.instance().handleKeyDown(event);

                //Assert
                expect(container.instance().moveUp).toHaveBeenCalled();
            });

            it('should run exactly when press Down key', () => {
                //Arrange
                const event = {keyCode: 40};
                const state = {
                    showOptionList: true
                } 
               
                const container = shallow(<AutoComplete {...props} />);
                container.instance().setState(state);
                container.instance().moveDown = jest.fn();

                //Act
                container.instance().handleKeyDown(event);

                //Assert
                expect(container.instance().moveDown).toHaveBeenCalled();
            });

            it('should run exactly when press others key', () => {
                //Arrange
                const event = {keyCode: 10};
                const state = {
                    showOptionList: true
                } 
               
                const container = shallow(<AutoComplete {...props} />);
                container.instance().setState(state);
                container.instance().moveDown = jest.fn();

                //Act
                container.instance().handleKeyDown(event);

                //Assert
                expect(container.instance().state.showOptionList).toEqual(true);
            });
        });

        describe('moveUp', () => {
            it('should reset selectedItem', () => {
                //Arrange
                const state = {
                    selectedItem: 0
                };
                const container = shallow(<AutoComplete />);
                container.instance().setState(state);

                //Act
                container.instance().moveUp();

                //Assert
                expect(container.state)

            });

            it('should move up next option', () => {
                //Arrange
                const state = {
                    selectedItem: 1,
                    searchValue: ''
                };
                const props = {
                    options: ["test"],
                    diplayField: '',
                    onChange: jest.fn(),
                    onInputChange: jest.fn()
                }
                const container = shallow(<AutoComplete {...props} />);
                container.instance().setState(state);

                //Act
                container.instance().moveUp();

                //Assert
                expect(container.instance().state.selectedItem).toEqual(0);
                expect(container.instance().state.searchValue).toEqual('test');

            });
        });

        describe('moveDown', () => {
            it('should move down next option', () => {
                 //Arrange
                 const state = {
                    selectedItem: -1,
                    searchValue: ''
                };
                const props = {
                    options: ["test"],
                    diplayField: '',
                    onChange: jest.fn(),
                    onInputChange: jest.fn()
                }
                const container = shallow(<AutoComplete {...props} />);
                container.instance().setState(state);

                //Act
                container.instance().moveDown();

                //Assert
                expect(container.instance().state.selectedItem).toEqual(0);
                expect(container.instance().state.searchValue).toEqual('test');

            });
        });

        describe('render', () => {
            it('return correct first div', () => {
                //Act
                const container = shallow(<AutoComplete {...props} />);

                //Assert
                expect(container.find('div').first().props().className).toBe('autocomplete-container');
            });

            it('has input search with onClick', () => {
                //Arrange
                const container = shallow(<AutoComplete {...props} />);
                container.instance().handleKeyDown = jest.fn()

                //Act
                container.find('div input').first().simulate('keyDown');

                //Assert
                expect(container.instance().handleKeyDown).toHaveBeenCalled();

            });

            it('has option with onClick', () => {
                //Arrange
                const container = shallow(<AutoComplete {...props} />);
                container.instance().handleKeyDown = jest.fn()

                //Act
                container.find('div input').first().simulate('keyDown');

                //Assert
                expect(container.instance().handleKeyDown).toHaveBeenCalled();

            });

            function simulateClickOptions(index, value) {
                it(`at index ${index}`, () => {
                    //Arrange
                    const state = {
                        selectedItem: 0,
                        searchValue: 'test1',
                        showOptionList: true,
                        currentValue: 'test'
                    };
                    const props = {
                        options: ["test1", "test2"]
                    }
                    const container = shallow(<AutoComplete {...props} />);
                    container.instance().setState(state);
                    container.instance().selectOption = jest.fn();
                    container.instance().handleSetSelectedItem = jest.fn();

                    //Act
                    container.find('div div div').find('.autocomplete-item').at(index).simulate('click', value);
                    container.find('div div div').find('.autocomplete-item').at(index).simulate('mouseOver', index);

                    //Assert
                    //expect(container.find('div div div').find('.autocomplete-item').at(index).html()).toContain('123');
                    expect(container.instance().selectOption).toHaveBeenCalledWith(value);
                    expect(container.instance().handleSetSelectedItem).toHaveBeenCalledWith(index);
                });
            }

            describe('Render list options', () => {
                const options = ["test1", "test2"];
                for(let i = 0; i < options.length; i++) {
                    simulateClickOptions(i, options[i]);
                }
            });

           
        });

        // describe('render', () => {
        //     it('returns correct first div', () => {
                
        //         //Act
        //         const container = shallow(<AutoComplete {...props} />);

        //         //Assert
        //         expect(container.find('div').first().props().className).toBe('autocomplete-w1');
        //     });

        //     it('returns correct second div', () => {
        //         //Arrange
                
        //         //Act
        //         const container = shallow(<AutoComplete {...props} />);

        //         //Assert
        //         expect(container.find('div').at(1).props().className).toBe('autocomplete');
        //     });

        //     it('has div with correct option', () => {
        //         //Arrange 
        //         const state = {
        //             options: ["option1", "option2"],
        //             display: true
        //         };

        //         //Act
        //         const container = shallow(<AutoComplete {...props} />);
        //         container.instance().setState(state);

        //         //Assert
        //         expect(container.find('div').at(2).props().className).toBe('child');
        //         for(let index = 0; index < state.options.length; index++) {
        //             expect(container.find('div.child').at(index).html()).toContain(state.options[index])
        //         }
        //     });

        //     function simulateClickChild(index, value) {
        //         it(`at index ${index}`, () => {
        //             //Arrange 
        //             const state = {
        //                 options: ["option1", "option2"],
        //                 display: true
        //             };

        //             const container = shallow(<AutoComplete {...props} />);
        //             container.instance().setState(state);
        //             container.instance().selectOption = jest.fn();

        //             // Action
        //             container.find('div.child').at(index).simulate('click', value);

        //             // Assert
        //             expect(container.instance().selectOption).toHaveBeenCalledWith(value);
        //         });
        //     }

        //     describe('has option with onclick', () => {
        //         //Arrange 
        //         const state = {
        //             options: ["option1", "option2"],
        //             display: true
        //         };

        //         //Act
        //         for(let index = 0; index < state.options.length; index++) {
        //             simulateClickChild(index, state.options[index]);
        //         }
        //     });
        // });
    });

});