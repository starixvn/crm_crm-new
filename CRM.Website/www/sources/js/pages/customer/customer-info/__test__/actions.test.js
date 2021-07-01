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

    describe('getCustomerInfo', () => {
        it('should handle setCustomerInfo when fetching customer information have been done', async () =>{
            // Arrange
            const expectParams = { UserName: null, IsGuest: false };
            const response = { data: {
                id: 1,
                userName: 'test',
                siteId: 0,
                countryId: 0,
                firstName: 'customertodays1',
                lastName: 'lastname',
                nickName: '', 
            } }
            const expectedActions = [{ type: ActionCreators.setCustomerInfo.type, payload: response.data}];
            const store = mockStore({ gridData: null });
            Site.blockUI = jest.fn();
            Site.unblockUI = jest.fn();
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            //Act
            await store.dispatch(ActionCreators.getCustomerInfo(expectParams));

            //Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('CustomerInfo/GetCustomerInfo', expectParams);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('getAllSettings', () => {
        it('should handle setAllSettings when fetching Customer information types have been done', async () => {
            // Arrange
            const response = {
                data: {
                    sites: {},
                    countries: {},
                    languages: {}
                }
            };
            const promise = Promise.resolve(response);
            DataService.getDataAsync = jest.fn(() => promise);
            const expectedActions = [{ type: ActionCreators.setSettings.type, payload: response.data }];
            const store = mockStore({ settings: [] });

            // Act
            await store.dispatch(ActionCreators.getSettings());

            // Assert
            expect(DataService.getDataAsync).toHaveBeenCalledWith('CustomerInfo/GetSettings');
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('editCustomerInfo', () => {
        it('should handle setEditCustomerInfo when request have been done', async () => {
            // Arrange
            const expectParams = { 
                id: 1,
                userName: 'test',
                siteId: 0
            };
            const response = { data: { isSuccessful: true, messmessageage: '' } };
            const expectedActions = [{ type: ActionCreators.setEditCustomerInfo.type, payload: response.data }];
            const promise = Promise.resolve(response);
            const store = mockStore({ editCustomerInfoResult: null });
            DataService.getDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.editCustomerInfo(expectParams));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('CustomerInfo/EditCustomerInfo', expectParams);
        });
    });
});