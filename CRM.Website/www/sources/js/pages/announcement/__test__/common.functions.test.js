import LangHelper from '@jsroot/common/langHelper';
import React from 'react';
import DateTimeService from '@jsroot/common/dateTimeService';
import * as commonFunc from '../common.functions';

describe('common.functions', () => {
    beforeAll(() => {
        LangHelper.getResource = jest.fn((key) => key);
    });
    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('validateFormik', () => {
        it('should return exact errors', () => {
            // Arrange
            const values = {
                notificationTemplate: '',
                title: '',
                content: {
                    EN: ''
                },
                sendType: 'Send At',
                sendDate: null
            };
            const expected = {
                notificationTemplate: LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('NotificationTemplate')),
                title: LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Title')),
                content: LangHelper.formatString(LangHelper.getResource('FieldRequired'), 'Content EN'),
                sendDate: LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('SendTime'))
            };
            // Act
            const actual = commonFunc.validateFormik(values, [], []);

            //Assert
            expect(actual).toEqual(expected);
        });

        it('should return exact errors', () => {
            // Arrange
            const file = [{
                fileTypes: 'fileTypes',
                size: 100000000000000,
                name: 'file1'
            }];
            const values = {
                notificationTemplate: '1',
                title: '1',
                content: {
                    EN: '{test}'
                },
                sendType: '',
                sendDate: null
            };
            const expected = {
                content: LangHelper.getResource('ContentLanguageError'),
                sendType: LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('SendTime')),
                imageFileType: LangHelper.formatString(LangHelper.getResource('ImageFileTypeError'), 'file1'),
                imageFileSize: LangHelper.formatString(LangHelper.getResource('ImageSizeError'), 'file1')
            };
            // Act
            const actual = commonFunc.validateFormik(values, file, ['file1']);

            //Assert
            expect(actual).toEqual(expected);
        });
    });

    describe('getParams', () => {
        it('should create formData object with expected keys and values', () => {
            // Arrange
            const values = {
                notificationTemplateId: 1,
                content: { en: 'English content', fr: 'French content' },
                headlineType: 'Breaking News',
                sendDate: new Date(),
                sendType: 'Send At',
                oldFileName: 'oldFile.txt',
                title: 'Notification Title'
            };

            const state = {
                languages: [{ mapLabel: 'en', settingId: 1 }, { mapLabel: 'fr', settingId: 2 }],
                uploadedFiles: ['newFile.txt'],
                headlineGroups: ['World News'],
                options: { site: 'Site1', currency: 'USD' }
            };

            // Act
            const formData = commonFunc.getParams(values, state);

            //Assert
            expect(formData.get('notificationTemplateId')).toBe('1');
            expect(formData.get('headlineNameList')).toBe('World News');
            expect(formData.get('siteNameList')).toBe('Site1');
            expect(formData.get('currencyList')).toBe('USD');
            expect(formData.get('headlineType')).toBe('Breaking News');
            expect(formData.get('title')).toBe('Notification Title');
            expect(formData.get('sendImmediately')).toBe("false");
            expect(formData.get('fileString')).toBe('newFile.txt');
            expect(formData.get('contents[0][languageId]')).toBe('1');
            expect(formData.get('contents[0][value]')).toBe('English content');
            expect(formData.get('contents[1][languageId]')).toBe('2');
            expect(formData.get('contents[1][value]')).toBe('French content');
        });
    });

    describe('setValueContent', () => {
        it('should set field values for all contents', () => {
            const setFieldValue = jest.fn();
            const contents = [
                { language: 'en-US', content: 'English content' },
                { language: 'fr-FR', content: 'French content' },
                { language: 'de-DE', content: 'German content' },
            ];

            // Act
            commonFunc.setValueContent(setFieldValue, contents);

            //Assert
            expect(setFieldValue).toHaveBeenCalledTimes(6);
            expect(setFieldValue).toHaveBeenCalledWith('content.enUS', 'English content');
            expect(setFieldValue).toHaveBeenCalledWith('cloneContent.enUS', 'English content');
            expect(setFieldValue).toHaveBeenCalledWith('content.frFR', 'French content');
            expect(setFieldValue).toHaveBeenCalledWith('cloneContent.frFR', 'French content');
            expect(setFieldValue).toHaveBeenCalledWith('content.deDE', 'German content');
            expect(setFieldValue).toHaveBeenCalledWith('cloneContent.deDE', 'German content');
        });

        it('should not set field values when contents is empty', () => {
            // Arrange
            const setFieldValue = jest.fn();
            const contents = [];

            // Act
            commonFunc.setValueContent(setFieldValue, contents);

            //Assert
            expect(setFieldValue).not.toHaveBeenCalled();
        });
    });

    describe('mapLabelLanguage', () => {
        it('should map label languages correctly', () => {
            //Arrange
            const languages = [
                { settingId: 1, settingValue: 'en-US' },
                { settingId: 2, settingValue: 'fr-FR' },
                { settingId: 3, settingValue: 'de-DE' },
            ];

            //Act
            const mappedLanguages = commonFunc.mapLabelLanguage(languages);

            //Assert
            expect(mappedLanguages).toEqual([
                { settingId: 1, settingValue: 'en-US', mapLabel: 'enUS' },
                { settingId: 2, settingValue: 'fr-FR', mapLabel: 'frFR' },
                { settingId: 3, settingValue: 'de-DE', mapLabel: 'deDE' },
            ]);
        });

        it('should return an empty array when input is empty', () => {
            //Arrange
            const languages = [];

            //Act
            const mappedLanguages = commonFunc.mapLabelLanguage(languages);

            //Assert
            expect(mappedLanguages).toEqual([]);
        });
    });
});

