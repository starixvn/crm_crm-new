import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import { ActionCreators } from '../actions';

import {
    setAllLogAction,
    setActivityLog
} from '../actionLogSlice';

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

    
    describe('getAllLogAction', () => {
        it('should handle getAllLogAction when fetching data have been done', async () => {
            // Arrange
            const expectedParams = {
                actionType: 1
            };
            const response = [
                { id: 100, name: 'Add the general information for customer' }
            ]
            const expectedActions = [{ type: setAllLogAction.type, payload: response.data }];
            const store = mockStore({ gridData: null });
            const promise = Promise.resolve(response);
            DataService.getDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.getAllLogAction(expectedParams));

            // Assert
            expect(DataService.getDataAsync).toHaveBeenCalledWith('ActionLog/GetAllLogAction', expectedParams);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    
    describe('getActivityLog', () => {
        it('should handle getActivityLog when fetching data have been done', async () => {
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
            }
            const expectedActions = [{ type: setActivityLog.type, payload: response.data }];
            const store = mockStore({ gridData: null });
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.getActivityLog(expectedParams));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('ActionLog/GetActivityLog', expectedParams);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});