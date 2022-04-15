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
                            BBM: "---",
                            Checker: null,
                            CountryName: null,
                            Currency: "HK$",
                            Email: "---",
                            FirstName: "---",
                            Headline: null,
                            IntroducedBy: null,
                            Language_name: "English",
                            LastName: "---",
                            Line: "---",
                            MSN: "---",
                            MobilePhone: "-----",
                            PIC1: "-------",
                            PIC2: "-------",
                            PIC3: "-------",
                            PIC4: "-------",
                            Phone: "-----",
                            Phone2: "-----",
                            Phone3: "-----",
                            Position: "Member",
                            QQ: "---",
                            Site: "BEST-ODDS",
                            Skype: "---",
                            Status: "Closed",
                            Username: "0000HK",
                            IsVIP: true,
                            WeChat: "---",
                            WhatsApp: "---",
                            Yahoo: null
                        }
                    ],
                    totalCustomer: 1                
                }
            })
        ).toEqual({
            gridData: {
                customerList: [
                    {
                        BBM: "---",
                        Checker: null,
                        CountryName: null,
                        Currency: "HK$",
                        Email: "---",
                        FirstName: "---",
                        Headline: null,
                        IntroducedBy: null,
                        Language_name: "English",
                        LastName: "---",
                        Line: "---",
                        MSN: "---",
                        MobilePhone: "-----",
                        PIC1: "-------",
                        PIC2: "-------",
                        PIC3: "-------",
                        PIC4: "-------",
                        Phone: "-----",
                        Phone2: "-----",
                        Phone3: "-----",
                        Position: "Member",
                        QQ: "---",
                        Site: "BEST-ODDS",
                        Skype: "---",
                        Status: "Closed",
                        Username: "0000HK",
                        IsVIP: true,
                        WeChat: "---",
                        WhatsApp: "---",
                        Yahoo: null
                    }
                ],
                totalCustomer: 1            
            }
        });
    });
});
