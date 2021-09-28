import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import { ActionCreators } from '../actions';
import {
    setLogsByCustomerId,
    setAllStatus,
    setGridParams,
    setEditNoOfInquiryDialog,
    setCustomerFeedbackById,
    setEditCommunicationDialog,
    setFeedbackSubjectTemplates,
    setDuplicateFeedback,
    setInsertCommunicationDialog,
    setInsertSettings
} from '../communicationLogSlice'

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
        it('should handle setLogsByCustomerId when fetching data have been done', async () => {
            // Arrange
            const response = { data: { firstName: 'test' } };
            const expectedParams = { 
                customerId: 1754,
                fromDate: 'Sep 01, 2021',
                handler: '',
                statusId: 0,
                toDate: 'Sep 15, 2021'
            };
            const expectedActions = [{ type: setLogsByCustomerId.type, payload: response.data }];
            const store = mockStore({ gridData: null });
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.getLogsByCustomerId(expectedParams));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('CommunicationLog/GetLogsByCustomerId', expectedParams);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('getAllStatus', () => {
        it('should handle setAllStatus when fetching data have been done', async () => {
            // Arrange
            const response = { countries: [] };
            const expectedParams = { isEdit: false };
            const expectedActions = [{ type: setAllStatus.type, payload: response.data }];
            const store = mockStore({ allStatus: null });
            const promise = Promise.resolve(response);
            DataService.getDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.getAllStatus(expectedParams));

            // Assert
            expect(DataService.getDataAsync).toHaveBeenCalledWith('CommunicationLog/GetAllStatus', expectedParams);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('getCustomerFeedbackById', () => {
        it('should handle setCustomerFeedbackById when fetching data have been done', async () => {
            // Arrange
            const response = { countries: [] };
            const expectedParams = 2000;
            const expectedActions = [{ type: setCustomerFeedbackById.type, payload: response.data }];
            const store = mockStore({ customerFeedback: null });
            const promise = Promise.resolve(response);
            DataService.getDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.getCustomerFeedbackById(expectedParams));

            // Assert
            expect(DataService.getDataAsync).toHaveBeenCalledWith(`Feedback/GetCustomerFeedbackById/${expectedParams}`);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('getFeedbackSubjectTemplates', () => {
        it('should handle setFeedbackSubjectTemplates when fetching data have been done', async () => {
            // Arrange
            const response = { countries: [] };
            const expectedParams = 'sa';
            const expectedActions = [{ type: setFeedbackSubjectTemplates.type, payload: response.data }];
            const store = mockStore({ feedbackSubjectTemplates: null });
            const promise = Promise.resolve(response);
            DataService.getDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.getFeedbackSubjectTemplates(expectedParams));

            // Assert
            expect(DataService.getDataAsync).toHaveBeenCalledWith(`Common/GetFeedbackSubjectTemplate`, {subject: expectedParams});
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('verifyCustomers', () => {
        it('should return response when request has been done', async () => {
            // Arrange
            const expectedParams = { username: 'sa,test' };
            const store = mockStore({});
            const response = { data: [{ custId: 1, username: 'sa' }, { custId: 0, username: 'test' } ] };
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            // Act
            const actual = await store.dispatch(ActionCreators.verifyCustomers(expectedParams));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('CustomerSetting/VerifyUsername', expectedParams);
            expect(actual).toEqual(response);
        });
    });

    describe('editCommunicationLog', () => {
        it('should return response when request has been done', async () => {
            // Arrange
            const expectedParams = { customerId: 1234 };
            const store = mockStore({});
            const response = { code: 0 };
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            // Act
            const actual = await store.dispatch(ActionCreators.editCommunicationLog(expectedParams));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('CommunicationLog/EditCommunicationLog', expectedParams);
            expect(actual).toEqual(response);
        });
    });

    describe('checkFeedbackDuplication', () => {
        it('should handle setDuplicateFeedback when fetching data have been done', async () => {
            // Arrange
            const response = 0;
            const expectedParams = { 
                customerId: 1754,
                fromDate: 'Sep 01, 2021',
                mainCategories: []   
            };
            const expectedActions = [{ type: setDuplicateFeedback.type, payload: response.data }];
            const store = mockStore({ duplicateFeedbackId: 0 });
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.checkFeedbackDuplication(expectedParams));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('Feedback/CheckFeedbackDuplication', expectedParams);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('getInsertSettings', () => {
        it('should handle setInsertSettings when fetching data have been done', async () => {
            // Arrange
            const response = { countries: [] };
            const expectedActions = [{ type: setInsertSettings.type, payload: response.data }];
            const store = mockStore({ insertSettings: null });
            const promise = Promise.resolve(response);
            DataService.getDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.getInsertSettings());

            // Assert
            expect(DataService.getDataAsync).toHaveBeenCalledWith(`CommunicationLog/GetInsertSettings`);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('insertCommunicationLog', () => {
        it('should return response when request has been done', async () => {
            // Arrange
            const expectedParams = { customerId: 1234 };
            const store = mockStore({});
            const response = { code: 0 };
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            // Act
            const actual = await store.dispatch(ActionCreators.insertCommunicationLog(expectedParams));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('CommunicationLog/InsertCommunicationLog', expectedParams);
            expect(actual).toEqual(response);
        });
    });
});