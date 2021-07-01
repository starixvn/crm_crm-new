import React from 'react';
import { Filter } from '../Filter';
import { shallow, mount } from 'enzyme';
import LangHelper from '@jsroot/common/langHelper';

describe('filter', () => {
    beforeAll(() => {
        LangHelper.getResource = jest.fn((key) => key);
    });
    afterAll(() => {
        jest.clearAllMocks();
    });

    it('should render correctly', () => {
        // Act
        const container = shallow(<Filter />);

        // Assert
        expect(container).toMatchSnapshot();
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
            it('should call setState when change username field', () => {
                //Arrange
                const expected = {
                    username: 'test',
                    isGuest: false
                }
                const container = shallow(<Filter />);

                //Act
                container.instance().handleChange({ target: { value: 'test', name: 'username' } });

                //Assert
                expect(container.state()).toEqual(expected);
            });

            it('should call setState when change IsGuest field', () => {
                //Arrange
                const expected = {
                    username: '',
                    isGuest: true
                }
                const container = shallow(<Filter />);

                //Act
                container.instance().handleChange({ target: { type: 'checkbox', checked: true, name: 'isGuest' } });

                //Assert
                expect(container.state()).toEqual(expected);
            });
        });

        describe('getParams', () => {
            it('should return expected params', () => {
                // Arrange
                const expected = {
                    username: '',
                    isGuest: false
                };
                const container = shallow(<Filter />).instance();

                // Act
                const actual = container.getParams();

                // Assert
                expect(actual).toEqual(expected);
            });
        });

        describe('handleSubmit', () => {
            it('should call exactly function', () => {
                //Arrange
                const expectedParam = {
                    username: 'test',
                    isGuest: false
                };
                const props = {
                    setGridParams: jest.fn(),
                    getCustomerInfo: jest.fn()
                }
                const container = shallow(<Filter {...props} />).instance();
                container.getParams = jest.fn(() => expectedParam);

                //Act
                container.handleSubmit({ preventDefault: jest.fn() });

                //Assert
                expect(props.setGridParams).toHaveBeenCalledWith(expectedParam);
                expect(props.getCustomerInfo).toHaveBeenCalledWith(expectedParam);
            });
        });
    });
});