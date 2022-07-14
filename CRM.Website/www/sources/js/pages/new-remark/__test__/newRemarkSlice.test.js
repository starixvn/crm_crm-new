import newRemark, {
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
    setHistoryGridParams,
    setLastFiveRemark
} from '../newRemarkSlice';

describe('remarkSlice reducer', () => {
    it('show handle initial state', () => {
        expect(newRemark(undefined, {})).toEqual({
            remarkTitles: null,
            allSettings: null,
            gridParams: { pageIndex: 1, pageSize: 100, username: '', isGuest: false},
            gridData: null,
            popupAdd: { show: false },
            editResult: null,
            popupEdit: { show: false, data: null, isViewHistory: false },
            popupDeleteConfirm: { show: false, id: null },
            deleteResult: null,
            createResult: null,
            validateResult: null,
            remarksHistory: null,
            showHistory: {show: false},
            historyGridParams: { pageIndex: 1, pageSize: 100, custId: '', remarkID: ''}
        });
    });

    it('should handle setRemarkTitle', () => {
        expect(
            newRemark({}, {
                type: setRemarkTitle.type,
                payload: [{id: 0, name: null, settingId: 70000, settingName: "RemarkTitles", settingValue: "Internal Request"}]
            })
        ).toEqual({
            remarkTitles: [{id: 0, name: null, settingId: 70000, settingName: "RemarkTitles", settingValue: "Internal Request"}]
        });
    });

    it('should handle setAllSettings', () => {
        expect(
            newRemark({}, {
                type: setAllSettings.type,
                payload: { 
                    extentions: [{id: 2022, value: "N/A", displayOrder: 0, isChild: false, isActive: true}],
                    relatedPics: [{letstalkIds: "sss,ssdsddscac", id: 264, name: "malcokm1_ss"}],
                    userId: 62585686
                }
            })
        ).toEqual({
            allSettings: { 
                extentions: [{id: 2022, value: "N/A", displayOrder: 0, isChild: false, isActive: true}],
                relatedPics: [{letstalkIds: "sss,ssdsddscac", id: 264, name: "malcokm1_ss"}],
                userId: 62585686
            }
        });
    });

    it('should handle setGridParams', () => {
        expect(
            newRemark({}, {
                type: setGridParams.type,
                payload: { 
                    pageIndex: 1, pageSize: 100, username: '', isGuest: false
                }
            })
        ).toEqual({
            gridParams: { 
                pageIndex: 1, pageSize: 100, username: '', isGuest: false
            }
        });
    });

    it('should handle setRemarks', () => {
        expect(
            newRemark({}, {
                type: setRemarks.type,
                payload: { 
                    data: [{remarkID: 1504, createdDate: "Apr 18, 2022 10:35:19 PM", lastUpdate: "Apr 18, 2022 11:23:30 PM"}],
                    totalItems: 9
                }
            })
        ).toEqual({
            gridData: { 
                data: [{remarkID: 1504, createdDate: "Apr 18, 2022 10:35:19 PM", lastUpdate: "Apr 18, 2022 11:23:30 PM"}],
                totalItems: 9
            }
        });
    });

    it('should handle setOpenCreatePopup', () => {
        expect(
            newRemark({}, {
                type: setOpenCreatePopup.type,
                payload: { show: false }
            })
        ).toEqual({
                popupAdd: { show: false}
        });
    });

    it('should handle setOpenEditPopup', () => {
        expect(
            newRemark({}, {
                type: setOpenEditPopup.type,
                payload: {  show: false }
            })
        ).toEqual({
            popupEdit: { show: false}
        });
    });

    it('should handle setOpenConfirmDelete', () => {
        expect(
            newRemark({}, {
                type: setOpenConfirmDelete.type,
                payload: { show: false }
            })
        ).toEqual({
            popupDeleteConfirm: { show: false}
        });
    });

    it('should handle setEditResult', () => {
        expect(
            newRemark({}, {
                type: setEditResult.type,
                payload: {isSuccessful: false}
            })
        ).toEqual({
            editResult: { isSuccessful: false}
        });
    });

    it('should handle setCreateResult', () => {
        expect(
            newRemark({}, {
                type: setCreateResult.type,
                payload: {isSuccessful: false}
            })
        ).toEqual({
            createResult: { isSuccessful: false}
        });
    });

    it('should handle setValidateResult', () => {
        expect(
            newRemark({}, {
                type: setValidateResult.type,
                payload: {isSuccessful: false}
            })
        ).toEqual({
            validateResult: { isSuccessful: false}
        });
    });

    it('should handle setValidateResult', () => {
        expect(
            newRemark({}, {
                type: setValidateResult.type,
                payload: {isSuccessful: false}
            })
        ).toEqual({
            validateResult: { isSuccessful: false}
        });
    });


    it('should handle setRemarksHistory', () => {
        expect(
            newRemark({}, {
                type: setRemarksHistory.type,
                payload: {
                    data: [{versionID: 3, remarkID: 1506, createdDate: "Apr 20, 2022 04:11:09 AM"}],
                    totalItems: 3
                }
            })
        ).toEqual({
            remarksHistory: {
                data: [{versionID: 3, remarkID: 1506, createdDate: "Apr 20, 2022 04:11:09 AM"}],
                totalItems: 3
            }
        });
    });

    it('should handle setShowHistory', () => {
        expect(
            newRemark({}, {
                type: setShowHistory.type,
                payload: { show: false }
            })
        ).toEqual({
            showHistory: { show: false}
        });
    });

    it('should handle setHistoryGridParams', () => {
        expect(
            newRemark({}, {
                type: setHistoryGridParams.type,
                payload: {  pageIndex: 1, pageSize: 100, custId: '', remarkID: '' }
            })
        ).toEqual({
            historyGridParams: { pageIndex: 1, pageSize: 100, custId: '', remarkID: '' }
        });
    });    
});