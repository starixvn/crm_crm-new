import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import { ActionCreators } from '../actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actionCreators', () => {
    beforeAll(() => {
        Site.resolveClientUrl = jest.fn((url) => url);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getLatestFeedback ', () => {
        it('should handle setLatestFeedback when fetching getLatestFeedback have been done', async () => {
            // Arrange
            const response = {
                data: {
                    test: []
                }
            };
            const promise = Promise.resolve(response);
            Site.blockUI = jest.fn();
            Site.unblockUI = jest.fn();
            DataService.postDataAsync = jest.fn(() => promise);
            const expectedActions = [{ type: ActionCreators.setLatestFeedback.type, payload: response.data }];
            const store = mockStore({ gridData: null });

            // Act
            await store.dispatch(ActionCreators.getLatestFeedback({}));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('LatestFeedback/GetLatestFeedback',{});
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('getLatestFeedbackByCustId ', () => {
        it('should handle setLatestFeedback when fetching getLatestFeedback have been done', async () => {
            // Arrange
            const response = {
                data: {
                    test: []
                }
            };
            const promise = Promise.resolve(response);
            Site.blockUI = jest.fn();
            Site.unblockUI = jest.fn();
            DataService.postDataAsync = jest.fn(() => promise);
            const expectedActions = [{ type: ActionCreators.setLatestFeedback.type, payload: response.data }];
            const store = mockStore({});

            // Act
            await store.dispatch(ActionCreators.getLatestFeedbackByCustId({id: 2}));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('LatestFeedback/GetLatestFeedbackByCustId',{id: 2});
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('exportExcel', () => {
        it('should call exactly functions', async () => {
            // Arrange
            const expectedParams = {
                userName: ''
            };
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
            const store = mockStore({ gridData: null });
            // Act
            await store.dispatch(ActionCreators.exportExcel(expectedParams));

            // Assert
            expect(DataService.getFileAsync).toHaveBeenCalledWith('LatestFeedback/ExportExcel', expectedParams);
            expect(Site.downloadFile).toHaveBeenCalledWith(response.data, filename);
        });
    });

    describe('searchByCustExportExcel ', () => {
        it('should call exactly functions', async () => {
            // Arrange
            const expectedParams = {
                userName: ''
            };
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
            const store = mockStore({ gridData: null });
            // Act
            await store.dispatch(ActionCreators.searchByCustExportExcel(expectedParams));

            // Assert
            expect(DataService.getFileAsync).toHaveBeenCalledWith('LatestFeedback/SearchByCustExportExcel', expectedParams);
            expect(Site.downloadFile).toHaveBeenCalledWith(response.data, filename);
        });
    });
});