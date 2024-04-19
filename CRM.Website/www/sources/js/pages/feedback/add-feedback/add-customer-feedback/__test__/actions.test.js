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
        it('should handle setAllSettings when fetching getAllSettings have been done', async () => {
            // Arrange
            const response = {
                data: {
                    bettypeNA: {},
                    bettypes: [],
                    communicationTools: [],
                    countries: [],
                    extensionNA: {},
                    extensions: [],
                    languages: [],
                    licenseeType: [],
                    mainCategories: [],
                    productNA: {},
                    products: [],
                    provinces: [],
                    responses: [],
                    roles: null,
                    sites: [],
                    status: [],
                    subCategories: [],
                    subProductNA: {},
                    subProducts: [],
                    titles: []
                }
            };
            const promise = Promise.resolve(response);
            Site.blockUI = jest.fn();
            Site.unblockUI = jest.fn();
            DataService.getDataAsync = jest.fn(() => promise);
            const expectedActions = [{ type: ActionCreators.setAllSettings.type, payload: response.data }];
            const store = mockStore({ settings: null });

            // Act
            await store.dispatch(ActionCreators.getAllSettings());

            // Assert
            expect(DataService.getDataAsync).toHaveBeenCalledWith('AddCustomerFeedback/AllSetting');
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('getFeedbackSubjectTemplates', () => {
        it('should handle setFeedbackSubjectTemplates when fetching feedback subject templates have been done', async () => {
            // Arrange
            const response = {
                data: {
                    templateID : 1,
                    subject : 'subject',
                    isActive : true
                }
            };
            const expectedActions = [{ type: ActionCreators.setFeedbackSubjectTemplates.type, payload: response.data }];
            const store = mockStore({ feedbackSubjectTemplates: [] });
            const promise = Promise.resolve(response);
            DataService.getDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.getFeedbackSubjectTemplates(1));

            // Assert
            expect(DataService.getDataAsync).toHaveBeenCalledWith('Common/GetFeedbackSubjectTemplate', {"subject": 1});
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('getCustomerDetail ', () => {
        it('should handle setCustomerDetail when fetching customer detail have been done', async () => {
            // Arrange
            const response = {
                data: {
                    id: 1,
                    custName: 'customer'
                }
            };
            const expectedActions = [{ type: ActionCreators.setCustomerDetail.type, payload: response.data }];
            const store = mockStore({ customerDetail: null });
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.getCustomerDetail(1));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('AccountDetail/GetCustomerById', 1);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('getBalanceUpday', () => {
        it('should handle setAllSettings when fetching getAllSettings have been done', async () => {
            // Arrange
            const response = {
                data: {
                    test: new Date()
                }
            };
            const promise = Promise.resolve(response);
            Site.blockUI = jest.fn();
            Site.unblockUI = jest.fn();
            DataService.getDataAsync = jest.fn(() => promise);
            const expectedActions = [{ type: ActionCreators.setBalanceUpday.type, payload: response.data }];
            const store = mockStore({ settings: null });

            // Act
            await store.dispatch(ActionCreators.getBalanceUpday());

            // Assert
            expect(DataService.getDataAsync).toHaveBeenCalledWith('Feedback/GetBalanceUpday');
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('addFeedback', () => {
        it('should handle setAddFeedback when request has been done', async () => {
            const expectedParams = {
                data: {
                   
                }
            };
            const response = { data: { isSuccessful: true, message: '' } };
            const expectedActions = [{ type: ActionCreators.setAddFeedback.type, payload: response.data }];
            const store = mockStore({ addFeedbackResult: null });
            Site.blockUI = jest.fn();
            Site.unblockUI = jest.fn();
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.addFeedback(expectedParams));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('AddCustomerFeedback/Create', expectedParams);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });


    describe('verifyUsername', () => {
        it('should handle response when request has been done', async () => {
            // Arrange
            const expectedParams = {
                data: {
                    customersInput: 'val'
                }
            };
            const store = mockStore({});
            const response = {
                data: [{
                    custId: 1,
                    val: 'val'
                }]
            };
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            // Act
            const actual = await store.dispatch(ActionCreators.verifyUserName(expectedParams));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('CustomerSetting/VerifyUsername', expectedParams);
            expect(actual).toEqual(response.data);
        });
    });

    describe('getTicketInfoByRef', () => {
        it('should handle response when request has been done', async () => {
            // Arrange
            const store = mockStore({});
            const response = {
                data: [{
                    description : 'description'
                }]
            };
            const promise = Promise.resolve(response);
            DataService.getDataAsync = jest.fn(() => promise);

            // Act
            const actual = await store.dispatch(ActionCreators.getTicketInfoByRef({refNo: 1}));

            // Assert
            expect(DataService.getDataAsync).toHaveBeenCalledWith('Feedback/GetTicketInfoByRefNo', { refNo: 1 });
            expect(actual).toEqual(response.data);
        });
    });
});