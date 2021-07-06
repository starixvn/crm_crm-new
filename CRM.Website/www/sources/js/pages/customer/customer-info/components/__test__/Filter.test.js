import React from 'react';
import { Filter } from '../Filter';
import { shallow, mount } from 'enzyme';
import LangHelper from '@jsroot/common/langHelper';
import configureMockStore from 'redux-mock-store';

describe('filter', () => {
    beforeAll(() => {
        LangHelper.getResource = jest.fn((key) => key);
    });
    afterAll(() => {
        jest.clearAllMocks();
    });

    it('should render correctly', () => {
        // Act
        const mockStore = configureMockStore();
        const store = mockStore();

        // Action
        const wrapper = shallow(<Filter store={store} />);

        // Assert
        expect(wrapper).toMatchSnapshot();
    });

    it('component has correct initialState', () =>{
        //Arrang
        const initialState = {
            username: '',
            isGuest: false
        }
        const props = {
            gridParams: {},
            gridData: {},
            CustomerSuggestion: {}
        };

        // Action
        const filter = shallow(<Filter {...props} />);

        // Assert
        expect(filter.state()).toEqual(initialState);
    });

    describe('methods', () => {
        describe('componentDidUpdate', () => {
            it('componentDidUpdate run correctly', () => {
                //Arrange
                const state = {
                    username: '',
                    isGuest: false
                };
                const promise = Promise.resolve({});
                const props = {
                    gridParams: {
                        username: 'test',
                        isGuest: false
                    }
                }

                const params = {
                    username: state.username,
                    isGuest: state.isGuest
                }

                const newProps = {
                    gridParams: {
                        username: '',
                        isGuest: false
                    }
                }

                //Act
                const container = shallow(<Filter {...props} />);
                container.setProps(newProps);
                container.instance().getParams = jest.fn().mockReturnValue(params);

                //Assert
                promise.then(() => {
                    expect(container.instance().state.username).toEqual('test');
                })
            });
        });

        describe('handleChange', () => {
            const props = {
                getCustomerSuggestion: jest.fn()
            }
            it('should call setState when change username field', () => {
                //Arrange
                const expected = {
                    username: 'test',
                    isGuest: false
                }
                const container = shallow(<Filter {...props} />);

                //Act
                container.instance().handleChange({ target: { value: 'test', name: 'username' } });

                //Assert
                expect(container.state()).toEqual(expected);
                expect(props.getCustomerSuggestion).toHaveBeenCalled();
            });

            it('should call setState when change IsGuest field', () => {
                //Arrange
                const expected = {
                    username: '',
                    isGuest: true
                }
                const container = shallow(<Filter {...props} />);

                //Act
                container.instance().handleChange({ target: { type: 'checkbox', checked: true, name: 'isGuest' } });

                //Assert
                expect(container.state()).toEqual(expected);
                expect(props.getCustomerSuggestion).toHaveBeenCalled();
            });
        });

        describe('getParams', () => {
            it('getParams with valid filter', () => {
                // Arrange
                const state = {
                    username: '',
                    isGuest: false
                }
                const expected = {
                    username: state.username,
                    isGuest: state.isGuest
                };
                const container = shallow(<Filter />);
                container.instance().setState(state);

                // Act
                const actual = container.instance().getParams();

                // Assert
                expect(actual).toEqual(expected);
            });

            it('getParams with invalid filter', () => {
                // Arrange
                const state = {
                    username: null,
                    isGuest: null
                }
                const expected = {
                    username: state.username,
                    isGuest: state.isGuest
                };
                const container = shallow(<Filter />);
                container.instance().setState(state);

                // Act
                const actual = container.instance().getParams();


                // Assert
                expect(actual).toEqual(expected);
            });
        });

        describe('handleSubmit', () => {
            it('should call exactly function', () => {
               // Arrange
               const params = { name: 'name' };
               const event = {
                   preventDefault: jest.fn()
               };

               const props = {
                   setGridParams: jest.fn(),
                   getCustomerInfo: jest.fn()
               }

               const filter = shallow(<Filter {...props} />);
               filter.instance().getParams = jest.fn();
               filter.instance().getParams.mockReturnValueOnce(params);

               // Action
               filter.instance().handleSubmit(event);

               // Assert
               expect(event.preventDefault).toHaveBeenCalledTimes(1);
               expect(props.setGridParams).toHaveBeenCalledWith(params);
               expect(props.getCustomerInfo).toHaveBeenCalledTimes(1);
            });

        });

        describe('selectSuggestionSearchValue', () => {
            it('should call exactly function', () => {
                //Arrange
                const item = "name";
                const expected = {
                    username: 'name',
                    isGuest: false
                }
                const container = shallow(<Filter />);

                //Act
                container.instance().selectSuggestionSearchValue(item);
                
                //Assert
                expect(container.state()).toEqual(expected);
            });
        })
    });
});