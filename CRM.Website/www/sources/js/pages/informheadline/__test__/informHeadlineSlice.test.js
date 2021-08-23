import informHeadline, {
    setInforms,
    setTitleDetail,
    setContactInformSettings,
    setContactInforms,
    setShowEditContactInform,
    setGridParams,
    setAllSettings,
    setSearchInforms,
    setShowEditSearchInform,
    setUpdateContactInforms,
    setUpdateSearchInforms,
    setRemovedAccountLogs,
    setRemovedAccountLogDetails,
    setShowRemovedLogs,
    setShowRemovedLogDetails,
    setGridParamRemovedLogs,
    setGridParamRemovedLogDetails,
    setNewInforms,
    setShowNewInforms,
    setInsertInforms,
    setShowOptions
} from '../informHeadlineSlice';

describe('informHeadlineSlice reducer', () => {
    it('should handle initial state', () => {
        expect(informHeadline(undefined, {})).toEqual({
            gridData: null,
            titleDetail: null,
            contactInformSettings: null,
            contactInforms: null,
            showEditContactInform: {show: false},
            gridParams: {
                pageIndex: 1,
                pageSize: 100
            },
            allSettings: null,
            searchInforms: null,
            showEditSearchInform: {show: false},
            resultUpdateContactInforms: null,
            resultUpdateSearchInforms: null,
            removedAccountLogs: null,
            removedAccountLogDetails: null,
            showRemovedLogs: {show: false},
            showRemovedLogDetails: {show: false},
            gridParamRemovedLogs: {
                pageIndex: 1,
                pageSize: 100
            },
            gridRemovedLogDetails: {
                pageIndex: 1,
                pageSize: 100
            },
            newInforms: null,
            showNewInforms: {show: false},
            resultInsertInforms: null,
            showOptions: {show: false}
        });
    });

    it('should handle setInforms', () => {
        expect(
            informHeadline({}, {
                type: setInforms.type,
                payload: { titleId: 720, title:"test" }
            })
        ).toEqual({
            gridData: { titleId: 720, title:"test" }
        });
    });

    it('should handle setTitleDetail', () => {
        expect(
            informHeadline({}, {
                type: setTitleDetail.type,
                payload: { titleId: 720, title:"test", currencies: "2,3,5" }
            })
        ).toEqual({
            titleDetail: { titleId: 720, title:"test", currencies: "2,3,5" }
        });
    });

    it('should handle setContactInformSettings', () => {
        expect(
            informHeadline({}, {
                type: setContactInformSettings.type,
                payload: { titleId: 720, title:"test" }
            })
        ).toEqual({
            contactInformSettings: { titleId: 720, title:"test" }
        });
    });

    it('should handle setContactInforms', () => {
        expect(
            informHeadline({}, {
                type: setContactInforms.type,
                payload: { headlineId: 527906, groupId: 136, username: "S6EU" }
            })
        ).toEqual({
            contactInforms: { headlineId: 527906, groupId: 136, username: "S6EU" }
        });
    });

    it('should handle setShowEditContactInform', () => {
        expect(
            informHeadline({}, {
                type: setShowEditContactInform.type,
                payload: { show: false }
            })
        ).toEqual({
            showEditContactInform: { show: false }
        });
    });

    it('should handle setGridParams', () => {
        expect(
            informHeadline({}, {
                type: setGridParams.type,
                payload: {
                    pageIndex: 1,
                    pageSize: 100
                }
            })
        ).toEqual({
            gridParams: {
                pageIndex: 1,
                pageSize: 100
            }
        });
    });

    it('should handle setAllSettings', () => {
        expect(
            informHeadline({}, {
                type: setAllSettings.type,
                payload: { currencies: [{id: 1}], productStatuses: [{statusId: 123}] }
            })
        ).toEqual({
            allSettings: { currencies: [{id: 1}], productStatuses: [{statusId: 123}] }
        });
    });

    it('should handle setSearchInforms', () => {
        expect(
            informHeadline({}, {
                type: setSearchInforms.type,
                payload: { headlineId: 527906, groupId: 136, username: "S6EU" }
            })
        ).toEqual({
            searchInforms: { headlineId: 527906, groupId: 136, username: "S6EU" }
        });
    });

    it('should handle setShowEditSearchInform', () => {
        expect(
            informHeadline({}, {
                type: setShowEditSearchInform.type,
                payload: { show: false }
            })
        ).toEqual({
            showEditSearchInform: { show: false }
        });
    });
    
    it('should handle setUpdateContactInforms', () => {
        expect(
            informHeadline({}, {
                type: setUpdateContactInforms.type,
                payload: { code: 0, isSuccessful: true, message: "" }
            })
        ).toEqual({
            resultUpdateContactInforms: { code: 0, isSuccessful: true, message: "" }
        });
    });

    it('should handle setUpdateSearchInforms', () => {
        expect(
            informHeadline({}, {
                type: setUpdateSearchInforms.type,
                payload: { code: 0, isSuccessful: true, message: "" }
            })
        ).toEqual({
            resultUpdateSearchInforms: { code: 0, isSuccessful: true, message: "" }
        });
    });

    it('should handle setRemovedAccountLogs', () => {
        expect(
            informHeadline({}, {
                type: setRemovedAccountLogs.type,
                payload: { item: [{logId:1}], totalItems: 1 }
            })
        ).toEqual({
            removedAccountLogs: { item: [{logId:1}], totalItems: 1 }
        });
    });

    it('should handle setRemovedAccountLogDetails', () => {
        expect(
            informHeadline({}, {
                type: setRemovedAccountLogDetails.type,
                payload: { item: [{directAccount: "CRM"}], totalItems: 1 }
            })
        ).toEqual({
            removedAccountLogDetails: { item: [{directAccount: "CRM"}], totalItems: 1 }
        });
    });

    it('should handle setShowRemovedLogs', () => {
        expect(
            informHeadline({}, {
                type: setShowRemovedLogs.type,
                payload: { show: false }
            })
        ).toEqual({
            showRemovedLogs: { show: false }
        });
    });

    it('should handle setShowRemovedLogDetails', () => {
        expect(
            informHeadline({}, {
                type: setShowRemovedLogDetails.type,
                payload: { show: false }
            })
        ).toEqual({
            showRemovedLogDetails: { show: false }
        });
    });

    it('should handle setGridParamRemovedLogs', () => {
        expect(
            informHeadline({}, {
                type: setGridParamRemovedLogs.type,
                payload: {
                    pageIndex: 1,
                    pageSize: 100
                }
            })
        ).toEqual({
            gridParamRemovedLogs: {
                pageIndex: 1,
                pageSize: 100
            }
        });
    });

    it('should handle setGridParamRemovedLogDetails', () => {
        expect(
            informHeadline({}, {
                type: setGridParamRemovedLogDetails.type,
                payload: {
                    pageIndex: 1,
                    pageSize: 100
                }
            })
        ).toEqual({
            gridParamRemovedLogDetails: {
                pageIndex: 1,
                pageSize: 100
            }
        });
    });

    it('should handle setNewInforms', () => {
        expect(
            informHeadline({}, {
                type: setNewInforms.type,
                payload: { id: 1, headlineId: 2464, username: "BYRON", groupId: 0 }
            })
        ).toEqual({
            newInforms: { id: 1, headlineId: 2464, username: "BYRON", groupId: 0 }
        });
    });

    it('should handle setShowNewInforms', () => {
        expect(
            informHeadline({}, {
                type: setShowNewInforms.type,
                payload: { show: false }
            })
        ).toEqual({
            showNewInforms: { show: false }
        });
    });

    it('should handle setInsertInforms', () => {
        expect(
            informHeadline({}, {
                type: setInsertInforms.type,
                payload: { code: 0, isSuccessful: true, message: "" }
            })
        ).toEqual({
            resultInsertInforms: { code: 0, isSuccessful: true, message: "" }
        });
    });

    it('should handle setInsertInforms', () => {
        expect(
            informHeadline({}, {
                type: setInsertInforms.type,
                payload: { code: 0, isSuccessful: true, message: "" }
            })
        ).toEqual({
            resultInsertInforms: { code: 0, isSuccessful: true, message: "" }
        });
    });

    it('should handle setShowOptions', () => {
        expect(
            informHeadline({}, {
                type: setShowOptions.type,
                payload: { show: false }
            })
        ).toEqual({
            showOptions: { show: false }
        });
    });
});