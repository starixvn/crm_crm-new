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
        commonFunc.checkInvalidMaxLengthContent = jest.fn().mockReturnValue({invalidContentMaxLength: false, textInvalidContentMaxLength: ''});
    });
    afterAll(() => {
        jest.clearAllMocks();
    });

    const initProps = {
        announcementTemplate: [{
            announcementId: 65014, notificationTemplateName: "Special Announcement s" ,
            siteNameList: '123', currencyIdList: '1,2', headlineNameList: '1,2', sendImmediately: true
        }],
        actionAnnouncementPopup: {
            isEdit: true
        },
        settings: {
            currencyList: [{id: 11, name: "ABC"}, {id: 18, name: "ADA1"}, {id: 9, name: "AUD"}, {id: 97, name: "BDT"}],
            headlineTypeList: [{id: 0, name: "Normal"}, {id: 1, name: "VIP"}],
            siteList: [{siteID: 23, site: "222223"}, {siteID: 16, site: "611111"}, {siteID: 20, site: "722222"}]
        },
        sendMessageAnnouncementToBotEndpoint: jest.fn()
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
                headlineNameList: '1,2',
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
            const data = {
                fileName: null
            };
            const props = {
                getLanguages: jest.fn(() => promise),
                getAnnouncementTemplate: jest.fn(),
                actionParam: {
                    announcementId: 1
                },
                setCreateAnnouncement: jest.fn(),
                setEditAnnouncement: jest.fn(),
                setValidateAnnouncement: jest.fn(),
            };
            const actionAnnouncement = shallow(<ActionAnnouncement  {...props}/>).instance();
            actionAnnouncement.setState({ data: data})
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
            const promise = Promise.resolve({data: {data: [{siteNameList: '123'}], headlineNameList: '1,2', contents: [{EN: 'test en'}]}});
            const props = {
                actionAnnouncementPopup: {id: 1},
                getAnnouncementById: jest.fn(() => promise),
                actionParam: {
                    announcementId: 1
                }
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
        let actionAnnouncement;
        let uploadedFiles;
        let fileNameRemove;
      
        beforeEach(() => {
            actionAnnouncement = shallow(<ActionAnnouncement />, { disableLifecycleMethods: true });
            uploadedFiles = [new File([''], 'file1.jpg', { type: 'image/jpeg' })];
            fileNameRemove = null;
        });
      
        it('should remove fileNameRemove from invalidWidthHeight when fileNameRemove is passed as an argument', () => {
            actionAnnouncement.setState({ invalidWidthHeight: ['file1.jpg', 'file2.jpg'] });
            fileNameRemove = 'file2.jpg';
      
            actionAnnouncement.instance().setStateUploadFile(uploadedFiles, fileNameRemove);
      
            expect(actionAnnouncement.state('invalidWidthHeight')).toEqual(['file1.jpg']);
        });
      
        it('should set uploadedFiles in the actionAnnouncement state', () => {
            actionAnnouncement.instance().setStateUploadFile(uploadedFiles, fileNameRemove);
      
            expect(actionAnnouncement.state('uploadedFiles')).toEqual(uploadedFiles);
        });
      });
    
    describe('setStateUploadFile', () => {
        let actionAnnouncement;
      
        beforeEach(() => {
            actionAnnouncement = shallow(<ActionAnnouncement />, { disableLifecycleMethods: true });
        });
      
        it('should set state for valid uploaded files', () => {
            const file1 = new File(['content'], 'file1.jpg', { type: 'image/jpeg' });
            const file2 = new File(['content'], 'file2.jpg', { type: 'image/jpeg' });
        
            actionAnnouncement.instance().setStateUploadFile([file1, file2], null);
        
            // Assert
            expect(actionAnnouncement.state('invalidWidthHeight')).toEqual([]);
            expect(actionAnnouncement.state('uploadedFiles')).toEqual([file1, file2]);
        });
      
        it('should filter out invalid files based on dimensions', () => {
            const invalidFile = new File(['content'], 'invalid.jpg', { type: 'image/jpeg' });
            invalidFile.height = 3000;
        
            const validFile = new File(['content'], 'valid.jpg', { type: 'image/jpeg' });
            validFile.height = 3000;
        
            actionAnnouncement.instance().setStateUploadFile([invalidFile, validFile], null);
        
            // Assert
            expect(actionAnnouncement.state('invalidWidthHeight')).toEqual([]);
        });
      
        it('should remove a file and associated errors', () => {
            const fileToRemove = new File(['content'], 'fileToRemove.jpg', { type: 'image/jpeg' });
      
            actionAnnouncement.setState({
                invalidWidthHeight: ['fileToRemove.jpg'],
                uploadedFiles: [fileToRemove],
                errorDrafts: {
                invalidFileSizeDraft: [{ name: 'fileToRemove.jpg' }],
                invalidFileTypeDraft: [{ name: 'fileToRemove.jpg' }],
                }
            });
      
            actionAnnouncement.instance().setStateUploadFile([], 'fileToRemove.jpg');
            // Assert
            expect(actionAnnouncement.state('invalidWidthHeight')).toEqual([]);
            expect(actionAnnouncement.state('uploadedFiles')).toEqual([]);
            expect(actionAnnouncement.state('errorDrafts').invalidFileSizeDraft).toEqual([]);
            expect(actionAnnouncement.state('errorDrafts').invalidFileTypeDraft).toEqual([]);
        });
    });

    describe('changeStringToFile', () => {
        let wrapper;

        const props = {
            actionParam: {
                announcementId: 1
            }
        };
      
        beforeEach(() => {
          wrapper = shallow(<ActionAnnouncement {...props}/>, { disableLifecycleMethods: true });
        });
      
        it('should fetch and process files successfully', async () => {
          // Mock data and responses
          const data = {
            fileNames: 'file1.jpg,file2.png'
          }
          wrapper.instance().setState({ data: data});
          const validResponseBlob = new Blob(['valid content'], { type: 'image/jpeg' });
      
          // Mock fetch function
          global.fetch = jest.fn();
          global.fetch.mockResolvedValueOnce({ blob: () => Promise.resolve(validResponseBlob) });
      
          // Mock Site.resolveClientUrl function
          const originalSiteResolveClientUrl = Site.resolveClientUrl;
          Site.resolveClientUrl = jest.fn((path) => `www/dist/images/announcement/123/${path}`);
      
          // Mock validFileExtension and validFileSize functions
          const originalValidFileExtension = ActionAnnouncement.prototype.validFileExtension;
          const originalValidFileSize = ActionAnnouncement.prototype.validFileSize;
      
          ActionAnnouncement.prototype.validFileExtension = jest.fn(() => true);
          ActionAnnouncement.prototype.validFileSize = jest.fn(() => true);
      
          // Call the method
          await wrapper.instance().changeStringToFile();
      
          // Assertions for state changes
          expect(wrapper.state('invalidWidthHeight')).toEqual([]);
          expect(wrapper.state('errorDrafts').invalidFileTypeDraft).toEqual([]);
          expect(wrapper.state('errorDrafts').invalidFileSizeDraft).toEqual([]);
      
          // Restore original functions
          Site.resolveClientUrl = originalSiteResolveClientUrl;
          ActionAnnouncement.prototype.validFileExtension = originalValidFileExtension;
          ActionAnnouncement.prototype.validFileSize = originalValidFileSize;
        });
      
        it('should handle invalid file extension', async () => {
          // Mock data with an invalid file extension
          const data = {
            fileNames: 'file1.jpg'
          }
          wrapper.instance().setState({ data: data});
      
          // Mock fetch function
          global.fetch = jest.fn();
          global.fetch.mockResolvedValueOnce({ blob: () => Promise.resolve(new Blob()) });
      
          // Mock Site.resolveClientUrl function
          Site.resolveClientUrl = jest.fn((path) => `www/dist/images/announcement/123/${path}`);
      
          // Mock validFileExtension and validFileSize functions
          ActionAnnouncement.prototype.validFileExtension = jest.fn(() => false);
          ActionAnnouncement.prototype.validFileSize = jest.fn(() => true);
      
          // Call the method
          await wrapper.instance().changeStringToFile();
      
          // Assertions for state changes
          expect(wrapper.state('invalidWidthHeight')).toEqual([]);
          expect(wrapper.state('errorDrafts').invalidFileTypeDraft).toHaveLength(0);
          expect(wrapper.state('errorDrafts').invalidFileSizeDraft).toEqual([]);
      
          // Restore original functions
        //   Site.resolveClientUrl = originalSiteResolveClientUrl;
        //   ActionAnnouncement.prototype.validFileExtension = originalValidFileExtension;
        //   ActionAnnouncement.prototype.validFileSize = originalValidFileSize;
        });
      
        // Add more test cases to cover additional scenarios (e.g., invalid file size)
      
        afterEach(() => {
          global.fetch.mockClear();
        });
      
        afterAll(() => {
          delete global.fetch;
          Site.resolveClientUrl = originalSiteResolveClientUrl;
        });
    });

    describe('handleChangeNotificationTemplate', () => {
        it('should call exact function', () => {
            // Arrange
            const event = {
                preventDefault: jest.fn(),
                target: {value: 'value'}
            };
            const actionAnnouncement = shallow(<ActionAnnouncement />, { disableLifecycleMethods: true }).instance();
            actionAnnouncement.formik = {
                setFieldValue: jest.fn()
            };
            actionAnnouncement.getContentByTemplateId = jest.fn();

            //Act
            actionAnnouncement.handleChangeNotificationTemplate(event);

            // Assert
            expect(actionAnnouncement.formik.setFieldValue).toHaveBeenCalledTimes(2);
            expect(actionAnnouncement.getContentByTemplateId).toHaveBeenCalled();
            expect(actionAnnouncement.state.isChangeTemplate).toEqual(true);

        });
    });

    describe('getContentByTemplateId', () => {
        it('should call exact function', () => {
            // Arrange
            const props = {
                announcementTemplate: {
                    contents: [{notificationTemplateId : 1, language: 'EN', title: 'title'}],
                    notificationTemplates: [{notificationTemplateId: 1, title: 'title'}]
                },
                actionParam: {
                    announcementId: 1
                }
            };
            const state = {tab: 'EN'};
            commonFunc.setValueContent = jest.fn();
            const actionAnnouncement = shallow(<ActionAnnouncement {...props}/>, { disableLifecycleMethods: true }).instance();
            actionAnnouncement.setState(state);
            actionAnnouncement.formik = { setFieldValue: jest.fn() };
            actionAnnouncement.handleGetParameters = jest.fn();

            //Act
            actionAnnouncement.getContentByTemplateId(1);

            // Assert
            expect(actionAnnouncement.formik.setFieldValue).toHaveBeenCalledTimes(1);
            expect(actionAnnouncement.handleGetParameters).toHaveBeenCalled();
        });
    });

    describe('handleGetParameters', () => {
        it('set exact params', () => {
            // Arrange
            const actionAnnouncement = shallow(<ActionAnnouncement />, { disableLifecycleMethods: true }).instance();

            //Act
            actionAnnouncement.handleGetParameters("{test param}");

            // Assert
            expect(actionAnnouncement.state.parameters).toEqual(["{test param}"]);
        });
    });

    describe('handleChangeTab', () => {
        it('call exact function', () => {
            // Arrange
            const actionAnnouncement = shallow(<ActionAnnouncement />, { disableLifecycleMethods: true }).instance();
            actionAnnouncement.formik = {
                values: { content: {EN: 'test'} },
                setFieldValue: jest.fn()
            };
            actionAnnouncement.handleGetParameters = jest.fn();
            //Act
            actionAnnouncement.handleChangeTab('EN');

            // Assert
            expect(actionAnnouncement.state.tab).toEqual('EN');
            expect(actionAnnouncement.handleGetParameters).toHaveBeenCalled();
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
            const actionAnnouncement = shallow(<ActionAnnouncement />, { disableLifecycleMethods: true }).instance();
            actionAnnouncement.headlineInputRef = {
                current: {focus: jest.fn()}
            };
            actionAnnouncement.handleSetValueHeadline = jest.fn();
            actionAnnouncement.setState(state);
            // Act
            actionAnnouncement.handlePasteGroupHeadline(event);
            jest.runAllTimers();
            // Assert
            expect(actionAnnouncement.headlineInputRef.current.focus).toHaveBeenCalled();
        });
    });

    describe('handleSetValueHeadline', () => {
        it('should setState and reset current value', () => {
            // Arrange
            const state = {
                headlineGroups: []
            };
            const actionAnnouncement = shallow(<ActionAnnouncement />, { disableLifecycleMethods: true }).instance();
            actionAnnouncement.headlineInputRef = {
                current: {value: '1', focus: jest.fn()}
            };
            actionAnnouncement.setState(state);
            // Act
            actionAnnouncement.handleSetValueHeadline(['1, 2']);
            // Assert
            expect(actionAnnouncement.state.headlineGroups).toEqual(['1, 2']);
            expect(actionAnnouncement.headlineInputRef.current.value).toEqual('');
        });
    });

    describe('handleChangeInputHeadline', () => {
        it('should setState and reset current value', () => {
            // Arrange
            const state = {
                headlineGroups: []
            };
            const event = {target: {value: 'value,'}, preventDefault: jest.fn()};
            const actionAnnouncement = shallow(<ActionAnnouncement />, { disableLifecycleMethods: true }).instance();
            actionAnnouncement.setState(state);
            actionAnnouncement.handleSetValueHeadline = jest.fn();
            // Act
            actionAnnouncement.handleChangeInputHeadline(event);
            // Assert
            expect(actionAnnouncement.handleSetValueHeadline).toHaveBeenCalledWith(['value']);
            expect(event.preventDefault).toHaveBeenCalled();
        });

        it('should setState when keyCode equal 8', () => {
            // Arrange
            const state = {
                headlineGroups: [1,2,3]
            };
            const event = {keyCode: 8, preventDefault: jest.fn(), target: {value: ''}};
            const actionAnnouncement = shallow(<ActionAnnouncement />, { disableLifecycleMethods: true }).instance();
            actionAnnouncement.setState(state);
            actionAnnouncement.setState = jest.fn();
            // Act
            actionAnnouncement.handleChangeInputHeadline(event);
            // Assert
            expect(actionAnnouncement.setState).toHaveBeenCalled();
        });
    });

    describe('handleBlurInputHeadline', () => {
        it('should setState and reset current value', () => {
            // Arrange
            const state = {
                headlineGroups: []
            };
            const event = {target: {value: 'value'}, preventDefault: jest.fn()};
            const actionAnnouncement = shallow(<ActionAnnouncement />, { disableLifecycleMethods: true }).instance();
            actionAnnouncement.setState(state);
            actionAnnouncement.handleSetValueHeadline = jest.fn();
            actionAnnouncement.headlineInputRef = {
                current: {value: '1', focus: jest.fn()}
            };
            // Act
            actionAnnouncement.handleBlurInputHeadline(event);
            // Assert
            expect(actionAnnouncement.state.headlineGroups).toEqual(['value']);
            expect(actionAnnouncement.headlineInputRef.current.value).toEqual('');
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
            const actionAnnouncement = shallow(<ActionAnnouncement />, { disableLifecycleMethods: true }).instance();
            actionAnnouncement.setState(state);
            // Act
            actionAnnouncement.handleRemoveHeadline(event, '1');
            // Assert
            expect(actionAnnouncement.state.headlineGroups).toEqual(['2']);
        });
    });

    describe('handleOptionChange', () => {
        it('should call setState', () => {
            // Arrange
            const actionAnnouncement = shallow(<ActionAnnouncement />, { disableLifecycleMethods: true }).instance();
            actionAnnouncement.setState = jest.fn();
            actionAnnouncement.formik = { setFieldValue: jest.fn() };
            // Act
            actionAnnouncement.handleOptionChange('site', '1');
            // Assert
            expect(actionAnnouncement.formik.setFieldValue).toHaveBeenCalled();
        });
    });

    describe('handleDateChange', () => {
        it('should call exact function', () => {
            // Arrange
            const actionAnnouncement = shallow(<ActionAnnouncement />, { disableLifecycleMethods: true }).instance();
            actionAnnouncement.formik = {setFieldValue: jest.fn()};
            // Act
            actionAnnouncement.handleDateChange('value');
            // Assert
            expect(actionAnnouncement.formik.setFieldValue).toHaveBeenCalled();
        });
    });

    describe('handleChangeParameter', () => {
        it('should call exact function', () => {
            // Arrange
            const event = {target : {name: 'param1', value: 'new value'}};
            const param = 'old value';
            const removeSpaceParam = ['param2', 'param3'];
            const state = {tab: 'tab1'};
            const actionAnnouncement = shallow(<ActionAnnouncement />, { disableLifecycleMethods: true }).instance();
            actionAnnouncement.formik = {
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
            actionAnnouncement.setState(state);
            // Act
            actionAnnouncement.handleChangeParameter(event, param, removeSpaceParam);
            // Assert
            expect(actionAnnouncement.formik.setFieldValue).toHaveBeenCalledWith('param1', 'new value');
        });
    });

    describe('handleChangeSendType', () => {
        it('should call exact function', () => {
            // Arrange
            const value = 'Send At';
            const actionAnnouncement = shallow(<ActionAnnouncement />, { disableLifecycleMethods: true }).instance();
            actionAnnouncement.formik = {
                setFieldValue: jest.fn()
            };
            actionAnnouncement.setState = jest.fn();
            // Act
            actionAnnouncement.handleChangeSendType(value);
            // Assert
            expect(actionAnnouncement.setState).toHaveBeenCalled();
        });
    });

    describe('handleCheckHeadline', () => {
        it('should call exact function', () => {
            // Arrange
            const actionAnnouncement = shallow(<ActionAnnouncement />, { disableLifecycleMethods: true }).instance();
            actionAnnouncement.setState = jest.fn();
            // Act
            actionAnnouncement.handleCheckHeadline('fieldTrue','fieldFalse');
            // Assert
            expect(actionAnnouncement.setState).toHaveBeenCalled();
        });
    });

    describe('getStateDataGrid', () => {
        it('should call exact function', () => {
            // Arrange
            const props = {
                actionParam: {
                    redirectActionParams: true
                }
            };
            const expected = {
                isLoadGrid: true,
                filterParams: true
            }
            const actionAnnouncement = shallow(<ActionAnnouncement {...props}/>, { disableLifecycleMethods: true }).instance();
            actionAnnouncement.setState = jest.fn();
            // Act
            const actual = actionAnnouncement.getStateDataGrid('fieldTrue','fieldFalse');
            // Assert
            expect(actual).toEqual(expected);
        });
    });

    describe('handleRedirectAnnouncement', () => {
        it('should call exact function', () => {
            // Arrange
            const props = {
                setIsRefresh: jest.fn(),
                setEditAnnouncement: jest.fn(),
                setValidateAnnouncement: jest.fn(),
                setCreateAnnouncement: jest.fn(),
                navigate: jest.fn(),
            };
            const actionAnnouncement = shallow(<ActionAnnouncement {...props}/>, { disableLifecycleMethods: true }).instance();
            actionAnnouncement.getStateDataGrid = jest.fn();
            // Act
            actionAnnouncement.handleRedirectAnnouncement();
            // Assert
            expect(props.setIsRefresh).toHaveBeenCalled();
            expect(props.setEditAnnouncement).toHaveBeenCalled();
            expect(props.setValidateAnnouncement).toHaveBeenCalled();
            expect(props.setCreateAnnouncement).toHaveBeenCalled();
            expect(props.navigate).toHaveBeenCalled();
        });
    });

    describe('handleClose', () => {
        it('should call exact function', () => {
            // Arrange
            const props = {
                setEditAnnouncement: jest.fn(),
                setValidateAnnouncement: jest.fn(),
                setCreateAnnouncement: jest.fn(),
                navigate: jest.fn(),
            };
            const actionAnnouncement = shallow(<ActionAnnouncement {...props}/>, { disableLifecycleMethods: true }).instance();
            actionAnnouncement.getStateDataGrid = jest.fn();
            // Act
            actionAnnouncement.handleClose();
            // Assert

            expect(props.setEditAnnouncement).toHaveBeenCalled();
            expect(props.setValidateAnnouncement).toHaveBeenCalled();
            expect(props.setCreateAnnouncement).toHaveBeenCalled();
            expect(props.navigate).toHaveBeenCalled();
        });
    });

    describe('handleSaveDraft', () => {
        it('should call exactly function when successfully', async () => {
            // Arrange
            const promise = Promise.resolve(2);
            const event = { preventDefault: jest.fn() };
            const props = {
                actionParam: {
                    announcementId: 1,
                    isEdit: true
                },
                createAnnouncement: jest.fn(() => promise),
                editAnnouncement: jest.fn(() => promise),
                editAnnouncementResult: {isSuccessful: true},
                createAnnouncementResult: {isSuccessful: true}
            };
            const formData = new FormData();
            commonFunc.getParams = jest.fn(() => formData);
            const actionAnnouncement = shallow(<ActionAnnouncement {...props}/>, { disableLifecycleMethods: true }).instance();
            actionAnnouncement.formik = {
                setSubmitting: jest.fn()
            };
            actionAnnouncement.setState = jest.fn();
            actionAnnouncement.handleRedirectAnnouncement = jest.fn();
            // Act
            actionAnnouncement.handleSaveDraft(event, {});
            await promise;
            jest.runAllTimers();
            // Assert
            expect(actionAnnouncement.handleRedirectAnnouncement).toHaveBeenCalled();
        });

        it('should call exactly function when not successfully', async () => {
            // Arrange
            const promise = Promise.resolve(2);
            const event = { preventDefault: jest.fn() };
            const props = {
                actionParam: {
                    announcementId: 1,
                    isEdit: false
                },
                createAnnouncement: jest.fn(() => promise),
                editAnnouncement: jest.fn(() => promise),
                editAnnouncementResult: {isSuccessful: false},
                createAnnouncementResult: {isSuccessful: false}
            };
            const formData = new FormData();
            commonFunc.getParams = jest.fn(() => formData);
            const actionAnnouncement = shallow(<ActionAnnouncement {...props}/>, { disableLifecycleMethods: true }).instance();
            actionAnnouncement.setState = jest.fn();
            actionAnnouncement.formik = { setSubmitting: jest.fn() };
            actionAnnouncement.handleRedirectAnnouncement = jest.fn();
            // Act
            actionAnnouncement.handleSaveDraft(event, {});
            await promise;
            jest.runAllTimers();
            // Assert
            expect(actionAnnouncement.formik.setSubmitting).toHaveBeenCalled();
        });
    });

    describe('renderMessage', () => {
        it('should return exact value when result is successfully', () => {
            // Arrange
            const actionAnnouncement = shallow(<ActionAnnouncement />, { disableLifecycleMethods: true }).instance();
            // Act
            const actual = actionAnnouncement.renderMessage({isSuccessful: true, message: 'test1;test2'});
            // Assert
            expect(actual).toEqual(['test1;test2']);
        });

        it('should return exact value when result is not successfully', () => {
            // Arrange
            const actionAnnouncement = shallow(<ActionAnnouncement />, { disableLifecycleMethods: true }).instance();
            // Act
            const actual = actionAnnouncement.renderMessage({isSuccessful: false, message: 'test1;test2'});
            // Assert
            expect(actual).toEqual(['test1', 'test2']);
        });
    });

    describe('renderContentConfirm', () => {
        const confirmActionDialog = {
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
            const actionAnnouncement = shallow(<ActionAnnouncement />, { disableLifecycleMethods: true }).instance();
            actionAnnouncement.renderContentType = jest.fn(() => contentType);
            actionAnnouncement.setState({ confirmActionDialog: confirmActionDialog });
            actionAnnouncement.formik = {
                values:{
                    sendType: 'Send At',
                    sendDate: new Date('2023-01-01')
                }
            };

            // Act
            const actual = actionAnnouncement.renderContentConfirm();
            // Assert
        });

        it('should return exact content when send type is not Send At', () => {
            // Arrange
            const actionAnnouncement = shallow(<ActionAnnouncement />, { disableLifecycleMethods: true }).instance();
            actionAnnouncement.renderContentType = jest.fn(() => contentType);
            actionAnnouncement.setState({ confirmActionDialog: confirmActionDialog });
            actionAnnouncement.formik = {
                values:{
                    sendType: 'Send Immediately'
                }
            };

            // Act
            const actual = actionAnnouncement.renderContentConfirm();
            // Assert
        });
    });

    describe('handleSubmit', () => {
        it('should call setState when successfully', async () => {
            // Arrange
            const promise = Promise.resolve(2);
            const setSubmitting = jest.fn();
            const props = {
                actionAnnouncementPopup: {isEdit: true},
                actionParam: {
                    announcementId: 1
                },
                validateAnnouncement: jest.fn(() => promise),
                validateAnnouncementResult: [{test:1}],
                actionParam: {
                    announcementId: 1,
                    isEdit: true
                }
            };
            const formData = new FormData();
            commonFunc.getParams = jest.fn(() => formData);
            const actionAnnouncement = shallow(<ActionAnnouncement {...props}/>, { disableLifecycleMethods: true }).instance();
            actionAnnouncement.formik = {
                setSubmitting: jest.fn()
            };
            actionAnnouncement.setState = jest.fn();
            actionAnnouncement.handleCheckValidAllContent = jest.fn(() => false);
            // Act
            actionAnnouncement.handleSubmit({content: {}}, {setSubmitting});
            await promise;
            jest.runAllTimers();

            // Assert
            expect(actionAnnouncement.setState).toHaveBeenCalled();
            expect(props.validateAnnouncement).toHaveBeenCalled();
        });

        it('should call setState not successfully', async () => {
            // Arrange
            const promise = Promise.resolve(2);
            const setSubmitting = jest.fn();
            const props = {
                actionAnnouncementPopup: {isEdit: false},
                actionParam: {
                    announcementId: 1
                },
                validateAnnouncement: jest.fn(() => promise),
                validateAnnouncementResult: [{test:1}],
                actionParam: {
                    announcementId: 1,
                    isEdit: false
                }
            };
            const formData = new FormData();
            commonFunc.getParams = jest.fn(() => formData);
            const actionAnnouncement = shallow(<ActionAnnouncement {...props}/>, { disableLifecycleMethods: true }).instance();
            actionAnnouncement.formik = {
                setSubmitting: jest.fn()
            };
            actionAnnouncement.setState = jest.fn();
            actionAnnouncement.handleCheckValidAllContent = jest.fn(() => false);
            actionAnnouncement.formik = { setSubmitting: jest.fn() };
            // Act
            actionAnnouncement.handleSubmit({content: {}}, {setSubmitting});
            await promise;
            jest.runAllTimers();

            // Assert
            expect(actionAnnouncement.formik.setSubmitting).toHaveBeenCalled();
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

            const actionAnnouncement = shallow(<ActionAnnouncement {...props}/>, { disableLifecycleMethods: true }).instance();

            // Act
            const actual = actionAnnouncement.renderContentType(contentConfirm);

            // Assert
            expect(actual.headlineType).toBe('Type2');
            expect(actual.currencies).toBe('USD, EUR');
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
                editAnnouncementResult: {isSuccessful: true},
                createAnnouncement : jest.fn(() => promise),
                createAnnouncementResult: {isSuccessful: true},
                actionParam: {
                    announcementId: 1,
                    isEdit: true
                },
                sendMessageAnnouncementToBotEndpoint: jest.fn()
            };
            const state = {
                confirmActionDialog: {
                    params: {}
                }
            };
            const actionAnnouncement = shallow(<ActionAnnouncement {...props} />, { disableLifecycleMethods: true }).instance();
            actionAnnouncement.setState(state);
            actionAnnouncement.formik = {
                setSubmitting: jest.fn(),
                values:{sendType: 'Send Now'}
            };
            actionAnnouncement.handleRedirectAnnouncement = jest.fn();
            actionAnnouncement.handleCloseConfirmEditDialog = jest.fn();

            // Act
            actionAnnouncement.handleConfirmActionDialog();
            await promise;
            jest.runAllTimers();

            // Assert
            expect(props.sendMessageAnnouncementToBotEndpoint).toHaveBeenCalled();
        });

        it('should call exact function when create is not successful', async () => {
            // Arrange
            const promise = Promise.resolve({isSuccessful: false});
            const props = {
                editAnnouncement: jest.fn(() => promise),
                actionAnnouncementPopup: {isEdit: true},
                editAnnouncementResult: {isSuccessful: false},
                createAnnouncement : jest.fn(() => promise),
                createAnnouncementResult: {isSuccessful: false},
                actionParam: {
                    announcementId: 1,
                    isEdit: false
                },
                sendMessageAnnouncementToBotEndpoint: jest.fn()
            };
            const state = {
                confirmActionDialog: {
                    params: {}
                }
            };
            const actionAnnouncement = shallow(<ActionAnnouncement {...props} />, { disableLifecycleMethods: true }).instance();
            actionAnnouncement.setState(state);
            actionAnnouncement.formik = {
                setSubmitting: jest.fn(),
                values:{sendType: 'Send At'}
            };
            actionAnnouncement.handleRedirectAnnouncement = jest.fn();
            actionAnnouncement.handleCloseConfirmEditDialog = jest.fn();

            // Act
            actionAnnouncement.handleConfirmActionDialog();
            await promise;
            jest.runAllTimers();

            // Assert
            expect(actionAnnouncement.formik.setSubmitting).toHaveBeenCalled();
        });
    });

    describe('handleCloseConfirmEditDialog', () => {
        it('should call exact function', () => {
            // Arrange
            const actionAnnouncement = shallow(<ActionAnnouncement />, { disableLifecycleMethods: true }).instance();
            actionAnnouncement.formik = {
                setSubmitting: jest.fn()
            };
            // Act
            actionAnnouncement.handleCloseConfirmEditDialog();
            // Assert
            expect(actionAnnouncement.state.confirmActionDialog).toEqual({ show: false, params: null, content: null });
            expect(actionAnnouncement.formik.setSubmitting).toHaveBeenCalledWith(false);
        });
    });

    describe('getContentTab', () => {
        it('should call exact function', () => {
            // Arrange
            commonFunc.setValueContent = jest.fn();
            const actionAnnouncement = shallow(<ActionAnnouncement />, { disableLifecycleMethods: true }).instance();
            actionAnnouncement.formik = {setFieldValue: jest.fn()};
            // Act
            actionAnnouncement.getContentTab({});
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
            const actionAnnouncement = shallow(<ActionAnnouncement {...props}/>, { disableLifecycleMethods: true }).instance();
            // Act
            actionAnnouncement.getLanguages();
            await promise;
            // Assert
            expect(actionAnnouncement.state.languages).toEqual([{settingValue: 'EN'}]);
            expect(actionAnnouncement.state.tab).toEqual('EN');
        });
    });

    describe('getContentByLanguage', () => {
        it('should set exact state', () => {
            // Arrange
            const props = {
                actionParam: {
                    isEdit: true
                }
            };
            const contents = [
                { languageCode: 'en', content: 'English Content' },
                { languageCode: 'fr', content: 'French Content' }
            ];
            const actionAnnouncement = shallow(<ActionAnnouncement {...props}/>, { disableLifecycleMethods: true });
            actionAnnouncement.instance().handleGetParameters = jest.fn();

            // Act
            actionAnnouncement.instance().getContentByLanguage(contents);

            // Assert
            expect(actionAnnouncement.state('isChangeTemplate')).toBe(true);
            expect(actionAnnouncement.state('content')).toEqual({ en: 'English Content', fr: 'French Content' });
            expect(actionAnnouncement.state('cloneContent')).toEqual({ en: 'English Content', fr: 'French Content' });
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
                    currencyList: [{id: '1', name: 'test'}],
                    headlineNameList: ''
                },
                getSettings: jest.fn(() => promise)
            };
            const announcement = {
                siteNameList: ['Site1'],
                currencyIdList: '1,2',
                // Add more announcement data as needed
            };
           
            const actionAnnouncement = shallow(<ActionAnnouncement {...props}/>, { disableLifecycleMethods: true }).instance();
            actionAnnouncement.setState(state);
            // Act
            actionAnnouncement.getSettingOption(announcement);
            await promise;
            jest.runAllTimers();
            // Assert
            expect(actionAnnouncement.state.siteOptions).toEqual([{checked: false, id: '1', name: '1'}]);
        });
    });

    describe('checkShowHeadlineGroup', () => {
        it('should return true if siteNameList is defined', () => {
            const announcement = { siteNameList: ['Site1', 'Site2'] };
            const actionAnnouncement = shallow(<ActionAnnouncement />, { disableLifecycleMethods: true }).instance();
            const actual = actionAnnouncement.checkShowHeadlineGroup(announcement);
            expect(actual).toBe(true);
        });
      
        it('should return true if currencyIdList is defined', () => {
            const announcement = { currencyIdList: '1,2,3' };
            const actionAnnouncement = shallow(<ActionAnnouncement />, { disableLifecycleMethods: true }).instance();
            const actual = actionAnnouncement.checkShowHeadlineGroup(announcement);
            expect(actual).toBe(true);
        });
      
        it('should return true if headlineType is a number', () => {
            const announcement = { headlineType: 123 };
            const actionAnnouncement = shallow(<ActionAnnouncement />, { disableLifecycleMethods: true }).instance();
            const actual = actionAnnouncement.checkShowHeadlineGroup(announcement);
            expect(actual).toBe(true);
        });
      
        it('should return false if none of the conditions are met', () => {
            const announcement = {};
            const actionAnnouncement = shallow(<ActionAnnouncement />, { disableLifecycleMethods: true }).instance();
            const actual = actionAnnouncement.checkShowHeadlineGroup(announcement);
            expect(actual).toBe(false);
        });
      
        it('should return true if any of the conditions are met', () => {
            const announcement = { siteNameList: ['Site1'], headlineType: 456 };
            const actionAnnouncement = shallow(<ActionAnnouncement />, { disableLifecycleMethods: true }).instance();
            const actual = actionAnnouncement.checkShowHeadlineGroup(announcement);
            expect(actual).toBe(true);
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
            headlineGroups: ['headline1'],
            confirmActionDialog: true
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
            },
            actionParam: {
                isEdit: true
            },
            editAnnouncementResult: {isSuccessful: true},
            createAnnouncementResult: {isSuccessful: true}
        };

        it('should call exact function when change parameter ', () => {
            // Arrange
            const actionAnnouncement = shallow(<ActionAnnouncement {...props}/>, { disableLifecycleMethods: true }).instance();
            actionAnnouncement.formik = {
                setSubmitting: jest.fn()
            };
            actionAnnouncement.handleChangeParameter = jest.fn();
            actionAnnouncement.handleCloseConfirmEditDialog = jest.fn();
            actionAnnouncement.handleConfirmActionDialog = jest.fn();
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
