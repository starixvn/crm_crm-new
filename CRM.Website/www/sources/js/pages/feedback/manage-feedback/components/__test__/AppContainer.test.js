import React from 'react';
import { shallow } from 'enzyme';
import { AppContainer } from '../AppContainer';
import Filter from '../Filter';
import DataGrid from '../DataGrid';
import EditFeedback from '../../../edit-customer-feedback/AppContainer';

describe('AppContainer', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('componentDidMount', () => {
        it('should call getAllSettings', () => {
            // Arrange
            const props = {
                getAllSettings: jest.fn(),
                editFeedbackDialog: { show: true },
                editNoOfInquiryDialog: { show: false },
                editMultipleLogStatusDialog: { show: false },
                editMultipleLogDialog: { show: false },
                viewRelatedCustomerDialog: { show: false }
            };

            //Act
            shallow(<AppContainer {...props} />);

            // Assert
            expect(props.getAllSettings).toHaveBeenCalled();
        });
    });

    describe('handleCloseEditFeedbackDialog', () => {
        it('should call exactly functions when close edit', () => {
            // Arrange
            const props = {
                editFeedbackDialog: { show: true },
                editNoOfInquiryDialog: { show: false },
                editMultipleLogStatusDialog: { show: false },
                editMultipleLogDialog: { show: false },
                viewRelatedCustomerDialog: { show: false },
                setEditFeedbackDialog: jest.fn(),
                getGridFeedbacks: jest.fn(),
                gridParams: {}
            };

            // Act
            const container = shallow(<AppContainer {...props}/>);
            container.instance().handleCloseEditFeedbackDialog(true);
           
            // Assert
            expect(props.setEditFeedbackDialog).toHaveBeenCalledWith({ show: false });
            expect(props.getGridFeedbacks).toHaveBeenCalledWith(props.gridParams);
        });
    });

    describe('handleCloseEditNoInquiryDialog', () => {
        it('should call exactly functions when close edit', () => {
            // Arrange
            const props = {
                editFeedbackDialog: { show: false },
                editNoOfInquiryDialog: { show: true },
                editMultipleLogStatusDialog: { show: false },
                viewRelatedCustomerDialog: { show: false },
                editMultipleLogDialog: { show: false },
                setEditNoOfInquiryDialog: jest.fn(),
                gridParams: {}
            };

            // Act
            const container = shallow(<AppContainer {...props}/>);
            container.instance().handleCloseEditNoInquiryDialog(true);
           
            // Assert
            expect(props.setEditNoOfInquiryDialog).toHaveBeenCalledWith({ show: false });
        });
    });

    describe('handleCloseMultipleEditStatusDialog', () => {
        it('should call exactly functions when close edit', () => {
            // Arrange
            const props = {
                editFeedbackDialog: { show: false },
                editNoOfInquiryDialog: { show: false },
                editMultipleLogStatusDialog: { show: true, feedbackIds: [1,2] },
                viewRelatedCustomerDialog: { show: false },
                editMultipleLogDialog: { show: false },
                setEditMultipleLogStatusDialog: jest.fn(),
                getGridFeedbacks: jest.fn(),
                gridParams: {},
                settings:{statuses:[]}
            };

            // Act
            const container = shallow(<AppContainer {...props}/>);
            container.instance().handleCloseMultipleEditStatusDialog(true);
           
            // Assert
            expect(props.setEditMultipleLogStatusDialog).toHaveBeenCalledWith({ show: false });
            expect(props.getGridFeedbacks).toHaveBeenCalledWith(props.gridParams);
        });
    });

    describe('handleCloseMultipleEditLog ', () => {
        it('should call exactly functions when close edit', () => {
            // Arrange
            const props = {
                editFeedbackDialog: { show: false },
                editNoOfInquiryDialog: { show: false },
                editMultipleLogStatusDialog: { show: false },
                viewRelatedCustomerDialog: { show: false },
                editMultipleLogDialog: { show: true },
                handleCloseMultipleEditLog : jest.fn(),
                setEditMultipleLogDialog: jest.fn(),
                getGridFeedbacks: jest.fn(),
                gridParams: {},
                settings:{statuses:[]}
            };

            // Act
            const container = shallow(<AppContainer {...props}/>);
            container.instance().handleCloseMultipleEditLog(true);
           
            // Assert
            expect(props.setEditMultipleLogDialog).toHaveBeenCalledWith({ show: false });
            expect(props.getGridFeedbacks).toHaveBeenCalledWith(props.gridParams);
        });
    });
    

    describe('render', () => {
        it('should render correctly', () => {
            // Arrange
            const props = {
                getAllSettings: jest.fn(),
                editFeedbackDialog: { show: true, feedbackId: 1 },
                editNoOfInquiryDialog: { show: false },
                editMultipleLogStatusDialog: { show: false },
                viewRelatedCustomerDialog: { show: false },
                editMultipleLogDialog: { show: false },
                setEditNoOfInquiryDialog: jest.fn(),
                setEditFeedbackDialog: jest.fn(),
                setViewRelatedCustomerDialog: jest.fn(),
                setEditMultipleLogStatusDialog: jest.fn(),
                setEditMultipleLogDialog: jest.fn(),
                getGridFeedbacks: jest.fn(),
                gridParams: {}
            };

            // Act
            const container = shallow(<AppContainer {...props} />);

            // Assert
            expect(container).toMatchSnapshot();
            expect(container.find(EditFeedback).length).toBe(1);
            expect(container.find(Filter).length).toBe(1);
            expect(container.find(DataGrid).length).toBe(1);
        });
    });
    
});