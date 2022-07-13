import React from 'react';
import { shallow } from 'enzyme';
import { AppContainer } from '../AppContainer';
import toJson from 'enzyme-to-json';

describe('AppContainer', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('componentDidMount', () => {
        it('should call getLatestFeedback', () => {
            // Arrange
            const props = {
                getLatestFeedback: jest.fn(),
                gridParams: {}
            };

            //Act
            shallow(<AppContainer {...props} />);

            // Assert
            expect(props.getLatestFeedback).toHaveBeenCalledWith({});
        });
    });

    describe('handleCloseEditNoInquiryDialog', () => {
        it('should call exactly functions when close edit', () => {
            // Arrange
            const props = {
                setEditNoOfInquiryDialog: jest.fn()
            };

            // Act
            const container = shallow(<AppContainer {...props}/>);
            container.instance().handleCloseEditNoInquiryDialog();
           
            // Assert
            expect(props.setEditNoOfInquiryDialog).toHaveBeenCalledWith({ show: false });
        });
    });

    describe('handleCloseEditFeedbackDialog', () => {
        it('should call exactly functions when close edit', () => {
            // Arrange
            const props = {
                getLatestFeedback: jest.fn(),
                setEditFeedbackDialog: jest.fn(),
                gridParams: {}
            };

            // Act
            const container = shallow(<AppContainer {...props}/>);
            container.instance().handleCloseEditFeedbackDialog(true);
           
            // Assert
            expect(props.setEditFeedbackDialog).toHaveBeenCalledWith({ show: false });
            expect(props.getLatestFeedback).toHaveBeenCalledWith({});
        });
    });

    describe('handleCloseViewRelatedCustomerDialog', () => {
        it('should call exactly functions when close edit', () => {
            // Arrange
            const props = {
                setViewRelatedCustomerDialog: jest.fn()
            };

            // Act
            const container = shallow(<AppContainer {...props}/>);
            container.instance().handleCloseViewRelatedCustomerDialog();
           
            // Assert
            expect(props.setViewRelatedCustomerDialog).toHaveBeenCalledWith({ show: false });
        });
    });

    describe('render', () => {
        it('should render correctly', () => {
            // Arrange
            const props = {
                isHost: true,
                editFeedbackDialog: { show: true },
                editNoOfInquiryDialog: { show: true },
                setEditNoOfInquiryDialog: jest.fn(),
                setEditFeedbackDialog: jest.fn(),
                setViewRelatedCustomerDialog: jest.fn(),
                gridParams: {}
            };

            // Act
            const container = shallow(<AppContainer {...props} />);

            // Assert
            expect(toJson(container)).toMatchSnapshot();
        });
    });
});