import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import { ActionCreators } from '../actions';

import {
    setGridParams,
    setGridData,
    setGridParamDetails,
    setDetailsDataGrid,
    setOpenDetailPopup,
    setOpenChartPopup,
    setViewRelatedCustomerDialog
} from '../feedbackStatisticSlice';

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
        it('should handle setGridData when fetching getGridData have been done', async () => {
            // Arrange
            const expectedParams = {
                type: 1, fromDate: "Apr 02, 2020", toDate: "Jul 31, 2021"
            };
            const response = {
                data:[{
                        title: "Feedback Statistics Report from Mar 23, 2022 to Mar 30, 2022",
                        totalItems: 1,
                        usernames: [{id: 10278938, name: "starixIT"}]
                }]
            };
            const expectedActions = [{ type: ActionCreators.setGridData.type, payload: response.data }];
            const store = mockStore({ gridData: null });
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.getGridData(expectedParams));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('FeedbackStatistic/GetFeedbackStatistic', expectedParams);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('getDetails', () => {
        it('should handle setDetailsDataGrid when fetching getDetails have been done', async () => {
            // Arrange
            const expectedParams = {
                type: 1, fromDate: "Apr 02, 2020", toDate: "Jul 31, 2021", mainCategoryId: 0
            };
            const response = {
                data:[{
                        title: "Feedback Statistics Report from Mar 23, 2022 to Mar 30, 2022",
                        totalItems: 1,
                        usernames: [{id: 10278938, name: "starixIT"}]
                }]
            };
            const expectedActions = [{ type: ActionCreators.setDetailsDataGrid.type, payload: response.data }];
            const store = mockStore({ gridData: null });
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.getDetails(expectedParams));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('FeedbackStatistic/GetFeedbackStatisticDetails', expectedParams);
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
            const store = mockStore({});
            // Act
            await store.dispatch(ActionCreators.exportExcel(expectedParams));

            // Assert
            expect(DataService.getFileAsync).toHaveBeenCalledWith('FeedbackStatistic/ExportExcel', expectedParams);
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
            const store = mockStore({});
            // Act
            await store.dispatch(ActionCreators.exportExcelDetails(expectedParams));

            // Assert
            expect(DataService.getFileAsync).toHaveBeenCalledWith('FeedbackStatistic/ExportExcelDetails', expectedParams);
            expect(Site.downloadFile).toHaveBeenCalledWith(response.data, filename);
        });
    });
});