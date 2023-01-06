import React from 'react';
import { CreateCommunicationLog } from '../CreateCommunicationLog';
import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import DateTimeService from '@jsroot/common/dateTimeService';
import LangHelper from '@jsroot/common/langHelper';
import { shallow } from 'enzyme';
import { Button, Form, Modal } from 'react-bootstrap';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import { toast } from 'react-toastify';
import * as commonFunc from '../../common.functions';
import SweetModalDialog from '@jsroot/components/SweetModalDialog';
import { Formik } from 'formik';
import * as shareScripts from '@jsroot/common/shareScripts';
import ConfirmPopup from '@jsroot/components/ConfirmPopup';

describe('CreateCommunicationLog', () => {
    beforeAll(() => {
        jest.useFakeTimers();
        Site.blockUI = jest.fn();
        Site.unblockUI = jest.fn();
        LangHelper.getResource = jest.fn(key => key);
        DateTimeService.toLongDateTimeFormat = jest.fn(val => val);
        DateTimeService.toShortDateTimeFormat = jest.fn(val => val);
        DateTimeService.toServerDateTime = jest.fn(val => val);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    const initData = {
        feedback:{
            languageId: 1,
            licenseeType: 0,
            provinceId: 0,
            countryId: 0,
            review: 'test',
            isReviewed: true,
            relatedCustomers: [],
            resolutionDate: 'Aug 16, 2021 03:12:00 PM',
            responseId: 1,
            siteId: 1,
            statusId: 1,
            siteSetting: {name: 'test'},
            roleId: 1,
            settings:[{
                    feedbackId: 239466,
                    settingId: 1001,
                    settingType: 'Communication',
                    subSettingId: 0,
                    subSettingIdLevel3: 0
                },
                {
                    feedbackId: 239466,
                    settingId: 2022,
                    settingType: 'Station',
                    subSettingId: 0,
                    subSettingIdLevel3: 0
                },
                {
                    feedbackId: 239466,
                    settingId: 3020,
                    settingType: 'Category',
                    subSettingId: 4029,
                    subSettingIdLevel3: 0
                },
                {
                    feedbackId: 239466,
                    settingId: 46000,
                    settingType: 'Product',
                    subSettingId: 8063,
                    subSettingIdLevel3: 9144
                }
            ]
        },
        settings:{
            bettypeNA: {id: 0, name: 'N/A'},
            bettypes: [{id: 3, value: 'N/A', parentId: 2}],
            communicationToolNA: 'null',
            communicationTools:[{id: 0, name: 'N/A'}],
            countries:[{id: 0, name: 'N/A'}],
            extensionNA: {id: 0, value: 'N/A'},
            extensions:[{id: 0, value: 'N/A'}],
            languages: [{languageId: 0, name: 'N/A'},{languageId: 1, name: 'English'}],
            licenseeTypes:[{id: 0, name: 'N/A'}],
            mainCategories: [{mainCategoryID: 0, name: 'N/A'}],
            productNA:{id: 0, value: 'N/A'},
            products: [{id: 0, value: 'N/A'}],
            responses: [{id: 0, value: 'N/A'}],
            roles: [{id: 0, value: 'N/A'},{id: 0, value: 'N/A'},{id: 0, value: 'N/A'},{id: 0, value: 'N/A'},{id: 0, value: 'N/A'},{id: 0, value: 'N/A'}],
            sites: [{id: 0, name: 'N/A', childSites:[{id: 1, value: 'child'}]}],
            statuses: [{statusId: 0, name: 'N/A'}],
            statusId: [{id: 0, name: 'N/A'}],
            subCategories: [{subCategoryId: 2, mainCategoryID: 1, name: 'N/A'}],
            subProductNA: {id: 0, value: 'N/A'},
            subProducts: [{id: 2, value: 'N/A', parentId: 1}],
        },
        hasReviewFeedbackPermission: true
    };

    describe('componentDidMount', () => {
        it('should calls exactly function when componentDidMount when no options', async () => {
            // Arrange
            const response = { data: initData};
            const promise = Promise.resolve(response);
            DataService.getDataAsync = jest.fn(() => promise); 

            // Act
            const container = shallow(<CreateCommunicationLog />).instance();
            await container.componentDidMount();
            await promise;
            jest.runAllTimers();

            expect(container.state.allSettings.settings.communicationTools).toEqual([{ id: 0, name: 'N/A' }]);
            expect(container.state.balanceUpday).toEqual(null);
        });

        it('should calls exactly function when componentDidMount when have options', async () => {
            // Arrange
            const props = { options: { communicationToolOptions: { id: 1, name: 'test' } }};
            const response = { data: initData};
            const promise = Promise.resolve(response);
            DataService.getDataAsync = jest.fn(() => promise); 

            // Act
            const container = shallow(<CreateCommunicationLog {...props}/>).instance();
            await container.componentDidMount();
            await promise;
            jest.runAllTimers();

            expect(container.state.allSettings.communicationTools).toEqual({id: 1, name: 'test'});
        });
    });

    describe('initFormikData', () => {
        it('should return exactly when init formik data', () => {
            // Arrange
            const props = {
                customerInfo:{
                    roleId: 1
            }};
            // Act
            const container = shallow(<CreateCommunicationLog {...props}/>).instance();
            container.setState({allSettings: initData.settings});
            const actual = container.initFormikData();

            //Arrange
            expect(actual.countryId).toBe(0);
        });
    });

    describe('onChangeStartTime', () => {
        it('should not update endTime when startTime is before endTime', () => {
            // Arrange
            const container = shallow(<CreateCommunicationLog />).instance();
            const startTime = '2021-12-20T00:00:00-06:00';
            container.formik = {
                setFieldValue: jest.fn(),
                values: {
                    endTime: '2021-12-20T00:00:00-07:00'
                }
            };
            container.updateTimeAndToolPrefix = jest.fn();

            // Act
            container.onChangeStartTime(startTime);
            jest.runAllTimers();

            // Assert
            expect(container.formik.setFieldValue).toHaveBeenCalledWith('startTime', startTime);
            expect(container.updateTimeAndToolPrefix).toHaveBeenCalled();
        });
    });

    describe('onChangeEndTime', () => {
        it('should not update startTime when startTime is before endTime', () => {
            // Arrange
            const container = shallow(<CreateCommunicationLog />).instance();
            const endTime = '2021-12-20T00:00:00-07:00';
            container.formik = {
                setFieldValue: jest.fn(),
                values: {
                    startTime: '2021-12-20T00:00:00-06:00'
                }
            };
            // Act
            container.onChangeEndTime(endTime);
            
            jest.runAllTimers();

            // Assert
            expect(container.formik.setFieldValue).toHaveBeenCalledTimes(1);
        });
    });

    describe('updateTimeAndToolPrefix', () => {
        it('should setFieldValue autoGenerated correctly', () => {
            // Arrange
            const state = {
                relatedCustomers: [{ custId: '1', val: 'sa' }],
                latestCommunicationTool: 'email'
            };
            const expected = `Date Time & Tool: 20211120/12:00AM/email \nSystem ID: sa`;
            // Act
            const container = shallow(<CreateCommunicationLog />).instance();
            container.formik = { values : { startTime: '2021-11-20T00:00' } };
            container.generateTimeAndToolPrefix = jest.fn(() => 'Date Time & Tool: 20211120/12:00AM/email');
            container.setState(state);
            container.matchTimeAndToolPrefix = jest.fn(() => 'Date Time & Tool: 20211120/12:00AM/email');
            container.updateTimeAndToolPrefix();

            // Assert
            expect(container.state.contents.autoGenerated).toEqual(expected);
        });
    });

    describe('handleChangeCommunicationTool', () => {
        const state = {
            allSettings: {
                ...initData.settings,
                communicationTools: [{ id: 1, name: 'email' }, { id: 2, name: 'skype' }]
            }
        };
        const props = {
            customerInfo:{
                roleId: 1
        }};
        it('should do as expected when select one communication tool', () => {
            // Arrange
            const currentItem = { id: 1, name: 'email', checked: true };

            // Act
            const container = shallow(<CreateCommunicationLog {...props} />).instance();
            container.setState(state);
            const setFieldValue = jest.fn();
            container.updateTimeAndToolPrefix = jest.fn();
            container.handleChangeCommunicationTool(setFieldValue, currentItem, '1');
            jest.runAllTimers();

            // Assert
            expect(container.state.latestCommunicationTool).toEqual('email');
            expect(setFieldValue).toHaveBeenCalledWith('communicationToolIds', '1');
            expect(container.updateTimeAndToolPrefix).toHaveBeenCalled();
        });

        it('should do as expected when select all communication tools', () => {
            // Arrange
            const currentItem = null;

            // Act
            const container = shallow(<CreateCommunicationLog {...props}/>).instance();
            container.setState(state);
            const setFieldValue = jest.fn();
            container.updateTimeAndToolPrefix = jest.fn();
            container.handleChangeCommunicationTool(setFieldValue, currentItem, '1,2');
            jest.runAllTimers();

            // Assert
            expect(container.state.latestCommunicationTool).toEqual('email');
            expect(setFieldValue).toHaveBeenCalledWith('communicationToolIds', '1,2');
            expect(container.updateTimeAndToolPrefix).toHaveBeenCalled();
        });

        it('should do as expected when unselect communication tool', () => {
            // Arrange
            const currentItem = { id: 1, name: 'email', checked: false };

            // Act
            const container = shallow(<CreateCommunicationLog {...props}/>).instance();
            container.setState(state);
            const setFieldValue = jest.fn();
            container.updateTimeAndToolPrefix = jest.fn();
            container.handleChangeCommunicationTool(setFieldValue, currentItem, '2');
            jest.runAllTimers();

            // Assert
            expect(container.state.latestCommunicationTool).toEqual('skype');
            expect(setFieldValue).toHaveBeenCalledWith('communicationToolIds', '2');
            expect(container.updateTimeAndToolPrefix).toHaveBeenCalled();
        });

        it('should do as expected when unselect all communication tools', () => {
            // Arrange
            const currentItem = null;

            // Act
            const container = shallow(<CreateCommunicationLog {...props}/>).instance();
            container.setState(state);
            container.setState({ latestCommunicationTool: 'email' });
            const setFieldValue = jest.fn();
            container.updateTimeAndToolPrefix = jest.fn();
            container.handleChangeCommunicationTool(setFieldValue, currentItem, '');
            jest.runAllTimers();

            // Assert
            expect(container.state.latestCommunicationTool).toEqual('');
            expect(setFieldValue).toHaveBeenCalledWith('communicationToolIds', '');
            expect(container.updateTimeAndToolPrefix).toHaveBeenCalled();
        });
    });

    describe('setStateSubProduct', () => {
        it('should setState subProduct', () => {
            // Arrange
            const container = shallow(<CreateCommunicationLog />).instance();
            // Act
            container.setStateSubProduct(2021);

            // Assert
            expect(container.state.subProducts).toEqual(2021);
        });
    });

    describe('setStateBetType', () => {
        it('should setState betType', () => {
            // Arrange
            const container = shallow(<CreateCommunicationLog />).instance();
            // Act
            container.setStateBetType(2021);

            // Assert
            expect(container.state.betTypes).toEqual(2021);
        });
    });

    describe('handleVerifyCreateRelatedCustomer', () => {
        it('should calls setState when click', async () => {
            const response = {
                data: [{ id: 1, val: 'test' }]
            };
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);
            const customerNameInput = 'testing';
            const container = shallow(<CreateCommunicationLog />).instance();
            container.isValidCustomer = jest.fn(() => true);
            // Act
            container.handleVerifyCreateRelatedCustomer(customerNameInput);
            await promise;
            jest.runAllTimers();

            // Assert

            expect(container.state.relatedCustomers).toEqual([]);
        });

        it('should calls setState and remove duplicate when click', async () => {
            const response = {
                data: [{ id: 1, val: 'test' },{ id: 1, val: 'test' }]
            };
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);
            const customerNameInput = 'testing';
            const container = shallow(<CreateCommunicationLog />).instance();
            container.isValidCustomer = jest.fn(() => true);
            // Act
            container.handleVerifyCreateRelatedCustomer(customerNameInput);
            await promise;
            jest.runAllTimers();

            // Assert

            expect(container.state.relatedCustomers).toEqual([]);
        });

        it('should retunr error when input over 50 characters', async () => {
            const response = {
                data: [{ id: 1, val: 'test' }]
            };
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);
            const customerNameInput = 'testing1234567891234657891234567891234657981324657981324654978654651613121111322';
            const setFieldValue = jest.fn();
            toast.error = jest.fn();
            const container = shallow(<CreateCommunicationLog />).instance();
            container.isValidCustomer = jest.fn(() => false);
            // Act
            container.handleVerifyCreateRelatedCustomer(customerNameInput);
            await promise;
            jest.runAllTimers();

            // Assert
            expect(toast.error).toHaveBeenCalledWith('Customer Name must not over 50 characters long!');
        });
    });

    describe('deleteVerifyCreateCustomer', () => {
        it('should correctly setState when delete verify', () => {
            // Arrange
            const state = {
                relatedCustomers: [{ custId: '1' }, { custId: '2' }, { custId: '3' }]
            };

            // Act
            const container = shallow(<CreateCommunicationLog />).instance();
            container.formik = { values : { autoGenerated: 'test' } };
            container.formik.setFieldValue = jest.fn();
            container.setState(state);
            container.deleteVerifyCreateCustomer('1');

            // Assert
            expect(container.state.relatedCustomers).toEqual([{ custId: '2' }, { custId: '3' }]);
        });
    });

    describe('handleCollapseExpand', () => {
        it('should update state correct', () => {
            // Arrange
            const container = shallow(<CreateCommunicationLog />).instance();

            // Act
            container.handleCollapseExpand('autoGenerated');

            // Assert
            expect(container.state.collapse).toEqual({
                autoGenerated: true,
                remark: false,
                solution: false,
            });
        });
        it('should not update state correct', () => {
            // Arrange
            const container = shallow(<CreateCommunicationLog />).instance();

            // Act
            container.handleCollapseExpand();

            // Assert
            expect(container.state.collapse).toEqual({
                autoGenerated: false,
                remark: false,
                solution: false,
                undefined: true
            });
        });
    });


    describe('handleSubmit', () => {
        it('should call exact function when submit', () => {
            // Arrange
            const props ={
                customerInfo:{
                    roleId: 1
                }
            };
            const setSubmitting = jest.fn();
            const values = {
                extensionIds: 2020,
                communicationToolIds: 100,
                subProductIds: 200,
                betTypeIds: 120,
                mainCategoryIds: '1,2',
                subCategoryIds: '5,1',
                productIds: '3,4'
            };
            const container = shallow(<CreateCommunicationLog {...props}/>).instance();
            container.setState({ allSettings: initData.settings });
            container.recheckInactiveSiteAndConfirmCreate = jest.fn();
            // Act
            container.handleSubmit(values, {setSubmitting});

            // Assert
            expect(setSubmitting).toHaveBeenCalledWith(true);
            expect(container.recheckInactiveSiteAndConfirmCreate).toHaveBeenCalled();
        });
    });

    describe('handleChangeRefTicket', () => {
        it('should call exact function when value greater than 15 characters', () => {
            // Arrange
            const event = {
                target: {value : 'testtttttttttttt'}
            };    
            const setFieldValue = jest.fn();       
            const container = shallow(<CreateCommunicationLog />).instance();
            container.handleChangeVerifySection = jest.fn();

            // Act
            container.handleChangeRefTicket(event, setFieldValue);

            // Assert
            expect(container.handleChangeVerifySection).toHaveBeenCalledWith('ticketRefInput', 'testtttttttttttt');
        });

        it('should call exact function when value smaller than 15 characters', () => {
            // Arrange
            const event = {
                target: {value : 'test'}
            };    
            const setFieldValue = jest.fn();       
            const container = shallow(<CreateCommunicationLog />).instance();
            container.handleChangeVerifySection = jest.fn();

            // Act
            container.handleChangeRefTicket(event, setFieldValue);

            // Assert
            expect(container.handleChangeVerifySection).toHaveBeenCalledWith('ticketRefInput', 'test');
        });
    });

    describe('onPasteRefTicketHandler ', () => {
        it('should do as expected if copy string', () => {
            // Arrange
            const event = { clipboardData: { getData: jest.fn().mockReturnValueOnce('event') }, preventDefault: jest.fn() };
            const container = shallow(<CreateCommunicationLog />).instance();

            // Act
            container.onPasteRefTicketHandler(event);
            // Assert
            expect(event.preventDefault).toHaveBeenCalled();
        });
    });

    describe('recheckInactiveSiteAndConfirmCreate', () => {
        it('should call exact function if have any inactive site member', async () => {
            // Arrange
            const response = {
                data: [{
                    custId: 1,
                    val: 'test',
                    isSiteActive: false,
                    isLicensee: true
                }]
            };
            const promise = Promise.resolve(response);
            const state = {
                createResult: [],
                relatedCustomers: [{custId: 1,val: 'test1'}]
            };
            const setSubmitting = jest.fn();
            DataService.postDataAsync = jest.fn(() => promise); 
            const container = shallow(<CreateCommunicationLog />).instance();
            container.setState(state);
            const params = { name: 'test'};
            const message = LangHelper.getResource('ErrorMessageInactiveSiteRelate') + 'test';
            // Act
            container.recheckInactiveSiteAndConfirmCreate('username', params, setSubmitting);
            await promise;
            jest.runAllTimers();

            // Assert
            expect(container.state.createResult).toEqual([]);
        });

        it('should call exact function if do not have any inactive site member', async () => {
            // Arrange
            const response = {
                data: [{
                    custId: 1,
                    val: 'test',
                    isSiteActive: true,
                    isLicensee: true
                }]
            };
            const promise = Promise.resolve(response);
            const setSubmitting = jest.fn();
            DataService.postDataAsync = jest.fn(() => promise);
            const container = shallow(<CreateCommunicationLog />).instance();
            const params = { name: 'test'};
            // Act
            container.recheckInactiveSiteAndConfirmCreate('username', params, setSubmitting);
            await promise;
            jest.runAllTimers();

            // Assert
            expect(container.state.confirmCreateDialog).toEqual({ show: false });
        });
    });

    describe('handleClickFillEvent ', () => {
        it('should do as expected if response errorCode !== 0', async () => {
            // Arrange
            const response = {
                errorCode : '001', description: 'no information'
            };
            const state = {
                countClickRefTicket: 0,
                contents:{
                    remark: ''
                }
            };
            const ticketRefInput = '123';

            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);
            const container = shallow(<CreateCommunicationLog />).instance();
            container.setState(state);
            container.handleChangeVerifySection = jest.fn();
            // Act
            container.handleClickFillEvent(ticketRefInput);
            await promise;
            jest.runAllTimers();

            // Assert
            expect(container.handleChangeVerifySection).toHaveBeenCalledWith('ticketRefInput', '');
        });

        it('should do as expected if response errorCode === 0 and first request data and already has data', async () => {
            // Arrange
            const response = {
                data:{
                    errorCode : '0', description: 'test'
                }
            };
            const state = {
                countClickRefTicket: 0,
                contents:{
                    remark: '123'
                }
            };
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);
            const ticketRefInput = '123';

            const container = shallow(<CreateCommunicationLog />).instance();
            container.setState(state);
            container.handleChangeVerifySection = jest.fn();
            // Act
            container.handleClickFillEvent(ticketRefInput);
            await promise;
            jest.runAllTimers();

            // Assert
            expect(container.handleChangeVerifySection).toHaveBeenCalledWith('ticketRefInput', '');
            expect(container.state.contents.remark).toEqual('123');
        });
    });

    describe('handleCloseConfirmCreateDialog', () => {
        it('should setState when close confirm create dialog', () => {
            // Arrange
            const container = shallow(<CreateCommunicationLog />).instance();
            container.formik = { setSubmitting: jest.fn() };
            // Act
            container.handleCloseConfirmCreateDialog();

            // Assert
            expect(container.state.confirmCreateDialog).toEqual({ show: false });
            expect(container.formik.setSubmitting).toHaveBeenCalledWith(false);
        });
    });
    

    describe('handleCreateLog', () => {
        it('should setState when handle create log successful', async () => {
            // Arrange
            const props = {
                onClose: jest.fn()
            };
            const response = {data: {isSuccessful: true}};
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            const container = shallow(<CreateCommunicationLog {...props}/>).instance();
            container.formik = { setSubmitting: jest.fn() };
            container.setState = jest.fn();
            // Act
            container.handleCreateLog();
            await promise;
            jest.runAllTimers();

            // Assert
            expect(container.setState).toHaveBeenCalled();
            expect(props.onClose).toHaveBeenCalledWith(true);
        });

        it('should setState when handle create log unsuccessful', async () => {
            // Arrange
            const props = {
                onClose: jest.fn()
            };
            const response = {data: {isSuccessful: false}};
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            const container = shallow(<CreateCommunicationLog />).instance();
            container.formik = { setSubmitting: jest.fn() };
            // Act
            container.handleCreateLog();
            await promise;
            jest.runAllTimers();

            // Assert
            expect(container.formik.setSubmitting).toHaveBeenCalledWith(false);
        });
    });

    describe('handleCheckDuplicate', () => {
        it('should call handle create log', async () => {
            // Arrange
            const props = {
                onClose: jest.fn()
            };
            const state = {
                duplicateFeedbackId: 0,
                confirmCreateDialog: { params: { customerId: 1, categories: 'test', startTime: '2021-11-20T00:00'}}
            };
            const response = { data: 1 };
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise); 

            const container = shallow(<CreateCommunicationLog {...props}/>).instance();
            container.handleCreateLog = jest.fn();
            container.setState(state);

            // Act
            await container.handleCheckDuplicate();
            await promise;
            jest.runAllTimers();

            // Assert

            expect(container.state.duplicateFeedbackId).toEqual(1);
        });

        it('should setState when handle check duplicate', async () => {
            // Arrange
            const props = {
                onClose: jest.fn()
            };
            const state = {
                duplicateFeedbackId: 1,
                confirmCreateDialog: { params: { customerId: 1, categories: 'test', startTime: '2021-11-20T00:00'}}
            };
            const response = { data: 1 };
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise); 

            const container = shallow(<CreateCommunicationLog {...props}/>).instance();
            container.handleCreateLog = jest.fn();
            container.setState(state);

            // Act
            await container.handleCheckDuplicate();
            jest.runAllTimers();
            await promise;

            // Assert
            expect(container.state.checkDuplicateDialog).toEqual({show: true});
        });
    });

    describe('handleCloseCheckDuplicateDialog ', () => {
        it('should setState', async () => {
            // Arrange
            const container = shallow(<CreateCommunicationLog/>).instance();
            container.formik = { setSubmitting: jest.fn() };

            // Act
            container.handleCloseCheckDuplicateDialog ();
            // Assert

            expect(container.state.checkDuplicateDialog).toEqual({ show: false });
            expect(container.state.confirmCreateDialog).toEqual({ show: false });
            expect(container.formik.setSubmitting).toHaveBeenCalledWith(false);
        });
    });

    describe('handleCloseCheckDuplicateDialog', () => {
        it('should setState when close check duplicate dialog', () => {
            // Arrange
            const container = shallow(<CreateCommunicationLog />).instance();
            container.formik = { setSubmitting: jest.fn() };
            // Act
            container.handleCloseConfirmCreateDialog();

            // Assert
            expect(container.state.checkDuplicateDialog).toEqual({ show: false });
            expect(container.state.confirmCreateDialog).toEqual({ show: false });
            expect(container.formik.setSubmitting).toHaveBeenCalledWith(false);
        });
    });

    describe('isOldEqualNewIdV1', () => {
        it('should return false when call function isOldEqualNewIdV1', () => {
            // Arrange
            const values = {
                responseId: 0,
                statusId: 0,
                siteId: 0
            };
            const props = {
                options: {
                    responseId: 0,
                    statusId: 0,
                    siteId: 0
                }
            };

            const container = shallow(<CreateCommunicationLog {...props}/>).instance();

            // Act
            container['formik'] = { values: values };
            const actual = container.isOldEqualNewIdV1();
            container.initFormikData = jest.fn(() => initData.settings);
            // Assert
            expect(actual).toEqual(false);
        });

        it('should return true when call function isOldEqualNewIdV1', () => {
            // Arrange
            const values = {
                responseId: 1,
                statusId: 1,
                siteId: 1
            };
            const props = {
                options: {
                    responseId: 0,
                    statusId: 0,
                    siteId: 0
                }
            };

            const container = shallow(<CreateCommunicationLog {...props}/>).instance();
            container.initFormikData = jest.fn(() => initData.settings);
            // Act
            container['formik'] = { values: values };
            const actual = container.isOldEqualNewIdV1();

            // Assert
            expect(actual).toEqual(true);
        });
    });

    describe('isOldEqualNewIdV2', () => {
        it('should return false when call function isOldEqualNewIdV2', () => {
            // Arrange
            const values = {
                languageId: 0,
                countryId: 0,
                licenseeTypeId: 0
            };
            const props = {
                options: {
                    languageId: 0,
                    countryId: 0,
                    licenseeTypeId: 0
                }
            };

            const container = shallow(<CreateCommunicationLog {...props}/>).instance();
            container.initFormikData = jest.fn(() => initData.settings);
            // Act
            container['formik'] = { values: values };
            const actual = container.isOldEqualNewIdV2();

            // Assert
            expect(actual).toEqual(false);
        });

        it('should return true when call function isOldEqualNewIdV2', () => {
            // Arrange
            const values = {
                languageId: 1,
                countryId: 1,
                licenseeTypeId: 1
            };
            const props = {
                options: {
                    languageId: 0,
                    countryId: 0,
                    licenseeTypeId: 0
                }
            };

            const container = shallow(<CreateCommunicationLog {...props}/>).instance();

            // Act
            container['formik'] = { values: values };
            const actual = container.isOldEqualNewIdV2();

            // Assert
            expect(actual).toEqual(true);
        });
    });

    describe('isOldEqualNewId', () => {
        it('should return true call isOldEqualNewId', () => {
            // Arrange
            const container = shallow(<CreateCommunicationLog />);

            // Act
            container.instance().isOldEqualNewIdV1 = jest.fn(() => true);
            container.instance().isOldEqualNewIdV2 = jest.fn(() => true);

            const actual = container.instance().isOldEqualNewId();

            // Assert
            expect(actual).toBe(true);
        });

        it('should return false call isOldEqualNewId', () => {
            // Arrange
            const container = shallow(<CreateCommunicationLog />);

            // Act
            container.instance().isOldEqualNewIdV1 = jest.fn(() => false);
            container.instance().isOldEqualNewIdV2 = jest.fn(() => false);

            const actual = container.instance().isOldEqualNewId();

            // Assert
            expect(actual).toBe(false);
        });
    });

    describe('isOldEqualNewValue', () => {
        it('should return false when call function isOldEqualNewValue', () => {
            // Arrange
            const values = {
                subject: 'test',
                startTime: 'Fri Dec 24 2021 10:05:20 GMT+0700 (Indochina Time)',
                endTime: 'Fri Dec 24 2021 10:06:20 GMT+0700 (Indochina Time)'
            };
            const props = {
                options: {
                    subject: 'test'
                }
            };
            DateTimeService.toShortDateTimeFormat = jest.fn(() => '12/24/2021 10:05:20 AM');

            const container = shallow(<CreateCommunicationLog {...props}/>).instance();

            // Act
            container['formik'] = { values: values };
            const actual = container.isOldEqualNewValue();

            // Assert
            expect(actual).toEqual(true);
        });

        it('should return true when call function isOldEqualNewValue', () => {
            // Arrange
            const values = {
                subject: 'test',
                startTime: '',
                endTime: ''
            };
            const props = {
                options: {
                    subject: 'test'
                }
            };
            DateTimeService.toShortDateTimeFormat = jest.fn(() => '12/24/2021 10:05:20 AM');

            const container = shallow(<CreateCommunicationLog {...props}/>).instance();

            // Act
            container['formik'] = { values: values };
            const actual = container.isOldEqualNewValue();

            // Assert
            expect(actual).toEqual(true);
        });
    });

    describe('isOldEqualNewContent', () => {
        it('should return false when call function isOldEqualNewContent', () => {
            // Arrange
            const state = {
                contents: {
                    solution: 'test',
                    remark: '<div><font color=\"#ff0000\">This is a duplicated entry</font></div>\n\ntest'
                }
            };

            const props = {
                options: {
                    solution: 'test',
                    remark: 'test'
                }
            };

            const container = shallow(<CreateCommunicationLog {...props}/>).instance();
            container.setState(state);

            // Act
            const actual = container.isOldEqualNewContent();

            // Assert
            expect(actual).toEqual(false);
        });

        it('should return true when call function isOldEqualNewContent', () => {
            // Arrange
            const state = {
                contents:{
                    solution: 'test1',
                    remark: 'test3'
                }
            };
            const props = {
                options: {
                    solution: 'test',
                    remark: 'test'
                }
            };

            const container = shallow(<CreateCommunicationLog {...props}/>).instance();
            container.setState(state);

            // Act
            const actual = container.isOldEqualNewContent();

            // Assert
            expect(actual).toEqual(true);
        });
    });

    
    describe('onCloseCreatePopup', () => {
        it('should setState when call onCloseCreatePopup', () => {
            // Arrange

            const container = shallow(<CreateCommunicationLog />);

            // Act
            container.instance().isOldEqualNewId = jest.fn(() => true);
            container.instance().isOldEqualNewContent = jest.fn(() => true);
            container.instance().isOldEqualNewValue = jest.fn(() => true);

            container.instance().onCloseCreatePopup();

            // Assert
            expect(container.state().isShowCreatePopup).toBe(true);
        });

        it('should call props function when call onCloseCreatePopup', () => {
            // Arrange
            const props = {
                onClose: jest.fn()
            };

            const container = shallow(<CreateCommunicationLog {...props} />);

            // Act
            container.instance().isOldEqualNewId = jest.fn(() => false);
            container.instance().isOldEqualNewContent = jest.fn(() => false);
            container.instance().isOldEqualNewValue = jest.fn(() => false);

            container.instance().onCloseCreatePopup();

            // Assert
            expect(props.onClose).toHaveBeenCalledWith(false);
        });
    });

    describe('closeCreateConfirm', () => {
        it('should setState exactly when call closeCreateConfirm', () => {
            // Arrange

            const container = shallow(<CreateCommunicationLog />);

            // Act
            container.instance().closeCreateConfirm();

            // Assert
            expect(container.state().isShowCreatePopup).toBe(false);
        });
    });
    

    describe('renderForm', () => {
        const props = {
            onClose: jest.fn(),
            customerInfo:{
                roleId: 1
            }
        };
        const formikProps = {
            values: {},
            errors: {},
            touched: {},
            handleChange: jest.fn(),
            handleSubmit: jest.fn(),
            setFieldValue: jest.fn()
        };

        it('handle message responses if unsuccessful', () => {
            // Arrange
            const state = {
                createResult: {
                    isSuccessful: false,
                    message: 'unsuccessful'
                },
                allStatus: [{ statusId: 1, name: 'Closed'}],
                allSettings: initData.settings
            };
            
            const container = shallow(<CreateCommunicationLog {...props}/>).instance();
            container.setState(state);
            // Act
            const renderEdit = shallow(container.renderForm(formikProps));
    
            // Assert 
            expect(renderEdit.find(ResponseMessage).props().isSuccessful).toBe(false);
            expect(renderEdit.find(ResponseMessage).props().message).toEqual('unsuccessful');
        });

        it('handle message responses if successful', () => {
            // Arrange
            const state = {
                createResult: {
                    isSuccessful: true,
                    message: 'InsertCommunicationLogSuccessfully'
                },
                allStatus: [{ statusId: 1, name: 'Closed'}],
                allSettings: initData.settings
            };
           
            const container = shallow(<CreateCommunicationLog {...props}/>).instance();
            container.setState(state);
            // Act
            const renderEdit = shallow(container.renderForm(formikProps));
    
            // Assert 
            expect(renderEdit.find(ResponseMessage).props().isSuccessful).toBe(true);
            expect(renderEdit.find(ResponseMessage).props().message).toEqual('InsertCommunicationLogSuccessfully');
        });

        it('handle default message responses if successful', () => {
            // Arrange
            const state = {
                createResult: {
                    isSuccessful: true
                },
                allStatus: [{ statusId: 1, name: 'Closed'}],
                allSettings: initData.settings
            };
           
            const container = shallow(<CreateCommunicationLog {...props}/>).instance();
            container.setState(state);
            // Act
            const renderEdit = shallow(container.renderForm(formikProps));
    
            // Assert 
            expect(renderEdit.find(ResponseMessage).props().isSuccessful).toBe(true);
            expect(renderEdit.find(ResponseMessage).props().message).toEqual('InsertCommunicationLogSuccessfully');
        });
    });

    describe('handlePasteCustomer', () => {
        it('should do as expected', () => {
            // Arrange
            const customerNameInput = 'sa';
            const event = { clipboardData: { getData: jest.fn(() => 'test1, test2') } };
            const container = shallow(<CreateCommunicationLog />).instance();
            container.handleChangeVerifySection = jest.fn();
            // Act
            container.handlePasteCustomer(event, customerNameInput);
            jest.runAllTimers();

            // Assert
            expect(container.handleChangeVerifySection).toHaveBeenCalledWith('customerNameInput', 'sa,test1,test2');
        });
    });

    describe('handleChangeMainCategory', () => {
        it('should do as expected when categoryIds has value', () => {
            // Arrange
            const values = {subject: 'subject', subCategory: '1,2'};
            const setFieldValue = jest.fn();
            shareScripts.getSubjectOnChangeCategories = jest.fn(()=> 'tempSubject');
            shareScripts.getSubCategories = jest.fn(()=> [1]);

            // Act
            const container = shallow(<CreateCommunicationLog />).instance();
            container.handleChangeVerifySection = jest.fn();
            container.handleChangeMainCategory(setFieldValue, '1,2', 'currentItem', initData.settings);

            // Assert
            expect(setFieldValue).toHaveBeenCalledWith('mainCategoryIds', '1,2');
            expect(container.handleChangeVerifySection).toHaveBeenCalledWith('subject', 'tempSubject');
        });

        it('should do as expected when categoryIds do not has any value', () => {
            // Arrange
            const values = {subject: 'subject', subCategory: '1,2'};
            const setFieldValue = jest.fn();
            shareScripts.getSubjectOnChangeCategories = jest.fn(()=> 'tempSubject');
            shareScripts.getSubCategories = jest.fn(()=> [1]);

            // Act
            const container = shallow(<CreateCommunicationLog />).instance();
            container.handleChangeVerifySection = jest.fn();
            container.handleChangeMainCategory(setFieldValue, undefined, 'currentItem', initData.settings);

            // Assert
            expect(setFieldValue).toHaveBeenCalledWith('subCategoryIds', '');
            expect(container.state.subCategories).toEqual([]);
        });
    });

    describe('render', () => {
        const props = {
            onClose: jest.fn(),
            customerInfo:{
                roleId: 1
            }
        };

        it('modal onHide should call exact function', () => {
            // Arrange
            const container = shallow(<CreateCommunicationLog {...props}/>).instance();
            container.onCloseCreatePopup = jest.fn();
            container.setState({
                allSettings: initData.settings
            });

            // Act
            const renderEdit = shallow(container.render());
            renderEdit.find(Modal).simulate('hide');
            // Assert 
            expect(container.onCloseCreatePopup).toHaveBeenCalled();
        });

        it('component map correct innerRef in formik', () => {
            // Arrange
            const expected = {autoGenerated: 'Date Time & Tool: Invalid date/N/A'};
            const container = shallow(<CreateCommunicationLog {...props}/>).instance();
            container.setState({
                allSettings: initData.settings
            });
            container.initFormikData = jest.fn(() => expected);
            // Act
            const renderEdit = shallow(container.render());
            renderEdit.find(Formik).props().innerRef({});

            // Assert
            expect(container['formik']).toEqual({});
            expect(renderEdit.find(Formik).props().initialValues).toEqual(expected);
        });

        it('should call correct functions when validate', () => {
            // Arrange
            const values = {
                languageId: 0
            };
           
            const container = shallow(<CreateCommunicationLog {...props}/>).instance();
            container.setState({
                allSettings: initData.settings
            });
            commonFunc.validateFormik = jest.fn(() => 'test');

            // Act
            const renderEdit = shallow(container.render());
            renderEdit.find(Formik).props().validate(values);

            // Assert
            expect(renderEdit.find(Formik).length).toBe(1);
            expect(commonFunc.validateFormik).toHaveBeenCalledTimes(1);
        });

        it('SweetModalDialog confirm create render correctly', () => {
            // Arrange
            const state = {
                confirmCreateDialog: { show: true }
            };
           
            const container = shallow(<CreateCommunicationLog {...props}/>).instance();
            container.setState({
                allSettings: initData.settings
            });
            container.handleCheckDuplicate = jest.fn();
            container.handleCloseConfirmCreateDialog = jest.fn();

            container.setState(state);
            const expectedContents = <div>Are you sure you want to Add or Update the Feedback/Log?</div>;
            const expectedButton = [
                <Button variant="primary" size="sm" onClick={container.handleCheckDuplicate}>
                    {LangHelper.getResource('OK')}
                </Button>,
                <Button variant="primary" size="sm" onClick={container.handleCloseConfirmCreateDialog}>
                    {LangHelper.getResource('Cancel')}
                </Button>
            ];

            // Act
            const renderEdit = shallow(container.render());

            // Assert
            expect(renderEdit.find(SweetModalDialog)).toHaveLength(1);
            expect(renderEdit.find(SweetModalDialog).props().contents).toEqual(expectedContents);
            expect(renderEdit.find(SweetModalDialog).props().buttons).toEqual(expectedButton);
        });

        it('SweetModalDialog check duplicate render correctly', () => {
            // Arrange
            const state = {
                checkDuplicateDialog: { show: true }
            };
           
            const container = shallow(<CreateCommunicationLog {...props}/>).instance();
            container.setState({
                allSettings: initData.settings,
                duplicateFeedbackId: 21357
            });
            container.handleCreateLog = jest.fn();
            container.handleCloseCheckDuplicateDialog = jest.fn();

            container.setState(state);
            const expectedContents = <div>{`This customer has a similar log with running number ${21357}. Do you want to create this log?`}</div>;
            const expectedButton = [
                <Button variant="primary" size="sm" onClick={container.handleCreateLog}>
                    {LangHelper.getResource('OK')}
                </Button>,
                <Button variant="primary" size="sm" onClick={container.handleCloseCheckDuplicateDialog}>
                    {LangHelper.getResource('Cancel')}
                </Button>
            ];

            // Act
            const renderEdit = shallow(container.render());

            // Assert
            expect(renderEdit.find(SweetModalDialog)).toHaveLength(1);
            expect(renderEdit.find(SweetModalDialog).props().contents).toEqual(expectedContents);
            expect(renderEdit.find(SweetModalDialog).props().buttons).toEqual(expectedButton);
        });

        it('should call props function when ConfirmPopup submit', () => {
            // Arrange
            const container = shallow(<CreateCommunicationLog {...props} />);
            container.setState({
                allSettings: initData.settings
            });
            
            // Act
            container.setState({ isShowCreatePopup: true });
            const renderCreate = shallow(container.instance().render());
            renderCreate.find(ConfirmPopup).simulate('submit');

            // Assert
            expect(props.onClose).toHaveBeenCalledWith(false);
        });
    });
});