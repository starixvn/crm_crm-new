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
                getAllSettings: jest.fn()
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
                setEditFeedbackDialog: jest.fn(),
                gridParams: {},
                getDeletedFeedback: jest.fn()
            };

            // Act
            const container = shallow(<AppContainer {...props}/>);
            container.instance().handleCloseEditFeedbackDialog(true);
           
            // Assert
            expect(props.setEditFeedbackDialog).toHaveBeenCalledWith({ show: false });
            expect(props.getDeletedFeedback).toHaveBeenCalledWith(props.gridParams);
        });
    });

    describe('render', () => {
        it('should render correctly', () => {
            // Arrange
            const props = {
                editFeedbackDialog: { show: true }
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

    describe('handleCloseViewRelatedCustomerDialog', () => {
        it('should call exactly param', () => {
            // Arrange
            const props = {
                setViewRelatedCustomerDialog: jest.fn()
            }
            const expectedParams = { show: false };

            // Act
            const container = shallow(<AppContainer {...props}/>);
            container.instance().handleCloseViewRelatedCustomerDialog();

            // Assert
            expect(props.setViewRelatedCustomerDialog).toHaveBeenCalledWith(expectedParams);
        });
    });
});