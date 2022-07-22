import feedbackSubject, {
    resetState,
    setGridParams,
    setFeedBackSubject,
    setAllActiveFeedbackSubject,
    setSelectFeedbackSubjectId,
    setCreateFeedbackSubjectPopup,
    setCreateFeedbackSubjectResult,
    setEditStatusFeedbackSubjectPopup,
    setEditFeedbackSubjectPopup,
    setEditFeedbackSubjectResult
} from '../feedbackSubjectSlide';

describe('feedbackSubject reducer', () => {
    it('should handle reset state', () => {
        expect(
            feedbackSubject({}, {
                type: resetState.type
            })
        ).toEqual({
            gridData: null,
            gridParams: {
            Subject: null,
            pageIndex: 1,
            pageSize: 100
            },
            allActiveFeedbackSubject: null,
            selectFeedbackSubject: null,
            createFeedbackSubjectPopup: { show: false },
            createFeedbackSubjectResult: '',
            editStatusFeedbackSubjectPopup: { show: false },
            editFeedbackSubjectPopup: { show:false },
            editFeedbackSubjectResult: ''
        });
    });

    it('show handle initial state', () => {
        expect(feedbackSubject(undefined, {})).toEqual({
            gridData: null,
            gridParams: {
                Subject: null,
                pageIndex: 1,
                pageSize: 100
            },
            selectFeedbackSubject: null,
            allActiveFeedbackSubject: null,
            createFeedbackSubjectPopup: { show: false },
            createFeedbackSubjectResult: '',
            editStatusFeedbackSubjectPopup: { show: false },
            editFeedbackSubjectPopup: { show:false },
            editFeedbackSubjectResult: ''
        });
    });

    it('should handle setGridParams', () => {
        expect(
            feedbackSubject({}, {
                type: setGridParams.type,
                payload: {
                    Subject: null,
                    pageIndex: 1,
                    pageSize: 100
                }
            })
        ).toEqual({
            gridParams: {
                Subject: null,
                pageIndex: 1,
                pageSize: 100
            }
        });
    });

    it('should handle setFeedBackSubject', () => {
        expect(
            feedbackSubject({}, {
                type: setFeedBackSubject.type,
                payload: { totalItems: 0, data: [] }
            })
        ).toEqual({
            gridData: { totalItems: 0, data: [] }
        });
    });

    it('should handle setAllActiveFeedbackSubject', () => {
        expect(
            feedbackSubject({}, {
                type: setAllActiveFeedbackSubject.type,
                payload: [ { subject: 'test1' }, { subject: 'test2' } ]
            })
        ).toEqual({
            allActiveFeedbackSubject: [ { subject: 'test1' }, { subject: 'test2' } ]
        });
    });

    it('should handle setSelectFeedbackSubjectId', () => {
        expect(
            feedbackSubject({}, {
                type: setSelectFeedbackSubjectId.type,
                payload: { templateID: 1, subject: 'feedback', isActive: true }
            })
        ).toEqual({
            selectFeedbackSubject: { templateID: 1, subject: 'feedback', isActive: true }
        });
    });

    it('should handle setCreateFeedbackSubjectPopup', () => {
        expect(
            feedbackSubject({}, {
                type: setCreateFeedbackSubjectPopup.type,
                payload: { show: false }
            })
        ).toEqual({
            createFeedbackSubjectPopup: { show: false }
        });
    });

    it('shoud handle setCreateFeedbackSubjectResult', () => {
        expect(
            feedbackSubject({}, {
                type: setCreateFeedbackSubjectResult.type,
                payload: { isSuccessful: false, message: '' }
            })
        ).toEqual({
            createFeedbackSubjectResult: { isSuccessful: false, message: ''}
        });
    });

    it('should handle setEditFeedbackSubjectPopup', () => {
        expect(
            feedbackSubject({}, {
                type: setEditFeedbackSubjectPopup.type,
                payload: { show: false }
            })
        ).toEqual({
            editFeedbackSubjectPopup: { show: false }
        });
    });

    it('should handle setEditFeedbackSubjectResult', () => {
        expect(
            feedbackSubject({}, {
                type: setEditFeedbackSubjectResult.type,
                payload: { isSuccessful: false, message: '' }
            })
        ).toEqual({
            editFeedbackSubjectResult: { isSuccessful: false, message: '' }
        });
    });

    it('should handle setEditStatusFeedbackSubjectPopup', () => {
        expect(
            feedbackSubject({}, {
                type: setEditStatusFeedbackSubjectPopup.type,
                payload: { show: false }
            })
        ).toEqual({
            editStatusFeedbackSubjectPopup: { show: false }
        });
    });

});