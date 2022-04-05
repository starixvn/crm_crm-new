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
        it('should handle setGridData when fetching summary report has been done', async () => {
            const expectedParams = {
                year: 2021,                
                categories: "3003",
                siteType: 0
            };
            const response = {
                data: {
                    categorySummaries: [
                        {
                            id: 3003,
                            name: "Open Account",
                            subCategories: [
                                {
                                    id: 4014,
                                    name: "Super/Master/Agent",
                                    subCategories: null,
                                    summaries: [
                                        {
                                            amount: 1,
                                            month: "FEB"
                                        },
                                        {
                                            amount: 1,
                                            month: "APR"
                                        },
                                        {
                                            amount: 1,
                                            month: "SEP"
                                        }
                                    ]
                                }
                            ],
                            summaries: [
                                {
                                    amount: 1,
                                    month: "FEB"
                                },
                                {
                                    amount: 1,
                                    month: "APR"
                                },
                                {
                                    amount: 1,
                                    month: "SEP"
                                }
                            ]
                        }
                    ],
                    grandTotals:[
                        {
                            amount: 1,
                            month: "FEB"
                        },
                        {
                            amount: 1,
                            month: "APR"
                        },
                        {
                            amount: 1,
                            month: "SEP"
                        }
                    ],
                    months: ["FEB", "APR", "SEP"],
                    reportTitle: "Categories Summary Report For Year 2021"
                }
            };
            const expectedActions = [{ type: ActionCreators.setGridData.type, payload: response.data }];
            const store = mockStore({ gridData: null });
            Site.blockUI = jest.fn();
            Site.unblockUI = jest.fn();
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            await store.dispatch(ActionCreators.getGridData(expectedParams)).then(() => {
                expect(DataService.postDataAsync).toHaveBeenCalledWith('SummaryReport/GetSummaryReport', expectedParams);
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
                year: 2021,                
                categories: "3003",
                siteType: 0
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
                expect(DataService.getFileAsync).toHaveBeenCalledWith('SummaryReport/ExportSummaryReport', expectedParams);
                expect(Site.downloadFile).toHaveBeenCalledWith(response.data, filename);
            });
        });
    });
});