import React from 'react';
import { CreateCommunicationLog } from '../CreateCommunicationLog';
import Site from '@jsroot/common/site';
import DateTimeService from '@jsroot/common/dateTimeService';
import LangHelper from '@jsroot/common/langHelper';
import { shallow } from 'enzyme';
import { Button, Form, Modal } from 'react-bootstrap';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import VerifyCustomer from '@jsroot/components/verifyCustomer';
import AutoComplete from '@jsroot/components/AutoComplete';
import MultipleSelect from '@jsroot/components/multiple-select/index';
import SelectWithSearch from '@jsroot/components/SelectWithSearch';
import DatePicker from '@jsroot/components/date-picker/index';
import * as commonFunc from '../../common.functions';
import SweetModalDialog from '@jsroot/components/SweetModalDialog';
import { Formik } from 'formik';

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
            subProducts: [{id: 2, value: 'N/A', parentId: 1}]
        },
        hasReviewFeedbackPermission: true
    };

    describe('componentDidMount', () => {
        it('should calls exactly function when componentDidMount', async () => {
            // Arrange
            const props = {
                getAllSettings: jest.fn(),
                getBalanceUpday: jest.fn()
            };

            // Act
            const container = shallow(<CreateCommunicationLog {...props}/>).instance();
            await container.componentDidMount();

            expect(props.getAllSettings).toHaveBeenCalled();
            expect(props.getBalanceUpday).toHaveBeenCalled();
        });
    });

    describe('initFormikData', () => {
        it('should return exactly when init formik data', () => {
            // Arrange
            const props = {
                allSettings: initData.settings
            };

            // Act
            const container = shallow(<CreateCommunicationLog {...props} />).instance();
            const actual = container.initFormikData();

            //Arrange
            expect(actual.countryId).toBe(0);
        });
    });

    describe('onChangeStartTime', () => {
        it('should not update endTime when startTime is before endTime', () => {
            // Arrange
            const setFieldValue = jest.fn();
            const startTime = '2021-12-20T00:00:00-06:00';
            const endTime = '2021-12-20T00:00:00-07:00';
            const container = shallow(<CreateCommunicationLog />).instance();
            container.updateTimeAndToolPrefix = jest.fn();

            // Act
            container.onChangeStartTime(setFieldValue, startTime, endTime);
            jest.runAllTimers();

            // Assert
            expect(setFieldValue).toHaveBeenCalledWith('startTime', startTime);
            expect(container.updateTimeAndToolPrefix).toHaveBeenCalled();
        });

        it('should update endTime when startTime is after endTime', () => {
            // Arrange
            const setFieldValue = jest.fn();
            const startTime = '2021-12-20T00:00:00-06:00';
            const endTime = '2021-11-20T00:00:00-06:00';
            const container = shallow(<CreateCommunicationLog />).instance();
            container.updateTimeAndToolPrefix = jest.fn();

            // Act
            container.onChangeStartTime(setFieldValue, startTime, endTime);
            jest.runAllTimers();

            // Assert
            expect(setFieldValue).toHaveBeenCalledWith('startTime', startTime);
            expect(setFieldValue).toHaveBeenNthCalledWith(2, 'endTime', new Date('2021-12-20T00:00:00-06:01'));
            expect(container.updateTimeAndToolPrefix).toHaveBeenCalled();
        });
    });

    describe('onChangeEndTime', () => {
        it('should not update startTime when startTime is before endTime', () => {
            // Arrange
            const setFieldValue = jest.fn();
            const startTime = '2021-12-20T00:00:00-06:00';
            const endTime = '2021-12-20T00:00:00-07:00';
            const container = shallow(<CreateCommunicationLog />).instance();

            // Act
            container.onChangeEndTime(setFieldValue, startTime, endTime);
            jest.runAllTimers();

            // Assert
            expect(setFieldValue).toHaveBeenCalledWith('endTime', endTime);
        });

        it('should update startTime when startTime is before endTime', () => {
            // Arrange
            const setFieldValue = jest.fn();
            const startTime = '2021-12-20T00:00:00-06:00';
            const endTime = '2021-11-20T00:00:00-06:00';
            const container = shallow(<CreateCommunicationLog />).instance();

            // Act
            container.onChangeEndTime(setFieldValue, startTime, endTime);
            jest.runAllTimers();

            // Assert
            expect(setFieldValue).toHaveBeenCalledWith('endTime', endTime);
            expect(setFieldValue).toHaveBeenNthCalledWith(2, 'startTime', new Date('2021-11-20T00:00:00-05:59'));
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
            container.formik.setFieldValue = jest.fn();
            container.setState(state);
            container.updateTimeAndToolPrefix();

            // Assert
            expect(container.formik.setFieldValue).toHaveBeenCalledWith('autoGenerated',expected);
        });
    });

    describe('handleChangeCommunicationTool', () => {
        const props = {
            allSettings: {
                ...initData.settings,
                communicationTools: [{ id: 1, name: 'email' }, { id: 2, name: 'skype' }]
            }
        };
        it('should do as expected when select one communication tool', () => {
            // Arrange
            const currentItem = { id: 1, name: 'email', checked: true };

            // Act
            const container = shallow(<CreateCommunicationLog {...props}/>).instance();
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

    describe('setStateSubcategory', () => {
        it('should setState subCategory', () => {
            // Arrange
            const container = shallow(<CreateCommunicationLog />).instance();
            // Act
            container.setStateSubcategory(2021);

            // Assert
            expect(container.state.subCategories).toEqual(2021);
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
            }
            const promise = Promise.resolve(response);
            const props = {
                verifyCustomers: jest.fn(() => promise)
            };
            const values = { customerNameInput: 'testing'};
            const errors = { customerNameInput: '' };
            const setFieldValue = jest.fn();
            const expected = [{ 'id': 1, 'val': 'test' }];
            const container = shallow(<CreateCommunicationLog {...props} />).instance();
            // Act
            container.handleVerifyCreateRelatedCustomer(values, errors, setFieldValue);
            await promise;
            jest.runAllTimers();

            // Assert
            expect(props.verifyCustomers).toHaveBeenCalledWith({ username: 'testing' });
            expect(container.state.relatedCustomers).toEqual(expected);
            expect(errors.customerNameInput).toBe('');
        });

        it('should calls setState and remove duplicate when click', async () => {
            const response = {
                data: [{ id: 1, val: 'test' },{ id: 1, val: 'test' }]
            }
            const promise = Promise.resolve(response);
            const props = {
                verifyCustomers: jest.fn(() => promise)
            };
            const values = { customerNameInput: 'testing'};
            const errors = { customerNameInput: '' };
            const setFieldValue = jest.fn();
            const expected = [{ 'id': 1, 'val': 'test' }];
            const container = shallow(<CreateCommunicationLog {...props} />).instance();
            // Act
            container.handleVerifyCreateRelatedCustomer(values, errors, setFieldValue);
            await promise;
            jest.runAllTimers();

            // Assert
            expect(props.verifyCustomers).toHaveBeenCalledWith({ username: 'testing' });
            expect(container.state.relatedCustomers).toEqual(expected);
            expect(errors.customerNameInput).toBe('');
        });

        it('should calls setState when click', async () => {
            const response = {
                data: [{ id: 1, val: 'test' }]
            }
            const promise = Promise.resolve(response);
            const props = {
                verifyCustomers: jest.fn(() => promise)
            };
            const values = { customerNameInput: 'testing1234567891234657891234567891234657981324657981324654978654651613121111322'};
            const errors = { customerNameInput: '' };
            const setFieldValue = jest.fn();
            const container = shallow(<CreateCommunicationLog {...props} />).instance();
            // Act
            container.handleVerifyCreateRelatedCustomer(values, errors, setFieldValue);
            await promise;
            jest.runAllTimers();

            // Assert
            expect(errors.customerNameInput).toBe('Customer Name must not over 50 characters long!');
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
            expect(container.formik.setFieldValue).toHaveBeenCalled();
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
            const props = {
                allSettings: initData.settings
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

            // Act
            container.handleChangeRefTicket(event, setFieldValue);

            // Assert
            expect(setFieldValue).toHaveBeenCalledWith('ticketRefInput', 'testtttttttttttt');
        });

        it('should call exact function when value smaller than 15 characters', () => {
            // Arrange
            const event = {
                target: {value : 'test'}
            };    
            const setFieldValue = jest.fn();       
            const container = shallow(<CreateCommunicationLog />).instance();

            // Act
            container.handleChangeRefTicket(event, setFieldValue);

            // Assert
            expect(setFieldValue).toHaveBeenCalledWith('ticketRefInput', 'test');
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
                relatedCustomers: []
            };
            const setSubmitting = jest.fn();
            const props = {
                verifyCustomers: jest.fn(() => promise)
            };
            const container = shallow(<CreateCommunicationLog {...props}/>).instance();
            container.setState(state);
            const params = { name: 'test'};
            const message = LangHelper.getResource('ErrorMessageInactiveSiteRelate') + 'test';
            // Act
            container.recheckInactiveSiteAndConfirmCreate('username', params, setSubmitting);
            await promise;
            jest.runAllTimers();

            // Assert
            expect(container.state.createResult).toEqual({isSuccessful: false, message});
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
            const props = {
                verifyCustomers: jest.fn(() => promise)
            };
            const container = shallow(<CreateCommunicationLog {...props}/>).instance();
            const params = { name: 'test'};
            // Act
            container.recheckInactiveSiteAndConfirmCreate('username', params, setSubmitting);
            await promise;
            jest.runAllTimers();

            // Assert
            expect(container.state.confirmCreateDialog).toEqual({ show: true, params });
        });
    });

    describe('handleClickFillEvent ', () => {
        it('should do as expected if response errorCode !== 0', async () => {
            // Arrange
            const response = {
                errorCode : '001', description: 'no information'
            };
            const promise = Promise.resolve(response);
            const props = {
                getTicketInfoByRef: jest.fn(() => promise),
            };
            const values = {ticketRefInput: '123', remark: ''};
            const setFieldValue = jest.fn();
            const container = shallow(<CreateCommunicationLog {...props}/>).instance();

            // Act
            container.handleClickFillEvent(values, setFieldValue);
            await promise;
            jest.runAllTimers();

            // Assert
            expect(setFieldValue).toHaveBeenCalledWith('ticketRefInput', '');
            // expect(props.setAddFeedback).toHaveBeenCalledWith({isSuccessful: false, message: response.description});
        });

        it('should do as expected if response errorCode === 0 and first request data and already has data', async () => {
            // Arrange
            const response = {
                errorCode : '0', description: 'test'
            };
            const state = {
                countClickRefTicket: 0
            };
            const promise = Promise.resolve(response);
            const props = {
                getTicketInfoByRef: jest.fn(() => promise)
            };
            const values = {ticketRefInput: '123', remark: '123'};
            const setFieldValue = jest.fn();
            const container = shallow(<CreateCommunicationLog {...props}/>).instance();
            container.setState(state);
            // Act
            container.handleClickFillEvent(values, setFieldValue);
            await promise;
            jest.runAllTimers();

            // Assert
            expect(setFieldValue).toHaveBeenCalledWith('remark', 'test<br>123');
        });

        it('should do as expected if response errorCode === 0 and first request data', async () => {
            // Arrange
            const response = {
                errorCode : '0', description: 'test'
            };
            const state = {
                countClickRefTicket: 0
            };
            const promise = Promise.resolve(response);
            const props = {
                getTicketInfoByRef: jest.fn(() => promise)
            };
            const values = {ticketRefInput: '123', remark: ''};
            const setFieldValue = jest.fn();
            const container = shallow(<CreateCommunicationLog {...props}/>).instance();
            container.setState(state);
            // Act
            container.handleClickFillEvent(values, setFieldValue);
            await promise;
            jest.runAllTimers();

            // Assert
            expect(setFieldValue).toHaveBeenCalledWith('remark', 'test');
        });

        it('should do as expected if response errorCode !== 0 and do not include generated color', async () => {
            // Arrange
            const response = {
                errorCode : '0', description: '<span style=\"color: rgb(255, 0, 0);\">This is an auto-generated entry.</span>'
            };
            const state = {
                countClickRefTicket: 1
            };
            const promise = Promise.resolve(response);
            const props = {
                getTicketInfoByRef: jest.fn(() => promise)
            };
            const values = {ticketRefInput: '123', remark: 'color: rgb(255, 0, 0)'};
            const setFieldValue = jest.fn();
            const container = shallow(<CreateCommunicationLog {...props}/>).instance();
            container.setState(state);
            // Act
            container.handleClickFillEvent(values, setFieldValue);
            await promise;
            jest.runAllTimers();

            // Assert
            expect(setFieldValue).toHaveBeenCalledWith('remark', 'color: rgb(255, 0, 0)');
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
                createCommunicationLog: jest.fn(),
                onClose: jest.fn()
            }
            const response = {data: {isSuccessful: true}};
            const promise = Promise.resolve(response);
            props.createCommunicationLog = jest.fn(() => promise);

            const container = shallow(<CreateCommunicationLog {...props}/>).instance();
            container.formik = { setSubmitting: jest.fn() };
            // Act
            container.handleCreateLog();
            await promise;
            jest.runAllTimers();

            // Assert
            expect(container.state.createResult).toEqual({isSuccessful: true});
            expect(props.onClose).toHaveBeenCalledWith(true);
        });

        it('should setState when handle create log unsuccessful', async () => {
            // Arrange
            const props = {
                createCommunicationLog: jest.fn(),
                onClose: jest.fn()
            }
            const response = {data: {isSuccessful: false}};
            const promise = Promise.resolve(response);
            props.createCommunicationLog = jest.fn(() => promise);

            const container = shallow(<CreateCommunicationLog {...props}/>).instance();
            container.formik = { setSubmitting: jest.fn() };
            // Act
            container.handleCreateLog();
            await promise;
            jest.runAllTimers();

            // Assert
            expect(container.state.createResult).toEqual({isSuccessful: false});
            expect(container.formik.setSubmitting).toHaveBeenCalledWith(false);
        });
    });

    describe('handleCheckDuplicate', () => {
        it('should call handle create log', async () => {
            // Arrange
            const props = {
                checkFeedbackDuplication: jest.fn(),
                onClose: jest.fn(),
                duplicateFeedbackId: 0
            };
            const state = {
                confirmCreateDialog: { params: { customerId: 1, categories: 'test', startTime: '2021-11-20T00:00'}}
            };

            const container = shallow(<CreateCommunicationLog {...props}/>).instance();
            container.handleCreateLog = jest.fn();
            container.setState(state);

            // Act
            await container.handleCheckDuplicate();
            jest.runAllTimers();

            // Assert
            expect(props.checkFeedbackDuplication).toHaveBeenCalledWith({
                customerId: 1,
                categories: 'test',
                startTime: '2021-11-20T00:00'
            });
            expect(container.handleCreateLog).toHaveBeenCalled();
        });

        it('should setState when handle check duplicate', async () => {
            // Arrange
            const props = {
                checkFeedbackDuplication: jest.fn(),
                onClose: jest.fn(),
                duplicateFeedbackId: 1
            };
            const state = {
                confirmCreateDialog: { params: { customerId: 1, categories: 'test', startTime: '2021-11-20T00:00'}}
            };

            const container = shallow(<CreateCommunicationLog {...props}/>).instance();
            container.handleCreateLog = jest.fn();
            container.setState(state);

            // Act
            await container.handleCheckDuplicate();
            jest.runAllTimers();

            // Assert
            expect(container.state.checkDuplicateDialog).toEqual({show: true});
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

    describe('renderForm', () => {
        const props = {
            allStatus: [{ statusId: 1, name: 'Closed'}],
            onClose: jest.fn(),
            allSettings: initData.settings
        }
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
                }
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
                    message: 'CreateCommunicationLogSuccessfully'
                }
            };
           
            const container = shallow(<CreateCommunicationLog {...props}/>).instance();
            container.setState(state);
            // Act
            const renderEdit = shallow(container.renderForm(formikProps));
    
            // Assert 
            expect(renderEdit.find(ResponseMessage).props().isSuccessful).toBe(true);
            expect(renderEdit.find(ResponseMessage).props().message).toEqual('CreateCommunicationLogSuccessfully');
        });

        it('handle default message responses if successful', () => {
            // Arrange
            const state = {
                createResult: {
                    isSuccessful: true
                }
            };
           
            const container = shallow(<CreateCommunicationLog {...props}/>).instance();
            container.setState(state);
            // Act
            const renderEdit = shallow(container.renderForm(formikProps));
    
            // Assert 
            expect(renderEdit.find(ResponseMessage).props().isSuccessful).toBe(true);
            expect(renderEdit.find(ResponseMessage).props().message).toEqual('CreateCommunicationLogSuccessfully');
        });
    });

    describe('renderFormUI', () => {
        const props = {
            allStatus: [{ statusId: 1, name: 'Closed'}],
            onClose: jest.fn(),
            allSettings: initData.settings,
            feedbackSubjectTemplates: ['sa']
        }
        const formikProps = {
            values: {
                startTime: '2021-10-20T00:00',
                endTime: '2021-11-20T00:00',
                subProductIds: '1,2',
                betTypeIds: '3,4',
                customerNameInput: 'test'
            },
            errors: {communicationToolIds: 'errors'},
            touched: {communicationToolIds: 'touched'},
            handleChange: jest.fn(),
            handleSubmit: jest.fn(),
            setFieldValue: jest.fn()
        };

        it('should handle onChange startTime call exact function', () => {
            // Arrange
            const container = shallow(<CreateCommunicationLog {...props}/>).instance();
            container.onChangeStartTime = jest.fn();

            // Act
            const renderEdit = shallow(container.renderForm(formikProps));
            renderEdit.find(DatePicker).at(0).simulate('change', 'value');
    
            // Assert
            expect(container.onChangeStartTime).toHaveBeenCalledWith(formikProps.setFieldValue, 'value', '2021-11-20T00:00');
        });

        it('should handle onChange endTime call exact function', () => {
            // Arrange
            const container = shallow(<CreateCommunicationLog {...props}/>).instance();
            container.onChangeEndTime = jest.fn();
            // Act
            const renderEdit = shallow(container.renderForm(formikProps));
            renderEdit.find(DatePicker).at(1).simulate('change', 'value');
    
            // Assert
            expect(container.onChangeEndTime).toHaveBeenCalledWith(formikProps.setFieldValue, '2021-10-20T00:00', 'value');
        });

        it('should handle onChange extension call exact function', () => {
            // Arrange
            const container = shallow(<CreateCommunicationLog {...props}/>).instance();

            // Act
            const renderEdit = shallow(container.renderForm(formikProps));
            renderEdit.find(MultipleSelect).at(0).simulate('change', 'currentItem', 'selectedItemsKey');
    
            // Assert
            expect(formikProps.setFieldValue).toHaveBeenCalledWith('extensionIds', 'selectedItemsKey');
        });

        it('should handle onChange call exact function', () => {
            // Arrange
            const container = shallow(<CreateCommunicationLog {...props}/>).instance();
            // Act
            const renderEdit = shallow(container.renderForm(formikProps));
            renderEdit.find(Form.Control).at(0).simulate('change', 'value');
            renderEdit.find(Form.Control).at(1).simulate('change', 'value');
            renderEdit.find(Form.Control).at(2).simulate('change', 'value');
            renderEdit.find(Form.Control).at(3).simulate('change', 'value');
            renderEdit.find(Form.Control).at(4).simulate('change', 'value');
            renderEdit.find(Form.Control).at(5).simulate('change', 'value');
            renderEdit.find(Form.Control).at(6).simulate('change', 'value');
    
            // Assert
            expect(formikProps.handleChange).toHaveBeenCalled();
        });

        it('should handle onChange communicationTool call exact function', () => {
            // Arrange
            const container = shallow(<CreateCommunicationLog {...props}/>).instance();
            container.handleChangeCommunicationTool = jest.fn();

            // Act
            const renderEdit = shallow(container.renderForm(formikProps));
            renderEdit.find(MultipleSelect).at(1).simulate('change', 'currentItem', 'selectedItemsKey');
    
            // Assert
            expect(container.handleChangeCommunicationTool).toHaveBeenCalledWith(formikProps.setFieldValue, 'currentItem', 'selectedItemsKey');
        });

        it('invalid communication correctly', () => {
            // Arrange
            const errors = {
                communicationToolIds: 'errors'
            };

            // Action
            const container = shallow(<CreateCommunicationLog {...props} />).instance();
            const renderEdit = shallow(container.renderForm(formikProps));

            // Assert
            expect(renderEdit.find(MultipleSelect).at(1).props().isInvalid).toEqual(errors.communicationToolIds);
        });

        it('should handle onChange mainCategory call exact function', () => {
            // Arrange
            const container = shallow(<CreateCommunicationLog {...props}/>).instance();
            commonFunc.handleChangeMainCategory = jest.fn();

            // Act
            const renderEdit = shallow(container.renderForm(formikProps));
            renderEdit.find(MultipleSelect).at(2).simulate('change', 'currentItem', '');
    
            // Assert
            expect(commonFunc.handleChangeMainCategory).toHaveBeenCalled();
        });

        it('should handle onChange subCategory call exact function', () => {
            // Arrange
            const container = shallow(<CreateCommunicationLog {...props}/>).instance();

            // Act
            const renderEdit = shallow(container.renderForm(formikProps));
            renderEdit.find(MultipleSelect).at(3).simulate('change', 'currentItem', 'selectedItemsKey');
    
            // Assert
            expect(formikProps.setFieldValue).toHaveBeenCalledWith('subCategoryIds', 'selectedItemsKey');
        });

        it('should handle onChange product call exact function', () => {
            // Arrange

            const container = shallow(<CreateCommunicationLog {...props}/>).instance();
            commonFunc.handleChangeProduct = jest.fn();

            // Act
            const renderEdit = shallow(container.renderForm(formikProps));
            renderEdit.find(MultipleSelect).at(4).simulate('change', 'currentItem', 'selectedItemsKey');
    
            // Assert
            expect(commonFunc.handleChangeProduct).toHaveBeenCalled();
        });

        it('should handle onChange subProduct call exact function', () => {
            // Arrange
            const container = shallow(<CreateCommunicationLog {...props}/>).instance();
            commonFunc.handleChangeSubProduct = jest.fn();

            // Act
            const renderEdit = shallow(container.renderForm(formikProps));
            renderEdit.find(MultipleSelect).at(5).simulate('change', 'currentItem', 'selectedItemsKey');
    
            // Assert
            expect(commonFunc.handleChangeSubProduct).toHaveBeenCalled();
        });

        it('should handle onChange betType call exact function', () => {
            // Arrange
            const container = shallow(<CreateCommunicationLog {...props}/>).instance();

            // Act
            const renderEdit = shallow(container.renderForm(formikProps));
            renderEdit.find(MultipleSelect).at(6).simulate('change', 'currentItem', 'selectedItemsKey');
    
            // Assert
            expect(formikProps.setFieldValue).toHaveBeenCalledWith('betTypeIds', 'selectedItemsKey');
        });

        it('should handle onChange site call exact function', () => {
            // Arrange
            const values = { id: 1 }
            const container = shallow(<CreateCommunicationLog {...props}/>).instance();

            // Act
            const renderEdit = shallow(container.renderForm(formikProps));
            renderEdit.find(SelectWithSearch).simulate('change', values);
           
            // Assert
            expect(formikProps.setFieldValue).toHaveBeenCalled();
        });

        it('onPaste verify customer call exact function', () => {
            // Arrange
            const container = shallow(<CreateCommunicationLog {...props} />).instance();
            commonFunc.handlePasteCustomer = jest.fn();
            const event = { clipboardData: { getData: jest.fn().mockReturnValueOnce('event') } };
            const renderEdit = shallow(container.renderForm(formikProps));

            // Action
            renderEdit.find(Form.Control).at(7).simulate('paste', event);

            // Assert
            expect(commonFunc.handlePasteCustomer).toHaveBeenCalled();
        });

        it('onClick verify customer call exact function', () => {
            // Arrange
            const container = shallow(<CreateCommunicationLog {...props} />).instance();
            container.handleVerifyCreateRelatedCustomer = jest.fn();
            const renderEdit = shallow(container.renderForm(formikProps));

            // Action
            renderEdit.find(Button).at(0).simulate('click', formikProps.values, formikProps.errors, formikProps.setFieldValue);

            // Assert
            expect(container.handleVerifyCreateRelatedCustomer).toHaveBeenCalledWith(formikProps.values, formikProps.errors, formikProps.setFieldValue);
        });

        it('should handle verify customer call exact function', () => {
            // Arrange
            const state = {
                relatedCustomers: ['sa']
            };
            const container = shallow(<CreateCommunicationLog {...props}/>).instance();
            container.deleteVerifyCreateCustomer = jest.fn();
            container.setState(state);

            // Act
            const renderEdit = shallow(container.renderForm(formikProps));
            renderEdit.find(VerifyCustomer).props().onClick();
           
            // Assert
            expect(container.deleteVerifyCreateCustomer).toHaveBeenCalled();
            expect(renderEdit.find(VerifyCustomer).props().listOfCustomers).toEqual(['sa']);
        });

        it('subject autoComplete change correctly', () => {
            // Arrange
            const value = 'value';
            const container = shallow(<CreateCommunicationLog {...props} />).instance();
            const renderEdit = shallow(container.renderForm(formikProps));

            // Action
            renderEdit.find(AutoComplete).simulate('change',value);

            // Assert
            expect(formikProps.setFieldValue).toHaveBeenCalledWith('subject', value);
            expect(renderEdit.find(AutoComplete).props().options).toEqual(['sa']);
        });
    });

    describe('render', () => {
        const props = {
            onClose: jest.fn(),
            allSettings: initData.settings,
            duplicateFeedbackId: 21357
        };

        it('modal onHide should call exact function', () => {
            // Arrange
            const container = shallow(<CreateCommunicationLog {...props}/>).instance();

            // Act
            const renderEdit = shallow(container.render());
            renderEdit.find(Modal).simulate('hide');
            // Assert 
            expect(props.onClose).toHaveBeenCalled();
        });

        it('component map correct innerRef in formik', () => {
            // Arrange
            const expected = {autoGenerated: 'Date Time & Tool: Invalid date/N/A'};
            const container = shallow(<CreateCommunicationLog {...props}/>).instance();
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
    });
});