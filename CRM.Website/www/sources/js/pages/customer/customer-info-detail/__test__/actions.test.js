import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import { ActionCreators } from '../actions';
import {
    setCustomerById,
    setAllSettings,
    setEditCustomerInfoDetail
} from '../customerInfoDetailSlice'

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

    describe('getCustomerById', () => {
        it('should handle setCustomerById when fetching data have been done', async () => {
            // Arrange
            const response = { data: { firstName: 'test' } };
            const expectedParams = { customerId: 1754 };
            const expectedActions = [{ type: setCustomerById.type, payload: response.data }];
            const store = mockStore({ customerInfo: null });
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.getCustomerById(expectedParams));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalled();
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('getAllSettings', () => {
        it('should handle setAllSettings when fetching data have been done', async () => {
            // Arrange
            const response = { countries: [] };
            const expectedActions = [{ type: setAllSettings.type, payload: response.data }];
            const store = mockStore({ allSettings: null });
            const promise = Promise.resolve(response);
            DataService.getDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.getAllSettings());

            // Assert
            expect(DataService.getDataAsync).toHaveBeenCalledWith('CustomerInfoDetail/GetAllSettings');
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('editCustomerInfoDetail', () => {
        it('should handle setEditCustomerInfoDetail when fetching data have been done', async () => {
            // Arrange
            const response = { data: { firstName: 'test' } };
            const expectedParams = { firstName: 'testing' };
            const expectedActions = [{ type: setEditCustomerInfoDetail.type, payload: response.data }];
            const store = mockStore({ editCustomerInfoDetailResult: '' });
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.editCustomerInfoDetail(expectedParams));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('CustomerInfoDetail/EditCustomerInfoDetail', expectedParams);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});