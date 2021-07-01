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

    describe('getAllSettings', () => {
        it('should handle setAllSettings when fetching communication setting types have been done', async () => {
            // Arrange
            const response = {
                data: {
                    mainCategories: {},
                    subCategories: {},
                    communicationTools: {}
                }
            };
            const promise = Promise.resolve(response);
            DataService.getDataAsync = jest.fn(() => promise);
            const expectedActions = [{ type: ActionCreators.setAllSettings.type, payload: response.data }];
            const store = mockStore({ settings: [] });

            // Act
            await store.dispatch(ActionCreators.getAllSettings());

            // Assert
            expect(DataService.getDataAsync).toHaveBeenCalledWith('CommunicationSetting/GetAllSettings');
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('getGridCommunicationSetting', () => {
        it('should handle getGridCommunicationSetting when fetching communication setting have been done', async () => {
            // Arrange
            const expectedParams = {
                username: '',
                categoryIds: '1',
                subCategoryIds: '1',
                isDisableCategorySubCategory: false
            };
            const response = {
                data: {
                    username: 'asd',
                    mainCategories: { 'mainCategoryID': 1 },
                    subCategories: { 'subCategoryId': 1 },
                    communicationTools: { 'id': 1 }
                }
            };
            const expectedActions = [{ type: ActionCreators.setGridCommunicationSetting.type, payload: response.data }];
            const store = mockStore({ gridDataCommunication: null });
            Site.blockUI = jest.fn();
            Site.unblockUI = jest.fn();
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.getGridCommunicationSetting(expectedParams));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('CommunicationSetting/GetCommunicationToolSetting', expectedParams);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('getCommunicationById', () => {
        it('should handle setSelectCommunicationId when fetching communication setting has been done', async () => {
            // Arrange
            const response = {
                data: {
                    username: 'asd',
                    mainCategories: { 'mainCategoryID': 1 },
                    subCategories: { 'subCategoryId': 1 },
                    communicationTools: { 'id': 1 }
                }
            };
            const promise = Promise.resolve(response);
            DataService.getDataAsync = jest.fn(() => promise);
            const expectedActions = [{ type: ActionCreators.setSelectCommunicationId.type, payload: response.data }];
            const store = mockStore({ setSelectCommunicationId: null });

            // Act
            await store.dispatch(ActionCreators.getCommunicationById(1));

            // Assert
            expect(DataService.getDataAsync).toHaveBeenCalledWith('CommunicationSetting/GetById/1');
            expect(store.getActions()).toEqual(expectedActions);
        });

        it('should call callback function', async () => {
            // Arrange
            const response = {
                data: {
                    username: 'asd',
                    mainCategories: { 'mainCategoryID': 1 },
                    subCategories: { 'subCategoryId': 1 },
                    communicationTools: { 'id': 1 }
                }
            };
            const promise = Promise.resolve(response);
            DataService.getDataAsync = jest.fn(() => promise);
            const callbackFunc = jest.fn();
            const store = mockStore({ setSelectCommunicationId: null });

            // Act
            await store.dispatch(ActionCreators.getCommunicationById(1, callbackFunc));

            // Assert
            expect(callbackFunc).toHaveBeenCalled();
        });
    });

    describe('createCommunication', () => {
        it('should handle setCreateCommunicationResult when request has been done', async () => {
            // Arrange
            const expectedParams = {
                data: {
                    CategoryIds: '1',
                    CommunicationIds: '1',
                    Customers: [{ id: 1, name: 'asd' }],
                    SubCategoryIds: '1'
                }
            };
            const response = { data: { isSuccessful: true, message: '' } };
            const expectedActions = [{ type: ActionCreators.setCreateCommunicationResult.type, payload: response.data }];
            const store = mockStore({ createCommunicationResult: null });
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.createCommunication(expectedParams));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('CommunicationSetting/Create', expectedParams);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('editCommunication', () => {
        it('should handle setEditCommunicationResult when request has been done', async () => {
            // Arrange
            const expectedParams = {
                data: {
                    CategoryIds: '1',
                    CommunicationIds: '1',
                    Customers: [{ id: 1, name: 'asd' }],
                    SubCategoryIds: '1'
                }
            };
            const response = { data: { isSuccessful: true, message: '' } };
            const expectedActions = [{ type: ActionCreators.setEditCommunicationResult.type, payload: response.data }];
            const store = mockStore({ editCommunicationResult: null });
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.editCommunication(expectedParams));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('CommunicationSetting/Edit', expectedParams);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('deleteCommunication', () => {
        it('should handle response when request has been done', async () => {
            // Arrange
            const store = mockStore({});
            const response = { data: { isSuccessful: true, message: '' } };
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            // Act
            const actual = await store.dispatch(ActionCreators.deleteCommunication(1));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('CommunicationSetting/Delete/1');
            expect(actual).toEqual(response.data);
        });
    });

    describe('verifyUsername', () => {
        it('should handle response when request has been done', async () => {
            // Arrange
            const expectedParams = {
                data: {
                    customersInput: 'asd'
                }
            };
            const store = mockStore({});
            const response = {
                data: [{
                    id: 1,
                    name: 'asd'
                }]
            };
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            // Act
            const actual = await store.dispatch(ActionCreators.verifyUsername(expectedParams));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('CustomerSetting/VerifyUsername', expectedParams);
            expect(actual).toEqual(response.data);
        });
    });
});