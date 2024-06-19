import React from 'react';
import { AppContainer } from '../AppContainer';
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
        feedback: {
            languageId: 1,
            licenseeType: 0,
            provinceId: 0,
            countryId: 0,
            resolutionDate: 'Aug 16, 2021 03:12:00 PM',
            responseId: 1,
            siteId: 1,
            statusId: 1,
            siteSetting: { name: 'test' },
            settings: [{
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
        settings: {
            bettypeNA: { id: 0, name: 'N/A' },
            bettypes: [{ id: 3, value: 'N/A', parentId: 2 }],
            communicationToolNA: 'null',
            communicationTools: [{ id: 0, name: 'N/A' }],
            countries: [{ id: 0, name: 'N/A' }],
            extensionNA: { id: 0, value: 'N/A' },
            extensions: [{ id: 0, value: 'N/A' }],
            languages: [{ languageId: 0, name: 'N/A' }],
            licenseeTypes: [{ id: 0, name: 'N/A' }],
            mainCategories: [{ mainCategoryID: 0, name: 'N/A' }],
            productNA: { id: 0, value: 'N/A' },
            products: [{ id: 0, value: 'N/A' }],
            responses: [{ id: 0, value: 'N/A' }],
            roles: [{ id: 0, value: 'N/A' }],
            sites: [{ id: 0, name: 'N/A', childSites: [{ id: 1, value: 'child' }] }],
            statusId: [{ id: 0, name: 'N/A' }],
            subCategories: [{ subCategoryId: 2, mainCategoryID: 1, name: 'N/A' }],
            subProductNA: { id: 0, value: 'N/A' },
            subProducts: [{ id: 2, value: 'N/A', parentId: 1 }]
        },
        hasReviewFeedbackPermission: true
    };

    describe('componentDidMount', () => {
        it('should calls setState', async () => {
            // Arrange
            const props = {
                feedbackId: 73300
            };
            const feedbackSettings = {
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
            expect(container.state.extensionOptions).toEqual([{ id: 0, value: 'N/A', checked: true }]);
            expect(container.state.communicationToolOptions).toEqual([{ id: 0, name: 'N/A', checked: false }]);
            expect(container.state.productOptions).toEqual([{ id: 0, value: 'N/A', checked: false }]);
            expect(container.state.subProductOptions).toEqual([{ id: 2, value: 'N/A', checked: true }]);
            expect(container.state.subCategoryOptions).toEqual([{ subCategoryId: 2, name: 'N/A', checked: true }]);
            expect(container.state.mainCategoryOptions).toEqual([{ mainCategoryID: 0, name: 'N/A', checked: false }]);
            expect(container.state.betTypeOptions).toEqual([{ id: 3, value: 'N/A', checked: true }]);
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
            const props = {
                isDeletedFeedbackView: true
            };
            const setSubmitting = jest.fn();
            const values = {
                extensionIds: 2020,
                communicationToolIds: 100,
                subProductIds: 200,
                betTypeIds: 120,
                mainCategoryIds: '1,2',
                subCategoryIds: '5,1',
                productIds: '3,4',
                review: 'test',
                isReviewed: true
            };
            const container = shallow(<AppContainer {...props} />).instance();
            container.setState({
                settings: { subProductNA: { id: 0 }, subCategories: [{ subCategoryId: 1 }], extensionNA: [{ id: 1 }] },
                feedback: { review: 'test', isReviewed: true }
            });
            container.confirmEditFeedback = jest.fn();
            // Act
            container.handleSubmit(values, { setSubmitting });

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
            const params = {
                isOverwrite: false
            }
            const response = { data: { isSuccessful: true } };
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);

            const container = shallow(<AppContainer {...props} />).instance();
            container.formik = { setSubmitting: jest.fn() };
            // Act
            container.handleEditFeedback(params);
            await promise;
            jest.runAllTimers();

            // Assert
            expect(container.state.editResult).toEqual({ isSuccessful: true });
            expect(props.onClose).toHaveBeenCalledWith(true);
        });
    });

    describe('renderForm', () => {
        const props = {
            statusEdit: [{ statusId: 1, name: 'Closed' }],
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
                feedback: {
                    custType: 'type'
                }
            };

            const container = shallow(<AppContainer {...props} />).instance();
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
                feedback: {
                    custType: 'type'
                }
            };

            const container = shallow(<AppContainer {...props} />).instance();
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
                feedback: {
                    custType: 'type'
                }
            };

            const container = shallow(<AppContainer {...props} />).instance();
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
                settings: {
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
                settings: {
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
            container.formik = { setFieldValue: jest.fn(), values: { autoGenerated: 'test' } };
            container.updateAutoGeneratedCustomerPrefix = jest.fn(() => 'test');
            // Act
            container.handleChangeCheckboxHasRelatedCustomer({ target: { checked: true } });

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
            container.formik = { setFieldValue: jest.fn(), values: { autoGenerated: 'test' } };
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

    describe('handleConfirmEditFeedback ', () => {
        it('should call setState when isOverwrite is true', () => {
            // Arrange
            const state = {
                confirmEditFeedbackDialog: { params: { isOverwrite: true } }
            };
            const container = shallow(<AppContainer />).instance();
            container.setState(state);
            // Act
            container.handleConfirmEditFeedback();

            // Assert
            expect(container.state.confirmEditFeedbackDialog.params).toEqual(state.confirmEditFeedbackDialog.params);
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
                relatedCustomers: [{ custId: 1, val: 'test1' }],
                oldReLatedCust: [{ custId: 2, val: 'test2' }],
                deleteRelatedCust: []
            };

            const container = shallow(<AppContainer />).instance();
            container.setState(state);

            // Act
            container.handleReVerifyInactiveAndConfirm(setSubmitting, 'params');
            await promise;

            // Assert
            expect(container.state.editResult).toEqual({ isSuccessful: false, message: 'ErrorMessageInactiveSiteRelatetest' });
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
                relatedCustomers: [{ custId: 1, val: 'test1' }],
                oldReLatedCust: [{ custId: 2, val: 'test2' }],
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
            const state = {
                feedback: {
                    isReviewed: false,
                    review: 'test'
                }
            }
            const container = shallow(<AppContainer />).instance();
            container.setState(state);

            // Act
            var actual = container.isReviewed({ isReviewed: false, review: 'review' });

            // Assert
            expect(actual).toEqual(2);
        });

        it('should return exact value when isReviewed is true', () => {
            // Arrange
            const state = {
                feedback: {
                    isReviewed: false,
                    review: 'review'
                }
            }
            const container = shallow(<AppContainer />).instance();
            container.setState(state);

            // Act
            var actual = container.isReviewed({ isReviewed: true, review: 'review' });

            // Assert
            expect(actual).toEqual(1);
        });

        it('should return exact value when isReviewed is 0', () => {
            // Arrange
            const state = {
                feedback: {
                    isReviewed: true,
                    review: 'review'
                }
            }
            const container = shallow(<AppContainer />).instance();
            container.setState(state);

            // Act
            var actual = container.isReviewed({ isReviewed: true, review: 'review' });

            // Assert
            expect(actual).toEqual(0);
        });
    });

    describe('handleCloseConfirmEditFeedbackDialog', () => {
        it('should call setState', () => {
            // Arrange
            const container = shallow(<AppContainer />).instance();
            container.formik = { setSubmitting: jest.fn() };
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
            expect(container.state.confirmEditFeedbackDialog).toEqual({ show: true, params: 'params' });
        });
    });

    describe('getRelatedCustomerIds', () => {
        it('should return the related customer', () => {
            // Arrange
            const state = {
                relatedCustomers: [{ custId: 1 }, { custId: 2 }]
            };
            const container = shallow(<AppContainer />).instance();
            container.setState(state);
            // Act
            const actual = container.getRelatedCustomerIds(true);

            // Assert
            expect(actual).toEqual("");
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
            const actual = container.getExtensionParams('', { id: 1 });

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
                description: '',
                solution: ''
            };
            const state = {
                settings: {
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
            container.formik = {
                errors: { customerNameInput: 'You must verify the username before saving this feedback.' }
            }
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
            const response = { data: [{ custId: 1, val: 'test1' }] };
            const promise = Promise.resolve(response);
            DataService.postDataAsync = jest.fn(() => promise);
            const event = { preventDefault: jest.fn() };
            const state = {
                relatedCustomers: [{ custId: 2, val: 'test2' }],
                fieldInput: { customerNameInput: 'test' }
            };

            const container = shallow(<AppContainer />).instance();
            container.formik = { values: { hasRelated: true, autoGenerated: 'autoGenerated' }, setFieldValue: jest.fn(), errors: { customerNameInput: '' } };
            container.setState(state);
            container.isValidCustomer = jest.fn(() => true);
            container.updateAutoGeneratedCustomerPrefix = jest.fn(() => 'autoGenerated');

            // Act
            container.handleVerifyRelatedCustomer(event);
            await promise;

            // Assert
            expect(container.state.relatedCustomers).toEqual([{ "custId": 2, "val": "test2" }, { "custId": 1, "val": "test1" }]);
        });
    });

    describe('handleGetFeedbackSubjectTemplates', () => {
        let wrapper;
        let instance;
        const mockSetState = jest.fn();

        beforeEach(() => {
            wrapper = shallow(<AppContainer />);
            instance = wrapper.instance();
            jest.spyOn(instance, 'setState').mockImplementation(mockSetState);
            jest.spyOn(Site, 'debounce').mockImplementation(fn => fn);
        });

        afterEach(() => {
            jest.clearAllMocks();
        });

        it('should clear feedbackSubjectTemplates state when searchText length is < 2', async () => {
            await instance.handleGetFeedbackSubjectTemplates('T');

            expect(instance.state.feedbackSubjectTemplates).toEqual([]);
        });

        it('should handle API call errors gracefully', async () => {
            const mockError = new Error('API Error');
            DataService.getDataAsync.mockRejectedValue(mockError);
            Site.handleAxiosError = jest.fn();
            await instance.handleGetFeedbackSubjectTemplates('Te');

            expect(Site.handleAxiosError).toHaveBeenCalled();
        });
    });

    describe('validateFormikCommunicationTools', () => {
        let wrapper;
        let instance;

        beforeEach(() => {
            wrapper = shallow(<AppContainer />);
            instance = wrapper.instance();
            jest.spyOn(instance, 'getLengthCommunicationValue').mockImplementation((comTool) => comTool.communicationValue.length);
        });

        afterEach(() => {
            jest.clearAllMocks();
        });

        it('should return errors when communicationID or communicationValue is missing', () => {
            const values = { latestFeedbackCommunicationTools: [{ communicationID: null, communicationValue: '', isError: false }] };
            const errors = {};

            LangHelper.getResource.mockReturnValue('Communication is required');

            const result = instance.validateFormikCommunicationTools(values, errors);

            expect(result.latestFeedbackCommunicationTools).toBe('Communication is required');
            expect(values.latestFeedbackCommunicationTools[0].isError).toBe(true);
        });

        it('should return errors when communicationValue exceeds max length', () => {
            const values = { latestFeedbackCommunicationTools: [{ communicationID: 1, communicationValue: 'a'.repeat(201), isError: false }] };
            const errors = {};

            LangHelper.getResource.mockReturnValue('Communication exceeds max length');

            const result = instance.validateFormikCommunicationTools(values, errors);

            expect(result.latestFeedbackCommunicationTools).toBe('Communication exceeds max length');
            expect(values.latestFeedbackCommunicationTools[0].isError).toBe(true);
        });

        it('should not return errors when communicationID and communicationValue are valid', () => {
            const values = { latestFeedbackCommunicationTools: [{ communicationID: 1, communicationValue: 'valid communication', isError: false }] };
            const errors = {};

            const result = instance.validateFormikCommunicationTools(values, errors);

            expect(result.latestFeedbackCommunicationTools).toBeUndefined();
            expect(values.latestFeedbackCommunicationTools[0].isError).toBe(false);
        });
    });

    describe('getLengthCommunicationValue', () => {
        let wrapper;
        let instance;

        beforeEach(() => {
            wrapper = shallow(<AppContainer />);
            instance = wrapper.instance();
        });

        it('should correctly calculate the length of communication values', () => {
            const compic = {
                communicationID: 1,
                communicationValue: '12345',
                picInfo: 'John Doe'
            };

            const indexCompic = 0;

            const communicationTools = [
                {
                    communicationID: 1,
                    communicationValue: '12345',
                    picInfo: 'John Doe'
                },
                {
                    communicationID: 1,
                    communicationValue: '67890',
                    picInfo: 'John Doe'
                },
                {
                    communicationID: 2,
                    communicationValue: 'abcdef',
                    picInfo: 'Jane Smith'
                },
                {
                    communicationID: 1,
                    communicationValue: '11111',
                    picInfo: 'John Doe'
                }
            ];

            const expectedLength = '12345,67890,11111'.length;

            const result = instance.getLengthCommunicationValue(compic, indexCompic, communicationTools);
            expect(result).toEqual(expectedLength);
        });
    });

    describe('getHeadlineCommunicationInfoPIC', () => {
        let wrapper;
        let instance;

        beforeEach(() => {
            wrapper = shallow(<AppContainer />);
            instance = wrapper.instance();
        });

        it('should correctly map communications to headlineStaffInfoPics', () => {
            const communications = [
                {
                    communicationID: 1,
                    communicationName: 'Email',
                    communicationValue: 'example@example.com',
                    picInfo: 'John Doe (Manager)'
                },
                {
                    communicationID: 2,
                    communicationName: 'Phone',
                    communicationValue: '123-456-7890',
                    picInfo: 'John Doe (Manager)'
                },
                {
                    communicationID: 3,
                    communicationName: 'Email',
                    communicationValue: 'jane@example.com',
                    picInfo: 'Jane Smith (Assistant)'
                }
            ];

            const headlineStaffInfoPics = [
                {
                    picID: 101,
                    picName: 'John Doe',
                    picRoleName: 'Manager'
                },
                {
                    picID: 102,
                    picName: 'Jane Smith',
                    picRoleName: 'Assistant'
                }
            ];

            const expectedOutput = [
                {
                    picCommunicationTools: [
                        {
                            picCommunicationId: 1,
                            picCommunicationName: 'Email',
                            picCommunicationValue: 'example@example.com'
                        },
                        {
                            picCommunicationId: 2,
                            picCommunicationName: 'Phone',
                            picCommunicationValue: '123-456-7890'
                        }
                    ],
                    picId: 101,
                    picName: 'John Doe',
                    picRoleName: 'Manager'
                },
                {
                    picCommunicationTools: [
                        {
                            picCommunicationId: 3,
                            picCommunicationName: 'Email',
                            picCommunicationValue: 'jane@example.com'
                        }
                    ],
                    picId: 102,
                    picName: 'Jane Smith',
                    picRoleName: 'Assistant'
                }
            ];

            const result = instance.getHeadlineCommunicationInfoPIC(communications, headlineStaffInfoPics);
            expect(result).toEqual(expectedOutput);
        });
    });

    describe('validateChattypeMappingPic', () => {
        let instance;
        let wrapper;

        beforeEach(() => {
            wrapper = shallow(<AppContainer />);
            instance = wrapper.instance();

            const state = {
                customerInfo: {
                    isGroupHeadLine: true,
                    headlineStaffInfoPics: [
                        {
                            picID: 101,
                            picName: 'John Doe',
                            picRoleName: 'Manager'
                        },
                        {
                            picID: 102,
                            picName: 'Jane Smith',
                            picRoleName: 'Assistant'
                        }
                    ],
                },
                headlineInfoPolicy: 2,
                fieldInput: {
                    latestFeedbackCommunicationTools: [
                        {
                            communicationID: 1,
                            communicationName: 'Email',
                            communicationValue: 'example@example.com',
                            picInfo: 'John Doe (Manager)'
                        },
                        {
                            communicationID: 2,
                            communicationName: 'Phone',
                            communicationValue: '123-456-7890',
                            picInfo: 'John Doe (Manager)'
                        },
                        {
                            communicationID: 3,
                            communicationName: 'Email',
                            communicationValue: 'jane@example.com',
                            picInfo: 'Jane Smith (Assistant)'
                        }
                    ],
                },
            };

            instance.setState(state);

            Site.blockUI.mockClear();
            Site.unblockUI.mockClear();
            DataService.postDataAsync.mockClear();
        });

        it('should validate and edit headline communication pic if conditions are met', async () => {
            DataService.postDataAsync.mockResolvedValue({ data: [] });

            const result = await instance.validateChattypeMappingPic({ isOverwrite: true });

            expect(Site.blockUI).toHaveBeenCalled();
            expect(Site.unblockUI).toHaveBeenCalled();
            expect(result).toEqual([]);
        });

        it('should not validate or edit headline communication pic if conditions are not met', async () => {
            instance.state.customerInfo.isGroupHeadLine = false;

            const result = await instance.validateChattypeMappingPic({ isOverwrite: true });

            expect(Site.blockUI).not.toHaveBeenCalled();
            expect(DataService.postDataAsync).not.toHaveBeenCalled();
            expect(Site.unblockUI).not.toHaveBeenCalled();
            expect(result).toBeNull();
        });

        it('should handle validation errors', async () => {
            const error = new Error('Validation error');
            DataService.postDataAsync.mockRejectedValue(error);

            const result = await instance.validateChattypeMappingPic({ isOverwrite: true });

            expect(Site.blockUI).toHaveBeenCalled();
            expect(DataService.postDataAsync).toHaveBeenCalled();
            expect(result).toBeNull();
        });
    });

    describe('getHeadlineCommunicationInfo', () => {
        let instance;
        let wrapper;
        const mockCommunications = [
            { picInfo: 'Test Pic (Role)', communicationID: 1, communicationValue: 'Value' }
        ];

        const mockState = {
            customerInfo: {
                headlineStaffInfoPics: [
                    {
                        picID: 1,
                        picName: 'Test Pic',
                        picRoleName: 'Role',
                        picCountryID: 'Country',
                        picTypeID: 'TypeID',
                        picRoleID: 'RoleID'
                    }
                ],
                headlineStaffInfoLanguages: [
                    { picID: 1, picLanguageID: 'LanguageID' }
                ]
            }
        };

        beforeEach(() => {
            wrapper = shallow(<AppContainer />);
            instance = wrapper.instance();
            instance.setState(mockState);
        });

        it('should return correct headline communication info', () => {
            const result = instance.getHeadlineCommunicationInfo(mockCommunications);

            expect(result).toHaveLength(1);
            expect(result[0]).toEqual({
                country: 'Country',
                language: 'LanguageID',
                picCommunicationTools: [
                    {
                        type: 1,
                        value: 'Value',
                        isError: false,
                        isNew: false
                    }
                ],
                picId: 1,
                picName: 'Test Pic',
                picType: 'TypeID',
                role: 'RoleID',
                roleName: 'Role',
                isNameError: false,
                isRoleError: false
            });
        });
    });

    describe('getPicChangeInformation', () => {
        it('should return changed headline communication info', () => {
            // Mock necessary data
            const mockLatestFeedbackCommunicationTools = [
                { communicationID: 1, communicationValue: 'Value1' },
                { communicationID: 2, communicationValue: 'Value2' }
            ];

            const mockCustomerInfo = {
                headlineStaffInfoPics: [
                    { picId: 1, picName: 'Pic1', picRoleName: 'Role1' },
                    { picId: 2, picName: 'Pic2', picRoleName: 'Role2' }
                ],
                headlineStaffInfoLanguages: [
                    { picID: 1, picLanguageID: 'Lang1' },
                    { picID: 2, picLanguageID: 'Lang2' }
                ],
                headlineStaffInfoCommunications: [
                    { communicationID: 1, communicationValue: 'Value1' },
                    { communicationID: 2, communicationValue: 'Value3' }
                ]
            };

            const mockState = {
                fieldInput: {
                    latestFeedbackCommunicationTools: mockLatestFeedbackCommunicationTools
                },
                customerInfo: mockCustomerInfo,
                getHeadlineCommunicationInfo: jest.fn().mockImplementation(() => [
                    {
                        picId: 1,
                        picName: 'Pic1',
                        picRoleName: 'Role1',
                        picCommunicationTools: [
                            { type: 1, value: 'Value1' }
                        ]
                    },
                    {
                        picId: 2,
                        picName: 'Pic2',
                        picRoleName: 'Role2',
                        picCommunicationTools: [
                            { type: 2, value: 'Value2' }
                        ]
                    }
                ])
            }

            const wrapper = shallow(<AppContainer />);
            const instance = wrapper.instance();
            instance.setState(mockState);

            const result = instance.getPicChangeInformation();

            expect(result).toHaveLength(0);
        });
    });

    describe('getParamEdit', () => {
        it('should consolidate communication tools correctly', () => {
            const mockLatestFeedbackCommunicationTools = [
                { communicationID: 1, communicationValue: 'Value1' },
                { communicationID: 2, communicationValue: 'Value2' }
            ];

            const mockCustomerInfo = {
                headlineStaffInfoPics: [
                    { picId: 1, picName: 'Pic1', picRoleName: 'Role1' },
                    { picId: 2, picName: 'Pic2', picRoleName: 'Role2' }
                ],
                headlineStaffInfoLanguages: [
                    { picID: 1, picLanguageID: 'Lang1' },
                    { picID: 2, picLanguageID: 'Lang2' }
                ],
                headlineStaffInfoCommunications: [
                    { communicationID: 1, communicationValue: 'Value1' },
                    { communicationID: 2, communicationValue: 'Value3' }
                ]
            };

            const mockState = {
                fieldInput: {
                    latestFeedbackCommunicationTools: mockLatestFeedbackCommunicationTools
                },
                customerInfo: mockCustomerInfo,
                getHeadlineCommunicationInfo: jest.fn().mockImplementation(() => [
                    {
                        picId: 1,
                        picName: 'Pic1',
                        picRoleName: 'Role1',
                        picCommunicationTools: [
                            { type: 1, value: 'Value1' }
                        ]
                    },
                    {
                        picId: 2,
                        picName: 'Pic2',
                        picRoleName: 'Role2',
                        picCommunicationTools: [
                            { type: 2, value: 'Value2' }
                        ]
                    }
                ])
            };

            const wrapper = shallow(<AppContainer />);
            const instance = wrapper.instance();
            instance.setState(mockState);

            const result = instance.getParamEdit();

            expect(result).toHaveLength(0);
        });
    });

    describe('editHeadlineCommunicationPic', () => {
        let wrapper;
        let instance;

        const mockLatestFeedbackCommunicationTools = [
            { communicationID: 1, communicationValue: 'Value1' },
            { communicationID: 2, communicationValue: 'Value2' }
        ];

        const mockCustomerInfo = {
            headlineStaffInfoPics: [
                { picId: 1, picName: 'Pic1', picRoleName: 'Role1' },
                { picId: 2, picName: 'Pic2', picRoleName: 'Role2' }
            ],
            headlineStaffInfoLanguages: [
                { picID: 1, picLanguageID: 'Lang1' },
                { picID: 2, picLanguageID: 'Lang2' }
            ],
            headlineStaffInfoCommunications: [
                { communicationID: 1, communicationValue: 'Value1' },
                { communicationID: 2, communicationValue: 'Value3' }
            ]
        };

        const mockState = {
            fieldInput: {
                latestFeedbackCommunicationTools: mockLatestFeedbackCommunicationTools
            },
            customerInfo: mockCustomerInfo,
            getHeadlineCommunicationInfo: jest.fn().mockImplementation(() => [
                {
                    picId: 1,
                    picName: 'Pic1',
                    picRoleName: 'Role1',
                    picCommunicationTools: [
                        { type: 1, value: 'Value1' }
                    ]
                },
                {
                    picId: 2,
                    picName: 'Pic2',
                    picRoleName: 'Role2',
                    picCommunicationTools: [
                        { type: 2, value: 'Value2' }
                    ]
                }
            ])
        };

        beforeEach(() => {
            wrapper = shallow(<AppContainer />);
            instance = wrapper.instance();
            instance.setState(mockState);
        });

        it('should edit headline communication pic successfully', async () => {
            const mockResponse = { data: [{ isSuccessful: true }] };

            DataService.postDataAsync.mockResolvedValue(mockResponse);

            await instance.editHeadlineCommunicationPic();

            expect(Site.blockUI).toHaveBeenCalled();
            expect(Site.unblockUI).toHaveBeenCalled();
        });

        it('should handle unsuccessful edit with error message', async () => {
            const mockResponse = { data: [{ isSuccessful: false, message: 'Edit failed' }] };

            DataService.postDataAsync.mockResolvedValue(mockResponse);

            await instance.editHeadlineCommunicationPic();

            expect(Site.blockUI).toHaveBeenCalled();
            expect(Site.unblockUI).toHaveBeenCalled();
        });

        it('should handle error during API call', async () => {

            const mockError = new Error('Network error');
            DataService.postDataAsync.mockRejectedValue(mockError);

            await instance.editHeadlineCommunicationPic();

            expect(Site.blockUI).toHaveBeenCalled();
            expect(Site.unblockUI).toHaveBeenCalled();
        });
    });

    describe('getNormalCommunicationInfos', () => {
        let wrapper;
        let instance;

        beforeEach(() => {
            wrapper = shallow(<AppContainer />);
            instance = wrapper.instance();
        });

        it('should aggregate communication tools correctly', () => {
            const latestFeedbackCommunicationTools = [
                { isHeadline: true, picInfo: 'Pic1', communicationID: 1, communicationValue: 'Value1' },
                { isHeadline: false, picInfo: 'Pic2', communicationID: 2, communicationValue: 'Value2' },
                { isHeadline: true, picInfo: 'Pic1', communicationID: 1, communicationValue: 'Value3' }
            ];

            const result = instance.getNormalCommunicationInfos(latestFeedbackCommunicationTools);

            expect(result).toHaveLength(2);
            expect(result[0].communicationValue).toBe('Value1, Value3');
            expect(result[1].communicationValue).toBe('Value2');
        });

        it('should handle empty input', () => {
            const latestFeedbackCommunicationTools = [];

            const result = instance.getNormalCommunicationInfos(latestFeedbackCommunicationTools);

            expect(result).toHaveLength(0);
        });

        it('should handle single item input', () => {
            const latestFeedbackCommunicationTools = [
                { isHeadline: true, picInfo: 'Pic1', communicationID: 1, communicationValue: 'Value1' }
            ];

            const result = instance.getNormalCommunicationInfos(latestFeedbackCommunicationTools);

            expect(result).toHaveLength(1);
            expect(result[0].communicationValue).toBe('Value1');
        });
    });

    describe('getHeadlineCommunicationInfos', () => {
        let wrapper;
        let instance;

        beforeEach(() => {
            wrapper = shallow(<AppContainer />);
            instance = wrapper.instance();
        });

        it('should aggregate communication tools correctly', () => {
            const latestFeedbackCommunicationTools = [
                { isHeadline: true, picInfo: 'Pic1', communicationID: 1, communicationValue: 'Value1' },
                { isHeadline: false, picInfo: 'Pic2', communicationID: 2, communicationValue: 'Value2' },
                { isHeadline: true, picInfo: 'Pic1', communicationID: 1, communicationValue: 'Value3' }
            ];

            const result = instance.getHeadlineCommunicationInfos(latestFeedbackCommunicationTools);

            expect(result).toHaveLength(2);
            expect(result[0].communicationValue).toBe('Value1, Value3');
            expect(result[1].communicationValue).toBe('Value2');
        });

        it('should handle empty input', () => {
            const latestFeedbackCommunicationTools = [];

            const result = instance.getHeadlineCommunicationInfos(latestFeedbackCommunicationTools);

            expect(result).toHaveLength(0);
        });

        it('should handle single item input', () => {
            const latestFeedbackCommunicationTools = [
                { isHeadline: true, picInfo: 'Pic1', communicationID: 1, communicationValue: 'Value1' }
            ];

            const result = instance.getHeadlineCommunicationInfos(latestFeedbackCommunicationTools);

            expect(result).toHaveLength(1);
            expect(result[0].communicationValue).toBe('Value1');
        });
    });

    describe('ExampleComponent', () => {
        it('renders confirm chat type mapping correctly', () => {
            const state = {
                checkChattypeMappingDialog: {
                    data: []
                }
            }

            const wrapper = shallow(<AppContainer />);
            const instance = wrapper.instance();
            instance.setState(state);

            const result = instance.renderComfirmChatTypeMapping();

            expect(result).not.toBeNull();
        });
    });

    describe('ExampleComponent', () => {
        it('renders confirm chat type mapping correctly', () => {
            const wrapper = shallow(<AppContainer />);
            const instance = wrapper.instance();

            const result = instance.renderValueChatTypeMapping([{ picInfo: 'PicInfo1', value: 'Value1' }, { picInfo: 'PicInfo2', value: 'Value2' }]);

            expect(result).toHaveLength(2);
        });
    });
});