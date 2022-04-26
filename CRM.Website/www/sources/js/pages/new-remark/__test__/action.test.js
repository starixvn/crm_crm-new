import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import { ActionCreators } from '../actions';
import {
    setRemarkTitle,
    setAllSettings,
    setGridParams,
    setRemarks,
    setOpenCreatePopup,
    setOpenEditPopup,
    setEditResult,
    setOpenConfirmDelete,
    setCreateResult,
    setValidateResult,
    setRemarksHistory,
    setShowHistory,
    setHistoryGridParams
} from '../newRemarkSlice';

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

    describe('getRemarkTitles', () => {
        it('should handle setRemarkTitle when fetching data have been done', async () => {
            // Arrange
            const response = { data: [{id: 0, name: null, settingId: 70000, settingName: "RemarkTitles", settingValue: "Internal Request"}]};
            const expectedActions = [{ type: setRemarkTitle.type, payload: response.data }];
            const store = mockStore({ remarkTitles: null });
            const promise = Promise.resolve(response);
            DataService.getDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.getRemarkTitles());

            // Assert
            expect(DataService.getDataAsync).toHaveBeenCalledWith('NewRemark/GetRemarkTitles');
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('getAllSettings', () => {
        it('should handle setAllSettings when fetching data have been done', async () => {
            // Arrange
            const response = { data: {
                extentions: [{id: 2022, value: "N/A", displayOrder: 0, isChild: false, isActive: true}],
                relatedPics: [{letstalkIds: "sss,ssdsddscac", id: 264, name: "malcokm1_ss"}],
                userId: 62585686
            }};
            const expectedActions = [{ type: setAllSettings.type, payload: response.data }];
            const store = mockStore({ allSettings: null });
            const promise = Promise.resolve(response);
            DataService.getDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.getAllSettings());

            // Assert
            expect(DataService.getDataAsync).toHaveBeenCalledWith('NewRemark/GetAllSetting');
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('validateUsername', () => {
        it('should handle setValidateResult when request has been done', async () => {
            // Arrange
            const expectedParams = { username: 'test' };
            const store = mockStore({ });
            const response = { code: 0, isSuccessful: true };
            const promise = Promise.resolve(response);
            const expectedActions = [{ type: setValidateResult.type, payload: response.data }];
            DataService.postDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.validateUsername(expectedParams));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('NewRemark/ValidateUsername', expectedParams);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('getNewRemarks', () => {
        it('should handle setNewRemarks when request has been done', async () => {
            // Arrange
            const expectedParams = {datePreset: 7, fromDate: "Feb 01, 2021", isGuest: false};
            const store = mockStore({ });
            const response = { data: [{remarkID: 1506, createdDate: "Apr 20, 2022 04:11:09 AM", lastUpdate: "Apr 20, 2022 04:35:19 AM"}], totalItems: 2 };
            const promise = Promise.resolve(response);
            const expectedActions = [{ type: setRemarks.type, payload: response.data }];
            DataService.postDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.getNewRemarks(expectedParams));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('NewRemark/GetNewRemarks', expectedParams);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('editNewRemarks', () => {
        it('should handle setEditResult when request has been done', async () => {
            // Arrange
            const expectedParams = {acknowledgerID: 55218930, approverID: 55218930, custID: 2211693};
            const store = mockStore({ });
            const response = { data: {isSuccessful: false} };
            const promise = Promise.resolve(response);
            const expectedActions = [{ type: setEditResult.type, payload: response.data }];
            DataService.postDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.editNewRemarks(expectedParams));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('NewRemark/Edit', expectedParams);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('createNewRemarks', () => {
        it('should handle setCreateResult when request has been done', async () => {
            // Arrange
            const expectedParams = {acknowledgerID: 55218930, approverID: 55218930, custID: 2211693};
            const store = mockStore({ });
            const response = { data: {isSuccessful: false} };
            const promise = Promise.resolve(response);
            const expectedActions = [{ type: setCreateResult.type, payload: response.data }];
            DataService.postDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.createNewRemarks(expectedParams));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('NewRemark/Create', expectedParams);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('getNewRemarkHistory', () => {
        it('should handle setRemarksHistory when request has been done', async () => {
            // Arrange
            const expectedParams = {
                createdDate: "Apr 20, 2022 04:11:09 AM",
                creator: "crmOliver",
                custID: 2211693
            };
            const store = mockStore({ });
            const response = { 
                data: [{versionID: 3, remarkID: 1506, createdDate: "Apr 20, 2022 04:11:09 AM"}],
                totalItems: 3
             };
            const promise = Promise.resolve(response);
            const expectedActions = [{ type: setRemarksHistory.type, payload: response.data }];
            DataService.postDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.getNewRemarkHistory(expectedParams));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('NewRemark/getNewRemarkHistory', expectedParams);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('deleteNewRemark', () => {
        it('should return response when request has been done', async () => {
            // Arrange
            const expectedParams = { customerId: 1754, specialRemarks: ['test'], normalRemarks: ['testing'] };
            const store = mockStore({});
            const response = { code: 0, isSuccessful: true };
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            // Act
            const actual = await store.dispatch(ActionCreators.deleteNewRemark(expectedParams));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('NewRemark/Delete', expectedParams);
        });
    });
});