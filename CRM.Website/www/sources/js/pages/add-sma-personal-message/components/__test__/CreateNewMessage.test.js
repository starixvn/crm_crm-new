import React from 'react';
import { shallow } from 'enzyme';
import CreateNewMessage from '../CreateNewMessage';
import { Button, Col, Form, Modal, Row, Tabs, Tab } from 'react-bootstrap';
import { Formik } from 'formik';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import FormikErrorMessage from '@jsroot/components/FormikErrorMessage';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import LangHelper from '@jsroot/common/langHelper';
import DataService from '@jsroot/common/dataService';
import Site from '@jsroot/common/site';

describe('CreateNewMessage', () => {
    beforeAll(() => {
        jest.useFakeTimers();
        Site.resolveClientUrl = jest.fn((url) => url);
        LangHelper.getResource = jest.fn((key) => key);
    });
    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('handleChangeTab', () => {
        it('should call setState', () => {
            // Arrange
            // Act
            const container = shallow(<CreateNewMessage />).instance();

            container.handleChangeTab('EN');

            // Assert
            expect(container.state.tab).toEqual('EN');
        });
    });

    describe('validateFormik', () => {
        it('should return empty errors object when values are valid', () => {
            // Arrange
            const values = {
                title: 'Valid Title',
                username: 'Valid Username',
                language_EN: 'Valid Language'
            };

            // Act
            const container = shallow(<CreateNewMessage />).instance();
            const errors = container.validateFormik(values);

            // Assert
            expect(errors).toEqual({});
        });

        it('should return errors when values are invalid', () => {
            // Arrange
            const values = {
                title: 'Too Long Title'.repeat(500),
                username: '',
                language_EN: ''
            };
            // Act
            const container = shallow(<CreateNewMessage />).instance();
            const errors = container.validateFormik(values);

            // Assert
            expect(errors.title).toBe('SMATitleInputError');
            expect(errors.username).toBe('FieldRequired');
            expect(errors.language_EN).toBe('FieldRequired');
        });

        it('should return errors when username is invalid', () => {
            // Arrange
            const values = {
                title: 'Valid Title',
                username: 'Invalid Username'.repeat(20),
                language_EN: 'Valid Language'
            };

            // Act
            const container = shallow(<CreateNewMessage />).instance();
            container.validateUsernameInput = jest.fn(() => true);
            const errors = container.validateFormik(values);
            // Assert
            expect(errors.username).toBe('InvalidInputSMAUsernames');
        });
    });

    describe('onPasteUsernameHandler', () => {
        it('should call exact function', () => {
            // Arrange
            const mEvent = { clipboardData: { getData: jest.fn().mockReturnValueOnce('test') } };
            const setFieldValue = jest.fn();
            const container = shallow(<CreateNewMessage />).instance();
            // Act
            container.onPasteUsernameHandler(mEvent, 'test', setFieldValue);
            jest.runAllTimers();
            // Assert
            expect(setFieldValue).toHaveBeenCalled();
        });
    });

    describe('handleSubmit', () => {
        it('should call exact function', () => {
            // Arrange
            const setSubmitting  = jest.fn();
            const container = shallow(<CreateNewMessage />).instance();
            container.handleConfirmAddMessage = jest.fn();
            container.handleGetUsername = jest.fn(() => 'test');
            // Act
            container.handleSubmit({}, {setSubmitting});
            // Assert
            expect(setSubmitting).toHaveBeenCalledWith(true);
            expect(container.handleConfirmAddMessage).toHaveBeenCalled();

        });
    });

    describe('handleGetUsername', () => {
        it('should return exact use name', () => {
            // Arrange
            const container = shallow(<CreateNewMessage />).instance();
            container.formik = {values: {username: 'test'}}; 
            // Act
            const actual = container.handleGetUsername();
            // Assert
            expect(actual).toEqual('test');

        });
    });

    describe('handleCancelConfirmAddMessage', () => {
        it('should call setState', () => {
            // Arrange
            const container = shallow(<CreateNewMessage />).instance();
            container.formik = {setSubmitting: jest.fn()}; 
            // Act
            container.handleCancelConfirmAddMessage();
            // Assert
            expect(container.formik.setSubmitting).toBeFalse;
            expect(container.state.confirmPopup).toEqual({isShow: false, params: null});
        });
    });

    describe('handleCheckUsername', () => {
        it('should call exact function when check username is successfully', async() => {
            // Arrange
            const state = {
                confirmPopup: {params: {}}
            };
            const promise = Promise.resolve({data: {data:{isSuccessful: true}}});
            DataService.postDataAsync = jest.fn(() => promise);
            const container = shallow(<CreateNewMessage />).instance();
            container.formik = {setSubmitting: jest.fn()}; 
            container.setState(state);
            container.handleCreateNewMessage = jest.fn();
            container.handleCancelConfirmAddMessage = jest.fn(); 
            // Act
            await container.handleCheckUsername();
            await promise;           
            // Assert
            expect(container.handleCreateNewMessage).toHaveBeenCalled();
            expect(container.handleCancelConfirmAddMessage).toHaveBeenCalled();
            expect(container.state.checkUsernameValidResult).toEqual({isSuccessful: true});
        });

        it('should call exact function when check username is unsuccessfully', async() => {
            // Arrange
            const state = {
                confirmPopup: {params: {}}
            };
            const promise = Promise.resolve({data: {data:{isSuccessful: false}}});
            DataService.postDataAsync = jest.fn(() => promise);
            const container = shallow(<CreateNewMessage />).instance();
            container.formik = {setSubmitting: jest.fn()}; 
            container.setState(state);
            container.handleCreateNewMessage = jest.fn();
            container.handleCancelConfirmAddMessage = jest.fn(); 
            // Act
            await container.handleCheckUsername();
            await promise;
            // Assert
            expect(container.handleCreateNewMessage).not.toHaveBeenCalled();
            expect(container.formik.setSubmitting).toHaveBeenCalledWith(false);
        });
    });

    describe('handleCreateNewMessage', () => {
        it('should call exact function when create is successfully', async() => {
            // Arrange
            const promise = Promise.resolve({data: {isSuccessful: true}});
            DataService.postDataAsync = jest.fn(() => promise);
            const props = {onSuccess: jest.fn()};
            const container = shallow(<CreateNewMessage {...props}/>).instance();
           
            // Act
            await container.handleCreateNewMessage({});
            await promise;
            jest.runAllTimers();
            // Assert
            expect(props.onSuccess).toHaveBeenCalled();
            expect(container.state.createMessageResult).toEqual({isSuccessful: true});
        });

        it('should call exact function when create is successfully', async() => {
            // Arrange
            const promise = Promise.resolve({data: {isSuccessful: false}});
            DataService.postDataAsync = jest.fn(() => promise);
            const props = {onSuccess: jest.fn()};
            const container = shallow(<CreateNewMessage {...props}/>).instance();
           
            // Act
            await container.handleCreateNewMessage({});
            await promise;
            // Assert
            expect(props.onSuccess).not.toHaveBeenCalled();
            expect(container.state.createMessageResult).toEqual({isSuccessful: false});
        });
    });
});