import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import { ActionCreators } from '../actions';

import {
    setGridData,
    setCreateAnnouncement,
    setEditAnnouncement,
    setAnnouncementTemplate,
    setSettings,
    setValidateAnnouncement
} from '../announcementSlice';

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
            const expectedParams = {
                announcementId: null,
                fromDate: "Feb 16, 2023 12:00:00 AM",
                pageIndex: 1,
                pageSize: 100
            };
            const response ={ data: [{announcementId: 65014, notificationTemplateName: "Special Announcement s" }], totalItems : 300 };
            const expectedActions = [{ type: setGridData.type, payload: response.data }];
            const store = mockStore({});
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.getGridData(expectedParams));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('Announcement/GetAnnouncement', expectedParams);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('getAnnouncementById', () => {
        it('should return exact value when fetching data have been done', async () => {
            // Arrange
            const store = mockStore({});
            const response = {announcementId: 65014, notificationTemplateName: "Special Announcement s" };
            const promise = Promise.resolve(response);
            DataService.getDataAsync = jest.fn(() => promise);

            // Act
            const actual = await store.dispatch(ActionCreators.getAnnouncementById(1));

            // Assert
            expect(DataService.getDataAsync).toHaveBeenCalledWith('Announcement/GetAnnouncementById/1');
            expect(actual).toEqual(response);
        });
    });

    describe('createAnnouncement', () => {
        it('should handle setCreateAnnouncement when fetching data have been done', async () => {
            // Arrange
            const formData = new FormData();
            formData.append('headlineType', 2);
            const response = {code: 0, isSuccessful: true};
            const expectedActions = [{ type: setCreateAnnouncement.type, payload: response.data }];
            const store = mockStore({});
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.createAnnouncement(formData));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('Announcement/SaveFilesAndCreate', formData);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('editAnnouncement', () => {
        it('should handle setEditAnnouncement when fetching data have been done', async () => {
            // Arrange
            const formData = new FormData();
            formData.append('headlineType', 2);
            const response = {code: 0, isSuccessful: true};
            const expectedActions = [{ type: setEditAnnouncement.type, payload: response.data }];
            const store = mockStore({});
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.editAnnouncement(formData));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('Announcement/Edit', formData);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('getAnnouncementTemplate', () => {
        it('should handle setAnnouncementTemplate when fetching data have been done', async () => {
            // Arrange
            const params = {};
            const response = {data: {contents: [{notificationTemplateId: 474, languageId: 50000, language: "EN", content: "Content (EN)"}]}};
            const expectedActions = [{ type: setAnnouncementTemplate.type, payload: response.data }];
            const store = mockStore({});
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.getAnnouncementTemplate(params));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('Announcement/GetAnnouncementTemplate', {});
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('getLanguages', () => {
        it('should return exact value when fetching data have been done', async () => {
            const store = mockStore({});
            const response = { data:[{id: 0, name: null, settingId: 50000, settingName: "NotificationTemplateLanguage", settingValue: "EN"}]};
            const promise = Promise.resolve(response);
            DataService.getDataAsync = jest.fn(() => promise);

            // Act
            const actual = await store.dispatch(ActionCreators.getLanguages());

            // Assert
            expect(DataService.getDataAsync).toHaveBeenCalledWith('Announcement/GetLanguages');
            expect(actual).toEqual(response.data);
        });
    });

    describe('getSettings', () => {
        it('should handle setSettings when fetching data have been done', async () => {
            // Arrange
            const response ={ data: {
                currencyList: [{id: 11, name: "ABC"}, {id: 18, name: "ADA1"}, {id: 9, name: "AUD"}, {id: 97, name: "BDT"}],
                headlineTypeList: [{id: 0, name: "Normal"}, {id: 1, name: "VIP"}],
                siteList: [{siteID: 23, site: "222223"}, {siteID: 16, site: "611111"}, {siteID: 20, site: "722222"}]}
            };
            const expectedActions = [{ type: setSettings.type, payload: response.data }];
            const store = mockStore({});
            const promise = Promise.resolve(response);
            DataService.getDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.getSettings());

            // Assert
            expect(DataService.getDataAsync).toHaveBeenCalledWith('Announcement/AllSetting');
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('cancelAnnouncementId', () => {
        it('should return exact value when fetching data have been done', async () => {
            // Arrange
            const store = mockStore({});
            const response = {code: 0, isSuccessful: true};
            const promise = Promise.resolve(response);
            DataService.getDataAsync = jest.fn(() => promise);

            // Act
            const actual = await store.dispatch(ActionCreators.cancelAnnouncementId(1,'done'));

            // Assert
            expect(DataService.getDataAsync).toHaveBeenCalledWith('Announcement/Cancel?id=1&status=done');
        });
    });

    describe('validateAnnouncement', () => {
        it('should handle validateAnnouncement when fetching data have been done', async () => {
            // Arrange
            const expectedParams = {
                announcementId: null,
                fromDate: "Feb 16, 2023 12:00:00 AM",
                pageIndex: 1,
                pageSize: 100
            };
            const response ={ data: [{announcementId: 65014, notificationTemplateName: "Special Announcement s" }], totalItems : 300 };
            const expectedActions = [{ type: setValidateAnnouncement.type, payload: response.data }];
            const store = mockStore({});
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.validateAnnouncement(expectedParams));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('Announcement/ValidateAnnouncement', expectedParams);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});