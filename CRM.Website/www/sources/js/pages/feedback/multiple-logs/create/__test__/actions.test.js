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

    describe('getSettings', () => {
        it('should handle setSettings when fetching settings have been done', async () => {
            // Arrange
            Site.blockUI = jest.fn();
            Site.unblockUI = jest.fn();
            const response = { data: { extensions: { id: 1, type: 'tests' } } };
            const promise = Promise.resolve(response);
            DataService.getDataAsync = jest.fn(() => promise);
            const expectedActions = [{ type: ActionCreators.setSettings.type, payload: response.data }];
            const store = mockStore({ settings: null });

            // Act
            await store.dispatch(ActionCreators.getSettings());

            // Assert
            expect(DataService.getDataAsync).toHaveBeenCalledWith('MultipleLogs/GetSettings');
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
            expect(DataService.postDataAsync).toHaveBeenCalledWith('MultipleLogs/VerifyCustomer', expectedParams);
            expect(actual).toEqual(response);
        });
    });

    describe('verifyRelatedCustomers', () => {
        it('should return response when request has been done', async () => {
            // Arrange
            const expectedParams = { headlineIds: '1,2', username: 'sa,test' };
            const store = mockStore({});
            const response = { data: [{ headlineId: 1, custId: 1, username: 'sa' }, { headlineId: 0, custId: 0, username: 'test' }] };
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            // Act
            const actual = await store.dispatch(ActionCreators.verifyRelatedCustomers(expectedParams));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('MultipleLogs/VerifyRelatedCustomer', expectedParams);
            expect(actual).toEqual(response);
        });
    });

    describe('getFeedbackSubjectTemplates', () => {
        it('should handle setFeedbackSubjectTemplates when fetching templates have been done', async () => {
            // Arrange
            const subject = 'test';
            const response = { data: [{ subjectId: 1, subject: 'test' }] };
            const promise = Promise.resolve(response);
            DataService.getDataAsync = jest.fn(() => promise);
            const expectedActions = [{ type: ActionCreators.setFeedbackSubjectTemplates.type, payload: response.data }];
            const store = mockStore({ feedbackSubjectTemplates: [] });

            // Act
            await store.dispatch(ActionCreators.getFeedbackSubjectTemplates(subject));

            // Assert
            expect(DataService.getDataAsync).toHaveBeenCalledWith('Common/GetFeedbackSubjectTemplate', { subject });
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('checkNotExistCommunicationToolSetting', () => {
        it('should return response when request has been done', async () => {
            // Arrange
            const expectedParams = { customers: '1,2', categoryIds: '', subCategoryIds: '' };
            const store = mockStore({});
            const response = { data: [ { custId: 0, username: 'test' }] };
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            // Act
            const actual = await store.dispatch(ActionCreators.checkNotExistCommunicationToolSetting(expectedParams));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('MultipleLogs/CheckNotExistCommunicationToolSetting', expectedParams);
            expect(actual).toEqual(response);
        });
    });

    describe('checkNotExistCommunicationToolSetting', () => {
        it('should return response when request has been done', async () => {
            // Arrange
            const expectedParams = { customers: '1,2', categoryIds: '', subCategoryIds: '', communicationToolIds: '' };
            const store = mockStore({});
            const response = { data: { isSuccessful: true, message: '' } };
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            // Act
            const actual = await store.dispatch(ActionCreators.createMultipleLogs(expectedParams));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('MultipleLogs/Create', expectedParams);
            expect(actual).toEqual(response);
        });
    });
});