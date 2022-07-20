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
            const content ={
                solution: '',
                description: ''
            };
            const expected = {
                identityInformation: LangHelper.formatString(LangHelper.getResource('FieldRequired'),LangHelper.getResource('Identity')),
                communication: LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Communication')),
                category: LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Category')),
                subCategory: LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('SubCategory')),
                languageId: LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Language')),
                subject: LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Subject')),
                description: LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Description')),
                solution: LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Solution'))
            };
            const props = {
                settings: {
                    mainCategories: [],
                    subCategories: []
                },
                customerDetail: null
            };

            // Act
            const errors = commonFuncs.validateFormik(values, props.customerDetail, props.settings, content);

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
            const content ={
                solution: '1',
                description: '1'
            };
            const expected = {
                category: LangHelper.formatString(LangHelper.getResource('InvalidCategoryField'), 'settingName')
            };
            const props = {
                settings: {
                    mainCategories: [{mainCategoryID: 1, name: 'settingName'}, {mainCategoryID: 2, name: 'settingName'}],
                    subCategories: [{subCategoryId: 1, mainCategoryID: 1}]
                },
                customerDetail: null
            };

            // Act
            const errors = commonFuncs.validateFormik(values, props.customerDetail, props.settings, content);
            shareScripts.getInvalidCategoryParams = jest.fn(() => [[{mainCategoryID: 1, settingName: 'settingName'}]]);

            // Assert
            expect(errors).toEqual(expected);
        });
    });

    describe('init values', () => {
        const props = {
            settings: {
                titles: [{id: 1}],
                licenseeTypes: [{id: 1}],
                statuses: [{statusId: 1}],
                responses: [{id: 1}],
                languages: [{languageId: 1}]
            },
            confirmCreateGuestDialog: {show: false}
        };
        const {statuses, languages, responses, licenseeTypes} = props.settings;
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
            statusId:statuses[0].statusId,
            responseId: responses[0].id,
            product: '',
            subProduct: '',
            betType: '',
            languageId: languages[0].languageId,
            noOfInquiries: '',
            customerNameInput: '',
            subject: '',
            ticketRefInput: ''
        };

        it('initialValues correctly', () => {
            // Arrange
            const expected = {...values};
            expected.identityInformation = '';
            // Act
            const initialValues = commonFuncs.initValues(props.settings);
            // Assert
            expect(initialValues).toEqual(expected);
        });

        it('initValuesAddCustomerFb correctly', () => {
            // Arrange
            const expected = {...values};
            expected.country = '';
            expected.languageId = 1200;
            expected.refCodes = '';
            expected.secretCode = '';
            expected.role = '';
            expected.siteName = '';
            const customerDetail = {...values};
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
            customerDetail.siteSetting = {name: ''};
            customerDetail.phoneInfo = [{countryCode: '', phoneNumber: '', areaCode: ''},
                                    {countryCode: '', phoneNumber: '', areaCode: ''}, {countryCode: '', phoneNumber: '', areaCode: ''}];
            customerDetail.mobile = {countryCode: '', phoneNumber: '', areaCode: ''};
            customerDetail.faxInfo = {countryCode: '', phoneNumber: '', areaCode: ''};
            customerDetail.country = {id: ''};
            customerDetail.siteSetting = {name: ''};
            customerDetail.languages = [1200];
            customerDetail.faxInfo = {countryCode: '', faxNumber: '', areaCode: ''};
            // Act
            const initialValues = commonFuncs.initValuesAddCustomerFb(props.settings, customerDetail);
    
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
                zalo: '',
                isOverwriteInfo: false,
                siteId: '',
                siteName: ''
            };

            const customerDetail = {...values};
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
            customerDetail.siteSetting = {name: ''};
            customerDetail.phoneInfo = [{countryCode: '', phoneNumber: '', areaCode: ''},
                                    {countryCode: '', phoneNumber: '', areaCode: ''}, {countryCode: '', phoneNumber: '', areaCode: ''}];
            customerDetail.mobile = {countryCode: '', phoneNumber: '', areaCode: ''};
            customerDetail.faxInfo = {countryCode: '', phoneNumber: '', areaCode: ''};
            customerDetail.country = {id: ''};
            customerDetail.siteSetting = {name: ''};
            customerDetail.languages = [1200];
            customerDetail.faxInfo = {countryCode: '', faxNumber: '', areaCode: ''};
            
            // Act
            const initialValues = commonFuncs.initCustomerInfo(customerDetail);
    
            // Assert
            expect(initialValues).toEqual(expected);
        });
    });  

    it('getParams return exact params', () => {
        // Arrange
        const values = {
            birthday: '',
            identityInformation: '1',
            product: [],
            subProduct: [],
            betType: [],
            category: '1,2',
            subCategory:'1,2',
            noOfInquiries: ''
        };
        const listOfCustomerValid = [
            {custId: '1'},
            {custId: '2'}
        ];
        
        const settings = {
            subCategories: [{subCategoryId: 1, mainCategoryID: 1}],
            extensionNA: {id: 1}
        };

        const state = {
            listOfCustomerValid: listOfCustomerValid,
            content: {
                solution: '',
                description: '',
                autoGenerated: ''
            },
            customerInfo: {
                birthday: ''
            }
        };

        shareScripts.getProductParams = jest.fn(()=>'getProductParams');
        shareScripts.getCategoryParams = jest.fn(()=>'getCategoryParams');
        // Act
        const params = commonFuncs.getParams(values, null, settings, state);

        // Assert
        expect(params.Products).toEqual('getProductParams');
        expect(params.Categories).toEqual('getCategoryParams');
        expect(params.Birthday).toEqual(null);
        expect(params.StationId).toEqual(1);
        expect(params.CountryId).toEqual(0);
        expect(params.NoInquiries).toEqual(0);
        expect(params.RelatedCustId).toEqual('1,2');
    });

    it('getParams return exact params when values not null', () => {
        // Arrange
        const values = {
            product: '1,2',
            subProduct: '1,2,',
            betType: '1,2,',
            category: '1,2',
            subCategory:'1,2',
            extension: 1,
            country: 1,
            noOfInquiries: 1
        };
        const listOfCustomerValid = [];
        
        const settings = {
            subCategories: [{subCategoryId: 1, mainCategoryID: 1}],
            extensionNA: {id: 1}
        };
        const state = {
            listOfCustomerValid: listOfCustomerValid,
            content: {
                solution: '',
                description: '',
                autoGenerated: ''
            },
            customerInfo: { birthday: '2021-01-01',}
        };

        const expectedProductParams = {"extensionNA": {"id": 1}, "subCategories": [{"mainCategoryID": 1, "subCategoryId": 1}]};

        shareScripts.getProductParams = jest.fn();
        shareScripts.getCategoryParams = jest.fn(()=>'getCategoryParams');
        // Act
        const params = commonFuncs.getParams (values, null, settings, state);

        // Assert
        expect(shareScripts.getProductParams).toHaveBeenCalledWith(["1", "2"], ["1", "2", ""], ["1", "2", ""], expectedProductParams);
        expect(params.Birthday).toEqual('Jan 01, 2021 07:00 AM');
        expect(params.StationId).toEqual(1);
        expect(params.CountryId).toEqual(1);
        expect(params.NoInquiries).toEqual(1);
        expect(params.RelatedCustId).toEqual(null);
    });
});