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
                title: LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Title')),
                sendDate: LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('SendTime')),
            };
            const state = {
                invalidWidthHeight: ['test'],
                isHeadlineGroup: { isSiteType: false },
                errorDrafts: {
                    invalidFileTypeDraft: [],
                    invalidFileSizeDraft: []
                }
            };
            // Act
            const actual = commonFunc.validateFormik(values, [], state);

            //Assert
            expect(actual).toEqual(expected);
        });

        it('should return exact errors', () => {
            // Arrange
            const file = [{
                type: 'fileTypes',
                size: 100000000000000,
                name: 'file1.test'
            }];
            const values = {
                notificationTemplate: '1',
                title: '1',
                content: {
                    EN: '{test}'
                },
                sendType: '',
                sendDate: null,
                site: null,
                currency: null,
                headlineType: ''
            };
            const state = {
                invalidWidthHeight: ['test'],
                isHeadlineGroup: { isSiteType: true },
                errorDrafts: {
                    invalidFileTypeDraft: ['draft'],
                    invalidFileSizeDraft: ['draft']
                }
            }
            const expected = {
                content: LangHelper.getResource('ContentLanguageError'),
                sendType: LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('SendTime')),
                imageFileType: LangHelper.formatString(LangHelper.getResource('ImageFileTypeError'), 'file1'),
                imageFileSize: LangHelper.formatString(LangHelper.getResource('ImageSizeError'), 'test'),
                site: LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Site')),
                currency: LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('Currency')),
                headlineType: LangHelper.formatString(LangHelper.getResource('FieldRequired'), LangHelper.getResource('HeadlineType'))
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
                content: { EN: 'English content', EC: 'French content' },
                headlineType: 'Breaking News',
                sendDate: new Date(),
                sendType: 'Send At',
                oldFileName: [{ name: 'test0.png', key: 'EN', type: 'string' }],
                title: 'Notification Title',
                site: 'test',
                currency: 'test',

            };

            const state = {
                languages: [{ mapLabel: 'EN', settingId: 1 }, { mapLabel: 'EC', settingId: 2 }],
                uploadedFiles: [
                    { name: 'test.png', key: 'EN', type: 'string' },
                    { name: 'newFile.png', key: 'EN', type: 'string' },
                    { name: 'test.png', key: 'EC', type: 'file' },
                ],
                headlineGroups: ['World News'],
                options: { site: 'Site1', currency: 'USD' },
                isHeadlineGroup: {
                    isUsername: true,
                    isSiteType: true
                }
            };

            // Act
            const formData = commonFunc.getParams(values, state);

            //Assert
            expect(formData.get('notificationTemplateId')).toBe('1');
            expect(formData.get('headlineNameList')).toBe('World News');
            expect(formData.get('siteNameList')).toBe('test');
            expect(formData.get('currencyList')).toBe('test');
            expect(formData.get('headlineType')).toBe('Breaking News');
            expect(formData.get('title')).toBe('Notification Title');
            expect(formData.get('sendImmediately')).toBe("false");
            expect(formData.get('fileString')).toBe('test.png');
            expect(formData.get('contents[0][languageId]')).toBe('1');
            expect(formData.get('contents[0][value]')).toBe('English content');
            expect(formData.get('contents[0][fileName]')).toBe('test.png,newFile.png');
            expect(formData.get('contents[1][languageId]')).toBe('2');
            expect(formData.get('contents[1][value]')).toBe('French content');
            expect(formData.get('contents[1][fileName]')).toBe('test.png');
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

    describe('checkInvalidMaxLengthContent', () => {
        it('should return invalidContentMaxLength as false if content or tab is missing', () => {
            const result = commonFunc.checkInvalidMaxLengthContent(null, 'tab');
            expect(result.invalidContentMaxLength).toBe(false);
        
            const result2 = commonFunc.checkInvalidMaxLengthContent('content', null);
            expect(result2.invalidContentMaxLength).toBe(false);
        
            const result3 = commonFunc.checkInvalidMaxLengthContent(null, null);
            expect(result3.invalidContentMaxLength).toBe(false);
        });
      
        it('should return invalidContentMaxLength as false if content length is less than or equal to MAX_LENGTH_TELEGRAM', () => {
            const content = {
                tabName: 'This is a valid content without HTML tags',
            };
            const result = commonFunc.checkInvalidMaxLengthContent(content, 'tabName');
            expect(result.invalidContentMaxLength).toBe(false);
        });
      
        it('should return correct textInvalidContentMaxLength message', () => {
            const longContent = {
                tabName: 'This is a valid content with HTML tags <div>This is a long content exceeding the MAX_LENGTH_TELEGRAM</div>',
            };
            const result = commonFunc.checkInvalidMaxLengthContent(longContent, 'tabName');
            expect(result.textInvalidContentMaxLength).toBe(`Max length ${longContent.tabName.replace('<div>','').replace('</div>', '').length}/${4096}`);
        });
      
        it('should handle empty tab name properly', () => {
            const content = {
                '': 'This is content for an empty tab',
            };
            const result = commonFunc.checkInvalidMaxLengthContent(content, '');
            expect(result.invalidContentMaxLength).toBe(false);
        });
      
        it('should handle empty content properly', () => {
            const result = commonFunc.checkInvalidMaxLengthContent({}, 'tabName');
            expect(result.invalidContentMaxLength).toBe(false);
        });
    });

    describe('getFileString', () => {
        it('should return an empty array if contents is empty', () => {
            const contents = [];
            const result = commonFunc.getFileString(contents);
            expect(result).toEqual([]);
        });
      
        it('should return an empty array if none of the items in contents have a fileName', () => {
            const contents = [
                { languageCode: 'en', content: 'Content 1' },
                { languageCode: 'fr', content: 'Content 2' },
            ];
            const result = commonFunc.getFileString(contents);
            expect(result).toEqual([]);
        });
      
        it('should return an array of file strings for each fileName in contents', () => {
            const contents = [
                { fileName: 'file1.txt,file2.txt', languageCode: 'en', content: 'Content 1' },
                { fileName: 'file3.txt', languageCode: 'fr', content: 'Content 2' },
            ];
            const result = commonFunc.getFileString(contents);
            expect(result).toEqual([
                { key: 'en', name: 'file1.txt', type: 'string' },
                { key: 'en', name: 'file2.txt', type: 'string' },
                { key: 'fr', name: 'file3.txt', type: 'string' },
            ]);
        });
      
        it('should handle special characters in languageCode properly', () => {
            const contents = [
                { fileName: 'file1.txt', languageCode: 'en-US', content: 'Content 1' },
                { fileName: 'file2.txt', languageCode: 'fr-CA', content: 'Content 2' },
            ];
            const result = commonFunc.getFileString(contents);
            expect(result).toEqual([
                { key: 'enUS', name: 'file1.txt', type: 'string' },
                { key: 'frCA', name: 'file2.txt', type: 'string' },
            ]);
        });
      
        it('should handle empty fileName properly', () => {
            const contents = [
                { fileName: '', languageCode: 'en', content: 'Content 1' },
                { fileName: '', languageCode: 'fr', content: 'Content 2' },
            ];
            const result = commonFunc.getFileString(contents);
            expect(result).toEqual([]);
        });
    });

    describe('renderOption', () => {
        it('should render an option element with the provided key, value, and label', () => {
            const key = '1';
            const value = 'option-value';
            const label = 'Option Label';
            const option = commonFunc.renderOption(key, value, label);
        
            expect(option.props.value).toBe(value);
            expect(option.props.children).toBe(label);
        });
    });

    describe('validFileSize', () => {
        it('should return true for a file with size less than 10MB', () => {
            const file = { size: 9999 };
            expect(commonFunc.validFileSize(file)).toBe(true);
        });
      
        it('should return false for a file with size less than 10MB', () => {
            const file = { size: 10485761 };
            expect(commonFunc.validFileSize(file)).toBe(false);
        });
    });

    describe('validFileType', () => {
        it('should return true for valid image/jpeg file type', () => {
          const file = { type: 'image/jpeg' };
          expect(commonFunc.validFileType(file)).toBe(true);
        });
      
        it('should return false for invalid file type', () => {
          const file = { type: 'application/pdf' };
          expect(commonFunc.validFileType(file)).toBe(false);
        });
    });

    describe('validFileExtension function', () => {
        it('should return true for valid file extension "jpeg"', () => {
            const file = { name: 'image.jpeg' };
            expect(commonFunc.validFileExtension(file)).toBe(true);
        });

        it('should return false for invalid file extension', () => {
            const file = { name: 'image.pdf' };
            expect(commonFunc.validFileExtension(file)).toBe(false);
        });
    });

    describe('handleResetWhenBackPage', () => {
        it('should reset all announcement states to null', () => {
            const props = {
                setCreateAnnouncement: jest.fn(),
                setEditAnnouncement: jest.fn(),
                setValidateAnnouncement: jest.fn(),
            };
        
            commonFunc.handleResetWhenBackPage(props);
        
            expect(props.setCreateAnnouncement).toHaveBeenCalledWith(null);
            expect(props.setEditAnnouncement).toHaveBeenCalledWith(null);
            expect(props.setValidateAnnouncement).toHaveBeenCalledWith(null);
        });
    });

    describe('isDisableSubmit', () => {
        it('should return true for disableSubmit with have state', () => {
            const isSubmitting = false;
            const values = {
                titles: 'test',

            };
            const state = {
                isSendType: {
                    isSendNow: true
                },
                isHeadlineGroup: [{ isUsername: true }],
                headlineGroups: ['test']
            };
            expect(commonFunc.isDisableSubmit(values, state, isSubmitting)).toBe(true);
        });

        it('should return true for disableSubmit with have values', () => {
            const isSubmitting = false;
            const values = {
                titles: 'test',
                sendDate: '09/04'
            };
            const state = {
                isSendType: {
                    isSendNow: false,
                    isSendAt: true
                },
                isHeadlineGroup: [{ isUsername: true }]
            };
            expect(commonFunc.isDisableSubmit(values, state, isSubmitting)).toBe(true);
        });
    });

    describe('getUsernames', () => {
        it('should return combined string if both headlineNameList and directAccountList are provided', () => {
            const headlineNameList = 'John,Doe';
            const directAccountList = 'user1,user2';
        
            const result = commonFunc.getUsernames(headlineNameList, directAccountList);
        
            expect(result).toBe(`${headlineNameList},${directAccountList}`);
        });
      
        it('should return directAccountList if only directAccountList is provided', () => {
            const directAccountList = 'user1,user2';
        
            const result = commonFunc.getUsernames(undefined, directAccountList);
        
            expect(result).toBe(directAccountList);
        });
      
        it('should return headlineNameList if only headlineNameList is provided', () => {
            const headlineNameList = 'John,Doe';
        
            const result = commonFunc.getUsernames(headlineNameList);
        
            expect(result).toBe(headlineNameList);
        });
      
        it('should return an empty string if no arguments are provided', () => {
            const result = commonFunc.getUsernames();
        
            expect(result).toBe('');
        });
    });
});