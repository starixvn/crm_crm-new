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

    describe('getFeedBackSubject', () => {
        it('should handle setFeedBackSubject when fetching feedback subject have been dont', async () =>{
            // Arrange
            const expectedParams = {Subject: null, pageIndex: 1, pageSize: 50};
            const response = { data: { totalItems: 1, data: [{templateID: 1, subject: 'sCKQ1', isActive: true }] } };
            const expectedActions = [{ type: ActionCreators.setFeedBackSubject.type, payload: response.data}];
            const store = mockStore({notificationTypes: []});
            Site.blockUI = jest.fn();
            Site.unblockUI = jest.fn();
            const promise = Promise.resolve(response);
            DataService.postDataAsync  = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.getFeedBackSubject(expectedParams));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('FeedbackSubjectManagement/GetFeedbackSubject', expectedParams);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('getAllActiveFeedbackSubject', () => {
        it('should handle setAllActiveFeedbackSubject when request has been done', async() => {
            // Arrange
            const response = [ { templateID: 1, subject: 'sCKQ1', isActive: true } ];
            const promise = Promise.resolve(response);
            DataService.getDataAsync = jest.fn(() => promise);
            const store = mockStore({ allActiveFeedbackSubject: null });

            // Act
            await store.dispatch(ActionCreators.getAllActiveFeedbackSubject());

            // Assert
            expect(DataService.getDataAsync).toHaveBeenCalledWith('FeedbackSubjectManagement/GetAllActiveFeedbackSubject');
        });
    });

    describe('createFeedbackSubject', () => {
        it('should handle setCreateFeedbackSubjectResult when request has been done', async() => {
            // Arrange
            const expectedParams = { subject: 'sCKQ1' };
            const response = { data: { isSuccessful: true, message: '' } };
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);
            const expectedActions = [{ type: ActionCreators.setCreateFeedbackSubjectResult.type, payload: response.data }];
            const store = mockStore({ createFeedbackSubjectResult: null });
            
            // Act
            await store.dispatch(ActionCreators.createFeedbackSubject(expectedParams));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('FeedbackSubjectManagement/CreateFeedbackSubject', expectedParams);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('editFeedbackSubject', () => {
        it('should handle setEditFeedbackSubjectResult when request has been done', async() => {
            // Arrange
            const expectedParams = { templateID: 1, subject: 'sCLQ1' };
            const response = { data: {isSuccessful: true, message: '' } };
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);
            const expectedActions = [{ type: ActionCreators.setEditFeedbackSubjectResult.type, payload: response.data }];
            const store = mockStore({ createFeedbackSubjectResult: null });

            // Act
            await store.dispatch(ActionCreators.editFeedbackSubject(expectedParams));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('FeedbackSubjectManagement/EditFeedbackSubject', expectedParams);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('editStatusFeedbackSubject', () => {
        it('should return response when request has been done', async () => {
            // Arrange
            const expectedParams = { templateId: 1, isActive: false };
            const response = { data: { isSuccessful: true, message: '' } };
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);
            const store = mockStore({ editStatusFeedbackSubjectResult: null });
            // Act
            const actual = await store.dispatch(ActionCreators.editStatusFeedbackSubject(expectedParams));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('FeedbackSubjectManagement/EditStatusFeedbackSubject', expectedParams);
            expect(actual).toEqual(response);
        });
    });
});