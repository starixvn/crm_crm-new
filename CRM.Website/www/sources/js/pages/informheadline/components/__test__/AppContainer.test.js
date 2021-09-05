import React from 'react';
import { shallow } from 'enzyme';
import { AppContainer } from '../AppContainer';
import DataGrid from '../DataGrid';
import EditContactInforms from '../EditContactInforms';
import EditInforms from '../EditInforms';
import RemovedAccountLogs from '../RemovedAccountLogs';
import RemovedAccountLogDetails from '../RemovedAccountLogDetails';
import NewInforms from '../NewInforms';

describe('AppContainer', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    const initProps = {
        getInforms: jest.fn(),
        getAllSettings: jest.fn(),
        getContactInformSettings: jest.fn()
    };

    describe('componentDidMount', () => {
        it('should call getInforms', () => {
            // Arrange
            const props = {...initProps};

            //Act
            shallow(<AppContainer {...props} />);

            // Assert
            expect(props.getInforms).toHaveBeenCalled();
        });
    });

    describe('handleCloseEditContactInformDialog', () => {
        it('should call exactly functions when close edit contact', () => {
            // Arrange
            const props = {
                ...initProps,
                editContactInformDialog: { show: true },
                resultEditContactInforms: { isSuccessful: true },
                setEditContactInformDialog: jest.fn(),
                setContactInforms: jest.fn(),
                setGridParams: jest.fn(),
                setEditedInforms: jest.fn(),
                setResultEditContactInforms: jest.fn()
            };

            // Act
            const container = shallow(<AppContainer {...props}/>);
            container.instance().handleCloseEditContactInformDialog();
           
            // Assert
            expect(props.setEditContactInformDialog).toHaveBeenCalledWith({ show: false });
            expect(props.setContactInforms).toHaveBeenCalledWith(null);
            expect(props.getInforms).toHaveBeenCalled();
            expect(props.setGridParams).toHaveBeenCalledWith({pageIndex: 1, pageSize: 100});
            expect(props.setEditedInforms).toHaveBeenCalledWith([]);
            expect(props.setResultEditContactInforms).toHaveBeenCalledWith(null);
        });
    });

    describe('handleCloseEditInformDialog', () => {
        it('should call exactly functions when close edit inform', () => {
            // Arrange
            const props = {
                ...initProps,
                editInformDialog: { show: true },
                setEditInformDialog: jest.fn(),
                setEditInforms: jest.fn(),
                setGridParams: jest.fn(),
                setEditedInforms: jest.fn(),
                setResultEditInforms: jest.fn(),
                setFilterData: jest.fn()
            };

            // Act
            const container = shallow(<AppContainer {...props}/>);
            container.instance().handleCloseEditInformDialog();
           
            // Assert
            expect(props.setEditInformDialog).toHaveBeenCalledWith({ show: false });
            expect(props.setEditInforms).toHaveBeenCalledWith(null);
            expect(props.getInforms).toHaveBeenCalled();
            expect(props.setGridParams).toHaveBeenCalledWith({pageIndex: 1, pageSize: 100});
            expect(props.setEditedInforms).toHaveBeenCalledWith([]);
            expect(props.setResultEditInforms).toHaveBeenCalledWith(null);
            expect(props.setFilterData).toHaveBeenCalledWith({ values: {}, errors: {} });
        });
    });

    describe('handleCloseRemovedLogDialog', () => {
        it('should call exactly functions when close remove logs', () => {
            // Arrange
            const props = {
                ...initProps,
                removedLogDialog: { show: true },
                setRemovedLogDialog: jest.fn()
            };

            // Act
            const container = shallow(<AppContainer {...props}/>);
            container.instance().handleCloseRemovedLogDialog();
           
            // Assert
            expect(props.setRemovedLogDialog).toHaveBeenCalledWith({ show: false });
            expect(props.getInforms).toHaveBeenCalled();
        });
    });

    describe('handleCloseRemovedLogDetailDialog', () => {
        it('should call exactly functions when close remove log details', () => {
            // Arrange
            const props = {
                ...initProps,
                removedLogDetailDialog: { show: true },
                setRemovedLogDetailDialog: jest.fn()
            };

            // Act
            const container = shallow(<AppContainer {...props}/>);
            container.instance().handleCloseRemovedLogDetailDialog();
           
            // Assert
            expect(props.setRemovedLogDetailDialog).toHaveBeenCalledWith({ show: false });
            expect(props.getInforms).toHaveBeenCalled();
        });
    });

    describe('handleCloseNewInformDialog', () => {
        it('should call exactly functions when close new informs', () => {
            // Arrange
            const props = {
                ...initProps,
                newInformDialog: { show: true },
                setNewInformDialog: jest.fn(),
                setNewInforms: jest.fn(),
                setGridParams: jest.fn(),
                setEditedInforms: jest.fn(),
                setFilterData: jest.fn()
            };

            // Act
            const container = shallow(<AppContainer {...props}/>);
            container.instance().handleCloseNewInformDialog();
           
            // Assert
            expect(props.setNewInformDialog).toHaveBeenCalledWith({ show: false });
            expect(props.setNewInforms).toHaveBeenCalledWith(null);
            expect(props.getInforms).toHaveBeenCalled();
            expect(props.setGridParams).toHaveBeenCalledWith({pageIndex: 1, pageSize: 100});
            expect(props.setEditedInforms).toHaveBeenCalledWith([]);
            expect(props.setFilterData).toHaveBeenCalledWith({ values: {}, errors: {} });
        });
    });

    describe('render', () => {
        it('should render correctly', () => {
            // Arrange
            const props = {
                ...initProps,
                editContactInformDialog: { show: true },
                editInformDialog: { show: true },
                removedLogDialog: { show: true },
                removedLogDetailDialog: { show: true },
                newInformDialog: { show: true }
            };

            // Act
            const container = shallow(<AppContainer {...props} />);

            // Assert
            expect(container).toMatchSnapshot();
            expect(container.find(DataGrid).length).toBe(1);
            expect(container.find(EditContactInforms).length).toBe(1);
            expect(container.find(EditInforms).length).toBe(1);
            expect(container.find(RemovedAccountLogs).length).toBe(1);
            expect(container.find(RemovedAccountLogDetails).length).toBe(1);
            expect(container.find(NewInforms).length).toBe(1);
        });
    });
});