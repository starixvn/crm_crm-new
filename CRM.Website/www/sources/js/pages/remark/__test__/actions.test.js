import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import { ActionCreators } from '../actions';
import {
    setRemarks
} from '../remarkSlice';

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

    describe('getRemarks', () => {
        it('should handle setRemarks when fetching data have been done', async () => {
            // Arrange
            const response = { data: { specialRemarks: ['test'], normalRemarks: ['testing'] } };
            const expectedParams = { 
                customerId: 1754
            };
            const expectedActions = [{ type: setRemarks.type, payload: response.data }];
            const store = mockStore({ gridData: null });
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.getRemarks(expectedParams));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('Remark/GetRemarks', expectedParams);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('editRemarks', () => {
        it('should return response when request has been done', async () => {
            // Arrange
            const expectedParams = { customerId: 1754, specialRemarks: ['test'], normalRemarks: ['testing'] };
            const store = mockStore({});
            const response = { data: {code: 0, isSuccessful: true }};
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            // Act
            const actual = await store.dispatch(ActionCreators.editRemarks(expectedParams));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('Remark/EditRemarks', expectedParams);
            expect(actual).toEqual(response);
        });
    });
});