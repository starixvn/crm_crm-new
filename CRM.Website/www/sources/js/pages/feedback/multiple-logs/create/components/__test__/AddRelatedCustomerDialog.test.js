import React from 'react';
import { Modal, Alert } from 'react-bootstrap';
import { AddRelatedCustomerDialog } from '../AddRelatedCustomerDialog';
import RelatedCustomerGrid from '../RelatedCustomerGrid';
import { shallow } from 'enzyme';
import LangHelper from '@jsroot/common/langHelper';
import Site from '@jsroot/common/site';
import toJson from 'enzyme-to-json';

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
                custId: 1,
                username: 'test',
                isValid: true
            };
            const container = shallow(<AddRelatedCustomerDialog />).instance();

            // Act
            const actual = container.renderRelatedCustomerItem(customer, 1);

            // Assert
            expect(toJson(shallow(actual).html())).toMatchSnapshot();
        });

        it('should match snapshot when customer is invalid', () => {
            // Arrange
            const customer = {
                custId: 1,
                username: 'test',
                isValid: false
            };
            const container = shallow(<AddRelatedCustomerDialog />).instance();

            // Act
            const actual = container.renderRelatedCustomerItem(customer, 1);

            // Assert
            expect(shallow(actual).html()).toMatchSnapshot();
        });

        it('should call correct function when click on delete icon', () => {
            // Arrange
            const customer = {
                custId: 1,
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
            const container = shallow(<AddRelatedCustomerDialog />).instance();
            container.inputRef = {
                value: 'test'
            };
            container.setState = jest.fn();
            container.state = { relatedCustomers: [{ custId: 1, username: 'sa', isValid: true }] };

            // Act
            container.addRelatedCustomerItem();
            jest.runAllTimers();

            // Assert
            expect(container.setState).not.toHaveBeenCalled();
            expect(container.state.relatedCustomers).toEqual([{ custId: 1, username: 'sa', isValid: true }]);
            expect(container.inputRef.value).toEqual('');
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

    describe('handleClearRelatedCustomerInput', () => {
        it('should do nothing when RelatedCustomerInput is inputed', () => {
            // Arrange
            const container = shallow(<AddRelatedCustomerDialog />).instance();
            container.setState = jest.fn();
            container.inputRef = { value: 'sa' };

            // Act
            container.handleClearRelatedCustomerInput();

            // Assert
            expect(container.setState).not.toHaveBeenCalled();
        });

        it('should update state correctly when isSelectedAll = true', () => {
            // Arrange
            const container = shallow(<AddRelatedCustomerDialog />).instance();
            container.setState({
                isSelectedAll: true,
                relatedCustomers: ['sa', 'test'],
                errMsgs: ['You are not allowed to input over 2 usernames. Please check it!']
            });
            container.inputRef = { value: '' };

            // Act
            container.handleClearRelatedCustomerInput();

            // Assert
            expect(container.state.isSelectedAll).toBeFalsy();
            expect(container.state.relatedCustomers).toEqual([]);
            expect(container.state.errMsgs).toEqual([]);
        });

        it('should update state correctly when isSelectedAll = false', () => {
            // Arrange
            const container = shallow(<AddRelatedCustomerDialog />).instance();
            container.setState({
                isSelectedAll: false,
                relatedCustomers: ['sa', 'test'],
                errMsgs: ['You are not allowed to input over 2 usernames. Please check it!']
            });
            container.inputRef = { value: '' };

            // Act
            container.handleClearRelatedCustomerInput();

            // Assert
            expect(container.state.isSelectedAll).toBeFalsy();
            expect(container.state.relatedCustomers).toEqual(['sa']);
            expect(container.state.errMsgs).toEqual(['You are not allowed to input over 2 usernames. Please check it!']);
        });
    });

    describe('handleKeyDownRelatedCustomer', () => {
        it('should update state correctly when press ctrl + a', () => {
            // Arrange
            const event = { ctrlKey: true, keyCode: 65 };
            const container = shallow(<AddRelatedCustomerDialog />).instance();
            container.setState({ isSelectedAll: false });
            container.inputRef = { value: '' };

            // Act
            container.handleKeyDownRelatedCustomer(event);

            // Assert
            expect(container.state.isSelectedAll).toBeTruthy();
        });

        it('should do as expected when press backspace', () => {
            // Arrange
            const event = { ctrlKey: false, keyCode: 8 };
            const container = shallow(<AddRelatedCustomerDialog />).instance();
            container.handleClearRelatedCustomerInput = jest.fn();

            // Act
            container.handleKeyDownRelatedCustomer(event);

            // Assert
            expect(container.handleClearRelatedCustomerInput).toHaveBeenCalled();
        });

        it('should do as expected when press enter or space or semicolon', () => {
            // Arrange
            const event = { ctrlKey: false, keyCode: 13, preventDefault: jest.fn() };
            const container = shallow(<AddRelatedCustomerDialog />).instance();
            container.addRelatedCustomerItem = jest.fn();
            container.inputRef = { value: 'sa,' };

            // Act
            container.handleKeyDownRelatedCustomer(event);

            // Assert
            expect(event.preventDefault).toHaveBeenCalled();
            expect(container.inputRef.value).toEqual('sa');
            expect(container.addRelatedCustomerItem).toHaveBeenCalledWith('sa');
        });
    });

    describe('handlePasteRelatedCustomer', () => {
        it('should do as expected when total customer input is under maximumRelatedCustomers', () => {
            // Arrange
            const event = { clipboardData: { getData: jest.fn(() => 'test1,test2') } };
            const container = shallow(<AddRelatedCustomerDialog />).instance();
            container.setState = jest.fn();
            container.addRelatedCustomerItem = jest.fn();

            // Act
            container.handlePasteRelatedCustomer(event);

            // Assert
            expect(container.setState).not.toHaveBeenCalled();
            expect(container.addRelatedCustomerItem).toHaveBeenCalledTimes(2);
            expect(container.addRelatedCustomerItem.mock.calls[0]).toEqual(['test1']);
            expect(container.addRelatedCustomerItem).toHaveBeenLastCalledWith('test2');
        });

        it('should do as expected when total customer input is over maximumRelatedCustomers', () => {
            // Arrange
            const errMsgs = ['You are not allowed to input over 2 usernames. Please check it!'];
            const event = { clipboardData: { getData: jest.fn(() => 'test1,test2,test3') } };
            const container = shallow(<AddRelatedCustomerDialog />).instance();
            container.setState = jest.fn();
            container.maximumRelatedCustomers = 2;
            container.inputRef = { value: 'test1,test2,test3' };
            container.addRelatedCustomerItem = jest.fn();

            // Act
            container.handlePasteRelatedCustomer(event);
            jest.runAllTimers();

            // Assert
            expect(container.setState).toHaveBeenCalledWith({ errMsgs });
            expect(container.addRelatedCustomerItem).not.toHaveBeenCalled();
            expect(container.inputRef.value).toEqual('');
        });
    });

    describe('handleBlurRelatedCustomer', () => {
        it('should do as expected', () => {
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
        it('should do as expected', () => {
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

            // Act
            container.verifyRelatedCustomers();

            // Assert
            expect(LangHelper.formatString).toHaveBeenCalledWith('FieldRequired', 'Username');
            expect(container.state.errMsgs).toEqual(['error']);
            expect(container.state.verified).toBeTruthy();
        });

        it('should do as expected when related customers include invalid customer', async () => {
            // Arrange
            Site.blockUI = jest.fn();
            Site.unblockUI = jest.fn();

            const response = {
                data: [
                    { headlineId: 1, custId: 1, username: 'sa', resultTypeId: 0 },
                    { custId: 2, username: 'test 1', resultTypeId: 1 }
                ]
            };
            const expectedErrMsgs = [
                'Invalid usernames: test 1'
            ];
            const promise = Promise.resolve(response);
            const props = {
                addRelatedCustomerDialog: {
                    isEdit: false,
                    relatedCustomers: [{ custId: 1, username: 'sa' }, { custId: 2, username: 'test 1' }],
                    relatedCustomerResults: []
                },
                verifyCustomerResults: [{ custId: 1, isHeadline: true }],
                verifyRelatedCustomers: jest.fn(() => promise),
                setRelatedCustomerResults: jest.fn()
            };
            const container = shallow(<AddRelatedCustomerDialog {...props} />).instance();

            // Act
            container.verifyRelatedCustomers();
            await promise;

            // Assert
            expect(props.verifyRelatedCustomers).toHaveBeenCalledWith({ headlineIds: '', username: 'sa,test 1' });
            expect(container.state.relatedCustomers).toEqual([
                { custId: 1, username: 'sa', isValid: false },
                { custId: 2, username: 'test 1', isValid: false }
            ]);
            expect(container.state.errMsgs[0]).toEqual(expectedErrMsgs[0]);
            expect(container.state.verified).toBeTruthy();
        });

        it('should do as expected when related customers are valid', async () => {
            // Arrange
            Site.blockUI = jest.fn();
            Site.unblockUI = jest.fn();
            const response = {
                data: [{ headlineId: 1, custId: 1, username: 'sa', resultTypeId: 0 }]
            };
            const promise = Promise.resolve(response);
            const props = {
                addRelatedCustomerDialog: {
                    isEdit: true,
                    relatedCustomers: [{ custId: 1, username: 'sa' }, { custId: 2, username: 'test 1' }],
                    relatedCustomerResults: []
                },
                verifyCustomerResults: [{ custId: 1, isHeadline: true }],
                verifyRelatedCustomers: jest.fn(() => promise),
                setRelatedCustomerResults: jest.fn(() => promise)
            };
            const container = shallow(<AddRelatedCustomerDialog {...props} />).instance();
            // Act
            container.verifyRelatedCustomers();
            await promise;

            // Assert
            expect(props.verifyRelatedCustomers).toHaveBeenCalledWith({ headlineIds: '', username: 'sa,test 1' });           
            expect(container.state.relatedCustomers).toEqual([
                { custId: 1, username: 'sa', isValid: false },
                { custId: 2, username: 'test 1', isValid: true }
            ]);
            expect(container.state.verified).toBeTruthy();
        });
    });

    describe('handleSubmit', () => {
        it('should do as expected', () => {
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

    describe('render', () => {
        it('should renders correctly with default state and props', () => {
            // Act
            const container = shallow(<AddRelatedCustomerDialog />);

            // Assert
            expect(container.find(RelatedCustomerGrid).length).toBe(1);

            const modal = container.find(Modal);
            expect(modal.props().className).toEqual('add-related-customer-modal-dialog');
            expect(modal.find(Modal.Title).html()).toEqual('<div class="modal-title">AddRelatedCustomers</div>');
            expect(modal.find(Alert).length).toBe(0);
        });

        it('should renders correctly with errMsgs', () => {
            // Act
            const container = shallow(<AddRelatedCustomerDialog />);
            container.setState({ errMsgs: ['You are not allowed to input over 2 usernames. Please check it!'] });

            // Assert
            expect(container.find(RelatedCustomerGrid).length).toBe(1);

            const modal = container.find(Modal);
            expect(modal.props().className).toEqual('add-related-customer-modal-dialog');
            expect(modal.find(Modal.Title).html()).toEqual('<div class="modal-title">AddRelatedCustomers</div>');
            expect(modal.find(Alert).html()).toEqual('<div role="alert" class="fade alert alert-danger show">' +
                '<ul class="list-message-error"><li>You are not allowed to input over 2 usernames. Please check it!</li></ul>' +
                '</div>');
        });
    });
});