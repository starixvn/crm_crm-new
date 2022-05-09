import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import { ActionCreators } from '../actions';

import {
    setMainSettings,
    setParentSettings,
    setLicensees,
    setLicenseeMapping,
    setLicenseeManager,
    setGridParams,
    setSettingTypes,
    setEditStatusPopup,
    setOpenInsertNewSettingPopup,
    setOpenLicenseeMappingPopup,
    setInsertNewSettingResult,
    setOpenEdiPopup,
    setEditNewSettingResult,
    setConfirmCancelPopup
} from '../actions';

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

    
    describe('getMainSettings', () => {
        it('should handle setMainSettings when fetching data have been done', async () => {
            // Arrange
            const response = [
                { data: {
                    displayOrder: 0,
                    parentID: 0,
                    settingId: 68001,
                    settingName: "111111111",
                    settingSource: null,
                    settingValue: "te",
                    childSettings: [{id: 0, name: null, settingId: 1002, settingName: "test", settingValue: "Zalo"}]
                }}
            ];
            const expectedActions = [{ type: ActionCreators.setMainSettings.type, payload: response.data }];
            const store = mockStore({ mainSettings: null });
            const promise = Promise.resolve(response);
            DataService.getDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.getMainSettings());

            // Assert
            expect(DataService.getDataAsync).toHaveBeenCalledWith('SettingManagement/GetMainSettings');
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
    
    describe('getSettingTypes', () => {
        it('should handle setSettingTypes when fetching data have been done', async () => {
            // Arrange
            const expectedParams = {
                settingName: 'test'
            };
            const response = {
                data: [{id: 55001, value: "test", displayOrder: 0, isChild: false, isActive: true}]
            };
            const expectedActions = [{ type: ActionCreators.setSettingTypes.type, payload: response.data }];
            const store = mockStore({ settingType: null });
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.getSettingTypes(expectedParams));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('SettingManagement/GetSettingByType', expectedParams);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('getParentSettings', () => {
        it('should handle setParentSettings when fetching data have been done', async () => {
            // Arrange
            const response = {
                data: {
                    childSettings: [],
                    displayOrder: 0,
                    id: 0,
                    isActive: true,
                    isChild: false,
                    mainCategoryID: 0,
                    name: null,
                    parentID: 0,
                    settingId: 68005,
                    settingName: "111111111",
                    settingSource: null,
                    settingValue: "TestRuby1",
                    subCategoryId: 0
                }
            };
            const expectedActions = [{ type: ActionCreators.setParentSettings.type, payload: response.data }];
            const store = mockStore({});
            const promise = Promise.resolve(response);
            
            DataService.getDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.getParentSettings());

            // Assert
            expect(DataService.getDataAsync).toHaveBeenCalledWith('SettingManagement/GetParentSettings');
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('getLicensees', () => {
        it('should handle setLicensees when fetching data have been done', async () => {
            // Arrange
            const response = {
                data: {
                    0: "108bet",
                    1: "108betTest",
                    2: "109betTest",
                    3: "11bet",
                    4: "12B",
                    5: "12Bet",
                    6: "12BetHelen",
                    7: "12BetWinA"
                }
            };
            const store = mockStore({});
            const expectedActions = [{ type: ActionCreators.setLicensees.type, payload: response.data }];
            const promise = Promise.resolve(response);
            DataService.getDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.getLicensees());

            // Assert
            expect(DataService.getDataAsync).toHaveBeenCalledWith('SettingManagement/GetLicensees');
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('getLicenseeManager', () => {
        it('should handle setLicenseeManager when fetching data have been done', async () => {
            // Arrange
            const expectedParams = {
                username: 'te'
            };
            const response = {
                data: [{custId: -5969, username: "111test"}]
            };
            const expected = [{
                value: "111test", label: "111test"
            }];
            const expectedActions = [{ type: ActionCreators.setLicenseeManager.type, payload: expected }];
            const store = mockStore({ settingType: null });
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.getLicenseeManager(expectedParams));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('SettingManagement/GetLicenseeManager', expectedParams);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('getLicenseesMapping', () => {
        it('should handle setLicenseeMapping when fetching data have been done', async () => {
            // Arrange
            const expectedParams = {
                setting: ""
            };
            const response = {
                data: [{
                    licenseeManager: null,
                    setting: "0sServices",
                    settingId: 6727,
                    settingSource: ""
                }]
            };

            const expectedActions = [{ type: ActionCreators.setLicenseeMapping.type, payload: response.data }];
            const store = mockStore({});
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.getLicenseesMapping(expectedParams));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('SettingManagement/GetLicenseesMapping', expectedParams);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('getSettingTypes', () => {
        it('should handle setSettingTypes when fetching data have been done', async () => {
            // Arrange
            const expectedParams = {
                settingName: "111111111"
            };
            const response = {
                data: [{
                    childSettings: [],
                    displayOrder: 0,
                    id: 0,
                    isActive: true,
                    isChild: false,
                    mainCategoryID: 0,
                    name: null,
                    parentID: 0,
                    settingId: 68005,
                    settingName: "111111111",
                    settingSource: null,
                    settingValue: "TestRuby1",
                    subCategoryId: 0
                }]
            };

            const expectedActions = [{ type: ActionCreators.setSettingTypes.type, payload: response.data }];
            const store = mockStore({});
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.getSettingTypes(expectedParams));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('SettingManagement/GetSettingByType', expectedParams);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('editStatusSetting', () => {
        it('should return expected data', async () => {
            // Arrange
            const expectedParams = {
                displayOrder: 0,
                settingId: 68005,
                settingName: "111111111",
                settingValue: "TestRuby11"
            };
            const response = {
                data: {
                    code: 0,
                    isSuccessful: true,
                    message: ""
                }
            };
            const store = mockStore({});
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            // Act
            const actual = await store.dispatch(ActionCreators.editStatusSetting(expectedParams));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('SettingManagement/EditStatusSetting', expectedParams);
            expect(response.data).toEqual(actual);
        });
    });

    describe('insertNewSetting', () => {
        it('should handle setInsertNewSettingResult when fetching data have been done', async () => {
            // Arrange
            const expectedParams = {
                displayOrder: 0,
                settingId: 68005,
                settingName: "111111111",
                settingValue: "TestRuby11"
            };
            const response = {
                data: {
                    code: 0,
                    isSuccessful: true,
                    message: ""
                }
            };

            const expectedActions = [{ type: ActionCreators.setInsertNewSettingResult.type, payload: response.data }];

            const store = mockStore({});
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.insertNewSetting(expectedParams));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('SettingManagement/InsertNewSetting', expectedParams);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('editNewSetting', () => {
        it('should handle setEditNewSettingResult when fetching data have been done', async () => {
            // Arrange
            const expectedParams = {
                licenseeManager: "aanzkacank",
                settingId: 6727,
                sourceMapping: "108betTest"
            };
            const response = {
                data: {
                    code: 0,
                    isSuccessful: true,
                    message: ""
                }
            };

            const expectedActions = [{ type: ActionCreators.setEditNewSettingResult.type, payload: response.data }];

            const store = mockStore({});
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.editNewSetting(expectedParams));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('SettingManagement/EditNewSetting', expectedParams);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('editLicenseeMapping', () => {
        it('should return expected data', async () => {
            // Arrange
            const expectedParams = {
                licenseeManager: null,
                setting: "0sServices",
                settingId: 6727,
                settingSource: ""
            };
            const response = {
                data: {
                    code: 0,
                    isSuccessful: true,
                    message: ""
                }
            };
            const store = mockStore({});
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            // Act
            const actual = await store.dispatch(ActionCreators.editLicenseeMapping(expectedParams));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('SettingManagement/EditLicenseeMapping', expectedParams);
            expect(response.data).toEqual(actual);
        });
    });
});