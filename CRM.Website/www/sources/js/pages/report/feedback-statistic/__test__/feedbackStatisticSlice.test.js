import feedbackStatistic, {
    setGridParams,
    setGridData,
    setGridParamDetails,
    setDetailsDataGrid,
    setOpenDetailPopup,
    setOpenChartPopup,
    setViewRelatedCustomerDialog
} from '../feedbackStatisticSlice';

describe('feedbackStatistic reducer', () => {
    it('should handle initial state', () => {
        expect(feedbackStatistic(undefined, {})).toEqual({
            gridParams: {
                pageIndex: 1,
                pageSize: 100
            },
            gridParamDetails: {
                pageIndex: 1,
                pageSize: 100
            },
            gridData: null,
            details: null,
            detailPopup: { show: false},
            chart: { show: false, chartInfo: null},
            viewRelatedCustomerDialog: { show: false }
        });
    });

    it('should handle setGridParamDetails', () => {
        expect(
            feedbackStatistic({}, {
                type: setGridParamDetails.type,
                payload: { type: 1, fromDate: "Apr 02, 2020", toDate: "Jul 31, 2021", mainCategoryId: 0 }
            })
        ).toEqual({
            gridParamDetails: { type: 1, fromDate: "Apr 02, 2020", toDate: "Jul 31, 2021", mainCategoryId: 0 }
        });
    });

    it('should handle setGridParams', () => {
        expect(
            feedbackStatistic({}, {
                type: setGridParams.type,
                payload: { type: 1, fromDate: "Apr 02, 2020", toDate: "Jul 31, 2021" }
            })
        ).toEqual({
            gridParams: { type: 1, fromDate: "Apr 02, 2020", toDate: "Jul 31, 2021" }
        });
    });

    it('should handle setGridData', () => {
        expect(
            feedbackStatistic({}, {
                type: setGridData.type,
                payload: { 
                    title: "Feedback Statistics Report from Mar 23, 2022 to Mar 30, 2022",
                    totalItems: 1,
                    usernames: [{id: 10278938, name: "starixIT"}]
                }
            })
        ).toEqual({
            gridData: {
                title: "Feedback Statistics Report from Mar 23, 2022 to Mar 30, 2022",
                totalItems: 1,
                usernames: [{id: 10278938, name: "starixIT"}]
            }
        });
    });

    it('should handle setDetailsDataGrid', () => {
        expect(
            feedbackStatistic({}, {
                type: setDetailsDataGrid.type,
                payload: { 
                    mainCategories: [{settingId: 3000, settingName: 'MainCategory'}],
                    data: [{feedbackDate: 'Mar 24, 2022 11:11:26 PM', feedbackId: 243549}]
                }
            })
        ).toEqual({
            details: {
                mainCategories: [{settingId: 3000, settingName: 'MainCategory'}],
                data: [{feedbackDate: 'Mar 24, 2022 11:11:26 PM', feedbackId: 243549}]
            }
        });
    });

    it('should handle setOpenDetailPopup', () => {
        expect(
            feedbackStatistic({}, {
                type: setOpenDetailPopup.type,
                payload: { show: false, data: {id: 1, name: 'test'} }
            })
        ).toEqual({
            detailPopup: { show: false , data: {id: 1, name: 'test'} }
        });
    });

    it('should handle setOpenChartPopup', () => {
        expect(
            feedbackStatistic({}, {
                type: setOpenChartPopup.type,
                payload: { show: true, data: {
                    mainCategories: [{settingId: 3000, settingName: 'MainCategory'}],
                    data: [{feedbackDate: 'Mar 24, 2022 11:11:26 PM', feedbackId: 243549}]
                }}
            })
        ).toEqual({
            chart: { show: true, data: {
                mainCategories: [{settingId: 3000, settingName: 'MainCategory'}],
                data: [{feedbackDate: 'Mar 24, 2022 11:11:26 PM', feedbackId: 243549}]
            } }
        });
    });

    it('should handle setViewRelatedCustomerDialog', () => {
        expect(
            feedbackStatistic({}, {
                type: setViewRelatedCustomerDialog.type,
                payload: { show: true }
            })
        ).toEqual({
            viewRelatedCustomerDialog: { show: true }
        });
    });
});