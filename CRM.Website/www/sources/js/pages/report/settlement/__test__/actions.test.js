import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import { ActionCreators } from '../actions';
import { shallow } from 'enzyme';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actionCreators', () => {
    beforeAll(() => {
        Site.resolveClientUrl = jest.fn((url) => url);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getGridData', () => {
        it('should handle setGridData when fetching settlement report has been done', async () => {
            const expectedParams = {
                year: 2019,
                pageIndex: 1,
                pageSize: 12
            };
            const response = {
                data: {
                    name: "Settlement Issues Report For Year 2019",
                    childReports: [
                        {
                            name: "Oct",
                            childReports: [
                                {
                                    id: 100,
                                    name: "Italy",
                                    numberOfIssues: 2
                                }
                            ]
                        }
                    ],
                    total: {
                        name: "Grand Total",
                        numberOfIssues: 2,
                        childReports: [
                            {
                                id: 100,
                                name: "Italy",
                                numberOfIssues: 2
                            }
                        ]
                    },
                    totalChildReports: 1
                }
            };
            const expectedActions = [{ type: ActionCreators.setGridData.type, payload: response.data }];
            const store = mockStore({ gridData: null });
            Site.blockUI = jest.fn();
            Site.unblockUI = jest.fn();
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            await store.dispatch(ActionCreators.getGridData(expectedParams)).then(() => {
                expect(DataService.postDataAsync).toHaveBeenCalledWith('Report/Settlement/GetSettlementReport', expectedParams);
                expect(store.getActions()).toEqual(expectedActions);
            });
        });
    });

    describe('exportExcel', () => {
        it('should call exactly functions', async () => {
            // Arrange
            const response = {
                data: {
                },
                headers: {
                    ['content-disposition']: 'a; filename=test.txt;'
                }
            };
            const filename = response.headers['content-disposition'].split('filename=')[1].split(";")[0];
            const expectedParams = {
                year: 2019,
                pageIndex: 1,
                pageSize: 12
            };
            Site.blockUI = jest.fn();
            Site.unblockUI = jest.fn();
            Site.downloadFile = jest.fn();
            const promise = Promise.resolve(response);
            DataService.getFileAsync = jest.fn(() => promise);
            const store = mockStore({ gridData: null });

            // Act
            await store.dispatch(ActionCreators.exportExcel(expectedParams)).then(() => {
                // Assert
                expect(DataService.getFileAsync).toHaveBeenCalledWith('Report/Settlement/ExportSettlementReport', expectedParams);
                expect(Site.downloadFile).toHaveBeenCalledWith(response.data, filename);
            });
        });
    });
});