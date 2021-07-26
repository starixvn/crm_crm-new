import React from 'react';
import { AddRelatedCustomerDialog } from '../AddRelatedCustomerDialog';
import { shallow, mount } from 'enzyme';
import LangHelper from '@jsroot/common/langHelper';

describe('AddRelatedCustomerDialog', () => {
    beforeAll(() => {
        jest.useFakeTimers();
        LangHelper.getResource = jest.fn(key => key);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('renderRelatedCustomerItem', () => {
        it('should match snapshot when customer is valid', () => {
            // Arrange
            const customer = {
                custId: '1',
                username: 'test',
                isValid: true
            };
            const container = shallow(<AddRelatedCustomerDialog />);

            // Act
            const actual = container.instance().renderRelatedCustomerItem(customer, 1);

            // Assert
            expect(shallow(actual).html()).toMatchSnapshot();
        });

        it('should match snapshot when customer is invalid', () => {
            // Arrange
            const customer = {
                custId: '1',
                username: 'test',
                isValid: false
            };
            const container = shallow(<AddRelatedCustomerDialog />);

            // Act
            const actual = container.instance().renderRelatedCustomerItem(customer, 1);

            // Assert
            expect(shallow(actual).html()).toMatchSnapshot();
        });

        it('should call correct function when click on delete icon', () => {
            // Arrange
            const customer = {
                custId: '1',
                username: 'test',
                isValid: false
            };
            const container = shallow(<AddRelatedCustomerDialog />).instance();
            container.removeRelatedCustomerItem = jest.fn();
            const item = shallow(container.renderRelatedCustomerItem(customer, 1));

            // Act
            item.find('span').at(1).props().onClick();

            // Assert
            expect(container.removeRelatedCustomerItem).toHaveBeenCalledWith(customer);
        });
    });

    describe('addRelatedCustomerItem', () => {
        it('should not update state when username is invalid', () => {
            // Arrange
            const container = shallow(<AddRelatedCustomerDialog />);
            container.instance().inputRef = {
                value: 'test'
            };
            container.setState = jest.fn();
            container.state = { relatedCustomers: [{ custId: 1, username: 'sa', isValid: true }] };

            // Act
            container.instance().addRelatedCustomerItem();
            jest.runAllTimers();

            // Assert
            expect(container.setState).not.toHaveBeenCalled();
            expect(container.state.relatedCustomers).toEqual([{ custId: 1, username: 'sa', isValid: true }]);
            expect(container.instance().inputRef.value).toEqual('');
        });

        it('should update state when username is valid', () => {
            // Arrange
            const container = shallow(<AddRelatedCustomerDialog />).instance();
            container.inputRef = {
                value: 'test'
            };
            container.setState({ relatedCustomers: [{ index: 1, custId: 1, username: 'sa', isValid: true }] });

            // Act
            container.addRelatedCustomerItem('test');
            jest.runAllTimers();

            // Assert
            expect(container.state.relatedCustomers).toEqual([
                { index: 1, custId: 1, username: 'sa', isValid: true },
                { index: 2, username: 'test', isValid: true }
            ]);
            expect(container.inputRef.value).toEqual('');
        });

        it('should truncate text and update state when username is over characters long', () => {
            // Arrange
            const container = shallow(<AddRelatedCustomerDialog />).instance();
            container.inputRef = {
                value: 'test'
            };
            container.setState({ relatedCustomers: [{ index: 1, custId: 1, username: 'sa', isValid: true }] });

            // Act
            container.addRelatedCustomerItem('test12345678910test12345678910 test');
            jest.runAllTimers();

            // Assert
            expect(container.state.relatedCustomers).toEqual([
                { index: 1, custId: 1, username: 'sa', isValid: true },
                { index: 2, username: 'test12345678910test12345678910...', isValid: true }
            ]);
            expect(container.inputRef.value).toEqual('');
        });
    });

    describe('removeRelatedCustomerItem', () => {
        it('should remove customer and update state when customer is exist', () => {
            // Arrange
            const customers = [{ custId: 1, username: 'sa' }, { custId: 2, username: 'test' }];
            const container = shallow(<AddRelatedCustomerDialog />).instance();
            container.state = {
                relatedCustomers: customers,
                errMsgs: ['error']
            };

            // Act
            container.removeRelatedCustomerItem(customers[0]);

            // Assert
            expect(container.state.relatedCustomers).toEqual([{ custId: 2, username: 'test' }]);
            expect(container.state.errMsgs).toEqual(['error']);
        });

        it('should reset errMsgs when customers is empty', () => {
            // Arrange
            const customers = [{ custId: 1, username: 'sa' }];
            const container = shallow(<AddRelatedCustomerDialog />).instance();
            container.state = {
                relatedCustomers: customers,
                errMsgs: ['error']
            };

            // Act
            container.removeRelatedCustomerItem(customers[0]);

            // Assert
            expect(container.state.relatedCustomers).toEqual([]);
            expect(container.state.errMsgs).toEqual([]);
        });
    });

    describe('handleBlurRelatedCustomer', () => {
        it('when called - do as expected', () => {
            // Arrange
            const container = shallow(<AddRelatedCustomerDialog />).instance();
            container.setState = jest.fn();
            container.inputRef = { value: 'test' };
            container.addRelatedCustomerItem = jest.fn();

            // Act
            container.handleBlurRelatedCustomer();

            // Assert
            expect(container.setState).toHaveBeenCalledWith({ isSelectedAll: false });
            expect(container.addRelatedCustomerItem).toHaveBeenCalledWith('test');
        });
    });

    describe('handleCloseAddRelatedCustomerDialog', () => {
        it('when called - do as expected', () => {
            // Arrange
            const props = {
                addRelatedCustomerDialog: {
                    isEdit: false,
                    relatedCustomers: [],
                    relatedCustomerResults: []
                },
                setRelatedCustomerResults: jest.fn(),
                setAddRelatedCustomerDialog: jest.fn()
            };
            const container = shallow(<AddRelatedCustomerDialog {...props} />).instance();

            // Act
            container.handleCloseAddRelatedCustomerDialog();

            // Assert
            expect(props.setRelatedCustomerResults).toHaveBeenCalledWith([]);
            expect(props.setAddRelatedCustomerDialog).toHaveBeenCalledWith({ show: false });
        });
    });

    describe('verifyRelatedCustomers', () => {
        it('should update errMsgs state when add related customer and relatedCustomers are empty', () => {
            // Arrange
            LangHelper.formatString = jest.fn(() => 'error');
            const container = shallow(<AddRelatedCustomerDialog />).instance();
            container.setState = jest.fn();

            // Act
            container.verifyRelatedCustomers();

            // Assert
            expect(LangHelper.formatString).toHaveBeenCalledWith('FieldRequired', 'Username');
            expect(container.setState).toHaveBeenCalledWith({ errMsgs: ['error'] });
        });
    });

    describe('handleSubmit', () => {
        it('when called - do as expected', () => {
            // Arrange
            const props = {
                addRelatedCustomerDialog: {
                    isEdit: false,
                    relatedCustomers: [],
                    relatedCustomerResults: []
                },
                setAddRelatedCustomerDialog: jest.fn()
            };
            const container = shallow(<AddRelatedCustomerDialog {...props} />).instance();

            // Act
            container.handleSubmit();

            // Assert
            expect(props.setAddRelatedCustomerDialog).toHaveBeenCalledWith({ show: false });
        });
    });
});