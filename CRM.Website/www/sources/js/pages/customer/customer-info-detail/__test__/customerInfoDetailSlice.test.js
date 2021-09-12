import customerInfoDetail, {
    setCustomerInfoDetail,
    setAllSettings,
    setEditCustomerInfoDetail,
    setEditCustomerInfoDetailDialog
} from '../customerInfoDetailSlice';

describe('customerInfoDetail reducer', () => {
    it('show handle initial state', () => {
        expect(customerInfoDetail(undefined, {})).toEqual({
            gridData: null,
            allSettings: null,
            editCustomerInfoDetailResult: '',
            editCustomerInfoDetailDialog: { show: false }
        });
    });

    it('should handle setCustomerInfoDetail', () => {
        expect(
            customerInfoDetail({}, {
                type: setCustomerInfoDetail.type,
                payload: { data: {} }
            })
        ).toEqual({
            gridData: { data: {} }
        });
    });

    it('should handle setAllSettings', () => {
        expect(
            customerInfoDetail({}, {
                type: setAllSettings.type,
                payload: {
                    countries: [{ id: 1, name: 'country' }]
                }
            })
        ).toEqual({
            allSettings: {
                countries: [{ id: 1, name: 'country' }]
            }
        });
    });

    it('should handle setEditCustomerInfoDetail', () => {
        expect(
            customerInfoDetail({}, {
                type: setEditCustomerInfoDetail.type,
                payload: { isSuccessful: true, message: 'Successfully!' }
            })
        ).toEqual({
            editCustomerInfoDetailResult: { isSuccessful: true, message: 'Successfully!' }
        });
    });

    it('should handle setEditCustomerInfoDetailDialog', () => {
        expect(
            customerInfoDetail({}, {
                type: setEditCustomerInfoDetailDialog.type,
                payload: { show: false }
            })
        ).toEqual({
            editCustomerInfoDetailDialog: { show: false }
        });
    });
});