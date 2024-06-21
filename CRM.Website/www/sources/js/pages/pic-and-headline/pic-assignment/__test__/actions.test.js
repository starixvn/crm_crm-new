import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import { ActionCreators } from '../actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {
    beforeAll(() => {
        Site.resolveClientUrl = jest.fn(url => url);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getSettings', () => {
        it('should handle settings when fetching settings have been done', async () => {
            // Arrange
            const response = { data: [{ id: 1, name: 'void abnormal bet' }] };
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);
            const expectedActions = [{ type: ActionCreators.setSettings.type, payload: response.data }];
            const store = mockStore({ settings: [] });

            // Act
            await store.dispatch(ActionCreators.getSettings());

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('PicAssignment/AllSetting');
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('getGridData', () => {
        it('should handle gridData when fetching grid data have been done with function callback', async () => {
            // Arrange
            const params = { value: '' };
            const callback = jest.fn();
            const response = { data: [{ id: 1, name: 'void abnormal bet' }] };
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);
            const expectedActions = [{ type: ActionCreators.setGridData.type, payload: response.data }];
            const store = mockStore({ picAssignmentGridData: [] });
            Site.blockUI = jest.fn();
            Site.unblockUI = jest.fn();

            // Act
            await store.dispatch(ActionCreators.getGridData(params, callback));

            // Assert
            expect(Site.blockUI).toHaveBeenCalled();
            expect(callback).toHaveBeenCalledWith(response.data.data);
            expect(DataService.postDataAsync).toHaveBeenCalledWith('PicAssignment/GetAllPICAssignment', params);
            expect(store.getActions()).toEqual(expectedActions);
        });
        
        it('should handle gridData when fetching grid data have been done with not function callback', async () => {
            // Arrange
            const params = { value: '' };
            const response = { data: [{ id: 1, name: 'void abnormal bet' }] };
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);
            const expectedActions = [{ type: ActionCreators.setGridData.type, payload: response.data }];
            const store = mockStore({ picAssignmentGridData: [] });
            Site.blockUI = jest.fn();
            Site.unblockUI = jest.fn();

            // Act
            await store.dispatch(ActionCreators.getGridData(params));

            // Assert
            expect(Site.blockUI).toHaveBeenCalled();
            expect(DataService.postDataAsync).toHaveBeenCalledWith('PicAssignment/GetAllPICAssignment', params);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('validateAssignPic', () => {
        it('should handle validateAssignPicResult when fetching validate assign pic have been done', async () => {
            // Arrange
            const params = { value: '' };
            const response = { data: [{ id: 1, name: 'void abnormal bet' }] };
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);
            const expectedActions = [{ type: ActionCreators.setValidateAssignPicResult.type, payload: response.data }];
            const store = mockStore({ validateAssignPicResult: [] });
            Site.blockUI = jest.fn();
            Site.unblockUI = jest.fn();

            // Act
            await store.dispatch(ActionCreators.validateAssignPic(params));

            // Assert
            expect(Site.blockUI).toHaveBeenCalled();
            expect(DataService.postDataAsync).toHaveBeenCalledWith('PicAssignment/ValidateAssignPic', params);
            expect(store.getActions()).toEqual(expectedActions);
            expect(Site.unblockUI).toHaveBeenCalled();
        });
    });
});