import remark, {
    setRemarks
} from '../remarkSlice';

describe('remarkSlice reducer', () => {
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