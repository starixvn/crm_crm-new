import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import { ActionCreators } from '../actions';
import {
    setCustomerById,
    setAllSettings,
    setEditCustomerInfoDetail,
    setHeadlinePicRoles,
    setAccountingPicRoles,
    setSettingCommunicationTool,
    setHeadlineCompanyService,
    setHeadlineStaffsAndAuthority,
    setSettingStaffAndAuthority,
    setSettingPicRole
} from '../accountDetailSlice'

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

    describe('getCustomerById', () => {
        it('should handle setCustomerById when fetching data have been done', async () => {
            // Arrange
            const response = { data: { firstName: 'test' } };
            const expectedParams = { customerId: 1754 };
            const expectedActions = [{ type: setCustomerById.type, payload: response.data }];
            const store = mockStore({ customerInfo: null });
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);
    
            // Act
            await store.dispatch(ActionCreators.getCustomerById(expectedParams));
    
            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('AccountDetail/GetCustomerById', expectedParams);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('getAllSettings', () => {
        it('should handle setAllSettings when fetching data have been done', async () => {
            // Arrange
            const response = { countries: [] };
            const expectedActions = [{ type: setAllSettings.type, payload: response.data }];
            const store = mockStore({ allSettings: null });
            const promise = Promise.resolve(response);
            DataService.getDataAsync = jest.fn(() => promise);
   
            // Act
            await store.dispatch(ActionCreators.getAllSettings());
   
            // Assert
            expect(DataService.getDataAsync).toHaveBeenCalledWith('AccountDetail/GetAllSettings');
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('editCustomerInfoDetail', () => {
        it('should handle setEditCustomerInfoDetail when fetching data have been done', async () => {
            // Arrange
            const response = { data: { firstName: 'test' } };
            const expectedParams = { firstName: 'testing' };
            const expectedActions = [{ type: setEditCustomerInfoDetail.type, payload: response.data }];
            const store = mockStore({ editCustomerInfoDetailResult: '' });
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);
    
            // Act
            await store.dispatch(ActionCreators.editCustomerInfoDetail(expectedParams));
    
            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('AccountDetail/EditCustomerInfoDetail', expectedParams);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('getSettingPicCommunicationTools', () => {
        it('should handle getSettingPicCommunicationTools when fetching data have been done', async () => {
            // Arrange
            const response = { data: { settingValue: 'test' } };
            const expectedParams = { settingValue: 'test' };
            const expectedActions = [{ type: setSettingCommunicationTool.type, payload: response.data }];
            const store = mockStore({ getSettingPicCommunicationTools: '' });
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);
    
            // Act
            await store.dispatch(ActionCreators.getSettingPicCommunicationTools(expectedParams));
    
            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('AccountDetail/GetSettingPicCommunicationTools');
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('getSettingPicRole', () => {
        it('should handle getSettingPicRole when fetching data have been done', async () => {
            // Arrange
            const response = { data: { settingValue: 'test' } };
            const expectedParams = { settingValue: 'test' };
            const expectedActions = [{ type: setSettingPicRole.type, payload: response.data }];
            const store = mockStore({ getSettingPicRole: '' });
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);
    
            // Act
            await store.dispatch(ActionCreators.getSettingPicRole(expectedParams));
    
            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('AccountDetail/GetSettingPicRole');
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('getHeadlinePicRoles', () => {
        it('should handle getHeadlinePicRoles when fetching data have been done', async () => {
            // Arrange
            const response = { data: { settingValue: 'test' } };
            const expectedParams = 1;
            const expectedActions = [{ type: setHeadlinePicRoles.type, payload: response.data }];
            const store = mockStore({ getHeadlinePicRoles: '' });
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);
    
            // Act
            await store.dispatch(ActionCreators.getHeadlinePicRoles(expectedParams));
    
            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('AccountDetail/GetRolesByPic?id=1');
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('getAccountingPicRoles', () => {
        it('should handle getAccountingPicRoles when fetching data have been done', async () => {
            // Arrange
            const response = { data: { settingValue: 'test' } };
            const expectedParams = 1;
            const expectedActions = [{ type: setAccountingPicRoles.type, payload: response.data }];
            const store = mockStore({ getAccountingPicRoles: '' });
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);
    
            // Act
            await store.dispatch(ActionCreators.getAccountingPicRoles(expectedParams));
    
            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('AccountDetail/GetRolesByPic?id=1');
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('getHeadlineCompanyService', () => {
        it('should handle getHeadlineCompanyService when fetching data have been done', async () => {
            // Arrange
            const response = { data: { name: 'test' } };
            const expectedParams = { headlineID: 1 };
            const expectedActions = [{ type: setHeadlineCompanyService.type, payload: response.data }];
            const store = mockStore({ getHeadlineCompanyService: '' });
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);
    
            // Act
            await store.dispatch(ActionCreators.getHeadlineCompanyService(expectedParams));
    
            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('AccountDetail/GetHeadlineCompanyService', expectedParams);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('getHeadlineStaffsAndAuthority', () => {
        it('should handle getHeadlineStaffsAndAuthority when fetching data have been done', async () => {
            // Arrange
            const response = { data: { name: 'test' } };
            const expectedParams = { headlineID: 1 };
            const expectedActions = [{ type: setHeadlineStaffsAndAuthority.type, payload: response.data }];
            const store = mockStore({ getHeadlineStaffsAndAuthority: '' });
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);
    
            // Act
            await store.dispatch(ActionCreators.getHeadlineStaffsAndAuthority(expectedParams));
    
            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('AccountDetail/GetHeadlineStaffsAndAuthority', expectedParams);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('getSettingStaffAndAuthority', () => {
        it('should handle getSettingStaffAndAuthority when fetching data have been done', async () => {
            // Arrange
            const response = { data: { name: 'test' } };
            const expectedParams = { headlineID: 1 };
            const expectedActions = [{ type: setSettingStaffAndAuthority.type, payload: response.data }];
            const store = mockStore({ getSettingStaffAndAuthority: '' });
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);
    
            // Act
            await store.dispatch(ActionCreators.getSettingStaffAndAuthority(expectedParams));
    
            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('AccountDetail/GetSettingStaffAndAuthority', expectedParams);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});