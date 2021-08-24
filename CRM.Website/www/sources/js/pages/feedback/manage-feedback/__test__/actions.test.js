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
                    customerTypes: [],
                    responses: [],
                    mainCategories: [],
                    subCategories: [],
                    communications: [],
                    statuses: []
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
            expect(DataService.getDataAsync).toHaveBeenCalledWith('ManageFeedback/GetAllSettings');
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('getGridFeedbacks', () => {
        it('should handle setGridFeedbacks when fetching getGridFeedbacks have been done', async () => {
            // Arrange
            const expectedParams = {
                userName: ''
            };
            const response = {
                data:[
                    {customerType: [{settingValue: 'All'}]}
                ]
            };
            const expectedActions = [{ type: ActionCreators.setGridFeedbacks.type, payload: response.data }];
            const store = mockStore({ gridData: null });
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.getGridFeedbacks(expectedParams));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('ManageFeedback/SearchManageFeedback', expectedParams);
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
            expect(DataService.getFileAsync).toHaveBeenCalledWith('ManageFeedback/ExportExcel', expectedParams);
            expect(Site.downloadFile).toHaveBeenCalledWith(response.data, filename);
        });
    });
});