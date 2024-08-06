import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import { ActionCreators } from '../actions';
import {
    setGridParams,
    setGridData,
    setEditAdmNotification,
    setAutoRefresh,
    setIsRefresh
} from '../notificationCenterSlice';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actionCreators', () => {
    beforeAll(() => {
        Site.blockUI = jest.fn();
        Site.unblockUI = jest.fn();
        Site.resolveClientUrl = jest.fn((url) => url);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getGridData', () => {
        it('should handle setGridData when fetching data have been done', async () => {
            // Arrange
            const expectedParams = { username: 'test' };
            const response = { data: [{id: 0, name: null, settingId: 70000, settingValue: "Internal Request"}]};
            const expectedActions = [{ type: setGridData.type, payload: response.data }];
            const store = mockStore({ gridData: null });
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.getGridData(expectedParams));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('NotificationCenter/GetResultAdmNotification', expectedParams);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('getAdmNotificationById', () => {
        it('should return response when request has been done', async () => {
            // Arrange
            const id = 1;
            const store = mockStore({});
            const response = { data: [{picId: 1, username: 'test'}] };
            const promise = Promise.resolve(response);
            DataService.getDataAsync = jest.fn(() => promise);

            // Act
            const actual = await store.dispatch(ActionCreators.getAdmNotificationById(id));

            // Assert
            expect(DataService.getDataAsync).toHaveBeenCalledWith(`NotificationCenter/GetResultAdmNotificationById/${id}`);
            expect(actual.data).toEqual(response.data);
        });
    });

    describe('editAdmNotification', () => {
        it('should handle setEditAdmNotification when fetching data have been done', async () => {
            // Arrange
            const expectedParams = { username: 'test' };
            const response = { data: [{id: 0, name: null, settingId: 70000, settingValue: "Internal Request"}]};
            const expectedActions = [{ type: setEditAdmNotification.type, payload: response.data }];
            const store = mockStore({ gridData: null });
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.editAdmNotification(expectedParams));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('NotificationCenter/EditResultAdmNotification', expectedParams);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('editAdmStatus', () => {
        it('should return response when request has been done', async () => {
            // Arrange
            const expectedParams = { username: 'test' };
            const store = mockStore({});
            const response = { data: [{picId: 1, username: 'test'}] };
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            // Act
            const actual = await store.dispatch(ActionCreators.editAdmStatus(expectedParams));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('NotificationCenter/EditResultAdmStatus', expectedParams);
            expect(actual).toEqual(response.data);
        });
    });

    describe('getSiteTicketsById', () => {
        it('should return response when request has been done', async () => {
            // Arrange
            const id = 1;
            const store = mockStore({});
            const response = { data: [{picId: 1, username: 'test'}] };
            const promise = Promise.resolve(response);
            DataService.getDataAsync = jest.fn(() => promise);

            // Act
            const actual = await store.dispatch(ActionCreators.getSiteTicketsById(id));

            // Assert
            expect(DataService.getDataAsync).toHaveBeenCalledWith(`NotificationCenter/GetSiteTicketsById/${id}`);
            expect(actual.data).toEqual(response.data);
        });
    });

    describe('exportExcel', () => {
        it('should call exactly functions', async () => {
            // Arrange
            const expectedParams = { username: 'test' };
            const response = {
                data: {
                },
                headers: {
                    ['content-disposition']: 'a; filename="test.xlsx";'
                }
            };
            const filename = response.headers['content-disposition'].split('filename=')[1].split(";")[0];
            Site.downloadFile = jest.fn();
            const promise = Promise.resolve(response);
            DataService.getFileAsync = jest.fn(() => promise);
            const store = mockStore();
            
            // Act
            await store.dispatch(ActionCreators.exportExcel(expectedParams));

            // Assert
            expect(DataService.getFileAsync).toHaveBeenCalledWith('NotificationCenter/ExportExcel', expectedParams);
            expect(Site.downloadFile).toHaveBeenCalledWith(response.data, filename);
        });
    });
});