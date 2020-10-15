import picAssignment, {
    setGridParams,
    setGridData,
    setSettings,
    setRemoveOptions,
    setRemovePicAssignmentPopup,
    setAssignPicPopup,
    setAssignPicResult,
    setAssignPicFilter,
    setValidateAssignPicResult,
    setConfirmAssignedDirectAccountPopup,
    setDefaultPicPopup
} from '../picAssignmentSlice';
import { DefaultPageSize } from '@jsroot/common/constants';

describe('picAssignmentSlice', () => {
    it('should handle initial state', () => {
        // Assert
        expect(picAssignment(undefined, {})).toEqual({
            gridParams: {
                pageIndex: 1,
                pageSize: DefaultPageSize
            },
            picAssignmentGridData: {},
            setting: {},
            removeOptions: {
                isCheckedAll: false,
                isDisabledRemove: true,
                isHadAll: false,
                shouldResetScrollPosition: true,
                dataList: []
            },
            removePicAssignmentPopup: {
                show: false
            },
            assignPicPopup: {
                show:false
            },
            assignPicResult: {
                show: false
            },
            assignPicFilter: {
                headline: null,
                pics: [],
                directAccount: [],
                isSelectedAll: false
            },
            validateAssignPicResult: {},
            confirmAssignedDirectAccountPopup: {
                show: false
            },
            defaultPicPopup: {
                show: false
            }
        });
    });

    it('should handle setGridParams', () => {
        expect(
            picAssignment({}, {
                type: setGridParams.type,
                payload: [{ id: 1, type: 'gridParams' }]
            })
        ).toEqual({
            gridParams: [{ id: 1, type: 'gridParams' }]
        });
    });
    
    it('should handle setGridData', () => {
        expect(
            picAssignment({}, {
                type: setGridData.type,
                payload: [{ id: 1, type: 'gridData' }]
            })
        ).toEqual({
            picAssignmentGridData: [{ id: 1, type: 'gridData' }]
        });
    });
    
    it('should handle setSettings', () => {
        expect(
            picAssignment({}, {
                type: setSettings.type,
                payload: [{ id: 1, type: 'settings' }]
            })
        ).toEqual({
            settings: [{ id: 1, type: 'settings' }]
        });
    });
    
    it('should handle setRemoveOptions', () => {
        expect(
            picAssignment({}, {
                type: setRemoveOptions.type,
                payload: [{ id: 1, type: 'removeOptions' }]
            })
        ).toEqual({
            removeOptions: [{ id: 1, type: 'removeOptions' }]
        });
    });
    
    it('should handle setRemovePicAssignmentPopup', () => {
        expect(
            picAssignment({}, {
                type: setRemovePicAssignmentPopup.type,
                payload: [{ id: 1, type: 'removePicAssignmentPopup' }]
            })
        ).toEqual({
            removePicAssignmentPopup: [{ id: 1, type: 'removePicAssignmentPopup' }]
        });
    });
    
    it('should handle setAssignPicPopup', () => {
        expect(
            picAssignment({}, {
                type: setAssignPicPopup.type,
                payload: [{ id: 1, type: 'assignPicPopup' }]
            })
        ).toEqual({
            assignPicPopup: [{ id: 1, type: 'assignPicPopup' }]
        });
    });
    
    it('should handle setAssignPicResult', () => {
        expect(
            picAssignment({}, {
                type: setAssignPicResult.type,
                payload: [{ id: 1, type: 'tests' }]
            })
        ).toEqual({
            assignPicResult: [{ id: 1, type: 'tests' }]
        });
    });
    
    it('should handle setAssignPicFilter', () => {
        expect(
            picAssignment({}, {
                type: setAssignPicFilter.type,
                payload: [{ id: 1, type: 'assignPicFilter' }]
            })
        ).toEqual({
            assignPicFilter: [{ id: 1, type: 'assignPicFilter' }]
        });
    });
    
    it('should handle setValidateAssignPicResult', () => {
        expect(
            picAssignment({}, {
                type: setValidateAssignPicResult.type,
                payload: [{ id: 1, type: 'validateAssignPicResult' }]
            })
        ).toEqual({
            validateAssignPicResult: [{ id: 1, type: 'validateAssignPicResult' }]
        });
    });
    
    it('should handle setConfirmAssignedDirectAccountPopup', () => {
        expect(
            picAssignment({}, {
                type: setConfirmAssignedDirectAccountPopup.type,
                payload: [{ id: 1, type: 'confirmAssignedDirectAccountPopup' }]
            })
        ).toEqual({
            confirmAssignedDirectAccountPopup: [{ id: 1, type: 'confirmAssignedDirectAccountPopup' }]
        });
    });
    
    it('should handle setDefaultPicPopup', () => {
        expect(
            picAssignment({}, {
                type: setDefaultPicPopup.type,
                payload: [{ id: 1, type: 'defaultPicPopup' }]
            })
        ).toEqual({
            defaultPicPopup: [{ id: 1, type: 'defaultPicPopup' }]
        });
    });
});