import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import { ActionCreators } from '../actions';

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

    describe('getAllSettings', () => {
        it('should handle setAllSettings when fetching setting types have been done', async () => {
            // Arrange
            const response = {
                data: {
                    mainCategories: {},
                    subCategories: {}
                }
            };
            const promise = Promise.resolve(response);
            DataService.getDataAsync = jest.fn(() => promise);
            const store = mockStore({ settings: [] });

            // Act
            await store.dispatch(ActionCreators.getAllSettings());

            // Assert
            expect(DataService.getDataAsync).toHaveBeenCalledWith('CategoryClassification/GetAllSettings');
        });
    });

    describe('getGridData', () => {
        it('should handle setGridData when request has been done', async () => {
            // Arrange
            const expectedParams = {
                data: {
                    CategoryIds: '1',
                    SubCategoryIds: '1'
                }
            };
            const response = { data: { isSuccessful: true, message: '' } };
            const expectedActions = [{ type: ActionCreators.setGridData.type, payload: response.data }];
            const store = mockStore({ gridData: null });
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.getGridData(expectedParams));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('CategoryClassification/GetCategoryClassification', expectedParams);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('getCategoryClassById', () => {
        it('should handle setCategoryClassById when request has been done', async () => {
            // Arrange
            const expectedParams = { mainCategoryId: 1, subCategoryId: 1 };
            const response = { data: { isSuccessful: true, message: '' } };
            const expectedActions = [{ type: ActionCreators.setCategoryClassId.type, payload: response.data }];
            const store = mockStore({ selectCategoryClass: null });
            const promise = Promise.resolve(response);
            DataService.getDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.getCategoryClassById(1,1));

            // Assert
            expect(DataService.getDataAsync).toHaveBeenCalledWith('CategoryClassification/GetCategoryClassById', expectedParams);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('editCategoryClass', () => {
        it('should handle setEditCategoryClassResult when request has been done', async () => {
            // Arrange
            const expectedParams = {
                isSuccessful: true, message: ''
            };
            const response = { isSuccessful: true, message: '' };
            const expectedActions = [{ type: ActionCreators.setEditCategoryClassResult.type, payload: response.data }];
            const store = mockStore({ gridData: null });
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.editCategoryClass(expectedParams));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('CategoryClassification/EditCategoryClassification', expectedParams);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('exportExcel', () => {
        it('should call exactly functions', async () => {
            // Arrange
            const expectedParams = {
                userName: ''
            };
            const response = {
                data: {
                },
                headers: {
                    ['content-disposition']: 'a; filename="test.xlsx";'
                }
            };
            const filename = response.headers['content-disposition'].split('filename=')[1].split(";")[0];
            Site.downloadFile = jest.fn();
            const promise = Promise.resolve(response);
            DataService.getFileAsync = jest.fn(() => promise);
            const store = mockStore({ gridData: null });
            // Act
            await store.dispatch(ActionCreators.exportExcel(expectedParams));

            // Assert
            expect(DataService.getFileAsync).toHaveBeenCalledWith('CategoryClassification/ExportExcel', expectedParams);
            expect(Site.downloadFile).toHaveBeenCalledWith(response.data, filename);
        });
    });
});