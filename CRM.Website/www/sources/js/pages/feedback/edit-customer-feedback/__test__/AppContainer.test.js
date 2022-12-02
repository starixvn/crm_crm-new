import React from 'react';
import AppContainer from '../AppContainer';
import Site from '@jsroot/common/site';
import LangHelper from '@jsroot/common/langHelper';
import { shallow } from 'enzyme';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import * as shareScripts from '@jsroot/common/shareScripts';
import DataService from '@jsroot/common/dataService';

describe('AppContainer', () => {
    beforeAll(() => {
        jest.useFakeTimers();
        Site.blockUI = jest.fn();
        Site.unblockUI = jest.fn();
        LangHelper.getResource = jest.fn(key => key);
        const appContainer = document.createElement('div');
        appContainer.setAttribute('id', 'hasCreateFeedbackPermission');
        appContainer.checked = true;
        document.body.appendChild(appContainer);
    });

    afterAll(() => {
        jest.clearAllMocks();
        const appContainer = document.getElementById('hasCreateFeedbackPermission');
        if (appContainer) {
            document.body.removeChild(appContainer);
        }
    });

    const initData = {
        feedback:{
            languageId: 1,
            licenseeType: 0,
            provinceId: 0,
            countryId: 0,
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
            ],
            relatedCustomers: [{
                custId: 1,
                username: 'test',
                isSiteActive: true,
                isLicensee: true
            }]
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
        hasReviewFeedbackPermission: true
    };
    
    describe('componentDidMount', () => {
        it('should calls setState', async () => {
            // Arrange
            const props = {
                feedbackId: 73300
            };
            const feedbackSettings  = {
                extensionIds: [0],
                communicationToolIds: [],
                mainCategoryIds: [1],
                subCategoryIds: [2],
                productIds: [1],
                subProductIds: [2],
                betTypeIds: [3] 
            };
            const response = {
                data: initData
            };

            Site.resolveClientUrl = jest.fn(url => url);
            const promise = Promise.resolve(response);
            DataService.getDataAsync = jest.fn(() => promise);

            // Act
            const container = shallow(<AppContainer {...props} />).instance();
            container.getFeedbackSettings = jest.fn(() => feedbackSettings);
            container.initCustomerData = jest.fn(() => []);
            container.initFormikData = jest.fn(() => []);
            await container.componentDidMount();

            //Arrange
            expect(Site.resolveClientUrl).toHaveBeenCalledWith('Feedback/GetCustomerFeedbackById/73300');
            expect(container.state.relatedCustomers).toEqual([{ custId: 1, isLicensee: true, isSiteActive: true, val: "test" }]);
            expect(container.state.settings).toEqual(initData.settings);
            expect(container.state.hasReviewFeedbackPermission).toEqual(true);
            expect(container.state.extensionOptions).toEqual([{id: 0, value: 'N/A', checked: true}]);
            expect(container.state.communicationToolOptions).toEqual([{id: 0, name: 'N/A', checked: false}]);
            expect(container.state.productOptions).toEqual([{id: 0, value: 'N/A', checked: false}]);
            expect(container.state.subProductOptions).toEqual([{id: 2, value: 'N/A', checked: true}]);
            expect(container.state.subCategoryOptions).toEqual([{subCategoryId: 2, name: 'N/A', checked: true}]);
            expect(container.state.mainCategoryOptions).toEqual([{mainCategoryID: 0, name: 'N/A', checked: false}]);
            expect(container.state.betTypeOptions).toEqual([{id: 3, value: 'N/A', checked: true}]);
        });
    });

    describe('getFeedbackSettings', () => {
        it('should return exactly when get log settings', () => {
            // Arrange
            const container = shallow(<AppContainer />).instance();

            // Act
            const actual = container.getFeedbackSettings(initData.feedback, initData.settings);

            //Arrange
            expect(actual.extensionIds[0]).toBe(2022);
            expect(actual.mainCategoryIds[0]).toBe(3020);
            expect(actual.subCategoryIds[0]).toBe(4029);
            expect(actual.productIds[0]).toBe(46000);
            expect(actual.subProductIds[0]).toBe(8063);
            expect(actual.betTypeIds[0]).toBe(9144);
        });
    });

    describe('handleCollapseExpand', () => {
        it('should update state correct', () => {
            // Arrange
            const container = shallow(<AppContainer />).instance();

            // Act
            container.handleCollapseExpand('autoGenerated');

            // Assert
            expect(container.state.collapse).toEqual({
                autoGenerated: true,
                customerInfo: true,
                description: false,
                details: false,
                solution: false
            });
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
            const container = shallow(<AppContainer />).instance();
            container.setState({ settings: { subProductNA: { id: 0 }, subCategories: [{subCategoryId: 1}], extensionNA: [{id: 1}] } });
            container.confirmEditFeedback = jest.fn();
            // Act
            container.handleSubmit(values, {setSubmitting});

            // Assert
            expect(setSubmitting).toHaveBeenCalledWith(true);
            expect(container.confirmEditFeedback).toHaveBeenCalled();
        });
    });

    describe('handleEditFeedback', () => {
        it('should setState when handle edit successful', async () => {
            // Arrange
            const props = {
                onClose: jest.fn()
            };
            const response = {data: {isSuccessful: true}};
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            const container = shallow(<AppContainer {...props}/>).instance();
            container.formik = { setSubmitting: jest.fn() };
            // Act
            container.handleEditFeedback();
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
            };
            const response = {data: {isSuccessful: false}};
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            const container = shallow(<AppContainer {...props}/>).instance();
            container.formik = { setSubmitting: jest.fn() };
            // Act
            container.handleEditFeedback();
            await promise;

            // Assert
            expect(container.formik.setSubmitting).toHaveBeenCalledWith(false);
        });
    });

    describe('renderForm', () => {
        const props = {
            statusEdit: [{ statusId: 1, name: 'Closed'}],
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
                settings: initData.settings
            };
            
            const container = shallow(<AppContainer {...props}/>).instance();
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
                settings: initData.settings
            };
           
            const container = shallow(<AppContainer {...props}/>).instance();
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
                settings: initData.settings
            };
           
            const container = shallow(<AppContainer {...props}/>).instance();
            container.setState(state);
            // Act
            const renderEdit = shallow(container.renderForm(formikProps));
    
            // Assert 
            expect(renderEdit.find(ResponseMessage).props().isSuccessful).toBe(true);
            expect(renderEdit.find(ResponseMessage).props().message).toEqual('UpdateFeedbackSuccessfully');
        });
    });

    describe('handleChangeMainCategory', () => {
        it('should do as expected when selectedCategoryIds is invalid', () => {
            // Arrange
            const setFieldValue = jest.fn();
            const state = {
                settings:{
                    mainCategories: [{ id: 1, name: 'Special Notification' }]
                }
            };
            const container = shallow(<AppContainer />).instance();
            container.setState(state);
            shareScripts.getSubjectOnChangeCategories = jest.fn(() => 'subject');

            // Act
            container.handleChangeMainCategory(setFieldValue, '', '', '');

            // Assert
            expect(setFieldValue).toHaveBeenCalledTimes(3);
            expect(setFieldValue.mock.calls[0]).toEqual(['mainCategoryIds', '']);
            expect(setFieldValue.mock.calls[1]).toEqual(['subject', 'subject']);
            expect(shareScripts.getSubjectOnChangeCategories).toHaveBeenCalledWith([], '', [{ id: 1, name: 'Special Notification' }]);
            expect(container.state.subCategoryOptions).toEqual([]);
        });

        it('should do as expected when selectedCategoryIds is valid', () => {
            // Arrange
            const setFieldValue = jest.fn();
            const state = {
                settings:{
                    mainCategories: [{ id: 1, name: 'Special Notification' }],
                    subCategories: [{ id: 1, name: 'Void Abnormal' }]
                }
            };
            
            const container = shallow(<AppContainer />).instance();
            container.setState(state);
            shareScripts.getSubjectOnChangeCategories = jest.fn(() => 'subject');
            shareScripts.getSubCategories = jest.fn(() => [{ id: 1, name: 'Void Abnormal' }]);

            // Act
            container.handleChangeMainCategory(setFieldValue, '1,2', '1,2', '');

            // Assert
            expect(setFieldValue).toHaveBeenCalledTimes(2);
            expect(setFieldValue.mock.calls[0]).toEqual(['mainCategoryIds', '1,2']);
            expect(shareScripts.getSubjectOnChangeCategories).toHaveBeenCalledWith(['1', '2'], '', [{ id: 1, name: 'Special Notification' }]);
            expect(shareScripts.getSubCategories).toHaveBeenCalledWith(
                ['1', '2'],
                [{ id: 1, name: 'Void Abnormal' }],
                ['1', '2'],
                false
            );
            expect(container.state.subCategoryOptions).toEqual([{ id: 1, name: 'Void Abnormal' }]);
        });
    });

    describe('handleChangeProduct', () => {
        it('should do as expected when selectedProductIds is invalid', () => {
            // Arrange
            const setFieldValue = jest.fn();
            const container = shallow(<AppContainer />).instance();

            // Act
            container.handleChangeProduct(setFieldValue, '', '');

            // Assert
            expect(setFieldValue).toHaveBeenCalledTimes(2);
            expect(container.state.subProductOptions).toEqual([]);
            expect(container.state.betTypeOptions).toEqual([]);
        });

        it('should do as expected when selectedProductIds is valid', () => {
            // Arrange
            const state = {
                settings: {
                    subProducts: [{ id: 1, name: 'Soccer' }]
                }
            };
            const setFieldValue = jest.fn();
            const container = shallow(<AppContainer />).instance();
            container.setState(state);
            shareScripts.getSubProducts = jest.fn(() => [{ id: 1, name: 'Soccer' }]);

            // Act
            container.handleChangeProduct(setFieldValue, '1,2', '1,2');

            // Assert
            expect(setFieldValue).toHaveBeenCalledWith('productIds', '1,2');
            expect(shareScripts.getSubProducts).toHaveBeenCalledWith(
                ['1', '2'],
                [{ id: 1, name: 'Soccer' }],
                ['1', '2'],
                false
            );
            expect(container.state.subProductOptions).toEqual([{ id: 1, name: 'Soccer' }]);
        });
    });

    describe('handleChangeSubProduct ', () => {
        it('should do as expected when selectedProductIds is invalid', () => {
            // Arrange
            const setFieldValue = jest.fn();
            const container = shallow(<AppContainer />).instance();

            // Act
            container.handleChangeSubProduct(setFieldValue, '', '');

            // Assert
            expect(setFieldValue).toHaveBeenCalledTimes(2);
            expect(container.state.subProductOptions).toEqual([]);
            expect(container.state.betTypeOptions).toEqual([]);
        });

        it('should do as expected when selectedProductIds is valid', () => {
            // Arrange
            const state = {
                settings: {
                    bettypes: [{ id: 1, name: 'HDP' }]
                }
            };
            const setFieldValue = jest.fn();
            const container = shallow(<AppContainer />).instance();
            container.setState(state);
            shareScripts.getBetTypes = jest.fn(() => [{ id: 1, name: 'HDP' }]);

            // Act
            container.handleChangeSubProduct(setFieldValue, '1,2', '1,2');

            // Assert
            expect(shareScripts.getBetTypes).toHaveBeenCalledWith(
                ['1', '2'],
                [{ id: 1, name: 'HDP' }],
                ['1', '2'],
                false
            );
            expect(container.state.betTypeOptions).toEqual([{ id: 1, name: 'HDP' }]);
        });
    });

    describe('handleChangeCheckboxHasRelatedCustomer  ', () => {
        it('should call setFieldValue', () => {
            // Arrange
            const container = shallow(<AppContainer />).instance();
            container.formik = { setFieldValue: jest.fn(), values: {autoGenerated: 'test'} };
            container.updateAutoGeneratedCustomerPrefix = jest.fn(() => 'test');
            // Act
            container.handleChangeCheckboxHasRelatedCustomer({target: { checked:true}});

            // Assert
            expect(container.formik.setFieldValue).toHaveBeenCalledTimes(2);
        });
    });

    describe('deleteCustomerVerify', () => {
        it('should correctly setState', () => {
            // Arrange
            const state = {
                relatedCustomers: [{ custId: '1' }, { custId: '2' }, { custId: '3' }],
                deleteRelatedCust: [{ custId: '4' }]
            };
            const container = shallow(<AppContainer />).instance();
            container.setState(state);
            container.formik = { setFieldValue: jest.fn(), values: {autoGenerated: 'test'} };
            container.updateAutoGeneratedCustomerPrefix = jest.fn(() => 'test');

            // Act
            container.deleteCustomer('1');

            // Assert
            expect(container.state.relatedCustomers).toEqual([{ custId: '2' }, { custId: '3' }]);
            expect(container.state.deleteRelatedCust).toEqual([{ custId: '4' }, { custId: '1' }]);
            expect(container.formik.setFieldValue).toHaveBeenCalledTimes(1);
        });
    });

    describe('handlePasteCustomer', () => {
        it('should do as expected', () => {
            // Arrange
            const event = { clipboardData: { getData: jest.fn(() => 'test1, test2') } };
            const container = shallow(<AppContainer />).instance();

            // Act
            container.handlePasteCustomer(event, 'sa');
            jest.runAllTimers();

            // Assert
            expect(container.state.fieldInput.customerNameInput).toEqual('sa,test1,test2');
        });
    });

    describe('isValidCustomer', () => {
        it('should return valid customer', () => {
            // Arrange
            const container = shallow(<AppContainer />).instance();

            // Act
            const validCustomer = container.isValidCustomer('test');
            
            // Assert
            expect(validCustomer).toBe(true);
        });

        it('should return invalid customer', () => {
            // Arrange
            const customer = 'sa123465798123456789123456789123468789132465789132465789132';
            const container = shallow(<AppContainer />).instance();

            // Act
            const validCustomer = container.isValidCustomer(customer);

            // Assert
            expect(validCustomer).toBe(false);
        });
    });

    describe('handleConfirmOverwriteCustomerInfo ', () => {
        it('should call exactly function', () => {
            // Arrange
            const container = shallow(<AppContainer />).instance();

            // Act
            container.handleConfirmOverwriteCustomerInfo();
            container.handleEditFeedback = jest.fn();
            // Assert
            expect(container.state.confirmOverwriteCustomerInfoDialog).toEqual({ show: false });
        });
    });

    describe('handleCloseConfirmOverwriteCustomerInfoDialog ', () => {
        it('should call exactly function', () => {
            // Arrange
            const container = shallow(<AppContainer />).instance();
            container.formik = { setSubmitting: jest.fn() };

            // Act
            container.handleCloseConfirmOverwriteCustomerInfoDialog();
            
            // Assert
            expect(container.state.confirmOverwriteCustomerInfoDialog).toEqual({ show: false });
            expect(container.formik.setSubmitting).toHaveBeenCalledWith(false);
        });
    });

    describe('handleConfirmEditFeedback ', () => {
        it('should call setState when isOverwrite is true', () => {
            // Arrange
            const state = {
                confirmEditFeedbackDialog: { params: {isOverwrite: true}}
            };
            const container = shallow(<AppContainer />).instance();
            container.setState(state);
            // Act
            container.handleConfirmEditFeedback();
            
            // Assert
            expect(container.state.confirmEditFeedbackDialog.params).toEqual(state.confirmEditFeedbackDialog.params);
        });

        it('should call exact function when isOverwrite is false', () => {
            // Arrange
            const state = {
                confirmEditFeedbackDialog: { params: {isOverwrite: false} }
            };
            const container = shallow(<AppContainer />).instance();
            container.setState(state);
            container.handleEditFeedback = jest.fn();
            // Act
            container.handleConfirmEditFeedback();
            
            // Assert
            expect(container.state.confirmEditFeedbackDialog).toEqual({ show: false });
            expect(container.handleEditFeedback ).toHaveBeenCalled();
        });
    });

    describe('handleReVerifyInactiveAndConfirm ', () => {
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
            const setSubmitting = jest.fn();

            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);
            const state = {
                relatedCustomers: [{custId: 1,val: 'test1'}],
                oldReLatedCust: [{custId: 2,val: 'test2'}],
                deleteRelatedCust: []
            };

            const container = shallow(<AppContainer />).instance();
            container.setState(state);

            // Act
            container.handleReVerifyInactiveAndConfirm(setSubmitting, 'params');
            await promise;

            // Assert
            expect(container.state.editResult).toEqual({isSuccessful: false, message:'ErrorMessageInactiveSiteRelatetest'});
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
            const setSubmitting = jest.fn();

            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);
            const state = {
                relatedCustomers: [{custId: 1,val: 'test1'}],
                oldReLatedCust: [{custId: 2,val: 'test2'}],
                deleteRelatedCust: []
            };

            const container = shallow(<AppContainer />).instance();
            container.confirmEditFeedback = jest.fn();
            container.setState(state);

            // Act
            container.handleReVerifyInactiveAndConfirm(setSubmitting, 'params');
            await promise;

            // Assert
            expect(container.state.editResult).toEqual(null);
            expect(container.confirmEditFeedback).toHaveBeenCalled();
        });
    });

    describe('isReviewed', () => {
        it('should return exact value when isReviewed is false', () => {
            // Arrange
            const container = shallow(<AppContainer />).instance();

            // Act
            var actual = container.isReviewed({isReviewed: false});

            // Assert
            expect(actual).toEqual(2);
        });

        it('should return exact value when isReviewed is true', () => {
            // Arrange
            const container = shallow(<AppContainer />).instance();
            container.formik = {values: {review: 'review'}};

            // Act
            var actual = container.isReviewed({isReviewed: true, review: 'review'});

            // Assert
            expect(actual).toEqual(0);
        });
    });

    describe('handleCloseConfirmEditFeedbackDialog', () => {
        it('should call setState', () => {
            // Arrange
            const container = shallow(<AppContainer />).instance();
            container.formik = { setSubmitting: jest.fn()};
            // Act
            container.handleCloseConfirmEditFeedbackDialog();

            // Assert
            expect(container.formik.setSubmitting).toHaveBeenCalledWith(false);
            expect(container.state.confirmEditFeedbackDialog).toEqual({ show: false });
        });
    });

    describe('confirmEditFeedback', () => {
        it('should call setState', () => {
            // Arrange
            const container = shallow(<AppContainer />).instance();
            // Act
            container.confirmEditFeedback('params');

            // Assert
            expect(container.state.confirmEditFeedbackDialog).toEqual({ show: true, params:'params' });
        });
    });

    describe('getRelatedCustomerIds', () => {
        it('should return the related customer', () => {
            // Arrange
            const state = {
                relatedCustomers: [{custId:1},{custId:2}]
            };
            const container = shallow(<AppContainer />).instance();
            container.setState(state);
            // Act
            const actual = container.getRelatedCustomerIds(true);

            // Assert
            expect(actual).toEqual("1,2");
        });
    });

    describe('getExtensionParams', () => {
        it('should return exact value if selectedExtensionIds have length greater than 0', () => {
            // Arrange
            const container = shallow(<AppContainer />).instance();
            // Act
            const actual = container.getExtensionParams('1,2');

            // Assert
            expect(actual).toEqual('1,2');
        });

        it('should return exact value if selectedExtensionIds have length equal 0 and extensionNA  not null', () => {
            // Arrange
            const container = shallow(<AppContainer />).instance();
            // Act
            const actual = container.getExtensionParams('', {id:1});

            // Assert
            expect(actual).toEqual('1');
        });
    });

    describe('validateFormik', () => {
        it('should return exact errors', () => {
            // Arrange
            const values = {
                hasRelated: true,
                customerNameInput: 'customerName',
                feedbackDate: '2021-01-02',
                resolutionDate: '2021-01-01',
                communicationToolIds: [],
                languageId: 0,
                relatedCustomers: [],
                subject: '',
                description : '',
                solution: ''
            };
            const state = {
                settings:{
                    mainCategories: [],
                    subCategories: []
                }
            };
            const expected = {
                communicationToolIds: "FieldRequired",
                customerNameInput: "You must verify the username before saving this feedback.",
                description: "FieldRequired",
                languageId: "FieldRequired",
                mainCategoryIds: "FieldRequired",
                solution: "FieldRequired",
                feedbackDate: "FieldLessThanOrEqualTo",
                subCategoryIds: "FieldRequired",
                subject: "FieldRequired"
            };
            const container = shallow(<AppContainer />).instance();
            container.setState(state);

            // Act
            const actual = container.validateFormik(values);

            // Assert
            expect(actual).toEqual(expected);
        });
    });

    describe('handleVerifyRelatedCustomer', () => {
        it('should call setFieldValue when have inactive member site', async () => {
            // Arrange
            const response = {data: [{custId: 1, val: 'test1'}]};
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);
            const event = {preventDefault: jest.fn()};
            const state = {
                relatedCustomers: [{custId: 2, val: 'test2'}],
                fieldInput: {customerNameInput: 'test'}
            };

            const container = shallow(<AppContainer />).instance();
            container.formik = { values: {hasRelated: true, autoGenerated: 'autoGenerated'}, setFieldValue: jest.fn(), errors: {customerNameInput: ''}};
            container.setState(state);
            container.isValidCustomer = jest.fn(() => true);
            container.updateAutoGeneratedCustomerPrefix = jest.fn(() => 'autoGenerated');
            
            // Act
            container.handleVerifyRelatedCustomer(event);
            await promise;

            // Assert
            expect(container.state.relatedCustomers).toEqual([{"custId": 2, "val": "test2"}, {"custId": 1, "val": "test1"}]);
        });

        it('should return errors when have invalid customer name input', () => {
            // Arrange
            const event = {preventDefault: jest.fn()};
            const state = {
                relatedCustomers: [{custId: 2, val: 'test2'}],
                fieldInput:{
                    customerNameInput: 'test'
                }
            };

            const container = shallow(<AppContainer />).instance();
            container.formik = { values: {hasRelated: true, autoGenerated: 'autoGenerated'}, setFieldValue: jest.fn(), errors: {customerNameInput: ''}};
            container.setState(state);
            container.isValidCustomer = jest.fn(() => false);
            
            // Act
            container.handleVerifyRelatedCustomer(event);

            // Assert
            expect(container.formik.errors.customerNameInput).toEqual('Customer Name must not over 50 characters long!');
        });
    });
});