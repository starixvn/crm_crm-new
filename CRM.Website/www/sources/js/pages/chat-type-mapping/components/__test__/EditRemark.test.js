import React from 'react';
import { shallow } from 'enzyme';
import { EditRemark } from '../EditRemark';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import LangHelper from '@jsroot/common/langHelper';
import DataService from '@jsroot/common/dataService';
import Site from '@jsroot/common/site';

describe('EditRemark', () => {
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

    const props = {
        data: {
            remark: '',
            conversationGroupId: 1
        },
        onClose: jest.fn()
    };

    describe('handleSubmit', () => {
        it('should calls exact function when successful', async () => {
            const values = {remark: '', conversationGroupId: 1};
            const response = { data: {isSuccessful: true}};
            const promise = Promise.resolve(response);
            Site.resolveClientUrl = jest.fn(url => url);
            DataService.postDataAsync = jest.fn(() => promise); 

            // Act
            const container = shallow(<EditRemark {...props}/>).instance();
            await container.handleSubmit(values);
            await promise;
            jest.runAllTimers();

            expect(container.state.editResult).toEqual(response.data);
            expect(props.onClose).toHaveBeenCalled();
        });

        it('should calls exact function when not successful', async () => {
            const values = {remark: '', conversationGroupId: 1};
            const response = { data: {isSuccessful: false}};
            const promise = Promise.resolve(response);
            Site.resolveClientUrl = jest.fn(url => url);
            DataService.postDataAsync = jest.fn(() => promise); 

            // Act
            const container = shallow(<EditRemark {...props}/>).instance();
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
                    message: 'UpdateRemarkSuccessfully'
                }
            };
            const values = {remark: '', conversationGroupId: 1};
            const handleChange = jest.fn();
            const handleSubmit = jest.fn();
            const container = shallow(<EditRemark {...props}/>).instance();
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
