import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import { ActionCreators } from '../actions';

import {
    setMainSettings,
    setGridParams,
    setSettingTypes,
    setMainSettingRelation,
    setUpdateResult,
    setOpenUpdatePopup
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
            expect(DataService.getDataAsync).toHaveBeenCalledWith('SettingRelation/GetMainSettings');
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
            expect(DataService.postDataAsync).toHaveBeenCalledWith('SettingRelation/GetSettingByType', expectedParams);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('getMainSettingRelation', () => {
        it('should handle setMainSettingRelation when fetching data have been done', async () => {
            // Arrange
            const expectedParams = {
                parentId: 1,
                settingName: 'test'
            };
            const response = {
                data: {
                    displayOrder: 0,
                    parentID: 0,
                    settingId: 68001,
                    settingName: "111111111",
                    settingSource: null,
                    settingValue: "te",
                    childSettings: [{id: 0, name: null, settingId: 1002, settingName: "Communication", settingValue: "Zalo"}]
                }
            };
            const expectedActions = [{ type: ActionCreators.setMainSettingRelation.type, payload: response.data }];
            const store = mockStore({ mainSettingRelation: null });
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.getMainSettingRelation(expectedParams));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('SettingRelation/GetMainSettingRelation', expectedParams);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('updateRelation', () => {
        it('should handle setUpdateResult when fetching data have been done', async () => {
            // Arrange
            const expectedParams = {
                parentId: 68001,
                settingName: "13Bet",
                subSettings: [{id: 55001, value: "test", isChild: true, displayOrder: 0}]
            };
            const response = {
                data: {
                    isSuccessful: true
                }
            };
            const expectedActions = [{ type: ActionCreators.setUpdateResult.type, payload: response.data }];
            const store = mockStore({ updateResult: null });
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.updateRelation(expectedParams));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('SettingRelation/Update', expectedParams);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});