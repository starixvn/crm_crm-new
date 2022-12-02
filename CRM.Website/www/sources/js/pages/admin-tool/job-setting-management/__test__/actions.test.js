import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import { ActionCreators } from '../actions';

import {
    setServiceNameSetting,
    setSettingNames,
    setGridParams,
    setConfigSettings,
    setEditPopup,
    setEditJobSetting
} from '../jobSettingManagementSlice';

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

    
    describe('getServiceNameSettings', () => {
        it('should handle setServiceNameSetting when fetching data have been done', async () => {
            // Arrange
            const response = ["AmendmentNotiFB", "AutoFB", "AutoVoidFB", "ChatBot - AbnormalBets", "ChatBot - ArchivedAccounts"];
            const expectedActions = [{ type: setServiceNameSetting.type, payload: response.data }];
            const store = mockStore({ serviceNames: null });
            const promise = Promise.resolve(response);
            DataService.getDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.getServiceNameSettings());

            // Assert
            expect(DataService.getDataAsync).toHaveBeenCalledWith('JobSettingManagement/GetServiceNameSettings');
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('getSettingNames', () => {
        it('should handle setSettingNames when fetching data have been done', async () => {
            // Arrange
            const response = ["ConfigUAT", "JobStatusUAT", "LastRuntimeUAT", "LastSeqUAT", "LastSubmitDateUAT", "LastLogIDUAT"];
            ;
            const expectedActions = [{ type: setSettingNames.type, payload: response.data }];
            const store = mockStore({ serviceNames: null });
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.getSettingNames({serviceName: ''}));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('JobSettingManagement/GetSettingNames', {serviceName: ''});
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('getConfigSettings', () => {
        it('should handle setConfigSettings when fetching data have been done', async () => {
            // Arrange
            const response = [{id: 436, settingName: "ConfigUAT", value: "1", serviceName: "AmendmentNotiFB", dataType: "Boolean"}];
            const expectedActions = [{ type: setConfigSettings.type, payload: response.data }];
            const store = mockStore({ configSettings: null });
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.getConfigSettings('UAT'));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('JobSettingManagement/GetConfigSettings','UAT');
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('editJobSetting', () => {
        it('should handle setEditJobSetting when fetching data have been done', async () => {
            // Arrange
            const response = {code: 0, message: "", isSuccessful: true};
            const expectedActions = [{ type: setEditJobSetting.type, payload: response.data }];
            const store = mockStore({ configSettings: null });
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);
            const params = {
                settings: {ID: "436", SETTING: "ConfigUAT", VALUE: "0", SERVICENAME: "AmendmentNotiFB"}
            };

            // Act
            await store.dispatch(ActionCreators.editJobSetting(params));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('JobSettingManagement/EditJobSetting',params);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});