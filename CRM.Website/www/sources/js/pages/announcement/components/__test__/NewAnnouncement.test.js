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
                getAnnouncementTemplate: jest.fn()
            };
            //Act
            const newAnnouncement = shallow(<NewAnnouncement  {...props}/>);
            newAnnouncement.instance().handleOptionSettings = jest.fn();
            await newAnnouncement.instance().componentDidMount();

            // Assert
            expect(props.getAnnouncementTemplate).toHaveBeenCalled();
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
                headlineGroups: []
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
                headlineGroups: ['1', '2']
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
            newAnnouncement.setState = jest.fn();
            // Act
            newAnnouncement.handleOptionChange('site', '1');
            // Assert
            expect(newAnnouncement.setState).toHaveBeenCalled();
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

    describe('handleSubmit', () => {
        it('should call setState', () => {
            // Arrange
            const setSubmitting = jest.fn();
            commonFunc.getParams = jest.fn(() => {});
            const newAnnouncement = shallow(<NewAnnouncement />, { disableLifecycleMethods: true }).instance();
            newAnnouncement.setState = jest.fn();
            // Act
            newAnnouncement.handleSubmit({}, {setSubmitting});
            // Assert
            expect(newAnnouncement.setState).toHaveBeenCalled();
        });
    });

    describe('handleConfirmInsertDialog', () => {
        it('should call exact function when create is successful', async () => {
            // Arrange
            const promise = Promise.resolve({isSuccessful: true});
            const props = {
                onSuccess: jest.fn(),
                createAnnouncement: jest.fn(() => promise),
                createAnnouncementResult: {isSuccessful: true}
            };
            const state = {
                confirmInsertDialog: {
                    params: {}
                }
            };
            const newAnnouncement = shallow(<NewAnnouncement {...props} />, { disableLifecycleMethods: true }).instance();
            newAnnouncement.setState(state);
            newAnnouncement.handleCloseConfirmInsertDialog = jest.fn();
            // Act
            newAnnouncement.handleConfirmInsertDialog();
            await promise;
            jest.runAllTimers();

            // Assert
            expect(props.onSuccess).toHaveBeenCalled();
            expect(newAnnouncement.handleCloseConfirmInsertDialog).toHaveBeenCalled();
        });

        it('should call exact function when create is not successful', async () => {
            // Arrange
            const promise = Promise.resolve({isSuccessful: false});
            const props = {
                createAnnouncement: jest.fn(() => promise),
                createAnnouncementResult: {isSuccessful: false}
            };
            const state = {
                confirmInsertDialog: {
                    params: {}
                }
            };
            const newAnnouncement = shallow(<NewAnnouncement {...props} />, { disableLifecycleMethods: true }).instance();
            newAnnouncement.setState(state);
            newAnnouncement.formik = {
                setSubmitting: jest.fn()
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

    describe('renderContentConfirm', () => {
        it('should return exact content when send type is Send At', () => {
            // Arrange
            DateTimeService.toLongDateTimeFormat = jest.fn(() => new Date('2023-01-01'));
            const newAnnouncement = shallow(<NewAnnouncement />, { disableLifecycleMethods: true }).instance();
            newAnnouncement.formik = {
                values:{
                    sendType: 'Send At',
                    sendDate: new Date('2023-01-01')
                }
            };

            // Act
            const actual = newAnnouncement.renderContentConfirm();
            // Assert
            expect(actual).toEqual(<div>{LangHelper.formatString(LangHelper.getResource('ConfirmSendAt'), new Date('2023-01-01'))}</div>);
        });

        it('should return exact content when send type is not Send At', () => {
            // Arrange
            const newAnnouncement = shallow(<NewAnnouncement />, { disableLifecycleMethods: true }).instance();
            newAnnouncement.formik = {
                values:{
                    sendType: 'Send Immediately'
                }
            };

            // Act
            const actual = newAnnouncement.renderContentConfirm();
            // Assert
            expect(actual).toEqual(<div>{LangHelper.getResource('ConfirmSendImmediately')}</div>);
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

        it('should call exact function when change parameter ', () => {
            // Arrange
            const newAnnouncement = shallow(<NewAnnouncement {...props}/>, { disableLifecycleMethods: true }).instance();
            newAnnouncement.handleChangeParameter = jest.fn();
            newAnnouncement.setState(state);
            // Act
            const form = shallow(newAnnouncement.renderForm(formikProps));
            form.find('.form-input-param').at(0).simulate('change');
            // Assert
            expect(newAnnouncement.handleChangeParameter).toHaveBeenCalled();
        });

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
