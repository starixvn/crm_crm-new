import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import { ActionCreators } from '../actions';
import {
    setLogsByCustomerId,
    setStatusForFilter,
    setFeedbackSubjectTemplates
} from '../communicationLogSlice';

import * as functions from '../common.functions';

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

    describe('getLogsByCustomerId', () => {
        it('should handle setLogsByCustomerId when fetching data have been done', async () => {
            // Arrange
            const response = { data: {data: [{ firstName: 'test' }], mainCategories:[{settingId: 1, settingValue: 'test'}] }};
            const expectedParams = { 
                customerId: 1754,
                fromDate: 'Sep 01, 2021',
                handler: '',
                statusId: 0,
                toDate: 'Sep 15, 2021'
            };
            const expectedResponse = {
                data: [{
                    firstName: "test",
                    groupCategory:[{
                        mainCategoryId: 1
                    }],
                    mainCategoryValue: "test",
                }],
                mainCategories:[{settingId: 1, settingValue: 'test'}]
            };
            const expectedActions = [{ type: setLogsByCustomerId.type, payload: expectedResponse }];
            const store = mockStore({ gridData: null });
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);
            functions.filterGroupCategory = jest.fn(() => { return [{mainCategoryId: 1 }]});
            // Act
            await store.dispatch(ActionCreators.getLogsByCustomerId(expectedParams));

            // Assert
            expect(DataService.postDataAsync).toHaveBeenCalledWith('CommunicationLog/GetLogsByCustomerId', expectedParams);
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    describe('getStatusForFilter', () => {
        it('should handle setStatusForFilter when fetching data have been done', async () => {
            // Arrange
            const response = { countries: [] };
            const expectedActions = [{ type: setStatusForFilter.type, payload: response.data }];
            const store = mockStore({ statusFilter: null });
            const promise = Promise.resolve(response);
            DataService.getDataAsync = jest.fn(() => promise);

            // Act
            await store.dispatch(ActionCreators.getStatusForFilter());

            // Assert
            expect(DataService.getDataAsync).toHaveBeenCalledWith('CommunicationLog/GetAllStatus?isEdit=false');
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});