import React from 'react';
import { AppContainer } from '../AppContainer';
import configureMockStore from 'redux-mock-store';
import LangHelper from '@jsroot/common/langHelper';
import { shallow } from 'enzyme';
import { toast } from 'react-toastify';
import NewNotificationTypeWrapper from '../NewNotificationType';
import EditNotificationTypeWrapper from '../EditNotificationType';
import toJson from 'enzyme-to-json';

jest.mock('react-toastify');
const mockStore = configureMockStore();
const store = mockStore({});

describe('AppContainer', () => {
    beforeEach(() => {
        LangHelper.getResource = jest.fn(value => value);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders default component correctly', () => {
        // Act
        const container = shallow(<AppContainer/>);

        // Assert
        expect(toJson(container)).toMatchSnapshot();
    });

    describe('componentWillUnmount', () => {
        const props = {
            resetState: jest.fn()
        };

        it('should do reset store', () => {
            const container = shallow(<AppContainer {...props} />);

            // Action
            container.instance().componentWillUnmount();

            // Assert
            expect(props.resetState).toHaveBeenCalled();
        });
    });

    describe('create notification type', () => {
        it('render component NewNotificationType correctly', () => {
            // Arrange
            const props = {
                createNotificationTypePopup: { show: true }
            };
            const state = {
                policy: 2
            };

            const container = shallow(<AppContainer {...props} />);
            container.instance().setState(state);
            // Assert
            expect(toJson(container)).toMatchSnapshot();
            expect(container.find(NewNotificationTypeWrapper).length).toBe(1);
        });

        it('should call correct functions when close popup', () => {
            // Arrange
            const props = {
                setCreateNotificationTypePopup: jest.fn(),
                setCreateNotificationTypeResult: jest.fn(),
                createNotificationTypePopup: { show: true }
            };
            const container = shallow(<AppContainer {...props} />).instance();

            // Act
            container.handleCloseCreatePopup();

            // Assert
            expect(props.setCreateNotificationTypePopup).toHaveBeenCalledWith({ show: false });
            expect(props.setCreateNotificationTypeResult).toHaveBeenCalledWith(null);
        });

        it('should call correct functions when create notification type success', () => {
            // Arrange
            const props = {
                getNotificationTypeGridData: jest.fn()
            };
            const container = shallow(<AppContainer {...props} />).instance();
            container.handleCloseCreatePopup = jest.fn();

            // Act
            container.handleCreateSuccess();

            // Assert
            expect(props.getNotificationTypeGridData).toHaveBeenCalledWith(props.notificationTypeGridParams);
            expect(container.handleCloseCreatePopup).toHaveBeenCalled();
        });
    });

    describe('edit notification type', () => {
        it('render component EditNotificationType correctly', () => {
            // Arrange
            const props = {
                editNotificationTypePopup: { show: true }
            };

            // Act
            const state = {
                policy: 2
            };

            const container = shallow(<AppContainer {...props} />);
            container.instance().setState(state);

            // Assert
            expect(container.find(EditNotificationTypeWrapper).length).toBe(1);
        });

        it('should call correct functions when close popup', () => {
            // Arrange
            const props = {
                setEditNotificationTypePopup: jest.fn(),
                setEditNotificationTypeResult: jest.fn(),
                editNotificationTypePopup: { show: true }
            };
            const container = shallow(<AppContainer {...props} />).instance();

            // Act
            container.handleCloseEditPopup();

            // Assert
            expect(props.setEditNotificationTypePopup).toHaveBeenCalledWith({ show: false });
            expect(props.setEditNotificationTypeResult).toHaveBeenCalledWith(null);
        });

        it('should call correct functions when edit notification type successful', () => {
            // Arrange
            const props = {
                getNotificationTypeGridData: jest.fn()
            };
            const container = shallow(<AppContainer {...props} />).instance();

            container.handleCloseEditPopup = jest.fn();

            // Act
            container.handleEditSuccess();

            // Assert
            expect(props.getNotificationTypeGridData).toHaveBeenCalledWith(props.notificationTypeGridParams);
            expect(container.handleCloseEditPopup).toHaveBeenCalled();
        });
    });

    describe('delete notification type', () => {
        it('should call correct functions when close popup', () => {
            // Arrange
            const props = {
                setDeleteNotificationTypePopup: jest.fn(),
                deleteNotificationTypePopup: { show: true }
            };
            const container = shallow(<AppContainer {...props} />).instance();

            // Act
            container.handleCloseDeletePopup();

            // Assert
            expect(props.setDeleteNotificationTypePopup).toHaveBeenCalledWith({ show: false });
        });

        it('should call correct functions when delete successful', async () => {
            // Arrange
            const promise = Promise.resolve({ isSuccessful: true, message: '' });
            const props = {
                deleteNotificationTypePopup: { notificationTypeId: 1, name: 'voiding bet'},
                deleteNotificationType: jest.fn(() => promise),
                getNotificationTypeGridData: jest.fn()
            };
            const container = shallow(<AppContainer {...props} />).instance();
            container.handleCloseDeletePopup = jest.fn();

            // Act
            container.handleDelete();
            await promise;

            // Assert
            expect(props.deleteNotificationType).toHaveBeenCalledWith({ notificationTypeId: 1, notificationTypeName: 'voiding bet'});
            expect(toast.success).toHaveBeenCalledWith('DeleteNotificationTypeSuccessfully');
            expect(container.handleCloseDeletePopup).toHaveBeenCalled();
            expect(props.getNotificationTypeGridData).toHaveBeenCalledWith(props.notificationTypeGridParams);

        });

        it('should call correct when delete unsuccessful', async () => {
            // Arrange
            const promise = Promise.resolve({ isSuccessful: false, message: 'unsuccessful' });
            const props = {
                deleteNotificationTypePopup: { notificationTypeId: 1, name: 'voiding bet' },
                deleteNotificationType: jest.fn(() => promise),
                getNotificationTypeGridData: jest.fn()
            };
            const container = shallow(<AppContainer {...props} />).instance();
            container.handleCloseDeletePopup = jest.fn();

            // Act
            container.handleDelete();
            await promise;

            // Assert
            expect(props.deleteNotificationType).toHaveBeenCalledWith({notificationTypeId: 1, notificationTypeName: 'voiding bet'});
            expect(toast.error).toHaveBeenCalledWith('unsuccessful');
            expect(container.handleCloseDeletePopup).toHaveBeenCalled();
            expect(props.getNotificationTypeGridData).toHaveBeenCalledWith(props.notificationTypeGridParams);
        });
    });
});