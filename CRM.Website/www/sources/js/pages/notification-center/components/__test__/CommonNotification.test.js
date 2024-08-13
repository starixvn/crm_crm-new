import React from 'react';
import { shallow } from 'enzyme';
import { CommonNotification } from '../CommonNotification';
import LangHelper from '@jsroot/common/langHelper';
import  * as functions from '../../common.functions';
import Site from '@jsroot/common/site';
import DateTimeService from '@jsroot/common/dateTimeService';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import ConfirmPopup from '@jsroot/components/ConfirmPopup';
import { Tabs } from 'react-bootstrap';
import CkEditor from '@jsroot/components/ckeditor/index';
import { Formik } from 'formik';
import FormikErrorMessage from '@jsroot/components/FormikErrorMessage';

describe('CommonNotification', () => {
    beforeAll(() =>{
        Site.blockUI = jest.fn();
        Site.unblockUI = jest.fn();
        Site.resolveClientUrl = jest.fn();
        Site.handleAxiosError = jest.fn();
        LangHelper.getResource = jest.fn(key => key);
        DateTimeService.toShortDateTimeFormat = jest.fn(val => val);
        functions.languageOptions = jest.fn(() => [{ name: 'us', mapLabel: 'us-language' }]);
        functions.filterAndSortSites = jest.fn(() => [{ siteType: 'mnc', siteGroupOrd: 1 }]);
        window.currentUsername = 'sa';
        jest.useFakeTimers();
    });
    afterAll(() => {
        jest.clearAllMocks();
    });

    const promise = Promise.resolve({data: {notificationDetails:[{id:1}], sites: []}});
    const initProps = {
        actionParam: {
            isOstUser: true,
            notificationId: 1,
            redirectParams: 'redirect'
        },
        isEdit: true,
        getAdmNotificationById: jest.fn(() => promise),
        setEditAdmNotification: jest.fn(),
        getSiteTicketsById: jest.fn(() => Promise.resolve({data:{}})),
        editAdmNotification: jest.fn(() => Promise.resolve({})),
        navigate: jest.fn(),
        editAdmNotificationResult: { isSuccessful: true }
    };

    describe('componentDidMount', () => {
        it('should call exactly props function', () => {
            //Arrange
            const props = {...initProps};
            const container = shallow(<CommonNotification {...props}/>).instance();
            container.getAdmNotificationDetail = jest.fn();

            //Act
            container.componentDidMount();

            //Assert
            expect(container.getAdmNotificationDetail).toHaveBeenCalled();
            expect(props.setEditAdmNotification).toHaveBeenCalled();
        });
    });

    describe('getAdmNotificationDetail', () => {
        it('should call exactly props function', async() => {
            //Arrange
            const props = {...initProps};
            const container = shallow(<CommonNotification {...props}/>, { disableLifecycleMethods: true }).instance();

            //Act
            await container.getAdmNotificationDetail();

            //Assert
            expect(container.state.data).toEqual({id:1}); 
            expect(container.state.sites).toEqual([]);
        });
    });

    describe('getParams', () => {
        it('should return exactly param', () => {
            //Arrange
            const props = {...initProps};
            const expected = {
                newContentCH: "ch",
                newContentCS: "cs",
                newContentEN: "en",
                newStatus: "New",
                newSubject: "test",
                notificationId: 1,
                subject: "test",
            };
            const container = shallow(<CommonNotification {...props}/>, { disableLifecycleMethods: true }).instance();
            container.formik = {values: {content_en: 'en', content_cs: 'cs', content_ch: 'ch', subject: 'test'}}; 

            //Act
            var actual = container.getParams('New');

            //Assert
            expect(actual).toEqual(expected); 
        });
    });

    describe('handleChangeTab', () => {
        it('should set state exactly', () => {
            //Arrange
            const props = {...initProps};
            const container = shallow(<CommonNotification {...props}/>, { disableLifecycleMethods: true }).instance();

            //Act
            container.handleChangeTab('tab1');

            //Assert
            expect(container.state.tab).toEqual('tab1'); 
        });
    });

    describe('handleOpenPopup', () => {
        it('should set state exactly', async () => {
            //Arrange
            const props = {...initProps};
            const container = shallow(<CommonNotification {...props}/>, { disableLifecycleMethods: true }).instance();

            //Act
            await container.handleOpenPopup('Credit');

            //Assert
            expect(props.getSiteTicketsById).toHaveBeenCalled();
            expect(container.state.affectedTicketPopup).toEqual({isCredit: true, show: true, siteTickets: {}});
        });
    });

    describe('handleCreateNotification', () => {
        it('should set state exactly when isSuccessful true', async () => {
            //Arrange
            const props = {...initProps};
            const container = shallow(<CommonNotification {...props}/>, { disableLifecycleMethods: true }).instance();
            container.handleClosePopup = jest.fn();
            container.formik = {setSubmitting: jest.fn()}

            //Act
            await container.handleCreateNotification('', 'message');
            jest.runAllTimers();

            //Assert
            expect(container.formik.setSubmitting).toHaveBeenCalledWith(true);
            expect(container.handleClosePopup).toHaveBeenCalled(); 
            expect(props.editAdmNotification).toHaveBeenCalled(); 
            expect(props.setEditAdmNotification).toHaveBeenCalled();
            expect(props.navigate).toHaveBeenCalled();
            expect(container.state.messageSuccessful).toEqual('message');
        });

        it('should call exactly function when isSuccessful false', async () => {
            //Arrange
            const props = {
                ...initProps,
                editAdmNotificationResult: { isSuccessful: false }
            };
            const container = shallow(<CommonNotification {...props}/>, { disableLifecycleMethods: true }).instance();
            container.handleClosePopup = jest.fn();
            container.formik = {setSubmitting: jest.fn()}

            //Act
            await container.handleCreateNotification('', 'message');
            jest.runAllTimers();

            //Assert
            expect(container.formik.setSubmitting).toHaveBeenCalledWith(false);
        });
    });

    describe('handleSaveDraft', () => {
        it('should set state exactly', async () => {
            //Arrange
            const props = {...initProps};
            const container = shallow(<CommonNotification {...props}/>, { disableLifecycleMethods: true }).instance();
            container.getParams = jest.fn(() => '');
            container.handleCreateNotification = jest.fn();

            //Act
            await container.handleSaveDraft();

            //Assert
            expect(container.handleCreateNotification).toHaveBeenCalled();
        });
    });

    describe('handleSubmitConfirm', () => {
        it('should set state exactly', async () => {
            //Arrange
            const props = {...initProps};
            const container = shallow(<CommonNotification {...props}/>, { disableLifecycleMethods: true }).instance();
            container.getParams = jest.fn(() => '');
            container.handleCreateNotification = jest.fn();

            //Act
            await container.handleSubmitConfirm();

            //Assert
            expect(container.handleCreateNotification).toHaveBeenCalled();
        });
    });

    describe('handleSaveConfirm', () => {
        it('should set state exactly', async () => {
            //Arrange
            const props = {...initProps};
            const state = {data: {status: 'New'}};
            const container = shallow(<CommonNotification {...props}/>, { disableLifecycleMethods: true }).instance();
            container.setState(state);
            container.getParams = jest.fn(() => '');
            container.handleCreateNotification = jest.fn();

            //Act
            await container.handleSaveConfirm();

            //Assert
            expect(container.handleCreateNotification).toHaveBeenCalled();
        });
    });

    describe('getStateData', () => {
        it('should set state exactly', () => {
            //Arrange
            const props = {...initProps};
            const expected = {filterParams: 'redirect', isLoadGrid: true};
            const container = shallow(<CommonNotification {...props}/>, { disableLifecycleMethods: true }).instance();

            //Act
            var actual = container.getStateData();

            //Assert
            expect(actual).toEqual(expected);
        });
    });

    describe('handleClose', () => {
        it('should set state exactly', () => {
            //Arrange
            const props = {...initProps};
            const container = shallow(<CommonNotification {...props}/>, { disableLifecycleMethods: true }).instance();
            container.getStateData = jest.fn()

            //Act
            container.handleClose();

            //Assert
            expect(props.setEditAdmNotification).toHaveBeenCalled();
            expect(props.navigate).toHaveBeenCalled();
        });
    });

    describe('handleOpenPopup', () => {
        it('should set state exactly', async () => {
            //Arrange
            const props = {...initProps};
            const expected = {isCredit: true, show: true, siteTickets: {}};
            const container = shallow(<CommonNotification {...props}/>, { disableLifecycleMethods: true }).instance();
            container.getStateData = jest.fn()

            //Act
            await container.handleOpenPopup('Credit');

            //Assert
            expect(props.getSiteTicketsById).toHaveBeenCalled();
            expect(container.state.affectedTicketPopup).toEqual(expected);
        });
    });

    describe('renderSiteSection', () => {
        it('should render exactly', () => {
            //Arrange
            const props = {...initProps};
            const sites = [{siteGroup: '1', siteNames:'siteNames', siteType: 'siteType'}];
            const title = 'title';
            const ticketCnt = 100;
            const container = shallow(<CommonNotification {...props}/>, { disableLifecycleMethods: true }).instance();
            container.handleOpenPopup = jest.fn()

            //Act
            var actual = container.renderSiteSection(sites, title, ticketCnt);
            shallow(actual).find('.link-ticket').at(0).simulate('click');

            //Assert
            expect(container.handleOpenPopup).toHaveBeenCalled();
        });

        it('should render null', () => {
            //Arrange
            const props = {...initProps};
            const sites = [];
            const title = 'title';
            const ticketCnt = 100;
            const container = shallow(<CommonNotification {...props}/>, { disableLifecycleMethods: true }).instance();
            container.handleOpenPopup = jest.fn()

            //Act
            var actual = container.renderSiteSection(sites, title, ticketCnt);

            //Assert
            expect(actual).toEqual(null);
        });
    });

    describe('getTicketCount', () => {
        it('should set state exactly', () => {
            //Arrange
            const props = {...initProps};
            const sites = [{ siteType: 'mnc', siteGroupOrd: 1, ticketCnt: 100 }, { siteType: 'test', siteGroupOrd: 1, ticketCnt: 200 }];
            const container = shallow(<CommonNotification {...props}/>, { disableLifecycleMethods: true }).instance();

            //Act
            var actual = container.getTicketCount(sites);

            //Assert
            expect(actual).toEqual(300);
        });
    });

    describe('renderMapSite', () => {
        it('should render exactly', () => {
            //Arrange
            const props = {...initProps};
            const sites = [{ siteType: 'mnc', siteGroupOrd: 1, ticketCnt: 100 }, { siteType: 'test', siteGroupOrd: 1, ticketCnt: 200 }];
            const container = shallow(<CommonNotification {...props}/>, { disableLifecycleMethods: true }).instance();
            container.filterAndSortSites = jest.fn(() => '');
            container.renderSiteSection = jest.fn();
            container.getTicketCount = jest.fn();

            //Act
            container.renderMapSite(sites);

            //Assert
            expect(container.renderSiteSection).toHaveBeenCalled();
        });
    });

    describe('handleClosePopup', () => {
        it('should set state exactly', () => {
            //Arrange
            const props = {...initProps};
            const expected = {
                affectedTicketPopup: { show: false, isCredit: true, siteTickets: null },
                pushPopup: { show: false },
                savePopup: { show: false },
                activatePopup: { show: false }
            };
            const container = shallow(<CommonNotification {...props}/>, { disableLifecycleMethods: true }).instance();
            container.formik = {setSubmitting: jest.fn()};

            //Act
            container.handleClosePopup();

            //Assert
            expect(container.state.affectedTicketPopup).toEqual(expected.affectedTicketPopup);
            expect(container.state.pushPopup).toEqual(expected.pushPopup);
            expect(container.state.savePopup).toEqual(expected.savePopup);
            expect(container.state.activatePopup).toEqual(expected.activatePopup);
        });
    });

    describe('handleActive', () => {
        it('should set state exactly', () => {
            //Arrange
            const props = {...initProps};
            const expected =  { show: true };
            const container = shallow(<CommonNotification {...props}/>, { disableLifecycleMethods: true }).instance();
            container.formik = {values: ''};
            container.validateFormik = jest.fn(() => []);

            //Act
            container.handleActive('affectedTicketPopup');

            //Assert
            expect(container.state.affectedTicketPopup).toEqual(expected);
        });
    });

    describe('handleCollapseExpand', () => {
        it('should set state exactly', () => {
            //Arrange
            const props = {...initProps};
            const state =  { collapseEvent: true };
            const container = shallow(<CommonNotification {...props}/>, { disableLifecycleMethods: true }).instance();
            container.setState(state);

            //Act
            container.handleCollapseExpand();

            //Assert
            expect(container.state.collapseEvent).toEqual(false);
        });
    });

    describe('validateFormik', () => {
        it('should return errs content required', () => {
            //Arrange
            const props = {...initProps};
            const values = {
                subject: null,
                content_en: null,
                content_cs: null,
                content_ch: null
            };
            const expected = {
                content_ch: 'TraditionalChineseContentRequired',
                content_cs: 'SimplifiedChineseContentRequired',
                content_en: 'EnglishContentRequired'
            }
            const container = shallow(<CommonNotification {...props}/>, { disableLifecycleMethods: true }).instance();

            //Act
            var actual = container.validateFormik(values);

            //Assert
            expect(actual).toEqual(expected);
        });

        it('should return errs subject required', () => {
            //Arrange
            const props = {
                ...initProps,
                actionParam: {
                    ...initProps.actionParam,
                    isOstUser: false
                }
            };
            const values = {
                subject: null,
                content_en: 'test',
                content_cs: 'test',
                content_ch: 'test'
            };
            const expected = {
                subject: 'SubjectRequired'
            }
            const container = shallow(<CommonNotification {...props}/>, { disableLifecycleMethods: true }).instance();

            //Act
            var actual = container.validateFormik(values);

            //Assert
            expect(actual).toEqual(expected);
        });

        it('should return errs RemoveSign required', () => {
            //Arrange
            const props = {...initProps};
            const values = {
                subject: 'test',
                content_en: 'test',
                content_cs: 'test',
                content_ch: 'test'
            };
            const expected = {
                content_ch: 'RemoveSignAtTC',
                content_cs: 'RemoveSignAtSC',
                content_en: 'RemoveSignAtEnglish',
            }
            const container = shallow(<CommonNotification {...props}/>, { disableLifecycleMethods: true }).instance();

            //Act
            var actual = container.validateFormik(values);

            //Assert
            expect(actual).toEqual(expected);
        });
    });

    describe('invalidTabCss', () => {
        it('should return exactly', () => {
            //Arrange
            const props = {...initProps};
            const state =  { isFirstCheck: true };
            const errors = {content_en: 'err', content_cs: 'err', content_ch: 'err'}
            const expected = 'invalid-content_en invalid-content_cs invalid-content_ch';
            const container = shallow(<CommonNotification {...props}/>, { disableLifecycleMethods: true }).instance();
            container.setState(state);

            //Act
            var actual = container.invalidTabCss(errors);

            //Assert
            expect(actual).toEqual(expected);
        });
    });

    describe('isRenderPopupAction', () => {
        it('should return true', () => {
            //Arrange
            const props = {...initProps};
            const state =  { pushPopup: {show: true}, savePopup: {show: true}, activatePopup: {show: true} };
            const container = shallow(<CommonNotification {...props}/>, { disableLifecycleMethods: true }).instance();
            container.setState(state);

            //Act
            var actual = container.isRenderPopupAction();

            //Assert
            expect(actual).toEqual(true);
        });

        it('should return false', () => {
            //Arrange
            const props = {...initProps};
            const state =  { pushPopup: {show: false}, savePopup: {show: false}, activatePopup: {show: false} };
            const container = shallow(<CommonNotification {...props}/>, { disableLifecycleMethods: true }).instance();
            container.setState(state);

            //Act
            var actual = container.isRenderPopupAction();

            //Assert
            expect(actual).toEqual(false);
        });
    });

    describe('renderConfirmPopup', () => {
        it('should return pushPopup', () => {
            //Arrange
            const props = {...initProps};
            const state =  { pushPopup: {show: true}, savePopup: {show: false}, activatePopup: {show: false} };
            const container = shallow(<CommonNotification {...props}/>, { disableLifecycleMethods: true }).instance();
            container.setState(state);
            container.handleSubmitConfirm = jest.fn()

            //Act
            var actual = container.renderConfirmPopup();
            shallow(<div>{actual}</div>).find(ConfirmPopup).at(0).simulate('submit');

            //Assert
            expect(container.handleSubmitConfirm).toHaveBeenCalled();
        });

        it('should return savePopup', () => {
            //Arrange
            const props = {...initProps};
            const state =  { pushPopup: {show: false}, savePopup: {show: true}, activatePopup: {show: false} };
            const container = shallow(<CommonNotification {...props}/>, { disableLifecycleMethods: true }).instance();
            container.setState(state);
            container.handleSaveConfirm = jest.fn()

            //Act
            var actual = container.renderConfirmPopup();
            shallow(<div>{actual}</div>).find(ConfirmPopup).at(0).simulate('submit');

            //Assert
            expect(container.handleSaveConfirm).toHaveBeenCalled();
        });

        it('should return activatePopup', () => {
            //Arrange
            const props = {...initProps};
            const state =  { pushPopup: {show: false}, savePopup: {show: false}, activatePopup: {show: true} };
            const container = shallow(<CommonNotification {...props}/>, { disableLifecycleMethods: true }).instance();
            container.setState(state);
            container.handleSubmitConfirm = jest.fn()

            //Act
            var actual = container.renderConfirmPopup();
            shallow(<div>{actual}</div>).find(ConfirmPopup).at(0).simulate('submit');

            //Assert
            expect(container.handleSubmitConfirm).toHaveBeenCalled();
        });
    });

    describe('renderButton', () => {
        it('should return btn-save exactly when isOstUser true', () => {
            //Arrange
            const props = {...initProps};
            const container = shallow(<CommonNotification {...props}/>, { disableLifecycleMethods: true }).instance();
            container.handleSaveDraft = jest.fn();

            //Act
            var actual = container.renderButton(false);
            shallow(<div>{actual}</div>).find('.btn-save').at(0).simulate('click');

            //Assert
            expect(container.handleSaveDraft).toHaveBeenCalled();
        });

        it('should return btn-send exactly when isOstUser true', () => {
            //Arrange
            const props = {...initProps};
            const container = shallow(<CommonNotification {...props}/>, { disableLifecycleMethods: true }).instance();
            container.handleActive = jest.fn();

            //Act
            var actual = container.renderButton(false);
            shallow(<div>{actual}</div>).find('.btn-send').at(0).simulate('click');

            //Assert
            expect(container.handleActive).toHaveBeenCalledWith('pushPopup');
        });

        it('should return btn-save exactly when isOstUser false', () => {
            //Arrange
            const props = {
                ...initProps,
                actionParam: {
                    ...initProps.actionParam,
                    isOstUser: false
                }
            };
            const container = shallow(<CommonNotification {...props}/>, { disableLifecycleMethods: true }).instance();
            container.handleActive = jest.fn();

            //Act
            var actual = container.renderButton(false);
            shallow(<div>{actual}</div>).find('.btn-save').at(0).simulate('click');

            //Assert
            expect(container.handleActive).toHaveBeenCalledWith('savePopup');
        });

        it('should return btn-send exactly when isOstUser false', () => {
            //Arrange
            const props = {
                ...initProps,
                actionParam: {
                    ...initProps.actionParam,
                    isOstUser: false
                }
            };
            const container = shallow(<CommonNotification {...props}/>, { disableLifecycleMethods: true }).instance();
            container.handleActive = jest.fn();

            //Act
            var actual = container.renderButton(false);
            shallow(<div>{actual}</div>).find('.btn-send').at(0).simulate('click');

            //Assert
            expect(container.handleActive).toHaveBeenCalledWith('activatePopup');
        });
    });

    describe('renderMessage', () => {
        it('should return result message isSuccessful false', () => {
            //Arrange
            const props = {...initProps};
            const param = {
                isSuccessful: false,
                message: 'test;testing'
            }
            const container = shallow(<CommonNotification {...props}/>, { disableLifecycleMethods: true }).instance();
            container.handleSaveDraft = jest.fn();

            //Act
            var actual = container.renderMessage(param, 'message');

            //Assert
            expect(actual).toEqual(['test','testing']);
        });

        it('should return result message isSuccessful true', () => {
            //Arrange
            const props = {...initProps};
            const param = {
                isSuccessful: true,
                message: 'test;testing'
            }
            const container = shallow(<CommonNotification {...props}/>, { disableLifecycleMethods: true }).instance();
            container.handleSaveDraft = jest.fn();

            //Act
            var actual = container.renderMessage(param, 'message');

            //Assert
            expect(actual).toEqual(['test;testing']);
        });

        it('should return message isSuccessful true', () => {
            //Arrange
            const props = {...initProps};
            const param = {
                isSuccessful: true,
                message: null
            }
            const container = shallow(<CommonNotification {...props}/>, { disableLifecycleMethods: true }).instance();
            container.handleSaveDraft = jest.fn();

            //Act
            var actual = container.renderMessage(param, 'message');

            //Assert
            expect(actual).toEqual(['message']);
        });
    });

    describe('renderForm', () => {
        const params = {
            values:{},
            errors:{},
            touched:{},
            handleChange: jest.fn(),
            handleSubmit: jest.fn(),
            setFieldValue: jest.fn(),
            isSubmitting: true
        };

        it('should render ResponseMessage FormikErrorMessage correctly', () => {
            // Arrange
            const state = {messageSuccessful: 'message'};
            const props = {
                ...initProps
            }
            
            // Act
            const container = shallow(<CommonNotification {...props} />, { disableLifecycleMethods: true });
            container.instance().setState(state);
            const form = shallow(container.instance().renderForm(params));
  
            // Assert
            expect(form.find(ResponseMessage).length).toBe(1);
            expect(form.find(FormikErrorMessage).length).toBe(1);
        });

        it('should render collapse correctly', () => {
            // Arrange
            const state = {messageSuccessful: 'message'};
            const props = {
                ...initProps
            }

            // Act
            const container = shallow(<CommonNotification {...props} />, { disableLifecycleMethods: true });
            container.instance().handleCollapseExpand = jest.fn();
            container.instance().setState(state);
            const form = shallow(container.instance().renderForm(params));
            form.find('.header-event').at(0).simulate('click');
  
            // Assert
            expect(container.instance().handleCollapseExpand).toHaveBeenCalled();
        });
        
        it('should render Licensee correctly', () => {
            // Arrange
            const event = {target:{value:'value'}};
            const state = {messageSuccessful: 'message'};
            const props = {
                ...initProps,
                actionParam: {
                    ...initProps.actionParam,
                    isOstUser: false
                }
            }

            // Act
            const container = shallow(<CommonNotification {...props} />, { disableLifecycleMethods: true });
            container.instance().setState(state);
            const form = shallow(container.instance().renderForm(params));
            form.find('.shadow-none').at(0).simulate('change', event);
  
            // Assert
            expect(params.setFieldValue).toHaveBeenCalledWith('subject', 'value');
        });

        it('should render Tabs correctly', () => {
            // Arrange
            const state = {messageSuccessful: 'message'};
            const props = {
                ...initProps,
                actionParam: {
                    ...initProps.actionParam,
                    isOstUser: false
                }
            }

            // Act
            const container = shallow(<CommonNotification {...props} />, { disableLifecycleMethods: true });
            container.instance().handleChangeTab = jest.fn();
            container.instance().setState(state);
            const form = shallow(container.instance().renderForm(params));
            form.find(Tabs).at(0).simulate('select');
  
            // Assert
            expect(container.instance().handleChangeTab).toHaveBeenCalled();
        });

        it('should render CkEditor correctly', () => {
            // Arrange
            const state = {messageSuccessful: 'message'};
            const props = {
                ...initProps,
                actionParam: {
                    ...initProps.actionParam,
                    isOstUser: false
                }
            }

            // Act
            const container = shallow(<CommonNotification {...props} />, { disableLifecycleMethods: true });
            container.instance().handleChangeTab = jest.fn();
            container.instance().setState(state);
            const form = shallow(container.instance().renderForm(params));
            form.find(CkEditor).at(0).simulate('change', 'value');
  
            // Assert
            expect(params.setFieldValue).toHaveBeenCalledWith(['us-language'], 'value');
        });

        it('should render btn-cancel correctly', () => {
            // Arrange
            const state = {messageSuccessful: 'message'};
            const props = {
                ...initProps,
                actionParam: {
                    ...initProps.actionParam,
                    isOstUser: false
                }
            }

            // Act
            const container = shallow(<CommonNotification {...props} />, { disableLifecycleMethods: true });
            container.instance().handleClose = jest.fn();
            container.instance().setState(state);
            const form = shallow(container.instance().renderForm(params));
            form.find('.btn-cancel').at(0).simulate('click');
  
            // Assert
            expect(container.instance().handleClose).toHaveBeenCalled();
        });
    });

    describe('render', () => {
        it('should render Formik correctly', () => {
            // Arrange
            const state = {
                data: {
                    notificationID:1, messageID: 1, status: 'New', eventTime: '',
                    eventName: '',subject: '', content_en: '', content_cs: '', content_ch:''
                }
            };
            const props = {
                ...initProps
            }

            // Act
            const container = shallow(<CommonNotification {...props} />, { disableLifecycleMethods: true });
            container.instance().validateFormik = jest.fn();
            container.instance().setState(state);
            const form = shallow(<div>{container.instance().render()}</div>);
            form.find(Formik).props().validate('values');
    
            // Assert
            expect(container.instance().validateFormik).toHaveBeenCalled();
        });

        it('should return null', () => {
            // Arrange
            const state = {
                data: null
            };
            const props = {
                ...initProps
            }

            // Act
            const container = shallow(<CommonNotification {...props} />, { disableLifecycleMethods: true });
            container.instance().validateFormik = jest.fn();
            container.instance().setState(state);
    
            // Assert
            expect(container).toEqual({});
        });
    });
});