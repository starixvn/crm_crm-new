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
            //const expectedActions = [{ type: ActionCreators.setAllSettings.type, payload: response.data }];
            const store = mockStore({ settings: [] });

            // Act
            await store.dispatch(ActionCreators.getAllSettings());

            // Assert
            expect(DataService.getDataAsync).toHaveBeenCalledWith('CategoryClassification/GetAllSettings');
        });
    });


});