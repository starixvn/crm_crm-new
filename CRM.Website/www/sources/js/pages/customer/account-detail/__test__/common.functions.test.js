import DateTimeService from '@jsroot/common/dateTimeService';
import LangHelper from '@jsroot/common/langHelper';
import * as commonFunction from '../common.functions';

describe('commonFunctions', () => {
    beforeAll(() => {
        jest.useFakeTimers();
        LangHelper.getResource = jest.fn((key) => key);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });
 
    const customerInfo = {
        firstName: '',
        lastName: '',
        maxDate: '',
        birthDay: '',
        passport: '',
        refCode2: '',
        languages: [],
        siteId: 0,
        refCode1: '',
        licenseeTypeId: 0,
        isVip: false,
        isIgnored: false,
        phoneCountryCode: '',
        phoneAreaCode: '',
        phone: '',
        phone2CountryCode: '',
        phone2AreaCode: '',
        phone2: '',
        phone3CountryCode: '',
        phone3AreaCode: '',
        phone3: '',
        checker: '',
        introducedBy: '',
        faxCountryCode: '',
        faxAreaCode: '',
        faxNumber: '',
        mobileCountryCode: '',
        mobileAreaCode: '',
        mobilePhoneNumber: '',
        pic1Name: '',
        pic1PhoneNumber: '',
        pic2Name: '',
        pic2PhoneNumber: '',
        pic3Name: '',
        pic3PhoneNumber: '',
        pic4Name: '',
        pic4PhoneNumber: '',
        skype: '',
        email: '',
        telegram: '',
        weChat: '',
        whatsApp: '',
        line: '',
        letstalk: '',
        qq: '',
        zalo: '',
        homeAddressLine1: '',
        homeAddressLine2: '',
        homeAddressLine3: '',
        homeAddressCity: '',
        homeAddressCountryId: 0,
        homeAddressState: '',
        homeAddressPostCode: '',
        bankInfoHolderName: '',
        bankInfoName: '',
        bankInfoAccNo: '',
        bankInfoSwiftCode: '',
        bankAddressLine1: '',
        bankAddressLine2: '',
        bankAddressLine3: '',
        bankAddressCity: '',
        bankAddressCountryId: 0,
        bankAddressState: '',
        bankAddressPostCode: ''
    };


    describe('ValidateHeadlineStaffAndAuthority', () => {
        it('return expected errors when values are invalid', () => {
            const headlineStaffsAndAuthorityInfo = [{
                isEdit: false,
                isErrorPicName: false,
                isErrorPicRoleID: false,
                isSyncFromPicTable: false,
                picID: 1644,
                picName: "",
                picRoleID: null,
                picRoleName: "",
                communicationTools: [
                    {
                        authority: "",
                        authorityID: null,
                        isErrorPicAuthorityID: false,
                        isErrorPicCommunication: false,
                        picCommunicationID: null,
                        picCommunicationName: null,
                        picCommunicationValue: null,
                        remark: "",
                        rowID: 273
                    }
                ]
            }];
            // Arrange
            const expected = {
                communication: LangHelper.getResource('CommunicationRequired'),
                picName: LangHelper.getResource('NameRequired'),
                role: LangHelper.getResource('RoleRequired'),
                authority: LangHelper.getResource('AuthorityRequired')
            };
    
            // Act
            const {errors} = commonFunction.ValidateHeadlineStaffAndAuthority(headlineStaffsAndAuthorityInfo, 0);
    
            // Assert
            expected(errors).toEqual(expected);
        });
    });

});