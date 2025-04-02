import React from 'react';
import LangHelper from '@jsroot/common/langHelper';
import * as commonFuncs from '../common.functions';
import * as shareScripts from '@jsroot/common/shareScripts';
import DateTimeService from '@jsroot/common/dateTimeService';

describe('common functions', () => {
    beforeAll(() => {
        LangHelper.getResource = jest.fn((key) => key);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('validate', () => {
        it('return expected errors when values are invalid', () => {
            // Arrange
            const values = {
                communication: [],
                category: '',
                subCategory: '',
                languageId: 0,
                subject: '',
                identityInformation: ''
            };

            const state = {
                content: {
                    solution: '1',
                    description: '1'
                }
            }

            const expected = {
                identityInformation: LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Identity')),
                communication: LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Communication')),
                category: LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Category')),
                subCategory: LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('SubCategory')),
                languageId: LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Language')),
                subject: LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Subject'))
            };
            const props = {
                settings: {
                    mainCategories: [],
                    subCategories: []
                },
                customerDetail: null
            };

            // Act
            const errors = commonFuncs.validateFormik(values, props.customerDetail, props.settings, state);

            // Assert
            expect(errors).toEqual(expected);
        });


        it('return expected errors when invalid category params', () => {
            // Arrange
            const values = {
                identityInformation: '1',
                communication: [1],
                category: '1, 2',
                subCategory: '1',
                languageId: 1,
                subject: '1'
            };

            const state = {
                content: {
                    solution: '1',
                    description: '1'
                }
            }

            const expected = {
                category: LangHelper.formatString(LangHelper.getResource('InvalidCategoryField'), 'settingName')
            };
            const props = {
                settings: {
                    mainCategories: [{ mainCategoryID: 1, name: 'settingName' }, { mainCategoryID: 2, name: 'settingName' }],
                    subCategories: [{ subCategoryId: 1, mainCategoryID: 1 }]
                },
                customerDetail: null
            };

            // Act
            const errors = commonFuncs.validateFormik(values, props.customerDetail, props.settings, state);
            shareScripts.getInvalidCategoryParams = jest.fn(() => [[{ mainCategoryID: 1, settingName: 'settingName' }]]);

            // Assert
            expect(errors).toEqual(expected);
        });
    });

    describe('init values', () => {
        const props = {
            settings: {
                titles: [{ id: 1 }],
                licenseeTypes: [{ id: 1 }],
                statuses: [{ statusId: 1 }],
                responses: [{ id: 1 }],
                languages: [{ languageId: 1 }]
            },
            confirmCreateGuestDialog: { show: false }
        };
        const { statuses, languages, responses, licenseeTypes } = props.settings;
        window.currentClientTime = '2021-01-01';
        const feedbackDate = new Date(DateTimeService.toShortDateTimeFormat(new Date(window.currentClientTime)));
        const resolutionTime = new Date(DateTimeService.toShortDateTimeFormat(new Date(window.currentClientTime)));
        const birthday = new Date(DateTimeService.toShortDateTimeFormat(new Date(window.currentClientTime)));
        resolutionTime.setMinutes(resolutionTime.getMinutes() + 1);
        const values = {
            feedbackDate: feedbackDate,
            resolutionTime: resolutionTime,
            communication: '',
            category: '',
            subCategory: '',
            statusId: statuses[0].statusId,
            responseId: responses[0].id,
            solution: '',
            product: '',
            subProduct: '',
            betType: '',
            languageId: languages[0].languageId,
            noOfInquiries: '',
            customerNameInput: '',
            description: '',
            subject: '',
            ticketRefInput: '',
            rating: 0
        };

        it('initialValues correctly', () => {
            // Arrange
            const expected = { ...values };
            const customer = {
                guestCommunicationInfos: null
            };
            expected.identityInformation = '';
            expected.guestCommunicationInfos = null;
            DateTimeService.toShortDateTimeFormat = jest.fn(() => '2021-01-01');
            // Act
            const initialValues = commonFuncs.initValues(props.settings, customer);
            // Assert
            expect(initialValues).toEqual(expected);
        });

        it('initValuesAddCustomerFb correctly', () => {
            // Arrange
            const customerInfo = {
                headlineStaffInfoCommunications : [],
                otherAccountCommunicationInfos : []
            };

            const expected = { ...values };
            expected.country = undefined;
            expected.languageId = 1200;
            expected.refCodes = '';
            expected.secretCode = '';
            expected.role = '';
            expected.siteName = '';
            expected.solution = ''
            expected.headlineStaffInfoCommunications = [];
            expected.otherAccountCommunicationInfos = [];
            const customerDetail = { ...values };
            customerDetail.yahoo = '';
            customerDetail.pic1 = '';
            customerDetail.pic2 = '';
            customerDetail.pic3 = '';
            customerDetail.pic4 = '';
            customerDetail.msn = '';
            customerDetail.titleId = 1;
            customerDetail.whatsApp = '';
            customerDetail.bbm = '';
            customerDetail.passport = '';
            customerDetail.bettingCode = ['', ''];
            customerDetail.roleId = '';
            customerDetail.siteId = '';
            customerDetail.siteSetting = { name: '' };
            customerDetail.phoneInfo = [{ countryCode: '', phoneNumber: '', areaCode: '' },
            { countryCode: '', phoneNumber: '', areaCode: '' }, { countryCode: '', phoneNumber: '', areaCode: '' }];
            customerDetail.mobile = { countryCode: '', phoneNumber: '', areaCode: '' };
            customerDetail.faxInfo = { countryCode: '', phoneNumber: '', areaCode: '' };
            customerDetail.country = { id: '' };
            customerDetail.siteSetting = { name: '' };
            customerDetail.languages = [1200];
            customerDetail.faxInfo = { countryCode: '', faxNumber: '', areaCode: '' };            
            // Act
            const initialValues = commonFuncs.initValuesAddCustomerFb(props.settings, customerDetail, customerInfo);

            // Assert
            expect(initialValues).toEqual(expected);
        });

        it('initCustomerInfo correctly', () => {
            // Arrange
            const expected = {
                title: 1,
                firstName: '',
                lastName: '',
                birthday: birthday,
                passportNo: '',
                licenseeType: licenseeTypes[0].id,
                countryCode: '',
                phoneNumber: '',
                areaCode: '',
                countryCode2: '',
                phoneNumber2: '',
                areaCode2: '',
                countryCode3: '',
                phoneNumber3: '',
                areaCode3: '',
                mobileCountryCode: '',
                mobileAreaCode: '',
                mobilePhoneNumber: '',
                faxCountryCode: '',
                faxAreaCode: '',
                faxNumber: '',
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
                whatApp: '',
                line: '',
                letstalk: '',
                qq: '',
                refCodes: "",
                secretCode: "",
                zalo: '',
                isOverwriteInfo: false,
                siteId: '',
                siteName: '',
                headlineStaffInfoCommunications: [],
                headlineStaffInfoLanguages: undefined,
                headlineStaffInfoPics: undefined,
                otherAccountCommunicationInfos: [],
                rating: 0
            };

            const customerDetail = { ...values };
            customerDetail.birthday = birthday;
            customerDetail.pic1Name = '',
                customerDetail.pic2Name = '',
                customerDetail.pic3Name = '',
                customerDetail.pic4Name = '',
                customerDetail.qq = '',
                customerDetail.siteId = '',
                customerDetail.siteName = '',
                customerDetail.skype = '',
                customerDetail.titleId = '',
                customerDetail.weChat = '',
                customerDetail.yahoo = '';
            customerDetail.email = '',
                customerDetail.firstName = '',
                customerDetail.isOverwriteInfo = false,
                customerDetail.lastName = '',
                customerDetail.licenseeType = 1,
                customerDetail.line = '',
                customerDetail.pic1 = '';
            customerDetail.pic2 = '';
            customerDetail.pic3 = '';
            customerDetail.pic4 = '';
            customerDetail.msn = '';
            customerDetail.titleId = 1;
            customerDetail.whatsApp = '';
            customerDetail.bbm = '';
            customerDetail.passport = '';
            customerDetail.bettingCode = ['', ''];
            customerDetail.roleId = '';
            customerDetail.siteId = '';
            customerDetail.siteSetting = { name: '' };
            customerDetail.phoneInfo = [{ countryCode: '', phoneNumber: '', areaCode: '' },
            { countryCode: '', phoneNumber: '', areaCode: '' }, { countryCode: '', phoneNumber: '', areaCode: '' }];
            customerDetail.mobile = { countryCode: '', phoneNumber: '', areaCode: '' };
            customerDetail.faxInfo = { countryCode: '', phoneNumber: '', areaCode: '' };
            customerDetail.country = { id: '' };
            customerDetail.siteSetting = { name: '' };
            customerDetail.languages = [1200];
            customerDetail.faxInfo = { countryCode: '', faxNumber: '', areaCode: '' };

            // Act
            const initialValues = commonFuncs.initCustomerInfo(customerDetail);

            // Assert
            expect(initialValues).toEqual(expected);
        });
    });

    it('getParams return exact params when values not null', () => {
        // Arrange
        const values = {
            product: '1,2',
            subProduct: '1,2,',
            betType: '1,2,',
            category: '1,2',
            subCategory: '1,2',
            extension: 1,
            country: 1,
            noOfInquiries: 1
        };
        const listOfCustomerValid = [];

        const settings = {
            subCategories: [{ subCategoryId: 1, mainCategoryID: 1 }],
            extensionNA: { id: 1 }
        };
        const state = {
            listOfCustomerValid: listOfCustomerValid,
            content: {
                solution: '',
                description: '',
                autoGenerated: ''
            },
            customerInfo: { birthday: '2021-01-01' }
        };

        const expectedProductParams = { "extensionNA": { "id": 1 }, "subCategories": [{ "mainCategoryID": 1, "subCategoryId": 1 }] };

        shareScripts.getProductParams = jest.fn();
        shareScripts.getCategoryParams = jest.fn(() => 'getCategoryParams');
        // Act
        const params = commonFuncs.getParams(values, null, settings, state);

        // Assert
        expect(shareScripts.getProductParams).toHaveBeenCalledWith(["1", "2"], ["1", "2", ""], ["1", "2", ""], expectedProductParams);
        expect(params.Birthday).toEqual('2021-01-01');
        expect(params.StationId).toEqual(1);
        expect(params.CountryId).toEqual(1);
        expect(params.NoInquiries).toEqual(1);
        expect(params.RelatedCustID).toEqual(null);
    });

    describe('validateFormik', () => {
        let values;
        let customerDetail;
        let settings;
        let state;

        beforeEach(() => {
            values = { communication: [], category: '', subCategory: '' };
            customerDetail = null;
            settings = {};
            state = { content: { description: '' } };
        });

        it('should return errors for missing identity information', () => {
            values.identityInformation = '';
            const errors = commonFuncs.validateFormik(values, customerDetail, settings, state);
            expect(errors.identityInformation).toBeDefined();
        });

        it('should return errors for invalid category combination', () => {
            values.category = 'InvalidCategory';
            values.subCategory = 'InvalidSubCategory';
            const errors = commonFuncs.validateFormik(values, customerDetail, settings, state);
            expect(errors.category).toBeDefined();
        });

        it('should return errors for guest communication exceeding max length', () => {
            values.guestCommunicationInfos = [
                {
                    communicationID: '1',
                    communicationValue: 'Too long text exceeding 200 characters Too long text exceeding 200 ch' +
                        'aracters Too long text exceeding 200 characters Too long text exceeding 200 characters Too lo' +
                        'ng text exceeding 200 characters Too long text exceeding 200 characters Too long text exceeding 200 characters '
                }];
            const errors = commonFuncs.validateFormik(values, customerDetail, settings, state);
            expect(errors.guestCommunicationInfos).toBeDefined();
        });
    });

    describe('GetParamsNewUser', () => {
        it('should return the correct parameter object', () => {
            const custId = '123456';
            const values = {
                firstName: 'John',
                lastName: 'Doe',
                titleId: 'Mr',
                birthDay: new Date('1990-01-01'),
                languages: [1, 2, 3],
            };

            const result = commonFuncs.GetParamsNewUser(custId, values);

            expect(result).toEqual({
                customerId: '123456',
                firstName: 'John',
                lastName: 'Doe',
                titleId: 'Mr',
                birthDay: '01/01/1990',
                languageId: '1,2,3',
                bankAccountNumber: undefined,
                bankCity: undefined,
                bankCode: undefined,
                bankCountryId: undefined,
                bankHolderName: undefined,
                bankLine1: undefined,
                bankLine2: undefined,
                bankLine3: undefined,
                bankName: undefined,
                bankState: undefined,
                bankSwiftCode: undefined,
                bbm: undefined,
                bettingCode: undefined,
                birthDay: "Jan 01, 1990",
                city: undefined,
                countryId: undefined,
                customerId: "123456",
                email: undefined,
                fax: undefined,
                faxAreaCode: undefined,
                faxCountryCode: undefined,
                firstName: "John",
                ignored: undefined,
                introducedBy: undefined,
                isVip: undefined,
                languageId: "1,2,3",
                lastName: "Doe",
                licenseeType: undefined,
                line: undefined,
                line1: undefined,
                line2: undefined,
                line3: undefined,
                mobilePhone: undefined,
                mobilePhoneAreaCode: undefined,
                mobilePhoneCountryCode: undefined,
                msn: undefined,
                passport: undefined,
                phone: undefined,
                phone2: undefined,
                phone2AreaCode: undefined,
                phone2CountryCode: undefined,
                phone3: undefined,
                phone3AreaCode: undefined,
                phone3CountryCode: undefined,
                phoneAreaCode: undefined,
                phoneCountryCode: undefined,
                pic1: undefined,
                pic1Name: undefined,
                pic2: undefined,
                pic2Name: undefined,
                pic3: undefined,
                pic3Name: undefined,
                pic4: undefined,
                pic4Name: undefined,
                postCode: undefined,
                qq: undefined,
                refCode2: undefined,
                siteId: undefined,
                skype: undefined,
                state: undefined,
                titleId: "Mr",
                weChat: undefined,
                whatsApp: undefined,
                yahoo: undefined
            });
        });
    });

    describe('getParams', () => {
        it('should return the correct parameter object', () => {
            const values = {
                product: '',
                subProduct: '',
                betType: '',
                category: '',
                subCategory: ''
            };

            const customerDetail = {
            };

            const settings = {
                subCategories: '',
                extensionNA: {
                    id: 1
                }
            };

            const state = {
                customerInfo: {
                    headlineStaffInfoCommunications: [
                        {
                            picID : 1,
                            picCommunicationId: 1,
                            picCommunicationValue: 'test'
                        }
                    ],
                    otherAccountCommunicationInfos: [
                        {
                            picID : 1,
                            picCommunicationId: 1,
                            picCommunicationValue: 'test'
                        }
                    ],
                    guestCommunicationInfos: [
                        {
                            communicationID: 1,
                            communicationValue: 'test'
                        },
                        {
                            communicationID: 1,
                            communicationValue: 'test2'
                        }
                    ]
                },
                customerDetail: {
                    headlineStaffInfoPics: [
                        {
                            picID : 1,
                            picName: 'test',
                            picRoleName: 'test',
                        }
                    ]
                },
                listOfCustomerValid: [],
                content: {
                }
            };

            DateTimeService.toShortDateTimeFormat = jest.fn();
            DateTimeService.toLongDateTimeFormat = jest.fn();
            const result = commonFuncs.getParams(values, customerDetail, settings, state);
            expect(result).toEqual({
                AutoField: undefined,
                Birthday: undefined,
                Categories: "getCategoryParams",
                CommunicationID: undefined,
                CountryId: 0,
                CustId: undefined,
                Description: undefined,
                FeedbackDate: undefined,
                FirstName: undefined,
                GuestCommunicationInfos: [
                    {
                        communicationID: 1,
                        communicationValue: "test, test2",
                    }
                ],
                HeadlineStaffInfoCommunications: [
                    {
                        communicationID: 1,
                        communicationValue: "test",
                        isHeadline: undefined,
                        picInfo: "",
                    }
                ],
                IsHeadline: undefined,
                IsVIP: undefined,
                LanguageId: NaN,
                LicenseeType: NaN,
                NoInquiries: undefined,
                OtherAccountCommunicationInfos: [
                    {
                        communicationID: undefined,
                        communicationValue: undefined,
                        isHeadline: undefined,
                        picInfo: ""
                    }
                ],
                Passport: undefined,
                Products: undefined,
                RefCode: undefined,
                RelatedCustID: null,
                ResolutionDate: undefined,
                ResponseId: NaN,
                RoleId: 7004,
                SecretCode: undefined,
                SiteId: NaN,
                Solution: undefined,
                StationId: 1,
                StatusId: NaN,
                Subject: undefined,
                TitleId: NaN,
                UserName: undefined,
                lastName: undefined,
                IsOverwrite: undefined,
                rating: NaN
            });
        });
    });
});