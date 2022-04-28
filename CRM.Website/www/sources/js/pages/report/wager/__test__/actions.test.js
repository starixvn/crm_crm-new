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


    describe('getGridData', () => {
        it('should handle setGridData when fetching summary report has been done', async () => {
            const expectedParams = {
                excludeIgnoredAcc: true
            };
            const response = {
                data: {
                    GrandTotal: {
                        Month: "test",
                        Total: 65,
                        Wagers: [{Id: 0, Name: "test", Amount: 10}, {Id: 0, Name: "test", Amount: 10}]
                    },
                    ReportTitle: "test",
                    WagerByMonths: [{Month: "test", Wagers: [{Id: 0, Name: "test", Amount: 1}, {Id: 0, Name: "test", Amount: 1}]}]
                }
            };
            const expectedActions = [{ type: ActionCreators.setGridData.type, payload: response.data }];
            const store = mockStore({ gridData: null });
            Site.blockUI = jest.fn();
            Site.unblockUI = jest.fn();
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            await store.dispatch(ActionCreators.getGridData(expectedParams)).then(() => {
                expect(DataService.postDataAsync).toHaveBeenCalledWith('WagerReport/GetWagerReport', expectedParams);
                expect(store.getActions()).toEqual(expectedActions);
            });
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
                excludeIgnoredAcc: true
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
                expect(DataService.getFileAsync).toHaveBeenCalledWith('WagerReport/ExportWagerReport', expectedParams);
                expect(Site.downloadFile).toHaveBeenCalledWith(response.data, filename);
            });
        });
    });
});