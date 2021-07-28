import React from 'react';
import { shallow } from 'enzyme';
import { VerifyCustomerResult } from '../VerifyCustomerResult';
import LangHelper from '@jsroot/common/langHelper';

describe('VerifyCustomerResult', () => {
    beforeAll(() => {
        LangHelper.getResource = jest.fn(key => key);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('renderCustomerItem', () => {
        it('should match snapshot when customer is valid', () => {
            // Arrange
            const customer = { custId: 1, username: 'test' };
            const container = shallow(<VerifyCustomerResult />).instance();

            // Act
            const actual = container.renderCustomerItem(customer, 1);

            // Assert
            expect(shallow(actual).html()).toMatchSnapshot();
        });

        it('should match snapshot when customer is guest', () => {
            // Arrange
            const customer = { custId: -1, username: 'test' };
            const container = shallow(<VerifyCustomerResult />).instance();

            // Act
            const actual = container.renderCustomerItem(customer, 1);

            // Assert
            expect(shallow(actual).html()).toMatchSnapshot();
        });

        it('should match snapshot when customer is invalid', () => {
            // Arrange
            const customer = { custId: 0, username: 'test' };
            const container = shallow(<VerifyCustomerResult />).instance();

            // Act
            const actual = container.renderCustomerItem(customer, 1);

            // Assert
            expect(shallow(actual).html()).toMatchSnapshot();
        });

        it('should call correct function when click on delete icon', () => {
            // Arrange
            const props = {
                verifyCustomerResults: [],
                relatedCustomerResults: [],
                removeCustomer: jest.fn()
            };
            const customer = { custId: 1, username: 'test' };
            const container = shallow(<VerifyCustomerResult />).instance();
            const item = shallow(container.renderRelatedCustomerItem(customer, 1));

            // Act
            item.find('span').at(0).props().onClick();

            // Assert
            expect(props.removeCustomer).toHaveBeenCalledWith(customer);
        });
    });

    describe('render', () => {
        it('should match snapshot when add related customer', () => {
            // Arrange
            const props = {
                verifyCustomerResults: [
                    { custId: 1, username: 'sa', isHeadline: true, isDirectAccount: false },
                    { custId: -1, username: 'test', isHeadline: false, isDirectAccount: false },
                    { custId: 0, username: 'test 1', isHeadline: false, isDirectAccount: false }
                ],
                relatedCustomerResults: []
            };
            const container = shallow(<VerifyCustomerResult {...props} />).instance();

            // Act
            const actual = container.render();

            // Assert
            expect(shallow(actual).html()).toMatchSnapshot();
        });

        it('should match snapshot when edit related customer', () => {
            // Arrange
            const props = {
                verifyCustomerResults: [
                    { custId: 1, username: 'sa', isHeadline: true, isDirectAccount: false },
                    { custId: -1, username: 'test', isHeadline: false, isDirectAccount: false },
                    { custId: 0, username: 'test 1', isHeadline: false, isDirectAccount: false }
                ],
                relatedCustomerResults: [{ headlineId: 1, custId: 1, username: 'sa' }]
            };
            const container = shallow(<VerifyCustomerResult {...props} />).instance();

            // Act
            const actual = container.render();

            // Assert
            expect(shallow(actual).html()).toMatchSnapshot();
        });
    });
});