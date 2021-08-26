import React from 'react';
import { shallow } from 'enzyme';
import EditMultipleReviewAndStatus from '../EditMultipleReviewAndStatus';
import Site from '@jsroot/common/site';
import LangHelper from '@jsroot/common/langHelper';
import DataService from '@jsroot/common/dataService';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import CkEditor from '@jsroot/components/ckeditor/index';

describe('EditMultipleReviewAndStatus', () => {
    beforeAll(() => {
        jest.useFakeTimers();
        Site.blockUI = jest.fn();
        Site.unblockUI = jest.fn();
        LangHelper.getResource = jest.fn(key => key);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    LangHelper.formatString = jest.fn(value => value);
    LangHelper.getResource = jest.fn(value => value);

    describe('componentDidMount', () => {
        it('should calls setState', async () => {
             // Arrange
            const response = {
                data: {feedbackId: 1, isReviewed: true}
            };
            const promise = Promise.resolve(response);
            const props = {
                feedbackIds: [1]
            };
            Site.resolveClientUrl = jest.fn(url => url);
            DataService.getDataAsync = jest.fn(() => promise);
            const container = shallow(<EditMultipleReviewAndStatus {...props} />).instance();
            await promise;
            jest.runAllTimers();
            expect(Site.resolveClientUrl).toHaveBeenCalledWith('MultipleLogs/GetLogByFeedbackId/1');
            expect(container.state.logInfo).toEqual({feedbackId: 1, isReviewed: true});
            expect(container.state.isReviewed).toEqual(true);
        }); 
    });

    describe('handleSubmit', () => {
        it('should calls exact function if successful', async () => {
             // Arrange
            const response = {
                data: {isSuccessful: true}
            };
            const promise = Promise.resolve(response);
            const props = {
                feedbackIds: [1],
                onClose: jest.fn()
            };
            const values = {
                statusId: '1',
                review: '',
                isReviewed: false
            };
            const expectedParams = {
                listFeedbackId: '1',
                statusId: 1,
                reviewNote: '',
                isReviewed: false
            };
            Site.resolveClientUrl = jest.fn(url => url);
            DataService.postDataAsync = jest.fn(() => promise);
            const container = shallow(<EditMultipleReviewAndStatus {...props} />).instance();

            // Act
            container.handleSubmit(values);
            await promise;
            jest.runAllTimers();

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('MultipleLogs/EditMultipleLogStatuses', expectedParams);
            expect(container.state.isSubmitting).toEqual(true);
            expect(props.onClose).toHaveBeenCalledWith(true);
        }); 

        it('should setState if unsuccessful', async () => {
            // Arrange
           const response = {
               data: {isSuccessful: false}
           };
           const promise = Promise.resolve(response);
           const props = {
               feedbackIds: [1],
               onClose: jest.fn()
           };
           const values = {
               statusId: '1',
               review: '',
               isReviewed: false
           };
           const expectedParams = {
               listFeedbackId: '1',
               statusId: 1,
               reviewNote: '',
               isReviewed: false
           };
           Site.resolveClientUrl = jest.fn(url => url);
           DataService.postDataAsync = jest.fn(() => promise);
           const container = shallow(<EditMultipleReviewAndStatus {...props} />).instance();

           //Act
           container.handleSubmit(values);
           await promise;
           jest.runAllTimers();

           // Assert
           expect(container.state.isSubmitting).toEqual(false);
       }); 

       it('should setState if unsuccessful', async () => {
           // Arrange
           const response = {
               data: {isSuccessful: false}
           };
           const promise = Promise.resolve(response);
           const props = {
               feedbackIds: [1],
               onClose: jest.fn()
           };
           const values = {
               statusId: '1',
               review: '',
               isReviewed: false
           };
           Site.resolveClientUrl = jest.fn(url => url);
           DataService.postDataAsync = jest.fn(() => promise);
           const container = shallow(<EditMultipleReviewAndStatus {...props} />).instance();

           //Act
           container.handleSubmit(values);
           await promise;
           jest.runAllTimers();

           // Assert
           expect(container.state.isSubmitting).toEqual(false);
       }); 
    });

    describe('handleChangeCheckBox', () => {
        it('should setState', () => {
            // Arrange
            const prevState = {
                isReviewed: false
            };
            
            const container = shallow(<EditMultipleReviewAndStatus />).instance();
            container.setState(prevState);

            // Act
            container.handleChangeCheckBox();

            //Assert
            expect(container.state.isReviewed).toEqual(true);
        });
    });  
    
    describe('validateFormik', () => {
        it('should return expect error', () => {
            // Arrange
            const state = {
                isReviewed: true
            };
            const expected = {
                review: 'ReviewRequired'
            };
            
            const container = shallow(<EditMultipleReviewAndStatus />).instance();
            container.setState(state);

            // Act
            const actual = container.validateFormik({review: ''});

            //Assert
            expect(actual).toEqual(expected);
        });
    }); 

    describe('render', () => {
        it('should return null when data is null', () => {
            // Arrange
            const state = {
                logInfo: null
            };
            
            const container = shallow(<EditMultipleReviewAndStatus />).instance();
            container.setState(state);

            // Act
            const actual = container.render();

            //Assert
            expect(actual).toEqual(null);
        });      
    }); 

    describe('renderForm', () => {
        it('handle message responses if unsuccessful', () => {
            // Arrange
            const state = {
                editResult: {
                    isSuccessful: false,
                    message: 'unsuccessful'
                },
                logInfo: {
                    reviewer: '',
                    solveDate: new Date(),
                    isReviewed: false
                }
            };
            const props = {
                statuses: [{statusId: 1, name: 'test'}]
            };
            const formikProps = {
                values: {},
                errors: {},
                touched: {},
                handleChange: jest.fn(),
                handleSubmit: jest.fn(),
                setFieldValue: jest.fn()
            };
            const container = shallow(<EditMultipleReviewAndStatus {...props}/>).instance();
            container.setState(state);
            // Act
            const form = shallow(container.renderForm(formikProps));
    
            // Assert 
            expect(form.find(ResponseMessage).props().isSuccessful).toBe(false);
            expect(form.find(ResponseMessage).props().message).toEqual('unsuccessful');
        });

        it('handle message responses if successful', () => {
            // Arrange
            const state = {
                editResult: {
                    isSuccessful: true,
                    message: 'UpdateMultipleLogsSuccessfully'
                },
                logInfo: {
                    reviewer: '',
                    solveDate: new Date(),
                    isReviewed: false
                }
            };
            const props = {
                statuses: [{statusId: 1, name: 'test'}]
            };
            const formikProps = {
                values: {},
                errors: {},
                touched: {},
                handleChange: jest.fn(),
                handleSubmit: jest.fn(),
                setFieldValue: jest.fn()
            };
            const container = shallow(<EditMultipleReviewAndStatus {...props}/>).instance();
            container.setState(state);
            // Act
            const form = shallow(container.renderForm(formikProps));
    
            // Assert 
            expect(form.find(ResponseMessage).props().isSuccessful).toBe(true);
            expect(form.find(ResponseMessage).props().message).toEqual('UpdateMultipleLogsSuccessfully');
        });

        it('render review section', () => {
            // Arrange
            const state = {
                logInfo: {
                    reviewer: '',
                    solveDate: new Date(),
                    isReviewed: true
                },
                isReviewed: true
            };
            const props = {
                statuses: [{statusId: 1, name: 'test'}]
            };
            const formikProps = {
                values: {},
                errors: {},
                touched: {},
                handleChange: jest.fn(),
                handleSubmit: jest.fn(),
                setFieldValue: jest.fn()
            };
            const container = shallow(<EditMultipleReviewAndStatus {...props}/>).instance();
            container.setState(state);
            // Act
            const form = shallow(container.renderForm(formikProps));
            form.find(CkEditor).simulate('change', 'value');
            // Assert 
            expect(formikProps.setFieldValue).toHaveBeenCalledWith('review', 'value');
        });
    }); 
});