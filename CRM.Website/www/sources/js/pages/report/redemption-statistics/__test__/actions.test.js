import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import { ActionCreators } from '../actions';

import {
    setGridParams,
    setGridParamDetails,
    setAllSettings,
    setRedemptionSummary,
    setRedemptionDetails,
    setOpenDetails
} from '../redemptionStatisticsSlice';

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

    describe('setAllSettings', () => {
        it('should handle setAllSettings when fetching data have been done', async () => {
            // Arrange
            const response = {
                data: {
                    currencies: [{id: 2, name: "RM"}, {id: 3, name: "US$"}, {id: 5, name: "HK$"}],
                    statuses: [{statusId: 11008, name: "KIV", displayOrder: 1, isActive: true}]
                }
            };

            const expectedActions = [{ type: setAllSettings.type, payload: response.data }];
            const store = mockStore({ settings: null });
            const promise = Promise.resolve(response);
            DataService.getDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.getAllSettings());

            // Assert
            expect(DataService.getDataAsync).toHaveBeenCalledWith('RedemptionStatistics/getAllSettings');
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('getRedemptionSummary', () => {
        it('should handle setRedemptionSummary when fetching getRedemptionSummary have been done', async () => {
            // Arrange
            const expectedParams = {
                currencyId: "2,3,5,6,13,33,43,45",
                fromDate: "Apr 05, 2022",
                reportBy: 1,
                statusId: "11008,11009,11004,11010,11011,11012"
            };
            const response = {
                data:[
                    {
                        data:[{claimTime: "Jan 01, 0001 12:00:00 AM", subject: null, month: 12, year: 2021}],
                        title: "Redemption Statistics Report from Apr 05, 2021 to Jan Apr 05, 2022",
                        totals: {RM: 5, US$: 15, EURO: 2}
                    }
                ]
            };
            const expectedActions = [{ type: ActionCreators.setRedemptionSummary.type, payload: response.data }];
            const store = mockStore({ gridData: null });
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.getRedemptionSummary(expectedParams));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('RedemptionStatistics/GetRedemptionSummary', expectedParams);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('getRedemptionDetails', () => {
        it('should handle setRedemptionSummary when fetching getRedemptionDetails have been done', async () => {
            // Arrange
            const expectedParams = {
                currencyId: "2,3,5,6,13,33,43,45",
                fromDate: "Dec 01, 2021",
                pageIndex: 1,
                pageSize: 100,
                reportBy: 1,
                statusId: "11008,11009,11004,11010,11011,11012",
                subject: "",
                toDate: "Dec 31, 2021"
            };
            const response = {
                data:[{
                        subject: "test123", claimTime: "Dec 09, 2021 06:48:00 PM", amount: 1, doneBy: "sa", currency: "RM"
                    }]
            };
            const expectedActions = [{ type: ActionCreators.setRedemptionDetails.type, payload: response.data }];
            const store = mockStore({ gridData: null });
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.getRedemptionDetails(expectedParams));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('RedemptionStatistics/GetRedemptionDetails', expectedParams);
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
            const filename = response.headers['content-disposition'].split('filename=')[1].split(';')[0];
            Site.downloadFile = jest.fn();
            const promise = Promise.resolve(response);
            DataService.getFileAsync = jest.fn(() => promise);
            const store = mockStore({ gridData: null });
            // Act
            await store.dispatch(ActionCreators.exportExcel(expectedParams));

            // Assert
            expect(DataService.getFileAsync).toHaveBeenCalledWith('RedemptionStatistics/ExportExcel', expectedParams);
            expect(Site.downloadFile).toHaveBeenCalledWith(response.data, filename);
        });
    });

    describe('exportExcelDetails', () => {
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
            const filename = response.headers['content-disposition'].split('filename=')[1].split(';')[0];
            Site.downloadFile = jest.fn();
            const promise = Promise.resolve(response);
            DataService.getFileAsync = jest.fn(() => promise);
            const store = mockStore({ gridData: null });
            // Act
            await store.dispatch(ActionCreators.exportExcelDetails(expectedParams));

            // Assert
            expect(DataService.getFileAsync).toHaveBeenCalledWith('RedemptionStatistics/ExportExcelDetails', expectedParams);
            expect(Site.downloadFile).toHaveBeenCalledWith(response.data, filename);
        });
    });
});