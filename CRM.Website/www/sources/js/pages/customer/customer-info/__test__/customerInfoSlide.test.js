import customerInfo, {
    setGridParams,
    setCustomerInfo,
    setSettings,
    setEditCustomerInfo,
    setEditCustomerInfoPopup,
    setEmptyCustomerInfoPopup,
    setSearchUserName
} from '../customerInfoSlide';


describe('customerInfo reducer', () => {
    it('show handle initial state', () => {
        expect(customerInfo(undefined, {})).toEqual({
            gridData: null,
            gridParams: {
                UserName: null,
                IsGuest: false,
            },
            settings: {
                sites: [],
                countries: [],
                languages: []
            },
            editCustomerInfoResult: '',
            editCustomerInfoPopup: { show : false },
            emptyCustomerInfoPopup: { show: false }
        });
    });

    it('should handle setGridParams', () => {
        expect(
            customerInfo({}, {
                type: setGridParams.type,
                payload: {
                    UserName: null,
                    IsGuest: false
                }
            })
        ).toEqual({
            gridParams: {
                UserName: null,
                IsGuest: false,
            }
        });
    });

    it('should handle setCustomerInfo', () => {
       expect(
            customerInfo({} , {
                type: setCustomerInfo.type,
                payload: {data: {}}
            })
       ).toEqual({
            gridData: {data: {}}
       });
    });

    it('should handle setSettings', () => {
        expect(
            customerInfo({}, {
                type: setSettings.type,
                payload: {
                    sites: [{id: 1, name: 'site'}],
                    countries: [{id: 1, name: 'country'}],
                    languages: [{id: 1, name: 'language'}]
                }
            })
        ).toEqual({
            settings: {
                sites: [{id: 1, name: 'site'}],
                    countries: [{id: 1, name: 'country'}],
                    languages: [{id: 1, name: 'language'}]
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
});