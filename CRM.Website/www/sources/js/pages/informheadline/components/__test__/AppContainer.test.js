import React from 'react';
import { shallow } from 'enzyme';
import { AppContainer } from '../AppContainer';
import DataGrid from '../DataGrid';
import EditContactInforms from '../EditContactInforms';
import EditInforms from '../EditInforms';
import RemovedAccountLogs from '../RemovedAccountLogs';
import RemovedAccountLogDetails from '../RemovedAccountLogDetails';
import NewInforms from '../NewInforms';
import OptionsEdit from '../OptionsEdit';

describe('AppContainer', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    const initProps = {
        getInforms: jest.fn()
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
                setEditContactInformDialog: jest.fn()
            };

            // Act
            const container = shallow(<AppContainer {...props}/>);
            container.instance().handleCloseEditContactInformDialog();
           
            // Assert
            expect(props.setEditContactInformDialog).toHaveBeenCalledWith({ show: false });
            expect(props.getInforms).toHaveBeenCalled();
        });
    });

    describe('handleCloseEditInformDialog', () => {
        it('should call exactly functions when close edit search', () => {
            // Arrange
            const props = {
                ...initProps,
                editInformDialog: { show: true },
                setEditInformDialog: jest.fn()
            };

            // Act
            const container = shallow(<AppContainer {...props}/>);
            container.instance().handleCloseEditInformDialog();
           
            // Assert
            expect(props.setEditInformDialog).toHaveBeenCalledWith({ show: false });
            expect(props.getInforms).toHaveBeenCalled();
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
                setNewInformDialog: jest.fn()
            };

            // Act
            const container = shallow(<AppContainer {...props}/>);
            container.instance().handleCloseNewInformDialog();
           
            // Assert
            expect(props.setNewInformDialog).toHaveBeenCalledWith({ show: false });
            expect(props.getInforms).toHaveBeenCalled();
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
                newInformDialog: { show: true },
                optionDialog: { show: true }
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
            expect(container.find(OptionsEdit).length).toBe(1);
        });
    });
});