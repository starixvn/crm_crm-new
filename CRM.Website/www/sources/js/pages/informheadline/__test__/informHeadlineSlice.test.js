import informHeadline, {
    setInforms,
    setTitleDetail,
    setContactInforms,
    setEditContactInformDialog,
    setGridParams,
    setAllSettings,
    setEditInforms,
    setEditInformDialog,
    setResultEditContactInforms,
    setResultEditInforms,
    setRemovedAccountLogs,
    setRemovedAccountLogDetails,
    setRemovedLogDialog,
    setRemovedLogDetailDialog,
    setGridParamRemovedLogs,
    setGridParamRemovedLogDetails,
    setNewInforms,
    setNewInformDialog,
    setResultInsertInforms,
    setEditedInforms,
    setFilterData
} from '../informHeadlineSlice';

describe('informHeadlineSlice reducer', () => {
    it('should handle initial state', () => {
        expect(informHeadline(undefined, {})).toEqual({
            informs: null,
            titleDetail: null,
            contactInforms: null,
            editContactInformDialog: {show: false},
            allSettings: null,
            dataEditInforms: null,
            permissions: null,
            editInformDialog: {show: false},
            resultEditContactInforms: null,
            resultEditInforms: null,
            removedAccountLogs: null,
            removedAccountLogDetails: null,
            removedLogDialog: {show: false},
            removedLogDetailDialog: {show: false},
            newInforms: null,
            newInformDialog: {show: false},
            resultInsertInforms: null,
            editedInforms: [],
            filterData: { values: {}, errors: {} },
            gridParams: { pageIndex: 1, pageSize: 100 },
            gridParamRemovedLogs: { pageIndex: 1, pageSize: 100 },
            gridRemovedLogDetails: { pageIndex: 1, pageSize: 100 }
        });
    });

    it('should handle setInforms', () => {
        expect(
            informHeadline({}, {
                type: setInforms.type,
                payload: { titleId: 720, title:"test" }
            })
        ).toEqual({
            informs: { titleId: 720, title:"test" }
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

    it('should handle setEditContactInformDialog', () => {
        expect(
            informHeadline({}, {
                type: setEditContactInformDialog.type,
                payload: { show: false }
            })
        ).toEqual({
            editContactInformDialog: { show: false }
        });
    });

    it('should handle setGridParams', () => {
        expect(
            informHeadline({}, {
                type: setGridParams.type,
                payload: { pageIndex: 1, pageSize: 100 }
            })
        ).toEqual({
            gridParams: { pageIndex: 1, pageSize: 100 }
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

    it('should handle setEditInforms', () => {
        expect(
            informHeadline({}, {
                type: setEditInforms.type,
                payload: { headlineId: 527906, groupId: 136, username: "S6EU" }
            })
        ).toEqual({
            dataEditInforms: { headlineId: 527906, groupId: 136, username: "S6EU" }
        });
    });

    it('should handle setEditInformDialog', () => {
        expect(
            informHeadline({}, {
                type: setEditInformDialog.type,
                payload: { show: false }
            })
        ).toEqual({
            editInformDialog: { show: false }
        });
    });
    
    it('should handle setResultEditContactInforms', () => {
        expect(
            informHeadline({}, {
                type: setResultEditContactInforms.type,
                payload: { code: 0, isSuccessful: true, message: "" }
            })
        ).toEqual({
            resultEditContactInforms: { code: 0, isSuccessful: true, message: "" }
        });
    });

    it('should handle setResultEditInforms', () => {
        expect(
            informHeadline({}, {
                type: setResultEditInforms.type,
                payload: { code: 0, isSuccessful: true, message: "" }
            })
        ).toEqual({
            resultEditInforms: { code: 0, isSuccessful: true, message: "" }
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

    it('should handle setRemovedLogDialog', () => {
        expect(
            informHeadline({}, {
                type: setRemovedLogDialog.type,
                payload: { show: false }
            })
        ).toEqual({
            removedLogDialog: { show: false }
        });
    });

    it('should handle setRemovedLogDetailDialog', () => {
        expect(
            informHeadline({}, {
                type: setRemovedLogDetailDialog.type,
                payload: { show: false }
            })
        ).toEqual({
            removedLogDetailDialog: { show: false }
        });
    });

    it('should handle setGridParamRemovedLogs', () => {
        expect(
            informHeadline({}, {
                type: setGridParamRemovedLogs.type,
                payload: { pageIndex: 1, pageSize: 100 }
            })
        ).toEqual({
            gridParamRemovedLogs: { pageIndex: 1, pageSize: 100 }
        });
    });

    it('should handle setGridParamRemovedLogDetails', () => {
        expect(
            informHeadline({}, {
                type: setGridParamRemovedLogDetails.type,
                payload: { pageIndex: 1, pageSize: 100 }
            })
        ).toEqual({
            gridParamRemovedLogDetails: { pageIndex: 1, pageSize: 100}
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

    it('should handle setNewInformDialog', () => {
        expect(
            informHeadline({}, {
                type: setNewInformDialog.type,
                payload: { show: false }
            })
        ).toEqual({
            newInformDialog: { show: false }
        });
    });

    it('should handle setResultInsertInforms', () => {
        expect(
            informHeadline({}, {
                type: setResultInsertInforms.type,
                payload: { code: 0, isSuccessful: true, message: "" }
            })
        ).toEqual({
            resultInsertInforms: { code: 0, isSuccessful: true, message: "" }
        });
    });

    it('should handle setEditedInforms', () => {
        expect(
            informHeadline({}, {
                type: setEditedInforms.type,
                payload: { id: 1, headlineId: 2464, username: "BYRON", groupId: 0 }
            })
        ).toEqual({
            editedInforms: { id: 1, headlineId: 2464, username: "BYRON", groupId: 0 }
        });
    });

    it('should handle setFilterData', () => {
        expect(
            informHeadline({}, {
                type: setFilterData.type,
                payload: { currencies: [{id: 1}], productStatuses: [{statusId: 123}]  }
            })
        ).toEqual({
            filterData: { currencies: [{id: 1}], productStatuses: [{statusId: 123}] }
        });
    });
});