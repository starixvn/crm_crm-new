import React from 'react';
import LangHelper from '@jsroot/common/langHelper';
import * as commonFuns from '../common.functions';
import DateTimeService from '@jsroot/common/dateTimeService';

describe('common functions', () => {
    beforeAll(() => {
        LangHelper.getResource = jest.fn((key) => key);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('renderTitleOptions', () => {
        it('should render titles option correctly', () => {
            // Arrange
            const titles = {
                id: 1,
                value: 'title'
            };

            // Act
            const option = commonFuns.renderTitleOptions(titles);

            // Assert
            expect(option).toEqual(<option key={1} value={1}>title</option>);
        });
    });

    describe('renderStatus', () => {
        it('should render status option correctly', () => {
            // Arrange
            const status = {
                statusId: 1,
                name: 'status'
            };

            // Act
            const option = commonFuns.renderStatus(status);

            // Assert
            expect(option).toEqual(<option key={1} value={1}>status</option>);
        });
    });

    describe('renderLanguage', () => {
        it('should render language option correctly', () => {
            // Arrange
            const languages = {
                languageId: 1,
                name: 'languages'
            };

            // Act
            const option = commonFuns.renderLanguage(languages);

            // Assert
            expect(option).toEqual(<option key={1} value={1}>languages</option>);
        });
    });

    describe('renderResponse', () => {
        it('should render response option correctly', () => {
            // Arrange
            const response = {
                id: 1,
                value: 'response'
            };

            // Act
            const option = commonFuns.renderResponse(response);

            // Assert
            expect(option).toEqual(<option key={1} value={1}>response</option>);
        });
    });

    describe('renderCountry', () => {
        it('should render countries option correctly', () => {
            // Arrange
            const countries = {
                id: 1,
                name: 'countries'
            };

            // Act
            const option = commonFuns.renderCountry(countries);

            // Assert
            expect(option).toEqual(<option key={1} value={1}>countries</option>);
        });
    });

    describe('validate', () => {
        it('return expected errors when values are invalid', () => {
            // Arrange
            const values = {
                communication: [],
                category: '',
                subCategory: '',
                languageId: 0,
                solution: '',
                description: '',
                subject: ''
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
                }
            };

            // Act
            const errors = commonFuns.validateFormik(values, props.settings);

            // Assert
            expect(errors).toEqual(expected);
        });


        it('return expected errors when invalid category params', () => {
            // Arrange
            const values = {
                identityInformation: '1',
                communication: [1],
                category: '1',
                subCategory: '2',
                languageId: 1,
                solution: '1',
                description: '1',
                subject: '1'
            };
            const expected = {
                category: LangHelper.formatString(LangHelper.getResource('InvalidCategoryField'), 'settingName')
            };
            const props = {
                settings: {
                    mainCategories: [{mainCategoryID: 1, settingName: 'settingName'}],
                    subCategories: [{subCategoryId: 1, mainCategoryID: 1}]
                }
            };

            // Act
            const errors = commonFuns.validateFormik(values, props.settings);

            // Assert
            expect(errors).toEqual(expected);
        });
    });

    it('initialValues correctly', () => {
        // Arrange
        const props = {
            settings: {
                titles: [{id: 1}],
                licenseeType: [{id: 1}],
                status: [{statusId: 1}],
                responses: [{id: 1}],
                languages: [{languageId: 1}]
            },
            confirmCreateGuestDialog: {show: false}
        };

        const {titles, status, languages, responses, licenseeType} = props.settings;
        window.currentClientTime = '2021-01-01';
        const feedbackDate = new Date(DateTimeService.toShortDateTimeFormat(new Date(window.currentClientTime)));
        const resolutionTime = new Date(DateTimeService.toShortDateTimeFormat(new Date(window.currentClientTime)));
        resolutionTime.setMinutes(resolutionTime.getMinutes() + 1);
        const values = {
            identityInformation: '',
            title: titles[0].id,
            firstName: '',
            lastName: '',
            birthday: '',
            passportNo: '',
            licenseeType: licenseeType[0].id,
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
            feedbackDate: feedbackDate,
            resolutionTime: resolutionTime,
            communication: '',
            category: '',
            subCategory: '',
            statusId:status[0].statusId,
            responseId: responses[0].id,
            product: '',
            subProduct: '',
            betType: '',
            languageId: languages[0].languageId,
            noOfInquiries: '',
            customerNameInput: '',
            subject: '',
            autoGenerated: 'autoGeneratedInit',
            description: '',
            solution: ''
        };

        const state = {
            autoGeneratedInit: 'autoGeneratedInit'
        };
    

        // Act
        const initialValues = commonFuns.initValues(props.settings, state.autoGeneratedInit);

        // Assert
        expect(initialValues).toEqual(values);
    });
});