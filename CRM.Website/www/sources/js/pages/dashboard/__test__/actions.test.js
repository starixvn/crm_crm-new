import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import { ActionCreators } from '../actions';

import {
    setLastFiveSpecialRemarks,
    setRedemptionLogs,
    setCommunicationLogs,
    setCustomerInfoVerify,
    setLastFiveRemark
} from '../dashboardSlice';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actionCreators', () => {
    beforeAll(() => {
        Site.blockUI = jest.fn();
        Site.unblockUI = jest.fn();
        Site.resolveClientUrl = jest.fn(url => url);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getLastFiveSpecialRemarks', () => {
        it('should hanlde getLastFiveSpecialRemarks when fetching data have been done', async () => {
            // Arrange
            const expectedParams = { customerId: 123 };
            const response = { data: ['<div>test</div>'] };
            const expectedActions = [{ type: setLastFiveSpecialRemarks.type, payload: response.data }];
            const store = mockStore({ customerRemarks: null });
            const promise = Promise.resolve(response);
            DataService.getDataAsync = jest.fn(() => promise);
            
            // Act
            await store.dispatch(ActionCreators.getLastFiveSpecialRemarks(expectedParams));

            // Assert
            expect(DataService.getDataAsync).toHaveBeenCalledWith('Dashboard/GetLastFiveSpecialRemarks', expectedParams);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('getRedemptionLogs', () => {
        it('should hanlde getRedemptionLogs when fetching data have been done', async () => {
            // Arrange
            const expectedParams = { customerId: 123 };
            const response = { data: { id: 1, subject: 'test'} };
            const expectedActions = [{ type: setRedemptionLogs.type, payload: response.data }];
            const store = mockStore({ customerRemarks: null });
            const promise = Promise.resolve(response);
            DataService.getDataAsync = jest.fn(() => promise);
            
            // Act
            await store.dispatch(ActionCreators.getRedemptionLogs(expectedParams));

            // Assert
            expect(DataService.getDataAsync).toHaveBeenCalledWith('Dashboard/GetRedemptionLogs', expectedParams);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('getCommunicationLogs', () => {
        it('should hanlde getCommunicationLogs when fetching data have been done', async () => {
            // Arrange
            const expectedParams = { customerId: 123 };
            const response = {
                data: [{ feedbackId: 123, setting: [{ settingId: 3000, subSettingId: 4000 }]}],
                mainCategories: [{ settingId: 3000, settingName: 'MainCategory' }]
            };
            const expectedActions = [{ type: setCommunicationLogs.type, payload: response.data }];
            const store = mockStore({ customerRemarks: null });
            const promise = Promise.resolve(response);
            DataService.getDataAsync = jest.fn(() => promise);
            
            // Act
            await store.dispatch(ActionCreators.getCommunicationLogs(expectedParams));

            // Assert
            expect(DataService.getDataAsync).toHaveBeenCalledWith('Dashboard/GetCommunicationLogs', expectedParams);
            expect(store.getActions()).toEqual(expectedActions)
        });
    });

    describe('getCustomerInfoVerify', () => {
        it('should hanlde getCustomerInfoVerify when fetching data have been done', async () => {
            // Arrange
            const expectedParams = { customerId: 123 };
            const response = { data: { email: '---', passport: '---', isVerifyEmail: true } };
            const expectedActions = [{ type: setCustomerInfoVerify.type, payload: response.data }];
            const store = mockStore({ customerRemarks: null });
            const promise = Promise.resolve(response);
            DataService.getDataAsync = jest.fn(() => promise);
            
            // Act
            await store.dispatch(ActionCreators.getCustomerInfoVerify(expectedParams));

            // Assert
            expect(DataService.getDataAsync).toHaveBeenCalledWith('Dashboard/GetCustomerInfoVerify', expectedParams);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('editCustomerVerify', () => {
        it('should hanlde editCustomerVerify when fetching data have been done', async () => {
            // Arrange
            const expectedParams = { customerId: 123 };
            const response = { data: { code: 0, isSuccessful: true } };
            const store = mockStore({ customerRemarks: null });
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);
            
            // Act
            const actual = await store.dispatch(ActionCreators.editCustomerVerify(expectedParams));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('Dashboard/EditCustomerVerify', expectedParams);
            expect(actual).toEqual(response);
        });
    });

    describe('getLastFiveRemark', () => {
        it('should hanlde setLastFiveRemark when fetching data have been done', async () => {
            // Arrange
            const expectedParams = { custId: 9670720 };
            const response = { data: [
                {
                    acknowledger: null,
                    acknowledgerID: 0,
                    approver: null,
                    approverID: 0,
                    createdDate: "2022-05-17T15:00:05.81",
                    creator: null,
                    creatorID: 0,
                    custID: 9670720,
                    ext: 0,
                    extStation: null,
                    handler: null,
                    handlerID: 0
                }
            ]};
            const expectedActions = [{ type: setLastFiveRemark.type, payload: response.data }];
            const store = mockStore({});
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);
            
            // Act
            const actual = await store.dispatch(ActionCreators.getLastFiveRemark(expectedParams));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('NewRemark/GetLastFiveRemark', expectedParams);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});