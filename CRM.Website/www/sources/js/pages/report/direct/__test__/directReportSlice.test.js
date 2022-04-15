import directReport, {
    setGridParams,
    setGridData
} from '../directCustomerSlice';

describe('DirectReport reducer', () => {
    it('should handle initial state', () => {
        expect(directReport(undefined, {})).toEqual({
            gridParams: {
                headline: null,
                username: null,
                excludeIgnoredAcc: true,
                pageIndex: 1,
                pageSize: 50
            },
            gridData: null
        });
    });

    it('should handle setGridParams', () => {
        expect(
            directReport({}, {
                type: setGridParams.type,
                payload: {
                    headline: null,
                    username: null,
                    excludeIgnoredAcc: true,
                    pageIndex: 1,
                    pageSize: 50
                }
            })
        ).toEqual({
            gridParams: {
                headline: null,
                username: null,
                excludeIgnoredAcc: true,
                pageIndex: 1,
                pageSize: 50
            }
        });
    });

    it('should handle setGridData', () => {
        expect(
            directReport({}, {
                type: setGridData.type,
                payload: {
                    customerList: [
                        {
                            bBM: "---",
                            checker: null,
                            countryName: null,
                            currency: "HK$",
                            email: "---",
                            FirstName: "---",
                            headline: null,
                            introducedBy: null,
                            language_name: "English",
                            lastName: "---",
                            line: "---",
                            mSN: "---",
                            mobilePhone: "-----",
                            pIC1: "-------",
                            pIC2: "-------",
                            pIC3: "-------",
                            pIC4: "-------",
                            phone: "-----",
                            phone2: "-----",
                            phone3: "-----",
                            position: "Member",
                            qQ: "---",
                            site: "BEST-ODDS",
                            skype: "---",
                            status: "Closed",
                            username: "0000HK",
                            isVIP: true,
                            weChat: "---",
                            whatsApp: "---",
                            yahoo: null
                        }
                    ],
                    totalCustomer: 1
                }
            })
        ).toEqual({
            gridData: {
                customerList: [
                    {
                        bBM: "---",
                        checker: null,
                        countryName: null,
                        currency: "HK$",
                        email: "---",
                        FirstName: "---",
                        headline: null,
                        introducedBy: null,
                        language_name: "English",
                        lastName: "---",
                        line: "---",
                        mSN: "---",
                        mobilePhone: "-----",
                        pIC1: "-------",
                        pIC2: "-------",
                        pIC3: "-------",
                        pIC4: "-------",
                        phone: "-----",
                        phone2: "-----",
                        phone3: "-----",
                        position: "Member",
                        qQ: "---",
                        site: "BEST-ODDS",
                        skype: "---",
                        status: "Closed",
                        username: "0000HK",
                        isVIP: true,
                        weChat: "---",
                        whatsApp: "---",
                        yahoo: null
                    }
                ],
                totalCustomer: 1
            }
        });
    });
});
