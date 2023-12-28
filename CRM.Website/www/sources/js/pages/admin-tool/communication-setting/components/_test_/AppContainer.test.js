import React from 'react';
import { toast } from 'react-toastify';
import { shallow } from 'enzyme';
import { AppContainer } from '../AppContainer';
import toJson from 'enzyme-to-json';

jest.mock('react-toastify');

describe('AppContainer', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });

    const initProps = {
        createCommunicationPopup: { show: true },
        editCommunicationPopup: { show: true },
        setDeleteCommunicationPopup: jest.fn(),
        deleteCommunicationPopup: { show: true, index: 1, id: 1 },
        getGridCommunicationSetting: jest.fn(),
        gridParamsCommunication: [],
        gridDataCommunication: [],
        deleteCommunicationResult: { isSuccessful: true }
    }

    describe('componentWillUnmount', () => {
        const props = {
            ...initProps,
            resetState: jest.fn(),
            getAllSettings: jest.fn()
        };

        it('should do reset store', () => {
            const container = shallow(<AppContainer {...props} />);

            // Action
            container.instance().componentWillUnmount();

            // Assert
            expect(props.resetState).toHaveBeenCalled();
        });
    });

    describe('create communication setting', () => {
        it('render component correctly', () => {
            // Arrange
            const props = {
                ...initProps,
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
                ...initProps,
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
                ...initProps,
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
                ...initProps,
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
                ...initProps,
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
                ...initProps,
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
                ...initProps,
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
                ...initProps
            };

            // Act
            const container = shallow(<AppContainer {...props} />);

            // Assert
            expect(toJson(container)).toMatchSnapshot();
        });

        it('should calls exactly functions when close popup', () => {
            // Arrange
            const props = {
                ...initProps,
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
                ...initProps,
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
                ...initProps,
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