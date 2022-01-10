import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import { ActionCreators } from '../actions';

import {
    setActionLog,
    setGridParams,
    setGridSettingLogs
} from '../actions';

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

    
    describe('getActionLogs', () => {
        it('should handle getActionLogs when fetching data have been done', async () => {
            // Arrange
            const response = [
                { id: 100, name: 'Add the general information for customer' }
            ];
            const expectedActions = [{ type: ActionCreators.setActionLog.type, payload: response.data }];
            const store = mockStore({ gridData: null });
            const promise = Promise.resolve(response);
            DataService.getDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.getActionLogs());

            // Assert
            expect(DataService.getDataAsync).toHaveBeenCalledWith('SettingLog/GetActionLog');
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    
    describe('getGridSettingLogs', () => {
        it('should handle getGridSettingLogs when fetching data have been done', async () => {
            // Arrange
            const expectedParams = {
                actionId: 0,
                customerId: 1754,
                fromDate: 'Oct 31, 2021 01:00:00 PM',
                handler: '',
                pageIndex: 1,
                pageSize: 100,
                toDate: 'Nov 20, 2021 10:40:00 PM'
            };
            const response = {
                data: [ { logDate: 'Nov 18, 2021 04:48:01 AM', username: 'sa', actionName: 'Update redemption' } ],
                totalItems: 18
            };
            const expectedActions = [{ type: ActionCreators.setGridSettingLogs.type, payload: response.data }];
            const store = mockStore({ gridData: null });
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.getGridSettingLogs(expectedParams));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('SettingLog/GetSettingLog', expectedParams);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});