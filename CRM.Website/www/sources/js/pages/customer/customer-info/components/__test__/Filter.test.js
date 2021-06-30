import React from 'react';
import { Filter } from '../Filter';
import { shallow } from 'enzyme';
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
        describe('handleChange', () => {
            it('should call setState when change user name field', () => {
                //Arrange
                const expected = {
                    UserName: 'test',
                    IsGuest: false
                }
                const container = shallow(<Filter />);

                //Act
                container.instance().handleChange({ target: { value: 'test', name: 'UserName' } });

                //Assert
                expect(container.state()).toEqual(expected);
            });

            it('should call setState when change IsGuest field', () => {
                //Arrange
                const expected = {
                    UserName: '',
                    IsGuest: true
                }
                const container = shallow(<Filter />);

                //Act
                container.instance().handleChange({ target: { type: 'checkbox', checked: true, name: 'IsGuest' } });

                //Assert
                expect(container.state()).toEqual(expected);
            });
        });

        describe('getParams', () => {
            it('should return expected params', () => {
                // Arrange
                const expected = {
                    UserName: '',
                    IsGuest: false
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
                    UserName: 'test',
                    IsGuest: false
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