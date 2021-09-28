import React from 'react';
import { InsertCommunicationLog } from '../InsertCommunicationLog';
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

describe('InsertCommunicationLog', () => {
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
                getInsertSettings: jest.fn()
            };

            // Act
            const container = shallow(<InsertCommunicationLog {...props}/>).instance();
            await container.componentDidMount();

            expect(props.getInsertSettings).toHaveBeenCalled();
        });
    });

    describe('initFormikData', () => {
        it('should return exactly when init formik data', () => {
            // Arrange
            const props = {
                insertSettings: initData.settings
            };

            // Act
            const container = shallow(<InsertCommunicationLog {...props} />).instance();
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
            const container = shallow(<InsertCommunicationLog />).instance();
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
            const container = shallow(<InsertCommunicationLog />).instance();
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
            const container = shallow(<InsertCommunicationLog />).instance();

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
            const container = shallow(<InsertCommunicationLog />).instance();

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
            const container = shallow(<InsertCommunicationLog />).instance();
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
            insertSettings: {
                ...initData.settings,
                communicationTools: [{ id: 1, name: 'email' }, { id: 2, name: 'skype' }]
            }
        };
        it('should do as expected when select one communication tool', () => {
            // Arrange
            const currentItem = { id: 1, name: 'email', checked: true };

            // Act
            const container = shallow(<InsertCommunicationLog {...props}/>).instance();
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
            const container = shallow(<InsertCommunicationLog {...props}/>).instance();
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
            const container = shallow(<InsertCommunicationLog {...props}/>).instance();
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
            const container = shallow(<InsertCommunicationLog {...props}/>).instance();
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
            const container = shallow(<InsertCommunicationLog />).instance();
            // Act
            container.setStateSubcategory(2021);

            // Assert
            expect(container.state.subCategories).toEqual(2021);
        });
    });

    describe('setStateSubProduct', () => {
        it('should setState subProduct', () => {
            // Arrange
            const container = shallow(<InsertCommunicationLog />).instance();
            // Act
            container.setStateSubProduct(2021);

            // Assert
            expect(container.state.subProducts).toEqual(2021);
        });
    });

    describe('setStateBetType', () => {
        it('should setState betType', () => {
            // Arrange
            const container = shallow(<InsertCommunicationLog />).instance();
            // Act
            container.setStateBetType(2021);

            // Assert
            expect(container.state.betTypes).toEqual(2021);
        });
    });

    describe('handleVerifyInsertRelatedCustomer', () => {
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
            const container = shallow(<InsertCommunicationLog {...props} />).instance();
            // Act
            container.handleVerifyInsertRelatedCustomer(values, errors, setFieldValue);
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
            const container = shallow(<InsertCommunicationLog {...props} />).instance();
            // Act
            container.handleVerifyInsertRelatedCustomer(values, errors, setFieldValue);
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
            const container = shallow(<InsertCommunicationLog {...props} />).instance();
            // Act
            container.handleVerifyInsertRelatedCustomer(values, errors, setFieldValue);
            await promise;
            jest.runAllTimers();

            // Assert
            expect(errors.customerNameInput).toBe('Customer Name must not over 50 characters long!');
        });
    });

    describe('deleteVerifyInsertCustomer', () => {
        it('should correctly setState when delete verify', () => {
            // Arrange
            const state = {
                relatedCustomers: [{ custId: '1' }, { custId: '2' }, { custId: '3' }]
            };

            // Act
            const container = shallow(<InsertCommunicationLog />).instance();
            container.formik = { values : { autoGenerated: 'test' } };
            container.formik.setFieldValue = jest.fn();
            container.setState(state);
            container.deleteVerifyInsertCustomer('1');

            // Assert
            expect(container.state.relatedCustomers).toEqual([{ custId: '2' }, { custId: '3' }]);
            expect(container.formik.setFieldValue).toHaveBeenCalled();
        });
    });

    describe('handleCollapseExpand', () => {
        it('should update state correct', () => {
            // Arrange
            const container = shallow(<InsertCommunicationLog />).instance();

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
            const container = shallow(<InsertCommunicationLog />).instance();

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

    describe('confirmInsert', () => {
        it('should setState when confirm insert dialog', () => {
            // Arrange
            const container = shallow(<InsertCommunicationLog />).instance();
            const params = { name: 'test'};
            // Act
            container.confirmInsert(params);

            // Assert
            expect(container.state.confirmInsertDialog).toEqual({ show: true, params });
        });
    });

    describe('handleSubmit', () => {
        it('should call exact function when submit', () => {
            // Arrange
            const props = {
                insertSettings: initData.settings
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
            const container = shallow(<InsertCommunicationLog {...props}/>).instance();
            container.confirmInsert = jest.fn();
            // Act
            container.handleSubmit(values, {setSubmitting});

            // Assert
            expect(setSubmitting).toHaveBeenCalledWith(true);
            expect(container.confirmInsert).toHaveBeenCalled();
        });
    });

    describe('handleCloseConfirmInsertDialog', () => {
        it('should setState when close confirm insert dialog', () => {
            // Arrange
            const container = shallow(<InsertCommunicationLog />).instance();
            container.formik = { setSubmitting: jest.fn() };
            // Act
            container.handleCloseConfirmInsertDialog();

            // Assert
            expect(container.state.confirmInsertDialog).toEqual({ show: false });
            expect(container.formik.setSubmitting).toHaveBeenCalledWith(false);
        });
    });

    describe('handleInsertLog', () => {
        it('should setState when handle insert log successful', async () => {
            // Arrange
            const props = {
                insertCommunicationLog: jest.fn(),
                onClose: jest.fn()
            }
            const response = {data: {isSuccessful: true}};
            const promise = Promise.resolve(response);
            props.insertCommunicationLog = jest.fn(() => promise);

            const container = shallow(<InsertCommunicationLog {...props}/>).instance();
            container.formik = { setSubmitting: jest.fn() };
            // Act
            container.handleInsertLog();
            await promise;
            jest.runAllTimers();

            // Assert
            expect(container.state.insertResult).toEqual({isSuccessful: true});
            expect(props.onClose).toHaveBeenCalledWith(true);
        });

        it('should setState when handle insert log unsuccessful', async () => {
            // Arrange
            const props = {
                insertCommunicationLog: jest.fn(),
                onClose: jest.fn()
            }
            const response = {data: {isSuccessful: false}};
            const promise = Promise.resolve(response);
            props.insertCommunicationLog = jest.fn(() => promise);

            const container = shallow(<InsertCommunicationLog {...props}/>).instance();
            container.formik = { setSubmitting: jest.fn() };
            // Act
            container.handleInsertLog();
            await promise;
            jest.runAllTimers();

            // Assert
            expect(container.state.insertResult).toEqual({isSuccessful: false});
            expect(container.formik.setSubmitting).toHaveBeenCalledWith(false);
        });
    });

    describe('handleCheckDuplicate', () => {
        it('should call handle insert log', async () => {
            // Arrange
            const props = {
                checkFeedbackDuplication: jest.fn(),
                onClose: jest.fn(),
                duplicateFeedbackId: 0
            };
            const state = {
                confirmInsertDialog: { params: { customerId: 1, categories: 'test', startTime: '2021-11-20T00:00'}}
            };

            const container = shallow(<InsertCommunicationLog {...props}/>).instance();
            container.handleInsertLog = jest.fn();
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
            expect(container.handleInsertLog).toHaveBeenCalled();
        });

        it('should setState when handle check duplicate', async () => {
            // Arrange
            const props = {
                checkFeedbackDuplication: jest.fn(),
                onClose: jest.fn(),
                duplicateFeedbackId: 1
            };
            const state = {
                confirmInsertDialog: { params: { customerId: 1, categories: 'test', startTime: '2021-11-20T00:00'}}
            };

            const container = shallow(<InsertCommunicationLog {...props}/>).instance();
            container.handleInsertLog = jest.fn();
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
            const container = shallow(<InsertCommunicationLog />).instance();
            container.formik = { setSubmitting: jest.fn() };
            // Act
            container.handleCloseConfirmInsertDialog();

            // Assert
            expect(container.state.checkDuplicateDialog).toEqual({ show: false });
            expect(container.state.confirmInsertDialog).toEqual({ show: false });
            expect(container.formik.setSubmitting).toHaveBeenCalledWith(false);
        });
    });

    describe('renderForm', () => {
        const props = {
            allStatus: [{ statusId: 1, name: 'Closed'}],
            onClose: jest.fn(),
            insertSettings: initData.settings
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
                insertResult: {
                    isSuccessful: false,
                    message: 'unsuccessful'
                }
            };
            
            const container = shallow(<InsertCommunicationLog {...props}/>).instance();
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
                insertResult: {
                    isSuccessful: true,
                    message: 'CreateMultipleLogsSuccessfully'
                }
            };
           
            const container = shallow(<InsertCommunicationLog {...props}/>).instance();
            container.setState(state);
            // Act
            const renderEdit = shallow(container.renderForm(formikProps));
    
            // Assert 
            expect(renderEdit.find(ResponseMessage).props().isSuccessful).toBe(true);
            expect(renderEdit.find(ResponseMessage).props().message).toEqual('CreateMultipleLogsSuccessfully');
        });

        it('handle default message responses if successful', () => {
            // Arrange
            const state = {
                insertResult: {
                    isSuccessful: true
                }
            };
           
            const container = shallow(<InsertCommunicationLog {...props}/>).instance();
            container.setState(state);
            // Act
            const renderEdit = shallow(container.renderForm(formikProps));
    
            // Assert 
            expect(renderEdit.find(ResponseMessage).props().isSuccessful).toBe(true);
            expect(renderEdit.find(ResponseMessage).props().message).toEqual('CreateMultipleLogsSuccessfully');
        });
    });

    describe('renderFormUI', () => {
        const props = {
            allStatus: [{ statusId: 1, name: 'Closed'}],
            onClose: jest.fn(),
            insertSettings: initData.settings,
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
            const container = shallow(<InsertCommunicationLog {...props}/>).instance();
            container.onChangeStartTime = jest.fn();

            // Act
            const renderEdit = shallow(container.renderForm(formikProps));
            renderEdit.find(DatePicker).at(0).simulate('change', 'value');
    
            // Assert
            expect(container.onChangeStartTime).toHaveBeenCalledWith(formikProps.setFieldValue, 'value', '2021-11-20T00:00');
        });

        it('should handle onChange endTime call exact function', () => {
            // Arrange
            const container = shallow(<InsertCommunicationLog {...props}/>).instance();
            container.onChangeEndTime = jest.fn();
            // Act
            const renderEdit = shallow(container.renderForm(formikProps));
            renderEdit.find(DatePicker).at(1).simulate('change', 'value');
    
            // Assert
            expect(container.onChangeEndTime).toHaveBeenCalledWith(formikProps.setFieldValue, '2021-10-20T00:00', 'value');
        });

        it('should handle onChange extension call exact function', () => {
            // Arrange
            const container = shallow(<InsertCommunicationLog {...props}/>).instance();

            // Act
            const renderEdit = shallow(container.renderForm(formikProps));
            renderEdit.find(MultipleSelect).at(0).simulate('change', 'currentItem', 'selectedItemsKey');
    
            // Assert
            expect(formikProps.setFieldValue).toHaveBeenCalledWith('extensionIds', 'selectedItemsKey');
        });

        it('should handle onChange call exact function', () => {
            // Arrange
            const container = shallow(<InsertCommunicationLog {...props}/>).instance();
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
            const container = shallow(<InsertCommunicationLog {...props}/>).instance();
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
            const container = shallow(<InsertCommunicationLog {...props} />).instance();
            const renderEdit = shallow(container.renderForm(formikProps));

            // Assert
            expect(renderEdit.find(MultipleSelect).at(1).props().isInvalid).toEqual(errors.communicationToolIds);
        });

        it('should handle onChange mainCategory call exact function', () => {
            // Arrange
            const container = shallow(<InsertCommunicationLog {...props}/>).instance();
            commonFunc.handleChangeMainCategory = jest.fn();

            // Act
            const renderEdit = shallow(container.renderForm(formikProps));
            renderEdit.find(MultipleSelect).at(2).simulate('change', 'currentItem', '');
    
            // Assert
            expect(commonFunc.handleChangeMainCategory).toHaveBeenCalled();
        });

        it('should handle onChange subCategory call exact function', () => {
            // Arrange
            const container = shallow(<InsertCommunicationLog {...props}/>).instance();

            // Act
            const renderEdit = shallow(container.renderForm(formikProps));
            renderEdit.find(MultipleSelect).at(3).simulate('change', 'currentItem', 'selectedItemsKey');
    
            // Assert
            expect(formikProps.setFieldValue).toHaveBeenCalledWith('subCategoryIds', 'selectedItemsKey');
        });

        it('should handle onChange product call exact function', () => {
            // Arrange

            const container = shallow(<InsertCommunicationLog {...props}/>).instance();
            commonFunc.handleChangeProduct = jest.fn();

            // Act
            const renderEdit = shallow(container.renderForm(formikProps));
            renderEdit.find(MultipleSelect).at(4).simulate('change', 'currentItem', 'selectedItemsKey');
    
            // Assert
            expect(commonFunc.handleChangeProduct).toHaveBeenCalled();
        });

        it('should handle onChange subProduct call exact function', () => {
            // Arrange
            const container = shallow(<InsertCommunicationLog {...props}/>).instance();
            commonFunc.handleChangeSubProduct = jest.fn();

            // Act
            const renderEdit = shallow(container.renderForm(formikProps));
            renderEdit.find(MultipleSelect).at(5).simulate('change', 'currentItem', 'selectedItemsKey');
    
            // Assert
            expect(commonFunc.handleChangeSubProduct).toHaveBeenCalled();
        });

        it('should handle onChange betType call exact function', () => {
            // Arrange
            const container = shallow(<InsertCommunicationLog {...props}/>).instance();

            // Act
            const renderEdit = shallow(container.renderForm(formikProps));
            renderEdit.find(MultipleSelect).at(6).simulate('change', 'currentItem', 'selectedItemsKey');
    
            // Assert
            expect(formikProps.setFieldValue).toHaveBeenCalledWith('betTypeIds', 'selectedItemsKey');
        });

        it('should handle onChange site call exact function', () => {
            // Arrange
            const values = { id: 1 }
            const container = shallow(<InsertCommunicationLog {...props}/>).instance();

            // Act
            const renderEdit = shallow(container.renderForm(formikProps));
            renderEdit.find(SelectWithSearch).simulate('change', values);
           
            // Assert
            expect(formikProps.setFieldValue).toHaveBeenCalled();
        });

        it('onPaste verify customer call exact function', () => {
            // Arrange
            const container = shallow(<InsertCommunicationLog {...props} />).instance();
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
            const container = shallow(<InsertCommunicationLog {...props} />).instance();
            container.handleVerifyInsertRelatedCustomer = jest.fn();
            const renderEdit = shallow(container.renderForm(formikProps));

            // Action
            renderEdit.find(Button).at(0).simulate('click', formikProps.values, formikProps.errors, formikProps.setFieldValue);

            // Assert
            expect(container.handleVerifyInsertRelatedCustomer).toHaveBeenCalledWith(formikProps.values, formikProps.errors, formikProps.setFieldValue);
        });

        it('should handle verify customer call exact function', () => {
            // Arrange
            const state = {
                relatedCustomers: ['sa']
            };
            const container = shallow(<InsertCommunicationLog {...props}/>).instance();
            container.deleteVerifyInsertCustomer = jest.fn();
            container.setState(state);

            // Act
            const renderEdit = shallow(container.renderForm(formikProps));
            renderEdit.find(VerifyCustomer).props().onClick();
           
            // Assert
            expect(container.deleteVerifyInsertCustomer).toHaveBeenCalled();
            expect(renderEdit.find(VerifyCustomer).props().listOfCustomers).toEqual(['sa']);
        });

        it('subject autoComplete change correctly', () => {
            // Arrange
            const value = 'value';
            const container = shallow(<InsertCommunicationLog {...props} />).instance();
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
            insertSettings: initData.settings,
            duplicateFeedbackId: 21357
        };

        it('modal onHide should call exact function', () => {
            // Arrange
            const container = shallow(<InsertCommunicationLog {...props}/>).instance();

            // Act
            const renderEdit = shallow(container.render());
            renderEdit.find(Modal).simulate('hide');
            // Assert 
            expect(props.onClose).toHaveBeenCalled();
        });

        it('component map correct innerRef in formik', () => {
            // Arrange
            const expected = {autoGenerated: 'Date Time & Tool: Invalid date/N/A'};
            const container = shallow(<InsertCommunicationLog {...props}/>).instance();
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
           
            const container = shallow(<InsertCommunicationLog {...props}/>).instance();
            commonFunc.validateFormik = jest.fn(() => 'test');

            // Act
            const renderEdit = shallow(container.render());
            renderEdit.find(Formik).props().validate(values);

            // Assert
            expect(renderEdit.find(Formik).length).toBe(1);
            expect(commonFunc.validateFormik).toHaveBeenCalledTimes(1);
        });

        it('SweetModalDialog confirm insert render correctly', () => {
            // Arrange
            const state = {
                confirmInsertDialog: { show: true }
            };
           
            const container = shallow(<InsertCommunicationLog {...props}/>).instance();
            container.handleCheckDuplicate = jest.fn();
            container.handleCloseConfirmInsertDialog = jest.fn();

            container.setState(state);
            const expectedContents = <div>Are you sure you want to Add or Update the Feedback/Log?</div>;
            const expectedButton = [
                <Button variant="primary" size="sm" onClick={container.handleCheckDuplicate}>
                    {LangHelper.getResource('OK')}
                </Button>,
                <Button variant="primary" size="sm" onClick={container.handleCloseConfirmInsertDialog}>
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
           
            const container = shallow(<InsertCommunicationLog {...props}/>).instance();
            container.handleInsertLog = jest.fn();
            container.handleCloseCheckDuplicateDialog = jest.fn();

            container.setState(state);
            const expectedContents = <div>{`This customer has a similar log with running number ${21357}. Do you want to create this log?`}</div>;
            const expectedButton = [
                <Button variant="primary" size="sm" onClick={container.handleInsertLog}>
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