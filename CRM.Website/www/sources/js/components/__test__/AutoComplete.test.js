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
        options: [],
        display: false,
        searchValue: ''
    }

    const props = {
        options: [],
        showPopup: false,
        searchValue: '',
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
                const clickHandler = jest.fn();
                document.addEventListener = jest.fn();
                const container = shallow(<AutoComplete {...props} />);
                container.instance().clickHandler = clickHandler;

                // Action
                container.instance().componentDidMount();

                // Assert
                expect(document.addEventListener).toHaveBeenCalledWith('click', clickHandler);
            });
        });

        describe('ComponentDidUpdate', () => {
            it('ComponentDidUpdate should run correctly', () => {
                //Arrange
                const expected = {
                    options: ["test"],
                    display: true
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
                const clickHandler = jest.fn();
                document.removeEventListener = jest.fn();
                const container = shallow(<AutoComplete {...props} />);
                container.instance().clickHandler = clickHandler;

                // Action
                container.instance().componentWillUnmount();

                // Assert
                expect(document.removeEventListener).toHaveBeenCalledWith('click', clickHandler);
            });
        });

        describe('selectOption', () => {
            it('selectOption should run correctly', () => {
                const item = "value";
                const expected = {
                    options: [],
                    display: false,
                    searchValue: "value"
                }
                const container = shallow(<AutoComplete {...props} />);

                // Action
                container.instance().selectOption(item);
                // Assert
                expect(container.state()).toEqual(expected);
            });
        });

        describe('clickHandler', () => {
            it('should state display not change when not has wrapperRef', () => {
                const event = {
                    target: {}
                };
                const expected = {
                    options: [],
                    display: false,
                    searchValue: ""
                }
                const container = shallow(<AutoComplete {...props} />);
                container.instance().wrapperRef = null;
                container.instance().componentDidMount();
                // Action
                container.instance().clickHandler(event);

                // Assert
                expect(container.state()).toEqual(expected);
            });

            it('should state display change', () => {
                const mockRef = {
                    event: {},
                    contains: jest.fn().mockReturnValue(false)
                };
                const expected = {
                    options: [],
                    display: true,
                    searchValue: ""
                }
                const container = shallow(<AutoComplete {...props} />);
                container.instance().wrapperRef.current = mockRef;
                container.instance().setState(expected);
                // Action
                container.instance().clickHandler(mockRef.event);

                // Assert
                expect(container.instance().state.display).toBeFalse;
            });
        });

        describe('handleChange', () => {
            it('should call exacly methods', () => {
                //Arange
                const event = {target:{name:"searchValue", value:"test"}}
                const expected = {
                    options: [],
                    display: false,
                    searchValue: "test"
                }

                const container = shallow(<AutoComplete {...props} />);

                //Act
                container.instance().handleChange(event);
                
                //Assert
                expect(container.instance().state).toEqual(expected);
                expect(props.onChange).toHaveBeenCalled();
                expect(props.onInputChange).toHaveBeenCalled();

            });
        });

        describe('render', () => {
            it('returns correct first div', () => {
                
                //Act
                const container = shallow(<AutoComplete {...props} />);

                //Assert
                expect(container.find('div').first().props().className).toBe('autocomplete-w1');
            });

            it('returns correct second div', () => {
                //Arrange
                
                //Act
                const container = shallow(<AutoComplete {...props} />);

                //Assert
                expect(container.find('div').at(1).props().className).toBe('autocomplete');
            });

            it('has div with correct option', () => {
                //Arrange 
                const state = {
                    options: ["option1", "option2"],
                    display: true
                };

                //Act
                const container = shallow(<AutoComplete {...props} />);
                container.instance().setState(state);

                //Assert
                expect(container.find('div').at(2).props().className).toBe('child');
                for(let index = 0; index < state.options.length; index++) {
                    expect(container.find('div.child').at(index).html()).toContain(state.options[index])
                }
            });

            function simulateClickChild(index, value) {
                it(`at index ${index}`, () => {
                    //Arrange 
                    const state = {
                        options: ["option1", "option2"],
                        display: true
                    };

                    const container = shallow(<AutoComplete {...props} />);
                    container.instance().setState(state);
                    container.instance().selectOption = jest.fn();

                    // Action
                    container.find('div.child').at(index).simulate('click', value);

                    // Assert
                    expect(container.instance().selectOption).toHaveBeenCalledWith(value);
                });
            }

            describe('has option with onclick', () => {
                //Arrange 
                const state = {
                    options: ["option1", "option2"],
                    display: true
                };

                //Act
                for(let index = 0; index < state.options.length; index++) {
                    simulateClickChild(index, state.options[index]);
                }
            });
        });
    });

});