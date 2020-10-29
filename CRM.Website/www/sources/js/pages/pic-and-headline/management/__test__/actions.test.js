import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import { ActionCreators } from '../actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actionCreators', () => {
    beforeAll(() => {
        Site.resolveClientUrl = jest.fn(url => url);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllSetting', () => {
        it('should handle setSetting when fetching all settings have been done', async () => {
            // Arrange
            const response = {
                data: [{
                    roleListWithInActive: [{ settingId: 1, settingValue: 'PIC' }],
                    roleList: [{ settingId: 1, settingValue: 'PIC' }],
                    communicationTools: [{ settingId: 1, settingValue: 'Phone' }],
                    languages: [{ settingId: 1, settingValue: 'Vietnamese' }],
                    countries: [{ id: 1, name: 'Vietnam' }]
                }]
            };
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);
            const expectedActions = [{ type: ActionCreators.setSetting.type, payload: response.data }];
            const store = mockStore({ setting: {} });

            // Act
            await store.dispatch(ActionCreators.getAllSetting());

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('PicManagement/GetAllSetting');
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('getGridData', () => {
        it('should handle setGridData when fetching data have been done', async () => {
            // Arrange
            const expectedParams = { username: 'a' };
            const response = { data: { total: 1, dataList: [{ picId: 1, username: 'abc' }] } };
            const expectedActions = [{ type: ActionCreators.setGridData.type, payload: response.data }];
            const store = mockStore({ gridData: null });
            Site.blockUI = jest.fn();
            Site.unblockUI = jest.fn();
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.getGridData(expectedParams));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('PicManagement/GetReport', expectedParams);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
    describe('exportExcel', () => {
        it('should call exactly functions', async () => {
            // Arrange
            const response = {
                data: {
                },
                headers: {
                    ['content-disposition']: 'a; filename="test.txt";'
                }
            }
            const filename = response.headers['content-disposition'].split('filename=')[1].split("\"")[1];
            const expectedParams = {
                pageIndex: 1,
                pageSize: 100
            };
            Site.downloadFile = jest.fn();
            const promise = Promise.resolve(response);
            DataService.getFileAsync = jest.fn(() => promise);
            const store = mockStore({ gridData: null });

            // Act
            await store.dispatch(ActionCreators.exportExcel(expectedParams)).then(() => {
                // Assert
                expect(DataService.getFileAsync).toHaveBeenCalledWith('PicManagement/ExportExcel', expectedParams);
                expect(Site.downloadFile).toHaveBeenCalledWith(response.data, filename);
            });
        });
    });

    describe('changeActiveStatus', () => {
        it('should handle setActiveResult when request has been done', async () => {
            // Arrange
            const expectedParams = { picId: 1 };
            const response = { data: { isSuccessful: true, message: '' } };
            const expectedActions = [{ type: ActionCreators.setActiveResult.type, payload: response.data }];
            const store = mockStore({ activeResult: null });
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.changeActiveStatus(expectedParams));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('PicManagement/ChangePicState', expectedParams);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('createPic', () => {
        it('should handle setCreatePicResult when request has been done', async () => {
            // Arrange
            const expectedParams = { picName: 'aa' };
            const response = { data: { isSuccessful: true, message: '' } };
            const expectedActions = [{ type: ActionCreators.setCreatePicResult.type, payload: response.data }];
            const store = mockStore({ createPicResult: null });
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.createPic(expectedParams));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('PicManagement/CreatePic', expectedParams);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('editPic', () => {
        it('should handle setEditPicResult when request has been done', async () => {
            // Arrange
            const expectedParams = { picId: 1, picName: 'aa' };
            const response = { data: { isSuccessful: true, message: '' } };
            const expectedActions = [{ type: ActionCreators.setEditPicResult.type, payload: response.data }];
            const store = mockStore({ editPicResult: null });
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.editPic(expectedParams));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('PicManagement/EditPic', expectedParams);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('validateEditPic', () => {
        it('should handle setValidateEditPicResult when request has been done', async () => {
            // Arrange
            const expectedParams = { picId: 1 };
            const response = { data: 'expected' };
            const expectedActions = [{ type: ActionCreators.setValidateEditPicResult.type, payload: response.data }];
            const store = mockStore({ validateEditPicResult: null });
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.validateEditPic(expectedParams));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('PicManagement/ValidateEditPic', expectedParams);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});