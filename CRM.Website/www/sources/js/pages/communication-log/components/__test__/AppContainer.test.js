import React from 'react';
import { shallow } from 'enzyme';
import { AppContainer } from '../AppContainer';
import Filter from '../Filter';
import DataGrid from '../DataGrid';
import EditNoOfInquiry from '../../../feedback/edit-no-of-inquiry/AppContainer';
import EditCommunicationLog from '../EditCommunicationLog';
import InsertCommunicationLog from '../InsertCommunicationLog';

describe('AppContainer', () => {
    afterAll(() => {
        jest.clearAllMocks();
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
                getAllStatus: jest.fn(),
                setEditCommunicationDialog: jest.fn(),
                getLogsByCustomerId: jest.fn(),
                gridParams: { customerId: 1754 }
            };
            const container = shallow(<AppContainer {...props} />).instance();

            //Act
            container.handleCloseEditCommunicationDialog(true);

            //Assert
            expect(props.getAllStatus).toHaveBeenCalledWith({ isEdit: false });
            expect(props.setEditCommunicationDialog).toHaveBeenCalledWith({ show: false });
            expect(props.getLogsByCustomerId).toHaveBeenCalledWith(props.gridParams);
        });
    });

    describe('handleCloseInsertCommunicationDiaLog', () => {
        it('should call exactly functions when close dialog', () => {
            //Arrange
            const props = {
                getLogsByCustomerId: jest.fn(),
                setInsertCommunicationDialog: jest.fn(),
                gridParams: { customerId: 1754 }
            };
            const container = shallow(<AppContainer {...props} />).instance();

            //Act
            container.handleCloseInsertCommunicationDiaLog(true);

            //Assert
            expect(props.setInsertCommunicationDialog).toHaveBeenCalledWith({ show: false });
            expect(props.getLogsByCustomerId).toHaveBeenCalledWith(props.gridParams);
        });
    });

    describe('render', () => {
        it('should render Filter correctly', () => {
            //Act
            const container = shallow(<AppContainer />);

            //Assert
            expect(container).toMatchSnapshot();
            expect(container.find(Filter).length).toBe(1);
        });

        it('should render DataGrid correctly', () => {
            //Act
            const container = shallow(<AppContainer />);

            //Assert
            expect(container).toMatchSnapshot();
            expect(container.find(DataGrid).length).toBe(1);
        });

        it('should render dialog message correctly', () => {
            //Arrange
            const props = {
                editNoOfInquiryDialog: { show: true },
                editCommunicationDialog: { show: true },
                insertCommunicationDialog: { show: true }
            };

            //Act
            const container = shallow(<AppContainer {...props} />);

            //Assert
            expect(container).toMatchSnapshot();
            expect(container.find(EditNoOfInquiry).length).toBe(1);
            expect(container.find(EditCommunicationLog).length).toBe(1);
            expect(container.find(InsertCommunicationLog).length).toBe(1);
        });
    });
});