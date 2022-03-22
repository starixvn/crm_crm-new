import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import { ActionCreators } from '../actions';

import {
    setGridParams,
    setAllSettings,
    setGridData,
    setChartData
} from '../issueStatisticsSlice';

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
                data: {
                    mainCategories: {id: 1, name: 'mainCategory'},
                    subCategories: {id: 2, name: 'subCategory'}
                }
            };

            const expectedActions = [{ type: setAllSettings.type, payload: response.data }];
            const store = mockStore({ settings: null });
            const promise = Promise.resolve(response);
            DataService.getDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.getAllSettings());

            // Assert
            expect(DataService.getDataAsync).toHaveBeenCalledWith('IssueStatistics/GetAllSettings');
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('getGridData', () => {
        it('should handle setGridData when fetching getGridData have been done', async () => {
            // Arrange
            const expectedParams = {
                reportType: 1
            };
            const response = {
                data:[
                    {
                        name: 'Daily Issue Statistic Report From Mar 01, 2022 To Mar 22, 2022',
                        numberOfIssues: 0,
                        reportTypeId: 0,
                        shortName: 'Mar 01, 2022 To Mar 22, 2022'
                    }
                ]
            };
            const expectedActions = [{ type: ActionCreators.setGridData.type, payload: response.data }];
            const store = mockStore({ gridData: null });
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.getGridData(expectedParams));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('IssueStatistics/GetIssuesStatistics', expectedParams);
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
            expect(DataService.getFileAsync).toHaveBeenCalledWith('IssueStatistics/ExportExcel', expectedParams);
            expect(Site.downloadFile).toHaveBeenCalledWith(response.data, filename);
        });
    });
});