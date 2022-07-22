import remark, {
    resetState,
    setRemarks
} from '../remarkSlice';

describe('remarkSlice reducer', () => {
    it('show handle reset state', () => {
        expect(remark({}, {
            type: resetState.type,
            payload: { data: {} }
        })).toEqual({
            gridData: null
        });
    });
    it('show handle initial state', () => {
        expect(remark(undefined, {})).toEqual({
            gridData: null
        });
    });

    it('should handle setRemarks', () => {
        expect(
            remark({}, {
                type: setRemarks.type,
                payload: { specialRemarks: ['test'], normalRemarks: ['testing'] }
            })
        ).toEqual({
            gridData: { specialRemarks: ['test'], normalRemarks: ['testing'] }
        });
    });
});