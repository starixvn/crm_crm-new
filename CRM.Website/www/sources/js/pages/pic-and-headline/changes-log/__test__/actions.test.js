import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import { ActionCreators } from '../actions';

import {
    setGridParams,
    setGridParamsPic,
    setHeadlineDA,
    setPicReport,
    setActionType
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

    
    describe('getHeadlineDAReport', () => {
        it('should handle getHeadlineDAReport when fetching data have been done', async () => {
            // Arrange
            const response = [
                { logId: 1, editBy: 'sa' }
            ];
            const expectedParams = {
                username: 'sa',
                fromDate: 'Oct 31, 2021 01:00:00 PM',
                editBy: '',
                pageIndex: 1,
                pageSize: 100,
                toDate: 'Nov 20, 2021 10:40:00 PM'
            };
            const expectedActions = [{ type: ActionCreators.setHeadlineDA.type, payload: response.data }];
            const store = mockStore({ headlineDA: null });
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.getHeadlineDAReport(expectedParams));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('ChangesLog/GetHeadlineDAReport', expectedParams);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    
    describe('getPicReport', () => {
        it('should handle getPicReport when fetching data have been done', async () => {
            // Arrange
            const response = [
                { logId: 1, editBy: 'sa' }
            ];
            const expectedParams = {
                pic: '',
                fromDate: 'Oct 31, 2021 01:00:00 PM',
                editBy: '',
                pageIndex: 1,
                pageSize: 100,
                toDate: 'Nov 20, 2021 10:40:00 PM'
            };
            const expectedActions = [{ type: ActionCreators.setPicReport.type, payload: response.data }];
            const store = mockStore({ picReport: null });
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.getPicReport(expectedParams));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('ChangesLog/GetPicReport', expectedParams);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('getActionTypes', () => {
        it('should handle setActionType when fetching data have been done', async () => {
            // Arrange
            const response = { data: { id: 100, name: 'Add the general information for customer' }};
            const store = mockStore({ actionType: null });
            const promise = Promise.resolve(response);
            DataService.getDataAsync = jest.fn(() => promise);

            // Act
            const result = await store.dispatch(ActionCreators.getActionTypes());

            // Assert
            expect(DataService.getDataAsync).toHaveBeenCalledWith('ChangesLog/GetActionTypes');
            expect(result).toEqual(response.data);
        });
    });
});