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
            const container = shallow(<AppContainer {...props} />).instance();
            container.handleInitData = jest.fn();
            container.componentDidMount();
            // Assert
            expect(container.handleInitData).toHaveBeenCalled();
        });
    });

    describe('componentDidUpdate', () => {
        it('should call exactly props function', () => {
            // Arrange
            const props = {
                custId: 1,
                getLatestFeedback: jest.fn(),
                gridParams: {},
                setGridParams: jest.fn(),
                getLatestFeedbackByCustId: jest.fn()
            };
            const prevProps ={custId :2};
            const container = shallow(<AppContainer {...props} />).instance();
            container.handleInitData = jest.fn();
            // Act
            container.componentDidUpdate(prevProps);

            // Assert
            expect(container.handleInitData).toHaveBeenCalled();
        });
    });

    
    describe('componentWillUnmount', () => {
        it('should do reset store', () => {
            const props = {
                resetState: jest.fn(),
                getLatestFeedback: jest.fn(),
                gridParams: {}
            };
            const container = shallow(<AppContainer {...props} />);

            // Action
            container.instance().componentWillUnmount();

            // Assert
            expect(props.resetState).toHaveBeenCalled();
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

            const state = {
                policy : 2
            };

            // Act
            const container = shallow(<AppContainer {...props} />);
            container.instance().setState(state);
            // Assert
            expect(toJson(container)).toMatchSnapshot();
        });
    });
});