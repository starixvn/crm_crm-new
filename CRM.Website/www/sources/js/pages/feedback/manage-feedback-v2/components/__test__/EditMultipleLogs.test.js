import React from 'react';
import { shallow } from 'enzyme';
import EditMultipleLogs from '../EditMultipleLogs';
import Site from '@jsroot/common/site';
import LangHelper from '@jsroot/common/langHelper';
import DataService from '@jsroot/common/dataService';
import * as shareScripts from '@jsroot/common/shareScripts';
import { Button, Form, Modal } from 'react-bootstrap';
import ResponseMessage from '@jsroot/components/ResponseMessage';
import AutoComplete from '@jsroot/components/AutoComplete';
import CkEditor from '@jsroot/components/ckeditor/index';
import MultipleSelect from '@jsroot/components/multiple-select/index';
import SelectWithSearch from '@jsroot/components/SelectWithSearch';
import DatePicker from '@jsroot/components/date-picker/index';
import * as commonFunc from '../../common.functions';
import SweetModalDialog from '@jsroot/components/SweetModalDialog';
import { Formik } from 'formik';


describe('EditMultipleLogs', () => {
    beforeAll(() => {
        jest.useFakeTimers();
        Site.blockUI = jest.fn();
        Site.unblockUI = jest.fn();
        LangHelper.getResource = jest.fn(key => key);
        window.currentUsername = 'test';
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    LangHelper.formatString = jest.fn(value => value);
    LangHelper.getResource = jest.fn(value => value);
    const initData = {
        communicationLog:{
            languageId: 1,
            licenseeType: 0,
            provinceId: 0,
            countryId: 0,
            relatedCustomers: [],
            resolutionDate: 'Aug 16, 2021 03:12:00 PM',
            responseId: 1,
            siteId: 1,
            statusId: 1,
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
        communication: [],
        hasReviewFeedbackPermission: true
    };
    describe('componentDidMount', () => {
        it('should calls setState', async () => {
             // Arrange
            const response = {data: initData};
            const promise = Promise.resolve(response);
            const props = {
                feedbackArr: [{feedbackId: 1}]
            };
            const commSetting = {
                extensionIds: [],
                communicationToolIds: [],
                mainCategoryIds: [1],
                subCategoryIds: [2],
                productIds: [1],
                subProductIds: [2],
                betTypeIds: [3],
                siteInfos: []
            };
            Site.resolveClientUrl = jest.fn(url => url);
            DataService.getDataAsync = jest.fn(() => promise);
            // Act
            const container = shallow(<EditMultipleLogs {...props} />).instance();
            container.getCommunicationSettings = jest.fn(() => commSetting);
            await promise;
            jest.runAllTimers();

            //Arrange
            expect(Site.resolveClientUrl).toHaveBeenCalledWith('MultipleLogs/GetLogSettingByFeedbackId/1');
            expect(container.state.extensionOptions).toEqual([{id: 0, value: 'N/A', checked: false}]);
            expect(container.state.communicationToolOptions).toEqual([{id: 0, name: 'N/A', checked: false}]);
            expect(container.state.productOptions).toEqual([{id: 0, value: 'N/A', checked: false}]);
            expect(container.state.subProductOptions).toEqual([{id: 2, value: 'N/A', checked: true}]);
            expect(container.state.subCategoryOptions).toEqual([{subCategoryId: 2, name: 'N/A', checked: true}]);
            expect(container.state.mainCategoryOptions).toEqual([{mainCategoryID: 0, name: 'N/A', checked: false}]);
            expect(container.state.betTypeOptions).toEqual([{id: 3, value: 'N/A', checked: true}]);
        });
    }); 

    describe('getCommunicationSettings', () => {
        it('should return expect data', async () => {
             // Arrange
             const container = shallow(<EditMultipleLogs />, { disableLifecycleMethods: true }).instance();
             const expected = {
                extensionIds: [2022],
                communicationToolIds: [1001],
                mainCategoryIds: [3020],
                subCategoryIds: [4029],
                productIds: [46000],
                subProductIds: [8063],
                betTypeIds: [9144],
                siteInfos: [{
                    id: 1,value: 'child'
                }]
             };
            // Act
            const actual = container.getCommunicationSettings(initData.communicationLog, initData.settings);

            //Arrange
            expect(actual).toEqual(expected);
           
        });
    }); 

    describe('onChangeMainCategory', () => {
        it('should do as expected when selectedItemsKey has value', () => {
            // Arrange
            const state = {
                settings: {
                    mainCategories: [1]
                }
            };
            const values = {subject: 'subject', subCategory: '1,2'};
            const setFieldValue = jest.fn();
            const container = shallow(<EditMultipleLogs />, { disableLifecycleMethods: true }).instance();
            container.setState(state);
            shareScripts.getSubjectOnChangeCategories = jest.fn(()=> 'tempSubject');
            shareScripts.getSubCategories = jest.fn(()=> [1]);

            // Act
            container.onChangeMainCategory(setFieldValue, '1,2', 'currentItem', values);

            // Assert
            expect(setFieldValue).toHaveBeenCalledWith('mainCategoryIds', '1,2');
            expect(setFieldValue).toHaveBeenCalledWith('subject', 'tempSubject');
            expect(container.state.subCategoryOptions).toEqual([1]);
        });

        it('should do as expected when selectedItemsKey is empty', () => {
            // Arrange
            const state = {
                settings: {
                    mainCategories: [1]
                }
            };
            const setFieldValue = jest.fn();
            const values = {subject: 'subject', subCategory: '1,2'};
            const container = shallow(<EditMultipleLogs />, { disableLifecycleMethods: true }).instance();
            container.setState(state);
            shareScripts.getSubjectOnChangeCategories = jest.fn(()=> 'tempSubject');

            // Act
            container.onChangeMainCategory(setFieldValue, '', 'currentItem', values);

            // Assert
            expect(setFieldValue).toHaveBeenCalledWith('subCategoryIds', '');
            expect(container.state.subCategoryOptions).toEqual([]);
        });
    });

    describe('productHandleChang', () => {
        it('should do as expected when selectedItemsKey has value', () => {
            // Arrange
            const state = {
                settings: {
                    subProducts: [1]
                }
            };
            const setFieldValue = jest.fn();
            const container = shallow(<EditMultipleLogs /> , { disableLifecycleMethods: true }).instance();
            container.setState(state);
            shareScripts.getSubProducts = jest.fn(()=> [1]);

            // Act
            container.onChangeProduct(setFieldValue, '1,2', '1');

            // Assert
            expect(setFieldValue).toHaveBeenCalledWith('productIds', '1,2');
            expect(container.state.subProductOptions).toEqual([1]);
        });

        it('should do as expected when selectedItemsKey is empty', () => {
            // Arrange
            const state = {
                settings: {
                    subProducts: [1]
                }
            };
            const setFieldValue = jest.fn();
            const container = shallow(<EditMultipleLogs />, { disableLifecycleMethods: true }).instance();
            container.setState(state);
            shareScripts.getSubProducts = jest.fn(()=> [1]);

            // Act
            container.onChangeProduct(setFieldValue, '', '1');

            // Assert
            expect(setFieldValue).toHaveBeenCalledWith('subProductIds', '');
            expect(setFieldValue).toHaveBeenCalledWith('productIds', '');
            expect(setFieldValue).toHaveBeenCalledWith('betTypeIds', '');

            expect(container.state.subProductOptions).toEqual([]);
            expect(container.state.betTypeOptions).toEqual([]);
        });
    });

    describe('onChangeSubProduct', () => {
        it('should do as expected when selectedItemsKey has value', () => {
            // Arrange
            const state = {
                settings: {
                    bettypes: [1]
                }
            };
            const setFieldValue = jest.fn();
            const container = shallow(<EditMultipleLogs />, { disableLifecycleMethods: true }).instance();
            container.setState(state);
            shareScripts.getBetTypes = jest.fn(()=> [1]);

            // Act
            container.onChangeSubProduct (setFieldValue, '1,2', '1');

            // Assert
            expect(setFieldValue).toHaveBeenCalledWith('subProductIds', '1,2');
            expect(container.state.betTypeOptions).toEqual([1]);
        });

        it('should do as expected when selectedItemsKey is empty', () => {
            // Arrange
            const state = {
                settings: {
                    bettypes: [1]
                }
            };
            const setFieldValue = jest.fn();
            const container = shallow(<EditMultipleLogs />, { disableLifecycleMethods: true }).instance();
            container.setState(state);
            shareScripts.getBetTypes = jest.fn(()=> [1]);

            // Act
            container.onChangeSubProduct(setFieldValue, '', '1');

            // Assert
            expect(setFieldValue).toHaveBeenCalledWith('betTypeIds', '');
            expect(container.state.betTypeOptions).toEqual([]);
        });
    });

    describe('onGetFeedbackSubjectTemplates', () => {
        it('should setState when search text length >= 2', async () => {
            // Arrange
            const searchText = 'search text';
            const response = {data: 'test'};
            const promise = Promise.resolve(response);
            const url = 'Common/GetFeedbackSubjectTemplate';
            Site.resolveClientUrl = jest.fn(url => url);
            DataService.getDataAsync = jest.fn(() => promise);
            const container = shallow(<EditMultipleLogs />, { disableLifecycleMethods: true }).instance();

            // Act
            container.onGetFeedbackSubjectTemplates(searchText);
            await promise;
            jest.runAllTimers();

            // Assert
            expect(Site.resolveClientUrl).toHaveBeenCalledWith('Common/GetFeedbackSubjectTemplate');
            expect(container.state.feedbackSubjectTemplates).toEqual([]);

        });

        it('should setState when search text length < 2', async () => {
            // Arrange
            const searchText = 't';
            const response = {data: 'test'};
            const promise = Promise.resolve(response);
            const url = 'Common/GetFeedbackSubjectTemplate';
            Site.resolveClientUrl = jest.fn(url => url);
            DataService.getDataAsync = jest.fn(() => promise);
            const container = shallow(<EditMultipleLogs />, { disableLifecycleMethods: true }).instance();

            // Act
            container.onGetFeedbackSubjectTemplates(searchText);
            await promise;
            jest.runAllTimers();

            // Assert
            expect(container.state.feedbackSubjectTemplates).toEqual([]);

        });
    });

    describe('handleCheckAll', () => {
        it('should call exact functions', () => {
            // Arrange
            const event = { 
                target: {checked: true}
            };
             
            const container = shallow(<EditMultipleLogs />, { disableLifecycleMethods: true }).instance();
            container.setState = jest.fn();
            // Act
            container.handleCheckAll(event);

            // Assert
            expect(container.setState).toHaveBeenCalled();
        });
    });

    describe('getExtensionParams', () => {
        it('should return expected data when selected has data', () => {
            // Arrange
            const container = shallow(<EditMultipleLogs />, { disableLifecycleMethods: true }).instance();

            // Act
            const actual = container.getExtensionParams('1,2');

            // Assert
            expect(actual).toEqual('1,2');
        });

        it('should return expected data when selected no data', () => {
            // Arrange
            const container = shallow(<EditMultipleLogs />, { disableLifecycleMethods: true }).instance();

            // Act
            const actual = container.getExtensionParams('', {id:1});

            // Assert
            expect(actual).toEqual('1');
        });
    });

    describe('handleSubmit', () => {
        it('should call exact function', () => {
            // Arrange
            const setSubmitting = jest.fn();
            const values = {
                siteInfo: {id: 1},
                productIds: [],
                subProductIds: [],
                betTypeIds: [],
                mainCategoryIds: '1',
                subCategoryIds: '1',
                isCheck: {
                    startTime: false,
                    endTime: false,
                    ext: false,
                    response: false,
                    communication: false,
                    language: false,
                    mainCategory: false,
                    subCategory: false,
                    product: false,
                    subProduct: false,
                    status: false,
                    betType: false,
                    role: false,
                    site: false,
                    country: false,
                    licensee: false,
                    inquiry: false,
                    subject: false,
                    autoGenerated: false,
                    description: false,
                    solution: false,
                    reviewed: false
                }
            };
            const state = {
                feedbackArr: [1,2],
                settings: initData.settings
            };
            const container = shallow(<EditMultipleLogs />, { disableLifecycleMethods: true }).instance();
            container.setState(state);
            container.getExtensionParams = jest.fn(() => 'test');
            container.confirmEditMultipleLogs = jest.fn();
            // Act
            container.handleSubmit (values, {setSubmitting});

            // Assert
            expect(setSubmitting).toHaveBeenCalledWith(true);
            expect(container.confirmEditMultipleLogs).toHaveBeenCalled();
        });
    });

    describe('reviewMode', () => {
        it('should return expected if isReviewed false', () => {
            // Arrange
            const state = {
                hasReviewFeedbackPermission: false
            };
            const container = shallow(<EditMultipleLogs />, { disableLifecycleMethods: true }).instance();
            container.setState(state);

            // Act
            const actual = container.reviewMode(false,0);

            // Assert
            expect(actual).toEqual(2);
        });

        it('should return expected if isReviewed true and state equal', () => {
            // Arrange
            const state = {
                hasReviewFeedbackPermission: true,
                communication: { review: 1 }
            };
            const container = shallow(<EditMultipleLogs />, { disableLifecycleMethods: true }).instance();
            container.setState(state);

            // Act
            const actual = container.reviewMode(true, 1);

            // Assert
            expect(actual).toEqual(0);
        });

        it('should return expected if isReviewed true and state not equal', () => {
            // Arrange
            const state = {
                hasReviewFeedbackPermission: true,
                communication: { review: 2 }
            };
            const container = shallow(<EditMultipleLogs />, { disableLifecycleMethods: true }).instance();
            container.setState(state);

            // Act
            const actual = container.reviewMode(true, 1);

            // Assert
            expect(actual).toEqual(1);
        });
    });

    describe('confirmEditMultipleLogs', () => {
        it('should call setState', () => {
            // Arrange
            const container = shallow(<EditMultipleLogs />, { disableLifecycleMethods: true }).instance();

            // Act
            container.confirmEditMultipleLogs('1,2');

            // Assert
            expect(container.state.confirmEditMultipleLogsDialog).toEqual({show: true, params:'1,2'});
        });
    });

    describe('handleCloseConfirmEditMultipleLogsDialog', () => {
        it('should call setState and setSubmitting', () => {
            // Arrange
            const container = shallow(<EditMultipleLogs />, { disableLifecycleMethods: true }).instance();
            container.formik = { setSubmitting: jest.fn() };

            // Act
            container.handleCloseConfirmEditMultipleLogsDialog();

            // Assert
            expect(container.state.confirmEditMultipleLogsDialog).toEqual({show: false});
            expect(container.formik.setSubmitting).toHaveBeenCalledWith(false);
        });
    });

    describe('handleEditMultipleLogs', () => {
        it('should call exact function if data is successful', async () => {
            // Arrange
            const props = {
                onClose: jest.fn()
            };
            const response = {data: {isSuccessful: true}};
            const promise = Promise.resolve(response);
            Site.resolveClientUrl = jest.fn(url => url);
            DataService.postDataAsync = jest.fn(() => promise);
            const container = shallow(<EditMultipleLogs {...props}/>, { disableLifecycleMethods: true }).instance();
            
            // Act
            container.handleEditMultipleLogs();
            await promise;
            jest.runAllTimers();

            // Assert
            expect(container.state.editResult).toEqual({isSuccessful: true});
            expect(props.onClose).toHaveBeenCalledWith(true);
        });
    });

    describe('handleConfirmEditMultipleLogs', () => {
        it('should call exact function', () => {
            // Arrange
            const state = {
                confirmEditMultipleLogsDialog: { show: false, params:'test'}
            };
            const container = shallow(<EditMultipleLogs />, { disableLifecycleMethods: true }).instance();
            container.setState(state);
            container.handleEditMultipleLogs = jest.fn();
            // Act
            container.handleConfirmEditMultipleLogs();

            // Assert
            expect(container.state.confirmEditMultipleLogsDialog).toEqual({show: false});
            expect(container.handleEditMultipleLogs).toHaveBeenCalledWith('test');
        });

        it('should call exact function if data is unsuccessful', async () => {
            // Arrange
            const props = {
                onClose: jest.fn()
            };
            const response = {data: {isSuccessful: false}};
            const promise = Promise.resolve(response);
            Site.resolveClientUrl = jest.fn(url => url);
            DataService.postDataAsync = jest.fn(() => promise);
            const container = shallow(<EditMultipleLogs {...props}/>, { disableLifecycleMethods: true }).instance();
            container.formik = { setSubmitting: jest.fn() };
            
            // Act
            container.handleEditMultipleLogs();
            await promise;
            jest.runAllTimers();

            // Assert
            expect(container.formik.setSubmitting).toHaveBeenCalledWith(false);
        });
    });

    describe('render', () => {
        describe('renderAutoGenerated ', () => {
            it('handleChange should call exact function', () => {
                // Arrange
                const container = shallow(<EditMultipleLogs />, { disableLifecycleMethods: true }).instance();
                const event = { 
                    target: {checked: true}
                }; 
                const params = {
                    values: {
                        isCheck:{
                            autoGenerated: false,
                            description: false
                        }
                    },
                    handleChange: jest.fn()
                };

                // Act
                const renderEdit = shallow(container.renderAutoGenerated(params.values, params.handleChange));
                container.handleChangeCheckboxByName = jest.fn();
                renderEdit.find('input').simulate('change', event);

                // Assert
                expect(container.handleChangeCheckboxByName).toHaveBeenCalled();
            });
        });

        describe('renderDescription', () => {
            it('handleChange should call exact function', () => {
                // Arrange
                const values = {
                    autoGenerated: '',
                    description: ''
                };
                const state = {
                    isCheck: {
                        autoGenerated : true,
                        description: false
                    }
                };
                const setFieldValue = jest.fn();
                const touched = {};
                const errors = {};
                const container = shallow(<EditMultipleLogs />, { disableLifecycleMethods: true }).instance();
                container.setState(state);
                // Act
                const renderEdit = shallow(container.renderDescription(values, touched, errors, setFieldValue));
                renderEdit.find(CkEditor).simulate('change', 'value');

                // Assert
                expect(setFieldValue).toHaveBeenCalledWith('description' , 'value');
            });

            it('invalid description correctly', () => {
                // Arrange
    
                const values = {
                    autoGenerated: '',
                    description: ''
                };
                const state = {
                    isCheck:{
                        autoGenerated : true,
                        description: false
                    }
                };
                const setFieldValue = jest.fn();
                const errors = {
                    description: 'description'
                };
    
                const touched = {
                    description: 'description'
                };
    
                const container = shallow(<EditMultipleLogs />, { disableLifecycleMethods: true }).instance();
                container.setState(state);
                // Act
                const renderEdit = shallow(container.renderDescription(values, touched, errors, setFieldValue));

                // Assert
                expect(renderEdit.find(CkEditor).props().isInvalid).toEqual(errors.description);
            });
        });

        describe('renderSolution', () => {
            it('handleChange checkbox should call exact function', () => {
                // Arrange
                const values = {
                    autoGenerated: '',
                    description: ''
                };
                const state = {
                    isCheck:{
                        solution : false
                    }
                };
                const setFieldValue = jest.fn();
                const touched = {};
                const errors = {};
                const container = shallow(<EditMultipleLogs />, { disableLifecycleMethods: true }).instance();
                container.setState(state);
                container.handleChangeCheckbox = jest.fn();
                // Act
                const renderEdit = shallow(container.renderSolution(values, touched, errors, setFieldValue));
                renderEdit.find('input').simulate('change', {target:{checked: true}});

                // Assert
                expect(container.handleChangeCheckbox).toHaveBeenCalled();
            });

            it('handleChange solution should call exact function', () => {
                // Arrange
                const values = {
                    autoGenerated: '',
                    description: ''
                };
                const state = {
                    isCheck:{
                        solution : true
                    }
                };
                const setFieldValue = jest.fn();
                const touched = {};
                const errors = {};
                const container = shallow(<EditMultipleLogs />, { disableLifecycleMethods: true }).instance();
                container.setState(state);
                // Act
                const renderEdit = shallow(container.renderSolution(values, touched, errors, setFieldValue));
                renderEdit.find(CkEditor).simulate('change', 'value');

                // Assert
                expect(setFieldValue).toHaveBeenCalledWith('solution' , 'value');
            });


            it('invalid solution correctly', () => {
                // Arrange
    
                const values = {
                    autoGenerated: '',
                    description: ''
                };
                const state = {
                    isCheck:{
                        solution : true
                    }
                };
                const setFieldValue = jest.fn();
                const errors = {
                    solution: 'solution'
                };
    
                const touched = {
                    solution: 'solution'
                };
    
                const container = shallow(<EditMultipleLogs />, { disableLifecycleMethods: true }).instance();
                container.setState(state);
                // Act
                const renderEdit = shallow(container.renderSolution(values, touched, errors, setFieldValue));

                // Assert
                expect(renderEdit.find(CkEditor).props().isInvalid).toEqual(errors.solution);
            });
        });

        describe('renderReview ', () => {
            it('handleChange checkbox should call exact function', () => {
                // Arrange
                const values = {
                    reviewed: true,
                    review: 'review',
                    reviewer: 'reviewed'
                };
                const state = {
                    isCheck:{
                        reviewed : true
                    }
                };
                const setFieldValue = jest.fn();
                const touched = {};
                const errors = {};
                const container = shallow(<EditMultipleLogs />, { disableLifecycleMethods: true }).instance();
                container.setState(state);
                container.handleChangeCheckbox = jest.fn();
                // Act
                const renderEdit = shallow(container.renderReview(values, touched, errors, setFieldValue));
                renderEdit.find('input').at(0).simulate('change', {target: {checked: true}});

                // Assert
                expect(container.handleChangeCheckbox).toHaveBeenCalled();
            });

            it('handleChange value should call exact function', () => {
                // Arrange
                const values = {
                    reviewed: true,
                    reviewerName: 'review'
                };
                const state = {
                    isCheck: {review: true}
                };
                const setFieldValue = jest.fn();
                const touched = {};
                const errors = {};
                const container = shallow(<EditMultipleLogs />, { disableLifecycleMethods: true }).instance();
                container.setState(state);
                // Act
                const renderEdit = shallow(container.renderReview(values, touched, errors, setFieldValue));
                renderEdit.find(CkEditor).simulate('change', 'review');

                // Assert
                expect(setFieldValue).toHaveBeenCalledWith('review' , 'review');
            });

            it('invalid review correctly', () => {
                // Arrange
                const values = {
                    reviewed: true,
                    reviewerName: 'review'
                };
                const state = {
                    isCheck: {review: true}
                };
                const setFieldValue = jest.fn();
                const errors = {
                    review: 'review'
                };
    
                const touched = {
                    review: 'review'
                };
    
                const container = shallow(<EditMultipleLogs />, { disableLifecycleMethods: true }).instance();
                container.setState(state);
                // Act
                const renderEdit = shallow(container.renderReview(values, touched, errors, setFieldValue));

                // Assert
                expect(renderEdit.find(CkEditor).props().isInvalid).toEqual(errors.review);
            });
        });

        describe('renderDropdownDetail  ', () => {
            const state = {
                settings: {
                    statuses: [{ statusId: 1, name: 'status'}],
                    roles: [{ id: 1, value: 'role'}],
                    countries: [{ id: 1, name: 'test' }]
                },
                mainCategoryOptions: [],
                subCategoryOptions: [],
                productOptions: [],
                subProductOptions: [],
                betTypeOptions: [],
                sitesOptions: [],
            };

            const params = {
                values: {
                    siteInfo: {id: 1, name:'test'},
                    isCheck: {
                    startTime: false,
                    endTime: false,
                    ext: false,
                    response: false,
                    communication: false,
                    language: false,
                    mainCategory: false,
                    subCategory: false,
                    product: false,
                    subProduct: false,
                    status: false,
                    betType: false,
                    role: false,
                    site: false,
                    country: false,
                    licensee: false,
                    inquiry: false,
                    subject: false,
                    autoGenerated: false,
                    description: false,
                    solution: false,
                    reviewed: false
                    }
                },
                errors: {
                },
                touched: {
                },
                handleChange: jest.fn(),
                setFieldValue: jest.fn()
            };

            it('should handle onChange mainCategory call exact function', () => {
                // Arrange
                const {values, touched, errors, setFieldValue, handleChange} = params;
                const container = shallow(<EditMultipleLogs />, { disableLifecycleMethods: true }).instance();
                container.onChangeMainCategory = jest.fn();
                container.setState(state);

                // Act
                const renderEdit = shallow(container.renderDropdownDetail(errors, values, handleChange, touched, setFieldValue));
                renderEdit.find(MultipleSelect).at(0).simulate('change', 'currentItem', 'selectedItemsKey');
               
                // Assert
                expect(container.onChangeMainCategory).toHaveBeenCalled();
            });

            it('should handle onChange checkbox mainCategory call exact function', () => {
                // Arrange
                const {values, touched, errors, setFieldValue, handleChange} = params;
                const container = shallow(<EditMultipleLogs />, { disableLifecycleMethods: true }).instance();
                container.onChangeMainCategory = jest.fn();
                container.setState(state);
                container.handleChangeCheckboxByName = jest.fn();
                // Act
                const renderEdit = shallow(container.renderDropdownDetail(errors, values, handleChange, touched, setFieldValue));
                renderEdit.find('input').at(0).simulate('change', {target: {checked: true}});
               
                // Assert
                expect(container.handleChangeCheckboxByName).toHaveBeenCalled();
            });

            it('invalid mainCategoryIds correctly', () => {
                // Arrange
                const {values, touched, errors, setFieldValue, handleChange} = params;
                values.errors = {mainCategoryIds: 'mainCategoryIds'};
                values.touched = {mainCategoryIds: 'mainCategoryIds'};
                const container = shallow(<EditMultipleLogs />, { disableLifecycleMethods: true }).instance();
                container.setState(state);

                // Act
                const renderEdit = shallow(container.renderDropdownDetail(errors, values, handleChange, touched, setFieldValue));
               
                // Assert
                expect(renderEdit.find(MultipleSelect).at(0).props().isInvalid).toEqual(errors.mainCategoryIds);
            });

            it('should handle onChange subCategory call exact function', () => {
                // Arrange
                const {values, touched, errors, setFieldValue, handleChange} = params;
                const container = shallow(<EditMultipleLogs />, { disableLifecycleMethods: true }).instance();
                container.setState(state);

                // Act
                const renderEdit = shallow(container.renderDropdownDetail(errors, values, handleChange, touched, setFieldValue));
                renderEdit.find(MultipleSelect).at(1).simulate('change', 'currentItem', 'selectedItemsKey');
               
                // Assert
                expect(setFieldValue).toHaveBeenCalled();
            });

            it('invalid subCategory correctly', () => {
                // Arrange
                const {values, touched, errors, setFieldValue, handleChange} = params;
                values.errors = {subCategoryIds: 'subCategoryIds'};
                values.touched = {subCategoryIds: 'subCategoryIds'};
                const container = shallow(<EditMultipleLogs />, { disableLifecycleMethods: true }).instance();
                container.setState(state);

                // Act
                const renderEdit = shallow(container.renderDropdownDetail(errors, values, handleChange, touched, setFieldValue));
               
                // Assert
                expect(renderEdit.find(MultipleSelect).at(1).props().isInvalid).toEqual(errors.subCategoryIds);
            });

            it('should handle onChange product call exact function', () => {
                // Arrange
                const {values, touched, errors, setFieldValue, handleChange} = params;
                const container = shallow(<EditMultipleLogs />, { disableLifecycleMethods: true }).instance();
                container.setState(state);
                container.onChangeProduct = jest.fn();

                // Act
                const renderEdit = shallow(container.renderDropdownDetail(errors, values, handleChange, touched, setFieldValue));
                renderEdit.find(MultipleSelect).at(2).simulate('change', 'currentItem', 'selectedItemsKey');
               
                // Assert
                expect(container.onChangeProduct ).toHaveBeenCalled();
            });

            it('should handle onChange checkbox product call exact function', () => {
                const {values, touched, errors, setFieldValue, handleChange} = params;
                const container = shallow(<EditMultipleLogs />, { disableLifecycleMethods: true }).instance();
                container.onChangeMainCategory = jest.fn();
                container.setState(state);

                // Act
                const renderEdit = shallow(container.renderDropdownDetail(errors, values, handleChange, touched, setFieldValue));
                renderEdit.find('input').at(2).simulate('change', {target: {checked: true}});
               
                // Assert
                expect(setFieldValue).toHaveBeenCalled();
            });

            it('should handle onChange subProduct call exact function', () => {
                // Arrange
                const {values, touched, errors, setFieldValue, handleChange} = params;
                const container = shallow(<EditMultipleLogs />, { disableLifecycleMethods: true }).instance();
                container.setState(state);
                container.onChangeSubProduct = jest.fn();

                // Act
                const renderEdit = shallow(container.renderDropdownDetail(errors, values, handleChange, touched, setFieldValue));
                renderEdit.find(MultipleSelect).at(3).simulate('change', 'currentItem', 'selectedItemsKey');
               
                // Assert
                expect(container.onChangeSubProduct).toHaveBeenCalled();
            });

            it('should handle onChange checkbox subProduct call exact function', () => {
                const {values, touched, errors, setFieldValue, handleChange} = params;
                const container = shallow(<EditMultipleLogs />, { disableLifecycleMethods: true }).instance();
                container.onChangeMainCategory = jest.fn();
                container.setState(state);

                // Act
                const renderEdit = shallow(container.renderDropdownDetail(errors, values, handleChange, touched, setFieldValue));
                renderEdit.find('input').at(3).simulate('change', {target: {checked: true}});
               
                // Assert
                expect(setFieldValue).toHaveBeenCalled();
            });

            it('should handle onChange checkbox status call exact function', () => {
                const {values, touched, errors, setFieldValue, handleChange} = params;
                const container = shallow(<EditMultipleLogs />, { disableLifecycleMethods: true }).instance();
                container.onChangeMainCategory = jest.fn();
                container.setState(state);

                // Act
                const renderEdit = shallow(container.renderDropdownDetail(errors, values, handleChange, touched, setFieldValue));
                renderEdit.find('input').at(4).simulate('change', {target: {checked: true}});
               
                // Assert
                expect(setFieldValue).toHaveBeenCalled();
            });

            it('should handle onChange betType call exact function', () => {
                // Arrange
                const {values, touched, errors, setFieldValue, handleChange} = params;
                const container = shallow(<EditMultipleLogs />, { disableLifecycleMethods: true }).instance();
                container.setState(state);

                // Act
                const renderEdit = shallow(container.renderDropdownDetail(errors, values, handleChange, touched, setFieldValue));
                renderEdit.find(MultipleSelect).at(4).simulate('change', 'currentItem', 'selectedItemsKey');
               
                // Assert
                expect(setFieldValue).toHaveBeenCalled();
            });

            it('should handle onChange checkbox betType call exact function', () => {
                const {values, touched, errors, setFieldValue, handleChange} = params;
                const container = shallow(<EditMultipleLogs />, { disableLifecycleMethods: true }).instance();
                container.setState(state);

                // Act
                const renderEdit = shallow(container.renderDropdownDetail(errors, values, handleChange, touched, setFieldValue));
                renderEdit.find('input').at(5).simulate('change', {target: {checked: true}});
               
                // Assert
                expect(setFieldValue).toHaveBeenCalled();
            });

            it('should handle onChange checkbox role call exact function', () => {
                const {values, touched, errors, setFieldValue, handleChange} = params;
                const container = shallow(<EditMultipleLogs />, { disableLifecycleMethods: true }).instance();
                container.setState(state);

                // Act
                const renderEdit = shallow(container.renderDropdownDetail(errors, values, handleChange, touched, setFieldValue));
                renderEdit.find('input').at(6).simulate('change', {target: {checked: true}});
               
                // Assert
                expect(setFieldValue).toHaveBeenCalled();
            });

            it('should handle onChange site call exact function', () => {
                // Arrange
                const {values, touched, errors, setFieldValue, handleChange} = params;
                const container = shallow(<EditMultipleLogs />, { disableLifecycleMethods: true }).instance();
                container.setState(state);

                // Act
                // const renderEdit = shallow(container.renderDropdownDetail(errors, values, handleChange, touched, setFieldValue));
                // renderEdit.find(SelectWithSearch).simulate('change', 'value');
               
                // Assert
                expect(setFieldValue).toHaveBeenCalled();
            });

            it('should handle onChange checkbox site call exact function', () => {
                const {values, touched, errors, setFieldValue, handleChange} = params;
                const container = shallow(<EditMultipleLogs />, { disableLifecycleMethods: true }).instance();
                container.setState(state);

                // Act
                const renderEdit = shallow(container.renderDropdownDetail(errors, values, handleChange, touched, setFieldValue));
                renderEdit.find('input').at(7).simulate('change', {target: {checked: true}});
               
                // Assert
                expect(setFieldValue).toHaveBeenCalled();
            });

        });

        describe('renderSelectOptions  ', () => {
            const state = {
                settings:{
                    countries: [{
                        id: 1, name: 'test'
                    }],
                    licenseeTypes:[{
                        id: 1, name: 'test'
                    }]
                }
            };
            const values = {
                countryId: 0,
                licenseeId: 0,
                isCheck: {
                    country: false,
                    licensee: false
                }
            };
            const handleChange = jest.fn();

            it('should handle onChange licensee call exact function', () => {
                // Arrange
                
                const container = shallow(<EditMultipleLogs />, { disableLifecycleMethods: true }).instance();
                container.setState(state);

                // Act
                const renderEdit = shallow(container.renderSelectOptions(values, handleChange));
                renderEdit.find(Form.Control).at(0).simulate('change', 'value');
                
                // Assert
                expect(handleChange).toHaveBeenCalled();
            });
    
            it('should handle onChange licensee country call exact function', () => {
                // Arrange
                const container = shallow(<EditMultipleLogs />, { disableLifecycleMethods: true }).instance();
                container.handleChangeCheckbox = jest.fn();
                container.setState(state);

                // Act
                const renderEdit = shallow(container.renderSelectOptions(values, handleChange));
                renderEdit.find('input').at(0).simulate('change', {target: {checked: true}});
                
                // Assert
                expect(container.handleChangeCheckbox).toHaveBeenCalled();
            });

            it('should handle onChange checkbox subject call exact function', () => {
                // Arrange
                const container = shallow(<EditMultipleLogs />, { disableLifecycleMethods: true }).instance();
                container.handleChangeCheckbox = jest.fn();
                container.setState(state);

                // Act
                var renderEdit = shallow(container.renderSelectOptions(values, handleChange));
                renderEdit.find('input').at(1).simulate('change', {target: {checked: true}});
                
                // Assert
                expect(container.handleChangeCheckbox).toHaveBeenCalled();
            });
        });

        describe('isDisabledField', () => {
            it('should return expected data', () => {
                // Arrange
                const container = shallow(<EditMultipleLogs />, { disableLifecycleMethods: true }).instance();

                // Act
                var actual = container.isDisabledField(true);

                //Arrange
                expect(actual).toEqual('');
            });
        });

        describe('renderMultipleLogs', () => {
            const state = {
                settings: {
                    languages: [{ languageId: 1, name: 'status'}],
                    responses: [{ id: 1, value: 'role'}]
                },
                extensionOptions: [],
                communicationToolOptions: [],
                 feedbackSubjectTemplates: []
            };

            const params = {
                values: {
                    siteInfo: {id: 1, name:'test'},
                    isCheck: {
                        startTime: false,
                        endTime: false,
                        ext: false,
                        response: false
                    }
                },
                errors: {
                },
                touched: {
                },
                handleChange: jest.fn(),
                setFieldValue: jest.fn()
            };

            const {errors, values, handleChange, touched, setFieldValue} = params;
            const container = shallow(<EditMultipleLogs />, { disableLifecycleMethods: true }).instance();
            container.formik = {
                setFieldValue: jest.fn()
            };
            container.setState(state);
            container.renderDropdownDetail = jest.fn(() => 'div');
            container.renderSelectOptions = jest.fn(() => 'div');
            container.renderAutoGenerated = jest.fn(() => 'div');
            container.renderDescription = jest.fn(() => 'div');
            container.renderSolution = jest.fn(() => 'div');
            container.renderReview = jest.fn(() => 'div');
            container.handleChangeCheckbox = jest.fn();
            container.handleCheckAll= jest.fn();

            it('should handle onChange checkbox all call exact function', () => {
                // Arrange
                var renderEdit = shallow(container.renderMultipleLogs(errors, values, handleChange, touched, setFieldValue));

                // Act
                renderEdit.find('input').at(0).simulate('change', {target: {checked: true}});
                
                // Assert
                expect(container.handleCheckAll).toHaveBeenCalled();
            });

            it('should handle onChange startTime call exact function', () => {
                // Arrange
                var renderEdit = shallow(container.renderMultipleLogs(errors, values, handleChange, touched, setFieldValue));

                // Act
                renderEdit.find(DatePicker).at(0).simulate('change', 'value');
                
                // Assert
                expect(container.formik.setFieldValue).toHaveBeenCalledTimes(1);
            });

            it('should handle onChange checkbox startTime call exact function', () => {
                // Arrange
                var renderEdit = shallow(container.renderMultipleLogs(errors, values, handleChange, touched, setFieldValue));

                // Act
                renderEdit.find('input').at(1).simulate('change', {target: {checked: true}});

                // Assert
                expect(container.handleChangeCheckbox).toHaveBeenCalled();
            });

            it('should handle onChange extension call exact function', () => {
                // Arrange
                var renderEdit = shallow(container.renderMultipleLogs(errors, values, handleChange, touched, setFieldValue));

                // Act
                renderEdit.find(MultipleSelect).at(0).simulate('change', 'currentItem', 'selectedItemsKey');

                // Assert
                expect(setFieldValue).toHaveBeenCalledWith('extensionIds', 'selectedItemsKey');
            });

            it('should handle onChange checkbox extension call exact function', () => {
                // Arrange
                var renderEdit = shallow(container.renderMultipleLogs(errors, values, handleChange, touched, setFieldValue));

                // Act
                renderEdit.find('input').at(2).simulate('change', {target: {checked: true}});
                
                // Assert
                expect(container.handleChangeCheckbox).toHaveBeenCalled();
            });

            it('should handle onChange endTime call exact function', () => {
                // Arrange
                var renderEdit = shallow(container.renderMultipleLogs(errors, values, handleChange, touched, setFieldValue));

                // Act
                renderEdit.find(DatePicker).at(1).simulate('change', 'value');

                // Assert
                expect(container.formik.setFieldValue).toHaveBeenCalledTimes(2);
            });

            it('should handle onChange checkbox endTime call exact function', () => {
                // Arrange
                var renderEdit = shallow(container.renderMultipleLogs(errors, values, handleChange, touched, setFieldValue));

                // Act
                renderEdit.find('input').at(3).simulate('change', {target: {checked: true}});
                
                // Assert
                expect(container.handleChangeCheckbox).toHaveBeenCalled();
            });

            it('should handle onChange response call exact function', () => {
                // Arrange
                var renderEdit = shallow(container.renderMultipleLogs(errors, values, handleChange, touched, setFieldValue));

                // Act
                renderEdit.find(Form.Control).at(1).simulate('change', 'value');
                
                // Assert
                expect(handleChange).toHaveBeenCalled();
            });

            it('should handle onChange checkbox response call exact function', () => {
                // Arrange
                var renderEdit = shallow(container.renderMultipleLogs(errors, values, handleChange, touched, setFieldValue));

                //Arrange
                renderEdit.find('input').at(4).simulate('change', {target: {checked: true}});
                
                // Assert
                expect(container.handleChangeCheckbox).toHaveBeenCalled();
            });

            it('should handle onChange communicationTool call exact function', () => {
                // Arrange
                var renderEdit = shallow(container.renderMultipleLogs(errors, values, handleChange, touched, setFieldValue));

                // Act
                renderEdit.find(MultipleSelect).at(1).simulate('change', 'currentItem', 'selectedItemsKey');

                // Assert
                expect(setFieldValue).toHaveBeenCalledWith('communicationToolIds', 'selectedItemsKey');
            });

            it('should handle onChange checkbox communicationTool call exact function', () => {
                // Arrange
                var renderEdit = shallow(container.renderMultipleLogs(errors, values, handleChange, touched, setFieldValue));

                // Act
                renderEdit.find('input').at(5).simulate('change', {target: {checked: true}});
                
                // Assert
                expect(container.handleChangeCheckbox).toHaveBeenCalled();
            });

            it('invalid mainCategoryIds correctly', () => {
                // Arrange
                values.errors = {communicationToolIds: 'communicationToolIds'};
                values.touched = {communicationToolIds: 'communicationToolIds'};

                // Act
                var renderEdit = shallow(container.renderMultipleLogs(errors, values, handleChange, touched, setFieldValue));
               
                // Assert
                expect(renderEdit.find(MultipleSelect).at(1).props().isInvalid).toEqual(errors.communicationToolIds);
            });

            it('should handle onChange checkbox language call exact function', () => {
                // Arrange
                var renderEdit = shallow(container.renderMultipleLogs(errors, values, handleChange, touched, setFieldValue));

                // Act
                renderEdit.find('input').at(6).simulate('change', {target: {checked: true}});
                
                // Assert
                expect(container.handleChangeCheckbox).toHaveBeenCalled();
            });

            it('should handle onChange checkbox language call exact function', () => {
                // Arrange
                var renderEdit = shallow(container.renderMultipleLogs(errors, values, handleChange, touched, setFieldValue));

                // Act

                renderEdit.find('input').at(6).simulate('change', {target: {checked: true}});
                
                // Assert
                expect(container.handleChangeCheckbox).toHaveBeenCalled();
            });

            it('should handle onChange checkbox noInquiries call exact function', () => {
                // Arrange
                var renderEdit = shallow(container.renderMultipleLogs(errors, values, handleChange, touched, setFieldValue));

                // Act
                renderEdit.find('input').at(7).simulate('change', {target: {checked: true}});
                
                // Assert
                expect(container.handleChangeCheckbox).toHaveBeenCalled();
            });

            it('should handle onChange subject call exact function', () => {
                // Arrange
                var renderEdit = shallow(container.renderMultipleLogs(errors, values, handleChange, touched, setFieldValue));

                // Act
                renderEdit.find(AutoComplete).simulate('change', 'value');

                // Assert
                expect(setFieldValue).toHaveBeenCalledWith('subject', 'value');
            });

            it('invalid subject correctly', () => {
                // Arrange
                errors.subject = {subject: 'subject'};
                touched.subject = {subject: 'subject'};

                // Act
                var renderEdit = shallow(container.renderMultipleLogs(errors, values, handleChange, touched, setFieldValue));

                // Assert
                expect(renderEdit.find(AutoComplete).props().isInvalid).toEqual(errors.subject);
            });
        });

        describe('renderForm', () => {
            it('handle message responses if unsuccessful', () => {
                // Arrange
                const state = {
                    editResult: {
                        isSuccessful: false,
                        message: 'unsuccessful'
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
                const container = shallow(<EditMultipleLogs />, { disableLifecycleMethods: true }).instance();
                container.renderMultipleLogs = jest.fn(() => 'div');
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
               
                const container = shallow(<EditMultipleLogs/>, { disableLifecycleMethods: true }).instance();
                container.renderMultipleLogs = jest.fn(() => 'div');
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
               
                const container = shallow(<EditMultipleLogs/>, { disableLifecycleMethods: true }).instance();
                container.renderMultipleLogs = jest.fn(() => 'div');
                container.setState(state);
                // Act
                const renderEdit = shallow(container.renderForm(formikProps));
        
                // Assert 
                expect(renderEdit.find(ResponseMessage).props().isSuccessful).toBe(true);
                expect(renderEdit.find(ResponseMessage).props().message).toEqual('UpdateMultipleLogsSuccessfully');
            });

            it('should handle onclose call exact function', () => {
                // Arrange
                const state = {
                    editResult: {
                        isSuccessful: true
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
                const props = {
                    onClose: jest.fn()
                };
               
                const container = shallow(<EditMultipleLogs {...props}/>, { disableLifecycleMethods: true }).instance();
                container.renderMultipleLogs = jest.fn(() => 'div');
                container.setState(state);

                // Act
                const renderEdit = shallow(container.renderForm(formikProps));
                renderEdit.find(Button).at(1).simulate('click');
                // Assert 
                expect(props.onClose).toHaveBeenCalledWith(false);
            });
        });

        describe('renderForm', () => {
            it('modal onHide should call exact function', () => {
                // Arrange
                const { communication, settings } = initData;
                const state = {
                    communication, settings
                };

                const props = {
                    onClose: jest.fn()
                };
               
                const container = shallow(<EditMultipleLogs {...props}/>, { disableLifecycleMethods: true });
                container.instance().setState(state);

                // Act
                container.find(Modal).simulate('hide');
                // Assert 
                expect(props.onClose).toHaveBeenCalledWith(false);
            });

            it('component map correct innerRef in formik', () => {
                // Arrange
                const { communicationLog, settings } = initData;
                const state = {
                    communication: communicationLog, settings
                };
               
                const container = shallow(<EditMultipleLogs />, { disableLifecycleMethods: true });
                container.instance().getValidateFormik = jest.fn();
                container.instance().setState(state);
                container.find(Formik).props().innerRef({});
            });

            it('should call correct functions when validate', () => {
                // Arrange
                const { communicationLog, settings } = initData;
                const state = {
                    communication: communicationLog, settings
                };
                const values = {
                    languageId: null,
                    isCheck:{
                        languageId: true
                    }
                };
               
                const container = shallow(<EditMultipleLogs />, { disableLifecycleMethods: true });
                commonFunc.getValidateFormik = jest.fn(() => 'test');
                container.instance().setState(state);

                // Act
                container.find(Formik).props().validate(values);
    
                // Assert
                expect(container.find(Formik).length).toBe(1);
                expect(commonFunc.getValidateFormik).toHaveBeenCalledTimes(1);
            });

            it('SweetModalDialog render correctly', () => {
                // Arrange
                const { communication, settings } = initData;
                const state = {
                    communication, settings, confirmEditMultipleLogsDialog: {show: true}
                };
               
                const container = shallow(<EditMultipleLogs />, { disableLifecycleMethods: true });
                container.instance().handleConfirmEditMultipleLogs = jest.fn();
                container.instance().handleCloseConfirmEditMultipleLogsDialog = jest.fn();

                container.instance().setState(state);
                const expectedButton = [
                    <Button variant="primary" size="sm" onClick={container.instance().handleConfirmEditMultipleLogs}>
                        {LangHelper.getResource('OK')}
                    </Button>,
                    <Button variant="primary" size="sm" onClick={container.instance().handleCloseConfirmEditMultipleLogsDialog}>
                        {LangHelper.getResource('Cancel')}
                    </Button>
                ];

                // Act
                // Assert
                expect(container.find(SweetModalDialog)).toHaveLength(1);
                expect(container.find(SweetModalDialog).props().buttons).toEqual(expectedButton);
            });
        });
    });
}); 