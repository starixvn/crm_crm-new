import React from 'react';
import { shallow } from 'enzyme';
import { ActionAnnouncement } from '../ActionAnnouncement';
import toJson from 'enzyme-to-json';
import { Formik } from 'formik';
import LangHelper from '@jsroot/common/langHelper';
import Site from '@jsroot/common/site';
import * as commonFunc from '../../common.functions';
import DateTimeService from '@jsroot/common/dateTimeService';

describe('ActionAnnouncement', () => {
    beforeAll(() =>{
        jest.useFakeTimers();
        Site.blockUI = jest.fn();
        Site.unblockUI = jest.fn();
        Site.handleAxiosError = jest.fn();
        LangHelper.getResource = jest.fn((key) => key);
    });
    afterAll(() => {
        jest.clearAllMocks();
    });

    const initProps = {
        announcementTemplate: [{announcementId: 65014, notificationTemplateName: "Special Announcement s" }],
        actionAnnouncementPopup: {
            isEdit: true
        },
        settings: {
            currencyList: [{id: 11, name: "ABC"}, {id: 18, name: "ADA1"}, {id: 9, name: "AUD"}, {id: 97, name: "BDT"}],
            headlineTypeList: [{id: 0, name: "Normal"}, {id: 1, name: "VIP"}],
            siteList: [{siteID: 23, site: "222223"}, {siteID: 16, site: "611111"}, {siteID: 20, site: "722222"}]
        }
    };

    describe('Render', () => {
        const state = {
            languages: [{settingId:50000, settingName: 'NotificationTemplateLanguage', settingValue: 'EN'}],
            invalidWidthHeight: false,
            uploadedFiles: ['file1, file2'],
            data: {
                title: 'title',
                notificationTemplateName: 'notificationTemplateName',
                notificationTemplateId: 1,
                siteNameList: [],
                sendDate: new Date(),
                fileName: 'fileName'
            },
            content: {EN: 'EN'}
        };

        it('should render correctly', () => {
            // Arrange
            // Act
            const container = shallow(<ActionAnnouncement />, { disableLifecycleMethods: true });

            // Assert
            expect(toJson(container)).toMatchSnapshot();
        });

        it('should render null', () => {
            // Arrange
            const props = {
                settings: null,
                announcementTemplate : null
            };

            // Act
            const container = shallow(<ActionAnnouncement {...props}/>, { disableLifecycleMethods: true });
            const actual = container.instance().render();
            // Assert
            expect(actual).toEqual(null);
        });

        it('render formik component', () => {
            // Arrange
            const actionAnnouncement = shallow(<ActionAnnouncement {...initProps}/>, { disableLifecycleMethods: true });
            actionAnnouncement.instance().setState(state);
            actionAnnouncement.instance().formik = {
                values:{
                    sendType: 'Send At',
                    sendDate: new Date('2023-01-01')
                }
            };

            // Act
            actionAnnouncement.instance().render();
            // Assert
            expect(actionAnnouncement.find(Formik).length).toBe(1);
        });

        it('should call correct functions when validate', () => {
            // Arrange
            const actionAnnouncement = shallow(<ActionAnnouncement {...initProps}/>, { disableLifecycleMethods: true });
            const values = {};
            actionAnnouncement.instance().setState(state);
            
            commonFunc.validateFormik = jest.fn(() => 'test');

            // Act
            actionAnnouncement.instance().render();
            actionAnnouncement.find(Formik).props().validate(values);

            // Assert
            expect(actionAnnouncement.find(Formik).length).toBe(1);
            expect(commonFunc.validateFormik).toHaveBeenCalledTimes(1);
        });
    });

    describe('componentDidMount', () => {
        it('should call exact function', async() => {
            // Arrange
            const promise = Promise.resolve([{settingValue: 'EN'}]);
            const props = {
                getLanguages: jest.fn(() => promise),
                getAnnouncementTemplate: jest.fn()
            };
            const actionAnnouncement = shallow(<ActionAnnouncement  {...props}/>).instance();
            actionAnnouncement.getLanguages = jest.fn();
            actionAnnouncement.getAnnounceDetail = jest.fn();
            
            //Act
            await actionAnnouncement.componentDidMount();
            await promise;

            // Assert
            expect(props.getAnnouncementTemplate).toHaveBeenCalled();
            expect(actionAnnouncement.getLanguages).toHaveBeenCalled();
            expect(actionAnnouncement.getAnnounceDetail).toHaveBeenCalled();
        });
    });

    describe('getAnnounceDetail', () => {
        it('should call exact function', async() => {
            // Arrange
            const promise = Promise.resolve({data: {data: [{siteNameList: '123'}], contents: [{EN: 'test en'}]}});
            const props = {
                actionAnnouncementPopup: {id: 1},
                getAnnouncementById: jest.fn(() => promise)
            };
            const actionAnnouncement = shallow(<ActionAnnouncement  {...props}/>, { disableLifecycleMethods: true }).instance();
            actionAnnouncement.getContentByLanguage = jest.fn();
            actionAnnouncement.getSettingOption = jest.fn();
            //Act
            actionAnnouncement.getAnnounceDetail();
            await promise;
            jest.runAllTimers();

            // Assert
            expect(actionAnnouncement.getContentByLanguage).toHaveBeenCalled();
            expect(actionAnnouncement.getSettingOption).toHaveBeenCalled();
        });
    });

    describe('setStateUploadFile', () => {
        let newAnnouncement;
        let uploadedFiles;
        let fileNameRemove;
      
        beforeEach(() => {
            newAnnouncement = shallow(<ActionAnnouncement />, { disableLifecycleMethods: true });
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
            const newAnnouncement = shallow(<ActionAnnouncement />, { disableLifecycleMethods: true }).instance();
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
            const state = {tab: 'EN'};
            commonFunc.setValueContent = jest.fn();
            const newAnnouncement = shallow(<ActionAnnouncement {...props}/>, { disableLifecycleMethods: true }).instance();
            newAnnouncement.setState(state);
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
            const newAnnouncement = shallow(<ActionAnnouncement />, { disableLifecycleMethods: true }).instance();

            //Act
            newAnnouncement.handleGetParameters("{test param}");

            // Assert
            expect(newAnnouncement.state.parameters).toEqual(["{test param}"]);
        });
    });

    describe('handleChangeTab', () => {
        it('call exact function', () => {
            // Arrange
            const newAnnouncement = shallow(<ActionAnnouncement />, { disableLifecycleMethods: true }).instance();
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
            const newAnnouncement = shallow(<ActionAnnouncement />, { disableLifecycleMethods: true }).instance();
            newAnnouncement.headlineInputRef = {
                current: {focus: jest.fn()}
            };
            newAnnouncement.handleSetValueHeadline = jest.fn();
            newAnnouncement.setState(state);
            // Act
            newAnnouncement.handlePasteGroupHeadline(event);
            jest.runAllTimers();
            // Assert
            expect(newAnnouncement.headlineInputRef.current.focus).toHaveBeenCalled();
        });
    });

    describe('handleSetValueHeadline', () => {
        it('should setState and reset current value', () => {
            // Arrange
            const state = {
                headlineGroups: []
            };
            const newAnnouncement = shallow(<ActionAnnouncement />, { disableLifecycleMethods: true }).instance();
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
            const newAnnouncement = shallow(<ActionAnnouncement />, { disableLifecycleMethods: true }).instance();
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
            const newAnnouncement = shallow(<ActionAnnouncement />, { disableLifecycleMethods: true }).instance();
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
            const newAnnouncement = shallow(<ActionAnnouncement />, { disableLifecycleMethods: true }).instance();
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
            const newAnnouncement = shallow(<ActionAnnouncement />, { disableLifecycleMethods: true }).instance();
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
            const newAnnouncement = shallow(<ActionAnnouncement />, { disableLifecycleMethods: true }).instance();
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
            const newAnnouncement = shallow(<ActionAnnouncement />, { disableLifecycleMethods: true }).instance();
            newAnnouncement.formik = {
                setFieldValue: jest.fn(),
                values: {
                    cloneContent: {
                      tab1: 'content with old value param1 and param2',
                      tab2: 'content with old value param1 and param3'
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
            const newAnnouncement = shallow(<ActionAnnouncement />, { disableLifecycleMethods: true }).instance();
            // Act
            const actual = newAnnouncement.renderMessage({isSuccessful: true, message: 'test1;test2'});
            // Assert
            expect(actual).toEqual(['test1;test2']);
        });

        it('should return exact value when result is not successfully', () => {
            // Arrange
            const newAnnouncement = shallow(<ActionAnnouncement />, { disableLifecycleMethods: true }).instance();
            // Act
            const actual = newAnnouncement.renderMessage({isSuccessful: false, message: 'test1;test2'});
            // Assert
            expect(actual).toEqual(['test1', 'test2']);
        });
    });

    describe('renderContentConfirm', () => {
        it('should return exact content when send type is Send At', () => {
            // Arrange
            DateTimeService.toLongDateTimeFormat = jest.fn(() => new Date('2023-01-01'));
            const newAnnouncement = shallow(<ActionAnnouncement />, { disableLifecycleMethods: true }).instance();
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
            const newAnnouncement = shallow(<ActionAnnouncement />, { disableLifecycleMethods: true }).instance();
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

    describe('handleSubmit', () => {
        it('should call setState', () => {
            // Arrange
            const setSubmitting = jest.fn();
            const props = {
                actionAnnouncementPopup: {isEdit: true}
            };
            const formData = new FormData();
            commonFunc.getParams = jest.fn(() => formData);
            const newAnnouncement = shallow(<ActionAnnouncement {...props}/>, { disableLifecycleMethods: true }).instance();
            newAnnouncement.setState = jest.fn();
            // Act
            newAnnouncement.handleSubmit({}, {setSubmitting});
            // Assert
            expect(newAnnouncement.setState).toHaveBeenCalled();
        });
    });

    describe('handleConfirmActionDialog', () => {
        it('should call exact function when create is successful', async () => {
            // Arrange
            const promise = Promise.resolve({isSuccessful: true});
            const props = {
                onSuccess: jest.fn(),
                actionAnnouncementPopup: {isEdit: true},
                editAnnouncement : jest.fn(() => promise),
                editAnnouncementResult: {isSuccessful: true}
            };
            const state = {
                confirmActionDialog: {
                    params: {}
                }
            };
            const newAnnouncement = shallow(<ActionAnnouncement {...props} />, { disableLifecycleMethods: true }).instance();
            newAnnouncement.setState(state);
            newAnnouncement.formik = {
                setSubmitting: jest.fn()
            };

            // Act
            newAnnouncement.handleConfirmActionDialog();
            await promise;
            jest.runAllTimers();

            // Assert
            expect(props.onSuccess).toHaveBeenCalled();
        });

        it('should call exact function when create is not successful', async () => {
            // Arrange
            const promise = Promise.resolve({isSuccessful: false});
            const props = {
                editAnnouncement: jest.fn(() => promise),
                actionAnnouncementPopup: {isEdit: true},
                editAnnouncementResult: {isSuccessful: false}
            };
            const state = {
                confirmActionDialog: {
                    params: {}
                }
            };
            const newAnnouncement = shallow(<ActionAnnouncement {...props} />, { disableLifecycleMethods: true }).instance();
            newAnnouncement.setState(state);
            newAnnouncement.formik = {
                setSubmitting: jest.fn()
            };
            // Act
            newAnnouncement.handleConfirmActionDialog();
            await promise;
            jest.runAllTimers();

            // Assert
            expect(newAnnouncement.formik.setSubmitting).toHaveBeenCalled();
        });
    });

    describe('handleCloseConfirmEditDialog', () => {
        it('should call exact function', () => {
            // Arrange
            const newAnnouncement = shallow(<ActionAnnouncement />, { disableLifecycleMethods: true }).instance();
            newAnnouncement.formik = {
                setSubmitting: jest.fn()
            };
            // Act
            newAnnouncement.handleCloseConfirmEditDialog();
            // Assert
            expect(newAnnouncement.state.confirmActionDialog).toEqual({ show: false, params: null });
            expect(newAnnouncement.formik.setSubmitting).toHaveBeenCalledWith(false);
        });
    });

    describe('getContentTab', () => {
        it('should call exact function', () => {
            // Arrange
            commonFunc.setValueContent = jest.fn();
            const newAnnouncement = shallow(<ActionAnnouncement />, { disableLifecycleMethods: true }).instance();
            newAnnouncement.formik = {setFieldValue: jest.fn()};
            // Act
            newAnnouncement.getContentTab({});
            // Assert
            expect(commonFunc.setValueContent).toHaveBeenCalled();
        });
    });

    describe('getLanguages', () => {
        it('should call exact function when call finished', async () => {
            // Arrange
            const promise = Promise.resolve([{settingValue: 'EN'}]);
            const props = {
                getLanguages: jest.fn(() => promise)
            };
            commonFunc.mapLabelLanguage = jest.fn(() => [{settingValue: 'EN'}]);
            const newAnnouncement = shallow(<ActionAnnouncement {...props}/>, { disableLifecycleMethods: true }).instance();
            // Act
            newAnnouncement.getLanguages();
            await promise;
            // Assert
            expect(newAnnouncement.state.languages).toEqual([{settingValue: 'EN'}]);
            expect(newAnnouncement.state.tab).toEqual('EN');
        });
    });

    describe('getContentByLanguage', () => {
        it('should set exact state', () => {
            // Arrange
            const contents = [{
                languageCode: 'EN',
                content: 'content'
            }];
            const newAnnouncement = shallow(<ActionAnnouncement />, { disableLifecycleMethods: true }).instance();
            // Act
            newAnnouncement.getContentByLanguage(contents);
            // Assert
            expect(newAnnouncement.state.content).toEqual({EN: 'content'});
        });
    });

    describe('getSettingOption', () => {
        it('should set exact state', async () => {
            // Arrange
            const promise = Promise.resolve([{settingValue: 'EN'}]);
            const state = {
                options: {
                    site: [],
                    currency: []
                }
            };
            const props = {
                settings: {
                    siteList: [{site: '1'}],
                    currencyList: [{id: '1', name: 'test'}]
                },
                getSettings: jest.fn(() => promise)
            };
           
            const newAnnouncement = shallow(<ActionAnnouncement {...props}/>, { disableLifecycleMethods: true }).instance();
            newAnnouncement.setState(state);
            // Act
            newAnnouncement.getSettingOption({});
            await promise;
            jest.runAllTimers();
            // Assert
            expect(newAnnouncement.state.siteOptions).toEqual([]);
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
            actionAnnouncementPopup: {
                isEdit: false
            },
            settings: {
                currencyList: [{id: 11, name: "ABC"}, {id: 18, name: "ADA1"}, {id: 9, name: "AUD"}, {id: 97, name: "BDT"}],
                headlineTypeList: [{id: 0, name: "Normal"}, {id: 1, name: "VIP"}],
                siteList: [{siteID: 23, site: "222223"}, {siteID: 16, site: "611111"}, {siteID: 20, site: "722222"}]
            }
        };

        it('should call exact function when change parameter ', () => {
            // Arrange
            const actionAnnouncement = shallow(<ActionAnnouncement {...props}/>, { disableLifecycleMethods: true }).instance();
            actionAnnouncement.handleChangeParameter = jest.fn();
            actionAnnouncement.setState(state);
            // Act
            const form = shallow(actionAnnouncement.renderForm(formikProps));
            form.find('.form-input-param').at(0).simulate('change');
            // Assert
            expect(actionAnnouncement.handleChangeParameter).toHaveBeenCalled();
        });

        it('should call exact function when onblur input', () => {
            // Arrange
            const actionAnnouncement = shallow(<ActionAnnouncement {...props}/>, { disableLifecycleMethods: true }).instance();
            actionAnnouncement.handleBlurInputHeadline = jest.fn();
            actionAnnouncement.setState(state);
            // Act
            const form = shallow(actionAnnouncement.renderForm(formikProps));
            form.find('.text-input-headline').simulate('blur', {});
            // Assert
            expect(actionAnnouncement.handleBlurInputHeadline).toHaveBeenCalled();
        });

        it('should focus when click', () => {
            // Arrange
            const actionAnnouncement = shallow(<ActionAnnouncement {...props}/>, { disableLifecycleMethods: true }).instance();
            actionAnnouncement.headlineInputRef = {
                current: {focus: jest.fn()}
            };
            actionAnnouncement.setState(state);
            // Act
            const form = shallow(actionAnnouncement.renderForm(formikProps));
            form.find('.headline-group-form').simulate('click');
            // Assert
            expect(actionAnnouncement.headlineInputRef.current.focus).toHaveBeenCalled();
        });

        it('should call remove headline', () => {
            // Arrange
            const actionAnnouncement = shallow(<ActionAnnouncement {...props}/>, { disableLifecycleMethods: true }).instance();
            actionAnnouncement.handleRemoveHeadline = jest.fn();
            actionAnnouncement.setState(state);
            // Act
            const form = shallow(actionAnnouncement.renderForm(formikProps));
            form.find('.fa-times').simulate('click');
            // Assert
            expect( actionAnnouncement.handleRemoveHeadline).toHaveBeenCalled();
        });
    });
});
