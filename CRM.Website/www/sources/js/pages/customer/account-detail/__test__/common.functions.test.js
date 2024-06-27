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
 
    describe('ValidateHeadlineStaffAndAuthority', () => {
        it('return expected errors when values are invalid', () => {            
            // Arrange
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
            const expected = {
                communication: LangHelper.getResource('CommunicationRequired'),
                picName: LangHelper.getResource('NameRequired'),
                role: LangHelper.getResource('RoleRequired'),
                authority: LangHelper.getResource('AuthorityRequired')
            };
    
            // Act
            const {errors} = commonFunction.ValidateHeadlineStaffAndAuthority(headlineStaffsAndAuthorityInfo, 0);
    
            // Assert
            expect(errors).toEqual(expected);
        });
    });

    describe('ValidateHeadlineCommunicationInfo', () => {
        it('return expected errors when values are invalid', () => {            
            // Arrange
            const headlineCommunicationInfo = [{
                country: 0,
                isNameError: false,
                isRoleError: false,
                language: "12005",
                picCommunicationTools: [],
                picId: 200,
                picName: null,
                picType: 51000,
                role: null,
                roleName: null,
                picCommunicationTools: [
                    {
                        isError: false,
                        isNew: false,
                        type: null,
                        value: ""
                    },
                    {
                        isError: false,
                        isNew: false,
                        type: 1,
                        value: "testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttestte" +
                                "testtesttesttesttesttesttesttesttestteststtesttesttesttesttesttesttesttesttesttesesttesttesttesttesttesttesttesttest" +
                                "testtesttesttesttesttesttesttesttestteststtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest" 
                    }
                ]
            }];
            const expected = {
                communication: LangHelper.getResource('CommunicationRequired'),
                picName: LangHelper.getResource('NameRequired'),
                role: LangHelper.getResource('RoleRequired'),
                maxLengthCommunicationValue: LangHelper.getResource('CommunicationExceedMaxLength')
            };
    
            // Act
            const {errors} = commonFunction.ValidateHeadlineCommunicationInfo(headlineCommunicationInfo, 0);
    
            // Assert
            expect(errors).toEqual(expected);
        });
    });

    describe('ValidateNormalCommunicationInfo', () => {
        it('return expected errors when values are invalid', () => {            
            // Arrange
            const normalCommunicationInfo = [{
                communicationID: 0,
                communicationValue: "",
                isError: false,
                isNew: false
            },
            {
                communicationID: 1,
                communicationValue: "testtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttestte" +
                "testtesttesttesttesttesttesttesttestteststtesttesttesttesttesttesttesttesttesttesesttesttesttesttesttesttesttesttest" +
                "testtesttesttesttesttesttesttesttestteststtesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttesttest" ,
                isError: false,
                isNew: false
            }];
            const expected = {
                communication: LangHelper.getResource('CommunicationRequired'),
                maxLengthCommunicationValue: LangHelper.getResource('CommunicationExceedMaxLength')
            };
    
            // Act
            const {errors} = commonFunction.ValidateNormalCommunicationInfo(normalCommunicationInfo);
    
            // Assert
            expect(errors).toEqual(expected);
        });
    });

    describe('ValidateCompanyService', () => {
        it('return expected errors when values are invalid', () => {            
            // Arrange
            const normalCommunicationInfo = [{
                headlineID: 1,
                companyServiceID: 1,
                companyServiceName: 1,
                isOffered: true,
                communicationID: 0,
                communicationName: null,
                communicationValue: null,
                isError: false,
                isSuggest: false
            }];
            const expected = {
                communication: LangHelper.getResource('CommunicationRequired')
            };
    
            // Act
            const {errors} = commonFunction.ValidateCompanyService(normalCommunicationInfo);
    
            // Assert
            expect(errors).toEqual(expected);
        });
    });

    describe('GetLengthCommunicationValue', () => {
        it('return expected length value communication', () => {            
            // Arrange
            const communicationTools = [{
                type: 1,
                value: "test"
            },
            {
                type: 1,
                value: "test2"
            }];
            const comPic = {
                type: 1,
                value: "test"
            }
            const expected = 11;
    
            // Act
            const result = commonFunction.GetLengthCommunicationValue(comPic ,0, communicationTools);
    
            // Assert
            expect(result).toEqual(expected);
        });
    });

    describe('GetLengthNormalCommunicationValue', () => {
        it('return expected length value communication', () => {            
            // Arrange
            const communicationTools = [{
                communicationID: 1,
                communicationValue: "test"
            },
            {
                communicationID: 1,
                communicationValue: "test2"
            }];
            const comPic = {
                communicationID: 1,
                communicationValue: "test"
            }
            const expected = 11;
    
            // Act
            const result = commonFunction.GetLengthNormalCommunicationValue(comPic ,0, communicationTools);
    
            // Assert
            expect(result).toEqual(expected);
        });
    });

    describe('ParamsSubmit', () => {
        it('return expected params submit info when save customer info', () => {
            // Arrange
            const customerInfo = {
                firstName: '',
                lastName: '',
                maxDate: '',
                passport: '',
                refCode2: '',
                languages: [],
                siteId: 0,
                refCode1: '',
                licenseeType: undefined,
                isVip: false,
                phoneCountryCode: '',
                phoneAreaCode: '',
                phone: '',
                phone2CountryCode: '',
                phone2AreaCode: '',
                phone2: '',
                phone3CountryCode: '',
                phone3AreaCode: '',
                phone3: '',
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
            const expected = {
                firstName: '',
                languageId: "",
                lastName: '',
                birthDay: '',
                passport: '',
                refCode2: '',
                siteId: 0,
                postCode: '',
                isVip: false,
                phoneCountryCode: '',
                phoneAreaCode: '',
                phone: '',
                phone2CountryCode: '',
                phone2AreaCode: '',
                phone2: '',
                phone3CountryCode: '',
                phone3AreaCode: '',
                phone3: '',
                introducedBy: '',
                faxCountryCode: '',
                faxAreaCode: '',
                pic1Name: '',
                pic1: '',
                pic2Name: '',
                pic2: '',
                pic3Name: '',
                pic3: '',
                pic4Name: '',
                pic4: '',
                skype: '',
                email: '',
                weChat: '',
                whatsApp: '',
                line: '',
                qq: '',
                yahoo: '',
                licenseeType: undefined,
                bankAccountNumber: "",
                bankCity: "",
                bankCode: "",
                bankLine1: "",
                bankLine2: "",
                bankHolderName: undefined,
                bankLine3: "",
                bankName: undefined,
                bankState: "",
                bankSwiftCode: "",
                bbm: "",
                bettingCode: "",
                birthDay: null,
                city: "",
                countryId: 0,
                customerId: 1,
                fax: "",
                ignored: undefined,
                line1: "",
                line2: "",
                line3: "",
                mobilePhone: "",
                mobilePhoneAreaCode: "",
                mobilePhoneCountryCode: "",
                msn: "",
                state: "",
                titleId: undefined,
            };
    
            // Act
            const result = commonFunction.ParamsSubmit(1,customerInfo);
    
            // Assert
            expect(result).toEqual(expected);
        });
    });

    describe('ParamsCustomerInfo', () => {
        it('return expected params customer info when create new customer', () => {
            // Arrange
            const customerInfo = {
                firstName: '',
                languageId: "",
                lastName: '',
                birthDay: '',
                passport: '',
                refCode2: '',
                siteId: 0,
                postCode: '',
                isVip: false,
                phoneCountryCode: '',
                phoneAreaCode: '',
                phone: '',
                phone2CountryCode: '',
                phone2AreaCode: '',
                phone2: '',
                phone3CountryCode: '',
                phone3AreaCode: '',
                phone3: '',
                introducedBy: '',
                faxCountryCode: '',
                faxAreaCode: '',
                pic1Name: '',
                pic1: '',
                pic2Name: '',
                pic2: '',
                pic3Name: '',
                pic3: '',
                pic4Name: '',
                pic4: '',
                skype: '',
                email: '',
                weChat: '',
                whatsApp: '',
                line: '',
                qq: '',
                yahoo: '',
                licenseeType: undefined,
                bankAccountNumber: "",
                bankCity: "",
                bankCode: "",
                bankLine1: "",
                bankLine2: "",
                bankHolderName: undefined,
                bankLine3: "",
                bankName: undefined,
                bankState: "",
                bankSwiftCode: "",
                bbm: "",
                bettingCode: "",
                birthDay: null,
                city: "",
                countryId: 0,
                customerId: 1,
                fax: "",
                ignored: undefined,
                line1: "",
                line2: "",
                line3: "",
                mobilePhone: "",
                mobilePhoneAreaCode: "",
                mobilePhoneCountryCode: "",
                msn: "",
                state: "",
                titleId: undefined,
            };

            const expected = {
                bankAddressCity: undefined,
                bankAddressCountryId: undefined,
                bankAddressLine1: undefined,
                bankAddressLine2: undefined,
                bankAddressLine3: undefined,
                bankAddressPostCode: undefined,
                bankAddressState: undefined,
                bankInfoAccNo: "",
                bankInfoHolderName: undefined,
                bankInfoName: undefined,
                bankInfoSwiftCode: "",
                birthDay: "",
                checker: undefined,
                email: "",
                faxAreaCode: "",
                faxCountryCode: "",
                faxNumber: "",
                firstName: "",
                homeAddressCity: "",
                homeAddressCountryId: 0,
                homeAddressLine1: "",
                homeAddressLine2: "",
                homeAddressLine3: "",
                homeAddressPostCode: "",
                homeAddressState: "",
                introducedBy: "",
                isIgnored: undefined,
                isVip: undefined,
                languages: undefined,
                lastName: "",
                letstalk: "",
                licenseeTypeId: undefined,
                line: "",
                mobileAreaCode: "",
                mobileCountryCode: "",
                mobilePhoneNumber: "",
                passport: "",
                phone: "",
                phone2: "",
                phone2AreaCode: "",
                phone2CountryCode: "",
                phone3: "",
                phone3AreaCode: "",
                phone3CountryCode: "",
                phoneAreaCode: "",
                phoneCountryCode: "",
                pic1Name: "",
                pic1PhoneNumber: "",
                pic2Name: "",
                pic2PhoneNumber: "",
                pic3Name: "",
                pic3PhoneNumber: "",
                pic4Name: "",
                pic4PhoneNumber: "",
                qq: "",
                refCode1: undefined,
                refCode2: "",
                siteId: 0,
                skype: "",
                telegram: "",
                titleId: undefined,
                weChat: "",
                whatsApp: "",
                zalo: ""
            };
    
            // Act
            const result = commonFunction.ParamsCustomerInfo(customerInfo);
    
            // Assert
            expect(result).toEqual(expected);
        });
    });
});