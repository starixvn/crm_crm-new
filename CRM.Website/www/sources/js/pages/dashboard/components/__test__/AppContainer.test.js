import React from 'react';
import { shallow } from 'enzyme';
import { AppContainer } from '../AppContainer';
import DataGridRemark from '../DataGridRemark';
import toJson from 'enzyme-to-json';

describe('AppContainer', () => {
    beforeAll(() => {
        const appContainer = document.createElement('div');
        appContainer.setAttribute('id', 'hasCreateFeedbackPermission');
        appContainer.checked = true;
        document.body.appendChild(appContainer);
    });

    afterAll(() => {
        jest.clearAllMocks();
        const appContainer = document.getElementById('hasCreateFeedbackPermission');
        if (appContainer) {
            document.body.removeChild(appContainer);
        }
    });

    describe('componentWillUnmount', () => {
        it('should do reset store', () => {
            const props = {
                resetState: jest.fn()
            };
            const container = shallow(<AppContainer {...props} />);

            // Action
            container.instance().componentWillUnmount();

            // Assert
            expect(props.resetState).toHaveBeenCalled();
        });
    });

    describe('handleCloseEditRedemptionDialog', () => {
        it('should call exactly function when close dialog when not call api', () => {
            // Arrange
            const props = {
                setEditRedemptionDialog: jest.fn()
            };
            const container = shallow(<AppContainer {...props} />).instance();

            // Act
            container.handleCloseEditRedemptionDialog(false);

            // Assert
            expect(props.setEditRedemptionDialog).toHaveBeenCalledWith({ show: false });
        });

        
        it('should call exactly function when close dialog when call api', () => {
            // Arrange
            const props = {
                setEditRedemptionDialog: jest.fn(),
                getRedemptionLogs: jest.fn()
            };
            const container = shallow(<AppContainer {...props} />).instance();

            // Act
            container.handleCloseEditRedemptionDialog(true);

            // Assert
            expect(props.setEditRedemptionDialog).toHaveBeenCalledWith({ show: false });
            expect(props.getRedemptionLogs).toHaveBeenCalled();
        });
    });

    describe('handleCloseNoInquiryDialog', () => {
        it('should call exactly function when close dialog', () => {
            // Arrange
            const props = {
                setNoOfInquiryDialog: jest.fn()
            };
            const container = shallow(<AppContainer {...props} />).instance();

            // Act
            container.handleCloseNoInquiryDialog();

            // Assert
            expect(props.setNoOfInquiryDialog).toHaveBeenCalledWith({ show: false });
        });
    });

    describe('handleCloseEditCommunicationDialog', () => {
        it('should call exactly function when close dialog when not call api', () => {
            // Arrange
            const props = {
                setEditCommunicationDialog: jest.fn()
            };
            const container = shallow(<AppContainer {...props} />).instance();

            // Act
            container.handleCloseEditCommunicationDialog(false);

            // Assert
            expect(props.setEditCommunicationDialog).toHaveBeenCalledWith({ show: false });
        });

        it('should call exactly function when close dialog when call api', () => {
            // Arrange
            const props = {
                setEditCommunicationDialog: jest.fn(),
                getCommunicationLogs: jest.fn()
            };
            const container = shallow(<AppContainer {...props} />).instance();

            // Act
            container.handleCloseEditCommunicationDialog(true);

            // Assert
            expect(props.setEditCommunicationDialog).toHaveBeenCalledWith({ show: false });
            expect(props.getCommunicationLogs).toHaveBeenCalled();
        });
    });

    describe('handleCloseCreateCmnDiaLog', () => {
        it('should call exactly function when close dialog when not call api', () => {
            // Arrange
            const props = {
                setCreateCommunicationDialog: jest.fn()
            };
            const container = shallow(<AppContainer {...props} />).instance();

            // Act
            container.handleCloseCreateCmnDiaLog(false);

            // Assert
            expect(props.setCreateCommunicationDialog).toHaveBeenCalledWith({ show: false });
        });

        it('should call exactly function when close dialog when call api', () => {
            // Arrange
            const props = {
                setCreateCommunicationDialog: jest.fn(),
                getCommunicationLogs: jest.fn()
            };
            const container = shallow(<AppContainer {...props} />).instance();

            // Act
            container.handleCloseCreateCmnDiaLog(true);

            // Assert
            expect(props.setCreateCommunicationDialog).toHaveBeenCalledWith({ show: false });
            expect(props.getCommunicationLogs).toHaveBeenCalled();
        });
    });

    describe('handleCloseEditCustomerVerify', () => {
        it('should call exactly function when close dialog when not call api', () => {
            // Arrange
            const props = {
                setEditCustomerVerifyDialog: jest.fn()
            };
            const container = shallow(<AppContainer {...props} />).instance();

            // Act
            container.handleCloseEditCustomerVerify(false);

            // Assert
            expect(props.setEditCustomerVerifyDialog).toHaveBeenCalledWith({ show: false });
        });

        
        it('should call exactly function when close dialog when call api', () => {
            // Arrange
            const props = {
                setEditCustomerVerifyDialog: jest.fn(),
                getCustomerInfoVerify: jest.fn()
            };
            const container = shallow(<AppContainer {...props} />).instance();

            // Act
            container.handleCloseEditCustomerVerify(true);

            // Assert
            expect(props.setEditCustomerVerifyDialog).toHaveBeenCalledWith({ show: false });
            expect(props.getCustomerInfoVerify).toHaveBeenCalled();
        });
    });

    describe('render', () => {
        it('should render DataGridRemark correctly', () => {
            // Arrange
            // Act
            const container = shallow(<AppContainer />);
            // Assert
            expect(toJson(container)).toMatchSnapshot();
            expect(container.find(DataGridRemark).length).toBe(0);
        });
    });
});