import React from 'react';
import AutoComplete from '@jsroot/components/AutoComplete';
import { Button, Form } from 'react-bootstrap';
import LangHelper from '@jsroot/common/langHelper';
import VerifySection from '../VerifySection';
import { shallow } from 'enzyme';

describe('VerifySection', () => {
    beforeAll(() => {
        LangHelper.getResource = jest.fn((key) => key);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    const props = {
        handleVerifyCreateRelatedCustomer: jest.fn(),
        deleteVerifyCreateCustomer: jest.fn(),
        relatedCustomers: [{id:1, name: 'test'}],
        handleChangeRefTicket: jest.fn(),
        handleClickFillEvent: jest.fn(),
        feedbackSubjectTemplates: ['sa'],
        handleChangeVerifySection: jest.fn(),
        handlePasteCustomer: jest.fn(),
        onPasteRefTicketHandler: jest.fn(),
        verifySection:{
            noInquiries: '',
            customerNameInput: '',
            ticketRefInput: '',
            subject: ''
        }
    };

    describe('validateRefInput', () => {
        it('should prevent when invalid input ref', () => {
            // Arrange
            const verify = shallow(<VerifySection {...props}/>);
            const event ={
                target: {name: 'noInquiries', value: 'test'}
                , which: 1, preventDefault: jest.fn(), key: ''
            };

            // Act
            verify.instance().validateRefInput(event);

            // Assert
            expect(event.preventDefault).toHaveBeenCalled();
        });
    });

    describe('VerifySection', () => {
        it('should handle onChange when no inquiries is changed', () => {
            // Arrange
            const verify = shallow(<VerifySection {...props}/>);
            const event ={target: {name: 'noInquiries', value: 'test'}};

            // Act
            verify.find(Form.Control).at(0).simulate('change', event);

            // Assert
            expect(props.handleChangeVerifySection).toHaveBeenCalledWith('noInquiries', 'test');
        });

        it('should handle onChange when related is changed', () => {
            // Arrange
            const verify = shallow(<VerifySection {...props}/>);
            const event ={target: {name: 'relatedTo', value: 'test'}};
            
            // Act
            verify.find(Form.Control).at(1).simulate('change', event);

            // Assert
            expect(props.handleChangeVerifySection).toHaveBeenCalledWith('relatedTo', 'test');
        });

        it('should handle onPaste when paste customer input', () => {
            // Arrange
            const verify = shallow(<VerifySection {...props}/>);
            const event = { clipboardData: { getData: jest.fn().mockReturnValueOnce('event') } };

            // Act
            verify.find(Form.Control).at(2).simulate('paste', event);

            // Assert
            expect(props.handlePasteCustomer).toHaveBeenCalledWith(event, '');
        });

        it('should handle exact function when click verify', () => {
            // Arrange
            const verify = shallow(<VerifySection {...props}/>);
            
            // Act
            verify.find(Button).at(0).simulate('click');

            // Assert
            expect(props.handleVerifyCreateRelatedCustomer).toHaveBeenCalled();
        });

        it('should handle onPaste when paste ticket ref input', () => {
            // Arrange
            const verify = shallow(<VerifySection {...props}/>);
            const event = { clipboardData: { getData: jest.fn().mockReturnValueOnce('event') } };

            // Act
            verify.find(Form.Control).at(3).simulate('paste', event);

            // Assert
            expect(props.onPasteRefTicketHandler).toHaveBeenCalledWith(event);
        });

        it('should handle exact function when click verify', () => {
            // Arrange
            const verify = shallow(<VerifySection {...props}/>);
            
            // Act
            verify.find(Button).at(1).simulate('click');

            // Assert
            expect(props.handleClickFillEvent).toHaveBeenCalled();
        });

        it('should handle onChange when related is changed', () => {
            // Arrange
            const verify = shallow(<VerifySection {...props}/>);
            
            // Act
            verify.find(AutoComplete).at(0).simulate('change', 'test');

            // Assert
            expect(props.handleChangeVerifySection).toHaveBeenCalledWith('subject', 'test');
        });
    });
});