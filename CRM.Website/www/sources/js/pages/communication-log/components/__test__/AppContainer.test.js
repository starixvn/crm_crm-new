import React from 'react';
import { shallow } from 'enzyme';
import { AppContainer } from '../AppContainer';
import toJson from 'enzyme-to-json';

describe('AppContainer', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('componentWillUnmount', () => {
        const props = {
            resetState: jest.fn(),
        };

        it('should do reset store', () => {
            const container = shallow(<AppContainer {...props} />);

            // Action
            container.instance().componentWillUnmount();

            // Assert
            expect(props.resetState).toHaveBeenCalled();
        });
    });

    describe('handleCloseEditNoInquiryDialog', () => {
        it('should call exactly functions when close dialog', () => {
            //Arrange
            const props = {
                setEditNoOfInquiryDialog: jest.fn()
            };
            const container = shallow(<AppContainer {...props} />).instance();

            //Act
            container.handleCloseEditNoInquiryDialog();

            //Assert
            expect(props.setEditNoOfInquiryDialog).toHaveBeenCalledWith({ show: false });
        });
    });

    describe('handleCloseEditCommunicationDialog', () => {
        it('should call exactly functions when close dialog', () => {
            //Arrange
            const props = {
                setEditCommunicationDialog: jest.fn(),
                getLogsByCustomerId: jest.fn(),
                gridParams: { customerId: 1754 }
            };
            const container = shallow(<AppContainer {...props} />).instance();

            //Act
            container.handleCloseEditCommunicationDialog(true);

            //Assert
            expect(props.setEditCommunicationDialog).toHaveBeenCalledWith({ show: false });
            expect(props.getLogsByCustomerId).toHaveBeenCalledWith(props.gridParams);
        });
    });

    describe('handleCloseCreateCommunicationDiaLog', () => {
        it('should call exactly functions when close dialog', () => {
            //Arrange
            const props = {
                getLogsByCustomerId: jest.fn(),
                setCreateCommunicationDialog: jest.fn(),
                setGridParams: jest.fn(),
                gridParams: { customerId: 1754 }
            };
            const container = shallow(<AppContainer {...props} />).instance();

            //Act
            container.handleCloseCreateCommunicationDiaLog(true);

            //Assert
            expect(props.setCreateCommunicationDialog).toHaveBeenCalledWith({ show: false });
            expect(props.getLogsByCustomerId).toHaveBeenCalledWith(props.gridParams);
            expect(props.setGridParams).toHaveBeenCalled();
        });
    });

    describe('render', () => {
        it('should render Filter correctly', () => {
            //Act
            const container = shallow(<AppContainer />);
            container.instance().setState({customerInfoPolicy: 1, createUpdateFeedbackPermission: 1});
            //Assert
            expect(toJson(container)).toMatchSnapshot();
        });
    });
});