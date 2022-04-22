import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import { ActionCreators } from '../actions';
import { shallow } from 'enzyme';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actionCreators', () => {
    beforeAll(() => {
        Site.resolveClientUrl = jest.fn((url) => url);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllSetting', () => {
        it('should handle setAllSettings when fetching getAllSettings have been done', async () => {
            // Arrange
            const response = {
                data: {
                    communicationTools: [],
                    mainCategories: [],
                    products: []
                }
            };
            const promise = Promise.resolve(response);
            Site.blockUI = jest.fn();
            Site.unblockUI = jest.fn();
            DataService.getDataAsync = jest.fn(() => promise);
            const expectedActions = [{ type: ActionCreators.setAllSettings.type, payload: response.data }];
            const store = mockStore({ settings: null });

            // Act
            await store.dispatch(ActionCreators.getAllSettings());

            // Assert
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('getMainReport', () => {
        it('should handle getMainReport when fetching getMainReport have been done', async () => {
            // Arrange
            const response = {
                data: {
                    ibcReport: [],
                    licenseeReport: []
                }
            };
            const promise = Promise.resolve(response);
            Site.blockUI = jest.fn();
            Site.unblockUI = jest.fn();
            DataService.postDataAsync = jest.fn(() => promise);
            const expectedActions = [{ type: ActionCreators.setMainReport.type, payload: response.data }];
            const store = mockStore({ mainReports: null });

            // Act
            await store.dispatch(ActionCreators.getMainReport());

            // Assert
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('getReportDetails', () => {
        it('should handle getReportDetails when fetching getReportDetails have been done', async () => {
            // Arrange
            const response = {
                data: {
                    communicationTools: [],
                    extensions: [],
                    mainCategories: [],
                    products: [],
                    report: [],
                    subProducts: [],
                    totalRows: 2
                }
            };
            const promise = Promise.resolve(response);
            Site.blockUI = jest.fn();
            Site.unblockUI = jest.fn();
            DataService.postDataAsync = jest.fn(() => promise);
            const expectedActions = [{ type: ActionCreators.setReportDetails.type, payload: response.data }];
            const store = mockStore({ reportDetails: null });

            // Act
            await store.dispatch(ActionCreators.getReportDetails());

            // Assert
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('exportExcel', () => {
        it('should call exactly functions', async () => {
            // Arrange
            const response = {
                data: {
                },
                headers: {
                    ['content-disposition']: 'a; filename=test.txt;'
                }
            };
            const filename = response.headers['content-disposition'].split('filename=')[1].split(";")[0];
            const expectedParams = {
                communicationId: "1005,1000,1001,1002,1003,1004,1006,1007,1008,1009,1010,1011,1012",
                fromDate: "Apr 17, 2022",
                mainCategoryId: "3033,3034,3035,3036,3037,3038,3039,3040,3041,3042,3056,3057,3058,3059,3060,3061,3062,3063,3064,3065",
                productId: "46004,46000,46001,46002,46003,46005,46006,46007,46008",
                siteType: 0,
                toDate: "Apr 23, 2022"
            };
            Site.blockUI = jest.fn();
            Site.unblockUI = jest.fn();
            Site.downloadFile = jest.fn();
            const promise = Promise.resolve(response);
            DataService.getFileAsync = jest.fn(() => promise);
            const store = mockStore({ gridData: null });

            // Act
            await store.dispatch(ActionCreators.exportExcel(expectedParams)).then(() => {
                // Assert
                expect(DataService.getFileAsync).toHaveBeenCalledWith('LogStatistics/ExportExcel', expectedParams);
                expect(Site.downloadFile).toHaveBeenCalledWith(response.data, filename);
            });
        });
    });

    describe('exportExcelDetails', () => {
        it('should call exactly functions', async () => {
            // Arrange
            const response = {
                data: {
                },
                headers: {
                    ['content-disposition']: 'a; filename=test.txt;'
                }
            };
            const filename = response.headers['content-disposition'].split('filename=')[1].split(";")[0];
            const expectedParams = {
                communicationId: "1005,1000,1001,1002,1003,1004,1006,1007,1008,1009,1010,1011,1012",
                fromDate: "Apr 17, 2022",
                mainCategoryId: "3000,3001,3002,3003,3004,3005,3006,3008,3009,3010,3011,3013,3014,3015",
                pageIndex: 1,
                pageSize: 100,
                productId: "46004,46000,46001,46002,46003,46005,46006,46007,46008",
                siteType: 0,
                toDate: "Apr 23, 2022"
            };
            Site.blockUI = jest.fn();
            Site.unblockUI = jest.fn();
            Site.downloadFile = jest.fn();
            const promise = Promise.resolve(response);
            DataService.getFileAsync = jest.fn(() => promise);
            const store = mockStore({ gridData: null });

            // Act
            await store.dispatch(ActionCreators.exportExcelDetails (expectedParams)).then(() => {
                // Assert
                expect(DataService.getFileAsync).toHaveBeenCalledWith('LogStatistics/ExportExcelDetails', expectedParams);
                expect(Site.downloadFile).toHaveBeenCalledWith(response.data, filename);
            });
        });
    });
});