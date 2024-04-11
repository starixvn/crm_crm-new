import React from 'react';
import { shallow } from 'enzyme';
import { NewAnnouncement } from '../NewAnnouncement';
import LangHelper from '@jsroot/common/langHelper';
import { Formik } from 'formik';
import DateTimeService from '@jsroot/common/dateTimeService';
import * as commonFunc from '../../common.functions';

describe('AppContainer', () => {
    beforeAll(() =>{
        jest.useFakeTimers();
        LangHelper.getResource = jest.fn((key) => key);
    });
    afterAll(() => {
        jest.clearAllMocks();
    });

    describe('componentDidMount', () => {
        it('should call exact props get data', async() => {
            // Arrange
            const languages = [{settingId:50000, settingName: 'NotificationTemplateLanguage', settingValue: 'EN'}];
            const promise = Promise.resolve(languages);
            const props = {
                getLanguages: jest.fn(() => promise),
                getAnnouncementTemplate: jest.fn(),
                setCreateAnnouncement: jest.fn(),
                setEditAnnouncement: jest.fn(),
                setValidateAnnouncement: jest.fn(),
            };
            //Act
            const newAnnouncement = shallow(<NewAnnouncement  {...props}/>);
            newAnnouncement.instance().handleOptionSettings = jest.fn();
            await newAnnouncement.instance().componentDidMount();

            // Assert
            expect(props.getAnnouncementTemplate).toHaveBeenCalled();
            expect(props.setCreateAnnouncement).toHaveBeenCalled();
            expect(props.setEditAnnouncement).toHaveBeenCalled();
            expect(props.setValidateAnnouncement).toHaveBeenCalled();
            expect(newAnnouncement.instance().handleOptionSettings).toHaveBeenCalled();
        });
    });

    describe('handleOptionSettings', () => {
        it('should set exact state', async() => {
            // Arrange
            const promise = Promise.resolve({});
            const props = {
                getSettings: jest.fn(() => promise),
                getAnnouncementTemplate: jest.fn(),
                settings: {
                    currencyList: [{id: 11, name: "ABC"}, {id: 18, name: "ADA1"}, {id: 9, name: "AUD"}, {id: 97, name: "BDT"}],
                    headlineTypeList: [{id: 0, name: "Normal"}, {id: 1, name: "VIP"}],
                    siteList: [{siteID: 23, site: "222223"}, {siteID: 16, site: "611111"}, {siteID: 20, site: "722222"}]
                }
            };
            const newAnnouncement = shallow(<NewAnnouncement  {...props}/>, { disableLifecycleMethods: true });
            newAnnouncement.instance().setState = jest.fn();
            //Act
            newAnnouncement.instance().handleOptionSettings();
            await promise;
            jest.runAllTimers();

            // Assert
            expect(newAnnouncement.instance().setState).toHaveBeenCalled();
        });
    });

    describe('setStateUploadFile', () => {
        let newAnnouncement;
        let uploadedFiles;
        let fileNameRemove;
      
        beforeEach(() => {
            newAnnouncement = shallow(<NewAnnouncement />, { disableLifecycleMethods: true });
            uploadedFiles = [new File([''], 'file1.jpg', { type: 'image/jpeg' })];
            fileNameRemove = null;
        });
      
        it('should remove fileNameRemove from invalidWidthHeight when fileNameRemove is passed as an argument', () => {
            newAnnouncement.setState({ invalidWidthHeight: ['file1.jpg', 'file2.jpg'] });
            fileNameRemove = 'file2.jpg';
      
            newAnnouncement.instance().setStateUploadFile(uploadedFiles, fileNameRemove);
      
            expect(newAnnouncement.state('invalidWidthHeight')).toEqual(['file1.jpg']);
        });
      
        it('should set uploadedFiles in the newAnnouncement state', () => {
            newAnnouncement.instance().setStateUploadFile(uploadedFiles, fileNameRemove);
      
            expect(newAnnouncement.state('uploadedFiles')).toEqual(uploadedFiles);
        });
      });
      

    describe('handleChangeNotificationTemplate', () => {
        it('should call exact function', () => {
            // Arrange
            const event = {
                preventDefault: jest.fn(),
                target: {value: 'value'}
            };
            const newAnnouncement = shallow(<NewAnnouncement />, { disableLifecycleMethods: true }).instance();
            newAnnouncement.formik = {
                setFieldValue: jest.fn()
            };
            newAnnouncement.getContentByTemplateId = jest.fn();

            //Act
            newAnnouncement.handleChangeNotificationTemplate(event);

            // Assert
            expect(newAnnouncement.formik.setFieldValue).toHaveBeenCalledTimes(2);
            expect(newAnnouncement.getContentByTemplateId).toHaveBeenCalled();
            expect(newAnnouncement.state.isChangeTemplate).toEqual(true);

        });
    });

    describe('getContentByTemplateId', () => {
        it('should call exact function', () => {
            // Arrange
            const props = {
                announcementTemplate: {
                    contents: [{notificationTemplateId : 1, language: 'EN', title: 'title'}],
                    notificationTemplates: [{notificationTemplateId: 1, title: 'title'}]
                }
            };
            commonFunc.setValueContent = jest.fn();
            const newAnnouncement = shallow(<NewAnnouncement {...props}/>, { disableLifecycleMethods: true }).instance();
            newAnnouncement.formik = { setFieldValue: jest.fn() };
            newAnnouncement.handleGetParameters = jest.fn();

            //Act
            newAnnouncement.getContentByTemplateId(1);

            // Assert
            expect(newAnnouncement.formik.setFieldValue).toHaveBeenCalledTimes(1);
            expect(newAnnouncement.handleGetParameters).toHaveBeenCalled();
        });
    });

    describe('handleGetParameters', () => {
        it('set exact params', () => {
            // Arrange
            const newAnnouncement = shallow(<NewAnnouncement />, { disableLifecycleMethods: true }).instance();

            //Act
            newAnnouncement.handleGetParameters("{test param}");

            // Assert
            expect(newAnnouncement.state.parameters).toEqual(["{test param}"]);
        });
    });

    describe('handleChangeTab', () => {
        it('call exact function', () => {
            // Arrange
            const newAnnouncement = shallow(<NewAnnouncement />, { disableLifecycleMethods: true }).instance();
            newAnnouncement.formik = {
                values: { content: {EN: 'test'} },
                setFieldValue: jest.fn()
            };
            newAnnouncement.handleGetParameters = jest.fn();
            //Act
            newAnnouncement.handleChangeTab('EN');

            // Assert
            expect(newAnnouncement.state.tab).toEqual('EN');
            expect(newAnnouncement.handleGetParameters).toHaveBeenCalled();
        });
    });

    describe('handlePasteGroupHeadline', () => {
        it('should do as expected if copy string', () => {
            // Arrange
            const state = {
                headlineGroups: [],
                isHeadlineGroup: {
                    isUsername: true
                }
            };
            const event = { clipboardData: { getData: jest.fn().mockReturnValueOnce('text') }, preventDefault: jest.fn() };
            const newAnnouncement = shallow(<NewAnnouncement />, { disableLifecycleMethods: true }).instance();
            newAnnouncement.handleSetValueHeadline = jest.fn();
            newAnnouncement.setState(state);
            // Act
            newAnnouncement.handlePasteGroupHeadline(event);
            jest.runAllTimers();
            // Assert
            expect(newAnnouncement.handleSetValueHeadline).toHaveBeenCalledWith(['text']);
        });
    });
    
    describe('handleSetValueHeadline', () => {
        it('should setState and reset current value', () => {
            // Arrange
            const state = {
                headlineGroups: []
            };
            const newAnnouncement = shallow(<NewAnnouncement />, { disableLifecycleMethods: true }).instance();
            newAnnouncement.headlineInputRef = {
                current: {value: '1', focus: jest.fn()}
            };
            newAnnouncement.setState(state);
            // Act
            newAnnouncement.handleSetValueHeadline(['1, 2']);
            // Assert
            expect(newAnnouncement.state.headlineGroups).toEqual(['1, 2']);
            expect(newAnnouncement.headlineInputRef.current.value).toEqual('');
        });
    });

    describe('handleChangeInputHeadline', () => {
        it('should setState and reset current value', () => {
            // Arrange
            const state = {
                headlineGroups: []
            };
            const event = {target: {value: 'value,'}, preventDefault: jest.fn()};
            const newAnnouncement = shallow(<NewAnnouncement />, { disableLifecycleMethods: true }).instance();
            newAnnouncement.setState(state);
            newAnnouncement.handleSetValueHeadline = jest.fn();
            // Act
            newAnnouncement.handleChangeInputHeadline(event);
            // Assert
            expect(newAnnouncement.handleSetValueHeadline).toHaveBeenCalledWith(['value']);
            expect(event.preventDefault).toHaveBeenCalled();
        });
    });

    describe('handleBlurInputHeadline', () => {
        it('should setState and reset current value', () => {
            // Arrange
            const state = {
                headlineGroups: []
            };
            const event = {target: {value: 'value'}, preventDefault: jest.fn()};
            const newAnnouncement = shallow(<NewAnnouncement />, { disableLifecycleMethods: true }).instance();
            newAnnouncement.setState(state);
            newAnnouncement.handleSetValueHeadline = jest.fn();
            newAnnouncement.headlineInputRef = {
                current: {value: '1', focus: jest.fn()}
            };
            // Act
            newAnnouncement.handleBlurInputHeadline(event);
            // Assert
            expect(newAnnouncement.state.headlineGroups).toEqual(['value']);
            expect(newAnnouncement.headlineInputRef.current.value).toEqual('');
        });
    });

    describe('handleRemoveHeadline', () => {
        it('should setState and call exact function', () => {
            // Arrange
            const state = {
                headlineGroups: ['1', '2'],
                isHeadlineGroup: {
                    isUsername: true
                }
            };
            const event = {target: {value: 'value'}, stopPropagation: jest.fn()};
            const newAnnouncement = shallow(<NewAnnouncement />, { disableLifecycleMethods: true }).instance();
            newAnnouncement.setState(state);
            // Act
            newAnnouncement.handleRemoveHeadline(event, '1');
            // Assert
            expect(newAnnouncement.state.headlineGroups).toEqual(['2']);
        });
    });

    describe('handleOptionChange', () => {
        it('should call setState', () => {
            // Arrange
            const newAnnouncement = shallow(<NewAnnouncement />, { disableLifecycleMethods: true }).instance();
            newAnnouncement.formik = {setFieldValue: jest.fn()};
            newAnnouncement.setState = jest.fn();
            // Act
            newAnnouncement.handleOptionChange('site', '1');
            // Assert
            expect(newAnnouncement.formik.setFieldValue).toHaveBeenCalled();
        });
    });

    describe('handleDateChange', () => {
        it('should call exact function', () => {
            // Arrange
            const newAnnouncement = shallow(<NewAnnouncement />, { disableLifecycleMethods: true }).instance();
            newAnnouncement.formik = {setFieldValue: jest.fn()};
            // Act
            newAnnouncement.handleDateChange('value');
            // Assert
            expect(newAnnouncement.formik.setFieldValue).toHaveBeenCalled();
        });
    });

    describe('handleChangeParameter', () => {
        it('should call exact function', () => {
            // Arrange
            const event = {target : {name: 'param1', value: 'new value'}};
            const param = 'old value';
            const removeSpaceParam = ['param2', 'param3'];
            const state = {tab: 'tab1'};
            const newAnnouncement = shallow(<NewAnnouncement />, { disableLifecycleMethods: true }).instance();
            newAnnouncement.formik = {
                setFieldValue: jest.fn(),
                values: {
                    cloneContent: {
                      tab1: 'content with old value param1 and param2',
                      tab2: 'content with old value param1 and param3',
                    },
                    param1: 'old value',
                    param2: 'param2 value',
                    param3: 'param3 value'
                }
            };
            newAnnouncement.setState(state);
            // Act
            newAnnouncement.handleChangeParameter(event, param, removeSpaceParam);
            // Assert
            expect(newAnnouncement.formik.setFieldValue).toHaveBeenCalledWith('param1', 'new value');
        });
    });
    
    describe('renderMessage', () => {
        it('should return exact value when result is successfully', () => {
            // Arrange
            const newAnnouncement = shallow(<NewAnnouncement />, { disableLifecycleMethods: true }).instance();
            // Act
            const actual = newAnnouncement.renderMessage({isSuccessful: true, message: 'test1;test2'});
            // Assert
            expect(actual).toEqual(['test1;test2']);
        });

        it('should return exact value when result is not successfully', () => {
            // Arrange
            const newAnnouncement = shallow(<NewAnnouncement />, { disableLifecycleMethods: true }).instance();
            // Act
            const actual = newAnnouncement.renderMessage({isSuccessful: false, message: 'test1;test2'});
            // Assert
            expect(actual).toEqual(['test1', 'test2']);
        });
    });

    describe('handleCheckHeadline', () => {
        it('should setState successfully', () => {
            // Arrange
            const newAnnouncement = shallow(<NewAnnouncement />, { disableLifecycleMethods: true }).instance();
            newAnnouncement.setState = jest.fn();
            // Act
            const actual = newAnnouncement.handleCheckHeadline('name', 'test');
            // Assert
            expect(newAnnouncement.setState).toHaveBeenCalled();
        });
    });

    describe('handleSubmit', () => {
        it('should call setState', () => {
            // Arrange
            const promise = Promise.resolve(2);
            const props = {
                validateAnnouncement: jest.fn(() => promise),
                validateAnnouncementResult: [{test:1}]
            };
            const setSubmitting = jest.fn();
            commonFunc.getParams = jest.fn(() => {});
            const newAnnouncement = shallow(<NewAnnouncement {...props}/>, { disableLifecycleMethods: true }).instance();
            newAnnouncement.formik = {setFieldValue: jest.fn(), setSubmitting: jest.fn()};
            newAnnouncement.setState = jest.fn();
            newAnnouncement.getParams = jest.fn();
            newAnnouncement.handleCheckValidAllContent = jest.fn(() => false);
            // Act
            newAnnouncement.handleSubmit({}, {setSubmitting});
            // Assert
            props.validateAnnouncement(() => {
                expect(newAnnouncement.setState).toHaveBeenCalled();
                expect(props.validateAnnouncement).toHaveBeenCalled();
            });
        });
    });

    describe('handleConfirmInsertDialog', () => {
        it('should call exact function when create is successful', async () => {
            // Arrange
            const promise = Promise.resolve({isSuccessful: true});
            const props = {
                onSuccess: jest.fn(),
                createAnnouncement: jest.fn(() => promise),
                createAnnouncementResult: {isSuccessful: true},
                setIsRefresh: jest.fn(),
                setCreateAnnouncement: jest.fn(),
                setValidateAnnouncement: jest.fn(),
                navigate: jest.fn(),
                sendMessageAnnouncementToBotEndpoint: jest.fn()
            };
            const state = {
                confirmInsertDialog: {
                    params: {}
                }
            };
            const newAnnouncement = shallow(<NewAnnouncement {...props} />, { disableLifecycleMethods: true }).instance();
            newAnnouncement.formik = {
                setSubmitting: jest.fn(),
                values:{sendType: 'Send At'}
            };
            newAnnouncement.setState(state);
            newAnnouncement.handleCloseConfirmInsertDialog = jest.fn();
            // Act
            newAnnouncement.handleConfirmInsertDialog();
            await promise;
            jest.runAllTimers();

            // Assert
            expect(newAnnouncement.handleCloseConfirmInsertDialog).toHaveBeenCalled();
        });

        it('should call exact function when create is not successful', async () => {
            // Arrange
            const promise = Promise.resolve({isSuccessful: false});
            const props = {
                createAnnouncement: jest.fn(() => promise),
                createAnnouncementResult: {isSuccessful: false},
                sendMessageAnnouncementToBotEndpoint: jest.fn()
            };
            const state = {
                confirmInsertDialog: {
                    params: {}
                }
            };
            const newAnnouncement = shallow(<NewAnnouncement {...props} />, { disableLifecycleMethods: true }).instance();
            newAnnouncement.setState(state);
            newAnnouncement.formik = {
                setSubmitting: jest.fn(),
                values:{sendType: 'Send Now'}
            };
            newAnnouncement.handleCloseConfirmInsertDialog = jest.fn();
            // Act
            newAnnouncement.handleConfirmInsertDialog();
            await promise;
            jest.runAllTimers();

            // Assert
            expect(newAnnouncement.formik.setSubmitting).toHaveBeenCalled();
            expect(newAnnouncement.handleCloseConfirmInsertDialog).toHaveBeenCalled();
        });
    });

    describe('handleCloseConfirmInsertDialog', () => {
        it('should call exact function', () => {
            // Arrange
            const newAnnouncement = shallow(<NewAnnouncement />, { disableLifecycleMethods: true }).instance();
            newAnnouncement.formik = {
                setSubmitting: jest.fn()
            };
            // Act
            newAnnouncement.handleCloseConfirmInsertDialog();
            // Assert
            expect(newAnnouncement.state.confirmInsertDialog).toEqual({ show: false, params: null });
            expect(newAnnouncement.formik.setSubmitting).toHaveBeenCalledWith(false);
        });
    });

    describe('getStateFilter', () => {
        it('should return expected result', () => {
            // Arrange
            const props = {
                filterParams: 'test'
            };
            const expected = {
                isLoadGrid: true,
                filterParams: 'test'
            };
            const newAnnouncement = shallow(<NewAnnouncement {...props}/>, { disableLifecycleMethods: true }).instance();
        
            // Act
            const actual = newAnnouncement.getStateFilter();
            // Assert
            expect(actual).toEqual(expected);
        });
    });

    describe('handleClose', () => {
        it('should call exactly props function', () => {
            // Arrange
            const props = {
                setCreateAnnouncement: jest.fn(),
                setValidateAnnouncement: jest.fn(),
                navigate: jest.fn()
            };

            const newAnnouncement = shallow(<NewAnnouncement {...props}/>, { disableLifecycleMethods: true }).instance();
            newAnnouncement.getStateFilter = jest.fn();

            // Act
            newAnnouncement.handleClose();

            // Assert
            expect(props.setCreateAnnouncement).toHaveBeenCalled();
            expect(props.setValidateAnnouncement).toHaveBeenCalled();
            expect(props.navigate).toHaveBeenCalled();
        });
    });

    describe('renderContentConfirm', () => {
        const confirmInsertDialog = {
            content: {
                sendDateString: 'AM',
                sendTimeString: '',
                siteNameList: { replaceAll: jest.fn(() => 'sa, la') }
            }
        };
        const contentType = {
            currencies: 't',
            headlineType: 't'
        };

        it('should return exact content when send type is Send At', () => {
            // Arrange
            DateTimeService.toLongDateTimeFormat = jest.fn(() => new Date('2023-01-01'));
            const newAnnouncement = shallow(<NewAnnouncement />, { disableLifecycleMethods: true }).instance();
            newAnnouncement.renderContentType = jest.fn(() => contentType);
            newAnnouncement.setState({ confirmInsertDialog: confirmInsertDialog });
            newAnnouncement.formik = {
                values:{
                    sendType: 'Send At',
                    sendDate: new Date('2023-01-01')
                }
            };
            // Act
            const actual = newAnnouncement.renderContentConfirm();
            // Assert
        });

        it('should return exact content when send type is not Send At', () => {
            // Arrange
            const newAnnouncement = shallow(<NewAnnouncement />, { disableLifecycleMethods: true }).instance();
            newAnnouncement.renderContentType = jest.fn(() => contentType);
            newAnnouncement.setState({ confirmInsertDialog: confirmInsertDialog });
            newAnnouncement.formik = {
                values:{
                    sendType: 'Send Immediately'
                }
            };

            // Act
            const actual = newAnnouncement.renderContentConfirm();
            // Assert
        });
    });

    describe('handleSaveDraft', () => {
        it('should call exactly props function when successfully', async () => {
            // Arrange
            const promise = Promise.resolve({ data: {} });
            const props = {
                setIsRefresh: jest.fn(),
                setCreateAnnouncement: jest.fn(),
                navigate: jest.fn(),
                createAnnouncement: jest.fn(() => promise),
                createAnnouncementResult: {
                    isSuccessful: true
                }
            };
            const event = { preventDefault: jest.fn() };

            const newAnnouncement = shallow(<NewAnnouncement {...props}/>, { disableLifecycleMethods: true }).instance();
            newAnnouncement.getStateFilter = jest.fn();
            newAnnouncement.formik = { setSubmitting: jest.fn() };
            // Act
            newAnnouncement.handleSaveDraft(event, {});
            await promise;
            jest.runAllTimers();

            // Assert
            expect(setTimeout).toHaveBeenCalled();
            expect(props.createAnnouncement).toHaveBeenCalled();
            expect(props.setIsRefresh).toHaveBeenCalled();
            expect(props.navigate).toHaveBeenCalled();
        });

        
        it('should call exactly props function when not successfully', async () => {
            // Arrange
            const promise = Promise.resolve({ data: {} });
            const props = {
                setIsRefresh: jest.fn(),
                setCreateAnnouncement: jest.fn(),
                navigate: jest.fn(),
                createAnnouncement: jest.fn(() => promise),
                createAnnouncementResult: {
                    isSuccessful: false
                }
            };
            const event = { preventDefault: jest.fn() };

            const newAnnouncement = shallow(<NewAnnouncement {...props}/>, { disableLifecycleMethods: true }).instance();
            newAnnouncement.getStateFilter = jest.fn();
            newAnnouncement.formik = { setSubmitting: jest.fn() };
            // Act
            newAnnouncement.handleSaveDraft(event, {});
            await promise;

            // Assert
            expect(newAnnouncement.formik.setSubmitting).toHaveBeenCalled();
        });
    });

    describe('renderContentType', () => {
        it('should return exactly', () => {
            // Arrange
            const props = {
                settings: {
                    headlineTypeList: [
                        { id: 1, name: 'Type1' },
                        { id: 2, name: 'Type2' }
                    ],
                    currencyList: [
                        { id: 1, name: 'USD' },
                        { id: 2, name: 'EUR' }
                    ]
                }
            };
            const contentConfirm = {
                headlineType: 2,
                currencyList: '1,2',
            };

            const newAnnouncement = shallow(<NewAnnouncement {...props}/>, { disableLifecycleMethods: true }).instance();

            // Act
            const actual = newAnnouncement.renderContentType(contentConfirm);

            // Assert
            expect(actual.headlineType).toBe('Type2');
            expect(actual.currencies).toBe('USD, EUR');
        });
    });

    describe('getSettingOption', () => {
        it('should return exactly', async () => {
            // Arrange
            const promise = Promise.resolve({ data: {} });
            const props = {
                settings: {
                    headlineTypeList: [
                        { id: 1, name: 'Type1' },
                        { id: 2, name: 'Type2' }
                    ],
                    currencyList: [
                        { id: 1, name: 'USD' },
                        { id: 2, name: 'EUR' }
                    ]
                },
                getSettings: jest.fn(() => promise)
            };
            const announcement = {
                currencyIdList: '1,2',
                headlineType: 1,
            };

            const newAnnouncement = shallow(<NewAnnouncement {...props}/>, { disableLifecycleMethods: true });

            // Act
            await newAnnouncement.instance().getSettingOption(announcement);
            await promise;
            jest.runAllTimers();

            // Assert
            expect(props.getSettings).toHaveBeenCalled();
            expect(newAnnouncement.state('currencies')).toBe('USD, EUR');
            expect(newAnnouncement.state('headlineType')).toBe('Type1');
        });
    });

    describe('handleChangeSendType', () => {
        it('should setState exactly when is send at', () => {
            // Arrange
            const newAnnouncement = shallow(<NewAnnouncement />, { disableLifecycleMethods: true });
            newAnnouncement.instance().formik = { setFieldValue: jest.fn() };

            // Act
            newAnnouncement.instance().handleChangeSendType('Send At');

            // Assert
            expect(newAnnouncement.state('isSendType')).toEqual({
                isSendNow: false,
                isSendAt: true
            });
        });

        it('should setState exactly when is send now', () => {
            // Arrange
            const newAnnouncement = shallow(<NewAnnouncement />, { disableLifecycleMethods: true });
            newAnnouncement.instance().formik = { setFieldValue: jest.fn() };

            // Act
            newAnnouncement.instance().handleChangeSendType('Send Now');

            // Assert
            expect(newAnnouncement.state('isSendType')).toEqual({
                isSendNow: true,
                isSendAt: false
            });
        });
    });

    describe('handleCheckValidAllContent', () => {
        it('should return exactly', () => {
            // Arrange
            const content = {
                field1: 'Valid Content 1',
                field2: 'Valid Content 2',
                field3: 'Invalid Content with too long length',
            };

            const newAnnouncement = shallow(<NewAnnouncement />, { disableLifecycleMethods: true }).instance();

            // Act
            const actual = newAnnouncement.handleCheckValidAllContent(content);

            // Assert
            expect(actual).toBe(false);
        });
    });

    describe('Render', () => {
        it('render formik component', () => {
            // Arrange
            const state = {
                languages: [{settingId:50000, settingName: 'NotificationTemplateLanguage', settingValue: 'EN'}],
                invalidWidthHeight: false,
                uploadedFiles: ['file1, file2']
            };
            const props = {
                announcementTemplate: [{announcementId: 65014, notificationTemplateName: "Special Announcement s" }],
                settings: {
                    currencyList: [{id: 11, name: "ABC"}, {id: 18, name: "ADA1"}, {id: 9, name: "AUD"}, {id: 97, name: "BDT"}],
                    headlineTypeList: [{id: 0, name: "Normal"}, {id: 1, name: "VIP"}],
                    siteList: [{siteID: 23, site: "222223"}, {siteID: 16, site: "611111"}, {siteID: 20, site: "722222"}]
                }
            };
            const newAnnouncement = shallow(<NewAnnouncement {...props}/>, { disableLifecycleMethods: true });
            newAnnouncement.instance().setState(state);
            newAnnouncement.instance().formik = {
                values:{
                    sendType: 'Send At',
                    sendDate: new Date('2023-01-01')
                }
            };

            // Act
            newAnnouncement.instance().render();
            // Assert
            expect(newAnnouncement.find(Formik).length).toBe(1);
        });

        it('should call correct functions when validate', () => {
            // Arrange
            const values = {
                languageId: 0
            };
           
            const state = {
                languages: [{settingId:50000, settingName: 'NotificationTemplateLanguage', settingValue: 'EN'}],
                invalidWidthHeight: false,
                uploadedFiles: ['file1, file2']
            };
            const props = {
                announcementTemplate: [{announcementId: 65014, notificationTemplateName: "Special Announcement s" }],
                settings: {
                    currencyList: [{id: 11, name: "ABC"}, {id: 18, name: "ADA1"}, {id: 9, name: "AUD"}, {id: 97, name: "BDT"}],
                    headlineTypeList: [{id: 0, name: "Normal"}, {id: 1, name: "VIP"}],
                    siteList: [{siteID: 23, site: "222223"}, {siteID: 16, site: "611111"}, {siteID: 20, site: "722222"}]
                }
            };
            const newAnnouncement = shallow(<NewAnnouncement {...props}/>, { disableLifecycleMethods: true });
            newAnnouncement.instance().setState(state);
            
            commonFunc.validateFormik = jest.fn(() => 'test');

            // Act
            newAnnouncement.instance().render();
            newAnnouncement.find(Formik).props().validate(values);

            // Assert
            expect(newAnnouncement.find(Formik).length).toBe(1);
            expect(commonFunc.validateFormik).toHaveBeenCalledTimes(1);
        });
    });

    describe('renderForm', () => {
        const formikProps = {
            values: {},
            errors: {},
            touched: {},
            handleChange: jest.fn(),
            setFieldValue: jest.fn(),
            handleSubmit: jest.fn(),
            isSubmitting: false
        };
        const state = {
            languages: [{settingId:50000, settingName: 'NotificationTemplateLanguage', settingValue: 'EN'}],
            invalidWidthHeight: false,
            uploadedFiles: ['file1, file2'],
            isChangeTemplate: true,
            parameters: ['param1', 'param2'],
            headlineGroups: ['headline1']
        };
        const props = {
            announcementTemplate: {announcementId: 65014, notificationTemplateName: "Special Announcement s", 
                notificationTemplates: [{notificationTemplateId: 1, notificationTemplateName: ''}] 
            },
            settings: {
                currencyList: [{id: 11, name: "ABC"}, {id: 18, name: "ADA1"}, {id: 9, name: "AUD"}, {id: 97, name: "BDT"}],
                headlineTypeList: [{id: 0, name: "Normal"}, {id: 1, name: "VIP"}],
                siteList: [{siteID: 23, site: "222223"}, {siteID: 16, site: "611111"}, {siteID: 20, site: "722222"}]
            }
        };

        // it('should call exact function when change parameter ', () => {
        //     // Arrange
        //     const newAnnouncement = shallow(<NewAnnouncement {...props}/>, { disableLifecycleMethods: true }).instance();
        //     newAnnouncement.handleChangeParameter = jest.fn();
        //     newAnnouncement.setState(state);
        //     // Act
        //     const form = shallow(newAnnouncement.renderForm(formikProps));
        //     form.find('.form-input-param').at(0).simulate('change');
        //     // Assert
        //     expect(newAnnouncement.handleChangeParameter).toHaveBeenCalled();
        // });

        it('should call exact function when onblur input', () => {
            // Arrange
            const newAnnouncement = shallow(<NewAnnouncement {...props}/>, { disableLifecycleMethods: true }).instance();
            newAnnouncement.handleBlurInputHeadline = jest.fn();
            newAnnouncement.setState(state);
            // Act
            const form = shallow(newAnnouncement.renderForm(formikProps));
            form.find('.text-input-headline').simulate('blur', {});
            // Assert
            expect(newAnnouncement.handleBlurInputHeadline).toHaveBeenCalled();
        });

        it('should focus when click', () => {
            // Arrange
            const newAnnouncement = shallow(<NewAnnouncement {...props}/>, { disableLifecycleMethods: true }).instance();
            newAnnouncement.headlineInputRef = {
                current: {focus: jest.fn()}
            };
            newAnnouncement.setState(state);
            // Act
            const form = shallow(newAnnouncement.renderForm(formikProps));
            form.find('.headline-group-form').simulate('click');
            // Assert
            expect(newAnnouncement.headlineInputRef.current.focus).toHaveBeenCalled();
        });

        it('should call remove headline', () => {
            // Arrange
            const newAnnouncement = shallow(<NewAnnouncement {...props}/>, { disableLifecycleMethods: true }).instance();
            newAnnouncement.handleRemoveHeadline = jest.fn();
            newAnnouncement.setState(state);
            // Act
            const form = shallow(newAnnouncement.renderForm(formikProps));
            form.find('.fa-times').simulate('click');
            // Assert
            expect( newAnnouncement.handleRemoveHeadline).toHaveBeenCalled();
        });
    });
});
