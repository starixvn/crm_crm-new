import customerInfoDetail, {
    resetState,
    setCustomerById,
    setAllSettings,
    setEditCustomerInfoDetail
} from '../customerInfoDetailSlice';

describe('customerInfoDetail reducer', () => {
    it('show handle reset state', () => {
        expect(customerInfoDetail({}, {
            type: resetState.type,
            payload: { data: {} }
        })).toEqual({
            customerInfo: null,
            allSettings: null,
            editCustomerInfoDetailResult: ''
        });
    });

    it('show handle initial state', () => {
        expect(customerInfoDetail(undefined, {})).toEqual({
            customerInfo: null,
            allSettings: null,
            editCustomerInfoDetailResult: ''
        });
    });

    it('should handle setCustomerById', () => {
        expect(
            customerInfoDetail({}, {
                type: setCustomerById.type,
                payload: { data: {} }
            })
        ).toEqual({
            customerInfo: { data: {} }
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
});