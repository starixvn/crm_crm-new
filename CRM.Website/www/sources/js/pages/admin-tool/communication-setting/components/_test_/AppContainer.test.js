import React from 'react';
import { toast } from 'react-toastify';
import { shallow } from 'enzyme';
import { AppContainer } from '../AppContainer';
import Filter from '../Filter';
import DataGrid from '../DataGrid';
import toJson from 'enzyme-to-json';

jest.mock('react-toastify');

describe('AppContainer', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    it('renders component correctly', () => {
        // Act
        const container = shallow(<AppContainer />);

        // Assert
        expect(toJson(container)).toMatchSnapshot();
    });

    it('renders default component correctly', () => {
        // Arrange
        const props = { isHost: false };

        // Act
        const container = shallow(<AppContainer {...props} />);

        // Assert
        expect(container.find(Filter).length).toBe(1);
        expect(container.find(Filter).props().isHost).toBe(props.isHost);

        expect(container.find(DataGrid).length).toBe(1);
        expect(container.find(DataGrid).props().isHost).toBe(props.isHost);
    });

    describe('create communication setting', () => {
        it('render component correctly', () => {
            // Arrange
            const props = {
                createCommunicationPopup: { show: true }
            };

            // Act
            const container = shallow(<AppContainer {...props} />);

            // Assert
            expect(toJson(container)).toMatchSnapshot();
        });

        it('should calls exactly functions when close popup', () => {
            // Arrange
            const props = {
                setCreateCommunicationPopup: jest.fn(),
                setCreateCommunicationResult: jest.fn()
            };
            const container = shallow(<AppContainer {...props} />).instance();

            // Act
            container.handleCloseCreatePopup();

            // Assert
            expect(props.setCreateCommunicationPopup).toHaveBeenCalledWith({ show: false });
            expect(props.setCreateCommunicationResult).toHaveBeenCalledWith(null);
        });

        it('should calls exactly functions when close popup with data is successfull', () => {
            // Arrange
            const props = {
                setCreateCommunicationPopup: jest.fn(),
                setCreateCommunicationResult: jest.fn(),
                createCommunicationResult: { isSuccessful: null },
                gridParamsCommunication: {},
                getGridCommunicationSetting: jest.fn()
            };
            const container = shallow(<AppContainer {...props} />).instance();

            // Act
            container.handleCloseCreatePopup(true);

            // Assert
            expect(props.setCreateCommunicationPopup).toHaveBeenCalledWith({ show: false });
            expect(props.setCreateCommunicationResult).toHaveBeenCalledWith(null);
            expect(props.getGridCommunicationSetting).toHaveBeenCalledWith(props.gridParamsCommunication);
        });

        it('should calls exactly functions when create communication setting successful', () => {
            // Arrange
            const props = {
                gridParamsCommunication: {},
                getGridCommunicationSetting: jest.fn()
            };
            const container = shallow(<AppContainer {...props} />).instance();
            container.handleCloseCreatePopup = jest.fn();

            // Act
            container.handleCreateSuccess();

            // Assert
            expect(props.getGridCommunicationSetting).toHaveBeenCalledWith(props.gridParamsCommunication);
            expect(container.handleCloseCreatePopup).toHaveBeenCalled();
        });
    });

    describe('edit communication setting', () => {
        it('render component correctly', () => {
            // Arrange
            const props = {
                editCommunicationPopup: { show: true }
            };

            // Act
            const container = shallow(<AppContainer {...props} />);

            // Assert
            expect(toJson(container)).toMatchSnapshot();
        });

        it('should calls exactly functions when close popup', () => {
            // Arrange
            const props = {
                setEditCommunicationPopup: jest.fn(),
                setEditCommunicationResult: jest.fn(),
                setSelectCommunicationId: jest.fn()
            };
            const container = shallow(<AppContainer {...props} />).instance();

            // Act
            container.handleCloseEditPopup();

            // Assert
            expect(props.setEditCommunicationPopup).toHaveBeenCalledWith({ show: false });
            expect(props.setEditCommunicationResult).toHaveBeenCalledWith(null);
            expect(props.setSelectCommunicationId).toHaveBeenCalledWith(null);
        });

        it('should calls exactly functions when edit communication setting successful', () => {
            // Arrange
            const props = {
                gridParamsCommunication: {},
                getGridCommunicationSetting: jest.fn()
            };
            const container = shallow(<AppContainer {...props} />).instance();
            container.handleCloseEditPopup = jest.fn();

            // Act
            container.handleEditSuccess();

            // Assert
            expect(container.handleCloseEditPopup).toHaveBeenCalled();
            expect(props.getGridCommunicationSetting).toHaveBeenCalledWith(props.gridParamsCommunication);
        });
    });

    describe('delete Communition Setting', () => {
        it('render component correctly', () => {
            // Arrange
            const props = {
                deleteCommunicationPopup: { show: true, index: '1' }
            };

            // Act
            const container = shallow(<AppContainer {...props} />);

            // Assert
            expect(toJson(container)).toMatchSnapshot();
        });

        it('should calls exactly functions when close popup', () => {
            // Arrange
            const props = {
                setDeleteCommunicationPopup: jest.fn()
            };
            const container = shallow(<AppContainer {...props} />).instance();

            // Act
            container.handleCloseDeletePopup();

            // Assert
            expect(props.setDeleteCommunicationPopup).toHaveBeenCalledWith({ show: false });
        });

        it('should calls exactly functions when delete successful', async () => {
            // Arrange
            const response = { isSuccessful: true, message: '' };
            const promise = Promise.resolve(response);
            const props = {
                deleteCommunicationPopup: { id: 1 },
                deleteCommunication: jest.fn(() => promise),
                getGridCommunicationSetting: jest.fn(),
                gridParamsCommunication: {}
            };
            const container = shallow(<AppContainer {...props} />).instance();
            container.handleCloseDeletePopup = jest.fn();

            // Act
            container.handleDelete();
            await promise;

            // Assert
            expect(props.deleteCommunication).toHaveBeenCalledWith(1);
            expect(toast.success).toHaveBeenCalledWith('DeleteCommunicationSuccessfully');
            expect(container.handleCloseDeletePopup).toHaveBeenCalled();
            expect(props.getGridCommunicationSetting).toHaveBeenCalledWith(props.gridParamsCommunication);
        });

        it('should calls toast.error when delete unsuccessful', async () => {
            // Arrange
            const response = { isSuccessful: false, message: 'delete unsuccessful' };
            const promise = Promise.resolve(response);
            const props = {
                deleteCommunicationPopup: { id: 1 },
                deleteCommunication: jest.fn(() => promise)
            };
            const container = shallow(<AppContainer {...props} />).instance();

            // Act
            container.handleDelete();
            await promise;

            // Assert
            expect(props.deleteCommunication).toHaveBeenCalledWith(1);
            expect(toast.error).toHaveBeenCalledWith('delete unsuccessful');
        });
    });
});