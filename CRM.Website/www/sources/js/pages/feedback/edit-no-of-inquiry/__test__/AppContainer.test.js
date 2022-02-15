import React from 'react';
import { shallow } from 'enzyme';
import { AppContainer } from '../AppContainer';
import { Button, Col, Form, Modal, Row } from 'react-bootstrap';
import { Formik } from 'formik';
import DraggableModalDialog from '@jsroot/components/DraggableModalDialog';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import LangHelper from '@jsroot/common/langHelper';
import DataService from '@jsroot/common/dataService';
import Site from '@jsroot/common/site';
import { validateNoOfInquiry } from '../../common.functions';

describe('AppContainer', () => {
    beforeAll(() => {
        LangHelper.getResource = jest.fn(key => key);
        jest.useFakeTimers();
        Site.blockUI = jest.fn();
        Site.unblockUI = jest.fn();
        jest.useFakeTimers();
    });
    afterAll(() => {
        jest.clearAllMocks();
    });

    it('should calls exactly setState when called componentDidMount', async () => {
        // Arrange
        const state = {noInquiries: '', feedbackId: 1};
        const response = { data: {noInquiries: '1'}};
        const promise = Promise.resolve(response);
        Site.resolveClientUrl = jest.fn(url => url);
        DataService.getDataAsync = jest.fn(() => promise); 

        // Act
        const container = shallow(<AppContainer />).instance();
        container.setState(state);
        await container.componentDidMount();
        await promise;
        jest.runAllTimers();

        expect(container.state.noInquiries).toEqual('1');
        expect(Site.resolveClientUrl).toHaveBeenCalledWith('Feedback/GetNoOfInquiryByFeedbackId/1');
    });

    describe('handleSubmit', () => {
        it('should calls exact function when successful', async () => {
            const values = {noInquiries: '', feedbackId: 1};
            const response = { data: {isSuccessful: true}};
            const promise = Promise.resolve(response);
            Site.resolveClientUrl = jest.fn(url => url);
            DataService.postDataAsync = jest.fn(() => promise); 
            const props = {onClose: jest.fn()};

            // Act
            const container = shallow(<AppContainer {...props}/>).instance();
            await container.handleSubmit(values);
            await promise;
            jest.runAllTimers();

            expect(container.state.editResult).toEqual(response.data);
            expect(props.onClose).toHaveBeenCalled();
        });

        it('should calls exact function when not successful', async () => {
            const values = {noInquiries: '', feedbackId: 1};
            const response = { data: {isSuccessful: false}};
            const promise = Promise.resolve(response);
            Site.resolveClientUrl = jest.fn(url => url);
            DataService.postDataAsync = jest.fn(() => promise); 

            // Act
            const container = shallow(<AppContainer/>).instance();
            await container.handleSubmit(values);
            await promise;
            jest.runAllTimers();

            expect(container.state.isSubmitting).toBeTrue;
        });
    });  
    describe('renderForm', () => {
        it('components render correctly message', () => {
            // Arrange
            const state = {
                editResult: {
                    isSuccessful: false,
                    message: 'UpdateFeedbackSuccessfully'
                }
            };
            const values = {noInquiries: 1, feedbackId: 1};
            const handleChange = jest.fn();
            const handleSubmit = jest.fn();
            const container = shallow(<AppContainer />).instance();
            container.setState(state);
            const render = shallow(container.renderForm({
                values,
                handleChange,
                handleSubmit
            }));

            // Act
            const responseMessage = render.find(ResponseMessage);
    
            // Assert
            expect(responseMessage.props().isSuccessful).toBe(container.state.editResult.isSuccessful);
            expect(responseMessage.props().message).toBe(container.state.editResult.message);
        });
    });
});