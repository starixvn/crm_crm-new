import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import { ActionCreators } from '../actions';

import {
    setDynamicReports,
    setAllSettings,
    setFeedbackSubjectTemplates
} from '../dynamicReportSlice';

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

    describe('getDynamicReports', () => {
        it('should handle getDynamicReports when fetching data have been done', async () => {
            // Arrange
            const params = { reportType: 1 };
            const response = { data: {} };
            const expectedActions = [{ type: setDynamicReports.type, payload: response.data }];

            const store = mockStore({ dynamicReports: null });
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.getDynamicReports(params));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('DynamicReport/GetDynamicReports', params);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('getAllSettings', () => {
        it('should handle getAllSettings when fetching data have been done', async () => {
            // Arrange
            const response = { data: {} };
            const expectedActions = [{ type: setAllSettings.type, payload: response.data }];

            const store = mockStore({ allSettings: null });
            const promise = Promise.resolve(response);
            DataService.getDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.getAllSettings());

            // Assert
            expect(DataService.getDataAsync).toHaveBeenCalledWith('DynamicReport/GetAllSettings');
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('exportExcel', () => {
        it('should call exactly functions', async () => {
            // Arrange
            const expectedParams = {};
            const response = {
                data: {},
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
            expect(DataService.getFileAsync).toHaveBeenCalledWith('DynamicReport/ExportExcel', expectedParams);
            expect(Site.downloadFile).toHaveBeenCalledWith(response.data, filename);
        });
    });

    describe('getFeedbackSubjectTemplates', () => {
        it('should handle setFeedbackSubjectTemplates when fetching data have been done', async () => {
            // Arrange
            const response = { countries: [] };
            const expectedParams = 'sa';
            const expectedActions = [{ type: setFeedbackSubjectTemplates.type, payload: response.data }];
            const store = mockStore({ feedbackSubjectTemplates: null });
            const promise = Promise.resolve(response);
            DataService.getDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.getFeedbackSubjectTemplates(expectedParams));

            // Assert
            expect(DataService.getDataAsync).toHaveBeenCalledWith(`Common/GetFeedbackSubjectTemplate`, {subject: expectedParams});
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});