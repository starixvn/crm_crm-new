import React from 'react';
import Filter from '../Filter';
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
            breadcrumb: []
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

        describe('handleSubmit', () => {
            it('should call exactly function', () => {
                // Arrange
                const promise = Promise.resolve({});
                const event = {
                    preventDefault: jest.fn()
                };

                const props = {
                    setGridParams: jest.fn(),
                    getCustomerInfo: jest.fn(() => promise),
                    getDataGrid:  jest.fn(() => promise)
                };

                const filter = shallow(<Filter {...props} />);
                filter.instance().getCustomerInfo = jest.fn();

                // Action
                filter.instance().handleSubmit(event);

                // Assert
                expect(window.location.search).toEqual('');
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
                    getCustomerInfo: jest.fn(() => promise),
                    getDataGrid: jest.fn(() => promise)
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
    });
});