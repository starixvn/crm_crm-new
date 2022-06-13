import React from 'react';
import { shallow } from 'enzyme';
import { AppContainer } from '../AppContainer';
import DataGridRemark from '../DataGridRemark';
import DataGridRedemption from '../DataGridRedemption';
import DataGridCommunication from '../DataGridCommunication';
import CustomerInfoVerify from '../CustomerInfoVerify';
import EditCustomerInfoVerify from '../EditCustomerInfoVerify';
import EditRedemptionLog from '../../../redemption/components/EditRedemptionLog';
import EditNoOfInquiry from '../../../feedback/edit-no-of-inquiry/AppContainer';
import EditCommunicationLog from '../../../communication-log/components/EditCommunicationLog';
import CreateCommunicationLog from '../../../communication-log/components/CreateCommunicationLog';

window.currentCustomer = {custId: 1};
describe('AppContainer', () => {
    afterAll(() => {
        jest.clearAllMocks();
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
            // Act
            const container = shallow(<AppContainer />);

            // Assert
            expect(container).toMatchSnapshot();
            expect(container.find(DataGridRemark).length).toBe(1);
        });

        it('should render CustomerInfoVerify correctly', () => {
            // Act
            const container = shallow(<AppContainer />);

            // Assert
            expect(container).toMatchSnapshot();
            expect(container.find(CustomerInfoVerify).length).toBe(1);
        });

        it('should render DataGridRedemption correctly', () => {
            // Act
            const container = shallow(<AppContainer />);

            // Assert
            expect(container).toMatchSnapshot();
            expect(container.find(DataGridRedemption).length).toBe(1);
        });

        it('should render DataGridCommunication correctly', () => {
            // Act
            const container = shallow(<AppContainer />);

            // Assert
            expect(container).toMatchSnapshot();
            expect(container.find(DataGridCommunication).length).toBe(1);
        });

        it('should render dialog correctly', () => {
            //Arrange
            const props = {
                editRedemptionDialog: { show: true },
                noOfInquiryDialog: { show: true },
                editCommunicationDialog: { show: true },
                createCommunicationDialog: { show: true },
                editCustomerVerifyDialog: { show: true }
            };

            //Act
            const container = shallow(<AppContainer {...props} />);

            //Assert
            expect(container).toMatchSnapshot();
            expect(container.find(EditRedemptionLog).length).toBe(1);
            expect(container.find(EditNoOfInquiry).length).toBe(1);
            expect(container.find(EditCommunicationLog).length).toBe(1);
            expect(container.find(CreateCommunicationLog).length).toBe(1);
            expect(container.find(EditCustomerInfoVerify).length).toBe(1);
        });
    });
});