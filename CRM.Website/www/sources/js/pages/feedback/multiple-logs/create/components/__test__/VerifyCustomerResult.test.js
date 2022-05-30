import React from 'react';
import { shallow } from 'enzyme';
import { VerifyCustomerResult } from '../VerifyCustomerResult';
import LangHelper from '@jsroot/common/langHelper';
import toJson from 'enzyme-to-json';

describe('VerifyCustomerResult', () => {
    beforeAll(() => {
        LangHelper.getResource = jest.fn(key => key);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('handleOpenAddRelatedCustomerDialog', () => {
        it('should call correctly function', () => {
            // Arrange
            const props = {
                relatedCustomerResults: [
                    {
                        custId: 1, username: 'sa',
                        relatedCustomers: [
                            { headlineId: 1, headline: 'sa', custId: 1, username: 'sa' },
                            { headlineId: 1, headline: 'sa', custId: 2, username: 'sa1' }
                        ]
                    },
                    {
                        custId: 3, username: 'test',
                        relatedCustomers: [
                            { headlineId: 3, headline: 'test', custId: 2, username: 'sa1' },
                            { headlineId: 3, headline: 'test', custId: 3, username: 'test1' }
                        ]
                    }
                ],
                setAddRelatedCustomerDialog: jest.fn()
            };
            const container = shallow(<VerifyCustomerResult {...props} />).instance();

            // Act
            container.handleOpenAddRelatedCustomerDialog();

            //
            expect(props.setAddRelatedCustomerDialog).toHaveBeenCalledWith({
                show: true,
                isEdit: true,
                relatedCustomers: [
                    { index: 1, username: 'sa', isValid: true },
                    { index: 2, username: 'sa1', isValid: true },
                    { index: 3, username: 'test1', isValid: true }
                ],
                relatedCustomerResults: props.relatedCustomerResults
            });
        });
    });

    describe('renderCustomerItem', () => {
        it('should match snapshot when customer is valid', () => {
            // Arrange
            const customer = { custId: 1, username: 'test' };
            const container = shallow(<VerifyCustomerResult />).instance();

            // Act
            const actual = container.renderCustomerItem(customer, 1);

            // Assert
            expect(toJson(shallow(actual).html())).toMatchSnapshot();
        });

        it('should match snapshot when customer is guest', () => {
            // Arrange
            const customer = { custId: -1, username: 'test' };
            const container = shallow(<VerifyCustomerResult />).instance();

            // Act
            const actual = container.renderCustomerItem(customer, 1);

            // Assert
            expect(toJson(shallow(actual).html())).toMatchSnapshot();
        });

        it('should match snapshot when customer is invalid', () => {
            // Arrange
            const customer = { custId: 0, username: 'test' };
            const container = shallow(<VerifyCustomerResult />).instance();

            // Act
            const actual = container.renderCustomerItem(customer, 1);

            // Assert
            expect(toJson(shallow(actual).html())).toMatchSnapshot();
        });

        it('should call correct function when click on delete icon', () => {
            // Arrange
            const props = {
                verifyCustomerResults: [],
                relatedCustomerResults: [],
                removeCustomer: jest.fn()
            };
            const customer = { custId: 1, username: 'test' };
            const container = shallow(<VerifyCustomerResult {...props} />).instance();
            const item = shallow(container.renderCustomerItem(customer, 1));

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
                    { custId: 1, username: 'sa', isHeadline: true, isDirectAccount: false, isSiteActive: false, isLicensee: true },
                    { custId: -1, username: 'test', isHeadline: false, isDirectAccount: false, isSiteActive: false, isLicensee: true },
                    { custId: 0, username: 'test 1', isHeadline: false, isDirectAccount: false, isSiteActive: false, isLicensee: true }
                ],
                relatedCustomerResults: []
            };

            // Act
            const container = shallow(<VerifyCustomerResult {...props} />);

            // Assert
            expect(toJson(container.html())).toMatchSnapshot();
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

            // Act
            const container = shallow(<VerifyCustomerResult {...props} />);

            // Assert
            expect(toJson(container.html())).toMatchSnapshot();
        });
    });
});