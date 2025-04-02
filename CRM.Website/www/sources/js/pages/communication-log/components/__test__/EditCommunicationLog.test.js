import React from 'react';
import { EditCommunicationLog } from '../EditCommunicationLog';
import Site from '@jsroot/common/site';
import DataService from '@jsroot/common/dataService';
import LangHelper from '@jsroot/common/langHelper';
import { shallow } from 'enzyme';
import { Button, Form, Modal } from 'react-bootstrap';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import * as shareScripts from '@jsroot/common/shareScripts';
import * as commonFunc from '../../common.functions';
import SweetModalDialog from '@jsroot/components/SweetModalDialog';
import { Formik } from 'formik';
import ConfirmPopup from '@jsroot/components/ConfirmPopup';
import { toast } from 'react-toastify';

describe('EditCommunicationLog', () => {
    beforeAll(() => {
        jest.useFakeTimers();
        Site.blockUI = jest.fn();
        Site.unblockUI = jest.fn();
        Site.handleAxiosError = jest.fn();
        LangHelper.getResource = jest.fn(key => key);
        const appContainer = document.createElement('div');
        appContainer.setAttribute('id', 'hasCreateFeedbackPermission');
        appContainer.checked = true;
        document.body.appendChild(appContainer);
    });

    afterAll(() => {
        const appContainer = document.getElementById('hasCreateFeedbackPermission');
        if (appContainer) {
            document.body.removeChild(appContainer);
        }
        jest.clearAllMocks();
    });

    const initData = {
        feedback:{
            languageId: 1,
            licenseeType: 0,
            provinceId: 0,
            countryId: 0,
            relatedCustomers: [{ custId: 1, username: 'sa' }],
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
            languages: [{languageId: 0, name: 'N/A'}],
            licenseeTypes:[{id: 0, name: 'N/A'}],
            mainCategories: [{mainCategoryID: 0, name: 'N/A'}],
            productNA:{id: 0, value: 'N/A'},
            products: [{id: 0, value: 'N/A'}],
            responses: [{id: 0, value: 'N/A'}],
            roles: [{id: 0, value: 'N/A'}],
            sites: [{id: 0, name: 'N/A', childSites:[{id: 1, value: 'child'}]}],
            statusId: [{id: 0, name: 'N/A'}],
            subCategories: [{subCategoryId: 2, mainCategoryID: 1, name: 'N/A'}],
            subProductNA: {id: 0, value: 'N/A'},
            subProducts: [{id: 2, value: 'N/A', parentId: 1}]
        },
        hasReviewFeedbackPermission: true,
        log: {
            isReviewed: true,
            review: 'test',
            relatedCustomers: [{
                custId: 1,
                username: 'test',
                isSiteActive: true,
                isLicensee: true
            }]
        }
    };
    
    describe('componentDidMount', () => {
        it('should calls setState', async () => {
            // Arrange
            const props = {
                getLogByFeedbackId: jest.fn(),
                getStatusForEdit: jest.fn(),
                getLogSettings: jest.fn(),
                feedbackId: 73300,
                logFeedback: initData
            };
            const logSettings = {
                extensionIds: [0],
                communicationToolIds: [],
                mainCategoryIds: [1],
                subCategoryIds: [2],
                productIds: [1],
                subProductIds: [2],
                betTypeIds: [3] 
            };

            const response = { data: initData};
            const promise = Promise.resolve(response);
            DataService.getDataAsync = jest.fn(() => promise); 

            // Act
            const container = shallow(<EditCommunicationLog {...props} />).instance();
            container.getLogSettings = jest.fn(() => logSettings);
            container.initFormikData = jest.fn(() => []);
            await container.componentDidMount();
            await promise;
            jest.runAllTimers();

            //Arrange
            expect(container.state.relatedCustomers).toEqual([{ custId: 1, isLicensee: true, isSiteActive: true, val: "test" }]);
            expect(container.state.communicationLog).toEqual([]);
            expect(container.state.settings).toEqual(initData.settings);
            expect(container.state.hasReviewFeedbackPermission).toEqual(true);
            expect(container.state.review).toEqual('test');
            expect(container.state.isReviewed).toEqual(true);
            expect(container.state.extensionOptions).toEqual([{id: 0, value: 'N/A', checked: true}]);
            expect(container.state.communicationToolOptions).toEqual([{id: 0, name: 'N/A', checked: false}]);
            expect(container.state.productOptions).toEqual([{id: 0, value: 'N/A', checked: false}]);
            expect(container.state.subProductOptions).toEqual([{id: 2, value: 'N/A', checked: true}]);
            expect(container.state.subCategoryOptions).toEqual([{subCategoryId: 2, name: 'N/A', checked: true}]);
            expect(container.state.mainCategoryOptions).toEqual([{mainCategoryID: 0, name: 'N/A', checked: false}]);
            expect(container.state.betTypeOptions).toEqual([{id: 3, value: 'N/A', checked: true}]);
        });
    });

    describe('initFormikData', () => {
        it('should return exactly when init formik data', () => {
            // Arrange
            const props = {
                logFeedback: initData
            };

            // Act
            const container = shallow(<EditCommunicationLog {...props} />, { disableLifecycleMethods: true }).instance();
            const actual = container.initFormikData(initData.feedback, initData.settings);

            //Arrange
            expect(actual.countryId).toBe(0);
            expect(actual.siteName).toBe('test');
        });
    });

    describe('getUpdateReviewMode', () => {
        it('should return 0 exactly when update review mode', () => {
            // Arrange
            const props = {
                logFeedback: initData
            };
            const values = {
                review: 'test',
                isReviewed: true
            };

            // Act
            const container = shallow(<EditCommunicationLog {...props} />, { disableLifecycleMethods: true }).instance();
            const actual = container.getUpdateReviewMode(values,'test',true);

            //Arrange
            expect(actual).toBe(0);
        });

        it('should return 2 exactly when update review mode', () => {
            // Arrange
            const props = {
                logFeedback: initData
            };
            const values = {
                review: 'test',
                isReviewed: false
            };

            // Act
            const container = shallow(<EditCommunicationLog {...props} />, { disableLifecycleMethods: true }).instance();
            const actual = container.getUpdateReviewMode(values,'sa',true);

            //Arrange
            expect(actual).toBe(2);
        });

        it('should return 1 exactly when update review mode', () => {
            // Arrange
            const props = {
                logFeedback: initData
            };
            const values = {
                review: 'test',
                isReviewed: true
            };

            // Act
            const container = shallow(<EditCommunicationLog {...props} />, { disableLifecycleMethods: true }).instance();
            const actual = container.getUpdateReviewMode(values,'sa',true);

            //Arrange
            expect(actual).toBe(1);
        });
    });

    describe('getLogSettings', () => {
        it('should return exactly when get log settings', () => {
            // Arrange
            const props = {
                logFeedback: initData
            };

            // Act
            const container = shallow(<EditCommunicationLog {...props} />, { disableLifecycleMethods: true }).instance();
            const actual = container.initFormikData(initData.feedback, initData.settings);

            //Arrange
            expect(actual.extensionIds).toBe('2022');
            expect(actual.communicationToolIds).toBe('');
            expect(actual.mainCategoryIds).toBe('3020');
            expect(actual.subCategoryIds).toBe('4029');
            expect(actual.productIds).toBe('46000');
            expect(actual.subProductIds).toBe('8063');
            expect(actual.betTypeIds).toBe('9144');
        });
    });

    describe('handleSubmit', () => {
        it('should call exact function when submit', () => {
            // Arrange
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
            const container = shallow(<EditCommunicationLog />, { disableLifecycleMethods: true }).instance();
            container.setState({ settings: { subProductNA: { id: 0 }, subCategories: [{subCategoryId: 1}] } });
            container.confirmEditFeedback = jest.fn();
            // Act
            container.handleSubmit(values, {setSubmitting});

            // Assert
            expect(setSubmitting).toHaveBeenCalledWith(true);
            expect(container.confirmEditFeedback).toHaveBeenCalled();
        });
    });

    describe('setStateSubProduct', () => {
        it('should setState subProduct', () => {
            // Arrange
            const container = shallow(<EditCommunicationLog />, { disableLifecycleMethods: true }).instance();
            // Act
            container.setStateSubProduct(2021);

            // Assert
            expect(container.state.subProductOptions).toEqual(2021);
        });
    });

    describe('setStateBetType', () => {
        it('should setState betType', () => {
            // Arrange
            const container = shallow(<EditCommunicationLog />, { disableLifecycleMethods: true }).instance();
            // Act
            container.setStateBetType(2021);

            // Assert
            expect(container.state.betTypeOptions).toEqual(2021);
        });
    });

    describe('handleVerifyRelatedCustomer', () => {
        it('should calls setState when click', async () => {
            const response = {
                data: [{ id: 1, val: 'test' }]
            };
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise); 
            const customerNameInput = 'testing';
            const expected = [{ 'id': 1, 'val': 'test' }];
            const container = shallow(<EditCommunicationLog />, { disableLifecycleMethods: true }).instance();
            container.isValidCustomer = jest.fn(() => true);
            shareScripts.updateAutoGeneratedCustomerPrefix = jest.fn(() => 'updateAutoGenerated');
            container.handleChangeContent = jest.fn();
            container.handleChangeVerifySection = jest.fn();
            // Act
            container.handleVerifyRelatedCustomer(customerNameInput);
            await promise;
            jest.runAllTimers();

            // Assert
            expect(container.handleChangeContent).toHaveBeenCalledWith('autoGenerated', 'updateAutoGenerated');
            expect(container.handleChangeVerifySection).toHaveBeenCalledWith('customerNameInput', '');
            expect(container.state.relatedCustomers).toEqual(expected);
        });

        it('should calls toast error', async () => {
            const response = {
                data: [{ id: 1, val: 'test' }]
            };
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise); 
            const customerNameInput = 'testing1234567891234657891234567891234657981324657981324654978654651613121111322';
            const container = shallow(<EditCommunicationLog />, { disableLifecycleMethods: true }).instance();
            toast.error = jest.fn();
            // Act
            container.handleVerifyRelatedCustomer(customerNameInput);
            await promise;
            jest.runAllTimers();

            // Assert
            expect(toast.error).toHaveBeenCalledWith('The customer name must not be longer than 50 characters!');
        });
    });

    describe('deleteVerifyEditCustomer', () => {
        it('should correctly setState when delete verify', () => {
            // Arrange
            const state = {
                relatedCustomers: [{ custId: '1' }, { custId: '2' }, { custId: '3' }]
            };
            const container = shallow(<EditCommunicationLog />, { disableLifecycleMethods: true }).instance();
            shareScripts.updateAutoGeneratedCustomerPrefix = jest.fn(() => 'updateAutoGenerated');
            container.handleChangeContent = jest.fn();
            container.setState(state);

            // Act
            container.deleteVerifyEditCustomer('1');

            // Assert
            expect(container.state.relatedCustomers).toEqual([{ custId: '2' }, { custId: '3' }]);
            expect(container.handleChangeContent).toHaveBeenCalledWith('autoGenerated', 'updateAutoGenerated');
        });
    });

    describe('handleCollapseExpand', () => {
        it('should update state correct', () => {
            // Arrange
            const container = shallow(<EditCommunicationLog />, { disableLifecycleMethods: true }).instance();

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
            const container = shallow(<EditCommunicationLog />, { disableLifecycleMethods: true }).instance();

            // Act
            container.handleCollapseExpand();

            // Assert
            expect(container.state.collapse).toEqual({
                "": true,
                autoGenerated: false,
                remark: false,
                solution: false,
            });
        });
    });

    describe('confirmEditFeedback', () => {
        it('should setState when confirm edit dialog', () => {
            // Arrange
            const container = shallow(<EditCommunicationLog />, { disableLifecycleMethods: true }).instance();
            const params = { name: 'test'};
            // Act
            container.confirmEditFeedback(params);

            // Assert
            expect(container.state.confirmEditDialog).toEqual({ show: true, params });
        });
    });

    describe('handleCloseConfirmEditDialog', () => {
        it('should setState when close confirm edit dialog', () => {
            // Arrange
            const container = shallow(<EditCommunicationLog />, { disableLifecycleMethods: true }).instance();
            container.formik = { setSubmitting: jest.fn() };
            // Act
            container.handleCloseConfirmEditDialog();

            // Assert
            expect(container.state.confirmEditDialog).toEqual({ show: false });
            expect(container.formik.setSubmitting).toHaveBeenCalledWith(false);
        });
    });

    describe('handleReVerifyInactiveAndConfirm', () => {
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
                editResult: [],
                relatedCustomers: [{custId: 1,val: 'test1'}],
                oldReLatedCust: [{custId: 2,val: 'test2'}]
            };
            const setSubmitting = jest.fn();
            DataService.postDataAsync = jest.fn(() => promise); 
            const container = shallow(<EditCommunicationLog />, { disableLifecycleMethods: true }).instance();
            container.setState(state);
            const params = { name: 'test'};
            const message = LangHelper.getResource('ErrorMessageInactiveSiteRelate') + 'test';
            // Act
            container.handleReVerifyInactiveAndConfirm(params, setSubmitting);
            await promise;
            jest.runAllTimers();

            // Assert
            expect(container.state.editResult).toEqual({isSuccessful: false, message});
            expect(setSubmitting) .toHaveBeenCalledWith(false);
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
            const state = {
                editResult: [],
                relatedCustomers: [{custId: 1,val: 'test1'}],
                oldReLatedCust: [{custId: 2,val: 'test2'}]
            };
            const setSubmitting = jest.fn();
            DataService.postDataAsync = jest.fn(() => promise); 
            const container = shallow(<EditCommunicationLog />, { disableLifecycleMethods: true }).instance();
            container.confirmEditFeedback = jest.fn();
            container.setState(state);
            const params = { name: 'test'};

            // Act
            container.handleReVerifyInactiveAndConfirm(params, setSubmitting);
            await promise;
            jest.runAllTimers();

            // Assert
            expect(container.state.editResult).toEqual(null);
            expect(container.confirmEditFeedback) .toHaveBeenCalledWith(params);
        });
    });

    describe('handleEditLog', () => {
        it('should setState when handle edit log successful', async () => {
            // Arrange
            const props = {
                onClose: jest.fn()
            }
            const response = {data: {isSuccessful: true}};
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise); 

            const container = shallow(<EditCommunicationLog {...props}/>, { disableLifecycleMethods: true }).instance();
            container.formik = { setSubmitting: jest.fn() };
            // Act
            container.handleEditLog();
            await promise;
            jest.runAllTimers();

            // Assert
            expect(container.state.editResult).toEqual({isSuccessful: true});
            expect(props.onClose).toHaveBeenCalledWith(true);
        });

        it('should setState when handle edit log unsuccessful', async () => {
            // Arrange
            const props = {
                onClose: jest.fn()
            }
            const response = {data: {isSuccessful: false}};
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise); 

            const container = shallow(<EditCommunicationLog {...props}/>, { disableLifecycleMethods: true }).instance();
            container.formik = { setSubmitting: jest.fn() };
            // Act
            container.handleEditLog();
            await promise;
            jest.runAllTimers();

            // Assert
            expect(container.state.editResult).toEqual({isSuccessful: false});
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

            const container = shallow(<EditCommunicationLog />, { disableLifecycleMethods: true });
            container.setState({
                communicationLog: {
                    responseId: 0,
                    statusId: 0,
                    siteId: 0
                }
            });

            // Act
            container.instance()['formik'] = { values: values };
            const actual = container.instance().isOldEqualNewIdV1();

            // Assert
            expect(actual).toEqual(false);
        });

        it('should return true when call function isOldEqualNewIdV1', () => {
            // Arrange
            const values = {
                responseId: 0,
                statusId: 0,
                siteId: 0
            };

            const container = shallow(<EditCommunicationLog />, { disableLifecycleMethods: true });
            container.setState({
                communicationLog: {
                    responseId: 1,
                    statusId: 1,
                    siteId: 1
                }
            });

            // Act
            container.instance()['formik'] = { values: values };
            const actual = container.instance().isOldEqualNewIdV1();

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

            const container = shallow(<EditCommunicationLog />, { disableLifecycleMethods: true });
            container.setState({
                communicationLog: {
                    languageId: 0,
                    countryId: 0,
                    licenseeTypeId: 0
                }
            });

            // Act
            container.instance()['formik'] = { values: values };
            const actual = container.instance().isOldEqualNewIdV2();

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

            const container = shallow(<EditCommunicationLog />, { disableLifecycleMethods: true });
            container.setState({
                communicationLog: {
                    languageId: 0,
                    countryId: 0,
                    licenseeTypeId: 0
                }
            });

            // Act
            container.instance()['formik'] = { values: values };
            const actual = container.instance().isOldEqualNewIdV2();

            // Assert
            expect(actual).toEqual(true);
        });
    });

    describe('isOldEqualNewId', () => {
        it('should return true call isOldEqualNewId', () => {
            // Arrange
            const container = shallow(<EditCommunicationLog />, { disableLifecycleMethods: true });

            // Act
            container.instance().isOldEqualNewIdV1 = jest.fn(() => true);
            container.instance().isOldEqualNewIdV2 = jest.fn(() => true);

            const actual = container.instance().isOldEqualNewId();

            // Assert
            expect(actual).toBe(true);
        });

        it('should return false call isOldEqualNewId', () => {
            // Arrange
            const container = shallow(<EditCommunicationLog />, { disableLifecycleMethods: true });

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
                startTime: '12/24/2021 10:05:20 AM',
                endTime: '12/24/2021 10:05:20 AM'
            };

            const container = shallow(<EditCommunicationLog />, { disableLifecycleMethods: true });
            container.setState({
                communicationLog: {
                    subject: 'test',
                    startTime: '12/24/2021 10:05:20 AM',
                    endTime: '12/24/2021 10:05:20 AM',
                    isReviewed: true
                },
                contents: {isReviewed: true}
            });

            // Act
            container.instance()['formik'] = { values: values };
            const actual = container.instance().isOldEqualNewValue();

            // Assert
            expect(actual).toEqual(false);
        });

        it('should return true when call function isOldEqualNewValue', () => {
            // Arrange
            const values = {
                subject: 'test',
                startTime: '',
                endTime: ''
            };

            const container = shallow(<EditCommunicationLog />, { disableLifecycleMethods: true });
            container.setState({
                communicationLog: {
                    subject: 'test',
                    startTime: '12/24/2021 10:05:20 AM',
                    endTime: '12/24/2021 10:05:20 AM'
                }
            });

            // Act
            container.instance()['formik'] = { values: values };
            const actual = container.instance().isOldEqualNewValue();

            // Assert
            expect(actual).toEqual(true);
        });
    });

    describe('isOldEqualNewContent', () => {
        it('should return false when call function isOldEqualNewContent', () => {
            // Arrange
            const values = {
                solution: 'test',
                remark: 'test',
                review: 'test'
            };

            const container = shallow(<EditCommunicationLog />, { disableLifecycleMethods: true });
            container.setState({
                communicationLog: {
                    solution: 'test',
                    remark: 'test',
                    review: 'test'
                },
                contents: {remark: 'test', review: 'test', solution: 'test'}
            });

            // Act
            container.instance()['formik'] = { values: values };
            const actual = container.instance().isOldEqualNewContent();

            // Assert
            expect(actual).toEqual(false);
        });

        it('should return true when call function isOldEqualNewContent', () => {
            // Arrange
            const values = {
                solution: 'test1',
                remark: 'test3',
                review: 'test2'
            };

            const container = shallow(<EditCommunicationLog />, { disableLifecycleMethods: true });
            container.setState({
                communicationLog: {
                    solution: 'test',
                    remark: 'test',
                    review: 'test'
                }
            });

            // Act
            container.instance()['formik'] = { values: values };
            const actual = container.instance().isOldEqualNewContent();

            // Assert
            expect(actual).toEqual(true);
        });
    });

    describe('handleChangeCommunicationTool', () => {
        it('should call exact function', () => {
            // Arrange
            const setFieldValue = jest.fn();
            const container = shallow(<EditCommunicationLog />, { disableLifecycleMethods: true });

            // Act
            container.instance().handleChangeCommunicationTool(setFieldValue, 'currentItem', 'selectedItemsKey');

            // Assert
            expect(setFieldValue).toHaveBeenCalledWith('communicationToolIds', 'selectedItemsKey');
        });
    });

    describe('onChangeStartTime ', () => {
        it('should call exact function', () => {
            // Arrange
            const container = shallow(<EditCommunicationLog />, { disableLifecycleMethods: true }).instance();
            container.formik = {
                setFieldValue: jest.fn()
            };
            // Act
            container.onChangeStartTime('selectedTime');

            // Assert
            expect(container.formik.setFieldValue).toHaveBeenCalledWith('startTime', 'selectedTime');
        });
    });

    describe('onChangeStartTime ', () => {
        it('should call exact function', () => {
            // Arrange
            const container = shallow(<EditCommunicationLog />, { disableLifecycleMethods: true }).instance();
            container.formik = {
                setFieldValue: jest.fn()
            };
            // Act
            container.onChangeEndTime('selectedTime');

            // Assert
            expect(container.formik.setFieldValue).toHaveBeenCalledWith('endTime', 'selectedTime');
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
            const container = shallow(<EditCommunicationLog />, { disableLifecycleMethods: true }).instance();
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
            const container = shallow(<EditCommunicationLog />, { disableLifecycleMethods: true }).instance();
            container.handleChangeVerifySection = jest.fn();
            container.handleChangeMainCategory(setFieldValue, undefined, 'currentItem', initData.settings);

            // Assert
            expect(setFieldValue).toHaveBeenCalledWith('subCategoryIds', '');
            expect(container.state.subCategoryOptions).toEqual([]);
        });
    });

    describe('onCloseEdit', () => {
        it('should setState when call onCloseEdit', () => {
            // Arrange

            const container = shallow(<EditCommunicationLog />, { disableLifecycleMethods: true });

            // Act
            container.instance().isOldEqualNewId = jest.fn(() => true);
            container.instance().isOldEqualNewContent = jest.fn(() => true);
            container.instance().isOldEqualNewValue = jest.fn(() => true);

            container.instance().onCloseEdit();

            // Assert
            expect(container.state().isShowEditPopup).toBe(true);
        });

        it('should call props function when call onCloseEdit', () => {
            // Arrange
            const props = {
                onClose: jest.fn()
            };

            const container = shallow(<EditCommunicationLog {...props}/>, { disableLifecycleMethods: true });

            // Act
            container.instance().isOldEqualNewId = jest.fn(() => false);
            container.instance().isOldEqualNewContent = jest.fn(() => false);
            container.instance().isOldEqualNewValue = jest.fn(() => false);

            container.instance().onCloseEdit();

            // Assert
            expect(props.onClose).toHaveBeenCalledWith(false);
        });
    });

    describe('closeEditConfirm', () => {
        it('should setState exactly when call closeEditConfirm', () => {
            // Arrange

            const container = shallow(<EditCommunicationLog />, { disableLifecycleMethods: true });

            // Act
            container.instance().closeEditConfirm();

            // Assert
            expect(container.state().isShowEditPopup).toBe(false);
        });
    });

    describe('renderForm', () => {
        const props = {
            onClose: jest.fn()
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
                editResult: {
                    isSuccessful: false,
                    message: 'unsuccessful'
                },
                settings: initData.settings,
                statusEdit: [{ statusId: 1, name: 'Closed'}]
            };
            
            const container = shallow(<EditCommunicationLog {...props}/>, { disableLifecycleMethods: true }).instance();
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
                editResult: {
                    isSuccessful: true,
                    message: 'UpdateMultipleLogsSuccessfully'
                },
                settings: initData.settings,
                statusEdit: [{ statusId: 1, name: 'Closed'}]
            };
           
            const container = shallow(<EditCommunicationLog {...props}/>, { disableLifecycleMethods: true }).instance();
            container.setState(state);
            // Act
            const renderEdit = shallow(container.renderForm(formikProps));
    
            // Assert 
            expect(renderEdit.find(ResponseMessage).props().isSuccessful).toBe(true);
            expect(renderEdit.find(ResponseMessage).props().message).toEqual('UpdateMultipleLogsSuccessfully');
        });

        it('handle default message responses if successful', () => {
            // Arrange
            const state = {
                editResult: {
                    isSuccessful: true
                },
                settings: initData.settings,
                statusEdit: [{ statusId: 1, name: 'Closed'}]
            };
           
            const container = shallow(<EditCommunicationLog {...props}/>, { disableLifecycleMethods: true }).instance();
            container.setState(state);
            // Act
            const renderEdit = shallow(container.renderForm(formikProps));
    
            // Assert 
            expect(renderEdit.find(ResponseMessage).props().isSuccessful).toBe(true);
            expect(renderEdit.find(ResponseMessage).props().message).toEqual('UpdateCommunicationLogSuccessfully');
        });
    });

    describe('render', () => {

        it('modal onHide should call exact function', () => {
            // Arrange
            const state = {
                settings: initData.settings,
                communicationLog: initData.feedback,
                statusEdit: [{ statusId: 1, name: 'Closed'}]
            };

            const container = shallow(<EditCommunicationLog />, { disableLifecycleMethods: true }).instance();
            container.setState(state);
            container.onCloseEdit = jest.fn();

            // Act
            const renderEdit = shallow(container.render());
            renderEdit.find(Modal).simulate('hide');
            // Assert 
            expect(container.onCloseEdit).toHaveBeenCalled();
        });

        it('component map correct innerRef in formik', () => {
            // Arrange
            const state = {
                settings: initData.settings,
                communicationLog: initData.feedback,
                statusEdit: [{ statusId: 1, name: 'Closed'}]
            };
           
            const container = shallow(<EditCommunicationLog />, { disableLifecycleMethods: true }).instance();
            container.setState(state);

            // Act
            const renderEdit = shallow(container.render());
            renderEdit.find(Formik).props().innerRef({});

            // Assert
            expect(container['formik']).toEqual({});
            expect(renderEdit.find(Formik).props().initialValues).toEqual(state.communicationLog);
        });

        it('should call correct functions when validate', () => {
            // Arrange
            const state = {
                settings: initData.settings,
                communicationLog: initData.feedback,
                statusEdit: [{ statusId: 1, name: 'Closed'}]
            };
            const values = {
                languageId: 0
            };
           
            const container = shallow(<EditCommunicationLog />, { disableLifecycleMethods: true }).instance();
            commonFunc.validateFormik = jest.fn(() => 'test');
            container.setState(state);

            // Act
            const renderEdit = shallow(container.render());
            renderEdit.find(Formik).props().validate(values);

            // Assert
            expect(renderEdit.find(Formik).length).toBe(1);
            expect(commonFunc.validateFormik).toHaveBeenCalledTimes(1);
        });

        it('SweetModalDialog render correctly', () => {
            // Arrange
            const state = {
                settings: initData.settings,
                communicationLog: initData.feedback,
                confirmEditDialog: { show: true },
                statusEdit: [{ statusId: 1, name: 'Closed'}]
            };
           
            const container = shallow(<EditCommunicationLog />, { disableLifecycleMethods: true }).instance();
            container.handleEditLog = jest.fn();
            container.handleCloseConfirmEditDialog = jest.fn();

            container.setState(state);
            const expectedContents = <div>Are you sure you want to Add or Update the Feedback/Log?</div>;
            const expectedButton = [
                <Button variant="primary" size="sm" onClick={container.handleEditLog}>
                    {LangHelper.getResource('OK')}
                </Button>,
                <Button variant="primary" size="sm" onClick={container.handleCloseConfirmEditDialog}>
                    {LangHelper.getResource('Cancel')}
                </Button>
            ];

            // Act
            const renderEdit = shallow(container.render());

            // Assert
            expect(renderEdit.find(SweetModalDialog)).toHaveLength(1);
            expect(renderEdit.find(SweetModalDialog).props().buttons).toEqual(expectedButton);
        });

        it('should call props function when ConfirmPopup submit', () => {
            // Arrange
            const props = {
                onClose: jest.fn()
            };

            const container = shallow(<EditCommunicationLog {...props}/>, { disableLifecycleMethods: true });
            container.setState({
                settings: initData.settings,
                communicationLog: initData.feedback
            });
            
            // Act
            container.setState({ isShowEditPopup: true });
            const renderEdit = shallow(container.instance().render());
            renderEdit.find(ConfirmPopup).simulate('submit');

            // Assert
            expect(props.onClose).toHaveBeenCalledWith(false);
        });
    });
});