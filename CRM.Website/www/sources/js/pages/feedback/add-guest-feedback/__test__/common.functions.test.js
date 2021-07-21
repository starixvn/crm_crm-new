import React from 'react';
import LangHelper from '@jsroot/common/langHelper';
import * as commonFuns from '../common.functions';
import moment from 'moment';

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
});