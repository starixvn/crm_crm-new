import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import { ActionCreators } from '../actions';

import {
    setGridParams,
    setAllSettings,
    setDeletedFeedback
} from '../deletedFeedbackSlice';

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

    describe('getAllSettings', () => {
        it('should handle getAllSettings when fetching data have been done', async () => {
            // Arrange
            const response = {
                customerType: [{settingValue: 'All'}]
            };
            const expectedActions = [{ type: setAllSettings.type, payload: response.data }];
            const store = mockStore({ settings: null });
            const promise = Promise.resolve(response);
            DataService.getDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.getAllSettings());

            // Assert
            expect(DataService.getDataAsync).toHaveBeenCalledWith('DeletedFeedback/GetAllSettings');
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('getDeletedFeedback', () => {
        it('should handle getDeletedFeedback when fetching data have been done', async () => {
            // Arrange
            const expectedParams = {
                userName: ""
            };
            const response = {
                data:[
                    {customerType: [{settingValue: 'All'}]}
                ]
            };
            const expectedActions = [{ type: setDeletedFeedback.type, payload: response.data }];
            const store = mockStore({ gridData: null });
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.getDeletedFeedback(expectedParams));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('DeletedFeedback/GetDeletedFeedback', expectedParams);
            expect(store.getActions()).toEqual(expectedActions);
        });    
    });

    describe('exportExcel', () => {
        it('should call exactly functions', async () => {
            // Arrange
            const expectedParams = {
                userName: ""
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
            expect(DataService.getFileAsync).toHaveBeenCalledWith('DeletedFeedback/ExportExcel', expectedParams);
            expect(Site.downloadFile).toHaveBeenCalledWith(response.data, filename);
        });
    });
});