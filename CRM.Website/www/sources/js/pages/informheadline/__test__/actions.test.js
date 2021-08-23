import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import { ActionCreators } from '../actions';

import{
    setInforms,
    setTitleDetail,
    setContactInformSettings,
    setContactInforms,
    setAllSettings,
    setSearchInforms,
    setUpdateContactInforms,
    setUpdateSearchInforms,
    setRemovedAccountLogs,
    setRemovedAccountLogDetails,
    setNewInforms,
    setInsertInforms
} from '../informHeadlineSlice';

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

    describe('getInforms', () => {
        it('should handle getInforms when fetching data have been done', async () => {
            // Arrange
            const response = [
                { titleId: 720, title:"test" }
            ]
            const expectedActions = [{ type: setInforms.type, payload: response.data }];
            const store = mockStore({ gridData: null });
            const promise = Promise.resolve(response);
            DataService.getDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.getInforms());

            // Assert
            expect(DataService.getDataAsync).toHaveBeenCalledWith('InformHeadline/GetInforms');
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    
    describe('exportInforms', () => {
        it('should call exactly functions', async () => {
            // Arrange
            const expectedParams = {};
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
            await store.dispatch(ActionCreators.exportInforms(expectedParams));

            // Assert
            expect(DataService.getFileAsync).toHaveBeenCalledWith('InformHeadline/ExportInforms', expectedParams);
            expect(Site.downloadFile).toHaveBeenCalledWith(response.data, filename);
        });
    });

    describe('getTitleDetail', () => {
        it('should handle getTitleDetail when fetching data have been done', async () => {
            // Arrange
            const expectedParams = {
                titleId: 720
            };
            const response = [
                { titleId: 720, title:"test", currencies: "2,3,5" }
            ]
            const expectedActions = [{ type: setTitleDetail.type, payload: response.data }];
            const store = mockStore({ titleDetail: null });
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.getTitleDetail(expectedParams));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('InformHeadline/GetTitleDetail', expectedParams);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('getContactInformSettings', () => {
        it('should handle getContactInformSettings when fetching data have been done', async () => {
            // Arrange
            const response = [
                { titleId: 720, title:"test" }
            ]
            const expectedActions = [{ type: setContactInformSettings.type, payload: response.data }];
            const store = mockStore({ contactInformSettings: null });
            const promise = Promise.resolve(response);
            DataService.getDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.getContactInformSettings());

            // Assert
            expect(DataService.getDataAsync).toHaveBeenCalledWith('InformHeadline/GetContactInformSettings');
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('getContactInforms', () => {
        it('should handle getContactInforms when fetching data have been done', async () => {
            // Arrange
            const expectedParams = {
                titleId: 720
            };
            const response = [
                { headlineId: 527906, groupId: 136, username: "S6EU" }
            ]
            const expectedActions = [{ type: setContactInforms.type, payload: response.data }];
            const store = mockStore({ contactInforms: null });
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.getContactInforms(expectedParams));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('InformHeadline/GetContactInforms', expectedParams);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('updateContactInforms', () => {
        it('should handle updateContactInforms when fetching data have been done', async () => {
            // Arrange
            const expectedParams = {
                titleId: 720, informs: []
            };
            const response = [
                { code: 0, isSuccessful: true, message: ""}
            ]
            const expectedActions = [{ type: setUpdateContactInforms.type, payload: response.data }];
            const store = mockStore({ resultUpdateContactInforms: null });
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.updateContactInforms(expectedParams));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('InformHeadline/UpdateContactInforms', expectedParams);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('getAllSettings', () => {
        it('should handle getAllSettings when fetching data have been done', async () => {
            // Arrange
            const response = [
                { currencies: [{id: 1}], productStatuses: [{statusId: 123}] }
            ]
            const expectedActions = [{ type: setAllSettings.type, payload: response.data }];
            const store = mockStore({ allSettings: null });
            const promise = Promise.resolve(response);
            DataService.getDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.getAllSettings());

            // Assert
            expect(DataService.getDataAsync).toHaveBeenCalledWith('InformHeadline/GetAllSettings');
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('getSearchInforms', () => {
        it('should handle getSearchInforms when fetching data have been done', async () => {
            // Arrange
            const expectedParams = {
                titleId: 720, currencies: "2,3,5", isVip: 2
            };
            const response = [
                { headlineId: 527906, groupId: 136, username: "S6EU" }
            ]
            const expectedActions = [{ type: setSearchInforms.type, payload: response.data }];
            const store = mockStore({ searchInforms: null });
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.getSearchInforms(expectedParams));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('InformHeadline/GetSearchInforms', expectedParams);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('updateSearchInforms', () => {
        it('should handle updateSearchInforms when fetching data have been done', async () => {
            // Arrange
            const expectedParams = {
                titleId: 720, informs: []
            };
            const response = [
                { code: 0, isSuccessful: true, message: "" }
            ]
            const expectedActions = [{ type: setUpdateSearchInforms.type, payload: response.data }];
            const store = mockStore({ resultUpdateSearchInforms: null });
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.updateSearchInforms(expectedParams));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('InformHeadline/UpdateSearchInforms', expectedParams);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('exportContactInforms', () => {
        it('should call exactly functions', async () => {
            // Arrange
            const expectedParams = {};
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
            await store.dispatch(ActionCreators.exportContactInforms(expectedParams));

            // Assert
            expect(DataService.getFileAsync).toHaveBeenCalledWith('InformHeadline/ExportContactInforms', expectedParams);
            expect(Site.downloadFile).toHaveBeenCalledWith(response.data, filename);
        });
    });

    describe('exportSearchInforms', () => {
        it('should call exactly functions', async () => {
            // Arrange
            const expectedParams = {};
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
            await store.dispatch(ActionCreators.exportSearchInforms(expectedParams));

            // Assert
            expect(DataService.getFileAsync).toHaveBeenCalledWith('InformHeadline/ExportSearchInforms', expectedParams);
            expect(Site.downloadFile).toHaveBeenCalledWith(response.data, filename);
        });
    });

    describe('getRemovedAccountLogs', () => {
        it('should handle getRemovedAccountLogs when fetching data have been done', async () => {
            // Arrange
            const expectedParams = {
                titleId: 720
            };
            const response = [
                { item: [{logId:1}], totalItems: 1 }
            ];
            const expectedActions = [{ type: setRemovedAccountLogs.type, payload: response.data }];
            const store = mockStore({ removedAccountLogs: null });
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.getRemovedAccountLogs(expectedParams));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('InformHeadline/GetRemovedAccountLogs', expectedParams);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('getRemovedAccountLogDetails', () => {
        it('should handle getRemovedAccountLogDetails when fetching data have been done', async () => {
            // Arrange
            const expectedParams = {
                logId: 1
            };
            const response = [
                { item: [{directAccount: "CRM"}], totalItems: 1 }
            ]
            const expectedActions = [{ type: setRemovedAccountLogDetails.type, payload: response.data }];
            const store = mockStore({ removedAccountLogDetails: null });
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.getRemovedAccountLogDetails(expectedParams));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('InformHeadline/GetRemovedAccountLogDetails', expectedParams);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('getNewInforms', () => {
        it('should handle getNewInforms when fetching data have been done', async () => {
            // Arrange
            const expectedParams = {
                title: "", currencies: "2,3", levels: "4,3"
            };
            const response = [
                { id: 1, headlineId: 2464, username: "BYRON", groupId: 0 }
            ]
            const expectedActions = [{ type: setNewInforms.type, payload: response.data }];
            const store = mockStore({ newInforms: null });
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.getNewInforms(expectedParams));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('InformHeadline/GetNewInforms', expectedParams);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('insertInforms', () => {
        it('should handle insertInforms when fetching data have been done', async () => {
            // Arrange
            const expectedParams = {
                title: "", currencies: "2,3", levels: "4,3"
            };
            const response = [
                { code: 0, isSuccessful: true, message: "" }
            ]
            const expectedActions = [{ type: setInsertInforms.type, payload: response.data }];
            const store = mockStore({ resultInsertInforms: null });
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.insertInforms(expectedParams));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('InformHeadline/InsertInforms', expectedParams);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('updateInformStatus', () => {
        it('should handle updateInformStatus when fetching data have been done', async () => {
            // Arrange
            const expectedParams = {
                statusType: true, titleId: 720
            };
            const response = [
                { code: 0, isSuccessful: true, message: "" }
            ]
            const store = mockStore();
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.updateInformStatus(expectedParams));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('InformHeadline/UpdateInformStatus', expectedParams);
        });
    });

    describe('exportNewInforms', () => {
        it('should call exactly functions', async () => {
            // Arrange
            const expectedParams = {};
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
            await store.dispatch(ActionCreators.exportNewInforms(expectedParams));

            // Assert
            expect(DataService.getFileAsync).toHaveBeenCalledWith('InformHeadline/ExportNewInforms', expectedParams);
            expect(Site.downloadFile).toHaveBeenCalledWith(response.data, filename);
        });
    });
});