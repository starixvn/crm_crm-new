import reducer, {
    setGridParams,
    setGridData,
    setEditSmaFeedbackDialog,
    setEditSmaFeedback
} from '../smaFeedbackSlice';
  
describe('smaFeedback reducer', () => {
    const initialState = {
        gridParams: {
            pageIndex: 1,
            pageSize: 100
        },
        gridData: null,
        editSmaFeedbackDialog: { show: false },
        editSmaFeedbackResult: null
    };
  
    test('should return the initial state', () => {
        expect(reducer(undefined, { type: undefined })).toEqual(initialState);
    });
  
    test('should handle setGridParams', () => {
        const newGridParams = { pageIndex: 2, pageSize: 50 };
        const action = setGridParams(newGridParams);
        
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            gridParams: newGridParams
        });
    });
  
    test('should handle setGridData', () => {
        const gridData = { rows: [{ id: 1, name: 'Test' }], total: 1 };
        const action = setGridData(gridData);
        
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            gridData
        });
    });
  
    test('should handle setEditSmaFeedbackDialog', () => {
        const dialogState = { show: true, id: 123 };
        const action = setEditSmaFeedbackDialog(dialogState);
        
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            editSmaFeedbackDialog: dialogState
        });
    });
  
    test('should handle setEditSmaFeedback', () => {
        const result = { success: true, message: 'Updated successfully' };
        const action = setEditSmaFeedback(result);
        
        expect(reducer(initialState, action)).toEqual({
            ...initialState,
            editSmaFeedbackResult: result
        });
    });
  });