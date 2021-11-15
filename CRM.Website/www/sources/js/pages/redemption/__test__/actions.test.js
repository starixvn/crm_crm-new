import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import { ActionCreators } from '../actions';

import {
    setLogsByCustomerId,
    setAllStatus,
    setLogById,
    setSettings
} from '../redemptionSlice';

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

    describe('getLogsByCustomerId', () => {
        it('should handle getLogsByCustomerId when fetching data have been done', async () => {
            // Arrange
            const expectedParams = {
                customerId: 1754
            };
            const response = [
                { id: 1, subject: 'test', status: 'KIV' }
            ]
            const expectedActions = [{ type: setLogsByCustomerId.type, payload: response.data }];
            const store = mockStore({ gridData: null });
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.getLogsByCustomerId(expectedParams));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('Redemption/GetLogsByCustomerId', expectedParams);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('getAllStatus', () => {
        it('should handle getAllStatus when fetching data have been done', async () => {
            // Arrange
            const response = [
                { status: ['KIV', 'Open', 'Delete'] }
            ]
            const expectedActions = [{ type: setAllStatus.type, payload: response.data }];
            const store = mockStore({ gridData: null });
            const promise = Promise.resolve(response);
            DataService.getDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.getAllStatus());

            // Assert
            expect(DataService.getDataAsync).toHaveBeenCalledWith('Redemption/GetAllStatus?isEdit=true');
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('getLogById', () => {
        it('should handle getLogById when fetching data have been done', async () => {
            // Arrange
            const expectedParams = {
                id: 1754
            };
            const response = [
                { id: 1, subject: 'test', status: 'KIV' }
            ]
            const expectedActions = [{ type: setLogById.type, payload: response.data }];
            const store = mockStore({ gridData: null });
            const promise = Promise.resolve(response);
            DataService.getDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.getLogById(expectedParams));

            // Assert
            expect(DataService.getDataAsync).toHaveBeenCalledWith('Redemption/GetLogById', expectedParams);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('editRedemptionLog', () => {
        it('should return response when request has been done', async () => {
            // Arrange
            const expectedParams = { id: 1 };
            const store = mockStore({});
            const response = { code: 0 };
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            // Act
            const actual = await store.dispatch(ActionCreators.editRedemptionLog(expectedParams));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('Redemption/EditRedemptionLog', expectedParams);
            expect(actual).toEqual(response);
        });
    });

    describe('getSettings', () => {
        it('should handle getSettings when fetching data have been done', async () => {
            // Arrange
            const response = [
                { status: ['KIV', 'Open', 'Delete'] }
            ]
            const expectedActions = [{ type: setSettings.type, payload: response.data }];
            const store = mockStore({ gridData: null });
            const promise = Promise.resolve(response);
            DataService.getDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.getSettings());

            // Assert
            expect(DataService.getDataAsync).toHaveBeenCalledWith('Redemption/GetAllStatus?isEdit=false');
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('createRedemptionLog', () => {
        it('should return response when request has been done', async () => {
            // Arrange
            const expectedParams = { id: 1 };
            const store = mockStore({});
            const response = { code: 0 };
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            // Act
            const actual = await store.dispatch(ActionCreators.createRedemptionLog(expectedParams));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('Redemption/CreateRedemptionLog', expectedParams);
            expect(actual).toEqual(response);
        });
    });
});