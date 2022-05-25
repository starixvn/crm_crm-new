import React from 'react';
import { Filter } from '../Filter';
import { shallow } from 'enzyme';
import LangHelper from '@jsroot/common/langHelper';
import configureMockStore from 'redux-mock-store';
import AutoComplete from '@jsroot/components/AutoComplete';

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

    it('component has correct initialState', () => {
        //Arrang
        const initialState = {
            username: '',
            isGuest: false,
            showEmptyConfirmPopup: false,
            showEmptyCustomerInfoPopup: false
        };
        const props = {
            gridParams: {},
            customerInfo: {},
            customerSuggestions: {},
            setCustomerSuggestions: jest.fn()
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
                };

                const params = {
                    username: state.username,
                    isGuest: state.isGuest
                };

                const newProps = {
                    gridParams: {
                        username: '',
                        isGuest: false
                    }
                };

                //Act
                const container = shallow(<Filter {...props} />);
                container.setProps(newProps);
                container.instance().getParams = jest.fn().mockReturnValue(params);

                //Assert
                promise.then(() => {
                    expect(container.instance().state.username).toEqual('test');
                });
            });
        });

        describe('handleChange', () => {
            const props = {
                getCustomerSuggestions: jest.fn()
            };
            it('should call setState when change username field', () => {
                //Arrange
                const expected = {
                    username: 'test',
                    isGuest: false,
                    showEmptyConfirmPopup: false,
                    showEmptyCustomerInfoPopup: false
                };
                const container = shallow(<Filter {...props} />);

                //Act
                container.instance().handleChange({ target: { value: 'test', name: 'username' } });

                //Assert
                expect(container.state()).toEqual(expected);
            });

            it('should call setState when change IsGuest field', () => {
                //Arrange
                const expected = {
                    username: '',
                    isGuest: true,
                    showEmptyConfirmPopup: false,
                    showEmptyCustomerInfoPopup: false
                };
                const container = shallow(<Filter {...props} />);

                //Act
                container.instance().handleChange({ target: { type: 'checkbox', checked: true, name: 'isGuest' } });

                //Assert
                expect(container.state()).toEqual(expected);
            });
        });

        describe('getParams', () => {
            it('getParams with valid filter', () => {
                // Arrange
                const state = {
                    username: '',
                    isGuest: false
                };
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
                };
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

        describe('getCustomerInfo', () => {
            it('should call exactly function when data is empty and not is guest', () => {
                // Arrange
                const promise = Promise.resolve({});
                const state = {
                    username: 'name',
                    isGuest: false,
                    showEmptyConfirmPopup: false,
                    showEmptyCustomerInfoPopup: false
                };

                const props = {
                    setGridParams: jest.fn(),
                    getCustomerInfo: jest.fn(() => promise),
                    customerInfo: { custId: 1 }
                };

                const filter = shallow(<Filter {...props} />);
                filter.instance().setState(state);

                // Action
                filter.instance().getCustomerInfo();

                //Assert
                expect(props.customerInfo).toEqual({ custId: 1 });
                expect(filter.instance().state.showEmptyConfirmPopup).toEqual(false);
            });

            it('should call exactly function when data is empty and is guest', () => {
                // Arrange
                const promise = Promise.resolve({});
                const state = {
                    username: 'name',
                    isGuest: true,
                    showEmptyConfirmPopup: false,
                    showEmptyCustomerInfoPopup: false
                };

                const props = {
                    setGridParams: jest.fn(),
                    getCustomerInfo: jest.fn(() => promise),
                    customerInfo: { custId: 1 }
                };

                const filter = shallow(<Filter {...props} />);
                filter.instance().setState(state);

                // Action
                filter.instance().getCustomerInfo();

                //Assert
                expect(props.customerInfo).toEqual({ custId: 1 });
                expect(filter.instance().state.showEmptyCustomerInfoPopup).toEqual(false);
            });
        });

        describe('handleSubmit', () => {
            it('should call exactly function', () => {
                // Arrange
                const promise = Promise.resolve({});
                const event = {
                    preventDefault: jest.fn()
                };

                const props = {
                    setGridParams: jest.fn(),
                    getCustomerInfo: jest.fn(() => promise)
                };

                const filter = shallow(<Filter {...props} />);
                filter.instance().getCustomerInfo = jest.fn();

                // Action
                filter.instance().handleSubmit(event);

                // Assert
                expect(filter.instance().getCustomerInfo).toHaveBeenCalled();
            });

            it('should show popup when customerInfo is empty', () => {
                // Arrange
                const promise = Promise.resolve({});
                const params = { name: 'name' };
                const event = {
                    preventDefault: jest.fn()
                };

                const props = {
                    customerInfo: null,
                    setGridParams: jest.fn(),
                    getCustomerInfo: jest.fn(() => promise)
                };

                const filter = shallow(<Filter {...props} />);
                filter.instance().getParams = jest.fn();
                filter.instance().getParams.mockReturnValueOnce(params);

                // Action
                filter.instance().handleSubmit(event);

                // Assert
                promise.then(() => {
                    expect(props.setEmptyCustomerInfoPopup).toHaveBeenCalled();
                });
            });
        });

        describe('handleGetCustomerIsGuest', () => {
            it('should call exactly functions', () => {
                // Arrange
                const props = {
                    customerInfo: null,
                    setGridParams: jest.fn(),
                    getCustomerInfo: jest.fn(() => promise)
                };

                const filter = shallow(<Filter {...props} />);
                filter.instance().handleCloseEmptyConfirm = jest.fn();
                filter.instance().getCustomerInfo = jest.fn();

                //Act
                filter.instance().handleGetCustomerIsGuest();

                //Assert
                expect(filter.instance().handleCloseEmptyConfirm).toHaveBeenCalled();
                expect(filter.instance().getCustomerInfo).toHaveBeenCalled();
            });
        });

        describe('handleCloseEmptyConfirm', () => {
            it('should call exactly functions', () => {
                // Arrange
                const props = {
                    customerInfo: null,
                    setGridParams: jest.fn(),
                    getCustomerInfo: jest.fn(() => promise)
                };

                const filter = shallow(<Filter {...props} />);

                //Act
                filter.instance().handleCloseEmptyConfirm();

                //Assert
                expect(filter.state().showEmptyConfirmPopup).toEqual(false);
            });
        });

        describe('handleCloseEmptyCustomerInfoPopup', () => {
            it('should call exactly functions', () => {
                // Arrange
                const props = {
                    customerInfo: null,
                    setGridParams: jest.fn(),
                    getCustomerInfo: jest.fn(() => promise)
                };

                const filter = shallow(<Filter {...props} />);

                //Act
                filter.instance().handleCloseEmptyCustomerInfoPopup();

                //Assert
                expect(filter.state().showEmptyCustomerInfoPopup).toEqual(false);
            });
        });

        describe('handleChangeSuggestion', () => {
            it('should call exactly function', () => {
                //Arrange
                const item = "name";
                const expected = {
                    username: 'name',
                    isGuest: false,
                    showEmptyConfirmPopup: false,
                    showEmptyCustomerInfoPopup: false
                };
                const container = shallow(<Filter />);

                //Act
                container.instance().handleChangeSuggestion(item);

                //Assert
                expect(container.state()).toEqual(expected);
            });
        });

        describe('debounceUserNameInputChange', () => {
            jest.useFakeTimers();
            it('searchText is valid', () => {
                //Arrange
                const searchText = 'length > 2';
                const props = {
                    getCustomerSuggestions: jest.fn(),
                    setCustomerSuggestions: jest.fn()
                };
                const params = {
                    username: 'test',
                    isGuest: false
                };
                const container = shallow(<Filter {...props} />);
                container.instance().getParams = jest.fn().mockReturnValue(params);

                //Act
                container.instance().debounceUserNameInputChange(searchText);
                jest.runAllTimers();

                //Assert
                expect(props.getCustomerSuggestions).toHaveBeenCalledWith(params);
            });

            it('searchText is invalid', () => {
                //Arrange
                const searchText = '1';
                const props = {
                    getCustomerSuggestions: jest.fn(),
                    setCustomerSuggestions: jest.fn()
                };
                const container = shallow(<Filter {...props} />);

                //Act
                container.instance().debounceUserNameInputChange(searchText);
                jest.runAllTimers();

                //Assert
                expect(props.setCustomerSuggestions).toHaveBeenCalledWith([]);
            });
        });

        describe('render', () => {
            it('should call exacly functions ', () => {
                //Arrange
                const container = shallow(<Filter />);
                container.instance().handleChangeSuggestion = jest.fn();
                container.instance().debounceUserNameInputChange = jest.fn();

                //Act
                container.find(AutoComplete).first().props().onChange();
                container.find(AutoComplete).first().props().onInputChange();

                //Assert
                expect(container.instance().handleChangeSuggestion).toHaveBeenCalled();
                expect(container.instance().debounceUserNameInputChange).toHaveBeenCalled();
            });
        });
    });
});