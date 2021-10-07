import customerInfo, {
    setGridParams,
    setCustomerInfo,
    setSettings,
    setEditCustomerInfo,
    setEditCustomerInfoPopup,
    setEmptyCustomerInfoPopup,
    setCustomerSuggestions
} from '../customerInfoSlide';

describe('customerInfo reducer', () => {
    it('show handle initial state', () => {
        expect(customerInfo(undefined, {})).toEqual({
            customerInfo: null,
            customerSuggestions: [],
            gridParams: {
                username: null,
                isGuest: false
            },
            settings: {
                sites: [],
                countries: [],
                languages: []
            },
            editCustomerInfoResult: null,
            editCustomerInfoPopup: { show: false },
            emptyCustomerInfoPopup: { show: false }
        });
    });

    it('should handle setGridParams', () => {
        expect(
            customerInfo({}, {
                type: setGridParams.type,
                payload: {
                    username: null,
                    isGuest: false
                }
            })
        ).toEqual({
            gridParams: {
                username: null,
                isGuest: false
            }
        });
    });

    it('should handle setCustomerInfo', () => {
        expect(
            customerInfo({}, {
                type: setCustomerInfo.type,
                payload: { custId: 1 }
            })
        ).toEqual({
            customerInfo: { custId: 1 }
        });
    });

    it('should handle setSettings', () => {
        expect(
            customerInfo({}, {
                type: setSettings.type,
                payload: {
                    sites: [{ id: 1, name: 'site' }],
                    countries: [{ id: 1, name: 'country' }],
                    languages: [{ id: 1, name: 'language' }]
                }
            })
        ).toEqual({
            settings: {
                sites: [{ id: 1, name: 'site' }],
                countries: [{ id: 1, name: 'country' }],
                languages: [{ id: 1, name: 'language' }]
            }
        });
    });

    it('should handle setEditCustomerInfo', () => {
        expect(
            customerInfo({}, {
                type: setEditCustomerInfo.type,
                payload: { isSuccessful: false, message: '' }
            })
        ).toEqual({
            editCustomerInfoResult: { isSuccessful: false, message: '' }
        });
    });

    it('should handle setEditCustomerInfoPopup', () => {
        expect(
            customerInfo({}, {
                type: setEditCustomerInfoPopup.type,
                payload: { show: false }
            })
        ).toEqual({
            editCustomerInfoPopup: { show: false }
        });
    });

    it('should handle setEmptyCustomerInfoPopup', () => {
        expect(
            customerInfo({}, {
                type: setEmptyCustomerInfoPopup.type,
                payload: { show: false }
            })
        ).toEqual({
            emptyCustomerInfoPopup: { show: false }
        });
    });

    
    it('should handle setCustomerSuggestions', () => {
        expect(
            customerInfo({}, {
                type: setCustomerSuggestions.type,
                payload: { }
            })
        ).toEqual({
            customerSuggestions: { }
        });
    });
});