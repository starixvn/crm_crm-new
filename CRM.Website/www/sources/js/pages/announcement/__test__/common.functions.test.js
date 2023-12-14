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
            const state = {
                invalidWidthHeight: 'test',
                isHeadlineGroup: {
                    isSiteType: true
                }
            }
            const expected = {
                //notificationTemplate: LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('NotificationTemplate')),
                title: LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Title')),
                content: LangHelper.formatString(LangHelper.getResource('FieldRequired'), 'Content EN'),
                sendDate: LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('SendTime')),
                imageFileSize: LangHelper.formatString(LangHelper.getResource('ImageSizeError')),
                site: LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Site')),
                currency: LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Currency')),
            };
            // Act
            const actual = commonFunc.validateFormik(values, [], state);

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
            const state = {
                invalidWidthHeight: 'test',
                isHeadlineGroup: {
                    isSiteType: true
                }
            }
            const expected = {
                content: LangHelper.getResource('ContentLanguageError'),
                sendType: LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('SendTime')),
                imageFileType: LangHelper.formatString(LangHelper.getResource('ImageFileTypeError'), 'file1'),
                imageFileSize: LangHelper.formatString(LangHelper.getResource('ImageSizeError'), 'file1'),
                currency: LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Currency')),
                site: LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Site'))
            };
            // Act
            const actual = commonFunc.validateFormik(values, file, state);

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
                title: 'Notification Title',
                currency: 'USD',
                site: 'ARM'
            };

            const state = {
                languages: [{ mapLabel: 'en', settingId: 1 }, { mapLabel: 'fr', settingId: 2 }],
                uploadedFiles: ['newFile.txt'],
                headlineGroups: ['World News'],
                options: { site: 'Site1', currency: 'USD' },
                isHeadlineGroup: { isUsername: true, isSiteType: true }
            };

            // Act
            const formData = commonFunc.getParams(values, state);

            //Assert
            expect(formData.get('notificationTemplateId')).toBe('1');
            expect(formData.get('headlineNameList')).toBe('World News');
            expect(formData.get('siteNameList')).toBe('ARM');
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

    describe('validFileSize', () => {
        it('should return true when file < maximumSize10MB', () => {
            //Arrange
            const file = { size: 1555 };

            //Act
            const actual = commonFunc.validFileSize(file);

            //Assert
            expect(actual).toEqual(true);
        });

        it('should return false when file < maximumSize10MB', () => {
            //Arrange
            const file = { size: 1555000000 };

            //Act
            const actual = commonFunc.validFileSize(file);

            //Assert
            expect(actual).toEqual(false);
        });
    });

    describe('validFileType', () => {
        it('should return true when validFileType', () => {
            //Arrange
            const file = { type: 'image/jpeg' };

            //Act
            const actual = commonFunc.validFileSize(file);

            //Assert
            expect(actual).toEqual(true);
        });
    });

    describe('validFileExtension', () => {
        it('should return true when validFileExtension', () => {
            //Arrange
            const file = { name: 'image.jpeg' };

            //Act
            const actual = commonFunc.validFileExtension(file);

            //Assert
            expect(actual).toEqual(true);
        });
    });

    describe('handleResetWhenBackPage', () => {
        it('should call exactly function props', () => {
            //Arrange
            const props = { 
                setCreateAnnouncement: jest.fn(),
                setEditAnnouncement: jest.fn(),
                setValidateAnnouncement: jest.fn()
             };

            //Act
            commonFunc.handleResetWhenBackPage(props);

            //Assert
            expect(props.setCreateAnnouncement).toHaveBeenCalled();
            expect(props.setEditAnnouncement).toHaveBeenCalled();
            expect(props.setValidateAnnouncement).toHaveBeenCalled();
        });
    });

    describe('getUsernames', () => {
        it('should call exactly headlineNameList directAccountList', () => {
            //Arrange
            //Act
            var actual = commonFunc.getUsernames('headlineNameList', 'directAccountList');

            //Assert
            expect(actual).toEqual('headlineNameList,directAccountList');
        });

        it('should call exactly directAccountList', () => {
            //Arrange
            //Act
            var actual = commonFunc.getUsernames(null, 'directAccountList');

            //Assert
            expect(actual).toEqual('directAccountList');
        });

        it('should call exactly headlineNameList', () => {
            //Arrange
            //Act
            var actual = commonFunc.getUsernames('headlineNameList', null);

            //Assert
            expect(actual).toEqual('headlineNameList');
        });

        it('should call exactly empty', () => {
            //Arrange
            //Act
            var actual = commonFunc.getUsernames(null, null);

            //Assert
            expect(actual).toEqual('');
        });
    });
});

