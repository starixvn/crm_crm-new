import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import { ActionCreators } from '../actions';
import {
    setGridData,
    setEditSmaFeedback
} from '../smaFeedbackSlice';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('SMA Feedback Actions', () => {
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
            expect(DataService.postDataAsync).toHaveBeenCalledWith('ManageSmaFeedback/GetSmaFeedback', expectedParams);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('editSmaFeedback', () => {
        it('should handle setEditSmaFeedback when fetching data have been done', async () => {
            // Arrange
            const expectedParams = { username: 'test' };
            const response = { data: [{id: 0, name: null, settingId: 70000, settingValue: "Internal Request"}]};
            const expectedActions = [{ type: setEditSmaFeedback.type, payload: response.data }];
            const store = mockStore({ gridData: null });
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.editSmaFeedback(expectedParams));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('ManageSmaFeedback/EditSmaFeedback', expectedParams);
            expect(store.getActions()).toEqual(expectedActions);
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
            expect(DataService.getFileAsync).toHaveBeenCalledWith('ManageSmaFeedback/ExportExcel', expectedParams);
            expect(Site.downloadFile).toHaveBeenCalledWith(response.data, filename);
        });
    });
});